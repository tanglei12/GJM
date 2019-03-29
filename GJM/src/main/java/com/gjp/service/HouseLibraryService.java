package com.gjp.service;

import com.gjp.dao.*;
import com.gjp.model.*;
import com.gjp.util.*;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 房源库service
 *
 * @author zoe
 */
@Service
public class HouseLibraryService {

    private @Resource
    HouseLibraryDao houseLibraryDao;
    private @Resource
    PropertyInfoDAO propertyInfoDAO;
    private @Resource
    RecordDao recordDao;
    private @Resource
    PriceSettingDAO priceSettingDAO;
    private @Resource
    HousingAllocationDao housingAllocationDao;
    private @Resource
    AchievementCompanyDAO achievementCompanyDAO;
    //房屋信息
    private @Resource
    HouseInformationService houseInformationService;
    private @Resource
    CustomerService customerService;
    private @Resource
    HouseExtendedService houseExtendedService;
    // 结算单
    private @Resource
    UserCenterStatementService statementService;
    private @Resource
    ContractService contractService;
    private @Resource
    ContractService contractObjectService;


    /**
     * 查询所有房屋基本信息
     *
     * @param houseModel
     * @return
     */
    public PageModel<HouseInfoKeep> selectHouseHouseInformation(int pageNo, int pageSize, HouseModel houseModel) {
        return houseLibraryDao.selectHouseHouseInformation(pageNo, pageSize, houseModel);
    }

    /**
     * 查询所有部门房屋基本信息
     *
     * @param houseModel
     * @return
     */
    public PageModel<HouseInfoKeep> selectHouseHouseInformationSale(int pageNo, int pageSize, HouseModel houseModel) {
        return houseLibraryDao.selectHouseHouseInformationSale(pageNo, pageSize, houseModel);
    }

    /**
     * ajax查询房屋扩展信息
     *
     * @param id
     * @return
     */
    public HouseHouseExtended selectHouseExtendedById(int id) {
        return houseLibraryDao.selectHouseExtendedById(id);
    }

    /**
     * 添加房屋基础信息
     *
     * @param houseHouseInformation
     * @return
     */
    public int addHouse(HouseHouseInformation houseHouseInformation) {
        return houseLibraryDao.addHouse(houseHouseInformation);
    }

    /**
     * 根据id查询房屋基本信息
     *
     * @param hi_id
     * @return
     */
    public HouseInfoKeep selectHouseById(int hi_id) {
        return houseLibraryDao.selectHouseById(hi_id);
    }

    /**
     * 修改房屋基本信息
     *
     * @param houseInfoKeep
     * @return
     */
    public int upDataHouse(HouseInfoKeep houseInfoKeep) {
        return houseLibraryDao.upDataHouse(houseInfoKeep);
    }

    /**
     * 查询我的房屋基本信息
     *
     * @param pageNo
     * @param pageSize
     * @param houseModel
     * @return
     */
    public PageModel<HouseInfoKeep> MyInformationPage(int pageNo, int pageSize, HouseModel houseModel) {
        return houseLibraryDao.MyInformationPage(pageNo, pageSize, houseModel);
    }

    /**
     * 根据houseName查询房屋id
     *
     * @param houseName
     * @return
     */
    public List<Integer> selectHiIdByName(String houseName) {
        return houseLibraryDao.selectHiIdByName(houseName);
    }

    /**
     * 根据房屋编码查询房屋名称
     *
     * @param hi_code
     * @return
     */
    public String selectHouseByCode(String hi_code) {
        return houseLibraryDao.selectHouseByCode(hi_code);
    }

    /**
     * 查询房屋名称List
     *
     * @param string
     * @return
     */
    public List<String> selectHouseName(String string) {
        return houseLibraryDao.selectHouseName(string);
    }

    /**
     * 查询房屋基本信息
     *
     * @param houseInformation
     * @return
     */
    public HouseHouseInformation selectHouseByName(HouseHouseInformation houseInformation) {
        return houseLibraryDao.selectHouseByName(houseInformation);
    }

    /**
     * 添加存房房屋基本信息
     *
     * @param houseInfoKeep
     * @return
     */
    public int addHouseHouseInformationKeep(HouseInfoKeep houseInfoKeep) {
        return houseLibraryDao.addHouseHouseInformationKeep(houseInfoKeep);
    }

    /**
     * 查询存房库
     *
     * @return
     */
    public HouseInfoKeep selectHouseHouseInformationKeepByPhiId(int phi_id) {
        return houseLibraryDao.selectHouseHouseInformationKeepByPhiId(phi_id);
    }

    /**
     * 发布房屋
     *
     * @return
     */
    public int updataHeState(int hi_id) {
        return houseLibraryDao.updataHeState(hi_id);
    }

    /**
     * 根据房屋编号修改对应的库存房屋信息
     *
     * @return
     */
    public int upDataKeepHouse(HouseInfoKeep houseInfoKeep) {
        return houseLibraryDao.upDataKeepHouse(houseInfoKeep);
    }

    /**
     * 根据发布房屋编码查询库存房屋id
     *
     * @param hi_code
     * @return
     */
    public int slelctIdByCode(String hi_code) {
        return houseLibraryDao.slelctIdByCode(hi_code);
    }

    public HouseInfoKeep selectHouseInfoByCode(String hi_code) {
        return houseLibraryDao.selectHouseInfoByCode(hi_code);
    }

    /**
     * 查询所有房屋
     *
     * @return
     * @author chen
     * @date Jan 3, 2017 10:46:36 PM
     */
    public List<HouseInfoKeep> selectHouseInfoAll() {
        return houseLibraryDao.selectHouseInfoAll();
    }

    public List<HouseTypeVo> queryHouseConfigTypeList(HouseTypeVo typeVo) {
        return houseLibraryDao.queryHouseConfigTypeList(typeVo);
    }

    /**
     * 通过房屋编码查询房屋物业信息
     *
     * @param propertyListVo
     * @return
     * @author JiangQT
     */
    public ViewProductHousePropertyListVo queryViewProductHousePropertyByHiCode(ViewProductHousePropertyListVo propertyListVo) {
        return houseLibraryDao.queryViewProductHousePropertyByHiCode(propertyListVo);
    }

    /**
     * 查询房屋物业信息列表(存房)
     *
     * @param pagination
     * @return
     * @author JiangQT
     */
    public List<ViewProductHousePropertyListVo> queryViewProductHousePropertyList(Pagination<ViewProductHousePropertyListVo> pagination) {
        return houseLibraryDao.queryViewProductHousePropertyList(pagination);
    }

    /**
     * 根据物业查询公寓基本信息
     *
     * @param userCenterPropertyInfo
     * @return
     * @author zoe
     */
    public HouseInfoKeep selectApartmentByPro(PropertyInfo userCenterPropertyInfo) {
        return houseLibraryDao.selectApartmentByPro(userCenterPropertyInfo);
    }

    public boolean updateHouseContractState(HouseInfoKeep informationKeep) {
        return houseLibraryDao.updateHouseContractState(informationKeep) > 0;
    }

    public List<ViewProductHousePropertyListVo> queryViewProductHousePropertyByHbNameList(ViewProductHousePropertyListVo propertyListVo) {
        return houseLibraryDao.queryViewProductHousePropertyByHbNameList(propertyListVo);
    }

    public HoueFollowContent queryHouseFollowContent(HoueFollowContent followContent) {
        return houseLibraryDao.queryHouseFollowContent(followContent);
    }

    /**
     * 查询【存房】房屋信息列表总条数
     *
     * @param pagination
     * @return
     * @author JiangQT
     */
    public int queryViewProductHousePropertyListTotalRecords(Pagination<ViewProductHousePropertyListVo> pagination) {
        return houseLibraryDao.queryViewProductHousePropertyListTotalRecords(pagination);
    }

    /**
     * 添加公寓前查询重复
     *
     * @param houseInfoKeeps
     * @return
     * @author zoe
     */
    public HouseInfoKeep selectHouseNum(HouseInfoKeep houseInfoKeeps) {
        return houseLibraryDao.selectHouseNum(houseInfoKeeps);
    }

    /**
     * 招租房源
     *
     * @param houseInfoKeeps
     * @return
     * @author 陈智颖
     */
    public List<HouseInfoKeep> selectHouseForRent(HouseInfoKeep houseInfoKeeps) {
        return houseLibraryDao.selectHouseForRent(houseInfoKeeps);
    }

    /**
     * 招租所有房源
     *
     * @param houseInfoKeeps
     * @return
     * @author 陈智颖
     */
    public List<HouseInfoKeep> selectHouseForRentList(HouseInfoKeep houseInfoKeeps) {
        return houseLibraryDao.selectHouseForRentList(houseInfoKeeps);
    }

    /**
     * 查询所有房屋归属
     *
     * @return
     * @author 陈智颖
     */
    public List<HouseInfoKeep> selectHouseAscription() {
        return houseLibraryDao.selectHouseAscription();
    }

    /**
     * 查询合同到期时间
     *
     * @param houseInfoKeeps
     * @return
     * @author 陈智颖
     */
    public HouseInfoKeep selectHouseAscriptionContract(HouseInfoKeep houseInfoKeeps) {
        return houseLibraryDao.selectHouseAscriptionContract(houseInfoKeeps);
    }

    /**
     * 根据时间查询存房包修费
     *
     * @return
     * @author 陈智颖
     */
    public List<HouseInfoKeep> selectHouseGuaranteeCost(HouseInfoKeep houseInfoKeep) {
        return houseLibraryDao.selectHouseGuaranteeCost(houseInfoKeep);
    }

    /**
     * 查询房屋部门所属
     *
     * @param positionRecordVo
     * @return
     */
    public PositionRecordVo queryContractPositionRecord(PositionRecordVo positionRecordVo) {
        return houseLibraryDao.queryContractPositionRecord(positionRecordVo);
    }

    /**
     * 查询离职人员房屋
     *
     * @return
     * @author chen
     * @date Jan 9, 2017 3:11:59 PM
     */
    public List<PositionRecordVo> selectEMstate(PositionRecordVo positionRecordVo) {
        return houseLibraryDao.selectEMstate(positionRecordVo);
    }

    public boolean addHousePositionRecord(PositionRecordVo positionRecordVo) {
        return houseLibraryDao.addHousePositionRecord(positionRecordVo) > 0;
    }

    public boolean updateHousePositionRecord(PositionRecordVo positionRecordVo) {
        return houseLibraryDao.updateHousePositionRecord(positionRecordVo) > 0;
    }

    /**
     * 查询存房房源信息
     *
     * @param houseLibraryInfoVo
     * @return
     * @作者 JiangQT
     * @日期 2016年6月4日
     */
    public ViewHouseLibraryInfoVo queryHouseLibraryInfo(ViewHouseLibraryInfoVo houseLibraryInfoVo) {
        return houseLibraryDao.queryHouseLibraryInfo(houseLibraryInfoVo);
    }

    /**
     * 查询存房房源信息
     *
     * @param hi_code
     * @return
     * @作者 JiangQT
     * @日期 2016年7月25日
     */
    public ViewHouseLibraryInfoVo queryHouseLibraryInfo(String hi_code) {
        ViewHouseLibraryInfoVo houseLibraryInfoVo = new ViewHouseLibraryInfoVo();
        houseLibraryInfoVo.setHi_code(hi_code);
        return houseLibraryDao.queryHouseLibraryInfo(houseLibraryInfoVo);
    }

    /**
     * 更新房屋信息
     *
     * @param houseHouseExtended
     * @return
     * @作者 JiangQT
     * @日期 2016年6月8日
     */
    public boolean updateHouseInfo(HouseInfoKeep houseInformationKeep, HouseExtendedVo houseHouseExtended) {
        int count;
        if (houseInformationKeep == null) { // || houseHouseExtended == null
            return false;
        }
        String hb_list = houseInformationKeep.getHb_list();
        if (!StringUtils.isEmpty(hb_list)) {
            HouseInformationStateRelation stateRelation = new HouseInformationStateRelation();
            stateRelation.setHi_code(houseInformationKeep.getHi_code());
            houseLibraryDao.deleteHouseStateRelation(stateRelation);
            String[] split = hb_list.split(",");
            for (String str : split) {
                stateRelation = new HouseInformationStateRelation();
                stateRelation.setHi_code(houseInformationKeep.getHi_code());
                stateRelation.setHis_id(Integer.valueOf(str));
                houseLibraryDao.addHouseStateRelation(stateRelation);
            }
        }
        PropertyInfo propertyInfo = new PropertyInfo();
        propertyInfo.setPropertyInfo_Id(houseInformationKeep.getPropertyInfo_Id());
        propertyInfo = propertyInfoDAO.selectPropertyInfoByWhere(propertyInfo);
        if (propertyInfo != null) {
            houseInformationKeep.setHi_latitude(propertyInfo.getPropertyInfo_coordinate());
        }

        //【查询最新的客户姓名】
        UserCustomer userCustomer=customerService.queryCustomerInfo(houseInformationKeep.getCc_code());
        houseInformationKeep.setHi_peopleName(userCustomer.getCc_name());
        HouseInfoKeep houseInfoKeep=new HouseInfoKeep();
        houseInfoKeep.setHi_code(houseInformationKeep.getHi_code());
        //查询房屋信息获取he_id
        houseInfoKeep=housingAllocationDao.selectHouseInformationKeep(houseInfoKeep);
        HouseHouseExtended houseExtend=houseExtendedService.selectHouseExtendedById(houseInfoKeep.getHe_id());
        houseExtend.setHe_peopleName(userCustomer.getCc_name());
        houseExtendedService.updataInfo(houseExtend);

        // 更新房屋信息
        count = houseLibraryDao.updateHouseInfo(houseInformationKeep);
        // 更新房屋扩展信息
        // count = housingLibraryDao.updateExtendInfo(houseHouseExtended);
        return count > 0;
    }

    public int updateHouseInfos(HouseInfoKeep houseInformationKeep) {
        return houseLibraryDao.updateHouseInfo(houseInformationKeep);
    }

    /**
     * 更新房屋信息
     *
     * @param houseInformation
     * @return
     * @author 王孝元
     */
    public boolean updateHouseInfoByOnlineHouse(HouseHouseInformation houseInformation) {
        return houseLibraryDao.updateHouseInfoByOnlineHouse(houseInformation) > 0;
    }

    /**
     * 该房源是否有已存在
     *
     * @param houseInformationKeep
     * @return
     * @作者 JiangQT
     * @日期 2016年6月9日
     */
    public List<HouseInfoKeep> isHavingHouseInfo(HouseInfoKeep houseInformationKeep) {
        return houseLibraryDao.isHavingHouseInfo(houseInformationKeep);
    }

    /**
     * 分页查询房屋列表信息
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年6月15日
     */
    public Pagination<HouseInfoKeep> queryHouseLibraryInfoPageList(Pagination<HouseInfoKeep> pagination) {
        return houseLibraryDao.queryHouseLibraryInfoPageList(pagination);
    }

    /**
     * 分页查询房屋列表信息数据条数
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年6月15日
     */
    public int queryHouseLibraryInfoPageRecords(Pagination<HouseInfoKeep> pagination) {
        return houseLibraryDao.queryHouseLibraryInfoPageRecords(pagination);
    }

    /**
     * 分页查询房源成交列表数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年6月16日
     */
    public List<ViewHouseDealListVo> queryHouseDealPageList(Pagination<ViewHouseDealListVo> pagination) {
        return houseLibraryDao.queryHouseDealPageList(pagination);
    }

    /**
     * 分页查询房源成交所有列表数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年6月16日
     */
    public Pagination<ViewHouseDealListVo> queryHouseDealAllPageList(Pagination<TableList> pagination) {
        return houseLibraryDao.queryHouseDealAllPageList(pagination);
    }

    /**
     * 查询房屋图片
     *
     * @param houseLibraryImageVo
     * @return
     * @作者 JiangQT
     * @日期 2016年6月20日
     */
    public List<HouseImageVo> queryHouseImageList(HouseImageVo houseLibraryImageVo) {
        return houseLibraryDao.queryHouseImageList(houseLibraryImageVo);
    }

    public boolean addHouseStateRelation(HouseInformationStateRelation stateRelation) {
        return houseLibraryDao.addHouseStateRelation(stateRelation) > 0;
    }

    public boolean deleteHouseStateRelation(HouseInformationStateRelation stateRelation) {
        return houseLibraryDao.deleteHouseStateRelation(stateRelation) > 0;
    }

    /**
     * 查询招租房源
     *
     * @return
     * @author 陈智颖
     */
    public List<HouseInfoKeep> selectForRentHouseInformationKeep() {
        return houseLibraryDao.selectForRentHouseInformationKeep();
    }

    /**
     * 查询房屋成交和业绩排名
     *
     * @param rankingVo
     * @return
     * @作者 JiangQT
     * @日期 2016年7月7日
     */
    public List<ViewHouseRankingVo> queryHouseRankingList(ViewHouseRankingVo rankingVo) {
        return houseLibraryDao.queryHouseRankingList(rankingVo);
    }

    /**
     * 添加房屋图片类型
     *
     * @param imageTypeVo
     * @return
     * @作者 JiangQT
     * @日期 2016年7月13日
     */
    public boolean addHouseImageType(HouseLibraryImageTypeVo imageTypeVo) {
        return houseLibraryDao.addHouseImageType(imageTypeVo) > 0;
    }

    /**
     * 查询钥匙库
     *
     * @param houseKey
     * @return
     * @作者 JiangQT
     * @日期 2016年8月14日
     */
    public houseKeyVo queryHouseKeyInfo(houseKeyVo houseKey) {
        return houseLibraryDao.queryHouseKeyInfo(houseKey);
    }

    /**
     * 添加钥匙
     *
     * @param houseKeyVo
     * @return
     * @作者 JiangQT
     * @日期 2016年8月14日
     */
    public boolean addHouseKey(houseKeyVo houseKeyVo) {
        return houseLibraryDao.addHouseKey(houseKeyVo) > 0;
    }

    /**
     * 更新钥匙
     *
     * @param houseKeyVo
     * @return
     * @作者 JiangQT
     * @日期 2016年8月14日
     */
    public boolean updateHouseKey(houseKeyVo houseKeyVo) {
        return houseLibraryDao.updateHouseKey(houseKeyVo) > 0;
    }

    /**
     * 查询房屋分配分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年8月25日
     */
    public Pagination<ViewHouseAllotVo> queryHouseAllotPageList(Pagination<TableList> pagination) {
        return houseLibraryDao.queryHouseAllotPageList(pagination);
    }

    /**
     * 根据房屋code查询房屋归属人以及部门主管
     *
     * @param houseInfoKeep
     * @return
     * @author 陈智颖
     */
    public HouseInfoKeep selectHouseAscriptions(HouseInfoKeep houseInfoKeep) {
        return houseLibraryDao.selectHouseAscriptions(houseInfoKeep);
    }

    /**
     * 查询简易房屋信息分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2017年1月7日
     */
    public Pagination<ViewHouseLibraryInfoVo> querySimpleHouseInfoPageList(Pagination<ViewHouseLibraryInfoVo> pagination) {
        return houseLibraryDao.querySimpleHouseInfoPageList(pagination);
    }

    /**
     * 创建文件夹
     *
     * @param houseImageFolder
     * @return
     */
    public int addHouseImageFolder(HouseImageFolder houseImageFolder) {
        return houseLibraryDao.addHouseImageFolder(houseImageFolder);

    }

    public HouseImageFolder selectHouseImageFolder(HouseImageFolder houseImageFolder) {
        return houseLibraryDao.selectHouseImageFolder(houseImageFolder);
    }

    public List<HouseImageVo> selectHouseImage(HouseImageVo image) {
        return houseLibraryDao.selectHouseImage(image);
    }

    public List<HouseImageFolder> selectListHouseImageFolder(HouseImageFolder folder) {
        return houseLibraryDao.selectListHouseImageFolder(folder);
    }

    /**
     * APP版本号
     *
     * @param appCode
     * @return
     * @author 陈智颖
     * @date Apr 23, 2017 2:03:00 PM
     */
    public List<AppCode> appcode(AppCode appCode) {
        return houseLibraryDao.appcode(appCode);
    }

    /**
     * 【业务操作】 更新房源定价
     *
     * @param employee
     * @param hi_code
     * @param hi_price
     * @return
     * @throws Exception
     */
    public Msg<Object> updateHousePrice(UserCenterEmployee employee, String hi_code, Double hi_price) throws Exception {
        Msg<Object> msg = new Msg<>();
        ViewHouseLibraryInfoVo libraryInfoVo = queryHouseLibraryInfo(hi_code);
        if (libraryInfoVo == null) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 更新房源系统定价
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        StringBuilder outMoney = new StringBuilder(libraryInfoVo.getPm_outMoney());
        outMoney = new StringBuilder(outMoney == null ? "" : outMoney.toString());
        String[] moneys = outMoney.toString().split("-");
        int y = 0;
        HashMap<String, Integer> data = AppUtil.getYearMonthDayData(sdf.format(libraryInfoVo.getContract_beginDate()), sdf.format(new Date()));
        if (data != null) {
            y = data.get("year") != null ? data.get("year") : 0;
            int m = data.get("month") != null ? data.get("month") : 0;
            int d = data.get("day") != null ? data.get("day") : 0;
            if (m > 0 || d > 0) {
                y++;
            }
        }
        if (moneys.length >= y) {
            moneys[y == 0 ? y : y - 1] = hi_price + "";
        }
        outMoney = new StringBuilder();
        for (int i = 0; i < moneys.length; i++) {
            outMoney.append(moneys[i]).append(i < moneys.length - 1 ? "-" : "");
        }
        PriceMoney priceMoney = new PriceMoney();
        priceMoney.setHi_code(hi_code);
        priceMoney.setPm_outMoney(outMoney.toString());
        int updatePrice = priceSettingDAO.updatePriceMoney(priceMoney);
        if (updatePrice == 0) {
            throw new AppException("更新失败，请重试或联系管理员");
        }

        // 更新房源定价
        HouseInfoKeep houseInfo = new HouseInfoKeep();
        double oldPrice = libraryInfoVo.getHi_price();
        houseInfo.setHi_code(hi_code);
        houseInfo.setHi_price(hi_price);
        houseInfo.setHi_money(hi_price);
        houseInfo.setHi_priceCount(1);
        int update = houseLibraryDao.updateHouseInfo(houseInfo);
        if (update == 0) {
            throw new AppException("更新失败，请重试或联系管理员");
        }

        // 更新线上房源定价
        int updateMoney = housingAllocationDao.updateOnlineHouseInfo(houseInfo);
        if (updateMoney == 0) {
//            throw new AppException("更新失败，请重试或联系管理员");
        }

        // 添加定价记录
        HousePriceRecordVo priceRecordVo = new HousePriceRecordVo();
        priceRecordVo.setHi_code(hi_code);
        priceRecordVo.setHpp_content("该房源由" + oldPrice + "元调整定价为" + hi_price.intValue() + "元");
        priceRecordVo.setHpp_createTime(new Date());
        priceRecordVo.setHpp_operator(employee.getEm_id());
        int add = recordDao.addHousePriceRecord(priceRecordVo);
        if (add == 0) {
            throw new AppException("更新失败，请重试或联系管理员");
        }
        return msg;
    }

    public List<HouseInfoKeep> queryAllHouseInfoList(Pagination<HouseInfoKeep> pagination) {
        return houseLibraryDao.queryAllHouseInfoList(pagination);
    }

    public Integer queryAllHouseInfoListCount(Pagination<HouseInfoKeep> pagination) {
        return houseLibraryDao.queryAllHouseInfoListCount(pagination);
    }

    /**
     * 更新商品房源
     *
     * @param houseInformation
     * @return
     */
    public boolean updateCommodityHouse(HouseInfoKeep houseInformation) {
        return houseLibraryDao.updateCommodityHouse(houseInformation) > 0;
    }

    /**
     * 更新库存房源
     *
     * @param houseInformation
     * @return
     */
    public boolean updateInventoryHouse(HouseInfoKeep houseInformation) {
        return houseLibraryDao.updateInventoryHouse(houseInformation) > 0;
    }

    /**
     * 查询所有图片
     */
    public Map<String, Object> houseImageInsert() {
        List<HouseImage> houseImages = houseLibraryDao.selectHouseImages();
        for (HouseImage houseImage1 : houseImages) {
            HouseImageFolder houseImageFolders = new HouseImageFolder();
            HouseImageFolder houseImageFolder = new HouseImageFolder();
            houseImageFolder.setHi_code(houseImage1.getHi_code());
            if (houseImage1.getHm_createTime() != null) {
                houseImageFolder.setHif_name(1);
            } else {
                houseImageFolder.setHif_name(3);
            }
            HouseImageFolder folder = houseLibraryDao.selectHouseImageFolder(houseImageFolder);
            if (folder == null || "".equals(folder)) {// 文件夹不存在
                houseImageFolder.setHif_createTime(new Date());
                int secceed = houseLibraryDao.addHouseImageFolder(houseImageFolder);// 创建文件夹
                if (secceed > 0) {
                    houseImage1.setHif_id(houseImageFolder.getHif_id());
                }
            } else {
                houseImageFolders = houseLibraryDao.selectHouseImageFolder(houseImageFolder);// 查询文件夹信息
                houseImage1.setHif_id(houseImageFolders.getHif_id());
            }
            houseLibraryDao.updateHouseImage(houseImage1);
        }
        return null;
    }

    /**
     * 查询版本控制记录
     *
     * @param appVersionVo
     * @return
     */
    public List<AppVersionVo> queryAppVersionList(AppVersionVo appVersionVo) {
        return houseLibraryDao.queryAppVersionList(appVersionVo);
    }

    /**
     * 查询最新版本
     *
     * @param appVersionVo
     * @return
     */
    public AppVersionVo queryAppVersionLast(AppVersionVo appVersionVo) {
        return houseLibraryDao.queryAppVersionLast(appVersionVo);
    }

    /**
     * 查询房源归属
     *
     * @param hi_code
     * @return
     */
    public PositionRecordVo queryPositionRecordVo(String hi_code) {
        // 房源部门
        PositionRecordVo positionRecordVo = new PositionRecordVo();
        positionRecordVo.setHi_code(hi_code);
        return achievementCompanyDAO.selectPositionRecord(positionRecordVo);
    }

    public HousePositionCompanyVo queryHouseCompanyInfo(HousePositionCompanyVo positionCompanyVo) {
        return houseLibraryDao.queryHouseCompanyInfo(positionCompanyVo);
    }

    public HousePositionCompanyVo queryHouseCompanyInfo(String hi_code) {
        HousePositionCompanyVo positionCompanyVo = new HousePositionCompanyVo();
        positionCompanyVo.setHi_code(hi_code);
        return houseLibraryDao.queryHouseCompanyInfo(positionCompanyVo);
    }

    /**
     * 房屋发布审核
     *
     * @author tanglei
     */
    public Pagination<HouseInfoKeep> queryHouseExamineList(Pagination<HouseInfoKeep> pagination) {
        return houseLibraryDao.queryHouseExamineList(pagination);
    }

    /**
     * 房源发布
     *
     * @author tanglei
     */
    public int addhousePublish(HousePublish housePublish) {
        return houseLibraryDao.addhousePublish(housePublish);
    }

    /**
     * 修改房屋发布
     *
     * @author tangeli
     */
    public int updateHousePublish(HousePublish housePublish) {
        return houseLibraryDao.updateHousePublish(housePublish);
    }

    /**
     * 房源发布渠道
     *
     * @author tanglei
     */
    public List<HousePublishChannel> queryHousePublishChannel(HousePublishChannel housePublishChannel) {
        return houseLibraryDao.queryHousePublishChannel(housePublishChannel);
    }

    /**
     * 根据房屋code查询此房屋发布渠道
     *
     * @author tanglei
     */
    public List<HousePublish> housePublisheList(HousePublish housePublish) {
        return houseLibraryDao.housePublisheList(housePublish);
    }

    /**
     * 根据房屋code和渠道code查询是否发布此渠道
     *
     * @author tangeli
     */
    public HousePublish housePublish(HousePublish housePublish) {
        return houseLibraryDao.housePublish(housePublish);
    }

    /**
     *根据客户code查询房屋
     */
    public List<HouseInfoKeep> selecthouseList(HouseInfoKeep houseInfoKeep) {
        return houseLibraryDao.selecthouseList(houseInfoKeep);
    }

    /**
     * 删除已发布的房源状态
     */
    public int deleteHousePublishState (HousePublish housePublish) {
        return houseLibraryDao.deleteHousePublishState(housePublish);
    }

    public int addGrossProfit(HouseGrossProfitVo houseGrossProfitVo) throws Exception {
        if(!StringUtils.isEmpty(houseGrossProfitVo.getContractObject_code())){

            ContractInfoVo contractInfo = contractService.queryContractInfo(houseGrossProfitVo.getContractObject_code());
            Date start_date = null;
            Date end_date = null;

            if(AppConfig.TYPE_CONTRACT_201.equals(contractInfo.getContractObject_Type())){
                Map<String, Integer> dateMap = AppUtil.remainDateToMap(DataUtil.DateToStrs(contractInfo.getContractObject_Date()), DataUtil.DateToStrs(contractInfo.getContractObject_DeadlineTime()));
                for(int i = 0; i <= dateMap.get("year"); i++){
                    Date start = DataUtil.getAfterDateByYear("Y", contractInfo.getContractObject_Date(), i);
                    Date end = DataUtil.getAfterDateByYear("Y", contractInfo.getContractObject_Date(), (i + 1));
                    end = end.before(contractInfo.getContractObject_DeadlineTime()) ? end : contractInfo.getContractObject_DeadlineTime();
                    // 结算日期
                    Date date = new Date();
                    if(date.after(start) && date.before(end)){
                        start_date = start;
                        end_date = end;
                        break;
                    }
                }

            } else if(AppConfig.TYPE_CONTRACT_202.equals(contractInfo.getContractObject_Type())){
                start_date = contractInfo.getContractObject_Date();
                end_date = contractInfo.getContractObject_DeadlineTime();
            }
            houseGrossProfitVo.setData_state(1);// 有效
            houseLibraryDao.addGrossProfit(houseGrossProfitVo);
            addGrossProfitRela(start_date, contractInfo, houseGrossProfitVo);
        }

        return 1;
    }

    /**
     * 原始添加房源利润亏损记录
     * @param profitType
     * @param profitExplain
     * @param profit_description
     * @param profit_money
     * @param em_id
     * @return
     */
    public int addGrossProfit(Integer profitType, Integer profitExplain, String profit_description, Date start_date, Date end_date, Double profit_money, ContractInfoVo contractInfo){

        HouseGrossProfitVo houseGrossProfitVo = new HouseGrossProfitVo();
        houseGrossProfitVo.setHi_code(contractInfo.getHi_code());
        houseGrossProfitVo.setContractObject_code(contractInfo.getContractObject_Code());
        houseGrossProfitVo.setProfitType(profitType);
        houseGrossProfitVo.setProfitExplain(profitExplain);
        houseGrossProfitVo.setProfit_description(profit_description);
        houseGrossProfitVo.setStart_date(start_date);
        houseGrossProfitVo.setEnd_date(end_date);
        houseGrossProfitVo.setProfit_money(new BigDecimal(AppUtil.returnDouble(profit_money)));
        houseGrossProfitVo.setEm_id(1);// 系统
        houseGrossProfitVo.setData_state(1);// 有效
        houseGrossProfitVo.setIsDone(1);// 记录完成

        houseLibraryDao.addGrossProfit(houseGrossProfitVo);

        addGrossProfitRela(start_date, contractInfo, houseGrossProfitVo);

        return 1;
    }

    private void addGrossProfitRela(Date start_date, ContractInfoVo contractInfo, HouseGrossProfitVo houseGrossProfitVo) {
        ContractObjectVo contractObjectVo = new ContractObjectVo();
        contractObjectVo.setContractObject_Id(contractInfo.getContractObject_Id());
        List<ContractObjectVo> contractObjectVos = contractService.selectGJPContractRelaEmp(contractObjectVo);
        HouseGrossProfitRelaVo houseGrossProfitRelaVo = new HouseGrossProfitRelaVo();

        houseGrossProfitRelaVo.setGp_id(houseGrossProfitVo.getGp_id());
        if(null != contractObjectVos){
            int counts = contractObjectVos.size();
            if(1 == counts){
                ContractObjectVo objectVo = contractObjectVos.get(0);
                houseGrossProfitRelaVo.setMain_em_id(objectVo.getEm_id());
                houseGrossProfitRelaVo.setMain_ratio(objectVo.getContract_perforSplit());
            } else if(2 == counts){
                ContractObjectVo objectVo1 = contractObjectVos.get(0);
                ContractObjectVo objectVo2 = contractObjectVos.get(1);
                houseGrossProfitRelaVo.setMain_em_id(objectVo1.getEm_id());
                houseGrossProfitRelaVo.setMain_ratio(objectVo1.getContract_perforSplit());
                houseGrossProfitRelaVo.setVice_em_id(objectVo2.getEm_id());
                houseGrossProfitRelaVo.setVice_ratio(objectVo2.getContract_perforSplit());
            }
        }
        houseGrossProfitRelaVo.setUcc_id(contractInfo.getUcc_id());
        houseGrossProfitRelaVo.setData_state(1);
        houseGrossProfitRelaVo.setStart_date(start_date);
        houseGrossProfitRelaVo.setStart_date_c(start_date);
        houseLibraryDao.addGrossProfitRela(houseGrossProfitRelaVo);
    }

    /**
     * 原始添加房源利润亏损记录
     * @param hi_code
     * @param contractObject_code
     * @param profitType
     * @param profitExplain
     * @param profit_description
     * @param profit_money
     * @param em_id
     * @return
     */
    public int addGrossProfit(String hi_code, String contractObject_code, Integer profitType, Integer profitExplain, String profit_description, Date start_date, Date end_date, Double profit_money){

        HouseGrossProfitVo houseGrossProfitVo = new HouseGrossProfitVo();
        houseGrossProfitVo.setHi_code(hi_code);
        houseGrossProfitVo.setContractObject_code(contractObject_code);
        houseGrossProfitVo.setProfitType(profitType);
        houseGrossProfitVo.setProfitExplain(profitExplain);
        houseGrossProfitVo.setProfit_description(profit_description);
        houseGrossProfitVo.setStart_date(start_date);
        houseGrossProfitVo.setEnd_date(end_date);
        houseGrossProfitVo.setProfit_money(new BigDecimal(AppUtil.returnDouble(profit_money)));
        houseGrossProfitVo.setEm_id(1);// 系统
        houseGrossProfitVo.setData_state(1);// 有效
        houseGrossProfitVo.setIsDone(1);// 记录完成
        houseLibraryDao.addGrossProfit(houseGrossProfitVo);

        ContractInfoVo contractInfo = contractService.queryContractInfo(contractObject_code);
        addGrossProfitRela(start_date, contractInfo, houseGrossProfitVo);
        return 1;
    }

    public static void main(String[] s) throws Exception {
        Double inPercent = 1000.0;
        System.out.println(15 * AppUtil.returnDouble(inPercent / 30));
        System.out.println(isM1(DataUtil.StrToDates("2015-01-01"), DataUtil.StrToDates("2018-03-31")));
        System.out.println(AppUtil.getYearMonthDayToMap(DataUtil.DateToStrs(DataUtil.StrToDates("2015-01-01")), DataUtil.DateToStrs(DataUtil.StrToDates("2017-12-31"))));
        System.out.println(AppUtil.remainDateToMap(DataUtil.DateToStrs(DataUtil.StrToDates("2015-01-01")), DataUtil.DateToStrs(DataUtil.StrToDates("2017-12-31"))));
    }

    /**
     * 免租期利润添加（存房合同复核通过时调用）
     * @param hi_code
     * @param contractObject_code
     * @return -1:参数为空；1:插入成功
     */
    public int addGrossProfitOfFreeTime(String hi_code, String contractObject_code) throws Exception {
        if (StringUtils.isEmpty(contractObject_code)) {
            throw new AppException("参数错误，房源编码或合同编码为空异常");
        }

        ContractInfoVo contractInfo = contractService.queryContractInfo(contractObject_code);
        if(null == contractInfo.getContractBody_FreeTime()){
            return 0;
        }
        String[] freeTimeArr = contractInfo.getContractBody_FreeTime().split("\\|");
        String[] increasArr = new String[freeTimeArr.length];
        boolean hasIncreas = false;

        Date start = contractInfo.getContractObject_Date();
        Date end = contractInfo.getContractObject_DeadlineTime();
        // 合同模式 0:n-1;1:n+1
        Integer contractMode = contractInfo.getContractBody_ContractMode();
        if(null == contractMode && isM1(contractInfo.getContractObject_Date(), contractInfo.getContractObject_DeadlineTime())){
            contractMode = 1;
        }

        // 租金递增
        if(null != contractInfo.getContractBody_Increasing() && !"0".equals(contractInfo.getContractBody_Increasing())){
            hasIncreas = true;
            increasArr = contractInfo.getContractBody_Increasing().split("\\|");
        }

        if(1 == contractInfo.getContractObject_RentFreeMode()){
            contractInfo.setContractBody_Rent(contractInfo.getContractBody_Rent() / 12);
        }

        Double inPercent = 1.0;
        Double increase = 0.0;
        if(null != freeTimeArr){
            int freeDay = 0;
            for(int i = 0; i < freeTimeArr.length; i++){
                Double money = 0.0;
                Double freeTime = Double.valueOf(freeTimeArr[i]);
                if(hasIncreas){
                    if(increasArr[i].contains("%")){
                        inPercent = inPercent * (1.0 + Double.valueOf(increasArr[i].replace("%", "")) / 100.0);
                        money = freeTime * ((contractInfo.getContractBody_Rent() / 30) * inPercent);
                    } else {
                        increase += Double.valueOf(increasArr[i]);
                        money = (freeTime * (contractInfo.getContractBody_Rent() / 30)) + increase;
                    }
                } else {
                    money = freeTime * (contractInfo.getContractBody_Rent() / 30);
                }

                freeDay += Integer.parseInt(freeTimeArr[i]);
                Date start_date = null;
                Date end_date = null;

                // n+1模式
                if(null != contractMode && 1 == contractMode){
                    // 获取免租期和折月数
                    int free_m = freeDay / 30;
                    // 获取免租期和天数
                    int free_d = freeDay % 30;

                    start_date = DataUtil.getAfterDateByYear("D", DataUtil.getAfterDateByYear("M", DataUtil.getAfterDateByYear("Y", start, i), free_m - 1), free_d);
                    end_date = DataUtil.getAfterDateByYear("D", DataUtil.getAfterDateByYear("M", DataUtil.getAfterDateByYear("Y", start, (i + 1)), free_m), free_d - 1);
                } else {// 非n+1模式（n-1模式或者为null）
                    start_date = DataUtil.getAfterDateByYear("Y", start, i);
                    end_date = DataUtil.getAfterDateByYear("D", DataUtil.getAfterDateByYear("Y", start, (i + 1)), -1);
                }
                Date deadline_date = end_date.before(end) ? end_date : end;

                addGrossProfit(AppConfig.profit_type_1, AppConfig.profit_explain_1, "房源第 " + (i + 1) + " 年度免租期收入", start_date, deadline_date, money, contractInfo);

                addGrossProfit(AppConfig.profit_type_4, AppConfig.cost_explain_1, "房源第 " + (i + 1) + " 年度管理费成本", start_date, deadline_date, AppConfig.service_money, contractInfo);
            }
        }

        // 托管合同添加管理费利润
        Map<String, Integer> dateMap = AppUtil.remainDateToMap(DataUtil.DateToStrs(start), DataUtil.DateToStrs(end));
        int index = (dateMap.get("month") == 0 && dateMap.get("day") == 0) ? dateMap.get("year") : (dateMap.get("year") + 1);
        if(null != contractInfo.getContractBody_Service() && contractInfo.getContractBody_Service() > 0){
            addGPRecordFromType(AppConfig.profit_type_1, AppConfig.profit_explain_7, contractInfo, freeTimeArr, start, end, contractMode, index, "管理费收入", contractInfo);
        }
//        addGPRecordFromType(hi_code, contractObject_code, AppConfig.profit_type_4, AppConfig.cost_explain_1, contractInfo, freeTimeArr, start, end, contractMode, index, "管理费成本");

        // 托管合同添加包修费利润
        if(null != contractInfo.getContractBody_GuaranteeCost()){
            String[] guannteeCostArr = contractInfo.getContractBody_GuaranteeCost().split("\\|");
            for(int i = 0; i < guannteeCostArr.length; i++){
                if(Double.valueOf(guannteeCostArr[i]) > 0){
                    Date over_date = DataUtil.getAfterDateByYear("D", DataUtil.getAfterDateByYear("Y", start, (i + 1)), -1);
                    addGrossProfit(AppConfig.profit_type_1,AppConfig.profit_explain_8,"房源包修费收入", DataUtil.getAfterDateByYear("Y", start, i), (over_date.before(end) ? over_date : end), AppUtil.returnDouble(Double.valueOf(guannteeCostArr[i])), contractInfo);
                }
            }
        }

        return 1;
    }

    private void addGPRecordFromType(Integer profit_type, Integer profitExplain, ContractInfoVo contractInfo, String[] freeTimeArr, Date start, Date end, Integer contractMode, int index, String type, ContractInfoVo contractInfoVo) {
        for(int j = 0; j < index; j++){
            Date start_date = null;
            Date end_date = null;

            if(null != contractMode && 1 == contractMode){
                if(null != freeTimeArr){
                    int freeDay = 0;
                    for(int i = 0; i < freeTimeArr.length; i++){
                        freeDay += Integer.parseInt(freeTimeArr[i]);

                        // 获取免租期和折月数
                        int free_m = freeDay / 30;
                        // 获取免租期和天数
                        int free_d = freeDay % 30;

                        start_date = DataUtil.getAfterDateByYear("D", DataUtil.getAfterDateByYear("M", DataUtil.getAfterDateByYear("Y", start, i), free_m - 1), free_d);
                        end_date = DataUtil.getAfterDateByYear("D", DataUtil.getAfterDateByYear("M", DataUtil.getAfterDateByYear("Y", start_date, (i + 1)), free_m), free_d - 1);
                    }
                } else {
                    start_date = DataUtil.getAfterDateByYear("Y", start, j);
                    end_date = DataUtil.getAfterDateByYear("D", DataUtil.getAfterDateByYear("Y", start, (j + 1)), -1);
                }
            } else {
                start_date = DataUtil.getAfterDateByYear("Y", start, j);
                end_date = DataUtil.getAfterDateByYear("D", DataUtil.getAfterDateByYear("Y", start, (j + 1)), -1);
            }

            Double money = 0.0;
            if(AppConfig.profit_explain_7 == profitExplain){
                money = contractInfo.getContractBody_Service();
            } else if(AppConfig.cost_explain_1 == profitExplain){
                money = AppConfig.service_money;
            }

            addGrossProfit(profit_type, profitExplain,"房源第 " + (j + 1) + " 年度" + type, start_date, (end_date.before(end) ? end_date : end), money, contractInfoVo);
        }
    }

    /**
     * 预期租金差价添加（出房合同复核通过时调用）/ 预期租金差价扣除（违约结算复核时调用）
     * @param hi_code
     * @param contractObject_code
     * @param contractInfo
     * @param startDate
     * @param opreate 1:添加；2:扣除
     * @return
     */
    public int addGrossProfitOfRent(String hi_code, String contractObject_code, ContractInfoVo contractInfo, Date startDate, int opreate) throws Exception {
        if (StringUtils.isEmpty(hi_code) || StringUtils.isEmpty(contractObject_code)) {
            throw new AppException("参数错误，房源编码或合同编码为空异常");
        }

        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setHi_code(hi_code);
        contractVo.setContractObject_Type("托管合同");
        List<ViewBusinessContractVo> businessContractVoList = contractService.queryContractNotObsolute(contractVo);

        // 查询租赁合同
        if(null == contractInfo){
            contractInfo = contractService.queryContractInfo(contractObject_code);
        }

        ViewBusinessContractVo contractTGVo = getTGContractInfo(businessContractVoList, contractInfo);
        if(null == contractTGVo){
            throw new AppException("无托管合同数据");
        }
        if(1 == contractTGVo.getContractObject_RentFreeMode()){
            contractTGVo.setContractBody_Rent(contractTGVo.getContractBody_Rent() / 12);
        }

        // 记录出房提成
        if(opreate == 1){
            addMarketMoney(contractInfo);
        }

        Date start_zl = null == startDate ? contractInfo.getContractObject_Date() : startDate;
        Date end_zl = contractInfo.getContractObject_DeadlineTime();

        Date start = contractTGVo.getContractObject_Date();
        Date end = contractTGVo.getContractObject_DeadlineTime();

        Double rent = contractInfo.getContractBody_Rent();

        // 托管合同年度开始日期
        Date start_limit = null;
        // 托管合同年度结束日期
        Date end_limit = null;

        boolean hasIncreas = false;
        String[] increasArr = null;
        // 租金递增
        if(null != contractTGVo.getContractBody_Increasing() && !"0".equals(contractTGVo.getContractBody_Increasing())){
            hasIncreas = true;
            increasArr = contractTGVo.getContractBody_Increasing().split("\\|");
        }

        if(null != contractTGVo.getContractBody_FreeTime()){

            String[] freeTimeArr = contractTGVo.getContractBody_FreeTime().split("\\|");

            // 合同模式 0:n-1;1:n+1
            Integer contractMode = contractTGVo.getContractBody_ContractMode();
            if(null == contractMode && isM1(contractTGVo.getContractObject_Date(), contractTGVo.getContractObject_DeadlineTime())){
                contractMode = 1;
            }

            int freeDay = 0;
            Double increase = 0.0;
            Double inPercent = 1.0;

            for(int i = 0; i < freeTimeArr.length; i++){

                freeDay += Integer.parseInt(freeTimeArr[i]);

                // n+1模式
                if(null != contractMode && 1 == contractMode){
                    // 获取免租期和折月数
                    int free_m = freeDay / 30;
                    // 获取免租期和天数
                    int free_d = freeDay % 30;

                    start_limit = DataUtil.getAfterDateByYear("D", DataUtil.getAfterDateByYear("M", DataUtil.getAfterDateByYear("Y", start, i), free_m - 1), free_d);
                    end_limit = DataUtil.getAfterDateByYear("D", DataUtil.getAfterDateByYear("M", DataUtil.getAfterDateByYear("Y", start, (i + 1)), free_m), free_d - 1);
                } else {// 非n+1模式（n-1模式或者为null）
                    start_limit = DataUtil.getAfterDateByYear("Y", start, i);
                    end_limit = DataUtil.getAfterDateByYear("D", DataUtil.getAfterDateByYear("Y", start, (i + 1)), -1);
                }

                end_limit = end_limit.before(end) ? end_limit : end;
                Date end_ = DataUtil.getAfterDateByYear("Y", contractTGVo.getContractObject_Date(), (i + 2));
                // 在托管合同的一个年度内，记录一条租金差价利润记录
                if((start_zl.after(start_limit) || AppUtil.sameDate(start_zl, start_limit)) && (end_zl.before(end_limit) || AppUtil.sameDate(end_zl, end_limit))){
                    Map<String, Integer> dateMap = AppUtil.remainDateToMap(DataUtil.DateToStrs(start_zl), DataUtil.DateToStrs(end_zl));
                    Double money = 0.0;
                    if(hasIncreas){
                        if(increasArr[i].contains("%")){
                            inPercent = inPercent * (1.0 + Double.valueOf(increasArr[i].replace("%", "")) / 100.0);
                            money = rent - AppUtil.returnDouble(contractTGVo.getContractBody_Rent() * inPercent);
                        } else {
                            increase += Double.valueOf(increasArr[i]);
                            money = rent - AppUtil.returnDouble(contractTGVo.getContractBody_Rent() + increase);
                        }
                    } else {
                        money = rent - contractTGVo.getContractBody_Rent();
                    }
                    money = AppUtil.returnDouble(money);

                    Double money1 = dateMap.get("year") * 12 * money + dateMap.get("month") * money + (dateMap.get("day") * AppUtil.returnDouble(money / 30));
                    if(opreate == 1){
                        addGrossProfit(AppConfig.profit_type_1, AppConfig.profit_explain_2, "房源租金差价预期利润", start_zl, end_zl, money1, contractInfo);
                    } else if(opreate == 2){
                        Double money2 = dateMap.get("year") * 12 * money + dateMap.get("month") * money + (dateMap.get("day") * AppUtil.returnDouble(money / 30));
                        addGrossProfit(AppConfig.profit_type_2, AppConfig.loss_explain_5, "房源租金差价预期利润扣除", start_zl, end_zl, money2, contractInfo);
                    }
                    break;
                    // 跨托管合同年度的，记录两条数据
                } else if((start_zl.after(start_limit) || AppUtil.sameDate(start_zl, start_limit)) && start_zl.before(end_limit) && (end_zl.before(end_) || AppUtil.sameDate(end_zl, end_))) {
                    Date endDate = DataUtil.getAfterDateByYear("D", DataUtil.getAfterDateByYear("Y", contractTGVo.getContractObject_Date(), (i + 1)), -1);
                    endDate = endDate.after(contractTGVo.getContractObject_DeadlineTime()) ? contractTGVo.getContractObject_DeadlineTime() : endDate;
                    Map<String, Integer> dateMap = AppUtil.remainDateToMap(DataUtil.DateToStrs(start_zl), DataUtil.DateToStrs(endDate));

                    Double money = 0.0;
                    if(hasIncreas){
                        if(increasArr[i].contains("%")){
                            inPercent = inPercent * (1.0 + Double.valueOf(increasArr[i].replace("%", "")) / 100.0);
                            money = contractInfo.getContractBody_Rent() - AppUtil.returnDouble(contractTGVo.getContractBody_Rent() * inPercent);
                        } else {
                            increase += Double.valueOf(increasArr[i]);
                            money = contractInfo.getContractBody_Rent() - AppUtil.returnDouble(contractTGVo.getContractBody_Rent() + increase);
                        }
                    } else {
                        money = contractInfo.getContractBody_Rent() - contractTGVo.getContractBody_Rent();
                    }

                    money = AppUtil.returnDouble(money);
                    Double money1 = dateMap.get("year") * 12 * money + dateMap.get("month") * money + (dateMap.get("day") * AppUtil.returnDouble(money / 30));
//                    addGrossProfit(hi_code, contractObject_code, AppConfig.profit_type_1, AppConfig.profit_explain_2, "房源租金差价预期利润", start_zl, endDate, money1, 1);

                    // 计算第二阶段费用记录
                    Date startDate2 = DataUtil.getAfterDateByYear("D", endDate, 1);
                    Map<String, Integer> dateMap2 = AppUtil.remainDateToMap(DataUtil.DateToStrs(startDate2), DataUtil.DateToStrs(end_zl));

                    ContractInfoVo contractTGInfo = new ContractInfoVo();
                    if(AppUtil.isNull(contractTGVo.getContractBody_Increasing())){
                        contractTGInfo.setContractBody_Increasing(contractTGVo.getContractBody_Increasing());
                    }
                    if(1 == contractTGVo.getContractObject_RentFreeMode()){
                        contractTGInfo.setContractBody_Rent(contractTGVo.getContractBody_Rent() / 12);
                    } else {
                        contractTGInfo.setContractBody_Rent(contractTGVo.getContractBody_Rent());
                    }
                    contractTGInfo.setContractBody_Rent(contractTGVo.getContractBody_Rent());
                    contractTGInfo.setContractObject_Date(contractTGVo.getContractObject_Date());
                    contractTGInfo.setContractObject_DeadlineTime(contractTGVo.getContractObject_DeadlineTime());
                    Double increaseMoney = contractInfo.getContractBody_Rent() - costRent(contractTGInfo, startDate2);
                    Double money2 = dateMap2.get("year") * 12 * increaseMoney + dateMap2.get("month") * increaseMoney + (dateMap2.get("day") * AppUtil.returnDouble(increaseMoney / 30));;
//                    addGrossProfit(hi_code, contractObject_code, AppConfig.profit_type_1, AppConfig.profit_explain_2, "房源租金差价预期利润", DataUtil.getAfterDateByYear("D", endDate, 1), end_zl, money2, 1);

                    if(opreate == 1){
                        // 一二阶段租赁合同预期租金差价合并
                        addGrossProfit(AppConfig.profit_type_1, AppConfig.profit_explain_2, "房源租金差价预期利润", start_zl, end_zl, (money1 + money2), contractInfo);
                    } else if(opreate == 2){
                        Double money3 = dateMap.get("year") * 12 * money + dateMap.get("month") * money + (dateMap.get("day") * AppUtil.returnDouble(money / 30));
                        Double money4 = dateMap2.get("year") * 12 * money + dateMap2.get("month") * money + (dateMap2.get("day") * AppUtil.returnDouble(money / 30));
                        addGrossProfit(AppConfig.profit_type_2, AppConfig.loss_explain_5, "房源租金差价预期利润扣除", start_zl, end_zl, (money3 + money4), contractInfo);
                    }
                    break;
                }
            }
        } else {
            Double increase = 0.0;
            Double inPercent = 1.0;
            Map<String, Integer> dateMap = AppUtil.remainDateToMap(DataUtil.DateToStrs(start), DataUtil.DateToStrs(end));
            int index = (dateMap.get("month") == 0 && dateMap.get("day") == 0) ? dateMap.get("year") : (dateMap.get("year") + 1);
            for(int i = 0; i < index; i++){
                start_limit = DataUtil.getAfterDateByYear("Y", start, i);
                end_limit = DataUtil.getAfterDateByYear("D", DataUtil.getAfterDateByYear("Y", start, (i + 1)), -1);
                end_limit = end_limit.before(end) ? end_limit : end;
                Date end_ = DataUtil.getAfterDateByYear("Y", contractTGVo.getContractObject_Date(), (i + 2));
                // 在托管合同的一个年度内，记录一条租金差价利润记录
                if((start_zl.after(start_limit) || AppUtil.sameDate(start_zl, start_limit)) && (end_zl.before(end_limit) || AppUtil.sameDate(end_zl, end_limit))){

                    Map<String, Integer> dateMap2 = AppUtil.remainDateToMap(DataUtil.DateToStrs(start_zl), DataUtil.DateToStrs(end_zl));
                    Double money = 0.0;
                    if(hasIncreas){
                        if(increasArr[i].contains("%")){
                            inPercent = inPercent * (1.0 + Double.valueOf(increasArr[i].replace("%", "")) / 100.0);
                            money = contractInfo.getContractBody_Rent() - AppUtil.returnDouble(contractTGVo.getContractBody_Rent() * inPercent);
                        } else {
                            increase += Double.valueOf(increasArr[i]);
                            money = contractInfo.getContractBody_Rent() - AppUtil.returnDouble(contractTGVo.getContractBody_Rent() + increase);
                        }
                    } else {
                        money = contractInfo.getContractBody_Rent() - contractTGVo.getContractBody_Rent();
                    }

                    money = AppUtil.returnDouble(money);

                    Double money1 = dateMap2.get("year") * 12 * money + dateMap2.get("month") * money + (dateMap2.get("day") * AppUtil.returnDouble(money / 30));
                    if(opreate == 1){
                        addGrossProfit(AppConfig.profit_type_1, AppConfig.profit_explain_2, "房源租金差价预期利润", start_zl, end_zl, money1, contractInfo);
                    } else if(opreate == 2){
                        Double money2 = dateMap.get("year") * 12 * money + dateMap.get("month") * money + (dateMap.get("day") * AppUtil.returnDouble(money / 30));
                        addGrossProfit(AppConfig.profit_type_2, AppConfig.loss_explain_5, "房源租金差价预期利润扣除", start_zl, end_zl, money2, contractInfo);
                    }
                    break;
                } else if((start_zl.after(start_limit) || AppUtil.sameDate(start_zl, start_limit)) && start_zl.before(end_limit) && (end_zl.before(end_) || AppUtil.sameDate(end_zl, end_))) {
                    Date endDate = DataUtil.getAfterDateByYear("D", DataUtil.getAfterDateByYear("Y", contractTGVo.getContractObject_Date(), (i + 1)), -1);
                    endDate = endDate.after(contractTGVo.getContractObject_DeadlineTime()) ? contractTGVo.getContractObject_DeadlineTime() : endDate;
                    Map<String, Integer> dateMap1 = AppUtil.remainDateToMap(DataUtil.DateToStrs(start_zl), DataUtil.DateToStrs(endDate));

                    Double money = 0.0;
                    if(hasIncreas){
                        if(increasArr[i].contains("%")){
                            inPercent = inPercent * (1.0 + Double.valueOf(increasArr[i].replace("%", "")) / 100.0);
                            money = contractInfo.getContractBody_Rent() - AppUtil.returnDouble(contractTGVo.getContractBody_Rent() * inPercent);
                        } else {
                            increase += Double.valueOf(increasArr[i]);
                            money = contractInfo.getContractBody_Rent() - AppUtil.returnDouble(contractTGVo.getContractBody_Rent() + increase);
                        }
                    } else {
                        money = contractInfo.getContractBody_Rent() - contractTGVo.getContractBody_Rent();
                    }

                    money = AppUtil.returnDouble(money);

                    Double money1 = dateMap1.get("year") * 12 * money + dateMap1.get("month") * money + (dateMap1.get("day") * AppUtil.returnDouble(money / 30));
//                    addGrossProfit(hi_code, contractObject_code, AppConfig.profit_type_1, AppConfig.profit_explain_2, "房源租金差价预期利润", start_zl, endDate, money1, 1);

                    // 计算第二阶段费用记录
                    Date startDate2 = DataUtil.getAfterDateByYear("D", endDate, 1);
                    Map<String, Integer> dateMap2 = AppUtil.remainDateToMap(DataUtil.DateToStrs(startDate2), DataUtil.DateToStrs(end_zl));

                    ContractInfoVo contractTGInfo = new ContractInfoVo();
                    if(AppUtil.isNull(contractTGVo.getContractBody_Increasing())){
                        contractTGInfo.setContractBody_Increasing(contractTGVo.getContractBody_Increasing());
                    }
                    if(1 == contractTGVo.getContractObject_RentFreeMode()){
                        contractTGInfo.setContractBody_Rent(contractTGVo.getContractBody_Rent() / 12);
                    } else {
                        contractTGInfo.setContractBody_Rent(contractTGVo.getContractBody_Rent());
                    }
                    contractTGInfo.setContractBody_Rent(contractTGVo.getContractBody_Rent());
                    contractTGInfo.setContractObject_Date(contractTGVo.getContractObject_Date());
                    contractTGInfo.setContractObject_DeadlineTime(contractTGVo.getContractObject_DeadlineTime());
                    Double increaseMoney = AppUtil.returnDouble(contractInfo.getContractBody_Rent() - costRent(contractTGInfo, startDate2));

                    Double money2 = dateMap2.get("year") * 12 * increaseMoney + dateMap2.get("month") * increaseMoney + (dateMap2.get("day") * AppUtil.returnDouble(increaseMoney / 30));;
//                    addGrossProfit(hi_code, contractObject_code, AppConfig.profit_type_1, AppConfig.profit_explain_2, "房源租金差价预期利润", DataUtil.getAfterDateByYear("D", endDate, 1), end_zl, money2, 1);
                    if(opreate == 1){
                        // 一二阶段租赁合同预期租金差价合并
                        addGrossProfit(AppConfig.profit_type_1, AppConfig.profit_explain_2, "房源租金差价预期利润", start_zl, end_zl, (money1 + money2) , contractInfo);
                    } else if(opreate == 2){
                        Double money3 = dateMap.get("year") * 12 * money + dateMap.get("month") * money + (dateMap.get("day") * AppUtil.returnDouble(money / 30));
                        Double money4 = dateMap2.get("year") * 12 * money + dateMap2.get("month") * money + (dateMap2.get("day") * AppUtil.returnDouble(money / 30));
                        addGrossProfit(AppConfig.profit_type_2, AppConfig.loss_explain_5, "房源租金差价预期利润扣除", start_zl, end_zl, money1, contractInfo);
                    }
                    break;
                }
            }
        }
        return 1;
    }

    /**
     * 记录出房提成（每月50，大于等于15天算一月）
     * @param contractInfo
     * @return
     */
    public int addMarketMoney(ContractInfoVo contractZLVo) throws Exception {

        Date start_date = null;
        Date end_date = null;
        Date start = contractZLVo.getContractObject_Date();
        Date end = contractZLVo.getContractObject_DeadlineTime();

        // 获取当前租赁合同索引
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setHi_code(contractZLVo.getHi_code());
        contractVo.setContractObject_Type("租赁合同");
        List<ViewBusinessContractVo> contractList = contractService.selectContractViewList(contractVo);
        int present_conIndex = 0;

        for (ViewBusinessContractVo vo : contractList){
            if(AppConfig.TYPE_CONTRACT_202.equals(vo.getContractObject_Type())
                    && contractZLVo.getContractObject_No().equals(vo.getContractObject_No())){
                break;
            }
            present_conIndex++;
        }

        switch (contractZLVo.getContractObject_ExtState()) {
            /**
             *  25:转租出房;26:退租出房;27:强收出房
             *  需获取前一份租赁合同的日期
             */
            case AppConfig.contract_extstate_25:
            case AppConfig.contract_extstate_26:
            case AppConfig.contract_extstate_27:

                /**
                 * 获取前一份有效租赁合同
                 */
                for (int i = present_conIndex - 1; i >= 0; i--) {
                    ViewBusinessContractVo businessContractVo = contractList.get(i);
                    if (AppConfig.TYPE_CONTRACT_202.equals(businessContractVo.getContractObject_Type())
                            && AppConfig.con_state_3 == businessContractVo.getContractObject_State()
                            && (AppConfig.contract_optionstate_503 == businessContractVo.getContractObject_OptionState()
                            || AppConfig.contract_optionstate_603 == businessContractVo.getContractObject_OptionState()
                            || AppConfig.contract_optionstate_703 == businessContractVo.getContractObject_OptionState())) {
                        /**
                         * 以前一份合同（生效过，现在为失效状态）的接房日期起，开始计算至本次复核的租赁合同开始日期止的空置时间
                         */
                        // 【查询结算信息】
                        UserCenterStatementVo statementVo = new UserCenterStatementVo();
                        statementVo.setContractObject_code(businessContractVo.getContractObject_Code());
                        statementVo.setStatement_state(0);
                        statementVo.setStatement_type(1);
                        statementVo = statementService.queryStatementOrder(statementVo);
                        // 老合同无结算订单数据，由前端人工添加
                        if(null != statementVo){
                            start_date = statementVo.getStatement_handoverDate();
                            end_date = businessContractVo.getContractObject_DeadlineTime();

                            Date prev_startDate = businessContractVo.getContractObject_Date();
                            Date prev_endDate = businessContractVo.getContractObject_DeadlineTime();
                            Date contract_outDate = businessContractVo.getContract_outDate();

                            boolean isBefore1 = end.before(prev_endDate) || AppUtil.sameDate(end, prev_endDate);
                            boolean isBefore2 = null != contract_outDate && (end.before(contract_outDate) || AppUtil.sameDate(end, contract_outDate));

                            if(isBefore1 || isBefore2){
                                addGrossProfit( AppConfig.profit_type_4, AppConfig.cost_explain_2, "销售人员出房提成", start_date, end_date, 0.0 , contractZLVo);

                            } else if(end.after(prev_endDate)){

                                Map<String, Integer> dateMap = AppUtil.remainDateToMap(DataUtil.DateToStrs(start_date), DataUtil.DateToStrs(end));
                                Integer years = dateMap.get("year") == null ? 0 : dateMap.get("year");
                                Integer months = dateMap.get("month") == null ? 0 : dateMap.get("month");
                                Integer days = dateMap.get("day") == null ? 0 : dateMap.get("day");
                                if(days >= 15){
                                    months += 1;
                                }

                                Double money = (years * 12 + months) * AppConfig.market_money;
                                addGrossProfit( AppConfig.profit_type_4, AppConfig.cost_explain_2, "销售人员出房提成", start_date, end_date, money , contractZLVo);
                            }
                        }
                        break;
                    }
                }

                break;

            /**
             * 29：换房出房
             * TODO：暂时空起
             */
            case AppConfig.contract_extstate_29:
                break;

            /**
             * 20：新出房、21：改签出房、22：续约出房、23：到期出房
             * 直接保存预期差价收入
             */
            case AppConfig.contract_extstate_20:
            case AppConfig.contract_extstate_22:
            case AppConfig.contract_extstate_23:

                start_date = contractZLVo.getContractObject_Date();
                end_date = contractZLVo.getContractObject_DeadlineTime();
                if(start_date != null && end_date != null){

                    Map<String, Integer> dateMap = AppUtil.remainDateToMap(DataUtil.DateToStrs(start_date), DataUtil.DateToStrs(end_date));
                    Integer years = dateMap.get("year") == null ? 0 : dateMap.get("year");
                    Integer months = dateMap.get("month") == null ? 0 : dateMap.get("month");
                    Integer days = dateMap.get("day") == null ? 0 : dateMap.get("day");
                    if(days >= 15){
                        months += 1;
                    }

                    Double money = (years * 12 + months) * AppConfig.market_money;
                    addGrossProfit( AppConfig.profit_type_4, AppConfig.cost_explain_2, "销售人员出房提成", start_date, end_date, money , contractZLVo);
                }
                break;
        }

        return 1;
    }

    /**
     * 服务费、管理费、包修费利润添加
     * @param hi_code
     * @param contractObject_code
     * @return
     */
    public int addGrossProfitOfService(String hi_code, String contractObject_code) throws Exception {
        if (StringUtils.isEmpty(hi_code) || StringUtils.isEmpty(contractObject_code)) {
            throw new AppException("参数错误，房源编码或合同编码为空异常");
        }

        // 查询租赁合同
        ContractInfoVo contractInfo = contractService.queryContractInfo(contractObject_code);

        Date start_date = contractInfo.getContractObject_Date();
        Date end_date = contractInfo.getContractObject_DeadlineTime();
        Map<String, Integer> dateMap = AppUtil.remainDateToMap(DataUtil.DateToStrs(start_date), DataUtil.DateToStrs(end_date));

        if(AppConfig.TYPE_CONTRACT_201.equals(contractInfo.getContractObject_Type())){

            if(null != contractInfo.getContractBody_Service() && contractInfo.getContractBody_Service() > 0){
                int index = (dateMap.get("month") == 0 && dateMap.get("day") == 0) ? dateMap.get("year") : (dateMap.get("year") + 1);
                for(int i = 0; i < index; i++){
                    Date over_date = DataUtil.getAfterDateByYear("Y", start_date, (i + 1));
                    addGrossProfit(AppConfig.profit_type_1, AppConfig.profit_explain_7,"房源管理费收入",DataUtil.getAfterDateByYear("Y", start_date, i), (over_date.before(end_date) ? over_date : end_date), contractInfo.getContractBody_Service(), contractInfo);
                }
            }

            if(null != contractInfo.getContractBody_GuaranteeCost()){
                String[] guannteeCostArr = contractInfo.getContractBody_GuaranteeCost().split("\\|");
                for(int i = 0; i < guannteeCostArr.length; i++){
                    if(Double.valueOf(guannteeCostArr[i]) > 0){
                        Date over_date = DataUtil.getAfterDateByYear("Y", start_date, (i + 1));
                        addGrossProfit(AppConfig.profit_type_1, AppConfig.profit_explain_8,"房源包修费收入",DataUtil.getAfterDateByYear("Y", start_date, i), (over_date.before(end_date) ? over_date : end_date), Double.valueOf(guannteeCostArr[i]), contractInfo);
                    }
                }
            }

        } else if(AppConfig.TYPE_CONTRACT_202.equals(contractInfo.getContractObject_Type())){
            if(null != contractInfo.getContractBody_Service() && contractInfo.getContractBody_Service() > 0){
                int index = (dateMap.get("month") == 0 && dateMap.get("day") == 0) ? dateMap.get("year") : (dateMap.get("year") + 1);
                for(int i = 0; i < index; i++){
                    Double service = contractInfo.getContractBody_Service();
                    if(null == service || service <= 0){
                        continue;
                    }
                    Date over_date = DataUtil.getAfterDateByYear("Y", start_date, (i + 1));
                    addGrossProfit(AppConfig.profit_type_1, AppConfig.profit_explain_6,"房源服务费收入", DataUtil.getAfterDateByYear("Y", start_date, i), (over_date.before(end_date) ? over_date : end_date), contractInfo.getContractBody_Service(), contractInfo);
                }
            }
        }

        return 1;
    }

    /**
     * 定金违约(定时处理定金违约时调用)
     * @param downPaymentVo
     * @return
     */
    public int addDownPayment(FinanceDownPaymentVo downPaymentVo){
        return addGrossProfit(downPaymentVo.getHi_code(), downPaymentVo.getCon_code(), AppConfig.profit_type_1, AppConfig.profit_explain_9, "房源定金违约收入", DataUtil.getAfterDateByYear("D", downPaymentVo.getFdp_invaild_time(), -downPaymentVo.getFdp_invaild_day()), downPaymentVo.getFdp_invaild_time(), downPaymentVo.getFdp_amount());
    }

    /**
     * 租金溢价(租赁合同复核通过时调用)
     * @param hi_code
     * @param contractObject_code
     * @return
     * @throws Exception
     */
    public int addProfeitRentPremium(String hi_code, String contractObject_code) throws Exception {

        if (StringUtils.isEmpty(hi_code) || StringUtils.isEmpty(contractObject_code)) {
            throw new AppException("参数错误，房源编码或合同编码为空异常");
        }

        // 获取当前租赁合同索引
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setHi_code(hi_code);
        contractVo.setContractObject_Type("租赁合同");
        List<ViewBusinessContractVo> contractList = contractService.selectContractViewList(contractVo);
        int present_conIndex = 0;

        // 查询租赁合同
        ContractInfoVo contractZLVo = contractService.queryContractInfo(contractObject_code);
        for (ViewBusinessContractVo vo : contractList){
            if(AppConfig.TYPE_CONTRACT_202.equals(vo.getContractObject_Type())
                    && contractZLVo.getContractObject_No().equals(vo.getContractObject_No())){
                break;
            }
            present_conIndex++;
        }
        switch (contractZLVo.getContractObject_ExtState()) {
            /**
             *  25:转租出房;26:退租出房;27:强收出房
             *  需获取前一份租赁合同的日期
             */
            case AppConfig.contract_extstate_25:
            case AppConfig.contract_extstate_26:
            case AppConfig.contract_extstate_27:

                /**
                 * 获取前一份有效租赁合同
                 */
//                ViewBusinessContractVo vo = new ViewBusinessContractVo();
                for (int i = present_conIndex - 1; i >= 0; i--) {
                    ViewBusinessContractVo businessContractVo = contractList.get(i);
                    if (AppConfig.TYPE_CONTRACT_202.equals(businessContractVo.getContractObject_Type())
                            && AppConfig.con_state_3 == businessContractVo.getContractObject_State()
                            && (AppConfig.contract_optionstate_503 == businessContractVo.getContractObject_OptionState()
                            || AppConfig.contract_optionstate_603 == businessContractVo.getContractObject_OptionState()
                            || AppConfig.contract_optionstate_703 == businessContractVo.getContractObject_OptionState())) {
                        /**
                         * 以前一份合同（生效过，现在为失效状态）的接房日期起，开始计算至本次复核的租赁合同开始日期止的空置时间
                         */
                        // 【查询结算信息】
                        UserCenterStatementVo statementVo = new UserCenterStatementVo();
                        statementVo.setContractObject_code(businessContractVo.getContractObject_Code());
                        statementVo.setStatement_state(0);
                        statementVo.setStatement_type(1);
                        statementVo = statementService.queryStatementOrder(statementVo);
                        // 老合同无结算订单数据，由前端人工添加
                        if(null != statementVo){

                            // 计算上一份合同结算到本次合同的时间差
                            Map<String, Integer> dateMap = AppUtil.remainDateToMap(DataUtil.DateToStrs(statementVo.getStatement_handoverDate()), DataUtil.DateToStrs(businessContractVo.getContractObject_DeadlineTime()));

                            // 计算两份租赁合同租金差
                            Double rentMoney = contractZLVo.getContractBody_Rent() - businessContractVo.getContractBody_Rent();

    //                // 计算上一份租赁合同解约期内租金溢价收入
    //                Double money = dateMap.get("year") * 12.0 * rentMoney + dateMap.get("month") * rentMoney + dateMap.get("day") * (rentMoney / 30.0);
    //                addGrossProfit(hi_code, contractObject_code, AppConfig.profit_type_1, AppConfig.profit_explain_10, "上次出房未执行部分的租金溢价", statementVo.getStatement_handoverDate(), vo.getContractObject_DeadlineTime(), money, 1);

                            // 计算违约租金溢价，销售人员提成
                            if(rentMoney != 0){
                                addGrossProfit(AppConfig.profit_type_4, AppConfig.cost_explain_2, AppUtil.returnContractExtStateName(contractZLVo.getContractObject_ExtState()) + "业务人员提成", statementVo.getStatement_handoverDate(), businessContractVo.getContractObject_DeadlineTime(), (rentMoney * AppConfig.expend_scale), contractZLVo);
                            }
                        }
//                // 计算剩余租期内的预期租金溢价收益
//                addGrossProfitOfRent(hi_code, contractObject_code, DataUtil.getAfterDateByYear("D", vo.getContractObject_DeadlineTime(), 1));
                        // 计算新合同预期租金差价
                        addGrossProfitOfRent(hi_code, contractObject_code, contractZLVo,null, 1);
                        break;
                    }
                }

                break;

            /**
             * 29：换房出房
             * TODO：暂时空起
             */
            case AppConfig.contract_extstate_29:
                break;

            /**
             * 20：新出房、21：改签出房、22：续约出房、23：到期出房
             * 直接保存预期差价收入
             */
            case AppConfig.contract_extstate_20:
            case AppConfig.contract_extstate_21:
            case AppConfig.contract_extstate_22:
            case AppConfig.contract_extstate_23:

                addGrossProfitOfRent(hi_code, contractObject_code, contractZLVo,null, 1);
                break;
        }

        return 1;
    }

    /**
     * 空置期亏损添加/更新（租赁合同复核通过时调用）
     * @param hi_code
     * @param contractObject_code
     * @return
     */
    public int addGrossProfitOfVacancy(String hi_code, String contractObject_code) throws Exception {

        if (StringUtils.isEmpty(hi_code) || StringUtils.isEmpty(contractObject_code)) {
            throw new AppException("参数错误，房源编码或合同编码为空异常");
        }

        ViewBusinessContractVo contractTGVo = new ViewBusinessContractVo();
        contractTGVo.setHi_code(hi_code);
        contractTGVo.setContractObject_Type("托管合同");
        List<ViewBusinessContractVo> businessContractVoList = contractService.queryContractNotObsolute(contractTGVo);

        // 查询租赁合同
        ContractInfoVo contractZLVo = contractService.queryContractInfo(contractObject_code);

        ViewBusinessContractVo contractInfoVo = getTGContractInfo(businessContractVoList, contractZLVo);
        if(null == contractInfoVo){
            throw new AppException("无托管合同数据");
        }

        ContractInfoVo contractTGInfo = new ContractInfoVo();
        if(AppUtil.isNull(contractInfoVo.getContractBody_Increasing())){
            contractTGInfo.setContractBody_Increasing(contractInfoVo.getContractBody_Increasing());
        }
        if(1 == contractInfoVo.getContractObject_RentFreeMode()){
            contractTGInfo.setContractBody_Rent(contractInfoVo.getContractBody_Rent() / 12);
        } else {
            contractTGInfo.setContractBody_Rent(contractInfoVo.getContractBody_Rent());
        }
        contractTGInfo.setContractObject_Date(contractInfoVo.getContractObject_Date());
        contractTGInfo.setContractObject_DeadlineTime(contractInfoVo.getContractObject_DeadlineTime());

        Double rentMoney = costRent(contractTGInfo, contractZLVo.getContractObject_Date());

        // 查询是否存在毛利润记录
        HouseGrossProfitVo houseGrossProfitVo = new HouseGrossProfitVo();
        houseGrossProfitVo.setHi_code(hi_code);
        houseGrossProfitVo.setProfitType(AppConfig.profit_type_2);
        houseGrossProfitVo.setProfitExplain(AppConfig.loss_explain_1);
        houseGrossProfitVo.setIsDone(0);
        List<HouseGrossProfitVo> houseGrossProfitVos = houseLibraryDao.queryGrossListByCode(houseGrossProfitVo);

        // 获取当前租赁合同索引
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setHi_code(hi_code);
        contractVo.setContractObject_Type("租赁合同");
        List<ViewBusinessContractVo> contractList = contractService.selectContractViewList(contractVo);
        int present_conIndex = 0;
        for (ViewBusinessContractVo vo : contractList){
            if(AppConfig.TYPE_CONTRACT_202.equals(vo.getContractObject_Type())
                    && contractZLVo.getContractObject_No().equals(vo.getContractObject_No())){
                break;
            }
            present_conIndex++;
        }

        boolean hasVacancy = true;
        Date start_date = null;
        Date end_date = null;
        Double money = 0.0;
        Integer isDirect = -1;

        switch (contractZLVo.getContractObject_ExtState()){

            /**
             * 新出房
             */
            case AppConfig.contract_extstate_20:
                start_date = contractInfoVo.getContractObject_Date();
                end_date = contractZLVo.getContractObject_Date();
                end_date = DataUtil.getAfterDateByYear("D", end_date, -1);
                if(start_date.before(end_date)){

                    // 计算租赁合同和托管合同时间差，为空置时间
                    Map<String, Integer> dateMap = AppUtil.remainDateToMap(DataUtil.DateToStrs(start_date), DataUtil.DateToStrs(end_date));

                    // 计算空置期费用
                    money = Double.valueOf(dateMap.get("year")) * 12 * rentMoney + Double.valueOf(dateMap.get("month")) * rentMoney + Double.valueOf(dateMap.get("day")) * AppUtil.returnDouble(rentMoney / 30);
                } else {
                    money = 0.0;
                }
                isDirect = 1;

//            addGrossProfit(hi_code, contractObject_code, AppConfig.profit_type_2, AppConfig.loss_explain_1, "房源空置期亏损", start_date, end_date, money, 1);
                break;

            /**
             * 改签出房
             */
            case AppConfig.contract_extstate_21:

                // TODO 暂时不晓得怎么处理
                hasVacancy = false;
                break;

            /**
             * 续约出房、转租出房，无空置期
             */
            case AppConfig.contract_extstate_22:
            case AppConfig.contract_extstate_25:
                hasVacancy = false;
                break;

            /**
             *  23:到期出房;26:退租出房;27:强收出房
             *  需获取前一份租赁合同的日期
             */
            case AppConfig.contract_extstate_23:
            case AppConfig.contract_extstate_26:
            case AppConfig.contract_extstate_27:

                /**
                 * 获取前一份有效租赁合同
                 */
                ViewBusinessContractVo vo = new ViewBusinessContractVo();
                for(int i = present_conIndex - 1; i >= 0; i--){
                    ViewBusinessContractVo businessContractVo = contractList.get(i);
                    if(AppConfig.TYPE_CONTRACT_202.equals(businessContractVo.getContractObject_Type())
                            && AppConfig.con_state_3 == businessContractVo.getContractObject_State()
                            && (AppConfig.contract_optionstate_303 == businessContractVo.getContractObject_OptionState()
                            || AppConfig.contract_optionstate_603 == businessContractVo.getContractObject_OptionState()
                            || AppConfig.contract_optionstate_703 == businessContractVo.getContractObject_OptionState())){
                        vo = businessContractVo;
                        break;
                    }
                }
                isDirect = contractZLVo.getContractObject_ExtState() == AppConfig.contract_extstate_23 ? 1 : 2;

                /**
                 * 以前一份合同（生效过，现在为失效状态）的结算日期起，开始计算至本次复核的租赁合同开始日期止的空置时间
                 */
                // 【查询结算信息】
                UserCenterStatementVo statementVo = new UserCenterStatementVo();
                statementVo.setContractObject_code(vo.getContractObject_Code());
                statementVo.setStatement_state(0);
                statementVo.setStatement_type(1);
                statementVo = statementService.queryStatementOrder(statementVo);

                start_date = statementVo.getStatement_balanceTime();
                end_date = contractZLVo.getContractObject_Date();
                // 计算上一份合同结算到本次合同的时间差
                Map<String, Integer> dateMap2 = AppUtil.remainDateToMap(DataUtil.DateToStrs(start_date), DataUtil.DateToStrs(end_date));

                rentMoney = AppUtil.returnDouble(rentMoney);
                // 计算空置期费用
                if(dateMap2 != null){
                    money = dateMap2.get("year") * 12 * rentMoney + dateMap2.get("month") * rentMoney + dateMap2.get("day") * AppUtil.returnDouble(rentMoney / 30);
                }
//                    addGrossProfit(hi_code, contractObject_code, AppConfig.profit_type_2, AppConfig.loss_explain_1, "房源空置期亏损", start_date, end_date, money, 1);
                break;

            /**
             * 换房出房
             */
            case AppConfig.contract_extstate_29:
                // TODO 暂时不晓得怎么处理
                hasVacancy = false;
                break;
        }

        if(!hasVacancy)
            return 0;

        houseGrossProfitVo.setContractObject_code(contractInfoVo.getContractObject_Code());
        houseGrossProfitVo.setProfit_description("房源空置期亏损");
        houseGrossProfitVo.setStart_date(start_date);
//        houseGrossProfitVo.setEnd_date(end_date);
        houseGrossProfitVo.setProfit_money(new BigDecimal(money));
        houseGrossProfitVo.setEm_id(1);// 系统
        houseGrossProfitVo.setData_state(1);// 有效
        houseGrossProfitVo.setIsDone(1);// 记录完成
        if(-1 != isDirect){
            houseGrossProfitVo.setIsDirect(isDirect);
        }

        if(null == houseGrossProfitVos || houseGrossProfitVos.isEmpty()){
            houseLibraryDao.addGrossProfit(houseGrossProfitVo);
            addGrossProfitRela(start_date, contractZLVo, houseGrossProfitVo);
        } else if(houseGrossProfitVos.size() == 1){
            houseLibraryDao.updateGrossProfit(houseGrossProfitVo);
        } else if(houseGrossProfitVos.size() > 1){
            for(int i = 0; i < houseGrossProfitVos.size(); i++){
                HouseGrossProfitVo profitVo = houseGrossProfitVos.get(i);
                if(i == 0){
                    profitVo.setStart_date(start_date);
                    profitVo.setEnd_date(end_date);
                    profitVo.setProfit_money(new BigDecimal(money));
                    profitVo.setIsDone(1);
                } else {
                    profitVo.setData_state(0);
                }
                houseLibraryDao.updateGrossProfit(profitVo);
            }
        }
        return 1;
    }

    /**
     * 违约、结算
     * @param hi_code
     * @param contractObject_code
     * @return
     */
    public int addSettleAccounts(String hi_code, String contractObject_code) throws Exception {
        if (StringUtils.isEmpty(contractObject_code)) {
            throw new AppException("参数错误，房源编码或合同编码为空异常");
        }

        // 查询合同信息
        ContractInfoVo contractVo = contractService.queryContractInfo(contractObject_code);

        BusinessCancelContractOrder contractOrder = new BusinessCancelContractOrder();
        contractOrder.setContractObject_Code(contractObject_code);
        contractOrder.setCco_state("完成");
        contractOrder = contractService.queryCancelContractByWhere(contractOrder);
        if(null == contractOrder){
            throw new AppException("该合同暂无合约订单");
        }

        ContractStatementBalanceVo statementBalanceVo = new ContractStatementBalanceVo();
        statementBalanceVo.setCco_code(contractOrder.getCco_code());
        List<ContractStatementBalanceVo> balanceVoList = contractService.queryBalanceListByCode(statementBalanceVo);

        if(null == balanceVoList || balanceVoList.isEmpty()){
            return 0;
        }

        Date start_date = null;
        Date end_date = null;
        Integer profitType = 0;
        Integer profitExplain = 0;
        String profit_description = "";
        boolean isDeduct = false;
        Date statement_handoverDate = contractOrder.getStatement_handoverDate();

        if(AppConfig.TYPE_CONTRACT_201.equals(contractVo.getContractObject_Type())){
            Map<String, Integer> dateMap = AppUtil.remainDateToMap(DataUtil.DateToStrs(contractVo.getContractObject_Date()), DataUtil.DateToStrs(contractVo.getContractObject_DeadlineTime()));
            for(int i = 0; i <= dateMap.get("year"); i++){
                Date start = DataUtil.getAfterDateByYear("Y", contractVo.getContractObject_Date(), i);
                Date end = DataUtil.getAfterDateByYear("Y", contractVo.getContractObject_Date(), (i + 1));
                end = end.before(contractVo.getContractObject_DeadlineTime()) ? end : contractVo.getContractObject_DeadlineTime();
                // 结算日期
                Date balance = contractOrder.getStatement_balanceTime();
                if(balance.after(start) && balance.before(end)){
                    start_date = start;
                    end_date = end;
                    break;
                }
            }

        } else if(AppConfig.TYPE_CONTRACT_202.equals(contractVo.getContractObject_Type())){
            start_date = contractVo.getContractObject_Date();
            end_date = contractVo.getContractObject_DeadlineTime();

            String cco_type = contractOrder.getCco_applicationType();
            if(AppConfig.cco_applicationtype_zz.equals(cco_type) || AppConfig.cco_applicationtype_tz.equals(cco_type) || AppConfig.cco_applicationtype_qs.equals(cco_type)){

                // 交房日期还在租金合同租期内，则计算违约期内的租金差价扣除
                if(statement_handoverDate.before(end_date) || AppUtil.sameDate(statement_handoverDate, end_date)){
                    isDeduct = true;
                }
            }
        }

        switch (contractOrder.getCco_applicationType()){
            // 转租为公司利润
            case AppConfig.cco_applicationtype_zz:
                profitType = AppConfig.profit_type_1;
                profitExplain = AppConfig.profit_explain_4;
                profit_description = "租客转租服务费用";
                if(isDeduct){
                    addGrossProfitOfRent(hi_code, contractObject_code, contractVo, statement_handoverDate, 2);
                }

                addStatementGross(contractVo, balanceVoList, statement_handoverDate, statement_handoverDate, profitType, profitExplain, profit_description);
                break;
            // 强退为公司利润
            case AppConfig.cco_applicationtype_tz:
                profitType = AppConfig.profit_type_1;
                profitExplain = AppConfig.profit_explain_3;
                profit_description = "租客强退服务费用";
                if(isDeduct){
                    addGrossProfitOfRent(hi_code, contractObject_code, contractVo, statement_handoverDate, 2);
                }

                addStatementGross(contractVo, balanceVoList, statement_handoverDate, statement_handoverDate, profitType, profitExplain, profit_description);
                break;
            // 强收为公司利润
            case AppConfig.cco_applicationtype_qs:
                profitType = AppConfig.profit_type_1;
                profitExplain = AppConfig.profit_explain_5;
                profit_description = "强收房结算结余";
                if(isDeduct){
                    addGrossProfitOfRent(hi_code, contractObject_code, contractVo, statement_handoverDate, 2);
                }

                addStatementGross(contractVo, balanceVoList, statement_handoverDate, statement_handoverDate, profitType, profitExplain, profit_description);
                break;
            // 解约
            case AppConfig.cco_applicationtype_jy:

                for(ContractStatementBalanceVo balanceVo : balanceVoList){
                    if(4 == balanceVo.getCsb_type()){// 违约金
                        Double surplus = balanceVo.getCsb_credit() - balanceVo.getCsb_debit();
                        if(surplus > 0){
                            profitType = AppConfig.profit_type_1;
                            profitExplain = AppConfig.profit_explain_11;
                            profit_description = "房东违约支付的违约金";
                        } else if(surplus < 0){
                            profitType = AppConfig.profit_type_2;
                            profitExplain = AppConfig.loss_explain_3;
                            profit_description = "公司支付给房东的违约金";
                        }
                        addGrossProfit(profitType, profitExplain, profit_description, statement_handoverDate, statement_handoverDate, surplus, contractVo);
                    } else if(3 == balanceVo.getCsb_type()){// 代理结算费用
                        Double surplus = balanceVo.getCsb_credit() - balanceVo.getCsb_debit();
                    }
                }

                addBreakContractGross(hi_code, contractObject_code, contractOrder);
                break;
            // 换房
            case AppConfig.cco_applicationtype_hf:
                break;
        }

        return 1;
    }

    private void addStatementGross(ContractInfoVo contractVo, List<ContractStatementBalanceVo> balanceVoList, Date start_date, Date end_date, Integer profitType, Integer profitExplain, String profit_description) {
        if (profitExplain != AppConfig.profit_explain_5) {
            for (ContractStatementBalanceVo balanceVo : balanceVoList) {
                if (3 == balanceVo.getCsb_type() || 4 == balanceVo.getCsb_type()) {
                    Double surplus = balanceVo.getCsb_credit() - balanceVo.getCsb_debit();
                    if (0.0 == surplus) {
                        continue;
                    }
                    if (3 == balanceVo.getCsb_type()) {
                        profit_description = "代理结算费用";
                    } else if (4 == balanceVo.getCsb_type()) {
                        profit_description = "违约金结算费用";
                    }
                    addGrossProfit(profitType, profitExplain, profit_description, start_date, end_date, surplus, contractVo);
                }
            }
        } else {
            Double csb_credit = 0.0;// 应收
            Double csb_debit = 0.0;// 应付
            for (ContractStatementBalanceVo balanceVo : balanceVoList) {

                csb_credit += balanceVo.getCsb_credit();
                csb_debit += balanceVo.getCsb_debit();
            }
            addGrossProfit(profitType, profitExplain, profit_description, start_date, end_date, AppUtil.returnDouble(csb_debit - csb_credit), contractVo);
        }
    }

    /**
     * 公司承担一半服务费(租客服务费用完，租客与公司各自承担一半维修费时调用)
     * @param hi_code
     * @param contractObject_code
     * @param profit_money
     * @return
     */
    public int addGPOfLossService(String hi_code, String contractObject_code, Double profit_money) throws AppException {

        if (StringUtils.isEmpty(hi_code) || StringUtils.isEmpty(contractObject_code)) {
            throw new AppException("参数错误，房源编码或合同编码为空异常");
        }

        // 查询租赁合同
        ContractInfoVo contractZLVo = contractService.queryContractInfo(contractObject_code);

        return addGrossProfit(AppConfig.profit_type_3, AppConfig.expend_explain_1,"公司承担一半维修费用", contractZLVo.getContractObject_Date(),contractZLVo.getContractObject_DeadlineTime(), profit_money, contractZLVo);
    }

    /**
     * 解约免租期扣除
     * @param hi_code
     * @param contractObject_code
     * @param contractOrder
     * @return
     */
    public int addBreakContractGross(String hi_code, String contractObject_code, BusinessCancelContractOrder contractOrder) throws Exception {

        // 查询合同
        ContractInfoVo contractInfo = contractService.queryContractInfo(contractObject_code);
        if(1 == contractInfo.getContractObject_RentFreeMode()){
            contractInfo.setContractBody_Rent(contractInfo.getContractBody_Rent() / 12);
        }
        if(AppConfig.TYPE_CONTRACT_201.equals(contractInfo.getContractObject_Type())){
            if(AppConfig.cco_applicationtype_jy.equals(contractOrder.getCco_applicationType())){
                Double rent = (null == contractInfo.getContractBody_Increasing() || "0".equals(contractInfo.getContractBody_Increasing())) ? contractInfo.getContractBody_Rent() : (costRent(contractInfo, contractOrder.getStatement_balanceTime()));

                Date start_date = null;
                Date end_date = null;
                Integer contractMode = contractInfo.getContractBody_ContractMode();
                int freeDay = 0;
                Date start = contractInfo.getContractObject_Date();
                Date end = contractInfo.getContractObject_DeadlineTime();

                // 结算日期
                Date balance = contractOrder.getStatement_balanceTime();

                // 删除解约后的免租期收入记录
                if(null != contractInfo.getContractBody_FreeTime()){
                    deductGPRecord(hi_code, contractObject_code, AppConfig.profit_type_1, AppConfig.profit_explain_1, balance);
                }

                // 删除解约后管理费收入记录
                if(null != contractInfo.getContractBody_Service() && contractInfo.getContractBody_Service().doubleValue() > 0.0) {
                    deductGPRecord(hi_code, contractObject_code, AppConfig.profit_type_1, AppConfig.profit_explain_7, balance);
                }

                // 删除解约后包修费收入记录
                if(null != contractInfo.getContractBody_GuaranteeCost()){
                    deductGPRecord(hi_code, contractObject_code, AppConfig.profit_type_1, AppConfig.profit_explain_8, balance);
                }

                // 扣除公司管理费成本
                deductGPRecord(hi_code, contractObject_code, AppConfig.profit_type_4, AppConfig.cost_explain_1, balance);
            }
        }

        return 1;
    }

    private void deductGPRecord(String hi_code, String contractObject_code, int profitType, int profitExplain, Date balance) {
        HouseGrossProfitVo grossProfitVo = new HouseGrossProfitVo();
        grossProfitVo.setHi_code(hi_code);
        grossProfitVo.setContractObject_code(contractObject_code);
        grossProfitVo.setProfitType(profitType);
        grossProfitVo.setProfitExplain(profitExplain);
        grossProfitVo.setIsDone(1);
        List<HouseGrossProfitVo> grossProfitVos = houseLibraryDao.queryGrossListByCode(grossProfitVo);

        for(HouseGrossProfitVo profitVo : grossProfitVos){
            if(balance.before(profitVo.getStart_date())){
                profitVo.setData_state(0);
                houseLibraryDao.updateGrossProfit(profitVo);
            }
        }
    }

    /**
     * 公司保险费支出
     * @param hi_code
     * @param contractObject_code
     * @param money
     * @return
     */
    public int addInsurance(String hi_code, String contractObject_code, Double money, Date start_date, Date end_date){
        HouseGrossProfitVo grossProfitVo = new HouseGrossProfitVo();
        grossProfitVo.setHi_code(hi_code);
        grossProfitVo.setContractObject_code(contractObject_code);
        grossProfitVo.setProfitType(AppConfig.profit_type_3);
        grossProfitVo.setProfitExplain(AppConfig.expend_explain_2);
        grossProfitVo.setProfit_description("公司支出保险费");
        grossProfitVo.setIsDone(1);
        grossProfitVo.setStart_date(start_date);
        grossProfitVo.setEnd_date(end_date);
        grossProfitVo.setProfit_money(new BigDecimal(money));
        grossProfitVo.setData_state(1);
        grossProfitVo.setEm_id(1);
        houseLibraryDao.addGrossProfit(grossProfitVo);
        addGrossProfitRela(start_date, contractService.queryContractInfo(contractObject_code), grossProfitVo);
        return 1;
    }

    /**
     * 租赁合同复核利润记录
     * @param hi_code
     * @param contractObject_code
     * @return
     */
    public void addProfitByZL(String hi_code, String contractObject_code) throws Exception {
        // 租金差价
//        addGrossProfitOfRent(hi_code, contractObject_code);
        // 服务费利润添加
        addGrossProfitOfService(hi_code, contractObject_code);
        // 租金溢价
        addProfeitRentPremium(hi_code, contractObject_code);
        // 空置期亏损
        addGrossProfitOfVacancy(hi_code, contractObject_code);
    }

    public int updateGrossProfit(HouseGrossProfitVo houseGrossProfitVo){
        return houseLibraryDao.updateGrossProfit(houseGrossProfitVo);
    }

    /**
     * 分页查询利润亏损记录
     * @param pagination
     * @return
     */
    public Pagination<HouseGrossProfitVo> queryGrossProfitByCode(Pagination<HouseGrossProfitVo> pagination) {
        return houseLibraryDao.queryGrossProfitByCode(pagination);
    }

    /**
     * 利润亏损小计
     * @param houseGrossProfitVo
     * @return
     */
    public List<HouseGrossProfitVo> queryGPSubtotalByCode(HouseGrossProfitVo houseGrossProfitVo) {
        return houseLibraryDao.queryGPSubtotalByCode(houseGrossProfitVo);
    }

    /**
     * 计算当前托管合同在租金递增之后的价格
     * @param contractInfo
     * @param curentDate
     * @return
     */
    public Double costRent(ContractInfoVo contractInfo, Date curentDate){
        if(StringUtils.isEmpty(contractInfo.getContractBody_Increasing())){
            return contractInfo.getContractBody_Rent();
        }

        if("0".equals(contractInfo.getContractBody_Increasing()) || !AppUtil.isNull(contractInfo.getContractBody_Increasing())){
            return contractInfo.getContractBody_Rent();
        }

        Double money = 0.0;
        Double increase = 0.0;
        Double inPercent = 1.0;
        String[] increasArr = contractInfo.getContractBody_Increasing().split("\\|");
        for(int i = 0; i < increasArr.length; i++){
            Date end_date = DataUtil.getAfterDateByYear("D", DataUtil.getAfterDateByYear("Y", contractInfo.getContractObject_Date(), (i + 1)), -1);
            end_date = end_date.before(contractInfo.getContractObject_DeadlineTime()) ? end_date : contractInfo.getContractObject_DeadlineTime();
            Date start_date = DataUtil.getAfterDateByYear("Y", contractInfo.getContractObject_Date(), i);

            if(increasArr[i].contains("%")){
                inPercent = inPercent * (1.0 + Double.valueOf(increasArr[i].replace("%", "")) / 100.0);
                money = AppUtil.returnDouble(contractInfo.getContractBody_Rent() * inPercent);
            } else {
                increase += Double.valueOf(increasArr[i]);
                money = AppUtil.returnDouble(contractInfo.getContractBody_Rent() + increase);
            }
            if((start_date.before(curentDate) || AppUtil.sameDate(start_date, curentDate))
                    && (end_date.after(curentDate) || AppUtil.sameDate(end_date, curentDate))){
                break;
            }
        }

        return money;
    }

    public int queryGrossProfitCountByCode(Pagination<HouseGrossProfitVo> pagination){
        return houseLibraryDao.queryGrossProfitCountByCode(pagination);
    }

    /**
     * 查询空置房
     * @return
     */
    public List<HouseInfoKeep> queryVacantHouseList(){
        return houseLibraryDao.queryVacantHouseList();
    }

    /**
     * 添加或更新空置期亏损记录
     * @param hi_code
     * @throws Exception
     */
    public void saveGrossProfitRecord(HouseInfoKeep houseInfoKeep) throws Exception {

        HouseGrossProfitVo houseGrossProfitVo = new HouseGrossProfitVo();
        houseGrossProfitVo.setHi_code(houseInfoKeep.getHi_code());
        houseGrossProfitVo.setProfitType(AppConfig.profit_type_2);
        houseGrossProfitVo.setProfitExplain(AppConfig.loss_explain_1);
        houseGrossProfitVo.setIsDone(0);

        HouseGrossProfitVo houseGrossProfitVo2 = houseLibraryDao.queryGrossDoing(houseGrossProfitVo);

        // 获取托管合同租金
        ViewBusinessContractVo contractTGVo = new ViewBusinessContractVo();
        contractTGVo.setHi_code(houseInfoKeep.getHi_code());
        contractTGVo.setContractObject_Type("托管合同");
        contractTGVo = contractService.selectViewContractListHiCode(contractTGVo);

        ContractInfoVo contractTGInfo = new ContractInfoVo();
        if(AppUtil.isNull(contractTGVo.getContractBody_Increasing())){
            contractTGInfo.setContractBody_Increasing(contractTGVo.getContractBody_Increasing());
        }
        if(1 == contractTGVo.getContractObject_RentFreeMode()){
            contractTGInfo.setContractBody_Rent(contractTGVo.getContractBody_Rent() / 12);
        } else {
            contractTGInfo.setContractBody_Rent(contractTGVo.getContractBody_Rent());
        }
        contractTGInfo.setContractObject_Date(contractTGVo.getContractObject_Date());
        contractTGInfo.setContractObject_DeadlineTime(contractTGVo.getContractObject_DeadlineTime());
        contractTGInfo.setContractObject_Id(contractTGVo.getContractObject_Id());
        contractTGInfo.setUcc_id(contractTGVo.getUcc_id());

        Date date = new Date();
        Double rentMoney = costRent(contractTGInfo, date);
        Date start_date = null;
        Integer isDirect = -1;

        switch (houseInfoKeep.getHi_forRentState()) {
            /**
             *  新存招租：1001 取托管合同时间
             */
            case AppConfig.hi_forRentState_1001:
                start_date = contractTGVo.getContractObject_Date();
                isDirect = 1;
                break;

            /**
             * 退租招租：1003；强收招租：1005 取合约交房日期
             */
            case AppConfig.hi_forRentState_1003:
            case AppConfig.hi_forRentState_1005:
                // 获取租赁合同
                ViewBusinessContractVo contractZLVo = new ViewBusinessContractVo();
                contractZLVo.setHi_code(houseInfoKeep.getHi_code());
                contractZLVo.setContractObject_Type("租赁合同");
                List<ViewBusinessContractVo> contractZLVos = contractService.queryContractNotObsolute(contractZLVo);

                BusinessCancelContractOrder contractOrder = new BusinessCancelContractOrder();
                contractOrder.setContractObject_Code(contractZLVos.get(0).getContractObject_Code());
                contractOrder.setCco_state_no("取消");
                contractOrder = contractService.queryCancelContractByWhere(contractOrder);

                start_date = contractOrder.getStatement_handoverDate();
                isDirect = 2;
                break;

            /**
             * 到期招租：1004 取租赁合同结束后一天时间
             */
            case AppConfig.hi_forRentState_1004:
                ViewBusinessContractVo contractZLVo2 = new ViewBusinessContractVo();
                contractZLVo2.setHi_code(houseInfoKeep.getHi_code());
                contractZLVo2.setContractObject_Type("租赁合同");
                List<ViewBusinessContractVo> contractZLVos2 = contractService.queryContractNotObsolute(contractZLVo2);

                start_date = DataUtil.getAfterDateByYear("D", contractZLVos2.get(0).getContractObject_DeadlineTime(), 1);
                isDirect = 1;
                break;

            /**
             * 换房招租：1006 TODO 暂时空起
             */
            case AppConfig.hi_forRentState_1006:
                break;

        }

        // 获取当前是否为每月首日
        boolean isFirstDay = AppUtil.Day(date) == 1;

        houseGrossProfitVo.setContractObject_code(contractTGVo.getContractObject_Code());
        houseGrossProfitVo.setProfit_description("房源空置期亏损");
        houseGrossProfitVo.setData_state(1);
        houseGrossProfitVo.setStart_date(start_date);
        houseGrossProfitVo.setEnd_date(date);

        Map<String, Integer> dateMap1 = AppUtil.remainDateToMap(DataUtil.DateToStrs(start_date), DataUtil.DateToStrs(date));
        Double money_new = dateMap1.get("year") * 12 * rentMoney + dateMap1.get("month") * rentMoney + dateMap1.get("day") * AppUtil.returnDouble(rentMoney / 30);

        houseGrossProfitVo.setProfit_money(new BigDecimal(money_new));
        houseGrossProfitVo.setEm_id(1);
        if(isDirect != -1){
            houseGrossProfitVo.setIsDirect(isDirect);
        }

        if(null == houseGrossProfitVo2){
            houseGrossProfitVo.setCreate_time(date);
            houseLibraryDao.addGrossProfit(houseGrossProfitVo);

            addGrossProfitRela(start_date, contractTGInfo, houseGrossProfitVo);
        } else {
            /**
             * 以自然月结束日结算，跨月的空置期需计入下一个月的空置亏损，上一个月的空置亏损记录完结
             */
            // 计算亏损费用
            HouseGrossProfitVo houseGrossProfitVo3 = new HouseGrossProfitVo();
            houseGrossProfitVo3.setGp_id(houseGrossProfitVo2.getGp_id());
            Map<String, Integer> dateMap = AppUtil.remainDateToMap(DataUtil.DateToStrs(houseGrossProfitVo2.getStart_date()), DataUtil.DateToStrs(date));
            rentMoney = AppUtil.returnDouble(rentMoney);
            Double money = dateMap.get("year") * 12 * rentMoney + dateMap.get("month") * rentMoney + dateMap.get("day") * AppUtil.returnDouble(rentMoney / 30);
            houseGrossProfitVo3.setProfit_money(new BigDecimal(money));
            houseGrossProfitVo3.setEnd_date(date);
            if(isFirstDay){
                houseGrossProfitVo3.setIsDone(1);
                houseGrossProfitVo3.setEnd_date(DataUtil.getAfterDateByYear("D", date, -1));
                // 添加本月新的空置亏损记录
                houseGrossProfitVo.setStart_date(date);
                houseGrossProfitVo.setEnd_date(date);

                Map<String, Integer> dateMap2 = AppUtil.remainDateToMap(DataUtil.DateToStrs(date), DataUtil.DateToStrs(date));
                Double money_new2 = dateMap1.get("year") * 12 * rentMoney + dateMap1.get("month") * rentMoney + dateMap1.get("day") * AppUtil.returnDouble(rentMoney / 30);

                houseGrossProfitVo.setProfit_money(new BigDecimal(money_new2));
                houseGrossProfitVo.setCreate_time(date);
                houseLibraryDao.addGrossProfit(houseGrossProfitVo);

                addGrossProfitRela(start_date, contractTGInfo, houseGrossProfitVo);

                HouseGrossProfitRelaVo houseGrossProfitRelaVo = new HouseGrossProfitRelaVo();
                houseGrossProfitRelaVo.setGp_id(houseGrossProfitVo2.getGp_id());
                houseGrossProfitRelaVo = houseLibraryDao.queryGPRById(houseGrossProfitRelaVo);
                if(null != houseGrossProfitRelaVo){
                    houseGrossProfitRelaVo.setEnd_date(DataUtil.getAfterDateByYear("D", date, -1));
                    houseLibraryDao.updateGrossProfitRela(houseGrossProfitRelaVo);
                }
            }
            houseLibraryDao.updateGrossProfit(houseGrossProfitVo3);
        }
    }

    public List<HouseGrossProfitVo> queryGrossListByCode(HouseGrossProfitVo houseGrossProfitVo){
        return houseLibraryDao.queryGrossListByCode(houseGrossProfitVo);
    }

    /**
     * 获取租赁合同对应的在哪份托管合同期内
     * @param viewBusinessContractVos
     * @param contractInfoVo
     * @return
     */
    public ViewBusinessContractVo getTGContractInfo(List<ViewBusinessContractVo> viewBusinessContractVos, ContractInfoVo contractInfoVo){
        if(null == viewBusinessContractVos || null == contractInfoVo){
            return null;
        }
        Date zl_start = contractInfoVo.getContractObject_Date();
//        Date zl_end = contractInfoVo.getContractObject_DeadlineTime();
        for(ViewBusinessContractVo businessContractVo : viewBusinessContractVos){
            Date tg_start = businessContractVo.getContractObject_Date();
            Date tg_end = businessContractVo.getContractObject_DeadlineTime();
            if((zl_start.after(tg_start) || AppUtil.sameDate(zl_start, tg_start)) /*&& (zl_end.before(tg_end) || AppUtil.sameDate(zl_end, tg_end))*/){
                return businessContractVo;
            }
        }
        return null;
    }

    /**
     * 判断是否为M+1模式
     * @param start
     * @param end
     * @return
     */
    public static boolean isM1(Date start, Date end) throws Exception {
        boolean isM1 = false;
        if(null == start || null == end){
            return isM1;
        }
        Map<String, Integer> dateMap = AppUtil.remainDateToMap(DataUtil.DateToStrs(start), DataUtil.DateToStrs(end));
        if(dateMap.get("year") == dateMap.get("month")){
            isM1 = true;
        }

        return isM1;
    }

    /**
     * 更改房屋招租状态
     * @author tanglei
     */
    public void updateIsForRent (UserCenterEmployee employee,HouseInfoKeep houseInfoKeep, ContractImplRecordVo contractImplRecordVo) throws Exception{
        if (houseInfoKeep.getHi_isForRent() == 1) {
            ContractObjectVo contractObjectVo = new ContractObjectVo();
            contractObjectVo.setHi_code(houseInfoKeep.getHi_code());
            contractObjectVo.setContractObject_Type("租赁合同");
            contractObjectVo = contractObjectService.queryContractObject(contractObjectVo);
            int state=0;
            if (contractObjectVo == null) {
                state=AppConfig.hi_forRentState_1001;
            } else {
                switch (contractObjectVo.getContractObject_ExtState()) {
                    case AppConfig.contract_extstate_20:
                        state = AppConfig.hi_forRentState_1001;
                        break;
                    case AppConfig.contract_extstate_23:
                        state = AppConfig.hi_forRentState_1004;
                        break;
                    case AppConfig.contract_extstate_25:
                        state = AppConfig.hi_forRentState_1002;
                        break;
                    case AppConfig.contract_extstate_26:
                        state = AppConfig.hi_forRentState_1003;
                        break;
                    case AppConfig.contract_extstate_27:
                        state = AppConfig.hi_forRentState_1005;
                        break;
                    case AppConfig.contract_extstate_29:
                        state = AppConfig.hi_forRentState_1006;
                        break;
                }
                houseInfoKeep.setHi_forRentState(state);
            }
        }
        //线下招租状态更改
        int bools = housingAllocationDao.updateHouseInformationKeep(houseInfoKeep);
        //线上招租状态更改
        if (houseInfoKeep.getHi_isForRent() == AppConfig.hi_isForRent_0 || houseInfoKeep.getHi_isForRent() == AppConfig.hi_isForRent_2) {
            houseInfoKeep.setHi_isForRent(AppConfig.hi_isForRent_0);
        }
        housingAllocationDao.updateHouseContractState(houseInfoKeep);
        contractImplRecordVo.setHi_code(houseInfoKeep.getHi_code());
        contractImplRecordVo.setCir_type(AppConfig.contractTpye_1010);
        contractImplRecordVo.setCir_source(1);
        contractImplRecordVo.setCir_author(employee.getEm_id());
        contractImplRecordVo.setCir_createTime(new Date());
        contractObjectService.addHouseRecord(contractImplRecordVo);
        if (bools < 1) {
            throw new AppException("添加合同日志失败，请重试或联系管理员");
        }
    }

    /**
     * 变更归属门店
     * @method changeUccInfo
     * @param hi_code
     * @param ucc_id
     * @return
     */
    public int changeUccInfo(String hi_code, Integer ucc_id){

        HouseGrossProfitRelaVo relaVo = new HouseGrossProfitRelaVo();
        relaVo.setHi_code(hi_code);
        List<HouseGrossProfitRelaVo> profitRelaVoList = houseLibraryDao.queryGPRByCode(relaVo);
        if(null == profitRelaVoList || profitRelaVoList.isEmpty()){
            return 0;
        }
        for(HouseGrossProfitRelaVo profitRelaVo : profitRelaVoList){
            profitRelaVo.setData_state(0);
            profitRelaVo.setEnd_date_c(new Date());
            houseLibraryDao.updateGrossProfitRela(profitRelaVo);

            HouseGrossProfitRelaVo houseGrossProfitRelaVo = new HouseGrossProfitRelaVo();
            houseGrossProfitRelaVo.setGp_id(profitRelaVo.getGp_id());
            houseGrossProfitRelaVo.setMain_em_id(profitRelaVo.getMain_em_id());
            houseGrossProfitRelaVo.setMain_ratio(profitRelaVo.getMain_ratio());
            houseGrossProfitRelaVo.setVice_em_id(profitRelaVo.getVice_em_id());
            houseGrossProfitRelaVo.setVice_ratio(profitRelaVo.getVice_ratio());
            houseGrossProfitRelaVo.setUcc_id(ucc_id);
            houseGrossProfitRelaVo.setStart_date_c(DataUtil.getAfterDateByYear("D", new Date(), 1));
//            houseGrossProfitRelaVo.setEnd_date(profitRelaVo.getEnd_date());
            houseGrossProfitRelaVo.setData_state(1);
            houseGrossProfitRelaVo.setEx_id(profitRelaVo.getGr_id());
            houseLibraryDao.addGrossProfitRela(houseGrossProfitRelaVo);
        }

        return 1;
    }

    public List<HouseGrossProfitRelaVo> queryGPRByCode(String contractObject_code) {
        HouseGrossProfitRelaVo profitRelaVo = new HouseGrossProfitRelaVo();
        profitRelaVo.setContractObject_code(contractObject_code);
        List<HouseGrossProfitRelaVo> profitRelaVoList = houseLibraryDao.queryGPRByCode(profitRelaVo);
        return profitRelaVoList;
    }

    /**
     * 变更管家
     * @method changeEmInfo
     * @param contractObject_code
     * @param main_em_id 主管家ID
     * @param main_ratio 主管家分成比例
     * @param vice_em_id 副管家ID
     * @param vice_ratio 副管家分成比例
     * @return
     */
    public int changeEmInfo(String contractObject_code, Integer main_em_id, Double main_ratio, Integer vice_em_id, Double vice_ratio){
        List<HouseGrossProfitRelaVo> profitRelaVoList = queryGPRByCode(contractObject_code);
        if(null == profitRelaVoList || profitRelaVoList.isEmpty()){
            return 0;
        }
        for(HouseGrossProfitRelaVo profitRelaVo : profitRelaVoList){
            profitRelaVo.setData_state(0);
            profitRelaVo.setEnd_date(new Date());
            houseLibraryDao.updateGrossProfitRela(profitRelaVo);

            HouseGrossProfitRelaVo houseGrossProfitRelaVo = new HouseGrossProfitRelaVo();
            houseGrossProfitRelaVo.setGp_id(profitRelaVo.getGp_id());
            houseGrossProfitRelaVo.setMain_em_id(main_em_id);
            houseGrossProfitRelaVo.setMain_ratio(main_ratio);
            houseGrossProfitRelaVo.setVice_em_id(vice_em_id);
            houseGrossProfitRelaVo.setVice_ratio(vice_ratio);
            houseGrossProfitRelaVo.setUcc_id(profitRelaVo.getUcc_id());
            houseGrossProfitRelaVo.setStart_date(DataUtil.getAfterDateByYear("D", new Date(), 1));
//            houseGrossProfitRelaVo.setEnd_date(profitRelaVo.getEnd_date());
            houseGrossProfitRelaVo.setData_state(1);
            houseGrossProfitRelaVo.setEx_id(profitRelaVo.getGr_id());
            houseLibraryDao.addGrossProfitRela(houseGrossProfitRelaVo);
        }

        return 1;
    }

}
