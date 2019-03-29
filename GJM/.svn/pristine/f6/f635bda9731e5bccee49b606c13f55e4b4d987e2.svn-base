package com.gjp.service;

import com.gjp.dao.PropertyLivingPaymentDAO;
import com.gjp.model.PropertyLivingPayment;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年4月11日 下午6:38:22 
 */
@Service
public class PropertyLivingPaymentService {

	@Resource
	private PropertyLivingPaymentDAO propertyLivingPaymentDAO;
	
	/**
	 * 插入物业水电气
	 * 
	 * @param propertyLivingPayment
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer insertPropertyLivingPayment(PropertyLivingPayment propertyLivingPayment){
		return propertyLivingPaymentDAO.insertPropertyLivingPayment(propertyLivingPayment);
	}
	
	/**
	 * 修改物业水电气
	 * 
	 * @param propertyLivingPayment
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer updatePropertyLivingPayment(PropertyLivingPayment propertyLivingPayment){
		return propertyLivingPaymentDAO.updatePropertyLivingPayment(propertyLivingPayment);
	}
	
	/**
	 * 查询是否存在物业水电气
	 * 
	 * @param propertyLivingPayment
	 * @return
	 *
	 * @author 陈智颖
	 */
	public PropertyLivingPayment queryPropertyLivingPaymentCount(PropertyLivingPayment propertyLivingPayment){
		return propertyLivingPaymentDAO.queryPropertyLivingPaymentCount(propertyLivingPayment);
	}
	
	/**
	 * 根据物业水电气编号查询物业水电气
	 * 
	 * @param propertyLivingPayment
	 * @return
	 *
	 * @author 陈智颖
	 */
	public PropertyLivingPayment queryPropertyLivingPaymentWhere(PropertyLivingPayment propertyLivingPayment){
		return propertyLivingPaymentDAO.queryPropertyLivingPaymentWhere(propertyLivingPayment);
	}
	
	/**
	 * 根据条件查询物业水电气
	 * 
	 * @param propertyLivingPayment
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<PropertyLivingPayment> queryPropertyLivingPayment(PropertyLivingPayment propertyLivingPayment){
		return propertyLivingPaymentDAO.queryPropertyLivingPayment(propertyLivingPayment);
	}
	

	/**
	 * 查询所有超级物业父级为参数值那种的
	 * 
	 * @param propertyLivingPayment
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer deletePropertyLivingPayment(PropertyLivingPayment propertyLivingPayment){
		return propertyLivingPaymentDAO.deletePropertyLivingPayment(propertyLivingPayment);
	}
}
