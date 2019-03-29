package com.gjp.controller;

import com.gjp.model.Company;
import com.gjp.model.EmployeeOneLogin;
import com.gjp.model.Position;
import com.gjp.model.UserCenterEmployee;
import com.gjp.service.AuthorizationService;
import com.gjp.service.UserCenterEmployeeService;
import com.gjp.util.AppUtil;
import com.gjp.util.MD5Util;
import com.gjp.util.OSSparameter;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.annotation.Resource;
import javax.servlet.ServletResponse;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/appLogin")
public class AppLoginController {

    // 内部人员
    @Resource
    private UserCenterEmployeeService employeeService;

    // 权限
    @Resource
    private AuthorizationService authorizationService;

    /**
     * APP登录判断
     *
     * @param phone     用户账号
     * @param password  用户密码
     * @param version   app版本号
     * @param phoneType 手机类型 android 或者 ios
     * @param phoneCode 手机唯一标识
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/login")
    @ResponseBody
    public Map<String, Object> login(String phone, String password, String version, String phoneType, String phoneCode) {
        Map<String, Object> map = new HashMap<>();
        if (StringUtils.isEmpty(phone) || StringUtils.isEmpty(password)) {
            map.put("code", 401);
            map.put("message", "error"); // 兼容旧版本APP
            map.put("msg", "手机号码或者密码为空");
            return map;
        }

        // 登陆查询内部人员
        UserCenterEmployee employee = new UserCenterEmployee();
        employee.setEm_phone(phone);
        employee.setEm_password(MD5Util.GetMD5Code(password));
        employee = employeeService.selectUserCenterEmployeeByName(employee);
        if (employee != null) {
            map.put("code", 200);
            map.put("message", "success"); // 兼容旧版本APP
            employee.setEm_password("");
            // 登陆对象
            UserCenterEmployee userCookie = new UserCenterEmployee();
            userCookie.setEm_id(employee.getEm_id());
            userCookie.setEm_account(employee.getEm_account());
            userCookie.setEm_name(employee.getEm_name());
            userCookie.setEm_phone(employee.getEm_phone());

            // 查询员工职务部门
            Position position1 = new Position();
            position1.setEm_id(employee.getEm_id());
            List<Position> position = authorizationService.selectPositionById(position1);
            userCookie.setUcc_name(position.get(0).getUcp_name());
            Company company1 = new Company();
            company1.setUcc_id(position.get(0).getUcc_id());
            Company company = authorizationService.selectCompanyInfo(company1);
            userCookie.setUcc_id(company.getUcc_id());
            userCookie.setUcc_short(company.getUcc_short());
//            userCookie.setEm_image(employee.getEm_image());
            userCookie.setEm_image(OSSparameter.imagePath(employee.getEm_image()));
            map.put("userCookie", userCookie);
            map.put("data", userCookie);

            // 插入登陆记录
            String ipAddr = AppUtil.getIP();
            EmployeeOneLogin employeeOneLogin = new EmployeeOneLogin();
            if (phoneType.equals("pc")) {
                employeeOneLogin.setEml_pcIp(ipAddr);
                employeeOneLogin.setEml_pcDate(new Date());
                employeeOneLogin.setEml_pcBool(1);
                employeeOneLogin.setEm_id(employee.getEm_id());
            } else {
                employeeOneLogin.setEml_phoneType(phoneType);
                employeeOneLogin.setEml_phoneDate(new Date());
                employeeOneLogin.setEml_phoneCode(phoneCode);
                employeeOneLogin.setEml_phoneBool(1);
                employeeOneLogin.setEm_id(employee.getEm_id());
            }
            EmployeeOneLogin employeeOneLogin1 = new EmployeeOneLogin();
            employeeOneLogin1.setEm_id(employee.getEm_id());
            EmployeeOneLogin employeeOneLogin2 = employeeService.queryEmployeeOneLogin(employeeOneLogin1);
            if (employeeOneLogin2 == null) {
                employeeService.InsertOneLogin(employeeOneLogin);
            } else {
                employeeService.updateEmployeeOneLogin(employeeOneLogin);
            }

        } else {
            map.put("code", 401);
            map.put("message", "error"); // 兼容旧版本APP
            map.put("msg", "手机号码或者密码错误，请重新输入");
        }
        return map;
    }

    /**
     * 判断账号知否在职
     *
     * @param em_id
     * @return
     * @author 陈智颖
     * @date Apr 8, 2017 1:35:39 PM
     */
    @RequestMapping("/loginState")
    @ResponseBody
    public Map<String, Object> loginState(Integer em_id, String version, String phoneType, String phoneCode) {
        Map<String, Object> map = new HashMap<>();
        if (StringUtils.isEmpty(em_id)) {
            map.put("code", 401);
            return map;
        }
        // 是否有人在另外电脑登录
        Boolean bools = true;
        UserCenterEmployee employee = new UserCenterEmployee();
        employee.setEm_id(em_id);
        employee = employeeService.queryEmployeeInfo(employee);
        String ipAddr = AppUtil.getIP();
        EmployeeOneLogin employeeOneLogin = new EmployeeOneLogin();
        employeeOneLogin.setEm_id(em_id);
        EmployeeOneLogin employeeOneLogin1 = employeeService.queryEmployeeOneLogin(employeeOneLogin);
        if (phoneType != null && phoneType.equals("pc")) {
            employeeOneLogin.setEml_pcIp(ipAddr);
        } else {
            employeeOneLogin.setEml_phoneCode(phoneCode);
        }
        if (employeeOneLogin1 != null) {
            EmployeeOneLogin employeeOneLogin2 = employeeService.queryEmployeeOneLogin(employeeOneLogin);
            if (employeeOneLogin2 == null) {
                bools = false;
            }
        }
        if (bools && employee != null && employee.getEm_state() == 1) {
            map.put("code", 200);
        } else {
            if (employee.getEm_state() != 1) {
                map.put("code", 401);
            } else {
                map.put("code", 201);
                employeeOneLogin1.setPhoneType(employeeOneLogin1.getEml_phoneType());
                employeeOneLogin1.setPhoneCode(employeeOneLogin1.getEml_phoneCode());
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                if (phoneType.equals("pc")) {
                    employeeOneLogin1.setDateStr(sdf.format(employeeOneLogin1.getEml_pcDate()));
                } else {
                    employeeOneLogin1.setDateStr(sdf.format(employeeOneLogin1.getEml_phoneDate()));
                }
                map.put("data", employeeOneLogin1);
            }
        }
        return map;
    }

    /**
     * 上传头像
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     * @author 陈智颖
     */
    @RequestMapping("/fileUpload")
    @ResponseBody
    public Map<String, Object> fileUpload(MultipartHttpServletRequest request, ServletResponse response, Integer em_id) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        String path = request.getSession().getServletContext().getRealPath("/");
        String realPath = path + "/resources/potoImage";
        Map<String, MultipartFile> fileMap = request.getFileMap();
        List<String> list = new ArrayList<String>();
        int count = 0;
        int bools = 0;
        for (Map.Entry<String, MultipartFile> entity : fileMap.entrySet()) {
            if (count > 5) {
                break;
            }
            MultipartFile file = entity.getValue();
            if (!file.isEmpty()) {
                if (file.getSize() > 1000 * 1024 * 4) {
                    // 图片大小不得超过4M
                    map.put("message", 110);
                    return map;
                }
                try {
                    File upFile = new File(realPath);
                    /* 根据真实路径创建目录 **/
                    if (!upFile.exists()) {
                        upFile.mkdirs();
                    }
                    String filename = file.getOriginalFilename();
                    filename = filename.substring(filename.lastIndexOf("."));
                    // 拼接图片链接
                    StringBuilder sb = new StringBuilder();
                    sb.append("/POTO_OK_");
                    sb.append(new Date().getTime());
                    sb.append(filename);
                    String fileName = sb.toString();
                    File file2 = new File(realPath + sb.toString());
                    file.transferTo(file2);

                    UserCenterEmployee userCenterEmployee = employeeService.selectEmployeeById(em_id);
                    if (userCenterEmployee.getEm_image() != null) {
                        try {
                            OSSparameter.removeFile(userCenterEmployee.getEm_image());
                        } catch (Exception e) {
                            System.out.println("oss删除图片失败");
                        }
                    }

                    OSSparameter.uploadFile(file2, "potoImage");
                    file2.delete();

                    String imgUrl = ("potoImage/" + file2.getName());
                    UserCenterEmployee userCenterEmployee1 = new UserCenterEmployee();
                    userCenterEmployee1.setEm_id(em_id);
                    userCenterEmployee1.setEm_image(imgUrl);
                    bools = employeeService.updateImage(userCenterEmployee1);
                    list.add(OSSparameter.imagePath(imgUrl, 240, 240));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else {
                // 参数为空
                map.put("code", 111);
                return map;
            }
            count += 1;
        }
        if (bools > 0) {
            map.put("path", list.get(0));
            map.put("code", 200);
        } else {
            map.put("code", 401);
        }
        return map;
    }
}
