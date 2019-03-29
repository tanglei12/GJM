package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.UserCenterSeparateDao;
import com.gjp.model.UserCenterSeparate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 房屋品牌ImplDao
 * @author zoe
 *
 */
@Repository
public class UserCenterSeparateDaoImpl extends BaseDAO implements UserCenterSeparateDao {

	@Override
	public List<UserCenterSeparate> selectSeparate(
			String ep_id) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterSeparateDao.selectSeparate",ep_id);
	}

	@Override
	public int addSeparate(UserCenterSeparate userCenterSeparate) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.UserCenterSeparateDao.addSeparate",userCenterSeparate);
	}

	@Override
	public int updateState(UserCenterSeparate userCenterSeparate) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.UserCenterSeparateDao.updateState",userCenterSeparate);
	}

	
}
