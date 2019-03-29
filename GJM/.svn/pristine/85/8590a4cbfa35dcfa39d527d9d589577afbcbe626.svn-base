package com.gjp.dao;

import com.gjp.model.HouseSeeing;
import com.gjp.model.RentHouseVo;
import com.gjp.model.RentLookAtHouseVo;

import java.util.List;

/**
 * 房屋带看
 * 
 * @author 王孝元
 * @version 创建时间：2017年4月2日 上午11:13:14
 * 
 */
public interface HouseSeeingDao {
	/**
	 * 添加带看信息
	 * 
	 * @param houseSeeing
	 * @return
	 * @author 王孝元
	 */
	int addHouseSeeing(HouseSeeing houseSeeing);

	/**
	 * 删除带看信息
	 * 
	 * @param hs_id
	 * @return
	 * @author 王孝元
	 */
	int deleteHouseSeeingById(Integer hs_id);

	/**
	 * 更新带看信息
	 * 
	 * @param houseSeeing
	 * @return
	 * @author 王孝元
	 */
	int updateHouseSeeing(HouseSeeing houseSeeing);

	/**
	 * 查询带看信息
	 * 
	 * @param houseSeeing
	 * @return
	 * @author 王孝元
	 */
	List<HouseSeeing> queryHouseSeeingList(HouseSeeing houseSeeing);

	/**
	 * 添加支付宝预约看房信息
	 * @param rentLookAtHouseVo
	 * @return
	 */
	int addLookHouse(RentLookAtHouseVo rentLookAtHouseVo);

	/**
	 * 查询房屋信息，发送短信
	 * @param rentHouseVo
	 * @return
	 */
	RentHouseVo queryHouseInfoByCode(RentHouseVo rentHouseVo);
}
