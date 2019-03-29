package com.gjp.dao;

import com.gjp.model.LSFOrder;

import java.util.List;

/**
 * 乐首付订单
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2015年8月12日 下午5:31:52 
 */
public interface LSFOrderDAO {
	
	/**
	 * 插入订单
	 * 
	 * @param lsfOrder
	 * @return
	 */
	Integer addLSFOrder(LSFOrder lsfOrder);
	
	/**
	 * 修改订单状态
	 * 
	 * @param lsfOrder
	 * @return
	 */
	Integer updateSFBillType(LSFOrder lsfOrder);
	
	/**
	 * 同步订单状态
	 * 
	 * @param lsfOrder
	 * @return
	 */
	Integer updateOrder(LSFOrder lsfOrder);
	
	/**
	 * 查询订单最新的时间
	 * 
	 * @return
	 */
	List<LSFOrder> selectLSFOrderNow();
	
	/**
	 * 查询所有订单数据
	 * 
	 * @return
	 */
	List<LSFOrder> selectLSFOrderAll();
	
	/**
	 * 查询订单总数
	 * 
	 * @return
	 */
	List<LSFOrder> selectLSFOrderSize(LSFOrder lsfOrder);
	
	/**
	 * 分页查询订单数据
	 * 
	 * @return
	 */
	List<LSFOrder> selectLSFOrder(LSFOrder lsfOrder);
	
	/**
	 * 查询是否存在该条数
	 * 
	 * @param lsfOrder
	 * @return
	 */
	List<LSFOrder> selectLSFOrderBool(LSFOrder lsfOrder);
	

}
