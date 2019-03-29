package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * @author tanglei
 * @description 房源发布渠道
 * @date Created in 2018/1/15
 */
@Data
public class HousePublishChannel {
    //主键
    private Integer hpc_id;
    //渠道号
    private String hpc_code;
    //房源渠道名称
    private String hpc_name;
    //渠道状态{1:"开启",2:"关闭"}
    private Integer hpc_status;
    //创建时间
    private Date hpc_create_time;
}
