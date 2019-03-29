package com.gjp.model;

import java.util.Date;

public class Department {

	//部门编号
	private Integer ucd_id;
	//部门名称
	private String ucd_name;
	//部门主管
	private String ucd_director;
	//部门电话
	private String ucd_phone;
	//所属公司编号
	private Integer ucc_id;
	//上级部门编号
	private Integer pi_id;
	//创建时间
	private Date ucd_date;
	//备注
	private String ucd_text;
	// 总数
	private Integer size;
	// 开始数
	private Integer start;
	// 查询几条
	private Integer end;
	// 条件查询
	private String whereList;
	
	public Department() {
		super();
	}

	public Integer getUcd_id() {
		return ucd_id;
	}

	public void setUcd_id(Integer ucd_id) {
		this.ucd_id = ucd_id;
	}

	public String getUcd_name() {
		return ucd_name;
	}

	public void setUcd_name(String ucd_name) {
		this.ucd_name = ucd_name;
	}

	public String getUcd_director() {
		return ucd_director;
	}

	public void setUcd_director(String ucd_director) {
		this.ucd_director = ucd_director;
	}

	public String getUcd_phone() {
		return ucd_phone;
	}

	public void setUcd_phone(String ucd_phone) {
		this.ucd_phone = ucd_phone;
	}

	public Integer getUcc_id() {
		return ucc_id;
	}

	public void setUcc_id(Integer ucc_id) {
		this.ucc_id = ucc_id;
	}

	public Integer getPi_id() {
		return pi_id;
	}

	public void setPi_id(Integer pi_id) {
		this.pi_id = pi_id;
	}

	public Date getUcd_date() {
		return ucd_date;
	}

	public void setUcd_date(Date ucd_date) {
		this.ucd_date = ucd_date;
	}

	public String getUcd_text() {
		return ucd_text;
	}

	public void setUcd_text(String ucd_text) {
		this.ucd_text = ucd_text;
	}

	public Integer getSize() {
		return size;
	}

	public void setSize(Integer size) {
		this.size = size;
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
