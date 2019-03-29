package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.ContractDao;
import com.gjp.model.*;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import com.gjp.util.Pagination;
import com.gjp.util.TableList;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 合同对象ImplDao
 *
 * @author zoe
 */
@Repository
public class ContractDaoImpl extends BaseDAO implements ContractDao {

    @Override
    public List<ContractType> selectContractTypeByParentId(Integer parentId) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.selectContractTypeByParentId", parentId);
    }

    @Override
    public int addUserCenterContractBody(UserCenterContractBody userCenterContractBody) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ContractDao.addUserCenterContractBody", userCenterContractBody);
    }

    @Override
    public int addContractObject(ContractObjectVo userCenterContractObject) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ContractDao.addContractObject", userCenterContractObject);
    }

    @Override
    public ContractObjectVo queryContractObject(ContractObjectVo contractObject) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryContractObject", contractObject);
    }

    @Override
    public ViewBusinessContractVo selectContractObjectByCNo(ViewBusinessContractVo contractVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.selectContractObjectByCNo", contractVo);
    }

    @Override
    public int updateContractBody(UserCenterContractBody userCenterContractBody) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractDao.updateContractBody", userCenterContractBody);
    }

    @Override
    public int updateContractObject(ContractObjectVo userCenterContractObject) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractDao.updateContractObject", userCenterContractObject);
    }

    @Override
    public ContractObjectVo selectContractObjectByHICode(ContractObjectVo userCenterContractObject1) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.selectContractObjectByHICode", userCenterContractObject1);
    }

    @Override
    public ContractObjectVo selectContractObjectByHICodeAsc(ContractObjectVo userCenterContractObject1) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.selectContractObjectByHICodeAsc", userCenterContractObject1);
    }

    @Override
    public List<ViewBusinessContractVo> selectViewContractList(Pagination<ViewBusinessContractVo> pagination) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.selectViewContractList", pagination);
    }

    @Override
    public String isValidContractNo(ContractObjectVo contractObject) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.isValidContractNo", contractObject);
    }

    @Override
    public UserCenterContractBody queryContractBody(UserCenterContractBody contractBody) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryContractBody", contractBody);
    }

    @Override
    public List<BillReserveOrderVo> selectReserveOrder(Pagination<BillReserveOrderVo> pagination) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.selectReserveOrder", pagination);
    }

    @Override
    public int selectReserveOrderTotalRecords(Pagination<BillReserveOrderVo> pagination) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.selectReserveOrderTotalRecords", pagination);
    }

    @Override
    public Pagination<ViewBusinessCancelContractListVo> queryCancelContractPageList(Pagination<TableList> pagination) {
        List<ViewBusinessCancelContractListVo> list = sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.queryCancelContractPageList", pagination);
        int totalRecords = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryCancelContractPageListTotalRecords", pagination);

        Pagination<ViewBusinessCancelContractListVo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list, totalRecords);
        return paginationTo;
    }

    @Override
    public ViewBusinessCancelContractListVo queryCancelContractByCode(ViewBusinessCancelContractListVo businessCancelContractListVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryCancelContractByCode", businessCancelContractListVo);
    }

    @Override
    public int updateCancelContractOrder(BusinessCancelContractOrder contractOrder) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractDao.updateCancelContractOrder", contractOrder);
    }

    @Override
    public ViewBusinessCancelContractListVo queryCancelContractByhiCode(ViewBusinessCancelContractListVo cancelContractListVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryCancelContractByhiCode", cancelContractListVo);
    }

    @Override
    public List<ViewGJPContrByCode> selectViewGJPContrByCode(ContractObjectVo userCenterContractObject2) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.selectViewGJPContrByCode", userCenterContractObject2);
    }

    @Override
    public ViewGJPContrByCode selTrusteeshipByCode(ContractObjectVo userCenterContractObject2) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.selTrusteeshipByCode", userCenterContractObject2);
    }

    @Override
    public int updatePurchaseItems(ServicePurchaseItems purchaseItems) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractDao.updatePurchaseItems", purchaseItems);
    }

    @Override
    public ContractObjectVo selectReserveContractObjectByHICode(String rb_houseNum) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.selectReserveContractObjectByHICode", rb_houseNum);
    }

    @Override
    public int addContractRelaEmp(UserCenterContractRelaEmpVo empVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ContractDao.addContractRelaEmp", empVo);
    }

    @Override
    public List<ViewBusinessContractRelaEmpVo> queryViewContractRelaEmp(ViewBusinessContractRelaEmpVo contractRelaEmpVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.queryViewContractRelaEmp", contractRelaEmpVo);
    }

    @Override
    public int deleteContractRaleEmp(Integer contractObject_Id) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.ContractDao.deleteContractRaleEmp", contractObject_Id);
    }

    @Override
    public ViewBusinessContractVo selectContractObjectByCard(ViewBusinessContractVo contractVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.selectContractObjectByCard", contractVo);
    }

    @Override
    public List<ContractObjectVo> selectGJPContractRelaEmp(ContractObjectVo contractObjectVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.selectGJPContractRelaEmp",contractObjectVo);
    }

    @Override
    public ViewBusinessContractVo selectContractObjectPeople(ViewBusinessContractVo contractVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.selectContractObjectPeople", contractVo);
    }

    @Override
    public int addContractRecord(ContractAuditingRecordVo auditingRecordVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ContractDao.addContractRecord", auditingRecordVo);
    }

    @Override
    public List<ContractAuditingRecordVo> queryContractAuditingRecordList(ContractAuditingRecordVo auditingRecordVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.queryContractAuditingRecordList", auditingRecordVo);
    }

    @Override
    public int addCancelContractOrder(BusinessCancelContractOrder businessCancelContractOrder) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ContractDao.addCancelContractOrder", businessCancelContractOrder);
    }

    @Override
    public String queryCancelContractOrderInfo(BusinessCancelContractOrder contractOrder) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryCancelContractOrderInfo", contractOrder);
    }

    @Override
    public int addFirstBillReceiptRecord(BillFirstBillReceiptRecordVo billReceiptRecordVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ContractDao.addFirstBillReceiptRecord", billReceiptRecordVo);
    }

    @Override
    public int deleteFirstBillReceiptRecord(BillFirstBillReceiptRecordVo billReceiptRecordVo) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.ContractDao.deleteFirstBillReceiptRecord", billReceiptRecordVo);
    }

    @Override
    public ServiceContractServiceChargeVo queryContractServiceCharge(ServiceContractServiceChargeVo serviceContractServiceChargeVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryContractServiceCharge", serviceContractServiceChargeVo);
    }

    @Override
    public Integer updateContractServiceCharge(ServiceContractServiceChargeVo serviceContractServiceChargeVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractDao.updateContractServiceCharge", serviceContractServiceChargeVo);
    }

    @Override
    public List<ViewBusinessContractVo> selectContractViewList(ViewBusinessContractVo viewBusinessContractVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.selectContractViewList", viewBusinessContractVo);
    }

    @Override
    public int addHouseRecord(ContractImplRecordVo implementRecordVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ContractDao.addHouseRecord", implementRecordVo);
    }

    @Override
    public List<ContractImplRecordVo> queryContractImplementRecordList(ContractImplRecordVo implementRecordVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.queryContractImplementRecordList", implementRecordVo);
    }

    @Override
    public int deleteContractServiceCharge(ServiceContractServiceChargeVo serviceChargeVo) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.ContractDao.deleteContractServiceCharge", serviceChargeVo);
    }

    @Override
    public ViewBusinessContractVo queryAPPContract(ViewBusinessContractVo viewBusinessContractVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryAPPContract", viewBusinessContractVo);
    }

    @Override
    public Integer updateContractObjectBool(ViewBusinessContractVo viewBusinessContractVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractDao.updateContractObjectBool", viewBusinessContractVo);
    }

    @Override
    public List<ViewBusinessContractVo> selectHouseContract(ViewBusinessContractVo viewBusinessContractVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.selectHouseContract", viewBusinessContractVo);
    }

    @Override
    public BusinessCancelContractOrder queryCancelContractByWhere(BusinessCancelContractOrder businessCancelContractOrder) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryCancelContractByWhere", businessCancelContractOrder);
    }

    @Override
    public Integer updateContractObjectRentStr(ViewBusinessContractVo viewBusinessContractVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractDao.updateContractObjectRentStr", viewBusinessContractVo);
    }

    @Override
    public PageModel<ViewBusinessContractVo> queryViewContractInfoList(PageModel<ViewBusinessContractVo> pagination) {
        List<ViewBusinessContractVo> viewBusinessContractVo = sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.queryViewContractInfoList", pagination);
        int totalRecords = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryViewContractInfoListRows", pagination);
        pagination.setList(viewBusinessContractVo);
        pagination.setTotalRecords(totalRecords);
        return pagination;
    }

    @Override
    public int addContractImage(ContractImageVo contractImageVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ContractDao.addContractImage", contractImageVo);
    }

    @Override
    public int queryContractImplementRecordListCount(ContractImplRecordVo contractImplRecordVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryTotalRecords", contractImplRecordVo);
    }

    @Override
    public List<ContractObjectVo> selectContractObjectState(ContractObjectVo userCenterContractObject) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.selectContractObjectState", userCenterContractObject);
    }

    @Override
    public String callContractSuccessor(ViewBusinessContractVo contractVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.callContractSuccessor", contractVo);
    }

    @Override
    public List<ContractImplRecordVo> selectContractImplementRecordList(ContractImplRecordVo contractImplRecordVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.selectContractImplementRecordList", contractImplRecordVo);
    }

    @Override
    public List<ContractImageVo> queryContractImage(ContractImageVo imageVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.queryContractImage", imageVo);
    }

    @Override
    public int addBusinessBill(BillBusinessBillVo businessBillVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ContractDao.addBusinessBill", businessBillVo);
    }

    @Override
    public BillBusinessBillVo queryBusinessBill(BillBusinessBillVo businessBillVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryBusinessBill", businessBillVo);
    }

    @Override
    public int deleteBusinessBill(BillBusinessBillVo businessBillVo) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.ContractDao.deleteBusinessBill", businessBillVo);
    }

    @Override
    public int updateBusinessBill(BillBusinessBillVo businessBillVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractDao.updateBusinessBill", businessBillVo);
    }

    @Override
    public int updateContractObjectGoodsMoney(ContractObjectVo userCenterContractObject) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractDao.updateContractObjectGoodsMoney", userCenterContractObject);
    }

    @Override
    public ViewBusinessContractVo queryLastContract(ViewBusinessContractVo contractVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryLastContract", contractVo);
    }

    @Override
    public List<ContractImplRecordVo> queryContractImplRecordPageList(Pagination<ContractImplRecordVo> pagination) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.queryContractImplRecordPageList", pagination);
    }

    @Override
    public int queryContractImplRecordPageRecords(Pagination<ContractImplRecordVo> pagination) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryContractImplRecordPageRecords", pagination);
    }

    @Override
    public int updateContractImplRecord(ContractImplRecordVo contractImplRecord) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractDao.updateContractImplRecord", contractImplRecord);
    }

    @Override
    public ContractImplRecordVo queryContractImplementRecord(ContractImplRecordVo contractImplRecord) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryContractImplementRecord", contractImplRecord);
    }

    @Override
    public List<ContractObjectVo> selectContractEm(ContractObjectVo userCenterContractObject) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.selectContractEm", userCenterContractObject);
    }

    @Override
    public int updatetContractEm(ContractObjectVo userCenterContractObject) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractDao.updatetContractEm", userCenterContractObject);
    }

    @Override
    public int deleteContractEm(ContractObjectVo userCenterContractObject) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractDao.deleteContractEm", userCenterContractObject);
    }

    @Override
    public List<ViewBusinessCancelContractListVo> queryCancelContractList(Pagination<ViewBusinessCancelContractListVo> pagination) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.queryCancelContractList", pagination);
    }

    @Override
    public int queryCancelContractListTotalRecords(Pagination<ViewBusinessCancelContractListVo> pagination) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryCancelContractListTotalRecords", pagination);
    }

    @Override
    public List<BusinesTypeVo> queryTypeList(BusinesTypeVo businesTypeVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.queryTypeList", businesTypeVo);
    }

    @Override
    public int updateContractBodyRemark(UserCenterContractBody userCenterContractBody) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractDao.updateContractBodyRemark", userCenterContractBody);
    }

    @Override
    public Pagination<ViewBusinessContractVo> queryContractPageList(Pagination<ViewBusinessContractVo> pagination) {
        List<ViewBusinessContractVo> list = sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.queryContractPageList", pagination);
        int totalRecords = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryContractPageRecords", pagination);
        return pagination.setList(list, totalRecords);
    }

    @Override
    public int deleteContractImage(ContractImageVo contractImageVo) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.ContractDao.deleteContractImage", contractImageVo);
    }

    @Override
    public ContractQuantityStatisticsVo queryContractQuantityStatistics(ContractQuantityStatisticsVo quantityStatisticsVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryContractQuantityStatistics", quantityStatisticsVo);
    }

    @Override
    public int updateContractObjectForSignature(ContractObjectVo contractObject) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractDao.updateContractObjectForSignature", contractObject);
    }

    @Override
    public int updateContractQuantityStatistics(ContractQuantityStatisticsVo quantityStatisticsVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractDao.updateContractQuantityStatistics", quantityStatisticsVo);
    }

    @Override
    public List<ViewBusinessContractVo> queryWarnContractListToApp(ViewBusinessContractVo businessContractVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.queryWarnContractListToApp", businessContractVo);
    }

    @Override
    public List<ContractObjectVo> stayContract(ContractObjectVo contractObject) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.stayContract", contractObject);
    }

    @Override
    public Pagination<ViewBusinessCancelContractListVo> querySettlementOrderPageList(Pagination<ViewBusinessCancelContractListVo> pagination) {
        List<ViewBusinessCancelContractListVo> list = sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.querySettlementOrderPageList", pagination);
        int totalRecords = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.querySettlementOrderPageRecords", pagination);
        return pagination.setList(list, totalRecords);
    }

    @Override
    public List<BusinessCancelContractOrder> queryCancelContractListInfo(BusinessCancelContractOrder businessCancelContractOrder) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.queryCancelContractListInfo", businessCancelContractOrder);
    }

    @Override
    public ViewBusinessContractVo queryContractObjectLastOne(ViewBusinessContractVo contractObject) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryContractObjectLastOne", contractObject);
    }

    @Override
    public int addPriceApplyRecord(PriceApplyRecord priceApplyRecord) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ContractDao.addPriceApplyRecord", priceApplyRecord);
    }

    @Override
    public PageModel<PriceApplyRecord> queryPriceApplyRecordList(int pageNo, int pageSize, HouseModel houseModel) {
        PageModel<PriceApplyRecord> pageModel = new PageModel<PriceApplyRecord>();
        // 分页设置开始点
        pageModel.setPageNo((pageNo - 1) * pageSize);
        // 分页设置查询条数
        pageModel.setPageSize(pageSize);
        // 分页设置查询条件
        pageModel.setHouseModel(houseModel);
        // 分页查询调价审核信息集合
        List<PriceApplyRecord> priceApplyRecord = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.queryPriceApplyRecordList", pageModel);
        // 查询调价审核总记录数
        int totalRecords = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryPriceApplyRecordListCount", pageModel);
        ;
        pageModel.setList(priceApplyRecord);
        pageModel.setTotalRecords(totalRecords);
        return pageModel;
    }

    @Override
    public PriceApplyRecord queryPriceApplyRecord(PriceApplyRecord priceApplyRecord) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryPriceApplyRecord", priceApplyRecord);
    }

    @Override
    public int updatePriceApplyRecord(PriceApplyRecord priceApplyRecord) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractDao.updatePriceApplyRecord", priceApplyRecord);
    }

    @Override
    public List<PriceApplyRecord> queryRecordByHiCode(PriceApplyRecord priceApplyRecord) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.queryRecordByHiCode", priceApplyRecord);
    }

    @Override
    public ViewBusinessContractVo selectViewContractListHiCode(ViewBusinessContractVo businessContractVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.selectViewContractListHiCode", businessContractVo);
    }

    @Override
    public ContractCompanyRelationVo queryContractCompanyRelation(ContractCompanyRelationVo companyRelationVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryContractCompanyRelation", companyRelationVo);
    }

    @Override
    public int addContractCompanyRelation(ContractCompanyRelationVo companyRelationVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ContractDao.addContractCompanyRelation", companyRelationVo);
    }

    @Override
    public int updateContractCompanyRelation(ContractCompanyRelationVo companyRelationVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractDao.updateContractCompanyRelation", companyRelationVo);
    }

    @Override
    public ContractVersionManage queryContractVersion(ContractVersionManage contractVersionManage) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryContractVersion", contractVersionManage);
    }

    @Override
    public ContractSignVerifyVo queryContractSignVerify(ContractSignVerifyVo contractSignVerifyVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryContractSignVerify", contractSignVerifyVo);
    }

    @Override
    public int addContractSignVerify(ContractSignVerifyVo contractSignVerifyVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ContractDao.addContractSignVerify", contractSignVerifyVo);
    }

    @Override
    public int updateContractSignVerify(ContractSignVerifyVo contractSignVerifyVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractDao.updateContractSignVerify", contractSignVerifyVo);
    }

    @Override
    public ContractObjectVo selectNewContractObject(ContractObjectVo contractObjectVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.selectNewContractObject", contractObjectVo);
    }

    @Override
    public ContractVersionManage queryContractVersionPriview(ContractVersionManage contractVersionManage) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryContractVersionPriview", contractVersionManage);
    }

    @Override
    public ContractObjectVo selectContractObjectId(ContractObjectVo contractObjectVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.selectContractObjectId", contractObjectVo);
    }

    @Override
    public Pagination<ViewBusinessContractVo> managerExamineList(Pagination<?> pagination) {
        List<ViewBusinessContractVo> list = sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.managerExamineList", pagination);
        Pagination<ViewBusinessContractVo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list);
        if (pagination.isPage()) {
            int totalRecords = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.managerExamineListRows", pagination);
            paginationTo.setTotalRecords(totalRecords);
        }
        return paginationTo;
    }

    @Override
    public int updateAdditionalExamine(ContractAgreementAuditingVo agreementAuditingVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractDao.UpdateAdditionalExamine", agreementAuditingVo);
    }

    @Override
    public int insertAgreementAuditingRecord(ContractAgreementAuditingRecordVo agreementAuditingVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ContractDao.insertAgreementAuditingRecord", agreementAuditingVo);
    }

    @Override
    public List<ContractAgreementAuditingRecordVo> queryAgreementAuditingRecordList(ContractAgreementAuditingRecordVo agreementAuditingRecordVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.queryAgreementAuditingRecordList", agreementAuditingRecordVo);
    }

    @Override
    public ContractAgreementAuditingVo queryContractAgreementAuditing(ContractAgreementAuditingVo contractAgreementAuditingVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryContractAgreementAuditing", contractAgreementAuditingVo);
    }

    @Override
    public int addContractAgreementAuditing(ContractAgreementAuditingVo contractAgreementAuditingVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ContractDao.addContractAgreementAuditing", contractAgreementAuditingVo);
    }

    @Override
    public int updateContractAgreementAuditing(ContractAgreementAuditingVo contractAgreementAuditingVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.ContractDao.updateContractAgreementAuditing", contractAgreementAuditingVo);
    }

    @Override
    public List<ContractObjectVo> selectHouse(ContractObjectVo contract) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.selectHouse", contract);
    }

    @Override
    public List<ContractObjectVo> selectContractObject1st(ContractObjectVo contract) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.selectContractObject1st", contract);
    }

    @Override
    public ContractObjectVo selectHouseHiCode(ContractObjectVo contract) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.selectHouse", contract);
    }

    @Override
    public List<AppContractVo> appSelectContractList(AppContractVo appContractVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.appSelectContractList", appContractVo);
    }

    @Override
    public ViewBusinessContractVo queryHouseContract(ViewBusinessContractVo viewBusinessContractVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryHouseContract", viewBusinessContractVo);
    }

    @Override
    public ContractInfoVo queryContractInfo(ContractInfoVo contractInfoVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryContractInfo", contractInfoVo);
    }

    @Override
    public List<ContractStatementBalanceVo> queryBalanceListByCode(ContractStatementBalanceVo statementBalanceVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.queryBalanceListByCode", statementBalanceVo);
    }

    @Override
    public List<ViewBusinessContractVo> queryContractNotObsolute(ViewBusinessContractVo viewBusinessContractVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ContractDao.queryContractNotObsolute", viewBusinessContractVo);
    }

    @Override
    public HouseInfoKeep queryVacantHouseByCode(String hi_code) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ContractDao.queryVacantHouseByCode", hi_code);
    }
}
