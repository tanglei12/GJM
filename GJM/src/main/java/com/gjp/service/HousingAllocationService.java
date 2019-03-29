package com.gjp.service;

import com.gjp.dao.HousingAllocationDao;
import com.gjp.model.*;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 房屋基本信息service
 * 
 * @author zoe
 *
 */
/**
 * @author zoe
 *
 */
@Service
public class HousingAllocationService {
	@Resource
	private HousingAllocationDao housingAllocationDao;

	/**
	 * 分页查询已发布房屋基本信息
	 * 
	 * @param houseModel
	 * @param pageModel
	 * @return
	 */
	public PageModel<HouseHouseInformation> selectHouseHouseInformation(int pageNo, int pageSize, HouseModel houseModel) {
		return housingAllocationDao.selectHouseHouseInformation(pageNo, pageSize, houseModel);
	}

	/**
	 * ajax根据编号查询房屋扩展信息
	 * 
	 * @param id
	 * @return
	 */
	public HouseHouseExtended selectHouseExtendedById(int id) {
		return housingAllocationDao.selectHouseExtendedById(id);
	}

	/**
	 * 添加房屋基础信息
	 * 
	 * @param houseHouseInformation
	 * @return
	 */
	public int addHouse(HouseHouseInformation houseHouseInformation) {
		return housingAllocationDao.addHouse(houseHouseInformation);
	}

	/**
	 * 根据id查询房屋基本信息
	 * 
	 * @param hi_id
	 * @return
	 */
	public HouseHouseInformation selectHouseById(int hi_id) {
		return housingAllocationDao.selectHouseById(hi_id);
	}

	/**
	 * 修改房屋基本信息
	 * 
	 * @param houseHouseInformation
	 * @return
	 */
	public int upDataHouse(HouseHouseInformation houseHouseInformation) {
		return housingAllocationDao.upDataHouse(houseHouseInformation);
	}
	
	/**
	 * 修改房屋基本信息
	 * 
	 * @param houseHouseInformation
	 * @return
	 */
	public int updateHouse(HouseHouseInformation houseInfo) {
		return housingAllocationDao.updateHouse(houseInfo);
	}

	/**
	 * 分页查询我的房屋基本信息
	 * 
	 * @param pageNo
	 * @param pageSize
	 * @param em_id
	 * @param houseModel
	 * @return
	 */
	public PageModel<HouseInfoKeep> MyInformationPage(int pageNo, int pageSize, HouseModel houseModel) {
		return housingAllocationDao.MyInformationPage(pageNo, pageSize, houseModel);
	}

	/**
	 * 根据houseName查询房屋id
	 * 
	 * @param houseName
	 * @return
	 */
	public List<Integer> selectHiIdByName(String houseName) {
		return housingAllocationDao.selectHiIdByName(houseName);
	}

	/**
	 * 根据房屋编码查询房屋名称
	 * 
	 * @param hi_code
	 * @return
	 */
	public String selectHouseByCode(String hi_code) {
		return housingAllocationDao.selectHouseByCode(hi_code);
	}

	/**
	 * 根据房屋编码查询房屋名称
	 * 
	 * @param hi_code
	 * @return
	 */
	public List<HouseHouseInformation> selectHouseBool(String hi_code) {
		return housingAllocationDao.selectHouseBool(hi_code);
	}

	/**
	 * 查询所有房子
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<HouseHouseInformation> selectALLHouse() {
		return housingAllocationDao.selectALLHouse();
	}

	/**
	 * 查询房屋名称List
	 * 
	 * @param string
	 * @return
	 */
	public List<String> selectHouseName(String string) {
		return housingAllocationDao.selectHouseName(string);
	}

	/**
	 * 根据编码查询房屋基本信息
	 * 
	 * @param hi_code
	 * @return
	 */
	public HouseHouseInformation selectHouseByName(String hi_code) {
		return housingAllocationDao.selectHouseByName(hi_code);
	}

	/**
	 * 添加存房房屋基本信息
	 * 
	 * @param houseInfoKeep
	 * @return
	 */
	public int addHouseHouseInformationKeep(HouseInfoKeep houseInfoKeep) {
		return housingAllocationDao.addHouseHouseInformationKeep(houseInfoKeep);
	}

	/**
	 * 发布房屋
	 * 
	 * @param houseInfoKeep
	 * @return
	 */
	public int addHouseInformation(HouseInfoKeep houseInfoKeep) {
		return housingAllocationDao.addHouseInformation(houseInfoKeep);
	}

	/**
	 * 验证房屋编码有效性
	 * 
	 * @author JiangQT
	 * @param houseInformation
	 *            {@link HouseHouseInformation#hi_code} 房屋编码
	 * @return
	 */
	public boolean isValidHouseByHiCode(HouseHouseInformation houseInformation) {
		return "1".equals(housingAllocationDao.isValidHouseByHiCodeDao(houseInformation));

	}

	/**
	 * 预览
	 * 
	 * @param houseInformation
	 * @return
	 */
	public List<HouseInformation> queryHouseID(HouseInformation houseInformation) {
		return housingAllocationDao.queryHouseID(houseInformation);
	}

	/**
	 * 查询房屋编码
	 * 
	 * @author JiangQT
	 * @param information
	 *            房屋对象
	 *            <p>
	 *            {@link HouseHouseInformation#hi_code}<br>
	 *            {@link HouseHouseInformation#hi_peopleName}<br>
	 *            {@link HouseHouseInformation#hi_address}<br>
	 * @return
	 */
	public List<HouseInfoKeep> queryHouseCodes(HouseHouseInformation information) {
		return housingAllocationDao.queryHouseCode(information);
	}

	/**
	 * 根据houseName查询房屋编码
	 * 
	 * @param houseName
	 * @return
	 */
	public List<String> selectCodeByName(String houseName) {
		return housingAllocationDao.selectCodeByName(houseName);
	}

	/**
	 * 根据发布房屋编码查询发布房屋id
	 * 
	 * @param hi_code
	 * @return
	 */
	public int slelctIdByCode(String hi_code) {
		return housingAllocationDao.slelctIdByCode(hi_code);
	}

	public List<HouseHouseInformation> queryHouseInfo(HouseHouseInformation information) {
		return housingAllocationDao.queryHouseInfo(information);
	}

	/**
	 * 根据品牌查询未设排序编码的房屋
	 * 
	 * @param pageNo
	 * @param cookies
	 * @param houseModel
	 * @return
	 */
	public PageModel<HouseHouseInformation> houseSort(int pageNo, int cookies, HouseModel houseModel) {
		return housingAllocationDao.houseSort(pageNo, cookies, houseModel);
	}

	/**
	 * 根据品牌查询设置排序编码的房屋
	 * 
	 * @param hb_id
	 * @return
	 */
	public List<HouseHouseInformation> selecthouseSort(int hb_id) {
		return housingAllocationDao.selecthouseSort(hb_id);
	}

	/**
	 * 修改房屋排序码
	 * 
	 * @param num
	 * @param parseInt
	 * @return
	 */
	public int updateHouseSort(int hi_id, int num) {
		return housingAllocationDao.updateHouseSort(hi_id, num);
	}

	/**
	 * 根据品牌把第八个改为null
	 * 
	 * @param parseInt
	 * @param brand
	 * @return
	 */
	public int updateHouseSorts(String brand) {
		return housingAllocationDao.updateHouseSorts(brand);
	}

	/**
	 * 修改房屋排序码下移
	 * 
	 * @param brand
	 * @param s
	 * @param s2
	 * @return
	 */
	public int updateHouseSortDown(String brand, String s, int s2) {
		return housingAllocationDao.updateHouseSortDown(brand, s, s2);
	}

	/**
	 * 修改房屋排序码上移
	 * 
	 * @param brand
	 * @param sort
	 * @param hi_id
	 * @param s
	 * @return
	 */
	public int updateHouseShiftUp(String brand, String sort, String hi_id, int s) {
		return housingAllocationDao.updateHouseShiftUp(brand, sort, hi_id, s);
	}

	/**
	 * 根据品牌查询最大的排序码
	 * 
	 * @param brand
	 * @return
	 */
	public int selectNumber(String brand) {
		return housingAllocationDao.selectNumber(brand);
	}

	public boolean updateHouseContractState(HouseInfoKeep informationKeep) {
		return housingAllocationDao.updateHouseContractState(informationKeep) > 1;
	}

	public HouseHouseInformation selectHouseInfoByCode(String hi_code) {
		return housingAllocationDao.selectHouseInfoByCode(hi_code);
	}

	public boolean updateHouseExtendedState(HouseExtendedVo extendedVo) {
		return housingAllocationDao.updateHouseExtendedState(extendedVo) > 0;
	}

	/**
	 * 是否是指定的房屋类型
	 * 
	 * @author JiangQT
	 * @param informationKeep
	 * @return
	 */
	public boolean isAppointHouseType(HouseInfoKeep informationKeep) {
		return "1".equals(housingAllocationDao.isAppointHouseType(informationKeep));
	}

	/**
	 * 查询同类型公寓是否已在线上房源库
	 * 
	 * @author zoe
	 * @param houseInfoKeep
	 * @return
	 */
	public HouseHouseInformation selectGy(HouseInfoKeep houseInfoKeep) {
		return housingAllocationDao.selectGy(houseInfoKeep);
	}

	/**
	 * 查询房屋物业信息列表(出房)
	 * 
	 * @author JiangQT
	 * @param pagination
	 * @return
	 */
	public List<ViewProductHousePropertyListVo> queryViewProductHousePropertyList(Pagination<ViewProductHousePropertyListVo> pagination) {
		return housingAllocationDao.queryViewProductHousePropertyList(pagination);
	}

	/**
	 * 查询【租赁】房屋信息列表总条数
	 * 
	 * @author JiangQT
	 * @param pagination
	 * @return
	 */
	public int queryViewProductHousePropertyListTotalRecords(Pagination<ViewProductHousePropertyListVo> pagination) {
		return housingAllocationDao.queryViewProductHousePropertyListTotalRecords(pagination);
	}

	/**
	 * APP查询存房库的数据，并分页排序
	 * 
	 * @param houseInformationKeepVo
	 * @return
	 * @author 陈智颖
	 */
	public List<HouseInformationKeepVo> queryAPPHouseList(HouseInformationKeepVo houseInformationKeepVo) {
		return housingAllocationDao.queryAPPHouseList(houseInformationKeepVo);
	}
	
	/**
	 * APP查询部门存房库的数据，并分页排序
	 * 
	 * @param houseInformationKeepVo
	 * @return
	 * @author 陈智颖
	 */
	public List<HouseInformationKeepVo> queryAPPHouseListDepartment(HouseInformationKeepVo houseInformationKeepVo) {
		return housingAllocationDao.queryAPPHouseListDepartment(houseInformationKeepVo);
	}

	/**
	 * APP根据房屋编码查询房屋
	 * 
	 * @param houseInformationKeepVo
	 * @return
	 * @author 陈智颖
	 */
	public HouseInformationKeepVo queryAPPHouseListCode(HouseInformationKeepVo houseInformationKeepVo) {
		return housingAllocationDao.queryAPPHouseListCode(houseInformationKeepVo);
	}

	/**
	 * 房屋配置
	 *
	 * @param facility
	 * @return
	 */
	public List<Facility> queryHouseInformationFacility(Facility facility) {
		return housingAllocationDao.queryHouseInformationFacility(facility);
	}

	/**
	 * 更新线上房源
	 * 
	 * @作者 JiangQT
	 * @日期 2016年7月5日
	 *
	 * @param houseInfoKeep
	 * @return
	 */
	public boolean updateOnlineHouseInfo(HouseInfoKeep houseInfoKeep) {
		return housingAllocationDao.updateOnlineHouseInfo(houseInfoKeep) > 0;
	}
	
	/**
	 * 查询房屋管家
	 * 
	 * @param hi_code
	 * @return
	 * @author 王孝元
	 */
	public UserCenterEmployee queryHouseWaiterInfo(String hi_code){
		return housingAllocationDao.queryHouseWaiterInfo(hi_code);
	}
	
	/**
	 * 更新房源状态
	 * @param houseInfoKeep
	 * @return
	 */
	public int updateHouseInformationKeep(HouseInfoKeep houseInfoKeep) {
		return housingAllocationDao.updateHouseInformationKeep(houseInfoKeep);
	}
	
	/**
	 * 记录点击查看房东信息日志
	 * @param landlordSeeLog
	 * @return
	 */
	public int addLandlordSeeLog(LandlordSeeLog landlordSeeLog) {
		return housingAllocationDao.addLandlordSeeLog(landlordSeeLog);
	}
	
	/**
	 * 查询该管家当天查看不属于自己房源的房东信息次数
	 * @param landlordSeeLog
	 * @return
	 */
	public List<LandlordSeeLog> queryLandlordSeeLogCountByEmId(LandlordSeeLog landlordSeeLog) {
		return housingAllocationDao.queryLandlordSeeLogCountByEmId(landlordSeeLog);
	}

	/**
	 * 根据hi_code查询房屋状态
	 * @author tanglei
	 */
	public HouseInfoKeep selectHouseInformationKeep (HouseInfoKeep houseInfoKeep) {
		return housingAllocationDao.selectHouseInformationKeep(houseInfoKeep);
	}

	/**
	 * 房源发布渠道及状态
	 * @author tanglei
	 */
	public List<HousePublish> queryHousePublish (HousePublish housePublish) {
		return housingAllocationDao.queryHousePublish(housePublish);
	}

	/**
	 * 根据hi_code查询线上房源
	 * @author tanglei
	 */
	public HouseInfoKeep queryHouseOnline (HouseInfoKeep houseInfoKeep) {
		return housingAllocationDao.queryHouseOnline(houseInfoKeep);
	}

	/**
	 * 查询房屋类型
	 * @author tanglei
	 */
	public HouseInformationStateRelation queryHouseInformationStateRelation (HouseInformationStateRelation houseInformationStateRelation) {
		return housingAllocationDao.queryHouseInformationStateRelation(houseInformationStateRelation);
	}


}
