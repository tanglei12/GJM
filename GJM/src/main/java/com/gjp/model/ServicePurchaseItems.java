package com.gjp.model;

import java.util.Date;

/**
 * 物品添置对象
 *
 * @author JiangQt
 * @createTime 2015年10月22日下午5:42:05
 */
public class ServicePurchaseItems {

	private Integer purchaseItems_id;//物品添置编号
	private String purchaseItems_type;//物品类型
	private String purchaseItems_name;//物品名称
	private String purchaseItems_source;//来源(购置、回收）
	private String purchaseItems_brand;//品牌
	private Float purchaseItems_cost;//价格
	private Integer purchaseItems_count;//数量
	private Float purchaseItems_totalCost;//总价
	private String hi_code;//房屋编码
	private String ContractObject_No;//合同编码
	private String purchaseItems_people;//哪个去办理的人
	private String purchaseItems_payObject;//付费对象
	private Date purchaseItems_time;//添置时间
	private String purchaseItems_remarks;//备注
	private Integer purchaseItems_state;//状态(0：正常、1：删除）
	private Integer purchaseItems_On;//新旧（0：新、1：旧）
	private Integer purchaseItems_Gb;//好坏（0：好、1：坏）

	// ======扩展
	private String type_name;//
	private String name_itmeName;//

	public Integer getPurchaseItems_id() {
		return purchaseItems_id;
	}

	public void setPurchaseItems_id(Integer purchaseItems_id) {
		this.purchaseItems_id = purchaseItems_id;
	}

	public String getPurchaseItems_name() {
		return purchaseItems_name;
	}

	public void setPurchaseItems_name(String purchaseItems_name) {
		this.purchaseItems_name = purchaseItems_name;
	}

	public String getPurchaseItems_brand() {
		return purchaseItems_brand;
	}

	public void setPurchaseItems_brand(String purchaseItems_brand) {
		this.purchaseItems_brand = purchaseItems_brand;
	}

	public Float getPurchaseItems_cost() {
		return purchaseItems_cost;
	}

	public void setPurchaseItems_cost(Float purchaseItems_cost) {
		this.purchaseItems_cost = purchaseItems_cost;
	}

	public Float getPurchaseItems_totalCost() {
		return purchaseItems_totalCost;
	}

	public void setPurchaseItems_totalCost(Float purchaseItems_totalCost) {
		this.purchaseItems_totalCost = purchaseItems_totalCost;
	}

	public String getHi_code() {
		return hi_code;
	}

	public void setHi_code(String hi_code) {
		this.hi_code = hi_code;
	}

	public String getContractObject_No() {
		return ContractObject_No;
	}

	public void setContractObject_No(String contractObject_No) {
		ContractObject_No = contractObject_No;
	}

	public String getPurchaseItems_people() {
		return purchaseItems_people;
	}

	public void setPurchaseItems_people(String purchaseItems_people) {
		this.purchaseItems_people = purchaseItems_people;
	}

	public String getPurchaseItems_payObject() {
		return purchaseItems_payObject;
	}

	public void setPurchaseItems_payObject(String purchaseItems_payObject) {
		this.purchaseItems_payObject = purchaseItems_payObject;
	}

	public Date getPurchaseItems_time() {
		return purchaseItems_time;
	}

	public void setPurchaseItems_time(Date purchaseItems_time) {
		this.purchaseItems_time = purchaseItems_time;
	}

	public String getPurchaseItems_remarks() {
		return purchaseItems_remarks;
	}

	public void setPurchaseItems_remarks(String purchaseItems_remarks) {
		this.purchaseItems_remarks = purchaseItems_remarks;
	}

	public String getType_name() {
		return type_name;
	}

	public void setType_name(String type_name) {
		this.type_name = type_name;
	}

	public String getName_itmeName() {
		return name_itmeName;
	}

	public void setName_itmeName(String name_itmeName) {
		this.name_itmeName = name_itmeName;
	}

	public Integer getPurchaseItems_state() {
		return purchaseItems_state;
	}

	public void setPurchaseItems_state(Integer purchaseItems_state) {
		this.purchaseItems_state = purchaseItems_state;
	}

	public String getPurchaseItems_type() {
		return purchaseItems_type;
	}

	public void setPurchaseItems_type(String purchaseItems_type) {
		this.purchaseItems_type = purchaseItems_type;
	}

	public String getPurchaseItems_source() {
		return purchaseItems_source;
	}

	public void setPurchaseItems_source(String purchaseItems_source) {
		this.purchaseItems_source = purchaseItems_source;
	}

	public Integer getPurchaseItems_On() {
		return purchaseItems_On;
	}

	public void setPurchaseItems_On(Integer purchaseItems_On) {
		this.purchaseItems_On = purchaseItems_On;
	}

	public Integer getPurchaseItems_Gb() {
		return purchaseItems_Gb;
	}

	public void setPurchaseItems_Gb(Integer purchaseItems_Gb) {
		this.purchaseItems_Gb = purchaseItems_Gb;
	}

	public Integer getPurchaseItems_count() {
		return purchaseItems_count;
	}

	public void setPurchaseItems_count(Integer purchaseItems_count) {
		this.purchaseItems_count = purchaseItems_count;
	}

}
