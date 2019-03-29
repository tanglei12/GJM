package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HouseBookSourceDao;
import com.gjp.model.HouseBookSourceInfo;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 预约来源信息
 * @author shenhx
 * 2017-03-14
 */
@Repository
public class HouseBookSourceDaoImpl extends BaseDAO implements HouseBookSourceDao {

	@Override
	public int addHouseBookSource(HouseBookSourceInfo houseBookSourceInfo) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseBookSourceDao.addHouseBookSource", houseBookSourceInfo);
	}

	@Override
	public int delHouseBookSource(int bs_id) {
		return super.sqlSessionTemplateProduct.delete("com.gjp.dao.HouseBookSourceDao.delHouseBookSource", bs_id);
	}

	@Override
	public Pagination<HouseBookSourceInfo> queryHouseBookSourceForList(
			Pagination<HouseBookSourceInfo> pagination) {
		List<HouseBookSourceInfo> list = sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseBookSourceDao.queryHouseBookSourceForList", pagination);
		int totalRecords = sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseBookSourceDao.queryHouseBookSourceForCount", pagination);
		pagination.setList(list, totalRecords);
		return pagination;
	}

	@Override
	public int queryHouseBookSourceForCount(Pagination<HouseBookSourceInfo> pagination) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseBookSourceDao.queryHouseBookSourceForCount", pagination);
	}

	@Override
	public HouseBookSourceInfo queryHouseBookSourceById(int bs_id) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseBookSourceDao.queryHouseBookSourceById", bs_id);
	}

	@Override
	public int updateHouseBookSource(HouseBookSourceInfo houseBookSourceInfo) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.HouseBookSourceDao.updateHouseBookSource", houseBookSourceInfo);
	}

	@Override
	public List<HouseBookSourceInfo> queryBookSource() {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseBookSourceDao.queryBookSource");
	}

	@Override
	public HouseBookSourceInfo queryHouseBookSourceBySourceId(String sourceId) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseBookSourceDao.queryHouseBookSourceBySourceId", sourceId);
	}

}
