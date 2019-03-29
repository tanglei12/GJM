package com.gjp.model;

import java.util.Date;

/**
 * 图片管理
 * 
 * 说明一：图片用插件传到服务器，默认非生效，保存path到相关业务表后，更新图片状态
 * 说明二：服务器会定时删除图片状态为失效、创建时间大于30分钟的图片。意思就是用户上传图片超过30分钟未保存，服务器自动删除上传的图片
 * 说明三：图片默认上传到upload文件夹下面
 * 说明四：业务表数据删除后，通过img_path更新图片状态为失效，服务器会自动删除
 * 说明五：以img_path为索引做增删改查操作
 * 说明六：
 * 
 * @author 王孝元
 * @version 创建时间：2017年3月17日 上午11:29:17
 * 
 */
public class UploadImage {

	// 编号
	private Integer img_id;
	// 存储地址
	private String img_path;
	// 图片状态 0：失效 1：生效(默认失效)
	private Integer img_state;
	// 创建时间
	private Date img_createTime;

	public Integer getImg_id() {
		return img_id;
	}

	public void setImg_id(Integer img_id) {
		this.img_id = img_id;
	}

	public String getImg_path() {
		return img_path;
	}

	public void setImg_path(String img_path) {
		this.img_path = img_path;
	}

	public Integer getImg_state() {
		return img_state;
	}

	public void setImg_state(Integer img_state) {
		this.img_state = img_state;
	}

	public Date getImg_createTime() {
		return img_createTime;
	}

	public void setImg_createTime(Date img_createTime) {
		this.img_createTime = img_createTime;
	}

}
