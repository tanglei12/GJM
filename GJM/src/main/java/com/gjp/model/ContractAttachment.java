package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 合同执行记录附件对象
 *
 * @author 庆涛
 */
@Data
public class ContractAttachment {

    // 附件ID
    private Integer ca_id;
    // 执行记录ID
    private Integer cir_id;
    // 附件名称
    private String ca_name;
    // 附件路径
    private String ca_path;
    // 附件路径
    private String ca_path_real;
    // 上传时间
    private Date ca_addTime;
    // 附件类型
    private String ca_type;
    // 附件状态；1：有效；0：无效
    private Integer ca_state;
    // 附件标题
    private String ca_title;
    // 附件第三方ID
    private String ca_fid;
    // 附件描述
    private String ca_desc;
    // 附件第三方合同ID
    private String ca_contractId;
    // 附件第三方签署者
    private String ca_signer;
    // 附件签署状态（1：待签署、2：已签署、3：已拒绝）
    private Integer ca_signState;

}
