package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.BillApplyExpenseDao;
import com.gjp.model.BillApplyExpense;
import com.gjp.model.BillApprovalRecord;
import com.gjp.model.ViewBillBookkeepBookVo;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class BillApplyExpenseDaoImpl extends BaseDAO implements BillApplyExpenseDao{

	@Override
	public int addApplyExpense(BillApplyExpense billApplyExpense) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.BillApplyExpenseDao.addApplyExpense", billApplyExpense);
	}

	@Override
	public List<Map<String, Object>> selectApplyList(BillApplyExpense billApplyExpense) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillApplyExpenseDao.selectApplyList", billApplyExpense);
	}

	@Override
	public int updateExpense(BillApprovalRecord record,String person) {
		BillApplyExpense billApplyExpense=new BillApplyExpense();
		billApplyExpense.setBx_number(record.getAr_number());
		List<BillApplyExpense> list=sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillApplyExpenseDao.selectApplyList",billApplyExpense );
		int con=1;
		for (BillApplyExpense applyExpense : list) {
			BillApplyExpense expense=new BillApplyExpense();
			expense.setBx_id(applyExpense.getBx_id());
			expense.setBx_person(person);
			if (record.getAr_state() == 1) {
				expense.setBx_state(3);
			} else if (record.getAr_state() == 2) {
				expense.setBx_state(4);
			} else if (record.getAr_state() == 4) {
				expense.setBx_state(1);
			} else {
				expense.setBx_state(2);
			}
			ViewBillBookkeepBookVo book=new ViewBillBookkeepBookVo();
			book.setBk_id(applyExpense.getBx_bk_id());
			if (record.getAr_state() == 1) {
				book.setBk_state(7);
			} else if (record.getAr_state() == 2) {
				book.setBk_state(8);
			} else if (record.getAr_state() == 3){
				book.setBk_state(9);
			}
			 con= sqlSessionTemplateBusiness.update("com.gjp.dao.BillApplyExpenseDao.updateExpense", expense);
			 if (book.getBk_state() != null) {
				 con= sqlSessionTemplateBusiness.update("com.gjp.dao.BillBookkeepBook.updateBookkeepBook",book );
			 }
		}
		return con;
	}

	@Override
	public int update(BillApplyExpense billApplyExpense) {
		ViewBillBookkeepBookVo book=new ViewBillBookkeepBookVo();
		book.setBk_id(billApplyExpense.getBx_bk_id());
		book.setBk_state(2);
		int con=1;
		con= sqlSessionTemplateBusiness.update("com.gjp.dao.BillBookkeepBook.updateBookkeepBook",book );
		con =sqlSessionTemplateBusiness.update("com.gjp.dao.BillApplyExpenseDao.updateExpense", billApplyExpense);
		return con;
	}

	

}
