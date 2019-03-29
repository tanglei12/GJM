package com.gjp.service;

import com.gjp.dao.HolidayDateDAO;
import com.gjp.model.UserCenterHolidayDate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年9月2日 下午3:14:13 
 */
@Service
public class HolidayDateService {

	@Resource
	private HolidayDateDAO holidayDateDAO;
	
	/**
	 * 插入假期
	 * 
	 * @param userCenterHolidayDate
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer insertHolidayDate(UserCenterHolidayDate userCenterHolidayDate){
		return holidayDateDAO.insertHolidayDate(userCenterHolidayDate);
	}
	
	/**
	 * 根据日期查询是否假日
	 * 
	 * @param userCenterHolidayDate
	 * @return
	 *
	 * @author 陈智颖
	 */
	public UserCenterHolidayDate selectHolidayDate(UserCenterHolidayDate userCenterHolidayDate){
		return holidayDateDAO.selectHolidayDate(userCenterHolidayDate);
	}
}
