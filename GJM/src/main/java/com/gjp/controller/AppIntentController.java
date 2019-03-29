package com.gjp.controller;

import com.gjp.model.HouseIntention;
import com.gjp.model.UserCenterEmployee;
import com.gjp.service.HouseIntentionService;
import com.gjp.service.HousingAllocationService;
import com.gjp.service.UserCenterEmployeeService;
import com.gjp.util.AppUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author 陈智颖
 * @create 2017-12-05 11:32
 **/
@Controller
@RequestMapping("/appIntent")
public class AppIntentController {

    // 意向房源
    @Autowired
    private HouseIntentionService houseIntentionService;
    // 房屋基本
    @Autowired
    private HousingAllocationService housingAllocationService;
    // 内部人员
    @Autowired
    private UserCenterEmployeeService userCenterEmployeeService;

    /******** 移动端 **********/
    // 意向房源列表
    @RequestMapping("/appIntentionList")
    public String appIntentionList() {
        return "/appPage/intentionList";
    }

    // 录入意向房源
    @RequestMapping("/intentionListAdd")
    public String intentionListAdd() {
        return "/appPage/intentionListAdd";
    }

    // 查询意向房源
    @RequestMapping("/intentionSelect")
    public String intentionSelect() {
        return "/appPage/intentionSelect";
    }

    // 意向跟进界面
    @RequestMapping("/intentionFollowUp")
    public String intentionFollowUp() {
        return "/appPage/intentionFollowUp";
    }

    // 意向跟进
    @RequestMapping("/intentionFollowUp1")
    public String intentionFollowUp1() {
        return "/appPage/intentionFollowUp1";
    }

    // 意向实勘
    @RequestMapping("/intentionFollowUp2")
    public String intentionFollowUp2() {
        return "/appPage/intentionFollowUp2";
    }

    // 意向定价
    @RequestMapping("/intentionFollowUp3")
    public String intentionFollowUp3() {
        return "/appPage/intentionFollowUp3";
    }

    // 意向存房
    @RequestMapping("/intentionFollowUp4")
    public String intentionFollowUp4() {
        return "/appPage/intentionFollowUp4";
    }

    // 跟进记录添加
    @RequestMapping("/intentionFollowRecord")
    public String intentionFollowRecord() {
        return "/appPage/intentionFollowRecord";
    }

    /**********APP物业**********/
    @RequestMapping("/propertyInfoAPPPage")
    public String propertyInfoAPPPage(String name){
        return "/appPage/intentionPropertyInfoSelect";
    }

    /**
     * 查询意向房源
     *
     * @param response
     * @param pageNo 开始页数
     * @param pageSize 查询条数
     * @param where 搜索框
     * @param em_id 内部人员编码
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/appIntentionListData")
    @ResponseBody
    public Map<String, Object> appIntentionListData(HttpServletResponse response, Integer pageNo, Integer pageSize, String where, Integer em_id) {
        // 跨域传输json
        //response.addHeader("Access-Control-Allow-Origin", "*");
        Map<String, Object> map = new HashMap<String, Object>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");

        pageNo = (pageNo-1) * pageSize;
        HouseIntention houseIntention = new HouseIntention();
        houseIntention.setStart(pageNo);
        houseIntention.setEnd(pageSize);
        houseIntention.setHouse_address(where);
        List<HouseIntention> houseIntentionAPP = new ArrayList<>();
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_id(em_id);
        List<UserCenterEmployee> selectCompanyID = userCenterEmployeeService.selectCompanyID(userCenterEmployee);
        if (!selectCompanyID.isEmpty()) {
            if(selectCompanyID.get(0).getEm_phone().equals(selectCompanyID.get(0).getUcc_phone())){
                houseIntention.setUcc_id(selectCompanyID.get(0).getUcc_id());
            }else{
                houseIntention.setEm_id(em_id);
            }
        }else{
            houseIntention.setEm_id(em_id);
        }
        houseIntentionAPP = houseIntentionService.queryHouseIntentionAPP(houseIntention);
        for (HouseIntention houseIntention2 : houseIntentionAPP) {
            List<HouseIntention> queryHouseIntentionImageType = houseIntentionService.queryHouseIntentionImageType(houseIntention2);
            if (queryHouseIntentionImageType.isEmpty()) {
                houseIntention2.setHim_path("");
            } else {
                houseIntention2.setHim_path(queryHouseIntentionImageType.get(0).getHim_path());
            }
            houseIntention2.setPhi_typeColor(AppUtil.intentState(houseIntention2.getPhi_type()));
            houseIntention2.setPhi_new_addTime_str(sdf.format(houseIntention2.getPhi_new_addTime()));
            if(houseIntention2.getPhi_type().equals("完成")){
                houseIntention2.setPhi_type("存房成功");
            }
        }
        if(houseIntentionAPP.isEmpty()){
            map.put("code", 401);
            if(pageNo == 0){
                map.put("msg","数据为空");
            }else{
                map.put("msg","没有更多数据");
            }
        }else{
            map.put("code", 200);
            map.put("data", houseIntentionAPP);
        }

        return map;
    }

}
