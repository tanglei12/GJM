package com.gjp.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.gjp.dao.BillContractBillDao;
import com.gjp.dao.BillContractOrderDao;
import com.gjp.dao.OrderDao;
import com.gjp.dao.ServiceDao;
import com.gjp.model.*;
import com.gjp.model.Company;
import com.gjp.util.*;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 服务service
 *
 * @author zoe
 */
@Service
public class ServiceService {

    // 服务管理
    @Resource
    private ServiceDao serviceDao;
    // 财务管理
    @Resource
    private FinanceManageService financeManageService;
    // 服务清单
    @Resource
    private ServiceMoneyService serviceMoneyService;
    @Resource
    private HandleService handleService;
    @Resource
    private ServiceChargeRecordService serviceChargeRecordService;
    // 房源管理
    @Resource
    private HouseLibraryService houseLibraryService;
    // 人员管理
    @Resource
    private UserCenterEmployeeService employeeService;
    // 账单
    @Resource
    private BillContractBillService billContractBillService;
    // 短信
    @Resource
    private SmsService smsService;

    @Resource
    private OrderService orderService;
    /**
     * 订单
     */
    @Resource
    private BillContractOrderDao billContractOrderDao;

    @Resource
    private OrderDao orderDao;

    /**
     * 账单
     */
    @Resource
    private BillContractBillDao billContractBillDao;


    // 服务
    @Resource
    private ServiceService serviceService;

    /**
     * 【服务】提交派单
     *
     * @param so_id
     * @param mode
     * @param person_type
     * @param service_id
     * @param service_name
     * @param service_phone
     * @param moneyListt
     * @param so_totalMoney
     * @throws AppException
     */
    public void submitServiceProcess(
            Integer em_id,
            Integer so_id,
            String mode,
            Integer person_type,
            Integer service_id,
            String service_name,
            String service_phone,
            String moneyListt,
            Double so_totalMoney) throws AppException {

        // 查询订单数据
        ServiceOrderVo serviceOrderVo = this.queryServiceInfo(so_id);
        if (serviceOrderVo == null) {
            throw new AppException("订单状态错误");
        }

        // 是否改派订单
        boolean isChange = "change".equals(mode);

        // 获取服务人员
        ServicePersonVo servicePersonVo = new ServicePersonVo();
        switch (person_type) {
            case 1:
            case 2:
                servicePersonVo = this.queryServicePersonById(service_id);
                break;
            case 3:
                servicePersonVo = this.queryServicePersonBySid(service_id);
                break;
        }
        if (null == servicePersonVo) {
            servicePersonVo = this.addServicePerson(service_id, service_name, service_phone, null, null);
        }

        if (3 == person_type) {
            // 发送外协短信
            String msg = SmsUtil.sendServiceOutSource(servicePersonVo.getSp_phone(), servicePersonVo.getSp_name(), serviceOrderVo.getSo_targetAddress(), serviceOrderVo.getSm_name(), DataUtil.DateToStr(serviceOrderVo.getSo_targetTime()), serviceOrderVo.getSo_contractor(), serviceOrderVo.getSo_contractPhone());
            smsService.addSMSRecordForOth(serviceOrderVo.getHi_code(), serviceOrderVo.getContractObject_Code(), msg);
        }

        // 添加服务费用
        if (!StringUtils.isEmpty(moneyListt) && moneyListt.contains("-")) {
            String[] moneyStringArray = moneyListt.split(";");
            for (String moneyString : moneyStringArray) {
                // 保存录入的费用
                ServiceMoney serviceMoney = new ServiceMoney();
                serviceMoney.setSo_id(so_id);
                serviceMoney.setMdg_moneyCode(AppUtil.getOrderCode("250"));

                String[] moneyObj = moneyString.split("-");
                serviceMoney.setSsm_source(moneyObj[2]);
                serviceMoney.setSsm_univalent(Double.valueOf(moneyObj[3]));
                serviceMoney.setSsm_num(1);
                serviceMoney.setSsm_money(Double.valueOf(moneyObj[3]));
                serviceMoney.setSsm_company("元");

                String payObject = moneyObj[0];
                if ("4".equals(payObject)) {
                    serviceMoney.setPayObject(4);// 租客
                    serviceMoney.setCc_code(moneyObj[1]);
                } else if ("5".equals(payObject)) {
                    serviceMoney.setPayObject(5);// 房东
                    serviceMoney.setCc_code(moneyObj[1]);
                } else if ("6".equals(payObject)) {
                    serviceMoney.setPayObject(6);// 用户
                    serviceMoney.setUser_id(Integer.valueOf(moneyObj[1]));
                } else if ("2".equals(payObject)) {
                    serviceMoney.setPayObject(2);
                    serviceMoney.setEm_id(Integer.valueOf(moneyObj[1]));
                } else if ("3".equals(payObject)) {
                    serviceMoney.setPayObject(3);
                    serviceMoney.setUcc_id(Integer.valueOf(moneyObj[1]));
                }

                serviceMoneyService.addServiceMoney(serviceMoney);
            }

        }

        // 更新服务订单信息
        ServiceOrderVo serviceOrderVo1 = new ServiceOrderVo();
        serviceOrderVo1.setSo_id(so_id);
        serviceOrderVo1.setSo_currentCharger(servicePersonVo.getSp_id());
        if (2 == person_type || 3 == person_type) {
            serviceOrderVo1.setSo_state(AppConfig.so_state_3100);
        } else {
            serviceOrderVo1.setSo_state(AppConfig.so_state_2200);
        }
        serviceOrderVo1.setSo_persontype(person_type);
        serviceOrderVo1.setSo_totalMoney(so_totalMoney);
        this.updateServiceOrder(serviceOrderVo1);

        // 若改派
        ServiceProcessVo serviceProcessVo = null;
        if (isChange) {
            // 查询处理过程数据
            serviceProcessVo = this.queryServiceProcess(new ServiceProcessVo() {{
                setSo_id(so_id);
                setSpro_state(AppConfig.spro_state_1);
            }});
        }

        // 添加服务处理
        ServiceProcessVo serviceProcessVo1 = new ServiceProcessVo();
        serviceProcessVo1.setSo_id(so_id);
        serviceProcessVo1.setSp_id(servicePersonVo.getSp_id());
        serviceProcessVo1.setSpro_state(AppConfig.spro_state_1);
        serviceProcessVo1.setSpro_followState(serviceOrderVo1.getSo_state());
        serviceProcessVo1.setSpro_createTime(new Date());
        if ((serviceProcessVo != null && isChange)) {
            serviceProcessVo1.setSpro_mutualObject(serviceProcessVo.getSpro_id());
            this.addServiceProcess(serviceProcessVo1);

            ServiceProcessVo serviceProcessVo2 = new ServiceProcessVo();
            serviceProcessVo2.setSpro_id(serviceProcessVo.getSpro_id());
            serviceProcessVo2.setSpro_state(AppConfig.spro_state_2);
            serviceProcessVo2.setSpro_mutualObject(serviceProcessVo1.getSpro_id());
            this.updateServiceProcess(serviceProcessVo2);
        } else if(null == serviceProcessVo){
            this.addServiceProcess(serviceProcessVo1);
        } /*else {
            serviceProcessVo1.setSpro_state(AppConfig.spro_state_2);
            this.updateServiceProcess(serviceProcessVo1);
        }*/

        // 更改前派单记录
//        if (serviceProcessVo != null && !isChange) {
//            ServiceProcessVo serviceProcessVo2 = new ServiceProcessVo();
//            serviceProcessVo2.setSpro_id(serviceProcessVo.getSpro_id());
//            serviceProcessVo2.setSpro_state(AppConfig.spro_state_2);
//            serviceProcessVo2.setSpro_mutualObject(serviceProcessVo1.getSpro_id());
//            this.updateServiceProcess(serviceProcessVo2);
//
////            // 添加记录
////            this.addServiceRecordBo(so_id, serviceOrderVo1.getSo_state(), em_id, null);
//        }
//        else {
        // 添加记录
        this.addServiceRecordBo(so_id, serviceOrderVo1.getSo_state(), em_id, null);
//        }
    }

    /**
     * 添加服务记录
     *
     * @param so_id    服务订单id
     * @param so_state 服务记录状态
     */
    public void addServiceRecordBo(int so_id, int so_state) throws AppException {
        addServiceRecordBo(so_id, so_state, null, null);
    }

    /**
     * 添加服务记录
     *
     * @param so_id    服务订单id
     * @param so_state 服务记录状态
     * @param operator
     * @param remark
     * @throws AppException
     */
    public void addServiceRecordBo(int so_id, int so_state, Integer operator, String remark) throws AppException {
        int ss_charger = 0;
        if (operator > 0) {
            ss_charger = operator;
        }
        String sr_content_inside = null;//服务内部记录
        String sr_content_outside = null;//服务外部记录
        String sr_content_business = null;//服务业务记录

        // 查询服务订单
        ServiceOrderVo serviceOrderVo = this.queryServiceInfo(so_id);
        if (serviceOrderVo == null) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 查询步骤是否开启
        ServiceStepVo serviceStepVo = new ServiceStepVo();
        serviceStepVo.setSs_code(so_state);
        serviceStepVo = this.queryServiceStepInfo(serviceStepVo);
        // 步骤为空，返回
        if (serviceStepVo == null) {
            return;
        }
        // 步骤关闭，返回
        if (serviceStepVo.getSs_open() == 2) {
            return;
        }

        // 查询服务处理过程
        ServiceProcessVo serviceProcessVo = null;
        if (so_state == AppConfig.so_state_2200 || so_state == AppConfig.so_state_3100) {
            serviceProcessVo = new ServiceProcessVo();
            serviceProcessVo.setSo_id(so_id);
            serviceProcessVo.setSpro_state(AppConfig.spro_state_1);
            serviceProcessVo = this.queryServiceProcess(serviceProcessVo);
        }

        ServiceRecordVo serviceRecordVoEs = new ServiceRecordVo();
        //List<ServiceRecordVo> serviceRecordVoList = null;
        // 分状态记录数据
        switch (so_state) {
            // 已下单
            case AppConfig.so_state_1100:
                sr_content_inside = "订单已提交";
                sr_content_outside = "订单已提交";
                break;
            // 已受理
            case AppConfig.so_state_2100:
                sr_content_inside = "订单已受理，受理人员：";
                sr_content_outside = "订单已受理";
                sr_content_business = "订单已受理，备注：" + remark;
                // 查询人员信息
                if (serviceOrderVo.getSo_handler() != null) {
                    UserCenterEmployee employee = employeeService.queryEmployeeInfo(serviceOrderVo.getSo_handler());
                    if (employee != null) {
                        sr_content_inside += employee.getEm_name();
                    }
                }
                break;
            // 已派单
            case AppConfig.so_state_2200:
                sr_content_inside = "已派单，待接单人员：";
                sr_content_outside = "已派单";
                if (serviceProcessVo != null) {
                    if (serviceProcessVo.getSpro_mutualObject() != null) {
                        sr_content_inside = "订单已改派，改派人员：";
                        sr_content_outside = null;
                    }
                    sr_content_inside += serviceProcessVo.getSp_name() + " - " + serviceProcessVo.getSp_phone();
                }
                break;
            // 已接单
            case AppConfig.so_state_3100:

                //serviceRecordVoEs.setSo_id(so_id);
                //serviceRecordVoEs.setSs_code(AppConfig.so_state_3100);
                //serviceRecordVoList = this.queryServiceRecordList(serviceRecordVoEs);
                //if (serviceRecordVoList.size() == 0) {
                sr_content_inside = "服务人员已接单";
                sr_content_outside = "服务人员已接单，联系方式：";
                if (serviceProcessVo != null) {
                    sr_content_outside += serviceProcessVo.getSp_name() + " - " + serviceProcessVo.getSp_phone();
                }
                //serviceRecordVoList = null;
                //} else {
                //     sr_content_inside = "指派人员已接单,预约上门: " + remark + "";
                //    sr_content_outside = "服务人员已接单，联系方式：";
                //     if (serviceProcessVo != null) {
                //        sr_content_outside += serviceProcessVo.getSp_name() + " - " + serviceProcessVo.getSp_phone() + ",预约上门:" + remark;
                //     }
                //}
                break;
            // 处理中
            case AppConfig.so_state_3200:
                sr_content_inside = "服务人员开始服务";
                sr_content_outside = "服务人员开始服务";
                break;

            // 预约上门
            case AppConfig.so_state_3210:
                sr_content_inside = "服务人员已预约上门时间:" + remark + "";
                sr_content_outside = "服务人员已预约上门时间:" + remark + "";
                break;

            // 到达现场
            case AppConfig.so_state_3212:
                sr_content_inside = "服务人员已到达现场";
                sr_content_outside = "服务人员已到达现场";
                break;
            // 服务跟进
            case AppConfig.so_state_3220:
                sr_content_inside = "服务人员增加跟进记录";
                sr_content_outside = "服务人员增加跟进记录";
                break;
            // 完成服务
            case AppConfig.so_state_3230:
                sr_content_inside = "服务已完成";
                sr_content_outside = "服务已完成";
                break;
            // 确认费用
            case AppConfig.so_state_3232:
                sr_content_inside = "服务人员已确认费用";
                sr_content_outside = "服务人员已确认费用";
                break;

            // 处理完成-----------------
            case AppConfig.so_state_3300:
                sr_content_inside = "服务人员完成服务";
                sr_content_outside = "服务人员完成服务";
                break;
            // 处理明细
            case AppConfig.so_state_3400:
                sr_content_inside = "服务订单费用明细已录入";
                sr_content_outside = "服务订单费用明细已录入";
                break;
            // 已回访
            case AppConfig.so_state_4100:
                sr_content_inside = "已回访，反馈信息：" + remark;
                sr_content_outside = "订单完成";
                break;
            // 订单取消
            case AppConfig.so_state_5010:
                sr_content_inside = "服务申请人已取消该订单";
                sr_content_outside = "订单已取消，取消原因：" + remark;
                sr_content_business = "订单已取消，取消原因：" + remark;
                break;
            // 订单关闭
            case AppConfig.so_state_5020:
                // 查询人员信息
                String em_name = null;
                if (serviceOrderVo.getSo_handler() != null) {
                    UserCenterEmployee employee = employeeService.queryEmployeeInfo(serviceOrderVo.getSo_handler());
                    if (employee != null) {
                        em_name = employee.getEm_name();
                    }
                }
                sr_content_inside = "订单已关闭。操作人：" + em_name + "，关闭原因：" + remark;
                sr_content_outside = "订单已关闭，关闭原因：" + remark;
                sr_content_business = "订单已关闭，关闭原因：" + remark;
                break;
            default:
                throw new AppException("状态异常，请重试或联系管理员");
        }

        // 添加记录
        ServiceRecordVo serviceRecordVo = new ServiceRecordVo();
        serviceRecordVo.setSo_id(so_id);
        serviceRecordVo.setSs_code(so_state);
        serviceRecordVo.setSs_charger(ss_charger);
        serviceRecordVo.setSr_content_inside(sr_content_inside);
        serviceRecordVo.setSr_content_outside(sr_content_outside);
        serviceRecordVo.setSr_content_business(sr_content_business);

        //if (serviceRecordVoList == null) {
        serviceRecordVo.setSr_createTime(new Date());
        this.addServiceRecord(serviceRecordVo);
        /*} else {
            for (ServiceRecordVo serviceRecordVos : serviceRecordVoList) {
                serviceRecordVos.setSr_createTime(new Date());
                serviceRecordVos.setSr_content_inside(sr_content_inside);
                serviceRecordVos.setSr_content_outside(sr_content_outside);
                serviceRecordVos.setSr_content_business(sr_content_business);
                this.updateServiceRecord(serviceRecordVos);
            }

        }*/


        //___________________________________________________________________________________
        // 内部记录
        /*if (sr_content_inside != null) {
            if (serviceRecordVoList == null) {
                serviceRecordVo.setSr_createTime(new Date());
                serviceRecordVo.setSr_type(AppConfig.sr_type_1);
                serviceRecordVo.setSr_content(sr_content_inside);
                this.addServiceRecord(serviceRecordVo);
            } else {
                for (ServiceRecordVo serviceRecordVos : serviceRecordVoList) {
                    if (serviceRecordVos.getSr_type() == AppConfig.sr_type_1) {
                        serviceRecordVos.setSr_content(sr_content_inside);
                        this.updateServiceRecord(serviceRecordVos);
                    }
                }
            }

        }

        // 外部记录
        if (sr_content_outside != null) {
            if (serviceRecordVoList == null) {
                serviceRecordVo.setSr_createTime(new Date());
                serviceRecordVo.setSr_type(AppConfig.sr_type_2);
                serviceRecordVo.setSr_content(sr_content_outside);
                this.addServiceRecord(serviceRecordVo);
            } else {
                for (ServiceRecordVo serviceRecordVos : serviceRecordVoList) {
                    if (serviceRecordVos.getSr_type() == AppConfig.sr_type_2) {
                        serviceRecordVos.setSr_content(sr_content_outside);
                        this.updateServiceRecord(serviceRecordVos);
                    }
                }
            }
        }

        // 业务记录
        if (sr_content_business != null) {
            if (serviceRecordVoList == null) {
                serviceRecordVo.setSr_createTime(new Date());
                serviceRecordVo.setSr_type(AppConfig.sr_type_3);
                serviceRecordVo.setSr_content(sr_content_business);
                this.addServiceRecord(serviceRecordVo);
            } else {
                for (ServiceRecordVo serviceRecordVos : serviceRecordVoList) {
                    if (serviceRecordVos.getSr_type() == AppConfig.sr_type_3) {
                        serviceRecordVos.setSr_content(sr_content_business);
                        this.updateServiceRecord(serviceRecordVos);
                    }
                }
            }
        }*/
    }

    /**
     * 查询服务处理过程
     *
     * @param serviceProcessVo
     * @return
     */
    public List<ServiceProcessVo> queryServiceProcessList(ServiceProcessVo serviceProcessVo) {
        return serviceDao.queryServiceProcessList(serviceProcessVo);
    }

    /**
     * 查询服务处理过程
     *
     * @param serviceProcessVo
     * @return
     */
    public ServiceProcessVo queryServiceProcess(ServiceProcessVo serviceProcessVo) {
        return serviceDao.queryServiceProcess(serviceProcessVo);
    }

    /**
     * 查询服务步骤信息
     *
     * @param serviceStepVo
     * @return
     */
    public ServiceStepVo queryServiceStepInfo(ServiceStepVo serviceStepVo) {
        return serviceDao.queryServiceStepInfo(serviceStepVo);
    }

    /**
     * 查询服务订单信息
     *
     * @param serviceOrderVo
     * @return
     */
    public ServiceOrderVo queryServiceInfo(ServiceOrderVo serviceOrderVo) {
        return serviceDao.queryServiceInfo(serviceOrderVo);
    }

    /**
     * 查询服务订单信息
     *
     * @param so_id
     * @return
     */
    public ServiceOrderVo queryServiceInfo(int so_id) {
        ServiceOrderVo serviceOrderVo = new ServiceOrderVo();
        serviceOrderVo.setSo_id(so_id);
        return serviceDao.queryServiceInfo(serviceOrderVo);
    }

    /**
     * 查询服务订单信息
     *
     * @param so_code
     * @return
     */
    public ServiceOrderVo queryServiceInfo(String so_code) {
        ServiceOrderVo serviceOrderVo = new ServiceOrderVo();
        serviceOrderVo.setSo_code(so_code);
        return serviceDao.queryServiceInfo(serviceOrderVo);
    }

    public ServiceOrderVo selectServiceOrderInfoById(Integer so_id) {
        ServiceOrderVo serviceOrderVo = new ServiceOrderVo();
        serviceOrderVo.setSo_id(so_id);
        return serviceDao.selectServiceOrderInfoById(serviceOrderVo);
    }

    public List<ContractOrderVo> queryContractOrderMD(ContractOrderVo contractOrderVo) {
        return serviceDao.queryContractOrderMD(contractOrderVo);
    }


    /**
     * 查询服务项目
     *
     * @param serviceOrderItemVo
     * @return
     */
    public List<ServiceOrderItemVo> selectServiceOrderItem(ServiceOrderItemVo serviceOrderItemVo) {
        return serviceDao.selectServiceOrderItem(serviceOrderItemVo);
    }


    public List<ServiceProcessProblemVo> selectServiceProcessProblem(ServiceProcessProblemVo serviceProcessProblemVo) {
        return serviceDao.selectServiceProcessProblem(serviceProcessProblemVo);
    }

    public Integer updateserviceOrderItem(ServiceOrderItemVo serviceOrderItemVo) throws Exception {
        return serviceDao.updateserviceOrderItem(serviceOrderItemVo);
    }

    /**
     * 新版服务订单接单,跟进
     *
     * @param serviceProcessVo
     * @param soState(是传过来做判断处理操作的)
     * @return
     */
    public Msg<Object> serviceTracks(ServiceProcessVo serviceProcessVo, String soState, Integer em_id, String remark) throws Exception {
        Msg<Object> msg = new Msg<>();
        ServiceOrderVo serviceOrderVo = new ServiceOrderVo();
        serviceOrderVo.setSo_id(serviceProcessVo.getSo_id());

        if ("3100".equals(soState)) {//接单

            /*
             * 接单-插入数据到GJP_Service_Process(服务-服务处理过程表)
             */
            serviceProcessVo.setSpro_state(1);
            serviceProcessVo.setSpro_followState(AppConfig.so_state_3100);
            serviceProcessVo.setSpro_remarks("已接单");
            serviceProcessVo.setSpro_createTime(new Date());
            int insertServiceProcess = serviceDao.updataServiceProcess(serviceProcessVo);

            /*
             * 更改GJP_Service_Order(服务-服务订单)状态
             */
            serviceOrderVo.setSo_state(AppConfig.so_state_3100);//已接单
            int updateServiveOrder = serviceDao.updateServiceOrder(serviceOrderVo);

            //添加服务记录
            this.addServiceRecordBo(serviceOrderVo.getSo_id(), AppConfig.so_state_3100, em_id, null);

            if (insertServiceProcess > 0 && updateServiveOrder > 0) {
                msg.setCode(200);
            } else {
                msg.setCode(401);
            }
        }

        if ("2100".equals(soState)) {//拒绝接单
            serviceProcessVo.setSpro_remarks("拒绝接单，等待改派，拒绝理由[" + remark + "]");
            serviceProcessVo.setSpro_state(2);
            serviceDao.updataServiceProcess(serviceProcessVo);

            //服务订单状态改为2100
            serviceOrderVo.setSo_state(AppConfig.so_state_2100);
            serviceDao.updateServiceOrder(serviceOrderVo);

            // 添加服务记录,2100已关闭
            this.addServiceRecordBo(serviceOrderVo.getSo_id(), AppConfig.so_state_2100, em_id, "拒绝接单，拒绝理由[ " + remark + " ]");
        }


        if ("3210".equals(soState)) {//预约上门
            /*
             * 更改数据到GJP_Service_Process(服务-服务处理过程表)
             */
            serviceProcessVo.setSpro_followState(AppConfig.so_state_3210);
            serviceProcessVo.setSpro_remarks("预约上门");
            serviceProcessVo.setSpro_startTime(new Date());
            int updataServiceProcess = serviceDao.updataServiceProcess(serviceProcessVo);

            //添加服务记录
            this.addServiceRecordBo(serviceOrderVo.getSo_id(), AppConfig.so_state_3210, em_id, remark);

            if (updataServiceProcess > 0) {
                msg.setCode(200);
            } else {
                msg.setCode(401);
            }
        }


        if ("3212".equals(soState)) {//到达现场
            /*
             * 更改数据到GJP_Service_Process(服务-服务处理过程表)
             */
            serviceProcessVo.setSpro_followState(AppConfig.so_state_3212);
            serviceProcessVo.setSpro_remarks("到达现场");
            serviceProcessVo.setSpro_startTime(new Date());
            int updataServiceProcess = serviceDao.updataServiceProcess(serviceProcessVo);

            /*
             * 更改GJP_Service_Order(服务-服务订单)状态
             */
            serviceOrderVo.setSo_state(AppConfig.so_state_3200);//3200处理中
            int updateServiveOrder = serviceDao.updateServiceOrder(serviceOrderVo);

            ServiceRecordVo serviceRecordVo = new ServiceRecordVo();
            serviceRecordVo.setSs_code(AppConfig.so_state_3210);
            serviceRecordVo.setSo_id(serviceOrderVo.getSo_id());
            List<ServiceRecordVo> serviceRecordVoList = serviceDao.queryServiceRecordList(serviceRecordVo);

            //添加服务记录
            this.addServiceRecordBo(serviceOrderVo.getSo_id(), AppConfig.so_state_3212, em_id, null);

            if (serviceRecordVoList.size() == 0) {
                SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String str = format.format(new Date());
                this.addServiceRecordBo(serviceOrderVo.getSo_id(), AppConfig.so_state_3210, em_id, str);
            }

            if (updataServiceProcess > 0 && updateServiveOrder > 0) {
                msg.setCode(200);
            } else {
                msg.setCode(401);
            }

        }
        if ("3230".equals(soState)) {//结束服务/完成服务
            /*
             * 更改数据到GJP_Service_Process(服务-服务处理过程表)
             *
             */

           /* ServiceProcessProblemVo serviceProcessProblemVo = new ServiceProcessProblemVo();
            serviceProcessProblemVo.setSo_id(serviceProcessVo.getSo_id());
            serviceProcessProblemVo.setSsp_type(2);
            List<ServiceProcessProblemVo> processProblemVoList = selectServiceProcessProblem(serviceProcessProblemVo);*/

            /*for (ServiceProcessProblemVo processProblemVoLists : processProblemVoList) {
                Integer spp_isConform = processProblemVoLists.getSpp_isConform();
                if (spp_isConform == null) {
                    msg.setCode(201);
                    msg.setMsg("您还没提交现场反馈,不能完成服务");
                    return msg;
                }
            }*/
            /*if (processProblemVoList == null || processProblemVoList.isEmpty()) {
                msg.setCode(201);
                msg.setMsg("您还没提交现场反馈,不能完成服务");
                return msg;
            }*/
            ServiceOrderItemVo serviceOrderItemVo = new ServiceOrderItemVo();
            serviceOrderItemVo.setSo_id(serviceProcessVo.getSo_id());
            serviceOrderItemVo.setSoit_done(1);
            List<ServiceOrderItemVo> serviceOrderItemList = queryServiceOrderItemList(serviceOrderItemVo);
            if (serviceOrderItemList != null && !serviceOrderItemList.isEmpty()) {
                msg.setCode(201);
                msg.setMsg("您还有项目未完成,不能完成服务");
                return msg;
            }

            serviceProcessVo.setSpro_followState(AppConfig.so_state_3230);
            serviceProcessVo.setSpro_remarks("完成服务");
            serviceProcessVo.setSpro_endTime(new Date());
            int updataServiceProcess = serviceDao.updataServiceProcess(serviceProcessVo);


            //添加服务记录
            this.addServiceRecordBo(serviceOrderVo.getSo_id(), AppConfig.so_state_3230, em_id, null);

            if (updataServiceProcess > 0) {
                msg.setCode(200);
            } else {
                msg.setCode(401);
            }
        }
        return msg;
    }

    /**
     * 服务费用确认添加Service
     *
     * @param so_id
     * @param channel
     * @param so_totalMoney
     * @param money
     * @param payId
     * @param payWay
     * @param request
     * @return
     * @throws Exception
     */
    public Msg<Object> addServiceMoneyAppService(Integer so_id, Integer emId, int channel, Double so_totalMoney, ServiceMoney money, String payId, Integer payWay, HttpServletRequest request, String so_payNameNew, String so_payPhoneNew) throws Exception {
        Msg<Object> msg = new Msg<>();
        ServiceOrderVo serviceOrderVo = selectServiceOrderInfoById(so_id);
        if (serviceOrderVo == null) {
            throw new AppException("服务订单不存在，请重试或联系管理员");
        }

        // 更新服务订单总金额
        ServiceOrderVo serviceOrderVo1 = new ServiceOrderVo();
        serviceOrderVo1.setSo_id(so_id);
        serviceOrderVo1.setSo_totalMoney(so_totalMoney);
        if (so_payNameNew != null && !"".equals(so_payNameNew)) {
            serviceOrderVo1.setSo_payNameNew(so_payNameNew);
        }
        if (so_payPhoneNew != null && !"".equals(so_payPhoneNew)) {
            serviceOrderVo1.setSo_payPhoneNew(so_payPhoneNew);
        }
        serviceOrderVo1.setSo_payObject(money.getPayObject());
        serviceDao.updateServiceOrder(serviceOrderVo1);

        // 根据前缀判断付费对象类型CUS(租客和房东)和USER用户),EM(管家),UCC(门店)
        if (payId.startsWith("CUS")) {
            money.setCc_code(payId);
        } else if (payId.startsWith("USER")) {
            String payIds = payId.replace("USER", "");
            money.setUser_id(Integer.valueOf(payIds));
        } else if (payId.startsWith("EM")) {
            String payIds = payId.replace("EM", "");
            money.setEm_id(Integer.valueOf(payIds));
        } else if (payId.startsWith("UCC")) {
            String payIds = payId.replace("UCC", "");
            money.setUcc_id(Integer.valueOf(payIds));
        }

        //查询是否有服务订单明细,有则更新,无则添加
        List<ServiceMoney> serviceMoneyList = serviceMoneyService.selectServiceMoney(money);
        if (serviceMoneyList.size() == 0) {
            money.setSsm_date(new Date());
            money.setSo_id(so_id);
            serviceMoneyService.addServiceMoney(money);
        } else {
            serviceDao.updateServiceMoney(money);
        }

       /* String payWays = "";
        if (payWay == 1) {
            payWays = "支付宝";
        }
        if (payWay == 2) {
            payWays = "微信";
        }
        if (payWay == 3) {
            payWays = "现金";
        }*/

        //生成服务订单,账单
        OrderVo orderVo = genrateNewServiceOrder(money, serviceOrderVo, channel);

        String ucc_order_sn = orderVo.getUcc_order_sn();
        String orderSn = orderVo.getOrder_sn();
        //更新订单金额
        orderService._updatePayOrderForAmount(orderSn);
        msg.put("order", orderVo);
        //OrderVo orderV = orderService.queryOrder(orderSn);

        //建立一个定时器,10分钟内订单状态未支付,则失效订单账单(不对管家和门店生效)
        /*Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            public void run() {
                //查询订单是否存在
                OrderVo orderV = orderService.queryOrder(orderSn);
                if (orderV.getOrder_status() == 2 && (orderV.getTrade_object() != 2 && orderV.getTrade_object() != 3)) {//未支付才执行
                    //将服务清单状态改未生成订单
                    List<ServiceMoney> serviceMoneyList = serviceMoneyService.selectServiceMoney(money);
                    for (ServiceMoney serviceMoney : serviceMoneyList) {
                        serviceMoney.setIs_order(0);
                        serviceService.updateServiceMoney(serviceMoney);
                    }
                    //失效订单账单
                    if (orderV != null) {
                        List<OrderVo> orderList = orderService.queryOrderList(orderV);
                        for (OrderVo orderVo : orderList) {
                            orderVo.setOrder_status(AppConfig.order_status_4);
                            serviceDao.updateOrder(orderVo);//更改订单状态
                        }
                        OrderBillVo orderBillVo = orderService.queryOrderBill(new OrderBillVo() {{
                            setBill_sn(orderV.getPay_sn());
                        }});
                        if (orderBillVo != null) {
                            orderBillVo.setBill_status(AppConfig.bill_status_3);
                            orderService.updateOrderBill(orderBillVo);//更改帐单状态
                        }
                    }

                    //如果有门店订单,也失效
                    if ( ucc_order_sn != null) {
                        OrderVo order = new OrderVo();
                        order.setOrder_sn(orderVo.getUcc_order_sn());
                        order.setOrder_status(AppConfig.order_status_4);
                        serviceDao.updateOrder(order);//更改订单状态
                    }
                }
            }
        }, 300000);*/

        //现金支付不通过支付接口回调更新系统账单/订单
        /*Integer payObject = money.getPayObject();//付费对象
        if ("现金".equals(payWays)) {
            msg.setCode(2001);//2001是现金支付
            if (payObject == 4 || payObject == 5 || payObject == 6) {
                OrderBillVo orderBillVo = orderService._requestPay(channel, orderSn, payWays, AppUtil.getIP(request));
                msg.put("orderBill", orderBillVo);
                msg.setMsg("本次客户需要当面用现金一次性付清服务费,金额为" + (orderV.getOrder_amount_pay() == null ? 0 : new BigDecimal(Math.abs(orderV.getOrder_amount_pay())).setScale(2, BigDecimal.ROUND_HALF_UP)) + "元");
            } else {
                //更新系统支付订单/记录/跟进
                this.updateStatus(orderV, serviceOrderVo, so_id, emId);
                //this.theUpdatePayForService(orderV, null);
                msg.setMsg("本次付费为管家/门店付费,金额为" + (orderV.getOrder_amount_pay() == null ? 0 : new BigDecimal(Math.abs(orderV.getOrder_amount_pay())).setScale(2, BigDecimal.ROUND_HALF_UP)) + "元");
            }

        } else {
            if (payObject == 4 || payObject == 5 || payObject == 6) {
                *//*if (money.getSsm_money() > 0 && orderVo.getOrder_amount_pay() > 0) {
                    msg = orderService._requestPay(money.getCc_code(), channel, orderSn, payWays, AppUtil.getIP(request));
                    msg.put("ucc_order_sn",orderVo.getUcc_order_sn());
                } else {
                    this.updateStatus(orderV, serviceOrderVo, so_id, emId);
                    msg.setMsg("本次服务费,金额为0元");
                }*//*
                OrderBillVo orderBillVo = orderService._requestPay(channel, orderSn, payWays, AppUtil.getIP(request));
                msg.put("orderBill", orderBillVo);
                msg.put("ucc_order_sn", orderVo.getUcc_order_sn());
                *//*if (money.getSsm_money() == 0 || orderVo.getOrder_amount_pay() == 0) {
                    this.updateStatus(orderV, serviceOrderVo, so_id, emId);
                    this.theUpdatePayForService(orderV, null);
                    msg.setMsg("本次服务费,金额为0元");
                }*//*
            } else {
                //更新系统支付订单/记录/跟进
                this.updateStatus(orderV, serviceOrderVo, so_id, emId);
                //this.theUpdatePayForService(orderV, null);
                msg.setMsg("本次付费为管家/门店付费,金额为" + (orderV.getOrder_amount_pay() == null ? 0 : new BigDecimal(Math.abs(orderV.getOrder_amount_pay())).setScale(2, BigDecimal.ROUND_HALF_UP)) + "元");
            }
        }*/
        return msg;
    }

    /**
     * 更新服务费记录
     *
     * @param orderVo
     * @param orderBillVo
     */
    private void theUpdatePayForService(OrderVo orderVo, OrderBillVo orderBillVo) {

        // TODO 支付宝、微信支付回调，更新服务费用订单等相关数据
        ServicePayMoneyVo servicePayMoneyVo = new ServicePayMoneyVo();
        servicePayMoneyVo.setCc_code(orderVo.getTrade_cc_code());
        servicePayMoneyVo.setOrder_sn(orderVo.getOrder_sn());
        servicePayMoneyVo.setUser_id(orderVo.getTrade_user_id());
        servicePayMoneyVo = serviceDao.queryServicePayMoneyInfo(servicePayMoneyVo);

        if (servicePayMoneyVo != null) {
            int st_moneyBool = servicePayMoneyVo.getSt_moneyBool();
            double deductMoney = 0.0;
            double discountMoney = 0.0;
            double annulMoney = 0.0;
            double reallyMoney = 0.0;

            // 初始服务费
            Double init_serveMoney = servicePayMoneyVo.getInit_serveMoney();
            // 剩余服务费
            Double surplus_serveMoney = servicePayMoneyVo.getSurplus_serveMoney();
            // 可用剩余服务费
            Double available_serveMoney = servicePayMoneyVo.getAvailable_serveMoney();
            // 本次应支付费用
            Double shallMoney = orderVo.getDetail_amount_total().doubleValue();
            // 总费用
            double totalMoney = servicePayMoneyVo.getSo_totalMoney().doubleValue();
            if (1 == st_moneyBool) {// 允许从服务费中扣除
                // 还有可用剩余服务费
                if (null != available_serveMoney && available_serveMoney.doubleValue() > 0) {
                    if (available_serveMoney >= shallMoney) {
                        // 抵扣费用
                        deductMoney = shallMoney;
                        // 折扣费用
                        discountMoney = 0.00;
                        // 减免费用
                        annulMoney = totalMoney - shallMoney;
                        // 实际支付费用
                        reallyMoney = 0.0;
                        // 更新剩余服务费用
                        ServiceCharge serviceCharge = new ServiceCharge();
                        serviceCharge.setS_id(servicePayMoneyVo.getS_id());
                        serviceCharge.setUsed_serveMoney(new BigDecimal((init_serveMoney - available_serveMoney + shallMoney)).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                        serviceCharge.setSurplus_serveMoney(new BigDecimal((available_serveMoney - shallMoney)).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                        serviceCharge.setAvailable_serveMoney(new BigDecimal((available_serveMoney - shallMoney)).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                        this.modifyServiceMoney(serviceCharge);

                        // 添加服务费扣除记录
                        ServiceChargeRecord serviceChargeRecord = new ServiceChargeRecord();
                        serviceChargeRecord.setSo_id(servicePayMoneyVo.getSo_id());
                        serviceChargeRecord.setService_charge(shallMoney);
                        serviceChargeRecord.setDiscount(new BigDecimal((annulMoney + discountMoney)).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());// 减免加折扣
                        serviceChargeRecord.setCon_code(servicePayMoneyVo.getCon_code());
                        serviceChargeRecord.setCc_code(servicePayMoneyVo.getCc_code());
                        serviceChargeRecord.setHi_code(servicePayMoneyVo.getHi_code());
                        this.appAddServiceChargeRecord(serviceChargeRecord);
                    } else {
                        // 抵扣费用
                        deductMoney = available_serveMoney;
                        // 折扣费用
                        discountMoney = (shallMoney - available_serveMoney.doubleValue()) / 2;
                        // 减免费用
                        annulMoney = totalMoney - shallMoney;
                        // 实际支付费用
                        reallyMoney = (shallMoney - available_serveMoney.doubleValue()) / 2;

                        // 更新剩余服务费用
                        ServiceCharge serviceCharge = new ServiceCharge();
                        serviceCharge.setS_id(servicePayMoneyVo.getS_id());
                        serviceCharge.setUsed_serveMoney(new BigDecimal(init_serveMoney).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                        serviceCharge.setSurplus_serveMoney(0.00);
                        serviceCharge.setAvailable_serveMoney(0.00);
                        this.modifyServiceMoney(serviceCharge);

                        // 添加服务费扣除记录
                        ServiceChargeRecord serviceChargeRecord = new ServiceChargeRecord();
                        serviceChargeRecord.setSo_id(servicePayMoneyVo.getSo_id());
                        serviceChargeRecord.setService_charge(reallyMoney);
                        serviceChargeRecord.setDiscount(new BigDecimal((totalMoney - reallyMoney + 0.00)).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());// 减免加折扣
                        serviceChargeRecord.setCon_code(servicePayMoneyVo.getCon_code());
                        serviceChargeRecord.setCc_code(servicePayMoneyVo.getCc_code());
                        serviceChargeRecord.setHi_code(servicePayMoneyVo.getHi_code());
                        this.appAddServiceChargeRecord(serviceChargeRecord);
                    }
                }
            }
        }
    }

    /**
     * //更新系统支付订单/记录/跟进
     *
     * @param orderV
     * @param serviceOrderVo
     * @param so_id
     * @param em_id
     * @throws Exception
     */
    public void updateStatus(OrderVo orderV, ServiceOrderVo serviceOrderVo, Integer so_id, Integer em_id) throws Exception {
        // TODO 现金支付不通过支付接口回调更新系统账单/订单
        OrderVo order = new OrderVo();
        order.setOrder_sn(orderV.getOrder_sn());
        order.setOrder_status(AppConfig.order_status_2);
        serviceDao.updateOrder(order);//更改订单状态

        // TODO 更新跟进
        ServiceProcessVo serviceProcessVo = new ServiceProcessVo();
        serviceProcessVo.setSo_id(so_id);
        serviceProcessVo.setSpro_state(AppConfig.spro_state_1);
        serviceProcessVo.setSpro_followState(AppConfig.so_state_3232);
        serviceProcessVo.setSpro_remarks("确认费用");
        serviceDao.updataServiceProcess(serviceProcessVo);

        // TODO 更新服务费用清单为已生成订单状态
        ServiceMoney serviceMoney = new ServiceMoney();
        serviceMoney.setSo_id(serviceOrderVo.getSo_id());
        serviceMoney.setIs_order(1);
        serviceDao.updateServiceMoney(serviceMoney);

        // TODO 添加记录
        this.addServiceRecordBo(serviceOrderVo.getSo_id(), AppConfig.so_state_3232, em_id, null);
    }

    //生成服务订单,账单前查询是否已存在,如果存在则失效订单账单
    public void failureOrder(Integer so_id, String trade_code, String ucc_order_sn) throws Exception {
        OrderBillVo orderBillVo = orderService.queryOrderBill(new OrderBillVo() {{
            setBill_sn(trade_code);
        }});
        if (orderBillVo != null) {
            orderBillVo.setBill_status(AppConfig.bill_status_3);
            orderService.updateOrderBill(orderBillVo);//更改帐单状态

            OrderVo orderVo1 = new OrderVo();
            orderVo1.setPay_sn(orderBillVo.getBill_sn());
            List<OrderVo> orderList = orderService.queryOrderList(orderVo1);
            for (OrderVo orderVo : orderList) {
                orderVo.setOrder_status(AppConfig.order_status_4);
                serviceDao.updateOrder(orderVo);//更改订单状态
            }
        }

        //如果有门店订单,也失效
        if (ucc_order_sn != null) {
            OrderVo order = new OrderVo();
            order.setOrder_sn(ucc_order_sn);
            order.setOrder_status(AppConfig.order_status_4);
            serviceDao.updateOrder(order);//更改订单状态
        }
    }


    /**
     * 添加服务记录
     *
     * @param serviceRecordVo
     * @return
     */
    public boolean addServiceRecord(ServiceRecordVo serviceRecordVo) {
        return serviceDao.addServiceRecord(serviceRecordVo) > 0;
    }

    /**
     * 更改服务记录
     *
     * @param serviceRecordVo
     * @return
     */
    public boolean updateServiceRecord(ServiceRecordVo serviceRecordVo) {
        return serviceDao.updateServiceRecord(serviceRecordVo) > 0;
    }

    public Msg<Object> updateServiceCostList(JSONObject json) throws AppException {
        Msg<Object> msg = new Msg<>();
        Integer md_id = json.getInteger("md_id");
        String serviceMoneyListObj = json.getString("serviceMoneyList");

        List<ServiceMoney> serviceMoneyList = JSONArray.parseArray(serviceMoneyListObj, ServiceMoney.class);
        if (StringUtils.isEmpty(md_id)) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 查询服务
        MaintenanceDeclaration declarationVo = this.selectDeclarationById(md_id);
        if (declarationVo == null) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }
        String moneyCode = declarationVo.getMdg_moneyCode();
//        if (moneyCode == null) {
//            moneyCode = AppUtil.getOrderCode("250");
//            MaintenanceDeclaration declaration = new MaintenanceDeclaration();
//            declaration.setMd_id(declarationVo.getMd_id());
//            declaration.setMdg_moneyCode(moneyCode);
//            this.updateDeclaration(declaration);
//        }

        // 添加费用清单
        double payMoney = 0;
        if (serviceMoneyList != null && !serviceMoneyList.isEmpty()) {
            MaintenanceDeclaration declaration = new MaintenanceDeclaration();
            this.deleteSerivceMoney(declaration.getMd_id());
            for (ServiceMoney serviceMoney : serviceMoneyList) {
                serviceMoney.setMdg_moneyCode(moneyCode);
                serviceMoney.setSsm_date(new Date());
                serviceMoneyService.addServiceMoney(serviceMoney);
                payMoney += serviceMoney.getSsm_money();
            }

            String order_code = AppUtil.getOrderCode("202");
            if (declarationVo.getOrder_code() != null) {
                order_code = declarationVo.getOrder_code();
            }

            // 删除订单、账单
            financeManageService.deleteFinanceOrder(order_code);
            financeManageService.deleteFinanceBill(order_code);

            // 【添加服务订单数据】
            ContractOrderVo contractOrderVo = new ContractOrderVo();
            contractOrderVo.setBco_code(order_code);
            contractOrderVo.setHi_code(declarationVo.getHi_code());
            contractOrderVo.setBco_orderType(AppConfig.order_type_2); // 定金订单类型
            contractOrderVo.setBco_type(203);
            contractOrderVo.setBco_userId(declarationVo.getUser_id());
            contractOrderVo.setBco_customer(declarationVo.getCc_code());
            contractOrderVo.setBco_currentBalPay(0);
            contractOrderVo.setBco_currentPayment(new BigDecimal(payMoney));
            contractOrderVo.setBco_currentDate(new Date());
            contractOrderVo.setBco_state(AppConfig.ORDER_STATE_1);
            contractOrderVo.setBco_optionState(AppConfig.order_option_state_2);
            contractOrderVo.setBco_butler(0);
            contractOrderVo.setBco_createTime(new Date());
            boolean boo = financeManageService.addContractOrder(contractOrderVo);
            if (!boo) {
                throw new AppException("生成订单失败，请重试或联系管理员");
            }

            // 【添加定金账单数据】
            ContractBillVo contractBillVo = new ContractBillVo();
            contractBillVo.setBcb_code(AppUtil.getOrderCode("212"));
            contractBillVo.setBco_code(contractOrderVo.getBco_code());
            contractBillVo.setBcb_type(AppConfig.CONTRACT_BILL_TYPE_3);
            contractBillVo.setBcb_balPay(0);
            contractBillVo.setBcb_repayment(new BigDecimal(payMoney));
            contractBillVo.setBcb_repaymentDate(new Date());
            contractBillVo.setBcb_state(AppConfig.order_option_state_2);
            /*contractBillVo.setBcb_budgetState(0);
            contractBillVo.setBcb_payWay(payWay);
            contractBillVo.setBcb_creator(0);
            contractBillVo.setBcb_operater(0);
            contractBillVo.setBcb_remarks(bcb_remarks);*/
            contractBillVo.setBcb_createTime(new Date());
            boo = financeManageService.addContractBill(contractBillVo);
            if (!boo) {
                throw new AppException("生成账单失败，请重试或联系管理员");
            }

            // 更新服务订单的订单号
            declarationVo.setOrder_code(contractOrderVo.getBco_code());
            handleService.saveOrderMD(declarationVo);

            // 更新服务订单的订单号
//            declaration = new MaintenanceDeclaration();
//            declaration.setMd_id(declarationVo.getMd_id());
//            declaration.setOrder_code(contractOrderVo.getBco_code());
//            this.updateDeclaration(declaration);

        }

        return msg;
    }

    /**
     * 查询热点问题List
     *
     * @return
     */
    public PageModel<HotspotIssuesProblem> selectHotSpot(PageModel<HotspotIssuesProblem> pageModel) {
        return serviceDao.selectHotSpot(pageModel);
    }

    /**
     * 查询服务类型
     *
     * @return
     */
    public List<ServiceType> selectServiceType() {
        return serviceDao.selectServiceType();
    }

    /**
     * 添加热点问题
     *
     * @param hotspotIssuesProblem
     * @return
     */
    public int addHotSpot(HotspotIssuesProblem hotspotIssuesProblem) {
        return serviceDao.addHotSpot(hotspotIssuesProblem);
    }

    /**
     * 根据编号查询热点问题
     *
     * @param sip_id
     * @return
     */
    public HotspotIssuesProblem selectHotSpotById(int sip_id) {
        return serviceDao.selectHotSpotById(sip_id);
    }

    /**
     * 修改热点问题
     *
     * @param hotspotIssuesProblem
     * @return
     */
    public int updataHotSpot(HotspotIssuesProblem hotspotIssuesProblem) {
        return serviceDao.updataHotSpot(hotspotIssuesProblem);
    }

    /**
     * 修改付费对象
     *
     * @return
     */
    public int updataDeclarationPerson(MaintenanceDeclaration maintenanceDeclaration) {
        return serviceDao.updataDeclarationPerson(maintenanceDeclaration);
    }

    /**
     * 查询维修申报List
     *
     * @param pageNo
     * @param cookies
     * @param mo_state
     * @return
     */
    public PageModel<ViewBusinessDeclarationVo> selectServe(int pageNo, int cookies, String mo_state) {
        return serviceDao.selectServe(pageNo, cookies, mo_state);
    }

    /**
     * 查询服务信息List
     *
     * @param pageNo
     * @param cookies
     * @return
     */
    public PageModel<ServiceMessage> selectServeMessage(int pageNo, int cookies) {
        return serviceDao.selectServeMessage(pageNo, cookies);
    }

    /**
     * 根据编号查询服务信息
     *
     * @param sm_id
     * @return
     */
    public ServiceMessage selectMessageById(int sm_id) {
        return serviceDao.selectMessageById(sm_id);
    }

    /**
     * 根据编号维修申请信息
     *
     * @param md_id
     * @return
     */
    public MaintenanceDeclaration selectDeclarationById(int md_id) {
        return serviceDao.selectDeclarationById(md_id);
    }

    public MaintenanceDeclaration selectDeclarationAppById(int md_id) {
        return serviceDao.selectDeclarationAppById(md_id);
    }

    public MaintenanceTracks selectMaintenanceTracksById(int md_id) {
        return serviceDao.selectMaintenanceTracksById(md_id);
    }

    public List<MaintenancePoint> selectMaintenancePointById(int md_id) {
        return serviceDao.selectMaintenancePointById(md_id);
    }

    /**
     * 查询申请图片
     *
     * @param md_id
     * @return
     */
    public List<MaintenanceImage> selectMaintenanceImage(int md_id) {
        return serviceDao.selectMaintenanceImage(md_id);
    }

    /**
     * 查询维修跟踪
     *
     * @return
     */
    public List<MaintenanceTracks> selectMaintenanceTracks(MaintenanceState maintenanceState) {
        return serviceDao.selectMaintenanceTracks(maintenanceState);
    }

    /**
     * 查询未完成的维修申请
     *
     * @param em_id
     * @return
     */
    public List<MaintenanceState> selectFreeUserCenterEmployee(Integer em_id) {
        return serviceDao.selectFreeUserCenterEmployee(em_id);
    }

    /**
     * 添加派工单
     *
     * @param maintenanceDispatching
     * @return
     */
    public int addDispatching(MaintenanceDispatching maintenanceDispatching) {
        return serviceDao.addDispatching(maintenanceDispatching);
    }

    /**
     * 添加维修人员安排
     *
     * @return
     */
    public int addWorkerTask(MaintenanceWorkerTask maintenanceWorkerTask) {
        return serviceDao.addWorkerTask(maintenanceWorkerTask);
    }

    /**
     * 添加维修状态
     *
     * @param maintenanceState
     * @return
     */
    public int addState(MaintenanceState maintenanceState) {
        return serviceDao.addState(maintenanceState);
    }

    /**
     * 通过维修申报编号查询状态
     *
     * @param md_id
     * @return
     */
    public MaintenanceState selectMaintenanceStateByMd_Id(int md_id) {
        return serviceDao.selectMaintenanceStateByMd_Id(md_id);
    }

    /**
     * 查询维修订单流程
     *
     * @param order
     * @return
     */
    public List<MaintenanceOrder> queryOrderUser(MaintenanceOrder order) {
        return serviceDao.queryOrderUser(order.getMd_id());
    }

    /**
     * 添加订单流程
     *
     * @param order
     * @return
     */
    public int addOrder(MaintenanceOrder order) {
        int count = serviceDao.queryOrderCountById(order);
        return count == 0 ? serviceDao.addOrder(order) : count;
    }

    /**
     * 删除维修订单流程-客服回访
     *
     * @param parseInt
     * @return
     */
    public int deleteOrder(int parseInt) {
        return serviceDao.deleteOrder(parseInt);
    }

    /**
     * 添加服务基本信息
     *
     * @param serviceMessage
     * @return
     */
    public int addServeMessage(ServiceMessage serviceMessage) {
        return serviceDao.addServeMessage(serviceMessage);
    }

    /**
     * 添加问题描述
     *
     * @param problemList
     * @return
     */
    public int addProblemList(ProblemList problemList) {
        return serviceDao.addProblemList(problemList);
    }

    /**
     * 查询问题描述列表
     *
     * @param st_id
     * @return
     */
    public List<ProblemList> selectProblemList(Integer st_id) {
        return serviceDao.selectProblemList(st_id);
    }

    /**
     * 修改服务基本信息
     *
     * @param serviceMessage
     * @return
     */
    public int updataMessage(ServiceMessage serviceMessage) {
        return serviceDao.updataMessage(serviceMessage);
    }

    /**
     * 修改维修状态
     *
     * @return
     */
    public int updataMaintenanceState(MaintenanceState maintenanceState) {
        return serviceDao.updataMaintenanceState(maintenanceState);
    }

    /**
     * 修改维修申报状态
     *
     * @return
     */
    public int updataDeclaration(int md_id) {
        return serviceDao.updataDeclaration(md_id);
    }

    /**
     * 修改维修申请状态
     * <p>
     * 修改为complete（已受理）
     *
     * @param md_id
     * @return
     */
    public int updataStart(Integer md_id) {
        return serviceDao.updataStart(md_id);
    }

    /**
     * 客户手写签名
     *
     * @param maintenanceDeclaration
     * @return
     * @author 陈智颖
     * @date Apr 27, 2017 4:14:54 PM
     */
    public int updataCustomerImage(MaintenanceDeclaration maintenanceDeclaration) {
        return serviceDao.updataCustomerImage(maintenanceDeclaration);
    }

    public List<ServiceMessage> selectServiceList() {
        return serviceDao.selectServiceList();
    }

    public List<ServiceType> selectServiceTypeList(ServiceType serviceType) {
        return serviceDao.selectServiceTypeList(serviceType);
    }

    public boolean addDeclarationInfo(MaintenanceDeclaration declaration) {
        return serviceDao.addDeclarationInfo(declaration) > 0;
    }

    public int addDeclarationImagePath(MaintenanceImage image) {
        return serviceDao.addDeclarationImagePath(image);
    }

    public int insertServiceImagePath(ServiceImageVo serviceImageVo) {
        return serviceDao.insertServiceImagePath(serviceImageVo);
    }

    public List<ServiceImageVo> queryServiceImage(ServiceImageVo serviceImageVo) {
        return serviceDao.queryServiceImage(serviceImageVo);
    }

    public int deleteDeclarationImagePath(MaintenanceImage image) {
        return serviceDao.deleteDeclarationImagePath(image);
    }

    public ViewBusinessDeclarationVo selectDeclarationAllById(Integer md_id) {
        return serviceDao.selectDeclarationAllById(md_id);
    }

    public PageModel<MaintenanceDeclaration> queryServiceBillList(int pageNo, int cookies, String mo_state) {
        return serviceDao.queryServiceBillList(pageNo, cookies, mo_state);
    }

    public boolean addSerivceSubType(ServiceType serviceType) {
        return serviceDao.addSerivceSubType(serviceType) > 0;
    }

    public boolean selectServiceTypeByName(String typeName) {
        return "1".equals(serviceDao.selectServiceTypeByName(typeName));
    }

    /**
     * 删除服务子类型信息
     *
     * @param serviceType 服务分类对象 <br>
     *                    {@link ServiceType#em_id} 用户编号 <br>
     *                    ({@link ServiceType#parent_id} 父级编号 OR
     *                    {@link ServiceType#st_id} 类型编号) 二者存一
     * @return
     * @author JiangQT
     */
    public boolean deleteSerivceSubType(ServiceType serviceType) {
        return serviceDao.deleteSerivceSubType(serviceType) > 0;
    }

    public boolean updateSerivceSubType(ServiceType serviceType) {
        return serviceDao.updateSerivceSubType(serviceType) > 0;
    }

    public boolean updateSerivceSubTypes(ServiceType serviceType) {
        return serviceDao.updateSerivceSubTypes(serviceType) > 0;
    }

    /**
     * 绑定费用
     *
     * @param declaration
     * @return
     * @author 陈智颖
     * @date May 29, 2017 4:31:48 PM
     */
    public int updateDeclaration(MaintenanceDeclaration declaration) {
        return serviceDao.updateDeclaration(declaration);
    }

    /**
     * 删除费用
     *
     * @return
     * @author 陈智颖
     * @date May 29, 2017 4:31:48 PM
     */
    public int deleteSerivceMoney(int md_id) {
        return serviceDao.deleteSerivceMoney(md_id);
    }

    public List<ServiceType> selectServiceTypeBySmId(int sm_id) {
        return serviceDao.selectServiceTypeBySmId(sm_id);
    }

    public PageModel<ViewBusinessDeclarationVo> queryServiceOrderList(PageModel<ViewBusinessDeclarationVo> pageModel) {
        return serviceDao.queryServiceOrderList(pageModel);
    }

    /**
     * 根据md_id查询安排人员
     *
     * @param viewBusinessDeclarationVo
     * @return
     * @author chen
     * @date Jan 5, 2017 11:36:32 AM
     */
    public ViewBusinessDeclarationVo selectBusinessDeclarationWhere(ViewBusinessDeclarationVo viewBusinessDeclarationVo) {
        return serviceDao.selectBusinessDeclarationWhere(viewBusinessDeclarationVo);
    }

    public int selectTotalselectServe(Pagination<ViewBusinessDeclarationVo> pagination) {
        return serviceDao.selectTotalselectServe(pagination);
    }

    public ProblemList selectProblemById(Integer pl_id) {
        return serviceDao.selectProblemById(pl_id);
    }

    /**
     * 删除服务描述
     *
     * @param pl_id
     * @return
     * @author JiangQT
     */
    public boolean deleteProblemToId(Integer pl_id) {
        return serviceDao.deleteProblemToId(pl_id) > 0;
    }

    /**
     * 删除服务描述
     *
     * @param st_id 服务类型编号
     * @return
     * @author JiangQT
     */
    public boolean deleteProblemToStId(Integer st_id) {
        return serviceDao.deleteProblemToStId(st_id) > 0;
    }

    public ServiceType selectServiceTypeById(Integer st_id) {
        return serviceDao.selectServiceTypeById(st_id);
    }

    /**
     * 通过父级编号查询分类信息列表
     *
     * @param parent_id
     * @return
     * @author JiangQT
     */
    public List<ServiceType> selectServiceTypeListByParentId(Integer parent_id) {
        return serviceDao.selectServiceTypeListByParentId(parent_id);
    }

    /**
     * 查询服务人员状态信息列表
     *
     * @param personStateListVo
     * @return
     * @author JiangQT
     */
    public List<ViewServicePersonStateListVo> selectServicePersonStateList(ViewServicePersonStateListVo personStateListVo) {
        return serviceDao.selectServicePersonStateList(personStateListVo);
    }

    public boolean selectServicePersonWorkStateByEmId(Integer em_id) {
        return serviceDao.selectServicePersonWorkStateByEmId(em_id) > 0;
    }

    /**
     * 查询服务申报单列表
     *
     * @param declaration
     * @return
     * @作者 JiangQT
     * @日期 2017年4月21日
     */
    public List<ViewBusinessDeclarationVo> queryServiceDeclarationOrderList(ViewBusinessDeclarationVo declaration) {
        return serviceDao.queryServiceDeclarationOrderList(declaration);
    }

    /**
     * 添加服务问题
     *
     * @param problem
     * @return
     * @author 陈智颖
     * @date Jun 3, 2017 11:48:23 AM
     */
    public int addProblem(Problem problem) {
        return serviceDao.addProblem(problem);
    }

    public int addserviceProcessProblem(ServiceProcessProblemVo serviceProcessProblemVo) {
        return serviceDao.addserviceProcessProblem(serviceProcessProblemVo);
    }

    /**
     * 删除服务问题
     *
     * @param problem
     * @return
     * @author 陈智颖
     * @date Jun 3, 2017 11:48:23 AM
     */
    public int deleteProblem(Problem problem) {
        return serviceDao.deleteProblem(problem);
    }

    public int deleteServiceProcessProblem(ServiceProcessProblemVo serviceProcessProblemVo) {
        return serviceDao.deleteServiceProcessProblem(serviceProcessProblemVo);
    }

    /**
     * 查询服务问题内容
     *
     * @param problem
     * @return
     * @author 陈智颖
     * @date Jun 3, 2017 1:45:13 PM
     */
    public List<Problem> selectProblem(Problem problem) {
        return serviceDao.selectProblem(problem);
    }

    /**
     * 修改维修申报状态
     *
     * @param maintenanceDeclaration
     * @return
     * @author 陈智颖
     * @date Jun 4, 2017 9:45:16 AM
     */
    public int updateStates(MaintenanceDeclaration maintenanceDeclaration) {
        return serviceDao.updateStates(maintenanceDeclaration);
    }


    /**
     * 退回服务进度
     *
     * @return
     * @author 陈智颖
     * @date Jun 4, 2017 9:45:16 AM
     */
    public int updateFollowUp(MaintenanceDispatching maintenanceDispatching) {
        return serviceDao.updateFollowUp(maintenanceDispatching);
    }


    /**
     * 删除服务申请以外的服务订单
     *
     * @return
     * @author 陈智颖
     * @date Jun 4, 2017 9:45:16 AM
     */
    public int deleteOrderFollow(MaintenanceOrder maintenanceOrder) {
        return serviceDao.deleteOrderFollow(maintenanceOrder);
    }

    /**
     * 退回删除跟进记录表
     *
     * @param maintenanceDeclaration
     * @return
     * @author 陈智颖
     * @date Jun 6, 2017 9:29:37 AM
     */
    public int deleteDispatching(MaintenanceDeclaration maintenanceDeclaration) {
        return serviceDao.deleteDispatching(maintenanceDeclaration);
    }

    /**
     * 完善服务子项目信息
     *
     * @param serviceType
     * @return
     */
    public int perfectService(ServiceType serviceType) {
        return serviceDao.perfectService(serviceType);
    }

    /**
     * @param md_id
     * @param serviceMoneyList
     * @throws AppException
     */
    public String updateServiceOrderBo(Integer md_id, List<ServiceMoney> serviceMoneyList) throws AppException {

        if (StringUtils.isEmpty(md_id)) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        String order_code = "";

        // 查询服务
        MaintenanceDeclaration declarationVo = this.selectDeclarationById(md_id);
        if (declarationVo == null) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }
        String moneyCode = declarationVo.getMdg_moneyCode();
        if (!AppUtil.isNotNull(moneyCode)) {
            moneyCode = AppUtil.getOrderCode("250");

            MaintenanceDeclaration declaration = new MaintenanceDeclaration();
            declaration.setMd_id(declarationVo.getMd_id());
            declaration.setMdg_moneyCode(moneyCode);
            updateDeclaration(declaration);
        }

        // 添加费用清单
        double payMoney = 0;
        if (null != serviceMoneyList && !serviceMoneyList.isEmpty()) {
            MaintenanceDeclaration declaration = new MaintenanceDeclaration();
            deleteSerivceMoney(declaration.getMd_id());

            for (ServiceMoney serviceMoney : serviceMoneyList) {

                serviceMoney.setMdg_moneyCode(moneyCode);
                serviceMoney.setSsm_date(new Date());
                serviceMoneyService.addServiceMoney(serviceMoney);

                payMoney += serviceMoney.getSsm_money();
            }

            order_code = AppUtil.getOrderCode("202");
            if (declarationVo.getOrder_code() != null) {
                order_code = declarationVo.getOrder_code();
            }

            // 删除订单、账单
            financeManageService.deleteFinanceOrder(order_code);
            financeManageService.deleteFinanceBill(order_code);

            // 【添加服务订单数据】
            ContractOrderVo contractOrderVo = new ContractOrderVo();
            contractOrderVo.setBco_code(order_code);
            contractOrderVo.setHi_code(declarationVo.getHi_code());
            contractOrderVo.setBco_orderType(AppConfig.order_type_2); // 定金订单类型
            contractOrderVo.setBco_type(203);
            contractOrderVo.setBco_userId(declarationVo.getUser_id());
            contractOrderVo.setBco_customer(declarationVo.getCc_code());
            contractOrderVo.setBco_currentBalPay(0);
            contractOrderVo.setBco_currentPayment(new BigDecimal(payMoney));
            contractOrderVo.setBco_currentDate(new Date());
            contractOrderVo.setBco_state(AppConfig.ORDER_STATE_1);
            contractOrderVo.setBco_optionState(AppConfig.order_option_state_2);
            contractOrderVo.setBco_butler(0);
            contractOrderVo.setBco_createTime(new Date());
            boolean boo = financeManageService.addContractOrder(contractOrderVo);
            if (!boo) {
                throw new AppException("生成订单失败，请重试或联系管理员");
            }

            // 【添加定金账单数据】
            ContractBillVo contractBillVo = new ContractBillVo();
            contractBillVo.setBcb_code(AppUtil.getOrderCode("212"));
            contractBillVo.setBco_code(contractOrderVo.getBco_code());
            contractBillVo.setBcb_type(AppConfig.CONTRACT_BILL_TYPE_3);
            contractBillVo.setBcb_balPay(0);
            contractBillVo.setBcb_repayment(new BigDecimal(payMoney));
            contractBillVo.setBcb_repaymentDate(new Date());
            contractBillVo.setBcb_state(AppConfig.order_option_state_2);
            /*contractBillVo.setBcb_budgetState(0);
            contractBillVo.setBcb_payWay(payWay);
            contractBillVo.setBcb_creator(0);
            contractBillVo.setBcb_operater(0);
            contractBillVo.setBcb_remarks(bcb_remarks);*/
            contractBillVo.setBcb_createTime(new Date());
            boo = financeManageService.addContractBill(contractBillVo);
            if (!boo) {
                throw new AppException("生成账单失败，请重试或联系管理员");
            }

            // 更新服务订单的订单号
            declaration = new MaintenanceDeclaration();
            declaration.setMd_id(declarationVo.getMd_id());
            declaration.setOrder_code(contractOrderVo.getBco_code());
            this.updateDeclaration(declaration);

        }
        return order_code;
    }

    /**
     * 生成服务订单
     *
     * @param money         付费对象 1-客户；2-管家；3-门店
     * @param declarationVo
     * @throws AppException
     */
    public void genrateServiceOrder(ServiceMoney money, MaintenanceDeclaration declarationVo) throws Exception {
        if (money.getSsm_money() <= 0) {
            return;
        }

        String order_code = AppUtil.getOrderCode("202");

        // 删除订单、账单
        financeManageService.deleteFinanceOrder(order_code);
        financeManageService.deleteFinanceBill(order_code);

        if (null == money.getIs_order() || money.getIs_order().intValue() == 0) {

            int payObject = money.getPayObject().intValue();
            if (payObject == 1) {
                genrateCustOrder(money, declarationVo, order_code);
            } else if (payObject == 2) {
                List<Company> companyList = employeeService.selectCompanyByPersonId(money.getEm_id());
                if (null == companyList && companyList.isEmpty()) {
                    return;
                }
                ContractOrderVo contractOrderVo = genrateOrder(money, order_code, declarationVo, money.getSsm_money(), 2, companyList.get(0).getUcc_id(), false);
                genrateBill(contractOrderVo, money.getSsm_money(), 2, true, null);
            } else if (payObject == 3) {
                ContractOrderVo contractOrderVo = genrateOrder(money, order_code, declarationVo, money.getSsm_money(), 2, money.getUcc_id(), false);
                genrateBill(contractOrderVo, money.getSsm_money(), 2, true, null);
            }

            declarationVo.setOrder_code(order_code);
            handleService.saveOrderMD(declarationVo);

            money.setIs_order(1);// 已生成
            serviceDao.updateServiceMoney(money);
        }
    }

    /**
     * 生成客户/用户个人订单、账单
     *
     * @param money
     * @param declarationVo
     * @param order_code
     * @throws AppException
     */
    private void genrateCustOrder(ServiceMoney money, MaintenanceDeclaration declarationVo, String order_code) throws AppException {

        List<MaintenancePoint> pointList = serviceDao.queryPointByMdId(declarationVo.getMd_id());
        if (null == pointList || pointList.isEmpty()) {
            return;
        }
        String hi_code = "";
        for (MaintenancePoint point : pointList) {
            int p_type = point.getP_type().intValue();
            if (p_type == 1 || p_type == 3) {
                hi_code = point.getHi_code();
            }
        }

        // 是公司客户，且本次申请的服务房子为客户合同房屋
        if (!StringUtils.isEmpty(hi_code)) {

            PositionRecordVo positionRecordVo = new PositionRecordVo();
            positionRecordVo.setHi_code(hi_code);
            positionRecordVo = houseLibraryService.queryContractPositionRecord(positionRecordVo);

            boolean isUccId = false;// 有hi_code且付费对象为客户，则需生成门店支出订单

            // 生成订单为应支付，状态为待还款的订单
            ContractOrderVo contractOrderVo = genrateOrder(money, order_code, declarationVo, money.getSsm_money(), AppConfig.order_option_state_2, positionRecordVo.getUcc_id(), isUccId);

            // 生成账单为金额为应支付，状态为待还款账单
            genrateBill(contractOrderVo, money.getSsm_money(), AppConfig.bcb_state_2, StringUtils.isEmpty(declarationVo.getHi_code()), positionRecordVo.getUcc_id());

        } else {// 非公司客户-外部用户
            // 生成公司收入订单、账单
            ContractOrderVo contractOrderVo = genrateOrder(money, order_code, declarationVo, money.getSsm_money(), 2, null, true);
            genrateBill(contractOrderVo, money.getSsm_money(), 2, true, null);
        }
    }

    /**
     * 生成订单
     *
     * @param money
     * @param order_code
     * @param declarationVo
     * @param payMoney
     * @param optionState
     * @param isUccId       判断收支对象是否为公司
     * @return
     * @throws AppException
     */
    private ContractOrderVo genrateOrder(ServiceMoney money, String order_code, MaintenanceDeclaration declarationVo, double payMoney, Integer optionState, Integer bco_uccId, boolean isUccId) throws AppException {

        ViewBusinessDeclarationVo vb = serviceDao.queryServiceMsg(declarationVo.getMd_id());
        // 【添加服务订单数据】
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setBco_payObject(money.getPayObject());
        contractOrderVo.setBco_code(order_code);
        contractOrderVo.setBco_orderType(AppConfig.order_type_2); // 定金订单类型
        contractOrderVo.setBco_type(203);
        contractOrderVo.setBco_title(vb.getSm_name());
        contractOrderVo.setBco_description(vb.getSm_name() + "-" + vb.getSt_name());
        contractOrderVo.setBco_userId(money.getUser_id());
        contractOrderVo.setBco_customer(money.getCc_code());
        contractOrderVo.setUcc_id(money.getUcc_id());
        contractOrderVo.setEm_id(money.getEm_id());
        contractOrderVo.setBco_currentPayment(new BigDecimal(payMoney));
        contractOrderVo.setBco_currentDate(new Date());
        contractOrderVo.setBco_state(AppConfig.ORDER_STATE_1);
        contractOrderVo.setBco_optionState(optionState);
        contractOrderVo.setBco_butler(0);
        contractOrderVo.setBco_createTime(new Date());
        contractOrderVo.setContractObject_code(declarationVo.getContractObject_Code());
        if (isUccId) {
            contractOrderVo.setBco_uccId(1);// 外部用户的服务、管家或门店的付费为公司收入
            contractOrderVo.setBco_currentBalPay(0);// 公司收入
        } else {
            contractOrderVo.setHi_code(declarationVo.getHi_code());
            contractOrderVo.setBco_uccId(bco_uccId);
            contractOrderVo.setBco_currentBalPay(0);// 门店支出
        }
        boolean boo = financeManageService.addContractOrder(contractOrderVo);
        if (!boo) {
            throw new AppException("生成订单失败，请重试或联系管理员");
        }
        return contractOrderVo;
    }

    /**
     * 生成账单
     *
     * @param contractOrderVo
     * @param payMoney
     * @param bcb_state
     * @param hasHiCode
     * @return
     * @throws AppException
     */
    private ContractBillVo genrateBill(ContractOrderVo contractOrderVo, double payMoney, Integer bcb_state, boolean hasHiCode, Integer bcb_uccId) throws AppException {
        // 【添加定金账单数据】
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBcb_code(AppUtil.getOrderCode("212"));
        contractBillVo.setBco_code(contractOrderVo.getBco_code());
        contractBillVo.setBcb_type(AppConfig.CONTRACT_BILL_TYPE_3);
        contractBillVo.setBcb_repayment(new BigDecimal(payMoney));
        contractBillVo.setBcb_repaymentDate(new Date());
        contractBillVo.setBcb_state(AppConfig.order_option_state_2);
        contractBillVo.setBcb_state(bcb_state);
        /*contractBillVo.setBcb_budgetState(0);
        contractBillVo.setBcb_payWay(payWay);
        contractBillVo.setBcb_creator(0);
        contractBillVo.setBcb_operater(0);
        contractBillVo.setBcb_remarks(bcb_remarks);*/
        contractBillVo.setBcb_createTime(new Date());
        contractBillVo.setBcb_balPay(0);
        contractBillVo.setBcb_uccId(hasHiCode ? 1 : bcb_uccId);// 门店支出
        boolean boo = financeManageService.addContractBill(contractBillVo);
        if (!boo) {
            throw new AppException("生成账单失败，请重试或联系管理员");
        }
        return contractBillVo;
    }

    // 生成流水
    public FinancePayFlowStatementVo genrateStatement(ServicePayMoneyVo servicePayMoneyVo, double payMoney, double discount, Integer serviceChargeType, String bco_code) throws Exception {
        // 【添加流水数据】
        FinancePayFlowStatementVo payFlowStatementVo = new FinancePayFlowStatementVo();
        payFlowStatementVo.setBs_serialNumber(AppUtil.getOrderCode("220"));
        payFlowStatementVo.setBs_orderNumber(AppUtil.getOrderCode("221"));
        payFlowStatementVo.setHi_code(servicePayMoneyVo.getHi_code());
        payFlowStatementVo.setBs_type(2);
        payFlowStatementVo.setBs_title("服务费");
        payFlowStatementVo.setBs_subtitle(servicePayMoneyVo.getSo_targetAddress() + "服务费");
        payFlowStatementVo.setBs_money(new BigDecimal(payMoney));
        payFlowStatementVo.setBs_discount(new BigDecimal(discount));
        payFlowStatementVo.setBco_code(bco_code);
        payFlowStatementVo.setBs_state(AppConfig.bs_state_2); // 已收款
        payFlowStatementVo.setBs_flowState(AppConfig.bs_flowState_4);// 交易完成
        payFlowStatementVo.setBs_payType("现金"); // 支付方式
        payFlowStatementVo.setBs_balPay(1); // 公司收款
        payFlowStatementVo.setBs_payeeCode(null);// 收款方
        payFlowStatementVo.setBs_payeeName("重庆管家婆房地产经纪有限公司");
        payFlowStatementVo.setBs_payerCode(servicePayMoneyVo.getCc_code());// 付款方
        payFlowStatementVo.setBs_payerName(servicePayMoneyVo.getCc_name());
        payFlowStatementVo.setBs_createTime(new Date());
        payFlowStatementVo.setBs_invalidTime(AppUtil.getCalendar(payFlowStatementVo.getBs_createTime(), Calendar.MINUTE, 2).getTime());
        boolean boo = financeManageService.addPayFlowStatement(payFlowStatementVo);
        if (!boo) {
            throw new AppException("添加流水失败，请重试");
        }

        return payFlowStatementVo;
    }

    // 添加流水账单关联关系
    public void genrateStatementBillRelation(String bs_serialNumber, ContractBillVo contractBillVo) throws AppException {

        FinanceStatementBillRelationVo statementBillRelationVo = new FinanceStatementBillRelationVo();
        statementBillRelationVo.setBs_serialNumber(bs_serialNumber);
        statementBillRelationVo.setBcb_code(contractBillVo.getBcb_code());
        statementBillRelationVo.setSbr_money(contractBillVo.getBcb_repayment());
        statementBillRelationVo.setSbr_createTime(new Date());
        boolean boo = financeManageService.addStatementBillRelation(statementBillRelationVo);
        if (!boo) {
            throw new AppException("添加流水关系失败，请重试");
        }
    }

    // 添加服务费使用记录
    private void genrateChargeRecord(Integer md_id, double payMoney, ServiceCharge serviceCharge) {
        // 生成服务费使用记录
        ServiceChargeRecord serviceChargeRecord = new ServiceChargeRecord();
        serviceChargeRecord.setMd_id(md_id);
        serviceChargeRecord.setService_charge(payMoney);
        serviceChargeRecord.setDiscount(0.0);
        serviceChargeRecord.setCon_code(serviceCharge.getCon_code());
        serviceChargeRecord.setCc_code(serviceCharge.getCc_code());
        serviceChargeRecord.setHi_code(serviceCharge.getHi_code());
        serviceChargeRecordService.appAddServiceChargeRecord(serviceChargeRecord);
    }


    /**
     * APP添加费用
     *
     * @param md_id
     * @param mdg_money
     * @param money
     * @param payId
     * @return
     * @throws Exception
     */
    public Map<String, Object> addserviceMoneyApp(Integer md_id, Double mdg_money, ServiceMoney money, String payId) throws Exception {
        Map<String, Object> map = new HashMap<>();
        MaintenanceDeclaration declarations = this.selectDeclarationAppById(md_id);
        declarations.setMdg_money(mdg_money);
        MaintenanceTracks maintenanceTracks = this.selectMaintenanceTracksById(md_id);
        maintenanceTracks.setMtk_state("enter");

        this.updataDeclarationPerson(declarations);
        //List<ServiceMoney> serviceMoneyList = serviceMoneyService.selectServiceMoney(money);
        //ServiceMoney serviceMoney = new ServiceMoney();
        if (payId.startsWith("CUS")) {
            money.setCc_code(payId);
            //serviceMoney.setCc_code(payId);

        } else {
            money.setUser_id(Integer.valueOf(payId));
            //serviceMoney.setUser_id(Integer.valueOf(payId));
        }

        //根据md_id删除[服务费用清单]
        this.deleteSerivceMoney(md_id);

        //是否有订单,没有则新增一条
        //if (serviceMoneyList.size() == 0) {
        money.setSsm_date(new Date());
        money.setMd_id(md_id);
        serviceMoneyService.addServiceMoney(money);
        //}


        /*serviceMoney.setSsm_date(new Date());
        serviceMoney.setMd_id(md_id);
        serviceMoney.setPayObject(money.getPayObject());
        serviceMoney.setSsm_money(Double.valueOf(personMoney));
        serviceMoney.setSsm_source("人工费");
        Integer i = serviceMoneyService.addServiceMoney(serviceMoney);*/


        //Double ssm_money = serviceMoney.getSsm_money();
        Double ssm_money1 = money.getSsm_money();

        //合并人工费和应付费用
        //Double totalSmm = ssm_money + ssm_money1;
        money.setSsm_money(ssm_money1);

        handleService.updataTracks(maintenanceTracks);
        this.genrateServiceOrder(money, declarations);
        map.put("message", "success");

        return map;

    }

    /**
     * 查询有效的房东或租客
     *
     * @return
     */
    public List<ContractObjectVo> queryHouseCustomerList(Pagination<ContractObjectVo> voPagination) {
        return serviceDao.queryHouseCustomerList(voPagination);
    }

    /**
     * 查询客服人员所有未完成、当前正在做的任务等信息
     *
     * @return
     */
    public List<ViewBusinessDeclarationVo> queryCustomerServiceState() {
        return serviceDao.queryCustomerServiceState();
    }

    /**
     * 查询客服人员个人未完成订单
     *
     * @param em_id
     * @return
     */
    public List<ViewBusinessDeclarationVo> queryMdOrderByEmId(Integer em_id) {
        return serviceDao.queryMdOrderByEmId(em_id);
    }

    /**
     * 查询所有管家，但主管家排第一位
     *
     * @param userCenterEmployee
     * @return
     */
    public List<UserCenterEmployee> queryEmployee(UserCenterEmployee userCenterEmployee) {
        return serviceDao.queryEmployee(userCenterEmployee);
    }

    /**
     * 查询所有门店，但归属部门排第一位
     *
     * @param pagination
     * @return
     */
    public List<Company> queryCompany(Pagination<Company> pagination) {
        return serviceDao.queryCompany(pagination);
    }

    /**
     * 添加房屋地址坐标
     *
     * @param maintenancePoint
     * @return
     */
    public int addPoint(MaintenancePoint maintenancePoint) {
        return serviceDao.addPoint(maintenancePoint);
    }

    /**
     * 查询用户信息
     *
     * @return
     */
    public UserCenterUserVo queryUserVo(Integer user_id) {
        return serviceDao.queryUserVo(user_id);
    }

    /**
     * 根据证件号码查询相关客户
     *
     * @param cc_cardNum
     * @return
     */
    public List<UserCustomer> queryCustomerByCradNum(String cc_cardNum) {
        return serviceDao.queryCustomerByCradNum(cc_cardNum);
    }

    /**
     * 查询服务费用
     *
     * @param md_id
     * @return
     */
    public List<ServiceMoney> queryServiceMoneyList(Integer md_id) {
        return serviceDao.queryServiceMoneyList(md_id);
    }

    public ServiceMoney queryServiceMoney(ServiceMoney serviceMoney) {
        return serviceDao.queryServiceMoney(serviceMoney);
    }

    public int updateTracks(MaintenanceTracks maintenanceTracks) {
        return serviceDao.updateTracks(maintenanceTracks);
    }

    public int addMoneyDetail(ServiceMoneyDetail serviceMoneyDetail) {
        return serviceDao.addMoneyDetail(serviceMoneyDetail);
    }

    public List<UserCustomer> queryCustomerByCode(String cc_code) {
        return serviceDao.queryCustomerByCode(cc_code);
    }

    public int updateMaintenancePoint(MaintenancePoint maintenancePoint) {
        return serviceDao.updateMaintenancePoint(maintenancePoint);
    }

    public int updateMaintenanceDeclartion(MaintenanceDeclaration maintenanceDeclaration) {
        return serviceDao.updateMaintenanceDeclartion(maintenanceDeclaration);
    }

    public Pagination<ServiceOrderVo> queryServicePageList(Pagination<ServiceOrderVo> pagination) {
        return serviceDao.queryServicePageList(pagination);
    }

    public List<ServiceMoneyDetail> queryMoneyDetailList(Integer md_id) {
        return serviceDao.queryMoneyDetailList(md_id);
    }

    public List<ServiceOrderVo> selectServiceOrderInfoList(ServiceOrderVo serviceOrderVo) throws Exception {
        return serviceDao.selectServiceOrderInfoList(serviceOrderVo);
    }

    /**
     * 新版服务下单
     *
     * @param serviceOrderVo
     * @return 200-success; 400-msg
     * @throws Exception
     */
    public String saveServiceOrderInfo(ServiceOrderVo serviceOrderVo) throws Exception {
        Msg<Object> msg = new Msg<>();

        if (null == serviceOrderVo) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 【添加合同对象信息】
        final String so_code = AppUtil.getOrderCode("SON");
        serviceOrderVo.setSo_code(so_code);
        if (serviceOrderVo.getSo_source() == AppConfig.so_source_12) {
            serviceOrderVo.setSo_source(AppConfig.so_source_12);// 内部申请app
        } else if (serviceOrderVo.getSo_source() == AppConfig.so_source_11) {
            serviceOrderVo.setSo_source(AppConfig.so_source_11);// 内部申请pc
        }

        serviceOrderVo.setSo_payNameNew(serviceOrderVo.getSo_payName());
        serviceOrderVo.setSo_payPhoneNew(serviceOrderVo.getSo_payPhone());
        serviceOrderVo.setSo_createTime(new Date());
        serviceOrderVo.setSo_state(AppConfig.so_state_1100);
        // 添加房屋当前所属门店
        if (!StringUtils.isEmpty(serviceOrderVo.getHi_code())) {
            HousePositionCompanyVo positionCompanyVo = new HousePositionCompanyVo();
            positionCompanyVo.setHi_code(serviceOrderVo.getHi_code());
            positionCompanyVo = houseLibraryService.queryHouseCompanyInfo(positionCompanyVo);
            if (null != positionCompanyVo) {
                serviceOrderVo.setSo_department(positionCompanyVo.getUcc_id());
            }
        }

        int result = serviceDao.addServiceOrderInfo(serviceOrderVo);
        if (result > 0) {

            if (StringUtils.isEmpty(serviceOrderVo.getSt_id_c())) {
                ServiceOrderItemVo serviceOrderItemVo = new ServiceOrderItemVo();
                serviceOrderItemVo.setSo_id(serviceOrderVo.getSo_id());
                serviceOrderItemVo.setSt_id_b(Integer.valueOf(serviceOrderVo.getSt_id_b()));
                serviceDao.addServiceOrderItemInfo(serviceOrderItemVo);
            } else {
                String[] st_id_c_arr = serviceOrderVo.getSt_id_c().split(",");
                for (String aSt_id_c_arr : st_id_c_arr) {
                    ServiceOrderItemVo serviceOrderItemVo = new ServiceOrderItemVo();
                    serviceOrderItemVo.setSo_id(serviceOrderVo.getSo_id());
                    serviceOrderItemVo.setSt_id_b(Integer.valueOf(serviceOrderVo.getSt_id_b()));
                    serviceOrderItemVo.setSt_id_c(Integer.valueOf(aSt_id_c_arr));
                    serviceDao.addServiceOrderItemInfo(serviceOrderItemVo);
                }
            }

            this.addServiceRecordBo(serviceOrderVo.getSo_id(), AppConfig.so_state_1100, serviceOrderVo.getOpeater(), null);
            ServiceOrderInfoVo serviceOrderInfoVo = new ServiceOrderInfoVo();
            if (serviceOrderVo.getSoin_moveStartAddress() != null) {
                serviceOrderInfoVo.setSoin_moveStartAddress(serviceOrderVo.getSoin_moveStartAddress());
                serviceOrderInfoVo.setSoin_moveStartPoint(serviceOrderVo.getSoin_moveStartPoint());
                serviceOrderInfoVo.setSoin_moveEndAddress(serviceOrderVo.getSoin_moveEndAddress());
                serviceOrderInfoVo.setSoin_moveEndPoint(serviceOrderVo.getSoin_moveEndPoint());
                serviceOrderInfoVo.setSo_id(serviceOrderVo.getSo_id());
                serviceOrderInfoVo.setSoin_createTime(new Date());
                serviceDao.addServiceOrderInfoApp(serviceOrderInfoVo);
            }

            msg.setCode(200);
            msg.setMsg("success");
        } else {
            msg.setCode(400);
            msg.setMsg("服务下单失败，请重试或联系管理员");
        }
        return msg.toString();
    }

    public boolean updateServiceOrder(ServiceOrderVo serviceOrderVo) {
        return serviceDao.updateServiceOrder(serviceOrderVo) > 0;
    }

    /**
     * 服务信息更改
     *
     * @param serviceOrderVo
     * @return 200-success; 400-msg
     * @throws Exception
     */
    public Msg<Object> updateServiceOrderInfoById(ServiceOrderVo serviceOrderVo, String so_remarks) throws AppException {
        Msg<Object> msg = new Msg<>();
        boolean result = this.updateServiceOrder(serviceOrderVo);
        if (!result) {
            throw new AppException("数据不存在或其他异常导致更新失败");
        }

        Integer em_id = -1;
        // 查询人员信息
        if (serviceOrderVo.getSo_handler() != null) {
            UserCenterEmployee employee = employeeService.queryEmployeeInfo(serviceOrderVo.getSo_handler());
            if (employee != null) {
                em_id = employee.getEm_id();
            }
        }
        this.addServiceRecordBo(serviceOrderVo.getSo_id(), serviceOrderVo.getSo_state(), em_id, so_remarks);
        return msg;
    }

    /**
     * 查询服务基本信息
     */
    public List<ServiceMessage> queryAllServiceMessage() {
        return serviceDao.queryAllServiceMessage();
    }

    /**
     * 根据服务ID查询服务类型
     *
     * @return
     */
    public List<ServiceType> queryMessageID(ServiceType serviceType) {
        return serviceDao.queryMessageID(serviceType);
    }


    /**
     * 根据服务ID查询父级
     *
     * @return
     */
    public List<ServiceType> selectTypeID(ServiceType serviceType) {
        return serviceDao.selectTypeID(serviceType);
    }

    /**
     * 查询外协服务人员
     *
     * @param servicePersonVo
     * @return
     */
    public List<ServicePersonVo> queryServicePerson(ServicePersonVo servicePersonVo) {
        return serviceDao.queryServicePerson(servicePersonVo);
    }

    /**
     * 查询服务记录列表
     *
     * @param serviceRecordVo
     * @return
     */
    public List<ServiceRecordVo> queryServiceRecordList(ServiceRecordVo serviceRecordVo) {
        return serviceDao.queryServiceRecordList(serviceRecordVo);
    }

    /**
     * 查询服务订单项目
     *
     * @param serviceOrderItemVo
     * @return
     */
    public List<ServiceOrderItemVo> queryServiceOrderItemList(ServiceOrderItemVo serviceOrderItemVo) {
        return serviceDao.queryServiceOrderItemList(serviceOrderItemVo);
    }

    /**
     * 查询派工人员表中是否已存在
     *
     * @param em_id
     * @return
     */
    public ServicePersonVo queryServicePersonById(Integer em_id) {
        return serviceDao.queryServicePersonById(em_id);
    }

    /**
     * 查询派工人员表中是否已存在
     *
     * @param sp_id
     * @return
     */
    public ServicePersonVo queryServicePersonBySid(Integer sp_id) {
        return serviceDao.queryServicePersonBySid(sp_id);
    }

    public ServicePersonVo addServicePerson(Integer service_id, String service_name, String service_phone, Integer service_type, Integer service_sex) {
        ServicePersonVo servicePersonVo = new ServicePersonVo();
        servicePersonVo.setEm_id(service_id);
        servicePersonVo.setSp_name(service_name);
        servicePersonVo.setSp_phone(service_phone);
        servicePersonVo.setSp_type(service_type);
        servicePersonVo.setSp_sex(service_sex);
        servicePersonVo.setSp_state(1);// 有效人员
        servicePersonVo.setSp_code(AppUtil.getOrderCode("SPN"));

        int result = serviceDao.addServicePerson(servicePersonVo);

        return result == 1 ? servicePersonVo : null;
    }

    /**
     * 提交接单
     *
     * @param so_id
     * @param spro_state
     * @throws AppException
     */
    public void submitServiceReceive(Integer em_id, Integer so_id, Integer spro_state, Integer spro_expectEndDuration, String refusedArea) throws AppException {
        ServiceOrderVo serviceOrderVo = this.queryServiceInfo(so_id);
        if (serviceOrderVo == null) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 更改订单状态为已接单
        if (1 == spro_state) {// 接单
            ServiceOrderVo serviceOrderVo1 = new ServiceOrderVo();
            serviceOrderVo1.setSo_id(so_id);
            serviceOrderVo1.setSo_state(AppConfig.so_state_3100);
            serviceDao.updateServiceOrder(serviceOrderVo1);
            // 查询派单记录
            ServiceProcessVo serviceProcessVo = new ServiceProcessVo();
            serviceProcessVo.setSo_id(so_id);
            serviceProcessVo.setSpro_state(AppConfig.spro_state_1);
            serviceProcessVo = this.queryServiceProcess(serviceProcessVo);
            if (serviceProcessVo == null) {
                throw new AppException(Msg.MSG_PARAM_ERROR);
            }

            // 更新派单记录
            ServiceProcessVo serviceProcessVo1 = new ServiceProcessVo();
            serviceProcessVo1.setSpro_id(serviceProcessVo.getSpro_id());
            serviceProcessVo1.setSp_id(serviceOrderVo.getSo_currentCharger());// 当前负责人
            serviceProcessVo1.setSpro_expectEndDuration(spro_expectEndDuration + "");
            serviceProcessVo1.setSpro_state(spro_state);
            serviceProcessVo1.setSpro_remarks("已接单");
            this.updateServiceProcess(serviceProcessVo1);

            // 添加服务记录
            this.addServiceRecordBo(so_id, AppConfig.so_state_3100, em_id, null);
        } else if (3 == spro_state) {// 拒绝接单
            ServiceOrderVo serviceOrderVo1 = new ServiceOrderVo();
            serviceOrderVo1.setSo_id(so_id);
            serviceOrderVo1.setSo_state(AppConfig.so_state_2100);
            serviceDao.updateServiceOrder(serviceOrderVo1);

            // 查询派单记录
            ServiceProcessVo serviceProcessVo = new ServiceProcessVo();
            serviceProcessVo.setSo_id(so_id);
            serviceProcessVo.setSpro_state(AppConfig.spro_state_1);
            serviceProcessVo = this.queryServiceProcess(serviceProcessVo);
            if (serviceProcessVo == null) {
                throw new AppException(Msg.MSG_PARAM_ERROR);
            }

            // 更新派单记录
            ServiceProcessVo serviceProcessVo1 = new ServiceProcessVo();
            serviceProcessVo1.setSpro_id(serviceProcessVo.getSpro_id());
            serviceProcessVo1.setSp_id(serviceOrderVo.getSo_currentCharger());// 当前负责人
            serviceProcessVo1.setSpro_expectEndDuration(spro_expectEndDuration + "");
            serviceProcessVo1.setSpro_state(AppConfig.spro_state_2);
            serviceProcessVo1.setSpro_remarks("拒绝接单，等待改派，拒绝理由[ " + refusedArea + " ]");
            this.updateServiceProcess(serviceProcessVo1);

            // 添加服务记录
            this.addServiceRecordBo(so_id, AppConfig.so_state_2100, em_id, "拒绝接单，拒绝理由[ " + refusedArea + " ]");
        }

    }

    public List<ServiceMoney> queryServiceMoneyBySoId(ServiceMoney serviceMoney) {
        return serviceDao.queryServiceMoneyBySoId(serviceMoney);
    }

    public Map<String, Object> saveServiceImage(Integer oprate, Integer so_id, String si_type, String si_path) {
        Map<String, Object> map = new HashMap<>();
        int result = -1;
        if (1 == oprate.intValue()) {
            ServiceImageVo serviceImageVo = new ServiceImageVo();
            serviceImageVo.setSo_id(so_id);
            serviceImageVo.setSi_type(si_type);
            serviceImageVo.setSi_path(si_path);
            result = serviceDao.addServiceImage(serviceImageVo);
        } else if (2 == oprate.intValue()) {
            result = serviceDao.deleteServiceImageByPath(si_path);
        }
        if (result == 1) {
            map.put("code", 200);
            map.put("msg", "success");
        } else {
            map.put("code", 401);
            map.put("msg", "error");
        }
        return map;
    }

    /**
     * 生成服务订单
     *
     * @param money 付费对象 1-客户；2-管家；3-门店
     * @throws AppException
     */
    public OrderVo genrateNewServiceOrder(ServiceMoney money, ServiceOrderVo serviceOrderVo, Integer channel) throws Exception {
        if (money.getSsm_money() < 0) {
            return null;
        }

        String order_sn = AppUtil.getOrderSN(channel);

        OrderVo orderVo = new OrderVo();
        orderVo.setOrder_type(AppConfig.order_type_2);// 服务订单
        orderVo.setOrder_channel(channel);
        orderVo.setOrder_balpay(AppConfig.balPay_1);
        orderVo.setOrder_title(serviceOrderVo.getSm_name() + "费用");
        orderVo.setOrder_con_code(serviceOrderVo.getContractObject_Code());
        orderVo.setOrder_hi_code(StringUtils.isEmpty(serviceOrderVo.getHi_code()) ? null : serviceOrderVo.getHi_code());
        orderVo.setOrder_status(AppConfig.order_status_2);
        orderVo.setDetail_count(1);
        orderVo.setOrder_operator(serviceOrderVo.getOpeater());
        orderVo.setOrder_create_time(new Date());

        MaintenanceDeclaration declaration = new MaintenanceDeclaration();
        declaration.setSo_id(serviceOrderVo.getSo_id());
        declaration.setOrder_code(order_sn);
        handleService.saveOrderMD(declaration);

        orderVo.setParam_order_code(order_sn);
        if (null == money.getIs_order() || money.getIs_order() == 0) {

            int payObject = money.getPayObject();
            if (payObject == 4 || payObject == 5) {
                // 生成订单、账单信息
//                contractOrderVo = genrateNewCustOrder(money, serviceOrderVo, order_code);

                orderVo.setTrade_object(payObject);
                orderVo.setTrade_cc_code(money.getCc_code());

                PositionRecordVo positionRecordVo = new PositionRecordVo();
                positionRecordVo.setHi_code(serviceOrderVo.getHi_code());
                positionRecordVo = houseLibraryService.queryContractPositionRecord(positionRecordVo);

                // 总金额
                Double detail_amount_total = money.getSsm_money();
                orderVo.setDetail_amount_total(detail_amount_total);

                // 初始化数据
                JSONObject map = deductService(orderVo, serviceOrderVo).getJson();
                Double reallyMoney = new BigDecimal(map.get("reallyMoney").toString()).doubleValue();

                // 计算，生成服务费
                ServicePayMoneyVo servicePayMoneyVo = (ServicePayMoneyVo) map.get("servicePayMoneyVo");

                /******* 保存订单详情 *****/
                // 减免费用
                Double annulMoney = new BigDecimal(map.get("annulMoney").toString()).doubleValue();
                this.addOrderDetailForService(order_sn, AppConfig.detail_type_3, serviceOrderVo.getSo_code(), "减免", annulMoney, AppConfig.order_type_2);
                // 折扣费用
                Double discountMoney = new BigDecimal(map.get("discountMoney").toString()).doubleValue();
                this.addOrderDetailForService(order_sn, AppConfig.detail_type_7, serviceOrderVo.getSo_code(), "折扣", discountMoney, AppConfig.order_type_2);
                // 抵扣费用
                Double deductMoney = new BigDecimal(map.get("deductMoney").toString()).doubleValue();
                this.addOrderDetailForService(order_sn, AppConfig.detail_type_2, serviceOrderVo.getSo_code(), "抵扣", deductMoney, AppConfig.order_type_2);
                // 商品金额
                Double totalMoney = new BigDecimal(map.get("totalMoney").toString()).doubleValue();
                this.addOrderDetailForService(order_sn, AppConfig.detail_type_1, serviceOrderVo.getSo_code(), money.getSsm_source(), totalMoney, AppConfig.order_type_1);

                // 优惠金额
                Double detail_amount_coupon = annulMoney + discountMoney + deductMoney;
                // 订单总金额
                Double order_amount_total = detail_amount_total - detail_amount_coupon;
                // 充值赠送金额
                Double recharge_amount_give = 0.0;
                // 余额抵扣金额
                Double order_balance_deduction = 0.0;
                // 订单支付金额
                Double order_amount_pay = order_amount_total - order_balance_deduction;

                orderVo.setOrder_sn(order_sn);
                orderVo.setDetail_amount_coupon(0.0);
                orderVo.setOrder_amount_total(0.0);
                orderVo.setOrder_amount_pay(0.0);
                orderVo.setOrder_balance_deduction(0.0);
                orderVo.setOrder_amount_pay(0.0);
                orderVo.setRecharge_amount_give(0.0);
                orderVo.setOrder_ucc_id(positionRecordVo.getUcc_id());
                orderDao.addOrder(orderVo);

                orderVo.setReallyMoney(reallyMoney);
                // 是否需要生成门店订单
                if (null != map.get("uccOrder")) {
                    boolean isUccOrder = (boolean) map.get("uccOrder");
                    if (isUccOrder) {
                        OrderVo uccOrder = new OrderVo();
                        String orderCode = AppUtil.getOrderCode("202");
                        uccOrder.setOrder_sn(orderCode);
                        uccOrder.setOrder_type(AppConfig.order_type_2);// 服务订单
                        uccOrder.setOrder_channel(channel);
                        uccOrder.setOrder_balpay(AppConfig.balPay_1);
                        uccOrder.setOrder_title(serviceOrderVo.getSm_name() + "费用");
                        uccOrder.setOrder_con_code(serviceOrderVo.getContractObject_Code());
                        uccOrder.setOrder_hi_code(StringUtils.isEmpty(serviceOrderVo.getHi_code()) ? null : serviceOrderVo.getHi_code());
                        uccOrder.setOrder_status(AppConfig.order_status_2);
                        uccOrder.setDetail_count(1);
                        uccOrder.setOrder_ucc_id(positionRecordVo.getUcc_id());
                        uccOrder.setOrder_operator(serviceOrderVo.getOpeater());
                        uccOrder.setOrder_create_time(new Date());
                        uccOrder.setTrade_object(AppConfig.trade_object_3);
                        uccOrder.setTrade_ucc_id(positionRecordVo.getUcc_id());
                        uccOrder.setDetail_amount_total(discountMoney);
                        uccOrder.setDetail_amount_coupon(0.0);
                        uccOrder.setOrder_balance_deduction(0.0);
                        uccOrder.setRecharge_amount_give(0.0);
                        uccOrder.setOrder_amount_total(discountMoney);
                        uccOrder.setOrder_amount_pay(discountMoney);
                        uccOrder.setTrade_cc_code(null);// 清空
                        orderDao.addOrder(uccOrder);

                        this.addOrderDetailForService(orderCode, AppConfig.detail_type_1, serviceOrderVo.getSo_code(), money.getSsm_source(), discountMoney, AppConfig.order_type_1);

                        MaintenanceDeclaration declaration1 = new MaintenanceDeclaration();
                        declaration1.setSo_id(serviceOrderVo.getSo_id());
                        declaration1.setOrder_code(orderCode);
                        handleService.saveOrderMD(declaration1);

                        //只用于生成门店订单返回的order_sn
                        orderVo.setUcc_order_sn(orderCode);

                        // 查询服务费用
                        ServicePayMoneyVo moneyVo = new ServicePayMoneyVo();
                        moneyVo.setOrder_sn(orderCode);
                        moneyVo = serviceDao.queryServicePayMoneyInfo(moneyVo);
                        // 发送短信
                        String msg = SmsUtil.sendEmpServicePayInfo("店长", moneyVo.getUcc_managerName(), moneyVo.getUcc_managerPhone(), moneyVo.getHouse_address(), moneyVo.getSm_name(), discountMoney + "", "门店");
                        // 生成短信记录
                        smsService.addSMSRecordForUcc(moneyVo.getHi_code(), moneyVo.getCon_code(), msg, moneyVo.getUcc_id());
                    }
                }

                // 发送短信
                String msg = SmsUtil.sendCusServicePayInfo(servicePayMoneyVo.getCc_name(), servicePayMoneyVo.getCcp_phone(), servicePayMoneyVo.getHouse_address(), servicePayMoneyVo.getSm_name(), servicePayMoneyVo.getSo_totalMoney().toString());
                // 生成短信记录
                smsService.addSMSRecordForCus(servicePayMoneyVo.getHi_code(), servicePayMoneyVo.getCon_code(), msg, servicePayMoneyVo.getCc_code());

            } else if (payObject == 6) {
                // 生成订单、账单信息
//                contractOrderVo = genrateNewCustOrder(money, serviceOrderVo, order_code);
                orderVo.setOrder_sn(order_sn);
                orderVo.setTrade_object(payObject);
                orderVo.setTrade_user_id(money.getUser_id());
                orderVo.setDetail_amount_total(0.0);
                orderVo.setDetail_amount_coupon(0.0);
                orderVo.setRecharge_amount_give(0.0);
                orderVo.setOrder_balance_deduction(0.0);
                orderVo.setOrder_amount_total(0.0);
                orderVo.setOrder_amount_pay(0.0);
                orderDao.addOrder(orderVo);

                // 查询服务费用
                ServicePayMoneyVo servicePayMoneyVo = new ServicePayMoneyVo();
                servicePayMoneyVo.setOrder_sn(order_sn);
                servicePayMoneyVo = serviceDao.queryServicePayMoneyInfo(servicePayMoneyVo);

                // 生成商品金额订单详情
                this.addOrderDetailForService(order_sn, AppConfig.detail_type_1, serviceOrderVo.getSo_code(), money.getSsm_source(), money.getSsm_money(), AppConfig.order_type_1);
                // 发送短信
                String msg = SmsUtil.sendCusServicePayInfo(servicePayMoneyVo.getCc_name(), servicePayMoneyVo.getCcp_phone(), servicePayMoneyVo.getHouse_address(), servicePayMoneyVo.getSm_name(), servicePayMoneyVo.getSo_totalMoney().toString());
                // 生成短信记录
                smsService.addSMSRecordForUser(msg, servicePayMoneyVo.getUser_id());

            } else if (payObject == 2) {
                orderVo.setOrder_sn(order_sn);
                orderVo.setTrade_object(payObject);
                orderVo.setTrade_em_id(money.getEm_id());
                orderVo.setDetail_amount_total(0.0);
                orderVo.setDetail_amount_coupon(0.0);
                orderVo.setRecharge_amount_give(0.0);
                orderVo.setOrder_balance_deduction(0.0);
                orderVo.setOrder_amount_total(0.0);
                orderVo.setOrder_amount_pay(0.0);
                orderDao.addOrder(orderVo);

                // 生成订单
//                contractOrderVo = genrateNewOrder(money, order_code, serviceOrderVo, money.getSsm_money(), 2, companyList.get(0).getUcc_id(), false, "");
                // 生成账单
//                genrateBill(contractOrderVo, money.getSsm_money(), 2, true, null);

                // 查询服务费用
                ServicePayMoneyVo servicePayMoneyVo = new ServicePayMoneyVo();
                servicePayMoneyVo.setOrder_sn(order_sn);
                servicePayMoneyVo = serviceDao.queryServicePayMoneyInfo(servicePayMoneyVo);

                // 生成商品金额订单详情
                this.addOrderDetailForService(order_sn, AppConfig.detail_type_1, serviceOrderVo.getSo_code(), money.getSsm_source(), money.getSsm_money(), AppConfig.order_type_1);
                // 发送短信
                String msg = SmsUtil.sendEmpServicePayInfo("管家", servicePayMoneyVo.getHpr_newEmpName(), servicePayMoneyVo.getHpr_newEmpPhone(), servicePayMoneyVo.getHouse_address(), servicePayMoneyVo.getSm_name(), money.getSsm_money() + "", "管家");
                // 生成短信记录
                smsService.addSMSRecordForEmp(servicePayMoneyVo.getHi_code(), servicePayMoneyVo.getCon_code(), msg, servicePayMoneyVo.getHpr_newEmp());

            } else if (payObject == 3) {
                orderVo.setOrder_sn(order_sn);
                orderVo.setTrade_object(payObject);
                orderVo.setTrade_ucc_id(money.getUcc_id());
                orderVo.setDetail_amount_total(0.0);
                orderVo.setDetail_amount_coupon(0.0);
                orderVo.setRecharge_amount_give(0.0);
                orderVo.setOrder_balance_deduction(0.0);
                orderVo.setOrder_amount_total(0.0);
                orderVo.setOrder_amount_pay(0.0);
                orderDao.addOrder(orderVo);

                // 生成订单
//                contractOrderVo = genrateNewOrder(money, order_code, serviceOrderVo, money.getSsm_money(), 2, money.getUcc_id(), false, "");
                // 生成账单
//                genrateBill(contractOrderVo, money.getSsm_money(), 2, true, null);

                // 生成商品金额订单详情
                this.addOrderDetailForService(order_sn, AppConfig.detail_type_1, serviceOrderVo.getSo_code(), money.getSsm_source(), money.getSsm_money(), AppConfig.order_type_1);

                // 查询服务费用
                ServicePayMoneyVo servicePayMoneyVo = new ServicePayMoneyVo();
                servicePayMoneyVo.setOrder_sn(order_sn);
                servicePayMoneyVo = serviceDao.queryServicePayMoneyInfo(servicePayMoneyVo);
                // 发送短信
                String msg = SmsUtil.sendEmpServicePayInfo("店长", servicePayMoneyVo.getUcc_managerName(), servicePayMoneyVo.getUcc_managerPhone(), servicePayMoneyVo.getHouse_address(), servicePayMoneyVo.getSm_name(), money.getSsm_money() + "", "门店");
                // 生成短信记录
                smsService.addSMSRecordForUcc(servicePayMoneyVo.getHi_code(), servicePayMoneyVo.getCon_code(), msg, servicePayMoneyVo.getUcc_id());

            }

            money.setIs_order(1);// 已生成
            serviceDao.updateServiceMoney(money);
        }
        return orderVo;
    }

    /**
     * 生成客户/用户个人订单、账单
     *
     * @param money
     * @param order_code
     * @throws AppException
     */
    private ContractOrderVo genrateNewCustOrder(ServiceMoney money, ServiceOrderVo serviceOrderVo, String order_code) throws AppException {

        ContractOrderVo contractOrderVo;

        // 是公司客户，且本次申请的服务房子为客户合同房屋
        if (!StringUtils.isEmpty(serviceOrderVo.getHi_code())) {

            PositionRecordVo positionRecordVo = new PositionRecordVo();
            positionRecordVo.setHi_code(serviceOrderVo.getHi_code());
            positionRecordVo = houseLibraryService.queryContractPositionRecord(positionRecordVo);

            boolean isUccId = false;// 有hi_code且付费对象为客户，则需生成门店支出订单

            ViewBusinessContractVo contractObjectVo = new ViewBusinessContractVo();
            contractObjectVo.setHi_code(serviceOrderVo.getHi_code());
            contractObjectVo.setCc_code(money.getCc_code());
            if (money.getPayObject().intValue() == 4) {
                contractObjectVo.setContractObject_Type("租赁合同");
            } else if (money.getPayObject().intValue() == 5) {
                contractObjectVo.setContractObject_Type("托管合同");
            }
            ContractObjectVo objectVo = serviceDao.queryContractInfo(contractObjectVo);

            // 生成订单为应支付，状态为待还款的订单
            contractOrderVo = genrateNewOrder(money, order_code, serviceOrderVo, money.getSsm_money(), AppConfig.order_option_state_2, positionRecordVo.getUcc_id(), isUccId, objectVo.getContractObject_Code());

            // 生成账单为金额为应支付，状态为待还款账单
            genrateBill(contractOrderVo, money.getSsm_money(), AppConfig.bcb_state_2, StringUtils.isEmpty(serviceOrderVo.getHi_code()), positionRecordVo.getUcc_id());

        } else {// 非公司客户-外部用户
            // 生成公司收入订单、账单
            contractOrderVo = genrateNewOrder(money, order_code, serviceOrderVo, money.getSsm_money(), 2, null, true, null);
            genrateBill(contractOrderVo, money.getSsm_money(), 2, true, null);
        }
        return contractOrderVo;
    }

    /**
     * 生成订单
     *
     * @param money
     * @param order_code
     * @param payMoney
     * @param optionState
     * @param isUccId     判断收支对象是否为公司
     * @return
     * @throws AppException
     */
    private ContractOrderVo genrateNewOrder(ServiceMoney money, String order_code, ServiceOrderVo serviceOrderVo, double payMoney, Integer optionState, Integer bco_uccId, boolean isUccId, String contractObject_Code) throws AppException {

        // 【添加服务订单数据】
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setBco_payObject(money.getPayObject());
        contractOrderVo.setBco_code(order_code);
        contractOrderVo.setBco_orderType(AppConfig.order_type_2); // 定金订单类型
        contractOrderVo.setBco_type(203);
        contractOrderVo.setBco_title(serviceOrderVo.getSm_name());
        contractOrderVo.setBco_description(serviceOrderVo.getSm_name() + "-" + serviceOrderVo.getSt_name_b());
        contractOrderVo.setBco_userId(money.getUser_id());
        contractOrderVo.setBco_customer(money.getCc_code());
        contractOrderVo.setUcc_id(money.getUcc_id());
        contractOrderVo.setEm_id(money.getEm_id());
        contractOrderVo.setBco_currentPayment(new BigDecimal(payMoney));
        contractOrderVo.setBco_currentDate(new Date());
        contractOrderVo.setBco_state(AppConfig.ORDER_STATE_1);
        contractOrderVo.setBco_optionState(optionState);
        contractOrderVo.setBco_butler(0);
        contractOrderVo.setBco_createTime(new Date());
        if (isUccId) {
            contractOrderVo.setBco_uccId(1);// 外部用户的服务、管家或门店的付费为公司收入
            contractOrderVo.setBco_currentBalPay(0);// 公司收入
        } else {
            contractOrderVo.setHi_code(serviceOrderVo.getHi_code());
            contractOrderVo.setBco_uccId(bco_uccId);
            contractOrderVo.setBco_currentBalPay(0);// 门店支出
        }
        if (!StringUtils.isEmpty(contractObject_Code)) {
            contractOrderVo.setContractObject_code(contractObject_Code);
        }
        boolean boo = financeManageService.addContractOrder(contractOrderVo);

        // 生成服务订单、订单关系
        MaintenanceDeclaration declarationVo = new MaintenanceDeclaration();
        declarationVo.setSo_id(serviceOrderVo.getSo_id());
        declarationVo.setOrder_code(order_code);
        handleService.saveOrderMD(declarationVo);

        if (!boo) {
            throw new AppException("生成订单失败，请重试或联系管理员");
        }
        return contractOrderVo;
    }

    /**
     * 生成账单
     *
     * @param contractOrderVo
     * @param payMoney
     * @param bcb_state
     * @param hasHiCode
     * @return
     * @throws AppException
     */
    private ContractBillVo genrateNewBill(ContractOrderVo contractOrderVo, double payMoney, Integer bcb_state, boolean hasHiCode, Integer bcb_uccId) throws AppException {
        // 【添加定金账单数据】
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBcb_code(AppUtil.getOrderCode("212"));
        contractBillVo.setBco_code(contractOrderVo.getBco_code());
        contractBillVo.setBcb_type(AppConfig.CONTRACT_BILL_TYPE_3);
        contractBillVo.setBcb_repayment(new BigDecimal(payMoney));
        contractBillVo.setBcb_repaymentDate(new Date());
        contractBillVo.setBcb_state(AppConfig.order_option_state_2);
        contractBillVo.setBcb_state(bcb_state);
        /*contractBillVo.setBcb_budgetState(0);
        contractBillVo.setBcb_payWay(payWay);
        contractBillVo.setBcb_creator(0);
        contractBillVo.setBcb_operater(0);
        contractBillVo.setBcb_remarks(bcb_remarks);*/
        contractBillVo.setBcb_createTime(new Date());
        if (hasHiCode) {
            contractBillVo.setBcb_balPay(0);
            contractBillVo.setBcb_uccId(1);// 公司
        } else {
            contractBillVo.setBcb_balPay(0);
            contractBillVo.setBcb_uccId(bcb_uccId);// 门店支出
        }
        boolean boo = financeManageService.addContractBill(contractBillVo);
        if (!boo) {
            throw new AppException("生成账单失败，请重试或联系管理员");
        }
        return contractBillVo;
    }

    /**
     * 添加订单详情数据
     *
     * @param order_sn     订单号
     * @param detail_type  订单详情类型
     * @param so_code      服务code
     * @param product_name 名称
     * @param price        价格
     */
    public void addOrderDetailForService(String order_sn, Integer detail_type, String so_code, String product_name, Double price, Integer detail_balpay) {
        if (price > 0) {
            ServiceOrderVo serviceOrderVo = this.queryServiceInfo(so_code);
            if (serviceOrderVo == null) {
                return;
            }
            JSONObject product_detail = new JSONObject() {{
                put("service_type", serviceOrderVo.getSo_type());
                put("service_pay_object", serviceOrderVo.getSo_payObject());
                put("service_problem", serviceOrderVo.getSo_problem());
            }};
            OrderDetailVo orderDetailVo = new OrderDetailVo();
            orderDetailVo.setOrder_sn(order_sn);
            orderDetailVo.setDetail_type(detail_type);
            orderDetailVo.setDetail_balpay(detail_balpay);// 商品收支类型{1:"收",2:"支"}相当于正负号（1：正、2：负',)
            orderDetailVo.setProduct_sn(so_code);
            orderDetailVo.setDetail_status(1);
            orderDetailVo.setProduct_type(AppConfig.order_type_2);
            orderDetailVo.setProduct_name(product_name);
            orderDetailVo.setProduct_detail(product_detail.toJSONString());
            orderDetailVo.setProduct_price(price);
            orderDetailVo.setProduct_number(1);
            orderDetailVo.setDetail_subtotal(price);
            orderDetailVo.setDetail_remarks(null);
            orderDetailVo.setDetail_create_time(new Date());
            orderService.addOrderDetail(orderDetailVo);
        }
    }

    /**
     * 计算服务费
     *
     * @param
     */
    public Msg<Object> deductService(OrderVo orderVo, ServiceOrderVo serviceOrderVo) throws Exception {
        Msg<Object> msg = new Msg<>();
        /*
         *确定抵扣/折扣/减免后,实际支付费用
         */
        ServicePayMoneyVo servicePayMoneyVo = new ServicePayMoneyVo();
//        servicePayMoneyVo.setOrder_sn(orderVo.getOrder_sn());
        servicePayMoneyVo.setCc_code(orderVo.getTrade_cc_code());
        servicePayMoneyVo.setHi_code(serviceOrderVo.getHi_code());
        servicePayMoneyVo.setSo_id(serviceOrderVo.getSo_id());
        servicePayMoneyVo.setUser_id(orderVo.getTrade_user_id());
        servicePayMoneyVo = serviceDao.queryServicePayMoneyInfo(servicePayMoneyVo);
        msg.put("servicePayMoneyVo", servicePayMoneyVo);
        int st_moneyBool = servicePayMoneyVo.getSt_moneyBool();

        double deductMoney = 0.0;
        double discountMoney = 0.0;
        double annulMoney = 0.0;
        double reallyMoney = 0.0;

        // 初始服务费
        Double init_serveMoney = servicePayMoneyVo.getInit_serveMoney();
        // 剩余服务费
        Double surplus_serveMoney = servicePayMoneyVo.getSurplus_serveMoney();
        // 可用剩余服务费
        Double available_serveMoney = servicePayMoneyVo.getAvailable_serveMoney();
        // 本次应支付费用
        Double shallMoney = orderVo.getDetail_amount_total().doubleValue();
        msg.put("shallMoney", new BigDecimal(shallMoney).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
        // 总费用
        double totalMoney = servicePayMoneyVo.getSo_totalMoney().doubleValue();
        msg.put("totalMoney", new BigDecimal(totalMoney).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());

        if (0 == st_moneyBool) {// 不允许从服务费中扣除

            // 抵扣费用
            deductMoney = 0.0;
            msg.put("deductMoney", new BigDecimal(0.00));
            // 折扣费用
            discountMoney = 0.0;
            msg.put("discountMoney", new BigDecimal(0.00));
            // 减免费用
            annulMoney = totalMoney - shallMoney;
            msg.put("annulMoney", new BigDecimal((double) annulMoney).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
            // 实际支付费用
            reallyMoney = shallMoney;
            msg.put("reallyMoney", new BigDecimal((double) reallyMoney).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());

            if (totalMoney != (0.00 + 0.00 + annulMoney + reallyMoney)) {
                return null;
            }

        } else if (1 == st_moneyBool) {// 允许从服务费中扣除

            // 还有可用剩余服务费
            if (null != available_serveMoney && available_serveMoney.doubleValue() > 0) {
                if (available_serveMoney >= shallMoney) {
                    // 抵扣费用
                    deductMoney = shallMoney;
                    msg.put("deductMoney", new BigDecimal(shallMoney).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                    // 折扣费用
                    discountMoney = 0.00;
                    msg.put("discountMoney", new BigDecimal(0.00).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                    // 减免费用
                    annulMoney = totalMoney - shallMoney;
                    msg.put("annulMoney", new BigDecimal(annulMoney).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                    // 实际支付费用
                    reallyMoney = 0.0;
                    msg.put("reallyMoney", new BigDecimal(0.00).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());

                    if (totalMoney != shallMoney + 0.00 + annulMoney + 0.00) {
                        return null;
                    }

                } else {
                    // 抵扣费用
                    deductMoney = available_serveMoney;
                    msg.put("deductMoney", new BigDecimal(available_serveMoney).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                    // 折扣费用
                    discountMoney = (shallMoney - available_serveMoney.doubleValue()) / 2;
                    msg.put("discountMoney", new BigDecimal(discountMoney).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                    // 减免费用
                    annulMoney = totalMoney - shallMoney;
                    msg.put("annulMoney", new BigDecimal(annulMoney).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                    // 实际支付费用
                    reallyMoney = (shallMoney - available_serveMoney.doubleValue()) / 2;
                    msg.put("reallyMoney", new BigDecimal(reallyMoney).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());

                    msg.put("uccOrder", true);
                    if (totalMoney != (available_serveMoney + discountMoney + annulMoney + reallyMoney)) {
                        return null;
                    }

                }
            } else {
                // 有初始服务费，但服务费已使用完
                if ((null != init_serveMoney && init_serveMoney.doubleValue() > 0) &&
                        (null != available_serveMoney && available_serveMoney.doubleValue() <= 0)) {
                    // 抵扣费用
                    deductMoney = 0.0;
                    msg.put("deductMoney", new BigDecimal(0.00).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                    // 折扣费用
                    discountMoney = shallMoney / 2;
                    msg.put("discountMoney", new BigDecimal(discountMoney).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                    // 减免费用
                    annulMoney = totalMoney - shallMoney;
                    msg.put("annulMoney", new BigDecimal(totalMoney - shallMoney).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                    // 实际支付费用
                    reallyMoney = shallMoney / 2;
                    msg.put("reallyMoney", new BigDecimal(reallyMoney).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());

                    msg.put("uccOrder", true);

                    // 添加房屋服务费公司支出记录
                    houseLibraryService.addGPOfLossService(serviceOrderVo.getHi_code(), servicePayMoneyVo.getContractObject_code(), reallyMoney);
                    if (totalMoney != (0.00 + discountMoney + annulMoney + reallyMoney)) {
                        return null;
                    }
                } else {
                    // 抵扣费用
                    deductMoney = 0.0;
                    msg.put("deductMoney", new BigDecimal(0.00).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                    // 折扣费用
                    discountMoney = 0.0;
                    msg.put("discountMoney", new BigDecimal(0.00).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                    // 减免费用
                    annulMoney = totalMoney - shallMoney;
                    msg.put("annulMoney", new BigDecimal(totalMoney - shallMoney).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                    // 实际支付费用
                    reallyMoney = shallMoney;
                    msg.put("reallyMoney", new BigDecimal(shallMoney).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());

                    if (totalMoney != (0.00 + 0.00 + annulMoney + reallyMoney)) {
                        return null;
                    }
                }
            }
        }

        genrateServiceRecord(servicePayMoneyVo, orderVo);

        return msg;
    }

    // 扣取剩余服务费，生成使用记录，生成门店流水
    public void genrateServiceRecord(ServicePayMoneyVo servicePayMoneyVo, OrderVo orderVo) throws Exception {
        if (servicePayMoneyVo.getSt_moneyBool().intValue() == 1) {

            // 初始服务费
            Double init_serveMoney = servicePayMoneyVo.getInit_serveMoney();
            // 剩余服务费
            Double surplus_serveMoney = servicePayMoneyVo.getSurplus_serveMoney();
            // 已使用服务费
            Double used_serveMoney = servicePayMoneyVo.getUsed_serveMoney();
            // 可用剩余服务费
            Double available_serveMoney = servicePayMoneyVo.getAvailable_serveMoney();
            // 本次应支付费用
            Double shallMoney = orderVo.getDetail_amount_total();
            // 总费用
            double totalMoney = servicePayMoneyVo.getSo_totalMoney().doubleValue();

            // 还有剩余服务费
            if (null != available_serveMoney && available_serveMoney.doubleValue() > 0) {
                if (available_serveMoney >= shallMoney) {
                    // 更新剩余服务费用
                    if ((available_serveMoney - shallMoney) > 0) {
                        ServiceCharge serviceCharge = new ServiceCharge();
                        serviceCharge.setS_id(servicePayMoneyVo.getS_id());
//                    serviceCharge.setUsed_serveMoney(shallMoney + used_serveMoney);
                        serviceCharge.setAvailable_serveMoney(available_serveMoney - shallMoney);
                        this.modifyServiceMoney(serviceCharge);
                    }
                    // 添加服务费扣除记录
                    ServiceChargeRecord serviceChargeRecord = new ServiceChargeRecord();
                    serviceChargeRecord.setSo_id(servicePayMoneyVo.getSo_id());
                    serviceChargeRecord.setService_charge(shallMoney);
                    serviceChargeRecord.setDiscount(totalMoney - shallMoney + 0.00);// 减免加折扣
                    serviceChargeRecord.setCon_code(servicePayMoneyVo.getCon_code());
                    serviceChargeRecord.setCc_code(servicePayMoneyVo.getCc_code());
                    serviceChargeRecord.setHi_code(servicePayMoneyVo.getHi_code());
                    this.appAddServiceChargeRecord(serviceChargeRecord);

                    // 生成门店支付流水
//                    FinancePayFlowStatementVo statementVo = this.genrateStatement(servicePayMoneyVo, shallMoney, 0.00, 2, contractOrderVo.getBco_code());

                } else {
                    // 更新剩余服务费用
                    ServiceCharge serviceCharge = new ServiceCharge();
                    serviceCharge.setS_id(servicePayMoneyVo.getS_id());
//                    serviceCharge.setUsed_serveMoney(init_serveMoney);
                    serviceCharge.setAvailable_serveMoney(0.0);
                    this.modifyServiceMoney(serviceCharge);

                    // 添加服务费扣除记录
                    ServiceChargeRecord serviceChargeRecord = new ServiceChargeRecord();
                    serviceChargeRecord.setSo_id(servicePayMoneyVo.getSo_id());
                    serviceChargeRecord.setService_charge(shallMoney);
                    serviceChargeRecord.setDiscount(surplus_serveMoney + (surplus_serveMoney - shallMoney) / 2);// 减免加折扣
                    serviceChargeRecord.setCon_code(servicePayMoneyVo.getCon_code());
                    serviceChargeRecord.setCc_code(servicePayMoneyVo.getCc_code());
                    serviceChargeRecord.setHi_code(servicePayMoneyVo.getHi_code());
                    this.appAddServiceChargeRecord(serviceChargeRecord);

                    // 生成门店支付流水
//                    FinancePayFlowStatementVo statementVo = this.genrateStatement(servicePayMoneyVo, (surplus_serveMoney + (surplus_serveMoney - shallMoney) / 2), 0.00, 2, contractOrderVo.getBco_code());

                }
            }
        }
    }

    public ServiceOrderVo queryServiceOrderDetail(Integer so_id) {
        return serviceDao.queryServiceOrderDetail(so_id);
    }

    public List<UserCenterEmployee> queryServiceUccPeople(UserCenterEmployee userCenterEmployee) {
        return serviceDao.queryServiceUccPeople(userCenterEmployee);
    }

    public List<ServiceOrderVo> queryServiceOrderByEmId(Integer em_id) {
        return serviceDao.queryServiceOrderByEmId(em_id);
    }

    public int addServiceProcess(ServiceProcessVo serviceProcessVo) {
        return serviceDao.addServiceProcess(serviceProcessVo);
    }

    public List<ServiceMoneyDetail> queryMoneyDetial(ServiceMoneyDetail serviceMoneyDetail) {
        return serviceDao.queryMoneyDetial(serviceMoneyDetail);
    }

    public int deleteMoneyDetial(ServiceMoneyDetail serviceMoneyDetail) {
        return serviceDao.deleteMoneyDetial(serviceMoneyDetail);
    }

    public int deleteMoneyDetial(Integer ssd_id) {
        ServiceMoneyDetail serviceMoneyDetail = new ServiceMoneyDetail();
        serviceMoneyDetail.setSsd_id(ssd_id);
        return serviceDao.deleteMoneyDetial(serviceMoneyDetail);
    }

    public ServicePayMoneyVo queryNewServicePayMoney(ServicePayMoneyVo servicePayMoneyVo) {
        return serviceDao.queryNewServicePayMoney(servicePayMoneyVo);
    }

    public int modifyServiceMoney(ServiceCharge serviceCharge) {
        return serviceDao.modifyServiceMoney(serviceCharge);
    }

    public int appAddServiceChargeRecord(ServiceChargeRecord serviceChargeRecord) {
        return serviceDao.appAddServiceChargeRecord(serviceChargeRecord);
    }

    /**
     * 根据客户编码查询合同及剩余服务费信息
     *
     * @return
     */
    public List<ContractObjectVo> queryContractCustomerByCode(ContractObjectVo contractObjectVo) {
        return serviceDao.queryContractCustomerByCode(contractObjectVo);
    }

    public List<ContractObjectVo> queryAllContractHouse(Pagination<ContractObjectVo> voPagination) {
        return serviceDao.queryAllContractHouse(voPagination);
    }

    public int queryAllContractHouseCount(Pagination<ContractObjectVo> voPagination) {
        return serviceDao.queryAllContractHouseCount(voPagination);
    }

    public List<UserCustomer> queryCustomerByHiCode(ContractObjectVo contractObjectVo) {
        return serviceDao.queryCustomerByHiCode(contractObjectVo);
    }

    public List<ServiceMoneyDetail> queryMoneyDetailListById(ServiceMoneyDetail serviceMoneyDetail) {
        return serviceDao.queryMoneyDetailListById(serviceMoneyDetail);
    }

    /**
     * 更新派单记录
     *
     * @param serviceProcessVo
     * @return
     */
    public boolean updateServiceProcess(ServiceProcessVo serviceProcessVo) {
        return serviceDao.updateServiceProcess(serviceProcessVo) > 0;
    }

    public List<ContractObjectVo> queryPayObjectByHiCode(ContractObjectVo contractObjectVo) {
        return serviceDao.queryPayObjectByHiCode(contractObjectVo);
    }

    public ServicePayMoneyVo queryServicePayMoneyInfo(ServicePayMoneyVo servicePayMoneyVo) {
        return serviceDao.queryServicePayMoneyInfo(servicePayMoneyVo);
    }

    public UserCenterEmployee queryEmployeeById(Integer em_id) {
        return serviceDao.queryEmployeeById(em_id);
    }

    public ServiceCharge queryServiceChargeByCode(ServiceCharge serviceCharge) {
        return serviceDao.queryServiceChargeByCode(serviceCharge);
    }

    public int queryServiceItemCountByCode(ServiceOrderVo serviceOrderVo) {
        return serviceDao.queryServiceItemCountByCode(serviceOrderVo);
    }

    public List<ViewBusinessContractVo> selectContractObjectPeople(ViewBusinessContractVo contractVo) {
        return serviceDao.selectContractObjectPeople(contractVo);
    }

    public ContractObjectVo queryContractInfo(ViewBusinessContractVo contractObjectVo) {
        return serviceDao.queryContractInfo(contractObjectVo);
    }

    public List<ServicePersonVo> queryServiceOrderBySpId(Integer sp_id) {
        return serviceDao.queryServiceOrderBySpId(sp_id);
    }

    public int updateProcessToClosed(ServiceProcessVo serviceProcessVo) {
        return serviceDao.updateProcessToClosed(serviceProcessVo);
    }

    public int updataServiceProcess(ServiceProcessVo serviceProcessVo) {
        return serviceDao.updataServiceProcess(serviceProcessVo);
    }

    public boolean updateServiceMoney(ServiceMoney serviceMoney) {
        return serviceDao.updateServiceMoney(serviceMoney) > 0;
    }

    /**
     * 根据em_id查询服务人员
     *
     * @param em_id
     * @return
     */
    public ServicePersonVo queryServicePersonVo(Integer em_id) {
        ServicePersonVo servicePersonVo = new ServicePersonVo();
        servicePersonVo.setEm_id(em_id);
        return serviceDao.queryServicePersonVo(servicePersonVo);
    }

    public int deleteServiceMoney(Integer ssm_id) {
        // 查询对应的订单
        OrderVo orderVo = queryOrderByssmId(ssm_id);
        if (null != orderVo) {
            // 取消订单
            OrderVo vo = new OrderVo();
            vo.setOrder_sn(orderVo.getOrder_sn());
            vo.setOrder_status(AppConfig.order_status_4);
            serviceDao.updateOrder(vo);
        }
        return serviceDao.deleteServiceMoney(ssm_id);
    }

    public OrderVo queryOrderByssmId(Integer ssm_id) {
        return serviceDao.queryOrderByssmId(ssm_id);
    }

    public List<ContractInfoVo> queryContractCharge(String dateYear) {
        return serviceDao.queryContractCharge(dateYear);
    }

    /**
     * 根据so_id与当订单前付费对象查询支付订单
     *
     * @param orderVo
     * @return
     */
    public List<OrderVo> queryPayOrderAndServiceOrder(OrderVo orderVo) {
        return serviceDao.queryPayOrderAndServiceOrder(orderVo);
    }

    public List<MaintenanceDeclaration> initServiceOrder() {
        return serviceDao.initServiceOrder();
    }

    public ContractObjectVo queryContractType(ContractObjectVo contractObjectVo) {
        return serviceDao.queryContractType(contractObjectVo);
    }

    public int addServiceOrder(ServiceOrderVo serviceOrderVo) {
        return serviceDao.addServiceOrderInfo(serviceOrderVo);
    }

    public int addServiceOrderInfoApp(ServiceOrderInfoVo serviceOrderInfoVo) {
        return serviceDao.addServiceOrderInfoApp(serviceOrderInfoVo);
    }

    public int addServiceOrderItemInfo(ServiceOrderItemVo serviceOrderItemVo) {
        return serviceDao.addServiceOrderItemInfo(serviceOrderItemVo);
    }

    public int addServiceImage(ServiceImageVo serviceImageVo) {
        return serviceDao.addServiceImage(serviceImageVo);
    }

    public List<BillContractOrderMD> queryContractOrderMDList(BillContractOrderMD billContractOrderMD) {
        return serviceDao.queryContractOrderMDList(billContractOrderMD);
    }

    public List<ServiceRecordVo> queryOutside() {
        return serviceDao.queryOutside();
    }
}
