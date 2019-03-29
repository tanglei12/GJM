package com.gjp.service;

import com.gjp.dao.CustomerSettingsDAO;
import com.gjp.model.Settings;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年3月4日 上午10:44:50 
 */
@Service
public class CustomerSettingsService {

	@Resource
	private CustomerSettingsDAO customerSettingsDAO;
	
	/**
	 * 插入统计设置
	 * 
	 * @param settings
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer insertCustomerSettings(Settings settings){
		return customerSettingsDAO.insertCustomerSettings(settings);
	}
	
	/**
	 * 根据统计设置类型查询统计设置
	 * 
	 * @param settings
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Settings queryCustomerSettingsWhere(Settings settings){
		return customerSettingsDAO.queryCustomerSettingsWhere(settings);
	}
	
	/**
	 * 查询统计设置
	 * 
	 * @param settings
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<Settings> queryCustomerSettings(){
		return customerSettingsDAO.queryCustomerSettings();
	}
	
	/**
	 * 修改统计设置
	 * 
	 * @param settings
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer updateCustomerSettings(Settings settings){
		return customerSettingsDAO.updateCustomerSettings(settings);
	}
}
