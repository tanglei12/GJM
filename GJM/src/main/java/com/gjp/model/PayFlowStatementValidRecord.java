package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * @author JiangQt
 * @description
 * @date Created in 2017-8-19
 */
@Data
public class PayFlowStatementValidRecord {
    private Integer pvf_id;
    private String bs_serialNumber;
    private String pvf_content;
    private Integer pvf_em_id;
    private String pvf_em_name;
    private Date pvf_validTime;
    private Date pvf_createTime;
}
