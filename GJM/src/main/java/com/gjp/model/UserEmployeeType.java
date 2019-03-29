package com.gjp.model;

public class UserEmployeeType {

	//内部人员权限编码
	private Integer et_id;
	//内部人员权限名
	private String et_name;
	//备注
	private String et_content;
	//内部人员编码
	private Integer em_id;
	//排序码
	private Integer et_num;
	
	public Integer getEt_id() {
		return et_id;
	}
	public void setEt_id(Integer et_id) {
		this.et_id = et_id;
	}
	public String getEt_name() {
		return et_name;
	}
	public void setEt_name(String et_name) {
		this.et_name = et_name;
	}
	public String getEt_content() {
		return et_content;
	}
	public void setEt_content(String et_content) {
		this.et_content = et_content;
	}
	public Integer getEm_id() {
		return em_id;
	}
	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}
	public Integer getEt_num() {
		return et_num;
	}
	public void setEt_num(Integer et_num) {
		this.et_num = et_num;
	}
	
}
