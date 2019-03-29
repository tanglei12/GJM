package com.gjp.service;

import com.gjp.dao.CustomerSeeMessageDAO;
import com.gjp.model.CustomerSeeMessage;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 客户带看信息
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年2月26日 上午10:11:04 
 */
@Service
public class CustomerSeeMessageService {

	@Resource
	private CustomerSeeMessageDAO customerSeeMessageDAO;
	
	/**
	 * 插入客户带看信息
	 * 
	 * @param customerSeeMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer insertCustomerSeeMessage(CustomerSeeMessage customerSeeMessage){
		return customerSeeMessageDAO.insertCustomerSeeMessage(customerSeeMessage);
	}
	
	/**
	 * 修改客户带看信息
	 * 
	 * @param customerSeeMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer updateCustomerSeeMessage(CustomerSeeMessage customerSeeMessage){
		return customerSeeMessageDAO.updateCustomerSeeMessage(customerSeeMessage);
	}
	
	/**
	 * 查询客户追踪查询追踪信息
	 * 
	 * @param customerSeeMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public CustomerSeeMessage queryCustomerSeeMessageWhere(CustomerSeeMessage customerSeeMessage){
		return customerSeeMessageDAO.queryCustomerSeeMessageWhere(customerSeeMessage);
	}
	
	/**
	 * 根据房屋编号查询正在跟踪房屋
	 * 
	 * @param customerSeeMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<CustomerSeeMessage> queryCustomerSeeMessageHouse(CustomerSeeMessage customerSeeMessage){
		return customerSeeMessageDAO.queryCustomerSeeMessageHouse(customerSeeMessage);
	}
	
}
