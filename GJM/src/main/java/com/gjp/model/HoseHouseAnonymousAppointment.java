package com.gjp.model;

import java.util.Date;

/**
 * 房屋匿名预约记录
 * 
 * @author zoe
 *
 */
public class HoseHouseAnonymousAppointment {

	// 房屋预约记录编码
	private Integer haa_id;
	// 联系姓名
	private String haa_name;
	// 联系电话
	private String haa_phone;
	// 预约时间
	private Date haa_time;
	// 房屋信息编码
	private Integer hi_id;
	// 处理状态
	private Integer ha_operationState;
	

	public HoseHouseAnonymousAppointment() {
		super();
	}


	public Integer getHaa_id() {
		return haa_id;
	}


	public void setHaa_id(Integer haa_id) {
		this.haa_id = haa_id;
	}


	public String getHaa_name() {
		return haa_name;
	}


	public void setHaa_name(String haa_name) {
		this.haa_name = haa_name;
	}


	public String getHaa_phone() {
		return haa_phone;
	}


	public void setHaa_phone(String haa_phone) {
		this.haa_phone = haa_phone;
	}


	public Date getHaa_time() {
		return haa_time;
	}


	public void setHaa_time(Date haa_time) {
		this.haa_time = haa_time;
	}


	public Integer getHi_id() {
		return hi_id;
	}


	public void setHi_id(Integer hi_id) {
		this.hi_id = hi_id;
	}


	public Integer getHa_operationState() {
		return ha_operationState;
	}


	public void setHa_operationState(Integer ha_operationState) {
		this.ha_operationState = ha_operationState;
	}
	
}
