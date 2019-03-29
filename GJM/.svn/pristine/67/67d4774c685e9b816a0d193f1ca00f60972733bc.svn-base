package com.gjp.dao;

import com.gjp.model.HouseBookConfig;
import com.gjp.util.Pagination;

import java.util.List;

/**
 * 预约配置
 * @author shenhx
 * 2017-03-14
 */
public interface HouseBookConfigDao {

	/**
	 * 新增预约界面配置数据
	 * @param houseBookConfig
	 * @return
	 */
	int addHouseBookConfig(HouseBookConfig houseBookConfig);
	
	/**
	 * 修改预约界面配置数据
	 * @param houseBookConfig
	 * @return
	 */
	int updateHouseBookConfig(HouseBookConfig houseBookConfig);
	
	/**
	 * 分页查询所有配置数据
	 * @param houseBookConfig
	 * @return
	 */
	Pagination<HouseBookConfig> queryHouseBookConfigForList(Pagination<HouseBookConfig> houseBookConfig);
	
	/**
	 * 分页查询所有配置数据条数
	 * @param houseBookConfig
	 * @return
	 */
	int queryHouseBookConfigForCount(Pagination<HouseBookConfig> houseBookConfig);
	
	/**
	 * 查询单个界面控件数据
	 * @param houseBookConfig
	 * @return
	 */
	HouseBookConfig queryHouseBookConfigById(int bc_id);
	
	/**
	 * 根据sourceId查询该来源下所有字段
	 * @param sourceId
	 * @return
	 */
	List<HouseBookConfig> queryHouseBookConfigByBcPId(Integer bc_pid);
	
	/**
	 * 查询所有数据
	 * @return
	 */
	List<HouseBookConfig> queryHouseBookConfigs();
	
	/**
	 * 查询节点及其子节点信息
	 * @return
	 */
	List<HouseBookConfig> queryHouseBookConfigsById(int bc_id);
	
	/**
	 * 查询模板下所有配置
	 * @param bc_idsArray
	 * @return
	 */
	List<HouseBookConfig> queryHouseBookConfigFromIds(HouseBookConfig bookConfig);
	
	/**
	 * 查询模板下父节点及子节点
	 * @param bc_idsArray
	 * @return
	 */
	List<HouseBookConfig> queryHouseBookConfigFatherAndSon(HouseBookConfig bookConfig);
	
	
}
