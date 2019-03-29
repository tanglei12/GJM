package com.gjp.model;

import java.util.Date;

public class UserEvaluateRecord {

	//编号
	private Integer uer_id;
	//用户账号
	private String user_account;
	//用户编号
	private Integer user_id;
	//评价类型
	private Integer uer_evaType;
	//评价评级
	private Integer uer_evaLv;
	//评价内容
	private String uer_content;
	//状态
	private Integer uer_state;
	//评价时间
	private Date uer_time;
	
	
	/**
	 * 构造方法
	 * */
	public UserEvaluateRecord() {
		super();
	}


	public UserEvaluateRecord(String user_account, Integer user_id,
			Integer uer_evaType, Integer uer_evaLv, String uer_content,
			Integer uer_state, Date uer_time) {
		super();
		this.user_account = user_account;
		this.user_id = user_id;
		this.uer_evaType = uer_evaType;
		this.uer_evaLv = uer_evaLv;
		this.uer_content = uer_content;
		this.uer_state = uer_state;
		this.uer_time = uer_time;
	}


	public Integer getUer_id() {
		return uer_id;
	}


	public void setUer_id(Integer uer_id) {
		this.uer_id = uer_id;
	}


	public String getUser_account() {
		return user_account;
	}


	public void setUser_account(String user_account) {
		this.user_account = user_account;
	}


	public Integer getUser_id() {
		return user_id;
	}


	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}


	public Integer getUer_evaType() {
		return uer_evaType;
	}


	public void setUer_evaType(Integer uer_evaType) {
		this.uer_evaType = uer_evaType;
	}


	public Integer getUer_evaLv() {
		return uer_evaLv;
	}


	public void setUer_evaLv(Integer uer_evaLv) {
		this.uer_evaLv = uer_evaLv;
	}


	public String getUer_content() {
		return uer_content;
	}


	public void setUer_content(String uer_content) {
		this.uer_content = uer_content;
	}


	public Integer getUer_state() {
		return uer_state;
	}


	public void setUer_state(Integer uer_state) {
		this.uer_state = uer_state;
	}


	public Date getUer_time() {
		return uer_time;
	}


	public void setUer_time(Date uer_time) {
		this.uer_time = uer_time;
	}


}
