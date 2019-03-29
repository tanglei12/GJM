package com.gjp.model;

import java.util.Date;

/**
 * 合同管家变更记录
 * @author shenhx
 *
 */
public class UserCenterHandoverContract {
	
	// ID
	private Integer hc_id;
	// 原管家
	private Integer em_id_old;
	// 新管家
	private Integer em_id_new;
	// 合同编码
	private Integer contractObject_Id;
	// 交接时间
	private Date handover_time;
	// 交接状态:1-已交接；2-未交接
	private Integer handover_status;
	
	/* 扩展字段 */
	// 原管家名称
	private String em_name_old;
	// 新管家名称
	private String em_name_new;
	
	public Integer getHc_id() {
		return hc_id;
	}
	public void setHc_id(Integer hc_id) {
		this.hc_id = hc_id;
	}
	public Integer getEm_id_old() {
		return em_id_old;
	}
	public void setEm_id_old(Integer em_id_old) {
		this.em_id_old = em_id_old;
	}
	public Integer getEm_id_new() {
		return em_id_new;
	}
	public void setEm_id_new(Integer em_id_new) {
		this.em_id_new = em_id_new;
	}
	public Integer getContractObject_Id() {
		return contractObject_Id;
	}
	public void setContractObject_Id(Integer contractObject_Id) {
		this.contractObject_Id = contractObject_Id;
	}
	public Date getHandover_time() {
		return handover_time;
	}
	public void setHandover_time(Date handover_time) {
		this.handover_time = handover_time;
	}
	public Integer getHandover_status() {
		return handover_status;
	}
	public void setHandover_status(Integer handover_status) {
		this.handover_status = handover_status;
	}
	public String getEm_name_old() {
		return em_name_old;
	}
	public void setEm_name_old(String em_name_old) {
		this.em_name_old = em_name_old;
	}
	public String getEm_name_new() {
		return em_name_new;
	}
	public void setEm_name_new(String em_name_new) {
		this.em_name_new = em_name_new;
	}
	
}
