package com.gjp.service;

import com.gjp.dao.BillClearOrderDAO;
import com.gjp.model.BillClearOrder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2015年12月6日 下午2:48:11 
 */
@Service
public class BillClearOrderService {

	@Resource
	private BillClearOrderDAO billClearOrderDAO;
	
	/**
	 * 插入保洁订单
	 * 
	 * @param billClearOrder
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer addBillClearOrder(BillClearOrder billClearOrder){
		return billClearOrderDAO.addBillClearOrder(billClearOrder);
	}
	
	/**
	 * 根据订单号查询保洁订单
	 * 
	 * @param billClearOrder
	 * @return
	 *
	 * @author 陈智颖
	 */
	public BillClearOrder selectBillClearOrder(
			BillClearOrder billClearOrder) {
		return billClearOrderDAO.selectBillClearOrder(billClearOrder);
	}
	
	/**
	 * 修改订单金额
	 * 
	 * @param billClearOrder
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer updateClearOrderMoney(
			BillClearOrder billClearOrder) {
		return billClearOrderDAO.updateClearOrderMoney(billClearOrder);
	}
	
	/**
	 * 修改订单状态
	 * 
	 * @param billClearOrder
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer updateClearOrderState(
			BillClearOrder billClearOrder) {
		return billClearOrderDAO.updateClearOrderState(billClearOrder);
	}
}
