package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.CustomerPhoneDAO;
import com.gjp.model.UserCustomerPhone;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年8月1日 下午4:01:27
 */
@Repository
public class CustomerPhoneDAOImpl extends BaseDAO implements CustomerPhoneDAO {

	@Override
	public List<UserCustomerPhone> selectAllCustomerPhone() {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerPhoneDAO.selectAllCustomerPhone");
	}

	@Override
	public int insertCustomerPhone(UserCustomerPhone userCustomerPhone) {
		return sqlSessionTemplateUser.insert("com.gjp.dao.CustomerPhoneDAO.insertCustomerPhone", userCustomerPhone);
	}

	@Override
	public int updateCustomerPhone(UserCustomerPhone userCustomerPhone) {
		return sqlSessionTemplateUser.update("com.gjp.dao.CustomerPhoneDAO.updateCustomerPhone", userCustomerPhone);
	}

	@Override
	public UserCustomerPhone selectCustomerPhoneUrgent(UserCustomerPhone userCustomerPhone) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerPhoneDAO.selectCustomerPhoneUrgent",userCustomerPhone);
	}

	@Override
	public List<UserCustomerPhone> selectCustomerPhoneB(UserCustomerPhone userCustomerPhone) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerPhoneDAO.selectCustomerPhoneB",userCustomerPhone);
	}

	@Override
	public List<UserCustomerPhone> selectCustomerPhoneAndccId(UserCustomerPhone userCustomerPhone) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerPhoneDAO.selectCustomerPhoneAndccId",userCustomerPhone);
	}

	@Override
	public int deleteCustomerPhone(UserCustomerPhone userCustomerPhone) {
		return sqlSessionTemplateUser.delete("com.gjp.dao.CustomerPhoneDAO.deleteCustomerPhone", userCustomerPhone);
	}

	@Override
	public List<UserCustomerPhone> queryPhoneByCustomerId(UserCustomerPhone userCustomerPhone) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerPhoneDAO.queryPhoneByCustomerId", userCustomerPhone);
	}
	
}
