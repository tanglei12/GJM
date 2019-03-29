package com.gjp.model;

import java.util.Date;

/**
 * 物品库存
 * 
 * @author 秦莎
 *
 * @version 创建时间：2016年8月10日 下午14:39:31
 */
public class ItemsInventory {
	//物品库ID
	private Integer inv_id;
	//物品库唯一编码
	private String inv_code;
	//物品类型
	private String inv_type;
	//物品名称
	private String inv_name;
	//物品品牌
	private String inv_brand;
	//物品价格
	private Double inv_price;
	//物品数量
	private Integer inv_count=1;
	//物品总价
	private Double inv_priceSum;
	//办理人
	private Integer em_id;
	//付费对象
	private String inv_payer;
	//创建时间
	private Date inv_createTime;
	//物品状态（0：未使用；1：使用中）
	private Integer inv_state;
	//物品新旧（0：新；1：旧）
	private Integer inv_on;
	//物品好坏（0：好；1：坏）
	private Integer inv_gb;
	//备注
	private String inv_remark;
	//物品位置
	private String inv_position;
	//供货商
	private String inv_supplier;
	//是否扣除业绩
	private Integer ir_isCalAchi;
	//采购单物品唯一编码
	private String art_code;
	//物品类型名称
	private String type_name;
	//物品名称（名称）
	private String name_name;
	//开始数量
	private Integer start;
	//每页数量
	private Integer end;
	
	/**
	 * GET and SET
	 */
	
	public Integer getInv_id() {
		return inv_id;
	}
	public void setInv_id(Integer inv_id) {
		this.inv_id = inv_id;
	}
	public String getInv_code() {
		return inv_code;
	}
	public void setInv_code(String inv_code) {
		this.inv_code = inv_code;
	}
	public String getInv_type() {
		return inv_type;
	}
	public void setInv_type(String inv_type) {
		this.inv_type = inv_type;
	}
	public String getInv_name() {
		return inv_name;
	}
	public void setInv_name(String inv_name) {
		this.inv_name = inv_name;
	}
	public String getInv_brand() {
		return inv_brand;
	}
	public void setInv_brand(String inv_brand) {
		this.inv_brand = inv_brand;
	}
	public Double getInv_price() {
		return inv_price;
	}
	public void setInv_price(Double inv_price) {
		this.inv_price = inv_price;
	}
	public Integer getInv_count() {
		return inv_count;
	}
	public void setInv_count(Integer inv_count) {
		this.inv_count = inv_count;
	}
	public Double getInv_priceSum() {
		return inv_priceSum;
	}
	public void setInv_priceSum(Double inv_priceSum) {
		this.inv_priceSum = inv_priceSum;
	}
	public Integer getEm_id() {
		return em_id;
	}
	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}
	public String getInv_payer() {
		return inv_payer;
	}
	public void setInv_payer(String inv_payer) {
		this.inv_payer = inv_payer;
	}
	public Date getInv_createTime() {
		return inv_createTime;
	}
	public void setInv_createTime(Date inv_createTime) {
		this.inv_createTime = inv_createTime;
	}
	public Integer getInv_state() {
		return inv_state;
	}
	public void setInv_state(Integer inv_state) {
		this.inv_state = inv_state;
	}
	public Integer getInv_on() {
		return inv_on;
	}
	public void setInv_on(Integer inv_on) {
		this.inv_on = inv_on;
	}
	public Integer getInv_gb() {
		return inv_gb;
	}
	public void setInv_gb(Integer inv_gb) {
		this.inv_gb = inv_gb;
	}
	public String getInv_remark() {
		return inv_remark;
	}
	public void setInv_remark(String inv_remark) {
		this.inv_remark = inv_remark;
	}
	public String getInv_position() {
		return inv_position;
	}
	public void setInv_position(String inv_position) {
		this.inv_position = inv_position;
	}
	public String getInv_supplier() {
		return inv_supplier;
	}
	public void setInv_supplier(String inv_supplier) {
		this.inv_supplier = inv_supplier;
	}
	public Integer getIr_isCalAchi() {
		return ir_isCalAchi;
	}
	public void setIr_isCalAchi(Integer ir_isCalAchi) {
		this.ir_isCalAchi = ir_isCalAchi;
	}
	public String getArt_code() {
		return art_code;
	}
	public void setArt_code(String art_code) {
		this.art_code = art_code;
	}
	public Integer getStart() {
		return start;
	}
	public void setStart(Integer start) {
		this.start = start;
	}
	public Integer getEnd() {
		return end;
	}
	public void setEnd(Integer end) {
		this.end = end;
	}
	public String getType_name() {
		return type_name;
	}
	public void setType_name(String type_name) {
		this.type_name = type_name;
	}
	public String getName_name() {
		return name_name;
	}
	public void setName_name(String name_name) {
		this.name_name = name_name;
	}	
	
	
}
