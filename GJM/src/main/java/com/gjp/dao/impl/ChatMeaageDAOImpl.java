package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.ChatMeaageDAO;
import com.gjp.model.ChatMeaage;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年1月8日 上午10:26:25 
 */
@Repository
public class ChatMeaageDAOImpl extends BaseDAO implements ChatMeaageDAO{

	@Override
	public Integer insertChatMeaage(ChatMeaage chatMeaage) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.ChatMeaageDAO.insertChatMeaage", chatMeaage);
	}

	@Override
	public Integer updatetChatMeaage(ChatMeaage chatMeaage) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.ChatMeaageDAO.updatetChatMeaage", chatMeaage);
	}

	@Override
	public List<ChatMeaage> selectChatMeaage(ChatMeaage chatMeaage) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.ChatMeaageDAO.selectChatMeaage", chatMeaage);
	}

	@Override
	public List<ChatMeaage> selectChatMeaageHistory(ChatMeaage chatMeaage) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.ChatMeaageDAO.selectChatMeaageHistory", chatMeaage);
	}

	@Override
	public ChatMeaage selectChatMeaageHistoryCount(ChatMeaage chatMeaage) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.ChatMeaageDAO.selectChatMeaageHistoryCount", chatMeaage);
	}

	@Override
	public List<ChatMeaage> selectChatMeaageStart(ChatMeaage chatMeaage) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.ChatMeaageDAO.selectChatMeaageStart", chatMeaage);
	}
	
}
