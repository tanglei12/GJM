package com.gjp.model;

/**
 * 业绩账单详情
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年5月20日 上午10:28:09 
 */
public class AchievementBillContent {

	// 业绩详情编码
	private Integer abc_id;
	// 业绩类型
	private String abc_type;
	// 业绩金额
	private Double abc_money;
	// 业绩账单编码
	private Integer ab_id;
	
	public AchievementBillContent(){}

	public Integer getAbc_id() {
		return abc_id;
	}

	public void setAbc_id(Integer abc_id) {
		this.abc_id = abc_id;
	}

	public String getAbc_type() {
		return abc_type;
	}

	public void setAbc_type(String abc_type) {
		this.abc_type = abc_type;
	}

	public Double getAbc_money() {
		return abc_money;
	}

	public void setAbc_money(Double abc_money) {
		this.abc_money = abc_money;
	}

	public Integer getAb_id() {
		return ab_id;
	}

	public void setAb_id(Integer ab_id) {
		this.ab_id = ab_id;
	}
	
}
