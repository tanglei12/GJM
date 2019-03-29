package com.gjp.model;

import java.util.Date;

/**
 * 借款处理表
 * @author tanglei
 * Date 2017年7月14日 下午 15:36:20
 */
public class BusinessLoanResult {
	// 借款处理主键id
	private Integer lh_id;
	// 借款id
	private Integer lh_bmId;
	// 审批人id
	private Integer lh_em_id;
	// 审批内容
	private String lh_content;
	// 状态 1.拒绝  2.通过
	private Integer lh_state;
	// 处理时间
	private Date lh_time;
	
	private String em_name; //审批人name
	public Integer getLh_id() {
		return lh_id;
	}
	public void setLh_id(Integer lh_id) {
		this.lh_id = lh_id;
	}
	public Integer getLh_bmId() {
		return lh_bmId;
	}
	public void setLh_bmId(Integer lh_bmId) {
		this.lh_bmId = lh_bmId;
	}
	public Integer getLh_em_id() {
		return lh_em_id;
	}
	public void setLh_em_id(Integer lh_em_id) {
		this.lh_em_id = lh_em_id;
	}
	public String getLh_content() {
		return lh_content;
	}
	public void setLh_content(String lh_content) {
		this.lh_content = lh_content;
	}
	public Integer getLh_state() {
		return lh_state;
	}
	public void setLh_state(Integer lh_state) {
		this.lh_state = lh_state;
	}
	public Date getLh_time() {
		return lh_time;
	}
	public void setLh_time(Date lh_time) {
		this.lh_time = lh_time;
	}
	public String getEm_name() {
		return em_name;
	}
	public void setEm_name(String em_name) {
		this.em_name = em_name;
	}
	
}
