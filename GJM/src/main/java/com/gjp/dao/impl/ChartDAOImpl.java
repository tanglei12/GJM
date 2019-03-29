package com.gjp.dao.impl;

import com.alibaba.fastjson.JSONObject;
import com.gjp.dao.BaseDAO;
import com.gjp.dao.ChartDAO;
import com.gjp.model.BillStatic;
import com.gjp.model.HousePeople;
import com.gjp.model.ServiceMessage;
import com.gjp.util.GetDay;
import org.springframework.stereotype.Repository;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author 陈智颖
 * @create 2018-04-25 上午11:03
 **/
@Repository
public class ChartDAOImpl extends BaseDAO implements ChartDAO {

    @Override
    public Map<String, Object> rentHouseCount() {
        Map<String, Object> map = new HashMap<>();
        DecimalFormat df = new DecimalFormat("#.00");
        // 总房源套数
        Integer houseCount = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.houseCount");
        // 招租房源套数
        Integer rentHouseCount = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.rentHouseCount");
        // 空置数统计
        Integer vacantHouseCount = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.vacantHouseCount");
        // 转租房源统计
        Integer subleaseHouseCount = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.subleaseHouseCount");
        // 已交定金
        Integer depositHouseCount = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.depositHouseCount");
        double baifen = ((double)rentHouseCount/(double)houseCount*100);
        if(baifen > 0){
            baifen = Double.valueOf(df.format(baifen));
        }
        map.put("baifen",baifen);
        map.put("rentHouseCount",rentHouseCount);
        map.put("vacantHouseCount",vacantHouseCount);
        map.put("subleaseHouseCount",subleaseHouseCount);
        map.put("depositHouseCount",depositHouseCount);
        return map;
    }

    @Override
    public Map<String, Object> billBeOverdue() {
        Map<String, Object> map = new HashMap<>();
        // 逾期总数
        Integer billBeOverdueCount = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.billBeOverdueCount");
        // 1-5天逾期笔数
        Integer billBeOverdue1_5 = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.billBeOverdue1_5");
        // 5-10天逾期笔数
        Integer billBeOverdue5_10 = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.billBeOverdue5_10");
        // 10以上天逾期笔数
        Integer billBeOverdue10_ = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.billBeOverdue10_");
        map.put("billBeOverdueCount", billBeOverdueCount);
        map.put("billBeOverdue1_5", billBeOverdue1_5);
        map.put("billBeOverdue5_10", billBeOverdue5_10);
        map.put("billBeOverdue10_", billBeOverdue10_);
        return map;
    }

    @Override
    public Map<String, Object> overdueContract() {
        Map<String, Object> map = new HashMap<>();
        // 超期合同
        Integer overdueContractCount = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.overdueContractCount");
        // 租赁合同
        Integer overdueContractTg = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.overdueContractTg");
        // 托管合同
        Integer overdueContractZl = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.overdueContractZl");
        map.put("overdueContractCount", overdueContractCount);
        map.put("overdueContractTg", overdueContractTg);
        map.put("overdueContractZl", overdueContractZl);
        return map;
    }

    @Override
    public Map<String, Object> perfectContract() {
        Map<String, Object> map = new HashMap<>();
        // 待完善合同
        Integer perfectContract = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.perfectContract");
        // 编辑中
        Integer perfectContractEdit = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.perfectContractEdit");
        // 审核中
        Integer perfectContractAudit = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.perfectContractAudit");
        // 复核中
        Integer perfectContractToReview = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.perfectContractToReview");
        map.put("perfectContract", perfectContract);
        map.put("perfectContractEdit", perfectContractEdit);
        map.put("perfectContractAudit", perfectContractAudit);
        map.put("perfectContractToReview", perfectContractToReview);
        return map;
    }

    @Override
    public Map<String, Object> expireContract() {
        Map<String, Object> map = new HashMap<>();
        // 到期合同
        Integer expireContract = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.expireContract");
        // 托管合同
        Integer expireContractTg = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.expireContractTg");
        // 租赁合同
        Integer expireContractZl = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.expireContractZl");
        map.put("expireContract", expireContract);
        map.put("expireContractTg", expireContractTg);
        map.put("expireContractZl", expireContractZl);
        return map;
    }

    @Override
    public Map<String, Object> queryBillRecord(Integer balpay, String date) {
        DecimalFormat money = new DecimalFormat("#,###.00");
        Map<String, Object> map = new HashMap<>();
        // 租金
        BillStatic billStatic1 = new BillStatic();
        billStatic1.setBill_type(balpay);
        billStatic1.setProduct_type(1);
        billStatic1.setDate(date);
        double rent = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.queryBillRecord", billStatic1);
        // 服务费
        BillStatic billStatic3 = new BillStatic();
        billStatic3.setBill_type(balpay);
        billStatic3.setProduct_type(2);
        billStatic3.setDate(date);
        double service = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.queryBillRecord", billStatic3);
        // 定金
        BillStatic billStatic4 = new BillStatic();
        billStatic4.setBill_type(balpay);
        billStatic4.setProduct_type(4);
        billStatic4.setDate(date);
        double deposit = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.queryBillRecord", billStatic4);
        // 其他
        BillStatic billStatic5 = new BillStatic();
        billStatic5.setBill_type(balpay);
        billStatic5.setProduct_type(0);
        billStatic5.setDate(date);
        double other = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.queryBillRecord", billStatic5);
        // 总流水笔数
        BillStatic billStatic6 = new BillStatic();
        billStatic6.setBill_type(balpay);
        billStatic6.setDate(date);
        double count = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.queryBillRecordCount", billStatic6);
        // 流水总额
        double sumMoney = rent + service + deposit + other;
        if(balpay == 2){
            sumMoney = rent + other;
        }
        if(sumMoney > 0){
            map.put("sumMoney", money.format(sumMoney));
        }else{
            map.put("sumMoney", sumMoney);
        }
        map.put("rent", rent);
        if(rent > 0){
            map.put("rentStr", money.format(rent));
        }else{
            map.put("rentStr", rent);
        }
        map.put("service", service);
        if(service > 0){
            map.put("serviceStr", money.format(service));
        }else{
            map.put("serviceStr", service);
        }
        map.put("deposit", deposit);
        if(deposit > 0){
            map.put("depositStr", money.format(deposit));
        }else{
            map.put("depositStr", deposit);
        }
        map.put("other", other);
        if(other > 0){
            map.put("otherStr", money.format(other));
        }else{
            map.put("otherStr", other);
        }
        map.put("count", count);
        return map;
    }

    @Override
    public Map<String, Object> queryService() {
        Map<String, Object> map = new HashMap<>();
        SimpleDateFormat sdfs = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat sdf = new SimpleDateFormat("MM-dd");
        Date startDate = new Date();
        int monthDay = GetDay.getCurrentMonthDay();
        List<String> dateList = new ArrayList<>();
        // 服务
        List<String> inServiceWhere = new ArrayList<>();
        for (int i = 1; i <= monthDay; i++) {
            String dateStr = "";
            if(i < 10){
                dateStr = sdfs.format(startDate).substring(0,7)+"-0"+i;
            }else{
                dateStr = sdfs.format(startDate).substring(0,7)+"-"+i;
            }
            try {
                dateList.add(sdf.format(sdfs.parse(dateStr)));
            } catch (ParseException e) {
                e.printStackTrace();
            }

            inServiceWhere.add(dateStr);
        }

        // 居家保洁
        ServiceMessage serviceMessage1 = new ServiceMessage();
        serviceMessage1.setSm_name("居家保洁");
        serviceMessage1.setInServiceWhere(inServiceWhere);
        List<Integer> service1 = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ChartDAO.queryService", serviceMessage1);
        // 居家维修
        ServiceMessage serviceMessage2 = new ServiceMessage();
        serviceMessage2.setSm_name("居家维修");
        serviceMessage2.setInServiceWhere(inServiceWhere);
        List<Integer> service2 = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ChartDAO.queryService", serviceMessage2);
        // 翻新改造
        ServiceMessage serviceMessage3 = new ServiceMessage();
        serviceMessage3.setSm_name("翻新改造");
        serviceMessage3.setInServiceWhere(inServiceWhere);
        List<Integer> service3 = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ChartDAO.queryService", serviceMessage3);
        // 宽带服务
        ServiceMessage serviceMessage4 = new ServiceMessage();
        serviceMessage4.setSm_name("宽带服务");
        serviceMessage4.setInServiceWhere(inServiceWhere);
        List<Integer> service4 = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ChartDAO.queryService", serviceMessage4);
        // 自由搬家
        ServiceMessage serviceMessage5 = new ServiceMessage();
        serviceMessage5.setSm_name("自由搬家");
        serviceMessage5.setInServiceWhere(inServiceWhere);
        List<Integer> service5 = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ChartDAO.queryService", serviceMessage5);
        // 家电清洗
        ServiceMessage serviceMessage6 = new ServiceMessage();
        serviceMessage6.setSm_name("家电清洗");
        serviceMessage6.setInServiceWhere(inServiceWhere);
        List<Integer> service6 = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ChartDAO.queryService", serviceMessage6);
        // 开锁换锁
        ServiceMessage serviceMessage7 = new ServiceMessage();
        serviceMessage7.setSm_name("开锁换锁");
        serviceMessage7.setInServiceWhere(inServiceWhere);
        List<Integer> service7 = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ChartDAO.queryService", serviceMessage7);

        map.put("date",dateList);
        map.put("service1",service1);
        map.put("service2",service2);
        map.put("service3",service3);
        map.put("service4",service4);
        map.put("service5",service5);
        map.put("service6",service6);
        map.put("service7",service7);
        return map;
    }

    @Override
    public Map<String, Object> queryBusinessVolume() {
        Map<String, Object> map = new HashMap<>();
        SimpleDateFormat sdfs = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat sdf = new SimpleDateFormat("MM-dd");
        Date startDate = new Date();
        List<String> dateList = new ArrayList<>();
        int monthDay = GetDay.getCurrentMonthDay();

        // 存房数
        List<String> inHouseWhere = new ArrayList<>();
        // 出房数
        List<String> outHouseWhere = new ArrayList<>();
        // 解约数
        List<String> dissolutionWhere = new ArrayList<>();

        for (int i = 1; i <= monthDay; i++) {
            String dateStr = "";
            if(i < 10){
                dateStr = sdfs.format(startDate).substring(0,7)+"-0"+i;
            }else{
                dateStr = sdfs.format(startDate).substring(0,7)+"-"+i;
            }
            try {
                dateList.add(sdf.format(sdfs.parse(dateStr)));
            } catch (ParseException e) {
                e.printStackTrace();
            }

            inHouseWhere.add(dateStr);
            outHouseWhere.add(dateStr);
            dissolutionWhere.add(dateStr);
        }

        // 存房数
        BillStatic billStatic = new BillStatic();
        billStatic.setInHouseWhere(inHouseWhere);
        billStatic.setOutHouseWhere(outHouseWhere);
        billStatic.setDissolutionWhere(dissolutionWhere);
        List<Integer> inHouse = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ChartDAO.queryInHouse",billStatic);
        // 出房数
        List<Integer> outHouse = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ChartDAO.queryOutHouse",billStatic);
        // 解约数
        List<Integer> dissolution = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ChartDAO.queryDissolution",billStatic);

        List<String> objects = new ArrayList<>();
        String json1 = "{";
        json1 += "\"name\":\"存房数\",";
        for (int i = 0; i < dateList.size(); i++) {
            if(i != (dateList.size()-1)){
                json1 += "\""+ dateList.get(i) +"\":"+ inHouse.get(i) +",";
            }else{
                json1 += "\""+ dateList.get(i) +"\":"+ inHouse.get(i) +"";
            }
        }
        json1 +="}";
        objects.add(json1);
        String json2 = "{";
        json2 += "\"name\":\"出房数\",";
        for (int i = 0; i < dateList.size(); i++) {
            if(i != (dateList.size()-1)){
                json2 += "\""+ dateList.get(i) +"\":"+ outHouse.get(i) +",";
            }else{
                json2 += "\""+ dateList.get(i) +"\":"+ outHouse.get(i) +"";
            }
        }
        json2 +="}";
        objects.add(json2);
        String json3 = "{";
        json3 += "\"name\":\"解约数\",";
        for (int i = 0; i < dateList.size(); i++) {
            if(i != (dateList.size()-1)){
                json3 += "\""+ dateList.get(i) +"\":"+ dissolution.get(i) +",";
            }else{
                json3 += "\""+ dateList.get(i) +"\":"+ dissolution.get(i) +"";
            }
        }
        json3 +="}";
        objects.add(json3);
        String str = JSONObject.toJSONString(objects);

        map.put("data", str);
        map.put("date", dateList);

        return map;
    }

    @Override
    public Map<String, Object> queryHousePeople() {
        Map<String, Object> map = new HashMap<>();
        // 存房数
        List<HousePeople> inHouse = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ChartDAO.queryInHousePeople");
        // 出房数
        List<HousePeople> outHouse = super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.ChartDAO.queryOutHousePeople");
        // 当前月总存房数
        int inHouseSum = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.queryInHouseSum");
        // 当前月总出房数
        int outHouseSum = super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ChartDAO.queryOutHouseSum");
        map.put("inHouseSum", inHouseSum);
        map.put("outHouseSum", outHouseSum);
        map.put("inHouse", inHouse);
        map.put("outHouse", outHouse);
        return map;
    }

}
