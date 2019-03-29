package com.gjp.service;

import com.gjp.dao.AuthorizationDao;
import com.gjp.model.*;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 组织权限service
 *
 * @author zoe
 */
@Service
public class AuthorizationService {

    @Resource
    private AuthorizationDao authorizationDao;

    /**
     * 根据条件查询组织结构
     *
     * @param company
     * @return
     * @author 陈智颖
     */
    public List<Company> selectOrganization(Company company) {
        return authorizationDao.selectOrganization(company);
    }

    public List<Company> selectOrganizationTree(Company company) {
        return authorizationDao.selectOrganizationTree(company);
    }

    /**
     * 修改组织基本信息
     *
     * @param company
     * @return
     * @author 陈智颖
     */
    public int updateOrganizationInfo(Company company) {
        return authorizationDao.updateOrganizationInfo(company);
    }

    /**
     * 添加组织权限关联
     *
     * @param company
     * @author 陈智颖
     */
    public int addOrganizationJurisdiction(Company company) {
        return authorizationDao.addOrganizationJurisdiction(company);
    }

    /**
     * 添加人员职位关系
     *
     * @author 陈智颖
     */
    public int addPersonPosition(PersonPosition personPosition) {
        return authorizationDao.addPersonPosition(personPosition);
    }

    /**
     * 添加部门人员关系
     *
     * @author 陈智颖
     */
    public int addCompanyPserson(CompanyPserson companyPserson) {
        return authorizationDao.addCompanyPserson(companyPserson);
    }

    /**
     * 添加下属职位
     *
     * @param position
     * @return
     * @author 陈智颖
     */
    public int addStation(Position position) {
        return authorizationDao.addStation(position);
    }

    /**
     * 修改部门状态
     *
     * @return
     * @author 陈智颖
     */
    public int updateDeparmentState(Company company) {
        return authorizationDao.updateDeparmentState(company);
    }

    /**
     * 删除职位人员关系表
     *
     * @return
     * @author 陈智颖
     */
    public int deletePersonPosition(PersonPosition personPosition) {
        return authorizationDao.deletePersonPosition(personPosition);
    }

    /**
     * 删除部门人员关系
     *
     * @return
     * @author 陈智颖
     */
    public int deleteCompanyPserson(CompanyPserson companyPserson) {
        return authorizationDao.deleteCompanyPserson(companyPserson);
    }

    /**
     * 添加组织架构
     *
     * @return
     * @author 陈智颖
     */
    public int addOrganization(Company company) {
        return authorizationDao.addOrganization(company);
    }

    /**
     * 根据部门编码查询职位
     *
     * @param position
     * @return
     * @author 陈智颖
     */
    public List<Position> selectPositionID(Position position) {
        return authorizationDao.selectPositionID(position);
    }

    /**
     * 根据部门编码查询职位
     *
     * @param position
     * @return
     * @author 陈智颖
     */
    public List<Position> selectPositionById(Position position) {
        return authorizationDao.selectPositionById(position);
    }

    /**
     * 根据条件查询公司信息
     *
     * @param company
     * @return
     * @author 陈智颖
     */
    public Company selectCompanyInfo(Company company) {
        return authorizationDao.selectCompanyInfo(company);
    }

    /**
     * 根据条件查询公司信息
     *
     * @param ucc_id
     * @return
     * @author 陈智颖
     */
    public Company selectCompanyInfo(Integer ucc_id) {
        Company company = new Company();
        company.setUcc_id(ucc_id);
        return authorizationDao.selectCompanyInfo(company);
    }

    /**
     * 根据人员查询人员 权限
     *
     * @param powers
     * @return
     * @author 陈智颖
     */
    public List<Powers> selectPersonPowers(Powers powers) {
        return authorizationDao.selectPersonPowers(powers);
    }

    /**
     * 根据人员查询职位 权限
     *
     * @param powers
     * @return
     * @author 陈智颖
     */
    public List<Powers> selectPositionPowers(Powers powers) {
        return authorizationDao.selectPositionPowers(powers);
    }

    /**
     * 根据人员查询部门 权限
     *
     * @param powers
     * @return
     * @author 陈智颖
     */
    public List<Powers> selectPersonCompanyPowers(Powers powers) {
        return authorizationDao.selectPersonCompanyPowers(powers);
    }

    /**
     * 查询所有部门
     *
     * @param company
     * @return
     * @作者 JiangQT
     * @日期 2016年10月27日
     */
    public List<Company> queryCompanyList(Company company) {
        return authorizationDao.queryCompanyList(company);
    }

    /**
     * 根据人员编码查询部门ID
     *
     * @param company
     * @return
     * @作者 陈智颖
     * @日期 2016年10月27日
     */
    public List<Company> selectCompanyEmid(Company company) {
        return authorizationDao.selectCompanyEmid(company);
    }

    /**
     * 修改职位信息
     *
     * @author 陈智颖
     */
    public int updatePosition(Position position) {
        return authorizationDao.updatePosition(position);
    }

    /**
     * 查询未分配内部人员
     *
     * @param userCenterEmployee
     * @return
     * @author 陈智颖
     */
    public List<UserCenterEmployee> selectEmployeeNullPosition(UserCenterEmployee userCenterEmployee) {
        return authorizationDao.selectEmployeeNullPosition(userCenterEmployee);
    }

    /**
     * 根据职位编码查询职位下的人员
     *
     * @param userCenterEmployee
     * @return
     * @author 陈智颖
     */
    public List<UserCenterEmployee> selectEmployeePosition(UserCenterEmployee userCenterEmployee) {
        return authorizationDao.selectEmployeePosition(userCenterEmployee);
    }

    /**
     * 查询公司人员关系是否存在
     *
     * @return
     * @author 陈智颖
     */
    public List<CompanyPserson> selectCompanyPserson(CompanyPserson companyPserson) {
        return authorizationDao.selectCompanyPserson(companyPserson);
    }

    /**
     * 根据部门编码查询人员
     *
     * @param userCenterEmployee
     * @return
     * @author 陈智颖
     */
    public List<UserCenterEmployee> selectDepartmentUser(UserCenterEmployee userCenterEmployee) {
        return authorizationDao.selectDepartmentUser(userCenterEmployee);
    }

    /**
     * 根据用户编码和部门编码查询职位
     *
     * @param userCenterEmployee
     * @return
     * @author 陈智颖
     */
    public List<UserCenterEmployee> selectDepartmentWhere(UserCenterEmployee userCenterEmployee) {
        return authorizationDao.selectDepartmentWhere(userCenterEmployee);
    }

    /**
     * 根据部门编码查询人员总数
     *
     * @param userCenterEmployee
     * @return
     * @author 陈智颖
     */
    public UserCenterEmployee selectDepartmentUserCount(UserCenterEmployee userCenterEmployee) {
        return authorizationDao.selectDepartmentUserCount(userCenterEmployee);
    }

    /**
     * 设置部门权限
     *
     * @param powerIds
     * @return
     * @author 王孝元
     */
    public int setPowersForCompany(Integer[] powerIds, Integer id) {
        // 1.先删除已有权限
        authorizationDao.delFromCompanyPowers(id);
        // 2.再设置权限
        Map<String, Object> map = new HashMap<>();
        map.put("powerIds", powerIds);
        map.put("companyId", id);
        return authorizationDao.savePowersForCompany(map);
    }

    /**
     * 设置职位权限
     *
     * @param powerIds
     * @return
     * @author 王孝元
     */
    public int setPowersForPosition(Integer[] powerIds, Integer id) {
        // 1.先删除已有权限
        authorizationDao.delFromPositionPowers(id);
        // 2.再设置权限
        Map<String, Object> map = new HashMap<>();
        map.put("powerIds", powerIds);
        map.put("positionId", id);
        return authorizationDao.savePowersForPosition(map);
    }

    /**
     * 查询部门拥有的权限
     *
     * @param id
     * @return
     * @author 王孝元
     */
    public List<Powers> selectPowersByCompanyId(Integer id) {
        return authorizationDao.selectPowersByCompanyId(id);
    }

    /**
     * 查询职位拥有的权限
     *
     * @param id
     * @return
     * @author 王孝元
     */
    public List<Powers> selectPowersByPositionId(Integer id) {
        return authorizationDao.selectPowersByPositionId(id);
    }

    /**
     * 根据id查询部门
     *
     * @param id
     * @return
     * @author 王孝元
     */
    public Company getCompanyById(Integer id) {
        return authorizationDao.getCompanyById(id);
    }

    /**
     * 根据id查询职位
     *
     * @param id
     * @return
     * @author 王孝元
     */
    public Position getPositionById(Integer id) {
        return authorizationDao.getPositionById(id);
    }

    /**
     * 根据url地址查询权限
     *
     * @param powers
     * @return
     * @author 陈智颖
     */
    public Powers selectPowersUrl(Powers powers) {
        return authorizationDao.selectPowersUrl(powers);
    }

    /**
     * 离职申请人员读取数据
     *
     * @param pageModel
     * @return
     * @author 陈智颖
     */
    public PageModel<UserCenterEmployee> selectCompanyQuitUser(PageModel<UserCenterEmployee> pageModel) {
        return authorizationDao.selectCompanyQuitUser(pageModel);
    }
}
