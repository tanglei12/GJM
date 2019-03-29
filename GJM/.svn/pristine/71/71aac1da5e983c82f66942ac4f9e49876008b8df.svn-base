package com.gjp.dao;

import com.gjp.model.ServiceOrder;
import com.gjp.util.PageModel;

import java.util.List;

/**
 * 服务预约
 * 
 * @author 王孝元
 *
 * @version 创建时间：2017年3月16日 上午10:03:40
 */
public interface ServiceOrderDao {

	/**
	 * 新增预约
	 * 
	 * @param order
	 * @return
	 * @author 王孝元
	 */
	int addServiceOrder(ServiceOrder order);

	/**
	 * 查询预约列表
	 * 
	 * @return
	 * @author 王孝元
	 */
	List<ServiceOrder> queryServiceOrderList(PageModel<ServiceOrder> pageModel);

	/**
	 * 查询预约列表(Count)
	 * 
	 * @return
	 * @author 王孝元
	 */
	int queryServiceOrderListCount(PageModel<ServiceOrder> pageModel);
}
