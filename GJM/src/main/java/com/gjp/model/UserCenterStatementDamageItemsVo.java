package com.gjp.model;

/**
 * 结算--损坏物品清单对象
 * 
 * @author 庆涛
 *
 */
public class UserCenterStatementDamageItemsVo {

	private Integer sdi_id;// 损坏物品清单编号
	private String statement_code;// 结算单编号
	private String sdi_type;// 房屋配置类型
	private String sdi_list;// 物品清单
	private double sdi_cost;// 赔偿费用
	private String sdi_desc;// 说明

	public Integer getSdi_id() {
		return sdi_id;
	}

	public void setSdi_id(Integer sdi_id) {
		this.sdi_id = sdi_id;
	}

	public String getStatement_code() {
		return statement_code;
	}

	public void setStatement_code(String statement_code) {
		this.statement_code = statement_code;
	}

	public String getSdi_type() {
		return sdi_type;
	}

	public void setSdi_type(String sdi_type) {
		this.sdi_type = sdi_type;
	}

	public String getSdi_list() {
		return sdi_list;
	}

	public void setSdi_list(String sdi_list) {
		this.sdi_list = sdi_list;
	}

	public double getSdi_cost() {
		return sdi_cost;
	}

	public void setSdi_cost(double sdi_cost) {
		this.sdi_cost = sdi_cost;
	}

	public String getSdi_desc() {
		return sdi_desc;
	}

	public void setSdi_desc(String sdi_desc) {
		this.sdi_desc = sdi_desc;
	}

}
