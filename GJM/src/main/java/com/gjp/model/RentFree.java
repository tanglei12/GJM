package com.gjp.model;

import java.util.Date;

/**
 * @author 陈智颖
 * @create 2017-08-30 3:48 PM
 **/
public class RentFree {
    //
    private Integer prf_id;
    // 房源CODE
    private String hi_code;
    // 合同CODE
    private String con_code;
    // 免租期周期
    private Date prf_cycleDate;
    // 免租期天数
    private Double prf_cycleDay;
    // 管理费
    private Double prf_cycleMoney;
    // 扣除日期
    private Date prf_deductDate;
    // 扣除合同
    private String prf_deductCon;
    // 扣除状态(1：未扣除、2：已扣除、3：已作废)
    private Integer prf_deductState;
    // 创建时间
    private Date prf_creactTime;

    public Integer getPrf_id() {
        return prf_id;
    }

    public void setPrf_id(Integer prf_id) {
        this.prf_id = prf_id;
    }

    public String getHi_code() {
        return hi_code;
    }

    public void setHi_code(String hi_code) {
        this.hi_code = hi_code;
    }

    public String getCon_code() {
        return con_code;
    }

    public void setCon_code(String con_code) {
        this.con_code = con_code;
    }

    public Date getPrf_cycleDate() {
        return prf_cycleDate;
    }

    public void setPrf_cycleDate(Date prf_cycleDate) {
        this.prf_cycleDate = prf_cycleDate;
    }

    public Double getPrf_cycleDay() {
        return prf_cycleDay;
    }

    public void setPrf_cycleDay(Double prf_cycleDay) {
        this.prf_cycleDay = prf_cycleDay;
    }

    public Double getPrf_cycleMoney() {
        return prf_cycleMoney;
    }

    public void setPrf_cycleMoney(Double prf_cycleMoney) {
        this.prf_cycleMoney = prf_cycleMoney;
    }

    public Date getPrf_deductDate() {
        return prf_deductDate;
    }

    public void setPrf_deductDate(Date prf_deductDate) {
        this.prf_deductDate = prf_deductDate;
    }

    public String getPrf_deductCon() {
        return prf_deductCon;
    }

    public void setPrf_deductCon(String prf_deductCon) {
        this.prf_deductCon = prf_deductCon;
    }

    public Integer getPrf_deductState() {
        return prf_deductState;
    }

    public void setPrf_deductState(Integer prf_deductState) {
        this.prf_deductState = prf_deductState;
    }

    public Date getPrf_creactTime() {
        return prf_creactTime;
    }

    public void setPrf_creactTime(Date prf_creactTime) {
        this.prf_creactTime = prf_creactTime;
    }
}
