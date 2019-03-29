package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.ServiceDao;
import com.gjp.model.*;
import com.gjp.util.PageModel;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 服务ImplDao
 *
 * @author 陈智颖
 */
@Repository
public class ServiceDaoImpl extends BaseDAO implements ServiceDao {

    @Override
    public PageModel<HotspotIssuesProblem> selectHotSpot(PageModel<HotspotIssuesProblem> pageModel) {

        List<HotspotIssuesProblem> hotspotIssuesProblem = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectHotSpot", pageModel);
        int totalRecords = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.selectTotalHotspotIssuesProblem", pageModel);
        pageModel.setList(hotspotIssuesProblem);
        pageModel.setTotalRecords(totalRecords);

        return pageModel;
    }

    @Override
    public List<ServiceType> selectServiceType() {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectServiceType");
    }

    @Override
    public int addHotSpot(HotspotIssuesProblem hotspotIssuesProblem) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addHotSpot", hotspotIssuesProblem);
    }

    @Override
    public HotspotIssuesProblem selectHotSpotById(int sip_id) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.selectHotSpotById", sip_id);
    }

    @Override
    public int updataHotSpot(HotspotIssuesProblem hotspotIssuesProblem) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updataHotSpot", hotspotIssuesProblem);
    }

    @Override
    public PageModel<ViewBusinessDeclarationVo> selectServe(int pageNo, int cookies, String mo_state) {
        PageModel<ViewBusinessDeclarationVo> pageModel = new PageModel<>();
        // 分页设置开始点
        pageModel.setPageNo((pageNo - 1) * cookies);
        // 分页设置查询条数
        pageModel.setPageSize(cookies);
        // 分页设置状态
        pageModel.setMo_state(mo_state);
        // 分页查询房屋基本信息集合
        List<ViewBusinessDeclarationVo> maintenanceDeclarationList = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectServe", pageModel);
        // 查询热点问题总记录数
        int totalRecords = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.selectTotalselectServe", pageModel);
        pageModel.setList(maintenanceDeclarationList);
        pageModel.setTotalRecords(totalRecords);
        return pageModel;
    }

    @Override
    public PageModel<ServiceMessage> selectServeMessage(int pageNo, int cookies) {
        PageModel<ServiceMessage> pageModel = new PageModel<>();
        // 分页设置开始点
        pageModel.setPageNo((pageNo - 1) * cookies);
        // 分页设置查询条数
        pageModel.setPageSize(cookies);
        // 分页查询房屋基本信息集合
        List<ServiceMessage> serviceMessageList = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectServeMessage", pageModel);
        // 查询热点问题总记录数
        int totalRecords = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.selectTotalselectServeMessage");
        pageModel.setList(serviceMessageList);
        pageModel.setTotalRecords(totalRecords);
        return pageModel;
    }

    @Override
    public ServiceMessage selectMessageById(int sm_id) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.selectMessageById", sm_id);
    }

    @Override
    public MaintenanceDeclaration selectDeclarationById(int md_id) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.selectDeclarationById", md_id);
    }

    @Override
    public MaintenanceDeclaration selectDeclarationAppById(int md_id) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.selectDeclarationAppById", md_id);
    }

    @Override
    public MaintenanceTracks selectMaintenanceTracksById(int md_id) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.selectMaintenanceTracksById", md_id);
    }

    @Override
    public List<MaintenancePoint> selectMaintenancePointById(int md_id) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectMaintenancePointById", md_id);
    }

    @Override
    public List<MaintenanceImage> selectMaintenanceImage(int md_id) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectMaintenanceImage", md_id);
    }

    @Override
    public List<MaintenanceTracks> selectMaintenanceTracks(MaintenanceState maintenanceState) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectMaintenanceTracks", maintenanceState);
    }

    @Override
    public List<MaintenanceState> selectFreeUserCenterEmployee(Integer em_id) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectFreeUserCenterEmployee", em_id);
    }

    @Override
    public int addDispatching(MaintenanceDispatching maintenanceDispatching) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addDispatching", maintenanceDispatching);
    }

    @Override
    public int addWorkerTask(MaintenanceWorkerTask maintenanceWorkerTask) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addWorkerTask", maintenanceWorkerTask);
    }

    @Override
    public int addState(MaintenanceState maintenanceState) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addState", maintenanceState);
    }

    @Override
    public MaintenanceState selectMaintenanceStateByMd_Id(int md_id) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.selectMaintenanceStateByMd_Id", md_id);
    }

    @Override
    public List<MaintenanceOrder> queryOrderUser(Integer md_id) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryOrderUser", md_id);
    }

    @Override
    public int addOrder(MaintenanceOrder order) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addOrder", order);
    }

    @Override
    public int deleteOrder(int md_id) {
        return super.sqlSessionTemplateBusiness.delete("com.gjp.dao.ServiceDao.deleteOrder", md_id);
    }

    @Override
    public int addServeMessage(ServiceMessage serviceMessage) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addServeMessage", serviceMessage);
    }

    @Override
    public int addProblemList(ProblemList problemList) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addProblemList", problemList);
    }

    @Override
    public List<ProblemList> selectProblemList(Integer st_id) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectProblemList", st_id);
    }

    @Override
    public int updataMessage(ServiceMessage serviceMessage) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updataMessage", serviceMessage);
    }

    @Override
    public int updataMaintenanceState(MaintenanceState maintenanceState) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updataMaintenanceState", maintenanceState);
    }

    @Override
    public int updataDeclaration(int md_id) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updataDeclaration", md_id);
    }

    @Override
    public int updataStart(Integer md_id) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updataStart", md_id);
    }

    @Override
    public List<ServiceMessage> selectServiceList() {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectServiceList");
    }

    @Override
    public List<ServiceType> selectServiceTypeList(ServiceType serviceType) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectServiceTypeList", serviceType);
    }

    @Override
    public int addDeclarationInfo(MaintenanceDeclaration declaration) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addDeclarationInfo", declaration);
    }

    @Override
    public int addDeclarationImagePath(MaintenanceImage image) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addDeclarationImagePath", image);
    }

    @Override
    public int insertServiceImagePath(ServiceImageVo serviceImageVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.insertServiceImagePath", serviceImageVo);
    }

    @Override
    public List<ServiceImageVo> queryServiceImage(ServiceImageVo serviceImageVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryServiceImage", serviceImageVo);
    }

    @Override
    public ViewBusinessDeclarationVo selectDeclarationAllById(Integer md_id) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.selectDeclarationAllById", md_id);
    }

    @Override
    public PageModel<MaintenanceDeclaration> queryServiceBillList(int pageNo, int cookies, String mo_state) {
        PageModel<MaintenanceDeclaration> pageModel = new PageModel<>();
        // 分页设置开始点
        pageModel.setPageNo((pageNo - 1) * cookies);
        // 分页设置查询条数
        pageModel.setPageSize(cookies);
        // 分页设置状态
        pageModel.setMo_state(mo_state);
        // 分页查询房屋基本信息集合
        List<MaintenanceDeclaration> maintenanceDeclarationList = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectServe", pageModel);
        // 查询热点问题总记录数
        int totalRecords = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.selectTotalselectServe", pageModel);
        pageModel.setList(maintenanceDeclarationList);
        pageModel.setTotalRecords(totalRecords);
        return pageModel;
    }

    @Override
    public int addSerivceSubType(ServiceType serviceType) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addSerivceSubType", serviceType);
    }

    @Override
    public String selectServiceTypeByName(String typeName) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.selectServiceTypeByName", typeName);
    }

    @Override
    public int deleteSerivceSubType(ServiceType serviceType) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.ServiceDao.deleteSerivceSubType", serviceType);
    }

    @Override
    public int updateSerivceSubType(ServiceType serviceType) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updateSerivceSubType", serviceType);
    }

    @Override
    public int updateSerivceSubTypes(ServiceType serviceType) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updateSerivceSubTypes", serviceType);
    }

    @Override
    public List<ServiceType> selectServiceTypeBySmId(int sm_id) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectServiceTypeBySmId", sm_id);
    }

    @Override
    public PageModel<ViewBusinessDeclarationVo> queryServiceOrderList(PageModel<ViewBusinessDeclarationVo> pageModel) {

        List<ViewBusinessDeclarationVo> viewBusinessDeclarationVo = sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryServiceOrderList", pageModel);
        int totalRecords = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.selectTotalselectServe", pageModel);
        pageModel.setList(viewBusinessDeclarationVo);
        pageModel.setTotalRecords(totalRecords);

        return pageModel;
    }

    @Override
    public int selectTotalselectServe(Pagination<ViewBusinessDeclarationVo> pagination) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.selectTotalselectServe", pagination);
    }

    @Override
    public ProblemList selectProblemById(Integer pl_id) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.selectProblemById", pl_id);
    }

    @Override
    public int deleteProblemToId(Integer pl_id) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.ServiceDao.deleteProblemToId", pl_id);
    }

    @Override
    public int deleteProblemToStId(Integer st_id) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.ServiceDao.deleteProblemToStId", st_id);
    }

    @Override
    public ServiceType selectServiceTypeById(Integer st_id) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.selectServiceTypeById", st_id);
    }

    @Override
    public List<ServiceType> selectServiceTypeListByParentId(Integer parent_id) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectServiceTypeListByParentId", parent_id);
    }

    @Override
    public List<ViewServicePersonStateListVo> selectServicePersonStateList(ViewServicePersonStateListVo personStateListVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectServicePersonStateList", personStateListVo);
    }

    @Override
    public int selectServicePersonWorkStateByEmId(Integer em_id) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.selectServicePersonWorkStateByEmId", em_id);
    }

    @Override
    public int updataDeclarationPerson(MaintenanceDeclaration maintenanceDeclaration) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updataDeclarationPerson", maintenanceDeclaration);
    }

    @Override
    public ViewBusinessDeclarationVo selectBusinessDeclarationWhere(ViewBusinessDeclarationVo viewBusinessDeclarationVo) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.selectBusinessDeclarationWhere", viewBusinessDeclarationVo);
    }

    @Override
    public int deleteDeclarationImagePath(MaintenanceImage image) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.ServiceDao.deleteDeclarationImagePath", image);
    }

    @Override
    public List<ViewBusinessDeclarationVo> queryServiceDeclarationOrderList(ViewBusinessDeclarationVo declaration) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryServiceDeclarationOrderList", declaration);
    }

    @Override
    public int updataCustomerImage(MaintenanceDeclaration maintenanceDeclaration) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updataCustomerImage", maintenanceDeclaration);
    }

    @Override
    public int updateDeclaration(MaintenanceDeclaration declaration) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updateDeclaration", declaration);
    }

    @Override
    public int deleteSerivceMoney(int md_id) {
        return super.sqlSessionTemplateBusiness.delete("com.gjp.dao.ServiceDao.deleteSerivceMoney", md_id);
    }

    @Override
    public int addProblem(Problem problem) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addProblem", problem);
    }

    @Override
    public int addserviceProcessProblem(ServiceProcessProblemVo serviceProcessProblemVo) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addserviceProcessProblem", serviceProcessProblemVo);
    }

    @Override
    public int deleteProblem(Problem problem) {
        return super.sqlSessionTemplateBusiness.delete("com.gjp.dao.ServiceDao.deleteProblem", problem);
    }

    @Override
    public int deleteServiceProcessProblem(ServiceProcessProblemVo serviceProcessProblemVo) {
        return super.sqlSessionTemplateBusiness.delete("com.gjp.dao.ServiceDao.deleteServiceProcessProblem", serviceProcessProblemVo);
    }

    @Override
    public List<Problem> selectProblem(Problem problem) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectProblem", problem);
    }

    @Override
    public int updateStates(MaintenanceDeclaration maintenanceDeclaration) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updateStates", maintenanceDeclaration);
    }

    @Override
    public int updateFollowUp(MaintenanceDispatching maintenanceDeclaration) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updateFollowUp", maintenanceDeclaration);
    }

    @Override
    public int deleteOrderFollow(MaintenanceOrder maintenanceOrder) {
        return super.sqlSessionTemplateBusiness.delete("com.gjp.dao.ServiceDao.deleteOrderFollow", maintenanceOrder);
    }

    @Override
    public int deleteDispatching(MaintenanceDeclaration maintenanceDeclaration) {
        return super.sqlSessionTemplateBusiness.delete("com.gjp.dao.ServiceDao.deleteDispatching", maintenanceDeclaration);
    }

    @Override
    public int perfectService(ServiceType serviceType) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.perfectService", serviceType);
    }

    @Override
    public List<ContractObjectVo> queryHouseCustomerList(Pagination<ContractObjectVo> voPagination) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryHouseCustomerList", voPagination);
    }

    @Override
    public List<ViewBusinessDeclarationVo> queryCustomerServiceState() {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryCustomerServiceState");
    }

    @Override
    public List<ViewBusinessDeclarationVo> queryMdOrderByEmId(Integer em_id) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryMdOrderByEmId", em_id);
    }

    @Override
    public int queryOrderCountById(MaintenanceOrder maintenanceOrder) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryOrderCountById", maintenanceOrder);
    }

    @Override
    public List<UserCenterEmployee> queryEmployee(UserCenterEmployee userCenterEmployee) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryEmployee", userCenterEmployee);
    }

    @Override
    public List<Company> queryCompany(Pagination<Company> pagination) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryCompany", pagination);
    }

    @Override
    public int addPoint(MaintenancePoint maintenancePoint) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addPoint", maintenancePoint);
    }

    @Override
    public UserCenterUserVo queryUserVo(Integer user_id) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryUserVo", user_id);
    }

    @Override
    public List<UserCustomer> queryCustomerByCradNum(String cc_cardNum) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryCustomerByCradNum", cc_cardNum);
    }

    @Override
    public List<ServiceMoney> queryServiceMoneyList(Integer md_id) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryServiceMoneyList", md_id);
    }

    @Override
    public ServiceMoney queryServiceMoney(ServiceMoney serviceMoney) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryServiceMoney", serviceMoney);
    }

    @Override
    public String queryContractCodeById(MaintenanceDeclaration declaration) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryContractCodeById", declaration);
    }

    @Override
    public List<MaintenancePoint> queryPointByMdId(Integer md_id) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryPointByMdId", md_id);
    }

    @Override
    public int updateServiceMoney(ServiceMoney serviceMoney) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updateServiceMoney", serviceMoney);
    }

    @Override
    public int updateTracks(MaintenanceTracks maintenanceTracks) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updateTracks", maintenanceTracks);
    }

    @Override
    public int addMoneyDetail(ServiceMoneyDetail serviceMoneyDetail) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addMoneyDetail", serviceMoneyDetail);
    }

    @Override
    public List<UserCustomer> queryCustomerByCode(String cc_code) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryCustomerByCode", cc_code);
    }

    @Override
    public int updateMaintenancePoint(MaintenancePoint maintenancePoint) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updateMaintenancePoint", maintenancePoint);
    }

    @Override
    public int updateMaintenanceDeclartion(MaintenanceDeclaration maintenanceDeclaration) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updateMaintenanceDeclartion", maintenanceDeclaration);
    }

    @Override
    public ViewBusinessDeclarationVo queryServiceMsg(Integer md_id) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryServiceMsg", md_id);
    }

    @Override
    public Pagination<ServiceOrderVo> queryServicePageList(Pagination<ServiceOrderVo> pagination) {
        List<ServiceOrderVo> list = sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryServicePageList", pagination);
        int totalRecords = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryServicePageRecords", pagination);
        pagination.setList(list, totalRecords);
        return pagination;
    }

    @Override
    public List<ServiceMoneyDetail> queryMoneyDetailList(Integer md_id) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryMoneyDetailList", md_id);
    }

    @Override
    public List<ServiceOrderVo> selectServiceOrderInfoList(ServiceOrderVo serviceOrderVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectServiceOrderInfoList", serviceOrderVo);
    }

    @Override
    public int addServiceRecord(ServiceRecordVo serviceRecordVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addServiceRecord", serviceRecordVo);
    }

    @Override
    public int updateServiceRecord(ServiceRecordVo serviceRecordVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updateServiceRecord", serviceRecordVo);
    }

    @Override
    public ServiceOrderVo queryServiceInfo(ServiceOrderVo serviceOrderVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryServiceInfo", serviceOrderVo);
    }

    @Override
    public ServiceOrderVo selectServiceOrderInfoById(ServiceOrderVo serviceOrderVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.selectServiceOrderInfoById", serviceOrderVo);
    }

    @Override
    public List<ContractOrderVo> queryContractOrderMD(ContractOrderVo contractOrderVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryContractOrderMD", contractOrderVo);
    }


    @Override
    public List<ServiceOrderItemVo> selectServiceOrderItem(ServiceOrderItemVo serviceOrderItemVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectServiceOrderItem", serviceOrderItemVo);
    }

    @Override
    public List<ServiceProcessProblemVo> selectServiceProcessProblem(ServiceProcessProblemVo serviceProcessProblemVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectServiceProcessProblem", serviceProcessProblemVo);
    }

    @Override
    public int updateserviceOrderItem(ServiceOrderItemVo serviceOrderItemVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updateserviceOrderItem", serviceOrderItemVo);
    }

    @Override
    public int addServiceOrderInfo(ServiceOrderVo serviceOrderVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addServiceOrderInfo", serviceOrderVo);
    }

    @Override
    public int addServiceOrderItemInfo(ServiceOrderItemVo serviceOrderItemVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addServiceOrderItemInfo", serviceOrderItemVo);
    }

    @Override
    public int addServiceOrderInfoApp(ServiceOrderInfoVo serviceOrderInfoVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addServiceOrderInfoApp", serviceOrderInfoVo);
    }

    @Override
    public int addServiceProcess(ServiceProcessVo serviceProcessVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addServiceProcess", serviceProcessVo);
    }

    @Override
    public int updataServiceProcess(ServiceProcessVo serviceProcessVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.updataServiceProcess", serviceProcessVo);
    }

    @Override
    public List<ServiceRecordVo> queryServiceRecordList(ServiceRecordVo serviceRecordVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryServiceRecordList", serviceRecordVo);
    }

    @Override
    public int updateServiceOrder(ServiceOrderVo serviceOrderVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updateServiceOrder", serviceOrderVo);
    }

    @Override
    public List<ServiceMessage> queryAllServiceMessage() {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryAllServiceMessage");
    }

    @Override
    public List<ServiceType> queryMessageID(ServiceType serviceType) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryMessageID", serviceType);
    }

    @Override
    public List<ServiceType> selectTypeID(ServiceType serviceType) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectTypeID", serviceType);
    }

    @Override
    public List<ServicePersonVo> queryServicePerson(ServicePersonVo servicePersonVo) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryServicePerson", servicePersonVo);
    }

    @Override
    public ServiceStepVo queryServiceStepInfo(ServiceStepVo serviceStepVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryServiceStepInfo", serviceStepVo);
    }

    @Override
    public List<ServiceProcessVo> queryServiceProcessList(ServiceProcessVo serviceProcessVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryServiceProcessList", serviceProcessVo);
    }

    @Override
    public List<ServiceOrderItemVo> queryServiceOrderItemList(ServiceOrderItemVo serviceOrderItemVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryServiceOrderItemList", serviceOrderItemVo);
    }

    @Override
    public ServicePersonVo queryServicePersonById(Integer em_id) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryServicePersonById", em_id);
    }

    @Override
    public ServicePersonVo queryServicePersonBySid(Integer sp_id) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryServicePersonBySid", sp_id);
    }

    @Override
    public int addServicePerson(ServicePersonVo servicePersonVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addServicePerson", servicePersonVo);
    }

    @Override
    public int addServiceImage(ServiceImageVo serviceImageVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.addServiceImage", serviceImageVo);
    }

    @Override
    public int deleteServiceImageByPath(String si_path) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.ServiceDao.deleteServiceImageByPath", si_path);
    }

    @Override
    public ServiceOrderVo queryServiceOrderDetail(Integer so_id) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryServiceOrderDetail", so_id);
    }

    @Override
    public List<ServiceMoney> queryServiceMoneyBySoId(ServiceMoney serviceMoney) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryServiceMoneyBySoId", serviceMoney);
    }

    @Override
    public List<UserCenterEmployee> queryServiceUccPeople(UserCenterEmployee userCenterEmployee) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryServiceUccPeople", userCenterEmployee);
    }

    @Override
    public List<ServiceOrderVo> queryServiceOrderByEmId(Integer em_id) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryServiceOrderByEmId", em_id);
    }

    @Override
    public int updateServiceProcess(ServiceProcessVo serviceProcessVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updateServiceProcess", serviceProcessVo);
    }

    @Override
    public List<ServiceMoneyDetail> queryMoneyDetial(ServiceMoneyDetail serviceMoneyDetail) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryMoneyDetial", serviceMoneyDetail);
    }

    @Override
    public int deleteMoneyDetial(ServiceMoneyDetail serviceMoneyDetail) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.ServiceDao.deleteMoneyDetial", serviceMoneyDetail);
    }

    @Override
    public ServicePayMoneyVo queryNewServicePayMoney(ServicePayMoneyVo servicePayMoneyVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryNewServicePayMoney", servicePayMoneyVo);
    }

    @Override
    public int modifyServiceMoney(ServiceCharge serviceCharge) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.modifyServiceMoney", serviceCharge);
    }

    @Override
    public int appAddServiceChargeRecord(ServiceChargeRecord serviceChargeRecord) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.appAddServiceChargeRecord", serviceChargeRecord);
    }

    @Override
    public ServicePayMoneyVo queryServicePayMoney(String bco_code) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryServicePayMoney", bco_code);
    }

    @Override
    public List<ContractObjectVo> queryContractCustomerByCode(ContractObjectVo contractObjectVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryContractCustomerByCode", contractObjectVo);
    }

    @Override
    public List<ContractObjectVo> queryAllContractHouse(Pagination<ContractObjectVo> voPagination) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryAllContractHouse", voPagination);
    }

    @Override
    public int queryAllContractHouseCount(Pagination<ContractObjectVo> voPagination) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryAllContractHouseCount", voPagination);
    }

    @Override
    public List<UserCustomer> queryCustomerByHiCode(ContractObjectVo contractObjectVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryCustomerByHiCode", contractObjectVo);
    }

    @Override
    public List<ServiceMoneyDetail> queryMoneyDetailListById(ServiceMoneyDetail serviceMoneyDetail) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryMoneyDetailListById", serviceMoneyDetail);
    }

    @Override
    public ServiceProcessVo queryServiceProcess(ServiceProcessVo serviceProcessVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryServiceProcess", serviceProcessVo);
    }

    @Override
    public int saveServceMoneyInfo(ServiceMoneyInfoVo serviceMoneyInfoVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceDao.saveServceMoneyInfo", serviceMoneyInfoVo);
    }

    @Override
    public int updataServceMoneyInfo(ServiceMoneyInfoVo serviceMoneyInfoVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updataServceMoneyInfo", serviceMoneyInfoVo);
    }


    @Override
    public ServicePayMoneyVo queryServicePayMoneyInfo(ServicePayMoneyVo servicePayMoneyVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryServicePayMoneyInfo", servicePayMoneyVo);
    }

    @Override
    public List<ContractObjectVo> queryPayObjectByHiCode(ContractObjectVo contractObjectVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryPayObjectByHiCode", contractObjectVo);
    }

    @Override
    public UserCenterEmployee queryEmployeeById(Integer em_id) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryEmployeeById", em_id);
    }

    @Override
    public ServiceCharge queryServiceChargeByCode(ServiceCharge serviceCharge) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryServiceChargeByCode", serviceCharge);
    }

    @Override
    public int queryServiceItemCountByCode(ServiceOrderVo serviceOrderVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryServiceItemCountByCode", serviceOrderVo);
    }

    @Override
    public List<ViewBusinessContractVo> selectContractObjectPeople(ViewBusinessContractVo contractVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.selectContractObjectPeople", contractVo);
    }

    @Override
    public ContractObjectVo queryContractInfo(ViewBusinessContractVo contractObjectVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryContractInfo", contractObjectVo);
    }

    @Override
    public List<ServicePersonVo> queryServiceOrderBySpId(Integer sp_id) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryServiceOrderBySpId", sp_id);
    }

    @Override
    public int updateProcessToClosed(ServiceProcessVo serviceProcessVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updateProcessToClosed", serviceProcessVo);
    }

    @Override
    public ServiceMoneyInfoVo queryServiceMoneyInfo(ServiceMoneyInfoVo serviceMoneyInfoVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryServiceMoneyInfo", serviceMoneyInfoVo);
    }

    @Override
    public int updateOrder(OrderVo orderVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceDao.updateOrder", orderVo);
    }

    @Override
    public List<BillContractOrderMD> queryContractOrderMDList(BillContractOrderMD billContractOrderMD) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryContractOrderMDList", billContractOrderMD);
    }

    @Override
    public List<OrderDetailVo> queryOrderDetailList(OrderDetailVo orderDetailVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryOrderDetailList", orderDetailVo);
    }

    @Override
    public ServicePersonVo queryServicePersonVo(ServicePersonVo servicePersonVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryServicePersonVo",servicePersonVo);
    }

    @Override
    public int deleteServiceMoney(Integer ssm_id) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.ServiceDao.deleteServiceMoney", ssm_id);
    }

    @Override
    public OrderVo queryOrderByssmId(Integer ssm_id) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryOrderByssmId", ssm_id);
    }

    @Override
    public List<ContractInfoVo> queryContractCharge(String dateYear) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryContractCharge", dateYear);
    }

    @Override
    public List<OrderVo> queryPayOrderAndServiceOrder(OrderVo orderVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryPayOrderAndServiceOrder",orderVo);
    }

    @Override
    public List<MaintenanceDeclaration> initServiceOrder() {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.initServiceOrder");
    }

    @Override
    public ContractObjectVo queryContractType(ContractObjectVo contractObjectVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceDao.queryContractType", contractObjectVo);
    }

    @Override
    public List<ServiceRecordVo> queryOutside() {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceDao.queryOutside");
    }
}
