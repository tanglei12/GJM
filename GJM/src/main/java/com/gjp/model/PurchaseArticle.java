package com.gjp.model;

import java.util.Date;

/**
 * 合作伙伴
 * 
 * @author zoe
 *
 */
public class PurchaseArticle {

	// 采购单物品ID
	private Integer art_id;
	// 采购单物品唯一编码
	private String art_code;
	// 采购单唯一编码
	private String pur_code;
	// 物品类型(ID)
	private String art_type;
	// 物品名称(ID)
	private String art_name;
	// 物品品牌
	private String art_brand;
	// 物品单价
	private Double art_price;
	// 物品数量
	private Integer art_count;
	// 物品总价
	private Double art_priceSum;
	// 付费对象（公司/租客/房东）
	private String art_payer;
	// 创建时间
	private Date art_addTime;
	// 物品新旧
	private Integer art_on;
	// 物品规格
	private String art_spec;
	// 供货商
	private String art_supplier;
	// 备注
	private String art_remark;
	
	
	//GET  and  SET
	
	public Integer getArt_id() {
		return art_id;
	}
	public void setArt_id(Integer art_id) {
		this.art_id = art_id;
	}
	public String getArt_code() {
		return art_code;
	}
	public void setArt_code(String art_code) {
		this.art_code = art_code;
	}
	public String getPur_code() {
		return pur_code;
	}
	public void setPur_code(String pur_code) {
		this.pur_code = pur_code;
	}
	public String getArt_type() {
		return art_type;
	}
	public void setArt_type(String art_type) {
		this.art_type = art_type;
	}
	public String getArt_name() {
		return art_name;
	}
	public void setArt_name(String art_name) {
		this.art_name = art_name;
	}
	public String getArt_brand() {
		return art_brand;
	}
	public void setArt_brand(String art_brand) {
		this.art_brand = art_brand;
	}
	public Double getArt_price() {
		return art_price;
	}
	public void setArt_price(Double art_price) {
		this.art_price = art_price;
	}
	public Integer getArt_count() {
		return art_count;
	}
	public void setArt_count(Integer art_count) {
		this.art_count = art_count;
	}
	public Double getArt_priceSum() {
		return art_priceSum;
	}
	public void setArt_priceSum(Double art_priceSum) {
		this.art_priceSum = art_priceSum;
	}
	public String getArt_payer() {
		return art_payer;
	}
	public void setArt_payer(String art_payer) {
		this.art_payer = art_payer;
	}
	public Date getArt_addTime() {
		return art_addTime;
	}
	public void setArt_addTime(Date art_addTime) {
		this.art_addTime = art_addTime;
	}
	public Integer getArt_on() {
		return art_on;
	}
	public void setArt_on(Integer art_on) {
		this.art_on = art_on;
	}
	public String getArt_spec() {
		return art_spec;
	}
	public void setArt_spec(String art_spec) {
		this.art_spec = art_spec;
	}
	public String getArt_supplier() {
		return art_supplier;
	}
	public void setArt_supplier(String art_supplier) {
		this.art_supplier = art_supplier;
	}
	public String getArt_remark() {
		return art_remark;
	}
	public void setArt_remark(String art_remark) {
		this.art_remark = art_remark;
	}
	
	
	
	



	
	
	
}
