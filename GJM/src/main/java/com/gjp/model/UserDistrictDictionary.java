package com.gjp.model;

/**
 * 行政区字典表
 * @author shenhx
 * @create 2017-10-24 14:27
 **/
public class UserDistrictDictionary {

    private Integer ga_id;
    private String pc_id;
    private String ci_id;
    private String sj_id;
    private String district_address;

    public Integer getGa_id() {
        return ga_id;
    }

    public void setGa_id(Integer ga_id) {
        this.ga_id = ga_id;
    }

    public String getPc_id() {
        return pc_id;
    }

    public void setPc_id(String pc_id) {
        this.pc_id = pc_id;
    }

    public String getCi_id() {
        return ci_id;
    }

    public void setCi_id(String ci_id) {
        this.ci_id = ci_id;
    }

    public String getSj_id() {
        return sj_id;
    }

    public void setSj_id(String sj_id) {
        this.sj_id = sj_id;
    }

    public String getDistrict_address() {
        return district_address;
    }

    public void setDistrict_address(String district_address) {
        this.district_address = district_address;
    }
}
