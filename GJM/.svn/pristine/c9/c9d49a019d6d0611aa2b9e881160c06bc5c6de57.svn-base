package com.gjp.service;

import com.gjp.dao.AdvertisementDAO;
import com.gjp.model.Advertisement;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 广告列表
 * @author tanglei
 * date 2017年7月7日 下午5:55:40
 */
@Service
public class AdvertisementService {

	@Resource
	private AdvertisementDAO advertisementDAO;
	
	/**
	 * 列表
	 * @author tanglei
	 * date 2017年7月7日 下午6:05:40
	 */
	public PageModel<Advertisement> selectAdvertisement (int pageNo, int pageSize, HouseModel houseModel) {
		return advertisementDAO.selectAdvertisement(pageNo, pageSize, houseModel);
	}
	
	/**
	 * 添加
	 * @author tanglei
	 * date 2017年7月8日 下午14:05:40
	 */
	public boolean addAdvertisement (Advertisement advertisement) {
		return advertisementDAO.addAdvertisement(advertisement) > 0;
	}
	
	/**
	 * 查询单条数据
	 * @author tanglei
	 * date 2017年7月8日 下午17:05:40
	 */
	public Advertisement selectOneAdvertisement (Advertisement advertisement) {
		return advertisementDAO.selectOneAdvertisement(advertisement);
	}
	
	/**
	 * 修改
	 * @author tanglei
	 * date 2017年7月9日 上午9:32:40
	 */
	public boolean updateAdvertisement (Advertisement advertisement) {
		return advertisementDAO.updateAdvertisement(advertisement) > 0;
	}
	
	/**
	 * 判断数量
	 * @author tanglei
	 * date 2017年7月9日 下午16:42:40
	 */
	public int countAdvertisement (Advertisement advertisement) {
		return advertisementDAO.countAdvertisement(advertisement);
		
	}

}
