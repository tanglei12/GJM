package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2015年6月27日 下午6:24:17
 */
@Data
public class HouseInformation {

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
	private Integer hi_measure;
	// 房屋楼层
	private Integer hi_floor;
	//房屋楼层总层数
	private Integer hi_totalFloor;
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
	// 房屋代码 标识房屋唯一性的编码，非主键。
	private String hi_code;
	// 内部人员编码
	private Integer pu_id;
	// 房屋浏览次数
	private Integer hi_num;
	//房源点评
	private String hi_content;
	// 推荐群体编号
	private Integer recommendGroup_Id;
	// 物业编号
	private Integer propertyInfo_Id;
	// 房屋排序码
	private Integer hi_number;
	//租金最小值
	private Double minMoney;
	//租金最大值
	private Double maxMoney;
	//最小室
	private Integer minHouseS;
	//最小面积
	private Integer minMeasure;
	//最大面积
	private Integer maxMeasure;
	//排序
	private String order;
	//房屋简介
	private String hi_text;
	//托管管家
	private String hi_userManaged;
	//房屋地址
	private String hi_address;
	//房屋状态
	private String state;
	//关键词
	private String keyWord;
	//房屋装修情况
	private String hi_state;
	//房屋配置
	private String hi_project;

	// 产权人
	private String he_peopleName;
	// 房屋房东电话
	private String he_phone;
	// 房屋状态 (free 空闲,rental 出租,expire 合同到期,clean 需要打扫)
	private String he_state;
	// 产权编号
	private String he_number;
	// 产权证号
	private String he_cardNumber;
	// 房屋性质('住宅','商住','商业')
	private String he_nature;
	// 房屋购买价格
	private Double he_money;
	// 房屋购买时间
	private Date he_buyTime;
	// 房东地址
	private String he_address;
	// 房屋上传时间
	private Date he_time;
	//总条数
	private Integer size;
	//分页类
	private Page page;

	/**房屋发布预览扩展**/
	// 页面图片
	private String hm_path;
	// 房屋配置图标
	private String conim_id;
	// 管家电话
	private String em_phone;
	// 坐标
	private String propertyInfo_coordinate;
	// 合同到期时间
	private Date contract_expiryDate;
	// 到期月数
	private Integer exMonth;
	// 是否收藏
	private Integer hi_bools;
	// 房屋最近公交站
	private String hi_busStation;
	// 房屋最近公交站的线路
	private String hi_busLine;
	// 最近地铁
	private String hi_metro;
	//管家头像
	private String em_image;

	private String hi_newDate;
	private String upn_sname;
	private Date hi_date;
	private String propertyInfo_quyu;
    // 几室几厅
    private String houseTSW;
}
