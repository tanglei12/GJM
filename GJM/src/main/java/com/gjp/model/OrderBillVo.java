package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 订单账单
 *
 * @author JiangQT
 */
@Data
public class OrderBillVo {

    // 账单ID
    private Integer bill_id;
    // 流水号（411+时间戳+4位随机数）
    private String bill_sn;
    // 商户订单号
    private String bill_trade_code;
    // 交易号
    private String bill_trans_sn;
    // 来源渠道
    private Integer bill_channel;
    // 流水类型{1:"支付",2:"退款"}
    private Integer bill_type;
    // 客户编号，与GJP_UserCenter_Customer有关
    private String cc_code;
    // 用户ID，与GJP_UserCenter_User有关
    private Integer user_id;
    // 流水名称
    private String bill_title;
    // 支付状态{1:"未支付",2:"已支付",3:"已关闭"}
    private Integer bill_status;
    // 支付人id
    private Integer bill_pay_user_id;
    // 支付人code，与GJP_UserCenter_Customer有关
    private String bill_pay_cc_code;
    // 支付方式(支付宝、微信、现金)
    private String bill_pay_channel;
    // 支付总金额
    private Double bill_pay_total;
    // 支付抵扣金额，与GJP_User_AssetsRecord有关
    private Double bill_pay_deduction;
    // 支付金额
    private Double bill_pay_amount;
    // 支付时间
    private Date bill_pay_time;
    // 核销状态{1:"待核销",2:"已核销"}
    private Integer bill_check_status;
    // 核销人
    private Integer bill_check_em_id;
    // 核销时间
    private Date bill_check_time;
    // IP地址
    private String bill_ip;
    // 经办人，与GJP_UserCenter_Employee有关，默认0表示系统
    private Integer bill_operator;
    // 备注
    private String bill_remarks;
    // 失效时间
    private Date bill_invalid_time;
    // 创建时间
    private Date bill_create_time;

    // 扩展 ============================

    // 用户名称
    private String user_name;
    // 用户手机号
    private String user_phone;
}
