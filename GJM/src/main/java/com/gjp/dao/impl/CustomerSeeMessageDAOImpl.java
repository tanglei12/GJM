package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.CustomerSeeMessageDAO;
import com.gjp.model.CustomerSeeMessage;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CustomerSeeMessageDAOImpl extends BaseDAO implements CustomerSeeMessageDAO{

	@Override
	public Integer insertCustomerSeeMessage(CustomerSeeMessage customerTrackMessage) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.CustomerSeeMessageDAO.insertCustomerSeeMessage",customerTrackMessage);
	}

	@Override
	public CustomerSeeMessage queryCustomerSeeMessageWhere(CustomerSeeMessage customerSeeMessage) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerSeeMessageDAO.queryCustomerSeeMessageWhere",customerSeeMessage);
	}

	@Override
	public Integer updateCustomerSeeMessage(CustomerSeeMessage customerSeeMessage) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.CustomerSeeMessageDAO.updateCustomerSeeMessage",customerSeeMessage);
	}

	@Override
	public List<CustomerSeeMessage> queryCustomerSeeMessageHouse(CustomerSeeMessage customerSeeMessage) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerSeeMessageDAO.queryCustomerSeeMessageHouse",customerSeeMessage);
	}

}
