package com.gjp.dao;

import com.gjp.model.BillApprovalRecord;
import com.gjp.model.ViewBillExpenseVo;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;

public interface BillExpenseDao {
	/**
	 * 添加数据
	 * @author tanglei
	 */
	int addExpense(ViewBillExpenseVo billExpense);
	
	/**
	 * 列表数据
	 * @author tanglei
	 */
	PageModel<ViewBillExpenseVo> selectExpenseList(int pageNo, int pageSize, HouseModel houseModel);
	
	/**
	 * 查询申请中数据
	 * @author tanglei
	 */
	ViewBillExpenseVo selectExpense (ViewBillExpenseVo billExpense);
	
	/**
	 * 更改
	 * @author tanglei
	 */
	int updateExpense (BillApprovalRecord billApprovalRecord,String person);
	
	/**
	 * 更改数据
	 * @author tanglei
	 */
	int update (ViewBillExpenseVo billExpense);

}
