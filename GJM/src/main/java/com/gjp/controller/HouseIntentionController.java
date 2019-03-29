package com.gjp.controller;

import com.alibaba.fastjson.JSONObject;
import com.gjp.model.Company;
import com.gjp.model.*;
import com.gjp.service.*;
import com.gjp.util.*;
import com.gjp.util.upload.URLUploadImage;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author 陈智颖
 * @version 创建时间：2016年4月20日 下午3:10:45
 */
@Controller
@RequestMapping("/intention")
public class HouseIntentionController {

    // 意向房源
    @Resource
    private HouseIntentionService houseIntentionService;

    // 物业信息
    @Resource
    private PropertyInfoService propertyInfoService;

    // 用户表
    @Resource
    private UserCenterEmployeeService userCenterEmployeeService;

    // 物业父子级
    @Resource
    private PropertyInfoNameService propertyInfoNameService;

    // 房源品牌
    @Resource
    private HouseHouseBrandService houseHouseBrandService;

    // 推荐群体
    @Resource
    private HoseRecommendGroupService hoseRecommendGroupService;

    // 图片信息
    @Resource
    private HouseImageService uploadHouseImageService;

    // 房屋图片类型
    @Resource
    private HouseImageTypeService houseImageTypeService;

    // 支付订单
    @Resource
    private ReserveBillService reserveBillService;

    @Resource
    private HouseInformationStateService houseInformationStateService;

    // 客户信息
    @Resource
    private CustomerService customerService;

    // 内部人员
    @Resource
    private AuthorizationService authorizationService;

    /**
     * 剪切用户头像
     *
     * @param request
     * @param src
     * @param x
     * @param y
     * @param response
     * @throws IOException
     */
    @RequestMapping("cutUserPic")
    @ResponseBody
    public String cutUserPic(HttpServletRequest request, String src, int x, int y, int width, int height, HttpServletResponse response) throws IOException {
        Msg<Object> msg = new Msg<>();
        // 验证session路径是否存在
        String srcPic = (String) AppUtil.getSession("UserPicSrc");
        if (StringUtils.isEmpty(srcPic)) {
            msg.setCode(110);
            msg.setMsg("请选择图片");
            return msg.toString();
        }
        String path = null;
        // 验证用户头像正式目录
        String imgFile = request.getSession().getServletContext().getRealPath(path);
        File upFile = new File(imgFile);
        /** 根据真实路径创建目录 **/
        if (!upFile.exists()) {
            upFile.mkdirs();
        }
        // 验证查询出路径图片名称
        String srcPicName = srcPic.substring(srcPic.lastIndexOf("/") + 1);
        String outFile = imgFile + "/" + srcPicName;
        boolean boo = AppUtil.cutZoomPic(srcPic, outFile, x, y, width, height, 110, 110, true);
        if (!boo) {
            msg.setCode(110);
            msg.setMsg("保存头像失败，请重试");
            return msg.toString();
        }
        // 删除缓存文件
        AppUtil.delFile(srcPic);
        // 清空头像src session
        AppUtil.removeSession("UserPicSrc");
        msg.setMsg("保存成功");
        return msg.toString();
    }

    /**
     * 上传原始图片
     *
     * @param request
     * @param response
     * @param file
     * @return 刘强
     */
    @RequestMapping("/upload")
    @ResponseBody
    public void upload(HttpServletRequest request, HttpServletResponse response, @RequestParam("file5") MultipartFile file, String elementIds) throws ServletException, IOException {
        String savePath = request.getSession().getServletContext().getRealPath("/") + "resources/image/upload";
        String FileName = null;
        if (!file.isEmpty()) {
            Date currTime = new Date();
            SimpleDateFormat formatter2 = new SimpleDateFormat("yyyyMMddhhmmssS", Locale.US);
            FileName = new String((formatter2.format(currTime)).getBytes("iso-8859-1"));
            // 获取文件名称
            String filename = file.getOriginalFilename();
            // 后缀
            String filetype = filename.substring(filename.lastIndexOf("."));
            // 文件名称+后缀
            FileName = FileName + Randoms.randoms() + "" + filetype;
        }
        // 输入流
        InputStream inputStream = file.getInputStream();
        // 输入流路径
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
     * 房源品牌
     *
     * @param request
     * @return
     * @author 刘强
     */
    @RequestMapping("/fangyuangenjinjichu")
    @ResponseBody
    public Map<String, Object> fangyuangenjinjichu(HttpServletRequest request, HttpServletResponse response) {
        List<HouseHouseBrand> list = houseHouseBrandService.selectHouseHouseBrandList();
        List<HoseRecommendGroup> selectHoseRecommendGroupList = hoseRecommendGroupService.selectHoseRecommendGroupList();
        Map<String, Object> map = new HashMap<>();
        map.put("houseHouseBrandList", list);
        map.put("hoseRecommendGroupList", selectHoseRecommendGroupList);
        return map;
    }

    /**
     * 房源品牌
     *
     * @param request
     * @param response
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/houseBrandList")
    @ResponseBody
    public Map<String, Object> houseBrandList(HttpServletRequest request, HttpServletResponse response) {
        List<HouseHouseBrand> houseBrandList = houseHouseBrandService.selectHouseHouseBrandList();
        Map<String, Object> map = new HashMap<>();
        if (houseBrandList.isEmpty()) {
            map.put("message", "error");
        } else {
            map.put("message", "success");
            map.put("houseBrandList", houseBrandList);
        }
        return map;
    }

    /**
     * 推荐群体
     *
     * @param request
     * @param response
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/houseRecommendGroupList")
    @ResponseBody
    public Map<String, Object> houseRecommendGroupList(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();
        List<HoseRecommendGroup> houseRecommendGroupList = hoseRecommendGroupService.selectHoseRecommendGroupList();
        if (houseRecommendGroupList.isEmpty()) {
            map.put("message", "error");
        } else {
            map.put("message", "success");
            map.put("houseRecommendGroupList", houseRecommendGroupList);
        }
        return map;
    }

    /**
     * 意向房源跟进记录
     *
     * @param request
     * @return
     * @author 刘强
     */
    @RequestMapping("/selectFollow")
    @ResponseBody
    public Map<String, Object> selectFollow(HttpServletRequest request, HttpServletResponse response, Integer MDID, String em_id) {
        UserCenterEmployee employee = new UserCenterEmployee();
        employee.setEm_account(em_id);
        employee = userCenterEmployeeService.selectAccount(employee).get(0);
        if (MDID != null) {
            Map<String, Object> map = new HashMap<>();
            HouseIntention hi = new HouseIntention();
            hi.setPhi_id(MDID);
            hi.setEm_id(employee.getEm_id());
            List<HouseFollow> hF = houseIntentionService.selectHouseIntentiongzjl(hi);
            if (!hF.isEmpty()) {
                for (HouseFollow houseFollow : hF) {
                    UserCenterEmployee selectUserCenterEmployeeById = userCenterEmployeeService.selectUserCenterEmployeeById(houseFollow.getEm_id());
                    houseFollow.setEm_name(selectUserCenterEmployeeById.getEm_name());
                }
                map.put("message", "success");
                map.put("houseFollows", hF);
                return map;
            } else {
                map.put("message", "error");
                return map;
            }
        }
        return null;
    }

    /**
     * 跳转添加,跟进意向房源
     *
     * @param request
     * @return updataHouseIntention 添加页面
     * @author 刘强
     */
    @RequestMapping(value = "/jumpAddIntention")
    @ResponseBody
    public Map<String, Object> jumpAddIntention(HttpServletRequest request, HttpServletResponse response, Integer phi_id) {
        Map<String, Object> map = new HashMap<>();
        if (phi_id != null) {
            HouseIntention houseIntention = new HouseIntention();
            houseIntention.setPhi_id(phi_id);
            HouseIntention hi = houseIntentionService.queryHouseIntentionID(houseIntention);// 意向房源
            if (hi != null) {
                ReserveBill reserveBill = reserveBillService.selectReserveBillCode(hi.getHi_code());// 定金或诚意金，金额，是否支付
                HouseIntentionType houseIntentionType = new HouseIntentionType();
                houseIntentionType.setHi_code(hi.getHi_code());
                List<HouseIntentionType> ht = houseIntentionService.selectHouseIntentionType(houseIntentionType);// 意向房源跟进内容记录详情

                PropertyInfo propertyInfo = new PropertyInfo();
                propertyInfo.setPropertyInfo_Id(hi.getPropertyInfo_Id());
                PropertyInfo queryPropertyInfoID = propertyInfoService.queryPropertyInfoID(propertyInfo);// 物业
                List<HouseFollow> hF = houseIntentionService.selectHouseIntentiongzjl(hi);// 意向跟踪记录

                updateHouseTypeInteger(hi);// 意向房源进度数字化

                if (hi.getRecommendGroup_Id() != null && !hi.getRecommendGroup_Id().trim().equals("")) {
                    List<HoseRecommendGroup> listRemend = houseIntentionService.selectHoseRecommendGroup(houseIntention);
                    String rName = "";
                    String[] ids = hi.getRecommendGroup_Id().split(",");
                    for (int i = 0; i < ids.length; i++) {
                        if (ids[i] != null && !ids[i].trim().equals("")) {
                            for (int j = 0; j < listRemend.size(); j++) {
                                if (Integer.parseInt(ids[i]) == listRemend.get(j).getRecommendGroup_Id()) {
                                    rName = rName + listRemend.get(j).getRecommendGroup_Name() + ",";
                                }
                            }
                        }
                    }

                    hi.setRecommend_name(rName.substring(0, rName.length() - 1));
                }

                HouseIntentionImage intentionImage = new HouseIntentionImage();
                intentionImage.setHi_code(hi.getHi_code());
                List<HouseIntentionImage> houseIntentionImages = houseIntentionService.queryHouseImageList(intentionImage);// 意向房源图片
                if (houseIntentionImages != null && houseIntentionImages.size() > 0) {
                    for (HouseIntentionImage image : houseIntentionImages) {
                        image.setHim_path(OSSparameter.imagePath(image.getHim_path(), null, null));
                    }
                    hi.setImageNum(houseIntentionImages.size());
                } else {
                    hi.setImageNum(0);
                }

                // 查询推荐群体
                List<HoseRecommendGroup> ru = hoseRecommendGroupService.selectHoseRecommendGroupList();
                List<HouseInformationState> hb = houseInformationStateService.selectHouseInformationStateSpid();

                map.put("hImage", houseIntentionImages);
                map.put("hF", hF);
                map.put("queryPropertyInfoID", queryPropertyInfoID);
                map.put("hi", hi);
                map.put("rb", reserveBill);
                map.put("ht", ht);
                map.put("ru", ru);// 推荐群体
                map.put("hb", hb);// 房源品牌
            }
        }
        return map;
    }

    /**
     * 意向房源信息信息
     *
     * @param response
     * @param phi_id   意向房源编码
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/jumpAddIntentionAjax")
    @ResponseBody
    public Map<String, Object> jumpAddIntentionAjax(HttpServletResponse response, Integer phi_id) {

        // 跨域传输json
        //response.addHeader("Access-Control-Allow-Origin", "*");

        Map<String, Object> map = new HashMap<>();

        if (phi_id != null) {
            HouseIntention houseIntention = new HouseIntention();
            houseIntention.setPhi_id(phi_id);
            HouseIntention hi = houseIntentionService.queryHouseIntentionID(houseIntention);
            if (hi != null) {
                ReserveBill reserveBill = reserveBillService.selectReserveBillCode(hi.getHi_code());
                HouseIntentionType houseIntentionType = new HouseIntentionType();
                String str = "";
                if (hi.getRecommendGroup_Id() != null && !hi.getRecommendGroup_Id().equals("")) {
                    String[] split = hi.getRecommendGroup_Id().split(",");
                    for (int i = 0; i < split.length; i++) {
                        if (split[i] != null && !split[i].trim().equals("")) {
                            HoseRecommendGroup hoseRecommendGroup = hoseRecommendGroupService.selectHoseRecommendGroupById(Integer.valueOf(split[i]));
                            str += hoseRecommendGroup.getRecommendGroup_Name() + ",";
                        }
                    }
                    str = str.substring(0, str.length() - 1);
                    hi.setRecommend_name(str);
                }

                HouseIntentionImage intentionImage = new HouseIntentionImage();
                intentionImage.setHi_code(hi.getHi_code());
                List<HouseIntentionImage> houseIntentionImages = houseIntentionService.queryHouseImageList(intentionImage);// 意向房源图片
                List<ImageFile> imageFiles = new ArrayList<>();
                for (HouseIntentionImage houseIntentionImage : houseIntentionImages) {
                    ImageFile imageFile = new ImageFile();
                    imageFile.setUrl(OSSparameter.imagePath(houseIntentionImage.getHim_path()));
                    imageFile.setKey(houseIntentionImage.getHim_path());
                    imageFiles.add(imageFile);
                }
                if (houseIntentionImages != null && houseIntentionImages.size() > 0) {
                    for (HouseIntentionImage houseIntentionImage : houseIntentionImages) {
                        houseIntentionImage.setHim_path(OSSparameter.imagePath(houseIntentionImage.getHim_path(),null,null));
                    }
                    hi.setImageNum(houseIntentionImages.size());
                } else {
                    hi.setImageNum(0);
                }

                houseIntentionType.setHi_code(hi.getHi_code());
                List<HouseIntentionType> ht = houseIntentionService.selectHouseIntentionType(houseIntentionType);

                List<HouseFollow> hF = houseIntentionService.selectHouseIntentiongzjl(hi);
                UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();
                map.put("cookieEmployee", cookieEmployee);
                map.put("hF", hF);
                map.put("hi", hi);
                map.put("rb", reserveBill);
                map.put("img", imageFiles);
                map.put("ht", ht);
                map.put("houseIntentionImages", houseIntentionImages);

            }
        }
        return map;
    }

    /**
     * 跳转跟进意向房源
     *
     * @param request
     * @return updataHouseIntention 跟进页面
     * @author 刘强
     */
    @RequestMapping(value = "/genjinIntention")
    public ModelAndView followUp(HttpServletRequest request, HttpServletResponse response) {
        ModelAndView modelAndView = new ModelAndView("/intention/followUp");
        return modelAndView;
    }

    /**
     * 跳转意向房源主页面
     *
     * @param request
     * @return
     * @author 刘强
     */
    @RequestMapping("/houseIntention")
    public String houseIntention(HttpServletRequest request) {
        return "/intention/houseIntention";
    }

    /**
     * 查询自己所有意向房源并分页显示
     *
     * @return
     * @throws ParseException
     * @account 内部人员账号
     * @author 陈智颖
     */
    @RequestMapping("/selectHouseIntentionByEm")
    @ResponseBody
    public Map<String, Object> selectHouseIntentionByEm(TableList tableList1, String types) throws ParseException {

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
        UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();
        if (types == null || types.equals("myHouse")) {
            houseModel.setEm_id(cookieEmployee.getEm_id());
        } else if (types.equals("departmentHouse")) {
            Company company = new Company();
            company.setEm_id(cookieEmployee.getEm_id());
            Company company2 = authorizationService.selectCompanyEmid(company).get(0);
            houseModel.setUcc_id(company2.getUcc_id());
        }
        houseModel.setDateTitle(tableList.getDateType());

        if (tableList.getOrderBy() != null && !tableList.getOrderBy().equals("")) {
            houseModel.setSqlOrderBy("order by " + tableList.getOrderBy() + " asc");
        } else {
            houseModel.setSqlOrderBy("order by phi_new_addTime desc");
        }
        // 装载数据类
        DataList<HouseIntention> datalist = new DataList<HouseIntention>();
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        // 查询分页实体
        PageModel<HouseIntention> pageModel = houseIntentionService.queryHouseIntentionEMXiangXi(tableList.getPageNo(), pageSize, houseModel);
        // 处理特殊数据
        List<HouseIntention> list = new ArrayList<HouseIntention>();
        for (HouseIntention houseIntention1 : pageModel.getList()) {
            String name = houseIntention1.getPhi_name();
            if (houseIntention1.getBuildType() != null && houseIntention1.getBuildType() == "公盘") {
                name = "<img alt='' src='/resources/houseImage/image-public.png' style='margin-bottom: -4px;'> " + name;
            } else if (houseIntention1.getBuildType() != null && houseIntention1.getBuildType() == "私盘") {
                name = "<img alt='' src='/resources/houseImage/image-private.png' style='margin-bottom: -4px;'> " + name;

            } else if (houseIntention1.getBuildType() != null && houseIntention1.getBuildType() == "封盘") {
                if (houseIntention1.getPhi_type() != null && houseIntention1.getPhi_type() == "存房失败") {
                    name = "<img alt='' src='/resources/houseImage/image-lose.png' style='margin-bottom: -4px;' > " + name;
                } else {
                    name = "<img alt='' src='/resources/houseImage/image-feng.png' style='margin-bottom: -4px;'> " + name;
                }
            } else if (houseIntention1.getBuildType() != null && houseIntention1.getBuildType() == "保护") {
                name = "<img alt='' src='/resources/houseIhouseIntention1.getBuildType()ect.png' style='margin-bottom: -4px;' > " + name;
            } else {
                name = "<img alt='' src='/resources/houseImage/image-public.png' style='margin-bottom: -4px;'> " + name;
            }
            houseIntention1.setPhi_name(name);
            list.add(houseIntention1);
        }
        // 装载数据
        Map<String, Object> map = datalist.dataList(list, tableList.getPageNo(), pageSize, pageModel.getTotalRecords(), pageModel.getSumMoney());
        return map;
    }

    /**
     * 查询自己的意向房源并分页显示
     *
     * @param response
     * @param account  账号
     * @param wheres   条件
     * @param start    开始查询数
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/houseIntentionEM")
    @ResponseBody
    public Map<String, Object> houseIntentionEM(HttpServletResponse response, String account, String wheres, Integer start) {

        response.addHeader("Access-Control-Allow-Origin", "*");

        Map<String, Object> map = new HashMap<>();
        UserCenterEmployee employee = new UserCenterEmployee();
        employee.setEm_account(account);
        employee = userCenterEmployeeService.selectAccount(employee).get(0);

        HouseIntention houseIntention = new HouseIntention();
        houseIntention.setEm_id(employee.getEm_id());
        houseIntention.setStart(start);
        houseIntention.setEnd(start + 10);
        if (wheres != null && !wheres.equals("")) {
            houseIntention.setPhi_name(wheres);
            houseIntention.setPropertyInfo_Name(wheres);
        }
        List<HouseIntention> houseIntentions = houseIntentionService.queryHouseIntentionEM(houseIntention);
        if (houseIntentions.isEmpty()) {
            map.put("message", "error");
        } else {
            map.put("message", "success");
            map.put("houseIntentions", houseIntentions);
        }

        return map;
    }

    /**
     * 查询房屋来源
     *
     * @param name 字段名称
     * @return
     * @Description:
     * @author JiangQt
     */
    @RequestMapping("/queryHouseSource")
    @ResponseBody
    public Map<String, Object> queryHouseSource(HttpServletResponse response, String name) {
        // 跨域传输
        response.addHeader("Access-Control-Allow-Origin", "*");
        Map<String, Object> map = new HashMap<>();
        String queryHouseIntentionSource = houseIntentionService.queryHouseIntentionSource(name);
        if (!StringUtils.isEmpty(queryHouseIntentionSource)) {
            map.put("message", "success");
            map.put("source", queryHouseIntentionSource);
            return map;
        } else {
            map.put("message", "error");
            return map;
        }
    }

    /**
     * 根据意向房源编码查询意向房源
     *
     * @param response
     * @param phi_id   意向房源编码
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/selectHouseIntention")
    @ResponseBody
    public Map<String, Object> selectHouseIntention(HttpServletResponse response, Integer phi_id) {

        // 跨域传输
        response.addHeader("Access-Control-Allow-Origin", "*");

        Map<String, Object> map = new HashMap<>();

        HouseIntention houseIntention = new HouseIntention();
        houseIntention.setPhi_id(phi_id);
        HouseIntention houseIntentions = houseIntentionService.queryHouseIntentionID(houseIntention);
        if (houseIntentions == null) {
            map.put("message", "error");
            return map;
        }
        if (houseIntentions.getHb_id() != null) {
            HouseHouseBrand houseBrand = houseHouseBrandService.selectHouseHouseBrandById(houseIntentions.getHb_id());
            map.put("houseBrand", houseBrand);
        }
        if (houseIntentions.getRecommendGroup_Id() != null) {
            String[] split = houseIntentions.getRecommendGroup_Id().split(",");
            List<HoseRecommendGroup> houseRecommendGroupList = new ArrayList<HoseRecommendGroup>();
            for (int i = 0; i < split.length; i++) {
                HoseRecommendGroup hoseRecommendGroup = hoseRecommendGroupService.selectHoseRecommendGroupById(Integer.parseInt(split[i]));
                houseRecommendGroupList.add(hoseRecommendGroup);
            }
            map.put("houseRecommendGroupList", houseRecommendGroupList);
        }
        // 查询物业信息
        PropertyInfoName propertyInfoNameOne = propertyInfoNameService.findpropertyInfoToSuperId(houseIntentions.getPropertyInfo_Id());
        List<PropertyInfoName> propertyInfoName = propertyInfoNameService.findpropertyInfoBySuperId(propertyInfoNameOne.getUpn_sid());
        for (PropertyInfoName propertyInfoName2 : propertyInfoName) {
            String strName = propertyInfoNameOne.getUpn_sname();
            String code = propertyInfoNameOne.getUpn_code();
            if (code != null && !code.equals("null")) {
                String[] splitCode = code.split("-");
                if (splitCode.length > 1) {
                    String codeStr = splitCode[0];
                    Boolean bool = false;
                    for (int i = 0; i < splitCode.length; i++) {
                        if (bool) {
                            codeStr += "-" + splitCode[i];
                            bool = false;
                        }
                        for (PropertyInfoName propertyInfoName3 : propertyInfoName) {
                            if (propertyInfoName2.getUpn_sid() == propertyInfoName3.getUpn_sid()) {
                                if (propertyInfoName3.getUpn_code().equals(codeStr)) {
                                    strName += propertyInfoName3.getUpn_name();
                                    bool = true;
                                }
                            }
                        }
                    }
                } else if (splitCode.length > 0) {
                    strName += propertyInfoName2.getUpn_name();
                }
            }
            houseIntentions.setPropertyInfo_Name(strName);
        }
        // 查询意向房源图片
        HouseImageType houseImageType = new HouseImageType();
        houseImageType.setPhi_id(houseIntentions.getPhi_id());
        List<HouseImageType> houseImage = houseImageTypeService.queryAllHouseImage(houseImageType);
        if (!houseImage.isEmpty()) {
            map.put("houseImage", houseImage);
        }

        ReserveBill reserveBillCode = reserveBillService.selectReserveBillCode(houseIntentions.getHi_code());
        if (houseImage != null) {
            map.put("reserveBillCode", reserveBillCode);
        }

        if (houseIntentions.getPhi_type().equals("完成")) {
            map.put("message", "stop");
        } else {
            map.put("message", "success");
            map.put("houseIntentions", houseIntentions);
        }
        return map;
    }

    /**
     * 手机上传图片事件
     *
     * @param request
     * @param response
     * @throws Exception
     */
    @RequestMapping("/appUpload")
    @ResponseBody
    public Map<String, Object> appUpload(HttpServletRequest request, HttpServletResponse response, @RequestParam("file") MultipartFile file) throws Exception {

        Map<String, Object> map = new HashMap<>();

        String savePath = request.getSession().getServletContext().getRealPath("/resources/image/");
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

        // 获取properties路劲
        String path = this.getClass().getResource("/conf/path.properties").getPath();
        // 把properties文件转化输出流
        InputStream in = new BufferedInputStream(new FileInputStream(path));
        Properties properties = new Properties();
        properties.load(in);
        //
        String imagePath = properties.getProperty("houseImagePaths");
        // 上传到ftp服务器哪个路径下
        String paths = properties.getProperty("housePaths");
        // 地址
        String addrs = properties.getProperty("houseAddrs");
        // 端口号
        int ports = Integer.parseInt(properties.getProperty("housePorts"));
        // 用户名
        String usernames = properties.getProperty("houseUsernames");
        // 密码
        String passwords = properties.getProperty("housePasswords");
        // 本地路径
        String locals = savePath + "/" + FileName;
        URLUploadImage.run(paths, addrs, ports, usernames, passwords, locals);

        new File(locals).delete();
        ImageUpload imageUpload = new ImageUpload();
        imageUpload.setCode("1");
        imageUpload.setPath(paths);
        map.put("imagePath", imagePath + "/" + FileName);

        return map;
    }

    /**
     * 根据账号查询用户
     *
     * @param account 用户账号
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/userTable")
    @ResponseBody
    public Map<String, Object> userTable(String account) {

        Map<String, Object> map = new HashMap<>();

        UserCenterEmployee employee = new UserCenterEmployee();
        employee.setEm_account(account);
        employee = userCenterEmployeeService.selectAccount(employee).get(0);
        if (employee != null) {
            map.put("message", "success");
            map.put("employee", employee);
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 意向房源跟进支付
     *
     * @param reserveBill
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/insertReserveBill")
    @ResponseBody
    public Map<String, Object> insertReserveBill(ReserveBill reserveBill) {

        Map<String, Object> map = new HashMap<>();
        ReserveBill reserveBillCode = reserveBillService.selectReserveBillCode(reserveBill.getRb_houseNum());
        boolean bool = false;
        if (reserveBillCode == null) {
            reserveBill.setRb_number(AppUtil.getOrderCode("200")); // 预定单号
            reserveBill.setRb_stateType(1);
            bool = houseIntentionService.addReserveBill(reserveBill);

        } else {
            map.put("message", "repeat");
            return map;
        }
        if (bool) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 意向房源录入（添加）
     *
     * @param houseIntention
     * @param request
     * @return
     * @author zoe
     */
    @RequestMapping("/addInitqs")
    @ResponseBody
    public Map<String, Object> addInitqs(HouseIntention houseIntention, HttpServletRequest request, String path, HouseInformationStateRelation houseInformationStateRelation, HouseIntentionType houseIntentionType, String beginTime, String endTime, UserCustomer userCustomer, Integer em_id) {
        Map<String, Object> map = new HashMap<>();
        if (em_id == null) {
            UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();
            em_id = cookieEmployee.getEm_id();
        }
        try {
            // 返回已添加的意向房源
            if (AppUtil.isNotNull(houseIntention.getPhi_id())) {
                HouseIntention houseIntention2 = houseIntentionService.queryHouseIntentionID(houseIntention);
                map.put("hicode", houseIntention2.getHi_code());
            }
            // 房源优势数据格式处理
            if (AppUtil.isNotNull(houseIntention.getHi_function())) {
                String s = st(houseIntention.getHi_function());
                houseIntention.setHi_function(s);
            }
            // 房源配置数据格式处理
            if (AppUtil.isNotNull(houseIntention.getHi_project())) {
                houseIntention.setHi_project(st(houseIntention.getHi_project()));
            }
            // 推荐群体数据格式处理
            if (AppUtil.isNotNull(houseIntention.getRecommendGroup_Id())) {
                houseIntention.setRecommendGroup_Id(st(houseIntention.getRecommendGroup_Id()));
            }

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            if (AppUtil.isNotNull(beginTime)) {
                houseIntention.setPhi_beginTime(sdf.parse(beginTime));
            }
            if (!StringUtils.isEmpty(endTime)) { // 参照一下这个为空判断，你上面那个太复杂了
                houseIntention.setPhi_endTime(sdf.parse(endTime));
            }

            // 添加客户
            if (AppUtil.isNotNull(houseIntention.getPhi_user())) {
                UserCustomer customer = new UserCustomer();
                customer.setCc_name(houseIntention.getPhi_user());
                customer.setCcp_phone(houseIntention.getPhi_phone());
                customer.setCc_createTime(new Date());
                customer.setCc_em_id(em_id);
                customer.setCc_type("房东");
                // shenhx 20170512 前端传入的性别为0-女士；1-先生
                if (houseIntention.getPhi_user_sex().equals("女士")) {
                    customer.setCc_sex(0);
                } else if (houseIntention.getPhi_user_sex().equals("先生")) {
                    customer.setCc_sex(1);
                }
                if (AppUtil.isNotNull(houseIntention.getCc_code())) {
                    customer.setCc_code(houseIntention.getCc_code());
                }else{
                    customer.setCc_code(AppUtil.getOrderCode("CUS"));
                }
                customer.setCc_state(2);// 意向客户

                String cc_code = "";
               /* if ("房源录入".equals(houseIntention.getPhi_type())) {
                    cc_code = AppUtil.getOrderCode("CUS");
                    UserCustomerIntention userCustomerIntention = new UserCustomerIntention();
                    userCustomerIntention.setCc_name(houseIntention.getPhi_user());
                    userCustomerIntention.setCcp_phone(houseIntention.getPhi_phone());
                    userCustomerIntention.setCc_sex("女士".equals(houseIntention.getPhi_user_sex()) ? "0" : "先生".equals(houseIntention.getPhi_user_sex()) ? "1" : "");// 1-男；0-女
                    userCustomerIntention.setCc_em_id(em_id);
                    userCustomerIntention.setCc_type(1);// 意向房东
                    userCustomerIntention.setContact_time(new Date());
                    userCustomerIntention.setFollow_status(1);// 预约
                    userCustomerIntention.setContact_remark("出租" + houseIntention.getHi_houseS() + "室" + houseIntention.getHi_houseT() + "厅");
                    userCustomerIntention.setCustomer_need("出租" + houseIntention.getHi_houseS() + "室" + houseIntention.getHi_houseT() + "厅");
                    userCustomerIntention.setCc_code(cc_code);
                    customerService.addCustomerIntention(userCustomerIntention);

                    customer.setCc_code(cc_code);

                    // 保存客户日志
                    UserCustomerLog customerLog = new UserCustomerLog();
                    customerLog.setCc_code(cc_code);
                    customerLog.setCl_type(75);// 預約
                    customerLog.setCl_content("出租" + houseIntention.getHi_houseS() + "室" + houseIntention.getHi_houseT() + "厅");
                    customerLog.setCl_author(em_id);
                    customerLog.setCl_source(2);// 系统添加
                    customerLog.setCl_createTime(new Date());
                    customerService.addUserCustomerLog(customerLog);
                } else {*/
//					cc_code = insertCustomerOne(customer);
                    cc_code = addCustomerOne(customer);
                /*}*/

                if (cc_code != null && cc_code != "") {
                    houseIntention.setCc_code(cc_code);// 客户（房东）唯一编码
                }
            }

            // 意向房源添加或修改
            if (AppUtil.isNotNull(houseIntention.getPhi_type())) {
                map = houseIntentionService.addHouseIntentionSubmit(request, houseIntention, em_id, path);
            }

            // 房源品牌添加
			/*if (houseInformationStateRelation != null && houseInformationStateRelation.getHis_id() != null && !houseInformationStateRelation.getHis_id().toString().trim().equals("")) {
				houseInformationStateService.addHouseInformationStateRelation(houseInformationStateRelation);
			}*/

            // 查询该意向房源的信息
            if (AppUtil.isNotNull(houseIntention.getPhi_id())) {
                houseIntention.setPhi_id(houseIntention.getPhi_id());
                HouseIntention hi = houseIntentionService.queryHouseIntentionID(houseIntention);// 意向房源
                if (hi != null) {
                    ReserveBill reserveBill = reserveBillService.selectReserveBillCode(hi.getHi_code());// 定金或诚意金，金额，是否支付
                    updateHouseTypeInteger(hi);// 意向房源进度数字化
                    StringRecommendName(hi);// 意向房源推荐群体Name化
                    HouseIntentionImage intentionImage = new HouseIntentionImage();
                    intentionImage.setHi_code(hi.getHi_code());
                    List<HouseIntentionImage> houseIntentionImages = houseIntentionService.queryHouseImageList(intentionImage);// 意向房源图片
                    if (houseIntentionImages != null && houseIntentionImages.size() > 0) {
                        hi.setImageNum(houseIntentionImages.size());
                    } else {
                        hi.setImageNum(0);
                    }
                    map.put("hImage", houseIntentionImages);
                    map.put("hi", hi);
                    map.put("rb", reserveBill);
                }
            }

            // // 查询推荐群体
            // List<HoseRecommendGroup> ru =
            // hoseRecommendGroupService.selectHoseRecommendGroupList();
            // // 查询房源品牌
            // //List<HouseHouseBrand> hb =
            // houseHouseBrandService.selectHouseHouseBrandList();
            // List<HouseInformationState> hb
            // =houseInformationStateService.selectHouseInformationStateSpid();

            houseIntentionType.setHi_code(houseIntention.getHi_code());
            List<HouseIntentionType> ht = houseIntentionService.selectHouseIntentionType(houseIntentionType);

            map.put("ht", ht);
            // json.put("u", ru);
            // json.put("hb", hb);
            // json.put("em_id", employee.getEm_account());
            // json.put("hids", houseIntention.getPhi_id());

        } catch (Exception e) {
            e.printStackTrace();
        }
        return map;
    }

    @RequestMapping("/addInit")
    @ResponseBody
    public Map<String, Object> addInit(String result, String path, HouseInformationStateRelation houseInformationStateRelation, HouseIntentionType houseIntentionType, String beginTime, String endTime, UserCustomer userCustomer, Integer em_id) {
        UserCustomerIntention userCustomerIntention = JSONObject.parseObject(result, UserCustomerIntention.class);
        Map<String, Object> map = new HashMap<>();
        if (em_id == null) {
            UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();
            em_id = cookieEmployee.getEm_id();
        }
        int bool = 0;
        String code = AppUtil.getOrderCode("CUS");   //唯一编码
        userCustomerIntention.setCc_code(code);
        userCustomerIntention.setCc_sex("女士".equals(userCustomerIntention.getCc_sex()) ? "0" : "先生".equals(userCustomerIntention.getCc_sex()) ? "1" : "");// 1-男；0-女
        userCustomerIntention.setCc_type(1);
        userCustomerIntention.setCc_em_id(em_id);
        userCustomerIntention.setContact_remark(userCustomerIntention.getCustomer_need());
        userCustomerIntention.setContact_time(new Date());
        bool = customerService.addCustomerIntention(userCustomerIntention);

        // 保存客户日志
        UserCustomerLog customerLog = new UserCustomerLog();
        customerLog.setCc_code(code);
        customerLog.setCl_type(75);// 預約
        customerLog.setCl_content(userCustomerIntention.getCustomer_need());
        customerLog.setCl_author(em_id);
        customerLog.setCl_source(2);// 系统添加
        customerLog.setCl_createTime(new Date());
        bool = customerService.addUserCustomerLog(customerLog);
        if (bool > 0) {
            map.put("message", "success");
        }

        HouseIntention houseIntention = new HouseIntention();
        /*try {
			// 返回已添加的意向房源
			if (AppUtil.isNotNull(houseIntention.getPhi_id())) {
				HouseIntention houseIntention2 = houseIntentionService.queryHouseIntentionID(houseIntention);
				json.put("hicode", houseIntention2.getHi_code());
			}
			// 房源优势数据格式处理
			if (AppUtil.isNotNull(houseIntention.getHi_function())) {
				String s = st(houseIntention.getHi_function());
				houseIntention.setHi_function(s);
			}
			// 房源配置数据格式处理
			if (AppUtil.isNotNull(houseIntention.getHi_project())) {
				houseIntention.setHi_project(st(houseIntention.getHi_project()));
			}
			// 推荐群体数据格式处理
			if (AppUtil.isNotNull(houseIntention.getRecommendGroup_Id())) {
				houseIntention.setRecommendGroup_Id(st(houseIntention.getRecommendGroup_Id()));
			}

			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			if (AppUtil.isNotNull(beginTime)) {
				houseIntention.setPhi_beginTime(sdf.parse(beginTime));
			}
			if (!StringUtils.isEmpty(endTime)) { // 参照一下这个为空判断，你上面那个太复杂了
				houseIntention.setPhi_endTime(sdf.parse(endTime));
			}
			// 添加客户
			if (AppUtil.isNotNull(houseIntention.getPhi_user())) {
				UserCustomer customer = new UserCustomer();
				customer.setCc_name(houseIntention.getPhi_user());
				customer.setCcp_phone(houseIntention.getPhi_phone());
				customer.setCc_createTime(new Date());
				customer.setCc_em_id(em_id);
				customer.setCc_type("房东");
				// shenhx 20170512 前端传入的性别为0-女士；1-先生
				if (houseIntention.getPhi_user_sex().equals("女士")) {
				 	customer.setCc_sex(0);
				} else if (houseIntention.getPhi_user_sex().equals("先生")) {
					customer.setCc_sex(1);
				}
				if (AppUtil.isNotNull(houseIntention.getCc_code())) {
					customer.setCc_code(houseIntention.getCc_code());
				}
				customer.setCc_state(2);// 意向客户

				String cc_code = "";
				if ("房源录入".equals(houseIntention.getPhi_type())){
					cc_code = AppUtil.getOrderCode("CUS");
//					UserCustomerIntention userCustomerIntention = new  UserCustomerIntention();
					userCustomerIntention.setCc_name(houseIntention.getPhi_user());
					userCustomerIntention.setCcp_phone(houseIntention.getPhi_phone());
					userCustomerIntention.setCc_sex("女士".equals(houseIntention.getPhi_user_sex()) ? "0" : "先生".equals(houseIntention.getPhi_user_sex()) ? "1" : "");// 1-男；0-女
					userCustomerIntention.setCc_em_id(em_id);
					userCustomerIntention.setCc_type(1);// 意向房东
					userCustomerIntention.setContact_time(new Date());
					userCustomerIntention.setFollow_status(1);// 预约
					userCustomerIntention.setContact_remark("出租" + houseIntention.getHi_houseS() + "室" + houseIntention.getHi_houseT() + "厅");
					userCustomerIntention.setCustomer_need("出租" + houseIntention.getHi_houseS() + "室" + houseIntention.getHi_houseT() + "厅");
					userCustomerIntention.setCc_code(cc_code);
					customerService.addCustomerIntention(userCustomerIntention);
					customer.setCc_code(cc_code);
					// 保存客户日志
					UserCustomerLog customerLog = new UserCustomerLog();
					customerLog.setCc_code(cc_code);
					customerLog.setCl_type(75);// 預約
					customerLog.setCl_content("出租" + houseIntention.getHi_houseS() + "室" + houseIntention.getHi_houseT() + "厅");
					customerLog.setCl_author(em_id);
					customerLog.setCl_source(2);// 系统添加
					customerLog.setCl_createTime(new Date());
					customerService.addUserCustomerLog(customerLog);
				} else {
//					cc_code = insertCustomerOne(customer);
					cc_code = addCustomerOne(customer);
				}
				if (cc_code != null && cc_code != "") {
					houseIntention.setCc_code(cc_code);// 客户（房东）唯一编码
				}
			}
			// 意向房源添加或修改
			if (AppUtil.isNotNull(houseIntention.getPhi_type())) {
				json = houseIntentionService.addHouseIntentionSubmit(request, houseIntention, em_id, path);
			}

			// 房源品牌添加
			if (houseInformationStateRelation != null && houseInformationStateRelation.getHis_id() != null && !houseInformationStateRelation.getHis_id().toString().trim().equals("")) {
				houseInformationStateService.addHouseInformationStateRelation(houseInformationStateRelation);
			}

			// 查询该意向房源的信息
			if (AppUtil.isNotNull(houseIntention.getPhi_id())) {
				houseIntention.setPhi_id(houseIntention.getPhi_id());
				HouseIntention hi = houseIntentionService.queryHouseIntentionID(houseIntention);// 意向房源
				if (hi != null) {
					ReserveBill reserveBill = reserveBillService.selectReserveBillCode(hi.getHi_code());// 定金或诚意金，金额，是否支付
					updateHouseTypeInteger(hi);// 意向房源进度数字化
					StringRecommendName(hi);// 意向房源推荐群体Name化
					HouseIntentionImage intentionImage = new HouseIntentionImage();
					intentionImage.setHi_code(hi.getHi_code());
					List<HouseIntentionImage> houseIntentionImages = houseIntentionService.queryHouseImageList(intentionImage);// 意向房源图片
					if (houseIntentionImages != null && houseIntentionImages.size() > 0) {
						hi.setImageNum(houseIntentionImages.size());
					} else {
						hi.setImageNum(0);
					}
					json.put("hImage", houseIntentionImages);
					json.put("hi", hi);
					json.put("rb", reserveBill);
				}
			}
			houseIntentionType.setHi_code(houseIntention.getHi_code());
			List<HouseIntentionType> ht = houseIntentionService.selectHouseIntentionType(houseIntentionType);
			json.put("ht", ht);
		} catch (Exception e) {
			e.printStackTrace();
		}*/
        return map;
    }

    /**
     * 根据房东电话、物业、户型室判断房源是否重复
     *
     * @param houseIntention
     * @return
     * @author zoe
     */
    @RequestMapping("/selSimilarPhonePhiidCount")
    @ResponseBody
    public Map<String, Object> selSimilarPhonePhiidCount(HouseIntention houseIntention) {
        Map<String, Object> map = new HashMap<>();
        int count = houseIntentionService.selSimilarPhonePhiidCount(houseIntention);
        map.put("count", count);
        return map;
    }

    /**
     * 根据房东电话、物业、户型室判断房源是否重复
     *
     * @param houseIntention
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/queryHouseIntentionBool")
    @ResponseBody
    public Map<String, Object> queryHouseIntentionBool(HouseIntention houseIntention) {
        Map<String, Object> map = new HashMap<>();
        HouseIntention queryHouseIntention = houseIntentionService.queryHouseIntentionBool(houseIntention);
        map.put("queryHouseIntention", queryHouseIntention);
        return map;
    }

    /**
     * 查询房东信息
     *
     * @return
     * @author zoe
     */
    @RequestMapping("/queryCustomerByPhone")
    @ResponseBody
    public Map<String, Object> queryCustomerByPhone(String phone) {
        Map<String, Object> map = new HashMap<>();
        if (!AppUtil.isNotNull(phone)) {
            map.put("msg", "参数错误");
            return map;
        }
        UserCustomer customer = customerService.queryCustomerByPhone(phone);
        map.put("customer", customer);
        map.put("msg", "success");
        return map;
    }

    public String st(String s) {
        String[] s1 = s.split(",");
        String ss = "";
        for (int i = 0; i < s1.length; i++) {
            if (s1[i] != null && !s1[i].equals("")) {
                ss = ss + s1[i] + ",";
            }
        }
        s1 = ss.split(",");
        String s2 = "";
        for (int i = 0; i < s1.length; i++) {
            if (i == 0) {
                if (s1[i] != null && s1[i] != "") {
                    s2 = s1[i] + ",";
                } else {
                    s2 = "";
                }
            } else {
                if (s1[i] != null && s1[i] != "" && !s1[i].equals("undefined") && !s1[i].equals(s1[i - 1])) {
                    s2 = s2 + s1[i] + ",";
                }
            }
        }
        if (s2 != null && !s2.equals("") && s2.substring(0, 1).equals(",")) {
            s2 = s2.substring(1, s2.length() - 1);
        } else if (s2 != null && !s2.equals("")) {
            s2 = s2.substring(0, s2.length() - 1);
        }

        if (s2.equals("")) {
            s2 = null;
        }
        return s2;
    }

    /**
     * 房源跟进内容记录添加
     *
     * @param houseIntentionType
     * @param dateStr
     * @return
     * @author zoe
     */
    @RequestMapping("/addHouseInTypes")
    @ResponseBody
    public Map<String, Object> addHouseInTypes(HouseIntentionType houseIntentionType, String dateStr, HouseIntention houseIntention) {

        Map<String, Object> map = new HashMap<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        Date dateTime = new Date();
        String dates = "";
        if (houseIntentionType != null && houseIntentionType.getHi_code() != null && !houseIntentionType.getHi_code().trim().equals("")) {
            if (dateStr != null && !dateStr.trim().equals("")) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
                SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
                try {
                    Date date = sdf.parse(dateStr);
                    dates = sdf1.format(dateTime);
                    houseIntentionType.setHt_remind_time(date);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            houseIntentionType.setEm_id(employee.getEm_id());// 跟进人
            houseIntentionType.setHt_time(new Date());// 跟进记录添加时间
            houseIntentionType.setHt_houseType(0);// 手动添加跟进记录
            houseIntention.setPhi_new_emId(employee.getEm_id());// 意向房屋最新跟进人
            houseIntention.setPhi_new_addTime(dateTime);// 意向房源最新跟进时间

            map = houseIntentionService.insertHouseIntentionType(houseIntentionType, houseIntention);

        }
        List<HouseIntentionType> ht = houseIntentionService.selectHouseIntentionType(houseIntentionType);
        map.put("ht", ht);
        map.put("newName", employee.getEm_name() + "/" + dates);
        return map;
    }

    /**
     * 房源跟进内容记录添加
     *
     * @param houseIntentionType
     * @param dateStr
     * @return
     * @author zoe
     */
    @RequestMapping("/addHouseInTypesAPP")
    @ResponseBody
    public Map<String, Object> addHouseInTypesAPP(HttpServletRequest request, HouseIntentionType houseIntentionType, String dateStr, HouseIntention houseIntention, Integer new_id) {
        Map<String, Object> map = new HashMap<>();
        Date dateTime = new Date();
        if (houseIntentionType != null && houseIntentionType.getHi_code() != null && !houseIntentionType.getHi_code().trim().equals("")) {
            if (dateStr != null && !dateStr.trim().equals("")) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
                try {
                    Date date = sdf.parse(dateStr);
                    houseIntentionType.setHt_remind_time(date);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            houseIntentionType.setEm_id(new_id);// 跟进人
            houseIntentionType.setHt_time(new Date());// 跟进记录添加时间
            houseIntentionType.setHt_houseType(0);// 手动添加跟进记录
            houseIntention.setPhi_new_addTime(dateTime);// 意向房源最新跟进时间
            houseIntention.setPhi_new_emId(new_id);// 意向房屋最新跟进人

            map = houseIntentionService.insertHouseIntentionType(houseIntentionType, houseIntention);

        }
        map.put("message", "success");
        return map;
    }

    /**
     * 房源跟进内容记录添加
     *
     * @return
     * @author zoe
     */
    @RequestMapping("/selectHouseIntTypeList")
    @ResponseBody
    public Map<String, Object> selectHouseIntTypeList(PageModel<HouseIntentionType> pageModel, String hicode) {
        Map<String, Object> map = new HashMap<>();
        HouseIntentionType houseIntentionType = new HouseIntentionType();

        if (hicode != null && !hicode.trim().equals("")) {
            houseIntentionType.setHi_code(hicode);
            List<HouseIntentionType> ht = houseIntentionService.selectHouseIntentionType(houseIntentionType);
            map.put("ht", ht);
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 房源跟进内容记录添加
     *
     * @return
     * @author zoe
     */
    @RequestMapping("/selectReserveBillCode")
    @ResponseBody
    public Map<String, Object> selectReserveBillCode(String hicode) {
        Map<String, Object> map = new HashMap<>();
        if (hicode != null && !hicode.trim().equals("")) {
            ReserveBill reserveBill = reserveBillService.selectReserveBillCode(hicode);

            map.put("rbll", reserveBill);
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 意向房源记录
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/houseIntentionContent")
    public String houseIntentionContent() {
        return "/intention/houseIntentionContent";
    }

    /**
     * 意向房源进度条数字化
     *
     * @param houseIntention
     * @author zoe
     */
    public void updateHouseTypeInteger(HouseIntention houseIntention) {
        if (houseIntention != null && houseIntention.getPhi_type() != null) {
            if (houseIntention.getPhi_type().trim().equals("房源录入")) {
                houseIntention.setTipnum(1);
            } else if (houseIntention.getPhi_type().trim().equals("房源跟进")) {
                houseIntention.setTipnum(1);
            } else if (houseIntention.getPhi_type().trim().equals("房源实勘")) {
                houseIntention.setTipnum(2);
            } else if (houseIntention.getPhi_type().trim().equals("房源定价")) {
                houseIntention.setTipnum(3);
            } else if (houseIntention.getPhi_type().trim().equals("存房")) {
                houseIntention.setTipnum(4);
            } else if (houseIntention.getPhi_type().trim().equals("完成")) {
                houseIntention.setTipnum(5);
            } else if (houseIntention.getPhi_type().trim().equals("存房失败")) {
                houseIntention.setTipnum(6);
            } else {
                houseIntention.setTipnum(0);
            }
        }
    }

    /**
     * 意向房源推荐群体获取其name
     *
     * @param houseIntention
     * @author zoe
     */
    public void StringRecommendName(HouseIntention houseIntention) {
        if (houseIntention.getRecommendGroup_Id() != null && !houseIntention.getRecommendGroup_Id().trim().equals("")) {
            List<HoseRecommendGroup> listRemend = houseIntentionService.selectHoseRecommendGroup(houseIntention);
            String rName = "";
            String[] ids = houseIntention.getRecommendGroup_Id().split(",");
            for (int i = 0; i < ids.length; i++) {
                if (ids[i] != null && !ids[i].trim().equals("")) {
                    for (int j = 0; j < listRemend.size(); j++) {
                        if (Integer.parseInt(ids[i]) == listRemend.get(j).getRecommendGroup_Id()) {
                            rName = rName + listRemend.get(j).getRecommendGroup_Name() + ",";
                        }
                    }
                }
            }
            houseIntention.setRecommend_name(rName.substring(0, rName.length() - 1));
        }
    }

    // 添加客户信息
    public synchronized String addCustomerOne(UserCustomer userCustomer) {
        String str = "";
        if (AppUtil.isNull(userCustomer.getCc_code())) {
            UserCustomer userCustomer2 = customerService.selectCustomerPhoneOne(userCustomer);// 原客户信息
            if (null != userCustomer2 && !userCustomer2.getCc_name().equals(userCustomer.getCc_name())) {
                customerService.updateCustomer(userCustomer);
                str = userCustomer.getCc_code();
            } else if (null == userCustomer2) {
                if (AppUtil.isNull(userCustomer.getCcp_phone())) {
                    int count = customerService.insertCustomerOne(userCustomer);// 添加客户
                    if (count == 1) {// 客户添加成功
                        // 添加客户电话
                        UserCustomerPhone customerPhone = new UserCustomerPhone();
                        customerPhone.setCcp_phone(userCustomer.getCcp_phone());
                        customerPhone.setCcp_time(new Date());
                        customerPhone.setCcp_state(1);// -1:号码已注销；0：弃用；1：正在使用；2：备用
                        customerPhone.setCc_id(userCustomer.getCc_id());
                        Integer teger = customerService.insertCustomerPhone(customerPhone);
                        if (teger == 1) {// 添加客户电话成功
                            str = userCustomer.getCc_code();
                        }
                    }
                }
            }
        }else{
            if (AppUtil.isNull(userCustomer.getCcp_phone())) {
                int count = customerService.insertCustomerOne(userCustomer);// 添加客户
                if (count == 1) {// 客户添加成功
                    // 添加客户电话
                    UserCustomerPhone customerPhone = new UserCustomerPhone();
                    customerPhone.setCcp_phone(userCustomer.getCcp_phone());
                    customerPhone.setCcp_time(new Date());
                    customerPhone.setCcp_state(1);// -1:号码已注销；0：弃用；1：正在使用；2：备用
                    customerPhone.setCc_id(userCustomer.getCc_id());
                    Integer teger = customerService.insertCustomerPhone(customerPhone);
                    if (teger == 1) {// 添加客户电话成功
                        str = userCustomer.getCc_code();
                    }
                }
            }
        }
        return str;
    }

    // 添加客户信息
    public synchronized String insertCustomerOne(UserCustomer userCustomer) {
        String str = "";
        // 如果房源已经有房东，则更新房东信息
        if (AppUtil.isNull(userCustomer.getCc_code())) {
            UserCustomer userCustomer2 = customerService.selectCustomerCodeOne(userCustomer);// 原客户信息
            if (!userCustomer2.getCc_name().equals(userCustomer.getCc_name())) {
                customerService.updateCustomer(userCustomer);
            }
            str = userCustomer.getCc_code();
        } else {
            if (AppUtil.isNull(userCustomer.getCcp_phone())) {
                // 查询是否存在该客户
                UserCustomer cus = customerService.selectCustomerOne(userCustomer);
                if (cus == null) {// 不存在该客户
                    // 生成客户编码
                    String code = getCusCode();
                    userCustomer.setCc_code(code);
                    userCustomer.setCc_state(2);// 1：有效客户；2：意向客户；3：客户
                    Integer count = customerService.insertCustomerOne(userCustomer);// 添加客户
                    if (count == 1) {// 客户添加成功
                        // 添加客户电话
                        UserCustomerPhone customerPhone = new UserCustomerPhone();
                        customerPhone.setCcp_phone(userCustomer.getCcp_phone());
                        customerPhone.setCcp_time(new Date());
                        customerPhone.setCcp_state(1);// -1:号码已注销；0：弃用；1：正在使用；2：备用
                        customerPhone.setCc_id(userCustomer.getCc_id());
                        Integer teger = customerService.insertCustomerPhone(customerPhone);
                        if (teger == 1) {// 添加客户电话成功
                            str = code;
                        }
                    }

                    // 保存客户日志
                    UserCustomerLog customerLog = new UserCustomerLog();
                    customerLog.setCc_code(code);
                    customerLog.setCl_type(75);// 預約
                    customerLog.setCl_content("房屋出租预约申请");
                    customerLog.setCl_author(userCustomer.getCc_em_id());
                    customerLog.setCl_source(2);// 系统添加
                    customerLog.setCl_createTime(new Date());
                    customerService.addUserCustomerLog(customerLog);
                } else {
                    str = cus.getCc_code();
                    UserCustomer userCustomer3 = new UserCustomer();
                    userCustomer3.setCc_name(userCustomer.getCc_name());
                    userCustomer3.setCc_code(str);
                    customerService.updateCustomer(userCustomer3);
                }
            }
        }

        return str;
    }

    /*
     * 生成客户编码随机数 CUS大写字母 + 时间戳 + 随机数（4位）
     *
     * @author zoe
     *
     * @return
     */
    public String getCusCode() {
        StringBuffer str = new StringBuffer();
        str.append("CUS");// 客户唯一编码前缀
        String date = new Date().getTime() + "";
        str.append(date);// 时间戳
        str.append(Randoms.random());// 随机数4位

        return str.toString();
    }


    /**
     * 意向房源状态
     *
     * @param phi_id
     * @return
     * @author 陈智颖
     * @date Mar 27, 2017 9:41:47 AM
     */
    @RequestMapping("/intentionState")
    @ResponseBody
    public Map<String, Object> intentionState(Integer phi_id) {
        Map<String, Object> map = new HashMap<>();
        HouseIntention houseIntention = new HouseIntention();
        houseIntention.setPhi_id(phi_id);
        HouseIntention houseIntentionSate = houseIntentionService.queryIntentionState(houseIntention);
        map.put("houseIntentionSate", houseIntentionSate);
        return map;
    }

    /**
     * 查询意向房源
     *
     * @param response
     * @param pageNo 开始页数
     * @param pageSize 查询条数
     * @param where 搜索框
     * @param em_id 内部人员编码
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/appIntentionListData")
    @ResponseBody
    public Map<String, Object> appIntentionListData(HttpServletResponse response, Integer pageNo, Integer pageSize, String where, Integer em_id) {
        // 跨域传输json
        //response.addHeader("Access-Control-Allow-Origin", "*");
        Map<String, Object> map = new HashMap<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");

        pageNo = (pageNo-1) * pageSize;
        HouseIntention houseIntention = new HouseIntention();
        houseIntention.setStart(pageNo);
        houseIntention.setEnd(pageSize);
        houseIntention.setHouse_address(where);
        houseIntention.setEm_id(em_id);
        List<HouseIntention> houseIntentionAPP = houseIntentionService.queryHouseIntentionAPP(houseIntention);
        for (HouseIntention houseIntention2 : houseIntentionAPP) {
            List<HouseIntention> queryHouseIntentionImageType = houseIntentionService.queryHouseIntentionImageType(houseIntention2);
            if (queryHouseIntentionImageType.isEmpty()) {
                houseIntention2.setHim_path("");
            } else {
                houseIntention2.setHim_path(queryHouseIntentionImageType.get(0).getHim_path());
            }
            houseIntention2.setPhi_typeColor(AppUtil.intentState(houseIntention2.getPhi_type()));
            houseIntention2.setPhi_new_addTime_str(sdf.format(houseIntention2.getPhi_new_addTime()));
            houseIntention2.setStr_emName(houseIntention2.getNew_emName());
            houseIntention2.setStr_buildType(houseIntention2.getNew_buildType());
            if(houseIntention2.getPhi_type().equals("完成")){
                houseIntention2.setPhi_type("存房成功");
            }
        }
        if(houseIntentionAPP.isEmpty()){
            map.put("code", 401);
            if(pageNo == 0){
                map.put("msg","数据为空");
            }else{
                map.put("msg","没有更多数据");
            }
        }else{
            map.put("code", 200);
            map.put("data", houseIntentionAPP);
        }

        return map;
    }

    /**
     * 计算最最低出房价和预估业绩
     *
     * @return
     * @author 陈智颖
     * @date Apr 28, 2017 10:19:41 AM
     */
    @RequestMapping("/moneyPrice")
    @ResponseBody
    public Map<String, Object> moneyPrice(HttpServletRequest request, Double money, Integer day) {
        Map<String, Object> map = new HashMap<>();

        String monthMoney = AppUtil.houseMoney(money, day.toString(), 1, "月付", 2400);
        String threedMonthMoney = AppUtil.houseMoney(money, day.toString(), 1, "季付", 2400);
        String yeartMonthMoney = AppUtil.houseMoney(money, day.toString(), 1, "半年付", 2400);
        String yearMonthMoney = AppUtil.houseMoney(money, day.toString(), 1, "年付", 2400);

        String monthMoneys = String.valueOf((int) ((Double.valueOf(monthMoney) - money) * 12 + money / 30 * (day - 7) - (Double.valueOf(monthMoney) * 0.06 * 11)));
        String threedMonthMoneys = String.valueOf((int) ((Double.valueOf(threedMonthMoney) - money) * 12 + money / 30 * (day - 7)));
        String yeartMonthMoneys = String.valueOf((int) ((Double.valueOf(yeartMonthMoney) - money) * 12 + money / 30 * (day - 7)));
        String yearMonthMoneys = String.valueOf((int) ((Double.valueOf(yearMonthMoney) - money) * 12 + money / 30 * (day - 7)));

        map.put("monthMoney", monthMoney);
        map.put("monthMoneys", monthMoneys);
        map.put("threedMonthMoney", threedMonthMoney);
        map.put("threedMonthMoneys", threedMonthMoneys);
        map.put("yeartMonthMoney", yeartMonthMoney);
        map.put("yeartMonthMoneys", yeartMonthMoneys);
        map.put("yearMonthMoney", yearMonthMoney);
        map.put("yearMonthMoneys", yearMonthMoneys);

        return map;
    }

    /**
     * 客户管理-意向房源录入
     *
     * @param data
     * @return
     * @author shenhx
     */
    @RequestMapping("/addCustomerHouse")
    @ResponseBody
    public Map<String, Object> addCustomerHouse(HttpServletRequest request, @RequestBody Map<String, Object> data) {
        Map<String, Object> map = new HashMap<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            map.put("error", Msg.MSG_LOGIN_ERROR);
            return map;
        }

        // 保存客户日志
        String cc_code = JSONObject.parseObject((String) data.get("cc_code"), String.class);

        HouseIntention houseIntention = JSONObject.parseObject((String) data.get("houseIntention"), HouseIntention.class);
        houseIntention.setEm_id(employee.getEm_id());
        houseIntention.setPhi_new_addTime(new Date());
        String path = JSONObject.parseObject((String) data.get("img_path"), String.class);
        Map<String, Object> resultMap = houseIntentionService.addHouseIntentionSubmit(request, houseIntention, employee.getEm_id(), path);

        if (null != houseIntention && "完成".equals(houseIntention.getPhi_type())) {
            UserCustomerIntention userCustomerIntention = customerService.queryCustomerIntentionByCode(houseIntention.getCc_code());
            UserCustomer customer = new UserCustomer();
            customer.setCc_code(houseIntention.getCc_code());
            customer.setCc_name(userCustomerIntention.getCc_name());
            customer.setCc_sex(Integer.parseInt(userCustomerIntention.getCc_sex()));
            customer.setCc_state(2);// 正式客户
            customer.setCc_cardType(userCustomerIntention.getCc_cardType());
            customer.setCc_cardNum(userCustomerIntention.getCc_cardNum());
            customer.setCc_createTime(new Date());
            boolean result = customerService.addCustomer(customer);
            if (result) {
                UserCustomerPhone userCustomerPhone = new UserCustomerPhone();
                userCustomerPhone.setCc_id(customer.getCc_id());
                userCustomerPhone.setCcp_state(1);
                userCustomerPhone.setCcp_phone(userCustomerIntention.getCcp_phone());
                userCustomerPhone.setCcp_time(new Date());
                customerService.addCustomerPhone(userCustomerPhone);
            }
        }

//		houseIntentionService.saveIntentionImg(path, houseIntention);

        // 房源品牌添加
        HouseInformationStateRelation houseInformationStateRelation = new HouseInformationStateRelation();
        houseInformationStateRelation.setHi_code((String) resultMap.get("hi_code"));
        houseInformationStateRelation.setHis_id(houseIntention.getHis_id());
        if (houseInformationStateRelation != null && houseInformationStateRelation.getHis_id() != null && !houseInformationStateRelation.getHis_id().toString().trim().equals("")) {
            houseInformationStateService.addHouseInformationStateRelation(houseInformationStateRelation);
        }

        ReserveBill reserveBill = JSONObject.parseObject((String) data.get("reserveBill"), ReserveBill.class);
        reserveBill.setRb_houseNum(houseIntention.getHi_code());

        ReserveBill reserveBillCode = reserveBillService.selectReserveBillCode(reserveBill.getRb_houseNum());
        if (reserveBillCode == null) {
            reserveBill.setRb_number(AppUtil.getOrderCode("200")); // 预定单号
            reserveBill.setRb_stateType(1);
            houseIntentionService.addReserveBill(reserveBill);

        } else {
            map.put("message", "repeat");
            return map;
        }

        if (null != cc_code && !"".equals(cc_code)) {
            HouseIntention house = houseIntentionService.queryIntentionHouseByHiCode(houseIntention.getHi_code());
            // 保存客户日志
            UserCustomerLog customerLog = new UserCustomerLog();
            customerLog.setCc_code(cc_code);
            customerLog.setCl_type(76);// 跟进
            customerLog.setCl_content("【房源实勘】" + house.getHouse_address() + "房源信息录入");
            customerLog.setCl_author(employee.getEm_id());
            customerLog.setCl_source(2);// 系统添加
            customerLog.setCl_createTime(new Date());
            customerService.addUserCustomerLog(customerLog);
        }

        return map;
    }
}
