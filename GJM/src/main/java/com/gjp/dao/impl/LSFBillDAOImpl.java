package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.LSFBillDAO;
import com.gjp.model.LSFBill;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 
 * 乐首付账单
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2015年8月12日 下午5:51:08 
 */
@Repository
public class LSFBillDAOImpl extends BaseDAO implements LSFBillDAO{

	@Override
	public Integer addLSFBill(LSFBill lsfBill) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.LSFBillDAO.addLSFBill",lsfBill);
	}

	@Override
	public List<LSFBill> selectLSFBillNow() {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.LSFBillDAO.selectLSFBillNow");
	}

	@Override
	public List<LSFBill> selectLSFBillBool(LSFBill lsfBill) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.LSFBillDAO.selectLSFBillBool",lsfBill);
	}

	@Override
	public List<LSFBill> selectLSFBillType(LSFBill lsfBill) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.LSFBillDAO.selectLSFBillType",lsfBill);
	}

}
