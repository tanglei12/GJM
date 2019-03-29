package com.gjp.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.gjp.model.*;
import com.gjp.model.Company;
import com.gjp.service.*;
import com.gjp.token.SameUrlData;
import com.gjp.util.*;
import com.gjp.util.Base64;
import com.gjp.util.upload.URLUploadImage;
import freemarker.template.TemplateException;
import net.coobird.thumbnailator.Thumbnails;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.io.IOUtils;
import org.apache.maven.model.Model;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Map.Entry;

/**
 * 服务
 *
 * @author JiangQt
 * @createTime 2015年9月6日下午7:08:01
 */
@Controller
@RequestMapping("/service")
@Configuration
public class ServiceController {

    // 服务
    @Resource
    private ServiceService serviceService;
    // 内部职员
    @Resource
    private UserCenterEmployeeService employeeService;
    // 订单处理
    @Resource
    private HandleService handleService;
    // 维修申请
    @Resource
    private ContractService contractService;
    // 保洁账单
    @Resource
    private BillClearBillService billClearBillService;
    // 保洁订单
    @Resource
    private BillClearOrderService billClearOrderService;
    // 服务清单
    @Resource
    private ServiceMoneyService serviceMoneyService;
    // 评分
    @Resource
    private UserCenterUserFractionService fractionService;
    // 服务预约
    @Resource
    private ServiceOrderService serviceOrderService;
    // 消息提醒
    @Resource
    private UserMessageContentService contentService;
    // 客户
    @Resource
    private CustomerService customerService;
    // 房源
    @Resource
    private HouseLibraryService houseLibraryService;
    // 短信
    @Resource
    private SmsService smsService;
    // 服务费
    @Resource
    private ServiceChargeService serviceChargeService;
    // 数据字典
    @Resource
    private UserDictionaryService userDictionaryService;
    //
    @Resource
    private AuthorizationService authorizationService;

    /**
     * 服务列表
     *
     * @return
     */
    @RequestMapping("/serviceList")
    public String serviceList() {
        return "/service/serviceList";
    }

    /**
     * 查询服务列表分页数据
     *
     * @param pagination
     * @return
     */
    @RequestMapping("/queryServicePageList")
    public @ResponseBody
    String queryServicePageList(Pagination<ServiceOrderVo> pagination) {
        Msg<Object> msg = new Msg<>();
        pagination.formatWhere();
        pagination.setOrderBy("ORDER BY CASE WHEN so_state = 5010 OR so_state = 5020 THEN 0 ELSE 1 END DESC, so_createTime DESC, so_state ASC, so_type ASC, so_targetAddress ASC");
        pagination = serviceService.queryServicePageList(pagination);
        return msg.toString(pagination);
    }

    /**
     * 查询服务详情数据
     *
     * @param so_code
     * @return
     */
    @RequestMapping("/queryServiceInfo")
    public @ResponseBody
    String queryServiceInfo(String so_code) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(so_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 查询服务订单
        ServiceOrderVo serviceOrderVo = serviceService.queryServiceInfo(so_code);
        msg.put("serviceOrderInfo", serviceOrderVo);

        // 查询服务记录列表
        ServiceRecordVo serviceRecordVo = new ServiceRecordVo();
        serviceRecordVo.setSo_id(serviceOrderVo.getSo_id());
        List<ServiceRecordVo> serviceRecordList = serviceService.queryServiceRecordList(serviceRecordVo);
        msg.put("serviceRecordList", serviceRecordList);

        // 查询服务项目列表
        ServiceOrderItemVo serviceOrderItemVo = new ServiceOrderItemVo();
        serviceOrderItemVo.setSo_id(serviceOrderVo.getSo_id());
        List<ServiceOrderItemVo> serviceOrderItemList = serviceService.queryServiceOrderItemList(serviceOrderItemVo);
        msg.put("serviceOrderItemList", serviceOrderItemList);

        // 查询服务费用列表
        ServiceMoney serviceMoney = new ServiceMoney();
        serviceMoney.setSo_id(serviceOrderVo.getSo_id());
        List<ServiceMoney> serviceMoneyList = serviceService.queryServiceMoneyBySoId(serviceMoney);
        msg.put("serviceMoneyList", serviceMoneyList);

        // 查询费用明细
        ServiceMoneyDetail serviceMoneyDetail = new ServiceMoneyDetail();
        serviceMoneyDetail.setSo_id(serviceOrderVo.getSo_id());
        List<ServiceMoneyDetail> serviceMoneyDetailList = serviceService.queryMoneyDetailListById(serviceMoneyDetail);
        msg.put("serviceMoneyDetailList", serviceMoneyDetailList);

        // 客服回访
        UserCenterFraction userFraction = new UserCenterFraction();
        userFraction.setSo_id(serviceOrderVo.getSo_id());
        userFraction = fractionService.selectUserCenterUserFractiony(userFraction);
        msg.put("userFraction", userFraction);

        // 现场问题
        ServiceProcessProblemVo processProblemVo = new ServiceProcessProblemVo();
        processProblemVo.setSo_id(serviceOrderVo.getSo_id());
        List<ServiceProcessProblemVo> processProblemVoList = serviceService.selectServiceProcessProblem(processProblemVo);
        msg.put("processProblemVoList", processProblemVoList);

        // 是否有改派
        ServiceProcessVo serviceProcessVo = new ServiceProcessVo();
        serviceProcessVo.setSo_id(serviceOrderVo.getSo_id());
        List<ServiceProcessVo> serviceProcessVoList = serviceService.queryServiceProcessList(serviceProcessVo);
        msg.put("serviceProcessList", serviceProcessVoList);

        // 服务相关图片
        ServiceImageVo serviceImageVo = new ServiceImageVo();
        serviceImageVo.setSo_id(serviceOrderVo.getSo_id());
        List<ServiceImageVo> serviceImageVoList = serviceService.queryServiceImage(serviceImageVo);
        if (null != serviceImageVoList) {
            for (ServiceImageVo imageVo: serviceImageVoList) {
                imageVo.setSi_url_path(OSSparameter.imagePath(imageVo.getSi_path(), null, null));
            }
        }
        msg.put("serviceImageVoList", serviceImageVoList);

        // 查询服务费
        if (!StringUtils.isEmpty(serviceOrderVo.getHi_code())) {
            ContractObjectVo contractObjectVo = new ContractObjectVo();
            int payObject = serviceOrderVo.getSo_payObject().intValue();
            if (payObject == 4 || payObject == 5) {
                contractObjectVo.setHi_code(serviceOrderVo.getHi_code());
                contractObjectVo.setCc_name(serviceOrderVo.getSo_payNameNew());
                if (payObject == 4) {
                    contractObjectVo.setContractObject_Type("租赁合同");
                } else if (payObject == 5) {
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

    @RequestMapping("/myService")
    public String myService() {
        return "/service/myService";
    }

    /**
     * 跳转添加服务
     */
    @RequestMapping("/addService")
    public ModelAndView addService() {
        ModelAndView mav = new ModelAndView("/service/addService");
        List<ServiceMessage> serviceList = serviceService.selectServiceList();
        List<ServiceType> typeList = new ArrayList<>();
        for (ServiceMessage serviceMessage: serviceList) {
            ServiceType serviceType = new ServiceType();
            serviceType.setSm_id(serviceMessage.getSm_id());
            typeList = serviceService.selectServiceTypeList(serviceType);
            break;
        }
        List<ContractType> contractTypeList = contractService.selectContractTypeByParentId(EnumTypeStatus.TYPE_SERVICE_APPLY_TYPE.getId());
        mav.addObject("contractTypeList", contractTypeList);
        mav.addObject("serviceList", serviceList);
        mav.addObject("typeList", typeList);
        AppUtil.setSession("sessionToken", AppUtil.getRandNum(8));
        return mav;
    }

    /**
     * 跳转添加服务
     */
    @RequestMapping("/applyService")
    public ModelAndView applyService() {
        ModelAndView mav = new ModelAndView("/service/applyService");
        List<ServiceMessage> serviceList = serviceService.selectServiceList();
        List<ServiceType> typeList = new ArrayList<>();
        for (ServiceMessage serviceMessage: serviceList) {
            ServiceType serviceType = new ServiceType();
            serviceType.setSm_id(serviceMessage.getSm_id());
            typeList = serviceService.selectServiceTypeList(serviceType);
            break;
        }
        List<ContractType> contractTypeList = contractService.selectContractTypeByParentId(EnumTypeStatus.TYPE_SERVICE_APPLY_TYPE.getId());
        mav.addObject("contractTypeList", contractTypeList);
        mav.addObject("serviceList", serviceList);
        mav.addObject("typeList", typeList);
        AppUtil.setSession("sessionToken", AppUtil.getRandNum(8));
        return mav;
    }

    /**
     * 跳转添加服务JSON
     */
    @RequestMapping("/addServiceJson")
    @ResponseBody
    public Map<String, Object> addServiceJson() {
        Map<String, Object> map = new HashMap<>();
        List<ServiceMessage> serviceList = serviceService.selectServiceList();
        List<ServiceType> typeList = new ArrayList<>();
        for (ServiceMessage serviceMessage: serviceList) {
            ServiceType serviceType = new ServiceType();
            serviceType.setSm_id(serviceMessage.getSm_id());
            typeList = serviceService.selectServiceTypeList(serviceType);
            break;
        }
        List<ContractType> contractTypeList = contractService.selectContractTypeByParentId(EnumTypeStatus.TYPE_SERVICE_APPLY_TYPE.getId());
        map.put("contractTypeList", contractTypeList);
        map.put("serviceList", serviceList);
        map.put("typeList", typeList);
        return map;
    }

    @RequestMapping("/showListInfo")
    public String showListInfo() {
        return "/service/showListInfo";
    }

    /**
     * 显示列表信息:showListInfo
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping("/showListInfos")
    @ResponseBody
    public Map<String, Object> showListInfos(Integer md_id, Integer width, Integer height) {
        Map<String, Object> map = new HashMap<>();
        if (!StringUtils.isEmpty(md_id)) {
            ViewBusinessDeclarationVo declaration = serviceService.selectDeclarationAllById(md_id);
            if (declaration.getHouse_address() == null) {
                declaration.setHouse_address(declaration.getMd_address());
            }
            // 服务问题内容列表
            Problem problem = new Problem();
            problem.setMd_id(md_id);
            List<Problem> problems = serviceService.selectProblem(problem);
            map.put("problems", problems);
//            if (declaration.getMdg_moneyCode() != null) {
            ServiceMoney money = new ServiceMoney();
            money.setMd_id(declaration.getMd_id());
            money.setMdg_moneyCode(declaration.getMdg_moneyCode());
            List<ServiceMoney> selectServiceMoney = serviceMoneyService.selectServiceMoney(money);
            map.put("selectServiceMoney", selectServiceMoney);

            List<ServiceMoneyDetail> moneyDetails = serviceService.queryMoneyDetailList(declaration.getMd_id());
            if (null != moneyDetails) {
                map.put("moneyDetails", moneyDetails);
            }

//            }
            if (declaration != null) {
                MaintenanceOrder orderVo = handleService.selectMaintenanceOrderByMdId(md_id);
                // 服务流程--服务申请
                if (AppConfig.SERVICE_PROC_0.equals(orderVo.getMo_state())) {
                    map.put("state", 0);
                }
                // 服务流程--服务受理
                if (AppConfig.SERVICE_PROC_1.equals(orderVo.getMo_state())) {
                    map.put("state", 1);
                }
                // 服务流程--服务处理
                if (AppConfig.SERVICE_PROC_2.equals(orderVo.getMo_state())) {
                    map.put("state", 2);
                }
                // 服务流程--服务完成
                if (AppConfig.SERVICE_PROC_3.equals(orderVo.getMo_state())) {
                    map.put("state", 3);
                }
                // 服务流程--客服回访
                if (AppConfig.SERVICE_PROC_4.equals(orderVo.getMo_state())) {
                    map.put("state", 4);
                }
                // 服务流程--结束订单
                if (AppConfig.SERVICE_PROC_5.equals(orderVo.getMo_state())) {
                    map.put("state", 5);
                }

//                UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
//                userCenterEmployee.setEm_id(AppUtil.getCookieEmployee(request).getEm_id());
//                userCenterEmployee = employeeService.selectUserCenterEmployeeInfo(userCenterEmployee);
//                json.put("isService", userCenterEmployee.getUcc_name().contains("客服部"));

                String state = declaration.getMd_state();

                //房屋地址
                List<MaintenancePoint> maintenancePoint = serviceService.selectMaintenancePointById(declaration.getMd_id());
                map.put("maintenancePoint", maintenancePoint);
                // 未受理
                if (AppConfig.SERVICE_STATE_NO.equals(state) || AppConfig.SERVICE_STATE_REFUSED.equals(state)) {
                    List<MaintenanceImage> imageList = serviceService.selectMaintenanceImage(declaration.getMd_id());
                    // 服务申报信息
                    map.put("declaration", declaration);
                    if (null != imageList) {
                        for (MaintenanceImage maintenanceImage: imageList) {
                            maintenanceImage.setImg_path(OSSparameter.imagePath(maintenanceImage.getMi_path(), null, null));
                        }
                    }
                    // 服务申报图片信息
                    map.put("imageList", imageList);
                    // 服务订单流程
                    List<MaintenanceOrder> orderVoList = handleService.selectMaintenanceOrderListByMdId(declaration.getMd_id());
                    map.put("orderVoList", orderVoList);
                    // 服务派工订单信息
                    MaintenanceDispatching dispatching = handleService.selectMaintenanceDispatching(declaration.getMd_id());
                    map.put("dispatching", dispatching);
                    return map;
                }
                // 已受理或终止受理或已完成或已派单
                if (AppConfig.SERVICE_STATE_COMPLETE.equals(state) || AppConfig.SERVICE_STATE_ERROR.equals(state)
                        || AppConfig.SERVICE_STATE_DONE.equals(state) || AppConfig.SERVICE_STATE_PAI.equals(state)) {
                    // 服务申报信息
                    map.put("declaration", declaration);

                    if (AppConfig.SERVICE_STATE_PAI.equals(state) || AppConfig.SERVICE_STATE_COMPLETE.equals(state)
                            || AppConfig.SERVICE_STATE_DONE.equals(state)) {

                        // 服务派工订单信息
                        MaintenanceDispatching dispatching = handleService.selectMaintenanceDispatching(declaration.getMd_id());
                        map.put("dispatching", dispatching);
                        // 服务派工人员信息
                        if (null != dispatching) {
                            UserCenterEmployee employee = employeeService.selectEmployeeById(dispatching.getEm_id());
                            map.put("employee", employee);
                        }
                    }

                    //ServiceMoney serviceMoney = new ServiceMoney();
                    money.setMd_id(declaration.getMd_id());
                    money.setMdg_moneyCode(declaration.getMdg_moneyCode());
                    List<ServiceMoney> serviceMoneyList = serviceMoneyService.selectServiceMoney(money);
                    map.put("serviceMoneyList", serviceMoneyList);

                    // 图片描述
                    List<MaintenanceImage> imageList = serviceService.selectMaintenanceImage(declaration.getMd_id());
                    if (null != imageList) {
                        for (MaintenanceImage maintenanceImage: imageList) {
                            maintenanceImage.setImg_path(OSSparameter.imagePath(maintenanceImage.getMi_path(), null, null));
                        }
                    }
                    map.put("imageList", imageList);

                    // 服务跟进信息
                    MaintenanceTracks tracks = handleService.selectMaintenanceTracks(declaration.getMd_id());
                    map.put("tracks", tracks);
                    // 服务跟进图片说明
                    List<MaintenanceImage> tracksImglist = serviceService.selectMaintenanceImage(declaration.getMd_id());
                    for (MaintenanceImage tracksImglistes: tracksImglist) {
                        tracksImglistes.setMi_path(OSSparameter.imagePath(tracksImglistes.getMi_path(), width, height));
                    }
                    map.put("tracksImglist", tracksImglist);
                    // 服务进度
                    List<MaintenanceOrder> orderVoList = handleService.selectMaintenanceOrderListByMdId(declaration.getMd_id());
                    map.put("orderVoList", orderVoList);
                    // 查询是否生成账单
                    boolean isGenrate = handleService.queryOrderMDCount(declaration.getMd_id()) > 0;
                    map.put("isGenrate", isGenrate);
                    // 服务评分
                    UserCenterFraction userCenterUserFraction = new UserCenterFraction();
                    userCenterUserFraction.setMd_id(declaration.getMd_id());
                    userCenterUserFraction = fractionService.selectUserCenterUserFractiony(userCenterUserFraction);
                    map.put("userCenterUserFraction", userCenterUserFraction);
                    return map;
                }
            }
        }
        return null;
    }

    /**
     * 服务项目添加
     *
     * @param md_id
     * @return
     * @author 陈智颖
     * @date Jun 3, 2017 6:00:40 PM
     */
    @RequestMapping("/serviceProject")
    @ResponseBody
    public Map<String, Object> serviceProject(Integer md_id) {
        Map<String, Object> map = new HashMap<>();
        ViewBusinessDeclarationVo declaration = serviceService.selectDeclarationAllById(md_id);
        // 服务问题内容列表
        Problem problem = new Problem();
        problem.setMd_id(md_id);
        List<Problem> problems = serviceService.selectProblem(problem);
        map.put("problems", problems);
        map.put("declaration", declaration);
        return map;
    }

    /**
     * 审核界面
     *
     * @param id
     * @author 陈智颖
     */
    @RequestMapping(value = "/ServiceAccept")
    public ModelAndView ServiceAccept(Integer id) {
        if (!StringUtils.isEmpty(id)) {
            // MaintenanceDeclaration declaration =
            // serveService.selectDeclarationAllById(id);
            ViewBusinessDeclarationVo declaration = serviceService.selectDeclarationAllById(id);
            if (declaration != null) {
                String state = declaration.getMd_state();
                if (AppConfig.SERVICE_STATE_NO.equals(state)) {
                    ModelAndView view = new ModelAndView("/service/serviceAccept");
                    List<MaintenanceImage> imageList = serviceService.selectMaintenanceImage(declaration.getMd_id());
                    // 服务申报信息
                    view.addObject("declaration", declaration);
                    // 服务申报图片信息
                    view.addObject("imageList", imageList);
                    return view;
                }
                if (AppConfig.SERVICE_STATE_COMPLETE.equals(state) || AppConfig.SERVICE_STATE_ERROR.equals(state)) {
                    MaintenanceOrder orderVo = handleService.selectMaintenanceOrderByMdId(id);
                    ModelAndView view = new ModelAndView("/service/serviceAccept");// handleService");
                    // 服务流程--业务处理
                    if (AppConfig.SERVICE_PROC_1.equals(orderVo.getMo_state())) {
                        view.addObject("state", 1);
                    }
                    // 服务流程--业务处理
                    if (AppConfig.SERVICE_PROC_2.equals(orderVo.getMo_state())) {
                        view.addObject("state", 2);
                    }
                    // 服务流程--客服回访
                    if (AppConfig.SERVICE_PROC_3.equals(orderVo.getMo_state())) {
                        view.addObject("state", 3);
                    }
                    // 服务流程--完成
                    if (AppConfig.SERVICE_PROC_4.equals(orderVo.getMo_state())) {
                        view.addObject("state", 4);
                    }

                    BillClearBill billClearBill = new BillClearBill();
                    billClearBill.setCb_code(declaration.getBco_code());
                    billClearBill = billClearBillService.selectBillClearBill(billClearBill);
                    declaration.setThereNum(new Integer(billClearBill.getSize()));
                    // 服务申报信息
                    view.addObject("declaration", declaration);
                    // 服务派工订单信息
                    MaintenanceDispatching dispatching = handleService.selectMaintenanceDispatching(declaration.getMd_id());
                    if (dispatching.getMdg_moneyCode() != null && !dispatching.getMdg_moneyCode().equals("")) {
                        ServiceMoney serviceMoney = new ServiceMoney();
                        serviceMoney.setMdg_moneyCode(dispatching.getMdg_moneyCode());
                        List<ServiceMoney> serviceMoneyList = serviceMoneyService.selectServiceMoney(serviceMoney);
                        view.addObject("serviceMoneyList", serviceMoneyList);
                    }
                    view.addObject("dispatching", dispatching);
                    // 图片描述
                    List<MaintenanceImage> imageList = serviceService.selectMaintenanceImage(declaration.getMd_id());
                    view.addObject("imageList", imageList);
                    // 服务派工人员信息
                    UserCenterEmployee employee = employeeService.selectEmployeeById(dispatching.getEm_id());
                    view.addObject("employee", employee);
                    // 服务跟进信息
                    MaintenanceTracks tracks = handleService.selectMaintenanceTracks(declaration.getMd_id());
                    view.addObject("tracks", tracks);
                    // 服务跟进图片说明
                    List<MaintenancePicture> tracksImglist = handleService.selectMaintenancePicture(declaration.getMd_id());
                    view.addObject("tracksImglist", tracksImglist);
                    // 服务派工人员信息
                    List<MaintenanceOrder> orderVoList = handleService.selectMaintenanceOrderListByMdId(declaration.getMd_id());
                    view.addObject("orderVoList", orderVoList);
                    return view;
                }
            }
        }
        return null;
    }

    /**
     * 提交审核
     *
     * @param md_id   维修申报编码
     * @param state   状态
     * @param content 备注
     * @param request
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/ServiceAcceptSubmit")
    @ResponseBody
    public String ServiceAcceptSubmit(Integer md_id, String state, String content, String account, HttpServletRequest request, HttpServletResponse response) {
        // 跨域传输json
        response.addHeader("Access-Control-Allow-Origin", "*");
        Msg<Pagination<ViewBusinessDeclarationVo>> msg = new Msg<Pagination<ViewBusinessDeclarationVo>>();
        UserCenterEmployee employee = new UserCenterEmployee();
        if (account == null) {
            employee = (UserCenterEmployee) AppUtil.getCookieEmployee();
        } else {
            employee.setEm_account(account);
            employee = employeeService.selectAccount(employee).get(0);
        }
        // 记录订单状况
        MaintenanceOrder order = new MaintenanceOrder();
        order.setMd_id(md_id);
        order.setMo_date(new Date());
        if (state.equals("完成订单")) {
            order.setMo_state(AppConfig.SERVICE_PROC_4);
            order.setMo_step(4);
        } else {
            order.setMo_state(AppConfig.SERVICE_PROC_2);
            order.setMo_step(2);
        }
        order.setMo_content("" + state + "<br>审核单人员：" + employee.getEm_name() + "," + content);
        serviceService.addOrder(order);
        // 更新派单信息
        MaintenanceDispatching maintenanceDispatching = new MaintenanceDispatching();
        maintenanceDispatching.setMd_id(md_id);
        maintenanceDispatching.setMdg_state(state);
        Integer tracksResult = handleService.updataMaintenanceDispatching(maintenanceDispatching);

        if (tracksResult > 0) {

            // 插入消息提醒
            UserMessageContent userMessageContent = new UserMessageContent();
            MaintenanceDispatching selectMaintenanceDispatching = handleService.selectMaintenanceDispatching(md_id);
            UserCenterEmployee selectEmployeeById = employeeService.selectEmployeeById(selectMaintenanceDispatching.getEm_id());
            if (!state.equals("订单完成")) {
                userMessageContent.setUmc_name("服务订单");
                userMessageContent.setUmc_content(selectEmployeeById.getEm_name() + "你的服务订单" + state);
                userMessageContent.setUmc_href("/service/serviceBill");
                userMessageContent.setEm_id(selectEmployeeById.getEm_id());
                userMessageContent.setUmc_account(selectEmployeeById.getEm_account());
                userMessageContent.setUmc_bool(0);
                Integer bool = contentService.addUserMessageContent(userMessageContent);

                if (bool > 0) {
                    // 插入XML文件
                    // 根目录路径
                    String path = request.getSession().getServletContext().getRealPath("/");
                    List<Object> userMessageContents = new ArrayList<Object>();
                    userMessageContents.add(userMessageContent);
                    List<UserMessageContent> xmltoClass = XmlClass.xmltoClass(path, "message.xml", userMessageContent);
                    if (xmltoClass == null) {
                        XmlClass.classtoXml(path, userMessageContents, "message.xml", userMessageContent);
                    } else {
                        for (UserMessageContent userMessageContent2: xmltoClass) {
                            userMessageContents.add(userMessageContent2);
                        }
                        XmlClass.classtoXml(path, userMessageContents, "message.xml", userMessageContent);
                    }
                }
            } else {
                userMessageContent.setUmc_name("客户回访");
                userMessageContent.setUmc_content(selectEmployeeById.getEm_name() + "你需要评价一个服务订单");
                userMessageContent.setUmc_href("/service/serviceVisit");
                List<UserCenterEmployee> selectEmployeeTable = employeeService.selectUserCenterEmployeeZG(selectEmployeeById);
                for (UserCenterEmployee userCenterEmployee: selectEmployeeTable) {
                    userMessageContent.setEm_id(userCenterEmployee.getEm_id());
                    userMessageContent.setUmc_bool(0);
                    userMessageContent.setUmc_account(userCenterEmployee.getEm_account());
                    Integer bool = contentService.addUserMessageContent(userMessageContent);

                    if (bool > 0) {
                        // 插入XML文件
                        // 根目录路径
                        String path = request.getSession().getServletContext().getRealPath("/");
                        List<Object> userMessageContents = new ArrayList<Object>();
                        userMessageContents.add(userMessageContent);
                        List<UserMessageContent> xmltoClass = XmlClass.xmltoClass(path, "message.xml", userMessageContent);
                        if (xmltoClass == null) {
                            XmlClass.classtoXml(path, userMessageContents, "message.xml", userMessageContent);
                        } else {
                            for (UserMessageContent userMessageContent2: xmltoClass) {
                                userMessageContents.add(userMessageContent2);
                            }
                            XmlClass.classtoXml(path, userMessageContents, "message.xml", userMessageContent);
                        }
                    }
                }
                msg.setMsg("3");
                return msg.toString();
            }

            msg.setMsg("1");
            return msg.toString();
        } else {
            msg.setMsg("0");
            return msg.toString();
        }
    }

    /**
     * 添加申请服务信息
     *
     * @param request
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/addServiceApplyInfo")
    @ResponseBody
    public String addServiceApplyInfo(@RequestBody Map<String, Object> data, HttpServletRequest request) {
        Msg<String> msg = new Msg<String>();

        MaintenanceDeclaration declaration = JSONObject.parseObject((String) data.get("declaration"), MaintenanceDeclaration.class);

        Random random1 = new Random();
        Integer rd = random1.nextInt(9999 - 1000 + 1) + 1000;
        String number = "250" + (new Date()).getTime() + rd.toString();

        UserCenterEmployee employee = (UserCenterEmployee) AppUtil.getCookieEmployee();
        declaration.setMd_number(new Date().getTime() + employee.getEm_id() + "");
        declaration.setMd_problem(declaration.getMd_remark());
        declaration.setMd_state(AppConfig.SERVICE_STATE_NO);
        declaration.setMd_source(AppConfig.SERVICE_APPLY_SOURCE1);
        declaration.setMd_agentApplyer(employee.getEm_id());// 代理申请人
        declaration.setApply_time(new Date());
        declaration.setMdg_moneyCode(number);

        boolean boo = serviceService.addDeclarationInfo(declaration);
        if (!boo) {
            msg.setCode(110);
            msg.setMsg("申请失败");
            return msg.toString();
        }

        List<MaintenancePoint> pointList = JSONObject.parseArray((String) data.get("pointList"), MaintenancePoint.class);
        if (null != pointList && !pointList.isEmpty()) {
            for (MaintenancePoint point: pointList) {
                point.setMd_id(declaration.getMd_id());
                serviceService.addPoint(point);
            }
        }

        // 图片
        String[] servicePicDescs = declaration.getServicePicDesc();
        if (null != servicePicDescs && servicePicDescs.length > 0) {
            for (int i = 0; i < servicePicDescs.length; i++) {
                MaintenanceImage maintenanceImage = new MaintenanceImage();
                maintenanceImage.setMi_path(servicePicDescs[i]);
                maintenanceImage.setMd_id(declaration.getMd_id());
                maintenanceImage.setMi_type("fault");
                serviceService.addDeclarationImagePath(maintenanceImage);
            }
        }

//        // 费用
//        ServiceMoney serviceMoney = new ServiceMoney();
//        serviceMoney.setMdg_moneyCode(number);
//        if (declaration.getMd_type().indexOf("维修") > -1) {
//            serviceMoney.setSsm_source("人工费");
//        } else if (declaration.getMd_type().indexOf("洁") > -1) {
//            serviceMoney.setSsm_source("清洁费");
//        }
//        serviceMoney.setSsm_univalent(Double.valueOf(declaration.getServiceObjMoney()));
//        serviceMoney.setSsm_num(1);
//        serviceMoney.setSsm_company("元");
//        serviceMoney.setSsm_money(Double.valueOf(declaration.getServiceObjMoney()));
//        serviceMoney.setSsm_date(new Date());
//        serviceMoneyService.addServiceMoney(serviceMoney);

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
            Integer bool = contentService.addUserMessageContent(userMessageContent);

            if (bool > 0) {
                // 插入XML文件
                // 根目录路径
                String path = request.getSession().getServletContext().getRealPath("/");
                List<Object> userMessageContents = new ArrayList<Object>();
                userMessageContents.add(userMessageContent);
                List<UserMessageContent> xmltoClass = XmlClass.xmltoClass(path, "message.xml", userMessageContent);
                if (xmltoClass == null) {
                    XmlClass.classtoXml(path, userMessageContents, "message.xml", userMessageContent);
                } else {
                    for (UserMessageContent userMessageContent2: xmltoClass) {
                        userMessageContents.add(userMessageContent2);
                    }
                    XmlClass.classtoXml(path, userMessageContents, "message.xml", userMessageContent);
                }
            }
        }

        return msg.toString();
    }

    /**
     * 添加费用
     *
     * @param md_id
     * @param moneyListt
     * @return
     * @author 陈智颖
     * @date May 29, 2017 4:34:54 PM
     */
    @RequestMapping("/addserviceMoney")
    @ResponseBody
    public Map<String, Object> addserviceMoney(Integer md_id, String moneyListt, Double mdgMoney) {
        Map<String, Object> map = new HashMap<>();

        // 删除之前的费用记录
//        serviceService.deleteSerivceMoney(md_id);

        MaintenanceDeclaration declarations = serviceService.selectDeclarationById(md_id);

        String[] moneyLists = moneyListt.split(";");

        for (int i = 0; i < moneyLists.length; i++) {
            String[] moneyList = moneyLists[i].split("-");
            ServiceMoney money = new ServiceMoney();
//            money.setMdg_moneyCode(number);
            int payObject = Integer.parseInt(moneyList[0]);
            money.setMd_id(md_id);
            money.setSsm_source(moneyList[2]);
            money.setSsm_univalent(new Double(moneyList[3]));
            money.setSsm_num(1);
            money.setSsm_company("元");
            money.setSsm_money(new Double(moneyList[3]));

            if (1 == payObject) {// 客户
                if (moneyList[1].startsWith("CUS")) {
                    money.setCc_code(moneyList[1]);
                } else {
                    money.setUser_id(Integer.valueOf(moneyList[1]));
                }
            } else if (2 == payObject) {// 管家
                money.setEm_id(Integer.valueOf(moneyList[1]));
            } else if (3 == payObject) {
                money.setUcc_id(Integer.valueOf(moneyList[1]));
            }
            money.setPayObject(payObject);
            if (Integer.parseInt(moneyList[4]) != 1) {

                System.out.println(Integer.parseInt(moneyList[4]));
                // 未生成订单记录
                serviceMoneyService.addServiceMoney(money);
            }
        }

        List<ServiceMoney> moneys = serviceService.queryServiceMoneyList(md_id);

        if (null != moneys && !moneys.isEmpty()) {
            for (ServiceMoney detial: moneys) {
                try {
                    serviceService.genrateServiceOrder(detial, declarations);
                } catch (AppException e) {
                    e.printStackTrace();
                    map.put("message", "生成账单失败");
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        MaintenanceOrder maintenanceOrder = new MaintenanceOrder();
        maintenanceOrder.setMd_id(md_id);
        maintenanceOrder.setMo_step(3);
        maintenanceOrder.setMo_state(AppConfig.SERVICE_PROC_3);
        maintenanceOrder.setMo_date(new Date());
        maintenanceOrder.setMo_content("服务完成");
        serviceService.addOrder(maintenanceOrder);

        if (declarations != null) {
            declarations.setMdg_money(mdgMoney);
            serviceService.updateDeclaration(declarations);
        }

        MaintenanceTracks maintenanceTracks = new MaintenanceTracks();
        maintenanceTracks.setMd_id(md_id);
        maintenanceTracks.setMtk_real_time(new Date());
        maintenanceTracks.setMtk_state("yes");
        maintenanceTracks.setMtk_updataTime(new Date());
        serviceService.updateTracks(maintenanceTracks);

        MaintenanceDispatching dispatching = new MaintenanceDispatching();
        dispatching.setMd_id(declarations.getMd_id());
        dispatching.setMdg_state(AppConfig.MDG_STATE3);
        serviceService.updateFollowUp(dispatching);
        map.put("message", "success");

        return map;
    }

    /**
     * APP添加费用
     *
     * @param md_id
     * @return
     * @author 陈智颖
     * @date May 29, 2017 4:34:54 PM
     */
    @RequestMapping("/addserviceMoneyApp")
    @ResponseBody
    public Map<String, Object> addserviceMoneyApp(Integer md_id, Double mdg_money, ServiceMoney money, String payId) {
        Map<String, Object> map = new HashMap<>();
        try {
            map = serviceService.addserviceMoneyApp(md_id, mdg_money, money, payId);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 查询是否有服务费用清单费用
     *
     * @param serviceMoney
     * @return
     */
    @RequestMapping("/selectServiceMoneyApp")
    @ResponseBody
    public Map<String, Object> selectServiceMoneyApp(ServiceMoney serviceMoney, Integer md_id) {
        Map<String, Object> map = new HashMap<>();
        List<ServiceMoney> serviceMoneyList = serviceMoneyService.selectServiceMoney(serviceMoney);

        map.put("serviceMoneyList", serviceMoneyList);

        MaintenanceDeclaration declaration = serviceService.selectDeclarationById(md_id);
        map.put("declaration", declaration);
        return map;
    }

    /**
     * APP添加申请服务信息
     *
     * @param problem                服务描述
     * @param serviceContent         服务子类型
     * @param serviceObjHouseCode    房屋编码
     * @param serviceApplyType       申请类型
     * @param serviceObjName         付费人
     * @param serviceObjPhone        付费人电话
     * @param contactPeople          联系人
     * @param contactPhone           联系电话
     * @param servicePicDesc         图片路径
     * @param serviceObjMoney        保洁费用
     * @param serviceObjStartTime    生效时间
     * @param serviceObjStartObjctNo 合同编码
     * @param request
     * @return
     * @throws UnsupportedEncodingException
     * @author 陈智颖
     */
    @RequestMapping(value = "/addServiceApplyInfoAPP", produces = "text/plain;charset=UTF-8")
    @ResponseBody
    public String addServiceApplyInfoAPP(
            String problem,
            String serviceContent,
            String serviceObjHouseCode,
            String serviceApplyType,
            String serviceObjName,
            String serviceObjPhone,
            String cc_code,
            String contactPeople,
            String contactPhone,
            String[] servicePicDesc,
            String serviceObjMoney,
            String serviceObjStartTime,
            String serviceObjStartObjctNo,
            String house_address,
            Integer em_id,
            HttpServletRequest request) {

        Msg<String> msg = new Msg<>();


        MaintenanceDeclaration declaration = new MaintenanceDeclaration();
        declaration.setHi_code(serviceObjHouseCode);
        declaration.setMd_number(new Date().getTime() + em_id + "");
        declaration.setMd_problem(problem);
        declaration.setCc_code(cc_code);
        declaration.setMd_people(serviceObjName);
        declaration.setMd_phone(serviceObjPhone);
        declaration.setMd_contactpeople(contactPeople);
        declaration.setMd_contactPhone(contactPhone);
        declaration.setMd_time(new Date());
        declaration.setMd_state(AppConfig.SERVICE_STATE_NO);
        declaration.setMd_source(AppConfig.SERVICE_APPLY_SOURCE1);
        declaration.setMd_agentApplyer(em_id);// 代理申请人
        declaration.setMd_type(serviceContent);
        declaration.setMd_applyType(serviceApplyType);
        declaration.setMdg_money(Double.valueOf(0));
        declaration.setMd_remark(problem);


        boolean boo = serviceService.addDeclarationInfo(declaration);
        if (!boo) {
            msg.setCode(110);
            msg.setMsg("申请失败");
            return msg.toString();
        }

        MaintenancePoint maintenancePoint = new MaintenancePoint();
        Integer md_id = declaration.getMd_id();
        maintenancePoint.setMd_id(md_id);
        if (!serviceObjHouseCode.isEmpty()) {
            maintenancePoint.setHi_code(serviceObjHouseCode);
        }
        if (!house_address.isEmpty()) {
            maintenancePoint.setHouse_address(house_address);
        }
        maintenancePoint.setP_type(1);
        int i = serviceService.addPoint(maintenancePoint);
        if (i < 1) {
            msg.setCode(110);
            msg.setMsg("申请失败");
            return msg.toString();
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

        /*// 图片
        String[] servicePicDescs = declaration.getServicePicDesc();
        if (null != servicePicDescs && servicePicDescs.length > 0) {
            for (int i = 0; i < servicePicDescs.length; i++) {
                MaintenanceImage maintenanceImage = new MaintenanceImage();
                maintenanceImage.setMi_path(servicePicDescs[i]);
                maintenanceImage.setMd_id(declaration.getMd_id());
                maintenanceImage.setMi_type("fault");
                serviceService.addDeclarationImagePath(maintenanceImage);
            }
        }*/

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
            Integer bool = contentService.addUserMessageContent(userMessageContent);

            if (bool > 0) {
                // 插入XML文件
                // 根目录路径
                String path = request.getSession().getServletContext().getRealPath("/");
                List<Object> userMessageContents = new ArrayList<Object>();
                userMessageContents.add(userMessageContent);
                List<UserMessageContent> xmltoClass = XmlClass.xmltoClass(path, "message.xml", userMessageContent);
                if (xmltoClass == null) {
                    XmlClass.classtoXml(path, userMessageContents, "message.xml", userMessageContent);
                } else {
                    for (UserMessageContent userMessageContent2: xmltoClass) {
                        userMessageContents.add(userMessageContent2);
                    }
                    XmlClass.classtoXml(path, userMessageContents, "message.xml", userMessageContent);
                }
            }
        }

        return msg.toString();
    }

    /**
     * 查询客户信息
     *
     * @param request
     * @param param
     * @return
     * @author JiangQT
     */
    @RequestMapping("/querySginInfo")
    @ResponseBody
    public String querySginInfo(HttpServletRequest request, String param) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(param)) {
            msg.setCode(110);
            msg.setMsg("参数错误");
            return msg.toString();
        }
        return msg.toString();
    }

    /**
     * 查询房屋信息
     *
     * @param param
     * @return
     * @throws UnsupportedEncodingException
     * @author JiangQT
     */
    @RequestMapping(value = "/queryHouseInfo", produces = "text/plain;charset=UTF-8")
    @ResponseBody
    public String queryHouseInfo(String param, String type, String typeF) {
        Msg<Pagination<ViewBusinessContractVo>> msg = new Msg<Pagination<ViewBusinessContractVo>>();
        Pagination<ViewBusinessContractVo> pagination = new Pagination<ViewBusinessContractVo>(1, 10);
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setCc_name(param);
        contractVo.setCcp_phone(param);
        contractVo.setHouse_address(param);
        pagination.setT(contractVo);
//        if (typeF.equals("房东")) {
//            contractVo.setContractObject_Type("托管合同");
//        } else if (typeF.equals("现租客")) {
//            contractVo.setContractObject_Type("租赁合同");
//        } else if (typeF.equals("前租客")) {
//            contractVo.setContractObject_Type("租赁合同");
//            contractVo.setContractObject_OptionPerson("前租客");
//        } else {
//            contractVo.setContractObject_Type("托管合同");
//        }
        List<ViewBusinessContractVo> selectViewContractList = contractService.selectViewContractList(pagination);
        for (ViewBusinessContractVo viewBusinessContractVo: selectViewContractList) {
            contractVo.setHi_code(viewBusinessContractVo.getHi_code());
            contractVo.setContractObject_Type("租赁合同");
            ViewBusinessContractVo userCenterList = contractService.selectContractObjectPeople(contractVo);
            if (userCenterList != null) {
                viewBusinessContractVo.setXcc_name(userCenterList.getCc_name());
                viewBusinessContractVo.setXccp_phone(userCenterList.getCcp_phone());
            }
        }
        pagination.setList(selectViewContractList);
        msg.setData(pagination);
        return msg.toString();
    }


    /**
     * 修改服务申请类型
     *
     * @return
     * @throws UnsupportedEncodingException
     * @author JiangQT
     */
    @RequestMapping("/updateHouseInfoHiCode")
    @ResponseBody
    public Map<String, Object> updateHouseInfoHiCode(String hi_code, String type, String typeF, Integer md_id) {
        Map<String, Object> map = new HashMap<>();
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setHi_code(hi_code);
        if (typeF.equals("房东")) {
            contractVo.setContractObject_Type("托管合同");
        } else if (typeF.equals("现租客") || typeF.equals("管家")) {
            contractVo.setContractObject_Type("租赁合同");
        }
        ViewBusinessContractVo viewBusinessContractVo = new ViewBusinessContractVo();
        if (!typeF.equals("管家婆")) {
            viewBusinessContractVo = contractService.selectViewContractListHiCode(contractVo);
        }
        MaintenanceDeclaration maintenanceDeclaration = new MaintenanceDeclaration();
        maintenanceDeclaration.setMd_id(md_id);
        maintenanceDeclaration.setMd_applyType(type + "(" + typeF + ")");
        if (typeF.equals("管家")) {
            maintenanceDeclaration.setMd_people(viewBusinessContractVo.getContractBody_GjName() == null ? "" : viewBusinessContractVo.getContractBody_GjName());
            maintenanceDeclaration.setMd_phone(viewBusinessContractVo.getContractBody_GjPhone() == null ? "" : viewBusinessContractVo.getContractBody_GjPhone());
        } else {
            maintenanceDeclaration.setMd_people(viewBusinessContractVo.getCc_name() == null ? "" : viewBusinessContractVo.getCc_name());
            maintenanceDeclaration.setMd_phone(viewBusinessContractVo.getCcp_phone() == null ? "" : viewBusinessContractVo.getCcp_phone());
        }
        int bool = serviceService.updataDeclarationPerson(maintenanceDeclaration);
        if (bool > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 添加现场确认列表
     *
     * @param problem
     * @param md_id
     * @return
     * @author 陈智颖
     * @date Jun 3, 2017 11:42:11 AM
     */
    @RequestMapping("/addProblemList")
    @ResponseBody
    public Map<String, Object> addProblemList(String problem, Integer md_id) {
        Map<String, Object> map = new HashMap<>();
        Problem problems = new Problem();
        problems.setMd_id(md_id);
        int bools = 0;
        serviceService.deleteProblem(problems);
        if (problem != null && !problem.equals("")) {
            String[] split = problem.split(";");
            for (int i = 0; i < split.length; i++) {
                Problem problem1 = new Problem();
                problem1.setMdp_content(split[i].toString());
                problem1.setMd_id(md_id);
                bools = serviceService.addProblem(problem1);
                if (bools == 0) {
                    break;
                }
            }
        }
        if (bools > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 查询房屋信息
     *
     * @param param
     * @return
     * @throws UnsupportedEncodingException
     * @author JiangQT
     */
    @RequestMapping(value = "/queryHouseInfos", produces = "text/plain;charset=UTF-8")
    @ResponseBody
    public String queryHouseInfos(String param, String type, String typeF) throws Exception {
        byte bb[], bb1[];
        bb = typeF.getBytes("ISO-8859-1"); // 以"ISO-8859-1"方式解析name字符串
        bb1 = param.getBytes("ISO-8859-1"); // 以"ISO-8859-1"方式解析name字符串
        // name= ; //再用"utf-8"格式表示name
        typeF = new String(bb, "UTF-8");
        param = new String(bb1, "UTF-8");
        Msg<Pagination<ViewBusinessContractVo>> msg = new Msg<Pagination<ViewBusinessContractVo>>();
        Pagination<ViewBusinessContractVo> pagination = new Pagination<ViewBusinessContractVo>(1, 10);
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setCc_name(param);
        contractVo.setHouse_address(param);
        contractVo.setCcp_phone(param);
        pagination.setT(contractVo);
        if (typeF.equals("房东")) {
            contractVo.setContractObject_Type("托管合同");
        } else if (typeF.equals("现租客")) {
            contractVo.setContractObject_Type("租赁合同");
        } else if (typeF.equals("前租客")) {
            contractVo.setContractObject_OptionPerson("前租客");
        }
        pagination.setList(contractService.selectViewContractList(pagination));
        msg.setData(pagination);
        return msg.toString();
    }

    /**
     * 根据房屋编码查询现租客姓名
     *
     * @return
     */
    @RequestMapping("queryHouseInfoXPeople")
    @ResponseBody
    public Map<String, Object> queryHouseInfoXPeople(String code) {
        Map<String, Object> map = new HashMap<>();
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setHi_code(code);
        contractVo.setContractObject_Type("租赁合同");
        ViewBusinessContractVo userCenterList = contractService.selectContractObjectPeople(contractVo);
        if (userCenterList == null) {
            map.put("userCenter", "0");
        } else {
            map.put("userCenter", userCenterList);
        }
        return map;
    }

    /**
     * 查询服务类别
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/changeTypes")
    @ResponseBody
    public Map<String, Object> changeTypes() {
        Map<String, Object> map = new HashMap<>();
        map.put("serviceList", serviceService.selectServiceList());
        return map;
    }

    /**
     * 改变服务类型
     *
     * @param typeId
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/changeType")
    @ResponseBody
    public String changeType(Integer typeId, Integer pId) {
        Msg<Object> msg = new Msg<>();
        ServiceType serviceType = new ServiceType();
        if (!StringUtils.isEmpty(typeId)) {
            serviceType.setSm_id(typeId);
        }
        if (!StringUtils.isEmpty(pId)) {
            serviceType.setParent_id(pId);
        }
        List<ServiceType> typeList = serviceService.selectServiceTypeList(serviceType);
        return msg.toString(typeList);
    }

    /**
     * 查询服务描述
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping(value = "/queryServiceDesc", produces = "text/plain;charset=UTF-8")
    @ResponseBody
    public String queryServiceDesc(Integer stId) {
        Msg<Object> msg = new Msg<>();
        List<ProblemList> problemList = serviceService.selectProblemList(stId);
        if (problemList.isEmpty()) {
            msg.setCode(0);
        } else {
            msg.setData(problemList);
        }
        return msg.toString();
    }

    /* ===================服务申请END======================== */

    /* ====================服务处理========================== */

    /**
     * 跳转服务处理:service
     *
     * @return
     */
    @RequestMapping("/service")
    public String serve() {
        return "/service/service";
    }

    /**
     * 服务处理--查询所有服务订单列表信息<queryAllServiceOrderList> :queryAllServiceOrderList
     *
     * @return
     * @throws UnsupportedEncodingException
     * @throws ParseException
     * @author JiangQT
     */
    @RequestMapping("/queryAllServiceOrderList")
    @ResponseBody
    public Map<String, Object> queryAllServiceOrderList(HttpServletResponse response, TableList tableList1, Integer mode) throws ParseException {

        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_id(AppUtil.getCookieEmployee().getEm_id());
        userCenterEmployee = employeeService.selectUserCenterEmployeeInfo(userCenterEmployee);

        // 初始化获取对象
        TableList tableList = tableList1.initData(tableList1);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

        PageModel<ViewBusinessDeclarationVo> pageModel1 = new PageModel<ViewBusinessDeclarationVo>();

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

        ViewBusinessDeclarationVo businessDeclarationVo = new ViewBusinessDeclarationVo();
        businessDeclarationVo.setEm_id(AppUtil.getCookieEmployee().getEm_id());
        businessDeclarationVo.setIsService(userCenterEmployee.getUcc_name().contains("客服部") ? 1 : 0);
        pageModel1.setT(businessDeclarationVo);

        if (mode != null) {
            switch (mode) {
                case 1:
                    pageModel1.setSqlWhere(pageModel1.getSqlWhere()
                            + " and (md_state='未受理' or mdg_state='未接订单' or mdg_state='服务出错' or mdg_state='完成订单') ");
                    break;
                case 2:
                    pageModel1.setSqlWhere(pageModel1.getSqlWhere() + " and ( mdg_state='未接订单' or mdg_state='已接订单')");
                    break;
                case 3:
                    pageModel1.setSqlWhere(pageModel1.getSqlWhere() + " and mdg_state='等待回访'");
                    break;
                default:
                    break;
            }
        }
        // 装载数据类
        DataList<ViewBusinessDeclarationVo> datalist = new DataList<ViewBusinessDeclarationVo>();
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        pageModel1.setPageNo((tableList.getPageNo() - 1) * pageSize);
        // 分页设置查询条数
        pageModel1.setPageSize(pageSize);
        // 查询分页实体
        PageModel<ViewBusinessDeclarationVo> pageModel = serviceService.queryServiceOrderList(pageModel1);
        // 处理特殊数据
//        List<ViewBusinessDeclarationVo> list = new ArrayList<ViewBusinessDeclarationVo>();
//        for (ViewBusinessDeclarationVo viewBusinessDeclarationVo : pageModel.getList()) {
//            viewBusinessDeclarationVo.setMd_contactPhone("/" + viewBusinessDeclarationVo.getMd_contactPhone());
//            if (viewBusinessDeclarationVo.getHouse_address() == null) {
//                viewBusinessDeclarationVo.setHouse_address(viewBusinessDeclarationVo.getMd_address());
//            }
//            list.add(viewBusinessDeclarationVo);
//        }
        // 装载数据
        return datalist.dataList(pageModel.getList(), tableList.getPageNo(), pageSize, pageModel.getTotalRecords(), pageModel.getSumMoney());
    }

    /**
     * 查询服务预约
     *
     * @param tableList1
     * @return
     * @throws UnsupportedEncodingException
     * @throws ParseException
     * @author 王孝元
     */
    @RequestMapping("/queryServiceOrderList")
    @ResponseBody
    public Map<String, Object> queryServiceOrderList(TableList tableList1)
            throws UnsupportedEncodingException, ParseException {

        // 初始化获取对象
        TableList tableList = tableList1.initData(tableList1);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        PageModel<ServiceOrder> pageModel1 = new PageModel<ServiceOrder>();
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
        DataList<ServiceOrder> datalist = new DataList<ServiceOrder>();
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        pageModel1.setPageNo((tableList.getPageNo() - 1) * pageSize);
        // 分页设置查询条数
        pageModel1.setPageSize(pageSize);
        // 查询分页实体
        PageModel<ServiceOrder> pageModel = serviceOrderService.queryServiceOrderList(pageModel1);
        // 装载数据
        return datalist.dataList(pageModel.getList(), tableList.getPageNo(), pageSize, pageModel.getTotalRecords(), pageModel.getSumMoney());
    }

    /**
     * 受理人
     *
     * @return
     * @author 陈智颖
     * @date Feb 27, 2017 5:42:19 PM
     */
    @RequestMapping("/acceptancePeople")
    @ResponseBody
    public Map<String, Object> acceptancePeople() {
        Map<String, Object> map = new HashMap<>();
//        List<UserCenterEmployee> userCenterEmployeeList = employeeService.selectEmployeeByPosition(AppConfig.EMPLOYEE_POSITION_FWB);
//        for (UserCenterEmployee userCenterEmployee : userCenterEmployeeList) {
//            serveService.selectServicePersonWorkStateByEmId(userCenterEmployee.getEm_id());
//            /*
//             * if (boo) { userCenterEmployee.setWorkState("忙碌中"); } else {
//			 */
//            userCenterEmployee.setWorkState("空闲中");
//            /* } */
//        }
//        json.put("positionList", userCenterEmployeeList);
        List<ViewBusinessDeclarationVo> customerServiceState = serviceService.queryCustomerServiceState();
        map.put("customerServiceState", customerServiceState);
        return map;
    }

    /**
     * 跳转到受理页面:jumpAcceptService
     *
     * @param id
     * @param request
     * @return
     * @author JiangQT
     */
    @RequestMapping("jumpAcceptService")
    @ResponseBody
    public Map<String, Object> acceptService(Integer id, HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();
        if (StringUtils.isEmpty(id)) {
            map.put("message", "error");
            return map;
        }
        ViewBusinessDeclarationVo declaration = serviceService.selectDeclarationAllById(id);
        if (declaration != null) {
            String state = declaration.getMd_state();
            // 服务状态--未受理
            if (AppConfig.SERVICE_STATE_NO.equals(state)) {
                List<MaintenanceImage> imageList = serviceService.selectMaintenanceImage(declaration.getMd_id());
                map.put("imageList", imageList);
                map.put("declaration", declaration);
                List<UserCenterEmployee> userCenterEmployeeList = employeeService.selectEmployeeByPosition(AppConfig.EMPLOYEE_POSITION_FWB);
                for (UserCenterEmployee userCenterEmployee: userCenterEmployeeList) {
                    serviceService.selectServicePersonWorkStateByEmId(userCenterEmployee.getEm_id());
                    /*
                     * if (boo) { userCenterEmployee.setWorkState("忙碌中"); } else
                     * {
                     */
                    userCenterEmployee.setWorkState("空闲中");
                    /* } */
                }
                map.put("positionList", "userCenterEmployeeList");
                return map;
            }
            // 服务状态--已受理
            if (AppConfig.SERVICE_STATE_COMPLETE.equals(state)) {
                MaintenanceOrder orderVo = handleService.selectMaintenanceOrderByMdId(id);
                if (AppConfig.SERVICE_PROC_1.equals(orderVo.getMo_state())) {
                    request.setAttribute("state", 1);
                }
                if (AppConfig.SERVICE_PROC_2.equals(orderVo.getMo_state())) {
                    request.setAttribute("state", 2);
                }
                if (AppConfig.SERVICE_PROC_3.equals(orderVo.getMo_state())) {
                    request.setAttribute("state", 3);
                }
                if (AppConfig.SERVICE_PROC_4.equals(orderVo.getMo_state())) {
                    request.setAttribute("state", 4);
                }

                BillClearBill billClearBill = new BillClearBill();
                billClearBill.setCb_code(declaration.getBco_code());
                billClearBill = billClearBillService.selectBillClearBill(billClearBill);
                declaration.setThereNum(new Integer(billClearBill.getSize()));
                // 服务申报信息
                map.put("declaration", declaration);
                // 服务派工订单信息
                MaintenanceDispatching dispatching = handleService.selectMaintenanceDispatching(declaration.getMd_id());
                map.put("dispatching", dispatching);
                // 图片描述
                List<MaintenanceImage> imageList = serviceService.selectMaintenanceImage(declaration.getMd_id());
                map.put("imageList", imageList);
                // 服务派工人员信息
                UserCenterEmployee employee = employeeService.selectEmployeeById(dispatching.getEm_id());
                map.put("employee", employee);
                // 服务订单流程信息
                List<MaintenanceOrder> orderVoList = handleService.selectMaintenanceOrderListByMdId(declaration.getMd_id());
                map.put("orderVoList", orderVoList);
                return map;
            }
            // 服务状态--终止受理
            if (AppConfig.SERVICE_STATE_ERROR.equals(state)) {

            }
        }
        return map;
    }

    @RequestMapping("jumpAcceptServiceAPP")
    @ResponseBody
    public Map<String, Object> jumpAcceptServiceAPP(Integer id, HttpServletRequest request, HttpServletResponse response) {
        // 跨域传输json
        response.addHeader("Access-Control-Allow-Origin", "*");
        Map<String, Object> map = new HashMap<>();
        if (StringUtils.isEmpty(id)) {
            return null;
        }
        ViewBusinessDeclarationVo declaration = serviceService.selectDeclarationAllById(id);
        if (declaration != null) {
            String state = declaration.getMd_state();
            // 服务状态--未受理
            if (AppConfig.SERVICE_STATE_NO.equals(state)) {
                List<MaintenanceImage> imageList = serviceService.selectMaintenanceImage(declaration.getMd_id());
                map.put("imageList", imageList);
                map.put("declaration", declaration);
                List<UserCenterEmployee> userCenterEmployeeList = employeeService.selectEmployeeByPosition(AppConfig.EMPLOYEE_POSITION_FWB);
                for (UserCenterEmployee userCenterEmployee: userCenterEmployeeList) {
                    serviceService.selectServicePersonWorkStateByEmId(userCenterEmployee.getEm_id());
                    /*
                     * if (boo) { userCenterEmployee.setWorkState("忙碌中"); } else
                     * {
                     */
                    userCenterEmployee.setWorkState("空闲中");
                    /* } */
                }
                map.put("positionList", userCenterEmployeeList);
                return map;
            }
            // 服务状态--已受理
            if (AppConfig.SERVICE_STATE_COMPLETE.equals(state)) {
                MaintenanceOrder orderVo = handleService.selectMaintenanceOrderByMdId(id);
                if (AppConfig.SERVICE_PROC_1.equals(orderVo.getMo_state())) {
                    request.setAttribute("state", 1);
                }
                if (AppConfig.SERVICE_PROC_2.equals(orderVo.getMo_state())) {
                    request.setAttribute("state", 2);
                }
                if (AppConfig.SERVICE_PROC_3.equals(orderVo.getMo_state())) {
                    request.setAttribute("state", 3);
                }
                if (AppConfig.SERVICE_PROC_4.equals(orderVo.getMo_state())) {
                    request.setAttribute("state", 4);
                }
                BillClearBill billClearBill = new BillClearBill();
                billClearBill.setCb_code(declaration.getMd_clearOrder());
                billClearBill = billClearBillService.selectBillClearBill(billClearBill);
                declaration.setThereNum(new Integer(billClearBill.getSize()));
                // 保洁订单查询
                if (declaration.getMd_clearOrder() != null) {
                    BillClearOrder billClearOrder = new BillClearOrder();
                    billClearOrder.setBco_code(declaration.getMd_clearOrder());
                    billClearOrder = billClearOrderService.selectBillClearOrder(billClearOrder);
                    map.put("clearOrder", billClearOrder);
                }
                // 服务申报信息
                map.put("declaration", declaration);
                // 服务派工订单信息
                MaintenanceDispatching dispatching = handleService.selectMaintenanceDispatching(declaration.getMd_id());
                if (dispatching.getMdg_moneyCode() != null && !dispatching.getMdg_moneyCode().equals("")) {
                    ServiceMoney serviceMoney = new ServiceMoney();
                    serviceMoney.setMdg_moneyCode(dispatching.getMdg_moneyCode());
                    List<ServiceMoney> serviceMoneyList = serviceMoneyService.selectServiceMoney(serviceMoney);
                    map.put("serviceMoneyList", serviceMoneyList);
                }
                map.put("dispatching", dispatching);
                // 图片描述
                List<MaintenanceImage> imageList = serviceService.selectMaintenanceImage(declaration.getMd_id());
                map.put("imageList", imageList);
                // 服务派工人员信息
                UserCenterEmployee employee = employeeService.selectEmployeeById(dispatching.getEm_id());
                map.put("employee", employee);
                // 服务跟进信息
                MaintenanceTracks tracks = handleService.selectMaintenanceTracks(declaration.getMd_id());
                map.put("tracks", tracks);
                // 服务跟进图片说明
                List<MaintenancePicture> tracksImglist = handleService.selectMaintenancePicture(declaration.getMd_id());
                map.put("tracksImglist", tracksImglist);
                // 服务派工人员信息
                List<MaintenanceOrder> orderVoList = handleService.selectMaintenanceOrderListByMdId(declaration.getMd_id());
                map.put("orderVoList", orderVoList);
                // 服务评分
                UserCenterFraction userCenterUserFraction = new UserCenterFraction();
                userCenterUserFraction.setMd_id(declaration.getMd_id());
                userCenterUserFraction = fractionService.selectUserCenterUserFractiony(userCenterUserFraction);
                map.put("userCenterUserFraction", userCenterUserFraction);
                // 合同编号
                ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
                if (declaration.getMd_applyType().indexOf("房东") > 0) {
                    contractVo.setContractObject_Type("托管合同");
                    contractVo.setHi_code(declaration.getHi_code());
                    contractVo = contractService.selectContractObjectPeople(contractVo);
                } else if (declaration.getMd_applyType().indexOf("租客") > 0) {
                    contractVo.setContractObject_Type("租赁合同");
                    contractVo.setHi_code(declaration.getHi_code());
                    contractVo = contractService.selectContractObjectPeople(contractVo);
                } else if (declaration.getMd_applyType().equals("租前服务(管家婆)")) {
                    contractVo.setContractObject_No("");
                }

                map.put("contractVo", contractVo);

                return map;
            }
            // 服务状态--终止受理
            if (AppConfig.SERVICE_STATE_ERROR.equals(state)) {

            }
        }
        return null;
    }

    /* ===================服务处理END======================== */

    /**
     * 上传申请服务图片描述
     *
     * @param request
     * @return
     * @throws Exception
     * @author JiangQT
     */
    @RequestMapping("AddFileUpload")
    @ResponseBody
    public String AddFileUpload(MultipartHttpServletRequest request) throws Exception {
        Msg<List<String>> msg = new Msg<List<String>>();
        Object session = AppUtil.getCookieEmployee();
        if (StringUtils.isEmpty(session)) {
            msg.setCode(110);
            msg.setMsg("登录认证过期，请重新登录");
            return msg.toString();
        }
        PathPropertiesHelper pph = new PathPropertiesHelper(this.getClass());
        String path = pph.getProperty("desc_realPath");
        String realPath = request.getSession().getServletContext().getRealPath(path);
        Map<String, MultipartFile> fileMap = request.getFileMap();
        List<String> list = new ArrayList<String>();
        int count = 0;
        for (Entry<String, MultipartFile> entity: fileMap.entrySet()) {
            if (count > 5) {
                break;
            }
            MultipartFile file = entity.getValue();
            if (!file.isEmpty()) {
                if (file.getSize() > 1000 * 1024 * 4) {
                    msg.setCode(110);
                    msg.setMsg("图片大小不得超过4M");
                    return msg.toString();// 图片大小不得超过4M
                }
                try {
                    File upFile = new File(realPath);
                    /* 根据真实路径创建目录 */
                    if (!upFile.exists()) {
                        upFile.mkdirs();
                    }
                    String filename = file.getOriginalFilename();
                    filename = filename.substring(filename.lastIndexOf("."));
                    // 拼接图片链接
                    StringBuilder sb = new StringBuilder();
                    sb.append("/SERVICE_DESC_");
                    UserCenterEmployee employee = (UserCenterEmployee) session;
                    sb.append(Base64.getBase64(String.valueOf(employee.getEm_id())).replaceAll("=", "0")).append("");
                    sb.append(new Date().getTime());
                    sb.append(filename);
                    String fileName = sb.toString();
                    File file2 = new File(realPath + sb.toString());
                    file.transferTo(file2);

                    String imagePath = pph.getProperty("descImagesPaths");
                    String paths = pph.getProperty("desc_path");
                    String addrs = pph.getProperty("addr");
                    int ports = Integer.parseInt(pph.getProperty("port"));
                    String usernames = pph.getProperty("username");
                    String passwords = pph.getProperty("password");
                    String locals = request.getSession().getServletContext().getRealPath(path) + fileName;

                    boolean boo = URLUploadImage.run(paths, addrs, ports, usernames, passwords, locals);
                    if (boo) {
                        File file3 = new File(locals);
                        file3.delete();
                    }
                    String imgUrl = (imagePath + fileName);
                    list.add(imgUrl);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else {
                msg.setCode(110);
                msg.setMsg("参数为空");
                return msg.toString();
            }
            count += 1;
        }
        msg.setData(list);
        return msg.toString();
    }

    /**
     * 上传申请服务图片描述
     *
     * @param request
     * @return
     * @throws Exception
     * @author JiangQT
     */
    @RequestMapping("fileUpload")
    @ResponseBody
    public String AddFileUploads(MultipartHttpServletRequest request) throws Exception {
        Msg<List<String>> msg = new Msg<>();
        Object session = AppUtil.getCookieEmployee();
        if (StringUtils.isEmpty(session)) {
            msg.setCode(110);
            msg.setMsg("登录认证过期，请重新登录");
            return msg.toString();
        }
        PathPropertiesHelper pph = new PathPropertiesHelper(this.getClass());
        String path = pph.getProperty("desc_realPath");
        String realPath = request.getSession().getServletContext().getRealPath(path);
        Map<String, MultipartFile> fileMap = request.getFileMap();
        List<String> list = new ArrayList<>();
        int count = 0;
        for (Entry<String, MultipartFile> entity: fileMap.entrySet()) {
            if (count > 5) {
                break;
            }
            MultipartFile file = entity.getValue();
            if (!file.isEmpty()) {
                if (file.getSize() > 1000 * 1024 * 4) {
                    msg.setCode(110);
                    msg.setMsg("图片大小不得超过4M");
                    return msg.toString();// 图片大小不得超过4M
                }
                try {
                    File upFile = new File(realPath);
                    /** 根据真实路径创建目录 **/
                    if (!upFile.exists()) {
                        upFile.mkdirs();
                    }
                    String filename = file.getOriginalFilename();
                    filename = filename.substring(filename.lastIndexOf("."));
                    // 拼接图片链接
                    StringBuilder sb = new StringBuilder();
                    sb.append("/SERVICE_OK_");
                    UserCenterEmployee employee = (UserCenterEmployee) session;
                    sb.append(Base64.getBase64(String.valueOf(employee.getEm_id())).replaceAll("=", "0")).append("");
                    sb.append(new Date().getTime());
                    sb.append(filename);
                    String fileName = sb.toString();
                    File file2 = new File(realPath + sb.toString());
                    file.transferTo(file2);

                    String imagePath = pph.getProperty("descImagesPaths");
                    String paths = pph.getProperty("desc_path");
                    String addrs = pph.getProperty("addr");
                    int ports = Integer.parseInt(pph.getProperty("port"));
                    String usernames = pph.getProperty("username");
                    String passwords = pph.getProperty("password");
                    String locals = request.getSession().getServletContext().getRealPath(path) + fileName;

                    boolean boo = URLUploadImage.run(paths, addrs, ports, usernames, passwords, locals);
                    if (boo) {
                        File file3 = new File(locals);
                        file3.delete();
                    }
                    String imgUrl = (imagePath + fileName);
                    list.add(imgUrl);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else {
                msg.setCode(110);
                msg.setMsg("参数为空");
                return msg.toString();
            }
            count += 1;
        }
        msg.setData(list);
        return msg.toString();
    }

    /**
     * 删除服务图片描述
     *
     * @param df
     * @return
     * @throws IOException
     * @author JiangQT
     */
    @RequestMapping("AddDeleteImage")
    @ResponseBody
    public String AddDeleteImage(String df) {
        Msg<String> msg = new Msg<String>();
        if (!"".equals(df)) {
            PathPropertiesHelper pph = new PathPropertiesHelper(this.getClass());
            String paths = pph.getProperty("desc_path");
            String addrs = pph.getProperty("addr");
            int ports = Integer.parseInt(pph.getProperty("port"));
            String usernames = pph.getProperty("username");
            String passwords = pph.getProperty("password");
            // 本地路径
            boolean boo = URLUploadImage.delete2(paths, addrs, ports, usernames, passwords, df);
            if (!boo) {
                msg.setCode(110);
                msg.setMsg("删除失败");
                return msg.toString();
            }
        } else {
            msg.setCode(110);
            return msg.toString();
        }
        return msg.toString();
    }

    /**
     * 删除服务图片描述
     *
     * @param df
     * @return
     * @throws IOException
     * @author JiangQT
     */
    @RequestMapping("deleteImage")
    @ResponseBody
    public String deleteImage(String df) {
        Msg<String> msg = new Msg<>();
        if (!"".equals(df)) {
            PathPropertiesHelper pph = new PathPropertiesHelper(this.getClass());
            String paths = pph.getProperty("desc_path");
            String addrs = pph.getProperty("addr");
            int ports = Integer.parseInt(pph.getProperty("port"));
            String usernames = pph.getProperty("username");
            String passwords = pph.getProperty("password");
            // 本地路径
            boolean boo = URLUploadImage.delete2(paths, addrs, ports, usernames, passwords, df);
            if (!boo) {
                msg.setCode(110);
                msg.setMsg("删除失败");
                return msg.toString();
            }
        } else {
            msg.setCode(110);
            return msg.toString();
        }
        return msg.toString();
    }

    /**
     * 添加派工单
     *
     * @return
     */
    @RequestMapping("/addDispatching")
    @ResponseBody
    public Map<String, Object> addDispatching(Integer md_id, Integer em_id, String moneyListt, double mdg_money) {
        Map<String, Object> map = new HashMap<>();
        if (md_id == null || em_id == null) {
            map.put("msg", "参数错误");
            return map;
        }
        MaintenanceDeclaration declaration = serviceService.selectDeclarationById(md_id);
        if (declaration != null && AppUtil.null2Str(declaration.getMd_state()).equals("已受理")) {
            // 查询派工人员和当前登录人员
            UserCenterEmployee userCenterEmployee = employeeService.selectUserCenterEmployeeById(em_id);
            UserCenterEmployee employee = AppUtil.getCookieEmployee();

            MaintenanceDispatching dispatching = new MaintenanceDispatching();
            dispatching.setMd_id(md_id);
            dispatching = handleService.selectServiceState(dispatching);
            if (null == dispatching) {
                MaintenanceDispatching mdispatching = new MaintenanceDispatching();
                // 添加派工单
                mdispatching.setMd_id(md_id);
                mdispatching.setEm_id(em_id);
                mdispatching.setMdg_time(new Date());
                mdispatching.setMdg_state(AppConfig.MDG_STATE1);
                serviceService.addDispatching(mdispatching);
            } else {
                dispatching.setEm_id(em_id);
                dispatching.setMdg_state(AppConfig.MDG_STATE1);
                serviceService.updateFollowUp(dispatching);
            }

            if (!StringUtils.isEmpty(moneyListt) && moneyListt.contains("-")) {
                // 保存录入的费用
                ServiceMoney serviceMoney = new ServiceMoney();
                serviceMoney.setMd_id(md_id);
                serviceMoney.setMdg_moneyCode(AppUtil.getOrderCode("250"));
                String moneyString = moneyListt.split(";")[0];
                String[] moneyObj = moneyString.split("-");
                serviceMoney.setSsm_source(moneyObj[2]);
                serviceMoney.setSsm_univalent(Double.valueOf(moneyObj[3]));
                serviceMoney.setSsm_num(1);
                serviceMoney.setSsm_money(Double.valueOf(moneyObj[3]));
                serviceMoney.setSsm_company("元");
                serviceMoney.setPayObject(1);// 客户
                if (moneyObj[1].startsWith("CUS")) {
                    serviceMoney.setCc_code(moneyObj[1]);
                } else {
                    serviceMoney.setUser_id(Integer.valueOf(moneyObj[1]));
                }

                serviceMoneyService.addServiceMoney(serviceMoney);
            }

            // 添加订单流程
            MaintenanceOrder orders = new MaintenanceOrder();
            orders.setMd_id(md_id);
            orders.setMo_date(new Date());
            orders.setMo_state(AppConfig.SERVICE_PROC_1);
            orders.setMo_step(1);
            orders.setMo_content("服务派单");
            serviceService.addOrder(orders);
            // 修改维修申请状态
            int startResult = serviceService.updataStart(md_id);
            if (startResult <= 0) {
                map.put("msg", "提交失败");
                return map;
            }
            MaintenanceTracks maintenanceTracks = new MaintenanceTracks();
            maintenanceTracks.setMd_id(md_id);
            maintenanceTracks.setEm_id(em_id);
            maintenanceTracks.setMtk_state("no");
            maintenanceTracks.setAppoint_id(AppUtil.getCookieEmployee().getEm_id());
            maintenanceTracks.setAppoint_time(new Date());
            maintenanceTracks.setMtk_updataTime(new Date());
            handleService.addTracks(maintenanceTracks);

            // 插入消息提醒
            UserCenterEmployee employee2 = employeeService.selectEmployeeById(em_id);
            map.put("employee", employee2);
            map.put("msg", "success");

            if (mdg_money >= 0) {

                declaration.setMdg_money(mdg_money);
                serviceService.updateMaintenanceDeclartion(declaration);
            }
        } else {
            map.put("msg", "订单状态错误");
        }
        return map;
    }

    /**
     * 查询XML的消息提醒
     *
     * @param request
     * @return
     * @author 陈智颖
     */
    @RequestMapping("sendMessageContent")
    @ResponseBody
    public Map<String, Object> sendMessageContent(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<>();
        // 根目录路径
        String path = request.getSession().getServletContext().getRealPath("/");
        UserMessageContent userMessageContent = new UserMessageContent();
        List<UserMessageContent> userMessageContents = new ArrayList<UserMessageContent>();
        List<UserMessageContent> xmltoClassTable = XmlClass.xmltoClass(path, "message.xml", userMessageContent);
        if (xmltoClassTable != null) {
            for (UserMessageContent userMessageContent2: xmltoClassTable) {
                userMessageContents.add(userMessageContent2);
            }
            map.put("userMessageContents", userMessageContents);
            return map;
        }
        map.put("data", "0");
        return map;
    }

    /**
     * 点击消息提醒删除XML的那个字段
     *
     * @param request
     * @return
     * @author 陈智颖
     */
    @RequestMapping("sendMessageDelete")
    @ResponseBody
    public String sendMessageDelete(HttpServletRequest request, Integer umc_id) {

        // 根目录路径
        String path = request.getSession().getServletContext().getRealPath("/");
        List<Object> userMessageContents = new ArrayList<Object>();
        UserMessageContent userMessageContent = new UserMessageContent();
        List<UserMessageContent> xmltoClass = XmlClass.xmltoClass(path, "message.xml", userMessageContent);
        if (xmltoClass.size() == 1) {
            path = path + "resources/xml";
            File file = new File(path, "message.xml");
            file.delete();
            return "1";
        } else {
            for (UserMessageContent userMessageContent2: xmltoClass) {
                if (!userMessageContent2.getUmc_id().equals(umc_id)) {
                    userMessageContents.add(userMessageContent2);
                }
            }
            XmlClass.classtoXml(path, userMessageContents, "message.xml", userMessageContent);
            return "1";
        }
    }

    /**
     * 初始化服务人员状态：initPersonState
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping("initPersonState")
    @ResponseBody
    public String initPersonState(Integer em_id) {
        Msg<List<ViewServicePersonStateListVo>> msg = new Msg<List<ViewServicePersonStateListVo>>();
        if (StringUtils.isEmpty(em_id)) {
            msg.setCode(110);
            return msg.toString();
        }
        ViewServicePersonStateListVo stateListVo = new ViewServicePersonStateListVo();
        stateListVo.setEm_id(em_id);
        List<ViewServicePersonStateListVo> stateListVos = serviceService.selectServicePersonStateList(stateListVo);
        msg.setData(stateListVos);
        return msg.toString();
    }

    /**
     * 查看服务订单:completeVisit
     *
     * @param md_id
     * @return
     * @author JiangQT
     */
    @RequestMapping("completeVisit")
    @ResponseBody
    public String completeVisit(Integer md_id, String ms_infoVerify, Integer ms_verifyState) {
        Msg<String> msg = new Msg<String>();
        msg.setData("/service/showListInfo?id=" + md_id);
        MaintenanceOrder orderVo = handleService.selectMaintenanceOrderByMdId(md_id);
        if (AppConfig.SERVICE_PROC_4.equals(orderVo.getMo_state())) {
            return msg.toString();
        }
        // 添加订单流程
        MaintenanceOrder orders = new MaintenanceOrder();
        orders.setMd_id(md_id);
        orders.setMo_date(new Date());
        orders.setMo_state(AppConfig.SERVICE_PROC_4);
        orders.setMo_step(4);
        orders.setMo_content("完成");
        serviceService.addOrder(orders);
        // 更新派工单
        MaintenanceDispatching maintenanceDispatching = new MaintenanceDispatching();
        maintenanceDispatching.setMd_id(md_id);
        maintenanceDispatching.setMdg_state(AppConfig.MDG_STATE4);
        handleService.updataMaintenanceDispatching(maintenanceDispatching);
        // 修改维修状态
        MaintenanceState maintenanceState = new MaintenanceState();
        maintenanceState.setMd_id(Integer.valueOf(md_id));
        maintenanceState.setMs_infoVerify(ms_infoVerify);
        maintenanceState.setMs_verifyState(Integer.valueOf(ms_verifyState));
        serviceService.updataMaintenanceState(maintenanceState);
        // 修改维修申报状态
        // serveService.updataDeclaration(md_id);
        return msg.toString();
    }

    /* ===========接收订单=E========== **/

    /**
     * 跳转服务接收订单：serviceBill
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/serviceBill")
    public String serviceBill(HttpServletRequest request, HttpServletResponse response) {
        List<ServiceMessage> serviceList = serviceService.selectServiceList();
        request.setAttribute("serviceList", serviceList);
        return "/service/serviceBill";
    }

    /**
     * 接取服务订单:acceptBill
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping("acceptBill")
    public ModelAndView acceptBill(Integer id) {
        if (StringUtils.isEmpty(id)) {
            return null;
        }
        MaintenanceOrder orderVo = handleService.selectMaintenanceOrderByMdId(id);
        ViewBusinessDeclarationVo declaration = serviceService.selectDeclarationAllById(id);
        ModelAndView view = new ModelAndView();
        // 服务流程--业务受理
        if (AppConfig.SERVICE_PROC_1.equals(orderVo.getMo_state())) {
            view.setViewName("/service/acceptBill");
            view.addObject("state", 1);
        }
        // 服务流程--业务处理
        if (AppConfig.SERVICE_PROC_2.equals(orderVo.getMo_state())) {
            if ("审核通过".equals(orderVo.getMo_content().substring(0, 4))) {
                view.setViewName("/service/acceptBill");
                view.addObject("state", 3);
            } else if ("审核未通过".equals(orderVo.getMo_content().substring(0, 5))) {
                view.setViewName("/service/acceptBill");
                view.addObject("state", 2);
            } else {
                if (declaration.getMd_type().indexOf("保洁") > 0) {
                    view.setViewName("/service/acceptBill");
                    view.addObject("state", 3);
                } else {
                    view.setViewName("/service/acceptBill");
                    view.addObject("state", 2);
                }

            }
        }

        // 服务流程--完成
        if (AppConfig.SERVICE_PROC_4.equals(orderVo.getMo_state())) {
            view.addObject("state", 4);
        }

        BillClearBill billClearBill = new BillClearBill();
        billClearBill.setCb_code(declaration.getBco_code());
        billClearBill = billClearBillService.selectBillClearBill(billClearBill);
        declaration.setThereNum(new Integer(billClearBill.getSize()));
        // 服务申报信息
        view.addObject("declaration", declaration);
        // 服务派工订单信息
        MaintenanceDispatching dispatching = handleService.selectMaintenanceDispatching(declaration.getMd_id());
        if (dispatching.getMdg_moneyCode() != null && !dispatching.getMdg_moneyCode().equals("")) {
            ServiceMoney serviceMoney = new ServiceMoney();
            serviceMoney.setMdg_moneyCode(dispatching.getMdg_moneyCode());
            List<ServiceMoney> serviceMoneyList = serviceMoneyService.selectServiceMoney(serviceMoney);
            view.addObject("serviceMoneyList", serviceMoneyList);
        }
        view.addObject("dispatching", dispatching);
        // 图片描述
        List<MaintenanceImage> imageList = serviceService.selectMaintenanceImage(declaration.getMd_id());
        view.addObject("imageList", imageList);
        // 服务派工人员信息
        UserCenterEmployee employee = employeeService.selectEmployeeById(dispatching.getEm_id());
        view.addObject("employee", employee);
        // 服务派工人员信息
        List<MaintenanceOrder> orderVoList = handleService.selectMaintenanceOrderListByMdId(declaration.getMd_id());
        view.addObject("orderVoList", orderVoList);
        return view;
    }

    /**
     * 查询是否是本人受理
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/TrackState")
    @ResponseBody
    public String TrackState(Integer md_id, Boolean bool) {
        Msg<String> msg = new Msg<String>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        ViewBusinessDeclarationVo viewBusinessDeclarationVo = new ViewBusinessDeclarationVo();
        viewBusinessDeclarationVo.setMd_id(md_id);
        ViewBusinessDeclarationVo viewBusinessDeclarationVos = serviceService.selectBusinessDeclarationWhere(viewBusinessDeclarationVo);
        if (employee == null) {
            msg.setCode(110);
            msg.setMsg("登录信息失效，请重新登录");
            return msg.toString();
        }
        if (StringUtils.isEmpty(viewBusinessDeclarationVos.getEm_id())) {
            msg.setCode(110);
            msg.setMsg("参数错误");
            return msg.toString();
        }
        if (!bool && !viewBusinessDeclarationVos.getEm_id().equals(employee.getEm_id())) {
            msg.setCode(110);
            msg.setMsg("您不能接取别人的订单");
            return msg.toString();
        }
        msg.setMsg("1");
        return msg.toString();
    }

    /**
     * 接单/跟进
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/addTracks")
    @ResponseBody
    public String addTracks(MaintenanceTracks maintenanceTracks, HttpServletRequest request, HttpServletResponse response, Integer em_id, String openTime, String endTime,
                            String[] imgs, Double mdg_sumMoney, String account, String name, String phone, boolean is_enter) {
        Msg<String> msg = new Msg<>();
        // 跨域传输json
        response.addHeader("Access-Control-Allow-Origin", "*");
        UserCenterEmployee employee = new UserCenterEmployee();
        employee.setEm_id(em_id);
        employee = employeeService.selectAccount(employee).get(0);

        if (employee == null) {
            msg.setCode(110);
            msg.setMsg("登录信息失效，请重新登录");
            return msg.toString();
        }
        if (StringUtils.isEmpty(em_id)) {
            msg.setCode(110);
            msg.setMsg("参数错误");
            return msg.toString();
        }
        if (!StringUtils.isEmpty(openTime)) {
            maintenanceTracks.setMtk_start_time(DataUtil.StrToDate(openTime));
        }
        if (!StringUtils.isEmpty(endTime)) {
            maintenanceTracks.setMtk_end_time(DataUtil.StrToDate(endTime));
        }
        int tracksResult = 0;
        maintenanceTracks.setEm_id(employee.getEm_id());

        MaintenanceDeclaration declarations = serviceService.selectDeclarationById(maintenanceTracks.getMd_id());
        // 服务中
        if ("no".equals(maintenanceTracks.getMtk_state())) {
            // 添加服务进度
            maintenanceTracks.setMtk_createTime(new Date());
            maintenanceTracks.setMtk_state("get");
            handleService.updataTracks(maintenanceTracks);
            // 记录订单状况
            MaintenanceOrder order = new MaintenanceOrder();
            order.setMd_id(maintenanceTracks.getMd_id());
            order.setMo_date(new Date());
            order.setMo_state(AppConfig.SERVICE_PROC_2);
            order.setMo_step(2);
            order.setMo_content("服务接单<br>接单人员：" + employee.getEm_name() + "，联系电话：" + employee.getEm_phone());
            serviceService.addOrder(order);
            // 更新派单信息
            MaintenanceDispatching maintenanceDispatching = new MaintenanceDispatching();
            maintenanceDispatching.setMd_id(maintenanceTracks.getMd_id());
            maintenanceDispatching.setMdg_state(AppConfig.MDG_STATE2);
            handleService.updataMaintenanceDispatching(maintenanceDispatching);
            msg.put("content", "接单人员：" + employee.getEm_name() + "已接订单" + declarations.getMd_problem() + "(" + declarations.getHouse_address() + ")");
            msg.put("md_id", maintenanceTracks.getMd_id());
        }
        if ("loading".equals(maintenanceTracks.getMtk_state())) {
            maintenanceTracks.setMtk_state("start");
            handleService.updataTracks(maintenanceTracks);
            // 更新派单信息
            MaintenanceDispatching maintenanceDispatching = new MaintenanceDispatching();
            maintenanceDispatching.setMd_id(maintenanceTracks.getMd_id());
            maintenanceDispatching.setMdg_state(AppConfig.MDG_STATE6);
            handleService.updataMaintenanceDispatching(maintenanceDispatching);
            msg.put("content", "接单人员：" + employee.getEm_name() + "开始处理订单" + declarations.getMd_problem() + "(" + declarations.getHouse_address() + ")");
            msg.put("md_id", maintenanceTracks.getMd_id());
        }
        // 服务完毕
        if ("yes".equals(maintenanceTracks.getMtk_state())) {
            // 更新服务进度
            maintenanceTracks.setMtk_real_time(new Date());
            maintenanceTracks.setMtk_state("stop");
            handleService.updataTracks(maintenanceTracks);
            // 记录订单状况
           /* MaintenanceOrder order = new MaintenanceOrder();
            order.setMd_id(maintenanceTracks.getMd_id());
            order.setMo_date(new Date());
            order.setMo_state(AppConfig.SERVICE_PROC_3);
            order.setMo_step(3);
            order.setMo_content("服务完成");
            serveService.addOrder(order);*/
//
            // 更新服务进度
            maintenanceTracks.setMtk_real_time(new Date());
            maintenanceTracks.setMtk_state("stop");
            handleService.updataTracks(maintenanceTracks);
            // 除了维修以外其他更改次数
            ViewBusinessDeclarationVo declaration = serviceService.selectDeclarationAllById(maintenanceTracks.getMd_id());

            MaintenanceDispatching maintenanceDispatching = new MaintenanceDispatching();
            maintenanceDispatching.setMd_id(maintenanceTracks.getMd_id());

            String number = "";
            if (StringUtils.isEmpty(declaration.getMdg_moneyCode())) {
                Random random = new Random();
                Integer rd = random.nextInt(9999 - 1000 + 1) + 1000;
                number = "250" + (new Date()).getTime() + rd.toString();
            } else {
                number = declaration.getMdg_moneyCode();
            }
            serviceMoneyService.delServiceMoneyByCode(number);
            if (maintenanceTracks.getMoneyList() != null) {
                String[] moneyLists = maintenanceTracks.getMoneyList().split(";");
                List<ServiceMoney> serviceMoneyList = new ArrayList<>();
                for (int i = 0; i < moneyLists.length; i++) {
                    String[] moneyList = moneyLists[i].split("-");
                    ServiceMoney serviceMoney = new ServiceMoney();
                    serviceMoney.setMdg_moneyCode(number);
                    serviceMoney.setSsm_source(moneyList[0]);
                    serviceMoney.setSsm_univalent(new Double(moneyList[1]));
                    serviceMoney.setSsm_num(new Integer(moneyList[2]));
                    serviceMoney.setSsm_company(moneyList[3]);
                    serviceMoney.setSsm_money(new Double(moneyList[4]));
                    serviceMoney.setSsm_date(new Date());
                    if (moneyList.length == 6) {
                        serviceMoney.setSsm_beizhu(moneyList[5]);
                    }
                    serviceMoneyList.add(serviceMoney);
                    serviceMoneyService.addServiceMoney(serviceMoney);
                }

                declarations.setMdg_moneyCode(number);
//                serveService.updateDeclaration(declarations);
            } else {
                maintenanceDispatching.setMdg_content(maintenanceTracks.getMtk_spe_cir());
            }
            maintenanceDispatching.setMdg_sumMoney(mdg_sumMoney);
            maintenanceDispatching.setMdg_moneyCode(number);

            // 添加图片
            if (imgs != null) {
                for (String str: imgs) {
                    MaintenancePicture maintenancePicture = new MaintenancePicture();
                    maintenancePicture.setMd_id(maintenanceTracks.getMd_id());
                    maintenancePicture.setMpe_path(str);
                    handleService.addMaintenancePicture(maintenancePicture);
                }
            }
            msg.put("content", "接单人员：" + employee.getEm_name() + "处理完成" + declarations.getMd_problem() + "(" + declarations.getHouse_address() + ")");
            msg.put("md_id", maintenanceTracks.getMd_id());

            // 更新派单信息
           /* maintenanceDispatching.setMd_id(maintenanceTracks.getMd_id());
            maintenanceDispatching.setMdg_state(AppConfig.MDG_STATE7);
            handleService.updataMaintenanceDispatching(maintenanceDispatching);*/
        }
        if ("error".equals(maintenanceTracks.getMtk_state())) {
            // 更新服务进度
            maintenanceTracks.setMtk_real_time(new Date());
            handleService.updataTracks(maintenanceTracks);
            // 添加图片
            if (imgs != null) {
                for (String str: imgs) {
                    MaintenancePicture maintenancePicture = new MaintenancePicture();
                    maintenancePicture.setMd_id(maintenanceTracks.getMd_id());
                    maintenancePicture.setMpe_type("fault");
                    maintenancePicture.setMpe_path(str);
                    handleService.addMaintenancePicture(maintenancePicture);
                }
            }
            // 更新派单信息
            MaintenanceDispatching maintenanceDispatching = new MaintenanceDispatching();
            maintenanceDispatching.setMd_id(maintenanceTracks.getMd_id());
            maintenanceDispatching.setMdg_state(AppConfig.MDG_STATE5);
            tracksResult = handleService.updataMaintenanceDispatching(maintenanceDispatching);
        }

        /*if (tracksResult < 1) {
            msg.setCode(110);
            msg.setMsg("接单失败");
            return msg.toString();
        } else {
            if (!"no".equals(maintenanceTracks.getMtk_state())) {
                // 插入消息提醒
                UserMessageContent userMessageContent = new UserMessageContent();
                UserCenterEmployee selectEmployeeBy = new UserCenterEmployee();
                selectEmployeeBy.setEm_id(em_id);
                List<UserCenterEmployee> selectEmployeeTable = employeeService.selectUserCenterEmployeeZG(selectEmployeeBy);
                for (UserCenterEmployee userCenterEmployee : selectEmployeeTable) {
                    if ("auditing".equals(maintenanceTracks.getMtk_state())) {
                        userMessageContent.setUmc_name("服务处理");
                        userMessageContent.setUmc_content(userCenterEmployee.getEm_name() + "你需要审核一个服务订单");
                        userMessageContent.setUmc_href("/service/service");
                    } else {
                        userMessageContent.setUmc_name("客户回访");
                        userMessageContent.setUmc_content(userCenterEmployee.getEm_name() + "你需要评价一个服务订单");
                        userMessageContent.setUmc_href("/service/serviceVisit");
                        msg.setMsg("yes");
                    }
                    userMessageContent.setUmc_account(userCenterEmployee.getEm_account());
                    userMessageContent.setEm_id(userCenterEmployee.getEm_id());
                    userMessageContent.setUmc_bool(0);
                    Integer bool = contentService.addUserMessageContent(userMessageContent);

                    if (bool.intValue() > 0){
                        // 根目录路径
                        String path = request.getSession().getServletContext().getRealPath("/");
                        List<Object> userMessageContents = new ArrayList<Object>();
                        userMessageContents.add(userMessageContent);
                        List<UserMessageContent> xmltoClass = XmlClass.xmltoClass(path, "message.xml", userMessageContent);
                        if (xmltoClass == null) {
                            XmlClass.classtoXml(path, userMessageContents, "message.xml", userMessageContent);
                        } else {
                            for (UserMessageContent userMessageContent2 : xmltoClass) {
                                userMessageContents.add(userMessageContent2);
                            }
                            XmlClass.classtoXml(path, userMessageContents, "message.xml", userMessageContent);
                        }
                    }
                }
            } else {
                msg.setMsg("true");
            }
        }*/
        msg.setMsg("true");
        return msg.toString();
    }

    /**
     * 客户回访：serviceBill
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/serviceVisit")
    public String serviceVisit(HttpServletRequest request, HttpServletResponse response) {
        return "/service/serviceVisit";
    }

    /**
     * 客户回访-服务评价：serviceBill
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/visitService")
    public String visitService(Integer id, HttpServletRequest request, HttpServletResponse response) {
        ViewBusinessDeclarationVo declaration = serviceService.selectDeclarationAllById(id);

        // 服务派工人员信息
        UserCenterEmployee employee = employeeService.selectEmployeeById(declaration.getEm_id());
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        if (declaration.getMd_applyType().equals("租前服务(房东)")) {
            contractVo.setContractObject_Type("托管合同");
        } else if (declaration.getMd_applyType().equals("租前服务(租客)")) {
            contractVo.setContractObject_Type("租赁合同");
        }
        contractVo.setHi_code(declaration.getHi_code());
        contractVo = contractService.selectContractObjectPeople(contractVo);
        request.setAttribute("contractVo", contractVo);
        request.setAttribute("employee", employee);
        request.setAttribute("declaration", declaration);
        return "/service/visitService";
    }

    /**
     * 上传服务评价图片
     *
     * @param request
     * @param response
     * @param type
     * @param type
     * @return
     * @throws Exception
     * @author JiangQT
     */
    @RequestMapping("fileUploadService")
    @ResponseBody
    public String fileUploadService(MultipartHttpServletRequest request, ServletResponse response, String type) throws Exception {
        Msg<String> msg = new Msg<String>();
        UserCenterEmployee sessionEmployee = AppUtil.getCookieEmployee();
        if (sessionEmployee == null) {
            msg.setCode(110);
            msg.setMsg("身份过期，请刷新页面");
            return msg.toString();
        }
        String realPath = request.getSession().getServletContext().getRealPath("/resources/serviceImage/");
        Map<String, MultipartFile> fileMap = request.getFileMap();
        for (Entry<String, MultipartFile> entity: fileMap.entrySet()) {
            MultipartFile file = entity.getValue();
            if (!file.isEmpty()) {
                if (file.getSize() > 1000 * 1024 * 20) {
                    msg.setCode(110);
                    msg.setMsg("图片大小不得超过20M");
                    return msg.toString();// 图片大小不得超过4M
                }
                try {
                    File upFile = new File(realPath);
                    /** 根据真实路径创建目录 **/
                    if (!upFile.exists()) {
                        upFile.mkdirs();
                    }
                    CommonsMultipartFile cf = (CommonsMultipartFile) file;
                    DiskFileItem fi = (DiskFileItem) cf.getFileItem();
                    File f = fi.getStoreLocation();
                    String filename = file.getOriginalFilename();
                    filename = filename.substring(filename.lastIndexOf("."));
                    // 拼接图片链接
                    StringBuilder sb = new StringBuilder();
                    sb.append("/" + type);
                    sb.append(Base64.getBase64(String.valueOf(sessionEmployee.getEm_id())).replaceAll("=", "0")).append("");
                    sb.append(new Date().getTime());
                    sb.append(filename.replace("png", "jpg"));
                    String fileName = sb.toString();
                    File file2 = new File(realPath + sb.toString());
                    if (file.getSize() <= 1000 * 100) {
                        file.transferTo(file2);
                    } else {
                        Thumbnails.of(f).scale(1f).outputQuality(0.25f).toFile(file2);
                    }
                    // 获取properties路劲
                    String path = this.getClass().getResource("/conf/path.properties").getPath();
                    // 把properties文件转化输出流
                    InputStream in = new BufferedInputStream(new FileInputStream(path));
                    Properties properties = new Properties();
                    properties.load(in);
                    //
                    String imagePath = properties.getProperty("serveImagePaths");
                    // 上传到ftp服务器哪个路径下
                    String paths = properties.getProperty("servepaths");
                    // 地址
                    String addrs = properties.getProperty("serveaddrs");
                    // 端口号
                    int ports = Integer.parseInt(properties.getProperty("serveports"));
                    // 用户名
                    String usernames = properties.getProperty("serveusernames");
                    // 密码
                    String passwords = properties.getProperty("servepasswords");
                    // 本地路径
                    String locals = request.getSession().getServletContext().getRealPath("") + "/resources/serviceImage" + fileName;

                    boolean boo = URLUploadImage.run(paths, addrs, ports, usernames, passwords, locals);
                    if (boo) {
                        File file3 = new File(locals);
                        file3.delete();
                    }
                    String imgUrl = (imagePath + fileName);
                    msg.setData(imgUrl);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else {
                msg.setCode(110);
                msg.setMsg("参数为空");
                return msg.toString();
            }
        }
        return msg.toString();
    }

    /**
     * 服务评分
     *
     * @param fraction       评分
     * @param contentMessage 评价内容
     * @param path           图片路劲
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/addVisit")
    @ResponseBody
    public Map<String, Object> addVisit(HttpServletResponse response, Integer fraction, String contentMessage, String feedback, String path, Integer md_id,
                                        Integer em_id, String account) {
        Map<String, Object> map = new HashMap<>();
        UserCenterEmployee employee = new UserCenterEmployee();
        if (account == null) {
            employee = AppUtil.getCookieEmployee();
        } else {
            employee.setEm_account(account);
            employee = employeeService.selectAccount(employee).get(0);
        }
        UserCenterFraction userCenterUserFraction = new UserCenterFraction();
        userCenterUserFraction.setUf_fraction(fraction);
        userCenterUserFraction.setUf_content(contentMessage);
        userCenterUserFraction.setFeedback(feedback);
        userCenterUserFraction.setUf_people(employee.getEm_name());
        if (!StringUtils.isEmpty(path)) {
            userCenterUserFraction.setUf_image(path);
        }
        userCenterUserFraction.setMd_id(md_id);
        userCenterUserFraction.setEm_id(em_id);

        MaintenanceDeclaration declaration = serviceService.selectDeclarationById(md_id);
        declaration.setMd_state("已完成");
        int re = serviceService.updateDeclaration(declaration);

        userCenterUserFraction.setUser_id(declaration.getUser_id());
        userCenterUserFraction.setCc_code(declaration.getCc_code());

        Integer bool = fractionService.addUserCenterUserFraction(userCenterUserFraction);

        // 更新派单信息
        MaintenanceDispatching maintenanceDispatching = new MaintenanceDispatching();
        maintenanceDispatching.setMd_id(md_id);
        maintenanceDispatching.setMdg_state(AppConfig.MDG_STATE4);
        handleService.updataMaintenanceDispatching(maintenanceDispatching);
        // 记录订单状况
        MaintenanceOrder order = new MaintenanceOrder();
        order.setMd_id(md_id);
        order.setMo_date(new Date());
        order.setMo_state(AppConfig.SERVICE_PROC_5);
        order.setMo_step(5);
        order.setMo_content("结束订单");
        serviceService.addOrder(order);
        if (bool > 0) {
//            MaintenanceDispatching dispatching = new MaintenanceDispatching();
//            dispatching = handleService.selectMaintenanceDispatching(md_id);

//            if (AppUtil.isNotNull(contractNo)) {
//                MaintenanceDispatching dispatching = new MaintenanceDispatching();
//                dispatching = handleService.selectMaintenanceDispatching(md_id);
                /*ServiceContractServiceChargeVo serviceChargeVo = new ServiceContractServiceChargeVo();
                serviceChargeVo.setContractObject_no(contractNo);
                serviceChargeVo = contractService.queryContractServiceCharge(serviceChargeVo);
                // 剩余费用
                double money = serviceChargeVo.getCsc_money();
                // 维修费用
                double sumMoney = dispatching.getMdg_sumMoney();
                double yongMoney = money - sumMoney;

                if (yongMoney > 0) {
                    serviceChargeVo.setCsc_money(yongMoney);
                    contractService.updateContractServiceCharge(serviceChargeVo);
                    dispatching.setMdg_sumMoney(0.00);
                    handleService.updataMaintenanceDispatching(dispatching);
                } else if (yongMoney == 0) {
                    serviceChargeVo.setCsc_money(0.00);
                    contractService.updateContractServiceCharge(serviceChargeVo);
                    dispatching.setMdg_sumMoney(0.00);
                    handleService.updataMaintenanceDispatching(dispatching);
                } else {
                    serviceChargeVo.setCsc_money(0.00);
                    contractService.updateContractServiceCharge(serviceChargeVo);
                    dispatching.setMdg_sumMoney(Math.abs(yongMoney));
                    handleService.updataMaintenanceDispatching(dispatching);
                }*/
//            }
            map.put("msg", "success");
            return map;
        }
        map.put("msg", "回访失败");
        return map;
    }

    /**
     * 跳转查询热点问题界面：hotSpot
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/hotSpot")
    public String hotSpot(HttpServletRequest request, HttpServletResponse response) {
        return "/service/hotSpot";
    }

    /* ===========热点问题=========== **/

    /**
     * 跳转修改热点问题界面<selectHotSpotById>：selectHotSpotById
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/selectHotSpotById")
    public String selectHotSpotById(HttpServletRequest request, HttpServletResponse response, String id) {
        int sip_id = Integer.parseInt(id);
        HotspotIssuesProblem hotspotIssuesProblem = serviceService.selectHotSpotById(sip_id);
        List<ServiceType> serviceTypeList = serviceService.selectServiceType();
        request.setAttribute("serviceTypeList", serviceTypeList);
        request.setAttribute("hotspotIssuesProblem", hotspotIssuesProblem);
        return "/service/updataHotSpot";
    }

    /**
     * 查询热点问题List<selectHotSpot>:selectHotSpot
     *
     * @param response
     * @return
     * @throws ParseException
     */
    @RequestMapping("/selectHotSpot")
    @ResponseBody
    public Map<String, Object> selectHotSpot(HttpServletResponse response, TableList tableList1) throws ParseException {
        // 初始化获取对象
        TableList tableList = tableList1.initData(tableList1);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

        PageModel<HotspotIssuesProblem> pageModel1 = new PageModel<HotspotIssuesProblem>();

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
        DataList<HotspotIssuesProblem> datalist = new DataList<HotspotIssuesProblem>();
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        pageModel1.setPageNo((tableList.getPageNo() - 1) * pageSize);
        // 分页设置查询条数
        pageModel1.setPageSize(pageSize);
        // 查询分页实体
        PageModel<HotspotIssuesProblem> pageModel = serviceService.selectHotSpot(pageModel1);
        // 装载数据
        Map<String, Object> map = datalist.dataList(pageModel.getList(), tableList.getPageNo(), pageSize, pageModel.getTotalRecords(), pageModel.getSumMoney());

        return map;
    }

    /**
     * 跳转添加热点问题界面<jumpAddHotSpot>：jumpAddHotSpot
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/jumpAddHotSpot")
    public String jumpAddHotSpot(HttpServletRequest request, HttpServletResponse response) {
        // 查询服务类型
        List<ServiceType> serviceTypeList = serviceService.selectServiceType();
        request.setAttribute("serviceTypeList", serviceTypeList);
        return "/service/addHotSpot";
    }

    /**
     * 添加热点问题<addHotSpot>:addHotSpot
     *
     * @param hotspotIssuesProblem
     * @param model
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/addHotSpot")
    public String addHotSpot(HotspotIssuesProblem hotspotIssuesProblem, Model model, HttpServletRequest request, HttpServletResponse response) {
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            request.setAttribute("error", "$.jBox.tip('登录信息过期，请重新登录');");
        } else {
            hotspotIssuesProblem.setSip_time(new Date());
            hotspotIssuesProblem.setSip_people(employee.getEm_name());
            int result = serviceService.addHotSpot(hotspotIssuesProblem);
            if (result != 0) {
                request.setAttribute("success", "$.jBox.tip('添加热点问题成功');");
            } else {
                request.setAttribute("error", "$.jBox.tip('添加热点问题失败');");
            }
        }
        return "/service/hotSpot";
    }

    /**
     * 上传图片：upload5
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/upload5")
    public void upload5(HttpServletRequest request, HttpServletResponse response, @RequestParam("file5") MultipartFile file, Integer st_id) throws Exception {

        Map<String, Object> map = new HashMap<>();
        ServiceType serviceType = serviceService.selectServiceTypeById(st_id);
        try {
            OSSparameter.removeFile(serviceType.getSt_logo());
        } catch (Exception e) {

        }

        String realPath = request.getSession().getServletContext().getRealPath("/resources/temp/");

        File outFile = new File(realPath + AppUtil.getOrderCode("IMAGE") + ".png");
        // 文件类型
        String fileType = "png";
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
                ImageUtil.saveMinPhoto(inFile.toString(), outFile.toString(), 1920, 0.8d);
            }
        } else {
            if (!outFile.exists()) {
                file.transferTo(outFile);
            }
        }
        OSSparameter.uploadFile(outFile, "serviceImage");

        ServiceType serviceType1 = new ServiceType();
        serviceType1.setSt_logo("serviceImage/" + outFile.getName());
        serviceType1.setSt_logoPath(OSSparameter.imagePath("serviceImage/" + outFile.getName(), 61, 61));

        outFile.delete();
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=utf-8");
        PrintWriter out = response.getWriter();
        out.print(JSONObject.toJSON(serviceType1).toString());
        out.flush();
        out.close();
    }

    /**
     * 手机上传图片事件
     *
     * @param request
     * @param response
     * @throws Exception
     */
    @RequestMapping("/appUpload")
    @ResponseBody
    public Map<String, Object> appUpload(HttpServletRequest request, HttpServletResponse response, @RequestParam("file") MultipartFile file) throws Exception {

        Map<String, Object> map = new HashMap<>();

        String savePath = request.getSession().getServletContext().getRealPath("/resources/image/");
        String FileName = null;
        if (!file.isEmpty()) {
            Date currTime = new Date();
            SimpleDateFormat formatter2 = new SimpleDateFormat("yyyyMMddhhmmssS", Locale.US);
            FileName = new String((formatter2.format(currTime)).getBytes("iso-8859-1"));
            String filename = file.getOriginalFilename();
            String filetype = filename.substring(filename.lastIndexOf("."));
            FileName = FileName + Randoms.randoms() + "" + filetype;
        }
        InputStream inputStream = file.getInputStream();
        OutputStream outputStream = new FileOutputStream(savePath + "/" + FileName);

        try {
            IOUtils.copy(inputStream, outputStream);
        } finally {
            IOUtils.closeQuietly(inputStream);
            IOUtils.closeQuietly(outputStream);
        }

        // 获取properties路劲
        String path = this.getClass().getResource("/conf/path.properties").getPath();
        // 把properties文件转化输出流
        InputStream in = new BufferedInputStream(new FileInputStream(path));
        Properties properties = new Properties();
        properties.load(in);
        //
        String imagePath = properties.getProperty("serviceImagePaths");
        // 上传到ftp服务器哪个路径下
        String paths = properties.getProperty("servicepaths");
        // 地址
        String addrs = properties.getProperty("serviceaddrs");
        // 端口号
        int ports = Integer.parseInt(properties.getProperty("serviceports"));
        // 用户名
        String usernames = properties.getProperty("serviceusernames");
        // 密码
        String passwords = properties.getProperty("servicepasswords");
        // 本地路径
        String locals = savePath + "/" + FileName;
        URLUploadImage.run(paths, addrs, ports, usernames, passwords, locals);

        new File(locals).delete();
        ImageUpload imageUpload = new ImageUpload();
        imageUpload.setCode("1");
        imageUpload.setPath(paths);
        map.put("imagePath", imagePath + "/" + FileName);

        return map;
    }

    /**
     * 跳转查询服务信息:serveMessage
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/serveMessage")
    public String serveType(HttpServletRequest request, HttpServletResponse response) {
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        request.setAttribute("employee", employee);
        List<ServiceMessage> serviceList = serviceService.selectServiceList();
        request.setAttribute("serviceList", serviceList);
        List<ServiceType> serviceType = serviceService.selectServiceType();
        request.setAttribute("serviceType", serviceType);
        return "/service/serveMessage";
    }

    /**
     * 添加服务子类型：addServiceSubType
     *
     * @return
     * @author JiangQT
     */
    @RequestMapping(value = "addServiceSubType")
    @ResponseBody
    public String addServiceSubType(Integer sm_id, String typeName, Integer parent_id) {
        Msg<ServiceType> msg = new Msg<ServiceType>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            msg.setCode(110);
            msg.setMsg("登录失效，请重新登录");
            return msg.toString();
        }
        if (StringUtils.isEmpty(typeName)) {
            msg.setCode(110);
            msg.setMsg("参数错误");
            return msg.toString();
        }
        boolean boo0 = serviceService.selectServiceTypeByName(typeName);
        if (boo0) {
            msg.setCode(110);
            msg.setMsg("该服务类型已存在");
            return msg.toString();
        }
        ServiceType serviceType = new ServiceType();
        serviceType.setEm_id(employee.getEm_id());
        serviceType.setSt_name(typeName);
        serviceType.setSm_id(StringUtils.isEmpty(sm_id) ? 0 : sm_id);
        serviceType.setParent_id(StringUtils.isEmpty(parent_id) ? 0 : parent_id);
        boolean boo1 = serviceService.addSerivceSubType(serviceType);
        if (!boo1) {
            msg.setCode(110);
            msg.setMsg("添加失败");
            return msg.toString();
        }
        msg.setData(serviceType);
        msg.setMsg("添加成功");
        return msg.toString();
    }

    /**
     * 添加服务子类型描述:addServiceUrl
     *
     * @param request
     * @return
     * @author 陈智颖
     */
    @RequestMapping("addServiceUrl")
    @ResponseBody
    public Map<String, Object> addServiceUrl(HttpServletRequest request, Integer st_id, String redrict_path) {
        Map<String, Object> map = new HashMap<>();
        ServiceType serviceType = new ServiceType();
        serviceType.setSt_id(st_id);
        serviceType.setRedrict_path(redrict_path);
        int bools = serviceService.perfectService(serviceType);
        if (bools > 0) {
            map.put("code", 200);
        } else {
            map.put("code", 401);
        }
        return map;
    }

    /**
     * 查询服务跳转地址
     *
     * @param request
     * @return
     * @author 陈智颖
     */
    @RequestMapping("queryServiceTypes")
    @ResponseBody
    public Map<String, Object> queryServiceTypes(HttpServletRequest request, Integer st_id) {
        Map<String, Object> map = new HashMap<>();
        ServiceType serviceType = serviceService.selectServiceTypeById(st_id);
        if (serviceType != null) {
            map.put("code", 200);
            map.put("data", serviceType);
        } else {
            map.put("code", 401);
        }
        return map;
    }

    /**
     * 查询服务子类型分类信息列表：queryServiceSubTypeList
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("queryServiceSubTypeList")
    @ResponseBody
    public String queryServiceSubTypeList(Integer parent_id) {
        Msg<List<ServiceType>> msg = new Msg<List<ServiceType>>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            msg.setCode(110);
            msg.setMsg("登录信息过期，请重新登录");
            return msg.toString();
        }
        if (StringUtils.isEmpty(parent_id)) {
            msg.setCode(110);
            msg.setMsg("参数错误");
            return msg.toString();
        }
        List<ServiceType> serviceType = serviceService.selectServiceTypeListByParentId(parent_id);

        ServiceType serviceTypeData = serviceService.selectServiceTypeById(parent_id);
        serviceTypeData.setSt_imagePath(serviceTypeData.getSt_image());
        serviceTypeData.setSt_image(OSSparameter.imagePath(serviceTypeData.getSt_image(), 164, 114));
        serviceTypeData.setSt_logoPath(serviceTypeData.getSt_logo());
        serviceTypeData.setSt_logo(OSSparameter.imagePath(serviceTypeData.getSt_logo(), 61, 61));


        msg.put("serviceTypeList", serviceType);
        msg.put("serviceTypeData", serviceTypeData);
//		msg.setData(serviceType);
        return msg.toString();
    }

    /**
     * 跳转添加服务信息：jumpAddServeMessage
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/jumpAddServeMessage")
    public String jumpAddServeMessage(HttpServletRequest request, HttpServletResponse response) {
        // 在导向编辑页面时，向request和session域中添加uuid随机数
        UUIDToken.generateUUIDToken(request);
        List<ServiceType> serviceTypeList = serviceService.selectServiceType();
        request.setAttribute("serviceTypeList", serviceTypeList);
        return "/service/addServeMessage";
    }

    /**
     * 跳转修改服务信息界面
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/updataMessage")
    public String jumpUpdataMessage(HttpServletRequest request, HttpServletResponse response, String id) {
        int sm_id = Integer.parseInt(id);
        // 根据编号查询服务基本信息
        ServiceMessage serviceMessage = serviceService.selectMessageById(sm_id);
        serviceMessage.setSm_imagepath(serviceMessage.getSm_image());
        serviceMessage.setSm_image(OSSparameter.imagePath(serviceMessage.getSm_image(), 164, 114));
        // 查询服务类型
        // List<ServiceType> serviceTypeList =
        // serveService.selectServiceTypeBySmId(sm_id);
        // 查询问题描述列表
        // List<ProblemList> serviceProblemList =
        // serveService.selectProblemList(serviceMessage.getSt_id());
        // request.setAttribute("serviceTypeList", serviceTypeList);
        request.setAttribute("serviceMessage", serviceMessage);
        // request.setAttribute("serviceProblemList", serviceProblemList);
        return "/service/updataMessage";
    }

    /**
     * 修改服务类型信息：updataMessages
     *
     * @param request
     * @return
     * @throws IOException
     */
    @RequestMapping("/updataMessages")
    @ResponseBody
    public String updataMessages(@RequestBody Map<String, Object> data, HttpServletRequest request) throws IOException {
        Msg<Object> msg = new Msg<>();
        ServiceMessage serviceMessage = JSONObject.parseObject((String) data.get("serviceMessage"), ServiceMessage.class);

        ServiceMessage serviceMessage1 = serviceService.selectMessageById(serviceMessage.getSm_id());
        OSSparameter.removeFile(serviceMessage1.getSm_image());

        int result = serviceService.updataMessage(serviceMessage);
        msg.setMsg(result > 0 ? 200 : 401, result > 0 ? "更新成功" : "更新失败");
//        if (!StringUtils.isEmpty(pl_names)) {
//            UserCenterEmployee employee = AppUtil.getCookieEmployee(request);
//            String[] pl_name = pl_names.split("=");
//            for (String string : pl_name) {
//                if (!StringUtils.isEmpty(string)) {
//                    ProblemList problemList = new ProblemList();
//                    problemList.setPl_name(string);
//                    problemList.setPl_time(new Date());
//                    problemList.setPl_people(employee.getEm_name());
//                    problemList.setSt_id(serviceMessage.getSt_id());
//                    // 添加问题描述
//                    serveService.addProblemList(problemList);
//                }
//            }
//        }
//        response.sendRedirect("/service/serveMessage");
        return msg.toString();
    }

    /**
     * 添加服务基本信息：addServeMessage
     *
     * @return
     * @throws IOException
     */
    @RequestMapping("/addServeMessage")
    @ResponseBody
    public String addServeMessage(@RequestBody Map<String, Object> data) throws IOException {
        Msg<Object> msg = new Msg<>();
        // 判断是否重复提交
//        if (!UUIDToken.isRepeatSubmit(request)) {
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
//            if (employee == null) {
//                request.setAttribute("error", "swal('登录信息过期，请重新登录');");
//                response.sendRedirect("/service/jumpAddServeMessage");
//            } else {
        ServiceMessage serviceMessage = JSONObject.parseObject((String) data.get("serviceMessage"), ServiceMessage.class);
        serviceMessage.setSm_time(new Date());
        serviceMessage.setSm_people(employee.getEm_name());
        int result = serviceService.addServeMessage(serviceMessage);
        msg.setMsg(result > 0 ? 200 : 401, result > 0 ? "添加成功" : "添加失败");
//            }
//        } else {
//            response.sendRedirect("/service/serveMessage");
//        }
//        request.getSession().removeAttribute("token");// 移除session中的token

//        response.sendRedirect("/service/serveMessage");
        return msg.toString();
    }

    /**
     * 服务手写签名确认
     *
     * @param request
     * @param md_id   服务编码
     * @return
     * @throws Exception
     * @作者 陈智颖
     * @日期 2017年3月30日
     */
    @RequestMapping("/uploadServiceSignature")
    @ResponseBody
    public Map<String, Object> uploadServiceSignature(MultipartHttpServletRequest request, Integer md_id) throws Exception {
        Map<String, Object> map = new HashMap<>();
        if (StringUtils.isEmpty(md_id)) {
            map.put("message", "error");
            return map;
        }
        boolean boo = false;
        try {
            MultipartFile file = request.getFiles("file").get(0);
            MaintenanceDeclaration maintenanceDeclaration = new MaintenanceDeclaration();
            maintenanceDeclaration.setMd_CustomerImage(file.getBytes());
            maintenanceDeclaration.setMd_id(md_id);
            int bools = serviceService.updataCustomerImage(maintenanceDeclaration);
            if (bools > 0) {
                map.put("message", "success");
                boo = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("message", "error");
            return map;
        }
        if (!boo) {
            map.put("message", "error");
            return map;
        }
        return map;
    }

    /**
     * 修改热点问题<updataHotSpot>:updataHotSpot
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/updataHotSpot")
    public String updataHotSpot(HotspotIssuesProblem hotspotIssuesProblem, Model model, HttpServletRequest request, HttpServletResponse response) {
        int result = serviceService.updataHotSpot(hotspotIssuesProblem);
        if (result != 0) {
            request.setAttribute("success", "$.jBox.tip('修改热点问题成功');");
        } else {
            request.setAttribute("error", "$.jBox.tip('修改热点问题失败');");
        }
        return "/service/hotSpot";
    }

    /**
     * app服务预约
     *
     * @return
     * @author 王孝元
     */
    @RequestMapping("/appServiceOrder")
    public String appServiceOrder() {
        return "/service/appServiceOrder";
    }

    /**
     * 新增服务预约
     *
     * @param order
     * @return
     * @author 王孝元
     */
    @RequestMapping("/addServiceOrder")
    @ResponseBody
    public Map<String, Object> addServiceOrder(ServiceOrder order) {
        Map<String, Object> map = new HashMap<>();
        order.setSo_createTime(new Date());
        serviceOrderService.addServiceOrder(order);
        map.put("msg", "success");
        return map;
    }

    /**
     * 添加图片
     *
     * @param image_url
     * @return
     */
    @RequestMapping("/addServiceImage")
    @ResponseBody
    public Map<String, Object> addServiceImage(Integer md_id, String image_url) {
        Map<String, Object> map = new HashMap<>();
        if (!AppUtil.isNotNull(md_id) || !AppUtil.isNotNull(image_url)) {
            map.put("msg", "参数错误");
            return map;
        }
        MaintenanceImage maintenancePicture = new MaintenanceImage();
        maintenancePicture.setMd_id(md_id);
        maintenancePicture.setMi_path(image_url);
        serviceService.addDeclarationImagePath(maintenancePicture);
        Integer mi_id = maintenancePicture.getMi_id();
        map.put("msg", "success");
        map.put("mi_id", mi_id);
        return map;
    }

    /**
     * 删除图片
     *
     * @param image_url
     * @return
     */
    @RequestMapping("/deleteServiceImage")
    @ResponseBody
    public Map<String, Object> deleteServiceImage(String image_url) {
        Map<String, Object> map = new HashMap<>();
        if (!AppUtil.isNotNull(image_url)) {
            map.put("msg", "参数错误");
            return map;
        }
        MaintenanceImage maintenancePicture = new MaintenanceImage();
        maintenancePicture.setMi_path(image_url);
        serviceService.deleteDeclarationImagePath(maintenancePicture);
        map.put("msg", "success");
        return map;
    }

    /**
     * 添加费用清单图片
     *
     * @param image_url
     * @return
     */
    @RequestMapping("/addServiceImageMoney")
    @ResponseBody
    public Map<String, Object> addServiceImageMoney(Integer md_id, String image_url, String type) {
        Map<String, Object> map = new HashMap<>();
        if (!AppUtil.isNotNull(md_id) || !AppUtil.isNotNull(image_url)) {
            map.put("msg", "参数错误");
            return map;
        }
//        MaintenancePicture maintenancePicture = new MaintenancePicture();
//        maintenancePicture.setMd_id(md_id);
//        maintenancePicture.setMpe_path(image_url);
//        maintenancePicture.setMpe_type(type);
//        handleService.addMaintenancePicture(maintenancePicture);
//        Integer mi_id = maintenancePicture.getMpe_id();
        MaintenanceImage maintenanceImage = new MaintenanceImage();
        maintenanceImage.setMd_id(md_id);
        maintenanceImage.setMi_path(image_url);
        maintenanceImage.setMi_type(type);
        serviceService.addDeclarationImagePath(maintenanceImage);
        Integer mi_id = maintenanceImage.getMi_id();
        map.put("msg", "success");
        map.put("mi_id", mi_id);
        return map;
    }

    /**
     * 添加图片
     *
     * @param request
     * @param response
     * @param image_url
     * @return
     */
    @RequestMapping("/addServicePicture")
    @ResponseBody
    public Map<String, Object> addServicePicture(HttpServletRequest request, HttpServletResponse response, Integer md_id, String image_url, String mpe_type) {
        Map<String, Object> map = new HashMap<>();
        if (!AppUtil.isNotNull(md_id) || !AppUtil.isNotNull(image_url)) {
            map.put("msg", "参数错误");
            return map;
        }
        MaintenancePicture maintenancePicture = new MaintenancePicture();
        maintenancePicture.setMpe_type(mpe_type);
        maintenancePicture.setMd_id(md_id);
        maintenancePicture.setMpe_path(image_url);
        handleService.addMaintenancePicture(maintenancePicture);
        Integer mi_id = maintenancePicture.getMpe_id();
        map.put("msg", "success");
        map.put("mi_id", mi_id);
        return map;
    }

    /**
     * 删除图片
     *
     * @param request
     * @param response
     * @param image_url
     * @return
     */
    @RequestMapping("/deleteServiceImageMoney")
    @ResponseBody
    public Map<String, Object> deleteServiceImageMoney(HttpServletRequest request, HttpServletResponse response, String image_url) {
        Map<String, Object> map = new HashMap<>();
        if (!AppUtil.isNotNull(image_url)) {
            map.put("msg", "参数错误");
            return map;
        }
        handleService.deleteMaintenancePicture(image_url);
        map.put("msg", "success");
        return map;
    }

    /* APP页面 ***/

    /**
     * 服务申请页面
     *
     * @return
     * @author 陈智颖
     * @date Apr 11, 2017 5:38:07 PM
     */
    @RequestMapping("/appServiceAdd")
    public String appServiceAdd() {
        return "/appPage/service/serviceAdd";
    }

    /**
     * 服务项目选择
     *
     * @return
     * @author 陈智颖
     * @date Apr 11, 2017 5:38:07 PM
     */
    @RequestMapping("/appServiceSelect")
    public String appServiceSelect() {
        return "/appPage/service/serviceSelect";
    }

    /**
     * 修改服务状态
     *
     * @param md_id
     * @param type
     * @return
     * @author 陈智颖
     * @date Jun 4, 2017 9:54:42 AM
     */
    @RequestMapping("/updateStates")
    @ResponseBody
    public Map<String, Object> updateStates(Integer md_id, String type) {
        Map<String, Object> map = new HashMap<>();

        MaintenanceDeclaration maintenanceDeclaration = new MaintenanceDeclaration();
        maintenanceDeclaration.setMd_id(md_id);
        maintenanceDeclaration.setMd_state(type);
        int bools = serviceService.updateStates(maintenanceDeclaration);
        if (bools > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 改派订单
     *
     * @param md_id
     * @return
     * @author 陈智颖
     * @date Jun 4, 2017 9:54:42 AM
     */
    @RequestMapping("/updateDistributeLeaflets")
    @ResponseBody
    public Map<String, Object> updateDistributeLeaflets(Integer md_id, Integer em_id) {
        Map<String, Object> map = new HashMap<>();

        MaintenanceDispatching maintenanceDispatching = new MaintenanceDispatching();
        maintenanceDispatching.setMd_id(md_id);
        maintenanceDispatching.setEm_id(em_id);
        int bools = serviceService.updateFollowUp(maintenanceDispatching);
        if (bools > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 退回状态
     *
     * @param md_id
     * @param type
     * @return
     * @author 陈智颖
     * @date Jun 4, 2017 9:54:42 AM
     */
    @RequestMapping("/updateFollowUp")
    @ResponseBody
    public Map<String, Object> updateFollowUp(Integer md_id, String type) {
        Map<String, Object> map = new HashMap<>();

        MaintenanceDispatching maintenanceDispatching = new MaintenanceDispatching();
        maintenanceDispatching.setMd_id(md_id);
        maintenanceDispatching.setMdg_state(type);
        MaintenanceOrder maintenanceOrder = new MaintenanceOrder();
        maintenanceOrder.setMd_id(md_id);
        serviceService.deleteOrderFollow(maintenanceOrder);
        int bools = serviceService.updateFollowUp(maintenanceDispatching);
        if (bools > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 修改服务状态
     *
     * @return
     * @author 陈智颖
     * @date Jun 4, 2017 9:54:42 AM
     */
    @RequestMapping("/perfectService")
    @ResponseBody
    public Map<String, Object> perfectService(Integer st_id, Double st_money, String st_image, String st_explain, String st_logo, String redrict_path, String st_content) {
        Map<String, Object> map = new HashMap<>();

        ServiceType serviceType = new ServiceType();
        serviceType.setSt_id(st_id);
        serviceType.setSt_money(st_money);
        serviceType.setSt_content(st_content);
        serviceType.setSt_image(st_image);
        serviceType.setSt_explain(st_explain);

        List<String> imgList = new ArrayList<>();
        imgList.add(st_logo);
        serviceType.setSt_logo(st_logo);
        serviceType.setRedrict_path(redrict_path);

        Boolean bool = false;
        if (serviceType.getSt_id() != null) {
            if (serviceService.perfectService(serviceType) > 0) {
                bool = true;
            }
        } else {
            bool = serviceService.addSerivceSubType(serviceType);
        }
        if (bool) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 查询所有部门
     *
     * @return
     * @author 陈智颖
     * @date Jun 4, 2017 9:54:42 AM
     */
    @RequestMapping("/queryAllCompany")
    @ResponseBody
    public Map<String, Object> queryAllCompany() {
        Map<String, Object> map = new HashMap<>();
        List<Company> companyList = employeeService.queryAllCompany();
        map.put("companyList", companyList);
        return map;
    }

    /**
     * 上传服务图片
     *
     * @param request
     * @param response
     * @param uploadType
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/uploadServiceImage")
    @ResponseBody
    public Map<String, Object> uploadServiceImage(MultipartHttpServletRequest request, HttpServletResponse response, String uploadType) {
        Map<String, Object> map = new HashMap<>();
        if (!AppUtil.isNotNull(uploadType)) {
            map.put("msg", "参数错误");
            return map;
        }
        String realPath = request.getSession().getServletContext().getRealPath("/resources/temp/");
        // 创建文件夹
        File upFile = new File(realPath);
        if (!upFile.exists()) {
            upFile.mkdirs();
        }
        try {
            for (MultipartFile file: request.getFiles("file")) {
                if (file.getSize() > 1000 * 1024 * 20) {
                    map.put("msg", "图片大小不得超过20M");
                    return map;
                }
                File outFile = new File(realPath + AppUtil.getOrderCode("IMAGE") + ".png");
                // 文件类型
                String fileType = "png";
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
                        ImageUtil.saveMinPhoto(inFile.toString(), outFile.toString(), 1920, 0.8d);
                    }
                } else {
                    if (!outFile.exists()) {
                        file.transferTo(outFile);
                    }
                }
                // 远程上传
                OSSparameter.uploadFile(outFile, "serviceImage");
                String path = "serviceImage/" + outFile.getName();
                // 删除临时文件
                outFile.delete();
                if (AppUtil.isNotNull(path)) {
                    map.put("msg", "success");
                    map.put("path", path);
                } else {
                    map.put("msg", "上传失败");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("msg", "系统错误，请联系管理员");
        }
        return map;
    }

    /**
     * 删除图片
     *
     * @param request
     * @param response
     * @param image_url  图片地址
     * @param uploadType 上传类型
     * @return
     * @author 王孝元
     */
    @RequestMapping("/deleteServiceImageFile")
    @ResponseBody
    public Map<String, Object> deleteServiceImageFile(HttpServletRequest request, HttpServletResponse response, String image_url,
                                                      String uploadType) {
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
     * 删除服务项目
     *
     * @param
     * @return
     * @author 陈智颖
     * @create 31/10/17 10:25
     **/
    @RequestMapping("/delServiceSubType")
    @ResponseBody
    public Map<String, Object> delServiceSubType(HttpServletRequest request, HttpServletResponse response, Integer typeId) {
        Map<String, Object> map = new HashMap<>();
        Boolean bools = serviceService.deleteProblemToStId(typeId);
        if (bools) {
            map.put("code", 200);
        } else {
            map.put("code", 401);
        }
        return map;
    }

    /**
     * 获取网页内容
     *
     * @param request
     * @param response
     * @return
     * @throws TemplateException
     * @throws IOException
     * @author 陈智颖
     * @date 2017年2月23日
     */
    @RequestMapping("/selectServiceContent")
    @ResponseBody
    public Map<String, Object> selectServiceContent(HttpServletRequest request, HttpServletResponse response, String href, Integer st_id) {
        Map<String, Object> map = new HashMap<>();
        try {
            String path = OSSparameter.imagePath(href, null, null);
            Document doc = Jsoup.connect(path).get();
            Element link = doc.select("div.center").first();
            map.put("content", link.html());
        } catch (IOException e) {
            e.printStackTrace();
        }
        ServiceType serviceType1 = serviceService.selectServiceTypeById(st_id);
        map.put("data", serviceType1);
        return map;
    }

    /**
     * 插入服务内容
     *
     * @param request
     * @param response
     * @return
     * @throws TemplateException
     * @throws IOException
     * @author 陈智颖
     * @date 2017年2月23日
     */
    @RequestMapping("/addServiceContent")
    @ResponseBody
    public Map<String, Object> addServiceContent(HttpServletRequest request, HttpServletResponse response, String text, Integer st_id, Integer st_moneyBool) throws TemplateException, IOException {
        Map<String, Object> map = new HashMap<String, Object>();
        String basePath = request.getSession().getServletContext().getRealPath("/");
        int radom = (int) (Math.random() * (9999 - 1000 + 1)) + 1000;
        File input = new File(basePath + "resources/serviceHtml/serviceMoneyInfo.html");
        Document doc = Jsoup.parse(input, "UTF-8");
        Elements content = doc.getElementsByTag("body");
        //找到body的内容
        Element body = content.get(0);

        //将控制页面相关逻辑代码追加到业务页面example.html的最后面。
        body.append("<div class=\"center\">" + text + "</div>");

        String name = "";
        name = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + radom;
        String paths = basePath + "/resources/serviceMoneyInfo/" + name + ".html";
        File file = new File(paths);
        if (!file.getParentFile().exists()) {
            file.getParentFile().mkdirs();
        }
        FileOutputStream fileOutputStream = new FileOutputStream(file);// 建立文件输出流
        fileOutputStream.write(doc.html().getBytes());
        fileOutputStream.close();

        ServiceType serviceType1 = serviceService.selectServiceTypeById(st_id);
        OSSparameter.removeFile(serviceType1.getRedrict_path().replace(OSSparameter.endpoint + "/", ""));

        OSSparameter.uploadFile(file, "serviceMoneyInfo");
        // 远程上传
        String path = "serviceMoneyInfo/" + file.getName();
        ServiceType serviceType = new ServiceType();
        serviceType.setSt_id(st_id);
//        serviceType.setSt_moneyBool(st_moneyBool);
        serviceType.setRedrict_path(path);
        int bools = serviceService.perfectService(serviceType);
        if (bools > 0) {
            map.put("code", 200);
            map.put("path", path);
        } else {
            map.put("code", 401);
        }
        return map;
    }

    /**
     * 查询付费对象
     *
     * @param param 搜索框值
     * @param type  付费对象 1-客户；2-管家；3-门店
     * @return
     * @author shenhx
     * @date 201700816
     */
    @RequestMapping(value = "/queryPayObject", produces = "text/plain;charset=UTF-8")
//    @RequestMapping("/queryPayObject")
    @ResponseBody
    public String queryPayObject(String param, String type, Integer md_id) {

        ViewBusinessDeclarationVo businessDeclarationVo = serviceService.selectDeclarationAllById(md_id);
        UserCenterUserVo centerUserVo = null;
        if (businessDeclarationVo.getUser_id() != null) {
            centerUserVo = serviceService.queryUserVo(Integer.valueOf(businessDeclarationVo.getUser_id()));
        }

        if ("3".equals(type)) {//
            Msg<Pagination<Company>> msg = new Msg<Pagination<Company>>();
            Pagination<Company> pagination = new Pagination<Company>(0, 8);
            Company company = new Company();
            company.setWhereList(param);
            company.setHi_code(businessDeclarationVo.getHi_code());
            if (centerUserVo != null && !StringUtils.isEmpty(centerUserVo.getUser_cardNumber())) {
                UserCustomer userCustomer = new UserCustomer();
                userCustomer.setCc_cardNum(centerUserVo.getUser_cardNumber());
                userCustomer = customerService.selectCustomerCard(userCustomer);
                if (null != userCustomer) {
                    company.setCc_code(userCustomer.getCc_code());
                }
            }
            pagination.setT(company);
            List<Company> companyList = serviceService.queryCompany(pagination);

            if (!StringUtils.isEmpty(businessDeclarationVo.getHi_code())) {
                PositionRecordVo positionRecordVo = new PositionRecordVo();
                PositionRecordVo positionRecordVos = houseLibraryService.queryPositionRecordVo(businessDeclarationVo.getHi_code());

                if (null != companyList && !companyList.isEmpty()) {

                    for (Company company1: companyList) {
                        if (company1.getUcc_id().equals(positionRecordVos.getUcc_id())) {
                            company1.setUcc_name(company1.getUcc_name() + "-归属部门");
                            break;
                        }
                    }
                    msg.setCode(200);
                } else {
                    msg.setCode(401);
                }
            }
            pagination.setList(companyList);
            msg.setData(pagination);
            return msg.toString();
        } else if ("2".equals(type)) {

            Msg<Object> msg = new Msg<>();
            UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
            userCenterEmployee.setWhereList(param);
            userCenterEmployee.setStart(0);
            userCenterEmployee.setEnd(8);
            userCenterEmployee.setHi_code(businessDeclarationVo.getHi_code());
            if (centerUserVo != null && !StringUtils.isEmpty(centerUserVo.getUser_cardNumber())) {
                UserCustomer userCustomer = new UserCustomer();
                userCustomer.setCc_cardNum(centerUserVo.getUser_cardNumber());
                userCustomer = customerService.selectCustomerCard(userCustomer);
                if (null != userCustomer) {
                    userCenterEmployee.setCc_code(userCustomer.getCc_code());
                }
            }
            List<UserCenterEmployee> userCenterEmployeeList = serviceService.queryEmployee(userCenterEmployee);
            if (null != userCenterEmployeeList) {
                PositionRecordVo positionRecordVo = new PositionRecordVo();
                if (!StringUtils.isEmpty(businessDeclarationVo.getHi_code())) {
                    PositionRecordVo positionRecordVos = houseLibraryService.queryPositionRecordVo(businessDeclarationVo.getHi_code());
                    for (UserCenterEmployee employee: userCenterEmployeeList) {
                        if (positionRecordVos.getHpr_newEmp().equals(employee.getEm_id())) {
                            employee.setEm_name(employee.getEm_name() + "-主管家");
                            break;
                        }
                    }
                }
                msg.setCode(200);
                msg.setData(userCenterEmployeeList);
            } else {
                msg.setCode(401);
                msg.setMsg(401, "没有数据");
            }
            return msg.toString();
        } else if ("1".equals(type)) {
            Msg<Object> msg = new Msg<>();

            List<MaintenancePoint> points = serviceService.selectMaintenancePointById(md_id);
            if (null != points) {
                String hi_code = points.get(0).getHi_code();
                if (!StringUtils.isEmpty(hi_code)) {
                    List<UserCustomer> userCustomers = customerService.queryCustomerByHiCode(points.get(0).getHi_code());
                    if (null != userCustomers) {
                        msg.setCode(200);
                        msg.setData(userCustomers);
                        return msg.toString();
                    }
                }
            }

            if (null != businessDeclarationVo && AppUtil.isNotNull(businessDeclarationVo.getCc_code())) {
                List<UserCustomer> userCustomers = customerService.queryCustomerByHiCode(businessDeclarationVo.getHi_code());
                if (null != userCustomers) {
                    msg.setCode(200);
                    msg.setData(userCustomers);
                } else {
                    msg.setMsg(401, "没有数据");
                }
                return msg.toString();
            } else {
                if (null == centerUserVo) {
                    msg.setMsg(401, "没有数据");
                    return msg.toString();
                }
                if (StringUtils.isEmpty(centerUserVo.getUser_nickName()) && StringUtils.isEmpty(centerUserVo.getUser_realName())) {
                    centerUserVo.setUser_realName(businessDeclarationVo.getMd_contactpeople());
                }
                if (StringUtils.isEmpty(centerUserVo.getUser_phone())) {
                    centerUserVo.setUser_phone(businessDeclarationVo.getMd_contactPhone());
                }
                if (!StringUtils.isEmpty(centerUserVo.getUser_cardNumber())) {
                    UserCustomer userCustomer = new UserCustomer();
                    userCustomer.setCc_cardNum(centerUserVo.getUser_cardNumber());
                    userCustomer = customerService.selectCustomerCard(userCustomer);

                    if (null != userCustomer) {

                        List<UserCustomer> customerList = serviceService.queryCustomerByCradNum(userCustomer.getCc_cardNum());
                        msg.setCode(200);
                        msg.setData(customerList);

                    } else {
                        msg.setCode(201);
                        msg.setData(centerUserVo);
                    }
                } else {
                    msg.setCode(201);
                    msg.setData(centerUserVo);
                }
                return msg.toString();
            }
        }
        return "";
    }

    /**
     * 选择服务
     *
     * @param md_id
     * @param serType
     * @param outsource_name
     * @param outsource_price
     * @param outsource_phone
     * @param outsource_result
     * @param end_time
     * @return
     */
    @RequestMapping("/chooseService")
    @ResponseBody
    public Map<String, Object> chooseService(Integer md_id, Integer serType, String outsource_name, String outsource_price, String outsource_phone, String outsource_result, String end_time, String paths) {
        Map<String, Object> map = new HashMap<>();

        if (serType.intValue() == 1) {
            MaintenanceDispatching maintenanceDispatching = new MaintenanceDispatching();
            maintenanceDispatching.setMd_id(md_id);
            MaintenanceDispatching dispatching = handleService.selectServiceState(maintenanceDispatching);
            if (null != dispatching && "转至客服".equals(dispatching.getMdg_state())) {
                map.put("code", 401);
                map.put("msg", "该订单已转至客服，客服正在处理中");
                return map;
            }
            maintenanceDispatching.setMdg_state("转至客服");
            maintenanceDispatching.setEm_id(AppUtil.getCookieEmployee().getEm_id());
            maintenanceDispatching.setMdg_time(new Date());
            int result = serviceService.addDispatching(maintenanceDispatching);
            map.put("code", result > 0 ? "200" : "401");

        } else if (serType.intValue() == 2) {
            MaintenanceDispatching maintenanceDeclaration = new MaintenanceDispatching();
            maintenanceDeclaration.setMdg_state("转至外协");
            maintenanceDeclaration.setMd_id(md_id);
            MaintenanceDispatching dispatching = handleService.selectServiceState(maintenanceDeclaration);
            if (null != dispatching && "转至外协".equals(dispatching.getMdg_state())) {
                map.put("code", 401);
                map.put("msg", "该订单已转至外协，外协正在处理中");
                return map;
            }
            serviceService.updateFollowUp(maintenanceDeclaration);

            ServiceOutsource serviceOutsource = new ServiceOutsource();
            serviceOutsource.setMd_id(md_id);
            serviceOutsource.setOutsource_name(outsource_name);
            serviceOutsource.setOutsource_price(Double.parseDouble(outsource_price));
            serviceOutsource.setOutsource_phone(outsource_phone);
            serviceOutsource.setOutsource_result(Integer.parseInt(outsource_result));
            serviceOutsource.setEnd_time(DataUtil.StrToDate(end_time));
            serviceOutsource.setCreate_time(new Date());
            serviceOutsource.setEm_id(AppUtil.getCookieEmployee().getEm_id());
            int result = handleService.saveServiceOutsource(serviceOutsource);

            if (!StringUtils.isEmpty(paths)) {
                String[] pathArray = paths.split(";");
                for (int i = 0; i < pathArray.length; i++) {
                    MaintenancePicture maintenancePicture = new MaintenancePicture();
                    maintenancePicture.setMpe_type("outsource");
                    maintenancePicture.setMpe_path(pathArray[i]);
                    maintenancePicture.setMd_id(md_id);
                    handleService.addMaintenancePicture(maintenancePicture);
                }
            }
            map.put("code", result > 0 ? "200" : "401");
        }
        return map;
    }

    /**
     * 查询合同服务费、包修费记录
     *
     * @param con_no
     * @return
     * @throws UnsupportedEncodingException
     */
    @RequestMapping("/queryServiceChargeRecord")
    @ResponseBody
    public String queryServiceChargeRecord(String con_no, Integer pageNo, Integer pageSize) {
        Msg<Object> msg = new Msg<>();
        if (AppUtil.isNotNull(con_no)) {
            ServiceChargeRecord t = new ServiceChargeRecord();
            t.setCon_no(con_no);
            Pagination<ServiceChargeRecord> pagination = new Pagination<>(pageNo, pageSize, t);

            List<ServiceChargeRecord> chargeRecords = handleService.queryServiceChargeRecord(pagination);

            int totalRecords = handleService.queryServiceChargeRecordCount(pagination);
            pagination.setList(chargeRecords, totalRecords);
            msg.setCode(200);
            msg.setData(pagination);
        } else {
            msg.setMsg(402, "合同编号为空异常");
        }
        return msg.toString();
    }

    /**
     * 查询合查询有效的房东或租客
     *
     * @return
     * @throws UnsupportedEncodingException
     */
    @RequestMapping(value = "/queryHouseCustomerInfo", produces = "text/plain;charset=UTF-8")
    @ResponseBody
    public String queryHouseCustomerInfo(String where, String customer_type) {
        Msg<Object> msg = new Msg<>();
        String contractObject_type = "";
        if (StringUtils.isEmpty(customer_type)) {
            customer_type = "";
        }
        switch (customer_type) {
            case "4":
                contractObject_type = "租赁合同";
                break;
            case "5":
                contractObject_type = "托管合同";
                break;
        }

        Pagination<ContractObjectVo> voPagination = new Pagination<>(1, 10);
        ContractObjectVo objectVo = new ContractObjectVo();
        objectVo.setContractObject_Type(contractObject_type);
        objectVo.setWhere(where);
        voPagination.setT(objectVo);

        List<ContractObjectVo> houseCustomerList = serviceService.queryHouseCustomerList(voPagination);
        voPagination.setList(houseCustomerList);
        msg.setData(voPagination);
        return msg.toString();
    }

    /**
     * 查询合查询有效的房东或租客
     *
     * @return
     * @throws UnsupportedEncodingException
     */
    @RequestMapping(value = "/queryMdOrderByEmId", produces = "text/plain;charset=UTF-8")
    @ResponseBody
    public String queryMdOrderByEmId(String em_id) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(em_id)) {
            msg.setCode(201);
            return msg.toString();
        }

        List<ViewBusinessDeclarationVo> mdOrderList = serviceService.queryMdOrderByEmId(Integer.valueOf(em_id));
        msg.setCode(200);
        msg.setData(mdOrderList);

        return msg.toString();
    }

    /**
     * 接单/跟进
     *
     * @return
     */
    @RequestMapping("/addServiceMoneyDetail")
    @ResponseBody
    public String addServiceMoneyDetail(Integer md_id, String moneyList) {
        Msg<String> msg = new Msg<>();

        if (md_id == null || StringUtils.isEmpty(moneyList)) {
            msg.setMsg(401, "参数异常，请重试");
            return msg.toString();
        }

        String[] moneyArray = moneyList.split(";");
        for (int i = 0; i < moneyArray.length; i++) {
            String[] detail = moneyArray[i].split("-");
            ServiceMoneyDetail moneyDetail = new ServiceMoneyDetail();
            moneyDetail.setMd_id(md_id);

            int payObject = Integer.parseInt(detail[0]);
            if (payObject == 1) {
                if (detail[1].startsWith("CUS")) {
                    moneyDetail.setCc_code(detail[1]);
                } else {
                    moneyDetail.setUser_id(Integer.valueOf(detail[1]));
                }
            } else if (payObject == 2) {
                moneyDetail.setEm_id(Integer.valueOf(detail[1]));
            } else if (payObject == 3) {
                moneyDetail.setUcc_id(Integer.valueOf(detail[1]));
            }

            moneyDetail.setPayObject(payObject);
            moneyDetail.setSsm_source(detail[2]);
            moneyDetail.setSsm_univalent(Double.valueOf(detail[3]));
            moneyDetail.setSsm_num(Integer.valueOf(detail[4]));
            moneyDetail.setSsm_company(detail[5]);
            moneyDetail.setSsm_money(Double.valueOf(detail[6]));
            serviceService.addMoneyDetail(moneyDetail);
        }
        msg.setCode(200);
        return msg.toString();
    }

    /**
     * 查询用户是否为在租或在托管客户
     *
     * @return
     * @throws UnsupportedEncodingException
     */
    @RequestMapping("/queryHouseInfoByUser")
    @ResponseBody
    public String queryHouseInfoByUser(Integer user_id) {
        Msg<Object> msg = new Msg<>();
        if (null != user_id && user_id != 0) {

            UserCenterUserVo centerUserVo = serviceService.queryUserVo(Integer.valueOf(user_id));
            if (!StringUtils.isEmpty(centerUserVo.getUser_cardNumber())) {
                UserCustomer userCustomer = new UserCustomer();
                userCustomer.setCc_cardNum(centerUserVo.getUser_cardNumber());
                userCustomer = customerService.selectCustomerCard(userCustomer);
                if (null == userCustomer) {
                    msg.setCode(201);
                    return msg.toString();
                }

                List<UserCustomer> customerList = serviceService.queryCustomerByCode(userCustomer.getCc_code());
                if (null != customerList && !customerList.isEmpty()) {
                    msg.setCode(200);
                    msg.setData(customerList);
                } else {
                    msg.setCode(201);
                }

            } else {
                msg.setCode(201);
            }
        } else {
            msg.setCode(201);
        }
        return msg.toString();
    }

    /**
     * 受理
     *
     * @return
     */
    @RequestMapping("/saveAccept")
    @ResponseBody
    public String saveAccept(Integer md_id, String md_state, String infolist) {
        Msg<String> msg = new Msg<>();

        ViewBusinessDeclarationVo declaration = serviceService.selectDeclarationAllById(md_id);

        MaintenanceDeclaration maintenanceDeclaration = new MaintenanceDeclaration();
        maintenanceDeclaration.setMd_id(md_id);
        if (md_state.contains("确认")) {
            md_state = "已受理";
        } else if (md_state.contains("拒绝")) {
            md_state = "拒受理";
        }
        maintenanceDeclaration.setMd_state(md_state);

        if (!StringUtils.isEmpty(infolist)) {
            String[] info = infolist.split("&");
            maintenanceDeclaration.setCc_code(info[2]);
            maintenanceDeclaration.setMd_contactpeople(info[3]);
            maintenanceDeclaration.setMd_contactPhone(info[5]);

            MaintenancePoint point = new MaintenancePoint();
            if (Integer.parseInt(declaration.getMd_type()) != 6) {
                point.setHi_code(info[0]);
                point.setHouse_address(info[1]);
                point.setHouse_longlat("");
                point.setMd_id(md_id);
                serviceService.updateMaintenancePoint(point);
            }
        }

        msg.setCode(serviceService.updateMaintenanceDeclartion(maintenanceDeclaration) > 0 ? 200 : 401);
        return msg.toString();
    }

    /**
     * 费用明细录入完成
     *
     * @return
     */
    @RequestMapping("/overOrder")
    @ResponseBody
    public String overOrder(Integer md_id) {
        Msg<String> msg = new Msg<>();

        try {
            MaintenanceDeclaration maintenanceDeclaration = new MaintenanceDeclaration();
            maintenanceDeclaration.setMd_id(md_id);
            maintenanceDeclaration.setMd_state("已完成");
            serviceService.updateMaintenanceDeclartion(maintenanceDeclaration);

            MaintenanceDispatching maintenanceDispatching = new MaintenanceDispatching();
            maintenanceDispatching.setMd_id(md_id);
            maintenanceDispatching.setMdg_state("等待回访");
            serviceService.updateFollowUp(maintenanceDispatching);

            MaintenanceOrder maintenanceOrder = new MaintenanceOrder();
            maintenanceOrder.setMd_id(md_id);
            maintenanceOrder.setMo_step(4);
            maintenanceOrder.setMo_content("结束订单");
            maintenanceOrder.setMo_date(new Date());
            maintenanceOrder.setMo_state(AppConfig.SERVICE_PROC_4);
            serviceService.addOrder(maintenanceOrder);

            msg.setCode(200);
        } catch (Exception e) {
            msg.setCode(401);
        }

        return msg.toString();
    }

    /**
     * 新版添加申请服务信息
     *
     * @return
     * @author 申洪喜
     */
    @RequestMapping("/saveServiceOrderInfo")
    @ResponseBody
    public String saveServiceOrderInfo(@RequestBody Map<String, Object> data) throws Exception {
        Msg<String> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        ServiceOrderVo serviceOrderVo = JSONObject.parseObject((String) data.get("serviceOrderVo"), ServiceOrderVo.class);
        serviceOrderVo.setSo_printCode(new Date().getTime() + employee.getEm_id() + "");
        serviceOrderVo.setSo_applicantEmp(employee.getEm_id());

        ServiceOrderInfoVo serviceOrderInfoVo = JSONObject.parseObject((String) data.get("serviceOrderInfoVo"), ServiceOrderInfoVo.class);
        if (null != serviceOrderInfoVo) {
            serviceOrderVo.setSoin_moveStartAddress(serviceOrderInfoVo.getSoin_moveStartAddress());
            serviceOrderVo.setSoin_moveStartPoint(serviceOrderInfoVo.getSoin_moveStartPoint());
            serviceOrderVo.setSoin_moveEndAddress(serviceOrderInfoVo.getSoin_moveEndAddress());
            serviceOrderVo.setSoin_moveEndPoint(serviceOrderInfoVo.getSoin_moveEndPoint());
        }

        if (!StringUtils.isEmpty(serviceOrderVo.getSt_id_c())) {
            String[] st_id_c_arr = serviceOrderVo.getSt_id_c().split(",");
            if (null != st_id_c_arr && st_id_c_arr.length > 0) {
                List<Integer> itemArray = new ArrayList<>();
                for (String item: st_id_c_arr) {
                    itemArray.add(Integer.valueOf(item));
                }
                serviceOrderVo.setItemArray(itemArray);
            }
        }
        serviceOrderVo.setOpeater(employee.getEm_id());

        // 【查询同一个房屋，相同服务是否重复下单】
        if (!StringUtils.isEmpty(serviceOrderVo.getHi_code())) {
            int rstCount = serviceService.queryServiceItemCountByCode(serviceOrderVo);
            if (rstCount > 0) {
                msg.setCode(402);
                msg.setMsg("该房屋已申请相同服务项目，请勿重复下单");
                return msg.toString();
            }
        }

        return msg.toString(serviceService.saveServiceOrderInfo(serviceOrderVo));
    }

    /**
     * 【服务】服务受理2
     *
     * @return
     */
    @RequestMapping("/submitServiceAccept")
    public @ResponseBody
    String submitServiceAccept(
            Integer so_id,
            String hi_code,
            String so_targetAddress,
            Integer so_payObject,
            String so_payName,
            String so_payPhone,
            String so_state,
            String so_remarks) {
        Msg<Object> msg = new Msg<>();
        // 验证用户信息
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        // 验证参数信息
        if (StringUtils.isEmpty(so_id)
                || StringUtils.isEmpty(so_state)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        try {
            // [添加服务订单]
            ServiceOrderVo serviceOrderVo = new ServiceOrderVo();
            serviceOrderVo.setSo_id(so_id);
            serviceOrderVo.setHi_code(hi_code);
            serviceOrderVo.setSo_targetAddress(so_targetAddress);
            serviceOrderVo.setSo_payObject(so_payObject);
            serviceOrderVo.setSo_payNameNew(so_payName);
            serviceOrderVo.setSo_payPhoneNew(so_payPhone);
            serviceOrderVo.setSo_handler(employee.getEm_id());
            serviceOrderVo.setSo_remarks(so_remarks);
            if (!StringUtils.isEmpty(hi_code)) {
                serviceOrderVo.setSo_department(houseLibraryService.queryPositionRecordVo(hi_code).getUcc_id());
            }

            ServiceOrderVo orderVo = serviceService.selectServiceOrderInfoById(so_id);
            Integer so_applicantEmp = orderVo.getSo_applicantEmp();
            Integer so_applicantUser = orderVo.getSo_applicantUser();
            ServicePayMoneyVo servicePayMoneyVo = new ServicePayMoneyVo();
            UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
            if (null != so_applicantEmp) {
                userCenterEmployee = serviceService.queryEmployeeById(so_applicantEmp);
            }
            if (null != so_applicantUser) {
                servicePayMoneyVo.setUser_id(so_applicantUser);
                servicePayMoneyVo = serviceService.queryServicePayMoneyInfo(servicePayMoneyVo);
            }
            ServiceMessage serviceMessage = serviceService.selectMessageById(orderVo.getSo_type());
            // 确认受理
            if (so_state.contains("确认")) {
//                serviceOrderVo.setSo_currentCharger(employee.getEm_id());
                serviceOrderVo.setSo_state(AppConfig.so_state_2100);

                if (null != so_applicantEmp) {

                    // 发送受理短信
                    String message = SmsUtil.sendServiceAcceptInfo(userCenterEmployee.getEm_phone(), userCenterEmployee.getEm_name(), orderVo.getSo_targetAddress(), orderVo.getSm_name());
                    // 生成短信记录
                    smsService.addSMSRecordForEmp(orderVo.getHi_code(), "", message, so_applicantEmp);

                } else if (null != so_applicantUser) {

                    // 发送受理短信
                    String message = SmsUtil.sendServiceAcceptInfo(servicePayMoneyVo.getUser_phone(), servicePayMoneyVo.getUser_name(), orderVo.getSo_targetAddress(), orderVo.getSm_name());
                    // 生成短信记录
                    smsService.addSMSRecordForUser(message, so_applicantUser);
                }

                ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
                contractVo.setHi_code(hi_code);
                if (so_payObject.intValue() == 4) {
                    contractVo.setContractObject_Type("租赁合同");
                } else if (so_payObject.intValue() == 5) {
                    contractVo.setContractObject_Type("托管合同");
                }
                contractVo.setCc_name(so_payName);
                // 绑定合同
                ContractObjectVo contractObjectVo = serviceService.queryContractInfo(contractVo);
                if (null != contractObjectVo) {
                    serviceOrderVo.setContractObject_Code(contractObjectVo.getContractObject_Code());
                }

                // 查询是否已添加维修费记录
                if (!StringUtils.isEmpty(hi_code) && (so_payObject.intValue() == 4 || so_payObject.intValue() == 5)) {

                    List<ViewBusinessContractVo> businessContractVoList = serviceService.selectContractObjectPeople(contractVo);
                    if (null != businessContractVoList) {
                        for (ViewBusinessContractVo businessContractVo: businessContractVoList) {

                            ServiceCharge serviceCharge = new ServiceCharge();
                            serviceCharge.setHi_code(hi_code);
                            serviceCharge.setCon_code(businessContractVo.getContractObject_Code());
                            serviceCharge.setCc_code(businessContractVo.getCc_code());

                            serviceCharge = serviceService.queryServiceChargeByCode(serviceCharge);
                            if (null == serviceCharge) {
                                ServiceCharge serviceCharge1 = new ServiceCharge();
                                serviceCharge1.setHi_code(hi_code);
                                serviceCharge1.setCon_code(businessContractVo.getContractObject_Code());
                                serviceCharge1.setCc_code(businessContractVo.getCc_code());
                                Date startDate = businessContractVo.getContractObject_Date();
                                Date endDate = businessContractVo.getContractObject_DeadlineTime();
                                serviceCharge1.setEffective_date(startDate);
                                serviceCharge1.setExpiry_date(endDate);
                                if ("租赁合同".equals(businessContractVo.getContractObject_Type())) {
                                    double serviceMoney = businessContractVo.getContractBody_Service();
                                    serviceCharge1.setServeType(2);
                                    serviceCharge1.setInit_serveMoney(serviceMoney >= 300 ? 300 : serviceMoney);
                                    serviceCharge1.setUsed_serveMoney(0.0);
                                    serviceCharge1.setSurplus_serveMoney(serviceMoney >= 300 ? 300 : serviceMoney);
                                    serviceCharge1.setAvailable_serveMoney(serviceMoney >= 300 ? 300 : serviceMoney);
                                } else if ("托管合同".equals(businessContractVo.getContractObject_Type())) {
                                    String[] guaranteeCostArr = businessContractVo.getContractBody_GuaranteeCost().split("\\|");
                                    double totalGuaranteeCost = 0.0;
                                    for (String aGuaranteeCostArr: guaranteeCostArr) {
                                        if (Double.parseDouble(aGuaranteeCostArr) > 0) {
                                            totalGuaranteeCost += Double.parseDouble(aGuaranteeCostArr);
                                        }
                                    }
                                    serviceCharge1.setServeType(2);
                                    serviceCharge1.setInit_serveMoney(totalGuaranteeCost);
                                    serviceCharge1.setUsed_serveMoney(0.0);
                                    serviceCharge1.setSurplus_serveMoney(totalGuaranteeCost);
                                    serviceCharge1.setAvailable_serveMoney(totalGuaranteeCost);
                                }
                                serviceCharge1.setCreateTime(new Date());
                                serviceChargeService.appAddServiceCharge(serviceCharge1);
                            }
                        }
                    }
                }
            }
            // 拒绝受理
            else if (so_state.contains("拒绝")) {
                serviceOrderVo.setSo_state(AppConfig.so_state_5020);

                if (null != so_applicantEmp) {

                    // 发送拒绝短信
                    String message = SmsUtil.sendServiceRefuseInfo(userCenterEmployee.getEm_phone(), userCenterEmployee.getEm_name(), orderVo.getSo_targetAddress(), orderVo.getSm_name(), so_remarks);
                    // 生成短信记录
                    smsService.addSMSRecordForEmp(orderVo.getHi_code(), "", message, so_applicantEmp);

                } else if (null != so_applicantUser) {

                    // 发送拒绝短信
                    String message = SmsUtil.sendServiceRefuseInfo(userCenterEmployee.getEm_phone(), userCenterEmployee.getEm_name(), orderVo.getSo_targetAddress(), orderVo.getSm_name(), so_remarks);
                    // 生成短信记录
                    smsService.addSMSRecordForUser(message, so_applicantUser);
                }
            }
            serviceService.updateServiceOrder(serviceOrderVo);

            // [添加服务记录]
            serviceService.addServiceRecordBo(serviceOrderVo.getSo_id(), serviceOrderVo.getSo_state(), employee.getEm_id(), so_remarks);
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
     * 【服务】服务派单3
     *
     * @param so_id
     * @param mode
     * @param person_type
     * @param service_id
     * @param service_name
     * @param service_phone
     * @param service_type
     * @param service_sex
     * @param moneyListt
     * @param so_totalMoney
     * @return
     */
    @RequestMapping("/submitServiceProcess")
    public @ResponseBody
    String submitServiceProcess(
            Integer so_id,
            String mode,
            Integer person_type,
            Integer service_id,
            String service_name,
            String service_phone,
            String moneyListt,
            Double so_totalMoney) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(so_id) || StringUtils.isEmpty(person_type)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        try {
            serviceService.submitServiceProcess(
                    employee.getEm_id(),
                    so_id,
                    mode,
                    person_type,
                    service_id,
                    service_name,
                    service_phone,
                    moneyListt,
                    so_totalMoney);
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
     * 【服务】关闭订单
     *
     * @param so_id
     * @return
     */
    @RequestMapping("/closingServiceOrder")
    public @ResponseBody
    String closingServiceOrder(Integer so_id, String refuse_reason) {
        Msg<Object> msg = new Msg<>();
        ServiceOrderVo serviceOrderVo = new ServiceOrderVo();
        serviceOrderVo.setSo_id(so_id);
        serviceOrderVo.setSo_state(AppConfig.so_state_5020);

        try {
            boolean updResult = serviceService.updateServiceOrder(serviceOrderVo);
            UserCenterEmployee employee = AppUtil.getCookieEmployee();

            ServiceProcessVo serviceProcessVo = new ServiceProcessVo();
            serviceOrderVo.setSo_state(so_id);
            serviceProcessVo.setSpro_state(AppConfig.spro_state_3);
            serviceService.updateProcessToClosed(serviceProcessVo);

            serviceService.addServiceRecordBo(so_id, AppConfig.so_state_5020, employee.getEm_id(), refuse_reason);
        } catch (AppException e) {
            e.printStackTrace();
            msg.setCode(400);
            msg.setMsg("关闭订单异常，请联系管理员");
        }

        return msg.toString();
    }

    /**
     * 【服务】服务接单4
     *
     * @param so_id
     * @param spro_state
     * @return
     * @throws Exception
     */
    @RequestMapping("/submitServiceReceive")
    public @ResponseBody
    String submitServiceReceive(Integer so_id, Integer spro_state, Integer spro_expectEndDuration, String refusedArea) {
        Msg<Object> msg = new Msg<>();
        try {
            if (StringUtils.isEmpty(so_id)) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }
            UserCenterEmployee employee = AppUtil.getCookieEmployee();
            serviceService.submitServiceReceive(employee.getEm_id(), so_id, spro_state, spro_expectEndDuration, refusedArea);
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
     * 查询付费对象
     *
     * @param param 搜索框值
     * @param type  付费对象 1-客户；2-管家；3-门店
     * @return
     * @author shenhx
     * @date 201700816
     */
    @RequestMapping(value = "/queryPayInfo", produces = "text/plain;charset=UTF-8")
    public @ResponseBody
    String queryPayInfo(String param, String type, Integer so_id) {

        ServiceOrderVo serviceOrderVo = serviceService.queryServiceInfo(so_id);
        UserCenterUserVo centerUserVo = null;
        if (serviceOrderVo.getSo_applicantUser() != null) {
            centerUserVo = serviceService.queryUserVo(serviceOrderVo.getSo_applicantUser());
        }

        if ("3".equals(type)) {//
            Msg<Object> msg = new Msg<>();
            Pagination<Company> pagination = new Pagination<>(0, 8);
            Company company = new Company();
            company.setWhereList(param);
            company.setHi_code(serviceOrderVo.getHi_code());
            if (centerUserVo != null && !StringUtils.isEmpty(centerUserVo.getUser_cardNumber())) {
                UserCustomer userCustomer = new UserCustomer();
                userCustomer.setCc_cardNum(centerUserVo.getUser_cardNumber());
                userCustomer = customerService.selectCustomerCard(userCustomer);
                if (null != userCustomer) {
                    company.setCc_code(userCustomer.getCc_code());
                }
            }
            pagination.setT(company);
            List<Company> companyList = serviceService.queryCompany(pagination);

            if (!StringUtils.isEmpty(serviceOrderVo.getHi_code())) {

                PositionRecordVo positionRecordVo = new PositionRecordVo();
                PositionRecordVo positionRecordVos = houseLibraryService.queryPositionRecordVo(serviceOrderVo.getHi_code());

                if (null != companyList && !companyList.isEmpty()) {

                    for (Company company1: companyList) {
                        if (company1.getUcc_id().equals(positionRecordVos.getUcc_id())) {
                            company1.setUcc_name(company1.getUcc_name() + "-归属部门");
                            break;
                        }
                    }
                    msg.setCode(200);
                } else {
                    msg.setCode(401);
                }
            } else {
                msg.setCode(200);
            }
            pagination.setList(companyList);
            msg.setData(pagination);
            return msg.toString();
        } else if ("2".equals(type)) {

            Msg<Object> msg = new Msg<>();
            UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
            userCenterEmployee.setWhereList(param);
            userCenterEmployee.setStart(0);
            userCenterEmployee.setEnd(8);
            userCenterEmployee.setHi_code(serviceOrderVo.getHi_code());
            if (centerUserVo != null && !StringUtils.isEmpty(centerUserVo.getUser_cardNumber())) {
                UserCustomer userCustomer = new UserCustomer();
                userCustomer.setCc_cardNum(centerUserVo.getUser_cardNumber());
                userCustomer = customerService.selectCustomerCard(userCustomer);
                if (null != userCustomer) {
                    userCenterEmployee.setCc_code(userCustomer.getCc_code());
                }
            }
            List<UserCenterEmployee> userCenterEmployeeList = serviceService.queryEmployee(userCenterEmployee);
            if (null != userCenterEmployeeList) {
                PositionRecordVo positionRecordVo = new PositionRecordVo();
                if (!StringUtils.isEmpty(serviceOrderVo.getHi_code())) {
                    PositionRecordVo positionRecordVos = houseLibraryService.queryPositionRecordVo(serviceOrderVo.getHi_code());
                    for (UserCenterEmployee employee: userCenterEmployeeList) {
                        if (positionRecordVos.getHpr_newEmp().equals(employee.getEm_id())) {
                            employee.setEm_name(employee.getEm_name() + "-主管家");
                            break;
                        }
                    }
                }
                msg.setCode(200);
                msg.setData(userCenterEmployeeList);
            } else {
                msg.setCode(401);
                msg.setMsg(401, "没有数据");
            }
            return msg.toString();
        } else if ("1".equals(type)) {
            Msg<Object> msg = new Msg<>();

            if (!StringUtils.isEmpty(serviceOrderVo.getHi_code())) {
                List<UserCustomer> userCustomers = customerService.queryCustomerByHiCode(serviceOrderVo.getHi_code());
                if (null != userCustomers) {
                    msg.setCode(200);
                    msg.setData(userCustomers);
                    return msg.toString();
                }
            } else {
                if (null == centerUserVo) {
                    msg.setMsg(401, "没有数据");
                    return msg.toString();
                }
                if (StringUtils.isEmpty(centerUserVo.getUser_nickName()) && StringUtils.isEmpty(centerUserVo.getUser_realName())) {
                    centerUserVo.setUser_realName(serviceOrderVo.getSo_contractor());
                }
                if (StringUtils.isEmpty(centerUserVo.getUser_phone())) {
                    centerUserVo.setUser_phone(serviceOrderVo.getSo_contractPhone());
                }
                if (!StringUtils.isEmpty(centerUserVo.getUser_cardNumber())) {
                    UserCustomer userCustomer = new UserCustomer();
                    userCustomer.setCc_cardNum(centerUserVo.getUser_cardNumber());
                    userCustomer = customerService.selectCustomerCard(userCustomer);

                    if (null != userCustomer) {

                        List<UserCustomer> customerList = serviceService.queryCustomerByCradNum(userCustomer.getCc_cardNum());
                        msg.setCode(200);
                        msg.setData(customerList);

                    } else {
                        msg.setCode(201);
                        msg.setData(centerUserVo);
                    }
                } else {
                    msg.setCode(201);
                    msg.setData(centerUserVo);
                }
                return msg.toString();
            }
        } else if ("4".equals(type)) {
            Msg<Object> msg = new Msg<>();

            if (!StringUtils.isEmpty(serviceOrderVo.getHi_code())) {
                ContractObjectVo objectVo = new ContractObjectVo();
                objectVo.setHi_code(serviceOrderVo.getHi_code());
                objectVo.setContractObject_Type("租赁合同");
                List<UserCustomer> userCustomers = serviceService.queryCustomerByHiCode(objectVo);
                if (null != userCustomers) {
                    msg.setCode(200);
                    msg.setData(userCustomers);
                    return msg.toString();
                }
            } else {
                msg.setMsg(401, "没有数据");
                return msg.toString();
            }
        } else if ("5".equals(type)) {
            Msg<Object> msg = new Msg<>();

            if (!StringUtils.isEmpty(serviceOrderVo.getHi_code())) {
                ContractObjectVo objectVo = new ContractObjectVo();
                objectVo.setHi_code(serviceOrderVo.getHi_code());
                objectVo.setContractObject_Type("托管合同");
                List<UserCustomer> userCustomers = serviceService.queryCustomerByHiCode(objectVo);
                if (null != userCustomers) {
                    msg.setCode(200);
                    msg.setData(userCustomers);
                    return msg.toString();
                }
            } else {
                msg.setMsg(401, "没有数据");
                return msg.toString();
            }
        } else if ("6".equals(type)) {
            Msg<Object> msg = new Msg<>();

            if (null == centerUserVo) {
                msg.setMsg(401, "没有数据");
                return msg.toString();
            }
            if (StringUtils.isEmpty(centerUserVo.getUser_nickName()) && StringUtils.isEmpty(centerUserVo.getUser_realName())) {
                centerUserVo.setUser_realName(serviceOrderVo.getSo_contractor());
            }
            if (StringUtils.isEmpty(centerUserVo.getUser_phone())) {
                centerUserVo.setUser_phone(serviceOrderVo.getSo_contractPhone());
            }
            List<UserCenterUserVo> centerUserVos = new ArrayList<>();
            centerUserVos.add(centerUserVo);
            msg.setCode(200);
            msg.setData(centerUserVos);
            return msg.toString();
        }
        return "";
    }

    /**
     * 查询付费对象
     *
     * @param param 搜索框值
     * @param type  付费对象 1-客户；2-管家；3-门店
     * @return
     * @author shenhx
     * @date 201700816
     */
    @RequestMapping(value = "/queryServicePerson", produces = "text/plain;charset=UTF-8")
    @ResponseBody
    public String queryServicePerson(String param, String type) {
        Msg<Object> msg = new Msg<>();
        if ("1".equals(type)) {

            UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
            userCenterEmployee.setWhereList(param);
            userCenterEmployee.setStart(0);
            userCenterEmployee.setEnd(8);
            List<UserCenterEmployee> userCenterEmployeeList = serviceService.queryEmployee(userCenterEmployee);

            msg.setCode(200);
            msg.setData(userCenterEmployeeList);
        } else if ("2".equals(type)) {

            ServicePersonVo servicePersonVo = new ServicePersonVo();
            servicePersonVo.setParam(param);
            servicePersonVo.setStart(0);
            servicePersonVo.setEnd(8);
            List<ServicePersonVo> servicePersonVoList = serviceService.queryServicePerson(servicePersonVo);

            msg.setCode(200);
            msg.setData(servicePersonVoList);
        }
        return msg.toString();
    }

    /**
     * 保存删除图片
     *
     * @param oprate
     * @param so_id
     * @param si_type
     * @param si_path
     * @return
     */
    @RequestMapping("/saveServiceImage")
    @ResponseBody
    public Map<String, Object> saveServiceImage(Integer oprate, Integer so_id, String si_type, String si_path) {
        Map<String, Object> map = new HashMap<>();
        if (null == oprate || null == si_path) {
            map.put("code", 401);
            map.put("msg", "参数异常");
            return map;
        }
        return serviceService.saveServiceImage(oprate, so_id, si_type, si_path);
    }

    /**
     * 添加费用
     *
     * @param moneyListt
     * @return
     * @author shenhx
     * @date May 29, 2017 4:34:54 PM
     */
    @RequestMapping("/saveServiceMoney")
    @ResponseBody
    @SameUrlData
    public String saveServiceMoney(Integer so_id, String moneys, Double mdgMoney) {
        Msg<Object> msg = new Msg<>();
        try {
            if (StringUtils.isEmpty(so_id)) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }

            // 获取服务订单
            ServiceOrderVo serviceOrderVo = serviceService.queryServiceInfo(so_id);
            if (serviceOrderVo == null) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }

            // 删除服务金额
            // serviceMoneyService.deleteServiceMoney(so_id);
            // 添加服务金额
            if (moneys != null) {
                JSONArray moneyList = JSONObject.parseArray(moneys);
                for (int i = 0; i < moneyList.size(); i++) {
                    JSONObject json = moneyList.getJSONObject(i);
                    int payObject = json.getIntValue("payObject");
                    String payTitle = json.getString("payTitle");
                    Double payPrice = json.getDouble("payPrice");

                    ServiceMoney money = new ServiceMoney();
                    money.setPayObject(payObject);
                    money.setSo_id(so_id);
                    money.setSsm_source(payTitle);
                    money.setSsm_univalent(payPrice);
                    money.setSsm_num(1);
                    money.setSsm_money(payPrice);
                    switch (payObject) {
                        case 2:
                            money.setEm_id(json.getInteger("payPerson"));
                            break;
                        case 3:
                            money.setUcc_id(json.getInteger("payPerson"));
                            break;
                        case 4:
                            money.setCc_code(json.getString("payPerson"));
                            break;
                        case 5:
                            money.setCc_code(json.getString("payPerson"));
                            break;
                        case 6:
                            money.setUser_id(json.getInteger("payPerson"));
                            break;
                    }
                    if (json.getIntValue("isNew") != 1) {
                        serviceMoneyService.addServiceMoney(money);
                    }
                }
            }

            // 更新订单
            ServiceOrderVo serviceOrderVo1 = new ServiceOrderVo();
            serviceOrderVo1.setSo_id(so_id);
            serviceOrderVo1.setSo_totalMoney(mdgMoney);
            serviceOrderVo1.setSo_state(AppConfig.so_state_3300);
            serviceService.updateServiceOrder(serviceOrderVo1);

            UserCenterEmployee employee = AppUtil.getCookieEmployee();
            serviceOrderVo.setOpeater(employee.getEm_id());

            ServiceMoney money = new ServiceMoney();
            money.setSo_id(so_id);
            money.setIs_order(0);// 查询未生成订单的费用记录
            List<ServiceMoney> serviceMoneyList = serviceService.queryServiceMoneyBySoId(money);
            if (null != serviceMoneyList && !serviceMoneyList.isEmpty()) {
                for (ServiceMoney serviceMoney: serviceMoneyList) {
                    serviceService.genrateNewServiceOrder(serviceMoney, serviceOrderVo, 1102);
                }
            }

            // PC上操作完成服务
            ServiceProcessVo processVo = new ServiceProcessVo();
            processVo.setSo_id(so_id);
            processVo.setSpro_state(AppConfig.spro_state_1);
            processVo = serviceService.queryServiceProcess(processVo);
            if (null != processVo && (null != processVo.getSpro_endTime())) {
                processVo.setSpro_endTime(new Date());
                processVo.setSpro_followState(AppConfig.so_state_3230);
                processVo.setSpro_remarks("完成服务");
                serviceService.updateServiceProcess(processVo);
            }

            // 添加记录
            serviceService.addServiceRecordBo(so_id, serviceOrderVo1.getSo_state(), employee.getEm_id(), null);
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
     * 接单/跟进
     *
     * @param so_id
     * @param payObject
     * @param person_id
     * @param money
     * @return
     */
    @RequestMapping("/saveServiceMoneyDetail")
    @ResponseBody
    @SameUrlData
    public String saveServiceMoneyDetail(Integer so_id, Integer ssm_id, Integer payObject, String person_id, String money) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(so_id) || StringUtils.isEmpty(ssm_id) || StringUtils.isEmpty(money)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 添加费用明细
        JSONObject json = JSONObject.parseObject(money);
        ServiceMoneyDetail serviceMoneyDetail = new ServiceMoneyDetail();
        serviceMoneyDetail.setSo_id(so_id);
        serviceMoneyDetail.setSsm_id(ssm_id);
        switch (payObject) {
            case 2:
                serviceMoneyDetail.setEm_id(Integer.valueOf(person_id));
                break;
            case 3:
                serviceMoneyDetail.setUcc_id(Integer.valueOf(person_id));
                break;
            case 4:
                serviceMoneyDetail.setCc_code(person_id);
                break;
            case 5:
                serviceMoneyDetail.setCc_code(person_id);
                break;
            case 6:
                serviceMoneyDetail.setUser_id(Integer.valueOf(person_id));
                break;
        }
        serviceMoneyDetail.setPayObject(payObject);
        serviceMoneyDetail.setSsm_source(json.getString("ssm_source"));
        serviceMoneyDetail.setSsm_univalent(json.getDouble("ssm_univalent"));
        serviceMoneyDetail.setSsm_num(json.getInteger("ssm_num"));
        serviceMoneyDetail.setSsm_money(json.getDouble("ssm_money"));
        serviceService.addMoneyDetail(serviceMoneyDetail);

        msg.put("serviceMoneyDetail", serviceMoneyDetail);
        return msg.toString();
    }

    @RequestMapping("/deleteServiceMoneyDetail")
    @ResponseBody
    public String deleteServiceMoneyDetail(Integer ssd_id) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(ssd_id)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 删除费用明细
        serviceService.deleteMoneyDetial(ssd_id);
        return msg.toString();
    }

    /**
     * 费用明细录入完成
     *
     * @return
     */
    @RequestMapping("/submitMoneyDetial")
    public @ResponseBody
    @SameUrlData
    String submitMoneyDetial(Integer so_id) {
        Msg<String> msg = new Msg<>();
        try {
            if (StringUtils.isEmpty(so_id)) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }

            // 更新订单
            ServiceOrderVo serviceOrderVo = new ServiceOrderVo();
            serviceOrderVo.setSo_id(so_id);
            serviceOrderVo.setSo_state(AppConfig.so_state_3400);
            serviceService.updateServiceOrder(serviceOrderVo);

            UserCenterEmployee employee = AppUtil.getCookieEmployee();
            // 添加服务记录
            serviceService.addServiceRecordBo(serviceOrderVo.getSo_id(), serviceOrderVo.getSo_state(), employee.getEm_id(), null);
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
     * 服务评分
     *
     * @param fraction       评分
     * @param contentMessage 评价内容
     * @param path           图片路劲
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/submitFach")
    @SameUrlData
    public @ResponseBody
    String submitFach(Integer fraction, String contentMessage, String feedback, Integer so_id, String path, String account) throws Exception {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee;
        if (account == null) {
            employee = AppUtil.getCookieEmployee();
        } else {
            employee = employeeService.queryEmployeeInfo(account);
        }
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }

        //
        UserCenterFraction userCenterFraction = new UserCenterFraction();
        userCenterFraction.setUf_fraction(fraction);
        userCenterFraction.setUf_content(contentMessage);
        userCenterFraction.setFeedback(feedback);
        userCenterFraction.setUf_people(employee.getEm_name());
        userCenterFraction.setUf_image(path);
        userCenterFraction.setSo_id(so_id);
        userCenterFraction.setEm_id(employee.getEm_id());
        fractionService.addUserCenterUserFraction(userCenterFraction);

        // 更新订单
        ServiceOrderVo serviceOrderVo = new ServiceOrderVo();
        serviceOrderVo.setSo_id(so_id);
        serviceOrderVo.setSo_state(AppConfig.so_state_4100);
        serviceService.updateServiceOrder(serviceOrderVo);

        // 添加服务记录
        serviceService.addServiceRecordBo(serviceOrderVo.getSo_id(), serviceOrderVo.getSo_state(), employee.getEm_id(), contentMessage);

        return msg.toString();
    }

    /**
     * 新版查询用户是否为在租或在托管客户
     *
     * @return
     * @throws UnsupportedEncodingException
     */
    @RequestMapping("/queryNewHouseInfoByUser")
    @ResponseBody
    public String queryNewHouseInfoByUser(Integer user_id) {
        Msg<Object> msg = new Msg<>();
        if (null != user_id && user_id != 0) {

            UserCenterUserVo centerUserVo = serviceService.queryUserVo(Integer.valueOf(user_id));
            if (!StringUtils.isEmpty(centerUserVo.getUser_cardNumber())) {
                UserCustomer userCustomer = new UserCustomer();
                userCustomer.setCc_cardNum(centerUserVo.getUser_cardNumber());
                userCustomer = customerService.selectCustomerCard(userCustomer);
                if (null == userCustomer) {
                    msg.setCode(201);
                    return msg.toString();
                }

//                List<UserCustomer> customerList = serviceService.queryCustomerByCode(userCustomer.getCc_code());
//                if (null != customerList && !customerList.isEmpty()) {
//                    msg.setCode(200);
//                    msg.setData(customerList);
//                } else {
//                    msg.setCode(201);
//                }
                ContractObjectVo objectVo = new ContractObjectVo();
                objectVo.setCc_code(userCustomer.getCc_code());
                List<ContractObjectVo> objectVoList = serviceService.queryContractCustomerByCode(objectVo);
                if (null != objectVoList && !objectVoList.isEmpty()) {
                    msg.setCode(200);
                    msg.setData(objectVoList);
                } else {
                    msg.setCode(201);
                }

            } else {
                msg.setCode(201);
            }
        } else {
            msg.setCode(201);
        }
        return msg.toString();
    }

    /**
     * 受理人
     *
     * @return
     * @author 陈智颖
     * @date Feb 27, 2017 5:42:19 PM
     */
    @RequestMapping("/queryServiceUccPeople")
    @ResponseBody
    public Map<String, Object> queryServiceUccPeople(Integer p_type, Integer ucc_id, String whereList) {
        Map<String, Object> map = new HashMap<>();
        if (null != p_type && (p_type.intValue() == 1 || p_type.intValue() == 2)) {
            UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
            userCenterEmployee.setWhereList(whereList);
            if (p_type.intValue() == 1) {
                ucc_id = 26;// 客服部ID
            }
            userCenterEmployee.setUcc_id(ucc_id);
            List<UserCenterEmployee> employeeList = serviceService.queryServiceUccPeople(userCenterEmployee);
            map.put("employeeList", employeeList);
        } else if (null != p_type && p_type.intValue() == 3) {
            ServicePersonVo servicePersonVo = new ServicePersonVo();
            servicePersonVo.setParam(whereList);
            servicePersonVo.setStart(0);
            servicePersonVo.setEnd(15);
            List<ServicePersonVo> servicePersonVoList = serviceService.queryServicePerson(servicePersonVo);

            map.put("servicePersonVoList", servicePersonVoList);
        }
        return map;
    }

    /**
     * 查询合查询有效的房东或租客
     *
     * @return
     * @throws UnsupportedEncodingException
     */
    @RequestMapping(value = "/queryServiceOrderByEmId", produces = "text/plain;charset=UTF-8")
    @ResponseBody
    public String queryServiceOrderByEmId(Integer person_type, String em_id, Integer service_id) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(em_id)) {
            msg.setCode(201);
            return msg.toString();
        }

        if (null != person_type && person_type.intValue() == 1 || person_type.intValue() == 2) {
            List<ServiceOrderVo> mdOrderList = serviceService.queryServiceOrderByEmId(Integer.valueOf(em_id));
            msg.setCode(200);
            msg.setData(mdOrderList);
        } else if (person_type == 3) {
            List<ServicePersonVo> personVoList = serviceService.queryServiceOrderBySpId(service_id);
            msg.setCode(200);
            msg.setData(personVoList);
        }

        return msg.toString();
    }

    /**
     * 查询服务费用详情
     *
     * @return
     * @author 申洪喜
     * @date 2017-12-02
     */
    @RequestMapping("/queryMoneyDetial")
    @ResponseBody
    public String queryMoneyDetial(Integer ssm_id) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(ssm_id)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        ServiceMoneyDetail serviceMoneyDetail = new ServiceMoneyDetail();
        serviceMoneyDetail.setSsm_id(ssm_id);
        msg.put("moneyDetailList", serviceService.queryMoneyDetial(serviceMoneyDetail));
        return msg.toString();
    }

    /**
     * 查询房屋合同租客列表
     *
     * @return
     */
    @RequestMapping("/queryAllContractHouse")
    @ResponseBody
    public String queryAllHOuseInfoList(String where, int pageNo) {
        Msg<Object> msg = new Msg<>();
        Pagination<ContractObjectVo> voPagination = new Pagination<>(pageNo, 10);
        ContractObjectVo objectVo = new ContractObjectVo();
        objectVo.setWhere(where);
        voPagination.setT(objectVo);

        List<ContractObjectVo> houseCustomerList = serviceService.queryAllContractHouse(voPagination);
        int totalRecords = serviceService.queryAllContractHouseCount(voPagination);
        voPagination.setList(houseCustomerList, totalRecords);
        msg.setData(voPagination);
        return msg.toString();
    }

    /**
     * 查询合查询有效的房东、租客、管家、门店、用户
     *
     * @return
     * @throws UnsupportedEncodingException
     */
    @RequestMapping("/queryPayObjectByHiCode")
    @ResponseBody
    public String queryPayObjectByHiCode(String hi_code, Integer so_payObject) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(hi_code) || StringUtils.isEmpty(so_payObject)) {
            msg.setCode(201);
            return msg.toString();
        }
        if (so_payObject.intValue() != 6) {
            ContractObjectVo objectVo = new ContractObjectVo();
            objectVo.setHi_code(hi_code);
            List<ContractObjectVo> objectVoList = serviceService.queryPayObjectByHiCode(objectVo);
            msg.setCode(200);
            msg.setData(objectVoList);
        }

        return msg.toString();
    }

    /**
     * ERP_PC添加现场问题
     *
     * @return
     * @throws UnsupportedEncodingException
     */
    @RequestMapping("/addServiceProblem")
    @ResponseBody
    public String addServiceProblem(Integer so_id, String spp_content) {
        Msg<Object> msg = new Msg<>();
        if (null == so_id || StringUtils.isEmpty(spp_content)) {
            msg.setMsg(201, "参数为空异常");
            return msg.toString();
        }
        try {
            UserCenterEmployee employee = AppUtil.getCookieEmployee();
            ServiceProcessProblemVo processProblemVo = new ServiceProcessProblemVo();
            processProblemVo.setSo_id(so_id);
            processProblemVo.setEm_id(employee.getEm_id());
            processProblemVo.setSpp_content(spp_content);
            serviceService.addserviceProcessProblem(processProblemVo);

            ServiceOrderVo serviceOrderVo = new ServiceOrderVo();
            serviceOrderVo.setSo_id(so_id);
            serviceOrderVo.setSo_state(AppConfig.so_state_3200);
            serviceService.updateServiceOrderInfoById(serviceOrderVo, "");

            ServiceProcessVo serviceProcessVo = new ServiceProcessVo();
            serviceProcessVo.setSo_id(so_id);
            serviceProcessVo.setSpro_state(AppConfig.spro_state_1);
            serviceProcessVo = serviceService.queryServiceProcess(serviceProcessVo);
            serviceProcessVo.setSpro_followState(AppConfig.so_state_3203);
            serviceService.updateServiceProcess(serviceProcessVo);
        } catch (Exception e) {
            msg.setCode(401);
            msg.setMsg(401, "提交问题失败");
            return msg.toString();
        }

        return msg.toString();
    }

    /**
     * 服务项目查询
     *
     * @param md_id
     * @return
     * @author shenhx
     * @date Jun 3, 2017 6:00:40 PM
     */
    @RequestMapping("/queryServiceProject")
    @ResponseBody
    public Map<String, Object> queryServiceProject() {
        Map<String, Object> map = new HashMap<>();
        List<ServiceMessage> serviceList = serviceService.selectServiceList();
        List<ServiceType> typeList = new ArrayList<>();

        for (ServiceMessage serviceMessage: serviceList) {
            ServiceType serviceType = new ServiceType();
            serviceType.setSm_id(serviceMessage.getSm_id());
            typeList = serviceService.selectServiceTypeList(serviceType);
            break;
        }
        List<ContractType> contractTypeList = contractService.selectContractTypeByParentId(EnumTypeStatus.TYPE_SERVICE_APPLY_TYPE.getId());
        map.put("contractTypeList", contractTypeList);
        map.put("serviceList", serviceList);
        map.put("typeList", typeList);
        UserCenterEmployee centerEmployee = AppUtil.getCookieEmployee();
        map.put("employee", centerEmployee);
        return map;
    }

    /**
     * 查询外协人员类型
     *
     * @author tanglei
     */
    @RequestMapping("/queryOutsourceFromDict")
    @ResponseBody
    public Map<String, Object> queryOutsourceFromDict(HttpServletRequest req, HttpServletResponse resp) {
        Map<String, Object> map = new HashMap<>();

        List<UserDictionary> list = userDictionaryService.queryDictionaryByPropertyId("outsource_type");   //  送审人
        map.put("outsourceList", list);
        return map;
    }

    /**
     * 添加外协人员
     *
     * @author tanglei
     */
    @RequestMapping("/saveOutsource")
    @ResponseBody
    public Map<String, Object> saveOutsource(Integer sp_type, String sp_name, String sp_phone, Integer sp_sex) {
        Map<String, Object> map = new HashMap<>();
        ServicePersonVo personVo = serviceService.addServicePerson(null, sp_name, sp_phone, sp_type, sp_sex);
        map.put("code", null == personVo ? 401 : 200);
        return map;
    }

    /**
     * 删除服务费用记录及取消对应的订单
     *
     * @author tanglei
     */
    @RequestMapping("/deleteServiceMoney")
    @ResponseBody
    public Map<String, Object> deleteServiceMoney(Integer ssm_id) throws AppException {
        Map<String, Object> map = new HashMap<>();
        if (null == ssm_id) {
            throw new AppException("参数为空异常");
        }
        int result = serviceService.deleteServiceMoney(ssm_id);
        map.put("code", result > 0 ? 200 : 400);
        return map;
    }

    /**
     * 初始化服务费
     *
     * @return
     * @throws AppException
     */
    @RequestMapping("/initServiceCharge")
    @ResponseBody
    public Map<String, Object> initServiceCharge(String dateYear) throws AppException {
        Map<String, Object> map = new HashMap<>();
        List<ContractInfoVo> contractInfoVoList = serviceService.queryContractCharge(dateYear);
        if (null != contractInfoVoList) {
            for (ContractInfoVo infoVo: contractInfoVoList) {
                ServiceCharge serviceCharge = new ServiceCharge();
                if ("托管合同".equals(infoVo.getContractObject_Type())) {
                    double totalGuaranteeCost = 0.0;
                    if (!StringUtils.isEmpty(infoVo.getContractBody_GuaranteeCost())) {
                        String[] guaranteeCostArr = infoVo.getContractBody_GuaranteeCost().split("\\|");
                        for (String aGuaranteeCostArr: guaranteeCostArr) {
                            if (Double.parseDouble(aGuaranteeCostArr) > 0) {
                                totalGuaranteeCost += Double.parseDouble(aGuaranteeCostArr);
                            }
                        }
                    }
                    serviceCharge.setInit_serveMoney(totalGuaranteeCost);
                    serviceCharge.setUsed_serveMoney(0.0);
                    serviceCharge.setSurplus_serveMoney(totalGuaranteeCost);
                    serviceCharge.setAvailable_serveMoney(totalGuaranteeCost);
                    serviceCharge.setServeType(1);// 包修费
                } else if ("租赁合同".equals(infoVo.getContractObject_Type())) {
                    double serviceMoney = infoVo.getContractBody_Service().doubleValue();
                    serviceCharge.setInit_serveMoney(serviceMoney >= 300 ? 300 : serviceMoney);
                    serviceCharge.setUsed_serveMoney(0.0);
                    serviceCharge.setSurplus_serveMoney(serviceMoney >= 300 ? 300 : serviceMoney);
                    serviceCharge.setAvailable_serveMoney(serviceMoney >= 300 ? 300 : serviceMoney);
                    serviceCharge.setServeType(2);// 服务费
                }
                serviceCharge.setCon_code(infoVo.getContractObject_Code());
                serviceCharge.setCc_code(infoVo.getContractObject_1st());
                serviceCharge.setHi_code(infoVo.getHi_code());
                serviceCharge.setEffective_date(infoVo.getContractObject_Date());
                serviceCharge.setExpiry_date(infoVo.getContractObject_DeadlineTime());
                serviceChargeService.appAddServiceCharge(serviceCharge);
            }
        }
        return map;
    }

    /**
     * 同步老版一月订单
     *
     * @return
     * @throws AppException
     */
    @RequestMapping("/initServiceOrder")
    @ResponseBody
    public Map<String, Object> initServiceOrder(String dateYear) throws AppException {
        Map<String, Object> map = new HashMap<>();
        int count = 1;
        List<MaintenanceDeclaration> declarationList = serviceService.initServiceOrder();
        for (MaintenanceDeclaration declaration: declarationList) {
            System.out.println("md_id=" + declaration.getMd_id() + "    第 " + (count++) + " 条");
            ServiceOrderVo serviceOrder = new ServiceOrderVo();
            serviceOrder.setSo_code("SON" + declaration.getMd_number() + AppUtil.getRandNum(4));
            serviceOrder.setSo_printCode(declaration.getMd_number());
            serviceOrder.setSo_type(Integer.valueOf(declaration.getMd_type()));
            serviceOrder.setSo_problem(declaration.getMd_problem());
            serviceOrder.setSo_targetTime(declaration.getMd_time());
            serviceOrder.setSo_contractor(declaration.getMd_contactpeople());
            serviceOrder.setSo_contractPhone(declaration.getMd_contactPhone());
            serviceOrder.setSo_handler(179);// 统一设置为秦晓君
            serviceOrder.setSo_state(AppConfig.so_state_4100);
            serviceOrder.setSo_persontype(1);
            serviceOrder.setSo_remarks(declaration.getMd_remark());
            serviceOrder.setSo_createTime(declaration.getApply_time());
            serviceOrder.setContractObject_Code(declaration.getContractObject_Code());
            serviceOrder.setSo_totalMoney(declaration.getMdg_money());

            if ("外部申请".equals(declaration.getMd_source())) {
                serviceOrder.setSo_source(AppConfig.so_source_22);
                serviceOrder.setSo_applicantUser(declaration.getUser_id());
            } else {
                Integer agenter = declaration.getMd_agentApplyer();
                if (null != agenter && (agenter.intValue() == 179 || agenter.intValue() == 151)) {
                    serviceOrder.setSo_source(AppConfig.so_source_11);
                } else {
                    serviceOrder.setSo_source(AppConfig.so_source_12);
                }
                serviceOrder.setSo_applicantEmp(agenter);
            }

            String hi_code = "";
            String house_langlat = "";
            String house_address = "";
            List<MaintenancePoint> pointList = serviceService.selectMaintenancePointById(declaration.getMd_id());
            if (null != pointList) {
                MaintenancePoint point = pointList.get(0);
                hi_code = point.getHi_code();
                house_langlat = point.getHouse_longlat();
                house_address = point.getHouse_address();
            }
            serviceOrder.setHi_code(hi_code);
            serviceOrder.setSo_targetPoint(house_langlat);
            serviceOrder.setSo_targetAddress(house_address);

            // 添加房屋当前所属门店
            if (!StringUtils.isEmpty(hi_code)) {
                HousePositionCompanyVo positionCompanyVo = new HousePositionCompanyVo();
                positionCompanyVo.setHi_code(hi_code);
                positionCompanyVo = houseLibraryService.queryHouseCompanyInfo(positionCompanyVo);
                if (null != positionCompanyVo) {
                    serviceOrder.setSo_department(positionCompanyVo.getUcc_id());
                }
            }

            // 服务跟进信息
            MaintenanceTracks tracks = handleService.selectMaintenanceTracks(declaration.getMd_id());
            ServicePersonVo servicePersonVo = serviceService.queryServicePersonById(tracks.getEm_id());
            serviceOrder.setSo_currentCharger(servicePersonVo.getSp_id());

            List<ServiceMoney> serviceMonieList = serviceService.queryServiceMoneyList(declaration.getMd_id());
            if (null != serviceMonieList && !serviceMonieList.isEmpty()) {
                ServiceMoney serviceMoney = serviceMonieList.get(0);
                if (serviceMoney.getPayObject().intValue() == 1) {
                    if (!StringUtils.isEmpty(serviceMoney.getCc_code())) {
                        ContractObjectVo contractObjectVo = new ContractObjectVo();
                        contractObjectVo.setHi_code(hi_code);
                        contractObjectVo.setContractObject_1st(serviceMoney.getCc_code());
                        contractObjectVo = serviceService.queryContractType(contractObjectVo);
                        if (null != contractObjectVo && "托管合同".equals(contractObjectVo.getContractObject_Type())) {
                            serviceOrder.setSo_payObject(5);
                        } else if (null != contractObjectVo && "租赁合同".equals(contractObjectVo.getContractObject_Type())) {
                            serviceOrder.setSo_payObject(4);
                        }
                        UserCustomer userCustomer = new UserCustomer();
                        userCustomer.setCc_code(serviceMoney.getCc_code());
                        UserCustomer customerCode = customerService.selectCustomerCode(userCustomer);
                        serviceOrder.setSo_payName(customerCode.getCc_name());
                        serviceOrder.setSo_payPhone(customerCode.getCcp_phone());
                        serviceOrder.setSo_payNameNew(customerCode.getCc_name());
                        serviceOrder.setSo_payPhoneNew(customerCode.getCcp_phone());
                    } else if (!StringUtils.isEmpty(serviceMoney.getUser_id())) {
                        serviceOrder.setSo_payObject(6);
                        UserCenter userCenter = employeeService.selectUserCenter(serviceMoney.getUser_id());
                        serviceOrder.setSo_payName(userCenter.getUser_phone());
                        serviceOrder.setSo_payPhone(userCenter.getUser_phone());
                        serviceOrder.setSo_payNameNew(userCenter.getUser_phone());
                        serviceOrder.setSo_payPhoneNew(userCenter.getUser_phone());
                    }
                } else {
                    serviceOrder.setSo_payObject(serviceMoney.getPayObject());
                    if (serviceMoney.getPayObject().intValue() == 2) {
                        UserCenterEmployee centerEmployee = new UserCenterEmployee();
                        centerEmployee.setEm_id(serviceMoney.getEm_id());
                        centerEmployee = employeeService.queryEmployeeInfo(centerEmployee);
                        serviceOrder.setSo_payName(centerEmployee.getEm_name());
                        serviceOrder.setSo_payPhone(centerEmployee.getEm_phone());
                        serviceOrder.setSo_payNameNew(centerEmployee.getEm_name());
                        serviceOrder.setSo_payPhoneNew(centerEmployee.getEm_phone());
                    } else if (serviceMoney.getPayObject().intValue() == 3) {
                        Company company = authorizationService.getCompanyById(serviceMoney.getUcc_id());
                        serviceOrder.setSo_payName(company.getUcc_name());
                        serviceOrder.setSo_payPhone(company.getUcc_phone());
                        serviceOrder.setSo_payNameNew(company.getUcc_name());
                        serviceOrder.setSo_payPhoneNew(company.getUcc_phone());
                    }
                }
            }
            // 添加服务订单
            serviceService.addServiceOrder(serviceOrder);

            // 添加订单详情
            ServiceOrderInfoVo serviceOrderInfoVo = new ServiceOrderInfoVo();
            serviceOrderInfoVo.setSo_id(serviceOrder.getSo_id());
            serviceOrderInfoVo.setSoin_createTime(declaration.getApply_time());
            for (MaintenancePoint maintenancePoint: pointList) {
                if (maintenancePoint.getP_type().intValue() == 2) {
                    serviceOrderInfoVo.setSoin_moveStartAddress(maintenancePoint.getHouse_address());
                    serviceOrderInfoVo.setSoin_moveStartPoint(maintenancePoint.getHouse_longlat());
                } else if (maintenancePoint.getP_type().intValue() == 3) {
                    serviceOrderInfoVo.setSoin_moveEndAddress(maintenancePoint.getHouse_address());
                    serviceOrderInfoVo.setSoin_moveEndPoint(maintenancePoint.getHouse_longlat());
                }
            }
            serviceService.addServiceOrderInfoApp(serviceOrderInfoVo);

            // 添加服务订单项目
            ServiceOrderItemVo serviceOrderItemVo = new ServiceOrderItemVo();
            serviceOrderItemVo.setSo_id(serviceOrder.getSo_id());
            serviceOrderItemVo.setSt_id_b(Integer.valueOf(declaration.getMd_applyType()));
            serviceOrderItemVo.setSoit_done(2);
            serviceOrderItemVo.setSoit_createTime(declaration.getApply_time());
            serviceService.addServiceOrderItemInfo(serviceOrderItemVo);

            // 添加订单处理过程
            ServiceProcessVo serviceProcessVo = new ServiceProcessVo();
            serviceProcessVo.setSo_id(serviceOrder.getSo_id());
            serviceProcessVo.setSpro_startTime(tracks.getMtk_start_time());
            serviceProcessVo.setSpro_endTime(tracks.getMtk_real_time());
            serviceProcessVo.setSp_id(servicePersonVo.getSp_id());
            serviceProcessVo.setSpro_state(1);
            serviceProcessVo.setSpro_followState(3230);
            serviceProcessVo.setSpro_remarks("完成服务");
            serviceProcessVo.setSpro_createTime(tracks.getMtk_createTime());
            serviceService.addServiceProcess(serviceProcessVo);

            // 添加现场问题
            Problem problem = new Problem();
            problem.setMd_id(declaration.getMd_id());
            List<Problem> problemList = serviceService.selectProblem(problem);
            if (null != problemList) {
                for (Problem problem1: problemList) {
                    ServiceProcessProblemVo serviceProcessProblemVo = new ServiceProcessProblemVo();
                    serviceProcessProblemVo.setSo_id(serviceOrder.getSo_id());
                    serviceProcessProblemVo.setEm_id(tracks.getEm_id());
                    serviceProcessProblemVo.setSpp_item("正常处理");
                    serviceProcessProblemVo.setSpp_content(problem1.getMdp_content());
                    serviceProcessProblemVo.setSpp_createTime(problem1.getMdp_date());
                    serviceProcessProblemVo.setSsp_type(2);
                    serviceService.addserviceProcessProblem(serviceProcessProblemVo);
                }
            }

            // 添加附件
            List<MaintenanceImage> imageList = serviceService.selectMaintenanceImage(declaration.getMd_id());
            if (null != imageList) {
                for (MaintenanceImage image: imageList) {
                    ServiceImageVo imageVo = new ServiceImageVo();
                    imageVo.setSo_id(serviceOrder.getSo_id());
                    imageVo.setSi_type(image.getMi_type());
                    imageVo.setSi_path(image.getMi_path());
                    imageVo.setSi_createTime(new Date());
                    serviceService.addServiceImage(imageVo);
                }
            }

            // 服务评分
            UserCenterFraction userCenterUserFraction = new UserCenterFraction();
            userCenterUserFraction.setMd_id(declaration.getMd_id());
            userCenterUserFraction = fractionService.selectUserCenterUserFractiony(userCenterUserFraction);
            userCenterUserFraction.setSo_id(serviceOrder.getSo_id());
            fractionService.addUserCenterUserFraction(userCenterUserFraction);

            // 添加费用记录
            for (ServiceMoney money: serviceMonieList) {
                ServiceMoney serviceMoney = new ServiceMoney();
                serviceMoney.setSo_id(serviceOrder.getSo_id());
                if (money.getPayObject().intValue() == 1) {
                    if (!StringUtils.isEmpty(money.getCc_code())) {
                        ContractObjectVo contractObjectVo = new ContractObjectVo();
                        contractObjectVo.setHi_code(hi_code);
                        contractObjectVo.setContractObject_1st(money.getCc_code());
                        contractObjectVo = serviceService.queryContractType(contractObjectVo);
                        if (null != contractObjectVo && "托管合同".equals(contractObjectVo.getContractObject_Type())) {
                            serviceMoney.setPayObject(5);
                        } else if (null != contractObjectVo && "租赁合同".equals(contractObjectVo.getContractObject_Type())) {
                            serviceMoney.setPayObject(4);
                        }
                        serviceMoney.setCc_code(money.getCc_code());
                    } else if (!StringUtils.isEmpty(money.getUser_id())) {
                        serviceMoney.setPayObject(6);
                        serviceMoney.setUser_id(money.getUser_id());
                    }
                } else if (money.getPayObject().intValue() == 2) {
                    serviceMoney.setPayObject(2);
                    serviceMoney.setEm_id(money.getEm_id());
                } else if (money.getPayObject().intValue() == 3) {
                    serviceMoney.setPayObject(3);
                    serviceMoney.setUcc_id(money.getUcc_id());
                }
                serviceMoney.setSsm_source(money.getSsm_source());
                serviceMoney.setSsm_univalent(money.getSsm_univalent());
                serviceMoney.setSsm_money(money.getSsm_money());
                serviceMoney.setSsm_num(money.getSsm_num());
                serviceMoney.setIs_order(money.getIs_order());
                serviceMoney.setSsm_beizhu(money.getSsm_beizhu());
                serviceMoney.setSsm_date(money.getSsm_date());
                serviceMoney.setMd_id(money.getMd_id());
                serviceMoney.setMdg_moneyCode(money.getMdg_moneyCode());
                serviceMoney.setSsm_company(money.getSsm_company());
                serviceMoneyService.addServiceMoney(serviceMoney);

            }

            // 添加费用明细
            List<ServiceMoneyDetail> moneyDetails = serviceService.queryMoneyDetailList(declaration.getMd_id());
            if (null != moneyDetails) {
                for (ServiceMoneyDetail moneyDetail: moneyDetails) {
                    moneyDetail.setSo_id(serviceOrder.getSo_id());
                    serviceService.addMoneyDetail(moneyDetail);
                }
            }

            // 订单关系
            BillContractOrderMD billContractOrderMD = new BillContractOrderMD();
            billContractOrderMD.setMd_id(declaration.getMd_id());
            List<BillContractOrderMD> orderMDS = serviceService.queryContractOrderMDList(billContractOrderMD);
            if (null != orderMDS && !orderMDS.isEmpty()) {
                for (BillContractOrderMD billMD: orderMDS) {
                    billMD.setSo_id(serviceOrder.getSo_id());
                    handleService.saveOrderMD(declaration);
                }
            }

            serviceService.addServiceRecordBo(serviceOrder.getSo_id(), AppConfig.so_state_1100, 1, null);
            serviceService.addServiceRecordBo(serviceOrder.getSo_id(), AppConfig.so_state_2100, 1, null);
            serviceService.addServiceRecordBo(serviceOrder.getSo_id(), AppConfig.so_state_2200, 1, null);
            serviceService.addServiceRecordBo(serviceOrder.getSo_id(), AppConfig.so_state_3100, 1, null);
            serviceService.addServiceRecordBo(serviceOrder.getSo_id(), AppConfig.so_state_3200, 1, null);
            serviceService.addServiceRecordBo(serviceOrder.getSo_id(), AppConfig.so_state_3210, 1, null);
            serviceService.addServiceRecordBo(serviceOrder.getSo_id(), AppConfig.so_state_3212, 1, null);
            serviceService.addServiceRecordBo(serviceOrder.getSo_id(), AppConfig.so_state_3220, 1, null);
            serviceService.addServiceRecordBo(serviceOrder.getSo_id(), AppConfig.so_state_3230, 1, null);
            serviceService.addServiceRecordBo(serviceOrder.getSo_id(), AppConfig.so_state_3232, 1, null);
            serviceService.addServiceRecordBo(serviceOrder.getSo_id(), AppConfig.so_state_3300, 1, null);
            serviceService.addServiceRecordBo(serviceOrder.getSo_id(), AppConfig.so_state_3400, 1, null);
            serviceService.addServiceRecordBo(serviceOrder.getSo_id(), AppConfig.so_state_4100, 1, null);

        }

        return map;
    }

}
