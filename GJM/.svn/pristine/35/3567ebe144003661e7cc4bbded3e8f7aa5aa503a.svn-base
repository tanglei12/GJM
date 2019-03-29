package com.gjp.controller;

import com.gjp.model.*;
import com.gjp.service.HoseRecommendGroupService;
import com.gjp.service.HouseHouseBrandService;
import com.gjp.util.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 房屋品牌
 *
 * @author zoe
 */
@Controller
@RequestMapping("/houseHouseBrand")
public class HouseBrandController {

    // 房屋品牌
    @Resource
    private HouseHouseBrandService houseHouseBrandService;
    // 适合推荐群体
    @Resource
    private HoseRecommendGroupService hoseRecommendGroupService;

    /**
     * 跳转房屋品牌界面
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/houseHouseBrand")
    public String houseHouseBrand(HttpServletRequest request, HttpServletResponse response) {
        return "/houseHouseBrand/houseHouseBrand";
    }

    /**
     * 跳转添加房屋品牌界面
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/jumpAddHouseHouseBrand")
    public String jumpAddHouseHouseBrand(HttpServletRequest request,
                                         HttpServletResponse response) {
        //在导向编辑页面时，向request和session域中添加uuid随机数
        UUIDToken.generateUUIDToken(request);

        return "/houseHouseBrand/addHouseHouseBrand";
    }

    /**
     * 跳转修改房屋品牌界面 jumpAddHouseHouseBrand
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/updata")
    public String jumpAddHouseHouseBrand(HttpServletRequest request,
                                         HttpServletResponse response, String id) {
        //在导向编辑页面时，向request和session域中添加uuid随机数
        UUIDToken.generateUUIDToken(request);
        int ids = Integer.parseInt(id);
        // 传回编号
        request.setAttribute("id", ids);
        return "/houseHouseBrand/updataHouseHouseBrand";
    }

    /**
     * 添加房屋品牌
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/addHouseHouseBrand")
    public String addHouseHouseBrand(HouseHouseBrand houseHouseBrand,
                                     Model model, HttpServletRequest request,
                                     HttpServletResponse response, String area, String track,
                                     String address, String district, String minArea, String maxArea,
                                     String money, String minMoney, String maxMoney,
                                     String recommendGroup_Id) {

        //判断是否重复提交
        if (!UUIDToken.isRepeatSubmit(request)) {
            // 添加修改时间
            houseHouseBrand.setHb_time(new Date());
            //添加房屋品牌
            int result = houseHouseBrandService.addHouseBrand(houseHouseBrand);
            //加入固定品牌条件
            List<String> bw_names = new ArrayList<String>();
            bw_names.add("区域");
            bw_names.add("商圈");
            bw_names.add("轨道");
            bw_names.add("租金");
            bw_names.add("面积");
            bw_names.add("人群");
            for (String string: bw_names) {
                // 添加房屋品牌条件
                HouseBrandWhere houseBrandWhere = new HouseBrandWhere();
                houseBrandWhere.setBw_name(string);
                houseBrandWhere.setBw_time(new Date());
                houseBrandWhere.setHb_id(houseHouseBrand.getHb_id());
                houseHouseBrandService.addHouseBrandWhere(houseBrandWhere);
                if ("区域".equals(string)) {
                    addExt(address, houseBrandWhere.getBw_id());
                }

                if ("商圈".equals(string)) {
                    addExt(district, houseBrandWhere.getBw_id());
                }

                if ("轨道".equals(string)) {
                    addExt(track, houseBrandWhere.getBw_id());
                }

                if ("人群".equals(string)) {
                    addExt(recommendGroup_Id, houseBrandWhere.getBw_id());
                }

                if ("租金".equals(string)) {
                    String moneys = minMoney + "元以下,";
                    int money1 = Integer.parseInt(money);
                    int maxMoney1 = Integer.parseInt(maxMoney);
                    int minMoney1 = Integer.parseInt(minMoney);
                    for (int c = 1; c > 0; c++) {
                        if (minMoney1 + money1 < maxMoney1) {
                            moneys += minMoney1 + "~" + (minMoney1 + money1) + "元,";
                            minMoney1 = minMoney1 + money1;
                        } else {
                            moneys += minMoney1 + "~" + maxMoney1 + "元," + maxMoney1 + "元以上";
                            c = -1;
                        }
                    }
                    addExt(moneys, houseBrandWhere.getBw_id());
                }

                if ("面积".equals(string)) {
                    String areas = minArea + "㎡以下,";
                    int area1 = Integer.parseInt(area);
                    int maxArea1 = Integer.parseInt(maxArea);
                    int minArea1 = Integer.parseInt(minArea);
                    for (int c = 1; c > 0; c++) {
                        if (minArea1 + area1 < maxArea1) {
                            areas += minArea1 + "~" + (minArea1 + area1) + "㎡,";
                            minArea1 = minArea1 + area1;
                        } else {
                            areas += minArea1 + "~" + maxArea1 + "㎡," + maxArea1 + "㎡以上";
                            c = -1;
                        }
                    }
                    addExt(areas, houseBrandWhere.getBw_id());
                }

            }
            if (result != 0) {
                request.setAttribute("success", "$.jBox.tip('添加房屋品牌信息成功');");
            } else {
                request.setAttribute("error", "$.jBox.tip('添加房屋品牌信息失败');");
            }
        } else {
            return "/houseHouseBrand/houseHouseBrand";
        }

        request.getSession().removeAttribute("token");//移除session中的token

        return "/houseHouseBrand/houseHouseBrand";
    }

    /**
     * ajax查询房屋品牌List
     *
     * @param response
     * @return
     * @throws ParseException
     */
    @RequestMapping("/selectHouseHouseBrand")
    @ResponseBody
    public Map<String, Object> selectHouseHouseBrand(
            HttpServletResponse response, TableList tableList1) throws ParseException {
        //初始化获取对象
        TableList tableList = tableList1.initData(tableList1);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

        PageModel<HouseHouseBrand> pageModel1 = new PageModel<HouseHouseBrand>();

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
        DataList<HouseHouseBrand> datalist = new DataList<HouseHouseBrand>();
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        pageModel1.setPageNo((tableList.getPageNo() - 1) * pageSize);
        // 分页设置查询条数
        pageModel1.setPageSize(pageSize);
        // 查询分页实体
        PageModel<HouseHouseBrand> pageModel = houseHouseBrandService.selectHouseHouseBrand(pageModel1);
        // 装载数据
        Map<String, Object> map = datalist.dataList(pageModel.getList(), tableList.getPageNo(), pageSize, pageModel.getTotalRecords(), pageModel.getSumMoney());
        return map;
    }

    /**
     * ajax修改前查询房屋品牌
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/selectHouseHouseBrandById")
    @ResponseBody
    public Map<String, Object> selectHouseHouseBrandById(
            HttpServletRequest request, HttpServletResponse response, String id) {
        int hb_id = Integer.parseInt(id);
        //根据编号查询房屋品牌
        HouseHouseBrand houseHouseBrand = houseHouseBrandService
                .selectHouseHouseBrandById(hb_id);
        //查询品牌条件
        int minMoney = 0;
        int maxMoney = 0;
        int money = 0;
        int minArea = 0;
        int maxArea = 0;
        int area = 0;
        String recommendGroups = "";
        //根据品牌编号查询品牌条件List
        List<HouseBrandWhere> houseBrandWhereList = houseHouseBrandService.selectBrandWhere(hb_id);
        for (HouseBrandWhere houseBrandWhere: houseBrandWhereList) {
            if ("租金".equals(houseBrandWhere.getBw_name())) {
                //查询品牌条件扩展
                List<HouseBrandWhereExtended> houseBrandWhereExtendedList = houseHouseBrandService.selectHouseBrandWhereExtended(houseBrandWhere.getBw_id());
                for (HouseBrandWhereExtended houseBrandWhereExtended: houseBrandWhereExtendedList) {
                    //取出最高租金
                    if (houseBrandWhereExtended.getBwe_name().indexOf("元以上") != -1) {
                        houseBrandWhereExtended.setBwe_name(houseBrandWhereExtended.getBwe_name().replaceAll("元以上", ""));
                        maxMoney = Integer.parseInt(houseBrandWhereExtended.getBwe_name());
                    }
                    //取出最低租金
                    if (houseBrandWhereExtended.getBwe_name().indexOf("元以下") != -1) {
                        houseBrandWhereExtended.setBwe_name(houseBrandWhereExtended.getBwe_name().replaceAll("元以下", ""));
                        minMoney = Integer.parseInt(houseBrandWhereExtended.getBwe_name());
                    }
                    //取出租金间隔
                    if (houseBrandWhereExtended.getBwe_name().indexOf("~") != -1) {
                        houseBrandWhereExtended.setBwe_name(houseBrandWhereExtended.getBwe_name().replaceAll("元", ""));
                        String[] mon = houseBrandWhereExtended.getBwe_name().split("~");
                        int min = Integer.parseInt(mon[0]);
                        int max = Integer.parseInt(mon[1]);
                        if (money == 0) {
                            money = max - min;
                        }
                    }

                }
            }
            if ("面积".equals(houseBrandWhere.getBw_name())) {
                //查询品牌条件扩展
                List<HouseBrandWhereExtended> houseBrandWhereExtendedList = houseHouseBrandService.selectHouseBrandWhereExtended(houseBrandWhere.getBw_id());
                for (HouseBrandWhereExtended houseBrandWhereExtended: houseBrandWhereExtendedList) {
                    //取出最大面积
                    if (houseBrandWhereExtended.getBwe_name().indexOf("㎡以上") != -1) {
                        houseBrandWhereExtended.setBwe_name(houseBrandWhereExtended.getBwe_name().replaceAll("㎡以上", ""));
                        maxArea = Integer.parseInt(houseBrandWhereExtended.getBwe_name());
                    }
                    //取出最小面积
                    if (houseBrandWhereExtended.getBwe_name().indexOf("㎡以下") != -1) {
                        houseBrandWhereExtended.setBwe_name(houseBrandWhereExtended.getBwe_name().replaceAll("㎡以下", ""));
                        minArea = Integer.parseInt(houseBrandWhereExtended.getBwe_name());
                    }
                    //取出面积间隔
                    if (houseBrandWhereExtended.getBwe_name().indexOf("~") != -1) {
                        houseBrandWhereExtended.setBwe_name(houseBrandWhereExtended.getBwe_name().replaceAll("㎡", ""));
                        String[] mon = houseBrandWhereExtended.getBwe_name().split("~");
                        int min = Integer.parseInt(mon[0]);
                        int max = Integer.parseInt(mon[1]);
                        if (area == 0) {
                            area = max - min;
                        }
                    }
                }
            }
            if ("人群".equals(houseBrandWhere.getBw_name())) {
                //查询品牌条件扩展人群
                List<HouseBrandWhereExtended> houseBrandWhereExtendedList = houseHouseBrandService.selectHouseBrandWhereExtended(houseBrandWhere.getBw_id());
                for (HouseBrandWhereExtended houseBrandWhereExtended: houseBrandWhereExtendedList) {
                    recommendGroups += houseBrandWhereExtended.getBwe_name() + ",";
                }
            }
        }
        // 适合推荐群体List
        List<HoseRecommendGroup> hoseRecommendGroupList = hoseRecommendGroupService
                .selectHoseRecommendGroupList();
        Map<String, Object> map = new HashMap<>();
        map.put("hoseRecommendGroupList", hoseRecommendGroupList);
        map.put("houseHouseBrand", houseHouseBrand);
        map.put("maxArea", maxArea);
        map.put("minArea", minArea);
        map.put("minMoney", minMoney);
        map.put("maxMoney", maxMoney);
        map.put("money", money);
        map.put("recommendGroups", recommendGroups);
        map.put("area", area);
        return map;
    }

    /**
     * ajax查询推荐群体
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/selectRecommendGroup")
    @ResponseBody
    public Map<String, Object> selectRecommendGroup(HttpServletRequest request,
                                                    HttpServletResponse response) {
        // 适合推荐群体List
        List<HoseRecommendGroup> hoseRecommendGroupList = hoseRecommendGroupService
                .selectHoseRecommendGroupList();
        Map<String, Object> map = new HashMap<>();
        map.put("hoseRecommendGroupList", hoseRecommendGroupList);
        return map;
    }

    /**
     * ajax添加公寓类型
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/addBrandType")
    @ResponseBody
    public Map<String, Object> addBrandType(HttpServletRequest request,
                                            HttpServletResponse response, String str) {
        ApartmentType apartmentType = new ApartmentType();
        apartmentType.setHt_parentId(207);
        apartmentType.setHt_name(str);
        apartmentType.setHt_value(this
                .getTheFirstLetter());

        int i = houseHouseBrandService.addBrandType(apartmentType);
        Map<String, Object> map = new HashMap<>();
        map.put("result", i);
        return map;
    }

    /**
     * 修改房屋品牌
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/updataInfo")
    public String updataInfo(HouseHouseBrand houseHouseBrand, Model model,
                             HttpServletRequest request, HttpServletResponse response, String area, String track,
                             String address, String district, String minArea, String maxArea,
                             String money, String minMoney, String maxMoney,
                             String recommendGroup_Id) {
        //判断是否重复提交
        if (!UUIDToken.isRepeatSubmit(request)) {
            //查询品牌条件
            List<HouseBrandWhere> houseBrandWhereList = houseHouseBrandService.selectBrandWhere(houseHouseBrand.getHb_id());
            for (HouseBrandWhere houseBrandWhere: houseBrandWhereList) {
                if ("租金".equals(houseBrandWhere.getBw_name())) {
                    //根据品牌条件编号删除品牌条件扩展
                    houseHouseBrandService.deleteHouseBrandWhereExtended(houseBrandWhere.getBw_id());
                    String moneys = minMoney + "元以下,";
                    int money1 = Integer.parseInt(money);
                    int maxMoney1 = Integer.parseInt(maxMoney);
                    int minMoney1 = Integer.parseInt(minMoney);
                    for (int c = 1; c > 0; c++) {
                        if (minMoney1 + money1 < maxMoney1) {
                            moneys += minMoney1 + "~" + (minMoney1 + money1) + "元,";
                            minMoney1 = minMoney1 + money1;
                        } else {
                            moneys += minMoney1 + "~" + maxMoney1 + "元," + maxMoney1 + "元以上";
                            c = -1;
                        }
                    }
                    addExt(moneys, houseBrandWhere.getBw_id());
                }
                if ("面积".equals(houseBrandWhere.getBw_name())) {
                    //根据品牌条件编号删除品牌条件扩展
                    houseHouseBrandService.deleteHouseBrandWhereExtended(houseBrandWhere.getBw_id());
                    String areas = minArea + "㎡以下,";
                    int area1 = Integer.parseInt(area);
                    int maxArea1 = Integer.parseInt(maxArea);
                    int minArea1 = Integer.parseInt(minArea);
                    for (int c = 1; c > 0; c++) {
                        if (minArea1 + area1 < maxArea1) {
                            areas += minArea1 + "~" + (minArea1 + area1) + "㎡,";
                            minArea1 = minArea1 + area1;
                        } else {
                            areas += minArea1 + "~" + maxArea1 + "㎡," + maxArea1 + "㎡以上";
                            c = -1;
                        }
                    }
                    addExt(areas, houseBrandWhere.getBw_id());
                }
                if ("人群".equals(houseBrandWhere.getBw_name())) {
                    //根据品牌条件编号删除品牌条件扩展
                    houseHouseBrandService.deleteHouseBrandWhereExtended(houseBrandWhere.getBw_id());
                    addExt(recommendGroup_Id, houseBrandWhere.getBw_id());
                }
            }
            int result = houseHouseBrandService.updataInfo(houseHouseBrand);

            if (result != 0) {
                request.setAttribute("success", "$.jBox.tip('修改房屋品牌信息成功');");
            } else {
                request.setAttribute("error", "$.jBox.tip('修改房屋品牌信息失败');");
            }
        } else {
            return "/houseHouseBrand/houseHouseBrand";
        }

        request.getSession().removeAttribute("token");//移除session中的token

        return "/houseHouseBrand/houseHouseBrand";
    }

    /**
     * ajax查询房屋品牌List
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/selectBrand")
    @ResponseBody
    public Map<String, Object> selectBrand(HttpServletRequest request,
                                           HttpServletResponse response) {
        List<HouseHouseBrand> houseHouseBrand = houseHouseBrandService
                .selectHouseHouseBrandList();
        Map<String, Object> map = new HashMap<>();
        map.put("houseHouseBrand", houseHouseBrand);
        return map;
    }

    /**
     * 添加品牌拓展信息
     *
     * @param names
     * @param bw_id
     */
    public void addExt(String names, Integer bw_id) {
        String[] name = names.split(",");
        int i = 1;
        for (String string2: name) {
            if (!"".equals(string2)) {
                HouseBrandWhereExtended houseBrandWhereExtended = new HouseBrandWhereExtended();
                houseBrandWhereExtended.setBw_id(bw_id);
                houseBrandWhereExtended.setBwe_name(string2);
                houseBrandWhereExtended.setBwe_num(i);
                // 添加品牌条件扩展
                houseHouseBrandService
                        .addHouseBrandWhereExtended(houseBrandWhereExtended);
                i++;
            }
        }
    }

    /**
     * 随机生成房屋代码 标识房屋唯一性的编码，非主键
     *
     * @return
     */
    public String getTheFirstLetter() {
        StringBuilder str = new StringBuilder();
        GetTheFirstLetter getTheFirstLetter = new GetTheFirstLetter();
        str.append("CQ");
        String area = "九龙坡".substring(0, 1);
        str.append(getTheFirstLetter.String2Alpha(area));
        String date = new Date().getTime() + "";
        str.append(date);
        str.append(Randoms.random());
        return str.toString();
    }
}
