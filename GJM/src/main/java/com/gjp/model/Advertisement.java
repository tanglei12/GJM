package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 广告实体
 * @author tanglei
 */
@Data
public class Advertisement {
	//id
	private Integer ad_id;
	//发布人id
	private Integer ad_em_id;
	//广告名称
	private String ad_name;
	//广告图片
	private String ad_image;
	//访问地址
	private String ad_url;
	//图片介绍
	private String ad_alert;
	//提示框
	private String ad_title;
	//广告介绍
	private String ad_content;
	//发布渠道 (1.外部app 2.内部app 3.官网 )
	private Integer ad_channel;
	//发布位置 1.首页 2.服务页3.外部app启动页4.支付成功提示图
	private Integer ad_position;
	//说明
	private String ad_text;
	//活动code
	private Integer am_code;
	//广告状态 1：启用 2：禁止 3:删除
	private Integer ad_state;
	//时间
	private Date ad_time;
	//用户名
	private String em_name;

	

}
