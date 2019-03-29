package com.gjp.dao;

import com.gjp.model.UserCenterComplaintsRecord;
import com.gjp.model.UserCenterComplaintsResult;
import com.gjp.model.ViewUserComplaintsResultVo;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;

/**
 * 用户投诉建议Dao
 * @author tanglei
 *
 */
public interface UserCenterComplaintsRecordDao {
	
	/**
	 * 投诉建议列表
	 * @author tanglei
	 */
	PageModel<UserCenterComplaintsRecord> selectUserCenterComplaintsRecord(int pageNo, int pageSize, HouseModel houseModel);
	
	/**
	 * 投诉建议内容
	 * @author tanglei
	 */
	UserCenterComplaintsRecord queryComplaintsRecordObject(UserCenterComplaintsRecord userCenterComplaintsRecord);
	
	/**
	 * 处理结果
	 * @author tanglei
	 */
	PageModel<ViewUserComplaintsResultVo> queryComplaintsResultObject(ViewUserComplaintsResultVo viewUserComplaintsResultVo);
	
	/**
	 * @author tanglei
	 */
	int addComplaintsResult(UserCenterComplaintsResult userCenterComplaintsResult);
	
	/**
	 * 处理完毕
	 * @author tanglei
	 *
	 */
	int updateComplaintsRecord (UserCenterComplaintsRecord userCenterComplaintsRecord);

}
