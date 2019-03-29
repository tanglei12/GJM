package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * @author JiangQt
 * @description
 * @date Created in 2018-1-22
 */
@Data
public class ContractInfoVo {
    private String hi_code;
    private String house_address;
    private Double hi_measure;
    private Integer hi_houseS;
    private Integer hi_houseT;
    private Integer hi_houseW;
    private String he_address;

    private Integer contractObject_Id;
    private String contractObject_Code;
    private String contractObject_No;
    private String contractObject_Type;
    private String contractObject_Source;
    private String contractObject_1st;
    private Date contractObject_FillTime;
    private Date contractObject_Date;
    private Date contractObject_DeadlineTime;
    private Date contractObject_RealDate;
    private Date contractObject_UpdateTime;
    private Integer contractObject_State;
    private Integer contractObject_OptionState;
    private Integer contractObject_ExtState;
    private String contractObject_Other;
    private Integer contractObject_Contractor;
    private Date contractObject_CreateTime;
    private byte[] contractObject_CustomerSign;
    private Integer contractObject_PeopleNumber;
    private String contractObject_Version;
    private int contractObject_RentFreeMode;

    private String contractBody_Use;
    private Double contractBody_Rent;
    private String contractBody_FreeTime;
    private String contractBody_RentPlus;
    private Double contractBody_Depslit;
    private Double contractBody_Pay;
    private Double contractBody_Service;
    private String contractBody_GuaranteeCost;
    private Double contractBody_WorkMoney;
    private String contractBody_Increasing;
    private String contractBody_PayStyle;
    private String contractBody_PayType;
    private Date contractBody_StartPayTime;
    private Date contractBody_BillTime;
    private Date contractBody_PayTime;
    private String contractBody_Remark;
    private Integer contractBody_AgreedRepayTime;
    private String contractBody_BillWay;
    private Integer contractBody_ContractMode;

    private Integer em_id;
    private String em_name;
    private String em_phone;
    private String cc_name;
    private String ccp_phone;
    private String cc_cardNum;
    private String cc_code;
    //客户类型
    private String cc_type;
    private Integer user_id;
    private Integer ucc_id;
    private String ucc_name;
}
