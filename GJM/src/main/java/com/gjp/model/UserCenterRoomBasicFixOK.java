package com.gjp.model;

import java.util.Date;

/**
 * 房屋基装情况确认
 * 
 * @author zoe
 *
 */
public class UserCenterRoomBasicFixOK {

	private Integer roomBasicFixOK_Id;// 情况确认编号
	private String hi_code;// 房屋编码
	private Integer transferSheet_id;// 物业交接编号
	private String roomBasicFixOK_Room;// 房间
	private String roomBasicFixOK_Type;// 项目
	private Integer roomBasicFixOK_Status;// 现状 (0：正常，1：有损坏)
	private String roomBasicFixOK_Remark;// 情况说明
	private Integer roomBasicFixOK_successor;// 继承者物业交接编号
	private Date roomBasicFixOK_createTime;// 创建时间

	public Integer getRoomBasicFixOK_Id() {
		return roomBasicFixOK_Id;
	}

	public void setRoomBasicFixOK_Id(Integer roomBasicFixOK_Id) {
		this.roomBasicFixOK_Id = roomBasicFixOK_Id;
	}

	public String getRoomBasicFixOK_Room() {
		return roomBasicFixOK_Room;
	}

	public void setRoomBasicFixOK_Room(String roomBasicFixOK_Room) {
		this.roomBasicFixOK_Room = roomBasicFixOK_Room;
	}

	public String getRoomBasicFixOK_Type() {
		return roomBasicFixOK_Type;
	}

	public void setRoomBasicFixOK_Type(String roomBasicFixOK_Type) {
		this.roomBasicFixOK_Type = roomBasicFixOK_Type;
	}

	public Integer getRoomBasicFixOK_Status() {
		return roomBasicFixOK_Status;
	}

	public void setRoomBasicFixOK_Status(Integer roomBasicFixOK_Status) {
		this.roomBasicFixOK_Status = roomBasicFixOK_Status;
	}

	public String getRoomBasicFixOK_Remark() {
		return roomBasicFixOK_Remark;
	}

	public void setRoomBasicFixOK_Remark(String roomBasicFixOK_Remark) {
		this.roomBasicFixOK_Remark = roomBasicFixOK_Remark;
	}

	public Date getRoomBasicFixOK_createTime() {
		return roomBasicFixOK_createTime;
	}

	public void setRoomBasicFixOK_createTime(Date roomBasicFixOK_createTime) {
		this.roomBasicFixOK_createTime = roomBasicFixOK_createTime;
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

	public Integer getRoomBasicFixOK_successor() {
		return roomBasicFixOK_successor;
	}

	public void setRoomBasicFixOK_successor(Integer roomBasicFixOK_successor) {
		this.roomBasicFixOK_successor = roomBasicFixOK_successor;
	}

}
