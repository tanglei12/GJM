package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 服务-服务记录
 *
 * @author JiangQT
 */
@Data
public class ServiceRecordVo {

    // 服务记录ID
    private Integer sr_id;
    // 服务订单ID
    private Integer so_id;
    // 服务步骤CODE
    private Integer ss_code;
    // 记录类型（1：内部访问，2：外部访问）
    private Integer sr_type;
    // 服务记录内容
    private String sr_content;
    //服务内部记录
    private String sr_content_inside;
    //服务外部记录
    private String sr_content_outside;
    //服务业务记录
    private String sr_content_business;
    // 服务记录人（em_id）
    private Integer ss_charger;
    // 创建时间
    private Date sr_createTime;

    /****** 扩展 ******/
    private String em_name;
}
