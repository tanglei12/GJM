package com.gjp.dao;

import com.gjp.model.Advertisement;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;

/**
 * 广告列表
 * @author tanglei
 * date 2017年7月7日 下午5:55:40
 */
public interface AdvertisementDAO {
	
	/**
	 * 列表
	 * @author tanglei
	 * date 2017年7月7日 下午6:05:40
	 */
	PageModel<Advertisement> selectAdvertisement (int pageNo, int pageSize, HouseModel houseModel);
	
	/**
	 * 添加
	 * @author tanglei
	 * date 2017年7月8日 下午14:05:40
	 */
	int addAdvertisement(Advertisement advertisement);
	
	/**
	 * 查询单条数据
	 * @author tanglei
	 * date 2017年7月8日 下午17:05:40
	 */
	Advertisement selectOneAdvertisement (Advertisement advertisement);
	
	/**
	 * 修改
	 * @author tanglei
	 * date 2017年7月9日 上午9:32:40
	 */
	int updateAdvertisement(Advertisement advertisement);
	
	/**
	 * 判断数量
	 * @author tanglei
	 * date 2017年7月9日 下午16:42:40
	 */
	int countAdvertisement (Advertisement advertisement);

}
