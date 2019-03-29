package com.gjp.model;

import lombok.Data;

import java.util.Date;

/***
 * 物业交接对象
 * 
 * @author 庆涛
 *
 */
@Data
public class HandoverPropertyMainVo {

	// 物业交接ID
	private Integer hpm_id;
	// 物业交接唯一编号
	private String hpm_code;
	// 房屋编号
	private String hi_code;
	// 合同编号
	private String contractObject_code;
	// 交接类型（0：存房交接、1：出房交接）
	private Integer hpm_type;
	// 交接人
	private Integer hpm_handoverPersonIn;
	// 交接人名称
	private String hpm_handoverPersonInName;
	// 交接时间
	private Date hpm_handoverDateIn;
	// 交接人
	private Integer hpm_handoverPersonOut;
	// 交接人名称
	private String hpm_handoverPersonOutName;
	// 交接时间
	private Date hpm_handoverDateOut;
	// 交接状态（0：正常、1：失效）
	private Integer hpm_state;
	// 图片路径
	private String hpm_path;
	// 备注
	private String hpm_remark;
	// 创建时间
	private Date hpm_createTime;

}
