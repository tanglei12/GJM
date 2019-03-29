package com.gjp.controller;

import com.gjp.model.*;
import com.gjp.service.*;
import com.gjp.util.AppConfig;
import com.gjp.util.AppException;
import com.gjp.util.AppUtil;
import com.gjp.util.Msg;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 房屋定价
 *
 * @author chen
 * @date Dec 21, 2016 3:30:58 PM
 */
@Controller
@RequestMapping("/housePrice")
public class HousePriceController {

    @Resource
    private PriceSettingService priceSettingService;
    @Resource
    private ContractService contractService;
    // 房源库service
    @Resource
    private HouseLibraryService houseLibraryService;
    // 业绩类
    @Resource
    private AchievementCompanyService achievementCompanyService;
    // 组织权限
    @Resource
    private AuthorizationService authorizationService;
    // 意向房源
    @Resource
    private HouseIntentionService houseIntentionService;

    /**
     * 页面跳转
     *
     * @return
     * @author chen
     * @date Dec 23, 2016 9:45:03 AM
     */
    @RequestMapping("/priceSetting")
    public String priceSetting() {
        return "/housePrice/setting";
    }

    /**
     * 特价房源
     *
     * @return
     * @author chen
     * @date Dec 23, 2016 9:45:03 AM
     */
    @RequestMapping("/houseInfoListPrice")
    public String houseInfoListPrice() {
        return "/library/houseInfoListPrice";
    }

    /**
     * 房屋特价页面跳转
     *
     * @return
     * @author chen
     * @date Dec 23, 2016 9:45:03 AM
     */
    @RequestMapping("/settingHouseAcitve")
    public String settingHouseAcitve() {
        return "/housePrice/houseActive";
    }

    /**
     * 插入定价设置
     *
     * @param priceSetting
     * @return
     * @author chen
     * @date Dec 23, 2016 9:51:39 AM
     */
    @RequestMapping("/addSetting")
    @ResponseBody
    public Map<String, Object> addSetting(PriceSetting priceSetting) {
        Map<String, Object> map = new HashMap<>();
        priceSetting.setPs_date(new Date());
        Integer bools = priceSettingService.insertSetting(priceSetting);
        if (bools > 0) {
            map.put("message", "success");
            map.put("ps_id", priceSetting.getPs_id());
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 查询页面数据
     *
     * @return
     * @author chen
     * @date Dec 23, 2016 9:59:15 AM
     */
    @RequestMapping("/selectSetting")
    @ResponseBody
    public Map<String, Object> selectSetting() {
        Map<String, Object> map = new HashMap<>();
        List<PriceSetting> setting = priceSettingService.selectSettingAll();
        map.put("setting", setting);
        return map;
    }

    /**
     * 查询房屋特价数据
     *
     * @return
     * @author chen
     * @date Jan 8, 2017 10:22:47 AM
     */
    @RequestMapping("/selectHouseActive")
    @ResponseBody
    public Map<String, Object> selectHouseActive() {
        Map<String, Object> map = new HashMap<>();
        List<PriceSettingType> priceSettingType = priceSettingService.selectPriceSettingTypeAll();
        map.put("priceSettingType", priceSettingType);
        return map;
    }

    /**
     * 根据编码查询特价房源
     *
     * @return
     * @author chen
     * @date Jan 8, 2017 5:36:10 PM
     */
    @RequestMapping("/selectHouseId")
    @ResponseBody
    public Map<String, Object> selectHouseId(Integer pst_id) {
        Map<String, Object> map = new HashMap<>();
        PriceSettingType priceSettingType = new PriceSettingType();
        priceSettingType.setPst_id(pst_id);
        List<PriceSettingType> priceSettingTypes = priceSettingService.selectPriceSettingTypeWhere(priceSettingType);
        map.put("priceSettingType", priceSettingTypes);
        return map;
    }

    /**
     * 删除定价策略设置
     *
     * @param ps_id
     * @return
     * @author chen
     * @date Dec 23, 2016 10:25:19 AM
     */
    @RequestMapping("/deleteSetting")
    @ResponseBody
    public Map<String, Object> deleteSetting(Integer ps_id) {
        Map<String, Object> map = new HashMap<>();
        PriceSetting priceSetting = new PriceSetting();
        priceSetting.setPs_id(ps_id);
        Integer bools = priceSettingService.deleteSetting(priceSetting);
        if (bools > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 插入定价类型
     *
     * @param priceSettingType
     * @return
     * @author chen
     * @date Dec 23, 2016 10:46:34 AM
     */
    @RequestMapping("/addSettingType")
    @ResponseBody
    public Map<String, Object> addSettingType(PriceSettingType priceSettingType) {
        Map<String, Object> map = new HashMap<>();
        priceSettingType.setPst_date(new Date());
        priceSettingType.setPst_bool(1);
        Integer bools = 0;
        if (priceSettingType.getPst_id() == null) {
            bools = priceSettingService.insertPriceSettingType(priceSettingType);
        } else {
            bools = priceSettingService.updatePriceSettingType(priceSettingType);
        }
        if (bools > 0) {
            map.put("message", "success");
            map.put("pst_id", priceSettingType.getPst_id());
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 根据编码删除房源活动
     *
     * @param pst_id 房源活动编码
     * @return
     * @author chen
     * @date Dec 23, 2016 11:11:30 AM
     */
    @RequestMapping("/delSettingType")
    @ResponseBody
    public Map<String, Object> delSettingType(Integer pst_id) {
        Map<String, Object> map = new HashMap<>();
        PriceSettingType priceSettingType = new PriceSettingType();
        priceSettingType.setPst_id(pst_id);
        Integer bools = priceSettingService.deletePriceSettingType(priceSettingType);
        if (bools > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 插入定价类型详情
     *
     * @return
     * @author chen
     * @date Dec 23, 2016 2:20:26 PM
     */
    @RequestMapping("/addSettingTypeContent")
    @ResponseBody
    public Map<String, Object> addSettingTypeContent(PriceSettingContent priceSettingContent) {
        Map<String, Object> map = new HashMap<>();
        priceSettingContent.setPsc_date(new Date());
        Integer bools = priceSettingService.insertPriceSettingContent(priceSettingContent);
        if (bools > 0) {
            map.put("message", "success");
            map.put("psc_id", priceSettingContent.getPsc_id());
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 根据id查询定价类型详情
     *
     * @param pst_id 定价类型详情编码
     * @return
     * @author chen
     * @date Dec 23, 2016 3:31:20 PM
     */
    @RequestMapping("/selectSettingTypeContent")
    @ResponseBody
    public Map<String, Object> selectSettingTypeContent(Integer pst_id) {
        Map<String, Object> map = new HashMap<>();
        PriceSettingContent priceSettingContent = new PriceSettingContent();
        priceSettingContent.setPst_id(pst_id);
        List<PriceSettingContent> priceSettingContentList = priceSettingService.selectPriceSettingContentWhere(priceSettingContent);
        map.put("priceSettingContentList", priceSettingContentList);
        return map;
    }

    /**
     * 根据编码删除定价类型详情
     *
     * @param psc_id
     * @return
     * @author chen
     * @date Dec 23, 2016 3:51:38 PM
     */
    @RequestMapping("/delSettingTypeContent")
    @ResponseBody
    public Map<String, Object> delSettingTypeContent(Integer psc_id) {
        Map<String, Object> map = new HashMap<>();
        PriceSettingContent priceSettingContent = new PriceSettingContent();
        priceSettingContent.setPsc_id(psc_id);
        Integer bools = priceSettingService.deletePriceSettingContent(priceSettingContent);
        if (bools > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 根据编码修改房源活动状态
     *
     * @return
     * @author chen
     * @date Dec 23, 2016 4:09:32 PM
     */
    @RequestMapping("/updatePriceSettingTypeBools")
    @ResponseBody
    public Map<String, Object> updatePriceSettingTypeBools(Integer pst_id, Integer pst_bool) {
        Map<String, Object> map = new HashMap<>();
        PriceSettingType priceSettingType = new PriceSettingType();
        priceSettingType.setPst_id(pst_id);
        priceSettingType.setPst_bool(pst_bool);
        Integer bools = priceSettingService.updatePriceSettingTypeBool(priceSettingType);
        if (bools > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 该房源特价活动
     *
     * @param hi_code
     * @return
     * @author chen
     * @date Feb 4, 2017 5:44:25 PM
     */
    @RequestMapping("/specialType")
    @ResponseBody
    public Map<String, Object> specialType(String hi_code) {
        Map<String, Object> map = new HashMap<>();
        List<PriceSettingType> priceSettingType = priceSettingService.selectPriceSettingTypeAll();
        map.put("priceSettingType", priceSettingType);
        HouseInfoKeep houseInfoKeep = new HouseInfoKeep();
        houseInfoKeep.setHi_code(hi_code);
        HouseInfoKeep houseForRent = houseLibraryService.selectHouseForRentList(houseInfoKeep).get(0);
        map.put("pst_id", houseForRent.getPst_id());
        return map;
    }

    /**
     * 设置房源特价活动
     *
     * @param hi_code
     * @param pst_id
     * @return
     * @author chen
     * @date Feb 4, 2017 6:07:34 PM
     */
    @RequestMapping("/specialSetting")
    @ResponseBody
    public Map<String, Object> specialSetting(String hi_code, Integer pst_id, Boolean boolt) {
        Map<String, Object> map = new HashMap<>();
        PriceMoney priceMoney = new PriceMoney();
        priceMoney.setPst_id(pst_id);
        priceMoney.setHi_code(hi_code);
        Integer bools = priceSettingService.updatePriceMoney(priceMoney);
        if (bools > 0) {
            if (boolt != null && boolt) {
                HouseInfoKeep houseInfoKeep = new HouseInfoKeep();
                houseInfoKeep.setHi_code(hi_code);
                houseInfoKeep.setHi_boolActive(1);
                priceSettingService.updatehouseKeepActive(houseInfoKeep);
            }
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 房源定价
     *
     * @return
     * @author chen
     * @date Dec 25, 2016 5:35:03 PM
     */
    @RequestMapping("/addPriceMoney")
    @ResponseBody
    public Map<String, Object> addPriceMoney(String pm_outMoney, Integer pm_id, Integer bools, String hi_code) {
        Map<String, Object> map = new HashMap<>();
        Integer boolt = 0;
        PriceMoney priceMoney = new PriceMoney();
        UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();
        priceMoney.setEm_id(cookieEmployee.getEm_id());
        priceMoney.setPm_outMoney(pm_outMoney);
        if (bools == 1) {
            priceMoney.setHi_code(hi_code);
            priceMoney.setPm_date(new Date());
            boolt = priceSettingService.insertPriceMoney(priceMoney);
        } else {
            priceMoney.setPm_id(pm_id);
            boolt = priceSettingService.updatePriceMoney(priceMoney);
        }
        if (boolt > 0) {
            ContractImplRecordVo implementRecordVo = new ContractImplRecordVo();
            implementRecordVo.setHi_code(hi_code);
            implementRecordVo.setCir_type(1015);
            String[] split = pm_outMoney.split("-");
            String pmStr = "";
            for (int i = 0; i < split.length; i++) {
                pmStr += "第" + (i + 1) + "年：" + split[i] + ", ";
            }
            pmStr = pmStr.substring(0, pmStr.length() - 2);
            implementRecordVo.setCir_content(cookieEmployee.getEm_name() + "定价为" + pmStr);
            implementRecordVo.setCir_author(cookieEmployee.getEm_id());
            implementRecordVo.setCir_source(1);
            implementRecordVo.setCir_createTime(new Date());
            contractService.addHouseRecord(implementRecordVo);
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 查询房源定价
     *
     * @param hi_code 房源CODE
     * @return
     */
    @RequestMapping("/queryHousePrice")
    @ResponseBody
    public String queryHousePrice(String hi_code) {
        Msg<Object> msg = new Msg<>();
        ViewHouseLibraryInfoVo libraryInfo = houseLibraryService.queryHouseLibraryInfo(hi_code);
        if (libraryInfo != null) {
            ContractObjectVo contractObject = new ContractObjectVo();
            contractObject.setHi_code(libraryInfo.getHi_code());
            contractObject.setContractObject_Type(AppConfig.TYPE_CONTRACT_201);
            contractObject.setContractObject_State(AppConfig.con_state_2);
            contractObject = contractService.queryContractObject(contractObject);
            if (contractObject != null) {
                try {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    String outMoney = libraryInfo.getPm_outMoney();
                    String[] moneys = outMoney != null ? outMoney.split("-") : new String[]{};

                    HashMap<String, Integer> map = AppUtil.getYearMonthDayData(sdf.format(contractObject.getContractObject_Date()), sdf.format(new Date()));
                    Integer year = map.get("year");
                    Integer month = map.get("month");
                    Integer day = map.get("day");
                    int y = year;
                    if (month > 0 || day > 0) {
                        y++;
                    }
                    y = y == 0 ? 0 : y - 1;
                    y = Math.min(y, moneys.length);
                    msg.put("systemPrice", moneys[y]);
                    msg.put("hi_price", libraryInfo.getHi_price());
                    msg.put("hi_keepMoney", libraryInfo.getHi_keepMoney());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        // msg.put("contractObject", contractObject);
        return msg.toString();
    }

    /**
     * 更新房源定价
     *
     * @param hi_code
     * @param hi_price
     * @return
     */
    @RequestMapping("/updateHousePrice")
    @ResponseBody
    public String updateHousePrice(String hi_code, Double hi_price) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        if (StringUtils.isEmpty(hi_code) || StringUtils.isEmpty(hi_price)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        try {
            msg = houseLibraryService.updateHousePrice(employee, hi_code, hi_price);

            // 将重新定价记录到房管日志中
            ContractImplRecordVo contractImplRecord = new ContractImplRecordVo();
            contractImplRecord.setHi_code(hi_code);
            contractImplRecord.setCir_type(1015);// 调价
            contractImplRecord.setCir_author(employee.getEm_id());// 记录人
            contractImplRecord.setCir_content("定价为" + hi_price);
            contractImplRecord.setCir_source(1);// 记录来源（0：系统；1：手动）
            contractImplRecord.setCir_createTime(new Date());// 添加时间
            contractService.addHouseRecord(contractImplRecord);
        } catch (AppException e) {
            e.printStackTrace();
            return msg.toError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(Msg.MSG_SYSTEM_ERROR);
        }
        return msg.toString();
    }

    /**
     * 查询房源年限/判断能否操作定价
     *
     * @return
     * @throws Exception
     * @author chen
     * @date Dec 25, 2016 10:28:31 AM
     */
    @RequestMapping("/selectHouseyear")
    @ResponseBody
    public Map<String, Object> selectHouseyear(String hi_code) throws Exception {
        Map<String, Object> map = new HashMap<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        HouseInfoKeep selectHouseInfoByCode = houseLibraryService.selectHouseInfoByCode(hi_code);
        if (selectHouseInfoByCode.getHi_boolActive() != null && selectHouseInfoByCode.getHi_boolActive() == 1) {
            map.put("message", "active");
            return map;
        }
        int year = 0;
        if (selectHouseInfoByCode.getContract_beginDate() != null) {
            int month = AppUtil.getMonth2(sdf.format(selectHouseInfoByCode.getContract_beginDate()), sdf.format(selectHouseInfoByCode.getContract_expiryDate()));
            year = (int) Math.ceil((double) month / 12);
        }
        // List<PriceSetting> setting = priceSettingService.selectSettingAll();
        // int bools = 0;
        // if(selectHouseInfoByCode.getHi_leaseDay() != null){
        // for (PriceSetting priceSetting : setting) {
        // if(priceSetting.getPs_jurisdiction() == 1){
        // if(selectHouseInfoByCode.getHi_leaseDay() <
        // priceSetting.getPs_day()){
        // bools = 1;
        // break;
        // }
        // if(selectHouseInfoByCode.getHi_leaseDay() > priceSetting.getPs_day()
        // && bools != 3){
        // bools = 2;
        // }
        // }
        // if(priceSetting.getPs_jurisdiction() == 2){
        // if(selectHouseInfoByCode.getHi_leaseDay() >
        // priceSetting.getPs_day()){
        // bools = 3;
        // }
        // }
        // }
        // }
        // int jurisdiction = bools;
        UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();
        CompanyPserson companyPserson = new CompanyPserson();
        companyPserson.setEm_id(cookieEmployee.getEm_id());
        if (authorizationService.selectCompanyPserson(companyPserson).isEmpty()) {
            map.put("message", "error");
            return map;
        }
        companyPserson = authorizationService.selectCompanyPserson(companyPserson).get(0);
        Company company = new Company();
        company.setUcc_id(companyPserson.getUcc_id());
        List<Company> companys = authorizationService.selectOrganization(company);
        if ((cookieEmployee.getEm_id() != 3 && !selectHouseInfoByCode.getHpr_newEmp().equals(cookieEmployee.getEm_id())) && (cookieEmployee.getEm_id() != 3 && !cookieEmployee.getEm_id().equals(companys.get(0).getEm_id()))) {
            map.put("message", "error");
            return map;
        }
        map.put("message", "success");
        map.put("year", year);
        map.put("pm_id", selectHouseInfoByCode.getPm_id());
        map.put("money", selectHouseInfoByCode.getPm_outMoney());
        map.put("outMoney", selectHouseInfoByCode.getHi_keepMoney());

        return map;
    }

    @Scheduled(cron = "0 0 1 * * ?")
    public void housePriceMessage() {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            String newDate = sdf.format(new Date());
            String startTime = "";
            // 查询招租房源
            HouseInfoKeep houseInfoKeeps = new HouseInfoKeep();
            List<HouseInfoKeep> houseForRent = houseLibraryService.selectHouseForRentList(houseInfoKeeps);
            if (!houseForRent.isEmpty()) {
                for (HouseInfoKeep houseInfoKeep : houseForRent) {
                    // System.out.println(houseInfoKeep.getHi_code());
                    ContractObjectVo userCenterContractObject1 = new ContractObjectVo();
                    userCenterContractObject1.setContractObject_Type("租赁合同");
                    userCenterContractObject1.setHi_code(houseInfoKeep.getHi_code());
                    ContractObjectVo zContractNo = contractService.selectContractObjectByHICode(userCenterContractObject1);
                    if (zContractNo != null && zContractNo.getContractObject_State().equals(1)) {
                        ContractObjectVo centerContractObject = new ContractObjectVo();
                        centerContractObject.setContractObject_Id(zContractNo.getContractObject_Successor());
                        centerContractObject.setContractObject_Type("租赁合同");
                        centerContractObject.setHi_code(houseInfoKeep.getHi_code());
                        zContractNo = contractService.selectContractObjectByHICode(centerContractObject);
                    }

                    ContractObjectVo userCenterContractObject2 = new ContractObjectVo();
                    userCenterContractObject2.setContractObject_Type("托管合同");
                    userCenterContractObject2.setHi_code(houseInfoKeep.getHi_code());
                    userCenterContractObject2.setContractObject_OptionState(AppConfig.contract_optionstate_403);
                    ContractObjectVo tContractNo = contractService.selectContractObjectByHICode(userCenterContractObject2);

                    // 开始合同
                    ContractObjectVo userCenterContractObject3 = new ContractObjectVo();
                    userCenterContractObject3.setContractObject_Type("托管合同");
                    userCenterContractObject3.setHi_code(houseInfoKeep.getHi_code());
                    ContractObjectVo tContractNo1 = contractService.selectContractObjectByHICodeAsc(userCenterContractObject3);

                    int _state = 0;
                    if (zContractNo != null) {
                        _state = zContractNo.getContractObject_OptionState();
                    }
                    if (AppUtil.isOkState(_state, "退租") || AppUtil.isOkState(_state, "转租") || AppUtil.isOkState(_state, "强收") || AppUtil.isOkState(_state, "换房")) {
                        ViewContractStatement viewContractStatement = new ViewContractStatement();
                        viewContractStatement.setCco_state("取消");
                        viewContractStatement.setContractObject_Code(zContractNo.getContractObject_Code());
                        ViewContractStatement contractNoShutTime = achievementCompanyService.selectContractNoShutTime(viewContractStatement).get(0);

                        startTime = sdf.format(contractNoShutTime.getCco_handleDate());
                    } else if (AppUtil.isOkState(_state, "到期")) {
                        startTime = sdf.format(zContractNo.getContractObject_DeadlineTime());
                    } else {
                        if (tContractNo != null) {
                            startTime = sdf.format(tContractNo.getContractObject_Date());
                        } else {
                            continue;
                        }
                    }

                    if (AppUtil.getDay2(startTime, sdf.format(tContractNo.getContractObject_Date())) > 0) {
                        startTime = sdf.format(tContractNo.getContractObject_Date());
                    }

                    // 判断招租期
                    int day = AppUtil.getDay2(startTime, newDate);
                    if (day < 0) {
                        day = 0;
                    }

                    int contractDate = AppUtil.getMonth2(sdf.format(new Date()), sdf.format(tContractNo.getContractObject_DeadlineTime()));

                    // String em_str = "";
                    // CompanyPserson companyPserson = new CompanyPserson();
                    // companyPserson.setEm_id(houseInfoKeep.getHpr_newEmp());
                    // if(!authorizationService.selectCompanyPserson(companyPserson).isEmpty()){
                    // companyPserson =
                    // authorizationService.selectCompanyPserson(companyPserson).get(0);
                    // Company company = new Company();
                    // company.setUcc_id(companyPserson.getUcc_id());
                    // List<Company> companys =
                    // authorizationService.selectOrganization(company);
                    // em_str = companys.get(0).getEm_id().toString();
                    // }else{
                    // em_str = "7";
                    // }
                    // 租金递增
                    String moneyTopFloat = tContractNo.getContractBody_Increasing();
                    houseInfoKeep.setHi_leaseDay(day);
                    houseInfoKeep.setHi_moneyTopFloat(moneyTopFloat);
                    List<PriceSetting> settingWhereDay = priceSettingService.selectSettingAll();
                    for (PriceSetting priceSetting2 : settingWhereDay) {
                        if (priceSetting2.getPs_jurisdiction().equals(2)) {
                            if ((houseInfoKeep.getHi_forRentState() == null || houseInfoKeep.getHi_forRentState() == 1001 || (tContractNo.getContractObject_OptionState() == 201 && houseInfoKeep.getHi_forRentState() == 1003)) && day >= (priceSetting2.getPs_day())) {
                                if (contractDate > 8 && houseInfoKeep.getPm_outMoney() != null) {
                                    // if
                                    // (houseInfoKeep.getHi_boolActive()
                                    // == null ||
                                    // houseInfoKeep.getHi_boolActive().equals(""))
                                    // {
                                    // houseInfoKeep.setHi_boolActive(1);
                                    // }
                                    if (houseInfoKeep.getHi_houseActive() == null) {
                                        // 公司回收
                                        if (contractDate > 15) {
                                            houseInfoKeep.setHi_houseActive(1);
                                        }
                                    }
                                }
                            }
                            if ((houseInfoKeep.getHi_forRentState() == null || houseInfoKeep.getHi_forRentState() == 1001 || (tContractNo.getContractObject_OptionState() == 201 && houseInfoKeep.getHi_forRentState() == 1003)) && day >= (priceSetting2.getPs_day() + 3) && houseInfoKeep.getHi_houseActive() == null && houseInfoKeep.getPm_outMoney() != null) {
                                // if
                                // (houseInfoKeep.getHi_boolActive()
                                // == null ||
                                // houseInfoKeep.getHi_boolActive().equals(""))
                                // {
                                // houseInfoKeep.setHi_boolActive(1);
                                // }
                            }
                        }
                    }
                    houseInfoKeep.setContract_expiryDate(tContractNo.getContractObject_DeadlineTime());
                    houseInfoKeep.setContract_beginDate(tContractNo1.getContractObject_Date());
                    priceSettingService.updatehouseKeep(houseInfoKeep);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 库存当前房源定价
     *
     * @author 陈智颖
     * @date Apr 18, 2017 3:15:40 PM
     */
    @Scheduled(cron = "0 0 1 * * ?")
    public void housePriceSc() {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            List<HouseInfoKeep> selectHouseInfoAll = houseLibraryService.selectHouseInfoAll();
            for (HouseInfoKeep houseInfoKeep : selectHouseInfoAll) {
                // 当前定价
                Double money = 0.0;
                // 判断时间是第几年
                if (houseInfoKeep.getContract_beginDate() != null) {
                    int month2 = (int) Math.rint(Double.valueOf(AppUtil.getMonth2(sdf.format(houseInfoKeep.getContract_beginDate()), sdf.format(new Date()))) / 12);
                    if (houseInfoKeep.getPm_outMoney() == null) {
                        money = 0.0;
                    } else {
                        if (month2 > 0) {
                            int year = (int) Math.ceil((double) month2 / 12);
                            if (houseInfoKeep.getPm_outMoney() != null) {
                                if (year <= houseInfoKeep.getPm_outMoney().split("-").length) {
                                    if (houseInfoKeep.getPst_money() != null) {
                                        money = (new Double(houseInfoKeep.getPm_outMoney().split("-")[year - 1]) + houseInfoKeep.getPst_money());
                                    } else {
                                        money = (new Double(houseInfoKeep.getPm_outMoney().split("-")[year - 1]));
                                    }
                                }
                            }
                        } else if (month2 == 0) {
                            if (houseInfoKeep.getPst_money() != null) {
                                money = (new Double(houseInfoKeep.getPm_outMoney().split("-")[0]) + houseInfoKeep.getPst_money());
                            } else {
                                money = (new Double(houseInfoKeep.getPm_outMoney().split("-")[0]));
                            }
                        }
                    }
                } else {
                    if (houseInfoKeep.getPm_outMoney() != null) {
                        money = (new Double(houseInfoKeep.getPm_outMoney().split("-")[0]));
                    }
                }
                HouseInfoKeep houseInfoKeep2 = new HouseInfoKeep();
                houseInfoKeep2.setHi_id(houseInfoKeep.getHi_id());
                houseInfoKeep2.setHi_price(money);
                priceSettingService.updatehouseKeep(houseInfoKeep2);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 系统一键定价
     *
     * @throws Exception
     * @author chen
     * @date Jan 3, 2017 10:40:13 PM
     */
    @RequestMapping("/housePriceAutomatic")
    public Map<String, Object> housePriceAutomatic(HttpServletRequest request) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        List<HouseInfoKeep> HouseInformationKeepAll = houseLibraryService.selectHouseInfoAll();
        int bools = 0;
        Map<String, Object> map = new HashMap<>();
        for (HouseInfoKeep houseInfoKeep : HouseInformationKeepAll) {
            ContractObjectVo userCenterContractObject2 = new ContractObjectVo();
            userCenterContractObject2.setContractObject_Type("托管合同");
            userCenterContractObject2.setHi_code(houseInfoKeep.getHi_code());
            ContractObjectVo tContractNo = contractService.selectContractObjectByHICode(userCenterContractObject2);
            if (tContractNo == null) {
                continue;
            }

            int year = 1;
            if (tContractNo.getContractObject_Date() != null && tContractNo.getContractObject_DeadlineTime() != null) {
                year = (int) Math.rint(Double.valueOf(AppUtil.getMonth2(sdf.format(tContractNo.getContractObject_Date()), sdf.format(tContractNo.getContractObject_DeadlineTime()))) / 12);
                if (year < 1) {
                    year = 1;
                }
            }
            Double hi_keepMoney = 0.0;
            if (houseInfoKeep.getHi_keepMoney() != null) {
                hi_keepMoney = houseInfoKeep.getHi_keepMoney();
            }
            // 免租期
            String contractBody_FreeTime = "0";
            if (tContractNo.getContractBody_FreeTime() != null && !tContractNo.getContractBody_FreeTime().equals("")) {
                contractBody_FreeTime = tContractNo.getContractBody_FreeTime();
            }
            houseIntentionService.housePriceMoney(houseInfoKeep.getHi_code(), 1, hi_keepMoney, contractBody_FreeTime, year, "月付", null);
        }

        List<HouseInfoKeep> selectHouseInfoAll = houseLibraryService.selectHouseInfoAll();
        for (HouseInfoKeep houseInfoKeep : selectHouseInfoAll) {
            ContractObjectVo userCenterContractObject2 = new ContractObjectVo();
            userCenterContractObject2.setContractObject_Type("托管合同");
            userCenterContractObject2.setHi_code(houseInfoKeep.getHi_code());
            ContractObjectVo tContractNo = contractService.selectContractObjectByHICode(userCenterContractObject2);
            if (tContractNo == null) {
                continue;
            }
            // 当前定价
            Double money = 0.0;
            // 判断时间是第几年
            if (houseInfoKeep.getContract_beginDate() != null) {
                int month2 = (int) Math.rint(Double.valueOf(AppUtil.getMonth2(sdf.format(tContractNo.getContractObject_Date()), sdf.format(tContractNo.getContractObject_DeadlineTime()))) / 12);
                if (houseInfoKeep.getPm_outMoney() == null) {
                    money = 0.0;
                } else {
                    if (month2 > 0) {
                        int year = (int) Math.ceil((double) month2 / 12);
                        if (houseInfoKeep.getPm_outMoney() != null) {
                            if (year <= houseInfoKeep.getPm_outMoney().split("-").length) {
                                if (houseInfoKeep.getPst_money() != null) {
                                    money = (new Double(houseInfoKeep.getPm_outMoney().split("-")[year - 1]) + houseInfoKeep.getPst_money());
                                } else {
                                    money = (new Double(houseInfoKeep.getPm_outMoney().split("-")[year - 1]));
                                }
                            }
                        }
                    } else if (month2 == 0) {
                        if (houseInfoKeep.getPst_money() != null) {
                            money = (new Double(houseInfoKeep.getPm_outMoney().split("-")[0]) + houseInfoKeep.getPst_money());
                        } else {
                            money = (new Double(houseInfoKeep.getPm_outMoney().split("-")[0]));
                        }
                    }
                }
            } else {
                if (houseInfoKeep.getPm_outMoney() != null) {
                    money = (new Double(houseInfoKeep.getPm_outMoney().split("-")[0]));
                }
            }
            HouseInfoKeep houseInfoKeep2 = new HouseInfoKeep();
            houseInfoKeep2.setHi_id(houseInfoKeep.getHi_id());
            houseInfoKeep2.setHi_price(money);
            priceSettingService.updatehouseKeep(houseInfoKeep2);
        }
        if (bools > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 判断是否有权限操作该房屋
     *
     * @param hi_code
     * @return
     * @author chen
     * @date Feb 4, 2017 6:39:57 PM
     */
    @RequestMapping("/houseJurisdiction")
    @ResponseBody
    public Map<String, Object> houseJurisdiction(String hi_code) {
        Map<String, Object> map = new HashMap<>();
        HouseInfoKeep selectHouseInfoByCode = houseLibraryService.selectHouseInfoByCode(hi_code);
        UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();
        CompanyPserson companyPserson = new CompanyPserson();
        companyPserson.setEm_id(cookieEmployee.getEm_id());
        map.put("message", "success");
        if (authorizationService.selectCompanyPserson(companyPserson).isEmpty()) {
            map.put("message", "error");
        }
        companyPserson = authorizationService.selectCompanyPserson(companyPserson).get(0);
        Company company = new Company();
        company.setUcc_id(companyPserson.getUcc_id());
        List<Company> companys = authorizationService.selectOrganization(company);
        if (selectHouseInfoByCode.getHpr_newEmp() == null) {
            map.put("message", "error");
        } else {
            if ((cookieEmployee.getEm_id() != 3 && !selectHouseInfoByCode.getHpr_newEmp().equals(cookieEmployee.getEm_id())) && (cookieEmployee.getEm_id() != 3 && !cookieEmployee.getEm_id().equals(companys.get(0).getEm_id()))) {
                map.put("message", "error");
            }
        }
        return map;
    }

    /**
     * 是否公司回收房屋
     *
     * @param hi_code
     * @return
     * @author chen
     * @date Dec 27, 2016 10:49:32 AM
     */
    @RequestMapping("/houseActiveTrue")
    @ResponseBody
    public Map<String, Object> houseActiveTrue(String hi_code, Integer hi_houseActive, Integer hi_boolActive) {
        Map<String, Object> map = new HashMap<>();
        HouseInfoKeep houseInfoKeep = new HouseInfoKeep();
        houseInfoKeep.setHi_code(hi_code);
        if (hi_houseActive != null) {
            houseInfoKeep.setHi_houseActive(hi_houseActive);
        }
        if (hi_boolActive != null) {
            houseInfoKeep.setHi_boolActive(hi_boolActive);
        }
        Integer bools = priceSettingService.updatehouseKeepActive(houseInfoKeep);
        if (bools > 0) {
            PriceMoney priceMoney = new PriceMoney();
            priceMoney.setPst_id(0);
            priceMoney.setHi_code(hi_code);
            priceSettingService.updatePriceMoney(priceMoney);
            // UserCenterTaskMessage userCenterTaskMessage = new
            // UserCenterTaskMessage();
            // userCenterTaskMessage.setTm_http("housePriceBool(\'"+ hi_code
            // +"\')");
            // List<UserCenterTaskMessage> selectTaskMessageUserHttp =
            // userCenterTaskMessageService.selectTaskMessageUserHttp(userCenterTaskMessage);
            // if (!selectTaskMessageUserHttp.isEmpty()) {
            // for (UserCenterTaskMessage userCenterTaskMessage2 :
            // selectTaskMessageUserHttp) {
            // userCenterTaskMessage.setTm_result(1);
            // userCenterTaskMessage.setTm_id(userCenterTaskMessage2.getTm_id());
            // userCenterTaskMessageService.updatetTaskMessageState(userCenterTaskMessage);
            // }
            // }
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }
        return map;
    }
}
