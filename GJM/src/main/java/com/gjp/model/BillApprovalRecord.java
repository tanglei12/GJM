package com.gjp.model;

import java.util.Date;

public class BillApprovalRecord {
	private Integer ar_id;
	private Integer ar_ex_id;
	private Integer ar_em_id;
	private Integer ar_state;
	private String ar_text;
	private String ar_number;
	private Date ar_time;
	//姓名
	private String em_name;
	public Integer getAr_id() {
		return ar_id;
	}
	public void setAr_id(Integer ar_id) {
		this.ar_id = ar_id;
	}
	public Integer getAr_em_id() {
		return ar_em_id;
	}
	public void setAr_em_id(Integer ar_em_id) {
		this.ar_em_id = ar_em_id;
	}
	public Integer getAr_ex_id() {
		return ar_ex_id;
	}
	public void setAr_ex_id(Integer ar_ex_id) {
		this.ar_ex_id = ar_ex_id;
	}
	public Integer getAr_state() {
		return ar_state;
	}
	public void setAr_state(Integer ar_state) {
		this.ar_state = ar_state;
	}
	public String getAr_text() {
		return ar_text;
	}
	public void setAr_text(String ar_text) {
		this.ar_text = ar_text;
	}
	public String getAr_number() {
		return ar_number;
	}
	public void setAr_number(String ar_number) {
		this.ar_number = ar_number;
	}
	public Date getAr_time() {
		return ar_time;
	}
	public void setAr_time(Date ar_time) {
		this.ar_time = ar_time;
	}
	public String getEm_name() {
		return em_name;
	}
	public void setEm_name(String em_name) {
		this.em_name = em_name;
	}
	

}
