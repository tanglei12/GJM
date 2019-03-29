package com.gjp.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.gjp.dao.*;
import com.gjp.model.*;
import com.gjp.util.*;
import com.gjp.util.pay.AliPay;
import com.gjp.util.pay.WeixinPay;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 财务管理service
 *
 * @author JiangQt
 * @version 2017年6月4日上午10:08:34
 */
@Service
public class FinanceManageService {

    // 财务管理DAO
    @Resource
    private FinanceManageDao financeManageDao;
    // 合同管理
    @Resource
    private ContractService contractService;
    // 客户管理
    @Resource
    private CustomerService customerService;
    // 房源带看
    @Resource
    private HouseLibraryDao houseLibraryDao;
    // 房源带看
    @Resource
    private HouseLibraryService houseLibraryService;
    // 账单
    @Resource
    private BillContractBillDao billContractBillDao;
    // 订单
    @Resource
    private BillContractOrderDao billContractOrderDao;
    // 库存房源
    @Resource
    private HousingAllocationDao housingAllocationDao;
    // 房屋合同
    @Resource
    private ContractDao contractDao;
    // 房屋扩展信息
    @Resource
    private HouseExtendedDao houseExtendedDao;
    // 房屋扩展信息
    @Resource
    private RecordService recordService;
    // 房屋扩展信息
    @Resource
    private UserCenterEmployeeService employeeService;
    // 服务订单
    @Resource
    private ServiceService serviceService;
    // 服务费
    @Resource
    private ServiceChargeService serviceChargeService;
    // 服务费
    @Resource
    private OrderService orderService;

    /**
     * 更新定金状态
     *
     * @param json
     * @param em_id
     * @throws AppException
     */
    public void _updateFinanceDownPayment(JSONObject json, Integer em_id) throws AppException {
        // 获取参数
        Integer fdp_id = json.getInteger("fdp_id");
        Integer break_way = json.getInteger("break_way");
        Integer returns_way = json.getInteger("returns_way");
        Double returns_amount = json.getDouble("returns_amount");
        String returns_desc = json.getString("returns_desc");
        Date returns_handling_date = json.getDate("returns_handling_date");

        // 验证参数
        if (StringUtils.isEmpty(fdp_id)
                || StringUtils.isEmpty(returns_way)
                || StringUtils.isEmpty(returns_amount)) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 获取定金信息
        FinanceDownPaymentVo financeDownPaymentVo = this.queryFinanceDownPayment(fdp_id);
        if (financeDownPaymentVo == null) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }
        // -->审核中&未使用
        if (financeDownPaymentVo.getFdp_status() != AppConfig.fdp_status_1
                && financeDownPaymentVo.getFdp_status() != AppConfig.fdp_status_2) {
            throw new AppException("该定金状态无法进行违约处理");
        }

        // 更新定金状态
        FinanceDownPaymentVo financeDownPaymentVo1 = new FinanceDownPaymentVo();
        financeDownPaymentVo1.setFdp_id(fdp_id);
        switch (break_way) {
            case 1: // 定金到期
                financeDownPaymentVo1.setFdp_status(AppConfig.fdp_status_4); // 已到期
                break;
            case 2: // 客户违约
            case 3: // 公司违约
                financeDownPaymentVo1.setFdp_status(AppConfig.fdp_status_6); // 已违约
                break;
        }
        this.updateFinanceDownPayment(financeDownPaymentVo1);

        // 获取订单信息
        OrderVo orderVo = orderService.queryOrder(financeDownPaymentVo.getOrder_sn());

        OrderReturnsVo orderReturnsVo0 = this.queryOrderReturns(orderVo.getOrder_id());
        if (orderReturnsVo0 != null) {
            throw new AppException("该定金已违约处理，无法重复处理数据");
        }

        // 添加退款信息
        OrderReturnsVo orderReturnsVo = new OrderReturnsVo();
        orderReturnsVo.setReturns_no(AppUtil.getPublicSN(6));
        orderReturnsVo.setOrder_id(orderVo.getOrder_id());
        orderReturnsVo.setReturns_way(returns_way);
        if (returns_amount.equals(orderVo.getOrder_amount_pay())) {
            orderReturnsVo.setReturns_type(AppConfig.returns_type_1);
        }
        if (returns_amount >= 0 && returns_amount < orderVo.getOrder_amount_pay()) {
            orderReturnsVo.setReturns_type(AppConfig.returns_type_2);
        }
        if (returns_amount == 0) {
            orderReturnsVo.setReturns_type(AppConfig.returns_type_3);
        }
        orderReturnsVo.setReturns_status(AppConfig.returns_status_1);
        orderReturnsVo.setReturns_desc(returns_desc);
        orderReturnsVo.setReturns_amount(returns_amount);
        orderReturnsVo.setReturns_handler(em_id);
        orderReturnsVo.setReturns_handle_date(returns_handling_date);
        orderReturnsVo.setReturns_create_time(new Date());
        this.addOrderReturns(orderReturnsVo);
    }

    /**
     * 【业务操作】添加定金
     *
     * @throws AlipayApiException
     * @throws AppException
     * @author JiangQt
     * @version 2017年6月4日下午3:18:00
     */
    public Msg<Object> addDepositOrderBillBo(JSONObject json) throws Exception {
        String hi_code = json.getString("hi_code");
        String cc_code = json.getString("cc_code");
        String cc_name = json.getString("cc_name");
        String payMoney = json.getString("payMoney");
        String payWay = json.getString("payWay");
        Integer em_id = json.getInteger("em_id");
        Integer invalidDay = json.getInteger("invalidDay");
        String user_ip = json.getString("user_ip");

        if (StringUtils.isEmpty(hi_code)
                || StringUtils.isEmpty(cc_code)
                || StringUtils.isEmpty(cc_name)
                || StringUtils.isEmpty(payMoney)
                || StringUtils.isEmpty(payWay)
                || StringUtils.isEmpty(em_id)
                || StringUtils.isEmpty(invalidDay)) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 关闭已有但还未支付的订单
        ContractOrderVo contractOrderVo0 = new ContractOrderVo();
        contractOrderVo0.setHi_code(hi_code);
        contractOrderVo0.setBco_orderType(AppConfig.order_type_4);
        contractOrderVo0.setBco_customer(cc_code);
        contractOrderVo0.setBco_optionState(AppConfig.order_option_state_2);
        List<ContractOrderVo> financeOrderList = this.queryFinanceOrderList(contractOrderVo0);
        if (financeOrderList != null) {
            // 【关闭未支付订单、账单、流水】
            for (ContractOrderVo contractOrderVo: financeOrderList) {
                this.closeOrderBillStatement(contractOrderVo.getBco_code());
            }
        }

        Date createTime = new Date();

        // 【添加定金订单数据】
        String bco_code = AppUtil.getOrderCode("203");
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setBco_code(bco_code);
        contractOrderVo.setHi_code(hi_code);
        contractOrderVo.setBco_orderType(AppConfig.order_type_4); // 定金订单类型
        contractOrderVo.setBco_type(203);
        contractOrderVo.setBco_customer(cc_code);
        contractOrderVo.setBco_currentBalPay(0); // 0：公司收入、1：公司支出
        contractOrderVo.setBco_currentPayment(new BigDecimal(payMoney));
        contractOrderVo.setBco_currentDate(createTime);
        contractOrderVo.setBco_state(AppConfig.ORDER_STATE_1);
        contractOrderVo.setBco_optionState(AppConfig.order_option_state_2);
        contractOrderVo.setBco_butler(em_id);
        Calendar c = Calendar.getInstance();
        c.setTime(createTime);
        c.add(Calendar.DATE, invalidDay);
        contractOrderVo.setBco_invalidTime(c.getTime());
        contractOrderVo.setBco_createTime(createTime);
        if (!this.addContractOrder(contractOrderVo)) {
            throw new AppException("生成定金订单失败，请重试或联系管理员");
        }

        // 【添加定金账单数据】
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBcb_code(AppUtil.getOrderCode("211"));
        contractBillVo.setBco_code(contractOrderVo.getBco_code());
        contractBillVo.setBcb_type(AppConfig.CONTRACT_BILL_TYPE_18);
        contractBillVo.setBcb_balPay(0);
        contractBillVo.setBcb_repayment(new BigDecimal(payMoney));
        contractBillVo.setBcb_repaymentDate(createTime);
        contractBillVo.setBcb_state(AppConfig.order_option_state_2);
        contractBillVo.setBcb_budgetState(0);
        contractBillVo.setBcb_payWay(payWay);
        contractBillVo.setBcb_creator(0);
        contractBillVo.setBcb_operater(0);
        contractBillVo.setBcb_createTime(createTime);
        if (!this.addContractBill(contractBillVo)) {
            throw new AppException("生成定金账单失败，请重试或联系管理员");
        }

        ArrayList<Object> list = new ArrayList<>();
        list.add(contractBillVo);

        // ->添加流水
        json.put("hi_code", hi_code);
        json.put("bco_code", contractOrderVo.getBco_code());
        json.put("type", contractOrderVo.getBco_orderType());
        json.put("balPay", 1);
        json.put("payMoney", payMoney);
        json.put("payWay", payWay);
        json.put("billList", JSONArray.toJSONString(list));
        json.put("cc_code", cc_code);
        json.put("cc_name", cc_name);
        Msg<Object> msg = this.addPayFlowStatementBo(json);

        // ->生成二维码
        JSONObject payJson = msg.getJson();
        // 商户号
        String trade_code = payJson.getString("trade_code");
        // 商品标题
        String title = payJson.getString("title");
        // 商品描述
        String subtitle = payJson.getString("subtitle");
        if ("支付宝".equals(payWay)) {
            Msg<Object> alipayTradePrecreate = AliPay.alipayTradePrecreate(trade_code, payMoney, title, subtitle, AliPay.notify_url);
            if (alipayTradePrecreate.getCode() != 200) {
                throw new AppException(alipayTradePrecreate.getMsg());
            }
            msg.put(alipayTradePrecreate.getJson());
        }
        if ("微信".equals(payWay)) {
            Msg<Object> weixinTradePrecreateScanCode = WeixinPay.weixinTradePrecreateScanCode(trade_code, title, subtitle, payMoney, user_ip);
            if (weixinTradePrecreateScanCode.getCode() != 200) {
                throw new AppException(weixinTradePrecreateScanCode.getMsg());
            }
            msg.put(weixinTradePrecreateScanCode.getJson());
        }
        return msg;
    }

    /**
     * 添加支付流水
     *
     * @param json
     * @return
     * @throws Exception
     */
    public Msg<Object> addPayFlowStatementBo(JSONObject json) throws Exception {
        Msg<Object> msg = new Msg<>();

        // 获取房源CODE(必传)
        String hi_code = json.getString("hi_code");
        // 获取订单CODE(必传)
        String bco_code = json.getString("bco_code");
        // 获取类型(必传)
        int type = json.getIntValue("type");
        // 获取支付方式(必传)
        String payWay = json.getString("payWay");
        // 获取流水类型（1：公司收款、2：公司付款）(必传)
        int balPay = json.getInteger("balPay");
        // 获取支付金额(必传)
        double payMoney = json.getDoubleValue("payMoney");
        // 来源(必传)
        Integer source = json.getInteger("source");
        // 经办人
        Integer em_id = json.getInteger("em_id");
        // 获取账单列表(必传)
        List<ContractBillVo> financeBillList = JSONArray.parseArray(json.getOrDefault("billList", "").toString(), ContractBillVo.class);

        // 获取客户CODE
        String cc_code = json.getString("cc_code");
        // 获取客户姓名
        String cc_name = json.getString("cc_name");

        // 验证参数
        if (StringUtils.isEmpty(bco_code)
                || StringUtils.isEmpty(payWay)
                || payMoney == 0
                || financeBillList == null) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 获取房源数据
        ViewHouseLibraryInfoVo houseLibraryInfo = houseLibraryService.queryHouseLibraryInfo(hi_code);

        // 获取订单
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setBco_code(bco_code);
        contractOrderVo = this.queryFinanceOrder(contractOrderVo);

        // 获取标题|获取副标题
        String title, subtitle;
        switch (type) {
            case AppConfig.order_type_1:
                String cycle = "";
                Integer bco_currentCycle = contractOrderVo.getBco_currentCycle();
                if (contractOrderVo.getBco_type() == 201) {
                    if (bco_currentCycle == 0) {
                        cycle = "首期";
                    } else {
                        cycle = "第" + bco_currentCycle + "/" + contractOrderVo.getBco_totalCycle() + "期";
                    }
                }
                if (contractOrderVo.getBco_type() == 202) {
                    if (bco_currentCycle == 0) {
                        cycle = "首期";
                    } else {
                        cycle = "第" + (bco_currentCycle + 1) + "/" + contractOrderVo.getBco_totalCycle() + "期";
                    }
                }
                title = "租金-" + houseLibraryInfo.getHouse_address();
                subtitle = cycle + "租金";
                break;
            case AppConfig.order_type_2:
                title = "服务费-" + houseLibraryInfo.getHouse_address();
                subtitle = "服务费";
                break;
            case AppConfig.order_type_3:
                title = "结算费-" + houseLibraryInfo.getHouse_address();
                subtitle = "结算费";
                break;
            case AppConfig.order_type_4:
                title = "定金-" + houseLibraryInfo.getHouse_address();
                subtitle = "定金";
                break;
            default:
                throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 【关闭流水数据】
        for (ContractBillVo contractBillVo: financeBillList) {
            FinanceStatementBillRelationVo statementBillRelationVo = new FinanceStatementBillRelationVo();
            statementBillRelationVo.setBcb_code(contractBillVo.getBcb_code());
            statementBillRelationVo.setSbr_state(1);
            List<FinanceStatementBillRelationVo> statementBillRelationList = this.queryStatementBillRelationList(statementBillRelationVo);
            if (statementBillRelationList != null && !statementBillRelationList.isEmpty()) {
                for (FinanceStatementBillRelationVo statementBillRelationVo2: statementBillRelationList) {
                    FinancePayFlowStatementVo payFlowStatementVo = new FinancePayFlowStatementVo();
                    payFlowStatementVo.setBs_serialNumber(statementBillRelationVo2.getBs_serialNumber());
                    payFlowStatementVo.setBs_flowState(AppConfig.bs_flowState_3);
                    payFlowStatementVo.setBs_state_where(AppConfig.bs_state_1);
                    this.updatePayFlowStatement(payFlowStatementVo);
                }
                String bs_serialNumber = statementBillRelationList.get(0).getBs_serialNumber();
                // 更新流水关系表
                statementBillRelationVo = new FinanceStatementBillRelationVo();
                statementBillRelationVo.setBs_serialNumber(bs_serialNumber);
                statementBillRelationVo.setSbr_state(3);
                this.updateStatementBillRelation(statementBillRelationVo);
            }
        }

        // 流水号
        String bs_serialNumber = AppUtil.getOrderCode("220");
        // 商户订单号
        String trade_code = AppUtil.getOrderCode("221");

        // 【添加流水数据】
        FinancePayFlowStatementVo payFlowStatementVo = new FinancePayFlowStatementVo();
        payFlowStatementVo.setBs_serialNumber(bs_serialNumber);
        payFlowStatementVo.setBs_orderNumber(trade_code);
        payFlowStatementVo.setBco_code(bco_code);
        payFlowStatementVo.setHi_code(hi_code);
        payFlowStatementVo.setBs_type(type);
        payFlowStatementVo.setBs_title(title);
        payFlowStatementVo.setBs_subtitle(subtitle);
        payFlowStatementVo.setBs_money(new BigDecimal(payMoney));
        payFlowStatementVo.setBs_payType(payWay); // 支付方式
        payFlowStatementVo.setBs_source(source); // 来源
        payFlowStatementVo.setBs_state(AppConfig.bs_state_1); // 待收款
        payFlowStatementVo.setBs_flowState(AppConfig.bs_flowState_1); // 待收款
        payFlowStatementVo.setBs_verifyState(AppConfig.bs_verifyState_1); // 未核销
        payFlowStatementVo.setBs_balPay(balPay);
        payFlowStatementVo.setBs_handler(em_id);
        // 公司收款
        if (balPay == 1) {
            // 收款方
            payFlowStatementVo.setBs_payeeCode(null);
            payFlowStatementVo.setBs_payeeName("重庆管家婆房地产经纪有限公司");
            // 付款方
            payFlowStatementVo.setBs_payerCode(cc_code);
            payFlowStatementVo.setBs_payerName(cc_name);
        }
        // 公司付款
        if (balPay == 2) {
            // 收款方
            payFlowStatementVo.setBs_payeeCode(cc_code);
            payFlowStatementVo.setBs_payeeName(cc_name);
            // 付款方
            payFlowStatementVo.setBs_payerCode(null);
            payFlowStatementVo.setBs_payerName("重庆管家婆房地产经纪有限公司");
        }
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        payFlowStatementVo.setBs_createTime(c.getTime());
        c.add(Calendar.MINUTE, 30);
        payFlowStatementVo.setBs_invalidTime(c.getTime());
        boolean boo = this.addPayFlowStatement(payFlowStatementVo);
        if (!boo) {
            throw new AppException("添加流水失败，请重试");
        }

        // 【添加流水关系数据】
        for (ContractBillVo contractBillVo: financeBillList) {
            FinanceStatementBillRelationVo statementBillRelationVo = new FinanceStatementBillRelationVo();
            statementBillRelationVo.setBcb_code(contractBillVo.getBcb_code());
            statementBillRelationVo.setSbr_money(contractBillVo.getBcb_repayment());
            statementBillRelationVo.setBs_serialNumber(bs_serialNumber);
            statementBillRelationVo.setSbr_createTime(new Date());
            boo = this.addStatementBillRelation(statementBillRelationVo);
            if (!boo) {
                throw new AppException("添加流水关系失败，请重试");
            }
        }

        msg.put("trade_code", trade_code);
        msg.put("statement_code", bs_serialNumber);
        msg.put("title", title);
        msg.put("subtitle", subtitle);
        return msg;
    }

    /**
     * 添加服务订单账单
     * <br>
     * financeOrder.bco_code
     * financeOrder.hi_code(必填)
     * financeOrder.contractObject_code
     * financeOrder.bco_orderType(必填)
     * financeOrder.bco_type(必填)
     * financeOrder.bco_cooperater
     * financeOrder.bco_payObject
     * financeOrder.bco_userId
     * financeOrder.bco_customer(必填)
     * financeOrder.ucc_id
     * financeOrder.em_id
     * financeOrder.bco_currentCycle
     * financeOrder.bco_currentBalPay
     * financeOrder.bco_currentPayment
     * financeOrder.bco_currentDate
     * financeOrder.bco_currentOverDay
     * financeOrder.bco_currentOverCycle
     * financeOrder.bco_totalCycle(必填)
     * financeOrder.bco_totalPayment(必填)
     * financeOrder.bco_state(必填)
     * financeOrder.bco_optionState(必填)
     * financeOrder.bco_butler(必填)
     * financeOrder.bco_createTime
     * financeOrder.bco_invalidTime
     * <p>
     * financeBills[].bcb_code
     * financeBills[].bco_code
     * financeBills[].bcb_cycle
     * financeBills[].bcb_type(必填)
     * financeBills[].bcb_balPay(必填)
     * financeBills[].bcb_repayment(必填)
     * financeBills[].bcb_realPayment
     * financeBills[].bcb_balance
     * financeBills[].bcb_state(必填)
     * financeBills[].bcb_budgetState
     * financeBills[].bcb_repaymentDate(必填)
     * financeBills[].bcb_realPaymentDate
     * financeBills[].bcb_agreedDate
     * financeBills[].bcb_payWay
     * financeBills[].bcb_overdueDay
     * financeBills[].bcb_isRepay
     * financeBills[].bcb_creator(必填)
     * financeBills[].bcb_operater
     * financeBills[].bcb_remarks
     * financeBills[].bcb_createTime
     *
     * @param json
     * @throws AppException
     */
    public ContractOrderVo addServiceFinanceOrderBillBo(JSONObject json) throws AppException {
        JSONObject financeOrder = json.getJSONObject("financeOrder");
        JSONArray financeBills = json.getJSONArray("financeBills");

        // 添加订单
        ContractOrderVo contractOrderVo = this.addFinanceOrderBo(financeOrder);

        // 添加账单
        List<ContractBillVo> financeBillList = financeBills.toJavaList(ContractBillVo.class);
        for (ContractBillVo contractBillVo: financeBillList) {
            contractBillVo.setBco_code(contractOrderVo.getBco_code());
            this.addFinanceBillBo(JSONObject.parseObject(JSONObject.toJSONString(contractBillVo)));
        }

        return contractOrderVo;
    }

    /**
     * 添加订单
     *
     * @param json 参数对象
     * @throws AppException 数据异常
     */
    public ContractOrderVo addFinanceOrderBo(JSONObject json) throws AppException {
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        String bco_code;
        switch (json.getInteger("bco_orderType")) {
            case AppConfig.order_type_1:
                bco_code = AppUtil.getOrderCode("201");
                break;
            case AppConfig.order_type_2:
                bco_code = AppUtil.getOrderCode("202");
                break;
            case AppConfig.order_type_3:
                bco_code = AppUtil.getOrderCode("203");
                break;
            case AppConfig.order_type_4:
                bco_code = AppUtil.getOrderCode("204");
                break;
            default:
                throw new AppException("订单类型错误，请重试或联系管理员");
        }
        // 订单CODE
        contractOrderVo.setBco_code(bco_code);
        // 房源CODE
        contractOrderVo.setHi_code(json.getString("hi_code"));
        // 合同CODE
        contractOrderVo.setContractObject_code(json.getString("contractObject_code"));
        // 订单类型（1：合同订单、2：服务订单、3：结算订单、4：定金订单）
        contractOrderVo.setBco_orderType(json.getInteger("bco_orderType"));
        // 合作伙伴（管家婆、58分期、等）
        contractOrderVo.setBco_cooperater(json.getString("bco_cooperater"));
        // 账单类型（201：托管合同、202：租赁合同）
        contractOrderVo.setBco_type(json.getInteger("bco_type"));
        // 付费对象 1-客户；2-管家；3-门店
        contractOrderVo.setBco_payObject(json.getInteger("bco_payObject"));
        // 外部用户ID
        contractOrderVo.setBco_userId(json.getInteger("bco_userId"));
        // 客户CODE
        contractOrderVo.setBco_customer(json.getString("bco_customer"));
        // 当前应还款期数
        contractOrderVo.setBco_currentCycle(json.getInteger("bco_currentCycle"));
        // 收支类型（0：收入、1：支出）注：相对公司而言
        contractOrderVo.setBco_currentBalPay(json.getInteger("bco_currentBalPay"));
        // 当期应支付金额
        contractOrderVo.setBco_currentPayment(json.getBigDecimal("bco_currentPayment"));
        // 当期支付日期
        contractOrderVo.setBco_currentDate(json.getDate("bco_currentDate"));
        // 当期逾期天数
        contractOrderVo.setBco_currentOverDay(json.getInteger("bco_currentOverDay"));
        // 逾期期数
        contractOrderVo.setBco_currentOverCycle(json.getInteger("bco_currentOverCycle"));
        // 账单总还款期数
        contractOrderVo.setBco_totalCycle(json.getInteger("bco_totalCycle"));
        // 账单总金额
        contractOrderVo.setBco_totalPayment(json.getBigDecimal("bco_totalPayment"));
        // 订单状态（1：正常、2：失效）
        contractOrderVo.setBco_state((Integer) json.getOrDefault("bco_state", AppConfig.ORDER_STATE_1));
        // 支付状态（1：待审核、2：待还款、3：完结、4：取消、9：第三方、10：转租、11：退租、12：解约、13：清退、14：代偿、15：换房
        contractOrderVo.setBco_optionState((Integer) json.getOrDefault("bco_optionState", AppConfig.order_option_state_2));
        // 管家
        contractOrderVo.setBco_butler(json.getInteger("bco_butler"));
        // 创建时间
        contractOrderVo.setBco_createTime((Date) json.getOrDefault("bco_createTime", new Date()));
        // 失效时间
        contractOrderVo.setBco_invalidTime(json.getDate("bco_invalidTime"));
        boolean boo = this.addContractOrder(contractOrderVo);
        if (!boo) {
            throw new AppException("生成订单失败，请重试或联系管理员");
        }
        return contractOrderVo;
    }

    /**
     * 添加账单
     * <br>
     * json.bcb_code
     *
     * @param json
     * @throws AppException
     */
    public ContractBillVo addFinanceBillBo(JSONObject json) throws AppException {
        ContractBillVo contractBillVo = new ContractBillVo();
        // 账单CODE
        contractBillVo.setBcb_code(AppUtil.getOrderCode("211"));
        // 订单CODE
        contractBillVo.setBco_code(json.getString("bco_code"));
        // 账单期数(租金账单需要用着)
        contractBillVo.setBcb_cycle(json.getInteger("bcb_cycle"));
        // 账单类型（0：租金、1：押金、2：包修费、3：服务费,等等）
        contractBillVo.setBcb_type(json.getInteger("bcb_type"));
        // 收支类型（0：收入、1：支出）注：相对公司而言
        contractBillVo.setBcb_balPay(json.getInteger("bcb_balPay"));
        // 应还款
        contractBillVo.setBcb_repayment(json.getBigDecimal("bcb_repayment"));
        // 实际支付金额
        contractBillVo.setBcb_realPayment(json.getBigDecimal("bcb_realPayment"));
        // 未支付金额
        contractBillVo.setBcb_balance(json.getBigDecimal("bcb_balance"));
        // 账单状态（1：待审核、2：待还款、3：已还款、4：取消、9、第三方、10：转租、11：退租、12：解约、13：清退、14：代偿、15：代偿未收款、16：代偿已收款
        contractBillVo.setBcb_state(json.getInteger("bcb_state"));
        // 预算状态（0：未预算、1：已加入预算、2：预算未通过、3：预算已通过、4：预算已完结）
        contractBillVo.setBcb_budgetState((Integer) json.getOrDefault("bcb_budgetState", 0));
        // 应还款时间
        contractBillVo.setBcb_repaymentDate(json.getDate("bcb_repaymentDate"));
        // 实际还款时间
        contractBillVo.setBcb_realPaymentDate(json.getDate("bcb_realPaymentDate"));
        // 约定还款日期
        contractBillVo.setBcb_agreedDate(json.getDate("bcb_agreedDate"));
        // 支付方式
        contractBillVo.setBcb_payWay(json.getString("bcb_payWay"));
        // 逾期天数
        contractBillVo.setBcb_overdueDay(json.getInteger("bcb_overdueDay"));
        // 是否代偿：0.否,1.是
        contractBillVo.setBcb_isRepay((Integer) json.getOrDefault("bcb_isRepay", 0));
        // 创建人
        contractBillVo.setBcb_creator((Integer) json.getOrDefault("bcb_creator", 0));
        // 操作人
        contractBillVo.setBcb_operater((Integer) json.getOrDefault("bcb_operater", 0));
        // 备注
        contractBillVo.setBcb_remarks(json.getString("bcb_remarks"));
        // 创建时间
        contractBillVo.setBcb_createTime((Date) json.getOrDefault("bcb_createTime", new Date()));
        boolean boo = this.addContractBill(contractBillVo);
        if (!boo) {
            throw new AppException("生成账单失败，请重试或联系管理员");
        }
        return contractBillVo;
    }

    /**
     * 【API】更新合同关联订单
     *
     * @param bco_code 订单CODE
     * @return
     * @throws Exception
     * @author JiangQt
     * @version 2017年6月4日上午10:05:54
     */
    @Deprecated
    public boolean updateContractRelated(String bco_code) throws Exception {
        // 合同订单
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setBco_code(bco_code);
        contractOrderVo = financeManageDao.queryFinanceOrder(contractOrderVo);
        if (contractOrderVo == null) {
            throw new AppException("合同订单无法找到");
        }

        // 合同账单
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBco_code(bco_code);
        contractBillVo.setBcb_cycle(0);
        List<ContractBillVo> contractBillList = queryFinanceBillList(contractBillVo);
        if (contractBillList == null) {
            throw new AppException("合同账单无法找到");
        }
        if (contractBillList.get(0).getBbb_state() != 3) {
            throw new AppException("合同账单未支付");
        }
        double totalMoney = 0;
        for (ContractBillVo contractBillVo2: contractBillList) {
            BigDecimal realPayment = contractBillVo2.getBcb_realPayment();
            totalMoney += realPayment == null ? 0 : realPayment.doubleValue();
        }

        // 合同信息
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setContractObject_Code(contractOrderVo.getContractObject_code());
        contractVo = contractService.selectContractObjectByCNo(contractVo);
        if (contractVo == null) {
            throw new AppException("合同信息无法找到");
        }

        // 首期账单转关联订单
        String ro_code = AppUtil.getOrderCode("203");
        BillRelatedOrderVo relatedOrderVo = new BillRelatedOrderVo();
        relatedOrderVo.setRo_code(ro_code);
        relatedOrderVo.setHi_code(contractVo.getHi_code());
        relatedOrderVo.setBco_code(bco_code);
        relatedOrderVo.setHouse_address(contractVo.getHouse_address());
        relatedOrderVo.setRo_customerType(contractOrderVo.getBco_type());
        relatedOrderVo.setRo_customerName(contractVo.getCc_name());
        relatedOrderVo.setRo_customerPhone(contractVo.getCcp_phone());
        relatedOrderVo.setRo_totalMoney(new BigDecimal(totalMoney));
        relatedOrderVo.setRo_payState(2);
        relatedOrderVo.setRo_state(2);
        relatedOrderVo.setRo_creator(contractBillList.get(0).getBcb_operater());
        relatedOrderVo.setRo_createTime(new Date());
        boolean boo = this.addRelatedOrder(relatedOrderVo);
        if (!boo) {
            throw new AppException("添加关联订单出错");
        }

        // 首期账单转关联账单
        for (ContractBillVo contractBillVo2: contractBillList) {
            BillRelatedBillVo relatedBillVo = new BillRelatedBillVo();
            relatedBillVo.setRb_code(AppUtil.getOrderCode("211"));
            relatedBillVo.setRo_code(ro_code);
            relatedBillVo.setRb_type(contractBillVo2.getBcb_type());
            relatedBillVo.setRb_balPay(contractBillVo2.getBcb_balPay());
            relatedBillVo.setRb_paymentMoney(contractBillVo2.getBcb_realPayment());
            relatedBillVo.setRb_paymentDate(contractBillVo2.getBcb_realPaymentDate());
            relatedBillVo.setRb_state(2);
            relatedBillVo.setRb_payWay(contractBillVo2.getBcb_payWay());
            relatedBillVo.setRb_creator(contractBillVo2.getBcb_creator());
            relatedBillVo.setRb_createTime(new Date());
            this.addRelatedBill(relatedBillVo);
        }

        // TODO 定金回写合同
        // relatedOrderVo = new BillRelatedOrderVo();
        // relatedOrderVo.setHi_code(contractVo.getHi_code());
        // relatedOrderVo.setRo_customerPhone(contractVo.getCcp_phone());
        // relatedOrderVo.setRo_payState(2);
        // relatedOrderVo = this.queryRelatedOrder(relatedOrderVo);

        return boo;
    }

    /**
     * 【业务操作】添加预算账单
     *
     * @param data
     * @param employee
     * @return
     * @作者 JiangQT
     * @日期 2016年11月9日
     */
    public String addBudgetBillService(Map<String, Object> data, UserCenterEmployee employee) {
        Msg<Object> msg = new Msg<>();
        List<BudgetBillVo> budgetVos = JSONArray.parseArray((String) data.get("billBudgets"), BudgetBillVo.class);
        String bbo_code = (String) data.get("bbo_code");
        if (StringUtils.isEmpty(bbo_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        Integer bbb_id = null;
        for (BudgetBillVo budgetVo: budgetVos) {
            // 更新账单
            if (!StringUtils.isEmpty(budgetVo.getBill_id())) {
                ContractBillVo contractBillVo = new ContractBillVo();
                contractBillVo.setBcb_id(budgetVo.getBill_id());
                if (budgetVo.getBill_type() != 0 && budgetVo.getBill_type() != 11 && budgetVo.getBill_type() != 12) {
                    // 托管合同：支付客户金额，正为付[1]，负为收[0]。
                    if (AppConfig.TYPE_CONTRACT_201.equals(budgetVo.getContractObject_Type())) {
                        contractBillVo.setBcb_balPay(budgetVo.getBill_repayment().doubleValue() < 0 ? 0 : 1);
                    }
                    // 租赁合同：收取客户金额，正为收[0]，负为付[1]。
                    if (AppConfig.TYPE_CONTRACT_202.equals(budgetVo.getContractObject_Type())) {
                        contractBillVo.setBcb_balPay(budgetVo.getBill_repayment().doubleValue() < 0 ? 1 : 0);
                    }
                    contractBillVo.setBcb_repayment(budgetVo.getBill_repayment().abs());
                }
                if (StringUtils.isEmpty(budgetVo.getBill_budgetState())) {
                    contractBillVo.setBcb_budgetState(AppConfig.BILL_BUDGET_STATE_1);
                } else if (AppConfig.BILL_BUDGET_STATE_4 == budgetVo.getBill_budgetState()) {
                    contractBillVo.setBcb_budgetState(budgetVo.getBill_budgetState());
                } else {
                    contractBillVo.setBcb_budgetState(budgetVo.getBill_budgetState());
                }
                this.updateFinanceBill(contractBillVo);
            } else {
                // 查询当前期数租金信息
                ContractBillVo contractBillVo = new ContractBillVo();
                contractBillVo.setBco_code(budgetVo.getBill_code());
                contractBillVo.setBcb_cycle(budgetVo.getBill_cycle());
                contractBillVo.setBcb_type(0);
                contractBillVo = this.queryFinanceBill(contractBillVo);

                if (contractBillVo != null) {
                    // 添加账单
                    ContractBillVo contractBillVo2 = new ContractBillVo();
                    contractBillVo2.setBcb_code(AppUtil.getOrderCode("210"));
                    contractBillVo2.setBco_code(budgetVo.getBill_code());
                    contractBillVo2.setBcb_cycle(budgetVo.getBill_cycle());
                    contractBillVo2.setBcb_type(budgetVo.getBill_type());
                    // 托管合同：支付客户金额，正为付[1]，负为收[0]。
                    if (AppConfig.TYPE_CONTRACT_201.equals(budgetVo.getContractObject_Type())) {
                        contractBillVo2.setBcb_balPay(budgetVo.getBill_repayment().doubleValue() < 0 ? 0 : 1);
                    }
                    // 租赁合同：收取客户金额，正为收[0]，负为付[1]。
                    if (AppConfig.TYPE_CONTRACT_202.equals(budgetVo.getContractObject_Type())) {
                        contractBillVo2.setBcb_balPay(budgetVo.getBill_repayment().doubleValue() < 0 ? 1 : 0);
                    }
                    contractBillVo2.setBcb_repayment(budgetVo.getBill_repayment().abs());
                    contractBillVo2.setBcb_state(AppConfig.order_option_state_2);
                    contractBillVo2.setBcb_repaymentDate(contractBillVo.getBcb_repaymentDate());
                    if (StringUtils.isEmpty(budgetVo.getBill_budgetState())) {
                        contractBillVo2.setBcb_budgetState(AppConfig.BILL_BUDGET_STATE_1);
                    } else if (AppConfig.BILL_BUDGET_STATE_4 == budgetVo.getBill_budgetState()) {
                        contractBillVo2.setBcb_budgetState(budgetVo.getBill_budgetState());
                        contractBillVo2.setBcb_realPayment(budgetVo.getBill_repayment().abs());
                        contractBillVo2.setBcb_repaymentDate(budgetVo.getBill_realpaymentDate());
                        contractBillVo2.setBcb_realPaymentDate(budgetVo.getBill_realpaymentDate());
                        contractBillVo2.setBcb_state(AppConfig.order_option_state_3);
                        contractBillVo2.setBcb_payWay(budgetVo.getBill_paymentWay());
                        contractBillVo2.setBcb_creator(employee.getEm_id());
                        contractBillVo2.setBcb_operater(employee.getEm_id());
                    } else {
                        contractBillVo2.setBcb_budgetState(budgetVo.getBill_budgetState());
                    }
                    contractBillVo2.setBcb_remarks(budgetVo.getBbb_remarks());
                    contractBillVo2.setBcb_createTime(new Date());
                    financeManageDao.addContractBill(contractBillVo2);
                    // 设置账单编号
                    budgetVo.setBill_id(contractBillVo2.getBcb_id());

                    // 支付时，添加的账单需要添加流水
                    if (AppConfig.BILL_BUDGET_STATE_4 == budgetVo.getBill_budgetState()) {
                        String statementCode = AppUtil.getOrderCode("210");
                        // 添加流水关系表
                        BillStatementFiliation statementFiliation = new BillStatementFiliation();
                        statementFiliation.setSf_type("支付");
                        statementFiliation.setSf_num(contractBillVo2.getBcb_code());
                        statementFiliation.setSf_date(new Date());
                        statementFiliation.setSf_statement(statementCode);
                        boolean boo = this.addStatementFiliation(statementFiliation);
                        if (!boo) {
                            try {
                                throw new Exception();
                            } catch (Exception e) {
                                e.printStackTrace();
                                return msg.toError("添加账单流水失败，请重试或联系管理员");
                            }
                        }
                    }
                }
            }

            // 【添加/更新预算清单】
            budgetVo.setBbo_code(bbo_code);
            budgetVo.setBbb_applicant(employee.getEm_id());
            if (StringUtils.isEmpty(budgetVo.getBbb_id())) {
                budgetVo.setBbb_createTime(new Date());
                this.addBudgetBill(budgetVo);
            } else {
                this.updateBudgetBill(budgetVo);
            }
            bbb_id = budgetVo.getBbb_id();
        }
        BudgetBillVo budgetBill = bbb_id != null ? this.queryBudgetBill(bbb_id) : null;
        return msg.toString(budgetBill);
    }

    /**
     * 【业务操作】添加预算清单
     *
     * @param budgetOrderVo
     * @param employee
     * @return
     * @作者 JiangQT
     * @日期 2016年11月24日
     */
    public String addBudgetOrderService(BudgetOrderVo budgetOrderVo, UserCenterEmployee employee) {
        Msg<Object> msg = new Msg<>();
        boolean boo;
        if (StringUtils.isEmpty(budgetOrderVo.getBbo_id())) {
            budgetOrderVo.setBbo_code(AppUtil.getOrderCode(budgetOrderVo.getBbo_type() == 0 ? "COL" : "PAY"));
            budgetOrderVo.setBbo_state(0);
            budgetOrderVo.setBbo_creator(employee.getEm_id());
            budgetOrderVo.setBbo_createTime(new Date());
            boo = this.addBudgetOrder(budgetOrderVo);
            if (boo) {
                msg.setData(budgetOrderVo.getBbo_id());
            }
        } else {
            boo = this.updateBudgetOrder(budgetOrderVo);
        }
        if (!boo) {
            return msg.toError("数据保存失败，请重试或联系管理员");
        }
        return msg.toString();
    }

    /**
     * 【业务操作】更新合同账单
     *
     * @param employee
     * @return
     * @作者 JiangQT
     * @日期 2016年11月4日
     */
    public String updateBudgetBillService(BudgetBillVo budgetBillVo, UserCenterEmployee employee) {
        Msg<Object> msg = new Msg<>();

        // 【查询预算清单】
        BudgetBillVo budgetVo = new BudgetBillVo();
        budgetVo.setBbb_id(budgetBillVo.getBbb_id());
        budgetVo = this.queryBudgetBill(budgetVo);
        if (budgetVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        if (budgetVo.getBill_state() != 2) {
            return msg.toError("该预算账单不能支付");
        }

        // 【查询相关账单】
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBcb_id(budgetVo.getBill_id());
        contractBillVo = this.queryFinanceBill(contractBillVo);
        if (contractBillVo == null) {
            return msg.toError("没有发现该预算账单的相应账单");
        }
        if (contractBillVo.getBcb_state() == AppConfig.order_option_state_3) {
            return msg.toError("该账单已支付");
        }

        String statementCode = AppUtil.getOrderCode("210");
        // 添加流水关系表
        BillStatementFiliation statementFiliation = new BillStatementFiliation();
        statementFiliation.setSf_type("支付");
        statementFiliation.setSf_num(contractBillVo.getBcb_code());
        statementFiliation.setSf_date(new Date());
        statementFiliation.setSf_statement(statementCode);
        boolean boo = this.addStatementFiliation(statementFiliation);
        if (!boo) {
            try {
                throw new Exception();
            } catch (Exception e) {
                e.printStackTrace();
                return msg.toError("添加账单流水失败，请重试或联系管理员");
            }
        }

        // 更新账单
        ContractBillVo contractBillVo1 = new ContractBillVo();
        contractBillVo1.setBcb_id(contractBillVo.getBcb_id());
        contractBillVo1.setBcb_realPayment(budgetBillVo.getBill_realpayment());
        contractBillVo1.setBcb_realPaymentDate(budgetBillVo.getBill_realpaymentDate());
        contractBillVo1.setBcb_state(AppConfig.order_option_state_3);
        contractBillVo1.setBcb_budgetState(AppConfig.BILL_BUDGET_STATE_4);
        contractBillVo1.setBcb_balance(budgetBillVo.getBill_balance());
        contractBillVo1.setBcb_payWay(budgetBillVo.getBill_paymentWay());
        contractBillVo1.setBcb_remarks(budgetBillVo.getBbb_remarks());
        contractBillVo1.setBcb_operater(employee.getEm_id());
        this.updateFinanceBill(contractBillVo1);

        // 【添加[欠缴/结余]账单】
        // if (!StringUtils.isEmpty(budgetBillVo.getBill_balance()) &&
        // budgetBillVo.getBill_balance().doubleValue() != 0) {
        // contractBillVo1 = new ContractBillVo();
        // contractBillVo1.setBco_code(contractBillVo.getBco_code());
        // contractBillVo1.setBcb_cycle(contractBillVo.getBcb_cycle());
        // if
        // (AppConfig.TYPE_CONTRACT_202.equals(budgetVo.getContractObject_Type()))
        // {
        // contractBillVo1.setBcb_type(budgetBillVo.getBill_balance().doubleValue()
        // < 0 ? 11 : 12);// 11:往期结余、12:往期欠缴
        // contractBillVo1.setBcb_balPay(budgetBillVo.getBill_balance().doubleValue()
        // < 0 ? 1 : 0);
        // }
        // if
        // (AppConfig.TYPE_CONTRACT_201.equals(budgetVo.getContractObject_Type()))
        // {
        // contractBillVo1.setBcb_type(budgetBillVo.getBill_balance().doubleValue()
        // < 0 ? 12 : 11);// 11:往期结余、12:往期欠缴
        // contractBillVo1.setBcb_balPay(budgetBillVo.getBill_balance().doubleValue()
        // < 0 ? 0 : 1);
        // }
        // contractBillVo1.setBcb_state(AppConfig.order_option_state_2);
        // contractBillVo1.setBcb_repayment(budgetBillVo.getBill_balance());
        // contractBillVo1.setBcb_repaymentDate(budgetBillVo.getBill_balanceDate());
        // this.addContractBill(contractBillVo1);
        // }

        // 【更新预算账单】
        budgetBillVo.setBbb_manager(employee.getEm_id());
        this.updateBudgetBill(budgetBillVo);

        return msg.toString();
    }

    /**
     * 【业务操作】提交预算账单审核
     *
     * @param bbb_id
     * @return
     * @作者 JiangQT
     * @日期 2016年11月30日
     */
    public String updateBudgetBillAuditingService(Integer bbb_id, Integer bill_optionState) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(bbb_id) || StringUtils.isEmpty(bill_optionState)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 查询预算账单
        BudgetBillVo budgetBillVo = this.queryBudgetBill(bbb_id);
        if (budgetBillVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 更新合同账单
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBcb_id(budgetBillVo.getBill_id());
        contractBillVo.setBcb_budgetState(bill_optionState);
        boolean boo = this.updateFinanceBill(contractBillVo);
        if (!boo) {
            return msg.toError("数据更新失败，请重试或联系管理员");
        }

        // 查询最新预算账单
        budgetBillVo = this.queryBudgetBill(bbb_id);
        return msg.toString(budgetBillVo);
    }

    /**
     * 【业务操作】提交预算审核
     *
     * @param employee
     * @param bbo_state
     * @return
     * @作者 JiangQT
     * @日期 2016年11月27日
     */
    public String updateBudgetOrderService(Integer bbo_id, Integer bbo_state, UserCenterEmployee employee) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(bbo_id) || StringUtils.isEmpty(bbo_state)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        // 查询最新预算订单
        BudgetOrderVo budgetOrderVo = this.queryBudgetOrder(bbo_id);
        if (budgetOrderVo == null) {
            return msg.toError("没有发现该预算订单，请重试或联系管理员");
        }

        // 如果审核
        if (AppConfig.BUDGET_ORDER_STATE1 == bbo_state) {
            // 更新待审核的预算账单
            BudgetBillVo budgetBillVo = new BudgetBillVo();
            budgetBillVo.setBbo_code(budgetOrderVo.getBbo_code());
            budgetBillVo.setBill_budgetState(AppConfig.BILL_BUDGET_STATE_1);
            List<BudgetBillVo> budgetInBillList = this.queryBudgetBillList(budgetBillVo);
            for (BudgetBillVo budgetBillVo1: budgetInBillList) {
                ContractBillVo contractBillVo = new ContractBillVo();
                contractBillVo.setBcb_id(budgetBillVo1.getBill_id());
                contractBillVo.setBcb_budgetState(AppConfig.BILL_BUDGET_STATE_3);
                this.updateFinanceBill(contractBillVo);
            }
        }

        // 更新预算订单
        budgetOrderVo = new BudgetOrderVo();
        budgetOrderVo.setBbo_id(bbo_id);
        budgetOrderVo.setBbo_state(bbo_state);
        boolean boo = this.updateBudgetOrder(budgetOrderVo);
        if (!boo) {
            return msg.toError("数据保存失败，请重试或联系管理员");
        }

        // 查询最新预算订单
        budgetOrderVo = new BudgetOrderVo();
        budgetOrderVo.setBbo_id(bbo_id);
        budgetOrderVo = this.queryBudgetOrder(budgetOrderVo);
        return msg.toString(budgetOrderVo);
    }

    /**
     * 【业务操作】撤销预算账单支付信息
     *
     * @param bbb_id
     * @return
     * @作者 JiangQT
     * @日期 2016年12月5日
     */
    public String updateRevokeBudgetBillService(Integer bbb_id, UserCenterEmployee employee) {
        Msg<Object> msg = new Msg<>();

        // 查询预算账单
        BudgetBillVo budgetBillVo = this.queryBudgetBill(bbb_id);
        if (budgetBillVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 查询合同账单
        ContractBillVo contractBillVo = this.queryFinanceBill(budgetBillVo.getBill_id());
        if (contractBillVo != null) {
            // 查询流水关系数据
            BillStatementFiliation statementFiliation = new BillStatementFiliation();
            statementFiliation.setSf_num(contractBillVo.getBcb_code());
            List<BillStatementFiliation> statementFiliations = this.queryStatementFiliationList(statementFiliation);
            for (BillStatementFiliation statementFiliation2: statementFiliations) {
                // 删除流水关系数据
                this.delectStatementFiliation(statementFiliation2.getSf_id());
                // 删除流水数据
                this.deleteBillStatement(statementFiliation2.getSf_statement());
            }

            // 更新合同账单
            ContractBillVo contractBillVo2 = new ContractBillVo();
            contractBillVo2.setBcb_id(contractBillVo.getBcb_id());
            contractBillVo2.setBcb_state(AppConfig.order_option_state_2);
            contractBillVo2.setBcb_budgetState(AppConfig.BILL_BUDGET_STATE_3);
            contractBillVo2.setBcb_realPayment(null);
            contractBillVo2.setBcb_balance(null);
            contractBillVo2.setBcb_realPaymentDate(null);
            contractBillVo2.setBcb_payWay(null);
            contractBillVo2.setBcb_operater(employee.getEm_id());
            this.updateContractBillForRevoke(contractBillVo2);
        }

        return msg.toString();
    }

    /**
     * 更新租金账单
     *
     * @param json
     * @return
     * @throws Exception
     */
    public Msg<Object> updateRentBillBo(JSONObject json) throws Exception {
        String bco_code = json.getString("bco_code");
        String user_ip = json.getString("user_ip");
        String payWay = json.getString("payWay");
        String payMoney1 = json.getString("payMoney");

        double payMoney = new BigDecimal(Double.parseDouble(payMoney1)).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();

        // ->获取订单
        ContractOrderVo contractOrderVo = this.queryFinanceOrder(bco_code);
        if (contractOrderVo == null) {
            throw new AppException("没有发现该订单");
        }

        // ->获取客户
        UserCustomer customer = customerService.queryCustomerInfo(contractOrderVo.getBco_customer());
        if (customer == null) {
            throw new AppException("没有发现该客户");
        }

        // ->添加流水
        json.put("hi_code", contractOrderVo.getHi_code());
        json.put("bco_code", contractOrderVo.getBco_code());
        json.put("type", contractOrderVo.getBco_orderType());
        json.put("balPay", contractOrderVo.getBco_currentBalPay() + 1);
        json.put("cc_code", customer.getCc_code());
        json.put("cc_name", customer.getCc_name());
        Msg<Object> msg = this.addPayFlowStatementBo(json);

        JSONObject map = msg.getJson();
        // 商户号
        String trade_code = (String) map.get("trade_code");
        // 商品标题
        String title = (String) map.get("title");
        // 商品描述
        String subtitle = (String) map.get("subtitle");

        // 【生成支付二维码】
        msg.put("payWay", payWay);
        if ("支付宝".equals(payWay)) {
            Msg<Object> alipayTradePrecreate = AliPay.alipayTradePrecreate(trade_code, String.valueOf(payMoney), title, subtitle, AliPay.notify_url);
            if (alipayTradePrecreate.getCode() != 200) {
                throw new AppException(alipayTradePrecreate.getMsg());
            }
            msg.put(alipayTradePrecreate.getJson());
        }
        if ("微信".equals(payWay)) {
            Msg<Object> weixinTradePrecreateScanCode = WeixinPay.weixinTradePrecreateScanCode(trade_code, title, subtitle, String.valueOf(payMoney), user_ip);
            if (weixinTradePrecreateScanCode.getCode() != 200) {
                throw new AppException(weixinTradePrecreateScanCode.getMsg());
            }
            msg.put(weixinTradePrecreateScanCode.getJson());
        }

        return msg;
    }

    /**
     * 查询订单列表
     *
     * @param contractOrderVo
     * @return
     */
    public List<ContractOrderVo> queryFinanceOrderList(ContractOrderVo contractOrderVo) {
        return financeManageDao.queryFinanceOrderList(contractOrderVo);
    }

    /**
     * 更新流水关系表
     *
     * @param statementBillRelationVo
     * @return
     */
    public boolean updateStatementBillRelation(FinanceStatementBillRelationVo statementBillRelationVo) {
        return financeManageDao.updateStatementBillRelation(statementBillRelationVo) > 0;
    }

    /**
     * 关闭订单、账单、流水
     *
     * @param bco_code 订单号
     * @return
     */
    public boolean closeOrderBillStatement(String bco_code) {
        if (bco_code == null) {
            return false;
        }

        // 查询订单
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setBco_code(bco_code);
        contractOrderVo = this.queryFinanceOrder(contractOrderVo);
        if (contractOrderVo == null) {
            return false;
        }
        if (contractOrderVo.getBco_optionState() == AppConfig.order_option_state_3) {
            return false;
        }
        if (contractOrderVo.getBco_optionState() == AppConfig.order_option_state_4) {
            return false;
        }

        // 关闭订单
        ContractOrderVo contractOrderVo1 = new ContractOrderVo();
        contractOrderVo1.setBco_code(contractOrderVo.getBco_code());
        contractOrderVo1.setBco_state(AppConfig.ORDER_STATE_2);
        contractOrderVo1.setBco_optionState(AppConfig.order_option_state_4);
        this.updateFinanceOrder(contractOrderVo1);

        // 关闭账单
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBco_code(contractOrderVo.getBco_code());
        List<ContractBillVo> financeBillList = this.queryFinanceBillList(contractBillVo);
        for (ContractBillVo contractBillVo1: financeBillList) {
            ContractBillVo contractBillVo2 = new ContractBillVo();
            contractBillVo2.setBcb_code(contractBillVo1.getBcb_code());
            contractBillVo2.setBcb_state(AppConfig.order_option_state_4);
            this.updateFinanceBill(contractBillVo2);
        }

        // 关闭流水
        FinancePayFlowStatementVo financePayFlowStatementVo = new FinancePayFlowStatementVo();
        financePayFlowStatementVo.setHi_code(contractOrderVo.getHi_code());
        financePayFlowStatementVo.setBs_payerCode(contractOrderVo.getBco_customer());
        financePayFlowStatementVo.setBs_type(AppConfig.order_type_4);
        financePayFlowStatementVo.setBs_state(AppConfig.bs_state_1);
        List<FinancePayFlowStatementVo> payFlowStatementList = this.queryPayFlowStatementPayerList(financePayFlowStatementVo);
        for (FinancePayFlowStatementVo financePayFlowStatementVo2: payFlowStatementList) {
            FinancePayFlowStatementVo financePayFlowStatementVo3 = new FinancePayFlowStatementVo();
            financePayFlowStatementVo3.setBs_serialNumber(financePayFlowStatementVo2.getBs_serialNumber());
            financePayFlowStatementVo3.setBs_flowState(AppConfig.bs_flowState_3);
            financePayFlowStatementVo3.setBs_state_where(AppConfig.bs_state_1);
            this.updatePayFlowStatement(financePayFlowStatementVo3);
        }
        return true;
    }

    /**
     * 查询付款方支付流水列表数据
     *
     * @param financePayFlowStatementVo
     * @return
     */
    private List<FinancePayFlowStatementVo> queryPayFlowStatementPayerList(FinancePayFlowStatementVo financePayFlowStatementVo) {
        return financeManageDao.queryPayFlowStatementPayerList(financePayFlowStatementVo);
    }

    /**
     * 添加支付流水
     *
     * @param payFlowStatementVo
     * @return
     * @author JiangQt
     * @version 2017年6月8日上午10:05:04
     */
    public boolean addPayFlowStatement(FinancePayFlowStatementVo payFlowStatementVo) {
        return financeManageDao.addPayFlowStatement(payFlowStatementVo) > 0;
    }

    /**
     * 添加账单流水关联数据
     *
     * @param statementBillRelationVo
     * @return
     * @author JiangQt
     * @version 2017年6月7日下午5:47:08
     */
    public boolean addStatementBillRelation(FinanceStatementBillRelationVo statementBillRelationVo) {
        return financeManageDao.addStatementBillRelation(statementBillRelationVo) > 0;
    }

    /**
     * 查询流水账单关联数据
     *
     * @param statementBillRelationVo
     * @return
     * @author JiangQt
     * @version 2017年6月7日下午3:49:36
     */
    public List<FinanceStatementBillRelationVo> queryStatementBillRelationList(FinanceStatementBillRelationVo statementBillRelationVo) {
        return financeManageDao.queryStatementBillRelationList(statementBillRelationVo);
    }

    /**
     * 更新支付流水
     *
     * @param flowStatementVo
     * @return
     * @author JiangQt
     * @version 2017年6月7日下午2:11:11
     */
    public boolean updatePayFlowStatement(FinancePayFlowStatementVo flowStatementVo) {
        return financeManageDao.updatePayFlowStatement(flowStatementVo) > 0;
    }

    /**
     * 查询支付流水
     *
     * @param flowStatementVo
     * @return
     * @author JiangQt
     * @version 2017年6月7日下午2:03:13
     */
    public FinancePayFlowStatementVo queryPayFlowStatement(FinancePayFlowStatementVo flowStatementVo) {
        return financeManageDao.queryPayFlowStatement(flowStatementVo);
    }

    /**
     * 查询流水
     *
     * @param statementVo
     * @return
     * @author JiangQt
     * @version 2017年6月6日上午10:18:27
     */
    public BillStatementVo queryBillStatement(BillStatementVo statementVo) {
        return financeManageDao.queryBillStatement(statementVo);
    }

    /***
     * 更新流水
     *
     * @param billStatementVo
     * @return
     * @author JiangQt
     * @version 2017年6月6日上午9:59:01
     */
    public boolean updateBusinessStatementPay(BillStatementVo billStatementVo) {
        return financeManageDao.updateBusinessStatementPay(billStatementVo) > 0;
    }

    /**
     * 更新合同账单订单状态
     *
     * @param bco_code
     */
    public void updateFinanceOrderBillData(String bco_code) {
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setBco_code(bco_code);
        financeManageDao.updateFinanceOrderBillData(contractOrderVo);
    }

    /**
     * 添加流水关系表
     *
     * @param statementFiliation
     * @return
     * @作者 JiangQT
     * @日期 2016年12月17日
     */
    public boolean addStatementFiliation(BillStatementFiliation statementFiliation) {
        return financeManageDao.addStatementFiliation(statementFiliation) > 0;
    }

    /**
     * 查询合同账单
     *
     * @param contractBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月11日
     */
    public ContractBillVo queryFinanceBill(ContractBillVo contractBillVo) {
        return financeManageDao.queryFinanceBill(contractBillVo);
    }

    public ContractBillVo queryFinanceBill(String bcb_code) {
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBcb_code(bcb_code);
        return financeManageDao.queryFinanceBill(contractBillVo);
    }

    /**
     * 查询合同账单
     *
     * @param bcb_id
     * @return
     * @作者 JiangQT
     * @日期 2016年12月11日
     */
    public ContractBillVo queryFinanceBill(Integer bcb_id) {
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBcb_id(bcb_id);
        return financeManageDao.queryFinanceBill(contractBillVo);
    }

    /**
     * 查询合同账单第一项
     *
     * @param contractBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月11日
     */
    public ContractBillVo queryContractBillFirstOne(ContractBillVo contractBillVo) {
        return financeManageDao.queryContractBillFirstOne(contractBillVo);
    }

    /**
     * 查询流水关系表数据
     *
     * @param statementFiliation
     * @return
     * @作者 JiangQT
     * @日期 2016年12月17日
     */
    public List<BillStatementFiliation> queryStatementFiliationList(BillStatementFiliation statementFiliation) {
        return financeManageDao.queryStatementFiliationList(statementFiliation);
    }

    /**
     * 撤销未收款账单
     *
     * @param budgetBillVo
     * @param employee
     * @return
     * @作者 JiangQT
     * @日期 2016年11月24日
     */
    public void updateRevokeBalanceBill(Integer type, BudgetBillVo budgetBillVo, UserCenterEmployee employee) {

    }

    /**
     * 更新预算订单
     *
     * @param budgetOrderVo
     * @return
     * @作者 JiangQT
     * @日期 2016年11月24日
     */
    public boolean updateBudgetOrder(BudgetOrderVo budgetOrderVo) {
        return financeManageDao.updateBudgetOrder(budgetOrderVo) > 0;
    }

    /**
     * 更新租赁合同账单撤销数据
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年12月5日
     */
    public boolean updateContractBillForRevoke(ContractBillVo contractBillVo) {
        return financeManageDao.updateContractBillForRevoke(contractBillVo) > 0;
    }

    /**
     * 添加预算订单
     *
     * @param budgetOrderVo
     * @return
     * @作者 JiangQT
     * @日期 2016年11月24日
     */
    public boolean addBudgetOrder(BudgetOrderVo budgetOrderVo) {
        return financeManageDao.addBudgetOrder(budgetOrderVo) > 0;
    }

    /**
     * 查询预算账单详情
     *
     * @param budgetBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年11月30日
     */
    public BudgetBillVo queryBudgetBill(BudgetBillVo budgetBillVo) {
        return financeManageDao.queryBudgetBill(budgetBillVo);
    }

    /**
     * 查询预算账单详情
     *
     * @param bbb_id
     * @return
     * @作者 JiangQT
     * @日期 2016年11月30日
     */
    public BudgetBillVo queryBudgetBill(Integer bbb_id) {
        BudgetBillVo budgetBillVo = new BudgetBillVo();
        budgetBillVo.setBbb_id(bbb_id);
        return financeManageDao.queryBudgetBill(budgetBillVo);
    }

    /**
     * 查询预算账单列表
     *
     * @param budgetBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月1日
     */
    public List<BudgetBillVo> queryBudgetBillList(BudgetBillVo budgetBillVo) {
        return financeManageDao.queryBudgetBillList(budgetBillVo);
    }

    /**
     * 查询预算订单
     *
     * @param budgetOrderVo
     * @return
     * @作者 JiangQT
     * @日期 2016年11月29日
     */
    public BudgetOrderVo queryBudgetOrder(BudgetOrderVo budgetOrderVo) {
        return financeManageDao.queryBudgetOrder(budgetOrderVo);
    }

    /**
     * 查询预算订单
     *
     * @param bbo_id
     * @return
     * @作者 JiangQT
     * @日期 2016年11月29日
     */
    public BudgetOrderVo queryBudgetOrder(Integer bbo_id) {
        BudgetOrderVo budgetOrderVo = new BudgetOrderVo();
        budgetOrderVo.setBbo_id(bbo_id);
        return financeManageDao.queryBudgetOrder(budgetOrderVo);
    }

    /**
     * 更新结算账单
     *
     * @作者 JiangQT
     * @日期 2016年11月27日
     */
    public boolean updateBudgetBill(BudgetBillVo budgetBillVo) {
        return financeManageDao.updateBudgetBill(budgetBillVo) > 0;
    }

    /**
     * 添加账单预算清单
     *
     * @param budgetVo
     * @return
     * @作者 JiangQT
     * @日期 2016年10月30日
     */
    public boolean addBudgetBill(BudgetBillVo budgetVo) {
        return financeManageDao.addBudgetBill(budgetVo) > 0;
    }

    /**
     * 查询预算订单分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年11月2日
     */
    public Pagination<BudgetOrderVo> queryBudgetOrderPageList(Pagination<BudgetOrderVo> pagination) {
        return financeManageDao.queryBudgetOrderPageList(pagination);
    }

    /**
     * 查询预算订单分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年11月2日
     */
    public Pagination<BudgetBillVo> queryBudgetBillPageList(Pagination<BudgetBillVo> pagination) {
        return financeManageDao.queryBudgetBillPageList(pagination);
    }

    /**
     * 添加支付流水
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年11月4日
     */
    public boolean addBillStatement(BillStatementVo statementVo) {
        return financeManageDao.addBillStatement(statementVo) > 0;
    }

    /**
     * 查询收入预算账单列表
     *
     * @param budgetBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年11月25日
     */
    public List<BudgetBillVo> queryBudgetBillMoreList(BudgetBillVo budgetBillVo) {
        return financeManageDao.queryBudgetBillMoreList(budgetBillVo);
    }

    /**
     * 查询账单类型对象列表
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年11月30日
     */
    public List<BillTypeVo> queryBillTypeList(BillTypeVo billTypeVo) {
        return financeManageDao.queryBillTypeList(billTypeVo);
    }

    /**
     * 添加账单
     *
     * @param id          编码
     * @param payCycleNum 期数
     * @param type        类型
     * @param money       金额
     * @param remarks     备注
     * @param types       房东还是租客
     * @return
     * @throws ParseException
     * @author 陈智颖
     */
    public Map<String, Object> updateSubmitBill(Integer id, String code, Integer payCycleNum, String type, Double money, String remarks, String date, String types) throws ParseException {
        Map<String, Object> map = new HashMap<>();
        int bools;
        // int bt_code = 0;

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        ContractBillVo contractBillVo1 = new ContractBillVo();
        if (id != null) {
            if (types.equals("托管订单")) {
                if (money > 0) {
                    contractBillVo1.setBcb_balPay(1);
                } else {
                    contractBillVo1.setBcb_balPay(0);
                }
            } else {
                if (money < 0) {
                    contractBillVo1.setBcb_balPay(1);
                } else {
                    contractBillVo1.setBcb_balPay(0);
                }
            }
            if (money < 0) {
                money = -money;
            }
            contractBillVo1.setBcb_repayment(new BigDecimal(money));
            contractBillVo1.setBcb_remarks(remarks);
            contractBillVo1.setBcb_id(id);
            contractBillVo1.setBcb_repaymentDate(sdf.parse(date));

            // 如果应付金额等于实付金额修改账单状态
            ContractBillVo contractBillVo = new ContractBillVo();
            contractBillVo.setBcb_id(id);
            ContractBillVo queryContractBill = financeManageDao.queryFinanceBill(contractBillVo);
            if (queryContractBill.getBcb_realPayment() != null && Objects.equals(queryContractBill.getBcb_repayment(), queryContractBill.getBcb_realPayment())) {
                contractBillVo1.setBcb_state(3);
                contractBillVo1.setBcb_balance(new BigDecimal(0));
            }
            bools = financeManageDao.updateFinanceBill(contractBillVo1);

            ContractBillVo contractBillVo2 = new ContractBillVo();
            contractBillVo2.setBco_code(code);
            List<ContractBillVo> queryContractBillList = financeManageDao.queryFinanceBillList(contractBillVo2);
            boolean boolst = true;
            for (ContractBillVo contractBillVo3: queryContractBillList) {
                if (contractBillVo3.getBcb_state() != 3) {
                    boolst = false;
                    break;
                }
            }
            if (boolst) {
                ContractOrderVo contractOrderVo = new ContractOrderVo();
                contractOrderVo.setBco_code(code);
                contractOrderVo.setBco_optionState(3);
                financeManageDao.updateFinanceOrder(contractOrderVo);
            }
        } else {
            contractBillVo1.setBcb_code(AppUtil.getOrderCode("210"));
            contractBillVo1.setBco_code(code);
            contractBillVo1.setBcb_id(id);
            contractBillVo1.setBcb_cycle(payCycleNum);
            contractBillVo1.setBcb_repaymentDate(sdf.parse(date));
            // 根据类型名查询ID
            BillTypeVo billTypeVo = new BillTypeVo();
            billTypeVo.setBt_name(type);
            billTypeVo = financeManageDao.queryBillTypeList(billTypeVo).get(0);
            contractBillVo1.setBcb_remarks(remarks);
            contractBillVo1.setBcb_type(billTypeVo.getBt_code());
            contractBillVo1.setBcb_state(2);
            contractBillVo1.setBco_code(code);
            if (types.equals("托管订单")) {
                if (money > 0) {
                    contractBillVo1.setBcb_balPay(1);
                } else {
                    contractBillVo1.setBcb_balPay(0);
                }
            } else {
                if (money < 0) {
                    contractBillVo1.setBcb_balPay(1);
                } else {
                    contractBillVo1.setBcb_balPay(0);
                }
            }
            if (money < 0) {
                money = -money;
            }
            contractBillVo1.setBcb_repayment(new BigDecimal(money));
            contractBillVo1.setBcb_createTime(new Date());
            bools = financeManageDao.addContractBill(contractBillVo1);
        }

        if (bools > 0) {
            // BudgetBillVo budgetBillVo = new BudgetBillVo();
            // budgetBillVo.setBill_code(code);
            // budgetBillVo.setBill_cycle(bt_code);
            // List<BudgetBillVo> queryBudgetBillList =
            // financeManageDao.queryBudgetBillList(budgetBillVo);
            // if(!queryBudgetBillList.isEmpty()){
            //
            // }
            // implementRecordVo
            map.put("message", "success");
            map.put("id", contractBillVo1.getBcb_id());

            // 更新订单账单
            this.updateFinanceOrderBillData(code);
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 查询合同订单信息
     *
     * @param bco_code
     * @return
     * @作者 JiangQT
     * @日期 2016年12月8日
     */
    public ContractOrderVo queryFinanceOrder(String bco_code) {
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setBco_code(bco_code);
        return financeManageDao.queryFinanceOrder(contractOrderVo);
    }

    /**
     * 查询合同订单信息
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年12月8日
     */
    public ContractOrderVo queryFinanceOrder(ContractOrderVo contractOrderVo) {
        return financeManageDao.queryFinanceOrder(contractOrderVo);
    }

    /**
     * 查询合同账单列表数据
     *
     * @param contractBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月8日
     */
    public List<ContractBillVo> queryFinanceBillList(ContractBillVo contractBillVo) {
        return financeManageDao.queryFinanceBillList(contractBillVo);
    }

    /**
     * 查询合同账单列表数据
     *
     * @param bco_code
     * @return
     * @作者 JiangQT
     * @日期 2016年12月8日
     */
    public List<ContractBillVo> queryFinanceBillList(String bco_code) {
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBco_code(bco_code);
        return financeManageDao.queryFinanceBillList(contractBillVo);
    }

    /**
     * 查询账单列表综合数据
     *
     * @param contractBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月8日
     */
    public List<ContractBillVo> queryContractBillListByTotal(ContractBillVo contractBillVo) {
        return financeManageDao.queryContractBillListByTotal(contractBillVo);
    }

    /**
     * 更新合同订单数据
     *
     * @param contractOrderVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月9日
     */
    public boolean updateFinanceOrder(ContractOrderVo contractOrderVo) {
        return financeManageDao.updateFinanceOrder(contractOrderVo) > 0;
    }

    /**
     * 更新合同账单数据
     *
     * @param contractBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月9日
     */
    public boolean updateFinanceBill(ContractBillVo contractBillVo) {
        return financeManageDao.updateFinanceBill(contractBillVo) > 0;
    }

    /**
     * 删除合同订单
     *
     * @param bco_code
     * @return
     * @作者 JiangQT
     * @日期 2016年12月9日
     */
    public boolean deleteFinanceOrder(String bco_code) {
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setBco_code(bco_code);
        return financeManageDao.deleteFinanceOrder(contractOrderVo) > 0;
    }

    /**
     * 删除账单
     *
     * @param id 账单编码
     * @return
     * @author 陈智颖
     */
    public Map<String, Object> deleteBill(Integer id) {
        Map<String, Object> map = new HashMap<>();
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBcb_id(id);
        int bool = financeManageDao.deleteContractBill(contractBillVo);
        if (bool > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 删除合同账单
     *
     * @param bcb_id
     * @return
     * @作者 JiangQT
     * @日期 2016年12月9日
     */
    public boolean deleteFinanceBill(Integer bcb_id) {
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBcb_id(bcb_id);
        return financeManageDao.deleteContractBill(contractBillVo) > 0;
    }

    /**
     * 删除合同账单
     *
     * @param bco_code
     * @return
     * @作者 JiangQT
     * @日期 2016年12月9日
     */
    public boolean deleteFinanceBill(String bco_code) {
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBco_code(bco_code);
        return financeManageDao.deleteContractBill(contractBillVo) > 0;
    }

    /**
     * 删除预算清单数据
     *
     * @param budgetVo
     * @return
     * @作者 JiangQT
     * @日期 2016年11月14日
     */
    public boolean deleteBudgetBill(BudgetBillVo budgetVo) {
        return financeManageDao.deleteBudgetBill(budgetVo) > 0;
    }

    /**
     * 删除预算清单数据
     *
     * @param bbb_id
     * @return
     * @作者 JiangQT
     * @日期 2016年11月14日
     */
    public boolean deleteBudgetBill(Integer bbb_id) {
        BudgetBillVo budgetVo = new BudgetBillVo();
        budgetVo.setBbb_id(bbb_id);
        return financeManageDao.deleteBudgetBill(budgetVo) > 0;
    }

    /**
     * 删除流水关系表数据
     *
     * @param sf_id
     * @return
     * @作者 JiangQT
     * @日期 2016年12月17日
     */
    public boolean delectStatementFiliation(Integer sf_id) {
        BillStatementFiliation statementFiliation = new BillStatementFiliation();
        statementFiliation.setSf_id(sf_id);
        return financeManageDao.delectStatementFiliation(statementFiliation) > 0;
    }

    /**
     * 删除账单流水1
     *
     * @param statementVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月5日
     */
    public boolean deleteBillStatement(BillStatementVo statementVo) {
        return financeManageDao.deleteBillStatement(statementVo) > 0;
    }

    /**
     * 删除账单流水2
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年12月5日
     */
    public boolean deleteBillStatement(String bs_statementNum) {
        BillStatementVo statementVo = new BillStatementVo();
        statementVo.setBs_statementNum(bs_statementNum);
        return financeManageDao.deleteBillStatement(statementVo) > 0;
    }

    /**
     * 删除关联账单
     *
     * @param rb_id
     * @return
     * @作者 JiangQT
     * @日期 2016年12月26日
     */
    public boolean deleteRelatedBill(Integer rb_id) {
        BillRelatedBillVo relatedBillVo = new BillRelatedBillVo();
        relatedBillVo.setRb_id(rb_id);
        return financeManageDao.deleteRelatedBill(relatedBillVo) > 0;
    }

    /**
     * 添加合同订单
     *
     * @param contractOrderVo
     * @作者 JiangQT
     * @日期 2016年12月9日
     */
    public boolean addContractOrder(ContractOrderVo contractOrderVo) {
        return financeManageDao.addContractOrder(contractOrderVo) > 0;
    }

    /**
     * 查询合同订单分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年12月12日
     */
    public Pagination<ContractBillVo> queryContractBillPageList(Pagination<?> pagination) {
        return financeManageDao.queryContractBillPageList(pagination);
    }

    /**
     * 查询合同订单分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年12月12日
     */
    public Pagination<FinanceOrderPageListBo> queryFinanceOrderPageList(Pagination<?> pagination) {
        return financeManageDao.queryFinanceOrderPageList(pagination);
    }

    /**
     * 【关联账单】添加关联账单
     *
     * @param employee
     * @return
     * @作者 JiangQT
     * @日期 2016年12月21日
     */
    public String addRelatedBillService(Map<String, Object> data, UserCenterEmployee employee) {
        Msg<Object> msg = new Msg<>();
        BillRelatedOrderVo relatedOrderVo = JSONObject.parseObject((String) data.get("relatedOrder"), BillRelatedOrderVo.class);
        List<BillRelatedBillVo> relatedBillVos = JSONArray.parseArray((String) data.get("relatedBills"), BillRelatedBillVo.class);

        boolean boo;

        // 添加、更新关联订单数据
        if (StringUtils.isEmpty(relatedOrderVo.getRo_id())) {
            relatedOrderVo.setRo_code(AppUtil.getOrderCode("203"));
            relatedOrderVo.setRo_payState(1); // 未付款
            relatedOrderVo.setRo_state(AppConfig.BILL_RELATED_STATE_1);
            relatedOrderVo.setRo_creator(employee.getEm_id());
            relatedOrderVo.setRo_createTime(new Date());
            boo = this.addRelatedOrder(relatedOrderVo);
        } else {
            relatedOrderVo.setRo_state(AppConfig.BILL_RELATED_STATE_1);
            boo = this.updateRelatedOrder(relatedOrderVo);
        }
        if (!boo) {
            return msg.toError("数据添加失败,请重试或联系管理员");
        }

        // 添加、更新关联账单数据
        for (BillRelatedBillVo relatedBillVo: relatedBillVos) {
            // 房东
            if (relatedOrderVo.getRo_customerType() == 201) {
                relatedBillVo.setRb_balPay(relatedBillVo.getRb_paymentMoney().doubleValue() < 0 ? 0 : 1);
            }
            // 租客
            if (relatedOrderVo.getRo_customerType() == 202) {
                relatedBillVo.setRb_balPay(relatedBillVo.getRb_paymentMoney().doubleValue() < 0 ? 1 : 0);
            }
            relatedBillVo.setRb_paymentMoney(relatedBillVo.getRb_paymentMoney().abs());
            if (StringUtils.isEmpty(relatedBillVo.getRb_id())) {
                relatedBillVo.setRb_code(AppUtil.getOrderCode("211"));
                relatedBillVo.setRo_code(relatedOrderVo.getRo_code());
                relatedBillVo.setRb_state(AppConfig.BILL_RELATED_STATE_1);
                relatedBillVo.setRb_creator(employee.getEm_id());
                relatedBillVo.setRb_createTime(new Date());
                boo = this.addRelatedBill(relatedBillVo);
            } else {
                boo = this.updateRelatedBill(relatedBillVo);
            }
            if (!boo) {
                try {
                    throw new Exception();
                } catch (Exception e) {
                    e.printStackTrace();
                    return msg.toError("数据添加失败，请重试或联系管理员");
                }
            }
        }
        BillRelatedOrderVo relatedOrderVo2 = new BillRelatedOrderVo();
        relatedOrderVo2.setRo_id(relatedOrderVo.getRo_id());
        relatedOrderVo2 = financeManageDao.queryRelatedOrder(relatedOrderVo2);
        return msg.toString(relatedOrderVo2);
    }

    /**
     * 【关联账单】添加关联账单
     *
     * @param pay_way
     * @param pay_acount
     * @param employee
     * @return
     * @作者 JiangQT
     * @日期 2016年12月21日
     */
    public String updateRelatedBillService(String ro_code, String pay_mode, String pay_way, String pay_acount, UserCenterEmployee employee) {
        Msg<Object> msg = new Msg<>();
        // 查询关联订单
        BillRelatedOrderVo relatedOrderVo = new BillRelatedOrderVo();
        relatedOrderVo.setRo_code(ro_code);
        relatedOrderVo = financeManageDao.queryRelatedOrder(relatedOrderVo);
        if (relatedOrderVo == null) {
            return msg.toError("没有发现该相关订单");
        }
        // 查询关联账单
        BillRelatedBillVo relatedBillVo = new BillRelatedBillVo();
        relatedBillVo.setRo_code(ro_code);
        List<BillRelatedBillVo> relatedBillList = this.queryRelatedBillList(relatedBillVo);
        if (relatedBillList.isEmpty()) {
            return msg.toError("没有发现该相关订单");
        }
        if ("offline".equals(pay_mode)) {
            for (BillRelatedBillVo relatedBillVo2: relatedBillList) {
                // 关联流水关系
                String statementCode = AppUtil.getOrderCode("220");
                BillStatementFiliation statementFiliation = new BillStatementFiliation();
                statementFiliation.setSf_type("支付");
                statementFiliation.setSf_num(relatedBillVo2.getRb_code());
                statementFiliation.setSf_statement(statementCode);
                statementFiliation.setSf_date(new Date());
                this.addStatementFiliation(statementFiliation);

                // 更新关联账单
                BillRelatedBillVo relatedBillVo3 = new BillRelatedBillVo();
                relatedBillVo3.setRb_id(relatedBillVo2.getRb_id());
                relatedBillVo3.setRb_payWay(pay_way);
                this.updateRelatedBill(relatedBillVo3);
            }

            // 更新关联订单
            BillRelatedOrderVo relatedOrderVo2 = new BillRelatedOrderVo();
            relatedOrderVo2.setRo_id(relatedOrderVo.getRo_id());
            relatedOrderVo2.setRo_payState(2);
            this.updateRelatedOrder(relatedOrderVo2);
        }
        if ("online".equals(pay_mode)) {
            System.out.println("");
        }
        return msg.toString(relatedOrderVo);
    }

    /**
     * 更新关联订单
     *
     * @param relatedOrderVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月23日
     */
    public boolean updateRelatedOrder(BillRelatedOrderVo relatedOrderVo) {
        return financeManageDao.updateRelatedOrder(relatedOrderVo) > 0;
    }

    /**
     * 添加关联订单
     *
     * @param relatedOrderVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月23日
     */
    public boolean addRelatedOrder(BillRelatedOrderVo relatedOrderVo) {
        return financeManageDao.addRelatedOrder(relatedOrderVo) > 0;
    }

    /**
     * 更新关联账单
     *
     * @param relatedBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月21日
     */
    public boolean updateRelatedBill(BillRelatedBillVo relatedBillVo) {
        return financeManageDao.updateRelatedBill(relatedBillVo) > 0;
    }

    /**
     * 添加关联账单
     *
     * @param relatedBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月21日
     */
    public boolean addRelatedBill(BillRelatedBillVo relatedBillVo) {
        return financeManageDao.addRelatedBill(relatedBillVo) > 0;
    }

    /**
     * 查询关联账单分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年12月21日
     */
    public Pagination<BillRelatedBillVo> queryRelatedBillPageList(Pagination<BillRelatedBillVo> pagination) {
        return financeManageDao.queryRelatedBillPageList(pagination);
    }

    /**
     * 查询关联订单分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2016年12月22日
     */
    public Pagination<BillRelatedOrderVo> queryRelatedOrderPageList(Pagination<BillRelatedOrderVo> pagination) {
        return financeManageDao.queryRelatedOrderPageList(pagination);
    }

    /**
     * 查询我的收款情况分页
     *
     * @return
     * @作者 陈智颖
     * @日期 2016年12月22日
     */
    public List<BillRelatedOrderVo> queryMyselfRelatedOrderPageList(BillRelatedOrderVo billRelatedOrderVo) {
        return financeManageDao.queryMyselfRelatedOrderPageList(billRelatedOrderVo);
    }

    /**
     * 查询关联账单
     *
     * @param relatedBillVo
     * @return
     * @作者 JiangQT
     * @日期 2016年12月26日
     */
    public List<BillRelatedBillVo> queryRelatedBillList(BillRelatedBillVo relatedBillVo) {
        return financeManageDao.queryRelatedBillList(relatedBillVo);
    }

    /**
     * 添加合同账单
     *
     * @param contractBillVo
     * @return
     * @作者 JiangQT
     * @日期 2017年1月6日
     */
    public boolean addContractBill(ContractBillVo contractBillVo) {
        return financeManageDao.addContractBill(contractBillVo) > 0;
    }

    /**
     * 【业务操作】关联订单关联合同订单
     *
     * @param bco_code
     * @param bcb_cycle
     * @param employee
     * @return
     * @作者 JiangQT
     * @日期 2017年1月10日
     */
    public String addUpdateRelatedOrder(Integer ro_id, String bco_code, Integer bcb_cycle, UserCenterEmployee employee) {
        Msg<Object> msg = new Msg<>();

        // 查询合同订单
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setBco_code(bco_code);
        contractOrderVo = financeManageDao.queryFinanceOrder(contractOrderVo);
        if (contractOrderVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        // 查询关联订单
        BillRelatedOrderVo relatedOrderVo = new BillRelatedOrderVo();
        relatedOrderVo.setRo_id(ro_id);
        relatedOrderVo = financeManageDao.queryRelatedOrder(relatedOrderVo);
        if (relatedOrderVo == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        if (!contractOrderVo.getBco_type().equals(relatedOrderVo.getRo_customerType())) {
            return msg.toError("关联订单与被关联订单客户类型不匹配");
        }
        // 查询合同账单
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBco_code(bco_code);
        contractBillVo.setBcb_cycle(bcb_cycle);
        List<ContractBillVo> contractBillList = financeManageDao.queryFinanceBillList(contractBillVo);

        // 查询关联账单
        BillRelatedBillVo relatedBillVo = new BillRelatedBillVo();
        relatedBillVo.setRo_code(relatedOrderVo.getRo_code());
        List<BillRelatedBillVo> relatedBillList = financeManageDao.queryRelatedBillList(relatedBillVo);

        // 更新合同账单
        for (BillRelatedBillVo relatedBillVo1: relatedBillList) {
            ContractBillVo contractBillVoBoo = null;
            for (ContractBillVo contractBillVo1: contractBillList) {
                if (Objects.equals(relatedBillVo1.getRb_type(), contractBillVo1.getBcb_type())) {
                    contractBillVoBoo = contractBillVo1;
                    break;
                }
            }
            ContractBillVo contractBillVo2 = new ContractBillVo();
            if (contractBillVoBoo != null) {
                contractBillVo2.setBcb_id(contractBillVoBoo.getBcb_id());
                contractBillVo2.setBcb_realPayment(relatedBillVo1.getRb_paymentMoney());
                contractBillVo2.setBcb_state(AppConfig.order_option_state_3);
                contractBillVo2.setBcb_realPaymentDate(relatedBillVo1.getRb_paymentDate());
                contractBillVo2.setBcb_payWay(null);
                contractBillVo2.setBcb_operater(employee.getEm_id());
                contractBillVo2.setBcb_remarks(contractBillVoBoo.getBcb_remarks() + relatedBillVo1.getRb_remarks());
                this.updateFinanceBill(contractBillVo2);

                contractBillVo2.setBcb_code(contractBillVoBoo.getBcb_code());

                // 添加账单流水绑定合同账单
                BillStatementFiliation statementFiliation = new BillStatementFiliation();
                statementFiliation.setSf_num(relatedBillVo1.getRb_code());
                List<BillStatementFiliation> statementFiliationList = this.queryStatementFiliationList(statementFiliation);
                for (BillStatementFiliation statementFiliation1: statementFiliationList) {
                    // 关联流水关系
                    statementFiliation = new BillStatementFiliation();
                    statementFiliation.setSf_type("支付");
                    statementFiliation.setSf_num(contractBillVo2.getBcb_code());
                    statementFiliation.setSf_statement(statementFiliation1.getSf_statement());
                    statementFiliation.setSf_date(new Date());
                    this.addStatementFiliation(statementFiliation);
                }

            } else {
                contractBillVo2.setBcb_code(AppUtil.getOrderCode("210"));
                contractBillVo2.setBco_code(contractOrderVo.getBco_code());
                contractBillVo2.setBcb_cycle(bcb_cycle);
                contractBillVo2.setBcb_type(relatedBillVo1.getRb_type());
                contractBillVo2.setBcb_balPay(relatedBillVo1.getRb_balPay());
                contractBillVo2.setBcb_repayment(relatedBillVo1.getRb_paymentMoney());
                contractBillVo2.setBcb_realPayment(relatedBillVo1.getRb_paymentMoney());
                contractBillVo2.setBcb_state(AppConfig.order_option_state_3);
                contractBillVo2.setBcb_repaymentDate(relatedBillVo1.getRb_paymentDate());
                contractBillVo2.setBcb_realPaymentDate(relatedBillVo1.getRb_paymentDate());
                contractBillVo2.setBcb_payWay(null);
                contractBillVo2.setBcb_remarks(relatedBillVo1.getRb_remarks());
                contractBillVo2.setBcb_creator(employee.getEm_id());
                contractBillVo2.setBcb_operater(employee.getEm_id());
                contractBillVo2.setBcb_createTime(relatedBillVo1.getRb_createTime());
                this.addContractBill(contractBillVo2);

                // 关联流水关系
                String statementCode = AppUtil.getOrderCode("220");
                BillStatementFiliation statementFiliation = new BillStatementFiliation();
                statementFiliation.setSf_type("支付");
                statementFiliation.setSf_num(contractBillVo2.getBcb_code());
                statementFiliation.setSf_statement(statementCode);
                statementFiliation.setSf_date(new Date());
                this.addStatementFiliation(statementFiliation);
            }

        }

        // 更新关联订单
        relatedOrderVo = new BillRelatedOrderVo();
        relatedOrderVo.setRo_id(ro_id);
        relatedOrderVo.setBco_code(bco_code);
        relatedOrderVo.setRo_state(2);
        financeManageDao.updateRelatedOrder(relatedOrderVo);
        return msg.toString();
    }

    /**
     * 查询最新待交费的合同账单
     *
     * @param contractBillVo
     * @return
     * @作者 JiangQT
     * @日期 2017年2月14日
     */
    public ContractBillVo queryContractBillForCurrentCycle(ContractBillVo contractBillVo) {
        return financeManageDao.queryContractBillForCurrentCycle(contractBillVo);
    }

    /**
     * 打印
     *
     * @param contractPrintLogs
     * @return
     * @author 陈智颖
     * @date Feb 24, 2017 11:26:52 AM
     */
    public int addContractPrintLogs(ContractPrintLogs contractPrintLogs) {
        return financeManageDao.addContractPrintLogs(contractPrintLogs);
    }

    /**
     * 根据房屋hi_code 更新把未支付的关联订单失效
     *
     * @param relatedOrderVo
     * @return
     */
    public int updateRelatedOrderState(BillRelatedOrderVo relatedOrderVo) {
        return financeManageDao.updateRelatedOrderState(relatedOrderVo);
    }

    /**
     * 查询定金列表
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2017年4月14日
     */
    public Pagination<BillRelatedBillVo> queryDepositOrderPageList(Pagination<BillRelatedBillVo> pagination) {
        return financeManageDao.queryDepositOrderPageList(pagination);
    }

    /**
     * 更新合同订单状态
     *
     * @param contractOrderVo
     * @return
     */
    public boolean updateContractOrderForState(ContractOrderVo contractOrderVo) {
        return financeManageDao.updateContractOrderForState(contractOrderVo) > 0;
    }

    /**
     * 定金分页查询数据
     *
     * @author tanglei
     * @Date 2017年7月23日 上午12:04:55
     */
    public Pagination<BillPayFlowStatementBo> queryPayFlowStatementPageList(Pagination<?> pagination) {
        return financeManageDao.queryPayFlowStatementPageList(pagination);
    }

    /**
     * 合同订单侧滑框数据
     *
     * @author tanglei
     * @Date 2017年7月22日 下午19:15:55
     */
    public BillPayFlowStatementBo selectDepositManage(BillPayFlowStatementBo billPayFlowStatementBo) {
        return financeManageDao.selectDepositManage(billPayFlowStatementBo);
    }

    /**
     * 处理结果
     *
     * @author tanglei
     * @Date 2017年7月23日 下午15:46:55d
     */
    public List<BillFinanceResult> selectFinanceResult(BillFinanceResult billFinanceResult) {
        return financeManageDao.selectFinanceResult(billFinanceResult);
    }

    /**
     * 财务定金审核
     *
     * @author tanglei
     * @Date 2017年7月24日 下午15:31:55d
     */
    public boolean financeAgree(BillFinanceResult financeResult) {
        boolean update = true;
        try {
            update = financeManageDao.submitFinanceResult(financeResult) > 0;
            if (!update) {
                throw new AppException("添加违约处理信息失败，请重试或联系管理员");
            }
            BillPayFlowStatementBo billPayFlowStatementBo = new BillPayFlowStatementBo();
            billPayFlowStatementBo.setBs_id(financeResult.getFr_bsId());
            billPayFlowStatementBo = financeManageDao.selectDepositManage(billPayFlowStatementBo);    //查询流水记录表
            if (financeResult.getFr_state() == 3) {
                billPayFlowStatementBo.setBs_flowState(3);   //更改流水支付状态
                billPayFlowStatementBo.setBs_remark("通过退定金");
            } else {
                billPayFlowStatementBo.setBs_flowState(4);   //更改流水支付状态
                billPayFlowStatementBo.setBs_remark("不退定金");
            }
            update = financeManageDao.updatePayFlowStatement(billPayFlowStatementBo) > 0;
            if (!update) {
                throw new AppException("流水记录表更改失败，请重试或联系管理员");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return update;
    }

    /**
     * 查询最近的一条定金审核记录
     *
     * @author tanglei
     * @Date 2017年7月24日   上午10:52:55
     */
    public BillFinanceResult selectNewFinanceResult(BillFinanceResult BillFinanceResult) {
        return financeManageDao.selectNewFinanceResult(BillFinanceResult);
    }

    /**
     * 根据合同编号和订单类型更改订单状态
     *
     * @author tanglei
     * @Date 2017年7月28日 下午21:08:55
     */
    public boolean updateContractOrderState(ContractOrderVo bco) {
        return billContractOrderDao.updateContractOrderState(bco) > 0;
    }

    /**
     * 提交定金违约信息
     *
     * @throws Exception
     * @author tanglei
     * @Date 2017年7月23日 下午17:26:55d
     */
    public void updateFinanceResult(BillFinanceResult financeResult) throws Exception {
        // 添加违约处理信息
        boolean update = financeManageDao.submitFinanceResult(financeResult) > 0;
        if (!update) {
            throw new AppException("添加违约处理信息失败，请重试或联系管理员");
        }
        BillPayFlowStatementBo payFlowStatementBo = new BillPayFlowStatementBo();
        payFlowStatementBo.setBs_id(financeResult.getFr_bsId());
        payFlowStatementBo = financeManageDao.selectDepositManage(payFlowStatementBo); // 查询流水记录表
        if (payFlowStatementBo == null) {
            throw new AppException("没有发现支付流水记录，请重试或联系管理员");
        }
        // 不退定金
        if (financeResult.getFr_state() == 2) {
            payFlowStatementBo.setBs_flowState(AppConfig.bs_flowState_3);
            payFlowStatementBo.setBs_remark("不退定金");
        }
        update = financeManageDao.updatePayFlowStatement(payFlowStatementBo) > 0;
        if (!update) {
            throw new AppException("流水记录表更改失败，请重试或联系管理员");
        }
        // 生成退款流水记录表
        FinanceRefundFlowStatement refundFlowStatement = new FinanceRefundFlowStatement();
        refundFlowStatement.setRf_refundNumber(AppUtil.getOrderCode("300"));
        refundFlowStatement.setRf_serialNumber(payFlowStatementBo.getBs_serialNumber());
        // refundFlowStatement.setRf_orderNumber();
        // refundFlowStatement.setRf_payTransNumber(); //支付平台交易号
        refundFlowStatement.setHi_code(payFlowStatementBo.getHi_code());
        refundFlowStatement.setRf_type(payFlowStatementBo.getBs_type());
        refundFlowStatement.setRf_title(payFlowStatementBo.getBs_title());
        refundFlowStatement.setRf_subtitle(payFlowStatementBo.getBs_subtitle());
        refundFlowStatement.setRf_balPay(2); // 付款
        refundFlowStatement.setRf_money(financeResult.getFr_money());
        refundFlowStatement.setRf_state(AppConfig.bs_state_1); // 待支付
        refundFlowStatement.setRf_payType(payFlowStatementBo.getBs_payType());
        // refundFlowStatement.setRf_payTime();
        refundFlowStatement.setRf_payeeCode(payFlowStatementBo.getBs_payerCode());
        refundFlowStatement.setRf_payeeName(payFlowStatementBo.getBs_payerName());
        refundFlowStatement.setRf_payeeAccount(payFlowStatementBo.getBs_payerAccount());
        refundFlowStatement.setRf_payerCode(payFlowStatementBo.getBs_payeeCode());
        refundFlowStatement.setRf_payerName(payFlowStatementBo.getBs_payeeName());
        refundFlowStatement.setRf_payerAccount(payFlowStatementBo.getBs_payeeAccount());
        refundFlowStatement.setRf_createTime(new Date(System.currentTimeMillis()));
        update = financeManageDao.insertRefundFlowStatement(refundFlowStatement) > 0; // 添加退款流水记录
        if (!update) {
            throw new AppException("添加退款流水记录失败，请重试或联系管理员");
        }

        FinanceStatementBillRelationVo financeStatementBillRelationVo = new FinanceStatementBillRelationVo();
        financeStatementBillRelationVo.setBs_serialNumber(payFlowStatementBo.getBs_serialNumber());
        List<FinanceStatementBillRelationVo> statementBillRelationVoList = this.queryStatementBillRelationList(financeStatementBillRelationVo);

        // 更新账单状态
        for (FinanceStatementBillRelationVo financeStatementBillRelationVo2: statementBillRelationVoList) {
            ContractBillVo contractBillVo = new ContractBillVo();
            contractBillVo.setBcb_code(financeStatementBillRelationVo2.getBcb_code());
            contractBillVo.setBcb_state(AppConfig.bcb_state_20);
            this.updateFinanceBill(contractBillVo);
        }
        // 更新订单状态
        ContractOrderVo contractOrderVo = new ContractOrderVo();
        contractOrderVo.setBco_code(payFlowStatementBo.getBco_code());
        contractOrderVo.setBco_optionState(AppConfig.bcb_state_20);
        this.updateFinanceOrder(contractOrderVo);

        // 查询房屋最近的租赁合同
        ContractObjectVo contractObject = new ContractObjectVo();
        contractObject.setHi_code(payFlowStatementBo.getHi_code());
        contractObject = contractDao.selectNewContractObject(contractObject); // 根据hi_code查询最新的房屋租赁合同

        // 更改房屋状态
        HouseInfoKeep houseInformationKeep = new HouseInfoKeep();
        houseInformationKeep.setHi_code(payFlowStatementBo.getHi_code());
        houseInformationKeep.setHi_isForRent(AppConfig.hi_isForRent_1); // 正在招租
        houseLibraryDao.updateCommodityHouse(houseInformationKeep);
        houseLibraryDao.updateInventoryHouse(houseInformationKeep);
    }

    /**
     * 合同作废
     *
     * @param uid                      :获取当前用户id
     * @param ContractObject_Code:合同编号
     * @param content                  :日志内容
     * @param type                     : 合同类型
     * @throws Exception
     * @author tanglei
     * @Date 2017年7月30日 下午16:03:55
     */
    public void updateContractRecord(Integer uid, String ContractObject_Code, String content, String type) throws Exception {
        // 是否招租
        boolean update;
        // 根据合同唯一编号查询房屋合同
        ContractObjectVo contractObjectVo = new ContractObjectVo();
        contractObjectVo.setContractObject_Code(ContractObject_Code);
        contractObjectVo = contractService.queryContractObject(contractObjectVo);
        if (contractObjectVo == null) {
            throw new AppException("查询合同失败");
        }

        // 更新合同状态
        ContractObjectVo contract = new ContractObjectVo();
        contract.setContractObject_Code(contractObjectVo.getContractObject_Code());
        contract.setContractObject_State(AppConfig.con_state_4);// 合同状态作废
        contract.setContractObject_OptionState(AppConfig.contract_optionstate_107);// 合同操作状态作废
        update = contractService.updateContractObject(contract);
        if (!update) {
            throw new AppException("更改合同状态失败，请重试或联系管理员");
        }

        // 【更改订单状态】 订单
        ContractOrderVo contractOrder = new ContractOrderVo();
        contractOrder.setContractObject_code(ContractObject_Code);
        contractOrder.setBco_orderType(AppConfig.order_type_1);
        contractOrder.setBco_state(AppConfig.bco_state_2);
        contractOrder.setBco_optionState(AppConfig.bco_optionState_4);
        update = this.updateContractOrderState(contractOrder);
        if (!update) {
            throw new AppException("更改订单状态失败，请重试或联系管理员");
        }

        // 查询订单信息
        ContractOrderVo contractOrderbb = billContractOrderDao.selectContractOrder(contractOrder);

        // 根据订单code查询账单信息
        ContractBillVo financeBill = new ContractBillVo();
        financeBill.setBco_code(contractOrderbb.getBco_code());
        List<ContractBillVo> finBill = billContractBillDao.selectBillContractBillCode(financeBill);
        for (ContractBillVo billvo: finBill) {
            // TODO 不等于3  更改账单信息
            if (billvo.getBcb_state() == AppConfig.bcb_state_1 || billvo.getBcb_state() == AppConfig.bcb_state_2) {
                ContractBillVo bill = new ContractBillVo();
                bill.setBcb_id(billvo.getBcb_id());
                bill.setBcb_state(AppConfig.bcb_state_4);
                update = this.updateFinanceBill(bill);
                if (!update) {
                    throw new AppException("更改账单状态失败，请重试或联系管理员");
                }
            }
        }

        if ("租赁合同".equals(type)) {
            if (contractObjectVo.getContractObject_ExtState() != AppConfig.contract_extstate_22) {
                int state = 0;
                HouseInfoKeep houseInformationKeep = new HouseInfoKeep();

                //检查是否有有效定金。如果有，则不修改房源“招租状态”和“是否招租”；如果无，则需要修改。
                FinancePayFlowStatementVo financePayFlowStatementVo = new FinancePayFlowStatementVo();
                financePayFlowStatementVo.setBco_code(contractOrderbb.getBco_code());
                financePayFlowStatementVo.setBs_state(AppConfig.bs_state_2);
                financePayFlowStatementVo = this.queryPayFlowStatement(financePayFlowStatementVo);
                if (StringUtils.isEmpty(financePayFlowStatementVo)) {
                    // 存出房状态
                    switch (contractObjectVo.getContractObject_ExtState()) {
                        case AppConfig.contract_extstate_20:
                            state = AppConfig.hi_forRentState_1001;
                            break;
                        case AppConfig.contract_extstate_23:
                            state = AppConfig.hi_forRentState_1004;
                            break;
                        case AppConfig.contract_extstate_25:
                            state = AppConfig.hi_forRentState_1002;
                            break;
                        case AppConfig.contract_extstate_26:
                            state = AppConfig.hi_forRentState_1003;
                            break;
                        case AppConfig.contract_extstate_27:
                            state = AppConfig.hi_forRentState_1005;
                            break;
                        case AppConfig.contract_extstate_29:
                            state = AppConfig.hi_forRentState_1006;
                            break;
                    }
                    houseInformationKeep.setHi_forRentState(state);
                }

                // 更改房屋状态
                houseInformationKeep.setHi_code(contractObjectVo.getHi_code());
                houseInformationKeep.setHi_isForRent(AppConfig.hi_isForRent_1);
                houseInformationKeep.setContract_outStatus(AppConfig.contract_outStatus_1);
                houseLibraryDao.updateCommodityHouse(houseInformationKeep);
                houseLibraryDao.updateInventoryHouse(houseInformationKeep);

                // 房屋扩展信息
                HouseInfoKeep houseKeep = new HouseInfoKeep();
                houseKeep.setHi_code(houseInformationKeep.getHi_code());
                houseKeep = housingAllocationDao.selectHouseInformationKeep(houseKeep);
                HouseHouseExtended houseExtended = new HouseHouseExtended();
                houseExtended.setHe_id(houseKeep.getHe_id());
                houseExtended.setHe_state("free");
                int houseEx = houseExtendedDao.updataInfo(houseExtended);
                if (houseEx < 0) {
                    throw new AppException("修改房屋扩展信息失败，请重试或联系管理员");
                }
            }
            // 续约出房
            else {
                // 更新上份合同状态
                if (contractObjectVo.getContractObject_Successor() > 0) {
                    ContractObjectVo contObject = new ContractObjectVo();
                    contObject.setContractObject_Id(contractObjectVo.getContractObject_Successor());
                    contObject.setContractObject_State(AppConfig.con_state_2);
                    contObject.setContractObject_OptionState(AppConfig.contract_optionstate_106);
                    contractService.updateContractObject(contObject);
                }

                // 更改房屋状态
                HouseInfoKeep houseInformationKeep = new HouseInfoKeep();
                houseInformationKeep.setHi_code(contractObjectVo.getHi_code());
                houseInformationKeep.setContract_outStatus(AppConfig.contract_outStatus_5);
                houseLibraryDao.updateCommodityHouse(houseInformationKeep);
                houseLibraryDao.updateInventoryHouse(houseInformationKeep);
            }

        } else if ("托管合同".equals(type)) {
            if (contractObjectVo.getContractObject_ExtState() != AppConfig.contract_extstate_12) {
                // 更改房屋状态
                HouseInfoKeep houseInformationKeep = new HouseInfoKeep();
                houseInformationKeep.setHi_code(contractObjectVo.getHi_code());
                houseInformationKeep.setContract_intoStatus(AppConfig.contract_outStatus_1);
                houseInformationKeep.setHi_forRentState(AppConfig.hi_forRentState_1021);
                houseInformationKeep.setHi_isForRent(AppConfig.hi_isForRent_0);
                houseLibraryDao.updateCommodityHouse(houseInformationKeep);
                houseLibraryDao.updateInventoryHouse(houseInformationKeep);
            } else {

                // 更新上份合同状态
                if (contractObjectVo.getContractObject_Successor() > 0) {
                    ContractObjectVo contObject = new ContractObjectVo();
                    contObject.setContractObject_Id(contractObjectVo.getContractObject_Successor());
                    contObject.setContractObject_State(AppConfig.con_state_2);
                    contObject.setContractObject_OptionState(AppConfig.contract_optionstate_106);
                    contractService.updateContractObject(contObject);
                }

                // 更改房屋状态
                HouseInfoKeep houseInformationKeep = new HouseInfoKeep();
                houseInformationKeep.setHi_code(contractObjectVo.getHi_code());
                houseInformationKeep.setContract_intoStatus(AppConfig.contract_outStatus_5);
                houseLibraryDao.updateCommodityHouse(houseInformationKeep);
                houseLibraryDao.updateInventoryHouse(houseInformationKeep);
            }
        }

        // 删除合同服务费
        ServiceCharge serviceCharge = new ServiceCharge();
        serviceChargeService.delServiceCharge(ContractObject_Code);

        // 生成合同执行记录
        ContractImplRecordVo contractImplRecord = new ContractImplRecordVo();
        contractImplRecord.setHi_code(contractObjectVo.getHi_code());
        contractImplRecord.setContractObject_code(contractObjectVo.getContractObject_Code());
        contractImplRecord.setCir_type(AppConfig.contractTpye_1022);
        contractImplRecord.setCir_content(content);
        contractImplRecord.setCir_author(uid);
        // 手动记录
        contractImplRecord.setCir_source(1);
        contractImplRecord.setCir_createTime(new Date(System.currentTimeMillis()));
        boolean insert = contractService.addHouseRecord(contractImplRecord);
        if (!insert) {
            throw new AppException("添加合同日志失败，请重试或联系管理员");
        }
    }

    /**
     * 查询账单最小期数
     *
     * @param bco_code
     */
    public int queryFinanceBillForMinCycle(String bco_code) {
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBco_code(bco_code);
        return billContractOrderDao.queryFinanceBillForMinCycle(contractBillVo);
    }

    /**
     * 查询账单最小期数
     *
     * @param contractBillVo
     */
    public int queryFinanceBillForMinCycle(ContractBillVo contractBillVo) {
        return billContractOrderDao.queryFinanceBillForMinCycle(contractBillVo);
    }

    /**
     * 更新支付通知
     *
     * @param out_trade_no
     * @param trade_no
     * @param total_fee
     * @param trade_status
     * @param buyer_logon_id
     * @param notify_time
     * @return
     * @throws AppException
     */
    public Msg<Object> updatePayNotify(String out_trade_no, String trade_no, String total_fee, String trade_status, String buyer_logon_id, Date notify_time) throws Exception {
        JSONObject json = new JSONObject();
        json.put("out_trade_no", out_trade_no);
        json.put("trade_no", trade_no);
        json.put("total_fee", total_fee);
        json.put("trade_status", trade_status);
        json.put("buyer_logon_id", buyer_logon_id);
        json.put("notify_time", notify_time);
        return updatePayNotify(json);
    }

    /**
     * 更新支付通知
     *
     * @param json
     * @return
     * @throws AppException
     */
    public Msg<Object> updatePayNotify(JSONObject json) throws Exception {
        Msg<Object> msg = new Msg<>();
        // 商户订单号
        String out_trade_no = json.getString("out_trade_no");
        // 交易号
        String trade_no = json.getString("trade_no");
        // 金额
        String total_fee = json.getString("total_fee");
        // 交易状态
        String trade_status = json.getString("trade_status");
        // 交易账号
        String buyer_logon_id = json.getString("buyer_logon_id");
        // 操作人
        Integer bcb_operater = (Integer) json.getOrDefault("bcb_operater", 0);
        // 通知时间
        Date notify_time = json.getDate("notify_time");

        // 通过交易号查询流水
        FinancePayFlowStatementVo flowStatementVo = new FinancePayFlowStatementVo();
        flowStatementVo.setBs_payTransNumber(trade_no);
        flowStatementVo = this.queryPayFlowStatement(flowStatementVo);
        if (flowStatementVo != null) {
            return msg;
        }

        // 通过商户号查询流水
        flowStatementVo = new FinancePayFlowStatementVo();
        flowStatementVo.setBs_orderNumber(out_trade_no);
        flowStatementVo = this.queryPayFlowStatement(flowStatementVo);
        if (flowStatementVo == null) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 记录金额
        double bs_money = flowStatementVo.getBs_money().doubleValue();
        // 支付金额
        double total_money = Double.valueOf(total_fee);
        // 验证金额是否一致
        if (bs_money != total_money) {
            throw new AppException("支付金额与实际金额不一致");
        }

        // 支付成功，改变状态
        if ("success".equals(trade_status)) {
            int bs_type = flowStatementVo.getBs_type();
            // 若支付成功后，直接返回结果，不用处理
            if (flowStatementVo.getBs_state() == AppConfig.bs_state_2) {
                return msg;
            }

            // 【更新流水】
            FinancePayFlowStatementVo flowStatementVo1 = new FinancePayFlowStatementVo();
            flowStatementVo1.setBs_id(flowStatementVo.getBs_id());
            flowStatementVo1.setBs_payTransNumber(trade_no);
            if (flowStatementVo.getBs_balPay() == 1) {
                flowStatementVo1.setBs_payerAccount(buyer_logon_id);
            }
            if (flowStatementVo.getBs_balPay() == 2) {
                flowStatementVo1.setBs_payeeAccount(buyer_logon_id);
            }
            flowStatementVo1.setBs_state(AppConfig.bs_state_2);
            flowStatementVo1.setBs_flowState(AppConfig.bs_flowState_2);
            flowStatementVo1.setBs_payTime(notify_time);
            boolean boo = this.updatePayFlowStatement(flowStatementVo1);
            if (!boo) {
                throw new AppException("更新流水失败");
            }

            // 查询账单流水关系数据
            FinanceStatementBillRelationVo statementBillRelationVo = new FinanceStatementBillRelationVo();
            statementBillRelationVo.setBs_serialNumber(flowStatementVo.getBs_serialNumber());
            List<FinanceStatementBillRelationVo> statementBillRelationList = this.queryStatementBillRelationList(statementBillRelationVo);
            if (statementBillRelationList == null) {
                throw new AppException("没有发现流水");
            }

            // 租金订单号
            String rent_bco_code = null;
            // 定金订单号
            String frontMoney_bco_code = null;
            for (FinanceStatementBillRelationVo statementBillRelationVo1: statementBillRelationList) {
                if (statementBillRelationVo1.getBcb_code() != null) {
                    ContractBillVo contractBillVo = new ContractBillVo();
                    contractBillVo.setBcb_code(statementBillRelationVo1.getBcb_code());
                    contractBillVo = this.queryFinanceBill(contractBillVo);
                    if (contractBillVo != null) {
                        if (contractBillVo.getBcb_type() == AppConfig.CONTRACT_BILL_TYPE_18) {
                            if (bs_type == AppConfig.order_type_4) {
                                rent_bco_code = contractBillVo.getBco_code();
                            }
                            frontMoney_bco_code = contractBillVo.getBco_code();
                        } else {
                            rent_bco_code = contractBillVo.getBco_code();
                        }
                        // 更新账单
                        ContractBillVo contractBillVo1 = new ContractBillVo();
                        contractBillVo1.setBcb_id(contractBillVo.getBcb_id());
                        contractBillVo1.setBcb_realPayment(contractBillVo.getBcb_repayment());
                        contractBillVo1.setBcb_state(AppConfig.order_option_state_3);
                        contractBillVo1.setBcb_realPaymentDate(notify_time);
                        contractBillVo1.setBcb_operater(bcb_operater);
                        this.updateFinanceBill(contractBillVo1);
                    }
                }
            }
            if (rent_bco_code == null) {
                throw new AppException("没有发现订单号");
            }

            // 查询订单
            ContractOrderVo contractOrderVo = this.queryFinanceOrder(rent_bco_code);
            String bco_money = contractOrderVo.getBco_currentPayment().doubleValue() + "";

            // ->租金订单
            if (bs_type == AppConfig.order_type_1) {
                // ->是否为首期账单
                int minCycle = this.queryFinanceBillForMinCycle(contractOrderVo.getBco_code());
                if (contractOrderVo.getBco_currentCycle() == minCycle) {
                    // ->是否有定金
                    if (frontMoney_bco_code != null) {
                        // 定金绑定至合同
                        ContractOrderVo contractOrderVo2 = new ContractOrderVo();
                        contractOrderVo2.setBco_code(frontMoney_bco_code);
                        contractOrderVo2.setContractObject_code(contractOrderVo.getContractObject_code());
                        contractOrderVo2.setBco_optionState_in(AppConfig.order_option_state_3 + "");
                        this.updateFinanceOrder(contractOrderVo2);

                        // 改变定金流水完成交易
                        FinancePayFlowStatementVo payFlowStatementVo1 = new FinancePayFlowStatementVo();
                        payFlowStatementVo1.setBco_code(frontMoney_bco_code);
                        payFlowStatementVo1.setBs_type(AppConfig.order_type_4);
                        payFlowStatementVo1 = this.queryPayFlowStatement(payFlowStatementVo1);
                        if (payFlowStatementVo1 != null) {
                            FinancePayFlowStatementVo payFlowStatementVo = new FinancePayFlowStatementVo();
                            payFlowStatementVo.setBs_serialNumber(payFlowStatementVo1.getBs_serialNumber());
                            payFlowStatementVo.setBs_flowState(AppConfig.bs_flowState_4);
                            this.updatePayFlowStatement(payFlowStatementVo);
                        }
                    }

                    // ->自动提交合同
                    ContractObjectVo contractObjectVo = new ContractObjectVo();
                    contractObjectVo.setContractObject_Code(contractOrderVo.getContractObject_code());
                    contractObjectVo.setContractObject_OptionState(AppConfig.contract_optionstate_102);
                    contractService.updateContractObject(contractObjectVo);
                }
                // 执行存储过程
                this.updateFinanceOrderBillData(rent_bco_code);
            }

            // ->服务订单
            if (bs_type == AppConfig.order_type_2) {
                // 更新订单
                ContractOrderVo contractOrderVo1 = new ContractOrderVo();
                contractOrderVo1.setBco_code(rent_bco_code);
                contractOrderVo1.setBco_optionState(AppConfig.order_option_state_3);
                this.updateFinanceOrder(contractOrderVo1);

                // TODO 支付宝、微信支付回调，更新服务费用订单等相关数据
                ServicePayMoneyVo servicePayMoneyVo = new ServicePayMoneyVo();
                servicePayMoneyVo.setUser_id(contractOrderVo1.getBco_userId());
                servicePayMoneyVo.setCc_code(contractOrderVo1.getBco_customer());
                servicePayMoneyVo.setBco_code(contractOrderVo1.getBco_code());
                servicePayMoneyVo = serviceService.queryNewServicePayMoney(servicePayMoneyVo);

                if (servicePayMoneyVo != null) {

                    /*// TODO 修改服务订单状态
                    ServiceOrderVo serviceOrderVo = new ServiceOrderVo();
                    serviceOrderVo.setSo_id(servicePayMoneyVo.getSo_id());
                    serviceOrderVo.setSo_state(AppConfig.so_state_3400);
                    serviceService.updateServiceOrder(serviceOrderVo);*/

                    // 初始服务费
                    Double init_serveMoney = servicePayMoneyVo.getInit_serveMoney();
                    // 剩余服务费
                    Double surplus_serveMoney = servicePayMoneyVo.getSurplus_serveMoney();
                    // 本次应支付费用
                    Double shallMoney = contractOrderVo.getBco_currentPayment().doubleValue();
                    // 总费用
                    double totalMoney = servicePayMoneyVo.getSo_totalMoney();

                    // 还有剩余服务费
                    if (null != surplus_serveMoney && surplus_serveMoney > 0) {
                        if (surplus_serveMoney >= shallMoney) {
                            // 更新剩余服务费用
                            ServiceCharge serviceCharge = new ServiceCharge();
                            serviceCharge.setS_id(servicePayMoneyVo.getS_id());
                            serviceCharge.setUsed_serveMoney(shallMoney);
                            serviceCharge.setSurplus_serveMoney(surplus_serveMoney - shallMoney);
                            serviceService.modifyServiceMoney(serviceCharge);

                            // 添加服务费扣除记录
                            ServiceChargeRecord serviceChargeRecord = new ServiceChargeRecord();
                            serviceChargeRecord.setMd_id(servicePayMoneyVo.getSo_id());
                            serviceChargeRecord.setService_charge(shallMoney);
                            serviceChargeRecord.setDiscount(totalMoney - shallMoney + 0.00);// 减免加折扣
                            serviceChargeRecord.setCon_code(servicePayMoneyVo.getCon_code());
                            serviceChargeRecord.setCc_code(servicePayMoneyVo.getCc_code());
                            serviceChargeRecord.setHi_code(servicePayMoneyVo.getHi_code());
                            serviceService.appAddServiceChargeRecord(serviceChargeRecord);

                            // 生成门店支付流水
                            FinancePayFlowStatementVo statementVo = serviceService.genrateStatement(servicePayMoneyVo, shallMoney, 0.00, 2, contractOrderVo.getBco_code());

                            // 获取定金账单
                            ContractBillVo contractBillVo2 = new ContractBillVo();
                            contractBillVo2.setBco_code(contractOrderVo.getBco_code());
                            List<ContractBillVo> financeBillList1 = this.queryFinanceBillList(contractBillVo2);

                            // 流水账单关系
                            if (null != financeBillList1 && !financeBillList1.isEmpty()) {
                                for (ContractBillVo contractBillVo1: financeBillList1) {
                                    serviceService.genrateStatementBillRelation(statementVo.getBs_serialNumber(), contractBillVo1);
                                }
                            }
                        }
                    } else {
                        // 更新剩余服务费用
                        ServiceCharge serviceCharge = new ServiceCharge();
                        serviceCharge.setS_id(servicePayMoneyVo.getS_id());
                        serviceCharge.setUsed_serveMoney(init_serveMoney);
                        serviceCharge.setSurplus_serveMoney(0.00);
                        serviceService.modifyServiceMoney(serviceCharge);

                        // 添加服务费扣除记录
                        ServiceChargeRecord serviceChargeRecord = new ServiceChargeRecord();
                        serviceChargeRecord.setMd_id(servicePayMoneyVo.getSo_id());
                        serviceChargeRecord.setService_charge((shallMoney - surplus_serveMoney) / 2);
                        // 折扣费用
                        double discountMoney = (shallMoney - surplus_serveMoney) / 2;
                        // 减免费用
                        double annulMoney = totalMoney - shallMoney;

                        serviceChargeRecord.setDiscount(discountMoney + annulMoney);// 减免加折扣
                        serviceChargeRecord.setCon_code(servicePayMoneyVo.getCon_code());
                        serviceChargeRecord.setCc_code(servicePayMoneyVo.getCc_code());
                        serviceChargeRecord.setHi_code(servicePayMoneyVo.getHi_code());
                        serviceService.appAddServiceChargeRecord(serviceChargeRecord);

                        // 生成门店支付流水
                        FinancePayFlowStatementVo statementVo = serviceService.genrateStatement(servicePayMoneyVo, shallMoney, 0.00, 2, contractOrderVo.getBco_code());

                        // 获取定金账单
                        ContractBillVo contractBillVo2 = new ContractBillVo();
                        contractBillVo2.setBco_code(contractOrderVo.getBco_code());
                        List<ContractBillVo> financeBillList1 = this.queryFinanceBillList(contractBillVo2);

                        // 流水账单关系
                        if (null != financeBillList1 && !financeBillList1.isEmpty()) {
                            for (ContractBillVo contractBillVo1: financeBillList1) {
                                serviceService.genrateStatementBillRelation(statementVo.getBs_serialNumber(), contractBillVo1);
                            }
                        }
                    }
                    // TODO 添加记录
                    serviceService.addServiceRecordBo(servicePayMoneyVo.getSo_id(), AppConfig.so_state_3232, bcb_operater, null);
                }
            }

            // ->结算订单
            if (bs_type == AppConfig.order_type_3) {
                System.out.println("结算订单");
            }

            // ->定金订单
            if (bs_type == AppConfig.order_type_4) {
                // 查询房源
                ViewHouseLibraryInfoVo houseLibraryInfoVo = houseLibraryService.queryHouseLibraryInfo(contractOrderVo.getHi_code());
                String house_address = houseLibraryInfoVo.getHouse_address();
                String em_name = "";
                String em_phone = "";
                String cc_name = "";
                String cc_phone = "";

                // 查询管家
                if (!StringUtils.isEmpty(contractOrderVo.getBco_butler())) {
                    UserCenterEmployee employee = employeeService.queryEmployeeInfo(contractOrderVo.getBco_butler());
                    if (employee != null) {
                        em_name = employee.getEm_name();
                        em_phone = employee.getEm_phone();
                    }
                } else {
                    // 查询房源部门信息
                    HousePositionCompanyVo houseCompanyInfo = houseLibraryService.queryHouseCompanyInfo(new HousePositionCompanyVo() {{
                        setHi_code(contractOrderVo.getHi_code());
                    }});
                    if (houseCompanyInfo != null) {
                        em_name = houseCompanyInfo.getEm_name();
                        em_phone = houseCompanyInfo.getEm_phone();
                    }
                }

                // 查询用户
                UserCustomer customerVo = customerService.queryCustomerInfo(contractOrderVo.getBco_customer());
                if (customerVo != null) {
                    cc_name = customerVo.getCc_name();
                    cc_phone = customerVo.getCcp_phone();
                }

                // 更新订单
                ContractOrderVo contractOrderVo2 = new ContractOrderVo();
                contractOrderVo2.setBco_code(rent_bco_code);
                contractOrderVo2.setBco_optionState(AppConfig.order_option_state_3);
                this.updateFinanceOrder(contractOrderVo2);

                // 更新商品房源、库存房源状态
                HouseInfoKeep houseInformation = new HouseInfoKeep();
                houseInformation.setHi_code(contractOrderVo.getHi_code());
                houseInformation.setHi_isForRent(AppConfig.hi_isForRent_2);
                // houseInformation.setHi_forRentState(AppConfig.hi_forRentState_2000);
                houseLibraryDao.updateCommodityHouse(houseInformation);
                houseLibraryDao.updateInventoryHouse(houseInformation);

                try {
                    // 发送定金短信
                    int day = AppUtil.getDay(contractOrderVo.getBco_createTime(), contractOrderVo.getBco_invalidTime());
                    SmsUtil.sendCusDepositSMS(cc_phone, house_address, cc_name, bco_money, day + "", em_name, em_phone);
                    SmsUtil.sendEmpDepositSMS(em_phone, house_address, cc_name, cc_phone, bco_money);
                } catch (Exception e) {
                    e.printStackTrace();
                    System.out.println("短信发送失败：" + e.getMessage());
                }
            }
        }
        return msg;
    }

    /**
     * 查询定金分页列表
     *
     * @param pagination
     * @return
     */
    public Pagination<FinanceFrontMoneyBillBo> queryFrontMoneyBillPageList(Pagination<FinanceFrontMoneyBillBo> pagination) {
        return financeManageDao.queryFrontMoneyBillPageList(pagination);
    }

    /**
     * 更新流水核销记录
     *
     * @param payFlowStatementValidRecord
     * @throws AppException
     */
    public void updatePayFlowStatementForPayState(PayFlowStatementValidRecord payFlowStatementValidRecord) throws AppException {
        FinancePayFlowStatementVo financePayFlowStatementVo = new FinancePayFlowStatementVo();
        financePayFlowStatementVo.setBs_serialNumber(payFlowStatementValidRecord.getBs_serialNumber());
        financePayFlowStatementVo = this.queryPayFlowStatement(financePayFlowStatementVo);
        if (financePayFlowStatementVo == null) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 添加记录
        payFlowStatementValidRecord.setPvf_createTime(new Date());
        recordService.addPayFlowStatementValidRecord(payFlowStatementValidRecord);

        // 更新流水
        FinancePayFlowStatementVo financePayFlowStatementVo1 = new FinancePayFlowStatementVo();
        financePayFlowStatementVo1.setBs_serialNumber(payFlowStatementValidRecord.getBs_serialNumber());
        financePayFlowStatementVo1.setBs_verifier(payFlowStatementValidRecord.getPvf_em_id());
        financePayFlowStatementVo1.setBs_verifyState(2);
        financePayFlowStatementVo1.setBs_verifyTime(payFlowStatementValidRecord.getPvf_validTime());
        this.updatePayFlowStatement(financePayFlowStatementVo1);
    }

    /**
     * 更新流水核销记录
     *
     * @param payFlowStatementValidRecord
     * @throws AppException
     */
    public void updateOrderBillForCheck(PayFlowStatementValidRecord payFlowStatementValidRecord) throws AppException {
        if (StringUtils.isEmpty(payFlowStatementValidRecord.getBs_serialNumber())) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }
        OrderBillVo orderBillVo = orderService.queryOrderBill(payFlowStatementValidRecord.getBs_serialNumber());
        if (orderBillVo == null) {
            throw new AppException("没有发现流水信息");
        }

        // 添加记录
        payFlowStatementValidRecord.setPvf_createTime(new Date());
        recordService.addPayFlowStatementValidRecord(payFlowStatementValidRecord);

        // 更新流水
        OrderBillVo orderBillVo1 = new OrderBillVo();
        orderBillVo1.setBill_id(orderBillVo.getBill_id());
        orderBillVo1.setBill_check_status(AppConfig.bill_check_status_2);
        orderBillVo1.setBill_check_time(new Date());
        orderService.updateOrderBill(orderBillVo1);
    }

    /**
     * 退款流水
     *
     * @param financeRefundFlowStatement
     * @return
     */
    public FinanceRefundFlowStatement queryRefundFlowStatement(FinanceRefundFlowStatement financeRefundFlowStatement) {
        return financeManageDao.queryRefundFlowStatement(financeRefundFlowStatement);
    }


    /**
     * 查询订单已支付和未支付数据
     *
     * @return
     * @author tanglei
     * @date 2017年9月20日 下午15点26
     */
    public List<FinancePayFlowStatementVo> financeOrderListapp(FinancePayFlowStatementVo financePayFlowStatementVo) {
        return financeManageDao.financeOrderListapp(financePayFlowStatementVo);
    }

    /**
     * 订单取消
     *
     * @param contractObject_No :合同编号
     * @param content           :日志内容
     * @throws Exception
     * @author tanglei
     * @Date 2017年9月23日 上午11:29:55
     */
    public void cancelOrder(String contractObject_No, String cco_code, String content) throws Exception {
        boolean update;

        // 根据合同唯一编号查询房屋合同
        ContractObjectVo contractObjectVo = new ContractObjectVo();
        contractObjectVo.setContractObject_No(contractObject_No);
        contractObjectVo = contractService.queryContractObject(contractObjectVo);
        if (contractObjectVo == null) {
            throw new AppException("查询合同失败");
        }

        // 合同操作状态  更改成生效
        ContractObjectVo contract = new ContractObjectVo();
        contract.setContractObject_Id(contractObjectVo.getContractObject_Id());
        contract.setContractObject_OptionState(AppConfig.contract_optionstate_106);
        update = contractService.updateContractObject(contract);
        if (!update) {
            throw new AppException("更改合同状态失败，请重试或联系管理员");
        }

        //更改房屋状态
        HouseInfoKeep houseInfoKeep = new HouseInfoKeep();
        houseInfoKeep.setHi_code(contractObjectVo.getHi_code());
        houseInfoKeep.setHi_isForRent(AppConfig.hi_isForRent_0);
        houseInfoKeep.setHi_forRentState(AppConfig.hi_forRentState_1020);
        houseInfoKeep.setHi_leaseDay(0);
        houseLibraryDao.updateCommodityHouse(houseInfoKeep);
        houseLibraryDao.updateInventoryHouse(houseInfoKeep);

        //更改招租订单
        BusinessCancelContractOrder contractOrder = new BusinessCancelContractOrder();
        contractOrder.setCco_code(cco_code);
        contractOrder.setCco_state(AppConfig.CANCEL_CONTRACT_STATE_7);
        contractOrder.setCco_applicationContent(content);
        contractService.updateCancelContractOrder(contractOrder);
    }

    /**
     * 查询账单支付列表
     *
     * @param contractBillVo
     * @return
     */
    public List<ContractBillVo> queryFinanceBillPaymentList(ContractBillVo contractBillVo) {
        return financeManageDao.queryFinanceBillPaymentList(contractBillVo);
    }

    public FinanceDownPaymentVo queryFinanceDownPayment(FinanceDownPaymentVo financeDownPaymentVo) {
        return financeManageDao.queryFinanceDownPayment(financeDownPaymentVo);
    }

    public FinanceDownPaymentVo queryFinanceDownPayment(Integer fdp_id) {
        FinanceDownPaymentVo financeDownPaymentVo = new FinanceDownPaymentVo();
        financeDownPaymentVo.setFdp_id(fdp_id);
        return financeManageDao.queryFinanceDownPayment(financeDownPaymentVo);
    }

    public boolean updateFinanceDownPayment(FinanceDownPaymentVo financeDownPaymentVo) {
        return financeManageDao.updateFinanceDownPayment(financeDownPaymentVo) > 0;
    }

    public Pagination<OrderBillVo> queryOrderBillPageList(Pagination<OrderBillVo> pagination) {
        return financeManageDao.queryOrderBillPageList(pagination);
    }

    public Pagination<OrderVo> queryOrderPageList(Pagination<OrderVo> pagination) {
        return financeManageDao.queryOrderPageList(pagination);
    }

    public Pagination<FinanceDownPaymentVo> queryDownPaymentPageList(Pagination<FinanceDownPaymentVo> pagination) {
        return financeManageDao.queryDownPaymentPageList(pagination);
    }

    public boolean addContractBillInstalment(ContractBillInstalmentVo contractBillInstalmentVo) {
        return financeManageDao.addContractBillInstalment(contractBillInstalmentVo) > 0;
    }

    public List<ContractBillInstalmentVo> queryContractBillInstalmentList(String bco_code) {
        ContractBillInstalmentVo contractBillInstalmentVo = new ContractBillInstalmentVo();
        contractBillInstalmentVo.setBco_code(bco_code);
        return financeManageDao.queryContractBillInstalmentList(contractBillInstalmentVo);
    }

    public List<ContractBillInstalmentVo> queryContractBillInstalmentList(ContractBillInstalmentVo contractBillInstalmentVo) {
        return financeManageDao.queryContractBillInstalmentList(contractBillInstalmentVo);
    }

    public ContractBillInstalmentVo queryContractBillInstalment(String cbs_code) {
        ContractBillInstalmentVo contractBillInstalmentVo = new ContractBillInstalmentVo();
        contractBillInstalmentVo.setCbs_code(cbs_code);
        return financeManageDao.queryContractBillInstalment(contractBillInstalmentVo);
    }

    public boolean updateContractBillInstalment(ContractBillInstalmentVo contractBillInstalmentVo) {
        return financeManageDao.updateContractBillInstalment(contractBillInstalmentVo) > 0;
    }

    public boolean deleteContractBillInstalment(Integer cbs_id) {
        ContractBillInstalmentVo contractBillInstalmentVo = new ContractBillInstalmentVo();
        contractBillInstalmentVo.setCbs_id(cbs_id);
        return financeManageDao.deleteContractBillInstalment(contractBillInstalmentVo) > 0;
    }

    public boolean addOrderReturns(OrderReturnsVo orderReturnsVo) {
        return financeManageDao.addOrderReturns(orderReturnsVo) > 0;
    }

    public OrderReturnsVo queryOrderReturns(OrderReturnsVo orderReturnsVo) {
        return financeManageDao.queryOrderReturns(orderReturnsVo);
    }

    public OrderReturnsVo queryOrderReturns(Integer order_id) {
        OrderReturnsVo orderReturnsVo = new OrderReturnsVo();
        orderReturnsVo.setOrder_id(order_id);
        return financeManageDao.queryOrderReturns(orderReturnsVo);
    }
}
