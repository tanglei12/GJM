package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.CustomerImageDAO;
import com.gjp.model.UserCustomerImage;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年8月1日 下午3:55:47 
 */
@Repository
public class CustomerImageDAOImpl extends BaseDAO implements CustomerImageDAO{

	@Override
	public Integer insertCustomerImage(UserCustomerImage customerImage) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.CustomerImageDAO.insertCustomerImage",customerImage);
	}

	@Override
	public List<UserCustomerImage> selectCustomerImage(UserCustomerImage customerImage) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerImageDAO.selectCustomerImage",customerImage);
	}

	@Override
	public Integer updateCustomerImage(UserCustomerImage customerImage) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.CustomerImageDAO.updateCustomerImage",customerImage);
	}
	
	@Override
	public Integer updateCustomerImages(UserCustomerImage customerImage) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.CustomerImageDAO.updateCustomerImages",customerImage);
	}

	@Override
	public Integer deleteCustomerImage(UserCustomerImage customerImage) {
		return super.sqlSessionTemplateUser.delete("com.gjp.dao.CustomerImageDAO.deleteCustomerImage",customerImage);
	}

}
