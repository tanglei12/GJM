package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.EnterpriseStatisticsDAO;
import com.gjp.model.StatisticsVo;
import org.springframework.stereotype.Repository;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * @author 陈智颖
 * @create 2018-04-01 上午9:20
 **/
@Repository
public class EnterpriseStatisticsDAOImpl extends BaseDAO implements EnterpriseStatisticsDAO {

    @Override
    public StatisticsVo sumDeal() {
        DecimalFormat df = new DecimalFormat("#,###");
        StatisticsVo statisticsVo = new StatisticsVo();
        // 多币总成交量
        Integer sumCoin = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.querySumCoin");
        // 今日多币总成交量
        Integer daySumCoin = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.queryToDaySumCoin");
        // 昨日多币总成交量
        Integer yesterdaySumCoin = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.queryYesterdaySumCoin");
        // 这周多币成交量
        Integer theWeekSumCoin = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.queryTheWeekSumCoin");
        // 上周多币成交量
        Integer lastWeekSumCoin = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.queryLastWeekSumCoin");
        // 比昨日升降
        Integer yesterdayLift = (int) ((double) (daySumCoin - yesterdaySumCoin) / yesterdaySumCoin * 100);
        // 比上周升降
        Integer lastWeekLift = (int) ((double) (theWeekSumCoin - lastWeekSumCoin) / lastWeekSumCoin * 100);
        statisticsVo.setSumCoin(df.format(sumCoin));
        statisticsVo.setDaySumCoin(df.format(daySumCoin));
        statisticsVo.setYesterdayLift(yesterdayLift);
        statisticsVo.setLastWeekLift(lastWeekLift);
        return statisticsVo;
    }

    @Override
    public StatisticsVo rentMessage() {
        DecimalFormat df = new DecimalFormat("#,###");
        StatisticsVo statisticsVo = new StatisticsVo();
        // 求租总数
        Integer sumRent = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.queryCountRentCustomer");
        // 今日求租数量
        Integer toDayRent = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.queryToDayCountCustomer");
        // 今日求租数量
        List<Integer> dayRent = super.sqlSessionTemplateZkd.selectList("com.gjp.dao.EnterpriseStatisticsDAO.query15RentCustomer");
        statisticsVo.setSumRent(df.format(sumRent));
        statisticsVo.setToDayRent(df.format(toDayRent));
        statisticsVo.setDayRent(dayRent);
        return statisticsVo;
    }

    @Override
    public StatisticsVo countCustomer() {
        DecimalFormat df = new DecimalFormat("#,###");
        StatisticsVo statisticsVo = new StatisticsVo();
        // 累计客户总数
        Integer countCutomer = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.querySumUser");
        // 今日注入量
        Integer toDayCountCutomer = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.queryToDaySumUser");
        // 15天累计客户
        List<Integer> countCustomers = super.sqlSessionTemplateZkd.selectList("com.gjp.dao.EnterpriseStatisticsDAO.query15SumUser");
        statisticsVo.setSumUser(df.format(countCutomer));
        statisticsVo.setToDaySumUser(df.format(toDayCountCutomer));
        statisticsVo.setSumUsers(countCustomers);
        return statisticsVo;
    }

    @Override
    public StatisticsVo conversionRate() {
        DecimalFormat df = new DecimalFormat("#,###");
        StatisticsVo statisticsVo = new StatisticsVo();
        // 总求租信息
        Integer countRentCustomer = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.queryCountRentCustomer");
        // 购买量
        Integer purchaseNum = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.queryPurchaseNum");
        // 成交量
        Integer dealNum = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.queryDealNum");
        // 今日成交量
        Integer toDayDealNum = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.queryToDayDealNum");
        // 昨日成交量
        Integer yesterDayDealNum = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.queryYesterDayDealNum");
        statisticsVo.setDealNumLift((int)((double)dealNum / purchaseNum * 100));
        statisticsVo.setPurchaseNumLift((int)((double)purchaseNum / countRentCustomer * 100));
        statisticsVo.setToDayNum(df.format(toDayDealNum));
        if(toDayDealNum > yesterDayDealNum){
            statisticsVo.setAscDesc("asc");
        }else if(toDayDealNum < yesterDayDealNum){
            statisticsVo.setAscDesc("desc");
        }
        return statisticsVo;
    }

    @Override
    public StatisticsVo dataSum() {
        StatisticsVo statisticsVo = new StatisticsVo();
        SimpleDateFormat sdf = new SimpleDateFormat("MM-dd");
        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        List<String> customerDateStr = new ArrayList<>();
        for (int i = 11; i > -1; i--) {
            calendar.setTime(date);
            calendar.add(Calendar.DAY_OF_MONTH, -i);
            customerDateStr.add(sdf.format(calendar.getTime()));
        }
        // 发布量
        List<Integer> releaseNum12 = super.sqlSessionTemplateZkd.selectList("com.gjp.dao.EnterpriseStatisticsDAO.query12ReleaseNum");
        // 查看量
        List<Integer> seeNum12 = super.sqlSessionTemplateZkd.selectList("com.gjp.dao.EnterpriseStatisticsDAO.query12SeeNum");
        // 购买量
        List<Integer> purchaseNum12 = super.sqlSessionTemplateZkd.selectList("com.gjp.dao.EnterpriseStatisticsDAO.query12PurchaseNum");
        statisticsVo.setReleaseNum12(releaseNum12);
        statisticsVo.setSeeNum12(seeNum12);
        statisticsVo.setPurchaseNum12(purchaseNum12);
        statisticsVo.setCustomerDateStr(customerDateStr);
        return statisticsVo;
    }

    @Override
    public StatisticsVo financeBill(Integer w_payType) {
        DecimalFormat df = new DecimalFormat("0.00");
        DecimalFormat money = new DecimalFormat("#,###.00");
        StatisticsVo statisticsVo = new StatisticsVo();
        // 经纪人钱包充值
        Double agentWalletMoney = 0.0;
        // 经纪人钱包多币充值
        Double agentWalletCoin = 0.0;
        // 企业钱包充值
        Double accountWalletMoney = 0.0;
        // 企业会员续费
        Double accountWalletRenew = 0.0;
        // 收入流水
        Double accountWalletSum = 0.0;
        // 余额提现
        Double withdrawalsMoney = 0.0;
        if(w_payType == 1){
            // 经纪人钱包充值
            agentWalletMoney = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.queryAgentWalletMoney");
            // 经纪人钱包多币充值
            agentWalletCoin = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.queryAgentWalletCoin");
            // 企业钱包充值
            accountWalletMoney = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.queryAccountWalletMoney");
            // 企业会员续费
            accountWalletRenew = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.queryAccountWalletRenew");
            // 总流水
            accountWalletSum = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.queryAccountWalletIncome");
        }else{
            // 余额提现
            withdrawalsMoney = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.queryWithdraw");
            // 总流水
            accountWalletSum = super.sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseStatisticsDAO.queryAccountWalletExpenditure");
        }
        statisticsVo.setAgentWalletMoney(Double.valueOf(df.format(agentWalletMoney)));
        statisticsVo.setAgentWalletCoin(Double.valueOf(df.format(agentWalletCoin)));
        statisticsVo.setAccountWalletMoney(Double.valueOf(df.format(accountWalletMoney)));
        statisticsVo.setAccountWalletRenew(Double.valueOf(df.format(accountWalletRenew)));
        statisticsVo.setWithdrawalsMoney(Double.valueOf(df.format(withdrawalsMoney)));
        statisticsVo.setAccountWalletSum(money.format(accountWalletSum));
        return statisticsVo;
    }

    @Override
    public StatisticsVo dataHealthy() {
        StatisticsVo statisticsVo = new StatisticsVo();
        SimpleDateFormat sdf = new SimpleDateFormat("MM-dd");
        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        List<String> healthyDateStr = new ArrayList<>();
        for (int i = 5; i > -1; i--) {
            calendar.setTime(date);
            calendar.add(Calendar.DAY_OF_MONTH, -i);
            healthyDateStr.add(sdf.format(calendar.getTime()));
        }
        // 购买量
        List<Integer> purchaseNum6 = super.sqlSessionTemplateZkd.selectList("com.gjp.dao.EnterpriseStatisticsDAO.queryPurchaseNum6");
        // 投诉量
        List<Integer> complaintNum6 = super.sqlSessionTemplateZkd.selectList("com.gjp.dao.EnterpriseStatisticsDAO.queryComplaintNum6");
        statisticsVo.setHealthyDateStr(healthyDateStr);
        statisticsVo.setPurchaseNum6(purchaseNum6);
        statisticsVo.setComplaintNum6(complaintNum6);
        return statisticsVo;
    }

    @Override
    public StatisticsVo activeData() {
        StatisticsVo statisticsVo = new StatisticsVo();
        SimpleDateFormat sdf = new SimpleDateFormat("MM-dd");
        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        List<String> activeDateStr = new ArrayList<>();
        for (int i = 11; i > -1; i--) {
            calendar.setTime(date);
            calendar.add(Calendar.DAY_OF_MONTH, -i);
            activeDateStr.add(sdf.format(calendar.getTime()));
        }
        // 登录人数
        List<Integer> loginNum = super.sqlSessionTemplateZkd.selectList("com.gjp.dao.EnterpriseStatisticsDAO.queryLoginNum");
        // 登录人次
        List<Integer> loginCount = super.sqlSessionTemplateZkd.selectList("com.gjp.dao.EnterpriseStatisticsDAO.queryLoginCount");
        statisticsVo.setLoginNum(loginNum);
        statisticsVo.setLoginCount(loginCount);
        statisticsVo.setActiveDateStr(activeDateStr);
        return statisticsVo;
    }
}
