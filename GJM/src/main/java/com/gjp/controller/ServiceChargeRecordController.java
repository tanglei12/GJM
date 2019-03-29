package com.gjp.controller;

import com.gjp.model.DataList;
import com.gjp.model.ServiceChargeRecord;
import com.gjp.service.ServiceChargeRecordService;
import com.gjp.util.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Map;

/**
 * 服务费
 *
 * @author wxr
 * @create 2017-07-30 15:47
 **/

@Controller
@RequestMapping("/service")
@org.springframework.context.annotation.Configuration
public class ServiceChargeRecordController {

    private @Resource
    ServiceChargeRecordService serviceChargeRecordService;

    /**
     * 跳转服务费
     */
    @RequestMapping("/serviceChargeRecord")
    public String serviceCharge(HttpServletRequest request, HttpServletResponse response) {
        return "/service/serviceChargeRecord";
    }


    /**
     * 服务费记录
     *
     * @param tableList1
     * @return
     * @throws ParseException
     */
    @RequestMapping("queryServiceChargeRecordList")
    @ResponseBody
    public Map<String, Object> queryServiceChargeList(TableList tableList1) throws ParseException {

        // 初始化获取对象
        TableList tableList = tableList1.initData(tableList1);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

        HouseModel houseModel = new HouseModel();
        if (tableList.getDateStart() != null && !tableList.getDateStart().equals("")) {
            houseModel.setDateStart(sf.parse(tableList.getDateStart()));
        }
        if (tableList.getDateEnd() != null && !tableList.getDateEnd().equals("")) {
            houseModel.setDateEnd(sf.parse(tableList.getDateEnd()));
        }

        houseModel.setSqlWhere(tableList.getSqlWhere());

        houseModel.setDateTitle(tableList.getDateType());
        if (tableList.getOrderBy() != null && !tableList.getOrderBy().equals("")) {
            houseModel.setSqlOrderBy("order by " + tableList.getOrderBy() + " asc");
        } else {
            houseModel.setSqlOrderBy("order by create_time DESC ");
        }
        // 装载数据类
        DataList<ServiceChargeRecord> datalist = new DataList<>();
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        // 分页设置查询条数
        PageModel<ServiceChargeRecord> pageModel1 = serviceChargeRecordService.queryServiceChargeRecordList(tableList.getPageNo(), pageSize, houseModel);
        return datalist.dataList(pageModel1.getList(), tableList.getPageNo(), pageSize, pageModel1.getTotalRecords(), pageModel1.getSumMoney());

    }

    /**
     * app接口,add服务费记录
     *
     * @param request
     * @param response
     * @param service_charge     一次服务使用的服务费用 double
     * @param service_type       服务类型int
     * @param surplus_serveMoney 剩余费用double
     * @param ht_code            合同编号String
     * @param kh_code            客户编号String
     * @param fw_code            房屋编号String
     */
    @RequestMapping("/appAddServiceChargeRecord")
    public void appAddServiceCharge(HttpServletRequest request, HttpServletResponse response, Double service_charge, Integer service_type, Double surplus_serveMoney, String ht_code,
                                    String kh_code, String fw_code) {

        Msg<Object> msg = new Msg<>();
        ServiceChargeRecord sc = new ServiceChargeRecord();

        sc.setService_charge(service_charge);
        sc.setSurplus_serveMoney(surplus_serveMoney);
        sc.setService_type(service_type);
//        sc.setFw_code(fw_code);
//        sc.setHt_code(ht_code);
//        sc.setKh_code(kh_code);

        int so = serviceChargeRecordService.appAddServiceChargeRecord(sc);
        if (so == 1) {
            msg.setMsg(200, "数据返回成功");
        } else {
            msg.setMsg(401, "数据返回失败");
        }
    }

}
