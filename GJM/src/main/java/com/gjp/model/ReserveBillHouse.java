package com.gjp.model;


import lombok.Data;

/**
 * 线下添加预定订单房屋信息
 * 
 * @author zoe
 *
 */
@Data
public class ReserveBillHouse {

	//房屋编号
	private Integer hi_id;
	//房屋名称
	private String hi_name;
	//房屋价格
	private Double hi_money;
	//房屋类型
	private String hi_type;
	//房屋区域
	private String hi_area;
	//房屋商圈
	private String hi_district;
	//房屋轨道
	private String hi_track;
	//房屋面积
	private Double hi_measure;
	//房屋室
	private Integer hi_houseS;
	//房屋厅
	private Integer hi_houseT;
	//房屋卫
	private Integer hi_houseW;
	//房屋简述
	private String hi_function;
	//房屋朝向
	private String hi_orientation;
	//房屋楼层
	private Integer hi_floor;
	//房屋唯一编码
	private String hi_code;
	//房屋装修情况
	private String hi_state;
	//房屋品牌
	private String hb_name;
	//房屋图片
	private String hm_path;
	//地址
	private String propertyInfo_address;
	//房号
	private String hi_address;
	//房屋公寓类型
	private String hi_version;
	//房屋状态
	private String he_state;
	//条件
	private String param;
	//物业名称
	private String propertyInfo_Name;
	//定金
	private Double deposit;
	
}
