package com.gjp.util;

import java.util.List;

/**
* 分页
* 
* @author 王孝元
* @version 创建时间：2016年12月1日 下午2:03:44
* 
*/
public class PageTable<T> {
	
	private int pageNo;// 当前页
	
	private int pageSize;// 页面大小
	
	private int totalSize;// 总记录
	
	private List<T> list;// 数据集
	
	private T t;// 参数对象
	
	private String whereList;// 查询条件
	
	private int start;
	
	private int totalPageNum;  
	
	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
		// 设置pageNo时候自动设置start,不用额外设置start属性了
		this.start = ((pageNo - 1) * pageSize);
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
		// 设置pageNo时候自动设置start,不用额外设置start属性了
		this.start = ((pageNo - 1) * pageSize);
	}

	public int getTotalSize() {
		return totalSize;
	}

	public void setTotalSize(int totalSize) {
		this.totalSize = totalSize;
		// 设置totalSize时自动设置分页信息，不用额外设置其他分页属性了
		this.totalPageNum = (totalSize  +  pageSize  - 1) / pageSize;
	}

	public List<T> getList() {
		return list;
	}

	public void setList(List<T> list) {
		this.list = list;
	}

	public T getT() {
		return t;
	}

	public void setT(T t) {
		this.t = t;
	}

	public String getWhereList() {
		return whereList;
	}

	public void setWhereList(String whereList) {
		this.whereList = whereList;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getTotalPageNum() {
		return totalPageNum;
	}

	public void setTotalPageNum(int totalPageNum) {
		this.totalPageNum = totalPageNum;
	}
}
