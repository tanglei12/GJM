package com.gjp.model;

/**
 * 图片类型
 * 
 * @author zoe
 *
 */
public class HouseHouseImageType {

	// 房屋图片类型编号
	private Integer hit_id;
	// 图片类型 (effect 效果图片,solid 户型图片,3d 3D效果图)
	private String hit_type;
	// 房屋编号
	private Integer hi_id;
	// 房屋图片
	private Integer hm_id;
	private String hi_code;
	// -- 扩展 ---
	// 房屋图片
	private HouseImageVo houseImage;
	// 旧类型
	private String old_type;

	public HouseHouseImageType() {
		super();
	}

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

	public Integer getHi_id() {
		return hi_id;
	}

	public void setHi_id(Integer hi_id) {
		this.hi_id = hi_id;
	}

	public Integer getHm_id() {
		return hm_id;
	}

	public void setHm_id(Integer hm_id) {
		this.hm_id = hm_id;
	}

	@Override
	public String toString() {
		return "HouseHouseImageType [hit_id=" + hit_id + ", hit_type=" + hit_type + ", hi_id=" + hi_id + ", hm_id=" + hm_id + "]";
	}

	public String getOld_type() {
		return old_type;
	}

	public void setOld_type(String old_type) {
		this.old_type = old_type;
	}

	public HouseImageVo getHouseImage() {
		return houseImage;
	}

	public void setHouseImage(HouseImageVo houseImage) {
		this.houseImage = houseImage;
	}

	public String getHi_code() {
		return hi_code;
	}

	public void setHi_code(String hi_code) {
		this.hi_code = hi_code;
	}

	
}
