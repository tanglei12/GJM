package com.gjp.service;

import com.alibaba.fastjson.JSONObject;
import com.gjp.dao.UserCenterInformationDao;
import com.gjp.model.ContractBillVo;
import com.gjp.model.UserCenterInformation;
import com.gjp.util.DataUtil;
import com.gjp.util.Pagination;
import com.gjp.util.SmsUtil;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * 短信管理service
 *
 * @author shenhx
 */
@Service
public class SmsService {

    private @Resource
    UserCenterInformationDao userCenterInformationDao;

    /**
     * 添加短信发送记录
     *
     * @param userCenterInformation
     * @return
     */
    public int addUserCenterInformation(UserCenterInformation userCenterInformation) {
        return userCenterInformationDao.addUserCenterInformation(userCenterInformation);
    }

    /**
     * 根据客户编码查询短信记录
     *
     * @return
     */
    public List<UserCenterInformation> queryUserInformationByCode(Pagination<UserCenterInformation> pagination) {
        return userCenterInformationDao.queryUserInformationByCode(pagination);
    }

    public int queryUserInformationByCodeCount(Pagination<UserCenterInformation> pagination) {
        return userCenterInformationDao.queryUserInformationByCodeCount(pagination);
    }

    /**
     * 查询指定时间差的应缴纳租金的账单
     *
     * @param days
     * @return
     */
    public List<ContractBillVo> queryPressPayentBillList(int days) {
        return userCenterInformationDao.queryPressPayentBillList(days);
    }

    /**
     * 发送催租短信
     *
     * @param billVo
     */
    public void sendCusPressRentMsg(ContractBillVo billVo) {
        // 发送短信
        String content = SmsUtil.sendPressRentSMS(billVo.getBco_customerPhone(), billVo.getBco_customerName(), billVo.getHouse_address(), billVo.getBcb_repayment().toString(), DataUtil.DateToStrs(billVo.getBcb_repaymentDate()));
        // 添加短信记录
        addSMSRecordForCus(billVo.getHi_code(), billVo.getContractObject_Code(), content, billVo.getBco_customer());
    }

    /**
     * 发送客户租金逾期短信
     *
     * @param billVo
     */
    public void sendCusRentOverdueMsg(ContractBillVo billVo) {
        // 发送短信
        String content = SmsUtil.sendCusRentOverdueSMS(billVo.getBco_customerPhone(), billVo.getBco_customerName(), billVo.getHouse_address(), billVo.getBcb_overdueDay().toString(), billVo.getBcb_repayment().toString(), DataUtil.DateToStrs(billVo.getBcb_repaymentDate()));
        // 添加短信记录
        addSMSRecordForCus(billVo.getHi_code(), billVo.getContractObject_Code(), content, billVo.getBco_customer());
    }

    /**
     * [管家]发送房屋强收短信
     *
     * @param billVo
     */
    public void sendEmpHouseRecoveryMsg1(ContractBillVo billVo) {
        String bco_empPhone = billVo.getBco_empPhone();
        String house_address = billVo.getHouse_address();
        String bco_customerName = billVo.getBco_customerName();
        String bco_customerPhone = billVo.getBco_customerPhone();
        String content = SmsUtil.sendEmpHouseRecoverySMS1(bco_empPhone, house_address, bco_customerName, bco_customerPhone);

        // 添加短信记录
        addSMSRecordForEmp(billVo.getHi_code(), billVo.getContractObject_Code(), content, billVo.getBco_empId());
    }

    /**
     * [管家]发送房屋强收短信
     *
     * @param billVo
     */
    public void sendEmpHouseRecoveryMsg2(ContractBillVo billVo) {
        String ucc_phone = billVo.getUcc_phone();
        String ucc_person = billVo.getUcc_person();
        String house_address = billVo.getHouse_address();
        String bco_customerName = billVo.getBco_customerName();
        String bco_customerPhone = billVo.getBco_customerPhone();
        String content = SmsUtil.sendEmpHouseRecoverySMS2(ucc_phone, ucc_person, house_address, bco_customerName, bco_customerPhone);
        // 添加短信记录
        addSMSRecordForEmp(billVo.getHi_code(), billVo.getContractObject_Code(), content, billVo.getBco_empId());
    }

    /**
     * 为管家添加短信记录
     *
     * @param hi_code
     * @param con_code
     * @param msg_content
     * @param receive_em_id
     */
    public void addSMSRecordForEmp(String hi_code, String con_code, String msg_content, int receive_em_id) {
        JSONObject json = new JSONObject();
        json.put("hi_code", hi_code);
        json.put("con_code", con_code);
        json.put("msg_type", 2);// 2催租短信-通知类短信
        json.put("msg_content", msg_content);
        json.put("receive_type", 2);// 1-客户；2-管家；3-其他
        json.put("receive_em_id", receive_em_id);
        addSMSRecord(json);
    }

    /**
     * 为门店添加短信记录
     *
     * @param hi_code
     * @param con_code
     * @param msg_content
     * @param receive_ucc_id
     */
    public void addSMSRecordForUcc(String hi_code, String con_code, String msg_content, int receive_ucc_id) {
        JSONObject json = new JSONObject();
        json.put("hi_code", hi_code);
        json.put("con_code", con_code);
        json.put("msg_type", 2);// 2催租短信-通知类短信
        json.put("msg_content", msg_content);
        json.put("receive_type", 5);// 1-客户；2-管家；3-其他；4-用户；5-门店
        json.put("receive_em_id", receive_ucc_id);
        addSMSRecord(json);
    }

    /**
     * 为其他类型（包含不能确定收信人类型）短信记录
     *
     * @param hi_code
     * @param con_code
     * @param msg_content
     */
    public void addSMSRecordForOth(String hi_code, String con_code, String msg_content) {
        JSONObject json = new JSONObject();
        json.put("hi_code", hi_code);
        json.put("con_code", con_code);
        json.put("msg_type", 2);// 2催租短信-通知类短信
        json.put("msg_content", msg_content);
        json.put("receive_type", 3);// 1-客户；2-管家；3-其他；4-用户；5-门店
        addSMSRecord(json);
    }

    /**
     * 为客户添加短信记录
     *
     * @param hi_code
     * @param con_code
     * @param msg_content
     * @param receive_cc_code
     */
    public void addSMSRecordForCus(String hi_code, String con_code, String msg_content, String receive_cc_code) {
        JSONObject json = new JSONObject();
        json.put("hi_code", hi_code);
        json.put("con_code", con_code);
        json.put("msg_type", 2);// 2催租短信-通知类短信
        json.put("msg_content", msg_content);
        json.put("receive_type", 1);// 1-客户；2-管家；3-其他
        json.put("receive_cc_code", receive_cc_code);
        addSMSRecord(json);
    }

    /**
     * 为客户添加短信记录
     *
     * @param msg_content
     * @param receive_user_id
     */
    public void addSMSRecordForUser(String msg_content, Integer receive_user_id) {
        JSONObject json = new JSONObject();
        json.put("msg_type", 2);// 2催租短信-通知类短信
        json.put("msg_content", msg_content);
        json.put("receive_type", 4);// 1-客户；2-管家；3-其他；4-用户
        json.put("receive_user_id", receive_user_id);
        addSMSRecord(json);
    }

    /**
     * 添加短信记录
     *
     * @param json
     */
    public void addSMSRecord(JSONObject json) {
        // 添加客户短信记录 shenhx 20170709
        UserCenterInformation userCenterInformation = new UserCenterInformation();
        userCenterInformation.setHi_code(json.getString("hi_code"));
        userCenterInformation.setContractObject_code(json.getString("con_code"));
        userCenterInformation.setMsg_type(json.getInteger("msg_type"));// 2催租短信-通知类短信
        userCenterInformation.setMsg_content(json.getString("msg_content"));
        userCenterInformation.setSend_result(StringUtils.isEmpty(json.getString("msg_content")) ? 0 : 1);
        userCenterInformation.setEm_id((Integer) json.getOrDefault("em_id", 1));// 1:系统
        userCenterInformation.setReceive_type(json.getInteger("receive_type"));// 1-客户；2-管家；3-其他
        userCenterInformation.setReceive_cc_code(json.getString("receive_cc_code"));
        userCenterInformation.setReceive_em_id(json.getInteger("receive_em_id"));
        userCenterInformation.setReceive_user_id(json.getInteger("receive_user_id"));
        userCenterInformation.setSend_time(new Date());
        this.addUserCenterInformation(userCenterInformation);
    }

    /**
     * 根据合同编号查询催租短信
     *
     * @author tanglei
     */
    public List<UserCenterInformation> queryUserInformation(UserCenterInformation userCenterInformation) {
        return userCenterInformationDao.queryUserInformation(userCenterInformation);

    }
}
