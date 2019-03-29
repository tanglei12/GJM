package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HouseBookTemplateDao;
import com.gjp.model.HouseBookTemplateInfo;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 预约模板信息
 * @author shenhx
 * 2017-03-14
 */
@Repository
public class HouseBookTemplateDaoImpl extends BaseDAO implements HouseBookTemplateDao {

	@Override
	public int addHouseBookTemplate(HouseBookTemplateInfo houseBookTemplateInfo) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseBookTemplateDao.addHouseBookTemplate", houseBookTemplateInfo);
	}

	@Override
	public int delHouseBookTemplate(int bt_id) {
		return super.sqlSessionTemplateProduct.delete("com.gjp.dao.HouseBookTemplateDao.delHouseBookTemplate", bt_id);
	}

	@Override
	public Pagination<HouseBookTemplateInfo> queryHouseBookTemplateForList(Pagination<HouseBookTemplateInfo> pagination) {
		List<HouseBookTemplateInfo> list = sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseBookTemplateDao.queryHouseBookTemplateForList", pagination);
		int totalRecords = sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseBookTemplateDao.queryHouseBookTemplateForCount", pagination);
		pagination.setList(list, totalRecords);
		return pagination;
	}

	@Override
	public int queryHouseBookTemplateForCount(Pagination<HouseBookTemplateInfo> pagination) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseBookTemplateDao.queryHouseBookTemplateForCount", pagination);
	}

	@Override
	public HouseBookTemplateInfo queryHouseBookTemplateById(int bt_id) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseBookTemplateDao.queryHouseBookTemplateById", bt_id);
	}

	@Override
	public int updateHouseBookTemplate(HouseBookTemplateInfo houseBookTemplateInfo) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.HouseBookTemplateDao.updateHouseBookTemplate", houseBookTemplateInfo);
	}
	
	@Override
	public int saveBcIds(HouseBookTemplateInfo houseBookTemplateInfo) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.HouseBookTemplateDao.saveBcIds", houseBookTemplateInfo);
	}

	@Override
	public HouseBookTemplateInfo queryHouseBookTemplateBySourceId(String sourceId) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseBookTemplateDao.queryHouseBookTemplateBySourceId", sourceId);
	}

}
