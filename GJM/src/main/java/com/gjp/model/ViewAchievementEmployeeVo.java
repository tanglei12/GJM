package com.gjp.model;

import java.util.List;

/**
 * 视图--业绩人员对象
 * 
 * @author 庆涛
 *
 */
public class ViewAchievementEmployeeVo {

	// 个人业绩id
	private Integer pa_id;
	// 个人总业绩
	private double pa_sum;
	// 个人新业绩
	private double pa_new;
	// 人员编号
	private Integer em_id;
	// 总业绩目标编号
	private Integer ca_id;
	// 人员名称
	private String em_name;
	// 人员性别
	private String em_sex;
	// 手机
	private String em_phone;
	// code
	private String em_code;
	// 人员状态
	private Integer em_state;
	// 在职状态
	private Integer em_jobState;
	// 职位编号
	private Integer em_chiefPos;
	//
	private Integer ucc_id;
	// 公司名称
	private String ucc_name;
	// 公司简称
	private String ucc_short;
	// 组织类型
	private String ucc_type;
	// 父级公司编号
	private Integer ucc_pid;
	// 公司负责人
	private String ucc_corporation;
	// 公司电话
	private String ucc_phone;

	// -- 扩展1 --
	// 旧业绩金额
	private Double ab_oldMoney;
	// 新业绩金额
	private Double ab_newMoney;
	// 总业绩金额
	private Double ab_sumMoney;

	// -- 扩展2 --
	private AchievementBill achievementBill;
	private List<AchievementBill> achievementBillList;

	public Integer getPa_id() {
		return pa_id;
	}

	public void setPa_id(Integer pa_id) {
		this.pa_id = pa_id;
	}

	public double getPa_sum() {
		return pa_sum;
	}

	public void setPa_sum(double pa_sum) {
		this.pa_sum = pa_sum;
	}

	public double getPa_new() {
		return pa_new;
	}

	public void setPa_new(double pa_new) {
		this.pa_new = pa_new;
	}

	public Integer getEm_id() {
		return em_id;
	}

	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}

	public Integer getCa_id() {
		return ca_id;
	}

	public void setCa_id(Integer ca_id) {
		this.ca_id = ca_id;
	}

	public String getEm_name() {
		return em_name;
	}

	public void setEm_name(String em_name) {
		this.em_name = em_name;
	}

	public String getEm_sex() {
		return em_sex;
	}

	public void setEm_sex(String em_sex) {
		this.em_sex = em_sex;
	}

	public String getEm_phone() {
		return em_phone;
	}

	public void setEm_phone(String em_phone) {
		this.em_phone = em_phone;
	}

	public String getEm_code() {
		return em_code;
	}

	public void setEm_code(String em_code) {
		this.em_code = em_code;
	}

	public Integer getEm_state() {
		return em_state;
	}

	public void setEm_state(Integer em_state) {
		this.em_state = em_state;
	}

	public Integer getEm_jobState() {
		return em_jobState;
	}

	public void setEm_jobState(Integer em_jobState) {
		this.em_jobState = em_jobState;
	}

	public Integer getEm_chiefPos() {
		return em_chiefPos;
	}

	public void setEm_chiefPos(Integer em_chiefPos) {
		this.em_chiefPos = em_chiefPos;
	}

	public Integer getUcc_id() {
		return ucc_id;
	}

	public void setUcc_id(Integer ucc_id) {
		this.ucc_id = ucc_id;
	}

	public String getUcc_name() {
		return ucc_name;
	}

	public void setUcc_name(String ucc_name) {
		this.ucc_name = ucc_name;
	}

	public String getUcc_short() {
		return ucc_short;
	}

	public void setUcc_short(String ucc_short) {
		this.ucc_short = ucc_short;
	}

	public String getUcc_type() {
		return ucc_type;
	}

	public void setUcc_type(String ucc_type) {
		this.ucc_type = ucc_type;
	}

	public Integer getUcc_pid() {
		return ucc_pid;
	}

	public void setUcc_pid(Integer ucc_pid) {
		this.ucc_pid = ucc_pid;
	}

	public String getUcc_corporation() {
		return ucc_corporation;
	}

	public void setUcc_corporation(String ucc_corporation) {
		this.ucc_corporation = ucc_corporation;
	}

	public String getUcc_phone() {
		return ucc_phone;
	}

	public void setUcc_phone(String ucc_phone) {
		this.ucc_phone = ucc_phone;
	}

	public List<AchievementBill> getAchievementBillList() {
		return achievementBillList;
	}

	public void setAchievementBillList(List<AchievementBill> achievementBillList) {
		this.achievementBillList = achievementBillList;
	}

	public Double getAb_oldMoney() {
		return ab_oldMoney;
	}

	public void setAb_oldMoney(Double ab_oldMoney) {
		this.ab_oldMoney = ab_oldMoney;
	}

	public Double getAb_newMoney() {
		return ab_newMoney;
	}

	public void setAb_newMoney(Double ab_newMoney) {
		this.ab_newMoney = ab_newMoney;
	}

	public Double getAb_sumMoney() {
		return ab_sumMoney;
	}

	public void setAb_sumMoney(Double ab_sumMoney) {
		this.ab_sumMoney = ab_sumMoney;
	}

	public AchievementBill getAchievementBill() {
		return achievementBill;
	}

	public void setAchievementBill(AchievementBill achievementBill) {
		this.achievementBill = achievementBill;
	}

}
