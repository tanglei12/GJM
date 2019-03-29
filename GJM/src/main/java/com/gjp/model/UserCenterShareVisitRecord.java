package com.gjp.model;

import java.util.Date;

/**
 * 房源分享回访记录
 * 
 * @author zoe
 *
 */
public class UserCenterShareVisitRecord {

	// 编号
	private Integer svr_id;
	// 来源
	private String svr_extendSource;
	// 用户推广码
	private String svr_extendCode;
	// 推广地址
	private String svr_extendUrl;
	// 记录时间
	private Date svr_createTime;
	

	public UserCenterShareVisitRecord() {
		super();
	}


	public Integer getSvr_id() {
		return svr_id;
	}


	public void setSvr_id(Integer svr_id) {
		this.svr_id = svr_id;
	}


	public String getSvr_extendSource() {
		return svr_extendSource;
	}


	public void setSvr_extendSource(String svr_extendSource) {
		this.svr_extendSource = svr_extendSource;
	}


	public String getSvr_extendCode() {
		return svr_extendCode;
	}


	public void setSvr_extendCode(String svr_extendCode) {
		this.svr_extendCode = svr_extendCode;
	}


	public String getSvr_extendUrl() {
		return svr_extendUrl;
	}


	public void setSvr_extendUrl(String svr_extendUrl) {
		this.svr_extendUrl = svr_extendUrl;
	}


	public Date getSvr_createTime() {
		return svr_createTime;
	}


	public void setSvr_createTime(Date svr_createTime) {
		this.svr_createTime = svr_createTime;
	}
	
}
