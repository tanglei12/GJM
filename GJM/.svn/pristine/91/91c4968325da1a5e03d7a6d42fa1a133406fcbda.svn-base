package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 活动奖品
 *
 * @author JiangQT
 */
@Data
public class ActivityPrizeVo {

    // 奖品ID
    private Integer ap_id;
    // 活动CODE
    private Long am_code;
    // 奖品名称
    private String ap_name;
    // 奖品类型(1-虚拟；2-实物)
    private Integer ap_type;
    // 奖品获取方式{1:"抽奖",2:"赠送"}
    private Integer ap_way;
    // 充值产品号，与GJP_Product_Recharge关联
    private String pr_sn;
    // 优惠券CODE，与GJP_User_CouponsConfig关联
    private String uccfg_code;
    // 奖品描述
    private String ap_description;
    // 中奖概率
    private Double ap_odds;
    // 奖品用户限制次数{-1:"无限制",1~99:"限制次数"}
    private Integer ap_user_limit;
    // 奖品总数量
    private Integer ap_total_number;
    // 奖品剩余数量
    private Integer ap_remaining_number;
    // 创建时间
    private Date ap_create_time;
    // 角度
    private Double ap_andgle;
    // 奖品数值
    private Double ap_value;
    // 是否启用：0-不启用；1-启用
    private Integer is_used;

    /************* 扩展 ************/
    private String pr_name;
    private String uccfg_name;
    // 活动类型（待定）
    private Integer am_type;
    // 活动状态（待定）
    private Integer am_state;
    // 发布时间
    private Date am_release_time;
    // 开始时间
    private Date am_start_time;
    // 结束时间
    private Date am_end_time;

}
