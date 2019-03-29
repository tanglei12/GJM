package com.gjp.service;

import com.gjp.dao.ChartDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * @author 陈智颖
 * @create 2018-04-25 上午11:12
 **/
@Service
public class ChartService {

    @Autowired
    private ChartDAO chartDAO;

    /**
     * 招租房源(套)统计
     *
     * @return
     */
    public Map<String, Object> rentHouseCount(){
        return chartDAO.rentHouseCount();
    }

    /**
     * 招租房源(套)统计
     *
     * @return
     */
    public Map<String, Object> billBeOverdue(){
        return chartDAO.billBeOverdue();
    }

    /**
     * 超期合同(份)统计
     *
     * @return
     */
    public Map<String, Object> overdueContract(){
        return chartDAO.overdueContract();
    }

    /**
     * 待完善合同(份)统计
     *
     * @return
     */
    public Map<String, Object> perfectContract(){
        return chartDAO.perfectContract();
    }

    /**
     * 到期合同(份)统计
     *
     * @return
     */
    public Map<String, Object> expireContract(){
        return chartDAO.expireContract();
    }

    /**
     * 财务流水统计
     *
     * @return
     */
    public Map<String, Object> queryBillRecord(Integer balpay, String date){
        return chartDAO.queryBillRecord(balpay, date);
    }

    /**
     * 服务统计
     *
     * @return
     */
    public Map<String, Object> queryService(){
        return chartDAO.queryService();
    }

    /**
     * 业务量统计
     *
     * @return
     */
    public Map<String, Object> queryBusinessVolume(){
        return chartDAO.queryBusinessVolume();
    }

    /**
     * 存出房排行
     *
     * @return
     */
    public Map<String, Object> queryHousePeople(){
        return chartDAO.queryHousePeople();
    }
}
