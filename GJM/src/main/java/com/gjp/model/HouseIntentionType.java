package com.gjp.model;

import lombok.Data;

import java.util.Date;


/**
 * @author 陈智颖
 * @version 创建时间：2016年4月24日 下午5:39:21
 */
@Data
public class HouseIntentionType {
    //跟进内容记录ID
    private Integer ht_id;
    //跟进内容方式('电话跟进','实勘','其他')
    private String ht_type;
    //跟进内容
    private String ht_count;
    //跟进内容时间
    private Date ht_time;
    //跟基恩内容提醒时间
    private Date ht_remind_time;
    //跟进内容提醒内容
    private String ht_remind_count;
    // 房屋编码
    private String hi_code;
    //意向房源跟进员工ID
    private Integer em_id;
    // 开始数
    private Integer start;
    // 查询数
    private Integer end;
    //总数
    private Integer size;
    //跟进用户名
    private String em_name;
    //跟进用户联系方式
    private String em_phone;
    //跟进用户部门
    private String ucc_name;
    //图片个数
    private Integer imageNum;
    //0：手动输入，1：系统添加
    private Integer ht_houseType;

}
