package com.gjp.test;

import com.gjp.service.BestSignService;
import com.gjp.util.bestsign.BestSignUtil;

import java.text.SimpleDateFormat;

public class Test {

    public static void main(String[] args) throws Exception {
        // 合同签署流程
        // 上传合同文件->创建合同->添加用户->添加合同签署者->

        String accountB = "17823656668";
        String accountName = "但莹莹";
        String accountPhone = "17823656668";
        String accountCard = "510002197803152938";
        String certType = "CFCA";
//        String accountSign = FileUtil.encodeBase64File("D:\\Desktop\\348.png");
        String contractId = "1845307997220241955";
        SimpleDateFormat sdf_date = new SimpleDateFormat("yyyyMMddHHmmss");

//        System.out.println(BestSignUtil.downloadContractUrl(contractId).toJSONString());
//        System.out.println(BestSignUtil.getContractPreviewUrl(contractId, BestSignUtil.account).toJSONString());
//        System.out.println(BestSignUtil.queryUserInfo("15123384648").toJSONString());
//        System.out.println(BestSignUtil.getCert("18996060658", certType).toJSONString());

        // 1.上传文件
//        JSONObject fileJson = BestSignUtil.uploadContractFile(new File("D:\\Desktop\\contract.pdf"));
//        System.out.println(fileJson.toJSONString());

        // 2.创建合同
//        System.out.println(BestSignUtil.addContract(fileJson.getJSONObject("data").getString("fid"), "测试合同_" + sdf_date.format(new Date())).toJSONString());

        // 3.添加用户
//        System.out.println(BestSignUtil.addUser(accountB, accountName, accountPhone).toJSONString());

        // 查询用户信息
        System.out.println(BestSignUtil.getUserCardInfo(accountB).toJSONString());

        // 4.设置用户证件信息
//        SortedMap<String, Object> treeMap = new TreeMap<>();
//        treeMap.put("name", accountName);
//        System.out.println(BestSignUtil.setUserCardInfo(accountB, treeMap).toJSONString());
//        System.out.println(BestSignUtil.setUserCardInfo(accountB, accountCard, accountName).toJSONString());
//        System.out.println(BestSignUtil.getUserCardInfo(accountB).toJSONString());

        // 4.设置企业证件信息
//        System.out.println(BestSignUtil.setEnterpriseCardInfo(accountB, accountCard, accountName).toJSONString());
//        System.out.println(BestSignUtil.setEnterpriseCardInfo("18183101341", "500108010046282", "重庆大玩家动乐炫风娱乐有限公司").toJSONString());
//        System.out.println(BestSignUtil.setEnterpriseCardInfo(
//                "18183101341",
//                "91500108MA5YMWK52H", // 500108010046282
//                "91500108MA5YMWK52H", // 91500108MA5YMWK52H
//                "91500108MA5YMWK52H",// MA5YMWK52
//                "重庆大玩家动乐炫风娱乐有限公司",
//                "罗纪伟",// 舒戎
//                "500226199301221530",
//                "0",
//                "18183101341").toJSONString());
//
//        System.out.println(BestSignUtil.getEnterpriseCardInfo(accountB).toJSONString());
//        System.out.println(BestSignUtil.applyCert(accountB, "ZJCA").toJSONString()); // CFCA ZJCA

        // 5.申请用户数字证书
//        System.out.println(BestSignUtil.applyCert(accountB, certType).toJSONString());

        // 6.添加签署者
//        List<String> signerList = new ArrayList<>();
//        signerList.add(BestSignUtil.account);
//        signerList.add(accountB);
//        System.out.println(BestSignUtil.addContractSigner(contractId, signerList).toJSONString());

        // 创建用户签名/印章图片
//        System.out.println(BestSignUtil.addUserSignImage(accountB, "蒋庆涛").toJSONString());

        // 8.上传用户签名图片
//        System.out.println(BestSignUtil.uploadUserSignImage(BestSignUtil.account, accountSign).toJSONString());

        // 获取合同签署参数
//        System.out.println(BestSignUtil.getContractSignerConfig(contractId, accountB).toJSONString());;

        // 设置合同签署参数
//        HashMap<String, Object> moreParam = new HashMap<>();
//        ArrayList<Object> signaturePositions = new ArrayList<>();
//        signaturePositions.add(new HashMap<>() {{
//            put("y", 0.54);
//            put("x", 0.6);
//            put("pageNum", 2);
//        }});
//        signaturePositions.add(new HashMap<>() {{
//            put("y", 0.6);
//            put("x", 0.6);
//            put("pageNum", 3);
//        }});
//        moreParam.put("signaturePositions", signaturePositions);
//        System.out.println(BestSignUtil.setContractSignerConfig(contractId, BestSignUtil.account, moreParam).toJSONString());

        // 获取合同签名地址
//        System.out.println(BestSignUtil.getContractSignURL(contractId, accountB).toJSONString());

        // 上传合同签署照片
//        System.out.println(BestSignUtil.uploadContractSignPhoto(contractId, accountB, accountSign).toJSONString());

        // 9.设置合同参数
//        HashMap<String, Object> moreParam = new HashMap<>();
//        moreParam.put("certType", certType);
//        moreParam.put("vcodeMobile", "13008337788");
//        System.out.println(BestSignUtil.setContractSignerConfig(contractId, accountB, moreParam).toJSONString());
//        System.out.println(BestSignUtil.getContractSignerConfig(contractId, accountB).toJSONString());

        // 9.客户签署合同（用户必须有自己的数字证书）
//        ArrayList<Object> signaturePositions = new ArrayList<>();
////        signaturePositions.add(new HashMap<>() {{
////            put("y", 0.56);
////            put("x", 0.11);
////            put("pageNum", 2);
////        }});
////        signaturePositions.add(new HashMap<>() {{
////            put("y", 0.6);
////            put("x", 0.14);
////            put("pageNum", 3);
////        }});
//        signaturePositions.add(new HashMap<>() {{
//            put("y", 0.62);
//            put("x", 0.56);
//            put("pageNum", 2);
//        }});
//        System.out.println(BestSignUtil.setContractSignCert(contractId, accountB, signaturePositions).toJSONString());

//        // 7.公司签署合同（用户必须有自己的数字证书）
//        ArrayList<Object> signaturePositions = new ArrayList<>();
//        signaturePositions.add(new HashMap<>() {{
//            put("y", 0.66);
//            put("x", 0.11);
//            put("pageNum", 2);
//        }});
//        System.out.println(BestSignUtil.setContractSignCert(contractId, BestSignUtil.account, signaturePositions).toJSONString());

        // 10.结束合同

//        ArrayList<String> list = new ArrayList<>();
//        list.add("");
//        for (String str : list) {
//            new Thread(new Runnable() {
//                @Override
//                public void run() {
//                    try {
//                        System.out.println(BestSignUtil.contractFinish(str).toJSONString());
//                    } catch (Exception e) {
//                        e.printStackTrace();
//                    }
//                }
//            }).start();
//        }

//        System.out.println(BestSignUtil.contractFinish(contractId).toJSONString());

//        System.out.println(BestSignUtil.queryContractStatus(contractId).toJSONString());

//        System.out.println(BestSignUtil.queryContract(contractId).toJSONString());

//        System.out.println(BestSignUtil.downloadContractUrl(contractId).toJSONString());
    }
}