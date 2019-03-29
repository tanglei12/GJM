package com.gjp.model;

public class UserCenterType {

	// ID
	private Integer type_id;
	// 名称
	private String type_name;
	// 父ID
	private Integer type_parent;
	public Integer getType_id() {
		return type_id;
	}
	public void setType_id(Integer type_id) {
		this.type_id = type_id;
	}
	public String getType_name() {
		return type_name;
	}
	public void setType_name(String type_name) {
		this.type_name = type_name;
	}
	public Integer getType_parent() {
		return type_parent;
	}
	public void setType_parent(Integer type_parent) {
		this.type_parent = type_parent;
	}
	
}
