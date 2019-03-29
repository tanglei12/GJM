package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HouseSeeingDao;
import com.gjp.model.HouseSeeing;
import com.gjp.model.RentHouseVo;
import com.gjp.model.RentLookAtHouseVo;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 房屋带看
 * 
 * @author 王孝元
 * @version 创建时间：2017年4月2日 上午11:18:26
 * 
 */
@Repository
public class HouseSeeingDaoImpl extends BaseDAO implements HouseSeeingDao {

	@Override
	public int addHouseSeeing(HouseSeeing houseSeeing) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseSeeingDao.addHouseSeeing", houseSeeing);
	}

	@Override
	public int deleteHouseSeeingById(Integer hs_id) {
		return super.sqlSessionTemplateProduct.delete("com.gjp.dao.HouseSeeingDao.deleteHouseSeeingById", hs_id);
	}

	@Override
	public int updateHouseSeeing(HouseSeeing houseSeeing) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.HouseSeeingDao.updateHouseSeeing", houseSeeing);
	}

	@Override
	public List<HouseSeeing> queryHouseSeeingList(HouseSeeing houseSeeing) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseSeeingDao.queryHouseSeeingList",
				houseSeeing);
	}

	@Override
	public int addLookHouse(RentLookAtHouseVo rentLookAtHouseVo) {
		return sqlSessionTemplateProduct.insert("com.gjp.dao.HouseSeeingDao.addLookHouse", rentLookAtHouseVo);
	}

	@Override
	public RentHouseVo queryHouseInfoByCode(RentHouseVo rentHouseVo) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseSeeingDao.queryHouseInfoByCode", rentHouseVo);
	}

}
