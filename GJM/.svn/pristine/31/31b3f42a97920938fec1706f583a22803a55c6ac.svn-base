package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.BillApprovalRecordDao;
import com.gjp.model.BillApprovalRecord;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class BillApprovalRecordDaoImpl extends BaseDAO implements BillApprovalRecordDao {

	@Override
	public List<Map<String,Object>> selectApprovalList(BillApprovalRecord billApprovalRecord) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.BillApprovalRecordDao.selectApprovalList", billApprovalRecord);
	}

	@Override
	public int addApprovalRecord(BillApprovalRecord billApprovalRecord) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.BillApprovalRecordDao.addApprovalRecord", billApprovalRecord);
	}

}
