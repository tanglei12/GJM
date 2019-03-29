package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HolidayDateDAO;
import com.gjp.model.UserCenterHolidayDate;
import org.springframework.stereotype.Repository;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年9月2日 下午3:13:09 
 */
@Repository
public class HolidayDateDAOImpl extends BaseDAO implements HolidayDateDAO{

	@Override
	public Integer insertHolidayDate(UserCenterHolidayDate userCenterHolidayDate) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.HolidayDateDAO.insertHolidayDate",userCenterHolidayDate);
	}

	@Override
	public UserCenterHolidayDate selectHolidayDate(UserCenterHolidayDate userCenterHolidayDate) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.HolidayDateDAO.selectHolidayDate",userCenterHolidayDate);
	}

}
