package com.gjp.controller;

import com.gjp.model.*;
import com.gjp.service.ContractService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * 流水管理管理
 *
 * @author ZOE
 */
@Controller
public class StreamController {
    // 合同对象
    private @Resource
    ContractService userCenterContractObjectService;

    /**
     * 跳转添加流水
     *
     * @return
     */
    @RequestMapping("/jumpaddStreamPage")
    public ModelAndView jumpaddStreamPage(String to_code, String cno) {
        ModelAndView view = new ModelAndView("/order/rentalBill");
        // 合同视图对象
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_No(cno);
        ViewBusinessContractVo businessContractVo = userCenterContractObjectService.selectContractObjectByCNo(contractVo);
        view.addObject("businessContractVo", businessContractVo);
        // 合同对象
        ContractObjectVo contractObject = new ContractObjectVo();
        contractObject.setContractObject_No(cno);
        contractObject = userCenterContractObjectService.queryContractObject(contractObject);
        view.addObject("contractObject", contractObject);
        // 合同主体
        UserCenterContractBody contractBody = userCenterContractObjectService.queryContractBody(contractObject.getContractObject_Code());
        view.addObject("contractBody", contractBody);
        if (contractBody != null) {
            // 合同开始期限、结束期限
            String[] split = contractBody.getContractBody_StartTOEnd().split("~");
            view.addObject("contractStart", split[0]);
            view.addObject("contractEnd", split[1]);

            // 约定还款日期计算
            Date startPayTime = contractBody.getContractBody_StartPayTime();
            Calendar cal = Calendar.getInstance();
            cal.setTime(startPayTime);
            if ("月付".equals(contractBody.getContractBody_PayStyle())) {
                cal.add(Calendar.DATE, -7);
            } else {
                cal.add(Calendar.DATE, -15);
            }
            view.addObject("ydhkDate", cal.getTime());
        }
        // 合作管家
        ViewBusinessContractRelaEmpVo contractRelaEmpVo = new ViewBusinessContractRelaEmpVo();
        contractRelaEmpVo.setContractObject_No(cno);
        List<ViewBusinessContractRelaEmpVo> contractRelaEmp = userCenterContractObjectService.queryViewContractRelaEmp(contractRelaEmpVo);
        view.addObject("contractRelaEmpList", contractRelaEmp);

        // 银行卡处理
        List<ContractType> bankType = userCenterContractObjectService.selectContractTypeByParentId(1801);
        for (ContractType contractType: bankType) {
            String value = contractType.getContractType_Value();
            int len = value.length();
            String substring1 = value.substring(0, 4);
            String substring2 = value.substring(len - 4, len);
            contractType.setContractType_Value(substring1 + "***" + substring2);
        }
        view.addObject("bankType", bankType);
        view.addObject("to_code", to_code);
        return view;
    }

}
