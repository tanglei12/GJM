package com.gjp.model;

/**
 *
 * @author JiangQt
 * @createTime 2015年9月26日下午2:53:22
 */
public class ViewProductHousePropertyListVo {

	private int hi_id;// 房屋编号
	private String propertyInfo_Name;// 物业名称
	private String propertyInfo_address;// 物业地址
	private String hi_address;// 房屋房号
	private String contract_intoStatus;// 存房合同状态
	private String contract_outStatus;// 出房合同状态
	private String he_peopleName;// 房东名称
	private String he_phone;// 房东名称
	private String hi_code;// 房屋编码
	private double hi_money;// 出房价格
	private double hi_keepMoney;// 存房价格
	private String hb_name;// 房屋品牌名称
	private String hi_version;// 房屋户型

	public int getHi_id() {
		return hi_id;
	}

	public void setHi_id(int hi_id) {
		this.hi_id = hi_id;
	}

	public String getHi_address() {
		return hi_address;
	}

	public void setHi_address(String hi_address) {
		this.hi_address = hi_address;
	}

	public String getHi_code() {
		return hi_code;
	}

	public void setHi_code(String hi_code) {
		this.hi_code = hi_code;
	}

	public double getHi_money() {
		return hi_money;
	}

	public void setHi_money(double hi_money) {
		this.hi_money = hi_money;
	}

	public String getHb_name() {
		return hb_name;
	}

	public void setHb_name(String hb_name) {
		this.hb_name = hb_name;
	}

	public String getPropertyInfo_address() {
		return propertyInfo_address;
	}

	public void setPropertyInfo_address(String propertyInfo_address) {
		this.propertyInfo_address = propertyInfo_address;
	}

	public String getContract_intoStatus() {
		return contract_intoStatus;
	}

	public void setContract_intoStatus(String contract_intoStatus) {
		this.contract_intoStatus = contract_intoStatus;
	}

	public String getContract_outStatus() {
		return contract_outStatus;
	}

	public void setContract_outStatus(String contract_outStatus) {
		this.contract_outStatus = contract_outStatus;
	}

	public String getHi_version() {
		return hi_version;
	}

	public void setHi_version(String hi_version) {
		this.hi_version = hi_version;
	}

	public double getHi_keepMoney() {
		return hi_keepMoney;
	}

	public void setHi_keepMoney(double hi_keepMoney) {
		this.hi_keepMoney = hi_keepMoney;
	}

	public String getHe_peopleName() {
		return he_peopleName;
	}

	public void setHe_peopleName(String he_peopleName) {
		this.he_peopleName = he_peopleName;
	}

	public String getHe_phone() {
		return he_phone;
	}

	public void setHe_phone(String he_phone) {
		this.he_phone = he_phone;
	}

	public String getPropertyInfo_Name() {
		return propertyInfo_Name;
	}

	public void setPropertyInfo_Name(String propertyInfo_Name) {
		this.propertyInfo_Name = propertyInfo_Name;
	}

}