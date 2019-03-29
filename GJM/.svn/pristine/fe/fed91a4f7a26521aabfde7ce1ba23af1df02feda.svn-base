package com.gjp.dao;

import com.gjp.model.*;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import com.gjp.util.Pagination;
import com.gjp.util.TableList;

import java.util.List;

/**
 * 房屋库dao
 *
 * @author zoe
 */
public interface HouseLibraryDao {

    /**
     * 查询所有房屋基本信息
     *
     * @param houseModel
     * @return
     */
    PageModel<HouseInfoKeep> selectHouseHouseInformation(int pageNo, int pageSize, HouseModel houseModel);

    /**
     * 分页查询部门房屋基本信息
     *
     * @param houseModel
     * @return
     */
    PageModel<HouseInfoKeep> selectHouseHouseInformationSale(int pageNo, int pageSize, HouseModel houseModel);

    /**
     * ajax查询房屋扩展信息
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
    HouseInfoKeep selectHouseById(int hi_id);

    /**
     * 根据房屋code查询房屋归属人以及部门主管
     *
     * @return
     */
    HouseInfoKeep selectHouseAscriptions(HouseInfoKeep houseInfoKeep);

    /**
     * 修改房屋基本信息
     *
     * @param houseInfoKeep
     * @return
     */
    int upDataHouse(HouseInfoKeep houseInfoKeep);

    /**
     * 查询我的房屋信息
     *
     * @param pageNo
     * @param pageSize
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
     * @param houseInformation
     * @return
     */
    HouseHouseInformation selectHouseByName(HouseHouseInformation houseInformation);

    /**
     * 添加存房房屋基本信息
     *
     * @param houseInfoKeep
     * @return
     */
    int addHouseHouseInformationKeep(HouseInfoKeep houseInfoKeep);

    /**
     * 查询存房库
     *
     * @param phi_id
     * @return
     */
    HouseInfoKeep selectHouseHouseInformationKeepByPhiId(int phi_id);

    /**
     * 查询招租房源
     *
     * @param
     * @return
     */
    List<HouseInfoKeep> selectForRentHouseInformationKeep();

    /**
     * 根据时间查询存房包修费
     *
     * @return
     */
    List<HouseInfoKeep> selectHouseGuaranteeCost(HouseInfoKeep houseInfoKeep);

    /**
     * 发布房屋
     *
     * @param hi_id
     * @return
     */
    int updataHeState(int hi_id);

    /**
     * 根据房屋编号修改对应的库存房屋信息
     *
     * @param houseInfoKeep
     * @return
     */
    int upDataKeepHouse(HouseInfoKeep houseInfoKeep);

    /**
     * 根据发布房屋编码查询库存房屋id
     *
     * @param hi_code
     * @return
     */
    int slelctIdByCode(String hi_code);

    /**
     * 根据房屋编码查询房屋信息
     *
     * @param hi_code
     * @return
     * @author JiangQT
     */
    HouseInfoKeep selectHouseInfoByCode(String hi_code);

    /**
     * 根据房屋编码查询房屋信息
     *
     * @return
     * @author JiangQT
     */
    List<HouseInfoKeep> selectHouseForRent(HouseInfoKeep houseInfoKeep);

    /**
     * 查询所有招租房源
     *
     * @return
     * @author 陈智颖
     */
    List<HouseInfoKeep> selectHouseForRentList(HouseInfoKeep houseInfoKeep);

    /**
     * 查询所有房屋归属
     *
     * @return
     * @author JiangQT
     */
    List<HouseInfoKeep> selectHouseAscription();

    /**
     * 查询合同到期时间
     *
     * @return
     * @author JiangQT
     */
    HouseInfoKeep selectHouseAscriptionContract(HouseInfoKeep houseInfoKeep);

    /**
     * 查询房屋配置类型列表
     *
     * @param typeVo
     * @return
     * @author JiangQT
     */
    List<HouseTypeVo> queryHouseConfigTypeList(HouseTypeVo typeVo);

    /**
     * 通过房屋编码查询房屋物业信息
     *
     * @param propertyListVo
     * @return
     * @author JiangQT
     */
    ViewProductHousePropertyListVo queryViewProductHousePropertyByHiCode(ViewProductHousePropertyListVo propertyListVo);

    /**
     * 查询房屋物业信息列表
     *
     * @param pagination
     * @return
     * @author JiangQT
     */
    List<ViewProductHousePropertyListVo> queryViewProductHousePropertyList(Pagination<ViewProductHousePropertyListVo> pagination);

    /**
     * 查询离职人员房屋
     *
     * @return
     * @author chen
     * @date Jan 9, 2017 3:11:10 PM
     */
    List<PositionRecordVo> selectEMstate(PositionRecordVo positionRecordVo);

    /**
     * 根据物业查询公寓基本信息
     *
     * @param userCenterPropertyInfo
     * @return
     * @author zoe
     */
    HouseInfoKeep selectApartmentByPro(PropertyInfo userCenterPropertyInfo);

    int updateHouseContractState(HouseInfoKeep informationKeep);

    List<ViewProductHousePropertyListVo> queryViewProductHousePropertyByHbNameList(ViewProductHousePropertyListVo propertyListVo);

    HoueFollowContent queryHouseFollowContent(HoueFollowContent followContent);

    /**
     * 查询房屋信息列表总条数
     *
     * @param pagination
     * @return
     * @author JiangQT
     */
    int queryViewProductHousePropertyListTotalRecords(Pagination<ViewProductHousePropertyListVo> pagination);

    /**
     * 添加公寓前查询重复
     *
     * @param houseInfoKeeps
     * @return
     * @author zoe
     */
    HouseInfoKeep selectHouseNum(HouseInfoKeep houseInfoKeeps);

    /**
     * 查询房屋部门所属
     *
     * @param positionRecordVo
     * @return
     */
    PositionRecordVo queryContractPositionRecord(PositionRecordVo positionRecordVo);

    /**
     * 添加房屋部门关系数据
     *
     * @param positionRecordVo
     * @return
     */
    int addHousePositionRecord(PositionRecordVo positionRecordVo);

    /**
     * 根据房屋编码修改最新管家
     *
     * @param positionRecordVo
     * @return
     * @author 陈智颖
     */
    int updateHousePositionRecords(PositionRecordVo positionRecordVo);

    /**
     * 更新房屋部门关系数据
     *
     * @param positionRecordVo
     * @return
     */
    int updateHousePositionRecord(PositionRecordVo positionRecordVo);

    /**
     * 查询存房房源信息
     *
     * @param houseLibraryInfoVo
     * @return
     * @作者 JiangQT
     * @日期 2016年6月4日
     */
    ViewHouseLibraryInfoVo queryHouseLibraryInfo(ViewHouseLibraryInfoVo houseLibraryInfoVo);

    /**
     * 更新房屋信息
     *
     * @param houseInformationKeep
     * @return
     * @作者 JiangQT
     * @日期 2016年6月8日
     */
    int updateHouseInfo(HouseInfoKeep houseInformationKeep);

    /**
     * 更新库存房源
     *
     * @return
     * @author 王孝元
     */
    int updateHouseInfoByOnlineHouse(HouseHouseInformation houseInformation);

    /**
     * 更新房屋扩展信息
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年6月8日
     */
    int updateExtendInfo(HouseExtendedVo houseExtended);

    /**
     * 该房源是否有已存在
     *
     * @param houseInformationKeep
     * @return
     * @作者 JiangQT
     * @日期 2016年6月9日
     */
    List<HouseInfoKeep> isHavingHouseInfo(HouseInfoKeep houseInformationKeep);

    /**
     * 查询所有房屋
     *
     * @return
     * @author chen
     * @date Jan 3, 2017 10:44:54 PM
     */
    List<HouseInfoKeep> selectHouseInfoAll();

    /**
     * 分页查询房屋列表信息
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年6月15日
     */
    Pagination<HouseInfoKeep> queryHouseLibraryInfoPageList(Pagination<HouseInfoKeep> pagination);

    /**
     * 分页查询房屋列表信息数据条数
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年6月15日
     */
    int queryHouseLibraryInfoPageRecords(Pagination<HouseInfoKeep> pagination);

    /**
     * 分页查询房源成交列表数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年6月16日
     */
    List<ViewHouseDealListVo> queryHouseDealPageList(Pagination<ViewHouseDealListVo> pagination);

    /**
     * 分页查询房源成交所有列表数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年6月16日
     */
    Pagination<ViewHouseDealListVo> queryHouseDealAllPageList(Pagination<TableList> pagination);

    /**
     * 查询房屋图片
     *
     * @param houseLibraryImageVo
     * @return
     * @作者 JiangQT
     * @日期 2016年6月20日
     */
    List<HouseImageVo> queryHouseImageList(HouseImageVo houseLibraryImageVo);

    int addHouseStateRelation(HouseInformationStateRelation stateRelation);

    int deleteHouseStateRelation(HouseInformationStateRelation stateRelation);

    /**
     * 查询房屋成交和业绩排名
     *
     * @param rankingVo
     * @return
     * @作者 JiangQT
     * @日期 2016年7月7日
     */
    List<ViewHouseRankingVo> queryHouseRankingList(ViewHouseRankingVo rankingVo);

    /**
     * 添加房屋图片类型
     *
     * @param imageTypeVo
     * @return
     * @作者 JiangQT
     * @日期 2016年7月13日
     */
    int addHouseImageType(HouseLibraryImageTypeVo imageTypeVo);

    /**
     * 查询物品类型（家具/家电/灯具/洁具等）
     *
     * @return
     * @author zoe
     */
    List<HouseTypeVo> selectHouseTypeHtParentID2();

    /**
     * 查询钥匙库
     *
     * @param houseKey
     * @return
     * @作者 JiangQT
     * @日期 2016年8月14日
     */
    houseKeyVo queryHouseKeyInfo(houseKeyVo houseKey);

    /**
     * 添加钥匙
     *
     * @param houseKeyVo
     * @return
     * @作者 JiangQT
     * @日期 2016年8月14日
     */
    int addHouseKey(houseKeyVo houseKeyVo);

    /**
     * 更新钥匙
     *
     * @param houseKeyVo
     * @return
     * @作者 JiangQT
     * @日期 2016年8月14日
     */
    int updateHouseKey(houseKeyVo houseKeyVo);

    /**
     * 查询房屋分配分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年8月25日
     */
    Pagination<ViewHouseAllotVo> queryHouseAllotPageList(Pagination<TableList> pagination);

    /**
     * 查询简易房屋信息分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2017年1月7日
     */
    Pagination<ViewHouseLibraryInfoVo> querySimpleHouseInfoPageList(Pagination<ViewHouseLibraryInfoVo> pagination);

    int addHouseImageFolder(HouseImageFolder houseImageFolder);

    HouseImageFolder selectHouseImageFolder(HouseImageFolder houseImageFolder);

    List<HouseImageVo> selectHouseImage(HouseImageVo image);

    List<HouseImageFolder> selectListHouseImageFolder(HouseImageFolder folder);

    /**
     * APP版本号
     *
     * @param appCode
     * @return
     * @author 陈智颖
     * @date Apr 23, 2017 2:03:00 PM
     */
    List<AppCode> appcode(AppCode appCode);

    List<HouseInfoKeep> queryAllHouseInfoList(Pagination<HouseInfoKeep> pagination);

    Integer queryAllHouseInfoListCount(Pagination<HouseInfoKeep> pagination);

    /**
     * 更新商品房源
     *
     * @param houseInformation
     * @return
     */
    int updateCommodityHouse(HouseInfoKeep houseInformation);

    /**
     * 更新商品房源
     *
     * @param houseInformation
     * @return
     */
    int updateInventoryHouse(HouseInfoKeep houseInformation);

    /**
     * 查询图片
     */
    List<HouseImage> selectHouseImages();

    /**
     * 更新房屋图片
     */
    int updateHouseImage(HouseImage houseImage);

    /**
     * @param positionCompanyVo
     * @return
     */
    HousePositionCompanyVo queryHouseCompanyInfo(HousePositionCompanyVo positionCompanyVo);

    /**
     * 查询版本控制记录
     *
     * @param appVersionVo
     * @return
     */
    List<AppVersionVo> queryAppVersionList(AppVersionVo appVersionVo);

    /**
     * 查询最新版本
     *
     * @param appVersionVo
     * @return
     */
    AppVersionVo queryAppVersionLast(AppVersionVo appVersionVo);

    /**
     * 房屋发布审核
     * @author tanglei
     */
    Pagination<HouseInfoKeep> queryHouseExamineList(Pagination<HouseInfoKeep> pagination);

    /**
     * 房源发布
     * @author tanglei
     */
    int addhousePublish (HousePublish housePublish);

    /**
     * 修改房屋发布
     * @author tangeli
     */
    int updateHousePublish (HousePublish housePublish);

    /**
     * 房源发布渠道
     * @author tanglei
     */
    List<HousePublishChannel> queryHousePublishChannel (HousePublishChannel housePublishChannel);

    /**
     * 根据房屋code查询此房屋发布渠道
     * @author tanglei
     */
    List<HousePublish> housePublisheList (HousePublish housePublish);

    /**
     * 根据房屋code和渠道code查询是否发布此渠道
     * @author tangeli
     */
    HousePublish housePublish (HousePublish housePublish);

    /**
     * 查询支付宝租房图片
     * @param rentHouseFileVo
     * @return
     */
    List<RentHouseFileVo> queryRentHouseFile(RentHouseFileVo rentHouseFileVo);

    /**
     * 初始化查询当前招租房源，同步至支付宝
     * @return
     */
    List<ViewHouseLibraryInfoVo> queryInitRentHouseList();

    /**
     * 查询支付宝房源同步数量
     * @return
     */
    Integer queryRentHouseCount();

    /**
     *根据客户code查询房屋
     */
    List<HouseInfoKeep> selecthouseList(HouseInfoKeep houseInfoKeep);

    /**
     * 删除已发布的房源状态
     */
    Integer deleteHousePublishState (HousePublish housePublish);

    int delRentHouseFile(String hi_code);

    /**
     * 添加利润亏损记录
     * @param houseGrossProfitVo
     * @return
     */
    int addGrossProfit(HouseGrossProfitVo houseGrossProfitVo);

    /**
     * 更新利润亏损
     * @param houseGrossProfitVo
     * @return
     */
    int updateGrossProfit(HouseGrossProfitVo houseGrossProfitVo);

    /**
     * 查询房源利润亏损小计
     * @param houseGrossProfitVo
     * @return
     */
    List<HouseGrossProfitVo> queryGPSubtotalByCode(HouseGrossProfitVo houseGrossProfitVo);

    /**
     * 分页查询利润亏损记录
     * @param pagination
     * @return
     */
    Pagination<HouseGrossProfitVo> queryGrossProfitByCode(Pagination<HouseGrossProfitVo> pagination);

    /**
     * 根据房源code查询条数
     * @param pagination
     * @return
     */
    int queryGrossProfitCountByCode(Pagination<HouseGrossProfitVo> pagination);

    /**
     * 查询空置房
     * @return
     */
    List<HouseInfoKeep> queryVacantHouseList();

    /**
     * 查询房源是否有正在记录中的空置期亏损记录
     * @param houseGrossProfitVo
     * @return
     */
    HouseGrossProfitVo queryGrossDoing(HouseGrossProfitVo houseGrossProfitVo);

    /**
     * 查询房源指定类型记录
     * @param houseGrossProfitVo
     * @return
     */
    List<HouseGrossProfitVo> queryGrossListByCode(HouseGrossProfitVo houseGrossProfitVo);

    int addGrossProfitRela(HouseGrossProfitRelaVo houseGrossProfitRelaVo);

    int updateGrossProfitRela(HouseGrossProfitRelaVo houseGrossProfitRelaVo);

    HouseGrossProfitRelaVo queryGPRById(HouseGrossProfitRelaVo houseGrossProfitRelaVo);

    List<HouseGrossProfitRelaVo> queryGPRByCode(HouseGrossProfitRelaVo houseGrossProfitRelaVo);
}
