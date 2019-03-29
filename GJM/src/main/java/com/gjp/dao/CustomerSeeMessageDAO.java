package com.gjp.dao;

import com.gjp.model.CustomerSeeMessage;

import java.util.List;

/**
 * 客户带看信息
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年2月26日 上午10:06:10 
 */
public interface CustomerSeeMessageDAO {

	/**
	 * 插入客户带看信息
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer insertCustomerSeeMessage(CustomerSeeMessage customerSeeMessage);
	
	/**
	 * 修改客户带看信息
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updateCustomerSeeMessage(CustomerSeeMessage customerSeeMessage);
	
	/**
	 * 查询客户追踪查询追踪信息
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	CustomerSeeMessage queryCustomerSeeMessageWhere(CustomerSeeMessage customerSeeMessage);
	
	/**
	 * 根据房屋编号查询正在跟踪房屋
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<CustomerSeeMessage> queryCustomerSeeMessageHouse(CustomerSeeMessage customerSeeMessage);
}
