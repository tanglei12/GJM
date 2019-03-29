package com.gjp.model;

import java.util.Date;

/**
 * 客户带看
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年2月24日 上午10:12:11 
 */
public class CustomerSee {

	//客户带看编码
	private Integer cs_id;
	//年
	private Integer cs_year;
	//客户带看周数
	private Integer cs_day;
	//带看时间
	private Date cs_date;
	//带看客户剩余数量
	private Integer cs_surplusNum;
	//客户带看成功率
	private String cs_per;
	//职工人员编码
	private Integer em_id;
	//客户带看应得金额
	private Double cs_money;
	
	//跟踪图片
	private String csm_image;
	//客户意见
	private String csm_opinion;
	//失败原因
	private String csm_reason;
	//跟进状态
	private Integer csm_state;
	//客户带看信息编码
	private Integer csm_id;
	
	//客户姓名
	private String ctm_name;
	//客户电话
	private String ctm_phone;
	//客户需求
	private String ctm_demand;
	//性别
	private String ctm_sex;
	
	//房屋编码
	private String hi_code;
	//房号(调用产权地址：物业地址+房号)
	private String hi_address;
	//物业名称
	private String propertyInfo_Name;
	
	// 条件
	private String sqlWhere;
	
	//总数
	private Integer size;
	//页数
	private Integer pageNo;
	//第几条
	private Integer pageSize;
	
	public CustomerSee(){
		
	}

	public Integer getCs_id() {
		return cs_id;
	}

	public void setCs_id(Integer cs_id) {
		this.cs_id = cs_id;
	}

	public Integer getCs_year() {
		return cs_year;
	}

	public void setCs_year(Integer cs_year) {
		this.cs_year = cs_year;
	}

	public Integer getCs_day() {
		return cs_day;
	}

	public void setCs_day(Integer cs_day) {
		this.cs_day = cs_day;
	}

	public Date getCs_date() {
		return cs_date;
	}

	public void setCs_date(Date cs_date) {
		this.cs_date = cs_date;
	}

	public Integer getCs_surplusNum() {
		return cs_surplusNum;
	}

	public void setCs_surplusNum(Integer cs_surplusNum) {
		this.cs_surplusNum = cs_surplusNum;
	}

	public String getCs_per() {
		return cs_per;
	}

	public void setCs_per(String cs_per) {
		this.cs_per = cs_per;
	}

	public Integer getEm_id() {
		return em_id;
	}

	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}

	public Double getCs_money() {
		return cs_money;
	}

	public void setCs_money(Double cs_money) {
		this.cs_money = cs_money;
	}

	public String getCsm_image() {
		return csm_image;
	}

	public void setCsm_image(String csm_image) {
		this.csm_image = csm_image;
	}

	public String getCsm_opinion() {
		return csm_opinion;
	}

	public void setCsm_opinion(String csm_opinion) {
		this.csm_opinion = csm_opinion;
	}

	public String getCsm_reason() {
		return csm_reason;
	}

	public void setCsm_reason(String csm_reason) {
		this.csm_reason = csm_reason;
	}

	public Integer getCsm_state() {
		return csm_state;
	}

	public void setCsm_state(Integer csm_state) {
		this.csm_state = csm_state;
	}

	public Integer getCsm_id() {
		return csm_id;
	}

	public void setCsm_id(Integer csm_id) {
		this.csm_id = csm_id;
	}

	public String getCtm_name() {
		return ctm_name;
	}

	public void setCtm_name(String ctm_name) {
		this.ctm_name = ctm_name;
	}

	public String getCtm_phone() {
		return ctm_phone;
	}

	public void setCtm_phone(String ctm_phone) {
		this.ctm_phone = ctm_phone;
	}

	public String getCtm_demand() {
		return ctm_demand;
	}

	public void setCtm_demand(String ctm_demand) {
		this.ctm_demand = ctm_demand;
	}

	public String getCtm_sex() {
		return ctm_sex;
	}

	public void setCtm_sex(String ctm_sex) {
		this.ctm_sex = ctm_sex;
	}

	public String getHi_code() {
		return hi_code;
	}

	public void setHi_code(String hi_code) {
		this.hi_code = hi_code;
	}

	public String getHi_address() {
		return hi_address;
	}

	public void setHi_address(String hi_address) {
		this.hi_address = hi_address;
	}

	public String getPropertyInfo_Name() {
		return propertyInfo_Name;
	}

	public void setPropertyInfo_Name(String propertyInfo_Name) {
		this.propertyInfo_Name = propertyInfo_Name;
	}

	public Integer getSize() {
		return size;
	}

	public void setSize(Integer size) {
		this.size = size;
	}

	public Integer getPageNo() {
		return pageNo;
	}

	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public String getSqlWhere() {
		return sqlWhere;
	}

	public void setSqlWhere(String sqlWhere) {
		this.sqlWhere = sqlWhere;
	}

}
