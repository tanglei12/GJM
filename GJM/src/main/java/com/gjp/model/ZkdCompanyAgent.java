package com.gjp.model;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 房管员表
 */
@Data
public class ZkdCompanyAgent implements Serializable {

    private Integer ca_id;
    private String ca_name;
    private String ca_headImage;
    private String ca_phone;
    private String ca_password;
    private String ca_remark;
    private Integer ca_bool;
    private Integer cy_id;
    private Integer ca_state;
    private Date ca_create;
    private Integer is_delete;
    private Integer cai_id;
    private String cai_number;
    private String cai_positiveImage;
    private String cai_oppositeImage;
    private String cai_name;
    private String cai_bankNum;
    private String cai_bankOpen;
    private String cai_bankOpenAddress;
    private String cai_bankName;
    private Date cai_create;
}
