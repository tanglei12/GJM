package com.gjp.dao;

import com.gjp.model.BillPartnerBill;

import java.util.List;

/**
 * 金融账单
 * 
 * @author 王孝元
 *
 * @version 创建时间：2016年12月9日 上午9:35:40
 */
public interface BillPartnerBillDao {

	/**
	 * 新增金融账单
	 * 
	 * @param bpb
	 * @return
	 * @author 王孝元
	 */
	int addBillPartnerBill(BillPartnerBill bpb);

	/**
	 * 修改金融账单
	 * 
	 * @param bpb
	 * @return
	 * @author 王孝元
	 */
	int updateBillPartnerBill(BillPartnerBill bpb);

	/**
	 * 跟据id查询金融账单
	 * 
	 * @param bpb_id
	 * @return
	 * @author 王孝元
	 */
	BillPartnerBill queryBillPartnerBillById(Integer bpb_id);

	/**
	 * 删除金融账单
	 * 
	 * @param bpb_id
	 * @return
	 * @author 王孝元
	 */
	int deleteBillPartnerBill(Integer bpb_id);
	
	/**
	 * 删除金融账单
	 * 
	 * @param bco_code
	 * @return
	 * @author 王孝元
	 */
	int deleteBillPartnerBillByOrderCode(String bco_code);
	
	/**
	 * 根据订单编号查询金融账单
	 * 
	 * @param bco_code
	 * @return
	 * @author 王孝元
	 */
	List<BillPartnerBill> queryPartnerBillsByOrderCode(String bco_code);
	
	/**
	 * 查询一个订单下最大期数
	 * 
	 * @param bco_code
	 * @return
	 * @author 王孝元
	 */
	Integer queryMaxCycleByOrderCode(String bco_code);
	
}
