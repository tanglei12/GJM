package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.CustomerSettingsDAO;
import com.gjp.model.Settings;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年3月4日 上午10:43:05 
 */
@Repository
public class CustomerSettingsDAOImpl extends BaseDAO implements CustomerSettingsDAO{

	@Override
	public Integer insertCustomerSettings(Settings settings) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.CustomerSettingsDAO.insertCustomerSettings",settings);
	}

	@Override
	public Settings queryCustomerSettingsWhere(Settings settings) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerSettingsDAO.queryCustomerSettingsWhere",settings);
	}

	@Override
	public List<Settings> queryCustomerSettings() {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerSettingsDAO.queryCustomerSettings");
	}

	@Override
	public Integer updateCustomerSettings(Settings settings) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.CustomerSettingsDAO.updateCustomerSettings",settings);
	}

	
}
