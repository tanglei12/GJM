package com.gjp.model;

import java.util.Date;

/**
 * 物业交接能源卡对象
 * 
 * @author 庆涛
 *
 */
public class HandoverPropertyEnergyCardVo {

	// 能源卡ID
	private Integer hpec_id;
	// 房屋编号
	private String hi_code;
	// 能源卡类型
	private String hpec_type;
	// 能源卡卡号
	private String hpec_number;
	// 能源卡最新卡号
	private String hpec_newNumber;
	// 能源卡备注
	private String hpec_remark;
	// 创建时间
	private Date hpec_createTime;

	// ---- 扩展 ----

	// 能源卡数值ID
	private Integer hpv_id;
	// 能源卡类型
	private String hpv_type;
	// 物业交接单ID
	private Integer hpm_id;
	// 能源卡数值起始值
	private Integer hpv_start;
	// 能源卡数值截止值
	private Integer hpv_end;

	public Integer getHpec_id() {
		return hpec_id;
	}

	public void setHpec_id(Integer hpec_id) {
		this.hpec_id = hpec_id;
	}

	public String getHi_code() {
		return hi_code;
	}

	public void setHi_code(String hi_code) {
		this.hi_code = hi_code;
	}

	public String getHpec_type() {
		return hpec_type;
	}

	public void setHpec_type(String hpec_type) {
		this.hpec_type = hpec_type;
	}

	public String getHpec_number() {
		return hpec_number;
	}

	public void setHpec_number(String hpec_number) {
		this.hpec_number = hpec_number;
	}

	public String getHpec_newNumber() {
		return hpec_newNumber;
	}

	public void setHpec_newNumber(String hpec_newNumber) {
		this.hpec_newNumber = hpec_newNumber;
	}

	public String getHpec_remark() {
		return hpec_remark;
	}

	public void setHpec_remark(String hpec_remark) {
		this.hpec_remark = hpec_remark;
	}

	public Date getHpec_createTime() {
		return hpec_createTime;
	}

	public void setHpec_createTime(Date hpec_createTime) {
		this.hpec_createTime = hpec_createTime;
	}

	public Integer getHpv_start() {
		return hpv_start;
	}

	public void setHpv_start(Integer hpv_start) {
		this.hpv_start = hpv_start;
	}

	public Integer getHpv_end() {
		return hpv_end;
	}

	public void setHpv_end(Integer hpv_end) {
		this.hpv_end = hpv_end;
	}

	public Integer getHpv_id() {
		return hpv_id;
	}

	public void setHpv_id(Integer hpv_id) {
		this.hpv_id = hpv_id;
	}

	public String getHpv_type() {
		return hpv_type;
	}

	public void setHpv_type(String hpv_type) {
		this.hpv_type = hpv_type;
	}

	public Integer getHpm_id() {
		return hpm_id;
	}

	public void setHpm_id(Integer hpm_id) {
		this.hpm_id = hpm_id;
	}

}
