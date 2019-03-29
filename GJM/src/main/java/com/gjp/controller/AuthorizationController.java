package com.gjp.controller;

import com.gjp.model.*;
import com.gjp.service.*;
import com.gjp.util.AppUtil;
import com.gjp.util.ImageUtil;
import com.gjp.util.MD5Util;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 组织权限
 *
 * @author zoe
 */
@RequestMapping("/company")
@Controller
public class AuthorizationController {

    // 组织权限
    @Resource
    private AuthorizationService authorizationService;

    // 权限配置
    @Resource
    private PowersService powersService;

    // 角色管理
    @Resource
    private RoleService roleService;

    // 用户管理
    @Resource
    private UserCenterEmployeeService userCenterEmployeeService;


    @Resource
    private ServiceService serviceService;

    /**
     * 部门设置界面
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/departmentSetting")
    public String deartmentSetting() {
        return "/authorization/departmentSetting";
    }

    /**
     * 跳转组织架构界面
     *
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/organizationalStructure")
    public String organizationalStructure() {
        return "/authorization/authorization";
    }

    /**
     * 查询第一级组织
     *
     * @return
     */
    @RequestMapping("/selectOrganization")
    @ResponseBody
    public Map<String, Object> selectOrganization() {
        // 根据条件查询公司
        Company company = new Company();
        List<Company> companyList = authorizationService.selectOrganization(company);
        Map<String, Object> map = new HashMap<>();
        map.put("companyList", companyList);
        map.put("size", companyList.size());
        return map;
    }


    @RequestMapping("selectOrganizationTree")
    @ResponseBody
    public Map<String, Object> selectOrganizationTree() {
        Map<String, Object> map = new HashMap<>();
        List<Company> companyList = new ArrayList<>();
        Company company = new Company();
        company.setUcc_id(1);
        //所有数据
        List<Company> Companys1 = authorizationService.selectOrganizationTree(company);
        for (Company Company4: Companys1) {
            boolean mark = false;
            if (Company4.getChildren() == null) {
                Company4.setChildren(new ArrayList<Company>());
            }
            for (Company Company5: Companys1) {
                if (Company4.getUcc_pid().equals(Company5.getUcc_id())) {
                    mark = true;
                    if (Company5.getChildren() == null) {
                        Company5.setChildren(new ArrayList<Company>());
                    }
                    Company5.getChildren().add(Company4);
                }
            }
            if (!mark) {
                companyList.add(Company4);
            }
        }
        map.put("company", companyList);
        return map;
    }

    /**
     * 根据部门编码查询部门人员
     *
     * @param ucc_id 部门编码
     * @param pageNo 开始页码（必须）
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/selectDepartmentUser")
    @ResponseBody
    public Map<String, Object> selectDepartmentUser(Integer ucc_id, Integer pageNo) {

        // 装载数据类
        DataList<UserCenterEmployee> datalist = new DataList<>();
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        // 自定义传值
        userCenterEmployee.setUcc_id(ucc_id);
        // 获取cookie里面的结束页码
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        // datalist.pageNo(pageNo, pageSize)方法获取开始查询条数
        userCenterEmployee.setStart(datalist.pageNo(pageNo, pageSize));
        userCenterEmployee.setEnd(pageSize);
        // 获取数据
        List<UserCenterEmployee> departmentUsers = new ArrayList<>();
        List<UserCenterEmployee> departmentUserst = authorizationService.selectDepartmentUser(userCenterEmployee);
        for (UserCenterEmployee userCenterEmployee2: departmentUserst) {
            UserCenterEmployee userCenterEmployee3 = new UserCenterEmployee();
            userCenterEmployee3.setEm_id(userCenterEmployee2.getEm_id());
            userCenterEmployee3.setUcc_id(ucc_id);
            List<UserCenterEmployee> selectDepartmentWhere = authorizationService.selectDepartmentWhere(userCenterEmployee3);
            if (!selectDepartmentWhere.isEmpty()) {
                StringBuilder ucp_name = new StringBuilder();
                for (UserCenterEmployee userCenterEmployee4: selectDepartmentWhere) {
                    ucp_name.append(userCenterEmployee4.getUcp_name()).append("，");
                }
                ucp_name = new StringBuilder(ucp_name.substring(0, ucp_name.length() - 1));
                userCenterEmployee2.setUcp_name(ucp_name.toString());
            }
            departmentUsers.add(userCenterEmployee2);
        }
        // 获取数据条数，用departmentUserCount.getSize()取出
        UserCenterEmployee departmentUserCount = authorizationService.selectDepartmentUserCount(userCenterEmployee);
        // 装载数据
        return datalist.dataList(departmentUsers, pageNo, pageSize, departmentUserCount.getSize(), null);
    }

    /**
     * 根据ID查询部门信息
     *
     * @param id      部门编码
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/departmentData")
    @ResponseBody
    public Map<String, Object> departmentData(Integer id) {
        Map<String, Object> map = new HashMap<>();

        Company company = new Company();
        company.setUcc_id(id);
        Company companys = authorizationService.selectOrganization(company).get(0);

        if (companys.getUcc_pid() == 0) {
            companys.setPi_name("最高级");
        } else {
            Company company1 = new Company();
            company1.setUcc_id(companys.getUcc_pid());
            Company organization = authorizationService.selectOrganization(company1).get(0);
            companys.setPi_name(organization.getUcc_short());
        }

        // 下级组织
        List<Company> bottomCompany = new ArrayList<Company>();
        Company company2 = new Company();
        List<Company> companyList = authorizationService.selectOrganization(company2);
        for (Company company3: companyList) {
            if (company3.getUcc_pid() == companys.getUcc_id()) {
                company3.setId(company3.getUcc_id());
                company3.setPid(company3.getUcc_pid());
                company3.setName(company3.getUcc_name());
                company3.setState(company3.getUcc_state());
                bottomCompany.add(company3);
            }
        }
        int len = bottomCompany.size();
        for (int i = 0; i < len; i++) {
            for (Company company4: companyList) {
                if (bottomCompany.get(i).getUcc_id() == company4.getUcc_pid()) {
                    company4.setId(company4.getUcc_id());
                    company4.setPid(company4.getUcc_pid());
                    company4.setName(company4.getUcc_name());
                    company4.setState(company4.getUcc_state());
                    bottomCompany.add(company4);
                    len = bottomCompany.size();
                }
            }
        }

        map.put("bottomCompany", bottomCompany);
        map.put("company", companys);
        return map;
    }

    /**
     * 根据ID查询职位信息
     *
     * @param id 部门编码
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/positionData")
    @ResponseBody
    public Map<String, Object> positionData(Integer id) {
        Map<String, Object> map = new HashMap<>();

        List<Position> bottomPosition = new ArrayList<>();
        Position position = new Position();
        position.setUcc_id(id);
        List<Position> positions = authorizationService.selectPositionID(position);
        for (Position position2: positions) {
            position2.setId(position2.getUcp_id());
            position2.setName(position2.getUcp_name());
            position2.setPid(position2.getUcp_pid());
            bottomPosition.add(position2);
        }

        map.put("bottomPosition", positions);
        return map;
    }

    /**
     * 查询部门信息
     *
     * @param id
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/departmentDataOne")
    @ResponseBody
    public Map<String, Object> departmentDataOne(Integer id) {
        Map<String, Object> map = new HashMap<>();

        Company company = new Company();
        company.setUcc_id(id);
        Company companys = authorizationService.selectOrganization(company).get(0);

        if (companys.getUcc_pid() == 0) {
            companys.setPi_name("最高级");
        } else {
            Company company1 = new Company();
            company1.setUcc_id(companys.getUcc_pid());
            Company organization = authorizationService.selectOrganization(company1).get(0);
            companys.setPi_name(organization.getUcc_name());
        }

        map.put("company", companys);
        return map;
    }

    /**
     * 根据职位编码查询职位
     *
     * @param id
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/selectPosition")
    @ResponseBody
    public Map<String, Object> selectPosition(Integer id) {

        Map<String, Object> map = new HashMap<>();

        Position position = new Position();
        position.setUcp_id(id);
        Position positions = authorizationService.selectPositionID(position).get(0);

        Position position1 = new Position();
        position1.setUcp_id(positions.getUcp_pid());
        if (authorizationService.selectPositionID(position1).isEmpty()) {
            positions.setPname("");
        } else {
            positions.setPname(authorizationService.selectPositionID(position1).get(0).getUcp_name());
        }

        map.put("positions", positions);

        return map;
    }

    /**
     * 修改部门信息
     *
     * @param id                部门编码
     * @param fullName          部门全称
     * @param abbreviation      部门简称
     * @param topOrganizationID 上级组织编码
     * @param organizationName  组织负责人
     * @param organizationPhone 负责人电话
     * @param dateTime          成立时间
     * @param remarks           备注
     * @param em_id             负责人编码
     * @return
     * @throws ParseException
     * @author 陈智颖
     */
    @RequestMapping("/departmentEdit")
    @ResponseBody
    public Map<String, Object> departmentEdit(Integer id, String fullName, String abbreviation, Integer topOrganizationID, String organizationName, String organizationPhone, String dateTime, String remarks, Integer em_id) throws ParseException {
        Map<String, Object> map = new HashMap<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Company company = new Company();
        company.setUcc_id(id);
        company.setUcc_name(fullName);
        company.setUcc_short(abbreviation);
        company.setUcc_pid(topOrganizationID);
        company.setUcc_person(organizationName);
        company.setUcc_phone(organizationPhone);
        company.setUcc_time(sdf.parse(dateTime));
        company.setUcc_remarks(remarks);
        company.setEm_id(em_id);
        int bool = authorizationService.updateOrganizationInfo(company);

        if (bool > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 添加职位
     *
     * @param positionNameEdit    职位名称
     * @param positionRemarksEdit 备注
     * @param ucp_pidEdit         上级组织
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/addPosition")
    @ResponseBody
    public Map<String, Object> addPosition(String positionNameEdit, String positionRemarksEdit, Integer ucp_pidEdit, Integer ucc_id) {
        Map<String, Object> map = new HashMap<>();

        Position position = new Position();
        position.setUcp_name(positionNameEdit);
        position.setUcp_remarks(positionRemarksEdit);
        position.setUcp_pid(ucp_pidEdit);
        position.setUcc_id(ucc_id);
        int bool = authorizationService.addStation(position);
        if (bool > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 修改职位
     *
     * @param ucp_idEdit          职位编码
     * @param positionNameEdit    职位名称
     * @param positionRemarksEdit 备注
     * @param ucp_pidEdit         上级组织
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/updatePosition")
    @ResponseBody
    public Map<String, Object> updatePosition(String positionNameEdit, String positionRemarksEdit, Integer ucp_idEdit, Integer ucp_pidEdit, Integer ucc_id) {
        Map<String, Object> map = new HashMap<>();

        Position position = new Position();
        position.setUcp_id(ucp_idEdit);
        position.setUcp_name(positionNameEdit);
        position.setUcp_remarks(positionRemarksEdit);
        position.setUcp_pid(ucp_pidEdit);
        position.setUcc_id(ucc_id);
        int bool = authorizationService.updatePosition(position);
        if (bool > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 增加下级部门
     *
     * @param fullName          部门全称
     * @param abbreviation      部门简称
     * @param topOrganizationID 上级组织编码
     * @param organizationName  组织负责人
     * @param organizationPhone 负责人电话
     * @param dateTime          成立时间
     * @param remarks           备注
     * @param em_id             负责人编码
     * @return
     * @throws ParseException
     * @author 陈智颖
     */
    @RequestMapping("/addDepartment")
    @ResponseBody
    public Map<String, Object> addDepartment(String fullName, String abbreviation, Integer topOrganizationID, String organizationName, String organizationPhone, String dateTime, String remarks, Integer em_id) throws ParseException {
        Map<String, Object> map = new HashMap<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Company company = new Company();
        company.setUcc_name(fullName);
        company.setUcc_short(abbreviation);
        company.setUcc_pid(topOrganizationID);
        company.setUcc_person(organizationName);
        company.setUcc_phone(organizationPhone);
        company.setUcc_time(sdf.parse(dateTime));
        company.setUcc_remarks(remarks);
        company.setEm_id(em_id);
        company.setUcc_state(1);
        int bool = authorizationService.addOrganization(company);

        if (bool > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 查询未分配人员
     *
     * @param personSearch
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/insidePerson")
    @ResponseBody
    public Map<String, Object> insidePerson(String personSearch) {
        Map<String, Object> map = new HashMap<>();

        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        if (personSearch != null && !personSearch.equals("")) {
            userCenterEmployee.setWhereList(personSearch);
        } else {
            userCenterEmployee.setStart(0);
            userCenterEmployee.setEnd(13);
        }
        List<UserCenterEmployee> employeeNullPosition = authorizationService.selectEmployeeNullPosition(userCenterEmployee);
        map.put("employeeNullPosition", employeeNullPosition);

        return map;
    }

    /**
     * 根据职位编码查询分配的人员
     *
     * @param ucp_id
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/positionPerson")
    @ResponseBody
    public Map<String, Object> positionPerson(Integer ucp_id) {
        Map<String, Object> map = new HashMap<>();

        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setUcp_id(ucp_id);
        List<UserCenterEmployee> employeePosition = authorizationService.selectEmployeePosition(userCenterEmployee);

        map.put("employeePosition", employeePosition);

        return map;
    }

    /**
     * 根据职位编码关联用户
     *
     * @param ucp_id 职位编码
     * @param em_id  内部人员编码
     * @param ucc_id 组织架构编码
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/personTOposition")
    @ResponseBody
    public Map<String, Object> personTOposition(Integer ucp_id, Integer em_id, Integer ucc_id) {
        Map<String, Object> map = new HashMap<>();

        PersonPosition personPosition = new PersonPosition();
        personPosition.setEm_id(em_id);
        personPosition.setUcp_id(ucp_id);
        int bool = authorizationService.addPersonPosition(personPosition);

        CompanyPserson companyPserson = new CompanyPserson();
        companyPserson.setUcc_id(ucc_id);
        companyPserson.setEm_id(em_id);
        if (authorizationService.selectCompanyPserson(companyPserson).isEmpty()) {
            authorizationService.addCompanyPserson(companyPserson);
        }

        if (bool > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 删除职位人员表
     *
     * @param ucp_id 职位编码
     * @param em_id  内部人员编码
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/removePersonTOposition")
    @ResponseBody
    public Map<String, Object> removePersonTOposition(Integer ucp_id, Integer em_id) {
        Map<String, Object> map = new HashMap<>();

        PersonPosition personPosition = new PersonPosition();
        personPosition.setEm_id(em_id);
        personPosition.setUcp_id(ucp_id);
        Position positionById = authorizationService.getPositionById(ucp_id);
        int bool = authorizationService.deletePersonPosition(personPosition);

        CompanyPserson companyPserson = new CompanyPserson();
        companyPserson.setUcc_id(positionById.getUcc_id());
        companyPserson.setEm_id(em_id);
        bool = authorizationService.deleteCompanyPserson(companyPserson);

        if (bool > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 修改或者添加部门用户
     *
     * @param account   账号
     * @param userName  用户名
     * @param userPhone 用户电话
     * @param IDCard    用户身份证
     * @param sex       角色
     * @param data      图片
     * @param ucc_id    部门编码
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/addDepartmentUser")
    @ResponseBody
    public Map<String, Object> addDepartmentUser(HttpServletRequest request, Integer em_id, String account, String userName, String userPhone, String IDCard, String userAddress, String sex, String data, Integer ucc_id) {
        Map<String, Object> map = new HashMap<>();

        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        if (em_id != null) {
            userCenterEmployee.setEm_id(em_id);
        } else {
            userCenterEmployee.setEm_password(MD5Util.GetMD5Code(IDCard.substring(IDCard.length() - 6, IDCard.length())));
            userCenterEmployee.setEm_state(1);
        }
        userCenterEmployee.setEm_account(account);
        userCenterEmployee.setEm_name(userName);
        userCenterEmployee.setEm_phone(userPhone);
        userCenterEmployee.setEm_documentID(IDCard);
        userCenterEmployee.setEm_address(userAddress);

        if (em_id == null) {
            List<UserCenterEmployee> selectAccount = userCenterEmployeeService.selectAccount(userCenterEmployee);
            if (!selectAccount.isEmpty()) {
                map.put("message", "account");
                return map;
            }
        }

        userCenterEmployee.setEm_sex(sex);

        if (!data.equals("") && data.split(",").length > 1) {
            String realPath = request.getSession().getServletContext().getRealPath("/resources/userImage/");
            // 创建文件夹
            File upFile = new File(realPath);
            if (!upFile.exists()) {
                upFile.mkdirs();
            }
            data = data.split(",")[1];
            // 文件名称
            String imageName = AppUtil.getImageName("") + ".png";
            // 本地缓存地址
            String imageUrl = realPath + "/" + imageName;
            // base64转图片
            boolean boo = ImageUtil.base64ToImageFile(data, imageUrl);
            if (!boo) {
                map.put("message", "error");
                return map;
            }
            // 图片压缩
            File file = new File(imageUrl);
            try {
                ImageUtil.saveMinPhoto(file.toString(), file.toString(), 936, 0.9d);
            } catch (Exception e) {
                System.out.print("图片压缩失败");
            }
            // 远程上传
            String image = AppUtil.uploadUserImage(getClass(), file);
            userCenterEmployee.setEm_cardImage("/resources/userImage" + image);
        }

        Integer bools = 0;
        if (em_id != null && !em_id.equals("")) {
            bools = userCenterEmployeeService.updatetUserCenterEmployee(userCenterEmployee);
        } else {
            bools = userCenterEmployeeService.insertUserCenterEmployee(userCenterEmployee);
        }

        if (bools > 0) {
            if ((em_id == null || em_id.equals("")) && ucc_id != null) {
                CompanyPserson companyPserson = new CompanyPserson();
                companyPserson.setEm_id(userCenterEmployee.getEm_id());
                companyPserson.setUcc_id(ucc_id);
                authorizationService.addCompanyPserson(companyPserson);
            }
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 查询人员基本信息进行修改
     *
     * @param em_id  用户编码
     * @param ucc_id 部门编码
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/setuserMessage")
    @ResponseBody
    public Map<String, Object> setuserMessage(Integer em_id, Integer ucc_id) {
        Map<String, Object> map = new HashMap<>();

        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_id(em_id);
        userCenterEmployee.setUcc_id(ucc_id);

        UserCenterEmployee departmentUser = authorizationService.selectDepartmentUser(userCenterEmployee).get(0);

        map.put("departmentUser", departmentUser);

        return map;
    }

    /**
     * 人员离职/在职
     *
     * @param em_id
     * @param state
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/updateUserState")
    @ResponseBody
    public Map<String, Object> updateUserState(Integer em_id, Integer state) {
        Map<String, Object> map = new HashMap<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();//获取用户信息COOKIE
        if (employee == null) {
            map.put("code", 401);
            map.put("message", "请重新登录");
            return map;
        }

        try {
            Map<String, Object> stringObjectMap = userCenterEmployeeService.updataUserState(em_id, state, employee);
            return stringObjectMap;
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code", 401);
            map.put("message", "系统异常,请联系管理员");
            return map;
        }

        /*if (state == 0) {
            //查询职工表
            UserCenterEmployee userCenterEmployee1 = serviceService.queryEmployeeById(em_id);
            if (userCenterEmployee1.getEm_state() != 3) {//部门主管同意通过才能离职
                map.put("code", 401);
                map.put("message", "先让人员申请离职,主管通过后才能离职");
                return map;
            }

            userCenterEmployeeService.updateUserQuit(employee, em_id);

            UserContract userContract = new UserContract();
            userContract.setEm_id(em_id);
            //刪除臨時人員關系
            userCenterEmployeeService.deleteUserContract(userContract);
        }
        if (state == 1) {
            UserContract userContract = new UserContract();
            userContract.setEm_id(em_id);
            List<UserContract> selectUserContract = userCenterEmployeeService.selectUserContract(userContract);
            if (selectUserContract.size() > 0) {
                map.put("code", 401);
                map.put("message", "该管家还有合同正在分配中,请到工作分配栏操作取消离职");
                return map;
            }
        }
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setEm_id(em_id);
        userCenterEmployee.setEm_state(state);
        int bool = userCenterEmployeeService.updateState(userCenterEmployee);//更改在职离职状态
        if (bool > 0) {
            map.put("code", 200);
            map.put("message", "操作成功");
        } else {
            map.put("code", 401);
            map.put("message", "状态修改有误,请重试");
        }*/
       // return map;
    }

    /**
     * 部门停用或者启用
     *
     * @param ucc_id 部门编码
     * @param state  部门状态
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/updateDeparmentState")
    @ResponseBody
    public Map<String, Object> updateDeparmentState(Integer ucc_id, Integer state) {
        Map<String, Object> map = new HashMap<>();

        int bool = 0;

        if (state == 0) {
            Company company = new Company();
            company.setUcc_id(ucc_id);
            Company companyInfo = authorizationService.selectCompanyInfo(company);
            companyInfo.setUcc_state(state);

            bool = authorizationService.updateDeparmentState(companyInfo);

            Company company1 = new Company();
            company1.setUcc_pid(companyInfo.getUcc_id());
            List<Company> selectOrganization = authorizationService.selectOrganization(company1);
            if (!selectOrganization.isEmpty()) {
                for (Company company2: selectOrganization) {
                    company2.setUcc_state(state);
                    bool = authorizationService.updateDeparmentState(company2);
                }
            }
        } else {
            Company company = new Company();
            company.setUcc_id(ucc_id);
            Company companyInfo = authorizationService.selectCompanyInfo(company);
            companyInfo.setUcc_state(state);

            Company company1 = new Company();
            company1.setUcc_id(companyInfo.getUcc_pid());
            Company companyInfo1 = authorizationService.selectCompanyInfo(company1);
            companyInfo1.setUcc_state(state);

            bool = authorizationService.updateDeparmentState(companyInfo);

            bool = authorizationService.updateDeparmentState(companyInfo1);

            Company company2 = new Company();
            company2.setUcc_pid(companyInfo.getUcc_id());
            List<Company> selectOrganization = authorizationService.selectOrganization(company2);
            if (!selectOrganization.isEmpty()) {
                for (Company company3: selectOrganization) {
                    company3.setUcc_state(state);
                    bool = authorizationService.updateDeparmentState(company3);
                }
            }
        }

        if (bool > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 跳转权限配置界面
     *
     * @return
     * @author 王孝元
     */
    @RequestMapping("/jumpPowersOperate")
    public String jumpPowersOperate() {
        return "/authorization/powersOperate";
    }

    /**
     * 查询权限列表
     *
     * @return
     * @author 王孝元
     */
    @RequestMapping("/getPowersList")
    @ResponseBody
    public Map<String, Object> getPowersList() {
        Map<String, Object> map = new HashMap<>();
        List<Powers> pwList = powersService.getPowersTree(0);
        map.put("pwList", pwList);
        return map;
    }

    /**
     * 保存权限
     *
     * @return
     * @author 王孝元
     */
    @RequestMapping("/savePowers")
    @ResponseBody
    public Map<String, Object> savePowers(Powers p) {
        Map<String, Object> map = new HashMap<>();
        if (p.getUcps_id() == null) {
            // 新增
            powersService.savePowers(p);
        } else {
            // 修改
            powersService.updatePowers(p);
        }
        map.put("msg", "success");
        return map;
    }

    /**
     * 编辑权限
     *
     * @return
     * @author 王孝元
     */
    @RequestMapping("/editPowers")
    @ResponseBody
    public Map<String, Object> editPowers(Integer ucps_id) {
        Map<String, Object> map = new HashMap<>();
        Powers p = powersService.getPowersById(ucps_id);
        if (p != null) {
            map.put("msg", "success");
            map.put("powers", p);
        } else {
            map.put("msg", "权限不存在!");
        }
        return map;
    }

    /**
     * 删除权限
     *
     * @return
     * @author 王孝元
     */
    @RequestMapping("/delPowers")
    @ResponseBody
    public Map<String, Object> delPowers(Integer ucps_id) {
        Map<String, Object> map = new HashMap<>();
        powersService.deletePowers(ucps_id);
        map.put("msg", "success");
        return map;
    }

    /**
     * 启用/禁用
     *
     * @return
     * @author 王孝元
     */
    @RequestMapping("/disablePowers")
    @ResponseBody
    public Map<String, Object> disablePowers(Integer ucps_id, Integer type) {
        Map<String, Object> map = new HashMap<>();
        if (type == 0) {
            // 禁用权限
            powersService.closePowers(ucps_id);
            map.put("msg", "success");
        }
        if (type == 1) {
            // 查询权限
            Powers p = powersService.getPowersById(ucps_id);
            // 查询父权限状态
            Powers parent = powersService.getPowersById(p.getUcps_pid());
            if (parent != null && parent.getUcps_state() == 0) {
                map.put("msg", "请开启父权限！");
            } else {
                // 启用权限
                powersService.openPowers(ucps_id);
                map.put("msg", "success");
            }
        }
        return map;
    }

    /**
     * 角色管理跳转
     *
     * @return
     * @author 王孝元
     */
    @RequestMapping("/jumpRole")
    public String jumpRole() {
        return "/authorization/roleManage";
    }

    /**
     * 查询角色列表
     *
     * @return
     * @author 王孝元
     */
    @RequestMapping("/getRoleList")
    @ResponseBody
    public Map<String, Object> getRoleList(String searchStr, Integer pageNo) {
        // 装载数据类
        DataList<Role> datalist = new DataList<>();

        Role role = new Role();
        // 获取cookie里面的结束页码
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        role.setWhereList(searchStr);
        role.setStart(datalist.pageNo(pageNo, pageSize));
        role.setEnd(pageSize);
        // 获取数据
        List<Role> roles = roleService.getRoleList(role);
        int totalSize = roleService.getRoleListCount(role);
        // 装载数据
        return datalist.dataList(roles, pageNo, pageSize, totalSize, null);
    }

    /**
     * 角色保存
     *
     * @return
     * @author 王孝元
     */
    @RequestMapping("/saveRole")
    @ResponseBody
    public Map<String, Object> saveRole(Integer ucr_id, String ucr_name, String ucr_remarks) {
        Map<String, Object> map = new HashMap<>();
        if (!AppUtil.isNotNull(ucr_id)) {
            // 新增
            Role r = new Role();
            r.setUcr_name(ucr_name);
            r.setUcr_remarks(ucr_remarks);
            r.setUcr_type(1);
            r.setUcr_date(new Date());
            roleService.saveRole(r);
        } else {
            // 修改
            Role r = roleService.getRoleById(ucr_id);
            r.setUcr_name(ucr_name);
            r.setUcr_remarks(ucr_remarks);
            r.setUcr_date(new Date());
            roleService.updateRole(r);
        }
        map.put("msg", "success");
        return map;
    }

    /**
     * 角色编辑
     *
     * @return
     * @author 王孝元
     */
    @RequestMapping("/editRole")
    @ResponseBody
    public Map<String, Object> editRole(Integer ucr_id) {
        Map<String, Object> map = new HashMap<>();
        Role r = roleService.getRoleById(ucr_id);
        if (r != null) {
            map.put("msg", "success");
            map.put("role", r);
        } else {
            map.put("msg", "角色不存在！");
        }
        return map;
    }

    /**
     * 角色删除
     *
     * @return
     * @author 王孝元
     */
    @RequestMapping("/delRole")
    @ResponseBody
    public Map<String, Object> delRole(Integer ucr_id) {
        Map<String, Object> map = new HashMap<>();
        roleService.deleteRole(ucr_id);
        map.put("msg", "success");
        return map;
    }

    /**
     * 设置权限跳转
     *
     * @return
     * @author 王孝元
     */
    @RequestMapping("/settingPowers")
    public String settingPowers() {
        return "/authorization/settingPowers";
    }

    /**
     * 设置权限数据加载
     *
     * @return
     * @author 王孝元
     */
    @RequestMapping("/settingPowersAjax")
    @ResponseBody
    public Map<String, Object> settingPowersAjax(String type, Integer typeId) {
        Map<String, Object> map = new HashMap<>();
        // 查询权限列表
        List<Powers> pwList = powersService.getSettingPowersTree(0);
        map.put("pwList", pwList);
        // 查询拥有的权限
        if ("company".equals(type)) {
            List<Powers> powers = authorizationService.selectPowersByCompanyId(typeId);
            map.put("powers", powers);
        }
        if ("position".equals(type)) {
            // 1.查询该职位信息
            Position p = authorizationService.getPositionById(typeId);
            // 2.查询该职位所在部门的权限
            List<Powers> parentPowers = authorizationService.selectPowersByCompanyId(p.getUcc_id());
            // 3.查询该职位拥有的权限
            List<Powers> powers = authorizationService.selectPowersByPositionId(p.getUcp_id());
            map.put("parentPowers", parentPowers);
            map.put("powers", powers);
        }
        if ("role".equals(type)) {
            List<Powers> powers = roleService.selectPowersByRoleId(typeId);
            map.put("powers", powers);
        }
        if ("person".equals(type)) {
            List<Powers> parentPowers = new ArrayList<>();
            // 1.查询所在部门权限
            List<Company> companys = userCenterEmployeeService.selectCompanyByPersonId(typeId);
            for (Company c: AppUtil.removeNull(companys)) {
                List<Powers> pws_c = authorizationService.selectPowersByCompanyId(c.getUcc_id());
                parentPowers.addAll(pws_c);
            }
            // 2.查询所属职位权限
            List<Position> positions = userCenterEmployeeService.selectPositionByPersonId(typeId);
            for (Position p: AppUtil.removeNull(positions)) {
                List<Powers> pws_p = authorizationService.selectPowersByPositionId(p.getUcp_id());
                parentPowers.addAll(pws_p);
            }
            // 3.查询所属角色权限
            // 4.查询自身拥有权限
            List<Powers> powers = userCenterEmployeeService.selectPowersByPersonId(typeId);

            map.put("parentPowers", distincList(parentPowers));
            map.put("powers", powers);
        }
        map.put("type", type);
        map.put("typeId", typeId);
        map.put("msg", "success");
        return map;
    }

    private List<Powers> distincList(List<Powers> powersList) {
        List<Powers> tempList = new ArrayList<>();
        for (Powers power: powersList) {
            boolean bools = true;
            for (Powers power2: tempList) {
                if (power2.getUcps_id().equals(power.getUcps_id())) {
                    bools = false;
                    break;
                }
            }
            if (bools) {
                tempList.add(power);
            }
        }
        return tempList;
    }

    /**
     * 获取title
     *
     * @param type
     * @param typeId
     * @return
     * @author 王孝元
     */
    @RequestMapping("/getTitleInfo")
    @ResponseBody
    public Map<String, Object> getTitleInfo(String type, Integer typeId) {
        Map<String, Object> map = new HashMap<>();
        if ("company".equals(type)) {
            map.put("titleName", authorizationService.getCompanyById(typeId).getUcc_name());
        }
        if ("position".equals(type)) {
            map.put("titleName", authorizationService.getPositionById(typeId).getUcp_name());
        }
        if ("role".equals(type)) {
            map.put("titleName", roleService.getRoleById(typeId).getUcr_name());
        }
        if ("person".equals(type)) {
            map.put("titleName", userCenterEmployeeService.selectEmployeeById(typeId).getEm_name());
        }
        map.put("type", type);
        map.put("typeId", typeId);
        return map;
    }

    /**
     * 保存权限设置
     *
     * @param type
     * @param typeId
     * @param powerIds
     * @return
     * @author 王孝元
     */
    @RequestMapping("/saveSettings")
    @ResponseBody
    public Map<String, Object> saveSettings(String type, Integer typeId, String powerIds) {
        Map<String, Object> map = new HashMap<>();

        if ("company".equals(type)) {
            authorizationService.setPowersForCompany(AppUtil.strToIntegerArray(powerIds), typeId);
        }
        if ("position".equals(type)) {
            authorizationService.setPowersForPosition(AppUtil.strToIntegerArray(powerIds), typeId);
        }
        if ("role".equals(type)) {
            roleService.setPowersForRole(AppUtil.strToIntegerArray(powerIds), typeId);
        }
        if ("person".equals(type)) {
            userCenterEmployeeService.setPowersForPerson(AppUtil.strToIntegerArray(powerIds), typeId);
        }
        map.put("msg", "success");
        return map;
    }

    /**
     * 查询角色人员
     *
     * @param ucr_id
     * @return
     * @author 王孝元
     */
    @RequestMapping("/selectPersonFromRole")
    @ResponseBody
    public Map<String, Object> selectPersonFromRole(Integer ucr_id) {
        Map<String, Object> map = new HashMap<>();
        // 1.查询角色信息
        Role r = roleService.getRoleById(ucr_id);
        // 2.查询角色人员
        List<UserCenterEmployee> employees = roleService.selectPersonsByRole(r.getUcr_id());
        map.put("role", r);
        map.put("personList", employees);
        return map;
    }

    /**
     * 添加人员
     *
     * @param personId
     * @param ucr_id
     * @return
     * @author 王孝元
     */
    @RequestMapping("/addPersonToRole")
    @ResponseBody
    public Map<String, Object> addPersonToRole(Integer personId, Integer ucr_id) {
        Map<String, Object> map = new HashMap<>();
        roleService.savePersonToRole(ucr_id, personId);
        UserCenterEmployee employee = userCenterEmployeeService.selectUserCenterEmployeeById(personId);
        map.put("msg", "success");
        map.put("person", employee);
        return map;
    }

    /**
     * 删除人员
     *
     * @param personId
     * @return
     * @author 王孝元
     */
    @RequestMapping("/delPersonFromRole")
    @ResponseBody
    public Map<String, Object> delPersonFromRole(Integer personId) {
        Map<String, Object> map = new HashMap<>();
        roleService.deletePersonFromRole(personId);
        map.put("msg", "success");
        return map;
    }

    /**
     * 根据人员姓名和电话查询人员列表
     *
     * @param personSearch
     * @return
     * @author 王孝元
     */
    @RequestMapping("/getPersonsBySearch")
    @ResponseBody
    public Map<String, Object> getPersonsBySearch(String personSearch) {
        Map<String, Object> map = new HashMap<>();
        List<UserCenterEmployee> employees = userCenterEmployeeService.getPersonsByNameOrPhone(personSearch);
        map.put("personList", employees);
        return map;
    }

    /**
     * 移动权限
     *
     * @param power1 权限1
     * @param power2 权限2
     * @return
     * @author 王孝元
     */
    @RequestMapping("/movePowers")
    @ResponseBody
    public Map<String, Object> movePowers(Integer power1, Integer power2) {
        Map<String, Object> map = new HashMap<>();
        boolean result = powersService.exchangePosition(power1, power2);
        if (result) {
            map.put("msg", "success");
        }
        return map;
    }

    /**
     * 用户管理界面
     *
     * @return
     * @author 王孝元
     */
    @RequestMapping("/employeeManage")
    public String employeeManage() {
        return "/authorization/employeeManage";
    }

    /**
     * 查询用户
     *
     * @param pageNo 开始页码（必须）
     * @return
     * @author 王孝元
     */
    @RequestMapping("/selectEmployeeList")
    @ResponseBody
    public Map<String, Object> selectEmployeeList(String searchStr, Integer pageNo) {
        // 装载数据类
        DataList<UserCenterEmployee> datalist = new DataList<>();

        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setWhereList(searchStr);
        // 获取cookie里面的结束页码
        int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
        userCenterEmployee.setStart(datalist.pageNo(pageNo, pageSize));
        userCenterEmployee.setEnd(pageSize);
        // 获取数据
        List<UserCenterEmployee> employess = userCenterEmployeeService.selectEmployeeList(userCenterEmployee);
        int totalSize = userCenterEmployeeService.selectEmployeeListCount(userCenterEmployee);
        // 装载数据
        return datalist.dataList(employess, pageNo, pageSize, totalSize, null);
    }

    /**
     * 查询用户信息
     *
     * @param em_id 用户id
     * @return
     * @author 王孝元
     */
    @RequestMapping("/editEmployee")
    @ResponseBody
    public Map<String, Object> editEmployee(Integer em_id) {
        Map<String, Object> map = new HashMap<>();
        map.put("employee", userCenterEmployeeService.selectEmployeeById(em_id));
        return map;
    }

    /**
     * 保存用户信息
     *
     * @param account   账号
     * @param userName  用户名
     * @param userPhone 用户电话
     * @param IDCard    用户身份证
     * @param sex       角色
     * @param data      图片
     * @return
     * @author 王孝元
     */
    @RequestMapping("/saveEmployee")
    @ResponseBody
    public Map<String, Object> saveEmployee(HttpServletRequest request, Integer em_id, String account, String userName, String userPhone, String IDCard, String userAddress, String sex, String data) {
        Map<String, Object> map = new HashMap<>();

        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        if (em_id != null && !em_id.equals("")) {
            userCenterEmployee.setEm_id(em_id);
        } else {
            userCenterEmployee.setEm_password(MD5Util.GetMD5Code(IDCard.substring(IDCard.length() - 6, IDCard.length())));
        }
        userCenterEmployee.setEm_state(1);
        userCenterEmployee.setEm_account(account);
        userCenterEmployee.setEm_name(userName);
        userCenterEmployee.setEm_phone(userPhone);
        userCenterEmployee.setEm_documentID(IDCard);
        userCenterEmployee.setEm_address(userAddress);

        if (em_id == null || em_id.equals("")) {
            List<UserCenterEmployee> selectAccount = userCenterEmployeeService.selectAccount(userCenterEmployee);
            if (!selectAccount.isEmpty()) {
                map.put("message", "account");
                return map;
            }
        }

        userCenterEmployee.setEm_sex(sex);

        if (!data.equals("") && data.split(",").length > 1) {
            String realPath = request.getSession().getServletContext().getRealPath("/resources/userImage/");
            // 创建文件夹
            File upFile = new File(realPath);
            if (!upFile.exists()) {
                upFile.mkdirs();
            }
            data = data.split(",")[1];
            // 文件名称
            String imageName = AppUtil.getImageName("") + ".png";
            // 本地缓存地址
            String imageUrl = realPath + "/" + imageName;
            // base64转图片
            boolean boo = ImageUtil.base64ToImageFile(data, imageUrl);
            if (!boo) {
                map.put("message", "error");
                return map;
            }
            // 图片压缩
            File file = new File(imageUrl);
            try {
                ImageUtil.saveMinPhoto(file.toString(), file.toString(), 936, 0.9d);
            } catch (Exception e) {
                System.out.print("图片压缩失败");
            }
            // 远程上传
            String image = AppUtil.uploadUserImage(getClass(), file);
            userCenterEmployee.setEm_cardImage("/resources/userImage" + image);
        }

        Integer bools = 0;
        if (em_id != null && !em_id.equals("")) {
            bools = userCenterEmployeeService.updatetUserCenterEmployee(userCenterEmployee);
        } else {
            bools = userCenterEmployeeService.insertUserCenterEmployee(userCenterEmployee);
        }

        if (bools > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 重置密码
     *
     * @param em_id 用户id
     * @return
     * @author 王孝元
     */
    @RequestMapping("/resetPassword")
    @ResponseBody
    public Map<String, Object> resetPassword(Integer em_id) {
        Map<String, Object> map = new HashMap<>();
        UserCenterEmployee employee = userCenterEmployeeService.selectEmployeeById(em_id);
        if (employee != null) {
            String IDCard = employee.getEm_documentID();
            employee.setEm_password(MD5Util.GetMD5Code(IDCard.substring(IDCard.length() - 6, IDCard.length())));
            userCenterEmployeeService.updatePs(employee);
            map.put("msg", "success");
        }
        return map;
    }
}
