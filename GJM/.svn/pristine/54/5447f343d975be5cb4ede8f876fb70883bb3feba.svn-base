package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.BillClearBillDAO;
import com.gjp.model.BillClearBill;
import org.springframework.stereotype.Repository;

@Repository
public class BillClearBillDAOImpl extends BaseDAO implements BillClearBillDAO{

	@Override
	public Integer addBillClearBill(BillClearBill billClearBill) {
		return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.BillClearBillDAO.addBillClearBill",billClearBill);
	}

	@Override
	public BillClearBill selectBillClearBill(BillClearBill billClearBill) {
		return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BillClearBillDAO.selectBillClearBill",billClearBill);
	}

	@Override
	public BillClearBill selectBillClearBillFirst(BillClearBill billClearBill) {
		return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BillClearBillDAO.selectBillClearBillFirst",billClearBill);
	}

	@Override
	public Integer updateBillClearBill(BillClearBill billClearBill) {
		return super.sqlSessionTemplateBusiness.update("com.gjp.dao.BillClearBillDAO.updateBillClearBill",billClearBill);
	}

	@Override
	public BillClearBill selectBillClearBillBool(BillClearBill billClearBill) {
		return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BillClearBillDAO.selectBillClearBillBool",billClearBill);
	}

	@Override
	public Integer updateBillClearBillMoney(BillClearBill billClearBill) {
		return super.sqlSessionTemplateBusiness.update("com.gjp.dao.BillClearBillDAO.updateBillClearBillMoney",billClearBill);
	}

}
