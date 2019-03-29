package com.gjp.util;

import org.springframework.util.StringUtils;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

public class PathPropertiesHelper {

	private Properties properties = new Properties();

	public PathPropertiesHelper(Class<?> thisClass) {
		try {
			String path = thisClass.getResource("/conf/path.properties").getPath();
			InputStream in = new BufferedInputStream(new FileInputStream(path));
			properties.load(in);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取FTP配置信息
	 * 
	 * @author JiangQT
	 * @param thisClass
	 * @param key
	 * @return
	 */
	public String getProperty(String key) {
		if (StringUtils.isEmpty(key)) {
			return null;
		}
		return properties.getProperty(key);
	}

}
