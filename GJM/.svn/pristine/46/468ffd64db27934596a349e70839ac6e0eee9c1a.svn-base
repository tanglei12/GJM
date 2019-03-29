package com.gjp.dao.impl;


import com.gjp.dao.BaseDAO;
import com.gjp.dao.HouseExtendedDao;
import com.gjp.model.HouseHouseExtended;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 房屋扩展信息ImplDao
 * @author zoe
 *
 */
@Repository
public class HouseExtendedDaoImpl extends BaseDAO implements HouseExtendedDao {

	@Override
	public HouseHouseExtended selectHouseExtendedById(int id) {
		HouseHouseExtended houseHouseExtended = super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseExtendedDao.selectHouseExtendedById",id);
		return houseHouseExtended;
	}

	@Override
	public List<HouseHouseExtended> selectHouseHouseExtendedList() {
		List<HouseHouseExtended> houseHouseExtendedList = super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseExtendedDao.selectHouseExtended");
		return houseHouseExtendedList;
	}

	@Override
	public int addHouseExtended(HouseHouseExtended houseHouseExtended) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseExtendedDao.addHouseExtended",houseHouseExtended);
	}

	@Override
	public int selectHe_id(HouseHouseExtended houseHouseExtended) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseExtendedDao.selectHe_id",houseHouseExtended);
	}

	@Override
	public HouseHouseExtended selectHouseHouseExtendedById(Integer he_id) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseExtendedDao.selectHouseHouseExtendedById",he_id);
	}

	@Override
	public PageModel<HouseHouseExtended> selectHouseHouseExtended(int pageNo, int pageSize,HouseModel houseModel) {
		PageModel<HouseHouseExtended> pageModel = new PageModel<HouseHouseExtended>();
		//分页设置开始点
		pageModel.setPageNo((pageNo - 1) * pageSize);
		//分页设置查询条数
		pageModel.setPageSize(pageSize);
		// 分页设置查询条件
		pageModel.setHouseModel(houseModel);
		//分页查询房屋基本信息集合
		List<HouseHouseExtended> houseHouseExtendedList = super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseExtendedDao.selectHouseHouseExtended",pageModel);
		//查询房屋总记录数
		int totalRecords = super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseExtendedDao.selectTotalHouseExtended",pageModel);
		pageModel.setList(houseHouseExtendedList);
		pageModel.setTotalRecords(totalRecords);
		return pageModel;
	}

	
	@Override
	public int updataInfo(HouseHouseExtended houseHouseExtended) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.HouseExtendedDao.upDataHouseExtended",houseHouseExtended);
	}

	@Override
	public int updateSta(HouseHouseExtended houseHouseExtended) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.HouseExtendedDao.updateSta",houseHouseExtended);
	}
}
