package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.BillContractBillDao;
import com.gjp.model.BillTypeVo;
import com.gjp.model.ContractBillVo;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 王孝元
 * @version 创建时间：2016年12月9日 上午9:39:08
 */
@Repository
public class BillContractBillDaoImpl extends BaseDAO implements BillContractBillDao {

    @Override
    public List<ContractBillVo> queryBillContractBillList(ContractBillVo contractBillVo) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillContractBillDao.queryBillContractBillList", contractBillVo);
    }

    @Override
    public List<BillTypeVo> queryBillTypeList() {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillContractBillDao.queryBillTypeList");
    }

    @Override
    public ContractBillVo queryBillContractBillById(Integer bcb_id) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BillContractBillDao.queryBillContractBillById", bcb_id);
    }

    @Override
    public int updateBillContractBill(ContractBillVo bcb) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.BillContractBillDao.updateBillContractBill", bcb);
    }

    @Override
    public List<ContractBillVo> queryNeedToRepays(ContractBillVo bcb) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillContractBillDao.queryNeedToRepays", bcb);
    }

    @Override
    public ContractBillVo queryBillContractBillByProperty(ContractBillVo bcb) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BillContractBillDao.queryBillContractBillByProperty", bcb);
    }

    @Override
    public List<ContractBillVo> queryBillContractBillListByProperty(ContractBillVo bcb) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillContractBillDao.queryBillContractBillByProperty", bcb);
    }

    @Override
    public int addBillContractBill(ContractBillVo bcb) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.BillContractBillDao.addBillContractBill", bcb);
    }

    @Override
    public int updateContractBill(ContractBillVo bcb) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.BillContractBillDao.updateFinanceBill", bcb);
    }

	@Override
	public List<ContractBillVo> selectBillContractBillCode(ContractBillVo financeBill) {
		return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillContractBillDao.selectBillContractBillCode", financeBill);
	}

    @Override
    public List<ContractBillVo> queryBillContractByConCode(String con_code) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillContractBillDao.queryBillContractByConCode", con_code);
    }

}
