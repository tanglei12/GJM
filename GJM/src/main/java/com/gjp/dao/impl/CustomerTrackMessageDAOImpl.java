package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.CustomerTrackMessageDAO;
import com.gjp.model.CustomerTrackMessage;
import com.gjp.model.UserCenterEmployee;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年2月28日 上午10:34:05 
 */
@Repository
public class CustomerTrackMessageDAOImpl extends BaseDAO implements CustomerTrackMessageDAO{

	@Override
	public Integer insertCustomerTrackMessage(CustomerTrackMessage customerTrackMessage) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.CustomerTrackMessageDAO.insertCustomerTrackMessage",customerTrackMessage);
	}

	@Override
	public List<CustomerTrackMessage> queryCustomerTrackMessage(CustomerTrackMessage customerTrackMessage) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerTrackMessageDAO.queryCustomerTrackMessage",customerTrackMessage);
	}

	@Override
	public CustomerTrackMessage queryCustomerTrackMessagePhoneCount(CustomerTrackMessage customerTrackMessage) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerTrackMessageDAO.queryCustomerTrackMessagePhoneCount",customerTrackMessage);
	}

	@Override
	public List<CustomerTrackMessage> queryCustomerTrackMessagePublic(CustomerTrackMessage customerTrackMessage) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerTrackMessageDAO.queryCustomerTrackMessagePublic",customerTrackMessage);
	}

	@Override
	public List<CustomerTrackMessage> queryCustomerTrackMessagePrivate(CustomerTrackMessage customerTrackMessage) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerTrackMessageDAO.queryCustomerTrackMessagePrivate",customerTrackMessage);
	}

	@Override
	public Integer updateCustomerTrackMessage(CustomerTrackMessage customerTrackMessage) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.CustomerTrackMessageDAO.updateCustomerTrackMessage",customerTrackMessage);
	}

	@Override
	public CustomerTrackMessage queryCustomerTrackMessageID(CustomerTrackMessage customerTrackMessage) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerTrackMessageDAO.queryCustomerTrackMessageID",customerTrackMessage);
	}

	@Override
	public List<CustomerTrackMessage> queryCustomerTrackMessageList(CustomerTrackMessage customerTrackMessage) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerTrackMessageDAO.queryCustomerTrackMessageList",customerTrackMessage);
	}

	@Override
	public List<CustomerTrackMessage> queryCustomerTrackMessageState() {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerTrackMessageDAO.queryCustomerTrackMessageState");
	}

	@Override
	public List<UserCenterEmployee> queryEmName(UserCenterEmployee centerEmployee) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerTrackMessageDAO.queryEmName",centerEmployee);
	}

}
