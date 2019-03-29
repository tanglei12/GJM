package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 合同账单分期账单
 *
 * @author JiangQT
 */
@Data
public class ContractBillInstalmentVo {

    // id
    private Integer cbs_id;
    // code
    private String cbs_code;
    // 订单code
    private String bco_code;
    // 账单期数
    private Integer bcb_cycle;
    // 账单分期期数
    private Integer cbs_cycle;
    // 账单分期期数
    private Integer cbs_cycle_total;
    // 收支类型{0:"收入",1:"支出"}注：相对公司而言
    private Integer cbs_balPay;
    // 账单状态{1:"审核中",2:"待支付",3:"已支付",4:"已取消",5:"已分期",9",第三方",10:"转租",11:"退租",12:"解约",13:"清退",14:"代偿",15:"代偿未收款",16:"代偿已收款",20:"违约"}
    private Integer cbs_status;
    // 应还款
    private Double cbs_repayment;
    // 实际支付金额
    private Double cbs_realPayment;
    // 应还款时间
    private Date cbs_repaymentDate;
    // 应还款时间-小于
    private Date cbs_repaymentDate_lt;
    // 实际还款时间
    private Date cbs_realPaymentDate;
    // 滞纳金
    private Double cbs_late_fee;
    // 是否出账{1:"未出账",2:"已出账"}
    private Integer cbs_account_out;
    // 支付方式
    private String cbs_pay_way;
    // 逾期天数
    private Integer cbs_overdue_day;
    // 创建人(em_id)
    private Integer cbs_creator;
    // 操作人(em_id)
    private Integer cbs_operater;
    // 备注
    private String cbs_remarks;
    // 创建时间
    private Date cbs_create_time;

}
