package com.gjp.model;

import java.util.Date;

/**
 * 定价策略表
 * @author chen
 *
 * @date Dec 21, 2016 3:02:28 PM 
 */
public class PriceSetting {

	// 定价策略编码
	private Integer ps_id;
	// 定价策略名称
	private String ps_name;
	// 空置天数阈值
	private Integer ps_day;
	// 1:店长 2:公司3:系统
	private Integer ps_jurisdiction;
	// 创建时间
	private Date ps_date;
	
	public Integer getPs_id() {
		return ps_id;
	}
	public void setPs_id(Integer ps_id) {
		this.ps_id = ps_id;
	}
	public String getPs_name() {
		return ps_name;
	}
	public void setPs_name(String ps_name) {
		this.ps_name = ps_name;
	}
	public Integer getPs_day() {
		return ps_day;
	}
	public void setPs_day(Integer ps_day) {
		this.ps_day = ps_day;
	}
	public Integer getPs_jurisdiction() {
		return ps_jurisdiction;
	}
	public void setPs_jurisdiction(Integer ps_jurisdiction) {
		this.ps_jurisdiction = ps_jurisdiction;
	}
	public Date getPs_date() {
		return ps_date;
	}
	public void setPs_date(Date ps_date) {
		this.ps_date = ps_date;
	}
}
