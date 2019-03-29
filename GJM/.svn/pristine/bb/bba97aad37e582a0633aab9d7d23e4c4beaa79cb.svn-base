package com.gjp.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.gjp.csrf.CSRFTokenUtil;
import com.gjp.csrf.RefreshCSRFToken;
import com.gjp.csrf.VerifyCSRFToken;
import com.gjp.model.*;
import com.gjp.model.Company;
import com.gjp.service.*;
import com.gjp.token.SameUrlData;
import com.gjp.util.*;
import com.gjp.util.bestsign.BestSignUtil;
import com.gjp.util.bestsign.EncodeUtils;
import com.gjp.util.pay.AliPay;
import com.gjp.util.pay.WeixinPay;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/appPage")
public class AppController {

    // 日志输出
    public static Logger log = Logger.getLogger(OrderService.class);

    // 客户管理
    @Resource
    private CustomerService customerService;
    // 合同管理
    @Resource
    private ContractService contractService;
    // 财务管理
    @Resource
    private FinanceManageService financeManageService;
    // 房源库
    @Resource
    private HouseLibraryService houseLibraryService;
    // 服务
    @Resource
    private ServiceService serviceService;
    // 评分
    @Resource
    private UserCenterUserFractionService fractionService;
    // 保洁账单
    @Resource
    private BillClearBillService billClearBillService;
    // 保洁订单
    @Resource
    private BillClearOrderService billClearOrderService;
    // 消息提醒
    @Resource
    private UserMessageContentService userMessageContentService;
    // 订单管理
    @Resource
    private BillContractOrderService billContractOrderService;
    // 房屋带看
    @Resource
    private HouseSeeingService houseSeeingService;
    // 房屋交接
    @Resource
    private PropertyTransferService propertyTransferService;
    // 交接
    @Resource
    private PropertyTransferService handoverPropertyService;
    // 结算
    @Resource
    private UserCenterStatementService statementService;
    // 记录服务对象
    @Resource
    private RecordService recordService;
    // 服务清单
    @Resource
    private ServiceMoneyService serviceMoneyService;
    // 服务清单
    @Resource
    private BestSignService bestSignService;
    @Resource
    private UserService userService;
    @Resource
    private OrderService orderService;
    @Resource
    private UserCenterEmployeeService employeeService;
    @Resource
    private HandleService handleService;

    private @Autowired
    RentHouseService rentHouseService;

    /**
     * 获取APP版本
     *
     * @param appVersionVo
     * @return
     */
    @RequestMapping(value = "/getVersion", produces = "text/json;charset=UTF-8")
    public @ResponseBody
    String getVersion(AppVersionVo appVersionVo) {
        Msg<Object> msg = new Msg<>();
        if (appVersionVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        // APP类型
        String ap_type = appVersionVo.getAv_type();
        // 当前版本
        int minVersion = AppUtil.formatAppVersion(appVersionVo.getAv_code());
        if (StringUtils.isEmpty(ap_type) || minVersion == 0) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        // 获取版本控制
        appVersionVo = houseLibraryService.queryAppVersionLast(appVersionVo);
        if (appVersionVo == null) {
            return msg.toError("没有发现最新版本");
        }
        // 最新版本
        int maxVersion = AppUtil.formatAppVersion(appVersionVo.getAv_code());
        if (maxVersion == 0) {
            return msg.toError("获取版本失败");
        }
        // 比较版本
        if (minVersion >= maxVersion) {
            return msg.toString(201, "当前已是最新版本");
        }
        // 查询是否为强制更新
        AppVersionVo appVersionVo1 = new AppVersionVo();
        appVersionVo1.setAv_type(ap_type);
        appVersionVo1.setAv_num_min(minVersion);
        appVersionVo1.setAv_num_max(maxVersion);
        appVersionVo1.setAv_state(AppConfig.ar_state_2);// 版本强制更新
        appVersionVo1.setAv_swith(1);// 版本开启
        List<AppVersionVo> appVersionRecordList = houseLibraryService.queryAppVersionList(appVersionVo1);
        if (appVersionRecordList != null && !appVersionRecordList.isEmpty()) {
            appVersionVo.setAv_state(AppConfig.ar_state_2);
        }
        msg.put("appVersion", appVersionVo);
        return msg.toString();
    }

    /**
     * 访问APP首页
     *
     * @return
     * @author 陈智颖
     * @date Feb 16, 2017 10:02:01 AM
     */
    @RequestMapping("/indexPage")
    public String indexPage() {
        return "/appPage/index";
    }

    /**
     * 房源列表
     *
     * @return
     * @author 陈智颖
     * @date Feb 17, 2017 2:54:13 PM
     */
    @RequestMapping("/houseList")
    public String houseList() {
        return "/appPage/houseList";
    }

    /**
     * 房源跟进
     *
     * @return
     * @author 陈智颖
     * @date Feb 17, 2017 2:54:13 PM
     */
    @RequestMapping("/houseFollowUpPage")
    public String houseFollowUpPage() {
        return "/appPage/houseFollowUpPage";
    }

    /**
     * 【房源信息】房源信息
     *
     * @return
     * @author 陈智颖
     * @date Feb 17, 2017 2:54:13 PM
     */
    @RequestMapping("/houseSelect")
    public String houseSelect() {
        return "/appPage/houseSelect";
    }

    /**
     * 【房源信息】房源合同
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年3月28日
     */
    @RequestMapping("/houseContract")
    public String houseContract() {
        return "/appPage/houseContract";
    }

    /**
     * 【房源信息】搜索房源
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年3月28日
     */
    @RequestMapping("/houseSearch")
    public String houseSearch() {
        return "/appPage/service/houseSearch";
    }

    /**
     * 【房源信息】房源导航
     *
     * @return
     * @author 陈智颖
     * @date Mar 31, 2017 5:26:39 PM
     */
    @RequestMapping("/housePage")
    public String housePage() {
        return "/appPage/housePage";
    }

    /**
     * 【合同信息】招租申请
     *
     * @return
     * @author shenhx
     * @date 2017-04-27
     */
    @RequestMapping("/cancelContract")
    public String cancelContract() {
        return "/appPage/cancelContract";
    }

    /**
     * 【合同信息】招租申请列表信息
     *
     * @return
     * @author shenhx
     * @date 2017-04-27
     */
    @RequestMapping("/cancelContractList")
    public String cancelContractList() {
        return "/appPage/cancelContractList";
    }

    /**
     * 【房源信息】搜索房源
     *
     * @param param
     * @return
     * @作者 JiangQT
     * @日期 2017年3月28日
     */
    @RequestMapping("/queryHouseSearchList")
    public @ResponseBody
    String queryHouseSearchList(Integer pageNo, Integer pageSize, String param) {
        Msg<Pagination<ViewBusinessContractVo>> msg = new Msg<>();
        Pagination<ViewBusinessContractVo> pagination = new Pagination<>(pageNo, pageSize);
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setCc_name(param);
        contractVo.setCcp_phone(param);
        contractVo.setHouse_address(param);
        pagination.setT(contractVo);
        pagination.setList(contractService.selectViewContractList(pagination));
        return msg.toString(pagination);
    }

    /**
     * 【房屋信息】房屋编辑
     *
     * @return
     * @作者 shenhx
     * @日期 2017年3月29日
     */
    @RequestMapping("/houseEdit")
    public ModelAndView houseEdit() {
        ModelAndView view = new ModelAndView();
        view.setViewName("/appPage/houseEdit");
        return view;
    }

    /**
     * 【房屋信息】房屋合同数据查询
     *
     * @param hi_code
     * @return
     * @作者 shenhx
     * @日期 2017年3月29日
     */
    @RequestMapping("/houseContractInfo")
    public @ResponseBody
    String houseContractInfo(ViewHouseLibraryInfoVo hi_code) {
        Msg<Object> msg = new Msg<>();
        if (hi_code == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        ViewHouseLibraryInfoVo libraryInfo = houseLibraryService.queryHouseLibraryInfo(hi_code);
        if (libraryInfo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        return msg.toString(libraryInfo);
    }

    /**
     * 【合同签订】增值服务
     *
     * @return
     * @作者 shenhx
     * @日期 2017年3月29日
     */
    @RequestMapping("/contractAppreService")
    public ModelAndView contractAppreService() {
        ModelAndView view = new ModelAndView();
        view.setViewName("/appPage/contract/contractAppreService");
        return view;
    }

    // ========================================================

    /**
     * 【合同信息】合同管理
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年2月23日
     */
    @RequestMapping("/contractPage")
    public ModelAndView contractPage() {
        return new ModelAndView("/appPage/contract/contractPage");
    }

    /**
     * 【合同信息】合同列表
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年2月23日
     */
    @RequestMapping("/contractList")
    public ModelAndView contractList() {
        ModelAndView view = new ModelAndView("/appPage/contract/contractList");
        view.addObject("currentDepartment", null);
        return view;
    }

    /**
     * 【合同信息】查询合同列表
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年2月23日
     */
    @RequestMapping("/queryContractList")
    public @ResponseBody
    String queryContractList(Pagination<ViewBusinessContractVo> pagination) {
        Msg<Object> msg = new Msg<>();
        pagination.formatWhere();
        pagination = contractService.queryContractPageList(pagination);
        return msg.toString(pagination);
    }

    /**
     * app查询合同
     *
     * @param type       合同类型
     * @param state      合同状态
     * @param company    所属部门
     * @param dateType   日期类型
     * @param dateStr    日期类型数值
     * @param overdue    是否超期
     * @param payment    付款方式
     * @param finance    金融机构
     * @param convention 其他约定
     * @param pageNo     开始页数
     * @param pageSize   查询数量
     * @param where      查询数量
     * @param em_id      内部人员编码
     * @return
     * @author 陈智颖
     */
    @RequestMapping(value = "/appQueryContractList", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, Object> appQueryContractList(String type, String state, String company, String dateType, String dateStr, String overdue, String payment, String finance, String convention, Integer pageNo, Integer pageSize, String where, Integer em_id) {
        Map<String, Object> map = new HashMap<>();

        pageNo = (pageNo - 1) * pageSize;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        AppContractVo appContractVo = new AppContractVo();
        appContractVo.setContractObject_Type(type);
        appContractVo.setWhere(where);
        if (state != null && !state.equals("")) {
            appContractVo.setContractObject_OptionState(AppUtil.ContractState(state));
        }
        appContractVo.setUcc_name(company);
        switch (dateType) {
            case "录入日期":
                appContractVo.setDate_title("contractObject_CreateTime");
                break;
            case "起始日期":
                appContractVo.setDate_title("contractObject_Date");
                break;
            case "截止日期":
                appContractVo.setDate_title("contractObject_DeadlineTime");
                break;
            case "签订日期":
                appContractVo.setDate_title("contractObject_FillTime");
                break;
        }
        appContractVo.setPageNo(pageNo);
        appContractVo.setPageSize(pageSize);
        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        switch (dateStr) {
            case "最近30天":
                appContractVo.setDateEnd(sdf.format(date));
                calendar.setTime(date);
                calendar.add(Calendar.DAY_OF_MONTH, -30);
                appContractVo.setDateStart(sdf.format(calendar.getTime()));
                break;
            case "最近7天":
                appContractVo.setDateEnd(sdf.format(date));
                calendar.setTime(date);
                calendar.add(Calendar.DAY_OF_MONTH, -7);
                appContractVo.setDateEnd(sdf.format(calendar.getTime()));
                break;
            case "今天":
                appContractVo.setDateStart(sdf.format(date));
                appContractVo.setDateEnd(sdf.format(date));
                break;
        }
        if (overdue != null && overdue.equals("已超期")) {
            appContractVo.setOverdue(true);
        }
        appContractVo.setContractBody_PayStyle(payment);
        appContractVo.setContractBody_PayType(finance);
        appContractVo.setContractObject_Other(convention);
        appContractVo.setEm_id(em_id);
        List<AppContractVo> appContractVos = contractService.appSelectContractList(appContractVo);
        for (AppContractVo appContractVo1: appContractVos) {
            Map<String, String> stringStringMap = AppUtil.ContractStateText(appContractVo1.getContractObject_OptionState());
            appContractVo1.setContractObject_OptionStateStr(stringStringMap.get("stateStr").toString());
            appContractVo1.setContractObject_OptionStateColor(stringStringMap.get("color").toString());
            appContractVo1.setContract_date_startEnd(sdf.format(appContractVo1.getContractObject_Date()) + "~" + sdf.format(appContractVo1.getContractObject_DeadlineTime()));
            if (appContractVo1.getCre_role() == null || appContractVo1.getCre_role() == 1) {
                appContractVo1.setEm_name(appContractVo1.getEm_name() + " 主");
            } else {
                appContractVo1.setEm_name(appContractVo1.getEm_name() + " 副");
            }
        }

        if (appContractVos.isEmpty()) {
            map.put("code", 401);
            if (pageNo == 0) {
                map.put("msg", "数据为空");
            } else {
                map.put("msg", "没有更多数据");
            }
        } else {
            map.put("code", 200);
            map.put("data", appContractVos);
        }

        return map;
    }

    /**
     * app合同列表选择
     *
     * @return
     */
    @RequestMapping(value = "/appContractListType")
    public @ResponseBody
    Map<String, Object> appContractListType() {
        Map<String, Object> map = new HashMap<>();

        List<ContractTypeTileVo> contractTypeTileVos = new ArrayList<>();
        ContractTypeTileVo contractTypeTileVo1 = new ContractTypeTileVo();
        contractTypeTileVo1.setTypeTitle("日期");
        List<String> arrayList1 = new ArrayList<>();
        arrayList1.add("录入日期");
        arrayList1.add("起始日期");
        arrayList1.add("截止日期");
        arrayList1.add("签订日期");
        contractTypeTileVo1.setContractTypeListVos(arrayList1);
        contractTypeTileVos.add(contractTypeTileVo1);
        ContractTypeTileVo contractTypeTileVo2 = new ContractTypeTileVo();
        contractTypeTileVo2.setTypeTitle("日期");
        List<String> arrayList2 = new ArrayList<>();
        arrayList2.add("最近30天");
        arrayList2.add("最近7天");
        arrayList2.add("今天");
        arrayList2.add("全部");
        contractTypeTileVo2.setContractTypeListVos(arrayList2);
        contractTypeTileVos.add(contractTypeTileVo2);
        ContractTypeTileVo contractTypeTileVo3 = new ContractTypeTileVo();
        contractTypeTileVo3.setTypeTitle("是否超期");
        List<String> arrayList3 = new ArrayList<>();
        arrayList3.add("已超期");
        arrayList3.add("未超期");
        contractTypeTileVo3.setContractTypeListVos(arrayList3);
        contractTypeTileVos.add(contractTypeTileVo3);
        ContractTypeTileVo contractTypeTileVo4 = new ContractTypeTileVo();
        contractTypeTileVo4.setTypeTitle("付款方式");
        List<String> arrayList4 = new ArrayList<>();
        arrayList4.add("月付");
        arrayList4.add("季付");
        arrayList4.add("半年付");
        arrayList4.add("年付");
        contractTypeTileVo4.setContractTypeListVos(arrayList4);
        contractTypeTileVos.add(contractTypeTileVo4);
        ContractTypeTileVo contractTypeTileVo5 = new ContractTypeTileVo();
        contractTypeTileVo5.setTypeTitle("付款方式");
        List<String> arrayList5 = new ArrayList<>();
        arrayList5.add("会分期");
        arrayList5.add("58月付");
        arrayList5.add("应花分期");
        arrayList5.add("管家婆");
        contractTypeTileVo5.setContractTypeListVos(arrayList5);
        contractTypeTileVos.add(contractTypeTileVo5);
        ContractTypeTileVo contractTypeTileVo6 = new ContractTypeTileVo();
        contractTypeTileVo6.setTypeTitle("是否有其他约定");
        List<String> arrayList6 = new ArrayList<>();
        arrayList6.add("有其他约定");
        arrayList6.add("无其他约定");
        contractTypeTileVo6.setContractTypeListVos(arrayList6);
        contractTypeTileVos.add(contractTypeTileVo6);

        List<Company> companies = employeeService.selectSaleCompany();

        if (contractTypeTileVos.isEmpty() || companies.isEmpty()) {
            map.put("code", 401);
            map.put("msg", "数据异常");
        } else {
            map.put("code", 200);
            map.put("data", contractTypeTileVos);
            map.put("company", companies);
        }

        return map;
    }

    /**
     * 【合同信息】合同编辑
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年2月23日
     */
    @RequestMapping("/contractEdit")
    public ModelAndView contractEdit(String contract_type) {
        ModelAndView view = new ModelAndView();
        if ("tg".contains(contract_type)) {
            view.setViewName("/appPage/contract/contractEdit_TG");
        }
        if ("zl".contains(contract_type)) {
            view.setViewName("/appPage/contract/contractEdit_ZL");
        }
        return view;
    }

    /**
     * 【合同信息】合同详情
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年2月23日
     */
    @RequestMapping("/contractInfo")
    public ModelAndView contractInfo() {
        return new ModelAndView("/appPage/contract/contractInfo");
    }

    /**
     * TODO 【合同信息】合同详情
     *
     * @param con_code
     * @return
     * @作者 JiangQT
     * @日期 2017年3月30日
     */
    @RequestMapping("/queryContractInfo")
    public @ResponseBody
    String queryContractInfo(String con_code) {
        Msg<Object> msg = new Msg<>();
        try {
            msg = contractService._queryContractInfo(con_code);
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    @RequestMapping("/queryContractRecord")
    public @ResponseBody
    String queryContractRecord(String con_code) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(con_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        msg.put("auditingRecordList", contractService.queryContractAuditingRecordList(con_code));
        return msg.toString();
    }

    /**
     * TODO 发送合同签名至客户端
     *
     * @param con_code
     * @param cs_state
     * @return
     */
    @RequestMapping("/sendContractSign")
    public @ResponseBody
    String sendContractSign(HttpServletRequest request, String con_code, Integer cs_state) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(con_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        try {
            // 状态
            cs_state = StringUtils.isEmpty(cs_state) ? 1 : cs_state;

            // 查询签名验证
            ContractSignVerifyVo contractSignVerifyVo = new ContractSignVerifyVo();
            contractSignVerifyVo.setCon_code(con_code);
            contractSignVerifyVo = contractService.queryContractSignVerify(contractSignVerifyVo);
            if (contractSignVerifyVo == null) {
                // 添加签名验证
                contractSignVerifyVo = new ContractSignVerifyVo();
                contractSignVerifyVo.setCon_code(con_code);
                contractSignVerifyVo.setCs_state(cs_state);
                contractSignVerifyVo.setCs_createTime(new Date());
                boolean boo = contractService.addContractSignVerify(contractSignVerifyVo);
                if (!boo) {
                    return msg.toError("发送签名失败");
                }
                // 合同记录
                contractService.addContractRecord(con_code, "发送客户签名", "");
            } else {
                switch (cs_state) {
                    // 更新签名
                    // 编辑中
                    // 代签字
                    case 0:
                    case 1:
                        ContractObjectVo contractObjectVo1 = new ContractObjectVo();
                        contractObjectVo1.setContractObject_Code(con_code);
                        contractObjectVo1.setContractObject_CustomerSign(null);
                        boolean boo = contractService.updateContractObjectForSignature(contractObjectVo1);
                        if (!boo) {
                            return msg.toError("发送签名失败");
                        }
                        break;
                    // 待确认
                    case 2:
                        break;
                    // 待确认
                    case 21:
                        // 创建签署合同
                        JSONObject contractSign = bestSignService.contractSign(request, con_code);

                        // 更新签名验证
                        ContractSignVerifyVo contractSignVerifyVo2 = new ContractSignVerifyVo();
                        contractSignVerifyVo2.setCs_id(contractSignVerifyVo.getCs_id());
                        contractSignVerifyVo2.setCs_fid(contractSign.getString("fId"));
                        contractSignVerifyVo2.setCs_contractId(contractSign.getString("contractId"));
                        contractSignVerifyVo2.setCs_signer(contractSign.getString("account"));
                        contractService.updateContractSignVerify(contractSignVerifyVo2);
                        // 合同记录
                        contractService.addContractRecord(con_code, "已确认客户签名，待客户确认签署合同信息", "");
                        break;
                    // 更新订单账单首期状态
                    // 确认完成
                    case 3:
                        break;
                }

                // 更新签名验证
                ContractSignVerifyVo contractSignVerifyVo1 = new ContractSignVerifyVo();
                contractSignVerifyVo1.setCs_id(contractSignVerifyVo.getCs_id());
                contractSignVerifyVo1.setCs_state(cs_state);
                boolean boo = contractService.updateContractSignVerify(contractSignVerifyVo1);
                if (!boo) {
                    return msg.toError("发送签名失败");
                }
            }
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    /**
     * 查询合同签署状态
     *
     * @param con_code
     * @return
     */
    @RequestMapping("/queryContractSignStatus")
    public @ResponseBody
    String queryContractSignStatus(String con_code) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(con_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        ContractObjectVo contractObjectVo = contractService.queryContractObject(con_code);
        if (contractObjectVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        try {
            contractService.updateContractSignStatus(contractObjectVo);
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    /**
     * 上上签合同签署推送地址
     *
     * @param httpbody
     * @return
     */
    @RequestMapping("/contractSignPushUrl")
    public @ResponseBody
    String contractSignPushUrl(HttpServletRequest request, String httpbody) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(httpbody)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        try {
            String rtick = request.getHeader("rtick");
            String sign = request.getHeader("sign");
            if (sign == null) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }
            // 验证签名
            String currentSign = EncodeUtils.md5(EncodeUtils.md5(httpbody) + rtick + BestSignUtil.developerId);
            if (!sign.equals(currentSign)) {
                return msg.toError("签名验证失败");
            }

            // 获取结果
            JSONObject json = JSONObject.parseObject(httpbody);
            if ("signContract".equals(json.getString("action"))) {
                JSONObject params = json.getJSONObject("params");
                System.out.println(params.toJSONString());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    /**
     * 确认签名
     *
     * @param con_code
     * @return
     */
    @RequestMapping("/confirmContractSign")
    public @ResponseBody
    String confirmContractSign(String con_code) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(con_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 查询签名验证
        ContractSignVerifyVo contractSignVerifyVo = new ContractSignVerifyVo();
        contractSignVerifyVo.setCon_code(con_code);
        contractSignVerifyVo = contractService.queryContractSignVerify(contractSignVerifyVo);
        if (contractSignVerifyVo == null) {
            // 添加签名验证
            contractSignVerifyVo = new ContractSignVerifyVo();
            contractSignVerifyVo.setCon_code(con_code);
            contractSignVerifyVo.setCs_state(1);
            contractSignVerifyVo.setCs_createTime(new Date());
            boolean boo = contractService.addContractSignVerify(contractSignVerifyVo);
            if (!boo) {
                return msg.toError("发送签名失败");
            }
        } else {
            // 更新签名验证
            contractSignVerifyVo = new ContractSignVerifyVo();
            contractSignVerifyVo.setCs_id(contractSignVerifyVo.getCs_id());
            contractSignVerifyVo.setCon_code(con_code);
            contractSignVerifyVo.setCs_state(1);
            boolean boo = contractService.updateContractSignVerify(contractSignVerifyVo);
            if (!boo) {
                return msg.toError("发送签名失败");
            }

            // 更新签名
            ContractObjectVo contractObjectVo = new ContractObjectVo();
            contractObjectVo.setContractObject_Code(con_code);
            contractObjectVo.setContractObject_CustomerSign(null);
            boo = contractService.updateContractObjectForSignature(contractObjectVo);
            if (!boo) {
                return msg.toError("发送签名失败");
            }
        }
        return msg.toString();
    }

    /**
     * 【合同信息】更多操作
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年4月29日
     */
    @RequestMapping("/contractMore")
    public ModelAndView contractMore() {
        return new ModelAndView("/appPage/contract/contractMore");
    }

    /**
     * 【合同信息】合同保存
     *
     * @param data
     * @return
     * @作者 JiangQT
     * @日期 2017年3月20日
     */
    @RequestMapping("/contractSave")
    public @ResponseBody
    String addContractObject(@RequestBody JSONObject data) {
        Msg<Object> msg = new Msg<>();
        if (data == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        try {
            ViewBusinessContractVo contractVo = null;
            switch (data.getString("mode")) {
                case "add":
                case "renew":
                case "change":
                    contractVo = contractService.addContractService(data);
                    msg.setData(contractVo);
                    break;
                case "perfect":
                    contractService.updateContractAttachInfoService(data);
                    break;
                case "edit":
                    contractVo = contractService.updateContractService(data);
                    msg.setData(contractVo);
                    break;
                default:
                    return msg.toError(110, "模式错误，请联系管理员");
            }

            // 【绑定证件】
            if (contractVo != null) {
                UserCustomer userCustomer2 = new UserCustomer();
                userCustomer2.setContractObject_code(contractVo.getContractObject_Code());
                List<UserCustomer> userCustomers = customerService.queryCustomerRelaContractList(userCustomer2);
                for (UserCustomer customer: userCustomers) {
                    if (customer.getCc_cardNum() == null) {
                        throw new AppException("请给该客户添加证件信息");
                    }
                    userService.insertCardContracts(customer.getCc_cardNum(), contractVo.getContractObject_Id());
                }
            }
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    /**
     * 【合同信息】上传合同签名
     *
     * @param request
     * @param con_code
     * @return
     * @throws Exception
     * @作者 JiangQT
     * @日期 2017年3月30日
     */
    @RequestMapping(value = "/uploadContractSignature", produces = "text/json;charset=UTF-8")
    public @ResponseBody
    String uploadContractSignature(MultipartHttpServletRequest request, String con_code, String statement_code) {
        Msg<Object> msg = new Msg<>();
        boolean boo = false;
        try {
            MultipartFile file = request.getFiles("file").get(0);
            if (!StringUtils.isEmpty(con_code)) {
                // 【更新客户签名】
                contractService.updateContractSign(con_code, file.getBytes());
            } else if (!StringUtils.isEmpty(statement_code)) {
                UserCenterStatementVo statementVo = new UserCenterStatementVo();
                statementVo.setStatement_code(statement_code);
                statementVo.setStatement_sign(file.getBytes());
                boo = statementService.updateStatement(statementVo);
            } else {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }
        } catch (AppException e) {
            return msg.toError(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(Msg.MSG_SYSTEM_ERROR);
        }
        if (!boo) {
            return msg.toError("更新数据失败");
        }
        return msg.toString();
    }

    /**
     * 【合同信息】完善合同
     *
     * @return
     * @throws Exception
     * @作者 JiangQT
     * @日期 2017年3月31日
     */
    @RequestMapping(value = "/contractPerfected")
    public ModelAndView contractPerfected() {
        return new ModelAndView("/appPage/contract/contractPerfected");
    }

    /**
     * 【合同信息】合同首期账单支付
     *
     * @return
     * @throws Exception
     * @作者 JiangQT
     * @日期 2017年3月31日
     */
    @RequestMapping(value = "/contractBillPay")
    public ModelAndView contractBillPay() {
        return new ModelAndView("/appPage/finance/billPay");
    }

    /**
     * 【合同信息】初始化账单
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年4月14日
     */
    @RequestMapping(value = "/queryContractOrderInfo")
    public @ResponseBody
    String initContractBill(String bco_code) {
        Msg<Object> msg = new Msg<>();
        HashMap<String, Object> map = new HashMap<>();
        if (StringUtils.isEmpty(bco_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        // 合同订单数据
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setBco_code(bco_code);
        contractOrderVo = financeManageService.queryFinanceOrder(contractOrderVo);
        if (contractOrderVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        map.put("contractOrder", contractOrderVo);

        // 合同账单数据
        List<ContractBillVo> contractBillList = billContractOrderService.queryContractBillList(contractOrderVo.getBco_code(), null);
        map.put("contractBillList", contractBillList);

        // 合同数据
        ContractObjectVo contractObject = contractService.queryContractObject(contractOrderVo.getContractObject_code());
        if (contractObject == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        map.put("contractObject", contractObject);

        // 房源数据
        ViewHouseLibraryInfoVo houseLibraryInfo = houseLibraryService.queryHouseLibraryInfo(contractObject.getHi_code());
        map.put("houseLibraryInfo", houseLibraryInfo);

        // 客户数据
        UserCustomer customerInfo = customerService.queryCustomerInfo(contractObject.getContractObject_1st());
        map.put("customerInfo", customerInfo);

        return msg.toString(map);
    }

    // ========================================================

    /**
     * 【招租订单】招租订单详情页面
     *
     * @return
     */
    @RequestMapping("/cancelContractInfo")
    public String cancelContractInfo() {
        return "/appPage/cancelContractInfo";
    }

    /**
     * 【招租订单】查看招租订单详情
     *
     * @return
     */
    @RequestMapping("/queryCancelContractInfo")
    public @ResponseBody
    String queryCancelContractInfo(String cco_code) {
        Msg<Object> msg = new Msg<>();

        // 【招租订单】
        ViewBusinessCancelContractListVo cancelContractListVo = new ViewBusinessCancelContractListVo();
        cancelContractListVo.setCco_code(cco_code);
        cancelContractListVo = contractService.queryCancelContractByCode(cancelContractListVo);
        if (cancelContractListVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        msg.put("cancelContract", cancelContractListVo);

        // 【合同信息】
        ViewBusinessContractVo businessContractVo = new ViewBusinessContractVo();
        businessContractVo.setContractObject_Code(cancelContractListVo.getContractObject_Code());
        businessContractVo = contractService.selectContractObjectByCNo(businessContractVo);
        if (businessContractVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        // 获取审核主管
        RecordContractOrderAuditingVo auditingVo = new RecordContractOrderAuditingVo();
        auditingVo.setCco_code(cco_code);
        auditingVo.setLike_auditingRecord_state("待复核");
        List<RecordContractOrderAuditingVo> contractOrderRecordList = recordService.queryContractOrderRecordList(auditingVo);
        if (!contractOrderRecordList.isEmpty()) {
            int index = 0;
            if (contractOrderRecordList.size() > 1) {
                index = contractOrderRecordList.size() - 1;
            }
            businessContractVo.setUcc_corporation(contractOrderRecordList.get(index).getAuditingRecord_author());
        }
        // 财务复核人员信息
        auditingVo = new RecordContractOrderAuditingVo();
        auditingVo.setCco_code(cco_code);
        auditingVo.setLike_auditingRecord_state("完成");
        List<RecordContractOrderAuditingVo> contractOrderRecordList1 = recordService.queryContractOrderRecordList(auditingVo);
        if (!contractOrderRecordList1.isEmpty()) {
            int index = 0;
            if (contractOrderRecordList1.size() > 1) {
                index = contractOrderRecordList1.size() - 1;
            }
            businessContractVo.setEm_reviewer(contractOrderRecordList1.get(index).getAuditingRecord_author());
        }
        msg.put("contract", businessContractVo);

        // 【交接数据】
        HandoverPropertyMainVo propertyMainVo = new HandoverPropertyMainVo();
        propertyMainVo.setContractObject_code(businessContractVo.getContractObject_Code());
        if (AppConfig.TYPE_CONTRACT_201.equals(businessContractVo.getContractObject_Type())) {
            propertyMainVo.setHpm_type(0);
        }
        if (AppConfig.TYPE_CONTRACT_202.equals(businessContractVo.getContractObject_Type())) {
            propertyMainVo.setHpm_type(1);
        }
        // propertyMainVo.setHpm_state(0);
        propertyMainVo = handoverPropertyService.queryHandoverPropertyMain(propertyMainVo);
        msg.put("propertyMain", propertyMainVo);

        // 【结算数据】
        UserCenterStatementVo statementVo = new UserCenterStatementVo();
        statementVo.setCco_code(cco_code);
        statementVo = statementService.queryStatementOrder(statementVo);
        msg.put("statementOrder", statementVo);

        // 【查询客户信息】
        UserCustomer customer = new UserCustomer();
        customer.setContractObject_code(cancelContractListVo.getContractObject_Code());
        List<UserCustomer> customerRelaContractList = customerService.queryCustomerRelaContractList(customer);
        if (!customerRelaContractList.isEmpty()) {
            customer = customerRelaContractList.get(0);
            if (customer != null) {
                UserCustomerBank customerBank = new UserCustomerBank();
                customerBank.setCc_id(customer.getCc_id());
                customer.setCustomerBank(customerService.queryCustomerBank(customerBank));
            }
        }
        msg.put("customer", customer);

        return msg.toString();
    }

    // ========================================================

    /**
     * 【客户信息】搜索客户
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年3月06日
     */
    @RequestMapping("/customerSearch")
    public String customerSearch() {
        return "/appPage/customer/customerSearch";
    }

    /**
     * 【客户信息】查询客户
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年3月27日
     */
    @RequestMapping("/queryCustomer")
    public @ResponseBody
    String queryCustomer(String cc_code) {
        Msg<Object> msg = new Msg<>();

        if (StringUtils.isEmpty(cc_code)) return msg.toError(Msg.MSG_PARAM_ERROR);

        UserCustomer customer = customerService.queryCustomerInfo(cc_code);
        msg.put("customer", customer);

        if (customer == null) return msg.toError("客户数据为空");

        // 电话号码
        msg.put("customerPhones", customerService.queryCustomerPhone(customer.getCc_id()));

        // 图片
        msg.put("customerImages", customerService.queryCustomerImage(customer.getCc_id()));

        // 银行卡
        msg.put("customerBanks", customerService.queryCustomerBankList(customer.getCc_id()));

        return msg.toString();
    }

    /**
     * 【客户信息】编辑客户
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年3月06日
     */
    @RequestMapping("/customerEdit")
    public String customerEdit() {
        return "/appPage/customer/customerEdit";
    }

    /**
     * 【客户信息】保存客户数据
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年3月27日
     */
    @RequestMapping("/customerSave")
    public @ResponseBody
    String customerSave(@RequestBody JSONObject data) {
        Msg<Object> msg = new Msg<>();
        if (data == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        try {
            msg = customerService.editCustomer(data);
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(Msg.MSG_SYSTEM_ERROR);
        }
        return msg.toString();
    }

    /**
     * 【客户信息】查询客户-查询客户分页列表
     *
     * @param pagination
     * @param customer
     * @param response
     * @return
     * @作者 JiangQT
     * @日期 2017年3月7日
     */
    @RequestMapping("/customerSearch/queryCustomerPageList")
    public @ResponseBody
    String queryCustomerList(Pagination<UserCustomer> pagination, UserCustomer customer, HttpServletResponse response) {
        response.addHeader("Access-Control-Allow-Origin", "*");
        Msg<Object> msg = new Msg<>();
        pagination.init();
        pagination.setT(customer);
        pagination = customerService.queryCustomerInfoPageList(pagination);
        return msg.toString(pagination);
    }

    // ========================================================

    /**
     * 【管家信息】搜索管家
     *
     * @param em_id
     * @return
     * @作者 JiangQT
     * @日期 2017年3月17日
     */
    @RequestMapping("/housekeeperSearch")
    public ModelAndView housekeeperSearch(Integer em_id) {
        ModelAndView view = new ModelAndView("/appPage/housekeeperSearch");
        UserCenterEmployee employee = new UserCenterEmployee();
        employee.setEm_id(em_id);
        employee = employeeService.queryEmployeeInfo(employee);
        view.addObject("currentDepartment", employee);
        return view;
    }

    /**
     * 【管家信息】搜索管家-部门
     *
     * @param ucc_id
     * @return
     * @作者 JiangQT
     * @日期 2017年3月17日
     */
    @RequestMapping("/housekeeperDepartment")
    public @ResponseBody
    String housekeeperDepartment(Integer ucc_id, Integer em_id) {
        Msg<Object> msg = new Msg<>();
        Company company = new Company();
        if (!StringUtils.isEmpty(ucc_id)) {
            company.setUcc_id(ucc_id);
        }
        if (!StringUtils.isEmpty(em_id)) {
            UserCenterEmployee centerEmployee = new UserCenterEmployee();
            centerEmployee.setEm_id(em_id);
            centerEmployee = employeeService.queryEmployeeInfo(centerEmployee);
            if (centerEmployee != null) {
                company.setUcc_id(centerEmployee.getUcc_id());
            }
        }
        List<Company> companys = employeeService.queryCompanyList(company);
        return msg.toString(companys);
    }

    /**
     * 【管家信息】搜索管家-管家列表
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年3月17日
     */
    @RequestMapping("/queryHousekeeperList")
    public @ResponseBody
    String queryHousekeeperList(Pagination<UserCenterEmployee> pagination, UserCenterEmployee employee) {
        Msg<Object> msg = new Msg<>();
        pagination.init();
        pagination.setT(employee);
        pagination = employeeService.queryEmployeePageList(pagination);
        return msg.toString(pagination);
    }

    // =========================老版本服务(废弃)===============================

    /**
     * 【服务管理】服务订单
     *
     * @return
     * @author 陈智颖
     * @date Mar 31, 2017 7:32:01 PM
     */
    @RequestMapping("/servicePage")
    public String servicePage() {
        return "/appPage/service";
    }

    /**
     * 老版本【服务管理】服务订单
     *
     * @return
     */
    @RequestMapping("/servicePageOld")
    public String servicePageOld() {
        return "/appPage/serviceOld";
    }


    /**
     * 现场确认
     *
     * @return
     * @author 陈智颖
     * @date Mar 31, 2017 7:32:01 PM
     */
    @RequestMapping("/sceneService")
    public String sceneService() {
        return "/appPage/service/sceneService";
    }

    /**
     * 老版本现场确认
     *
     * @return
     * @author 陈智颖
     * @date Mar 31, 2017 7:32:01 PM
     */
    @RequestMapping("/serviceSceneOld")
    public String serviceSceneOld() {
        return "/appPage/service/sceneServiceOld";
    }

    /**
     * 【服务管理】服务引导页面
     *
     * @return
     * @author 陈智颖
     * @date Mar 31, 2017 7:31:45 PM
     */
    @RequestMapping("/servicePages")
    public String servicePages() {
        return "/appPage/servicePage";
    }

    /**
     * 老版本【服务管理】服务引导页面
     *
     * @return
     */
    @RequestMapping("/servicePagesOld")
    public String servicePagesOld() {
        return "/appPage/servicePagesOld";
    }

    /**
     * 老版本【服务管理】服务订单
     *
     * @return
     */
    @RequestMapping("/serviceContentOld")
    public String serviceContentOld() {
        return "appPage/serviceContentOld";
    }

    /**
     * 老版本【服务管理】服务费用
     *
     * @return
     */
    @RequestMapping("/serviceMoneyOld")
    public String serviceMoneyOld() {
        return "appPage/service/serviceMoneyOld";
    }

    /**
     * 【服务管理】服务订单
     *
     * @return
     * @author 陈智颖
     * @date Mar 31, 2017 7:31:27 PM
     */
    @RequestMapping("/serviceCostList")
    public String serviceCostList() {
        return "/appPage/serviceCostList";
    }

    @RequestMapping("/queryServiceCostList")
    public @ResponseBody
    String queryServiceCostList(Integer md_id) {
        Msg<Object> msg = new Msg<>();
        // 获取服务订单
        MaintenanceDeclaration declaration = serviceService.selectDeclarationById(md_id);
        if (declaration == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        msg.put("declaration", declaration);

        // 获取服务费用清单
        ServiceMoney serviceMoney = new ServiceMoney();
        serviceMoney.setMd_id(declaration.getMd_id());
        List<ServiceMoney> serviceMoneyList = serviceMoneyService.selectServiceMoney(serviceMoney);
        msg.put("serviceMoneyList", serviceMoneyList);
        return msg.toString();
    }

    @RequestMapping("/updateServiceCostList")
    public @ResponseBody
    String updateServiceCostList(String data) {
        Msg<Object> msg = new Msg<>();
        try {
            if (StringUtils.isEmpty(data)) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }
            JSONObject json = JSONObject.parseObject(data);
            msg = serviceService.updateServiceCostList(json);
        } catch (AppException e) {
            e.printStackTrace();
            return msg.toError(e.getMsg());
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(Msg.MSG_SYSTEM_ERROR);
        }

        return msg.toString();
    }

    /**
     * 【服务管理】添加服务订单
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年3月28日
     */
    @RequestMapping("/serviceEdit")
    public ModelAndView serviceEdit() {
        return new ModelAndView("/appPage/serviceEdit");
    }

    /**
     * 【服务管理】查询服务信息
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年3月28日
     */
    @RequestMapping("/queryServiceInfo")
    public @ResponseBody
    String queryServiceInfo() {
        Msg<Object> msg = new Msg<>();
        HashMap<String, Object> map = new HashMap<>();

        map.put("contractTypeList", contractService.selectContractTypeByParentId(EnumTypeStatus.TYPE_SERVICE_APPLY_TYPE.getId()));

        List<ServiceMessage> serviceList = serviceService.selectServiceList();
        map.put("serviceList", serviceList);

        List<ServiceType> typeList = null;
        if (serviceList != null && serviceList.size() > 0) {
            ServiceType serviceType = new ServiceType();
            serviceType.setSm_id(serviceList.get(0).getSm_id());
            typeList = serviceService.selectServiceTypeList(serviceType);
        }
        map.put("typeList", typeList);
        return msg.toString(map);
    }

    /**
     * 【服务管理】保存服务数据
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年3月28日
     */
    @RequestMapping("/serviceSave")
    public @ResponseBody
    String serviceSave(String serviceDesc, String serviceContent, String serviceObjHouseCode, String serviceProblemDesc, String serviceApplyType, String serviceObjName, String serviceObjPhone, String contactPeople, String contactPhone, String[] servicePicDesc, String serviceObjMoney, String
            serviceObjStartObjctNo, Integer em_id, HttpServletRequest request) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = new UserCenterEmployee();
        employee.setEm_id(em_id);
        employee = employeeService.queryEmployeeInfo(employee);
        if (employee == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        MaintenanceDeclaration declaration = new MaintenanceDeclaration();
        declaration.setHi_code(serviceObjHouseCode);
        declaration.setMd_number(new Date().getTime() + employee.getEm_id() + "");
        declaration.setMd_problem((StringUtils.isEmpty(serviceDesc) ? "" : "[" + serviceDesc + "] ") + serviceProblemDesc);
        declaration.setMd_people(serviceObjName);
        declaration.setMd_phone(serviceObjPhone);
        declaration.setMd_contactpeople(contactPeople);
        declaration.setMd_contactPhone(contactPhone);
        declaration.setMd_time(new Date());
        declaration.setMd_state(AppConfig.SERVICE_STATE_NO);
        declaration.setMd_source(AppConfig.SERVICE_APPLY_SOURCE1);
        declaration.setMd_agentApplyer(employee.getEm_id());// 代理申请人
        declaration.setMd_type(serviceContent);
        declaration.setMd_applyType(serviceApplyType);

        if (serviceObjMoney != null && !serviceObjMoney.equals("null")) {
            // 保洁订单和账单生成
            BillClearOrder billClearOrder = new BillClearOrder();
            Random random = new Random();
            Integer rd = random.nextInt(9999 - 1000 + 1) + 1000;
            String number = "240" + (new Date()).getTime() + rd.toString();
            billClearOrder.setBco_code(number);
            billClearOrder.setBco_contractCode(serviceObjStartObjctNo);
            billClearOrder.setBco_name(serviceObjName);
            billClearOrder.setBco_phone(serviceObjPhone);
            if (serviceContent.equals("按次保洁")) {
                billClearOrder.setBco_payState("待保洁");
            } else {
                billClearOrder.setBco_payState("待" + serviceContent.substring(2, 4));
            }
            billClearOrder.setBco_shouldMoney(new Double(serviceObjMoney));
            billClearOrder.setBco_numMoney(new Double(serviceObjMoney));
            billClearOrder.setBco_state("正常");
            switch (serviceContent) {
                case "按次保洁":
                case "特殊保洁":
                    billClearOrder.setBco_num(1);
                    break;
                case "包月保洁":
                    billClearOrder.setBco_num(4);
                    break;
                default:
                    billClearOrder.setBco_num(1);
                    break;
            }
            Integer bool = billClearOrderService.addBillClearOrder(billClearOrder);
            Integer bools = 0;
            if (bool > 0) {
                BillClearBill bill = new BillClearBill();
                switch (serviceContent) {
                    case "按次保洁":
                    case "特殊保洁":
                        bill.setCb_code(number);
                        bill.setCb_name(serviceObjName);
                        bill.setCb_phone(serviceObjPhone);
                        bill.setCb_state("待保洁");
                        bill.setCb_shouldMoney(new Double(serviceObjMoney));
                        bill.setCb_payCycleNum("1");
                        bools = billClearBillService.addBillClearBill(bill);
                        billClearOrder.setBco_num(1);
                        break;
                    case "包月保洁":
                        for (int i = 1; i < 5; i++) {
                            bill.setCb_code(number);
                            bill.setCb_name(serviceObjName);
                            bill.setCb_phone(serviceObjPhone);
                            bill.setCb_state("待保洁");
                            bill.setCb_shouldMoney(new Double(serviceObjMoney));
                            bill.setCb_payCycleNum(String.valueOf(i));
                            bools = billClearBillService.addBillClearBill(bill);
                        }
                        break;
                    default:
                        bill.setCb_code(number);
                        bill.setCb_name(serviceObjName);
                        bill.setCb_phone(serviceObjPhone);
                        bill.setCb_state("待" + serviceContent.substring(2, 4));
                        bill.setCb_shouldMoney(new Double(serviceObjMoney));
                        bill.setCb_payCycleNum("1");
                        bools = billClearBillService.addBillClearBill(bill);
                        break;
                }

            }

            String orderNo = null;
            if (bools > 0) {
                orderNo = number;
            }
            declaration.setMd_clearOrder(orderNo);
        }

        boolean boo = serviceService.addDeclarationInfo(declaration);
        if (!boo) {
            return msg.toError("申请失败");
        }
        if (!StringUtils.isEmpty(servicePicDesc) && servicePicDesc.length > 0) {
            for (String str: servicePicDesc) {
                MaintenanceImage image = new MaintenanceImage();
                image.setMd_id(declaration.getMd_id());
                // image.setMi_name();
                image.setMi_path(str);
                serviceService.addDeclarationImagePath(image);
            }
        }
        // 添加订单流程
        MaintenanceOrder order = new MaintenanceOrder();
        order.setMd_id(declaration.getMd_id());
        order.setMo_date(new Date());
        order.setMo_state(AppConfig.SERVICE_PROC_0);
        order.setMo_step(0);
        order.setMo_content("服务受理");
        serviceService.addOrder(order);
        msg.setData("/service/myService");

        // 插入消息提醒
        List<UserCenterEmployee> selectUserCenterEmployeeService = employeeService.selectUserCenterEmployeeService();
        for (UserCenterEmployee userCenterEmployee: selectUserCenterEmployeeService) {
            UserMessageContent userMessageContent = new UserMessageContent();
            userMessageContent.setUmc_name("服务处理");
            userMessageContent.setUmc_content(userCenterEmployee.getEm_name() + "你有一个服务申请需要受理");
            userMessageContent.setUmc_href("/service/service");
            userMessageContent.setUmc_account(userCenterEmployee.getEm_account());
            userMessageContent.setEm_id(userCenterEmployee.getEm_id());
            userMessageContent.setUmc_bool(0);
            Integer bool = userMessageContentService.addUserMessageContent(userMessageContent);

            if (bool > 0) {
                // 插入XML文件
                // 根目录路径
                String path = request.getSession().getServletContext().getRealPath("/");
                List<Object> userMessageContents = new ArrayList<>();
                userMessageContents.add(userMessageContent);
                List<UserMessageContent> xmltoClass = XmlClass.xmltoClass(path, "message.xml", userMessageContent);
                if (xmltoClass == null) {
                    XmlClass.classtoXml(path, userMessageContents, "message.xml", userMessageContent);
                } else {
                    userMessageContents.addAll(xmltoClass);
                    XmlClass.classtoXml(path, userMessageContents, "message.xml", userMessageContent);
                }
            }
        }
        return msg.toString();
    }

    /**
     * 新版服务订单列表
     *
     * @param serviceOrderVo
     * @return
     */
    @RequestMapping(value = "/serviceOrderInfoList")
    public @ResponseBody
    String serviceOrderInfoList(ServiceOrderVo serviceOrderVo, String type) {
        Msg<Object> msg = new Msg<>();
        List<ServiceOrderVo> serviceOrderVos = null;
        try {
            serviceOrderVos = serviceService.selectServiceOrderInfoList(serviceOrderVo);
            msg.setCode(200);
            msg.setData(serviceOrderVos);
        } catch (Exception e) {
            msg.setCode(401);
            msg.setMsg("请联系管理员");
            e.printStackTrace();
        }
        return msg.toString();
    }

    /**
     * app服务列表
     *
     * @param pageNo    开始页码
     * @param em_id     内部人员编码
     * @param mdg_state 服务状态 （未接单、服务中、已完成） 全部 传空
     * @param where     搜索条件(房源地址或者用户名称)
     * @return
     */
    @RequestMapping(value = "/appServiceList")
    public @ResponseBody
    Map<String, Object> appServiceList(Integer pageNo, Integer em_id, String mdg_state, String where) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Map<String, Object> map = new HashMap<>();
        pageNo = (pageNo - 1) * 10;
        ServiceOrderVo serviceOrderVo = new ServiceOrderVo();
        serviceOrderVo.setPageNo(pageNo);
        serviceOrderVo.setMdg_state(mdg_state);
        PersionVo persionVo = new PersionVo();
        persionVo.setEm_id(em_id);
        List<PersionVo> persionVos = employeeService.selectSaleCompanyPersion(persionVo);
        for (PersionVo persionVo1: persionVos) {
            if (persionVo1.getUcc_id() == 43 && persionVo1.getUcc_id() == 44) {
                serviceOrderVo.setType("my");
                serviceOrderVo.setSo_currentCharger(em_id);
            } else if (persionVo1.getUcp_name().contains("保洁") || persionVo1.getUcp_name().contains("维修")) {
                serviceOrderVo.setType("person");
                serviceOrderVo.setSo_currentCharger(em_id);
            }
        }
        serviceOrderVo.setWhere(where);
        List<ServiceOrderVo> serviceOrderVos = serviceService.selectServiceOrderInfoList(serviceOrderVo);
        for (ServiceOrderVo serviceOrderVo1: serviceOrderVos) {
            serviceOrderVo1.setSo_createTimeStr(sdf.format(serviceOrderVo1.getSo_createTime()));
            Map<String, String> stateMap = AppUtil.serviceState(serviceOrderVo1.getSo_state());
            serviceOrderVo1.setSo_state_str(stateMap.get("state"));
            serviceOrderVo1.setSo_state_color(stateMap.get("stateColor"));
        }
        if (serviceOrderVos.isEmpty()) {
            map.put("code", 401);
            if (pageNo == 0) {
                map.put("msg", "数据为空");
            } else {
                map.put("msg", "没有更多数据");
            }
        } else {
            map.put("code", 200);
            map.put("data", serviceOrderVos);
        }
        return map;
    }

    /**
     * 查询服务费用
     */
    @RequestMapping(value = "/contractCharge")
    public @ResponseBody
    String contractCharge(ServiceOrderVo serviceOrderVo) {
        Msg<Object> msg = new Msg<>();
        if (!StringUtils.isEmpty(serviceOrderVo.getHi_code())) {
            ContractObjectVo contractObjectVo = new ContractObjectVo();
            int payObject = serviceOrderVo.getSo_payObject();
            if (payObject == 4 || payObject == 5) {
                contractObjectVo.setHi_code(serviceOrderVo.getHi_code());
                contractObjectVo.setCc_name(serviceOrderVo.getSo_payNameNew());
                if (payObject == 4) {
                    contractObjectVo.setContractObject_Type("租赁合同");
                }
                if (payObject == 5) {
                    contractObjectVo.setContractObject_Type("托管合同");
                }
                List<ContractObjectVo> objectVoList = serviceService.queryContractCustomerByCode(contractObjectVo);
                if (null != objectVoList && !objectVoList.isEmpty()) {
                    msg.put("contractCharge", objectVoList.get(0));
                }
            }
        }
        return msg.toString();
    }

    /**
     * 新版添加现场确认列表
     *
     * @param problem
     * @param so_id
     * @return
     * @author wxr
     * @date Jun 3, 2017 11:42:11 AM
     */
    @RequestMapping(value = "/addProblemList")
    public @ResponseBody
    String addProblemList(String problem, Integer so_id, Integer em_id, Integer spp_isConform) {
        Msg<Object> msg = new Msg<>();
        try {
            ServiceProcessProblemVo problem1 = new ServiceProcessProblemVo();
            problem1.setSpp_content(problem);
            problem1.setSo_id(so_id);
            problem1.setEm_id(em_id);
            problem1.setSsp_type(1);
            problem1.setSpp_isConform(spp_isConform);
            serviceService.addserviceProcessProblem(problem1);

            ServiceProcessVo serviceProcessVo = new ServiceProcessVo();
            serviceProcessVo.setSo_id(so_id);
            msg = serviceService.serviceTracks(serviceProcessVo, "3201", em_id, null);
        } catch (Exception e) {
            msg.setCode(401);
            msg.setMsg("系统异常");
            e.printStackTrace();
        }
        return msg.toString();
    }

    // ========================================================

    /**
     * 【物业交接】物业编辑
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年4月7日
     */
    @RequestMapping("/propertyHandoverEdit")
    public String propertyHandoverEdit() {
        return "/appPage/property/propertyHandoverEdit";
    }

    /**
     * 【物业交接】物业信息
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年4月29日
     */
    @RequestMapping("/propertyHandoverInfo")
    public String propertyHandoverInfo() {
        return "/appPage/property/propertyHandoverInfo";
    }

    /**
     * 【费用结算】费用结算编辑
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年4月7日
     */
    @RequestMapping("/propertySettlementEdit")
    public String propertySettlementEdit() {
        return "/appPage/property/propertySettlementEdit";
    }

    /**
     * 【费用结算】费用结算详情
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年4月29日
     */
    @RequestMapping("/propertySettlementInfo")
    public String propertySettlementInfo() {
        return "/appPage/property/propertySettlementInfo";
    }

    /**
     * 【费用结算】费用结算项
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年4月7日
     */
    @RequestMapping("/propertySettlementItem")
    public String propertySettlementItem() {
        return "/appPage/property/propertySettlementItem";
    }

    /**
     * 【物业交接】保存交接数据
     *
     * @param data
     * @return
     * @作者 JiangQT
     * @日期 2017年4月8日
     */
    @RequestMapping("/propertyHandoverSave")
    public @ResponseBody
    String propertyHandoverSave(@RequestBody Map<String, Object> data) {
        Msg<Object> msg = new Msg<>();
        try {
            HandoverPropertyMainVo propertyMainNew = JSONObject.parseObject((String) data.get("handoverMain"), HandoverPropertyMainVo.class);
            String mode = (String) data.get("mode");

            UserCenterEmployee employee = new UserCenterEmployee();
            if ("normal".equals(mode)) {
                employee.setEm_id(propertyMainNew.getHpm_handoverPersonIn());
            }
            if ("compary".equals(mode)) {
                employee.setEm_id(propertyMainNew.getHpm_handoverPersonOut());
            }
            employee = employeeService.queryEmployeeInfo(employee);
            if (employee == null) {
                return msg.toString(110, Msg.MSG_LOGIN_ERROR);
            }
            msg = propertyTransferService.editPropertyHandover(data, employee);
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
     * 【招租订单】提交审核
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年5月23日
     */
    @RequestMapping("/submitCancelContractAuditing")
    public @ResponseBody
    String submitCancelContractAuditing(String cco_code) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(cco_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        // 更改招租合约
        BusinessCancelContractOrder contractOrder = new BusinessCancelContractOrder();
        contractOrder.setCco_code(cco_code);
        contractOrder.setCco_state(AppConfig.CANCEL_CONTRACT_STATE_4);
        boolean boo = contractService.updateCancelContractOrder(contractOrder);
        if (!boo) {
            return msg.toError("数据提交失败，请重试或联系管理员");
        }
        return msg.toString();
    }

    // ========================================================

    /**
     * 待办合同
     *
     * @return
     * @author 陈智颖
     * @date Mar 31, 2017 5:26:39 PM
     */
    @RequestMapping("/stayThingContract")
    public String stayThingContract() {
        return "/appPage/stay/stayThingContract";
    }

    /**
     * 结算订单
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年4月20日
     */
    @RequestMapping("/stayThingSettlement")
    public String stayThingSettlement() {
        return "/appPage/stay/stayThingSettlement";
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
    @RequestMapping(value = "/uploadFile", produces = "text/json;charset=UTF-8")
    public @ResponseBody
    String uploadFile(MultipartHttpServletRequest request, String type, Double width, Double quality) {
        return contractService.uploadFile(request, type).toString();
    }

    /**
     * 删除图片
     *
     * @param id 用户编号
     * @return
     * @throws IOException
     */
    @RequestMapping("/deleteFile")
    public @ResponseBody
    String deleteImage(String type, String file, Integer id) {
        Msg<Object> msg = new Msg<>();
        try {
            contractService.deleteFile(file);
        } catch (AppException e) {
            e.printStackTrace();
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        if ("contract".equals(type) && !StringUtils.isEmpty(id)) {
            ContractImageVo contractImageVo = new ContractImageVo();
            contractImageVo.setCi_id(id);
            contractService.deleteContractImage(contractImageVo);
        }
        if ("customer".equals(type) && !StringUtils.isEmpty(id)) {
            UserCustomerImage customerImage = new UserCustomerImage();
            customerImage.setCci_id(id);
            customerService.deleteCustomerImage(customerImage);
        }
        return msg.toString();
    }

    /**
     * 房屋带看页面
     *
     * @return
     * @author 王孝元
     */
    @RefreshCSRFToken
    @RequestMapping(method = RequestMethod.GET, value = "/houseSeeing")
    public String houseSeeing() {
        return "/appPage/houseSeeing";
    }

    /**
     * 房屋带看页面
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/myselfMoney")
    public String myselfMoney() {
        return "/appPage/myselfMoney";
    }

    /**
     * 财务管理
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/myselfMoneyPage")
    public String myselfMoneyPage() {
        return "/appPage/myselfMoneyPage";
    }

    /**
     * 房态管理页面
     *
     * @return
     * @author shenhx
     */
    @RequestMapping("/houseStatusList")
    public String houseStatusList() {
        return "/appPage/stay/houseStatusList";
    }

    /**
     * 【合同信息】跳转租赁合同信息打印
     *
     * @return
     * @作者 shenhx
     * @日期 2017年3月29日
     */
    @RequestMapping("/contractZLPrint")
    public ModelAndView contractZLPrint() {
        return new ModelAndView("/appPage/contract/contractZLPrint");
    }

    /**
     * 【合同信息】跳转托管合同信息打印
     *
     * @return
     * @作者 shenhx
     * @日期 2017年3月29日
     */
    @RequestMapping("/contractTGPrint")
    public ModelAndView contractTGPrint() {
        return new ModelAndView("/appPage/contract/contractTGPrint");
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
        versionManage.setContract_uses("preview");
        versionManage.setContract_where("ERP_APP");
//        versionManage = contractService.queryContractVersion(versionManage);
//        view.setViewName(versionManage.getContract_path());

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
    @RequestMapping("/queryContractPrint")
    public @ResponseBody
    Map<String, Object> queryContractPrint(String con_code) throws AppException {
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
        contractOrderVo = financeManageService.queryFinanceOrder(contractOrderVo);
        List<ContractBillVo> billContractList = billContractOrderService.queryContractBillList(contractOrderVo.getBco_code(), null);
        if (null != billContractList) {

            for (ContractBillVo billVo: billContractList) {
                billVo.setRepaymentDateArr(DataUtil.DateToStrs(billVo.getBcb_repaymentDate()).split("-"));
            }
            resultMap.put("billContractList", billContractList);
        }

        return resultMap;
    }

    /**
     * 【合同信息】客户APP跳转托管合同信息预览
     *
     * @param con_code 合同编码
     * @return
     * @throws AppException
     * @作者 shenhx
     * @日期 2017年7月4日
     */
    @RequestMapping("/contractPrint_TG")
    public ModelAndView contractPrint_TG(String con_code) throws AppException {
        ModelAndView view = new ModelAndView();
        view.setViewName("/appPage/contract/contractPrint_TG");
        queryContractInfo(view, con_code);
        return view;
    }

    /**
     * 【合同信息】客户APP跳转租赁合同信息预览
     *
     * @param con_code 合同编码
     * @return
     * @throws AppException
     * @作者 shenhx
     * @日期 2017年7月4日
     */
    @RequestMapping("/contractPrint_ZL")
    public ModelAndView contractPrint_ZL(String con_code) throws AppException {
        ModelAndView view = new ModelAndView();
        view.setViewName("/appPage/contract/contractPrint_ZL");
        queryContractInfo(view, con_code);
        return view;
    }

    private void queryContractInfo(ModelAndView view, String con_code) throws AppException {
        if (StringUtils.isEmpty(con_code)) {
            throw new AppException("参数错误，合同编码为空异常");
        }
        // 合同对象-租赁合同
        ContractObjectVo contractObject_ZL = new ContractObjectVo();
        contractObject_ZL.setContractObject_Code(con_code);
        contractObject_ZL = contractService.queryContractObject(contractObject_ZL);

        String contractObject_Other = contractObject_ZL.getContractObject_Other();
        contractObject_ZL.setContractObject_Other(StringUtils.isEmpty(contractObject_Other) ? "无" : contractObject_Other);
        view.addObject("contractObject", contractObject_ZL);

        view.addObject("startDateArray", DataUtil.DateToStrs(contractObject_ZL.getContractObject_Date()).split("-"));
        view.addObject("endDateArray", DataUtil.DateToStrs(contractObject_ZL.getContractObject_DeadlineTime()).split("-"));
        view.addObject("fillTimeArray", DataUtil.DateToStrs(contractObject_ZL.getContractObject_FillTime()).split("-"));

        String hi_code = contractObject_ZL.getHi_code();
        // 合同对象-托管合同
        ContractObjectVo contractObject_TG = new ContractObjectVo();
        contractObject_TG.setHi_code(hi_code);
        contractObject_TG.setContractObject_Type("托管合同");
        contractObject_TG = contractService.queryContractObject(contractObject_TG);
        view.addObject("contractObject_TG", contractObject_TG);

        // 查询合同-房东信息
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setHi_code(contractObject_ZL.getHi_code());
        contractVo.setContractObject_Type("托管合同");
        contractVo = contractService.selectContractObjectByCNo(contractVo);
        view.addObject("contractVo", contractVo);

        // 合同主体
        UserCenterContractBody centerContractBody = contractService.queryContractBody(contractObject_ZL.getContractObject_Code());
        view.addObject("contractBody", centerContractBody);

        view.addObject("rentPlusArr", AppUtil.reSetParam(centerContractBody.getContractBody_RentPlus()));
        view.addObject("freeTime", AppUtil.reSetParam(centerContractBody.getContractBody_FreeTime()));
        view.addObject("payStyle", centerContractBody.getContractBody_PayStyle().substring(0, 1));
        view.addObject("startPayTime", DataUtil.DateToStrs(centerContractBody.getContractBody_StartPayTime()));

        // 房屋信息
        ViewHouseLibraryInfoVo libraryHouseInfo = houseLibraryService.queryHouseLibraryInfo(contractObject_ZL.getHi_code());
        view.addObject("houseInfo", libraryHouseInfo);

        // 合同账单
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setBco_orderType(AppConfig.order_type_1);
        contractOrderVo.setContractObject_code(con_code);
//		contractOrderVo.setBco_optionState(AppConfig.order_option_state_2);
        contractOrderVo = financeManageService.queryFinanceOrder(contractOrderVo);
        List<ContractBillVo> billContractList = null;
        if (contractOrderVo != null) {
            billContractList = billContractOrderService.queryContractBillList(contractOrderVo.getBco_code(), null);
        }
        if (billContractList != null) {
            for (ContractBillVo billVo: billContractList) {
                billVo.setRepaymentDateArr(DataUtil.DateToStrs(billVo.getBcb_repaymentDate()).split("-"));
            }
        }
        view.addObject("billContractList", billContractList);

        // 客户信息
        UserCustomer customer = new UserCustomer();
        customer.setContractObject_code(contractObject_ZL.getContractObject_Code());
        List<UserCustomer> customers = customerService.queryCustomerRelaContractList(customer);
        for (UserCustomer userCustomer: customers) {
            // 银行卡
            UserCustomerBank customerBank = new UserCustomerBank();
            customerBank.setCc_id(userCustomer.getCc_id());
            userCustomer.setCustomerBank(customerService.queryCustomerBank(customerBank));
        }
        view.addObject("customers", customers);
        UserCustomer customerInfo = null;
        for (UserCustomer userCustomer: customers) {
            if (userCustomer.getCrc_role() == 0) {
                customerInfo = userCustomer;
                break;
            }
        }
        view.addObject("customerInfo", customerInfo);

        // 签约代表
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_id(contractObject_ZL.getContractObject_Contractor());
        userCenterEmployee = employeeService.queryEmployeeInfo(userCenterEmployee);
        view.addObject("contractor", userCenterEmployee);

    }

    /**
     * 【合同信息】租赁合同信息打印
     *
     * @param contractObject_code 合同编码
     * @return
     * @作者 shenhx
     * @日期 2017年3月29日
     */
    @RequestMapping("/queryContractToPrint")
    public @ResponseBody
    String queryContractToPrint(String contractObject_code) {
        Msg<Object> msg = new Msg<>();
        Map<String, Object> resultMap = new HashMap<>();
        if (StringUtils.isEmpty(contractObject_code)) {
            return msg.toString(110, Msg.MSG_PARAM_ERROR);
        }
        // 合同对象-租赁合同
        ContractObjectVo contractObject_ZL = new ContractObjectVo();
        contractObject_ZL.setContractObject_Code(contractObject_code);
        contractObject_ZL = contractService.queryContractObject(contractObject_ZL);

        String contractObject_Other = contractObject_ZL.getContractObject_Other();
        contractObject_ZL.setContractObject_Other(StringUtils.isEmpty(contractObject_Other) ? "无" : contractObject_Other);
        resultMap.put("contractObject", contractObject_ZL);

        String hi_code = contractObject_ZL.getHi_code();
        // 合同对象-托管合同
        ContractObjectVo contractObject_TG = new ContractObjectVo();
        contractObject_TG.setHi_code(hi_code);
        contractObject_TG.setContractObject_Type("托管合同");
        contractObject_TG = contractService.queryContractObject(contractObject_TG);
        resultMap.put("contractObject_TG", contractObject_TG);

        // 查询合同-房东信息
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setHi_code(contractObject_ZL.getHi_code());
        contractVo.setContractObject_Type("托管合同");
        contractVo = contractService.selectContractObjectByCNo(contractVo);
        resultMap.put("contractVo", contractVo);

        // 合同主体
        resultMap.put("contractBody", contractService.queryContractBody(contractObject_ZL.getContractObject_Code()));

        // 房屋信息
        ViewHouseLibraryInfoVo libraryHouseInfo = houseLibraryService.queryHouseLibraryInfo(contractObject_ZL.getHi_code());
        resultMap.put("houseInfo", libraryHouseInfo);

        // 合同账单
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setBco_orderType(AppConfig.order_type_1);
        contractOrderVo.setContractObject_code(contractObject_code);
//		contractOrderVo.setBco_optionState(AppConfig.order_option_state_2);
        contractOrderVo = financeManageService.queryFinanceOrder(contractOrderVo);
        List<ContractBillVo> billContractList = null;
        if (contractOrderVo != null) {
            billContractList = billContractOrderService.queryContractBillList(contractOrderVo.getBco_code(), null);
        }
        resultMap.put("billContractList", billContractList);

        // 客户信息
        UserCustomer customer = new UserCustomer();
        customer.setContractObject_code(contractObject_ZL.getContractObject_Code());
        List<UserCustomer> customers = customerService.queryCustomerRelaContractList(customer);
        for (UserCustomer userCustomer: customers) {
            // 银行卡
            UserCustomerBank customerBank = new UserCustomerBank();
            customerBank.setCc_id(userCustomer.getCc_id());
            userCustomer.setCustomerBank(customerService.queryCustomerBank(customerBank));
        }
        resultMap.put("customers", customers);

        // 签约代表
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_id(contractObject_ZL.getContractObject_Contractor());
        userCenterEmployee = employeeService.queryEmployeeInfo(userCenterEmployee);
        resultMap.put("contractor", userCenterEmployee);

        msg.setData(resultMap);
        return msg.toString();
    }

    /**
     * 添加带看信息
     *
     * @param cc_name
     * @param ccp_phone
     * @param hs_content
     * @param hs_state
     * @return
     * @author 陈智颖
     */
    @RequestMapping(value = "/addHouseSeeing", method = RequestMethod.POST)
    @ResponseBody
    @VerifyCSRFToken
    public Map<String, Object> addHouseSeeing(String cc_name, String ccp_phone, String hs_content, Integer hs_state, Integer em_id, String hi_code, String hs_payType, Integer hs_day, String hs_contractDay) throws AlipayApiException {
        Map<String, Object> map = new HashMap<>();

        String cc_code;
        if (hs_state == 1) {
            // 带看成功，存入正式表；失败则保存到意向客户表中
            // 1.生成客户信息
            cc_code = this.customerService.addIntentionCustomer(cc_name, ccp_phone, null);
        } else {

            // 客户带看时，客户信息存入意向客户表，待合同签订时，转入正式客户表
            cc_code = this.customerService.addCustomerIntention(cc_name, ccp_phone, null, em_id, hs_content);
        }
        // 2.添加带看信息
        HouseSeeing houseSeeing = new HouseSeeing();
        houseSeeing.setCc_code(cc_code);
        houseSeeing.setEm_id(em_id);
        houseSeeing.setHi_code(hi_code);
        houseSeeing.setHs_payType(hs_payType);
        houseSeeing.setHs_day(hs_day);
        houseSeeing.setHs_contractDay(hs_contractDay);
        houseSeeing.setHs_state(hs_state);
        List<HouseSeeing> queryHouseSeeingList = houseSeeingService.queryHouseSeeingList(houseSeeing);
        if (queryHouseSeeingList.isEmpty()) {
            houseSeeing.setHs_content(hs_content);
            houseSeeing.setHs_createTime(new Date());
            this.houseSeeingService.addHouseSeeing(houseSeeing);
            if (hs_content.contains("签订合同")) {
                HouseInfoKeep houseInfoKeep = new HouseInfoKeep();
                houseInfoKeep.setHi_code(hi_code);
                houseInfoKeep.setHi_isForRent(AppConfig.hi_isForRent_2);
                // houseInfoKeep.setHi_forRentState(AppConfig.hi_forRentState_2000);
                houseLibraryService.updateHouseInfos(houseInfoKeep);

                BillRelatedOrderVo billRelatedOrderVo = new BillRelatedOrderVo();
                billRelatedOrderVo.setHi_code(hi_code);
                billRelatedOrderVo.setRo_payState(3);
                financeManageService.updateRelatedOrderState(billRelatedOrderVo);
            }
            map.put("msg", "success");
        } else {
            map.put("msg", "error");
        }
        // 保存客户日志
        UserCustomerLog customerLog = new UserCustomerLog();
        customerLog.setCc_code(cc_code);
        customerLog.setCl_type(79);// 带看
        customerLog.setCl_content("【客户带看，签订合同】");
        customerLog.setCl_author(em_id);
        customerLog.setCl_source(2);// 系统添加
        customerLog.setCl_createTime(new Date());
        customerService.addUserCustomerLog(customerLog);

        // 【下架支付宝平台上该房屋】
        RentHouseVo rentHouseVo = rentHouseService.queryRentHouseVo(hi_code);
        // 【查询房源状态】
        ViewHouseLibraryInfoVo houseLibraryInfoVo = new ViewHouseLibraryInfoVo();
        houseLibraryInfoVo.setHi_code(hi_code);
        houseLibraryInfoVo = houseLibraryService.queryHouseLibraryInfo(houseLibraryInfoVo);
        if (null != rentHouseVo) {
            rentHouseService.rentHouseStateSync(hi_code, rentHouseVo.getRoom_code(), 0, 2, "分散式".equals(houseLibraryInfoVo.getHis_name()) ? 1 : 2);
            rentHouseVo.setRoom_status(0);
            rentHouseService.updataRentHouseVo(rentHouseVo);
        }

        return map;
    }

    /**
     * 客户代办页面
     *
     * @return
     * @author 王孝元
     */
    @RequestMapping("/stayThingCustomer")
    public String stayThingCustomer() {
        return "/appPage/stay/stayThingCustomer";
    }

    /**
     * 查询客户代办信息
     *
     * @param em_id
     * @param pageNo
     * @param pageSize
     * @param where
     * @return
     * @author 王孝元
     */
    @RequestMapping("/queryCustomerStayList")
    public @ResponseBody
    Map<String, Object> queryCustomerStayList(Integer em_id, Integer pageNo, Integer pageSize, String where, String searchType, String searchTime) {
        Map<String, Object> map = new HashMap<>();
        if (!AppUtil.isNotNull(em_id)) {
            map.put("msg", "参数错误");
            return map;
        }
        // 封装查询条件
        Pagination<CustomerStayThingVo> page = new Pagination<>();
        page.setPageNo(pageNo);
        page.setPageSize(pageSize);
        CustomerStayThingVo cst = new CustomerStayThingVo();
        cst.setEm_id(em_id);
        page.setT(cst);

        if (AppUtil.null2Str(searchType).equals("1")) {
            // 1.查询代签合同的房东
            String sqlWhere = "";
            if (AppUtil.isNotNull(where)) {
                sqlWhere += "AND (house_address like CONCAT('%'," + where + ",'%')OR cc_name like CONCAT('%'," + where + ",'%')OR ccp_phone like CONCAT('%'," + where + ",'%'))";
            }
            if (AppUtil.null2Str(searchTime).equals("1")) {
                sqlWhere += "AND DATE_FORMAT(hi_date,'%Y-%m-%d') = DATE_FORMAT(NOW(),'%Y-%m-%d') ";
            }
            if (AppUtil.null2Str(searchTime).equals("2")) {
                String yesterday = AppUtil.getDateBefore(1);
                sqlWhere += "AND DATE_FORMAT(hi_date,'%Y-%m-%d') = DATE_FORMAT('" + yesterday + "','%Y-%m-%d') ";
            }
            if (AppUtil.null2Str(searchTime).equals("3")) {
                String twodays = AppUtil.getDateBefore(2);
                sqlWhere += "AND DATE_FORMAT(hi_date,'%Y-%m-%d') <= DATE_FORMAT('" + twodays + "','%Y-%m-%d') ";
            }
            page.setWhere(sqlWhere);

            List<CustomerStayThingVo> tandlordList = customerService.queryContractLandlordCustomer(page);
            map.put("list", tandlordList);
        }
        if (AppUtil.null2Str(searchType).equals("2")) {
            // 2.查询待签合同的租客
            String sqlWhere = "";
            if (AppUtil.isNotNull(where)) {
                sqlWhere += "AND (house_address like CONCAT('%'," + where + ",'%')OR cc_name like CONCAT('%'," + where + ",'%')OR ccp_phone like CONCAT('%'," + where + ",'%'))";
            }
            if (AppUtil.null2Str(searchTime).equals("1")) {
                sqlWhere += "AND DATE_FORMAT(hs_createTime,'%Y-%m-%d') = DATE_FORMAT(NOW(),'%Y-%m-%d') ";
            }
            if (AppUtil.null2Str(searchTime).equals("2")) {
                String yesterday = AppUtil.getDateBefore(1);
                sqlWhere += "AND DATE_FORMAT(hs_createTime,'%Y-%m-%d') = DATE_FORMAT('" + yesterday + "','%Y-%m-%d') ";
            }
            if (AppUtil.null2Str(searchTime).equals("3")) {
                String twodays = AppUtil.getDateBefore(2);
                sqlWhere += "AND DATE_FORMAT(hs_createTime,'%Y-%m-%d') <= DATE_FORMAT('" + twodays + "','%Y-%m-%d') ";
            }
            page.setWhere(sqlWhere);

            List<CustomerStayThingVo> tenantList = customerService.queryContractTenantCustomer(page);
            map.put("list", tenantList);
        }
        map.put("searchType", searchType);
        map.put("msg", "success");
        return map;
    }

    /**
     * 合同查看
     *
     * @return
     * @author 陈智颖
     * @date Apr 25, 2017 10:54:53 AM
     */
    @RequestMapping("/billPay")
    public String billPay() {
        return "/appPage/finance/contractBillPay";
    }

    /**
     * [APP][租金]二维码收款
     *
     * @param bco_code 订单CODE
     * @param billList 账单列表
     * @param payMoney 支付金额
     * @param payWay   支付方式
     * @return
     */
    @RequestMapping("/financeBillPay")
    public @ResponseBody
    String financeBillPay(String bco_code, String billList, String payMoney, String payWay, String em_id) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(bco_code) || StringUtils.isEmpty(billList)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        try {
            List<ContractBillVo> financeBillList = JSONArray.parseArray(billList, ContractBillVo.class);
            if (financeBillList == null || financeBillList.isEmpty()) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }
            JSONObject json = new JSONObject();
            json.put("bco_code", bco_code);
            json.put("source", AppConfig.bs_source_erp_app);
            json.put("payWay", payWay);
            json.put("payMoney", payMoney);
            json.put("billList", billList);
            json.put("em_id", em_id);
            json.put("user_ip", AppUtil.getIP());
            msg = financeManageService.updateRentBillBo(json);
        } catch (AppException e) {
            e.printStackTrace();
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(Msg.MSG_SYSTEM_ERROR);
        }
        return msg.toString();
    }

    /* ========【支付】=START======= */

    /**
     * 请求支付
     *
     * @param order_sn
     * @param pay_channel
     * @return
     */
    @RequestMapping(value = "/order/submitPay", produces = "text/json;charset=UTF-8")
    public @ResponseBody
    String submitPay(String order_sn, String pay_channel) {
        Msg<Object> msg = new Msg<>();
        try {
            // 验证参数
            if (StringUtils.isEmpty(order_sn) || StringUtils.isEmpty(pay_channel)) {
                throw new AppException(Msg.MSG_PARAM_ERROR);
            }

            // 【提交支付】
            OrderBillVo orderBillVo = orderService._requestPay(AppConfig.channel_erp_app, order_sn, pay_channel, AppUtil.getIP());
            msg.put("orderBill", orderBillVo);
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    /**
     * 二维码支付页面
     *
     * @return
     */
    @RequestMapping(value = "/order/rqcodePay")
    public String rqcodeImage() {
        return "/appPage/payMoney";
    }

    /**
     * 请求二维码支付
     *
     * @param bill_sn
     * @return
     */
    @RequestMapping(value = "/order/requestRqcodePay", produces = "text/json;charset=UTF-8")
    public @ResponseBody
    String requestRqcodePay(String bill_sn) {
        Msg<Object> msg = new Msg<>();
        try {
            if (StringUtils.isEmpty(bill_sn)) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }

            // 流水信息
            OrderBillVo orderBillVo = orderService.queryOrderBill(bill_sn);
            if (orderBillVo == null) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }

            switch (orderBillVo.getBill_status()) {
                case AppConfig.bill_status_1:
                    Msg<Object> tradeQuery = null;
                    try {
                        switch (orderBillVo.getBill_pay_channel()) {
                            case AppConfig.bill_pay_channel_zfb:
                                tradeQuery = AliPay.alipayTradeQuery(orderBillVo.getBill_trade_code());
                                break;
                            case AppConfig.bill_pay_channel_wx:
                                tradeQuery = WeixinPay.weixinTradeQuery(orderBillVo.getBill_trade_code());
                                break;
                        }
                    } catch (Exception e) {
                        System.out.println("查询失败");
                    }
                    if (tradeQuery != null && tradeQuery.getCode() == 300) {
                        // 更新商户订单号
                        OrderBillVo orderBillVo1 = new OrderBillVo();
                        orderBillVo1.setBill_id(orderBillVo.getBill_id());
                        orderBillVo1.setBill_trade_code(AppUtil.getTradeCode(orderBillVo.getBill_sn()));
                        orderService.updateOrderBill(orderBillVo1);

                        // 重新流水数据
                        orderBillVo = orderService.queryOrderBill(orderBillVo.getBill_sn());
                    }

                    String trade_code = orderBillVo.getBill_trade_code();
                    String title = orderBillVo.getBill_title();
                    String pay_price = orderBillVo.getBill_pay_amount().toString();
                    String user_ip = AppUtil.getIP();
                    String pay_channel = orderBillVo.getBill_pay_channel();
                    if (orderBillVo.getBill_pay_amount() == 0) {
                        pay_channel = "现金";
                    }
                    switch (pay_channel) {
                        case AppConfig.bill_pay_channel_zfb:
                            msg = orderService._requestPayForAli(trade_code, title, pay_price, user_ip, AliPay.notify_url);
                            // 返回得支付渠道
                            msg.put("result_pay_channel", "支付宝");
                            /*// 2分钟后清理流水数据
                            new Timer().schedule(new TimerTask() {
                                @Override
                                public void run() {
                                    orderService._responsePayResult(trade_code);
                                }
                            }, 20 * 1000);*/
                            break;
                        case AppConfig.bill_pay_channel_wx:
                            msg = orderService._requestPayForWeixin(trade_code, title, pay_price, user_ip, WeixinPay.notify_url);
                            // 返回得支付渠道
                            msg.put("result_pay_channel", "微信");
                            /*// 2分钟后清理流水数据
                            new Timer().schedule(new TimerTask() {
                                @Override
                                public void run() {
                                    orderService._responsePayResult(trade_code);
                                }
                            }, 120 * 1000);*/
                            break;
                        default:
                            msg = orderService._requestPayForBalance(trade_code, title, pay_price);
                            // 返回得支付渠道
                            msg.put("result_pay_channel", "现金");
                            break;
                    }
                    break;
            }
            msg.put("orderBill", orderBillVo);
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
     * 查询支付结果
     *
     * @param bill_sn
     * @return
     */
    @RequestMapping(value = "/order/queryPayResult")
    public @ResponseBody
    String queryPayResult(String bill_sn) {
        Msg<Object> msg = new Msg<>();
        try {
            // 验证参数
            if (StringUtils.isEmpty(bill_sn)) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }

            // 获取流水信息
            OrderBillVo orderBillVo = orderService.queryOrderBill(bill_sn);
            if (orderBillVo == null) {
                return msg.toError("没有发现该交易");
            }
            switch (orderBillVo.getBill_status()) {
                case AppConfig.bill_status_1:
                    try {
                        switch (orderBillVo.getBill_pay_channel()) {
                            case AppConfig.bill_pay_channel_zfb:
                                msg = AliPay.alipayTradeQuery(orderBillVo.getBill_trade_code());
                                break;
                            case AppConfig.bill_pay_channel_wx:
                                msg = WeixinPay.weixinTradeQuery(orderBillVo.getBill_trade_code());
                                break;
                        }
                        if (msg.getCode() == 200) {
                            msg = orderService._responsePayResult(orderBillVo.getBill_trade_code());
                        }
                    } catch (Exception e) {
                        return msg.toError("待付款");
                    }
                    break;
                case AppConfig.bill_status_2:
                    break;
                case AppConfig.bill_status_3:
                    return msg.toError(300, "该订单已关闭");
                default:
                    return msg.toError("该订单状态异常");
            }
            msg.put("orderBill", orderBillVo);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    /**
     * 响应支付结果
     *
     * @param trade_code
     * @return
     */
    @RequestMapping(value = "/order/responsePayResult", produces = "application/json; charset=utf-8")
    public @ResponseBody
    String responsePayResult(String trade_code) {
        Msg<Object> msg = new Msg<>();
        try {
            // 验证参数
            if (StringUtils.isEmpty(trade_code)) {
                throw new AppException(Msg.MSG_PARAM_ERROR);
            }
            // 响应支付结果
            msg = orderService._responsePayResult(trade_code);
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    @RequestMapping(value = "/order/syncPayOrderOne")
    public @ResponseBody
    String syncPayOrderOne() {
        Msg<Object> msg = new Msg<>();
        try {
            new Thread(() -> {

            }).start();
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    /* ========【支付】=END======= */

    @RequestMapping(value = "/test", produces = "text/json;charset=UTF-8")
    public @ResponseBody
    String test(String bco_code) {
        Msg<Object> msg = new Msg<>();
        OrderVo orderVo;
        try {
            orderVo = orderService._submitPayRent(AppConfig.channel_erp_pc, bco_code, null);
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString(orderVo);
    }

    @RequestMapping(value = "/testOrderAmount", produces = "text/json;charset=UTF-8")
    public @ResponseBody
    String testOrderAmount(String order_sn) {
        Msg<Object> msg = new Msg<>();
        try {
            orderService._updatePayOrderForAmount(order_sn);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    /**
     * 首页栏目列表
     *
     * @param
     * @return
     * @author 陈智颖
     * @create 23/11/17 11:13
     **/
    @RequestMapping(value = "/indexPageMenu")
    public @ResponseBody
    Map<String, Object> indexPageMenu(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();

        List<IndexMenu> indexMenus = new ArrayList<>();
        IndexMenu indexMenu = new IndexMenu();
        indexMenu.setIc_icon("/resources/appImage/customermanagement_Image.png");
        indexMenu.setTitle("客户管理");
        indexMenus.add(indexMenu);
        IndexMenu indexMenu1 = new IndexMenu();
        indexMenu1.setIc_icon("/resources/appImage/housingmanagement_Image.png");
        indexMenu1.setTitle("房源管理");
        indexMenus.add(indexMenu1);
        IndexMenu indexMenu2 = new IndexMenu();
        indexMenu2.setIc_icon("/resources/appImage/contractmanagement_Image.png");
        indexMenu2.setTitle("合同管理");
        indexMenus.add(indexMenu2);
        IndexMenu indexMenu3 = new IndexMenu();
        indexMenu3.setIc_icon("/resources/appImage/servicemanagement_Image.png");
        indexMenu3.setTitle("服务管理");
        indexMenus.add(indexMenu3);
        IndexMenu indexMenu4 = new IndexMenu();
        indexMenu4.setIc_icon("/resources/appImage/financialmanagement_Image.png");
        indexMenu4.setTitle("财务管理");
        indexMenus.add(indexMenu4);
        IndexMenu indexMenu5 = new IndexMenu();
        indexMenu5.setIc_icon("/resources/appImage/maillist_Image.png");
        indexMenu5.setTitle("通讯录");
        indexMenus.add(indexMenu5);
        IndexMenu indexMenu6 = new IndexMenu();
        indexMenu6.setIc_icon("/resources/appImage/servicemanagement_Image.png");
        indexMenu6.setTitle("旧版服务");
        indexMenus.add(indexMenu6);
        String CSRFToken = appToken(request);

        map.put("code", 200);
        map.put("data", indexMenus);
        map.put("token", CSRFToken);
        return map;
    }

    /**
     * 查询内部人员
     *
     * @param em_id
     * @return
     */
    @RequestMapping(value = "/selectUserInfo", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, Object> selectUserInfo(Integer em_id) {
        Map<String, Object> map = new HashMap<>();
        em_id = StringUtils.isEmpty(em_id) ? AppUtil.getCookieEmployee().getEm_id() : em_id;
        UserCenterEmployee userCenterEmployees = employeeService.selectUserCenterEmployeeById(em_id);
        map.put("data", userCenterEmployees);
        return map;
    }

    /**
     * 查询服务订单数据分页
     *
     * @param pageNo
     * @return
     * @author 陈智颖
     * @date Mar 2, 2017 11:40:21 AM
     */
    @RequestMapping("/serviceList")
    public @ResponseBody
    Map<String, Object> serviceList(Integer pageNo, String type, Integer em_id, String house_address, String mdg_state, String apply_time) {
        Map<String, Object> map = new HashMap<>();

        MaintenanceDeclaration declaration = new MaintenanceDeclaration();
        declaration.setPageNo(pageNo);
        declaration.setHouse_address(house_address);
        declaration.setApply_time(DataUtil.StrToDate(apply_time));
        if (type == null || type.equals("all")) {
        } else {
            declaration.setEm_id(em_id);
        }
        declaration.setType(type);
        declaration.setMdg_state(mdg_state);
        List<MaintenanceDeclaration> services = handleService.selectServicesApp(declaration);
        map.put("services", services);

        return map;
    }

    //_________________________________________服务的暂时保留_______________________________________________________

    /**
     * 服务申请类型选择
     *
     * @return
     * @author wxr
     */
    @RequestMapping("/serviceTypeSelect")
    public String serviceTypeSelect() {
        return "/appPage/service/serviceTypeSelect";
    }

    /**
     * 服务申请
     *
     * @return
     * @author wxr
     */
    @RequestMapping("/serviceApply")
    public String serviceApply() {
        return "/appPage/service/serviceApply";
    }


    /**
     * 【服务管理】服务订单
     *
     * @return
     * @author 陈智颖
     * @date Mar 31, 2017 7:31:27 PM
     */
    @RequestMapping("/serviceContent")
    public String serviceContent() {
        return "/appPage/serviceContent";
    }


    /**
     * 获取服务基础信息
     * serviceMessageType
     *
     * @return
     */
    @RequestMapping("/serviceMessageType")
    @ResponseBody
    public Map<String, Object> serviceMessageType(String sm_id) {
        Map<String, Object> map = new HashMap<>();
        ServiceType serviceType = new ServiceType();
        serviceType.setSm_id(Integer.valueOf(sm_id));
        serviceType.setParent_id(0);
        List<ServiceType> serviceTypes = serviceService.queryMessageID(serviceType);

        if (!serviceTypes.isEmpty()) {
            map.put("message", 200);
            map.put("data", serviceTypes);
        } else {
            map.put("message", 401);
        }
        return map;
    }

    /**
     * serviceTypeSelect
     *
     * @return
     */
    @RequestMapping("/serviceTypeList")
    @ResponseBody
    public String serviceTypeList() {
        Msg<Object> msg = new Msg<>();
        List<ServiceMessage> serviceMessages = serviceService.queryAllServiceMessage();
        for (ServiceMessage ServiceMessage: serviceMessages) {
            String sm_image = ServiceMessage.getSm_image();
            if (sm_image != null) {
                OSSparameter.imagePath(sm_image);
            }

        }
        if (serviceMessages.isEmpty()) {
            msg.setCode(401);
            msg.setMsg("数据不存在");
        } else {
            msg.setCode(200);
            msg.setData(serviceMessages);
        }
        return msg.toString();
    }

    /**
     * 查询子服务分页列表
     *
     * @param st_id
     * @return
     */
    @RequestMapping("/serviceTypeChildrenList")
    @ResponseBody
    public Map<String, Object> serviceTypeChildrenList(Integer st_id) {
        Map<String, Object> map = new HashMap<>();
        ServiceType serviceType = new ServiceType();
        serviceType.setParent_id(st_id);
        List<ServiceType> serviceTypes = serviceService.selectTypeID(serviceType);
        ServiceType serviceType1 = new ServiceType();
        serviceType1.setSt_id(st_id);
        serviceType1 = serviceService.selectTypeID(serviceType1).get(0);
        if (!serviceTypes.isEmpty()) {
            for (ServiceType serviceType2: serviceTypes) {
                serviceType2.setRedrict_path(OSSparameter.imagePath(serviceType2.getRedrict_path(), null, null));
                switch (serviceType2.getSt_name()) {
                    case "油烟机":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/appliance_lampblack_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/appliance_lampblack_checked_Image.png", null, null));
                        break;
                    case "空调":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/appliance_aircondition_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/appliance_aircondition_checked_Image.png", null, null));
                        break;
                    case "冰箱":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/appliance_refrigerator_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/appliance_refrigerator_checked_Image.png", null, null));
                        break;
                    case "洗衣机":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/appliance_washing_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/appliance_washing_checked_Image.png", null, null));
                        break;
                    case "热水器":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/appliance_heater_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/appliance_heater_checked_Image.png", null, null));
                        break;
                    case "电视":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/appliance_tv_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/appliance_tv_checked_Image.png", null, null));
                        break;
                    case "燃气灶":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/appliance_stove_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/appliance_stove_checked_Image.png", null, null));
                        break;
                    case "微波炉":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/appliance_microwave_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/appliance_microwave_checked_Image.png", null, null));
                        break;
                    case "电磁炉":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/appliance_furnace_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/appliance_furnace_checked_Image.png", null, null));
                        break;
                    case "电饭煲":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/appliance_ricecooker_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/appliance_ricecooker_checked_Image.png", null, null));
                        break;
                    case "饮水机":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/appliance_dispenser_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/appliance_dispenser_checked_Image.png", null, null));
                        break;
                    case "合页":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/furniture_heye_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/furniture_heye_checked_Image.png", null, null));
                        break;
                    case "衣柜/床":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/furniture_wadrobe_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/furniture_wadrobe_checked_Image.png", null, null));
                        break;
                    case "桌椅":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/furniture_chair_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/furniture_chair_checked_Image.png", null, null));
                        break;
                    case "抽屉":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/furniture_lockers_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/furniture_lockers_checked_Image.png", null, null));
                        break;
                    case "沙发":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/furniture_sofa_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/furniture_sofa_checked_Image.png", null, null));
                        break;
                    case "门窗":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/furniture_door_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/furniture_door_checked_Image.png", null, null));
                        break;
                    case "滑轨气压棒":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/furniture_qiyabang_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/furniture_qiyabang_checked_Image.png", null, null));
                        break;
                    case "晾衣架":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/furniture_hanger_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/furniture_hanger_checked_Image.png", null, null));
                        break;
                    case "置物架":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/furniture_goods_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/furniture_goods_checked_Image.png", null, null));
                        break;
                    case "窗帘饰品":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/furniture_curtain_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/furniture_curtain_checked_Image.png", null, null));
                        break;
                    case "家具五金":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/furniture_wujin_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/furniture_wujin_checked_Image.png", null, null));
                        break;
                    case "灯具":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/lampcircuit_lamp_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/lampcircuit_lamp_checked_Image.png", null, null));
                        break;
                    case "电路":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/lampcircuit_line_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/lampcircuit_line_checked_Image.png", null, null));
                        break;
                    case "插座开关":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/lampcircuit_socket_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/lampcircuit_socket_checked_Image.png", null, null));
                        break;
                    case "管件":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/waterwayfittings_pipe_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/waterwayfittings_pipe_checked_Image.png", null, null));
                        break;
                    case "水龙头":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/waterwayfittings_tap_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/waterwayfittings_tap_checked_Image.png", null, null));
                        break;
                    case "淋浴":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/waterwayfittings_shower_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/waterwayfittings_shower_checked_Image.png", null, null));
                        break;
                    case "阀门":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/waterwayfittings_pipe_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/waterwayfittings_pipe_checked_Image.png", null, null));
                        break;
                    case "马桶":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/waterwayfittings_closestool_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/waterwayfittings_closestool_checked_Image.png", null, null));
                        break;
                    case "洗衣/手/菜池":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/waterwayfittings_closestool_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/waterwayfittings_closestool_checked_Image.png", null, null));
                        break;
                    case "地漏":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/waterwayfittings_drain_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/waterwayfittings_drain_checked_Image.png", null, null));
                        break;
                    case "管道疏通":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/waterwayfittings_deredge_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/waterwayfittings_deredge_checked_Image.png", null, null));
                        break;
                    case "墙面":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/metope_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/metope_checked_Image.png", null, null));
                        break;
                    case "地面":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/wood-floor_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/wood-floor_checked_Image.png", null, null));
                        break;
                    case "顶面":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/ceramic-tile_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/ceramic-tile_checked_Image.png", null, null));
                        break;
                    case "防盗门":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/anti-theft-door_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/anti-theft-door_checked_Image.png", null, null));
                        break;
                    case "卧室门":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/furniture_bed_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/furniture_bed_checked_Image.png", null, null));
                        break;
                    case "卫生间门":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/toilet-door_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/toilet-door_checked_Image.png", null, null));
                        break;
                    case "阳台门":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/balcony-door_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/balcony-door_checked_Image.png", null, null));
                        break;
                    case "新装宽带":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/broadband_new_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/broadband_new_checked_Image.png", null, null));
                        break;
                    case "宽带移机":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/broadband_move_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/broadband_move_checked_Image.png", null, null));
                        break;
                    case "故障报修":
                        serviceType2.setDefault_icon(OSSparameter.imagePath("service_icon/broadband_event_unchecked_Image.png", null, null));
                        serviceType2.setClick_icon(OSSparameter.imagePath("service_icon/broadband_event_checked_Image.png", null, null));
                        break;
                }
            }
            map.put("code", 200);
            map.put("data", serviceTypes);
            map.put("content", serviceType1.getSt_explain());
        } else {
            map.put("code", 401);
        }

        return map;
    }

    /**
     * 新版添加申请服务信息
     *
     * @return
     * @author wxr
     */
    @RequestMapping("/saveServiceOrderInfo")
    @ResponseBody
    @SameUrlData
    public String saveServiceOrderInfo(ServiceOrderVo serviceOrderVo, String soTargetTime) throws Exception {
        Msg<Object> msg = new Msg<>();
        serviceOrderVo.setSo_printCode(new Date().getTime() + serviceOrderVo.getSo_applicantEmp() + "");
        serviceOrderVo.setSo_applicantEmp(serviceOrderVo.getSo_applicantEmp());
        serviceOrderVo.setSo_targetTime(DataUtil.StrToDate(soTargetTime));

        if (!StringUtils.isEmpty(serviceOrderVo.getSt_id_c())) {
            String[] st_id_c_arr = serviceOrderVo.getSt_id_c().split(",");
            if (st_id_c_arr.length > 0) {
                List<Integer> itemArray = new ArrayList<>();
                for (String item: st_id_c_arr) {
                    itemArray.add(Integer.valueOf(item));
                }
                serviceOrderVo.setItemArray(itemArray);
            }
        }
        serviceOrderVo.setOpeater(serviceOrderVo.getSo_applicantEmp());

        // 【查询同一个房屋，相同服务是否重复下单】
        int rstCount = serviceService.queryServiceItemCountByCode(serviceOrderVo);
        if (rstCount > 0) {
            msg.setCode(402);
            msg.setMsg("该房屋已申请相同服务项目，请勿重复下单");
            return msg.toString();
        }

        return msg.toString(serviceService.saveServiceOrderInfo(serviceOrderVo));
    }

    /**
     * 新版服务订单详情
     *
     * @param so_id
     * @return
     */
    @RequestMapping("/serviceOrderInfo")
    @ResponseBody
    public Map serviceOrderInfo(Integer so_id, Integer em_id) {
        HashMap<Object, Object> map = new HashMap<>();
        //服务订单
        ServiceOrderVo serviceOrderVo = serviceService.selectServiceOrderInfoById(so_id);
        if (serviceOrderVo != null) {

            map.put("serviceOrderVo", serviceOrderVo);
            ServiceOrderItemVo serviceOrderItemVo = new ServiceOrderItemVo();
            serviceOrderItemVo.setSo_id(serviceOrderVo.getSo_id());

            //服务订单项目
            List<ServiceOrderItemVo> serviceOrderItemVos = serviceService.selectServiceOrderItem(serviceOrderItemVo);
            map.put("serviceOrderItemVos", serviceOrderItemVos);

            //现场问题
            ServiceProcessProblemVo serviceProcessProblemVo = new ServiceProcessProblemVo();
            serviceProcessProblemVo.setSo_id(so_id);
            serviceProcessProblemVo.setSsp_type(1);
            List<ServiceProcessProblemVo> serviceProcessProblem = serviceService.selectServiceProcessProblem(serviceProcessProblemVo);
            map.put("serviceProcessProblem", serviceProcessProblem);

            //服务记录
            ServiceRecordVo serviceRecordVo = new ServiceRecordVo();
            serviceRecordVo.setSo_id(so_id);
            List<ServiceRecordVo> serviceRecord = serviceService.queryServiceRecordList(serviceRecordVo);
            map.put("serviceRecord", serviceRecord);

            //服务评分
            UserCenterFraction userCenterUserFraction = new UserCenterFraction();
            userCenterUserFraction.setSo_id(serviceOrderVo.getSo_id());
            userCenterUserFraction = fractionService.selectUserCenterUserFractiony(userCenterUserFraction);
            map.put("userCenterUserFraction", userCenterUserFraction);

            ServiceImageVo serviceImageVo = new ServiceImageVo();
            serviceImageVo.setSo_id(serviceOrderVo.getSo_id());
            serviceImageVo.setSi_type("charge");
            List<ServiceImageVo> serviceImageVos = serviceService.queryServiceImage(serviceImageVo);
            for (ServiceImageVo serviceImage: serviceImageVos) {
                String s = OSSparameter.imagePath(serviceImage.getSi_path(), null, null);
                serviceImage.setSi_path(s);
            }
            map.put("serviceImageVos", serviceImageVos);

            //查询是否是服务人员
            ServicePersonVo servicePersonVo = serviceService.queryServicePersonVo(em_id);
            map.put("servicePersonVo", servicePersonVo);


            map.put("code", 200);
        } else {
            map.put("code", 401);
            return map;
        }
        return map;
    }

    /**
     * 新版服务订单接单,跟进
     *
     * @param serviceProcessVo(对象)
     * @param soState(是传过来做判断处理操作的)
     * @return
     */
    @RequestMapping("/serviceTracks")
    @ResponseBody
    public String serviceTracks(ServiceProcessVo serviceProcessVo, String soState, Integer em_id, String remark) {
        Msg<Object> msg = new Msg<>();
        try {
            msg = serviceService.serviceTracks(serviceProcessVo, soState, em_id, remark);
        } catch (Exception e) {
            msg.setCode(401);
            e.printStackTrace();
        }
        return msg.toString();
    }

    /**
     * 预约上门（没用了）
     *
     * @param soState
     * @param so_id
     * @param appointment
     * @return
     */
    @RequestMapping("/appointment")
    @ResponseBody
    public String appointment(Integer soState, Integer so_id, String appointment, Integer em_id) {
        Msg<Object> msg = new Msg<>();
        try {
            serviceService.addServiceRecordBo(so_id, soState, em_id, appointment);
        } catch (Exception e) {
            msg.setCode(401);
            e.printStackTrace();
        }
        return msg.toString();
    }

    /**
     * 新版现场问题
     *
     * @return
     * @作者 wxr
     */
    @RequestMapping("/serviceScene")
    public String serviceScene() {
        return "/appPage/service/serviceScene";
    }

    /**
     * 跳转联系人
     *
     * @return
     */
    @RequestMapping("servicePhone")
    public String servicePhone() {
        return "appPage/service/servicePhone";
    }

    /**
     * 联系人
     *
     * @return
     */
    @RequestMapping("/queryServicePhone")
    public @ResponseBody
    String queryServicePhone(String hi_code, Integer so_id) {
        Msg<Object> msg = new Msg<>();
        ViewBusinessContractVo contractServiceOft = new ViewBusinessContractVo();
        contractServiceOft.setHi_code(hi_code);
        contractServiceOft.setContractObject_OptionState(AppConfig.contract_optionstate_106);
        contractServiceOft.setContractObject_Type("托管合同");
        contractServiceOft = contractService.selectContractObjectByCNo(contractServiceOft);

        ViewBusinessContractVo contractServiceOfz = new ViewBusinessContractVo();
        contractServiceOfz.setHi_code(hi_code);
        contractServiceOfz.setContractObject_OptionState(AppConfig.contract_optionstate_106);
        contractServiceOfz.setContractObject_Type("租赁合同");
        contractServiceOfz = contractService.selectContractObjectByCNo(contractServiceOfz);

        ServiceOrderVo serviceOrderVo = serviceService.selectServiceOrderInfoById(so_id);
        msg.put("serviceOrderVo", serviceOrderVo);

        msg.put("contractServiceOft", contractServiceOft);

        msg.put("contractServiceOfz", contractServiceOfz);
        return msg.toString();
    }

    /**
     * 新版现场反馈
     *
     * @return
     * @作者 wxr
     */
    @RequestMapping("/sceneFeedback")
    public String sceneFeedback() {
        return "/appPage/service/sceneFeedback";
    }

    /**
     * 新版添加反馈
     *
     * @return
     * @作者 wxr
     */
    @RequestMapping("/addFeedback")
    public String serviceFeedback() {
        return "appPage/service/serviceFeedback";
    }

    /**
     * 反馈信息列表
     * so_id
     *
     * @return
     */
    @RequestMapping("/sceneFeedbackInfo")
    @ResponseBody
    public Map<Object, Object> sceneFeedbackInfo(Integer so_id) {
        Map<Object, Object> map = new HashMap<>();
        //查询现场反馈
        ServiceProcessProblemVo serviceProcessProblemVo = new ServiceProcessProblemVo();
        serviceProcessProblemVo.setSo_id(so_id);
        serviceProcessProblemVo.setSsp_type(2);
        List<ServiceProcessProblemVo> serviceProcessProblemVos = serviceService.selectServiceProcessProblem(serviceProcessProblemVo);
        map.put("serviceProcessProblem", serviceProcessProblemVos);

        //查询服务项目
        ServiceOrderItemVo serviceOrderItemVo = new ServiceOrderItemVo();
        serviceOrderItemVo.setSo_id(so_id);
        List<ServiceOrderItemVo> serviceOrderItemVos = serviceService.selectServiceOrderItem(serviceOrderItemVo);
        map.put("code", 200);
        map.put("serviceOrderItem", serviceOrderItemVos);
        return map;
    }

    /**
     * 提交确认完成
     *
     * @param dataStr
     * @param em_id
     * @return
     */
    @RequestMapping("/submitSceneFeedback")
    @ResponseBody
    public String submitSceneFeedback(ServiceProcessVo serviceProcessVo, String dataStr, Integer em_id) {
        Msg<Object> msg = new Msg<>();
        try {
            if (dataStr != null && !dataStr.equals("")) {
                String[] split = dataStr.split(";");
                for (int i = 0; i < split.length; i++) {
                    String str = split[i].toString();
                    String soit_id = str.substring(0, str.indexOf(":"));
                    String soit_done = str.substring(str.indexOf(":") + 1, str.length());
                    ServiceOrderItemVo serviceOrderItemVo = new ServiceOrderItemVo();
                    serviceOrderItemVo.setSoit_id(Integer.valueOf(soit_id));
                    serviceOrderItemVo.setSoit_done(Integer.valueOf(soit_done));
                    serviceService.updateserviceOrderItem(serviceOrderItemVo);
                }
            }

            /*
             * 更改数据到GJP_Service_Process(服务-服务处理过程表)
             */
            serviceProcessVo.setSpro_followState(AppConfig.so_state_3220);
            serviceProcessVo.setSpro_remarks("服务跟进");
            serviceProcessVo.setSpro_startTime(new Date());
            int updataServiceProcess = serviceService.updataServiceProcess(serviceProcessVo);

            //查询是否有服务处理记录
            ServiceRecordVo serviceRecordVo = new ServiceRecordVo();
            serviceRecordVo.setSo_id(serviceProcessVo.getSo_id());
            serviceRecordVo.setSs_code(AppConfig.so_state_3220);
            List<ServiceRecordVo> serviceRecordList = serviceService.queryServiceRecordList(serviceRecordVo);

            if (serviceRecordList.size() == 0) {//没有记录才添加
                //添加服务记录
                serviceService.addServiceRecordBo(serviceProcessVo.getSo_id(), AppConfig.so_state_3220, em_id, null);
            }

            if (updataServiceProcess > 0) {
                msg.setCode(200);
            } else {
                msg.setCode(401);
            }
            msg.setMsg("提交成功");
        } catch (Exception e) {
            msg.setCode(401);
            msg.setMsg("请联系管理员");
            e.printStackTrace();
        }
        return msg.toString();
    }

    /**
     * 删除反馈
     *
     * @param spp_id
     * @return
     */
    @RequestMapping("/deleteSceneFeedback")
    @ResponseBody
    public String deleteSceneFeedback(Integer spp_id) {
        Msg<Object> msg = new Msg<>();
        ServiceProcessProblemVo serviceProcessProblemVo = new ServiceProcessProblemVo();
        serviceProcessProblemVo.setSpp_id(spp_id);
        int i = serviceService.deleteServiceProcessProblem(serviceProcessProblemVo);
        if (i > 0) {
            msg.setMsg("反馈信息删除成功");
        } else {
            msg.setCode(401);
            msg.setMsg("反馈信息删除失败");
        }
        return msg.toString();
    }

    /**
     * 添加反馈
     *
     * @param spp_content
     * @param so_id
     * @param em_id
     * @return
     */
    @RequestMapping("/addServiceFeedback")
    @ResponseBody
    public String addServiceFeedback(String spp_content, Integer so_id, Integer em_id, String spp_item) {
        Msg<Object> msg = new Msg<>();
        ServiceProcessProblemVo serviceProcessProblemVo = new ServiceProcessProblemVo();
        serviceProcessProblemVo.setSpp_content(spp_content);
        serviceProcessProblemVo.setSpp_item(spp_item);
        serviceProcessProblemVo.setSo_id(so_id);
        serviceProcessProblemVo.setEm_id(em_id);
        serviceProcessProblemVo.setSsp_type(2);
        int i = serviceService.addserviceProcessProblem(serviceProcessProblemVo);
        if (i == 0) {
            msg.setCode(401);
            msg.setMsg("提交失败");
        } else {
            msg.setMsg("提交成功");
        }
        return msg.toString();
    }

    /**
     * 【服务管理】服务费用
     *
     * @return
     */
    @RequestMapping("/serviceMoney")
    public String serviceMoney() {
        return "appPage/service/serviceMoney";
    }

    /**
     * 服务费用确认添加
     *
     * @param so_id
     * @param so_totalMoney
     * @param money
     * @param payId
     * @return
     */
    @RequestMapping("/addServiceMoneyApp")
    public @ResponseBody
    String addServiceMoneyApp(HttpServletRequest request, Integer so_id, Integer emId, Double so_totalMoney, ServiceMoney money, String payId, Integer payWay, String so_payNameNew, String so_payPhoneNew) {
        Msg<Object> msg = new Msg<>();
        try {
            if (StringUtils.isEmpty(so_id) || StringUtils.isEmpty(emId)) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }

            int channel = AppConfig.channel_erp_app;

            msg = serviceService.addServiceMoneyAppService(so_id, emId, channel, so_totalMoney, money, payId, payWay, request, so_payNameNew, so_payPhoneNew);
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
     * 查询是否有服务费用清单费用
     *
     * @param serviceMoneyVo
     * @return
     */
    @RequestMapping("/queryServiceMoney")
    @ResponseBody
    public Map<String, Object> queryServiceMoney(ServiceMoney serviceMoneyVo, String payId) {

        Map<String, Object> map = new HashMap<>();

        if (payId.startsWith("CUS")) {
            serviceMoneyVo.setCc_code(payId);
        } else if (payId.startsWith("USER")) {
            String payIds = payId.replace("USER", "");
            serviceMoneyVo.setUser_id(Integer.valueOf(payIds));
        } else if (payId.startsWith("EM")) {
            String payIds = payId.replace("EM", "");
            serviceMoneyVo.setEm_id(Integer.valueOf(payIds));
        } else if (payId.startsWith("UCC")) {
            String payIds = payId.replace("UCC", "");
            serviceMoneyVo.setUcc_id(Integer.valueOf(payIds));
        }

        List<ServiceMoney> serviceMoneyList = serviceMoneyService.selectServiceMoney(serviceMoneyVo);
        map.put("serviceMoneyList", serviceMoneyList);
        //服务订单

        ServiceOrderVo serviceOrderVo = serviceService.selectServiceOrderInfoById(serviceMoneyVo.getSo_id());
        map.put("declaration", serviceOrderVo);
        return map;
    }

    /**
     * 返回或初始化页面时更改服务清单与支付订单状态
     *
     * @param money
     * @return
     */
    @RequestMapping("/updateServiceMoney")
    @ResponseBody
    public String updateServiceMoney(ServiceMoney money, String trade_code, String ucc_order_sn) {
        Msg<Object> msg = new Msg<>();
        try {
            //将服务清单状态改未生成订单
            List<ServiceMoney> serviceMoneyList = serviceMoneyService.selectServiceMoney(money);
            for (ServiceMoney serviceMoney: serviceMoneyList) {
                serviceMoney.setIs_order(0);
                serviceService.updateServiceMoney(serviceMoney);
            }

            //生成服务订单,账单前查询是否已存在,如果存在则失效订单账单
            serviceService.failureOrder(money.getSo_id(), trade_code, ucc_order_sn);
            msg.toString(200);
        } catch (Exception e) {
            msg.toString(401);
            e.printStackTrace();
        }
        return msg.toString();
    }

    /**
     * 新版服务添加图片
     *
     * @param image_url
     * @return
     */
    @RequestMapping(value = "/insertServiceImage")
    @ResponseBody
    public Map<String, Object> insertServiceImage(Integer so_id, String image_url, String type) {
        Map<String, Object> map = new HashMap<>();
        if (!AppUtil.isNotNull(so_id) || !AppUtil.isNotNull(image_url)) {
            map.put("msg", "参数错误");
            return map;
        }
        ServiceImageVo serviceImageVo = new ServiceImageVo();
        serviceImageVo.setSo_id(so_id);
        serviceImageVo.setSi_path(image_url);
        serviceImageVo.setSi_type(type);
        serviceService.insertServiceImagePath(serviceImageVo);
        Integer si_id = serviceImageVo.getSi_id();
        map.put("msg", "success");
        map.put("mi_id", si_id);
        return map;
    }

    /**
     * 删除图片
     *
     * @param image_url  图片地址
     * @param uploadType 上传类型
     * @return
     */
    @RequestMapping("/deleteServiceImageFile")
    @ResponseBody
    public Map<String, Object> deleteServiceImageFile(String image_url, String uploadType) {
        Map<String, Object> map = new HashMap<>();
        if (!AppUtil.isNotNull(image_url) || !AppUtil.isNotNull(uploadType)) {
            map.put("msg", Msg.MSG_PARAM_ERROR);
            return map;
        }
        // 远程删除图片

        try {
            OSSparameter.removeFile(image_url);
            map.put("msg", "success");
        } catch (Exception e) {
            e.printStackTrace();
            map.put("msg", "系统异常，请重试或联系管理员");
        }
        return map;
    }

    /**
     * appToken生成
     *
     * @param request
     */
    private String appToken(HttpServletRequest request) {
        // 生成token
        String token = CSRFTokenUtil.generate(request);
        request.getSession().setAttribute("CSRFToken", token);
        return token;
    }

}
