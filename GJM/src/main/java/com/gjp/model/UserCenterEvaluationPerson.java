package com.gjp.model;

import java.util.Date;

/**
 * 测评人
 * 
 * @author zoe
 *
 */
public class UserCenterEvaluationPerson {

	// 测评人编码
	private Integer ep_id;
	// 测评人
	private String ep_name;
	// 测评性别
	private String ep_sex;
	// 测评电话
	private String ep_phone;
	// 创建时间
	private Date ep_time;
	// 分销账号编码
	private Integer uda_id;
	// 贷款状态
	private String ep_state;
	// 贷款金额
	private Double ep_money;
	// 分成金额
	private Double ep_wayMon;
	// 开放的产品
	private String ep_way;
	// 剩下的佣金
	private Double ep_leave;
	
	
	//扩展字段
	// 分得金额
	private Double ew_money;
	// 分得时间
	private Date ew_date;
	// 打款状态
	private String ew_state;
	// 分成编号
	private Integer ew_id;
	// '贷款','租房'
	private String ew_way;
	// 分成等级
	private String ew_grade;

	public UserCenterEvaluationPerson() {
		super();
	}

	public Integer getEp_id() {
		return ep_id;
	}

	public void setEp_id(Integer ep_id) {
		this.ep_id = ep_id;
	}

	public String getEp_name() {
		return ep_name;
	}

	public void setEp_name(String ep_name) {
		this.ep_name = ep_name;
	}

	public String getEp_sex() {
		return ep_sex;
	}

	public void setEp_sex(String ep_sex) {
		this.ep_sex = ep_sex;
	}

	public String getEp_phone() {
		return ep_phone;
	}

	public void setEp_phone(String ep_phone) {
		this.ep_phone = ep_phone;
	}

	public Date getEp_time() {
		return ep_time;
	}

	public void setEp_time(Date ep_time) {
		this.ep_time = ep_time;
	}

	public Integer getUda_id() {
		return uda_id;
	}

	public void setUda_id(Integer uda_id) {
		this.uda_id = uda_id;
	}

	public String getEp_state() {
		return ep_state;
	}

	public void setEp_state(String ep_state) {
		this.ep_state = ep_state;
	}

	public Double getEp_money() {
		return ep_money;
	}

	public void setEp_money(Double ep_money) {
		this.ep_money = ep_money;
	}

	public Double getEp_wayMon() {
		return ep_wayMon;
	}

	public void setEp_wayMon(Double ep_wayMon) {
		this.ep_wayMon = ep_wayMon;
	}

	public Double getEw_money() {
		return ew_money;
	}

	public void setEw_money(Double ew_money) {
		this.ew_money = ew_money;
	}

	public Date getEw_date() {
		return ew_date;
	}

	public void setEw_date(Date ew_date) {
		this.ew_date = ew_date;
	}

	public String getEw_state() {
		return ew_state;
	}

	public void setEw_state(String ew_state) {
		this.ew_state = ew_state;
	}

	public Integer getEw_id() {
		return ew_id;
	}

	public void setEw_id(Integer ew_id) {
		this.ew_id = ew_id;
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

	public String getEp_way() {
		return ep_way;
	}

	public void setEp_way(String ep_way) {
		this.ep_way = ep_way;
	}

	public Double getEp_leave() {
		return ep_leave;
	}

	public void setEp_leave(Double ep_leave) {
		this.ep_leave = ep_leave;
	}
	
}
