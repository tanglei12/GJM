package com.gjp.model;

import java.util.Date;

/**
 * 客户跟进内容
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年8月7日 下午6:14:25 
 */
public class CutomerFollowUp {

	// 跟进内容记录ID
	private Integer ht_id;
	// 跟进内容
	private String ht_count;
	// 跟进内容方式: '电话','服务','带看','生活服务','其他帮助','提醒'
	private String ht_type;
	// 跟进内容记录时间
	private Date ht_time;
	// 跟进内容提醒时间
	private Date ht_remind_time;
	// 提醒内容
	private String ht_remind_count;
	// 客户唯一编码
	private String cc_code;
	// 跟进人
	private Integer em_id;
	// 0：手动添加；1:系统添加
	private Integer ht_houseType;
	//跟进人
	private String em_name;
	
	public CutomerFollowUp(){
		
	}

	public Integer getHt_id() {
		return ht_id;
	}

	public void setHt_id(Integer ht_id) {
		this.ht_id = ht_id;
	}

	public String getHt_count() {
		return ht_count;
	}

	public void setHt_count(String ht_count) {
		this.ht_count = ht_count;
	}

	public String getHt_type() {
		return ht_type;
	}

	public void setHt_type(String ht_type) {
		this.ht_type = ht_type;
	}

	public Date getHt_time() {
		return ht_time;
	}

	public void setHt_time(Date ht_time) {
		this.ht_time = ht_time;
	}

	public Date getHt_remind_time() {
		return ht_remind_time;
	}

	public void setHt_remind_time(Date ht_remind_time) {
		this.ht_remind_time = ht_remind_time;
	}

	public String getHt_remind_count() {
		return ht_remind_count;
	}

	public void setHt_remind_count(String ht_remind_count) {
		this.ht_remind_count = ht_remind_count;
	}

	public String getCc_code() {
		return cc_code;
	}

	public void setCc_code(String cc_code) {
		this.cc_code = cc_code;
	}

	public Integer getEm_id() {
		return em_id;
	}

	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}

	public Integer getHt_houseType() {
		return ht_houseType;
	}

	public void setHt_houseType(Integer ht_houseType) {
		this.ht_houseType = ht_houseType;
	}

	public String getEm_name() {
		return em_name;
	}

	public void setEm_name(String em_name) {
		this.em_name = em_name;
	}

}
