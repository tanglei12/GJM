package com.gjp.service;

import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.gjp.dao.*;
import com.gjp.model.*;
import com.gjp.util.*;
import com.gjp.util.rent.AliRent;
import com.gjp.util.rent.AlipayEcoRenthouseOtherAmount;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.net.URL;
import java.net.URLConnection;
import java.util.*;

/**
 *
 * @author shenhx
 * @create 2018-01-19 9:59
 **/
@Service
public class RentHouseService {

    // 带看
    @Resource
    private HouseSeeingDao houseSeeingDao;

    @Resource
    private HouseLibraryDao houseLibraryDao;

    @Resource
    private PropertyInfoDAO propertyInfoDAO;

    @Resource
    private PropertyInfoNameDAO propertyInfoNameDAO;

    @Resource
    private HouseImageService houseImageService;

    @Resource
    private HousingAllocationDao housingAllocationDao;

    // 短信记录保存
    @Resource
    private SmsService smsService;

    /**
     * 小区同步到支付宝平台
     * @param propertyInfoName
     * @throws AlipayApiException
     */
    public void rentHouse(PropertyInfoName propertyInfoName) throws AlipayApiException {
        Map<String, Object> requestParam = new HashMap<>();
        requestParam.put("city_name", "重庆市");
        requestParam.put("district_name", propertyInfoName.getPropertyInfo_quyu());
        requestParam.put("community_name", propertyInfoName.getPropertyInfo_Name());

        String address = propertyInfoName.getPropertyInfo_address();
        String coordinate = propertyInfoName.getPropertyInfo_coordinate();
        if(!StringUtils.isEmpty(address)){
            requestParam.put("address", address);
        } else if(!StringUtils.isEmpty(coordinate)){
            requestParam.put("community_locations", coordinate.replaceAll(",", "|"));
            requestParam.put("coordsys", 0);
        } else {
            throw new AlipayApiException("参数为空异常");
        }

        Map<String, Object> response = AliRenthouseUtil.renthouseCommunityInfoSync(JSONObject.toJSONString(requestParam));
        if(null != response){
            Integer code = (Integer) response.get("code");
            if(code != null && code.intValue() == 10000){
                String comm_req_id = (String) response.get("comm_req_id");
                Integer status = (Integer) response.get("status");
                propertyInfoName.setComm_req_id(comm_req_id);
                propertyInfoName.setComm_req_status(status);
            } else {
                throw new AlipayApiException("小区同步失败：" + response.get("msg"));
            }
        } else {
            throw new AlipayApiException("小区同步异常");
        }
    }

    /**
     * 支付宝回调-预约看房
     * @param params
     */
    public void lookAtHouse(Map<String, String> params) throws AlipayApiException {
        RentLookAtHouseVo rentLookAtHouseVo = new RentLookAtHouseVo();
        System.out.println("params: " + params);
//        rentLookAtHouseVo = (RentLookAtHouseVo) JsonHelper.toJavaBean(rentLookAtHouseVo, params.get(""));

//        if(null == rentLookAtHouseVo){
//            throw new AlipayApiException("回调参数为空异常");
//        }
        rentLookAtHouseVo.setAliUserId(params.get("aliUserId"));
        rentLookAtHouseVo.setZhimaOpenId(params.get("zhimaOpenId"));
        rentLookAtHouseVo.setRoomCode(params.get("roomCode"));
        rentLookAtHouseVo.setFlatsTag(Integer.valueOf(params.get("flatsTag")));
        rentLookAtHouseVo.setLookTime(params.get("lookTime"));
        rentLookAtHouseVo.setBookName(params.get("bookName"));
        rentLookAtHouseVo.setBookPhone(AliRent.formatPhone(params.get("bookPhone")));
        rentLookAtHouseVo.setBookSex(Integer.valueOf(params.get("bookSex")));
        rentLookAtHouseVo.setRemark(params.get("remark"));

        // 添加预约看房记录
        houseSeeingDao.addLookHouse(rentLookAtHouseVo);

        // 查询房屋信息，发送短信至管家
        RentHouseVo rentHouseVo = new RentHouseVo();
        rentHouseVo.setRoom_code(rentLookAtHouseVo.getRoomCode());
        rentHouseVo = houseSeeingDao.queryHouseInfoByCode(rentHouseVo);

        String bookSexStr = "";
        switch (rentLookAtHouseVo.getBookSex()){
            case 0 :
                bookSexStr = "老师";
                break;
            case 1 :
                bookSexStr = "先生";
                break;
            case 2 :
                bookSexStr = "女士";
                break;
            default :
                bookSexStr = "老师";
                break;
        }

        String msg = SmsUtil.sendLookAtHouse(rentHouseVo.getEm_phone(), rentHouseVo.getEm_name(), rentHouseVo.getHouse_address(), rentLookAtHouseVo.getBookName(),
                bookSexStr, rentLookAtHouseVo.getBookPhone(), rentLookAtHouseVo.getLookTime(), rentLookAtHouseVo.getRemark());

        // 生成短信记录
        smsService.addSMSRecordForEmp(rentHouseVo.getHi_code(), "", msg, rentHouseVo.getHpr_newEmp());
    }

    /**
     * 房源上下架
     * @param roomCode 支付宝平台ka系统房源code
     * @param roomStatus 是否上架（0:下架，1：上架）
     * @param rentStatus 出租状态（1未租、2已租）
     * @param flatsTag 房源类型（1:分散式 2：集中式）
     * @return
     * @throws AlipayApiException
     */
    public Map<String, Object> rentHouseStateSync(String hi_code, String roomCode, Integer roomStatus, Integer rentStatus, Integer flatsTag) throws AlipayApiException {

        Map<String, Object> msgMap = new HashMap<>();
        Map<String, Object> param = new HashMap<>();
        param.put("room_code", roomCode);
        param.put("room_status", roomStatus);
        param.put("rent_status", rentStatus);
        param.put("flats_tag", flatsTag);

        Map<String, Object> response = AliRenthouseUtil.houseStateSync(JSONObject.toJSONString(param));
        System.out.println(response.get("response_body"));// {"msg":"[A000159D0A656A8]接口调用成功","code":"10000"}
        System.out.println("");
        if ("10000".equals(((Map<String, String>) response.get("response_body")).get("code"))){
            //修改ERP房源Code与外部平台房源code对应关系
            RentHouseVo rentHouse = new RentHouseVo();
            rentHouse.setHi_code(hi_code);
            rentHouse.setRoom_code(roomCode);
            rentHouse.setRoom_status(roomStatus);
            housingAllocationDao.updataRentHouseVo(rentHouse);
            msgMap.put("code", 200);
        } else {
            msgMap.put("code", 401);
            msgMap.put("msg",  ((Map<String, String>) response.get("response_body")).get("sub_msg"));
        }
        return msgMap;
    }

    /**
     * 分散式房源同步
     * @param houseLibraryInfoVo
     * @return
     */
    public Map<String, Object> rentHouseDispersionSync(ViewHouseLibraryInfoVo houseLibraryInfoVo) throws AlipayApiException {

        Map<String, Object> message = new HashMap<>();

        Map<String, Object> param = new HashMap<>();

        param.put("comm_req_id", houseLibraryInfoVo.getComm_req_id());
        param.put("room_code", houseLibraryInfoVo.getRoom_code());

        String hi_address = houseLibraryInfoVo.getHi_address();

        param.put("floor_count", hi_address.split("-")[0]);
        param.put("total_floor_count", houseLibraryInfoVo.getHi_totalFloor());

        String flat_building = "";
        String flat_unit = "";
        Integer upn_sid = houseLibraryInfoVo.getUpn_sid();
        String upn_code = houseLibraryInfoVo.getUpn_code();
        String upn_name = houseLibraryInfoVo.getUpn_name();
        if(!StringUtils.isEmpty(upn_code) && !"0".equals(upn_code)
                && (null != upn_sid && upn_sid.intValue() != 0)){
            String[] upn_codeArr = upn_code.split("-");
            int lenth = upn_codeArr.length;
            if(1 == lenth){
                if(upn_name.contains("单元")){
                    param.put("flat_unit", upn_code);
                    param.put("flat_building", "01");
                } else {
                    param.put("flat_building", upn_code);
                }
            } else if(2 == lenth){
                param.put("flat_building", upn_codeArr[0]);
                param.put("flat_unit", upn_codeArr[1]);
            } else if(3 == lenth){
                param.put("flat_building", upn_codeArr[1]);
                param.put("flat_unit", upn_codeArr[2]);
            }
        } else {
            param.put("flat_building", "01");
        }

        param.put("room_num", hi_address.split("-")[1]);
        param.put("bedroom_count", houseLibraryInfoVo.getHi_houseS());
        param.put("parlor_count", houseLibraryInfoVo.getHi_houseT());
        param.put("toilet_count", houseLibraryInfoVo.getHi_houseW());
        param.put("room_area", houseLibraryInfoVo.getHi_measure());
        param.put("rent_status", 1);
        param.put("intro", StringUtils.isEmpty(houseLibraryInfoVo.getHi_content()) ? houseLibraryInfoVo.getHi_function() : houseLibraryInfoVo.getHi_content());

        List<String> roomConfigList = new ArrayList<>();
        String hi_project = houseLibraryInfoVo.getConim_id();
        if(!StringUtils.isEmpty(hi_project)){
            String[] hi_projectArr = hi_project.split(",");
            for (int i = 0; i < hi_projectArr.length; i++){
                switch (hi_projectArr[i]){
                    case "9" :
                        roomConfigList.add("1");
                        break;
                    case "7" :
                        roomConfigList.add("2");
                        break;
                    case "8" :
                        roomConfigList.add("3");
                        break;
                    case "6" :
                        roomConfigList.add("4");
                        break;
                    case "5" :
                        roomConfigList.add("5");
                        break;
                    case "4" :
                        roomConfigList.add("6");
                        break;
                    case "1" :
                        roomConfigList.add("11");
                        break;
                    case "2" :
                        roomConfigList.add("13");
                        break;
                    case "3" :
                        roomConfigList.add("14");
                        break;
                }
            }
            param.put("room_configs", roomConfigList.toArray());
        }

        param.put("pay_type", 1);
        Double room_amount = houseLibraryInfoVo.getHi_money() <= 0 ? houseLibraryInfoVo.getHi_price() : houseLibraryInfoVo.getHi_money();
        param.put("room_amount", new BigDecimal(room_amount * (1 + (5.0 / 100))).intValue());
        param.put("foregift_amount", room_amount * 2);
        param.put("room_store_no", "92520002");

        RentHouseFileVo rentHouseFileVo = new RentHouseFileVo();
        rentHouseFileVo.setHi_code(houseLibraryInfoVo.getHi_code());
        rentHouseFileVo.setFile_type("1");// 房屋图片
        List<RentHouseFileVo> rentHouseFileVoList = houseLibraryDao.queryRentHouseFile(rentHouseFileVo);
        if(null == rentHouseFileVo || rentHouseFileVoList.isEmpty()){
            message.put("code", 401);
            message.put("msg", "请选择房源图片");
        }
        List<String> images = new ArrayList<>();
        if(null != rentHouseFileVoList && !rentHouseFileVoList.isEmpty()){
            for(RentHouseFileVo fileVo : rentHouseFileVoList){
                images.add(fileVo.getUrl());
            }
        }
        param.put("images", images.toArray());

        param.put("owners_name", houseLibraryInfoVo.getNew_em_name());
        param.put("owners_tel", houseLibraryInfoVo.getNew_em_phone());
        param.put("checkin_time", DataUtil.DateToStrs(DataUtil.getAfterDateByYear("D", new Date(), 1)));
        param.put("room_status", 0);
        param.put("rent_type", 1);

        List<AlipayEcoRenthouseOtherAmount> otherAmountList = new ArrayList<>();
        AlipayEcoRenthouseOtherAmount otherAmount = new AlipayEcoRenthouseOtherAmount();
        otherAmount.setName("服务费");
        otherAmount.setAmount(new BigDecimal(600));
        otherAmount.setUnint("元");
        otherAmountList.add(otherAmount);
        param.put("other_amount", JSONObject.toJSON(otherAmountList));

        Map<String, Object> response = AliRenthouseUtil.dispersionSync(JSONObject.toJSONString(param));

        System.out.println(JSONObject.toJSONString(param));
        System.out.println(response.get("response_body"));// {"msg":"[A000159D0A656A8]接口调用成功","code":"10000"}
        //修改ERP房源Code与外部平台房源code对应关系
        RentHouseVo rentHouse = new RentHouseVo();
        rentHouse.setRoom_code(houseLibraryInfoVo.getRoom_code());
        rentHouse.setHi_code(houseLibraryInfoVo.getHi_code());
        if ("10000".equals(((Map<String, String>) response.get("response_body")).get("code"))){
            rentHouse.setSync_state(1);
            String msg =  ((Map<String, String>) response.get("response_body")).get("msg");
            String ali_houseCode = msg.substring(msg.indexOf("[") + 1, msg.indexOf("]"));
            if(!StringUtils.isEmpty(ali_houseCode)){
                rentHouse.setAli_houseCode(ali_houseCode);
            }
            rentHouse.setResponse_msg("");
            message.put("code", 200);
        } else {
            rentHouse.setSync_state(2);
            rentHouse.setResponse_msg(((Map<String, String>) response.get("response_body")).get("sub_msg"));
            message.put("code", 401);
            message.put("msg",  ((Map<String, String>) response.get("response_body")).get("sub_msg"));
        }
        housingAllocationDao.updataRentHouseVo(rentHouse);
        return message;
    }

    /**
     * 同步房源图片到支付宝(租房平台)
     *
     * @param hi_code
     * @param file_type
     * @throws Exception
     */
    public void syncFileService(String rootPath, String hi_code, String file_type) throws Exception {

        System.out.println("房源编号:" + hi_code);
        //查询房屋对应的线上图片
        HouseImageVo houseLibraryImageVo = new HouseImageVo();
        houseLibraryImageVo.setHi_code(hi_code);
        houseLibraryImageVo.setHif_name(1);
        houseLibraryImageVo.setHm_state(1);
        houseLibraryImageVo.setIs_alisync(1);// 未上传的
        List<HouseImageVo> houseLibraryImageVos = houseImageService.selectFoldsImgs(houseLibraryImageVo);
        if(null != houseLibraryImageVos){
//        String rootPath = request.getSession().getServletContext().getRealPath("/");
            String realPath = rootPath + "/resources/temp/syncFile/" + new Date().getTime();
            System.out.println("临时路径:"+realPath);
            houseLibraryDao.delRentHouseFile(hi_code);
            for (HouseImageVo house : houseLibraryImageVos) {
                String ossPath = OSSparameter.imagePath(house.getHm_path());
                String hm_path = house.getHm_path();
                String sbPath = hm_path.substring(0, hm_path.lastIndexOf("/"));//路径
                String sbname = hm_path.substring(hm_path.lastIndexOf("/") + 1, hm_path.length());//文件名
                //下载文件

                // 构造URL
                URL url = new URL(ossPath);
                // 打开连接
                URLConnection con = url.openConnection();
                //设置请求超时为5s
                con.setConnectTimeout(5 * 1000);
                // 输入流
                InputStream is = con.getInputStream();

                // 1K的数据缓冲
                byte[] bs = new byte[1024];
                // 读取到的数据长度
                int len;

                File sf = new File(realPath +"/"+ sbPath + "");
                if (!sf.exists()) {
                    sf.mkdirs();
                }

                //文件路径(也是上传路径)
                String path = sf.getPath() + "/" + sbname;
                OutputStream os = new FileOutputStream(path);
                // 开始读取
                while ((len = is.read(bs)) != -1) {
                    os.write(bs, 0, len);
                }
                System.out.println("资源下载完成:" + path);
                // 完毕，关闭所有链接
                os.close();
                is.close();

                //写出关闭完成后调用文件资源上传接口,上传文件到租房平台
                Map<String, Object> map = new HashMap<>();
                map.put("file_type", file_type);
                map.put("file_base", ImageUtil.imageFileToBase64(path));
                map.put("is_public", false);
                Map<String, Object> response = AliRenthouseUtil.renthouseCommonImageUpload(JSONObject.toJSONString(map));
                System.out.println("资源上传到租房平台成功:" + response.get("response_body"));
                JSONObject jsonObject = JSONObject.parseObject(response.get("response_body").toString());
                Object response_url = jsonObject.get("url");

                //存入数据到erp数据库
                RentHouseFileVo rentHouseFileVo = new RentHouseFileVo();
                rentHouseFileVo.setUrl(response_url.toString());
                rentHouseFileVo.setHi_code(hi_code);
                rentHouseFileVo.setFile_type(file_type);
                rentHouseFileVo.setUpload_time(new Date());
                this.addRentHouseFile(rentHouseFileVo);
                System.out.println("存入数据到erp数据库成功");

                HouseImageVo imageVo = new HouseImageVo();
                imageVo.setHm_id(house.getHm_id());
                imageVo.setIs_alisync(1);
                houseImageService.updateHouseImage(imageVo);
            }
            FileUtil.delFolder(realPath);
        }
    }

    /**
     * 电话记录
     *
     * @param rentTelephoneRecordsVo
     */
    public void telephoneRecordsService(RentTelephoneRecordsVo rentTelephoneRecordsVo) throws Exception {
        rentTelephoneRecordsVo.setRecordTime(rentTelephoneRecordsVo.getRecordTime());
        housingAllocationDao.insertRentTelephoneRecordsVo(rentTelephoneRecordsVo);
    }

    /**
     * 修改支付宝租房小区同步结果
     *
     * @param propertyInfoName
     * @throws Exception
     */
    public void updatPropertyInfoNameService(PropertyInfoName propertyInfoName) throws Exception {
        propertyInfoNameDAO.updatecommReq(propertyInfoName);
    }

    /**
     * 支付宝房源同步附件
     *
     * @param rentHouseFileVo
     * @return
     */
    public int addRentHouseFile(RentHouseFileVo rentHouseFileVo) {
        return housingAllocationDao.addRentHouseFile(rentHouseFileVo);
    }

    /**
     * 同步集中式房源
     *
     * @return
     */
    public void syncCentralizationHouseKeepService(ViewHouseLibraryInfoVo viewHouseLibraryInfoVo) throws Exception {
        //根据Hi_code查询ERP房源Code与外部平台房源code对应关系
        RentHouseVo rentHouseVo = new RentHouseVo();
        rentHouseVo.setHi_code(viewHouseLibraryInfoVo.getHi_code());
        RentHouseVo rentHouse = housingAllocationDao.queryRentHouseVo(rentHouseVo);

        //发布的房源
//        HouseHouseInformation houseHouseInformation = housingAllocationDao.selectHouseInfoByCode(viewHouseLibraryInfoVo.getHi_code());

        RentHouseFileVo rentHouseFileVo = new RentHouseFileVo();
        rentHouseFileVo.setHi_code(viewHouseLibraryInfoVo.getHi_code());
        rentHouseFileVo.setFile_type("1");// 房屋图片
        List<RentHouseFileVo> rentHouseFileVoList = houseLibraryDao.queryRentHouseFile(rentHouseFileVo);
        List<String> images = new ArrayList<>();
        if(null != rentHouseFileVoList && !rentHouseFileVoList.isEmpty()){
            for(RentHouseFileVo fileVo : rentHouseFileVoList){
                images.add(fileVo.getUrl());
            }
        }

        //分散式房源所需参数
        Map<String, Object> map = new HashMap<>();
        map.put("comm_req_id", viewHouseLibraryInfoVo.getComm_req_id());
        // map.put("comm_req_id", "1857");
        map.put("room_code", rentHouse.getRoom_code());
        map.put("nick_name", viewHouseLibraryInfoVo.getPropertyInfo_Name() + "公寓");
        map.put("max_amount", ((String.valueOf(viewHouseLibraryInfoVo.getHi_money()) == null ? viewHouseLibraryInfoVo.getHi_price() : viewHouseLibraryInfoVo.getHi_money())  + 200));
        String hi_address = viewHouseLibraryInfoVo.getHi_address();

        map.put("floor_count", hi_address.split("-")[0]);
        Integer hi_totalFloor = viewHouseLibraryInfoVo.getHi_totalFloor();

        map.put("total_floor_count", "" + hi_totalFloor + "");
        map.put("bedroom_count", viewHouseLibraryInfoVo.getHi_houseS());
        map.put("parlor_count", viewHouseLibraryInfoVo.getHi_houseT());
        map.put("toilet_count", viewHouseLibraryInfoVo.getHi_houseW());
        map.put("room_area", viewHouseLibraryInfoVo.getHi_measure());
        map.put("rent_status", 1);
        map.put("intro", StringUtils.isEmpty(viewHouseLibraryInfoVo.getHi_content()) ? viewHouseLibraryInfoVo.getHi_function() : viewHouseLibraryInfoVo.getHi_content());
        map.put("nick_name", viewHouseLibraryInfoVo.getUpn_sname());
        map.put("room_store_no", "92520002");

        String hi_conim = viewHouseLibraryInfoVo.getConim_id();
        String[] conim = hi_conim.split(",");
        List<String> list = new ArrayList<>();
        for (int i = 0; i < conim.length; i++) {
            String con = conim[i];
            switch (con){
                case "1":
                    list.add("11");
                    break;
                case "2":
                    list.add("13");
                    break;
                case "3":
                    list.add("14");
                    break;
                case "4":
                    list.add("6");
                    break;
                case "5":
                    list.add("5");
                    break;
                case "6":
                    list.add("4");
                    break;
                case "7":
                    list.add("2");
                    break;
                case "8":
                    list.add("3");
                    break;
                case "9":
                    list.add("1");
                    break;
            }
        }
        //String[] room_configs = {"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"};
        String[] room_configs = new String[list.size()];
        // List转换成数组
        for (int i = 0; i < list.size(); i++) {
            room_configs[i] = list.get(i);
        }
        map.put("room_configs", room_configs);
        map.put("pay_type", 1);
        Double room_amount = (String.valueOf(viewHouseLibraryInfoVo.getHi_money()) == null ? viewHouseLibraryInfoVo.getHi_price() : viewHouseLibraryInfoVo.getHi_money());
        map.put("room_amount", new BigDecimal(room_amount * (1 + (5.0 / 100))).intValue());
        map.put("foregift_amount", room_amount * 2);
        //map.put("other_amount", 0);
        map.put("images", images.toArray());
        map.put("owners_name", viewHouseLibraryInfoVo.getNew_em_name());
        map.put("owners_tel", viewHouseLibraryInfoVo.getNew_em_phone());
        map.put("checkin_time", DataUtil.DateToStrs(new Date()));
        map.put("room_status", 1);
        map.put("rent_type", 1);
        map.put("all_room_num", 167);
        map.put("can_rent_num", 30);
        List<AlipayEcoRenthouseOtherAmount> otherAmountList = new ArrayList<>();
        AlipayEcoRenthouseOtherAmount otherAmount = new AlipayEcoRenthouseOtherAmount();
        otherAmount.setName("服务费");
        otherAmount.setAmount(new BigDecimal(600));
        otherAmount.setUnint("元");
        otherAmountList.add(otherAmount);
        map.put("other_amount", JSONObject.toJSON(otherAmountList));

        Map<String, Object> response = AliRenthouseUtil.concentrationSync(JSONObject.toJSONString(map));
        System.out.println(response.get("response_body"));// {"msg":"[A000159D0A656A8]接口调用成功","code":"10000"}

        //修改ERP房源Code与外部平台房源code对应关系
        RentHouseVo rentHous = new RentHouseVo();
        rentHous.setRoom_code(viewHouseLibraryInfoVo.getRoom_code());
        rentHous.setHi_code(viewHouseLibraryInfoVo.getHi_code());
        if ("10000".equals(((Map<String, String>) response.get("response_body")).get("code"))){
            rentHous.setSync_state(1);
            String msg =  ((Map<String, String>) response.get("response_body")).get("msg");
            String ali_houseCode = msg.substring(msg.indexOf("[") + 1, msg.indexOf("]"));
            if(!StringUtils.isEmpty(ali_houseCode)){
                rentHouse.setAli_houseCode(ali_houseCode);
            }
            rentHous.setResponse_msg("");
        } else {
            rentHous.setSync_state(2);
            rentHous.setResponse_msg(((Map<String, String>) response.get("response_body")).get("sub_msg"));
        }
        housingAllocationDao.updataRentHouseVo(rentHous);

        //同步房源图片到支付宝(租房平台)
//        syncFileService(viewHouseLibraryInfoVo.getHi_code(),"1");
    }

    public RentHouseVo addRentHouseVo(RentHouseVo rentHouseVo){
        RentHouseVo rentHouse = housingAllocationDao.queryRentHouseVo(rentHouseVo);
        if(null == rentHouse){
            housingAllocationDao.addRentHouseVo(rentHouseVo);
            return rentHouseVo;
        }
        return rentHouse;
    }

    public int updataRentHouseVo(RentHouseVo rentHouseVo){
        return housingAllocationDao.updataRentHouseVo(rentHouseVo);
    }

    public Integer queryRentHouseCount() {
        return houseLibraryDao.queryRentHouseCount().intValue();
    }

    public RentHouseVo queryRentHouseVo(String hi_code) {
        //根据Hi_code查询ERP房源Code与外部平台房源code对应关系
        RentHouseVo rentHouseVo = new RentHouseVo();
        rentHouseVo.setHi_code(hi_code);
        return housingAllocationDao.queryRentHouseVo(rentHouseVo);
    }

    public static void main(String[] args){
        String msg = "[A124010VKWVC0E8]接口调用成功";
        System.out.println(msg.substring(msg.indexOf("[") + 1, msg.indexOf("]")));
        List<AlipayEcoRenthouseOtherAmount> otherAmountList = new ArrayList<>();
        AlipayEcoRenthouseOtherAmount otherAmount = new AlipayEcoRenthouseOtherAmount();
        otherAmount.setName("服务费");
        otherAmount.setAmount(new BigDecimal(600));
        otherAmount.setUnint("元");
        otherAmountList.add(otherAmount);
        System.out.println(JSONObject.toJSON(otherAmountList));
    }

}
