package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HouseBookConfigDao;
import com.gjp.model.HouseBookConfig;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 预约配置
 * @author shenhx
 * 2017-03-14
 */
@Repository
public class HouseBookConfigDaoImpl extends BaseDAO implements HouseBookConfigDao {

	@Override
	public int addHouseBookConfig(HouseBookConfig houseBookConfig) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseBookConfigDao.addHouseBookConfig", houseBookConfig);
	}

	@Override
	public int updateHouseBookConfig(HouseBookConfig houseBookConfig) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.HouseBookConfigDao.updateHouseBookConfig", houseBookConfig);
	}

	@Override
	public Pagination<HouseBookConfig> queryHouseBookConfigForList(Pagination<HouseBookConfig> pagination) {
		List<HouseBookConfig> list = sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseBookConfigDao.queryHouseBookConfigForList", pagination);
		int totalRecords = sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseBookConfigDao.queryHouseBookConfigForCount", pagination);
		pagination.setList(list, totalRecords);
		return pagination;
	}
	
	@Override
	public int queryHouseBookConfigForCount(Pagination<HouseBookConfig> pagination) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseBookConfigDao.queryHouseBookConfigForCount", pagination);
	}

	@Override
	public HouseBookConfig queryHouseBookConfigById(int bc_id) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseBookConfigDao.queryHouseBookConfigById", bc_id);
	}

	@Override
	public List<HouseBookConfig> queryHouseBookConfigByBcPId(Integer bc_pid) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseBookConfigDao.queryHouseBookConfigByBcPId", bc_pid);
	}

	@Override
	public List<HouseBookConfig> queryHouseBookConfigs() {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseBookConfigDao.queryHouseBookConfigs");
	}

	@Override
	public List<HouseBookConfig> queryHouseBookConfigsById(int bc_id) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseBookConfigDao.queryHouseBookConfigsById", bc_id);
	}

	@Override
	public List<HouseBookConfig> queryHouseBookConfigFromIds(HouseBookConfig bookConfig) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseBookConfigDao.queryHouseBookConfigFromIds", bookConfig);
	}

	@Override
	public List<HouseBookConfig> queryHouseBookConfigFatherAndSon(HouseBookConfig bookConfig) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseBookConfigDao.queryHouseBookConfigFatherAndSon", bookConfig);
	}

}
