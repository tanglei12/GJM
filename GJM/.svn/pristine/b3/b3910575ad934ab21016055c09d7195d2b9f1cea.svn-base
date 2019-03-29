package com.gjp.dao.impl;


import com.gjp.dao.BaseDAO;
import com.gjp.dao.BillPartnersDao;
import com.gjp.model.BillPartners;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 合作伙伴ImplDao
 * @author 陈智颖
 *
 */
@Repository
public class BillPartnersDaoImpl extends BaseDAO implements BillPartnersDao {



	@Override
	public PageModel<BillPartners> selectBillPartners(PageModel<BillPartners> pageModel) {
		
		List<BillPartners> billPartners = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillPartnersDao.selectBillPartners", pageModel);
		int totalRecords = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BillPartnersDao.selectBillPartnersTotal", pageModel);
		pageModel.setList(billPartners);
		pageModel.setTotalRecords(totalRecords);
		
		return pageModel;
	}

	@Override
	public int addBillPartners(BillPartners billPartners) {
		
		return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.BillPartnersDao.addBillPartners",billPartners);
	}

	@Override
	public BillPartners selectBillPartnersById(int bp_id) {
		return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BillPartnersDao.selectBillPartnersById",bp_id);
	}

	@Override
	public int updataBillPartners(BillPartners billPartners) {
		return super.sqlSessionTemplateBusiness.update("com.gjp.dao.BillPartnersDao.updataBillPartners",billPartners);
	}

	@Override
	public List<BillPartners> selectTo_people() {
		return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillPartnersDao.selectTo_people");
	}

	@Override
	public BillPartners queryBillPartnersByProperty(BillPartners bp) {
		return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BillPartnersDao.queryBillPartnersByProperty",bp);
	}

	@Override
	public Double queryServiceRateByPartnerName(Map<String, Object> param) {
		return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.BillPartnersDao.queryServiceRateByPartnerName",param);
	}

	
}
