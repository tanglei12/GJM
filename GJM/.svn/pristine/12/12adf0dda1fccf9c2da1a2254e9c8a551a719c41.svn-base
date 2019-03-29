package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 充值流水
 *
 * @author JiangQT
 */
@Data
public class FinanceRechargeStatementVo {

    // 充值流水ID
    private Integer frs_id;
    // 充值流水号
    private String frs_sn;
    // 充值交易号
    private String frs_trans_sn;
    // 充值订单号
    private String fro_sn;
    // 充值流水名称
    private String frs_title;
    // 充值流水名称
    private String frs_subtitle;
    // 流水来源（1101：ERP_APP、1102：ERP_PC、1201：USER_APP、1202：USER_PC）
    private Integer frs_source;
    // 支付总价
    private Double frs_total_price;
    // 退款金额
    private Double frs_refund_price;
    // 抵扣金额
    private Double frs_discount_price;
    // 支付金额
    private Double frs_pay_price;
    // 支付状态（1：未支付、2：已支付、3：已关闭）
    private Integer frs_status;
    // 流水状态（1：未支付、2：已支付、3：已关闭、4：交易完成、6：交易取消、20：违约已退款、21：违约未退款、30：交易已过期）
    private Integer frs_flow_status;
    // 支付方式（支付宝、微信）
    private String frs_pay_way;
    // 支付时间
    private Date frs_pay_time;
    // 买家ID
    private String frs_payer_id;
    // 买家账户
    private String frs_payer_account;
    // 备注
    private String frs_remarks;
    // 失效时间
    private Date frs_invalid_time;
    // 创建时间
    private Date frs_create_time;
}
