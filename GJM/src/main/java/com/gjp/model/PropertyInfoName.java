package com.gjp.model;

import java.util.Date;
import java.util.List;

public class PropertyInfoName implements Comparable<PropertyInfoName> {
	// 物业id
	private Integer upn_id;
	// 物业名称
	private String upn_name;
	// 物业父id
	private Integer upn_pid;
	// 物业号
	private String upn_code;
	// 填写时间
	private Date upn_time;
	// 最高层父级
	private Integer upn_sid;
	// 最高级名称
	private String upn_sname;
	//最大栋数
	private Integer upn_build;
	//最大单元数
	private Integer upn_unit;
	//小区信息是否使用中
	private Integer upn_state;
	//栋(单位)
	private String upn_dong;
	//部门id
	private Integer upn_department;
	//用户id
	private Integer em_id;

	// 支付宝租房发布返回的小区同步请求号
	private String comm_req_id;
	// 0：同步处理中，1：同步成功，2：同步失败（审批拒绝）
	private Integer comm_req_status;
	//小区同步描述
	private String remark;

	// ==========扩展==============

	// 物业编号
	private Integer propertyInfo_Id;
	// 物业跟进位置 （0：未跟进 1：物业水电气 2：物业交通 3：基本信息 4：踩盘）
	private Integer propertyInfo_stage;
	// 物业跟进状态
	private Integer propertyInfo_success;

	// 物业总名称
	private String propertyInfo_Name;
	// 房屋楼层
	private Integer propertyInfo_floor;
	// 物业区域
	private String propertyInfo_quyu;
	//物业街道
	private String propertyInfo_street;
	// 物业地址
	private String propertyInfo_address;
	// 坐标
	private String propertyInfo_coordinate;
	//所属部门
	private String propertyInfo_department;
	//公交站
	private String propertyInfo_transit;
	//轨道站
	private String propertyInfo_gui;

	//物业匹配名称集合
	private List<String> propertyNames;
	private String whereList;
	//地图源
	private String propertyInfo_source;

	public String getUpn_sname() {
		return upn_sname;
	}

	public void setUpn_sname(String upn_sname) {
		this.upn_sname = upn_sname;
	}

	public Integer getUpn_id() {
		return upn_id;
	}

	public void setUpn_id(Integer upn_id) {
		this.upn_id = upn_id;
	}

	public String getUpn_name() {
		return upn_name;
	}

	public void setUpn_name(String upn_name) {
		this.upn_name = upn_name;
	}

	public Integer getUpn_pid() {
		return upn_pid;
	}

	public void setUpn_pid(Integer upn_pid) {
		this.upn_pid = upn_pid;
	}

	public String getUpn_code() {
		return upn_code;
	}

	public void setUpn_code(String upn_code) {
		this.upn_code = upn_code;
	}

	public Date getUpn_time() {
		return upn_time;
	}

	public void setUpn_time(Date upn_time) {
		this.upn_time = upn_time;
	}

	public Integer getUpn_sid() {
		return upn_sid;
	}

	public void setUpn_sid(Integer upn_sid) {
		this.upn_sid = upn_sid;
	}

	public String getPropertyInfo_Name() {
		return propertyInfo_Name;
	}

	public void setPropertyInfo_Name(String propertyInfo_Name) {
		this.propertyInfo_Name = propertyInfo_Name;
	}

	public PropertyInfoName() {
		super();
	}

	public PropertyInfoName(Integer upn_id, String upn_name, Integer upn_pid, String upn_code, Date upn_time, Integer upn_sid, String upn_sname, String comm_req_id, Integer comm_req_status) {
		super();
		this.upn_id = upn_id;
		this.upn_name = upn_name;
		this.upn_pid = upn_pid;
		this.upn_code = upn_code;
		this.upn_time = upn_time;
		this.upn_sid = upn_sid;
		this.upn_sname = upn_sname;
		this.comm_req_id = comm_req_id;
		this.comm_req_status = comm_req_status;
	}

	public Integer getPropertyInfo_success() {
		return propertyInfo_success;
	}

	public void setPropertyInfo_success(Integer propertyInfo_success) {
		this.propertyInfo_success = propertyInfo_success;
	}

	public Integer getPropertyInfo_Id() {
		return propertyInfo_Id;
	}

	public void setPropertyInfo_Id(Integer propertyInfo_Id) {
		this.propertyInfo_Id = propertyInfo_Id;
	}

	public Integer getPropertyInfo_stage() {
		return propertyInfo_stage;
	}

	public void setPropertyInfo_stage(Integer propertyInfo_stage) {
		this.propertyInfo_stage = propertyInfo_stage;
	}

	public Integer getPropertyInfo_floor() {
		return propertyInfo_floor;
	}

	public void setPropertyInfo_floor(Integer propertyInfo_floor) {
		this.propertyInfo_floor = propertyInfo_floor;
	}

	public String getPropertyInfo_quyu() {
		return propertyInfo_quyu;
	}

	public void setPropertyInfo_quyu(String propertyInfo_quyu) {
		this.propertyInfo_quyu = propertyInfo_quyu;
	}

	@Override
	public int compareTo(PropertyInfoName o) {
		return upn_code.compareTo(o.getUpn_code());
	}

	public List<String> getPropertyNames() {
		return propertyNames;
	}

	public void setPropertyNames(List<String> propertyNames) {
		this.propertyNames = propertyNames;
	}

	public String getWhereList() {
		return whereList;
	}

	public void setWhereList(String whereList) {
		this.whereList = whereList;
	}

	public String getPropertyInfo_address() {
		return propertyInfo_address;
	}

	public void setPropertyInfo_address(String propertyInfo_address) {
		this.propertyInfo_address = propertyInfo_address;
	}

	public String getPropertyInfo_coordinate() {
		return propertyInfo_coordinate;
	}

	public void setPropertyInfo_coordinate(String propertyInfo_coordinate) {
		this.propertyInfo_coordinate = propertyInfo_coordinate;
	}
	public String getPropertyInfo_street() {
		return propertyInfo_street;
	}

	public void setPropertyInfo_street(String propertyInfo_street) {
		this.propertyInfo_street = propertyInfo_street;
	}

	public String getPropertyInfo_department() {
		return propertyInfo_department;
	}

	public void setPropertyInfo_department(String propertyInfo_department) {
		this.propertyInfo_department = propertyInfo_department;
	}

	public Integer getUpn_build() {
		return upn_build;
	}

	public void setUpn_build(Integer upn_build) {
		this.upn_build = upn_build;
	}

	public Integer getUpn_unit() {
		return upn_unit;
	}

	public void setUpn_unit(Integer upn_unit) {
		this.upn_unit = upn_unit;
	}

	public Integer getUpn_state() {
		return upn_state;
	}

	public void setUpn_state(Integer upn_state) {
		this.upn_state = upn_state;
	}

	public String getUpn_dong() {
		return upn_dong;
	}

	public void setUpn_dong(String upn_dong) {
		this.upn_dong = upn_dong;
	}

	public String getPropertyInfo_gui() {
		return propertyInfo_gui;
	}

	public void setPropertyInfo_gui(String propertyInfo_gui) {
		this.propertyInfo_gui = propertyInfo_gui;
	}

	public String getPropertyInfo_transit() {
		return propertyInfo_transit;
	}

	public void setPropertyInfo_transit(String propertyInfo_transit) {
		this.propertyInfo_transit = propertyInfo_transit;
	}
	public String getComm_req_id() {
		return comm_req_id;
	}

	public void setComm_req_id(String comm_req_id) {
		this.comm_req_id = comm_req_id;
	}

	public Integer getComm_req_status() {
		return comm_req_status;
	}

	public void setComm_req_status(Integer comm_req_status) {
		this.comm_req_status = comm_req_status;
	}

	public String getPropertyInfo_source() {
		return propertyInfo_source;
	}

	public void setPropertyInfo_source(String propertyInfo_source) {
		this.propertyInfo_source = propertyInfo_source;
	}

	public Integer getUpn_department() {
		return upn_department;
	}

	public void setUpn_department(Integer upn_department) {
		this.upn_department = upn_department;
	}

	public Integer getEm_id() {
		return em_id;
	}

	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
}
