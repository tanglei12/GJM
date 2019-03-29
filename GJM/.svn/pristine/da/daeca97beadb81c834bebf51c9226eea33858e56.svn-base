package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.MessageModelDAO;
import com.gjp.model.UserCenterMessageModel;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年8月15日 下午5:53:18 
 */
@Repository
public class MessageModelDAOImpl extends BaseDAO implements MessageModelDAO{

	@Override
	public Integer insertMessageModel(UserCenterMessageModel userCenterMessageModel) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.MessageModelDAO.insertMessageModel",userCenterMessageModel);
	}

	@Override
	public List<UserCenterMessageModel> selectMessageModel(UserCenterMessageModel userCenterMessageModel) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.MessageModelDAO.selectMessageModel",userCenterMessageModel);
	}

	@Override
	public Integer updateMessageModel(UserCenterMessageModel userCenterMessageModel) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.MessageModelDAO.updateMessageModel",userCenterMessageModel);
	}

}
