package com.gjp.model;

import java.util.Date;

public class Role {

	//角色编号
	private Integer ucr_id;
	//角色名称
	private String ucr_name;
	//创建时间
	private Date ucr_date;
	//角色备注
	private String ucr_remarks;
	//角色类型  1.超级管理员 2.管理员 3.普通用户
	private Integer ucr_type;
	//员工编号
	private Integer em_id;
	//权限编号
	private Integer ucps_id;
	
	/**扩展属性**/
	// 开始数
	private Integer start;
	// 查询几条
	private Integer end;
	// 条件查询
	private String whereList;
	
	public Integer getUcr_id() {
		return ucr_id;
	}
	public void setUcr_id(Integer ucr_id) {
		this.ucr_id = ucr_id;
	}
	public String getUcr_name() {
		return ucr_name;
	}
	public void setUcr_name(String ucr_name) {
		this.ucr_name = ucr_name;
	}
	public Date getUcr_date() {
		return ucr_date;
	}
	public void setUcr_date(Date ucr_date) {
		this.ucr_date = ucr_date;
	}
	public Integer getEm_id() {
		return em_id;
	}
	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}
	public String getUcr_remarks() {
		return ucr_remarks;
	}
	public void setUcr_remarks(String ucr_remarks) {
		this.ucr_remarks = ucr_remarks;
	}
	public Integer getUcr_type() {
		return ucr_type;
	}
	public void setUcr_type(Integer ucr_type) {
		this.ucr_type = ucr_type;
	}
	public Integer getUcps_id() {
		return ucps_id;
	}
	public void setUcps_id(Integer ucps_id) {
		this.ucps_id = ucps_id;
	}
	public Integer getStart() {
		return start;
	}
	public void setStart(Integer start) {
		this.start = start;
	}
	public Integer getEnd() {
		return end;
	}
	public void setEnd(Integer end) {
		this.end = end;
	}
	public String getWhereList() {
		return whereList;
	}
	public void setWhereList(String whereList) {
		this.whereList = whereList;
	}
	
	
}
