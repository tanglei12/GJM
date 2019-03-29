package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 手机房屋类
 * 
 * @author 陈智颖
 *
 */
@Data
public class HouseInformationKeepVo {

	//房屋编号
	private Integer hi_id;
	// 存房价格
	private Double hi_keepMoney;
	// 出房价格
	private Double hi_money;
	// 房屋类型
	private String hi_type;
	// 房屋区域
	private String hi_area;
	// 房屋商圈
	private String hi_district;
	// 房屋轨道
	private String hi_track;
	//装修情况
	private String hi_state;
	//房屋点评
	private String hi_content;
	// 房屋面积
	private Double hi_measure;
	// 房屋楼层
	private Integer hi_floor;
	// 房屋室
	private Integer hi_houseS;
	private String hi_houseSQL;
	// 房屋厅
	private Integer hi_houseT;
	// 房屋卫
	private Integer hi_houseW;
	// 房号
	private String hi_address;
	// 物业名称
	private String propertyInfo_Name;
	//房屋编码
	private String hi_code;
	//房屋品牌
	private String hb_name;
	// 房屋图片路径
	private String hm_path;
	// 房屋图片路径
	private String hm_path_real;
	// 房东姓名
	private String he_peopleName;
	// 房屋房东电话
	private String he_phone;
	// 管家ID
	private Integer em_id;
	// 管家姓名
	private String em_name;
	// 管家电话
	private String em_phone;
	//房屋状态
	private String he_state;
	//物业地址
	private String propertyInfo_address;
	// 房屋招租状态
	private Integer hi_forRentState;
	private String hi_forRentStateStr;
	private String hi_forRentStateColor;
	// 室厅卫
	private String houseTSW;
	// 总数
	private Integer size;
	// 第几页
	private Integer pageSize;
	//开始页
	private Integer start;
	//查询多少条
	private Integer end;
	// 存房开始时间
	private Date contract_beginDate;
	// 存房到期时间
	private Date contract_expiryDate;
	// 出房定价
	private String pm_outMoney;
	// 涨价金额
	private Double pst_money;
	// 托管合同状态
	private String contract_intoStatus;
	// 租赁合同状态
	private String contract_outStatus;
	// 招租期
	private Integer hi_leaseDay;
	// 朝向
	private String hi_orientation;
	// 房屋产权地址
	private String he_address;
	// 最新管家
	private Integer hpr_newEmp;
	// 是否招租
	private Integer hi_isForRent;
	// 部门
	private Integer ucc_id;
	// 区域
	private String propertyInfo_quyu;
	// 房源定价
	private Double hi_price;
	// 价格区间
	private String moneyStartEnd;
	// 整租还是合租
	private Integer his_id;
	// 整租还是合租
	private String his_name;
	// 整租还是合租颜色
	private String his_nameColor;
	// 所属部门
	private String ucc_name;
	// 房源优势
	private String hi_function;
	// 房屋配置图标
	private String conim_id;
	
}
