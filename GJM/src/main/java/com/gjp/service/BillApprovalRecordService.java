package com.gjp.service;

import com.gjp.dao.BillApprovalRecordDao;
import com.gjp.model.BillApprovalRecord;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * 审批记录
 * @author tanglei
 */
@Service
public class BillApprovalRecordService {
	@Resource
	private BillApprovalRecordDao billApprovalRecordDao;
	
	/**
	 * 查询记录
	 * @author tanglei
	 */
	public List<Map<String,Object>> selectApprovalList (BillApprovalRecord billApprovalRecord) {
		return billApprovalRecordDao.selectApprovalList(billApprovalRecord);
	}
	
	/**
	 * 查询
	 * @author tanglei
	 */
	public boolean addApprovalRecord (BillApprovalRecord billApprovalRecord) {
		return billApprovalRecordDao.addApprovalRecord(billApprovalRecord) >0 ;
	}

}
