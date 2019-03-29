package com.gjp.dao;

import com.gjp.model.BillClearBill;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2015年12月6日 下午2:38:42 
 */
public interface BillClearBillDAO {

	/**
	 * 插入保洁账单
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer addBillClearBill(BillClearBill billClearBill);
	
	/**
	 * 查询保洁账单带保洁次数
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	BillClearBill selectBillClearBill(BillClearBill billClearBill);
	
	/**
	 * 查询是否还有未处理完成的保洁
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	BillClearBill selectBillClearBillBool(BillClearBill billClearBill);
	
	/**
	 * 查询第一个待服务
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	BillClearBill selectBillClearBillFirst(BillClearBill billClearBill);
	
	/**
	 * 更新托管账单状态
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updateBillClearBill(BillClearBill billClearBill);
	
	/**
	 * 修改账单金额
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updateBillClearBillMoney(BillClearBill billClearBill);
}
