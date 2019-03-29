package com.gjp.model;

/**
 * 库存房源图片类型对象
 * 
 * @author 庆涛
 *
 */
public class HouseLibraryImageTypeVo {

	// id
	private Integer hit_id;
	// 图片类型
	private String hit_type;
	// 房屋编号
	private String hi_code;
	// 图片编号
	private Integer hm_id;

	public Integer getHit_id() {
		return hit_id;
	}

	public void setHit_id(Integer hit_id) {
		this.hit_id = hit_id;
	}

	public String getHit_type() {
		return hit_type;
	}

	public void setHit_type(String hit_type) {
		this.hit_type = hit_type;
	}

	public String getHi_code() {
		return hi_code;
	}

	public void setHi_code(String hi_code) {
		this.hi_code = hi_code;
	}

	public Integer getHm_id() {
		return hm_id;
	}

	public void setHm_id(Integer hm_id) {
		this.hm_id = hm_id;
	}

}
