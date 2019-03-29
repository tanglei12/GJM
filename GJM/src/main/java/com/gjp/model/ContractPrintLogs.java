package com.gjp.model;

import java.util.Date;

/**
 *
 *打印日志
 *
 * @date Feb 24, 2017 11:02:39 AM
 * @author chen
 *
 */
public class ContractPrintLogs {

	// 账单打印编码
	private Integer cpl_id;
	// 订单code
	private String bco_code;
	// 内容
	private String cpl_text;
	// 次数
	private Integer cpl_num;
	// 创建时间
	private Date cpl_date;
	// 期数
	private Integer bco_num;
	
	public Integer getCpl_id() {
		return cpl_id;
	}
	public void setCpl_id(Integer cpl_id) {
		this.cpl_id = cpl_id;
	}
	public String getBco_code() {
		return bco_code;
	}
	public void setBco_code(String bco_code) {
		this.bco_code = bco_code;
	}
	public String getCpl_text() {
		return cpl_text;
	}
	public void setCpl_text(String cpl_text) {
		this.cpl_text = cpl_text;
	}
	public Integer getCpl_num() {
		return cpl_num;
	}
	public void setCpl_num(Integer cpl_num) {
		this.cpl_num = cpl_num;
	}
	public Date getCpl_date() {
		return cpl_date;
	}
	public void setCpl_date(Date cpl_date) {
		this.cpl_date = cpl_date;
	}
	public Integer getBco_num() {
		return bco_num;
	}
	public void setBco_num(Integer bco_num) {
		this.bco_num = bco_num;
	}
}
