package com.gjp.model;

/**
 * @author 陈智颖
 * @create 2017-10-21 11:55
 **/
public class CompanyRegion {

    // 部门区域编码
    private Integer cr_id;
    // 区域名称
    private String cr_name;
    // 区域图片
    private String cr_image;

    public Integer getCr_id() {
        return cr_id;
    }

    public void setCr_id(Integer cr_id) {
        this.cr_id = cr_id;
    }

    public String getCr_name() {
        return cr_name;
    }

    public void setCr_name(String cr_name) {
        this.cr_name = cr_name;
    }

    public String getCr_image() {
        return cr_image;
    }

    public void setCr_image(String cr_image) {
        this.cr_image = cr_image;
    }
}
