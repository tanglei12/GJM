package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.UserCenterTaskMessageDAO;
import com.gjp.model.UserCenterTaskMessage;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年9月6日 上午11:59:22 
 */
@Repository
public class UserCenterTaskMessageDAOImpl extends BaseDAO implements UserCenterTaskMessageDAO{

	@Override
	public Integer insertTaskMessage(UserCenterTaskMessage userCenterTaskMessage) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.UserCenterTaskMessageDAO.insertTaskMessage",userCenterTaskMessage);
	}

	@Override
	public Integer updatetTaskMessage(UserCenterTaskMessage userCenterTaskMessage) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.UserCenterTaskMessageDAO.updatetTaskMessage",userCenterTaskMessage);
	}

	@Override
	public List<UserCenterTaskMessage> selectTaskMessageEM(UserCenterTaskMessage userCenterTaskMessage) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterTaskMessageDAO.selectTaskMessageEM",userCenterTaskMessage);
	}

	@Override
	public Integer updatetTaskMessageState(UserCenterTaskMessage userCenterTaskMessage) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.UserCenterTaskMessageDAO.updatetTaskMessageState",userCenterTaskMessage);
	}

	@Override
	public Integer deleteTaskMessagePid(UserCenterTaskMessage userCenterTaskMessage) {
		return super.sqlSessionTemplateUser.delete("com.gjp.dao.UserCenterTaskMessageDAO.deleteTaskMessagePid",userCenterTaskMessage);
	}

	@Override
	public UserCenterTaskMessage selectTaskMessageID(UserCenterTaskMessage userCenterTaskMessage) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterTaskMessageDAO.selectTaskMessageID",userCenterTaskMessage);
	}

	@Override
	public List<UserCenterTaskMessage> selectTaskMessagePid(UserCenterTaskMessage userCenterTaskMessage) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterTaskMessageDAO.selectTaskMessagePid",userCenterTaskMessage);
	}

	@Override
	public UserCenterTaskMessage selectTaskMessageUser(UserCenterTaskMessage userCenterTaskMessage) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterTaskMessageDAO.selectTaskMessageUser",userCenterTaskMessage);
	}

	@Override
	public List<UserCenterTaskMessage> selectTaskMessageUserHttp(UserCenterTaskMessage userCenterTaskMessage) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterTaskMessageDAO.selectTaskMessageUserHttp",userCenterTaskMessage);
	}

	@Override
	public List<UserCenterTaskMessage> selectTaskMessageUnfinished(UserCenterTaskMessage userCenterTaskMessage) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterTaskMessageDAO.selectTaskMessageUnfinished",userCenterTaskMessage);
	}

	@Override
	public Integer updatetTaskMessageText(UserCenterTaskMessage userCenterTaskMessage) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.UserCenterTaskMessageDAO.updatetTaskMessageText",userCenterTaskMessage);
	}

}
