package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 毛利润，门店，管家关系表
 */
@Data
public class HouseGrossProfitRelaVo {

    // 主键
    private Integer gr_id;
    // 毛利润记录
    private Integer gp_id;
    // 主管家
    private Integer main_em_id;
    // 主管家分成比例
    private Double main_ratio;
    // 副管家
    private Integer vice_em_id;
    // 副管家分成比例
    private Double vice_ratio;
    // 归属门店
    private Integer ucc_id;
    // 核算开始日期
    private Date start_date;
    // 核算结束日期
    private Date end_date;
    // 核算开始日期
    private Date start_date_c;
    // 核算结束日期
    private Date end_date_c;
    // 创建时间
    private Date create_time;
    // 最后更新时间
    private Date update_time;
    // 数据状态0-失效；1-有效
    private Integer data_state;
    // 继承ID(管家变更、门店变更等，原纪录ID)
    private Integer ex_id;

    /******* 扩展 *******/
    private String hi_code;
    private String contractObject_code;
}
