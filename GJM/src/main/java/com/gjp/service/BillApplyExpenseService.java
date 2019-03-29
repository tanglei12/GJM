package com.gjp.service;

import com.gjp.dao.BillApplyExpenseDao;
import com.gjp.model.BillApplyExpense;
import com.gjp.model.BillApprovalRecord;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * 申请报销
 * @author tanglei
 *
 */
@Service
public class BillApplyExpenseService {
	@Resource
	private BillApplyExpenseDao billApplyExpenseDao;
	
	/**
	 * 添加
	 * @author tanglei
	 */
	public boolean addApplyExpense(BillApplyExpense billApplyExpense){
		return billApplyExpenseDao.addApplyExpense(billApplyExpense) > 0;
	}
	
	/**
	 * 根据票单号查询
	 * @author tanglei
	 */
	public List<Map<String,Object>> selectApplyList (BillApplyExpense billApplyExpense){
		return billApplyExpenseDao.selectApplyList(billApplyExpense);
	}
	
	/**
	 * 更改状态
	 * @author tanglei
	 */
	public boolean updateExpense (BillApprovalRecord billApprovalRecord,String person) {
		return billApplyExpenseDao.updateExpense(billApprovalRecord,person) >0;
	}
	
	/**
	 * 更改数据
	 * @author tanglei
	 */
	public boolean update (BillApplyExpense billApplyExpense) {
		return billApplyExpenseDao.update(billApplyExpense) >0;
	}
	
}
