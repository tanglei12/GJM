package com.gjp.controller;

import com.gjp.model.*;
import com.gjp.service.*;
import com.gjp.util.AppConfig;
import com.gjp.util.AppUtil;
import com.gjp.util.Msg;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.*;

/**催租管理
 * @author tanglei
 * @description
 * @date Created in 2017/11/20
 */
@Controller
@RequestMapping("/collection")
public class CollectionController {
    @Resource
    private ContractService contractService;
    @Resource
    private SmsService smsService;
    @Resource
    private PentReminderService pentReminderService;
    @Resource
    private FinanceManageService financeManageService;
    @Resource
    private UserCenterEmployeeService userCenterEmployeeService;

    /**
     * 催收管理页面
     *
     * @author tanglei
     */
    @RequestMapping("/collection")
    public String collection() {
        return "/collection/collectionList";
    }

    /**
     * 催收管理列表
     *
     * @author tanglei
     */
    @RequestMapping("/collectionList")
    @ResponseBody
    public Map<String, Object> collectionList(Pagination<ViewBusinessContractVo> pagination) {
        Msg<Object> msg = new Msg<>();
        //获取登录用户
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toMap(110, Msg.MSG_LOGIN_ERROR);
        }
        List<Company> company = userCenterEmployeeService.selectCompanyByPersonId(employee.getEm_id());
        ViewBusinessContractVo vo = new ViewBusinessContractVo();
        if (company.get(0).getUcc_pid() == 43) {
            vo.setUcc_pid(43);
            vo.setUcc_name(company.get(0).getUcc_name());
            pagination.setT(vo);
        }
        List<Map<String, Object>> ss = pagination.getQueryWhere();
        for (Map<String, Object> map : ss) {
            if (map.get("key").equals("pent_repaymentDate")) {
                String value = String.valueOf(map.get("value"));
                if (value.equals("-5")) {
                    vo.setEnd(Integer.valueOf(value));
                } else if (value.equals("-6")) {  //逾期全部
                    vo.setEnd(Integer.valueOf("-1"));
                } else {
                    vo.setStart(Integer.valueOf(value));
                }
            }
            if (map.get("key").equals("ucc_name")) {
                vo.setUcc_name(String.valueOf(map.get("value")));
            }
            if (map.get("key").equals("ucc_id")) {
                vo.setUcc_id(Integer.valueOf(map.get("value").toString()));
            }
        }
        Iterator<Map<String, Object>> it = pagination.getQueryWhere().iterator();
        while(it.hasNext()){
            Map<String, Object> x = it.next();
            if(x.get("key").equals("pent_repaymentDate") || x.get("key").equals("ucc_name") || x.get("key").equals("ucc_id")){
                it.remove();
            }
        }
        pagination.formatWhere();
        if (pagination.getWhere().equals("")) {
            pagination.setWhere(null);
        }
        vo.setBcb_type(0);
        vo.setBcb_state(AppConfig.con_state_2);
        vo.setContractObject_OptionState(AppConfig.contract_optionstate_106);
        pagination.setT(vo);
        pagination = pentReminderService.collectionDayList(pagination);
        return msg.toMap(pagination);
    }

    /**
     * 合同账单数据
     */
    @RequestMapping("/queryHouseContract")
    @ResponseBody
    public String queryHouseContract(String contractObject_Code) {
        Map<String, Object> map = new HashMap<>();
        Msg<Object> msg = new Msg<>();
        //获取登录用户
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toString(110, Msg.MSG_LOGIN_ERROR);
        }
        //合同主体信息
        ViewBusinessContractVo viewBusinessContractVo = new ViewBusinessContractVo();
        viewBusinessContractVo.setContractObject_Code(contractObject_Code);
        ViewBusinessContractVo businessContractVos = contractService.queryHouseContract(viewBusinessContractVo);
        //催收短信记录
        UserCenterInformation informetion = new UserCenterInformation();
        informetion.setContractObject_code(contractObject_Code);
        List<UserCenterInformation> userInformation = smsService.queryUserInformation(informetion);
        //催收记录
        UserCenterPentReminder userCenterRentReminder = new UserCenterPentReminder();
        userCenterRentReminder.setContractObject_code(contractObject_Code);
        List<UserCenterPentReminder> rentReminder = pentReminderService.queryPentReminder(userCenterRentReminder);
        // 查询账单列表信息
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setContractObject_code(contractObject_Code);
        contractOrderVo.setBco_orderType(AppConfig.order_type_1);
        contractOrderVo = financeManageService.queryFinanceOrder(contractOrderVo);
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBco_code(contractOrderVo.getBco_code());
        List<ContractBillVo> financeBillList = financeManageService.queryFinanceBillPaymentList(contractBillVo);
        msg.put("financeBillList", financeBillList);
        msg.put("businessContractVos", businessContractVos);
        msg.put("userInformation", userInformation);
        msg.put("employee", employee);
        msg.put("rentReminder", rentReminder);
        return msg.toString();
    }

    /**
     * 提交催收记录
     *
     * @author tanglei
     */
    @RequestMapping("/submitPentReminder")
    @ResponseBody
    public String submitPentReminder(UserCenterPentReminder userCenterRentReminder) {
        Msg<Object> msg = new Msg<>();
        try {
            UserCenterEmployee employee = AppUtil.getCookieEmployee();
            if (employee == null) {
                return msg.toError(Msg.MSG_LOGIN_ERROR);
            }
            userCenterRentReminder.setEm_id(employee.getEm_id());
            userCenterRentReminder.setPr_time(new Date());
            pentReminderService.insertPentReminder(userCenterRentReminder);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

}
