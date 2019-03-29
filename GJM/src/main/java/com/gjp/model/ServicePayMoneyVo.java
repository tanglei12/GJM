package com.gjp.model;

import lombok.Data;

/**
 * 服务费支付时抵扣、减免等情况
 * @author shenhx
 * @create 2017-11-09 14:38
 **/
@Data
public class ServicePayMoneyVo {

    private Integer s_id;
    private Integer md_id;
    private Integer so_id;
    private String cc_code;
    private String hi_code;
    private String con_code;
    private Double mdg_money;
    private Double so_totalMoney;
    private Double init_serveMoney;
    private Double used_serveMoney;
    private Double surplus_serveMoney;
    private Double available_serveMoney;
    private Integer st_moneyBool;
    private String bco_code;
    private String md_peopleName;
    private String house_address;
    private String so_targetAddress;
    private Integer ucc_id;
    private Integer hpr_newEmp;
    private String hpr_newEmpName;
    private String hpr_newEmpPhone;
    private String ucc_name;
    private String cc_name;
    private String ccp_phone;
    private Integer ucc_manager;
    private String ucc_managerName;
    private String ucc_managerPhone;
    private String sm_name;
    private String contractObject_code;
    private String contractObject_Type;
    private Integer user_id;
    private String user_name;
    private String user_phone;
    private String order_sn;

}
