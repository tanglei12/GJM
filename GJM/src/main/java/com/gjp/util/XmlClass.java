package com.gjp.util;

import com.gjp.model.UserMessageContent;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * 对象转化XML工具类
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2015年12月20日 下午5:40:41
 */
public class XmlClass {

	/**
	 * 对象转化XML 父节点为compnay
	 * 
	 * @param path
	 *            保存XML路径
	 * @param t
	 *            对象
	 * @param Object
	 *            对象
	 *
	 * @author 陈智颖
	 */
	public static void classtoXml(String path, List<Object> objects, String pathName, Object object) {

		XStream xStream = new XStream(new DomDriver());
		xStream.alias("staff", object.getClass());

		path = path + "resources/xml";

		File f = new File(path);
		if (!f.exists()) {
			f.mkdirs();
		}

		File file = new File(f, pathName);
		if (!file.exists()) {
			try {
				file.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		FileOutputStream fs = null;
		try {
			fs = new FileOutputStream(path + "/" + pathName);
			xStream.toXML(objects, fs);
			fs.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 读取类为UserMessageContent的XML
	 * 
	 * @param path
	 * @param pathName
	 * @param object
	 * @return
	 *
	 * @author 陈智颖
	 */
	@SuppressWarnings("unchecked")
	public static List<UserMessageContent> xmltoClass(String path, String pathName, Object object) {

		path = path + "resources/xml";

		File file = new File(path + "/" + pathName);

		if (!file.exists() && !file.isDirectory()) {
			return null;
		}

		FileInputStream fis = null;
		List<UserMessageContent> fromXML = new ArrayList<UserMessageContent>();
		try {
			fis = new FileInputStream(path + "/" + pathName);
			XStream xStream = new XStream(new DomDriver());
			xStream.alias("staff", object.getClass());
			fromXML = (List<UserMessageContent>) xStream.fromXML(fis);
			fis.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return (List<UserMessageContent>) fromXML;
	}

	/**
	 * 读取类为UserCenterEmployee的XML
	 * 
	 * @param path
	 * @param pathName
	 * @param object
	 * @return
	 *
	 * @author 陈智颖
	 * @param <T>
	 */
	@SuppressWarnings("unchecked")
	public static <T> List<T> xmltoClassUser(String path, String pathName, Object object) {

		path = path + "resources/xml";

		File file = new File(path + "/" + pathName);

		if (!file.exists() && !file.isDirectory()) {
			return null;
		}

		FileInputStream fis = null;
		List<T> fromXML = new ArrayList<T>();
		try {
			fis = new FileInputStream(path + "/" + pathName);
			XStream xStream = new XStream(new DomDriver());
			xStream.alias("staff", object.getClass());
			fromXML = (List<T>) xStream.fromXML(fis);
			fis.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return fromXML;
	}

	/**
	 * 测试
	 * 
	 * @param args
	 *
	 * @author 陈智颖
	 */
	public static void main(String[] args) {
		UserMessageContent userMessageContent = new UserMessageContent();
		userMessageContent.setUmc_name("服务派单");
		userMessageContent.setUmc_content("黄晓洁你有一个派工单需要处理");
		userMessageContent.setUmc_href("/service/serviceBill");
		userMessageContent.setEm_id(1);
		String path = "D:/web/.metadata/.plugins/org.eclipse.wst.server.core/tmp1/wtpwebapps/GJM/";
		List<Object> userMessageContents = new ArrayList<Object>();
		userMessageContents.add(userMessageContent);

		List<UserMessageContent> xmltoClass = XmlClass.xmltoClass(path, "message.xml", userMessageContent);
		if (xmltoClass == null) {
			XmlClass.classtoXml(path, userMessageContents, "message.xml", userMessageContent);
		} else {
			for (UserMessageContent userMessageContent2 : xmltoClass) {
				userMessageContents.add(userMessageContent2);
			}
			XmlClass.classtoXml(path, userMessageContents, "message.xml", userMessageContent);
		}

	}
}
