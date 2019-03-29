package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * @author tanglei
 * @description
 * @date Created in 2017/12/27
 */
@Data
public class Facility {
    // 房间配套设施图片ID
    private Integer conim_id;
    // 房间配置图片类型
    private String conim_type;
    // 房间配置图片路径
    private String conim_path;
    // 创建时间
    private Date conim_createTime;
    // 创建时间
    private String conim_createTime_str;
    // 文件夹id
    private String hif_id;
}
