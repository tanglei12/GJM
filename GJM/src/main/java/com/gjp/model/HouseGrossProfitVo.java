package com.gjp.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 房源毛利润
 */
@Data
public class HouseGrossProfitVo {

    // 主键ID
    private Integer gp_id;
    // 房源code
    private String hi_code;
    // 合同code
    private String contractObject_code;
    // 利润亏损类型:利润、亏损
    private Integer profitType;
    // 利润亏损说明
    private Integer profitExplain;
    // 利润亏损描述
    private String profit_description;
    // 开始日期
    private Date start_date;
    // 截止日期
    private Date end_date;
    // 金额
    private BigDecimal profit_money;
    // 直接/间接
    private Integer isDirect;
    // 添加人
    private Integer em_id;
    // 时间
    private Date create_time;
    // 更新时间
    private Date update_time;
    // 数据有效性0-无效；1-有效
    private Integer data_state;
    // 0-持续记录中；1-记录完成
    private Integer isDone;

    /************* 扩展字段 *************/
    // 利润金额
    private BigDecimal profit_subtotal;
    // 亏损金额
    private BigDecimal loss_subtotal;
    // 小计金额
    private BigDecimal subtotal;
    // 合同编号
    private String contractObject_No;
    // 操作人
    private String em_name;
    //
    private String profitTypeStr;
    private String profitExplainStr;

}
