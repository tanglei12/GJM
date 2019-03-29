package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.UserMessageContentDAO;
import com.gjp.model.UserMessageContent;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2015年12月20日 下午5:04:29 
 */
@Repository
public class UserMessageContentDAOImpl extends BaseDAO implements UserMessageContentDAO{

	@Override
	public Integer addUserMessageContent(UserMessageContent userMessageContent) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.UserMessageContentDAO.addUserMessageContent", userMessageContent);
	}

	@Override
	public List<UserMessageContent> selectUserMessageContent(UserMessageContent userMessageContent) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserMessageContentDAO.selectUserMessageContent", userMessageContent);
	}

}
