package com.gjp.model;

import java.util.Date;

/**
 * 房源定价记录日志
 * 
 * @author 庆涛
 *
 */
public class HousePriceRecordVo {

	// 记录编号
	private Integer hpp_id;
	// 房源CODE
	private String hi_code;
	// 记录内容
	private String hpp_content;
	// 操作人（em_id）
	private Integer hpp_operator;
	// 创建时间
	private Date hpp_createTime;

	private String em_name;
	private String em_phone;

	public Integer getHpp_id() {
		return hpp_id;
	}

	public void setHpp_id(Integer hpp_id) {
		this.hpp_id = hpp_id;
	}

	public String getHi_code() {
		return hi_code;
	}

	public void setHi_code(String hi_code) {
		this.hi_code = hi_code;
	}

	public String getHpp_content() {
		return hpp_content;
	}

	public void setHpp_content(String hpp_content) {
		this.hpp_content = hpp_content;
	}

	public Integer getHpp_operator() {
		return hpp_operator;
	}

	public void setHpp_operator(Integer hpp_operator) {
		this.hpp_operator = hpp_operator;
	}

	public Date getHpp_createTime() {
		return hpp_createTime;
	}

	public void setHpp_createTime(Date hpp_createTime) {
		this.hpp_createTime = hpp_createTime;
	}

	public String getEm_name() {
		return em_name;
	}

	public void setEm_name(String em_name) {
		this.em_name = em_name;
	}

	public String getEm_phone() {
		return em_phone;
	}

	public void setEm_phone(String em_phone) {
		this.em_phone = em_phone;
	}

}
