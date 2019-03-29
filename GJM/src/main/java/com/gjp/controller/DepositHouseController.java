package com.gjp.controller;

import com.gjp.model.DataList;
import com.gjp.model.HouseAppointment;
import com.gjp.model.Trusteeship;
import com.gjp.service.DepositHouseService;
import com.gjp.util.AppUtil;
import com.gjp.util.PageModel;
import com.gjp.util.TableList;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * 托管申请
 *
 * @author zoe
 */
@Controller
public class DepositHouseController {

    // 托管申请
    @Resource
    private DepositHouseService depositHouseService;

    /**
     * 跳转托管申请界面
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/depositHouse")
    public String billPartners(HttpServletRequest request, HttpServletResponse response) {
        return "/deposit/depositHouse";
    }

    /**
     * 跳转预约看房界面
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/bespeakHouse")
    public String bespeakHouse(HttpServletRequest request, HttpServletResponse response) {
        return "/deposit/bespeakHouse";
    }


    /**
     * ajax分页查询托管申请List
     *
     * @param response
     * @return
     * @throws ParseException
     */
    @RequestMapping("/selectDepositHouse")
    @ResponseBody
    public Map<String, Object> selectDepositHouse(HttpServletResponse response, TableList tableList1) throws ParseException {

        //初始化获取对象
        TableList tableList = tableList1.initData(tableList1);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

        PageModel<Trusteeship> pageModel1 = new PageModel<Trusteeship>();

        if (tableList.getDateStart() != null && !tableList.getDateStart().equals("")) {
            pageModel1.setDateStart(sf.parse(tableList.getDateStart()));
        }
        if (tableList.getDateEnd() != null && !tableList.getDateEnd().equals("")) {
            pageModel1.setDateEnd(sf.parse(tableList.getDateEnd()));
        }
        pageModel1.setSqlWhere(tableList.getSqlWhere());

        pageModel1.setDateTitle(tableList.getDateType());

        if (tableList.getOrderBy() != null && !tableList.getOrderBy().equals("")) {
            pageModel1.setSqlOrderBy("order by " + tableList.getOrderBy() + " asc");
        } else {
            pageModel1.setSqlOrderBy("");
        }
        // 装载数据类
        DataList<Trusteeship> datalist = new DataList<Trusteeship>();
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        pageModel1.setPageNo((tableList.getPageNo() - 1) * pageSize);
        // 分页设置查询条数
        pageModel1.setPageSize(pageSize);
        // 查询分页实体
        PageModel<Trusteeship> pageModel = depositHouseService.selectTrusteeships(pageModel1);
        //处理特殊数据
        List<Trusteeship> list = new ArrayList<Trusteeship>();
        for (Trusteeship trusteeship : pageModel.getList()) {
            trusteeship.setTs_phone("/" + trusteeship.getTs_phone());
            list.add(trusteeship);
        }
        // 装载数据
        Map<String, Object> map = datalist.dataList(list, tableList.getPageNo(), pageSize, pageModel.getTotalRecords(), pageModel.getSumMoney());

        return map;
    }

    /**
     * ajax修改托管状态
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/updateHe")
    @ResponseBody
    public Map<String, Object> updateHe(
            HttpServletRequest request, HttpServletResponse response,
            String ht_id, String ht_state, String ht_txt) {
        Trusteeship trusteeship = new Trusteeship();
        trusteeship.setTs_id(Integer.parseInt(ht_id));
        trusteeship.setTs_state(ht_state.replace(",", ""));
        trusteeship.setTs_txt(ht_txt);
        int result = depositHouseService.updateHe(trusteeship);
        Map<String, Object> map = new HashMap<>();
        map.put("result", result);
        return map;
    }

    /**
     * ajax查询单条托管申请
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/selectTrusteeship")
    @ResponseBody
    public Map<String, Object> selectTrusteeship(
            HttpServletRequest request, HttpServletResponse response,
            String ht_id) {
        Trusteeship trusteeship = new Trusteeship();
        trusteeship.setTs_id(Integer.parseInt(ht_id));
        Trusteeship trusteeships = depositHouseService.selectTrusteeship(trusteeship);
        Map<String, Object> map = new HashMap<>();
        map.put("trusteeships", trusteeships);
        return map;
    }

    /**
     * ajax查询单条预约申请
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/selectBespeakHe")
    @ResponseBody
    public Map<String, Object> selectBespeakHe(
            HttpServletRequest request, HttpServletResponse response,
            String ht_id) {
        HouseAppointment houseAppointment = new HouseAppointment();
        houseAppointment.setHaa_id(Integer.parseInt(ht_id));
        HouseAppointment houseAppointments = depositHouseService.selectBespeakHe(houseAppointment);
        Map<String, Object> map = new HashMap<>();
        map.put("houseAppointments", houseAppointments);
        return map;
    }


    /**
     * ajax分页查询预约看房List
     *
     * @param response
     * @return
     * @throws ParseException
     */
    @RequestMapping("/selectBespeakHouse")
    @ResponseBody
    public Map<String, Object> selectBespeakHouse(HttpServletResponse response, TableList tableList1) throws ParseException {

        //初始化获取对象
        TableList tableList = tableList1.initData(tableList1);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

        PageModel<HouseAppointment> pageModel1 = new PageModel<HouseAppointment>();

        if (tableList.getDateStart() != null && !tableList.getDateStart().equals("")) {
            pageModel1.setDateStart(sf.parse(tableList.getDateStart()));
        }
        if (tableList.getDateEnd() != null && !tableList.getDateEnd().equals("")) {
            pageModel1.setDateEnd(sf.parse(tableList.getDateEnd()));
        }
        pageModel1.setSqlWhere(tableList.getSqlWhere());

        pageModel1.setDateTitle(tableList.getDateType());

        if (tableList.getOrderBy() != null && !tableList.getOrderBy().equals("")) {
            pageModel1.setSqlOrderBy("order by " + tableList.getOrderBy() + " asc");
        } else {
            pageModel1.setSqlOrderBy("");
        }
        // 装载数据类
        DataList<HouseAppointment> datalist = new DataList<HouseAppointment>();
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        pageModel1.setPageNo((tableList.getPageNo() - 1) * pageSize);
        // 分页设置查询条数
        pageModel1.setPageSize(pageSize);
        // 查询分页实体
        PageModel<HouseAppointment> pageModel = depositHouseService.selectHouseAppointment(pageModel1);
        //处理特殊数据
        List<HouseAppointment> list = new ArrayList<HouseAppointment>();
        for (HouseAppointment houseAppointment : pageModel.getList()) {
            houseAppointment.setHaa_phone("/" + houseAppointment.getHaa_phone());
            list.add(houseAppointment);
        }
        // 装载数据
        Map<String, Object> map = datalist.dataList(list, tableList.getPageNo(), pageSize, pageModel.getTotalRecords(), pageModel.getSumMoney());

        return map;
    }


    /**
     * ajax修改预约状态
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/updateBespeakHe")
    @ResponseBody
    public Map<String, Object> updateBespeakHe(
            HttpServletRequest request, HttpServletResponse response,
            String haa_id, String ha_operationState, String haa_txt) {
        HouseAppointment houseAppointment = new HouseAppointment();
        houseAppointment.setHaa_id(Integer.parseInt(haa_id));
        houseAppointment.setHa_operationState(ha_operationState.replace(",", ""));
        houseAppointment.setHaa_txt(haa_txt);
        int result = depositHouseService.updateBespeakHe(houseAppointment);
        Map<String, Object> map = new HashMap<>();
        map.put("result", result);
        return map;
    }
}
