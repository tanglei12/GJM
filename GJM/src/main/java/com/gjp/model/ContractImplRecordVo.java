package com.gjp.model;

import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * 合同执行记录对象
 *
 * @author 庆涛
 */
@Data
public class ContractImplRecordVo {

    // 审核记录编号
    private Integer cir_id;
    // 房屋唯一编码
    private String hi_code;
    // 合同唯一编码
    private String contractObject_code;
    // 记录类型（）
    private Integer cir_type;
    // 审核内容
    private String cir_content;
    // 审核人名称
    private Integer cir_author;
    // 记录来源（0：系统；1：手动）
    private Integer cir_source;
    // 审核时间
    private Date cir_createTime;

    // ********扩展******** //

    // 合同唯一编码
    private String contractObject_No;
    // 记录人姓名
    private String em_name;
    // 第几页
    private Integer start;
    // 每页条数
    private Integer end;
    // 开始时间
    private String beginTime;
    // 结束时间
    private String endTime;
    // 附件列表
    private List<ContractAttachment> attList = null;
    // 申请价格
    private double apply_price;
    // 审核结果
    private String priceResult;
    // 驳回理由
    private String refused_reason;

}
