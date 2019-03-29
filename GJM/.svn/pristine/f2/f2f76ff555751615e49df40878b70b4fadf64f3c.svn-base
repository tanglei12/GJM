package com.gjp.model;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 客户预警
 */
@Data
public class ZkdCustomerEarlywarn implements Serializable {

    // 信用来源编码
    private Integer ce_id;
    // 预警类型(1.虚假信息、2.求租人已租、3.电话打不通'、4.其它)
    private Integer ce_types;
    // 租客编码
    private Integer cc_id;
    // 预警类型(1:用户2:企业)
    private Integer ce_type;
    // 关联编码(企业or人员)
    private Integer ce_correlation;
    // 说明
    private String ce_explain;
    // 备注
    private String ce_remark;
    //状态（1.正常，2.撤销）
    private Integer ce_state;
    // 创建时间
    private Date ce_createTime;

    /************* 扩展 *************/
    // 租客信息标题
    private String cc_title;
    // 租客求租金额（比如1:500以下,2:500--1000,3:1000-1500,4:1500-2000,5:2000-3000,6:3000-4500,7:4500以上））
    private Integer cc_money;
    // 租客求租类型（1:整租,2:合租,3:不限）
    private Integer cc_mode;
    // 租客租期(1:长租,2:短租,3:不限)
    private Integer cc_lease;
    // 条数
    private Integer complainCount;
    // 创建时间
    private Date cc_createTime;

    //经纪人id
    private Integer ca_id;
    //类型：1-经纪人；2-企业
    private Integer cc_type;

    private String where;
    private Integer pageNo;
    private Integer pageSize;

    // 开始时间
    private Date dateStart;
    // 结束时间
    private Date dateEnd;

    /**经纪人申诉表**/
    private Integer ap_id;
}
