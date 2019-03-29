package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.BillContractOrderDao;
import com.gjp.model.ContractBillVo;
import com.gjp.model.ContractOrderVo;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 王孝元
 * @version 创建时间：2016年12月9日 上午9:39:08
 */
@Repository
public class BillContractOrderDaoImpl extends BaseDAO implements BillContractOrderDao {

    @Override
    public PageModel<ContractOrderVo> queryBillContractOrderList(PageModel<ContractOrderVo> pageModel) {
        List<ContractOrderVo> list = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillContractOrderDao.queryBillContractOrderList", pageModel);
        pageModel.setTotalRecords(queryBillContractOrderListCount(pageModel));
        pageModel.setList(list);
        return pageModel;
    }

    @Override
    public int queryBillContractOrderListCount(PageModel<ContractOrderVo> pageModel) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BillContractOrderDao.queryBillContractOrderListCount", pageModel);
    }

    @Override
    public ContractOrderVo queryBillContractOrderById(Integer bco_id) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BillContractOrderDao.queryBillContractOrderById", bco_id);
    }

    @Override
    public ContractOrderVo queryBillContractOrderByProperty(ContractOrderVo bco) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BillContractOrderDao.queryBillContractOrderByProperty", bco);
    }

    @Override
    public List<ContractBillVo> selectPayBillSuccess(ContractBillVo billVo) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillContractOrderDao.selectPayBillSuccess", billVo);
    }

    @Override
    public Double queryRentByOrderCode(String bco_code) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BillContractOrderDao.queryRentByOrderCode", bco_code);
    }

    @Override
    public List<ContractOrderVo> queryInitPartnerOrder() {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillContractOrderDao.queryInitPartnerOrder");
    }

    @Override
    public int updateBillContractOrder(ContractOrderVo bco) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.BillContractOrderDao.updateBillContractOrder", bco);
    }

    @Override
    public List<ContractOrderVo> queryInitTotalPaymentOrder() {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillContractOrderDao.queryInitTotalPaymentOrder");
    }

    @Override
    public List<ContractOrderVo> queryInitOverDueDayOrder() {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillContractOrderDao.queryInitOverDueDayOrder");
    }

    @Override
    public List<ContractOrderVo> queryBillContractOrderListApp(ContractOrderVo billContractOrderVo) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillContractOrderDao.queryBillContractOrderListApp", billContractOrderVo);
    }

    @Override
    public int updateBillContractOrderState(ContractOrderVo bco) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.BillContractOrderDao.updateBillContractOrderState", bco);
    }

    @Override
    public ContractOrderVo selectContractOrder(ContractOrderVo billContractOrderVo) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BillContractOrderDao.selectContractOrder", billContractOrderVo);
    }

    @Override
    public int updateContractOrderState(ContractOrderVo bco) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.BillContractOrderDao.updateContractOrderState", bco);
    }

    @Override
    public int queryFinanceBillForMinCycle(ContractBillVo contractBillVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BillContractOrderDao.queryFinanceBillForMinCycle", contractBillVo);
    }
}
