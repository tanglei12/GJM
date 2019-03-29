package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HouseLibraryDao;
import com.gjp.model.*;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import com.gjp.util.Pagination;
import com.gjp.util.TableList;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * 房屋库ImplDao
 *
 * @author zoe
 */
@Repository
public class HousingLibraryDAOImpl extends BaseDAO implements HouseLibraryDao {

    /*
     * (non-Javadoc) 查询所有房屋基本信息
     *
     * @see com.gjp.dao.HousingAllocationDao#selectHouseHouseInformation()
     */
    @Override
    //@Cacheable(value="house", key="maoke")
    public PageModel<HouseInfoKeep> selectHouseHouseInformation(int pageNo, int pageSize, HouseModel houseModel) {
        PageModel<HouseInfoKeep> pageModel = new PageModel<HouseInfoKeep>();
        // 分页设置开始点
        pageModel.setPageNo((pageNo - 1) * pageSize);
        // 分页设置查询条数
        pageModel.setPageSize(pageSize);
        // 分页设置查询条件
        pageModel.setHouseModel(houseModel);
        // 分页查询房屋基本信息集合
        List<HouseInfoKeep> houseHouseInformationList = super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.selectHouseHouseInformation",
                pageModel);
        // 查询房屋总记录数
        HouseInfoKeep hk = sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.selectTotalHouseHouseInformation", pageModel);
        int totalRecords = hk.getSize();
        pageModel.setList(houseHouseInformationList);
        pageModel.setTotalRecords(totalRecords);
        return pageModel;
    }

    @Override
    public PageModel<HouseInfoKeep> selectHouseHouseInformationSale(int pageNo, int pageSize, HouseModel houseModel) {
        PageModel<HouseInfoKeep> pageModel = new PageModel<HouseInfoKeep>();
        // 分页设置开始点
        pageModel.setPageNo((pageNo - 1) * pageSize);
        // 分页设置查询条数
        pageModel.setPageSize(pageSize);
        // 分页设置查询条件
        pageModel.setHouseModel(houseModel);
        // 分页查询房屋基本信息集合
        List<HouseInfoKeep> houseHouseInformationList = super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.selectHouseHouseInformationSale",
                pageModel);
        // 查询房屋总记录数
        HouseInfoKeep hk = sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.selectTotalHouseHouseInformationSale", pageModel);
        int totalRecords = hk.getSize();
        pageModel.setList(houseHouseInformationList);
        pageModel.setTotalRecords(totalRecords);
        return pageModel;
    }

    /*
     * (non-Javadoc) ajax查询房屋扩展信息
     *
     * @see com.gjp.dao.HousingAllocationDao#selectHouseExtendedById(int)
     */
    @Override
    public HouseHouseExtended selectHouseExtendedById(int id) {
        HouseHouseExtended houseHouseExtended = super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseExtendedDao.selectHouseExtendedById", id);
        return houseHouseExtended;
    }

    @Override
    public int addHouse(HouseHouseInformation houseHouseInformation) {
        return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseLibraryDao.addHouse", houseHouseInformation);
    }

    @Override
    public HouseInfoKeep selectHouseById(int hi_id) {
        return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.selectHouseById", hi_id);
    }

    @Override
    public int upDataHouse(HouseInfoKeep houseInfoKeep) {
        return super.sqlSessionTemplateProduct.update("com.gjp.dao.HouseLibraryDao.upDataHouse", houseInfoKeep);
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
        List<HouseInfoKeep> houseHouseInformationList = super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HousingAllocationDao.MyInformationPage", pageModel);
        // 查询房屋总记录数
        int totalRecords = super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HousingAllocationDao.selectMyTotalHouseHouseInformation", pageModel);
        pageModel.setList(houseHouseInformationList);
        pageModel.setTotalRecords(totalRecords);
        return pageModel;
    }

    @Override
    public List<Integer> selectHiIdByName(String hi_name) {
        return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.selectHiIdByName", hi_name);
    }

    @Override
    public String selectHouseByCode(String hi_code) {
        return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.selectHouseByCode", hi_code);
    }

    @Override
    public List<String> selectHouseName(String contract_status) {
        return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.selectHouseName", contract_status);
    }

    @Override
    public HouseHouseInformation selectHouseByName(HouseHouseInformation houseInformation) {
        return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.selectHouseByName", houseInformation);
    }

    @Override
    public int addHouseHouseInformationKeep(HouseInfoKeep houseInfoKeep) {
        return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseLibraryDao.addHouseHouseInformationKeep", houseInfoKeep);
    }

    @Override
    public HouseInfoKeep selectHouseHouseInformationKeepByPhiId(int phi_id) {
        return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.selectHouseHouseInformationKeepByPhiId", phi_id);
    }

    @Override
    public int updataHeState(int he_id) {
        return super.sqlSessionTemplateProduct.update("com.gjp.dao.HouseLibraryDao.updataHeState", he_id);
    }

    @Override
    public int upDataKeepHouse(HouseInfoKeep houseInfoKeep) {
        return super.sqlSessionTemplateProduct.update("com.gjp.dao.HouseLibraryDao.upDataKeepHouse", houseInfoKeep);
    }

    @Override
    public int slelctIdByCode(String hi_code) {
        return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.slelctIdByCode", hi_code);
    }

    @Override
    public HouseInfoKeep selectHouseInfoByCode(String hi_code) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.selectHouseInfoByCode", hi_code);
    }

    @Override
    public List<HouseTypeVo> queryHouseConfigTypeList(HouseTypeVo typeVo) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.queryHouseConfigTypeList", typeVo);
    }

    @Override
    public ViewProductHousePropertyListVo queryViewProductHousePropertyByHiCode(ViewProductHousePropertyListVo propertyListVo) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.queryViewProductHousePropertyByHiCode", propertyListVo);
    }

    @Override
    public List<ViewProductHousePropertyListVo> queryViewProductHousePropertyList(Pagination<ViewProductHousePropertyListVo> pagination) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.queryViewProductHousePropertyList", pagination);
    }

    @Override
    public HouseInfoKeep selectApartmentByPro(PropertyInfo userCenterPropertyInfo) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.selectApartmentByPro", userCenterPropertyInfo);
    }

    @Override
    public int updateHouseContractState(HouseInfoKeep informationKeep) {
        return sqlSessionTemplateProduct.update("com.gjp.dao.HouseLibraryDao.updateHouseContractState", informationKeep);
    }

    @Override
    public List<ViewProductHousePropertyListVo> queryViewProductHousePropertyByHbNameList(ViewProductHousePropertyListVo propertyListVo) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.queryViewProductHousePropertyByHbNameList", propertyListVo);
    }

    @Override
    public HoueFollowContent queryHouseFollowContent(HoueFollowContent followContent) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.queryHouseFollowContent", followContent);
    }

    @Override
    public int queryViewProductHousePropertyListTotalRecords(Pagination<ViewProductHousePropertyListVo> pagination) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.queryViewProductHousePropertyListTotalRecords", pagination);
    }

    @Override
    public HouseInfoKeep selectHouseNum(HouseInfoKeep houseInfoKeeps) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.selectHouseNum", houseInfoKeeps);
    }

    @Override
    public PositionRecordVo queryContractPositionRecord(PositionRecordVo positionRecordVo) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.queryContractPositionRecord", positionRecordVo);
    }

    @Override
    public int addHousePositionRecord(PositionRecordVo positionRecordVo) {
        return sqlSessionTemplateProduct.insert("com.gjp.dao.HouseLibraryDao.addHousePositionRecord", positionRecordVo);
    }

    @Override
    public int updateHousePositionRecord(PositionRecordVo positionRecordVo) {
        return sqlSessionTemplateProduct.update("com.gjp.dao.HouseLibraryDao.updateHousePositionRecord", positionRecordVo);
    }

    @Override
    //@CacheEvict(value="house",allEntries=true)
    public ViewHouseLibraryInfoVo queryHouseLibraryInfo(ViewHouseLibraryInfoVo houseLibraryInfoVo) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.queryHouseLibraryInfo", houseLibraryInfoVo);
    }

    @Override
    public int updateHouseInfo(HouseInfoKeep houseInformationKeep) {
        return sqlSessionTemplateProduct.update("com.gjp.dao.HouseLibraryDao.updateHouseInfo", houseInformationKeep);
    }

    @Override
    public int updateHouseInfoByOnlineHouse(HouseHouseInformation houseInformation) {
        return sqlSessionTemplateProduct.update("com.gjp.dao.HouseLibraryDao.updateHouseInfoByOnlineHouse", houseInformation);
    }

    @Override
    public int updateExtendInfo(HouseExtendedVo houseHouseExtended) {
        return sqlSessionTemplateProduct.update("com.gjp.dao.HouseLibraryDao.updateExtendInfo", houseHouseExtended);
    }

    @Override
    public List<HouseInfoKeep> isHavingHouseInfo(HouseInfoKeep houseInformationKeep) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.isHavingHouseInfo", houseInformationKeep);
    }

    @Override
    public Pagination<HouseInfoKeep> queryHouseLibraryInfoPageList(Pagination<HouseInfoKeep> pagination) {
        List<HouseInfoKeep> list = sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.queryHouseLibraryInfoPageList", pagination);
        int totalRecords = sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.queryHouseLibraryInfoPageRecords", pagination);
        pagination.setList(list, totalRecords);
        return pagination;
    }

    @Override
    public int queryHouseLibraryInfoPageRecords(Pagination<HouseInfoKeep> pagination) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.queryHouseLibraryInfoPageRecords", pagination);
    }

    @Override
    public List<ViewHouseDealListVo> queryHouseDealPageList(Pagination<ViewHouseDealListVo> pagination) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.queryHouseDealPageList", pagination);
    }

    @Override
    public Pagination<ViewHouseDealListVo> queryHouseDealAllPageList(Pagination<TableList> pagination) {
        List<ViewHouseDealListVo> list = sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.queryHouseDealAllPageList", pagination);
        int totalRecords = sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.queryHouseDealPageRecords", pagination);

        Pagination<ViewHouseDealListVo> paginationTo = new Pagination<ViewHouseDealListVo>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list, totalRecords);
        return paginationTo;
    }

    @Override
    public List<HouseImageVo> queryHouseImageList(HouseImageVo houseLibraryImageVo) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.queryHouseImageList", houseLibraryImageVo);
    }

    @Override
    public int addHouseStateRelation(HouseInformationStateRelation stateRelation) {
        return sqlSessionTemplateProduct.insert("com.gjp.dao.HouseLibraryDao.addHouseStateRelation", stateRelation);
    }

    @Override
    public int deleteHouseStateRelation(HouseInformationStateRelation stateRelation) {
        return sqlSessionTemplateProduct.delete("com.gjp.dao.HouseLibraryDao.deleteHouseStateRelation", stateRelation);
    }

    @Override
    public List<HouseInfoKeep> selectForRentHouseInformationKeep() {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.selectForRentHouseInformationKeep");
    }

    @Override
    public List<ViewHouseRankingVo> queryHouseRankingList(ViewHouseRankingVo rankingVo) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.queryHouseRankingList", rankingVo);
    }

    @Override
    public List<HouseInfoKeep> selectHouseForRent(HouseInfoKeep houseInfoKeep) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.selectHouseForRent", houseInfoKeep);
    }

    @Override
    public int addHouseImageType(HouseLibraryImageTypeVo imageTypeVo) {
        return sqlSessionTemplateProduct.insert("com.gjp.dao.HouseLibraryDao.addHouseImageType", imageTypeVo);
    }

    @Override
    public houseKeyVo queryHouseKeyInfo(houseKeyVo houseKey) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.queryHouseKeyInfo", houseKey);
    }

    @Override
    public int addHouseKey(houseKeyVo houseKeyVo) {
        return sqlSessionTemplateProduct.insert("com.gjp.dao.HouseLibraryDao.addHouseKey", houseKeyVo);
    }

    @Override
    public int updateHouseKey(houseKeyVo houseKeyVo) {
        return sqlSessionTemplateProduct.update("com.gjp.dao.HouseLibraryDao.updateHouseKey", houseKeyVo);
    }

    @Override
    public List<HouseTypeVo> selectHouseTypeHtParentID2() {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.selectHouseTypeHtParentID2");
    }

    @Override
    public Pagination<ViewHouseAllotVo> queryHouseAllotPageList(Pagination<TableList> pagination) {
        List<ViewHouseAllotVo> list = sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.queryHouseAllotPageList", pagination);
        int totalRecords = sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.queryTolalRecords");

        Pagination<ViewHouseAllotVo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list, totalRecords);
        return paginationTo;
    }

    @Override
    public List<HouseInfoKeep> selectHouseGuaranteeCost(HouseInfoKeep houseInfoKeep) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.selectHouseGuaranteeCost", houseInfoKeep);
    }

    @Override
    public List<HouseInfoKeep> selectHouseAscription() {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.selectHouseAscription");
    }

    @Override
    public HouseInfoKeep selectHouseAscriptionContract(HouseInfoKeep houseInfoKeep) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.selectHouseAscriptionContract", houseInfoKeep);
    }

    @Override
    public HouseInfoKeep selectHouseAscriptions(HouseInfoKeep houseInfoKeep) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.selectHouseAscriptions", houseInfoKeep);
    }

    @Override
    public List<HouseInfoKeep> selectHouseForRentList(HouseInfoKeep houseInfoKeep) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.selectHouseForRentList", houseInfoKeep);
    }

    @Override
    public int updateHousePositionRecords(PositionRecordVo positionRecordVo) {
        return sqlSessionTemplateProduct.update("com.gjp.dao.HouseLibraryDao.updateHousePositionRecords", positionRecordVo);
    }

    @Override
    public List<HouseInfoKeep> selectHouseInfoAll() {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.selectHouseInfoAll");
    }

    @Override
    public Pagination<ViewHouseLibraryInfoVo> querySimpleHouseInfoPageList(Pagination<ViewHouseLibraryInfoVo> pagination) {
        List<ViewHouseLibraryInfoVo> list = sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.querySimpleHouseInfoPageList", pagination);
        int totalRecords = sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.querySimpleHouseInfoPageRecords", pagination);

        Pagination<ViewHouseLibraryInfoVo> paginationTo = new Pagination<ViewHouseLibraryInfoVo>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list, totalRecords);
        return paginationTo;
    }

    @Override
    public List<PositionRecordVo> selectEMstate(PositionRecordVo positionRecordVo) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.selectEMstate", positionRecordVo);
    }

    @Override
    public int addHouseImageFolder(HouseImageFolder houseImageFolder) {
        houseImageFolder.setHif_createTime(new Date());
        return sqlSessionTemplateProduct.insert("com.gjp.dao.HouseLibraryDao.addHouseImageFolder", houseImageFolder);
    }

    @Override
    public HouseImageFolder selectHouseImageFolder(HouseImageFolder houseImageFolder) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.selectHouseImageFolder", houseImageFolder);
    }

    @Override
    public List<HouseImageVo> selectHouseImage(HouseImageVo image) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.selectHouseImage", image);
    }

    @Override
    public List<HouseImageFolder> selectListHouseImageFolder(HouseImageFolder folder) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.selectListHouseImageFolder", folder);
    }

    @Override
    public List<AppCode> appcode(AppCode appCode) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.appcode", appCode);
    }

    @Override
    public List<HouseInfoKeep> queryAllHouseInfoList(Pagination<HouseInfoKeep> pagination) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.queryAllHouseInfoList", pagination);
    }

    @Override
    public Integer queryAllHouseInfoListCount(Pagination<HouseInfoKeep> pagination) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.queryAllHouseInfoListCount", pagination);
    }

    @Override
    public int updateCommodityHouse(HouseInfoKeep houseInformation) {
        return sqlSessionTemplateProduct.update("com.gjp.dao.HouseLibraryDao.updateCommodityHouse", houseInformation);
    }

    @Override
    public int updateInventoryHouse(HouseInfoKeep houseInformation) {
        return sqlSessionTemplateProduct.update("com.gjp.dao.HouseLibraryDao.updateInventoryHouse", houseInformation);
    }

    @Override
    public List<HouseImage> selectHouseImages() {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.selectHouseImages");
    }

    @Override
    public int updateHouseImage(HouseImage houseImage) {
        return sqlSessionTemplateProduct.update("com.gjp.dao.HouseLibraryDao.updateHouseImage", houseImage);
    }

    @Override
    public HousePositionCompanyVo queryHouseCompanyInfo(HousePositionCompanyVo positionCompanyVo) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.queryHouseCompanyInfo", positionCompanyVo);
    }

    @Override
    public List<AppVersionVo> queryAppVersionList(AppVersionVo appVersionVo) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.queryAppVersionList", appVersionVo);
    }

    @Override
    public AppVersionVo queryAppVersionLast(AppVersionVo appVersionVo) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.queryAppVersionLast", appVersionVo);
    }

    @Override
    public Pagination<HouseInfoKeep> queryHouseExamineList(Pagination<HouseInfoKeep> pagination) {
        List<HouseInfoKeep> list = sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.queryHouseExamineList", pagination);
        Pagination<HouseInfoKeep> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list);
        if (pagination.isPage()) {
            int totalRecords = sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.queryHouseExamineListPageRecord", pagination);
            paginationTo.setTotalRecords(totalRecords);
        }
        return paginationTo;
    }

    @Override
    public int addhousePublish (HousePublish housePublish) {
        return sqlSessionTemplateProduct.insert("com.gjp.dao.HouseLibraryDao.addhousePublish", housePublish);
    }

    @Override
    public int updateHousePublish (HousePublish housePublish) {
        return sqlSessionTemplateProduct.update("com.gjp.dao.HouseLibraryDao.updateHousePublish", housePublish);
    }

    @Override
    public List<HousePublishChannel> queryHousePublishChannel (HousePublishChannel housePublishChannel) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.queryHousePublishChannel",housePublishChannel);
    }

    @Override
    public List<HousePublish> housePublisheList (HousePublish housePublish) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.housePublisheList",housePublish);
    }

    @Override
    public HousePublish housePublish (HousePublish housePublish) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.housePublish",housePublish);
    }

    @Override
    public List<RentHouseFileVo> queryRentHouseFile(RentHouseFileVo rentHouseFileVo) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.queryRentHouseFile", rentHouseFileVo);
    }

    @Override
    public List<ViewHouseLibraryInfoVo> queryInitRentHouseList() {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.queryInitRentHouseList");
    }

    @Override
    public Integer queryRentHouseCount() {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.queryRentHouseCount");
    }

    @Override
    public List<HouseInfoKeep> selecthouseList(HouseInfoKeep houseInfoKeep) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.selecthouseList",houseInfoKeep);
    }

    @Override
    public Integer deleteHousePublishState (HousePublish housePublish) {
        return sqlSessionTemplateProduct.delete("com.gjp.dao.HouseLibraryDao.deleteHousePublishState",housePublish);
    }

    @Override
    public int delRentHouseFile(String hi_code) {
        return sqlSessionTemplateProduct.delete("com.gjp.dao.HouseLibraryDao.delRentHouseFile", hi_code);
    }

    @Override
    public int addGrossProfit(HouseGrossProfitVo houseGrossProfitVo) {
        return sqlSessionTemplateProduct.insert("com.gjp.dao.HouseLibraryDao.addGrossProfit", houseGrossProfitVo);
    }

    @Override
    public int updateGrossProfit(HouseGrossProfitVo houseGrossProfitVo) {
        return sqlSessionTemplateProduct.update("com.gjp.dao.HouseLibraryDao.updateGrossProfit", houseGrossProfitVo);
    }

    @Override
    public List<HouseGrossProfitVo> queryGPSubtotalByCode(HouseGrossProfitVo houseGrossProfitVo) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.queryGPSubtotalByCode", houseGrossProfitVo);
    }

    @Override
    public Pagination<HouseGrossProfitVo> queryGrossProfitByCode(Pagination<HouseGrossProfitVo> pagination) {
        List<HouseGrossProfitVo> grossProfitVoList = sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.queryGrossProfitByCode", pagination);
        int totalRecords = sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.queryGrossProfitCountByCode", pagination);
        pagination.setList(grossProfitVoList, totalRecords);
        return pagination;
    }

    @Override
    public int queryGrossProfitCountByCode(Pagination<HouseGrossProfitVo> pagination) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.queryGrossProfitCountByCode", pagination);
    }

    @Override
    public List<HouseInfoKeep> queryVacantHouseList() {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.queryVacantHouseList");
    }

    @Override
    public HouseGrossProfitVo queryGrossDoing(HouseGrossProfitVo houseGrossProfitVo) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.queryGrossDoing", houseGrossProfitVo);
    }

    @Override
    public List<HouseGrossProfitVo> queryGrossListByCode(HouseGrossProfitVo houseGrossProfitVo) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.queryGrossListByCode", houseGrossProfitVo);
    }

    @Override
    public int addGrossProfitRela(HouseGrossProfitRelaVo houseGrossProfitRelaVo) {
        return sqlSessionTemplateProduct.insert("com.gjp.dao.HouseLibraryDao.addGrossProfitRela", houseGrossProfitRelaVo);
    }

    @Override
    public int updateGrossProfitRela(HouseGrossProfitRelaVo houseGrossProfitRelaVo) {
        return sqlSessionTemplateProduct.update("com.gjp.dao.HouseLibraryDao.updateGrossProfitRela", houseGrossProfitRelaVo);
    }

    @Override
    public HouseGrossProfitRelaVo queryGPRById(HouseGrossProfitRelaVo houseGrossProfitRelaVo) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseLibraryDao.queryGPRById", houseGrossProfitRelaVo);
    }

    @Override
    public List<HouseGrossProfitRelaVo> queryGPRByCode(HouseGrossProfitRelaVo houseGrossProfitRelaVo) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseLibraryDao.queryGPRByCode", houseGrossProfitRelaVo);
    }

}
