package com.gjp.dao;

import java.util.Map;

/**
 * @author 陈智颖
 * @create 2018-04-25 上午11:01
 **/
public interface ChartDAO {

    /**
     * 招租房源(套)统计
     *
     * @return
     */
    Map<String, Object> rentHouseCount();

    /**
     * 租客逾期（笔）统计
     *
     * @return
     */
    Map<String, Object> billBeOverdue();

    /**
     * 超期合同（份）统计
     *
     * @return
     */
    Map<String, Object> overdueContract();

    /**
     * 待完善合同（份）统计
     *
     * @return
     */
    Map<String, Object> perfectContract();

    /**
     * 到期合同（份）统计
     *
     * @return
     */
    Map<String, Object> expireContract();

    /**
     * 财务流水统计
     *
     * @return
     */
    Map<String, Object> queryBillRecord(Integer balpay, String date);

    /**
     * 服务统计
     *
     * @return
     * */
    Map<String, Object> queryService();

    /**
     * 业务量统计
     *
     * @return
     * */
    Map<String, Object> queryBusinessVolume();

    /**
     * 存房排行
     *
     * @return
     * */
    Map<String, Object> queryHousePeople();
}
