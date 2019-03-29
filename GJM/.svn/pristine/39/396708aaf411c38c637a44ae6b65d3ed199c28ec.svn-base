package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.FinanceManageDao;
import com.gjp.model.*;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FinanceManageDaoImpl extends BaseDAO implements FinanceManageDao {

    @Override
    public int addBudgetBill(BudgetBillVo budgetVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.FinanceManageDao.addBudgetBill", budgetVo);
    }

    @Override
    public Pagination<BudgetOrderVo> queryBudgetOrderPageList(Pagination<BudgetOrderVo> pagination) {
        Pagination<BudgetOrderVo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());

        List<BudgetOrderVo> list = sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryBudgetOrderPageList", pagination);
        int totalRecords = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryBudgetOrderPageTotalRecords", pagination);
        paginationTo.setList(list, totalRecords);
        return paginationTo;
    }

    @Override
    public Pagination<BudgetBillVo> queryBudgetBillPageList(Pagination<BudgetBillVo> pagination) {
        Pagination<BudgetBillVo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());

        List<BudgetBillVo> list = sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryBudgetBillPageList", pagination);
        int totalRecords = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryBudgetBillPageTotalRecords", pagination);
        paginationTo.setList(list, totalRecords);
        return paginationTo;
    }

    @Override
    public int addBillStatement(BillStatementVo billStatement) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.FinanceManageDao.addBillStatement", billStatement);
    }

    @Override
    public int deleteBudgetBill(BudgetBillVo budgetVo) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.FinanceManageDao.deleteBudgetBill", budgetVo);
    }

    @Override
    public int addBudgetOrder(BudgetOrderVo budgetOrderVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.FinanceManageDao.addBudgetOrder", budgetOrderVo);
    }

    @Override
    public int updateBudgetOrder(BudgetOrderVo budgetOrderVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.FinanceManageDao.updateBudgetOrder", budgetOrderVo);
    }

    @Override
    public List<BudgetBillVo> queryBudgetBillMoreList(BudgetBillVo budgetBillVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryBudgetBillMoreList", budgetBillVo);
    }

    @Override
    public int updateBudgetBill(BudgetBillVo budgetVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.FinanceManageDao.updateBudgetBill", budgetVo);
    }

    @Override
    public BudgetOrderVo queryBudgetOrder(BudgetOrderVo budgetOrderVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryBudgetOrder", budgetOrderVo);
    }

    @Override
    public BudgetBillVo queryBudgetBill(BudgetBillVo budgetBillVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryBudgetBill", budgetBillVo);
    }

    @Override
    public List<BudgetBillVo> queryBudgetBillList(BudgetBillVo budgetBillVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryBudgetBillList", budgetBillVo);
    }

    @Override
    public int deleteBillStatement(BillStatementVo billStatement) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.FinanceManageDao.deleteBillStatement", billStatement);
    }

    @Override
    public int updateContractBillForRevoke(ContractBillVo contractBillVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.FinanceManageDao.updateContractBillForRevoke", contractBillVo);
    }

    @Override
    public List<BillTypeVo> queryBillTypeList(BillTypeVo billTypeVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryBillTypeList", billTypeVo);
    }

    @Override
    public ContractOrderVo queryFinanceOrder(ContractOrderVo contractOrderVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryFinanceOrder", contractOrderVo);
    }

    @Override
    public List<ContractBillVo> queryFinanceBillList(ContractBillVo contractBillVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryFinanceBillList", contractBillVo);
    }

    @Override
    public List<ContractBillVo> queryContractBillListByTotal(ContractBillVo contractBillVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryContractBillListByTotal", contractBillVo);
    }

    @Override
    public int updateFinanceOrder(ContractOrderVo contractOrderVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.FinanceManageDao.updateFinanceOrder", contractOrderVo);
    }

    @Override
    public int updateFinanceBill(ContractBillVo contractBillVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.FinanceManageDao.updateFinanceBill", contractBillVo);
    }

    @Override
    public int addContractBill(ContractBillVo contractBillVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.FinanceManageDao.addContractBill", contractBillVo);
    }

    @Override
    public int deleteFinanceOrder(ContractOrderVo contractOrderVo) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.FinanceManageDao.deleteFinanceOrder", contractOrderVo);
    }

    @Override
    public int deleteContractBill(ContractBillVo contractBillVo) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.FinanceManageDao.deleteContractBill", contractBillVo);
    }

    @Override
    public int addContractOrder(ContractOrderVo contractOrderVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.FinanceManageDao.addContractOrder", contractOrderVo);
    }

    @Override
    public ContractBillVo queryFinanceBill(ContractBillVo contractBillVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryFinanceBill", contractBillVo);
    }

    @Override
    public ContractBillVo queryContractBillFirstOne(ContractBillVo contractBillVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryContractBillFirstOne", contractBillVo);
    }

    @Override
    public int addStatementFiliation(BillStatementFiliation billStatementFiliation) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.FinanceManageDao.addStatementFiliation", billStatementFiliation);
    }

    @Override
    public Pagination<ContractBillVo> queryContractBillPageList(Pagination<?> pagination) {
        List<ContractBillVo> list = sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryContractBillPageList", pagination);
        Pagination<ContractBillVo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list);
        if (pagination.isPage()) {
            int totalRecords = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryContractBillPageRecord", pagination);
            paginationTo.setTotalRecords(totalRecords);
        }
        return paginationTo;
    }

    @Override
    public Pagination<FinanceOrderPageListBo> queryFinanceOrderPageList(Pagination<?> pagination) {
        List<FinanceOrderPageListBo> list = sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryFinanceOrderPageList", pagination);
        Pagination<FinanceOrderPageListBo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list);
        if (pagination.isPage()) {
            int totalRecords = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryFinanceOrderPageTotalRecord", pagination);
            paginationTo.setTotalRecords(totalRecords);
        }
        return paginationTo;
    }

    @Override
    public int addContractBillLogs(AddContractBillLogs contractOrderAudting) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.FinanceManageDao.addContractBillLogs", contractOrderAudting);
    }

    @Override
    public List<BillStatementFiliation> queryStatementFiliationList(BillStatementFiliation statementFiliation) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryStatementFiliationList", statementFiliation);
    }

    @Override
    public int delectStatementFiliation(BillStatementFiliation statementFiliation) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.FinanceManageDao.delectStatementFiliation", statementFiliation);
    }

    @Override
    public int addRelatedBill(BillRelatedBillVo relatedBillVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.FinanceManageDao.addRelatedBill", relatedBillVo);
    }

    @Override
    public int updateRelatedBill(BillRelatedBillVo relatedBillVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.FinanceManageDao.updateRelatedBill", relatedBillVo);
    }

    @Override
    public Pagination<BillRelatedBillVo> queryRelatedBillPageList(Pagination<BillRelatedBillVo> pagination) {
        List<BillRelatedBillVo> list = sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryRelatedBillPageList", pagination);
        int totalRecords = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryRelatedBillPageRecords", pagination);

        Pagination<BillRelatedBillVo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list, totalRecords);
        return paginationTo;
    }

    @Override
    public Pagination<BillRelatedOrderVo> queryRelatedOrderPageList(Pagination<BillRelatedOrderVo> pagination) {
        List<BillRelatedOrderVo> list = sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryRelatedOrderPageList", pagination);
        int totalRecords = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryRelatedOrderPageRecords", pagination);

        Pagination<BillRelatedOrderVo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list, totalRecords);
        return paginationTo;
    }

    @Override
    public int addRelatedOrder(BillRelatedOrderVo relatedOrderVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.FinanceManageDao.addRelatedOrder", relatedOrderVo);
    }

    @Override
    public int updateRelatedOrder(BillRelatedOrderVo relatedOrderVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.FinanceManageDao.updateRelatedOrder", relatedOrderVo);
    }

    @Override
    public List<BillRelatedBillVo> queryRelatedBillList(BillRelatedBillVo relatedBillVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryRelatedBillList", relatedBillVo);
    }

    @Override
    public int deleteRelatedBill(BillRelatedBillVo relatedBillVo) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.FinanceManageDao.deleteRelatedBill", relatedBillVo);
    }

    @Override
    public BillRelatedOrderVo queryRelatedOrder(BillRelatedOrderVo relatedOrderVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryRelatedOrder", relatedOrderVo);
    }

    @Override
    public List<BillStatementVo> selectBusinessStatement(BillStatementVo billStatementVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.selectBusinessStatement", billStatementVo);
    }

    @Override
    public Integer updateBusinessStatement(BillStatementVo billStatementVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.FinanceManageDao.updateBusinessStatement", billStatementVo);
    }

    @Override
    public Integer updateBusinessStatementPay(BillStatementVo billStatementVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.FinanceManageDao.updateBusinessStatementPay", billStatementVo);
    }

    @Override
    public ContractBillVo queryContractBillForCurrentCycle(ContractBillVo contractBillVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryContractBillForCurrentCycle", contractBillVo);
    }

    @Override
    public int addContractPrintLogs(ContractPrintLogs contractPrintLogs) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.FinanceManageDao.addContractPrintLogs", contractPrintLogs);
    }

    @Override
    public int updateRelatedOrderState(BillRelatedOrderVo relatedOrderVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.FinanceManageDao.updateRelatedOrderState", relatedOrderVo);
    }

    @Override
    public List<BillRelatedOrderVo> queryMyselfRelatedOrderPageList(BillRelatedOrderVo billRelatedOrderVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryMyselfRelatedOrderPageList", billRelatedOrderVo);
    }

    @Override
    public Pagination<BillRelatedBillVo> queryDepositOrderPageList(Pagination<BillRelatedBillVo> pagination) {
        List<BillRelatedBillVo> list = sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryDepositOrderPageList", pagination);
        int totalRecords = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryDepositOrderPageRecords", pagination);

        Pagination<BillRelatedBillVo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list, totalRecords);
        return paginationTo;
    }

    @Override
    public List<ContractBillVo> queryContractCodeBill(ContractBillVo contractBillVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryContractCodeBill", contractBillVo);
    }

    @Override
    public int updateContractOrderForState(ContractOrderVo contractOrderVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.FinanceManageDao.updateContractOrderForState", contractOrderVo);
    }

    @Override
    public String updateFinanceOrderBillData(ContractOrderVo contractOrderVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.updateFinanceOrderBillData", contractOrderVo);
    }

    @Override
    public BillStatementVo queryBillStatement(BillStatementVo statementVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryBillStatement", statementVo);
    }

    @Override
    public FinancePayFlowStatementVo queryPayFlowStatement(FinancePayFlowStatementVo flowStatementVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryPayFlowStatement", flowStatementVo);
    }

    @Override
    public int updatePayFlowStatement(FinancePayFlowStatementVo flowStatementVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.FinanceManageDao.updatePayFlowStatement", flowStatementVo);
    }

    @Override
    public List<FinanceStatementBillRelationVo> queryStatementBillRelationList(FinanceStatementBillRelationVo statementBillRelationVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryStatementBillRelationList", statementBillRelationVo);
    }

    @Override
    public int addStatementBillRelation(FinanceStatementBillRelationVo statementBillRelationVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.FinanceManageDao.addStatementBillRelation", statementBillRelationVo);
    }

    @Override
    public int addPayFlowStatement(FinancePayFlowStatementVo payFlowStatementVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.FinanceManageDao.addPayFlowStatement", payFlowStatementVo);
    }

    @Override
    public Pagination<BillPayFlowStatementBo> queryPayFlowStatementPageList(Pagination<?> pagination) {
        List<BillPayFlowStatementBo> list = sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryPayFlowStatementPageList", pagination);
        Pagination<BillPayFlowStatementBo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list);
        if (pagination.isPage()) {
            int totalRecords = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryPayFlowStatementPageRecord", pagination);
            paginationTo.setTotalRecords(totalRecords);
        }
        return paginationTo;
    }

    @Override
    public BillPayFlowStatementBo selectDepositManage(BillPayFlowStatementBo billPayFlowStatementBo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.selectDepositManage", billPayFlowStatementBo);
    }

    @Override
    public List<BillFinanceResult> selectFinanceResult(BillFinanceResult billFinanceResult) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.selectFinanceResult", billFinanceResult);
    }

    @Override
    public int submitFinanceResult(BillFinanceResult financeResult) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.FinanceManageDao.submitFinanceResult", financeResult);
    }

    @Override
    public FinanceStatementBillRelationVo statementBillRelation(
            FinanceStatementBillRelationVo financeStatementBillRelationVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.statementBillRelation", financeStatementBillRelationVo);
    }

    @Override
    public int insertRefundFlowStatement(FinanceRefundFlowStatement financeRefundFlowStatement) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.FinanceManageDao.insertRefundFlowStatement", financeRefundFlowStatement);
    }

    @Override
    public BillFinanceResult selectNewFinanceResult(BillFinanceResult billFinanceResult) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.selectNewFinanceResult", billFinanceResult);
    }

    @Override
    public List<ContractOrderVo> queryFinanceOrderList(ContractOrderVo contractOrderVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryFinanceOrderList", contractOrderVo);
    }

    @Override
    public int updateStatementBillRelation(FinanceStatementBillRelationVo statementBillRelationVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.FinanceManageDao.updateStatementBillRelation", statementBillRelationVo);
    }

    @Override
    public List<FinancePayFlowStatementVo> queryPayFlowStatementPayerList(FinancePayFlowStatementVo financePayFlowStatementVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryPayFlowStatementPayerList", financePayFlowStatementVo);
    }

    @Override
    public Pagination<FinanceFrontMoneyBillBo> queryFrontMoneyBillPageList(Pagination<FinanceFrontMoneyBillBo> pagination) {
        List<FinanceFrontMoneyBillBo> list = sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryFrontMoneyBillPageList", pagination);
        int totalRecords = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryFrontMoneyBillPageRecords", pagination);
        Pagination<FinanceFrontMoneyBillBo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list, totalRecords);
        return paginationTo;
    }

    @Override
    public FinanceRefundFlowStatement queryRefundFlowStatement(FinanceRefundFlowStatement financeRefundFlowStatement) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryRefundFlowStatement", financeRefundFlowStatement);
    }

    @Override
    public List<FinancePayFlowStatementVo> financeOrderListapp(FinancePayFlowStatementVo financePayFlowStatementVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.financeOrderListapp", financePayFlowStatementVo);
    }

    @Override
    public List<ContractBillVo> queryFinanceBillPaymentList(ContractBillVo contractBillVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryFinanceBillPaymentList", contractBillVo);
    }

    @Override
    public FinanceDownPaymentVo queryFinanceDownPayment(FinanceDownPaymentVo financeDownPaymentVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryFinanceDownPayment", financeDownPaymentVo);
    }

    @Override
    public int updateFinanceDownPayment(FinanceDownPaymentVo financeDownPaymentVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.FinanceManageDao.updateFinanceDownPayment", financeDownPaymentVo);
    }

    @Override
    public Pagination<OrderBillVo> queryOrderBillPageList(Pagination<OrderBillVo> pagination) {
        pagination.setList(sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryOrderBillPageList", pagination));
        pagination.setTotalRecords(sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryOrderBillTotalRecords", pagination));
        return pagination.cleanParams();
    }

    @Override
    public Pagination<OrderVo> queryOrderPageList(Pagination<OrderVo> pagination) {
        pagination.setList(sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryOrderPageList", pagination));
        pagination.setTotalRecords(sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryOrderTotalRecords", pagination));
        return pagination.cleanParams();
    }

    @Override
    public Pagination<FinanceDownPaymentVo> queryDownPaymentPageList(Pagination<FinanceDownPaymentVo> pagination) {
        pagination.setList(sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryDownPaymentPageList", pagination));
        pagination.setTotalRecords(sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryDownPaymentTotalRecords", pagination));
        return pagination.cleanParams();
    }

    @Override
    public int addContractBillInstalment(ContractBillInstalmentVo contractBillInstalmentVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.FinanceManageDao.addContractBillInstalment", contractBillInstalmentVo);
    }

    @Override
    public List<ContractBillInstalmentVo> queryContractBillInstalmentList(ContractBillInstalmentVo contractBillInstalmentVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.FinanceManageDao.queryContractBillInstalmentList", contractBillInstalmentVo);
    }

    @Override
    public ContractBillInstalmentVo queryContractBillInstalment(ContractBillInstalmentVo contractBillInstalmentVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryContractBillInstalment", contractBillInstalmentVo);
    }

    @Override
    public int updateContractBillInstalment(ContractBillInstalmentVo contractBillInstalmentVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.FinanceManageDao.updateContractBillInstalment", contractBillInstalmentVo);
    }

    @Override
    public int deleteContractBillInstalment(ContractBillInstalmentVo contractBillInstalmentVo) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.FinanceManageDao.deleteContractBillInstalment", contractBillInstalmentVo);
    }

    @Override
    public int addOrderReturns(OrderReturnsVo orderReturnsVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.FinanceManageDao.addOrderReturns", orderReturnsVo);
    }

    @Override
    public OrderReturnsVo queryOrderReturns(OrderReturnsVo orderReturnsVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.FinanceManageDao.queryOrderReturns", orderReturnsVo);
    }
}
