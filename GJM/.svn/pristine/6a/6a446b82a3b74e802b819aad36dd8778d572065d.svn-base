package com.gjp.dao;

import com.gjp.model.UserCustomerPhone;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年8月1日 下午4:00:02
 */
public interface CustomerPhoneDAO {

	/**
	 * 查询所有客户
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<UserCustomerPhone> selectAllCustomerPhone();

	/**
	 * 查询所有客户
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	UserCustomerPhone selectCustomerPhoneUrgent(UserCustomerPhone userCustomerPhone);
	
	/**
	 * 查询备用联系人
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<UserCustomerPhone> selectCustomerPhoneB(UserCustomerPhone userCustomerPhone);
	
	/**
	 * 根据编号和手机查询客户手机
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<UserCustomerPhone> selectCustomerPhoneAndccId(UserCustomerPhone userCustomerPhone);
	
	/**
	 * 新增客户联系方式
	 * 
	 * @author 陈智颖
	 * @param userCustomerPhone
	 * @return
	 */
	int insertCustomerPhone(UserCustomerPhone userCustomerPhone);

	/**
	 * 修改客户电话信息
	 * 
	 * @author 陈智颖
	 * @param userCustomerPhone
	 * @return
	 */
	int updateCustomerPhone(UserCustomerPhone userCustomerPhone);
	
	/**
	 * 删除客户电话信息
	 * 
	 * @author 陈智颖
	 * @param userCustomerPhone
	 * @return
	 */
	int deleteCustomerPhone(UserCustomerPhone userCustomerPhone);

	/**
	 * 根据客户编码查询客户电话
	 * @param userCustomerPhone
	 * @return
	 */
	List<UserCustomerPhone> queryPhoneByCustomerId(UserCustomerPhone userCustomerPhone);
}
