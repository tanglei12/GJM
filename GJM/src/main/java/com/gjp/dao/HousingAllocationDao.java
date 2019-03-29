package com.gjp.dao;

import com.gjp.model.*;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import com.gjp.util.Pagination;

import java.util.List;

/**
 * // * 房屋基本信息DAO
 * 
 * @author zoe
 *
 */
public interface HousingAllocationDao {

	/**
	 * 查询所有房屋基本信息
	 * 
	 * @param houseModel
	 * @param pageModel
	 * @return
	 */
	PageModel<HouseHouseInformation> selectHouseHouseInformation(int pageNo, int pageSize, HouseModel houseModel);

	/**
	 * AJAX查询房屋扩展信息
	 * 
	 * @param id
	 * @return
	 */
	HouseHouseExtended selectHouseExtendedById(int id);

	/**
	 * 添加房源基础信息
	 * 
	 * @param houseHouseInformation
	 * @return
	 */
	int addHouse(HouseHouseInformation houseHouseInformation);

	/**
	 * 根据id查询房屋基本信息
	 * 
	 * @param hi_id
	 * @return
	 */
	HouseHouseInformation selectHouseById(int hi_id);
	
	/**
	 * 根据房屋code查询线上房屋是否存在
	 * 
	 * @param hi_code
	 * @return
	 */
	List<HouseHouseInformation> selectHouseBool(String hi_code);
	
	/**
	 * 查询所有房子
	 * 
	 * @param hi_code
	 * @return
	 */
	List<HouseHouseInformation> selectALLHouse();

	/**
	 * 修改房屋基本信息
	 * 
	 * @param houseHouseInformation
	 * @return
	 */
	int upDataHouse(HouseHouseInformation houseHouseInformation);
	
	/**
	 * 修改房屋基本信息
	 * 
	 * @param houseHouseInformation
	 * @return
	 */
	int updateHouse(HouseHouseInformation houseInfo);

	/**
	 * 查询我的房屋信息
	 * 
	 * @param pageNo
	 * @param pageSize
	 * @param em_id
	 * @param houseModel
	 * @return
	 */
	PageModel<HouseInfoKeep> MyInformationPage(int pageNo, int pageSize, HouseModel houseModel);

	/**
	 * 根据houseName查询房屋id
	 * 
	 * @param houseName
	 * @return
	 */
	List<Integer> selectHiIdByName(String houseName);

	/**
	 * 根据房屋编码查询房屋名称
	 * 
	 * @param hi_code
	 * @return
	 */
	String selectHouseByCode(String hi_code);

	/**
	 * 查询房屋名称List
	 * 
	 * @param string
	 * @return
	 */
	List<String> selectHouseName(String string);

	/**
	 * 查询房屋基本信息
	 * 
	 * @param hi_code
	 * @return
	 */
	HouseHouseInformation selectHouseByName(String hi_code);

	/**
	 * 添加存房房屋基本信息
	 * 
	 * @param houseInfoKeep
	 * @return
	 */
	int addHouseHouseInformationKeep(HouseInfoKeep houseInfoKeep);

	/**
	 * 发布房屋
	 * 
	 * @param houseInfoKeep
	 * @return
	 */
	int addHouseInformation(HouseInfoKeep houseInfoKeep);

	/**
	 * 验证房屋编码有效性
	 * 
	 * @author JiangQT
	 * @param houseInformation
	 *            {@link HouseHouseInformation#hi_code} 房屋编码
	 * @return
	 */
	String isValidHouseByHiCodeDao(HouseHouseInformation houseInformation);

	List<HouseInformation> queryHouseID(HouseInformation houseInformation);

	List<HouseInfoKeep> queryHouseCode(HouseHouseInformation information);

	/**
	 * 查询所有存房库房屋code
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<HouseInfoKeep> selectHouseCodeALL();

	/**
	 * 根据houseName查询房屋编码
	 * 
	 * @param houseName
	 * @return
	 */
	List<String> selectCodeByName(String houseName);

	/**
	 * 根据发布房屋编码查询发布房屋id
	 * 
	 * @param hi_code
	 * @return
	 */
	int slelctIdByCode(String hi_code);

	List<HouseHouseInformation> queryHouseInfo(HouseHouseInformation information);

	/**
	 * 根据品牌查询未设排序编码的房屋
	 * 
	 * @param pageNo
	 * @param cookies
	 * @param houseModel
	 * @return
	 */
	PageModel<HouseHouseInformation> houseSort(int pageNo, int cookies, HouseModel houseModel);

	/**
	 * 根据品牌查询设置排序编码的房屋
	 * 
	 * @param hb_id
	 * @return
	 */
	List<HouseHouseInformation> selecthouseSort(int hb_id);

	/**
	 * 修改房屋排序码
	 * 
	 * @param hi_id
	 * @param num
	 * @return
	 */
	int updateHouseSort(int hi_id, int num);

	/**
	 * 根据品牌把第八个改为null
	 * 
	 * @param brand
	 * @return
	 */
	int updateHouseSorts(String brand);

	/**
	 * 修改房屋排序码下移
	 * 
	 * @param brand
	 * @param s
	 * @param s2
	 * @return
	 */
	int updateHouseSortDown(String brand, String s, int s2);

	/**
	 * 修改房屋排序码上移
	 * 
	 * @param brand
	 * @param sort
	 * @param hi_id
	 * @param s
	 * @return
	 */
	int updateHouseShiftUp(String brand, String sort, String hi_id, int s);

	/**
	 * 根据品牌查询最大的排序码
	 * 
	 * @param brand
	 * @return
	 */
	int selectNumber(String brand);

	int updateHouseContractState(HouseInfoKeep informationKeep);

	/**
	 * 通过房屋编码查询出房库信息
	 * 
	 * @author JiangQT
	 * @param hi_code
	 * @return
	 */
	HouseHouseInformation selectHouseInfoByCode(String hi_code);

	int updateHouseExtendedState(HouseExtendedVo extendedVo);

	String isAppointHouseType(HouseInfoKeep informationKeep);

	/**
	 * 查询同类型公寓是否已在线上房源库
	 * 
	 * @author zoe
	 * @param houseInfoKeep
	 * @return
	 */
	HouseHouseInformation selectGy(HouseInfoKeep houseInfoKeep);

	List<ViewProductHousePropertyListVo> queryViewProductHousePropertyList(Pagination<ViewProductHousePropertyListVo> pagination);

	/**
	 * 查询【租赁】房屋信息列表总条数
	 * 
	 * @author JiangQT
	 * @param pagination
	 * @return
	 */
	int queryViewProductHousePropertyListTotalRecords(Pagination<ViewProductHousePropertyListVo> pagination);

	/**
	 * APP查询存房库的数据，并分页排序
	 * 
	 * @param houseInformationKeepVo
	 * @return
	 */
	List<HouseInformationKeepVo> queryAPPHouseList(HouseInformationKeepVo houseInformationKeepVo);
	
	/**
	 * APP查询部门存房库的数据，并分页排序
	 * 
	 * @param houseInformationKeepVo
	 * @return
	 */
	List<HouseInformationKeepVo> queryAPPHouseListDepartment(HouseInformationKeepVo houseInformationKeepVo);

	/**
	 * APP根据房屋编码查询房屋
	 * 
	 * @param houseInformationKeepVo
	 * @return
	 */
	HouseInformationKeepVo queryAPPHouseListCode(HouseInformationKeepVo houseInformationKeepVo);

	/**
	 * 房屋配置
	 *
	 * @param facility
	 * @return
	 */
	List<Facility> queryHouseInformationFacility(Facility facility);

	/**
	 * 更新线上房源
	 * 
	 * @作者 JiangQT
	 * @日期 2016年7月5日
	 *
	 * @param houseInfoKeep
	 * @return
	 */
	int updateOnlineHouseInfo(HouseInfoKeep houseInfoKeep);
	
	/**
	 * 查询房屋管家
	 * 
	 * @param hi_code
	 * @return
	 * @author 王孝元
	 */
	UserCenterEmployee queryHouseWaiterInfo(String hi_code);

	/**
	 * 更新房源状态
	 * @param houseInfoKeep
	 * @return
	 */
	int updateHouseInformationKeep(HouseInfoKeep houseInfoKeep);
	
	/**
	 * 插入数据
	 * @param landlordSeeLog
	 * @return
	 */
	int addLandlordSeeLog(LandlordSeeLog landlordSeeLog);
	
	/**
	 * 查询该管家当天查看不属于自己房源的房东信息次数
	 * @param landlordSeeLog
	 * @return
	 */
	List<LandlordSeeLog> queryLandlordSeeLogCountByEmId(LandlordSeeLog landlordSeeLog);
	
	/**
	 * 根据hi_code查询房屋状态
	 * @author tanglei
	 * @Date 2017年8月2日  上午10:03:55
	 */
	HouseInfoKeep selectHouseInformationKeep (HouseInfoKeep houseInfoKeep);

	/**
	 * 房屋信息
	 * @Author tanglei
	 */
	HouseInformation queryHouseInformationSelect(HouseInformation houseInformation);

	/**
	 * 查询线上房源内容图片
	 * @author tanglei
	 */
	List<HouseImage> queryHouseInformationImage(HouseImage houseImage);

	int addRentHouseFile(RentHouseFileVo rentHouseFileVo);

	List<ViewHouseLibraryInfoVo> queryHouseInformationKeepList();

	int insertRentTelephoneRecordsVo(RentTelephoneRecordsVo rentTelephoneRecordsVo);

	RentHouseVo queryRentHouseVo(RentHouseVo rentHouseVo);
	List<RentHouseFileVo> queryRentHouseFileVoList(RentHouseFileVo rentHouseFileVo);
	int updataRentHouseVo(RentHouseVo rentHouseVo);

	int addRentHouseVo(RentHouseVo rentHouseVo);

	/**
	 * 房源发布渠道及状态
	 * @author tanglei
	 */
	List<HousePublish> queryHousePublish (HousePublish housePublish);

	/**
	 * 根据hi_code查询线上房源
	 * @author tanglei
	 */
	HouseInfoKeep queryHouseOnline (HouseInfoKeep houseInfoKeep);

	/**
	 * 查询房屋类型
	 * @author tanglei
	 */
	HouseInformationStateRelation queryHouseInformationStateRelation (HouseInformationStateRelation houseInformationStateRelation);
}
