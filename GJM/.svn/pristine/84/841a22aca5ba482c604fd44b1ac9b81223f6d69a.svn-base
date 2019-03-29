package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.MessageDAO;
import com.gjp.model.UserCenterMessage;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年8月19日 下午4:04:08 
 */
@Repository
public class MessageDAOImpl extends BaseDAO implements MessageDAO{

	@Override
	public Integer insertMessage(UserCenterMessage userCenterMessage) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.MessageDAO.insertMessage",userCenterMessage);
	}

	@Override
	public Integer updateMessage(UserCenterMessage userCenterMessage) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.MessageDAO.updateMessage",userCenterMessage);
	}

	@Override
	public List<UserCenterMessage> selectMessage(UserCenterMessage userCenterMessage) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.MessageDAO.selectMessage",userCenterMessage);
	}

}
