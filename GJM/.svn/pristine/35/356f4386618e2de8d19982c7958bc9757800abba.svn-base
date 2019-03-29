package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.BillExpenseDao;
import com.gjp.model.BillApprovalRecord;
import com.gjp.model.ViewBillExpenseVo;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillExpenseDaoImpl extends BaseDAO implements BillExpenseDao{

	@Override
	public int addExpense(ViewBillExpenseVo billExpense) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.BillExpenseDao.addExpense", billExpense);
	}

	@Override
	public PageModel<ViewBillExpenseVo> selectExpenseList(int pageNo, int pageSize, HouseModel houseModel) {
		PageModel<ViewBillExpenseVo> pageModel = new PageModel<ViewBillExpenseVo>();
		// 分页设置开始点
		pageModel.setPageNo((pageNo - 1) * pageSize);
		// 分页设置查询条数
		pageModel.setPageSize(pageSize);
		// 分页设置查询条件
		pageModel.setHouseModel(houseModel);
		pageModel.setInte(2);   //删除状态
		pageModel.setTxt(houseModel.getMode());
		List<ViewBillExpenseVo> bookkeepBook = sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillExpenseDao.selectExpenseList", pageModel);
		pageModel.setList(bookkeepBook);
		List<ViewBillExpenseVo> bookkeepTotal = sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillExpenseDao.queryTotalExpenseList", pageModel);
		pageModel.setTotalRecords(bookkeepTotal.size());
		return pageModel;
	}

	@Override
	public ViewBillExpenseVo selectExpense(ViewBillExpenseVo billExpense) {
		return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BillExpenseDao.selectExpense", billExpense);
	}

	@Override
	public int updateExpense(BillApprovalRecord billApprovalRecord,String person) {
		ViewBillExpenseVo expense=new ViewBillExpenseVo();
		expense.setEx_id(billApprovalRecord.getAr_ex_id());
		expense.setEx_number(billApprovalRecord.getAr_number());
		expense.setEx_person(person);
		if (billApprovalRecord.getAr_state() == 1) {
			expense.setEx_state(3);
		} else if (billApprovalRecord.getAr_state() == 2) {
			expense.setEx_state(4);
		}else if (billApprovalRecord.getAr_state() == 4) {
			expense.setEx_state(1);
		} else {
			expense.setEx_state(2);
		}
		return sqlSessionTemplateBusiness.update("com.gjp.dao.BillExpenseDao.updateExpense", expense);
	}

	@Override
	public int update(ViewBillExpenseVo billExpense) {
		return sqlSessionTemplateBusiness.update("com.gjp.dao.BillExpenseDao.updateExpense", billExpense);
	}

}
