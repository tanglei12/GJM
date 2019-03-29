package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.RecordDao;
import com.gjp.model.HousePriceRecordVo;
import com.gjp.model.PayFlowStatementValidRecord;
import com.gjp.model.RecordContractOrderAuditingVo;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RecordDaoImpl extends BaseDAO implements RecordDao {

    @Override
    public int addContractOrderAudtingRecord(RecordContractOrderAuditingVo audtingVo) {
        return sqlSessionTemplateJournal.insert("com.gjp.dao.RecordDao.addContractOrderAudtingRecord", audtingVo);
    }

    @Override
    public List<RecordContractOrderAuditingVo> queryContractOrderRecordList(RecordContractOrderAuditingVo audtingVo) {
        return sqlSessionTemplateJournal.selectList("com.gjp.dao.RecordDao.queryContractOrderRecordList", audtingVo);
    }

    @Override
    public int addHousePriceRecord(HousePriceRecordVo priceRecordVo) {
        return sqlSessionTemplateJournal.insert("com.gjp.dao.RecordDao.addHousePriceRecord", priceRecordVo);
    }

    @Override
    public List<HousePriceRecordVo> queryHousePriceRecord(HousePriceRecordVo priceRecordVo) {
        return sqlSessionTemplateJournal.selectList("com.gjp.dao.RecordDao.queryHousePriceRecord", priceRecordVo);
    }

    @Override
    public int addPayFlowStatementValidRecord(PayFlowStatementValidRecord payFlowStatementValidRecord) {
        return sqlSessionTemplateJournal.insert("com.gjp.dao.RecordDao.addPayFlowStatementValidRecord", payFlowStatementValidRecord);
    }

    @Override
    public List<PayFlowStatementValidRecord> queryPayFlowStatementValidRecord(PayFlowStatementValidRecord flowStatementValidRecord) {
        return sqlSessionTemplateJournal.selectList("com.gjp.dao.RecordDao.queryPayFlowStatementValidRecord", flowStatementValidRecord);
    }

}
