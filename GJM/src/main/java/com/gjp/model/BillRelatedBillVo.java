package com.gjp.model;

import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 关联账单对象
 * 
 * @author 庆涛
 *
 */
public class BillRelatedBillVo {

	// 账单ID
	private Integer rb_id;
	// 账单CODE
	private String rb_code;
	// 订单CODE
	private String ro_code;
	// 收支类型（0：支、1：收）注：相对公司而言
	private Integer rb_balPay;
	// 支付类型
	private Integer rb_type;
	// 支付金额
	private BigDecimal rb_paymentMoney;
	// 支付日期
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date rb_paymentDate;
	// 账单状态（1：未关联、2：已关联、3：已绑定）
	private Integer rb_state;
	// 支付方式
	private String rb_payWay;
	// 创建人
	private Integer rb_creator;
	// 备注
	private String rb_remarks;
	// 创建时间
	private Date rb_createTime;
	// 支付状态
	private Integer ro_payState;
	// 房屋code
	private String hi_code;

	/** 扩展 **/
	// 合同NO
	private String contractObject_No;
	// 创建人姓名
	private String rb_create_name;
	// 小区房号
	private String house_address;
	// 客户名称
	private String ro_customerName;
	// 客户电话
	private String ro_customerPhone;

	public Integer getRb_id() {
		return rb_id;
	}

	public void setRb_id(Integer rb_id) {
		this.rb_id = rb_id;
	}

	public String getRo_code() {
		return ro_code;
	}

	public void setRo_code(String ro_code) {
		this.ro_code = ro_code;
	}

	public Integer getRb_balPay() {
		return rb_balPay;
	}

	public void setRb_balPay(Integer rb_balPay) {
		this.rb_balPay = rb_balPay;
	}

	public Integer getRb_type() {
		return rb_type;
	}

	public void setRb_type(Integer rb_type) {
		this.rb_type = rb_type;
	}

	public BigDecimal getRb_paymentMoney() {
		return rb_paymentMoney;
	}

	public void setRb_paymentMoney(BigDecimal rb_paymentMoney) {
		this.rb_paymentMoney = rb_paymentMoney;
	}

	public Date getRb_paymentDate() {
		return rb_paymentDate;
	}

	public void setRb_paymentDate(Date rb_paymentDate) {
		this.rb_paymentDate = rb_paymentDate;
	}

	public Integer getRb_state() {
		return rb_state;
	}

	public void setRb_state(Integer rb_state) {
		this.rb_state = rb_state;
	}

	public String getRb_payWay() {
		return rb_payWay;
	}

	public void setRb_payWay(String rb_payWay) {
		this.rb_payWay = rb_payWay;
	}

	public Integer getRb_creator() {
		return rb_creator;
	}

	public void setRb_creator(Integer rb_creator) {
		this.rb_creator = rb_creator;
	}

	public String getRb_remarks() {
		return rb_remarks;
	}

	public void setRb_remarks(String rb_remarks) {
		this.rb_remarks = rb_remarks;
	}

	public Date getRb_createTime() {
		return rb_createTime;
	}

	public void setRb_createTime(Date rb_createTime) {
		this.rb_createTime = rb_createTime;
	}

	public String getContractObject_No() {
		return contractObject_No;
	}

	public void setContractObject_No(String contractObject_No) {
		this.contractObject_No = contractObject_No;
	}

	public String getRb_create_name() {
		return rb_create_name;
	}

	public void setRb_create_name(String rb_create_name) {
		this.rb_create_name = rb_create_name;
	}

	public String getRb_code() {
		return rb_code;
	}

	public void setRb_code(String rb_code) {
		this.rb_code = rb_code;
	}

	public Integer getRo_payState() {
		return ro_payState;
	}

	public void setRo_payState(Integer ro_payState) {
		this.ro_payState = ro_payState;
	}

	public String getHi_code() {
		return hi_code;
	}

	public void setHi_code(String hi_code) {
		this.hi_code = hi_code;
	}

	public String getRo_customerName() {
		return ro_customerName;
	}

	public void setRo_customerName(String ro_customerName) {
		this.ro_customerName = ro_customerName;
	}

	public String getRo_customerPhone() {
		return ro_customerPhone;
	}

	public void setRo_customerPhone(String ro_customerPhone) {
		this.ro_customerPhone = ro_customerPhone;
	}

	public String getHouse_address() {
		return house_address;
	}

	public void setHouse_address(String house_address) {
		this.house_address = house_address;
	}

}
