package com.gjp.model;

import java.util.Date;

public class HandoverPropertyDecorationVo {

	// 房屋装饰情况ID
	private Integer hpd_id;
	// 物业交接主表ID
	private Integer hpm_id;
	// 房间类型
	private String hpd_roomType;
	// 装饰类型
	private String hpd_decoType;
	// 装饰状态（0：无损、1：有损）
	private Integer hpd_decoState;
	// 描述
	private String hpd_desc;
	// 创建时间
	private Date hpd_createTime;

	public Integer getHpd_id() {
		return hpd_id;
	}

	public void setHpd_id(Integer hpd_id) {
		this.hpd_id = hpd_id;
	}

	public Integer getHpm_id() {
		return hpm_id;
	}

	public void setHpm_id(Integer hpm_id) {
		this.hpm_id = hpm_id;
	}

	public String getHpd_roomType() {
		return hpd_roomType;
	}

	public void setHpd_roomType(String hpd_roomType) {
		this.hpd_roomType = hpd_roomType;
	}

	public String getHpd_decoType() {
		return hpd_decoType;
	}

	public void setHpd_decoType(String hpd_decoType) {
		this.hpd_decoType = hpd_decoType;
	}

	public Integer getHpd_decoState() {
		return hpd_decoState;
	}

	public void setHpd_decoState(Integer hpd_decoState) {
		this.hpd_decoState = hpd_decoState;
	}

	public String getHpd_desc() {
		return hpd_desc;
	}

	public void setHpd_desc(String hpd_desc) {
		this.hpd_desc = hpd_desc;
	}

	public Date getHpd_createTime() {
		return hpd_createTime;
	}

	public void setHpd_createTime(Date hpd_createTime) {
		this.hpd_createTime = hpd_createTime;
	}

}
