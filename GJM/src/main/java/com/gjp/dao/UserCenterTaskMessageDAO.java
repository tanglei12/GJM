package com.gjp.dao;

import com.gjp.model.UserCenterTaskMessage;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年9月6日 上午11:56:24 
 */
public interface UserCenterTaskMessageDAO {

	/**
	 * 插入任务消息
	 * 
	 * @param userCenterTaskMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer insertTaskMessage(UserCenterTaskMessage userCenterTaskMessage);
	
	/**
	 * 修改任务消息类
	 * 
	 * @param userCenterTaskMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updatetTaskMessage(UserCenterTaskMessage userCenterTaskMessage);
	
	/**
	 * 修改任务消息类内容
	 * 
	 * @param userCenterTaskMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updatetTaskMessageText(UserCenterTaskMessage userCenterTaskMessage);
	
	/**
	 * 修改任务执行状态
	 * 
	 * @param userCenterTaskMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updatetTaskMessageState(UserCenterTaskMessage userCenterTaskMessage);
	
	/**
	 * 根据用户编码查询任务消息
	 * 
	 * @param userCenterTaskMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<UserCenterTaskMessage> selectTaskMessageEM(UserCenterTaskMessage userCenterTaskMessage);
	
	/**
	 * 根据用户编码查询任务消息查询未完成任务
	 * 
	 * @param userCenterTaskMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<UserCenterTaskMessage> selectTaskMessageUnfinished(UserCenterTaskMessage userCenterTaskMessage);
	
	/**
	 * 根据用户编码所有子级查询任务消息
	 * 
	 * @param userCenterTaskMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<UserCenterTaskMessage> selectTaskMessagePid(UserCenterTaskMessage userCenterTaskMessage);
	
	/**
	 * 根据父级ID删除任务消息类
	 * 
	 * @param userCenterTaskMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer deleteTaskMessagePid(UserCenterTaskMessage userCenterTaskMessage);
	
	/**
	 * 根据任务消息编码查询任务消息
	 * 
	 * @param userCenterTaskMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	UserCenterTaskMessage selectTaskMessageID(UserCenterTaskMessage userCenterTaskMessage);
	
	/**
	 * 根据任务消息父级编码和用户编码
	 * 
	 * @param userCenterTaskMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	UserCenterTaskMessage selectTaskMessageUser(UserCenterTaskMessage userCenterTaskMessage);
	
	/**
	 * 根据调用地址和内部人员编码查询任务消息
	 * 
	 * @param userCenterTaskMessage
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<UserCenterTaskMessage> selectTaskMessageUserHttp(UserCenterTaskMessage userCenterTaskMessage);
}
