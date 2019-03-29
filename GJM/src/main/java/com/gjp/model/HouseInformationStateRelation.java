package com.gjp.model;

/**
 * 类型关联表
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年7月1日 下午2:36:03 
 */
public class HouseInformationStateRelation {

	// 类型关联表
	private Integer hisr_id;
	// 房屋code
	private String hi_code;
	// 房屋状态编码
	private Integer his_id;
	//房屋类型名
	private String his_name;
	
	public HouseInformationStateRelation(){
		
	}

	public Integer getHisr_id() {
		return hisr_id;
	}

	public void setHisr_id(Integer hisr_id) {
		this.hisr_id = hisr_id;
	}

	public String getHi_code() {
		return hi_code;
	}

	public void setHi_code(String hi_code) {
		this.hi_code = hi_code;
	}

	public Integer getHis_id() {
		return his_id;
	}

	public void setHis_id(Integer his_id) {
		this.his_id = his_id;
	}

	public String getHis_name() {
		return his_name;
	}

	public void setHis_name(String his_name) {
		this.his_name = his_name;
	}
}
