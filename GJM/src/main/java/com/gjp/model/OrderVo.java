package com.gjp.model;

import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * 订单
 *
 * @author JiangQT
 */
@Data
public class OrderVo {

    // 订单ID
    private Integer order_id;
    // 订单号
    private String order_sn;
    // 订单类型{1:"合同订单",2:"服务订单",3:"结算订单",4:"定金订单",5:"充值订单"}
    private Integer order_type;
    // 订单来源渠道{1101:"ERP_APP",1102:"ERP_PC",1201:"USER_APP",1202:"USER_PC"}
    private Integer order_channel;
    // 订单收支类型{1:"收",2:"支"}(相对公司而言)
    private Integer order_balpay;
    // 订单标题
    private String order_title;
    // 订单状态{1:"审核中",2:"未付款",3:"已付款",4:"交易取消",}
    private Integer order_status;
    // 订单状态{1:"审核中",2:"未付款",3:"已付款",4:"交易取消",}
    private String order_status_in;
    // 订单所属门店，与GJP_UserCenter_Company有关
    private Integer order_ucc_id;
    // 订单合同号
    private String order_con_code;
    // 订单房号
    private String order_hi_code;
    // 交易对象{1:"客户",2:"管家",3:"门店",4:"租客",5:"房东",6:"用户"}
    private Integer trade_object;
    // 门店ID，与GJP_UserCenter_Company有关
    private Integer trade_ucc_id;
    // 客户编号，与GJP_UserCenter_Customer有关
    private String trade_cc_code;
    // 用户ID，与GJP_UserCenter_User有关
    private Integer trade_user_id;
    // 付费管家id，与GJP_UserCenter_Employee有关
    private Integer trade_em_id;
    // 商品数量
    private Integer detail_count;
    // 商品总金额
    private Double detail_amount_total;
    // 商品优惠金额
    private Double detail_amount_coupon;
    // 订单总金额（商品总金额 - 优惠金额）
    private Double order_amount_total;
    // 余额抵扣金额
    private Double order_balance_deduction;
    // 订单支付金额（订单总金额 - 余额抵扣金额）
    private Double order_amount_pay;
    // 充值赠送金额
    private Double recharge_amount_give;
    // 约定支付日期
    private Date order_agreed_pay_date;
    // 约定支付日期-小于
    private Date order_agreed_pay_date_lt;
    // 支付单号，与GJP_Order_PayBill有关
    private String pay_sn;
    // 支付渠道（支付宝，微信）
    private String pay_channel;
    // 支付时间
    private Date pay_time;
    // 订单经办人，与GJP_UserCenter_Employee有关
    private Integer order_operator;
    // 订单经办人，与GJP_UserCenter_Employee有关
    private String order_operator_name;
    // 备注
    private String order_remarks;
    // 订单生成时间
    private Date order_create_time;

    // 扩展 =============================

    private List<OrderDetailVo> detailList;

    // 扩展 =============================

    // 用户名称
    private String user_name;
    // 用户手机号
    private String user_phone;

    private Integer so_id;
    private Integer order_code;
    private Double reallyMoney;
    private String param_order_code;
    private String ucc_order_sn;//只用于生成门店订单返回的order_sn

}
