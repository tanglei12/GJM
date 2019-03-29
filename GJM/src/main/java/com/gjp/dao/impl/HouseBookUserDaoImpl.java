package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HouseBookUserDao;
import com.gjp.model.HouseBookUserInfo;
import org.springframework.stereotype.Repository;

/**
 * 预约用户信息
 * @author shenhx
 * 2017-03-14
 */
@Repository
public class HouseBookUserDaoImpl extends BaseDAO implements HouseBookUserDao {

	@Override
	public int addHouseBookUserInfo(HouseBookUserInfo houseBookUserInfo) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseBookUserDao.addHouseBookUserInfo", houseBookUserInfo);
	}

}
