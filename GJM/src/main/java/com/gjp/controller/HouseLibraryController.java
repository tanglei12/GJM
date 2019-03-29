package com.gjp.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.gjp.model.*;
import com.gjp.model.Company;
import com.gjp.service.*;
import com.gjp.util.*;
import com.gjp.util.constant.Constant;
import com.gjp.util.rent.AliRent;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.io.IOUtils;
import org.apache.poi.hssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Map.Entry;

/**
 * 房源库
 *
 * @author zoe
 */
@Controller
@RequestMapping(value = "/houseLibrary")
public class HouseLibraryController {

    // 意向房源
    private @Resource
    HouseIntentionImageService houseIntentionImageService;
    // 房屋扩展
    private @Resource
    HouseExtendedService houseExtendedService;
    // 房屋基本
    private @Resource
    HousingAllocationService housingAllocationService;
    // 合同对象
    private @Resource
    ContractService contractObjectService;
    // 房源库service
    private @Resource
    HouseLibraryService houseLibraryService;
    // 职员信息
    private @Resource
    UserCenterEmployeeService employeeService;
    // 物业信息
    private @Resource
    PropertyInfoService userCenterPropertyInfoService;
    // 房屋品牌
    private @Resource
    HouseHouseBrandService houseHouseBrandService;
    // 适合推荐群体
    private @Resource
    HoseRecommendGroupService hoseRecommendGroupService;
    // 房屋图片
    private @Resource
    HouseImageService houseImageService;
    // 房屋图片类型
    private @Resource
    HouseImageTypeService houseImageTypeService;
    // 组织权限
    private @Resource
    AuthorizationService authorizationService;
    // 意向房源
    private @Resource
    HouseIntentionService houseIntentionService;
    // 房屋状态
    private @Resource
    HouseInformationStateService houseInformationStateService;
    // 客户表
    private @Resource
    CustomerService customerService;
    // 执行记录附件
    private @Resource
    ContractAttachmentService contractAttachmentService;
    // 业绩类
    private @Resource
    AchievementCompanyService achievementCompanyService;
    // 任务消息
    private @Resource
    UserCenterTaskMessageService userCenterTaskMessageService;
    // 同步发布到第三方
    private @Resource
    HousePartnerPublishService housePartnerPublishService;
    //图片文件夹类型
    private @Resource
    HouseImageFolderTypeService houseImageFolderTypeService;
    //房屋信息
    private @Resource
    HouseInformationService houseInformationService;
    // 支付宝房源信息同步
    private @Resource
    RentHouseService rentHouseService;
    // 房源品牌
    @Autowired
    private HouseInformationStateRelationService houseInformationStateRelationService;
    // 合同
    @Autowired
    private ContractService contractService;
    // 服务
    @Autowired
    private ServiceService serviceService;
    @Resource
    private OrderService orderService;

    /* ==========【库存房源】========== */

    /* ==================公共=START================= **/

    /**
     * 查询房源自动化数据
     *
     * @param pageNo
     * @param pageSize
     * @param house_address
     * @return
     */
    @RequestMapping("/queryAutoHouseInfoList")
    @ResponseBody
    public String queryAutoHouseInfoList(Integer pageNo, Integer pageSize, String house_address) {
        Msg<Object> msg = new Msg<>();
        ViewHouseLibraryInfoVo pageObject = new ViewHouseLibraryInfoVo();
        pageObject.setHouse_address(house_address);
        Pagination<ViewHouseLibraryInfoVo> pagination = new Pagination<>(pageNo, pageSize, pageObject);
        pagination = houseLibraryService.querySimpleHouseInfoPageList(pagination);
        return msg.toString(pagination);
    }

    /* ==================公共=END================= **/

    /**
     * 跳转存房库界面
     *
     * @return
     */
    @RequestMapping("/houseLibrary")
    public String jumpHouseHouseInformationPage() {
        return "/library/houseInfoList";
    }

    @RequestMapping("/houseHouseInformationType")
    @ResponseBody
    public Map<String, Object> houseHouseInformationType() {
        return houseInformationStateService.addHouseHouseInformationType();
    }

    /**
     * 跳转房屋信息
     *
     * @param request
     * @param request
     * @return
     */
    @RequestMapping("/jumpHouseInfo")
    public ModelAndView jumpHouseInfo(HttpServletRequest request) {
        return new ModelAndView("/library/houseInfo");
    }

    /**
     * 查询房屋信息
     *
     * @param hi_code
     * @param request
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/queryHouseInfo", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String queryHouseInfo(String hi_code, HttpServletRequest request) throws Exception {
        Msg<Object> msg = new Msg<>();
        HashMap<Object, Object> map = new HashMap<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();

        // 查询房屋数据
        ViewHouseLibraryInfoVo houseLibraryInfoVo = new ViewHouseLibraryInfoVo();
        houseLibraryInfoVo.setHi_code(hi_code);
        houseLibraryInfoVo = houseLibraryService.queryHouseLibraryInfo(houseLibraryInfoVo);
        if (houseLibraryInfoVo == null) {
            return msg.toString(110, Msg.MSG_PARAM_ERROR);
        }
        UserCenterEmployee userCenter = new UserCenterEmployee();
        userCenter.setEm_id(employee.getEm_id());
        userCenter = employeeService.selectUserCenterEmployeeInfo(userCenter);
        map.put("userCenter", userCenter);
        // houseLibraryService.selectHouseById(houseLibraryInfoVo.getHi_id())
        // 查询房源最新管家
        PositionRecordVo positionRecordVo = houseLibraryService.queryPositionRecordVo(houseLibraryInfoVo.getHi_code());
        houseLibraryInfoVo.setHpr_newEmp(positionRecordVo.getHpr_newEmp());
        map.put("houseLibraryInfo", houseLibraryInfoVo);

        // 查询最新托管合同
        // ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        // contractVo.setHi_code(hi_code);
        // contractVo.setContractObject_State(AppConfig.con_state_2);
        // contractVo.setContractObject_Type(AppConfig.TYPE_CONTRACT_201);
        // contractVo =
        // contractObjectService.selectContractObjectByCNo(contractVo);
        // json.put("lastTGContract", contractVo);

        // 是否有编辑业绩权限
        boolean boo = AppUtil.isHavingPower(getClass(), "query_achi");
        if (boo) {
            map.put("user_power", "review");
        }
        msg.setData(map);
        return msg.toString();
    }

    /**
     * 跳转添加公寓界面
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/addApartmentPage")
    public String addApartmentPage(HttpServletRequest request, HttpServletResponse response) {
        // 查询公寓类型
        // List<String> versions = houseHouseBrandService.selectVersions();
        // request.setAttribute("versions", versions);
        return "/library/addApartment";
    }

    /**
     * ajax查询公寓类型
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/selectType")
    @ResponseBody
    public Map<String, Object> selectType(HttpServletRequest request, HttpServletResponse response) {
        // 查询公寓类型
        List<String> versions = houseHouseBrandService.selectVersions();

        Map<String, Object> map = new HashMap<>();
        map.put("versions", versions);
        return map;
    }

    /**
     * AJAX物业基本信息
     *
     * @param request
     * @return
     */
    @RequestMapping("/selectwuyename")
    @ResponseBody
    public Map<String, Object> selectwuyename(HttpServletRequest request, String PropertyInfo_Name) {
        PropertyInfo userCenterPropertyInfo = new PropertyInfo();
        userCenterPropertyInfo.setPropertyInfo_Name(PropertyInfo_Name);
        List<PropertyInfo> ucpis = userCenterPropertyInfoService.selectwuyename(userCenterPropertyInfo);
        Map<String, Object> map = new HashMap<>();
        map.put("userCenterPropertyInfos", ucpis);
        return map;
    }

    /**
     * 查询分页查询存放库房屋基本信息
     *
     * @return
     * @throws Exception
     * @author 陈智颖
     */
    @RequestMapping("/information")
    @ResponseBody
    public Map<String, Object> selectHouseHouseInformation(TableList tableList1, String mode, Integer ucc_id, Integer hi_forRentState) throws Exception {

        // 初始化获取对象
        TableList tableList = tableList1.initData(tableList1);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

        HouseModel houseModel = new HouseModel();
        if (tableList.getDateStart() != null && !tableList.getDateStart().equals("")) {
            houseModel.setDateStart(sf.parse(tableList.getDateStart()));
        }
        if (tableList.getDateEnd() != null && !tableList.getDateEnd().equals("")) {
            houseModel.setDateEnd(sf.parse(tableList.getDateEnd()));
        }
        houseModel.setSqlWhere(tableList.getSqlWhere());

        houseModel.setDateTitle(tableList.getDateType());

        if (tableList.getOrderBy() != null && !tableList.getOrderBy().equals("")) {
            houseModel.setSqlOrderBy("order by " + tableList.getOrderBy() + " asc");
        } else {
            houseModel.setSqlOrderBy("");
        }
        if (mode != null && !mode.equals("null")) {
            houseModel.setSqlWhere(houseModel.getSqlWhere() + " and hi_isForRent = 1");
            houseModel.setMode(mode);
        }
        if (ucc_id != null) {
            houseModel.setSqlWhere(houseModel.getSqlWhere() + " and ucc_id = " + ucc_id);
        }
        if (hi_forRentState != null) {
            switch (hi_forRentState) {
                case 2:
                    houseModel.setSqlWhere(houseModel.getSqlWhere() + " AND hi_forRentState <> 1021");
                    break;
                case 3:
                    houseModel.setSqlWhere(houseModel.getSqlWhere() + " AND hi_forRentState = 1021");
                    break;
            }
        }

        // 装载数据类
        DataList<HouseInfoKeep> datalist = new DataList<>();
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));

        // 查询分页实体
        PageModel<HouseInfoKeep> pageModel = houseLibraryService.selectHouseHouseInformation(tableList.getPageNo(), pageSize, houseModel);
        // 处理特殊数据
        List<HouseInfoKeep> list = new ArrayList<>();
        for (HouseInfoKeep houseInfoKeep : pageModel.getList()) {
            houseInfoKeep.setHi_money(houseInfoKeep.getHi_price());
            houseInfoKeep.setHe_phone("/" + houseInfoKeep.getHe_phone());
            houseInfoKeep.setEm_phone("/" + houseInfoKeep.getEm_phone());
            list.add(houseInfoKeep);
        }
        // 装载数据
        return datalist.dataList(list, tableList.getPageNo(), pageSize, pageModel.getTotalRecords(), pageModel.getSumMoney());
    }

    /**
     * 特价房源
     *
     * @return
     * @throws Exception
     * @author 陈智颖
     */
    @RequestMapping("/informationPrice")
    @ResponseBody
    public Map<String, Object> informationPrice(TableList tableList1, String mode) throws Exception {

        // 初始化获取对象
        TableList tableList = tableList1.initData(tableList1);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

        HouseModel houseModel = new HouseModel();
        if (tableList.getDateStart() != null && !tableList.getDateStart().equals("")) {
            houseModel.setDateStart(sf.parse(tableList.getDateStart()));
        }
        if (tableList.getDateEnd() != null && !tableList.getDateEnd().equals("")) {
            houseModel.setDateEnd(sf.parse(tableList.getDateEnd()));
        }
        houseModel.setSqlWhere(tableList.getSqlWhere());

        houseModel.setDateTitle(tableList.getDateType());

        if (tableList.getOrderBy() != null && !tableList.getOrderBy().equals("")) {
            houseModel.setSqlOrderBy("order by " + tableList.getOrderBy() + " asc");
        } else {
            houseModel.setSqlOrderBy("");
        }
        houseModel.setSqlWhere(houseModel.getSqlWhere() + " and hi_isForRent = 1 and (hi_boolActive=1 or hi_houseActive=1)");
        // 装载数据类
        DataList<HouseInfoKeep> datalist = new DataList<>();
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        // 查询分页实体
        PageModel<HouseInfoKeep> pageModel = houseLibraryService.selectHouseHouseInformation(tableList.getPageNo(), pageSize, houseModel);
        // 处理特殊数据
        List<HouseInfoKeep> list = new ArrayList<>();
        for (HouseInfoKeep houseInfoKeep : pageModel.getList()) {
            houseInfoKeep.setHi_money(houseInfoKeep.getHi_price());
            houseInfoKeep.setHe_phone("/" + houseInfoKeep.getHe_phone());
            houseInfoKeep.setEm_phone("/" + houseInfoKeep.getEm_phone());
            list.add(houseInfoKeep);
        }
        // 装载数据
        return datalist.dataList(list, tableList.getPageNo(), pageSize, pageModel.getTotalRecords(), pageModel.getSumMoney());
    }

    /**
     * 招租房源
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/forRentHouse")
    @ResponseBody
    public Map<String, Object> forRentHouse(HttpServletResponse response, Integer pageSize) {

        // 跨域传输json
        response.addHeader("Access-Control-Allow-Origin", "*");

        Map<String, Object> map = new HashMap<>();
        HouseInfoKeep houseInfoKeep = new HouseInfoKeep();
        houseInfoKeep.setPageSize(pageSize);
        List<HouseInfoKeep> forRentHouseInformationKeep = houseLibraryService.selectHouseForRent(houseInfoKeep);
        map.put("forRentHouseInformationKeep", forRentHouseInformationKeep);

        return map;
    }

    /**
     * 跳转修改房屋信息界面
     *
     * @param response
     * @return
     */
    @RequestMapping("/jumpHouseInfoEdit")
    public ModelAndView jumpHouseInfoEdit(String id, HttpServletResponse response) {
        response.addHeader("Access-Control-Allow-Origin", "*");

        ModelAndView view = new ModelAndView("/library/houseInfoEdit");
        if (StringUtils.isEmpty(id)) {
            // 404
            return view;
        }
        HouseInfoKeep houseInfoKeep = houseLibraryService.selectHouseById(Integer.parseInt(id));
        view.addObject("houseHouseInfoKeep", houseInfoKeep);
        return view;
    }

    /**
     * 获取房屋图片
     *
     * @param hi_id
     * @return
     * @作者 JiangQT
     * @日期 2016年6月10日
     */
    @RequestMapping("/getHouseImageList")
    @ResponseBody
    public String getHouseImageList(Integer hi_id) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(hi_id)) {
            return msg.toString(110, Msg.MSG_PARAM_ERROR);
        }
        List<HouseHouseImageType> selectHouseImage = houseImageTypeService.selectHouseImage(hi_id);
        for (HouseHouseImageType houseHouseImageType : selectHouseImage) {
            houseHouseImageType.setHouseImage(houseImageService.queryHouseImage(houseHouseImageType.getHm_id()));
        }
        msg.setData(selectHouseImage);
        return msg.toString();
    }

    /**
     * jbox弹出百度地图获取经纬度
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/map")
    public String map(HttpServletRequest request, HttpServletResponse response) {
        return "/product/map";
    }

    /**
     * 获取房屋图片
     *
     * @param hi_code
     * @param response
     * @return
     * @作者 JiangQT
     * @日期 2016年6月10日
     */
    @RequestMapping("/queryHouseImageList")
    @ResponseBody
    public String queryHouseImageList(HttpServletResponse response, String hi_code, String house_type, String image_mode) {
        response.addHeader("Access-Control-Allow-Origin", "*");
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(hi_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        if ("intent".equals(house_type)) {
            HouseIntentionImage intentionImage = new HouseIntentionImage();
            intentionImage.setHi_code(hi_code);
            List<HouseIntentionImage> houseIntentionImages = houseIntentionService.queryHouseImageList(intentionImage);
            for (HouseIntentionImage houseIntentionImage : houseIntentionImages) {
                houseIntentionImage.setHim_path(OSSparameter.imagePath(houseIntentionImage.getHim_path(), null, null));
            }
            msg.setData(houseIntentionImages);
        } else {
            if (image_mode != null && "folder".equals(image_mode)) {
                HouseImageVo houseLibraryImageVo = new HouseImageVo();
                houseLibraryImageVo.setHi_code(hi_code);
                List<HouseImageVo> houseLibraryImageVos = houseImageService.queryHouseImageListByFolder(houseLibraryImageVo);
                for (HouseImageVo house : houseLibraryImageVos) {
                    house.setHm_path(OSSparameter.imagePath(house.getHm_path(), null, null));
                }
                msg.setData(houseLibraryImageVos);
            } else {
                HouseImageVo houseLibraryImageVo = new HouseImageVo();
                houseLibraryImageVo.setHi_code(hi_code);
                houseLibraryImageVo.setHm_state(1);
                List<HouseImageVo> houseLibraryImageVos = houseLibraryService.queryHouseImageList(houseLibraryImageVo);
                for (HouseImageVo house : houseLibraryImageVos) {
                    house.setHm_path(OSSparameter.imagePath(house.getHm_path(), null, null));
                }
                msg.setData(houseLibraryImageVos);
            }
        }
        return msg.toString();
    }

    /**
     * 查询房屋信息
     *
     * @return
     */
    @RequestMapping("/selectHouseById")
    @ResponseBody
    public String selectHouseById(String hi_code) {
        Msg<Object> msg = new Msg<>();
        Map<String, Object> map = new HashMap<>();
        if (StringUtils.isEmpty(hi_code)) {
            return msg.toString(110, Msg.MSG_PARAM_ERROR);
        }
        // 【查询库存房源】
        ViewHouseLibraryInfoVo houseLibraryInfoVo = houseLibraryService.queryHouseLibraryInfo(hi_code);
        map.put("houseHouseInformation", houseLibraryInfoVo);
        if (houseLibraryInfoVo == null) {
            return msg.toString(110, "没有发现该房源，请重试或联系管理员");
        }

        // 【查询房屋扩展信息】
        HouseHouseExtended houseHouseExtended = houseExtendedService.selectHouseHouseExtendedById(houseLibraryInfoVo.getHe_id());
        map.put("houseHouseExtended", houseHouseExtended);

        if (!StringUtils.isEmpty(houseLibraryInfoVo.getCc_code())) {
            UserCustomer customer = new UserCustomer();
            customer.setCc_code(houseLibraryInfoVo.getCc_code());
            customer = customerService.queryCustomerInfo(customer);
            map.put("customer", customer);
        }

        // customerService.queryCustomerInfo();

        // 【物业名称List】
        PropertyInfoName propertyInfoName = new PropertyInfoName();
        propertyInfoName.setUpn_id(houseLibraryInfoVo.getUpn_id());
        propertyInfoName = userCenterPropertyInfoService.selectPropertyInfoNameByWhere(propertyInfoName);
        map.put("propertyInfoName", propertyInfoName);

        if (propertyInfoName != null) {
            PropertyInfoName propertyInfoName1 = new PropertyInfoName();
            if (propertyInfoName.getUpn_sid() == 0) {
                propertyInfoName1.setUpn_sid(propertyInfoName.getUpn_id());
            } else {
                propertyInfoName1.setUpn_sid(propertyInfoName.getUpn_sid());
            }
            map.put("propertyInfoNamelist", userCenterPropertyInfoService.selectPropertyInfoNameList(propertyInfoName1));
        }

        // 【房屋集中式/分散式】
        map.put("houseInfoStates", houseIntentionService.queryHouseInfoStateList(new HouseInformationState()));

        // 【房屋类型关联表】
        HouseInformationStateRelation stateRelation = new HouseInformationStateRelation();
        stateRelation.setHi_code(houseLibraryInfoVo.getHi_code());
        map.put("stateRelations", houseIntentionService.queryHouseInfoStateListRelation(stateRelation));

        // 【适合推荐群体List】
        map.put("hoseRecommendGroupList", hoseRecommendGroupService.selectHoseRecommendGroupList());

        // 【公寓类型】
        map.put("versions", houseHouseBrandService.selectVersions());

        // // 查询合同
        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setHi_code(hi_code);
        contractVo.setContractObject_Type("托管合同");
        contractVo = contractObjectService.selectContractObjectByCNo(contractVo);

        if (null != contractVo) {

            ContractImageVo imageVo = new ContractImageVo();
            imageVo.setContractObject_Code(contractVo.getContractObject_Code());
            imageVo.setCi_type("FCZ");
            List<ContractImageVo> imgList = contractObjectService.queryContractImage(imageVo);
            if (null != imgList && !imgList.isEmpty()) {
                List<String> imgPathList = new ArrayList<>();
                for (ContractImageVo imgVo : imgList) {
                    imgPathList.add(OSSparameter.imagePath(imgVo.getCi_path(), null, null));
                }
                map.put("fczImgs", imgPathList);
            }
        }
        // 查询修改招租房源图片 shenhx 20170426
        HouseImageVo houseHouseImage = new HouseImageVo();
        houseHouseImage.setHi_code(hi_code);
        //TODO
//		houseHouseImage.setHif_name("招租照片");
        List<HouseImageVo> houseImgList = houseImageService.queryImgListByHiCodeAndHifName(houseHouseImage);
        map.put("houseImgList", houseImgList);

        msg.setData(map);
        return msg.toString();
    }

    /**
     * 查询房屋物业信息列表
     *
     * @param upn_id
     * @return
     */
    @RequestMapping("/queryPropertyInfoList")
    @ResponseBody
    public String queryPropertyInfoList(Integer upn_sid, Integer upn_id) {
        Msg<Object> msg = new Msg<>();
        PropertyInfoName propertyInfoName = new PropertyInfoName();
        if (upn_sid != null) {
            propertyInfoName.setUpn_sid(upn_sid);
        }
        if (upn_id != null) {
            propertyInfoName.setUpn_id(upn_id);
        }
        List<PropertyInfoName> propertyInfoNamelist = userCenterPropertyInfoService.selectPropertyInfoNameList(propertyInfoName);
        msg.setData(propertyInfoNamelist);
        return msg.toString();
    }

    /**
     * ajax发布房屋到发布房源库
     *
     * @return
     */
    @RequestMapping("/updataHeState")
    @ResponseBody
    public String updataHeState(String hi_code, String images) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toString(110, Msg.MSG_LOGIN_ERROR);
        }
        if (StringUtils.isEmpty(hi_code)) {
            return msg.toString(110, Msg.MSG_PARAM_ERROR);
        }
        // 添加/更新线上房源
        HouseInfoKeep informationKeep = houseLibraryService.selectHouseInfoByCode(hi_code);
        if (informationKeep == null) {
            return msg.toString(110, Msg.MSG_PARAM_ERROR);
        }
        informationKeep.setHi_releaseId(employee.getEm_id());
        if (housingAllocationService.selectHouseInfoByCode(hi_code) == null) {
            housingAllocationService.addHouseInformation(informationKeep);
        } else {
            housingAllocationService.updateOnlineHouseInfo(informationKeep);
        }
        // 更新房屋图片
        if (!StringUtils.isEmpty(images)) {
            // 初始化图片状态
            HouseImageVo houseImage = new HouseImageVo();
            houseImage.setHm_state(0);
            houseImage.setHi_code(hi_code);
            houseImageService.updateHouseImage(houseImage);
            // 更新图片状态
            String[] split = images.split(",");
            for (String str : split) {
                houseImage = new HouseImageVo();
                houseImage.setHm_state(1);
                houseImage.setHm_id(Integer.valueOf(str));
                houseImageService.updateHouseImage(houseImage);
            }
            // 删除房屋图片类型
            HouseLibraryImageTypeVo imageTypeVo = new HouseLibraryImageTypeVo();
            imageTypeVo.setHi_code(hi_code);
            houseImageTypeService.deleteHouseImageType(imageTypeVo);
            // 添加房屋图片类型
            HouseImageVo houseLibraryImageVo = new HouseImageVo();
            houseLibraryImageVo.setHi_code(hi_code);
            List<HouseImageVo> houseImageList = houseLibraryService.queryHouseImageList(houseLibraryImageVo);
            for (HouseImageVo houseLibraryImage : houseImageList) {
                imageTypeVo = new HouseLibraryImageTypeVo();
                imageTypeVo.setHi_code(houseLibraryImage.getHi_code());
                imageTypeVo.setHit_type(houseLibraryImage.getHm_type());
                imageTypeVo.setHm_id(houseLibraryImage.getHm_id());
                houseLibraryService.addHouseImageType(imageTypeVo);
            }
        }
        return msg.toString();
    }

    /**
     * ajax发布房屋到发布房源库
     *
     * @param request
     * @param response
     * @param houseInfo
     * @param images
     * @param hi_code
     * @param publishArea 发布对象，公司官网默认发布，会分期等其他渠道根据实际需要发布
     * @return
     * @author 王孝元
     */
    @RequestMapping("/addOnlineHouse")
    @ResponseBody
    public Map<String, Object> addOnlineHouse(HttpServletRequest request, HttpServletResponse response, HouseHouseInformation houseInfo, String images, String hi_code, String publishArea, String hi_project, String hi_function, String propertyInfo_address, String hi_metro, String hi_busStation, String hi_area, String hi_latitude, Integer hi_totalFloor, Integer isUpd) throws Exception {
        Map<String, Object> map = new HashMap<>();
        // 判断登录
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            map.put("msg", Msg.MSG_LOGIN_ERROR);
            return map;
        }
        // 判断参数
        if (StringUtils.isEmpty(hi_code)) {
            map.put("msg", Msg.MSG_PARAM_ERROR);
            return map;
        }
        if (!AppUtil.isNotNull(images)) {
            map.put("msg", "请上传房屋照片");
            return map;
        }
        HouseImageVo img = new HouseImageVo();
        img.setHi_code(houseInfo.getHi_code());
        img.setHm_chose(AppConfig.HM_CHOSE_0);
        houseImageService.updateHouseImage(img);
        //图片处理
        String[] arr = images.split("_");
        for (String anArr : arr) {
            String[] imagedata = anArr.split("-");
            HouseImageVo image = new HouseImageVo();
            image.setHm_id(Integer.valueOf(imagedata[0]));
            image.setHm_chose(Integer.valueOf(imagedata[1]));
            houseImageService.updateHouseImage(image);
        }

        // 发布房源
        ViewHouseLibraryInfoVo houseLibraryInfoVo = houseLibraryService.queryHouseLibraryInfo(hi_code);
        houseInfo.setHi_type(houseLibraryInfoVo.getHi_type());
        houseInfo.setHi_function(houseLibraryInfoVo.getHi_function());
        houseInfo.setHi_peopleName(houseLibraryInfoVo.getHi_peopleName());
        houseInfo.setHe_id(houseLibraryInfoVo.getHe_id());
        houseInfo.setRecommendGroup_Id(houseLibraryInfoVo.getRecommendGroup_Id());
        houseInfo.setHi_num(houseLibraryInfoVo.getHi_num());
        houseInfo.setHi_userManaged(houseLibraryInfoVo.getHi_userManaged());
        houseInfo.setHi_address(houseLibraryInfoVo.getHi_address());
        houseInfo.setHi_money(houseLibraryInfoVo.getHi_price());
        houseInfo.setHi_version(houseLibraryInfoVo.getHi_version());
        houseInfo.setContract_intoStatus(houseLibraryInfoVo.getContract_intoStatus());
        houseInfo.setContract_outStatus(houseLibraryInfoVo.getContract_outStatus());
        houseInfo.setHi_date(new Date());
        houseInfo.setHi_releaseId(employee.getEm_id());
        houseInfo.setPropertyInfo_Id(houseLibraryInfoVo.getPropertyInfo_Id());
        houseInfo.setHi_isForRent(houseLibraryInfoVo.getHi_isForRent());
        houseInfo.setHi_project(hi_project);
        houseInfo.setHi_function(hi_function);
        houseInfo.setHi_totalFloor(hi_totalFloor);

        // 更新物业
        PropertyInfo propertyInfo = new PropertyInfo();
        propertyInfo.setPropertyInfo_Id(houseInfo.getPropertyInfo_Id());
        propertyInfo.setPropertyInfo_address(propertyInfo_address);
        propertyInfo.setPropertyInfo_quyu(hi_area);
        propertyInfo.setPropertyInfo_coordinate(hi_latitude);
        propertyInfo.setPropertyInfo_transit(hi_busStation);
        propertyInfo.setPropertyInfo_gui(hi_metro);
        userCenterPropertyInfoService.updatePropertyInfo(propertyInfo);

        // 查询是否发布
        HouseHouseInformation house = housingAllocationService.selectHouseInfoByCode(hi_code);
        if (house.getHe_isPublish() == 0 || "".equals(house.getHe_isPublish())) {
            housingAllocationService.addHouse(houseInfo);
        } else {
            houseInfo.setHi_id(house.getHi_id());
            housingAllocationService.updateHouse(houseInfo);
        }
        // 更新库存房源
        houseLibraryService.updateHouseInfoByOnlineHouse(houseInfo);
        // 保存房屋图片
        /*String[] objs = images.split("#");
        int i = 1;
		for (String obj : objs) {
			JSONObject image = JSONObject.parseObject(obj);
			String src = AppUtil.null2Str(image.get("src"));
			String type = AppUtil.null2Str("effect");
			String hm_id = AppUtil.null2Str(image.get("hm_id"));
			if (hm_id.equals("") || hm_id.equals("undefined")) {
				// 添加图片
				HouseImageVo newImage = new HouseImageVo();
				if(i == 1){
					newImage.setHm_type("page");
				}else{
					newImage.setHm_type(type);
				}
				newImage.setHi_code(houseInfo.getHi_code());
				newImage.setHm_path(src);
				newImage.setHm_createTime(new Date());
				newImage.setHm_state(1);
				houseImageService.addHouseImage(newImage);
				// 添加图片类型
				HouseHouseImageType imageType = new HouseHouseImageType();
				imageType.setHi_id(houseInfo.getHi_id());
				imageType.setHit_type(newImage.getHm_type());
				imageType.setHi_code(newImage.getHi_code());
				imageType.setHm_id(newImage.getHm_id());
				houseImageTypeService.addHouseImageType(imageType);
			}
			i++;
		}*/
        //房源发布审核中
        if (!StringUtils.isEmpty(publishArea)) {
            //根据房屋code查询此房屋发布状态
            HousePublish hpc = new HousePublish();
            hpc.setHi_code(hi_code);
            houseLibraryService.deleteHousePublishState(hpc);
            String[] code = publishArea.split(",");
            for (int i = 0; i < code.length; i++) {
                HousePublish hp = new HousePublish();
                hp.setHi_code(hi_code);
                hp.setHpc_code(code[i].toString());
                HousePublish h = houseLibraryService.housePublish(hp);
                if (h == null) {
                    HousePublish housePublish = new HousePublish();
                    housePublish.setHi_code(hi_code);
                    housePublish.setHpc_code(code[i].toString());
                    housePublish.setHp_status(AppConfig.hp_status_10);
                    housePublish.setHp_create_time(new Date());
                    houseLibraryService.addhousePublish(housePublish);
                }
            }
        }

        // 更新库存房源状态
        HouseHouseExtended houseExtended = new HouseHouseExtended();
        houseExtended.setHe_id(houseLibraryInfoVo.getHe_id());
        houseExtended.setHe_isPublish(1);
        houseExtendedService.updataInfo(houseExtended);

        if (publishArea.contains("20180003")) {

            // 同步发布到会分
            feedHouseToHfq(houseInfo, hi_code, 2);
        }
        if (publishArea.contains("20180004") && !StringUtils.isEmpty(houseLibraryInfoVo.getComm_req_id())) {
            String room_code = AppUtil.genrateRoomCode(1, rentHouseService.queryRentHouseCount());
            RentHouseVo rentHouseVo = new RentHouseVo();
            rentHouseVo.setRoom_code(room_code);
            rentHouseVo.setHi_code(houseLibraryInfoVo.getHi_code());
            RentHouseVo houseVo = rentHouseService.addRentHouseVo(rentHouseVo);
            if (StringUtils.isEmpty(houseLibraryInfoVo.getRoom_code())) {
                houseLibraryInfoVo.setRoom_code(houseVo.getRoom_code());
            }
            // 同步到支付宝
            // 1、房源图片同步
            houseLibraryInfoVo.setHi_totalFloor(hi_totalFloor);
            if (1 == isUpd) {// 更新支付宝已有图片
                houseImageService.updateImageAlisync(houseLibraryInfoVo.getHi_code());
                rentHouseService.syncFileService(request.getSession().getServletContext().getRealPath("/"), houseLibraryInfoVo.getHi_code(), "1");
            }
//            if("分散式".equals(houseLibraryInfoVo.getHis_name())){
            // 2、分散式房源信息同步
            Map<String, Object> dispersionMap = rentHouseService.rentHouseDispersionSync(houseLibraryInfoVo);
            if ((Integer) dispersionMap.get("code") != 200) {
                return dispersionMap;
            }
            // 3、房源上架
            Map<String, Object> stateMap = rentHouseService.rentHouseStateSync(houseLibraryInfoVo.getHi_code(), houseLibraryInfoVo.getRoom_code(), 1, 1, 1);
            if ((Integer) stateMap.get("code") != 200) {
                return stateMap;
            }
// } else if("集中式".equals(houseLibraryInfoVo.getHis_name())){
//                // 4、集中式房源信息同步
//                rentHouseService.syncCentralizationHouseKeepService(houseLibraryInfoVo);
//                // 5、房源上架
//                rentHouseService.rentHouseStateSync(houseLibraryInfoVo.getHi_code(), houseLibraryInfoVo.getRoom_code(), 1, 1, 2);
//            }
        }
        map.put("msg", "success");
        return map;
    }

    /**
     * 随机生成房屋代码 标识房屋唯一性的编码，非主键
     * <p>
     * 重庆大写字母+房屋区域第一个大写字母+三位数的随机数
     *
     * @return
     */
    public String getTheFirstLetter(HouseInfoKeep houseInfoKeep) {
        StringBuilder str = new StringBuilder();
        if (!"".equals(houseInfoKeep.getHi_area())) {
            GetTheFirstLetter getTheFirstLetter = new GetTheFirstLetter();
            str.append("CQ");
            String area = houseInfoKeep.getHi_area().substring(0, 1);
            str.append(getTheFirstLetter.String2Alpha(area));
            String date = new Date().getTime() + "";
            str.append(date);
            str.append(Randoms.random());
        }
        return str.toString();
    }

    /**
     * ajax修改库存房屋基本信息
     *
     * @return
     */
    @RequestMapping("/updateHouseInfo")
    @ResponseBody
    public String updateHouseInfo(HouseInfoKeep houseInformationKeep, HouseExtendedVo houseHouseExtended) {
        Msg<Object> msg = new Msg<>();
        if (houseInformationKeep == null || houseHouseExtended == null) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        houseInformationStateRelationService.deleteHouseInformationStateRelation(houseInformationKeep.getHi_code());
        if (houseInformationKeep.getHb_id() == 1) {
            HouseInformationStateRelation houseInformationStateRelation1 = new HouseInformationStateRelation();
            houseInformationStateRelation1.setHi_code(houseInformationKeep.getHi_code());
            houseInformationStateRelation1.setHis_id(1);
            houseInformationStateRelationService.addHouseInformationStateRelation(houseInformationStateRelation1);
            HouseInformationStateRelation houseInformationStateRelation2 = new HouseInformationStateRelation();
            houseInformationStateRelation2.setHi_code(houseInformationKeep.getHi_code());
            houseInformationStateRelation2.setHis_id(3);
            houseInformationStateRelationService.addHouseInformationStateRelation(houseInformationStateRelation2);
            HouseInformationStateRelation houseInformationStateRelation3 = new HouseInformationStateRelation();
            houseInformationStateRelation3.setHi_code(houseInformationKeep.getHi_code());
            houseInformationStateRelation3.setHis_id(7);
            houseInformationStateRelationService.addHouseInformationStateRelation(houseInformationStateRelation3);
            HouseInformationStateRelation houseInformationStateRelation4 = new HouseInformationStateRelation();
            houseInformationStateRelation4.setHi_code(houseInformationKeep.getHi_code());
            houseInformationStateRelation4.setHis_id(8);
            houseInformationStateRelationService.addHouseInformationStateRelation(houseInformationStateRelation4);
        } else {
            HouseInformationStateRelation houseInformationStateRelation1 = new HouseInformationStateRelation();
            houseInformationStateRelation1.setHi_code(houseInformationKeep.getHi_code());
            houseInformationStateRelation1.setHis_id(2);
            houseInformationStateRelationService.addHouseInformationStateRelation(houseInformationStateRelation1);
            HouseInformationStateRelation houseInformationStateRelation2 = new HouseInformationStateRelation();
            houseInformationStateRelation2.setHi_code(houseInformationKeep.getHi_code());
            houseInformationStateRelation2.setHis_id(5);
            houseInformationStateRelationService.addHouseInformationStateRelation(houseInformationStateRelation2);
            HouseInformationStateRelation houseInformationStateRelation3 = new HouseInformationStateRelation();
            houseInformationStateRelation3.setHi_code(houseInformationKeep.getHi_code());
            houseInformationStateRelation3.setHis_id(11);
            houseInformationStateRelationService.addHouseInformationStateRelation(houseInformationStateRelation3);
            HouseInformationStateRelation houseInformationStateRelation4 = new HouseInformationStateRelation();
            houseInformationStateRelation4.setHi_code(houseInformationKeep.getHi_code());
            houseInformationStateRelation4.setHis_id(12);
            houseInformationStateRelationService.addHouseInformationStateRelation(houseInformationStateRelation4);
        }
        // 验证房源是否存在
        List<HouseInfoKeep> houseInfo = houseLibraryService.isHavingHouseInfo(houseInformationKeep);
        if (houseInfo != null && houseInfo.size() > 1) {
            return msg.toError("该房源已存在");
        }
        // 【查询库存房源】
        ViewHouseLibraryInfoVo houseLibraryInfoVo = houseLibraryService.queryHouseLibraryInfo(houseInformationKeep.getHi_code());
        HouseHouseExtended houseExtended = new HouseHouseExtended();
        houseExtended.setHe_id(houseLibraryInfoVo.getHe_id());
        houseExtended.setHe_address(houseHouseExtended.getHe_address());
        houseExtendedService.updataInfo(houseExtended);
        // 存房
        boolean boo = houseLibraryService.updateHouseInfo(houseInformationKeep, houseHouseExtended);

        // 保存房屋图片 shenhx 20170426
        String houseImgListSrc = houseInformationKeep.getHouseImgListSrc();
        if (null != houseImgListSrc && !"".equals(houseImgListSrc)) {

            HouseImageFolder folder = new HouseImageFolder();
            folder.setHi_code(houseInformationKeep.getHi_code());
            //TODO
//			folder.setHif_name("招租照片");
            List<HouseImageFolder> folderList = houseLibraryService.selectListHouseImageFolder(folder);
            if (null == folderList || folderList.isEmpty()) {
                // folder.setHif_name("招租照片");
                folder.setHi_code(houseInformationKeep.getHi_code());
                folder.setHif_createTime(new Date());
                houseLibraryService.addHouseImageFolder(folder);
                folderList = houseLibraryService.selectListHouseImageFolder(folder);
            }

            String[] srcArray = houseImgListSrc.split(",");
            List<String> srcList = Arrays.asList(srcArray);
            HouseImageVo houseImg = new HouseImageVo();
            houseImg.setHi_code(houseInformationKeep.getHi_code());
//			houseImg.setHif_name("招租照片");
            List<HouseImageVo> historyImgs = houseImageService.queryImgListByHiCodeAndHifName(houseImg);
            List<String> imgPaths = new ArrayList<>();
            for (HouseImageVo img : historyImgs) {
                if (!srcList.contains(img.getHm_path())) {
                    houseImageService.deleteImage(img.getHm_id());
                } else {
                    imgPaths.add(img.getHm_path());
                }
            }

            for (String aSrcArray : srcArray) {
                if (!imgPaths.contains(aSrcArray)) {
                    HouseImageVo houseImage = new HouseImageVo();
                    houseImage.setHm_type("solid");
                    houseImage.setHi_code(houseInformationKeep.getHi_code());
                    houseImage.setHm_path(aSrcArray);
                    houseImage.setHm_createTime(new Date());
                    houseImage.setHm_state(0);
                    houseImage.setHif_id(folderList.get(0).getHif_id());
                    houseImageService.addHouseImage(houseImage);
                }
            }

        }

        if (!boo) {
            return msg.toError("更新失败");
        }
        return msg.toString();
    }

    /**
     * ajax修改库存房屋扩展信息
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/updateExt")
    @ResponseBody
    public Map<String, Object> updateExt(HouseHouseExtended houseHouseExtended, Model model, HttpServletRequest request, HttpServletResponse response, String hi_id, String buyTime) {
        if (!"".equals(buyTime)) {
            houseHouseExtended.setHe_buyTime(DataUtil.StrToDate(buyTime));
        }
        int result = 0;
        if (houseHouseExtended.getHe_state() == null) {
            houseHouseExtended.setHe_state("edit");
        }

        houseHouseExtended.setHe_time(new Date());
        if (houseHouseExtended.getHe_id() == null) {
            HouseInfoKeep houseInfoKeep = houseLibraryService.selectHouseById(Integer.parseInt(hi_id));
            result = houseExtendedService.addHouseExtended(houseHouseExtended);
            houseInfoKeep.setHe_id(houseHouseExtended.getHe_id());
            // 修改房屋基本信息
            houseLibraryService.upDataHouse(houseInfoKeep);
        } else {
            result = houseExtendedService.updataInfo(houseHouseExtended);
        }

        Map<String, Object> map = new HashMap<>();
        map.put("updata", result);
        return map;
    }

    /**
     * ajax查询库存房屋图片
     *
     * @return
     */
    @RequestMapping("/selectImage")
    @ResponseBody
    public Map<String, Object> selectImage(Integer hi_id) {
        Map<String, Object> map = new HashMap<>();
        List<HouseIntentionImageType> image = houseImageTypeService.selectImage(hi_id);
        List<HouseIntentionImage> houseIntentionImageList = new ArrayList<>();
        for (HouseIntentionImageType houseIntentionImageType : image) {
            HouseIntentionImage houseIntentionImage = houseImageService.selectImageById(houseIntentionImageType.getHim_id());
            houseIntentionImage.setTy(houseIntentionImageType.getHint_type());
            houseIntentionImageList.add(houseIntentionImage);
        }
        map.put("houseIntentionImageList", houseIntentionImageList);
        return map;
    }

    /**
     * ajax上传原始图片
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/upload")
    public void upload(HttpServletRequest request, HttpServletResponse response, @RequestParam("file5") MultipartFile file, String elementIds) throws ServletException, IOException {
        String savePath = request.getSession().getServletContext().getRealPath("/") + "resources/image/upload";
        String FileName = null;
        if (!file.isEmpty()) {
            Date currTime = new Date();
            SimpleDateFormat formatter2 = new SimpleDateFormat("yyyyMMddhhmmssS", Locale.US);
            FileName = new String((formatter2.format(currTime)).getBytes("iso-8859-1"));
            String filename = file.getOriginalFilename();
            String filetype = filename.substring(filename.lastIndexOf("."));
            FileName = FileName + Randoms.randoms() + "" + filetype;
        }
        InputStream inputStream = file.getInputStream();
        OutputStream outputStream = new FileOutputStream(savePath + "/" + FileName);

        try {
            IOUtils.copy(inputStream, outputStream);
        } finally {
            IOUtils.closeQuietly(inputStream);
            IOUtils.closeQuietly(outputStream);
        }
        response.setContentType("text/html; charset=UTF-8");

        PrintWriter out = response.getWriter();
        out.print(FileName);
        out.flush();
        out.close();
    }

    /**
     * 更新房源照片
     *
     * @param request
     * @return
     * @作者 JiangQT
     * @日期 2017年2月21日
     */
    @RequestMapping("/updateHouseImage")
    @ResponseBody
    public String updateHouseImage(HttpServletRequest request, String hi_code, String image_path, Integer folderName, String hm_code) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        if (StringUtils.isEmpty(hi_code) || StringUtils.isEmpty(image_path)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        try {
            houseImageService.updateHouseImageBo(employee, hi_code, image_path, folderName, hm_code);
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
     * 删除房源照片
     *
     * @param request
     * @return
     * @作者 JiangQT
     * @日期 2017年2月21日
     */
    @RequestMapping("/deleteHouseImage")
    @ResponseBody
    public String deleteHouseImage(HttpServletRequest request, Integer hm_id) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(hm_id)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        try {
            msg = houseImageService.deleteHouseImage(hm_id);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError("删除图片失败");
        }
        return msg.toString();
    }

    /**
     * 上传图片
     *
     * @param request
     * @param data      图片数据
     * @param imageType 图片类型
     * @param type      存储类型
     * @param hi_id     房屋编号
     * @return
     * @author JiangQT
     */
    @RequestMapping("/uploadHouseImage")
    @ResponseBody
    public String uploadHouseImage(HttpServletRequest request, String data, String type, Integer hi_id, String imageType) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(data) || StringUtils.isEmpty(type)) {
            msg.setCode(110);
            msg.setMsg(Msg.MSG_PARAM_ERROR);
            return msg.toString();
        }
        String realPath = request.getSession().getServletContext().getRealPath("/resources/contractImage/");
        // 创建文件夹
        File upFile = new File(realPath);
        if (!upFile.exists()) {
            upFile.mkdirs();
        }
        // 文件名称
        String imageName = AppUtil.getImageName("") + ".png";
        // 本地缓存地址
        String imageUrl = realPath + "/" + imageName;
        // base64转图片
        boolean boo = ImageUtil.base64ToImageFile(data, imageUrl);
        if (!boo) {
            return msg.toError(Msg.MSG_SYSTEM_ERROR);
        }
        // 图片压缩
        File file = new File(imageUrl);
        try {
            ImageUtil.saveMinPhoto(file.toString(), file.toString(), 936, 0.9d);
        } catch (Exception e) {
            System.out.println("图片压缩失败");
        }
        // 远程上传
        String image = AppUtil.uploadHouseImage(getClass(), file);

        // 【数据库添加】
        Integer hm_id = houseImageService.addHouseImageService(hi_id, type, image, imageType);

        HashMap<String, Object> map = new HashMap<>();
        map.put("image", image);
        map.put("imageType", imageType);
        map.put("hm_id", hm_id);
        msg.setData(map);
        return msg.toString();
    }

    /**
     * 删除图片
     *
     * @param image_url 图片路径
     * @param him_id    意向房源图片编号
     * @param hm_id     库存房源图片编号
     * @return
     * @throws IOException
     * @作者 JiangQT
     * @日期 2016年6月3日
     */
    @RequestMapping("/deleteImage")
    @ResponseBody
    public String deleteImage(String image_url, Integer him_id, Integer hm_id) throws IOException {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(image_url)) {
            return msg.toString(110, Msg.MSG_PARAM_ERROR);
        }
        // 更新库存图片状态
        if (!StringUtils.isEmpty(hm_id)) {
            HouseImageVo houseImage = new HouseImageVo();
            houseImage.setHm_id(hm_id);
            houseImage.setHm_state(-1);
            houseImageService.updateHouseImage(houseImage);
        }
        // 删除意向图片、图片类型
        if (!StringUtils.isEmpty(him_id)) {
            // 远程删除图片
            // boolean boo =
            AppUtil.deleteHouseImage(getClass(), image_url);
            // if (!boo) {
            // return msg.toString(110, "图片删除失败");
            // }
            houseImageService.deleteIntentionImage(him_id);
            houseImageTypeService.deleteHouseIntentionImageType(him_id);
        }
        return msg.toString();
    }

    /**
     * 更新房屋图片标签
     *
     * @param hm_id    图片编号
     * @param new_type 新类型
     * @param old_type 旧类型
     * @param hi_id    房屋编号
     * @return
     * @作者 JiangQT
     * @日期 2016年6月3日
     */
    @RequestMapping("/updateImageLabel")
    @ResponseBody
    public String updateImageLabel(Integer hm_id, String new_type, String old_type, int hi_id) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(hm_id) || StringUtils.isEmpty(new_type) || StringUtils.isEmpty(old_type) || StringUtils.isEmpty(hi_id)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        ViewHouseLibraryInfoVo houseLibraryInfoVo = new ViewHouseLibraryInfoVo();
        houseLibraryInfoVo.setHi_id(hi_id);
        houseLibraryInfoVo = houseLibraryService.queryHouseLibraryInfo(houseLibraryInfoVo);

        HouseHouseImageType houseImageType = new HouseHouseImageType();
        HouseImageVo houseImage = new HouseImageVo();
        // 如果是封面图片
        if ("page".equals(new_type) && old_type != null) {
            houseImageType.setHi_id(hi_id);
            houseImageType.setHit_type(old_type);
            houseImageType.setOld_type(new_type);
            houseImageTypeService.updateHouseImageType(houseImageType);
            // 初始化所有图片类型
            houseImage.setHi_code(houseLibraryInfoVo.getHi_code());
            houseImage.setHm_type(old_type);
            houseImage.setOld_type(new_type);
            houseImageService.updateHouseImage(houseImage);
        }
        // 更新房屋图片标签类型
        houseImageType = new HouseHouseImageType();
        houseImageType.setHm_id(hm_id);
        houseImageType.setHit_type(new_type);
        houseImageTypeService.updateHouseImageType(houseImageType);
        houseImage = new HouseImageVo();
        houseImage.setHm_id(hm_id);
        houseImage.setHm_type(new_type);
        houseImageService.updateHouseImage(houseImage);

        List<HouseHouseImageType> selectHouseImage = houseImageTypeService.selectHouseImage(hi_id);
        for (HouseHouseImageType houseHouseImageType : selectHouseImage) {
            houseHouseImageType.setHouseImage(houseImageService.queryHouseImage(houseHouseImageType.getHm_id()));
        }
        msg.setData(selectHouseImage);
        return msg.toString();
    }

    /**
     * 更新房屋图片标签
     *
     * @param him_id   图片编号
     * @param new_type 新类型
     * @param old_type 旧类型
     * @return
     * @作者 JiangQT
     * @日期 2016年6月3日
     */
    @RequestMapping("/updateImageLabelInteger")
    @ResponseBody
    public String updateImageLabelInteger(Integer him_id, String new_type, String old_type, int phi_id) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(him_id) || StringUtils.isEmpty(new_type) || StringUtils.isEmpty(old_type) || StringUtils.isEmpty(phi_id)) {
            msg.setCode(110);
            msg.setMsg(Msg.MSG_PARAM_ERROR);
            return msg.toString();
        }
        // HouseHouseImageType houseImageType = new HouseHouseImageType();
        // HouseLibraryImageVo houseImage = new HouseLibraryImageVo();
        HouseIntentionImage houseIntentionImage = new HouseIntentionImage();
        HouseIntentionImageType houseIntentionImageType1 = new HouseIntentionImageType();
        HouseIntentionImageType houseIntentionImageType2 = new HouseIntentionImageType();
        // 如果是封面图片
        if (new_type != null && new_type.trim().equals("page")) {
            // 查询出已有的封面图片
            houseIntentionImage.setHim_id(him_id);
            houseIntentionImage.setHim_type("page");
            HouseIntentionImage houseIntentionImage2 = houseIntentionImageService.selectHouseIntentionImageType(houseIntentionImage);
            // 查询出需要改变的封面图片
            HouseIntentionImage houseIntentionImage3 = new HouseIntentionImage();
            String types = houseIntentionImage2.getHim_type();
            houseIntentionImage2.setHim_type(old_type);
            houseIntentionImage3.setHim_type(types);
            houseIntentionImage3.setHim_id(him_id);
            // 需要改变的封面类型修改
            houseIntentionImageType1.setHim_id(him_id);
            houseIntentionImageType1.setHint_type(new_type);
            // 原有类型封面修改
            houseIntentionImageType2.setHim_id(houseIntentionImage2.getHim_id());
            houseIntentionImageType2.setHint_type(old_type);
            // 修改图片信息
            houseIntentionImageService.updateHouseIntentionImageType(houseIntentionImage2);
            houseIntentionImageService.updateHouseIntentionImageType(houseIntentionImage3);
            // 修改意向房源图片标签类型
            houseIntentionImageService.updateHouseIntentionImagetypeType(houseIntentionImageType1);
            houseIntentionImageService.updateHouseIntentionImagetypeType(houseIntentionImageType2);

        } else {
            houseIntentionImage.setHim_id(him_id);
            houseIntentionImage.setHim_type(new_type);
            houseIntentionImageType1.setHim_id(him_id);
            houseIntentionImageType1.setHint_type(new_type);
            // 修改意向房源图片信息
            houseIntentionImageService.updateHouseIntentionImageType(houseIntentionImage);
            // 修改意向房源图片标签类型
            houseIntentionImageService.updateHouseIntentionImagetypeType(houseIntentionImageType1);
        }
        houseIntentionImage.setHim_id(him_id);
        houseIntentionImage = houseIntentionImageService.selectHouseIntentionImage(houseIntentionImage);
        List<HouseIntentionImage> selectHouseImage = houseIntentionImageService.selectHouseIntentionImageList(houseIntentionImage);
        // List<HouseHouseImageType> selectHouseImage =
        // houseImageTypeService.selectHouseImage(phi_id);
        // for (HouseHouseImageType houseHouseImageType : selectHouseImage) {
        // houseHouseImageType.setHouseImage(houseImageService.queryHouseImage(houseHouseImageType.getHm_id()));
        // }
        msg.setData(selectHouseImage);
        return msg.toString();
    }

    /**
     * ajax查询托管合同
     *
     * @return
     * @throws IOException
     */
    @RequestMapping("/selTrusteeship")
    @ResponseBody
    public Map<String, Object> selTrusteeship(String hi_id) {
        Map<String, Object> map = new HashMap<>();
        // 根据房屋编号查询房屋
        HouseInfoKeep houseInfoKeep = houseLibraryService.selectHouseById(Integer.parseInt(hi_id));
        ContractObjectVo userCenterContractObject2 = new ContractObjectVo();
        userCenterContractObject2.setHi_code(houseInfoKeep.getHi_code());
        userCenterContractObject2.setContractObject_Type("托管合同");
        // 根据房屋编码查询该房屋所有托管合同
        List<ViewGJPContrByCode> userCenterContractObjectList = contractObjectService.selectViewGJPContrByCode(userCenterContractObject2);
        if (userCenterContractObjectList.size() == 0) {
            map.put("results", 0);
        } else {
            // 查询物业
            PropertyInfo userCenterPropertyInfo = new PropertyInfo();
            userCenterPropertyInfo.setPropertyInfo_Id(userCenterContractObjectList.get(0).getPropertyInfo_Id());
            userCenterPropertyInfo = userCenterPropertyInfoService.queryPropertyInfoID(userCenterPropertyInfo);
            if (userCenterPropertyInfo != null) {
                userCenterContractObjectList.get(0).setPropertyInfo_address(userCenterPropertyInfo.getPropertyInfo_address());
            }
            map.put("results", userCenterContractObjectList);
        }
        return map;
    }

    /**
     * 查询离职人员房屋
     *
     * @return
     */
    @RequestMapping("/queryHousePosition")
    @ResponseBody
    public Map<String, Object> queryHousePosition(String house_address) {
        Map<String, Object> map = new HashMap<>();
        PositionRecordVo positionRecordVo = new PositionRecordVo();
        positionRecordVo.setHouse_address(house_address);
        positionRecordVo.setEm_name_new(house_address);
        List<PositionRecordVo> emState = houseLibraryService.selectEMstate(positionRecordVo);
        map.put("emState", emState);
        return map;
    }

    /**
     * 查询全部部门信息
     *
     * @param ucc_pid
     * @return
     */
    @RequestMapping("/queryPositionList")
    @ResponseBody
    public String queryPositionList(Integer ucc_pid) {
        Msg<List<Company>> msg = new Msg<List<Company>>();
        Company company = new Company();
        company.setUcc_pid(ucc_pid);
        List<Company> companyList = authorizationService.queryCompanyList(company);
        msg.setData(companyList);
        return msg.toString();
    }

    /**
     * 查询部门信息
     *
     * @return
     */
    @RequestMapping("/updatePosition")
    @ResponseBody
    public String updatePosition(PositionRecordVo positionRecordVo) {
        Msg<Object> msg = new Msg<>();
        if (positionRecordVo == null) {
            msg.setCode(110);
            msg.setMsg("参数错误");
            return msg.toString();
        }
        boolean boo = false;
        if (StringUtils.isEmpty(positionRecordVo.getHpr_id())) {
            boo = houseLibraryService.addHousePositionRecord(positionRecordVo);
        } else {
            boo = houseLibraryService.updateHousePositionRecord(positionRecordVo);
            houseLibraryService.changeUccInfo(positionRecordVo.getHi_code(), positionRecordVo.getUcc_id());
        }

        if (!boo) {
            msg.setCode(110);
            msg.setMsg("操作失败");
            return msg.toString();
        }
        return msg.toString();
    }

    /**
     * ajax查询托管合同根据合同编号
     *
     * @param request
     * @param response
     * @return
     * @throws IOException
     */
    @RequestMapping("/selTrusteeshipByCode")
    @ResponseBody
    public Map<String, Object> selTrusteeshipByCode(HttpServletRequest request, HttpServletResponse response, String code, String types) {
        Map<String, Object> map = new HashMap<>();
        ContractObjectVo userCenterContractObject2 = new ContractObjectVo();
        userCenterContractObject2.setContractObject_No(code);
        userCenterContractObject2.setContractObject_Type(types);

        // 根据合同编号查询合同房屋信息
        ViewGJPContrByCode viewGJPContrByCode = contractObjectService.selTrusteeshipByCode(userCenterContractObject2);
        if (viewGJPContrByCode == null) {
            map.put("results", 0);
        } else {
            PropertyInfo userCenterPropertyInfo = new PropertyInfo();
            userCenterPropertyInfo.setPropertyInfo_Id(viewGJPContrByCode.getPropertyInfo_Id());
            userCenterPropertyInfo = userCenterPropertyInfoService.queryPropertyInfoID(userCenterPropertyInfo);
            viewGJPContrByCode.setPropertyInfo_address(userCenterPropertyInfo.getPropertyInfo_address());
            map.put("results", viewGJPContrByCode);
        }
        return map;
    }

    /**
     * ajax添加公寓
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/addApartment")
    public String addApartment(HouseHouseExtended houseHouseExtended, Model model, HttpServletRequest request, HttpServletResponse response, String propertyInfo_Id, String hi_version, String buyTime, String conhouseno, String hi_address) {
        if (!"".equals(buyTime)) {
            houseHouseExtended.setHe_buyTime(DataUtil.StrToDate(buyTime));
        }
        if (houseHouseExtended.getHe_state() == null) {
            houseHouseExtended.setHe_state("free");
        }
        houseHouseExtended.setHe_time(new Date());
        houseHouseExtended.setHe_id(null);
        // 根据物业查询公寓基本信息
        PropertyInfo userCenterPropertyInfo = new PropertyInfo();
        userCenterPropertyInfo.setPropertyInfo_Id(Integer.parseInt(propertyInfo_Id));
        HouseInfoKeep houseInfoKeep = houseLibraryService.selectApartmentByPro(userCenterPropertyInfo);
        houseExtendedService.addHouseExtended(houseHouseExtended);
        Integer isd = houseHouseExtended.getHe_id();
        houseInfoKeep.setHe_id(isd);
        houseInfoKeep.setHi_peopleName(houseHouseExtended.getHe_peopleName());
        // 从cookie中获取当前登陆人员
        UserCenterEmployee userCenterEmployees = AppUtil.getCookieEmployee();
        houseInfoKeep.setHi_releaseId(userCenterEmployees.getEm_id());
        houseInfoKeep.setPu_id(userCenterEmployees.getEm_id());
        houseInfoKeep.setHi_number(null);
        houseInfoKeep.setHi_address(hi_address);
        String[] louc = hi_address.split("-");
        int size = louc.length;
        houseInfoKeep.setHi_floor(Integer.parseInt(louc[size - 2]));
        houseInfoKeep.setHi_version(hi_version);
        String hi_code = this.getTheFirstLetter(houseInfoKeep);
        // //查询固定品牌编码
        // String codeString = houseHouseBrandService.selectType(hi_version);
        // // 设置房屋代码 标识房屋唯一性的编码，非主键
        // houseInfoKeep.setHi_code(codeString);
        // 设置房屋代码 标识房屋唯一性的编码，非主键
        houseInfoKeep.setHi_code(hi_code);
        houseInfoKeep.setContract_outStatus("未签合同");
        houseInfoKeep.setContract_intoStatus("未签合同");
        // 查询房屋图片类型
        List<HouseIntentionImageType> image = houseImageTypeService.selectImage(houseInfoKeep.getHi_id());
        // 跟进类型查询房屋图片
        Map<Integer, HouseIntentionImage> houseIntentionImageList = new HashMap<>();
        for (HouseIntentionImageType houseIntentionImageType : image) {
            HouseIntentionImage houseIntentionImage = houseImageService.selectImageById(houseIntentionImageType.getHim_id());
            houseIntentionImageList.put(houseIntentionImageType.getHint_id(), houseIntentionImage);
        }

        // 插入品牌
        HouseInformationStateRelation houseInformationStateRelation = new HouseInformationStateRelation();
        houseInformationStateRelation.setHi_code(hi_code);
        houseInformationStateRelation.setHis_id(2);
        houseLibraryService.addHouseStateRelation(houseInformationStateRelation);
        HouseInformationStateRelation houseInformationStateRelation1 = new HouseInformationStateRelation();
        houseInformationStateRelation.setHi_code(hi_code);
        houseInformationStateRelation.setHis_id(5);
        houseLibraryService.addHouseStateRelation(houseInformationStateRelation1);

        // 加入存房库
        housingAllocationService.addHouseHouseInformationKeep(houseInfoKeep);
        for (HouseIntentionImageType houseIntentionImageType : image) {
            // 添加房屋图片类型
            HouseIntentionImage houseIntentionImage = houseIntentionImageList.get(houseIntentionImageType.getHint_id());
            HouseIntentionImage houseIntentionImages = new HouseIntentionImage();
            houseIntentionImages.setHim_time(new Date());
            houseIntentionImages.setHim_name(houseIntentionImage.getHim_name());
            houseIntentionImages.setHim_path(houseIntentionImage.getHim_path());
            // 添加图片进GJP_House_Intention_Image表
            houseImageService.addHouseIntentionImage(houseIntentionImages);
            // 添加意向房源房屋图片类型
            HouseIntentionImageType houseIntentionImageTypes = new HouseIntentionImageType();
            houseIntentionImageTypes.setHint_type(houseIntentionImageType.getHint_type());
            houseIntentionImageTypes.setHi_id(houseInfoKeep.getHi_id());
            houseIntentionImageTypes.setHim_id(houseIntentionImages.getHim_id());
            houseIntentionImageTypes.setHint_str("库存");

            houseImageTypeService.addHouseIntentionImageType(houseIntentionImageTypes);
        }
        request.setAttribute("success", "success");
        return "/library/addApartment";
    }

    /**
     * ajax发布公寓前查询同类型公寓是否已发布
     *
     * @return
     * @throws IOException
     */
    @RequestMapping("/selectGy")
    @ResponseBody
    public String selectGy(String hi_code) {
        Msg<Object> msg = new Msg<>();
        // 查询房屋
        ViewHouseLibraryInfoVo houseLibraryInfoVo = new ViewHouseLibraryInfoVo();
        houseLibraryInfoVo.setHi_code(hi_code);
        houseLibraryInfoVo = houseLibraryService.queryHouseLibraryInfo(houseLibraryInfoVo);
        if (houseLibraryInfoVo == null) {
            return msg.toString(110, "没有找到该房源信息");
        }
        HouseHouseInformation houseInfo = housingAllocationService.selectHouseInfoByCode(houseLibraryInfoVo.getHi_code());
        // 公寓类型判断
        if (!StringUtils.isEmpty(houseLibraryInfoVo.getHi_version())) {
            // 查询同类型公寓是否已在线上房源库
            HouseInfoKeep houseInfoKeep = new HouseInfoKeep();
            houseInfoKeep.setPropertyInfo_Id(houseLibraryInfoVo.getPropertyInfo_Id());
            houseInfoKeep.setHi_version(houseLibraryInfoVo.getHi_version());
            HouseHouseInformation houseHouseInformation = housingAllocationService.selectGy(houseInfoKeep);
            if (houseHouseInformation != null) {
                return msg.toString(112, "该公寓类型房源已发布");
            }
        }

        HouseImageVo houseLibraryImageVo = new HouseImageVo();
        houseLibraryImageVo.setHi_code(houseLibraryInfoVo.getHi_code());
        List<HouseImageVo> houseLibraryImageVos = houseLibraryService.queryHouseImageList(houseLibraryImageVo);
        // 查询房屋图片类型
        int result = 0;
        for (HouseImageVo houseLibraryImageVo1 : houseLibraryImageVos) {
            if ("page".equals(houseLibraryImageVo1.getHm_type())) {
                result = 1;
            }
        }
        if (result == 0) {
            return msg.toString(111, "该房源没有封面图片，不能发布");
        }
        PropertyInfo propertyInfo = new PropertyInfo();
        propertyInfo.setPropertyInfo_Id(houseLibraryInfoVo.getPropertyInfo_Id());
        propertyInfo = userCenterPropertyInfoService.queryPropertyInfoID(propertyInfo);

        // 查询物业信息名称
        PropertyInfoName propertyInfoName = new PropertyInfoName();
        propertyInfoName.setUpn_id(propertyInfo.getUpn_id());
        propertyInfoName = userCenterPropertyInfoService.selectPropertyInfoNameByWhere(propertyInfoName);
        List<PropertyInfoSubwany> subwany = new ArrayList<>();
        if (propertyInfoName != null) {
            if (propertyInfoName.getUpn_sid() == 0) {
                // 查询小区物业周边
                PropertyInfoSubwany propertyInfoSubwany = new PropertyInfoSubwany();
                propertyInfoSubwany.setPropertyInfo_Id(propertyInfo.getPropertyInfo_Id());
                subwany = userCenterPropertyInfoService.selectPropertyInfoSubwany(propertyInfoSubwany);
            } else {
                // 查询小区物业
                PropertyInfo propertyInfo2 = new PropertyInfo();
                propertyInfo2.setUpn_id(propertyInfoName.getUpn_sid());
                propertyInfo2 = userCenterPropertyInfoService.queryPropertyInfoID(propertyInfo2);
                if (propertyInfo2 != null) {
                    // 查询小区物业周边
                    PropertyInfoSubwany propertyInfoSubwany = new PropertyInfoSubwany();
                    propertyInfoSubwany.setPropertyInfo_Id(propertyInfo2.getPropertyInfo_Id());
                    subwany = userCenterPropertyInfoService.selectPropertyInfoSubwany(propertyInfoSubwany);
                }
            }

        }
        HashMap<Object, Object> map = new HashMap<>();
        map.put("houseInfo", houseInfo);
        map.put("houseLibraryInfo", houseLibraryInfoVo);
        map.put("houseLibraryImageList", houseLibraryImageVos);
        map.put("propertyInfo", propertyInfo);
        map.put("propertySubwany", subwany);
        return msg.toString(map);
    }

    /**
     * 查询线上房源
     *
     * @param request
     * @param response
     * @param hi_code
     * @return
     * @author 王孝元
     */
    @RequestMapping("/queryOnlineHouse")
    @ResponseBody
    public Map<String, Object> queryOnlineHouse(HttpServletRequest request, HttpServletResponse response, String hi_code) {
        Map<String, Object> map = new HashMap<>();
        // 1.如果未发布，则查询库存房源基本信息
        // 2.如果已经发布，则查询线上房源库，修改房源
        HouseHouseInformation houseInfo = housingAllocationService.selectHouseInfoByCode(hi_code);
        // 查询合同信息
        ContractObjectVo contractObject = new ContractObjectVo();
        contractObject.setHi_code(hi_code);
        contractObject = contractObjectService.queryContractObject(contractObject);
        if (houseInfo != null) {
            // 查询房屋扩展信息
            HouseHouseExtended houseExtended = houseExtendedService.selectHouseExtendedById(houseInfo.getHe_id());
            // 查询房屋管家
            UserCenterEmployee employee = housingAllocationService.queryHouseWaiterInfo(hi_code);
            if (contractObject != null) {
                houseInfo.setContractObject_Id(contractObject.getContractObject_Id());
            }
            map.put("employee", employee);
            map.put("houseInfo", houseInfo);
            map.put("houseExtended", houseExtended);
        } else {
            // 查询库存房源
            HouseInfoKeep houseInfoKeep = houseLibraryService.selectHouseInfoByCode(hi_code);
            // 查询房屋扩展信息
            HouseHouseExtended houseExtended = houseExtendedService.selectHouseExtendedById(houseInfoKeep.getHe_id());
            // 查询房屋管家
            UserCenterEmployee employee = housingAllocationService.queryHouseWaiterInfo(hi_code);
            if (contractObject != null) {
                houseInfoKeep.setContractObject_Id(contractObject.getContractObject_Id());
            }
            map.put("employee", employee);
            map.put("houseInfo", houseInfoKeep);
            map.put("houseExtended", houseExtended);
        }
        // 查询线上房源图片
        HouseImageVo image = new HouseImageVo();
        image.setHi_code(hi_code);
        image.setHm_state(1);
        image.setHif_name(1);
        List<HouseImageVo> imageList = houseImageService.queryHouseImageList(image);
        for (HouseImageVo house : imageList) {
            house.setHm_path(OSSparameter.imagePath(house.getHm_path(), null, null));
        }
        map.put("imageList", imageList);

        //查询房源发布渠道
        HousePublishChannel housePublishChannel = new HousePublishChannel();
        housePublishChannel.setHpc_status(1);  //开启
        List<HousePublishChannel> housePublish = houseLibraryService.queryHousePublishChannel(housePublishChannel);
        map.put("housePublish", housePublish);
        //根据房屋code查询此房屋发布渠道
        HousePublish hpc = new HousePublish();
        hpc.setHi_code(hi_code);
        List<HousePublish> housePublisheList = houseLibraryService.housePublisheList(hpc);
        map.put("housePublisheList", housePublisheList);
        return map;
    }

    /**
     * ajax查询房屋图片
     *
     * @return
     * @throws IOException
     */
    @RequestMapping("/selectImg")
    @ResponseBody
    public Map<String, Object> selectImg(String hi_id) {
        Map<String, Object> map = new HashMap<>();
        // 查询房屋图片类型
        List<HouseIntentionImageType> image = houseImageTypeService.selectImage(Integer.parseInt(hi_id));
        // 跟进类型查询房屋图片
        List<HouseIntentionImage> houseIntentionImageList = new ArrayList<>();
        for (HouseIntentionImageType houseIntentionImageType : image) {
            HouseIntentionImage houseIntentionImage = houseImageService.selectImageById(houseIntentionImageType.getHim_id());
            if (houseIntentionImage != null) {
                houseIntentionImage.setTy(houseIntentionImageType.getHint_type());
                houseIntentionImageList.add(houseIntentionImage);
            }
        }
        map.put("houseIntentionImageList", houseIntentionImageList);
        return map;
    }

    /**
     * ajax添加公寓前查询重复
     *
     * @param request
     * @param response
     * @return
     * @throws IOException
     */
    @RequestMapping("/selectHouseNum")
    @ResponseBody
    public Map<String, Object> selectHouseNum(HttpServletRequest request, HttpServletResponse response, String hi_address, String propertyInfo_Id) {
        Map<String, Object> map = new HashMap<>();
        // 根据房屋房号查询房屋
        HouseInfoKeep houseInfoKeeps = new HouseInfoKeep();
        houseInfoKeeps.setHi_address(hi_address);
        houseInfoKeeps.setPropertyInfo_Id(Integer.parseInt(propertyInfo_Id));
        HouseInfoKeep houseInfoKeep = houseLibraryService.selectHouseNum(houseInfoKeeps);
        int result = 0;
        if (houseInfoKeep == null) {
            result = 1;
        }
        map.put("result", result);
        return map;
    }

    /**
     * 更新房屋物业信息
     *
     * @param propertyInfo_Id
     * @param hi_code
     * @return
     * @作者 JiangQT
     * @日期 2016年7月19日
     */
    @RequestMapping("/updateHousePropertyInfo")
    @ResponseBody
    public String updateHousePropertyInfo(Integer propertyInfo_Id, String hi_code, String hi_address) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(hi_code) || StringUtils.isEmpty(propertyInfo_Id) || StringUtils.isEmpty(hi_address)) {
            return msg.toString(110, Msg.MSG_PARAM_ERROR);
        }
        HouseInfoKeep informationKeep = new HouseInfoKeep();
        informationKeep.setHi_code(hi_code);
        informationKeep.setPropertyInfo_Id(propertyInfo_Id);
        informationKeep.setHi_address(hi_address);
        boolean boo = houseLibraryService.updateHouseContractState(informationKeep);
        if (!boo) {
            return msg.toString(110, "更新失败，请重试");
        }
        ViewHouseLibraryInfoVo libraryInfoVo = houseLibraryService.queryHouseLibraryInfo(hi_code);
        return msg.toString(libraryInfoVo);
    }

    /* ==========【房源成交】========== */

    /**
     * 跳转房源成交
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年6月15日
     */
    @RequestMapping("/jumpHouseDeal")
    public ModelAndView jumpHouseDeal() {
        ModelAndView view = new ModelAndView("/library/houseInfoDeal");
        ViewEmployeePositionCompanyVo employeePositionCompanyVo = new ViewEmployeePositionCompanyVo();
        employeePositionCompanyVo.setEm_id(AppUtil.getCookieEmployee().getEm_id());
        employeePositionCompanyVo = employeeService.selectEmployeePositionCompanyWhere(employeePositionCompanyVo);
        view.addObject("employeePosCom", employeePositionCompanyVo);
        if (employeePositionCompanyVo != null) {
            if ("销售经理".equals(employeePositionCompanyVo.getUcr_name())) {
                view.addObject("mode", "all");
            } else if ("销售主管".equals(employeePositionCompanyVo.getUcr_name()) || "销售副主管".equals(employeePositionCompanyVo.getUcr_name())) {
                view.addObject("mode", "department");
            } else if ("托管顾问".equals(employeePositionCompanyVo.getUcr_name())) {
                view.addObject("mode", "personal");
            } else {
                view.addObject("mode", "all");
            }
        } else {
            view.addObject("mode", "all");
        }
        return view;
    }

    /**
     * 查询列表--房源成交数据
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年6月15日
     */
    @RequestMapping("/queryHouseDealList")
    @ResponseBody
    public Map<String, Object> queryHouseDealList(String emp_type, String contract_type, TableList tableList) {
        Msg<Object> msg = new Msg<>();

        Integer pageSize = Integer.valueOf(AppUtil.getCookie("pageSize"));
        Integer pageNo = tableList.getPageNo();
        tableList.initData();

        // ViewEmployeePositionCompanyVo employeePositionCompanyVo = new
        // ViewEmployeePositionCompanyVo();
        // employeePositionCompanyVo.setEm_id(AppUtil.getCookieEmployee(request).getEm_id());
        // employeePositionCompanyVo =
        // employeeService.selectEmployeePositionCompanyWhere(employeePositionCompanyVo);
        // if (employeePositionCompanyVo == null) {
        // return msg.toString(110, Msg.MSG_LOGIN_ERROR);
        // }
        // ViewHouseDealListVo t = new ViewHouseDealListVo();
        // switch (emp_type) {
        // case "total":
        // t.setContractObject_Type(contract_type);
        // break;
        // case "department":
        // t.setContractObject_Type(contract_type);
        // t.setUcc_id(employeePositionCompanyVo.getUcc_id());
        // break;
        // case "oneself":
        // t.setContractObject_Type(contract_type);
        // t.setEm_id(employeePositionCompanyVo.getEm_id());
        // break;
        // default:
        // break;
        // }
        // t.setWhereVo(whereVo);
        Pagination<ViewHouseDealListVo> pagination = houseLibraryService.queryHouseDealAllPageList(new Pagination<>(pageNo, pageSize, tableList));
        return msg.toMap(pagination);
    }

    /**
     * APP查询列表--房源成交数据
     *
     * @param pageNo
     * @param pageSize
     * @param em_account    人员账号
     * @param emp_type      人员模式：total(全部)、department(部门)、oneself（自己）
     * @param contract_type 合同类型
     * @param whereVo       数据查询对象
     * @param response
     * @return
     * @作者 JiangQT
     * @日期 2016年7月4日
     */
    @RequestMapping("/appQueryHouseDealList")
    @ResponseBody
    public String appQueryHouseDealList(Integer pageNo, Integer pageSize, String em_account, String emp_type, String contract_type, SqlWhereVo whereVo, HttpServletResponse response) {
        // 跨域传输
        response.addHeader("Access-Control-Allow-Origin", "*");

        Msg<Object> msg = new Msg<>();
        ViewEmployeePositionCompanyVo employeePositionCompanyVo = new ViewEmployeePositionCompanyVo();
        employeePositionCompanyVo.setEm_account(em_account);
        employeePositionCompanyVo = employeeService.selectEmployeePositionCompanyWhere(employeePositionCompanyVo);
        if (employeePositionCompanyVo == null) {
            return msg.toString(110, Msg.MSG_LOGIN_ERROR);
        }
        ViewHouseDealListVo t = new ViewHouseDealListVo();
        switch (emp_type) {
            case "total":
                t.setContractObject_Type(contract_type);
                break;
            case "department":
                t.setContractObject_Type(contract_type);
                // t.setUcc_id(employeePositionCompanyVo.getUcc_id());
                break;
            case "oneself":
                t.setContractObject_Type(contract_type);
                t.setEm_id(employeePositionCompanyVo.getEm_id());
                break;
            default:
                break;
        }

        List<String> sqlWhereList = new ArrayList<String>();
        if (!StringUtils.isEmpty(whereVo.getWhere())) {
            String[] split = whereVo.getWhere().split(",");
            for (String aSplit : split) {
                if (aSplit.split("::").length == 1) {
                    continue;
                }
                String[] split2 = aSplit.split("::");

                String where;
                if (AppUtil.isValid(split2[1])) {
                    String strWhere;
                    switch (split2[1]) {
                        case "未租":
                            strWhere = "free";
                            break;
                        case "已租":
                            strWhere = "rental";
                            break;
                        default:
                            strWhere = split2[1];
                            break;
                    }
                    where = "\'%" + strWhere + "%\'";
                } else {
                    where = "";
                }
                if (!StringUtils.isEmpty(where)) {
                    Boolean bool = true;
                    String[] split3 = split2[0].split("-");
                    for (int j = 0; j < sqlWhereList.size(); j++) {
                        String str1;
                        if (sqlWhereList.get(j).contains(split3[0])) {
                            str1 = sqlWhereList.get(j).substring(0, sqlWhereList.get(j).length() - 1);
                            StringBuilder str2 = new StringBuilder();
                            for (String aSplit3 : split3) {
                                str2.append(" or ").append(aSplit3).append(" like ").append(where).append("");
                            }
                            str1 += str2 + ")";
                            sqlWhereList.set(j, str1);
                            bool = false;
                            break;
                        }
                    }
                    if (bool) {
                        if (split3.length > 1) {
                            StringBuilder str1 = new StringBuilder(" and ( ");
                            for (int k = 0; k < split3.length; k++) {
                                if (k == 0) {
                                    str1.append("").append(split3[k]).append(" like ").append(where).append("");
                                } else {
                                    str1.append(" or ").append(split3[k]).append(" like ").append(where).append("");
                                }
                            }
                            sqlWhereList.add(str1 + ")");
                        } else {
                            sqlWhereList.add(" and (" + split2[0] + " like " + where + ")");
                        }
                    }
                }
            }
        }
        StringBuilder where = new StringBuilder();
        for (String str1 : sqlWhereList) {
            where.append(str1);
        }
        whereVo.setWhere(where.toString());

        // t.setWhereVo(whereVo);
        Pagination<ViewHouseDealListVo> pagination = new Pagination<ViewHouseDealListVo>(pageNo, pageSize, t);
        // List<ViewHouseDealListVo> viewHouseDealListVos =
        // housingLibraryService.queryHouseDealAllPageList(pagination);
        // int totalRecords =
        // housingLibraryService.queryHouseDealPageRecords(pagination);

        // pagination.setList(viewHouseDealListVos, totalRecords);
        return msg.toString(pagination);
    }

    /**
     * APP首页--查询列表--存房成交/出房成交/业绩 排名
     *
     * @param response
     * @param rankType   排名类型
     * @param em_account
     * @return
     * @作者 JiangQT
     * @日期 2016年7月7日
     */
    @RequestMapping(value = "/appQueryRankingList", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String appQueryRankingList(HttpServletResponse response, String rankType, String em_account) {
        response.addHeader("Access-Control-Allow-Origin", "*"); // 跨域传输
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(rankType)) {
            return msg.toString(110, Msg.MSG_PARAM_ERROR);
        }
        // ViewEmployeePositionCompanyVo employeePositionCompanyVo = new
        // ViewEmployeePositionCompanyVo();
        // employeePositionCompanyVo.setEm_account(em_account);
        // employeePositionCompanyVo =
        // employeeService.selectEmployeePositionCompanyWhere(employeePositionCompanyVo);
        // if (employeePositionCompanyVo == null) {
        // return msg.toString(110, Msg.MSG_LOGIN_ERROR);
        // }
        ViewHouseRankingVo rankingVo = new ViewHouseRankingVo();
        switch (rankType) {
            case "houseIn": // 存房
                rankingVo.setContractObject_Type(AppConfig.TYPE_CONTRACT_201);
                break;
            case "houseOut": // 出房
                rankingVo.setContractObject_Type(AppConfig.TYPE_CONTRACT_202);
                break;
            case "houseAchi": // 业绩
                break;
        }
        rankingVo.setRanking_type(rankType);
        List<ViewHouseRankingVo> houseRankings = houseLibraryService.queryHouseRankingList(rankingVo);
        return msg.toString(houseRankings);
    }

    /* ==========【房源分配】========== */

    /**
     * 房源分配--跳转房源分配页面
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年8月25日
     */
    @RequestMapping("/jumpHouseAllot")
    public ModelAndView jumpHouseAllot() {
        return new ModelAndView("/library/houseAllot");
    }

    /**
     * 查询分配房源列表
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年8月25日
     */
    @RequestMapping("/queryHouseAllotList")
    @ResponseBody
    public Map<String, Object> queryHouseAllotList(TableList tableList) {
        Msg<Object> msg = new Msg<>();

        Integer pageSize = Integer.valueOf(AppUtil.getCookie("pageSize"));
        Integer pageNo = tableList.getPageNo();
        tableList.initData();

        Pagination<ViewHouseAllotVo> pagination = houseLibraryService.queryHouseAllotPageList(new Pagination<>(pageNo, pageSize, tableList));
        return msg.toMap(pagination);
    }

    /* ==========【合同执行记录手动添加】========== */

    /**
     * 查询合同执行记录List
     *
     * @return
     */
    @RequestMapping("/selectContractImplementRecordList")
    @ResponseBody
    public Map<String, Object> selectContractImplementRecordList(ContractImplRecordVo contractImplRecordVo, PageModel<ContractImplRecordVo> pageModel) {
        Map<String, Object> map = new HashMap<>();
        if (contractImplRecordVo.getContractObject_code().equals("null")) {
            contractImplRecordVo.setContractObject_code(null);
        }
        // 查询该房屋有效合同（租赁/托管）
        ContractObjectVo userCenterContractObject = new ContractObjectVo();
        userCenterContractObject.setHi_code(contractImplRecordVo.getHi_code());
        List<ContractObjectVo> conObjListAll = contractObjectService.selectContractObjectState(userCenterContractObject);
        map.put("oListAll", conObjListAll);
        userCenterContractObject.setContractObject_State(2);// 2：生效
        List<ContractObjectVo> conObjList = contractObjectService.selectContractObjectState(userCenterContractObject);
        map.put("oList", conObjList);

        // 查询该房屋执行记录
        if (pageModel == null) {
            pageModel = new PageModel<ContractImplRecordVo>();
        }
        if (pageModel.getPageNo() == 0) {
            pageModel.setPageNo(1);
        }
        contractImplRecordVo.setStart((pageModel.getPageNo() - 1) * pageModel.getPageSize());
        contractImplRecordVo.setEnd(pageModel.getPageSize());
        List<ContractImplRecordVo> impList = contractObjectService.selectContractImplRecordList(contractImplRecordVo);
        Integer count = contractObjectService.selectContractImplRecordListCount(contractImplRecordVo);
        pageModel.setTotalRecords(count);

        ContractAttachment attm = new ContractAttachment();// 实例化执行记录附件
        for (ContractImplRecordVo impre : impList) {
            attm.setCir_id(impre.getCir_id());
            impre.setAttList(contractAttachmentService.selectContractAttachmentList(attm));
        }
        map.put("impList", impList);
        map.put("pageModel", pageModel);

        return map;

    }

    @RequestMapping("/addContractAttachment")
    @ResponseBody
    public Map<String, Object> addContractAttachment(MultipartHttpServletRequest request, ContractAttachment contractAttachment, Object object, MultipartFile fileList) throws Exception {
        Map<String, Object> map = new HashMap<>();
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(contractAttachment.getCa_name())) {
            msg.setCode(110);
            msg.setMsg(Msg.MSG_PARAM_ERROR);
            // return msg.toString();
            map.put("message", "file_null");
            return map;
        }
        List<MultipartFile> files = request.getFiles("fileList");
        String realPath = request.getSession().getServletContext().getRealPath("/resources/contractImage/");
        // 创建文件夹
        File upFile = new File(realPath);
        if (!upFile.exists()) {
            upFile.mkdirs();
        }
        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            // 获取图片名称
            String imageName = AppUtil.getImageName("", file);
            File outFile = new File(realPath + imageName);
            if (!contractAttachment.getCa_type().equals("") && (contractAttachment.getCa_type().equals("png") || contractAttachment.getCa_type().equals("jpg") || contractAttachment.getCa_type().equals("jpeg") || contractAttachment.getCa_type().equals("gif"))) {
                // 将文件压缩
                if (file.getSize() <= 1000 * 400) {// 文件小于等于400KB
                    file.transferTo(outFile);// 将文件file写入到文件夹outFile
                } else {
                    CommonsMultipartFile cf = (CommonsMultipartFile) file;
                    DiskFileItem fi = (DiskFileItem) cf.getFileItem();
                    File inFile = fi.getStoreLocation();
                    ImageUtil.saveMinPhoto(inFile.toString(), outFile.toString(), 1920, 0.9d);
                }
            } else {
                file.transferTo(outFile);// 将文件file写入到文件夹outFile
            }
            // FTP文件上传，并返回图片路径
            String imgUrl = FtpUtil.getInstance("contract").upload(imageName, new FileInputStream(outFile));

            contractAttachment.setCa_addTime(new Date());
            contractAttachment.setCa_path(imgUrl);
            contractAttachment.setCa_state(1);
            Integer count = contractAttachmentService.addContractAttachment(contractAttachment);
            if (count > 0) {
                map.put("message", "success");
                map.put("ca_id", contractAttachment.getCa_id());
                map.put("imgSrc", imgUrl);
            } else {
                map.put("message", "error");
            }

        }

        return map;

    }

    /* ======== 【合同执行记录手动添加end】 ======= */

    /**
     * 访问销售部门房源页面
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/houseAllotDepartment")
    public ModelAndView houseAllotDepartment() {
        return new ModelAndView("/library/houseAllotDepartment");
    }

    /**
     * 查询销售部门
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/querySaleDepartment")
    @ResponseBody
    public Map<String, Object> querySaleDepartment() {

        Map<String, Object> map = new HashMap<>();
        List<Company> saleCompanyList = employeeService.selectSaleCompany();
        map.put("saleCompanyList", saleCompanyList);

        return map;
    }

    /**
     * 查询销售部门
     *
     * @return
     * @throws Exception
     * @author 陈智颖
     */
    @RequestMapping("/querySaleDepartmentHouse")
    @ResponseBody
    public Map<String, Object> querySaleDepartment(TableList tableList1) throws Exception {

        // 初始化获取对象
        TableList tableList = tableList1.initData(tableList1);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

        HouseModel houseModel = new HouseModel();
        if (tableList.getDateStart() != null && !tableList.getDateStart().equals("")) {
            houseModel.setDateStart(sf.parse(tableList.getDateStart()));
        }
        if (tableList.getDateEnd() != null && !tableList.getDateEnd().equals("")) {
            houseModel.setDateEnd(sf.parse(tableList.getDateEnd()));
        }
        houseModel.setSqlWhere(tableList.getSqlWhere());

        houseModel.setDateTitle(tableList.getDateType());

        // 查询部门编码
        UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();
        Company company = new Company();
        company.setEm_id(cookieEmployee.getEm_id());
        List<Company> selectCompanyEmid = authorizationService.selectCompanyEmid(company);
        houseModel.setUcc_id(selectCompanyEmid.get(0).getUcc_id());

        if (tableList.getOrderBy() != null && !tableList.getOrderBy().equals("")) {
            houseModel.setSqlOrderBy("order by " + tableList.getOrderBy() + " asc");
        } else {
            houseModel.setSqlOrderBy("");
        }
        // 装载数据类
        DataList<HouseInfoKeep> datalist = new DataList<HouseInfoKeep>();
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        // 查询分页实体
        PageModel<HouseInfoKeep> pageModel = houseLibraryService.selectHouseHouseInformationSale(tableList.getPageNo(), pageSize, houseModel);
        // 处理特殊数据
        List<HouseInfoKeep> list = new ArrayList<HouseInfoKeep>();
        for (HouseInfoKeep houseInfoKeep : pageModel.getList()) {
            houseInfoKeep.setHi_money(houseInfoKeep.getHi_price());
            houseInfoKeep.setHe_phone("/" + houseInfoKeep.getHe_phone());
            houseInfoKeep.setEm_phone("/" + houseInfoKeep.getEm_phone());
            list.add(houseInfoKeep);
        }
        // 装载数据
        Map<String, Object> map = datalist.dataList(list, tableList.getPageNo(), pageSize, pageModel.getTotalRecords(), pageModel.getSumMoney());

        return map;
    }

    @RequestMapping("/houseSaveGuaranteeCost")
    @ResponseBody
    public Map<String, Object> houseSaveGuaranteeCost(HttpServletRequest request) {

        Map<String, Object> map = new HashMap<>();

        HouseInfoKeep houseInfoKeep = new HouseInfoKeep();
        houseInfoKeep.setStart("2016-01-01");
        houseInfoKeep.setEnd("2016-08-01");
        List<HouseInfoKeep> selectHouseGuaranteeCost = houseLibraryService.selectHouseGuaranteeCost(houseInfoKeep);
        // 第一步，创建一个webbook，对应一个Excel文件
        HSSFWorkbook wb = new HSSFWorkbook();
        // 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet
        HSSFSheet sheet = wb.createSheet("数据统计");
        // 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short
        HSSFRow row = sheet.createRow((int) 0);
        // 第四步，创建单元格，并设置值表头 设置表头居中
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式

        HSSFCell cell = row.createCell(0);
        cell.setCellValue("房屋地址");
        cell.setCellStyle(style);
        cell = row.createCell(1);
        cell.setCellValue("包修费");
        cell.setCellStyle(style);
        cell = row.createCell(2);
        cell.setCellValue("时间");
        cell.setCellStyle(style);
        int i = 1;
        for (HouseInfoKeep houseInfoKeep2 : selectHouseGuaranteeCost) {
            row = sheet.createRow((int) i);
            // 第四步，创建单元格，并设置值
            row.createCell(0).setCellValue(houseInfoKeep2.getHouse_address());
            row.createCell(1).setCellValue(houseInfoKeep2.getContractBody_GuaranteeCost());
            row.createCell(2).setCellValue(houseInfoKeep2.getContractObject_Date());
            i++;
        }

        // 第六步，将文件存到指定位置
        try {
            String fileName = (new Date()).getTime() + ".xls";
            String path = request.getSession().getServletContext().getRealPath("/");
            path += "/resources/excel";
            File file = new File(path);
            if (!file.exists()) {
                file.mkdir();
            }
            path += "/" + fileName;
            FileOutputStream fout = new FileOutputStream(path);
            wb.write(fout);
            fout.close();
            map.put("path", path);
            return map;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return map;
    }

    /**
     * 房源分配导出excel
     *
     * @param request
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/HouseAscription")
    @ResponseBody
    public Map<String, Object> HouseAscription(HttpServletRequest request) {

        Map<String, Object> map = new HashMap<>();

        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        List<HouseInfoKeep> houseAscriptions = new ArrayList<HouseInfoKeep>();
        List<HouseInfoKeep> selectHouseAscription = houseLibraryService.selectHouseAscription();
        for (HouseInfoKeep houseInfoKeep : selectHouseAscription) {
            houseInfoKeep.setContractObject_Type("租赁合同");
            HouseInfoKeep zHouseAscriptionContract = houseLibraryService.selectHouseAscriptionContract(houseInfoKeep);
            houseInfoKeep.setContractObject_Type("托管合同");
            HouseInfoKeep tHouseAscriptionContract = houseLibraryService.selectHouseAscriptionContract(houseInfoKeep);
            if (zHouseAscriptionContract != null) {
                houseInfoKeep.setZDeadlineTime(sf.format(zHouseAscriptionContract.getContractObject_DeadlineTime()));
            }
            if (tHouseAscriptionContract != null) {
                houseInfoKeep.setTDeadlineTime(sf.format(tHouseAscriptionContract.getContractObject_DeadlineTime()));
            }
            houseAscriptions.add(houseInfoKeep);
        }
        // 第一步，创建一个webbook，对应一个Excel文件
        HSSFWorkbook wb = new HSSFWorkbook();
        // 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet
        HSSFSheet sheet = wb.createSheet("数据统计");
        // 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short
        HSSFRow row = sheet.createRow((int) 0);
        // 第四步，创建单元格，并设置值表头 设置表头居中
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式

        HSSFCell cell = row.createCell(0);
        cell.setCellValue("房屋地址");
        cell.setCellStyle(style);
        cell = row.createCell(1);
        cell.setCellValue("所属管家");
        cell.setCellStyle(style);
        cell = row.createCell(2);
        cell.setCellValue("所属部门");
        cell.setCellStyle(style);
        cell = row.createCell(3);
        cell.setCellValue("租赁到期时间");
        cell.setCellStyle(style);
        cell = row.createCell(4);
        cell.setCellValue("托管到期时间");
        cell.setCellStyle(style);
        cell = row.createCell(5);
        cell.setCellValue("房源分配情况");
        cell.setCellStyle(style);
        int i = 1;
        for (HouseInfoKeep houseInfoKeep2 : houseAscriptions) {
            row = sheet.createRow((int) i);
            // 第四步，创建单元格，并设置值
            row.createCell(0).setCellValue(houseInfoKeep2.getHouse_address());
            row.createCell(1).setCellValue(houseInfoKeep2.getEm_name() == null ? "" : houseInfoKeep2.getEm_name());
            row.createCell(2).setCellValue(houseInfoKeep2.getUcc_name() == null ? "" : houseInfoKeep2.getUcc_name());
            row.createCell(3).setCellValue(houseInfoKeep2.getZDeadlineTime());
            row.createCell(4).setCellValue(houseInfoKeep2.getTDeadlineTime());
            if (houseInfoKeep2.getEm_state() != null) {
                if (houseInfoKeep2.getEm_state() == 1) {
                    row.createCell(5).setCellValue("已分配");
                } else {
                    row.createCell(5).setCellValue("未分配");
                }
            } else {
                row.createCell(5).setCellValue("未分配");
            }
            i++;
        }

        // 第六步，将文件存到指定位置
        try {
            String fileName = (new Date()).getTime() + ".xls";
            String path = request.getSession().getServletContext().getRealPath("/");
            path += "/resources/excel";
            File file = new File(path);
            if (!file.exists()) {
                file.mkdir();
            }
            path += "/" + fileName;
            FileOutputStream fout = new FileOutputStream(path);
            wb.write(fout);
            fout.close();
            map.put("path", path);
            return map;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return map;
    }

    /**
     * 计算库存房源的空置期
     *
     * @throws Exception
     * @author 陈智颖
     */
    @Scheduled(cron = "0 0 1 * * ?")
    public void houseVacancy() {

        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

            String newDate = sdf.format(new Date());
            String startTime = "";
            // 查询招租房源
            HouseInfoKeep houseInfoKeeps = new HouseInfoKeep();
            List<HouseInfoKeep> houseForRent = houseLibraryService.selectHouseForRentList(houseInfoKeeps);
            if (!houseForRent.isEmpty()) {
                for (HouseInfoKeep houseInfoKeep : houseForRent) {
                    /* if(houseInfoKeep.getHi_code().equals("CQN14710540118072620")){
                        System.out.println(houseInfoKeep.getHi_code());
                     }else{
                        continue;
                     }*/
                    houseInfoKeep.setHi_code("CQN1452059952384574");
                    String boolStr = "空置期";
                    ContractObjectVo userCenterContractObject1 = new ContractObjectVo();
                    userCenterContractObject1.setContractObject_Type("租赁合同");
                    userCenterContractObject1.setHi_code(houseInfoKeep.getHi_code());
                    ContractObjectVo zContractNo = contractObjectService.selectContractObjectByHICode(userCenterContractObject1);
                    if (zContractNo != null && zContractNo.getContractObject_State().equals(1)) {
                        ContractObjectVo centerContractObject = new ContractObjectVo();
                        centerContractObject.setContractObject_Id(zContractNo.getContractObject_Successor());
                        centerContractObject.setContractObject_Type("租赁合同");
                        centerContractObject.setHi_code(houseInfoKeep.getHi_code());
                        zContractNo = contractObjectService.selectContractObjectByHICode(centerContractObject);
                    }

                    ContractObjectVo userCenterContractObject2 = new ContractObjectVo();
                    userCenterContractObject2.setContractObject_Type("托管合同");
                    userCenterContractObject2.setHi_code(houseInfoKeep.getHi_code());
                    ContractObjectVo tContractNo = contractObjectService.selectContractObjectByHICode(userCenterContractObject2);

                    int _state = 0;
                    if (zContractNo != null) {
                        _state = zContractNo.getContractObject_OptionState();
                    }
                    if (AppUtil.isOkState(_state, "退租") || AppUtil.isOkState(_state, "转租") || AppUtil.isOkState(_state, "强收") || AppUtil.isOkState(_state, "换房")) {
                        ViewContractStatement viewContractStatement = new ViewContractStatement();
                        viewContractStatement.setCco_state("取消");
                        viewContractStatement.setContractObject_Code(zContractNo.getContractObject_Code());
                        ViewContractStatement contractNoShutTime = achievementCompanyService.selectContractNoShutTime(viewContractStatement).get(0);

                        startTime = sdf.format(contractNoShutTime.getCco_handleDate());
                        boolStr = "招租期";
                    } else if (AppUtil.isOkState(_state, "到期")) {
                        startTime = sdf.format(zContractNo.getContractObject_DeadlineTime());
                    } else {
                        if (tContractNo != null) {
                            startTime = sdf.format(tContractNo.getContractObject_Date());
                        } else {
                            continue;
                        }
                    }

                    // 判断招租期 时间7天：给当事人和主管进行消息提箱，大于等于15天：给王经理和冯总进行消息提醒。
                    int day = AppUtil.getDay2(startTime, newDate);

                    if (day >= 7 && day < 15) {
                        UserCenterTaskMessage userCenterTaskMessage = new UserCenterTaskMessage();
                        userCenterTaskMessage.setTm_http("/houseLibrary/jumpHouseInfo?hi_code=" + houseInfoKeep.getHi_code());
                        List<UserCenterTaskMessage> selectTaskMessageUserHttp = userCenterTaskMessageService.selectTaskMessageUserHttp(userCenterTaskMessage);
                        HouseInfoKeep houseAscriptions = houseLibraryService.selectHouseAscriptions(houseInfoKeep);
                        String personID = "";
                        if (houseAscriptions != null) {
                            personID = houseAscriptions.getHpr_newEmp() + "," + houseAscriptions.getEm_id();
                        }
                        if (selectTaskMessageUserHttp.isEmpty()) {
                            userCenterTaskMessageService.insertTaskMessage(houseInfoKeep.getHouse_address() + " 房屋" + boolStr + day + "天，请尽快处理", "紧急", "重要", newDate + " 09:40", AppUtil.getWeekOfDate(sdf.parse(newDate)), newDate + " 09:40", AppUtil.getWeekOfDate(sdf.parse(newDate)), null, personID, "/houseLibrary/jumpHouseInfo?hi_code=" + houseInfoKeep.getHi_code(), 1, true, null);
                        } else {
                            String text = houseInfoKeep.getHouse_address() + " 房屋" + boolStr + day + "天，请尽快处理";
                            userCenterTaskMessage.setTm_id(selectTaskMessageUserHttp.get(0).getTm_id());
                            userCenterTaskMessage.setTm_text(text);
                            userCenterTaskMessageService.updatetTaskMessageText(userCenterTaskMessage);
                        }
                    } else if (day >= 15) {
                        UserCenterTaskMessage userCenterTaskMessage = new UserCenterTaskMessage();
                        userCenterTaskMessage.setTm_http("/houseLibrary/jumpHouseInfo?hi_code=" + houseInfoKeep.getHi_code());
                        List<UserCenterTaskMessage> selectTaskMessageUserHttp = userCenterTaskMessageService.selectTaskMessageUserHttp(userCenterTaskMessage);
                        HouseInfoKeep houseAscriptions = houseLibraryService.selectHouseAscriptions(houseInfoKeep);
                        String personID = "";
                        if (houseAscriptions != null) {
                            if (!houseAscriptions.getHpr_newEmp().equals(houseAscriptions.getEm_id())) {
                                personID += houseAscriptions.getHpr_newEmp() + "," + houseAscriptions.getEm_id() + ",";
                            } else {
                                personID += houseAscriptions.getHpr_newEmp() + ",";
                            }
                        }
                        personID += 17 + "," + 7 + "," + 23;
                        if (selectTaskMessageUserHttp.isEmpty()) {
                            userCenterTaskMessageService.insertTaskMessage(houseInfoKeep.getHouse_address() + " 房屋" + boolStr + day + "天，请尽快处理", "紧急", "重要", newDate + " 09:40", AppUtil.getWeekOfDate(sdf.parse(newDate)), newDate + " 09:40", AppUtil.getWeekOfDate(sdf.parse(newDate)), null, personID, "/houseLibrary/jumpHouseInfo?hi_code=" + houseInfoKeep.getHi_code(), 1, true, null);
                        } else {
                            boolean bools1 = true;
                            boolean bools2 = true;
                            boolean bools3 = true;
                            boolean bools4 = true;
                            for (UserCenterTaskMessage userCenterTaskMessage2 : selectTaskMessageUserHttp) {
                                if (houseAscriptions != null) {
                                    if (userCenterTaskMessage2.getEm_id().equals(houseAscriptions.getHpr_newEmp())) {
                                        bools1 = false;
                                    }
                                    if (userCenterTaskMessage2.getEm_id().equals(houseAscriptions.getEm_id())) {
                                        bools2 = false;
                                    }
                                } else {
                                    bools1 = false;
                                    bools2 = false;
                                }
                                if (userCenterTaskMessage2.getEm_id().equals(17)) {
                                    bools3 = false;
                                }
                                if (userCenterTaskMessage2.getEm_id().equals(23)) {
                                    bools4 = false;
                                }
                            }
                            personID = "";
                            if (bools1) {
                                personID += houseAscriptions.getHpr_newEmp() + ",";
                            }
                            if (bools2) {
                                if (!houseAscriptions.getHpr_newEmp().equals(houseAscriptions.getEm_id())) {
                                    personID += houseAscriptions.getEm_id() + ",";
                                }
                            }
                            if (bools3) {
                                personID += 17 + "," + 7 + ",";
                            }
                            if (bools4) {
                                personID += 23 + ",";
                            }
                            if (!personID.equals("")) {
                                personID = personID.substring(0, personID.length() - 1);
                                userCenterTaskMessageService.insertTaskMessage(houseInfoKeep.getHouse_address() + " 房屋" + boolStr + day + "天，请尽快处理", "紧急", "重要", newDate + " 09:40", AppUtil.getWeekOfDate(sdf.parse(newDate)), newDate + " 09:40", AppUtil.getWeekOfDate(sdf.parse(newDate)), null, personID, "/houseLibrary/jumpHouseInfo?hi_code=" + houseInfoKeep.getHi_code(), 1, false, selectTaskMessageUserHttp.get(0).getTm_id());
                            }
                            for (UserCenterTaskMessage userCenterTaskMessage2 : selectTaskMessageUserHttp) {
                                String text = houseInfoKeep.getHouse_address() + " 房屋" + boolStr + day + "天，请尽快处理";
                                userCenterTaskMessage.setTm_id(userCenterTaskMessage2.getTm_id());
                                userCenterTaskMessage.setTm_text(text);
                                userCenterTaskMessageService.updatetTaskMessageText(userCenterTaskMessage);
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /* ==========【我的房源】========== */

    /**
     * 跳转我的房源
     *
     * @return
     */
    @RequestMapping("/jumpHouseInfoSelf")
    public ModelAndView jumpMyInformationPage() {
        return new ModelAndView("/library/HouseInfoSelf");
    }

    /**
     * 保存图片的URL到数据库
     *
     * @param pathList
     * @return
     */
    @RequestMapping("/savePicture")
    @ResponseBody
    public String savePicture(String hi_code, String pathList, String folderName) {
        Msg<Object> msg = new Msg<>();
        List<String> list = JSONArray.parseArray(pathList, String.class);
        int count = 0;
        // 创建文件夹
        HouseImageFolder houseImageFolder = new HouseImageFolder();
        //TODO
//		houseImageFolder.setHif_name(folderName);
        houseImageFolder.setHi_code(hi_code);
        houseImageFolder.setHif_createTime(new Date());

        HouseImageFolder selectHouseImageFolder = new HouseImageFolder();
        selectHouseImageFolder = houseLibraryService.selectHouseImageFolder(houseImageFolder);
        if (selectHouseImageFolder == null) {// 文件夹不存在
            int secceed = houseLibraryService.addHouseImageFolder(houseImageFolder);// 创建文件夹
            if (secceed > 0) {
                selectHouseImageFolder = houseLibraryService.selectHouseImageFolder(houseImageFolder);// 查询文件夹信息
            }
        }
        for (int i = 0; i < list.size(); i++) {
            String hm_path = list.get(i);
            /* System.out.println(hm_path); */
            HouseImageVo image = new HouseImageVo();
            image.setHm_path(hm_path);
            image.setHi_code(hi_code);
            image.setHm_createTime(new Date());
            image.setHif_id(selectHouseImageFolder.getHif_id());
            image.setHm_state(0);
//			image.setHif_name(folderName);
            count += houseImageService.addHouseImage(image) ? 1 : 0;
            msg.setData(image);
        }
        if (count > 0) {
            return msg.toString();
        }
        return msg.toError(110, "error");

    }

    @RequestMapping("/downPicture")
    @ResponseBody
    public String downPicture(HttpServletRequest request, String pathList) throws Exception {
        Msg<Object> msg = new Msg<Object>();
        List<String> list = JSONArray.parseArray(pathList, String.class);
        for (int i = 0; i < list.size(); i++) {
            String url = list.get(i);
            byte[] btImg = DownPicture.getImageFromNetByUrl(url);
            if (null != btImg && btImg.length > 0) {
                String fileName = (new Date()).getTime() + ".jpg";
                DownPicture.writeImageToDisk(btImg, fileName);
            } else {
                msg.setMsg("没有从该连接获得内容");
            }
        }
        return msg.toString();
    }

    @RequestMapping("/deletePicture")
    @ResponseBody
    public String deletePicture(String hi_code, String pathList) {
        List<String> list = JSONArray.parseArray(pathList, String.class);
        for (int i = 0; i < list.size(); i++) {
            String hm_path = list.get(i);
            HouseImageVo image = new HouseImageVo();
            image.setHi_code(hi_code);
            image.setHm_path(hm_path);
            image.setHm_state(-1);
            houseImageService.updateHouseImage(image);

        }
        return null;
    }

    /**
     * ajax分页查询我的房屋基本信息
     *
     * @param response 合同类型
     * @return
     * @throws ParseException
     */
    @RequestMapping("/queryHouseInfoSelfList")
    @ResponseBody
    public Map<String, Object> MyInformationPage(HttpServletResponse response, TableList tableList1, String types) throws ParseException {
        // 初始化获取对象
        TableList tableList = tableList1.initData(tableList1);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

        UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();

        HouseModel houseModel = new HouseModel();
        if (tableList.getDateStart() != null && !tableList.getDateStart().equals("")) {
            houseModel.setDateStart(sf.parse(tableList.getDateStart()));
        }
        if (tableList.getDateEnd() != null && !tableList.getDateEnd().equals("")) {
            houseModel.setDateEnd(sf.parse(tableList.getDateEnd()));
        }
        houseModel.setSqlWhere(tableList.getSqlWhere());
        if (!StringUtils.isEmpty(types)) {
            houseModel.setContractObject_Type(types);
        }
        houseModel.setDateTitle(tableList.getDateType());

        if (tableList.getOrderBy() != null && !tableList.getOrderBy().equals("")) {
            houseModel.setSqlOrderBy("order by " + tableList.getOrderBy() + " asc");
        } else {
            houseModel.setSqlOrderBy("");
        }
        houseModel.setEm_id(cookieEmployee.getEm_id());
        // 装载数据类
        DataList<HouseInfoKeep> datalist = new DataList<>();
        String pageSizeStr = AppUtil.getCookie("pageSize");
        int pageSize = StringUtils.isEmpty(pageSizeStr) ? 16 : Integer.valueOf(pageSizeStr);
        // 查询分页实体
        PageModel<HouseInfoKeep> pageModel = houseLibraryService.MyInformationPage(tableList.getPageNo(), pageSize, houseModel);
        // 处理特殊数据
        List<HouseInfoKeep> list = new ArrayList<>();
        for (HouseInfoKeep houseInfoKeep : pageModel.getList()) {
            houseInfoKeep.setHe_phone("/" + houseInfoKeep.getHe_phone());
            houseInfoKeep.setEm_phone("/" + houseInfoKeep.getEm_phone());
            list.add(houseInfoKeep);
        }
        // 装载数据
        return datalist.dataList(list, tableList.getPageNo(), pageSize, pageModel.getTotalRecords(), pageModel.getSumMoney());
    }

    @RequestMapping("/selectHouseImage")
    @ResponseBody
    public String selectHouseImage(String hi_code) {
        Msg<Object> msg = new Msg<Object>();
        HouseImageVo image = new HouseImageVo();
        image.setHi_code(hi_code);
        List<HouseImageVo> imageList = houseLibraryService.queryHouseImageList(image);
        msg.setData(imageList);
        return msg.toString();
    }

    @RequestMapping("/selectListHouseFolder")
    @ResponseBody
    public String selectFolder(String hi_code) {
        Msg<Object> msg = new Msg<Object>();
        HouseImageFolder folder = new HouseImageFolder();
        folder.setHi_code(hi_code);
        List<HouseImageFolder> folderList = houseLibraryService.selectListHouseImageFolder(folder);
        msg.setData(folderList);

        return msg.toString();
    }

    /**
     * 房源发布
     *
     * @param houseInfo
     * @param hi_code
     * @param houseStatus 0:未上 架 2:待出 租 3:已出 租
     */
    private void feedHouseToHfq(HouseHouseInformation houseInfo, String hi_code, int houseStatus) {

        // 签名字符串
        String signStr = "";
        // 系统数据参数
        Map<String, Object> requestMap = new TreeMap<String, Object>();
        // 公共参数
        Map<String, Object> publicParamMap = new HashMap<>();

        String hi_latitude = houseInfo.getHi_latitude();// 经纬度
        String[] latitudeArray = hi_latitude.split(",");
        requestMap.put("positionX", latitudeArray[1]);
        requestMap.put("positionY", latitudeArray[0]);

        requestMap.put("communityName", houseInfo.getHi_name());// 小区
        // houseInfo.getHouse_address()
        requestMap.put("price", (int) (houseInfo.getHi_money() * 100));// 租金月租金，单位为分

        // 合同主体
        ContractObjectVo contractObject = new ContractObjectVo();
        contractObject.setContractObject_Id(houseInfo.getContractObject_Id());
        contractObject.setHi_code(hi_code);
        contractObject.setContractObject_Type("托管合同");
        contractObject = contractObjectService.selectContractObjectByHICode(contractObject);
        // 合同主体
        UserCenterContractBody contractBody = contractObjectService.queryContractBody(contractObject.getContractObject_Code());
        requestMap.put("bonus", (int) (contractBody.getContractBody_Service() * 100));// 服务费
        requestMap.put("deposit", (int) (contractBody.getContractBody_Pay() * 100));// 押金，单位为分

        requestMap.put("hasKey", 1);// 是否有钥匙 0-无；1-有
        requestMap.put("companyId", 0);// 经纪公司ID
        requestMap.put("companyName", "重庆管家婆房地产经纪有限公司");// 经纪公司名称

        // 管家信息
        ViewBusinessContractRelaEmpVo contractRelaEmpVo = new ViewBusinessContractRelaEmpVo();
        contractRelaEmpVo.setContractObject_Id(contractObject.getContractObject_Id());
        List<ViewBusinessContractRelaEmpVo> contractRelaEmp = contractObjectService.queryViewContractRelaEmp(contractRelaEmpVo);
        ViewBusinessContractRelaEmpVo empVo = contractRelaEmp.get(0);
        UserCenterEmployee centerEmployee = employeeService.selectUserCenterEmployeeById(empVo.getEm_id());
        requestMap.put("agencyId", centerEmployee.getEm_id());// 经纪人ID
        requestMap.put("agencyPhone", centerEmployee.getEm_phone());// 经纪人电话
        requestMap.put("agencyName", centerEmployee.getEm_name());// 经纪人姓名
        requestMap.put("agencyIntroduce", "");// 经纪人自我介绍
        requestMap.put("agencyGender", "man".equals(centerEmployee.getEm_sex()) ? 1 : 2);// 经纪人性别1:男//
        // 2:女
        requestMap.put("agencyAvatar", "");// 经纪人头像

        requestMap.put("status", houseStatus);// 房源状态 0:未上 架 2:待出 租 3:已出 租
        requestMap.put("bedroomNum", houseInfo.getHi_houseS());// 卧室数量
        requestMap.put("livingroomNum", houseInfo.getHi_houseT());// 客厅数量
        requestMap.put("kitchenNum", 1);// 厨房数量 暂时没有该数据，默认送1
        requestMap.put("toiletNum", houseInfo.getHi_houseW());// 卫生间数量
        requestMap.put("balconyNum", 1);// 阳台数量 暂时没有该数据，默认送1

        String hi_address = houseInfo.getHi_address();
        if (!"".equals(hi_address) && null != hi_address) {

            String[] hiAddressArr = hi_address.split("-");
            requestMap.put("buildingNo", hiAddressArr[0]);// 楼栋编号
            if (hiAddressArr.length >= 4) {
                requestMap.put("unitNo", hiAddressArr[1]);// 单元号
            }
            requestMap.put("houseNo", hiAddressArr[hiAddressArr.length - 2] + "-" + hiAddressArr[hiAddressArr.length - 1]);// 门牌号
        } else {

            requestMap.put("buildingNo", "0");// 楼栋编号
        }
        requestMap.put("buildingName", houseInfo.getHi_name());// 楼栋名称
        requestMap.put("area", houseInfo.getHi_measure());// 面积
        requestMap.put("floorNo", houseInfo.getHi_floor());// 所在楼层，物理楼层
        requestMap.put("floorTotal", houseInfo.getHi_totalFloor());// 总楼层数量

        // 朝向 10001: 东 10002: 西 10003: 南 10004: 北 10023: 西南 10024: 西北 10014: 东北
        // 10013: 东南 10034: 南北 10012:东西
        String hi_orientation = houseInfo.getHi_orientation();
        int hi_orientationCode = 0;
        switch (hi_orientation) {
            case "东":
                hi_orientationCode = 10001;
                break;
            case "西":
                hi_orientationCode = 10002;
                break;
            case "南":
                hi_orientationCode = 10003;
                break;
            case "北":
                hi_orientationCode = 10004;
                break;
            case "西南":
                hi_orientationCode = 10023;
                break;
            case "西北":
                hi_orientationCode = 10024;
                break;
            case "东北":
                hi_orientationCode = 10014;
                break;
            case "东南":
                hi_orientationCode = 10013;
                break;
            case "南北":
                hi_orientationCode = 10034;
                break;
            case "东西":
                hi_orientationCode = 10012;
                break;
        }
        requestMap.put("orientation", hi_orientationCode);
        requestMap.put("buildingType", 2);// 建筑类型 1:板楼 2:塔楼 3:板塔 结合 4:独栋 5:联排
        // 6:叠拼

        // 装修档次 1:精装 2:简装 3:毛坯 4:老旧 5.豪装 6.中装 7.普装
        String hi_state = houseInfo.getHi_state();
        int hi_stateCode = 0;
        switch (hi_state) {
            case "精装":
                hi_stateCode = 1;
                break;
            case "简装":
                hi_stateCode = 2;
                break;
            case "毛坯":
                hi_stateCode = 3;
                break;
            case "老旧":
                hi_stateCode = 4;
                break;
            case "豪装":
                hi_stateCode = 5;
                break;
            case "中装":
                hi_stateCode = 6;
                break;
            case "基装":
                hi_stateCode = 7;
                break;
        }
        requestMap.put("fitmentType", hi_stateCode);

        requestMap.put("buildingYear", "");// 建筑时间(单位:年)
        requestMap.put("toilet", 1);// 是否有独立卫生间 0-无 1-有
        requestMap.put("balcony", 1);// 是否有独立阳台 0-无 1-有
        requestMap.put("insurance", 1);// 是否有家财险 0-无 1-有
        requestMap.put("checkIn", DataUtil.DateToStrs(new Date()));// 入住时间(年月日：yyyy-MM-dd)
        requestMap.put("depositMonth", 2);// 押几
        requestMap.put("periodMonth", 1);// 付几
        requestMap.put("entireRent", 1);// 租赁方式0:分租 1:整租 2:整分 皆可 我司暂提供只整租

        // 主要室内设施，用“,”分割
        String hi_project = houseInfo.getHi_project();
        String settingsStr = "";
        if (!StringUtils.isEmpty(hi_project)) {
            String[] hiPjtArray = hi_project.split(",");
            for (int i = 0; i < hiPjtArray.length; i++) {
                switch (hiPjtArray[i]) {
                    case "床":
                        settingsStr += "bed:1" + ",";
                        break;
                    case "沙发":
                        settingsStr += "sofa:1" + ",";
                        break;
                    case "电脑桌":
                        settingsStr += "table:1" + ",";
                        break;
                    case "衣柜":
                        settingsStr += "wardrobe:1" + ",";
                        break;
                    case "椅子":
                        settingsStr += "chair:1" + ",";
                        break;
                    case "电视":
                        settingsStr += "tv:1" + ",";
                        break;
                    case "冰箱":
                        settingsStr += "fridge:1" + ",";
                        break;
                    case "空调":
                        settingsStr += "ac:1" + ",";
                        break;
                    case "洗衣机":
                        settingsStr += "washer:1" + ",";
                        break;
                    case "微波炉":
                        settingsStr += "microwaveoven:1" + ",";
                        break;
                    case "电水壶":
                        settingsStr += "kettle:1" + ",";
                        break;
                    case "窗帘":
                        settingsStr += "curtain:1" + ",";
                        break;
                    case "被褥":
                        settingsStr += "mattress:1" + ",";
                        break;
                    case "花瓶":
                        settingsStr += "vase:1" + ",";
                        break;
                    case "台灯":
                        settingsStr += "lamp:1" + ",";
                        break;
                    case "装饰画":
                        settingsStr += "decoration:1" + ",";
                        break;
                }
            }
            requestMap.put("settings", settingsStr.substring(0, (settingsStr.length() - 1)));
        }

        requestMap.put("settingsAddon", "");// 次要设施用“,”分割
        requestMap.put("desc", houseInfo.getHi_content());// 房源描述

        // 查询房屋图片
        HouseImageVo houseImage = new HouseImageVo();
        houseImage.setHi_code(hi_code);
        List<HouseImageVo> houseImages = houseImageService.queryHouseImageList(houseImage);
        String imgPaths = "";
        for (HouseImageVo image : houseImages) {
            imgPaths += image.getHm_path() + ",";
        }
        requestMap.put("imgs", imgPaths.substring(0, (imgPaths.length() - 1)));// 房源照片
        requestMap.put("bizName", (null == houseInfo.getHi_district() || "".equals(houseInfo.getHi_district())) ? "重庆" : houseInfo.getHi_district());// 商圈名称

        Long ts = System.currentTimeMillis() / 1000L;
        publicParamMap.put("appId", Constant.HUIFENQI_APPID);
        publicParamMap.put("secretKey", Constant.HUIFENQI_SECRETKEY);
        publicParamMap.put("ts", ts.toString());

        // 拼接加密字符串
        StringBuilder signSeed = new StringBuilder();

        HousePartnerPublish partnerPublish = housePartnerPublishService.queryHousePartnerPublishByHiCode(hi_code);
        // 是否发布 TRUE-发布；FALSE-更新
        boolean isFeed = true;
        // 未同步到第三方
        if (null == partnerPublish) {

            // 房源同步第三方数据若已失效，可以第二次录入
        } else if ("invalid".equals(partnerPublish.getHpp_status())) {

        } else {
            TreeMap<String, Object> sellMap = HuifenqiPublishUtil.setRequestMap(partnerPublish, partnerPublish.getHpp_data());
            requestMap.putAll(sellMap);
            isFeed = false;
        }

        // 本系统需发布的具体数据排序
        List<String> values = HuifenqiPublishUtil.sortParamValues(requestMap);
        for (String val : values) {
            signSeed.append(val);
        }

        String seed = signSeed.toString();

        // 去字符串中间空格
        seed.replaceAll("\\s*", "");

        // sign签名加密须把APPID，排序后参数拼接的字符串，SECRETKEY及Unix时间戳一起加密
        signStr = DigestUtils.sha256Hex(Constant.HUIFENQI_APPID + seed + Constant.HUIFENQI_SECRETKEY + ts);

        // 检验sign
        // boolean boo = HuifenqiPublishUtil.checkSign(Constant.HUIFENQI_APPID,
        // Constant.HUIFENQI_SECRETKEY, ts.toString(),
        // HuifenqiPublishUtil.sortParamValues(publicParamMap), signStr, "");
        // if(boo){

        publicParamMap.put("sign", signStr);
        // }

        // 最终上送参数拼接（包括APPID等）不能包含空格
        StringBuilder paramStr = new StringBuilder();

        paramStr.append("appId=" + publicParamMap.get("appId") + "&");

        for (Entry<String, Object> entry : requestMap.entrySet()) {
            String key = entry.getKey();
            String value = null == entry.getValue() ? "" : entry.getValue().toString();
            paramStr.append(key + "=" + value + "&");
        }

        paramStr.append("secretKey=" + publicParamMap.get("secretKey") + "&");
        paramStr.append("ts=" + publicParamMap.get("ts") + "&");
        paramStr.append("sign=" + publicParamMap.get("sign") + "&");

        // 同步发布会分期
        String result = isFeed ? HuifenqiPublishUtil.feedHouseToHfq(paramStr.substring(0, (paramStr.length() - 1))) : HuifenqiPublishUtil.feedHouseToHfq(paramStr.substring(0, (paramStr.length() - 1)));

        HousePartnerPublish housePartnerPublish = HuifenqiPublishUtil.resolveResult(result, hi_code);
        housePartnerPublish.setHpp_status("effect");
        // 保存数据库
        if (isFeed) {
            housePartnerPublishService.addHousePartnerPublish(housePartnerPublish);
        } else {
            housePartnerPublishService.updHousePartnerPublish(housePartnerPublish);
        }
    }

    /**
     * APP版本号控制
     *
     * @param appCode
     * @return
     * @author 陈智颖
     * @date Apr 23, 2017 2:07:11 PM
     */
    @RequestMapping("/appCode")
    @ResponseBody
    public Map<String, Object> appCode(AppCode appCode) {
        Map<String, Object> map = new HashMap<>();
        List<AppCode> appcodes = houseLibraryService.appcode(appCode);
        map.put("appcodes", appcodes.get(0));
        return map;
    }

    /**
     * 获取图片文件夹
     *
     * @author tanglei
     * date 2017年7月4日 下午14:55:40
     */
    @RequestMapping("/imgFolds")
    @ResponseBody
    public String imgFolds(HttpServletRequest req, String hi_code, String image_mode) {
        Msg<Object> msg = new Msg<Object>();
        HouseImageFolderType houseImageFolderType = new HouseImageFolderType();
        houseImageFolderType.setHift_state(1);
        List<HouseImageFolderType> folderType = houseImageFolderTypeService.selectFolderType(houseImageFolderType);
        Map<String, Object> map = null;
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        for (HouseImageFolderType Type : folderType) {
            map = new HashMap<>();
            HouseImageVo houseImageVo = new HouseImageVo();
            houseImageVo.setHif_name(Type.getHift_id());
            houseImageVo.setHi_code(hi_code);
            houseImageVo.setHm_state(1);
            List<HouseImageVo> page = houseImageService.selectHouseImageVo(houseImageVo);
            HouseImageVo vo = new HouseImageVo();
            if (page.size() != 0) {
                for (HouseImageVo ImageVo : page) {
                    vo.setHif_name(ImageVo.getHif_name());
                    vo.setSize(page.size());
                    vo.setHm_path(OSSparameter.imagePath(ImageVo.getHm_path(), null, null));
                    vo.setType_name(ImageVo.getType_name());
                }
            } else {
                vo.setType_name(Type.getHift_name());
                vo.setHif_name(Type.getHift_id());
                vo.setSize(0);
                vo.setHm_path(null);
            }
            map.put("vo", vo);
            list.add(map);
        }
        Map<String, Object> condition = new HashMap<>();
        condition.put("list", list);
        return msg.toString(condition);
    }

    /**
     * 文件夹里图片
     *
     * @author tanglei
     * date 2017年7月4日 下午18:05:40
     */
    @RequestMapping("/foldSImg")
    @ResponseBody
    public String foldSImg(String hi_code, Integer imgfoldName) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(hi_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }
        HouseImageVo houseLibraryImageVo = new HouseImageVo();
        houseLibraryImageVo.setHi_code(hi_code);
        houseLibraryImageVo.setHif_name(imgfoldName);
        houseLibraryImageVo.setHm_state(1);
        List<HouseImageVo> houseLibraryImageVos = houseImageService.selectFoldsImgs(houseLibraryImageVo);
        for (HouseImageVo house : houseLibraryImageVos) {
            house.setHm_path(OSSparameter.imagePath(house.getHm_path()));
        }
        msg.put("houseLibraryImageVos", houseLibraryImageVos);
        return msg.toString();
    }

    /**
     * 下载图片到本地
     *
     * @throws Exception
     * @author tanglei
     * date 2017年7月6日 上午10:25:40
     */
    @RequestMapping("/downloadImg")
    @ResponseBody
    public String downloadImg(HttpServletRequest req, HttpServletResponse response, InputStream inputStream, String filePath) throws Exception {
        Msg<Object> msg = new Msg<>();
        String file = filePath.substring(1, filePath.length() - 1);
        String[] array = file.split("_");
        URL url = null;
        try {
            String path = "D:/image/";   //创建文件夹
            File tempFile = new File(path);
            if (!tempFile.exists()) {
                tempFile.mkdirs();
            }
            for (int i = 0; i < array.length; i++) {
                Random ne = new Random();
                int x = ne.nextInt(9999 - 1000 + 1) + 1000; //随机数
                url = new URL(array[i].toString());

                DataInputStream dataInputStream = new DataInputStream(url.openStream());
                String imageName = "D:/image/" + x + ".jpg";
                FileOutputStream fileOutputStream = new FileOutputStream(new File(imageName));
                ByteArrayOutputStream output = new ByteArrayOutputStream();
                String fileName = array[i].substring(array[i].lastIndexOf("\\") + 1, array[i].length() - 1);
                response.setHeader("content-disposition", "attachment;filename=hehe" + URLEncoder.encode(fileName, "UTF-8"));
                response.setHeader("Pragma", "No-cache");
                response.setHeader("Cache-Control", "No-cache");
                response.setDateHeader("Expires", 0);
                byte[] buffer = new byte[1024];
                int length;
                while ((length = dataInputStream.read(buffer)) > 0) {
                    output.write(buffer, 0, length);
                }
                fileOutputStream.write(output.toByteArray());
                dataInputStream.close();
                fileOutputStream.close();
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return msg.toString();
    }

    /**
     * 删除
     *
     * @author tanglei
     * date 2017年7月6日  下午14:05:40
     */
    @RequestMapping("/delImage")
    @ResponseBody
    public String delImage(String nid) {
        Msg<Object> msg = new Msg<>();
        String imgId = nid.substring(1, nid.length() - 1);
        String[] array = imgId.split("_");
        for (int i = 0; i < array.length; i++) {
            HouseImageVo houseImage = new HouseImageVo();
            houseImage.setHm_state(0);
            houseImage.setHm_id(Integer.valueOf(array[i].toString()));
            houseImageService.updateHouseImage(houseImage);
        }
        return msg.toString();
    }

    /**
     * 查询房屋物业信息列表
     *
     * @return
     */
    @RequestMapping("/queryAllHouseInfoList")
    @ResponseBody
    public String queryAllHouseInfoList(String hi_address, int pageNo, String hi_isForRent) {
        Msg<Object> msg = new Msg<>();
        Pagination<HouseInfoKeep> pagination = new Pagination<>(pageNo, 10);
        HouseInfoKeep houseInfoKeep = new HouseInfoKeep();
        houseInfoKeep.setHi_address(hi_address);
        if ("stoprent".equals(hi_isForRent)) {
            houseInfoKeep.setHi_isForRent(AppConfig.hi_isForRent_0);
        }
        if ("forrent".equals(hi_isForRent)) {
            houseInfoKeep.setHi_isForRent(AppConfig.hi_isForRent_1);
        }
        if ("pauserent".equals(hi_isForRent)) {
            houseInfoKeep.setHi_isForRent(AppConfig.hi_isForRent_2);
        }
        pagination.setT(houseInfoKeep);
        pagination.setList(houseLibraryService.queryAllHouseInfoList(pagination));
        pagination.setTotalRecords(houseLibraryService.queryAllHouseInfoListCount(pagination));
        return msg.toString(pagination);
    }

    /**
     * 房屋发布预览(pc)
     *
     * @author tanglei
     */
    @RequestMapping("/previewHousePublish")
    public String previewHousePublish(HttpServletRequest req, Model model, UserCenterEmployee employee, HouseHouseExtended houseExtended, HouseHouseInformation houseInfo, String hm_id) throws Exception {
        model.addAttribute("employee", employee);
        model.addAttribute("houseExtended", houseExtended);
        model.addAttribute("houseInfo", houseInfo);
        // 图片
        HouseImageVo houseImage = new HouseImageVo();
        List<HouseImageVo> houseImageVo = new ArrayList<HouseImageVo>();
        if (!StringUtils.isEmpty(hm_id)) {
            String[] arr = hm_id.split("_");
            for (int i = 0; i < arr.length; i++) {
                String[] data = arr[i].split("-");
                houseImage.setHi_code(houseInfo.getHi_code());
                houseImage.setHm_id(Integer.valueOf(data[0]));
                HouseImageVo image = houseImageService.queryHouseImage(houseImage);
                image.setHm_path(OSSparameter.imagePath(image.getHm_path(), null, null));
                image.setHm_chose(Integer.valueOf(data[1]));
                houseImageVo.add(image);
            }
        }
        model.addAttribute("houseImageVo", houseImageVo);
        // 房屋配置
        if (houseInfo.getConim_id() != null) {
            String[] conims = houseInfo.getConim_id().split(",");
            List<Facility> facilitys = new ArrayList<>();
            for (String str : conims) {
                Facility facility = new Facility();
                facility.setConim_id(Integer.valueOf(str));
                Facility facility1 = houseInformationService.queryHouseInformationFacility(facility).get(0);
                String conim_path = facility1.getConim_path();
                if (null != conim_path) {
                    facility1.setConim_path(OSSparameter.imagePath(conim_path, null, null));
                }
                facilitys.add(facility1);
            }
            model.addAttribute("facilitys", facilitys);
        } else {
            model.addAttribute("facilitys", "");
        }
        return "/library/houseDetails";
    }

    /**
     * 跳转房屋审核
     *
     * @author tanglei
     */
    @RequestMapping("/houseExamine")
    public String houseExamine() {
        return "/library/houseExamineList";
    }

    /**
     * 房屋发布审核
     *
     * @author tanglei
     */
    @RequestMapping("/queryHouseExamineList")
    @ResponseBody
    public Map<String, Object> queryHouseExamineList(Pagination<HouseInfoKeep> pagination) {
        Msg<Object> msg = new Msg<>();
        pagination.formatWhere();
        pagination = houseLibraryService.queryHouseExamineList(pagination);
        return msg.toMap(pagination);
    }

    /**
     * 房源发布审核弹出框
     *
     * @author tanglei
     */
    @RequestMapping("/queryHouseExamine")
    @ResponseBody
    public Map<String, Object> queryHouseExamine(HttpServletRequest request, HttpServletResponse response, String hi_code) {
        Map<String, Object> map = new HashMap<>();
        // 1.如果未发布，则查询库存房源基本信息
        // 2.如果已经发布，则查询线上房源库，修改房源
        HouseHouseInformation houseInfo = housingAllocationService.selectHouseInfoByCode(hi_code);
        // 查询合同信息
        ContractObjectVo contractObject = new ContractObjectVo();
        contractObject.setHi_code(hi_code);
        contractObject = contractObjectService.queryContractObject(contractObject);
        if (houseInfo != null) {
            // 查询房屋扩展信息
            HouseHouseExtended houseExtended = houseExtendedService.selectHouseExtendedById(houseInfo.getHe_id());
            // 查询房屋管家
            UserCenterEmployee employee = housingAllocationService.queryHouseWaiterInfo(hi_code);
            if (contractObject != null) {
                houseInfo.setContractObject_Id(contractObject.getContractObject_Id());
            }
            map.put("employee", employee);
            map.put("houseInfo", houseInfo);
            map.put("houseExtended", houseExtended);
        } else {
            // 查询库存房源
            HouseInfoKeep houseInfoKeep = houseLibraryService.selectHouseInfoByCode(hi_code);
            // 查询房屋扩展信息
            HouseHouseExtended houseExtended = houseExtendedService.selectHouseExtendedById(houseInfoKeep.getHe_id());
            // 查询房屋管家
            UserCenterEmployee employee = housingAllocationService.queryHouseWaiterInfo(hi_code);
            if (contractObject != null) {
                houseInfoKeep.setContractObject_Id(contractObject.getContractObject_Id());
            }
            map.put("employee", employee);
            map.put("houseInfo", houseInfoKeep);
            map.put("houseExtended", houseExtended);
        }

        //查询房源发布渠道
        HousePublishChannel housePublishChannel = new HousePublishChannel();
        housePublishChannel.setHpc_status(1);  //开启
        List<HousePublishChannel> housePublish = houseLibraryService.queryHousePublishChannel(housePublishChannel);
        map.put("housePublish", housePublish);
        //根据房屋code查询此房屋发布状态
        HousePublish hpc = new HousePublish();
        hpc.setHi_code(hi_code);
        List<HousePublish> housePublisheList = houseLibraryService.housePublisheList(hpc);
        map.put("housePublisheList", housePublisheList);
        //查询发布选中的图片
        HouseImageVo img = new HouseImageVo();
        img.setHi_code(hi_code);
        img.setHm_state(1);
        img.setHif_name(1);
        img.setHm_chose(0);
        List<HouseImageVo> imageList = houseImageService.queryHouseImageList(img);
        for (HouseImageVo house : imageList) {
            house.setHm_path(OSSparameter.imagePath(house.getHm_path(), null, null));
        }
        map.put("imageList", imageList);
        return map;
    }

    /**
     * 审核房源发布
     *
     * @author tanglei
     */
    @RequestMapping("/updateHouseExamine")
    @ResponseBody
    public String updateHouseExamine(String hi_code, int hp_status, String hp_content) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        int bool = 1;
        HousePublish housepublish = new HousePublish();
        housepublish.setHi_code(hi_code);
        List<HousePublish> houseList = houseLibraryService.housePublisheList(housepublish);
        for (HousePublish house : houseList) {
            house.setHp_status(hp_status);
            house.setEm_id(employee.getEm_id());
            house.setHp_check_time(new Date());
            if (!StringUtils.isEmpty(hp_content)) {
                house.setHp_content(hp_content);
            }
            bool = houseLibraryService.updateHousePublish(house);
        }
        if (bool < 1) {
            msg.setCode(110);
            msg.setMsg("审核失败");
            return msg.toString();
        }
        return msg.toString();
    }


    /**
     * 同步房源到支付宝(租房平台)
     *
     * @return
     */
    @RequestMapping("/syncDownload")
    @ResponseBody
    public String syncDownload(HttpServletRequest request) {
        Msg<Object> msg = new Msg<>();

        String file_type = "1";

        //查询所有在招租的房源
        List<ViewHouseLibraryInfoVo> houseLibraryInfoVoList = houseInformationService.queryHouseInformationKeepList();

        for (ViewHouseLibraryInfoVo houseInfoKeep : houseLibraryInfoVoList) {
            if (StringUtils.isEmpty(houseInfoKeep.getComm_req_id())) {
                continue;
            }
            String hi_code = houseInfoKeep.getHi_code();
            System.out.println("房源编号:" + hi_code);

            if (StringUtils.isEmpty(houseInfoKeep.getRoom_code())) {
                String room_code = AppUtil.genrateRoomCode(1, rentHouseService.queryRentHouseCount());
                RentHouseVo rentHouseVo = new RentHouseVo();
                rentHouseVo.setRoom_code(room_code);
                rentHouseVo.setHi_code(houseInfoKeep.getHi_code());
                RentHouseVo houseVo = rentHouseService.addRentHouseVo(rentHouseVo);
                houseInfoKeep.setRoom_code(houseVo.getRoom_code());
            }
            try {
                // 同步到支付宝
                // 1、房源图片同步
                //            houseInfoKeep.setHi_totalFloor(hi_totalFloor);
                rentHouseService.syncFileService(request.getSession().getServletContext().getRealPath("/"), houseInfoKeep.getHi_code(), "1");
//                if("分散式".equals(houseInfoKeep.getHis_name())){
                // 2、分散式房源信息同步
                rentHouseService.rentHouseDispersionSync(houseInfoKeep);
                // 3、房源上架
                rentHouseService.rentHouseStateSync(houseInfoKeep.getHi_code(), houseInfoKeep.getRoom_code(), 1, 1, 1);
//                } else if("集中式".equals(houseInfoKeep.getHis_name())){
//                    // 4、集中式房源信息同步
//                    rentHouseService.syncCentralizationHouseKeepService(houseInfoKeep);
//                    // 5、房源上架
//
//                    rentHouseService.rentHouseStateSync(houseInfoKeep.getHi_code(), houseInfoKeep.getRoom_code(), 1, 1, 2);
//                }
            } catch (AlipayApiException e) {
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
        return msg.toString();

    }

    /**
     * 同步房源到支付宝(租房平台)
     *
     * @return
     */
    @RequestMapping("/syncRentHouse")
    @ResponseBody
    public String syncRentHouse(HttpServletRequest request, String hi_code) {
        Msg<Object> msg = new Msg<>();
        try {
            // 同步到支付宝
            ViewHouseLibraryInfoVo houseLibraryInfoVo = houseLibraryService.queryHouseLibraryInfo(hi_code);
            // 1、房源图片同步
            //            houseInfoKeep.setHi_totalFloor(hi_totalFloor);
            rentHouseService.syncFileService(request.getSession().getServletContext().getRealPath("/"), houseLibraryInfoVo.getHi_code(), "1");
//                if("分散式".equals(houseInfoKeep.getHis_name())){
            // 2、分散式房源信息同步
            rentHouseService.rentHouseDispersionSync(houseLibraryInfoVo);
            // 3、房源上架
            rentHouseService.rentHouseStateSync(houseLibraryInfoVo.getHi_code(), houseLibraryInfoVo.getRoom_code(), 1, 1, 1);
//                } else if("集中式".equals(houseInfoKeep.getHis_name())){
//                    // 4、集中式房源信息同步
//                    rentHouseService.syncCentralizationHouseKeepService(houseInfoKeep);
//                    // 5、房源上架
//
//                    rentHouseService.rentHouseStateSync(houseInfoKeep.getHi_code(), houseInfoKeep.getRoom_code(), 1, 1, 2);
//                }
        } catch (AlipayApiException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return msg.toString();
    }

    /**
     * 创建图片文件夹
     *
     * @author tanglei
     */
    @RequestMapping("/addHouseImageFold")
    @ResponseBody
    public Msg<Object> addHouseImageFold(HouseImageFolder houseImageFolder) {
        Msg<Object> msg = new Msg<>();
        int secceed = 1;
        HouseImageFolder folder = houseLibraryService.selectHouseImageFolder(houseImageFolder);
        HouseImageFolder selectHouseImageFolder = new HouseImageFolder();
        if (StringUtils.isEmpty(folder) && folder == null) {// 文件夹不存在
            secceed = houseLibraryService.addHouseImageFolder(houseImageFolder);// 创建文件夹
        }
        if (secceed > 0) {
            msg.toString();
        } else {
            msg.setCode(401);
        }
        return msg;
    }

    /**
     * 房屋图片上传到服务器
     *
     * @author tanglei
     */
    @RequestMapping("/houseImageUpload")
    @ResponseBody
    public String uploadImageFile(MultipartHttpServletRequest request, HttpServletRequest req, String type, String hi_code, Integer folderName) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        try {
            houseImageService.houseUploadFile(request, req, employee, type, hi_code, folderName).toString();
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        return msg.toString();
    }

    /**
     * 电话记录
     *
     * @return
     */
    @RequestMapping(value = "/telephoneRecords", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String telephoneRecords(HttpServletRequest request) {
        Msg<Object> msg = new Msg<>();
        try {
            System.out.println("电话记录参数: " + request.getParameterMap());
            // 验证签名
            if (!AliRent.checkSignature(request)) {
                throw new AppException("签名验证失败");
            }
            // 获取参数
            Map<String, String> params = AliRent.getParams(request);
            System.out.println("电话记录回调" + params);
            RentTelephoneRecordsVo rentTelephoneRecordsVo = new RentTelephoneRecordsVo();
            rentTelephoneRecordsVo.setAliUserId(params.get("aliUserId"));
            rentTelephoneRecordsVo.setZhimaOpenId(params.get("zhimaOpenId"));
            rentTelephoneRecordsVo.setRoomCode(params.get("roomCode"));
            rentTelephoneRecordsVo.setFlatsTag(Integer.valueOf(params.get("flatsTag")));
            rentTelephoneRecordsVo.setRecordTime(params.get("recordTime"));

            rentHouseService.telephoneRecordsService(rentTelephoneRecordsVo);

        } catch (AppException e) {
            e.printStackTrace();
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        msg.setMsg(1, "处理成功");
        return msg.toString();
    }

    /**
     * 修改支付宝租房小区同步结果
     *
     * @return
     */
    @RequestMapping(value = "/updatPropertyInfoName", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String updatPropertyInfoName(HttpServletRequest request) {
        Msg<Object> msg = new Msg<>();
        try {
            System.out.println("小区同步参数: " + request.getParameterMap());
            // 验证签名
            if (!AliRent.checkSignature(request)) {
                throw new AppException("签名验证失败");
            }
            // 获取参数
            Map<String, String> params = AliRent.getParams(request);
            System.out.println("小区同步结果回调" + params);
            PropertyInfoName propertyInfoName = new PropertyInfoName();
            propertyInfoName.setComm_req_id(params.get("commReqId"));
            propertyInfoName.setComm_req_status(Integer.valueOf(params.get("status")));
            propertyInfoName.setRemark(params.get("remark"));
            rentHouseService.updatPropertyInfoNameService(propertyInfoName);
        } catch (AppException e) {
            e.printStackTrace();
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        msg.setMsg(1, "处理成功");
        return msg.toString();

    }

    /**
     * 预约看房
     *
     * @return
     */
    @RequestMapping(value = "/lookAtHouse", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String lookAtHouse(HttpServletRequest request) {

        Msg<Object> msg = new Msg<>();
        try {
            System.out.println("预约看房参数: " + request.getParameterMap());
            // 验证签名
            if (!AliRent.checkSignature(request)) {
                throw new AppException("签名验证失败");
            }
            // 获取参数
            Map<String, String> params = AliRent.getParams(request);
            rentHouseService.lookAtHouse(params);
        } catch (AppException e) {
            e.printStackTrace();
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(e);
        }
        msg.setMsg(1, "处理成功");
        return msg.toString();
    }

    /**
     * 招租管理
     *
     * @author tanglei
     */
    @RequestMapping("/queryIsForRent")
    @ResponseBody
    public Map<String, Object> queryhouseIsForRent(String hi_code) {
        Msg<Object> msg = new Msg<>();
        HouseInfoKeep houseInfoKeep = new HouseInfoKeep();
        houseInfoKeep.setHi_code(hi_code);
        //查询线下房源信息
        HouseInfoKeep houseUnderLine = housingAllocationService.selectHouseInformationKeep(houseInfoKeep);
        msg.put("houseUnderLine", houseUnderLine);
        //线上房源信息
        HouseInfoKeep houseOnline = housingAllocationService.queryHouseOnline(houseInfoKeep);
        msg.put("houseOnline", houseOnline);

        //根据房屋号查询此房屋在支付宝平台状态
        RentHouseVo rentHouse = rentHouseService.queryRentHouseVo(hi_code);
        msg.put("rentHouse", rentHouse);

        //查询房屋类型
        HouseInformationStateRelation HouseStateRelation = new HouseInformationStateRelation();
        HouseStateRelation.setHi_code(hi_code);
        HouseStateRelation = housingAllocationService.queryHouseInformationStateRelation(HouseStateRelation);
        msg.put("HouseStateRelation", HouseStateRelation);
        return msg.toMap();
    }

    /**
     * 更改房屋招租状态
     *
     * @author tanglei
     */
    @RequestMapping("/updateIsForRent")
    @ResponseBody
    public String updateIsForRent(HouseInfoKeep houseInfoKeep, ContractImplRecordVo contractImplRecordVo) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        try {
            houseLibraryService.updateIsForRent(employee, houseInfoKeep, contractImplRecordVo);
        } catch (AppException e) {
            e.printStackTrace();
            return msg.toError(e);
        } catch (Exception e) {
            e.printStackTrace();
            return msg.toError(Msg.MSG_SYSTEM_ERROR);
        }
        return msg.toString();
    }

    /**
     * 支付宝平台上下架
     *
     * @author tanglei
     */
    @RequestMapping("/updateRentHouse")
    @ResponseBody
    public Map<String, Object> updateRentHouse(String hi_code, String roomCode, Integer roomStatus, Integer rentStatus, String his_name) throws AlipayApiException {
        Msg<Object> msg = new Msg<>();
        rentHouseService.rentHouseStateSync(hi_code, roomCode, roomStatus, rentStatus, ("分散式".equals(his_name) ? 1 : 2));
        return msg.toMap();
    }

    /**
     * app,官网上下架
     *
     * @author tanglei
     */
    @RequestMapping("/updateLowerAppHouse")
    @ResponseBody
    public String updateLowerAppHouse(HouseInfoKeep houseInfoKeep, ContractImplRecordVo contractImplRecordVo) {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        //线上房源招租状态更改
        housingAllocationService.updateHouseContractState(houseInfoKeep);
        contractImplRecordVo.setHi_code(houseInfoKeep.getHi_code());
        contractImplRecordVo.setCir_type(AppConfig.contractTpye_1010);
        contractImplRecordVo.setCir_source(1);
        contractImplRecordVo.setCir_author(employee.getEm_id());
        contractImplRecordVo.setCir_createTime(new Date());
        contractObjectService.addHouseRecord(contractImplRecordVo);
        return msg.toString();
    }

    /**
     * 上下架支付宝房源
     *
     * @author tanglei
     */
    @RequestMapping("/lowerAppHouse")
    @ResponseBody
    public String lowerAppHouse(RentHouseVo rentHouseVo, HouseInfoKeep houseInfoKeep, ContractImplRecordVo contractImplRecordVo) throws AlipayApiException {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            return msg.toError(Msg.MSG_LOGIN_ERROR);
        }
        Map<String, Object> map = rentHouseService.rentHouseStateSync(rentHouseVo.getHi_code(), rentHouseVo.getRoom_code(), rentHouseVo.getRoom_status(), 1, ("分散式".equals(houseInfoKeep.getHis_name()) ? 1 : 2));
        for (Entry<String, Object> vo : map.entrySet()) {
            String str = vo.getValue().toString();
            if (str.equals("401")) {
                msg.setMsg(401, "线上支付宝操作失败");
                return msg.toString();
            }
        }
        contractImplRecordVo.setHi_code(houseInfoKeep.getHi_code());
        contractImplRecordVo.setCir_type(AppConfig.contractTpye_1010);
        contractImplRecordVo.setCir_source(1);
        contractImplRecordVo.setCir_author(employee.getEm_id());
        contractImplRecordVo.setCir_createTime(new Date());
        contractObjectService.addHouseRecord(contractImplRecordVo);
        return msg.toString();
    }

    /**
     * 查询房源利润亏损记录，小计信息
     *
     * @param hi_code
     * @param pageNo
     * @param pageSize
     * @return
     */
    @RequestMapping("/queryGrossProfitRecord")
    public @ResponseBody
    String queryGrossProfitRecord(String hi_code, Integer data_state, Integer profitType, Integer pageNo, Integer pageSize) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(hi_code)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        HouseGrossProfitVo houseGrossProfitVo = new HouseGrossProfitVo();
        houseGrossProfitVo.setHi_code(hi_code);
        houseGrossProfitVo.setData_state(data_state);
        houseGrossProfitVo.setProfitType(profitType);
        Pagination<HouseGrossProfitVo> pagination = new Pagination<>(pageNo, pageSize, houseGrossProfitVo);
        pagination = houseLibraryService.queryGrossProfitByCode(pagination);
        msg.put("data", pagination);

        List<HouseGrossProfitVo> grossProfitList = houseLibraryService.queryGPSubtotalByCode(houseGrossProfitVo);
        msg.put("subtotalData", grossProfitList);

        return msg.toString();
    }

    /**
     * 毛利润子类型
     *
     * @param p_id
     * @return
     * @作者 shenhx
     * @日期 2018年5月19日
     */
    @RequestMapping("/queryGrossProfitList")
    public @ResponseBody
    String queryGrossProfitList(Integer p_id) {
        Msg<Object> msg = new Msg<>();
        HashMap<String, Object> map = new HashMap<>();
        if (StringUtils.isEmpty(p_id)) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        // 执行记录类型
        map.put("grossType", contractService.selectContractTypeByParentId(p_id));

        return msg.toString(map);
    }

    /**
     * 保存利润亏损记录
     *
     * @return
     */
    @RequestMapping("/addGrossProfitRecord")
    public @ResponseBody
    String addGrossProfitRecord(HttpServletRequest request, @RequestBody Map<String, Object> data) throws Exception {
        Msg<Object> msg = new Msg<>();

        HouseGrossProfitVo houseGrossProfitVo = JSONObject.parseObject((String) data.get("houseGrossProfitVo"), HouseGrossProfitVo.class);
        if (null == houseGrossProfitVo) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        houseGrossProfitVo.setEm_id(Integer.valueOf(AppUtil.getCookieEmployee("em_id")));
        houseLibraryService.addGrossProfit(houseGrossProfitVo);
        return msg.toString();
    }

    /**
     * 自动生成房源利润亏损支出记录
     *
     * @param request
     * @param hi_code
     * @return
     * @throws Exception
     */
    @RequestMapping("/genrateGrossProfit")
    public @ResponseBody
    String addGrossProfitRecord(HttpServletRequest request, String hi_code) throws Exception {
        Msg<Object> msg = new Msg<>();
        if (null == hi_code) {
            return msg.toError(Msg.MSG_PARAM_ERROR);
        }

        String profitExplainStrs = "";
        HouseGrossProfitVo houseGrossProfitVo = new HouseGrossProfitVo();
        houseGrossProfitVo.setHi_code(hi_code);
        houseGrossProfitVo.setData_state(1);
        List<HouseGrossProfitVo> grossProfitVos = houseLibraryService.queryGrossListByCode(houseGrossProfitVo);
        if (null != grossProfitVos && !grossProfitVos.isEmpty()) {
            for (HouseGrossProfitVo profitVo : grossProfitVos) {
                profitExplainStrs += profitVo.getProfitExplain() + "&";
            }
        }

        ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
        contractVo.setHi_code(hi_code);
        List<ViewBusinessContractVo> businessContractVoList = contractObjectService.queryContractNotObsolute(contractVo);
        for (ViewBusinessContractVo businessContractVo : businessContractVoList) {
            Integer contract_state = businessContractVo.getContractObject_State().intValue();
            if (AppConfig.con_state_1 == contract_state || AppConfig.con_state_4 == contract_state) {
                continue;
            }
            // 免租期
            if (AppConfig.TYPE_CONTRACT_201.equals(businessContractVo.getContractObject_Type()) && !profitExplainStrs.contains("2701")) {

                houseLibraryService.addGrossProfitOfFreeTime(businessContractVo.getHi_code(), businessContractVo.getContractObject_Code());

            } else if (AppConfig.TYPE_CONTRACT_202.equals(businessContractVo.getContractObject_Type())) {

                if (!profitExplainStrs.contains("2702")) {
                    // 租金溢价
                    houseLibraryService.addProfeitRentPremium(businessContractVo.getHi_code(), businessContractVo.getContractObject_Code());
                }
                if (!profitExplainStrs.contains("2706")) {
                    // 服务费利润添加
                    houseLibraryService.addGrossProfitOfService(businessContractVo.getHi_code(), businessContractVo.getContractObject_Code());
                }
                if (!profitExplainStrs.contains("2801")) {
                    // 空置期亏损
                    houseLibraryService.addGrossProfitOfVacancy(businessContractVo.getHi_code(), businessContractVo.getContractObject_Code());
                }
            }

            // 合约
            if (!profitExplainStrs.contains("2703") && !profitExplainStrs.contains("2704") && !profitExplainStrs.contains("2705")
                    && !profitExplainStrs.contains("2711") && !profitExplainStrs.contains("2803")) {

                try {
                    houseLibraryService.addSettleAccounts(businessContractVo.getHi_code(), businessContractVo.getContractObject_Code());
                } catch (AppException e) {
                    System.out.println("该合同没有合约订单");
                    continue;
                }
            }
        }

        if (!profitExplainStrs.contains("2709")) {
            // 定金违约
            FinanceDownPaymentVo financeDownPaymentVo = new FinanceDownPaymentVo();
            financeDownPaymentVo.setFdp_status(AppConfig.fdp_status_4);
            financeDownPaymentVo.setHi_code(hi_code);
            List<FinanceDownPaymentVo> financeDownPaymentList = orderService.queryFinanceDownPaymentList(financeDownPaymentVo);
            if (null != financeDownPaymentList && !financeDownPaymentList.isEmpty()) {
                for (FinanceDownPaymentVo downPaymentVo : financeDownPaymentList) {

                    // 保存房源定金违约收入
                    houseLibraryService.addDownPayment(downPaymentVo);
                }
            }
        }

        return msg.toString();
    }

}
