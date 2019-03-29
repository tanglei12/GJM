package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HousingAllocationDao;
import com.gjp.model.*;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * 房屋基本信息ImplDao
 * 
 * @author zoe
 *
 */
@Repository
public class HousingAllocationDAOImpl extends BaseDAO implements HousingAllocationDao {

	@Override
	public PageModel<HouseHouseInformation> selectHouseHouseInformation(int pageNo, int pageSize, HouseModel houseModel) {
		PageModel<HouseHouseInformation> pageModel = new PageModel<HouseHouseInformation>();
		// 分页设置开始点
		pageModel.setPageNo((pageNo - 1) * pageSize);
		// 分页设置查询条数
		pageModel.setPageSize(pageSize);
		// 分页设置查询条件
		pageModel.setHouseModel(houseModel);
		// 分页查询房屋基本信息集合
		List<HouseHouseInformation> houseHouseInformationList = super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.selectHouseHouseInformation",
				pageModel);
		// 查询房屋总记录数
		int totalRecords = super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.selectTotalHouseHouseInformation", pageModel);
		pageModel.setList(houseHouseInformationList);
		pageModel.setTotalRecords(totalRecords);
		return pageModel;
	}

	@Override
	public HouseHouseExtended selectHouseExtendedById(int id) {
		HouseHouseExtended houseHouseExtended = super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseExtendedDao.selectHouseExtendedById", id);
		return houseHouseExtended;
	}

	@Override
	public int addHouse(HouseHouseInformation houseHouseInformation) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HousingAllocationDao.addHouse", houseHouseInformation);
	}

	@Override
	public HouseHouseInformation selectHouseById(int hi_id) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.selectHouseById", hi_id);
	}

	@Override
	public int upDataHouse(HouseHouseInformation houseHouseInformation) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.HousingAllocationDao.upDataHouse", houseHouseInformation);
	}
	
	@Override
	public int updateHouse(HouseHouseInformation houseInfo) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.HousingAllocationDao.updateHouse", houseInfo);
	}

	@Override
	public PageModel<HouseInfoKeep> MyInformationPage(int pageNo, int pageSize, HouseModel houseModel) {
		PageModel<HouseInfoKeep> pageModel = new PageModel<HouseInfoKeep>();
		// 分页设置开始点
		pageModel.setPageNo((pageNo - 1) * pageSize);
		// 分页设置查询条数
		pageModel.setPageSize(pageSize);
		// 分页设置查询条件
		pageModel.setHouseModel(houseModel);

		// 分页查询房屋基本信息集合
		List<HouseInfoKeep> houseInfoKeepList = new ArrayList<HouseInfoKeep>();
		List<HouseInfoKeep> houseInfoKeepLists = super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.MyInformationPage", pageModel);
		for (HouseInfoKeep houseInfoKeep : houseInfoKeepLists) {
			HouseInfoKeep houseHouseInformationName = super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.MyInformationZName", houseInfoKeep);
			houseInfoKeep.setEm_name(houseHouseInformationName.getEm_name());
			houseInfoKeep.setEm_phone(houseHouseInformationName.getEm_phone());
			houseInfoKeepList.add(houseInfoKeep);
		}
		// 查询房屋总记录数
		int totalRecords = super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.selectMyTotalHouseHouseInformation", pageModel);
		pageModel.setList(houseInfoKeepList);
		pageModel.setTotalRecords(totalRecords);
		
		return pageModel;
	}

	@Override
	public List<Integer> selectHiIdByName(String hi_name) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.selectHiIdByName", hi_name);
	}

	@Override
	public String selectHouseByCode(String hi_code) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.selectHouseByCode", hi_code);
	}

	@Override
	public List<String> selectHouseName(String contract_status) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.selectHouseName", contract_status);
	}

	@Override
	public HouseHouseInformation selectHouseByName(String hi_code) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.selectHouseByName", hi_code);
	}

	@Override
	public int addHouseHouseInformationKeep(HouseInfoKeep houseInfoKeep) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HousingAllocationDao.addHouseHouseInformationKeep", houseInfoKeep);
	}

	@Override
	public int addHouseInformation(HouseInfoKeep houseInfoKeep) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HousingAllocationDao.addHouseInformation", houseInfoKeep);
	}

	@Override
	public String isValidHouseByHiCodeDao(HouseHouseInformation houseInformation) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.isValidHouseByHiCodeDao", houseInformation);
	}

	@Override
	public List<HouseInformation> queryHouseID(HouseInformation houseInformation) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.queryHouseID", houseInformation);
	}

	@Override
	public List<HouseInfoKeep> queryHouseCode(HouseHouseInformation information) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.queryHouseCode", information);
	}

	@Override
	public List<String> selectCodeByName(String houseName) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.selectCodeByName", houseName);
	}

	@Override
	public int slelctIdByCode(String hi_code) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.slelctIdByCode", hi_code);
	}

	@Override
	public List<HouseHouseInformation> queryHouseInfo(HouseHouseInformation information) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.queryHouseInfo", information);
	}

	@Override
	public PageModel<HouseHouseInformation> houseSort(int pageNo, int pageSize, HouseModel houseModel) {
		PageModel<HouseHouseInformation> pageModel = new PageModel<HouseHouseInformation>();
		// 分页设置开始点
		pageModel.setPageNo((pageNo - 1) * pageSize);
		// 分页设置查询条数
		pageModel.setPageSize(pageSize);
		// 分页设置查询条件
		pageModel.setHouseModel(houseModel);
		// 分页查询房屋基本信息集合
		List<HouseHouseInformation> houseHouseInformationList = super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.houseSort", pageModel);
		// 查询房屋总记录数
		int totalRecords = super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.houseSortTotal", pageModel);
		pageModel.setList(houseHouseInformationList);
		pageModel.setTotalRecords(totalRecords);
		return pageModel;
	}

	@Override
	public List<HouseHouseInformation> selecthouseSort(int hb_id) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.selecthouseSort", hb_id);
	}

	@Override
	public int updateHouseSort(int hi_id, int num) {
		HouseModel houseModel = new HouseModel();
		houseModel.setHi_number(num);
		houseModel.setHi_id(hi_id);
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.HousingAllocationDao.updateHouseSort", houseModel);
	}

	@Override
	public int updateHouseSorts(String brand) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.HousingAllocationDao.updateHouseSorts", Integer.parseInt(brand));
	}

	@Override
	public int updateHouseSortDown(String brand, String s, int s2) {
		HouseModel houseModel = new HouseModel();
		houseModel.setHouseBrand(Integer.parseInt(brand));
		houseModel.setHi_number(Integer.parseInt(s));
		houseModel.setTy(s2);
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.HousingAllocationDao.updateHouseSortDown", houseModel);
	}

	@Override
	public int updateHouseShiftUp(String brand, String sort, String hi_id, int s) {
		HouseModel houseModel = new HouseModel();
		houseModel.setHouseBrand(Integer.parseInt(brand));
		houseModel.setHi_number(Integer.parseInt(sort));
		houseModel.setHi_id(Integer.parseInt(hi_id));
		houseModel.setTy(s);
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.HousingAllocationDao.updateHouseShiftUp", houseModel);
	}

	@Override
	public int selectNumber(String brand) {
		List<Integer> nums = super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.selectNumbers", Integer.parseInt(brand));
		int num = 0;
		for (Integer integer : nums) {
			if (integer != null) {
				num = super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.selectNumber", Integer.parseInt(brand));
				break;
			}
		}

		return num;
	}

	@Override
	public int updateHouseContractState(HouseInfoKeep informationKeep) {
		return sqlSessionTemplateProduct.update("com.gjp.dao.HousingAllocationDao.updateHouseContractState", informationKeep);
	}

	@Override
	public HouseHouseInformation selectHouseInfoByCode(String hi_code) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.selectHouseInfoByCode", hi_code);
	}

	@Override
	public int updateHouseExtendedState(HouseExtendedVo extendedVo) {
		return sqlSessionTemplateProduct.update("com.gjp.dao.HousingAllocationDao.updateHouseExtendedState", extendedVo);
	}

	@Override
	public String isAppointHouseType(HouseInfoKeep informationKeep) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.isAppointHouseType", informationKeep);
	}

	@Override
	public HouseHouseInformation selectGy(HouseInfoKeep houseInfoKeep) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.selectGy", houseInfoKeep);
	}

	@Override
	public List<ViewProductHousePropertyListVo> queryViewProductHousePropertyList(Pagination<ViewProductHousePropertyListVo> pagination) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.queryViewProductHousePropertyList", pagination);
	}

	@Override
	public int queryViewProductHousePropertyListTotalRecords(Pagination<ViewProductHousePropertyListVo> pagination) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.queryViewProductHousePropertyListTotalRecords", pagination);
	}

	@Override
	public List<HouseInformationKeepVo> queryAPPHouseList(HouseInformationKeepVo houseInformationKeepVo) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.queryAPPHouseList", houseInformationKeepVo);
	}
	

	@Override
	public List<HouseInformationKeepVo> queryAPPHouseListDepartment(HouseInformationKeepVo houseInformationKeepVo) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.queryAPPHouseListDepartment", houseInformationKeepVo);
	}

	@Override
	public HouseInformationKeepVo queryAPPHouseListCode(HouseInformationKeepVo houseInformationKeepVo) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.queryAPPHouseListCode", houseInformationKeepVo);
	}

	@Override
	public List<Facility> queryHouseInformationFacility(Facility facility) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.queryHouseInformationFacility", facility);
	}

	@Override
	public List<HouseInfoKeep> selectHouseCodeALL() {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.selectHouseCodeALL");
	}

	@Override
	public List<HouseHouseInformation> selectHouseBool(String hi_code) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.selectHouseBool", hi_code);
	}

	@Override
	public int updateOnlineHouseInfo(HouseInfoKeep houseInfoKeep) {
		return sqlSessionTemplateProduct.update("com.gjp.dao.HousingAllocationDao.updateOnlineHouseInfo", houseInfoKeep);
	}

	@Override
	public List<HouseHouseInformation> selectALLHouse() {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.selectALLHouse");
	}

	@Override
	public UserCenterEmployee queryHouseWaiterInfo(String hi_code) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.queryHouseWaiterInfo",hi_code);
	}

	@Override
	public int updateHouseInformationKeep(HouseInfoKeep houseInfoKeep) {
		return sqlSessionTemplateProduct.update("com.gjp.dao.HousingAllocationDao.updateHouseInformationKeep", houseInfoKeep);
	}

	@Override
	public int addLandlordSeeLog(LandlordSeeLog landlordSeeLog) {
		return sqlSessionTemplateProduct.insert("com.gjp.dao.HousingAllocationDao.addLandlordSeeLog", landlordSeeLog);
	}

	@Override
	public List<LandlordSeeLog> queryLandlordSeeLogCountByEmId(LandlordSeeLog landlordSeeLog) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.queryLandlordSeeLogCountByEmId", landlordSeeLog);
	}

	@Override
	public HouseInfoKeep selectHouseInformationKeep(HouseInfoKeep houseInfoKeep) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.selectHouseInformationKeep", houseInfoKeep);
	}

	@Override
	public HouseInformation queryHouseInformationSelect(HouseInformation houseInformation) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.queryHouseInformationSelect", houseInformation);
	}

    @Override
    public List<HouseImage> queryHouseInformationImage(HouseImage houseImage) {
        return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.queryHouseInformationImage", houseImage);
    }

	@Override
	public int addRentHouseFile(RentHouseFileVo rentHouseFileVo) {
		return sqlSessionTemplateProduct.insert("com.gjp.dao.HousingAllocationDao.addRentHouseFile",rentHouseFileVo);
	}

	@Override
	public List<ViewHouseLibraryInfoVo> queryHouseInformationKeepList() {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.queryHouseInformationKeepList");
	}

	@Override
	public int insertRentTelephoneRecordsVo(RentTelephoneRecordsVo rentTelephoneRecordsVo) {
		return sqlSessionTemplateProduct.insert("com.gjp.dao.HousingAllocationDao.insertRentTelephoneRecordsVo", rentTelephoneRecordsVo);
	}

	@Override
	public RentHouseVo queryRentHouseVo(RentHouseVo rentHouseVo) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.queryRentHouseVo", rentHouseVo);
	}
	@Override
	public List<RentHouseFileVo> queryRentHouseFileVoList(RentHouseFileVo rentHouseFileVo) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.HousingAllocationDao.queryRentHouseFileVoList",rentHouseFileVo);
	}
	@Override
	public int updataRentHouseVo(RentHouseVo rentHouseVo) {
		return sqlSessionTemplateProduct.update("com.gjp.dao.HousingAllocationDao.updataRentHouseVo", rentHouseVo);
	}

	@Override
	public int addRentHouseVo(RentHouseVo rentHouseVo) {
		return sqlSessionTemplateProduct.insert("com.gjp.dao.HousingAllocationDao.addRentHouseVo", rentHouseVo);
	}

	@Override
	public List<HousePublish> queryHousePublish (HousePublish housePublish) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.queryHousePublish",housePublish);
	}

	@Override
	public HouseInfoKeep queryHouseOnline (HouseInfoKeep houseInfoKeep) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.queryHouseOnline",houseInfoKeep);
	}

	@Override
	public HouseInformationStateRelation queryHouseInformationStateRelation (HouseInformationStateRelation houseInformationStateRelation) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.queryHouseInformationStateRelation",houseInformationStateRelation);
	}

}
