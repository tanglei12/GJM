package com.gjp.model;

import java.util.Date;

/**
 * 维修跟踪
 * 
 * @author zoe
 *
 */
public class MaintenanceTracks {

	// 编号
	private Integer mtk_id;
	// 联系客户时间
	private Date mtk_start_time;
	// 预计结束时间
	private Date mtk_end_time;
	// 实际完成时间
	private Date mtk_real_time;
	// 特殊情况说明
	private String mtk_spe_cir;
	// 维修状态
	private String mtk_state;
	// 接单时间
	private Date mtk_createTime;
	// 接单人员
	private Integer em_id;
	// 申报单id
	private Integer md_id;
	// 费用列表
	private String moneyList;
	// 指派人ID
	private Integer appoint_id;
	// 指派时间
	private Date appoint_time;

	// ==扩展==
	private String em_name;
	private String em_phone;
	// 最近修改时间
	private Date mtk_updataTime;

	public Integer getMtk_id() {
		return mtk_id;
	}

	public void setMtk_id(Integer mtk_id) {
		this.mtk_id = mtk_id;
	}

	public Date getMtk_start_time() {
		return mtk_start_time;
	}

	public void setMtk_start_time(Date mtk_start_time) {
		this.mtk_start_time = mtk_start_time;
	}

	public Date getMtk_end_time() {
		return mtk_end_time;
	}

	public void setMtk_end_time(Date mtk_end_time) {
		this.mtk_end_time = mtk_end_time;
	}

	public Date getMtk_real_time() {
		return mtk_real_time;
	}

	public void setMtk_real_time(Date mtk_real_time) {
		this.mtk_real_time = mtk_real_time;
	}

	public String getMoneyList() {
		return moneyList;
	}

	public void setMoneyList(String moneyList) {
		this.moneyList = moneyList;
	}

	public String getMtk_spe_cir() {
		return mtk_spe_cir;
	}

	public void setMtk_spe_cir(String mtk_spe_cir) {
		this.mtk_spe_cir = mtk_spe_cir;
	}

	public String getMtk_state() {
		return mtk_state;
	}

	public void setMtk_state(String mtk_state) {
		this.mtk_state = mtk_state;
	}

	public Integer getEm_id() {
		return em_id;
	}

	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}

	public Integer getMd_id() {
		return md_id;
	}

	public void setMd_id(Integer md_id) {
		this.md_id = md_id;
	}

	public Date getMtk_createTime() {
		return mtk_createTime;
	}

	public void setMtk_createTime(Date mtk_createTime) {
		this.mtk_createTime = mtk_createTime;
	}

	public String getEm_name() {
		return em_name;
	}

	public void setEm_name(String em_name) {
		this.em_name = em_name;
	}

	public String getEm_phone() {
		return em_phone;
	}

	public void setEm_phone(String em_phone) {
		this.em_phone = em_phone;
	}

	public Date getMtk_updataTime() {
		return mtk_updataTime;
	}

	public void setMtk_updataTime(Date mtk_updataTime) {
		this.mtk_updataTime = mtk_updataTime;
	}

	public Integer getAppoint_id() {
		return appoint_id;
	}

	public void setAppoint_id(Integer appoint_id) {
		this.appoint_id = appoint_id;
	}

	public Date getAppoint_time() {
		return appoint_time;
	}

	public void setAppoint_time(Date appoint_time) {
		this.appoint_time = appoint_time;
	}
}
