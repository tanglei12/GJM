package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.UserCenterEmployeeDao;
import com.gjp.model.*;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 内部职员ImplDao
 *
 * @author 陈智颖
 */
@Repository
public class UserCenterEmployeeDAOImpl extends BaseDAO implements UserCenterEmployeeDao {

    @Override
    public UserCenterEmployee selectUserCenterEmployeeById(int id) {
        return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterEmployeeDao.selectUserCenterEmployeeById", id);
    }

    @Override
    public List<UserCenterEmployee> selectUserCenterEmployee() {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectUserCenterEmployee");
    }

    @Override
    public UserCenterEmployee selectUserCenterEmployeeByName(UserCenterEmployee userCenterEmployee) {
        return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterEmployeeDao.selectUserCenterEmployeeByName", userCenterEmployee);
    }

    @Override
    public UserCenterEmployee selectUserCenterEmployeeByPhone(UserCenterEmployee userCenterEmployee) {
        return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterEmployeeDao.selectUserCenterEmployeeByPhone", userCenterEmployee);
    }

    @Override
    public List<UserCenterEmployee> selectEmployeeSize(UserCenterEmployee userCenterEmployee) {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectEmployeeSize", userCenterEmployee);
    }

    @Override
    public List<UserCenterEmployee> selectEmployee(UserCenterEmployee userCenterEmployee) {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectEmployee", userCenterEmployee);
    }

    @Override
    public Integer insertUserCenterEmployee(UserCenterEmployee userCenterEmployee) {
        return super.sqlSessionTemplateUser.insert("com.gjp.dao.UserCenterEmployeeDao.insertUserCenterEmployee", userCenterEmployee);
    }

    @Override
    public List<UserCenterEmployee> selectAccount(UserCenterEmployee userCenterEmployee) {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectAccount", userCenterEmployee);
    }

    @Override
    public List<UserCenterEmployee> selectAccountType(UserCenterEmployee userCenterEmployee) {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectAccountType", userCenterEmployee);
    }

    @Override
    public Integer updatetUserCenterEmployee(UserCenterEmployee userCenterEmployee) {
        return super.sqlSessionTemplateUser.update("com.gjp.dao.UserCenterEmployeeDao.updatetUserCenterEmployee", userCenterEmployee);
    }

    @Override
    public List<Integer> selectIdByName(String em_name) {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectIdByName", em_name);
    }

    @Override
    public List<UserCenterEmployee> selectEmployeeByPosition(String em_position) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectEmployeeByPosition", em_position);
    }

    @Override
    public UserCenterEmployee selectEmployeeById(Integer em_id) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterEmployeeDao.selectEmployeeById", em_id);
    }

    @Override
    public List<UserCenterEmployee> queryUserCenterEmployeeList(Pagination<UserCenterEmployee> pagination) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.queryUserCenterEmployeeList", pagination);
    }

    @Override
    public int queryUserCenterEmployeeTotalRecords(Pagination<UserCenterEmployee> pagination) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterEmployeeDao.queryUserCenterEmployeeTotalRecords", pagination);
    }

    @Override
    public int updatePs(UserCenterEmployee userCenterEmployee) {
        return super.sqlSessionTemplateUser.update("com.gjp.dao.UserCenterEmployeeDao.updatePs", userCenterEmployee);
    }

    @Override
    public UserCenter selectUserCenter(Integer user_id) {
        return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterEmployeeDao.selectUserCenter", user_id);
    }

    @Override
    public int updateEmployeeById(UserCenterEmployee userCenterEmployee) {
        return super.sqlSessionTemplateUser.update("com.gjp.dao.UserCenterEmployeeDao.updateEmployeeById", userCenterEmployee);
    }

    @Override
    public List<UserCenterEmployee> selectUserCenterEmployeeZG(UserCenterEmployee userCenterEmployee) {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectUserCenterEmployeeZG", userCenterEmployee);
    }

    @Override
    public int addRole(Role role) {
        return super.sqlSessionTemplateUser.insert("com.gjp.dao.UserCenterEmployeeDao.addRole", role);
    }

    @Override
    public List<UserCenterEmployee> selectUserCenterEmployeeService() {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectUserCenterEmployeeService");
    }

    @Override
    public List<UserCenterEmployee> selectALLAccount() {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectALLAccount");
    }

    @Override
    public int updateUser(UserCenterEmployee userCenterEmployee) {
        return super.sqlSessionTemplateUser.update("com.gjp.dao.UserCenterEmployeeDao.updateUser", userCenterEmployee);
    }

    @Override
    public int updateImage(UserCenterEmployee userCenterEmployee) {
        return super.sqlSessionTemplateUser.update("com.gjp.dao.UserCenterEmployeeDao.updateImage", userCenterEmployee);
    }

    @Override
    public List<UserCenterEmployee> selectALLMessage() {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectALLMessage");
    }

    @Override
    public List<Integer> selectDepartmentById(UserCenterEmployee userCenterEmployee) {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectDepartmentById", userCenterEmployee);
    }

    @Override
    public List<UserCenterEmployee> selectUserCenterEmployeeByDepartment(Integer ucc_id) {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectUserCenterEmployeeByDepartment", ucc_id);
    }

    @Override
    public List<Company> selectAllCompany() {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectAllCompany");
    }

    @Override
    public List<UserCenterEmployee> selectCompanyID(UserCenterEmployee userCenterEmployee) {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectCompanyID", userCenterEmployee);
    }

    @Override
    public List<UserCenterEmployee> selectUserCenterEmployeeJL() {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectUserCenterEmployeeJL");
    }

    @Override
    public List<UserCenterEmployee> selectUserCenterEmployeeCompany(UserCenterEmployee userCenterEmployee) {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectUserCenterEmployeeCompany", userCenterEmployee);
    }

    @Override
    public List<UserCenterEmployee> selectUserCenterEmployeeUCC(UserCenterEmployee userCenterEmployee) {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectUserCenterEmployeeUCC", userCenterEmployee);
    }

    @Override
    public List<UserCenterEmployee> selectUserCenterEmployeeCompanyGjp(UserCenterEmployee userCenterEmployee) {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectUserCenterEmployeeCompanyGjp", userCenterEmployee);
    }

    @Override
    public ViewEmployeePositionCompanyVo selectEmployeePositionCompanyWhere(ViewEmployeePositionCompanyVo vo) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterEmployeeDao.selectEmployeePositionCompanyWhere", vo);
    }

    @Override
    public List<ViewEmployeePositionCompanyVo> selectEmployeePositionCompanyList(ViewEmployeePositionCompanyVo positionCompanyVo) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectEmployeePositionCompanyList", positionCompanyVo);
    }

    @Override
    public List<Company> selectSaleCompany() {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectSaleCompany");
    }

    @Override
    public List<PersionVo> selectSaleCompanyPersion(PersionVo persionVo) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectSaleCompanyPersion",persionVo);
    }

    @Override
    public List<Company> queryDepartmentList(Pagination<Company> pagination) {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.queryDepartmentList", pagination);
    }

    @Override
    public int queryDepartmentListNum(Pagination<Company> pagination) {
        return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterEmployeeDao.queryDepartmentListNum", pagination);
    }

    @Override
    public UserCenterEmployee queryEmployeeHead(UserCenterEmployee employee) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterEmployeeDao.queryEmployeeHead", employee);
    }

    @Override
    public int savePowersForPerson(Map<String, Object> map) {
        return super.sqlSessionTemplateUser.insert("com.gjp.dao.UserCenterEmployeeDao.savePowersForPerson", map);
    }

    @Override
    public int delFromPersonPowers(Integer id) {
        return super.sqlSessionTemplateUser.delete("com.gjp.dao.UserCenterEmployeeDao.delFromPersonPowers", id);
    }

    @Override
    public List<Powers> selectPowersByPersonId(Integer id) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectPowersByPersonId", id);
    }

    @Override
    public List<Position> selectPositionByPersonId(Integer id) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectPositionByPersonId", id);
    }

    @Override
    public List<Company> selectCompanyByPersonId(Integer id) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectCompanyByPersonId", id);
    }

    @Override
    public int updateState(UserCenterEmployee userCenterEmployee) {
        return sqlSessionTemplateUser.update("com.gjp.dao.UserCenterEmployeeDao.updateState", userCenterEmployee);
    }

    @Override
    public List<UserCenterEmployee> selectPersonsByNameOrPhone(UserCenterEmployee employee) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectPersonsByNameOrPhone", employee);
    }

    @Override
    public List<UserCenterEmployee> selectEmployeeList(UserCenterEmployee employee) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectEmployeeList", employee);
    }

    @Override
    public int selectEmployeeListCount(UserCenterEmployee employee) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterEmployeeDao.selectEmployeeListCount", employee);
    }

    @Override
    public int insertUserContract(UserContract userContract) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.UserCenterEmployeeDao.insertUserContract", userContract);
    }

    @Override
    public int deleteUserContract(UserContract userContract) {
        return sqlSessionTemplateUser.delete("com.gjp.dao.UserCenterEmployeeDao.deleteUserContract", userContract);
    }

    @Override
    public int updatetUserContract(UserContract userContract) {
        return sqlSessionTemplateUser.update("com.gjp.dao.UserCenterEmployeeDao.updatetUserContract", userContract);
    }

    @Override
    public int updatetCloseCompany(UserCenterEmployee userCenterEmployee) {
        return sqlSessionTemplateUser.update("com.gjp.dao.UserCenterEmployeeDao.updatetCloseCompany", userCenterEmployee);
    }

    @Override
    public List<UserCenterEmployee> selectHouseEmContract(UserCenterEmployee userCenterEmployee) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectHouseEmContract", userCenterEmployee);
    }

    @Override
    public List<UserCenterEmployee> selectHouseEmContractEm(UserCenterEmployee userCenterEmployee) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectHouseEmContractEm", userCenterEmployee);
    }

    @Override
    public int selectHouseEmContractEmBool(UserCenterEmployee userCenterEmployee) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterEmployeeDao.selectHouseEmContractEmBool", userCenterEmployee);
    }

    @Override
    public UserCenterEmployee queryEmployeeInfo(UserCenterEmployee centerEmployee) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterEmployeeDao.queryEmployeeInfo", centerEmployee);
    }

    @Override
    public List<UserContract> selectUserContract(UserContract userContract) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectUserContract", userContract);
    }

    @Override
    public List<Company> queryCompanyList(Company company) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.queryCompanyList", company);
    }

    @Override
    public Pagination<UserCenterEmployee> queryEmployeePageList(Pagination<UserCenterEmployee> pagination) {
        Pagination<UserCenterEmployee> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        List<UserCenterEmployee> list = sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.queryEmployeePageList", pagination);
        int totalRecords = sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterEmployeeDao.queryEmployeePageRecords", pagination);
        return paginationTo.setList(list, totalRecords);
    }

    @Override
    public List<UserCenterEmployee> queryEmployeeApp(UserCenterEmployee centerEmployee) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.queryEmployeeApp", centerEmployee);
    }

    @Override
    public List<UserCenterHandoverContract> queryHandoverRecordByConID(UserContract userContract) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.queryHandoverRecordByConID", userContract);
    }

    @Override
    public UserCenterHandoverContract queryHandoverRecordLastByConID(Integer contractObject_Id) {
        UserCenterHandoverContract userCenterHandoverContract = new UserCenterHandoverContract();
        userCenterHandoverContract.setContractObject_Id(contractObject_Id);
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterEmployeeDao.queryHandoverRecordLastByConID", userCenterHandoverContract);
    }

    @Override
    public int insertHandoverRecord(UserCenterHandoverContract userCenterHandoverContract) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.UserCenterEmployeeDao.insertHandoverRecord", userCenterHandoverContract);
    }

    @Override
    public List<Integer> checkRoleJdjustPrice(UserCenterEmployee userCenterEmployee) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.checkRoleJdjustPrice", userCenterEmployee);
    }

    @Override
    public UserCenterEmployee selectUserCenterEmployeeInfo(UserCenterEmployee userCenterEmployee) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterEmployeeDao.selectUserCenterEmployeeInfo", userCenterEmployee);
    }

    @Override
    public List<Map<String, Object>> selectdepartment(Company company) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.selectdepartment", company);
    }

    @Override
    public List<Company> queryAllCompany() {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.queryAllCompany");
    }

    @Override
    public List<Company> appQueryAllCompany() {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserCenterEmployeeDao.appQueryAllCompany");
    }

    @Override
    public UserCenterEmployee selectUserCenterManage(UserCenterEmployee userCenterEmployee) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterEmployeeDao.selectUserCenterManage", userCenterEmployee);
    }

    @Override
    public Company queryCompanyInfo(Company company) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterEmployeeDao.queryCompanyInfo", company);
    }

    @Override
    public Integer InsertOneLogin(EmployeeOneLogin employeeOneLogin) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.UserCenterEmployeeDao.InsertOneLogin", employeeOneLogin);
    }

    @Override
    public Integer updateEmployeeOneLogin(EmployeeOneLogin employeeOneLogin) {
        return sqlSessionTemplateUser.update("com.gjp.dao.UserCenterEmployeeDao.updateEmployeeOneLogin", employeeOneLogin);
    }

    @Override
    public EmployeeOneLogin queryEmployeeOneLogin(EmployeeOneLogin employeeOneLogin) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserCenterEmployeeDao.queryEmployeeOneLogin", employeeOneLogin);
    }
}
