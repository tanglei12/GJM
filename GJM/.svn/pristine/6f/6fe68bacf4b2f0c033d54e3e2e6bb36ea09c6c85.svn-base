package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.ServiceOrderDao;
import com.gjp.model.ServiceOrder;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 王孝元
 *
 * @version 创建时间：2017年3月16日 上午10:03:40
 */
@Repository
public class ServiceOrderDaoImpl extends BaseDAO implements ServiceOrderDao {

	@Override
	public int addServiceOrder(ServiceOrder order) {
		return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceOrderDao.addServiceOrder", order);
	}

	@Override
	public List<ServiceOrder> queryServiceOrderList(PageModel<ServiceOrder> pageModel) {
		List<ServiceOrder> list = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceOrderDao.queryServiceOrderList",pageModel);
		return list;
	}

	@Override
	public int queryServiceOrderListCount(PageModel<ServiceOrder> pageModel) {
		return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceOrderDao.queryServiceOrderListCount", pageModel);
	}
}
