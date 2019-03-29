package com.gjp.service;

import com.gjp.dao.MessageModelDAO;
import com.gjp.model.UserCenterMessageModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年8月15日 下午5:58:06 
 */
@Service
public class MessageModelService {

	@Resource
	private MessageModelDAO messageModelDAO;
	
	/**
	 * 插入短信模板
	 * 
	 * @param userCenterMessageModel
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer insertMessageModel(UserCenterMessageModel userCenterMessageModel){
		return messageModelDAO.insertMessageModel(userCenterMessageModel);
	}
	
	/**
	 * 修改短信模板
	 * 
	 * @param userCenterMessageContent
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer updateMessageModel(UserCenterMessageModel userCenterMessageContent){
		return messageModelDAO.updateMessageModel(userCenterMessageContent);
	}
	
	/**
	 * 根据短信模板编码短信模板
	 * 
	 * @param userCenterMessageContent
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<UserCenterMessageModel> selectMessageModel(UserCenterMessageModel userCenterMessageContent){
		return messageModelDAO.selectMessageModel(userCenterMessageContent);
	}
}
