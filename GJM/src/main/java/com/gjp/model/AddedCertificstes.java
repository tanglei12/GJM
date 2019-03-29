package com.gjp.model;

import java.util.Date;

public class AddedCertificstes {
	//贷款证件id
	private Integer cd_id;
	//申请人id
	private Integer cd_em_id;
	// 申请人照片
	private String cd_peopleImg;
	//申请人照片状态   1.正常  2.不正常
	private Integer cd_peopleImg_state;
	// 身份证正面
	private String cd_idCard;
	// 身份证正面照片状态 1.正常  2.不正常
	private Integer cd_idCard_state;
	// 身份证反面
	private String cd_idCard_side;
	// 身份证反面状态  1.正常  2.不正常
	private Integer cd_idCard_side_state;
	//紧急联系人
	private String cd_urgentName;
	//紧急联系人电话
	private String cd_urgentPhone;
	// 添加时间
	private Date cd_time;
	
	public Integer getCd_id() {
		return cd_id;
	}
	public void setCd_id(Integer cd_id) {
		this.cd_id = cd_id;
	}
	public Integer getCd_em_id() {
		return cd_em_id;
	}
	public void setCd_em_id(Integer cd_em_id) {
		this.cd_em_id = cd_em_id;
	}
	public String getCd_peopleImg() {
		return cd_peopleImg;
	}
	public void setCd_peopleImg(String cd_peopleImg) {
		this.cd_peopleImg = cd_peopleImg;
	}
	public Integer getCd_peopleImg_state() {
		return cd_peopleImg_state;
	}
	public void setCd_peopleImg_state(Integer cd_peopleImg_state) {
		this.cd_peopleImg_state = cd_peopleImg_state;
	}
	public String getCd_idCard() {
		return cd_idCard;
	}
	public void setCd_idCard(String cd_idCard) {
		this.cd_idCard = cd_idCard;
	}
	public Integer getCd_idCard_state() {
		return cd_idCard_state;
	}
	public void setCd_idCard_state(Integer cd_idCard_state) {
		this.cd_idCard_state = cd_idCard_state;
	}
	public String getCd_idCard_side() {
		return cd_idCard_side;
	}
	public void setCd_idCard_side(String cd_idCard_side) {
		this.cd_idCard_side = cd_idCard_side;
	}
	public Integer getCd_idCard_side_state() {
		return cd_idCard_side_state;
	}
	public void setCd_idCard_side_state(Integer cd_idCard_side_state) {
		this.cd_idCard_side_state = cd_idCard_side_state;
	}
	public Date getCd_time() {
		return cd_time;
	}
	public void setCd_time(Date cd_time) {
		this.cd_time = cd_time;
	}
	public String getCd_urgentName() {
		return cd_urgentName;
	}
	public void setCd_urgentName(String cd_urgentName) {
		this.cd_urgentName = cd_urgentName;
	}
	public String getCd_urgentPhone() {
		return cd_urgentPhone;
	}
	public void setCd_urgentPhone(String cd_urgentPhone) {
		this.cd_urgentPhone = cd_urgentPhone;
	}
	
}
