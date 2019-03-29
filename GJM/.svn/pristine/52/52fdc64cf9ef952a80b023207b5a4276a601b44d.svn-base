package com.gjp.controller;

import com.gjp.model.*;
import com.gjp.service.*;
import com.gjp.util.AppUtil;
import com.gjp.util.DataUtil;
import com.gjp.util.OSSparameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/appHouse")
public class AppHouseController {
    // 房屋基本
    @Resource
    private HousingAllocationService housingAllocationService;

    // 房屋图片
    @Resource
    private HouseImageService houseImageService;

    // 合同
    @Resource
    private ContractService userCenterContractObjectService;

    // 内部人员
    @Resource
    private UserCenterEmployeeService userCenterEmployeeService;

    // 带看信息
    @Resource
    private HouseSeeingService houseSeeingService;

    @Resource
    private CustomerService customerService;

    // 房屋
    @Autowired
    private HouseInformationService houseInformationService;

    /**
     * APP查询库存房屋列表，并进行分页
     *
     * @param pageNo       开始页数
     * @param pageSize     查询数
     * @param address      地址
     * @param state        状态
     * @param hi_isForRent 是否招租
     * @param hpr_newEmp   最新管家
     * @param houseType    房源类型
     * @param em_id        用户
     * @param hi_houseS    几房
     * @param advantage    房源优势
     * @param hi_area      区域
     * @param moneyStr     价格区间
     * @return
     * @throws Exception
     * @author 陈智颖
     * @date Apr 18, 2017 2:15:04 PM
     */
    @RequestMapping("/houseAPPList")
    @ResponseBody
    public Map<String, Object> houseAPPList(HttpServletRequest request, HttpServletResponse response, Integer pageNo, Integer pageSize, String address, Integer state, Integer hi_isForRent, Integer hpr_newEmp, String houseType, Integer em_id, String hi_houseS, String advantage, String hi_area, String moneyStr) throws Exception {

        // 跨域传输json
        //response.addHeader("Access-Control-Allow-Origin", "*");

        Map<String, Object> map = new HashMap<>();
        HouseInformationKeepVo houseInformationKeepVo = new HouseInformationKeepVo();
        houseInformationKeepVo.setHi_forRentState(state);
        pageNo = (pageNo - 1) * pageSize;
        houseInformationKeepVo.setStart(pageNo);
        houseInformationKeepVo.setEnd(pageSize);
        // 房源户型
        if (hi_houseS != null && !hi_houseS.equals("")) {
            String hi_houseSQL = "and (";
            String[] hi_houseSe = hi_houseS.split(",");
            for (int i = 0; i < hi_houseSe.length; i++) {
                if (i != 0) {
                    hi_houseSQL += " or ";
                }
                switch (hi_houseSe[i]) {
                    case "一房":
                        hi_houseSQL += "hi_houseS = " + 1;
                        break;
                    case "两房":
                        hi_houseSQL += "hi_houseS = " + 2;
                        break;
                    case "三房":
                        hi_houseSQL += "hi_houseS = " + 3;
                        break;
                    case "四房及以上":
                        hi_houseSQL += "hi_houseS > " + 4;
                        break;
                }
            }
            hi_houseSQL += ")";
            houseInformationKeepVo.setHi_houseSQL(hi_houseSQL);
        }
        if (advantage != null && !advantage.equals("")) {
            String hi_functions = "and (";
            String[] advantages = advantage.split(",");
            for (int i = 0; i < advantages.length; i++) {
                if (i != 0) {
                    hi_functions += " or ";
                }
                hi_functions += "hi_function like '%" + advantages[i] + "%'";
            }
            hi_functions += ")";
            houseInformationKeepVo.setHi_function(hi_functions);
        }

        houseInformationKeepVo.setHis_name(houseType);
        houseInformationKeepVo.setHi_area(hi_area);
        houseInformationKeepVo.setHi_address(address);
        houseInformationKeepVo.setHi_isForRent(hi_isForRent);
        houseInformationKeepVo.setHpr_newEmp(hpr_newEmp);
        // 价格区间
        String whereMoney = "";
        if (moneyStr != null && !moneyStr.equals("")) {
            if (moneyStr.indexOf("以下") > -1) {
                whereMoney = " and hi_price <= " + moneyStr.replaceAll("以下", "");
            } else if (moneyStr.indexOf("以上") > -1) {
                whereMoney = " and hi_price >= " + moneyStr.replaceAll("以上", "");
            } else {
                whereMoney = " and hi_price >= " + moneyStr.split("-")[0].replace("元","") + " and hi_price <= " + moneyStr.split("-")[1].replace("元","");
            }
        }
        houseInformationKeepVo.setMoneyStartEnd(whereMoney);
        List<HouseInformationKeepVo> queryAPPHouseList;
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_id(em_id);
        List<UserCenterEmployee> selectCompanyID = userCenterEmployeeService.selectCompanyID(userCenterEmployee);
        if (!selectCompanyID.isEmpty()) {
            if (selectCompanyID.get(0).getEm_phone().equals(selectCompanyID.get(0).getUcc_phone())) {
                houseInformationKeepVo.setUcc_id(selectCompanyID.get(0).getUcc_id());
                queryAPPHouseList = housingAllocationService.queryAPPHouseListDepartment(houseInformationKeepVo);
            } else {
                houseInformationKeepVo.setEm_id(em_id);
                queryAPPHouseList = housingAllocationService.queryAPPHouseList(houseInformationKeepVo);
            }
        } else {
            houseInformationKeepVo.setEm_id(em_id);
            queryAPPHouseList = housingAllocationService.queryAPPHouseList(houseInformationKeepVo);
        }
        for (HouseInformationKeepVo informationKeepVo : queryAPPHouseList) {
            informationKeepVo.setHi_money(informationKeepVo.getHi_price());
            if (informationKeepVo.getHis_name().equals("整租")) {
                informationKeepVo.setHis_nameColor("#FF6666");
                informationKeepVo.setHis_name("整");
            } else if (informationKeepVo.getHis_name().equals("合租")) {
                informationKeepVo.setHis_nameColor("#02D49F");
                informationKeepVo.setHis_name("合");
            }
            Map<String, String> stateStr = AppUtil.ForRentState(informationKeepVo.getHi_forRentState());
            informationKeepVo.setHi_forRentStateStr(stateStr.get("stateStr"));
            informationKeepVo.setHi_forRentStateColor(stateStr.get("stateColor"));
            if (informationKeepVo.getHm_path() != null) {
                String imagePath = OSSparameter.imagePath(informationKeepVo.getHm_path(), null, null);
                informationKeepVo.setHm_path(imagePath);
            }
        }
        if (queryAPPHouseList.isEmpty()) {
            map.put("code", 401);
            if (pageNo == 1) {
                map.put("msg", "数据为空");
            } else {
                map.put("msg", "没有更多数据");
            }
        } else {
            map.put("code", 200);
            map.put("data", queryAPPHouseList);
        }

        return map;
    }

    /**
     * APP根据房屋编码查询房屋
     *
     * @param code 房屋编码
     * @return
     * @throws Exception
     * @author 陈智颖
     */
    @RequestMapping("/houseAPPCode")
    @ResponseBody
    public Map<String, Object> houseAPPCode(HttpServletRequest request, HttpServletResponse response, String code) throws Exception {

        Map<String, Object> map = new HashMap<>();
        HouseInformationKeepVo houseInformationKeepVo = new HouseInformationKeepVo();
        houseInformationKeepVo.setHi_code(code);
        houseInformationKeepVo = housingAllocationService.queryAPPHouseListCode(houseInformationKeepVo);
        if (houseInformationKeepVo == null) {
            map.put("code", "0");
            return map;
        }

        HouseSeeing houseSeeing = new HouseSeeing();
        houseSeeing.setHi_code(code);
        List<HouseSeeing> houseSeeingList = houseSeeingService.queryHouseSeeingList(houseSeeing);

        HouseImageVo houseLibraryImageVo = new HouseImageVo();
        houseLibraryImageVo.setHi_code(houseInformationKeepVo.getHi_code());
        List<HouseImageVo> houseImageVos = houseImageService.queryHouseImageList(houseLibraryImageVo);
        for (HouseImageVo houseImageVo : houseImageVos) {
            houseImageVo.setHm_path(OSSparameter.imagePath(houseImageVo.getHm_path(), null, null));
        }

        // 房屋配置
        if (houseInformationKeepVo.getConim_id() != null) {
            String[] conims = houseInformationKeepVo.getConim_id().split(",");
            List<Facility> facilitys = new ArrayList<>();
            for (String str : conims) {
                Facility facility = new Facility();
                facility.setConim_id(Integer.valueOf(str));
                Facility facility1 = housingAllocationService.queryHouseInformationFacility(facility).get(0);
                String conim_path = facility1.getConim_path();
                if (null != conim_path) {
                    facility1.setConim_path(OSSparameter.imagePath(conim_path, null, null));
                }
                facilitys.add(facility1);
            }
            map.put("facilitys", facilitys);
        } else {
            map.put("facilitys", "");
        }

        map.put("houseInformationKeepVo", houseInformationKeepVo);
        map.put("houseSeeingList", houseSeeingList);
        map.put("queryAllHouseImageTypeX", houseImageVos);

        return map;
    }

    /**
     * APP查询库存房屋列表，并进行分页
     *
     * @param code 房屋编码
     * @return
     * @throws UnsupportedEncodingException
     * @author 陈智颖
     */
    @RequestMapping("/houseContract")
    @ResponseBody
    public Map<String, Object> houseContract(HttpServletRequest request, HttpServletResponse response, String code, String type) throws UnsupportedEncodingException {
        // 跨域传输json
        response.addHeader("Access-Control-Allow-Origin", "*");
        Map<String, Object> map = new HashMap<>();
        ViewBusinessContractVo houseInformationKeepVo = new ViewBusinessContractVo();
        houseInformationKeepVo.setContractObject_Type(type);
        houseInformationKeepVo.setHi_code(code);
        ViewBusinessContractVo viewBusinessContractVo = userCenterContractObjectService.queryAPPContract(houseInformationKeepVo);
        if (viewBusinessContractVo == null) {
            map.put("error", "0");
            return map;
        }
        if (type.equals("租赁合同")) {
            Date startPayTime = viewBusinessContractVo.getContractBody_StartPayTime();
            Calendar cal = Calendar.getInstance();
            cal.setTime(startPayTime);
            if ("月付".equals(viewBusinessContractVo.getContractBody_PayStyle())) {
                cal.add(Calendar.DATE, -7);
            } else {
                cal.add(Calendar.DATE, -15);
            }
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd");
            viewBusinessContractVo.setYdhkDate(simpleDateFormat.format(cal.getTime()));
        }
        ViewBusinessContractRelaEmpVo contractRelaEmpVo = new ViewBusinessContractRelaEmpVo();
        contractRelaEmpVo.setContractObject_No(viewBusinessContractVo.getContractObject_No());
        List<ViewBusinessContractRelaEmpVo> contractRelaEmp = userCenterContractObjectService.queryViewContractRelaEmp(contractRelaEmpVo);
        map.put("viewBusinessContractVo", viewBusinessContractVo);
        map.put("contractRelaEmp", contractRelaEmp);

        return map;
    }

    /**
     * 记录点击查看房东信息日志
     *
     * @return
     */
    @RequestMapping("/saveClickLandlordLog")
    @ResponseBody
    public Map<String, Object> saveClickLandlordLog(LandlordSeeLog landlordSeeLog) {
        Map<String, Object> msg = new HashMap<>();

        // 查询该管家查看不属于自己管理下房源房东信息的次数
        LandlordSeeLog seeLogParam = new LandlordSeeLog();
        seeLogParam.setEm_id(landlordSeeLog.getEm_id());
        seeLogParam.setClickDate(DataUtil.DateToStrs(new Date()));
        seeLogParam.setIs_owen(0);
        List<LandlordSeeLog> curDaySeeLogList = housingAllocationService.queryLandlordSeeLogCountByEmId(seeLogParam);
        if (null != curDaySeeLogList && !curDaySeeLogList.isEmpty() && curDaySeeLogList.size() > 5) {
            msg.put("error", "当日查看次数已达上限，请明日查看。");
        } else {

            // 保存
            landlordSeeLog.setCc_code(customerService.queryCustomerByPhone(landlordSeeLog.getHe_phone()).getCc_code());
            landlordSeeLog.setClickTime(new Date());
            housingAllocationService.addLandlordSeeLog(landlordSeeLog);
        }
        return msg;
    }

    /**
     * 客户带看订单
     * */
    @RequestMapping("/houseSeeingOrder")
    public String houseSeeingOrder(String json){
        System.out.println(json);
        return "appPage/houseSeeingOrder";
    }

    /**
     * 地图搜房
     *
     * @param
     * @return
     * @author 陈智颖
     * @create 8/18/17 11:43 AM
     **/
    @RequestMapping("/houseMapList")
    @ResponseBody
    public Map<String, Object> houseMapList(HouseMapWhere houseMapWhere) {
        Map<String, Object> map = new HashMap<>();

        if (houseMapWhere.getHi_money() != null && !houseMapWhere.getHi_money().equals("")) {
            String moneys = houseMapWhere.getHi_money();
            if (moneys.contains("以下")) {
                houseMapWhere.setMoneyStart(0.0);
                houseMapWhere.setMoneyEnd(Double.valueOf(moneys.split("元")[0]));
            } else if (moneys.contains("以上")) {
                houseMapWhere.setMoneyStart(Double.valueOf(moneys.split("元")[0]));
            } else {
                houseMapWhere.setMoneyStart(Double.valueOf(moneys.split("-")[0]));
                houseMapWhere.setMoneyEnd(Double.valueOf(moneys.split("-")[1]));
            }
        }
        if (houseMapWhere.getHi_moneyAscDesc() == null || houseMapWhere.getHi_moneyAscDesc().equals("") || houseMapWhere.getHi_moneyAscDesc().equals("由低到高")) {
            houseMapWhere.setHi_moneyAscDesc("asc");
        } else if (houseMapWhere.getHi_moneyAscDesc().equals("由高到低")) {
            houseMapWhere.setHi_moneyAscDesc("desc");
        }

        List<HouseMapList> houseMapLists = houseInformationService.queryHouseMapList(houseMapWhere);
        for (HouseMapList houseMapList : houseMapLists) {
            if (houseMapList.getPropertyInfo_coordinate() == null || houseMapList.getPropertyInfo_coordinate().equals("")) {
                houseMapList.setPropertyInfo_coordinate("106.568593,29.525191");
            }
            if (houseMapList.getUpn_sid() != 0 && houseMapList.getUpn_sid() != null) {
                houseMapList.setUpn_id(houseMapList.getUpn_sid());
            }
        }
        if (houseMapLists.isEmpty()) {
            map.put("code", 401);
        } else {
            map.put("code", 200);
            map.put("data", houseMapLists);
            int size = 0;
            for (HouseMapList houseMapList : houseMapLists) {
                size += Integer.valueOf(houseMapList.getHouseSum());
            }
            map.put("size", size);
        }
        return map;
    }

    /**
     * 地图搜房房源列表
     *
     * @return
     * @throws Exception
     * @author 陈智颖
     * @date Jun 8, 2017 11:26:26 AM
     */
    @RequestMapping("/mapHouseList")
    @ResponseBody
    public Map<String, Object> mapHouseList(HouseMapWhere houseMapWhere) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Map<String, Object> map = new HashMap<>();
        if (houseMapWhere.getHi_money() != null && !houseMapWhere.getHi_money().equals("")) {
            String moneys = houseMapWhere.getHi_money();
            if (moneys.contains("以下")) {
                houseMapWhere.setMoneyStart(0.0);
                houseMapWhere.setMoneyEnd(Double.valueOf(moneys.split("元")[0]));
            } else if (moneys.contains("以上")) {
                houseMapWhere.setMoneyStart(Double.valueOf(moneys.split("元")[0]));
            } else {
                houseMapWhere.setMoneyStart(Double.valueOf(moneys.split("-")[0]));
                houseMapWhere.setMoneyEnd(Double.valueOf(moneys.split("-")[1]));
            }
        }
        List<HouseInformation> houseList = houseInformationService.queryHouseInformationMap(houseMapWhere);
        for (HouseInformation houseInformation2 : houseList) {
            houseInformation2.setHi_newDate(sdf.format(houseInformation2.getHi_date()));
        }
        if (houseList.isEmpty()) {
            map.put("code", 401);
        } else {
            map.put("code", 200);
            map.put("upn_sname", houseList.get(0).getUpn_sname());
            map.put("size", houseList.size());
            map.put("data", houseList);
        }
        return map;
    }

}
