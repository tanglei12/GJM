package com.gjp.model;

import java.util.Date;

/**
 * 预约模板管理
 * @author shenhx
 *
 */
public class HouseBookTemplateInfo {

	// 模板ID
	private Integer bt_id;
	// 模板名称
	private String templateName;
	// 模板用途
	private String templateUse;
	// 模板状态
	private String templateStatus;
	// 模板描述
	private String templateDesc;
	// 模板图像
	private String templateImg;
	// 模板发布范围
	private String templateArea;
	// 发布时间
	private Date templateTime;
	// 模板控件ID集合
	private String bc_ids;
	public String getBc_ids() {
		return bc_ids;
	}
	public void setBc_ids(String bc_ids) {
		this.bc_ids = bc_ids;
	}
	public Integer getBt_id() {
		return bt_id;
	}
	public void setBt_id(Integer bt_id) {
		this.bt_id = bt_id;
	}
	public String getTemplateName() {
		return templateName;
	}
	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}
	public String getTemplateUse() {
		return templateUse;
	}
	public void setTemplateUse(String templateUse) {
		this.templateUse = templateUse;
	}
	public String getTemplateStatus() {
		return templateStatus;
	}
	public void setTemplateStatus(String templateStatus) {
		this.templateStatus = templateStatus;
	}
	public String getTemplateDesc() {
		return templateDesc;
	}
	public void setTemplateDesc(String templateDesc) {
		this.templateDesc = templateDesc;
	}
	public String getTemplateImg() {
		return templateImg;
	}
	public void setTemplateImg(String templateImg) {
		this.templateImg = templateImg;
	}
	public String getTemplateArea() {
		return templateArea;
	}
	public void setTemplateArea(String templateArea) {
		this.templateArea = templateArea;
	}
	public Date getTemplateTime() {
		return templateTime;
	}
	public void setTemplateTime(Date templateTime) {
		this.templateTime = templateTime;
	}
	@Override
	public String toString() {
		return "HouseBookTemplateInfo [bt_id=" + bt_id + ", templateName=" + templateName + ", templateUse="
				+ templateUse + ", templateStatus=" + templateStatus + ", templateDesc=" + templateDesc
				+ ", templateImg=" + templateImg + ", templateArea=" + templateArea + ", templateTime=" + templateTime
				+ "]";
	}
}
