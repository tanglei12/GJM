package com.gjp.model;

import java.util.Date;

/**
 * 数据字典
 * @author shenhx
 *
 */
public class UserDictionary {

	// 编码
	private Integer dr_id;
	// 父编码
	private Integer dr_pid;
	// 是否为父级
	private Integer is_parent;
	// 字典编码
	private String propertyId;
	// 名称
	private String dictionary_name;
	// 值
	private String dictionary_value;
	// 状态
	private String dictionary_status;
	// 是否默认选中 0-否；1-是
	private Integer is_checked;
	// 备注
	private String remark;
	// 时间
	private Date update_time;
	public Integer getDr_id() {
		return dr_id;
	}
	public void setDr_id(Integer dr_id) {
		this.dr_id = dr_id;
	}
	public Integer getDr_pid() {
		return dr_pid;
	}
	public void setDr_pid(Integer dr_pid) {
		this.dr_pid = dr_pid;
	}
	public String getPropertyId() {
		return propertyId;
	}
	public void setPropertyId(String propertyId) {
		this.propertyId = propertyId;
	}
	public String getDictionary_name() {
		return dictionary_name;
	}
	public void setDictionary_name(String dictionary_name) {
		this.dictionary_name = dictionary_name;
	}
	public String getDictionary_value() {
		return dictionary_value;
	}
	public void setDictionary_value(String dictionary_value) {
		this.dictionary_value = dictionary_value;
	}
	public String getDictionary_status() {
		return dictionary_status;
	}
	public void setDictionary_status(String dictionary_status) {
		this.dictionary_status = dictionary_status;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public Date getUpdate_time() {
		return update_time;
	}
	public void setUpdate_time(Date update_time) {
		this.update_time = update_time;
	}
	public Integer getIs_parent() {
		return is_parent;
	}
	public void setIs_parent(Integer is_parent) {
		this.is_parent = is_parent;
	}
	public Integer getIs_checked() {
		return is_checked;
	}
	public void setIs_checked(Integer is_checked) {
		this.is_checked = is_checked;
	}
}
