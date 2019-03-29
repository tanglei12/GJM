package com.gjp.service;

import com.gjp.dao.UserCenterUserDAO;
import com.gjp.model.UserCenterUserVo;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 用户表
 * @author tanglei 
 * date 2017年7月11日 下午14:58:40
 */
@Service
public class UserCenterUserService {
	@Resource
	private UserCenterUserDAO userCenterUserDAO;
	
	/**
	 * 列表
	 * @author tanglei
	 * date 2017年7月11日 下午15:01:40
	 */
	public PageModel<UserCenterUserVo> selectUserCenterUser (int pageNo, int pageSize, HouseModel houseModel) {
		return userCenterUserDAO.selectUserCenterUser(pageNo, pageSize, houseModel);
	}
	

}
