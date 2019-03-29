package com.gjp.dao;

import com.gjp.model.ContractBillVo;
import com.gjp.util.Pagination;

import java.util.List;

/**
 * @author tanglei
 * @description
 * @date Created in 2017/11/30
 */
public interface BudgetDao {

    /**
     *预算管理数据
     * @param pagination
     * @author tanglei
     */
    Pagination<ContractBillVo> queryBudget(Pagination<ContractBillVo> pagination);

    /**
     * 预算管理列表
     * @author tanglei
     */
    Pagination<ContractBillVo> queryBudgetList(Pagination<ContractBillVo> pagination);

    /**
     * 今天为止之前未完成的账单
     * @param finance
     * @return
     */
    List<ContractBillVo> queryContractBill(ContractBillVo finance);
}
