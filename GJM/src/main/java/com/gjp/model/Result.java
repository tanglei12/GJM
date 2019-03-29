package com.gjp.model;
/**
* 业务层处理结果反馈类（可扩展）
* 
* （service层返回类型看需求，不作硬性规定）
* 
* @author 王孝元
* @version 创建时间：2017年3月3日 上午9:24:40
* 
*/
public class Result {
	
	// 处理状态
	private boolean state;
	// 反馈信息
	private String msg;

	public boolean getState() {
		return state;
	}

	public void setState(boolean state) {
		this.state = state;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	
}
