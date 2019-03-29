package com.gjp.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 合同对象
 *
 * @author zoe
 */
@Data
public class ContractObjectVo {

    // 合同对象序号
    private Integer ContractObject_Id;
    // 合同唯一编码
    private String ContractObject_Code;
    // 合同编号
    private String ContractObject_No;
    // 房屋编码：标识房屋唯一性的编码，非主键。
    private String hi_code;
    // 电子合同|纸质合同
    private String ContractObject_Mode;
    // 合同类型
    private String ContractObject_Type;
    // 合同来源
    private String ContractObject_Source;
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
    // 合同附件存储形式：授权委托书
    private String ContractObject_Annex;
    // 合同开始日期
    private Date ContractObject_Date;
    // 合同过期时间
    private Date ContractObject_DeadlineTime;
    // 合同过期时间
    private Date ContractObject_RealDate;
    // 填写日期
    private Date ContractObject_FillTime;
    // 合同更新日期
    private Date ContractObject_UpdateTime;
    // 其它约定
    private String ContractObject_Other;
    // 扩展信息编号
    private Integer ContractExt_Id;
    // 合同状态：存续，解约，续约（在续约状态下，已经重新签署新的合同）
    private Integer ContractObject_State;
    // 合同操作状态
    private Integer ContractObject_OptionState;
    // 额外状态
    private Integer ContractObject_ExtState;
    // 签约人
    private Integer ContractObject_Contractor;
    // 创建时间
    private Date ContractObject_CreateTime;
    // 业绩计算（0：没有计算业绩 1：已经计算业绩）
    private Integer ContractObject_Bool;
    // 继承编号（续约、转租时，记录上份合同的合同id）
    private Integer ContractObject_Successor;
    // 招租期-(免租期-招租期)-(剩余免租期)
    private String ContractObject_RentStr;
    // 免租模式（0：正常模式，1：年付打包）
    private Integer ContractObject_RentFreeMode;
    // 招租期
    private Integer ContractObject_ForRentDate;
    // 服务费是否计算
    private Integer ContractObject_ServiceBool;
    // 物品购置总金额
    private Double ContractObject_goodsMoney;
    // 租金递增
    private String ContractBody_Increasing;
    // 客户签名
    private byte[] ContractObject_CustomerSign;
    // 合同校验码
    private String ContractObject_CheckCode;
    // 居住人数
    private Integer ContractObject_PeopleNumber;
    //客户记录来源(1.续约)
    private Integer ContractObject_RecordSource;

    // 起止日期========================================

    private String ContractBody_StartTOEnd;
    // 月租金：月为单位
    private Float ContractBody_Rent;
    // 房屋名称
    private String hi_name;
    // 内部人员编码
    private Integer em_id;
    // 分成比例
    private Double contract_perforSplit;
    // 管家类型
    private Integer cre_role;
    // 房屋地址
    private String house_address;
    // 客户code
    private String cc_code;
    // 客户名
    private String cc_name;
    // 客户电话
    private String ccp_phone;
    // 管家名称
    private String em_name;
    // 管家电话
    private String em_phone;
    // 部门编码
    private Integer ucc_id;
    // 免租期天数
    private String ContractBody_FreeTime;
    // 公司管理费是否计算1、计算 0、未计算
    private Integer ContractObject_gsmanage;
    // 坐标
    private String propertyInfo_coordinate;
    //客户类型
    private String cc_type;

    // 扩展==================================

    // 用戶ID
    private Integer user_id;

    // 房源产权地址
    private String he_address;

    private Integer start;
    private Integer end;
    private String where;
    private BigDecimal generate;
    private String ucc_name;
    private String ucc_phone;
    private Double init_serveMoney;
    private Double surplus_serveMoney;

    // 搜索所有房屋租客、房东、管家、门店、及剩余服务费信息
    private Double hi_measure;
    private Integer hi_houseS;
    private Integer hi_houseT;
    private Integer hi_houseW;
    private String cc_name_z;// 租客名称
    private String ccp_phone_z;// 租客电话
    private String contractObject_Code_z;
    private Date contractObject_Date_z;// 租赁合同开始时间
    private Date contractObject_DeadlineTime_z;// 租赁合同结束时间
    private Integer contractObject_OptionState_z;
    private Double init_serveMoney_z;// 初始服务费
    private Double surplus_serveMoney_z;// 剩余服务费
    private String cc_name_f;// 房东名称
    private String ccp_phone_f;// 房东电话
    private String contractObject_Code_f;
    private Date contractObject_Date_f;// 托管合同开始时间
    private Date contractObject_DeadlineTime_f;// 托管合同结束时间
    private Integer contractObject_OptionState_f;
    private Double init_serveMoney_f;// 初始包修费
    private Double surplus_serveMoney_f;// 剩余包修费

}
