package com.gjp.service;

import com.gjp.dao.BillPartnersDao;
import com.gjp.model.BillPartners;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 合作伙伴service
 * 
 * @author zoe
 *
 */
@Service
public class BillPartnersService {
	
	
	@Resource
	private BillPartnersDao billPartnersDao;


	/**
	 * 查询合作伙伴List
	 * @param pageNo
	 * @param cookies
	 * @return
	 */
	public PageModel<BillPartners> selectBillPartners(PageModel<BillPartners> pageModel) {
		return billPartnersDao.selectBillPartners(pageModel);
	}


	/**
	 * 添加合作伙伴
	 * @param billPartners
	 * @return
	 */
	public int addBillPartners(BillPartners billPartners) {
		return billPartnersDao.addBillPartners(billPartners);
	}


	/**
	 * 
	 * 根据编号查询合作伙伴
	 * @param parseInt
	 * @return
	 */
	public BillPartners selectBillPartnersById(int bp_id) {
		return billPartnersDao.selectBillPartnersById(bp_id);
	}


	/**
	 *  修改合作伙伴
	 * @param billPartners
	 * @return
	 */
	public int updataBillPartners(BillPartners billPartners) {
		return billPartnersDao.updataBillPartners(billPartners);
	}


	/**
	 * 查询合作伙伴List
	 * @author zoe
	 * @return
	 */
	public List<BillPartners> selectTo_people() {
		return billPartnersDao.selectTo_people();
	}

	/**
	 * 查询是否自持代偿
	 * 
	 * @param bp_name
	 * @return
	 * @author 王孝元
	 */
	public boolean queryIsRepayByPartnerName(String bp_name){
		BillPartners partner = new BillPartners();
		partner.setBp_name(bp_name);
		BillPartners bp = billPartnersDao.queryBillPartnersByProperty(partner);
		if(bp !=null && bp.getBpe_isRepay() == 1){
			return true;
		}
		return false;
	}
	
	/**
	 * 查询服务费率
	 * 
	 * @param bp_name
	 * @param month
	 * @return
	 * @author 王孝元
	 */
	public Double queryServiceRateByPartnerName(String bp_name,Integer month){
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("bp_name", bp_name);
		param.put("bpsr_month", month);
		return billPartnersDao.queryServiceRateByPartnerName(param);
	}
	
	/**
	 * 查询违约金比率
	 * 
	 * @param bp_name
	 * @return
	 * @author 王孝元
	 */
	public Double queryDeditByPartnerName(String bp_name){
		BillPartners partner = new BillPartners();
		partner.setBp_name(bp_name);
		BillPartners bp = billPartnersDao.queryBillPartnersByProperty(partner);
		return bp.getBpe_dedit();
	}
}
