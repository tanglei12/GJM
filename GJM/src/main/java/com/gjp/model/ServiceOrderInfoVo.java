package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 服务-服务订单详情
 *
 * @author JiangQT
 */
@Data
public class ServiceOrderInfoVo {

    // 服务订单详情ID
    private Integer soin_id;
    // 服务订单ID
    private Integer so_id;
    // 搬家开始地址
    private String soin_moveStartAddress;
    // 搬家开始坐标
    private String soin_moveStartPoint;
    // 搬家结束地址
    private String soin_moveEndAddress;
    // 搬家结束坐标
    private String soin_moveEndPoint;
    // 创建时间
    private Date soin_createTime;
}
