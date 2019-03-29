package com.gjp.util;

import com.gjp.util.sms.SmsClientSend;
import org.apache.axis.client.Call;
import org.apache.axis.client.Service;
import org.springframework.util.StringUtils;

import javax.xml.rpc.ServiceException;
import java.net.MalformedURLException;
import java.rmi.RemoteException;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SendMsg {

    /* 短信验证-地址 */
    private final static String SMS_VALID_URL = "http://webservice.smsadmin.cn/SGIP/SGIPService.php?WSDL";
    /* 短信验证-账户 */
    private final static String SMS_VALID_ACCOUNT = "cqguanjiapo";// "20150625";
    /* 短信验证-密码 */
    private final static String SMS_VALID_PASSWORD = "cqgjp123";// "123456";

    /* 华唐短信接口 */
    // 免审通道
    public static String url = "http://sms.ht3g.com/sms.aspx";
    public static String userid = "63";
    public static String account = "fangwutuoguan";
    public static String password = "fangwutuoguan";
    // 营销类
    public static String httpUrl1 = "http://sms.ht3g.com/sms.aspx";
    public static String userid1 = "63";
    // http://www.ht3g.com
    public static String account1 = "HTEK08791";
    public static String password1 = "123321";

    /**
     * 托管合同签订成功-发送至管家
     *
     * @param mobile           电话号码
     * @param house_address    房源地址
     * @param con_no           合同编号
     * @param con_startEndDate 合同起止日期
     * @param con_payType      合同付款方式
     * @param con_rent         合同租金
     * @return
     * @throws Exception
     */
    public static Map<String, Object> sendContractTgToEmp(String mobile, String em_name, String house_address, String con_no, String con_startEndDate, String con_payType, String con_rent) throws Exception {
        if (StringUtils.isEmpty(mobile)) {
            throw new AppException("电话号码不能为空");
        }
        if (StringUtils.isEmpty(em_name)) {
            throw new AppException("管家姓名不能为空");
        }
        if (StringUtils.isEmpty(house_address)) {
            throw new AppException("小区房号不能为空");
        }
        if (StringUtils.isEmpty(con_no)) {
            throw new AppException("合同编号不能为空");
        }
        if (StringUtils.isEmpty(con_startEndDate)) {
            throw new AppException("合同起止日期不能为空");
        }
        if (StringUtils.isEmpty(con_payType)) {
            throw new AppException("合同付租方式不能为空");
        }
        String msg = PropertiesUtil.getProperties("/conf/sms.properties").getProperty("emp.contract.tg");
        msg = MessageFormat.format(msg, em_name, house_address, con_no, con_startEndDate, con_payType, con_rent);
        boolean booSend = htSendMessage(mobile, msg);

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("msg_content", msg);
        resultMap.put("send_result", booSend ? 1 : 0);
        return resultMap;
    }

    /**
     * 租赁合同签订成功-发送至管家
     *
     * @param mobile           电话号码
     * @param house_address    房源地址
     * @param con_no           合同编号
     * @param con_startEndDate 合同起止日期
     * @param con_payType      合同付款方式
     * @param con_rent         合同租金
     * @return
     * @throws Exception
     */
    public static Map<String, Object> sendContractZlToEmp(String mobile, String em_name, String house_address, String con_no, String con_startEndDate, String con_payType, String con_rent) throws Exception {
        if (StringUtils.isEmpty(mobile)) {
            throw new AppException("电话号码不能为空");
        }
        if (StringUtils.isEmpty(em_name)) {
            throw new AppException("管家姓名不能为空");
        }
        if (StringUtils.isEmpty(house_address)) {
            throw new AppException("小区房号不能为空");
        }
        if (StringUtils.isEmpty(con_no)) {
            throw new AppException("合同编号不能为空");
        }
        if (StringUtils.isEmpty(con_startEndDate)) {
            throw new AppException("合同起止日期不能为空");
        }
        if (StringUtils.isEmpty(con_payType)) {
            throw new AppException("合同付租方式不能为空");
        }
        String msg = PropertiesUtil.getProperties("/conf/sms.properties").getProperty("emp.contract.zl");
        msg = MessageFormat.format(msg, em_name, house_address, con_no, con_startEndDate, con_payType, con_rent);
        boolean booSend = htSendMessage(mobile, msg);

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("msg_content", msg);
        resultMap.put("send_result", booSend ? 1 : 0);
        return resultMap;
    }

    /**
     * 托管合同签订成功-发送至客户
     *
     * @param mobile           电话号码
     * @param cc_name          客户姓名
     * @param house_address    房源地址
     * @param con_no           合同编号
     * @param con_startEndDate 合同起止日期
     * @param con_payType      合同付款方式
     * @param con_rent         合同租金
     * @return
     * @throws Exception
     */
    public static Map<String, Object> sendContractTgToCus(String mobile, String cc_name, String house_address, String con_no, String con_startEndDate, String con_payType, String con_rent) throws Exception {
        if (StringUtils.isEmpty(mobile)) {
            throw new AppException("电话号码不能为空");
        }
        if (StringUtils.isEmpty(cc_name)) {
            throw new AppException("客户姓名不能为空");
        }
        if (StringUtils.isEmpty(house_address)) {
            throw new AppException("小区房号不能为空");
        }
        if (StringUtils.isEmpty(con_no)) {
            throw new AppException("合同编号不能为空");
        }
        if (StringUtils.isEmpty(con_startEndDate)) {
            throw new AppException("合同起止日期不能为空");
        }
        if (StringUtils.isEmpty(con_payType)) {
            throw new AppException("合同付租方式不能为空");
        }
        String msg = PropertiesUtil.getProperties("/conf/sms.properties").getProperty("cus.contract.tg");
        msg = MessageFormat.format(msg, cc_name, house_address, con_no, con_startEndDate, con_payType, con_rent);

        boolean booSend = htSendMessage(mobile, msg);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("msg_content", msg);
        resultMap.put("send_result", booSend ? 1 : 0);
        return resultMap;
    }

    /**
     * 租赁合同签订成功-发送至客户
     *
     * @param mobile           电话号码
     * @param cc_name          客户姓名
     * @param house_address    房源地址
     * @param con_no           合同编号
     * @param con_startEndDate 合同起止日期
     * @param con_payType      合同付款方式
     * @param con_rent         合同租金
     * @return
     * @throws Exception
     */
    public static Map<String, Object> sendContractZlToCus(String mobile, String cc_name, String house_address, String con_no, String con_startEndDate, String con_payType, String con_rent) throws Exception {
        if (StringUtils.isEmpty(mobile)) {
            throw new AppException("电话号码不能为空");
        }
        if (StringUtils.isEmpty(cc_name)) {
            throw new AppException("客户姓名不能为空");
        }
        if (StringUtils.isEmpty(house_address)) {
            throw new AppException("小区房号不能为空");
        }
        if (StringUtils.isEmpty(con_no)) {
            throw new AppException("合同编号不能为空");
        }
        if (StringUtils.isEmpty(con_startEndDate)) {
            throw new AppException("合同起止日期不能为空");
        }
        if (StringUtils.isEmpty(con_payType)) {
            throw new AppException("合同付租方式不能为空");
        }
        String msg = PropertiesUtil.getProperties("/conf/sms.properties").getProperty("cus.contract.zl");
        msg = MessageFormat.format(msg, cc_name, house_address, con_no, con_startEndDate, con_payType, con_rent);

        boolean booSend = htSendMessage(mobile, msg);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("msg_content", msg);
        resultMap.put("send_result", booSend ? 1 : 0);
        return resultMap;
    }

    /**
     * 发送短信验证码消息
     *
     * @param mobile 手机号组每个手机号用分号隔开
     * @param msg    短信内容，字数跟据通道来确定字符长度
     * @return
     * @author JiangQT
     */
    public static boolean sendMessage(String mobile, String msg) {
        Service service = new Service();
        try {
            msg = "您正在进行管家婆账号注册，验证码：" + msg + "。如非本人操作，请忽略。【管家婆】";
            Call call = (Call) service.createCall();
            call.setTargetEndpointAddress(new java.net.URL(SMS_VALID_URL));
            call.setOperationName("sendSms");
            String lindid = "";// 短信流水号，互动名址有流水号
            String dtime = "";// 发送时间，为空时默认为系统当前时间
            String Char = "utf-8";// 编码，使用 UTF-8 发送时不能为空，默认为 GB2312
            Object[] obj = new Object[]{SMS_VALID_ACCOUNT, SMS_VALID_PASSWORD, mobile, msg, lindid, dtime, Char};
            String reVal = call.invoke(obj).toString();
            return "0".equals(AppUtil.xmlElements(reVal));
        } catch (ServiceException | MalformedURLException | RemoteException e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 发送催租短信
     *
     * @param mobile 手机号组每个手机号用分号隔开
     * @param msg    短信内容，字数跟据通道来确定字符长度
     * @return
     * @author JiangQT
     */
    public static boolean sendCuizu(String mobile, String msg) {
        Service service = new Service();
        try {
            msg = msg + "。如非本人，请忽略。【管家婆】";
            Call call = (Call) service.createCall();
            call.setTargetEndpointAddress(new java.net.URL(SMS_VALID_URL));
            call.setOperationName("sendSms");
            String lindid = "";// 短信流水号，互动名址有流水号
            String dtime = "";// 发送时间，为空时默认为系统当前时间
            String Char = "utf-8";// 编码，使用 UTF-8 发送时不能为空，默认为 GB2312
            Object[] obj = new Object[]{SMS_VALID_ACCOUNT, SMS_VALID_PASSWORD, mobile, msg, lindid, dtime, Char};
            String reVal = call.invoke(obj).toString();
            return "0".equals(AppUtil.xmlElements(reVal));
        } catch (ServiceException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (RemoteException e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 发送预定短信
     *
     * @param mobile 手机号组每个手机号用分号隔开
     * @param msg    短信内容，字数跟据通道来确定字符长度
     * @return
     * @author JiangQT
     */
    public static boolean sendYuDing(String mobile, String msg) {
        Service service = new Service();
        try {
            Call call = (Call) service.createCall();
            call.setTargetEndpointAddress(new java.net.URL(SMS_VALID_URL));
            call.setOperationName("sendSms");
            String lindid = "";// 短信流水号，互动名址有流水号
            String dtime = "";// 发送时间，为空时默认为系统当前时间
            String Char = "utf-8";// 编码，使用 UTF-8 发送时不能为空，默认为 GB2312
            Object[] obj = new Object[]{SMS_VALID_ACCOUNT, SMS_VALID_PASSWORD, mobile, msg, lindid, dtime, Char};
            String reVal = call.invoke(obj).toString();
            return "0".equals(AppUtil.xmlElements(reVal));
        } catch (ServiceException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (RemoteException e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 上海短信通道
     *
     * @param mobile 手机号组每个手机号用分号隔开
     * @param msg    短信内容，字数跟据通道来确定字符长度
     * @return
     * @author JiangQT
     */
    public static boolean sendSZB(String mobile, String msg) {
        Service service = new Service();
        try {
            Call call = (Call) service.createCall();
            call.setTargetEndpointAddress(new java.net.URL(SMS_VALID_URL));
            call.setOperationName("sendSms");
            String lindid = "";// 短信流水号，互动名址有流水号
            String dtime = "";// 发送时间，为空时默认为系统当前时间
            String Char = "utf-8";// 编码，使用 UTF-8 发送时不能为空，默认为 GB2312
            Object[] obj = new Object[]{SMS_VALID_ACCOUNT, SMS_VALID_PASSWORD, mobile, msg, lindid, dtime, Char};
            String reVal = call.invoke(obj).toString();
            return "0".equals(AppUtil.xmlElements(reVal));
        } catch (ServiceException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (RemoteException e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 华唐短信发送
     *
     * @param mobile   电话：18580428139,18716641778
     * @param content  内容
     * @return
     * @author 陈智颖
     */
    public static boolean htSendMessage(String mobile, String content) {
        return "ok".equals(SmsClientSend.sendSms(url, userid, account, password, mobile, content));
    }

    /**
     * 缴费发送短信
     *
     * @param customerName  客户姓名
     * @param house_address 房屋地址
     * @param date          2017-05-02至2017-06-05
     * @param money         金额
     * @param sendTime      发送时间
     * @param mobile        客户电话
     * @param em_phone      管家电话
     * @return
     * @author 陈智颖
     * @date May 10, 2017 5:19:07 PM
     */
    public static List<Map<String, Object>> sandPayBill(String customerName, String house_address, String date, Double money, String sendTime, String mobile, String em_phone) {

        List<Map<String, Object>> resultList = new ArrayList<>();

        Map<String, Object> snedCcMap = new HashMap<>();
        String content = "【管家婆】尊敬的" + customerName + "：您好，感谢您选择管家婆！您成功支付" + house_address + "房屋" + date + "费用" + money + "元。祝您工作顺利，万事如意！";
        boolean booCc = htSendMessage(mobile, content);
        snedCcMap.put("sendResult", booCc ? 1 : 0);
        snedCcMap.put("msg_content", content);
        snedCcMap.put("receive_type", 1);// 客户
        resultList.add(snedCcMap);

        Map<String, Object> snedEmMap = new HashMap<>();
        String content1 = "【管家婆】" + house_address + "客户" + customerName + "支付费用" + money + "元。";
        boolean booEm = htSendMessage(em_phone, content1);
        snedEmMap.put("sendResult", booEm ? 1 : 0);
        snedCcMap.put("msg_content", content1);
        snedCcMap.put("receive_type", 2);// 管家
        resultList.add(snedEmMap);

        return resultList;
    }

    /**
     * 登录短信验证
     *
     * @param mobile 手机号组每个手机号用分号隔开
     * @return
     * @author 王孝元
     */
    public static boolean sendLoginCode(String mobile, String code) {
        Service service = new Service();
        try {
            String msg = "您正在进行管家婆账号登录，验证码：" + code + "。如非本人操作，请忽略。【管家婆】";
            Call call = (Call) service.createCall();
            call.setTargetEndpointAddress(new java.net.URL(SMS_VALID_URL));
            call.setOperationName("sendSms");
            String lindid = "";// 短信流水号，互动名址有流水号
            String dtime = "";// 发送时间，为空时默认为系统当前时间
            String Char = "utf-8";// 编码，使用 UTF-8 发送时不能为空，默认为 GB2312
            Object[] obj = new Object[]{SMS_VALID_ACCOUNT, SMS_VALID_PASSWORD, mobile, msg, lindid, dtime, Char};
            String reVal = call.invoke(obj).toString();
            return "0".equals(AppUtil.xmlElements(reVal));
        } catch (ServiceException | MalformedURLException | RemoteException e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 发送短信
     *
     * @param mobile 电话号码
     * @param msg    消息
     * @return
     */
    @SuppressWarnings("unused")
    private static boolean send(String mobile, String msg) {
        Service service = new Service();
        try {
            Call call = (Call) service.createCall();
            call.setTargetEndpointAddress(new java.net.URL(SMS_VALID_URL));
            call.setOperationName("sendSms");
            String lindid = "";// 短信流水号，互动名址有流水号
            String dtime = "";// 发送时间，为空时默认为系统当前时间
            String Char = "utf-8";// 编码，使用 UTF-8 发送时不能为空，默认为 GB2312
            Object[] obj = new Object[]{SMS_VALID_ACCOUNT, SMS_VALID_PASSWORD, mobile, msg, lindid, dtime, Char};
            String reVal = call.invoke(obj).toString();
            return "0".equals(AppUtil.xmlElements(reVal));
        } catch (ServiceException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (RemoteException e) {
            e.printStackTrace();
        }
        return false;
    }
}