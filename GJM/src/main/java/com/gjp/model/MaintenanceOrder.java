package com.gjp.model;

import java.util.Date;

/**
 * 服务进度
 * 
 * @author zoe
 *
 */
public class MaintenanceOrder {

	// 维修订单流程编码
	private Integer mo_id;
	// 维修状态
	private String mo_state;
	// 维修状态code
	private Integer mo_step;
	// 时间
	private Date mo_date;
	// 维修内容
	private String mo_content;
	// 维修申报编码
	private Integer md_id;

	public MaintenanceOrder() {
		super();
	}

	public Integer getMo_id() {
		return mo_id;
	}

	public void setMo_id(Integer mo_id) {
		this.mo_id = mo_id;
	}

	public String getMo_state() {
		return mo_state;
	}

	public void setMo_state(String mo_state) {
		this.mo_state = mo_state;
	}

	public Date getMo_date() {
		return mo_date;
	}

	public void setMo_date(Date mo_date) {
		this.mo_date = mo_date;
	}

	public String getMo_content() {
		return mo_content;
	}

	public void setMo_content(String mo_content) {
		this.mo_content = mo_content;
	}

	public Integer getMd_id() {
		return md_id;
	}

	public void setMd_id(Integer md_id) {
		this.md_id = md_id;
	}

	public Integer getMo_step() {
		return mo_step;
	}

	public void setMo_step(Integer mo_step) {
		this.mo_step = mo_step;
	}


}
