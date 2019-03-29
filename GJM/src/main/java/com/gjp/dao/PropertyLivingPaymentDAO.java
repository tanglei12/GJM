package com.gjp.dao;

import com.gjp.model.PropertyLivingPayment;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年4月11日 下午6:30:07 
 */
public interface PropertyLivingPaymentDAO {

	/**
	 * 插入物业水电气
	 * 
	 * @param propertyLivingPayment
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer insertPropertyLivingPayment(PropertyLivingPayment propertyLivingPayment);
	
	/**
	 * 修改物业水电气
	 * 
	 * @param propertyLivingPayment
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updatePropertyLivingPayment(PropertyLivingPayment propertyLivingPayment);
	
	/**
	 * 查询是否存在物业水电气
	 * 
	 * @param propertyLivingPayment
	 * @return
	 *
	 * @author 陈智颖
	 */
	PropertyLivingPayment queryPropertyLivingPaymentCount(PropertyLivingPayment propertyLivingPayment);
	
	/**
	 * 根据物业水电气编号查询物业水电气
	 * 
	 * @param propertyLivingPayment
	 * @return
	 *
	 * @author 陈智颖
	 */
	PropertyLivingPayment queryPropertyLivingPaymentWhere(PropertyLivingPayment propertyLivingPayment);
	
	/**
	 * 根据条件查询物业水电气
	 * 
	 * @param propertyLivingPayment
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<PropertyLivingPayment> queryPropertyLivingPayment(PropertyLivingPayment propertyLivingPayment);
	
	/**
	 * 查询所有超级物业父级为参数值那种的
	 * 
	 * @param propertyLivingPayment
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer deletePropertyLivingPayment(PropertyLivingPayment propertyLivingPayment);
}
