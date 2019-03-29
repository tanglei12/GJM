package com.gjp.model;

import java.util.Date;

/**
 * 职位
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年10月26日 下午2:55:01 
 */
public class Position {

	// 职位编码
	private Integer ucp_id;
	// 职位名称
	private String ucp_name;
	// 组织架构编码
	private Integer ucc_id;
	// 职位备注
	private String ucp_remarks;
	// 创建时间
	private Date ucp_time;
	// 内部人员编码
	private Integer em_id;
	// 父级编码
	private Integer ucp_pid;
	// 父级名称
	private String pname;
	// 编码
	private Integer id;
	// 名称
	private String name;
	// 超父级编码
	private Integer pid;
	
	public Position() {
		super();
	}

	public Integer getUcp_id() {
		return ucp_id;
	}

	public void setUcp_id(Integer ucp_id) {
		this.ucp_id = ucp_id;
	}

	public String getUcp_name() {
		return ucp_name;
	}

	public void setUcp_name(String ucp_name) {
		this.ucp_name = ucp_name;
	}

	public Integer getUcc_id() {
		return ucc_id;
	}

	public void setUcc_id(Integer ucc_id) {
		this.ucc_id = ucc_id;
	}

	public String getUcp_remarks() {
		return ucp_remarks;
	}

	public void setUcp_remarks(String ucp_remarks) {
		this.ucp_remarks = ucp_remarks;
	}

	public Date getUcp_time() {
		return ucp_time;
	}

	public void setUcp_time(Date ucp_time) {
		this.ucp_time = ucp_time;
	}

	public Integer getEm_id() {
		return em_id;
	}

	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}

	public Integer getUcp_pid() {
		return ucp_pid;
	}

	public void setUcp_pid(Integer ucp_pid) {
		this.ucp_pid = ucp_pid;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

}
