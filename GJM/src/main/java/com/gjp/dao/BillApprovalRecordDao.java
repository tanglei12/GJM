package com.gjp.dao;

import com.gjp.model.BillApprovalRecord;

import java.util.List;
import java.util.Map;

public interface BillApprovalRecordDao {

    List<Map<String, Object>> selectApprovalList(BillApprovalRecord billApprovalRecord);

    int addApprovalRecord(BillApprovalRecord billApprovalRecord);

}
