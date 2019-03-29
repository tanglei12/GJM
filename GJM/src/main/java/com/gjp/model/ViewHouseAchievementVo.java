package com.gjp.model;

import java.util.Date;

/**
 * 视图--房屋业绩对象
 * 
 * @author 庆涛
 *
 */
public class ViewHouseAchievementVo {

	// 总业绩编码
	private Integer sa_id;
	// 房屋编码
	private String hi_code;
	// 业绩类型 标识：新出房，转租，续约，转租+续约，......
	private String sa_type;
	// 旧业绩金额
	private Double sa_oldMoney;
	// 新业绩金额
	private Double sa_newMoney;
	// 业绩生成时间
	private Date sa_time;
	// 审核状态
	private Integer sa_auditType;
	// 总业绩
	private Double sa_sumMoney;
	// 亏损天数
	private Integer sa_lossDay;
	// 亏损金额
	private Double sa_lossMoney;
	// 出房合同开始日期
	private Date sa_startDate;
	// 出房合同结束日期
	private Date sa_endDate;
	// 物业名称
	private String propertyInfo_Name;
	// 房号
	private String hi_address;

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

	public Double getSa_oldMoney() {
		return sa_oldMoney;
	}

	public void setSa_oldMoney(Double sa_oldMoney) {
		this.sa_oldMoney = sa_oldMoney;
	}

	public Double getSa_newMoney() {
		return sa_newMoney;
	}

	public void setSa_newMoney(Double sa_newMoney) {
		this.sa_newMoney = sa_newMoney;
	}

	public Date getSa_time() {
		return sa_time;
	}

	public void setSa_time(Date sa_time) {
		this.sa_time = sa_time;
	}

	public Integer getSa_auditType() {
		return sa_auditType;
	}

	public void setSa_auditType(Integer sa_auditType) {
		this.sa_auditType = sa_auditType;
	}

	public Double getSa_sumMoney() {
		return sa_sumMoney;
	}

	public void setSa_sumMoney(Double sa_sumMoney) {
		this.sa_sumMoney = sa_sumMoney;
	}

	public Integer getSa_lossDay() {
		return sa_lossDay;
	}

	public void setSa_lossDay(Integer sa_lossDay) {
		this.sa_lossDay = sa_lossDay;
	}

	public Double getSa_lossMoney() {
		return sa_lossMoney;
	}

	public void setSa_lossMoney(Double sa_lossMoney) {
		this.sa_lossMoney = sa_lossMoney;
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

	public String getPropertyInfo_Name() {
		return propertyInfo_Name;
	}

	public void setPropertyInfo_Name(String propertyInfo_Name) {
		this.propertyInfo_Name = propertyInfo_Name;
	}

	public String getHi_address() {
		return hi_address;
	}

	public void setHi_address(String hi_address) {
		this.hi_address = hi_address;
	}
}
