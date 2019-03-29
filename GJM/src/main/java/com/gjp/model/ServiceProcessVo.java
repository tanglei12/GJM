package com.gjp.model;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * 服务-服务处理过程
 *
 * @author JiangQT
 */
@Data
public class ServiceProcessVo {

    // 服务处理过程ID
    private Integer spro_id;
    // 服务订单ID
    private Integer so_id;
    // 服务人员ID
    private Integer sp_id;
    // 开始时间
    private Date spro_startTime;
    // 结束时间
    private Date spro_endTime;
    // 预计开始时间
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date spro_expectStartTime;
    // 预计结束时间
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date spro_expectEndTime;
    // 状态（1：正常、2：转移、3：关闭）
    private Integer spro_state;
    // 跟进状态（ss_code）
    private Integer spro_followState;
    // 交互对象（ss_code）
    private Integer spro_mutualObject;
    // 备注
    private String spro_remarks;
    //预计时长
    private String spro_expectEndDuration;
    // 创建时间
    private Date spro_createTime;

    // 扩展================================

    // 服务人员姓名
    private String sp_name;
    // 服务人员手机号
    private String sp_phone;
}
