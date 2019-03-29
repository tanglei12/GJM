package com.gjp.model;

import java.util.Date;

/**
 * 用户投诉建议记录
 * @author tanglei
 *
 */
public class UserCenterComplaintsRecord {
	
	private Integer coRe_id;
	private String coRe_content;
	private String coRe_extentContent;
	private String coRe_name;
	private String coRe_phone;
	private Date coRe_time;
	private Integer coRe_state;
	public Integer getCoRe_id() {
		return coRe_id;
	}
	public void setCoRe_id(Integer coRe_id) {
		this.coRe_id = coRe_id;
	}
	public String getCoRe_content() {
		return coRe_content;
	}
	public void setCoRe_content(String coRe_content) {
		this.coRe_content = coRe_content;
	}
	public String getCoRe_extentContent() {
		return coRe_extentContent;
	}
	public void setCoRe_extentContent(String coRe_extentContent) {
		this.coRe_extentContent = coRe_extentContent;
	}
	public String getCoRe_name() {
		return coRe_name;
	}
	public void setCoRe_name(String coRe_name) {
		this.coRe_name = coRe_name;
	}
	public String getCoRe_phone() {
		return coRe_phone;
	}
	public void setCoRe_phone(String coRe_phone) {
		this.coRe_phone = coRe_phone;
	}
	public Date getCoRe_time() {
		return coRe_time;
	}
	public void setCoRe_time(Date coRe_time) {
		this.coRe_time = coRe_time;
	}
	public Integer getCoRe_state() {
		return coRe_state;
	}
	public void setCoRe_state(Integer coRe_state) {
		this.coRe_state = coRe_state;
	}
	
	

}
