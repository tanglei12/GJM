package com.gjp.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.gjp.model.*;
import com.gjp.model.Company;
import com.gjp.service.*;
import com.gjp.util.*;
import com.gjp.util.bestsign.BestSignUtil;
import com.gjp.util.constant.Constant;
import com.gjp.util.oss.AliOSS;
import com.gjp.util.toPdf.HtmlToPdf;
import com.gjp.util.upload.URLUploadImage;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.springframework.stereotype.Controller;
import org.springframework.util.Base64Utils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Map.Entry;

/**
 * 合同对象
 *
 * @author JiangQt
 * @createTime 2015年12月11日下午2:11:05
 */
@Controller
@RequestMapping("/contractObject")
public class ContractController {

    // 内部职员
    @Resource
    private UserCenterEmployeeService employeeService;
    // 合同对象
    @Resource
    private ContractService contractService;
    // 执行记录附件
    @Resource
    private ContractAttachmentService contractAttachmentService;
    // 房屋基本
    @Resource
    private HousingAllocationService housingAllocationService;
    // 房源库
    @Resource
    private HouseLibraryService houseLibraryService;
    // 房屋交接（租赁）
    @Resource
    private PropertyTransferService propertyTransferService;
    // 房屋交接
    @Resource
    private PropertyTransferService handoverPropertyService;
    // 结算单
    @Resource
    private UserCenterStatementService statementService;
    // 房屋扩展
    @Resource
    private HouseExtendedService houseExtendedService;
    // 记录服务对象
    @Resource
    private RecordService recordService;
    // 产品库类型服务对象
    @Resource
    private BusinesTypeService businesTypeService;
    // 业绩
    @Resource
    private AchievementCompanyService achievementService;
    // 客户表
    @Resource
    private CustomerService customerService;
    // 财务管理服务
    @Resource
    private FinanceManageService financeManageService;
    // 房屋图片
    @Resource
    private HouseImageService houseImageService;
    // 同步发布到第三方
    @Resource
    private HousePartnerPublishService housePartnerPublishService;
    @Resource
    private UserDictionaryService userDictionaryService;
    @Resource
    private BestSignService bestSignService;
    @Resource
    private UserService userService;
    // 订单管理
    @Resource
    private BillContractOrderService billContractOrderService;
    // 支付宝房源更新
    @Resource
    private RentHouseService rentHouseService;

    /**
     * 【合同签订】显示合同数据列表
     */
    @RequestMapping("/contractObjectList")
    public ModelAndView contractObjectList(String mode) {
        ModelAndView view = new ModelAndView("/contract/contractList");
        if (StringUtils.isEmpty(mode) || "list".equals(mode)) {
            view.addObject("mode", "list");
            if (AppUtil.getAdminAuth()) {
                view.addObject("admin", 1);
            }
        } else if ("auditing".equals(mode)) {
            view.addObject("mode", "auditing");
        } else if ("review".equals(mode)) {
            view.addObject("mode", "review");
        }
        return view;
    }

    /**
     * 【合同签订】显示合同数据查看
     *
     * @return
     */
    @RequestMapping("/jumpDisplayContract")
    public ModelAndView jumpDisplayContract() {
        return new ModelAndView("/contract/contractInfo");
    }

    /**
     * 【合同签订】显示合同数据编辑
     *
     * @param contractObject_Code 合同编号
     * @param mode                合同管理模式(addTG(托管合同)/addZL/edit/renew/copy)
     * @return
     * @作者 JiangQT
     * @日期 2016年6月13日
     */
    @RequestMapping("/jumpAddContract")
    public ModelAndView jumpAddContract(String contractObject_Code, String mode) {
        ModelAndView view = new ModelAndView();
        if (!StringUtils.isEmpty(contractObject_Code)) {
            // 查询合同对象
            ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
            contractVo.setContractObject_Code(contractObject_Code);
            contractVo = contractService.selectContractObjectByCNo(contractVo);
            if (contractVo != null) {
                // 请求对应链接
                if (AppConfig.TYPE_CONTRACT_201.equals(contractVo.getContractObject_Type())) {
                    view.setViewName("/contract/contractEditTG");
                }
                if (AppConfig.TYPE_CONTRACT_202.equals(contractVo.getContractObject_Type())) {
                    view.setViewName("/contract/contractEditZL");
                }
            }
        } else {
            // 模式[托管合同]
            if (StringUtils.isEmpty(mode) || "addTG".equals(mode)) {
                view.setViewName("/contract/contractEditTG");
            }
            // 模式[租赁合同]
            if ("addZL".equals(mode)) {
                view.setViewName("/contract/contractEditZL");
            }
        }
        return view;
    }

    /**
     * 【合同签订】保存合同数据
     *
     * @param data
     * @return
     * @author JiangQT
     */
    @RequestMapping("/contractObjectSave")
    public @ResponseBody
    String contractObjectSave(@RequestBody JSONObject data) {
        Msg<Object> msg = new Msg<>();
        try {
            if (data == null) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }
            UserCenterEmployee employee = AppUtil.getCookieEmployee();
            if (employee == null) {
                return msg.toError(Msg.MSG_LOGIN_ERROR);
            }
            data.put("em_id", employee.getEm_id());

            ViewBusinessContractVo contractVo;
            switch (data.getString("mode")) {
                // 添加|续约|改签
                case "add":
                case "renew":
                case "change":
                    contractVo = contractService.addContractService(data);
                    msg.setData(contractVo);
                    break;
                // 编辑
                case "edit":
                    contractVo = contractService.updateContractService(data);
                    msg.setData(contractVo);
                    break;
                default:
                    return msg.toError("模式错误，请联系管理员");
            }

            // 【绑定证件】
            if (contractVo != null) {
                UserCustomer userCustomer2 = new UserCustomer();
                userCustomer2.setContractObject_code(contractVo.getContractObject_Code());
                List<UserCustomer> userCustomers = customerService.queryCustomerRelaContractList(userCustomer2);
                for (UserCustomer customer : userCustomers) {
                    if (customer.getCc_cardNum() == null) {
                        throw new AppException("请给该客户添加证件信息");
                    }
                    userService.insertCardContracts(customer.getCc_cardNum(), contractVo.getContractObject_Id());
                }
            }
        } catch (AppException e) {
            e.printStackTrace();
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    /**
     * 【合同签订】保存合同审核|复核数据
     *
     * @param request
     * @param cno
     * @param resultMsg
     * @return
     * @throws Exception
     * @作者 JiangQT
     */
    @RequestMapping("/contractAuditing")
    public @ResponseBody
    String contractAuditing(HttpServletRequest request, String cno, String con_code, String mode, Integer result, String resultMsg, Integer orderCost, String cooperater) throws Exception {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(mode) && StringUtils.isEmpty(cno) && StringUtils.isEmpty(con_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 查询合同信息
        ViewBusinessContractVo contractVo = null;
        if (!StringUtils.isEmpty(con_code)) {
            contractVo = new ViewBusinessContractVo();
            contractVo.setContractObject_Code(con_code);
            contractVo = contractService.selectContractObjectByCNo(contractVo);
        }
        if (!StringUtils.isEmpty(cno)) {
            contractVo = contractService.selectContractObjectByCNo(cno);
        }
        if (contractVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 【判断状态】
        if ("review".equals(mode)) {
            if (contractVo.getContractObject_OptionState() != AppConfig.contract_optionstate_104) {
                return msg.toError("该合同不需要复核或已复核，请刷新页面重试");
            }
            // 记录托管合同免租期、管理费、包修费等利润
            if (AppConfig.TYPE_CONTRACT_201.equals(contractVo.getContractObject_Type()) && "review".equals(mode)) {
                try {
                    HouseInfoKeep infoKeep = new HouseInfoKeep();
                    infoKeep.setBlance_date(contractVo.getContractObject_DeadlineTime());
                    infoKeep.setHi_code(contractVo.getHi_code());
                    houseLibraryService.updateHouseContractState(infoKeep);

                    houseLibraryService.addGrossProfitOfFreeTime(contractVo.getHi_code(), con_code);
                } catch (Exception e) {
                    e.printStackTrace();
                    System.out.println("生成利润亏损记录失败");
                }
            }
        }
        try {
            msg = contractService.updateContractAuditing(request, contractVo, mode, result, resultMsg, orderCost, cooperater);
            if (AppConfig.TYPE_CONTRACT_202.equals(contractVo.getContractObject_Type()) && "review".equals(mode)) {
                // 【会分期接口】
                try {
                    feedHouseToHfq(contractVo.getHi_code(), contractVo.getContractObject_Id());
                } catch (Exception e) {
                    e.printStackTrace();
                    System.out.println("会分期接口报错");
                }
                // 【计算新版房源利润】
                try {
                    achievementService.updateAchievementHouse(contractVo.getContractObject_No());
                } catch (Exception e) {
                    e.printStackTrace();
                    System.out.println("计算业绩失败");
                }

                // 【生成管家业绩】
                try {
                    Map<String, Object> upateAchievementRent = achievementService.upateAchievementRent(contractVo.getContractObject_No());
                    if ("error".equals(upateAchievementRent.get("message"))) {
                        System.out.println("计算合同招租期失败");
                    }
                    Map<String, Object> addAchievementStatistics = achievementService.addAchievementStatistics(contractVo.getContractObject_No(), 0.0);
                    if ("error".equals(addAchievementStatistics.get("message"))) {
                        System.out.println("计算业绩失败");
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    System.out.println("生成管家业绩失败");
                }

                HouseInfoKeep infoKeep = new HouseInfoKeep();
                infoKeep.setContract_outDate(contractVo.getContractObject_DeadlineTime());
                infoKeep.setHi_code(contractVo.getHi_code());
                houseLibraryService.updateHouseContractState(infoKeep);

                // 【利润亏损记录添加】
                try {
                    houseLibraryService.addProfitByZL(contractVo.getHi_code(), con_code);
                } catch (Exception e){
                    e.printStackTrace();
                    System.out.println("生成利润亏损记录失败");
                }
            }
        } catch (AppException e) {
            e.printStackTrace();
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    /**
     * 跳转--添加合同对象界面
     */
    @RequestMapping("/jumpItemAdd")
    public ModelAndView jumpItemAdd(String cno, String hicode) {
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_No(cno);
        contractVo.setHi_code(hicode);
        ViewBusinessContractVo businessContractVo = contractService.selectContractObjectByCNo(contractVo);
        HouseTypeVo typeVo = new HouseTypeVo();
        typeVo.setHt_parentId(2);
        List<HouseTypeVo> configTypeList = houseLibraryService.queryHouseConfigTypeList(typeVo);
        HouseTypeVo typeVo2 = new HouseTypeVo();
        typeVo2.setHt_parentId(201);
        List<HouseTypeVo> configTypeList2 = houseLibraryService.queryHouseConfigTypeList(typeVo2);
        ModelAndView view = new ModelAndView("/contract/itemAdds");
        view.addObject("businessContractVo", businessContractVo);
        view.addObject("configTypeList", configTypeList);
        view.addObject("configTypeList2", configTypeList2);
        return view;
    }

    /**
     * 跳转--合约审核/合约订单列表界面
     *
     * @param mode 模式
     * @return
     */
    @RequestMapping("/jumpCancelContractList")
    public ModelAndView jumpCancelContractList(String mode) {
        ModelAndView view = new ModelAndView("/contract/cancelContractList");
        if ("list".equals(mode)) { // 列表
            view.addObject("mode", "list");
        } else if ("accept".equals(mode)) {// 受理
            view.addObject("mode", "accept");
        } else if ("review".equals(mode)) { // 复核
            view.addObject("mode", "review");
        } else {
            view.addObject("mode", "list");
        }
        return view;
    }

    /**
     * 查询合约信息
     *
     * @param con_code 合同编号
     * @param mode     模式
     * @param em_id    管家ID
     * @return
     */
    @RequestMapping("/queryCancelContract")
    public @ResponseBody
    String queryCancelContract(String con_code, String mode, String em_id) {
        Msg<Object> msg = new Msg<>();
        HashMap<Object, Object> map = new HashMap<>();
        // 【1.查询合同信息】
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_Code(con_code);
        contractVo = contractService.selectContractObjectByCNo(contractVo);
        map.put("contractInfo", contractVo);
        if (contractVo == null) {
            return msg.toError("没有发现合同信息，请联系管理员");
        }

        // 【2.查询合约订单】
        ViewBusinessCancelContractListVo cancelContractListVo = new ViewBusinessCancelContractListVo();
        cancelContractListVo.setContractObject_Code(contractVo.getContractObject_Code());
        cancelContractListVo.setCco_state_no(AppConfig.CANCEL_CONTRACT_STATE_7);
        cancelContractListVo = contractService.queryCancelContractByCode(cancelContractListVo);
        map.put("cancelContract", cancelContractListVo);

        // 【3.判断模式】
        switch (mode) {
            case "auditing":
                if (AppConfig.TYPE_CONTRACT_201.equals(contractVo.getContractObject_Type())) {
                    map.put("payTypeList", contractService.selectContractTypeByParentId(1820));
                }
                if (AppConfig.TYPE_CONTRACT_202.equals(contractVo.getContractObject_Type())) {
                    map.put("payTypeList", contractService.selectContractTypeByParentId(1821));
                }
                break;
            case "payway":
                ContractOrderVo contractOrderVo = new ContractOrderVo();
                contractOrderVo.setContractObject_code(con_code);
                contractOrderVo.setBco_orderType(AppConfig.order_type_1);
                contractOrderVo = financeManageService.queryFinanceOrder(contractOrderVo);

                map.put("contractOrder", contractOrderVo);
                if (contractOrderVo != null) {

                    ContractBillVo contractBillVo = new ContractBillVo();
                    contractBillVo.setBco_code(contractOrderVo.getBco_code());
                    List<ContractBillVo> contractBillVos = financeManageService.queryFinanceBillList(contractBillVo);
                    map.put("contractBillList", contractBillVos);
                }

                String[] split = contractVo.getContractBody_StartTOEnd().split("~");
                map.put("startDate", split[0]);
                map.put("endDate", split[1]);
                // 支付方式类型列表
                map.put("payWayList", contractService.selectContractTypeByParentId(EnumTypeStatus.TYPE_PAYWAY.getId()));
                // 支付类型列表
                map.put("payTypeList", contractService.selectContractTypeByParentId(EnumTypeStatus.TYPE_PAYTYPE.getId()));
                break;
            default:
                if (AppConfig.TYPE_CONTRACT_201.equals(contractVo.getContractObject_Type())) {
                    map.put("payTypeList", contractService.selectContractTypeByParentId(1820));
                }
                if (AppConfig.TYPE_CONTRACT_202.equals(contractVo.getContractObject_Type())) {
                    map.put("payTypeList", contractService.selectContractTypeByParentId(1821));
                }
                break;
        }
        // （存房）客户信息
        UserCustomer customer = new UserCustomer();
        customer.setContractObject_code(con_code);
        customer.setCrc_role(0);
        List<UserCustomer> contractList = customerService.queryCustomerRelaContractList(customer);
        if (!contractList.isEmpty()) {
            customer = contractList.get(0);
            UserCustomerBank curtomerBank = new UserCustomerBank();
            curtomerBank.setCc_id(customer.getCc_id());
            customer.setCustomerBank(customerService.queryCustomerBank(curtomerBank));
            map.put("contractCustomer", customer);
        }

        if (!"".equals(em_id) && null != em_id) {
            UserCenterEmployee centerEmployee = new UserCenterEmployee();
            centerEmployee.setEm_id(Integer.parseInt(em_id));
            map.put("centerEmployee", employeeService.queryEmployeeInfo(centerEmployee));
        }
        return msg.toString(map);
    }

    /**
     * 跳转--合同信息附加
     *
     * @return
     * @Description:
     * @author JiangQt
     */
    @RequestMapping("/jumpContractAttach")
    public @ResponseBody
    ModelAndView jumpContractAttach(String con_code) {
        ModelAndView view = new ModelAndView("/contract/contractAttach");

        // 查询合同
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_Code(con_code);
        contractVo = contractService.selectContractObjectByCNo(contractVo);
        view.addObject("businessContractVo", contractVo);

        if (contractVo != null) {

            // 合同照片
            ContractImageVo imageVo = new ContractImageVo();
            imageVo.setContractObject_Code(contractVo.getContractObject_Code());
            List<ContractImageVo> contractImageList = contractService.queryContractImage(imageVo);
            List<ContractImageVo> wtsList = new ArrayList<>();
            List<ContractImageVo> fczList = new ArrayList<>();
            List<ContractImageVo> htzList = new ArrayList<>();
            List<ContractImageVo> sfzList = new ArrayList<>();
            for (ContractImageVo contractImageVo : contractImageList) {
                switch (contractImageVo.getCi_type()) {
                    case "WTS":
                        wtsList.add(contractImageVo);
                        break;
                    case "FCZ":
                        fczList.add(contractImageVo);
                        break;
                    case "HTZ":
                        htzList.add(contractImageVo);
                        break;
                    case "SFZ":
                        sfzList.add(contractImageVo);
                        break;
                }
            }
            view.addObject("wtsImgs", wtsList);
            view.addObject("fczImgs", fczList);
            view.addObject("htzImgs", htzList);
            view.addObject("sfzImgs", sfzList);

            // 合同主体
            UserCenterContractBody contractBody = contractService.queryContractBody(contractVo.getContractObject_Code());
            view.addObject("contractBody", contractBody);
            if (contractBody != null) {
                // 合同开始期限、结束期限
                String[] split = contractBody.getContractBody_StartTOEnd().split("~");
                view.addObject("contractStart", split[0]);
                view.addObject("contractEnd", split[1]);

                // 约定还款日期计算
                Date startPayTime = contractBody.getContractBody_StartPayTime();
                Calendar cal = Calendar.getInstance();
                cal.setTime(startPayTime);
                if ("月付".equals(contractBody.getContractBody_PayStyle())) {
                    cal.add(Calendar.DATE, -7);
                } else {
                    cal.add(Calendar.DATE, -15);
                }
                view.addObject("ydhkDate", cal.getTime());
            }
            // 管家信息
            ViewBusinessContractRelaEmpVo contractRelaEmpVo = new ViewBusinessContractRelaEmpVo();
            contractRelaEmpVo.setContractObject_No(contractVo.getContractObject_No());
            List<ViewBusinessContractRelaEmpVo> contractRelaEmp = contractService.queryViewContractRelaEmp(contractRelaEmpVo);
            view.addObject("contractRelaEmps", contractRelaEmp);
        }
        return view;
    }

    /**
     * 查询客户信息
     *
     * @param pageNo
     * @param cc_id_str
     * @return
     * @author JiangQT
     */
    @RequestMapping("/querySignInfo")
    public @ResponseBody
    String querySignInfo(String param, int pageNo, String cc_id_str) {
        Msg<Object> msg = new Msg<>();
        UserCustomer userCustomer = new UserCustomer();
        userCustomer.setCc_name(param);
        userCustomer.setCc_cardNum(param);
        userCustomer.setCcp_phone(param);
        if (!StringUtils.isEmpty(cc_id_str)) {
            List<Integer> cc_ids = JSONArray.parseArray(cc_id_str, Integer.class);
            userCustomer.setCc_ids(cc_ids);
        }
        Pagination<UserCustomer> pagination = new Pagination<>(pageNo, 8, userCustomer);
        pagination = customerService.queryCustomerInfoPageList(pagination);
        return msg.toString(pagination);
    }

    /**
     * 查询管家信息
     *
     * @param pageNo
     * @param ucc_short
     * @return
     * @author JiangQT
     */
    @RequestMapping("/queryEmpList")
    public @ResponseBody
    String queryEmpList(String param, int pageNo, String ucc_short, String ucc_name) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = new UserCenterEmployee();
        employee.setEm_state(1);
        employee.setUcc_short(ucc_short);
        employee.setUcc_name(ucc_name);
        employee.setEm_name(param);
        Pagination<UserCenterEmployee> pagination = new Pagination<>(pageNo, 8, employee);
        pagination.setList(employeeService.queryUserCenterEmployeeList(pagination), employeeService.queryUserCenterEmployeeTotalRecords(pagination));
        return msg.toString(pagination);
    }

    /**
     * 查询部门信息
     *
     * @param param
     * @param pageNo
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/queryDepartment")
    public @ResponseBody
    String queryDepartment(String param, int pageNo) {
        Msg<Object> msg = new Msg<>();
        Company company = new Company();
        company.setUcc_name(param);
        company.setUcc_person(param);
        company.setUcc_phone(param);
        Pagination<Company> pagination = new Pagination<>(pageNo, 8, company);
        pagination.setList(employeeService.queryDepartmentList(pagination), employeeService.queryDepartmentListNum(pagination));
        return msg.toString(pagination);
    }

    /**
     * 解约申请分页数据列表
     *
     * @return
     */
    @RequestMapping("/queryCancelContractList")
    public @ResponseBody
    Map<String, Object> queryCancelContractList(TableList tableList) {
        Msg<Object> msg = new Msg<>();

        Integer pageSize = Integer.valueOf(AppUtil.getCookie("pageSize"));
        Integer pageNo = tableList.getPageNo();
        tableList.initData();
        Pagination<ViewBusinessCancelContractListVo> pagination = contractService.queryCancelContractPageList(new Pagination<>(pageNo, pageSize, tableList));
        return msg.toMap(pagination);
    }

    /**
     * 解约申请分页数据列表
     *
     * @param pageNo   分页页码
     * @param pageSize 分页大小
     * @param state    条件：状态
     * @return
     */
    @RequestMapping("/querySettlementOrderList")
    public @ResponseBody
    String querySettlementOrderList(Integer pageNo, Integer pageSize, String state, String type, String screen, String hi_code) {
        Msg<Object> msg = new Msg<>();
        Pagination<ViewBusinessCancelContractListVo> pagination = new Pagination<>(pageNo, pageSize);
        ViewBusinessCancelContractListVo t = new ViewBusinessCancelContractListVo();
        t.setHi_code(hi_code);
        t.setCco_applicationType(type);
        if (!StringUtils.isEmpty(state)) {
            t.setCco_states(state.split(","));
        }
        t.setHouse_address(screen);
        pagination.setT(t);
        List<ViewBusinessCancelContractListVo> cancelContractList = contractService.queryCancelContractList(pagination);
        for (ViewBusinessCancelContractListVo contractListVo : cancelContractList) {
            UserCustomerPhone customerPhone = new UserCustomerPhone();
            customerPhone.setCc_id(Integer.valueOf(contractListVo.getCco_applicant()));
            customerPhone.setCcp_state(1);
            List<UserCustomerPhone> queryCustomerPhone = customerService.queryCustomerPhone(customerPhone);
            if (!queryCustomerPhone.isEmpty()) {
                contractListVo.setCcp_phone(queryCustomerPhone.get(0).getCcp_phone());
            }
        }
        pagination.setList(cancelContractList, contractService.queryCancelContractListTotalRecords(pagination));
        msg.setData(pagination);
        return msg.toString();
    }

    /**
     * 查询合约订单详细情况
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年8月8日
     */
    @RequestMapping("/queryCancelInfo")
    public @ResponseBody
    String queryCancelInfo(String cco_code) {
        Msg<HashMap<Object, Object>> msg = new Msg<>();
        HashMap<Object, Object> map = new HashMap<>();
        ViewBusinessCancelContractListVo cancelContractListVo = contractService.queryCancelContractByCode(cco_code);
        if (cancelContractListVo == null) {
            return msg.toError("没有发现该订单，请刷新页面或者联系管理员");
        }
        // 查询合约订单审核记录
        RecordContractOrderAuditingVo audtingVo = new RecordContractOrderAuditingVo();
        audtingVo.setCco_code(cco_code);
        List<RecordContractOrderAuditingVo> contractOrderRecordList = recordService.queryContractOrderRecordList(audtingVo);
        for (RecordContractOrderAuditingVo recordContractOrderAuditingVo : contractOrderRecordList) {
            if ("待交接".equals(recordContractOrderAuditingVo.getAuditingRecord_state())) {
                cancelContractListVo.setAuditingRecord_author1(recordContractOrderAuditingVo.getAuditingRecord_author());
            }
            if ("完成".equals(recordContractOrderAuditingVo.getAuditingRecord_state())) {
                cancelContractListVo.setAuditingRecord_author2(recordContractOrderAuditingVo.getAuditingRecord_author());
            }
        }
        map.put("cancelContract", cancelContractListVo);

        // 查询合同信息
        ViewBusinessContractVo businessContractVo = contractService.selectContractObjectByCNo(cancelContractListVo.getContractObject_No());
        if (businessContractVo != null) {
            UserCustomer customer = new UserCustomer();
            customer.setContractObject_code(businessContractVo.getContractObject_Code());
            List<UserCustomer> relaContractList = customerService.queryCustomerRelaContractList(customer);
            if (relaContractList.size() > 0) {
                customer = relaContractList.get(0);
                if (customer != null) {
                    UserCustomerBank customerBank = new UserCustomerBank();
                    customerBank.setCc_id(customer.getCc_id());
                    customer.setCustomerBank(customerService.queryCustomerBank(customerBank));
                }
                map.put("customer", customer);
            }
        }
        map.put("contract", businessContractVo);

        // 查询交接单
        UserCenterStatementVo statementVo = new UserCenterStatementVo();
        statementVo.setCco_code(cco_code);
        statementVo = statementService.queryStatementOrder(statementVo);
        map.put("statementOrder", statementVo);
        return msg.toString(map);
    }

    /**
     * 【房屋信息】-[合约订单]-[订单详情]-查询合约交房结算
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年8月8日
     */
    @RequestMapping("/queryContractStatementInfo")
    public @ResponseBody
    String queryContractStatementInfo(String con_code, String cco_code, String mode) {
        Msg<Object> msg = new Msg<>();
        HashMap<Object, Object> map = new HashMap<>();

        ViewBusinessCancelContractListVo cancelContractListVo = new ViewBusinessCancelContractListVo();

        if (!StringUtils.isEmpty(con_code)) {
            cancelContractListVo.setContractObject_Code(con_code);
            cancelContractListVo.setCco_state_no(AppConfig.CANCEL_CONTRACT_STATE_7);
        }
        if (!StringUtils.isEmpty(cco_code)) {
            cancelContractListVo.setCco_code(cco_code);
        }
        cancelContractListVo = contractService.queryCancelContractByCode(cancelContractListVo);
        if ("out".equals(mode)) {
            if (cancelContractListVo == null) {
                return msg.toError("该合同未招租，暂无结算单");
            }
            cco_code = cancelContractListVo.getCco_code();
            con_code = cancelContractListVo.getContractObject_Code();
        }

        // 【查询合同信息】
        ViewBusinessContractVo businessContractVo = new ViewBusinessContractVo();
        businessContractVo.setContractObject_Code(con_code);
        businessContractVo = contractService.selectContractObjectByCNo(businessContractVo);
        if (businessContractVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        map.put("contract", businessContractVo);

        // 【合同签订结算】
        if ("in".equals(mode)) {
            // 获取审核主管
            ContractAuditingRecordVo contractAuditingRecordVo = new ContractAuditingRecordVo();
            contractAuditingRecordVo.setContractObject_code(con_code);
            contractAuditingRecordVo.setAuditingRecord_content("审核通过");
            List<ContractAuditingRecordVo> auditingRecordList = contractService.queryContractAuditingRecordList(contractAuditingRecordVo);
            if (auditingRecordList != null && !auditingRecordList.isEmpty()) {
                businessContractVo.setUcc_corporation(auditingRecordList.get(0).getAuditingRecord_author());
            }
            // 财务复核人员信息
            contractAuditingRecordVo = new ContractAuditingRecordVo();
            contractAuditingRecordVo.setContractObject_code(con_code);
            contractAuditingRecordVo.setAuditingRecord_content("合同生效");
            auditingRecordList = contractService.queryContractAuditingRecordList(contractAuditingRecordVo);
            if (auditingRecordList != null && !auditingRecordList.isEmpty()) {
                businessContractVo.setEm_reviewer(auditingRecordList.get(0).getAuditingRecord_author());
            }
        }

        // 【合同招租结算】
        if ("out".equals(mode)) {
            // 查询合约订单信息
            cancelContractListVo = contractService.queryCancelContractByCode(cco_code);
            if (cancelContractListVo == null) {
                if (AppConfig.TYPE_CONTRACT_201.equals(businessContractVo.getContractObject_Type())) {
                    if (AppConfig.contract_optionstate_201 == businessContractVo.getContractObject_OptionState()) {
                        return msg.toError("该合同已续约，不会产生业主接房结算单");
                    }
                    if (AppConfig.contract_optionstate_106 == businessContractVo.getContractObject_OptionState()) {
                        return msg.toError("该合同没有解约，不会产生业主接房结算单");
                    }
                }
                if (AppConfig.TYPE_CONTRACT_202.equals(businessContractVo.getContractObject_Type())) {
                    if (AppConfig.contract_optionstate_201 == businessContractVo.getContractObject_OptionState()) {
                        return msg.toError("该合同已续约，不会产生租客交房结算单");
                    }
                    if (AppConfig.contract_optionstate_106 == businessContractVo.getContractObject_OptionState()) {
                        return msg.toError("该合同未招租，暂无结算单");
                    }
                }
                return msg.toError("没有发现该订单，请刷新页面或者联系管理员");
            }
            // 获取审核主管
            RecordContractOrderAuditingVo audtingVo = new RecordContractOrderAuditingVo();
            audtingVo.setCco_code(cco_code);
            audtingVo.setLike_auditingRecord_state("待复核");
            List<RecordContractOrderAuditingVo> contractOrderRecordList = recordService.queryContractOrderRecordList(audtingVo);
            if (!contractOrderRecordList.isEmpty()) {
                int index = 0;
                if (contractOrderRecordList.size() > 1) {
                    index = contractOrderRecordList.size() - 1;
                }
                businessContractVo.setUcc_corporation(contractOrderRecordList.get(index).getAuditingRecord_author());
            }
            // 财务复核人员信息
            audtingVo = new RecordContractOrderAuditingVo();
            audtingVo.setCco_code(cco_code);
            audtingVo.setLike_auditingRecord_state("完成");
            List<RecordContractOrderAuditingVo> contractOrderRecordList1 = recordService.queryContractOrderRecordList(audtingVo);
            if (!contractOrderRecordList1.isEmpty()) {
                int index = 0;
                if (contractOrderRecordList1.size() > 1) {
                    index = contractOrderRecordList1.size() - 1;
                }
                businessContractVo.setEm_reviewer(contractOrderRecordList1.get(index).getAuditingRecord_author());
            }
            map.put("cancelContract", cancelContractListVo);
        }

        // 【查询结算信息】
        UserCenterStatementVo statementVo = new UserCenterStatementVo();
        statementVo.setContractObject_code(con_code);
        statementVo.setStatement_state(0);
        statementVo.setStatement_type("in".equals(mode) ? 0 : 1);
        statementVo = statementService.queryStatementOrder(statementVo);
        map.put("statementOrder", statementVo);

        if (statementVo != null) {
            if (statementVo.getStatement_path() != null && !StringUtils.isEmpty(statementVo.getStatement_path())) {
                String[] imgs = statementVo.getStatement_path().split(";");
                StringBuilder imgss = new StringBuilder();
                for (String img : imgs) {
                    imgss.append(OSSparameter.imagePath(img, null, null)).append(";");
                }
                statementVo.setStatement_path(imgss.toString());
            }

            // 消费清单（消费结算、代理费结算、违约金结算）
            UserCenterStatementCostItemsVo costItemsVo = new UserCenterStatementCostItemsVo();
            costItemsVo.setStatement_code(statementVo.getStatement_code());
            List<UserCenterStatementCostItemsVo> statementCostItems = statementService.queryStatementCostItems(costItemsVo);
            map.put("statementCostItems", statementCostItems);

            // 物品清单
            UserCenterStatementDamageItemsVo damageItemsVo = new UserCenterStatementDamageItemsVo();
            damageItemsVo.setStatement_code(statementVo.getStatement_code());
            List<UserCenterStatementDamageItemsVo> statementDamageItems = statementService.queryStatementDamageItems(damageItemsVo);
            map.put("statementDamageItems", statementDamageItems);

            // 费用结余
            ContractStatementBalanceVo statementBalanceVo = new ContractStatementBalanceVo();
            statementBalanceVo.setStatement_code(statementVo.getStatement_code());
            List<ContractStatementBalanceVo> statementBalanceVos = statementService.queryStatementBalances(statementBalanceVo);
            map.put("statementBalances", statementBalanceVos);
        }

        // 【查询交接信息】
        // 能源卡卡号
        HandoverPropertyEnergyCardVo energyCardVo = new HandoverPropertyEnergyCardVo();
        energyCardVo.setHi_code(businessContractVo.getHi_code());
        List<HandoverPropertyEnergyCardVo> energyCardList = handoverPropertyService.queryHandoverPropertyEnergyCardList(energyCardVo);
        map.put("energyCardList", energyCardList);

        // 能源卡数值
        HandoverPropertyMainVo propertyMainVo = new HandoverPropertyMainVo();
        propertyMainVo.setContractObject_code(con_code);
        propertyMainVo.setHpm_state(0);
        propertyMainVo = propertyTransferService.queryHandoverPropertyMain(propertyMainVo);
        if (propertyMainVo != null) {
            energyCardVo = new HandoverPropertyEnergyCardVo();
            energyCardVo.setHpm_id(propertyMainVo.getHpm_id());
            energyCardVo.setHi_code(businessContractVo.getHi_code());
            List<HandoverPropertyEnergyCardVo> cardValueList = propertyTransferService.queryHandoverPropertyEnergyCardValueList(energyCardVo);
            map.put("cardValueList", cardValueList);
        }

        // 【查询客户信息】
        UserCustomer customer = new UserCustomer();
        customer.setContractObject_code(con_code);
        List<UserCustomer> customerRelaContractList = customerService.queryCustomerRelaContractList(customer);
        if (!customerRelaContractList.isEmpty()) {
            customer = customerRelaContractList.get(0);
            if (customer != null) {
                UserCustomerBank customerBank = new UserCustomerBank();
                customerBank.setCc_id(customer.getCc_id());
                customer.setCustomerBank(customerService.queryCustomerBank(customerBank));
            }
        }
        map.put("customer", customer);

        return msg.toString(map);
    }

    /**
     * 【房屋信息】-[合约订单]-[订单详情]-查询合约记录
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年8月8日
     */
    @RequestMapping("/queryCancelRecord")
    public @ResponseBody
    String queryCancelRecord(String cco_code) {
        Msg<Object> msg = new Msg<>();
        RecordContractOrderAuditingVo audtingVo = new RecordContractOrderAuditingVo();
        audtingVo.setCco_code(cco_code);
        List<RecordContractOrderAuditingVo> contractOrderRecordList = recordService.queryContractOrderRecordList(audtingVo);
        if (contractOrderRecordList.isEmpty()) {
            return msg.toError("没有发现合约记录");
        }
        return msg.toString(contractOrderRecordList);
    }

    /**
     * 计算账单日期
     *
     * @param startDate  开始日期
     * @param endDate    结束日期
     * @param monthCount 月份数
     * @return
     * @throws Exception
     * @author JiangQT
     */
    @RequestMapping("/calBillDate")
    public @ResponseBody
    String calBillDate(String startDate, String endDate, Integer monthCount) {
        Msg<List<String>> msg = new Msg<>();
        int month;
        Date date;
        try {
            date = AppUtil.sdf_date.parse(startDate);
            month = AppUtil.getMonth(startDate, endDate);
        } catch (Exception e) {
            System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()) + " [异常][/contractObject/calBillDate]参数错误" + ": startDate:" + startDate + ",endDate:" + endDate);
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        ArrayList<String> list = new ArrayList<>();
        int count = month / monthCount;
        for (int i = 0; i < count; i++) {
            Calendar cal = Calendar.getInstance();
            cal.setTime(date);
            cal.add(Calendar.MONTH, i * monthCount);
            list.add(AppUtil.sdf_date.format(cal.getTime()));
        }
        return msg.toString(month + "", list);
    }

    /**
     * 计算账单日期2
     *
     * @param startDate
     * @param monthCount
     * @return
     * @throws Exception
     * @author JiangQT
     */
    @RequestMapping("/calDate")
    public @ResponseBody
    String calBillDate2(String startDate, Integer monthCount) throws Exception {
        Msg<Object> msg = new Msg<>();
        Date date = AppUtil.sdf_date.parse(startDate);
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.MONTH, monthCount);
        c.add(Calendar.DAY_OF_MONTH, -1);
        msg.setData(AppUtil.sdf_date.format(c.getTime()));
        return msg.toString();
    }

    /**
     * 日期差
     *
     * @param startDate
     * @return
     * @throws Exception
     */
    @RequestMapping("/calDatedDiff")
    public @ResponseBody
    String calDatedDiff(String startDate, String endDate) throws Exception {
        Msg<Integer> msg = new Msg<>();
        if (StringUtils.isEmpty(startDate) || StringUtils.isEmpty(endDate)) {
            msg.setCode(110);
            return msg.toString();
        }
        int month = AppUtil.getMonth(AppUtil.sdf_date.parse(startDate), AppUtil.sdf_date.parse(endDate));
        msg.setData(month);
        return msg.toString();
    }

    /**
     * 查询客户信息
     *
     * @param cc_code
     * @return
     * @author JiangQT
     */
    @RequestMapping("/queryCustomerInfo")
    public @ResponseBody
    String queryCustomerInfo(String cc_code, String con_code) {
        Msg<Object> msg = new Msg<>();
        UserCustomer customer = new UserCustomer();
        if (!StringUtils.isEmpty(cc_code)) {
            customer = customerService.queryCustomerInfo(cc_code);
            if (customer != null) {
                customer.setCustomerBank(customerService.queryCustomerBank(customer.getCc_id()));
                // 图片
                UserCustomerImage customerImage = new UserCustomerImage();
                customerImage.setCc_id(customer.getCc_id());
                customerImage.setCci_state(0);
                customer.setCustomerImages(customerService.queryCustomerImage(customerImage));
                msg.setData(customer);
            } else {

                // 如非正式客户，则从意向客户中查询数据 shenhx 20170713
                UserCustomerIntention customerIntention = customerService.queryCustomerIntentionByCode(cc_code);
                if (null != customerIntention) {
                    List<UserCustomerImage> imgList = new ArrayList<>();
                    UserCustomerImage customerImage1 = new UserCustomerImage();
                    customerImage1.setCci_type("CD1");
                    customerImage1.setCci_path(customerIntention.getImg_card1());
                    imgList.add(customerImage1);
                    UserCustomerImage customerImage2 = new UserCustomerImage();
                    customerImage2.setCci_type("CD2");
                    customerImage2.setCci_path(customerIntention.getImg_card2());
                    imgList.add(customerImage2);

                    customerIntention.setCustomerImages(imgList);
                    msg.setData(customerIntention);
                }
            }
        }
        if (!StringUtils.isEmpty(con_code)) {
            customer = new UserCustomer();
            customer.setContractObject_code(con_code);
            customer.setCrc_role(0);
            List<UserCustomer> customers = customerService.queryCustomerRelaContractList(customer);
            for (UserCustomer userCustomer : customers) {
                userCustomer.setCustomerBank(customerService.queryCustomerBank(userCustomer.getCc_id()));
                // 图片
                UserCustomerImage customerImage = new UserCustomerImage();
                customerImage.setCc_id(userCustomer.getCc_id());
                customerImage.setCci_state(0);
                userCustomer.setCustomerImages(customerService.queryCustomerImage(customerImage));
            }
            msg.setData(customers);
        }
        return msg.toString();
    }

    /**
     * 查询房屋诚意金
     *
     * @param hicode
     * @return
     * @author JiangQT
     */
    @RequestMapping("queryHouseDepositMoney")
    public @ResponseBody
    String queryHouseDepositMoney(String hicode) {
        Msg<HoueFollowContent> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            msg.setCode(110);
            msg.setMsg(Msg.MSG_LOGIN_ERROR);
            return msg.toString();
        }
        HouseInfoKeep informationKeep = houseLibraryService.selectHouseInfoByCode(hicode);
        HoueFollowContent followContent = new HoueFollowContent();
        followContent.setGhf_id(informationKeep.getPhi_id());
        followContent = houseLibraryService.queryHouseFollowContent(followContent);
        msg.setData(followContent);
        return msg.toString();
    }

    /**
     * 查询账单List
     *
     * @param con_code 合同编号
     * @return
     */
    @RequestMapping("/queryContractBillList")
    public @ResponseBody
    String queryContractBillList(String con_code) {
        Msg<Object> msg = new Msg<>();
        Map<String, Object> map = new HashMap<>();
        if (StringUtils.isEmpty(con_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 查询订单
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setContractObject_code(con_code);
        contractOrderVo.setBco_orderType(AppConfig.order_type_1);
        contractOrderVo = financeManageService.queryFinanceOrder(contractOrderVo);
        if (contractOrderVo == null) {
            return msg.toString(111, "没有数据");
        }
        map.put("contractOrder", contractOrderVo);

        // 查询账单
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBco_code(contractOrderVo.getBco_code());
        List<ContractBillVo> contractBillList = financeManageService.queryContractBillListByTotal(contractBillVo);

        // 获取账单周期时间段
        int arrLen = contractBillList.size() - 1;
        Date repaymentEndDate = null;
        for (int i = arrLen; i >= 0; i--) {
            ContractBillVo contractBillVo2 = contractBillList.get(i);
            if (contractBillVo2.getBcb_type() == 0) {
                if (i == arrLen) {
                    ContractObjectVo contractObject2 = contractService.queryContractObject(contractOrderVo.getContractObject_code());
                    if (contractObject2 != null) {
                        contractBillVo2.setRepaymentEndDate(contractObject2.getContractObject_DeadlineTime());
                        repaymentEndDate = contractBillVo2.getBcb_repaymentDate();
                    }
                } else {
                    contractBillVo2.setRepaymentEndDate(repaymentEndDate);
                    repaymentEndDate = AppUtil.calendayDate(contractBillVo2.getBcb_repaymentDate(), Calendar.DATE, -1).getTime();
                }
            } else {
                if (i == arrLen) {
                    ContractObjectVo contractObject2 = contractService.queryContractObject(contractOrderVo.getContractObject_code());
                    if (contractObject2 != null) {
                        contractBillVo2.setRepaymentEndDate(contractObject2.getContractObject_DeadlineTime());
                        repaymentEndDate = contractObject2.getContractObject_DeadlineTime();
                    }
                } else {
                    contractBillVo2.setRepaymentEndDate(repaymentEndDate);
                }
            }
        }
        map.put("contractBillList", contractBillList);

        UserCenterStatementVo statementVo = new UserCenterStatementVo();
        statementVo.setContractObject_code(con_code);
        statementVo.setStatement_type(1);
        statementVo = statementService.queryStatementOrder(statementVo);
        map.put("statementOrder", statementVo);
        return msg.toString(map);
    }

    /**
     * 查询账单List
     *
     * @return
     * @author JiangQt
     */
    @RequestMapping("/queryBillForCode")
    public @ResponseBody
    Map<String, Object> queryBillForCode(String bcode, Integer bcycle) {
        Msg<Object> msg = new Msg<>();
        Map<String, Object> map = new HashMap<>();

        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBco_code(bcode);
        contractBillVo.setBcb_cycle(bcycle);
        List<ContractBillVo> contractBillList = financeManageService.queryFinanceBillList(contractBillVo);
        map.put("contractBillList", contractBillList);
        return msg.toMap(map);
    }

    /**
     * 查询房屋配置类型
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping("/queryHouseConfigType")
    public @ResponseBody
    String queryHouseConfigType(Integer parantId) {
        Msg<List<HouseTypeVo>> msg = new Msg<>();
        HouseTypeVo typeVo = new HouseTypeVo();
        typeVo.setHt_parentId(parantId);
        List<HouseTypeVo> configTypeList = houseLibraryService.queryHouseConfigTypeList(typeVo);
        msg.setData(configTypeList);
        return msg.toString();
    }

    /**
     * 查询预订订单
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping("/queryHouseInfo")
    public @ResponseBody
    String queryHouseInfo(String hiCode) {
        Msg<ViewProductHousePropertyListVo> msg = new Msg<>();
        ViewProductHousePropertyListVo propertyListVo = new ViewProductHousePropertyListVo();
        propertyListVo.setHi_code(hiCode);
        ViewProductHousePropertyListVo housePropertyListVo = houseLibraryService.queryViewProductHousePropertyByHiCode(propertyListVo);
        msg.setData(housePropertyListVo);
        return msg.toString();
    }

    /**
     * 查询预订订单
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping("queryReserveOrder")
    public @ResponseBody
    String queryReserveOrder(String param, int pageNo, String type) {
        Msg<Pagination<BillReserveOrderVo>> msg = new Msg<>();
        Pagination<BillReserveOrderVo> pagination = new Pagination<>(pageNo < 1 ? 1 : pageNo, 8);
        BillReserveOrderVo t = new BillReserveOrderVo();
        t.setRb_houseNum(param);
        t.setRb_name(param);
        t.setRb_phone(param);
        if ("公寓".equals(type)) {
            t.setHb_name(type);
        }
        t.setRb_state(AppConfig.RESERVEBILL_STATE_OK);
        pagination.setT(t);
        pagination.setList(contractService.selectReserveOrder(pagination));
        pagination.setTotalRecords(contractService.selectReserveOrderTotalRecords(pagination));
        msg.setData(pagination);
        return msg.toString();
    }

    /**
     * 查询房屋产权地址
     *
     * @param type   合同类型
     * @param hType  房屋类型
     * @param param  参数
     * @param renew  续约状态
     * @param pageNo 页码
     * @return
     */
    @RequestMapping("/queryHouseCode")
    public @ResponseBody
    String queryHouseCode(String type, String hType, String param, String renew, int pageNo) {
        Msg<Object> msg = new Msg<>();
        Pagination<ViewProductHousePropertyListVo> pagination = new Pagination<>(pageNo, 10);
        ViewProductHousePropertyListVo propertyListVo = new ViewProductHousePropertyListVo();
        propertyListVo.setHi_code(param);
        propertyListVo.setHe_peopleName(param);
        propertyListVo.setHi_address(param);
        propertyListVo.setPropertyInfo_address(param);
        // 托管
        if (AppConfig.TYPE_CONTRACT_201.equals(type)) {
            if ("续约".equals(renew)) {
                propertyListVo.setContract_intoStatus(AppConfig.contract_outStatus_5);
            } else {
                propertyListVo.setContract_intoStatus(AppConfig.contract_outStatus_1);
            }
            pagination.setT(propertyListVo);
            pagination.setList(houseLibraryService.queryViewProductHousePropertyList(pagination));
            pagination.setTotalRecords(houseLibraryService.queryViewProductHousePropertyListTotalRecords(pagination));
        }
        // 租赁
        if (AppConfig.TYPE_CONTRACT_202.equals(type)) {
            propertyListVo.setContract_intoStatus(AppConfig.contract_outStatus_5);
            if ("续约".equals(renew)) {
                propertyListVo.setContract_outStatus(AppConfig.contract_outStatus_5);
            } else {
                propertyListVo.setContract_outStatus(AppConfig.contract_outStatus_1);
            }
            if ("公寓".equals(hType)) {
                propertyListVo.setHb_name("公寓");
            } else {
                propertyListVo.setHb_name("普通");
            }
            pagination.setT(propertyListVo);
            pagination.setList(housingAllocationService.queryViewProductHousePropertyList(pagination));
            pagination.setTotalRecords(housingAllocationService.queryViewProductHousePropertyListTotalRecords(pagination));
        }
        msg.setData(pagination);
        return msg.toString();
    }

    /**
     * 查询合同类型
     *
     * @param id 类型父级编号
     * @return
     */
    @RequestMapping("/queryContractType")
    public @ResponseBody
    String queryContractType(Integer id) {
        Msg<Object> msg = new Msg<>();
        List<ContractType> list = contractService.selectContractTypeByParentId(id);
        return msg.toString(list);
    }

    /**
     * 作废合同
     *
     * @param cno 合同编号
     * @return
     */
    @RequestMapping("/cancelContract")
    public @ResponseBody
    String cancelContract(String cno) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(cno)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_No(cno);
        contractVo = contractService.selectContractObjectByCNo(contractVo);
        if (contractVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        switch (contractVo.getContractObject_State()) {
            case 2:
                // 更改合同状态（作废）
                ContractObjectVo userCenterContractObject = new ContractObjectVo();
                userCenterContractObject.setContractObject_Id(contractVo.getContractObject_Id());
                userCenterContractObject.setContractObject_State(AppConfig.con_state_4);
                contractService.updateContractObject(userCenterContractObject);

                // 更改房屋合同状态
                HouseInfoKeep informationKeep = new HouseInfoKeep();
                informationKeep.setHi_code(contractVo.getHi_code());
                if (AppConfig.TYPE_CONTRACT_201.equals(contractVo.getContractObject_Type())) {
                    informationKeep.setContract_intoStatus(AppConfig.contract_outStatus_1);
                    // 更改存房房屋状态（空闲）
                    HouseInfoKeep informationKeep2 = houseLibraryService.selectHouseInfoByCode(contractVo.getHi_code());
                    HouseHouseExtended houseHouseExtended = new HouseHouseExtended();
                    houseHouseExtended.setHe_id(informationKeep2.getHe_id());
                    houseHouseExtended.setHe_state("free");
                    houseExtendedService.updateSta(houseHouseExtended);
                }
                if (AppConfig.TYPE_CONTRACT_202.equals(contractVo.getContractObject_Type())) {
                    informationKeep.setContract_outStatus(AppConfig.contract_outStatus_1);
                    // 更改出房房屋状态（空闲）
                    HouseHouseInformation houseInformation = housingAllocationService.selectHouseInfoByCode(contractVo.getHi_code());
                    HouseHouseExtended houseHouseExtended = new HouseHouseExtended();
                    houseHouseExtended.setHe_id(houseInformation.getHe_id());
                    houseHouseExtended.setHe_state("free");
                    houseExtendedService.updateSta(houseHouseExtended);
                }
                houseLibraryService.updateHouseContractState(informationKeep);
                // 更改物品添置（解绑）
                ServicePurchaseItems purchaseItems = new ServicePurchaseItems();
                purchaseItems.setContractObject_No(cno);
                contractService.updatePurchaseItems(purchaseItems);
                msg.setMsg("作废成功");
                break;
            case 4:
                msg.toError("该合同已作废");
                break;
            default:
                msg.toError("该合同不能作废");
                break;
        }
        return msg.toString();
    }

    /**
     * 查询产品库类型字典
     *
     * @return
     */
    @RequestMapping("/queryBusinesType")
    public @ResponseBody
    String queryBusinesType(String type, Integer[] typeCodes) {
        Msg<List<BusinesTypeVo>> msg = new Msg<>();
        BusinesTypeVo businesTypeVo = new BusinesTypeVo();
        businesTypeVo.setType(type);
        List<Integer> types = new ArrayList<>();
        Collections.addAll(types, typeCodes);
        businesTypeVo.setTypes(types);
        businesTypeVo.setBt_parentCode(2);
        List<BusinesTypeVo> businesType = businesTypeService.queryBusinesType(businesTypeVo);
        msg.setData(businesType);
        return msg.toString();
    }

    /**
     * 查询合同信息
     *
     * @param cno
     * @param hi_code
     * @return
     * @author JiangQT
     */
    @RequestMapping("/queryContractInfo")
    public @ResponseBody
    String queryContractInfo(String con_code, String cno, String hi_code, String cc_code, Integer em_id) {
        Msg<Object> msg = new Msg<>();
        ViewHouseLibraryInfoVo libraryInfoVo = null;
        // 【添加模式】
        if (!StringUtils.isEmpty(hi_code)) {
            // 房源信息
            libraryInfoVo = houseLibraryService.queryHouseLibraryInfo(hi_code);
            msg.put("viewLibraryInfo", libraryInfoVo);

            if (libraryInfoVo != null) {
                UserCustomer customerInfo = customerService.queryCustomerInfo(libraryInfoVo.getCc_code());
                msg.put("customerInfo", customerInfo);
            }

            UserCustomer customer = new UserCustomer();
            customer.setCc_code(cc_code);
            customer = customerService.selectCustomerCode(customer);
            msg.put("zlUserInfo", customer);// 租客信息
        }

        // 【编辑模式】
        if (!StringUtils.isEmpty(con_code) || !StringUtils.isEmpty(cno)) {

            // 合同对象
            ContractObjectVo contractObject = new ContractObjectVo();
            if (!StringUtils.isEmpty(cno)) {
                contractObject.setContractObject_No(cno);
            }
            if (!StringUtils.isEmpty(con_code)) {
                contractObject.setContractObject_Code(con_code);
            }
            contractObject = contractService.queryContractObject(contractObject);
            if (contractObject == null) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }

            try {
                msg = contractService._queryContractInfo(contractObject.getContractObject_Code());
            } catch (AppException e) {
                e.printStackTrace();
                return msg.toError(e);
            } catch (Exception e) {
                e.printStackTrace();
                return msg.toError(e);
            }

            // 合同总租金
            ContractOrderVo contractOrderVo = new ContractOrderVo();
            contractOrderVo.setBco_orderType(AppConfig.order_type_1);
            contractOrderVo.setContractObject_code(contractObject.getContractObject_Code());
            contractOrderVo = financeManageService.queryFinanceOrder(contractOrderVo);
            if (contractOrderVo != null) {
                double totalRent = 0;
                ContractBillVo contractBillVo = new ContractBillVo();
                contractBillVo.setBco_code(contractOrderVo.getBco_code());
                List<ContractBillVo> financeBillList = financeManageService.queryFinanceBillList(contractBillVo);
                for (ContractBillVo contractBillVo1 : financeBillList) {
                    if (contractBillVo1.getBcb_type() == 0 && contractBillVo1.getBcb_repayment() != null) {
                        totalRent += contractBillVo1.getBcb_repayment().doubleValue();
                    }
                }
                msg.put("totalRent", totalRent);
            }

            // 查询房源归属
            PositionRecordVo positionRecordVo = new PositionRecordVo();
            positionRecordVo.setHi_code(contractObject.getHi_code());
            positionRecordVo = houseLibraryService.queryContractPositionRecord(positionRecordVo);
            msg.put("positionRecord", positionRecordVo);

            // 租赁时，托管期限
            if (AppConfig.TYPE_CONTRACT_202.equals(contractObject.getContractObject_Type())) {
                ViewBusinessContractVo viewBusinessContractVo = new ViewBusinessContractVo();
                viewBusinessContractVo.setHi_code(contractObject.getHi_code());
                viewBusinessContractVo.setContractObject_Type(AppConfig.TYPE_CONTRACT_201);
                List<ViewBusinessContractVo> contractViewList = contractService.selectContractViewList(viewBusinessContractVo);
                ArrayList<Date> list = new ArrayList<>();
                for (ViewBusinessContractVo businessContractVo : contractViewList) {
                    list.add(businessContractVo.getContractObject_Date());
                    list.add(businessContractVo.getContractObject_DeadlineTime());
                }
                HashMap<String, Date> map2 = new HashMap<>();
                if (!list.isEmpty()) {
                    Collections.sort(list);
                    map2.put("startDate", list.get(0));
                    map2.put("endDate", list.get(list.size() - 1));
                }
                msg.put("contractTGDate", map2);
            }

        }

        if (libraryInfoVo != null) {
            // 托管期限
            ViewBusinessContractVo viewBusinessContractVo = new ViewBusinessContractVo();
            viewBusinessContractVo.setHi_code(libraryInfoVo.getHi_code());
            viewBusinessContractVo.setContractObject_Type(AppConfig.TYPE_CONTRACT_201);
            List<ViewBusinessContractVo> contractViewList = contractService.selectContractViewList(viewBusinessContractVo);
            if (!contractViewList.isEmpty()) {
                ArrayList<Date> list = new ArrayList<>();
                for (ViewBusinessContractVo businessContractVo : contractViewList) {
                    list.add(businessContractVo.getContractObject_Date());
                    list.add(businessContractVo.getContractObject_DeadlineTime());
                }
                if (!list.isEmpty()) {
                    Collections.sort(list);
                    HashMap<String, Date> map2 = new HashMap<>();
                    map2.put("startDate", list.get(0));
                    map2.put("endDate", list.get(list.size() - 1));
                    msg.put("contractTGDate", map2);
                }
            }
        }
        //附加协议审核记录
        if (!StringUtils.isEmpty(con_code)) {
            List<ContractAgreementAuditingRecordVo> agreementAuditingRecordList = contractService.queryAgreementAuditingRecordList(con_code);
            //协议审核记录
            msg.put("agreementAuditingRecordList", agreementAuditingRecordList);
        }

        if (!StringUtils.isEmpty(em_id)) {
            // 签约代表
            UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
            userCenterEmployee.setEm_id(em_id);
            userCenterEmployee = employeeService.queryEmployeeInfo(userCenterEmployee);
            msg.put("contractor", userCenterEmployee);
        }
        //管家变更记录
        ViewBusinessContractVo contractVo = null;
        if (!StringUtils.isEmpty(con_code)) {
            contractVo = new ViewBusinessContractVo();
            contractVo.setContractObject_Code(con_code);
            contractVo = contractService.selectContractObjectByCNo(contractVo);
        }
        if (!StringUtils.isEmpty(cno)) {
            contractVo = contractService.selectContractObjectByCNo(cno);
        }
        if (contractVo != null) {
            UserContract userContract = new UserContract();
            userContract.setContractObject_Id(contractVo.getContractObject_Id());
            List<UserCenterHandoverContract> userCenterHandoverContracts = employeeService.queryHandoverRecordByConID(userContract);
            // 合同管家变更记录
            msg.put("userContractRecordList1", userCenterHandoverContracts.size());
        }
        // 合同期限初始值
        msg.put("contractLimitList", contractService.selectContractTypeByParentId(EnumTypeStatus.TYPE_CONTRACTLIMIT.getId()));
        // 房屋用途类型列表
        msg.put("houseUseList", contractService.selectContractTypeByParentId(EnumTypeStatus.TYPE_HOUSEUSE.getId()));
        // 支付方式类型列表
        msg.put("payWayList", contractService.selectContractTypeByParentId(EnumTypeStatus.TYPE_PAYWAY.getId()));
        // 支付类型列表
        msg.put("payTypeList", contractService.selectContractTypeByParentId(EnumTypeStatus.TYPE_PAYTYPE.getId()));
        // 押金支付方式
        msg.put("conPayTypeList", userDictionaryService.queryDictionaryByPropertyId("hi_price"));
        return msg.toString();
    }

    /**
     * 查询合同信息
     *
     * @param cno
     * @return
     * @author JiangQT
     */
    @RequestMapping("/queryTransferInfo")
    public @ResponseBody
    String queryTransferInfo(String cno, String con_code) {
        Msg<Object> msg = new Msg<>();

        // 查询合同信息
        ViewBusinessContractVo contractVo = null;
        if (!StringUtils.isEmpty(con_code)) {
            contractVo = new ViewBusinessContractVo();
            contractVo.setContractObject_Code(con_code);
            contractVo = contractService.selectContractObjectByCNo(contractVo);
        }
        if (!StringUtils.isEmpty(cno)) {
            contractVo = contractService.selectContractObjectByCNo(cno);
        }
        if (contractVo == null) {
            return msg.toError("没有发现该合同信息，请重试");
        }

        // 物业交接单
        HandoverPropertyMainVo propertyMainVo = new HandoverPropertyMainVo();
        propertyMainVo.setContractObject_code(contractVo.getContractObject_Code());
        propertyMainVo = handoverPropertyService.queryHandoverPropertyMain(propertyMainVo);
        msg.put("propertyMain", propertyMainVo);

        if (propertyMainVo != null) {
            // 钥匙
            houseKeyVo houseKey = new houseKeyVo();
            houseKey.setHi_code(contractVo.getHi_code());
            houseKey = houseLibraryService.queryHouseKeyInfo(houseKey);
            msg.put("houseKey", houseKey);

            // 能源卡&能源卡数据
            HandoverPropertyEnergyCardVo energyCardVo = new HandoverPropertyEnergyCardVo();
            energyCardVo.setHi_code(contractVo.getHi_code());
            energyCardVo.setHpm_id(propertyMainVo.getHpm_id());
            List<HandoverPropertyEnergyCardVo> propertyEnergyCardValueList = handoverPropertyService.queryHandoverPropertyEnergyCardValueList(energyCardVo);
            msg.put("propertyEnergyCardValueList", propertyEnergyCardValueList);

            // 交接物品
            HandoverPropertyGoodsVo propertyGoodsVo = new HandoverPropertyGoodsVo();
            propertyGoodsVo.setHpm_id(propertyMainVo.getHpm_id());
            List<HandoverPropertyGoodsVo> propertyGoodsList = handoverPropertyService.queryHandoverPropertyGoodsList(propertyGoodsVo);
            msg.put("propertyGoodsList", propertyGoodsList);

            // 房屋装饰情况
            HandoverPropertyDecorationVo propertyDecorationVo = new HandoverPropertyDecorationVo();
            propertyDecorationVo.setHpm_id(propertyMainVo.getHpm_id());
            List<HandoverPropertyDecorationVo> propertyDecorationList = handoverPropertyService.queryHandoverPropertyDecorationList(propertyDecorationVo);
            msg.put("propertyDecorationList", propertyDecorationList);

            // 添置物品
            // ViewItemsInventoryVo itemsInventoryVo = new
            // ViewItemsInventoryVo();
            // itemsInventoryVo.setContractObject_code(contractVo.getContractObject_Code());
            // List<ViewItemsInventoryVo> itemsInventoryVos =
            // inventoryService.queryViewItemsInventoryList(itemsInventoryVo);
            // json.put("itemsInventorys", itemsInventoryVos);
        }
        return msg.toString();
    }

    /**
     * 查询合同记录
     *
     * @param cno
     * @return
     * @作者 JiangQT
     * @日期 2016年7月17日
     */
    @RequestMapping("/queryContractRecord")
    public @ResponseBody
    String queryContractRecord(String cno, String con_code) {
        Msg<Object> msg = new Msg<>();
        // 查询合同信息
        ViewBusinessContractVo contractVo = null;
        if (!StringUtils.isEmpty(con_code)) {
            contractVo = new ViewBusinessContractVo();
            contractVo.setContractObject_Code(con_code);
            contractVo = contractService.selectContractObjectByCNo(contractVo);
        }
        if (!StringUtils.isEmpty(cno)) {
            contractVo = contractService.selectContractObjectByCNo(cno);
        }
        if (contractVo == null) {
            return msg.toError("没有发现该合同信息，请重试");
        }
        if (contractVo != null) {
            // 合同记录
            msg.put("auditingRecordList", contractService.queryContractAuditingRecordList(contractVo.getContractObject_Code()));
            // 执行记录
            msg.put("implementRecordList", contractService.queryContractImplementRecordList(contractVo.getContractObject_Code()));
        }
        return msg.toString();
    }

    /**
     * 查询合同记录
     *
     * @param cno
     * @return
     * @作者 shenhx
     * @日期 20170520
     */
    @RequestMapping("/queryUserContractRecord")
    public @ResponseBody
    String queryUserContractRecord(String cno, String con_code) {
        Msg<Object> msg = new Msg<>();
        // 查询合同信息
        ViewBusinessContractVo contractVo = null;
        if (!StringUtils.isEmpty(con_code)) {
            contractVo = new ViewBusinessContractVo();
            contractVo.setContractObject_Code(con_code);
            contractVo = contractService.selectContractObjectByCNo(contractVo);
        }
        if (!StringUtils.isEmpty(cno)) {
            contractVo = contractService.selectContractObjectByCNo(cno);
        }
        if (contractVo != null) {
            UserContract userContract = new UserContract();
            userContract.setContractObject_Id(contractVo.getContractObject_Id());
            // 合同管家变更记录
            msg.put("userContractRecordList", employeeService.queryHandoverRecordByConID(userContract));
        }
        return msg.toString();
    }

    /**
     * 查询合同记录
     *
     * @param cno
     * @return
     * @作者 JiangQT
     * @日期 2016年7月17日
     */
    @RequestMapping("/queryHandover")
    public @ResponseBody
    String queryHandover(String cno) {
        Msg<Object> msg = new Msg<>();
        HashMap<String, Object> map = new HashMap<>();
        ViewBusinessContractVo contractVo = contractService.selectContractObjectByCNo(cno);
        if (contractVo != null) {

            // 合同记录
            map.put("auditingRecordList", contractService.queryContractAuditingRecordList(contractVo.getContractObject_Code()));
            // 执行记录
            map.put("implementRecordList", contractService.queryContractImplementRecordList(contractVo.getContractObject_Code()));
        }
        msg.setData(map);
        return msg.toString();
    }

    // ==================HOUSE QUERY================== //

    /**
     * 查询房屋信息
     *
     * @param hi_code
     * @return
     * @作者 JiangQT
     * @日期 2016年6月13日
     */
    @RequestMapping("/queryHouseInfoList")
    public @ResponseBody
    String queryHouseInfoList(String hi_code, Integer hi_id) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(hi_id) && StringUtils.isEmpty(hi_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        ViewHouseLibraryInfoVo houseLibraryInfoVo = new ViewHouseLibraryInfoVo();
        if (!StringUtils.isEmpty(hi_id)) {
            houseLibraryInfoVo.setHi_id(hi_id);
        }
        if (!StringUtils.isEmpty(hi_code)) {
            houseLibraryInfoVo.setHi_code(hi_code);
        }
        msg.put("viewLibraryInfo", houseLibraryService.queryHouseLibraryInfo(houseLibraryInfoVo));
        msg.put("contractLimitList", contractService.selectContractTypeByParentId(EnumTypeStatus.TYPE_CONTRACTLIMIT.getId()));
        return msg.toString();
    }

    /**
     * 查询房屋合同列表信息
     *
     * @param hi_code
     * @return
     * @作者 JiangQT
     * @日期 2016年6月13日
     */
    @RequestMapping("/queryHouseContractInfoList")
    public @ResponseBody
    String queryHouseContractInfoList(String hi_code) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(hi_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        ViewHouseLibraryInfoVo libraryInfo = houseLibraryService.queryHouseLibraryInfo(hi_code);
        msg.put("libraryInfo", libraryInfo);

        // 【查询合同列表】
        ViewBusinessContractVo viewBusinessContractVo = new ViewBusinessContractVo();
        viewBusinessContractVo.setHi_code(hi_code);
        List<ViewBusinessContractVo> businessContractVos = contractService.selectContractViewList(viewBusinessContractVo);
        if (businessContractVos == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        Date contractStartDate = null;
        int size = businessContractVos.size();
        int index = 0; // 最后一份托管合同编号
        for (int i = 0; i < businessContractVos.size(); i++) {
            ViewBusinessContractVo businessContractVo = businessContractVos.get(i);
            if (AppConfig.TYPE_CONTRACT_201.equals(businessContractVo.getContractObject_Type())) {
                if (businessContractVo.getContractObject_Successor() == 0) {
                    if (i < (size - 1)) {
                        contractStartDate = businessContractVo.getContractObject_Date();
                    } else {
//                        businessContractVo.setContract_forRentDate(AppUtil.getDay(businessContractVo.getContractObject_Date(), new Date()));
                    }
                }

                index = i;
//                if(i == size - 1){
                    int con_state = businessContractVo.getContractObject_State().intValue();
                    boolean isConState = AppConfig.con_state_2 == con_state || AppConfig.con_state_2 == con_state;

                    int ext_state = businessContractVo.getContractObject_ExtState().intValue();
                    boolean isExtState = AppConfig.contract_extstate_10 == ext_state || AppConfig.contract_extstate_12 == ext_state;

                    int opt_state = businessContractVo.getContractObject_OptionState();
                    boolean isOPtState = AppConfig.contract_optionstate_106 == opt_state || AppConfig.contract_optionstate_201 == opt_state;

                    if(isConState && isExtState && isOPtState){
                        HouseInfoKeep infoKeep = contractService.queryVacantHouseByCode(businessContractVo.getHi_code());
                        if(null != infoKeep){
                            Date start_date = null;
                            switch (infoKeep.getHi_forRentState()){
                                /**
                                 *  新存招租：1001 取托管合同时间
                                 */
                                case AppConfig.hi_forRentState_1001:
                                    start_date = businessContractVo.getContractObject_Date();
                                    break;

                                /**
                                 * 退租招租：1003；强收招租：1005 取合约交房日期
                                 */
                                case AppConfig.hi_forRentState_1003:
                                case AppConfig.hi_forRentState_1005:
                                    // 获取租赁合同
                                    ViewBusinessContractVo contractZLVo = new ViewBusinessContractVo();
                                    contractZLVo.setHi_code(infoKeep.getHi_code());
                                    contractZLVo.setContractObject_Type("租赁合同");
                                    List<ViewBusinessContractVo> contractZLVos = contractService.queryContractNotObsolute(contractZLVo);

                                    BusinessCancelContractOrder contractOrder = new BusinessCancelContractOrder();
                                    contractOrder.setContractObject_Code(contractZLVos.get(0).getContractObject_Code());
                                    contractOrder.setCco_state_no("取消");
                                    contractOrder = contractService.queryCancelContractByWhere(contractOrder);

                                    start_date = contractOrder.getStatement_handoverDate();
                                    break;

                                /**
                                 * 到期招租：1004 取租赁合同结束后一天时间
                                 */
                                case AppConfig.hi_forRentState_1004:
                                    ViewBusinessContractVo contractZLVo2 = new ViewBusinessContractVo();
                                    contractZLVo2.setHi_code(infoKeep.getHi_code());
                                    contractZLVo2.setContractObject_Type("租赁合同");
                                    List<ViewBusinessContractVo> contractZLVos2 = contractService.queryContractNotObsolute(contractZLVo2);

                                    start_date = DataUtil.getAfterDateByYear("D", contractZLVos2.get(0).getContractObject_DeadlineTime(), 1);
                                    break;

                                /**
                                 * 换房招租：1006 TODO 暂时空起
                                 */
                                case AppConfig.hi_forRentState_1006:
                                    break;

                            }
                            if(null != start_date){
                                businessContractVo.setContract_forRentDate(AppUtil.getDay(start_date, new Date()));
                            }
                        }
                    }
//                }
            }
        }
        for (int i = 0; i < businessContractVos.size(); i++) {
            ViewBusinessContractVo businessContractVo = businessContractVos.get(i);
            if (AppConfig.TYPE_CONTRACT_202.equals(businessContractVo.getContractObject_Type())) {
                // 计算招租期
                if (businessContractVo.getContractObject_State() != 4) {
                    if (businessContractVo.getContractObject_Successor() == 0) {
                        // 如不是最后一份租赁合同，计算招租期，否则计算空置期
                        if (i < (size - 1)) {
                            if (contractStartDate != null) {
                                int day = AppUtil.getDay(contractStartDate, businessContractVo.getContractObject_Date());
                                businessContractVo.setContract_forRentDate(day > 0 ? day - 1 : day);
                            }
                            contractStartDate = businessContractVo.getCco_handleDate();
                        } else {
                            if (contractStartDate == null) {
                                businessContractVo.setContract_forRentDate(0);
                            } else {
                                int day = AppUtil.getDay(contractStartDate, businessContractVo.getContractObject_Date());
                                businessContractVo.setContract_forRentDate(day > 0 ? day - 1 : day);
                            }
                            if (businessContractVo.getContractObject_State() != 1 && businessContractVo.getContractObject_OptionState() != 106) {
                                if (contractStartDate != null) {
                                    int day = AppUtil.getDay(contractStartDate, new Date());
//                                    businessContractVos.get(index).setContract_forRentDate(day > 0 ? day - 1 : day);
                                }
                            }
                        }
                    } else {
                        if (i < (size - 1)) {
                            if (contractStartDate == null) {
                                businessContractVo.setContract_forRentDate(0);
                            } else {
                                int day = AppUtil.getDay(contractStartDate, businessContractVo.getContractObject_Date());
                                businessContractVo.setContract_forRentDate(day > 0 ? day - 1 : day);
                            }
                            contractStartDate = businessContractVo.getCco_handleDate();
                        } else {
                            // 最后合同如果是正常就计算招租期，否则（招租）计算房屋空置期
                            if (contractStartDate == null) {
                                businessContractVo.setContract_forRentDate(0);
                            } else {
                                int day = AppUtil.getDay(contractStartDate, businessContractVo.getContractObject_Date());
                                businessContractVo.setContract_forRentDate(day > 0 ? day - 1 : day);
                            }
                            if (businessContractVo.getContractObject_State() != 1 && businessContractVo.getContractObject_OptionState() != 106) {
                                int day = AppUtil.getDay(businessContractVo.getCco_handleDate(), new Date());
//                                businessContractVos.get(index).setContract_forRentDate(day > 0 ? day - 1 : day);
                            }
                        }
                    }
                }
                // 查询业绩
                AchievementSumAchievement sumAchievement = new AchievementSumAchievement();
                sumAchievement.setContractObject_Id(businessContractVo.getContractObject_Id());
                List<AchievementSumAchievement> achievements = achievementService.selectAchievementSumAchievement(sumAchievement);
                if (!achievements.isEmpty()) {
                    businessContractVo.setAb_subMoney(achievements.get(0).getSa_sumMoney());
                    businessContractVo.setSa_sumMoneyH(achievements.get(0).getSa_sumMoneyH());
                    businessContractVo.setSa_id(achievements.get(0).getSa_id());
                }
            }
            // 查询客户电话
            UserCustomer customerInfo = customerService.queryCustomerInfo(businessContractVo.getContractObject_1st());
            if (customerInfo != null) {
                businessContractVo.setCustomerPhones(customerService.queryCustomerPhone(customerInfo.getCc_id()));
            }
        }
        msg.put("viewContractInfo", businessContractVos);
        return msg.toString();
    }

    /**
     * 【图表】--房屋信息-交租走势
     *
     * @param con_code
     * @return
     * @作者 JiangQT
     * @日期 2016年6月13日
     */
    @RequestMapping("/queryContractRent")
    public @ResponseBody
    String queryContractRent(String con_code) {
        Msg<Object> msg = new Msg<>();
        HashMap<Object, Object> map = new HashMap<>();

        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setContractObject_code(con_code);
        contractOrderVo = financeManageService.queryFinanceOrder(contractOrderVo);
        if (contractOrderVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBco_code(contractOrderVo.getBco_code());
        List<ContractBillVo> contractBillList = financeManageService.queryFinanceBillList(contractBillVo);
        map.put("contractBillList", contractBillList);
        return msg.toString(map);
    }

    /**
     * 【图表】--房屋信息-现金收支
     *
     * @param hi_code
     * @return
     * @作者 JiangQT
     * @日期 2016年6月13日
     */
    @RequestMapping("/queryContractCash")
    public @ResponseBody
    String queryContractCash(String hi_code) {
        Msg<Object> msg = new Msg<>();
        Map<String, List<Object>> map = new HashMap<>();
        StringBuilder keys = new StringBuilder();

        // 通过房屋编号查询合同列表
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setHi_code(hi_code);
        List<ViewBusinessContractVo> contractViewList = contractService.selectContractViewList(contractVo);
        for (ViewBusinessContractVo viewBusinessContractVo : contractViewList) {
            ContractOrderVo contractOrderVo = new ContractOrderVo();
            contractOrderVo.setContractObject_code(viewBusinessContractVo.getContractObject_Code());
            contractOrderVo = financeManageService.queryFinanceOrder(contractOrderVo);
            if (contractOrderVo != null) {
                ContractBillVo contractBillVo = new ContractBillVo();
                contractBillVo.setBco_code(contractOrderVo.getBco_code());
                List<ContractBillVo> contractBillList = financeManageService.queryFinanceBillList(contractBillVo);
                // 处理数据
                for (ContractBillVo contractBillVo2 : contractBillList) {
                    if (contractBillVo2.getBcb_realPaymentDate() != null) {
                        String mapKey = AppUtil.sdf_date.format(contractBillVo2.getBcb_realPaymentDate());
                        if (keys.toString().contains(mapKey)) {
                            Map<Object, Object> subMap = new HashMap<>();
                            subMap.put(contractBillVo2.getBcb_type() + "", -contractBillVo2.getBcb_realPayment().doubleValue());
                            map.get(mapKey).add(subMap);
                        } else {
                            Map<Object, Object> subMap = new HashMap<>();
                            subMap.put(contractBillVo2.getBcb_type() + "", -contractBillVo2.getBcb_realPayment().doubleValue());
                            List<Object> list = new ArrayList<>();
                            list.add(subMap);
                            map.put(mapKey, list);
                            keys.append(mapKey).append(";");
                        }
                    }
                }
            }
        }
        List<Map.Entry<String, List<Object>>> mappingList = new ArrayList<>(map.entrySet());
        mappingList.sort(new Comparator<Entry<String, List<Object>>>() {
            public int compare(Entry<String, List<Object>> mapping1, Entry<String, List<Object>> mapping2) {
                return mapping1.getKey().compareTo(mapping2.getKey());
            }
        });
        return msg.toString(mappingList);
    }

    /**
     * 【图表】--房屋信息-招租监控
     *
     * @param hi_code
     * @return
     * @作者 JiangQT
     * @日期 2016年6月13日
     */
    @RequestMapping("/queryContractForRent")
    public @ResponseBody
    String queryContractForRent(String hi_code) {
        Msg<Object> msg = new Msg<>();
        Map<String, Object> map = new HashMap<>();
        List<Object> xlist = new ArrayList<>();
        List<Object> zlist = new ArrayList<>();
        List<Object> klist = new ArrayList<>();

        // 通过房屋编号查询合同列表
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setHi_code(hi_code);
        List<ViewBusinessContractVo> contractViewList = contractService.selectContractViewList(contractVo);
        // 排序
        Collections.sort(contractViewList);
        // 数据处理
        List<ViewBusinessContractVo> contractViewListTG = new ArrayList<>();
        List<ViewBusinessContractVo> contractViewListZL = new ArrayList<>();

        for (ViewBusinessContractVo viewBusinessContractVo : contractViewList) {
            if (AppConfig.TYPE_CONTRACT_201.equals(viewBusinessContractVo.getContractObject_Type())) {
                contractViewListTG.add(viewBusinessContractVo);
            }
            if (AppConfig.TYPE_CONTRACT_202.equals(viewBusinessContractVo.getContractObject_Type())) {
                contractViewListZL.add(viewBusinessContractVo);
            }
        }
        ViewBusinessContractVo businessContractTG = contractViewListTG.get(0);
        Date startDate = businessContractTG.getContractObject_Date();
        xlist.add(AppUtil.sdf_date.format(startDate)); // 1
        zlist.add(0);
        klist.add(0);

        if (!contractViewListZL.isEmpty()) {
            String cacheType = "";
            for (int i = 0; i < contractViewListZL.size(); i++) {
                ViewBusinessContractVo businessContractVo = contractViewListZL.get(i);
                String cco_applicationType = businessContractVo.getCco_applicationType();

                Date cco_handleDate = businessContractVo.getCco_handleDate();
                Date contract_Date = businessContractVo.getContractObject_Date();

                boolean isLast = (i == contractViewListZL.size() - 1);
                // boolean isZLLast = (i == contractViewListZL.size() - 1 &&
                // businessContractVo.getContractObject_OptionState() != 106);

                int extState = businessContractVo.getContractObject_ExtState();

                switch (cacheType) {
                    case "转租":
                        xlist.add(AppUtil.sdf_date.format(contract_Date)); // 2~n
                        zlist.add(AppUtil.getDay(startDate, contract_Date));
                        klist.add(0);
                        if (cco_applicationType == null) {
                            // 当前合同续约
                            if (extState == 12 || extState == 22) {
                                cacheType = "续约";
                            }
                        } else {
                            cacheType = cco_applicationType;
                            startDate = cco_handleDate;
                        }
                        break;
                    case "退租":
                        xlist.add(AppUtil.sdf_date.format(contract_Date)); // 2~n
                        zlist.add(AppUtil.getDay(startDate, contract_Date));
                        klist.add(AppUtil.getDay(startDate, contract_Date));
                        if (cco_applicationType == null) {
                            // 当前合同续约
                            if (extState == 12 || extState == 22) {
                                cacheType = "续约";
                            }
                        } else {
                            cacheType = cco_applicationType;
                            startDate = cco_handleDate;
                        }
                        break;
                    case "到期":
                        xlist.add(AppUtil.sdf_date.format(contract_Date)); // 2~n
                        zlist.add(AppUtil.getDay(startDate, contract_Date));
                        klist.add(AppUtil.getDay(startDate, contract_Date));
                        if (cco_applicationType == null) {
                            // 当前合同续约
                            if (extState == 12 || extState == 22) {
                                cacheType = "续约";
                            }
                        } else {
                            cacheType = cco_applicationType;
                            startDate = cco_handleDate;
                        }
                        break;
                    case "续约":

                        break;
                    default:
                        if (isLast) {
                            xlist.add(AppUtil.sdf_date.format(new Date())); // 2
                            zlist.add(AppUtil.getDay(startDate, new Date()));
                            klist.add(AppUtil.getDay(startDate, new Date()));
                        } else {
                            xlist.add(AppUtil.sdf_date.format(contract_Date)); // 2
                            zlist.add(AppUtil.getDay(startDate, contract_Date));
                            klist.add(AppUtil.getDay(startDate, contract_Date));
                        }
                        if (cco_applicationType == null) {
                            // 当前合同续约
                            if (extState == 12 || extState == 22) {
                                cacheType = "续约";
                            }
                        } else {
                            cacheType = cco_applicationType;
                            startDate = cco_handleDate;
                        }
                        break;
                }
            }
        } else {
            xlist.add(AppUtil.sdf_date.format(new Date())); // 2
            zlist.add(AppUtil.getDay(startDate, new Date()));
            klist.add(0);
        }

        // 总数据条数
        map.put("x_data", xlist);
        map.put("zz_data", zlist);
        map.put("kz_data", klist);
        return msg.toString(map);
    }

    /**
     * 查询房屋合同列表信息
     *
     * @param hi_code
     * @return
     * @作者 JiangQT
     * @日期 2016年6月13日
     */
    @RequestMapping("/isHouseContractRelease")
    public @ResponseBody
    String isHouseContractRelease(String hi_code) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(hi_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        ViewBusinessContractVo viewBusinessContractVo = new ViewBusinessContractVo();
        viewBusinessContractVo.setHi_code(hi_code);
        List<ViewBusinessContractVo> businessContractVos = contractService.selectContractViewList(viewBusinessContractVo);
        boolean isOk = false;
        int c202_count = 0;
        for (ViewBusinessContractVo viewBusinessContractVo2 : businessContractVos) {
            if (AppConfig.TYPE_CONTRACT_202.equals(viewBusinessContractVo2.getContractObject_Type())) {
                switch (viewBusinessContractVo2.getContractObject_State()) {
                    case 1:
                        isOk = false;
                        break;
                    case 2:
                        isOk = "完成".equals(viewBusinessContractVo2.getCco_state());
                        break;
                    case 3:
                        isOk = true;
                        break;
                    case 4:
                        isOk = true;
                        break;
                }
                c202_count++;
                if (!isOk) {
                    break;
                }
            }
        }
        if (c202_count == 0) {
            isOk = true;
        }
        msg.setData(isOk);
        return msg.toString();
    }

    /**
     * 【管家日志】查询合同列表
     *
     * @param hi_code
     * @return
     * @作者 JiangQT
     * @日期 2016年10月19日
     */
    @RequestMapping("/queryContractImplRecordAbout")
    public @ResponseBody
    String queryContractImplRecordAbout(String hi_code) {
        Msg<Object> msg = new Msg<>();
        HashMap<String, Object> map = new HashMap<>();
        if (StringUtils.isEmpty(hi_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 查询合同列表
        ViewBusinessContractVo businessContractVo = new ViewBusinessContractVo();
        businessContractVo.setHi_code(hi_code);
        List<ViewBusinessContractVo> contractViewList = contractService.selectContractViewList(businessContractVo);
        map.put("contractList", contractViewList);
        // 执行记录类型
        map.put("recordType", contractService.selectContractTypeByParentId(20));
        // 执行记录类型
        map.put("profitType", contractService.selectContractTypeByParentId(26));

        return msg.toString(map);
    }

    /**
     * 查询最新一份合同
     *
     * @param hi_code
     * @return
     */
    @RequestMapping("/queryContractLastOne")
    public @ResponseBody
    String queryContractLastOne(String hi_code, String con_type) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(hi_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        ViewBusinessContractVo viewContractVo = new ViewBusinessContractVo();
        viewContractVo.setHi_code(hi_code);
        viewContractVo.setContractObject_Type(con_type);
        viewContractVo = contractService.queryContractObjectLastOne(viewContractVo);
        msg.put("contractObject", viewContractVo);
        return msg.toString();
    }

    /**
     * 【管家日志】查询合同执行记录
     *
     * @param hi_code
     * @param pageNo
     * @param pageSize
     * @param cir_source
     * @param cir_content
     * @return
     * @作者 JiangQT
     * @日期 2016年10月19日
     */
    @RequestMapping("/queryContractImplRecord")
    public @ResponseBody
    String queryContractImplRecord(Integer pageNo, Integer pageSize, String hi_code, String con_code, Integer cir_type, Integer cir_source, String cir_content) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(hi_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 查询合同执行记录
        ContractImplRecordVo t = new ContractImplRecordVo();
        t.setHi_code(hi_code);
        t.setContractObject_code(con_code);
        t.setCir_type(cir_type);
        t.setCir_source(cir_source);
        t.setCir_content(cir_content);
        Pagination<ContractImplRecordVo> pagination = new Pagination<>(pageNo, pageSize, t);
        List<ContractImplRecordVo> contractImplRecordVos = contractService.queryContractImplRecordPageList(pagination);

        // 执行记录附件
        for (ContractImplRecordVo contractImplRecordVo : contractImplRecordVos) {
            ContractAttachment attm = new ContractAttachment();
            attm.setCir_id(contractImplRecordVo.getCir_id());
            contractImplRecordVo.setAttList(contractAttachmentService.selectContractAttachmentList(attm));
        }
        int totalRecords = contractService.queryContractImplRecordPageRecords(pagination);
        pagination.setList(contractImplRecordVos, totalRecords);
        return msg.toString(pagination);
    }

    /**
     * 合同作废
     *
     * @author tanglei
     * @Date 2017年7月28日  下午19:05:55
     */
    @RequestMapping("/voidContractRecord")
    public @ResponseBody
    String voidContractRecord(@RequestBody Map<String, Object> data) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        String ContractObject_Code = data.get("ContractObject_Code").toString(); //合同编号
        String content = data.get("content").toString();
        String type = data.get("con_type").toString();
        try {
            financeManageService.updateContractRecord(employee.getEm_id(), ContractObject_Code, content, type);
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(Msg.MSG_SYSTEM_ERROR);
        }
        return msg.toString();
    }

    /**
     * 【管家日志】添加管家日志（执行记录）
     *
     * @param data
     * @param request
     * @return
     * @作者 JiangQT
     * @日期 2016年10月23日
     */
    @RequestMapping("/addContractImplementRecord")
    public @ResponseBody
    String addContractImplementRecord(@RequestBody Map<String, Object> data, HttpServletRequest request) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        ContractImplRecordVo contractImplRecord = JSONObject.parseObject((String) data.get("contractImplRecord"), ContractImplRecordVo.class);
        List<ContractAttachment> contractAttachments = JSONArray.parseArray((String) data.get("contractAttachments"), ContractAttachment.class);
        String saveremark = data.get("saveremark").toString();
        if (contractImplRecord == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        String contractObject_Code = contractImplRecord.getContractObject_code();
        String cir_content = contractImplRecord.getCir_content();
        String userName = AppUtil.getCookieEmployee().getEm_name();
        cir_content = "[" + cir_content + "—" + userName + "]";

        if (StringUtils.isEmpty(contractImplRecord.getCir_id())) {
            contractImplRecord.setCir_source(1);// 记录来源（0：系统；1：手动）
            contractImplRecord.setCir_author(employee.getEm_id());// 记录人
            contractImplRecord.setCir_createTime(new Date());// 添加时间
            contractService.addHouseRecord(contractImplRecord);

            if (contractImplRecord.getCir_type() != null && 1016 == contractImplRecord.getCir_type().intValue()) {// 调价申请
                PriceApplyRecord priceApplyRecord = new PriceApplyRecord();
                priceApplyRecord.setHi_code(contractImplRecord.getHi_code());
                priceApplyRecord.setApply_em_id(AppUtil.getCookieEmployee().getEm_id());
                priceApplyRecord.setApply_time(new Date());
                priceApplyRecord.setApply_status(0);// 待复核
                priceApplyRecord.setCir_id(contractImplRecord.getCir_id());
                priceApplyRecord.setApply_price(contractImplRecord.getApply_price());
                contractService.addPriceApplyRecord(priceApplyRecord);
            } else if (contractImplRecord.getCir_type() != null && 1015 == contractImplRecord.getCir_type().intValue()) {// 直接调价
                try {
                    msg = houseLibraryService.updateHousePrice(employee, contractImplRecord.getHi_code(), contractImplRecord.getApply_price());
                    contractService.rentHouse(request, contractImplRecord.getHi_code());// 同步支付宝，并上架
                } catch (Exception e) {
                    return msg.toError("调价失败，请重试");
                }
            }
        } else {
            ContractImplRecordVo contractImplRecord0 = contractService.queryContractImplementRecord(contractImplRecord);

            if (contractImplRecord0.getCir_source() == 0) {
                return msg.toError("该记录为系统记录，不能修改");
            }
            contractService.updateContractImplRecord(contractImplRecord);
        }
        // 增量保存到合同主体备注
        if ("yes".equals(saveremark)) {
            UserCenterContractBody userCenterContractBody = new UserCenterContractBody();
            userCenterContractBody.setContractObject_Code(contractObject_Code);
            userCenterContractBody.setContractBody_Remark(cir_content);
            int i = contractService.updateContractBodyRemark(userCenterContractBody);
            System.out.println(i);
        }
        // 添加附件
        ContractAttachment contractAttachment0 = new ContractAttachment();
        contractAttachment0.setCir_id(contractImplRecord.getCir_id());
        contractAttachmentService.deleteContractAttachment(contractAttachment0);
        if (contractAttachments != null) {
            for (ContractAttachment contractAttachment : contractAttachments) {
                contractAttachment.setCir_id(contractImplRecord.getCir_id());// 执行记录ID
                contractAttachment.setCa_state(1);// 附件状态；1：有效；0：无效
                contractAttachment.setCa_addTime(new Date());
                if (1023 == contractImplRecord.getCir_type()) {// 附加协议
                    String path = contractAttachment.getCa_path();
                    if (!path.startsWith("http://")) {
                        String url = "http://www.cqgjp.com" + path;
                        String realPath = request.getSession().getServletContext().getRealPath("/resources/contractImage/");
                        // 创建文件夹
                        File upFile = new File(realPath);
                        if (!upFile.exists()) {
                            upFile.mkdirs();
                        }
                        String fileName = AppUtil.getOrderCode(contractAttachment.getCa_type()) + "." + contractAttachment.getCa_type();
                        try {
                            FileUtil.download(url, fileName, realPath);
                            try {
                                JSONObject jsonData = bestSignService.agreementSign(new File(realPath + fileName), contractAttachment.getCa_type(), contractObject_Code);
                                contractAttachment.setCa_fid(jsonData.getString("fId"));
                                contractAttachment.setCa_signer(jsonData.getString("account"));
                                contractAttachment.setCa_contractId(jsonData.getString("contractId"));
                                contractAttachment.setCa_signState(1);// 待签署
                            } catch (Exception e) {
                                e.printStackTrace();
                                return msg.toError(e.getMessage());
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                            return msg.toError("文件下载失败");
                        } finally {
                            new File(realPath + fileName).delete();
                        }
                    }
                }
                contractAttachmentService.addContractAttachment(contractAttachment);
            }
        }
        return msg.toString();
    }

    /**
     * 更新交房日期
     *
     * @return
     * @author JiangQt
     * @version 2017年6月9日下午4:17:17
     */
    @RequestMapping("/updateContractRealDate")
    public @ResponseBody
    String updateContractRealDate(String con_code, String con_realDate, boolean isChange) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        if (StringUtils.isEmpty(con_code) || StringUtils.isEmpty(con_realDate)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        try {
            Date realDate = AppUtil.sdf_date.parse(con_realDate);
            msg = contractService.updateContractObjectForRealDate(con_code, realDate, isChange, employee);
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    // ==================添加/更新================== //

    /**
     * 物品添置
     *
     * @param con_code
     * @return
     * @author JiangQT
     */
    @RequestMapping("/bindCustomerRelaInfo")
    public @ResponseBody
    String bindCustomerRelaInfo(String con_code, Integer cus_id) {
        Msg<Object> msg = new Msg<>();
        // 【验证客户是否存在】
        boolean isHaving = false;
        UserCustomer customer = new UserCustomer();
        customer.setContractObject_code(con_code);
        customer.setCc_id(cus_id);
        List<UserCustomer> relaContractList = customerService.queryCustomerRelaContractList(customer);
        for (UserCustomer userCustomer : relaContractList) {
            if (Objects.equals(userCustomer.getCc_id(), cus_id)) {
                isHaving = true;
            }
        }
        if (isHaving) {
            return msg.toError("该客户已存在，无需再次添加");
        }

        // 【查询合同信息】
        ContractObjectVo contractObject = new ContractObjectVo();
        contractObject.setContractObject_Code(con_code);
        contractObject = contractService.queryContractObject(contractObject);
        if (contractObject == null) {
            return msg.toError("没有发现合同，绑定客户失败。");
        }

        // 【添加合同客户关系数据】
        UserCustomerRelationship customerRelationship = new UserCustomerRelationship();
        customerRelationship.setContractObject_code(con_code);
        customerRelationship.setCc_code(contractObject.getContractObject_1st() + "");
        customerRelationship.setCrc_role(1);
        customerRelationship.setCrc_state(1);
        customerRelationship.setCrc_time(new Date());
        customerRelationship.setEm_id(AppUtil.getCookieEmployee().getEm_id());
        customerRelationship.setHi_code(contractObject.getHi_code());
        boolean boo = customerService.addCustomerRelaContractInfo(customerRelationship);
        if (!boo) {
            return msg.toError("添加失败");
        }
        return msg.toString();
    }

    /**
     * 更新支付方式
     *
     * @return
     * @throws Exception
     */
    @RequestMapping("/updatePayWay")
    public @ResponseBody
    String updatePayWay() throws Exception {
        // HttpServletRequest request, String con_code, String payWay, String order_code, String firstPayDate, String rentPlus
        Msg<Object> msg = new Msg<>();
        // UserCenterEmployee employee = AppUtil.getCookieEmployee(request);
        // if (employee == null) {
        // msg.setCode(110);
        // msg.setMsg(Msg.MSG_LOGIN_ERROR);
        // return msg.toString();
        // }
        // if (StringUtils.isEmpty(firstPayDate) || StringUtils.isEmpty(payWay))
        // {
        // msg.setCode(110);
        // msg.setMsg(Msg.MSG_PARAM_ERROR);
        // return msg.toString();
        // }
        // // 通过合同编号查询合同对象
        // ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        // contractVo.setContractObject_Code(con_code);
        // contractVo =
        // contractObjectService.selectContractObjectByCNo(contractVo);
        // if (contractVo == null) {
        // msg.setCode(110);
        // msg.setMsg(Msg.MSG_PARAM_ERROR);
        // return msg.toString();
        // }
        // // if (payWay.equals(contractVo.getContractBody_PayStyle())) {
        // // msg.setCode(110);
        // // msg.setMsg("您还未改变付款方式");
        // // return msg.toString();
        // // }
        //
        // if
        // (AppConfig.TYPE_CONTRACT_201.equals(contractVo.getContractObject_Type()))
        // {
        // int oldCycleValue = 0;
        // // 查询账单最后还款记录，设置周期值
        // BillTrusteeshipBillVo trusteeshipBillVo = new
        // BillTrusteeshipBillVo();
        // trusteeshipBillVo.setTsb_code(order_code);
        // trusteeshipBillVo.setTsb_state(AppConfig.BILL_STATE_3);
        // trusteeshipBillVo =
        // financeManageService.queryTrusteeshipBillLastOne(trusteeshipBillVo);
        // if (trusteeshipBillVo == null) {
        // msg.setCode(110);
        // msg.setMsg("该合同账单已全部付清，无法更改");
        // return msg.toString();
        // }
        // String[] split = contractVo.getContractBody_StartTOEnd().split("~");
        // oldCycleValue = AppUtil.getMonth(split[0],
        // AppUtil.sdf_date.format(trusteeshipBillVo.getTsb_repaymentDate()));
        // // 删除非已还款的账单
        // trusteeshipBillVo = new BillTrusteeshipBillVo();
        // trusteeshipBillVo.setTsb_code(order_code);
        // trusteeshipBillVo.setTsb_state(AppConfig.BILL_STATE_3);
        // contractObjectService.deleteTrusteeshipBill(trusteeshipBillVo);
        // // 设置新付款日期
        // contractVo.setContractBody_StartPayTime(AppUtil.sdf_date.parse(firstPayDate));
        // // 生成订单/账单
        // trusteeshipOrderBill(contractVo, order_code, oldCycleValue, rentPlus,
        // payWay);
        // // 添加合同执行记录
        // String contractObject_Code = contractVo.getContractObject_Code();
        // String hi_code = contractVo.getHi_code();
        // contractObjectService.addContractAuditingRecord(contractObject_Code,
        // hi_code, "支付变更，付款方式变为：" + payWay + "，租金加成：" + rentPlus,
        // employee.getEm_id());
        // }
        // if
        // (AppConfig.TYPE_CONTRACT_202.equals(contractVo.getContractObject_Type()))
        // {
        // int oldCycleValue = 0;
        // // 查询账单最后还款记录，设置周期值
        // BillTenantBill billTenantBill = new BillTenantBill();
        // billTenantBill.setTb_code(order_code);
        // billTenantBill.setTb_state(AppConfig.BILL_STATE_3);
        // billTenantBill =
        // financeManageService.queryTenantBillLastOne(billTenantBill);
        // if (billTenantBill == null) {
        // msg.setCode(110);
        // msg.setMsg("该合同账单已全部付清，无法更改");
        // return msg.toString();
        // }
        // String[] split = contractVo.getContractBody_StartTOEnd().split("~");
        // oldCycleValue = AppUtil.getMonth(split[0],
        // AppUtil.sdf_date.format(billTenantBill.getTb_shouldDate()));
        // // 删除不是已还款的账单
        // BillTenantBill tenantBill = new BillTenantBill();
        // tenantBill.setTb_code(order_code);
        // tenantBill.setTb_state(AppConfig.BILL_STATE_3);
        // contractObjectService.deleteTenantBill(tenantBill);
        // // 设置新付款日期
        // contractVo.setContractBody_StartPayTime(AppUtil.sdf_date.parse(firstPayDate));
        // // ## 生成租赁订单/账单
        // tenantOrderBill(contractVo, order_code, oldCycleValue, payWay);
        //
        // // ==START== 更新订单总金额
        // BillTenantOrder tenantOrder = new BillTenantOrder();
        // tenantOrder.setTo_code(order_code);
        // tenantOrder.setTo_state("管家婆");
        // // 查询第一期账单信息
        // billTenantBill = new BillTenantBill();
        // billTenantBill.setTb_code(order_code);
        // billTenantBill =
        // financeManageService.queryTenantBillLastOne(billTenantBill);
        // tenantOrder.setTo_shouldMoney(billTenantBill != null ?
        // billTenantBill.getTb_shouldMoney() : 0);
        // // 查询账单列表
        // billTenantBill = new BillTenantBill();
        // billTenantBill.setTb_code(order_code);
        // List<BillTenantBill> tenantBillList =
        // contractObjectService.queryTenantBillList(billTenantBill);
        // double to_sumMoney = 0;
        // for (BillTenantBill billTenantBill2 : tenantBillList) {
        // to_sumMoney += billTenantBill2.getTb_shouldMoney();
        // }
        // tenantOrder.setTo_numMoney(to_sumMoney);
        // financeManageService.updateTenantOrder(tenantOrder);
        //
        // // ==END== 更新订单总金额
        // // 添加合同执行记录
        // contractObjectService.addContractAuditingRecord(contractVo.getContractObject_Code(),
        // contractVo.getHi_code(), "支付变更，付款方式变为：" + payWay + "，租金加成：" +
        // rentPlus,
        // employee.getEm_id());
        // }
        // msg.setMsg("提交成功");
        return msg.toString();
    }

    /**
     * 提交合同审核
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping("/submitContractAuditing")
    public @ResponseBody
    String submitContractAuditing(String con_code, Integer em_id) {
        Msg<Object> msg = new Msg<>();
        // 【验证用户信息】
        UserCenterEmployee employee = null;
        if (!StringUtils.isEmpty(em_id)) {
            employee = employeeService.queryEmployeeInfo(em_id);
        } else {
            employee = AppUtil.getCookieEmployee();
        }
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }

        // 【查询合同】
        ContractObjectVo co = contractService.queryContractObject(con_code);
        if (co == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 【判断合同编辑或者未通过状态】
        if (co.getContractObject_OptionState() != AppConfig.contract_optionstate_101 && co.getContractObject_OptionState() != AppConfig.contract_optionstate_103) {
            return msg.toError("该合同无需提交审核");
        }

        // 【更新合同状态】
        ContractObjectVo contractObjectVo = new ContractObjectVo();
        contractObjectVo.setContractObject_Code(co.getContractObject_Code());
        if (co.getContractObject_ExtState() == AppConfig.contract_extstate_12 || co.getContractObject_ExtState() == AppConfig.contract_extstate_22) {
            // 续约合同不需要审核，直接复核
            contractObjectVo.setContractObject_OptionState(AppConfig.contract_optionstate_104);
        } else {
            contractObjectVo.setContractObject_OptionState(AppConfig.contract_optionstate_102);
        }
        contractService.updateContractObject(contractObjectVo);

        // 【完成签证合同】
        try {
            ContractSignVerifyVo contractSignVerifyVo = contractService.queryContractSignVerify(co.getContractObject_Code());
            if (contractSignVerifyVo != null && contractSignVerifyVo.getCs_contractId() != null) {
                BestSignUtil.contractFinish(contractSignVerifyVo.getCs_contractId());
            }
        } catch (AppException e) {
            if (e.getCode() != 241501) {// 重复完成
                return msg.toError(e);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }

        // 【添加合同记录】
        contractService.addContractRecord(co.getContractObject_Code(), "提交合同审核", employee.getEm_name());
        return msg.toString();
    }

    /**
     * 提交合同审核
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping("/submitContractReview")
    public @ResponseBody
    String submitContractReview(String con_code, Integer em_id) {
        Msg<Object> msg = new Msg<>();
        // 【验证用户信息】
        UserCenterEmployee employee = null;
        if (!StringUtils.isEmpty(em_id)) {
            employee = employeeService.queryEmployeeInfo(em_id);
        } else {
            employee = AppUtil.getCookieEmployee();
        }
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }

        // 【查询合同】
        ContractObjectVo co = contractService.queryContractObject(con_code);
        if (co == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 【判断合同编辑或者未通过状态】
        if (co.getContractObject_OptionState() != AppConfig.contract_optionstate_1021
                && co.getContractObject_OptionState() != AppConfig.contract_optionstate_105) {
            return msg.toError("该合同无需提交复核");
        }

        // 非续约房续约交接结算
        if (co.getContractObject_ExtState() != AppConfig.contract_extstate_12 && co.getContractObject_ExtState() != AppConfig.contract_extstate_22) {
            // 查询交接单
            HandoverPropertyMainVo propertyMainVo = new HandoverPropertyMainVo();
            propertyMainVo.setContractObject_code(con_code);
            propertyMainVo = propertyTransferService.queryHandoverPropertyMain(propertyMainVo);
            if (propertyMainVo == null) {
                return msg.toError("该合同未交接，请交接后再提交");
            }
            // 查询结算单
            UserCenterStatementVo statementVo = new UserCenterStatementVo();
            statementVo.setContractObject_code(con_code);
            statementVo.setStatement_type(0);
            statementVo = statementService.queryStatementOrder(statementVo);
            if (statementVo == null) {
                return msg.toError("该合同未结算，请结算后再提交");
            }
        }

        // 【更新合同状态】
        ContractObjectVo contractObjectVo = new ContractObjectVo();
        contractObjectVo.setContractObject_Code(con_code);
        contractObjectVo.setContractObject_OptionState(AppConfig.contract_optionstate_104);
        contractService.updateContractObject(contractObjectVo);

        // 【完成签证合同】
        try {
            ContractSignVerifyVo contractSignVerifyVo = contractService.queryContractSignVerify(co.getContractObject_Code());
            if (contractSignVerifyVo != null && contractSignVerifyVo.getCs_contractId() != null) {
                BestSignUtil.contractFinish(contractSignVerifyVo.getCs_contractId());
            }
        } catch (AppException e) {
            if (e.getCode() != 241501) { // 重复完成
                return msg.toError(e);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }

        // 【添加合同记录】
        contractService.addContractRecord(co.getContractObject_Code(), "提交合同审核", employee.getEm_name());
        return msg.toString();
    }

    /**
     * 重新生成业绩
     *
     * @param cno
     * @作者 JiangQT
     * @日期 2016年9月23日
     */
    @RequestMapping("/reBuildAchi")
    public @ResponseBody
    String reBuildAchi(String cno, String con_code) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(cno) && StringUtils.isEmpty(con_code)) {
            return msg.toError("参数错误，请重试或者联系管理员");
        }
        try {
            ContractObjectVo contractObjectVo = contractService.queryContractObject(con_code);
            if (contractObjectVo == null) {
                return msg.toError("没有发现该合同信息");
            }
            cno = contractObjectVo.getContractObject_No();

            achievementService.upateAchievementRent(cno);
            achievementService.addAchievementStatistics(cno, 0.0);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return msg.toString();
    }

    /* ==================招租申请=START================= **/

    /**
     * 招租申请--1.0 跳转合约申请
     *
     * @param mode
     * @return
     * @作者 JiangQT
     * @日期 2016年8月24日
     */
    @RequestMapping("/jumpCancelContractApply")
    public ModelAndView jumpCancelContractApply(String mode) {
        ModelAndView view = new ModelAndView("/contract/cancelContractApply");
        if (StringUtils.isEmpty(mode) || "auditing".equals(mode)) {
            view.addObject("mode", "auditing");
        } else if ("payway".equals(mode)) {
            view.addObject("mode", "payway");
        }
        return view;
    }

    /**
     * 招租申请--1.1 添加合约申请订单
     *
     * @param businessCancelContractOrder
     * @return
     * @author JiangQT
     */
    @RequestMapping("/applySubmit")
    public @ResponseBody
    String applySubmit(BusinessCancelContractOrder businessCancelContractOrder) {
        Msg<Object> msg = new Msg<>();
        if (businessCancelContractOrder == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }

        // 【验证是否存在招租申请订单】
        BusinessCancelContractOrder cancelContractOrder = new BusinessCancelContractOrder();
        cancelContractOrder.setContractObject_Code(businessCancelContractOrder.getContractObject_Code());
        cancelContractOrder.setCco_state_no(AppConfig.CANCEL_CONTRACT_STATE_7);
        cancelContractOrder = contractService.queryCancelContractByWhere(cancelContractOrder);

        // 【生成/更新招租申请订单】
        String type = businessCancelContractOrder.getCco_applicationType();
        if (cancelContractOrder == null) {
            businessCancelContractOrder.setCco_code(AppUtil.getOrderCode("230"));
            businessCancelContractOrder.setCco_applicationTime(new Date());
            businessCancelContractOrder.setCco_state(AppConfig.CANCEL_CONTRACT_STATE_1);
            contractService.addCancelContractOrder(businessCancelContractOrder);

            // 【更新合同状态】
            ContractObjectVo contractObjectVo = new ContractObjectVo();
            switch (type) {
                case "到期":
                    contractObjectVo.setContractObject_OptionState(AppConfig.contract_optionstate_301);
                    break;
                case "解约":
                    contractObjectVo.setContractObject_OptionState(AppConfig.contract_optionstate_401);
                    break;
                case "转租":
                    contractObjectVo.setContractObject_OptionState(AppConfig.contract_optionstate_501);
                    break;
                case "退租":
                    contractObjectVo.setContractObject_OptionState(AppConfig.contract_optionstate_601);
                    break;
                case "强收":
                    contractObjectVo.setContractObject_OptionState(AppConfig.contract_optionstate_701);
                    break;
                case "代偿":
                    contractObjectVo.setContractObject_OptionState(AppConfig.contract_optionstate_801);
                    break;
                case "换房":
                    contractObjectVo.setContractObject_OptionState(AppConfig.contract_optionstate_901);
                    break;
            }
            contractObjectVo.setContractObject_Code(businessCancelContractOrder.getContractObject_Code());
            contractService.updateContractObject(contractObjectVo);
        } else {
            businessCancelContractOrder.setCco_code(cancelContractOrder.getCco_code());
            if (AppConfig.CANCEL_CONTRACT_STATE_1_1.equals(cancelContractOrder.getCco_state())) {
                businessCancelContractOrder.setCco_state(AppConfig.CANCEL_CONTRACT_STATE_1);
            }
            if (AppConfig.CANCEL_CONTRACT_STATE_4_1.equals(cancelContractOrder.getCco_state())) {
                businessCancelContractOrder.setCco_state(AppConfig.CANCEL_CONTRACT_STATE_4);
            }
            if (AppConfig.CANCEL_CONTRACT_STATE_5_1.equals(cancelContractOrder.getCco_state())) {
                businessCancelContractOrder.setCco_state(AppConfig.CANCEL_CONTRACT_STATE_4);
            }
            contractService.updateCancelContractOrder(businessCancelContractOrder);
        }

        // 【解约暂停招租】
        if ("解约".equals(type)) {
            HouseInfoKeep informationKeep = new HouseInfoKeep();
            informationKeep.setHi_code(businessCancelContractOrder.getHi_code());
            informationKeep.setHi_isForRent(AppConfig.hi_isForRent_0);
            houseLibraryService.updateCommodityHouse(informationKeep);
            houseLibraryService.updateInventoryHouse(informationKeep);
        }

        // 【添加合同记录、合同执行记录】
        String contractObject_code = businessCancelContractOrder.getContractObject_Code();
        String content;
        if (cancelContractOrder == null) {
            content = type + "申请，生成合约订单";
            ContractImplRecordVo implementRecordVo = new ContractImplRecordVo();
            implementRecordVo.setHi_code(businessCancelContractOrder.getHi_code());
            implementRecordVo.setContractObject_code(contractObject_code);
            implementRecordVo.setCir_type(1010);
            implementRecordVo.setCir_content(type + "申请");
            implementRecordVo.setCir_source(0);
            implementRecordVo.setCir_author(employee.getEm_id());
            implementRecordVo.setCir_createTime(new Date());
            contractService.addHouseRecord(implementRecordVo);
        } else {
            content = "更新合约申请订单";
        }
        contractService.addContractRecord(contractObject_code, content, employee.getEm_name());
        return msg.toString();
    }

    /**
     * 招租申请--3.0 跳转费用结算
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年8月24日
     */
    @RequestMapping("/jumpContractClosingCost")
    public ModelAndView jumpContractClosingCost() {
        return new ModelAndView("/contract/contractClosingCost");
    }

    /**
     * 招租申请--3.1 添加合同结算单
     *
     * @param data 诸多对象
     * @return
     */
    @RequestMapping("/addContractStatement")
    public @ResponseBody
    String addContractStatement(@RequestBody Map<String, Object> data) {
        // in 签合同时的结算；out 申请招租时的结算
        Msg<Object> msg = new Msg<>();
        String mode = (String) data.get("mode");

        // 添加/更新结算单
        UserCenterStatementVo statementVo = JSONObject.parseObject((String) data.get("statement"), UserCenterStatementVo.class);

        boolean boo;
        if (StringUtils.isEmpty(statementVo.getStatement_code())) {
            if ("in".equals(mode)) {
                statementVo.setStatement_type(0);
            }
            if ("out".equals(mode)) {
                statementVo.setStatement_type(1);
            }
            statementVo.setStatement_code(AppUtil.getOrderCode("203"));
            statementVo.setStatement_createTime(new Date());
            boo = statementService.addStatement(statementVo);
            //添加合同图片库
            ContractImageVo imageVo = new ContractImageVo();
            imageVo.setContractObject_Code(statementVo.getContractObject_code());
            imageVo.setCi_type("JSD");
            imageVo.setCi_path(statementVo.getStatement_path());
            imageVo.setCi_state(0);
            imageVo.setCi_createTime(new Date());
            boo = contractService.addContractImage(imageVo);
        } else {
            if ("in".equals(mode)) {
//                ContractObjectVo contractObject = new ContractObjectVo();
//                contractObject.setContractObject_Code(statementVo.getContractObject_code());
//                contractObject = contractService.queryContractObject(contractObject);
//                if (contractObject != null) {
//                    Integer optionState = contractObject.getContractObject_OptionState();
//                    if (optionState == AppConfig.contract_optionstate_102 || optionState == AppConfig.contract_optionstate_104 || optionState == AppConfig.contract_optionstate_106) {
//                        return msg.toError("该合同已提交审核，不能重复提交");
//                    }
//                }
            }
            if ("out".equals(mode)) {
                BusinessCancelContractOrder businessCancelContractOrder = new BusinessCancelContractOrder();
                businessCancelContractOrder.setContractObject_Code(statementVo.getContractObject_code());
                businessCancelContractOrder.setCco_state_no(AppConfig.CANCEL_CONTRACT_STATE_7);
                businessCancelContractOrder = contractService.queryCancelContractByWhere(businessCancelContractOrder);
                if (businessCancelContractOrder != null) {
                    if (AppConfig.CANCEL_CONTRACT_STATE_1.equals(businessCancelContractOrder.getCco_state()) || AppConfig.CANCEL_CONTRACT_STATE_4.equals(businessCancelContractOrder.getCco_state()) || AppConfig.CANCEL_CONTRACT_STATE_5.equals(businessCancelContractOrder.getCco_state()) || AppConfig.CANCEL_CONTRACT_STATE_6.equals(businessCancelContractOrder.getCco_state()) || AppConfig.CANCEL_CONTRACT_STATE_7.equals(businessCancelContractOrder.getCco_state())) {
                        return msg.toError("该招租订单状态为[" + businessCancelContractOrder.getCco_state() + "]，不能重复提交");
                    }
                }
            }
            boo = statementService.updateStatement(statementVo);

            //添加合同图片库
            ContractImageVo imageVo = new ContractImageVo();
            imageVo.setContractObject_Code(statementVo.getContractObject_code());
            List<ContractImageVo> contractImage = contractService.queryContractImage(imageVo);
            if (contractImage.size() > 0) {
                for (ContractImageVo statement : contractImage) {
                    ContractImageVo image = new ContractImageVo();
                    image.setContractObject_Code(statement.getContractObject_Code());
                    image.setCi_type("JSD");
                    boo = contractService.deleteContractImage(image);
                }
            }
            ContractImageVo contractImageVo = new ContractImageVo();
            contractImageVo.setContractObject_Code(statementVo.getContractObject_code());
            contractImageVo.setCi_type("JSD");
            contractImageVo.setCi_path(statementVo.getStatement_path());
            contractImageVo.setCi_state(0);
            contractImageVo.setCi_createTime(new Date());
            boo = contractService.addContractImage(contractImageVo);
        }

        if (!boo) {
            return msg.toError("提交失败，请重试");
        }

        double cco_subletCost = 0;

        // 添加结算消费项目清单
        List<UserCenterStatementCostItemsVo> statementCostItemsVos = JSONObject.parseArray((String) data.get("statementCostItemsList"), UserCenterStatementCostItemsVo.class);
        if (statementCostItemsVos != null) {
            statementService.deleteStatementCostItems(statementVo.getStatement_code());
            for (UserCenterStatementCostItemsVo statementCostItemsVo : statementCostItemsVos) {
                statementCostItemsVo.setStatement_code(statementVo.getStatement_code());
                statementService.addStatementCostItems(statementCostItemsVo);
                if ("代理费".equals(statementCostItemsVo.getSci_type())) {
                    cco_subletCost = statementCostItemsVo.getSci_unitPrice();
                }
            }
        }

        // 添加损坏物品清单
        List<UserCenterStatementDamageItemsVo> statementDamageItemsList = JSONObject.parseArray((String) data.get("statementDamageItemsList"), UserCenterStatementDamageItemsVo.class);
        if (statementDamageItemsList != null) {
            statementService.deleteStatementDamageItems(statementVo.getStatement_code());
            for (UserCenterStatementDamageItemsVo statementDamageItemsVo : statementDamageItemsList) {
                statementDamageItemsVo.setStatement_code(statementVo.getStatement_code());
                statementService.addStatementDamageItems(statementDamageItemsVo);
            }
        }

        // 添加消费结余
        List<ContractStatementBalanceVo> statementBalanceList = JSONObject.parseArray((String) data.get("statementBalanceList"), ContractStatementBalanceVo.class);
        if (statementBalanceList != null) {
            statementService.deleteStatementBalance(statementVo.getStatement_code());
            for (ContractStatementBalanceVo contractStatementBalanceVo : statementBalanceList) {
                contractStatementBalanceVo.setStatement_code(statementVo.getStatement_code());
                statementService.addStatementBalance(contractStatementBalanceVo);
            }
        }

        if ("out".equals(mode)) {
            // 更改招租合约
            BusinessCancelContractOrder contractOrder = new BusinessCancelContractOrder();
            contractOrder.setCco_code(statementVo.getCco_code());
            contractOrder.setCco_subletCost(cco_subletCost);
            contractOrder.setCco_state(AppConfig.CANCEL_CONTRACT_STATE_4);
            contractService.updateCancelContractOrder(contractOrder);
        }
        msg.setData(statementVo.getCco_code());
        return msg.toString();
    }

    /**
     * 招租申请--3.1 添加合同结算单
     *
     * @param data 诸多对象
     * @return
     */
    @RequestMapping("/updateContractStatementBalance")
    public @ResponseBody
    String updateContractStatementBalance(@RequestBody Map<String, Object> data) {
        Msg<Object> msg = new Msg<>();
        // 结算单
        UserCenterStatementVo statementVo = JSONObject.parseObject((String) data.get("statement"), UserCenterStatementVo.class);
        // 消费结余
        List<ContractStatementBalanceVo> statementBalanceList = JSONObject.parseArray((String) data.get("statementBalanceList"), ContractStatementBalanceVo.class);
        // 结算消费项目清单
        List<UserCenterStatementCostItemsVo> statementCostItemsVos = JSONObject.parseArray((String) data.get("statementCostItemsList"), UserCenterStatementCostItemsVo.class);

        // 添加结算消费项目清单
        for (UserCenterStatementCostItemsVo statementCostItemsVo : statementCostItemsVos) {
            statementCostItemsVo.setStatement_code(statementVo.getStatement_code());
            boolean ci_boo = statementService.updateStatementCostItems(statementCostItemsVo);
            if (!ci_boo) {
                statementService.addStatementCostItems(statementCostItemsVo);
            }
        }
        // 添加消费结余
        for (ContractStatementBalanceVo contractStatementBalanceVo : statementBalanceList) {
            contractStatementBalanceVo.setStatement_code(statementVo.getStatement_code());
            boolean sb_boo = statementService.updateStatementBalance(contractStatementBalanceVo);
            if (!sb_boo) {
                statementService.addStatementBalance(contractStatementBalanceVo);
            }
        }
        // 更新结算单
        boolean boo = statementService.updateStatement(statementVo);
        if (!boo) {
            return msg.toError("提交失败，请重试");
        }
        return msg.toString();
    }

    /**
     * 招租申请--复核修改结算单银行卡
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年8月24日
     */
    @RequestMapping("/updateContractStatement")
    public @ResponseBody
    String updateContractStatement(UserCenterStatementVo statementVo) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(statementVo)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        boolean boo = statementService.updateStatement(statementVo);
        if (!boo) {
            return msg.toError("数据修改失败，请重试或者联系管理员");
        }
        return msg.toString();
    }

    /**
     * 招租申请--跳转合约审核、复核
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年8月24日
     */
    @RequestMapping("/jumpCancelContractAuditing")
    public ModelAndView jumpCancelContractAuditing() {
        return new ModelAndView("/contract/cancelContractAuditing");
    }

    /**
     * 招租申请--4.0、5.0 跳转合约审核、复核
     *
     * @param cco_code
     * @param mode     模式
     * @return
     */
    @RequestMapping("/jumpCancelContractEdit")
    public @ResponseBody
    ModelAndView jumpDisplayContractApply(String cco_code, String mode) {
        ModelAndView view = new ModelAndView("/contract/cancelContractEdit");
        if (StringUtils.isEmpty(cco_code)) {
            return null;
        }
        if ("display".equals(mode)) {
            // 显示
            view.addObject("mode", "display");
        } else if ("auditing".equals(mode)) {
            // 审核
            view.addObject("mode", "auditing");
            // 处理方式
            List<ContractType> typeList = contractService.selectContractTypeByParentId(EnumTypeStatus.TYPE_CANCELCONTRACTORDER_PROCESSMODE.getId());
            view.addObject("typeList", typeList);
        } else if ("review".equals(mode)) {
            // 复核
            view.addObject("mode", "review");
        } else {
            // 显示
            view.addObject("mode", "display");
        }
        // 查询合约订单审核记录
        RecordContractOrderAuditingVo audtingVo = new RecordContractOrderAuditingVo();
        audtingVo.setCco_code(cco_code);
        List<RecordContractOrderAuditingVo> contractOrderRecordList = recordService.queryContractOrderRecordList(audtingVo);
        view.addObject("contractOrderRecordList", contractOrderRecordList);

        // 查询合约订单信息
        ViewBusinessCancelContractListVo cancelContractListVo = contractService.queryCancelContractByCode(cco_code);
        view.addObject("cancelContractListVo", cancelContractListVo);
        // 查看结算单信息
        if (cancelContractListVo != null) {
            UserCenterStatementVo statementVo = new UserCenterStatementVo();
            statementVo.setCco_code(cco_code);
            statementVo = statementService.queryStatementOrder(statementVo);
            view.addObject("statementVo", statementVo);
            if (statementVo != null) {
                // 查看消费费用清单
                UserCenterStatementCostItemsVo costItemsVo = new UserCenterStatementCostItemsVo();
                costItemsVo.setStatement_code(statementVo.getStatement_code());
                List<UserCenterStatementCostItemsVo> costItemsList = statementService.queryStatementCostItems(costItemsVo);
                view.addObject("costItemsList", costItemsList);
                // 查看损坏物品清单
                UserCenterStatementDamageItemsVo damageItemsVo = new UserCenterStatementDamageItemsVo();
                damageItemsVo.setStatement_code(statementVo.getStatement_code());
                List<UserCenterStatementDamageItemsVo> damageItemsList = statementService.queryStatementDamageItems(damageItemsVo);
                view.addObject("damageItemsList", damageItemsList);
            }
            // 查询合同信息
            ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
            contractVo.setContractObject_No(cancelContractListVo.getContractObject_No());
            ViewBusinessContractVo contractObject = contractService.selectContractObjectByCNo(contractVo);
            view.addObject("businessContractVo", contractObject);
        }
        return view;
    }

    /**
     * 招租申请--4.1、5.1 提交合约审核、复核
     *
     * @param processMode   处理方式
     * @param processResult 处理状态
     * @return
     * @author JiangQT
     */
    @RequestMapping("/auditingSubmit")
    public @ResponseBody
    String auditingSubmit(HttpServletRequest request, String con_code, String processMode, String processResult, String cco_content) throws Exception {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }

        // 【查询订单】
        BusinessCancelContractOrder cco = new BusinessCancelContractOrder();
        cco.setContractObject_Code(con_code);
        cco.setCco_state_no(AppConfig.CANCEL_CONTRACT_STATE_7);
        cco = contractService.queryCancelContractByWhere(cco);
        if (cco == null) {
            return msg.toError("没有发现合约订单，请刷新重试");
        }

        // 【查询合同信息】
        ContractObjectVo contractObject = contractService.queryContractObject(con_code);
        if (contractObject == null) {
            return msg.toError("没有发现该合约的合同信息，请联系管理员");
        }

        // 【查询库存房源、出房房源】
        HouseInfoKeep informationKeep = houseLibraryService.selectHouseInfoByCode(cco.getHi_code());
        if (informationKeep == null) {
            return msg.toError("没有发现该合约的房源信息，请联系管理员");
        }

        // 状态判断
        if (!(AppConfig.CANCEL_CONTRACT_STATE_1.equals(cco.getCco_state())
                || AppConfig.CANCEL_CONTRACT_STATE_4.equals(cco.getCco_state())
                || AppConfig.CANCEL_CONTRACT_STATE_5.equals(cco.getCco_state()))) {
            return msg.toError("该招租合约状态为：" + cco.getCco_state() + "，无需" + processResult.replace("待", ""));
        }

        // 更新合约订单状态
        BusinessCancelContractOrder contractOrder = new BusinessCancelContractOrder();
        contractOrder.setCco_code(cco.getCco_code());
        contractOrder.setCco_processMode(processMode);
        contractOrder.setCco_processer(employee.getEm_name());
        // 未通过
        if (processResult.contains("未通过")) {
            contractOrder.setCco_state(processResult);
            contractService.updateCancelContractOrder(contractOrder);

            // 添加合约订单记录
            RecordContractOrderAuditingVo audtingVo = new RecordContractOrderAuditingVo();
            audtingVo.setCco_code(cco.getCco_code());
            audtingVo.setAuditingRecord_author(employee.getEm_name());
            audtingVo.setAuditingRecord_state(cco.getCco_applicationType() + processResult);
            audtingVo.setAuditingRecord_content(cco_content);
            audtingVo.setAuditingRecord_createTime(new Date());
            recordService.addContractOrderAudtingRecord(audtingVo);
            return msg.toString();
        }

        // 【审核】
        if (AppConfig.CANCEL_CONTRACT_STATE_1.equals(processResult) && cco.getCco_state().equals(processResult)) {
            contractOrder.setCco_state(AppConfig.CANCEL_CONTRACT_STATE_2);
            contractService.updateCancelContractOrder(contractOrder);

            Date curentDate = new Date();
            //
            HouseInfoKeep houseInfoKeep = new HouseInfoKeep();
            houseInfoKeep.setHi_code(cco.getHi_code());
            try {
                switch (cco.getCco_applicationType()) {
                    case AppConfig.cco_applicationtype_zz: // 转租
                        houseInfoKeep.setContract_outStatus(AppConfig.contract_outStatus_1);// 出房状态
                        houseInfoKeep.setHi_forRentState(AppConfig.hi_forRentState_1002);
                        houseInfoKeep.setHi_isForRent(AppConfig.hi_isForRent_1);
                        houseInfoKeep.setContract_outDate(curentDate);
                        contractService.rentHouse(request, cco.getHi_code());// 同步支付宝，并上架
                        break;
                    case AppConfig.cco_applicationtype_tz: // 退租
                        houseInfoKeep.setHi_forRentState(AppConfig.hi_forRentState_1003);
                        houseInfoKeep.setHi_isForRent(AppConfig.hi_isForRent_1);
                        houseInfoKeep.setContract_outDate(curentDate);
                        contractService.rentHouse(request, cco.getHi_code());// 同步支付宝，并上架
                        break;
                    case AppConfig.cco_applicationtype_dq: // 到期
                        houseInfoKeep.setHi_forRentState(AppConfig.hi_forRentState_1004);
                        houseInfoKeep.setHi_isForRent(AppConfig.hi_isForRent_1);
                        contractService.rentHouse(request, cco.getHi_code());// 同步支付宝，并上架
                        break;
                    case AppConfig.cco_applicationtype_qs: // 强收
                        houseInfoKeep.setHi_forRentState(AppConfig.hi_forRentState_1005);
                        houseInfoKeep.setHi_isForRent(AppConfig.hi_isForRent_1);
                        houseInfoKeep.setContract_outDate(curentDate);
                        contractService.rentHouse(request, cco.getHi_code());// 同步支付宝，并上架
                        break;
                    case AppConfig.cco_applicationtype_hf: // 换房
                        houseInfoKeep.setHi_forRentState(AppConfig.hi_forRentState_1006);
                        houseInfoKeep.setHi_isForRent(AppConfig.hi_isForRent_1);
                        houseInfoKeep.setContract_outDate(curentDate);
                        contractService.rentHouse(request, cco.getHi_code());// 同步支付宝，并上架
                        break;
                    case AppConfig.cco_applicationtype_jy: // 解约
                        houseInfoKeep.setHi_forRentState(AppConfig.hi_forRentState_1021);
                        houseInfoKeep.setHi_isForRent(AppConfig.hi_isForRent_0);
                        houseInfoKeep.setBlance_date(curentDate);
                        // 房源下架
                        RentHouseVo rentHouseVo = rentHouseService.queryRentHouseVo(contractObject.getHi_code());
                        if (null != rentHouseVo) {
                            ViewHouseLibraryInfoVo houseLibraryInfoVo = houseLibraryService.queryHouseLibraryInfo(contractObject.getHi_code());
                            rentHouseService.rentHouseStateSync(contractObject.getHi_code(), rentHouseVo.getRoom_code(), 0, 2, "分散式".equals(houseLibraryInfoVo.getHis_name()) ? 1 : 2);
                            rentHouseVo.setRoom_status(0);
                            rentHouseService.updataRentHouseVo(rentHouseVo);
                        }
                        break;
                    default:
                        break;
                }
            } catch (Exception e) {
                System.out.println("同步房源到支付宝异常");
            }
            housingAllocationService.updateHouseContractState(houseInfoKeep);
            houseLibraryService.updateHouseContractState(houseInfoKeep);

            // 更新合同状态
            int ccoTypeToConOptionState = AppUtil.returnContractStateByCcoType2(cco.getCco_applicationType());
            if (!StringUtils.isEmpty(ccoTypeToConOptionState)) {
                ContractObjectVo contractObjectVo = new ContractObjectVo();
                contractObjectVo.setContractObject_OptionState(ccoTypeToConOptionState);
                contractObjectVo.setContractObject_Code(con_code);
                contractService.updateContractObject(contractObjectVo);
            }

            // 添加合约订单记录
            RecordContractOrderAuditingVo audtingVo = new RecordContractOrderAuditingVo();
            audtingVo.setCco_code(cco.getCco_code());
            audtingVo.setAuditingRecord_author(employee.getEm_name());
            audtingVo.setAuditingRecord_state(cco.getCco_applicationType() + AppConfig.CANCEL_CONTRACT_STATE_1);
            audtingVo.setAuditingRecord_content(cco_content);
            audtingVo.setAuditingRecord_createTime(new Date());
            recordService.addContractOrderAudtingRecord(audtingVo);

        }
        // 【复审】
        else if (AppConfig.CANCEL_CONTRACT_STATE_4.equals(processResult) && cco.getCco_state().equals(processResult)) {
            contractOrder.setCco_state(AppConfig.CANCEL_CONTRACT_STATE_5);
            contractService.updateCancelContractOrder(contractOrder);

            // 添加合约订单记录
            RecordContractOrderAuditingVo audtingVo = new RecordContractOrderAuditingVo();
            audtingVo.setCco_code(cco.getCco_code());
            audtingVo.setAuditingRecord_author(employee.getEm_name());
            audtingVo.setAuditingRecord_state(cco.getCco_applicationType() + AppConfig.CANCEL_CONTRACT_STATE_4);
            audtingVo.setAuditingRecord_content(cco_content);
            audtingVo.setAuditingRecord_createTime(new Date());
            recordService.addContractOrderAudtingRecord(audtingVo);

        }
        // 【复核】
        else if (AppConfig.CANCEL_CONTRACT_STATE_5.equals(processResult) && cco.getCco_state().equals(processResult)) {
            contractOrder.setCco_state(AppConfig.CANCEL_CONTRACT_STATE_6);
            contractOrder.setCco_FinishTime(new Date());
            contractService.updateCancelContractOrder(contractOrder);

            // 更新合约物业交接[失效]
            HandoverPropertyMainVo propertyMain = new HandoverPropertyMainVo();
            propertyMain.setContractObject_code(con_code);
            propertyMain.setHpm_state(-1);
            handoverPropertyService.updateHandoverPropertyMainForState(propertyMain);

            // 托管合同
            if (AppConfig.TYPE_CONTRACT_201.equals(contractObject.getContractObject_Type())) {
                // 更新库存房源
                HouseInfoKeep houseInfoKeep = new HouseInfoKeep();
                houseInfoKeep.setHi_code(cco.getHi_code());
                houseInfoKeep.setContract_intoStatus(AppConfig.contract_outStatus_1);
                housingAllocationService.updateHouseContractState(houseInfoKeep);
                houseLibraryService.updateHouseContractState(houseInfoKeep);
            }

            // 租赁合同
            if (AppConfig.TYPE_CONTRACT_202.equals(contractObject.getContractObject_Type())) {
                // 更新房屋（出房）合同状态
                if (!AppConfig.cco_applicationtype_zz.equals(cco.getCco_applicationType())) {
                    HouseInfoKeep houseInfoKeep = new HouseInfoKeep();
                    houseInfoKeep.setHi_code(cco.getHi_code());
                    houseInfoKeep.setContract_outStatus(AppConfig.contract_outStatus_1);
                    housingAllocationService.updateHouseContractState(houseInfoKeep);
                    houseLibraryService.updateHouseContractState(houseInfoKeep);
                }
            }

            // 更新合同状态
            int ccoTypeToConOptionState = AppUtil.returnContractStateByCcoType3(cco.getCco_applicationType());
            if (!StringUtils.isEmpty(ccoTypeToConOptionState)) {
                ContractObjectVo contractObjectVo = new ContractObjectVo();
                contractObjectVo.setContractObject_Code(con_code);
                contractObjectVo.setContractObject_State(AppConfig.con_state_3);
                contractObjectVo.setContractObject_OptionState(ccoTypeToConOptionState);
                contractService.updateContractObject(contractObjectVo);
            }

            // 更新合同订单账单
            ContractOrderVo contractOrderVo = new ContractOrderVo();
            contractOrderVo.setContractObject_code(con_code);
            contractOrderVo = financeManageService.queryFinanceOrder(contractOrderVo);
            if (contractOrderVo != null) {
                // 获取订单/账单状态
                int bco_state = AppUtil.returnBcoStateByCcoType(cco.getCco_applicationType());

                // 【更新合同订单】
                ContractOrderVo contractOrderVo1 = new ContractOrderVo();
                contractOrderVo1.setBco_id(contractOrderVo.getBco_id());
                contractOrderVo1.setBco_currentCycle(null);
                contractOrderVo1.setBco_currentPayment(null);
                contractOrderVo1.setBco_currentDate(null);
                contractOrderVo1.setBco_currentOverDay(null);
                contractOrderVo1.setBco_currentOverCycle(null);
                contractOrderVo1.setBco_state(AppConfig.ORDER_STATE_2);
                contractOrderVo1.setBco_optionState(bco_state);
                financeManageService.updateContractOrderForState(contractOrderVo1);

                // 【更新合同账单】
                ContractBillVo contractBillVo = new ContractBillVo();
                contractBillVo.setBco_code(contractOrderVo.getBco_code());
                contractBillVo.setBcb_state(bco_state);
                contractBillVo.setBcb_state_in(AppConfig.order_option_state_1 + "," + AppConfig.order_option_state_2 + "," + AppConfig.order_option_state_9);
                contractBillVo.setBcb_repaymentDate_gt(cco.getCco_handleDate());
                contractBillVo.setBcb_operater(employee.getEm_id());
                financeManageService.updateFinanceBill(contractBillVo);
            }

            // 更新客户合同关系表状态[失效]
            UserCustomerRelationship customerRelationship = new UserCustomerRelationship();
            customerRelationship.setContractObject_code(con_code);
            customerRelationship.setCrc_state(0);
            customerService.updateCustomerRelaContractForState(customerRelationship);

            // 添加合约订单记录
            RecordContractOrderAuditingVo audtingVo = new RecordContractOrderAuditingVo();
            audtingVo.setCco_code(cco.getCco_code());
            audtingVo.setAuditingRecord_author(employee.getEm_name());
            audtingVo.setAuditingRecord_state(cco.getCco_applicationType() + AppConfig.CANCEL_CONTRACT_STATE_6);
            audtingVo.setAuditingRecord_content(cco_content);
            audtingVo.setAuditingRecord_createTime(new Date());
            recordService.addContractOrderAudtingRecord(audtingVo);

            try {
                // 添加房屋利润亏损记录
                houseLibraryService.addSettleAccounts(contractOrderVo.getHi_code(), con_code);
            } catch (Exception e){
                e.printStackTrace();
                System.out.println("添加房屋利润亏损记录失败");
            }

            switch (cco.getCco_applicationType()) {
                case AppConfig.cco_applicationtype_zz: // 转租
                    break;
                case AppConfig.cco_applicationtype_tz: // 退租
                    break;
                case AppConfig.cco_applicationtype_dq: // 到期
                    break;
                case AppConfig.cco_applicationtype_qs: // 强收
                    break;
                case AppConfig.cco_applicationtype_hf: // 换房
                    break;
                case AppConfig.cco_applicationtype_jy: // 解约
                    break;
                default:
                    break;
            }
        } else {
            return msg.toError("该招租合约状态为： " + cco.getCco_state() + "，无需" + processResult.replace("待", ""));
        }
        return msg.toString();
    }

    /**
     * 招租申请--提交复核
     *
     * @return
     */
    @RequestMapping("/submitOrderReview")
    public @ResponseBody
    String submitOrderReview(String cco_code) {
        Msg<Object> msg = new Msg<>();
        ViewBusinessCancelContractListVo cancelContractListVo = contractService.queryCancelContractByCode(cco_code);
        if (cancelContractListVo == null) {
            msg.setCode(110);
            msg.setMsg(Msg.MSG_PARAM_ERROR);
            return msg.toString();
        }
        if (!AppConfig.CANCEL_CONTRACT_STATE_4.equals(cancelContractListVo.getCco_state())) {
            msg.setCode(110);
            msg.setMsg("该订单已提交复核，无需重复提交");
            return msg.toString();
        }
        BusinessCancelContractOrder contractOrder = new BusinessCancelContractOrder();
        contractOrder.setCco_code(cco_code);
        contractOrder.setCco_state(AppConfig.CANCEL_CONTRACT_STATE_1);
        boolean boo = contractService.updateCancelContractOrder(contractOrder);
        if (!boo) {
            msg.setCode(110);
            msg.setMsg("提交失败，请重试");
            return msg.toString();
        }
        msg.setMsg("提交成功");
        return msg.toString();
    }

    /**
     * 查询合约数据
     *
     * @param con_code
     * @return
     * @作者 JiangQT
     * @日期 2016年8月24日
     */
    @RequestMapping("/queryCancelContractInfo")
    public @ResponseBody
    String queryCancelContractInfo(String con_code) {
        Msg<Object> msg = new Msg<>();
        HashMap<Object, Object> map = new HashMap<>();
        // 【1.查询合同信息】
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_Code(con_code);
        contractVo = contractService.selectContractObjectByCNo(contractVo);
        map.put("contractInfo", contractVo);
        if (contractVo == null) {
            return msg.toError("没有发现合同信息，请联系管理员");
        }
        // 【2.查询合约信息】
        BusinessCancelContractOrder businessCancelContractOrder = new BusinessCancelContractOrder();
        businessCancelContractOrder.setContractObject_Code(con_code);
        businessCancelContractOrder.setCco_state_no(AppConfig.CANCEL_CONTRACT_STATE_7);
        businessCancelContractOrder = contractService.queryCancelContractByWhere(businessCancelContractOrder);
        map.put("cancelContract", businessCancelContractOrder);
        return msg.toString(map);
    }

    /**
     * 查询上份合同招租订单
     *
     * @param con_code
     * @return
     * @作者 JiangQT
     * @日期 2016年8月24日
     */
    @RequestMapping("/queryUpContractForRentOrder")
    public @ResponseBody
    String queryUpContractForRentOrder(String con_code) {
        Msg<Object> msg = new Msg<>();
        HashMap<Object, Object> map = new HashMap<>();

        // 【1.查询合同信息】
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_Code(con_code);
        contractVo = contractService.selectContractObjectByCNo(contractVo);
        if (contractVo == null) {
            return msg.toError("没有发现合同信息，请刷新重试或者联系管理员");
        }

        // 【2.查询上份合同信息】
        ContractObjectVo contractObject = new ContractObjectVo();
        contractObject.setContractObject_Id(contractVo.getContractObject_Successor());
        contractObject = contractService.queryContractObject(contractObject);
        if (contractObject != null) {
            // 【3.查询上份合同招租合约订单】
            BusinessCancelContractOrder cancelContractOrder = new BusinessCancelContractOrder();
            cancelContractOrder.setContractObject_Code(contractObject.getContractObject_Code());
            cancelContractOrder.setCco_state_no(AppConfig.CANCEL_CONTRACT_STATE_7);
            cancelContractOrder = contractService.queryCancelContractByWhere(cancelContractOrder);
            map.put("cancelContract", cancelContractOrder);
        }
        return msg.toString(map);
    }

    /* ==========【业绩调整】=START========= **/

    /**
     * 【业绩调整】-- 审核/复核业绩
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping("/auditingContractAchi")
    public @ResponseBody
    String auditingContractAchi(Integer sa_id, String result, String remark, String mode) {
        Msg<Object> msg = new Msg<>();

        // 【验证用户】
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        AchievementSumAchievement sumAchievement0 = new AchievementSumAchievement();
        sumAchievement0.setSa_id(sa_id);
        List<AchievementSumAchievement> sumAchievementList = achievementService.selectAchievementSumAchievement(sumAchievement0);
        if (sumAchievementList.isEmpty()) {
            return msg.toError("没有发现业绩，请刷新页面重试");
        } else {
            sumAchievement0 = sumAchievementList.get(0);
        }

        // 【更新总业绩状态】
        AchievementSumAchievement sumAchievement = new AchievementSumAchievement();
        sumAchievement.setSa_id(sa_id);
        // 审核
        if ("auditing".equals(mode)) {
            if ("yes".equals(result)) {
                sumAchievement.setSa_auditState(10);
            }
            if ("no".equals(result)) {
                sumAchievement.setSa_auditState(11);
            }
        }
        // 复核
        if ("review".equals(mode)) {
            if ("yes".equals(result)) {
                sumAchievement.setSa_auditState(20);
            }
            if ("no".equals(result)) {
                sumAchievement.setSa_auditState(21);
            }
        }
        boolean boo = achievementService.updateSumAchievement(sumAchievement);
        if (!boo) {
            return msg.toError("数据提交失败，请重试或者联系管理员");
        }

        // 【添加记录】
        AchievementRecord achievementRecord = new AchievementRecord();
        achievementRecord.setSa_id(sa_id);
        achievementRecord.setContractObject_Id(sumAchievement0.getContractObject_Id());
        achievementRecord.setAr_money(0);
        if ("auditing".equals(mode)) {
            achievementRecord.setAr_type("业绩审核");
            if ("yes".equals(result)) {
                achievementRecord.setAr_content("业绩审核通过");
            }
            if ("no".equals(result)) {
                achievementRecord.setAr_content("业绩审核未通过：" + remark);
            }
        }
        if ("review".equals(mode)) {
            achievementRecord.setAr_type("业绩复核");
            if ("yes".equals(result)) {
                achievementRecord.setAr_content("业绩复核通过");
            }
            if ("no".equals(result)) {
                achievementRecord.setAr_content("业绩复核未通过：" + remark);
            }
        }
        achievementRecord.setAr_date(new Date());
        achievementRecord.setEm_id(employee.getEm_id());
        achievementService.addAchievementRecord(achievementRecord);
        return msg.toString();
    }

    /**
     * 查询业绩记录
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping("/queryContractAchiRecord")
    public @ResponseBody
    String queryContractAchiRecord(Integer conid) {
        Msg<Object> msg = new Msg<>();
        ContractObjectVo contractObject = new ContractObjectVo();
        contractObject.setContractObject_Id(conid);
        contractObject = contractService.queryContractObject(contractObject);
        if (contractObject == null) {
            return msg.toError("参数错误，请刷新页面重试");
        }
        // 查询业绩记录
        AchievementRecord achievementRecord = new AchievementRecord();
        achievementRecord.setContractObject_Id(conid);
        List<AchievementRecord> achievementRecords = achievementService.queryAchiRecord(achievementRecord);
        return msg.toString(achievementRecords);
    }

    /**
     * 调整业绩
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping("/updateContractAchi")
    public @ResponseBody
    String updateContractAchi(Integer conid, double money, String remark) {
        Msg<Object> msg = new Msg<>();
        ContractObjectVo contractObject = new ContractObjectVo();
        contractObject.setContractObject_Id(conid);
        contractObject = contractService.queryContractObject(contractObject);
        if (contractObject == null) {
            return msg.toError("参数错误，请刷新页面重试");
        }
        if (!(AppConfig.contract_optionstate_106 == contractObject.getContractObject_OptionState()) && !(AppConfig.contract_optionstate_201 == contractObject.getContractObject_OptionState())) {
            return msg.toError("非生效合同不能调整生成业绩");
        }
        try {
            Map<String, Object> map = achievementService.adjustmentAchievement(contractObject.getContractObject_No(), remark, money);
            if ("error".equals(map.get("message"))) {
                return msg.toError("业绩调整失败，请重试或者联系管理员");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError("业绩调整失败，请重试或者联系管理员");
        }

        return msg.toString();
    }

    /**
     * 新生成/重新生成业绩
     *
     * @param request
     * @return
     * @author JiangQT
     */
    @RequestMapping("/resetContractAchi")
    public @ResponseBody
    String resetContractAchi(Integer conid, String cno, HttpServletRequest request) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        ContractObjectVo contractObject = new ContractObjectVo();
        if (!StringUtils.isEmpty(cno)) {
            contractObject.setContractObject_No(cno);
        }
        if (!StringUtils.isEmpty(conid)) {
            contractObject.setContractObject_Id(conid);
        }
        contractObject = contractService.queryContractObject(contractObject);
        if (contractObject == null) {
            return msg.toError("参数错误，请刷新页面重试");
        }
        // if
        // (!AppConfig.contract_optionstate_106.equals(contractObject.getContractObject_OptionState())
        // &&
        // !AppConfig.contract_optionstate_201.equals(contractObject.getContractObject_OptionState()))
        // {
        // return msg.toError("非生效合同不能重新生成业绩");
        // }
        try {
            String ar_content = "重新生成业绩成功";
            Map<String, Object> map = achievementService.againAchievement(contractObject.getContractObject_No(), ar_content);
            if ("error".equals(map.get("message"))) {
                return msg.toError("业绩重新生成失败，请重试或者联系管理员");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError("业绩重新生成失败，请重试或者联系管理员");
        }
        return msg.toString();
    }

    /**
     * 添加收款记录
     *
     * @param billReceiptRecordVo
     * @return
     * @author JiangQT
     */
    @RequestMapping("/addReceiptRecord")
    public @ResponseBody
    String addReceiptRecord(@ModelAttribute(value = "billReceiptRecordVo") BillFirstBillReceiptRecordVo billReceiptRecordVo) {
        Msg<Object> msg = new Msg<>();
        if (billReceiptRecordVo == null) {
            return msg.toError("参数错误");
        }
        // 删除旧数据
        contractService.deleteFirstBillReceiptRecord(billReceiptRecordVo);
        billReceiptRecordVo.setBfrr_createTime(new Date());
        billReceiptRecordVo.setBfrr_dueInMoney(billReceiptRecordVo.getBfrr_receiptMoney() - billReceiptRecordVo.getBfrr_realMoney());
        boolean boo = contractService.addFirstBillReceiptRecord(billReceiptRecordVo);
        if (!boo) {
            return msg.toError("记录添加失败");
        }
        return msg.toString();
    }

    /**
     * 更新合同附加信息
     *
     * @return
     * @Description:
     * @author JiangQt
     */
    @RequestMapping("/updateContractAttachInfo")
    public @ResponseBody
    String updateContractAttachInfo(@RequestBody JSONObject data) {
        Msg<Object> msg = new Msg<>();
        try {
            contractService.updateContractAttachInfoService(data);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    // ==================验证================== //

    /**
     * 验证合同编号
     *
     * @param conno
     * @return
     * @author JiangQT
     */
    @RequestMapping("/isValidContractNo")
    public @ResponseBody
    String isValidContractNo(String conno) {
        Msg<Object> msg = new Msg<>();
        ViewBusinessContractVo businessContractVo = new ViewBusinessContractVo();
        businessContractVo.setContractObject_No(conno);
        businessContractVo.setQuery_mode("accurate"); // 精确查询
        List<ViewBusinessContractVo> contractViewList = contractService.selectContractViewList(businessContractVo);
        if (contractViewList.isEmpty()) {
            return msg.toError("");
        }
        return msg.toString(200, "该合同编号已存在", contractViewList);
    }

    /**
     * 验证房屋编码有效性
     *
     * @param code 房屋编码
     * @return
     * @author JiangQT
     */
    @RequestMapping(value = "/isValidHouseCode", method = RequestMethod.POST)
    public @ResponseBody
    String isValidHouseCode(String code) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(code)) {
            msg.setCode(110);
            msg.setMsg("没有找到该产权地址");
            return msg.toString();
        }
        HouseHouseInformation houseInformation = new HouseHouseInformation();
        houseInformation.setHi_code(code);
        boolean boo = housingAllocationService.isValidHouseByHiCode(houseInformation);
        if (!boo) {
            msg.setCode(110);
            msg.setMsg("没有找到该产权地址");
            return msg.toString();
        }
        return msg.toString();
    }

    /**
     * 签订合同时，查询是否有解约
     *
     * @param hicode
     * @return
     * @author JiangQT
     */
    @RequestMapping("/isHavingCancelContract")
    public @ResponseBody
    String isHavingCancelContract(String hicode) {
        Msg<Object> msg = new Msg<>();
        ViewBusinessCancelContractListVo cancelContractListVo = new ViewBusinessCancelContractListVo();
        cancelContractListVo.setHi_code(hicode);
        cancelContractListVo.setCco_state(AppConfig.CANCEL_CONTRACT_STATE_2);
        cancelContractListVo = contractService.queryCancelContractByhiCode(cancelContractListVo);
        if (cancelContractListVo == null) {
            msg.setCode(110);
            return msg.toString();
        }
        msg.setMsg("该房屋为" + cancelContractListVo.getCco_applicationType() + "房");
        return msg.toString();
    }

    /**
     * 支付类型
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping("/queryPayType")
    public @ResponseBody
    String payType() {
        Msg<Object> msg = new Msg<>();
        List<ContractType> list = contractService.selectContractTypeByParentId(EnumTypeStatus.TYPE_PAYTYPE.getId());
        if (list.isEmpty()) {
            msg.setCode(110);
            msg.setMsg("数据为空");
            return msg.toString();
        }
        msg.setData(list);
        return msg.toString();
    }

    /**
     * 合同信息分页列表
     *
     * @return
     * @throws ParseException
     */
    @RequestMapping("/selectContractList")
    public @ResponseBody
    Map<String, Object> selectContractList(TableList tableList) throws ParseException {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toMap(110, Msg.MSG_LOGIN_ERROR);
        }
        // 初始化获取对象
        tableList = tableList.initData(tableList);

        // 条件装载
        PageModel<ViewBusinessContractVo> pageModel = new PageModel<>();
        PageModel<ViewBusinessContractVo> whereData = pageModel.getWhereData(tableList, "yyyy-MM-dd");
        ViewBusinessContractVo businessContractVo = new ViewBusinessContractVo();
        if ("myself".equals(tableList.getMode())) {
            businessContractVo.setEm_id(employee.getEm_id());
        }
        if ("team".equals(tableList.getMode())) {
            UserCenterEmployee employee1 = new UserCenterEmployee();
            employee1.setEm_id(employee.getEm_id());
            employee1 = employeeService.queryEmployeeInfo(employee1);
            if (employee1 != null) {
                businessContractVo.setUcc_id(employee1.getUcc_id());
            }
        }
        whereData.setT(businessContractVo);

        PageModel<ViewBusinessContractVo> pagination = contractService.queryViewContractInfoList(whereData);

        // 装载数据
        DataList<ViewBusinessContractVo> datalist = new DataList<>();

        return datalist.dataList(pagination.getList(), tableList.getPageNo(), whereData.getPageSize(), pagination.getTotalRecords(), pageModel.getSumMoney());
    }

    /**
     * 是否已有解约订单申请
     *
     * @param hi_code
     * @param contractObject_No
     * @return
     * @author JiangQT
     */
    @RequestMapping("/isHavingVaildCancelContract")
    public @ResponseBody
    String isHavingVaildCancelContract(String hi_code, String contractObject_No) {
        Msg<Object> msg = new Msg<>();
        BusinessCancelContractOrder contractOrder = new BusinessCancelContractOrder();
        contractOrder.setHi_code(hi_code);
        contractOrder.setContractObject_No(contractObject_No);
        boolean boo = contractService.queryCancelContractOrderInfo(contractOrder);
        if (!boo) {
            msg.setCode(110);
            return msg.toString();
        }
        return msg.toString();
    }

    // ==================上传=================== //

    /**
     * 文件上传
     *
     * @param request
     * @param request
     * @param type    图片类型
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/uploadFile", produces = "text/json;charset=UTF-8")
    public @ResponseBody
    String uploadFile(MultipartHttpServletRequest request, String type) throws Exception {
        return contractService.uploadFile(request, type).toString();
    }

    /**
     * 删除文件
     *
     * @param url
     * @return
     * @throws IOException
     */
    @RequestMapping("/deleteFile")
    public @ResponseBody
    String deleteFile(String url) {
        Msg<Object> msg = new Msg<>();
        try {
            contractService.deleteFile(url);
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }


    /**
     * 文件上传
     *
     * @param request
     * @param request
     * @param type    图片类型
     * @return
     * @throws Exception
     */
    public String uploadFile_bak(MultipartHttpServletRequest request, String index, Double width, Double quality, String type) throws Exception {
        Msg<Object> msg = new Msg<>();
        HashMap<String, Object> map = new HashMap<>();
        type = StringUtils.isEmpty(type) ? "attach" : type;

        String realPath = request.getSession().getServletContext().getRealPath("/resources/contractImage/");
        // 创建文件夹
        File upFile = new File(realPath);
        if (!upFile.exists()) {
            upFile.mkdirs();
        }
        for (MultipartFile file : request.getFiles("file")) {
            String fileName = file.getOriginalFilename();
            String fileType = "png";
            if (file.getSize() > 1000 * 1024 * 20) {
                return msg.toError("图片大小不得超过20M");
            }
            File outFile = new File(realPath + AppUtil.getOrderCode("IMAGE") + ".png");
            // 文件类型

            if (AppUtil.isNotNull(fileName) && (fileName.endsWith(".pdf") || fileName.endsWith(".PDF") ||
                    fileName.endsWith(".docx") || fileName.endsWith(".doc") || fileName.endsWith(".wps") ||
                    fileName.endsWith(".WPS") || fileName.endsWith(".DOC") || fileName.endsWith(".DOCX"))) {
                fileType = fileName.substring(fileName.lastIndexOf(".") + 1);
                outFile = new File(realPath + AppUtil.getOrderCode(fileType).toUpperCase() + fileName.substring(fileName.lastIndexOf(".")));
            }

            if (file.getOriginalFilename().contains("\\.")) {
                fileType = file.getOriginalFilename().split("\\.")[1];
            }
            // 图片匹配类型
            if (file.getContentType().contains("image")) {
                // 如果图片大于1M就进行压缩
                if (file.getSize() <= 1000 * 400) {
                    file.transferTo(outFile);
                } else {
                    CommonsMultipartFile cf = (CommonsMultipartFile) file;
                    DiskFileItem fi = (DiskFileItem) cf.getFileItem();
                    File inFile = fi.getStoreLocation();
                    double comBase = !StringUtils.isEmpty(width) ? width : 1920;
                    double scale = !StringUtils.isEmpty(quality) ? quality : 0.8d;
                    ImageUtil.saveMinPhoto(inFile.toString(), outFile.toString(), comBase, scale);
                }
            } else {
                if (!outFile.exists()) {
                    file.transferTo(outFile);
                }
            }

            // FTP文件上传，并返回图片路径
            InputStream input = new FileInputStream(outFile);
            map.put("url", FtpUtil.getInstance(type).upload(AppUtil.buildFileName(type, fileType), input));
            map.put("name", outFile.getName());
            map.put("size", outFile.length());
            map.put("type", fileType);
            map.put("index", index);

            // 删除临时文件
            outFile.delete();
        }
        return msg.toString(map);
    }

    /**
     * 图片上传
     *
     * @param request
     * @param type    图片类型
     * @return
     * @throws Exception
     */
    public String imageUpload_bak(MultipartHttpServletRequest request, String type) throws Exception {
        Msg<Object> msg = new Msg<>();
        List<MultipartFile> files = request.getFiles("file");
        String realPath = request.getSession().getServletContext().getRealPath("/resources/contractImage/");
        // 创建文件夹
        File upFile = new File(realPath);
        if (!upFile.exists()) {
            upFile.mkdirs();
        }
        for (MultipartFile file : files) {
            if (file.getSize() > 1000 * 1024 * 20) {
                return msg.toError("图片大小不得超过20M");
            }
            // 获取图片名称
            String imageName = AppUtil.getImageName(type, file);
            File outFile = new File(realPath + imageName);
            // 如果图片大于1M就进行压缩
            if (file.getSize() <= 1000 * 400) {
                file.transferTo(outFile);
            } else {
                CommonsMultipartFile cf = (CommonsMultipartFile) file;
                DiskFileItem fi = (DiskFileItem) cf.getFileItem();
                File inFile = fi.getStoreLocation();
                ImageUtil.saveMinPhoto(inFile.toString(), outFile.toString(), 1920, 0.9d);
            }
            // FTP文件上传，并返回图片路径
            String imagePath;
            if (StringUtils.isEmpty(type)) {
                imagePath = FtpUtil.getInstance("contract").upload(imageName, new FileInputStream(outFile));
            } else {
                switch (type) {
                    case "SFZ":
                        imagePath = FtpUtil.getInstance("customer").upload(imageName, new FileInputStream(outFile));
                        break;
                    default:
                        imagePath = FtpUtil.getInstance("contract").upload(imageName, new FileInputStream(outFile));
                        break;
                }
            }
            msg.setData(imagePath);
        }
        return msg.toString();
    }

    /**
     * 删除附件文件
     *
     * @param url
     * @return
     * @throws IOException
     * @作者 JiangQT
     * @日期 2016年10月21日
     */
    @RequestMapping("/deletAttachFile")
    public @ResponseBody
    String deletAttachFile(String url) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(url)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        try {
            FtpUtil.getInstance("attach").delete(url);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(Msg.MSG_SYSTEM_ERROR);
        }
        return msg.toString();
    }

    /**
     * 删除图片
     *
     * @param id 用户编号
     * @return
     * @throws IOException
     */
    @RequestMapping("/deleteImage")
    public @ResponseBody
    String deleteImage(Integer id, String imgUrl) throws IOException {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(imgUrl)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        // 获取properties路劲
        String path = this.getClass().getResource("/conf/path.properties").getPath();
        // 把properties文件转化输出流
        InputStream in = new BufferedInputStream(new FileInputStream(path));
        Properties properties = new Properties();
        properties.load(in);
        String paths = properties.getProperty("contractPaths");
        String addrs = properties.getProperty("contractAddrs");
        int ports = Integer.parseInt(properties.getProperty("contractPorts"));
        String usernames = properties.getProperty("contractUsernames");
        String passwords = properties.getProperty("contractPasswords");
        boolean boo = URLUploadImage.deletePro(paths, addrs, ports, usernames, passwords, imgUrl);
        if (!boo) {
            return msg.toError("删除失败");
        }
        return msg.toString();
    }

    /**
     * 删除图片
     *
     * @param id     用户编号
     * @param imgUrl 图片路径
     * @return
     * @throws IOException
     */
    @RequestMapping("/deleteCustomerImage")
    public @ResponseBody
    String deleteCustomerImage(Integer id, String imgUrl) throws IOException {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(imgUrl)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        UserCustomerImage customerImage = new UserCustomerImage();
        customerImage.setCci_path(imgUrl);
        customerImage.setCc_id(id);
        customerImage.setCci_state(-1);
        boolean boo = customerService.updateCustomerImage(customerImage);
        if (!boo) {
            return msg.toError("图片删除失败");
        }
        return msg.toString();
    }

    /**
     * [初始化数据]添加合同图片
     *
     * @return
     * @throws IOException
     */
    @RequestMapping("/getContractImage")
    public @ResponseBody
    String getContractImage() throws IOException {
        Msg<Object> msg = new Msg<>();
        List<ViewBusinessContractVo> contractViewList = contractService.selectContractViewList(new ViewBusinessContractVo());
        int index = 0;
        int len = contractViewList.size();
        for (ViewBusinessContractVo viewBusinessContractVo : contractViewList) {
            index++;
            System.out.println(viewBusinessContractVo.getContractObject_Code() + " " + index + "-" + len);
            String annex = viewBusinessContractVo.getContractObject_Annex();
            if (!StringUtils.isEmpty(annex)) {
                String[] split = annex.split(";");
                for (String str : split) {
                    if (str.contains("WTS#")) {
                        String split2 = str.replace("WTS#", "");
                        if (!StringUtils.isEmpty(split2)) {
                            String[] split3 = split2.split(",");
                            for (String string : split3) {
                                ContractImageVo contractImageVo = new ContractImageVo();
                                contractImageVo.setContractObject_Code(viewBusinessContractVo.getContractObject_Code());
                                contractImageVo.setCi_path(string);
                                contractImageVo.setCi_state(0);
                                contractImageVo.setCi_type("WTS");
                                contractImageVo.setCi_createTime(new Date());
                                contractService.addContractImage(contractImageVo);
                            }
                        }
                    }
                    if (str.contains("FCZ#")) {
                        String split2 = str.replace("FCZ#", "");
                        if (!StringUtils.isEmpty(split2)) {
                            String[] split3 = split2.split(",");
                            for (String string : split3) {
                                ContractImageVo contractImageVo = new ContractImageVo();
                                contractImageVo.setContractObject_Code(viewBusinessContractVo.getContractObject_Code());
                                contractImageVo.setCi_path(string);
                                contractImageVo.setCi_state(0);
                                contractImageVo.setCi_type("FCZ");
                                contractImageVo.setCi_createTime(new Date());
                                contractService.addContractImage(contractImageVo);
                            }
                        }
                    }
                    if (str.contains("HTZ#")) {
                        String split2 = str.replace("HTZ#", "");
                        if (!StringUtils.isEmpty(split2)) {
                            String[] split3 = split2.split(",");
                            for (String string : split3) {
                                ContractImageVo contractImageVo = new ContractImageVo();
                                contractImageVo.setContractObject_Code(viewBusinessContractVo.getContractObject_Code());
                                contractImageVo.setCi_path(string);
                                contractImageVo.setCi_state(0);
                                contractImageVo.setCi_type("HTZ");
                                contractImageVo.setCi_createTime(new Date());
                                contractService.addContractImage(contractImageVo);
                            }
                        }
                    }
                    if (str.contains("SFZ#")) {
                        String split2 = str.replace("SFZ#", "");
                        if (!StringUtils.isEmpty(split2)) {
                            String[] split3 = split2.split(",");
                            for (String string : split3) {
                                ContractImageVo contractImageVo = new ContractImageVo();
                                contractImageVo.setContractObject_Code(viewBusinessContractVo.getContractObject_Code());
                                contractImageVo.setCi_path(string);
                                contractImageVo.setCi_state(0);
                                contractImageVo.setCi_type("SFZ");
                                contractImageVo.setCi_createTime(new Date());
                                contractService.addContractImage(contractImageVo);
                            }
                        }
                    }
                }
            }
        }
        return msg.toString();
    }

    /**
     * 查询待办合同
     *
     * @param em_id
     * @param start
     * @param end
     * @return
     * @author 陈智颖
     * @date Apr 9, 2017 7:19:53 PM
     */
    @RequestMapping("/stayContract")
    @ResponseBody
    public Map<String, Object> stayContract(Integer em_id, Integer start, Integer end, String where) {
        Map<String, Object> map = new HashMap<>();
        List<Company> company = employeeService.selectCompanyByPersonId(em_id);
        ContractObjectVo contractObject = new ContractObjectVo();
        contractObject.setStart(start);
        contractObject.setEnd(end);
        contractObject.setWhere(where);
        if (Objects.equals(company.get(0).getEm_id(), em_id)) {
            contractObject.setUcc_id(company.get(0).getUcc_id());
        } else {
            contractObject.setEm_id(em_id);
        }
        List<ContractObjectVo> stayContract = contractService.stayContract(contractObject);
        map.put("stayContract", stayContract);
        return map;
    }

    @RequestMapping("/orderMore")
    public String orderMore() {
        return "/contract/orderMore";
    }

    /**
     * 查询超期及30天内到期合同
     *
     * @param response
     * @param start
     * @param end
     * @return
     * @throws ParseException
     */
    @RequestMapping("/queryWarnContractListToApp")
    public @ResponseBody
    Map<String, Object> queryWarnContractListToApp(HttpServletResponse response, Integer start, Integer end, Integer em_id, String where) throws ParseException {
        // 跨域传输json
        response.addHeader("Access-Control-Allow-Origin", "*");
        Map<String, Object> map = new HashMap<>();
        List<Company> company = employeeService.selectCompanyByPersonId(em_id);
        ViewBusinessContractVo businessContractVo = new ViewBusinessContractVo();
        businessContractVo.setStart(start);
        businessContractVo.setEnd(end);
        businessContractVo.setEm_id(em_id);
        businessContractVo.setWhere(where);
        if (Objects.equals(company.get(0).getEm_id(), em_id)) {
            businessContractVo.setUcc_id(company.get(0).getUcc_id());
        } else {
            businessContractVo.setEm_id(em_id);
        }
        map.put("businessContractVos", contractService.queryWarnContractListToApp(businessContractVo));
        return map;
    }

    /**
     * APP查询待办结算订单
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年4月20日
     */
    @RequestMapping("/staySettlement")
    public @ResponseBody
    String staySettlement(Pagination<ViewBusinessCancelContractListVo> pagination) {
        Msg<Object> msg = new Msg<>();
        List<Map<String, Object>> queryWhere = pagination.getQueryWhere();
        List<Map<String, Object>> cache = null;
        for (Map<String, Object> map : queryWhere) {
            if ("em_id".equals(map.get("key"))) {
                Integer em_id = Integer.valueOf(map.get("value").toString());
                List<Company> company = employeeService.selectCompanyByPersonId(em_id);
                if (company != null && Objects.equals(company.get(0).getEm_id(), em_id)) {
                    cache = cache == null ? new ArrayList<>() : cache;
                    Map<String, Object> subMap = new HashMap<>();
                    subMap.put("key", "ucc_id");
                    subMap.put("operator", "filter");
                    subMap.put("ucc_id", company.get(0).getUcc_id());
                    cache.add(subMap);
                }
            }
        }
        if (cache != null) {
            queryWhere.addAll(cache);
        }
        pagination.formatWhere();
        pagination = contractService.querySettlementOrderPageList(pagination);
        return msg.toString(pagination);
    }

    /**
     * 查询合同及房屋信息
     *
     * @return
     * @author shenhx
     * @date 2017-04-18
     */
    @RequestMapping("/queryContractAndHouse")
    public @ResponseBody
    Map<String, Object> queryContractAndHouse(String contractObject_Code) {
        Map<String, Object> map = new HashMap<>();
        // 合同信息
        ContractObjectVo contractObject = contractService.queryContractObject(contractObject_Code);
        map.put("contractObject", contractObject);
        // 房屋信息
        ViewHouseLibraryInfoVo libraryHouseInfo = houseLibraryService.queryHouseLibraryInfo(contractObject.getHi_code());
        map.put("houseInfo", libraryHouseInfo);

        // 客户信息
        UserCustomer customer = new UserCustomer();
        customer.setContractObject_code(contractObject.getContractObject_Code());
        List<UserCustomer> customers = customerService.queryCustomerRelaContractList(customer);
        for (UserCustomer userCustomer : customers) {
            if (0 == userCustomer.getCrc_role()) {
                map.put("userCustomer", userCustomer);
                break;
            }
        }
        return map;
    }

    /**
     * 房源发布
     *
     * @param hi_code
     */
    private @ResponseBody
    void feedHouseToHfq(String hi_code, Integer contractObject_id) {

        // 签名字符串
//        String signStr = "";
        // 系统数据参数
        Map<String, Object> requestMap = new TreeMap<>();
        // 公共参数
        Map<String, Object> publicParamMap = new HashMap<>();

        HouseInfoKeep houseInfo = houseLibraryService.selectHouseInfoByCode(hi_code);

        String hi_latitude = houseInfo.getHi_latitude();// 经纬度
        if (!StringUtils.isEmpty(hi_latitude)) {
            String[] latitudeArray = hi_latitude.split(",");
            if (latitudeArray.length == 2) {
                requestMap.put("positionX", latitudeArray[1]);
                requestMap.put("positionY", latitudeArray[0]);
            }
        }

        requestMap.put("communityName", houseInfo.getHi_name());// 小区
        // houseInfo.getHouse_address()
        requestMap.put("price", (int) (houseInfo.getHi_money() * 100));// 租金月租金，单位为分

        // 合同主体
        ContractObjectVo contractObject = new ContractObjectVo();
        contractObject.setContractObject_Id(contractObject_id);
        contractObject.setHi_code(hi_code);
        contractObject.setContractObject_Type("租赁合同");
        contractObject = contractService.selectContractObjectByHICode(contractObject);
        // 合同主体
        UserCenterContractBody contractBody = contractService.queryContractBody(contractObject.getContractObject_Code());
        requestMap.put("bonus", (int) (contractBody.getContractBody_Service() * 100));// 服务费
        requestMap.put("deposit", (int) (contractBody.getContractBody_Pay() * 100));// 押金，单位为分

        requestMap.put("hasKey", 1);// 是否有钥匙 0-无；1-有
        requestMap.put("companyId", 0);// 经纪公司ID
        requestMap.put("companyName", "重庆管家婆房地产经纪有限公司");// 经纪公司名称

        // 管家信息
        ViewBusinessContractRelaEmpVo contractRelaEmpVo = new ViewBusinessContractRelaEmpVo();
        contractRelaEmpVo.setContractObject_Id(contractObject.getContractObject_Id());
        List<ViewBusinessContractRelaEmpVo> contractRelaEmp = contractService.queryViewContractRelaEmp(contractRelaEmpVo);
        ViewBusinessContractRelaEmpVo empVo = contractRelaEmp.get(0);
        UserCenterEmployee centerEmployee = employeeService.selectUserCenterEmployeeById(empVo.getEm_id());
        requestMap.put("agencyId", centerEmployee.getEm_id());// 经纪人ID
        requestMap.put("agencyPhone", centerEmployee.getEm_phone());// 经纪人电话
        requestMap.put("agencyName", centerEmployee.getEm_name());// 经纪人姓名
        requestMap.put("agencyIntroduce", "");// 经纪人自我介绍
        requestMap.put("agencyGender", "man".equals(centerEmployee.getEm_sex()) ? 1 : 2);// 经纪人性别1:男//
        // 2:女
        requestMap.put("agencyAvatar", "");// 经纪人头像

        requestMap.put("status", 3);// 房源状态 0:未上 架 2:待出 租 3:已出 租
        requestMap.put("bedroomNum", houseInfo.getHi_houseS());// 卧室数量
        requestMap.put("livingroomNum", houseInfo.getHi_houseT());// 客厅数量
        requestMap.put("kitchenNum", 1);// 厨房数量 暂时没有该数据，默认送1
        requestMap.put("toiletNum", houseInfo.getHi_houseW());// 卫生间数量
        requestMap.put("balconyNum", 1);// 阳台数量 暂时没有该数据，默认送1

        String hi_address = houseInfo.getHi_address();
        if (!"".equals(hi_address) && null != hi_address) {

            String[] hiAddressArr = hi_address.split("-");
            requestMap.put("buildingNo", hiAddressArr[0]);// 楼栋编号
            if (hiAddressArr.length >= 4) {
                requestMap.put("unitNo", hiAddressArr[1]);// 单元号
            }
            requestMap.put("houseNo", hiAddressArr[hiAddressArr.length - 2] + "-" + hiAddressArr[hiAddressArr.length - 1]);// 门牌号
        } else {

            requestMap.put("buildingNo", "0");// 楼栋编号
        }
        requestMap.put("buildingName", houseInfo.getHi_name());// 楼栋名称
        requestMap.put("area", houseInfo.getHi_measure());// 面积
        requestMap.put("floorNo", houseInfo.getHi_floor());// 所在楼层，物理楼层
        requestMap.put("floorTotal", houseInfo.getHi_totalFloor());// 总楼层数量

        // 朝向 10001: 东 10002: 西 10003: 南 10004: 北 10023: 西南 10024: 西北 10014: 东北
        // 10013: 东南 10034: 南北 10012:东西
        int hi_orientationCode = 0;
        String hi_orientation = houseInfo.getHi_orientation();
        hi_orientation = StringUtils.isEmpty(hi_orientation) ? "" : hi_orientation;
        switch (hi_orientation.trim()) {
            case "东":
                hi_orientationCode = 10001;
                break;
            case "西":
                hi_orientationCode = 10002;
                break;
            case "南":
                hi_orientationCode = 10003;
                break;
            case "北":
                hi_orientationCode = 10004;
                break;
            case "西南":
                hi_orientationCode = 10023;
                break;
            case "西北":
                hi_orientationCode = 10024;
                break;
            case "东北":
                hi_orientationCode = 10014;
                break;
            case "东南":
                hi_orientationCode = 10013;
                break;
            case "南北":
                hi_orientationCode = 10034;
                break;
            case "东西":
                hi_orientationCode = 10012;
                break;
        }
        requestMap.put("orientation", hi_orientationCode);
        requestMap.put("buildingType", 2);// 建筑类型 1:板楼 2:塔楼 3:板塔 结合 4:独栋 5:联排
        // 6:叠拼

        // 装修档次 1:精装 2:简装 3:毛坯 4:老旧 5.豪装 6.中装 7.普装
        String hi_state = houseInfo.getHi_state();
        hi_state = StringUtils.isEmpty(hi_state) ? "" : hi_state;
        int hi_stateCode = 0;
        switch (hi_state.trim()) {
            case "精装":
                hi_stateCode = 1;
                break;
            case "简装":
                hi_stateCode = 2;
                break;
            case "毛坯":
                hi_stateCode = 3;
                break;
            case "老旧":
                hi_stateCode = 4;
                break;
            case "豪装":
                hi_stateCode = 5;
                break;
            case "中装":
                hi_stateCode = 6;
                break;
            case "基装":
                hi_stateCode = 7;
                break;
        }
        requestMap.put("fitmentType", hi_stateCode);

        requestMap.put("buildingYear", "");// 建筑时间(单位:年)
        requestMap.put("toilet", 1);// 是否有独立卫生间 0-无 1-有
        requestMap.put("balcony", 1);// 是否有独立阳台 0-无 1-有
        requestMap.put("insurance", 1);// 是否有家财险 0-无 1-有
        requestMap.put("checkIn", DataUtil.DateToStrs(new Date()));// 入住时间(年月日：yyyy-MM-dd)
        requestMap.put("depositMonth", 2);// 押几
        requestMap.put("periodMonth", 1);// 付几
        requestMap.put("entireRent", 1);// 租赁方式0:分租 1:整租 2:整分 皆可 我司暂提供只整租

        // 主要室内设施，用“,”分割
        String hi_project = houseInfo.getHi_project();
        StringBuilder settingsStr = new StringBuilder();
        if (!StringUtils.isEmpty(hi_project)) {
            String[] hiPjtArray = hi_project.split(",");
            for (String aHiPjtArray : hiPjtArray) {
                switch (aHiPjtArray) {
                    case "床":
                        settingsStr.append("bed:1" + ",");
                        break;
                    case "沙发":
                        settingsStr.append("sofa:1" + ",");
                        break;
                    case "电脑桌":
                        settingsStr.append("table:1" + ",");
                        break;
                    case "衣柜":
                        settingsStr.append("wardrobe:1" + ",");
                        break;
                    case "椅子":
                        settingsStr.append("chair:1" + ",");
                        break;
                    case "电视":
                        settingsStr.append("tv:1" + ",");
                        break;
                    case "冰箱":
                        settingsStr.append("fridge:1" + ",");
                        break;
                    case "空调":
                        settingsStr.append("ac:1" + ",");
                        break;
                    case "洗衣机":
                        settingsStr.append("washer:1" + ",");
                        break;
                    case "微波炉":
                        settingsStr.append("microwaveoven:1" + ",");
                        break;
                    case "电水壶":
                        settingsStr.append("kettle:1" + ",");
                        break;
                    case "窗帘":
                        settingsStr.append("curtain:1" + ",");
                        break;
                    case "被褥":
                        settingsStr.append("mattress:1" + ",");
                        break;
                    case "花瓶":
                        settingsStr.append("vase:1" + ",");
                        break;
                    case "台灯":
                        settingsStr.append("lamp:1" + ",");
                        break;
                    case "装饰画":
                        settingsStr.append("decoration:1" + ",");
                        break;
                }
            }
        }
        requestMap.put("settings", settingsStr.substring(0, (settingsStr.length() - 1)));

        requestMap.put("settingsAddon", "");// 次要设施用“,”分割
        requestMap.put("desc", houseInfo.getHi_content());// 房源描述

        // 查询房屋图片
        HouseImageVo houseImage = new HouseImageVo();
        houseImage.setHi_code(hi_code);
        List<HouseImageVo> houseImages = houseImageService.queryHouseImageList(houseImage);
        StringBuilder imgPaths = new StringBuilder();
        for (HouseImageVo image : houseImages) {
            imgPaths.append(image.getHm_path()).append(",");
        }
        if (!StringUtils.isEmpty(imgPaths.toString())) {
            requestMap.put("imgs", imgPaths.substring(0, (imgPaths.length() - 1)));// 房源照片
        }
        requestMap.put("bizName", (null == houseInfo.getHi_district() || "".equals(houseInfo.getHi_district())) ? "重庆" : houseInfo.getHi_district());// 商圈名称

        Long ts = System.currentTimeMillis() / 1000L;
        publicParamMap.put("appId", Constant.HUIFENQI_APPID);
        publicParamMap.put("secretKey", Constant.HUIFENQI_SECRETKEY);
        publicParamMap.put("ts", ts.toString());

        // 拼接加密字符串
        StringBuilder signSeed = new StringBuilder();

        HousePartnerPublish partnerPublish = housePartnerPublishService.queryHousePartnerPublishByHiCode(hi_code);
        // 是否发布 TRUE-发布；FALSE-更新
        boolean isFeed = true;
        // 未同步到第三方
        if (null == partnerPublish) {
            System.out.println("");
            // 房源同步第三方数据若已失效，可以第二次录入
        } else if ("invalid".equals(partnerPublish.getHpp_status())) {
            System.out.println("");
        } else {
            TreeMap<String, Object> sellMap = HuifenqiPublishUtil.setRequestMap(partnerPublish, partnerPublish.getHpp_data());
            requestMap.putAll(sellMap);
            isFeed = false;
        }

        // 本系统需发布的具体数据排序
        List<String> values = HuifenqiPublishUtil.sortParamValues(requestMap);
        for (String val : values) {
            signSeed.append(val);
        }

        String seed = signSeed.toString();

        // 去字符串中间空格
        seed = seed.replaceAll("\\s*", "");

        // sign签名加密须把APPID，排序后参数拼接的字符串，SECRETKEY及Unix时间戳一起加密
        String signStr = DigestUtils.sha256Hex(Constant.HUIFENQI_APPID + seed + Constant.HUIFENQI_SECRETKEY + ts);

        // 检验sign
        // boolean boo = HuifenqiPublishUtil.checkSign(Constant.HUIFENQI_APPID,
        // Constant.HUIFENQI_SECRETKEY, ts.toString(),
        // HuifenqiPublishUtil.sortParamValues(publicParamMap), signStr, "");
        // if(boo){

        publicParamMap.put("sign", signStr);
        // }

        // 最终上送参数拼接（包括APPID等）不能包含空格
        StringBuilder paramStr = new StringBuilder();

        paramStr.append("appId=").append(publicParamMap.get("appId")).append("&");

        for (Entry<String, Object> entry : requestMap.entrySet()) {
            String key = entry.getKey();
            String value = null == entry.getValue() ? "" : entry.getValue().toString();
            paramStr.append(key).append("=").append(value).append("&");
        }
        paramStr.append("secretKey=").append(publicParamMap.get("secretKey"))
                .append("&ts=").append(publicParamMap.get("ts"))
                .append("&sign=").append(publicParamMap.get("sign")).append("&");

        // 同步发布会分期
        String result = isFeed ? HuifenqiPublishUtil.feedHouseToHfq(paramStr.substring(0, (paramStr.length() - 1))) : HuifenqiPublishUtil.feedHouseToHfq(paramStr.substring(0, (paramStr.length() - 1)));

        HousePartnerPublish housePartnerPublish = HuifenqiPublishUtil.resolveResult(result, hi_code);
        housePartnerPublish.setHpp_status("effect");
        // 保存数据库
        if (isFeed) {
            housePartnerPublishService.addHousePartnerPublish(housePartnerPublish);
        } else {
            housePartnerPublishService.updHousePartnerPublish(housePartnerPublish);
        }
    }

    /**
     * 查询合同信息
     *
     * @param con_code
     * @param sqlWhere
     * @return
     */
    @RequestMapping("/queryCancelContractListInfo")
    public @ResponseBody
    String queryCancelContractListInfo(String con_code, String sqlWhere) {
        Msg<Object> msg = new Msg<>();
        HashMap<String, Object> map = new HashMap<>();

        // 查询合同信息
        ContractObjectVo centerContractObject = contractService.queryContractObject(con_code);
        if (centerContractObject == null) {
            return msg.toError("没有发现该合同信息，请重试");
        }

        BusinessCancelContractOrder businessCancelContractOrder = new BusinessCancelContractOrder();
        businessCancelContractOrder.setContractObject_Code(con_code);
        businessCancelContractOrder.setSqlWhere(sqlWhere);
        List<BusinessCancelContractOrder> cancelContractOrders = contractService.queryCancelContractListInfo(businessCancelContractOrder);
        map.put("cancelContractOrders", cancelContractOrders);

        msg.setData(map);
        return msg.toString();
    }

    /**
     * 取消招租申请
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping("/cancelContractApply")
    public @ResponseBody
    String cancelContractApply(String con_code) {
        Msg<Object> msg = new Msg<>();
        // HashMap<String, Object> json = new HashMap<>();

        // 查询合同信息
        ContractObjectVo centerContractObject = contractService.queryContractObject(con_code);
        if (centerContractObject == null) {
            return msg.toError("没有发现该合同信息，请重试");
        }

        // 更新合同信息表
        ContractObjectVo updContractObject = new ContractObjectVo();
        updContractObject.setContractObject_Code(con_code);
        updContractObject.setContractObject_OptionState(AppConfig.contract_optionstate_106);// 已复核
        contractService.updateContractObject(updContractObject);

        BusinessCancelContractOrder businessCancelContractOrder = new BusinessCancelContractOrder();
        businessCancelContractOrder.setContractObject_Code(con_code);
        businessCancelContractOrder = contractService.queryCancelContractByWhere(businessCancelContractOrder);
        // 更新招租单状态
        BusinessCancelContractOrder contractOrder = new BusinessCancelContractOrder();
        contractOrder.setCco_state("取消");
        contractOrder.setCco_code(businessCancelContractOrder.getCco_code());
        contractService.updateCancelContractOrder(contractOrder);

        // 更新房源信息表状态
        HouseInfoKeep houseInfoKeep = new HouseInfoKeep();
        houseInfoKeep.setHi_forRentState(AppConfig.hi_forRentState_1020);// 已解约
        houseInfoKeep.setHi_isForRent(AppConfig.hi_isForRent_0);// 停止招租
        houseInfoKeep.setHi_code(businessCancelContractOrder.getHi_code());
        housingAllocationService.updateHouseInformationKeep(houseInfoKeep);
        return msg.toString();
    }

    /**
     * 跳转--调价申请审核列表
     *
     * @return
     */
    @RequestMapping("/jumpPriceApplyList")
    public ModelAndView jumpPriceApplyList() {
        return new ModelAndView("/library/priceApplyList");
    }

    /**
     * 申请--跳转合约审核、复核
     *
     * @param
     * @return
     * @作者 shenhx
     * @日期 2017-05-25
     */
    @RequestMapping("/jumpPriceApplyRecordAuditing")
    public ModelAndView jumpPriceApplyRecordAuditing(Integer pa_id) {
        ModelAndView view = new ModelAndView("/library/priceApplyReview");
        view.addObject("pa_id", pa_id);
        return view;
    }

    /**
     * 调价申请审核列表
     *
     * @param
     * @return
     * @throws ParseException
     * @author shenhx
     */
    @RequestMapping("/queryPriceApplyList")
    public @ResponseBody
    Map<String, Object> queryPriceApplyList(TableList tableList1) throws ParseException {

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
            houseModel.setSqlOrderBy("");
        }
        // 装载数据类
        DataList<PriceApplyRecord> datalist = new DataList<>();
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        // 查询分页实体
        PageModel<PriceApplyRecord> pageModel = contractService.queryPriceApplyRecordList(tableList.getPageNo(), pageSize, houseModel);
        // 装载数据
        return datalist.dataList(pageModel.getList(), tableList.getPageNo(), pageSize, pageModel.getTotalRecords(), pageModel.getSumMoney());
    }

    /**
     * 调价申请审核列表
     *
     * @param
     * @return
     * @author shenhx
     */
    @RequestMapping("/queryPriceApplyRecord")
    public @ResponseBody
    Map<String, Object> queryPriceApplyRecord(Integer pa_id) {
        Map<String, Object> resultMap = new HashMap<>();
        PriceApplyRecord priceApplyRecord = new PriceApplyRecord();
        priceApplyRecord.setPa_id(pa_id);
        priceApplyRecord = contractService.queryPriceApplyRecord(priceApplyRecord);
        resultMap.put("priceApplyRecord", priceApplyRecord);

        // 查询附件
        ContractAttachment contractAttachment = new ContractAttachment();
        contractAttachment.setCir_id(priceApplyRecord.getCir_id());
        List<ContractAttachment> attachments = contractAttachmentService.selectContractAttachmentList(contractAttachment);
        if (null != attachments && !attachments.isEmpty()) {
            resultMap.put("attachments", attachments);
        }

        ViewHouseLibraryInfoVo libraryInfo = houseLibraryService.queryHouseLibraryInfo(priceApplyRecord.getHi_code());
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

                    HashMap<String, Integer> map = AppUtil.getYearMonthDayData(AppUtil.sdf_date.format(contractObject.getContractObject_Date()), AppUtil.sdf_date.format(new Date()));
                    Integer year = map.get("year");
                    Integer month = map.get("month");
                    Integer day = map.get("day");
                    int y = year;
                    if (month > 0 || day > 0) {
                        y++;
                    }
                    y = y == 0 ? 0 : y - 1;
                    resultMap.put("systemPrice", moneys[y]);
                    resultMap.put("hi_price", libraryInfo.getHi_price());
                    resultMap.put("hi_keepMoney", libraryInfo.getHi_keepMoney());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        return resultMap;
    }

    /**
     * 调价申请审核列表
     *
     * @param
     * @return
     * @author shenhx
     */
    @RequestMapping("/reviewPriceApplyRecord")
    public @ResponseBody
    String reviewPriceApplyRecord(HttpServletRequest request, Integer pa_id, Integer review_result, String refused_reason) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        PriceApplyRecord priceApplyRecord = new PriceApplyRecord();
        priceApplyRecord.setPa_id(pa_id);
        priceApplyRecord.setReview_result(review_result);
        priceApplyRecord.setRefused_reason(refused_reason);
        priceApplyRecord.setReview_em_id(employee.getEm_id());
        priceApplyRecord.setReview_time(new Date());
        priceApplyRecord.setApply_status(1);// 已复核
        contractService.updatePriceApplyRecord(priceApplyRecord);

        PriceApplyRecord applyRecord = contractService.queryPriceApplyRecord(priceApplyRecord);

        List<PriceApplyRecord> applyList = contractService.queryRecordByHiCode(applyRecord);
        if (null != applyList && !applyList.isEmpty()) {
            for (PriceApplyRecord applyRecordInfo : applyList) {
                applyRecordInfo.setApply_status(1);// 已复核
                applyRecordInfo.setReview_result(0);// 驳回
                applyRecordInfo.setRefused_reason("相同房源同时申请，以最后审核价格为准！");
                applyRecordInfo.setReview_em_id(employee.getEm_id());
                applyRecordInfo.setReview_time(new Date());
                contractService.updatePriceApplyRecord(applyRecordInfo);
            }
        }

        if (review_result == 1) {// 同意调价

            if (StringUtils.isEmpty(applyRecord.getHi_code()) || StringUtils.isEmpty(applyRecord.getApply_price())) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }
            try {
                msg = houseLibraryService.updateHousePrice(employee, applyRecord.getHi_code(), applyRecord.getApply_price());
                if (!StringUtils.isEmpty(applyRecord.getHi_code())) {

                    contractService.rentHouse(request, applyRecord.getHi_code());// 同步支付宝，并上架
                }

            } catch (Exception e) {
                e.printStackTrace();
                return msg.toError(Msg.MSG_SYSTEM_ERROR);
            }
        }
        return msg.toString();
    }

    /**
     * 是否为本部门所属房源
     *
     * @param
     * @return
     * @author shenhx
     */
    @RequestMapping("/isOwenHouse")
    public @ResponseBody
    Map<String, Object> isOwenHouse(String hi_code) {
        Map<String, Object> resultMap = new HashMap<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        List<Company> companys = employeeService.selectCompanyByPersonId(employee.getEm_id());
        // 查询房源归属
        PositionRecordVo positionRecordVo = new PositionRecordVo();
        positionRecordVo.setHi_code(hi_code);
        positionRecordVo = houseLibraryService.queryContractPositionRecord(positionRecordVo);
        resultMap.put("isOwen", positionRecordVo.getUcc_id().equals(companys.get(0).getUcc_id()));
        resultMap.put("company", companys.get(0));
        return resultMap;
    }

    /**
     * 授权委托书
     *
     * @param con_code 合同编码
     * @param con_type 合同类型：tg、zl
     * @return
     */
    @RequestMapping("/contractAuthBook")
    public ModelAndView contractAuthBook(String con_code, String con_type) {
        ModelAndView view = new ModelAndView();
        ContractVersionManage versionManage = new ContractVersionManage();
        versionManage.setContract_type(con_type);
        contractService.queryContractToPrint(view, con_code, versionManage);
        view.setViewName("/contract/contractAuthBook");
        return view;
    }

    /**
     * PC合同预览打印
     *
     * @param con_code  合同编码
     * @param con_type  合同类型：tg、zl
     * @param con_uses  用途：print-打印；preview-预览
     * @param con_where 用于：PC、GJP_APP、ERP_APP
     * @return
     */
    @RequestMapping("/contractPreview")
    public ModelAndView contractPreview(String con_code, String con_type, String con_uses, String con_where) {
        ModelAndView view = new ModelAndView();
        ContractVersionManage versionManage = new ContractVersionManage();
        versionManage.setContract_type(con_type);
        versionManage.setContract_uses(con_uses);
        versionManage.setContract_where(con_where.toUpperCase());

        contractService.queryContractToPrint(view, con_code, versionManage);
        return view;
    }

    /**
     * 查询客户签字图像
     *
     * @param con_code
     * @return
     * @throws AppException
     */
    @RequestMapping("/queryConCustomerSign")
    public @ResponseBody
    Map<String, Object> queryConCustomerSign(String con_code) throws AppException {
        Map<String, Object> resultMap = new HashMap<>();
        if (StringUtils.isEmpty(con_code)) {
            throw new AppException("参数错误，合同编码为空异常");
        }

        // 合同对象-租赁合同
        ContractObjectVo contractInfoBo_ZL = new ContractObjectVo();
        contractInfoBo_ZL.setContractObject_Code(con_code);
        contractInfoBo_ZL = contractService.queryContractObject(contractInfoBo_ZL);
        resultMap.put("contractObject", contractInfoBo_ZL);

        // 合同对象-托管合同
        ContractObjectVo contractInfoBo_TG = new ContractObjectVo();
        contractInfoBo_TG.setHi_code(contractInfoBo_ZL.getHi_code());
        contractInfoBo_TG.setContractObject_Type("托管合同");
        contractInfoBo_TG = contractService.queryContractObject(contractInfoBo_TG);
        resultMap.put("contractObject_TG", contractInfoBo_TG);

        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setBco_orderType(AppConfig.order_type_1);
        contractOrderVo.setContractObject_code(con_code);
//		contractOrderVo.setBco_optionState(AppConfig.order_option_state_2);
        contractOrderVo = financeManageService.queryFinanceOrder(contractOrderVo);
        List<ContractBillVo> billContractList = billContractOrderService.queryContractBillList(contractOrderVo.getBco_code(), null);
        if (null != billContractList) {

            for (ContractBillVo billVo : billContractList) {
                billVo.setRepaymentDateArr(DataUtil.DateToStrs(billVo.getBcb_repaymentDate()).split("-"));
            }
            resultMap.put("billContractList", billContractList);
        }

        return resultMap;
    }

    /**
     * 保存授权委托书截图文件
     *
     * @param base64Data
     * @param con_code
     * @param request
     * @return
     */
    @RequestMapping("/uploadBase64")
    public @ResponseBody
    Map<String, Object> base64UpLoad(String base64Data, String con_code, HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            String dataPix;
            String data;
            String realPath = request.getSession().getServletContext().getRealPath("/resources/contractImage/");
            // 创建文件夹
            File upFile = new File(realPath);
            if (!upFile.exists()) {
                upFile.mkdirs();
            }

            if (base64Data == null || "".equals(base64Data)) {
                throw new Exception("上传失败，上传图片数据为空");
            } else {
                String[] d = base64Data.split("base64,");
                if (d.length == 2) {
                    dataPix = d[0];
                    data = d[1];
                } else {
                    throw new Exception("上传失败，数据不合法");
                }
            }

            String suffix;
            if ("data:image/jpeg;".equalsIgnoreCase(dataPix)) {//data:image/jpeg;base64,base64编码的jpeg图片数据
                suffix = ".jpg";
            } else if ("data:image/x-icon;".equalsIgnoreCase(dataPix)) {//data:image/x-icon;base64,base64编码的icon图片数据
                suffix = ".ico";
            } else if ("data:image/gif;".equalsIgnoreCase(dataPix)) {//data:image/gif;base64,base64编码的gif图片数据
                suffix = ".gif";
            } else if ("data:image/png;".equalsIgnoreCase(dataPix)) {//data:image/png;base64,base64编码的png图片数据
                suffix = ".png";
            } else {
                throw new Exception("上传图片格式不合法");
            }
            String tempFileName = "WTS" + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + suffix;

            //因为BASE64Decoder的jar问题，此处使用spring框架提供的工具包
            byte[] bs = Base64Utils.decodeFromString(data);
            File outFile = new File(realPath + tempFileName);

            // 获取图片名称
            FileOutputStream fos = new FileOutputStream(outFile);
            fos.write(bs);
            fos.flush();
            fos.close();

            String imgUrl = FtpUtil.getInstance("contract").upload(tempFileName, new FileInputStream(outFile));

            // 删除临时文件
//            outFile.delete();
            ContractImageVo contractImageVo = new ContractImageVo();
            contractImageVo.setContractObject_Code(con_code);
            contractImageVo.setCi_path(imgUrl);
            contractImageVo.setCi_state(0);
            contractImageVo.setCi_type("WTS");
            contractImageVo.setCi_createTime(new Date());
            contractService.addContractImage(contractImageVo);

            outFile.delete();

            resultMap.put("msg", "上传成功");
            resultMap.put("code", 200);
        } catch (Exception e) {
            resultMap.put("msg", "上传失败");
            resultMap.put("code", 401);
        }
        return resultMap;
    }

    /**
     * @param con_code
     * @return
     * @throws AppException
     */
    @RequestMapping("/queryContractUrlFromSsq")
    public @ResponseBody
    Map<String, Object> queryContractUrlFromSsq(String con_code) throws AppException {
        Map<String, Object> resultMap = new HashMap<>();
        if (StringUtils.isEmpty(con_code)) {
            throw new AppException("参数错误，合同编码为空异常");
        }
        ContractSignVerifyVo signVerifyVo = contractService.queryContractSignVerify(con_code);
        try {
            JSONObject jsonObject = BestSignUtil.downloadContractUrl(signVerifyVo.getCs_contractId());
            if (jsonObject.getIntValue("errno") != 0) {
                resultMap.put("code", "401");
                resultMap.put("msg", jsonObject.getString("errmsg"));
            } else {
                resultMap.put("code", 200);
//                resultMap.put("name", jsonObject.getJSONObject("data").getString("name"));
                JSONObject j1 = jsonObject.getJSONObject("data");
                JSONArray j2 = j1.getJSONArray("contractList");
                String url = j2.getJSONObject(0).getString("url");
                resultMap.put("url", url);

                JSONArray j3 = j1.getJSONArray("attachmentList");
                if (j3 != null) {
                    String follower = j3.getJSONObject(0).getString("url");
                    resultMap.put("follower", follower);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("code", "401");
            resultMap.put("msg", "合同下载异常");
        }
        return resultMap;
    }

    /**
     * @param con_type
     * @return
     * @throws AppException
     */
    @RequestMapping("/generateContractTemplate")
    public @ResponseBody
    ModelAndView generateContractTemplate(String con_type) throws AppException {
        ModelAndView view = new ModelAndView();
        if (StringUtils.isEmpty(con_type)) {
            throw new AppException("参数错误，合同类型为空异常");
        }

        ContractVersionManage versionManage = new ContractVersionManage();
        versionManage.setContract_type(con_type);
        versionManage.setContract_uses("preview");
        versionManage.setContract_where("PC");
        versionManage = contractService.queryContractVersionPriview(versionManage);

        // 合同对象-租赁合同
        ContractObjectVo contractObject_ZL = new ContractObjectVo();
        contractObject_ZL.setContractObject_No("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        view.addObject("contractObject", contractObject_ZL);
        view.addObject("contractObject_TG", contractObject_ZL);

        // 签约代表
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_phone("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        view.addObject("contractor", userCenterEmployee);

        // 房屋信息
        ViewHouseLibraryInfoVo libraryHouseInfo = new ViewHouseLibraryInfoVo();
        libraryHouseInfo.setHe_address("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        view.addObject("houseInfo", libraryHouseInfo);

        view.setViewName(versionManage.getContract_path());

        return view;
    }

    /**
     * @param request
     * @return
     * @throws AppException
     */
    @RequestMapping("/generateAuthBookTemplate")
    public @ResponseBody
    ModelAndView generateAuthBookTemplate(HttpServletRequest request) throws AppException {
        ModelAndView view = new ModelAndView();

        view.setViewName("/contract/contractAuthBook");

        return view;
    }

    /**
     * 下载合同模板
     *
     * @param con_type
     * @return
     * @throws AppException
     */
    @RequestMapping("/downloadContractTemplate")
    public @ResponseBody
    Map<String, Object> downloadContractTemplate(String con_type, HttpServletRequest request) throws AppException {
        Map<String, Object> resultMap = new HashMap<>();
        if (StringUtils.isEmpty(con_type)) {
            throw new AppException("参数错误，合同类型为空异常");
        }

        String realPath = request.getSession().getServletContext().getRealPath("/resources/contractImage/");

        // 删除之前的模板文件
        File files = new File(realPath);
        if (!files.exists()) {
            files.mkdirs();
        }
        File[] allFile = files.listFiles();
        if (null != allFile) {
            for (int i = 0; i < allFile.length; i++) {
                if (allFile[i].getName().startsWith("tempalte_contract_")) {
                    allFile[i].delete();
                }
            }
        }
        String requestUrl = request.getScheme() //当前链接使用的协议
                + "://" + request.getServerName()//服务器地址
                + ":" + request.getServerPort(); //端口号

        String con_url = requestUrl + "/contractObject/generateContractTemplate" + "?con_type=" + con_type + "&template=true";

        String templatePdf = ("tempalte_contract_" + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + ".pdf");

        boolean con_bool = HtmlToPdf.convert(con_url, realPath + templatePdf);
        boolean auth_bool = true;

        String mergePdf = ("template_meg_" + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + ".pdf");

        // 托管合同还要生成授权委托书
        if ("tg".equals(con_type)) {
            String auth_url = requestUrl + "/contractObject/generateAuthBookTemplate?template=true";
            String autuTemPdf = ("tempalte_authBook_" + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + ".pdf");
            auth_bool = HtmlToPdf.convert(auth_url, realPath + autuTemPdf);

            if (!auth_bool) {
                resultMap.put("code", 401);
                resultMap.put("msg", "生成授权委托书模板失败");
                return resultMap;
            }

            try {
                HtmlToPdf.mergePDF(realPath, templatePdf, autuTemPdf, mergePdf);
            } catch (IOException e) {
                e.printStackTrace();
                resultMap.put("code", 401);
                resultMap.put("msg", "PDF文件合并错误");
                return resultMap;
            }
        }

        if (con_bool && auth_bool) {

            File outFile = new File(realPath + ("tg".equals(con_type) ? mergePdf : templatePdf));
            String key = key = "contractTemplate" + System.currentTimeMillis() + ".pdf";
            try {
//                imgUrl = FtpUtil.getInstance("contract").upload(templatePdf, new FileInputStream(outFile));
                key = AliOSS.upload("contractImage/", key, new FileInputStream(outFile));
            } catch (FileNotFoundException e) {
                e.printStackTrace();
                resultMap.put("code", 401);
                resultMap.put("msg", "上传" + ("tg".equals(con_type) ? "托管合同" : "租赁合同") + "模板失败");
            }

            resultMap.put("code", 200);
            resultMap.put("template_url", AliOSS.getUrl(key).toString());
        } else {
            resultMap.put("code", 401);
            resultMap.put("msg", "下载" + ("tg".equals(con_type) ? "托管合同" : "租赁合同") + "模板失败");
        }
        return resultMap;
    }

    /**
     * 取消订单
     *
     * @author tanglei
     * @Date 2017年9月23日  上午11:40:55
     */
    @RequestMapping("/cancelOrder")
    public @ResponseBody
    String cancelOrder(String data) {
        Msg<Object> msg = new Msg<>();
        BusinessCancelContractOrder json = JSONObject.parseObject(data, BusinessCancelContractOrder.class);
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        String contractObject_No = json.getContractObject_No(); //合同编号
        String cco_code = json.getCco_code();   //申请编码
        String cco_applicationContent = json.getCco_applicationContent().substring(0, json.getCco_applicationContent().length() - 1);
        String content = cco_applicationContent + employee.getEm_name() + "]";
        try {
            financeManageService.cancelOrder(contractObject_No, cco_code, content);
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(Msg.MSG_SYSTEM_ERROR);
        }
        return msg.toString();
    }

    /**
     * 下载授权委托书
     *
     * @return
     * @throws AppException
     */
    @RequestMapping("/downloadAuthBook")
    public @ResponseBody
    Map<String, Object> downloadAuthBook(String con_code, HttpServletRequest request) throws AppException {
        Map<String, Object> resultMap = new HashMap<>();
        if (StringUtils.isEmpty(con_code)) {
            throw new AppException("参数错误，合同编号为空异常");
        }

        String realPath = request.getSession().getServletContext().getRealPath("/resources/contractImage/");

        // 删除之前的模板文件
        File files = new File(realPath);
        if (!files.exists()) {
            files.mkdirs();
        }
        File[] allFile = files.listFiles();
        if (null != allFile) {
            for (File anAllFile : allFile) {
                if (anAllFile.getName().startsWith("authbook_")) {
                    anAllFile.delete();
                }
            }
        }

        String requestUrl = request.getScheme() //当前链接使用的协议
                + "://" + request.getServerName()//服务器地址
                + ":" + request.getServerPort(); //端口号

        String auth_url = requestUrl + "/contractObject/contractAuthBook" + "?&con_code=" + con_code;

        String authPdf = ("authbook_" + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + ".pdf");

        boolean auth_bool = HtmlToPdf.convert(auth_url, realPath + authPdf);
        if (auth_bool) {
            resultMap.put("code", 200);
            resultMap.put("url", realPath + authPdf);
        } else {
            resultMap.put("code", 401);
            resultMap.put("msg", "下载授权委托书失败");
        }
        return resultMap;
    }

    /**
     * 查询调价记录
     *
     * @return
     * @throws AppException
     */
    @RequestMapping("/queryPriceRecord")
    public @ResponseBody
    Map<String, Object> queryPriceRecord(String hi_code) throws AppException {
        Map<String, Object> resultMap = new HashMap<>();
        ContractImplRecordVo contractImplRecordVo = new ContractImplRecordVo();
        contractImplRecordVo.setHi_code(hi_code);
        contractImplRecordVo.setCir_type(1015);// 调价
        contractImplRecordVo.setStart(1);
        contractImplRecordVo.setEnd(10);
        List<ContractImplRecordVo> impList = contractService.selectContractImplRecordList(contractImplRecordVo);
        if (null == impList || impList.isEmpty()) {
            resultMap.put("code", 201);
            resultMap.put("msg", "无调价记录");
        } else {
            resultMap.put("code", 200);
            resultMap.put("implRecordVo", impList.get(0));
        }
        return resultMap;
    }

    /**
     * 跳转区经审核页面
     *
     * @author tanglei
     * @Date 2017年10月11日  上午10:40:55
     */
    @RequestMapping("/managerExamine")
    public String managerExamine() {
        return "/contract/contractManagerExamine";
    }

    /**
     * 附加条款审核列表数据
     *
     * @author tanglei
     * @Date 2017年10月11日  上午10:40:55
     */
    @RequestMapping("/managerExamineList")
    public @ResponseBody
    Map<String, Object> managerExamineList(HttpServletRequest req, Pagination<ViewBusinessContractVo> pagination) throws ParseException {
        Msg<Object> msg = new Msg<>();
        pagination.formatWhere();
        pagination = contractService.managerExamineList(pagination);
        return msg.toMap(pagination);
    }

    /**
     * 附加条款审核
     *
     * @author tanglei
     * @Date 2017年10月14日  上午11:40:55
     */
    @RequestMapping("/updateAdditionalExamine")
    public @ResponseBody
    String updateAdditionalExamine(HttpServletRequest req, Integer caa_id, String con_code, Integer caa_state, String caa_deac, String caa_content) {
        Msg<Object> msg = new Msg<>();
        boolean bool = true;
        ContractAgreementAuditingVo agreementAuditingVo = new ContractAgreementAuditingVo();
        agreementAuditingVo.setCaa_id(caa_id);
        agreementAuditingVo.setCon_code(con_code);
        agreementAuditingVo.setCaa_state(caa_state);
        ContractAgreementAuditingRecordVo agreementAuditingRecordVo = new ContractAgreementAuditingRecordVo();
        agreementAuditingRecordVo.setCaa_id(caa_id);
        agreementAuditingRecordVo.setCaar_content(caa_content);
        agreementAuditingRecordVo.setCaar_state(caa_state);
        agreementAuditingRecordVo.setCaar_deac(caa_deac);
        agreementAuditingRecordVo.setCaar_createTime(new Date(System.currentTimeMillis()));
        bool = contractService.updateContractAgreementAuditing(agreementAuditingVo, agreementAuditingRecordVo);
        if (!bool) {
            msg.setCode(110);
            msg.setMsg("审核失败");
            return msg.toString();
        }
        return msg.toString();
    }

}
