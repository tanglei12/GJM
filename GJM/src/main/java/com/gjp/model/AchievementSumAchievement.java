package com.gjp.model;

import java.util.Date;
import java.util.List;

/**
 * 当前租赁合同总业绩
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年5月20日 上午10:32:05
 */
public class AchievementSumAchievement {

	// 总业绩编码
	private Integer sa_id;
	// 房屋编码
	private String hi_code;
	// 业绩类型 标识：新出房，转租，续约，转租+续约，......
	private String sa_type;
	// 旧业绩金额
	private double sa_oldMoney;
	// 新业绩金额
	private double sa_newMoney;
	// 业绩生成时间
	private Date sa_time;
	// 审核状态
	private Integer sa_auditState;
	// 审核状态
	private Integer sa_auditType;
	// 合同起始时间
	private String sa_startEndTime;
	// 托管合同时间段
	private String sa_tStartEndTime;
	// 总业绩
	private double sa_sumMoney;
	// 亏损天数
	private double sa_lossDay;
	// 亏损金额
	private double sa_lossMoney;
	// 物业名称
	private String propertyInfo_name;
	// 房号
	private String hi_address;
	// 部门编码逗号隔开
	private String sa_uccID;
	// 免租期天数
	private double sa_forRentDay;
	// 招租期天数
	private double sa_freeDay;
	// 招租期金额
	private double sa_freeMoney;
	// 开始时间
	private Date startDate;
	// 结束时间
	private Date endDate;
	// 存房价格
	private double sa_saveMoney;
	// 出房价格
	private double sa_outMoney;
	// 存房价格
	private double sa_saveMoney2;
	// 出房价格
	private double sa_outMoney2;
	// 房屋总营收
	private double sa_sumMoneyH;
	// 差价
	private double sa_difference;
	// 转租费
	private double sa_turnRentMoney;
	// 合同编码
	private Integer contractObject_Id;
	// 存房包修费
	private double sa_tRepairMoney;
	// 出房包修费
	private double sa_zRepairMoney;
	// 物品购置金额
	private double goodsMoney;
	// 租赁合作费
	private double sa_zworkMoney;
	// 托管合作费
	private double sa_tworkMoney;

	// 出房合同开始日期
	private Date sa_startDate;
	// 出房合同结束日期
	private Date sa_endDate;

	// ----扩展---------------
	// 调整业绩
	private double ar_money;
	// 调整说明
	private String ar_content;
	// 部门负责人
	private String ucc_corporation;
	// 业绩账单详情列表
	private List<AchievementBillContent> achievementBillContents;

	public AchievementSumAchievement() {
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

	public String getSa_type() {
		return sa_type;
	}

	public void setSa_type(String sa_type) {
		this.sa_type = sa_type;
	}

	public double getSa_oldMoney() {
		return sa_oldMoney;
	}

	public void setSa_oldMoney(double sa_oldMoney) {
		this.sa_oldMoney = sa_oldMoney;
	}

	public double getSa_newMoney() {
		return sa_newMoney;
	}

	public void setSa_newMoney(double sa_newMoney) {
		this.sa_newMoney = sa_newMoney;
	}

	public Date getSa_time() {
		return sa_time;
	}

	public void setSa_time(Date sa_time) {
		this.sa_time = sa_time;
	}

	public Integer getSa_auditState() {
		return sa_auditState;
	}

	public void setSa_auditState(Integer sa_auditState) {
		this.sa_auditState = sa_auditState;
	}

	public Integer getSa_auditType() {
		return sa_auditType;
	}

	public void setSa_auditType(Integer sa_auditType) {
		this.sa_auditType = sa_auditType;
	}

	public String getSa_startEndTime() {
		return sa_startEndTime;
	}

	public void setSa_startEndTime(String sa_startEndTime) {
		this.sa_startEndTime = sa_startEndTime;
	}

	public String getSa_tStartEndTime() {
		return sa_tStartEndTime;
	}

	public void setSa_tStartEndTime(String sa_tStartEndTime) {
		this.sa_tStartEndTime = sa_tStartEndTime;
	}

	public double getSa_sumMoney() {
		return sa_sumMoney;
	}

	public void setSa_sumMoney(double sa_sumMoney) {
		this.sa_sumMoney = sa_sumMoney;
	}

	public double getSa_lossDay() {
		return sa_lossDay;
	}

	public void setSa_lossDay(double sa_lossDay) {
		this.sa_lossDay = sa_lossDay;
	}

	public double getSa_lossMoney() {
		return sa_lossMoney;
	}

	public void setSa_lossMoney(double sa_lossMoney) {
		this.sa_lossMoney = sa_lossMoney;
	}

	public String getPropertyInfo_name() {
		return propertyInfo_name;
	}

	public void setPropertyInfo_name(String propertyInfo_name) {
		this.propertyInfo_name = propertyInfo_name;
	}

	public String getHi_address() {
		return hi_address;
	}

	public void setHi_address(String hi_address) {
		this.hi_address = hi_address;
	}

	public String getSa_uccID() {
		return sa_uccID;
	}

	public void setSa_uccID(String sa_uccID) {
		this.sa_uccID = sa_uccID;
	}

	public double getSa_forRentDay() {
		return sa_forRentDay;
	}

	public void setSa_forRentDay(double sa_forRentDay) {
		this.sa_forRentDay = sa_forRentDay;
	}

	public double getSa_freeDay() {
		return sa_freeDay;
	}

	public void setSa_freeDay(double sa_freeDay) {
		this.sa_freeDay = sa_freeDay;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public double getSa_saveMoney() {
		return sa_saveMoney;
	}

	public void setSa_saveMoney(double sa_saveMoney) {
		this.sa_saveMoney = sa_saveMoney;
	}

	public double getSa_outMoney() {
		return sa_outMoney;
	}

	public void setSa_outMoney(double sa_outMoney) {
		this.sa_outMoney = sa_outMoney;
	}

	public double getSa_saveMoney2() {
		return sa_saveMoney2;
	}

	public void setSa_saveMoney2(double sa_saveMoney2) {
		this.sa_saveMoney2 = sa_saveMoney2;
	}

	public double getSa_outMoney2() {
		return sa_outMoney2;
	}

	public void setSa_outMoney2(double sa_outMoney2) {
		this.sa_outMoney2 = sa_outMoney2;
	}

	public double getSa_sumMoneyH() {
		return sa_sumMoneyH;
	}

	public void setSa_sumMoneyH(double sa_sumMoneyH) {
		this.sa_sumMoneyH = sa_sumMoneyH;
	}

	public double getSa_difference() {
		return sa_difference;
	}

	public void setSa_difference(double sa_difference) {
		this.sa_difference = sa_difference;
	}

	public double getSa_turnRentMoney() {
		return sa_turnRentMoney;
	}

	public void setSa_turnRentMoney(double sa_turnRentMoney) {
		this.sa_turnRentMoney = sa_turnRentMoney;
	}

	public Integer getContractObject_Id() {
		return contractObject_Id;
	}

	public void setContractObject_Id(Integer contractObject_Id) {
		this.contractObject_Id = contractObject_Id;
	}

	public double getSa_tRepairMoney() {
		return sa_tRepairMoney;
	}

	public void setSa_tRepairMoney(double sa_tRepairMoney) {
		this.sa_tRepairMoney = sa_tRepairMoney;
	}

	public double getSa_zRepairMoney() {
		return sa_zRepairMoney;
	}

	public void setSa_zRepairMoney(double sa_zRepairMoney) {
		this.sa_zRepairMoney = sa_zRepairMoney;
	}

	public double getGoodsMoney() {
		return goodsMoney;
	}

	public void setGoodsMoney(double goodsMoney) {
		this.goodsMoney = goodsMoney;
	}

	public double getSa_zworkMoney() {
		return sa_zworkMoney;
	}

	public void setSa_zworkMoney(double sa_zworkMoney) {
		this.sa_zworkMoney = sa_zworkMoney;
	}

	public double getSa_tworkMoney() {
		return sa_tworkMoney;
	}

	public void setSa_tworkMoney(double sa_tworkMoney) {
		this.sa_tworkMoney = sa_tworkMoney;
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

	public double getAr_money() {
		return ar_money;
	}

	public void setAr_money(double ar_money) {
		this.ar_money = ar_money;
	}

	public String getAr_content() {
		return ar_content;
	}

	public void setAr_content(String ar_content) {
		this.ar_content = ar_content;
	}

	public String getUcc_corporation() {
		return ucc_corporation;
	}

	public void setUcc_corporation(String ucc_corporation) {
		this.ucc_corporation = ucc_corporation;
	}

	public List<AchievementBillContent> getAchievementBillContents() {
		return achievementBillContents;
	}

	public void setAchievementBillContents(List<AchievementBillContent> achievementBillContents) {
		this.achievementBillContents = achievementBillContents;
	}

	public double getSa_freeMoney() {
		return sa_freeMoney;
	}

	public void setSa_freeMoney(double sa_freeMoney) {
		this.sa_freeMoney = sa_freeMoney;
	}

}
