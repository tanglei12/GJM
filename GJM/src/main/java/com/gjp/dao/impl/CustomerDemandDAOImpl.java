package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.CustomerDemandDAO;
import com.gjp.model.UserCustomerDemand;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CustomerDemandDAOImpl extends BaseDAO implements CustomerDemandDAO{

	@Override
	public List<UserCustomerDemand> selectAllCustomerDemand() {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDemandDAO.selectAllCustomerDemand");
	}

}
