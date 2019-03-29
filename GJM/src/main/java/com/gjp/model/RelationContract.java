package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * @author 陈智颖
 * @create 2017-12-16 14:59
 **/
@Data
public class RelationContract {

    // 合同关联编码
    private Integer rc_id;
    // 用户编码
    private Integer user_id;
    // 合同编码
    private Integer contractObject_Id;
    // 合同识别编码
    private String contractObject_code;
    // 合同编号
    private String contractObject_No;
    private String con_no;
    // 合同开始时间
    private Date contractObject_Date;
    // 合同过期时间
    private Date contractObject_DeadlineTime;
    // 合同时间段
    private String contractObject_StartEnd;
    private String startEnd;
    // 手机号码
    private String user_phone;
    // 房屋编码
    private String hi_code;
    // 客户证件号
    private String cc_cardNum;

    private Integer pageNo;
    private Integer pageSize;
}
