package com.gjp.dao;

import com.gjp.model.*;
import com.gjp.util.Pagination;

import java.util.List;

public interface FinanceManageDao {

    /**
     * 添加账单结算单
     *
     * @param budgetVo
     * @return
     * @作者 JiangQT
     * @日期 2016年10月30日
     */
    int addBudgetBill(BudgetBillVo budgetVo);

    /**
     * 查询预算订单分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年11月2日
     */
    Pagination<BudgetOrderVo> queryBudgetOrderPageList(Pagination<BudgetOrderVo> pagination);

    /**
     * 查询预算订单分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年11月2日
     */
    Pagination<BudgetBillVo> queryBudgetBillPageList(Pagination<BudgetBillVo> pagination);

    /**
     * 添加支付流水
     *
     * @param statementVo
     * @return
     * @作者 JiangQT
     * @日期 2016年11月4日
     */
    int addBillStatement(BillStatementVo statementVo);

    /**
     * 添加流水关联表
     *
     * @return
     * @author 陈智颖
     */
    int addStatementFiliation(BillStatementFiliation statementFiliation);

    /**
     * 根据第三方交易号查询流水
     *
     * @return
     * @author chen
     * @date Jan 12, 2017 4:32:32 PM
     */
    List<BillStatementVo> selectBusinessStatement(BillStatementVo billStatementVo);

    /**
     * 根据流水号修改第三方交易号和商户订单号
     *
     * @param billStatementVo
     * @return
     * @author chen
     * @date Jan 13, 2017 2:52:11 PM
     */
    Integer updateBusinessStatementPay(BillStatementVo billStatementVo);

    /**
     * 根据流水号修改期数
     *
     * @param billStatementVo
     * @return
     * @author chen
     * @date Jan 12, 2017 4:34:09 PM
     */
    Integer updateBusinessStatement(BillStatementVo billStatementVo);

    /**
     * 删除预算清单数据
     *
     * @param budgetVo
     * @return
     * @作者 JiangQT
     * @日期 2016年11月14日
     */
    int deleteBudgetBill(BudgetBillVo budgetVo);

    /**
     * 添加预算订单
     *
     * @param budgetOrderVo
     * @return
     * @作者 JiangQT
     * @日期 2016年11月24日
     */
    int addBudgetOrder(BudgetOrderVo budgetOrderVo);

    /**
     * 更新预算订单
     *
     * @param budgetOrderVo
     * @return
     * @作者 JiangQT
     * @日期 2016年11月24日
     */
    int updateBudgetOrder(BudgetOrderVo budgetOrderVo);

    /**
     * 查询预算账单列表
     *
     * @param budgetBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年11月25日
     */
    List<BudgetBillVo> queryBudgetBillMoreList(BudgetBillVo budgetBillVo);

    /**
     * 更新结算账单
     *
     * @param budgetVo
     * @return
     * @作者 JiangQT
     * @日期 2016年11月27日
     */
    int updateBudgetBill(BudgetBillVo budgetVo);

    /**
     * 查询预算订单
     *
     * @param budgetOrderVo
     * @return
     * @作者 JiangQT
     * @日期 2016年11月29日
     */
    BudgetOrderVo queryBudgetOrder(BudgetOrderVo budgetOrderVo);

    /**
     * 查询预算账单详情
     *
     * @param budgetBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年11月30日
     */
    BudgetBillVo queryBudgetBill(BudgetBillVo budgetBillVo);

    /**
     * 查询预算账单列表
     *
     * @param budgetBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月1日
     */
    List<BudgetBillVo> queryBudgetBillList(BudgetBillVo budgetBillVo);

    /**
     * 删除账单流水
     *
     * @param statementVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月5日
     */
    int deleteBillStatement(BillStatementVo statementVo);

    /**
     * 更新租赁合同账单撤销数据
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年12月5日
     */
    int updateContractBillForRevoke(ContractBillVo contractBillVo);

    /**
     * 查询账单类型对象列表
     *
     * @param billTypeVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月6日
     */
    List<BillTypeVo> queryBillTypeList(BillTypeVo billTypeVo);

    /**
     * 查询合同订单信息
     *
     * @param contractOrderVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月8日
     */
    ContractOrderVo queryFinanceOrder(ContractOrderVo contractOrderVo);

    /**
     * 根据合同编码查询账单订单
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年12月8日
     */
    List<ContractBillVo> queryContractCodeBill(ContractBillVo contractBillVo);

    /**
     * 查询合同账单列表数据
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年12月8日
     */
    List<ContractBillVo> queryFinanceBillList(ContractBillVo contractBillVo);

    /**
     * 查询账单列表综合数据
     *
     * @param contractBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月8日
     */
    List<ContractBillVo> queryContractBillListByTotal(ContractBillVo contractBillVo);

    /**
     * 更新合同订单数据
     *
     * @param contractOrderVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月9日
     */
    int updateFinanceOrder(ContractOrderVo contractOrderVo);

    /**
     * 更新合同账单数据
     *
     * @param contractBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月9日
     */
    int updateFinanceBill(ContractBillVo contractBillVo);

    /**
     * 添加合同账单数据
     *
     * @param contractBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月9日
     */
    int addContractBill(ContractBillVo contractBillVo);

    /**
     * 删除合同订单
     *
     * @param contractOrderVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月9日
     */
    int deleteFinanceOrder(ContractOrderVo contractOrderVo);

    /**
     * 删除合同账单
     *
     * @param contractBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月9日
     */
    int deleteContractBill(ContractBillVo contractBillVo);

    /**
     * 添加合同订单
     *
     * @param contractOrderVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月9日
     */
    int addContractOrder(ContractOrderVo contractOrderVo);

    /**
     * 查询合同账单
     *
     * @param contractBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月11日
     */
    ContractBillVo queryFinanceBill(ContractBillVo contractBillVo);

    /**
     * 查询合同账单第一项
     *
     * @param contractBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月11日
     */
    ContractBillVo queryContractBillFirstOne(ContractBillVo contractBillVo);

    /**
     * 查询合同订单分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年12月12日
     */
    Pagination<ContractBillVo> queryContractBillPageList(Pagination<?> pagination);

    /**
     * 查询合同订单分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年12月12日
     */
    Pagination<FinanceOrderPageListBo> queryFinanceOrderPageList(Pagination<?> pagination);

    /**
     * 插入审核记录表
     *
     * @param contractOrderAudting
     * @return
     * @author 陈智颖
     */
    int addContractBillLogs(AddContractBillLogs contractOrderAudting);

    /**
     * 查询流水关系表数据
     *
     * @param statementFiliation
     * @return
     * @作者 JiangQT
     * @日期 2016年12月17日
     */
    List<BillStatementFiliation> queryStatementFiliationList(BillStatementFiliation statementFiliation);

    /**
     * 删除流水关系表数据
     *
     * @param statementFiliation
     * @return
     * @作者 JiangQT
     * @日期 2016年12月17日
     */
    int delectStatementFiliation(BillStatementFiliation statementFiliation);

    /**
     * 添加关联账单
     *
     * @param relatedBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月21日
     */
    int addRelatedBill(BillRelatedBillVo relatedBillVo);

    /**
     * 更新关联账单
     *
     * @param relatedBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月21日
     */
    int updateRelatedBill(BillRelatedBillVo relatedBillVo);

    /**
     * 查询关联账单分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年12月21日
     */
    Pagination<BillRelatedBillVo> queryRelatedBillPageList(Pagination<BillRelatedBillVo> pagination);

    /**
     * 查询关联订单分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年12月22日
     */
    Pagination<BillRelatedOrderVo> queryRelatedOrderPageList(Pagination<BillRelatedOrderVo> pagination);

    /**
     * 查询我的收款情况分页
     *
     * @return
     * @作者 陈智颖
     * @日期 2016年12月22日
     */
    List<BillRelatedOrderVo> queryMyselfRelatedOrderPageList(BillRelatedOrderVo billRelatedOrderVo);

    /**
     * 添加关联订单
     *
     * @param relatedOrderVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月23日
     */
    int addRelatedOrder(BillRelatedOrderVo relatedOrderVo);

    /**
     * 更新关联订单
     *
     * @param relatedOrderVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月23日
     */
    int updateRelatedOrder(BillRelatedOrderVo relatedOrderVo);

    /**
     * 根据房屋hi_code 更新把未支付的关联订单失效
     *
     * @param relatedOrderVo
     * @return
     * @作者 陈智颖
     * @日期 2016年12月23日
     */
    int updateRelatedOrderState(BillRelatedOrderVo relatedOrderVo);

    /**
     * 查询关联账单
     *
     * @param relatedBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月26日
     */
    List<BillRelatedBillVo> queryRelatedBillList(BillRelatedBillVo relatedBillVo);

    /**
     * 删除关联账单
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年12月26日
     */
    int deleteRelatedBill(BillRelatedBillVo relatedBillVo);

    /**
     * 查询关联订单
     *
     * @param relatedOrderVo
     * @return
     * @作者 JiangQT
     * @日期 2017年1月10日
     */
    BillRelatedOrderVo queryRelatedOrder(BillRelatedOrderVo relatedOrderVo);

    /**
     * 查询最新待交费的合同账单
     *
     * @param contractBillVo
     * @return
     * @作者 JiangQT
     * @日期 2017年2月14日
     */
    ContractBillVo queryContractBillForCurrentCycle(ContractBillVo contractBillVo);

    /**
     * 打印记录
     *
     * @param contractPrintLogs
     * @return
     * @author 陈智颖
     * @date Feb 24, 2017 11:24:21 AM
     */
    int addContractPrintLogs(ContractPrintLogs contractPrintLogs);

    /**
     * 查询定金列表
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2017年4月14日
     */
    Pagination<BillRelatedBillVo> queryDepositOrderPageList(Pagination<BillRelatedBillVo> pagination);

    /**
     * 更新合同订单状态
     *
     * @param contractOrderVo
     * @return
     */
    int updateContractOrderForState(ContractOrderVo contractOrderVo);

    /**
     * 更新合同账单订单状态
     *
     * @param contractOrderVo
     */
    String updateFinanceOrderBillData(ContractOrderVo contractOrderVo);

    /**
     * 查询流水
     *
     * @param statementVo
     * @return
     * @author JiangQt
     * @version 2017年6月6日上午10:18:41
     */
    BillStatementVo queryBillStatement(BillStatementVo statementVo);

    /**
     * 查询支付流水
     *
     * @param flowStatementVo
     * @return
     * @author JiangQt
     * @version 2017年6月7日下午2:03:34
     */
    FinancePayFlowStatementVo queryPayFlowStatement(FinancePayFlowStatementVo flowStatementVo);

    /**
     * 更新支付流水
     *
     * @param flowStatementVo
     * @return
     * @author JiangQt
     * @version 2017年6月7日下午2:11:23
     */
    int updatePayFlowStatement(FinancePayFlowStatementVo flowStatementVo);

    /**
     * 查询流水账单关联数据
     *
     * @param statementBillRelationVo
     * @return
     * @author JiangQt
     * @version 2017年6月7日下午3:50:14
     */
    List<FinanceStatementBillRelationVo> queryStatementBillRelationList(FinanceStatementBillRelationVo statementBillRelationVo);

    /**
     * 添加账单流水关联数据
     *
     * @param statementBillRelationVo
     * @return
     * @author JiangQt
     * @version 2017年6月7日下午5:47:30
     */
    int addStatementBillRelation(FinanceStatementBillRelationVo statementBillRelationVo);

    /**
     * 添加支付流水
     *
     * @param payFlowStatementVo
     * @return
     * @author JiangQt
     * @version 2017年6月8日上午10:05:20
     */
    int addPayFlowStatement(FinancePayFlowStatementVo payFlowStatementVo);

    /**
     * 定金分页查询数据
     *
     * @author tanglei
     * @Date 2017年7月23日 上午12:04:55
     */
    Pagination<BillPayFlowStatementBo> queryPayFlowStatementPageList(Pagination<?> pagination);

    /**
     * 合同订单弹出框数据
     *
     * @author tanglei
     * @Date 2017年7月22日下午19:15:55
     */
    BillPayFlowStatementBo selectDepositManage(BillPayFlowStatementBo billPayFlowStatementBo);

    /**
     * 处理结果
     *
     * @author tanglei
     * @Date 2017年7月23日 下午15:46:55d
     */
    List<BillFinanceResult> selectFinanceResult(BillFinanceResult billFinanceResult);

    /**
     * 提交定金违约信息
     *
     * @author tanglei
     * @Date 2017年7月23日 下午17:26:55
     */
    int submitFinanceResult(BillFinanceResult financeResult);

    /**
     * 订金根据流水号通过中间表查询账单
     *
     * @author tanglei
     * @Date 2017年7月24日 下午16:16:55
     */
    FinanceStatementBillRelationVo statementBillRelation(FinanceStatementBillRelationVo financeStatementBillRelationVo);

    /**
     * 生成退款流水记录
     *
     * @author tanglei
     * @Date 2017年7月25日 上午11:59:55
     */
    int insertRefundFlowStatement(FinanceRefundFlowStatement financeRefundFlowStatement);

    /**
     * 查询最近的一条定金审核记录
     *
     * @author tanglei
     * @Date 2017年7月24日   上午10:52:55
     */
    BillFinanceResult selectNewFinanceResult(BillFinanceResult BillFinanceResult);

    /**
     * 查询订单列表
     *
     * @param contractOrderVo
     * @return
     */
    List<ContractOrderVo> queryFinanceOrderList(ContractOrderVo contractOrderVo);

    /**
     * 更新流水关系
     *
     * @param statementBillRelationVo
     * @return
     */
    int updateStatementBillRelation(FinanceStatementBillRelationVo statementBillRelationVo);

    /**
     * 查询付款方支付流水列表数据
     *
     * @param financePayFlowStatementVo
     * @return
     */
    List<FinancePayFlowStatementVo> queryPayFlowStatementPayerList(FinancePayFlowStatementVo financePayFlowStatementVo);

    /**
     * 查询定金分页列表
     *
     * @param pagination
     * @return
     */
    Pagination<FinanceFrontMoneyBillBo> queryFrontMoneyBillPageList(Pagination<FinanceFrontMoneyBillBo> pagination);

    /**
     * 退款流水
     *
     * @param financeRefundFlowStatement
     * @return
     */
    FinanceRefundFlowStatement queryRefundFlowStatement(FinanceRefundFlowStatement financeRefundFlowStatement);

    /**
     * 查询订单已支付和未支付数据
     *
     * @return
     * @author tanglei
     * @date 2017年9月20日 下午15点26
     */
    List<FinancePayFlowStatementVo> financeOrderListapp(FinancePayFlowStatementVo financePayFlowStatementVo);

    List<ContractBillVo> queryFinanceBillPaymentList(ContractBillVo contractBillVo);

    FinanceDownPaymentVo queryFinanceDownPayment(FinanceDownPaymentVo financeDownPaymentVo);

    int updateFinanceDownPayment(FinanceDownPaymentVo financeDownPaymentVo);

    Pagination<OrderBillVo> queryOrderBillPageList(Pagination<OrderBillVo> pagination);

    Pagination<OrderVo> queryOrderPageList(Pagination<OrderVo> pagination);

    Pagination<FinanceDownPaymentVo> queryDownPaymentPageList(Pagination<FinanceDownPaymentVo> pagination);

    int addContractBillInstalment(ContractBillInstalmentVo contractBillInstalmentVo);

    List<ContractBillInstalmentVo> queryContractBillInstalmentList(ContractBillInstalmentVo contractBillInstalmentVo);

    ContractBillInstalmentVo queryContractBillInstalment(ContractBillInstalmentVo contractBillInstalmentVo);

    int updateContractBillInstalment(ContractBillInstalmentVo contractBillInstalmentVo);

    int deleteContractBillInstalment(ContractBillInstalmentVo contractBillInstalmentVo);

    int addOrderReturns(OrderReturnsVo orderReturnsVo);

    OrderReturnsVo queryOrderReturns(OrderReturnsVo orderReturnsVo);
}
