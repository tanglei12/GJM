package com.gjp.service;

import com.gjp.dao.HouseBookUserDao;
import com.gjp.model.HouseBookUserInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 预约用户信息Service
 * @author shenhx
 * 2017-03-14
 */
@Service
public class HouseBookUserService {

	@Resource
	private HouseBookUserDao houseBookUserDao;
	
	public int addHouseBookUserInfo(HouseBookUserInfo houseBookUserInfo){
		return houseBookUserDao.addHouseBookUserInfo(houseBookUserInfo);
	}
}
