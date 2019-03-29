package com.gjp.model;

import java.util.Date;

/**
 * 合约订单对象
 * 
 * @author 庆涛
 *
 */
/**
 * @author 庆涛
 *
 */
public class ViewBusinessCancelContractListVo {

	// 编号
	private Integer cco_id;
	// 申请编码
	private String cco_code;
	// 合同编号
	private String contractObject_Code;
	// 合同编码
	private String contractObject_No;
	// 申请人
	private String cco_applicant;
	// 申请姓名
	private String cco_applicantName;
	// 联系电话
	@Deprecated
	private String cco_phone;
	// 图片
	private String cco_path;
	// 转租费用
	private Double cco_subletCost;
	// 申请内容
	private String cco_applicationContent;
	// 申请时间
	private Date cco_applicationTime;
	// 解约类型（租赁：转租、退租、续租，托管：解约、续约）
	private String cco_applicationType;
	// 状态（待审核，审核完成，物业交接，完成）
	private String cco_state;
	// 房屋编码
	private String hi_code;
	// 完成时间
	private Date cco_FinishTime;
	// 经办人
	private String cco_peopleName;
	// 经办时间
	private Date cco_handleDate;
	// 钥匙
	private Integer cco_key;
	// 服务费比例
	private String cco_moneyProportion;
	// 处理方式
	private String cco_processMode;
	// 处理人
	private String cco_processer;
	private String cco_bankCard;//
	private String cco_bank;//
	private Date cco_realDate;//

	// ------ 扩展 ------
	// 地址
	private String house_address;
	// 房号
	private String hi_address;
	// 小区名
	private String propertyInfo_Name;
	// 小区地址
	private String propertyInfo_address;
	// 审核人
	private String auditingRecord_author1;
	// 复核人
	private String auditingRecord_author2;
	// 合同类型
	private String contractObject_Type;
	// 状态（待审核，审核完成，物业交接，完成）
	private String[] cco_states;
	// 手机号码
	private String ccp_phone;
	// 逻辑判断状态
	private String cco_state_no;
	// 人员ID
	private Integer em_id;
	// 部门ID
	private Integer ucc_id;

	public Integer getCco_id() {
		return cco_id;
	}

	public void setCco_id(Integer cco_id) {
		this.cco_id = cco_id;
	}

	public String getCco_code() {
		return cco_code;
	}

	public void setCco_code(String cco_code) {
		this.cco_code = cco_code;
	}

	public String getCco_applicant() {
		return cco_applicant;
	}

	public void setCco_applicant(String cco_applicant) {
		this.cco_applicant = cco_applicant;
	}

	public String getCco_phone() {
		return cco_phone;
	}

	public void setCco_phone(String cco_phone) {
		this.cco_phone = cco_phone;
	}

	public Double getCco_subletCost() {
		return cco_subletCost;
	}

	public void setCco_subletCost(Double cco_subletCost) {
		this.cco_subletCost = cco_subletCost;
	}

	public String getCco_applicationContent() {
		return cco_applicationContent;
	}

	public void setCco_applicationContent(String cco_applicationContent) {
		this.cco_applicationContent = cco_applicationContent;
	}

	public Date getCco_applicationTime() {
		return cco_applicationTime;
	}

	public void setCco_applicationTime(Date cco_applicationTime) {
		this.cco_applicationTime = cco_applicationTime;
	}

	public String getCco_applicationType() {
		return cco_applicationType;
	}

	public void setCco_applicationType(String cco_applicationType) {
		this.cco_applicationType = cco_applicationType;
	}

	public String getContractObject_No() {
		return contractObject_No;
	}

	public void setContractObject_No(String contractObject_No) {
		this.contractObject_No = contractObject_No;
	}

	public String getHi_code() {
		return hi_code;
	}

	public void setHi_code(String hi_code) {
		this.hi_code = hi_code;
	}

	public String getCco_state() {
		return cco_state;
	}

	public void setCco_state(String cco_state) {
		this.cco_state = cco_state;
	}

	public Date getCco_FinishTime() {
		return cco_FinishTime;
	}

	public void setCco_FinishTime(Date cco_FinishTime) {
		this.cco_FinishTime = cco_FinishTime;
	}

	public String getPropertyInfo_Name() {
		return propertyInfo_Name;
	}

	public void setPropertyInfo_Name(String propertyInfo_Name) {
		this.propertyInfo_Name = propertyInfo_Name;
	}

	public String getHi_address() {
		return hi_address;
	}

	public void setHi_address(String hi_address) {
		this.hi_address = hi_address;
	}

	public String getCco_peopleName() {
		return cco_peopleName;
	}

	public void setCco_peopleName(String cco_peopleName) {
		this.cco_peopleName = cco_peopleName;
	}

	public Integer getCco_key() {
		return cco_key;
	}

	public void setCco_key(Integer cco_key) {
		this.cco_key = cco_key;
	}

	public String getCco_moneyProportion() {
		return cco_moneyProportion;
	}

	public void setCco_moneyProportion(String cco_moneyProportion) {
		this.cco_moneyProportion = cco_moneyProportion;
	}

	public String getCco_processMode() {
		return cco_processMode;
	}

	public void setCco_processMode(String cco_processMode) {
		this.cco_processMode = cco_processMode;
	}

	public String getCco_processer() {
		return cco_processer;
	}

	public void setCco_processer(String cco_processer) {
		this.cco_processer = cco_processer;
	}

	public String getCco_bankCard() {
		return cco_bankCard;
	}

	public void setCco_bankCard(String cco_bankCard) {
		this.cco_bankCard = cco_bankCard;
	}

	public String getCco_bank() {
		return cco_bank;
	}

	public void setCco_bank(String cco_bank) {
		this.cco_bank = cco_bank;
	}

	public String getPropertyInfo_address() {
		return propertyInfo_address;
	}

	public void setPropertyInfo_address(String propertyInfo_address) {
		this.propertyInfo_address = propertyInfo_address;
	}

	public Date getCco_handleDate() {
		return cco_handleDate;
	}

	public void setCco_handleDate(Date cco_handleDate) {
		this.cco_handleDate = cco_handleDate;
	}

	public String getAuditingRecord_author1() {
		return auditingRecord_author1;
	}

	public void setAuditingRecord_author1(String auditingRecord_author1) {
		this.auditingRecord_author1 = auditingRecord_author1;
	}

	public String getAuditingRecord_author2() {
		return auditingRecord_author2;
	}

	public void setAuditingRecord_author2(String auditingRecord_author2) {
		this.auditingRecord_author2 = auditingRecord_author2;
	}

	public String getContractObject_Code() {
		return contractObject_Code;
	}

	public void setContractObject_Code(String contractObject_Code) {
		this.contractObject_Code = contractObject_Code;
	}

	public String getHouse_address() {
		return house_address;
	}

	public void setHouse_address(String house_address) {
		this.house_address = house_address;
	}

	public Date getCco_realDate() {
		return cco_realDate;
	}

	public void setCco_realDate(Date cco_realDate) {
		this.cco_realDate = cco_realDate;
	}

	public String getCco_path() {
		return cco_path;
	}

	public void setCco_path(String cco_path) {
		this.cco_path = cco_path;
	}

	public String getCco_applicantName() {
		return cco_applicantName;
	}

	public void setCco_applicantName(String cco_applicantName) {
		this.cco_applicantName = cco_applicantName;
	}

	public String getContractObject_Type() {
		return contractObject_Type;
	}

	public void setContractObject_Type(String contractObject_Type) {
		this.contractObject_Type = contractObject_Type;
	}

	public String[] getCco_states() {
		return cco_states;
	}

	public void setCco_states(String[] cco_states) {
		this.cco_states = cco_states;
	}

	public String getCcp_phone() {
		return ccp_phone;
	}

	public void setCcp_phone(String ccp_phone) {
		this.ccp_phone = ccp_phone;
	}

	public String getCco_state_no() {
		return cco_state_no;
	}

	public void setCco_state_no(String cco_state_no) {
		this.cco_state_no = cco_state_no;
	}

	public Integer getUcc_id() {
		return ucc_id;
	}

	public void setUcc_id(Integer ucc_id) {
		this.ucc_id = ucc_id;
	}

	public Integer getEm_id() {
		return em_id;
	}

	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}

}
