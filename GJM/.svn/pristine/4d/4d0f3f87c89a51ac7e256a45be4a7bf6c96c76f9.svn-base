package com.gjp.dao;

import com.gjp.model.*;
import com.gjp.util.PageModel;

import java.util.List;
import java.util.Map;

/**
 * 组织权限Dao
 * 
 * @author 陈智颖
 *
 */
public interface AuthorizationDao {

	/**
	 * 添加下属职位
	 * 
	 * @author zoe
	 * @param position
	 * @return
	 */
	int addStation(Position position);

	/**
	 * 添加组织权限关联
	 * 
	 * @author 陈智颖
	 * @param company
	 * @return
	 */
	int addOrganizationJurisdiction(Company company);

	/**
	 * 修改职位信息
	 * 
	 * @author 陈智颖
	 * @param company
	 * @return
	 */
	int updatePosition(Position position);

	/**
	 * 删除职位人员关系表
	 * 
	 * @author 陈智颖
	 * @param company
	 * @return
	 */
	int deletePersonPosition(PersonPosition personPosition);

	/**
	 * 删除部门人员关系
	 * 
	 * @author 陈智颖
	 * @param company
	 * @return
	 */
	int deleteCompanyPserson(CompanyPserson companyPserson);

	/**
	 * 添加人员职位关系
	 * 
	 * @author 陈智颖
	 * @param company
	 * @return
	 */
	int addPersonPosition(PersonPosition personPosition);

	/**
	 * 添加部门人员关系
	 * 
	 * @author 陈智颖
	 * @param company
	 * @return
	 */
	int addCompanyPserson(CompanyPserson companyPserson);

	/**
	 * 查询公司人员关系是否存在
	 * 
	 * @author 陈智颖
	 * @param company
	 * @return
	 */
	List<CompanyPserson> selectCompanyPserson(CompanyPserson companyPserson);

	/**
	 * 根据条件查询组织结构
	 * 
	 * @author 陈智颖
	 * @param company
	 * @return
	 */
	List<Company> selectOrganization(Company company);
	List<Company> selectOrganizationTree(Company company);

	/**
	 * 根据人员编码查询部门ID
	 * 
	 * @author 陈智颖
	 * @param company
	 * @return
	 */
	List<Company> selectCompanyEmid(Company company);

	/**
	 * 根据条件查询公司信息
	 * 
	 * @author 陈智颖
	 * @param company
	 * @return
	 */
	Company selectCompanyInfo(Company company);

	/**
	 * 根据部门编码查询职位
	 * 
	 * @param position
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<Position> selectPositionID(Position position);

	/**
	 * 根据职位名加组织编号查询职位
	 * 
	 * @param position
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<Position> selectPositionById(Position position);

	/**
	 * 修改组织基本信息
	 * 
	 * @author 陈智颖
	 * @param company
	 * @return
	 */
	int updateOrganizationInfo(Company company);

	/**
	 * 添加下属组织
	 * 
	 * @author 陈智颖
	 * @param company
	 * @return
	 */
	int addOrganization(Company company);

	/**
	 * 修改部门状态
	 * 
	 * @author 陈智颖
	 * @param company
	 * @return
	 */
	int updateDeparmentState(Company company);

	/**
	 * 根据人员查询人员 权限
	 * 
	 * @param powers
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<Powers> selectPersonPowers(Powers powers);
	
	/**
	 * 根据url地址查询权限
	 * 
	 * @param powers
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Powers selectPowersUrl(Powers powers);

	/**
	 * 根据人员查询职位 权限
	 * 
	 * @param powers
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<Powers> selectPositionPowers(Powers powers);

	/**
	 * 根据人员查询部门 权限
	 * 
	 * @param powers
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<Powers> selectPersonCompanyPowers(Powers powers);

	/**
	 * 查询所有部门
	 * 
	 * @作者 JiangQT
	 * @日期 2016年10月27日
	 *
	 * @param company
	 * @return
	 */
	List<Company> queryCompanyList(Company company);

	/**
	 * 查询未分配内部人员
	 * 
	 * @param userCenterEmployee
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<UserCenterEmployee> selectEmployeeNullPosition(UserCenterEmployee userCenterEmployee);

	/**
	 * 根据职位编码查询职位下的人员
	 * 
	 * @param userCenterEmployee
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<UserCenterEmployee> selectEmployeePosition(UserCenterEmployee userCenterEmployee);
	
	/**
	 * 根据用户编码和部门编码查询职位
	 * 
	 * @param userCenterEmployee
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<UserCenterEmployee> selectDepartmentWhere(UserCenterEmployee userCenterEmployee);

	/**
	 * 删除职位权限关联
	 * 
	 * @param id
	 */
	int delFromPositionPowers(Integer id);

	/**
	 * 设置职位权限
	 * 
	 * @param map
	 * @return
	 */
	int savePowersForPosition(Map<String, Object> map);

	/**
	 * 查询部门拥有的权限
	 * 
	 * @param id
	 * @return
	 */
	List<Powers> selectPowersByCompanyId(Integer id);

	/**
	 * 查询职位拥有的权限
	 * 
	 * @param id
	 * @return
	 */
	List<Powers> selectPowersByPositionId(Integer id);

	/**
	 * 删除部门权限关联
	 * 
	 * @param id
	 */
	int delFromCompanyPowers(Integer id);

	/**
	 * 设置部门权限
	 * 
	 * @param map
	 * @return
	 */
	int savePowersForCompany(Map<String, Object> map);

	/**
	 * 根据id查询部门
	 * 
	 * @param id
	 * @return
	 */
	Company getCompanyById(Integer id);

	/**
	 * 根据id查询职位
	 * 
	 * @param id
	 * @return
	 */
	Position getPositionById(Integer id);

	/**
	 * 根据部门编码查询人员
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<UserCenterEmployee> selectDepartmentUser(UserCenterEmployee userCenterEmployee);

	/**
	 * 根据部门编码查询人员总数
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	public UserCenterEmployee selectDepartmentUserCount(UserCenterEmployee userCenterEmployee);
	
	/**
	 * 根据部门编码查询人员总数
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	public PageModel<UserCenterEmployee> selectCompanyQuitUser(PageModel<UserCenterEmployee> pageModel);
	
}
