package com.gjp.model;

/**
 * 房屋排名
 * 
 * @author 庆涛
 *
 */
public class ViewHouseRankingVo {

	// 合同类型
	private String contractObject_Type;
	// 排名类型
	private String ranking_type;
	// 排名
	private Integer ranking;
	// 人员ID
	private Integer em_id;
	// 人员账号
	private String em_account;
	// 数量
	private Integer count;
	// 总业绩
	private double sumMoney;

	public String getContractObject_Type() {
		return contractObject_Type;
	}

	public void setContractObject_Type(String contractObject_Type) {
		this.contractObject_Type = contractObject_Type;
	}

	public String getRanking_type() {
		return ranking_type;
	}

	public void setRanking_type(String ranking_type) {
		this.ranking_type = ranking_type;
	}

	public Integer getRanking() {
		return ranking;
	}

	public void setRanking(Integer ranking) {
		this.ranking = ranking;
	}

	public Integer getEm_id() {
		return em_id;
	}

	public void setEm_id(Integer em_id) {
		this.em_id = em_id;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public double getSumMoney() {
		return sumMoney;
	}

	public void setSumMoney(double sumMoney) {
		this.sumMoney = sumMoney;
	}

	public String getEm_account() {
		return em_account;
	}

	public void setEm_account(String em_account) {
		this.em_account = em_account;
	}

}
