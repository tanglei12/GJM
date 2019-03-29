package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.UserCenterComplaintsRecordDao;
import com.gjp.model.UserCenterComplaintsRecord;
import com.gjp.model.UserCenterComplaintsResult;
import com.gjp.model.ViewUserComplaintsResultVo;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class UserCenterComplaintsRecordDaoImpl extends BaseDAO implements UserCenterComplaintsRecordDao{

	@Override
	public PageModel<UserCenterComplaintsRecord> selectUserCenterComplaintsRecord(int pageNo, int pageSize, HouseModel houseModel) {
		PageModel<UserCenterComplaintsRecord> pageModel = new PageModel<UserCenterComplaintsRecord>();
		// 分页设置开始点
		pageModel.setPageNo((pageNo - 1) * pageSize);
		// 分页设置查询条数
		pageModel.setPageSize(pageSize);
		// 分页设置查询条件
		pageModel.setHouseModel(houseModel);
		List<UserCenterComplaintsRecord> UserComplaintsRecord = sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterComplaintsRecordDao.selectUserCenterComplaintsRecord", pageModel);
		pageModel.setList(UserComplaintsRecord);
		List<UserCenterComplaintsRecord> uR = sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterComplaintsRecordDao.queryTotalComplaintsRecord", pageModel);
		pageModel.setTotalRecords(uR.size());
		return pageModel;
	}

	@Override
	public UserCenterComplaintsRecord queryComplaintsRecordObject(UserCenterComplaintsRecord userCenterComplaintsRecord) {
		return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterComplaintsRecordDao.queryComplaintsRecordObject", userCenterComplaintsRecord);
	}

	@Override
	public PageModel<ViewUserComplaintsResultVo> queryComplaintsResultObject(ViewUserComplaintsResultVo viewUserComplaintsResultVo) {
		PageModel<ViewUserComplaintsResultVo> pageModel = new PageModel<ViewUserComplaintsResultVo>();
		List<ViewUserComplaintsResultVo> result=sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterComplaintsRecordDao.queryComplaintsResultObject", viewUserComplaintsResultVo);
		pageModel.setList(result);
		return pageModel;
	}

	@Override
	public int addComplaintsResult(UserCenterComplaintsResult userCenterComplaintsResult) {
		return sqlSessionTemplateUser.insert("com.gjp.dao.UserCenterComplaintsRecordDao.addComplaintsResult", userCenterComplaintsResult);
	}

	@Override
	public int updateComplaintsRecord(UserCenterComplaintsRecord userCenterComplaintsRecord) {
		return sqlSessionTemplateUser.insert("com.gjp.dao.UserCenterComplaintsRecordDao.updateComplaintsRecord", userCenterComplaintsRecord);
	}

}
