package com.gjp.dao;

import com.gjp.model.HouseBookSourceInfo;
import com.gjp.util.Pagination;

import java.util.List;

/**
 * 预约配置来源信息
 * @author shenhx
 *
 */
public interface HouseBookSourceDao {

	/**
	 * 添加预约配置来源信息
	 * @param houseBookSourceInfo
	 * @return
	 */
	int addHouseBookSource(HouseBookSourceInfo houseBookSourceInfo);
	
	/**
	 * 删除预约配置来源信息
	 * @param houseBookSourceInfo
	 * @return
	 */
	int delHouseBookSource(int bs_id);
	
	/**
	 * 分页查询所有预约配置来源信息
	 * @param houseBookConfig
	 * @return
	 */
	Pagination<HouseBookSourceInfo> queryHouseBookSourceForList(Pagination<HouseBookSourceInfo> pagination);
	
	/**
	 * 分页查询所有预约配置来源信息数据条数
	 * @param houseBookConfig
	 * @return
	 */
	int queryHouseBookSourceForCount(Pagination<HouseBookSourceInfo> pagination);
	
	/**
	 * 查询单个来源信息
	 * @param houseBookConfig
	 * @return
	 */
	HouseBookSourceInfo queryHouseBookSourceById(int bs_id);
	
	/**
	 * 修改预约来源信息
	 * @param houseBookConfig
	 * @return
	 */
	int updateHouseBookSource(HouseBookSourceInfo houseBookSourceInfo);
	
	/**
	 * 查询所有source数据
	 * @return
	 */
	List<HouseBookSourceInfo> queryBookSource();
	
	/**
	 * 根据sourceId查询来源信息
	 * @param sourceId
	 * @return
	 */
	HouseBookSourceInfo queryHouseBookSourceBySourceId(String sourceId);
}
