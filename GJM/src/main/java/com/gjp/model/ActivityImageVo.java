package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 活动图片
 *
 * @author JiangQT
 */
@Data
public class ActivityImageVo {

    // 活动图片ID
    private Integer ai_id;
    // 活动CODE
    private Long am_code;
    // 图片类型{1:"封面图",2:"缩略图"}
    private Integer ai_type;
    // 图片地址
    private String ai_path;
    // 创建时间
    private Date ai_create_time;

    /***** 扩展 ****/
    private String ai_image_url;
}
