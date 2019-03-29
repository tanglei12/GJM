package com.gjp.dao;

import com.gjp.model.HousePartnerPublish;

import java.util.List;

/**
 * 房源同步发布第三方
 * @author shenhx
 *
 */
public interface HousePartnerPublishDao {

	int addHousePartnerPublish(HousePartnerPublish housePartnerPublish);
	
	int updHousePartnerPublish(HousePartnerPublish housePartnerPublish);
	
	List<HousePartnerPublish> queryHousePartnerPublishList(HousePartnerPublish housePartnerPublish);
	
	HousePartnerPublish queryHousePartnerPublishByHiCode(String hi_code);
}
