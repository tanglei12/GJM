package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 服务费用记录
 *
 * @author 王兴荣
 * @create 2017-07-29 19:01
 **/
@Data
public class ServiceChargeRecord {
    private Integer re_id; ///服务费记录ID
    private Integer md_id;// 服务订单ID
    private Integer so_id;// 新版服务ID
    private Date create_time; //创建时间
    private Integer service_type;  //服务类型
    private Double service_charge;//一次服务使用的服务费用
    private Double surplus_serveMoney; //剩余费用
    private Double discount; //公司优惠的服务费
    private String ht_code; //合同编号
    private String kh_code; // 客户编号
    private String fw_code; //房屋编号
    private String con_code; //合同编号
    private String cc_code; // 客户编号
    private String hi_code; //房屋编号
    private String con_no;
    private String md_number;
    private String so_code;
}
