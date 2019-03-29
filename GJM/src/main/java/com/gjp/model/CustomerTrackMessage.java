package com.gjp.model;

import java.util.Date;

/**
 * 客户跟踪信息
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年2月24日 下午5:15:45 
 */
public class CustomerTrackMessage {

	//客户跟踪信息编码
	private Integer ctm_id;
	//客户姓名
	private String ctm_name;
	//客户电话
	private String ctm_phone;
	//客户电话
	private String ctm_demand;
	//客户是否公开状态  0：不公开  1：公开
	private Integer ctm_state;
	//内部人员编码
	private Integer em_id;
	//时间
	private Date ctm_date;
	//总数
	private Integer size;
	//当前页
	private Integer pageNo;
	//第几条
	private Integer pageSize;
	//共几页
	private Integer countSize;
	//性别
	private String ctm_sex;
	//客户是否跟进成功状态 0 没有 1成功
	private Integer ctm_userState;
	
	public CustomerTrackMessage(){}

	public Integer getCtm_id() {
		return ctm_id;
	}

	public void setCtm_id(Integer ctm_id) {
		this.ctm_id = ctm_id;
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

	public Integer getCtm_state() {
		return ctm_state;
	}

	public void setCtm_state(Integer ctm_state) {
		this.ctm_state = ctm_state;
	}

	public Integer getEm_id() {
		return em_id;
	}

	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}

	public Date getCtm_date() {
		return ctm_date;
	}

	public void setCtm_date(Date ctm_date) {
		this.ctm_date = ctm_date;
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

	public String getCtm_sex() {
		return ctm_sex;
	}

	public void setCtm_sex(String ctm_sex) {
		this.ctm_sex = ctm_sex;
	}

	public Integer getCountSize() {
		return countSize;
	}

	public void setCountSize(Integer countSize) {
		this.countSize = countSize;
	}

	public Integer getCtm_userState() {
		return ctm_userState;
	}

	public void setCtm_userState(Integer ctm_userState) {
		this.ctm_userState = ctm_userState;
	}

}
