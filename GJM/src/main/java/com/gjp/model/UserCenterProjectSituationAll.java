package com.gjp.model;

/**
 * 房屋项目情况
 * 
 * @author ZOE
 *
 */
public class UserCenterProjectSituationAll {

	// 房屋项目情况编码
	private Integer ps_id;
	// 房屋项目类型编号
	private Integer ps_typeId;
	// 房屋项目名称编号
	private Integer ps_nameId;
	// 房屋项目名称
	private String ps_name;
	// 品牌
	private String pc_brand;
	// 品牌数量
	private Integer ps_num;
	// 0 新 1 旧
	private Integer ps_oldAndNew;
	// 0 好 1 坏
	private Integer ps_bol;
	// 房屋编码
	private String hi_code;
	// 物业交接编号
	private Integer transferSheet_id;

	// 扩展字段

	// 房间名称
	private String RoomType_Name;
	// 项目名称
	private String ucp_name;
	// 房屋情况关系编号
	private Integer ur_id;
	// 房屋房间编号
	private Integer RoomType_Id;

	// 房屋信息编码
	private Integer hi_id;

	public UserCenterProjectSituationAll() {
		super();
	}

	public Integer getPs_id() {
		return ps_id;
	}

	public void setPs_id(Integer ps_id) {
		this.ps_id = ps_id;
	}

	public Integer getPs_typeId() {
		return ps_typeId;
	}

	public void setPs_typeId(Integer ps_typeId) {
		this.ps_typeId = ps_typeId;
	}

	public Integer getPs_nameId() {
		return ps_nameId;
	}

	public void setPs_nameId(Integer ps_nameId) {
		this.ps_nameId = ps_nameId;
	}

	public String getPc_brand() {
		return pc_brand;
	}

	public void setPc_brand(String pc_brand) {
		this.pc_brand = pc_brand;
	}

	public Integer getPs_num() {
		return ps_num;
	}

	public void setPs_num(Integer ps_num) {
		this.ps_num = ps_num;
	}

	public Integer getPs_oldAndNew() {
		return ps_oldAndNew;
	}

	public void setPs_oldAndNew(Integer ps_oldAndNew) {
		this.ps_oldAndNew = ps_oldAndNew;
	}

	public Integer getPs_bol() {
		return ps_bol;
	}

	public void setPs_bol(Integer ps_bol) {
		this.ps_bol = ps_bol;
	}

	public String getRoomType_Name() {
		return RoomType_Name;
	}

	public void setRoomType_Name(String roomType_Name) {
		RoomType_Name = roomType_Name;
	}

	public String getUcp_name() {
		return ucp_name;
	}

	public void setUcp_name(String ucp_name) {
		this.ucp_name = ucp_name;
	}

	public Integer getUr_id() {
		return ur_id;
	}

	public void setUr_id(Integer ur_id) {
		this.ur_id = ur_id;
	}

	public Integer getRoomType_Id() {
		return RoomType_Id;
	}

	public void setRoomType_Id(Integer roomType_Id) {
		RoomType_Id = roomType_Id;
	}

	public Integer getHi_id() {
		return hi_id;
	}

	public void setHi_id(Integer hi_id) {
		this.hi_id = hi_id;
	}

	public String getHi_code() {
		return hi_code;
	}

	public void setHi_code(String hi_code) {
		this.hi_code = hi_code;
	}

	public Integer getTransferSheet_id() {
		return transferSheet_id;
	}

	public void setTransferSheet_id(Integer transferSheet_id) {
		this.transferSheet_id = transferSheet_id;
	}

	public String getPs_name() {
		return ps_name;
	}

	public void setPs_name(String ps_name) {
		this.ps_name = ps_name;
	}

}
