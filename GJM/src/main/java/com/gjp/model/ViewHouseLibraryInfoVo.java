package com.gjp.model;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 房屋所有信息
 *
 * @author 庆涛
 */
@Data
public class ViewHouseLibraryInfoVo  implements Serializable {

    // 房屋ID
    private int hi_id;
    // 房屋名称
    private String hi_name;
    // 存房价格
    private double hi_keepMoney;
    // 出租房屋价格
    private double hi_money;
    // 房屋类型
    private String hi_type;
    // 房屋面积
    private double hi_measure;
    // 房屋楼层
    private int hi_floor;
    // 房屋室
    private int hi_houseS;
    // 房屋厅
    private int hi_houseT;
    // 房屋卫
    private int hi_houseW;
    // 房屋功能间
    private String hi_function;
    // 房屋朝向
    private String hi_orientation;
    // 房东名称
    private String hi_peopleName;
    // 房屋扩展信息
    private int he_id;
    // 房屋品牌编码
    private int hb_id;
    // 房屋代码 标识房屋唯一性的编码，非主键。
    private String hi_code;
    // 内部人员编码
    private int pu_id;
    // 房屋浏览次数
    private int hi_num;
    // 房源点评
    private String hi_content;
    // 推荐群体编号
    private String recommendGroup_Id;
    // 物业编号
    private int propertyInfo_Id;
    // 房屋排序码
    private int hi_number;
    // 房屋简介
    private String hi_text;
    // 房屋坐标
    private String hi_latitude;
    // 托管管家
    private String hi_userManaged;
    // 房号(调用产权地址：物业地址+房号)
    private String hi_address;
    // 房屋装修情况
    private String hi_state;
    // 存房合同状态 (未签合同、待交接、待审核、已签合同)
    private String contract_intoStatus;
    // 出房合同状态 (未签合同、待交接、待审核、已签合同)
    private String contract_outStatus;
    // 意向房源编号
    private int phi_id;
    // 存房时间
    private Date hi_date;
    // 房源配置
    private String hi_project;
    // 房屋公寓类型
    private String hi_version;
    // 客户唯一CODE
    private String cc_code;
    // 房屋起始日期
    private Date contract_beginDate;
    // 房屋到期日期
    private Date contract_expiryDate;
    // 房屋招租状态 新存招租：1001 转租招租：1002 退租招租：1003 到期招租：1004 强收招租：1005 换房招租：1006 已签合同（停止招租） ：1020 已解约：1021 未接房：1022 暂停招租：2000
    private Integer hi_forRentState;
    // 是否招租（0：未招租、1：招租中）
    private Integer hi_isForRent;
    // 首年免租期
    private String hi_rentDay;
    // 定价
    private Double hi_price;
    // 定价次数
    private Integer hi_priceCount;
    //是否参与活动 0：否 1：是
    private Integer hi_boolActive;
    //0：不被公司收回 1：公司收回
    private Integer hi_houseActive;
    // 总楼层
    private Integer hi_totalFloor;

    // ********* 扩展1 ********* //

    // 定价id
    private Integer pst_id;
    // 定价
    private String pm_outMoney;
    // 房东名称
    private String he_peopleName;
    // 房东电话
    private String he_phone;
    // 房屋状态
    private String he_state;
    // 产权地址
    private String he_address;

    // ********* 扩展2 ********* //

    private String em_name;//
    private String em_phone;//
    private Integer em_id;

    // ********* 扩展3 ********* //

    private String propertyInfo_Name;// 物业信息
    private String propertyInfo_address;// 物业信息
    private String propertyInfo_department;// 物业部门
    private String propertyInfo_gui;// 轨道站
    private String propertyInfo_quan;// 商圈
    private String propertyInfo_quyu;// 所属区域（江北区）

    // ********* 扩展3 ********* //

    // 物业名称编码
    private int upn_id;
    // 物业名称
    private String upn_sname;
    // 栋、单元、区
    private String upn_code;
    // 房屋地址
    private String house_address;
    // 特价活动
    private String pst_name;
    // 涨价金额
    private Double pst_money;
    private String hi_busStation; //房屋最近公交站
    private String hi_busLine;//房屋最近公交站的线路
    private String hi_metro;//最近地铁
    // 最新管家
    private Integer hpr_newEmp;

    /******* 扩展4 ******/
    private String comm_req_id;
    private String room_code;
    private String upn_name;
    private Integer upn_sid;
    private String conim_id;
    private Integer comm_req_status;
    private String his_name;
    private String new_em_name;
    private String new_em_phone;

}
