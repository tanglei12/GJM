package com.gjp.controller;

import com.alipay.api.AlipayApiException;
import com.gjp.csrf.VerifyCSRFToken;
import com.gjp.model.*;
import com.gjp.model.Company;
import com.gjp.service.*;
import com.gjp.util.*;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author 陈智颖
 * @version 创建时间：2016年4月12日 上午10:54:15
 */
@Controller
@RequestMapping("/propertyInfo")
public class PropertyInfoController {

    // 物业信息
    @Resource
    private PropertyInfoService propertyInfoService;

    // 物业水电气
    @Resource
    private PropertyLivingPaymentService propertyLivingPaymentService;

    // 物业父子级
    @Resource
    private PropertyInfoNameService propertyInfoNameService;

    // 内部人员
    @Resource
    private UserCenterEmployeeService userCenterEmployeeService;

    //城市
    @Resource
    private AreaCityService areaCityService;

    private String whereOne = "";

    @Resource
    private HouseInformationStateRelationService houseInformationStateRelationService;

    // == QUERY

    /**
     * 修改物业结构
     *
     * @return
     * @author 刘强
     */
    @RequestMapping("/updatepropertyInfojiegou")
    @ResponseBody
    public Map<String, Object> updatepropertyInfojiegou(Integer id, Integer Pid, String type, String name) {
        Map<String, Object> map = new HashMap<>();
        PropertyInfoName p2 = new PropertyInfoName();
        PropertyInfoName p1 = new PropertyInfoName();
        if (Pid != 0) {
            // 目标对象
            p2 = propertyInfoNameService.findPropertyInfoNameBySid(Pid);
        }
        // 当前对象
        p1 = propertyInfoNameService.findPropertyInfoNameBySid(id);
        List<PropertyInfoName> findPropertyInfoNameById = new ArrayList<PropertyInfoName>();
        if (Pid != 0) {
            findPropertyInfoNameById = propertyInfoNameService.findPropertyInfoNameById(p1.getUpn_id());
        }
        // 没有子级
        if (findPropertyInfoNameById.isEmpty()) {
            if (type.equals("inner")) {
                if (Pid != 0) {
                    p1.setUpn_pid(p2.getUpn_id());
                    if (p2.getUpn_sid() == 0) {
                        p1.setUpn_sid(p2.getUpn_id());
                    } else {
                        p1.setUpn_sid(p2.getUpn_sid());
                    }
                } else {
                    p1.setUpn_pid(0);
                    p1.setUpn_sid(0);
                }
            } else if (type.equals("next")) {
                if (p2.getUpn_sid() != 0) {
                    p1.setUpn_pid(p2.getUpn_pid());
                    if (p2.getUpn_sid() == 0) {
                        p1.setUpn_sid(p2.getUpn_id());
                    } else {
                        p1.setUpn_sid(p2.getUpn_sid());
                    }
                } else {
                    p1.setUpn_pid(0);
                    p1.setUpn_sid(0);
                }
            }

            if (Pid != 0) {
                p1.setUpn_sname(p2.getUpn_sname());
            } else {
                p1.setUpn_sname(name);
            }
            String upn_code = "";
            if (p1.getUpn_code() != null) {
                upn_code = p1.getUpn_code();
            }
            int indexOf = upn_code.lastIndexOf("-");

            if (p2.getUpn_name() != null) {
                if (p2.getUpn_pid() == 0) {
                    if (indexOf != -1) {
                        String substring = upn_code.substring(indexOf + 1);
                        p1.setUpn_code(substring);
                    } else {
                        p1.setUpn_code(upn_code);
                    }
                } else {
                    if (type.equals("next")) {
                        if (p2.getUpn_sid() != 0) {
                            p2 = propertyInfoNameService.findPropertyInfoNameBySid(p2.getUpn_pid());
                        }
                    }
                    if (indexOf != -1) {
                        String substring = upn_code.substring(indexOf + 1);
                        if (p2.getUpn_code() != null) {
                            p1.setUpn_code(p2.getUpn_code() + "-" + substring);
                        }
                    } else {
                        if (p2.getUpn_code() != null) {
                            p1.setUpn_code(p2.getUpn_code() + "-" + upn_code);
                        }
                    }

                }
            }

            int i = propertyInfoNameService.updatepropertyInfoNamejiegou(p1);
            propertyInfoService.updatepropertyInfojiegou(p1);
            map.put("result", i);
            // 有子级
        } else {
            if (type.equals("inner")) {
                p1.setUpn_pid(p2.getUpn_id());
                if (p2.getUpn_sid() == 0) {
                    p1.setUpn_sid(p2.getUpn_id());
                } else {
                    p1.setUpn_sid(p2.getUpn_sid());
                }
            } else if (type.equals("next")) {
                if (p2.getUpn_sid() != 0) {
                    p1.setUpn_pid(p2.getUpn_pid());
                    if (p2.getUpn_sid() == 0) {
                        p1.setUpn_sid(p2.getUpn_id());
                    } else {
                        p1.setUpn_sid(p2.getUpn_sid());
                    }
                } else {
                    p1.setUpn_pid(0);
                    p1.setUpn_sid(0);
                }
            }

            String upn_code = "";
            if (p1.getUpn_code() != null) {
                upn_code = p1.getUpn_code();
            }
            int lastIndexOf = upn_code.lastIndexOf("-");
            if (p2.getUpn_pid() == 0) {
                if (lastIndexOf != -1) {
                    String substring = upn_code.substring(lastIndexOf + 1);
                    p1.setUpn_code(substring);
                } else {
                    p1.setUpn_code(upn_code);
                }
            } else {
                if (type.equals("next")) {
                    if (p2.getUpn_sid() != 0) {
                        p2 = propertyInfoNameService.findPropertyInfoNameBySid(p2.getUpn_pid());
                    }
                }
                p1.setUpn_sid(p2.getUpn_sid());
                if (lastIndexOf != -1) {
                    String substring = upn_code.substring(lastIndexOf + 1);
                    if (p2.getUpn_code() != null) {
                        p1.setUpn_code(p2.getUpn_code() + "-" + substring);
                    }
                } else {
                    if (p2.getUpn_code() != null) {
                        p1.setUpn_code(p2.getUpn_code() + "-" + upn_code);
                    }
                }
            }


            int i = propertyInfoNameService.updatepropertyInfoNamejiegou(p1);
            propertyInfoService.updatepropertyInfojiegou(p1);
            map.put("result", i);
        }
        return map;
    }

    /**
     * 物业基础信息的模糊查询
     *
     * @return
     * @author lq
     */
    @RequestMapping("/sousuowuyemain")
    @ResponseBody
    public Map<String, Object> sousuowuyenamemain(HttpServletRequest request, PropertyInfo propertyInfo) {
        Map<String, Object> map = new HashMap<>();
        // 前台页面模糊查询的值
        //String wuyename = request.getParameter("wuyename");
        String wuyename = propertyInfo.getPropertyInfo_Name();
        PropertyInfoName p = new PropertyInfoName();
        p.setUpn_name(wuyename);
        StringBuffer sBuffer = new StringBuffer("[");
        // 当没有填写
        if (wuyename != null && wuyename != "") {
            List<PropertyInfoName> pInfoNames = propertyInfoNameService.selectPropertyInfoNameALLwuye(p);
            Set<Integer> supernum = new HashSet<Integer>();
            // 所有的超级父级id
            for (PropertyInfoName sInfoName : pInfoNames) {
                if (sInfoName.getUpn_sid() != 0) {
                    supernum.add(sInfoName.getUpn_sid());
                }
                if (sInfoName.getUpn_sid() == 0) {
                    supernum.add(sInfoName.getUpn_id());
                }
            }
            for (Integer integer : supernum) {
                PropertyInfoName pin = propertyInfoNameService.findPropertyInfoNameBySid(integer);
                if (pin != null) {
                    PropertyInfoName findPropertyInfoNameBySids = new PropertyInfoName();
                    if (pin.getUpn_pid() != null && !pin.getUpn_pid().equals("")) {
                        findPropertyInfoNameBySids = propertyInfoNameService.findPropertyInfoNameBySid(pin.getUpn_pid());
                    }
                    Integer sid = pin.getUpn_id();
                    String sname = pin.getUpn_name();
                    Integer spid = pin.getUpn_pid();
                    String swuyehao = pin.getUpn_code();
                    Integer upn_sid = pin.getUpn_sid();
                    String sna = pin.getUpn_sname();
                    String proCode = "";
                    if (findPropertyInfoNameBySids != null) {
                        proCode = findPropertyInfoNameBySids.getUpn_code();
                    }
                    sBuffer.append("{id:" + sid + ",name:'" + sname + "',open:true,pid:" + spid + ",wuyehao:'" + swuyehao + "',proCode:'" + proCode + "',sid:" + upn_sid + ",sname:'" + sna + "'},");
                }
                List<PropertyInfoName> list = propertyInfoNameService.findpropertyInfoBySuperId(integer);
                for (PropertyInfoName propertyInfoName : list) {
                    PropertyInfoName findPropertyInfoNameBySids = new PropertyInfoName();
                    if (propertyInfoName.getUpn_pid() != null && !propertyInfoName.getUpn_pid().equals("")) {
                        findPropertyInfoNameBySids = propertyInfoNameService.findPropertyInfoNameBySid(propertyInfoName.getUpn_pid());
                    }
                    Integer id = propertyInfoName.getUpn_id();
                    String name = propertyInfoName.getUpn_name();
                    Integer pid = propertyInfoName.getUpn_pid();
                    String wuyehao = propertyInfoName.getUpn_code();
                    Integer sid = propertyInfoName.getUpn_sid();
                    String sna = pin.getUpn_sname();
                    String proCode = "";
                    if (findPropertyInfoNameBySids != null) {
                        proCode = findPropertyInfoNameBySids.getUpn_code();
                    }
                    sBuffer.append("{id:" + id + ",name:'" + name + "',pid:" + pid + ",wuyehao:'" + wuyehao + "',proCode:'" + proCode + "',sid:" + sid + ",sname:'" + sna + "'},");
                }
            }
            // 当模糊查询没得值的时候
        } else {
            List<PropertyInfoName> pinalls = propertyInfoNameService.selectPropertyInfoNameALL();
            for (PropertyInfoName pinall : pinalls) {
                PropertyInfoName findPropertyInfoNameBySids = new PropertyInfoName();
                if (pinall.getUpn_pid() != null && !pinall.getUpn_pid().equals("")) {
                    findPropertyInfoNameBySids = propertyInfoNameService.findPropertyInfoNameBySid(pinall.getUpn_pid());
                }
                Integer id = pinall.getUpn_id();
                String name = pinall.getUpn_name();
                Integer pid = pinall.getUpn_pid();
                String wuyehao = pinall.getUpn_code();
                Integer sid = pinall.getUpn_sid();
                String sn = pinall.getUpn_sname();
                String proCode = "";
                if (findPropertyInfoNameBySids != null) {
                    proCode = findPropertyInfoNameBySids.getUpn_code();
                }
                sBuffer.append("{id:" + id + ",name:'" + name + "',pid:" + pid + ",wuyehao:'" + wuyehao + "',proCode:'" + proCode + "',sid:" + sid + ",sname:'" + sn + "'},");
            }
        }
        String str = sBuffer.substring(0, sBuffer.length() - 1) + "]";
        if (str.equals("]")) {
            map.put("pInfoNames", "[]");
            return map;
        }
        map.put("pInfoNames", str);
        return map;
    }

    /**
     * 物业基础信息
     *
     * @param map
     * @return
     * @author lq
     */
    @RequestMapping("/propertyInfojichu")
    public String propertyInfojichu(Map<String, Object> map) {
        String str = selectpropertyInfo(map);
        map.put("pInfoNames", str);
        return "/propertyInfo/propertyInfomain";
    }

    // 查询物业的方法
    private String selectpropertyInfo(Map<String, Object> map) {
        // 查询所有物业
        List<PropertyInfoName> pInfoNames = propertyInfoNameService.selectpropertyInfoSid();
        // 查询所有部门
        List<Company> companies = userCenterEmployeeService.selectAllCompany();
        map.put("companies", companies);
        // 查询重庆区县
        AreaCityStreet city = new AreaCityStreet();
        city.setParent_id(5001);
        List<AreaCityStreet> district = areaCityService.queryAreaCity(city);
        map.put("district", district);

        StringBuffer sBuffer = new StringBuffer("[");
        for (PropertyInfoName propertyInfoName : pInfoNames) {
            PropertyInfoName findPropertyInfoNameBySids = new PropertyInfoName();
            if (propertyInfoName.getUpn_pid() != null && !propertyInfoName.getUpn_pid().equals("")) {
                findPropertyInfoNameBySids = propertyInfoNameService.findPropertyInfoNameBySid(propertyInfoName.getUpn_pid());
            }
            Integer id = propertyInfoName.getUpn_id();
            String name = propertyInfoName.getUpn_name();
            Integer pid = propertyInfoName.getUpn_pid();
            String wuyehao = propertyInfoName.getUpn_code();
            Integer sid = propertyInfoName.getUpn_sid();
            String sname = propertyInfoName.getUpn_sname();
            String proCode = "";
            if (findPropertyInfoNameBySids != null) {
                proCode = findPropertyInfoNameBySids.getUpn_code();
            }
            sBuffer.append("{id:" + id + ",name:'" + name + "',pid:" + pid + ",wuyehao:'" + wuyehao + "',proCode:'" + proCode + "',sid:" + sid + ",sname:'" + sname + "'},");
        }
        List<PropertyInfoName> pInfoNames2 = propertyInfoNameService.selectpropertyInfoSidNot();
        for (PropertyInfoName propertyInfoName : pInfoNames2) {
            PropertyInfoName findPropertyInfoNameBySids = new PropertyInfoName();
            if (propertyInfoName.getUpn_pid() != null && !propertyInfoName.getUpn_pid().equals("")) {
                findPropertyInfoNameBySids = propertyInfoNameService.findPropertyInfoNameBySid(propertyInfoName.getUpn_pid());
            }
            Integer id = propertyInfoName.getUpn_id();
            String name = propertyInfoName.getUpn_name();
            Integer pid = propertyInfoName.getUpn_pid();
            String wuyehao = propertyInfoName.getUpn_code();
            Integer sid = propertyInfoName.getUpn_sid();
            String sname = propertyInfoName.getUpn_sname();
            String proCode = "";
            if (findPropertyInfoNameBySids != null) {
                proCode = findPropertyInfoNameBySids.getUpn_code();
            }
            sBuffer.append("{id:" + id + ",name:'" + name + "',pid:" + pid + ",wuyehao:'" + wuyehao + "',proCode:'" + proCode + "',sid:" + sid + ",sname:'" + sname + "'},");
        }

        String str = sBuffer.substring(0, sBuffer.length() - 1) + "]";
        return str;
    }

    /**
     * 查询镇
     *
     * @author tanglei
     */
    @RequestMapping("/selectCirtStreet")
    @ResponseBody
    public Map<String, Object> selectCirtStreet(Integer code) {
        Map<String, Object> map = new HashMap<>();
        AreaCityStreet city = new AreaCityStreet();
        city.setParent_id(code);
        List<AreaCityStreet> district = areaCityService.queryAreaCity(city);
        map.put("district", district);
        return map;
    }

    /**
     * 添加物业
     *
     * @param addtype                添加类型
     * @param propertyInfoName（物业实体）
     * @param company                （部门实体）
     * @return
     * @author lq
     */
    @RequestMapping("/addpropertyInfo")
    @ResponseBody
    public Map<String, Object> addpropertyInfoziji(PropertyInfoName propertyInfoName, String addtype, Company company) throws AlipayApiException {

        Map<String, Object> map = new HashMap<>();

        PropertyInfoName pi = propertyInfoNameService.findPropertyInfoNameBySid(propertyInfoName.getUpn_id());

        if (addtype.equals("添加同级")) {
            if (pi == null) {
                map.put("message", "error");
                return map;
            } else {
                // 当前为最高级添加同级
                if (pi.getUpn_pid() == 0) {
                    propertyInfoName.setUpn_sname(propertyInfoName.getUpn_name());
                    propertyInfoName.setUpn_pid(0);
                    propertyInfoName.setUpn_sid(0);
                    // 当前不为最高级添加同级
                } else {
                    propertyInfoName.setUpn_sname(pi.getUpn_sname());
                    propertyInfoName.setUpn_pid(pi.getUpn_pid());
                    propertyInfoName.setUpn_sid(pi.getUpn_sid());
                    int lastIndexOf = pi.getUpn_code().lastIndexOf("-");
                    if (lastIndexOf != -1) {
                        propertyInfoName.setUpn_code(pi.getUpn_code().substring(0, lastIndexOf) + propertyInfoName.getUpn_code());
                    }
                }
                int addresult = propertyInfoNameService.addpropertyInfo(propertyInfoName, company);
                map.put("addresult", addresult);

            }
        } else if (addtype.equals("添加子级")) {
            if (pi == null) {
                map.put("message", "error");
                return map;
            }
            // 添加子级父级为最高级
            if (pi.getUpn_pid() == 0) {
                propertyInfoName.setUpn_sname(pi.getUpn_name());
                propertyInfoName.setUpn_pid(pi.getUpn_id());
                propertyInfoName.setUpn_sid(pi.getUpn_id());
                // 添加子级父级不为最高级
            } else {
                //判断父级的父级编码是否为0
                PropertyInfoName piNext = propertyInfoNameService.findPropertyInfoNameBySid(pi.getUpn_pid());
                if (piNext.getUpn_pid() != 0) {
                    map.put("不能再添加子级", "error");
                    return map;
                }
                propertyInfoName.setUpn_sname(pi.getUpn_sname());
                propertyInfoName.setUpn_pid(pi.getUpn_id());
                propertyInfoName.setUpn_sid(pi.getUpn_sid());
                propertyInfoName.setUpn_code(pi.getUpn_code() + "-" + propertyInfoName.getUpn_code());
            }
            // 刚才添加的数据
            map.put("propertyInfoName", propertyInfoName);
            int addresult = propertyInfoNameService.addpropertyInfo(propertyInfoName, company);
            map.put("addresult", addresult);
        }
        PropertyInfo propertyInfo = new PropertyInfo();
        propertyInfo.setUpn_id(propertyInfoName.getUpn_id());
        // 查询物业基础信息是否存在
        PropertyInfo propertyInfoData = propertyInfoService.queryPropertyInfoCount(propertyInfo);
        if (null == propertyInfoData) {
            propertyInfo.setPropertyInfo_address(propertyInfoName.getPropertyInfo_address());
            propertyInfo.setPropertyInfo_coordinate(propertyInfoName.getPropertyInfo_coordinate());
            propertyInfoService.insertPropertyInfo(propertyInfo);
        } else {
            propertyInfo.setPropertyInfo_Id(propertyInfoData.getPropertyInfo_Id());
            propertyInfo.setPropertyInfo_address(propertyInfoName.getPropertyInfo_address());
            propertyInfo.setPropertyInfo_coordinate(propertyInfoName.getPropertyInfo_coordinate());
            propertyInfoService.updatePropertyInfo(propertyInfo);
        }
        return map;
    }

    @RequestMapping("/addpropertyIn")
    @ResponseBody
    public Map<String, Object> addpropertyInfoziji1(PropertyInfoName propertyInfoName, Company company, String buildDong, String unitsText) throws AlipayApiException {
        Map<String, Object> map = new HashMap<>();
        if (propertyInfoName.getUpn_id() == null) {
            if (buildDong == "" && unitsText == "") {
                PropertyInfoName proper = new PropertyInfoName();
                proper.setUpn_name(propertyInfoName.getUpn_name());
                proper = propertyInfoNameService.selectPropertyInfoPid(proper);
                if (proper != null) {
                    map.put("error", "小区名称已有，不能重复添加");
                    return map;
                }
                PropertyInfoName property = new PropertyInfoName();
                property.setUpn_name(propertyInfoName.getUpn_name());
                property.setUpn_sname(propertyInfoName.getUpn_name());
                property.setUpn_pid(0);
                property.setUpn_sid(0);
                property.setPropertyInfo_address(propertyInfoName.getPropertyInfo_address());
                property.setPropertyInfo_coordinate(propertyInfoName.getPropertyInfo_coordinate());
                property.setPropertyInfo_quyu(propertyInfoName.getPropertyInfo_quyu());
                property.setPropertyInfo_street(propertyInfoName.getPropertyInfo_street());
                int addresult = propertyInfoNameService.addpropertyInfo(property, company);
                map.put("addresult", addresult);
            } else {
                map.put("error", "请先添加小区");
                return map;
            }
        } else {
            PropertyInfoName pi = propertyInfoNameService.findPropertyInfoNameBySid(propertyInfoName.getUpn_id());
//			PropertyInfoName proper=new PropertyInfoName();
//			proper.setUpn_pid(pi.getUpn_id());
//			if (pi.getUpn_name().equals(propertyInfoName.getUpn_name())) {
//				PropertyInfoName dong=propertyInfoNameService.selectPropertyInfoPid(proper);
//				if (dong != null && unitsText != "") {
//					if (buildDong == "") {
//						json.put("error","请先添加楼栋数");
//						return json;
//					}
//				}
//			}
            //添加小区
            if (buildDong == "" && unitsText == "") {
                //判断数据库里面是否包含这个小区
                PropertyInfoName pro = new PropertyInfoName();
                pro.setUpn_name(propertyInfoName.getUpn_name());
                pro = propertyInfoNameService.selectPropertyInfoPid(pro);
                if (pro != null) {
                    map.put("error", "小区名称已有，不能重复添加");
                    return map;
                }
                PropertyInfoName property = new PropertyInfoName();
                property.setUpn_name(propertyInfoName.getUpn_name());
                property.setUpn_sname(propertyInfoName.getUpn_name());
                property.setUpn_pid(0);
                property.setUpn_sid(0);
                property.setPropertyInfo_address(propertyInfoName.getPropertyInfo_address());
                property.setPropertyInfo_coordinate(propertyInfoName.getPropertyInfo_coordinate());
                property.setPropertyInfo_quyu(propertyInfoName.getPropertyInfo_quyu());
                property.setPropertyInfo_street(propertyInfoName.getPropertyInfo_street());
                int addresult = propertyInfoNameService.addpropertyInfo(property, company);
                map.put("addresult", addresult);
            } else if (buildDong != "") {
                // 添加(栋)
                if (unitsText == "") {
                    if (pi != null) {
                        if (pi.getUpn_name().equals(propertyInfoName.getUpn_name())) {
                            PropertyInfoName propertyIn = new PropertyInfoName();
                            propertyIn.setUpn_pid(pi.getUpn_id());
                            propertyIn.setUpn_name("栋");
                            //查询是否有子集
                            List<PropertyInfoName> prop = propertyInfoNameService.queryproperInfo(propertyIn);
                            PropertyInfoName property = new PropertyInfoName();
                            property.setUpn_pid(pi.getUpn_id());
                            property.setUpn_name("单元");
                            List<PropertyInfoName> pro = propertyInfoNameService.queryproperInfo(property);
                            if (prop.size() == 0 && pro.size() != 0) {
                                map.put("error", "该小区之前未开启栋数,不能添加");
                                return map;
                            }
                            PropertyInfoName propertyInfo = new PropertyInfoName();
                            propertyInfo.setUpn_pid(pi.getUpn_id());
                            propertyInfo.setUpn_name(buildDong + "栋");
                            //查询是否有栋
                            propertyInfo = propertyInfoNameService.selectPropertyInfoPid(propertyInfo);
                            if (propertyInfo == null) {
                                propertyInfoName.setUpn_name(buildDong + "栋");
                                propertyInfoName.setUpn_sname(pi.getUpn_sname());
                                propertyInfoName.setUpn_pid(pi.getUpn_id());
                                if (pi.getUpn_sid() == 0) {
                                    propertyInfoName.setUpn_sid(pi.getUpn_id());
                                } else {
                                    propertyInfoName.setUpn_sid(pi.getUpn_sid());
                                }
                                propertyInfoName.setUpn_code(buildDong);
                                int addresult = propertyInfoNameService.addpropertyInfo(propertyInfoName, company);
                                map.put("addresult", addresult);
                            } else {
                                map.put("error", "已添加小区相同栋数,不能重复添加");
                                return map;
                            }
                        } else {
                            map.put("error", "请先添加小区");
                            return map;
                        }
                    }
                } else {
                    if (pi != null) {
                        if (pi.getUpn_name().equals(propertyInfoName.getUpn_name())) {
                            PropertyInfoName propertyIn = new PropertyInfoName();
                            propertyIn.setUpn_pid(pi.getUpn_id());
                            propertyIn.setUpn_name("栋");
                            //查询是否有子集
                            List<PropertyInfoName> prop = propertyInfoNameService.queryproperInfo(propertyIn);
                            if (prop.size() == 0) {
                                map.put("error", "请先添加栋数");
                                return map;
                            }
                            PropertyInfoName propertyInfo = new PropertyInfoName();
                            propertyInfo.setUpn_id(pi.getUpn_id());
                            propertyInfo.setUpn_name(buildDong + "栋");
                            //是否之前已添加相同的栋
                            propertyInfo = propertyInfoNameService.selectPropertyInfoPid(propertyInfo);
                            if (propertyInfo == null) {
                                propertyInfoName.setUpn_name(buildDong + "栋");
                                propertyInfoName.setUpn_sname(pi.getUpn_sname());
                                propertyInfoName.setUpn_pid(pi.getUpn_id());
                                if (pi.getUpn_sid() == 0) {
                                    propertyInfoName.setUpn_sid(pi.getUpn_id());
                                } else {
                                    propertyInfoName.setUpn_sid(pi.getUpn_sid());
                                }
                                propertyInfoName.setUpn_code(buildDong);
                                int addresult = propertyInfoNameService.addpropertyInfo(propertyInfoName, company);
                                map.put("addresult", addresult);
                                propertyInfo = propertyInfoNameService.selectPropertyInfoPid(propertyInfoName);
                            }
                            PropertyInfoName property = new PropertyInfoName();
                            property.setUpn_pid(propertyInfo.getUpn_id());
                            property.setUpn_name(unitsText + "单元");
                            property = propertyInfoNameService.selectPropertyInfoPid(property);
                            //添加单元
                            if (property == null) {
                                propertyInfoName.setUpn_name(unitsText + "单元");
                                propertyInfoName.setUpn_sname(pi.getUpn_sname());
                                propertyInfoName.setUpn_pid(propertyInfo.getUpn_id());
                                if (pi.getUpn_sid() == 0) {
                                    propertyInfoName.setUpn_sid(pi.getUpn_id());
                                } else {
                                    propertyInfoName.setUpn_sid(pi.getUpn_sid());
                                }
                                propertyInfoName.setUpn_code(buildDong + "-" + unitsText);
                                int addresult = propertyInfoNameService.addpropertyInfo(propertyInfoName, company);
                                map.put("addresult", addresult);
                            } else {
                                map.put("error", "已添加小区单元,不能重复添加");
                                return map;
                            }
                        } else {
                            map.put("error", "请先添加小区");
                            return map;
                        }
                    }
                }
            } else if (buildDong == "" && unitsText != "") {
                if (pi != null) {
                    if (pi.getUpn_name().equals(propertyInfoName.getUpn_name())) {
                        PropertyInfoName propertyInfo = new PropertyInfoName();
                        propertyInfo.setUpn_pid(pi.getUpn_id());
                        propertyInfo.setUpn_name("栋");
                        //查询是否有子集
                        List<PropertyInfoName> prop = propertyInfoNameService.queryproperInfo(propertyInfo);
                        if (prop.size() == 0) {
                            PropertyInfoName p = new PropertyInfoName();
                            p.setUpn_pid(pi.getUpn_id());
                            p.setUpn_name(unitsText + "单元");
                            p = propertyInfoNameService.selectPropertyInfoPid(p);
                            if (p == null) {
                                //添加单元
                                propertyInfoName.setUpn_name(unitsText + "单元");
                                propertyInfoName.setUpn_sname(pi.getUpn_sname());
                                propertyInfoName.setUpn_pid(pi.getUpn_id());
                                if (pi.getUpn_sid() == 0) {
                                    propertyInfoName.setUpn_sid(pi.getUpn_id());
                                } else {
                                    propertyInfoName.setUpn_sid(pi.getUpn_sid());
                                }
                                propertyInfoName.setUpn_code(buildDong);
                                int addresult = propertyInfoNameService.addpropertyInfo(propertyInfoName, company);
                                map.put("addresult", addresult);
                            } else {
                                map.put("error", "已添加小区单元,不能重复添加");
                                return map;
                            }
                        } else {
                            map.put("error", "先添加栋数,再添加单元");
                            return map;
                        }
                    } else {
                        map.put("error", "请先添加小区");
                        return map;
                    }
                }
            }
        }
        // 刚才添加的数据
        map.put("propertyInfoName", propertyInfoName);
        return map;
    }

    /**
     * 查询所有物业
     *
     * @return
     * @author 刘强
     */
    @RequestMapping("/propertyInfohouse")
    public String propertyInfohouse(Map<String, Object> map) {
        String str = selectpropertyInfo(map);
        map.put("pInfoNames", str);
        return "propertyInfo/propertyInfohouseNew";
    }

    /**
     * 初始化修改物业部门
     *
     * @return
     * @author 刘强
     */
    @RequestMapping("/updatecompany")
    @ResponseBody
    public Map<String, Object> updatecompany(PropertyInfoName propertyInfoName) {
        Map<String, Object> map = new HashMap<>();
        PropertyInfo pi = propertyInfoService.selectcompanyByPiId(propertyInfoName);
        map.put("companydeperment", pi);
        return map;
    }

    /**
     * 根据sid查找物业
     *
     * @return
     * @author 刘强
     */
    @RequestMapping("/selectsid")
    @ResponseBody
    public Map<String, Object> selectsid(Integer sid) {
        Map<String, Object> map = new HashMap<>();
        PropertyInfoName p = new PropertyInfoName();
        p.setUpn_sid(sid);
        List<PropertyInfoName> lists = propertyInfoNameService.selectsid(p);
        PropertyInfoName findPropertyInfoNameBySid = propertyInfoNameService.findPropertyInfoNameBySid(sid);
        lists.add(0, findPropertyInfoNameBySid);
        map.put("lists", lists);
        return map;
    }

    /**
     * 模糊查询物业
     *
     * @param map
     * @return
     * @author 刘强
     */
    @RequestMapping(value = "/sousuowuyename", method = RequestMethod.POST)
    public String sousuowuyename(Map<String, Object> map, HttpServletRequest request) {
        // 前台页面模糊查询的值
        String wuyename = request.getParameter("wuyename");
        PropertyInfoName p = new PropertyInfoName();
        p.setUpn_name(wuyename);
        StringBuffer sBuffer = new StringBuffer("[");
        // 当没有填写
        if (wuyename != null && wuyename != "") {
            List<PropertyInfoName> pInfoNames = propertyInfoNameService.selectPropertyInfoNameALLwuye(p);
            Set<Integer> supernum = new HashSet<Integer>();
            // 所有的超级父级id
            for (PropertyInfoName sInfoName : pInfoNames) {
                if (sInfoName.getUpn_sid() != 0) {
                    supernum.add(sInfoName.getUpn_sid());
                }
                if (sInfoName.getUpn_sid() == 0) {
                    supernum.add(sInfoName.getUpn_id());
                }
            }
            for (Integer integer : supernum) {
                PropertyInfoName pin = propertyInfoNameService.findPropertyInfoNameBySid(integer);
                if (pin != null) {
                    Integer sid = pin.getUpn_id();
                    String sname = pin.getUpn_name();
                    Integer spid = pin.getUpn_pid();
                    String swuyehao = pin.getUpn_code();
                    Integer upn_sid = pin.getUpn_sid();
                    String sna = pin.getUpn_sname();
                    sBuffer.append("{id:" + sid + ",name:'" + sname + "',open:true,pid:" + spid + ",wuyehao:'" + swuyehao + "',sid:" + upn_sid + ",sname:'" + sna + "'},");
                }
                List<PropertyInfoName> list = propertyInfoNameService.findpropertyInfoBySuperId(integer);
                for (PropertyInfoName propertyInfoName : list) {
                    Integer id = propertyInfoName.getUpn_id();
                    String name = propertyInfoName.getUpn_name();
                    Integer pid = propertyInfoName.getUpn_pid();
                    String wuyehao = propertyInfoName.getUpn_code();
                    Integer sid = propertyInfoName.getUpn_sid();
                    String sna = pin.getUpn_sname();
                    sBuffer.append("{id:" + id + ",name:'" + name + "',pid:" + pid + ",wuyehao:'" + wuyehao + "',sid:" + sid + ",sname:'" + sna + "'},");
                }
            }
            // 当模糊查询没得值的时候
        } else {
            List<PropertyInfoName> pinalls = propertyInfoNameService.selectPropertyInfoNameALL();
            for (PropertyInfoName pinall : pinalls) {
                Integer id = pinall.getUpn_id();
                String name = pinall.getUpn_name();
                Integer pid = pinall.getUpn_pid();
                String wuyehao = pinall.getUpn_code();
                Integer sid = pinall.getUpn_sid();
                String sn = pinall.getUpn_sname();
                sBuffer.append("{id:" + id + ",name:'" + name + "',pid:" + pid + ",wuyehao:'" + wuyehao + "',sid:" + sid + ",sname:'" + sn + "'},");
            }
        }
        String str = sBuffer.substring(0, sBuffer.length() - 1) + "]";
        // 查询所有部门
        List<Company> companies = userCenterEmployeeService.selectAllCompany();
        map.put("companies", companies);
        if (str.equals("]")) {
            map.put("pInfoNames", "[]");
            return "/propertyInfo/propertyInfohouse";
        }
        map.put("pInfoNames", str);
        return "/propertyInfo/propertyInfohouse";
    }

    /**
     * 根据sname查询指定物业
     *
     * @return
     * @author 刘强
     */
    @RequestMapping("/selectbysid")
    @ResponseBody
    public Map<String, Object> selectbysid(Integer upn_id) {
        Map<String, Object> map = new HashMap<>();

        if (upn_id == null) {
            map.put("message", "error");
            return map;
        }
        PropertyInfoName propertyInfoName = new PropertyInfoName();
        propertyInfoName.setUpn_id(upn_id);

        List<PropertyInfoName> list = propertyInfoNameService.selectpropertyInfoBySname(propertyInfoName);
        PropertyInfo pi = propertyInfoService.selectcompanyByPiId(propertyInfoName);
        map.put("propertyInfoName", list);
        map.put("pid", pi.getPropertyInfo_Id());
        return map;
    }

    /**
     * 查询物业信息
     *
     * @param upn_name
     * @param pageNo
     * @return
     * @Description:
     * @author JiangQt
     */
    @RequestMapping("/queryPropertyInfoList")
    @ResponseBody
    public String queryPropertyInfoList(String upn_name, int pageNo) {
        Msg<Object> msg = new Msg<>();
        Pagination<PropertyInfoName> pagination = new Pagination<>(pageNo, 10);

        // 参数
        PropertyInfoName propertyInfoName = new PropertyInfoName();
        propertyInfoName.setUpn_sid(0);
        if (StringUtils.isEmpty(upn_name)) {
            propertyInfoName.setUpn_name(upn_name);
            pagination.setT(propertyInfoName);
        } else {

            List<String> propertyNames = propertyInfoService.queryPropertyInfoNames();
            List<String> paramNames = PinYin2Abbreviation.getStartChar(upn_name, propertyNames);

            if (null != paramNames && !paramNames.isEmpty()) {

                propertyInfoName.setPropertyNames(paramNames);
            }
            propertyInfoName.setUpn_name(upn_name);
            pagination.setT(propertyInfoName);
        }
        // 结果
        List<PropertyInfoName> list = propertyInfoService.queryPropertyInfoNameList(pagination);
        int totalRecords = propertyInfoService.queryPropertyInfoNameListRecords(pagination);

        pagination.setList(list, totalRecords);
        msg.setData(pagination);
        return msg.toString();
    }

    /**
     * 查询物业信息
     *
     * @return
     * @Description:
     * @author JiangQt
     */
    @RequestMapping("/queryPropertyInfo")
    @ResponseBody
    public Map<String, Object> queryPropertyInfo(Integer propertyInfoId) {
        Map<String, Object> msg = new HashMap<>();
        if (StringUtils.isEmpty(propertyInfoId)) {
            msg.put("code", 110);
            msg.put("msg", "参数错误");
            return msg;
        }
        PropertyInfo propertyInfo = new PropertyInfo();
        propertyInfo.setPropertyInfo_Id(propertyInfoId);
        PropertyInfo queryPropertyInfo = propertyInfoService.queryPropertyInfoID(propertyInfo);
        msg.put("code", 200);
        msg.put("data", queryPropertyInfo);
        return msg;
    }

    // == UPDATE

    /**
     * 修改物业
     *
     * @return
     * @author 刘强
     */
    @RequestMapping("/updatepropertyInfoName")
    @ResponseBody
    public Map<String, Object> updatepropertyInfoName(HttpServletRequest request, PropertyInfoName propertyInfoName, Company company, String buildDong, String unitsText) {
        Map<String, Object> updatepropertyInfo = propertyInfoNameService.updatepropertyInfo(propertyInfoName, company, buildDong, unitsText);
        return updatepropertyInfo;
    }

    /**
     * 查询物业基础信息
     *
     * @param propertyInfoName 物业表
     * @author 刘强
     */
    @RequestMapping("/selelctpropertyInfo")
    @ResponseBody
    public Map<String, Object> selelctpropertyInfo(PropertyInfoName propertyInfoName) {
        Map<String, Object> map = new HashMap<>();
        PropertyInfo selectcompanyByPiId = propertyInfoService.selectcompanyByPiId(propertyInfoName);
        PropertyLivingPayment propertyLivingPayment = new PropertyLivingPayment();
        propertyLivingPayment.setPropertyInfo_Id(selectcompanyByPiId.getPropertyInfo_Id());
        PropertyLivingPayment queryPropertyLivingPaymentWhere = propertyLivingPaymentService.queryPropertyLivingPaymentWhere(propertyLivingPayment);
        map.put("pl", queryPropertyLivingPaymentWhere);
        map.put("propertyInfo", selectcompanyByPiId);
        return map;
    }

    /**
     * 查询父子级方法
     *
     * @param request
     * @param response
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/propertyInfoName")
    @ResponseBody
    public Map<String, Object> propertyInfoName(HttpServletRequest request, HttpServletResponse response, String where) {

        // 跨域传输json
        response.addHeader("Access-Control-Allow-Origin", "*");

        Map<String, Object> map = new HashMap<>();

        PropertyInfoName infoName = new PropertyInfoName();
        infoName.setUpn_name(where);
        List<PropertyInfoName> propertyInfoNames = new ArrayList<PropertyInfoName>();
        List<PropertyInfoName> propertyInfoName = propertyInfoNameService.selectPropertyInfoNameWhere(infoName);
        for (PropertyInfoName propertyInfoName2 : propertyInfoName) {
            String strName = propertyInfoName2.getUpn_sname();
            String code = propertyInfoName2.getUpn_code();
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
            propertyInfoName2.setPropertyInfo_Name(strName);
            propertyInfoNames.add(propertyInfoName2);
        }
        if (!propertyInfoName.isEmpty()) {
            map.put("code", 200);
            map.put("propertyInfoName", propertyInfoNames);
        } else {
            map.put("code", "0");
        }
        return map;
    }

    /**
     * 跟进物业水电气
     *
     * @param propertyInfo 物业基础信息
     * @return
     * @author 陈智颖
     */
    @RequestMapping(method = RequestMethod.POST,value="/insertPropertyLivingPayment")
    @ResponseBody
    @VerifyCSRFToken
    public Map<String, Object> insertPropertyLivingPayment(HttpServletResponse response, String account, PropertyLivingPayment propertyLivingPayment, PropertyInfo propertyInfo) {
        // 装载实体类MAP
        Map<String, Object> map = new HashMap<>();
        // 跨域传输json
        response.addHeader("Access-Control-Allow-Origin", "*");

        UserCenterEmployee employee = new UserCenterEmployee();
        employee.setEm_phone(account);
        employee = userCenterEmployeeService.selectAccount(employee).get(0);

        // 查询物业基础信息是否存在
        PropertyInfo queryPropertyInfoCount = propertyInfoService.queryPropertyInfoCount(propertyInfo);

        Integer insertPropertyInfo = 0;
        Integer bool = 0;
        if (queryPropertyInfoCount.getSize() == 0) {
            insertPropertyInfo = propertyInfoService.insertPropertyInfo(propertyInfo);
            if (insertPropertyInfo > 0) {
                propertyLivingPayment.setPropertyInfo_Id(propertyInfo.getPropertyInfo_Id());
            }
        } else {
            propertyInfo.setPropertyInfo_Id(queryPropertyInfoCount.getPropertyInfo_Id());
            propertyLivingPayment.setPropertyInfo_Id(queryPropertyInfoCount.getPropertyInfo_Id());
        }

        PropertyLivingPayment queryPropertyLivingPaymentCount = propertyLivingPaymentService.queryPropertyLivingPaymentCount(propertyLivingPayment);
        if (queryPropertyLivingPaymentCount.getSize() > 0) {
            bool = propertyLivingPaymentService.updatePropertyLivingPayment(propertyLivingPayment);
        } else {
            propertyLivingPayment.setEm_id(employee.getEm_id());
            bool = propertyLivingPaymentService.insertPropertyLivingPayment(propertyLivingPayment);
        }

        // 判断物业水电气
        PropertyLivingPayment livingPayment = new PropertyLivingPayment();
        livingPayment.setPropertyInfo_Id(queryPropertyInfoCount.getPropertyInfo_Id());
        List<PropertyLivingPayment> queryPropertyLivingPayment = propertyLivingPaymentService.queryPropertyLivingPayment(livingPayment);
        Boolean bools = false;
        for (PropertyLivingPayment propertyLivingPayment2 : queryPropertyLivingPayment) {
            if (propertyLivingPayment2.getLp_bools() == 0) {
                bools = true;
            } else {
                if (isNull(propertyLivingPayment2.getLp_type()) && isNull(propertyLivingPayment2.getLp_cycle()) && isNull(propertyLivingPayment2.getLp_company())
                        && isNull(propertyLivingPayment2.getLp_phone()) && isNull(propertyLivingPayment2.getLp_money()) && isNull(propertyLivingPayment2.getLp_bool())) {
                    bools = true;
                } else {
                    bools = false;
                    break;
                }
            }
        }

        // 判断是否进入下个阶段
        if (bools) {
            if (queryPropertyLivingPayment.size() == 3) {
                propertyInfo.setPropertyInfo_stage(2);
            } else {
                propertyInfo.setPropertyInfo_stage(1);
                bools = false;
            }
        } else {
            propertyInfo.setPropertyInfo_stage(1);
            bools = false;
        }
        if (insertPropertyInfo == 0) {
            propertyInfoService.updatePropertyInfo(propertyInfo);
        }

        if (bool > 0) {
            map.put("message", "success");
            map.put("propertyLivingPayment", propertyLivingPayment);
            if (bools) {
                map.put("stage", propertyInfo.getPropertyInfo_stage());
            } else {
                map.put("stage", 0);
            }
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 跟进物业信息
     *
     * @param propertyInfo 物业基础信息
     * @return
     * @author 陈智颖
     */
    @RequestMapping(method=RequestMethod.POST,value="/insertPropertys")
    @ResponseBody
    @VerifyCSRFToken
    public Map<String, Object> insertPropertys(HttpServletResponse response, String account, PropertyInfo propertyInfo, Integer typeState, String propertyInfoDate) {
        // 装载实体类MAP
        Map<String, Object> map = new HashMap<>();

        // 跨域传输json
        response.addHeader("Access-Control-Allow-Origin", "*");

        UserCenterEmployee employee = new UserCenterEmployee();
        employee.setEm_phone(account);
        employee = userCenterEmployeeService.selectAccount(employee).get(0);
        // 判断物业水电气
        Boolean bools = false;
        if (typeState == 2) {
            if (isNull(propertyInfo.getPropertyInfo_Tel()) && isNull(propertyInfo.getPropertyInfo_Cost()) && isNull(propertyInfo.getPropertyInfo_address())
                    && isNull(propertyInfo.getPropertyInfo_quyu()) && isNull(propertyInfo.getPropertyInfo_gui()) && isNull(propertyInfo.getPropertyInfo_quan())
                    && isNull(propertyInfo.getPropertyInfo_coordinate())) {
                bools = true;
            } else {
                bools = false;
            }
        } else if (typeState == 3) {
            if (isNull(propertyInfo.getPropertyInfo_broadband()) && isNull(propertyInfo.getPropertyInfo_Life())) {
                bools = true;
            } else {
                bools = false;
            }
        } else if (typeState == 4) {
            if (isNull(propertyInfoDate)) {
                SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
                try {
                    propertyInfo.setPropertyInfo_OpenTime(sf.parse(propertyInfoDate));
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            if (isNull(propertyInfo.getSubway_Name())) {
                String[] split = propertyInfo.getSubway_Name().split(",");
                int bool = 0;
                PropertyInfoSubwany propertyInfoSubwany = new PropertyInfoSubwany();
                propertyInfoSubwany.setPropertyInfo_Id(propertyInfo.getPropertyInfo_Id());
                propertyInfoService.deleteSubwany(propertyInfoSubwany);
                for (int i = 0; i < split.length; i++) {
                    propertyInfoSubwany.setSubway_Name(split[i]);
                    bool = propertyInfoService.updateSubwany(propertyInfoSubwany);
                }
                if (bool > 0) {
                    bools = true;
                } else {
                    bools = false;
                }
            } else {
                bools = false;
            }
        }

        // 判断是否进入下个阶段
        if (bools) {
            propertyInfo.setPropertyInfo_stage(typeState + 1);
        } else {
            propertyInfo.setPropertyInfo_stage(typeState);
        }

        // 修改物业信息
        Integer bool = 0;
        if (typeState != 5) {
            bool = propertyInfoService.updatePropertyInfo(propertyInfo);
        } else {
            bool = 1;
        }

        if (bool > 0) {
            map.put("message", "success");
            if (bools) {
                map.put("stage", propertyInfo.getPropertyInfo_stage());
            } else {
                map.put("stage", 0);
            }
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * jbox弹出百度地图获取经纬度
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/map")
    public String map(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map, String hi_address, String xyz) {
        map.put("hi_address", hi_address);
        map.put("xyz", xyz);
        return "/propertyInfo/map";
    }

    /**
     * 物业水电气和物业信息
     *
     * @param response
     * @param upn_id   物业父子级编码
     * @param type     水、电、气类型
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/propertyWater")
    @ResponseBody
    public Map<String, Object> propertyWater(HttpServletResponse response, Integer upn_id, String type) {

        // 跨域传输json
        response.addHeader("Access-Control-Allow-Origin", "*");

        Map<String, Object> map = new HashMap<>();
        PropertyInfo propertyInfo = new PropertyInfo();
        propertyInfo.setUpn_id(upn_id);
        PropertyInfo queryPropertyInfoCount = propertyInfoService.queryPropertyInfoCount(propertyInfo);
        PropertyLivingPayment propertyLivingPayment = new PropertyLivingPayment();
        propertyLivingPayment.setPropertyInfo_Id(queryPropertyInfoCount.getPropertyInfo_Id());
        if (type != null && !type.equals("")) {
            propertyLivingPayment.setLp_type(type);
        }
        PropertyLivingPayment queryPropertyLivingPayment = propertyLivingPaymentService.queryPropertyLivingPaymentWhere(propertyLivingPayment);

        PropertyInfo propertyInfos = propertyInfoService.queryPropertyInfoID(queryPropertyInfoCount);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        if (propertyInfos.getPropertyInfo_OpenTime() != null) {
            propertyInfos.setPropertyInfoStrTime(sf.format(propertyInfos.getPropertyInfo_OpenTime()));
        }

        // 物业水电气
        String cycleTitle = "";
        PropertyLivingPayment livingPayment = new PropertyLivingPayment();
        livingPayment.setPropertyInfo_Id(propertyInfos.getPropertyInfo_Id());
        List<PropertyLivingPayment> queryPropertyLivingPayments = propertyLivingPaymentService.queryPropertyLivingPayment(livingPayment);
        for (PropertyLivingPayment propertyLivingPayment2 : queryPropertyLivingPayments) {
            if (propertyLivingPayment2.getLp_bools() == 0) {
                String typeTitle = propertyLivingPayment2.getLp_type();
                switch (typeTitle) {
                    case "水":
                        cycleTitle += "水、";
                        break;
                    case "电":
                        cycleTitle += "电、";
                        break;
                    case "气":
                        cycleTitle += "气、";
                        break;
                    default:
                        break;
                }
            } else {
                if (isNull(propertyLivingPayment2.getLp_type()) && isNull(propertyLivingPayment2.getLp_cycle()) && isNull(propertyLivingPayment2.getLp_company())
                        && isNull(propertyLivingPayment2.getLp_phone()) && isNull(propertyLivingPayment2.getLp_money()) && isNull(propertyLivingPayment2.getLp_bool())) {
                    String typeTitle = propertyLivingPayment2.getLp_type();
                    switch (typeTitle) {
                        case "水":
                            cycleTitle += "水、";
                            break;
                        case "电":
                            cycleTitle += "电、";
                            break;
                        case "气":
                            cycleTitle += "气、";
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        if (cycleTitle != null && !cycleTitle.equals("")) {
            cycleTitle = "(" + cycleTitle.substring(0, cycleTitle.length() - 1) + ")";
        } else {
            cycleTitle = null;
        }

        if (queryPropertyLivingPayment != null) {
            map.put("message", "success");
            map.put("cycleTitle", cycleTitle);
            map.put("queryPropertyLivingPayment", queryPropertyLivingPayment);
            map.put("propertyInfos", propertyInfos);
        } else {
            map.put("cycleTitle", cycleTitle);
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 继承物业信息
     *
     * @param response
     * @param upn_id   需要父子级ID
     * @param pid      继承ID
     * @param account  账号
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/propertyParent")
    @ResponseBody
    public Map<String, Object> propertyParent(HttpServletResponse response, Integer upn_id, Integer pid, String account) {

        // 跨域传输json
        response.addHeader("Access-Control-Allow-Origin", "*");

        Map<String, Object> map = new HashMap<>();

        UserCenterEmployee employee = new UserCenterEmployee();
        employee.setEm_phone(account);
        employee = userCenterEmployeeService.selectAccount(employee).get(0);

        PropertyInfo propertyInfo = new PropertyInfo();
        propertyInfo.setUpn_id(pid);
        PropertyInfo queryPropertyInfoCount = propertyInfoService.queryPropertyInfoCount(propertyInfo);
        // 物业水电气
        PropertyLivingPayment propertyLivingPayment = new PropertyLivingPayment();
        propertyLivingPayment.setPropertyInfo_Id(queryPropertyInfoCount.getPropertyInfo_Id());
        List<PropertyLivingPayment> queryPropertyLivingPayment = propertyLivingPaymentService.queryPropertyLivingPayment(propertyLivingPayment);
        // 物业基础信息
        PropertyInfo queryPropertyInfoID = propertyInfoService.queryPropertyInfoID(queryPropertyInfoCount);

        Integer bool = 0;

        propertyInfo.setUpn_id(upn_id);
        PropertyInfo queryPropertyInfos = propertyInfoService.queryPropertyInfoCount(propertyInfo);
        // 判断是否存在物业水电气，存在就删除原有的
        PropertyLivingPayment livingPayment = new PropertyLivingPayment();
        livingPayment.setPropertyInfo_Id(queryPropertyInfos.getPropertyInfo_Id());
        List<PropertyLivingPayment> queryPropertyLivingPayment2 = propertyLivingPaymentService.queryPropertyLivingPayment(livingPayment);
        if (!queryPropertyLivingPayment2.isEmpty()) {
            for (PropertyLivingPayment propertyLivingPayment2 : queryPropertyLivingPayment2) {
                propertyLivingPaymentService.deletePropertyLivingPayment(propertyLivingPayment2);
            }
        }
        // 继承物业水电气
        if (!queryPropertyLivingPayment.isEmpty()) {
            for (PropertyLivingPayment propertyLivingPayment2 : queryPropertyLivingPayment) {
                propertyLivingPayment.setEm_id(employee.getEm_id());
                propertyLivingPayment2.setPropertyInfo_Id(queryPropertyInfos.getPropertyInfo_Id());
                bool = propertyLivingPaymentService.insertPropertyLivingPayment(propertyLivingPayment2);
            }
        }

        if (queryPropertyInfoID != null) {
            queryPropertyInfoID.setPropertyInfo_Name("");
            queryPropertyInfoID.setUpn_id(upn_id);
            queryPropertyInfoID.setPropertyInfo_Id(queryPropertyInfos.getPropertyInfo_Id());
            queryPropertyInfoID.setPropertyInfo_department("");
            bool = propertyInfoService.updatePropertyInfo(queryPropertyInfoID);
        }

        if (bool > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 跟进完成提交
     *
     * @param response
     * @param propertyInfo_Id 物业基本信息编码
     * @param account         账号
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/propertySuccess")
    @ResponseBody
    public Map<String, Object> propertySuccess(HttpServletResponse response, Integer propertyInfo_Id, String account) {
        // 跨域传输json
        response.addHeader("Access-Control-Allow-Origin", "*");

        Map<String, Object> map = new HashMap<>();

        Integer bool = 0;
        PropertyInfo propertyInfo = new PropertyInfo();
        propertyInfo.setPropertyInfo_Id(propertyInfo_Id);
        PropertyInfo queryPropertyInfos = propertyInfoService.queryPropertyInfoID(propertyInfo);
        queryPropertyInfos.setPropertyInfo_success(1);
        bool = propertyInfoService.updatePropertyInfo(queryPropertyInfos);

        if (bool > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 查询物业信息是否能修改
     *
     * @param response
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/boolProperty")
    @ResponseBody
    public Map<String, Object> boolProperty(HttpServletResponse response, Integer upn_id) {
        // 跨域传输json
        response.addHeader("Access-Control-Allow-Origin", "*");

        Map<String, Object> map = new HashMap<>();

        PropertyInfo propertyInfo = new PropertyInfo();
        propertyInfo.setUpn_id(upn_id);
        PropertyInfo queryPropertyInfoCount = propertyInfoService.queryPropertyInfoCount(propertyInfo);

        if (queryPropertyInfoCount.getPropertyInfo_success() == 0) {

            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 查询超级父级ID
     *
     * @param response
     * @param upn_id   父子级ID
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/propertySid")
    @ResponseBody
    public Map<String, Object> propertySid(HttpServletResponse response, Integer upn_id) {
        // 跨域传输json
        response.addHeader("Access-Control-Allow-Origin", "*");

        Map<String, Object> map = new HashMap<>();

        PropertyInfoName findPropertyInfoName = propertyInfoNameService.findPropertyInfoNameBySid(upn_id);
        if (findPropertyInfoName == null) {
            map.put("message", "error");
            return map;
        } else {
            map.put("message", "success");
            map.put("sid", findPropertyInfoName.getUpn_sid());
            return map;
        }

    }

    /**
     * Android | 查询小区
     *
     * @param response
     * @param upn_sid  父子级ID
     * @param pageNo
     * @param pageSize
     * @author 陈智颖
     */
    @RequestMapping(value = "/propertyList", produces = "text/plain;charset=UTF-8")
    @ResponseBody
    public String propertyList(HttpServletResponse response, Integer upn_sid, Integer pageNo, Integer pageSize, String where, boolean isPage) {
        response.addHeader("Access-Control-Allow-Origin", "*");
        Msg<Pagination<PropertyInfoName>> msg = new Msg<Pagination<PropertyInfoName>>();

        Pagination<PropertyInfoName> pagination = new Pagination<PropertyInfoName>(pageNo, pageSize);
        PropertyInfoName t = new PropertyInfoName();
        t.setUpn_sid(upn_sid);
        t.setUpn_name(where);
        pagination.setT(t);
        pagination.setPage(isPage);
        pagination.setList(propertyInfoNameService.findPropertyNamePageList(pagination));
        msg.setData(pagination);
        return msg.toString();
    }

    /**
     * 同步以前物业信息
     *
     * @param response
     * @param upn_id   父子级ID
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/propertyxiugai")
    @ResponseBody
    public void propertyxiugai(HttpServletResponse response, Integer upn_id) {

        List<PropertyInfo> selectPropertyInfo = propertyInfoService.selectPropertyInfo();
        for (PropertyInfo propertyInfo : selectPropertyInfo) {
            PropertyInfoName propertyInfoName = new PropertyInfoName();
            propertyInfoName.setUpn_name(propertyInfo.getPropertyInfo_Name());
            propertyInfoName.setUpn_sname(propertyInfo.getPropertyInfo_Name());
            propertyInfoName.setUpn_pid(0);
            propertyInfoName.setUpn_sid(0);
            Company company = new Company();
            company.setUcc_type("IT部");
            propertyInfoNameService.insertPropertyInfo(propertyInfoName);

            propertyInfo.setUpn_id(propertyInfoName.getUpn_id());
            propertyInfoService.updatePropertyInfo(propertyInfo);
        }
    }

    /**
     * 判断是否为空
     *
     * @param object
     * @return
     * @author 陈智颖
     */
    public Boolean isNull(Object object) {
        if (object != null && !object.equals("")) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 查询最高级物业
     *
     * @param request
     * @param response
     * @param param    物业id
     * @return
     * @author 刘强
     */
    @RequestMapping({"/selectpropertyByParent"})
    @ResponseBody
    public Map<String, Object> selectpropertyByParent(HttpServletRequest request, HttpServletResponse response, String param) {
        Map<String, Object> map = new HashMap<>();
        PropertyInfoName propertyInfoName = new PropertyInfoName();
        propertyInfoName.setUpn_name(param);
        List<PropertyInfoName> userCenterPropertyInfoList = propertyInfoNameService.selectpropertyByParent(propertyInfoName);
        if (userCenterPropertyInfoList.size() != 0) {
            map.put("userCenterPropertyInfoList", userCenterPropertyInfoList);
        }
        return map;
    }

    /** =================以前的方法后面会废弃====================== **/

    /**
     * =================以前的方法后面会废弃======================
     **/
    @RequestMapping({"/fuzzySelectPro"})
    @ResponseBody
    public Map<String, Object> fuzzySelectPro(final HttpServletRequest request, final HttpServletResponse response, final String param) {
        final PropertyInfo userCenterPropertyInfo = new PropertyInfo();
        userCenterPropertyInfo.setParam(param);
        final List<PropertyInfo> userCenterPropertyInfoList = (List<PropertyInfo>) this.propertyInfoService.selectUserCenterPropertyInfoByParam(userCenterPropertyInfo);
        final Map<String, Object> map = new HashMap<>();
        if (userCenterPropertyInfoList.size() != 0) {
            map.put("userCenterPropertyInfoList", userCenterPropertyInfoList);
        }
        return map;
    }

    @RequestMapping("/propertyInfoAPP")
    @ResponseBody
    public Map<String, Object> propertyInfoAPP(String name) {
        Map<String, Object> map = new HashMap<>();

        PropertyInfoName propertyInfoName = new PropertyInfoName();
        String whereList = "";
        whereList += " and ( pn.upn_sname like '%" + name + "%' or pn.upn_name like '%" + name + "%')";
        propertyInfoName.setWhereList(whereList);

        List<PropertyInfoName> propertyInfoNamest = new ArrayList<PropertyInfoName>();
        List<PropertyInfoName> propertyInfoNames = propertyInfoService.selectPropertyInfoName(propertyInfoName);
        for (PropertyInfoName propertyInfoName2 : propertyInfoNames) {
            if (propertyInfoNamest.isEmpty()) {
                propertyInfoNamest.add(propertyInfoName2);
            } else {
                boolean bools = true;
                for (PropertyInfoName propertyInfoName3 : propertyInfoNamest) {
                    if (propertyInfoName3.getUpn_id().equals(propertyInfoName2.getUpn_id())) {
                        bools = false;
                        break;
                    }
                }
                for (PropertyInfoName propertyInfoName3 : propertyInfoNamest) {
                    if (propertyInfoName2.getUpn_pid().equals(propertyInfoName3.getUpn_id())) {
                        propertyInfoName2.setUpn_name(propertyInfoName3.getUpn_name() + propertyInfoName2.getUpn_name());
                    }
                }
                if (bools) {
                    propertyInfoNamest.add(propertyInfoName2);
                }
            }
        }
        map.put("propertyInfoNames", propertyInfoNamest);

        return map;
    }

	@RequestMapping({ "/selectvaluation" })
	@ResponseBody
	public Map<String, Object> selectvaluation(final HttpServletRequest request, final HttpServletResponse response, final String id) {
		final Map<String, Object> map = new HashMap<>();
		final HousingValuation housingValuation = new HousingValuation();
		housingValuation.setPropertyInfo_Id(Integer.parseInt(id));
		final List<HousingValuation> housingValuationList = (List<HousingValuation>) this.propertyInfoService.selectvaluation(housingValuation);
		map.put("housingValuationList", housingValuationList);
		return map;
	}

	/**********APP物业**********/
	@RequestMapping("/propertyInfoAPPPage")
	public String propertyInfoAPPPage(String name){
		return "/appPage/intentionPropertyInfoSelect";
	}

	/**
	 * 物业递归查询
	 *
	 * @param whereDo
	 * @return
	 * @author 陈智颖
	 * @date Mar 31, 2017 9:55:01 AM
	 */
	public Map<String, Object> propertyInfo(String whereDo, Integer index){
		Map<String, Object> map = new HashMap<>();
		if(index == 1){
			whereOne = whereDo;
		}
		String[] whereDos = whereDo.split(" ");
		String where = "";
		for (int i = 0; i < whereDos.length; i++) {
			where += " and ( pn.upn_sname like '%"+ whereDos[i] +"%' or pn.upn_name like '%"+ whereDos[i] +"%')";
		}
		PropertyInfoName propertyInfoName = new PropertyInfoName();
		propertyInfoName.setWhereList(where);
		List<PropertyInfoName> propertyInfoNames = propertyInfoService.selectPropertyInfoName(propertyInfoName);
		boolean bool = true;
		if(propertyInfoNames.isEmpty()){
			String wheret = "";
			String wherez = "";
			for (int i = 0; i < whereDos.length; i++) {
				if(whereDos.length > 1 && (i == whereDos.length - 1)){
					if(whereDos[i].length() < 2){
						map.put("whereD", whereOne);
						map.put("where", where);
						bool = false;
						break;
					}
					wheret += " " + whereDos[i].substring(0, whereDos[i].length()-1);
					wherez = whereDos[i].substring(whereDos[i].length()-1, whereDos[i].length());
				}else if(whereDos.length == 1 && (i == whereDos.length - 1)){
					wheret += whereDos[i].substring(0, whereDos[i].length()-1) + " " + whereDos[i].substring(whereDos[i].length()-1, whereDos[i].length());
				}else if(i == whereDos.length){
					wheret += " " + wherez + whereDos[i];
				}else{
					wheret += whereDos[i] + " ";
				}
			}
			if(bool){
				whereDo = wheret;
				index ++;
				map = propertyInfo(wheret,index);
			}
		}else{
			map.put("where", where);
			map.put("whereD", whereDo);
		}
		return map;
	}

    /**
     * 初始化小区到支付宝
     * @return
     */
    @RequestMapping("/initProperInfoToAli")
    @ResponseBody
    public Map<String, Object> initProperInfoToAli(){
        Map<String, Object> map = new HashMap<>();
        try {
            propertyInfoService.initProperInfoToAli();
            map.put("code", 200);
        } catch (AlipayApiException e) {
            e.printStackTrace();
            map.put("code", 400);
            map.put("msg", e.getErrMsg());
        }
        return map;
    }



									/*****************新版小区管理**************************/
	/**
	 *查询物业父级
	 * @author tanglei
	 * @return
	 */
	@RequestMapping("/selectupnSid")
	@ResponseBody
	public Map<String, Object> selectupnSid (PropertyInfoName propertyInfoName) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<PropertyInfoName> lists = propertyInfoNameService.selectsid(propertyInfoName);
		if (propertyInfoName.getUpn_id() != null) {
			PropertyInfoName propertyInfo=propertyInfoNameService.findPropertyInfoNameBySid(propertyInfoName.getUpn_id());
			map.put("propertyInfo", propertyInfo);
		}
		map.put("lists", lists);
		return map;
	}

	/**
	 * 模糊查询
	 * @author tanglei
	 */
	@RequestMapping("/selectProperInfoName")
	@ResponseBody
	public Map<String, Object> selectProperInfoName(HttpServletRequest request,PropertyInfoName propertyInfoName) {
		Map<String, Object> map = new HashMap<String, Object>();
		// 当没有填写
		List<PropertyInfoName> pInfoNames=null;
		if (propertyInfoName.getUpn_name() != null && propertyInfoName.getUpn_name() != "") {
			pInfoNames = propertyInfoNameService.selectPropertyInfoNameALLwuye(propertyInfoName);
			map.put("pInfoNames",pInfoNames);
		} else {
			PropertyInfoName p = new PropertyInfoName();
			p.setUpn_pid(0);
			List<PropertyInfoName> lists = propertyInfoNameService.selectsid(p);
			map.put("pInfoNames", lists);
		}
		return map;
	}

	/**
	 * 小区下级
	 * @author tanglei
	 * @Date 2017-11-2 11:42
	 */
	@RequestMapping("/queryPropertyInfoLists")
	@ResponseBody
	public Map<String,Object> queryPropertyInfoLists (PropertyInfoName propertyInfoName) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<PropertyInfoName> lists = propertyInfoNameService.queryPropertyInfoLists(propertyInfoName);
		if (propertyInfoName.getUpn_id() != null) {
			PropertyInfoName propertyInfo=propertyInfoNameService.findPropertyInfoNameBySid(propertyInfoName.getUpn_id());
			map.put("propertyInfo", propertyInfo);
		}
		map.put("lists", lists);
		return map;
	}

	/**
	 * 小区基本信息
	 * @author tanglei
	 * @Date 2017-10-17 9:42
	 */
	@RequestMapping(method = RequestMethod.POST,value="/selectProperInfo")
	@ResponseBody
    @VerifyCSRFToken
	public Map<String,Object> selectProperInfo (PropertyInfoName propertyInfoName) {
		Map<String, Object> map = new HashMap<String, Object>();
		PropertyInfoName pi = propertyInfoNameService.selectProperInfo(propertyInfoName);
		map.put("propertyInfo",pi);
		PropertyInfoName proper=new PropertyInfoName();
		if (pi != null) {
			if (pi.getUpn_sid() == 0) {
				proper.setUpn_id(pi.getUpn_id());
			} else {
				proper.setUpn_id(pi.getUpn_sid());
			}
			PropertyInfoName pro = propertyInfoNameService.selectProperInfo(proper);
			map.put("pro",pro);
		}
		// 查询重庆区县
		AreaCityStreet city=new AreaCityStreet();
		city.setParent_id(5001);
		List<AreaCityStreet> district=areaCityService.queryAreaCity(city);
		map.put("district",district);
		// 查询所有部门
		List<Company> companies = userCenterEmployeeService.selectAllCompany();
		List<Company> com=new ArrayList<>();
		for (Company company : companies) {
			if (company.getUcc_pid() == 43 || company.getUcc_pid() == 44) {
				com.add(company);
			}
		}
		map.put("companies", com);
		//查询区域
		if (!StringUtils.isEmpty(pi)) {
			PropertyInfoType properType=new PropertyInfoType();
			properType.setArea_name(pi.getPropertyInfo_quyu());
			PropertyInfoType pro=propertyInfoNameService.selectPrtperType(properType);
			if (!StringUtils.isEmpty(pro)) {
				PropertyInfoType prop=new PropertyInfoType();
				prop.setArea_pid(pro.getArea_id());
				List<PropertyInfoType> list=propertyInfoNameService.selectProperTyInfoType(prop);
				map.put("properType",list);
			}
		}
		//查询轨道
		PropertyInfoTrack propertyInfoTrack=new PropertyInfoTrack();
		List<PropertyInfoTrack> list=propertyInfoNameService.selectProperInfoTrack(propertyInfoTrack);
		map.put("properTract",list);
		return map;
	}

	/**
	 * 添加小区
	 * @param propertyInfoName 物业实体
	 * @param company 公司实体
	 * @param select_d 是否是栋，幢
	 * @param buildDong  栋数
	 * @param unitsText 单元数
	 * @author tanglei
	 */
	@RequestMapping("/addproperty")
	@ResponseBody
	public Map<String, Object> addpropertyInfoziji2(PropertyInfoName propertyInfoName, Company company) {
		Map<String, Object> map = new HashMap<String, Object>();
		UserCenterEmployee employee = AppUtil.getCookieEmployee();
		if (employee == null){
			map.put("error","身份验证过期，请重新登录");
			return map;
		}
        propertyInfoName.setEm_id(employee.getEm_id());
		//添加小区  最高父级
		if (propertyInfoName.getUpn_id() == null) {
			PropertyInfoName proper=new PropertyInfoName();
			proper.setUpn_name(propertyInfoName.getUpn_name());
			proper=propertyInfoNameService.selectPropertyInfoPid(proper);
			if (proper != null) {
				map.put("error","小区名称已有，不能重复添加");
				return map;
			}
			PropertyInfoName property=new PropertyInfoName();
			property.setUpn_name(propertyInfoName.getUpn_name());
			property.setUpn_sname(propertyInfoName.getUpn_name());
			property.setUpn_pid(0);
			property.setUpn_sid(0);
			property.setUpn_state(AppConfig.UPN_STATE_0);
			property.setPropertyInfo_address(propertyInfoName.getPropertyInfo_address());
			property.setPropertyInfo_coordinate(propertyInfoName.getPropertyInfo_coordinate());
			property.setPropertyInfo_quyu(propertyInfoName.getPropertyInfo_quyu());
			property.setPropertyInfo_street(propertyInfoName.getPropertyInfo_street());
			property.setPropertyInfo_gui(propertyInfoName.getPropertyInfo_gui());
			property.setPropertyInfo_transit(propertyInfoName.getPropertyInfo_transit());
			property.setPropertyInfo_source(propertyInfoName.getPropertyInfo_source());
			property.setUpn_department(propertyInfoName.getUpn_department());
			property.setEm_id(propertyInfoName.getEm_id());
			int addresult = propertyInfoNameService.addpropertyInfo(property, company);
			map.put("addresult", addresult);
		} else {
			int addresult = propertyInfoNameService.updatepropertyInfoName(propertyInfoName, company);
			map.put("addresult", addresult);
		}
		// 刚才添加的数据
		map.put("propertyInfoName", propertyInfoName);
		map.put("company",company);
		return map;
	}

	/**
	 * 查看物业
	 * @param response
	 * @param upn_id 父子级ID
	 * @author 陈智颖
	 */
	@RequestMapping("/propertySelect")
	@ResponseBody
	public Map<String, Object> propertySelect(HttpServletResponse response, Integer upn_id) {
		// 跨域传输json
		response.addHeader("Access-Control-Allow-Origin", "*");

		Map<String, Object> map = new HashMap<>();

		PropertyInfo propertyInfo = new PropertyInfo();
		propertyInfo.setUpn_id(upn_id);
		PropertyInfo queryPropertyInfoCount = propertyInfoService.queryPropertyInfoCount(propertyInfo);
		PropertyInfo queryPropertyInfo = propertyInfoService.queryPropertyInfoID(queryPropertyInfoCount);
		if (queryPropertyInfo == null) {
			map.put("message", "error");
			return map;
		}
		map.put("queryPropertyInfo", queryPropertyInfo);

		//根据条件查询物业水电气
		PropertyLivingPayment propertyLivingPayment = new PropertyLivingPayment();
		propertyLivingPayment.setPropertyInfo_Id(queryPropertyInfo.getPropertyInfo_Id());
		List<PropertyLivingPayment> queryPropertyLivingPayment = propertyLivingPaymentService.queryPropertyLivingPayment(propertyLivingPayment);
		if (!queryPropertyLivingPayment.isEmpty()) {
			map.put("queryPropertyLivingPayment", queryPropertyLivingPayment);
		}
		//查询周边
		PropertyInfoSubwany propertyInfoSubwany = new PropertyInfoSubwany();
		propertyInfoSubwany.setPropertyInfo_Id(queryPropertyInfo.getPropertyInfo_Id());
		List<PropertyInfoSubwany> propertyInfoSubwanys = propertyInfoService.selectPropertyInfoSubwany(propertyInfoSubwany);
		map.put("propertyInfoSubwanys", propertyInfoSubwanys);

		//查询宽带
		PropertyInfoConfigType configType=new PropertyInfoConfigType();
		configType.setCon_pid(1);
		List<PropertyInfoConfigType> configTypelist=propertyInfoNameService.selectproperInfoIntenter(configType);
		map.put("configTypelist",configTypelist);
		return map;
	}

	/**
	 * 查询水电气
	 * @author tanglei
	 * @Date 2017-10-24
	 */
	@RequestMapping("/warterPowerGas")
	@ResponseBody
	public Map<String,Object> warterPowerGas (HttpServletResponse res,Integer upn_id) {
		Map<String, Object> map = new HashMap<String, Object>();
		PropertyInfo propertyInfo = new PropertyInfo();
		propertyInfo.setUpn_id(upn_id);
		PropertyInfo queryPropertyInfoCount = propertyInfoService.queryPropertyInfoCount(propertyInfo);
		PropertyInfo queryPropertyInfo = propertyInfoService.queryPropertyInfoID(queryPropertyInfoCount);
		if (queryPropertyInfo == null) {
			map.put("message", "error");
			return map;
		}
		PropertyLivingPayment propertyLivingPayment = new PropertyLivingPayment();
		propertyLivingPayment.setPropertyInfo_Id(queryPropertyInfo.getPropertyInfo_Id());
		List<PropertyLivingPayment> queryPropertyLivingPayment = propertyLivingPaymentService.queryPropertyLivingPayment(propertyLivingPayment);
		if (!queryPropertyLivingPayment.isEmpty()) {
			map.put("queryPropertyLivingPayment", queryPropertyLivingPayment);
		}
		return map;
	}

	/**
	 * 查询小区及子级
	 */
	@RequestMapping("/queryProperInfo")
	@ResponseBody
	public Map<String,Object> queryProperInfo (PropertyInfoName propertyInfoName) {
		Map<String, Object> map = new HashMap<String, Object>();
		PropertyInfoName pi = propertyInfoNameService.selectProperInfo(propertyInfoName);
		map.put("propertyInfo",pi);
		PropertyInfoName propertyInfo=new PropertyInfoName();
		propertyInfo.setUpn_sid(propertyInfoName.getUpn_id());
		List<PropertyInfoName> list=propertyInfoNameService.queryproperInfo(propertyInfo);
		map.put("properList",list);
		return map;
	}

	/**
	 * 添加栋单元
	 */
	@RequestMapping("/addDongUntiss")
	@ResponseBody
	public Map<String,Object>  addDongUntiss (PropertyInfoName propertyInfoName) {
		Map<String, Object> map = new HashMap<String, Object>();
		//父级之前的数据
		PropertyInfoName beforeProperInfy = propertyInfoNameService.findPropertyInfoNameBySid(propertyInfoName.getUpn_id());
		//父级添加栋单元
		int addpropertyInfoziji = propertyInfoNameService.updatepropertyInfoNamejiegou(propertyInfoName);
		//现在父级数据
		PropertyInfoName pi = propertyInfoNameService.findPropertyInfoNameBySid(propertyInfoName.getUpn_id());
		int addDong = propertyInfoNameService.addDongUntiss(beforeProperInfy,pi);
		map.put("addDong",addDong);
		return map;
	}

	/**
	 * 添加单元
	 */
	@RequestMapping("/adduntiss")
	@ResponseBody
	public Map<String,Object> adduntiss (PropertyInfoName propertyInfoName,String untiss,String dong,Integer parentId) {
		Map<String, Object> map = new HashMap<String, Object>();
		int addpropertyInfoziji=0;
		//最高父级数据
		PropertyInfoName pi = propertyInfoNameService.findPropertyInfoNameBySid(propertyInfoName.getUpn_id());
		PropertyInfoName pro = new PropertyInfoName();
		pro.setUpn_id(propertyInfoName.getUpn_id());
		//小区基本信息
		PropertyInfo p = propertyInfoService.selectcompanyByPiId(pro);
		//小区周边信息
		PropertyInfoSubwany propertyInfoSubwany = new PropertyInfoSubwany();
		propertyInfoSubwany.setPropertyInfo_Id(p.getPropertyInfo_Id());
		List<PropertyInfoSubwany> propertyInfoSubwanys =propertyInfoService .selectPropertyInfoSubwany(propertyInfoSubwany);
		if (parentId >0) {
			//父级数据
			PropertyInfoName proper = propertyInfoNameService.findPropertyInfoNameBySid(parentId);
			//添加单元
			if (!StringUtils.isEmpty(untiss) && dong == null) {
				PropertyInfoName prope=new PropertyInfoName();
				prope.setUpn_pid(proper.getUpn_id());
				prope.setUpn_name(untiss+"单元");
				//查询是否有单元
				prope=propertyInfoNameService.selectPropertyInfoPid(prope);
				if (prope != null) {
					map.put("error","已添加单元，不能重复添加");
					return map;
				}
				PropertyInfoName propertyInfo=new PropertyInfoName();
				propertyInfo.setUpn_name(untiss+"单元");
				propertyInfo.setUpn_pid(proper.getUpn_id());
				propertyInfo.setUpn_code(proper.getUpn_code()+"-"+untiss);
				propertyInfo.setUpn_sid(pi.getUpn_id());
				propertyInfo.setUpn_sname(pi.getUpn_name());
				propertyInfo.setUpn_state(AppConfig.UPN_STATE_0);
				addpropertyInfoziji = propertyInfoNameService.addpropertyInfo1(propertyInfo,p,propertyInfoSubwanys);
			}
		}
		if (!StringUtils.isEmpty(dong)) {
			PropertyInfoName prope=new PropertyInfoName();
			prope.setUpn_pid(pi.getUpn_id());
			prope.setUpn_name(dong+"栋");
			//查询是否有栋
			prope=propertyInfoNameService.selectPropertyInfoPid(prope);
			if (prope != null) {
				map.put("error","已添加栋，不能重复添加");
				return map;
			}
			PropertyInfoName propertyInfo=new PropertyInfoName();
			propertyInfo.setUpn_name(dong+"栋");
			propertyInfo.setUpn_pid(pi.getUpn_id());
			propertyInfo.setUpn_code(dong);
			propertyInfo.setUpn_sid(pi.getUpn_id());
			propertyInfo.setUpn_sname(pi.getUpn_name());
			propertyInfo.setUpn_state(AppConfig.UPN_STATE_0);
			addpropertyInfoziji = propertyInfoNameService.addpropertyInfo1(propertyInfo,p,propertyInfoSubwanys);
		}
		map.put("addpropertyInfoziji",addpropertyInfoziji);
		return map;
	}

	/**
	 * 根据区县查询区域
	 */
	@RequestMapping("/selectProperTyInfoType")
	@ResponseBody
	public Map<String,Object> selectProperTyInfoType (PropertyInfoType properType) {
		Map<String, Object> map = new HashMap<String, Object>();
		PropertyInfoType pro=propertyInfoNameService.selectPrtperType(properType);
		if (!StringUtils.isEmpty(pro)) {
			PropertyInfoType prop=new PropertyInfoType();
			prop.setArea_pid(pro.getArea_id());
			List<PropertyInfoType> list=propertyInfoNameService.selectProperTyInfoType(prop);
			map.put("properType",list);
		}
		return map;
	}

	/**
	 * 查询轨道站台
	 */
	@RequestMapping("/selectProperInfoTrack")
	@ResponseBody
	public Map<String,Object> selectProperInfoTrack (PropertyInfoTrack propertyInfoTrack) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<PropertyInfoTrack> list=propertyInfoNameService.selectProperInfoTrack(propertyInfoTrack);
		map.put("properTract",list);
		return map;
	}

    /**
     * 添加区域标签
     * @author tanglei
     */
    @RequestMapping("/addArea")
    @ResponseBody
    public Map<String,Object> addArea (PropertyInfoType properType) {
        int bool=1;
        Map<String, Object> msg = new HashMap<>();
        PropertyInfoType type=new PropertyInfoType();
        type.setArea_name(properType.getArea_sname());
        PropertyInfoType pro=propertyInfoNameService.selectPrtperType(type);
        if (!StringUtils.isEmpty(pro)) {
            properType.setArea_pid(pro.getArea_id());
            bool=propertyInfoNameService.addArea(properType);
        } else {
            PropertyInfoType t=new PropertyInfoType();
            t.setArea_name(properType.getArea_sname());
            t.setArea_pid(0);
            bool=propertyInfoNameService.addArea(t);
            PropertyInfoType p=propertyInfoNameService.selectPrtperType(type);
            if (!StringUtils.isEmpty(p)) {
                PropertyInfoType prop=new PropertyInfoType();
                prop.setArea_name(properType.getArea_name());
                prop.setArea_pid(p.getArea_id());
                prop.setArea_sname(p.getArea_name());
                bool=propertyInfoNameService.addArea(prop);
            }
        }
        if (bool >0) {
            msg.put("cood",200);
        } else {
            msg.put("cood",401);
        }
        return msg;
    }

    /**
     * 编辑区域
     * @author tanglei
     */
    @RequestMapping("/updateArea")
    @ResponseBody
    public Map<String,Object> updateArea (String area) {
        int bool=1;
        Map<String, Object> msg = new HashMap<>();
        String[] areaList=area.split("_");
        for (int i=0;i<areaList.length;i++) {
            String[] list=areaList[i].split("-");
            PropertyInfoType type=new PropertyInfoType();
            type.setArea_id(Integer.valueOf(list[0]));
            type.setArea_name(list[1]);
            bool=propertyInfoNameService.updateArea(type);
        }
        if (bool >0) {
            msg.put("cood",200);
        } else {
            msg.put("cood",401);
        }
        return msg;
    }

}
