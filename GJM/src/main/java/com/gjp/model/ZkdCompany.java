package com.gjp.model;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * @author 陈智颖
 * @create 2018-03-05 下午4:44
 **/
@Data
public class ZkdCompany implements Serializable {

    // 企业分公司编码
    private Integer cy_id;
    // 企业名称
    private String cy_name;
    // 分公司地址
    private String cy_address;
    // 分公司区域(城市)
    private String cy_region;
    //区县
    private String cy_county;
    // 分公司地理位置
    private String cy_addressCode;
    // 分公司人员
    private String cy_personCount;
    // 分公司父级编码
    private Integer cy_pid;
    // 分公司超父级编码
    private Integer cy_sid;
    // 企业成交最低佣金
    private Double cy_money;
    // 企业编码
    private Integer er_id;
    // 创建时间
    private Date cy_create;
    // 分享次数
    private Integer release_num;
    // 企业名称
    private String er_name;
    // 企业当前信用分
    private Integer ct_endFraction;
    // 企业logo照片
    private String er_logo;
    // 企业人员编码
    private Integer ca_id;
    // 1：企业 2：经纪人
    private Integer ct_type;

    private Integer size;

    private List<Company> companyList;

    /**拓展**/
    //分公司账户帐号
    private String bca_account;
    //公司账户id
    private Integer user_id;
}
