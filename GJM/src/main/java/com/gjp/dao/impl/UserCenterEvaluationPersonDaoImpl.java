package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.UserCenterEvaluationPersonDao;
import com.gjp.model.UserCenterEvaluationContent;
import com.gjp.model.UserCenterEvaluationPerson;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 测评人ImplDao
 * 
 * @author zoe
 *
 */
@Repository
public class UserCenterEvaluationPersonDaoImpl extends BaseDAO implements UserCenterEvaluationPersonDao {

	@Override
	public PageModel<UserCenterEvaluationPerson> selectEvaluationPerson(int pageNo, int pageSize, HouseModel house) {
		PageModel<UserCenterEvaluationPerson> pageModel = new PageModel<UserCenterEvaluationPerson>();
		// 分页设置开始点
		pageModel.setPageNo((pageNo - 1) * pageSize);
		// 分页设置查询条数
		pageModel.setPageSize(pageSize);
		pageModel.setHouseModel(house);
		// 分页查询房屋基本信息集合
		List<UserCenterEvaluationPerson> userCenterEvaluationPersonList = super.sqlSessionTemplateUser
				.selectList("com.gjp.dao.UserCenterEvaluationPersonDao.selectEvaluationPerson", pageModel);
		// 查询房屋总记录数
		int totalRecords = super.sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterEvaluationPersonDao.selectTotalEvaluationPerson", pageModel);
		pageModel.setList(userCenterEvaluationPersonList);
		pageModel.setTotalRecords(totalRecords);
		return pageModel;
	}

	@Override
	public UserCenterEvaluationPerson selectEvaluationPersonById(int ep_id) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterEvaluationPersonDao.selectEvaluationPersonById", ep_id);
	}

	@Override
	public List<UserCenterEvaluationContent> selectEvaluationContent(int ep_id) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEvaluationPersonDao.selectEvaluationContent", ep_id);
	}

	@Override
	public int updateState(UserCenterEvaluationPerson userCenterEvaluationPerson) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.UserCenterEvaluationPersonDao.updateState", userCenterEvaluationPerson);
	}

	@Override
	public List<UserCenterEvaluationPerson> selectEjz(HouseModel houseModel) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEvaluationPersonDao.selectEjz", houseModel);
	}

}
