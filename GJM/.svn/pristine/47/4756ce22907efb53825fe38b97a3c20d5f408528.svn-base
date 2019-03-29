package com.gjp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 页面跳转
 *
 * @author 陈智颖
 * @version 创建时间：2016年2月24日 上午11:29:46
 */
@Controller
public class NavigationPageController {

    /**
     * 跳转客户带看
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/customerSee")
    public String customerSee(HttpServletRequest request,
                              HttpServletResponse response) {
        return "/customerSee/customerSee";
    }

    /**
     * 跳转客户统计
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/customerStatistics")
    public String customerStatistics(HttpServletRequest request,
                                     HttpServletResponse response) {
        return "/customerSee/customerStatistics";
    }

    /**
     * 跳转客户添加
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/customerSeeAdd")
    public String customerSeeAdd(HttpServletRequest request,
                                 HttpServletResponse response) {
        return "/customerSee/customerSeeAdd";
    }

    /**
     * 跳转设置
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/customerSetings")
    public String customerSetings(HttpServletRequest request,
                                  HttpServletResponse response) {
        return "/customerSee/customerSetings";
    }

    /**
     * 部门统计
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/customerDepartment")
    public String customerDepartment(HttpServletRequest request, HttpServletResponse response) {
        return "/customerSee/customerDepartment";
    }

    /**
     * 业绩设置
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/achievementSetting")
    public String achievementSetting() {
        return "/achievement/setting";
    }

    /**
     * 部门总业绩统计
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/achievementHouse")
    public String achievementSum() {
        return "/achievement/achievementHouse";
    }

    /**
     * 房屋业绩统计
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/achievementHouseMoney")
    public String achievementHouseMoney() {
        return "/achievement/achievementHouseMoney";
    }


    /**
     * 票据打印
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/contractPrint")
    public String contractPrint() {
        return "/contract/contractPrint";
    }

}
