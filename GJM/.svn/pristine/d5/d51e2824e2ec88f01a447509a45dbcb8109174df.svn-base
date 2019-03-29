package com.gjp.dao;

import com.gjp.model.LSFBill;

import java.util.List;

/**
 * 乐首付账单
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2015年8月12日 下午5:49:16 
 */
public interface LSFBillDAO {
	
	/**
	 * 
	 * 添加乐首付账单
	 * 
	 * @param lsfBill
	 * @return
	 */
	Integer addLSFBill(LSFBill lsfBill);
	
	/**
	 * 
	 * 查询账单最新一条数据时间
	 * 
	 * @return
	 */
	List<LSFBill> selectLSFBillNow();
	
	/**
	 * 
	 * 查询账单是否存在
	 * 
	 * @return
	 */
	List<LSFBill> selectLSFBillBool(LSFBill lsfBill);
	
	/**
	 * 
	 * 查询账单支付方式和支付时间
	 * 
	 * @return
	 */
	List<LSFBill> selectLSFBillType(LSFBill lsfBill);

}
