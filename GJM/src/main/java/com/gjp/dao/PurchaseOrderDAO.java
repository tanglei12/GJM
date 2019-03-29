package com.gjp.dao;

import com.gjp.model.ItemsInventory;
import com.gjp.model.PurchaseOrder;

import java.util.List;

public interface PurchaseOrderDAO {
	
	/**
	 * 采购单添加
	 * @author zoe
	 * @param purchaseOrder
	 * @return
	 */
	int addPurchaseOrder(PurchaseOrder purchaseOrder);
	
	/**
	 * 采购单查询
	 * @author zoe
	 * @param purchaseOrder
	 * @return
	 */
	List<PurchaseOrder> selectPurchaseOrderList(PurchaseOrder purchaseOrder);
	
	/**
	 * 采购单总条数
	 * @param purchaseOrder
	 * @return
	 */
	int selectPurchaseOrderCount(PurchaseOrder purchaseOrder);
	
	/**
	 * 根据采购单Code查询采购单信息
	 * @author zoe
	 * @param purchaseOrder
	 * @return
	 */
	PurchaseOrder selectPurchaseOrderCodeOne(PurchaseOrder purchaseOrder);
	
	/**
	 * 根据采购单Code修改采购单信息
	 * @author zoe
	 * @param purchaseOrder
	 * @return
	 */
	int updatePurchaseOrderCode(PurchaseOrder purchaseOrder);
	
	/**
	 * 根据采房屋/合同Code查询该采购单审核通过后的出库物品
	 * @param purchaseOrder
	 * @return
	 */
	List<ItemsInventory> selectInventorList(PurchaseOrder purchaseOrder);
	
	
	
	
}
