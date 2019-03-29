package com.gjp.util.bestsign;

import com.alibaba.fastjson.JSONObject;
import com.gjp.util.AppException;
import com.gjp.util.AppUtil;
import com.gjp.util.PropertiesUtil;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.util.DigestUtils;

import java.io.File;
import java.io.FileInputStream;
import java.net.URLEncoder;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.Signature;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.*;

/**
 * @author JiangQt
 * @description
 * @date Created in 2017-9-5
 */
public class BestSignUtil {

    /* 签名配置 */
    private static Properties propertieSgin = PropertiesUtil.getProperties("/conf/best-sign.properties");
    /* 公共请求地址 */
    private static String url = propertieSgin.getProperty("best.sign.url");
    /* 开发者ID */
    public static String developerId = propertieSgin.getProperty("best.sign.developerId");
    /* 账号 */
    public static String account = propertieSgin.getProperty("best.sign.account");
    /* 私钥 */
    private static String privateKey = propertieSgin.getProperty("best.sign.privateKey");
    /* 头部请求 */
    private static Map<String, Object> headers = new HashMap<String, Object>() {{
        put("Content-Type", "application/json");
    }};

    /**
     * 用户注册
     *
     * @param account
     * @param name
     * @param mobile
     * @return
     * @throws Exception
     */
    public static JSONObject addUser(String account, String name, String mobile) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("account", account);
        treeMap.put("name", name);
        treeMap.put("userType", 1);
        // treeMap.put("mail", mail);
        treeMap.put("mobile", mobile);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.user_reg"));
    }

    /**
     * 用户注册
     *
     * @param account
     * @param name
     * @param mobile
     * @param userType
     * @return
     * @throws Exception
     */
    public static JSONObject addUser(String account, String name, String mobile, int userType) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("account", account);
        treeMap.put("name", name);
        treeMap.put("userType", userType);
        // treeMap.put("mail", mail);
        treeMap.put("mobile", mobile);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.user_reg"));
    }

    /**
     * 设置用户证件信息
     *
     * @param account  用户账号
     * @param identity 证件号
     * @param name     姓名
     * @return
     * @throws Exception
     */
    public static JSONObject setUserCardInfo(String account, String identity, String name) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("account", account);
        treeMap.put("identity", identity);
        treeMap.put("name", name);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.set_user_card_info"));
    }

    /**
     * 设置用户证件信息
     *
     * @param account      用户账号
     * @param identity     证件号
     * @param identityType 证件类型
     * @param name         姓名
     * @return
     * @throws Exception
     */
    public static JSONObject setUserCardInfo(String account, String identity, String identityType, String name) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("account", account);
        treeMap.put("identity", identity);
        treeMap.put("identityType", identityType);
        treeMap.put("name", name);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.set_user_card_info"));
    }

    /**
     * 设置用户证件信息
     *
     * @param account 用户账号
     * @param treeMap 参数
     * @return
     * @throws Exception
     */
    public static JSONObject setUserCardInfo(String account, SortedMap<String, Object> treeMap) throws Exception {
        treeMap.put("account", account);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.set_user_card_info"));
    }

    /**
     * 设置企业用户认证
     *
     * @param account
     * @param code
     * @param name
     * @return
     * @throws Exception
     */
    public static JSONObject setEnterpriseCardInfo(String account, String code, String name) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("account", account);
        treeMap.put("regCode", code);
        treeMap.put("taxCode", "");
        treeMap.put("orgCode", "");
        treeMap.put("name", name);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.set_enterprise_card_info"));
    }

    /**
     * 设置企业用户认证
     *
     * @param account
     * @param name
     * @return
     * @throws Exception
     */
    public static JSONObject setEnterpriseCardInfo(
            String account,
            String regCode,
            String taxCode,
            String orgCode,
            String name,
            String legalPerson,
            String legalPersonIdentity,
            String legalPersonIdentityType,
            String legalPersonMobile) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("account", account);
        // 工商注册号
        treeMap.put("regCode", regCode);
        // 税务登记证号
        treeMap.put("taxCode", taxCode);
        // 组织机构代码
        treeMap.put("orgCode", orgCode);
        // 企业名称
        treeMap.put("name", name);
        // 法人代表姓名或经办人姓名
        treeMap.put("legalPerson", legalPerson);
        // 法人代表证件号或经办人证件号
        treeMap.put("legalPersonIdentity", legalPersonIdentity);
        // 法人代表证件类型或经办人证件类型
        treeMap.put("legalPersonIdentityType", legalPersonIdentityType);
        // 法人代表手机号或经办人手机号
        treeMap.put("legalPersonMobile", legalPersonMobile);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.set_enterprise_card_info"));
    }

    /**
     * 申请用户数字证书
     *
     * @param account  账号
     * @param certType 证书类型
     * @return
     * @throws Exception
     */
    public static JSONObject applyCert(String account, String certType) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("account", account);
        treeMap.put("certType", certType);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.apply_cert"));
    }

    /**
     * 获取用户数字证书
     *
     * @param account  账号
     * @param certType 证书类型
     * @return
     * @throws Exception
     */
    public static JSONObject getCert(String account, String certType) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("account", account);
        treeMap.put("certType", certType);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.get_cert"));
    }

    /**
     * 创建合同
     *
     * @param fid   合同文件ID
     * @param title 标题
     * @return
     * @throws Exception
     */
    public static JSONObject addContract(String fid, String title) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("account", account);
        treeMap.put("fid", fid);
        treeMap.put("expireTime", Long.valueOf((System.currentTimeMillis() + "").substring(0, 10)) + (Integer.valueOf(propertieSgin.getProperty("best.expire_time")) * 24 * 60 * 60));
        treeMap.put("title", title);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.create_contract"));
    }

    /**
     * 添加用户签名图片
     *
     * @param account
     * @param text
     * @return
     * @throws Exception
     */
    public static JSONObject addUserSignImage(String account, String text) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("account", account);
        treeMap.put("text", text);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.create_user_sign_image"));
    }

    /**
     * 添加合同签署者
     *
     * @param contractId 合同ID
     * @param signer     签署者账号
     * @return
     * @throws Exception
     */
    public static JSONObject addContractSigner(String contractId, String signer) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("contractId", contractId);
        treeMap.put("signer", signer);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.add_contract_signer"));
    }

    /**
     * 批量添加合同签署者
     *
     * @param contractId 合同ID
     * @param signers    签署者账号集合
     * @return
     * @throws Exception
     */
    public static JSONObject addContractSigner(String contractId, List<String> signers) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("contractId", contractId);
        treeMap.put("signers", signers);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.add_contract_signers"));
    }

    /**
     * 上传合同文件
     *
     * @param file 文件
     * @return
     * @throws Exception
     */
    public static JSONObject uploadContractFile(File file) throws Exception {
        byte[] bytes = IOUtils.toByteArray(new FileInputStream(file));

        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("account", account);
        treeMap.put("fdata", Base64.encodeBase64String(bytes));
        treeMap.put("fmd5", DigestUtils.md5DigestAsHex(bytes));
        treeMap.put("ftype", "PDF");
        treeMap.put("fname", file.getName());
        treeMap.put("fpages", PDDocument.load(file).getNumberOfPages());

        return getResult(treeMap, propertieSgin.getProperty("best.sign.upload_file"));
    }

    /**
     * 上传合同文件
     *
     * @param file 文件
     * @return
     * @throws Exception
     */
    public static JSONObject uploadContractFile(File file, String ftype, int fpages) throws Exception {
        byte[] bytes = IOUtils.toByteArray(new FileInputStream(file));

        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("account", account);
        treeMap.put("fdata", Base64.encodeBase64String(bytes));
        treeMap.put("fmd5", DigestUtils.md5DigestAsHex(bytes));
        treeMap.put("ftype", ftype);
        treeMap.put("fname", file.getName());
        treeMap.put("fpages", fpages);

        return getResult(treeMap, propertieSgin.getProperty("best.sign.upload_file"));
    }

    /**
     * 转换文件类型
     *
     * @param account
     * @param fid
     * @param ftype
     * @return
     * @throws Exception
     */
    public static JSONObject convertFile(String account, String fid, String ftype) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("account", account);
        treeMap.put("fid", fid);
        treeMap.put("ftype", ftype);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.convert_file"));
    }

    /**
     * 获取文件META
     *
     * @param account
     * @param fid
     * @return
     * @throws Exception
     */
    public static JSONObject getFileMeta(String account, String fid) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("account", account);
        treeMap.put("fid", fid);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.get_file_meta"));
    }

    /**
     * 上传合同签署照片
     *
     * @param contractId 合同ID
     * @param account    签署者
     * @param imagedata  签署文件数据，base64编码
     * @return
     * @throws Exception
     */
    public static JSONObject uploadContractSignPhoto(String contractId, String account, String imagedata) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("contractId", contractId);
        treeMap.put("account", account);
        treeMap.put("imagedata", imagedata);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.upload_contract_sign_photo"));
    }

    /**
     * 上传用户签名图片
     *
     * @param account   账号
     * @param imageData 图片数据
     * @return
     * @throws Exception
     */
    public static JSONObject uploadUserSignImage(String account, String imageData) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("account", account);
        treeMap.put("imageData", imageData);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.upload_user_sign_image"));
    }

    /**
     * 上传用户签名图片
     *
     * @param account   账号
     * @param imageData 图片数据
     * @param imageName 印章名称
     * @return
     * @throws Exception
     */
    public static JSONObject uploadUserSignImage(String account, String imageData, String imageName) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("account", account);
        treeMap.put("imageData", imageData);
        treeMap.put("imageName", imageName);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.upload_user_sign_image"));
    }

    /**
     * 下载用户签名图片
     *
     * @param account 账号
     * @return
     * @throws Exception
     */
    public static JSONObject downloadUserSignImage(String account) throws Exception {
        return downloadUserSignImage(account, "default");
    }

    /**
     * 下载用户签名图片
     *
     * @param account   账号
     * @param imageName 图片名称
     * @return
     * @throws Exception
     */
    public static JSONObject downloadUserSignImage(String account, String imageName) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("account", account);
        treeMap.put("imageName", imageName);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.download_user_sign_image"));
    }

    /**
     * 下载合同附件地址
     *
     * @param contractId
     * @return
     * @throws Exception
     */
    public static JSONObject downloadContractUrl(String contractId) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("contractId", contractId);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.download_contract_url"));
    }

    /**
     * 设置合同配置
     *
     * @param contractId 合同ID
     * @param account    签署者
     * @param moreParam  更多参数
     * @return
     * @throws Exception
     */
    public static JSONObject setContractSignerConfig(String contractId, String account, HashMap<String, Object> moreParam) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("contractId", contractId);
        treeMap.put("account", account);
        treeMap.putAll(moreParam);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.set_contract_signer_config"));
    }

    /**
     * 设置合同配置
     *
     * @param contractId         合同ID
     * @param account            签署者
     * @param signaturePositions 签署位置[{y:0.0~1.0,x:0.0~1.0,pageNum:1}]
     * @return
     * @throws Exception
     */
    public static JSONObject setContractSignerConfig(String contractId, String account, ArrayList<Object> signaturePositions) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("contractId", contractId);
        treeMap.put("account", account);
        if (signaturePositions != null) treeMap.put("signaturePositions", signaturePositions);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.set_contract_signer_config"));
    }

    /**
     * 合同签署
     *
     * @param contractId         合同ID
     * @param signer             签署者
     * @param signaturePositions 签署位置[{y:0.0~1.0,x:0.0~1.0,pageNum:1}]
     * @return
     * @throws Exception
     */
    public static JSONObject setContractSignCert(String contractId, String signer, ArrayList<Object> signaturePositions) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("contractId", contractId);
        treeMap.put("signer", signer);
        treeMap.put("signaturePositions", signaturePositions);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.set_contract_sign_cert"));
    }

    /**
     * 获取合同配置
     *
     * @param contractId 合同ID
     * @param account    签署者
     * @return
     * @throws Exception
     */
    public static JSONObject getContractSignerConfig(String contractId, String account) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("contractId", contractId);
        treeMap.put("account", account);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.get_contract_signer_config"));
    }

    /**
     * 获取合同手动签名地址
     *
     * @param contractId
     * @param account
     * @return
     * @throws Exception
     */
    public static JSONObject getContractSignURL(String contractId, String account) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("contractId", contractId);
        treeMap.put("account", account);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.get_contract_signurl"));
    }

    /**
     * 预览合同
     *
     * @param contractId 合同ID
     * @param contractId 合同ID
     * @return
     * @throws Exception
     */
    public static JSONObject getContractPreviewUrl(String contractId, String account) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("contractId", contractId);
        treeMap.put("account", account);
        treeMap.put("quality", 100);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.preview_contract"));
    }

    /**
     * 合同预览
     *
     * @param contractId 合同ID
     * @param account    账号
     * @param expireAt   过期时间
     * @return
     * @throws Exception
     */
    public static JSONObject getContractPreviewUrl(String contractId, String account, String expireAt) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("contractId", contractId);
        treeMap.put("account", account);
        treeMap.put("quality", 100);
        treeMap.put("expireAt", expireAt);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.preview_contract"));
    }

    /**
     * 查询合同
     *
     * @param contractId 合同ID
     * @return
     * @throws Exception
     */
    public static JSONObject queryContract(String contractId) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("contractId", contractId);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.query_contract"));
    }

    /**
     * 查询合同签署状态
     *
     * @param contractId
     * @return
     * @throws Exception
     */
    public static JSONObject queryContractStatus(String contractId) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("contractId", contractId);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.query_contract_status"));
    }

    /**
     * 查询用户信息
     *
     * @param account
     * @return
     * @throws Exception
     */
    public static JSONObject getUserCardInfo(String account) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("account", account);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.get_user_card_info"));
    }

    /**
     * 查询企业用户证件信息
     *
     * @param account
     * @return
     * @throws Exception
     */
    public static JSONObject getEnterpriseCardInfo(String account) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("account", account);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.get_enterprise_card_info"));
    }

    /**
     * 签署完成
     *
     * @param contractId 合同ID
     * @return
     * @throws Exception
     */
    public static JSONObject contractFinish(String contractId) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("contractId", contractId);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.contract_finish"));
    }

    /**
     * 拒绝签署
     *
     * @param contractId   合同ID
     * @param signer       签署者账号
     * @param refuseReason 拒绝原因
     * @return
     * @throws Exception
     */
    public static JSONObject contractRefuse(String contractId, String signer, String refuseReason) throws Exception {
        SortedMap<String, Object> treeMap = new TreeMap<>();
        treeMap.put("contractId", contractId);
        treeMap.put("signer", signer);
        treeMap.put("refuseReason", refuseReason);
        return getResult(treeMap, propertieSgin.getProperty("best.sign.contract_refuse"));
    }

    /**
     * 获取请求结果
     *
     * @param treeMap 参数
     * @param path    地址
     * @return
     * @throws Exception
     */
    private static JSONObject getResult(SortedMap<String, Object> treeMap, String path) throws Exception {
        String md5 = EncodeUtils.md5(JSONObject.toJSONString(treeMap).getBytes("UTF-8"));
        String rtick = AppUtil.getOrderCode("");
        String sign = URLEncoder.encode(getSign(path, rtick, md5), "UTF-8");
        String request_url = url + path + "/?developerId=" + developerId + "&rtick=" + rtick + "&sign=" + sign + "&signType=rsa";
        String param = JSONObject.toJSONString(treeMap);
        Map<String, Object> response = HttpSender.getResponseString("POST", request_url, param, headers);
        if (response == null) {
            throw new AppException("请求失败");
        }
        int responseCode = (int) response.get("responseCode");
        if (responseCode != 200) {
            throw new AppException("请求异常");
        }
        return JSONObject.parseObject((String) response.get("responseData"));
    }

    /**
     * 获取签名
     *
     * @param path
     * @param rtick
     * @param md5
     * @return
     * @throws Exception
     */
    private static String getSign(String path, String rtick, String md5) throws Exception {
        String sign = String.format("developerId=%srtick=%ssignType=rsa/openapi/v3%s/%s", developerId, rtick, path, md5);
        return rsaSign(sign);
    }

    /**
     * 加密签名
     *
     * @param data
     * @return
     * @throws Exception
     */
    private static String rsaSign(String data) throws Exception {
        byte[] privateKeyBytes = Base64.decodeBase64(privateKey);
        PKCS8EncodedKeySpec pkcs8KeySpec = new PKCS8EncodedKeySpec(privateKeyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PrivateKey priKey = keyFactory.generatePrivate(pkcs8KeySpec);
        Signature signature = Signature.getInstance("SHA1withRSA");
        signature.initSign(priKey);
        signature.update(data.getBytes("UTF-8"));
        return Base64.encodeBase64String(signature.sign());
    }
}
