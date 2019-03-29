package com.gjp.model;

import java.util.Date;

/**
 * 客户待办信息
 * 
 * @author 王孝元
 * 
 * @version 创建时间：2017年4月9日 下午10:01:25
 * 
 */
public class CustomerStayThingVo {

	// 带看编号
	private Integer hs_id;
	// 带看内容
	private String hs_content;
	// 带看时间
	private String hs_createTime;
	// 客户编号
	private String cc_code;
	// 客户姓名
	private String cc_name;
	// 客户电话
	private String ccp_phone;
	// 管家id
	private Integer em_id;
	// 管家姓名
	private String em_name;
	// 管家电话
	private String em_phone;
	// 房屋编号
	private String hi_code;
	// 房屋地址
	private String house_address;
	// 存房时间
	private Date hi_date;
	// 带看结果
	private Integer hs_state;
	// 房东还是租客
	private String cc_type;

	public Integer getHs_id() {
		return hs_id;
	}

	public void setHs_id(Integer hs_id) {
		this.hs_id = hs_id;
	}

	public String getHs_content() {
		return hs_content;
	}

	public void setHs_content(String hs_content) {
		this.hs_content = hs_content;
	}

	public String getHs_createTime() {
		return hs_createTime;
	}

	public void setHs_createTime(String hs_createTime) {
		this.hs_createTime = hs_createTime;
	}

	public String getCc_code() {
		return cc_code;
	}

	public void setCc_code(String cc_code) {
		this.cc_code = cc_code;
	}

	public String getCc_name() {
		return cc_name;
	}

	public void setCc_name(String cc_name) {
		this.cc_name = cc_name;
	}

	public String getCcp_phone() {
		return ccp_phone;
	}

	public void setCcp_phone(String ccp_phone) {
		this.ccp_phone = ccp_phone;
	}

	public Integer getEm_id() {
		return em_id;
	}

	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}

	public String getEm_name() {
		return em_name;
	}

	public void setEm_name(String em_name) {
		this.em_name = em_name;
	}

	public String getEm_phone() {
		return em_phone;
	}

	public void setEm_phone(String em_phone) {
		this.em_phone = em_phone;
	}

	public String getHi_code() {
		return hi_code;
	}

	public void setHi_code(String hi_code) {
		this.hi_code = hi_code;
	}

	public String getHouse_address() {
		return house_address;
	}

	public void setHouse_address(String house_address) {
		this.house_address = house_address;
	}

	public Date getHi_date() {
		return hi_date;
	}

	public void setHi_date(Date hi_date) {
		this.hi_date = hi_date;
	}

	public Integer getHs_state() {
		return hs_state;
	}

	public void setHs_state(Integer hs_state) {
		this.hs_state = hs_state;
	}

	public String getCc_type() {
		return cc_type;
	}

	public void setCc_type(String cc_type) {
		this.cc_type = cc_type;
	}
}
