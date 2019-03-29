package com.gjp.dao;

import com.gjp.model.HousePriceRecordVo;
import com.gjp.model.PayFlowStatementValidRecord;
import com.gjp.model.RecordContractOrderAuditingVo;

import java.util.List;

public interface RecordDao {

    /**
     * 添加合约订单记录
     *
     * @param audtingVo
     * @return
     */
    int addContractOrderAudtingRecord(RecordContractOrderAuditingVo audtingVo);

    /**
     * 查询合约订单审核记录
     *
     * @param audtingVo
     * @return
     */
    List<RecordContractOrderAuditingVo> queryContractOrderRecordList(RecordContractOrderAuditingVo audtingVo);

    /**
     * 添加房源定价记录
     *
     * @param priceRecordVo
     * @return
     */
    int addHousePriceRecord(HousePriceRecordVo priceRecordVo);

    /**
     * 查询房源定价记录
     *
     * @param priceRecordVo
     * @return
     */
    List<HousePriceRecordVo> queryHousePriceRecord(HousePriceRecordVo priceRecordVo);

    /**
     * 添加流水核销记录
     *
     * @param payFlowStatementValidRecord
     * @return
     */
    int addPayFlowStatementValidRecord(PayFlowStatementValidRecord payFlowStatementValidRecord);

    /**
     * 查询流水核销记录
     *
     * @param flowStatementValidRecord
     * @return
     */
    List<PayFlowStatementValidRecord> queryPayFlowStatementValidRecord(PayFlowStatementValidRecord flowStatementValidRecord);
}
