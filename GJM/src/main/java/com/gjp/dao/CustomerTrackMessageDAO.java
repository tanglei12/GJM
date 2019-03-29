package com.gjp.dao;

import com.gjp.model.CustomerTrackMessage;
import com.gjp.model.UserCenterEmployee;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年2月24日 下午5:57:07 
 */
public interface CustomerTrackMessageDAO {

	/**
	 * 插入客户客户跟踪信息
	 * 
	 * @param customerTrackMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer insertCustomerTrackMessage(CustomerTrackMessage customerTrackMessage);
	
	/**
	 * 修改客户客户跟踪信息
	 * 
	 * @param customerTrackMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updateCustomerTrackMessage(CustomerTrackMessage customerTrackMessage);
	
	/**
	 * 查询客户跟踪信息
	 * 
	 * @param customerTrackMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<CustomerTrackMessage> queryCustomerTrackMessage(CustomerTrackMessage customerTrackMessage);
	
	/**
	 * 查询用户列表
	 * 
	 * @param customerTrackMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<CustomerTrackMessage> queryCustomerTrackMessageList(CustomerTrackMessage customerTrackMessage);
	
	/**
	 * 查询未公开的客户跟踪信息
	 * 
	 * @param customerTrackMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<CustomerTrackMessage> queryCustomerTrackMessageState();
	
	/**
	 * 根据用户跟踪信息编码查询客户跟踪信息
	 * 
	 * @param customerTrackMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	CustomerTrackMessage queryCustomerTrackMessageID(CustomerTrackMessage customerTrackMessage);
	
	/**
	 * 公开用户
	 * 
	 * @param customerTrackMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<CustomerTrackMessage> queryCustomerTrackMessagePublic(CustomerTrackMessage customerTrackMessage);
	
	/**
	 * 个人用户
	 * 
	 * @param customerTrackMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<CustomerTrackMessage> queryCustomerTrackMessagePrivate(CustomerTrackMessage customerTrackMessage);
	
	/**
	 * 内部人员
	 * 
	 * @param customerTrackMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<UserCenterEmployee> queryEmName(UserCenterEmployee centerEmployee);
	
	/**
	 * 查询手机号是否重复
	 * 
	 * @param customerTrackMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	CustomerTrackMessage queryCustomerTrackMessagePhoneCount(CustomerTrackMessage customerTrackMessage);
}
