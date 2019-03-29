package com.gjp.service;

import com.gjp.dao.LSFBillDAO;
import com.gjp.model.LSFBill;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 乐首付账单
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2015年8月12日 下午5:53:00 
 */
@Service
public class LSFBillService {

	@Resource
	private LSFBillDAO lsfBillDAO;
	
	/**
	 * 添加乐首付账单
	 * 
	 * @param lsfBill
	 * @return
	 */
	public Integer addLSFBill(LSFBill lsfBill){
		return lsfBillDAO.addLSFBill(lsfBill);
	}
	
	/**
	 * 查询账单最新一条数据时间
	 * 
	 * @return
	 */
	public List<LSFBill> selectLSFBillNow(){
		return lsfBillDAO.selectLSFBillNow();
	}
	
	/**
	 * 查询账单是否存在
	 * 
	 * @return
	 */
	public List<LSFBill> selectLSFBillBool(LSFBill lsfBill){
		return lsfBillDAO.selectLSFBillBool(lsfBill);
	}
	
	/**
	 * 查询账单支付方式和支付时间
	 * 
	 * @return
	 */
	public List<LSFBill> selectLSFBillType(LSFBill lsfBill){
		return lsfBillDAO.selectLSFBillType(lsfBill);
	}

}
