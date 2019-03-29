package com.gjp.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 账单流水
 *
 * @author JiangQt
 * @version 2017年6月6日下午4:16:40
 */
@Data
public class FinancePayFlowStatementVo {

    // 支付流水编码
    private Integer bs_id;
    // 支付流水号（前缀210 + 时间戳 + 后缀4位随机数）
    private String bs_serialNumber;
    // 商户订单号
    private String bs_orderNumber;
    // 支付平台交易号
    private String bs_payTransNumber;
    // 房号
    private String hi_code;
    // 订单号
    private String bco_code;
    // 流水类型（1：合同、2：服务、3：结算、4：定金）
    private Integer bs_type;
    // 流水来源（1101：ERP_APP、1102：ERP_PC、1201：USER_APP、1202：USER_PC）
    private Integer bs_source;
    // 流水标题
    private String bs_title;
    // 流水副标题
    private String bs_subtitle;
    // 收付款类型（1：收款、2：付款）
    private Integer bs_balPay;
    // 支付金额
    private BigDecimal bs_money;
    // 退款金额
    private BigDecimal bs_refund;
    // 抵扣金额
    private BigDecimal bs_discount;
    // 支付状态（1：未支付、2：已支付）
    private Integer bs_state;
    // 流水状态（1：未支付、2：支付完成、3：交易关闭、4：交易完成、20：违约已退款、21：违约未退款、30：交易已过期）；原：（1：未支付、2：已支付、3：已关闭、4：已退款、5：交易完成、6、交易取消）
    private Integer bs_flowState;
    // 账务核销（1：未核销、2：已核销）
    private Integer bs_verifyState;
    // 支付方式
    private String bs_payType;
    // 支付时间
    private Date bs_payTime;
    // 付款方Code
    private String bs_payerCode;
    // 付款方名
    private String bs_payerName;
    // 付款方账号
    private String bs_payerAccount;
    // 收款方code
    private String bs_payeeCode;
    // 收款方名
    private String bs_payeeName;
    // 收款方账号
    private String bs_payeeAccount;
    // 经办人
    private Integer bs_handler;
    // 备注
    private String bs_remark;
    // 账务核销时间
    private int bs_verifier;
    // 账务核销时间
    private Date bs_verifyTime;
    // 失效时间
    private Date bs_invalidTime;
    // 创建时间
    private Date bs_createTime;

    // 扩展1------------------------------

    //经办人
    private String bs_handler_name;
    //经办人
    private String bs_handler_phone;
    //支付方电话
    private String payer_phone;
    //收款方电话
    private String payee_phone;
    //收款方电话
    private String bs_verifier_name;
    //支付方电话
    private String bs_verifier_phone;
    //小区房号
    private String house_address;
    //合同code
    private String contractObject_code;

    // 扩展2------------------------------

    // 条件支付状态
    private Integer bs_state_where;

    private Integer pageNo;
    private Integer pageSize;

    private String where;

    //订单生产时间
    private Date bco_createTime;
    //订单失效时间
    private Date bco_invalidTime;

}
