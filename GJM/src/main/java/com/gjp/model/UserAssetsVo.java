package com.gjp.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 用户资产
 *
 * @author JiangQT
 */
@Data
public class UserAssetsVo {

    // 资产ID
    private Integer ua_id;
    // 用户ID
    private Integer user_id;
    // 充值金额
    private BigDecimal ua_total_amount;
    // 赠送金额
    private BigDecimal ua_balance_amount;
    // 创建时间
    private Date ua_create_time;

}
