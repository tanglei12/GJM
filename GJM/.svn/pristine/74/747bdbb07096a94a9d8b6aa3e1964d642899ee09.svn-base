package com.gjp.model;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * 解约申请
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2015年10月29日 下午6:24:58
 */
@Data
public class BusinessCancelContractOrder {

	// 编号
	private Integer cco_id;
	// 申请编码
	private String cco_code;
	// 合同唯一编号
	private String contractObject_Code;
	// 合同编码
	private String contractObject_No;
	// 房屋编码
	private String hi_code;
	// 申请人
	private String cco_applicant;
	// 协议图片
	private String cco_path;
	// 联系电话
	private String cco_phone;
	// 转租费用
	private Double cco_subletCost;
	// 申请内容
	private String cco_applicationContent;
	// 申请时间
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date cco_applicationTime;
	// 解约类型（转租、退租、托管续约、托管解约、租赁续约）
	private String cco_applicationType;
	// 状态（待审核，审核完成，物业交接，完成）
	private String cco_state;
	// 完成时间
	private Date cco_FinishTime;
	// 经办人
	private String cco_peopleName;
	// 经办日期
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date cco_handleDate;
	// 处理方式
	private String cco_processMode;
	// 处理人
	private String cco_processer;
	// 接房日期
	private Date cco_realDate;
	
	// -- 扩展 -- 
	private String cco_state_no;
	// 小区名字
	private String phi_name;
	// 房屋地址
	private String phi_address;
	// 角色
	private String crc_role;
	// 名称
	private String cc_name;
	// 电话
	private String ccp_phone;
	// 合同类型
	private String contractObject_Type;
	// 查询条件
	private String sqlWhere;
	// 结算时间
	private Date statement_balanceTime;
	// 交/接房日期
	private Date statement_handoverDate;
}
