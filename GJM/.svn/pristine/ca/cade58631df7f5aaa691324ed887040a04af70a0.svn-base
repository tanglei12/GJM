package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.UserCenterInformationDao;
import com.gjp.model.ContractBillVo;
import com.gjp.model.UserCenterInformation;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserCenterInformationDaoImpl extends BaseDAO implements UserCenterInformationDao {

	@Override
	public int addUserCenterInformation(UserCenterInformation userCenterInformation) {
		return sqlSessionTemplateUser.insert("com.gjp.dao.UserCenterInformationDao.addUserCenterInformation", userCenterInformation);
	}

	@Override
	public List<UserCenterInformation> queryUserInformationByCode(Pagination<UserCenterInformation> pagination) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterInformationDao.queryUserInformationByCode", pagination);
	}

	@Override
	public int queryUserInformationByCodeCount(Pagination<UserCenterInformation> pagination) {
		return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterInformationDao.queryUserInformationByCodeCount", pagination);
	}

	@Override
	public List<ContractBillVo> queryPressPayentBillList(int days) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterInformationDao.queryPressPayentBillList", days);
	}

	@Override
	public List<UserCenterInformation> queryUserInformation (UserCenterInformation userCenterInformation) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterInformationDao.queryUserInformation", userCenterInformation);
	}

}
