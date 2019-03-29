package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 用户资产
 *
 * @author JiangQT
 */
@Data
public class UserAssetsRecordVo {

    // 资产ID
    private Integer uar_id;
    // 用户ID
    private Integer ua_id;
    // null
    private Integer uar_type;
    // 流水号
    private String statement_sn;
    // null
    private String uar_title;
    // 充值金额
    private Double uar_amount;
    // 充值金额
    private String uar_trade_amount_str;
    // 状态{1:"交易中",2:"交易完成",3:"交易失败"}
    private Integer uar_status;
    // 交易时间
    private Date uar_trade_time;
    // 交易时间
    private String uar_trade_time_str;
    // 创建时间
    private Date uar_create_time;
}
