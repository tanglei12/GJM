package com.gjp.model;

import java.util.Date;

/**
 * 意向房屋图片
 * 
 * @author zoe
 *
 */
public class HouseIntentionImage {

	// 房屋图片编码
	private Integer him_id;
	// 房屋图片名称
	private String him_name;
	// 房屋图片类型
	private String him_type;
	// 房屋图片路径
	private String him_path;
	// 图片上传时间
	private Date him_time;
	// 房屋CODE
	private String hi_code;

	// 扩展字段
	// 类型
	private String ty;

	public HouseIntentionImage() {
		super();
	}

	public Integer getHim_id() {
		return him_id;
	}

	public void setHim_id(Integer him_id) {
		this.him_id = him_id;
	}

	public String getHim_name() {
		return him_name;
	}

	public void setHim_name(String him_name) {
		this.him_name = him_name;
	}

	public String getHim_path() {
		return him_path;
	}

	public void setHim_path(String him_path) {
		this.him_path = him_path;
	}

	public Date getHim_time() {
		return him_time;
	}

	public void setHim_time(Date him_time) {
		this.him_time = him_time;
	}

	public String getTy() {
		return ty;
	}

	public void setTy(String ty) {
		this.ty = ty;
	}

	public String getHi_code() {
		return hi_code;
	}

	public void setHi_code(String hi_code) {
		this.hi_code = hi_code;
	}

	public String getHim_type() {
		return him_type;
	}

	public void setHim_type(String him_type) {
		this.him_type = him_type;
	}

}
