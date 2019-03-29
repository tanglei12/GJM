package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HousePartnerPublishDao;
import com.gjp.model.HousePartnerPublish;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 房源同步发布第三方
 * @author shenhx	
 * 2017-04-14
 *
 */
@Repository
public class HousePartnerPublishDaoImpl extends BaseDAO implements HousePartnerPublishDao {

	@Override
	public int addHousePartnerPublish(HousePartnerPublish housePartnerPublish) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HousePartnerPublishDao.addHousePartnerPublish", housePartnerPublish);
	}

	@Override
	public int updHousePartnerPublish(HousePartnerPublish housePartnerPublish) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.HousePartnerPublishDao.updHousePartnerPublish", housePartnerPublish);
	}

	@Override
	public List<HousePartnerPublish> queryHousePartnerPublishList(HousePartnerPublish housePartnerPublish) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HousePartnerPublishDao.queryHousePartnerPublishList", housePartnerPublish);
	}

	@Override
	public HousePartnerPublish queryHousePartnerPublishByHiCode(String hi_code) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousePartnerPublishDao.queryHousePartnerPublishByHiCode", hi_code);
	}

}
