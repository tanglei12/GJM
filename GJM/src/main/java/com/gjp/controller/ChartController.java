package com.gjp.controller;

import com.gjp.service.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

/**
 * @author 陈智颖
 * @create 2018-04-25 上午11:15
 **/
@Controller
@RequestMapping("/chart")
public class ChartController {

    @Autowired
    private ChartService chartService;

    /**
     * 租房源统计
     *
     * @return
     */
    @RequestMapping("/rentHouse")
    @ResponseBody
    public Map<String, Object> rentHouse() {
        return chartService.rentHouseCount();
    }

    /**
     * 租客逾期统计
     *
     * @return
     */
    @RequestMapping("/billBeOverdue")
    @ResponseBody
    public Map<String, Object> billBeOverdue() {
        return chartService.billBeOverdue();
    }

    /**
     * 超期合同统计
     *
     * @return
     */
    @RequestMapping("/overdueContract")
    @ResponseBody
    public Map<String, Object> overdueContract() {
        return chartService.overdueContract();
    }

    /**
     * 待完善合同统计
     *
     * @return
     */
    @RequestMapping("/perfectContract")
    @ResponseBody
    public Map<String, Object> perfectContract() {
        return chartService.perfectContract();
    }

    /**
     * 到期合同统计
     *
     * @return
     */
    @RequestMapping("/expireContract")
    @ResponseBody
    public Map<String, Object> expireContract() {
        return chartService.expireContract();
    }

    /**
     * 财务流水
     *
     * @return
     */
    @RequestMapping("/queryBillRecord")
    @ResponseBody
    public Map<String, Object> queryBillRecord(Integer balpay, String date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = new Date();
        Calendar dates = Calendar.getInstance();
        switch (date) {
            case "今日":
                date = "AND DATE_FORMAT(bill_pay_time,'%Y-%m-%d') = '" + sdf.format(startDate) + "'";
                break;
            case "昨日":
                dates.setTime(startDate);
                dates.set(Calendar.DATE, dates.get(Calendar.DATE) - 1);
                date = "AND DATE_FORMAT(bill_pay_time,'%Y-%m-%d') = '" + sdf.format(dates.getTime()) + "'";
                break;
            case "近7天":
                dates.setTime(startDate);
                dates.set(Calendar.DATE, dates.get(Calendar.DATE) - 7);
                date = "AND DATE_FORMAT(bill_pay_time,'%Y-%m-%d') > '" + sdf.format(dates.getTime()) + "'";
                date += " AND '" + sdf.format(startDate) + "' > DATE_FORMAT(bill_pay_time,'%Y-%m-%d')";
                break;
        }
        return chartService.queryBillRecord(balpay, date);
    }

    /**
     * 服务统计
     *
     * @return
     */
    @RequestMapping("/queryService")
    @ResponseBody
    public Map<String, Object> queryService() {
        return chartService.queryService();
    }

    /**
     * 业务量统计
     *
     * @return
     */
    @RequestMapping("/queryBusinessVolume")
    @ResponseBody
    public Map<String, Object> queryBusinessVolume() {
        return chartService.queryBusinessVolume();
    }

    /**
     * 存出房排行
     *
     * @return
     */
    @RequestMapping("/queryHousePeople")
    @ResponseBody
    public Map<String, Object> queryHousePeople() {
        return chartService.queryHousePeople();
    }
}
