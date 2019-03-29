package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 服务-服务人员
 *
 * @author JiangQT
 */
@Data
public class ServicePersonVo {

    // 服务人员ID
    private Integer sp_id;
    // 服务人员CODE
    private String sp_code;
    // 内部人员ID
    private Integer em_id;
    // 服务人员类型
    private Integer sp_type;
    // 服务人员姓名
    private String sp_name;
    // 性别（1：男、2：女）
    private Integer sp_sex;
    // 服务人员电话
    private String sp_phone;
    // 服务人员状态（暂定）
    private Integer sp_state;
    // 创建时间
    private Date sp_createTime;

    /***** 扩展字段 *****/
    private Integer start;
    private Integer end;
    private String param;
    private String dictionary_name;
    private String house_address;
    private String so_targetAddress;
    private String ss_title;
    private String sm_name;
    private Date spro_expectEndTime;
}
