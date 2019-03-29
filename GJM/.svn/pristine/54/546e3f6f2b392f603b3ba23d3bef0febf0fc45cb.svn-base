package com.gjp.service;

import com.gjp.dao.HouseBookConfigDao;
import com.gjp.model.HouseBookConfig;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 预约配置Service
 * @author shenhx
 * 2017-03-14
 */
@Service
public class HouseBookConfigService {

	@Resource
	private HouseBookConfigDao houseBookConfigDao;
	
	/**
	 * 新增预约界面配置数据
	 * @param houseBookConfig
	 * @return
	 */
	public int addHouseBookConfig(HouseBookConfig houseBookConfig){
		return houseBookConfigDao.addHouseBookConfig(houseBookConfig);
	}
	
	/**
	 * 修改预约界面配置数据
	 * @param houseBookConfig
	 * @return
	 */
	public int updateHouseBookConfig(HouseBookConfig houseBookConfig){
		return houseBookConfigDao.updateHouseBookConfig(houseBookConfig);
	}
	
	/**
	 * 分页查询所有配置数据
	 * @param houseBookConfig
	 * @return
	 */
	public Pagination<HouseBookConfig> queryHouseBookConfigForList(Pagination<HouseBookConfig> houseBookConfig){
		return houseBookConfigDao.queryHouseBookConfigForList(houseBookConfig);
	}
	
	/**
	 * 查询单个界面控件数据
	 * @param houseBookConfig
	 * @return
	 */
	public HouseBookConfig queryHouseBookConfigById(int bc_id){
		return houseBookConfigDao.queryHouseBookConfigById(bc_id);
	}
	
	/**
	 * 查询数据及其子节点数据
	 * @param houseBookConfig
	 * @return
	 */
	public List<HouseBookConfig> queryHouseBookConfigsById(int bc_id){
		return houseBookConfigDao.queryHouseBookConfigsById(bc_id);
	}
	
	/**
	 * 查询单个界面控件数据
	 * @param houseBookConfig
	 * @return
	 */
	public List<HouseBookConfig> queryHouseBookConfigByBcPId(Integer bc_pid){
		return houseBookConfigDao.queryHouseBookConfigByBcPId(bc_pid);
	}
	
	/**
	 * 查询所有数据
	 * @return
	 */
	public List<HouseBookConfig> queryHouseBookConfigs(){
		return houseBookConfigDao.queryHouseBookConfigs();
	}
	
	/**
	 * 查询模板下所有配置
	 * @param bc_idsArray
	 * @return
	 */
	public List<HouseBookConfig> queryHouseBookConfigFromIds(HouseBookConfig bookConfig){
		return houseBookConfigDao.queryHouseBookConfigFromIds(bookConfig);
	}
	
	/**
	 * 查询模板下所有配置
	 * @param bc_idsArray
	 * @return
	 */
	public List<HouseBookConfig> queryHouseBookConfigFatherAndSon(HouseBookConfig bookConfig){
		return houseBookConfigDao.queryHouseBookConfigFatherAndSon(bookConfig);
	}
	
}
