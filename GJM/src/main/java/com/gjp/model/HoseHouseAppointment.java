package com.gjp.model;

import java.util.Date;

/**
 * 房屋预约记录
 * 
 * @author zoe
 *
 */
public class HoseHouseAppointment {

	// 房屋预约记录编码
	private Integer ha_id;
	// 用户编码
	private Integer user_id;
	// 预约时间
	private Date ha_time;
	// 房屋编码
	private Integer hi_id;
	// 房屋预约类型编码
	private Integer hat_id;
	// 处理状态
	private Integer ha_operationState;
	

	public HoseHouseAppointment() {
		super();
	}


	public Integer getHa_id() {
		return ha_id;
	}


	public void setHa_id(Integer ha_id) {
		this.ha_id = ha_id;
	}


	public Integer getUser_id() {
		return user_id;
	}


	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}


	public Date getHa_time() {
		return ha_time;
	}


	public void setHa_time(Date ha_time) {
		this.ha_time = ha_time;
	}


	public Integer getHi_id() {
		return hi_id;
	}


	public void setHi_id(Integer hi_id) {
		this.hi_id = hi_id;
	}


	public Integer getHat_id() {
		return hat_id;
	}


	public void setHat_id(Integer hat_id) {
		this.hat_id = hat_id;
	}


	public Integer getHa_operationState() {
		return ha_operationState;
	}


	public void setHa_operationState(Integer ha_operationState) {
		this.ha_operationState = ha_operationState;
	}
	
}
