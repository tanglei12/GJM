package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 保险
 * 
 * @author JiangQT
 */
@Data
public class InsuranceVo {

  // 保险ID
  private Integer i_id;
  // 保单号
  private String i_insuranceNumber;
  //源保单号
  private String i_insuranceNumberHead;
  //目的保单号
  private String i_insuranceNumberTarget;
  // 保险公司
  private String i_company;
  // 投保日期
  private Date i_insureDate;
  // 被保险人
  private String i_insurant;
  //被保险人证件号
  private String i_IDNumber;
  // 保险期限开始
  private Date i_insurant_strat;
  // 保险期限结束
  private Date i_insurant_end;
  // 理赔情况
  private String i_ClaimSituation;
  // 经办人
  private String i_agent;
  // 是否批改(0:未批改;1:已批改)
  private Integer i_isCorrections;
  // 备注
  private String i_remarks;
  // 合同编号CODE
  private String contractObject_code;
  // 房屋编号CODE
  private String hi_code;
  //保险费用
  private Double i_cost;
  //关系
  private String i_correlation;



  /*=========扩展============*/
  //物业地址
  private String house_address;
}
