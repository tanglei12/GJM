package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 活动管理
 *
 * @author JiangQT
 */
@Data
public class ActivityManageVo {

    // 活动ID
    private Integer am_id;
    // 活动CODE
    private Long am_code;
    // 活动渠道{1100:"ERP",1101:"ERP_APP",1102:"ERP_PC",1200:"USER",1201:"USER_APP",1202:"USER_PC"}
    private Integer am_channel;
    // 活动类型（待定）
    private Integer am_type;
    // 活动标题
    private String am_title;
    // 活动描述
    private String am_description;
    // 活动地址
    private String am_url;
    // 活动状态（待定）
    private Integer am_state;
    // 发布时间
    private Date am_release_time;
    // 开始时间
    private Date am_start_time;
    // 结束时间
    private Date am_end_time;
    // 创建时间
    private Date am_create_time;
    // 是否发布 0-未发布；1-已发布
    private Integer isrelease;

    /****** 扩展 *****/
    private String where;
    private Integer pageSize;
    private Integer pageNo;
}
