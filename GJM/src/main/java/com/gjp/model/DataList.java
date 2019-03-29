package com.gjp.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 插件分页java类
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年10月31日 上午10:45:46 
 */
public class DataList<T> {

	// 数据装载
	private List<T> list;
	// 开始页码
	private int PageNo;
	// 结束页码
	private int pageSize;
	// 总条数
	private int sum;
	
	/**
	 * 装载Map对象
	 * 
	 * @param dataList 装载list
	 * @param pageNo 开始页
	 * @param pageSize 一页多少条数据
	 * @param sum 总条数
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Map<String, Object> dataList(List<T> dataList, int pageNo, int pageSize, int sum, Double sumMoney){
		Map<String, Object> map = new HashMap<>();
		
		map.put("dataList", dataList);
		map.put("pageNo", PageNo);
		if(sum < pageSize){
			pageSize = 1;
		}else{
			pageSize = (int) Math.ceil((double)sum/(double)pageSize);
		}
		map.put("pageSize", pageSize);
		map.put("sum", sum);
		map.put("sumMoney", sumMoney);
		
		map.put("dataList",dataList);
		
		return map;
	}
	
	/**
	 * 根据开始页和总页数求开始条数
	 * 
	 * @param pageNo
	 * @param pageSize
	 * @return
	 *
	 * @author 陈智颖
	 */
	public int pageNo(int pageNo, int pageSize){
		return (pageNo-1)*pageSize;
	}

	public List<T> getList() {
		return list;
	}

	public void setList(List<T> list) {
		this.list = list;
	}

	public int getPageNo() {
		return PageNo;
	}

	public void setPageNo(int pageNo) {
		PageNo = pageNo;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getSum() {
		return sum;
	}

	public void setSum(int sum) {
		this.sum = sum;
	}
	
}
