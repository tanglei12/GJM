package com.gjp.model;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 记账本
 * @author tanglei
 * date 2017年6月21日 上午11:08:46 
 */
public class ViewBillBookkeepBookVo {
	//记账本id
	private Integer bk_id;
	//记账类型 （0：收入，1：支出）
	private Integer bk_type;
	//记账用途
	private String bk_category;
	//自定义内容
	private String bk_custom;
	//用户id
	private Integer bk_em_id;
	//金额
	private BigDecimal bk_money;
	//支付方式
	private String bk_pay;
	//附件
	private String bk_enclasure;
	//备注
	private String bk_category_details;

	//状态(0;未报销 1;已报销)
	private Integer bk_state;
	//账单类型（0：公账，1：私账）
	private Integer bk_typee;
	//创建时间
	private Date bk_time;
	//用户名称
	private String em_name;
	//报销单号
	private String bk_number;
	//房屋编号
	private String bk_hi_code;
	//客户唯一编码
	private String bk_contractObject_1st;


	public Integer getBk_id() {
		return bk_id;
	}
	public void setBk_id(Integer bk_id) {
		this.bk_id = bk_id;
	}
	public Integer getBk_type() {
		return bk_type;
	}
	public void setBk_type(Integer bk_type) {
		this.bk_type = bk_type;
	}
	public String getBk_category() {
		return bk_category;
	}
	public void setBk_category(String bk_category) {
		this.bk_category = bk_category;
	}
	public String getBk_custom() {
		return bk_custom;
	}
	public void setBk_custom(String bk_custom) {
		this.bk_custom = bk_custom;
	}
	public Integer getBk_em_id() {
		return bk_em_id;
	}
	public void setBk_em_id(Integer bk_em_id) {
		this.bk_em_id = bk_em_id;
	}
	public BigDecimal getBk_money() {
		return bk_money;
	}
	public void setBk_money(BigDecimal bk_money) {
		this.bk_money = bk_money;
	}
	public String getBk_pay() {
		return bk_pay;
	}
	public void setBk_pay(String bk_pay) {
		this.bk_pay = bk_pay;
	}
	public String getBk_enclasure() {
		return bk_enclasure;
	}
	public void setBk_enclasure(String bk_enclasure) {
		this.bk_enclasure = bk_enclasure;
	}
	public String getBk_category_details() {
		return bk_category_details;
	}
	public void setBk_category_details(String bk_category_details) {
		this.bk_category_details = bk_category_details;
	}
	public Integer getBk_state() {
		return bk_state;
	}
	public void setBk_state(Integer bk_state) {
		this.bk_state = bk_state;
	}
	public Integer getBk_typee() {
		return bk_typee;
	}
	public void setBk_typee(Integer bk_typee) {
		this.bk_typee = bk_typee;
	}
	public Date getBk_time() {
		return bk_time;
	}
	public void setBk_time(Date bk_time) {
		this.bk_time = bk_time;
	}
	public String getEm_name() {
		return em_name;
	}
	public void setEm_name(String em_name) {
		this.em_name = em_name;
	}
	public String getBk_number() {
		return bk_number;
	}
	public void setBk_number(String bk_number) {
		this.bk_number = bk_number;
	}
	public String getBk_hi_code() {
		return bk_hi_code;
	}
	public void setBk_hi_code(String bk_hi_code) {
		this.bk_hi_code = bk_hi_code;
	}
	public String getBk_contractObject_1st() {
		return bk_contractObject_1st;
	}
	public void setBk_contractObject_1st(String bk_contractObject_1st) {
		this.bk_contractObject_1st = bk_contractObject_1st;
	}
}
