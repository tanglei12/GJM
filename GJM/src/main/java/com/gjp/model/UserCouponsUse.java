package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * @description 优惠券用途
 * @author tanglei
 * @date Created in 2018/1/19
 */
@Data
public class UserCouponsUse {
    //主键id
    private Integer ucu_id;
    //编号
    private Integer ucu_number;
    //名称
    private String ucu_name;
    //层级
    private Integer ucu_class;
    //父级编号
    private Integer ucu_pn;
    // 创建时间
    private Date ucu_create_time;
    //排序（0~99）
    private Integer ucu_sort;
}
