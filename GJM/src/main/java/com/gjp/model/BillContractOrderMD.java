package com.gjp.model;

import lombok.Data;

/**
 * 服务订单与账单关系表
 *
 * @author shenhx
 * @create 2017-08-15 10:03
 **/
@Data
public class BillContractOrderMD {

    // 主键ID
    private Integer co_id;
    // 服务订单ID
    private Integer md_id;
    private Integer so_id;
    // 账单编码
    private String order_code;

}
