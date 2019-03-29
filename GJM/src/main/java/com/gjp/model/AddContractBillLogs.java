package com.gjp.model;

import java.util.Date;

/**
 * 审核记录
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年12月13日 下午5:27:59 
 */
public class AddContractBillLogs {

	//账单日志编码
	private Integer cbl_id;
	// 管家编码
	private Integer em_id;
	// 操作内容
	private String cbl_text;
	// 创建时间
	private Date cbl_time;
	
	public Integer getCbl_id() {
		return cbl_id;
	}
	public void setCbl_id(Integer cbl_id) {
		this.cbl_id = cbl_id;
	}
	public Integer getEm_id() {
		return em_id;
	}
	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}
	public String getCbl_text() {
		return cbl_text;
	}
	public void setCbl_text(String cbl_text) {
		this.cbl_text = cbl_text;
	}
	public Date getCbl_time() {
		return cbl_time;
	}
	public void setCbl_time(Date cbl_time) {
		this.cbl_time = cbl_time;
	}
	
}
