package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 定金
 *
 * @author JiangQT
 */
@Data
public class FinanceDownPaymentVo {

    // id
    private Integer fdp_id;
    // 定金code(400+时间戳+4位随机数)
    private String fdp_sn;
    // 定金状态{1:"审核中",2:"未使用",3:"已使用",4:"已过期"}
    private Integer fdp_status;
    // 定金状态
    private String fdp_status_in;
    // 房源code
    private String hi_code;
    // 合同code
    private String con_code;
    // 客户编号，与GJP_UserCenter_Customer有关
    private String cc_code;
    // 用户id
    private Integer user_id;
    // 定金金额
    private Double fdp_amount;
    // 订单号
    private String order_sn;
    // 备注
    private String fdp_remarks;
    // 失效天数
    private Integer fdp_invaild_day;
    // 失效时间
    private Date fdp_invaild_time;
    // 失效时间小于
    private Date fdp_invaild_time_lt;
    // 创建时间
    private Date fdp_create_time;

    // -----------------------

    // 小区房号
    private String house_address;
    // 用户名称
    private String user_name;
    // 用户手机号
    private String user_phone;

}
