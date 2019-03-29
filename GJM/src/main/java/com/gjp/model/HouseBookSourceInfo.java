package com.gjp.model;

/**
 * 预约来源
 * @author hu
 *
 */
public class HouseBookSourceInfo {

	// 编码
	private Integer bs_id;
	// 来源编码
	private String sourceId;
	// 来源名称
	private String sourceName;
	public Integer getBs_id() {
		return bs_id;
	}
	public void setBs_id(Integer bs_id) {
		this.bs_id = bs_id;
	}
	public String getSourceId() {
		return sourceId;
	}
	public void setSourceId(String sourceId) {
		this.sourceId = sourceId;
	}
	public String getSourceName() {
		return sourceName;
	}
	public void setSourceName(String sourceName) {
		this.sourceName = sourceName;
	}
	@Override
	public String toString() {
		return "HouseBookSourceInfo [bs_id=" + bs_id + ", sourceId=" + sourceId + ", sourceName=" + sourceName + "]";
	}
}
