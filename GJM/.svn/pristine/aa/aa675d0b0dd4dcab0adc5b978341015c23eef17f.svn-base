package com.gjp.service;

import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.gjp.dao.PropertyInfoDAO;
import com.gjp.dao.PropertyInfoNameDAO;
import com.gjp.model.*;
import com.gjp.util.AliRenthouseUtil;
import com.gjp.util.AppConfig;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.*;

/**
 * @author 陈智颖
 */
@Service
public class PropertyInfoNameService {

    @Resource
    private PropertyInfoNameDAO propertyInfoNameDao;

    @Resource
    private PropertyInfoDAO propertyInfoDao;
    @Resource
    private PropertyInfoService propertyInfoService;

    public List<PropertyInfoName> selectwuyebiao() {
        return propertyInfoNameDao.selectwuyebiao();
    }

    /**
     * 查询所有父子级表
     *
     * @return
     * @author 陈智颖
     */
    public List<PropertyInfoName> selectPropertyInfoNameALL() {
        return propertyInfoNameDao.selectPropertyInfoNameALL();
    }

    /**
     * 添加物业（同级 ，子级）
     *
     * @param company
     * @return 受影响行数
     * @author 刘强
     */
    public int addpropertyInfo(PropertyInfoName propertyInfoName, Company company) {
        // 转换为大写
        String reg = "[a-zA-Z]";
        if (propertyInfoName.getUpn_code() != null) {
            if (propertyInfoName.getUpn_code().matches(reg)) {
                propertyInfoName.setUpn_code(propertyInfoName.getUpn_code().toUpperCase());
            }
        } else {
            propertyInfoName.setUpn_code("");
        }

//        this.rentHouse(propertyInfoName);
        int addpropertyInfoziji = propertyInfoNameDao.addpropertyInfoziji(propertyInfoName);
        // 物业基础信息
        PropertyInfo propertyInfo = new PropertyInfo();
        propertyInfo.setPropertyInfo_department(company.getUcc_short());
        propertyInfo.setUpn_id(propertyInfoName.getUpn_id());
        if (propertyInfoName.getUpn_code() != null && propertyInfoName.getUpn_code() != "") {
            propertyInfo.setPropertyInfo_Name(propertyInfoName.getUpn_sname() + "-" + propertyInfoName.getUpn_code());
        } else {
            propertyInfo.setPropertyInfo_Name(propertyInfoName.getUpn_sname());
        }
        propertyInfo.setPropertyInfo_success(0);
        propertyInfo.setPropertyInfo_stage(0);
        propertyInfo.setPropertyInfo_address(propertyInfoName.getPropertyInfo_address());
        propertyInfo.setPropertyInfo_quyu(propertyInfoName.getPropertyInfo_quyu());
        propertyInfo.setPropertyInfo_street(propertyInfoName.getPropertyInfo_street());
        propertyInfo.setPropertyInfo_coordinate(propertyInfoName.getPropertyInfo_coordinate());
        propertyInfo.setPropertyInfo_gui(propertyInfoName.getPropertyInfo_gui());
        propertyInfo.setPropertyInfo_transit(propertyInfoName.getPropertyInfo_transit());
        propertyInfo.setPropertyInfo_source(propertyInfoName.getPropertyInfo_source());
        Integer insertPropertyInfo = propertyInfoDao.insertPropertyInfo(propertyInfo);

        if (addpropertyInfoziji != 0 && insertPropertyInfo != 0) {
            addpropertyInfoziji = 1;
        } else {
            addpropertyInfoziji = 0;
        }
        return addpropertyInfoziji;
    }

    /**
     * 插入合同信息
     *
     * @param propertyInfoName
     * @param company
     * @return
     * @author 陈智颖
     */
    public int insertPropertyInfo(PropertyInfoName propertyInfoName) {
        return propertyInfoNameDao.addpropertyInfoziji(propertyInfoName);
    }

    /**
     * 查询所有物业
     *
     * @return 所有物业
     * @author 刘强
     * @param company
     */
    /**
     * 根据条件物业父子级
     *
     * @param propertyInfoName
     * @return
     * @author 陈智颖
     */
    public List<PropertyInfoName> selectPropertyInfoNameWhere(PropertyInfoName propertyInfoName) {
        return propertyInfoNameDao.selectPropertyInfoNameWhere(propertyInfoName);
    }

    public List<PropertyInfoName> selectPropertyInfoNameALLwuye(PropertyInfoName p) {
        return propertyInfoNameDao.selectPropertyInfoNameALLwuye(p);
    }

    /**
     * 查询所有物业
     *
     * @param company
     * @return 父级物业
     * @author 刘强
     */
    public List<PropertyInfoName> findPropertyInfoNameById(Integer upn_num) {
        return propertyInfoNameDao.findPropertyInfoNameById(upn_num);
    }

    /**
     * 查询当前物业
     *
     * @param company
     * @return 当前物业
     * @author 刘强
     */
    public PropertyInfoName findPropertyInfoNameBySid(Integer upn_id) {
        return propertyInfoNameDao.findPropertyInfoNameBySid(upn_id);
    }

    /**
     * 查询sid
     *
     * @param company
     * @return sid为当前id的集合
     * @author 刘强
     */
    public List<PropertyInfoName> findpropertyInfoBySuperId(Integer integer) {
        return propertyInfoNameDao.findpropertyInfoBySuperId(integer);
    }

    /**
     * 根据物业编码查询物业父子级数据
     *
     * @param propertyInfo_Id 物业信息编码
     * @return
     * @author 陈智颖
     */
    public PropertyInfoName findpropertyInfoToSuperId(Integer propertyInfo_Id) {
        return propertyInfoNameDao.findpropertyInfoToSuperId(propertyInfo_Id);
    }

    public List<PropertyInfoName> selectsid(PropertyInfoName p) {
        return propertyInfoNameDao.selectsid(p);
    }

    /**
     * 修改物业信息
     *
     * @param propertyInfoName
     * @param company
     * @return 是否修改成功
     * @author liuqiang
     */
    public int updatepropertyInfoName(PropertyInfoName propertyInfoName, Company company) {
        Integer bool = 0;
        //修改物业基础表
        PropertyInfo propertyInfo = new PropertyInfo();
        propertyInfo.setUpn_id(propertyInfoName.getUpn_id());
        propertyInfo.setPropertyInfo_department(company.getUcc_short());
        propertyInfo.setPropertyInfo_Name(propertyInfoName.getUpn_name());
        propertyInfo.setPropertyInfo_quyu(propertyInfoName.getPropertyInfo_quyu());
        propertyInfo.setPropertyInfo_address(propertyInfoName.getPropertyInfo_address());
        propertyInfo.setPropertyInfo_street(propertyInfoName.getPropertyInfo_street());
        propertyInfo.setPropertyInfo_coordinate(propertyInfoName.getPropertyInfo_coordinate());
        propertyInfo.setPropertyInfo_gui(propertyInfoName.getPropertyInfo_gui());
        propertyInfo.setPropertyInfo_transit(propertyInfoName.getPropertyInfo_transit());
        propertyInfo.setPropertyInfo_source(propertyInfoName.getPropertyInfo_source());
        bool=propertyInfoDao.updatePropertyInfo2(propertyInfo);

        //查询最高级的小区信息
        PropertyInfoName pi = propertyInfoNameDao.findPropertyInfoNameBySid(propertyInfoName.getUpn_id());
        List<PropertyInfoName> findpropertyInfoBySuperId = new ArrayList<PropertyInfoName>();
        if (pi.getUpn_sid() == 0) {
            pi.setUpn_name(propertyInfoName.getUpn_name());
            pi.setUpn_time(new Date());
            pi.setUpn_sname(propertyInfoName.getUpn_name());
            pi.setUpn_department(propertyInfoName.getUpn_department());
            int addresult = this.updatepropertyInfoNamejiegou(pi);
            PropertyInfoName pro=new PropertyInfoName();
            pro.setUpn_sid(pi.getUpn_id());
            //查询最高父级下面的子级
            findpropertyInfoBySuperId = propertyInfoNameDao.selectsid(pro);
        }
        //更改子集下面的基本信息
        for (PropertyInfoName pro : findpropertyInfoBySuperId) {
            PropertyInfo proper=new PropertyInfo();
            proper.setPropertyInfo_Id(pro.getPropertyInfo_Id());
            if (pro.getUpn_code() != null && pro.getUpn_code() != "") {
                proper.setPropertyInfo_Name(propertyInfoName.getUpn_name() + "-" + pro.getUpn_code());
            } else {
                proper.setPropertyInfo_Name(propertyInfoName.getUpn_name());
            }
            proper.setPropertyInfo_quyu(propertyInfoName.getPropertyInfo_quyu());
            proper.setPropertyInfo_street(propertyInfoName.getPropertyInfo_street());
            proper.setPropertyInfo_department(company.getUcc_short());
            proper.setPropertyInfo_address(propertyInfoName.getPropertyInfo_address());
            proper.setPropertyInfo_coordinate(propertyInfoName.getPropertyInfo_coordinate());
            proper.setPropertyInfo_gui(propertyInfoName.getPropertyInfo_gui());
            proper.setPropertyInfo_transit(propertyInfoName.getPropertyInfo_transit());
            proper.setPropertyInfo_source(propertyInfoName.getPropertyInfo_source());
            bool=propertyInfoDao.updatePropertyInfo2(proper);
            //修改子集下面的物业信息
            PropertyInfoName p=new PropertyInfoName();
            p.setUpn_id(pro.getUpn_id());
            p.setUpn_sname(propertyInfoName.getUpn_name());
            p.setUpn_department(propertyInfoName.getUpn_department());
            p.setEm_id(propertyInfoName.getEm_id());
            int addresult = this.updatepropertyInfoNamejiegou(p);
        }
        return bool;
    }

    public Map<String, Object> updatepropertyInfo(PropertyInfoName propertyInfoName, Company company, String buildDong, String unitsText) {
        Map<String, Object> map = new HashMap<String, Object>();
        PropertyInfoName pi = this.findPropertyInfoNameBySid(propertyInfoName.getUpn_id());
        if (buildDong == "" && unitsText == "") {
            propertyInfoName.setUpn_sname(propertyInfoName.getUpn_name());
            propertyInfoName.setUpn_pid(0);
            propertyInfoName.setUpn_sid(0);
            int addresult = this.updatepropertyInfoNamejiegou(propertyInfoName);
            map.put("addresult", addresult);
        } else if (buildDong != "") {
            if (unitsText == "") {
                //查找之前的栋
                PropertyInfoName pro = this.findPropertyInfoNameBySid(propertyInfoName.getUpn_id());
                if (!pro.getUpn_code().equals(buildDong)) {
                    PropertyInfoName p = new PropertyInfoName();
                    p.setUpn_pid(pro.getUpn_id());
                    //查找栋下面的单元并修改
                    List<PropertyInfoName> properInfo = this.queryproperInfo(p);
                    for (PropertyInfoName proper : properInfo) {
                        String[] s = proper.getUpn_code().split("-");
                        proper.setUpn_code(buildDong + "-" + s[1]);
                        int addresul = this.updatepropertyInfoNamejiegou(proper);
                        map.put("addresult", addresul);
                        PropertyInfo propertyInfo = new PropertyInfo();
                        propertyInfo.setUpn_id(proper.getUpn_id());
                        propertyInfo.setPropertyInfo_Name(proper.getUpn_sname() + "-" + proper.getUpn_code());
                        propertyInfoDao.updatePropertyInfo2(propertyInfo);
                    }
                }
                //修改栋
                propertyInfoName.setUpn_name(buildDong + "栋");
                propertyInfoName.setUpn_pid(pi.getUpn_pid());
                propertyInfoName.setUpn_code(buildDong);
                propertyInfoName.setUpn_sid(pi.getUpn_pid());
                propertyInfoName.setUpn_sname(pi.getUpn_sname());
                int addresult = this.updatepropertyInfoNamejiegou(propertyInfoName);
                map.put("addresult", addresult);
            } else {
                PropertyInfoName propertyInfo = new PropertyInfoName();
                propertyInfo.setUpn_sid(pi.getUpn_sid());
                propertyInfo.setUpn_name(buildDong + "栋");
                //根据现在栋查询栋判断是否有添加
                propertyInfo = this.selectPropertyInfoPid(propertyInfo);
                if (propertyInfo == null) {
                    //查找之前的栋
                    propertyInfo = this.findPropertyInfoNameBySid(propertyInfoName.getUpn_id());
                    propertyInfo.setUpn_name(buildDong + "栋");
                    propertyInfo.setUpn_code(buildDong);
                    propertyInfoName.setUpn_sid(propertyInfo.getUpn_sid());
                    propertyInfoName.setUpn_sname(propertyInfo.getUpn_sname());
                    int addresult = this.updatepropertyInfoNamejiegou(propertyInfo);
                    map.put("addresult", addresult);
                }
                propertyInfoName.setUpn_pid(propertyInfo.getUpn_id());
                propertyInfoName.setUpn_name(unitsText + "单元");
                propertyInfoName.setUpn_code(buildDong + "-" + unitsText);
                propertyInfoName.setUpn_sid(propertyInfo.getUpn_sid());
                propertyInfoName.setUpn_sname(propertyInfo.getUpn_sname());
                int addresult = this.updatepropertyInfoNamejiegou(propertyInfoName);
                map.put("addresult", addresult);
            }
        } else if (buildDong == "" && unitsText != "") {
            propertyInfoName.setUpn_pid(pi.getUpn_sid());
            propertyInfoName.setUpn_name(unitsText + "单元");
            propertyInfoName.setUpn_code(unitsText);
            propertyInfoName.setUpn_sid(pi.getUpn_sid());
            propertyInfoName.setUpn_sname(pi.getUpn_sname());
            int addresult = this.updatepropertyInfoNamejiegou(propertyInfoName);
            map.put("addresult", addresult);
        }
        //修改物业基础表
        PropertyInfo propertyInfo = new PropertyInfo();
        propertyInfo.setUpn_id(propertyInfoName.getUpn_id());
        propertyInfo.setPropertyInfo_department(company.getUcc_short());
        if (buildDong == "" && unitsText == "") {
            propertyInfo.setPropertyInfo_Name(propertyInfoName.getUpn_name());
        }
        if (buildDong != "") {
            propertyInfo.setPropertyInfo_Name(propertyInfoName.getUpn_sname() + "-" + buildDong);
        }
        if (unitsText != "") {
            propertyInfo.setPropertyInfo_Name(propertyInfoName.getUpn_sname() + buildDong + "-" + unitsText);
        }
        propertyInfo.setPropertyInfo_quyu(propertyInfoName.getPropertyInfo_quyu());
        propertyInfo.setPropertyInfo_street(propertyInfoName.getPropertyInfo_street());
        propertyInfo.setPropertyInfo_address(propertyInfoName.getPropertyInfo_address());
        propertyInfo.setPropertyInfo_coordinate(propertyInfoName.getPropertyInfo_coordinate());
        propertyInfoDao.updatePropertyInfo2(propertyInfo);
        return map;
    }

    /**
     * 修改物业结构
     *
     * @param p1 需要修改的物业
     * @return 是否修改成功
     * @author liuqiang
     */
    public int updatepropertyInfoNamejiegou(PropertyInfoName p1) {
        return propertyInfoNameDao.updatepropertyInfoNamejiegou(p1);
    }

    /**
     * 查询物业bysid
     *
     * @return List<PropertyInfoName>
     * @author liuqiang
     */
    public List<PropertyInfoName> selectpropertyInfoSid() {
        return propertyInfoNameDao.selectpropertyInfoSid();
    }

    /**
     * 查询物业不是bysid
     *
     * @return List<PropertyInfoName>
     * @author liuqiang
     */
    public List<PropertyInfoName> selectpropertyInfoSidNot() {
        return propertyInfoNameDao.selectpropertyInfoSidNot();
    }

    /**
     * 查询物业bysname
     *
     * @return List<PropertyInfoName>
     * @author liuqiang
     */
    public List<PropertyInfoName> selectpropertyInfoBySname(PropertyInfoName propertyInfoName) {
        return propertyInfoNameDao.selectpropertyInfoBySname(propertyInfoName);
    }

    public List<PropertyInfoName> selectpropertyByParent(PropertyInfoName propertyInfoName) {
        return propertyInfoNameDao.selectpropertyByParent(propertyInfoName);
    }

    public List<PropertyInfoName> findPropertyNamePageList(Pagination<PropertyInfoName> pagination) {
        return propertyInfoNameDao.findPropertyNamePageList(pagination);
    }

    /**
     * 物业信息关联查询
     *
     * @author tanglei
     */
    public PropertyInfoName selectProperInfo(PropertyInfoName propertyInfoName) {
        return propertyInfoDao.selectProperInfo(propertyInfoName);
    }

    /**
     * 添加栋单元
     */
    public int addDongUntiss (PropertyInfoName beforeProperInfy,PropertyInfoName propertyInfoName) {
        int addDong = 1;
        PropertyInfoName pro = new PropertyInfoName();
        pro.setUpn_id(propertyInfoName.getUpn_id());
        //最高父级小区的基本信息
        PropertyInfo propertyInfo = propertyInfoDao.selectcompanyByPiId(pro);
        //小区周边信息
        PropertyInfoSubwany propertyInfoSubwany = new PropertyInfoSubwany();
        propertyInfoSubwany.setPropertyInfo_Id(propertyInfo.getPropertyInfo_Id());
        List<PropertyInfoSubwany> propertyInfoSubwanys = propertyInfoDao.selectPropertyInfoSubwany(propertyInfoSubwany);
        if (beforeProperInfy.getUpn_build() == null) {
            if (propertyInfoName.getUpn_build() > 0) {
                for (int i = 1; i <= propertyInfoName.getUpn_build(); i++) {
                    PropertyInfoName properInfo = new PropertyInfoName();
                    properInfo.setUpn_name(i+propertyInfoName.getUpn_dong());
                    properInfo.setUpn_pid(propertyInfoName.getUpn_id());
                    properInfo.setUpn_code(String.valueOf(i));
                    properInfo.setUpn_sid(propertyInfoName.getUpn_id());
                    properInfo.setUpn_sname(propertyInfoName.getUpn_name());
                    properInfo.setUpn_state(AppConfig.UPN_STATE_0);
                    addDong = this.addpropertyInfo1(properInfo, propertyInfo,propertyInfoSubwanys);
                    if (propertyInfoName.getUpn_unit() > 0) {
                        for (int j = 1; j <= propertyInfoName.getUpn_unit(); j++) {
                            PropertyInfoName proper = new PropertyInfoName();
                            proper.setUpn_name(j + "单元");
                            proper.setUpn_pid(properInfo.getUpn_id());
                            proper.setUpn_code(String.valueOf(i) + "-" + String.valueOf(j));
                            proper.setUpn_sid(propertyInfoName.getUpn_id());
                            proper.setUpn_sname(propertyInfoName.getUpn_name());
                            proper.setUpn_state(AppConfig.UPN_STATE_0);
                            addDong = this.addpropertyInfo1(proper, propertyInfo,propertyInfoSubwanys);
                        }
                    }
                }
            } else {
                if (propertyInfoName.getUpn_unit() > 0) {
                    for (int j = 1; j <= propertyInfoName.getUpn_unit(); j++) {
                        if (beforeProperInfy.getUpn_unit() < j) {
                            PropertyInfoName proper = new PropertyInfoName();
                            proper.setUpn_name(j + "单元");
                            proper.setUpn_pid(propertyInfoName.getUpn_id());
                            proper.setUpn_code(String.valueOf(j));
                            proper.setUpn_sid(propertyInfoName.getUpn_id());
                            proper.setUpn_sname(propertyInfoName.getUpn_name());
                            proper.setUpn_state(AppConfig.UPN_STATE_0);
                            addDong = this.addpropertyInfo1(proper, propertyInfo,propertyInfoSubwanys);
                        }
                    }
                }
            }
        } else {
            //修改添加
            if (beforeProperInfy.getUpn_build() == propertyInfoName.getUpn_build()) {
                PropertyInfoName p = new PropertyInfoName();
                p.setUpn_pid(propertyInfoName.getUpn_id());
                List<PropertyInfoName> pr = this.queryproperInfo(p);
                for (int k=1;k<=pr.size();k++) {
                    String d=pr.get(k-1).getUpn_name().substring(pr.get(k-1).getUpn_name().length()-1,pr.get(k-1).getUpn_name().length());
                    if (beforeProperInfy.getUpn_dong() != propertyInfoName.getUpn_dong()) {
                        String name=pr.get(k-1).getUpn_name().substring(0,pr.get(k-1).getUpn_name().length()-1);
                        PropertyInfoName proper = new PropertyInfoName();
                        proper.setUpn_id(pr.get(k-1).getUpn_id());
                        proper.setUpn_name(name+propertyInfoName.getUpn_dong());
                        proper.setUpn_pid(pr.get(k-1).getUpn_pid());
                        proper.setUpn_code(pr.get(k-1).getUpn_code());
                        proper.setUpn_sid(pr.get(k-1).getUpn_sid());
                        proper.setUpn_sname(pr.get(k-1).getUpn_sname());
                        proper.setUpn_state(pr.get(k-1).getUpn_state());
                        proper.setUpn_dong(propertyInfoName.getUpn_dong());
                        int update=this.updatepropertyInfoNamejiegou(proper);
                    }
                    for (int j=1;j<=propertyInfoName.getUpn_unit();j++) {
                        if (beforeProperInfy.getUpn_unit() < j) {
                            PropertyInfoName proper = new PropertyInfoName();
                            proper.setUpn_name(j + "单元");
                            proper.setUpn_pid(pr.get(k-1).getUpn_id());
                            proper.setUpn_code(pr.get(k-1).getUpn_code() + "-" + String.valueOf(j));
                            proper.setUpn_sid(propertyInfoName.getUpn_id());
                            proper.setUpn_sname(propertyInfoName.getUpn_name());
                            proper.setUpn_state(AppConfig.UPN_STATE_0);
                            addDong = this.addpropertyInfo1(proper, propertyInfo,propertyInfoSubwanys);
                        }
                    }
                }
            } else if (beforeProperInfy.getUpn_build() < propertyInfoName.getUpn_build()) {
                //给之前的栋添加增加的单元
                PropertyInfoName p = new PropertyInfoName();
                p.setUpn_pid(propertyInfoName.getUpn_id());
                List<PropertyInfoName> pr = this.queryproperInfo(p);
                PropertyInfoName ProperInfy = this.findPropertyInfoNameBySid(propertyInfoName.getUpn_id());
                for (int k=1;k<=pr.size();k++) {
                    String d=pr.get(k-1).getUpn_name().substring(pr.get(k-1).getUpn_name().length()-1,pr.get(k-1).getUpn_name().length());
                    if (beforeProperInfy.getUpn_dong() != propertyInfoName.getUpn_dong()) {
                        String name=pr.get(k-1).getUpn_name().substring(0,pr.get(k-1).getUpn_name().length()-1);
                        PropertyInfoName proper = new PropertyInfoName();
                        proper.setUpn_id(pr.get(k-1).getUpn_id());
                        proper.setUpn_name(name+propertyInfoName.getUpn_dong());
                        proper.setUpn_pid(pr.get(k-1).getUpn_pid());
                        proper.setUpn_code(pr.get(k-1).getUpn_code());
                        proper.setUpn_sid(pr.get(k-1).getUpn_sid());
                        proper.setUpn_sname(pr.get(k-1).getUpn_sname());
                        proper.setUpn_state(pr.get(k-1).getUpn_state());
                        proper.setUpn_dong(propertyInfoName.getUpn_dong());
                        int update=this.updatepropertyInfoNamejiegou(proper);
                    }
                    for (int j=1;j<=propertyInfoName.getUpn_unit();j++) {
                        if (beforeProperInfy.getUpn_unit() < j) {
                            PropertyInfoName proper = new PropertyInfoName();
                            proper.setUpn_name(j + "单元");
                            proper.setUpn_pid(pr.get(k-1).getUpn_id());
                            proper.setUpn_code(pr.get(k-1).getUpn_code() + "-" + String.valueOf(j));
                            proper.setUpn_sid(propertyInfoName.getUpn_id());
                            proper.setUpn_sname(propertyInfoName.getUpn_name());
                            proper.setUpn_state(AppConfig.UPN_STATE_0);
                            addDong = this.addpropertyInfo1(proper, propertyInfo,propertyInfoSubwanys);
                        }
                    }
                }
                // 增加新的栋和单元
                for (int i = 1; i <= propertyInfoName.getUpn_build(); i++) {
                    if (beforeProperInfy.getUpn_build() < i ) {
                        PropertyInfoName properInfo = new PropertyInfoName();
                        properInfo.setUpn_name(i + propertyInfoName.getUpn_dong());
                        properInfo.setUpn_pid(propertyInfoName.getUpn_id());
                        properInfo.setUpn_code(String.valueOf(i));
                        properInfo.setUpn_sid(propertyInfoName.getUpn_id());
                        properInfo.setUpn_sname(propertyInfoName.getUpn_name());
                        properInfo.setUpn_state(AppConfig.UPN_STATE_0);
                        addDong = this.addpropertyInfo1(properInfo, propertyInfo,propertyInfoSubwanys);
                        for (int j = 1; j <= propertyInfoName.getUpn_unit(); j++) {
                            PropertyInfoName proper = new PropertyInfoName();
                            proper.setUpn_name(j + "单元");
                            proper.setUpn_pid(properInfo.getUpn_id());
                            proper.setUpn_code(String.valueOf(i) + "-" + String.valueOf(j));
                            proper.setUpn_sid(propertyInfoName.getUpn_id());
                            proper.setUpn_sname(propertyInfoName.getUpn_name());
                            proper.setUpn_state(AppConfig.UPN_STATE_0);
                            addDong = this.addpropertyInfo1(proper, propertyInfo,propertyInfoSubwanys);
                        }
                    }
                }
            }
        }
        return addDong;
    }

    public int addpropertyInfo1(PropertyInfoName propertyInfoName, PropertyInfo property,List<PropertyInfoSubwany> propertyInfoSubwanys) {
        int addpropertyInfoziji = propertyInfoNameDao.addpropertyInfoziji(propertyInfoName);
        // 物业基础信息
        PropertyInfo propertyInfo = new PropertyInfo();
        propertyInfo.setPropertyInfo_department(property.getPropertyInfo_department());
        propertyInfo.setUpn_id(propertyInfoName.getUpn_id());
        if (propertyInfoName.getUpn_code() != null && propertyInfoName.getUpn_code() != "") {
            propertyInfo.setPropertyInfo_Name(propertyInfoName.getUpn_sname() + "-" + propertyInfoName.getUpn_code());
        } else {
            propertyInfo.setPropertyInfo_Name(propertyInfoName.getUpn_sname());
        }
        propertyInfo.setPropertyInfo_success(0);
        propertyInfo.setPropertyInfo_stage(0);
        propertyInfo.setPropertyInfo_address(property.getPropertyInfo_address());
        propertyInfo.setPropertyInfo_quyu(property.getPropertyInfo_quyu());
        propertyInfo.setPropertyInfo_street(property.getPropertyInfo_street());
        propertyInfo.setPropertyInfo_coordinate(property.getPropertyInfo_coordinate());
        propertyInfo.setPropertyInfo_source(property.getPropertyInfo_source());
        propertyInfo.setPropertyInfo_gui(property.getPropertyInfo_gui());
        propertyInfo.setPropertyInfo_transit(property.getPropertyInfo_transit());
        //物管
        propertyInfo.setPropertyInfo_Wuguan(property.getPropertyInfo_Wuguan());
        propertyInfo.setPropertyInfo_Tel(property.getPropertyInfo_Tel());
        propertyInfo.setPropertyInfo_Cost(property.getPropertyInfo_Cost());
        propertyInfo.setPropertyInfo_company(property.getPropertyInfo_company());
        propertyInfo.setPropertyInfo_waddress(property.getPropertyInfo_waddress());
        //小区信息
        propertyInfo.setPropertyInfo_developer(property.getPropertyInfo_developer()); // 开发商
        propertyInfo.setPropertyInfo_ManaStyle(property.getPropertyInfo_ManaStyle()); //管理方式
        propertyInfo.setPropertyInfo_GreenRate(property.getPropertyInfo_GreenRate());  //绿化率
        propertyInfo.setPropertyInfo_PlotRate(property.getPropertyInfo_PlotRate());   // 容积率
        propertyInfo.setPropertyInfo_TotalAmount(property.getPropertyInfo_TotalAmount());  //总套数
        propertyInfo.setPropertyInfo_BuildArea(property.getPropertyInfo_BuildArea());  //建筑面积
        propertyInfo.setPropertyInfo_TotalArea(property.getPropertyInfo_TotalArea());  //占地面积
        propertyInfo.setPropertyInfo_OpenPrice(property.getPropertyInfo_OpenPrice());  //开盘价
        propertyInfo.setPropertyInfo_CarPark(property.getPropertyInfo_CarPark()); //车库
        propertyInfo.setPropertyInfo_Public(property.getPropertyInfo_Public());  // 公共设施
        propertyInfo.setPropertyInfo_you(property.getPropertyInfo_you());  //小区环境
        propertyInfo.setPropertyInfo_Type(property.getPropertyInfo_Type());   // 物业类别
        propertyInfo.setPropertyInfo_State(property.getPropertyInfo_State());  //物业形态
        propertyInfo.setPropertyInfo_OpenTime(property.getPropertyInfo_OpenTime()); //开盘时间
        Integer insertPropertyInfo = propertyInfoDao.insertPropertyInfo(propertyInfo);
        //小区周边
        PropertyInfoSubwany propertyInfoSubwany = new PropertyInfoSubwany();
        propertyInfoSubwany.setPropertyInfo_Id(propertyInfo.getPropertyInfo_Id());
        propertyInfoService.deleteSubwany(propertyInfoSubwany);
        int bool = 0;
        for (PropertyInfoSubwany sub : propertyInfoSubwanys) {
            PropertyInfoSubwany pro=new PropertyInfoSubwany();
            pro.setSubway_Name(sub.getSubway_Name());
            pro.setPropertyInfo_Id(propertyInfo.getPropertyInfo_Id());
            bool = propertyInfoService.updateSubwany(pro);
        }
        if (addpropertyInfoziji != 0 && insertPropertyInfo != 0) {
            addpropertyInfoziji = 1;
        } else {
            addpropertyInfoziji = 0;
        }
        return addpropertyInfoziji;
    }

    /**
     * 查询小区下级
     */
    public List<PropertyInfoName> queryPropertyInfoLists(PropertyInfoName p) {
        return propertyInfoNameDao.queryPropertyInfoLists(p);
    }

    /**
     * 根据区县查询区域
     */
    public PropertyInfoType selectPrtperType (PropertyInfoType properType) {
        return propertyInfoNameDao.selectPrtperType(properType);
    }

    /**
     * 根据父级编码查询区域
     */
    public List<PropertyInfoType> selectProperTyInfoType (PropertyInfoType properType) {
        return propertyInfoNameDao.selectProperTyInfoType(properType);
    }

    /**
     * 查询轨道站台
     */
    public List<PropertyInfoTrack> selectProperInfoTrack (PropertyInfoTrack propertyInfoTrack) {
        return propertyInfoNameDao.selectProperInfoTrack(propertyInfoTrack);
    }

    /**
     * 查询宽带
     */
    public List<PropertyInfoConfigType> selectproperInfoIntenter (PropertyInfoConfigType proConfig) {
        return propertyInfoNameDao.selectproperInfoIntenter(proConfig);
    }

    /**
     * 根据条件查询物业
     * @author tanglei
     */
    public PropertyInfoName selectPropertyInfoPid (PropertyInfoName propertyInfoName) {
        return propertyInfoNameDao.selectPropertyInfoPid(propertyInfoName);
    }

    /**
     * 根据父级编码查询多条子级
     * @author tanglei
     */
    public List<PropertyInfoName> queryproperInfo (PropertyInfoName propertyInfoName) {
        return propertyInfoNameDao.queryproperInfo(propertyInfoName);
    }

    /**
     * 添加区域
     * @author tanglei
     */
    public int addArea (PropertyInfoType properType){
        return propertyInfoNameDao.addArea(properType);
    }

    /**
     * 修改区域
     * @author tanglei
     */
    public int updateArea (PropertyInfoType properType) {
        return propertyInfoNameDao.updateArea(properType);
    }

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

}
