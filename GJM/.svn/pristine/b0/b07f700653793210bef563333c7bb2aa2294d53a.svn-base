package com.gjp.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * 合同订单对象
 *
 * @author 庆涛
 * @from GJP_Bill_ContractOrder
 */
@Data
public class ContractOrderVo {

    // 租客订单编码
    private Integer bco_id;
    // 订单号
    private String bco_code;
    // 订单标题
    private String bco_title;
    // 订单描述
    private String bco_description;
    // 房源CODE
    private String hi_code;
    // 合同唯一编号
    private String contractObject_code;
    // 合同唯一编号
    private String ContractObject_code_where;
    // 是否绑定合同
    private Boolean onContractCode;
    // 订单类型（1：合同订单、2：服务订单、3：结算订单、4：定金订单）
    private Integer bco_orderType;
    // 账单类型（201：托管合同、202：租赁合同）
    private Integer bco_type;
    // 付费对象 1-客户；2-管家；3-门店
    private Integer bco_payObject;
    // 外部用户ID
    private Integer bco_userId;
    // 客户
    private String bco_customer;
    // 管家
    private Integer bco_butler;
    // 收支类型（0：收入、1：支出）注：相对公司而言
    private Integer bco_currentBalPay;
    // 账单当前期数
    private Integer bco_currentCycle;
    // 账单当前应支付金额
    private BigDecimal bco_currentPayment;
    // 账单当前期数
    private Date bco_currentDate;
    // 账单当前期数
    private Date bco_currentDate_lt;
    // 账单总期数
    private Integer bco_totalCycle;
    // 订单状态(1：正常、2：失效、3：取消)
    private Integer bco_state;
    // 支付状态（1：待审核、2：待还款、3：完结、4：取消、10：转租、11：退租:、12：解约、13：清退、14：代偿）
    private Integer bco_optionState;
    // 支付状态（1：待审核、2：待还款、3：完结、4：取消、10：转租、11：退租:、12：解约、13：清退、14：代偿）
    private String bco_optionState_in;
    // 合作伙伴（管家婆、58分期）
    private String bco_cooperater;
    // 逾期期数
    private Integer bco_currentOverCycle;
    // 订单生成时间
    private Date bco_createTime;
    //失效时间
    private Date bco_invalidTime;
    // 收支对象—门店ID
    private Integer bco_uccId;
    // 账单头像
    private String bco_poto;

    /**
     * 扩展1----------------
     */

    // 订单客户姓名
    private String bco_customerName;
    // 订单客户手机号
    private String bco_customerPhone;
    // 订单管家姓名
    private String bco_empName;
    // 订单管家手机号
    private String bco_empPhone;
    // 房屋房号
    private String house_address;
    // 当期应支付
    private Integer bcb_budgetState;
    // 当期应支付
    private Double bcb_repayment;
    // 当期应支付时间
    private Date bcb_repaymentDate;
    // 订单总金额
    private BigDecimal bco_totalPayment;
    // 逾期天数
    private Integer bco_currentOverDay;
    // 服务点
    private Integer ucc_id;
    // 服务点
    private String ucc_name;
    // 内部人员编码
    private Integer em_id;

    /**
     * 合同信息----------------
     */

    // 合同编号
    private String ContractObject_No;
    // 合同状态
    private Integer ContractObject_State;
    // 合同类型
    private String contractObject_Type;
    // 甲方
    private String contractObject_1st;
    // 支付类型
    private String contractBody_PayStyle;
    // 合同生效日期
    private Date ContractObject_Date;
    // 合同过期时间
    private Date ContractObject_DeadlineTime;
    // 合同超期天数
    private Integer contractObject_dateDiff;

    /**
     * 扩展3----------------
     */

    // 预算清单ID
    private Integer bbb_id;
    // 预算清单状态
    private Integer bbb_state;
    // 预算清单模式
    private String budget_mode;
    // 应还款时间
    private String tsb_repaymentDate_str;
    // 账单期数列表
    private List<?> billCycleList;
    // 账单金额
    private BigDecimal totalRePayment;
    // 账单期数
    private Integer totalCycle;

    private Integer pageNo;
    private Integer pageSize;
    private String where;

    private Integer so_id;

    /**
     * 订单关系
     */
    private String order_code;

}
