package com.gjp.service;

import com.gjp.dao.HouseSeeingDao;
import com.gjp.model.HouseSeeing;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
* 房屋带看
* 
* @author	王孝元 
* @version 创建时间：2017年4月5日 下午5:06:47
* 
*/
@Service
public class HouseSeeingService {
	
	@Resource
	private HouseSeeingDao houseSeeingDao;
	
	/**
	 * 添加带看信息
	 * 
	 * @param houseSeeing
	 * @return
	 * @author 王孝元
	 */
	public int addHouseSeeing(HouseSeeing houseSeeing){
		return houseSeeingDao.addHouseSeeing(houseSeeing);
	}

	/**
	 * 删除带看信息
	 * 
	 * @param hs_id
	 * @return
	 * @author 王孝元
	 */
	public int deleteHouseSeeingById(Integer hs_id){
		return houseSeeingDao.deleteHouseSeeingById(hs_id);
	}

	/**
	 * 更新带看信息
	 * 
	 * @param houseSeeing
	 * @return
	 * @author 王孝元
	 */
	public int updateHouseSeeing(HouseSeeing houseSeeing){
		return houseSeeingDao.updateHouseSeeing(houseSeeing);
	}

	/**
	 * 查询带看信息
	 * 
	 * @param houseSeeing
	 * @return
	 * @author 王孝元
	 */
	public List<HouseSeeing> queryHouseSeeingList(HouseSeeing houseSeeing){
		return houseSeeingDao.queryHouseSeeingList(houseSeeing);
	}
}
