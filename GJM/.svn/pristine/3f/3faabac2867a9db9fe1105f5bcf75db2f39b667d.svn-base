package com.gjp.service;

import com.alibaba.fastjson.JSONObject;
import com.gjp.model.ContractObjectVo;
import com.gjp.model.UserCustomer;
import com.gjp.model.ViewBusinessContractVo;
import com.gjp.util.AppConfig;
import com.gjp.util.AppException;
import com.gjp.util.bestsign.BestSignUtil;
import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class BestSignService {

    @Resource
    private ContractService contractService;
    @Resource
    private CustomerService customerService;
    /* 证书类型 */
    private static final String CERT_TYPE_CFCA = "CFCA";
    /* 证书类型 */
    private static final String CERT_TYPE_ZJCA = "ZJCA";

    /**
     * 合同签署
     *
     * @param con_code 合同CODE
     * @return
     * @throws Exception
     */
    public JSONObject contractSign(HttpServletRequest request, String con_code) throws Exception {
        JSONObject returnJson = new JSONObject();
        if (StringUtils.isEmpty(con_code)) {
            throw new AppException("签名合同CODE错误");
        }
        // 【获取合同信息】
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_Code(con_code);
        contractVo = contractService.selectContractObjectByCNo(contractVo);
        if (contractVo == null) {
            throw new AppException("没有发现合同信息");
        }

        // 【获取客户信息】
        UserCustomer customer = customerService.queryCustomerInfo(contractVo.getContractObject_1st());
        if (customer == null) {
            throw new AppException("没有发现客户信息");
        }

        // 【获取合同PDF文件】
        String con_type = AppConfig.TYPE_CONTRACT_201.equalsIgnoreCase(contractVo.getContractObject_Type()) ? "tg" : "zl";
        Map<String, Object> pdfMap = contractService.generatePDFtoSSQ(con_code, con_type, null, null, request);
        if (pdfMap == null) {
            throw new AppException("没有发现合同文件");
        }
        int pdf_code = (int) pdfMap.get("code");
        if (pdf_code != 200) {
            throw new AppException((String) pdfMap.get("msg"));
        }
        File pdfFile = (File) pdfMap.get("pdfFile");
        if (pdfFile == null) {
            throw new AppException("没有发现合同文件");
        }

        // 【上传合同】
        JSONObject result = BestSignUtil.uploadContractFile(pdfFile);
        // 删除文件
        if (pdfFile.exists()) {
            pdfFile.delete();
        }
        String fId = result.getJSONObject("data").getString("fid");
        if (StringUtils.isEmpty(fId)) {
            throw new AppException("无法获取文件ID");
        }

        // 【创建合同】
        String title = "合同_" + contractVo.getContractObject_No() + "_" + new SimpleDateFormat("ddHHmmss").format(new Date());
        result = BestSignUtil.addContract(fId, title);
        if (result.getIntValue("errno") != 0) {
            throw new AppException(result.getString("errmsg"));
        }
        String contractId = result.getJSONObject("data").getString("contractId");
        if (StringUtils.isEmpty(contractId)) {
            throw new AppException("无法获取合同ID");
        }

        // 【创建用户】
        String account = customer.getCcp_phone(); // customer.getCc_cardNum()
        String name = customer.getCc_name();
        String phone = customer.getCcp_phone();
        String card = customer.getCc_cardNum();
        Integer cardType = customer.getCc_cardType();
        addUser(account, name, phone, card, cardType);

        // 【查询合同签名】
        ContractObjectVo contractObjectVo = contractService.queryContractObject(con_code);

        // 【添加合同签署者】
        String accountA = null;
        ArrayList<String> signers = new ArrayList<>();
        signers.add(BestSignUtil.account);
        signers.add(account);
        if (AppConfig.TYPE_CONTRACT_202.equals(contractVo.getContractObject_Type())) {
            // 查询托管合同
            ContractObjectVo contractObjectVo1 = new ContractObjectVo();
            contractObjectVo1.setHi_code(contractObjectVo.getHi_code());
            contractObjectVo1.setContractObject_Type(AppConfig.TYPE_CONTRACT_201);
            contractObjectVo1.setContractObject_OptionState(AppConfig.contract_optionstate_106);
            contractObjectVo1 = contractService.queryContractObject(contractObjectVo1);

            // 查询房东信息
            UserCustomer customerA = customerService.queryCustomerInfo(contractObjectVo1.getContractObject_1st());

            // 赋值房东账号
            accountA = customerA.getCc_cardNum();

            // 添加用户
            addUser(accountA, customerA.getCc_name(), customerA.getCcp_phone(), customerA.getCc_cardNum(), customerA.getCc_cardType());

            // 添加至签署者
            signers.add(accountA);
        }
        result = BestSignUtil.addContractSigner(contractId, signers);
        if (result.getIntValue("errno") != 0) {
            throw new AppException(result.getString("errmsg"));
        }
        JSONObject contractSignerData = result.getJSONObject("data");
        if (!"1".equals(contractSignerData.getString(BestSignUtil.account))) {
            throw new AppException("添加公司签署者失败");
        }
        if (accountA != null) {
            if (!"1".equals(contractSignerData.getString(accountA))) {
                throw new AppException("添加房东签署者失败");
            }
        }
        if (!"1".equals(contractSignerData.getString(account))) {
            throw new AppException("添加客户签署者失败");
        }

        // 【设置用户签名图片】
        byte[] con_customerSign = contractObjectVo.getContractObject_CustomerSign();
        if (con_customerSign != null) {
            String imageData = Base64.encodeBase64String(con_customerSign);
            JSONObject jsonObject = BestSignUtil.uploadUserSignImage(account, imageData);
            if (jsonObject.getIntValue("errno") != 0) {
                throw new AppException(jsonObject.getString("errmsg"));
            }
        }

        // 【公司签署合同】
        ArrayList<Object> signaturePositions = new ArrayList<>();
        if (AppConfig.TYPE_CONTRACT_201.equals(contractVo.getContractObject_Type())) {
            signaturePositions.add(new HashMap<String, Object>() {{
                put("y", 0.54);
                put("x", 0.6);
                put("pageNum", 2);
            }});
            signaturePositions.add(new HashMap<String, Object>() {{
                put("y", 0.6);
                put("x", 0.6);
                put("pageNum", 3);
            }});
        }
        if (AppConfig.TYPE_CONTRACT_202.equals(contractVo.getContractObject_Type())) {
            signaturePositions.add(new HashMap<String, Object>() {{
                put("y", 0.66);
                put("x", 0.11);
                put("pageNum", 2);
            }});
        }
        result = BestSignUtil.setContractSignCert(contractId, BestSignUtil.account, signaturePositions);
        if (result.getIntValue("errno") != 0) {
            throw new AppException(result.getString("errmsg"));
        }

        // 【房东签署合同】
        if (accountA != null) {
            signaturePositions = new ArrayList<>();
            signaturePositions.add(new HashMap<String, Object>() {{
                put("y", 0.62);
                put("x", 0.11);
                put("pageNum", 2);
            }});
            result = BestSignUtil.setContractSignCert(contractId, accountA, signaturePositions);
            if (result.getIntValue("errno") != 0) {
                throw new AppException(result.getString("errmsg"));
            }
        }

        // 如果是商户号
        if (cardType == 3) {
            // 【客户签署合同】
            signaturePositions = new ArrayList<>();
            if (AppConfig.TYPE_CONTRACT_201.equals(contractVo.getContractObject_Type())) {
                signaturePositions.add(new HashMap<String, Object>() {{
                    put("y", 0.56);
                    put("x", 0.11);
                    put("pageNum", 2);
                }});
                signaturePositions.add(new HashMap<String, Object>() {{
                    put("y", 0.6);
                    put("x", 0.14);
                    put("pageNum", 3);
                }});
            }
            if (AppConfig.TYPE_CONTRACT_202.equals(contractVo.getContractObject_Type())) {
                signaturePositions.add(new HashMap<String, Object>() {{
                    put("y", 0.62);
                    put("x", 0.56);
                    put("pageNum", 2);
                }});
            }
            result = BestSignUtil.setContractSignCert(contractId, account, signaturePositions);
            if (result.getIntValue("errno") != 0) {
                throw new AppException(result.getString("errmsg"));
            }
        } else {
            // 【设置客户合同签署参数】
            HashMap<String, Object> moreParam = new HashMap<>();
            signaturePositions = new ArrayList<>();
            if (AppConfig.TYPE_CONTRACT_201.equals(contractVo.getContractObject_Type())) {
                signaturePositions.add(new HashMap<String, Object>() {{
                    put("y", 0.56);
                    put("x", 0.11);
                    put("pageNum", 2);
                }});
                signaturePositions.add(new HashMap<String, Object>() {{
                    put("y", 0.6);
                    put("x", 0.14);
                    put("pageNum", 3);
                }});
            }
            if (AppConfig.TYPE_CONTRACT_202.equals(contractVo.getContractObject_Type())) {
                signaturePositions.add(new HashMap<String, Object>() {{
                    put("y", 0.62);
                    put("x", 0.56);
                    put("pageNum", 2);
                }});
            }
            moreParam.put("signaturePositions", signaturePositions);
            moreParam.put("CERT_TYPE_CFCA", CERT_TYPE_CFCA);
            moreParam.put("vcodeMobile", phone); // 指定接收手机验证码的手机号（手签必填）
            moreParam.put("isAllowChangeSignaturePosition", 0); // 是否允许拖动（0：不允许，1：允许）
            moreParam.put("isDrawSignatureImage", 0); // 是否允许手绘签名（0：不允许，1：允许）
            result = BestSignUtil.setContractSignerConfig(contractId, account, moreParam);
            if (result.getIntValue("errno") != 0) {
                throw new AppException(result.getString("errmsg"));
            }
        }

        returnJson.put("fId", fId);
        returnJson.put("account", account);
        returnJson.put("contractId", contractId);
        return returnJson;
    }

    /**
     * 附加协议签署
     *
     * @param file     文件
     * @param fileType 文件类型
     * @param con_code 合同CODE
     * @return
     * @throws Exception
     */
    public JSONObject agreementSign(File file, String fileType, String con_code) throws Exception {
        if (StringUtils.isEmpty(con_code) || file == null || file.length() == 0 || StringUtils.isEmpty(fileType)) {
            throw new AppException("附加协议参数错误");
        }
        // 【获取合同信息】
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_Code(con_code);
        contractVo = contractService.selectContractObjectByCNo(contractVo);
        if (contractVo == null) {
            throw new AppException("没有发现合同信息");
        }

        // 【获取客户信息】
        UserCustomer customer = customerService.queryCustomerInfo(contractVo.getContractObject_1st());
        if (customer == null) {
            throw new AppException("没有发现客户信息");
        }
        // 【创建用户】
        String account = customer.getCc_cardNum();
        String name = customer.getCc_name();
        String phone = customer.getCcp_phone();
        String card = customer.getCc_cardNum();
        Integer cardType = customer.getCc_cardType();

        // 【上传协议】
        JSONObject result = BestSignUtil.uploadContractFile(file, "docx", 2);
        // 删除文件
        if (file.exists()) {
            file.delete();
        }
        if (result.getIntValue("errno") != 0) {
            throw new AppException(result.getString("errmsg"));
        }
        String fId = result.getJSONObject("data").getString("fid");
        if (StringUtils.isEmpty(fId)) {
            throw new AppException("无法获取文件ID");
        }

        // 【转换文件类型】
        if (!"PDF".equals(fileType.toUpperCase())) {
            result = BestSignUtil.convertFile(BestSignUtil.account, fId, "PDF");
            if (result.getIntValue("errno") != 0) {
                throw new AppException(result.getString("errmsg"));
            }
            fId = result.getJSONObject("data").getString("fid");
        }

        // 【获取文件META】
        result = BestSignUtil.getFileMeta(BestSignUtil.account, fId);
        if (result.getIntValue("errno") != 0) {
            result = BestSignUtil.getFileMeta(BestSignUtil.account, fId);
            throw new AppException(result.getString("errmsg"));
        }
        String pages = result.getJSONObject("data").getString("fpages");

        // 【创建合同】
        String title = "附加协议_" + contractVo.getContractObject_No() + "_" + new SimpleDateFormat("ddHHmmss").format(new Date());
        result = BestSignUtil.addContract(fId, title);
        if (result.getIntValue("errno") != 0) {
            throw new AppException(result.getString("errmsg"));
        }
        String contractId = result.getJSONObject("data").getString("contractId");
        if (StringUtils.isEmpty(contractId)) {
            throw new AppException("无法获取合同ID");
        }

        addUser(account, name, phone, card, cardType);

        // 【添加合同签署者】
        ArrayList<String> signers = new ArrayList<>();
        signers.add(BestSignUtil.account);
        signers.add(account);
        result = BestSignUtil.addContractSigner(contractId, signers);
        if (result.getIntValue("errno") != 0) {
            throw new AppException(result.getString("errmsg"));
        }
        JSONObject contractSignerData = result.getJSONObject("data");
        if (!"1".equals(contractSignerData.getString(BestSignUtil.account))) {
            throw new AppException("添加公司签署者失败");
        }
        if (!"1".equals(contractSignerData.getString(account))) {
            throw new AppException("添加客户签署者失败");
        }

        // 【公司签署合同】
        ArrayList<Object> signaturePositions = new ArrayList<>();
        signaturePositions.add(new HashMap<String, Object>() {{
            put("y", 0.12);
            put("x", 0.6);
            put("pageNum", pages);
        }});
        result = BestSignUtil.setContractSignCert(contractId, BestSignUtil.account, signaturePositions);
        if (result.getIntValue("errno") != 0) {
            throw new AppException(result.getString("errmsg"));
        }

        // 【设置客户合同签署参数】
        HashMap<String, Object> moreParam = new HashMap<>();
        signaturePositions = new ArrayList<>();
        signaturePositions.add(new HashMap<String, Object>() {{
            put("y", 0.11);
            put("x", 0.24);
            put("pageNum", pages);
        }});
        moreParam.put("signaturePositions", signaturePositions);
        moreParam.put("CERT_TYPE_CFCA", CERT_TYPE_CFCA);
        moreParam.put("vcodeMobile", phone); // 指定接收手机验证码的手机号（手签必填）
        moreParam.put("isAllowChangeSignaturePosition", 0); // 是否允许拖动（0：不允许，1：允许）
        moreParam.put("isDrawSignatureImage", 0); // 是否允许手绘签名（0：不允许，1：允许）
        result = BestSignUtil.setContractSignerConfig(contractId, account, moreParam);
        if (result.getIntValue("errno") != 0) {
            throw new AppException(result.getString("errmsg"));
        }

        JSONObject returnJson = new JSONObject();
        returnJson.put("fId", fId);
        returnJson.put("account", account);
        returnJson.put("contractId", contractId);
        return returnJson;
    }

    /**
     * 添加用户账号
     *
     * @param account 账号
     * @param name    姓名
     * @param phone   手机号
     * @param card    证件号
     * @throws Exception
     */
    private void addUser(String account, String name, String phone, String card, int cardType) throws Exception {
        JSONObject result;
        // 企业用户
        if (cardType == 3) {
            // 注册用户
            result = BestSignUtil.addUser(account, name, phone, 2);
            if (result.getIntValue("errno") != 0 && result.getIntValue("errno") != 241208) {
                throw new AppException(result.getString("errmsg"));
            }
            // 设置企业证件信息
            result = BestSignUtil.setEnterpriseCardInfo(account, card, name);
            if (result.getIntValue("errno") != 0 && result.getIntValue("errno") != 241308) {
                throw new AppException(result.getString("errmsg"));
            }
            // 申请数字证书
            result = BestSignUtil.applyCert(account, CERT_TYPE_ZJCA);
            if (result.getIntValue("errno") != 0 && result.getIntValue("errno") != 241308) {
                throw new AppException(result.getString("errmsg"));
            }
        } else {
            // 注册用户
            result = BestSignUtil.addUser(account, name, phone);
            if (result.getIntValue("errno") != 0 && result.getIntValue("errno") != 241208) {
                throw new AppException(result.getString("errmsg"));
            }
            String identityType;
            switch (cardType) {
                case AppConfig.TYPE_CARD_TYPE_1:
                    identityType = "0";
                    break;
                case AppConfig.TYPE_CARD_TYPE_2:
                    identityType = "2";
                    break;
                case AppConfig.TYPE_CARD_TYPE_3:
                    identityType = "8";
                    break;
                case AppConfig.TYPE_CARD_TYPE_4:
                    identityType = "1";
                    break;
                case AppConfig.TYPE_CARD_TYPE_5:
                    identityType = "C";
                    break;
                case AppConfig.TYPE_CARD_TYPE_6:
                    identityType = "B";
                    break;
                case AppConfig.TYPE_CARD_TYPE_7:
                    identityType = "F";
                    break;
                case AppConfig.TYPE_CARD_TYPE_8:
                    identityType = "P";
                    break;
                default:
                    identityType = "Z";
                    break;
            }
            // 设置用户证件信息
            result = BestSignUtil.setUserCardInfo(account, card, identityType, name);
            if (result.getIntValue("errno") != 0 && result.getIntValue("errno") != 241308) {
                throw new AppException(result.getString("errmsg"));
            }

            // 申请数字证书
            result = BestSignUtil.applyCert(account, CERT_TYPE_CFCA);
            if (result.getIntValue("errno") != 0 && result.getIntValue("errno") != 241308) {
                throw new AppException(result.getString("errmsg"));
            }
        }
    }

}
