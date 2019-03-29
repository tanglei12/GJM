package com.gjp.util;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 
 * 筛选房屋模型
 * @author zoe
 *
 */
@Data
public class HouseModel implements Serializable {

    private static final long serialVersionUID = 1L;

	//房屋名称
	private String houseName;
	//房屋状态
	private String houseState;
	//房屋类型
	private String houseType;
	//房屋厅室
	private Integer houseSTW;
	//房屋价格
	private String houseMoney;
	
	//房屋状态
	private String he_state;
	//租赁状态 
	private String contract_outStatus;
	//托管状态 
	private String contract_intoStatus;
	//房屋租金
	private Double hi_money;
	//存房价格
	private Double hi_keepMoney;
	//区域
	private Double hi_area;
	//房屋室
	private Integer hi_houseS;
	//房屋厅
	private Integer hi_houseT;
	//房屋卫
	private Integer hi_houseW;
	//房屋品牌
	private String hb_name;
	//房东
	private String he_peopleName;
	//收录时间
	private Date hi_date;
	//收录电话
	private String em_phone;
	// 开始时间
	private Date dateStart;
	// 结束时间
	private Date dateEnd;
	//用户id
	private Integer em_id;
	//房屋用户编码
	private Integer pu_id;
	
	
	//物业交接单
	//房屋名称
	private List<Integer> hi_ids;
	//用户状态
	private String userType;
	//房屋所在数据表
	private String houseSta;
	
	//意向房源跟进
	//意向房源跟进状态
	private String phi_type;
	//意向房源跟进状态
	private String total;
	private String em_name;
	private String phi_address;
	private String phi_name;
	private List<Integer> em_ids;
	//部门内部人员
	private List<Integer> department;
	
	//房屋排序
	private Integer houseBrand;
	private Integer hi_number;
	private Integer hi_id;
	private Integer ty;
	
	//测评人
	private String ep_state;
	private String ep_name;
	
	// sql条件
	private String sqlWhere;
	// 时间字段
	private String dateTitle;
	// 排序
	private String sqlOrderBy;
	
	//e兼职收益
	private Date stateTime;
	private Date endTime;
	private Integer uda_id;
	private String ew_way;
	
	//合同类型
	private String ContractObject_Type;
	//合同编码
	private String contractObject_Id;
	//部门编码
	private Integer ucc_id;

	private String propertyInfo_Name; //物业名称
	
	private String mode;
	
}
