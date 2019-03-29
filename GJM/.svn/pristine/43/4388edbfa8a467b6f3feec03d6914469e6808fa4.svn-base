package com.gjp.test;

import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.FileItem;
import com.alipay.api.request.AlipayOfflineMaterialImageUploadRequest;
import com.alipay.api.response.AlipayOfflineMaterialImageUploadResponse;
import com.gjp.util.AliRenthouseUtil;
import com.gjp.util.Base64;
import com.gjp.util.ImageUtil;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

/**
 * 支付宝租房测试类
 *
 * @author 陈智颖
 * @create 2018-01-12 15:15
 **/
public class AliRentHouseTest {

    /**
     * 小区同步
     *
     * @throws AlipayApiException
     */
    @Test
    public void testrenthouseCommunityInfoSync() throws AlipayApiException {
        Map<String, Object> map = new HashMap<>();
//        map.put("city_name", "重庆市");
//        map.put("district_name", "九龙坡区");
//        map.put("community_name", "万科西九");
//        map.put("community_locations", "106.521175|29.515416");
//        map.put("coordsys", 0);
        map.put("city_name", "重庆市");
        map.put("district_name", "渝中区");
        map.put("community_name", "V8");
        map.put("address", "重庆市渝中区医学院路8号");
        map.put("coordsys", 0);

        Map<String, Object> response = AliRenthouseUtil.renthouseCommunityInfoSync(JSONObject.toJSONString(map));
        System.out.println(response.get("response_body"));// {"msg":"接口调用成功","code":"10000","comm_req_id":"1857","status":"1"}
    }

    /**
     * 文件上传
     * @throws AlipayApiException
     */
    @Test
    public void testRenthouseCommonImageUpload() throws Exception {

        Map<String, Object> map = new HashMap<>();
        map.put("file_type", "1");
//        FileItem ImageContent = new FileItem("http://image.cqgjp.com/customerImage/service_201710181145134916.png?Expires=1515983961&amp;OSSAccessKeyId=LTAIHS4FDuAIRbbf&amp;Signature=HISMGADMVz7Ls7lEaBVB1aZ%2BpZk%3D");
        FileItem ImageContent = new FileItem("D:\\gjpimg\\houseImage\\house1510803968053.png");
        map.put("file_base", ImageUtil.imageFileToBase64("D:\\gjpimg\\houseImage\\house1510803968053.png"));
        map.put("is_public", false);
        Map<String, Object> response = AliRenthouseUtil.renthouseCommonImageUpload(JSONObject.toJSONString(map));
        System.out.println(response.get("response_body"));// {"msg":"接口调用成功","code":"10000","url":"http://ecopublic-test.oss-cn-hangzhou.aliyuncs.com/eco/renthouse/1/2018-01-15/1/4bb788c731364353ac93dba7e21ef5b6901.png"}
        //{"msg":"接口调用成功","code":"10000","url":"http://ecopublic-test.oss-cn-hangzhou.aliyuncs.com/eco/renthouse/1/2018-01-15/1/c3d145ba7e8c4afbabb4353858995218563.jpg"}
        //{"msg":"接口调用成功","code":"10000","url":"http://ecopublic-test.oss-cn-hangzhou.aliyuncs.com/eco/renthouse/1/2018-01-15/1/c07f7f20460e4e849b34a6a8ca283116213.jpg"}
        /** 预发环境 **/
        // {"msg":"接口调用成功","code":"10000","url":"http://ecopublic-sit.oss-cn-hangzhou.aliyuncs.com/eco/tpmogo/1240/2018-01-18/1/e433cc0e6f81438bbc8f724ddb542692718.jpg"}
    }

    /**
     * 分散式同步
     *
     * @throws AlipayApiException
     */
    @Test
    public void testDispersion() throws AlipayApiException {
        Map<String, Object> map = new HashMap<>();
        map.put("comm_req_id", "1857");
        map.put("room_code", "100001");
        map.put("floor_count", 6);
        map.put("total_floor_count", "23");
        map.put("flat_building", "2");
        map.put("room_num", "8");
        map.put("bedroom_count", 1);
        map.put("parlor_count", 1);
        map.put("toilet_count", 1);
        map.put("flat_area", "41.39");
        map.put("room_area", "41.39");
        map.put("rent_status", 1);
        map.put("intro", "交通方便，配套齐全，环境优美，价格公道。");
        String[] room_configs = {"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"};
        map.put("room_configs", room_configs);
        map.put("pay_type", 1);
        map.put("room_amount", 1500.00);
        map.put("foregift_amount", 3000.00);
        String[] images = new String[1];
        images[0] = "http://ecopublic-test.oss-cn-hangzhou.aliyuncs.com/eco/renthouse/1/2018-01-16/1/8f240dc354704f1daf663db2d94ee254713.jpg";
        map.put("images", images);
        map.put("owners_name", "申洪喜");
        map.put("owners_tel", "13418912550");
        map.put("checkin_time", "2018-01-20");
        map.put("room_status", 0);
        map.put("rent_type", 1);

        Map<String, Object> response = AliRenthouseUtil.dispersionSync(JSONObject.toJSONString(map));
        System.out.println(response.get("response_body"));// {"msg":"[A000159D0A656A8]接口调用成功","code":"10000"}

    }

    /**
     * 集中式同步
     *
     * @throws AlipayApiException
     */
    @Test
    public void testConcentration() throws AlipayApiException {
        Map<String, Object> map = new HashMap<>();
        map.put("comm_req_id", "2373793");
        map.put("room_code", "100001");
        map.put("floor_count", 6);
        map.put("total_floor_count", "23");
        map.put("flat_building", "2");
        map.put("room_num", "8");
        map.put("bedroom_count", 1);
        map.put("parlor_count", 1);
        map.put("toilet_count", 1);
        map.put("flat_area", "41.39");
        map.put("room_area", "41.39");
        map.put("rent_status", 1);
        map.put("intro", "交通方便，配套齐全，环境优美，价格公道。");
        String[] room_configs = {"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"};
        map.put("room_configs", room_configs);
        map.put("pay_type", 1);
        map.put("room_amount", 1500.00);
        map.put("foregift_amount", 3000.00);
        String[] images = new String[1];
        images[0] = "http://ecopublic-test.oss-cn-hangzhou.aliyuncs.com/eco/renthouse/1/2018-01-16/1/8f240dc354704f1daf663db2d94ee254713.jpg";
        map.put("images", images);
        map.put("owners_name", "申洪喜");
        map.put("owners_tel", "13418912550");
        map.put("checkin_time", "2018-01-20");
        map.put("room_status", 0);
        map.put("rent_type", 1);

        Map<String, Object> response = AliRenthouseUtil.dispersionSync(JSONObject.toJSONString(map));
        System.out.println(response.get("response_body"));// {"msg":"[A000159D0A656A8]接口调用成功","code":"10000"}

    }


    /**
     * 房源上下架
     * @throws AlipayApiException
     */
    @Test
    public void  testHouseStateSync() throws AlipayApiException{
        Map<String, Object> map = new HashMap<>();
        map.put("room_code","1180300258");
        map.put("room_status",0);//是否上架（0:下架，1：上架）
        map.put("rent_status",1);//出租状态（1未租、2已租）
        map.put("flats_tag",1);//房源类型（1:分散式 2：集中式）
        Map<String, Object> response = (new AliRenthouseUtil()).houseStateSync(JSONObject.toJSONString(map));
        System.out.println(response.get("response_body"));
    }

    /**
     * 租约同步
     * @throws AlipayApiException
     */
    @Test
    public void  renthouseLeaseOrderSync() throws AlipayApiException{
        Map<String, Object> map = new HashMap<>();
        map.put("room_code","100001");
        map.put("flats_tag",1);
        map.put("card_no","370402198201254475");
        map.put("card_type",0);
        map.put("lease_code","1254665");
        map.put("renter_name","王兴荣");
        map.put("renter_phone","13368348430");
        map.put("begin_date","2017-03-10");
        map.put("end_date","2018-03-10");
        map.put("pay_type",1);
        map.put("sale_amount",1200);
        String[] strings = {"1","2"};
        map.put("rent_include_fee_desc",strings);
        map.put("other_fee_desc","[\"门卡押金23元\",\"家具押金1元\"]");
        map.put("rent_day_desc","每月10号收租");
        map.put("furniture_items","sssssss");
        map.put("lease_status",0);
        map.put("free_deposit",0);
        map.put("remark","管家婆");
        Map<String, Object> response = new AliRenthouseUtil().houseStateSync(JSONObject.toJSONString(map));
        System.out.println(response.get("response_body"));
    }

    @Test
    public void testRenthouseKaBaseinfoSync() throws AlipayApiException {
        Map<String, Object> map = new HashMap<>();
        map.put("ka_name", "重庆管家婆租房");
        Map<String, Object> response = AliRenthouseUtil.renthouseKaBaseinfoSync(JSONObject.toJSONString(map));
        System.out.println(response.get("response_body"));
        // 预发环境：{"msg":"接口调用成功","code":"10000","ka_code":"aMNjHqSxnNLVDIcfE"}
        // 生产环境：{"msg":"接口调用成功","code":"10000","ka_code":"ZnaiebvJGzsJqxjb9"}
    }

    @Test
    public void testRenthouseKaBaseinfoQuery() throws AlipayApiException {
        Map<String, Object> map = new HashMap<>();
        map.put("ka_code", "aMNjHqSxnNLVDIcfE");
        Map<String, Object> response = AliRenthouseUtil.renthouseKaBaseinfoQuery(JSONObject.toJSONString(map));
        System.out.println(response.get("response_body"));
        // 预发环境：{"msg":"接口调用成功","code":"10000","ka_code":"aMNjHqSxnNLVDIcfE"}
    }

    @Test
    public void testRenthouseKaService() throws AlipayApiException {
        /**
         * 公寓运营商服务地址注册
         */
        Map<String, Object> map = new HashMap<>();
        map.put("ka_code", "ZnaiebvJGzsJqxjb9");
        map.put("type", 1);
        map.put("address", "http://m.cqgjp.com/houseLibrary/lookAtHouse");
//        map.put("type", 3);
//        map.put("address", "http://m.cqgjp.com/houseLibrary/telephoneRecords");
//        map.put("type", 5);
//        map.put("address", "http://m.cqgjp.com/houseLibrary/updatPropertyInfoName");
        Map<String, Object> response = AliRenthouseUtil.renthouseKaServiceCreate(JSONObject.toJSONString(map));
        System.out.println(response.get("response_body"));
    }

}
