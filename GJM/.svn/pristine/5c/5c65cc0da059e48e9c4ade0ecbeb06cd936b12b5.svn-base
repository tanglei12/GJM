package com.gjp.model;

import lombok.Data;

/**
 * 合约结算--费用结余对象
 * 
 * @author 庆涛
 *
 */
@Data
public class ContractStatementBalanceVo {

	// 结余ID
	private Integer csb_id;
	// 结算编号
	private String statement_code;
	// 结余类型
	private Integer csb_type;
	// 应收
	private double csb_credit;
	// 应付
	private double csb_debit;
	// 说明
	private String csb_desc;

	/********** 扩展 ************/
	private String contractObject_Code;
	// 状态（待审核，审核完成，物业交接，完成）
	private String cco_state;
	private String cco_code;
}
