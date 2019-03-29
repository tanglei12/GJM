package com.gjp.service;

import com.gjp.dao.UserCenterSeparateDao;
import com.gjp.model.UserCenterSeparate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 测评人service
 * @author zoe
 *
 */
@Service
public class UserCenterSeparateService {
	
	@Resource
	private UserCenterSeparateDao userCenterSeparateDao;

	/**
	 * 查询分成人员list
	 * @param ep_id
	 * @return
	 */
	public List<UserCenterSeparate> selectSeparate(
			String ep_id) {
		return userCenterSeparateDao.selectSeparate(ep_id);
	}

	/**
	 * 添加分成结算
	 * @param userCenterSeparate
	 * @return
	 */
	public int addSeparate(UserCenterSeparate userCenterSeparate) {
		return userCenterSeparateDao.addSeparate(userCenterSeparate);
	}

	/**
	 * 修改打款状态
	 * @param userCenterSeparate
	 * @return
	 */
	public int updateState(UserCenterSeparate userCenterSeparate) {
		return userCenterSeparateDao.updateState(userCenterSeparate);
	}

	
}
