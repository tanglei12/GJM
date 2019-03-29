package com.gjp.controller;

import com.alibaba.fastjson.JSONObject;
import com.gjp.model.StatisticsVo;
import com.gjp.service.EnterpriseStatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 租客多统计
 *
 * @author 陈智颖
 * @create 2018-03-30 下午2:58
 **/
@Controller
@RequestMapping("/zkdStatistics")
public class ZkdStatisticsController {

    // 租客多统计
    @Autowired
    private EnterpriseStatisticsService enterpriseStatisticsService;

    @RequestMapping("/wellcome")
    public String wellcome(){
        return "/zkd/statistics";
    }

    @RequestMapping("/statistics1")
    public String statistics1(){
        return "/zkd/statistics1";
    }

    /**
     * 租客多统计数据
     *
     * @return
     */
    @RequestMapping(value = "/statisticsData", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> statisticsData(){
        Map<String, Object> map = new HashMap<>();
        StatisticsVo statisticsVo1 = enterpriseStatisticsService.sumDeal();
        StatisticsVo statisticsVo2 = enterpriseStatisticsService.rentMessage();
        StatisticsVo statisticsVo3 = enterpriseStatisticsService.countCustomer();
        StatisticsVo statisticsVo4 = enterpriseStatisticsService.conversionRate();
        StatisticsVo statisticsVo5 = enterpriseStatisticsService.dataSum();
        StatisticsVo statisticsVo7 = enterpriseStatisticsService.activeData();
        map.put("data1",statisticsVo1);
        map.put("data2",statisticsVo2);
        map.put("data3",statisticsVo3);
        map.put("data4",statisticsVo4);
        map.put("data5",statisticsVo5);
        map.put("data7",statisticsVo7);
        return map;
    }

    /**
     * 财务流水统计
     *
     * @param w_payType 1：收入 2：支出
     * @author 陈智颖
     * @create 18-4-3 上午11:55
     * @return
     **/
    @RequestMapping(value = "/statisticsBill", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> statisticsBill(Integer w_payType){
        Map<String, Object> map = new HashMap<>();
        StatisticsVo statisticsVo6 = enterpriseStatisticsService.financeBill(w_payType);
        map.put("data6",statisticsVo6);
        return map;
    }

    /**
     * 数据健康度
     *
     * @return
     */
    @RequestMapping(value = "/dataHealthy", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> dataHealthy(){
        Map<String, Object> map = new HashMap<>();
        StatisticsVo statisticsVo = enterpriseStatisticsService.dataHealthy();
        // 投诉量
        List<Integer> complaintNum6 = statisticsVo.getComplaintNum6();
        // 购买量
        List<Integer> purchaseNum6 = statisticsVo.getPurchaseNum6();
        // 时间轴
        List<String> healthyDateStr = statisticsVo.getHealthyDateStr();
        List<String> objects = new ArrayList<>();
        String json1 = "{";
        json1 += "\"name\":\"投诉量\",";
        for (int i = 0; i < healthyDateStr.size(); i++) {
            if(i != (healthyDateStr.size()-1)){
                json1 += "\""+ healthyDateStr.get(i) +"\":"+ complaintNum6.get(i) +",";
            }else{
                json1 += "\""+ healthyDateStr.get(i) +"\":"+ complaintNum6.get(i) +"";
            }
        }
        json1 +="}";
        objects.add(json1);
        String json2 = "{";
        json2 += "\"name\":\"购买量\",";
        for (int i = 0; i < healthyDateStr.size(); i++) {
            if(i != (healthyDateStr.size()-1)){
                json2 += "\""+ healthyDateStr.get(i) +"\":"+ purchaseNum6.get(i) +",";
            }else{
                json2 += "\""+ healthyDateStr.get(i) +"\":"+ purchaseNum6.get(i) +"";
            }
        }
        json2 +="}";
        objects.add(json2);
        String str = JSONObject.toJSONString(objects);
        map.put("data",str);
        map.put("date",healthyDateStr);
        return map;
    }
}
