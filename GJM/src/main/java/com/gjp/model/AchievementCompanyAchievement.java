package com.gjp.model;

import java.util.Date;

/**
 * 公司业绩设置
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年5月13日 上午10:46:55
 */
public class AchievementCompanyAchievement {

	// 公司业绩目标编码
	private Integer ca_id;
	// 总业绩目标
	private Double ca_sum;
	// 总业绩单位
	private String ca_sumCompany;
	// 新业绩目标
	private Double ca_new;
	// 新业绩单位
	private String ca_newCompany;
	// 时间段
	private String ca_startEndDate;
	// 开始时间
	private Date ca_startDate;
	// 结束时间
	private Date ca_endDate;
	// 几页
	private String page;

	// 团队总业绩
	private Double ta_sum;
	// 总业绩单位
	private String ta_sumCompany;
	// 团队新业绩
	private Double ta_new;
	// 新业绩单位
	private String ta_newCompany;
	// 部门名称
	private String ucc_name;
	// 部门编码
	private Integer ucc_id;
	// 部门业绩编码
	private Integer ta_id;
	
	// 合同编码
	private Integer contractObject_Id;

	// 日期查询条件
	private String queryDate;

	public AchievementCompanyAchievement() {
	}

	public Integer getCa_id() {
		return ca_id;
	}

	public void setCa_id(Integer ca_id) {
		this.ca_id = ca_id;
	}

	public Double getCa_sum() {
		return ca_sum;
	}

	public void setCa_sum(Double ca_sum) {
		this.ca_sum = ca_sum;
	}

	public Double getCa_new() {
		return ca_new;
	}

	public void setCa_new(Double ca_new) {
		this.ca_new = ca_new;
	}

	public String getCa_startEndDate() {
		return ca_startEndDate;
	}

	public void setCa_startEndDate(String ca_startEndDate) {
		this.ca_startEndDate = ca_startEndDate;
	}

	public String getCa_sumCompany() {
		return ca_sumCompany;
	}

	public void setCa_sumCompany(String ca_sumCompany) {
		this.ca_sumCompany = ca_sumCompany;
	}

	public String getCa_newCompany() {
		return ca_newCompany;
	}

	public void setCa_newCompany(String ca_newCompany) {
		this.ca_newCompany = ca_newCompany;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public Double getTa_sum() {
		return ta_sum;
	}

	public void setTa_sum(Double ta_sum) {
		this.ta_sum = ta_sum;
	}

	public String getTa_sumCompany() {
		return ta_sumCompany;
	}

	public void setTa_sumCompany(String ta_sumCompany) {
		this.ta_sumCompany = ta_sumCompany;
	}

	public Double getTa_new() {
		return ta_new;
	}

	public void setTa_new(Double ta_new) {
		this.ta_new = ta_new;
	}

	public String getTa_newCompany() {
		return ta_newCompany;
	}

	public void setTa_newCompany(String ta_newCompany) {
		this.ta_newCompany = ta_newCompany;
	}

	public String getUcc_name() {
		return ucc_name;
	}

	public void setUcc_name(String ucc_name) {
		this.ucc_name = ucc_name;
	}

	public Integer getUcc_id() {
		return ucc_id;
	}

	public void setUcc_id(Integer ucc_id) {
		this.ucc_id = ucc_id;
	}

	public Integer getTa_id() {
		return ta_id;
	}

	public void setTa_id(Integer ta_id) {
		this.ta_id = ta_id;
	}

	public Date getCa_startDate() {
		return ca_startDate;
	}

	public void setCa_startDate(Date ca_startDate) {
		this.ca_startDate = ca_startDate;
	}

	public Date getCa_endDate() {
		return ca_endDate;
	}

	public void setCa_endDate(Date ca_endDate) {
		this.ca_endDate = ca_endDate;
	}

	public String getQueryDate() {
		return queryDate;
	}

	public void setQueryDate(String queryDate) {
		this.queryDate = queryDate;
	}

	public Integer getContractObject_Id() {
		return contractObject_Id;
	}

	public void setContractObject_Id(Integer contractObject_Id) {
		this.contractObject_Id = contractObject_Id;
	}

}
