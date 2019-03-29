package com.gjp.model;

import java.util.Date;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年5月19日 下午6:26:59 
 */
public class ViewContractStatement {

	//合同编码
	private String contractObject_No;
	//经办时间
	private Date cco_handleDate;
	//状态
	private String cco_state;
	//转租费
	private Double cco_subletCost;
	//合同code
	private String contractObject_Code;
	// 交房日期
	private Date cco_realDate;
	
	public ViewContractStatement(){}

	public String getContractObject_No() {
		return contractObject_No;
	}

	public void setContractObject_No(String contractObject_No) {
		this.contractObject_No = contractObject_No;
	}

	public Date getCco_handleDate() {
		return cco_handleDate;
	}

	public void setCco_handleDate(Date cco_handleDate) {
		this.cco_handleDate = cco_handleDate;
	}

	public String getCco_state() {
		return cco_state;
	}

	public void setCco_state(String cco_state) {
		this.cco_state = cco_state;
	}

	public Double getCco_subletCost() {
		return cco_subletCost;
	}

	public void setCco_subletCost(Double cco_subletCost) {
		this.cco_subletCost = cco_subletCost;
	}

	public String getContractObject_Code() {
		return contractObject_Code;
	}

	public void setContractObject_Code(String contractObject_Code) {
		this.contractObject_Code = contractObject_Code;
	}

	public Date getCco_realDate() {
		return cco_realDate;
	}

	public void setCco_realDate(Date cco_realDate) {
		this.cco_realDate = cco_realDate;
	}
}
