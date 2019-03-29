package com.gjp.model;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年4月11日 下午5:57:44 
 */
public class PropertyInfoApartmentLayout {

	// 户型编号
	private Integer pal_id;
	// 户型名称
	private String pal_name;
	// 户型类型
	private String pal_type;
	// 户型限价
	private Double pal_money;
	// 物业编号
	private Integer PropertyInfo_Id;
	
	public PropertyInfoApartmentLayout(){}

	public Integer getPal_id() {
		return pal_id;
	}

	public void setPal_id(Integer pal_id) {
		this.pal_id = pal_id;
	}

	public String getPal_name() {
		return pal_name;
	}

	public void setPal_name(String pal_name) {
		this.pal_name = pal_name;
	}

	public String getPal_type() {
		return pal_type;
	}

	public void setPal_type(String pal_type) {
		this.pal_type = pal_type;
	}

	public Double getPal_money() {
		return pal_money;
	}

	public void setPal_money(Double pal_money) {
		this.pal_money = pal_money;
	}

	public Integer getPropertyInfo_Id() {
		return PropertyInfo_Id;
	}

	public void setPropertyInfo_Id(Integer propertyInfo_Id) {
		PropertyInfo_Id = propertyInfo_Id;
	}
	
}
