package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.BillClearOrderDAO;
import com.gjp.model.BillClearOrder;
import org.springframework.stereotype.Repository;

@Repository
public class BillClearOrderDAOImpl extends BaseDAO implements BillClearOrderDAO{

	@Override
	public Integer addBillClearOrder(BillClearOrder billClearOrder) {
		return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.BillClearOrderDAO.addBillClearOrder",billClearOrder);
	}

	@Override
	public BillClearOrder selectBillClearOrder(
			BillClearOrder billClearOrder) {
		return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BillClearOrderDAO.selectBillClearOrder",billClearOrder);
	}

	@Override
	public Integer updateClearOrderMoney(BillClearOrder billClearOrder) {
		return super.sqlSessionTemplateBusiness.update("com.gjp.dao.BillClearOrderDAO.updateClearOrderMoney",billClearOrder);
	}

	@Override
	public Integer updateClearOrderState(BillClearOrder billClearOrder) {
		return super.sqlSessionTemplateBusiness.update("com.gjp.dao.BillClearOrderDAO.updateClearOrderState",billClearOrder);
	}

}
