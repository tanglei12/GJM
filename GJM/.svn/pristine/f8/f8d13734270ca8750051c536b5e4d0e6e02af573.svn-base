package com.gjp.controller;

import com.gjp.model.DataList;
import com.gjp.model.ServiceCharge;
import com.gjp.service.ServiceChargeService;
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
 * @author 王兴荣
 * @create 2017-07-29 18:27
 **/

@Controller
@RequestMapping("/service")
@org.springframework.context.annotation.Configuration
public class ServiceChargeController {

    private @Resource
    ServiceChargeService serviceChargeService;

    /**
     * 跳转服务费
     */
    @RequestMapping("/serviceCharge")
    public String serviceCharge(HttpServletRequest request, HttpServletResponse response) {
        return "/service/serviceCharge";
    }

    @RequestMapping("queryServiceChargeList")
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
            houseModel.setSqlOrderBy("order by createTime DESC ");
        }
        // 装载数据类
        DataList<ServiceCharge> datalist = new DataList<ServiceCharge>();
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        // 分页设置查询条数
        PageModel<ServiceCharge> pageModel1 = serviceChargeService.queryServiceChargeLists(tableList.getPageNo(), pageSize, houseModel);
        Map<String, Object> map = datalist.dataList(pageModel1.getList(), tableList.getPageNo(), pageSize, pageModel1.getTotalRecords(), pageModel1.getSumMoney());
        return map;
    }


    /**
     * @param request
     * @param response
     * @param init_serveMoney    初始服务费
     * @param used_serveMoney    已使用的服务费用
     * @param serveType          服务费类型
     * @param ht_code            合同编号
     * @param kh_code            客户编号
     * @param fw_code            房屋编号
     * @param surplus_serveMoney 剩余服务费
     */
    @RequestMapping("/appAddServiceCharge")
    public void appAddServiceCharge(HttpServletRequest request, HttpServletResponse response, Double init_serveMoney, Double used_serveMoney, Integer serveType, String ht_code,
                                    String kh_code, String fw_code, Double surplus_serveMoney) {


        Msg<Object> msg = new Msg<>();
        ServiceCharge sc = new ServiceCharge();
//        sc.setFw_code(fw_code);
//        sc.setHt_code(ht_code);
//        sc.setKh_code(kh_code);
        sc.setInit_serveMoney(init_serveMoney);
        sc.setUsed_serveMoney(used_serveMoney);
        sc.setServeType(serveType);
        int so = serviceChargeService.appAddServiceCharge(sc);
        if (so == 1) {
            msg.setMsg(200, "数据返回成功");
        } else {
            msg.setMsg(401, "数据返回失败");
        }


    }


}
