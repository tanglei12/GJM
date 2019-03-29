package com.gjp.model;

import java.util.Date;

/**
 * 客户其他证件信息
 * @author shenhx
 *
 */
public class UserCustomerID {

	// 编码
	private Integer ci_id;
	// 客户编码
	private Integer cc_id;
	// 证件类型
	private String id_type;
	// 证件号码
	private String id_no;
	// 证件用途
	private String id_use;
	// 证件图片路径
	private String id_path;
	// 证件过期日
	private Date id_pastDate;
	// 证件归属地
	private String id_location;
	// 证件备注
	private String id_remark;
	// 更新日期
	private Date update_time;
	public Integer getCi_id() {
		return ci_id;
	}
	public void setCi_id(Integer ci_id) {
		this.ci_id = ci_id;
	}
	public Integer getCc_id() {
		return cc_id;
	}
	public void setCc_id(Integer cc_id) {
		this.cc_id = cc_id;
	}
	public String getId_type() {
		return id_type;
	}
	public void setId_type(String id_type) {
		this.id_type = id_type;
	}
	public String getId_no() {
		return id_no;
	}
	public void setId_no(String id_no) {
		this.id_no = id_no;
	}
	public String getId_use() {
		return id_use;
	}
	public void setId_use(String id_use) {
		this.id_use = id_use;
	}
	public Date getId_pastDate() {
		return id_pastDate;
	}
	public void setId_pastDate(Date id_pastDate) {
		this.id_pastDate = id_pastDate;
	}
	public String getId_location() {
		return id_location;
	}
	public void setId_location(String id_location) {
		this.id_location = id_location;
	}
	public String getId_remark() {
		return id_remark;
	}
	public void setId_remark(String id_remark) {
		this.id_remark = id_remark;
	}
	public Date getUpdate_time() {
		return update_time;
	}
	public void setUpdate_time(Date update_time) {
		this.update_time = update_time;
	}
	public String getId_path() {
		return id_path;
	}
	public void setId_path(String id_path) {
		this.id_path = id_path;
	}
}
