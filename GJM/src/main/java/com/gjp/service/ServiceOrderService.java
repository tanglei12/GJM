package com.gjp.service;

import com.gjp.dao.ServiceOrderDao;
import com.gjp.model.ServiceOrder;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 服务预约
 * 
 * @author 王孝元
 *
 * @version 创建时间：2017年3月16日 上午10:21:44
 */
@Service
public class ServiceOrderService {

	@Resource
	private ServiceOrderDao serviceOrderDao;

	/**
	 * 新增预约
	 * 
	 * @param order
	 * @return
	 * @author 王孝元
	 */
	public boolean addServiceOrder(ServiceOrder order) {
		return serviceOrderDao.addServiceOrder(order) > 0;
	}
	
	/**
	 * 查询服务预约
	 * 
	 * @param pageModel
	 * @return
	 * @author 王孝元
	 */
	public PageModel<ServiceOrder> queryServiceOrderList(PageModel<ServiceOrder> pageModel) {
		List<ServiceOrder> list = serviceOrderDao.queryServiceOrderList(pageModel);
		int totalRecords = serviceOrderDao.queryServiceOrderListCount(pageModel);
		pageModel.setTotalRecords(totalRecords);
		pageModel.setList(list);
		return pageModel;
	}
}
