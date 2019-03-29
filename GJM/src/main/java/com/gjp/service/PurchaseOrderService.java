package com.gjp.service;

import com.gjp.dao.PurchaseArticleDAO;
import com.gjp.dao.PurchaseOrderDAO;
import com.gjp.model.ItemsInventory;
import com.gjp.model.PurchaseArticle;
import com.gjp.model.PurchaseOrder;
import com.gjp.util.Randoms;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年3月4日 上午10:44:50 
 */
@Service
public class PurchaseOrderService {
	//采购单
	@Resource
	private PurchaseOrderDAO purchaseOrderDAO;
	
	//采购物品详情
	@Resource
	private PurchaseArticleDAO purchaseArticleDAO;
	
	
	/**
	 * 采购单添加
	 * @author zoe
	 * @param purchaseOrder
	 * @return
	 */
	public int addPurchaseOrder(PurchaseOrder purchaseOrder){
		
		return purchaseOrderDAO.addPurchaseOrder(purchaseOrder);
	}
	  
	
	/**
	 * 采购单List
	 * @author zoe
	 * @param purchaseOrder
	 * @return
	 */
	public List<PurchaseOrder> selectPurchaseOrderList(PurchaseOrder purchaseOrder){
		return purchaseOrderDAO.selectPurchaseOrderList(purchaseOrder);
	}
	
	/**
	 * 采购单总数量
	 * @param purchaseOrder
	 * @return
	 */
	public int selectPurchaseOrderCount(PurchaseOrder purchaseOrder){
		return purchaseOrderDAO.selectPurchaseOrderCount(purchaseOrder);
	}
	
	/**
	 * 采购单里采购物品内容添加
	 * @author zoe
	 * @param purchaseArticle
	 * @return
	 */
	public int addPurchaseArticle(PurchaseArticle purchaseArticle){
		return purchaseArticleDAO.addPurchaseArticle(purchaseArticle);
	}
	
	/**
	 * 根据采购单Code查询该采购单信息
	 * @author zoe
	 * @param purchaseOrder
	 * @return
	 */
	public PurchaseOrder selectPurchaseOrderCOdeOne(PurchaseOrder purchaseOrder){
		return purchaseOrderDAO.selectPurchaseOrderCodeOne(purchaseOrder);
	}
	
	/**
	 * 根据采购单Code修改采购单信息
	 * @author zoe
	 * @param purchaseOrder
	 * @return
	 */
	public int updatePurchaseOrderCode(PurchaseOrder purchaseOrder){
		return purchaseOrderDAO.updatePurchaseOrderCode(purchaseOrder);
	}
	
	
	
	/**
	 * 查询采购单采购物品详情
	 * @author zoe
	 * @param purchaseArticle
	 * @return
	 */
	public List<PurchaseArticle> selectPurchaseArticleList(PurchaseArticle purchaseArticle){
		return purchaseArticleDAO.selectPurchaseArticleList(purchaseArticle);
	}
	
	/**
	 * 根据采房屋/合同Code查询该采购单审核通过后的出库物品
	 * @param purchaseOrder
	 * @return
	 */
	public List<ItemsInventory> selectItemsInvtory(PurchaseOrder purchaseOrder){
		return purchaseOrderDAO.selectInventorList(purchaseOrder);
	}
	
	
	/**
	 * 采购单Code：PUR + 时间戳 + 随机数4位
	 * @author zoe
	 * @return
	 */
	public String getItemsCode() {
		StringBuffer str = new StringBuffer();
		str.append("PUR");//采购单开头字母
		String date = new Date().getTime() + "";
		str.append(date);
		str.append(Randoms.random());
		return str.toString();
	}
	
}
