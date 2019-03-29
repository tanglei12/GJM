package com.gjp.util.pay;

import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.internal.util.AlipaySignature;
import com.alipay.api.internal.util.StringUtils;
import com.alipay.api.request.*;
import com.alipay.api.response.*;
import com.gjp.util.AppException;
import com.gjp.util.Msg;
import com.gjp.util.PropertiesUtil;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * 支付-支付宝
 *
 * @author JiangQt
 * @version 2017年6月22日下午3:34:35
 */
public class AliPay {

    // 支付宝客户端
    private static DefaultAlipayClient alipayClient;

    // 支付配置
    private static Properties propertiesPay = PropertiesUtil.getProperties("/conf/pay.properties");

    // 支付请求地址
    private static String serverUrl = propertiesPay.getProperty("alipay.url");
    // APPID
    private static String appId = propertiesPay.getProperty("alipay.app_id");
    // 公钥
    private static String publicKey = propertiesPay.getProperty("alipay.public_key");
    // 私钥
    private static String privateKey = propertiesPay.getProperty("alipay.private_key");
    // 消息通知
    public static String notify_url = propertiesPay.getProperty("alipay.notify_url");
    // 数据格式
    private static String format = propertiesPay.getProperty("alipay.format");
    // 编码格式
    private static String charset = propertiesPay.getProperty("alipay.charset");
    // 签名算法类型
    private static String signType = propertiesPay.getProperty("alipay.sign_type");
    // 过期时间
    private static String timeout_express = propertiesPay.getProperty("alipay.timeout_express");

    /**
     * 获取客户端
     *
     * @return
     * @author JiangQt
     * @version 2017年6月21日上午11:45:49
     */
    private static DefaultAlipayClient getAlipayClient() {
        if (alipayClient == null) {
            alipayClient = new DefaultAlipayClient(serverUrl, appId, privateKey, format, charset, publicKey, signType);
        }
        return alipayClient;
    }

    /**
     * 阿里支付-线下交易预创建（生成支付二维码）
     *
     * @param out_trade_no 商户订单号(必选，64个字符以内、只能包含字母、数字、下划线；需保证在商户端不重复)
     * @param subject      订单标题(必选)
     * @param body         对交易或商品的描述(可选)
     * @param total_amount 订单总金额(必选)
     * @return
     * @throws AlipayApiException
     * @throws AppException
     * @author JiangQt
     * @version 2017年6月20日下午7:13:11
     */
    public static Msg<Object> alipayTradePrecreate(String out_trade_no, String total_amount, String subject, String body, String notify_url) throws AppException {
        Msg<Object> msg = new Msg<>();
        // 支付请求
        AlipayTradePrecreateRequest request = new AlipayTradePrecreateRequest();
        // 请求参数
        JSONObject bizContent = new JSONObject();
        bizContent.put("out_trade_no", out_trade_no == null ? "" : out_trade_no);
        bizContent.put("total_amount", total_amount == null ? "" : total_amount);
        bizContent.put("subject", subject == null ? "" : subject);
        bizContent.put("body", body == null ? "" : body);
        bizContent.put("timeout_express", timeout_express);
        request.setBizContent(bizContent.toJSONString());
        // 回调地址
        request.setNotifyUrl(notify_url);
        // 执行请求
        try {
            AlipayTradePrecreateResponse response = getAlipayClient().execute(request);
            if (response == null) {
                throw new AppException(Msg.CODE_FAIL, "查询失败");
            }
            if (!response.isSuccess()) {
                throw new AppException(Msg.CODE_FAIL, response.getSubMsg());
            }
            msg.put("trade_code", response.getOutTradeNo());
            msg.put("qr_code", response.getQrCode());
        } catch (AlipayApiException e) {
            throw new AppException(Msg.CODE_FAIL, "查询失败");
        }
        return msg;
    }

    /**
     * 阿里支付-交易查询
     *
     * @param out_trade_no 商户订单号(特殊可选，但不能与trade_no一起为空)
     * @return
     * @author JiangQt
     * @version 2017年6月21日上午11:48:16
     */
    public static Msg<Object> alipayTradeQuery(String out_trade_no) throws AppException {
        return alipayTradeQuery(out_trade_no, null);
    }

    /**
     * 阿里支付-交易查询
     *
     * @param trade_no     交易流水号(特殊可选，但不能与out_trade_no一起为空)
     * @param out_trade_no 商户订单号(特殊可选，但不能与trade_no一起为空)
     * @return
     * @throws AlipayApiException
     * @author JiangQt
     * @version 2017年6月21日上午11:48:16
     */
    public static Msg<Object> alipayTradeQuery(String out_trade_no, String trade_no) throws AppException {
        Msg<Object> msg = new Msg<>();
        // 支付请求
        AlipayTradeQueryRequest request = new AlipayTradeQueryRequest();
        // 请求参数
        JSONObject bizContent = new JSONObject();
        bizContent.put("out_trade_no", out_trade_no == null ? "" : out_trade_no);
        bizContent.put("trade_no", trade_no == null ? "" : trade_no);
        request.setBizContent(bizContent.toJSONString());
        try {
            // 执行请求
            AlipayTradeQueryResponse response = getAlipayClient().execute(request);
            if (response == null) {
                throw new AppException(Msg.CODE_FAIL, "查询失败");
            }
            if (!response.isSuccess()) {
                throw new AppException(Msg.CODE_FAIL, response.getSubMsg());
            }
            switch (response.getTradeStatus()) {
                case "TRADE_FINISHED": // 交易完成
                case "TRADE_SUCCESS":  // 交易成功
                    msg.put("trade_state", "支付成功");
                    // 支付金额
                    msg.put("trade_money", response.getTotalAmount());
                    // 支付时间
                    msg.put("trade_time", response.getSendPayDate() == null ? new Date() : response.getSendPayDate());
                    // 交易流水号
                    msg.put("trade_no", response.getTradeNo());
                    // 交易流水号
                    msg.put("buyer_logon_id", response.getBuyerLogonId());
                    // 所有信息
                    msg.put("body", response.getBody());
                    break;
                case "WAIT_BUYER_PAY":
                    return msg.setMsg(Msg.CODE_WAITING, "等待支付");
                case "TRADE_CLOSED":
                    return msg.setMsg(Msg.CODE_FAIL, "交易关闭");
                default:
                    return msg.setMsg(Msg.CODE_FAIL, response.getTradeStatus());
            }
        } catch (AlipayApiException e) {
            e.printStackTrace();
            throw new AppException(Msg.CODE_FAIL, "查询失败");
        }
        return msg;
    }

    /**
     * 阿里支付-关闭交易
     *
     * @param out_trade_no 交易流水号(特殊可选，但不能与out_trade_no一起为空)
     * @return
     * @throws AlipayApiException
     * @throws AppException
     * @author JiangQt
     * @version 2017年6月20日下午7:13:11
     */
    public static Msg<Object> alipayTradeClose(String out_trade_no) throws AppException {
        return alipayTradeClose(null, out_trade_no, null);
    }

    /**
     * 阿里支付-关闭交易
     *
     * @param trade_no     交易流水号(特殊可选，但不能与out_trade_no一起为空)
     * @param out_trade_no 商户订单号(特殊可选，但不能与trade_no一起为空)
     * @param operator_id  操作员ID(可选)
     * @return
     * @throws AlipayApiException
     * @throws AppException
     * @author JiangQt
     * @version 2017年6月20日下午7:13:11
     */
    public static Msg<Object> alipayTradeClose(String trade_no, String out_trade_no, String operator_id) throws AppException {
        Msg<Object> msg = new Msg<>();
        // 支付请求
        AlipayTradeCloseRequest request = new AlipayTradeCloseRequest();
        // 参数
        JSONObject bizContent = new JSONObject();
        bizContent.put("out_trade_no", out_trade_no == null ? "" : out_trade_no);
        bizContent.put("trade_no", trade_no == null ? "" : trade_no);
        bizContent.put("operator_id", operator_id == null ? "" : operator_id);
        request.setBizContent(bizContent.toJSONString());
        // 执行请求
        try {
            AlipayTradeCloseResponse response = getAlipayClient().execute(request);
            if (response == null) {
                throw new AppException(Msg.CODE_FAIL, "查询失败");
            }
            if (!response.isSuccess()) {
                throw new AppException(Msg.CODE_FAIL, response.getSubMsg());
            }
            msg.setData(response.getBody());
        } catch (AlipayApiException e) {
            throw new AppException(Msg.CODE_FAIL, "查询失败");
        }
        return msg;
    }

    /**
     * 阿里支付-交易退款查询
     *
     * @param out_trade_no 商户订单号(特殊可选，但不能与trade_no一起为空)
     * @return
     * @throws AppException
     */
    public static Msg<Object> alipayTradeRefundQuery(String out_trade_no) throws AppException {
        return alipayTradeRefundQuery(null, out_trade_no);
    }

    /**
     * 阿里支付-交易退款查询
     *
     * @param trade_no     交易流水号(特殊可选，但不能与out_trade_no一起为空)
     * @param out_trade_no 商户订单号(特殊可选，但不能与trade_no一起为空)
     * @return
     * @throws AlipayApiException
     * @throws AppException
     * @author JiangQt
     * @version 2017年6月21日上午11:48:16
     */
    public static Msg<Object> alipayTradeRefundQuery(String trade_no, String out_trade_no) throws AppException {
        Msg<Object> msg = new Msg<>();
        // 支付请求
        AlipayTradeFastpayRefundQueryRequest request = new AlipayTradeFastpayRefundQueryRequest();
        // 请求参数
        JSONObject bizContent = new JSONObject();
        bizContent.put("trade_no", trade_no == null ? "" : trade_no);
        bizContent.put("out_trade_no", out_trade_no == null ? "" : out_trade_no);
        bizContent.put("out_request_no", out_trade_no == null ? "" : out_trade_no);
        request.setBizContent(bizContent.toJSONString());
        // 执行请求
        try {
            AlipayTradeFastpayRefundQueryResponse response = getAlipayClient().execute(request);
            if (response == null) {
                throw new AppException(Msg.CODE_FAIL, "查询失败");
            }
            if (!response.isSuccess()) {
                throw new AppException(Msg.CODE_FAIL, response.getSubMsg());
            }
            // 支付金额
            if (!StringUtils.isEmpty(response.getTotalAmount())) {
                msg.put("trade_money", response.getTotalAmount());
            }
            // 退款金额
            if (!StringUtils.isEmpty(response.getRefundAmount())) {
                msg.put("trade_refund_money", response.getRefundAmount());
            }
            // 交易流水号
            msg.put("trade_no", response.getTradeNo());
            // 所有信息
            msg.put("body", response.getBody());
        } catch (AlipayApiException e) {
            throw new AppException(Msg.CODE_FAIL, "查询失败");
        }
        return msg;
    }

    /**
     * 阿里支付-交易退款
     *
     * @param trade_no      交易流水号(特殊可选，不能与out_trade_no一起为空)
     * @param refund_amount 需要退款的金额（必选，该金额不能大于订单金额,单位为元，支持两位小数）
     * @param refund_reason 退款的原因说明（可选）
     * @return
     * @throws AppException
     * @author JiangQt
     * @version 2017年6月21日上午11:48:16
     */
    public static Msg<Object> alipayTradeRefund(String trade_no, String refund_amount, String refund_reason) throws AppException {
        return alipayTradeRefund(trade_no, null, refund_amount, refund_reason, null, null, null, null);
    }

    /**
     * 阿里支付-交易退款
     *
     * @param trade_no       交易流水号(特殊可选，不能与out_trade_no一起为空)
     * @param out_trade_no   商户订单号(特殊可选，不能与trade_no一起为空)
     * @param refund_amount  需要退款的金额（必选，该金额不能大于订单金额,单位为元，支持两位小数）
     * @param refund_reason  退款的原因说明（可选）
     * @param out_request_no 标识一次退款请求，同一笔交易多次退款需要保证唯一，如需部分退款，则此参数必传。（可选）
     * @param operator_id    商户的操作员编号（可选）
     * @param store_id       商户的门店编号（可选）
     * @param terminal_id    商户的终端编号（可选）
     * @return
     * @throws AlipayApiException
     * @throws AppException
     * @author JiangQt
     * @version 2017年6月21日上午11:48:16
     */
    public static Msg<Object> alipayTradeRefund(String trade_no, String out_trade_no, String refund_amount, String refund_reason, String out_request_no, String operator_id, String store_id, String terminal_id) throws AppException {
        Msg<Object> msg = new Msg<>();
        // 支付请求
        AlipayTradeRefundRequest request = new AlipayTradeRefundRequest();
        // 请求参数
        JSONObject bizContent = new JSONObject();
        bizContent.put("out_trade_no", out_trade_no == null ? "" : out_trade_no);
        bizContent.put("trade_no", trade_no == null ? "" : trade_no);
        bizContent.put("refund_amount", refund_amount == null ? "" : refund_amount);
        bizContent.put("refund_reason", refund_reason == null ? "" : refund_reason);
        bizContent.put("out_request_no", out_request_no == null ? "" : out_request_no);
        bizContent.put("operator_id", operator_id == null ? "" : operator_id);
        bizContent.put("store_id", store_id == null ? "" : store_id);
        bizContent.put("terminal_id", terminal_id == null ? "" : terminal_id);
        request.setBizContent(bizContent.toJSONString());
        // 执行请求
        try {
            AlipayTradeRefundResponse response = getAlipayClient().execute(request);
            if (response == null) {
                throw new AppException(Msg.CODE_FAIL, "查询失败");
            }
            if (!response.isSuccess()) {
                throw new AppException(Msg.CODE_FAIL, response.getSubMsg());
            }
            msg.setData(response.getBody());
        } catch (AlipayApiException e) {
            throw new AppException(Msg.CODE_FAIL, "查询失败");
        }
        return msg;
    }

    // ==================================================================

    /**
     * 获取参数
     *
     * @return
     * @throws AlipayApiException
     * @author JiangQt
     * @version 2017年6月22日上午10:37:32
     */
    public static Map<String, String> getParams(HttpServletRequest request) {
        // 取出所有参数是为了验证签名
        Map<String, String> params = new HashMap<>();
        Enumeration parameterNames = request.getParameterNames();
        while (parameterNames.hasMoreElements()) {
            String parameterName = (String) parameterNames.nextElement();
            params.put(parameterName, request.getParameter(parameterName));
        }
        return params;
    }

    /**
     * 验证支付签名
     *
     * @return
     * @throws AlipayApiException
     * @author JiangQt
     * @version 2017年6月22日上午10:37:32
     */
    public static boolean checkSignature(Map<String, String> params) throws AlipayApiException {
        return AlipaySignature.rsaCheckV1(params, publicKey, charset, signType);
    }

}
