package com.gjp.model;

/**
 * 适合推荐群体
 * 
 * @author zoe
 *
 */
public class HoseRecommendGroup {

	// 推荐群体编号
	private Integer RecommendGroup_Id;
	// 推荐群体名称
	private String RecommendGroup_Name;

	public HoseRecommendGroup() {
		super();
	}

	public Integer getRecommendGroup_Id() {
		return RecommendGroup_Id;
	}

	public void setRecommendGroup_Id(Integer recommendGroup_Id) {
		RecommendGroup_Id = recommendGroup_Id;
	}

	public String getRecommendGroup_Name() {
		return RecommendGroup_Name;
	}

	public void setRecommendGroup_Name(String recommendGroup_Name) {
		RecommendGroup_Name = recommendGroup_Name;
	}

	@Override
	public String toString() {
		return "HoseRecommendGroup [RecommendGroup_Id=" + RecommendGroup_Id
				+ ", RecommendGroup_Name=" + RecommendGroup_Name + "]";
	}

	
}
