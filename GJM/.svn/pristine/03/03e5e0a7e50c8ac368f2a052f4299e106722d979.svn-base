package com.gjp.controller;

import com.gjp.csrf.RefreshCSRFToken;
import com.gjp.csrf.VerifyCSRFToken;
import com.gjp.model.*;
import com.gjp.service.*;
import com.gjp.token.SameUrlData;
import com.gjp.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author 陈智颖
 * @create 2018-01-29 上午10:08
 **/
@Controller
@RequestMapping("/appService")
public class AppServiceController {

    // 内部人员
    @Autowired
    private UserCenterEmployeeService employeeService;

    // 服务
    @Resource
    private ServiceService serviceService;

    // 评分
    @Resource
    private UserCenterUserFractionService fractionService;

    // 合同管理
    @Resource
    private ContractService contractService;

    // 服务清单
    @Resource
    private ServiceMoneyService serviceMoneyService;

    @Resource
    private HandleService handleService;

    @Resource
    private OrderService orderService;

    /**
     * 服务申请类型选择
     *
     * @return
     * @author wxr
     */
    @RefreshCSRFToken
    @RequestMapping(method = RequestMethod.GET, value = "/serviceTypeSelect")
    public String serviceTypeSelect() {
        return "/appPage/service/serviceTypeSelect";
    }

    /**
     * 服务申请
     *
     * @return
     * @author wxr
     */
    @RefreshCSRFToken
    @RequestMapping("/serviceApply")
    public String serviceApply() {
        return "/appPage/service/serviceApply";
    }


    /**
     * 服务搜索房源
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
     * 【服务管理】服务订单
     *
     * @return
     * @author 陈智颖
     * @date Mar 31, 2017 7:31:27 PM
     */
    @RefreshCSRFToken
    @RequestMapping(method = RequestMethod.GET, value = "/serviceContent")
    public String serviceContent() {
        return "/appPage/serviceContent";
    }

    /**
     * 服务订单
     *
     * @return
     */
    @RefreshCSRFToken
    @RequestMapping(method = RequestMethod.GET, value = "/serviceOrderPay")
    public String serviceOrderPay() {
        return "/appPage/service/serviceOrderPay";
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
    @RequestMapping("/appServiceList")
    @ResponseBody
    public Map<String, Object> appServiceList(Integer pageNo, Integer em_id, String mdg_state, String where) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Map<String, Object> map = new HashMap<>();
        pageNo = (pageNo - 1) * 10;
        ServiceOrderVo serviceOrderVo = new ServiceOrderVo();
        serviceOrderVo.setPageNo(pageNo);
        serviceOrderVo.setMdg_state(mdg_state);
        PersionVo persionVo = new PersionVo();
        persionVo.setEm_id(em_id);
        List<PersionVo> persionVos = employeeService.selectSaleCompanyPersion(persionVo);
        ServicePersonVo servicePersonVo = serviceService.queryServicePersonVo(em_id);
        for (PersionVo persionVo1: persionVos) {
            if (persionVo1.getUcc_id() == 26) {
                if (!StringUtils.isEmpty(persionVo1.getUcp_name()) && ("客服经理".equals(persionVo1.getUcp_name()) || "客服专员".equals(persionVo1.getUcp_name()))) {
                    serviceOrderVo.setType("noLimit");// 不做限制
                } else {
                    serviceOrderVo.setType("person");
                    serviceOrderVo.setSo_currentCharger(em_id);
                }

            } else if (persionVo1.getUcc_phone() == persionVo1.getEm_phone()) {
                serviceOrderVo.setSo_department(persionVo1.getUcc_id());
                serviceOrderVo.setType("all");
            } else {
                serviceOrderVo.setType("my");
                serviceOrderVo.setSo_applicantEmp(em_id);
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
    @RequestMapping(method = RequestMethod.POST, value = "/saveServiceOrderInfo")
    @ResponseBody
    @SameUrlData
    @VerifyCSRFToken
    public String saveServiceOrderInfo(ServiceOrderVo serviceOrderVo, String soTargetTime) throws Exception {
        Msg<Object> msg = new Msg<>();
        serviceOrderVo.setSo_printCode(new Date().getTime() + serviceOrderVo.getSo_applicantEmp() + "");
        serviceOrderVo.setSo_applicantEmp(serviceOrderVo.getSo_applicantEmp());
        serviceOrderVo.setSo_targetTime(DataUtil.StrToDate(soTargetTime));

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
            if (serviceOrderVo.getSo_type() == 6) {
                serviceOrderVo.setStartPoint(serviceOrderVo.getSoin_moveStartPoint());
                serviceOrderVo.setEndPoint(serviceOrderVo.getSoin_moveEndPoint());
            } else {
                serviceOrderVo.setEndPoint(serviceOrderVo.getSo_targetPoint());
            }

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

            //当前服务订单是否已生成支付订单
            ServiceMoney serviceMoney = new ServiceMoney();
            serviceMoney.setSo_id(serviceOrderVo.getSo_id());
            serviceMoney.setPayObject(serviceOrderVo.getSo_payObject());
            ServiceMoney serviceMoney1 = serviceService.queryServiceMoney(serviceMoney);
            map.put("serviceMoney", serviceMoney1);

            //根据so_id与当订单前付费对象查询支付订单
            OrderVo orderVo = new OrderVo();
            orderVo.setSo_id(so_id);
            orderVo.setTrade_object(serviceOrderVo.getSo_payObject());
            List<OrderVo> orderVos = serviceService.queryPayOrderAndServiceOrder(orderVo);
            String order_sn = null;
            String ucc_order_sn = null;
            for (OrderVo order: orderVos) {
                map.put("payOrder", order);
                if (order.getTrade_object() == 3) {
                    ucc_order_sn = order.getOrder_sn();
                    map.put("ucc_order_sn", ucc_order_sn);
                } else {
                    order_sn = order.getOrder_sn();
                    map.put("order_sn", order_sn);
                }
            }
            if (order_sn == null) {
                map.put("order_sn", ucc_order_sn);
            }
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
    @RequestMapping(method = RequestMethod.POST, value = "/serviceTracks")
    @ResponseBody
    @VerifyCSRFToken
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
    @ResponseBody
    public String queryServicePhone(String hi_code, Integer so_id) {
        Msg<Object> msg = new Msg<>();
        ViewBusinessContractVo contractServiceOft = contractService.selectContractObjectByCNo(new ViewBusinessContractVo() {{
            setHi_code(hi_code);
            setContractObject_OptionState(AppConfig.contract_optionstate_106);
            setContractObject_Type("托管合同");
        }});

        ViewBusinessContractVo contractServiceOfz = contractService.selectContractObjectByCNo(new ViewBusinessContractVo() {{
            setHi_code(hi_code);
            setContractObject_OptionState(AppConfig.contract_optionstate_106);
            setContractObject_Type("租赁合同");
        }});

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
    @RefreshCSRFToken
    @RequestMapping(method = RequestMethod.GET, value = "/sceneFeedback")
    public String sceneFeedback() {
        return "/appPage/service/sceneFeedback";
    }

    /**
     * 新版添加反馈
     *
     * @return
     * @作者 wxr
     */
    @RefreshCSRFToken
    @RequestMapping(method = RequestMethod.GET, value = "/addFeedback")
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
     * 二维码扫码支付
     *
     * @return
     * @author 陈智颖
     * @date Apr 7, 2017 9:39:56 AM
     */
    @RequestMapping("/rqcodeImage")
    public String rqcodeImage() {
        return "/appPage/payMoney";
    }

    /**
     * 提交确认完成
     *
     * @param dataStr
     * @param em_id
     * @return
     */
    @RequestMapping(method = RequestMethod.POST, value = "/submitSceneFeedback")
    @ResponseBody
    @VerifyCSRFToken
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
    @RequestMapping(method = RequestMethod.POST, value = "/addServiceFeedback")
    @ResponseBody
    @VerifyCSRFToken
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
    @RefreshCSRFToken
    @RequestMapping(method = RequestMethod.GET, value = "/serviceMoney")
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
    @RequestMapping(method = RequestMethod.POST, value = "/addServiceMoneyApp")
    @ResponseBody
    @VerifyCSRFToken
    public String addServiceMoneyApp(HttpServletRequest request, Integer so_id, Integer emId, Double so_totalMoney, ServiceMoney money, String payId, Integer payWay, String so_payNameNew, String so_payPhoneNew) {
        Msg<Object> msg = new Msg<>();
        try {
            if (StringUtils.isEmpty(so_id) || StringUtils.isEmpty(emId)) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }

            int channel = AppConfig.channel_erp_app;

            msg = serviceService.addServiceMoneyAppService(so_id, emId, channel, so_totalMoney, money, payId, payWay, request, so_payNameNew, so_payPhoneNew);
            msg.setMsg("生成服务订单成功");
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }


    /**
     * 服务费用订单详情
     *
     * @param so_id
     * @return
     */
    @RequestMapping("/serviceOrderPayInfo")
    @ResponseBody
    public String serviceOrderPayInfo(Integer so_id, String order_sn) {
        Msg<Object> msg = new Msg<>();

        if (so_id == null || order_sn == null) {
            msg.setCode(401);
            msg.setMsg("参数错误");
            return msg.toString();
        }
        try {
            ServiceOrderVo serviceOrder = serviceService.selectServiceOrderInfoById(so_id);

            ServiceOrderItemVo serviceOrderItemVo = new ServiceOrderItemVo();
            serviceOrderItemVo.setSo_id(so_id);
            //服务订单项目
            List<ServiceOrderItemVo> serviceOrderItemVos = serviceService.selectServiceOrderItem(serviceOrderItemVo);

            ServiceMoney serviceMoney = new ServiceMoney();
            serviceMoney.setPayObject(serviceOrder.getSo_payObject());
            serviceMoney.setSo_id(serviceOrder.getSo_id());
            ServiceMoney serviceMoney1 = serviceService.queryServiceMoney(serviceMoney);
            List<OrderDetailVo> orderDetail = orderService.queryOrderDetailList(order_sn);
            OrderVo order = orderService.queryOrder(order_sn);

            msg.put("serviceOrder", serviceOrder);
            msg.put("serviceMoney", serviceMoney1);
            msg.put("serviceOrderItem", serviceOrderItemVos);
            msg.put("orderDetail", orderDetail);
            msg.put("order", order);
        } catch (Exception e) {
            msg.setCode(401);
            msg.setMsg("请联系管理员");
            e.printStackTrace();
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
    @RequestMapping(method = RequestMethod.POST, value = "/updateServiceMoney")
    @ResponseBody
    @VerifyCSRFToken
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
    @RequestMapping("/insertServiceImage")
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


    /** =======================================旧版服务(后期废弃)=============================================== **/
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
     * 老版本【服务管理】服务订单
     *
     * @return
     */
    @RequestMapping("/serviceContentOld")
    public String serviceContentOld() {
        return "appPage/serviceContentOld";
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
     * 老版本【服务管理】服务费用
     *
     * @return
     */
    @RequestMapping("/serviceMoneyOld")
    public String serviceMoneyOld() {
        return "appPage/service/serviceMoneyOld";
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
    @ResponseBody
    public Map<String, Object> serviceList(HttpServletRequest request, Integer pageNo, String type, Integer em_id, String where, String mdg_state) {
        Map<String, Object> map = new HashMap<>();

        pageNo = (pageNo - 1) * 10;
        MaintenanceDeclaration declaration = new MaintenanceDeclaration();
        declaration.setPageNo(pageNo);
        declaration.setWhere(where);
        if (type == null || type.equals("all")) {
        } else {
            declaration.setEm_id(em_id);
        }
        PersionVo persionVo = new PersionVo();
        persionVo.setEm_id(em_id);
        List<PersionVo> persionVos = employeeService.selectSaleCompanyPersion(persionVo);
        for (PersionVo persionVo1: persionVos) {
            if (persionVo1.getUcp_name().contains("保洁") || persionVo1.getUcp_name().contains("维修")) {
                declaration.setType("person");
                declaration.setEm_id(em_id);
            } else if (persionVo1.getUcc_phone() == persionVo1.getEm_phone()) {
                declaration.setUcc_id(persionVo1.getUcc_id());
            } else if (persionVo1.getUcp_name().equals("客服专员")) {
            } else {
                declaration.setType("my");
                declaration.setEm_id(em_id);
            }
        }
        declaration.setMdg_state(mdg_state);
        List<MaintenanceDeclaration> services = handleService.selectServicesApp(declaration);
        List<ServiceVo> serviceVos = new ArrayList<>();
        for (MaintenanceDeclaration maintenanceDeclaration: services) {
            ServiceVo serviceVo = new ServiceVo();
            serviceVo.setSo_id(maintenanceDeclaration.getMd_id());
            serviceVo.setSo_targetAddress(maintenanceDeclaration.getHouse_address());
            serviceVo.setSm_name(maintenanceDeclaration.getSm_name());
            serviceVo.setSo_problem(maintenanceDeclaration.getMd_problem());
            serviceVo.setSo_contractor(maintenanceDeclaration.getMd_contactpeople());
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            if (maintenanceDeclaration.getMd_time() != null) {
                serviceVo.setSo_createTimeStr(sdf.format(maintenanceDeclaration.getMd_time()));
            }
            serviceVo.setSo_state_str(maintenanceDeclaration.getMd_state());
            serviceVo.setSo_state_color("#F9A755");
            serviceVo.setOrderPerson(maintenanceDeclaration.getMd_contactpeople());
            serviceVo.setSt_name_b(maintenanceDeclaration.getSt_name() == null ? "" : maintenanceDeclaration.getSt_name());
            serviceVos.add(serviceVo);
        }
        if (serviceVos.isEmpty()) {
            map.put("code", 401);
            if (pageNo == 0) {
                map.put("msg", "数据为空");
            } else {
                map.put("msg", "没有更多数据");
            }
        } else {
            map.put("code", 200);
            map.put("data", serviceVos);
        }
        return map;
    }
}
