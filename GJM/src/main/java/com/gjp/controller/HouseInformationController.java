package com.gjp.controller;

import com.gjp.model.*;
import com.gjp.service.*;
import com.gjp.util.*;
import com.gjp.util.constant.Constant;
import com.gjp.util.upload.URLUploadImage;
import org.apache.commons.io.IOUtils;
import org.apache.poi.hssf.usermodel.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 房源的基本信息查看、修改、添加
 *
 * @author zoe
 */
@Controller
public class HouseInformationController {
    // 房屋扩展
    @Resource
    private HouseExtendedService houseExtendedService;
    // 房屋基本
    @Resource
    private HousingAllocationService housingAllocationService;

    // 职员信息
    @Resource
    private UserCenterEmployeeService userCenterEmployeeService;
    // 物业信息
    @Resource
    private PropertyInfoService propertyInfoService;
    // 房屋品牌
    @Resource
    private HouseHouseBrandService houseHouseBrandService;
    // 适合推荐群体
    @Resource
    private HoseRecommendGroupService hoseRecommendGroupService;
    // 房源库service
    @Resource
    private HouseLibraryService houseLibraryService;
    // 房屋图片
    @Resource
    private HouseImageService houseImageService;
    // 房屋图片类型
    @Resource
    private HouseImageTypeService houseImageTypeService;

    /**
     * 进入后台首页
     *
     * @return
     */
    @RequestMapping("/")
    public String index() {
        return "/manage/index";
    }

    /**
     * 跳转登陆页
     *
     * @return
     */
    @RequestMapping("/login")
    public String login() {
        return "/login/login";
    }

    /**
     * session过期进行中转跳转登陆页
     *
     * @return
     */
    @Deprecated
    @RequestMapping("/transfers")
    public String transfer() {
        return "/manage/transfer";
    }

    /**
     * 已发布房屋排序页面
     *
     * @return
     */
    @RequestMapping("/house/sort")
    public String sort() {
        return "/product/sort";
    }

    /**
     * iframe跳转已发布房屋页面
     *
     * @return
     */
    @RequestMapping("/house/basic/informationPage")
    public String selectHouseHouseInformationPage() {
        return "/product/HousingAllocation";
    }

    /**
     * ajax分页查询已发布房屋基本信息
     *
     * @return
     */
    @RequestMapping("/house/basic/information")
    @ResponseBody
    public Map<String, Object> selectHouseHouseInformation(TableList tableList1) throws ParseException {
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
        // 装载数据类
        DataList<HouseHouseInformation> datalist = new DataList<>();
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        // 查询分页实体
        PageModel<HouseHouseInformation> pageModel = housingAllocationService.selectHouseHouseInformation(tableList.getPageNo(), pageSize, houseModel);
        // 处理特殊数据
        List<HouseHouseInformation> list = new ArrayList<>();
        for (HouseHouseInformation houseHouseInformation: pageModel.getList()) {
            houseHouseInformation.setHe_phone("/" + houseHouseInformation.getHe_phone());
            houseHouseInformation.setEm_phone("/" + houseHouseInformation.getEm_phone());
            list.add(houseHouseInformation);
        }
        // 装载数据
        return datalist.dataList(list, tableList.getPageNo(), pageSize, pageModel.getTotalRecords(), pageModel.getSumMoney());
    }

    /**
     * ajax分页查询已发布房屋基本信息(发布房屋排序)
     *
     * @return
     */
    @RequestMapping("/house/houseSort")
    @ResponseBody
    public Map<String, Object> houseSort(String page, String houseName, String cookie, String houseBrand) {
        int pageNo = Integer.parseInt(page);
        // 设置分页查询条件
        HouseModel houseModel = new HouseModel();
        houseModel.setHouseName(houseName);
        houseModel.setHouseBrand(Integer.parseInt(houseBrand));
        if (pageNo == 0) {
            pageNo = 1;
        }
        int cookies = Constant.PAGE_SIZE;
        if ("undefined".equals(cookie)) {

        } else {
            if (cookie != null && !"".equals(cookie)) {
                cookies = Integer.parseInt(cookie);
                if (cookies == 0) {
                    cookies = Constant.PAGE_SIZE;
                }
            }
        }

        // 根据品牌查询未设排序编码的房屋
        PageModel<HouseHouseInformation> pageModel = housingAllocationService.houseSort(pageNo, cookies, houseModel);

        Map<String, Object> map = new HashMap<>();
        // 根据品牌查询设置排序编码的房屋
        List<HouseHouseInformation> houseHouseInformations = housingAllocationService.selecthouseSort(Integer.parseInt(houseBrand));

        if (houseHouseInformations.size() == 0) {
        } else {
            // 循环设置排序编码的房屋内部人员姓名
            for (HouseHouseInformation houseHouseInformation: houseHouseInformations) {
                UserCenterEmployee userCenterEmployee = userCenterEmployeeService.selectUserCenterEmployeeById(houseHouseInformation.getPu_id());
                houseHouseInformation.setEm_name(userCenterEmployee.getEm_name());
            }
            List<HouseHouseInformation> houseHouseInformationList = pageModel.getList();
            // 循环设置未设排序编码的房屋内部职员名称
            for (HouseHouseInformation houseHouseInformation: houseHouseInformationList) {
                UserCenterEmployee userCenterEmployee = userCenterEmployeeService.selectUserCenterEmployeeById(houseHouseInformation.getPu_id());
                houseHouseInformation.setEm_name(userCenterEmployee.getEm_name());
            }
            // 根据品牌查询最大的排序码
            int number = housingAllocationService.selectNumber(houseBrand);
            map.put("number", number);
        }
        map.put("houseHouseInformations", houseHouseInformations);
        map.put("pageModel", pageModel);
        return map;
    }

    /**
     * ajax根据id查询已发布房屋基本信息
     *
     * @return
     */
    @RequestMapping("/house/houseInfoById")
    @ResponseBody
    public Map<String, Object> houseInfoById(String hi_id) {
        int id = Integer.parseInt(hi_id);
        HouseHouseInformation houseHouseInformation = housingAllocationService.selectHouseById(id);
        Map<String, Object> map = new HashMap<>();
        map.put("houseHouseInformation", houseHouseInformation);
        return map;
    }

    /**
     * 跳转修改房屋信息界面
     *
     * @return
     */
    @RequestMapping("/house/basic/jumpUpdataInfo")
    public String jumpUpdataInfo(HttpServletRequest request, String id) {
        int ids = Integer.parseInt(id);
        // 传回编号
        request.setAttribute("id", ids);
        return "/product/updataHousingAllocation";
    }


    /**
     * jbox弹出百度地图获取经纬度
     *
     * @return
     */
    @RequestMapping("/house/map")
    public String map() {
        return "/product/map";
    }

    /**
     * ajax根据编号查询已发布房屋信息以便进行修改
     *
     * @return
     */
    @RequestMapping("/house/selectHouseById")
    @ResponseBody
    public Map<String, Object> selectHouseById(String id) {
        // 根据id查询房屋基本信息
        int hi_id = Integer.parseInt(id);
        HouseHouseInformation houseHouseInformation = housingAllocationService.selectHouseById(hi_id);
        Map<String, Object> map = new HashMap<>();
        // 根据id查询房屋扩展信息
        HouseHouseExtended houseHouseExtended = houseExtendedService.selectHouseHouseExtendedById(houseHouseInformation.getHe_id());
        map.put("houseHouseExtended", houseHouseExtended);
        // 房屋品牌List
        List<HouseHouseBrand> houseHouseBrandList = houseHouseBrandService.selectHouseHouseBrandList();
        // 物业List
        List<PropertyInfo> userCenterPropertyInfoList = propertyInfoService.selectPropertyInfo();
        // 适合推荐群体List
        List<HoseRecommendGroup> hoseRecommendGroupList = hoseRecommendGroupService.selectHoseRecommendGroupList();
        // 查询公寓类型
        List<String> versions = houseHouseBrandService.selectVersions();

        map.put("houseHouseInformation", houseHouseInformation);
        map.put("houseHouseBrandList", houseHouseBrandList);
        map.put("versions", versions);
        map.put("userCenterPropertyInfoList", userCenterPropertyInfoList);
        map.put("hoseRecommendGroupList", hoseRecommendGroupList);
        return map;
    }

    /**
     * ajax修改已发布房屋基本信息
     *
     * @return
     */
    @RequestMapping("/house/updateHouse")
    @ResponseBody
    public Map<String, Object> updateHouse(HouseHouseInformation houseHouseInformation) {
        String hi_function = houseHouseInformation.getHi_function();
        houseHouseInformation.setHi_function(hi_function);
        // 修改房屋基本信息
        int updata = housingAllocationService.upDataHouse(houseHouseInformation);
        // 根据房屋编号修改对应的库存房屋信息
        houseLibraryService.upDataKeepHouse(this.seth(houseHouseInformation));
        Map<String, Object> map = new HashMap<>();
        map.put("updata", updata);
        return map;
    }

    /**
     * ajax修改已发布房屋扩展信息
     *
     * @return
     */
    @RequestMapping("/house/updateExt")
    @ResponseBody
    public Map<String, Object> updateExt(HouseHouseExtended houseHouseExtended, String buyTime) {
        if (!"".equals(buyTime)) {
            houseHouseExtended.setHe_buyTime(DataUtil.StrToDate(buyTime));
        }
        int result = 0;
        // 设置开盘时间
        if (houseHouseExtended.getHe_state() == null) {
            houseHouseExtended.setHe_state("edit");
        }
        houseHouseExtended.setHe_time(new Date());

        result = houseExtendedService.updataInfo(houseHouseExtended);

        Map<String, Object> map = new HashMap<>();
        map.put("updata", result);
        return map;
    }

    /**
     * ajax查询已发布房屋图片
     *
     * @return
     */
    @RequestMapping("/house/selectImage")
    @ResponseBody
    public Map<String, Object> selectImage(String hi_id) {
        Map<String, Object> map = new HashMap<>();
        // 查询房屋图片类型
        List<HouseHouseImageType> image = houseImageTypeService.selectHouseImage(Integer.parseInt(hi_id));
        List<HouseImageVo> houseImageList = new ArrayList<>();
        // 循环查出该类型的房屋图片
        for (HouseHouseImageType houseImageType: image) {
            HouseImageVo houseHouseImage = houseImageService.queryHouseImage(houseImageType.getHm_id());
            houseHouseImage.setHm_type(houseImageType.getHit_type());
            houseImageList.add(houseHouseImage);
        }
        map.put("houseImageList", houseImageList);
        return map;
    }

    /**
     * ajax修改房屋排序码
     *
     * @return
     */
    @RequestMapping("/house/updateHouseSort")
    @ResponseBody
    public Map<String, Object> updateHouseSort(String hi_id, String brand) {
        Map<String, Object> map = new HashMap<>();
        // 根据品牌查询最大的排序码
        int number = housingAllocationService.selectNumber(brand);
        int num = 0;
        if (number <= 7) {
            num = number + 1;
        } else {
            num = 8;
            // 根据品牌把第八个改为null
            housingAllocationService.updateHouseSorts(brand);
        }
        int result = housingAllocationService.updateHouseSort(Integer.parseInt(hi_id), num);
        map.put("result", result);
        return map;
    }

    /**
     * ajax修改房屋排序码下移
     *
     * @return
     */
    @RequestMapping("/house/updateHouseSortDown")
    @ResponseBody
    public Map<String, Object> updateHouseSortDown(String hi_id, String type, String brand, String sort) {
        Map<String, Object> map = new HashMap<>();

        // 设置排序码
        int s = 0;
        if ("down".equals(type)) {
            s = Integer.parseInt(sort) + 1;
        } else {
            s = Integer.parseInt(sort) - 1;
        }
        // 修改房屋排序码下移
        int results = housingAllocationService.updateHouseSortDown(brand, sort, s);
        // 修改房屋排序码上移
        housingAllocationService.updateHouseShiftUp(brand, sort, hi_id, s);
        map.put("results", results);
        return map;
    }

    /**
     * ajax上传图片
     *
     * @return
     */
    @RequestMapping("/house/upload")
    public void upload(HttpServletRequest request, HttpServletResponse response, @RequestParam("file5") MultipartFile file, String elementIds) throws IOException {
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
        String locals = request.getSession().getServletContext().getRealPath("") + "/resources/image/upload/" + FileName;
        System.out.println(locals);
        response.setContentType("text/html; charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.print(FileName);
        out.flush();
        out.close();
    }

    /**
     * ajax添加意向房源图片
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/house/cutImage")
    @ResponseBody
    public Map<String, Object> addImage(HttpServletRequest request, HttpServletResponse response, String txt_width, String txt_height, String txt_top, String txt_left, String txt_DropWidth, String txt_DropHeight, String hm_name, String type, String hi_id, String picture) throws Exception {

        // 获取properties路劲
        String path = this.getClass().getResource("/conf/path.properties").getPath();
        // 把properties文件转化输出流
        InputStream in = new BufferedInputStream(new FileInputStream(path));
        Properties properties = new Properties();
        properties.load(in);
        //
        properties.getProperty("houseImagePath");
        // 上传到ftp服务器哪个路径下
        String paths = properties.getProperty("path");
        // 地址
        String addr = properties.getProperty("addr");
        // 端口号
        int port = Integer.parseInt(properties.getProperty("port"));
        // 用户名
        String username = properties.getProperty("username");
        // 密码
        String password = properties.getProperty("password");
        // 本地路径
        String local = request.getSession().getServletContext().getRealPath("") + "/resources/houseImage/" + picture;

        int imageWidth = Integer.parseInt(txt_width);
        int imageHeight = Integer.parseInt(txt_height);
        int cutTop = Integer.parseInt(txt_top);
        int cutLeft = Integer.parseInt(txt_left);

        // int dropWidth = Integer.parseInt(txt_DropWidth);
        // int dropHeight = Integer.parseInt(txt_DropHeight);
        // Rectangle rec = new Rectangle(cutLeft, cutTop, cutLeft+400,
        // cutTop+350);
        // File files = new
        // File(request.getSession().getServletContext().getRealPath("")
        // + "/resources/houseImage/" + picture);

        if ("page".equals(type)) {
            AppUtil.cutZoomPic(request.getSession().getServletContext().getRealPath("") + "/resources/image/upload/" + picture, request.getSession().getServletContext().getRealPath("") + "/resources/houseImage/" + picture, cutLeft, cutTop, imageWidth, imageHeight, 400, 350, true);
        } else {
            AppUtil.cutZoomPic(request.getSession().getServletContext().getRealPath("") + "/resources/image/upload/" + picture, request.getSession().getServletContext().getRealPath("") + "/resources/houseImage/" + picture, cutLeft, cutTop, imageWidth, imageHeight, 800, 557, true);
        }
        URLUploadImage.run(paths, addr, port, username, password, local);

        // saveSubImage(new
        // File(request.getSession().getServletContext().getRealPath("")
        // + "/resources/image/upload/" + picture), files, imageWidth,
        // imageHeight, rec, paths, addr, port, username, password, local);

        HouseImageVo houseHouseImage = new HouseImageVo();
        houseHouseImage.setHm_createTime(new Date());
        houseHouseImage.setHm_path("http://www.cqgjp.com/resources/houseImage/" + picture);

        // 删除本地图片
        new File(local).delete();
        new File(request.getSession().getServletContext().getRealPath("") + "/resources/image/upload/" + picture).delete();
        // 添加图片进GJP_House_HouseImage表
        houseImageService.addHouseImage(houseHouseImage);
        // 添加房屋图片类型
        HouseHouseImageType houseHouseImageType = new HouseHouseImageType();
        houseHouseImageType.setHit_type(type);
        houseHouseImageType.setHi_id(Integer.parseInt(hi_id));
        houseHouseImageType.setHm_id(houseHouseImage.getHm_id());
        houseImageTypeService.addHouseImageType(houseHouseImageType);
        // 输出map
        Map<String, Object> map = new HashMap<>();
        // 装载map
        map.put("result", "http://www.cqgjp.com/resources/houseImage/" + picture);
        map.put("hm_id", houseHouseImage.getHm_id());
        return map;

    }

    /**
     * HouseHouseInformation 转换为 HouseInfoKeep
     *
     * @param houseHouseInformation
     * @return
     */
    private HouseInfoKeep seth(HouseHouseInformation houseHouseInformation) {
        HouseInfoKeep house = new HouseInfoKeep();
        house.setHi_id(houseHouseInformation.getHi_id());
        house.setHi_address(houseHouseInformation.getHi_address());
        house.setHi_name(houseHouseInformation.getHi_name());
        house.setHi_money(houseHouseInformation.getHi_money());
        house.setHi_type(houseHouseInformation.getHi_type());
        house.setHi_area(houseHouseInformation.getHi_area());
        house.setHi_district(houseHouseInformation.getHi_district());
        house.setHi_track(houseHouseInformation.getHi_track());
        house.setHi_measure(houseHouseInformation.getHi_measure());
        house.setHi_floor(houseHouseInformation.getHi_floor());
        house.setHi_totalFloor(houseHouseInformation.getHi_totalFloor());
        house.setHi_houseS(houseHouseInformation.getHi_houseS());
        house.setHi_houseT(houseHouseInformation.getHi_houseT());
        house.setHi_houseW(houseHouseInformation.getHi_houseW());
        house.setHi_function(houseHouseInformation.getHi_function());
        house.setHi_orientation(houseHouseInformation.getHi_orientation());
        house.setHi_peopleName(houseHouseInformation.getHi_peopleName());
        house.setHi_latitude(houseHouseInformation.getHi_latitude());
        house.setHi_content(houseHouseInformation.getHi_content());
        house.setHi_text(houseHouseInformation.getHi_text());
        house.setHi_userManaged(houseHouseInformation.getHi_userManaged());
        house.setHi_state(houseHouseInformation.getHi_state());
        house.setHe_id(houseHouseInformation.getHe_id());
        house.setHb_id(houseHouseInformation.getHb_id());
        house.setRecommendGroup_Id(houseHouseInformation.getRecommendGroup_Id());
        house.setPropertyInfo_Id(houseHouseInformation.getPropertyInfo_Id());
        house.setHi_code(houseHouseInformation.getHi_code());
        house.setHi_version(houseHouseInformation.getHi_version());
        return house;
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
        List<HouseHouseImageType> image = houseImageTypeService.selectHouseImage(Integer.parseInt(hi_id));
        List<HouseImageVo> houseImageList = new ArrayList<>();
        // 循环查出该类型的房屋图片
        for (HouseHouseImageType houseImageType: image) {
            HouseImageVo houseHouseImage = houseImageService.queryHouseImage(houseImageType.getHm_id());
            houseHouseImage.setHm_type(houseImageType.getHit_type());
            houseImageList.add(houseHouseImage);
        }
        map.put("houseImageList", houseImageList);
        return map;
    }

    /**
     * 导出库存房源
     *
     * @param request
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/houseListExcel")
    @ResponseBody
    public Map<String, Object> houseListExcel(HttpServletRequest request) {

        Map<String, Object> map = new HashMap<>();

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
        cell.setCellValue("房源");
        cell.setCellStyle(style);
        cell = row.createCell(1);
        cell.setCellValue("房屋编码");
        cell.setCellStyle(style);

        List<HouseHouseInformation> selectALLHouse = housingAllocationService.selectALLHouse();
        int i = 1;
        for (HouseHouseInformation houseHouseInformation: selectALLHouse) {
            row = sheet.createRow((int) i);
            // 第四步，创建单元格，并设置值
            row.createCell(0).setCellValue(houseHouseInformation.getHouse_address());
            row.createCell(1).setCellValue(houseHouseInformation.getHi_code());
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

}
