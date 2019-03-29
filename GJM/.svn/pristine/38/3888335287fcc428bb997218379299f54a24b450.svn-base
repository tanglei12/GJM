package com.gjp.model;

import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * 服务-服务订单
 *
 * @author JiangQT
 */
@Data
public class ServiceOrderVo {

    // 服务订单ID
    private Integer so_id;
    // 服务订单CODE
    private String so_code;
    // 服务订单来源(1：内部来源、2：外部来源)
    private Integer so_source;
    // 服务订单类型（sm_id）
    private Integer so_type;
    // 付费对象（1：租客、2：房东、3：管家、4：门店、5：用户）
    private Integer so_payObject;
    // 付费人名称
    private String so_payName;
    // 付费人电话
    private String so_payPhone;
    // 受理后的付费人
    private String so_payNameNew;
    // 受理后的付费人电话
    private String so_payPhoneNew;
    // 合同编码
    private String contractObject_Code;
    // 问题描述
    private String so_problem;
    // 房源CODE
    private String hi_code;
    // 服务地址
    private String so_targetAddress;
    // 服务坐标
    private String so_targetPoint;
    // 服务时间
    private Date so_targetTime;
    // 联系人
    private String so_contractor;
    // 联系电话
    private String so_contractPhone;
    // 当前负责人（em_id）
    private Integer so_currentCharger;
    // 【扩展】当前负责人
    private String so_currentChargerName;
    // 订单受理人（em_id）
    private Integer so_handler;
    // 【扩展】订单受理人
    private String so_handlerName;
    // 订单状态（ss_code）
    private Integer so_state;
    // 服务申请人（em_id）
    private Integer so_applicantEmp;
    // 【扩展】服务申请人
    private String so_applicantEmpName;
    // 【扩展】服务申请人
    private String so_applicantEmpPhone;
    // 服务申请人（user_id）
    private Integer so_applicantUser;
    // 【扩展】服务申请人
    private String so_applicantUserName;
    // 【扩展】服务申请人
    private String so_applicantUserPhone;
    // 服务订单归属部门（ucc_id）
    private Integer so_department;
    // 【扩展】服务订单归属部门
    private String so_department_name;
    // 服务费用总金额
    private Double so_totalMoney;
    // 打印单号
    private String so_printCode;
    // 备注
    private String so_remarks;
    // 创建时间
    private Date so_createTime;
    private String so_createTimeStr;
    // 搬家开始地址
    private String soin_moveStartAddress;
    // 搬家开始坐标
    private String soin_moveStartPoint;
    // 搬家结束地址
    private String soin_moveEndAddress;
    // 搬家结束坐标
    private String soin_moveEndPoint;
    // 接单人员类型：1-客服部；2-房管员；3-外协
    private Integer so_persontype;
    // 状态
    private String so_state_str;
    private String so_state_color;
    // 下单人
    private String orderPerson;

    /***** 扩展字段 *****/

    private String st_id_b;
    private String st_id_c;
    private String sm_name;
    private String st_name_b;
    private String st_name_c;
    private String house_address;
    private String ss_title;
    private String ucc_name;
    private String sp_name;
    private Double hi_measure;
    private Integer hi_houseS;
    private Integer hi_houseT;
    private Integer hi_houseW;
    // 开始页数
    private Integer pageNo;
    private Integer cm_number;//GJP_Bill_ContractOrderMD数据量
    private String mdg_state;
    private String type;

    // 条件
    private String where;

    // 预计开始时间
    private Date spro_expectStartTime;
    // 预计结束时间
    private Date spro_expectEndTime;
    //预计时长
    private String spro_expectEndDuration;
    private Integer spro_followState;//跟进状态（ss_code）

    private Date contractObject_Date_z;// 租赁合同开始时间
    private Date contractObject_DeadlineTime_z;// 租赁合同结束时间
    private Double init_serveMoney_z;// 初始服务费
    private Double surplus_serveMoney_z;// 剩余服务费
    private Integer contractObject_OptionState_z;// 租赁合同操作状态
    private String cc_name_z;// 租客
    private Date contractObject_Date_f;// 托管合同开始时间
    private Date contractObject_DeadlineTime_f;// 托管合同结束时间
    private Integer contractObject_OptionState_f;// 托管合同操作状态
    private String cc_name_f;// 房东
    private Double init_serveMoney_f;// 初始包修费
    private Double surplus_serveMoney_f;// 剩余包修费

    private List<Integer> itemArray;

    private Integer opeater;

    private Date spro_startTime;

    // 物业坐标
    private String coordinate;
    // 物业父级坐标
    private String coordinates;

    //开始坐标
    private String startPoint;
    //结束坐标
    private String endPoint;


}
