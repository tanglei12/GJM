package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.PropertyLivingPaymentDAO;
import com.gjp.model.PropertyLivingPayment;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年4月11日 下午6:36:21 
 */
@Repository
public class PropertyLivingPaymentDAOImpl extends BaseDAO implements PropertyLivingPaymentDAO{

	@Override
	public Integer insertPropertyLivingPayment(PropertyLivingPayment propertyLivingPayment) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.PropertyLivingPaymentDAO.insertPropertyLivingPayment",propertyLivingPayment);
	}

	@Override
	public Integer updatePropertyLivingPayment(PropertyLivingPayment propertyLivingPayment) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.PropertyLivingPaymentDAO.updatePropertyLivingPayment",propertyLivingPayment);
	}

	@Override
	public PropertyLivingPayment queryPropertyLivingPaymentCount(PropertyLivingPayment propertyLivingPayment) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.PropertyLivingPaymentDAO.queryPropertyLivingPaymentCount",propertyLivingPayment);
	}

	@Override
	public PropertyLivingPayment queryPropertyLivingPaymentWhere(PropertyLivingPayment propertyLivingPayment) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.PropertyLivingPaymentDAO.queryPropertyLivingPaymentWhere",propertyLivingPayment);
	}

	@Override
	public List<PropertyLivingPayment> queryPropertyLivingPayment(PropertyLivingPayment propertyLivingPayment) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.PropertyLivingPaymentDAO.queryPropertyLivingPayment",propertyLivingPayment);
	}

	@Override
	public Integer deletePropertyLivingPayment(PropertyLivingPayment propertyLivingPayment) {
		return super.sqlSessionTemplateProduct.delete("com.gjp.dao.PropertyLivingPaymentDAO.deletePropertyLivingPayment",propertyLivingPayment);
	}

}
