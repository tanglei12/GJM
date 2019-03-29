package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.UserCenterUserFractionDAO;
import com.gjp.model.UserCenterFraction;
import org.springframework.stereotype.Repository;

@Repository
public class UserCenterUserFractionDAOImpl extends BaseDAO implements UserCenterUserFractionDAO{

	@Override
	public Integer addUserCenterUserFraction(
			UserCenterFraction userCenterUserFraction) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.UserCenterUserFractionDAO.addUserCenterUserFraction",userCenterUserFraction);
	}

	@Override
	public UserCenterFraction selectUserCenterUserFractiony(
			UserCenterFraction userCenterUserFraction) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterUserFractionDAO.selectUserCenterUserFractiony",userCenterUserFraction);
	}

}
