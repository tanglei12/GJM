package com.gjp.dao;

import com.gjp.model.Bank;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年8月10日 下午3:03:40 
 */
public interface BankDAO {
	
	/**
	 * 根据银行卡标识查询银行卡信息
	 * 
	 * @param bank
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<Bank> selectBankBIN(Bank bank);

	Bank queryBankInfo(Bank bank);
}
