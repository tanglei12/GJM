package com.gjp.model;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 租客信息共享
 * @author 王兴荣
 * @create 2018-03-07 18:22
 **/
@Data
public class ZkdCustomer implements Serializable {
    private Integer cc_id;
    private String cc_title;
    private String cc_name;
    private String cc_phone;
    private Integer cc_sex;
    private Integer cc_state;
    private String cc_propertyInfo;
    private Integer cc_money;
    private String cc_moneyStr;
    private Integer cc_room;
    private String  cc_province;
    private String  cc_area;
    private String  cc_town;
    private String  cc_subway;
    private String  cc_train;
    private Integer cc_mode;
    private String cc_modeStr;
    private Integer cc_lease;
    private String cc_leaseStr;
    private String  cc_decoration;
    private String  cc_require;
    private Date cc_endDate;
    private Date cc_createTime;
    private String cc_createTimeStr;
    private Integer ca_id;
    private Integer cc_type;
    // 当前所需多币
    private Integer collect_money;

    //发布状态
    private Integer state;

    //时间条件
    private String paramTime;
    // 最小金额
    private Double moneyStart;
    // 最大金额
    private Double moneyEnd;
    // 开始查询条数
    private Integer pageNo;
    // 查询条数
    private Integer pageSize;
    // 条件
    private String where;
    // 排序
    private String orderBy;
    // 排序模式
    private String ascDesc;
    //数据总数
    private Integer total;
    // 查看次数
    private int recordSize;
    // 浏览次数
    private int browseSize;

    /**浏览租客信息**/
    //浏览记录编码
    private Integer cb_id;
    //创建时间
    private Date cb_createTime;

    // 总数
    private Integer size;

    /**投诉**/
    // 信用来源编码
    private Integer ce_id;
    // 预警类型(1.虚假信息、2.求租人已租、3.电话打不通'、4.其它)
    private Integer ce_types;
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

    /**申诉信息**/
    //申诉主键
    private Integer ap_id;
    //说明
    private String ap_explain;
    //申诉状态（1.处理中2.成功3.失败）
    private Integer ap_state;
    //申诉进度（1.提交申诉2.申诉通过3.申诉失败）
    private Integer ap_progress;
    //申诉时间
    private Date ap_creatime;

    //几分钟 几个小时 发布
    private String createTime;

    /**反馈记录**/
    private Integer fm_id;

    /**购买记录**/
    //购买时间
    private Date ca_create;

}
