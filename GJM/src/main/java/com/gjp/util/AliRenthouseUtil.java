package com.gjp.util;

import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.internal.util.json.JSONWriter;
import com.alipay.api.request.*;
import com.alipay.api.response.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * 支付宝租房调用接口
 *
 * @author shenhx
 * @create 2018-01-12 9:32
 **/
public class AliRenthouseUtil {

    // 支付配置
    private static Properties propertiesPay = PropertiesUtil.getProperties("/conf/rent.properties");

    private static String TP_PRIVATEKEY = propertiesPay.getProperty("aliRentHouse_privatekey");
    private static String TP_OPENAPI_URL = propertiesPay.getProperty("aliRentHouse_openapi_url");
    private static String TP_APPID = propertiesPay.getProperty("aliRentHouse_appid");//测试环境

    public static void main(String[] args) throws AlipayApiException {
        //小区同步
//        TPJavaClient client = new TPJavaClient();
//        client.testState();
        /*Map<String, Object> map = new HashMap<>();
        map.put("city_code", "310000");
        map.put("district_code", "310104");
        map.put("community_name", "徐家汇花园");
        map.put("address", "宛平南路255弄");
        System.out.println(JSONObject.toJSONString(map));
        Map<String, Object> response = renthouseCommunityInfoSync(JSONObject.toJSONString(map));
        System.out.println(response.get("response_body"));*/


        /**
         * 公寓运营商服务地址注册
         */
        Map<String, Object> map = new HashMap<>();
        map.put("ka_code", "aMNjHqSxnNLVDIcfE");
        map.put("type", "3");
        //map.put("address", "http://jt622202.oicp.net:36398/houseLibrary/telephoneRecords");//电话记录
        //map.put("address", "http://jt622202.oicp.net:36398/houseLibrary/updatPropertyInfoName");//小区状态同步
        map.put("address", "http://jt622202.oicp.net:36398/houseLibrary/lookAtHouse");//预约看房
        System.out.println(JSONObject.toJSONString(map));
        AliRenthouseUtil aliRenthouseUtil = new AliRenthouseUtil();
        Map<String, Object> response = aliRenthouseUtil.renthouseKaServiceCreate(JSONObject.toJSONString(map));
        System.out.println(response.get("response_body"));

    }

    /**
     * 分散式房源同步
     *
     * @param dispersion 参数json字符串
     * @throws AlipayApiException
     */
    public static Map<String, Object> dispersionSync(String dispersion) throws AlipayApiException {
        Map<String, Object> map = new HashMap<>();
        AlipayClient alipayClient = new DefaultAlipayClient(TP_OPENAPI_URL, TP_APPID, TP_PRIVATEKEY, "json", "UTF-8");
        AlipayEcoRenthouseRoomDispersionSyncRequest request = new AlipayEcoRenthouseRoomDispersionSyncRequest();
        request.setBizContent(dispersion);
        AlipayEcoRenthouseRoomDispersionSyncResponse response = alipayClient.execute(request);
        JSONObject jsonObject = JSONObject.parseObject(response.getBody());
        map.put("response_body", jsonObject.get("alipay_eco_renthouse_room_dispersion_sync_response"));
        map.put("sign", jsonObject.get("sign"));
        map.put("isSuccess", response.isSuccess());
        return map;
    }

    /**
     * 集中式房源同步
     *
     * @param concentration 参数json字符串
     * @throws AlipayApiException
     */
    public static Map<String, Object> concentrationSync(String concentration) throws AlipayApiException {
        Map<String, Object> map = new HashMap<>();
        AlipayClient alipayClient = new DefaultAlipayClient(TP_OPENAPI_URL, TP_APPID, TP_PRIVATEKEY, "json", "UTF-8");
        AlipayEcoRenthouseRoomConcentrationSyncRequest request = new AlipayEcoRenthouseRoomConcentrationSyncRequest();
        request.setBizContent(concentration);
        AlipayEcoRenthouseRoomConcentrationSyncResponse response = alipayClient.execute(request);
        JSONObject jsonObject = JSONObject.parseObject(response.getBody());
        map.put("response_body", jsonObject.get("alipay_eco_renthouse_room_concentration_sync_response"));
        map.put("sign", jsonObject.get("sign"));
        map.put("isSuccess", response.isSuccess());
        return map;
    }

    /**
     * 上下架房源
     *
     * @param houseState
     * @return
     * @throws AlipayApiException
     */
    public static Map<String, Object> houseStateSync(String houseState) throws AlipayApiException {
        Map<String, Object> map = new HashMap<>();
        AlipayClient alipayClient = new DefaultAlipayClient(TP_OPENAPI_URL, TP_APPID, TP_PRIVATEKEY, "json", "UTF-8");
        AlipayEcoRenthouseRoomStateSyncRequest request = new AlipayEcoRenthouseRoomStateSyncRequest();
        request.setBizContent(houseState);
        AlipayEcoRenthouseRoomStateSyncResponse response = alipayClient.execute(request);
        JSONObject jsonObject = JSONObject.parseObject(response.getBody());
        map.put("response_body", jsonObject.get("alipay_eco_renthouse_room_state_sync_response"));
        map.put("sign", jsonObject.get("sign"));
        map.put("isSuccess", response.isSuccess());
        return map;
    }

    /**
     * 小区同步
     *
     * @return
     * @throws AlipayApiException
     */
    public static Map<String, Object> renthouseCommunityInfoSync(String communityInfo) throws AlipayApiException {
        Map<String, Object> map = new HashMap<>();
        AlipayClient alipayClient = new DefaultAlipayClient(TP_OPENAPI_URL, TP_APPID, TP_PRIVATEKEY, "json", "UTF-8");
        AlipayEcoRenthouseCommunityInfoSyncRequest request = new AlipayEcoRenthouseCommunityInfoSyncRequest();
        request.setBizContent(communityInfo);
        AlipayEcoRenthouseCommunityInfoSyncResponse response = alipayClient.execute(request);
        JSONObject jsonObject = JSONObject.parseObject(response.getBody());
        map.put("response_body", jsonObject.get("alipay_eco_renthouse_community_info_sync_response"));
        map.put("sign", jsonObject.get("sign"));
        map.put("isSuccess", response.isSuccess());
        return map;
    }

    /**
     * 租约同步
     */
    public Map<String, Object> renthouseLeaseOrderSync(String leaseOrder) throws AlipayApiException {
        Map<String, Object> map = new HashMap<>();
        AlipayClient alipayClient = new DefaultAlipayClient(TP_OPENAPI_URL, TP_APPID, TP_PRIVATEKEY, "json", "UTF-8");
        AlipayEcoRenthouseLeaseOrderSyncRequest request = new AlipayEcoRenthouseLeaseOrderSyncRequest();
        request.setBizContent(leaseOrder);
        System.out.println((new JSONWriter()).write(request.getBizModel(), true));
        AlipayEcoRenthouseLeaseOrderSyncResponse response = alipayClient.execute(request);
        JSONObject jsonObject = JSONObject.parseObject(response.getBody());
        map.put("response_body", jsonObject.get("alipay_eco_renthouse_lease_order_sync_response"));
        map.put("sign", jsonObject.get("sign"));
        map.put("isSuccess", response.isSuccess());
        return map;
    }

    /**
     * 租约状态同步
     *
     * @param leaseState
     * @return
     * @throws AlipayApiException
     */
    public Map<String, Object> renthouseLeaseStateSync(String leaseState) throws AlipayApiException {
        Map<String, Object> map = new HashMap<>();
        AlipayClient alipayClient = new DefaultAlipayClient(TP_OPENAPI_URL, TP_APPID, TP_PRIVATEKEY, "json", "UTF-8");
        AlipayEcoRenthouseLeaseStateSyncRequest request = new AlipayEcoRenthouseLeaseStateSyncRequest();
        request.setBizContent(leaseState);
        AlipayEcoRenthouseLeaseStateSyncResponse response = alipayClient.execute(request);
        JSONObject jsonObject = JSONObject.parseObject(response.getBody());
        map.put("response_body", jsonObject.get("alipay_eco_renthouse_lease_state_sync_response"));
        map.put("sign", jsonObject.get("sign"));
        map.put("isSuccess", response.isSuccess());
        return map;
    }

    /**
     * 账单同步
     *
     * @param billOrder
     * @return
     * @throws AlipayApiException
     */
    public Map<String, Object> renthouseBillOrderSync(String billOrder) throws AlipayApiException {
        Map<String, Object> map = new HashMap<>();
        AlipayClient alipayClient = new DefaultAlipayClient(TP_OPENAPI_URL, TP_APPID, TP_PRIVATEKEY, "json", "UTF-8");
        AlipayEcoRenthouseBillOrderSyncRequest request = new AlipayEcoRenthouseBillOrderSyncRequest();
        request.setBizContent(billOrder);
        AlipayEcoRenthouseBillOrderSyncResponse response = alipayClient.execute(request);
        JSONObject jsonObject = JSONObject.parseObject(response.getBody());
        map.put("response_body", jsonObject.get("alipay_eco_renthouse_bill_order_sync_response"));
        map.put("sign", jsonObject.get("sign"));
        map.put("isSuccess", response.isSuccess());
        return map;
    }

    /**
     * 文件资源上传
     *
     * @param commonImage
     * @return
     * @throws AlipayApiException
     */
    public static Map<String, Object> renthouseCommonImageUpload(String commonImage) throws AlipayApiException {
        Map<String, Object> map = new HashMap<>();
        AlipayClient alipayClient = new DefaultAlipayClient(TP_OPENAPI_URL, TP_APPID, TP_PRIVATEKEY, "json", "UTF-8");
        AlipayEcoRenthouseCommonImageUploadRequest request = new AlipayEcoRenthouseCommonImageUploadRequest();
        request.setBizContent(commonImage);
        AlipayOfflineMaterialImageUploadRequest request1 = new AlipayOfflineMaterialImageUploadRequest();
        AlipayEcoRenthouseCommonImageUploadResponse response = alipayClient.execute(request);
        JSONObject jsonObject = JSONObject.parseObject(response.getBody());
        map.put("response_body", jsonObject.get("alipay_eco_renthouse_common_image_upload_response"));
        map.put("sign", jsonObject.get("sign"));
        map.put("isSuccess", response.isSuccess());
        return map;
    }

    /**
     * 公寓运营商基础信息维护
     *
     * @param kaBaseInfo
     * @return
     * @throws AlipayApiException
     */
    public static Map<String, Object> renthouseKaBaseinfoSync(String kaBaseInfo) throws AlipayApiException {
        Map<String, Object> map = new HashMap<>();
        AlipayClient alipayClient = new DefaultAlipayClient(TP_OPENAPI_URL, TP_APPID, TP_PRIVATEKEY, "json", "UTF-8");
        AlipayEcoRenthouseKaBaseinfoSyncRequest request = new AlipayEcoRenthouseKaBaseinfoSyncRequest();
        //注意该接口使用的前提是，需要开通新的ISVappid权限，目前开发环境的测试账号已被使用
        request.setBizContent(kaBaseInfo);
        AlipayEcoRenthouseKaBaseinfoSyncResponse response = alipayClient.execute(request);
        JSONObject jsonObject = JSONObject.parseObject(response.getBody());
        map.put("response_body", jsonObject.get("alipay_eco_renthouse_ka_baseinfo_sync_response"));
        map.put("sign", jsonObject.get("sign"));
        map.put("isSuccess", response.isSuccess());
        return map;
    }

    /**
     * 公寓运营商基础信息获取
     *
     * @param kaBaseInfoQuery
     * @return
     * @throws AlipayApiException
     */
    public static Map<String, Object> renthouseKaBaseinfoQuery(String kaBaseInfoQuery) throws AlipayApiException {
        Map<String, Object> map = new HashMap<>();
        AlipayClient alipayClient = new DefaultAlipayClient(TP_OPENAPI_URL, TP_APPID, TP_PRIVATEKEY, "json", "UTF-8");
        AlipayEcoRenthouseKaBaseinfoQueryRequest request = new AlipayEcoRenthouseKaBaseinfoQueryRequest();
        request.setBizContent(kaBaseInfoQuery);
        AlipayEcoRenthouseKaBaseinfoQueryResponse response = alipayClient.execute(request);
        JSONObject jsonObject = JSONObject.parseObject(response.getBody());
        map.put("response_body", jsonObject.get("alipay_eco_renthouse_ka_baseinfo_query_response"));
        map.put("sign", jsonObject.get("sign"));
        map.put("isSuccess", response.isSuccess());
        return map;
    }

    /**
     * 公寓运营商服务地址注册
     *
     * @param kaServiceCreate
     * @return
     * @throws AlipayApiException
     */
    public static Map<String, Object> renthouseKaServiceCreate(String kaServiceCreate) throws AlipayApiException {
        Map<String, Object> map = new HashMap<>();
        AlipayClient alipayClient = new DefaultAlipayClient(TP_OPENAPI_URL, TP_APPID, TP_PRIVATEKEY, "json", "UTF-8");
        AlipayEcoRenthouseKaServiceCreateRequest request = new AlipayEcoRenthouseKaServiceCreateRequest();
        request.setBizContent(kaServiceCreate);
        AlipayEcoRenthouseKaServiceCreateResponse response = alipayClient.execute(request);
        JSONObject jsonObject = JSONObject.parseObject(response.getBody());
        map.put("response_body", jsonObject.get("alipay_eco_renthouse_ka_service_create_response"));
        map.put("sign", jsonObject.get("sign"));
        map.put("isSuccess", response.isSuccess());
        return map;
    }
}
