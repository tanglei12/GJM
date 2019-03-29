package com.gjp.dao;

import com.gjp.model.UserCustomerImage;

import java.util.List;

public interface CustomerImageDAO {
	
	/**
	 * 插入客户图片
	 * 
	 * @param customerImage
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer insertCustomerImage(UserCustomerImage customerImage);
	
	/**
	 * 根据客户编号查询客户图片
	 * 
	 * @param customerImage
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<UserCustomerImage> selectCustomerImage(UserCustomerImage customerImage);
	
	/**
	 * 修改客户图片
	 * 
	 * @param customerImage
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updateCustomerImage(UserCustomerImage customerImage);
	
	/**
	 * 修改客户图片
	 * 
	 * @param customerImage
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updateCustomerImages(UserCustomerImage customerImage);
	
	/**
	 * 删除客户图片
	 * 
	 * @param customerImage
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer deleteCustomerImage(UserCustomerImage customerImage);
}
