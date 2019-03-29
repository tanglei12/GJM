package com.gjp.dao;

import com.gjp.model.*;
import com.gjp.util.Pagination;

import java.util.List;
import java.util.Map;

/**
 * 内部职员dao
 *
 * @author zoe
 */
public interface UserCenterEmployeeDao {

    /**
     * 根据内部职员编码查询内部职员
     *
     * @param id
     * @return
     */
    UserCenterEmployee selectUserCenterEmployeeById(int id);

    /**
     * 根据人员编码查询部门主管
     *
     * @param id
     * @return
     */
    List<UserCenterEmployee> selectUserCenterEmployeeZG(UserCenterEmployee userCenterEmployee);

    /**
     * 根据人员编码查询公司
     *
     * @param id
     * @return
     */
    List<UserCenterEmployee> selectUserCenterEmployeeCompany(UserCenterEmployee userCenterEmployee);

    /**
     * 根据人员编码查询管家婆
     *
     * @param id
     * @return
     */
    List<UserCenterEmployee> selectUserCenterEmployeeCompanyGjp(UserCenterEmployee userCenterEmployee);

    /**
     * 根据人员编码查询部门编码
     *
     * @param id
     * @return
     */
    List<UserCenterEmployee> selectUserCenterEmployeeUCC(UserCenterEmployee userCenterEmployee);

    /**
     * 查询所有在职人员账号
     *
     * @param id
     * @return
     */
    List<UserCenterEmployee> selectALLAccount();

    /**
     * 查询所有在职人员聊天数据
     *
     * @param id
     * @return
     */
    List<UserCenterEmployee> selectALLMessage();

    /**
     * 查询服务部门主管
     *
     * @param id
     * @return
     */
    List<UserCenterEmployee> selectUserCenterEmployeeService();

    /**
     * 查询空闲内部人员
     *
     * @return
     */
    List<UserCenterEmployee> selectUserCenterEmployee();

    /**
     * 查询销售部门
     *
     * @return
     * @author 陈智颖
     */
    List<Company> selectSaleCompany();

    /**
     * 查询销售部门人员职位
     *
     * @return
     * @author 陈智颖
     */
    List<PersionVo> selectSaleCompanyPersion(PersionVo persionVo);

    /**
     * 登陆查询内部人员
     *
     * @param userCenterEmployee
     * @return
     */
    UserCenterEmployee selectUserCenterEmployeeByName(UserCenterEmployee userCenterEmployee);

    /**
     * 登陆查询内部人员
     *
     * @param userCenterEmployee
     * @return
     */
    UserCenterEmployee selectUserCenterEmployeeByPhone(UserCenterEmployee userCenterEmployee);

    /**
     * 判断账号是否存在
     *
     * @param userCenterEmployee
     * @return
     */
    List<UserCenterEmployee> selectAccount(UserCenterEmployee userCenterEmployee);

    /**
     * 根据部门编码查询人员
     *
     * @param userCenterEmployee
     * @return
     */
    List<UserCenterEmployee> selectCompanyID(UserCenterEmployee userCenterEmployee);

    /**
     * 根据用户账号查询权限
     *
     * @param userCenterEmployee
     * @return
     */
    List<UserCenterEmployee> selectAccountType(UserCenterEmployee userCenterEmployee);

    /**
     * 查询内部人员总数
     *
     * @param userCenterEmployee
     * @return
     */
    List<UserCenterEmployee> selectEmployeeSize(UserCenterEmployee userCenterEmployee);

    /**
     * 根据人员编码查询经理
     *
     * @param userCenterEmployee
     * @return
     */
    List<UserCenterEmployee> selectUserCenterEmployeeJL();

    /**
     * 查询内部人员
     *
     * @param userCenterEmployee
     * @return
     */
    List<UserCenterEmployee> selectEmployee(UserCenterEmployee userCenterEmployee);

    /**
     * 插入内部人员
     *
     * @param userCenterEmployee
     * @return
     */
    Integer insertUserCenterEmployee(UserCenterEmployee userCenterEmployee);

    /**
     * 修改内部人员
     *
     * @param userCenterEmployee
     * @return
     */
    Integer updatetUserCenterEmployee(UserCenterEmployee userCenterEmployee);

    List<UserCenterEmployee> selectEmployeeByPosition(String em_position);

    UserCenterEmployee selectEmployeeById(Integer em_id);

    /**
     * 查询收录人
     *
     * @param em_name
     * @return
     */
    List<Integer> selectIdByName(String em_name);

    /**
     * 内部人员分页列表
     *
     * @param pagination
     * @return
     * @author JiangQT
     */
    List<UserCenterEmployee> queryUserCenterEmployeeList(Pagination<UserCenterEmployee> pagination);

    int queryUserCenterEmployeeTotalRecords(Pagination<UserCenterEmployee> pagination);

    /**
     * 修改密码
     *
     * @param userCenterEmployee
     * @return
     * @author zoe
     */
    int updatePs(UserCenterEmployee userCenterEmployee);

    /**
     * 根据编号查询用户
     *
     * @param user_id
     * @return
     * @author zoe
     */
    UserCenter selectUserCenter(Integer user_id);

    /**
     * 修改人员信息
     *
     * @param userCenterEmployee
     * @return
     * @author zoe
     */
    int updateEmployeeById(UserCenterEmployee userCenterEmployee);

    /**
     * 添加角色
     *
     * @param role
     * @return
     * @author zoe
     */
    int addRole(Role role);

    /**
     * 本人修改人员信息
     *
     * @param userCenterEmployee
     * @return
     * @author zoe
     */
    int updateUser(UserCenterEmployee userCenterEmployee);

    /**
     * 修改头像
     *
     * @param userCenterEmployee
     * @return
     * @author zoe
     */
    int updateImage(UserCenterEmployee userCenterEmployee);

    /**
     * 根据内部人员编号查询部门
     *
     * @param userCenterEmployees
     * @return
     * @author zoe
     */
    List<Integer> selectDepartmentById(UserCenterEmployee userCenterEmployees);

    /**
     * 根据部门编号查询所有下属人员
     *
     * @param ucc_id
     * @return
     * @author zoe
     */
    List<UserCenterEmployee> selectUserCenterEmployeeByDepartment(Integer ucc_id);

    /**
     * 查询所有部门
     *
     * @return
     * @author 刘强
     */
    List<Company> selectAllCompany();

    /**
     * 查询人员信息
     *
     * @return
     * @Description:
     * @author JiangQt
     */
    ViewEmployeePositionCompanyVo selectEmployeePositionCompanyWhere(ViewEmployeePositionCompanyVo vo);

    /**
     * 查询人员信息列表
     *
     * @param positionCompanyVo
     * @return
     * @作者 JiangQT
     * @日期 2016年6月20日
     */
    List<ViewEmployeePositionCompanyVo> selectEmployeePositionCompanyList(ViewEmployeePositionCompanyVo positionCompanyVo);

    /**
     * 部门分页信息
     *
     * @param positionCompanyVo
     * @return
     * @author 陈智颖
     */
    List<Company> queryDepartmentList(Pagination<Company> pagination);

    /**
     * 部门分页信息总数
     *
     * @param positionCompanyVo
     * @return
     * @author 陈智颖
     */
    int queryDepartmentListNum(Pagination<Company> pagination);

    /**
     * 查询用户负责人
     *
     * @param employee
     * @return
     * @作者 JiangQT
     * @日期 2016年10月27日
     */
    UserCenterEmployee queryEmployeeHead(UserCenterEmployee employee);

    /**
     * 设置职工权限
     *
     * @param map
     * @return
     * @author 王孝元
     */
    int savePowersForPerson(Map<String, Object> map);

    /**
     * 删除人员权限关联
     *
     * @param id
     * @return
     * @author 王孝元
     */
    int delFromPersonPowers(Integer id);

    /**
     * 查询人员拥有权限
     *
     * @param id
     * @return
     * @author 王孝元
     */
    List<Powers> selectPowersByPersonId(Integer id);

    /**
     * 查询人员所在职位
     *
     * @param id
     * @return
     * @author 王孝元
     */
    List<Position> selectPositionByPersonId(Integer id);

    /**
     * 查询人员所在部门
     *
     * @param id
     * @return
     * @author 王孝元
     */
    List<Company> selectCompanyByPersonId(Integer id);

    /**
     * 修改内部人员状态
     *
     * @param userCenterEmployee
     * @return
     * @author 陈智颖
     */
    int updateState(UserCenterEmployee userCenterEmployee);

    /**
     * 根据员工姓名和电话查询员工列表
     *
     * @param employee
     * @return
     * @author 王孝元
     */
    List<UserCenterEmployee> selectPersonsByNameOrPhone(UserCenterEmployee employee);

    /**
     * 查询人员列表
     *
     * @param employee
     * @return
     * @author 王孝元
     */
    List<UserCenterEmployee> selectEmployeeList(UserCenterEmployee employee);

    /**
     * 查询人员列表总数(分页)
     *
     * @param employee
     * @return
     * @author 王孝元
     */
    int selectEmployeeListCount(UserCenterEmployee employee);

    /**
     * 插入人员合同分配表
     *
     * @param userContract
     * @return
     * @author 陈智颖
     */
    int insertUserContract(UserContract userContract);

    /**
     * 根据用户ID删除人员合同
     *
     * @param userContract
     * @return
     * @author 陈智颖
     */
    int deleteUserContract(UserContract userContract);

    /**
     * 根据用户合同编码修改状态
     *
     * @param userContract
     * @return
     * @author 陈智颖
     */
    int updatetUserContract(UserContract userContract);

    /**
     * 人员离职申请
     *
     * @param userCenterEmployee
     * @return
     * @author 陈智颖
     */
    int updatetCloseCompany(UserCenterEmployee userCenterEmployee);

    /**
     * 根据用户编码和合同状态查询人员合同信息
     *
     * @param userCenterEmployee
     * @return
     * @author 陈智颖
     */
    List<UserCenterEmployee> selectHouseEmContract(UserCenterEmployee userCenterEmployee);

    /**
     * 根据ID查询分配表
     *
     * @param userCenterEmployee
     * @return
     * @author 陈智颖
     */
    List<UserContract> selectUserContract(UserContract userContract);

    /**
     * 根据用户编码和合同类型查询信息
     *
     * @param userCenterEmployee
     * @return
     * @author 陈智颖
     */
    List<UserCenterEmployee> selectHouseEmContractEm(UserCenterEmployee userCenterEmployee);

    /**
     * 根据用户编码和合同类型查询信息是否存在
     *
     * @param userCenterEmployee
     * @return
     * @author 陈智颖
     */
    int selectHouseEmContractEmBool(UserCenterEmployee userCenterEmployee);

    /**
     * 查询管家信息
     *
     * @param centerEmployee
     * @return
     * @作者 JiangQT
     * @日期 2016年11月25日
     */
    UserCenterEmployee queryEmployeeInfo(UserCenterEmployee centerEmployee);

    /**
     * 查询公司列表
     *
     * @param company
     * @return
     * @作者 JiangQT
     * @日期 2017年3月19日
     */
    List<Company> queryCompanyList(Company company);

    /**
     * 查询管家分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2017年3月19日
     */
    Pagination<UserCenterEmployee> queryEmployeePageList(Pagination<UserCenterEmployee> pagination);

    /**
     * 查询所有在职人员分页
     *
     * @param centerEmployee
     * @return
     * @author 陈智颖
     * @date Mar 28, 2017 9:07:35 PM
     */
    List<UserCenterEmployee> queryEmployeeApp(UserCenterEmployee centerEmployee);

    /**
     * 根据合同ID查询管家变更记录
     *
     * @param userContract
     * @return
     * @author shenhx
     * @date 2017-05-20
     */
    List<UserCenterHandoverContract> queryHandoverRecordByConID(UserContract userContract);

    UserCenterHandoverContract queryHandoverRecordLastByConID(Integer contractObject_Id);

    /**
     * 插入合同管家变更记录
     *
     * @param userCenterHandoverContract
     * @return
     */
    int insertHandoverRecord(UserCenterHandoverContract userCenterHandoverContract);

    /**
     * 查询是否有权限进行出房调价
     *
     * @param em_id
     * @param ucps_url
     * @return
     */
    List<Integer> checkRoleJdjustPrice(UserCenterEmployee userCenterEmployee);

    /**
     * 查询内部人员部门
     *
     * @author tanglei
     */
    UserCenterEmployee selectUserCenterEmployeeInfo(UserCenterEmployee userCenterEmployee);

    /**
     * 查询各部门主管
     *
     * @author tanglei
     */
    List<Map<String, Object>> selectdepartment(Company company);

    /**
     * 查询所有部门
     *
     * @return
     */
    List<Company> queryAllCompany();

    /**
     * 查询所有部门
     *
     * @return
     */
    List<Company> appQueryAllCompany();

    /**
     * 根据房屋编号查询管家
     *
     * @author tanglei
     * @Date 2017年7月22日  上午11:03:55
     */
    UserCenterEmployee selectUserCenterManage(UserCenterEmployee userCenterEmployee);

    /**
     * 查询门店信息
     *
     * @param company
     * @return
     */
    Company queryCompanyInfo(Company company);

    //------------------------------------单点登陆--------------------------------------------

    /**
     * 插入登陆人
     *
     * @param employeeOneLogin
     * @return
     */
    Integer InsertOneLogin(EmployeeOneLogin employeeOneLogin);

    /**
     * 修改登陆人
     * */
    Integer updateEmployeeOneLogin(EmployeeOneLogin employeeOneLogin);

    /**
     * 查询单点登陆
     * */
    EmployeeOneLogin queryEmployeeOneLogin(EmployeeOneLogin employeeOneLogin);
}
