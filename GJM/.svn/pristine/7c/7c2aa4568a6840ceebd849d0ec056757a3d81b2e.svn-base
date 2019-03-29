package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.BillPartnerBillDao;
import com.gjp.model.BillPartnerBill;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 
 * @author 王孝元
 * @version 创建时间：2016年12月9日 上午9:39:08
 * 
 */
@Repository
public class BillPartnerBillDaoImpl extends BaseDAO implements BillPartnerBillDao {

	@Override
	public int addBillPartnerBill(BillPartnerBill bpb) {
		return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.BillPartnerBillDao.addBillPartnerBill", bpb);
	}

	@Override
	public int updateBillPartnerBill(BillPartnerBill bpb) {
		return super.sqlSessionTemplateBusiness.update("com.gjp.dao.BillPartnerBillDao.updateBillPartnerBill", bpb);
	}

	@Override
	public BillPartnerBill queryBillPartnerBillById(Integer bpb_id) {
		return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BillPartnerBillDao.queryBillPartnerBillById", bpb_id);
	}

	@Override
	public int deleteBillPartnerBill(Integer bpb_id) {
		return super.sqlSessionTemplateBusiness.delete("com.gjp.dao.BillPartnerBillDao.deleteBillPartnerBill", bpb_id);
	}
	@Override
	public int deleteBillPartnerBillByOrderCode(String bco_code) {
		return super.sqlSessionTemplateBusiness.delete("com.gjp.dao.BillPartnerBillDao.deleteBillPartnerBillByOrderCode", bco_code);
	}

	@Override
	public List<BillPartnerBill> queryPartnerBillsByOrderCode(String bco_code) {
		return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillPartnerBillDao.queryPartnerBillsByOrderCode", bco_code);
	}

	@Override
	public Integer queryMaxCycleByOrderCode(String bco_code) {
		return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BillPartnerBillDao.queryMaxCycleByOrderCode", bco_code);
	}	
}
