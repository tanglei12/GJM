package com.gjp.model;

import java.util.Date;

/**
 * 记录-合约订单审核记录
 * 
 * @author 庆涛
 *
 */
public class RecordContractOrderAuditingVo {

	private Integer auditingRecord_id;//
	private String cco_code;//
	private String auditingRecord_state;//
	private String auditingRecord_content;//
	private String auditingRecord_author;//
	private Date auditingRecord_createTime;//

	private String like_auditingRecord_state;//

	public Integer getAuditingRecord_id() {
		return auditingRecord_id;
	}

	public void setAuditingRecord_id(Integer auditingRecord_id) {
		this.auditingRecord_id = auditingRecord_id;
	}

	public String getCco_code() {
		return cco_code;
	}

	public void setCco_code(String cco_code) {
		this.cco_code = cco_code;
	}

	public String getAuditingRecord_state() {
		return auditingRecord_state;
	}

	public void setAuditingRecord_state(String auditingRecord_state) {
		this.auditingRecord_state = auditingRecord_state;
	}

	public String getAuditingRecord_content() {
		return auditingRecord_content;
	}

	public void setAuditingRecord_content(String auditingRecord_content) {
		this.auditingRecord_content = auditingRecord_content;
	}

	public String getAuditingRecord_author() {
		return auditingRecord_author;
	}

	public void setAuditingRecord_author(String auditingRecord_author) {
		this.auditingRecord_author = auditingRecord_author;
	}

	public Date getAuditingRecord_createTime() {
		return auditingRecord_createTime;
	}

	public void setAuditingRecord_createTime(Date auditingRecord_createTime) {
		this.auditingRecord_createTime = auditingRecord_createTime;
	}

	public String getLike_auditingRecord_state() {
		return like_auditingRecord_state;
	}

	public void setLike_auditingRecord_state(String like_auditingRecord_state) {
		this.like_auditingRecord_state = like_auditingRecord_state;
	}

}
