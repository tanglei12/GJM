package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 服务预约
 *
 * @author 王孝元
 * @version 创建时间：2017年3月16日 上午10:21:44
 */
@Data
public class ServiceOrder {

    // 编号
    private Integer so_id;
    // 客户姓名
    private String so_name;
    // 联系方式
    private String so_phone;
    // 描述
    private String so_remarks;
    // 物业名称
    private String so_propertyName;
    // 房屋地址
    private String so_houseAddress;
    // 创建时间
    private Date so_createTime;

}
