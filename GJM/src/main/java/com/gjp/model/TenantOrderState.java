package com.gjp.model;

import java.util.Date;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2015年12月17日 下午4:18:34 
 */
public class TenantOrderState {

	// 编码
	private Integer tos_id;
	// 订单号
	private String tos_code;
	// 订单状态
	private String tos_state;
	// 状态时间
	private Date tos_date;
	
	public TenantOrderState(){}

	public Integer getTos_id() {
		return tos_id;
	}

	public void setTos_id(Integer tos_id) {
		this.tos_id = tos_id;
	}

	public String getTos_code() {
		return tos_code;
	}

	public void setTos_code(String tos_code) {
		this.tos_code = tos_code;
	}

	public String getTos_state() {
		return tos_state;
	}

	public void setTos_state(String tos_state) {
		this.tos_state = tos_state;
	}

	public Date getTos_date() {
		return tos_date;
	}

	public void setTos_date(Date tos_date) {
		this.tos_date = tos_date;
	}
	
}
