package com.gjp.model;

/**
 * 物业周边
 * @author zoe
 *
 */
public class PropertyInfoSubwany {
	
	//信息编号
	private Integer subway_Id;
	//名称
	private String subway_Name;
	//所属城市
	private String subway_City;
	//物业编号
	private Integer propertyInfo_Id;
	
	public PropertyInfoSubwany() {

	}

	public Integer getSubway_Id() {
		return subway_Id;
	}

	public void setSubway_Id(Integer subway_Id) {
		this.subway_Id = subway_Id;
	}

	public String getSubway_Name() {
		return subway_Name;
	}

	public void setSubway_Name(String subway_Name) {
		this.subway_Name = subway_Name;
	}

	public String getSubway_City() {
		return subway_City;
	}

	public void setSubway_City(String subway_City) {
		this.subway_City = subway_City;
	}

	public Integer getPropertyInfo_Id() {
		return propertyInfo_Id;
	}

	public void setPropertyInfo_Id(Integer propertyInfo_Id) {
		this.propertyInfo_Id = propertyInfo_Id;
	}

}
