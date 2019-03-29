package com.gjp.dao;


import com.gjp.model.BillPartners;
import com.gjp.util.PageModel;

import java.util.List;
import java.util.Map;

/**
 * 房屋扩展信息
 * @author zoe
 *
 */
public interface BillPartnersDao {

	/**
	 * 查询合作伙伴List
	 * @param pageNo
	 * @param cookies
	 * @return
	 */
	PageModel<BillPartners> selectBillPartners(PageModel<BillPartners> pageModel);

	/**
	 * 添加合作伙伴
	 * @param billPartners
	 * @return
	 */
	int addBillPartners(BillPartners billPartners);

	/**
	 * 根据编号查询合作伙伴
	 * @param bp_id
	 * @return
	 */
	BillPartners selectBillPartnersById(int bp_id);
	
	/**
	 *  根据属性查询合作伙伴
	 * @param bp
	 * @return
	 */
	BillPartners queryBillPartnersByProperty(BillPartners bp);

	/**
	 * 修改合作伙伴
	 * @param billPartners
	 * @return
	 */
	int updataBillPartners(BillPartners billPartners);

	/**
	 * 查询合作伙伴List
	 * @author zoe
	 * @return
	 */
	List<BillPartners> selectTo_people();

	/**
	 * 查询服务费率
	 * 
	 * @param param
	 * @return
	 * @author 王孝元
	 */
	Double queryServiceRateByPartnerName(Map<String,Object> param);

}
