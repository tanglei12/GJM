package com.gjp.service;

import com.gjp.dao.ChatMeaageDAO;
import com.gjp.model.ChatMeaage;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年1月8日 上午10:30:30 
 */
@Service
public class ChatMeaageService {

	@Resource
	private ChatMeaageDAO chatMeaageDAO;
	
	/**
	 * 聊天信息插入
	 * 
	 * @param chatMeaage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer insertChatMeaage(ChatMeaage chatMeaage){
		return chatMeaageDAO.insertChatMeaage(chatMeaage);
	}
	
	/**
	 * 聊天信息修改
	 * 
	 * @param chatMeaage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer updatetChatMeaage(ChatMeaage chatMeaage){
		return chatMeaageDAO.updatetChatMeaage(chatMeaage);
	}
	
	/**
	 * 模糊查询离线接受者的聊天信息
	 * 
	 * @param chatMeaage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<ChatMeaage> selectChatMeaage(ChatMeaage chatMeaage){
		return chatMeaageDAO.selectChatMeaage(chatMeaage);
	}
	
	/**
	 * 开始模糊查询离线接受者的聊天信息
	 * 
	 * @param chatMeaage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<ChatMeaage> selectChatMeaageStart(ChatMeaage chatMeaage){
		return chatMeaageDAO.selectChatMeaageStart(chatMeaage);
	}
	
	/**
	 * 查看历史记录
	 * 
	 * @param chatMeaage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<ChatMeaage> selectChatMeaageHistory(ChatMeaage chatMeaage){
		return chatMeaageDAO.selectChatMeaageHistory(chatMeaage);
	}
	
	/**
	 * 查看是否存在更多历史记录
	 * 
	 * @param chatMeaage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public ChatMeaage selectChatMeaageHistoryCount(ChatMeaage chatMeaage){
		return chatMeaageDAO.selectChatMeaageHistoryCount(chatMeaage);
	}
}
