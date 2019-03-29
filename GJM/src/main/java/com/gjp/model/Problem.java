package com.gjp.model;

import java.util.Date;

/**
 * 服务问题
 *
 * @date Jun 3, 2017 11:47:59 AM
 * @author chen
 *
 */
public class Problem {
	
	// 服务问题编码
	private Integer mdp_id;
	// 服务问题内容
	private String mdp_content;
	// 服务编码
	private Integer md_id;
	// 创建时间
	private Date mdp_date;
	
	public Integer getMdp_id() {
		return mdp_id;
	}
	public void setMdp_id(Integer mdp_id) {
		this.mdp_id = mdp_id;
	}
	public String getMdp_content() {
		return mdp_content;
	}
	public void setMdp_content(String mdp_content) {
		this.mdp_content = mdp_content;
	}
	public Integer getMd_id() {
		return md_id;
	}
	public void setMd_id(Integer md_id) {
		this.md_id = md_id;
	}
	public Date getMdp_date() {
		return mdp_date;
	}
	public void setMdp_date(Date mdp_date) {
		this.mdp_date = mdp_date;
	}
	
}
