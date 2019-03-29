package com.gjp.dao.impl;


import com.gjp.dao.BaseDAO;
import com.gjp.dao.HouseHouseBrandDao;
import com.gjp.model.ApartmentType;
import com.gjp.model.HouseBrandWhere;
import com.gjp.model.HouseBrandWhereExtended;
import com.gjp.model.HouseHouseBrand;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 房屋品牌ImplDao
 * @author zoe
 *
 */
@Repository
public class HouseHouseBrandDaoImpl extends BaseDAO implements HouseHouseBrandDao {

	@Override
	public List<HouseHouseBrand> selectHouseHouseBrandList() {
		List<HouseHouseBrand> houseHouseBrandList = super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseHouseBrandDao.selectHouseHouseBrand");
		return houseHouseBrandList;
	}

	@Override
	public int addHouseBrand(HouseHouseBrand houseHouseBrand) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseHouseBrandDao.addHouseBrand",houseHouseBrand);
	}

	@Override
	public int selectHb_id(HouseHouseBrand houseHouseBrand) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseHouseBrandDao.selectHb_id",houseHouseBrand);
	}

	@Override
	public PageModel<HouseHouseBrand> selectHouseHouseBrand(PageModel<HouseHouseBrand> pageModel) {
		
		List<HouseHouseBrand> houseHouseBrand = sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseHouseBrandDao.selectHouseHouseBrands", pageModel);
		int totalRecords = sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseHouseBrandDao.selectTotalHouseHouseBrand", pageModel);
		pageModel.setList(houseHouseBrand);
		pageModel.setTotalRecords(totalRecords);
		
		return pageModel;
	}

	@Override
	public HouseHouseBrand selectHouseHouseBrandById(int hb_id) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseHouseBrandDao.selectHouseHouseBrandById",hb_id);
	}

	@Override
	public int updataInfo(HouseHouseBrand houseHouseBrand) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.HouseHouseBrandDao.upDataHouseHouseBrand",houseHouseBrand);
	}

	@Override
	public int addHouseBrandWhere(HouseBrandWhere houseBrandWhere) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseHouseBrandDao.addHouseBrandWhere",houseBrandWhere);
	}

	@Override
	public int addHouseBrandWhereExtended(
			HouseBrandWhereExtended houseBrandWhereExtended) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseHouseBrandDao.addHouseBrandWhereExtended",houseBrandWhereExtended);
	}

	@Override
	public List<HouseBrandWhere> selectBrandWhere(int hb_id) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseHouseBrandDao.selectBrandWhere",hb_id);
	}

	@Override
	public List<HouseBrandWhereExtended> selectHouseBrandWhereExtended(
			Integer bw_id) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseHouseBrandDao.selectHouseBrandWhereExtended",bw_id);
	}

	@Override
	public int deleteHouseBrandWhereExtended(Integer bw_id) {
		return super.sqlSessionTemplateProduct.delete("com.gjp.dao.HouseHouseBrandDao.deleteHouseBrandWhereExtended",bw_id);
	}

	@Override
	public List<String> selectVersions() {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseHouseBrandDao.selectVersions");
	}

	@Override
	public String selectType(String hi_version) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseHouseBrandDao.selectType",hi_version);
	}

	@Override
	public int addBrandType(ApartmentType apartmentType) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseHouseBrandDao.addBrandType",apartmentType);
	}

	
}
