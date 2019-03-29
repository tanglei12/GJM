package com.gjp.model;

import lombok.Data;

/**
 * @author 陈智颖
 * @create 2017-12-02 17:02
 **/
@Data
public class PersionVo {

    // 部门名称
    private String ucc_name;
    // 内部人员名称
    private String em_name;
    // 内部职位
    private String ucp_name;
    // 用户编码
    private Integer em_id;
    // 部门编码
    private Integer ucc_id;
    // 部门电话
    private String ucc_phone;
    // 电话
    private String em_phone;

}
