package com.gjp.model;

import java.util.Date;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2015年12月6日 下午2:22:23 
 */
public class BillClearBill {

	//包月清洁账单编码
	private Integer cb_id;
	//订单号
	private String cb_code;
	//租客名称
	private String cb_name;
	//租客电话
	private String cb_phone;
	//账单状态
	private String cb_state;
	//应还款金额
	private Double cb_shouldMoney;
	//实际支付金额
	private Double cb_money;
	//支付方式
	private String cb_payWay;
	//保洁期数
	private String cb_payCycleNum;
	//实际保洁时间
	private Date cb_date;
	//支付流水号
	private String cb_statementNum;
	//数量
	private String size;
	
	public BillClearBill(){}

	public Integer getCb_id() {
		return cb_id;
	}

	public void setCb_id(Integer cb_id) {
		this.cb_id = cb_id;
	}

	public String getCb_code() {
		return cb_code;
	}

	public void setCb_code(String cb_code) {
		this.cb_code = cb_code;
	}

	public String getCb_name() {
		return cb_name;
	}

	public void setCb_name(String cb_name) {
		this.cb_name = cb_name;
	}

	public String getCb_phone() {
		return cb_phone;
	}

	public void setCb_phone(String cb_phone) {
		this.cb_phone = cb_phone;
	}

	public String getCb_state() {
		return cb_state;
	}

	public void setCb_state(String cb_state) {
		this.cb_state = cb_state;
	}

	public Double getCb_shouldMoney() {
		return cb_shouldMoney;
	}

	public void setCb_shouldMoney(Double cb_shouldMoney) {
		this.cb_shouldMoney = cb_shouldMoney;
	}

	public Double getCb_money() {
		return cb_money;
	}

	public void setCb_money(Double cb_money) {
		this.cb_money = cb_money;
	}

	public String getCb_payWay() {
		return cb_payWay;
	}

	public void setCb_payWay(String cb_payWay) {
		this.cb_payWay = cb_payWay;
	}

	public String getCb_payCycleNum() {
		return cb_payCycleNum;
	}

	public void setCb_payCycleNum(String cb_payCycleNum) {
		this.cb_payCycleNum = cb_payCycleNum;
	}

	public Date getCb_date() {
		return cb_date;
	}

	public void setCb_date(Date cb_date) {
		this.cb_date = cb_date;
	}

	public String getCb_statementNum() {
		return cb_statementNum;
	}

	public void setCb_statementNum(String cb_statementNum) {
		this.cb_statementNum = cb_statementNum;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}
	
}
