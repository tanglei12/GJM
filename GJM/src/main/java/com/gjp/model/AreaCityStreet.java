package com.gjp.model;


/**
 * 省市区镇四级数据
 * @author tanglei
 */
public class AreaCityStreet {
	//主键
	private Integer id;
	// 编码
	private Integer code;
	// 父级
	private Integer parent_id;
	// 名称
	private String name;
	//等级
	private Integer level;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getCode() {
		return code;
	}
	public void setCode(Integer code) {
		this.code = code;
	}
	public Integer getParent_id() {
		return parent_id;
	}
	public void setParent_id(Integer parent_id) {
		this.parent_id = parent_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getLevel() {
		return level;
	}
	public void setLevel(Integer level) {
		this.level = level;
	}
	

}
