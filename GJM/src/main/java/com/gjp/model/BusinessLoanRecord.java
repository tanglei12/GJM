package com.gjp.model;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 借款表
 * @author tanglei
 * Date 2017年7月14日 下午 15:36:20
 */
public class BusinessLoanRecord {
	// 主键id
	private Integer bm_id;
	// 申请人类型 1.租客 2.房东
	private Integer bm_userState;  
	//申请人
	private String bm_name;
	// 申请人id
	private Integer bm_userId;
	// 身份证号
	private String bm_numCard;
	//联系方式
	private String bm_phone;
	//借款金额
	private BigDecimal bm_monery;
	// 借款用途
	private String bm_purpose;
	// 借款期限
	private Integer bm_days;
	//贷款状态 (1.待审核 2.已拒绝 3.待放款 4.已放款)
	private Integer bm_loan_state;
	//租约状态 1.正常 2.失效
	private Integer bm_lease_state;
	//申请时间
	private Date bm_apply_time;
	//处理结果
	private String bm_note;  
	//处理时间
	private Date bm_handleTime; 
	// 放贷方 1.第三方 2.公司
	private Integer bm_lender;
	//借款信息与租赁信息是否正常状态 1.正常 2.不正常
	private Integer bm_state;
	// 还款日期
	private Date bm_payment_time;
	
	// 借款处理表id
	private Integer lh_id;
	// 借款id
	private Integer lh_bmId;
	//审批人id
	private Integer lh_em_id;
	//审批内容
	private String lh_content;
	//状态 1.拒绝  2.通过
	private Integer lh_state;
	//处理时间
	private Date lh_time;
	
	public Integer getBm_id() {
		return bm_id;
	}
	public void setBm_id(Integer bm_id) {
		this.bm_id = bm_id;
	}
	public Integer getBm_userState() {
		return bm_userState;
	}
	public void setBm_userState(Integer bm_userState) {
		this.bm_userState = bm_userState;
	}
	public String getBm_name() {
		return bm_name;
	}
	public void setBm_name(String bm_name) {
		this.bm_name = bm_name;
	}
	public Integer getBm_userId() {
		return bm_userId;
	}
	public void setBm_userId(Integer bm_userId) {
		this.bm_userId = bm_userId;
	}
	public String getBm_numCard() {
		return bm_numCard;
	}
	public void setBm_numCard(String bm_numCard) {
		this.bm_numCard = bm_numCard;
	}
	public String getBm_phone() {
		return bm_phone;
	}
	public void setBm_phone(String bm_phone) {
		this.bm_phone = bm_phone;
	}
	public BigDecimal getBm_monery() {
		return bm_monery;
	}
	public void setBm_monery(BigDecimal bm_monery) {
		this.bm_monery = bm_monery;
	}
	public String getBm_purpose() {
		return bm_purpose;
	}
	public void setBm_purpose(String bm_purpose) {
		this.bm_purpose = bm_purpose;
	}
	public Integer getBm_days() {
		return bm_days;
	}
	public void setBm_days(Integer bm_days) {
		this.bm_days = bm_days;
	}
	public Integer getBm_loan_state() {
		return bm_loan_state;
	}
	public void setBm_loan_state(Integer bm_loan_state) {
		this.bm_loan_state = bm_loan_state;
	}
	public Integer getBm_lease_state() {
		return bm_lease_state;
	}
	public void setBm_lease_state(Integer bm_lease_state) {
		this.bm_lease_state = bm_lease_state;
	}
	public String getBm_note() {
		return bm_note;
	}
	public void setBm_note(String bm_note) {
		this.bm_note = bm_note;
	}
	public Date getBm_handleTime() {
		return bm_handleTime;
	}
	public void setBm_handleTime(Date bm_handleTime) {
		this.bm_handleTime = bm_handleTime;
	}
	public Date getBm_apply_time() {
		return bm_apply_time;
	}
	public void setBm_apply_time(Date bm_apply_time) {
		this.bm_apply_time = bm_apply_time;
	}
	public Integer getBm_state() {
		return bm_state;
	}
	public void setBm_state(Integer bm_state) {
		this.bm_state = bm_state;
	}
	public Date getBm_payment_time() {
		return bm_payment_time;
	}
	public void setBm_payment_time(Date bm_payment_time) {
		this.bm_payment_time = bm_payment_time;
	}
	public Integer getLh_id() {
		return lh_id;
	}
	public void setLh_id(Integer lh_id) {
		this.lh_id = lh_id;
	}
	public Integer getLh_bmId() {
		return lh_bmId;
	}
	public void setLh_bmId(Integer lh_bmId) {
		this.lh_bmId = lh_bmId;
	}
	public Integer getLh_em_id() {
		return lh_em_id;
	}
	public void setLh_em_id(Integer lh_em_id) {
		this.lh_em_id = lh_em_id;
	}
	public String getLh_content() {
		return lh_content;
	}
	public void setLh_content(String lh_content) {
		this.lh_content = lh_content;
	}
	public Integer getBm_lender() {
		return bm_lender;
	}
	public void setBm_lender(Integer bm_lender) {
		this.bm_lender = bm_lender;
	}
	public Integer getLh_state() {
		return lh_state;
	}
	public void setLh_state(Integer lh_state) {
		this.lh_state = lh_state;
	}
	public Date getLh_time() {
		return lh_time;
	}
	public void setLh_time(Date lh_time) {
		this.lh_time = lh_time;
	}
	
	
	
}
