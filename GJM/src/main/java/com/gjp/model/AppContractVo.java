package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * @author 陈智颖
 * @create 2017-11-30 11:38
 **/
@Data
public class AppContractVo {

    // 合同code
    private String contractObject_Code;
    // 合同编码
    private String contractObject_No;
    // 合同类型
    private String contractObject_Type;
    // 合同开始时间
    private Date contractObject_Date;
    // 合同结束时间
    private Date contractObject_DeadlineTime;
    // 录入时间
    private Date contractObject_CreateTime;
    // 签订时间
    private Date contractObject_FillTime;
    // 合同开始结束时间
    private String contract_date_startEnd;
    // 内部人员姓名
    private String em_name;
    // 部门姓名
    private String ucc_name;
    // 合同状态
    private Integer contractObject_OptionState;
    private String contractObject_OptionStateStr;
    // 合同状态颜色
    private String contractObject_OptionStateColor;
    // 付款方式（月付、季付、半年付、年付）
    private String contractBody_PayStyle;
    // 金融机构
    private String contractBody_PayType;
    // 其他约定
    private String contractObject_Other;
    // 地址
    private String house_address;
    // 内部人员编码
    private Integer em_id;
    // 日期类型
    private String date_title;
    // 开始时间
    private String dateStart;
    // 结束时间
    private String dateEnd;
    // 开始条数
    private Integer pageNo;
    // 查询条数
    private Integer pageSize;
    // 查询条件
    private String where;
    private Boolean overdue;
    // 角色（1：主管家、2：副管家）
    private Integer cre_role;
}
