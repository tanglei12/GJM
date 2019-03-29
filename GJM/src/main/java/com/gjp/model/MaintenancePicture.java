package com.gjp.model;


/**
 * 维修图片
 * 
 * @author zoe
 *
 */
public class MaintenancePicture {

	// 维修图片编号
	private Integer mpe_id;
	// 图片类型
	private String mpe_type;
	// 维修图片路径
	private String mpe_path;
	// 维修申请编号
	private Integer md_id;
	
	//扩展字段
	// 服务类型名
	
	public MaintenancePicture() {
		super();
	}

	public Integer getMpe_id() {
		return mpe_id;
	}

	public void setMpe_id(Integer mpe_id) {
		this.mpe_id = mpe_id;
	}

	public String getMpe_path() {
		return mpe_path;
	}

	public void setMpe_path(String mpe_path) {
		this.mpe_path = mpe_path;
	}

	public Integer getMd_id() {
		return md_id;
	}

	public void setMd_id(Integer md_id) {
		this.md_id = md_id;
	}

	public String getMpe_type() {
		return mpe_type;
	}

	public void setMpe_type(String mpe_type) {
		this.mpe_type = mpe_type;
	}
}
