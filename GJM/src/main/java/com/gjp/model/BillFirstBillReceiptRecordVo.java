package com.gjp.model;

import java.util.Date;

/**
 * 首期账单收款记录对象
 *
 * @author JiangQt
 * @createTime 2015年12月11日上午11:59:42
 */
public class BillFirstBillReceiptRecordVo {

	// 收款记录编号
	private Integer bfrr_id;
	// 房屋编号
	private String hi_code;
	// 合同编号
	private String contractObject_code;
	// 账单编号
	private String tb_code;
	// 账单类型
	private Integer bfrr_type;
	// 收款方式
	private String bfrr_receiptWay;
	// 应收金额
	private double bfrr_receiptMoney;
	// 实收金额
	private double bfrr_realMoney;
	// 待收金额
	private double bfrr_dueInMoney;
	// 收款时间
	private Date bfrr_realDate;
	// 创建时间
	private Date bfrr_createTime;

	// 合同编号
	@Deprecated
	private String contractObject_no;

	public Integer getBfrr_id() {
		return bfrr_id;
	}

	public void setBfrr_id(Integer bfrr_id) {
		this.bfrr_id = bfrr_id;
	}

	@Deprecated
	public String getContractObject_no() {
		return contractObject_no;
	}

	@Deprecated
	public void setContractObject_no(String contractObject_no) {
		this.contractObject_no = contractObject_no;
	}

	public String getTb_code() {
		return tb_code;
	}

	public void setTb_code(String tb_code) {
		this.tb_code = tb_code;
	}

	public String getBfrr_receiptWay() {
		return bfrr_receiptWay;
	}

	public void setBfrr_receiptWay(String bfrr_receiptWay) {
		this.bfrr_receiptWay = bfrr_receiptWay;
	}

	public double getBfrr_receiptMoney() {
		return bfrr_receiptMoney;
	}

	public void setBfrr_receiptMoney(double bfrr_receiptMoney) {
		this.bfrr_receiptMoney = bfrr_receiptMoney;
	}

	public double getBfrr_realMoney() {
		return bfrr_realMoney;
	}

	public void setBfrr_realMoney(double bfrr_realMoney) {
		this.bfrr_realMoney = bfrr_realMoney;
	}

	public double getBfrr_dueInMoney() {
		return bfrr_dueInMoney;
	}

	public void setBfrr_dueInMoney(double bfrr_dueInMoney) {
		this.bfrr_dueInMoney = bfrr_dueInMoney;
	}

	public Date getBfrr_createTime() {
		return bfrr_createTime;
	}

	public void setBfrr_createTime(Date bfrr_createTime) {
		this.bfrr_createTime = bfrr_createTime;
	}

	public Integer getBfrr_type() {
		return bfrr_type;
	}

	public void setBfrr_type(Integer bfrr_type) {
		this.bfrr_type = bfrr_type;
	}

	public String getHi_code() {
		return hi_code;
	}

	public void setHi_code(String hi_code) {
		this.hi_code = hi_code;
	}

	public String getContractObject_code() {
		return contractObject_code;
	}

	public void setContractObject_code(String contractObject_code) {
		this.contractObject_code = contractObject_code;
	}

	public Date getBfrr_realDate() {
		return bfrr_realDate;
	}

	public void setBfrr_realDate(Date bfrr_realDate) {
		this.bfrr_realDate = bfrr_realDate;
	}

}
