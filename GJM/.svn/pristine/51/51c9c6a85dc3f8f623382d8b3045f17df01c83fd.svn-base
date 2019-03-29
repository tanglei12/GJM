package com.gjp.controller;

import com.gjp.model.Bank;
import com.gjp.service.BankService;
import com.gjp.util.OSSparameter;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * @author 陈智颖
 * @version 创建时间：2016年8月10日 下午3:16:01
 */
@Controller
@RequestMapping("/bank")
public class BankController {

    @Resource
    private BankService bankService;

    /**
     * 根据银行卡标识查询银行卡
     *
     * @param bankCode
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/bankMessage")
    @ResponseBody
    public Map<String, Object> bankMessage(String bankCode) {
        Map<String, Object> map = new HashMap<>();
        if (StringUtils.isEmpty(bankCode)) {
            map.put("bank", null);
            return map;
        }
        Bank bank = new Bank();
        bank.setBank_BIN(bankCode);
        bank = bankService.queryBankInfo(bank);
        if (bank != null) {
            bank.setBl_path(OSSparameter.imagePath(bank.getBl_path(), null, null));
        }
        map.put("bank", bank);
        return map;
    }
}
