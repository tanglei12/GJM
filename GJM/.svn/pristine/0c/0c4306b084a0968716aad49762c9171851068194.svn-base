package com.gjp.service;

import com.gjp.dao.EnterpriseStatisticsDAO;
import com.gjp.model.StatisticsVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author 陈智颖
 * @create 2018-04-01 上午9:50
 **/
@Service
public class EnterpriseStatisticsService {

    @Autowired
    private EnterpriseStatisticsDAO enterpriseStatisticsDAO;

    /**
     * 总成交量
     *
     * @return
     */
    public StatisticsVo sumDeal() {
        return enterpriseStatisticsDAO.sumDeal();
    }

    /**
     * 求租信息
     *
     * @return
     */
    public StatisticsVo rentMessage() {
        return enterpriseStatisticsDAO.rentMessage();
    }

    /**
     * 累计客户
     *
     * @return
     */
    public StatisticsVo countCustomer() {
        return enterpriseStatisticsDAO.countCustomer();
    }

    /**
     * 转化率
     * @return
     */
    public StatisticsVo conversionRate(){
        return enterpriseStatisticsDAO.conversionRate();
    }

    /**
     * 数据量统计
     *
     * @return
     */
    public StatisticsVo dataSum(){
        return enterpriseStatisticsDAO.dataSum();
    }

    /**
     * 财务流水占比
     *
     * @return
     */
    public StatisticsVo financeBill(Integer w_payType){
        return enterpriseStatisticsDAO.financeBill(w_payType);
    }

    /**
     * 数据健康度
     *
     * @return
     */
    public StatisticsVo dataHealthy(){
        return enterpriseStatisticsDAO.dataHealthy();
    }

    /**
     * 数据活跃度
     *
     * @return
     */
    public StatisticsVo activeData(){
        return enterpriseStatisticsDAO.activeData();
    }

}
