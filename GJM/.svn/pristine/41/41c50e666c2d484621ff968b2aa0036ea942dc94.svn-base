package com.gjp.controller;

import com.gjp.model.*;
import com.gjp.service.*;
import com.gjp.util.*;
import org.apache.poi.hssf.usermodel.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/customerSee")
public class CustomerSeeController {

    // 客户带看
    private @Resource
    CustomerService customerService;

    // 客户带看
    @Resource
    private CustomerSeeService customerSeeService;

    // 客户跟踪信息
    @Resource
    private CustomerTrackMessageService customerTrackMessageService;

    // 客户带看信息
    @Resource
    private CustomerSeeMessageService customerSeeMessageService;

    // 房屋
    @Resource
    private HouseLibraryService houseLibraryService;

    // 房屋扩展
    @Resource
    private HouseExtendedService houseExtendedService;

    // 客户统计
    @Resource
    private CustomerStatisticsService customerStatisticsService;

    // 统计设置
    @Resource
    private CustomerSettingsService customerSettingsService;

    /**
     * 判断用户是否两天还没带看成功，没有就公开用户
     *
     * @author 陈智颖
     */
    @Scheduled(cron = "0 0 1 * * ?")
    public void cutomerPublic() {
        List<CustomerTrackMessage> queryCustomerTrackMessageState = customerTrackMessageService.queryCustomerTrackMessageState();
        if (!queryCustomerTrackMessageState.isEmpty()) {
            for (CustomerTrackMessage customerTrackMessage : queryCustomerTrackMessageState) {
                Date date = new Date();
                long day = date.getTime() - customerTrackMessage.getCtm_date().getTime();
                long days = day / (1000 * 60 * 60 * 24);
                if ((days + 1) > 2) {
                    customerTrackMessage.setCtm_userState(1);
                    customerTrackMessageService.updateCustomerTrackMessage(customerTrackMessage);
                }
            }
        }
    }

    /**
     * 查询统计分析列表
     *
     * @param type       统计类型
     * @param strDate    时间
     * @param strDateEnd 时间
     * @param pageNo     开始页数
     * @param pageSize   到几条
     * @return
     * @throws ParseException
     * @author 陈智颖
     */
    @RequestMapping("/customerStatisticsList")
    @ResponseBody
    public Map<String, Object> customerStatisticsList(TableList tableList1, Integer type) throws ParseException {

        // 初始化获取对象
        TableList tableList = tableList1.initData(tableList1);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

        PageModel<Statistics> pageModel1 = new PageModel<Statistics>();

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
        String sType = "";
        if (type == null || type == 1) {
            sType = "录入";
        } else if (type == 2) {
            sType = "实勘";
        } else {
            sType = "带看";
        }
        Statistics statistics = new Statistics();
        statistics.setHt_type(sType);
        pageModel1.setT(statistics);

        // 装载数据类
        DataList<Statistics> datalist = new DataList<Statistics>();
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        pageModel1.setPageNo((tableList.getPageNo() - 1) * pageSize);
        // 分页设置查询条数
        pageModel1.setPageSize(pageSize);
        PageModel<Statistics> pageModel = new PageModel<Statistics>();
        // 查询分页实体
        if (type != null && type == 3) {
            pageModel = customerStatisticsService.queryCustomerStatisticsListSee(pageModel1);
        } else {
            pageModel = customerStatisticsService.queryCustomerStatisticsList(pageModel1);
        }
        // 装载数据
        Map<String, Object> map = datalist.dataList(pageModel.getList(), tableList.getPageNo(), pageSize, pageModel.getTotalRecords(), pageModel.getSumMoney());

        return map;
    }

    /**
     * 一周统计带看
     *
     * @author 陈智颖
     */
    // @Scheduled(cron = "0 50 23 * * ?")
    public void cutomerStatistics() {
        // 获取当前时间
        Date date = new Date();
        Calendar cl = Calendar.getInstance();
        cl.setTime(new Date());
        int day = cl.get(Calendar.DAY_OF_YEAR);

        ViewTrusteeship viewTrusteeships = new ViewTrusteeship();
        List<ViewTrusteeship> queryCustomerTrusteeship = customerStatisticsService.queryCustomerTrusteeship(viewTrusteeships);
        for (ViewTrusteeship viewTrusteeship : queryCustomerTrusteeship) {
            CustomerSee customerSee = new CustomerSee();
            customerSee.setEm_id(viewTrusteeship.getEm_id());
            customerSee.setCs_day(day);
            Statistics statistics = new Statistics();
            statistics.setPcs_cycleNum(day);
            statistics.setEm_id(viewTrusteeship.getEm_id());
            statistics.setPcs_state(2);
            statistics.setPsc_date(date);
            Statistics queryCustomerStatisticsWhere = customerStatisticsService.queryCustomerStatisticsWhere(statistics);
            // 带看次数
            CustomerSee queryCustomerSeeSuccessCountDK = customerSeeService.queryCustomerSeeSuccessCountDK(customerSee);
            // 成功次数
            CustomerSee queryCustomerSeeSuccessCount = customerSeeService.queryCustomerSeeSuccessCount(customerSee);
            if (queryCustomerStatisticsWhere == null) {
                // 带看次数
                CustomerSee queryCustomerSeeList = customerSeeService.queryCustomerSeeList(customerSee);
                statistics.setEm_id(viewTrusteeship.getEm_id());
                statistics.setPcs_state(2);
                statistics.setEm_department(viewTrusteeship.getUcc_name());
                if (queryCustomerSeeList.getSize() > 0) {
                    statistics.setPcs_num(queryCustomerSeeSuccessCountDK.getSize());
                    if (queryCustomerSeeSuccessCount.getSize().equals(0)) {
                        statistics.setPcs_success("0%");
                    } else {
                        statistics.setPcs_success(queryCustomerSeeList.getCs_per());
                    }
                } else {
                    statistics.setPcs_num(0);
                    statistics.setPcs_success("0%");
                }
                statistics.setPcs_cycle(7);
                customerStatisticsService.insertCustomerStatistics(statistics);
            } else {
                queryCustomerStatisticsWhere.setPsc_date(date);
                // 带看次数
                CustomerSee queryCustomerSeeList = customerSeeService.queryCustomerSeeList(customerSee);
                if (queryCustomerSeeList.getSize() > 0) {
                    queryCustomerStatisticsWhere.setPcs_num(queryCustomerSeeSuccessCountDK.getSize());
                    if (queryCustomerSeeSuccessCount.getSize().equals(0)) {
                        queryCustomerStatisticsWhere.setPcs_success("0%");
                    } else {
                        queryCustomerStatisticsWhere.setPcs_success(queryCustomerSeeList.getCs_per());
                    }

                } else {
                    queryCustomerStatisticsWhere.setPcs_num(0);
                    queryCustomerStatisticsWhere.setPcs_success("0%");
                }
                customerStatisticsService.updateCustomerStatistics(queryCustomerStatisticsWhere);
            }
        }
    }

    /**
     * 插入统计
     *
     * @return
     * @author 陈智颖
     */
    public Map<String, Object> cutomerStatisticsAdd(Integer em_id) {

        Map<String, Object> map = new HashMap<>();

        // 获取当前时间
        Date date = new Date();
        Calendar cl = Calendar.getInstance();
        cl.setTime(new Date());
        int day = cl.get(Calendar.DAY_OF_YEAR);

        ViewTrusteeship viewTrusteeships = new ViewTrusteeship();
        viewTrusteeships.setEm_id(em_id);
        List<ViewTrusteeship> queryCustomerTrusteeship = customerStatisticsService.queryCustomerTrusteeship(viewTrusteeships);
        for (ViewTrusteeship viewTrusteeship : queryCustomerTrusteeship) {
            CustomerSee customerSee = new CustomerSee();
            customerSee.setEm_id(viewTrusteeship.getEm_id());
            customerSee.setCs_date(date);
            Statistics statistics = new Statistics();
            statistics.setPcs_cycleNum(day);
            statistics.setEm_id(viewTrusteeship.getEm_id());
            statistics.setPcs_state(2);
            statistics.setPsc_date(date);
            Statistics queryCustomerStatisticsWhere = customerStatisticsService.queryCustomerStatisticsWhere(statistics);
            // 带看次数
            CustomerSee queryCustomerSeeSuccessCountDK = customerSeeService.queryCustomerSeeSuccessCountDK(customerSee);
            // 成功次数
            CustomerSee queryCustomerSeeSuccessCount = customerSeeService.queryCustomerSeeSuccessCount(customerSee);
            if (queryCustomerStatisticsWhere == null) {
                // 带看次数
                CustomerSee queryCustomerSeeList = customerSeeService.queryCustomerSeeList(customerSee);
                statistics.setEm_id(viewTrusteeship.getEm_id());
                statistics.setPcs_state(2);
                statistics.setEm_department(viewTrusteeship.getUcc_name());
                if (queryCustomerSeeList.getSize() > 0) {
                    statistics.setPcs_num(queryCustomerSeeSuccessCountDK.getSize());
                    if (queryCustomerSeeSuccessCount.getSize().equals(0)) {
                        statistics.setPcs_success("0%");
                    } else {
                        statistics.setPcs_success(queryCustomerSeeList.getCs_per());
                    }
                } else {
                    statistics.setPcs_num(0);
                    statistics.setPcs_success("0%");
                }
                statistics.setPcs_cycle(7);
                customerStatisticsService.insertCustomerStatistics(statistics);
            } else {
                queryCustomerStatisticsWhere.setPsc_date(date);
                // 带看次数
                CustomerSee queryCustomerSeeList = customerSeeService.queryCustomerSeeList(customerSee);
                if (queryCustomerSeeList.getSize() > 0) {
                    queryCustomerStatisticsWhere.setPcs_num(queryCustomerStatisticsWhere.getPcs_num() + 1);
                    if (queryCustomerSeeSuccessCount.getSize().equals(0)) {
                        queryCustomerStatisticsWhere.setPcs_success("0%");
                    } else {
                        if (queryCustomerStatisticsWhere.getPcs_success() != null && !queryCustomerStatisticsWhere.getPcs_success().equals("")) {
                            double tSuccess = Double.valueOf(queryCustomerStatisticsWhere.getPcs_success().replace("%", ""));
                            double gSuccess = Double.valueOf(queryCustomerSeeList.getCs_per().replace("%", ""));
                            statistics.setPcs_success((tSuccess + gSuccess) / 2 + "%");
                        }
                    }
                } else {
                    queryCustomerStatisticsWhere.setPcs_num(0);
                    queryCustomerStatisticsWhere.setPcs_success("0%");
                }
                customerStatisticsService.updateCustomerStatistics(queryCustomerStatisticsWhere);
            }
        }

        return map;
    }

    /**
     * 带看客户分页
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/cutomerList")
    @ResponseBody
    public Map<String, Object> cutomerList(Integer weekNum, Integer em_id, String dateTile, String dateStarte, String dateEnde) {
        Map<String, Object> map = new HashMap<>();

        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

        Date sDate = new Date();

        String sqlWhere = "";
        String startEnd = "";

        int num = 0;
        if (dateTile != null && dateTile.equals("最近7天")) {
            num = 7;
        } else if (dateTile != null && dateTile.equals("最近30天")) {
            num = 30;
        } else if (dateTile == null && dateStarte != null && dateEnde != null) {
            num = -1;
        }

        Calendar cl = Calendar.getInstance();
        if (num == 30) {
            // cl.setTime(sDate);
            // String endDate = sf.format(cl.getTime());
            // int year = cl.get(Calendar.YEAR);
            // int month = cl.get(Calendar.MONTH);
            // String startDate = year+"-0"+(month+1)+"-01";
            // sqlWhere = "and cs_date >= '"+ startDate +"' and '"+endDate+"' >=
            // cs_date";
            // startEnd = startDate.substring(5,
            // startDate.length())+"-"+endDate.substring(5, endDate.length());
            cl.setTime(sDate);
            cl.add(Calendar.DAY_OF_MONTH, -num);
            String startDate = sf.format(cl.getTime());
            sqlWhere = "and cs_date >= '" + startDate + "' and '" + sf.format(sDate) + "' >= cs_date";
            startEnd = startDate.substring(5, startDate.length()) + "-" + sf.format(sDate).substring(5, sf.format(sDate).length());
        } else if (num == 7) {
            cl.setTime(sDate);
            cl.add(Calendar.DAY_OF_MONTH, -num);
            String startDate = sf.format(cl.getTime());
            sqlWhere = "and cs_date >= '" + startDate + "' and '" + sf.format(sDate) + "' >= cs_date";
            startEnd = startDate.substring(5, startDate.length()) + "-" + sf.format(sDate).substring(5, sf.format(sDate).length());
        } else if (num == 0) {
            sqlWhere = "and cs_date = '" + sf.format(sDate) + "'";
            startEnd = sf.format(sDate).substring(5, sf.format(sDate).length());
        } else {
            sqlWhere = "and cs_date >= '" + dateStarte + "' and '" + dateEnde + "' >= cs_date";
        }

        CustomerSee customerSee = new CustomerSee();
        customerSee.setCs_year(cl.get(Calendar.YEAR));
        customerSee.setSqlWhere(sqlWhere);
        if (em_id != null) {
            customerSee.setEm_id(em_id);
        } else {
            UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();
            customerSee.setEm_id(cookieEmployee.getEm_id());
        }

        List<CustomerSee> queryCustomerList = customerSeeService.queryCustomerList(customerSee);
        map.put("queryCustomerList", queryCustomerList);

        Settings settings = new Settings();
        settings.setCss_type(2);
        Settings queryCustomerSettingsWhere = customerSettingsService.queryCustomerSettingsWhere(settings);
        map.put("queryCustomerSettingsWhere", queryCustomerSettingsWhere);

        // 带看次数
        CustomerSee queryCustomerSeeSuccessCountDK = customerSeeService.queryCustomerSeeSuccessCountDK(customerSee);

        map.put("startEnd", startEnd);
        map.put("size", queryCustomerSeeSuccessCountDK.getSize());

        return map;
    }

    /**
     * 修改用户是否公开状态
     *
     * @param id      用户跟踪信息
     * @param state   用户公开状态
     * @param request
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/openUser")
    @ResponseBody
    public String openUser(Integer id, Integer state, HttpServletRequest request) {

        Msg<Pagination<ViewBusinessContractVo>> msg = new Msg<Pagination<ViewBusinessContractVo>>();

        CustomerTrackMessage customerTrackMessage = new CustomerTrackMessage();
        customerTrackMessage.setCtm_id(id);
        customerTrackMessage = customerTrackMessageService.queryCustomerTrackMessageID(customerTrackMessage);
        if (state.equals(1)) {
            customerTrackMessage.setCtm_state(0);
        } else {
            customerTrackMessage.setCtm_state(1);
        }
        Integer bool = customerTrackMessageService.updateCustomerTrackMessage(customerTrackMessage);

        if (bool > 0) {
            msg.setMsg("success");
            return msg.toString();
        } else {
            msg.setMsg("error");
            return msg.toString();
        }
    }

    /**
     * 插入客户
     *
     * @param userName     客户姓名
     * @param userPhone    客户电话
     * @param sex          客户行呗
     * @param customerText 需求
     * @param state        客户是否公开状态
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/addCustomer")
    @ResponseBody
    public String addCustomer(String userName, String userPhone, String sex, String customerText, Integer state) {
        Msg<Pagination<ViewBusinessContractVo>> msg = new Msg<Pagination<ViewBusinessContractVo>>();
        // 插入客户
        CustomerTrackMessage customerTrackMessage = new CustomerTrackMessage();
        customerTrackMessage.setCtm_name(userName);
        customerTrackMessage.setCtm_phone(userPhone);
        customerTrackMessage.setCtm_sex(sex);
        customerTrackMessage.setCtm_demand(customerText);
        customerTrackMessage.setCtm_state(state);
        customerTrackMessage.setCtm_date(new Date());
        customerTrackMessage.setCtm_userState(0);
        UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();
        customerTrackMessage.setEm_id(cookieEmployee.getEm_id());
        int bool = customerTrackMessageService.insertCustomerTrackMessage(customerTrackMessage);

        if (bool > 0) {
            msg.setMsg("success");
            return msg.toString();
        } else {
            msg.setMsg("error");
            return msg.toString();
        }
    }

    /**
     * 录入客户
     *
     * @param userName        客户姓名
     * @param userPhone       客户电话
     * @param houseId         房屋编号
     * @param customerText    客户需求
     * @param customerContent 客户意见
     * @param state           提交的状态
     * @param csm_id          客户带看信息编码
     * @return
     * @throws ParseException
     * @author 陈智颖
     */
    @RequestMapping("/customerSeeAddData")
    @ResponseBody
    public String customerSeeAddData(String userName, String userPhone, String sex, String houseId, String customerText, String customerContent, String failText, Integer state,
                                     Integer csm_id, String image) {
        Msg<Pagination<ViewBusinessContractVo>> msg = new Msg<Pagination<ViewBusinessContractVo>>();
        // 固定每周带看客户数量
        Integer cs_surplusNum = 0;
        Settings settings = new Settings();
        settings.setCss_type(2);
        /*
         * Settings queryCustomerSettingsWhere =
         * customerSettingsService.queryCustomerSettingsWhere(settings);
         * cs_surplusNum = queryCustomerSettingsWhere.getCss_num();
         */
        Date sDate = new Date();
        // 获取当前自然周
        Calendar cl = Calendar.getInstance();
        cl.setTime(sDate);
        int day = cl.get(Calendar.DAY_OF_YEAR);

        boolean bools = false;

        CustomerSee customerSee = new CustomerSee();
        customerSee.setCs_year(cl.get(Calendar.YEAR));
        customerSee.setCs_day(day);
        customerSee.setCs_date(sDate);
        UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();
        customerSee.setEm_id(cookieEmployee.getEm_id());
        CustomerSee queryCustomerSeeList = customerSeeService.queryCustomerSeeList(customerSee);
        // 总次数
        CustomerSee queryCustomerSeeCount = customerSeeService.queryCustomerSeeCount(customerSee);
        // 成功次数
        CustomerSee queryCustomerSeeSuccessCount = customerSeeService.queryCustomerSeeSuccessCount(customerSee);
        // 带看次数
        CustomerSee queryCustomerSeeSuccessCountDK = customerSeeService.queryCustomerSeeSuccessCountDK(customerSee);
        // 客户带看编码
        Integer cs_id = 0;
        Integer bool = 0;
        if (queryCustomerSeeList == null || queryCustomerSeeList.getSize().equals(0)) {
            cs_surplusNum = queryCustomerSeeSuccessCountDK.getSize();
            // 成功率=成功次数/总次数
            float successPer = 0;
            if (state.equals(2) || state.equals(0)) {
                if (image != null) {
                    customerSee.setCs_surplusNum(cs_surplusNum + 1);
                } else {
                    customerSee.setCs_surplusNum(cs_surplusNum + 1);
                }
            } else if (state.equals(1)) {
                customerSee.setCs_surplusNum(cs_surplusNum + 1);
                successPer = 100;
            }
            customerSee.setCs_per(Math.ceil(successPer) + "%");
            bool = customerSeeService.insertCustomerSee(customerSee);
            cs_id = customerSee.getCs_id();

            bools = true;
        } else {
            // 成功率=成功次数/总次数
            float successPer = 0;
            CustomerSee customerTrackMessage = customerSeeService.queryCustomerCountPhone(customerSee);
            if (state.equals(2) || state.equals(0)) {
                // 判断手机号是否存在不存在+1
                customerSee.setCtm_phone(userPhone);
                if (customerTrackMessage == null || customerTrackMessage.getSize().equals(0)) {
                    cs_surplusNum = queryCustomerSeeSuccessCountDK.getSize();
                    queryCustomerSeeList.setCs_surplusNum(cs_surplusNum + 1);
                    bools = true;
                } else {
                    cs_surplusNum = queryCustomerSeeSuccessCountDK.getSize();
                    queryCustomerSeeList.setCs_surplusNum(cs_surplusNum);
                }
                successPer = (float) queryCustomerSeeSuccessCount.getSize() / (float) (queryCustomerSeeCount.getSize() + 1) * 100;
            } else if (state.equals(1)) {
                if (csm_id != null) {
                    customerSee.setCsm_id(csm_id);
                }
                if (customerTrackMessage != null && customerTrackMessage.getSize().equals(0)) {
                    cs_surplusNum = queryCustomerSeeSuccessCountDK.getSize();
                    queryCustomerSeeList.setCs_surplusNum(cs_surplusNum + 1);
                    bools = true;
                } else {
                    cs_surplusNum = queryCustomerSeeSuccessCountDK.getSize();
                    queryCustomerSeeList.setCs_surplusNum(cs_surplusNum);
                }
                CustomerSee queryCustomerListID = customerSeeService.queryCustomerListID(customerSee);
                if (queryCustomerListID == null) {
                    successPer = (float) (queryCustomerSeeSuccessCount.getSize() + 1) / (float) (queryCustomerSeeCount.getSize() + 1) * 100;
                } else {
                    if (!queryCustomerSeeSuccessCount.getSize().equals(0)) {
                        successPer = (float) (queryCustomerSeeSuccessCount.getSize()) / (float) (queryCustomerSeeCount.getSize()) * 100;
                    } else {
                        successPer = 100;
                    }
                }
            }
            queryCustomerSeeList.setCs_per(Math.ceil(successPer) + "%");
            bool = customerSeeService.updateCustomerSee(queryCustomerSeeList);
            cs_id = queryCustomerSeeList.getCs_id();
        }

        CustomerSeeMessage customerSeeMessage = new CustomerSeeMessage();
        if (csm_id != null) {
            customerSeeMessage.setCsm_id(csm_id);
            customerSeeMessage = customerSeeMessageService.queryCustomerSeeMessageWhere(customerSeeMessage);
        }

        CustomerTrackMessage customerTrackMessage = new CustomerTrackMessage();
        customerTrackMessage.setCtm_phone(userPhone);
        if (customerTrackMessageService.queryCustomerTrackMessagePhoneCount(customerTrackMessage) != null) {
            customerTrackMessage = customerTrackMessageService.queryCustomerTrackMessagePhoneCount(customerTrackMessage);
        }
        if (customerSeeMessage.getCsm_id() == null) {
            // 客户带看信息
            customerSeeMessage.setHi_code(houseId);
            customerSeeMessage.setCsm_opinion(customerContent);
            customerSeeMessage.setCsm_state(state);
            if (state.equals(2)) {
                customerSeeMessage.setCsm_reason(failText);
            }
            // 插入客户
            customerTrackMessage.setCtm_name(userName);
            customerTrackMessage.setCtm_phone(userPhone);
            customerTrackMessage.setCtm_sex(sex);
            customerTrackMessage.setCtm_demand(customerText);
            customerTrackMessage.setCtm_state(0);
            customerTrackMessage.setCtm_date(new Date());
            customerTrackMessage.setEm_id(cookieEmployee.getEm_id());
            customerTrackMessage.setCtm_userState(0);
            if (customerTrackMessage.getCtm_id() == null) {
                customerTrackMessageService.insertCustomerTrackMessage(customerTrackMessage);
            } else {
                customerTrackMessageService.updateCustomerTrackMessage(customerTrackMessage);
            }

            customerSeeMessage.setCtm_id(customerTrackMessage.getCtm_id());
            customerSeeMessage.setCs_id(cs_id);
            customerSeeMessage.setCsm_image(image);

            bool = customerSeeMessageService.insertCustomerSeeMessage(customerSeeMessage);
        } else {

            if (customerSeeMessage.getHi_code().equals(houseId)) {
                // 修改客户带看信息
                customerSeeMessage.setCsm_opinion(customerContent);
                customerSeeMessage.setCsm_reason(failText);
                customerSeeMessage.setCsm_state(state);
                customerSeeMessage.setCsm_image(image);
                bool = customerSeeMessageService.updateCustomerSeeMessage(customerSeeMessage);
            } else {
                // 客户带看信息
                customerSeeMessage.setHi_code(houseId);
                customerSeeMessage.setCsm_opinion(customerContent);
                customerSeeMessage.setCsm_state(state);
                customerSeeMessage.setCsm_image(image);
                if (state.equals(2)) {
                    customerSeeMessage.setCsm_reason(failText);
                }
                customerSeeMessage.setCs_id(cs_id);

                CustomerSeeMessage queryCustomerSeeMessageWhere = customerSeeMessageService.queryCustomerSeeMessageWhere(customerSeeMessage);
                queryCustomerSeeMessageWhere.setCsm_state(2);
                // customerSeeMessage2.setCsm_reason("已经被人带看成功");
                customerSeeMessageService.updateCustomerSeeMessage(queryCustomerSeeMessageWhere);

                bool = customerSeeMessageService.insertCustomerSeeMessage(customerSeeMessage);
            }

            // 修改客户跟踪信息
            customerTrackMessage.setCtm_id(customerSeeMessage.getCtm_id());
            CustomerTrackMessage queryCustomerTrackMessageID = customerTrackMessageService.queryCustomerTrackMessageID(customerTrackMessage);
            queryCustomerTrackMessageID.setCtm_demand(customerText);

            bool = customerTrackMessageService.updateCustomerTrackMessage(queryCustomerTrackMessageID);

        }

        // 成功插入客户
        if (state == 1) {
            // 用户成功状态
            customerTrackMessage.setCtm_phone(userPhone);
            customerTrackMessage = customerTrackMessageService.queryCustomerTrackMessagePhoneCount(customerTrackMessage);
            customerTrackMessage.setCtm_userState(1);
            customerTrackMessageService.updateCustomerTrackMessage(customerTrackMessage);

            UserCustomer customer = new UserCustomer();
            customer.setCc_name(userName);
            customer.setCc_phone(userPhone);
            customer.setCc_state(1);
            customer = customerService.queryCustomerInfo(customer);

            if (customer != null) {
                msg.setCode(110);
                msg.setMsg("该用户已存在");
                return msg.toString();
            } else {
                customerService.insertCustomerOne(customer);
                // userCenterContractObjectService.addUserCenterContractSign(contractSign2);
            }

            HouseInfoKeep selectHouseInfoByCode = houseLibraryService.selectHouseInfoByCode(houseId);
            HouseHouseExtended houseHouseExtended = houseExtendedService.selectHouseHouseExtendedById(selectHouseInfoByCode.getHe_id());
            houseHouseExtended.setHe_state("rental");
            houseExtendedService.updataInfo(houseHouseExtended);

            // 查询正在跟进的房屋修改为失败状态
            customerSeeMessage.setHi_code(houseId);
            List<CustomerSeeMessage> queryCustomerSeeMessageHouse = customerSeeMessageService.queryCustomerSeeMessageHouse(customerSeeMessage);
            for (CustomerSeeMessage customerSeeMessage2 : queryCustomerSeeMessageHouse) {
                customerSeeMessage2.setCsm_state(2);
                customerSeeMessage2.setCsm_reason("此房已出租");
                customerSeeMessageService.updateCustomerSeeMessage(customerSeeMessage2);
            }

        }

        if (bools) {
            cutomerStatisticsAdd(cookieEmployee.getEm_id());
        }

        if (bool > 0) {
            msg.setMsg("1");
            return msg.toString();
        } else {
            msg.setMsg("0");
            return msg.toString();
        }
    }

    /**
     * 根据客户带看编码查询修改数据
     *
     * @param id
     * @return
     * @author 陈智颖
     */
    @RequestMapping("updateSelect")
    @ResponseBody
    public Map<String, Object> updateSelect(Integer id) {

        Map<String, Object> map = new HashMap<>();
        CustomerSee customerSee = new CustomerSee();
        customerSee.setCsm_id(id);
        CustomerSee queryCustomerListID = customerSeeService.queryCustomerListID(customerSee);
        map.put("queryCustomerListID", queryCustomerListID);

        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setHi_code(queryCustomerListID.getHi_code());
        ViewBusinessContractVo businessContractVo = customerSeeService.selectViewContractListHouseIDs(contractVo);
        map.put("businessContractVo", businessContractVo);

        return map;
    }

    /**
     * 查询客户手机是否重复
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("customerPhoneBool")
    @ResponseBody
    public String customerPhoneBool(String phone, HttpServletRequest request) {

        Msg<Pagination<ViewBusinessContractVo>> msg = new Msg<Pagination<ViewBusinessContractVo>>();

        CustomerTrackMessage customerTrackMessage = new CustomerTrackMessage();
        customerTrackMessage.setCtm_phone(phone);
        customerTrackMessage = customerTrackMessageService.queryCustomerTrackMessagePhoneCount(customerTrackMessage);
        if (customerTrackMessage != null && customerTrackMessage.getSize() > 0) {
            msg.setMsg("0");
            return msg.toString();
        } else {
            msg.setMsg("1");
            return msg.toString();
        }
    }

    /**
     * 显示用户列表
     *
     * @param param
     * @param pageNo
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/userList")
    @ResponseBody
    public Map<String, Object> userList(String param, Integer pageNo, Integer state) {

        Map<String, Object> map = new HashMap<>();
        CustomerTrackMessage customerTrackMessage = new CustomerTrackMessage();
        customerTrackMessage.setCtm_name(param);
        customerTrackMessage.setCtm_phone(param);
        if (pageNo == 1) {
            customerTrackMessage.setPageNo(0);
        } else {
            customerTrackMessage.setPageNo((pageNo - 1) * 8);
        }

        UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();
        customerTrackMessage.setEm_id(cookieEmployee.getEm_id());

        customerTrackMessage.setPageSize(8);
        customerTrackMessage.setCtm_state(state);
        List<CustomerTrackMessage> queryCustomerTrackMessageList = customerTrackMessageService.queryCustomerTrackMessageList(customerTrackMessage);
        if (queryCustomerTrackMessageList.isEmpty()) {
            map.put("code", "0");
            return map;
        }

        customerTrackMessage.setCountSize((int) Math.ceil((float) queryCustomerTrackMessageList.get(0).getSize() / 8));
        customerTrackMessage.setSize(queryCustomerTrackMessageList.get(0).getSize());
        map.put("data", queryCustomerTrackMessageList);
        map.put("count", customerTrackMessage);

        return map;
    }

    /**
     * 显示内部用户列表
     *
     * @param param
     * @param pageNo
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/userEmList")
    @ResponseBody
    public Map<String, Object> userEmList(String param, Integer pageNo, Integer state, HttpServletRequest request) {

        Map<String, Object> map = new HashMap<>();
        UserCenterEmployee centerEmployee = new UserCenterEmployee();
        centerEmployee.setWhereList(param);
        if (pageNo == 1) {
            centerEmployee.setStart(0);
        } else {
            centerEmployee.setStart((pageNo - 1) * 8);
        }

        centerEmployee.setEnd(8);
        List<UserCenterEmployee> selectEmployee = customerTrackMessageService.queryEmName(centerEmployee);
        if (selectEmployee.isEmpty()) {
            map.put("code", "0");
            return map;
        }

        centerEmployee.setCountSize((int) Math.ceil((float) selectEmployee.get(0).getSize() / 8));
        centerEmployee.setSize(selectEmployee.get(0).getSize());
        map.put("data", selectEmployee);
        map.put("count", centerEmployee);

        return map;
    }

    /**
     * 查询房屋信息
     *
     * @param request
     * @param param
     * @param typeId
     * @return
     * @author JiangQT
     */
    @RequestMapping("queryHouseInfo")
    @ResponseBody
    public String queryHouseInfo(String param) {
        Msg<Object> msg = new Msg<>();
        Pagination<ViewBusinessContractVo> pagination = new Pagination<ViewBusinessContractVo>(1, 10);
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setCc_name(param);
        contractVo.setHouse_address(param);
        contractVo.setCcp_phone(param);
        pagination.setT(contractVo);
        pagination.setList(customerSeeService.selectViewContractListCUS(pagination));
        msg.setData(pagination);
        return msg.toString();
    }

    /**
     * 插入统计设置
     *
     * @param houseNum 统计设置类型
     * @param daiNum   统计设置个数
     * @param seeNum   统计设置时间
     * @return
     * @author 陈智颖
     */
    @RequestMapping("insertCustomerSettings")
    @ResponseBody
    public String insertCustomerSettings(Integer houseNum, Integer daiNum, Integer seeNum) {
        Msg<Pagination<ViewBusinessContractVo>> msg = new Msg<Pagination<ViewBusinessContractVo>>();

        Settings settings = new Settings();
        settings.setCss_type(0);
        Settings queryCustomerSettingsWhere = customerSettingsService.queryCustomerSettingsWhere(settings);
        Integer bool = 0;
        if (queryCustomerSettingsWhere == null) {
            for (int i = 0; i < 3; i++) {
                settings.setCss_type(i);
                if (i == 0) {
                    settings.setCss_num(houseNum);
                } else if (i == 1) {
                    settings.setCss_num(seeNum);
                } else {
                    settings.setCss_num(daiNum);
                }
                settings.setCss_time(new Date());
                bool = customerSettingsService.insertCustomerSettings(settings);
            }
        } else {
            for (int i = 0; i < 3; i++) {
                queryCustomerSettingsWhere.setCss_type(i);
                if (i == 0) {
                    queryCustomerSettingsWhere.setCss_num(houseNum);
                } else if (i == 1) {
                    queryCustomerSettingsWhere.setCss_num(seeNum);
                } else {
                    queryCustomerSettingsWhere.setCss_num(daiNum);
                }
                queryCustomerSettingsWhere.setCss_time(new Date());
                bool = customerSettingsService.updateCustomerSettings(queryCustomerSettingsWhere);
            }
        }

        if (bool > 0) {
            msg.setCode(1);
            return msg.toString();
        } else {
            msg.setCode(0);
            return msg.toString();
        }

    }

    /**
     * 插入统计设置
     *
     * @param houseNum 统计设置类型
     * @param daiNum   统计设置个数
     * @param seeNum   统计设置时间
     * @return
     * @author 陈智颖
     */
    @RequestMapping("selectCustomerSettings")
    @ResponseBody
    public Map<String, Object> selectCustomerSettings() {

        Map<String, Object> map = new HashMap<>();

        List<Settings> queryCustomerSettings = customerSettingsService.queryCustomerSettings();
        map.put("queryCustomerSettings", queryCustomerSettings);

        return map;
    }

    /**
     * 部门统计表
     *
     * @param type       统计类型
     * @param strDate    开始时间
     * @param strDateEnd 结束时间
     * @param request
     * @return
     * @throws ParseException
     * @author 陈智颖
     */
    @RequestMapping("/deprecationImage")
    @ResponseBody
    public Map<String, Object> deprecationImage(Integer type, String strDate, String strDateEnd, HttpServletRequest request) throws ParseException {

        Map<String, Object> map = new HashMap<>();

        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

        PageModel<Statistics> pageModel = new PageModel<Statistics>();

        Statistics statistics = new Statistics();
        statistics.setPcs_state(type);
        pageModel.setDateStart(sf.parse(strDate));
        pageModel.setDateEnd(sf.parse(strDateEnd));
        List<Statistics> statisticsList = new ArrayList<Statistics>();
        statisticsList = customerStatisticsService.queryCustomerStatisticsList(pageModel).getList();

        List<DNum_TJ> dNum_TJse = new ArrayList<DNum_TJ>();
        List<DNum_BM> bmse = new ArrayList<DNum_BM>();
        // 循环数据装入类中
        for (int i = 0; i < statisticsList.size(); i++) {
            DNum_BM bm = new DNum_BM();
            DNum_TJ dNum_TJ = new DNum_TJ();
            Boolean bool = false;
            Integer id = i;
            if (i == 0) {
                dNum_TJ.setCycle(statisticsList.get(i).getPcs_cycle());
                dNum_TJ.setCycleNum(statisticsList.get(i).getPcs_cycleNum());
                dNum_TJ.setId(i);
                dNum_TJse.add(dNum_TJ);

                bm.setDepartment(statisticsList.get(i).getEm_department());
                bm.setId(id);
                bm.setNum(statisticsList.get(i).getPcs_num());
                bmse.add(bm);
            } else {
                for (int k = 0; k < dNum_TJse.size(); k++) {
                    if (dNum_TJse.get(k).getCycleNum().equals(statisticsList.get(i).getPcs_cycleNum())) {
                        bool = true;
                        id = dNum_TJse.get(k).getId();
                        break;
                    }
                }
                if (bool == false) {
                    dNum_TJ.setCycle(statisticsList.get(i).getPcs_cycle());
                    dNum_TJ.setCycleNum(statisticsList.get(i).getPcs_cycleNum());
                    dNum_TJ.setId(i);
                    dNum_TJse.add(dNum_TJ);

                    bm.setDepartment(statisticsList.get(i).getEm_department());
                    bm.setId(i);
                    bm.setNum(statisticsList.get(i).getPcs_num());
                    bmse.add(bm);
                } else {
                    bm.setDepartment(statisticsList.get(i).getEm_department());
                    bm.setId(id);
                    bm.setNum(statisticsList.get(i).getPcs_num());
                    bmse.add(bm);
                }
            }
        }

        List<DNum_BM> bmse1 = new ArrayList<DNum_BM>();
        // 类中筛选周期数一样的人合并为一个部门数

        for (int i = 0; i < bmse.size(); i++) {
            String bms = "";
            int num = 0;
            DNum_BM bm = new DNum_BM();
            Boolean bool = false;
            int size = 0;
            num = bmse.get(i).getId();
            bms = bmse.get(i).getDepartment();
            for (int k = 0; k < bmse.size(); k++) {
                if (num == bmse.get(k).getId() && bms.equals(bmse.get(k).getDepartment())) {
                    size += bmse.get(k).getNum();
                    bmse.remove(k);
                    k = -1;
                    i = -1;
                    bool = true;
                }
            }
            if (bool) {
                bm.setDepartment(bms);
                bm.setId(num);
                bm.setNum(size);
                bmse1.add(bm);
            }
        }

        map.put("dNum_TJse", dNum_TJse);
        map.put("bmse1", bmse1);

        return map;
    }

    /**
     * 统计导出Excel表
     *
     * @param type       统计类型
     * @param strDate    开始时间
     * @param strDateEnd 结束时间
     * @param request
     * @return
     * @throws ParseException
     * @author 陈智颖
     */
    @RequestMapping("/toExcel")
    @ResponseBody
    public String toExcel(Integer type, String strDate, String strDateEnd, HttpServletRequest request) throws ParseException {

        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

        PageModel<Statistics> pageModel = new PageModel<Statistics>();

        String typeTitle = "";

        Msg<Pagination<ViewBusinessContractVo>> msg = new Msg<Pagination<ViewBusinessContractVo>>();

        Statistics statistics = new Statistics();
        String sType = "";
        if (type == 1) {
            sType = "录入";
        } else if (type == 2) {
            sType = "实勘";
        } else {
            sType = "带看";
        }
        statistics.setHt_type(sType);
        if (strDate == null || strDate == "") {
            msg.setCode(2);
            return msg.toString();
        }
        pageModel.setT(statistics);
        pageModel.setDateStart(sf.parse(strDate));
        pageModel.setDateEnd(sf.parse(strDateEnd));
        List<Statistics> statisticsList = new ArrayList<Statistics>();
        if (type == 3) {
            statisticsList = customerStatisticsService.queryCustomerStatisticsListSee(pageModel).getList();
        } else {
            statisticsList = customerStatisticsService.queryCustomerStatisticsList(pageModel).getList();
        }

        // 第一步，创建一个webbook，对应一个Excel文件
        HSSFWorkbook wb = new HSSFWorkbook();
        // 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet
        HSSFSheet sheet = wb.createSheet("数据统计");
        // 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short
        HSSFRow row = sheet.createRow((int) 0);
        // 第四步，创建单元格，并设置值表头 设置表头居中
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式

        HSSFCell cell = row.createCell(0);
        cell.setCellValue("编号");
        cell.setCellStyle(style);
        cell = row.createCell(1);
        cell.setCellValue("部门");
        cell.setCellStyle(style);
        cell = row.createCell(2);
        cell.setCellValue("负责人");
        cell.setCellStyle(style);
        cell = row.createCell(3);
        cell.setCellValue("职务");
        cell.setCellStyle(style);
        cell = row.createCell(4);
        cell.setCellValue("姓名");
        cell.setCellStyle(style);
        cell = row.createCell(5);
        cell.setCellValue("统计类型");
        cell.setCellStyle(style);
        cell = row.createCell(6);
        cell.setCellValue("次数/条数");
        cell.setCellStyle(style);

        // 第五步，写入实体数据 实际应用中这些数据从数据库得到，
        int i = 1;
        for (Statistics statistics2 : statisticsList) {
            row = sheet.createRow((int) i);
            // 第四步，创建单元格，并设置值
            row.createCell(0).setCellValue((int) i);
            row.createCell(1).setCellValue(statistics2.getUcc_name());
            row.createCell(2).setCellValue(statistics2.getUcc_corporation());
            row.createCell(3).setCellValue("托管顾问");
            row.createCell(4).setCellValue(statistics2.getEm_name());
            if (type.equals(1)) {
                typeTitle = "录入房屋";
                row.createCell(5).setCellValue("录入房屋");
            } else if (type.equals(2)) {
                typeTitle = "实勘房屋";
                row.createCell(5).setCellValue("实勘房屋");
            } else {
                typeTitle = "带看房屋";
                row.createCell(5).setCellValue("带看房屋");
            }

            if (statistics2.getNums() == null) {
                row.createCell(6).setCellValue(0);
            } else {
                row.createCell(6).setCellValue(statistics2.getNums());
            }
            i++;
        }
        System.out.println(typeTitle);
        // 第六步，将文件存到指定位置
        try {
            String fileName = (new Date()).getTime() + ".xls";
            String path = request.getSession().getServletContext().getRealPath("/");
            path += "/resources/excel";
            File file = new File(path);
            if (!file.exists()) {
                file.mkdir();
            }
            path += "/" + fileName;
            FileOutputStream fout = new FileOutputStream(path);
            wb.write(fout);
            fout.close();
            msg.setCode(1);
            msg.setMsg(fileName);
            return msg.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }

        msg.setCode(0);
        return msg.toString();
    }

}
