package com.gjp.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.gjp.model.*;
import com.gjp.service.*;
import com.gjp.util.*;
import com.gjp.util.pay.AliPay;
import com.gjp.util.pay.WeixinPay;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 财务订单账单管理
 *
 * @author 庆涛
 */
@Controller
@RequestMapping("/financeManage")
public class FinanceManageController {

    private @Resource
    ContractService contractObjectService;
    private @Resource
    FinanceManageService financeManageService;
    private @Resource
    CustomerService customerService;
    private @Resource
    BillContractOrderService contractOrderService;
    private @Resource
    BillPartnerBillService billPartnerBillService;
    private @Resource
    HouseLibraryService houseManageService;
    private @Resource
    UserCenterEmployeeService employeeService;
    private @Resource
    RecordService recordService;
    private @Resource
    HouseLibraryService houseLibraryService;
    private @Resource
    OrderService orderService;

    /* ==================公共=START================= */

    /**
     * 查询账单类型列表
     *
     * @param code  类型CODE
     * @param pCode 父级类型CODE
     * @return
     * @作者 JiangQT
     * @日期 2016年12月6日
     */
    @RequestMapping("/queryBillTypeList")
    @ResponseBody
    public Map<String, Object> queryBillTypeList(Integer code, Integer pCode, String param) {
        Msg<Object> msg = new Msg<>();
        BillTypeVo billTypeVo = new BillTypeVo();
        if (StringUtils.isEmpty(code) && StringUtils.isEmpty(pCode)) {
            return msg.toMap(110, Msg.MSG_PARAM_ERROR);
        }
        if (!StringUtils.isEmpty(code)) {
            billTypeVo.setBt_code(code);
        }
        if (!StringUtils.isEmpty(pCode)) {
            billTypeVo.setBt_parentCode(pCode);
        }
        List<BillTypeVo> billTypeList = financeManageService.queryBillTypeList(billTypeVo);

        // 账单筛选
        if (!StringUtils.isEmpty(param)) {
            JSONObject json = JSON.parseObject(param);

            ContractBillVo contractBillVo = new ContractBillVo();
            contractBillVo.setBco_code(json.getString("bill_code"));
            contractBillVo.setBcb_cycle(json.getInteger("bill_cycle"));
            List<ContractBillVo> contractBillList = financeManageService.queryFinanceBillList(contractBillVo);
            for (BillTypeVo billTypeVo2 : billTypeList) {
                billTypeVo2.setChecked(false);
                for (ContractBillVo contractBillVo2 : contractBillList) {
                    if (Objects.equals(billTypeVo2.getBt_code(), contractBillVo2.getBcb_type())) {
                        billTypeVo2.setChecked(true);
                    }
                }
            }
        }
        return msg.toMap(billTypeList);
    }

    /**
     * 查询房源列表数据
     *
     * @param pageNo
     * @param pageSize
     * @param house_address
     * @return
     * @作者 JiangQT
     * @日期 2016年12月27日
     */
    @RequestMapping("/queryHouseList")
    @ResponseBody
    public Map<String, Object> queryHouseList(Integer pageNo, Integer pageSize, String house_address) {
        Msg<Object> msg = new Msg<>();
        HouseInfoKeep t = new HouseInfoKeep();
        t.setHouse_address(house_address);
        Pagination<HouseInfoKeep> pagination = new Pagination<>(pageNo, pageSize, t);
        pagination = houseManageService.queryHouseLibraryInfoPageList(pagination);
        return msg.toMap(pagination);
    }

    /**
     * 查询支付方式数据
     *
     * @param bt_parentCode
     * @作者 JiangQT
     * @日期 2017年1月17日
     */
    @RequestMapping("/queryTypeList")
    @ResponseBody
    public String queryTypeList(Integer bt_parentCode) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(bt_parentCode)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        BusinesTypeVo businesTypeVo = new BusinesTypeVo();
        businesTypeVo.setBt_parentCode(bt_parentCode);
        List<BusinesTypeVo> contractTypes = contractObjectService.queryTypeList(businesTypeVo);
        return msg.toString(contractTypes);
    }

    /* ==================关联订单=START================= **/

    /**
     * 【关联订单】跳转关联账单
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年12月20日
     */
    @RequestMapping("/jumpRelatedBillManagePage")
    public ModelAndView jumpRelatedBillManagePage() {
        return new ModelAndView("/financeManage/relatedBillManage");
    }

    /**
     * 【关联订单】查询关联账单分页列表
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年12月20日
     */
    @RequestMapping("/queryRelatedBillPageList")
    @ResponseBody
    public Map<String, Object> queryRelatedBillPageList(Pagination<BillRelatedOrderVo> pagination) {
        Msg<Object> msg = new Msg<>();
        pagination.formatWhere();
        pagination = financeManageService.queryRelatedOrderPageList(pagination);
        return msg.toMap(pagination);
    }

    /**
     * 查询我的收款记录
     *
     * @return
     * @作者 陈智颖
     * @日期 2016年12月20日
     */
    @RequestMapping("/queryRelatedBillPageListApp")
    @ResponseBody
    public Map<String, Object> queryRelatedBillPageListApp(FinancePayFlowStatementVo financePayFlowStatementVo) {
        Map<String, Object> map = new HashMap<>();
        financePayFlowStatementVo.setBs_type(AppConfig.bs_type_4);
        financePayFlowStatementVo.setBs_balPay(AppConfig.balPay_1);
        List<FinancePayFlowStatementVo> payFlowStatementList = financeManageService.financeOrderListapp(financePayFlowStatementVo);
        if (payFlowStatementList.isEmpty()) {
            map.put("message", 401);
        } else {
            map.put("message", 200);
            map.put("data", payFlowStatementList);
        }
        return map;
    }

    /**
     * 【关联订单】添加关联账单
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年12月21日
     */
    @RequestMapping("/addRelatedOrderBill")
    @ResponseBody
    public String addRelatedOrderBill(@RequestBody Map<String, Object> data) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        if (data == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        return financeManageService.addRelatedBillService(data, employee);
    }

    /**
     * 【关联订单】更新关联账单
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年1月17日
     */
    @RequestMapping("/updateRelatedOrderBill")
    @ResponseBody
    public String updateRelatedOrderBill(String ro_code, String pay_mode, String pay_way, String pay_acount) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        if (StringUtils.isEmpty(ro_code) || StringUtils.isEmpty(pay_mode) || StringUtils.isEmpty(pay_way)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        return financeManageService.updateRelatedBillService(ro_code, pay_mode, pay_way, pay_acount, employee);
    }

    /**
     * 【关联订单】查询关联账单
     *
     * @param ro_code
     * @return
     * @作者 JiangQT
     * @日期 2016年12月21日
     */
    @RequestMapping("/queryRelatedBill")
    @ResponseBody
    public String queryRelatedBill(String ro_code, String pay_way) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(ro_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        BillRelatedBillVo relatedBillVo = new BillRelatedBillVo();
        relatedBillVo.setRo_code(ro_code);
        List<BillRelatedBillVo> relatedBillVos = financeManageService.queryRelatedBillList(relatedBillVo);
        msg.put("relatedBillVos", relatedBillVos);

        List<BusinesTypeVo> contractTypes = contractObjectService.queryTypeList(3);
        msg.put("contractTypes", contractTypes);
        if ("all".equals(pay_way)) {
            List<BusinesTypeVo> contractTypes32 = contractObjectService.queryTypeList(32);
            msg.put("contractTypes32", contractTypes32);
        }
        return msg.toString();
    }

    /**
     * 【关联订单】删除关联账单
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年12月21日
     */
    @RequestMapping("/deleteRelatedBill")
    @ResponseBody
    public String deleteRelatedBill(Integer rb_id) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(rb_id)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        boolean boo = financeManageService.deleteRelatedBill(rb_id);
        if (!boo) {
            return msg.toError("删除失败");
        }
        return msg.toString();
    }

    /**
     * 【关联订单】删除关联账单
     *
     * @param con_type
     * @param pageNo
     * @param pageSize
     * @return
     * @作者 JiangQT
     * @日期 2016年12月21日
     */
    @RequestMapping("/queryRelatedHouseContractList")
    @ResponseBody
    public Map<String, Object> queryRelatedHouseContractList(String query_where, String con_type, Integer pageNo, Integer pageSize) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(con_type)) {
            return msg.toMap(110, Msg.MSG_PARAM_ERROR);
        }
        Pagination<ContractOrderVo> pagination = new Pagination<>(pageNo, pageSize);
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setHouse_address(query_where);
        contractOrderVo.setBco_customerName(query_where);
        contractOrderVo.setBco_customerPhone(query_where);
        contractOrderVo.setContractObject_Type(con_type);
        pagination.setT(contractOrderVo);
        // pagination = financeManageService.queryContractOrderPageList(pagination);
        for (ContractOrderVo contractOrderVo1 : pagination.getList()) {
            ContractBillVo contractBillVo = new ContractBillVo();
            contractBillVo.setBco_code(contractOrderVo1.getBco_code());
            contractOrderVo1.setBillCycleList(financeManageService.queryFinanceBillList(contractBillVo));
        }
        return msg.toMap(pagination);
    }

    /**
     * 【关联订单】提交关联订单数据
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年1月10日
     */
    @RequestMapping("/submitRelatedOrder")
    @ResponseBody
    public String submitRelatedOrder(Integer ro_id, String bco_code, Integer bcb_cycle) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(ro_id) || StringUtils.isEmpty(bco_code) || StringUtils.isEmpty(bcb_cycle)) {
            return msg.toString(110, Msg.MSG_PARAM_ERROR);
        }
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        return financeManageService.addUpdateRelatedOrder(ro_id, bco_code, bcb_cycle, employee);
    }

    /* ==================定金订单管理=START================= **/

    /**
     * 【定金管理】跳转定金管理
     *
     * @return
     * @author JiangQt
     * @version 2017年6月19日下午2:03:54
     */
    @RequestMapping("/jumpDepositManage")
    public ModelAndView jumpDepositManage() {
        return new ModelAndView("financeManage/financeDepositManage");
    }

    /**
     * 【订单管理】查询定金分页数据
     *
     * @param pagination
     * @return
     * @author JiangQt
     * @version 2017年6月19日下午4:06:55
     */
    @RequestMapping("/queryDownPaymentPageList")
    public @ResponseBody
    Map<String, Object> queryDownPaymentPageList(Pagination<FinanceDownPaymentVo> pagination) {
        Msg<Object> msg = new Msg<>();
        pagination.formatWhere();
        pagination = financeManageService.queryDownPaymentPageList(pagination);
        return msg.toMap(pagination);
    }

    @RequestMapping("/queryDownPaymentInfo")
    public @ResponseBody
    String queryDownPaymentInfo(Integer fdp_id) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(fdp_id)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 定金信息
        FinanceDownPaymentVo financeDownPaymentVo = orderService.queryFinanceDownPayment(fdp_id);
        msg.put("financeDownPaymentInfo", financeDownPaymentVo);

        // 订单信息
        OrderVo orderVo = orderService.queryOrder(financeDownPaymentVo.getOrder_sn());
        msg.put("orderInfo", orderVo);

        // 流水信息
        if (orderVo.getPay_sn() != null) {
            OrderBillVo orderBillVo = orderService.queryOrderBill(orderVo.getPay_sn());
            msg.put("orderBillInfo", orderBillVo);
        }

        // 房源信息
        if (orderVo.getOrder_hi_code() != null) {
            ViewHouseLibraryInfoVo libraryInfo = houseLibraryService.queryHouseLibraryInfo(orderVo.getOrder_hi_code());
            msg.put("houseInfo", libraryInfo);
        }

        // 违约信息
        OrderReturnsVo orderReturnsVo = new OrderReturnsVo();
        orderReturnsVo.setOrder_id(orderVo.getOrder_id());
        orderReturnsVo = financeManageService.queryOrderReturns(orderReturnsVo);
        msg.put("orderReturnsInfo", orderReturnsVo);

        // 合同信息
        if (financeDownPaymentVo.getCon_code() != null) {
//            contractObjectService.queryContractInfo()
        }

        return msg.toString();
    }

    /**
     * 更新定金备注
     *
     * @param fdp_id
     * @param fdp_remarks
     * @return
     */
    @RequestMapping("/updateDownPaymentForRemark")
    public @ResponseBody
    String updateDownPaymentForRemark(Integer fdp_id, String fdp_remarks) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(fdp_id)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 定金信息
        FinanceDownPaymentVo financeDownPaymentVo = orderService.queryFinanceDownPayment(fdp_id);
        if (financeDownPaymentVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 更新订单
        FinanceDownPaymentVo financeDownPaymentVo1 = new FinanceDownPaymentVo();
        financeDownPaymentVo1.setFdp_id(fdp_id);
        financeDownPaymentVo1.setFdp_remarks(fdp_remarks);
        financeManageService.updateFinanceDownPayment(financeDownPaymentVo1);

        return msg.toString();
    }

    /**
     * 【订单管理】查询定金分页数据
     *
     * @param pagination
     * @return
     * @author JiangQt
     * @version 2017年6月19日下午4:06:55
     */
    @RequestMapping("/queryPayFlowStatementPageList")
    public @ResponseBody
    Map<String, Object> queryPayFlowStatementPageList(Pagination<BillPayFlowStatementBo> pagination, Integer bs_type) {
        Msg<Object> msg = new Msg<>();
        if (!StringUtils.isEmpty(bs_type)) {
            switch (bs_type) {
                case AppConfig.order_type_1:
                    break;
                case AppConfig.order_type_2:
                    break;
                case AppConfig.order_type_3:
                    break;
                case AppConfig.order_type_4:
                    pagination.addQueryWhere("bs_type", AppConfig.order_type_4, "filter");
                    break;
            }
        }
        pagination.formatWhere();
        pagination = financeManageService.queryPayFlowStatementPageList(pagination);
        return msg.toMap(pagination);
    }

    /**
     * 查询账单通过流水号
     *
     * @param bs_serialNumber
     * @return
     */
    @RequestMapping("/queryPayFlowStatementInfo")
    public @ResponseBody
    String queryPayFlowStatementInfo(String bs_serialNumber) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(bs_serialNumber)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 流水信息
        FinancePayFlowStatementVo financePayFlowStatementVo = new FinancePayFlowStatementVo();
        financePayFlowStatementVo.setBs_serialNumber(bs_serialNumber);
        financePayFlowStatementVo = financeManageService.queryPayFlowStatement(financePayFlowStatementVo);
        if (financePayFlowStatementVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        msg.put("financePayFlowStatement", financePayFlowStatementVo);

        // 合同信息
        ContractObjectVo contractObject = new ContractObjectVo();
        contractObject.setContractObject_Code(financePayFlowStatementVo.getContractObject_code());
        contractObject = contractObjectService.queryContractObject(contractObject);
        msg.put("contractObject", contractObject);

        // 合同信息
        ViewBusinessContractVo viewBusinessContractVo = new ViewBusinessContractVo();
        viewBusinessContractVo.setHi_code(financePayFlowStatementVo.getHi_code());
        viewBusinessContractVo.setContractObject_Type("租赁合同");
        List<ViewBusinessContractVo> businessContractVos = contractObjectService.selectContractViewList(viewBusinessContractVo);
        if (businessContractVos != null && businessContractVos.size() != 0) {
            msg.put("cancelObject", businessContractVos.get(businessContractVos.size() - 1));
        }

        // 合同主体
        UserCenterContractBody contractBody = contractObjectService.queryContractBody(financePayFlowStatementVo.getContractObject_code());
        msg.put("contractBody", contractBody);

        // 客户信息
        UserCustomer customer = new UserCustomer();
        customer.setContractObject_code(financePayFlowStatementVo.getContractObject_code());
        List<UserCustomer> customers = customerService.queryCustomerRelaContractList(customer);
        msg.put("customers", customers);

        // 房屋信息
        ViewHouseLibraryInfoVo libraryHouseInfo = houseLibraryService.queryHouseLibraryInfo(financePayFlowStatementVo.getHi_code());
        msg.put("houseInfo", libraryHouseInfo);

        // 租金账单
        FinanceStatementBillRelationVo financeStatementBillRelationVo = new FinanceStatementBillRelationVo();
        financeStatementBillRelationVo.setBs_serialNumber(bs_serialNumber);
        List<FinanceStatementBillRelationVo> statementBillRelationVoList = financeManageService.queryStatementBillRelationList(financeStatementBillRelationVo);
        ArrayList<ContractBillVo> financeBillList = new ArrayList<>();
        for (FinanceStatementBillRelationVo financeStatementBillRelationVo2 : statementBillRelationVoList) {
            ContractBillVo contractBillVo = new ContractBillVo();
            contractBillVo.setBcb_code(financeStatementBillRelationVo2.getBcb_code());
            contractBillVo = financeManageService.queryFinanceBill(contractBillVo);
            if (contractBillVo != null) {
                financeBillList.add(contractBillVo);
            }
        }
        msg.put("financeBillList", financeBillList);

        // 退款流水
        if (financePayFlowStatementVo.getBs_flowState() != null && financePayFlowStatementVo.getBs_flowState() == AppConfig.bs_flowState_3) {
            FinanceRefundFlowStatement financeRefundFlowStatement = new FinanceRefundFlowStatement();
            financeRefundFlowStatement.setRf_serialNumber(financePayFlowStatementVo.getBs_serialNumber());
            financeRefundFlowStatement = financeManageService.queryRefundFlowStatement(financeRefundFlowStatement);
            msg.put("financeRefundFlowStatement", financeRefundFlowStatement);
        }

        // 获取违约记录
        BillFinanceResult financeResult = new BillFinanceResult();
        financeResult.setFr_bsId(financePayFlowStatementVo.getBs_id());
        List<BillFinanceResult> financeResultList = financeManageService.selectFinanceResult(financeResult);
        msg.put("financeResultList", financeResultList);

        // 获取核销记录
        PayFlowStatementValidRecord flowStatementValidRecord = new PayFlowStatementValidRecord();
        flowStatementValidRecord.setBs_serialNumber(financePayFlowStatementVo.getBs_serialNumber());
        List<PayFlowStatementValidRecord> flowStatementValidRecordList = recordService.queryPayFlowStatementValidRecord(flowStatementValidRecord);
        msg.put("flowStatementValidRecordList", flowStatementValidRecordList);

        return msg.toString();
    }

    /**
     * 查询支付流水支付状态
     *
     * @param bs_orderNumber
     * @return
     */
    @RequestMapping("/queryPayFlowStatementPayState")
    public @ResponseBody
    String queryPayFlowStatementPayState(String bs_orderNumber) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(bs_orderNumber)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        // 获取流水详情
        FinancePayFlowStatementVo financePayFlowStatementVo = new FinancePayFlowStatementVo();
        financePayFlowStatementVo.setBs_orderNumber(bs_orderNumber);
        financePayFlowStatementVo = financeManageService.queryPayFlowStatement(financePayFlowStatementVo);
        if (financePayFlowStatementVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 调用接口
        if ("支付宝".equals(financePayFlowStatementVo.getBs_payType())) {
            try {
                msg = AliPay.alipayTradeQuery(bs_orderNumber);
                JSONObject map = msg.getJson();
                if (map != null && "已关闭".equals(map.get("trade_state"))) {
                    Msg<Object> msg1 = AliPay.alipayTradeRefundQuery(bs_orderNumber);
                    JSONObject map1 = msg1.getJson();
                    if (map1 != null) {
                        Object trade_refund_money = map1.get("trade_refund_money");
                        msg.put("trade_refund_money", StringUtils.isEmpty(trade_refund_money) ? map.get("trade_money") : trade_refund_money);
                    } else {
                        msg.put("trade_refund_money", map.get("trade_money"));
                    }
                }
            } catch (AppException e) {
                e.printStackTrace();
                return msg.toError(e);
            } catch (Exception e) {
                e.printStackTrace();
                return msg.toError(e);
            }
        }
        if ("微信".equals(financePayFlowStatementVo.getBs_payType())) {
            try {
                msg = WeixinPay.weixinTradeQuery(bs_orderNumber);
                JSONObject map = msg.getJson();
                if (map != null && "已退款".equals(map.get("trade_state"))) {
                    msg.put(WeixinPay.weixinTradeRefundquery(bs_orderNumber).getJson());
                }
                System.out.println(msg.toString());
            } catch (AppException e) {
                e.printStackTrace();
                if (e.getCode() == 111) {
                    try {
                        msg = WeixinPay.weixinTradeQuery(bs_orderNumber, null, "merchant");
                        JSONObject map = msg.getJson();
                        if (map != null && "已退款".equals(map.get("trade_state"))) {
                            msg.put(WeixinPay.weixinTradeRefundquery(bs_orderNumber, null, "public").getJson());
                        }
                        return msg.toString();
                    } catch (AppException e1) {
                        e1.printStackTrace();
                        return msg.toError(e1);
                    } catch (Exception e1) {
                        e1.printStackTrace();
                        return msg.toError(e1);
                    }
                }
                return msg.toError(e);
            } catch (Exception e) {
                e.printStackTrace();
                return msg.toError(e);
            }
        }
        return msg.toString();
    }

    /**
     * 更新流水
     *
     * @param bs_serialNumber
     * @param bs_remark
     * @return
     */
    @RequestMapping("/updatePayFlowStatementInfo")
    public @ResponseBody
    String updatePayFlowStatementInfo(String bs_serialNumber, String bs_remark) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(bs_serialNumber)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        FinancePayFlowStatementVo financePayFlowStatementVo = new FinancePayFlowStatementVo();
        financePayFlowStatementVo.setBs_serialNumber(bs_serialNumber);
        financePayFlowStatementVo.setBs_remark(bs_remark);
        boolean boo = financeManageService.updatePayFlowStatement(financePayFlowStatementVo);
        if (!boo) {
            return msg.toError("保存数据失败，请重试或联系管理员");
        }
        return msg.toString();
    }

    /**
     * 更新流水
     *
     * @param payFlowStatementValidRecordStr
     * @return
     */
    @RequestMapping("/updatePayFlowStatementForPayState")
    public @ResponseBody
    String updatePayFlowStatementForPayState(String payFlowStatementValidRecordStr) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        if (StringUtils.isEmpty(payFlowStatementValidRecordStr)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        try {
            PayFlowStatementValidRecord payFlowStatementValidRecord = JSONObject.parseObject(payFlowStatementValidRecordStr, PayFlowStatementValidRecord.class);
            financeManageService.updatePayFlowStatementForPayState(payFlowStatementValidRecord);
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
     * 支付流水页面
     *
     * @return
     * @author 陈智颖
     * @date Feb 8, 2017 5:58:04 PM
     */
    @RequestMapping("/payFlowStatementList")
    public String payFlowStatementList() {
        return "financeManage/financePayFlowStatementList";
    }

    /**
     * 查询定金审核最近的一条记录
     *
     * @author tanglei
     * @Date 2017年7月28日 上午10:49:55
     */
    @RequestMapping("/selectNewFinanceResult")
    public @ResponseBody
    Map<String, Object> selectNewFinanceResult(int bsId) {
        Map<String, Object> map = new HashMap<>();
        BillFinanceResult billFinanceResult = new BillFinanceResult();
        billFinanceResult.setFr_bsId(bsId);
        billFinanceResult = financeManageService.selectNewFinanceResult(billFinanceResult);
        map.put("billFinanceResult", billFinanceResult);
        return map;
    }

    /**
     * 跳转定金侧滑框
     *
     * @author tanglei
     * @Date 2017年7月22日下午15:11:55
     */
    @RequestMapping("/depositManageSlip")
    public String depositManageSlip() {
        return "/financeManage/depositManageSlip";
    }

    /**
     * 跳转定金财务审核
     *
     * @author tanglei
     * @Date 2017年7月27日  上午10:31:55
     */
    @RequestMapping("/financeManageExamine")
    public String financeManageExamine() {
        return "financeManage/financeManageExamine";
    }

    /**
     * 定金侧滑框数据
     *
     * @author tanglei
     * @Date 2017年7月22日 下午19:02:55
     */
    @RequestMapping("/selectDepositManage")
    public @ResponseBody
    String selectDepositManage(Integer cno) {
        Msg<Object> msg = new Msg<>();
        String uid = AppUtil.getCookie(AppConfig.COOKIE_USER_ID);    //获取当前用户id
        Map<String, Object> map = new HashMap<>();
        BillPayFlowStatementBo billPayFlowStatementBo = new BillPayFlowStatementBo();
        billPayFlowStatementBo.setBs_id(cno);
        billPayFlowStatementBo = financeManageService.selectDepositManage(billPayFlowStatementBo);   //获取定金数据
        if (billPayFlowStatementBo.getContractObject_code() == null) {
            billPayFlowStatementBo.setContractObject_code("1");
        }
        map.put("billPayFlowStatementBo", billPayFlowStatementBo);
        UserCenterEmployee userCenter = new UserCenterEmployee();
        userCenter.setHi_code(billPayFlowStatementBo.getHi_code());
        userCenter = employeeService.selectUserCenterManage(userCenter);    //获取管家信息
        map.put("userCenter", userCenter);  //获取房管员
        UserCenterEmployee user = new UserCenterEmployee();
        user.setEm_id(Integer.valueOf(uid));
        user = employeeService.selectUserCenterEmployeeInfo(user);  //获取当前登录信息
        map.put("user", user);
        BillFinanceResult financeResult = new BillFinanceResult();
        financeResult.setFr_bsId(billPayFlowStatementBo.getBs_id());
        List<BillFinanceResult> list = financeManageService.selectFinanceResult(financeResult);   //获取违约信息
        map.put("list", list);
        return msg.toString(map);
    }

    /**
     * 提交定金违约信息并更改各表状态
     *
     * @author tanglei
     * @Date 2017年7月23日 下午17:15:55
     */
    @RequestMapping("/submitFinanceResult")
    public @ResponseBody
    String submitFinanceResult(String result) {
        Msg<Object> msg = new Msg<>();
        try {
            UserCenterEmployee employee = AppUtil.getCookieEmployee();
            if (employee == null) {
                return msg.toError(Msg.MSG_LOGIN_ERROR);
            }

            BillFinanceResult financeResult = JSONObject.parseObject(result, BillFinanceResult.class);
            financeResult.setFr_em_id(employee.getEm_id());
            financeResult.setFr_time(new Date(System.currentTimeMillis()));
            financeManageService.updateFinanceResult(financeResult);
        } catch (AppException e) {
            e.printStackTrace();
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    @RequestMapping("/submitDownPaymentResult")
    public @ResponseBody
    String submitDownPaymentResult(@RequestBody JSONObject json) {
        Msg<Object> msg = new Msg<>();
        try {
            // 验证参数
            if (json == null) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }

            // 验证用户
            UserCenterEmployee employee = AppUtil.getCookieEmployee();
            if (employee == null) {
                return msg.toError(Msg.MSG_LOGIN_ERROR);
            }

            // 更新定金数据
            financeManageService._updateFinanceDownPayment(json, employee.getEm_id());
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
     * 财务通过
     *
     * @author tanglei
     * @Date 2017年7月24日 下午15:13:55
     */
    @RequestMapping("/financeAgree")
    public @ResponseBody
    String financeAgree(String result) {
        Msg<Object> msg = new Msg<>();
        String uid = AppUtil.getCookie(AppConfig.COOKIE_USER_ID);    //获取当前用户id
        BillFinanceResult financeResult = JSONObject.parseObject(result, BillFinanceResult.class);
        financeResult.setFr_em_id(Integer.valueOf(uid));
        financeResult.setFr_time(new Date(System.currentTimeMillis()));
        boolean boo = financeManageService.financeAgree(financeResult);
        if (!boo) {
            msg.setCode(110);
            msg.setMsg("提交失败");
            return msg.toString();
        }
        return msg.toString();
    }

    /* ==================TODO 金融订单管理=START================= **/

    /* ==================合同订单管理=START================= **/

    /**
     * 跳转订单管理页面
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年10月25日
     */
    @RequestMapping("/jumpBudgetManagePage")
    public ModelAndView jumpBudgetManagePage() {
        return new ModelAndView("/financeManage/budgetOrderList");
    }

    /**
     * 查询订单分页数据
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年10月25日
     */
    @RequestMapping("/queryOrderManageList")
    @ResponseBody
    public String queryOrderManageList(Pagination<ContractBillVo> pagination) {
        Msg<Object> msg = new Msg<>();
        pagination.formatWhere();
        pagination = financeManageService.queryContractBillPageList(pagination);
        return msg.toString(pagination);
    }

    /**
     * 查询订单账单数据
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年10月30日
     */
    @RequestMapping("/queryOrderBillList")
    @ResponseBody
    public String queryOrderBillList(String con_code, String order_code) {
        Msg<Object> msg = new Msg<>();
        HashMap<String, Object> map = new HashMap<>();
        if (StringUtils.isEmpty(con_code) || StringUtils.isEmpty(order_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 查询订单
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setBco_code(order_code);
        contractOrderVo = financeManageService.queryFinanceOrder(contractOrderVo);
        if (contractOrderVo == null) {
            return msg.toError("没有找到该合同订单，请重试或者联系管理员");
        }

        // 查询账单
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBco_code(order_code);
        contractBillVo.setBcb_repaymentDate(new Date());
        List<ContractBillVo> contractBillList = financeManageService.queryFinanceBillList(contractBillVo);

        // 获取账单周期时间段
        int arrLen = contractBillList.size() - 1;
        Date repaymentEndDate = null;
        for (int i = arrLen; i >= 0; i--) {
            ContractBillVo contractBillVo2 = contractBillList.get(i);
            if (contractBillVo2.getBcb_type() == 0) {
                if (i == arrLen) {
                    ContractObjectVo contractObject = contractObjectService.queryContractObject(con_code);
                    if (contractObject != null) {
                        contractBillVo2.setRepaymentEndDate(contractObject.getContractObject_DeadlineTime());
                        repaymentEndDate = contractBillVo2.getBcb_repaymentDate();
                    }
                } else {
                    contractBillVo2.setRepaymentEndDate(repaymentEndDate);
                    repaymentEndDate = AppUtil.calendayDate(contractBillVo2.getBcb_repaymentDate(), Calendar.DATE, -1).getTime();
                }
            } else {
                if (i == arrLen) {
                    ContractObjectVo contractObject = contractObjectService.queryContractObject(con_code);
                    if (contractObject != null) {
                        contractBillVo2.setRepaymentEndDate(contractObject.getContractObject_DeadlineTime());
                        repaymentEndDate = contractObject.getContractObject_DeadlineTime();
                    }
                } else {
                    contractBillVo2.setRepaymentEndDate(repaymentEndDate);
                }
            }
        }
        map.put("contractBillList", contractBillList);

        // 业务类型字段
        BillTypeVo billTypeVo = new BillTypeVo();
        billTypeVo.setBt_parentCode(2);
        List<BillTypeVo> businesTypes = financeManageService.queryBillTypeList(billTypeVo);
        map.put("businesTypeList", businesTypes);

        UserCustomer customerInfo = customerService.queryCustomerInfo(contractOrderVo.getBco_customer());

        // 客户银行卡信息
        UserCustomerBank customerBank = new UserCustomerBank();
        customerBank.setCc_id(customerInfo.getCc_id());
        List<UserCustomerBank> customerBankList = customerService.queryCustomerBankList(customerBank);
        map.put("customerBankList", customerBankList);
        return msg.toString(map);
    }

    /**
     * 查询所有订单账单
     *
     * @param bill_code
     * @return
     * @作者 JiangQT
     * @日期 2016年10月31日
     */
    @RequestMapping("/queryOrderBillAllList")
    @ResponseBody
    public String queryOrderBillAllList(String bill_code) {
        Msg<Object> msg = new Msg<>();
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBco_code(bill_code);
        List<ContractBillVo> contractBillList = financeManageService.queryContractBillListByTotal(contractBillVo);
        return msg.toString(contractBillList);
    }

    /**
     * 查询所有订单账单
     *
     * @param bill_code
     * @return
     * @作者 JiangQT
     * @日期 2016年10月31日
     */
    @RequestMapping("/queryOrderBillSubList")
    @ResponseBody
    public String queryOrderBillSubList(String bill_code, Integer bill_cycle) {
        Msg<Object> msg = new Msg<>();
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBco_code(bill_code);
        contractBillVo.setBcb_cycle(bill_cycle);
        List<ContractBillVo> contractBillList = financeManageService.queryFinanceBillList(contractBillVo);
        return msg.toString(contractBillList);
    }

    /**
     * 删除相应预算清单\账单
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年11月15日
     */
    @RequestMapping("/deleteBudgetBill")
    @ResponseBody
    public String deleteBudgetBill(Integer bcb_id) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(bcb_id)) {
            return msg.toString(110, Msg.MSG_PARAM_ERROR);
        }
        BudgetBillVo budgetBillVo = new BudgetBillVo();
        budgetBillVo.setBill_id(bcb_id);
        budgetBillVo = financeManageService.queryBudgetBill(budgetBillVo);
        if (budgetBillVo != null) {
            // 删除预算清单
            financeManageService.deleteBudgetBill(budgetBillVo.getBbb_id());
        }
        // 删除合同账单
        financeManageService.deleteFinanceBill(bcb_id);
        return msg.toString();
    }

    /**
     * 查询预算清单分页列表
     *
     * @param pageNo
     * @param pageSize
     * @param bbo_type
     * @return
     * @作者 JiangQT
     * @日期 2016年11月15日
     */
    @RequestMapping("/queryBudgetOrderList")
    @ResponseBody
    public Map<String, Object> queryBudgetOrderList(Integer pageNo, Integer pageSize, Integer bbo_type) {
        Msg<Object> msg = new Msg<>();
        BudgetOrderVo budgetOrderVo = new BudgetOrderVo();
        budgetOrderVo.setBbo_type(bbo_type);
        Pagination<BudgetOrderVo> pagination = financeManageService.queryBudgetOrderPageList(new Pagination<>(pageNo, pageSize, budgetOrderVo));
        return msg.toMap(pagination);
    }

    /**
     * 添加预算清单
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年10月30日
     */
    @RequestMapping("/addBudgetOrder")
    @ResponseBody
    public String addBudgetOrder(@RequestBody BudgetOrderVo budgetOrder) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toString(110, Msg.MSG_LOGIN_ERROR);
        }
        return financeManageService.addBudgetOrderService(budgetOrder, employee);
    }

    /**
     * 添加预算账单
     *
     * @param data
     * @return
     * @作者 JiangQT
     * @日期 2016年10月30日
     */
    @RequestMapping("/addBudgetBill")
    @ResponseBody
    public String addBudgetBill(@RequestBody Map<String, Object> data) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toString(110, Msg.MSG_LOGIN_ERROR);
        }
        return financeManageService.addBudgetBillService(data, employee);
    }

    /* ==================预算审核=START================= **/

    /**
     * 跳转预算清单页面
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年10月25日
     */
    @RequestMapping("/jumpBudgetOrderListPage")
    public ModelAndView jumpBudgetOrderListPage() {
        return new ModelAndView("/financeManage/budgetAuditingList");
    }

    /**
     * 查询预算清单分页数据
     *
     * @param pageNo
     * @param pageSize
     * @return
     * @作者 JiangQT
     * @日期 2016年10月25日
     */
    @RequestMapping("/queryBudgetManageList")
    @ResponseBody
    public String queryBudgetManageList(Integer pageNo, Integer pageSize, Integer type, Integer state, String query_where) {
        Msg<Object> msg = new Msg<>();
        BudgetOrderVo budgetOrderVo = new BudgetOrderVo();
        budgetOrderVo.setBbo_type(type);
        budgetOrderVo.setBbo_state(state);
        budgetOrderVo.setBbo_code(query_where);
        budgetOrderVo.setBbo_name(query_where);
        budgetOrderVo.setBbo_desc(query_where);
        Pagination<BudgetOrderVo> pagination = financeManageService.queryBudgetOrderPageList(new Pagination<>(pageNo, pageSize, budgetOrderVo));
        return msg.toString(pagination);
    }

    /**
     * 查询预算清单项目信息
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年11月2日
     */
    @RequestMapping("/queryBudgetItemList")
    @ResponseBody
    public String queryBudgetItemList(String bbo_code) {
        Msg<Object> msg = new Msg<>();
        HashMap<String, Object> map = new HashMap<>();
        if (StringUtils.isEmpty(bbo_code)) {
            return msg.toString(110, Msg.MSG_PARAM_ERROR);
        }

        BudgetBillVo budgetBillVo = new BudgetBillVo();
        budgetBillVo.setBbo_code(bbo_code);
        List<BudgetBillVo> budgetBillList = financeManageService.queryBudgetBillMoreList(budgetBillVo);
        map.put("budgetBillList", budgetBillList);

        List<ContractType> typeList = contractObjectService.selectContractTypeByParentId(18);
        map.put("typeList", typeList);
        return msg.toString(map);
    }

    /**
     * 查询类型
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年11月2日
     */
    @RequestMapping("/querytBusinessType")
    @ResponseBody
    public String querytBusinessType(Integer pid) {
        Msg<Object> msg = new Msg<>();
        List<ContractType> typeList = contractObjectService.selectContractTypeByParentId(pid);
        for (ContractType contractType : typeList) {
            String value = contractType.getContractType_Value();
            if (!StringUtils.isEmpty(value)) {
                String sb = value.substring(0, 4) +
                        "****" +
                        value.substring(value.length() - 4, value.length());
                contractType.setContractType_Value(sb);
            }
        }
        return msg.toString(typeList);
    }

    /**
     * 提交单个预算账单审核
     *
     * @param bbb_id 预算单ID
     * @return
     * @作者 JiangQT
     * @日期 2016年11月4日
     */
    @RequestMapping("/submitBudgetBillAuditingOne")
    @ResponseBody
    public String submitBudgetBillAuditingOne(Integer bbb_id, Integer bill_optionState) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toString(110, Msg.MSG_LOGIN_ERROR);
        }
        return financeManageService.updateBudgetBillAuditingService(bbb_id, bill_optionState);
    }

    /**
     * 提交全部预算账单审核
     *
     * @param bbo_state
     * @return
     * @throws Exception
     * @作者 JiangQT
     * @日期 2016年11月4日
     */
    @RequestMapping("/submitBudgetBillAuditingAll")
    @ResponseBody
    public String submitBudgetBillAuditingAll(Integer bbo_id, Integer bbo_state) throws Exception {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toString(110, Msg.MSG_LOGIN_ERROR);
        }
        return financeManageService.updateBudgetOrderService(bbo_id, bbo_state, employee);
    }

    /* ==================预算打款=START================= **/

    /**
     * 预算打款页面
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年10月27日
     */
    @RequestMapping("/jumpBudgetBillPaymentPage")
    public ModelAndView jumpBudgetBillPaymentPage() {
        return new ModelAndView("/financeManage/budgetPaymentList");
    }

    /**
     * 预算打款分页列表
     *
     * @param pageNo
     * @param pageSize
     * @return
     * @作者 JiangQT
     * @日期 2016年10月25日
     */
    @RequestMapping("/queryBudgetOrderPaymentList")
    @ResponseBody
    public String queryBudgetOrderPaymentList(Integer pageNo, Integer pageSize, Integer type, Integer state, String query_where) {
        Msg<Object> msg = new Msg<>();
        BudgetOrderVo budgetOrderVo = new BudgetOrderVo();
        budgetOrderVo.setBbo_type(type);
        budgetOrderVo.setBbo_state(state);
        budgetOrderVo.setBbo_code(query_where);
        budgetOrderVo.setBbo_name(query_where);
        budgetOrderVo.setBbo_desc(query_where);
        Pagination<BudgetOrderVo> pagination = financeManageService.queryBudgetOrderPageList(new Pagination<>(pageNo, pageSize, budgetOrderVo));
        return msg.toString(pagination);
    }

    /**
     * 提交预算打款账单数据
     *
     * @return
     * @throws ParseException
     * @作者 JiangQT
     * @日期 2016年10月25日
     */
    @RequestMapping("/submitBudgetBillPayment")
    @ResponseBody
    public String submitBudgetBillPayment(BudgetBillVo budgetBillVo) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toString(110, Msg.MSG_LOGIN_ERROR);
        }
        return financeManageService.updateBudgetBillService(budgetBillVo, employee);
    }

    /**
     * 提交预算打款账单数据
     *
     * @return
     * @throws ParseException
     * @作者 JiangQT
     * @日期 2016年10月25日
     */
    @RequestMapping("/revokeBudgetBillPayment")
    @ResponseBody
    public String revokeBudgetBillPayment(Integer bbb_id) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toString(110, Msg.MSG_LOGIN_ERROR);
        }
        return financeManageService.updateRevokeBudgetBillService(bbb_id, employee);
    }

    /**
     * 订单管理跳转
     *
     * @return
     * @author 王孝元
     */
    @RequestMapping("/jumpOrderManage")
    public String jumpOrderManage() {
        return "/financeManage/orderManage";
    }

    /**
     * 查询合同订单
     *
     * @param tableList1
     * @return
     * @throws ParseException
     * @author 王孝元
     */
    @RequestMapping("/selectOrderList")
    public @ResponseBody
    Map<String, Object> selectOrderList(TableList tableList1, ContractOrderVo order) throws ParseException {
        // 初始化获取对象
        TableList tableList = tableList1.initData(tableList1);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        PageModel<ContractOrderVo> pageModel1 = new PageModel<>();
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
        // 已退房(10：转租、11：退租、12：解约、13：清退、15：换房)
        if (order != null && order.getBco_optionState() != null && order.getBco_optionState() == -1) {
            pageModel1.setSqlWhere("and bco_optionState between 10 and 15");
            order.setBco_optionState(null);
        }
        pageModel1.setT(order);
        // 装载数据类
        DataList<ContractOrderVo> datalist = new DataList<>();
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        pageModel1.setPageNo((tableList.getPageNo() - 1) * pageSize);
        // 分页设置查询条数
        pageModel1.setPageSize(pageSize);
        // 查询分页实体
        PageModel<ContractOrderVo> pageModel = contractOrderService.queryContractOrderList(pageModel1);
        // 装载数据
        return datalist.dataList(pageModel.getList(), tableList.getPageNo(), pageSize, pageModel.getTotalRecords(), pageModel.getSumMoney());
    }

    /**
     * 添加账单
     *
     * @param id          编码
     * @param payCycleNum 期数
     * @param type        类型
     * @param money       金额
     * @param remarks     备注
     * @return
     * @throws ParseException
     * @author 陈智颖
     */
    @RequestMapping("/submitBill")
    @ResponseBody
    public Map<String, Object> submitBill(Integer id, String code, Integer payCycleNum, String type, Double money, String remarks, String date, String types) throws ParseException {
        return financeManageService.updateSubmitBill(id, code, payCycleNum, type, money, remarks, date, types);
    }

    /**
     * 插入打印日志
     *
     * @param contractPrintLogs
     * @return
     * @author 陈智颖
     * @date Feb 24, 2017 11:36:45 AM
     */
    @RequestMapping("/printLogs")
    public @ResponseBody
    Map<String, Object> printLogs(ContractPrintLogs contractPrintLogs) {
        Map<String, Object> map = new HashMap<>();
        contractPrintLogs.setCpl_text(AppUtil.getCookieEmployee().getEm_name() + "打印凭证:" + contractPrintLogs.getCpl_num() + "张");
        financeManageService.addContractPrintLogs(contractPrintLogs);
        map.put("message", "success");
        return map;
    }

    /**
     * 删除账单
     *
     * @param id 账单编码
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/removeBill")
    @ResponseBody
    public Map<String, Object> removeBill(Integer id) {
        return financeManageService.deleteBill(id);
    }

    /**
     * 查询租赁账单
     *
     * @param bco_id
     * @param contractObject_code
     * @return
     * @author 王孝元
     */
    @RequestMapping("/selectBillList")
    public @ResponseBody
    Map<String, Object> selectBillList(Integer bco_id, String contractObject_code) {
        HashMap<String, Object> map = new HashMap<>();
        ContractOrderVo bco = null;
        if (AppUtil.isNotNull(bco_id)) {
            bco = contractOrderService.queryContractOrderById(bco_id);
        }
        if (AppUtil.isNotNull(contractObject_code)) {
            bco = new ContractOrderVo();
            bco.setContractObject_code(contractObject_code);
            bco.setBco_orderType(AppConfig.order_type_1);
            bco = financeManageService.queryFinanceOrder(bco);
        }
        if (bco != null) {
            // 合同账单
            List<ContractBillVo> list = contractOrderService.queryContractBillList(bco.getBco_code(), null);
            // 金融账单
            List<BillPartnerBill> partnerBills = billPartnerBillService.queryPartnerBillList(bco.getBco_code());
            map.put("order", bco);
            map.put("list", list);
            map.put("partnerBills", partnerBills);
            map.put("msg", "success");
        } else {
            map.put("msg", "订单不存在！");
        }
        return map;
    }

    /**
     * 查询应收款
     *
     * @param bco_id
     * @param contractObject_code
     * @param cycle
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/selectBillListy")
    @ResponseBody
    public Map<String, Object> selectBillListy(Integer bco_id, String contractObject_code, Integer cycle) {
        Map<String, Object> map = new HashMap<>();
        ContractOrderVo bco = null;
        if (AppUtil.isNotNull(bco_id)) {
            bco = contractOrderService.queryContractOrderById(bco_id);
        }
        if (AppUtil.isNotNull(contractObject_code)) {
            bco = contractOrderService.queryContractOrderByContractCode(contractObject_code);
        }
        if (bco != null) {
            // 合同账单
            List<ContractBillVo> list = contractOrderService.queryContractBillList(bco.getBco_code(), cycle);
            map.put("order", bco);
            map.put("list", list != null && !list.isEmpty() ? list.get(0) : "");
            map.put("msg", "success");
        } else {
            map.put("msg", "订单不存在！");
        }
        return map;
    }

    /**
     * 提交付款、收款结果
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年11月29日
     */
    @RequestMapping("/submitBudgetPayment")
    @ResponseBody
    public String submitBudgetPayment(Integer bbo_id, Integer bbo_state) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toString(110, Msg.MSG_LOGIN_ERROR);
        }
        return financeManageService.updateBudgetOrderService(bbo_id, bbo_state, employee);
    }

    /**
     * 查询账单类型
     *
     * @return
     * @author 王孝元
     */
    @RequestMapping("/getBillTypeList")
    @ResponseBody
    public Map<String, Object> getBillTypeList() {
        Map<String, Object> map = new HashMap<>();
        List<BillTypeVo> list = contractOrderService.queryBillTypeList();
        map.put("list", list);
        return map;
    }

    /**
     * 临时代偿
     *
     * @param bco_code
     * @return
     * @author 王孝元
     */
    @RequestMapping("/addRepayBill")
    @ResponseBody
    public Map<String, Object> addRepayBill(Integer bcb_cycle, String bco_code) {
        Map<String, Object> map = new HashMap<>();
        // 获取人员信息
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        // 获取账单信息
        boolean result = billPartnerBillService.addParnerBillByOneCycle(bco_code, bcb_cycle, employee);
        if (result) {
            map.put("msg", "success");
        } else {
            map.put("msg", "账单状态错误");
        }
        return map;
    }

    /**
     * 清退代偿
     *
     * @param bco_code
     * @return
     * @author 王孝元
     */
    @RequestMapping("/quitWithPartner")
    @ResponseBody
    public Map<String, Object> quitWithPartner(String multiCycles, String bco_code, Integer quitType, String repaymentDate, String hand_fee) {
        Map<String, Object> map = new HashMap<>();
        // 获取人员信息
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        boolean result = false;
        // 清退
        if (AppUtil.null2Int(quitType) == 1) {
            result = billPartnerBillService.addPartnerBillByQuit(bco_code, multiCycles, repaymentDate, employee);
        }
        // 代偿
        if (AppUtil.null2Int(quitType) == 2) {
            result = billPartnerBillService.addPartnerBillByQuitRepay(bco_code, multiCycles, employee, AppUtil.null2Bool(hand_fee));
        }
        if (result) {
            map.put("msg", "success");
        } else {
            map.put("msg", "账单状态错误");
        }
        return map;
    }

    /**
     * TODO [APP][租金]二维码收款
     *
     * @param code          订单号
     * @param billtype      房东还是租客
     * @param yPay          应收款类型
     * @param wPay          未收款类型
     * @param yMoney        应收金额
     * @param sMoney        实收金额
     * @param date          支付时间
     * @param payName       收款人
     * @param payPhone      收款人电话
     * @param payType       支付类型
     * @param payAccount    可选 支付账号
     * @param cycle         期数
     * @param house_address 地址
     * @throws ParseException
     **/
    @RequestMapping("/onlinePay")
    @ResponseBody
    public Map<String, Object> onlinePay(String code, String billtype, String yPay, String wPay, Double yMoney, Double sMoney, String date, String payName, String payPhone, String payType, String payAccount, Integer cycle, String house_address) throws ParseException {
        String out_code = AppUtil.getOrderCode("220");
        Map<String, Object> map = contractOrderService.updatePay(billtype, code, yPay, wPay, yMoney, sMoney, date, payName, payPhone, payType, payAccount, cycle, "待还款", out_code);
        if (map != null && map.get("message").equals("success")) {
            try {
                String title = house_address + "第" + cycle + "期";
                String subtitle = house_address + "第" + cycle + "期";
                if (payType.equals("支付宝")) {
                    // 订单号存在执行付款
                    Msg<Object> alipayTradePrecreate = AliPay.alipayTradePrecreate(out_code, sMoney.toString(), title, subtitle, AliPay.notify_url);
                    if (alipayTradePrecreate.getCode() != 200) {
                        throw new AppException(alipayTradePrecreate.getMsg());
                    }
                    map.put("image", alipayTradePrecreate.getJson().get("qr_code"));
                } else {
                    String ip = AppUtil.getIP();
                    Msg<Object> weixinTradePrecreateScanCode = WeixinPay.weixinTradePrecreateScanCode(out_code, house_address + "第" + cycle + "期", null, sMoney.toString(), ip);
                    if (weixinTradePrecreateScanCode.getCode() != 200) {
                        throw new AppException(weixinTradePrecreateScanCode.getMsg());
                    }
                    map.put("image", weixinTradePrecreateScanCode.getJson().get("qr_code"));
                }
            } catch (AppException e) {
                e.printStackTrace();
            }
        }
        return map;
    }

    /**
     * 线下账单收款/付款
     *
     * @param billtype   房东还是租客
     * @param code       订单号
     * @param yPay       应收款类型
     * @param wPay       未收款类型
     * @param yMoney     应收金额
     * @param sMoney     实收金额
     * @param date       支付时间
     * @param payName    收款人
     * @param payPhone   收款人电话
     * @param payType    支付类型
     * @param payAccount 支付账号
     * @param cycle      期数
     * @return
     * @throws ParseException
     * @author 陈智颖
     */
    @RequestMapping("/payBill")
    @ResponseBody
    public Map<String, Object> payBill(String billtype, String code, String yPay, String wPay, Double yMoney, Double sMoney, String date, String payName, String payPhone, String payType, String payAccount, Integer cycle) throws ParseException {
//        Msg<Object> msg = new Msg<>();
//        Map<String, Object> json = new HashMap<>();
//        if (AppConfig.DEBUG_MODE) {
//            UserCenterEmployee employee = AppUtil.getCookieEmployee(request);
//            if (employee == null) {
//                return msg.toMap();
//            }
//            msg = financeManageService.updateContractBillBo("offline", employee, billtype, code, yPay, wPay, yMoney, sMoney, date, payName, payPhone, payType, payAccount, cycle, "已还款", null);
//            System.out.println(msg.toString());
//        } else {
//            json =
//        }
        return contractOrderService.updatePay(billtype, code, yPay, wPay, yMoney, sMoney, date, payName, payPhone, payType, payAccount, cycle, "已还款", null);
    }

    /**
     * 查询订单是否支付成功
     *
     * @return
     * @author chen
     * @date Feb 4, 2017 11:38:03 AM
     */
    @RequestMapping("/selectBillSuccess1")
    public @ResponseBody
    Map<Object, String> selectBillSuccess(ContractBillVo billVo) {
        Map<Object, String> map = new HashMap<>();

        List<ContractBillVo> selectPayBillSuccess = contractOrderService.selectPayBillSuccess(billVo);
        if (selectPayBillSuccess.isEmpty()) {
            map.put("message", "error");
        } else {
            boolean bool = false;
            for (ContractBillVo contractBillVo : selectPayBillSuccess) {
                if (contractBillVo.getBcb_state() == 2) {
                    bool = true;
                    break;
                }
            }
            if (bool) {
                map.put("message", "error");
            } else {
                map.put("message", "success");
            }
        }

        return map;
    }

    /**
     * 查询订单是否支付成功
     *
     * @return
     * @author chen
     * @date Feb 4, 2017 11:38:03 AM
     */
    @RequestMapping("/selectBillSuccessRQcode1")
    public @ResponseBody
    Map<Object, String> selectBillSuccessRQcode(BillRelatedOrderVo relatedOrderVo) {
        Map<Object, String> map = new HashMap<>();
        int bools = contractOrderService.selectPayBillSuccessRQcode(relatedOrderVo);
        if (bools > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 初始化第三方账单
     *
     * @return
     * @author 王孝元
     */
    @RequestMapping("/initPartnerOrderData")
    public @ResponseBody
    Map<Object, String> initPartnerOrderData() {
        Map<Object, String> map = new HashMap<>();
        contractOrderService.initPartnerOrderData();
        map.put("msg", "初始化成功！");
        return map;
    }

    /**
     * 初始化订单逾期天数和订单总金额
     *
     * @return
     * @author 王孝元
     */
    @RequestMapping("/initOrderTotalPaymentAndOverDay")
    public @ResponseBody
    Map<Object, String> initOrderTotalPaymentAndOverDay() {
        Map<Object, String> map = new HashMap<>();
        contractOrderService.initOrderOverDueDay();
        contractOrderService.initOrderTotalPayment();
        map.put("msg", "初始化成功！");
        return map;
    }

    /**
     * 【APP】支付租金二维码
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年4月14日
     */
    @RequestMapping("/payRentQRCode")
    public String jumpRentQRCode() {
        return "/appPage/finance/payRentQRCode";
    }

    /**
     * 【APP】选择定金
     *
     * @return
     * @作者 JiangQT
     * @日期 2017年4月14日
     */
    @RequestMapping("/payBillSearch")
    public String payBillSearch() {
        return "appPage/finance/depositSeach";
    }

    /**
     * 【APP】定金数据列表
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2017年4月14日
     */
    @RequestMapping("/queryFrontMoneyBillList")
    public @ResponseBody
    String queryFrontMoneyBillList(Pagination<FinanceFrontMoneyBillBo> pagination) {
        Msg<Object> msg = new Msg<>();
        pagination.addQueryWhere("bcb_state", AppConfig.order_option_state_3);
        pagination.formatWhere();
        pagination = financeManageService.queryFrontMoneyBillPageList(pagination);
        return msg.toString(pagination);
    }

    /* ========【合同订单管理】=START======= */

    /**
     * 合同订单管理
     *
     * @return
     */
    @RequestMapping("/contractBillList")
    public String contractBillList() {
        return "financeManage/contractBillList";
    }

    /**
     * 查询合同订单分页数据
     *
     * @param pagination
     * @Author JiangQT
     * @Date 2017-7-26 17:05
     * @description:
     */
    @RequestMapping("/queryContractOrderPageList")
    public @ResponseBody
    String queryContractOrderPageList(Pagination<FinanceOrderPageListBo> pagination) {
        Msg<Object> msg = new Msg<>();
        String bco_orderType = "";
        bco_orderType += AppConfig.order_type_1;
//        bco_orderType += "," + AppConfig.order_type_2;
//        bco_orderType += "," + AppConfig.order_type_3;
        pagination.addQueryWhere("bco_orderType", bco_orderType, "inlist");
        pagination.formatWhere();
        pagination = financeManageService.queryFinanceOrderPageList(pagination);
        return msg.toString(pagination);
    }

    @RequestMapping("/exportContractOrderData")
    public void exportContractOrderData(Pagination<FinanceOrderPageListBo> pagination) {
        JSONArray titles = JSONObject.parseArray(pagination.getTitles());
        String bco_orderType = "";
        bco_orderType += AppConfig.order_type_1;
        pagination.addQueryWhere("bco_orderType", bco_orderType, "inlist");
        pagination.formatWhere();
        pagination = financeManageService.queryFinanceOrderPageList(pagination);
        List<?> contents = pagination.getList();
        WorkUtil.toExcel("账单", titles, contents);
    }

    /**
     * 查询财务订单数据
     *
     * @Author JiangQT
     * @Date 2017-7-26 17:05
     * @description:
     */
    @RequestMapping("/queryFinanceOrderInfo")
    public @ResponseBody
    String queryFinanceOrderInfo(String bco_code) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(bco_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 查询订单信息
        ContractOrderVo contractOrderVo = financeManageService.queryFinanceOrder(bco_code);
        msg.put("financeOrder", contractOrderVo);

        if (contractOrderVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 房源信息
        if (contractOrderVo.getHi_code() != null) {
            ViewHouseLibraryInfoVo houseLibraryInfo = houseLibraryService.queryHouseLibraryInfo(contractOrderVo.getHi_code());
            msg.put("houseInfo", houseLibraryInfo);
        }

        // 合同信息
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_Code(contractOrderVo.getContractObject_code());
        contractVo = contractObjectService.selectContractObjectByCNo(contractVo);
        msg.put("contractInfo", contractVo);

        // 查询账单列表信息
        List<ContractBillVo> financeBillList = financeManageService.queryFinanceBillList(bco_code);
        msg.put("financeBillList", financeBillList);

        return msg.toString();
    }

    @RequestMapping("/queryContractBillList")
    public @ResponseBody
    String queryContractBillList(String bco_code) {
        Msg<Object> msg = new Msg<>();

        // 验证参数
        if (StringUtils.isEmpty(bco_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 获取订单信息
        ContractOrderVo contractOrderVo = financeManageService.queryFinanceOrder(bco_code);
        if (contractOrderVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 获取合同信息
        ContractObjectVo contractObject = contractObjectService.queryContractObject(contractOrderVo.getContractObject_code());

        // 获取合同账单列表信息
        List<ContractBillVo> financeBillList = financeManageService.queryFinanceBillList(bco_code);

        // 获取合同账单期数
        financeBillList = AppUtil.getContractBillCycleDateAll(financeBillList, contractObject.getContractObject_DeadlineTime());
        msg.put("financeBillList", financeBillList);

        // 查询合同账单分期账单
        List<ContractBillInstalmentVo> contractBillStageList = financeManageService.queryContractBillInstalmentList(bco_code);
        msg.put("contractBillStageList", contractBillStageList);

        return msg.toString();
    }

    @RequestMapping("/queryContractBillMergeList")
    public @ResponseBody
    String queryContractBillMergeList(String bco_code) {
        Msg<Object> msg = new Msg<>();

        // 验证参数
        if (StringUtils.isEmpty(bco_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 获取订单信息
        ContractOrderVo contractOrderVo = financeManageService.queryFinanceOrder(bco_code);
        if (contractOrderVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBco_code(bco_code);
        List<ContractBillVo> contractBillList = financeManageService.queryContractBillListByTotal(contractBillVo);
        msg.put("contractBillList", contractBillList);

        // 查询合同账单分期账单
        List<ContractBillInstalmentVo> contractBillStageList = financeManageService.queryContractBillInstalmentList(bco_code);
        msg.put("contractBillStageList", contractBillStageList);

        return msg.toString();
    }

    @RequestMapping("/queryContractBillListForChange")
    public @ResponseBody
    String queryContractBillListForChange(String bco_code, String pay_cycle) {
        Msg<Object> msg = new Msg<>();

        // 验证参数
        if (StringUtils.isEmpty(bco_code) || StringUtils.isEmpty(pay_cycle)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 获取订单信息
        ContractOrderVo contractOrderVo = financeManageService.queryFinanceOrder(bco_code);
        if (contractOrderVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 获取合同信息
        UserCenterContractBody contractBody = contractObjectService.queryContractBody(contractOrderVo.getContractObject_code());
        if (contractBody == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        ArrayList<ContractBillVo> contractBillList = null;
        switch (contractBody.getContractBody_ContractMode()) {
            case 0:
                contractBillList = contractObjectService.addContractBillForTG(contractOrderVo, pay_cycle);
                break;
            case 1:
                contractBillList = contractObjectService.addContractBillForTGNew(contractOrderVo, pay_cycle);
                break;
        }
        msg.put("contractBillList", contractBillList);

        return msg.toString();
    }

    @RequestMapping("/queryPayOrderList")
    public @ResponseBody
    String queryPayOrderList(String bco_code, String order_status) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(bco_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 查询订单信息
        ContractOrderVo financeOrder = financeManageService.queryFinanceOrder(bco_code);
        if (StringUtils.isEmpty(financeOrder)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        if (StringUtils.isEmpty(financeOrder.getBco_customer())) {
            return msg.toError("没有发现该客户信息");
        }

        // 获取客户信息
        UserCustomer customer = customerService.queryCustomerInfo(financeOrder.getBco_customer());
        if (customer == null) {
            return msg.toError("没有发现该客户信息");
        }

        // 查询支付订单
        OrderVo orderVo = new OrderVo();
        orderVo.setTrade_cc_code(financeOrder.getBco_customer());
        if (!"0".equals(order_status)) {
            orderVo.setOrder_status_in(order_status);
        }
        orderVo.setOrder_con_code(financeOrder.getContractObject_code());
        orderVo.setOrder_hi_code(financeOrder.getHi_code());
        List<OrderVo> orderList = orderService.queryOrderList(orderVo);
        msg.put("orderList", orderList);

        return msg.toString();
    }

    @RequestMapping("/submitDetailInfo")
    public @ResponseBody
    String submitDetailInfo(String jsonStr) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(jsonStr)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }

        JSONObject json = JSONObject.parseObject(jsonStr);
        if (json == null || json.isEmpty()) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        try {
            orderService.submitDetailInfo(json, employee);
        } catch (AppException e) {
            e.printStackTrace();
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    @RequestMapping("/deleteDetailInfo")
    public @ResponseBody
    String deleteDetailInfo(Integer detail_id) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(detail_id)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }

        try {
            orderService.deleteDetailInfo(detail_id);
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
     * 查询账单详情
     *
     * @param bco_code
     * @param bcb_cycle
     * @return
     */
    @RequestMapping("/queryFinanceBillInfo")
    public @ResponseBody
    String queryFinanceBillInfo(String bco_code, Integer bcb_cycle) {
        Msg<Object> msg = new Msg<>();

        // 查询账单列表信息
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBco_code(bco_code);
        contractBillVo.setBcb_cycle(bcb_cycle);
        List<ContractBillVo> financeBillList = financeManageService.queryFinanceBillList(contractBillVo);
        msg.put("financeBillList", financeBillList);

        return msg.toString();
    }

    /* ========【支付订单管理】=START======= */

    @RequestMapping("/orderList")
    public String orderList() {
        return "/financeManage/orderList";
    }

    /**
     * 查询流水分页列表
     *
     * @param pagination
     * @return
     */
    @RequestMapping("/queryOrderPageList")
    public @ResponseBody
    String queryOrderPageList(Pagination<OrderVo> pagination) {
        Msg<Object> msg = new Msg<>();
//        pagination.addQueryWhere("bill_status", AppConfig.bill_status_2);
        pagination.formatWhere();
        pagination = financeManageService.queryOrderPageList(pagination);
        return msg.toString(pagination);
    }

    /**
     * 查询订单详情
     *
     * @param order_sn
     * @return
     */
    @RequestMapping("/queryOrderInfo")
    public @ResponseBody
    String queryOrderInfo(String order_sn) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(order_sn)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 更新支付订单金额
        orderService._updatePayOrderForAmount(order_sn);

        // 订单信息
        OrderVo orderVo = orderService.queryOrder(order_sn);
        if (orderVo == null) {
            return msg.toError("没有发现该订单信息");
        }
        msg.put("orderInfo", orderVo);

        // 订单明细
        List<OrderDetailVo> orderDetailList = orderService.queryOrderDetailList(order_sn);
        msg.put("orderDetailList", orderDetailList);

        // 流水
        if (orderVo.getPay_sn() != null) {
            OrderBillVo orderBillVo = orderService.queryOrderBill(orderVo.getPay_sn());
            msg.put("orderBill", orderBillVo);
        }
        return msg.toString();
    }

    /**
     * 请求支付
     *
     * @param order_sn
     * @param pay_channel
     * @return
     */
    @RequestMapping(value = "/submitPay", method = RequestMethod.POST)
    public @ResponseBody
    String submitPay(String order_sn, String pay_channel) {
        Msg<Object> msg = new Msg<>();
        try {
            // 验证参数
            if (StringUtils.isEmpty(order_sn) || StringUtils.isEmpty(pay_channel)) {
                throw new AppException(Msg.MSG_PARAM_ERROR);
            }

            // 【提交支付】
            OrderBillVo orderBillVo = orderService._requestPay(AppConfig.channel_erp_pc, order_sn, pay_channel, AppUtil.getIP());
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
     * 请求二维码支付
     *
     * @param bill_sn
     * @return
     */
    @RequestMapping(value = "/requestPay", produces = "text/json;charset=UTF-8")
    public @ResponseBody
    String requestPay(String bill_sn, String pay_date, String pay_remarks) {
        Msg<Object> msg = new Msg<>();
        try {
            if (StringUtils.isEmpty(bill_sn)) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }

            UserCenterEmployee employee = AppUtil.getCookieEmployee();
            if (employee == null) {
                return msg.toError(Msg.MSG_LOGIN_ERROR);
            }

            msg = orderService._requestPayResult(bill_sn, pay_date, pay_remarks, employee);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    /**
     * 查询订单详情
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/addOrder", method = RequestMethod.POST)
    public @ResponseBody
    String addOrder(@RequestBody JSONObject json) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(json)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }

        try {
            orderService._addPayOrder(json, employee.getEm_id());
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
     * 更新合同账单之代偿
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/updateContractBillForCompensatory", method = RequestMethod.POST)
    public @ResponseBody
    String updateContractBillForCompensatory(@RequestBody JSONObject json) {
        Msg<Object> msg = new Msg<>();
        try {
            if (StringUtils.isEmpty(json)) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }
            orderService._updateContractBillForCompensatory(json, AppUtil.getCookieEmployee());
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
     * 添加合同分期账单
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/addContractBillInstalment", method = RequestMethod.POST)
    public @ResponseBody
    String addContractBillInstalment(@RequestBody JSONObject json) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(json)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }

        try {
            orderService._addContractInstalmentBill(json, employee.getEm_id());
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    /**
     * 更新合同账单
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/updateContractBill", method = RequestMethod.POST)
    public @ResponseBody
    String updateContractBill(@RequestBody JSONObject json) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(json)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }

        try {
            orderService._updateContractBill(json, employee.getEm_id());
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    /**
     * 更新合同账单
     *
     * @return
     */
    @RequestMapping(value = "/updateContractBillForInstalment", method = RequestMethod.POST)
    public @ResponseBody
    String updateContractBillForInstalment(@RequestBody JSONObject json) {
        Msg<Object> msg = new Msg<>();
        try {
            if (StringUtils.isEmpty(json)) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }

            orderService._updateContractBillForInstalment(json);
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    /**
     * 同步支付订单
     *
     * @param bco_code 订单号，不传为同步所有
     * @return
     */
    @RequestMapping("/syncPayOrder")
    public @ResponseBody
    String syncPayOrder(String bco_code, Integer bcb_cycle, Integer advance_day) {
        Msg<Object> msg = new Msg<>();

        // 验证用户信息
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null || StringUtils.isEmpty(employee.getEm_id())) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        if (StringUtils.isEmpty(advance_day)) {
            advance_day = 0;
        }

        // 添加支付订单之合同账单
        orderService._syncPayOrderForContractBill(AppConfig.channel_erp_pc, bco_code, bcb_cycle, advance_day);

        return msg.toString();
    }

    /**
     * 添加支付账单之合同分期账单
     *
     * @param cbs_code
     * @return
     */
    @RequestMapping("/addPayOrderForContractStageBill")
    public @ResponseBody
    String addPayOrderForContractStageBill(String cbs_code) {
        Msg<Object> msg = new Msg<>();

        // 验证参数
        if (StringUtils.isEmpty(cbs_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 验证用户
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null || StringUtils.isEmpty(employee.getEm_id())) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }

        try {
            orderService._addPayOrderForContractInstalmentBill(AppConfig.channel_erp_pc, cbs_code);
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
     * 请求订单打印
     *
     * @param order_sn
     * @return
     */
    @RequestMapping("/requestOrderPrint")
    public @ResponseBody
    String requestOrderPrint(String order_sn) {
        Msg<Object> msg = new Msg<>();
        ArrayList<Object> lists = new ArrayList<>();
        ArrayList<Object> items = new ArrayList<>();

        // 验证登录
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }

        // 验证参数
        if (StringUtils.isEmpty(order_sn)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 获取订单信息
        OrderVo orderVo = orderService.queryOrder(order_sn);
        if (orderVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 获取房源信息
        ViewHouseLibraryInfoVo libraryInfo = houseLibraryService.queryHouseLibraryInfo(orderVo.getOrder_hi_code());

        // 获取合同信息
        ContractInfoVo contractInfoVo = contractObjectService.queryContractInfo(orderVo.getOrder_con_code());

        // 获取订单明细
        List<OrderDetailVo> orderDetailList = orderService.queryOrderDetailList(order_sn);
        for (OrderDetailVo orderDetailVo : orderDetailList) {
            // 明细备注
            String detail_remarks = orderDetailVo.getDetail_remarks();
            // 明细JSON数据
            JSONObject product_detail = JSONObject.parseObject(orderDetailVo.getProduct_detail());
            if (product_detail != null) {
                String bco_code = product_detail.getString("bco_code");
                int bcb_type = product_detail.getIntValue("bcb_type");
                int bcb_cycle = product_detail.getIntValue("bcb_cycle");

                StringBuilder desc = new StringBuilder();
                if (bco_code != null && bcb_type == 0) {
                    String bcb_cycle_date = product_detail.getString("bcb_cycle_date");
                    List<ContractBillVo> financeBillList = financeManageService.queryFinanceBillList(bco_code);

                    desc.append("第").append(bcb_cycle).append("期[");
                    if (StringUtils.isEmpty(bcb_cycle_date)) {
                        desc.append(AppUtil.getContractBillCycleDateOne(financeBillList, contractInfoVo.getContractObject_DeadlineTime(), bcb_cycle));
                    } else {
                        desc.append(bcb_cycle_date);
                    }
                    desc.append("]");
                    detail_remarks = StringUtils.isEmpty(detail_remarks) ? desc.toString() : desc.toString() + ";" + detail_remarks;
                }
            }

            JSONObject item = new JSONObject();
            item.put("name", orderDetailVo.getProduct_name());
            item.put("desc", detail_remarks);
            item.put("value", (orderDetailVo.getDetail_balpay() == 1 ? "" : "-") + orderDetailVo.getDetail_subtotal());
            Date pay_date = orderVo.getOrder_agreed_pay_date() == null ? orderVo.getOrder_create_time() : orderVo.getOrder_agreed_pay_date();
            item.put("date", AppUtil.sdf_date.format(pay_date));
            items.add(item);
        }

        // 赋值数据
        JSONObject list = new JSONObject();
        JSONObject person = new JSONObject();
        list.put("code", order_sn);
        list.put("name", orderVo.getUser_name());
        list.put("address", libraryInfo == null ? "" : libraryInfo.getHouse_address());
        list.put("items", items);

        person.put("p1", employee.getEm_name());
        list.put("person", person);
        lists.add(list);

        msg.put("subTitle", orderVo.getOrder_balpay() == 1 ? "收款凭证" : "付款凭证");
        msg.put("list", lists);

        return msg.toString();
    }

    /* ========【订单管理】=END======= */

    /* ========【流水管理】=START======= */

    /**
     * 流水管理
     *
     * @return
     */
    @RequestMapping("/orderBillList")
    public String OrderBillList() {
        return "/financeManage/orderBillList";
    }

    /**
     * 查询流水分页列表
     *
     * @param pagination
     * @return
     */
    @RequestMapping("/queryOrderBillPageList")
    public @ResponseBody
    String queryOrderBillPageList(Pagination<OrderBillVo> pagination) {
        Msg<Object> msg = new Msg<>();
        pagination.addQueryWhere("bill_status", AppConfig.bill_status_2);
        pagination.formatWhere();
        pagination = financeManageService.queryOrderBillPageList(pagination);
        return msg.toString(pagination);
    }

    /**
     * 查询流水详情
     *
     * @param bill_sn
     * @return
     */
    @RequestMapping("/queryOrderBill")
    public @ResponseBody
    String queryOrderBill(String bill_sn) {
        Msg<Object> msg = new Msg<>();
        try {
            if (StringUtils.isEmpty(bill_sn)) {
                throw new AppException(Msg.MSG_PARAM_ERROR);
            }
            // 查询流水信息
            OrderBillVo orderBillVo = orderService.queryOrderBill(bill_sn);
            if (orderBillVo == null) {
                throw new AppException("没有发现该笔流水");
            }
            msg.put("orderBill", orderBillVo);

            // 查询订单列表
            OrderVo orderVo = new OrderVo();
            orderVo.setPay_sn(bill_sn);
            List<OrderVo> orderList = orderService.queryOrderList(orderVo);
            orderList.forEach(orderVo1 -> orderVo1.setDetailList(orderService.queryOrderDetailList(orderVo1.getOrder_sn())));
            msg.put("orderList", orderList);

            // 获取核销记录
            PayFlowStatementValidRecord flowStatementValidRecord = new PayFlowStatementValidRecord();
            flowStatementValidRecord.setBs_serialNumber(orderBillVo.getBill_sn());
            List<PayFlowStatementValidRecord> flowStatementValidRecordList = recordService.queryPayFlowStatementValidRecord(flowStatementValidRecord);
            msg.put("orderBillCheckList", flowStatementValidRecordList);
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            return msg.toError(e);
        }
        return msg.toString();
    }

    /**
     * 验证流水-支付平台信息
     *
     * @param bill_sn
     * @return
     */
    @RequestMapping("/checkOrderBillForPayPlatform")
    public @ResponseBody
    String checkOrderBillForPayPlatform(String bill_sn) {
        Msg<Object> msg = new Msg<>();
        try {
            if (StringUtils.isEmpty(bill_sn)) {
                throw new AppException(Msg.MSG_PARAM_ERROR);
            }

            OrderBillVo orderBillVo = orderService.queryOrderBill(bill_sn);
            if (StringUtils.isEmpty(bill_sn)) {
                throw new AppException(Msg.MSG_PARAM_ERROR);
            }

            // 调用接口
            if ("支付宝".equals(orderBillVo.getBill_pay_channel())) {
                try {
                    msg = AliPay.alipayTradeQuery(orderBillVo.getBill_trade_code());
                    JSONObject map = msg.getJson();
                    if (map != null && "已关闭".equals(map.get("trade_state"))) {
                        Msg<Object> msg1 = AliPay.alipayTradeRefundQuery(orderBillVo.getBill_trade_code());
                        JSONObject map1 = msg1.getJson();
                        if (map1 != null) {
                            Object trade_refund_money = map1.get("trade_refund_money");
                            msg.put("trade_refund_money", StringUtils.isEmpty(trade_refund_money) ? map.get("trade_money") : trade_refund_money);
                        } else {
                            msg.put("trade_refund_money", map.get("trade_money"));
                        }
                    }
                } catch (AppException e) {
                    e.printStackTrace();
                    return msg.toError(e);
                } catch (Exception e) {
                    e.printStackTrace();
                    return msg.toError(e);
                }
            }
            if ("微信".equals(orderBillVo.getBill_pay_channel())) {
                try {
                    msg = WeixinPay.weixinTradeQuery(orderBillVo.getBill_trade_code());
                    JSONObject map = msg.getJson();
                    if (map != null && "已退款".equals(map.get("trade_state"))) {
                        msg.put(WeixinPay.weixinTradeRefundquery(orderBillVo.getBill_trade_code()).getJson());
                    }
                    System.out.println(msg.toString());
                } catch (AppException e) {
                    e.printStackTrace();
                    if (e.getCode() == 111) {
                        try {
                            msg = WeixinPay.weixinTradeQuery(orderBillVo.getBill_trade_code(), null, "public");
                            JSONObject map = msg.getJson();
                            if (map != null && "已退款".equals(map.get("trade_state"))) {
                                msg.put(WeixinPay.weixinTradeRefundquery(orderBillVo.getBill_trade_code(), null, "public").getJson());
                            }
                            return msg.toString();
                        } catch (AppException e1) {
                            e1.printStackTrace();
                            return msg.toError(e1);
                        } catch (Exception e1) {
                            e1.printStackTrace();
                            return msg.toError(e1);
                        }
                    }
                    return msg.toError(e);
                } catch (Exception e) {
                    e.printStackTrace();
                    return msg.toError(e);
                }
            }
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            return msg.toError(e);
        }
        return msg.toString();
    }

    /**
     * 更新流水-备注
     *
     * @param bill_sn
     * @return
     */
    @RequestMapping("/updateOrderBillForRemark")
    public @ResponseBody
    String updateOrderBillForRemark(String bill_sn, String bill_remarks) {
        Msg<Object> msg = new Msg<>();
        try {
            if (StringUtils.isEmpty(bill_sn)) {
                throw new AppException(Msg.MSG_PARAM_ERROR);
            }
            OrderBillVo orderBillVo = orderService.queryOrderBill(bill_sn);
            if (orderBillVo == null) {
                throw new AppException(Msg.MSG_PARAM_ERROR);
            }

            // 更新流水之备注
            OrderBillVo orderBillVo1 = new OrderBillVo();
            orderBillVo1.setBill_id(orderBillVo.getBill_id());
            orderBillVo1.setBill_remarks(bill_remarks);
            orderService.updateOrderBill(orderBillVo1);
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            return msg.toError(e);
        }
        return msg.toString();
    }

    /**
     * 更新流水-核销
     *
     * @param checkRecordStr
     * @return
     */
    @RequestMapping("/updateOrderBillForCheck")
    public @ResponseBody
    String updateOrderBillForCheck(String checkRecordStr) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        if (StringUtils.isEmpty(checkRecordStr)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        try {
            PayFlowStatementValidRecord statementValidRecord = JSONObject.parseObject(checkRecordStr, PayFlowStatementValidRecord.class);
            financeManageService.updateOrderBillForCheck(statementValidRecord);
        } catch (AppException e) {
            e.printStackTrace();
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    /* ========【流水管理】=END======= */

    /* ========【支付1】=START======= */

    /**
     * 【API】【支付宝】交易查询
     *
     * @param trade_code 商户订单号
     * @return
     * @author JiangQt
     * @version 2017年6月21日下午6:05:03
     */
    @RequestMapping(value = "/alipayTradeQuery", produces = "application/json; charset=utf-8")
    public @ResponseBody
    String alipayTradeQuery(String trade_code, String trade_no) {
        Msg<Object> msg = new Msg<>();
        try {
            if (StringUtils.isEmpty(trade_code) && StringUtils.isEmpty(trade_no)) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }
            msg = AliPay.alipayTradeQuery(trade_code, trade_no);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    /**
     * 【API】【微信】交易查询
     *
     * @param trade_code
     * @return
     */
    @RequestMapping(value = "/wxpayTradeQuery", produces = "application/json; charset=utf-8")
    public @ResponseBody
    String wxpayTradeQuery(String trade_code, String trade_no, String mode) {
        Msg<Object> msg = new Msg<>();
        try {
            if (StringUtils.isEmpty(trade_code) && StringUtils.isEmpty(trade_no)) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }
            msg = WeixinPay.weixinTradeQuery(trade_code, trade_no, mode);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    /**
     * 【API】【微信】交易退款查询
     *
     * @param trade_code
     * @return
     */
    @RequestMapping(value = "/wxpayTradeRefundQuery", produces = "application/json; charset=utf-8")
    public @ResponseBody
    String wxpayTradeRefundQuery(String trade_code) {
        Msg<Object> msg = new Msg<>();
        try {
            msg = WeixinPay.weixinTradeRefundquery(trade_code);
        } catch (AppException e) {
            return msg.toError(e);
        } catch (Exception e) {
            return msg.toError(e);
        }
        return msg.toString();
    }

    /* ========【支付2】=START======= */

    /**
     * 账单支付
     *
     * @param data
     * @return
     */
    @RequestMapping(value = "/financeBillPay")
    public @ResponseBody
    String financeBillPay(String data) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        if (StringUtils.isEmpty(data)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        JSONObject json = JSONObject.parseObject(data);
        try {
            if (StringUtils.isEmpty(json.getString("bco_code"))
                    || StringUtils.isEmpty(json.getString("payWay"))
                    || StringUtils.isEmpty(json.getDouble("payMoney"))
                    || json.getJSONArray("billList") == null) {
                return msg.toError(Msg.MSG_PARAM_ERROR);
            }

            json.put("source", AppConfig.bs_source_erp_pc);
            json.put("user_ip", AppUtil.getIP());
            json.put("em_id", employee.getEm_id());
            msg = financeManageService.updateRentBillBo(json);

            if (!"支付宝".equals(json.getString("payWay")) && !"微信".equals(json.getString("payWay"))) {
                JSONObject map = msg.getJson();
                if (map != null && !map.isEmpty()) {
                    String trade_code = (String) map.get("trade_code");
                    JSONObject json2 = new JSONObject();
                    json2.put("out_trade_no", trade_code);
                    json2.put("trade_no", AppUtil.getTradeCode(trade_code));
                    json2.put("total_fee", json.getDouble("payMoney"));
                    json2.put("trade_status", "success");
                    json2.put("buyer_logon_id", "");
                    json2.put("bcb_operater", employee.getEm_id());
                    json2.put("notify_time", new Date());
                    msg = financeManageService.updatePayNotify(json2);
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
     * 响应支付结果
     *
     * @param trade_code
     * @return
     */
    @RequestMapping(value = "/responsePayResult")
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

    /**
     * 【API】【支付宝】支付回调
     * <p>
     * 获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表
     *
     * @param request
     * @return
     * @throws ParseException
     */
    @RequestMapping(value = "/alipayNotify", produces = "application/json; charset=utf-8")
    public @ResponseBody
    String alipayNotify(HttpServletRequest request) {
        Msg<Object> msg = new Msg<>();
        try {
            // 获取参数
            Map<String, String> params = AliPay.getParams(request);
            // 验证签名
            if (!AliPay.checkSignature(params)) {
                throw new AppException("签名验证失败");
            }
            orderService._responsePayResult(params.get("out_trade_no"));
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
     * 【API】账单，微信支付回调
     *
     * @param request
     * @throws Exception
     * @author 陈智颖
     */
    @RequestMapping(value = "/weixinPayNotify", produces = "application/json; charset=utf-8")
    public @ResponseBody
    String weixinPayNotify(HttpServletRequest request) {
        Msg<Object> msg = new Msg<>();
        try {
            // 获取参数集
            SortedMap<Object, Object> params = WeixinPay.getParams(request);
            // 验证签名
            if (!WeixinPay.checkSign(params)) {
                throw new AppException("签名验证失败");
            }
            orderService._responsePayResult(params.get("out_trade_no").toString());
        } catch (AppException e) {
            e.printStackTrace();
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    /* ========【支付】=END======= */

    /**
     * 待收款
     *
     * @return
     * @author 陈智颖
     * @date Apr 19, 2017 2:41:49 PM
     */
    @RequestMapping("/appCollectBill")
    public String appCollectBill() {
        return "/appPage/stay/collectBill";
    }

    /**
     * @param pageNo   开始数
     * @param pageSize 查询条数
     * @param bco_type 待收款[201] 待付款[202] 待签合同[203]
     * @param where    查询条件
     * @param em_id    用户编码
     * @return
     */
    @RequestMapping("/billContractOrderListApp")
    public @ResponseBody
    Map<String, Object> billContractOrderListApp(Integer pageNo, Integer pageSize, Integer bco_type, String where, Integer em_id) {
        Map<String, Object> map = new HashMap<>();
        pageSize = pageNo * pageSize;
        pageNo = (pageNo - 1) * pageSize;
        if (bco_type.equals("203")) {
            map = customerService.queryCustomerStayList(pageNo, pageSize, em_id, where);
        } else {
            map = contractOrderService.billContractOrderListApp(pageNo, pageSize, bco_type, where, em_id);
        }
        return map;
    }

    /**
     * 查询支付流水支付状态
     *
     * @param bs_orderNumber
     * @return
     */
    @RequestMapping("/queryFirstStatement")
    public @ResponseBody
    String queryFirstStatement(String bs_orderNumber) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(bs_orderNumber)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        // 获取流水详情
        FinancePayFlowStatementVo financePayFlowStatementVo = new FinancePayFlowStatementVo();
        financePayFlowStatementVo.setBs_orderNumber(bs_orderNumber);
        financePayFlowStatementVo = financeManageService.queryPayFlowStatement(financePayFlowStatementVo);
        if (financePayFlowStatementVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        if (StringUtils.isEmpty(financePayFlowStatementVo.getContractObject_code())) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        List<ContractBillVo> contractBillVoList = contractOrderService.queryBillContractByConCode(financePayFlowStatementVo.getContractObject_code());
        if (contractBillVoList == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        msg.put("contractBillVoList", contractBillVoList);

        return msg.toString();
    }

}
