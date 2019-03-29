package com.gjp.model;

import java.util.Date;
import java.util.List;

/**
 * 业绩账单
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年5月20日 上午10:25:31
 */
public class AchievementBill {

	// 业绩账单编码
	private Integer ab_id;
	// 总业绩编码
	private Integer sa_id;
	// 房屋编码
	private String hi_code;
	// 内部人员编码
	private Integer em_id;
	// 提取方式
	private String ab_type;
	// 提取周期数
	private Integer ab_num;
	// 业绩类型
	private String ab_acType;
	// 旧业绩金额
	private double ab_oldMoney;
	// 新业绩金额
	private double ab_newMoney;
	// 业绩提成比例 百分之多少
	private double ab_moneyPercentage;
	// 付款方式
	private String ab_moneyType;
	// 0 ：没提取 1：已提取
	private Integer ab_payState;
	// 应提时间
	private Date ab_payTime;
	// 1：存房 2：出房
	private Integer ab_ctype;
	// 合同编码
	private Integer contractObject_Id;
	// 亏损天数
	private Double ab_lossDay;
	// 亏损金额
	private double ab_lossMoney;
	// 部门ID
	private Integer ucc_id;
	// 内部人员
	private String em_name;
	// 补贴业绩
	private double subsidy;
	// 补贴总业绩
	private double subsidySum;
	// 免租期天数
	private double ab_forRentDay;
	// 招租期天数
	private Double ab_freeDay;
	// 存房包修费
	private double sa_tRepairMoney;
	// 出房包修费
	private Double sa_zRepairMoney;

	// -- 扩展1 --

	// 开始日期
	private Date sa_startDate;
	// 结束日期
	private Date sa_endDate;
	// 总业绩
	private double ab_sumMoney;
	// 物业名称
	private String propertyInfo_Name;
	// 房屋id
	private Integer hi_id;
	// 房屋地址
	private String hi_address;
	// 管家电话
	private String em_phone;
	// 合同起止时间
	private String contractBody_StartToEnd;
	// 合同金额
	private String contractBody_Rent;

	// 正旧业绩
	private double oldMoney;
	// 正新业绩
	private double newMoney;
	// 正总业绩
	private double sumMoney;

	// 亏损总业绩
	private double lossHouseCount;
	// 亏损总业绩
	private double lossSumMoney;

	// -- 扩展2 --
	private List<AchievementBill> achievementBillList;

	public Integer getAb_id() {
		return ab_id;
	}

	public void setAb_id(Integer ab_id) {
		this.ab_id = ab_id;
	}

	public Integer getSa_id() {
		return sa_id;
	}

	public void setSa_id(Integer sa_id) {
		this.sa_id = sa_id;
	}

	public String getHi_code() {
		return hi_code;
	}

	public void setHi_code(String hi_code) {
		this.hi_code = hi_code;
	}

	public Integer getEm_id() {
		return em_id;
	}

	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}

	public String getAb_type() {
		return ab_type;
	}

	public void setAb_type(String ab_type) {
		this.ab_type = ab_type;
	}

	public Integer getAb_num() {
		return ab_num;
	}

	public void setAb_num(Integer ab_num) {
		this.ab_num = ab_num;
	}

	public String getAb_acType() {
		return ab_acType;
	}

	public void setAb_acType(String ab_acType) {
		this.ab_acType = ab_acType;
	}

	public double getAb_oldMoney() {
		return ab_oldMoney;
	}

	public void setAb_oldMoney(double ab_oldMoney) {
		this.ab_oldMoney = ab_oldMoney;
	}

	public double getAb_newMoney() {
		return ab_newMoney;
	}

	public void setAb_newMoney(double ab_newMoney) {
		this.ab_newMoney = ab_newMoney;
	}

	public double getAb_moneyPercentage() {
		return ab_moneyPercentage;
	}

	public void setAb_moneyPercentage(double ab_moneyPercentage) {
		this.ab_moneyPercentage = ab_moneyPercentage;
	}

	public String getAb_moneyType() {
		return ab_moneyType;
	}

	public void setAb_moneyType(String ab_moneyType) {
		this.ab_moneyType = ab_moneyType;
	}

	public Integer getAb_payState() {
		return ab_payState;
	}

	public void setAb_payState(Integer ab_payState) {
		this.ab_payState = ab_payState;
	}

	public Date getAb_payTime() {
		return ab_payTime;
	}

	public void setAb_payTime(Date ab_payTime) {
		this.ab_payTime = ab_payTime;
	}

	public Integer getAb_ctype() {
		return ab_ctype;
	}

	public void setAb_ctype(Integer ab_ctype) {
		this.ab_ctype = ab_ctype;
	}

	public Integer getContractObject_Id() {
		return contractObject_Id;
	}

	public void setContractObject_Id(Integer contractObject_Id) {
		this.contractObject_Id = contractObject_Id;
	}

	public Double getAb_lossDay() {
		return ab_lossDay;
	}

	public void setAb_lossDay(Double ab_lossDay) {
		this.ab_lossDay = ab_lossDay;
	}

	public double getAb_lossMoney() {
		return ab_lossMoney;
	}

	public void setAb_lossMoney(double ab_lossMoney) {
		this.ab_lossMoney = ab_lossMoney;
	}

	public Integer getUcc_id() {
		return ucc_id;
	}

	public void setUcc_id(Integer ucc_id) {
		this.ucc_id = ucc_id;
	}

	public String getEm_name() {
		return em_name;
	}

	public void setEm_name(String em_name) {
		this.em_name = em_name;
	}

	public double getSubsidy() {
		return subsidy;
	}

	public void setSubsidy(double subsidy) {
		this.subsidy = subsidy;
	}

	public double getSubsidySum() {
		return subsidySum;
	}

	public void setSubsidySum(double subsidySum) {
		this.subsidySum = subsidySum;
	}

	public double getAb_forRentDay() {
		return ab_forRentDay;
	}

	public void setAb_forRentDay(double ab_forRentDay) {
		this.ab_forRentDay = ab_forRentDay;
	}

	public Double getAb_freeDay() {
		return ab_freeDay;
	}

	public void setAb_freeDay(Double ab_freeDay) {
		this.ab_freeDay = ab_freeDay;
	}

	public Date getSa_startDate() {
		return sa_startDate;
	}

	public void setSa_startDate(Date sa_startDate) {
		this.sa_startDate = sa_startDate;
	}

	public Date getSa_endDate() {
		return sa_endDate;
	}

	public void setSa_endDate(Date sa_endDate) {
		this.sa_endDate = sa_endDate;
	}

	public double getAb_sumMoney() {
		return ab_sumMoney;
	}

	public void setAb_sumMoney(double ab_sumMoney) {
		this.ab_sumMoney = ab_sumMoney;
	}

	public String getPropertyInfo_Name() {
		return propertyInfo_Name;
	}

	public void setPropertyInfo_Name(String propertyInfo_Name) {
		this.propertyInfo_Name = propertyInfo_Name;
	}

	public Integer getHi_id() {
		return hi_id;
	}

	public void setHi_id(Integer hi_id) {
		this.hi_id = hi_id;
	}

	public String getHi_address() {
		return hi_address;
	}

	public void setHi_address(String hi_address) {
		this.hi_address = hi_address;
	}

	public String getEm_phone() {
		return em_phone;
	}

	public void setEm_phone(String em_phone) {
		this.em_phone = em_phone;
	}

	public String getContractBody_StartToEnd() {
		return contractBody_StartToEnd;
	}

	public void setContractBody_StartToEnd(String contractBody_StartToEnd) {
		this.contractBody_StartToEnd = contractBody_StartToEnd;
	}

	public String getContractBody_Rent() {
		return contractBody_Rent;
	}

	public void setContractBody_Rent(String contractBody_Rent) {
		this.contractBody_Rent = contractBody_Rent;
	}

	public double getOldMoney() {
		return oldMoney;
	}

	public void setOldMoney(double oldMoney) {
		this.oldMoney = oldMoney;
	}

	public double getNewMoney() {
		return newMoney;
	}

	public void setNewMoney(double newMoney) {
		this.newMoney = newMoney;
	}

	public double getSumMoney() {
		return sumMoney;
	}

	public void setSumMoney(double sumMoney) {
		this.sumMoney = sumMoney;
	}

	public double getLossHouseCount() {
		return lossHouseCount;
	}

	public void setLossHouseCount(double lossHouseCount) {
		this.lossHouseCount = lossHouseCount;
	}

	public double getLossSumMoney() {
		return lossSumMoney;
	}

	public void setLossSumMoney(double lossSumMoney) {
		this.lossSumMoney = lossSumMoney;
	}

	public List<AchievementBill> getAchievementBillList() {
		return achievementBillList;
	}

	public void setAchievementBillList(List<AchievementBill> achievementBillList) {
		this.achievementBillList = achievementBillList;
	}

	public double getSa_tRepairMoney() {
		return sa_tRepairMoney;
	}

	public void setSa_tRepairMoney(double sa_tRepairMoney) {
		this.sa_tRepairMoney = sa_tRepairMoney;
	}

	public Double getSa_zRepairMoney() {
		return sa_zRepairMoney;
	}

	public void setSa_zRepairMoney(Double sa_zRepairMoney) {
		this.sa_zRepairMoney = sa_zRepairMoney;
	}

}
