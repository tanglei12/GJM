package com.gjp.test;

import com.gjp.util.FileUtil;
import com.gjp.util.bestsign.BestSignUtil;
import org.junit.Test;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;

public class ContractSignTest {

    @Test
    public void contractSign() throws Exception {
        // 合同签署流程
        // 上传合同文件->创建合同->添加用户->添加合同签署者->

//        String accountB = "18580530813";
//        String accountName = "岑梦瑶";
//        String accountPhone = "18580530813";
//        String accountCard = "500107199306032427";
//        String accountSign = FileUtil.encodeBase64File("D:\\Desktop\\TIM图片20170907181916.png");
        String accountCertType = "CFCA";

        String contractId = "1813007896141628006";

        // 1.上传文件
//        JSONObject fileJson = BestSignUtil.uploadContractFile(new File("D:\\Desktop\\contract.pdf"));
//        System.out.println(fileJson.toJSONString());

        // 2.创建合同
//        System.out.println(BestSignUtil.addContract(fileJson.getJSONObject("data").getString("fid"), "测试合同_" + sdf_date.format(new Date())).toJSONString());

        // 查询用户信息
//        System.out.println(BestSignUtil.queryUserInfo("15123384499").toJSONString());

//        // 3.添加用户
//        System.out.println(BestSignUtil.addUser(accountB, accountName, accountPhone).toJSONString());
//
//        // 4.设置用户证件信息
//        System.out.println(BestSignUtil.setUserCardInfo(accountB, accountCard, accountName).toJSONString());

        // 5.申请用户数字证书
//        System.out.println(BestSignUtil.applyCert(accountB, accountCertType).toJSONString());

        // 6.添加签署者
//        List<String> signerList = new ArrayList<>();
//        signerList.add(BestSignUtil.account);
//        signerList.add(accountB);
//        System.out.println(BestSignUtil.addContractSigner(contractId, signerList).toJSONString());

        // 创建用户签名/印章图片
//        System.out.println(BestSignUtil.addUserSignImage(accountB, "蒋庆涛").toJSONString());

        // 8.上传用户签名图片
//        System.out.println(BestSignUtil.uploadUserSignImage(accountB, accountSign, accountB).toJSONString());

        // 获取合同签署参数
//        System.out.println(BestSignUtil.getContractSignerConfig(contractId, accountB).toJSONString());;

        // 设置合同签署参数
//        HashMap<String, Object> moreParam = new HashMap<>();
//        moreParam.put("certType", accountCertType);
//        moreParam.put("vcodeMobile", accountPhone);
//        System.out.println(BestSignUtil.setContractSignerConfig(contractId, accountB, moreParam).toJSONString());

        // 上传合同签署照片
//        System.out.println(BestSignUtil.uploadContractSignPhoto(contractId, accountB, accountSign).toJSONString());

//        HashMap<String, Object> moreParam = new HashMap<>();
//        ArrayList<Object> signaturePositions = new ArrayList<>();
////        signaturePositions.add(new HashMap<String, Object>() {{
////            put("y", 0.585);
////            put("x", 0.11);
////            put("pageNum", 2);
////        }});
//        signaturePositions.add(new HashMap<String, Object>() {{
//            put("y", 0.5);
//            put("x", 0.11);
//            put("pageNum", 2);
//        }});
//        signaturePositions.add(new HashMap<String, Object>() {{
//            put("y", 0.58);
//            put("x", 0.18);
//            put("pageNum", 3);
//        }});
//        moreParam.put("signaturePositions", signaturePositions);
//        moreParam.put("certType", accountCertType);
//        moreParam.put("vcodeMobile", accountPhone); // 指定接收手机验证码的手机号（手签必填）
//        moreParam.put("isAllowChangeSignaturePosition", 0); // 是否允许拖动（0：不允许，1：允许）
//        moreParam.put("isDrawSignatureImage", 0); // 是否允许手绘签名（0：不允许，1：允许）
//        System.out.println(BestSignUtil.setContractSignerConfig(contractId, accountB, moreParam).toJSONString());

        // 获取合同签名地址
//        System.out.println(BestSignUtil.getContractSignURL(contractId, "13418912550").toJSONString());

        // 9.客户签署合同（用户必须有自己的数字证书）
//        ArrayList<Object> signaturePositions = new ArrayList<>();
//        signaturePositions.add(new HashMap<>() {{
//            put("y", 0.5);
//            put("x", 0.1);
//            put("pageNum", 2);
//        }});
//        System.out.println(BestSignUtil.setContractSignCert(contractId, accountB, signaturePositions).toJSONString());

        // 7.公司签署合同（用户必须有自己的数字证书）
//        ArrayList<Object> signaturePositions = new ArrayList<>();
//        signaturePositions.add(new HashMap<>() {{
//            put("y", 0.1);
//            put("x", 0.1);
//            put("pageNum", 1);
//        }});
//        System.out.println(BestSignUtil.setContractSignCert(contractId, BestSignUtil.account, signaturePositions).toJSONString());

        // 10.结束合同
//        System.out.println(BestSignUtil.contractFinish("1812178632697709153").toJSONString());

//        System.out.println(BestSignUtil.queryContractStatus(contractId).toJSONString());
//
//        System.out.println(BestSignUtil.queryContract(contractId).toJSONString());
//
//        System.out.println(BestSignUtil.downloadContractUrl(contractId).toJSONString());
    }
}
