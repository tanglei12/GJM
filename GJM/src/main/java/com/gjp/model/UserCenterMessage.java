package com.gjp.model;

import java.util.Date;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年8月19日 下午3:56:06 
 */
public class UserCenterMessage {

	// 短信编码
	private Integer um_id;
	// 短信发送时间
	private Date um_date;
	// 短信类型
	private Integer um_type;
	// 短信内容
	private String um_text;
	// 客户唯一编码
	private String cc_code;
	// 发送人
	private Integer em_id;
	
	public Integer getUm_id() {
		return um_id;
	}
	public void setUm_id(Integer um_id) {
		this.um_id = um_id;
	}
	public Date getUm_date() {
		return um_date;
	}
	public void setUm_date(Date um_date) {
		this.um_date = um_date;
	}
	public Integer getUm_type() {
		return um_type;
	}
	public void setUm_type(Integer um_type) {
		this.um_type = um_type;
	}
	public String getUm_text() {
		return um_text;
	}
	public void setUm_text(String um_text) {
		this.um_text = um_text;
	}
	public String getCc_code() {
		return cc_code;
	}
	public void setCc_code(String cc_code) {
		this.cc_code = cc_code;
	}
	public Integer getEm_id() {
		return em_id;
	}
	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}
	
}
