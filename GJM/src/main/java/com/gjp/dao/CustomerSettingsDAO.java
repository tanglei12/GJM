package com.gjp.dao;

import com.gjp.model.Settings;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年3月4日 上午10:38:16 
 */
public interface CustomerSettingsDAO {

	/**
	 * 插入统计设置
	 * 
	 * @param settings
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer insertCustomerSettings(Settings settings);
	
	/**
	 * 根据统计设置类型查询统计设置
	 * 
	 * @param settings
	 * @return
	 *
	 * @author 陈智颖
	 */
	Settings queryCustomerSettingsWhere(Settings settings);
	
	/**
	 * 查询统计设置
	 * 
	 * @param settings
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<Settings> queryCustomerSettings();
	
	/**
	 * 修改统计设置
	 * 
	 * @param settings
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updateCustomerSettings(Settings settings);
}
