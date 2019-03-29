package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * @author 陈智颖
 * @create 2018-01-29 下午4:56
 **/
@Data
public class EmployeeOneLogin {
    // 单点登陆编码
    private Integer eml_id;
    // pc端是否登陆 0:未登录 1:已登陆
    private Integer eml_pcBool;
    // pc端ip地址
    private String eml_pcIp;
    // pc端登陆时间
    private Date eml_pcDate;
    // 移动端是否登陆 0:未登录 1:已登陆
    private Integer eml_phoneBool;
    // 移动端唯一标识
    private String eml_phoneCode;
    private String phoneCode;
    // 移动端登陆类型 android or ios
    private String eml_phoneType;
    private String phoneType;
    // 移动端登陆时间
    private Date eml_phoneDate;
    // 内部人员编码
    private Integer em_id;
    // 登陆时间
    private String dateStr;

}
