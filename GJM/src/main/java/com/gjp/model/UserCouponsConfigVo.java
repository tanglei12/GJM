package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 优惠券配置
 *
 * @author JiangQT
 */
@Data
public class UserCouponsConfigVo {

    // 优惠券ID
    private Integer uccfg_id;
    // 优惠券CODE
    private String uccfg_code;
    // 优惠券类型{1:"优惠券",2:"抵扣券",3:""}
//    private Integer uccfg_type;
    // 优惠券来源{1:"注册",2:"登录",3:"活动"}
    private Integer uccfg_source;
    // 优惠券名称
    private String uccfg_name;
    // 优惠券描述
    private String uccfg_description;
    // 优惠方式{1:"金额",2:"折扣"}
    private Integer uccfg_way;
    // 优惠券金额
    private Double uccfg_price;
    // 优惠券有效方式
    private String uccfg_valid_way;
    // 优惠券有效值
    private Double uccfg_valid_value;
    // 优惠券失效方式{1:"一次性",2:"持续性"}
    private Integer uccfg_invalid_way;
    // 优惠券状态{1:"启用",2:"关闭"}
    private Integer uccfg_status;
    // 优惠券备注
    private String uccfg_remarks;
    // 创建时间
    private Date uccfg_create_time;
    // 优惠券用途{0:"通用",1:"租金",2:"服务"}
    private Integer uccfg_use;
    // 优惠券限用途制{0:"无限制",1:""}
    private String uccfg_use_limit;
    // 优惠券限用途描述
    private String uccfg_use_description;

    /*************/

    private String where;
}
