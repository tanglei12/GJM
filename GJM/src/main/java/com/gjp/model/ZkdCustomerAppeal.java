package com.gjp.model;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 申诉表
 * @author tanglei
 * @description
 * @date Created in 2018/3/16
 */
@Data
public class ZkdCustomerAppeal implements Serializable {
    //申诉主键
    private Integer ap_id;
    //投诉id
    private Integer ce_id;
    //租客编码
    private Integer cc_id;
    //申诉人id
    private Integer ca_id;
    //说明
    private String ap_explain;
    //申诉状态（1.处理中2.成功3.失败）
    private Integer ap_state;
    //申诉进度（1.提交申诉2.申诉通过3.申诉失败）
    private Integer ap_progress;
    //申诉时间
    private Date ap_creatime;
    private Integer er_count;

    /**租客信息**/
    // 租客信息标题
    private String cc_title;
    //租客求租金额（比如1:500以下,2:500--1000,3:1000-1500,4:1500-2000,5:2000-3000,6:3000-4500,7:4500以上））
    private String cc_money;
    //是否是其它金额（0:不是,1:是）
    private Integer cc_otherMoney;
    //租金最小金额
    private Double cc_minMoney;
    //最大金额
    private Double cc_maxMoney;
    //租客求租厅室(0:单配，1：1房，2:2房，3:3房，4:4房及以上)',
    private Integer cc_room;
    //性别(0:女士，1：先生)
    private Integer cc_sex;
    //租客求租类型（1:整租,2:合租,3:不限）
    private Integer cc_mode;
    //租客租期(1:长租,2:短租,3:不限)
    private Integer cc_lease;
    //租客姓名
    private String cc_name;
    //租客电话
    private String cc_phone;
    //期望小区
    private String cc_propertyInfo;
    //租客求租市
    private String cc_province;
    //租客求租区
    private String cc_area;
    //租客求租镇
    private String cc_town;
    //补充信息(求租补充说明)
    private String cc_require;
    //创建时间(发布时间)
    private Date cc_createTime;



    /**企业经纪人**/
    //企业人员名称(申诉人)
    private String ca_name;
    //企业人员电话
    private String ca_phone;
    //是否离职（0：在职1：离职）
    private Integer ca_bool;
    //公司编码
    private Integer cy_id;
    // 企业编码
    private Integer er_id;


    /**客户预警**/

    // 预警类型(1.虚假信息、2.求租人已租、3.电话打不通'、4.其它)
    private Integer ce_types;
    //预警类型(1:用户2:企业)
    private Integer ce_type;
    // 关联编码(企业or人员)
    private Integer ce_correlation;
    // 说明
    private String ce_explain;
    // 备注
    private String ce_remark;
    //状态（1.正常，2.撤销）
    private Integer ce_state;
    //预警时间
    private  Date ce_createTime;

    /**企业信息**/
    // 企业名称
    private String cy_name;
    // 用户账户
    private String bca_account;

    /**拓展**/
    private String where;
    private Integer pageNo;
    private Integer pageSize;

    // 开始时间
    private Date dateStart;
    // 结束时间
    private Date dateEnd;

}
