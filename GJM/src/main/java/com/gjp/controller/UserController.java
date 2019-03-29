package com.gjp.controller;

import com.gjp.config.TaskConfig;
import com.gjp.model.Company;
import com.gjp.model.*;
import com.gjp.service.AuthorizationService;
import com.gjp.service.MoBileCodeService;
import com.gjp.service.UserCenterEmployeeService;
import com.gjp.service.UserEmployeeTypeService;
import com.gjp.util.*;
import com.gjp.util.upload.URLUploadImage;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.text.ParseException;
import java.util.*;

/**
 * 内部人员管理
 *
 * @author zoe
 */
@RequestMapping("/user")
public @Controller
class UserController {

    // 内部人员
    @Resource
    private UserCenterEmployeeService userCenterEmployeeService;

    // 内部人员类型
    @Resource
    private UserEmployeeTypeService userEmployeeTypeService;

    // 权限
    @Resource
    private AuthorizationService authorizationService;

    // 验证码
    @Resource
    private MoBileCodeService moBileCodeService;

    /**
     * 【个人信息】查询人员信息
     *
     * @return
     */
    @RequestMapping("/selectUserInfo")
    public @ResponseBody
    Map<String, Object> selectUserInfo(Integer em_id) {
        Map<String, Object> map = new HashMap<>();
        em_id = StringUtils.isEmpty(em_id) ? AppUtil.getCookieEmployee().getEm_id() : em_id;
        UserCenterEmployee userCenterEmployees = userCenterEmployeeService.selectUserCenterEmployeeById(em_id);
        if (userCenterEmployees.getEm_chiefPos() != null) {
            Position position = new Position();
            position.setEm_id(userCenterEmployees.getEm_id());
            List<Position> positions = authorizationService.selectPositionById(position);
            if (!positions.isEmpty()) {
                Company company = authorizationService.selectCompanyInfo(positions.get(0).getUcc_id());
                if (company != null) {
                    userCenterEmployees.setUcc_name(company.getUcc_name());
                    userCenterEmployees.setUcc_short(company.getUcc_short());
                }
            }
        }
        map.put("userCenterEmployee", userCenterEmployees);
        return map;
    }

    /**
     * 获取验证码
     *
     * @return
     */
    @RequestMapping("/verificationCode")
    public String index() {
        return "/manage/validate-code";
    }

    /**
     * 跳转个人信息界面
     *
     * @return
     */
    @RequestMapping("/userInfo")
    public String userInfo() {
        return "/user/userInfo";
    }

    /**
     * 用户管理
     *
     * @return
     */
    @RequestMapping("/userAdmin")
    public String userAdmin() {
        return "_user_user";
    }

    /**
     * 用户管理
     *
     * @param request
     * @return
     */
    @RequestMapping("/userEdit")
    public String userEdit(HttpServletRequest request) {
        // 在导向编辑页面时，向request和session域中添加uuid随机数
        UUIDToken.generateUUIDToken(request);

        return "_user_userEdit";
    }

    /**
     * 修改管理
     *
     * @param request
     * @return
     */
    @RequestMapping("/userUpdate")
    public String userUpdate(HttpServletRequest request, String id) {

        // 在导向编辑页面时，向request和session域中添加uuid随机数
        UUIDToken.generateUUIDToken(request);

        // 根据ID读取用户数据
        UserCenterEmployee userCenterEmployees = userCenterEmployeeService.selectUserCenterEmployeeById(new Integer(id));
        // 根据ID读取用户权限
        List<UserEmployeeType> userEmployeeType = userEmployeeTypeService.selectUserEmployeeTypeId(new Integer(id));
        request.setAttribute("userCenterEmployees", userCenterEmployees);
        request.setAttribute("userEmployeeType", userEmployeeType);

        return "_user_userUpdate";
    }

    /**
     * 欢迎页
     *
     * @return
     */
    @RequestMapping("/welcome")
    public String welcome() {
        return "/manage/welcome";
    }

    /**
     * ajax检查验证码是否正确
     *
     * @param request
     * @return
     */
    @RequestMapping("/checkCode")
    @ResponseBody
    public Map<String, Object> checkCode(HttpServletRequest request, String code) {
        String rand = (String) request.getSession().getAttribute("rand");
        int result = 0;
        switch (code) {
            case "":

                break;
            default:
                if (rand.equalsIgnoreCase(code)) {
                    result = 1;
                }
                break;
        }
        Map<String, Object> map = new HashMap<>();
        map.put("result", result);
        return map;
    }

    /**
     * 账户登录
     *
     * @return
     * @throws UnsupportedEncodingException
     */
    @RequestMapping("/accountLogin")
    @ResponseBody
    public Map<String, Object> accountLogin(String em_account, String em_password) {
        Map<String, Object> map = new HashMap<>();
        if (!AppUtil.isNotNull(em_account) || !AppUtil.isNotNull(em_password)) {
            map.put("msg", "参数错误");
            return map;
        }
        // 登陆查询内部人员
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_phone(em_account);
        userCenterEmployee.setEm_password(MD5Util.GetMD5Code(em_password));
        UserCenterEmployee userCenterEmployees = userCenterEmployeeService.selectUserCenterEmployeeByName(userCenterEmployee);
        if (userCenterEmployees == null) {
            map.put("msg", "用户名或密码错误");
            return map;
        }
        // 查询员工职务部门
        Position position = new Position();
        position.setEm_id(userCenterEmployees.getEm_id());
        List<Position> positions = authorizationService.selectPositionById(position);
        if (!positions.isEmpty()) {
            Company company = authorizationService.selectCompanyInfo(positions.get(0).getUcc_id());
            if (company != null) {
                userCenterEmployees.setUcc_name(company.getUcc_name());
            }
        }
        // 设置Cookie
        try {
            AppUtil.setCurrentCookie(AppConfig.COOKIE_USER_ACCOUNT, userCenterEmployees.getEm_phone(), 60 * 60 * 24 * 7);
            AppUtil.setCurrentCookie(AppConfig.COOKIE_USER_ID, userCenterEmployees.getEm_id().toString());
            AppUtil.setCurrentCookie(AppConfig.COOKIE_USER_NAME, URLEncoder.encode(userCenterEmployees.getEm_name(), "UTF-8"));
            AppUtil.setCurrentCookie(AppConfig.COOKIE_USER_PHONE, URLEncoder.encode(userCenterEmployees.getEm_phone(), "UTF-8"));
            if (!StringUtils.isEmpty(userCenterEmployees.getUcc_name())) {
                AppUtil.setCurrentCookie(AppConfig.COOKIE_USER_DEPARTMENT, URLEncoder.encode(userCenterEmployees.getUcc_name(), "UTF-8"));
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            map.put("msg", "cookie设置失败");
            return map;
        }

        // 插入登陆记录
        String ipAddr = AppUtil.getIP();
        EmployeeOneLogin employeeOneLogin = new EmployeeOneLogin();
        employeeOneLogin.setEml_pcIp(ipAddr);
        employeeOneLogin.setEml_pcDate(new Date());
        employeeOneLogin.setEml_pcBool(1);
        employeeOneLogin.setEm_id(userCenterEmployees.getEm_id());
        EmployeeOneLogin employeeOneLogin1 = new EmployeeOneLogin();
        employeeOneLogin1.setEm_id(userCenterEmployees.getEm_id());
        EmployeeOneLogin employeeOneLogin2 = userCenterEmployeeService.queryEmployeeOneLogin(employeeOneLogin1);
        if (employeeOneLogin2 == null) {
            userCenterEmployeeService.InsertOneLogin(employeeOneLogin);
        } else {
            userCenterEmployeeService.updateEmployeeOneLogin(employeeOneLogin);
        }

        map.put("msg", "success");
        return map;
    }

    /**
     * 二维码账户登录
     *
     * @return
     * @throws UnsupportedEncodingException
     */
    @RequestMapping("/accountLoginQrcode")
    @ResponseBody
    public Map<String, Object> accountLoginQrcode(String em_phone, String em_password) {
        Map<String, Object> map = new HashMap<>();
        if (!AppUtil.isNotNull(em_phone) || !AppUtil.isNotNull(em_password)) {
            map.put("msg", "参数错误");
            return map;
        }
        // 登陆查询内部人员
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_phone(em_phone);
        userCenterEmployee.setEm_password(em_password);
        UserCenterEmployee userCenterEmployees = userCenterEmployeeService.selectUserCenterEmployeeByName(userCenterEmployee);
        if (userCenterEmployees == null) {
            map.put("msg", "用户名或密码错误");
            return map;
        }
        // 查询员工职务部门
        Position position = new Position();
        position.setEm_id(userCenterEmployees.getEm_id());
        List<Position> positions = authorizationService.selectPositionById(position);
        if (!positions.isEmpty()) {
            Company company = authorizationService.selectCompanyInfo(positions.get(0).getUcc_id());
            if (company != null) {
                userCenterEmployees.setUcc_name(company.getUcc_name());
            }
        }
        // 设置Cookie
        try {
            AppUtil.setCurrentCookie(AppConfig.COOKIE_USER_ACCOUNT, userCenterEmployees.getEm_phone(), 60 * 60 * 24 * 7);
            AppUtil.setCurrentCookie(AppConfig.COOKIE_USER_ID, userCenterEmployees.getEm_id().toString());
            AppUtil.setCurrentCookie(AppConfig.COOKIE_USER_NAME, URLEncoder.encode(userCenterEmployees.getEm_name(), "UTF-8"));
            AppUtil.setCurrentCookie(AppConfig.COOKIE_USER_PHONE, URLEncoder.encode(userCenterEmployees.getEm_phone(), "UTF-8"));
            if (!StringUtils.isEmpty(userCenterEmployees.getUcc_name())) {
                AppUtil.setCurrentCookie(AppConfig.COOKIE_USER_DEPARTMENT, URLEncoder.encode(userCenterEmployees.getUcc_name(), "UTF-8"));
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            map.put("msg", "cookie设置失败");
            return map;
        }
        map.put("msg", "success");
        return map;
    }

    /**
     * 验证码登录
     *
     * @return
     * @throws UnsupportedEncodingException
     */
    @RequestMapping("/mobileLogin")
    @ResponseBody
    public Map<String, Object> mobileLogin(String mobile, String mobile_code) {
        Map<String, Object> map = new HashMap<>();
        if (!AppUtil.isNotNull(mobile) || !AppUtil.isNotNull(mobile_code)) {
            map.put("msg", "参数错误");
            return map;
        }
        // 验证码判断
        MobileCode mobileCode = new MobileCode();
        mobileCode.setMc_phone(mobile);
        mobileCode.setMc_code(mobile_code);
        mobileCode.setMc_type("login");
        MobileCode mobileCode2 = moBileCodeService.queryMobileCodeByProperty(mobileCode);
        if (mobileCode2 == null) {
            map.put("msg", "验证码错误");
            return map;
        }
        // 如果验证码在有效期内，则不生成验证码
        if (new Date().getTime() >= mobileCode2.getMc_destroyTime().getTime()) {
            map.put("msg", "验证码失效，请重新获取验证码");
            return map;
        }
        // 判断验证码是否已被使用过，验证码只能使用一次
        if (null != mobileCode2.getMc_isUse() && 1 == mobileCode2.getMc_isUse()) {
            map.put("msg", "验证码过期，请重新获取验证码");
            return map;
        }
        // 登陆查询内部人员
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_phone(mobileCode2.getMc_phone());
        UserCenterEmployee userCenterEmployees = userCenterEmployeeService.selectUserCenterEmployeeByPhone(userCenterEmployee);
        if (userCenterEmployees == null) {
            map.put("msg", "用户不存在");
            return map;
        } else if (userCenterEmployees.getEm_state() == 2) {
            map.put("msg", "离职人员无法登录");
            return map;
        }
        // 查询员工职务部门
        Position position = new Position();
        position.setEm_id(userCenterEmployees.getEm_id());
        List<Position> positions = authorizationService.selectPositionById(position);
        if (!positions.isEmpty()) {
            Company company = authorizationService.selectCompanyInfo(positions.get(0).getUcc_id());
            if (company != null) {
                userCenterEmployees.setUcc_name(company.getUcc_name());
            }
        }
        // 设置Cookie
        try {
            AppUtil.setCurrentCookie(AppConfig.COOKIE_USER_ACCOUNT, userCenterEmployees.getEm_account(), 60 * 60 * 24 * 7);
            AppUtil.setCurrentCookie(AppConfig.COOKIE_USER_ID, userCenterEmployees.getEm_id().toString());
            AppUtil.setCurrentCookie(AppConfig.COOKIE_USER_NAME, URLEncoder.encode(userCenterEmployees.getEm_name(), "UTF-8"));
            AppUtil.setCurrentCookie(AppConfig.COOKIE_USER_PHONE, URLEncoder.encode(userCenterEmployees.getEm_phone(), "UTF-8"));

            // 设置验证码已被使用，不能第二次使用
            mobileCode.setMc_isUse(1);
            mobileCode.setMc_id(mobileCode2.getMc_id());
            moBileCodeService.updateMobileCode(mobileCode);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            map.put("msg", "cookie设置失败");
            return map;
        }
        map.put("msg", "success");
        return map;
    }

    /**
     * 用户注销
     *
     * @return
     */
    @RequestMapping("/removeSession")
    public String removeSession() {
        String em_account = AppUtil.getCookie("em_account");
        AppUtil.deleteCookie();
        AppUtil.setCurrentCookie("em_account", em_account);
        return "redirect:/login";
    }

    /**
     * 菜单读取
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/leftItem")
    @ResponseBody
    public Map<String, Object> leftItem() {
        Map<String, Object> map = new HashMap<>();
        // 从cookie中获取当前登陆人员
        UserCenterEmployee userCenterEmployee = AppUtil.getCookieEmployee();
        Powers powers = new Powers();
        powers.setEm_id(userCenterEmployee.getEm_id());
        // 查询当前人员拥有的菜单权限
        List<Powers> powersLists = new ArrayList<>();

        List<Powers> powersList = authorizationService.selectPersonPowers(powers);
        if (!powersList.isEmpty()) {
            // 查询当前职位拥有的菜单权限
            for (Powers power: powersList) {
                boolean bools = true;
                for (Powers powers2: powersLists) {
                    if (powers2.getUcps_id().equals(power.getUcps_id())) {
                        bools = false;
                        break;
                    }
                }
                if (bools) {
                    powersLists.add(power);
                }
            }
        }

        List<Powers> powersList2 = authorizationService.selectPositionPowers(powers);
        if (!powersList2.isEmpty()) {
            // 查询当前职位拥有的菜单权限
            for (Powers power: powersList2) {
                boolean bools = true;
                for (Powers powers2: powersLists) {
                    if (powers2.getUcps_id().equals(power.getUcps_id())) {
                        bools = false;
                        break;
                    }
                }
                if (bools) {
                    powersLists.add(power);
                }
            }
        }
        // 查询当前部门拥有的菜单权限
        List<Powers> powerList3 = authorizationService.selectPersonCompanyPowers(powers);
        if (!powerList3.isEmpty()) {
            for (Powers power: powerList3) {
                boolean bools = true;
                for (Powers powers2: powersLists) {
                    if (powers2.getUcps_id().equals(power.getUcps_id())) {
                        bools = false;
                        break;
                    }
                }
                if (bools) {
                    powersLists.add(power);
                }
            }
        }
        // 自定义排序
        powersLists.sort(Comparator.comparing(Powers::getUcps_asc));
        map.put("menuLists", powersLists);

        return map;
    }

    /**
     * 根据操作地址查询权限
     *
     * @param url
     * @param ucps_type
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/userJurisdiction")
    @ResponseBody
    public Map<String, Object> userJurisdiction(String url, Integer ucps_type) {
        Map<String, Object> map = new HashMap<>();

        Powers powers1 = new Powers();
        powers1.setUcps_url(url);
        powers1 = authorizationService.selectPowersUrl(powers1);
        if (powers1 == null) {
            return null;
        }

        // 从cookie中获取当前登陆人员
        UserCenterEmployee userCenterEmployee = AppUtil.getCookieEmployee();
        Powers powers = new Powers();
        powers.setEm_id(userCenterEmployee.getEm_id());
        powers.setUcps_pid(powers1.getUcps_id());
        powers.setUcps_type(ucps_type);
        // 查询当前人员拥有的菜单权限
        List<Powers> powersLists = new ArrayList<>();

        List<Powers> powersList = authorizationService.selectPersonPowers(powers);
        if (!powersList.isEmpty()) {
            // 查询当前人员拥有的菜单权限
            for (Powers power: powersList) {
                boolean bools = true;
                for (Powers powers2: powersLists) {
                    if (powers2.getUcps_id().equals(power.getUcps_id())) {
                        bools = false;
                        break;
                    }
                }
                if (bools) {
                    powersLists.add(power);
                }
            }
        }

        List<Powers> powersList2 = authorizationService.selectPositionPowers(powers);
        if (!powersList2.isEmpty()) {
            // 查询当前职位拥有的菜单权限
            for (Powers power: powersList2) {
                boolean bools = true;
                for (Powers powers2: powersLists) {
                    if (powers2.getUcps_id().equals(power.getUcps_id())) {
                        bools = false;
                        break;
                    }
                }
                if (bools) {
                    powersLists.add(power);
                }
            }
        }
        // 查询当前部门拥有的菜单权限
        List<Powers> powerList3 = authorizationService.selectPersonCompanyPowers(powers);
        if (!powerList3.isEmpty()) {
            for (Powers power: powerList3) {
                boolean bools = true;
                for (Powers powers2: powersLists) {
                    if (powers2.getUcps_id().equals(power.getUcps_id())) {
                        bools = false;
                        break;
                    }
                }
                if (bools) {
                    powersLists.add(power);
                }
            }
        }
        // 自定义排序
        powersLists.sort(new Comparator<Powers>() {
            public int compare(Powers p1, Powers p2) {
                return p1.getUcps_asc().compareTo(p2.getUcps_asc());
            }
        });
        map.put("menuLists", powersLists);

        return map;
    }

    /**
     * 根据操作地址查询权限
     *
     * @param url
     * @param ucps_type
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/userJurisdictionBool")
    @ResponseBody
    public Map<String, Object> userJurisdictionBool(String url, Integer ucps_type) {

        Map<String, Object> map = new HashMap<>();

        boolean bools = false;

        Powers powers1 = new Powers();
        powers1.setUcps_url(url);
        Powers selectPowersUrl = authorizationService.selectPowersUrl(powers1);
        if (selectPowersUrl == null) {
            return map;
        }

        // 从cookie中获取当前登陆人员
        UserCenterEmployee userCenterEmployee = AppUtil.getCookieEmployee();
        Powers powers = new Powers();
        powers.setEm_id(userCenterEmployee.getEm_id());
        powers.setUcps_id(selectPowersUrl.getUcps_id());
        powers.setUcps_type(ucps_type);
        // 人员权限
        List<Powers> powersList = authorizationService.selectPersonPowers(powers);
        bools = !powersList.isEmpty();

        // 职位权限
        List<Powers> powersList2 = authorizationService.selectPositionPowers(powers);
        if (!powersList2.isEmpty()) {
            bools = true;
        } else {
            if (!bools) {
                bools = false;
            }
        }

        // 查询当前部门拥有的菜单权限
        List<Powers> powerList3 = authorizationService.selectPersonCompanyPowers(powers);
        if (!powerList3.isEmpty()) {
            bools = true;
        } else {
            if (!bools) {
                bools = false;
            }
        }

        map.put("bool", bools);

        return map;

    }

    /**
     * 插入用户
     *
     * @param request
     * @param name       用户姓名
     * @param sex        性别
     * @param department 部门
     * @param phone      联系电话
     * @param account    账号
     * @param password   密码
     * @param station    岗位
     * @param address    地址
     * @param chek       权限
     * @return
     */
    @RequestMapping("/userInsert")
    public String userInsert(HttpServletRequest request, String name, String[] sex, String department, String phone, String account, String password, String station, String address, String[] chek) {

        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_name(name);
        userCenterEmployee.setEm_position(department);
        userCenterEmployee.setEm_phone(phone);
        userCenterEmployee.setEm_account(account);
        userCenterEmployee.setEm_password(MD5Util.GetMD5Code(password));
        userCenterEmployee.setEm_post(station);
        userCenterEmployee.setEm_address(address);
        for (String aSex: sex) {
            userCenterEmployee.setEm_sex(aSex);
        }

        // 判断是否重复提交
        if (!UUIDToken.isRepeatSubmit(request)) {
            Integer boolInt = userCenterEmployeeService.insertUserCenterEmployee(userCenterEmployee);
            if (boolInt > 0) {
                UserEmployeeType userEmployeeType = new UserEmployeeType();
                userEmployeeType.setEm_id(userCenterEmployee.getEm_id());
                if (chek != null && chek.length != 0) {
                    for (int i = 0; i < chek.length; i++) {
                        userEmployeeType.setEt_name(chek[i]);
                        userEmployeeType.setEt_num(i);
                        userEmployeeTypeService.insertUserEmployeeType(userEmployeeType);
                    }
                }
            }
        } else {
            return "_user_user";
        }

        request.getSession().removeAttribute("token");// 移除session中的token

        return "_user_user";
    }

    /**
     * 修改用户
     *
     * @param request
     * @param name       用户姓名
     * @param sex        性别
     * @param department 部门
     * @param phone      联系电话
     * @param account    账号
     * @param password   密码
     * @param station    岗位
     * @param address    地址
     * @param chek       权限
     * @return
     */
    @RequestMapping("/userUpdateTo")
    public String userUpdateTo(HttpServletRequest request, String id, String name, String[] sex, String department, String phone, String account, String password, String station, String address, String state, String[] chek) {

        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_id(new Integer(id));
        userCenterEmployee.setEm_name(name);
        userCenterEmployee.setEm_position(department);
        userCenterEmployee.setEm_phone(phone);
        userCenterEmployee.setEm_state(new Integer(state));
        if (!password.equals("")) {
            userCenterEmployee.setEm_password(MD5Util.GetMD5Code(password));
        }
        userCenterEmployee.setEm_post(station);
        userCenterEmployee.setEm_address(address);
        for (String aSex: sex) {
            userCenterEmployee.setEm_sex(aSex);
        }

        // 判断是否重复提交
        if (!UUIDToken.isRepeatSubmit(request)) {
            Integer boolInt = userCenterEmployeeService.updatetUserCenterEmployee(userCenterEmployee);
            if (boolInt > 0) {
                if (!userEmployeeTypeService.selectUserEmployeeTypeId(new Integer(id)).isEmpty()) {
                    userEmployeeTypeService.deleteUserEmployeeType(new Integer(id));
                }
                if ((new Integer(state)) == 1) {
                    UserEmployeeType userEmployeeType = new UserEmployeeType();
                    userEmployeeType.setEm_id(userCenterEmployee.getEm_id());
                    if (chek != null && chek.length != 0) {
                        for (int i = 0; i < chek.length; i++) {
                            userEmployeeType.setEt_name(chek[i]);
                            userEmployeeType.setEt_num(i);
                            userEmployeeTypeService.insertUserEmployeeType(userEmployeeType);
                        }
                    }

                }
            }
        } else {
            return "_user_user";
        }

        request.getSession().removeAttribute("token");// 移除session中的token

        return "_user_user";
    }

    /**
     * 判断用户账号是否可用
     *
     * @param fieldId    编号
     * @param fieldValue 用户账号
     * @return
     * @throws UnsupportedEncodingException
     */
    @RequestMapping("/accountBool")
    @ResponseBody
    public String accountBool(String fieldId, String fieldValue) {
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_account(fieldValue);

        String info = "[\"" + fieldId + "\",true]";

        if (!userCenterEmployeeService.selectAccount(userCenterEmployee).isEmpty()) {
            info = "[\"" + fieldId + "\",false]";
        }

        return info;
    }

    /**
     * ajax修改密码前查询原密码
     *
     * @return
     */
    @RequestMapping("/selectPass")
    @ResponseBody
    public Map<String, Object> selectPass(String oldPassword, String em_id) {
        UserCenterEmployee userCenterEmployees = userCenterEmployeeService.selectUserCenterEmployeeById(new Integer(em_id));
        String oldPasswordMd5 = MD5Util.GetMD5Code(oldPassword);
        int result = 0;
        if (userCenterEmployees != null) {
            if (userCenterEmployees.getEm_password().equals(oldPasswordMd5)) {
                result = 1;
            }
        }
        Map<String, Object> map = new HashMap<>();
        map.put("result", result);
        return map;
    }

    /**
     * ajax修改密码
     *
     * @return
     */
    @RequestMapping("/updatePs")
    @ResponseBody
    public Map<String, Object> updatePs(String newPassword, String em_id) {
        String newPasswordMd5 = MD5Util.GetMD5Code(newPassword);
        int result = 1;
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_id(Integer.parseInt(em_id));
        userCenterEmployee.setEm_password(newPasswordMd5);
        result = userCenterEmployeeService.updatePs(userCenterEmployee);
        Map<String, Object> map = new HashMap<>();
        map.put("result", result);
        return map;
    }

    /**
     * ajax修改人员信息
     *
     * @return
     */
    @RequestMapping("/updateEmployeeById")
    @ResponseBody
    public Map<String, Object> updateEmployeeById(UserCenterEmployee userCenterEmployee, Model model, String em_chiefPoss) {
        HashMap<String, Object> map = new HashMap<>();
        if (!"null".equals(em_chiefPoss) && em_chiefPoss != null) {
            userCenterEmployee.setEm_chiefPos(Integer.parseInt(em_chiefPoss));
        }
//        // 离职时从部门移除
//        if (userCenterEmployee.getEm_state() == 0) {
//            authorizationService.deleteEmployeePositionByEmId(userCenterEmployee);
//        }
        int result = userCenterEmployeeService.updateEmployeeById(userCenterEmployee);
        map.put("result", result);
        return map;
    }

    /**
     * ajax本人修改人员信息
     *
     * @return
     */
    @RequestMapping("/updateUser")
    @ResponseBody
    public Map<String, Object> updateUser(UserCenterEmployee userCenterEmployee) {
        Map<String, Object> map = new HashMap<>();
        int result = userCenterEmployeeService.updateUser(userCenterEmployee);
        map.put("result", result);
        return map;
    }

    /**
     * ajax重置密码
     *
     * @return
     */
    @RequestMapping("/resetPassword")
    @ResponseBody
    public Map<String, Object> resetPassword(String em_id) {
        Map<String, Object> map = new HashMap<>();
        UserCenterEmployee userCenterEmployees = userCenterEmployeeService.selectUserCenterEmployeeById(new Integer(em_id));
        int result = 0;
        if (userCenterEmployees.getEm_documentID() != null && !"".equals(userCenterEmployees.getEm_documentID())) {
            String password = userCenterEmployees.getEm_documentID().substring(userCenterEmployees.getEm_documentID().length() - 6, userCenterEmployees.getEm_documentID().length());
            userCenterEmployees.setEm_password(MD5Util.GetMD5Code(password));
            result = userCenterEmployeeService.updatePs(userCenterEmployees);
        }
        map.put("result", result);
        return map;
    }

    /**
     * 添加人员
     *
     * @return
     */
    @RequestMapping("/insertEmployee")
    @ResponseBody
    public Map<String, Object> insertEmployee(UserCenterEmployee userCenterEmployee) {
        Map<String, Object> map = new HashMap<>();
        String password = userCenterEmployee.getEm_documentID().substring(userCenterEmployee.getEm_documentID().length() - 6, userCenterEmployee.getEm_documentID().length());
        userCenterEmployee.setEm_password(MD5Util.GetMD5Code(password));
        userCenterEmployee.setEm_createTime(new Date());
        userCenterEmployee.setEm_state(1);
        userCenterEmployeeService.insertUserCenterEmployee(userCenterEmployee);
        new TaskConfig().userXmlTo();
        return map;
    }

    /**
     * 添加角色
     *
     * @param response
     * @return
     */
    @RequestMapping("/addRole")
    @ResponseBody
    public Map<String, Object> addRole(HttpServletResponse response, String ucr_name, String ucr_text) {
        Map<String, Object> map = new HashMap<>();
        // Role role = new Role();
        // role.setUcr_name(ucr_name);
        // role.setUcr_text(ucr_text);
        // role.setUcr_date(new Date());
        // role.setUcr_state(0);
        // int result = userCenterEmployeeService.addRole(role);
        map.put("result", -1);
        return map;
    }

    /**
     * 上传用户头像
     *
     * @param request
     * @return
     * @author JiangQT
     */
    @RequestMapping("/uploadUserPic")
    @ResponseBody
    public String uploadUserPic(MultipartHttpServletRequest request) {
        Msg<Object> msg = new Msg<>();
        MultipartFile multipartFile = request.getFile("Filedata");
        if (!multipartFile.isEmpty()) {
            if (multipartFile.getSize() > 1000 * 1024 * 4) {
                return "110";// 图片大小不得超过4M
            }
            try {
                String path_temp = request.getSession().getServletContext().getRealPath("/") + "resources/image/upload";
                // String imgFiletemp =
                // request.getSession().getServletContext().getRealPath(path_temp);
                File upFileTemp = new File(path_temp);
                /* 根据真实路径创建目录 **/
                if (!upFileTemp.exists()) {
                    upFileTemp.mkdirs();
                }
                String filename = multipartFile.getOriginalFilename();
                filename = filename.substring(filename.lastIndexOf("."));
                StringBuilder sb = new StringBuilder();
                sb.append(new Date().getTime());
                sb.append(Randoms.randomss());
                sb.append(filename);
                String src = path_temp + "/" + sb.toString();
                // FileCopyUtils.copy(file.getBytes(), new File(src));
                multipartFile.transferTo(new File(src));
                AppUtil.setSession("UserPicSrc", src);
                msg.setData("/resources/image/upload/" + sb.toString());
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            return "111";// 没有图片
        }
        return msg.toString();
    }

    /**
     * 剪切用户头像
     *
     * @param request
     * @param src
     * @param x
     * @param y
     * @return
     * @throws Exception
     * @author JiangQT
     */
    @RequestMapping("cutUserPic")
    @ResponseBody
    public String cutUserPic(HttpServletRequest request, String src, int x, int y, int width, int height, String type) throws Exception {
        Msg<Object> msg = new Msg<>();
        // 验证session路径是否存在
        String srcPic = (String) AppUtil.getSession("UserPicSrc");
        if (StringUtils.isEmpty(srcPic)) {
            msg.setCode(110);
            msg.setMsg("请选择图片");
            return msg.toString();
        }
        // 验证用户头像正式目录
        String path_temp = request.getSession().getServletContext().getRealPath("/") + "resources/userImage";
        // String imgFile =
        // request.getSession().getServletContext().getRealPath(path_temp);
        File upFile = new File(path_temp);
        /* 根据真实路径创建目录 **/
        if (!upFile.exists()) {
            upFile.mkdirs();
        }
        // 验证查询出路径图片名称
        String srcPicName = srcPic.substring(srcPic.lastIndexOf("/") + 1);
        String outFile = path_temp + "/" + srcPicName;
        boolean boo = AppUtil.cutZoomPic(srcPic, outFile, x, y, width, height, 110, 110, true);
        if (!boo) {
            msg.setCode(110);
            msg.setMsg("保存图片失败，请重试");
            return msg.toString();
        }
        // 获取properties路劲
        String path = this.getClass().getResource("/conf/path.properties").getPath();
        // 把properties文件转化输出流
        InputStream in = new BufferedInputStream(new FileInputStream(path));
        Properties properties = new Properties();
        properties.load(in);
        //
        String imagePath = properties.getProperty("userImagePaths");
        // 上传到ftp服务器哪个路径下
        String paths = properties.getProperty("userpaths");
        // 地址
        String addr = properties.getProperty("useraddrs");
        // 端口号
        int port = Integer.parseInt(properties.getProperty("userports"));
        // 用户名
        String username = properties.getProperty("userusernames");
        // 密码
        String password = properties.getProperty("userpasswords");
        // 本地路径
        String local = request.getSession().getServletContext().getRealPath("") + "/resources/userImage/" + srcPicName;
        URLUploadImage.run(paths, addr, port, username, password, local);
        // 修改头像
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        UserCenterEmployee ucEmployee = userCenterEmployeeService.selectEmployeeById(employee.getEm_id());
        ucEmployee.setEm_image(imagePath + "/" + srcPicName);
        userCenterEmployeeService.updateImage(ucEmployee);

        // 登陆对象
        UserCenterEmployee userCookie = new UserCenterEmployee();
        userCookie.setEm_id(employee.getEm_id());
        userCookie.setEm_account(employee.getEm_account());
        userCookie.setEm_phone(employee.getEm_phone());
        if (employee.getUcp_name() != null && employee.getUcc_short() != null) {
            userCookie.setUcp_name(URLEncoder.encode(employee.getUcp_name(), "UTF-8"));
            userCookie.setUcc_short(URLEncoder.encode(employee.getUcc_short(), "UTF-8"));
        }
        // cookie 转码
        userCookie.setEm_name(URLEncoder.encode(employee.getEm_name(), "UTF-8"));
        userCookie.setEm_image(imagePath + "/" + srcPicName);

        // 删除缓存文件
        AppUtil.delFile(srcPic);
        // 清空头像src session
        AppUtil.removeSession("UserPicSrc");
        msg.setMsg("保存成功");
        return msg.toString();
    }

    /**
     * 查询所有在职人员聊天数据
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/chatPerson")
    @ResponseBody
    public Map<String, Object> chatPerson() {
        Map<String, Object> map = new HashMap<>();
        List<UserCenterEmployee> selectALLMessage = userCenterEmployeeService.selectALLMessage();
        for (UserCenterEmployee selectALLMessages: selectALLMessage) {
            String em_image = selectALLMessages.getEm_image();
            if (em_image != null) {
                selectALLMessages.setEm_image(OSSparameter.imagePath(em_image, null, null));
            }
        }
        map.put("selectALLMessage", selectALLMessage);
        return map;
    }

    /**
     * 上传图片
     *
     * @param request
     * @param data      图片数据
     * @param imageType 图片类型
     * @param type      存储类型
     * @return
     * @author JiangQT
     */
    @RequestMapping("/uploadHouseImage")
    @ResponseBody
    public String uploadHouseImage(HttpServletRequest request, String data, String type, String imageType, String em_id) {
        Msg<Object> msg = new Msg<>();
        HashMap<String, Object> map = new HashMap<>();
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
            msg.setCode(110);
            msg.setMsg(Msg.MSG_SYSTEM_ERROR);
            return msg.toString();
        }
        // 图片压缩
        File file = new File(imageUrl);
        try {
            ImageUtil.saveMinPhoto(file.toString(), file.toString(), 936, 0.9d);
        } catch (Exception e) {
            System.out.print("图片压缩失败");
        }
        // 远程上传
        String image = AppUtil.uploadHouseImage(getClass(), file);

        // // 【数据库添加】
        // Integer hm_id = uploadHouseImageService.addHouseImageService(type,
        // image, imageType);
        Integer hm_id = null;
        UserCenterEmployee employee = null;
        if (em_id != null && !em_id.trim().equals("")) {
            // employee = AppUtil.getCookieEmployee(request);
            employee = userCenterEmployeeService.selectUserCenterEmployeeById(Integer.parseInt(em_id));
            // employee.setEm_id(Integer.parseInt(em_id));
            employee.setEm_cardImage(image);
            hm_id = userCenterEmployeeService.updateImage(employee);
            map.put("userImage", "");
        } else {
            map.put("userImage", image);
        }

        map.put("image", image);
        map.put("imageType", imageType);
        map.put("hm_id", hm_id);
        msg.setData(map);
        return msg.toString();
    }

    /**
     * 访问申请离职人员
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/quitUser")
    public String quitUser() {
        return "/user/userDistribution";
    }

    /**
     * 申请离职用户
     *
     * @param tableList1
     * @return
     * @throws ParseException
     * @author 陈智颖
     */
    @RequestMapping("/quitUserList")
    @ResponseBody
    public Map<String, Object> quitUserList(TableList tableList1) throws ParseException {

        // 初始化获取对象
        TableList tableList = tableList1.initData(tableList1);
        // 条件装载
        PageModel<UserCenterEmployee> pageModel1 = new PageModel<UserCenterEmployee>();
        PageModel<UserCenterEmployee> whereData = pageModel1.getWhereData(tableList, "yyyy-MM-dd");
        UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();
        // 获取部门编码
        Company company = new Company();
        company.setEm_id(cookieEmployee.getEm_id());
        List<Company> companies = authorizationService.selectCompanyEmid(company);
        UserCenterEmployee t = new UserCenterEmployee();
//        t.setUcc_id(selectCompanyEmid.getUcc_id());
        if(null != companies && !companies.isEmpty()){
            Integer[] uccArray = new Integer[companies.size()];
            for (int i = 0; i < companies.size(); i++){
                uccArray[i] = companies.get(i).getUcc_id();
            }
            t.setUccArray(uccArray);
        }

        whereData.setT(t);
        // 装载数据类
        DataList<UserCenterEmployee> datalist = new DataList<UserCenterEmployee>();
        // 查询分页实体
        PageModel<UserCenterEmployee> pageModel = authorizationService.selectCompanyQuitUser(whereData);
        // 装载数据
        return datalist.dataList(pageModel.getList(), tableList.getPageNo(), whereData.getPageSize(), pageModel.getTotalRecords(), pageModel.getSumMoney());
    }

    /**
     * 房源分配
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/houseArrange")
    public String houseArrange() {
        return "/user/userDistributionTrusteeship";
    }

    /**
     * 人员离职申请
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/closeCompany")
    @ResponseBody
    public Map<String, Object> closeCompany(String text, Integer em_id) {

        Map<String, Object> map = new HashMap<>();

        UserCenterEmployee cookieEmployee = new UserCenterEmployee();
        if (em_id != null) {
            cookieEmployee.setEm_id(em_id);
        } else {
            cookieEmployee = AppUtil.getCookieEmployee();
            cookieEmployee.setEm_account(null);
        }
        UserCenterEmployee userCenterEmployees = userCenterEmployeeService.selectAccount(cookieEmployee).get(0);

        if (userCenterEmployees.getEm_state() != 1) {
            map.put("message", "repeat");
            return map;
        }
        cookieEmployee.setEm_quitRemark(text);
        cookieEmployee.setEm_state(2);
        int bools = userCenterEmployeeService.updatetCloseCompany(cookieEmployee, 1);

        if (bools > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 根据合同类型和人员查询合同
     *
     * @param em_id 人员编码
     * @param type  合同类型
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/houseArrangeList")
    @ResponseBody
    public Map<String, Object> houseArrangeList(Integer em_id, String type) {
        Map<String, Object> map = new HashMap<>();

        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_id(em_id);
        userCenterEmployee.setContractObject_Type(type);
        List<UserCenterEmployee> selectHouseEmContract = userCenterEmployeeService.selectHouseEmContract(userCenterEmployee);
        map.put("houseEmContractEm", selectHouseEmContract);

        return map;
    }

    /**
     * 提交房源分配(房源分配-托管合同分配)(客户分配-租赁合同分配)
     *
     * @param contractNo 合同数组
     * @param em_id      现用户编码
     * @param type       类型：租赁合同or托管合同
     * @param cir_author 操作人
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/submitArrange")
    @ResponseBody
    public Map<String, Object> submitArrange(@RequestParam("contractNo[]") List<Object> contractNo, Integer em_id, String type, Integer newEm_id, Integer cir_author) {
        Map<String, Object> map = new HashMap<>();
        try {
            for (int i = 0; i < contractNo.size(); i++) {
                Integer contractID = Integer.valueOf(contractNo.get(i).toString());
                map = userCenterEmployeeService.addSubmitArrange(contractID, em_id, type, newEm_id, 1, cir_author);
            }
            map.put("message", "success");
        } catch (Exception e) {
            map.put("message", "error");
            e.printStackTrace();
        }
        return map;
    }

    /**
     * 完成离职人员申请通过
     *
     * @param em_id
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/selectHouseEmContractEmBool")
    @ResponseBody
    public Map<String, Object> selectHouseEmContractEmBool(Integer em_id) {
        Map<String, Object> map = new HashMap<>();
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_id(em_id);
        List<UserCenterEmployee> selectHouseEmContract = userCenterEmployeeService.selectHouseEmContract(userCenterEmployee);
        if (selectHouseEmContract.size() == 0) {//分配完成后才能通过
            userCenterEmployee.setEm_state(3);
            int boolst = userCenterEmployeeService.updatetCloseCompany(userCenterEmployee, 2);
            if (boolst > 0) {
                map.put("message", "success");
            } else {
                map.put("message", "error");
            }
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 取消离职人员
     *
     * @param em_id
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/closeUser")
    @ResponseBody
    public Map<String, Object> closeUser(Integer em_id, Integer cir_author) {
        Map<String, Object> map = new HashMap<>();
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_id(em_id);
        userCenterEmployee.setEm_state(1);
        try {
            //cancel取消離職
            userCenterEmployeeService.cancelResignation(em_id, userCenterEmployee, 2, cir_author);
            map.put("message", "success");
        } catch (Exception e) {
            map.put("message", "error");
            e.printStackTrace();
        }
        return map;
    }

    /**
     * 一键分配房屋
     *
     * @param em_id
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/oneDistribution")
    @ResponseBody
    public Map<String, Object> oneDistribution(Integer em_id, Integer new_em, Integer cir_author) {
        Map<String, Object> map = new HashMap<>();
        //int boolt = userCenterEmployeeService.updateOneDistribution(em_id, new_em);
        //查询离职管家名下的所有有效合同
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_id(em_id);
        List<UserCenterEmployee> selectHouseEmContract = userCenterEmployeeService.selectHouseEmContract(userCenterEmployee);
        try {
            for (UserCenterEmployee userCenterEmployee1: selectHouseEmContract) {//对每个房屋合同分配
                userCenterEmployeeService.addSubmitArrange(userCenterEmployee1.getContractObject_Id(), em_id, userCenterEmployee1.getContractObject_Type(), new_em, 1, cir_author);
            }
            map.put("message", "success");
        } catch (Exception e) {
            map.put("message", "error");
            e.printStackTrace();
        }
        return map;
    }

    /**
     * 查询销售部门的
     *
     * @author 陈智颖
     * @date Feb 9, 2017 9:27:14 AM
     */
    @RequestMapping("/saleDepartment")
    @ResponseBody
    public Map<String, Object> saleDepartment() {
        Map<String, Object> map = new HashMap<>();

        List<Company> selectSaleCompany = userCenterEmployeeService.selectSaleCompany();
        map.put("company", selectSaleCompany);
        return map;
    }

    /******** 内部人员APP界面 ********/
    @RequestMapping("/appUser")
    public String appUser() {
        return "/appPage/employee";
    }

    /**
     * App查询内部人员
     *
     * @return
     * @author 陈智颖
     * @date Mar 28, 2017 9:13:28 PM
     */
    @RequestMapping("/appUserList")
    @ResponseBody
    public Map<String, Object> appUserList() {
        Map<String, Object> map = new HashMap<>();
        List<Company> companies = userCenterEmployeeService.appQueryAllCompany();
        List<InsiderVo> insiderVos = new ArrayList<>();
        for (Company company: companies) {
            InsiderVo insiderVo = new InsiderVo();
            insiderVo.setUcc_name(company.getUcc_name());
            UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
            userCenterEmployee.setUcc_id(company.getUcc_id());
            List<UserCenterEmployee> queryEmployeeApp = userCenterEmployeeService.queryEmployeeApp(userCenterEmployee);
            List<InsiderUserVo> insiderUserVos = new ArrayList<>();
            for (UserCenterEmployee userCenterEmployee1: queryEmployeeApp) {
                int woman = (int) Math.round(Math.random() * 4);
                int man = (int) Math.round(Math.random() * 3);
                InsiderUserVo insiderUserVo = new InsiderUserVo();
                insiderUserVo.setEm_id(userCenterEmployee1.getEm_id());
                insiderUserVo.setEm_name(userCenterEmployee1.getEm_name());
                insiderUserVo.setEm_phone(userCenterEmployee1.getEm_phone());
                insiderUserVo.setUcp_name(userCenterEmployee1.getUcp_name());
                if (userCenterEmployee1.getEm_image() != null && !userCenterEmployee1.equals("")) {
                    insiderUserVo.setEm_image(OSSparameter.imagePath(userCenterEmployee1.getEm_image()));
                } else {
                    if (userCenterEmployee1.getEm_sex().equals("man")) {
                        insiderUserVo.setEm_image(OSSparameter.imagePath("potoImage/head-portrait_0" + man + ".png"));
                    } else {
                        insiderUserVo.setEm_image(OSSparameter.imagePath("potoImage/head-portrait_0" + woman + ".png"));
                    }
                }
                insiderUserVo.setUcc_name(userCenterEmployee1.getUcc_name());
                insiderUserVos.add(insiderUserVo);
            }
            insiderVo.setInsiderUserVos(insiderUserVos);
            insiderVos.add(insiderVo);
        }
        if (insiderVos.isEmpty()) {
            map.put("code", 401);
            map.put("msg", "没有更多数据");
        } else {
            map.put("code", 200);
            map.put("data", insiderVos);
        }
        return map;
    }

    /**
     * App查询内部人员
     *
     * @return
     * @author 陈智颖
     * @date Mar 28, 2017 9:13:28 PM
     */
    @RequestMapping("/appUserListWhere")
    @ResponseBody
    public Map<String, Object> appUserListWhere(String where) {
        Map<String, Object> map = new HashMap<>();
        if (where == null || where.equals("")) {
            map.put("code", 401);
            map.put("msg", "没有更多数据");
            return map;
        }
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setWhereList(where);
        List<UserCenterEmployee> queryEmployeeApp = userCenterEmployeeService.queryEmployeeApp(userCenterEmployee);
        List<InsiderUserVo> insiderUserVos = new ArrayList<>();
        for (UserCenterEmployee userCenterEmployee1: queryEmployeeApp) {
            int woman = (int) Math.round(Math.random() * (3 - 3 + 1) + 3);
            int man = (int) Math.round(Math.random() * 2 + 1);
            InsiderUserVo insiderUserVo = new InsiderUserVo();
            insiderUserVo.setEm_id(userCenterEmployee1.getEm_id());
            insiderUserVo.setEm_name(userCenterEmployee1.getEm_name());
            insiderUserVo.setEm_phone(userCenterEmployee1.getEm_phone());
            insiderUserVo.setUcp_name(userCenterEmployee1.getUcp_name());
            if (userCenterEmployee1.getEm_image() != null && !userCenterEmployee1.equals("")) {
                insiderUserVo.setEm_image(OSSparameter.imagePath(userCenterEmployee1.getEm_image()));
            } else {
                if (userCenterEmployee1.getEm_sex().equals("man")) {
                    insiderUserVo.setEm_image(OSSparameter.imagePath("potoImage/head-portrait_0" + man + ".png"));
                } else {
                    insiderUserVo.setEm_image(OSSparameter.imagePath("potoImage/head-portrait_0" + woman + ".png"));
                }
            }
            insiderUserVo.setUcc_name(userCenterEmployee1.getUcc_name());
            insiderUserVos.add(insiderUserVo);
        }
        if (insiderUserVos.isEmpty()) {
            map.put("code", 401);
            map.put("msg", "没有更多数据");
        } else {
            map.put("code", 200);
            map.put("data", insiderUserVos);
        }
        return map;
    }

    /**
     * 获取登录验证码
     *
     * @param mc_phone
     * @return
     * @author 王孝元
     */
    @RequestMapping("/getLoginCode2")
    @ResponseBody
    @Deprecated
    public Map<String, Object> getLoginCode(String mc_phone) {
        Map<String, Object> map = new HashMap<>();
        if (!AppUtil.isNotNull(mc_phone)) {
            map.put("msg", "参数错误");
            return map;
        }
        String sendCode = "";
        // 1.查询验证码
        MobileCode mobileCode = new MobileCode();
        mobileCode.setMc_phone(mc_phone);
        mobileCode.setMc_type("login");
        MobileCode mobileCode2 = moBileCodeService.queryMobileCodeByProperty(mobileCode);
        // 如果验证码在有效期内，则不生成验证码 或验证码还未使用，也不生成验证码
        if (mobileCode2 != null && new Date().getTime() < mobileCode2.getMc_destroyTime().getTime() && (null != mobileCode2.getMc_isUse() && 0 == mobileCode2.getMc_isUse())) {
            sendCode = mobileCode2.getMc_code();
        } else {
            sendCode = AppUtil.getRandNum(6);
            // 保存验证码
            MobileCode mobileCode3 = new MobileCode();
            mobileCode3.setMc_code(sendCode);
            mobileCode3.setMc_phone(mc_phone);
            mobileCode3.setMc_type("login");
            mobileCode3.setMc_createTime(new Date());
            mobileCode3.setMc_destroyTime(new Date(new Date().getTime() + 5 * 60 * 1000));
            mobileCode3.setMc_isUse(0);
            moBileCodeService.addMobileCode(mobileCode3);
        }
        SendMsg.sendLoginCode(mc_phone, sendCode);
        map.put("msg", "success");
        return map;
    }

    /**
     * 验证手机号是否已在本系统注册
     */
    @RequestMapping("/checkPhoneNo")
    @ResponseBody
    public Map<String, Object> checkPhoneNo(String em_phone) {
        Map<String, Object> map = new HashMap<>();
        if (!AppUtil.isNotNull(em_phone)) {
            map.put("msg", "参数错误");
            return map;
        }
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_phone(em_phone);
        userCenterEmployee = userCenterEmployeeService.selectUserCenterEmployeeByPhone(userCenterEmployee);
        map.put("userCenterEmployee", userCenterEmployee);
        map.put("msg", "success");

        return map;
    }

    /**
     * 身份证验证
     *
     * @author 陈智颖
     */
    @RequestMapping("/cardImagePoto")
    @ResponseBody
    public Map<String, Object> cardImagePoto(MultipartHttpServletRequest request) {
        MultipartFile file = request.getFiles("file").get(0);
        CommonsMultipartFile cf = (CommonsMultipartFile) file;
        DiskFileItem fi = (DiskFileItem) cf.getFileItem();
        File f = fi.getStoreLocation();
        return IDcard.cardUtil(f);
    }

    /**
     * 检查是否有出房调价权限
     *
     * @param
     * @return
     * @author shenhx
     * @date 2017-05-26
     */
    @RequestMapping("/checkRoleJdjustPrice")
    @ResponseBody
    public Map<String, Object> checkRoleJdjustPrice(String ucps_url) {
        Map<String, Object> map = new HashMap<>();
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setUcps_url(ucps_url);
        userCenterEmployee.setEm_id(AppUtil.getCookieEmployee().getEm_id());
        List<Integer> sizeList = userCenterEmployeeService.checkRoleJdjustPrice(userCenterEmployee);
        boolean hasAdjustPrice = false;
        for (Integer in: sizeList) {
            if (in > 0) {
                hasAdjustPrice = true;
                break;
            }
        }
        map.put("hasAdjustPrice", hasAdjustPrice);
        return map;
    }
}
