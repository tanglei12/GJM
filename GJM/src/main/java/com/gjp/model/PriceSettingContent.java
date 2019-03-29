package com.gjp.model;

import java.util.Date;

/**
 * 定价参数设置
 * @author chen
 *
 * @date Dec 21, 2016 3:04:25 PM 
 */
public class PriceSettingContent {

	// 定价参数编码
	private Integer psc_id;
	// 涨价周期/金额
	private String psc_upCycle;
	// 单位
	private String psc_unit;
	// 备注
	private String psc_remark;
	// 创建时间
	private Date psc_date;
	// 定价类型编码
	private Integer pst_id;
	
	public Integer getPsc_id() {
		return psc_id;
	}
	public void setPsc_id(Integer psc_id) {
		this.psc_id = psc_id;
	}
	public String getPsc_upCycle() {
		return psc_upCycle;
	}
	public void setPsc_upCycle(String psc_upCycle) {
		this.psc_upCycle = psc_upCycle;
	}
	public String getPsc_remark() {
		return psc_remark;
	}
	public void setPsc_remark(String psc_remark) {
		this.psc_remark = psc_remark;
	}
	public Date getPsc_date() {
		return psc_date;
	}
	public void setPsc_date(Date psc_date) {
		this.psc_date = psc_date;
	}
	public Integer getPst_id() {
		return pst_id;
	}
	public void setPst_id(Integer pst_id) {
		this.pst_id = pst_id;
	}
	public String getPsc_unit() {
		return psc_unit;
	}
	public void setPsc_unit(String psc_unit) {
		this.psc_unit = psc_unit;
	}
}
