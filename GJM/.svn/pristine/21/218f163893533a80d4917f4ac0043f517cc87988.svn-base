package com.gjp.dao;

import com.gjp.model.BillApplyExpense;
import com.gjp.model.BillApprovalRecord;

import java.util.List;
import java.util.Map;

public interface BillApplyExpenseDao {
	
	/**
	 * 添加数据
	 * @author tanglei
	 */
	int addApplyExpense(BillApplyExpense billApplyExpense);
	
	/**
	 * 根据票单号查询
	 * @author tanglei
	 */
	List<Map<String,Object>> selectApplyList (BillApplyExpense billApplyExpense);
	
	/**
	 * 更改状态
	 * @author tanglei
	 */
	int updateExpense (BillApprovalRecord billApprovalRecord,String person);
	
	/**
	 * 更改数据
	 * @author tanglei
	 */
	int update (BillApplyExpense billApplyExpense);
	

}
