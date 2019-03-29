package com.gjp.model;

import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 预算账单对象
 * 
 * @author 庆涛
 *
 */
public class BudgetBillVo {

	// 预算清单ID
	private Integer bbb_id;
	// 预算清单CODE
	private String bbo_code;
	// 账单ID
	private Integer bill_id;
	// 支付方式
	private String bbb_paymentWay;
	// 周期段
	private String bbb_cycleSegment;
	// 备注
	private String bbb_remarks;
	// 申请人
	private Integer bbb_applicant;
	// 处理者r
	private Integer bbb_manager;
	// 创建时间
	private Date bbb_createTime;

	// ----扩展----

	// 账单CODE
	private String bill_code;
	// 账单期数
	private Integer bill_cycle;
	// 账单期数
	private Integer bill_balPay;
	// 账单类型
	private Integer bill_type;
	// 账单状态
	private Integer bill_state;
	// 账单状态
	private Integer bill_budgetState;
	// 账单应还款金额
	private BigDecimal bill_repayment;
	// 账单实际还款金额
	private BigDecimal bill_realpayment;
	// 账单未还款金额
	private BigDecimal bill_balance;
	// 账单还款日期
	private Date bill_repaymentDate;
	// 账单实际还款日期
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date bill_realpaymentDate;
	// 账单未还款还款日期
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date bill_balanceDate;

	// 合同纸质编号
	private String contractObject_code;
	// 合同纸质编号
	private String contractObject_No;
	// 合同类型
	private String contractObject_Type;
	// 房号
	private String house_address;
	// 房源编号
	private String house_code;
	// 总预算数量
	private Integer budgetTotalCount;
	// 未预算数量
	private Integer budgetWillCount;
	// 待预算数量
	private Integer budgetIngCount;
	// 已预算数量
	private Integer budgetEdCount;
	// 预算状态
	private String budgetState;

	// 支付银行
	private String bill_paymentWay;
	// 支付银行卡号
	private String bill_paymentBank;

	// // 银行账户
	// private String bbb_bankAccount;
	// // 银行卡
	// private String bbb_bankCard;
	// // 银行名称
	// private String bbb_bankName;

	// 收支类型
	// private Integer bbb_type;
	// 应还款
	// private BigDecimal bbb_repayment;
	// 预算状态（0：待预算、1：已预算）
	// private Integer bbb_state;

	public Integer getBbb_id() {
		return bbb_id;
	}

	public void setBbb_id(Integer bbb_id) {
		this.bbb_id = bbb_id;
	}

	public String getBbo_code() {
		return bbo_code;
	}

	public void setBbo_code(String bbo_code) {
		this.bbo_code = bbo_code;
	}

	public Integer getBill_id() {
		return bill_id;
	}

	public void setBill_id(Integer bill_id) {
		this.bill_id = bill_id;
	}

	public String getBbb_paymentWay() {
		return bbb_paymentWay;
	}

	public void setBbb_paymentWay(String bbb_paymentWay) {
		this.bbb_paymentWay = bbb_paymentWay;
	}

	public String getBbb_cycleSegment() {
		return bbb_cycleSegment;
	}

	public void setBbb_cycleSegment(String bbb_cycleSegment) {
		this.bbb_cycleSegment = bbb_cycleSegment;
	}

	public String getBbb_remarks() {
		return bbb_remarks;
	}

	public void setBbb_remarks(String bbb_remarks) {
		this.bbb_remarks = bbb_remarks;
	}

	public Integer getBbb_applicant() {
		return bbb_applicant;
	}

	public void setBbb_applicant(Integer bbb_applicant) {
		this.bbb_applicant = bbb_applicant;
	}

	public Integer getBbb_manager() {
		return bbb_manager;
	}

	public void setBbb_manager(Integer bbb_manager) {
		this.bbb_manager = bbb_manager;
	}

	public Date getBbb_createTime() {
		return bbb_createTime;
	}

	public void setBbb_createTime(Date bbb_createTime) {
		this.bbb_createTime = bbb_createTime;
	}

	public String getBill_code() {
		return bill_code;
	}

	public void setBill_code(String bill_code) {
		this.bill_code = bill_code;
	}

	public Integer getBill_cycle() {
		return bill_cycle;
	}

	public void setBill_cycle(Integer bill_cycle) {
		this.bill_cycle = bill_cycle;
	}

	public Integer getBill_type() {
		return bill_type;
	}

	public void setBill_type(Integer bill_type) {
		this.bill_type = bill_type;
	}

	public Integer getBill_state() {
		return bill_state;
	}

	public void setBill_state(Integer bill_state) {
		this.bill_state = bill_state;
	}

	public Date getBill_repaymentDate() {
		return bill_repaymentDate;
	}

	public void setBill_repaymentDate(Date bill_repaymentDate) {
		this.bill_repaymentDate = bill_repaymentDate;
	}

	public BigDecimal getBill_realpayment() {
		return bill_realpayment;
	}

	public void setBill_realpayment(BigDecimal bill_realpayment) {
		this.bill_realpayment = bill_realpayment;
	}

	public Date getBill_realpaymentDate() {
		return bill_realpaymentDate;
	}

	public void setBill_realpaymentDate(Date bill_realpaymentDate) {
		this.bill_realpaymentDate = bill_realpaymentDate;
	}

	public BigDecimal getBill_balance() {
		return bill_balance;
	}

	public void setBill_balance(BigDecimal bill_balance) {
		this.bill_balance = bill_balance;
	}

	public Date getBill_balanceDate() {
		return bill_balanceDate;
	}

	public void setBill_balanceDate(Date bill_balanceDate) {
		this.bill_balanceDate = bill_balanceDate;
	}

	public String getContractObject_code() {
		return contractObject_code;
	}

	public void setContractObject_code(String contractObject_code) {
		this.contractObject_code = contractObject_code;
	}

	public String getContractObject_No() {
		return contractObject_No;
	}

	public void setContractObject_No(String contractObject_No) {
		this.contractObject_No = contractObject_No;
	}

	public String getContractObject_Type() {
		return contractObject_Type;
	}

	public void setContractObject_Type(String contractObject_Type) {
		this.contractObject_Type = contractObject_Type;
	}

	public String getHouse_address() {
		return house_address;
	}

	public void setHouse_address(String house_address) {
		this.house_address = house_address;
	}

	public String getHouse_code() {
		return house_code;
	}

	public void setHouse_code(String house_code) {
		this.house_code = house_code;
	}

	public Integer getBudgetTotalCount() {
		return budgetTotalCount;
	}

	public void setBudgetTotalCount(Integer budgetTotalCount) {
		this.budgetTotalCount = budgetTotalCount;
	}

	public Integer getBudgetWillCount() {
		return budgetWillCount;
	}

	public void setBudgetWillCount(Integer budgetWillCount) {
		this.budgetWillCount = budgetWillCount;
	}

	public Integer getBudgetIngCount() {
		return budgetIngCount;
	}

	public void setBudgetIngCount(Integer budgetIngCount) {
		this.budgetIngCount = budgetIngCount;
	}

	public Integer getBudgetEdCount() {
		return budgetEdCount;
	}

	public void setBudgetEdCount(Integer budgetEdCount) {
		this.budgetEdCount = budgetEdCount;
	}

	public String getBudgetState() {
		return budgetState;
	}

	public void setBudgetState(String budgetState) {
		this.budgetState = budgetState;
	}

	public String getBill_paymentWay() {
		return bill_paymentWay;
	}

	public void setBill_paymentWay(String bill_paymentWay) {
		this.bill_paymentWay = bill_paymentWay;
	}

	public String getBill_paymentBank() {
		return bill_paymentBank;
	}

	public void setBill_paymentBank(String bill_paymentBank) {
		this.bill_paymentBank = bill_paymentBank;
	}

	public BigDecimal getBill_repayment() {
		return bill_repayment;
	}

	public void setBill_repayment(BigDecimal bill_repayment) {
		this.bill_repayment = bill_repayment;
	}

	public Integer getBill_budgetState() {
		return bill_budgetState;
	}

	public void setBill_budgetState(Integer bill_budgetState) {
		this.bill_budgetState = bill_budgetState;
	}

	public Integer getBill_balPay() {
		return bill_balPay;
	}

	public void setBill_balPay(Integer bill_balPay) {
		this.bill_balPay = bill_balPay;
	}

}
