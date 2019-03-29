package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 订单退款
 *
 * @author JiangQT
 */
@Data
public class OrderReturnsVo {

    // 自动ID
    private Integer returns_id;
    // 退款编号
    private String returns_no;
    // 订单ID
    private Integer order_id;
    // 退款描述
    private String returns_desc;
    // 退款类型{1:"全额退款",2:"部分退款",3:"不退款"}
    private Integer returns_type;
    // 退款方式{1:"原路退款",2:"现金转账",3:"不退款"}
    private Integer returns_way;
    // 状态{1:"正常",2:"撤销"}
    private Integer returns_status;
    // 退款金额
    private Double returns_amount;
    // 处理人
    private Integer returns_handler;
    // [扩展]处理人
    private String returns_handler_name;
    // 处理日期
    private Date returns_handle_date;
    // 创建时间
    private Date returns_create_time;

}
