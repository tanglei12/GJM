package com.gjp.model;

import java.util.Date;

/**
 * 意向房源跟进内容
 * 
 * @author zoe
 *
 */
public class HoueFollowContent {

	// 跟进内容编码
	private Integer ghfc_id;
	// 跟进结果
	private String ghfc_con;
	// 房源定价
	private Float ghfc_price;
	// 结果状态
	private String ghfc_con_sta;
	// 内部职员编号
	private Integer em_id;
	// 价格
	private Float ghfc_money;
	// 意向房源跟进编码
	private Integer ghf_id;
	// 状态原因
	private String ghfc_reason;
	// 提交时间
	private Date ghfc_date;
	//扩展字段


	public HoueFollowContent() {
		super();
	}


	public Integer getGhfc_id() {
		return ghfc_id;
	}


	public void setGhfc_id(Integer ghfc_id) {
		this.ghfc_id = ghfc_id;
	}


	public String getGhfc_con() {
		return ghfc_con;
	}


	public void setGhfc_con(String ghfc_con) {
		this.ghfc_con = ghfc_con;
	}


	public Float getGhfc_price() {
		return ghfc_price;
	}


	public void setGhfc_price(Float ghfc_price) {
		this.ghfc_price = ghfc_price;
	}


	public String getGhfc_con_sta() {
		return ghfc_con_sta;
	}


	public void setGhfc_con_sta(String ghfc_con_sta) {
		this.ghfc_con_sta = ghfc_con_sta;
	}


	public Integer getEm_id() {
		return em_id;
	}


	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}


	public Float getGhfc_money() {
		return ghfc_money;
	}


	public void setGhfc_money(Float ghfc_money) {
		this.ghfc_money = ghfc_money;
	}


	public Integer getGhf_id() {
		return ghf_id;
	}


	public void setGhf_id(Integer ghf_id) {
		this.ghf_id = ghf_id;
	}


	public String getGhfc_reason() {
		return ghfc_reason;
	}


	public void setGhfc_reason(String ghfc_reason) {
		this.ghfc_reason = ghfc_reason;
	}


	public Date getGhfc_date() {
		return ghfc_date;
	}


	public void setGhfc_date(Date ghfc_date) {
		this.ghfc_date = ghfc_date;
	}

	
	
}
