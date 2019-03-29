package com.gjp.service;

import com.gjp.dao.CustomerPhoneDAO;
import com.gjp.model.UserCustomerPhone;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年8月1日 下午4:02:56 
 */
@Service
public class CustomerPhoneService {

	@Resource
	private CustomerPhoneDAO customerPhoneDAO;
	
	/**
	 * 查询所有客户
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<UserCustomerPhone> selectAllCustomerPhone(){
		return customerPhoneDAO.selectAllCustomerPhone();
	}
	
	/**
	 * 查询紧急联系人
	 *
	 * @param userCustomerPhone
	 * @return
	 *
	 * @author 陈智颖
	 */
	public UserCustomerPhone selectCustomerPhoneUrgent(UserCustomerPhone userCustomerPhone){
		return customerPhoneDAO.selectCustomerPhoneUrgent(userCustomerPhone);
	}
	
	/**
	 * 查询备用联系人
	 *
	 * @param userCustomerPhone
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<UserCustomerPhone> selectCustomerPhoneB(UserCustomerPhone userCustomerPhone){
		return customerPhoneDAO.selectCustomerPhoneB(userCustomerPhone);
	}
	
	/**
	 * 根据编号和手机查询客户手机
	 *
	 * @param userCustomerPhone
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<UserCustomerPhone> selectCustomerPhoneAndccId(UserCustomerPhone userCustomerPhone){
		return customerPhoneDAO.selectCustomerPhoneAndccId(userCustomerPhone);
	}
}
