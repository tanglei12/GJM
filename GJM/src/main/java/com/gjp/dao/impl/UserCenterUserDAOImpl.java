package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.UserCenterUserDAO;
import com.gjp.model.UserCenterUserVo;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Repository;

import java.util.List;
/**
 * 用户表
 * @author tanglei 
 * date 2017年7月11日 下午14:58:40
 */
@Repository
public class UserCenterUserDAOImpl extends BaseDAO implements UserCenterUserDAO{

	@Override
	public PageModel<UserCenterUserVo> selectUserCenterUser(int pageNo, int pageSize, HouseModel houseModel) {
		PageModel<UserCenterUserVo> pageModel = new PageModel<UserCenterUserVo>();
		// 分页设置开始点
		pageModel.setPageNo((pageNo - 1) * pageSize);
		// 分页设置查询条数
		pageModel.setPageSize(pageSize);
		// 分页设置查询条件
		pageModel.setHouseModel(houseModel);
		List<UserCenterUserVo> user = sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterUserDAO.selectUserCenterUser", pageModel);
		pageModel.setList(user);
		List<UserCenterUserVo> userTotal = sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterUserDAO.totalSelectUserCenterUser", pageModel);
		pageModel.setTotalRecords(userTotal.size());
		return pageModel;
	}

}
