package com.gjp.model;

import java.util.Date;

/**
 * 客户黑名单
 * @author hu
 *
 */
public class UserCustomerBlackList {
	
	// 主键编码
	private Integer bl_id;
	// 客户编码
	private String cc_code;
	// 客户类型1-意向房东；2-意向租客；3-正式房东；4-正式租客
	private String cc_type;
	// 客户名称
	private String cc_name;
	// 客户性别1-男；2-女；3-未知
	private String cc_sex;
	// 客户证件类型
	private String cc_cardType;
	// 客户证件号码
	private String cc_cardNum;
	// 客户电话
	private String cc_phone;
	// 拉黑原因
	private String black_comment;
	// 操作人员
	private Integer em_id;
	// 操作时间
	private Date bl_date;
	// 状态0-解除；1-生效
	private String bl_state;
	
	/***** 扩展信息 *****/
	// 操作人姓名
	private String em_name;
	// 证件信息
	private String idCard;
	// 客户信息
	private String cust;
	
	// sql条件
	private String sqlWhere;
	// 时间字段
	private String dateTitle;
	// 排序
	private String sqlOrderBy;
	// 开始时间
	private Date dateStart;
	// 结束时间
	private Date dateEnd;
	// pageNo
	private int pageNo;
	// pageSize
	private int pageSize;
		
	public Integer getBl_id() {
		return bl_id;
	}
	public void setBl_id(Integer bl_id) {
		this.bl_id = bl_id;
	}
	public String getCc_name() {
		return cc_name;
	}
	public void setCc_name(String cc_name) {
		this.cc_name = cc_name;
	}
	public String getCc_sex() {
		return cc_sex;
	}
	public void setCc_sex(String cc_sex) {
		this.cc_sex = cc_sex;
	}
	public String getCc_cardType() {
		return cc_cardType;
	}
	public void setCc_cardType(String cc_cardType) {
		this.cc_cardType = cc_cardType;
	}
	public String getCc_cardNum() {
		return cc_cardNum;
	}
	public void setCc_cardNum(String cc_cardNum) {
		this.cc_cardNum = cc_cardNum;
	}
	public String getCc_phone() {
		return cc_phone;
	}
	public void setCc_phone(String cc_phone) {
		this.cc_phone = cc_phone;
	}
	public String getBlack_comment() {
		return black_comment;
	}
	public void setBlack_comment(String black_comment) {
		this.black_comment = black_comment;
	}
	public Integer getEm_id() {
		return em_id;
	}
	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}
	public Date getBl_date() {
		return bl_date;
	}
	public void setBl_date(Date bl_date) {
		this.bl_date = bl_date;
	}
	public String getBl_state() {
		return bl_state;
	}
	public void setBl_state(String bl_state) {
		this.bl_state = bl_state;
	}
	public String getEm_name() {
		return em_name;
	}
	public void setEm_name(String em_name) {
		this.em_name = em_name;
	}
	public String getIdCard() {
		return idCard;
	}
	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}
	public String getCust() {
		return cust;
	}
	public void setCust(String cust) {
		this.cust = cust;
	}
	public String getCc_code() {
		return cc_code;
	}
	public void setCc_code(String cc_code) {
		this.cc_code = cc_code;
	}
	public String getCc_type() {
		return cc_type;
	}
	public void setCc_type(String cc_type) {
		this.cc_type = cc_type;
	}
	public String getSqlWhere() {
		return sqlWhere;
	}
	public void setSqlWhere(String sqlWhere) {
		this.sqlWhere = sqlWhere;
	}
	public String getDateTitle() {
		return dateTitle;
	}
	public void setDateTitle(String dateTitle) {
		this.dateTitle = dateTitle;
	}
	public String getSqlOrderBy() {
		return sqlOrderBy;
	}
	public void setSqlOrderBy(String sqlOrderBy) {
		this.sqlOrderBy = sqlOrderBy;
	}
	public Date getDateStart() {
		return dateStart;
	}
	public void setDateStart(Date dateStart) {
		this.dateStart = dateStart;
	}
	public Date getDateEnd() {
		return dateEnd;
	}
	public void setDateEnd(Date dateEnd) {
		this.dateEnd = dateEnd;
	}
	public int getPageNo() {
		return pageNo;
	}
	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	
}
