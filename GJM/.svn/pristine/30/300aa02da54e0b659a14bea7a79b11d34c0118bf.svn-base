package com.gjp.controller;

import com.gjp.model.*;
import com.gjp.service.ItemsInventoryService;
import com.gjp.service.PurchaseOrderService;
import com.gjp.util.AppUtil;
import com.gjp.util.PageModel;
import com.gjp.util.Randoms;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 
 * 秦莎
 * 
 * 创建时间  2016-08-10 10:47:23
 * 
 */
@Controller
@RequestMapping("/purchaseOrder")
public class PurchaseOrderController {

	// 采购单
	@Resource
	private PurchaseOrderService purchaseOrderService;
	//物品库存
	@Resource
	private ItemsInventoryService itemsInventoryService;
	/**
	 * 采购单List
	 * @author zoe
	 * @return
	 */
	@RequestMapping("/purchaseOrderList")
	public String selectItemList(){
		return "/purchase/purchaseOrderList";
	}
	
	/**
	 * 添加采购单
	 * @author zoe
	 * @return
	 */
	@RequestMapping("/addPurchaseOrder")
	public ModelAndView addPurchaseOrder(HttpServletRequest request){
		String code = "";
		code = request.getQueryString().substring(9, request.getQueryString().indexOf("&"));
		if(code.equals("addPur")){
			code = getPurCode();
		}
		String cno = "";//合同编号
		if(request.getQueryString().length() > 40){
			cno = request.getQueryString().substring((request.getQueryString().indexOf("&")+10), request.getQueryString().length());
		}
		ModelAndView vide = new ModelAndView("/purchase/addPurchaseOrder");
		vide.addObject("pur_code", code);
		vide.addObject("dateTime", new Date());
		vide.addObject("cno",cno);
		return vide;
		
	}
	
	/**
	 * 采购单记起物品详情初始化
	 * @author zoe
	 * @param purchaseOrder
	 * @return
	 */
	@RequestMapping("/selectPurchaseOrderList")
	@ResponseBody
	public Map<String, Object> selectPurchaseOrderList(PageModel<PurchaseOrder> pageModel,PurchaseOrder purchaseOrder,PurchaseArticle purchaseArticle){
		Map<String, Object> map = new HashMap<>();
		if(AppUtil.isNull(purchaseArticle.getPur_code())){//查询采购单的采购物品列表
			List<PurchaseArticle> purArticleList = purchaseOrderService.selectPurchaseArticleList(purchaseArticle);
			map.put("artLisy", purArticleList);
			if(purArticleList.size() == 0){
				map.put("purType", "-1");
			}else{
				map.put("purType", purchaseOrderService.selectPurchaseOrderCOdeOne(purchaseOrder).getPur_type());
			}
			
		}else{//查询所有采购单List
			if (pageModel == null) {
				pageModel = new PageModel<PurchaseOrder>();
			}
			if (pageModel.getPageNo() == 0) {
				pageModel.setPageNo(1);
			}
			purchaseOrder.setStart((pageModel.getPageNo() - 1) * pageModel.getPageSize());
			purchaseOrder.setEnd(pageModel.getPageSize());
			List<PurchaseOrder> purOrderList =  purchaseOrderService.selectPurchaseOrderList(purchaseOrder);
			int count = purchaseOrderService.selectPurchaseOrderCount(purchaseOrder);
			pageModel.setTotalRecords(count);
			map.put("ordList", purOrderList);
			map.put("pageModel", pageModel);
		}
		return map;
	}
	
	/**
	 * 采购单添加
	 * @author zoe
	 * @param purchaseOrder
	 * @return
	 */
	@RequestMapping("/addPurchaseOrderOk")
	@ResponseBody
	public Map<String, Object> addPurchaseOrder(PurchaseOrder purchaseOrder, PurchaseArticle purchaseArticle){
		Map<String, Object> map = new HashMap<>();
		if(AppUtil.isNull(purchaseArticle.getPur_code())){//修改采购单
			//查询当前采购单
			PurchaseOrder purchaseOrder1 = purchaseOrderService.selectPurchaseOrderCOdeOne(purchaseOrder);
			if(purchaseOrder1==null){
				purchaseOrder.setPur_addTime(new Date());
				purchaseOrder.setPur_type(-1);//-1：未提交审核；0：审核中；1：审核通过；2：审核未通过
				purchaseOrder.setPur_sumMoney(purchaseArticle.getArt_priceSum());//采购总价
				UserCenterEmployee employe = AppUtil.getCookieEmployee();//当前用户
				purchaseOrder.setPur_emId(employe.getEm_id());//采购申请人
				if(purchaseOrder.getPur_addres() == null || purchaseOrder.getPur_addres().equals("")){
					purchaseOrder.setPur_addres("0");//0:公司；其余：房屋/合同Code；表示是该房屋/合同采购
				}
				purchaseOrderService.addPurchaseOrder(purchaseOrder);//添加采购单
			}else{
				purchaseOrder.setPur_sumMoney(purchaseOrder1.getPur_sumMoney() + (purchaseArticle.getArt_price() * purchaseArticle.getArt_count()));
				purchaseOrderService.updatePurchaseOrderCode(purchaseOrder);//修改采购单总价
			}
			purchaseArticle.setArt_priceSum(purchaseArticle.getArt_price() * purchaseArticle.getArt_count());
			purchaseArticle.setArt_addTime(new Date());
			purchaseArticle.setArt_code(getArtCode());//物品唯一编码
			purchaseOrderService.addPurchaseArticle(purchaseArticle);//添加采购单采购物品
			map.put("article", purchaseArticle);
			map.put("order", purchaseOrder);
			map.put("message", "success");
		}else{
			map.put("message", "error");
		}
		return map;
	}
	
	
	/**
	 * 修改采购单状态
	 * @param purchaseOrder
	 * @return
	 */
	@RequestMapping("/updatePurchaseOrderType")
	@ResponseBody
	public Map<String, Object> updatePurchaseOrderType(PurchaseOrder purchaseOrder){
		Map<String, Object> map = new HashMap<>();
		try {
			PurchaseArticle purchaseArticle = new PurchaseArticle();
			purchaseArticle.setPur_code(purchaseOrder.getPur_code());
			List<PurchaseArticle> art = purchaseOrderService.selectPurchaseArticleList(purchaseArticle);
			purchaseOrder = purchaseOrderService.selectPurchaseOrderCOdeOne(purchaseOrder);//查询出该采购单信息
			addItemsInventoryList(art,purchaseOrder);//将物品导入物品库
			purchaseOrder.setPur_type(1);//-1：未提交审核；0：审核中；1：审核通过；2：审核未通过
			purchaseOrderService.updatePurchaseOrderCode(purchaseOrder);//修改采购单状态
			map.put("types", "success");
		} catch (Exception e) {
			e.getStackTrace();
			map.put("types", "error");
		}
		
		return map;
	}
	
	
	/**
	 * 将采购单物品批量导入物品库存
	 * @param artList
	 * @param order
	 * @return
	 */
	public int addItemsInventoryList(List<PurchaseArticle> artList,PurchaseOrder order){
		PurchaseArticle art = new PurchaseArticle();
		for (int i = 0; i < artList.size(); i++) {
			art = artList.get(i);
			ItemsInventory itemsInventory = new ItemsInventory();//初始化物品库存
			itemsInventory.setArt_code(art.getArt_code());//采购单物品唯一编码
			itemsInventory.setInv_type(art.getArt_type());//物品类型
			itemsInventory.setInv_name(art.getArt_name());//物品名称
			itemsInventory.setInv_brand(art.getArt_brand());//物品品牌
			itemsInventory.setInv_price(art.getArt_price());//物品价格
			itemsInventory.setInv_priceSum(art.getArt_priceSum());//物品总价
			itemsInventory.setEm_id(order.getPur_purId());//采购人
			itemsInventory.setInv_payer(art.getArt_payer());//付费对象
			itemsInventory.setInv_createTime(new Date());//添加时间
			itemsInventory.setInv_state(0);//使用状态0：未使用；1：使用中
			itemsInventory.setInv_on(art.getArt_on());//物品新旧
			itemsInventory.setInv_gb(0);//物品好坏0：号；1：坏
			itemsInventory.setInv_remark(art.getArt_remark());//备注
			itemsInventory.setInv_position("0");//物品位置0：公司；其余：房屋编号
//			itemsInventory.setInv_count(art.getArt_count());//物品数量
			itemsInventory.setInv_count(1);//物品数量
			//初始化物品存放记录
			ItemsStorageRecord itemsStorageRecord = new ItemsStorageRecord();
			itemsStorageRecord.setIsr_content("采购物品");//记录内容
			itemsStorageRecord.setEm_id(order.getPur_purId());//办理人
			itemsStorageRecord.setIsr_createTime(new Date());//记录时间
			itemsStorageRecord.setIsr_isHandle(1);//是否处理；0:未处理；1：已处理；默认为已处理
			itemsStorageRecord.setIsr_positionAfter("0");//存放位置；0：公司；其余为房屋/合同编号
			itemsStorageRecord.setIsr_positionBefore("1");//存放位置；0：公司；1：从外采购；其余为房屋/合同编号
			
			//初始化物品账单
			ItemsBill itemsBill = new ItemsBill();
			itemsBill.setIb_code("240" + Randoms.getRandomDate());//设置账单唯一编码
			itemsBill.setIb_repay(itemsInventory.getInv_price());//应付款
			itemsBill.setIb_realPay(itemsInventory.getInv_price());//实付款
			itemsBill.setBs_statementNum("210" + Randoms.getRandomDate());//支付流水号
			itemsBill.setIb_remark("入库时生成的账单");//备注
			itemsBill.setIb_createTime(new Date());//账单生成时间
			
			for (int j = 0; j < art.getArt_count(); j++) {
				//物品库存添加物品
				itemsInventory.setInv_code("RES" +Randoms.getRandomDate());//设置物品唯一编码
				itemsInventoryService.addItemsInventoryOne(itemsInventory);
				//物品存放记录生成
				itemsStorageRecord.setInv_code(itemsInventory.getInv_code());//物品唯一编码
				itemsInventoryService.addItemsStorageRecordOne(itemsStorageRecord);
				//物品账单添加
				itemsBill.setInv_code(itemsInventory.getInv_code());//物品唯一编码
				itemsInventoryService.addItemsBillOne(itemsBill);
			}
			
			
		}
		
		return 0;
	}
	
	
	/**
	 * 根据房屋/合同Code查询该房屋/合同的物品添置账单情况
	 * @param purchaseOrder
	 * @return
	 */
	@RequestMapping("/selectInventory")
	@ResponseBody
	public Map<String, Object> selectItemsInventory(PurchaseOrder purchaseOrder){
		Map<String, Object> map = new HashMap<>();
		List<ItemsInventory> invList = purchaseOrderService.selectItemsInvtory(purchaseOrder);
		if(invList.size() > 0){
			map.put("message", "success");
			map.put("vlist", invList);
		}else {
			map.put("message", "error");
		}
		
		return map;
	}
	
	
	
	/**
	 * 采购单Code：PUR + 时间戳 + 随机数4位
	 * @author zoe
	 * @return
	 */
	public String getPurCode() {
		StringBuffer str = new StringBuffer();
		str.append("PUR");//采购单开头字母
		String date = new Date().getTime() + "";
		str.append(date);
		str.append(Randoms.random());
		return str.toString();
	}
	
	/**
	 * 生成库存物品Code；RES + 时间戳 + 随机数4位
	 * @author zoe
	 * @return
	 */
	public String getArtCode() {
		StringBuffer str = new StringBuffer();
		str.append("ART");//物品库开头
		String date = new Date().getTime() + "";
		str.append(date);
		str.append(Randoms.random());
		return str.toString();
	}
	
}
