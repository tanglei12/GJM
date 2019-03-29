package com.gjp.util;

import com.gjp.util.sms.SmsClientSend;

import java.text.MessageFormat;
import java.util.Properties;

public class SmsUtil {

    // 免审通道
    public static final String HUA_TANG_URL = "http://sms.ht3g.com/sms.aspx";
    public static final String HUA_TANG_USERID = "63";
    public static final String HUA_TANG_ACCOUNT = "fangwutuoguan";
    public static final String HUA_TANG_PASSWORD = "fangwutuoguan";

    private static Properties propertiesSMS = PropertiesUtil.getProperties("/conf/sms.properties");

    /**
     * 发送华唐信息
     *
     * @param mobile
     * @param content
     * @return
     */
    private static boolean sendHuaTangSMS(String mobile, String content) {
        return "ok".equals(SmsClientSend.sendSms(HUA_TANG_URL, HUA_TANG_USERID, HUA_TANG_ACCOUNT, HUA_TANG_PASSWORD, mobile, content));
    }

    /**
     * 发送定金短信
     *
     * @param mobile        手机号码
     * @param house_address 小区房号
     * @param cc_name       客户姓名
     * @param ccp_phone     客户号码
     * @param bco_money     定金金额
     * @return
     */
    public static void sendEmpDepositSMS(String mobile, String house_address, String cc_name, String ccp_phone, String bco_money) {
        // # 缴纳定金【管家婆】{万达广场1-1}客户{管某某}-{151xxxx8888}成功缴纳定金{1200}元。
        String content = propertiesSMS.getProperty("emp.deposit");
        sendHuaTangSMS(mobile, MessageFormat.format(content, house_address, cc_name, ccp_phone, bco_money));
    }

    /**
     * 发送定金短信
     *
     * @param mobile        手机号码
     * @param house_address 小区房号
     * @param cc_name       客户姓名
     * @param bco_money     定金金额
     * @param day           预留期
     * @param em_name
     * @param em_phone
     * @return
     */
    public static void sendCusDepositSMS(String mobile, String house_address, String cc_name, String bco_money, String day, String em_name, String em_phone) {
        // # 缴纳定金【管家婆】恭喜您{管某某}，已成功预定{万达广场1-1}，并缴纳定金{300}元，定金预留期限为{3}天，请您在预留期内与管家联系。如有疑问，请您及时与管家{XXX}-{151xxxx8888}联系。祝您工作顺利，万事如意！
        String content = propertiesSMS.getProperty("cus.deposit");
        sendHuaTangSMS(mobile, MessageFormat.format(content, cc_name, house_address, bco_money, day, em_name, em_phone));
    }

    /**
     * 发送管家租金消息
     *
     * @param mobile        手机号码
     * @param con_type      合同类型
     * @param house_address 小区房号
     * @param cc_name       客户姓名
     * @param bco_cycle     账单期数
     * @param bco_money     账单金额
     */
    public static void sendEmpRentSMS(String mobile, String con_type, String house_address, String cc_name, String bco_cycle, String bco_money) {
        if ("租赁合同".equals(con_type)) {
            // 【管家婆】{万达广场1-1}租客{管某某}成功缴纳第{1}期租金{1200}元。
            String content = propertiesSMS.getProperty("emp.rentBill_zl");
            sendHuaTangSMS(mobile, MessageFormat.format(content, house_address, cc_name, bco_cycle, bco_money));
        }
    }

    /**
     * 发送客户租金消息
     *
     * @param mobile
     * @param content
     * @return
     */
    public static boolean sendServiceSMS(String mobile, String content) {
        return sendHuaTangSMS(mobile, content);
    }

    /**
     * 发送客户租金消息
     *
     * @param mobile
     * @param content
     * @return
     */
    public static boolean sendBalanceSMS(String mobile, String content) {
        return sendHuaTangSMS(mobile, content);
    }

    /**
     * 发送客户租金消息
     *
     * @param mobile        手机号码
     * @param con_type      合同类型
     * @param house_address 小区房号
     * @param cc_name       客户姓名
     * @param bco_cycle     账单期数
     * @param bco_money     账单金额
     */
    public static void sendCusRentSMS(String mobile, String con_type, String house_address, String cc_name, String bco_cycle, String bco_money) {
        if ("租赁合同".equals(con_type)) {
            // 【管家婆】尊敬的{客户}：您好，感谢您选择管家婆！恭喜您成功支付{万达广场1-1}第{1}期租金{1200}元。如有疑问，请您与管家婆财务88067511分机2联系。祝您工作顺利，万事如意！
            String content = propertiesSMS.getProperty("cus.rentBill_zl");
            boolean sms = sendHuaTangSMS(mobile, MessageFormat.format(content, cc_name, house_address, bco_cycle, bco_money));
            System.out.println(sms);
        }
    }

    /**
     * 发送合同短信
     *
     * @param mobile           手机号码
     * @param con_type         合同类型
     * @param cc_name          客户姓名
     * @param house_address    房源地址
     * @param con_no           合同号
     * @param con_startEndDate 合同期限
     * @param con_payType      付款方式
     * @param con_rent         合同租金
     * @return
     */
    public static void sendCusContractSMS(String mobile, String con_type, String cc_name, String house_address, String con_no, String con_startEndDate, String con_payType, String con_rent) {
        String content = "";
        // # 签订托管合同【管家婆】尊敬的{管某某}：您好，感谢您选择管家婆！恭喜您{万达广场1-1}房屋托管成功，合同编号{8888888888}，委托期限{2017-08-08~2018-08-07}，{月付}租金{1200}元/月（代付）。
        if ("托管合同".equals(con_type)) {
            content = propertiesSMS.getProperty("cus.contract_tg");
        }
        if ("租赁合同".equals(con_type)) {
            content = propertiesSMS.getProperty("cus.contract_zl");
        }
        sendHuaTangSMS(mobile, MessageFormat.format(content, cc_name, house_address, con_no, con_startEndDate, con_payType, con_rent));
    }

    /**
     * 发送合同短信
     *
     * @param mobile           手机号码
     * @param con_type         合同类型
     * @param house_address    房源地址
     * @param con_no           合同号
     * @param con_startEndDate 合同期限
     * @param con_payType      付款方式
     * @param con_rent         合同租金
     * @return
     */
    public static void sendEmpContractSMS(String mobile, String con_type, String house_address, String con_no, String con_startEndDate, String con_payType, String con_rent) {
        String content = "";
        if ("托管合同".equals(con_type)) {
            // # 签订托管合同【管家婆】亲，恭喜你存房成功，签约{万达广场1-1}，合同编号{8888888888}，租期{2017-08-08~2018-08-07}，{月付}，租金{1200}元/月。
            content = propertiesSMS.getProperty("emp.contract_tg");
        }
        if ("租赁合同".equals(con_type)) {
            content = propertiesSMS.getProperty("emp.contract_zl");
        }
        sendHuaTangSMS(mobile, MessageFormat.format(content, house_address, con_no, con_startEndDate, con_payType, con_rent));
    }

    /**
     * 发送催租短信
     *
     * @param mobile
     * @param cc_name
     * @param con_rent
     * @param repaymentDate
     */
    public static String sendPressRentSMS(String mobile, String cc_name, String house_address, String con_rent, String repaymentDate) {
        // 【管家婆】亲爱的{0}，您租住的{1}房屋本期应交房租{2}元，最后交租日期{3}，请您下载“管家婆租房”APP及时支付，避免逾期产生滞纳金。
        String content = propertiesSMS.getProperty("cus.press_rent");
        String msg = MessageFormat.format(content, cc_name, house_address, con_rent, repaymentDate);
        sendHuaTangSMS(mobile, msg);
        return msg;
    }

    /**
     * 发送催租短信
     *
     * @param mobile
     * @param cc_name
     * @param bco_currentOverDay
     * @param bcb_repayment
     * @param bcb_repaymentDate
     */
    public static String sendCusRentOverdueSMS(String mobile, String cc_name, String house_address, String bco_currentOverDay, String bcb_repayment, String bcb_repaymentDate) {
        // 【管家婆】逾期提醒：尊敬的{0}，您租住的{1}房屋已经逾期{2}天，本期应交房租{3}元，最后交租日期{4}
        String msg = MessageFormat.format(propertiesSMS.getProperty("cus.rent_overdue"), cc_name, house_address, bco_currentOverDay, bcb_repayment, bcb_repaymentDate);
        boolean tangSMS = sendHuaTangSMS(mobile, msg);
        System.out.println(tangSMS);
        return msg;
    }

    /**
     * 发送房屋强收短信
     *
     * @param mobile
     * @param cc_name
     * @param bco_currentOverDay
     * @param bcb_repayment
     * @param bcb_repaymentDate
     */
    public static String sendCusHouseRecoverySMS(String mobile, String cc_name, String house_address, String bco_currentOverDay, String bcb_repayment, String bcb_repaymentDate) {
        // 【管家婆】强制收房通知：尊敬的{0}，您租住的{1}房屋已经逾期{2}天，本期应交房租{3}元，最后交租日期{4}
        String msg = MessageFormat.format(propertiesSMS.getProperty("cus.house_recovery"), cc_name, house_address, bco_currentOverDay, bcb_repayment, bcb_repaymentDate);
        sendHuaTangSMS(mobile, msg);
        return msg;
    }

    /**
     * 发送房屋强收短信
     *
     * @param bco_empPhone
     * @param house_address
     * @param bco_customerName
     * @param bco_customerPhone
     * @return
     */
    public static String sendEmpHouseRecoverySMS1(String bco_empPhone, String house_address, String bco_customerName, String bco_customerPhone) {
        // 【管家婆】亲，{0}租客{1}-{2}已经逾期4天，请你今天务必上门贴条催收，并做好强制收房前期事宜！
        String content = MessageFormat.format(propertiesSMS.getProperty("emp.house_recovery_1"), house_address, bco_customerName, bco_customerPhone);
        sendHuaTangSMS(bco_empPhone, content);
        return content;
    }

    /**
     * 发送房屋强收短信
     *
     * @param ucc_phone
     * @param ucc_person
     * @param house_address
     * @param bco_customerName
     * @param bco_customerPhone
     * @return
     */
    public static String sendEmpHouseRecoverySMS2(String ucc_phone, String ucc_person, String house_address, String bco_customerName, String bco_customerPhone) {
        // 【管家婆】{0}，{1}租客{2}-{3}已经逾期5天
        String msg = MessageFormat.format(propertiesSMS.getProperty("emp.house_recovery_2"), ucc_person, house_address, bco_customerName, bco_customerPhone);
        sendHuaTangSMS(ucc_phone, msg);
        return msg;
    }

    /**
     * 发送管家、门店服务费用短信
     *
     * @param emp_type
     * @param em_name
     * @param em_phone
     * @param house_address
     * @param sm_name
     * @param pay_money
     * @return
     */
    public static String sendEmpServicePayInfo(String emp_type, String em_name, String em_phone, String house_address, String sm_name, String pay_money, String pay_object) {
        // 【管家婆】{0}{1}，{2}房屋{3}已经完毕，本次服务应付费用{4}元，将由{5}承担。如有疑问，请联系客服部咨询。
        String msg = MessageFormat.format(propertiesSMS.getProperty("emp.service_pay"), emp_type, em_name, house_address, sm_name, pay_money, pay_object);
        sendHuaTangSMS(em_phone, msg);
        return msg;
    }

    /**
     * 发送租客、房东、用户服务费用短信
     *
     * @param cc_name
     * @param ccp_phone
     * @param house_address
     * @param sm_name
     * @param pay_money
     * @return
     */
    public static String sendCusServicePayInfo(String cc_name, String ccp_phone, String house_address, String sm_name, String pay_money) {
        // 【管家婆】尊敬的{0}，{1}房屋{2}已经完毕，本次服务共计费用{3}元，请您在“管家婆租房”在APP中及时确认支付。如有疑问，请联系88067511转3咨询。祝您生活愉快！
        String msg = MessageFormat.format(propertiesSMS.getProperty("cus.service_pay"), cc_name, house_address, sm_name, pay_money);
        sendHuaTangSMS(ccp_phone, msg);
        return msg;
    }

    /**
     * 发送服务受理通知短信
     *
     * @param phone
     * @param name
     * @param house_address
     * @param sm_name
     * @return
     */
    public static String sendServiceAcceptInfo(String phone, String name, String house_address, String sm_name) {
        // 【管家婆】尊敬的{0}，您申请的{1}房屋{2}服务已经成功受理。如有疑问，请联系88067511转3咨询。祝您生活愉快！
        String msg = MessageFormat.format(propertiesSMS.getProperty("ser.service_accept"), name, house_address, sm_name);
        sendHuaTangSMS(phone, msg);
        return msg;
    }

    /**
     * 发送服务拒绝受理通知短信
     *
     * @param phone
     * @param name
     * @param house_address
     * @param sm_name
     * @param reason
     * @return
     */
    public static String sendServiceRefuseInfo(String phone, String name, String house_address, String sm_name, String reason) {
        // 【管家婆】尊敬的{0}，您申请的{1}房屋{2}服务因为{3}原因拒绝受理。如有疑问，请联系88067511转3咨询。祝您生活愉快！
        String msg = MessageFormat.format(propertiesSMS.getProperty("ser.service_refuse"), name, house_address, sm_name, reason);
        sendHuaTangSMS(phone, msg);
        return msg;
    }

    /**
     * 发送服务关闭通知短信
     *
     * @param phone
     * @param name
     * @param house_address
     * @param sm_name
     * @param reason
     * @return
     */
    public static String sendServiceCloseInfo(String phone, String name, String house_address, String sm_name, String reason) {
        // 【管家婆】尊敬的{0}，您申请的{1}房屋{2}服务因为{3}原因关闭。如有疑问，请联系88067511.祝您生活愉快！
        String msg = MessageFormat.format(propertiesSMS.getProperty("ser.service_close"), name, house_address, sm_name, reason);
        sendHuaTangSMS(phone, msg);
        return msg;
    }

    /**
     * 发送支付宝平台预约看房短信
     *
     * @param house_address
     * @return
     */
    public static String sendLookAtHouse(String emPhone, String emName, String house_address, String bookName, String bookSexStr, String bookPhone, String lookTime, String remark) {
        // 【管家婆】管家{0}，房屋{1}带看提醒，预约客户{2}{3}，电话{4}，预约时间{5}，【{6}】。请及时联系客户，并反馈带看结果。如已带看，请忽略。
        String msg = MessageFormat.format(propertiesSMS.getProperty("emp.look_house"), emName, house_address, bookName, bookSexStr, bookPhone, lookTime, remark);
        sendHuaTangSMS(emPhone, msg);
        return msg;
    }

    /**
     * 发送服务订单分派外协短信
     *
     * @param sp_phone
     * @param sp_name
     * @param house_address
     * @param sm_name
     * @param so_targetTime
     * @param so_contractor
     * @param so_contractPhone
     * @return
     */
    public static String sendServiceOutSource(String sp_phone, String sp_name, String house_address, String sm_name, String so_targetTime, String so_contractor, String so_contractPhone) {
        // 【管家婆】{0}，{1}房屋预约{2}服务，需要您的联系处理。预约时间{3}，联系人{4}/{5}。请及时联系客户，并安排服务。管家婆感谢您的支持，祝您生活愉快。
        String msg = MessageFormat.format(propertiesSMS.getProperty("emp.service_outsource"), sp_name, house_address, sm_name, so_targetTime, so_contractor, so_contractPhone);
        sendHuaTangSMS(sp_phone, msg);
        return msg;
    }
}