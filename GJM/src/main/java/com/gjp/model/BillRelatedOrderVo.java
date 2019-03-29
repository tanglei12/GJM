package com.gjp.model;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 关联订单对象
 * 
 * @author 庆涛
 *
 */
public class BillRelatedOrderVo {

	// 订单ID
	private Integer ro_id;
	// 订单CODE
	private String ro_code;
	// 合同订单CODE
	private String bco_code;
	// 房源CODE
	private String hi_code;
	// 房源房号
	private String house_address;
	// 订单类型（1：房东、2：租客）
	private Integer ro_customerType;
	// 客户名称
	private String ro_customerName;
	// 客户电话
	private String ro_customerPhone;
	// 总金额
	private BigDecimal ro_totalMoney;
	// 订单状态（1：未支付、2：已支付、3：撤销）
	private Integer ro_payState;
	// 订单状态（1：未关联、2：已关联、3：已绑定）
	private Integer ro_state;
	// 创建人
	private Integer ro_creator;
	// 创建时间
	private Date ro_createTime;
	// 账单金额
	private Double rb_paymentMoney;
	// 账单类型
	private Integer rb_type;

	/** 扩展 **/
	// 合同NO
	private String contractObject_No;
	// 创建人姓名
	private String ro_create_name;
	// 支付方式
	private String rb_payWay;
	
	private String where;
	private Integer pageNo;
	private Integer pageSize;

	public Integer getRo_id() {
		return ro_id;
	}

	public void setRo_id(Integer ro_id) {
		this.ro_id = ro_id;
	}

	public String getRo_code() {
		return ro_code;
	}

	public void setRo_code(String ro_code) {
		this.ro_code = ro_code;
	}

	public String getHi_code() {
		return hi_code;
	}

	public void setHi_code(String hi_code) {
		this.hi_code = hi_code;
	}

	public String getHouse_address() {
		return house_address;
	}

	public void setHouse_address(String house_address) {
		this.house_address = house_address;
	}

	public Integer getRo_customerType() {
		return ro_customerType;
	}

	public void setRo_customerType(Integer ro_customerType) {
		this.ro_customerType = ro_customerType;
	}

	public String getRo_customerName() {
		return ro_customerName;
	}

	public void setRo_customerName(String ro_customerName) {
		this.ro_customerName = ro_customerName;
	}

	public Integer getRo_state() {
		return ro_state;
	}

	public void setRo_state(Integer ro_state) {
		this.ro_state = ro_state;
	}

	public Integer getRo_creator() {
		return ro_creator;
	}

	public void setRo_creator(Integer ro_creator) {
		this.ro_creator = ro_creator;
	}

	public Date getRo_createTime() {
		return ro_createTime;
	}

	public void setRo_createTime(Date ro_createTime) {
		this.ro_createTime = ro_createTime;
	}

	public String getContractObject_No() {
		return contractObject_No;
	}

	public void setContractObject_No(String contractObject_No) {
		this.contractObject_No = contractObject_No;
	}

	public String getRo_create_name() {
		return ro_create_name;
	}

	public void setRo_create_name(String ro_create_name) {
		this.ro_create_name = ro_create_name;
	}

	public BigDecimal getRo_totalMoney() {
		return ro_totalMoney;
	}

	public void setRo_totalMoney(BigDecimal ro_totalMoney) {
		this.ro_totalMoney = ro_totalMoney;
	}

	public String getRo_customerPhone() {
		return ro_customerPhone;
	}

	public void setRo_customerPhone(String ro_customerPhone) {
		this.ro_customerPhone = ro_customerPhone;
	}

	public String getBco_code() {
		return bco_code;
	}

	public void setBco_code(String bco_code) {
		this.bco_code = bco_code;
	}

	public Integer getRo_payState() {
		return ro_payState;
	}

	public void setRo_payState(Integer ro_payState) {
		this.ro_payState = ro_payState;
	}

	public Double getRb_paymentMoney() {
		return rb_paymentMoney;
	}

	public void setRb_paymentMoney(Double rb_paymentMoney) {
		this.rb_paymentMoney = rb_paymentMoney;
	}

	public Integer getPageNo() {
		return pageNo;
	}

	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getRb_type() {
		return rb_type;
	}

	public void setRb_type(Integer rb_type) {
		this.rb_type = rb_type;
	}

	public String getWhere() {
		return where;
	}

	public void setWhere(String where) {
		this.where = where;
	}

	public String getRb_payWay() {
		return rb_payWay;
	}

	public void setRb_payWay(String rb_payWay) {
		this.rb_payWay = rb_payWay;
	}
	
}
