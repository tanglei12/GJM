package com.gjp.model;

import lombok.Data;

import java.util.List;

/**
 * 租客多统计数据
 *
 * @author 陈智颖
 * @create 2018-04-01 上午9:54
 **/
@Data
public class StatisticsVo {

    // 多币总成交量
    private String sumCoin;
    // 今日多币总成交量
    private String daySumCoin;
    // 比昨日升降
    private Integer yesterdayLift;
    // 比上周升降
    private Integer lastWeekLift;

    // 求租信息总量
    private String sumRent;
    // 求租信息总量
    private List<Integer> dayRent;
    // 今日求租信息
    private String toDayRent;

    // 累计客户总数
    private String sumUser;
    // 今日注入量
    private String toDaySumUser;
    // 15天累计客户
    private List<Integer> sumUsers;

    // 购买转化率
    private Integer purchaseNumLift;
    // 成交转化率
    private Integer dealNumLift;
    // 今日成交量
    private String toDayNum;
    // 升降
    private String ascDesc;

    // 数据量统计日期
    private List<String> customerDateStr;
    // 发布量
    private List<Integer> releaseNum12;
    // 查看量
    private List<Integer> seeNum12;
    // 购买量
    private List<Integer> purchaseNum12;

    // 经纪人钱包充值
    private Double agentWalletMoney;
    // 经纪人钱包多币充值
    private Double agentWalletCoin;
    // 企业钱包充值
    private Double accountWalletMoney;
    // 企业会员续费
    private Double accountWalletRenew;
    // 提现
    private Double withdrawalsMoney;
    // 总流水
    private String accountWalletSum;
    // 1.收入 2.支出
    private Integer w_payType;

    // 数据健康度时间轴
    private List<String> healthyDateStr;
    // 数据健康购买量
    private List<Integer> purchaseNum6;
    // 数据健康投诉量
    private List<Integer> complaintNum6;

    // 活跃度时间
    private List<String> activeDateStr;
    // 活跃度登录人数
    private List<Integer> loginNum;
    // 活跃度登陆人次
    private List<Integer> loginCount;
}
