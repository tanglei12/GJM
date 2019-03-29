package com.gjp.model;

import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * 组织架构表
 *
 * @author 陈智颖
 * @create 2017-10-21 13:53
 **/
@Data
public class Company {

    //公司编号
    private Integer ucc_id;
    //公司名称
    private String ucc_name;
    //组织成立时间
    private Date ucc_time;
    //备注
    private String ucc_remarks;
    //父级公司编号
    private Integer ucc_pid;
    //公司负责人
    private String ucc_person;
    //公司电话
    private String ucc_phone;
    //组织类型(公司、部门)
    private String ucc_type;
    //公司简称
    private String ucc_short;
    //上级公司名称
    private String pi_name;
    // 父级name
    private String ucc_pname;
    // 部门状态 1：启用 0：停用
    private Integer ucc_state;
    // 负责人编码
    private Integer em_id;
    // 编码
    private int id;
    // 父级编码
    private int pid;
    // 名称
    private String name;
    // 状态
    private int state;
    // 部门区域
    private int cr_id;
    // 部门地址
    private String ucc_address;
    // 部门图片
    private String ucc_image;

    private String hi_code;
    private String whereList;
    private Integer pageNo;
    private Integer pageSize;
    // 排序参数
    private String cc_code;
    //企业列表
    private List<Company> children;

}

