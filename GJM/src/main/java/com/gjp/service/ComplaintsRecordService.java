package com.gjp.service;

import com.gjp.dao.UserCenterComplaintsRecordDao;
import com.gjp.model.UserCenterComplaintsRecord;
import com.gjp.model.UserCenterComplaintsResult;
import com.gjp.model.ViewUserComplaintsResultVo;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class ComplaintsRecordService {
	@Resource
	private UserCenterComplaintsRecordDao userCenterComplaintsRecordDao;
	
	/**
	 *投诉建议表 
	 * @author tanglei
	 */
	public PageModel<UserCenterComplaintsRecord> selectUserCenterComplaintsRecord(int pageNo, int pageSize, HouseModel houseModel) {
		return userCenterComplaintsRecordDao.selectUserCenterComplaintsRecord(pageNo, pageSize, houseModel);
	}
	
	/**
	 * 投诉建议内容
	 * @author tanglei
	 */
	public UserCenterComplaintsRecord queryComplaintsRecordObject (UserCenterComplaintsRecord cserCenterComplaintsRecord) {
		return userCenterComplaintsRecordDao.queryComplaintsRecordObject(cserCenterComplaintsRecord);
	}
	
	/**
	 * 处理结果
	 * @author tanglei
	 */
	public PageModel<ViewUserComplaintsResultVo> queryComplaintsReulstObject (ViewUserComplaintsResultVo viewUserComplaintsResultVo) {
		return userCenterComplaintsRecordDao.queryComplaintsResultObject(viewUserComplaintsResultVo);
	}
	
	/**
	 * 回复处理结果
	 * @author tanglei
	 */
	public boolean addComplaintsResult(UserCenterComplaintsResult userCenterComplaintsResult){
		return userCenterComplaintsRecordDao.addComplaintsResult(userCenterComplaintsResult) > 0;
	}
	
	/**
	 * 处理完毕
	 * @author tanglei
	 */
	public boolean updateComplaintsRecord (UserCenterComplaintsRecord userCenterComplaintsRecord) {
		return userCenterComplaintsRecordDao.updateComplaintsRecord(userCenterComplaintsRecord) >0;
	}
}
