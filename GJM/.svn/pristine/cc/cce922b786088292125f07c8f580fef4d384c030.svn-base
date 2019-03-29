package com.gjp.model;

import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @author JiangQt
 * @description
 * @date Created in 2017-8-5
 */
public class FinanceFrontMoneyBillBo {

    // 账单ID
    private Integer bcb_id;
    // 账单code
    private String bcb_code;
    // 订单CODE
    private String bco_code;
    // 账单期数
    private Integer bcb_cycle;
    // 账单类型（0：租金、1：押金、2：包修费、3：服务费）
    private Integer bcb_type;
    // 收支类型（0：收入、1：支出）注：相对公司而言
    private Integer bcb_balPay;
    // 应还款
    private BigDecimal bcb_repayment;
    // 实际支付金额
    private BigDecimal bcb_realPayment;
    // 未支付金额
    private BigDecimal bcb_balance;
    // 应还款时间
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private Date bcb_repaymentDate;
    // 实际还款时间
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private Date bcb_realPaymentDate;
    // 约定还款时间
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private Date bcb_agreedDate;
    // 账单状态（1：待审核、2：待还款、3：已还款、4：取消、5：未缴清、9:第三方、10：转租、11：退租、12：解约、13：清退、14：代偿）
    private Integer bcb_state;
    // 预算状态（0：未预算、1：已预算、2：预算完成）
    private Integer bcb_budgetState;
    // 支付方式
    private String bcb_payWay;
    // 逾期天数
    private Integer bcb_overdueDay;
    // 创建人(em_id)
    private Integer bcb_creator;
    // 操作人(em_id)
    private Integer bcb_operater;
    // 备注
    private String bcb_remarks;
    // 创建时间
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private Date bcb_createTime;
    // 是否代偿 1:是 0:否
    private Integer bcb_isRepay;
    //
    private String cc_name;
    //
    private String ccp_phone;
    //
    private String house_address;

    public Integer getBcb_id() {
        return bcb_id;
    }

    public void setBcb_id(Integer bcb_id) {
        this.bcb_id = bcb_id;
    }

    public String getBcb_code() {
        return bcb_code;
    }

    public void setBcb_code(String bcb_code) {
        this.bcb_code = bcb_code;
    }

    public String getBco_code() {
        return bco_code;
    }

    public void setBco_code(String bco_code) {
        this.bco_code = bco_code;
    }

    public Integer getBcb_cycle() {
        return bcb_cycle;
    }

    public void setBcb_cycle(Integer bcb_cycle) {
        this.bcb_cycle = bcb_cycle;
    }

    public Integer getBcb_type() {
        return bcb_type;
    }

    public void setBcb_type(Integer bcb_type) {
        this.bcb_type = bcb_type;
    }

    public Integer getBcb_balPay() {
        return bcb_balPay;
    }

    public void setBcb_balPay(Integer bcb_balPay) {
        this.bcb_balPay = bcb_balPay;
    }

    public BigDecimal getBcb_repayment() {
        return bcb_repayment;
    }

    public void setBcb_repayment(BigDecimal bcb_repayment) {
        this.bcb_repayment = bcb_repayment;
    }

    public BigDecimal getBcb_realPayment() {
        return bcb_realPayment;
    }

    public void setBcb_realPayment(BigDecimal bcb_realPayment) {
        this.bcb_realPayment = bcb_realPayment;
    }

    public BigDecimal getBcb_balance() {
        return bcb_balance;
    }

    public void setBcb_balance(BigDecimal bcb_balance) {
        this.bcb_balance = bcb_balance;
    }

    public Date getBcb_repaymentDate() {
        return bcb_repaymentDate;
    }

    public void setBcb_repaymentDate(Date bcb_repaymentDate) {
        this.bcb_repaymentDate = bcb_repaymentDate;
    }

    public Date getBcb_realPaymentDate() {
        return bcb_realPaymentDate;
    }

    public void setBcb_realPaymentDate(Date bcb_realPaymentDate) {
        this.bcb_realPaymentDate = bcb_realPaymentDate;
    }

    public Date getBcb_agreedDate() {
        return bcb_agreedDate;
    }

    public void setBcb_agreedDate(Date bcb_agreedDate) {
        this.bcb_agreedDate = bcb_agreedDate;
    }

    public Integer getBcb_state() {
        return bcb_state;
    }

    public void setBcb_state(Integer bcb_state) {
        this.bcb_state = bcb_state;
    }

    public Integer getBcb_budgetState() {
        return bcb_budgetState;
    }

    public void setBcb_budgetState(Integer bcb_budgetState) {
        this.bcb_budgetState = bcb_budgetState;
    }

    public String getBcb_payWay() {
        return bcb_payWay;
    }

    public void setBcb_payWay(String bcb_payWay) {
        this.bcb_payWay = bcb_payWay;
    }

    public Integer getBcb_overdueDay() {
        return bcb_overdueDay;
    }

    public void setBcb_overdueDay(Integer bcb_overdueDay) {
        this.bcb_overdueDay = bcb_overdueDay;
    }

    public Integer getBcb_creator() {
        return bcb_creator;
    }

    public void setBcb_creator(Integer bcb_creator) {
        this.bcb_creator = bcb_creator;
    }

    public Integer getBcb_operater() {
        return bcb_operater;
    }

    public void setBcb_operater(Integer bcb_operater) {
        this.bcb_operater = bcb_operater;
    }

    public String getBcb_remarks() {
        return bcb_remarks;
    }

    public void setBcb_remarks(String bcb_remarks) {
        this.bcb_remarks = bcb_remarks;
    }

    public Date getBcb_createTime() {
        return bcb_createTime;
    }

    public void setBcb_createTime(Date bcb_createTime) {
        this.bcb_createTime = bcb_createTime;
    }

    public Integer getBcb_isRepay() {
        return bcb_isRepay;
    }

    public void setBcb_isRepay(Integer bcb_isRepay) {
        this.bcb_isRepay = bcb_isRepay;
    }

    public String getCc_name() {
        return cc_name;
    }

    public void setCc_name(String cc_name) {
        this.cc_name = cc_name;
    }

    public String getCcp_phone() {
        return ccp_phone;
    }

    public void setCcp_phone(String ccp_phone) {
        this.ccp_phone = ccp_phone;
    }

    public String getHouse_address() {
        return house_address;
    }

    public void setHouse_address(String house_address) {
        this.house_address = house_address;
    }
}
