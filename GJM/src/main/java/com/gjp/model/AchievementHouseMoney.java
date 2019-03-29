package com.gjp.model;

import java.util.Date;

/**
 * 房屋业绩
 *
 * @author 陈智颖
 * @create 2017-08-10 4:39 PM
 **/
public class AchievementHouseMoney {

    // 房屋营收编码
    private Integer ahm_id;
    // 直接收入租金差价
    private Double ahm_directRent;
    // 间接收入租金差价
    private Double ahm_synopsisRent;
    // 直接收入空置盈亏(免租期、招租期天数)
    private Double ahm_directVacant;
    // 间接收入空置期盈亏(免租期、招租期天数)
    private Double ahm_synopsisVacant;
    // 服务费用
    private Double ahm_serviceMoney;
    // 保洁费
    private Double ahm_clearServiceMoney;
    // 维修费用
    private Double ahm_repairMoney;
    // 违约金
    private Double ahm_penalty;
    // 转租费用
    private Double ahm_subletMoney;
    // 物管费
    private Double ahm_wuguanMoney;
    // 房屋水费
    private Double ahm_waterMoney;
    // 电费
    private Double ahm_electricMoney;
    // 气费
    private Double ahm_gasMoney;
    // 直接合作费
    private Double ahm_directCooperateMoney;
    // 间接合作费
    private Double ahm_synosisCooperateMoney;
    // 管理费
    private Double ahm_manageMoney;
    // 免租期
    private Double ahm_forRentMoney;
    // 招租期金额
    private Double ahm_freeMoney;
    // 直接出房提成
    private Double ahm_directOutHouseMoney;
    // 间接出房提成
    private Double ahm_synopsisOutHouseMoney;
    // 保险
    private Double ahm_insurance;
    // 经营费
    private Double ahm_operateMoney;
    // 7月份招租期亏损
    private Double ahm_julyOldMoney;
    // 房屋code
    private String hi_code;
    // 部门编码
    private Integer ucc_id;
    // 创建时间
    private Date ahm_date;
    // 合同开始时间
    private Date contractObject_Date;
    // 合同结束时间
    private Date contractObject_DeadlineTime;
    // 合同编码
    private String contractObject_Code;
    // 提取时间
    private Date extractDate;
    // 是否提取
    private int extractBool;
    // 公司管理费
    private Double ahm_gsmanageMoney;

    public Integer getAhm_id() {
        return ahm_id;
    }

    public void setAhm_id(Integer ahm_id) {
        this.ahm_id = ahm_id;
    }

    public Double getAhm_directRent() {
        return ahm_directRent;
    }

    public void setAhm_directRent(Double ahm_directRent) {
        this.ahm_directRent = ahm_directRent;
    }

    public Double getAhm_synopsisRent() {
        return ahm_synopsisRent;
    }

    public void setAhm_synopsisRent(Double ahm_synopsisRent) {
        this.ahm_synopsisRent = ahm_synopsisRent;
    }

    public Double getAhm_directVacant() {
        return ahm_directVacant;
    }

    public void setAhm_directVacant(Double ahm_directVacant) {
        this.ahm_directVacant = ahm_directVacant;
    }

    public Double getAhm_synopsisVacant() {
        return ahm_synopsisVacant;
    }

    public void setAhm_synopsisVacant(Double ahm_synopsisVacant) {
        this.ahm_synopsisVacant = ahm_synopsisVacant;
    }

    public Double getAhm_serviceMoney() {
        return ahm_serviceMoney;
    }

    public void setAhm_serviceMoney(Double ahm_serviceMoney) {
        this.ahm_serviceMoney = ahm_serviceMoney;
    }

    public Double getAhm_clearServiceMoney() {
        return ahm_clearServiceMoney;
    }

    public void setAhm_clearServiceMoney(Double ahm_clearServiceMoney) {
        this.ahm_clearServiceMoney = ahm_clearServiceMoney;
    }

    public Double getAhm_repairMoney() {
        return ahm_repairMoney;
    }

    public void setAhm_repairMoney(Double ahm_repairMoney) {
        this.ahm_repairMoney = ahm_repairMoney;
    }

    public Double getAhm_penalty() {
        return ahm_penalty;
    }

    public void setAhm_penalty(Double ahm_penalty) {
        this.ahm_penalty = ahm_penalty;
    }

    public Double getAhm_subletMoney() {
        return ahm_subletMoney;
    }

    public void setAhm_subletMoney(Double ahm_subletMoney) {
        this.ahm_subletMoney = ahm_subletMoney;
    }

    public Double getAhm_wuguanMoney() {
        return ahm_wuguanMoney;
    }

    public void setAhm_wuguanMoney(Double ahm_wuguanMoney) {
        this.ahm_wuguanMoney = ahm_wuguanMoney;
    }

    public Double getAhm_waterMoney() {
        return ahm_waterMoney;
    }

    public void setAhm_waterMoney(Double ahm_waterMoney) {
        this.ahm_waterMoney = ahm_waterMoney;
    }

    public Double getAhm_electricMoney() {
        return ahm_electricMoney;
    }

    public void setAhm_electricMoney(Double ahm_electricMoney) {
        this.ahm_electricMoney = ahm_electricMoney;
    }

    public Double getAhm_gasMoney() {
        return ahm_gasMoney;
    }

    public void setAhm_gasMoney(Double ahm_gasMoney) {
        this.ahm_gasMoney = ahm_gasMoney;
    }

    public Double getAhm_directCooperateMoney() {
        return ahm_directCooperateMoney;
    }

    public void setAhm_directCooperateMoney(Double ahm_directCooperateMoney) {
        this.ahm_directCooperateMoney = ahm_directCooperateMoney;
    }

    public Double getAhm_synosisCooperateMoney() {
        return ahm_synosisCooperateMoney;
    }

    public void setAhm_synosisCooperateMoney(Double ahm_synosisCooperateMoney) {
        this.ahm_synosisCooperateMoney = ahm_synosisCooperateMoney;
    }

    public Double getAhm_manageMoney() {
        return ahm_manageMoney;
    }

    public void setAhm_manageMoney(Double ahm_manageMoney) {
        this.ahm_manageMoney = ahm_manageMoney;
    }

    public Double getAhm_forRentMoney() {
        return ahm_forRentMoney;
    }

    public void setAhm_forRentMoney(Double ahm_forRentMoney) {
        this.ahm_forRentMoney = ahm_forRentMoney;
    }

    public Double getAhm_freeMoney() {
        return ahm_freeMoney;
    }

    public void setAhm_freeMoney(Double ahm_freeMoney) {
        this.ahm_freeMoney = ahm_freeMoney;
    }

    public Double getAhm_directOutHouseMoney() {
        return ahm_directOutHouseMoney;
    }

    public void setAhm_directOutHouseMoney(Double ahm_directOutHouseMoney) {
        this.ahm_directOutHouseMoney = ahm_directOutHouseMoney;
    }

    public Double getAhm_synopsisOutHouseMoney() {
        return ahm_synopsisOutHouseMoney;
    }

    public void setAhm_synopsisOutHouseMoney(Double ahm_synopsisOutHouseMoney) {
        this.ahm_synopsisOutHouseMoney = ahm_synopsisOutHouseMoney;
    }

    public Double getAhm_insurance() {
        return ahm_insurance;
    }

    public void setAhm_insurance(Double ahm_insurance) {
        this.ahm_insurance = ahm_insurance;
    }

    public Double getAhm_operateMoney() {
        return ahm_operateMoney;
    }

    public void setAhm_operateMoney(Double ahm_operateMoney) {
        this.ahm_operateMoney = ahm_operateMoney;
    }

    public Double getAhm_julyOldMoney() {
        return ahm_julyOldMoney;
    }

    public void setAhm_julyOldMoney(Double ahm_julyOldMoney) {
        this.ahm_julyOldMoney = ahm_julyOldMoney;
    }

    public String getHi_code() {
        return hi_code;
    }

    public void setHi_code(String hi_code) {
        this.hi_code = hi_code;
    }

    public Integer getUcc_id() {
        return ucc_id;
    }

    public void setUcc_id(Integer ucc_id) {
        this.ucc_id = ucc_id;
    }

    public Date getAhm_date() {
        return ahm_date;
    }

    public void setAhm_date(Date ahm_date) {
        this.ahm_date = ahm_date;
    }

    public Date getContractObject_Date() {
        return contractObject_Date;
    }

    public void setContractObject_Date(Date contractObject_Date) {
        this.contractObject_Date = contractObject_Date;
    }

    public Date getContractObject_DeadlineTime() {
        return contractObject_DeadlineTime;
    }

    public void setContractObject_DeadlineTime(Date contractObject_DeadlineTime) {
        this.contractObject_DeadlineTime = contractObject_DeadlineTime;
    }

    public String getContractObject_Code() {
        return contractObject_Code;
    }

    public void setContractObject_Code(String contractObject_Code) {
        this.contractObject_Code = contractObject_Code;
    }

    public Date getExtractDate() {
        return extractDate;
    }

    public void setExtractDate(Date extractDate) {
        this.extractDate = extractDate;
    }

    public int getExtractBool() {
        return extractBool;
    }

    public void setExtractBool(int extractBool) {
        this.extractBool = extractBool;
    }

    public Double getAhm_gsmanageMoney() {
        return ahm_gsmanageMoney;
    }

    public void setAhm_gsmanageMoney(Double ahm_gsmanageMoney) {
        this.ahm_gsmanageMoney = ahm_gsmanageMoney;
    }
}
