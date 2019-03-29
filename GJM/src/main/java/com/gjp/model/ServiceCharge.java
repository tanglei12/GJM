package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 服务费用
 *
 * @author 王兴荣
 * @create 2017-07-29 18:52
 **/
@Data
public class ServiceCharge {

    private Integer s_id; ///服务费ID
    private Date createTime; //创建时间
    private Double init_serveMoney;//初始服务费
    private Double surplus_serveMoney; //剩余服务费
    private Double used_serveMoney; //已使用的服务费用
    private Double available_serveMoney; // 可用剩余服务费

    private Integer serveType;  //服务费类型(1,保修费 2,服务费 3,其他)
    private String ht_code; //合同编号
    private String kh_code; // 客户编号
    private String fw_code; //房屋编号
    private String con_code; //合同编号
    private String cc_code; // 客户编号
    private String hi_code; //房屋编号
    private Date effective_date;// 费用生效日期
    private Date expiry_date;// 费用失效日期
    private String house_address;
    private String contractObject_No;
    private String cc_name;

    /* 扩展 */
    private Date apprise_date;

}
