package com.gjp.service;

import com.gjp.dao.UserMessageContentDAO;
import com.gjp.model.UserMessageContent;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserMessageContentService {

	@Resource
	private UserMessageContentDAO userMessageContentDAO;
	
	/**
	 * 插入消息提醒
	 * 
	 * @param userMessageContent
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer addUserMessageContent(UserMessageContent userMessageContent){
		return userMessageContentDAO.addUserMessageContent(userMessageContent);
	}
	
	/**
	 * 根据用户ID查询消息提醒
	 * 
	 * @param userMessageContent
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<UserMessageContent> selectUserMessageContent(UserMessageContent userMessageContent){
		return userMessageContentDAO.selectUserMessageContent(userMessageContent);
	}
}
