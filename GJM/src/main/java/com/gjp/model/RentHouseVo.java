package com.gjp.model;

import lombok.Data;

/**
 * ERP房源同步及上下架至支付宝
 * @author shenhx
 * @create 2018-01-16 11:17
 **/
@Data
public class RentHouseVo {

    // 主键
    private Integer rh_id;
    // 同步到支付宝房源code
    private String room_code;
    // ERP房源code
    private String hi_code;
    // 支付宝平台房源同步状态：0-未同步；1-已同步；2-同步失败
    private Integer sync_state;
    // 支付宝平台房源上下架状态（0:下架，1：上架）
    private Integer room_status;
    // 支付宝唯一房源编码
    private String ali_houseCode;
    // 同步失败原因
    private String response_msg;

    /******* 扩展 ******/
    // 最新管家编号
    private Integer hpr_newEmp;
    // 小区房号
    private String house_address;
    // 管家名称
    private String em_name;
    // 管家电话
    private String em_phone;

}
