package com.gjp.model;

import java.util.Date;

/**
 * 房屋部门记录对象
 * 
 * @author 庆涛
 *
 */
public class PositionRecordVo {

	// 记录ID
	private Integer hpr_id;
	// 房屋唯一编号
	private String hi_code;
	// 部门ID
	private Integer ucc_id;
	// 管家
	private Integer hpr_emp;
	// 最新管家
	private Integer hpr_newEmp;
	// 部门名称
	private Date hpr_createTime;
	// 小区房号
	private String house_address;

	// *******扩展******* //

	// 部门名称
	private String ucc_name;
	// 原始管家姓名
	private String em_name_old;
	// 原始管家电话
	private String em_phone_old;
	// 最新管家姓名
	private String em_name_new;
	// 最新管家电话
	private String em_phone_new;

	public Integer getHpr_id() {
		return hpr_id;
	}

	public void setHpr_id(Integer hpr_id) {
		this.hpr_id = hpr_id;
	}

	public String getHi_code() {
		return hi_code;
	}

	public void setHi_code(String hi_code) {
		this.hi_code = hi_code;
	}

	public Integer getUcc_id() {
		return ucc_id;
	}

	public void setUcc_id(Integer ucc_id) {
		this.ucc_id = ucc_id;
	}

	public String getUcc_name() {
		return ucc_name;
	}

	public void setUcc_name(String ucc_name) {
		this.ucc_name = ucc_name;
	}

	public Integer getHpr_emp() {
		return hpr_emp;
	}

	public void setHpr_emp(Integer hpr_emp) {
		this.hpr_emp = hpr_emp;
	}

	public Integer getHpr_newEmp() {
		return hpr_newEmp;
	}

	public void setHpr_newEmp(Integer hpr_newEmp) {
		this.hpr_newEmp = hpr_newEmp;
	}

	public Date getHpr_createTime() {
		return hpr_createTime;
	}

	public void setHpr_createTime(Date hpr_createTime) {
		this.hpr_createTime = hpr_createTime;
	}

	public String getEm_name_old() {
		return em_name_old;
	}

	public void setEm_name_old(String em_name_old) {
		this.em_name_old = em_name_old;
	}

	public String getEm_phone_old() {
		return em_phone_old;
	}

	public void setEm_phone_old(String em_phone_old) {
		this.em_phone_old = em_phone_old;
	}

	public String getEm_name_new() {
		return em_name_new;
	}

	public void setEm_name_new(String em_name_new) {
		this.em_name_new = em_name_new;
	}

	public String getEm_phone_new() {
		return em_phone_new;
	}

	public void setEm_phone_new(String em_phone_new) {
		this.em_phone_new = em_phone_new;
	}

	public String getHouse_address() {
		return house_address;
	}

	public void setHouse_address(String house_address) {
		this.house_address = house_address;
	}

}
