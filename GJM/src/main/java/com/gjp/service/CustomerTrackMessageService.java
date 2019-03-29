package com.gjp.service;

import com.gjp.dao.CustomerTrackMessageDAO;
import com.gjp.model.CustomerTrackMessage;
import com.gjp.model.UserCenterEmployee;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年2月24日 下午6:01:42 
 */
@Service
public class CustomerTrackMessageService {

	@Resource
	private CustomerTrackMessageDAO customerTrackMessageDAO;
	
	/**
	 * 插入客户客户跟踪信息
	 * 
	 * @param customerTrackMessage
	 *
	 * @author 陈智颖
	 */
	public Integer insertCustomerTrackMessage(CustomerTrackMessage customerTrackMessage){
		return customerTrackMessageDAO.insertCustomerTrackMessage(customerTrackMessage);
	}
	
	/**
	 * 根据用户跟踪信息编码查询客户跟踪信息
	 * 
	 * @param customerTrackMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public CustomerTrackMessage queryCustomerTrackMessageID(CustomerTrackMessage customerTrackMessage){
		return customerTrackMessageDAO.queryCustomerTrackMessageID(customerTrackMessage);
	}
	
	/**
	 * 公开用户
	 * 
	 * @param customerTrackMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<CustomerTrackMessage> queryCustomerTrackMessagePublic(CustomerTrackMessage customerTrackMessage){
		return customerTrackMessageDAO.queryCustomerTrackMessagePublic(customerTrackMessage);
	}
	
	/**
	 * 查询未公开的客户跟踪信息
	 * 
	 * @param customerTrackMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<CustomerTrackMessage> queryCustomerTrackMessageState(){
		return customerTrackMessageDAO.queryCustomerTrackMessageState();
	}
	
	/**
	 * 查询用户列表
	 * 
	 * @param customerTrackMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<CustomerTrackMessage> queryCustomerTrackMessageList(CustomerTrackMessage customerTrackMessage){
		return customerTrackMessageDAO.queryCustomerTrackMessageList(customerTrackMessage);
	}
	
	/**
	 * 个人用户
	 * 
	 * @param customerTrackMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<CustomerTrackMessage> queryCustomerTrackMessagePrivate(CustomerTrackMessage customerTrackMessage){
		return customerTrackMessageDAO.queryCustomerTrackMessagePrivate(customerTrackMessage);
	}
	
	/**
	 * 内部人员
	 * 
	 * @param UserCenterEmployee
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<UserCenterEmployee> queryEmName(UserCenterEmployee centerEmployee){
		return customerTrackMessageDAO.queryEmName(centerEmployee);
	}
	
	/**
	 * 查询客户跟踪信息
	 * 
	 * @param customerTrackMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<CustomerTrackMessage> queryCustomerTrackMessage(CustomerTrackMessage customerTrackMessage){
		return customerTrackMessageDAO.queryCustomerTrackMessage(customerTrackMessage);
	}
	
	/**
	 * 查询手机号是否重复
	 * 
	 * @param customerTrackMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public CustomerTrackMessage queryCustomerTrackMessagePhoneCount(CustomerTrackMessage customerTrackMessage){
		return customerTrackMessageDAO.queryCustomerTrackMessagePhoneCount(customerTrackMessage);
	}
	
	/**
	 * 修改客户客户跟踪信息
	 * 
	 * @param customerTrackMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer updateCustomerTrackMessage(CustomerTrackMessage customerTrackMessage){
		return customerTrackMessageDAO.updateCustomerTrackMessage(customerTrackMessage);
	}
	
	
}
