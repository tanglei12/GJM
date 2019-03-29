package com.gjp.service;

import com.gjp.dao.BankDAO;
import com.gjp.model.Bank;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年8月10日 下午3:07:09 
 */
@Service
public class BankService {

	@Resource
	private BankDAO bankDAO;
	
	/**
	 * 根据银行卡标识查询银行卡信息
	 * 
	 * @param bank
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<Bank> selectBankBIN(Bank bank){
		return bankDAO.selectBankBIN(bank);
	}

	public Bank queryBankInfo(Bank bank) {
		return bankDAO.queryBankInfo(bank);
	}
}
