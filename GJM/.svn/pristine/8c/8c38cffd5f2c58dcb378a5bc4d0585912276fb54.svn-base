package com.gjp.service;

import com.gjp.dao.CustomerImageDAO;
import com.gjp.model.UserCustomerImage;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年8月1日 下午3:56:41 
 */
@Service
public class CustomerImageService {

	@Resource
	private CustomerImageDAO customerImageDAO;
	
	/**
	 * 插入客户图片
	 * 
	 * @param customerImage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer insertCustomerImage(UserCustomerImage customerImage){
		return customerImageDAO.insertCustomerImage(customerImage);
	}
	
	/**
	 * 根据客户编号查询客户图片
	 * 
	 * @param customerImage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<UserCustomerImage> selectCustomerImage(UserCustomerImage customerImage){
		return customerImageDAO.selectCustomerImage(customerImage);
	}
	
	/**
	 * 删除图片
	 * 
	 * @param customerImage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer deleteCustomerImage(UserCustomerImage customerImage){
		return customerImageDAO.deleteCustomerImage(customerImage);
	}
}
