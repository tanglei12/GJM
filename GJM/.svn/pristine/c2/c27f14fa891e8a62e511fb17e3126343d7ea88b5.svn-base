package com.gjp.service;

import com.gjp.dao.UserCenterUserFractionDAO;
import com.gjp.model.UserCenterFraction;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2015年12月10日 下午5:35:22 
 */
@Service
public class UserCenterUserFractionService {

	@Resource
	private UserCenterUserFractionDAO userCenterUserFractionDAO;
	
	/**
	 * 插入评价分数
	 * 
	 * @param userCenterUserFraction
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer addUserCenterUserFraction(UserCenterFraction userCenterUserFraction){
		return userCenterUserFractionDAO.addUserCenterUserFraction(userCenterUserFraction);
	}
	
	/**
	 * 查询评价分数
	 * 
	 * @param userCenterUserFraction
	 * @return
	 *
	 * @author 陈智颖
	 */
	public UserCenterFraction selectUserCenterUserFractiony(UserCenterFraction userCenterUserFraction){
		return userCenterUserFractionDAO.selectUserCenterUserFractiony(userCenterUserFraction);
	}
}
