package com.gjp.util.constant;

/**
 * 系统常量
 * 
 * @author Direct
 * @date 2015-3-10
 */
public class Constant {

	/*
	 * 编码相关
	 */
	public static final String ENCODE_UTF8 = "UTF-8";
	public static final String ENCODE_GBK = "GBK";
	public static final String ENCODE_ISO = "ISO-8859-1";

	/*
	 * 分页相关
	 */
	public static final int PAGE_FIRST = 1;
	public static final int PAGE_SIZE = 16;

	/*
	 * 参数相关
	 */
	public static final String INFO_SUCCESS = "success";
	public static final String INFO_ERROR = "error";
	/*
	 * 重置密码
	 */
	public static final String RESET_PASSWORD = "888888";
	
	// 会分期分配给本系统的appid
	public final static String HUIFENQI_APPID = "110010";
	// 会分期分配给本系统的secretKey
	public final static String HUIFENQI_SECRETKEY = "ba0b3d86458a69b67df51a18d5e3c9bc";
	// 发布房源 URL
	public final static String HUIFENQI_FEEDHOUSE_URL = "http://api.hzfapi.com/house/feedHouse";
	// 删除房源 URL
	public final static String HUIFENQI_DELHOUSE_URL = "http://api.hzfapi.com/house/delHouse";
	// 更新房源 URL
	public final static String HUIFENQI_UPDATEHOUSE_URL = "http://api.hzfapi.com/house/updateHouse";

}
