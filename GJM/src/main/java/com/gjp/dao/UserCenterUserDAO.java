package com.gjp.dao;

import com.gjp.model.UserCenterUserVo;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;

/**
 * 用户表
 * @author tanglei 
 * date 2017年7月11日 下午14:58:40
 */
public interface UserCenterUserDAO {
	
	/**
	 * 列表
	 * @author tanglei
	 * date 2017年7月11日 下午15:01:40
	 */
	public PageModel<UserCenterUserVo> selectUserCenterUser (int pageNo, int pageSize, HouseModel houseModel);

}
