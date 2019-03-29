package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 版本控制记录对象
 *
 * @author JiangQt
 * @description
 * @date Created in 2017-9-10
 */
@Data
public class AppVersionVo {

    /* 版本记录ID*/
    private Integer av_id;
    /* 版本记录类型*/
    private String av_type;
    /* 版本记录CODE*/
    private String av_code;
    /* 版本记录编号*/
    private Integer av_num;
    /* 版本记录编号*/
    private Integer av_num_min;
    /* 版本记录编号*/
    private Integer av_num_max;
    /* 版本记录状态（1：正常更新、2：强制更新）*/
    private Integer av_state;
    /* 版本记录开关（1：开启、2：关闭）*/
    private Integer av_swith;
    /* 版本记录更新地址*/
    private String av_href;
    /* 版本记录更新包SHA1编码*/
    private String av_sha1;
    /* 版本记录更新内容*/
    private String av_content;
    /* 版本记录创建时间*/
    private Date av_createTime;

}
