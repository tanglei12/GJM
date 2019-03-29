package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 支付宝房源同步附件
 * @author shenhx
 * @create 2018-01-16 14:40
 **/
@Data
public class RentHouseFileVo {

    // 主键
    private Integer ra_id;
    // ERP房源Code
    private String hi_code;
    // 附件类型1：图片（支持jpg、png、jpeg、bmp格式） 2：合同（HTML格式）
    private String file_type;
    // 支付宝平台附件同步返回URL、
    private String url;
    // 上传人
    private Integer em_id;
    // 上传时间
    private Date upload_time;

}
