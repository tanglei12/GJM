package com.gjp.model;

import java.util.Date;

/**
 * 问题描述列表
 * 
 * @author zoe
 *
 */
public class ProblemList {

	// 问题描述编码
	private Integer pl_id;
	// 问题名称
	private String pl_name;
	// 问题上传人
	private String pl_people;
	// 问题上传时间
	private Date pl_time;
	// 服务类型编码
	private Integer st_id;
	
	//扩展字段
	// 服务类型名
	

	public ProblemList() {
		super();
	}

	public Integer getPl_id() {
		return pl_id;
	}

	public void setPl_id(Integer pl_id) {
		this.pl_id = pl_id;
	}

	public String getPl_name() {
		return pl_name;
	}

	public void setPl_name(String pl_name) {
		this.pl_name = pl_name;
	}

	public String getPl_people() {
		return pl_people;
	}

	public void setPl_people(String pl_people) {
		this.pl_people = pl_people;
	}

	public Date getPl_time() {
		return pl_time;
	}

	public void setPl_time(Date pl_time) {
		this.pl_time = pl_time;
	}

	public Integer getSt_id() {
		return st_id;
	}

	public void setSt_id(Integer st_id) {
		this.st_id = st_id;
	}

	
}
