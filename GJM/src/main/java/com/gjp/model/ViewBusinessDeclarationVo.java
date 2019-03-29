package com.gjp.model;

import java.util.Date;

/**
 * 申报单
 * 
 * @author admin
 *
 */
public class ViewBusinessDeclarationVo {

	private Integer md_id;// 订单编号
	private String md_name;// 订单名称
	private String md_number;// 订单唯一编号
	private String order_code;// 订单唯一编号
	private String md_problem;// 订单描述
	private String md_people;// 申请人
	private String cc_code;// 申请人
	private String md_phone;// 联系电话
	private String md_contactpeople;// 联系人
	private String md_contactPhone;// 联系电话
	private Date md_time;// 申请时间
	private String md_state;// 订单状态
	private String user_id;// 用户编码
	private String user_realName;// 用户名
	private String hi_code;// 房屋编码
	private String md_source;// 申请来源
	private String md_applyType;// 申请类型编码
	private Integer md_agentApplyer;// 代理申请人编号
	private String md_agentApplyerT;//判断是否存在受理
	private String applyer; // 代理申请人
	private String typeOfApply_Name; // 代理申请人
	private String mdg_state; //派工账单
	private String accepter; // 受理者
	private String propertyInfo_address; // 物业地址
	private String propertyInfo_Name; // 物业名
	private String hi_address; // 房屋号
	private String md_type;// 类型名称
	private Integer em_id;//
	private String em_name;
	private String em_post;
	private Integer task_state;
	private Integer taskCount;
	private String finish_step;
	private Date start_time;
	private Date estimated_time;
	private String bco_code;//保洁订单号
	private Double bco_shouldMoney;//当前收款金额
	private Integer bco_num;//保洁次数
	private Integer thereNum;//已做清洁次数
	private String mdg_moneyCode;//费用清单编码
	private String md_clearOrder;//保洁订单编码
	private String contentTxt;//保洁订单编码
	private String serviceState;//服务状态
	private String mi_path;//图片路径
	private String house_address;//房屋地址
	private String hi_area; //区域
	private String upn_sname; //物业
	private Date mtk_start_time; //开始时间
	private Date mtk_end_time; //结束时间
	private byte[] md_CustomerImage; //客户签字
	private String md_address;
	private Date apply_time;
	private String contractObject_Code;
	private String ucc_name;
	private Integer isService;// 是否是客服部
	private String sm_name;
	private String st_name;
	private String mtk_state;
	private double mdg_money;
	private String old_address;

	public ViewBusinessDeclarationVo(){
		
	}

	public Integer getMd_id() {
		return md_id;
	}

	public void setMd_id(Integer md_id) {
		this.md_id = md_id;
	}

	public String getMd_name() {
		return md_name;
	}

	public void setMd_name(String md_name) {
		this.md_name = md_name;
	}

	public String getMd_number() {
		return md_number;
	}

	public void setMd_number(String md_number) {
		this.md_number = md_number;
	}

	public String getMd_problem() {
		return md_problem;
	}

	public void setMd_problem(String md_problem) {
		this.md_problem = md_problem;
	}

	public String getMd_people() {
		return md_people;
	}

	public void setMd_people(String md_people) {
		this.md_people = md_people;
	}

	public String getMd_phone() {
		return md_phone;
	}

	public void setMd_phone(String md_phone) {
		this.md_phone = md_phone;
	}

	public String getMd_contactpeople() {
		return md_contactpeople;
	}

	public void setMd_contactpeople(String md_contactpeople) {
		this.md_contactpeople = md_contactpeople;
	}

	public String getMd_contactPhone() {
		return md_contactPhone;
	}

	public void setMd_contactPhone(String md_contactPhone) {
		this.md_contactPhone = md_contactPhone;
	}

	public Date getMd_time() {
		return md_time;
	}

	public void setMd_time(Date md_time) {
		this.md_time = md_time;
	}

	public String getMd_state() {
		return md_state;
	}

	public void setMd_state(String md_state) {
		this.md_state = md_state;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getHi_code() {
		return hi_code;
	}

	public void setHi_code(String hi_code) {
		this.hi_code = hi_code;
	}

	public String getMd_source() {
		return md_source;
	}

	public void setMd_source(String md_source) {
		this.md_source = md_source;
	}

	public String getMd_applyType() {
		return md_applyType;
	}

	public void setMd_applyType(String md_applyType) {
		this.md_applyType = md_applyType;
	}

	public Integer getMd_agentApplyer() {
		return md_agentApplyer;
	}

	public void setMd_agentApplyer(Integer md_agentApplyer) {
		this.md_agentApplyer = md_agentApplyer;
	}

	public String getMd_agentApplyerT() {
		return md_agentApplyerT;
	}

	public void setMd_agentApplyerT(String md_agentApplyerT) {
		this.md_agentApplyerT = md_agentApplyerT;
	}

	public String getApplyer() {
		return applyer;
	}

	public void setApplyer(String applyer) {
		this.applyer = applyer;
	}

	public String getMdg_state() {
		return mdg_state;
	}

	public void setMdg_state(String mdg_state) {
		this.mdg_state = mdg_state;
	}

	public String getAccepter() {
		return accepter;
	}

	public void setAccepter(String accepter) {
		this.accepter = accepter;
	}

	public String getPropertyInfo_address() {
		return propertyInfo_address;
	}

	public void setPropertyInfo_address(String propertyInfo_address) {
		this.propertyInfo_address = propertyInfo_address;
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

	public String getMd_type() {
		return md_type;
	}

	public void setMd_type(String md_type) {
		this.md_type = md_type;
	}

	public Integer getEm_id() {
		return em_id;
	}

	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}

	public String getBco_code() {
		return bco_code;
	}

	public void setBco_code(String bco_code) {
		this.bco_code = bco_code;
	}

	public Double getBco_shouldMoney() {
		return bco_shouldMoney;
	}

	public void setBco_shouldMoney(Double bco_shouldMoney) {
		this.bco_shouldMoney = bco_shouldMoney;
	}

	public Integer getBco_num() {
		return bco_num;
	}

	public void setBco_num(Integer bco_num) {
		this.bco_num = bco_num;
	}

	public Integer getThereNum() {
		return thereNum;
	}

	public void setThereNum(Integer thereNum) {
		this.thereNum = thereNum;
	}

	public String getMdg_moneyCode() {
		return mdg_moneyCode;
	}

	public void setMdg_moneyCode(String mdg_moneyCode) {
		this.mdg_moneyCode = mdg_moneyCode;
	}

	public String getMd_clearOrder() {
		return md_clearOrder;
	}

	public void setMd_clearOrder(String md_clearOrder) {
		this.md_clearOrder = md_clearOrder;
	}

	public String getContentTxt() {
		return contentTxt;
	}

	public void setContentTxt(String contentTxt) {
		this.contentTxt = contentTxt;
	}

	public String getServiceState() {
		return serviceState;
	}

	public void setServiceState(String serviceState) {
		this.serviceState = serviceState;
	}

	public String getMi_path() {
		return mi_path;
	}

	public void setMi_path(String mi_path) {
		this.mi_path = mi_path;
	}

	public String getHouse_address() {
		return house_address;
	}

	public void setHouse_address(String house_address) {
		this.house_address = house_address;
	}

	public String getHi_area() {
		return hi_area;
	}

	public void setHi_area(String hi_area) {
		this.hi_area = hi_area;
	}

	public String getUpn_sname() {
		return upn_sname;
	}

	public void setUpn_sname(String upn_sname) {
		this.upn_sname = upn_sname;
	}

	public Date getMtk_start_time() {
		return mtk_start_time;
	}

	public void setMtk_start_time(Date mtk_start_time) {
		this.mtk_start_time = mtk_start_time;
	}

	public Date getMtk_end_time() {
		return mtk_end_time;
	}

	public void setMtk_end_time(Date mtk_end_time) {
		this.mtk_end_time = mtk_end_time;
	}

	public byte[] getMd_CustomerImage() {
		return md_CustomerImage;
	}

	public void setMd_CustomerImage(byte[] md_CustomerImage) {
		this.md_CustomerImage = md_CustomerImage;
	}

	public String getOrder_code() {
		return order_code;
	}

	public void setOrder_code(String order_code) {
		this.order_code = order_code;
	}

	public String getCc_code() {
		return cc_code;
	}

	public void setCc_code(String cc_code) {
		this.cc_code = cc_code;
	}

	public String getTypeOfApply_Name() {
		return typeOfApply_Name;
	}

	public void setTypeOfApply_Name(String typeOfApply_Name) {
		this.typeOfApply_Name = typeOfApply_Name;
	}

	public String getMd_address() {
		return md_address;
	}

	public void setMd_address(String md_address) {
		this.md_address = md_address;
	}

	public Date getApply_time() {
		return apply_time;
	}

	public void setApply_time(Date apply_time) {
		this.apply_time = apply_time;
	}

	public String getContractObject_Code() {
		return contractObject_Code;
	}

	public void setContractObject_Code(String contractObject_Code) {
		this.contractObject_Code = contractObject_Code;
	}

	public String getUcc_name() {
		return ucc_name;
	}

	public void setUcc_name(String ucc_name) {
		this.ucc_name = ucc_name;
	}

	public Integer getIsService() {
		return isService;
	}

	public void setIsService(Integer isService) {
		this.isService = isService;
	}

	public String getEm_name() {
		return em_name;
	}

	public void setEm_name(String em_name) {
		this.em_name = em_name;
	}

	public String getEm_post() {
		return em_post;
	}

	public void setEm_post(String em_post) {
		this.em_post = em_post;
	}

	public Integer getTask_state() {
		return task_state;
	}

	public void setTask_state(Integer task_state) {
		this.task_state = task_state;
	}

	public Date getStart_time() {
		return start_time;
	}

	public void setStart_time(Date start_time) {
		this.start_time = start_time;
	}

	public Date getEstimated_time() {
		return estimated_time;
	}

	public void setEstimated_time(Date estimated_time) {
		this.estimated_time = estimated_time;
	}

	public Integer getTaskCount() {
		return taskCount;
	}

	public void setTaskCount(Integer taskCount) {
		this.taskCount = taskCount;
	}

	public String getFinish_step() {
		return finish_step;
	}

	public void setFinish_step(String finish_step) {
		this.finish_step = finish_step;
	}

	public String getUser_realName() {
		return user_realName;
	}

	public void setUser_realName(String user_realName) {
		this.user_realName = user_realName;
	}

	public String getSm_name() {
		return sm_name;
	}

	public void setSm_name(String sm_name) {
		this.sm_name = sm_name;
	}

	public String getMtk_state() {
		return mtk_state;
	}

	public void setMtk_state(String mtk_state) {
		this.mtk_state = mtk_state;
	}

	public String getSt_name() {
		return st_name;
	}

	public void setSt_name(String st_name) {
		this.st_name = st_name;
	}

	public double getMdg_money() {
		return mdg_money;
	}

	public void setMdg_money(double mdg_money) {
		this.mdg_money = mdg_money;
	}
}
