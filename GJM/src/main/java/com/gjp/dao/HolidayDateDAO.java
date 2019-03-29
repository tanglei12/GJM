package com.gjp.dao;

import com.gjp.model.UserCenterHolidayDate;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年9月2日 下午3:08:03 
 */
public interface HolidayDateDAO {

	/**
	 * 插入假期
	 * 
	 * @param userCenterHolidayDate
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer insertHolidayDate(UserCenterHolidayDate userCenterHolidayDate);
	
	/**
	 * 根据日期查询是否假日
	 * 
	 * @param userCenterHolidayDate
	 * @return
	 *
	 * @author 陈智颖
	 */
	UserCenterHolidayDate selectHolidayDate(UserCenterHolidayDate userCenterHolidayDate);
}
