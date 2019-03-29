package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.LSFOrderDAO;
import com.gjp.model.LSFOrder;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 乐首付订单
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2015年8月12日 下午5:34:09 
 */
@Repository
public class LSFOrderDAOImpl extends BaseDAO implements LSFOrderDAO{

	@Override
	public Integer addLSFOrder(LSFOrder lsfOrder) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.LSFOrderDAO.addLSFOrder",lsfOrder);
	}

	@Override
	public List<LSFOrder> selectLSFOrderNow() {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.LSFOrderDAO.selectLSFOrderNow");
	}

	@Override
	public List<LSFOrder> selectLSFOrderSize(LSFOrder lsfOrder) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.LSFOrderDAO.selectLSFOrderSize",lsfOrder);
	}

	@Override
	public List<LSFOrder> selectLSFOrder(LSFOrder lsfOrder) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.LSFOrderDAO.selectLSFOrder",lsfOrder);
	}

	@Override
	public List<LSFOrder> selectLSFOrderBool(LSFOrder lsfOrder) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.LSFOrderDAO.selectLSFOrderBool",lsfOrder);
	}

	@Override
	public Integer updateSFBillType(LSFOrder lsfOrder) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.LSFOrderDAO.updateSFBillType",lsfOrder);
	}

	@Override
	public List<LSFOrder> selectLSFOrderAll() {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.LSFOrderDAO.selectLSFOrderAll");
	}

	@Override
	public Integer updateOrder(LSFOrder lsfOrder) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.LSFOrderDAO.updateOrder",lsfOrder);
	}

}
