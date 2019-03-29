package com.gjp.dao;

import com.gjp.model.UserCenterSeparate;

import java.util.List;


/**
 * 测评人
 * @author zoe
 *
 */
public interface UserCenterSeparateDao {

	/**
	 * 查询分成人员list
	 * @param ep_id
	 * @return
	 */
	List<UserCenterSeparate> selectSeparate(
			String ep_id);

	/**
	 * 添加分成结算
	 * @param userCenterSeparate
	 * @return
	 */
	int addSeparate(UserCenterSeparate userCenterSeparate);

	/**
	 * 修改打款状态
	 * @param userCenterSeparate
	 * @return
	 */
	int updateState(UserCenterSeparate userCenterSeparate);

	
}
