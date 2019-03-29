package com.gjp.service;

import com.gjp.dao.RecordDao;
import com.gjp.model.HousePriceRecordVo;
import com.gjp.model.PayFlowStatementValidRecord;
import com.gjp.model.RecordContractOrderAuditingVo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class RecordService {

    private @Resource
    RecordDao recordDao;

    /**
     * 添加合约订单记录
     *
     * @param audtingVo
     * @return
     */
    public boolean addContractOrderAudtingRecord(RecordContractOrderAuditingVo audtingVo) {
        return recordDao.addContractOrderAudtingRecord(audtingVo) > 0;
    }

    /**
     * 查询合约订单审核记录
     *
     * @param audtingVo
     * @return
     */
    public List<RecordContractOrderAuditingVo> queryContractOrderRecordList(RecordContractOrderAuditingVo audtingVo) {
        return recordDao.queryContractOrderRecordList(audtingVo);
    }

    /**
     * 添加房源定价记录
     *
     * @param priceRecordVo
     * @return
     */
    public boolean addHousePriceRecord(HousePriceRecordVo priceRecordVo) {
        return recordDao.addHousePriceRecord(priceRecordVo) > 0;
    }

    /**
     * 查询房源定价记录
     *
     * @param priceRecordVo
     * @return
     */
    public List<HousePriceRecordVo> queryHousePriceRecord(HousePriceRecordVo priceRecordVo) {
        return recordDao.queryHousePriceRecord(priceRecordVo);
    }

    public boolean addPayFlowStatementValidRecord(PayFlowStatementValidRecord payFlowStatementValidRecord) {
        return recordDao.addPayFlowStatementValidRecord(payFlowStatementValidRecord) > 0;
    }

    public List<PayFlowStatementValidRecord> queryPayFlowStatementValidRecord(PayFlowStatementValidRecord flowStatementValidRecord) {
        return recordDao.queryPayFlowStatementValidRecord(flowStatementValidRecord);
    }
}
