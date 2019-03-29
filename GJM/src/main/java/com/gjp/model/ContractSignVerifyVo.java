package com.gjp.model;

import lombok.Data;

import java.util.Date;

@Data
public class ContractSignVerifyVo {
    private Integer cs_id;
    private String con_code;
    private Integer cs_state;
    private String cs_fid;
    private String cs_contractId;
    private String cs_signer;
    private Date cs_createTime;
}
