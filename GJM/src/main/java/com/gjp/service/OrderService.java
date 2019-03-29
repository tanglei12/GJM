package com.gjp.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.gjp.dao.OrderDao;
import com.gjp.dao.ServiceDao;
import com.gjp.model.*;
import com.gjp.util.*;
import com.gjp.util.pay.AliPay;
import com.gjp.util.pay.WeixinPay;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.text.ParseException;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 订单管理service
 *
 * @author JiangQt
 * @version 2017年6月4日上午10:08:34
 */
@Service
public class OrderService {

    // 日志输出
    public static Logger log = Logger.getLogger(OrderService.class);

    @Resource
    private OrderDao orderDao;
    @Resource
    private ServiceDao serviceDao;
    @Resource
    private FinanceManageService financeManageService;
    @Resource
    private BillPartnerBillService partnerBillService;
    @Resource
    private UserService userService;
    @Resource
    private HouseLibraryService houseLibraryService;
    @Resource
    private ServiceService serviceService;
    @Resource
    private CustomerService customerService;
    @Resource
    private ContractService contractService;

    // ==【业务处理】=========================================================

    /**
     * 添加订单
     *
     * @param json  参数
     * @param em_id 操作人
     * @throws AppException
     */
    public void _addPayOrder(JSONObject json, Integer em_id) throws AppException {
        // 合同订单CODE
        String bco_code = json.getString("bco_code");
        // 订单类型
        Integer order_type = json.getInteger("order_type");
        // 订单标题
        String order_title = json.getString("order_title");
        // 订单约定支付日期
        Date order_agreed_pay_date = json.getDate("order_agreed_pay_date");
        // 备注
        String order_remarks = json.getString("order_remarks");
        // 订单明细
        JSONArray detail_list = json.getJSONArray("detail_list");

        // 验证参数
        if (StringUtils.isEmpty(bco_code) || StringUtils.isEmpty(order_type)) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 查询合同订单
        ContractOrderVo contractOrderVo = financeManageService.queryFinanceOrder(bco_code);
        if (contractOrderVo == null) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 订单收支类型{1:"收",2:"支"}(相对公司而言)
        int order_balpay = 1;
        // 交易对象{1:"客户",2:"管家",3:"门店",4:"租客",5:"房东",6:"用户"}
        int trade_object = 1;
        switch (contractOrderVo.getBco_type()) {
            case AppConfig.ORDER_TYPE_201:
                order_balpay = 2;
                trade_object = 5;
                break;
            case AppConfig.ORDER_TYPE_202:
                order_balpay = 1;
                trade_object = 4;
                break;
        }

        /* 添加订单 */
        OrderVo orderVo = new OrderVo();
        orderVo.setOrder_sn(AppUtil.getOrderSN(order_type));
        orderVo.setOrder_type(order_type);
        orderVo.setOrder_channel(AppConfig.channel_erp_pc);
        orderVo.setOrder_balpay(order_balpay);
        orderVo.setOrder_title(order_title);
        orderVo.setOrder_status(AppConfig.order_status_1);
        orderVo.setOrder_ucc_id(1);
        orderVo.setOrder_con_code(contractOrderVo.getContractObject_code());
        orderVo.setOrder_hi_code(contractOrderVo.getHi_code());
        orderVo.setTrade_object(trade_object);
        orderVo.setTrade_ucc_id(1);
        orderVo.setTrade_cc_code(contractOrderVo.getBco_customer());
        orderVo.setTrade_user_id(null);
        orderVo.setTrade_em_id(null);
        orderVo.setDetail_count(0);
        orderVo.setDetail_amount_total(0.0);
        orderVo.setDetail_amount_coupon(0.0);
        orderVo.setOrder_amount_total(0.0);
        orderVo.setOrder_balance_deduction(0.0);
        orderVo.setOrder_amount_pay(0.0);
        orderVo.setRecharge_amount_give(0.0);
        orderVo.setOrder_agreed_pay_date(order_agreed_pay_date);
        orderVo.setPay_sn(null);
        orderVo.setPay_channel(null);
        orderVo.setPay_time(null);
        orderVo.setOrder_remarks(order_remarks);
        orderVo.setOrder_operator(em_id);
        orderVo.setOrder_create_time(new Date());
        this.addOrder(orderVo);

        /* 添加订单明细 */
        for (Object o : detail_list) {
            JSONObject detail_info = (JSONObject) o;
            Integer detail_balpay = detail_info.getInteger("detail_balpay");
            Integer detail_type = detail_info.getInteger("detail_type");
            String product_name = detail_info.getString("product_name");
            Double product_price = detail_info.getDouble("product_price");
            Double detail_subtotal = detail_info.getDouble("detail_subtotal");
            String detail_remarks = detail_info.getString("detail_remarks");

            OrderDetailVo orderDetailVo = new OrderDetailVo();
            orderDetailVo.setOrder_sn(orderVo.getOrder_sn());
            orderDetailVo.setDetail_balpay(detail_balpay);
            orderDetailVo.setDetail_type(detail_type);
            orderDetailVo.setDetail_status(AppConfig.detail_status_2);
            orderDetailVo.setProduct_type(0);
            orderDetailVo.setProduct_sn(null);
            orderDetailVo.setProduct_name(product_name);
            orderDetailVo.setProduct_detail(null);
            orderDetailVo.setProduct_price(product_price);
            orderDetailVo.setProduct_number(1);
            orderDetailVo.setDetail_subtotal(detail_subtotal);
            orderDetailVo.setDetail_remarks(detail_remarks);
            orderDetailVo.setDetail_operator(em_id);
            orderDetailVo.setDetail_create_time(new Date());
            this.addOrderDetail(orderDetailVo);
        }

        /* 更新订单金额 */
        this._updatePayOrderForAmount(orderVo.getOrder_sn());
    }

    /**
     * 添加支付订单之合同分期账单
     *
     * @param channel  渠道
     * @param cbs_code 合同账单分期账单code
     * @return
     * @throws Exception
     */
    public void _addPayOrderForContractInstalmentBill(Integer channel, String cbs_code) throws AppException {
        // 订单类型
        int order_type = AppConfig.order_type_1;

        // 验证参数
        if (StringUtils.isEmpty(channel) || StringUtils.isEmpty(cbs_code)) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }
        // 查询合同分期账单
        ContractBillInstalmentVo contractBillStage = financeManageService.queryContractBillInstalment(cbs_code);
        if (contractBillStage == null) {
            throw new AppException("未发现账单信息");
        }
        if (contractBillStage.getCbs_status() == AppConfig.bco_optionState_4) {
            throw new AppException("该账单已关闭，无法生成支付订单");
        }
        if (contractBillStage.getCbs_status() == AppConfig.bco_optionState_3) {
            throw new AppException("该账单已完结，无法生成支付订单");
        }

        // 获取租金订单
        ContractOrderVo contractOrderVo = financeManageService.queryFinanceOrder(contractBillStage.getBco_code());
        if (contractOrderVo == null) {
            throw new AppException("未发现租金订单信息");
        }

        // 获取客户
        UserCustomer customer = customerService.queryCustomerInfo(contractOrderVo.getBco_customer());
        if (customer == null) {
            throw new AppException("未发现客户信息");
        }

        // 获取房源数据
        ViewHouseLibraryInfoVo houseInfo = houseLibraryService.queryHouseLibraryInfo(contractOrderVo.getHi_code());
        if (houseInfo == null) {
            throw new AppException("未发现房源信息");
        }

        // 订单
        OrderVo orderVo = null;
        // 订单号
        String order_sn = AppUtil.getOrderSN(order_type);
        // 约定支付日期
        Date order_agreed_pay_date = contractBillStage.getCbs_repaymentDate();
        // 账单期数
        int bcb_cycle = contractBillStage.getBcb_cycle();
        // 分期期数
        int cbs_cycle = contractBillStage.getCbs_cycle();
        // 最小账单数据
        int min_cycle = financeManageService.queryFinanceBillForMinCycle(contractBillStage.getBco_code());
        // 是否为首期
        boolean is_first = bcb_cycle == min_cycle;
        // 查询该期账单所有分期
        ContractBillInstalmentVo contractBillInstalmentVo1 = new ContractBillInstalmentVo();
        contractBillInstalmentVo1.setBco_code(contractBillStage.getBco_code());
        contractBillInstalmentVo1.setBcb_cycle(bcb_cycle);
        List<ContractBillInstalmentVo> contractBillStagess = financeManageService.queryContractBillInstalmentList(contractBillInstalmentVo1);
        // 订单标题
        String order_title = houseInfo.getHouse_address() + (is_first ? "首期" : "第" + bcb_cycle + "期") + "-" + cbs_cycle + "/" + contractBillStagess.size() + "期";

        // 查询是否存在支付订单
        OrderDetailVo orderDetailVo2 = new OrderDetailVo();
        orderDetailVo2.setProduct_sn("'" + cbs_code + "'");
        List<OrderDetailVo> orderDetailList = this.queryOrderDetailList(orderDetailVo2);
        if (!orderDetailList.isEmpty()) {
            order_sn = orderDetailList.get(0).getOrder_sn();
            orderVo = this.queryOrder(order_sn);
            switch (orderVo.getOrder_status()) {
                // 审核中||未付款
                case AppConfig.order_status_1:
                case AppConfig.order_status_2:
                    OrderVo orderVo1 = new OrderVo();
                    orderVo1.setOrder_id(orderVo.getOrder_id());
                    orderVo1.setOrder_status(AppConfig.order_status_1);
                    this.updateOrder(orderVo1);
                    break;
                // 已付款
                case AppConfig.order_status_3:
                    throw new AppException("该订单已付款，无法生成支付订单");
                    // 交易关闭
                case AppConfig.order_status_4:
                    throw new AppException("该订单已关闭，无法生成支付订单");
            }
        }

        // 明细类型
        int detail_type = AppConfig.detail_type_1;
        // 明细收支(+|-)，默认：+
        int balPay = AppConfig.balPay_1;

        BigDecimal bcb_repayment = new BigDecimal(contractBillStage.getCbs_repayment());
        BigDecimal bcb_realPayment = new BigDecimal(contractBillStage.getCbs_realPayment());
        bcb_realPayment = StringUtils.isEmpty(bcb_realPayment) ? new BigDecimal(0) : bcb_realPayment;
        if (contractOrderVo.getBco_orderType() == AppConfig.order_type_1) {
            switch (contractOrderVo.getBco_type()) {
                case AppConfig.ORDER_TYPE_201: // 支出
                    switch (contractBillStage.getCbs_balPay()) {
                        case 0: // 收入
                            detail_type = AppConfig.detail_type_2;
                            balPay = AppConfig.balPay_2;
                            break;
                        case 1: // 支出
                            break;
                    }
                    break;
                case AppConfig.ORDER_TYPE_202: // 收入
                    switch (contractBillStage.getCbs_balPay()) {
                        case 0: // 收入
                            break;
                        case 1: // 支出
                            detail_type = AppConfig.detail_type_2;
                            balPay = AppConfig.balPay_2;
                            break;
                    }
                    break;
            }
        }

        // 产品详情
        JSONObject product_detail = new JSONObject();
        product_detail.put("bco_code", contractBillStage.getBco_code());
        product_detail.put("bcb_cycle", contractBillStage.getBcb_cycle());
        product_detail.put("bcb_repaymentdate", AppUtil.sdf_date.format(contractBillStage.getCbs_repaymentDate()));
        product_detail.put("is_first", is_first);

        // 查询订单详情
        OrderDetailVo orderDetailVo = new OrderDetailVo();
        orderDetailVo.setProduct_sn(cbs_code);
        orderDetailVo = this.queryOrderDetail(orderDetailVo);
        if (orderDetailVo != null) {
            OrderDetailVo orderDetailVo1 = new OrderDetailVo();
            orderDetailVo1.setDetail_id(orderDetailVo.getDetail_id());
            orderDetailVo1.setDetail_type(detail_type);
            orderDetailVo1.setDetail_balpay(balPay);
            orderDetailVo1.setDetail_status(AppConfig.detail_status_2);
            orderDetailVo1.setProduct_name("租金");
            orderDetailVo1.setProduct_detail(product_detail.toJSONString());
            orderDetailVo1.setProduct_price(bcb_repayment.doubleValue());
            orderDetailVo1.setDetail_subtotal(bcb_repayment.subtract(bcb_realPayment).doubleValue());
            orderDetailVo1.setDetail_remarks(contractBillStage.getCbs_remarks());
            orderDetailVo1.setDetail_operator(0);
            this.updateOrderDetail(orderDetailVo1);
        } else {
            OrderDetailVo orderDetailVo1 = new OrderDetailVo();
            orderDetailVo1.setOrder_sn(order_sn);
            orderDetailVo1.setDetail_type(detail_type);
            orderDetailVo1.setDetail_balpay(balPay);
            orderDetailVo1.setDetail_status(AppConfig.detail_status_2);
            orderDetailVo1.setProduct_sn(contractBillStage.getCbs_code());
            orderDetailVo1.setProduct_type(order_type);
            orderDetailVo1.setProduct_name("租金");
            orderDetailVo1.setProduct_detail(product_detail.toJSONString());
            orderDetailVo1.setProduct_price(bcb_repayment.doubleValue());
            orderDetailVo1.setProduct_number(1);
            orderDetailVo1.setDetail_subtotal(bcb_repayment.subtract(bcb_realPayment).doubleValue());
            orderDetailVo1.setDetail_remarks(contractBillStage.getCbs_remarks());
            orderDetailVo1.setDetail_operator(0);
            orderDetailVo1.setDetail_create_time(new Date());
            this.addOrderDetail(orderDetailVo1);
        }

        // 更新合同账单->出账
        ContractBillInstalmentVo contractBillInstalmentVo = new ContractBillInstalmentVo();
        contractBillInstalmentVo.setCbs_id(contractBillStage.getCbs_id());
        contractBillInstalmentVo.setCbs_account_out(AppConfig.bcb_account_out_2);
        financeManageService.updateContractBillInstalment(contractBillInstalmentVo);

        // 如果是首期，则加载定金
        if (is_first) {
            // 查询用户
            User user = new User();
            user.setUser_cardNumber(customer.getCc_cardNum());
            user = userService.queryUser(user);

            // 查询定金
            FinanceDownPaymentVo financeDownPaymentVo = new FinanceDownPaymentVo();
            financeDownPaymentVo.setCc_code(contractOrderVo.getBco_customer());
            financeDownPaymentVo.setUser_id(user != null ? user.getUser_id() : null);
            financeDownPaymentVo.setHi_code(houseInfo.getHi_code());
            financeDownPaymentVo.setFdp_status(AppConfig.fdp_status_2);
            financeDownPaymentVo = financeManageService.queryFinanceDownPayment(financeDownPaymentVo);
            if (financeDownPaymentVo != null) {
                OrderDetailVo orderDetailVo3 = new OrderDetailVo();
                orderDetailVo3.setProduct_sn(financeDownPaymentVo.getFdp_sn());
                orderDetailVo3 = this.queryOrderDetail(orderDetailVo3);
                if (orderDetailVo3 == null) {
                    orderDetailVo3 = new OrderDetailVo();
                    orderDetailVo3.setOrder_sn(order_sn);
                    orderDetailVo3.setDetail_type(AppConfig.detail_type_2);
                    orderDetailVo3.setDetail_balpay(AppConfig.balPay_2);
                    orderDetailVo3.setDetail_status(AppConfig.detail_status_2);
                    orderDetailVo3.setProduct_sn(financeDownPaymentVo.getFdp_sn());
                    orderDetailVo3.setProduct_type(AppConfig.order_type_4);
                    orderDetailVo3.setProduct_name("定金");
                    orderDetailVo3.setProduct_price(financeDownPaymentVo.getFdp_amount());
                    orderDetailVo3.setProduct_number(1);
                    orderDetailVo3.setDetail_subtotal(financeDownPaymentVo.getFdp_amount());
                    orderDetailVo3.setDetail_remarks(null);
                    orderDetailVo3.setDetail_create_time(new Date());
                    this.addOrderDetail(orderDetailVo3);
                } else {
                    OrderDetailVo orderDetailVo1 = new OrderDetailVo();
                    orderDetailVo1.setDetail_id(orderDetailVo3.getDetail_id());
                    orderDetailVo1.setProduct_price(financeDownPaymentVo.getFdp_amount());
                    orderDetailVo1.setDetail_subtotal(financeDownPaymentVo.getFdp_amount());
                    this.updateOrderDetail(orderDetailVo1);
                }
            }
        }

        // 【添加订单】
        if (orderVo == null) {
            orderVo = new OrderVo();
            orderVo.setOrder_sn(order_sn);
            orderVo.setOrder_type(order_type);
            orderVo.setOrder_channel(channel);
            orderVo.setOrder_title(order_title);
            if (contractOrderVo.getBco_type() == 201) {
                orderVo.setOrder_balpay(AppConfig.balPay_2);
                orderVo.setTrade_object(AppConfig.trade_object_5);
            }
            if (contractOrderVo.getBco_type() == 202) {
                orderVo.setOrder_balpay(AppConfig.balPay_1);
                orderVo.setTrade_object(AppConfig.trade_object_4);
            }
            if (contractOrderVo.getBco_orderType() == AppConfig.order_type_2) {
                orderVo.setOrder_balpay(AppConfig.balPay_1);
                orderVo.setTrade_object(contractOrderVo.getBco_payObject());
            }
            if (contractOrderVo.getBco_orderType() == AppConfig.order_type_4) {
                orderVo.setOrder_balpay(AppConfig.balPay_1);
                orderVo.setTrade_object(AppConfig.trade_object_4);
            }
            orderVo.setOrder_con_code(contractOrderVo.getContractObject_code());
            orderVo.setOrder_hi_code(contractOrderVo.getHi_code());
            orderVo.setTrade_ucc_id(1);
            orderVo.setOrder_ucc_id(1);
            orderVo.setTrade_cc_code(contractOrderVo.getBco_customer());
            orderVo.setTrade_user_id(null);
            orderVo.setOrder_status(AppConfig.order_status_2);
            orderVo.setDetail_count(0);
            orderVo.setDetail_amount_total(0.0);
            orderVo.setDetail_amount_coupon(0.0);
            orderVo.setOrder_balance_deduction(0.0);
            orderVo.setRecharge_amount_give(0.0);
            orderVo.setOrder_amount_total(0.0);
            orderVo.setOrder_amount_pay(0.0);
            orderVo.setOrder_agreed_pay_date(order_agreed_pay_date);
            orderVo.setOrder_operator(0);
            orderVo.setOrder_create_time(new Date());
            this.addOrder(orderVo);
        } else {
            OrderVo orderVo1 = new OrderVo();
            orderVo1.setOrder_id(orderVo.getOrder_id());
            orderVo1.setOrder_title(order_title);
            orderVo1.setOrder_con_code(contractOrderVo.getContractObject_code());
            orderVo1.setOrder_hi_code(contractOrderVo.getHi_code());
            orderVo1.setOrder_status(AppConfig.order_status_2);
            orderVo1.setOrder_agreed_pay_date(order_agreed_pay_date);
            this.updateOrder(orderVo1);
        }

        // 更新订单金额
        this._updatePayOrderForAmount(order_sn);
    }

    /**
     * 添加支付订单之合同账单
     *
     * @param channel  渠道
     * @param bco_code 订单号
     * @return
     * @throws Exception
     */
    public OrderVo _submitPayRent(Integer channel, String bco_code, Integer bcb_cycle) throws AppException {
        // 订单类型
        int order_type = AppConfig.order_type_1;

        // 验证参数
        if (StringUtils.isEmpty(channel) || StringUtils.isEmpty(bco_code)) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 获取租金订单
        ContractOrderVo contractOrderVo = financeManageService.queryFinanceOrder(bco_code);
        if (contractOrderVo == null) {
            throw new AppException("未发现租金订单信息");
        }
        if (contractOrderVo.getBco_optionState() == AppConfig.bco_optionState_4) {
            throw new AppException("该租金订单已关闭，无法生成支付订单");
        }
        if (contractOrderVo.getBco_optionState() == AppConfig.bco_optionState_3) {
            throw new AppException("该租金订单已完结，无法生成支付订单");
        }

        // 获取客户
        UserCustomer customer = customerService.queryCustomerInfo(contractOrderVo.getBco_customer());
        if (customer == null) {
            throw new AppException("未发现客户信息");
        }

        // 获取房源数据
        ViewHouseLibraryInfoVo houseInfo = houseLibraryService.queryHouseLibraryInfo(contractOrderVo.getHi_code());
        if (houseInfo == null) {
            throw new AppException("未发现房源信息");
        }

        // 订单号
        String order_sn = AppUtil.getOrderSN(order_type);
        // 约定支付日期
        Date order_agreed_pay_date = null;
        // 账单期数
        bcb_cycle = bcb_cycle == null ? contractOrderVo.getBco_currentCycle() : bcb_cycle;
        // 是否为首期
        boolean is_first = false;
        // 订单标题
        String order_title = "";
        switch (contractOrderVo.getBco_orderType()) {
            case AppConfig.order_type_1:
                // 最小账单数据
                int min_cycle = financeManageService.queryFinanceBillForMinCycle(bco_code);
                // 是否为首期
                is_first = bcb_cycle == min_cycle;
                // 订单标题
                order_title = houseInfo.getHouse_address() + (is_first ? "首期" : "第" + bcb_cycle + "期");
                break;
            case AppConfig.order_type_2:
                // 订单标题
                order_title = contractOrderVo.getBco_description().contains("null") ? contractOrderVo.getBco_title() : contractOrderVo.getBco_description();
                break;
            case AppConfig.order_type_4:
                // 订单标题
                order_title = "定金-" + houseInfo.getHouse_address();
                break;
        }

        // 获取租金账单
        ContractBillVo contractBillVo0 = new ContractBillVo();
        contractBillVo0.setBco_code(bco_code);
        contractBillVo0.setBcb_cycle(bcb_cycle);
        contractBillVo0.setBcb_state_in(AppConfig.bcb_state_1 + "," + AppConfig.bcb_state_2);
        List<ContractBillVo> financeBillList = financeManageService.queryFinanceBillList(contractBillVo0);
        if (financeBillList.isEmpty()) {
            throw new AppException("未发现租金账单信息");
        }

        // 判断是否有待还款账单
        int status_2 = 0;
        for (ContractBillVo contractBillVo : financeBillList) {
            switch (contractBillVo.getBcb_state()) {
                case AppConfig.order_option_state_1:
                case AppConfig.order_option_state_2:
                    status_2++;
                    order_agreed_pay_date = contractBillVo.getBcb_repaymentDate();
                    break;
            }
        }
        if (status_2 == 0) {
            throw new AppException("未发现待还款账单");
        }

        // 查询是否存在支付订单
        OrderVo orderVo = null;
        StringBuilder product_sn_in = new StringBuilder();
        for (ContractBillVo contractBillVo : financeBillList) {
            product_sn_in.append(product_sn_in.length() == 0 ? "" : ",").append("'").append(contractBillVo.getBcb_code()).append("'");
        }
        if (product_sn_in.length() > 0) {
            OrderDetailVo orderDetailVo2 = new OrderDetailVo();
            orderDetailVo2.setProduct_sn_in(product_sn_in.toString());
            List<OrderDetailVo> orderDetailList = this.queryOrderDetailList(orderDetailVo2);
            order_sn = orderDetailList.isEmpty() ? order_sn : orderDetailList.get(0).getOrder_sn();
            orderVo = this.queryOrder(order_sn);
            if (orderVo != null) {
                switch (orderVo.getOrder_status()) {
                    // 审核中||未付款
                    case AppConfig.order_status_1:
                    case AppConfig.order_status_2:
                        OrderVo orderVo1 = new OrderVo();
                        orderVo1.setOrder_id(orderVo.getOrder_id());
                        orderVo1.setOrder_status(AppConfig.order_status_1);
                        this.updateOrder(orderVo1);
                        break;
                    // 已付款
                    case AppConfig.order_status_3:
                        throw new AppException("该订单已付款，无法生成支付订单");
                        // 交易关闭
                    case AppConfig.order_status_4:
                        throw new AppException("该订单已关闭，无法生成支付订单");
                }
            }
        }

        // 【添加订单明细】
        for (ContractBillVo contractBillVo : financeBillList) {
            // 已付款的账单不出账
            if (contractBillVo.getBcb_state() == AppConfig.bcb_state_3) {
                continue;
            }

            // 明细类型
            int detail_type = AppConfig.detail_type_1;
            // 明细收支(+|-)，默认：+
            int balPay = AppConfig.balPay_1;

            BigDecimal bcb_repayment = contractBillVo.getBcb_repayment();
            BigDecimal bcb_realPayment = contractBillVo.getBcb_realPayment();
            bcb_realPayment = StringUtils.isEmpty(bcb_realPayment) ? new BigDecimal(0) : bcb_realPayment;
            if (contractOrderVo.getBco_orderType() == AppConfig.order_type_1) {
                switch (contractOrderVo.getBco_type()) {
                    case AppConfig.ORDER_TYPE_201: // 支出
                        switch (contractBillVo.getBcb_balPay()) {
                            case 0: // 收入
                                detail_type = AppConfig.detail_type_2;
                                balPay = AppConfig.balPay_2;
                                break;
                            case 1: // 支出
                                break;
                        }
                        break;
                    case AppConfig.ORDER_TYPE_202: // 收入
                        switch (contractBillVo.getBcb_balPay()) {
                            case 0: // 收入
                                break;
                            case 1: // 支出
                                detail_type = AppConfig.detail_type_2;
                                balPay = AppConfig.balPay_2;
                                break;
                        }
                        break;
                }
            }

            // 产品详情
            JSONObject product_detail = new JSONObject();
            product_detail.put("bco_code", contractBillVo.getBco_code());
            product_detail.put("bcb_type", contractBillVo.getBcb_type());
            product_detail.put("bcb_cycle", contractBillVo.getBcb_cycle());
            product_detail.put("bcb_repaymentdate", AppUtil.sdf_date.format(contractBillVo.getBcb_repaymentDate()));
            product_detail.put("is_first", is_first);
            // 账单有效期
            if (contractBillVo.getBcb_type() == AppConfig.contract_bill_type_0) {
                ContractInfoVo contractInfoVo = contractService.queryContractInfo(contractOrderVo.getContractObject_code());
                List<ContractBillVo> financeBillList1 = financeManageService.queryFinanceBillList(contractOrderVo.getBco_code());
                String cycleDate = AppUtil.getContractBillCycleDateOne(financeBillList1, contractInfoVo.getContractObject_DeadlineTime(), contractBillVo.getBcb_cycle());
                product_detail.put("bcb_cycle_date", cycleDate);
            }

            // 查询订单详情
            OrderDetailVo orderDetailVo = new OrderDetailVo();
            orderDetailVo.setProduct_sn(contractBillVo.getBcb_code());
            orderDetailVo = this.queryOrderDetail(orderDetailVo);
            // 更新|添加
            if (orderDetailVo != null) {
                OrderDetailVo orderDetailVo1 = new OrderDetailVo();
                orderDetailVo1.setDetail_id(orderDetailVo.getDetail_id());
                orderDetailVo1.setDetail_type(detail_type);
                orderDetailVo1.setDetail_balpay(balPay);
                orderDetailVo1.setDetail_status(AppConfig.detail_status_2);
                orderDetailVo1.setProduct_name(AppUtil.returnContractBillType(contractBillVo.getBcb_type()));
                orderDetailVo1.setProduct_detail(product_detail.toJSONString());
                orderDetailVo1.setProduct_price(bcb_repayment.doubleValue());
                orderDetailVo1.setDetail_subtotal(bcb_repayment.subtract(bcb_realPayment).doubleValue());
                orderDetailVo1.setDetail_remarks(contractBillVo.getBcb_remarks());
                orderDetailVo1.setDetail_operator(0);
                this.updateOrderDetail(orderDetailVo1);
            } else {
                OrderDetailVo orderDetailVo1 = new OrderDetailVo();
                orderDetailVo1.setOrder_sn(order_sn);
                orderDetailVo1.setDetail_type(detail_type);
                orderDetailVo1.setDetail_balpay(balPay);
                orderDetailVo1.setDetail_status(AppConfig.detail_status_2);
                orderDetailVo1.setProduct_sn(contractBillVo.getBcb_code());
                orderDetailVo1.setProduct_type(order_type);
                orderDetailVo1.setProduct_name(AppUtil.returnContractBillType(contractBillVo.getBcb_type()));
                orderDetailVo1.setProduct_detail(product_detail.toJSONString());
                orderDetailVo1.setProduct_price(bcb_repayment.doubleValue());
                orderDetailVo1.setProduct_number(1);
                orderDetailVo1.setDetail_subtotal(bcb_repayment.subtract(bcb_realPayment).doubleValue());
                orderDetailVo1.setDetail_remarks(contractBillVo.getBcb_remarks());
                orderDetailVo1.setDetail_operator(0);
                orderDetailVo1.setDetail_create_time(new Date());
                this.addOrderDetail(orderDetailVo1);
            }

            // 更新合同账单->出账
            ContractBillVo contractBillVo1 = new ContractBillVo();
            contractBillVo1.setBcb_id(contractBillVo.getBcb_id());
            contractBillVo1.setBcb_account_out(AppConfig.bcb_account_out_2);
            financeManageService.updateFinanceBill(contractBillVo1);
        }

        if (orderVo != null) {
            order_sn = orderVo.getOrder_sn();
        }

        // 如果是首期，则加载定金
        if (is_first) {
            // 查询用户
            User user = new User();
            user.setUser_cardNumber(customer.getCc_cardNum());
            user = userService.queryUser(user);

            // 查询定金
            FinanceDownPaymentVo financeDownPaymentVo = new FinanceDownPaymentVo();
            financeDownPaymentVo.setCc_code(contractOrderVo.getBco_customer());
            financeDownPaymentVo.setUser_id(user != null ? user.getUser_id() : null);
            financeDownPaymentVo.setHi_code(houseInfo.getHi_code());
            financeDownPaymentVo.setFdp_status(AppConfig.fdp_status_2);
            financeDownPaymentVo = financeManageService.queryFinanceDownPayment(financeDownPaymentVo);
            if (financeDownPaymentVo != null) {
                OrderDetailVo orderDetailVo = new OrderDetailVo();
                orderDetailVo.setProduct_sn(financeDownPaymentVo.getFdp_sn());
                orderDetailVo = this.queryOrderDetail(orderDetailVo);
                if (orderDetailVo == null) {
                    orderDetailVo = new OrderDetailVo();
                    orderDetailVo.setOrder_sn(order_sn);
                    orderDetailVo.setDetail_type(AppConfig.detail_type_2);
                    orderDetailVo.setDetail_balpay(AppConfig.balPay_2);
                    orderDetailVo.setDetail_status(AppConfig.detail_status_2);
                    orderDetailVo.setProduct_sn(financeDownPaymentVo.getFdp_sn());
                    orderDetailVo.setProduct_type(AppConfig.order_type_4);
                    orderDetailVo.setProduct_name("定金"); // 万达广场1-1-1首期
                    orderDetailVo.setProduct_price(financeDownPaymentVo.getFdp_amount());
                    orderDetailVo.setProduct_number(1);
                    orderDetailVo.setDetail_subtotal(financeDownPaymentVo.getFdp_amount());
                    orderDetailVo.setDetail_remarks(null);
                    orderDetailVo.setDetail_create_time(new Date());
                    this.addOrderDetail(orderDetailVo);
                } else {
                    OrderDetailVo orderDetailVo1 = new OrderDetailVo();
                    orderDetailVo1.setDetail_id(orderDetailVo.getDetail_id());
                    orderDetailVo1.setProduct_price(financeDownPaymentVo.getFdp_amount());
                    orderDetailVo1.setDetail_subtotal(financeDownPaymentVo.getFdp_amount());
                    this.updateOrderDetail(orderDetailVo1);
                }
            }
        }

        // 【添加订单】
        if (orderVo == null) {
            orderVo = new OrderVo();
            orderVo.setOrder_sn(order_sn);
            orderVo.setOrder_type(order_type);
            orderVo.setOrder_channel(channel);
            orderVo.setOrder_title(order_title);
            orderVo.setOrder_con_code(contractOrderVo.getContractObject_code());
            orderVo.setOrder_hi_code(contractOrderVo.getHi_code());
            if (contractOrderVo.getBco_type() == 201) {
                orderVo.setOrder_balpay(AppConfig.balPay_2);
                orderVo.setTrade_object(AppConfig.trade_object_5);
            }
            if (contractOrderVo.getBco_type() == 202) {
                orderVo.setOrder_balpay(AppConfig.balPay_1);
                orderVo.setTrade_object(AppConfig.trade_object_4);
            }
            if (contractOrderVo.getBco_orderType() == AppConfig.order_type_2) {
                orderVo.setOrder_balpay(AppConfig.balPay_1);
                orderVo.setTrade_object(contractOrderVo.getBco_payObject());
            }
            if (contractOrderVo.getBco_orderType() == AppConfig.order_type_4) {
                orderVo.setOrder_balpay(AppConfig.balPay_1);
                orderVo.setTrade_object(AppConfig.trade_object_4);
            }
            orderVo.setTrade_ucc_id(1);
            orderVo.setOrder_ucc_id(1);
            orderVo.setTrade_cc_code(contractOrderVo.getBco_customer());
            orderVo.setTrade_user_id(null);
            orderVo.setOrder_status(AppConfig.order_status_2);
            orderVo.setDetail_count(0);
            orderVo.setDetail_amount_total(0.0);
            orderVo.setDetail_amount_coupon(0.0);
            orderVo.setOrder_balance_deduction(0.0);
            orderVo.setRecharge_amount_give(0.0);
            orderVo.setOrder_amount_total(0.0);
            orderVo.setOrder_amount_pay(0.0);
            orderVo.setOrder_agreed_pay_date(order_agreed_pay_date);
            orderVo.setOrder_operator(0);
            orderVo.setOrder_create_time(new Date());
            this.addOrder(orderVo); // 租金
        } else {
            OrderVo orderVo1 = new OrderVo();
            orderVo1.setOrder_id(orderVo.getOrder_id());
            orderVo1.setOrder_title(order_title);
            orderVo1.setOrder_con_code(contractOrderVo.getContractObject_code());
            orderVo1.setOrder_hi_code(contractOrderVo.getHi_code());
            orderVo1.setOrder_status(AppConfig.order_status_2);
            orderVo1.setOrder_agreed_pay_date(order_agreed_pay_date);
            this.updateOrder(orderVo1);
        }

        // 更新订单金额
        this._updatePayOrderForAmount(order_sn);

        // 更新支付订单滞纳金
        this._syncPayOrderLateFee();

        return this.queryOrder(order_sn);
    }

    /**
     * 提交定金支付
     *
     * @param json 支付参数
     * @return
     * @throws Exception
     * @author JiangQt
     * @version 2017年7月7日下午5:40:34
     */
    public OrderVo _submitPayDownPayment(JSONObject json) throws Exception {
        // 订单类型
        int order_type = AppConfig.order_type_4;
        // 渠道
        Integer channel = json.getInteger("channel");
        // 支付金额
        double pay_money = json.getDoubleValue("pay_money");

        /* -[自定义参数]--------------------------------------------- */

        // 客户号
        String cc_code = json.getString("cc_code");
        // 产品号
        String hi_code = json.getString("hi_code");
        // 预留天数
        Integer reserve_day = json.getInteger("reserve_day");

        /* -END----------------------------------------------------- */

        // 验证参数
        if (StringUtils.isEmpty(channel) || StringUtils.isEmpty(cc_code) || StringUtils.isEmpty(hi_code)) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 订单号
        String order_sn = AppUtil.getOrderSN(order_type);
        // 账单号
        String bill_sn = AppUtil.getBillSN(order_type);

        // 获取房源数据
        ViewHouseLibraryInfoVo houseInfo = houseLibraryService.queryHouseLibraryInfo(hi_code);
        if (houseInfo == null) {
            throw new AppException("没有发现该房源");
        }
        // 判断是否招租
        if (houseInfo.getHi_isForRent() != 1) {
            throw new AppException("该房源已出租，无法缴纳定金");
        }

        // 查询定金数据
        FinanceDownPaymentVo financeDownPaymentVo = new FinanceDownPaymentVo();
        financeDownPaymentVo.setHi_code(houseInfo.getHi_code());
        financeDownPaymentVo.setFdp_status(AppConfig.fdp_status_2);
        List<FinanceDownPaymentVo> financeDownPaymentList = this.queryFinanceDownPaymentList(financeDownPaymentVo);
        if (!financeDownPaymentList.isEmpty()) {
            throw new AppException("该房源已缴纳定金，无法缴纳定金");
        }

        // 查询定金订单
        FinanceDownPaymentVo financeDownPaymentVo2 = new FinanceDownPaymentVo();
        financeDownPaymentVo2.setHi_code(houseInfo.getHi_code());
        financeDownPaymentVo2.setCc_code(cc_code);
        financeDownPaymentVo2.setFdp_status(AppConfig.fdp_status_1);
        List<FinanceDownPaymentVo> financeDownPaymentList2 = this.queryFinanceDownPaymentList(financeDownPaymentVo);

        // 添加定金
        FinanceDownPaymentVo financeDownPaymentVo1 = new FinanceDownPaymentVo();
        financeDownPaymentVo1.setFdp_sn(AppUtil.getOrderCode(400));
        financeDownPaymentVo1.setFdp_status(AppConfig.fdp_status_1);
        financeDownPaymentVo1.setHi_code(houseInfo.getHi_code());
        financeDownPaymentVo1.setCc_code(cc_code);
        financeDownPaymentVo1.setUser_id(null);
        financeDownPaymentVo1.setFdp_amount(pay_money);
        financeDownPaymentVo1.setOrder_sn(order_sn);
        financeDownPaymentVo1.setFdp_invaild_day(reserve_day);
        financeDownPaymentVo1.setFdp_create_time(new Date());
        financeDownPaymentVo1.setFdp_invaild_time(AppUtil.addDate(financeDownPaymentVo1.getFdp_create_time(), Calendar.DAY_OF_MONTH, reserve_day));
        this.addFinanceDownPayment(financeDownPaymentVo1);

        // 【添加订单明细】
        OrderDetailVo orderDetailVo = new OrderDetailVo();
        orderDetailVo.setOrder_sn(order_sn);
        orderDetailVo.setDetail_status(1);
        orderDetailVo.setDetail_type(AppConfig.detail_type_1);
        orderDetailVo.setDetail_balpay(AppConfig.balPay_1);
        orderDetailVo.setProduct_sn(houseInfo.getHi_code());
        orderDetailVo.setProduct_type(order_type);
        orderDetailVo.setProduct_name("定金-" + houseInfo.getHouse_address());
        orderDetailVo.setProduct_price(pay_money);
        orderDetailVo.setProduct_number(1);
        orderDetailVo.setDetail_subtotal(pay_money);
        orderDetailVo.setDetail_remarks(null);
        orderDetailVo.setDetail_create_time(new Date());
        this.addOrderDetail(orderDetailVo);

        // 【添加订单】
        OrderVo orderVo = new OrderVo();
        orderVo.setOrder_sn(order_sn);
        orderVo.setOrder_type(order_type);
        orderVo.setOrder_channel(channel);
        orderVo.setOrder_title(orderDetailVo.getProduct_name());
        orderVo.setOrder_con_code(null);
        orderVo.setOrder_hi_code(houseInfo.getHi_code());
        orderVo.setOrder_balpay(AppConfig.balPay_1);
        orderVo.setOrder_ucc_id(1);
        orderVo.setTrade_object(AppConfig.trade_object_4);
        orderVo.setTrade_cc_code(cc_code);
        orderVo.setTrade_user_id(null);
        orderVo.setOrder_status(AppConfig.order_status_2);
        orderVo.setDetail_count(0);
        orderVo.setDetail_amount_total(0.0);
        orderVo.setDetail_amount_coupon(0.0);
        orderVo.setRecharge_amount_give(0.0);
        orderVo.setOrder_balance_deduction(0.0);
        orderVo.setOrder_amount_total(0.0);
        orderVo.setOrder_amount_pay(0.0);
        orderVo.setPay_sn(bill_sn);
        orderVo.setOrder_create_time(new Date());
        this.addOrder(orderVo);

        // 更新订单金额
        this._updatePayOrderForAmount(order_sn);

        return this.queryOrder(order_sn);
    }

    /**
     * 提交服务支付
     *
     * @param customer 用户信息
     * @param json     支付参数
     * @return
     * @throws Exception
     * @author JiangQt
     * @version 2017年7月7日下午5:40:34
     */
    public OrderVo _submitPayService(UserCustomer customer, JSONObject json) throws Exception {
        // 订单类型
        int order_type = AppConfig.order_type_2;
        // 渠道
        Integer channel = json.getInteger("channel");
        // 支付金额
        double pay_money = json.getDoubleValue("pay_money");
        // 支付方式
        String pay_channel = json.getString("pay_channel");

        /* -[自定义参数]--------------------------------------------- */

        // 产品号
        String hi_code = json.getString("hi_code");

        /* -END----------------------------------------------------- */

        // 验证参数
        if (StringUtils.isEmpty(channel) || StringUtils.isEmpty(pay_channel)) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }
        // 获取房源数据
        ViewHouseLibraryInfoVo houseInfo = houseLibraryService.queryHouseLibraryInfo(hi_code);
        if (houseInfo == null) {
            throw new AppException("没有发现该房源");
        }

        // 订单号
        String order_sn = AppUtil.getOrderSN(order_type);

        // 【添加订单明细】
        OrderDetailVo orderDetailVo = new OrderDetailVo();
        orderDetailVo.setOrder_sn(order_sn);
        orderDetailVo.setDetail_type(AppConfig.detail_type_1);
        orderDetailVo.setDetail_balpay(AppConfig.balPay_1);
        orderDetailVo.setProduct_sn(houseInfo.getHi_code());
        orderDetailVo.setProduct_type(order_type);
        orderDetailVo.setProduct_name("服务费-" + houseInfo.getHouse_address());
        orderDetailVo.setProduct_price(pay_money);
        orderDetailVo.setProduct_number(1);
        orderDetailVo.setDetail_subtotal(pay_money);
        orderDetailVo.setDetail_remarks(null);
        orderDetailVo.setDetail_create_time(new Date());
        this.addOrderDetail(orderDetailVo);

        // 【添加订单】
        OrderVo orderVo = new OrderVo();
        orderVo.setOrder_sn(order_sn);
        orderVo.setOrder_type(order_type);
        orderVo.setOrder_channel(channel);
        orderVo.setOrder_title(orderDetailVo.getProduct_name());
        orderVo.setOrder_hi_code(houseInfo.getHi_code());
        orderVo.setOrder_balpay(AppConfig.balPay_1);
        orderVo.setOrder_ucc_id(1);
        orderVo.setTrade_cc_code(customer.getCc_code());
        orderVo.setTrade_user_id(null);
        orderVo.setOrder_status(AppConfig.order_status_2);
        orderVo.setPay_sn(null);
        orderVo.setPay_channel(null);
        orderVo.setOrder_remarks(null);
        orderVo.setOrder_create_time(new Date());
        this.addOrder(orderVo);

        // 更新订单金额
        this._updatePayOrderForAmount(order_sn);

        return orderVo;
    }

    /**
     * 提交公共支付
     *
     * @param channel
     * @param order_sn    订单号
     * @param pay_channel 支付渠道
     * @param user_ip     用户ip
     * @return
     * @throws Exception
     */
    public OrderBillVo _requestPay(Integer channel, String order_sn, String pay_channel, String user_ip) throws Exception {
        // 【验证参数】
        if (StringUtils.isEmpty(order_sn) || StringUtils.isEmpty(pay_channel)) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 【订单数据】
        OrderVo orderVo = this.queryOrder(order_sn);
        if (orderVo == null) {
            throw new AppException("没有发现订单，请重试");
        }
        switch (orderVo.getOrder_status()) {
            case AppConfig.order_status_1:
                if (channel != AppConfig.channel_erp_pc) {
                    throw new AppException("订单未出账，无法付款");
                }
                break;
            case AppConfig.order_status_2:
                break;
            case AppConfig.order_status_3:
                throw new AppException("订单已付款，无法重复付款");
            case AppConfig.order_status_4:
                throw new AppException("订单已关闭，无法付款");
            default:
                throw new AppException("订单异常");
        }

        // ->处理流水数据
        if (!StringUtils.isEmpty(orderVo.getPay_sn())) {
            OrderBillVo orderBillVo = this.queryOrderBill(orderVo.getPay_sn());
            if (orderBillVo != null) {
                switch (orderBillVo.getBill_status()) {
                    case AppConfig.bill_status_1:
                        String trade_code = orderBillVo.getBill_trade_code();
                        Msg<Object> tradeQuery;
                        try {
                            switch (orderBillVo.getBill_pay_channel()) {
                                case AppConfig.bill_pay_channel_zfb:
                                    tradeQuery = AliPay.alipayTradeQuery(trade_code);
                                    if (tradeQuery == null || tradeQuery.getCode() != Msg.CODE_SUCCESS) {
                                        AliPay.alipayTradeClose(trade_code);
                                    }
                                    break;
                                case AppConfig.bill_pay_channel_wx:
                                    tradeQuery = WeixinPay.weixinTradeQuery(trade_code);
                                    if (tradeQuery == null || tradeQuery.getCode() != Msg.CODE_SUCCESS) {
                                        WeixinPay.weixinTradeClose(trade_code);
                                    }
                                    break;
                            }
                        } catch (Exception e) {
                            System.out.println(e.getMessage());
                        }
                        // 响应支付请求
                        this._responsePayResult(trade_code);
                        break;
                    case AppConfig.bill_status_2:
                        throw new AppException("该订单已支付");
                    case AppConfig.bill_status_3:
                        break;
                }
            }
        }

        double order_amount_pay = orderVo.getOrder_amount_pay();
        if (order_amount_pay == 0) {
            pay_channel = "现金";
        }

        // 【添加流水】
        OrderBillVo orderBillVo = new OrderBillVo();
        orderBillVo.setBill_sn(AppUtil.getBillSN(orderVo.getOrder_type()));
        orderBillVo.setBill_trade_code(AppUtil.getTradeCode(orderBillVo.getBill_sn()));
        orderBillVo.setBill_trans_sn(null);
        orderBillVo.setBill_channel(channel);
        orderBillVo.setCc_code(orderVo.getTrade_cc_code());
        orderBillVo.setUser_id(orderVo.getTrade_user_id());
        orderBillVo.setBill_type(orderVo.getOrder_balpay());
        orderBillVo.setBill_title(orderVo.getOrder_title());
        orderBillVo.setBill_pay_cc_code(orderVo.getTrade_cc_code());
        orderBillVo.setBill_pay_user_id(null);
        orderBillVo.setBill_pay_channel(pay_channel);
        orderBillVo.setBill_pay_total(orderVo.getOrder_amount_pay());
        orderBillVo.setBill_pay_deduction(0.0);
        orderBillVo.setBill_pay_amount(orderVo.getOrder_amount_pay());
        orderBillVo.setBill_status(AppConfig.bill_status_1);
        orderBillVo.setBill_pay_time(null);
        orderBillVo.setBill_check_status(1);
        orderBillVo.setBill_check_time(null);
        orderBillVo.setBill_remarks(null);
        orderBillVo.setBill_ip(user_ip);
        orderBillVo.setBill_create_time(new Date());
        orderBillVo.setBill_invalid_time(AppUtil.getCalendar(orderBillVo.getBill_create_time(), Calendar.MINUTE, 2).getTime());
        this.addOrderBill(orderBillVo);

        // 更新订单，更新订单支付数据
        OrderVo orderVo1 = new OrderVo();
        orderVo1.setOrder_id(orderVo.getOrder_id());
        orderVo1.setPay_sn(orderBillVo.getBill_sn());
        this.updateOrder(orderVo1);

        return orderBillVo;
    }

    /**
     * 请求支付宝支付
     *
     * @param trade_code 商户号
     * @param title      标题
     * @param pay_price  支付金额
     * @param user_ip    用户IP
     * @return
     * @throws AlipayApiException
     * @throws AppException
     */
    public Msg<Object> _requestPayForAli(String trade_code, String title, String pay_price, String user_ip, String notify_url) throws Exception {
        Msg<Object> msg = new Msg<>();
        Msg<Object> tradePrecreate = AliPay.alipayTradePrecreate(trade_code, pay_price, title, null, notify_url);
        if (tradePrecreate.getCode() != 200) {
            throw new AppException(tradePrecreate.getMsg());
        }
        msg.put(tradePrecreate.getJson());
        return msg;
    }

    /**
     * 请求微信支付
     *
     * @param trade_code 商户号
     * @param title      标题
     * @param pay_price  支付金额
     * @param user_ip    用户IP
     * @return
     * @throws AlipayApiException
     * @throws AppException
     */
    public Msg<Object> _requestPayForWeixin(String trade_code, String title, String pay_price, String user_ip, String notify_url) throws Exception {
        Msg<Object> msg = new Msg<>();
        Msg<Object> precreateScanCode = WeixinPay.weixinTradePrecreateScanCode(trade_code, title, "", pay_price, user_ip, notify_url);
        if (precreateScanCode.getCode() != 200) {
            throw new AppException(precreateScanCode.getMsg());
        }
        msg.put(precreateScanCode.getJson());
        return msg;
    }

    /**
     * 请求现金支付
     *
     * @param trade_code 流水号
     * @param title      标题
     * @param pay_price  支付金额
     * @return
     */
    public Msg<Object> _requestPayForBalance(String trade_code, String title, String pay_price) {
        Msg<Object> msg = new Msg<>();
        msg.put("trade_code", trade_code);
        msg.put("title", title);
        msg.put("subtitle", "");
        msg.put("pay_price", pay_price);

        // 直接响应支付结果
        this._responsePayResult(trade_code);

        return msg;
    }

    /**
     * 请求现金支付
     *
     * @param bill_sn     流水号
     * @param pay_date    支付时间
     * @param pay_remarks 支付备注
     * @param employee
     * @return
     */
    public Msg<Object> _requestPayResult(String bill_sn, String pay_date, String pay_remarks, UserCenterEmployee employee) throws AppException {
        // 流水信息
        OrderBillVo orderBillVo = this.queryOrderBill(bill_sn);
        if (orderBillVo == null) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 直接响应支付结果
        Msg<Object> msg = this._responsePayResult(orderBillVo.getBill_trade_code());
        if (msg.getCode() == Msg.CODE_SUCCESS) {
            // 重新获取流水信息
            orderBillVo = this.queryOrderBill(bill_sn);
            if (orderBillVo != null && orderBillVo.getBill_status() == AppConfig.bill_status_2) {
                if (!StringUtils.isEmpty(pay_date)) {
                    try {
                        Date parse_pay_date = AppUtil.sdf_date.parse(pay_date);

                        // 更新流水
                        OrderBillVo orderBillVo1 = new OrderBillVo();
                        orderBillVo1.setBill_id(orderBillVo.getBill_id());
                        orderBillVo1.setBill_pay_time(parse_pay_date);
                        orderBillVo1.setBill_operator(employee.getEm_id());
                        this.updateOrderBill(orderBillVo1);

                        // 更新订单
                        OrderVo orderVo = new OrderVo();
                        orderVo.setPay_sn(orderBillVo.getBill_sn());
                        orderVo = this.queryOrder(orderVo);
                        if (orderVo != null) {
                            OrderVo orderVo1 = new OrderVo();
                            orderVo1.setOrder_id(orderVo.getOrder_id());
                            orderVo1.setPay_time(parse_pay_date);
                            this.updateOrder(orderVo1);

                            // 更新合同账单
                            List<OrderDetailVo> orderDetailList = this.queryOrderDetailList(orderVo.getOrder_sn());
                            for (OrderDetailVo orderDetailVo : orderDetailList) {
                                if (orderDetailVo.getProduct_sn() != null) {
                                    ContractBillVo contractBillVo = new ContractBillVo();
                                    contractBillVo.setBcb_code(orderDetailVo.getProduct_sn());
                                    contractBillVo.setBcb_realPaymentDate(parse_pay_date);
                                    financeManageService.updateFinanceBill(contractBillVo);
                                }
                            }
                        }
                    } catch (ParseException e) {
                        System.out.println(e.getMessage());
                    }
                }
                if (!StringUtils.isEmpty(pay_remarks)) {
                    // 更新流水
                    OrderBillVo orderBillVo1 = new OrderBillVo();
                    orderBillVo1.setBill_id(orderBillVo.getBill_id());
                    orderBillVo1.setBill_remarks(pay_remarks);
                    this.updateOrderBill(orderBillVo1);
                }
            }
        }
        return msg;
    }

    /**
     * 响应支付结果
     *
     * @param trade_code 商户订单号
     * @return
     * @throws Exception
     * @author JiangQt
     * @version 2017年6月23日下午4:15:38
     */
    public Msg<Object> _responsePayResult(String trade_code) {
        Msg<Object> msg = new Msg<>();
        // 获取流水信息
        OrderBillVo orderBillVo = new OrderBillVo();
        orderBillVo.setBill_trade_code(trade_code);
        orderBillVo = this.queryOrderBill(orderBillVo);
        if (orderBillVo == null) {
            return msg.setMsg(Msg.CODE_FAIL, "没有发现账单");
        }
        if (orderBillVo.getBill_status() == AppConfig.bill_status_2) {
            return msg.setMsg(Msg.CODE_FAIL, "交易已支付");
        }

        // 获取支付平台订单
        Msg<Object> tradeQuery = null;
        switch (orderBillVo.getBill_pay_channel()) {
            case "支付宝":
                try {
                    tradeQuery = AliPay.alipayTradeQuery(trade_code);
                } catch (AppException e) {
                    log.info(e.getMessage());
                }
                break;
            case "微信":
                try {
                    tradeQuery = WeixinPay.weixinTradeQuery(trade_code);
                } catch (AppException e) {
                    log.info(e.getMessage());
                }
                break;
            default:
                tradeQuery = new Msg<>();
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("trade_no", AppUtil.sdf_time_stamp.format(new Date()) + orderBillVo.getBill_sn());
                jsonObject.put("trade_money", orderBillVo.getBill_pay_amount());
                jsonObject.put("trade_time", AppUtil.sdf_time.format(new Date()));
                tradeQuery.setJson(jsonObject);
                break;
        }
        // 更新充值流水->等待支付
        if (tradeQuery != null && tradeQuery.getCode() == Msg.CODE_WAITING) {
            return msg.setMsg(Msg.CODE_FAIL, tradeQuery.getMsg());
        }
        // 更新充值流水->已支付
        else if (tradeQuery != null && tradeQuery.getCode() == Msg.CODE_SUCCESS) {
            JSONObject json = tradeQuery.getJson();
            // 交易号
            String trade_no = json.getString("trade_no");
            // 支付金额
            double total_money = json.getDoubleValue("trade_money");
            // 交易时间
            Date notify_time = json.getDate("trade_time");

            // 通过交易号查询流水
            OrderBillVo orderBillVo0 = new OrderBillVo();
            orderBillVo0.setBill_trans_sn(trade_no);
            orderBillVo0 = this.queryOrderBill(orderBillVo0);
            if (orderBillVo0 != null) return msg;

            // 支付金额
            double pay_price = orderBillVo.getBill_pay_amount();
            // 验证金额是否一致
            if (pay_price != total_money) {
                return msg.setMsg(Msg.CODE_FAIL, "支付金额与实际金额不一致");
            }

            // 【支付成功，改变流水状态】
            OrderBillVo orderBillVo2 = new OrderBillVo();
            orderBillVo2.setBill_id(orderBillVo.getBill_id());
            orderBillVo2.setBill_trans_sn(trade_no);
            orderBillVo2.setBill_status(AppConfig.bill_status_2);
            orderBillVo2.setBill_pay_time(notify_time);
            this.updateOrderBill(orderBillVo2);

            // 查询订单信息
            OrderVo orderVo2 = new OrderVo();
            orderVo2.setPay_sn(orderBillVo.getBill_sn());
            List<OrderVo> orderList1 = this.queryOrderList(orderVo2);
            for (OrderVo orderVo : orderList1) {
                // 【改变订单状态】
                OrderVo orderVo3 = new OrderVo();
                orderVo3.setOrder_id(orderVo.getOrder_id());
                orderVo3.setOrder_status(AppConfig.order_status_3);
                orderVo3.setPay_channel(orderBillVo.getBill_pay_channel());
                orderVo3.setPay_time(notify_time);
                this.updateOrder(orderVo3);

                // 重新获取订单信息
                orderVo = this.queryOrder(orderVo.getOrder_sn());
                // 重新获取流水信息
                orderBillVo = this.queryOrderBill(orderBillVo.getBill_sn());

                switch (orderVo.getOrder_type()) {
                    case AppConfig.order_type_1:
                        this._updatePayAfterRent(orderVo, orderBillVo);
                        break;
                    case AppConfig.order_type_2:
                        this._updatePayAfterService(orderVo, orderBillVo, "success");
                        break;
                    case AppConfig.order_type_3:
                        // this._updatePayAfterBalance(orderVo, orderBillVo);
                        break;
                    case AppConfig.order_type_4:
                        this._updatePayAfterDownPayment(orderVo, orderBillVo, "success");
                        break;
                }
            }
        }
        // 更新充值流水->关闭
        else {
            // 更新流水->关闭
            OrderBillVo orderBillVo1 = new OrderBillVo();
            orderBillVo1.setBill_id(orderBillVo.getBill_id());
            orderBillVo1.setBill_status(AppConfig.bill_status_3);
            this.updateOrderBill(orderBillVo1);

            // 支付平台订单->关闭
            if ("支付宝".equals(orderBillVo.getBill_pay_channel())) {
                try {
                    AliPay.alipayTradeClose(trade_code);
                } catch (AppException e) {
                    System.out.println("订单关闭失败");
                    e.printStackTrace();
                }
            }
            // 微信平台订单->关闭
            if ("微信".equals(orderBillVo.getBill_pay_channel())) {
                try {
                    WeixinPay.weixinTradeClose(trade_code);
                } catch (AppException e) {
                    System.out.println("订单关闭失败");
                    e.printStackTrace();
                }
            }

            // 更新订单->关闭
            OrderVo orderVo1 = new OrderVo();
            orderVo1.setPay_sn(orderBillVo.getBill_sn());
            List<OrderVo> orderList = this.queryOrderList(orderVo1);
            for (OrderVo orderVo : orderList) {
                switch (orderVo.getOrder_type()) {
                    case AppConfig.order_type_2: // 结算订单
                        this._updatePayAfterService(orderVo, orderBillVo, "fail");
                        break;
                    case AppConfig.order_type_4: // 定金
                        // 更新订单
                        OrderVo orderVo4 = new OrderVo();
                        orderVo4.setOrder_id(orderVo.getOrder_id());
                        orderVo4.setOrder_status(AppConfig.order_status_4);
                        this.updateOrder(orderVo4);

                        // 更新支付之后更新定金相关数据
                        this._updatePayAfterDownPayment(orderVo, orderBillVo, "fail");
                        break;
                    case AppConfig.order_type_5: // 充值
                        // 更新订单
                        OrderVo orderVo3 = new OrderVo();
                        orderVo3.setOrder_id(orderVo.getOrder_id());
                        orderVo3.setOrder_status(AppConfig.order_status_4);
                        this.updateOrder(orderVo3);
                        break;
                }
            }
        }
        return msg;
    }

    /**
     * 更新支付-租金
     *
     * @param orderVo
     * @param orderBillVo
     * @return
     */
    private boolean _updatePayAfterRent(OrderVo orderVo, OrderBillVo orderBillVo) {
        // 合同订单数据
        ContractOrderVo contractOrderVo = null;
        // 合同订单号
        String bco_code = null;
        // 合同账单期数
        int bcb_cycle = -1;

        // 查询订单明细
        List<OrderDetailVo> orderDetailList = this.queryOrderDetailList(orderVo.getOrder_sn());
        if (orderDetailList == null) {
            return false;
        }
        for (OrderDetailVo orderDetailVo : orderDetailList) {
            switch (orderDetailVo.getDetail_type()) {
                case AppConfig.detail_type_1:
                    switch (orderDetailVo.getProduct_type()) {
                        // 合同租金
                        case AppConfig.product_type_1:
                            if (!StringUtils.isEmpty(orderDetailVo.getProduct_sn())) {
                                // 更新合同分期账单->已支付
                                ContractBillVo contractBillVo0 = financeManageService.queryFinanceBill(orderDetailVo.getProduct_sn());
                                if (contractBillVo0 != null) {
                                    BigDecimal bcb_repayment = StringUtils.isEmpty(contractBillVo0.getBcb_repayment()) ? new BigDecimal(0) : contractBillVo0.getBcb_repayment();
                                    BigDecimal bcb_realPayment = StringUtils.isEmpty(contractBillVo0.getBcb_realPayment()) ? new BigDecimal(0) : contractBillVo0.getBcb_realPayment();
                                    bcb_realPayment = bcb_realPayment.add(new BigDecimal(orderDetailVo.getDetail_subtotal()));
                                    BigDecimal bcb_balance = bcb_repayment.subtract(bcb_realPayment);

                                    ContractBillVo contractBillVo = new ContractBillVo();
                                    contractBillVo.setBcb_id(contractBillVo0.getBcb_id());
                                    contractBillVo.setBcb_realPayment(bcb_realPayment);
                                    contractBillVo.setBcb_realPaymentDate(orderBillVo.getBill_pay_time());
                                    contractBillVo.setBcb_balance(bcb_balance);
                                    contractBillVo.setBcb_state(AppConfig.order_option_state_3);
                                    financeManageService.updateFinanceBill(contractBillVo);
                                }
                                // 更新合同租金分期账单->已支付
                                ContractBillInstalmentVo contractBillStage = financeManageService.queryContractBillInstalment(orderDetailVo.getProduct_sn());
                                if (contractBillStage != null) {
                                    ContractBillInstalmentVo contractBillInstalmentVo = new ContractBillInstalmentVo();
                                    contractBillInstalmentVo.setCbs_id(contractBillStage.getCbs_id());
                                    contractBillInstalmentVo.setCbs_realPayment(contractBillStage.getCbs_repayment());
                                    contractBillInstalmentVo.setCbs_realPaymentDate(orderBillVo.getBill_pay_time());
                                    contractBillInstalmentVo.setCbs_status(AppConfig.order_option_state_3);
                                    financeManageService.updateContractBillInstalment(contractBillInstalmentVo);

                                    // 如果是分期的最后一期，则计算合同账单数据
                                    if (Objects.equals(contractBillStage.getCbs_cycle(), contractBillStage.getCbs_cycle_total())) {
                                        ContractBillVo contractBillVo = new ContractBillVo();
                                        contractBillVo.setBco_code(contractBillStage.getBco_code());
                                        contractBillVo.setBcb_cycle(contractBillStage.getBcb_cycle());
                                        List<ContractBillVo> contractBillList = financeManageService.queryFinanceBillList(contractBillVo);
                                        for (ContractBillVo billVo : contractBillList) {
                                            ContractBillVo contractBillVo1 = new ContractBillVo();
                                            contractBillVo1.setBcb_id(billVo.getBcb_id());
                                            contractBillVo1.setBcb_state(AppConfig.bcb_state_3);
                                            contractBillVo1.setBcb_realPayment(billVo.getBcb_repayment());
                                            contractBillVo1.setBcb_realPaymentDate(orderBillVo.getBill_pay_time());
                                            financeManageService.updateFinanceBill(contractBillVo1);
                                        }
                                    }
                                }
                            }
                            break;
                    }
                    JSONObject detailJson = JSONObject.parseObject(orderDetailVo.getProduct_detail());
                    if (detailJson != null) {
                        bco_code = detailJson.getString("bco_code");
                        bcb_cycle = detailJson.getIntValue("bcb_cycle");
                    }
                    break;
            }

            switch (orderDetailVo.getProduct_type()) {
                case AppConfig.product_type_4:
                    // 更新定金：已使用
                    if (!StringUtils.isEmpty(orderDetailVo.getProduct_sn())) {
                        FinanceDownPaymentVo financeDownPaymentVo = new FinanceDownPaymentVo();
                        financeDownPaymentVo.setOrder_sn(orderDetailVo.getOrder_sn());
                        financeDownPaymentVo = financeManageService.queryFinanceDownPayment(financeDownPaymentVo);
                        if (financeDownPaymentVo != null) {
                            FinanceDownPaymentVo financeDownPaymentVo1 = new FinanceDownPaymentVo();
                            financeDownPaymentVo1.setFdp_id(financeDownPaymentVo.getFdp_id());
                            financeDownPaymentVo1.setCon_code(orderVo.getOrder_con_code());
                            financeDownPaymentVo1.setFdp_status(AppConfig.fdp_status_3);
                            financeManageService.updateFinanceDownPayment(financeDownPaymentVo1);
                        }
                    }
                    break;
            }
            // TODO 添加押金
            System.out.println();
        }

        // 获取合同订单数据
        if (bco_code != null) {
            contractOrderVo = financeManageService.queryFinanceOrder(bco_code);
        }

        // 后续处理
        if (contractOrderVo != null) {
            // 获取合同数据
            ContractInfoVo contractInfoVo = contractService.queryContractInfo(contractOrderVo.getContractObject_code());
            // 验证是否为首期账单
            ContractBillVo contractBillVo = new ContractBillVo();
            contractBillVo.setBco_code(bco_code);
            int min_cycle = financeManageService.queryFinanceBillForMinCycle(contractBillVo);
            if (bcb_cycle == min_cycle && AppConfig.TYPE_CONTRACT_202.equals(contractInfoVo.getContractObject_Type())) {
                // 更新合同
                ContractObjectVo contractObjectVo = new ContractObjectVo();
                contractObjectVo.setContractObject_Code(contractOrderVo.getContractObject_code());
                contractObjectVo.setContractObject_OptionState(AppConfig.contract_optionstate_102);
                contractService.updateContractObject(contractObjectVo);
            }

            // 更新合同订单
            financeManageService.updateFinanceOrderBillData(bco_code);

            if (bcb_cycle == min_cycle) {
                /* 发送合同短信 */
                try {
                    // 获取房源数据
                    ViewHouseLibraryInfoVo houseInfo = houseLibraryService.queryHouseLibraryInfo(contractOrderVo.getHi_code());
                    // 赋值参数
                    String cc_phone = contractInfoVo.getCcp_phone();
                    String cc_name = contractInfoVo.getCc_name();
                    String con_no = contractInfoVo.getContractObject_No();
                    String con_type = contractInfoVo.getContractObject_Type();
                    String con_startEndDate = AppUtil.sdf_date.format(contractInfoVo.getContractObject_Date()) + "~" + AppUtil.sdf_date.format(contractInfoVo.getContractObject_DeadlineTime());
                    String con_payStyle = contractInfoVo.getContractBody_PayStyle();
                    String con_rent = contractInfoVo.getContractBody_Rent() + "";
                    String house_address = houseInfo.getHouse_address();
                    String em_phone = contractInfoVo.getEm_phone();
                    // 发送短信
                    if (AppConfig.TYPE_CONTRACT_201.equals(contractInfoVo.getContractObject_Type())) {
                        new Thread(() -> {
                            SmsUtil.sendCusContractSMS(cc_phone, con_type, cc_name, house_address, con_no, con_startEndDate, con_payStyle, con_rent);
                            SmsUtil.sendEmpContractSMS(em_phone, con_type, house_address, con_no, con_startEndDate, con_payStyle, con_rent);
                        }).start();
                    }
                    if (AppConfig.TYPE_CONTRACT_202.equals(contractInfoVo.getContractObject_Type())) {
                        new Thread(() -> {
                            SmsUtil.sendCusContractSMS(cc_phone, con_type, cc_name, house_address, con_no, con_startEndDate, con_payStyle, con_rent);
                            SmsUtil.sendEmpContractSMS(em_phone, con_type, house_address, con_no, con_startEndDate, con_payStyle, con_rent);
                        }).start();
                    }
                    log.info("[信息]发送合同短信成功");
                } catch (Exception e) {
                    log.info("[信息]发送合同短信失败");
                }
            }


            /* 发送租金短信 */
            try {
                // 获取房源数据
                ViewHouseLibraryInfoVo houseInfo = houseLibraryService.queryHouseLibraryInfo(contractOrderVo.getHi_code());
                // 获取合同数据
//                // 获取合同数据
//                ContractObjectVo contractInfoVo = contractService.queryContractObject(contractOrderVo.getContractObject_code());
//                // 获取客户信息
//                UserCustomer customer = customerService.queryCustomerInfo(contractInfoVo.getContractObject_1st());
//                // 获取管家信息
//                ViewBusinessContractRelaEmpVo contractRelaEmpVo = new ViewBusinessContractRelaEmpVo();
//                contractRelaEmpVo.setContractObject_Id(contractInfoVo.getContractObject_Id());
//                List<ViewBusinessContractRelaEmpVo> contractRelaEmpVoList = contractService.queryViewContractRelaEmp(contractRelaEmpVo);
//                for (ViewBusinessContractRelaEmpVo relaEmpVo : contractRelaEmpVoList) {
//                    if (relaEmpVo.getCre_role() == 1) {
//                        contractRelaEmpVo.setEm_phone(relaEmpVo.getEm_phone());
//                    }
//                }

                // 赋值参数
                String con_type = contractInfoVo.getContractObject_Type();
                String house_address = houseInfo.getHouse_address();
                String cc_phone = contractInfoVo.getCcp_phone();
                String cc_name = contractInfoVo.getCc_name();
                String cycle = bcb_cycle + "";
                String money = orderBillVo.getBill_pay_total().toString();
                String em_phone = contractInfoVo.getEm_phone();

                // 发送短信
                new Thread(() -> {
                    // [至客户]
                    SmsUtil.sendCusRentSMS(cc_phone, con_type, house_address, cc_name, cycle, money);
                    // [至管家]
                    SmsUtil.sendEmpRentSMS(em_phone, con_type, house_address, cc_name, cycle, money);
                }).start();
                log.info("[信息]发送合同短信成功");
            } catch (Exception e) {
                log.info("[信息]发送合同短信失败");
            }
        }
        return true;
    }

    /**
     * 更新支付-服务
     *
     * @param orderVo
     * @param orderBillVo
     * @param result
     */
    private boolean _updatePayAfterService(OrderVo orderVo, OrderBillVo orderBillVo, String result) {
        switch (result) {
            case "success":
                // 支付宝、微信支付回调，更新服务费用订单等相关数据
                ServicePayMoneyVo servicePayMoneyVo = new ServicePayMoneyVo();
                servicePayMoneyVo.setCc_code(orderVo.getTrade_cc_code());
                servicePayMoneyVo.setOrder_sn(orderVo.getOrder_sn());
                servicePayMoneyVo.setUser_id(orderVo.getTrade_user_id());
                servicePayMoneyVo = serviceDao.queryServicePayMoneyInfo(servicePayMoneyVo);
                if (servicePayMoneyVo == null) return false;

                // 更新跟进
                ServiceProcessVo serviceProcessVo = new ServiceProcessVo();
                serviceProcessVo.setSo_id(servicePayMoneyVo.getSo_id());
                serviceProcessVo.setSpro_state(AppConfig.spro_state_1);
                serviceProcessVo.setSpro_followState(AppConfig.so_state_3232);
                serviceProcessVo.setSpro_remarks("确认费用");
                serviceDao.updataServiceProcess(serviceProcessVo);

                // 更新账单
                // TODO 更新服务费用清单为已生成订单状态
                ServiceMoney serviceMoney = new ServiceMoney();
                serviceMoney.setSo_id(servicePayMoneyVo.getSo_id());
                serviceMoney.setIs_order(1);
                serviceDao.updateServiceMoney(serviceMoney);

                // TODO 更新账单
                if (orderBillVo != null) {
                    orderBillVo.setBill_status(AppConfig.bill_status_2);
                    orderBillVo.setBill_pay_time(new Date());
                    orderDao.updateOrderBill(orderBillVo);
                }
                // 添加记录
                try {
                    serviceService.addServiceRecordBo(servicePayMoneyVo.getSo_id(), AppConfig.so_state_3232, 0, null);
                } catch (AppException e) {
                    e.printStackTrace();
                }
                int st_moneyBool = servicePayMoneyVo.getSt_moneyBool();
                double deductMoney = 0.0;
                double discountMoney;
                double annulMoney;
                double reallyMoney;

                // 初始服务费
                Double init_serveMoney = servicePayMoneyVo.getInit_serveMoney();
                // 剩余服务费
                Double surplus_serveMoney = servicePayMoneyVo.getSurplus_serveMoney();
                // 可用剩余服务费
                Double available_serveMoney = servicePayMoneyVo.getAvailable_serveMoney();
                // 本次应支付费用
                Double shallMoney = orderVo.getDetail_amount_total();
                // 总费用
                double totalMoney = servicePayMoneyVo.getSo_totalMoney();
                // 允许从服务费中扣除
                if (1 == st_moneyBool) {
                    // 还有可用剩余服务费
                    if (null != available_serveMoney) {
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
                            serviceCharge.setSurplus_serveMoney(new BigDecimal((available_serveMoney)).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                            //serviceCharge.setAvailable_serveMoney(new BigDecimal((available_serveMoney - shallMoney)).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                            serviceService.modifyServiceMoney(serviceCharge);

                            // 添加服务费扣除记录
                            ServiceChargeRecord serviceChargeRecord = new ServiceChargeRecord();
                            serviceChargeRecord.setSo_id(servicePayMoneyVo.getSo_id());
                            serviceChargeRecord.setService_charge(shallMoney);
                            serviceChargeRecord.setDiscount(new BigDecimal((annulMoney + discountMoney)).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());// 减免加折扣
                            serviceChargeRecord.setCon_code(servicePayMoneyVo.getCon_code());
                            serviceChargeRecord.setCc_code(servicePayMoneyVo.getCc_code());
                            serviceChargeRecord.setHi_code(servicePayMoneyVo.getHi_code());
                            serviceService.appAddServiceChargeRecord(serviceChargeRecord);
                        } else {
                            // 抵扣费用
                            deductMoney = available_serveMoney;
                            // 折扣费用
                            discountMoney = (shallMoney - available_serveMoney) / 2;
                            // 减免费用
                            annulMoney = totalMoney - shallMoney;
                            // 实际支付费用
                            reallyMoney = (shallMoney - available_serveMoney) / 2;

                            // 更新剩余服务费用
                            ServiceCharge serviceCharge = new ServiceCharge();
                            serviceCharge.setS_id(servicePayMoneyVo.getS_id());
                            serviceCharge.setUsed_serveMoney(new BigDecimal(init_serveMoney).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                            serviceCharge.setSurplus_serveMoney(new BigDecimal((available_serveMoney)).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());
                            //serviceCharge.setAvailable_serveMoney(0.00);
                            serviceService.modifyServiceMoney(serviceCharge);

                            // 添加服务费扣除记录
                            ServiceChargeRecord serviceChargeRecord = new ServiceChargeRecord();
                            serviceChargeRecord.setSo_id(servicePayMoneyVo.getSo_id());
                            serviceChargeRecord.setService_charge(reallyMoney);
                            serviceChargeRecord.setDiscount(new BigDecimal((totalMoney - reallyMoney + 0.00)).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue());// 减免加折扣
                            serviceChargeRecord.setCon_code(servicePayMoneyVo.getCon_code());
                            serviceChargeRecord.setCc_code(servicePayMoneyVo.getCc_code());
                            serviceChargeRecord.setHi_code(servicePayMoneyVo.getHi_code());
                            serviceService.appAddServiceChargeRecord(serviceChargeRecord);
                        }
                    }
                }
                break;
            case "fail":
                // TODO 待操作
                break;
        }
        return true;
    }

    /**
     * 更新支付-定金
     *
     * @param orderVo
     * @param orderBillVo
     * @param result
     * @return
     */
    private boolean _updatePayAfterDownPayment(OrderVo orderVo, OrderBillVo orderBillVo, String result) {
        String hi_code = null;
        // 查询定金
        FinanceDownPaymentVo financeDownPaymentVo = new FinanceDownPaymentVo();
        financeDownPaymentVo.setOrder_sn(orderVo.getOrder_sn());
        financeDownPaymentVo = financeManageService.queryFinanceDownPayment(financeDownPaymentVo);
        if (financeDownPaymentVo == null) return false;
        switch (result) {
            case "success":
                // 更新定金
                FinanceDownPaymentVo financeDownPaymentVo1 = new FinanceDownPaymentVo();
                financeDownPaymentVo1.setFdp_id(financeDownPaymentVo.getFdp_id());
                financeDownPaymentVo1.setFdp_status(AppConfig.fdp_status_2);
                financeManageService.updateFinanceDownPayment(financeDownPaymentVo1);

                // 查询订单明细
                List<OrderDetailVo> orderDetailList = this.queryOrderDetailList(orderVo.getOrder_sn());
                if (!orderDetailList.isEmpty()) {
                    hi_code = orderDetailList.get(0).getProduct_sn();

                    // 更新房源
                    HouseInfoKeep houseInfoKeep = new HouseInfoKeep();
                    houseInfoKeep.setHi_code(hi_code);
                    houseInfoKeep.setHi_isForRent(AppConfig.hi_isForRent_2);
                    // houseInfoKeep.setHi_forRentState(AppConfig.hi_forRentState_2000);
                    houseLibraryService.updateCommodityHouse(houseInfoKeep);
                    houseLibraryService.updateInventoryHouse(houseInfoKeep);
                }

                // 发送定金短信
                try {
                    if (hi_code != null) {
                        // 查询房源信息
                        ViewHouseLibraryInfoVo house = houseLibraryService.queryHouseLibraryInfo(hi_code);
                        // 查询房源管家信息
                        HousePositionCompanyVo houseCompanyInfo = houseLibraryService.queryHouseCompanyInfo(hi_code);
                        // 查询用户信息
                        UserCustomer customer = customerService.queryCustomerInfo(orderVo.getTrade_cc_code());
                        if (house != null && houseCompanyInfo != null && customer != null) {
                            String cc_phone = customer.getCcp_phone();
                            String cc_name = customer.getCc_name();
                            String house_address = house.getHouse_address();
                            String day = AppUtil.getDay(financeDownPaymentVo.getFdp_create_time(), financeDownPaymentVo.getFdp_invaild_time()) + "";
                            String pay_money = orderBillVo.getBill_pay_total().toString();
                            String em_phone = houseCompanyInfo.getEm_phone();
                            String em_name = houseCompanyInfo.getEm_name();
                            SmsUtil.sendCusDepositSMS(cc_phone, house_address, cc_name, pay_money, day, em_name, em_phone);
                            SmsUtil.sendEmpDepositSMS(em_phone, house_address, cc_name, cc_phone, pay_money);
                        }
                    }
                } catch (Exception e) {
                    log.error(e);
                }
                break;
            case "fail":
                // 更新定金
                FinanceDownPaymentVo financeDownPaymentVo2 = new FinanceDownPaymentVo();
                financeDownPaymentVo2.setFdp_id(financeDownPaymentVo.getFdp_id());
                financeDownPaymentVo2.setFdp_status(AppConfig.fdp_status_5);
                financeManageService.updateFinanceDownPayment(financeDownPaymentVo2);
                break;
        }
        return true;
    }

    /**
     * 更新订单金额
     * <P>根据订单号查询订单明细，计算出订单相应的金额类数据</P>
     *
     * @param order_sn 订单号
     * @return true|false
     * @author JiangQt
     * @version 2017年7月7日下午5:40:34
     */
    public boolean _updatePayOrderForAmount(String order_sn) {
        if (StringUtils.isEmpty(order_sn)) return false;

        // 获取订单
        OrderVo orderVo = this.queryOrder(order_sn);
        if (orderVo == null) return false;

        // 商品总金额：订单明细detail_balpay = 1 总计
        BigDecimal detail_amount_total = new BigDecimal(0);
        // 商品优惠金额：订单明细detail_balpay = 2 总计
        BigDecimal detail_amount_coupon = new BigDecimal(0);
        // 充值赠送金额：限充值产品
        BigDecimal recharge_amount_give = new BigDecimal(0);
        // 订单总金额：商品总金额 - 商品优惠金额
        BigDecimal order_amount_total;
        // 订单支付金额：订单总金额 - 余额抵扣金额
        BigDecimal order_amount_pay;

        // 获取订单明细
        List<OrderDetailVo> orderDetailList = this.queryOrderDetailList(order_sn);
        for (OrderDetailVo orderDetailVo : orderDetailList) {
            if (orderDetailVo.getDetail_balpay() == AppConfig.balPay_1) {
                detail_amount_total = detail_amount_total.add(new BigDecimal(orderDetailVo.getDetail_subtotal()));
            }
            if (orderDetailVo.getDetail_balpay() == AppConfig.balPay_2) {
                detail_amount_total = detail_amount_total.subtract(new BigDecimal(orderDetailVo.getDetail_subtotal()));
            }
        }

        // 订单总金额
        order_amount_total = detail_amount_total.subtract(detail_amount_coupon);
        // 订单支付金额
        order_amount_pay = order_amount_total;

        // 【添加订单】
        OrderVo orderVo1 = new OrderVo();
        orderVo1.setOrder_sn(order_sn);
        orderVo1.setDetail_count(orderDetailList.size());
        orderVo1.setDetail_amount_total(detail_amount_total.doubleValue());
        orderVo1.setDetail_amount_coupon(detail_amount_coupon.doubleValue());
        orderVo1.setRecharge_amount_give(recharge_amount_give.doubleValue());
        orderVo1.setOrder_amount_total(order_amount_total.doubleValue());
        orderVo1.setOrder_amount_pay(order_amount_pay.doubleValue());
        this.updateOrderForAmount(orderVo1);

        return true;
    }

    /**
     * 更新合同账单之代偿
     *
     * @param json
     * @param employee
     * @throws AppException
     */
    public void _updateContractBillForCompensatory(JSONObject json, UserCenterEmployee employee) throws AppException {
        // 模式：[update]更新,[revoke]撤销
        String mode = json.getString("mode");

        // 验证参数
        if (StringUtils.isEmpty(mode)) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 更新
        if ("update".equals(mode)) {
            // 订单号
            String bco_code = json.getString("bco_code");
            // 滞纳金金额
            double late_fee = json.getDoubleValue("late_fee");
            // 代偿账单列表
            JSONArray compensatory_list = json.getJSONArray("compensatory_list");

            // 验证参数
            if (StringUtils.isEmpty(bco_code)) {
                throw new AppException(Msg.MSG_PARAM_ERROR);
            }

            // 查询订单信息
            ContractOrderVo contractOrderVo = financeManageService.queryFinanceOrder(bco_code);
            if (contractOrderVo == null) {
                throw new AppException(Msg.MSG_PARAM_ERROR);
            }

            for (Object o : compensatory_list) {
                JSONObject jo = (JSONObject) o;
                String bcb_code = jo.getString("bcb_code");
                ContractBillVo contractBillVo = financeManageService.queryFinanceBill(bcb_code);
                if (contractBillVo != null
                        && contractBillVo.getBcb_state() == AppConfig.bcb_state_9
                        && contractBillVo.getBcb_isRepay() != 1) {

                    // 更新账单
                    ContractBillVo contractBillVo1 = new ContractBillVo();
                    contractBillVo1.setBcb_id(contractBillVo.getBcb_id());
                    contractBillVo1.setBcb_state(AppConfig.bcb_state_2);
                    contractBillVo1.setBcb_isRepay(1);
                    financeManageService.updateFinanceBill(contractBillVo1);

                    // 添加滞纳金
                    if (late_fee > 0) {
                        ContractBillVo contractBillVo2 = new ContractBillVo();
                        contractBillVo2.setBcb_code(AppUtil.getOrderCode("202"));
                        contractBillVo2.setBco_code(contractBillVo.getBco_code());
                        contractBillVo2.setBcb_cycle(contractBillVo.getBcb_cycle());
                        contractBillVo2.setBcb_type(AppConfig.contract_bill_type_17);
                        contractBillVo2.setBcb_balPay(contractBillVo.getBcb_balPay());
                        contractBillVo2.setBcb_repayment(new BigDecimal(late_fee));
                        contractBillVo2.setBcb_repaymentDate(contractBillVo.getBcb_repaymentDate());
                        contractBillVo2.setBcb_realPayment(new BigDecimal(0));
                        contractBillVo2.setBcb_balance(new BigDecimal(0));
                        contractBillVo2.setBcb_state(AppConfig.bcb_state_2);
                        contractBillVo2.setBcb_account_out(1);
                        contractBillVo2.setBcb_creator(employee.getEm_id());
                        contractBillVo2.setBcb_remarks("代偿滞纳金");
                        contractBillVo2.setBcb_createTime(new Date());
                        financeManageService.addContractBill(contractBillVo2);
                    }

                    // 添加金融账单
                    BillPartnerBill partnerBill = new BillPartnerBill();
                    partnerBill.setBco_code(contractOrderVo.getBco_code());
                    partnerBill.setBcb_code(contractBillVo.getBcb_code());
                    partnerBill.setBpb_cycle(contractBillVo.getBcb_cycle());
                    partnerBill.setBpb_title("第" + contractBillVo.getBcb_cycle() + "期");
                    partnerBill.setBpb_type(1);
                    partnerBill.setBpb_status(1);
                    partnerBill.setBpb_state(0);
                    partnerBill.setBpb_balPay(1);
                    partnerBill.setBpb_repayment(contractBillVo.getBcb_repayment().doubleValue());
                    partnerBill.setBpb_repaymentDate(contractBillVo.getBcb_repaymentDate());
                    partnerBill.setBpb_remarks("代偿");
                    partnerBill.setBpb_payee(contractOrderVo.getBco_cooperater());
                    partnerBill.setBpb_creatorId(employee.getEm_id());
                    partnerBill.setBpb_createTime(new Date());
                    partnerBillService.addBillPartnerBill(partnerBill);
                }
            }

            // 初始化合同订单数据
            financeManageService.updateFinanceOrderBillData(bco_code);
        }

        // 撤销
        if ("revoke".equals(mode)) {
            // 订单号
            String bcb_code = json.getString("bcb_code");

            // 验证参数
            if (StringUtils.isEmpty(bcb_code)) {
                throw new AppException(Msg.MSG_PARAM_ERROR);
            }

            // 获取账单数据
            ContractBillVo contractBillVo = financeManageService.queryFinanceBill(bcb_code);
            if (contractBillVo == null) {
                throw new AppException(Msg.MSG_PARAM_ERROR);
            }

            Integer bcb_cycle = contractBillVo.getBcb_cycle();

            // 删除合同账单相关数据
            this._deleteContractBillAboutData(contractBillVo);

            // 更新账单
            ContractBillVo contractBillVo1 = new ContractBillVo();
            contractBillVo1.setBcb_id(contractBillVo.getBcb_id());
            contractBillVo1.setBcb_isRepay(0);
            contractBillVo1.setBcb_state(AppConfig.bcb_state_9);
            contractBillVo1.setBcb_account_out(AppConfig.bcb_account_out_1);
            financeManageService.updateFinanceBill(contractBillVo1);

            // 初始化合同订单数据
            financeManageService.updateFinanceOrderBillData(contractBillVo.getBcb_code());
        }

    }

    /**
     * 更新合同账单之分期
     *
     * @param json
     * @throws AppException
     */
    public void _updateContractBillForInstalment(JSONObject json) throws AppException {
        String bcb_code = json.getString("bcb_code");

        // 验证参数
        if (StringUtils.isEmpty(bcb_code)) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 获取账单
        ContractBillVo contractBillVo = financeManageService.queryFinanceBill(bcb_code);
        if (contractBillVo == null) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 删除合同账单相关数据
        this._deleteContractBillAboutData(contractBillVo);

        // 更新账单
        ContractBillVo contractBillVo1 = new ContractBillVo();
        contractBillVo1.setBcb_id(contractBillVo.getBcb_id());
        contractBillVo1.setBcb_instalment_state(AppConfig.bcb_instalment_state_1);
        financeManageService.updateFinanceBill(contractBillVo1);
    }

    /**
     * 添加合同账单分期
     *
     * @param json
     * @param em_id
     * @throws AppException
     */
    public void _addContractInstalmentBill(JSONObject json, Integer em_id) throws AppException {
        // 订单号
        String bco_code = json.getString("bco_code");
        // 账单期数
        Integer bcb_cycle = json.getInteger("bcb_cycle");
        // 分期列表
        JSONArray staging_list = json.getJSONArray("staging_list");
        // 分期列表
        List<ContractBillInstalmentVo> contractBillStagesList = staging_list.toJavaList(ContractBillInstalmentVo.class);

        // 验证参数
        if (StringUtils.isEmpty(bco_code) || StringUtils.isEmpty(bcb_cycle) || contractBillStagesList == null) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 查询合同订单
        ContractOrderVo contractOrderVo = financeManageService.queryFinanceOrder(bco_code);
        if (contractOrderVo == null) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 查询合同账单
        ContractBillVo contractBillVo = new ContractBillVo();
        contractBillVo.setBco_code(bco_code);
        contractBillVo.setBcb_cycle(bcb_cycle);
        List<ContractBillVo> financeBillList = financeManageService.queryFinanceBillList(contractBillVo);
        for (ContractBillVo billVo : financeBillList) {
            // 如果已支付
            if (billVo.getBcb_state() == AppConfig.bcb_state_3) {
                throw new AppException("合同账单已支付，无法分期");
            }
            // 如果已出账
            if (billVo.getBcb_account_out() == AppConfig.bcb_account_out_2) {
                updatePayOrder(billVo.getBcb_code());
            }

            // 更新合同账单状态
            ContractBillVo contractBillVo1 = new ContractBillVo();
            contractBillVo1.setBcb_id(billVo.getBcb_id());
            contractBillVo1.setBcb_account_out(AppConfig.bcb_account_out_1);
            contractBillVo1.setBcb_instalment_state(AppConfig.bcb_instalment_state_2);
            financeManageService.updateFinanceBill(contractBillVo1);
        }

        // 查询前分期账单列表
        ContractBillInstalmentVo contractBillInstalmentVo1 = new ContractBillInstalmentVo();
        contractBillInstalmentVo1.setBco_code(bco_code);
        contractBillInstalmentVo1.setBcb_cycle(bcb_cycle);
        List<ContractBillInstalmentVo> contractBillInstalmentList = financeManageService.queryContractBillInstalmentList(contractBillInstalmentVo1);
        for (ContractBillInstalmentVo billStagesVo : contractBillInstalmentList) {
            // 如果已支付
            if (billStagesVo.getCbs_status() == AppConfig.bcb_state_3) {
                throw new AppException("分期账单已支付，无法重新分期");
            }
            // 如果已出账
            if (billStagesVo.getCbs_account_out() == AppConfig.bcb_account_out_2) {
                updatePayOrder(billStagesVo.getCbs_code());
            }

            // 删除前分期账单
            financeManageService.deleteContractBillInstalment(billStagesVo.getCbs_id());
        }

        // 添加分期账单
        for (ContractBillInstalmentVo contractBillInstalmentVo : contractBillStagesList) {
            // 逾期天数
            Integer cbs_overdue_day = null;
            if (contractBillInstalmentVo.getCbs_repaymentDate().getTime() < new Date().getTime()) {
                cbs_overdue_day = AppUtil.getDay(contractBillInstalmentVo.getCbs_repaymentDate(), new Date());
            }
            contractBillInstalmentVo.setCbs_code(AppUtil.getOrderCode("500"));
            contractBillInstalmentVo.setBco_code(bco_code);
            contractBillInstalmentVo.setBcb_cycle(bcb_cycle);
            contractBillInstalmentVo.setCbs_balPay(contractOrderVo.getBco_currentBalPay());
            contractBillInstalmentVo.setCbs_status(AppConfig.bcb_state_2);
            contractBillInstalmentVo.setCbs_realPayment(0.0);
            contractBillInstalmentVo.setCbs_account_out(1);
            contractBillInstalmentVo.setCbs_late_fee(0.0);
            contractBillInstalmentVo.setCbs_overdue_day(cbs_overdue_day);
            contractBillInstalmentVo.setCbs_creator(em_id);
            contractBillInstalmentVo.setCbs_operater(em_id);
            contractBillInstalmentVo.setCbs_create_time(new Date());
            financeManageService.addContractBillInstalment(contractBillInstalmentVo);
        }
    }

    /**
     * 更新合同账单
     *
     * @param json
     * @param em_id
     * @throws AppException
     */
    public void _updateContractBill(JSONObject json, Integer em_id) throws AppException {
        // 订单号
        String bco_code = json.getString("bco_code");
        // 变更模式
        String mode = json.getString("mode");
        // 支付周期
        String pay_cycle = json.getString("pay_cycle");
        // 支付方式
        String pay_way = json.getString("pay_way");
        // 合并数据
        JSONArray merge_data = json.getJSONArray("merge_data");
        // 拆分数据
        JSONArray split_data = json.getJSONArray("split_data");
        // 拆分数据
        JSONArray tg_bill_data = json.getJSONArray("tg_bill_data");

        // 验证参数
        if (StringUtils.isEmpty(bco_code) || StringUtils.isEmpty(mode) || StringUtils.isEmpty(pay_cycle) || StringUtils.isEmpty(pay_way)) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 支付周期数字
        int pay_cycle_int = 0;
        switch (pay_cycle) {
            case "月付":
                pay_cycle_int = 1;
                break;
            case "季付":
                pay_cycle_int = 3;
                break;
            case "半年付":
                pay_cycle_int = 6;
                break;
            case "年付":
                pay_cycle_int = 12;
                break;
        }

        // 获取合同订单
        ContractOrderVo contractOrderVo = financeManageService.queryFinanceOrder(bco_code);
        if (contractOrderVo == null) {
            throw new AppException("没有发现该账单的合同订单，请重试或联系管理员");
        }

        // 获取合同信息
        ContractInfoVo contractInfoVo = contractService.queryContractInfo(contractOrderVo.getContractObject_code());
        if (contractInfoVo == null) {
            throw new AppException("没有发现该账单的合同，请重试或联系管理员");
        }

        // 更新合同账单||处理数据
        int bcb_balPay = AppConfig.TYPE_CONTRACT_201.equals(contractInfoVo.getContractObject_Type()) ? 1 : 0;
        // 最小期数
        int min_cycle = financeManageService.queryFinanceBillForMinCycle(bco_code);
        // 【拆分】
        if (split_data != null && split_data.size() > 0) {
            // 合并模式
            ContractBillVo contractBillVo0 = new ContractBillVo();
            contractBillVo0.setBco_code(bco_code);
            contractBillVo0.setBcb_state_no(AppConfig.bcb_state_3);
            List<ContractBillVo> contractBillListAll = financeManageService.queryFinanceBillList(contractBillVo0);
            for (ContractBillVo contractBillVo : contractBillListAll) {
                // 删除合同账单相关数据
                this._deleteContractBillAboutData(contractBillVo);
                // 删除账单
                if (contractBillVo.getBcb_cycle() != min_cycle) {
                    financeManageService.deleteFinanceBill(contractBillVo.getBcb_id());
                }
            }

            for (int i = 0; i < split_data.size(); i++) {
                JSONObject split_json = split_data.getJSONObject(i);

                Integer bcb_cycle = split_json.getInteger("bcb_cycle");
                Date bcb_repaymentDate = split_json.getDate("bcb_repaymentDate");
                BigDecimal bcb_repayment = split_json.getBigDecimal("bcb_repayment");
                Integer bcb_state = split_json.getInteger("bcb_state");
                switch (contractInfoVo.getContractObject_State()) {
                    case AppConfig.con_state_1:
                        bcb_state = AppConfig.bcb_state_1;
                        break;
                }

                Date end_date = AppUtil.addDate(AppUtil.addDate(bcb_repaymentDate, Calendar.MONTH, pay_cycle_int), Calendar.DATE, -1);
                int bcb_overdueDay = AppUtil.getDay(bcb_repaymentDate, new Date());

                // 查询当前期账单是否有数据
                ContractBillVo contractBillVo1 = new ContractBillVo();
                contractBillVo1.setBco_code(bco_code);
                contractBillVo1.setBcb_cycle(bcb_cycle);
                List<ContractBillVo> contractBillList = financeManageService.queryFinanceBillList(contractBillVo1);
                if (contractBillList.isEmpty()) {
                    // 添加新账单
                    ContractBillVo contractBillVo = new ContractBillVo();
                    contractBillVo.setBcb_code(AppUtil.getOrderCode("210"));
                    contractBillVo.setBco_code(bco_code);
                    contractBillVo.setBcb_cycle(bcb_cycle);
                    contractBillVo.setBcb_type(AppConfig.contract_bill_type_0);
                    contractBillVo.setBcb_balPay(bcb_balPay);
                    contractBillVo.setBcb_state(bcb_state);
                    contractBillVo.setBcb_instalment_state(AppConfig.bcb_instalment_state_1);
                    contractBillVo.setBcb_repayment(bcb_repayment);
                    contractBillVo.setBcb_repaymentDate(bcb_repaymentDate);
                    contractBillVo.setBcb_startDate(bcb_repaymentDate);
                    contractBillVo.setBcb_endDate(end_date);
                    contractBillVo.setBcb_overdueDay(bcb_overdueDay < 0 ? 0 : bcb_overdueDay);
                    contractBillVo.setBcb_account_out(AppConfig.bcb_account_out_1);
                    contractBillVo.setBcb_agreedDate(bcb_repaymentDate);
                    contractBillVo.setBcb_creator(0);
                    contractBillVo.setBcb_createTime(new Date());
                    financeManageService.addContractBill(contractBillVo);
                } else {
                    for (ContractBillVo contractBillVo : contractBillList) {
                        if (contractBillVo.getBcb_cycle() == min_cycle) {
                            if (contractBillVo.getBcb_type() == AppConfig.contract_bill_type_0) {
                                ContractBillVo contractBillVo2 = new ContractBillVo();
                                contractBillVo2.setBcb_id(contractBillVo.getBcb_id());
                                contractBillVo2.setBcb_repayment(bcb_repayment);
                                financeManageService.updateFinanceBill(contractBillVo2);
                            }

                            // 更新合同账单出账状态
                            ContractBillVo contractBillVo2 = new ContractBillVo();
                            contractBillVo2.setBcb_id(contractBillVo.getBcb_id());
                            contractBillVo2.setBcb_account_out(AppConfig.bcb_account_out_1);
                            financeManageService.updateFinanceBill(contractBillVo2);
                        } else {
                            // 添加新账单
                            ContractBillVo contractBillVo2 = new ContractBillVo();
                            contractBillVo2.setBcb_code(AppUtil.getOrderCode("210"));
                            contractBillVo2.setBco_code(bco_code);
                            contractBillVo2.setBcb_cycle(bcb_cycle);
                            contractBillVo2.setBcb_type(AppConfig.contract_bill_type_0);
                            contractBillVo2.setBcb_balPay(bcb_balPay);
                            contractBillVo2.setBcb_state(bcb_state);
                            contractBillVo2.setBcb_instalment_state(AppConfig.bcb_instalment_state_1);
                            contractBillVo2.setBcb_repayment(bcb_repayment);
                            contractBillVo2.setBcb_repaymentDate(bcb_repaymentDate);
                            contractBillVo2.setBcb_startDate(bcb_repaymentDate);
                            contractBillVo2.setBcb_endDate(end_date);
                            contractBillVo2.setBcb_overdueDay(bcb_overdueDay < 0 ? 0 : bcb_overdueDay);
                            contractBillVo2.setBcb_account_out(AppConfig.bcb_account_out_1);
                            contractBillVo2.setBcb_agreedDate(bcb_repaymentDate);
                            contractBillVo2.setBcb_creator(0);
                            contractBillVo2.setBcb_createTime(new Date());
                            financeManageService.addContractBill(contractBillVo2);
                        }
                    }
                }
            }
        }
        // 【合并】
        if (merge_data != null && merge_data.size() > 0) {
            for (int i = 0; i < merge_data.size(); i++) {
                JSONObject merge_json = merge_data.getJSONObject(i);

                Integer bcb_cycle = merge_json.getInteger("bcb_cycle");
                Date bcb_repaymentDate = merge_json.getDate("bcb_repaymentDate");
                Integer bcb_state = merge_json.getInteger("bcb_state");
                JSONArray list = merge_json.getJSONArray("list");

                Date end_date = AppUtil.addDate(AppUtil.addDate(bcb_repaymentDate, Calendar.MONTH, pay_cycle_int), Calendar.DATE, -1);
                int bcb_overdueDay = AppUtil.getDay(bcb_repaymentDate, new Date());

                // 获取账单列表
                StringBuilder bcb_cycle_in = new StringBuilder();
                for (Object o : list) {
                    bcb_cycle_in.append(o).append(",");
                }
                ContractBillVo contractBillVo0 = new ContractBillVo();
                contractBillVo0.setBco_code(bco_code);
                contractBillVo0.setBcb_cycle_in(bcb_cycle_in.substring(0, bcb_cycle_in.length() - 1));
                List<ContractBillVo> contractBillList = financeManageService.queryFinanceBillList(contractBillVo0);

                // 计算金额
                ContractBillVo contractBillFirst = null;
                BigDecimal bcb_repayment = new BigDecimal(0);
                for (ContractBillVo contractBillVo : contractBillList) {
                    if (contractBillVo.getBcb_cycle() == 0 && contractBillVo.getBcb_type() == AppConfig.contract_bill_type_0) {
                        contractBillFirst = contractBillVo;
                    }
                    if (contractBillVo.getBcb_type() == AppConfig.contract_bill_type_0) {
                        switch (contractBillVo.getBcb_balPay()) {
                            case 0:
                                bcb_repayment = bcb_repayment.add(contractBillVo.getBcb_repayment());
                                break;
                            case 1:
                                bcb_repayment = bcb_repayment.subtract(contractBillVo.getBcb_repayment());
                                break;
                        }
                    }

                    // 删除合同账单相关数据
                    this._deleteContractBillAboutData(contractBillVo);
                }
                bcb_repayment = bcb_repayment.abs();

                if (contractBillFirst != null) {
                    ContractBillVo contractBillVo = new ContractBillVo();
                    contractBillVo.setBcb_id(contractBillFirst.getBcb_id());
                    contractBillVo.setBcb_repayment(bcb_repayment);
                    contractBillVo.setBcb_account_out(AppConfig.bcb_account_out_1);
                    financeManageService.updateFinanceBill(contractBillVo);
                } else {
                    // 添加新账单
                    ContractBillVo contractBillVo = new ContractBillVo();
                    contractBillVo.setBcb_code(AppUtil.getOrderCode("210"));
                    contractBillVo.setBco_code(bco_code);
                    contractBillVo.setBcb_cycle(bcb_cycle);
                    contractBillVo.setBcb_type(AppConfig.contract_bill_type_0);
                    contractBillVo.setBcb_balPay(bcb_balPay);
                    contractBillVo.setBcb_state(bcb_state);
                    contractBillVo.setBcb_instalment_state(AppConfig.bcb_instalment_state_1);
                    contractBillVo.setBcb_repayment(bcb_repayment);
                    contractBillVo.setBcb_repaymentDate(bcb_repaymentDate);
                    contractBillVo.setBcb_startDate(bcb_repaymentDate);
                    contractBillVo.setBcb_endDate(end_date);
                    contractBillVo.setBcb_overdueDay(bcb_overdueDay < 0 ? 0 : bcb_overdueDay);
                    contractBillVo.setBcb_account_out(AppConfig.bcb_account_out_1);
                    contractBillVo.setBcb_agreedDate(bcb_repaymentDate);
                    contractBillVo.setBcb_creator(0);
                    contractBillVo.setBcb_createTime(new Date());
                    financeManageService.addContractBill(contractBillVo);
                }

                // 删除旧账单
                for (ContractBillVo contractBillVo1 : contractBillList) {
                    if (!(contractBillFirst != null && contractBillVo1.getBcb_cycle() == 0)) {
                        financeManageService.deleteFinanceBill(contractBillVo1.getBcb_id());
                    }
                }
            }
        }

        //【托管账单】
        if (tg_bill_data != null && tg_bill_data.size() > 0) {
            // 删除合同账单相关数据
            List<ContractBillVo> contractBillListOld = financeManageService.queryFinanceBillList(contractOrderVo.getBco_code());
            for (ContractBillVo contractBillVo : contractBillListOld) {
                if (contractBillVo.getBcb_state() == AppConfig.bcb_state_3) {
                    throw new AppException("该合同有已支付的账单，无法账单变更");
                }
                this._deleteContractBillAboutData(contractBillVo);
            }
            // 删除合同账单旧数据
            financeManageService.deleteFinanceBill(contractOrderVo.getBco_code());
            // 添加新账单数据
            List<ContractBillVo> contractBillList = tg_bill_data.toJavaList(ContractBillVo.class);
            for (ContractBillVo contractBillVo : contractBillList) {
                financeManageService.addContractBill(contractBillVo);
            }
        }

        // 判断第三方
        if (AppConfig.TYPE_CONTRACT_202.equals(contractInfoVo.getContractObject_Type()) && contractInfoVo.getContractObject_State() == AppConfig.con_state_2) {
            List<ContractBillVo> financeBillList = financeManageService.queryFinanceBillList(bco_code);
            for (ContractBillVo contractBillVo : financeBillList) {
                if (contractBillVo.getBcb_state() != AppConfig.bcb_state_3) {
                    if ("管家婆".equals(pay_way)) {
                        ContractBillVo contractBillVo1 = new ContractBillVo();
                        contractBillVo1.setBcb_id(contractBillVo.getBcb_id());
                        contractBillVo1.setBcb_state(AppConfig.bcb_state_2);
                        financeManageService.updateFinanceBill(contractBillVo1);
                    } else {
                        if (contractBillVo.getBcb_cycle() != min_cycle && contractBillVo.getBcb_state() == AppConfig.bcb_state_2) {
                            ContractBillVo contractBillVo1 = new ContractBillVo();
                            contractBillVo1.setBcb_id(contractBillVo.getBcb_id());
                            contractBillVo1.setBcb_state(AppConfig.bcb_state_9);
                            financeManageService.updateFinanceBill(contractBillVo1);
                        }
                        if (contractBillVo.getBcb_instalment_state() == AppConfig.bcb_instalment_state_2) {
                            ContractBillVo contractBillVo1 = new ContractBillVo();
                            contractBillVo1.setBcb_id(contractBillVo.getBcb_id());
                            contractBillVo1.setBcb_state(AppConfig.bcb_state_2);
                            financeManageService.updateFinanceBill(contractBillVo1);
                        }
                    }
                }
            }
        }

        // 更新合同订单
        ContractOrderVo contractOrderVo1 = new ContractOrderVo();
        contractOrderVo1.setBco_id(contractOrderVo.getBco_id());
        contractOrderVo1.setBco_cooperater(pay_way);
        financeManageService.updateFinanceOrder(contractOrderVo1);

        // 更新订单/账单状态
        financeManageService.updateFinanceOrderBillData(bco_code);

        // 更新合同
        UserCenterContractBody contractBody = new UserCenterContractBody();
        contractBody.setContractObject_Code(contractInfoVo.getContractObject_Code());
        contractBody.setContractBody_PayStyle(pay_cycle);
        contractBody.setContractBody_PayType(pay_way);
        contractService.updateContractBody(contractBody);

        // 添加日志
        ContractImplRecordVo contractImplRecordVo = new ContractImplRecordVo();
        contractImplRecordVo.setHi_code(contractInfoVo.getHi_code());
        contractImplRecordVo.setContractObject_code(contractInfoVo.getContractObject_Code());
        contractImplRecordVo.setCir_type(AppConfig.contractTpye_1011);
        contractImplRecordVo.setCir_content("合同账单变更：付款周期[" + contractInfoVo.getContractBody_PayStyle() + "]->[" + pay_cycle + "]，付款方式[" + contractInfoVo.getContractBody_PayType() + "]->[" + pay_way + "]。");
        contractImplRecordVo.setCir_author(em_id);
        contractImplRecordVo.setCir_source(0);
        contractImplRecordVo.setCir_createTime(new Date());
        contractService.addHouseRecord(contractImplRecordVo);

        // 发送短信
    }

    /**
     * 删除合同账单相关数据
     *
     * @param contractBillVo
     * @throws AppException
     */
    public boolean _deleteContractBillAboutData(ContractBillVo contractBillVo) throws AppException {
        // ->处理已出账账单
        boolean boo = this._deleteOrderAndOrderDetail(contractBillVo.getBcb_code());
        if (!boo) {
            throw new AppException("第" + contractBillVo.getBcb_cycle() + "期账单的支付账单已付款，请联系管理员处理");
        }

        // ->处理已分期账单
        if (contractBillVo.getBcb_instalment_state() == AppConfig.bcb_instalment_state_2) {
            ContractBillInstalmentVo contractBillInstalmentVo = new ContractBillInstalmentVo();
            contractBillInstalmentVo.setBco_code(contractBillVo.getBco_code());
            contractBillInstalmentVo.setBcb_cycle(contractBillVo.getBcb_cycle());
            List<ContractBillInstalmentVo> contractBillInstalmentList = financeManageService.queryContractBillInstalmentList(contractBillInstalmentVo);
            for (ContractBillInstalmentVo billInstalmentVo : contractBillInstalmentList) {
                // 删除支付订单数据
                boolean boo1 = this._deleteOrderAndOrderDetail(billInstalmentVo.getCbs_code());
                if (!boo1) {
                    throw new AppException("第" + contractBillVo.getBcb_cycle() + "期-" + billInstalmentVo.getCbs_cycle() + "/" + billInstalmentVo.getCbs_cycle_total() + "期分期账单的支付账单已付款，无法操作。");
                }
                // 删除分期账单
                financeManageService.deleteContractBillInstalment(billInstalmentVo.getCbs_id());
            }
        }
        return true;
    }

    /**
     * 删除支付订单和订单明细
     *
     * @param product_sn
     * @return
     */
    public boolean _deleteOrderAndOrderDetail(String product_sn) {
        // 查询支付订单明细
        OrderDetailVo orderDetailVo = new OrderDetailVo();
        orderDetailVo.setProduct_sn(product_sn);
        orderDetailVo = this.queryOrderDetail(orderDetailVo);
        if (orderDetailVo != null) {
            // 查询支付订单
            OrderVo orderVo = this.queryOrder(orderDetailVo.getOrder_sn());
            if (orderVo != null) {
                if (orderVo.getOrder_status() == AppConfig.order_status_3) {
                    return false;
                }
                // 删除支付订单
                this.deleteOrder(orderVo.getOrder_id());
            }

            // 删除支付订单明细
            this.deleteOrderDetail(orderDetailVo.getDetail_id());
        }
        return true;
    }

    /**
     * 更新支付订单
     *
     * @param product_sn
     * @throws AppException
     */
    public void updatePayOrder(String product_sn) throws AppException {
        // 支付订单详情
        OrderDetailVo detailVo = new OrderDetailVo();
        detailVo.setProduct_sn(product_sn);
        detailVo = this.queryOrderDetail(detailVo);
        if (detailVo != null) {
            // 订单详情
            OrderVo orderVo = this.queryOrder(detailVo.getOrder_sn());
            if (orderVo != null) {
                if (orderVo.getOrder_status() == AppConfig.order_status_3) {
                    throw new AppException("账单已支付，无法分期");
                }
                // 流水详情
                if (orderVo.getPay_sn() != null) {
                    OrderBillVo orderBillVo = this.queryOrderBill(orderVo.getPay_sn());
                    if (orderBillVo != null) {
                        if (orderBillVo.getBill_status() == AppConfig.bill_status_2) {
                            throw new AppException("账单已支付，无法分期");
                        }
                        // 删除支付账单
                        this.deleteOrderBill(orderBillVo.getBill_id());
                    }
                }
                // 删除支付订单
                this.deleteOrder(orderVo.getOrder_id());
            }
            // 删除支付订单详情
            this.deleteOrderDetail(detailVo.getDetail_id());
        }
    }

    /**
     * 同步支付订单之合同账单
     *
     * @param channel     渠道
     * @param bco_code    订单号
     * @param advance_day 提前天数
     * @throws AppException
     */
    public void _syncPayOrderForContractBill(Integer channel, String bco_code, Integer bcb_cycle, int advance_day) {
        if (StringUtils.isEmpty(bco_code)) {
            ExecutorService executorService = Executors.newFixedThreadPool(16);
            for (int i = 0; i <= advance_day; i++) {
                Calendar calendar = AppUtil.calendayDate(new Date(), Calendar.DATE, i);
                // 查询合同订单
                ContractOrderVo contractOrderVo = new ContractOrderVo();
                contractOrderVo.setBco_state(AppConfig.bco_state_1);
                contractOrderVo.setBco_optionState(AppConfig.bco_optionState_2);
                contractOrderVo.setBco_orderType(AppConfig.order_type_1);
                contractOrderVo.setBco_currentDate(calendar.getTime());
                List<ContractOrderVo> financeOrderList = financeManageService.queryFinanceOrderList(contractOrderVo);
                for (ContractOrderVo orderVo : financeOrderList) {
                    executorService.execute(() -> {
                        // 是否分期
                        boolean isInstalment = false;

                        // 获取账单状态
                        ContractBillVo contractBillVo = new ContractBillVo();
                        contractBillVo.setBco_code(orderVo.getBco_code());
                        contractBillVo.setBcb_cycle(orderVo.getBco_currentCycle());
                        List<ContractBillVo> contractBillList = financeManageService.queryFinanceBillList(contractBillVo);
                        for (ContractBillVo billVo : contractBillList) {
                            if (billVo.getBcb_instalment_state() == AppConfig.bcb_instalment_state_2) {
                                isInstalment = true;
                            }
                        }

                        // 生成支付订单，非分期账单
                        if (!isInstalment) {
                            try {
                                this._submitPayRent(channel, orderVo.getBco_code(), orderVo.getBco_currentCycle());
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }
                    });
                }
            }
        } else {
            // 执行合同订单初始化事件
            financeManageService.updateFinanceOrderBillData(bco_code);
            // 生成支付订单
            try {
                this._submitPayRent(channel, bco_code, bcb_cycle);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 同步支付订单之合同分期账单
     *
     * @param channel
     * @param advance_day
     * @throws AppException
     */
    public void _syncPayOrderForContractInstalmentBill(Integer channel, int advance_day) {
        ExecutorService executorService = Executors.newFixedThreadPool(16);
        for (int i = 0; i <= advance_day; i++) {
            Calendar calendar = AppUtil.calendayDate(new Date(), Calendar.DATE, i);
            // 查询合同分期账单
            ContractBillInstalmentVo contractBillInstalmentVo = new ContractBillInstalmentVo();
            contractBillInstalmentVo.setCbs_status(AppConfig.bcb_state_2);
            contractBillInstalmentVo.setCbs_repaymentDate(calendar.getTime());
            List<ContractBillInstalmentVo> contractBillInstalmentList = financeManageService.queryContractBillInstalmentList(contractBillInstalmentVo);
            for (ContractBillInstalmentVo instalmentVo : contractBillInstalmentList) {
                executorService.execute(() -> {
                    try {
                        this._addPayOrderForContractInstalmentBill(channel, instalmentVo.getCbs_code());
                    } catch (AppException e) {
                        e.printStackTrace();
                    }
                });
            }
        }
    }

    /**
     * 更新订单滞纳金
     */
    public void _syncPayOrderLateFee() {
        OrderVo orderVo = new OrderVo();
        orderVo.setOrder_type(AppConfig.order_type_1);
        orderVo.setOrder_balpay(AppConfig.balPay_1);
        orderVo.setOrder_status_in(AppConfig.order_status_1 + "," + AppConfig.order_status_2);
        orderVo.setOrder_agreed_pay_date_lt(new Date());
        List<OrderVo> orderList = this.queryOrderList(orderVo);
        for (OrderVo orderVo1 : orderList) {
            if (orderVo1.getOrder_agreed_pay_date() != null) {
                // 现有租金对象
                OrderDetailVo detail_rent = null;
                // 现有滞纳金对象
                OrderDetailVo detail_fee = null;
                // 平台滞纳金
                BigDecimal platform_late_fee = new BigDecimal(0);
                // 逾期滞纳金
                BigDecimal overdue_late_fee = new BigDecimal(0);
                // 当前滞纳金
                BigDecimal current_late_fee = new BigDecimal(0);
                // 当前逾期天数
                int current_late_day = 0;

                // 获取订单明细
                List<OrderDetailVo> orderDetailList = this.queryOrderDetailList(orderVo1.getOrder_sn());
                for (OrderDetailVo orderDetailVo : orderDetailList) {
                    switch (orderDetailVo.getDetail_type()) {
                        // 租金
                        case AppConfig.detail_type_1:
                            JSONObject product_detail = JSONObject.parseObject(orderDetailVo.getProduct_detail());
                            if (product_detail != null) {
                                Integer bcb_type = product_detail.getInteger("bcb_type");
                                if (bcb_type != null && bcb_type == 0) {
                                    detail_rent = orderDetailVo;
                                }
                            }
                            break;
                        // 滞纳金
                        case AppConfig.detail_type_17:
                            detail_fee = orderDetailVo;
                            break;
                    }
                }

                // 获取平台滞纳金
                if (detail_fee != null && detail_fee.getProduct_sn() != null) {
                    ContractBillVo contractBillVo = financeManageService.queryFinanceBill(detail_fee.getProduct_sn());
                    if (contractBillVo != null) {
                        platform_late_fee = contractBillVo.getBcb_repayment();
                    }
                }

                // 计算滞纳金
                if (detail_rent != null) {
                    // 当期应缴租金
                    double rent_detail_subtotal = detail_rent.getDetail_subtotal();
                    // 滞纳天数
                    current_late_day = AppUtil.getDay(orderVo1.getOrder_agreed_pay_date(), new Date());
                    current_late_day = current_late_day < 0 ? 0 : current_late_day;
                    // 当前滞纳金：当期应缴租金 * 1% * 滞纳天数
                    overdue_late_fee = new BigDecimal(rent_detail_subtotal).multiply(new BigDecimal(0.01)).multiply(new BigDecimal(current_late_day)).setScale(2, BigDecimal.ROUND_HALF_UP);
                    // 所有滞纳金
                    current_late_fee = platform_late_fee.add(overdue_late_fee).setScale(2, BigDecimal.ROUND_HALF_UP);
                    // 如果滞纳金大于租金，则滞纳金赋值租金
                    if (current_late_fee.doubleValue() > rent_detail_subtotal) current_late_fee = new BigDecimal(rent_detail_subtotal);
                }

                // 代偿滞纳金80元；逾期80天，逾期滞纳金120元。
                String detail_remarks = "逾期" + current_late_day + "天，逾期滞纳金" + overdue_late_fee + "元。";
                if (platform_late_fee.doubleValue() > 0) {
                    detail_remarks = "代偿滞纳金" + platform_late_fee + "元；" + detail_remarks;
                }

                if (current_late_fee.doubleValue() <= 0) return;

                // 添加|更新滞纳金
                if (detail_fee == null) {
                    OrderDetailVo orderDetailVo = new OrderDetailVo();
                    orderDetailVo.setOrder_sn(orderVo1.getOrder_sn());
                    orderDetailVo.setDetail_balpay(orderVo1.getOrder_balpay());
                    orderDetailVo.setDetail_type(AppConfig.detail_type_17);
                    orderDetailVo.setDetail_status(AppConfig.detail_status_2);
                    orderDetailVo.setProduct_type(0);
                    orderDetailVo.setProduct_sn(null);
                    orderDetailVo.setProduct_name("滞纳金");
                    orderDetailVo.setProduct_detail(null);
                    orderDetailVo.setProduct_price(current_late_fee.doubleValue());
                    orderDetailVo.setProduct_number(1);
                    orderDetailVo.setDetail_subtotal(current_late_fee.doubleValue());
                    orderDetailVo.setDetail_remarks(detail_remarks);
                    orderDetailVo.setDetail_operator(0);
                    orderDetailVo.setDetail_create_time(new Date());
                    this.addOrderDetail(orderDetailVo);
                } else {
                    OrderDetailVo orderDetailVo = new OrderDetailVo();
                    orderDetailVo.setDetail_id(detail_fee.getDetail_id());
                    orderDetailVo.setProduct_price(current_late_fee.doubleValue());
                    orderDetailVo.setDetail_subtotal(current_late_fee.doubleValue());
                    orderDetailVo.setDetail_remarks(detail_remarks);
                    this.updateOrderDetail(orderDetailVo);
                }

                // 更新合同账单
                if (detail_rent != null) {
                    ContractBillVo contractBillVo = financeManageService.queryFinanceBill(detail_rent.getProduct_sn());
                    if (contractBillVo != null) {
                        ContractBillVo contractBillVo1 = new ContractBillVo();
                        contractBillVo1.setBcb_id(contractBillVo.getBcb_id());
                        contractBillVo1.setBcb_late_fee(current_late_fee);
                        contractBillVo1.setBcb_overdueDay(current_late_day);
                        financeManageService.updateFinanceBill(contractBillVo1);
                    }
                }

                // 更新支付订单金额
                this._updatePayOrderForAmount(orderVo1.getOrder_sn());
            }
        }
    }

    public void _syncContractOrder(String bco_code) {
        if (StringUtils.isEmpty(bco_code)) {
            return;
        }

        // 查询合同订单
        ContractOrderVo financeOrder = financeManageService.queryFinanceOrder(bco_code);
        if (financeOrder == null) {
            return;
        }

//        financeManageService.queryContractBillForCurrentCycle()

        // 查询合同账单
        List<ContractBillVo> financeBillList = financeManageService.queryFinanceBillList(bco_code);
        financeBillList.sort(Comparator.comparing(ContractBillVo::getBcb_cycle));
        // 当前账单
        ContractBillVo currentBill = null;
        // 当前账单状态
        int currentBillState = 0;
        for (ContractBillVo contractBillVo : financeBillList) {
            if (currentBill == null) {
                currentBill = contractBillVo;
            }
            switch (contractBillVo.getBcb_state()) {
                case AppConfig.order_option_state_2:// 待支付
                    currentBill = contractBillVo;
                    break;
                case AppConfig.order_option_state_1:// 审核中
                    if (currentBill.getBcb_state() != AppConfig.order_option_state_2
                            && currentBill.getBcb_state() != AppConfig.order_option_state_1
                    ) {
                        currentBill = contractBillVo;
                    }
                    break;
                case AppConfig.order_option_state_5:// 第三方
                    if (currentBill.getBcb_state() != AppConfig.order_option_state_2
                            && currentBill.getBcb_state() != AppConfig.order_option_state_1
                            && currentBill.getBcb_state() != AppConfig.order_option_state_5
                    ) {
                        currentBill = contractBillVo;
                    }
                    break;
                case AppConfig.order_option_state_9:// 第三方
                    if (currentBill.getBcb_state() != AppConfig.order_option_state_2
                            && currentBill.getBcb_state() != AppConfig.order_option_state_1
                            && currentBill.getBcb_state() != AppConfig.order_option_state_5
                            && currentBill.getBcb_state() != AppConfig.order_option_state_9
                    ) {
                        currentBill = contractBillVo;
                    }
                    break;
                case AppConfig.order_option_state_3:// 已支付
                    if (currentBill.getBcb_state() != AppConfig.order_option_state_2
                            && currentBill.getBcb_state() != AppConfig.order_option_state_1
                            && currentBill.getBcb_state() != AppConfig.order_option_state_5
                            && currentBill.getBcb_state() != AppConfig.order_option_state_9
                            && currentBill.getBcb_state() != AppConfig.order_option_state_3
                    ) {
                        currentBill = contractBillVo;
                    }
                    break;
                default:
                    if (currentBill.getBcb_state() != AppConfig.order_option_state_2
                            && currentBill.getBcb_state() != AppConfig.order_option_state_1
                            && currentBill.getBcb_state() != AppConfig.order_option_state_5
                            && currentBill.getBcb_state() != AppConfig.order_option_state_9
                            && currentBill.getBcb_state() != AppConfig.order_option_state_3
                    ) {
                        currentBill = contractBillVo;
                    }
                    break;
            }
        }

    }


    // ==【数据处理】=========================================================


    private boolean deleteOrder(Integer order_id) {
        return orderDao.deleteOrder(order_id) > 0;
    }

    private boolean deleteOrderBill(Integer bill_id) {
        return orderDao.deleteOrderBill(bill_id) > 0;
    }

    public FinanceDownPaymentVo queryFinanceDownPayment(Integer fdp_id) {
        FinanceDownPaymentVo financeDownPaymentVo = new FinanceDownPaymentVo();
        financeDownPaymentVo.setFdp_id(fdp_id);
        return orderDao.queryFinanceDownPayment(financeDownPaymentVo);
    }

    public boolean addFinanceDownPayment(FinanceDownPaymentVo financeDownPaymentVo) {
        return orderDao.addFinanceDownPayment(financeDownPaymentVo) > 0;
    }

    public List<FinanceDownPaymentVo> queryFinanceDownPaymentList(FinanceDownPaymentVo financeDownPaymentVo) {
        return orderDao.queryFinanceDownPaymentList(financeDownPaymentVo);
    }

    public boolean updateOrderDetail(OrderDetailVo orderDetailVo) {
        return orderDao.updateOrderDetail(orderDetailVo) > 0;
    }

    public OrderDetailVo queryOrderDetail(OrderDetailVo orderDetailVo) {
        return orderDao.queryOrderDetail(orderDetailVo);
    }

    public OrderDetailVo queryOrderDetail(Integer detail_id) {
        OrderDetailVo orderDetailVo = new OrderDetailVo();
        orderDetailVo.setDetail_id(detail_id);
        return orderDao.queryOrderDetail(orderDetailVo);
    }

    public boolean addOrderDetail(OrderDetailVo orderDetailVo) {
        return orderDao.addOrderDetail(orderDetailVo) > 0;
    }

    public OrderVo queryOrder(String order_sn) {
        OrderVo orderVo = new OrderVo();
        orderVo.setOrder_sn(order_sn);
        return orderDao.queryOrder(orderVo);
    }

    public OrderVo queryOrder(OrderVo orderVo) {
        return orderDao.queryOrder(orderVo);
    }

    public boolean updateOrder(OrderVo orderVo) {
        return orderDao.updateOrder(orderVo) > 0;
    }

    public boolean updateOrderForAmount(OrderVo orderVo) {
        return orderDao.updateOrderForAmount(orderVo) > 0;
    }

    public List<OrderVo> queryOrderList(OrderVo orderVo) {
        return orderDao.queryOrderList(orderVo);
    }

    public boolean updateOrderBill(OrderBillVo orderBillVo) {
        return orderDao.updateOrderBill(orderBillVo) > 0;
    }

    public OrderBillVo queryOrderBill(OrderBillVo orderBillVo) {
        return orderDao.queryOrderBill(orderBillVo);
    }

    public OrderBillVo queryOrderBill(String bill_sn) {
        OrderBillVo orderBillVo = new OrderBillVo();
        orderBillVo.setBill_sn(bill_sn);
        return orderDao.queryOrderBill(orderBillVo);
    }

    public boolean addOrderBill(OrderBillVo orderBillVo) {
        return orderDao.addOrderBill(orderBillVo) > 0;
    }

    public boolean addOrder(OrderVo orderVo) {
        return orderDao.addOrder(orderVo) > 0;
    }

    public List<OrderDetailVo> queryOrderDetailList(OrderDetailVo orderDetailVo) {
        return orderDao.queryOrderDetailList(orderDetailVo);
    }

    public List<OrderDetailVo> queryOrderDetailList(String order_sn) {
        OrderDetailVo orderDetailVo = new OrderDetailVo();
        orderDetailVo.setOrder_sn(order_sn);
        return orderDao.queryOrderDetailList(orderDetailVo);
    }

    public void submitDetailInfo(JSONObject json, UserCenterEmployee employee) throws AppException {
        // 参数
        Integer detail_id = json.getInteger("detail_id");
        String order_sn = json.getString("order_sn");
        int detail_type = json.getIntValue("detail_type");
        String product_name = json.getString("product_name");
        Double product_price = json.getDouble("product_price");
        double detail_subtotal = json.getDoubleValue("detail_subtotal");
        String detail_remarks = json.getString("detail_remarks");
        if (StringUtils.isEmpty(order_sn)) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 订单明细收支
        int detail_balpay = detail_type == 1 ? 1 : 2;

        // 更新订单金额
        this._updatePayOrderForAmount(order_sn);

        // 验证订单金额
        OrderVo orderVo = this.queryOrder(order_sn);
        if (detail_balpay == 2 && orderVo.getOrder_amount_pay() < detail_subtotal) {
            throw new AppException("抵扣金额不能低于订单支付金额");
        }

        // ->添加订单明细
        if (StringUtils.isEmpty(detail_id)) {
            OrderDetailVo orderDetailVo = new OrderDetailVo();
            orderDetailVo.setOrder_sn(order_sn);
            orderDetailVo.setDetail_balpay(detail_balpay);
            orderDetailVo.setDetail_type(detail_type);
            orderDetailVo.setDetail_status(AppConfig.detail_status_2);
            orderDetailVo.setProduct_type(0);
            orderDetailVo.setProduct_sn(null);
            orderDetailVo.setProduct_name(product_name);
            orderDetailVo.setProduct_detail(null);
            orderDetailVo.setProduct_price(product_price);
            orderDetailVo.setProduct_number(1);
            orderDetailVo.setDetail_subtotal(detail_subtotal);
            orderDetailVo.setDetail_remarks(detail_remarks);
            orderDetailVo.setDetail_operator(employee.getEm_id());
            orderDetailVo.setDetail_create_time(new Date());
            this.addOrderDetail(orderDetailVo);
        }
        // ->更新订单明细
        else {
            OrderDetailVo orderDetailVo0 = this.queryOrderDetail(detail_id);
            if (orderDetailVo0 == null) {
                throw new AppException(Msg.MSG_PARAM_ERROR);
            }

            OrderDetailVo orderDetailVo = new OrderDetailVo();
            orderDetailVo.setDetail_id(detail_id);
            orderDetailVo.setDetail_balpay(detail_balpay);
            orderDetailVo.setDetail_type(detail_type);
            orderDetailVo.setProduct_name(product_name);
            orderDetailVo.setProduct_price(product_price);
            orderDetailVo.setDetail_subtotal(detail_subtotal);
            orderDetailVo.setDetail_remarks(detail_remarks);
            this.updateOrderDetail(orderDetailVo);

            // 更新合同账单
            if (orderDetailVo0.getProduct_sn() != null) {
                ContractBillVo contractBillVo = financeManageService.queryFinanceBill(orderDetailVo0.getProduct_sn());
                if (contractBillVo != null) {
                    ContractBillVo contractBillVo1 = new ContractBillVo();
                    contractBillVo1.setBcb_id(contractBillVo.getBcb_id());
                    contractBillVo1.setBcb_remarks(detail_remarks);
                    financeManageService.updateFinanceBill(contractBillVo1);
                }
            }
        }

        // 更新订单金额
        this._updatePayOrderForAmount(order_sn);
    }

    public void deleteDetailInfo(Integer detail_id) throws AppException {
        OrderDetailVo orderDetailVo0 = this.queryOrderDetail(detail_id);
        if (orderDetailVo0 == null) {
            throw new AppException(Msg.MSG_PARAM_ERROR);
        }

        // 删除订单明细
        this.deleteOrderDetail(detail_id);

        // 更新订单金额
        this._updatePayOrderForAmount(orderDetailVo0.getOrder_sn());
    }

    public boolean deleteOrderDetail(Integer detail_id) {
        OrderDetailVo orderDetailVo = new OrderDetailVo();
        orderDetailVo.setDetail_id(detail_id);
        return orderDao.deleteOrderDetail(orderDetailVo) > 0;
    }

}
