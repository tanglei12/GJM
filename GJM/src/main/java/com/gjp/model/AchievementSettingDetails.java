package com.gjp.model;


/**
 * 设置详情
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年8月24日 下午4:02:43 
 */
public class AchievementSettingDetails {

	// 业绩设置编码
	private Integer asd_id;
	// 管理费
	private String asd_type;
	// 管理费比例
	private Integer asd_Proportion;
	// 免租期
	private Integer as_id;
	
	public AchievementSettingDetails(){}

	public Integer getAsd_id() {
		return asd_id;
	}

	public void setAsd_id(Integer asd_id) {
		this.asd_id = asd_id;
	}

	public String getAsd_type() {
		return asd_type;
	}

	public void setAsd_type(String asd_type) {
		this.asd_type = asd_type;
	}

	public Integer getAsd_Proportion() {
		return asd_Proportion;
	}

	public void setAsd_Proportion(Integer asd_Proportion) {
		this.asd_Proportion = asd_Proportion;
	}

	public Integer getAs_id() {
		return as_id;
	}

	public void setAs_id(Integer as_id) {
		this.as_id = as_id;
	}

}
