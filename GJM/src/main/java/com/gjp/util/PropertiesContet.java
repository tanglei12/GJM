package com.gjp.util;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

public class PropertiesContet{
	
	/**
	 * 查询加密效验码常量
	 * @return 
	 */
	public String selectProperties(){
		Properties properties = new Properties();
		try{
		//获取properties路劲
		String path = this.getClass().getResource("/conf/message.properties").getPath();
		//把properties文件转化输出流
		InputStream in = new BufferedInputStream(new FileInputStream(path));
		properties.load(in);     ///执行
		 // 关闭
        in.close();
        
		return (String) properties.get("codeSuffix");        
       
		}catch(Exception e){
			System.out.println(e);
		}
		return null;
	}
}