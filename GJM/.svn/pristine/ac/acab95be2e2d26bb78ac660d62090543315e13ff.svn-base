package com.gjp.util.rent;

import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayConstants;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.internal.util.AlipayEncrypt;
import com.alipay.api.internal.util.AlipaySignature;
import com.gjp.util.PropertiesUtil;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;

public class AliRent {

    // 支付配置
    private static Properties propertiesPay = PropertiesUtil.getProperties("/conf/rent.properties");
    // 支付请求地址
    private static String serverUrl = propertiesPay.getProperty("aliRentHouse_openapi_url");
    // APPID
    private static String appId = propertiesPay.getProperty("aliRentHouse_appid");
    // 公钥
    private static String publicKey = propertiesPay.getProperty("aliRentHouse_publicKey");
    // 私钥
    private static String privateKey = propertiesPay.getProperty("aliRentHouse_privatekey");
    // 小区状态同步回调
    public static String rentHouseInfo_notify_url = propertiesPay.getProperty("rentHouseInfo.notify_url");
    // 预约看房回调
    public static String rentHouseLook_notify_url = propertiesPay.getProperty("rentHouseLook.notify_url");
    // 拨号记录回调
    public static String rentHouseTel_otify_url = propertiesPay.getProperty("rentHouseTel.notify_url");
    // 数据格式
    private static String format = propertiesPay.getProperty("alipay.format");
    // 编码格式
    private static String charset = propertiesPay.getProperty("alipay.charset");
    // 签名算法类型
    private static String signType = propertiesPay.getProperty("alipay.sign_type");
    // spi_privateKey
    private static String spi_privateKey = propertiesPay.getProperty("aliRentHouse_spi_privateKey");
    // 过期时间
    private static String timeout_express = propertiesPay.getProperty("alipay.timeout_express");
    // 支付宝客户端
    private static DefaultAlipayClient alipayClient;
    // 时间格式化
    private static SimpleDateFormat sdf_time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    /**
     * 获取客户端
     *
     * @return
     * @author shenhx
     * @version 2018年1月29日上午11:45:49
     */
    private static DefaultAlipayClient getAlipayClient() {
        if (alipayClient == null) {
            alipayClient = new DefaultAlipayClient(serverUrl, appId, privateKey, format, charset, publicKey, signType);
        }
        return alipayClient;
    }

    /**
     * 获取参数
     *
     * @return
     * @throws AlipayApiException
     * @author shenhx
     * @version 2018年1月29日上午11:45:49
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
     * @author shenhx
     * @version 2018年1月29日上午11:45:49
     */
    public static boolean checkSignature(HttpServletRequest request) throws AlipayApiException {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        boolean rsaRes = false;
        try {
            Map<String, String> params = new HashMap<String, String>();
            if (null != request) {
                Set<String> paramsKey = request.getParameterMap().keySet();
                for (String key : paramsKey) {
                    params.put(key, request.getParameter(key));
                }
            }
            // 验签操作
            System.out.println(params);
            rsaRes = AlipaySignature.rsaCheckV2(params, publicKey, AlipayConstants.CHARSET_UTF8);
        } catch (AlipayApiException e){
            throw new AlipayApiException("验签异常");
        }
        return rsaRes;
    }

    /**
     * 格式化电话
     * @param signPhone
     * @return
     * @throws AlipayApiException
     */
    public static String formatPhone(String signPhone) throws AlipayApiException {
        return AlipayEncrypt.decryptContent(signPhone, "AES", spi_privateKey, AlipayConstants.CHARSET_UTF8);
    }
}
