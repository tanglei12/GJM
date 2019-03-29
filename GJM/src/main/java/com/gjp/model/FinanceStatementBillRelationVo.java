package com.gjp.model;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 流水账单关联表
 *
 * @author JiangQt
 * @version 2017年6月6日下午4:16:40
 */
public class FinanceStatementBillRelationVo {

    // 流水关联编码
    private Integer sbr_id;
    // 支付流水号
    private String bs_serialNumber;
    // 账单号
    private String bcb_code;
    // 支付金额
    private BigDecimal sbr_money;
    // 状态
    private Integer sbr_state;
    // 创建时间
    private Date sbr_createTime;

    public Integer getSbr_id() {
        return sbr_id;
    }

    public void setSbr_id(Integer sbr_id) {
        this.sbr_id = sbr_id;
    }

    public String getBs_serialNumber() {
        return bs_serialNumber;
    }

    public void setBs_serialNumber(String bs_serialNumber) {
        this.bs_serialNumber = bs_serialNumber;
    }

    public String getBcb_code() {
        return bcb_code;
    }

    public void setBcb_code(String bcb_code) {
        this.bcb_code = bcb_code;
    }

    public BigDecimal getSbr_money() {
        return sbr_money;
    }

    public void setSbr_money(BigDecimal sbr_money) {
        this.sbr_money = sbr_money;
    }

    public Date getSbr_createTime() {
        return sbr_createTime;
    }

    public void setSbr_createTime(Date sbr_createTime) {
        this.sbr_createTime = sbr_createTime;
    }

    public Integer getSbr_state() {
        return sbr_state;
    }

    public void setSbr_state(Integer sbr_state) {
        this.sbr_state = sbr_state;
    }
}
