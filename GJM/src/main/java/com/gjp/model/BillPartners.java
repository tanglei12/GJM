package com.gjp.model;

import java.util.Date;

/**
 * 合作伙伴
 * 
 * @author zoe
 *
 */
public class BillPartners {

	// 合作伙伴编码
	private Integer bp_id;
	// 合作公司名称
	private String bp_name;
	// 公司所属类型
	private String bp_type;
	// 公司地址
	private String bp_address;
	// 合作条件
	private String bp_where;
	// 业务联系人
	private String bp_businessPerson;
	// 财务联系人
	private String bp_moneyPerson;
	// 技术联系人
	private String bp_technologyPerson;
	// 业务联系人电话
	private String bp_businessPhone;
	// 财务联系人电话
	private String bp_moneyPhone;
	// 技术联系人电话
	private String bp_technologyPhone;
	// 合作时间
	private Date bp_cooperationDate;
	// 创建时间
	private Date dp_date;
	// 合作状态
	private String dp_state;

	// =====扩展信息======

	// 是否支持代偿
	private Integer bpe_isRepay;
	// 服务费率
	private Double serviceRate;
	// 违约金比例
	private Double bpe_dedit;

	public BillPartners() {
		super();
	}

	public Integer getBp_id() {
		return bp_id;
	}

	public void setBp_id(Integer bp_id) {
		this.bp_id = bp_id;
	}

	public String getBp_name() {
		return bp_name;
	}

	public void setBp_name(String bp_name) {
		this.bp_name = bp_name;
	}

	public String getBp_type() {
		return bp_type;
	}

	public void setBp_type(String bp_type) {
		this.bp_type = bp_type;
	}

	public String getBp_address() {
		return bp_address;
	}

	public void setBp_address(String bp_address) {
		this.bp_address = bp_address;
	}

	public String getBp_where() {
		return bp_where;
	}

	public void setBp_where(String bp_where) {
		this.bp_where = bp_where;
	}

	public String getBp_businessPerson() {
		return bp_businessPerson;
	}

	public void setBp_businessPerson(String bp_businessPerson) {
		this.bp_businessPerson = bp_businessPerson;
	}

	public String getBp_moneyPerson() {
		return bp_moneyPerson;
	}

	public void setBp_moneyPerson(String bp_moneyPerson) {
		this.bp_moneyPerson = bp_moneyPerson;
	}

	public String getBp_technologyPerson() {
		return bp_technologyPerson;
	}

	public void setBp_technologyPerson(String bp_technologyPerson) {
		this.bp_technologyPerson = bp_technologyPerson;
	}

	public String getBp_businessPhone() {
		return bp_businessPhone;
	}

	public void setBp_businessPhone(String bp_businessPhone) {
		this.bp_businessPhone = bp_businessPhone;
	}

	public String getBp_moneyPhone() {
		return bp_moneyPhone;
	}

	public void setBp_moneyPhone(String bp_moneyPhone) {
		this.bp_moneyPhone = bp_moneyPhone;
	}

	public String getBp_technologyPhone() {
		return bp_technologyPhone;
	}

	public void setBp_technologyPhone(String bp_technologyPhone) {
		this.bp_technologyPhone = bp_technologyPhone;
	}

	public Date getBp_cooperationDate() {
		return bp_cooperationDate;
	}

	public void setBp_cooperationDate(Date bp_cooperationDate) {
		this.bp_cooperationDate = bp_cooperationDate;
	}

	public Date getDp_date() {
		return dp_date;
	}

	public void setDp_date(Date dp_date) {
		this.dp_date = dp_date;
	}

	public String getDp_state() {
		return dp_state;
	}

	public void setDp_state(String dp_state) {
		this.dp_state = dp_state;
	}

	public Integer getBpe_isRepay() {
		return bpe_isRepay;
	}

	public void setBpe_isRepay(Integer bpe_isRepay) {
		this.bpe_isRepay = bpe_isRepay;
	}

	public Double getBpe_dedit() {
		return bpe_dedit;
	}

	public void setBpe_dedit(Double bpe_dedit) {
		this.bpe_dedit = bpe_dedit;
	}

	public Double getServiceRate() {
		return serviceRate;
	}

	public void setServiceRate(Double serviceRate) {
		this.serviceRate = serviceRate;
	}

	@Override
	public String toString() {
		return "BillPartners [bp_id=" + bp_id + ", bp_name=" + bp_name + ", bp_type=" + bp_type + ", bp_address="
				+ bp_address + ", bp_where=" + bp_where + ", bp_businessPerson=" + bp_businessPerson
				+ ", bp_moneyPerson=" + bp_moneyPerson + ", bp_technologyPerson=" + bp_technologyPerson
				+ ", bp_businessPhone=" + bp_businessPhone + ", bp_moneyPhone=" + bp_moneyPhone
				+ ", bp_technologyPhone=" + bp_technologyPhone + ", bp_cooperationDate=" + bp_cooperationDate
				+ ", dp_date=" + dp_date + ", dp_state=" + dp_state + "]";
	}

}
