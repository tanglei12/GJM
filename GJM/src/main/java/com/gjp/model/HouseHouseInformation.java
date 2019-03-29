package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 房屋基本信息表
 * 
 * @author zoe
 *
 */
@Data
public class HouseHouseInformation {

	// 房屋信息编码
	private Integer hi_id;
	// 房屋名称
	private String hi_name;
	// 房屋价格
	private Double hi_money;
	// 房屋类型('普通住宅','高档住宅')
	private String hi_type;
	// 房屋区域
	private String hi_area;
	// 房屋商圈
	private String hi_district;
	// 房屋轨道
	private String hi_track;
	// 房屋面积
	private Double hi_measure;
	// 房屋楼层
	private Integer hi_floor;
	// 房屋室
	private Integer hi_houseS;
	// 房屋厅
	private Integer hi_houseT;
	// 房屋卫
	private Integer hi_houseW;
	// 房屋功能间
	private String hi_function;
	// 房屋朝向('东','南','西','北')
	private String hi_orientation;
	// 房东名称
	private String hi_peopleName;
	// 房屋经纬度
	private String hi_latitude;
	// 房屋扩展信息
	private Integer he_id;
	// 房屋品牌编码
	private Integer hb_id;
	// 房屋代码 标识房屋唯一性的编码，非主键
	private String hi_code;
	// 内部人员编码
	private Integer pu_id;
	// 房屋浏览次数
	private Integer hi_num;
	// 房源点评
	private String hi_content;
	// 推荐群体编号
	private String RecommendGroup_Id;
	// 物业编号
	private Integer PropertyInfo_Id;
	// 房屋排序码
	private Integer hi_number;
	// 房屋简介
	private String hi_text;
	// 托管管家
	private String hi_userManaged;
	// 房屋地址
	private String hi_address;
	// 房屋情况
	private String hi_state;
	// 存房合同状态
	private String contract_intoStatus;
	// 出房合同状态
	private String contract_outStatus;
	// 房屋楼层总层数
	private Integer hi_totalFloor;
	// 房屋信息编码
	private Integer phi_id;
	// 房屋信息编码
	private Date hi_date;
	// 存屋价格
	private Double hi_keepMoney;
	// 房屋配置
	private String hi_project;
	// 发布人员编号
	private Integer hi_releaseId;
	// 房源公寓类型
	private String hi_version;
	// 定价
	private Double hi_price;
	// 定价次数
	private Integer hi_priceCount;
	// 是否招租
	private Integer hi_isForRent;
	// 房屋地址
	private String he_address;

	// 扩展字段
	// 内部人员姓名
	private String em_name;
	// 内部人员电话
	private String em_phone;
	// 房屋品牌名称
	private String hb_name;
	// 推荐群体名称
	private String RecommendGroup_Name;
	// 物业名称
	private String PropertyInfo_Name;
	//
	private String Release_name;

	// 物业名称编号
	private Integer upn_id;
	// 物业编号
	private String upn_code;
	// 物业名称
	private String upn_sname;

	// 合同编码
	private Integer contractObject_Id;

	// 扩展信息
	private String he_peopleName;
	// 扩展信息
	private String he_phone;
	// 房屋状态
	private String he_state;
	// 物业地址
	private String propertyInfo_address;
	// 物业地址坐标
	private String propertyInfo_coordinate;
	// 物业地址区域
	private String propertyInfo_quyu;
	// 物业公交站点
	private String propertyInfo_transit;
	// 地铁站
	private String propertyInfo_gui;
	// 过期时间
	private Date ContractObject_DeadlineTime;
	// 是否发布
	private String he_hiState;

	// sql条件
	private String sqlWhere;

	// ==扩展==

	// 图片数量
	private Integer img_count;
	// 线上房源编号
	private Integer online_id;
	// 人员信息列表
	private String pu_ids;
	// 总数
	private Integer size;

	// 房屋地址
	private String house_address;
	private String hi_busStation; //房屋最近公交站
	private String hi_busLine;//房屋最近公交站的线路
	private String hi_metro;//最近地铁
	private String conim_id;//房间配套设施图片关联id

	//0：未发布 1：已发布
	private Integer he_isPublish;

}
