package com.gjp.service;

import com.gjp.dao.MessageDAO;
import com.gjp.model.UserCenterMessage;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年8月19日 下午4:06:00 
 */
@Service
public class MessageService {

	@Resource
	private MessageDAO messageDAO;
	
	/**
	 * 插入短信内容
	 * 
	 * @param userCenterMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer insertMessage(UserCenterMessage userCenterMessage){
		return messageDAO.insertMessage(userCenterMessage);
	}
	
	/**
	 * 修改短信内容
	 * 
	 * @param userCenterMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer updateMessage(UserCenterMessage userCenterMessage){
		return messageDAO.updateMessage(userCenterMessage);
	}
	
	/**
	 * 查询短信内容
	 * 
	 * @param userCenterMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<UserCenterMessage> selectMessage(UserCenterMessage userCenterMessage){
		return messageDAO.selectMessage(userCenterMessage);
	}
}
