package com.gjp.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 账单流水
 * 
 * @author 庆涛
 *
 */
@Data
public class BillStatementVo {

	// 支付流水编码
	private Integer bs_id;
	// 支付流水号
	private String bs_statementNum;
	// 第三方流水号码
	private String bs_payNo;
	// 付款类型
	private Integer bs_paymentType;
	// 付款人
	private String bs_payPersion;
	// 付款手机
	private String bs_payPhone;
	// 支付状态
	private String bs_state;
	// 支付期数
	private String bs_payNum;
	// 支付宝交易号
	private String bs_alipayNum;
	// 实际支付金额
	private BigDecimal bs_money;
	// 支付方式
	private String bs_payType;
	// 支付时间
	private Date bs_payDate;
	// 到账时间
	private Date bs_arrivalDate;
	// 支付账号
	private String bs_payAccount;
	// 数量
	private Integer size;
	// 订单号
	private String lsfb_orderCode;
	// 乐首付订单号
	private String to_lsfOrder;
	// 商户订单号
	private String bs_trade_none;

}
