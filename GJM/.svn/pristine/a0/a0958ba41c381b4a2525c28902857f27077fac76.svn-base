package com.gjp.util;

/**
 * 自定义异常
 * @author shenhx
 *
 */
public class CoreException extends Exception {

	private static final long serialVersionUID = 1L;
	
	private int code; // 异常对应的返回码
	private String msg; // 异常对应的描述信息
	
	public CoreException(){
		super();
	}
	
	public CoreException(String message){
		super(message);
		this.code = 101;
		this.msg = message;
	}
	
	public CoreException(int code, String message){
		super();
		this.code = code;
		this.msg = message;
	}

	public int getCode() {
		return code;
	}

	public String getMsg() {
		return msg;
	}
	
}
