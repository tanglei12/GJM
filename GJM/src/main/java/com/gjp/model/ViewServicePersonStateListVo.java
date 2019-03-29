package com.gjp.model;

/**
 *
 * @author JiangQt
 * @createTime 2015年9月26日下午2:53:22
 */
public class ViewServicePersonStateListVo {

	private Integer md_id;// 服务订单编号
	private String md_number;// 订单唯一编号
	private String md_problem;// 订单描述
	private String md_state;// 受理状态
	private String mdg_state;// 订单状态
	private Integer em_id;// 服务人员编号
	private String em_name;// 服务人员名称
	private String propertyInfo_Name;// 小区名称
	private String hi_address;// 房号

	public Integer getMd_id() {
		return md_id;
	}

	public void setMd_id(Integer md_id) {
		this.md_id = md_id;
	}

	public String getMd_number() {
		return md_number;
	}

	public void setMd_number(String md_number) {
		this.md_number = md_number;
	}

	public String getMd_problem() {
		return md_problem;
	}

	public void setMd_problem(String md_problem) {
		this.md_problem = md_problem;
	}

	public String getMd_state() {
		return md_state;
	}

	public void setMd_state(String md_state) {
		this.md_state = md_state;
	}

	public String getMdg_state() {
		return mdg_state;
	}

	public void setMdg_state(String mdg_state) {
		this.mdg_state = mdg_state;
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

	public String getPropertyInfo_Name() {
		return propertyInfo_Name;
	}

	public void setPropertyInfo_Name(String propertyInfo_Name) {
		this.propertyInfo_Name = propertyInfo_Name;
	}

	public String getHi_address() {
		return hi_address;
	}

	public void setHi_address(String hi_address) {
		this.hi_address = hi_address;
	}

}