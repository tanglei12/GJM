package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 房屋带看
 *
 * @author 王孝元
 * @version 创建时间：2017年4月2日 上午11:09:54
 */
@Data
public class HouseSeeing {
    // 编号
    private Integer hs_id;
    // 带看内容
    private String hs_content;
    // 带看时间
    private Date hs_createTime;
    // 客户编号
    private String cc_code;
    // 管家id
    private Integer em_id;
    // 管家姓名
    private String em_name;
    // 房屋编码
    private String hi_code;
    // 客户姓名
    private String cc_name;
    // 支付方式
    private String hs_payType;
    // 几天内签合同
    private Integer hs_day;
    // 约定租期
    private String hs_contractDay;
    // 带看结果1-成功；2-失败
    private Integer hs_state;
    // 起租日期
    private Date hs_contractStartDate;

}
