package com.gjp.util.pay;

import com.gjp.util.*;
import org.springframework.util.StringUtils;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.text.ParseException;
import java.util.*;

/**
 * @author JiangQt
 * @description
 * @date Created in 2017-7-31
 */
public class WeixinPay {

    // 支付配置
    private static Properties propertiesPay = PropertiesUtil.getProperties("/conf/pay.properties");

    // 统一下单地址
    public static String url_unifiedorder = propertiesPay.getProperty("weixin.url_unifiedorder");
    // 订单查询地址
    public static String url_orderquery = propertiesPay.getProperty("weixin.url_orderquery");
    // 订单查询地址
    public static String url_refundquery = propertiesPay.getProperty("weixin.url_refundquery");
    // 订单关闭
    public static String url_closeorder = propertiesPay.getProperty("weixin.url_closeorder");

    /* ==商户号== */

    // APPID
    public static String merchant_appid = propertiesPay.getProperty("weixin.merchant.appid");
    // 商户号
    public static String merchant_mch_id = propertiesPay.getProperty("weixin.merchant.mch_id");
    // 开发密钥
    public static String merchant_key = propertiesPay.getProperty("weixin.merchant.api_key");

    /* ==公众号== */

    // APPID
    public static String public_appid = propertiesPay.getProperty("weixin.public.appid");
    // 商户号
    public static String public_mch_id = propertiesPay.getProperty("weixin.public.mch_id");
    // 开发密钥
    public static String public_key = propertiesPay.getProperty("weixin.public.api_key");
    // 回调地址
    public static String notify_url = propertiesPay.getProperty("weixin.notify_url");

    /**
     * 微信交易预创建--二维码
     *
     * @param out_trade_no     商户订单号
     * @param title            标题
     * @param subtitle         商品详情
     * @param total_price      商品金额
     * @param spbill_create_ip 终端IP
     * @return
     * @throws AppException
     */
    public static Msg<Object> weixinTradePrecreateScanCode(String out_trade_no, String title, String subtitle, String total_price, String spbill_create_ip) throws AppException {
        return weixinTradePrecreateScanCode(out_trade_no, title, subtitle, total_price, spbill_create_ip, notify_url);
    }

    /**
     * 微信交易预创建--二维码
     *
     * @param out_trade_no     商户订单号
     * @param title            标题
     * @param subtitle         商品详情
     * @param total_price      商品金额
     * @param spbill_create_ip 终端IP
     * @return
     * @throws AppException
     */
    public static Msg<Object> weixinTradePrecreateScanCode(String out_trade_no, String title, String subtitle, String total_price, String spbill_create_ip, String notify_url) throws AppException {
        Msg<Object> msg = new Msg<>();
        // 设置参数
        SortedMap<Object, Object> params = new TreeMap<>();
        params.put("appid", merchant_appid);
        params.put("mch_id", merchant_mch_id);
        params.put("body", title);
        params.put("detail", subtitle);
        params.put("nonce_str", AppUtil.getRandStr(32));
        params.put("out_trade_no", out_trade_no);
        params.put("total_fee", (int) (Double.valueOf(total_price) * 100) + "");
        params.put("spbill_create_ip", spbill_create_ip);
        params.put("trade_type", "NATIVE");
        params.put("notify_url", notify_url);
        params.put("sign", createSign(params, merchant_key));

        // 请求服务器
        Map<String, String> map = requestWeixin(url_unifiedorder, params);
        if (map == null) {
            throw new AppException(Msg.CODE_FAIL, "查询失败");
        }
        if ("FAIL".equals(map.get("result_code"))) {
            throw new AppException(Msg.CODE_FAIL, "查询失败");
        }
        if ("FAIL".equals(map.get("return_code"))) {
            throw new AppException(Msg.CODE_FAIL, map.get("return_msg"));
        }

        msg.put("prepay_id", map.get("prepay_id"));
        msg.put("qr_code", map.get("code_url"));
        return msg;
    }

    /**
     * 交易关闭
     *
     * @param out_trade_no
     * @return
     * @throws AppException
     */
    public static Msg<Object> weixinTradeClose(String out_trade_no) throws AppException {
        return weixinTradeClose(out_trade_no, null, null);
    }

    /**
     * 交易关闭
     *
     * @param out_trade_no
     * @param trade_no
     * @param mode
     * @return
     * @throws AppException
     */
    public static Msg<Object> weixinTradeClose(String out_trade_no, String trade_no, String mode) throws AppException {
        Msg<Object> msg = new Msg<>();
        // 设置参数
        SortedMap<Object, Object> params = new TreeMap<>();
        params.put("appid", "public".equals(mode) ? public_appid : merchant_appid);
        params.put("mch_id", "public".equals(mode) ? public_mch_id : merchant_mch_id);
        if (!StringUtils.isEmpty(out_trade_no)) params.put("out_trade_no", out_trade_no);
        if (!StringUtils.isEmpty(trade_no)) params.put("transaction_id", trade_no);
        params.put("nonce_str", AppUtil.getRandStr(32));
        params.put("sign", createSign(params, "public".equals(mode) ? public_key : merchant_key));

        // 请求服务器
        Map<String, String> map = requestWeixin(url_closeorder, params);
        if (map == null) {
            throw new AppException(Msg.CODE_FAIL, "查询失败");
        }
        if ("FAIL".equals(map.get("result_code"))) {
            throw new AppException(Msg.CODE_FAIL, "查询失败");
        }
        if ("FAIL".equals(map.get("return_code"))) {
            throw new AppException(Msg.CODE_FAIL, map.get("return_msg"));
        }
        return msg;
    }

    // ==================================================================

    /**
     * 交易查询
     *
     * @param out_trade_no
     * @return
     */
    public static Msg<Object> weixinTradeQuery(String out_trade_no) throws AppException {
        return weixinTradeQuery(out_trade_no, null, null);
    }

    /**
     * 交易查询
     *
     * @param out_trade_no
     * @return
     * @throws Exception
     */
    public static Msg<Object> weixinTradeQuery(String out_trade_no, String trade_no, String mode) throws AppException {
        Msg<Object> msg = new Msg<>();
        // 设置参数
        SortedMap<Object, Object> params = new TreeMap<>();
        params.put("appid", "public".equals(mode) ? public_appid : merchant_appid);
        params.put("mch_id", "public".equals(mode) ? public_mch_id : merchant_mch_id);
        if (!StringUtils.isEmpty(out_trade_no)) params.put("out_trade_no", out_trade_no);
        if (!StringUtils.isEmpty(trade_no)) params.put("transaction_id", trade_no);
        params.put("nonce_str", AppUtil.getRandStr(32));
        params.put("sign", createSign(params, "public".equals(mode) ? public_key : merchant_key));

        // 请求服务器
        Map<String, String> map = requestWeixin(url_orderquery, params);
        if (map == null) {
            throw new AppException(Msg.CODE_FAIL, "查询失败");
        }
        if ("FAIL".equals(map.get("result_code"))) {
            throw new AppException(Msg.CODE_FAIL, "查询失败");
        }
        if ("FAIL".equals(map.get("return_code"))) {
            throw new AppException(Msg.CODE_FAIL, map.get("return_msg"));
        }

        // 交易流水号
        String transaction_id = map.get("transaction_id");
        // 支付状态
        String trade_state = map.get("trade_state");
        // 支付金额
        String total_fee = map.get("total_fee");
        // 支付时间
        String time_end = map.get("time_end");

        switch (trade_state) {
            case "SUCCESS":
                msg.put("trade_state", "支付成功");
                // 支付金额
                BigDecimal total_fee_big = new BigDecimal(Integer.valueOf(total_fee));
                msg.put("trade_money", total_fee_big.divide(new BigDecimal(100), 2, BigDecimal.ROUND_HALF_UP).doubleValue());
                // 支付时间
                try {
                    Date pay_time = AppUtil.sdf_time_str.parse(time_end);
                    msg.put("trade_time", pay_time == null ? new Date() : pay_time);
                } catch (ParseException e) {
                    System.out.println("格式错误");
                    e.printStackTrace();
                }
                // 交易流水号
                msg.put("trade_no", transaction_id);
                // 详情
                msg.put("body", map.toString());
                break;
            case "USERPAYING":
                return msg.setMsg(Msg.CODE_WAITING, "等待支付");
            case "PAYERROR":
                return msg.setMsg(Msg.CODE_FAIL, "支付失败");
            case "CLOSED":
                return msg.setMsg(Msg.CODE_FAIL, "交易关闭");
            case "REFUND":
                return msg.setMsg(Msg.CODE_FAIL, "已退款");
            case "NOTPAY":
                return msg.setMsg(Msg.CODE_FAIL, "未支付");
            case "REVOKED":
                return msg.setMsg(Msg.CODE_FAIL, "已撤销");
            default:
                return msg.setMsg(Msg.CODE_FAIL, trade_state);
        }
        return msg;
    }

    /**
     * 交易退款查询
     *
     * @param out_trade_no
     * @return
     */
    public static Msg<Object> weixinTradeRefundquery(String out_trade_no) throws AppException {
        return weixinTradeRefundquery(out_trade_no, null, "merchant");
    }

    /**
     * 交易退款查询
     *
     * @param out_trade_no
     * @param mode
     * @return
     * @throws Exception
     */
    public static Msg<Object> weixinTradeRefundquery(String out_trade_no, String trade_no, String mode) throws AppException {
        Msg<Object> msg = new Msg<>();
        // 设置参数
        SortedMap<Object, Object> params = new TreeMap<>();
        params.put("appid", "public".equals(mode) ? public_appid : merchant_appid);
        params.put("mch_id", "public".equals(mode) ? public_mch_id : merchant_mch_id);
        if (!StringUtils.isEmpty(out_trade_no)) params.put("out_trade_no", out_trade_no);
        if (!StringUtils.isEmpty(trade_no)) params.put("transaction_id", trade_no);
        params.put("nonce_str", AppUtil.getRandStr(32));
        params.put("sign", createSign(params, "public".equals(mode) ? public_key : merchant_key));

        // 请求服务器
        Map<String, String> map = requestWeixin(url_refundquery, params);
        if (map == null) {
            throw new AppException(Msg.CODE_FAIL, "查询失败");
        }
        if ("FAIL".equals(map.get("result_code"))) {
            throw new AppException(Msg.CODE_FAIL, "查询失败");
        }
        if ("FAIL".equals(map.get("return_code"))) {
            throw new AppException(Msg.CODE_FAIL, map.get("return_msg"));
        }

        String transaction_id = map.get("transaction_id");
        String total_fee = map.get("total_fee");
        String refund_fee = map.get("refund_fee");
        String time_end = map.get("refund_success_time_0");
        // 交易流水号
        msg.put("trade_no", transaction_id);
        // 交易状态
        msg.put("trade_state", "已退款");
        // 退款金额
        BigDecimal refund_fee_big = new BigDecimal(Integer.valueOf(refund_fee));
        msg.put("trade_refund_money", refund_fee_big.divide(new BigDecimal(100), 2, BigDecimal.ROUND_HALF_UP).doubleValue());
        // 支付金额
        BigDecimal total_fee_big = new BigDecimal(Integer.valueOf(total_fee));
        msg.put("trade_money", total_fee_big.divide(new BigDecimal(100), 2, BigDecimal.ROUND_HALF_UP).doubleValue());
        // 退款时间
        try {
            msg.put("trade_refund_time", AppUtil.sdf_time.parse(time_end));
        } catch (ParseException e) {
            System.out.println("格式错误");
            e.printStackTrace();
        }
        // 详情
        msg.put("body", map.toString());
        return msg;
    }

    // ==================================================================

    /**
     * 验证签名
     *
     * @param params 参数集
     * @return
     */
    public static boolean checkSign(SortedMap<Object, Object> params) {
        String mysign = createSign(params, merchant_key);
        String sign = params.get("sign").toString().toUpperCase();
        return sign.equals(mysign);
    }

    /**
     * 微信支付签名算法sign
     *
     * @param parameters
     * @param key
     * @return
     */
    public static String createSign(SortedMap<Object, Object> parameters, String key) {
        StringBuilder sb = new StringBuilder();
        //所有参与传参的参数按照accsii排序（升序）
        for (Map.Entry entry : parameters.entrySet()) {
            Object k = entry.getKey();
            Object v = entry.getValue();
            if (null != v && !"".equals(v) && !"sign".equals(k) && !"key".equals(k)) {
                sb.append(k).append("=").append(v).append("&");
            }
        }
        sb.append("key=").append(key);
        return MD5Encode(sb.toString()).toUpperCase();
    }

    /**
     * 获取参数集
     *
     * @param request
     * @return
     * @throws AppException
     */
    public static SortedMap<Object, Object> getParams(HttpServletRequest request) throws AppException {
        SortedMap<Object, Object> packageParams = new TreeMap<>();
        StringBuilder sb = new StringBuilder();
        try (InputStream inputStream = request.getInputStream(); BufferedReader in = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
            String s;
            while ((s = in.readLine()) != null) {
                sb.append(s);
            }
            Map m = XMLUtil.xmlToMap(sb.toString());
            assert m != null;
            for (Object parameter : m.keySet()) {
                String parameterValue = (String) m.get(parameter);
                String v = "";
                if (null != parameterValue) {
                    v = parameterValue.trim();
                }
                packageParams.put(parameter, v);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new AppException(Msg.MSG_SYSTEM_ERROR);
        }
        return packageParams;
    }

    // ==================================================================

    /**
     * post请求并得到返回结果
     *
     * @param requestUrl 请求地址
     * @param params     请求参数
     * @return
     */
    private static Map<String, String> requestWeixin(String requestUrl, SortedMap<Object, Object> params) {
        String output = parseMapToXml(params);
        StringBuilder buffer = new StringBuilder();
        try {
            URL url = new URL(requestUrl);
            HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setUseCaches(false);
            connection.setRequestMethod("POST");
            OutputStream outputStream = connection.getOutputStream();
            outputStream.write(output.getBytes(StandardCharsets.UTF_8));
            outputStream.close();
            // 从输入流读取返回内容
            InputStream inputStream = connection.getInputStream();
            InputStreamReader inputStreamReader = new InputStreamReader(inputStream, StandardCharsets.UTF_8);
            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
            String str;
            while ((str = bufferedReader.readLine()) != null) {
                buffer.append(str);
            }
            bufferedReader.close();
            inputStreamReader.close();
            inputStream.close();
            connection.disconnect();
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
        return XMLUtil.xmlToMap(buffer.toString());
    }

    /**
     * 解析MAP转XML
     *
     * @param parameters 请求参数
     * @return
     */
    private static String parseMapToXml(SortedMap<Object, Object> parameters) {
        StringBuilder sb = new StringBuilder();
        sb.append("<xml>");
        for (Map.Entry entry : parameters.entrySet()) {
            String k = (String) entry.getKey();
            String v = (String) entry.getValue();
            if ("attach".equalsIgnoreCase(k) || "body".equalsIgnoreCase(k)) {
                sb.append("<").append(k).append(">").append("<![CDATA[").append(v).append("]]></").append(k).append(">");
            } else {
                sb.append("<").append(k).append(">").append(v).append("</").append(k).append(">");
            }
        }
        sb.append("</xml>");
        return sb.toString();
    }

    private static String byteArrayToHexString(byte b[]) {
        StringBuilder resultSb = new StringBuilder();
        for (byte aB : b) resultSb.append(byteToHexString(aB));
        return resultSb.toString();
    }

    private static String byteToHexString(byte b) {
        final String hexDigits[] = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"};
        int n = b;
        if (n < 0)
            n += 256;
        int d1 = n / 16;
        int d2 = n % 16;
        return hexDigits[d1] + hexDigits[d2];
    }

    private static String MD5Encode(String origin) {
        String resultString = null;
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            resultString = byteArrayToHexString(md.digest(origin.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception ignored) {
        }
        return resultString;
    }

}
