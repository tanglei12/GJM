package com.gjp.model;

import java.util.Date;

/**
 * 分成
 * 
 * @author zoe
 *
 */
public class UserCenterSeparate {

	// 分成编号
	private Integer ew_id;
	// 分得金额
	private Double ew_money;
	// 分销账号编码
	private Integer uda_id;
	// 打款状态
	private String ew_state;
	// 测评人编码
	private String ep_id;
	// 分成百分比
	private Integer ew_percent;
	// 分得时间
	private Date ew_date;
	// 账单状态
	private String ew_way;
	// 账单等级
	private String ew_grade;

	
	//扩展信息
	// 分销账号
	private String uda_account;

	public UserCenterSeparate() {
		super();
	}

	public Integer getEw_id() {
		return ew_id;
	}

	public void setEw_id(Integer ew_id) {
		this.ew_id = ew_id;
	}

	public Double getEw_money() {
		return ew_money;
	}

	public void setEw_money(Double ew_money) {
		this.ew_money = ew_money;
	}

	public Integer getUda_id() {
		return uda_id;
	}

	public void setUda_id(Integer uda_id) {
		this.uda_id = uda_id;
	}

	public String getEw_state() {
		return ew_state;
	}

	public void setEw_state(String ew_state) {
		this.ew_state = ew_state;
	}

	public String getEp_id() {
		return ep_id;
	}

	public void setEp_id(String ep_id) {
		this.ep_id = ep_id;
	}

	public Integer getEw_percent() {
		return ew_percent;
	}

	public void setEw_percent(Integer ew_percent) {
		this.ew_percent = ew_percent;
	}

	public Date getEw_date() {
		return ew_date;
	}

	public void setEw_date(Date ew_date) {
		this.ew_date = ew_date;
	}

	public String getUda_account() {
		return uda_account;
	}

	public void setUda_account(String uda_account) {
		this.uda_account = uda_account;
	}

	public String getEw_way() {
		return ew_way;
	}

	public void setEw_way(String ew_way) {
		this.ew_way = ew_way;
	}

	public String getEw_grade() {
		return ew_grade;
	}

	public void setEw_grade(String ew_grade) {
		this.ew_grade = ew_grade;
	}

}
