package com.gjp.model;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
     * 企业经纪人
 *
 * @author tanglei
 * @description
 * @date Created in 2018/3/9
 */
@Data
public class ZkbCompanyAgent implements Serializable {
    //企业人员编码
    private Integer ca_id;
    //企业人员名称
    private String ca_name;
    //经纪人头像
    private String ca_headImage;
    //企业人员电话
    private String ca_phone;
    //企业人员密码
    private String ca_password;
    //企业人员备注
    private String ca_remark;
    //是否离职（0：在职1：离职）
    private Integer ca_bool;
    //企业人员创建时间
    private Date ca_create;
    //是否删除(0,未删除;1已删除)
    private Integer is_delete;
    //公司编码
    private Integer cy_id;
    //'经纪人状态 1：创建 2：实名审核 3：正常',
    private Integer ca_state;
    // 企业编码
    private Integer er_id;


    /**经纪人详情**/
    //企业人员详情编码
    private Integer cai_id;
    //企业人员身份证号码
    private String cai_number;
    //企业人员身份证正面
    private String cai_positiveImage;
    //企业人员身份证反面
    private String cai_oppositeImage;
    //企业人员真实姓名
    private String cai_name;
    //企业人员银行卡号
    private String cai_bankNum;
    //企业人员银行卡开户行
    private String cai_bankOpen;
    //企业人员银行卡开户地址
    private String cai_bankOpenAddress;
    //银行卡登记人
    private String cai_bankName;
    //创建时间
    private Date cai_create;

    /**公司表**/
    //公司名称
    private String cy_name;
    //公司最低佣金
    private Double cy_money;
    // 公司区域
    private String cy_region;
    // 公司区域code
    private String cy_addressCode;
    /**企业表**/
    //企业名称
    private String er_name;
    //企业logo
    private String er_logo;
    //展示logo路径
    private String er_logoPath;

    /**扩展**/
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
    // 客户发布时间
    private Date cc_createTime;
    // 客户成交时间
    private Date fm_create;

    /**公司管理账户**/
    //账户编码
    private Integer bca_id;
    private Integer user_id;
}
