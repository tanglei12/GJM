package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 订单分页列表业务对象
 *
 * @author JiangQt
 * @description
 * @date Created in 2017-7-26
 */
@Data
public class FinanceOrderPageListBo {

    private Integer bco_orderType;
    private Integer bco_type;
    private String hi_code;
    private String house_address;
    private String bco_code;
    private String bco_customer;
    private String bco_customerName;
    private String bco_customerPhone;
    private String contractBody_PayStyle;
    private String contractBody_PayType;
    private String contractObject_No;
    private String contractObject_Type;
    private Integer contractObject_OptionState;
    private Integer bco_currentBalPay;
    private Integer bco_currentCycle;
    private Double bco_currentPayment;
    private Integer bco_currentOverCycle;
    private Integer bco_currentOverDay;
    private Date bco_currentDate;
    private Integer bco_optionState;
    private Integer bco_butler;
    private String bco_empName;
    private String bco_empPhone;
    private String ucc_name;
    private Date bco_invalidTime;
    private Date bco_createTime;

}
