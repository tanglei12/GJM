package com.gjp.model;

import lombok.Data;

import java.util.Date;
import java.util.List;


/**
 * 服务类型
 * 
 * @author zoe
 *
 */
@Data
public class ServiceMessage {

	// 服务基本信息编码
	private Integer sm_id;
	// 服务名称
	private String sm_name;
	// 服务图片
	private String sm_image;
	// 服务图片路劲
	private String sm_imagepath;
	// 服务内容
	private String sm_content;
	// 服务上传时间
	private Date sm_time;
	// 服务上传人
	private String sm_people;
	// 服务类型编码
	private Integer st_id;
	// 金额
	private Double st_money;
	
	//扩展字段
	// 服务类型名
	private String st_name;
	// 排序
	private Integer sm_order;
	// 服务归属部门
	private Integer ucc_id;
	private Integer sm_state;
	private List<String> inServiceWhere;

}
