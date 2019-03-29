package com.gjp.model;

/**
 * 交接单--消费项目对象
 * 
 * @author 庆涛
 *
 */
public class UserCenterStatementCostItemsVo {

	private Integer sci_id;// 消费项目id
	private String statement_code;// 结算单编码
	private String sci_type;// 消费类型
	private String sci_itemName;// 项目名称
	private double sci_unitPrice;// 单价
	private double sci_number;// 数量
	private double sci_penalty;// 违约金
	private String sci_desc;// 消费说明
	private double sci_totalCosts;// 合计

	public Integer getSci_id() {
		return sci_id;
	}

	public void setSci_id(Integer sci_id) {
		this.sci_id = sci_id;
	}

	public String getStatement_code() {
		return statement_code;
	}

	public void setStatement_code(String statement_code) {
		this.statement_code = statement_code;
	}

	public String getSci_itemName() {
		return sci_itemName;
	}

	public void setSci_itemName(String sci_itemName) {
		this.sci_itemName = sci_itemName;
	}

	public double getSci_unitPrice() {
		return sci_unitPrice;
	}

	public void setSci_unitPrice(double sci_unitPrice) {
		this.sci_unitPrice = sci_unitPrice;
	}

	public double getSci_number() {
		return sci_number;
	}

	public void setSci_number(double sci_number) {
		this.sci_number = sci_number;
	}

	public double getSci_penalty() {
		return sci_penalty;
	}

	public void setSci_penalty(double sci_penalty) {
		this.sci_penalty = sci_penalty;
	}

	public double getSci_totalCosts() {
		return sci_totalCosts;
	}

	public void setSci_totalCosts(double sci_totalCosts) {
		this.sci_totalCosts = sci_totalCosts;
	}

	public String getSci_type() {
		return sci_type;
	}

	public void setSci_type(String sci_type) {
		this.sci_type = sci_type;
	}

	public String getSci_desc() {
		return sci_desc;
	}

	public void setSci_desc(String sci_desc) {
		this.sci_desc = sci_desc;
	}

}
