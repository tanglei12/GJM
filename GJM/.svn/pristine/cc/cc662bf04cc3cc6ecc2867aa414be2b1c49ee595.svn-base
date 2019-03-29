package com.gjp.service;

import com.gjp.dao.HousePartnerPublishDao;
import com.gjp.model.HousePartnerPublish;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 房源不同发布到第三方
 * @author shenhx
 *
 */
@Service
public class HousePartnerPublishService {

	private @Resource HousePartnerPublishDao housePartnerPublishDao;
	
	public int addHousePartnerPublish(HousePartnerPublish housePartnerPublish) {
		return housePartnerPublishDao.addHousePartnerPublish(housePartnerPublish);
	}

	public int updHousePartnerPublish(HousePartnerPublish housePartnerPublish) {
		return housePartnerPublishDao.updHousePartnerPublish(housePartnerPublish);
	}
	
	public List<HousePartnerPublish> queryHousePartnerPublishList(HousePartnerPublish housePartnerPublish) {
		return housePartnerPublishDao.queryHousePartnerPublishList(housePartnerPublish);
	}
	
	/**
	 * 根据房源编号查询第三方发布信息
	 * @param hi_code
	 * @return
	 */
	public HousePartnerPublish queryHousePartnerPublishByHiCode(String hi_code){
		return housePartnerPublishDao.queryHousePartnerPublishByHiCode(hi_code);
	}
}
