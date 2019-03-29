package com.gjp.dao;

import com.gjp.model.*;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import com.gjp.util.Pagination;
import com.gjp.util.TableList;

import java.util.List;

/**
 * 合同对象
 *
 * @author zoe
 */
public interface ContractDao {

    List<ContractType> selectContractTypeByParentId(Integer parentId);

    /**
     * 查询服务费
     *
     * @return
     * @author 陈智颖
     */
    ServiceContractServiceChargeVo queryContractServiceCharge(ServiceContractServiceChargeVo serviceContractServiceChargeVo);

    /**
     * 修改服务费
     *
     * @return
     * @author 陈智颖
     */
    Integer updateContractServiceCharge(ServiceContractServiceChargeVo serviceContractServiceChargeVo);

    /**
     * 修改合同是否计算业绩
     *
     * @return
     * @author 陈智颖
     */
    Integer updateContractObjectBool(ViewBusinessContractVo viewBusinessContractVo);

    /**
     * 修改合同招租期-(免租期-招租期)-(剩余免租期)
     *
     * @return
     * @author 陈智颖
     */
    Integer updateContractObjectRentStr(ViewBusinessContractVo viewBusinessContractVo);

    /**
     * 添加合同主体信息
     *
     * @param userCenterContractBody
     * @return
     */
    int addUserCenterContractBody(UserCenterContractBody userCenterContractBody);

    /**
     * 添加合同对象信息
     *
     * @param userCenterContractObject
     * @return
     */
    int addContractObject(ContractObjectVo userCenterContractObject);

    /**
     * 根据编号查询合同对象
     *
     * @return
     */
    ContractObjectVo queryContractObject(ContractObjectVo contractObject);

    /**
     * 根据合同编码查询合同对象
     *
     * @return
     */
    ViewBusinessContractVo selectContractObjectByCNo(ViewBusinessContractVo contractVo);

    /**
     * 根据房屋编码查询租赁合同
     *
     * @return
     */
    ViewBusinessContractVo selectContractObjectPeople(ViewBusinessContractVo contractVo);

    /**
     * APP根据房屋编码查询合同信息
     *
     * @return
     */
    ViewBusinessContractVo queryAPPContract(ViewBusinessContractVo viewBusinessContractVo);

    /**
     * 修改合同对象
     *
     * @param userCenterContractObject
     * @return
     */
    int updateContractObject(ContractObjectVo userCenterContractObject);

    /**
     * 根据房屋编码查询合同
     *
     * @return
     */
    List<ViewBusinessContractVo> selectHouseContract(ViewBusinessContractVo viewBusinessContractVo);

    /**
     * 根据房屋编码查询最近的托管合同
     *
     * @param userCenterContractObject1
     * @return
     * @author zoe
     */
    ContractObjectVo selectContractObjectByHICode(ContractObjectVo userCenterContractObject1);

    /**
     * 查询房屋开始时间
     *
     * @param userCenterContractObject1
     * @return
     * @author zoe
     */
    ContractObjectVo selectContractObjectByHICodeAsc(ContractObjectVo userCenterContractObject1);

    List<ViewBusinessContractVo> selectViewContractList(Pagination<ViewBusinessContractVo> pagination);

    String isValidContractNo(ContractObjectVo contractObject);

    UserCenterContractBody queryContractBody(UserCenterContractBody contractBody);

    List<BillReserveOrderVo> selectReserveOrder(Pagination<BillReserveOrderVo> pagination);

    int selectReserveOrderTotalRecords(Pagination<BillReserveOrderVo> pagination);

    /**
     * 查询合约订单分页
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年11月20日
     */
    Pagination<ViewBusinessCancelContractListVo> queryCancelContractPageList(Pagination<TableList> pagination);

    /**
     * 通过订单编码查询解约订单信息
     *
     * @return
     * @author JiangQT
     */
    ViewBusinessCancelContractListVo queryCancelContractByCode(ViewBusinessCancelContractListVo businessCancelContractListVo);

    /**
     * 解约订单审核完毕——更新订单数据
     *
     * @param contractOrder
     * @return
     * @author JiangQT
     */
    int updateCancelContractOrder(BusinessCancelContractOrder contractOrder);

    ViewBusinessCancelContractListVo queryCancelContractByhiCode(ViewBusinessCancelContractListVo cancelContractListVo);

    /**
     * 根据房屋编码查询该房屋所有托管合同
     *
     * @param userCenterContractObject2
     * @return
     * @author zoe
     */
    List<ViewGJPContrByCode> selectViewGJPContrByCode(ContractObjectVo userCenterContractObject2);

    /**
     * 根据合同编号查询合同房屋信息
     *
     * @param userCenterContractObject2
     * @return
     * @author zoe
     */
    ViewGJPContrByCode selTrusteeshipByCode(ContractObjectVo userCenterContractObject2);

    int updatePurchaseItems(ServicePurchaseItems purchaseItems);

    /**
     * 查询根据预定账单签订的合同
     *
     * @param rb_houseNum
     * @return
     * @author zoe
     */
    ContractObjectVo selectReserveContractObjectByHICode(String rb_houseNum);

    int addContractRelaEmp(UserCenterContractRelaEmpVo empVo);

    List<ViewBusinessContractRelaEmpVo> queryViewContractRelaEmp(ViewBusinessContractRelaEmpVo contractRelaEmpVo);

    int deleteContractRaleEmp(Integer contractObject_Id);

    ViewBusinessContractVo selectContractObjectByCard(ViewBusinessContractVo contractVo);

    List<ContractObjectVo> selectGJPContractRelaEmp(ContractObjectVo contractObjectVo);

    int addContractRecord(ContractAuditingRecordVo auditingRecordVo);

    /**
     * 查询合同审核记录列表信息
     *
     * @param auditingRecordVo
     * @return
     * @author JiangQT
     */
    List<ContractAuditingRecordVo> queryContractAuditingRecordList(ContractAuditingRecordVo auditingRecordVo);

    /**
     * 添加解约申请订单
     *
     * @param businessCancelContractOrder
     * @return
     * @author JiangQT
     */
    int addCancelContractOrder(BusinessCancelContractOrder businessCancelContractOrder);

    /**
     * 查询解约订单信息
     *
     * @param contractOrder
     * @return
     * @author JiangQT
     */
    String queryCancelContractOrderInfo(BusinessCancelContractOrder contractOrder);

    /**
     * 添加第一期账单收款记录
     *
     * @param billReceiptRecordVo
     * @return
     * @author JiangQT
     */
    int addFirstBillReceiptRecord(BillFirstBillReceiptRecordVo billReceiptRecordVo);

    /**
     * 删除旧首期期账单收款记录
     *
     * @param billReceiptRecordVo
     * @return
     * @author JiangQT
     */
    int deleteFirstBillReceiptRecord(BillFirstBillReceiptRecordVo billReceiptRecordVo);

    /**
     * 更新合同信息
     *
     * @param contractBody
     * @return
     */
    int updateContractBody(UserCenterContractBody contractBody);

    /**
     * 查询合同视图列表
     *
     * @param viewBusinessContractVo
     * @return
     */
    List<ViewBusinessContractVo> selectContractViewList(ViewBusinessContractVo viewBusinessContractVo);

    /**
     * 生成合同执行记录
     *
     * @param implementRecordVo
     * @return
     */
    int addHouseRecord(ContractImplRecordVo implementRecordVo);

    /**
     * 查询合同执行记录
     *
     * @param implementRecordVo
     * @return
     */
    List<ContractImplRecordVo> queryContractImplementRecordList(ContractImplRecordVo implementRecordVo);

    /**
     * 删除服务费
     *
     * @param serviceChargeVo
     * @return
     */
    int deleteContractServiceCharge(ServiceContractServiceChargeVo serviceChargeVo);

    /**
     * 查询合约订单数据
     *
     * @return
     * @Description:
     * @author JiangQt
     */
    BusinessCancelContractOrder queryCancelContractByWhere(BusinessCancelContractOrder businessCancelContractOrder);

    /**
     * 查询合约订单数据
     *
     * @return
     * @Description:
     * @author JiangQt
     */
    List<BusinessCancelContractOrder> queryCancelContractListInfo(BusinessCancelContractOrder businessCancelContractOrder);

    /**
     * 通过sql条件查询合同信息
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年6月27日
     */
    PageModel<ViewBusinessContractVo> queryViewContractInfoList(PageModel<ViewBusinessContractVo> pagination);

    /**
     * 添加合同图片
     *
     * @param contractImageVo
     * @return
     * @作者 JiangQT
     * @日期 2016年7月29日
     */
    int addContractImage(ContractImageVo contractImageVo);

    /**
     * 查询合同执行记录List
     *
     * @param contractImplRecordVo
     * @return
     */
    List<ContractImplRecordVo> selectContractImplementRecordList(ContractImplRecordVo contractImplRecordVo);

    /**
     * 查询合同执行记录数量
     *
     * @return
     */
    int queryContractImplementRecordListCount(ContractImplRecordVo contractImplRecordVo);

    /**
     * 查询房屋有效合同（租赁/托管）
     *
     * @param userCenterContractObject
     * @return
     */
    List<ContractObjectVo> selectContractObjectState(ContractObjectVo userCenterContractObject);

    /**
     * 执行合同继承
     *
     * @param contractVo2
     * @return
     * @作者 JiangQT
     * @日期 2016年8月29日
     */
    String callContractSuccessor(ViewBusinessContractVo contractVo2);

    /**
     * 查询合同图片数据
     *
     * @param imageVo
     * @return
     * @作者 JiangQT
     * @日期 2016年8月30日
     */
    List<ContractImageVo> queryContractImage(ContractImageVo imageVo);

    /**
     * 修改合同的物品购置总金额
     *
     * @param userCenterContractObject
     * @return
     */
    int updateContractObjectGoodsMoney(ContractObjectVo userCenterContractObject);

    /**
     * 添加业务账单
     *
     * @param businessBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年9月8日
     */
    int addBusinessBill(BillBusinessBillVo businessBillVo);

    /**
     * 查询业务账单
     *
     * @param businessBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年9月8日
     */
    BillBusinessBillVo queryBusinessBill(BillBusinessBillVo businessBillVo);

    /**
     * 删除业务账单数据
     *
     * @param businessBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年9月8日
     */
    int deleteBusinessBill(BillBusinessBillVo businessBillVo);

    /**
     * 更新业务账单数据
     *
     * @param businessBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年9月9日
     */
    int updateBusinessBill(BillBusinessBillVo businessBillVo);

    /**
     * 查询最新一份合同
     *
     * @param contractVo
     * @return
     * @作者 JiangQT
     * @日期 2016年10月9日
     */
    ViewBusinessContractVo queryLastContract(ViewBusinessContractVo contractVo);

    /**
     * 查询合同执行记录分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年10月19日
     */
    List<ContractImplRecordVo> queryContractImplRecordPageList(Pagination<ContractImplRecordVo> pagination);

    /**
     * 查询合同执行记录分页数据总条数
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年10月19日
     */
    int queryContractImplRecordPageRecords(Pagination<ContractImplRecordVo> pagination);

    /**
     * 更新合同执行记录
     *
     * @param contractImplRecord
     * @return
     * @作者 JiangQT
     * @日期 2016年10月23日
     */
    int updateContractImplRecord(ContractImplRecordVo contractImplRecord);

    /**
     * 查询合同执行记录
     *
     * @param contractImplRecord
     * @return
     * @作者 JiangQT
     * @日期 2016年10月23日
     */
    ContractImplRecordVo queryContractImplementRecord(ContractImplRecordVo contractImplRecord);

    /**
     * 根据合同编码查询主管家
     *
     * @param userCenterContractObject
     * @return
     * @author 陈智颖
     */
    List<ContractObjectVo> selectContractEm(ContractObjectVo userCenterContractObject);

    /**
     * 修改合同管家
     *
     * @param userCenterContractObject
     * @return
     * @author 陈智颖
     */
    int updatetContractEm(ContractObjectVo userCenterContractObject);

    /**
     * 删除合同管家
     *
     * @param userCenterContractObject
     * @return
     * @author 陈智颖
     */
    int deleteContractEm(ContractObjectVo userCenterContractObject);

    List<ViewBusinessCancelContractListVo> queryCancelContractList(Pagination<ViewBusinessCancelContractListVo> pagination);

    int queryCancelContractListTotalRecords(Pagination<ViewBusinessCancelContractListVo> pagination);

    /**
     * 查询类型表数据
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年1月17日
     */
    List<BusinesTypeVo> queryTypeList(BusinesTypeVo businesTypeVo);

    int updateContractBodyRemark(UserCenterContractBody userCenterContractBody);

    /**
     * APP:查询合同分页列表
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2017年3月22日
     */
    Pagination<ViewBusinessContractVo> queryContractPageList(Pagination<ViewBusinessContractVo> pagination);

    /**
     * 删除合同照片
     *
     * @param contractImageVo
     * @return
     * @作者 JiangQT
     * @日期 2017年3月25日
     */
    int deleteContractImage(ContractImageVo contractImageVo);

    /**
     * 查询合同数量统计
     *
     * @param quantityStatisticsVo
     * @return
     * @作者 JiangQT
     * @日期 2017年3月29日
     */
    ContractQuantityStatisticsVo queryContractQuantityStatistics(ContractQuantityStatisticsVo quantityStatisticsVo);

    /**
     * 更新合同对象之客户签名
     *
     * @param contractObject
     * @return
     * @作者 JiangQT
     * @日期 2017年3月30日
     */
    int updateContractObjectForSignature(ContractObjectVo contractObject);

    /**
     * 更新合同数量统计数据
     *
     * @param quantityStatisticsVo
     * @return
     * @作者 JiangQT
     * @日期 2017年3月31日
     */
    int updateContractQuantityStatistics(ContractQuantityStatisticsVo quantityStatisticsVo);

    /**
     * 查询超期、30天内到期的合同
     *
     * @param businessContractVo
     * @return
     */
    List<ViewBusinessContractVo> queryWarnContractListToApp(ViewBusinessContractVo businessContractVo);

    /**
     * 待办合同
     *
     * @param contractObject
     * @return
     * @author 陈智颖
     * @date Apr 9, 2017 7:12:43 PM
     */
    List<ContractObjectVo> stayContract(ContractObjectVo contractObject);

    /**
     * 查询结算订单分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2017年4月20日
     */
    Pagination<ViewBusinessCancelContractListVo> querySettlementOrderPageList(Pagination<ViewBusinessCancelContractListVo> pagination);

    /**
     * 查询最新一份合同
     *
     * @param contractObject
     * @return
     */
    ViewBusinessContractVo queryContractObjectLastOne(ViewBusinessContractVo contractObject);

    /**
     * 新增调价申请记录
     *
     * @param priceApplyRecord
     * @return
     */
    int addPriceApplyRecord(PriceApplyRecord priceApplyRecord);

    /**
     * 分页查询调价申请
     *
     * @return
     */
    PageModel<PriceApplyRecord> queryPriceApplyRecordList(int pageNo, int pageSize, HouseModel houseModel);

    /**
     * 根据ID查询记录信息
     *
     * @param priceApplyRecord
     * @return
     */
    PriceApplyRecord queryPriceApplyRecord(PriceApplyRecord priceApplyRecord);

    /**
     * 更新调价申请记录
     *
     * @param priceApplyRecord
     * @return
     */
    int updatePriceApplyRecord(PriceApplyRecord priceApplyRecord);

    /**
     * 根据房源编号查询是否有多套房源同时申请调价，且处于待复核状态
     *
     * @param priceApplyRecord
     * @return
     */
    List<PriceApplyRecord> queryRecordByHiCode(PriceApplyRecord priceApplyRecord);

    /**
     * 根据房屋编码查询合同信息
     *
     * @param businessContractVo
     * @return
     * @author 陈智颖
     * @date Jun 3, 2017 10:01:00 AM
     */
    ViewBusinessContractVo selectViewContractListHiCode(ViewBusinessContractVo businessContractVo);

    /**
     * 查询合同归属部门关系数据
     *
     * @param companyRelationVo
     * @return
     * @author JiangQt
     * @version 2017年6月14日下午3:27:26
     */
    ContractCompanyRelationVo queryContractCompanyRelation(ContractCompanyRelationVo companyRelationVo);

    /**
     * 添加合同归属部门关系数据
     *
     * @param companyRelationVo
     * @return
     * @author JiangQt
     * @version 2017年6月14日下午3:27:53
     */
    int addContractCompanyRelation(ContractCompanyRelationVo companyRelationVo);

    /**
     * 更新合同归属部门关系数据
     *
     * @param companyRelationVo
     * @return
     * @author JiangQt
     * @version 2017年6月14日下午3:28:07
     */
    int updateContractCompanyRelation(ContractCompanyRelationVo companyRelationVo);

    /**
     * 查询电子合同模板信息
     *
     * @param contractVersionManage
     * @return
     */
    ContractVersionManage queryContractVersion(ContractVersionManage contractVersionManage);

    /**
     * 查询合同签名验证
     *
     * @param contractSignVerifyVo
     * @return
     */
    ContractSignVerifyVo queryContractSignVerify(ContractSignVerifyVo contractSignVerifyVo);

    /**
     * 添加签名验证
     *
     * @param contractSignVerifyVo
     * @return
     */
    int addContractSignVerify(ContractSignVerifyVo contractSignVerifyVo);

    /**
     * 更新签名验证
     *
     * @param contractSignVerifyVo
     * @return
     */
    int updateContractSignVerify(ContractSignVerifyVo contractSignVerifyVo);

    /**
     * 根据hi_code查询最新的租赁合同
     *
     * @author tanglei
     * @Date 2017年7月25日 上午9:45:55
     */
    ContractObjectVo selectNewContractObject(ContractObjectVo contractObjectVo);

    /**
     * 查询合同版本查询合同模板
     *
     * @param contractVersionManage
     * @return
     */
    ContractVersionManage queryContractVersionPriview(ContractVersionManage contractVersionManage);

    /**
     * 根据合同序号查询合同
     *
     * @author tanglei
     * @Date 2017年8月11日 上午9:55:55
     */
    ContractObjectVo selectContractObjectId(ContractObjectVo contractObjectVo);

    /**
     * 添加协议审核
     *
     * @param contractAgreementAuditingVo
     * @return
     */
    int addContractAgreementAuditing(ContractAgreementAuditingVo contractAgreementAuditingVo);

    /**
     * 区经审核
     *
     * @author tanglei
     * @Date 2017年10月11日  上午10:40:55
     */
    Pagination<ViewBusinessContractVo> managerExamineList(Pagination<?> pagination);

    /**
     * 附加协议审核
     *
     * @param tanglei
     * @Date 2017年10月14日  下午13:08:55
     */
    int updateAdditionalExamine(ContractAgreementAuditingVo agreementAuditingVo);

    /**
     * 添加协议审核记录
     *
     * @param tanglei
     * @Date 2017年10月14日  下午16:25:55
     */
    int insertAgreementAuditingRecord(ContractAgreementAuditingRecordVo agreementAuditingRecordVo);

    /**
     * 查询协议审核记录
     *
     * @param tanglei
     * @Date 2017年10月14日  下午16:08:55
     */
    List<ContractAgreementAuditingRecordVo> queryAgreementAuditingRecordList(ContractAgreementAuditingRecordVo agreementAuditingRecordVo);

    /**
     * @param contractAgreementAuditingVo
     * @return
     */
    ContractAgreementAuditingVo queryContractAgreementAuditing(ContractAgreementAuditingVo contractAgreementAuditingVo);

    /**
     * @param contractAgreementAuditingVo
     * @return
     */
    int updateContractAgreementAuditing(ContractAgreementAuditingVo contractAgreementAuditingVo);

    /**
     * 记账本查询关联合同
     */
    List<ContractObjectVo> selectHouse(ContractObjectVo contract);

    /**
     * 根据房屋code查询客户code
     */
    List<ContractObjectVo> selectContractObject1st(ContractObjectVo contract);

    ContractObjectVo selectHouseHiCode(ContractObjectVo contract);

    List<AppContractVo> appSelectContractList(AppContractVo appContractVo);

    /**
     * 合同主体
     */
    ViewBusinessContractVo queryHouseContract(ViewBusinessContractVo viewBusinessContractVo);

    ContractInfoVo queryContractInfo(ContractInfoVo contractInfoVo);

    List<ContractStatementBalanceVo> queryBalanceListByCode(ContractStatementBalanceVo statementBalanceVo);

    List<ViewBusinessContractVo> queryContractNotObsolute(ViewBusinessContractVo viewBusinessContractVo);

    HouseInfoKeep queryVacantHouseByCode(String hi_code);
}
