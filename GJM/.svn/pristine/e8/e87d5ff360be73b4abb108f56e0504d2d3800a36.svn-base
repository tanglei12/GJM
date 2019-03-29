package com.gjp.model;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * 合同账单对象
 *
 * @author 庆涛
 */
@Data
public class ContractBillVo implements Cloneable {

    // 账单ID
    private Integer bcb_id;
    // 账单code
    private String bcb_code;
    // 订单CODE
    private String bco_code;
    // 账单期数
    private Integer bcb_cycle;
    // 账单期数
    private String bcb_cycle_in;
    // 账单期数
    private Integer bcb_cycle_where;
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
    // 账单开始日期
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private Date bcb_startDate;
    // 账单终止日期
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private Date bcb_endDate;
    // 应还款时间之大于
    private Date bcb_repaymentDate_gt;
    // 实际还款时间
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private Date bcb_realPaymentDate;
    // 约定还款时间
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private Date bcb_agreedDate;
    // 账单状态（1：待审核、2：待还款、3：已还款、4：取消、5：未缴清、9:第三方、10：转租、11：退租、12：解约、13：清退、14：代偿）
    private Integer bcb_state;
    // 账单状态查询条件
    private Integer bcb_state_where;
    // 账单状态查询条件
    private Integer bcb_state_no;
    // 账单期数查询条件
    private String bcb_state_in;
    // 分期状态（1：未分期、2：已分期）
    private Integer bcb_instalment_state;
    // 预算状态（0：未预算、1：已预算、2：预算完成）
    private Integer bcb_budgetState;
    // 是否出账{1:"未出账",2:"已出账"}
    private Integer bcb_account_out;
    // 支付方式
    private String bcb_payWay;
    // 滞纳金
    private BigDecimal bcb_late_fee;
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
    // 收支对象-门店ID
    private Integer bcb_uccId;

    // --【扩展】-----------------

    // 日期周期
    private String bcb_dateCycle;

    // 合作伙伴
    private String bco_cooperater;
    // 预算日期
    private Date bbo_budgetDate;
    // 预算账单ID
    private Integer bbb_id;
    // 预算账单备注
    private String bbb_remarks;
    // 付款日期结束
    private Date repaymentEndDate;
    // 总应还款
    private BigDecimal totalRepayment;
    // 总实际支付金额
    private BigDecimal totalRealPayment;
    // 创建人(em_name)
    private String bcb_creatorName;
    // 操作人(em_name)
    private String bcb_operaterName;
    // 子账单
    private List<ContractBillVo> childs;

    // 扩展1----------------

    // 订单客户
    private String bco_customer;
    // 订单客户姓名
    private String bco_customerName;
    // 订单客户手机号
    private String bco_customerPhone;
    // 订单管家姓名
    private Integer bco_empId;
    // 订单管家姓名
    private String bco_empName;
    // 订单管家手机号
    private String bco_empPhone;
    // 房源编码
    private String hi_code;
    // 房屋房号
    private String house_address;
    // 订单总金额
    private Double sum_money;
    // 逾期天数
    private Integer overDueDay;
    // 服务点ID
    private Integer ucc_id;
    // 服务点名称
    private String ucc_name;
    // 服务点店长姓名
    private String ucc_person;
    // 服务点店长手机号
    private String ucc_phone;
    //
    private Integer bco_optionState;

    /**
     * 扩展2----------------
     */

    // 合同类型
    private String contractObject_Code;
    // 合同类型
    private String contractObject_No;
    // 合同类型
    private String contractObject_Type;
    // 合同类型
    private String contractObject_1st;
    // 支付类型
    private String contractBody_PayStyle;
    // 预算清单状态
    private Integer bbb_state;
    // 合同状态（1.审核 2.生效 3.失效 4.作废）
    private Integer contractObject_State;
    //合同编辑状态
    private Integer contractObject_OptionState;
    //签署日期
    private Date contractObject_FillTime;
    //起止日期
    private String contractBody_StartTOEnd;
    //月付方式（金融机构）
    private String contractBody_PayType;

    /**
     * 扩展3----------------
     */

    // 预算清单模式
    private String budget_mode;
    // 应还款时间
    private String tsb_repaymentDate_str;
    // 账单期数列表
    private List<?> billCycleList;
    // 账单期数
    private Integer totalCycle;

    private String[] repaymentDateArr;

    // 收支类型（0：收入、1：支出）注：相对公司而言
    private String bcb_balPay_str;

    // 账单类型
    private String bcb_type_str;

    /**
     * 扩展4 ------
     */
    // 用户编码
    private Integer em_id;
    // 管家
    private String em_name;
    // 管家电话
    private String em_phone;
    //父级公司编号
    private Integer ucc_pid;
    // 客户姓名
    private String cc_name;
    // 客户电话
    private String ccp_phone;

    /* 扩展5 -- */

    //房东 租金
    private BigDecimal LandlordRentNow;
    //房东 押金
    private BigDecimal LandlordDepositNow;
    //房东 其它费用
    private BigDecimal LandlordOtherNow;
    //租客 租金
    private BigDecimal TenantRentNow;
    //租客 押金
    private BigDecimal TenantDepositNow;
    //租客 其它
    private BigDecimal TenantOtherNow;

    /**
     * 往期
     */
    //房东 租金
    private BigDecimal LandlordRentOld;
    //房东 押金
    private BigDecimal LandlordDepositOld;
    //房东 其它费用
    private BigDecimal LandlordOtherOld;
    //租客 租金
    private BigDecimal TenantRentOld;
    //租客 押金
    private BigDecimal TenantDepositOld;
    //租客 其它
    private BigDecimal TenantOtherOld;

    //预算天数
    private Integer day;
    //条件
    private String where;
    //开始时间
    private String startDate;
    //结束时间
    private String endDate;

    @Override
    public ContractBillVo clone() {
        ContractBillVo contractBillVo = null;
        try {
            contractBillVo = (ContractBillVo) super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return contractBillVo;
    }
}
