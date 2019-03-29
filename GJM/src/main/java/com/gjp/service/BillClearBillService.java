package com.gjp.service;

import com.gjp.dao.BillClearBillDAO;
import com.gjp.model.BillClearBill;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2015年12月6日 下午2:44:05 
 */
@Service
public class BillClearBillService {

	@Resource
	private  BillClearBillDAO billClearBillDAO;
	
	/**
	 * 插入保洁账单
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer addBillClearBill(BillClearBill billClearBill){
		return billClearBillDAO.addBillClearBill(billClearBill);
	}
	
	/**
	 * 查询保洁账单带保洁次数
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	public BillClearBill selectBillClearBill(BillClearBill billClearBill){
		return billClearBillDAO.selectBillClearBill(billClearBill);
	}
	
	/**
	 * 查询是否还有未处理完成的保洁
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	public BillClearBill selectBillClearBillBool(BillClearBill billClearBill){
		return billClearBillDAO.selectBillClearBillBool(billClearBill);
	}
	
	/**
	 * 查询第一个待服务
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	public BillClearBill selectBillClearBillFirst(BillClearBill billClearBill){
		return billClearBillDAO.selectBillClearBillFirst(billClearBill);
	}
	
	/**
	 * 更新托管账单状态
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer updateBillClearBill(BillClearBill billClearBill){
		return billClearBillDAO.updateBillClearBill(billClearBill);
	}
	
	/**
	 * 修改账单金额
	 * 
	 * @param billClearBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer updateBillClearBillMoney(BillClearBill billClearBill){
		return billClearBillDAO.updateBillClearBillMoney(billClearBill);
	}
}
