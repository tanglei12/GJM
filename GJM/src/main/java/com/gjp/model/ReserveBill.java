package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 预定账单
 *
 * @author zoe
 */
@Data
public class ReserveBill {

    // 预定账单编码
    private Integer rb_id;
    // 姓名
    private String rb_name;
    // 预订单号
    private String rb_number;
    // 电话
    private String rb_phone;
    // 金额
    private Double rb_money;
    // 房屋编码
    private String rb_houseNum;
    // 创建时间
    private Date rb_date;
    // 身份证号
    private String rb_personNum;
    // 付费周期
    private String rb_cycle;
    // 付租类型
    private String rb_type;
    // 房屋预留时间
    private Integer rb_reserveDate;
    // 备注
    private String rb_remarks;
    // 预订状态
    private String rb_state;
    // 操作状态
    private String rb_operationState;
    // ejz分佣状态
    private String rb_Ejz;
    // 分享码
    private String rb_fxCode;
    // 用户账号
    private String rb_account;
    // 分成金额
    private Double ep_wayMon;
    // 剩下的佣金
    private Double ep_leave;
    // 用户账号
    private String hi_version;
    // 用户账号
    private String hb_name;
    // 房号(调用产权地址：物业地址+房号)
    private String hi_address;
    // 物业名称
    private String propertyInfo_Name;
    // 地址
    private String propertyInfo_address;
    // 预定订单状态
    private Integer rb_stateType;
    // 支付方式
    private String playType;
    //支付类型
    private String rb_playType;
    //支付方式 同时也是收款方式
    private String bs_payType;
    //支付状态
    private String bs_state;
    //付款方式
    private String rb_moneyType;
    // 房屋地址
    private String house_address;

}
