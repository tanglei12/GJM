package com.gjp.model;


/**
 * 房屋品牌条件扩展
 * 
 * @author zoe
 *
 */
public class HouseBrandWhereExtended {

	// 品牌条件扩展编码
	private Integer bwe_id;
	// 品牌条件扩展名
	private String bwe_name;
	// 品牌条件编码
	private Integer bw_id;
	// 品牌条件排序
	private Integer bwe_num;

	public HouseBrandWhereExtended() {
		super();
	}

	public Integer getBwe_id() {
		return bwe_id;
	}

	public void setBwe_id(Integer bwe_id) {
		this.bwe_id = bwe_id;
	}

	public String getBwe_name() {
		return bwe_name;
	}

	public void setBwe_name(String bwe_name) {
		this.bwe_name = bwe_name;
	}

	public Integer getBw_id() {
		return bw_id;
	}

	public void setBw_id(Integer bw_id) {
		this.bw_id = bw_id;
	}

	public Integer getBwe_num() {
		return bwe_num;
	}

	public void setBwe_num(Integer bwe_num) {
		this.bwe_num = bwe_num;
	}
	
	
}
