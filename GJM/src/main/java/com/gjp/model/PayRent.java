package com.gjp.model;

/**
 * 快速交租
 * @author zoe
 *
 */
public class PayRent {

	// 订单号
	private String to_code;
	// 房屋地址
	private String hi_address;
	// 租客名称
	private String to_name;
	// 租客电话
	private String to_phone;
	// 管家名称
	private String to_peopleName;
	// 管家电话
	private String to_peoplePhone;
	// 房屋代码
	private String hi_code;
	// 条件
	private String param;
	// 物业地址
	private String propertyInfo_address;
	
	
	
	//打租
	// 托管账单编码
	private String tso_code;
	// 租客名称
	private String tso_name;
	// 租客电话
	private String tso_phone;
	// 租客名称
	private String tso_peopleName;
	// 租客电话
	private String tso_peoplePhone;
	
	
	public PayRent() {
		super();
	}

	public String getTo_code() {
		return to_code;
	}


	public void setTo_code(String to_code) {
		this.to_code = to_code;
	}


	public String getHi_address() {
		return hi_address;
	}

	public void setHi_address(String hi_address) {
		this.hi_address = hi_address;
	}

	public String getTo_name() {
		return to_name;
	}

	public void setTo_name(String to_name) {
		this.to_name = to_name;
	}

	public String getTo_phone() {
		return to_phone;
	}

	public void setTo_phone(String to_phone) {
		this.to_phone = to_phone;
	}

	public String getTo_peopleName() {
		return to_peopleName;
	}

	public void setTo_peopleName(String to_peopleName) {
		this.to_peopleName = to_peopleName;
	}

	public String getTo_peoplePhone() {
		return to_peoplePhone;
	}

	public void setTo_peoplePhone(String to_peoplePhone) {
		this.to_peoplePhone = to_peoplePhone;
	}

	public String getHi_code() {
		return hi_code;
	}

	public void setHi_code(String hi_code) {
		this.hi_code = hi_code;
	}

	public String getParam() {
		return param;
	}

	public void setParam(String param) {
		this.param = param;
	}

	

	public String getTso_code() {
		return tso_code;
	}

	public void setTso_code(String tso_code) {
		this.tso_code = tso_code;
	}

	public String getTso_name() {
		return tso_name;
	}

	public void setTso_name(String tso_name) {
		this.tso_name = tso_name;
	}

	public String getTso_phone() {
		return tso_phone;
	}

	public void setTso_phone(String tso_phone) {
		this.tso_phone = tso_phone;
	}

	public String getPropertyInfo_address() {
		return propertyInfo_address;
	}

	public void setPropertyInfo_address(String propertyInfo_address) {
		this.propertyInfo_address = propertyInfo_address;
	}

	public String getTso_peopleName() {
		return tso_peopleName;
	}

	public void setTso_peopleName(String tso_peopleName) {
		this.tso_peopleName = tso_peopleName;
	}

	public String getTso_peoplePhone() {
		return tso_peoplePhone;
	}

	public void setTso_peoplePhone(String tso_peoplePhone) {
		this.tso_peoplePhone = tso_peoplePhone;
	}
	
	
}
