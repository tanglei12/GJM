package com.gjp.model;

/**
 * 部门人员关系表
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年10月28日 下午2:41:20 
 */
public class CompanyPserson {

	// 组织人员关系表
	private Integer cp_id;
	// 组织架构编码
	private Integer ucc_id;
	// 内部人员编码
	private Integer em_id;
	
	public CompanyPserson(){}

	public Integer getCp_id() {
		return cp_id;
	}

	public void setCp_id(Integer cp_id) {
		this.cp_id = cp_id;
	}

	public Integer getUcc_id() {
		return ucc_id;
	}

	public void setUcc_id(Integer ucc_id) {
		this.ucc_id = ucc_id;
	}

	public Integer getEm_id() {
		return em_id;
	}

	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}
	
}
