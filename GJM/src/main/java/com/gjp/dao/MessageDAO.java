package com.gjp.dao;

import com.gjp.model.UserCenterMessage;

import java.util.List;


/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年8月19日 下午3:59:24 
 */
public interface MessageDAO {

	/**
	 * 插入短信内容
	 * 
	 * @param userCenterMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer insertMessage(UserCenterMessage userCenterMessage);
	
	/**
	 * 修改短信内容
	 * 
	 * @param userCenterMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updateMessage(UserCenterMessage userCenterMessage);
	
	/**
	 * 查询短信内容
	 * 
	 * @param userCenterMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<UserCenterMessage> selectMessage(UserCenterMessage userCenterMessage);
}
