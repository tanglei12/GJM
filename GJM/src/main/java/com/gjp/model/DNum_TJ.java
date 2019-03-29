package com.gjp.model;

/**
 * 统计周期
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年3月4日 下午5:12:21 
 */
public class DNum_TJ {

	//编号
	private Integer id;
	//周期
	private Integer cycle;
	//周期数
	private Integer cycleNum;
	
	public DNum_TJ(){}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getCycle() {
		return cycle;
	}

	public void setCycle(Integer cycle) {
		this.cycle = cycle;
	}

	public Integer getCycleNum() {
		return cycleNum;
	}

	public void setCycleNum(Integer cycleNum) {
		this.cycleNum = cycleNum;
	}
}
