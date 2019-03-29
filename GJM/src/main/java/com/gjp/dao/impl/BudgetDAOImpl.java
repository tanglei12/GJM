package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.BillApplyExpenseDao;
import com.gjp.dao.BudgetDao;
import com.gjp.model.BillPayFlowStatementBo;
import com.gjp.model.ContractBillVo;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author tanglei
 * @description
 * @date Created in 2017/11/30
 */
@Repository
public class BudgetDAOImpl extends BaseDAO implements BudgetDao {

    public Pagination<ContractBillVo> queryBudget(Pagination<ContractBillVo> pagination) {
        List<ContractBillVo> list = sqlSessionTemplateBusiness.selectList("com.gjp.dao.BaseDAO.queryBudget", pagination);
        Pagination<ContractBillVo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list);
        if (pagination.isPage()) {
            int totalRecords = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BaseDAO.queryBudgetPageRecord", pagination);
            paginationTo.setTotalRecords(totalRecords);
        }
        return paginationTo;
    }

    @Override
    public Pagination<ContractBillVo> queryBudgetList(Pagination<ContractBillVo> pagination) {
        List<ContractBillVo> list = sqlSessionTemplateBusiness.selectList("com.gjp.dao.BaseDAO.queryBudgetList", pagination);
        Pagination<ContractBillVo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list);
        if (pagination.isPage()) {
            int totalRecords = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BaseDAO.queryBudgetListPageRecord", pagination);
            paginationTo.setTotalRecords(totalRecords);
        }
        return paginationTo;
    }

    @Override
    public List<ContractBillVo> queryContractBill(ContractBillVo finance) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.BaseDAO.queryContractBill", finance);
    }


}
