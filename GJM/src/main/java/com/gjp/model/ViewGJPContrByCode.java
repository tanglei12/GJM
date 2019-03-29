package com.gjp.model;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ViewGJPContrByCode {

    // 账户名
    private String contractSign_CarName;
    // 银行卡号
    private String contractSign_BCNo;
    // 开户行
    private String contractType_Name;
    // qq
    private String contractSign_QQ;
    // 管家姓名
    private String contractSign_Agent;
    // 起止日期
    private String contractBody_StartTOEnd;
    // 托管租赁期限
    private String contractBody_TimeLimit;
    // 免租期：天为单位
    private String contractBody_FreeTime;
    // 首付租金日期
    private Date contractBody_StartPayTime;
    // 月租金：月为单位
    private Float contractBody_Rent;
    // 付款方式 (月付 季付 半年付 年付)
    private String contractBody_PayStyle;
    // 定金
    private Float contractBody_Pay;
    // 服务费
    private Float contractBody_Service;

    // 合同对象序号
    private Integer ContractObject_Id;
    // 合同编号
    private String ContractObject_Code;
    // 合同编号
    private String ContractObject_No;
    // 合同类型编号
    private String ContractObject_Type;
    // 合同版本
    private String ContractObject_Version;
    // 产品类型
    private String ContractObject_ProductMode;
    // 甲方
    private String ContractObject_1st;
    // 乙方
    private String ContractObject_2nd;
    // 丙方
    private String ContractObject_3rd;
    // 丁方
    private String ContractObject_4th;
    // 房屋编码：标识房屋唯一性的编码，非主键。
    private String hi_code;
    // 物业编号
    private Integer PropertyInfo_Id;
    // 合同附件存储形式：授权委托书
    private String ContractObject_Annex;
    // 填写日期
    private Date ContractObject_FillTime;
    // 过期时间
    private Date ContractObject_DeadlineTime;
    // 签署日期
    private Date ContractObject_Date;
    // 合同更新日期
    private Date ContractObject_UpdateTime;
    // 合同状态：存续，解约，续约（在续约状态下，已经重新签署新的合同）
    private Integer ContractObject_State;
    // 其它约定
    private String ContractObject_Other;
    // 扩展信息编号
    private Integer ContractExt_Id;
    // 合同编辑状态
    private Integer ContractObject_OptionState;

    // 房屋===================================
    // 房屋名称
    private String hi_name;
    // 房屋名称
    private String hi_address;
    // 房屋室
    private Integer hi_houseS;
    // 房屋厅
    private Integer hi_houseT;
    // 房屋卫
    private Integer hi_houseW;
    // 房屋面积
    private Integer hi_measure;
    // 物业地址
    private String propertyInfo_address;

    // 租赁=================================
    // 房屋用途
    private String contractBody_Use;
    // 租客还款时间
    private List<?> tb_shouldDateList;
    // 总金额
    private Double to_numMoney;
    // 姓名
    private String contractSign_NameZk;
    // 证件号
    private String contractSign_CarNoZk;
    // 联系电话
    private String contractSign_PhoneZk;
    // 工作单位
    private String contractSign_Work;
}
