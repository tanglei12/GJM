package com.gjp.model;

import java.util.Date;

/**
 * 客户关联人信息
 * @author shenhx
 *
 */
public class UserCustomerLinkMan {

	// 编码
	private Integer cl_id;
	// 客户编码
	private Integer cc_id;
	// 关联人姓名
	private String cl_name;
	// 客户性别（0：女、1：男、2：其他）
	private Integer cl_sex;
	// 证件类型（1：身份证、2：军官证、3：商户号、4：护照、5：台湾居民通行证、6：香港居民通行证、7：临时身份证、8：外国人永久居留证）
	private Integer cl_cardType;
	// 客户证件号
	private String cl_cardNum;
	// 邮箱
	private String cl_email;
	// 职业
	private String cl_occupation;
	// 电话
	private String cl_phone;
	// QQ
	private String cl_qq;
	// 微信
	private String cl_wx;
	// 工作单位
	private String cl_work;
	// 创建时间
	private Date cl_createTime;
	// 官网账号
	private String cl_account;
	// 备注
	private String cl_remarks;
	// 信用阈值
	private Integer cl_fraction;
	// 通讯地址
	private String cl_address;
	// 有效期限
	private String cl_date;
	// 与客户关系1：夫妻；2：父母；3：子女；4：兄弟姐妹；5：同事；6：朋友；7：同学；8：其他
	private Integer relationship;
	// 更新日期
	private Date update_time;
	public Integer getCl_id() {
		return cl_id;
	}
	public void setCl_id(Integer cl_id) {
		this.cl_id = cl_id;
	}
	public Integer getCc_id() {
		return cc_id;
	}
	public void setCc_id(Integer cc_id) {
		this.cc_id = cc_id;
	}
	public String getCl_name() {
		return cl_name;
	}
	public void setCl_name(String cl_name) {
		this.cl_name = cl_name;
	}
	public Integer getCl_sex() {
		return cl_sex;
	}
	public void setCl_sex(Integer cl_sex) {
		this.cl_sex = cl_sex;
	}
	public Integer getCl_cardType() {
		return cl_cardType;
	}
	public void setCl_cardType(Integer cl_cardType) {
		this.cl_cardType = cl_cardType;
	}
	public String getCl_cardNum() {
		return cl_cardNum;
	}
	public void setCl_cardNum(String cl_cardNum) {
		this.cl_cardNum = cl_cardNum;
	}
	public String getCl_email() {
		return cl_email;
	}
	public void setCl_email(String cl_email) {
		this.cl_email = cl_email;
	}
	public String getCl_occupation() {
		return cl_occupation;
	}
	public void setCl_occupation(String cl_occupation) {
		this.cl_occupation = cl_occupation;
	}
	public String getCl_phone() {
		return cl_phone;
	}
	public void setCl_phone(String cl_phone) {
		this.cl_phone = cl_phone;
	}
	public String getCl_qq() {
		return cl_qq;
	}
	public void setCl_qq(String cl_qq) {
		this.cl_qq = cl_qq;
	}
	public String getCl_wx() {
		return cl_wx;
	}
	public void setCl_wx(String cl_wx) {
		this.cl_wx = cl_wx;
	}
	public String getCl_work() {
		return cl_work;
	}
	public void setCl_work(String cl_work) {
		this.cl_work = cl_work;
	}
	public Date getCl_createTime() {
		return cl_createTime;
	}
	public void setCl_createTime(Date cl_createTime) {
		this.cl_createTime = cl_createTime;
	}
	public String getCl_account() {
		return cl_account;
	}
	public void setCl_account(String cl_account) {
		this.cl_account = cl_account;
	}
	public String getCl_remarks() {
		return cl_remarks;
	}
	public void setCl_remarks(String cl_remarks) {
		this.cl_remarks = cl_remarks;
	}
	public Integer getCl_fraction() {
		return cl_fraction;
	}
	public void setCl_fraction(Integer cl_fraction) {
		this.cl_fraction = cl_fraction;
	}
	public String getCl_address() {
		return cl_address;
	}
	public void setCl_address(String cl_address) {
		this.cl_address = cl_address;
	}
	public String getCl_date() {
		return cl_date;
	}
	public void setCl_date(String cl_date) {
		this.cl_date = cl_date;
	}
	public Integer getRelationship() {
		return relationship;
	}
	public void setRelationship(Integer relationship) {
		this.relationship = relationship;
	}
	public Date getUpdate_time() {
		return update_time;
	}
	public void setUpdate_time(Date update_time) {
		this.update_time = update_time;
	}
}
