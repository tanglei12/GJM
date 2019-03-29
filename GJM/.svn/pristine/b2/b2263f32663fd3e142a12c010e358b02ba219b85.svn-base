package com.gjp.dao.impl;

import com.gjp.dao.AuthorizationDao;
import com.gjp.dao.BaseDAO;
import com.gjp.model.*;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 组织权限ImplDao
 * 
 * @author 陈智颖
 *
 */
@Repository
public class AuthorizationDaoImpl extends BaseDAO implements AuthorizationDao {

	@Override
	public List<Company> selectOrganization(Company company) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.AuthorizationDao.selectOrganization", company);
	}

	@Override
	public List<Company> selectOrganizationTree(Company company) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.AuthorizationDao.selectOrganizationTree", company);
	}


	@Override
	public int updateOrganizationInfo(Company company) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.AuthorizationDao.updateOrganizationInfo", company);
	}

	@Override
	public int addOrganizationJurisdiction(Company company) {
		return super.sqlSessionTemplateUser.delete("com.gjp.dao.AuthorizationDao.addOrganizationJurisdiction", company);
	}

	@Override
	public int addStation(Position position) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.AuthorizationDao.addStation", position);
	}

	@Override
	public List<Position> selectPositionID(Position position) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.AuthorizationDao.selectPositionID", position);
	}

	@Override
	public int addOrganization(Company company) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.AuthorizationDao.addOrganization", company);
	}

	@Override
	public List<Position> selectPositionById(Position position) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.AuthorizationDao.selectPositionById", position);
	}

	@Override
	public Company selectCompanyInfo(Company company) {
		return sqlSessionTemplateUser.selectOne("com.gjp.dao.AuthorizationDao.selectCompanyInfo", company);
	}

	@Override
	public List<Powers> selectPersonPowers(Powers powers) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.AuthorizationDao.selectPersonPowers", powers);
	}

	@Override
	public List<Powers> selectPositionPowers(Powers powers) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.AuthorizationDao.selectPositionPowers", powers);
	}

	@Override
	public List<Powers> selectPersonCompanyPowers(Powers powers) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.AuthorizationDao.selectPersonCompanyPowers", powers);
	}

	@Override
	public List<Company> queryCompanyList(Company company) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.AuthorizationDao.queryCompanyList", company);
	}

	@Override
	public int updatePosition(Position position) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.AuthorizationDao.updatePosition", position);
	}

	@Override
	public List<UserCenterEmployee> selectEmployeeNullPosition(UserCenterEmployee userCenterEmployee) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.AuthorizationDao.selectEmployeeNullPosition", userCenterEmployee);
	}

	@Override
	public List<UserCenterEmployee> selectEmployeePosition(UserCenterEmployee userCenterEmployee) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.AuthorizationDao.selectEmployeePosition", userCenterEmployee);
	}

	@Override
	public int addPersonPosition(PersonPosition personPosition) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.AuthorizationDao.addPersonPosition", personPosition);
	}

	@Override
	public int addCompanyPserson(CompanyPserson companyPserson) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.AuthorizationDao.addCompanyPserson", companyPserson);
	}

	@Override
	public List<CompanyPserson> selectCompanyPserson(CompanyPserson companyPserson) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.AuthorizationDao.selectCompanyPserson", companyPserson);
	}

	@Override
	public int delFromPositionPowers(Integer id) {
		return super.sqlSessionTemplateUser.delete("com.gjp.dao.AuthorizationDao.delFromPositionPowers", id);
	}

	@Override
	public int savePowersForPosition(Map<String, Object> map) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.AuthorizationDao.savePowersForPosition", map);
	}

	@Override
	public List<Powers> selectPowersByCompanyId(Integer id) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.AuthorizationDao.selectPowersByCompanyId", id);
	}

	@Override
	public List<Powers> selectPowersByPositionId(Integer id) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.AuthorizationDao.selectPowersByPositionId", id);
	}

	@Override
	public int delFromCompanyPowers(Integer id) {
		return super.sqlSessionTemplateUser.delete("com.gjp.dao.AuthorizationDao.delFromCompanyPowers", id);
	}

	@Override
	public int savePowersForCompany(Map<String, Object> map) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.AuthorizationDao.savePowersForCompany", map);
	}

	@Override
	public Company getCompanyById(Integer id) {
		return sqlSessionTemplateUser.selectOne("com.gjp.dao.AuthorizationDao.getCompanyById", id);
	}

	@Override
	public Position getPositionById(Integer id) {
		return sqlSessionTemplateUser.selectOne("com.gjp.dao.AuthorizationDao.getPositionById", id);
	}

	@Override
	public List<UserCenterEmployee> selectDepartmentUser(UserCenterEmployee userCenterEmployee) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.AuthorizationDao.selectDepartmentUser", userCenterEmployee);
	}

	@Override
	public UserCenterEmployee selectDepartmentUserCount(UserCenterEmployee userCenterEmployee) {
		return sqlSessionTemplateUser.selectOne("com.gjp.dao.AuthorizationDao.selectDepartmentUserCount", userCenterEmployee);
	}

	@Override
	public int deletePersonPosition(PersonPosition personPosition) {
		return super.sqlSessionTemplateUser.delete("com.gjp.dao.AuthorizationDao.deletePersonPosition", personPosition);
	}

	@Override
	public int deleteCompanyPserson(CompanyPserson companyPserson) {
		return super.sqlSessionTemplateUser.delete("com.gjp.dao.AuthorizationDao.deleteCompanyPserson", companyPserson);
	}

	@Override
	public int updateDeparmentState(Company company) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.AuthorizationDao.updateDeparmentState", company);
	}

	@Override
	public List<UserCenterEmployee> selectDepartmentWhere(UserCenterEmployee userCenterEmployee) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.AuthorizationDao.selectDepartmentWhere", userCenterEmployee);
	}

	@Override
	public Powers selectPowersUrl(Powers powers) {
		return sqlSessionTemplateUser.selectOne("com.gjp.dao.AuthorizationDao.selectPowersUrl", powers);
	}

	@Override
	public List<Company> selectCompanyEmid(Company company) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.AuthorizationDao.selectCompanyEmid", company);
	}

	@Override
	public PageModel<UserCenterEmployee> selectCompanyQuitUser(PageModel<UserCenterEmployee> pageModel) {
		
		List<UserCenterEmployee> userCenterEmployee = sqlSessionTemplateUser.selectList("com.gjp.dao.AuthorizationDao.selectCompanyQuitUser", pageModel);
		int totalRecords = sqlSessionTemplateUser.selectOne("com.gjp.dao.AuthorizationDao.selectCompanyQuitUserCount", pageModel);
		pageModel.setList(userCenterEmployee);
		pageModel.setTotalRecords(totalRecords);
		
		return pageModel;
	}

}
