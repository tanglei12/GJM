package com.gjp.model;

/**
 * 分页
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2015年8月13日 下午4:41:24 
 */
public class Page {

	//总条数
	private Integer size;
	//当前页数
	private Integer page;
	//当前条数
	private Integer pageCount;
	
	public Page() {
		
	}
	public Integer getSize() {
		return size;
	}
	public void setSize(Integer size) {
		this.size = size;
	}
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public Integer getPageCount() {
		return pageCount;
	}
	public void setPageCount(Integer pageCount) {
		this.pageCount = pageCount;
	}

}
