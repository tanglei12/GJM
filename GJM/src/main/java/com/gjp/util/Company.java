package com.gjp.util;

import java.util.List;

/**
 * Xml父节点
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2015年12月20日 下午6:39:32 
 */
public class Company {

	private List<Object> messagecontent;

	public List<Object> getMessagecontent() {
		return messagecontent;
	}

	public void addMessagecontent(List<Object> userMessageContents) {
		this.messagecontent = userMessageContents;
	}
	
	
}
