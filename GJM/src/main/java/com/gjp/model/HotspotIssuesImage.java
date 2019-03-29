package com.gjp.model;

public class HotspotIssuesImage {

	//热点问题图片编码
	private Integer hii_id;
	//热点问题图片名
	private String hii_name;
	//热点问题图片路劲
	private String hii_image;
	//热点问题编码
	private Integer sip_id;
	
	//构造方法
	public HotspotIssuesImage(){
		
	}

	public HotspotIssuesImage(String hii_name, String hii_image, Integer sip_id) {
		super();
		this.hii_name = hii_name;
		this.hii_image = hii_image;
		this.sip_id = sip_id;
	}

	public Integer getHii_id() {
		return hii_id;
	}

	public void setHii_id(Integer hii_id) {
		this.hii_id = hii_id;
	}

	public String getHii_name() {
		return hii_name;
	}

	public void setHii_name(String hii_name) {
		this.hii_name = hii_name;
	}

	public String getHii_image() {
		return hii_image;
	}

	public void setHii_image(String hii_image) {
		this.hii_image = hii_image;
	}

	public Integer getSip_id() {
		return sip_id;
	}

	public void setSip_id(Integer sip_id) {
		this.sip_id = sip_id;
	}
	
	
}
