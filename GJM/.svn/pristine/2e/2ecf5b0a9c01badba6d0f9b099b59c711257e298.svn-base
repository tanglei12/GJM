package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.CustomerBankDAO;
import com.gjp.model.UserCustomerBank;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年8月11日 下午3:51:03 
 */
@Repository
public class CustomerBankDAOImpl extends BaseDAO implements CustomerBankDAO{

	@Override
	public Integer insertCustomerBank(UserCustomerBank userCustomerBank) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.CustomerBankDAO.insertCustomerBank",userCustomerBank);
	}

	@Override
	public List<UserCustomerBank> selectCustomerBank(UserCustomerBank userCustomerBank) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerBankDAO.selectCustomerBank",userCustomerBank);
	}

	@Override
	public Integer updateCustomerBanke(UserCustomerBank userCustomerBank) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.CustomerBankDAO.updateCustomerBanke",userCustomerBank);
	}

	@Override
	public Integer deleteCustomerBanke(UserCustomerBank userCustomerBank) {
		return super.sqlSessionTemplateUser.delete("com.gjp.dao.CustomerBankDAO.deleteCustomerBanke",userCustomerBank);
	}

}
