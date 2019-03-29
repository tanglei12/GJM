package com.gjp.model;

/**
 * 部门托管顾问表
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年3月2日 上午11:01:33 
 */
public class ViewTrusteeship {

	//部门
	private String ucc_name;
	//内部人员编码
	private Integer em_id;
	
	public ViewTrusteeship(){}

	public String getUcc_name() {
		return ucc_name;
	}

	public void setUcc_name(String ucc_name) {
		this.ucc_name = ucc_name;
	}

	public Integer getEm_id() {
		return em_id;
	}

	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}
	
}
