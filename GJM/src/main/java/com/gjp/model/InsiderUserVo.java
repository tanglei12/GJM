package com.gjp.model;

/**
 * @author 陈智颖
 * @create 2017-11-29 15:08
 **/
public class InsiderUserVo {

    // 内部员工编号
    private Integer em_id;
    // 头像
    private String em_image;
    // 电话
    private String em_phone;
    // 姓名
    private String em_name;
    // 部门
    private String ucc_name;
    // 职位
    private String ucp_name;

    public Integer getEm_id() {
        return em_id;
    }

    public void setEm_id(Integer em_id) {
        this.em_id = em_id;
    }

    public String getEm_image() {
        return em_image;
    }

    public void setEm_image(String em_image) {
        this.em_image = em_image;
    }

    public String getEm_phone() {
        return em_phone;
    }

    public void setEm_phone(String em_phone) {
        this.em_phone = em_phone;
    }

    public String getEm_name() {
        return em_name;
    }

    public void setEm_name(String em_name) {
        this.em_name = em_name;
    }

    public String getUcc_name() {
        return ucc_name;
    }

    public void setUcc_name(String ucc_name) {
        this.ucc_name = ucc_name;
    }

    public String getUcp_name() {
        return ucp_name;
    }

    public void setUcp_name(String ucp_name) {
        this.ucp_name = ucp_name;
    }
}
