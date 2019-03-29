package com.gjp.model;

import java.util.Date;

/**
 * 合同数量统计
 * 
 * @author 庆涛
 *
 */
public class ContractQuantityStatisticsVo {

	private Integer cqs_Id;
	private Integer cqs_date;
	private Integer cqs_number;
	private Date cqs_createTime;

	public Integer getCqs_Id() {
		return cqs_Id;
	}

	public void setCqs_Id(Integer cqs_Id) {
		this.cqs_Id = cqs_Id;
	}

	public Integer getCqs_date() {
		return cqs_date;
	}

	public void setCqs_date(Integer cqs_date) {
		this.cqs_date = cqs_date;
	}

	public Integer getCqs_number() {
		return cqs_number;
	}

	public void setCqs_number(Integer cqs_number) {
		this.cqs_number = cqs_number;
	}

	public Date getCqs_createTime() {
		return cqs_createTime;
	}

	public void setCqs_createTime(Date cqs_createTime) {
		this.cqs_createTime = cqs_createTime;
	}

}
