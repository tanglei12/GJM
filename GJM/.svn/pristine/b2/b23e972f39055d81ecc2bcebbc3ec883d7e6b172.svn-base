package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.PurchaseOrderDAO;
import com.gjp.model.ItemsInventory;
import com.gjp.model.PurchaseOrder;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PurchaseOrderDAOImpl extends BaseDAO implements PurchaseOrderDAO  {

	@Override
	public int addPurchaseOrder(PurchaseOrder purchaseOrder) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.PurchaseOrderDAO.addPurchaseOrder", purchaseOrder);
	}

	@Override
	public List<PurchaseOrder> selectPurchaseOrderList(PurchaseOrder purchaseOrder) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.PurchaseOrderDAO.selectPurchaseOrderList", purchaseOrder);
	}

	@Override
	public PurchaseOrder selectPurchaseOrderCodeOne(PurchaseOrder purchaseOrder) {
		return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.PurchaseOrderDAO.selectPurchaseOrderCodeOne", purchaseOrder);
	}

	@Override
	public int updatePurchaseOrderCode(PurchaseOrder purchaseOrder) {
		return sqlSessionTemplateBusiness.update("com.gjp.dao.PurchaseOrderDAO.updatePurchaseOrderCode", purchaseOrder);
	}

	@Override
	public int selectPurchaseOrderCount(PurchaseOrder purchaseOrder) {
		return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.PurchaseOrderDAO.selectPurchaseOrderCount", purchaseOrder);
	}

	@Override
	public List<ItemsInventory> selectInventorList(PurchaseOrder purchaseOrder) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.PurchaseOrderDAO.selectInventorList", purchaseOrder);
	}

}
