package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * @author JiangQt
 * @description
 * @date Created in 2017/10/14
 */
@Data
public class ContractAgreementAuditingRecordVo {
    private Integer caar_id;
    private Integer caa_id;
    private String caar_content;
    private Integer caar_state;
    private String caar_deac;
    private Date caar_createTime;
    //合同唯一编码
    private String con_code;
}
