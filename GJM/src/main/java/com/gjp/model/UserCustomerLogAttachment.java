package com.gjp.model;

import java.util.Date;

/**
 * 客户日志附件
 * @author shenhx
 *
 */
public class UserCustomerLogAttachment {

	// 主键编码
	private Integer ca_id;
	// 客户日志ID
	private Integer cl_id;
	// 附件名称
	private String ca_name;
	// 附件地址
	private String ca_path;
	// 附件类型
	private String ca_type;
	// 创建时间
	private Date ca_createTime;
	// 状态 0-无效；1-有效
	private Integer ca_status;
	public Integer getCa_id() {
		return ca_id;
	}
	public void setCa_id(Integer ca_id) {
		this.ca_id = ca_id;
	}
	public Integer getCl_id() {
		return cl_id;
	}
	public void setCl_id(Integer cl_id) {
		this.cl_id = cl_id;
	}
	public String getCa_name() {
		return ca_name;
	}
	public void setCa_name(String ca_name) {
		this.ca_name = ca_name;
	}
	public String getCa_path() {
		return ca_path;
	}
	public void setCa_path(String ca_path) {
		this.ca_path = ca_path;
	}
	public Date getCa_createTime() {
		return ca_createTime;
	}
	public void setCa_createTime(Date ca_createTime) {
		this.ca_createTime = ca_createTime;
	}
	public Integer getCa_status() {
		return ca_status;
	}
	public void setCa_status(Integer ca_status) {
		this.ca_status = ca_status;
	}
	public String getCa_type() {
		return ca_type;
	}
	public void setCa_type(String ca_type) {
		this.ca_type = ca_type;
	}
	
}
