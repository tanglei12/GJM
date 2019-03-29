package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 充值订单
 *
 * @author JiangQT
 */
@Data
public class FinanceRechargeOrderVo {

    // 充值订单ID
    private Integer order_id;
    // 充值订单CODE
    private String order_sn;
    // 充值渠道{1101:"ERP_APP",1102:"ERP_PC",1201:"USER_APP",1202:"USER_PC"}
    private Integer order_channel;
    // 用户ID
    private Integer user_id;
    // 商品号
    private String product_sn;
    // 商品名称
    private String product_name;
    // 商品价格
    private Double product_price;
    // 购买数量
    private Integer product_count;
    // 商品总金额
    private Double product_amount_total;
    // 赠送金额
    private Double order_amount_give;
    // 账单总金额
    private Double order_amount_total;
    // 订单状态（1：待支付、2：已支付、3：已关闭）
    private Integer order_status;
    // 支付单号，与GJP_Order_PayBill有关
    private String pay_sn;
    // 支付渠道
    private String pay_channel;
    // 支付时间
    private Date pay_time;
    // null
    private String order_remarks;
    // 订单生成时间
    private Date order_create_time;
}
