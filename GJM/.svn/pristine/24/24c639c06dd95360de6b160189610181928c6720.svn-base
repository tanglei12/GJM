package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 充值产品管理
 *
 * @author JiangQT
 */
@Data
public class ProductRechargeVo {

    // 充值产品ID
    private Integer pr_id;
    // 充值产品号
    private String pr_sn;
    // 产品渠道{1101:"ERP_APP",1102:"ERP_PC",1201:"USER_APP",1202:"USER_PC"}
    private Integer pr_channel;
    // 充值名称
    private String pr_name;
    // 充值产品描述
    private String pr_description;
    // 充值数值
    private Double pr_price;
    // 充值产品状态{1:"开启",2:"关闭",3:"暂停"}
    private Integer pr_status;
    // 充值优惠{1:"开启",2:"关闭"}
    private Integer pr_benefit;
    // 充值优惠名称
    private String pr_benefit_name;
    // 优惠次数{-1:"无限制",1:"优惠一次"} // ,2~999:"优惠多次"
    private Integer pr_benefit_user_limit;
    // 充值优惠方式{1:"充值赠送"}
    private Integer pr_benefit_way;
    // 充值优惠值
    //private Double pr_benefit_price;
    //充值最小优惠值
    private Double pr_benefit_min_price;
    //充值最大优惠值
    private Double pr_benefit_max_price;
    // 排序（0~无穷，顺序）
    private Integer pr_order;
    // 备注
    private String pr_remarks;
    // 修改者
    private Integer pr_modifier;
    // 修改时间
    private Date pr_modify_time;
    // 创建时间
    private Date pr_create_time;

    /******* 扩展 ******/
    private String where;
}
