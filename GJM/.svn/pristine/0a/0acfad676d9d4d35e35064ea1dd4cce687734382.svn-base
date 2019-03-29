package com.gjp.dao;

import com.gjp.model.*;
import com.gjp.util.PageModel;
import com.gjp.util.Pagination;

import java.util.List;

/**
 * 服务
 *
 * @author zoe
 */
public interface ServiceDao {

    /**
     * 查询热点问题List
     *
     * @return
     */
    PageModel<HotspotIssuesProblem> selectHotSpot(PageModel<HotspotIssuesProblem> pageModel);

    /**
     * 查询服务类型
     *
     * @return
     */
    List<ServiceType> selectServiceType();

    /**
     * 添加热点问题
     *
     * @param hotspotIssuesProblem
     * @return
     */

    int addHotSpot(HotspotIssuesProblem hotspotIssuesProblem);

    /**
     * 根据编号查询热点问题
     *
     * @param sip_id
     * @return
     */
    HotspotIssuesProblem selectHotSpotById(int sip_id);

    /**
     * 修改热点问题
     *
     * @param hotspotIssuesProblem
     * @return
     */
    int updataHotSpot(HotspotIssuesProblem hotspotIssuesProblem);

    /**
     * 修改付费对象
     *
     * @return
     */
    int updataDeclarationPerson(MaintenanceDeclaration maintenanceDeclaration);

    /**
     * 查询维修申报List
     *
     * @param pageNo
     * @param cookies
     * @param mo_state
     * @return
     */
    PageModel<ViewBusinessDeclarationVo> selectServe(int pageNo, int cookies, String mo_state);

    /**
     * 查询服务信息List
     *
     * @param pageNo
     * @param cookies
     * @return
     */
    PageModel<ServiceMessage> selectServeMessage(int pageNo, int cookies);

    /**
     * 根据编号查询服务信息
     *
     * @param sm_id
     * @return
     */
    ServiceMessage selectMessageById(int sm_id);

    /**
     * 根据编号维修申请信息
     *
     * @param md_id
     * @return
     */
    MaintenanceDeclaration selectDeclarationById(int md_id);

    MaintenanceDeclaration selectDeclarationAppById(int md_id);

    MaintenanceTracks selectMaintenanceTracksById(int md_id);

    List<MaintenancePoint> selectMaintenancePointById(int md_id);

    /**
     * 查询申请图片
     *
     * @param md_id
     * @return
     */
    List<MaintenanceImage> selectMaintenanceImage(int md_id);

    /**
     * 查询维修跟踪
     *
     * @return
     */
    List<MaintenanceTracks> selectMaintenanceTracks(MaintenanceState maintenanceState);

    /**
     * 查询未完成的维修申请
     *
     * @param em_id
     * @return
     */
    List<MaintenanceState> selectFreeUserCenterEmployee(Integer em_id);

    /**
     * 添加派工单
     *
     * @param maintenanceDispatching
     * @return
     */
    int addDispatching(MaintenanceDispatching maintenanceDispatching);

    /**
     * 添加维修人员安排
     *
     * @return
     */
    int addWorkerTask(MaintenanceWorkerTask maintenanceWorkerTask);

    /**
     * 添加维修状态
     *
     * @param maintenanceState
     * @return
     */
    int addState(MaintenanceState maintenanceState);

    /**
     * 通过维修申报编号查询状态
     *
     * @param md_id
     * @return
     */
    MaintenanceState selectMaintenanceStateByMd_Id(int md_id);

    /**
     * 查询维修订单流程
     *
     * @param md_id
     * @return
     */
    List<MaintenanceOrder> queryOrderUser(Integer md_id);

    /**
     * 添加订单流程
     *
     * @param order
     * @return
     */
    int addOrder(MaintenanceOrder order);

    /**
     * 删除维修订单流程-客服回访
     *
     * @param parseInt
     * @return
     */
    int deleteOrder(int parseInt);

    /**
     * 添加服务基本信息
     *
     * @param serviceMessage
     * @return
     */
    int addServeMessage(ServiceMessage serviceMessage);

    /**
     * 添加问题描述
     *
     * @param problemList
     * @return
     */
    int addProblemList(ProblemList problemList);

    /**
     * 查询问题描述列表
     *
     * @param st_id
     * @return
     */
    List<ProblemList> selectProblemList(Integer st_id);

    /**
     * 修改服务基本信息
     *
     * @param serviceMessage
     * @return
     */
    int updataMessage(ServiceMessage serviceMessage);

    /**
     * 修改维修状态
     *
     * @return
     */
    int updataMaintenanceState(MaintenanceState maintenanceState);

    /**
     * 修改维修申报状态
     *
     * @param md_id
     * @return
     */
    int updataDeclaration(int md_id);

    /**
     * 修改维修申请状态
     *
     * @param md_id
     * @return
     */
    int updataStart(Integer md_id);

    List<ServiceMessage> selectServiceList();

    List<ServiceType> selectServiceTypeList(ServiceType serviceType);

    int addDeclarationInfo(MaintenanceDeclaration declaration);

    /**
     * 绑定费用列表
     *
     * @param declaration
     * @return
     * @author 陈智颖
     * @date May 29, 2017 4:29:58 PM
     */
    int updateDeclaration(MaintenanceDeclaration declaration);

    /**
     * 删除费用
     *
     * @return
     * @author 陈智颖
     * @date May 29, 2017 4:37:23 PM
     */
    int deleteSerivceMoney(int md_id);

    int addDeclarationImagePath(MaintenanceImage image);

    int insertServiceImagePath(ServiceImageVo serviceImageVo);

    List<ServiceImageVo> queryServiceImage(ServiceImageVo serviceImageVo);

    int deleteDeclarationImagePath(MaintenanceImage image);

    ViewBusinessDeclarationVo selectDeclarationAllById(Integer md_id);

    PageModel<MaintenanceDeclaration> queryServiceBillList(int pageNo, int cookies, String mo_state);

    int addSerivceSubType(ServiceType serviceType);

    /**
     * 验证类型名称是否存在
     *
     * @param typeName
     * @return
     * @author JiangQT
     */
    String selectServiceTypeByName(String typeName);

    int deleteSerivceSubType(ServiceType serviceType);

    int updateSerivceSubType(ServiceType serviceType);

    int updateSerivceSubTypes(ServiceType serviceType);

    /**
     * 通过父级类型编号查询服务子类型列表
     *
     * @param sm_id
     * @return
     * @author JiangQT
     */
    List<ServiceType> selectServiceTypeBySmId(int sm_id);

    /**
     * 查询服务订单信息——列表
     *
     * @return
     * @author JiangQT
     */
    PageModel<ViewBusinessDeclarationVo> queryServiceOrderList(PageModel<ViewBusinessDeclarationVo> pageModel);

    /**
     * 查询服务订单信息——总数据条数
     *
     * @return
     * @author JiangQT
     */
    int selectTotalselectServe(Pagination<ViewBusinessDeclarationVo> pagination);

    ViewBusinessDeclarationVo selectBusinessDeclarationWhere(ViewBusinessDeclarationVo viewBusinessDeclarationVo);

    /**
     * 通过编号查询服务描述信息
     *
     * @return
     * @author JiangQT
     */
    ProblemList selectProblemById(Integer pl_id);

    /**
     * 删除服务描述
     *
     * @param pl_id
     * @return
     * @author JiangQT
     */
    int deleteProblemToId(Integer pl_id);

    /**
     * 删除服务描述
     *
     * @param st_id
     * @return
     * @author JiangQT
     */
    int deleteProblemToStId(Integer st_id);

    /**
     * 通过编号查询服务子类型信息
     *
     * @param st_id
     * @return
     * @author JiangQT
     */
    ServiceType selectServiceTypeById(Integer st_id);

    /**
     * 通过父级编号查询服务子类型分类信息列表
     *
     * @param parent_id
     * @return
     * @author JiangQT
     */
    List<ServiceType> selectServiceTypeListByParentId(Integer parent_id);

    List<ViewServicePersonStateListVo> selectServicePersonStateList(ViewServicePersonStateListVo personStateListVo);

    int selectServicePersonWorkStateByEmId(Integer em_id);

    /**
     * 查询服务申报单列表
     *
     * @param declaration
     * @return
     * @作者 JiangQT
     * @日期 2017年4月21日
     */
    List<ViewBusinessDeclarationVo> queryServiceDeclarationOrderList(ViewBusinessDeclarationVo declaration);

    /**
     * 客户手写签名
     *
     * @param maintenanceDeclaration
     * @return
     * @author 陈智颖
     * @date Apr 27, 2017 4:14:54 PM
     */
    int updataCustomerImage(MaintenanceDeclaration maintenanceDeclaration);

    /**
     * 修改维修申报状态
     *
     * @param maintenanceDeclaration
     * @return
     * @author 陈智颖
     * @date Jun 4, 2017 9:45:16 AM
     */
    int updateStates(MaintenanceDeclaration maintenanceDeclaration);

    /**
     * 退回服务进度
     *
     * @return
     * @author 陈智颖
     * @date Jun 4, 2017 9:45:16 AM
     */
    int updateFollowUp(MaintenanceDispatching maintenanceDispatching);

    /**
     * 删除除了服务申请外的处理记录
     *
     * @return
     * @author 陈智颖
     * @date Jun 4, 2017 9:45:16 AM
     */
    int deleteOrderFollow(MaintenanceOrder maintenanceOrder);

    /**
     * 添加服务问题
     *
     * @param problem
     * @return
     * @author 陈智颖
     * @date Jun 3, 2017 11:48:23 AM
     */
    int addProblem(Problem problem);

    int addserviceProcessProblem(ServiceProcessProblemVo serviceProcessProblemVo);

    /**
     * 删除服务问题
     *
     * @param problem
     * @return
     * @author 陈智颖
     * @date Jun 3, 2017 11:48:23 AM
     */
    int deleteProblem(Problem problem);

    int deleteServiceProcessProblem(ServiceProcessProblemVo serviceProcessProblemVo);

    /**
     * 删除服务
     *
     * @return
     * @author 陈智颖
     * @date Jun 3, 2017 11:48:23 AM
     */
    int deleteDispatching(MaintenanceDeclaration maintenanceDeclaration);

    /**
     * 查询服务问题内容
     *
     * @param problem
     * @return
     * @author 陈智颖
     * @date Jun 3, 2017 1:45:13 PM
     */
    List<Problem> selectProblem(Problem problem);

    /**
     * 完善服务信息
     *
     * @param serviceType
     * @return
     */
    int perfectService(ServiceType serviceType);

    /**
     * 查询有效的房东或租客
     *
     * @return
     */
    List<ContractObjectVo> queryHouseCustomerList(Pagination<ContractObjectVo> voPagination);

    /**
     * 查询客服人员所有未完成、当前正在做的任务等信息
     *
     * @return
     */
    List<ViewBusinessDeclarationVo> queryCustomerServiceState();

    /**
     * 查询客服人员个人未完成订单
     *
     * @param em_id
     * @return
     */
    List<ViewBusinessDeclarationVo> queryMdOrderByEmId(Integer em_id);

    /**
     * 查询订单步骤
     *
     * @param maintenanceOrder
     * @return
     */
    int queryOrderCountById(MaintenanceOrder maintenanceOrder);

    /**
     * 查询所有管家，但主管家排第一位
     *
     * @param userCenterEmployee
     * @return
     */
    List<UserCenterEmployee> queryEmployee(UserCenterEmployee userCenterEmployee);

    /**
     * 查询所有门店，但归属部门排第一位
     *
     * @param pagination
     * @return
     */
    List<Company> queryCompany(Pagination<Company> pagination);

    /**
     * 添加房屋地址坐标
     *
     * @param maintenancePoint
     * @return
     */
    int addPoint(MaintenancePoint maintenancePoint);

    /**
     * 查询用户信息
     *
     * @return
     */
    UserCenterUserVo queryUserVo(Integer user_id);

    /**
     * 根据证件号码查询相关客户信息
     *
     * @param cc_cardNum
     * @return
     */
    List<UserCustomer> queryCustomerByCradNum(String cc_cardNum);

    /**
     * 查询服务费用
     *
     * @param md_id
     * @return
     */
    List<ServiceMoney> queryServiceMoneyList(Integer md_id);

    ServiceMoney queryServiceMoney(ServiceMoney serviceMoney);


    /**
     * 查询合同编码
     *
     * @param declaration
     * @return
     */
    String queryContractCodeById(MaintenanceDeclaration declaration);

    List<MaintenancePoint> queryPointByMdId(Integer md_id);

    int updateServiceMoney(ServiceMoney serviceMoney);

    int updateTracks(MaintenanceTracks maintenanceTracks);

    int addMoneyDetail(ServiceMoneyDetail serviceMoneyDetail);

    List<UserCustomer> queryCustomerByCode(String cc_code);

    int updateMaintenancePoint(MaintenancePoint maintenancePoint);

    int updateMaintenanceDeclartion(MaintenanceDeclaration maintenanceDeclaration);

    ViewBusinessDeclarationVo queryServiceMsg(Integer md_id);

    Pagination<ServiceOrderVo> queryServicePageList(Pagination<ServiceOrderVo> pagination);

    List<ServiceMoneyDetail> queryMoneyDetailList(Integer md_id);

    List<ServiceOrderVo> selectServiceOrderInfoList(ServiceOrderVo serviceOrderVo);


    /**
     * 添加服务记录
     *
     * @param serviceRecordVo
     * @return
     */
    int addServiceRecord(ServiceRecordVo serviceRecordVo);

    /**
     * 更改服务记录
     *
     * @param serviceRecordVo
     * @return
     */
    int updateServiceRecord(ServiceRecordVo serviceRecordVo);

    /**
     * 查询服务订单信息
     *
     * @param serviceOrderVo
     * @return
     */
    ServiceOrderVo queryServiceInfo(ServiceOrderVo serviceOrderVo);

    ServiceOrderVo selectServiceOrderInfoById(ServiceOrderVo serviceOrderVo);

    List<ContractOrderVo> queryContractOrderMD(ContractOrderVo contractOrderVo);

    List<ServiceOrderItemVo> selectServiceOrderItem(ServiceOrderItemVo serviceOrderItemVo);

    List<ServiceProcessProblemVo> selectServiceProcessProblem(ServiceProcessProblemVo serviceProcessProblemVo);

    int updateserviceOrderItem(ServiceOrderItemVo serviceOrderItemVo);

    int addServiceOrderInfo(ServiceOrderVo serviceOrderVo);

    int addServiceOrderItemInfo(ServiceOrderItemVo serviceOrderItemVo);

    int addServiceOrderInfoApp(ServiceOrderInfoVo serviceOrderInfoVo);

    int addServiceProcess(ServiceProcessVo serviceProcessVo);

    int updataServiceProcess(ServiceProcessVo serviceProcessVo);


    /**
     * 查询服务记录列表
     *
     * @param serviceRecordVo
     * @return
     */
    List<ServiceRecordVo> queryServiceRecordList(ServiceRecordVo serviceRecordVo);

    int updateServiceOrder(ServiceOrderVo serviceOrderVo);

    ServiceMoneyInfoVo queryServiceMoneyInfo(ServiceMoneyInfoVo serviceMoneyInfoVo);

    /**
     * 查询服务基本信息
     */
    List<ServiceMessage> queryAllServiceMessage();


    /**
     * 根据服务ID查询服务类型
     *
     * @return List<ServiceType>
     */
    List<ServiceType> queryMessageID(ServiceType serviceType);

    /**
     * 根据服务ID查询父级
     *
     * @return List<ServiceType>
     */
    List<ServiceType> selectTypeID(ServiceType serviceType);

    /**
     * 查询服务步骤信息
     *
     * @param serviceStepVo
     * @return
     */
    ServiceStepVo queryServiceStepInfo(ServiceStepVo serviceStepVo);

    List<ServicePersonVo> queryServicePerson(ServicePersonVo servicePersonVo);

    /**
     * 查询服务处理过程
     *
     * @param serviceProcessVo
     * @return
     */
    List<ServiceProcessVo> queryServiceProcessList(ServiceProcessVo serviceProcessVo);

    /**
     * 查询服务订单项目
     *
     * @param serviceOrderItemVo
     * @return
     */
    List<ServiceOrderItemVo> queryServiceOrderItemList(ServiceOrderItemVo serviceOrderItemVo);

    /**
     * 查询派工人员表中是否已存在
     *
     * @param em_id
     * @return
     */
    ServicePersonVo queryServicePersonById(Integer em_id);

    /**
     * 查询派工人员表中是否已存在
     *
     * @return
     */
    ServicePersonVo queryServicePersonBySid(Integer sp_id);

    int addServicePerson(ServicePersonVo servicePersonVo);

    int addServiceImage(ServiceImageVo serviceImageVo);

    int deleteServiceImageByPath(String si_path);

    ServiceOrderVo queryServiceOrderDetail(Integer so_id);

    List<ServiceMoney> queryServiceMoneyBySoId(ServiceMoney serviceMoney);

    List<UserCenterEmployee> queryServiceUccPeople(UserCenterEmployee userCenterEmployee);

    List<ServiceOrderVo> queryServiceOrderByEmId(Integer em_id);

    int updateServiceProcess(ServiceProcessVo serviceProcessVo);

    List<ServiceMoneyDetail> queryMoneyDetial(ServiceMoneyDetail serviceMoneyDetail);

    int deleteMoneyDetial(ServiceMoneyDetail serviceMoneyDetail);

    ServicePayMoneyVo queryNewServicePayMoney(ServicePayMoneyVo servicePayMoneyVo);

    int modifyServiceMoney(ServiceCharge serviceCharge);

    int appAddServiceChargeRecord(ServiceChargeRecord serviceChargeRecord);

    /**
     * 查询剩余服务费，抵扣等情况
     *
     * @param bco_code
     * @return
     */
    ServicePayMoneyVo queryServicePayMoney(String bco_code);

    List<ContractObjectVo> queryContractCustomerByCode(ContractObjectVo contractObjectVo);

    /**
     * 查询所有合同房屋信息
     *
     * @param voPagination
     * @return
     */
    List<ContractObjectVo> queryAllContractHouse(Pagination<ContractObjectVo> voPagination);

    int queryAllContractHouseCount(Pagination<ContractObjectVo> voPagination);

    /**
     * 根据房号及合同类型查询客户
     *
     * @param contractObjectVo
     * @return
     */
    List<UserCustomer> queryCustomerByHiCode(ContractObjectVo contractObjectVo);

    /**
     * 根据ID查询费用明细
     *
     * @param serviceMoneyDetail
     * @return
     */
    List<ServiceMoneyDetail> queryMoneyDetailListById(ServiceMoneyDetail serviceMoneyDetail);

    ServiceProcessVo queryServiceProcess(ServiceProcessVo serviceProcessVo);

    /**
     * 添加服务费用详情
     *
     * @param serviceMoneyInfoVo
     * @return
     */
    int saveServceMoneyInfo(ServiceMoneyInfoVo serviceMoneyInfoVo);

    int updataServceMoneyInfo(ServiceMoneyInfoVo serviceMoneyInfoVo);

    /**
     * 查询合同房屋服务费等信息
     *
     * @return
     */
    ServicePayMoneyVo queryServicePayMoneyInfo(ServicePayMoneyVo servicePayMoneyVo);

    List<ContractObjectVo> queryPayObjectByHiCode(ContractObjectVo contractObjectVo);

    UserCenterEmployee queryEmployeeById(Integer em_id);

    ServiceCharge queryServiceChargeByCode(ServiceCharge serviceCharge);

    /**
     * 同一个房屋在处理完成前不能重复下单
     *
     * @param serviceOrderVo
     * @return
     */
    int queryServiceItemCountByCode(ServiceOrderVo serviceOrderVo);

    List<ViewBusinessContractVo> selectContractObjectPeople(ViewBusinessContractVo contractVo);

    ContractObjectVo queryContractInfo(ViewBusinessContractVo contractObjectVo);

    List<ServicePersonVo> queryServiceOrderBySpId(Integer sp_id);

    int updateProcessToClosed(ServiceProcessVo serviceProcessVo);

    /**
     * 更改订单
     *
     * @param orderVo
     * @return
     */
    int updateOrder(OrderVo orderVo);

    /**
     * 服务/订单关系
     *
     * @param billContractOrderMD
     * @return
     */
    List<BillContractOrderMD> queryContractOrderMDList(BillContractOrderMD billContractOrderMD);

    /**
     * 查询订单详情
     *
     * @param orderDetailVo
     * @return
     */
    List<OrderDetailVo> queryOrderDetailList(OrderDetailVo orderDetailVo);

    ServicePersonVo queryServicePersonVo(ServicePersonVo servicePersonVo);

    int deleteServiceMoney(Integer ssm_id);

    /**
     * 根据服务费记录查询对应的订单
     * @param ssm_id
     * @return
     */
    OrderVo queryOrderByssmId(Integer ssm_id);

    List<ContractInfoVo> queryContractCharge(String dateYear);

    List<OrderVo> queryPayOrderAndServiceOrder(OrderVo orderVo);

    List<MaintenanceDeclaration> initServiceOrder();

    ContractObjectVo queryContractType(ContractObjectVo contractObjectVo);

    List<ServiceRecordVo> queryOutside();

}
