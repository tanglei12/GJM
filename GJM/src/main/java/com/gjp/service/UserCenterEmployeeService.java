package com.gjp.service;

import com.alipay.api.AlipayApiException;
import com.gjp.dao.*;
import com.gjp.model.*;
import com.gjp.util.Pagination;
import com.gjp.util.SendMsg;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 内部职员service
 *
 * @author zoe
 */
@Service
public class UserCenterEmployeeService {

    @Resource
    private UserCenterEmployeeDao employeeDao;

    @Resource
    private ContractDao contractDao;

    @Resource
    private HouseLibraryDao housingLibraryDao;

    @Resource
    private UserCenterEmployeeDao userCenterEmployeeDao;

    @Resource
    private CustomerDAO customerDAO;

    @Resource
    private SmsService smsService;

    @Resource
    private HouseLibraryService houseLibraryService;

    @Resource
    private RentHouseService rentHouseService;
    // 内部人员
    @Resource
    private UserCenterEmployeeService userCenterEmployeeService;

    @Resource
    private AuthorizationDao authorizationDao;

    @Resource
    private ServiceService serviceService;

    /**
     * 根据内部职员编码查询内部职员
     *
     * @param id
     * @return
     */
    public UserCenterEmployee selectUserCenterEmployeeById(int id) {
        return employeeDao.selectUserCenterEmployeeById(id);
    }

    /**
     * 根据人员编码查询部门主管
     *
     * @return
     */
    public List<UserCenterEmployee> selectUserCenterEmployeeZG(UserCenterEmployee userCenterEmployee) {
        return employeeDao.selectUserCenterEmployeeZG(userCenterEmployee);
    }

    /**
     * 查询所有在职人员账号
     *
     * @return
     */
    public List<UserCenterEmployee> selectALLAccount() {
        return employeeDao.selectALLAccount();
    }

    /**
     * 查询所有在职人员聊天数据
     *
     * @return
     */
    public List<UserCenterEmployee> selectALLMessage() {
        return employeeDao.selectALLMessage();
    }

    /**
     * 查询服务部门主管
     *
     * @return
     */
    public List<UserCenterEmployee> selectUserCenterEmployeeService() {
        return employeeDao.selectUserCenterEmployeeService();
    }

    /**
     * 查询内部人员list
     *
     * @return
     */
    public List<UserCenterEmployee> selectUserCenterEmployee() {
        return employeeDao.selectUserCenterEmployee();
    }

    /**
     * 根据部门编码查询人员
     *
     * @param userCenterEmployee
     * @return
     * @author 陈智颖
     */
    public List<UserCenterEmployee> selectCompanyID(UserCenterEmployee userCenterEmployee) {
        return employeeDao.selectCompanyID(userCenterEmployee);
    }

    /**
     * 登陆查询内部人员
     *
     * @param userCenterEmployee
     * @return
     */
    public UserCenterEmployee selectUserCenterEmployeeByName(UserCenterEmployee userCenterEmployee) {
        return employeeDao.selectUserCenterEmployeeByName(userCenterEmployee);
    }

    /**
     * 登陆查询内部人员
     *
     * @param userCenterEmployee
     * @return
     */
    public UserCenterEmployee selectUserCenterEmployeeByPhone(UserCenterEmployee userCenterEmployee) {
        return employeeDao.selectUserCenterEmployeeByPhone(userCenterEmployee);
    }

    /**
     * 判断用户名是否存在
     *
     * @param userCenterEmployee
     * @return
     */
    public List<UserCenterEmployee> selectAccount(UserCenterEmployee userCenterEmployee) {
        return employeeDao.selectAccount(userCenterEmployee);
    }

    /**
     * 查询销售部门
     *
     * @return
     * @author 陈智颖
     */
    public List<Company> selectSaleCompany() {
        return employeeDao.selectSaleCompany();
    }

    /**
     * 查询销售部门人员职位
     *
     * @return
     * @author 陈智颖
     */
    public List<PersionVo> selectSaleCompanyPersion(PersionVo persionVo) {
        return employeeDao.selectSaleCompanyPersion(persionVo);
    }

    /**
     * 根据用户账号查询权限
     *
     * @param userCenterEmployee
     * @return
     */
    public List<UserCenterEmployee> selectAccountType(UserCenterEmployee userCenterEmployee) {
        return employeeDao.selectAccountType(userCenterEmployee);
    }

    /**
     * 查询内部人员总数
     *
     * @param userCenterEmployee
     * @return
     */
    public List<UserCenterEmployee> selectEmployeeSize(UserCenterEmployee userCenterEmployee) {
        return employeeDao.selectEmployeeSize(userCenterEmployee);
    }

    /**
     * 查询内部人员
     *
     * @param userCenterEmployee
     * @return
     */
    public List<UserCenterEmployee> selectEmployee(UserCenterEmployee userCenterEmployee) {
        return employeeDao.selectEmployee(userCenterEmployee);
    }

    /**
     * 插入内部人员
     *
     * @param userCenterEmployee
     * @return
     */
    @Transactional(rollbackFor = Exception.class)
    public Integer insertUserCenterEmployee(UserCenterEmployee userCenterEmployee) {
        return employeeDao.insertUserCenterEmployee(userCenterEmployee);
    }

    /**
     * 修改内部人员
     *
     * @param userCenterEmployee
     * @return
     */
    @Transactional(rollbackFor = Exception.class)
    public Integer updatetUserCenterEmployee(UserCenterEmployee userCenterEmployee) {
        return employeeDao.updatetUserCenterEmployee(userCenterEmployee);
    }

    public List<UserCenterEmployee> selectEmployeeByPosition(String em_position) {
        return employeeDao.selectEmployeeByPosition(em_position);
    }

    public UserCenterEmployee selectEmployeeById(Integer em_id) {
        return employeeDao.selectEmployeeById(em_id);
    }

    /**
     * 查询收录人
     *
     * @param em_name
     * @return
     */
    public List<Integer> selectIdByName(String em_name) {
        return employeeDao.selectIdByName(em_name);
    }

    public List<UserCenterEmployee> queryUserCenterEmployeeList(Pagination<UserCenterEmployee> pagination) {
        return employeeDao.queryUserCenterEmployeeList(pagination);
    }

    /**
     * 部门分页信息
     *
     * @param pagination
     * @return
     * @author 陈智颖
     */
    public List<Company> queryDepartmentList(Pagination<Company> pagination) {
        return employeeDao.queryDepartmentList(pagination);
    }

    /**
     * 部门分页信息总数
     *
     * @param pagination
     * @return
     * @author 陈智颖
     */
    public int queryDepartmentListNum(Pagination<Company> pagination) {
        return employeeDao.queryDepartmentListNum(pagination);
    }

    public int queryUserCenterEmployeeTotalRecords(Pagination<UserCenterEmployee> pagination) {
        return employeeDao.queryUserCenterEmployeeTotalRecords(pagination);
    }

    /**
     * 修改密码
     *
     * @param userCenterEmployee
     * @return
     * @author zoe
     */
    public int updatePs(UserCenterEmployee userCenterEmployee) {
        return employeeDao.updatePs(userCenterEmployee);
    }

    /**
     * 根据编号查询用户
     *
     * @param user_id
     * @return
     * @author zoe
     */
    public UserCenter selectUserCenter(Integer user_id) {
        return employeeDao.selectUserCenter(user_id);
    }

    /**
     * 修改人员信息
     *
     * @param userCenterEmployee
     * @return
     * @author zoe
     */
    public int updateEmployeeById(UserCenterEmployee userCenterEmployee) {
        return employeeDao.updateEmployeeById(userCenterEmployee);
    }

    /**
     * 添加角色
     *
     * @param role
     * @return
     * @author zoe
     */
    public int addRole(Role role) {
        return employeeDao.addRole(role);
    }

    /**
     * 本人修改人员信息
     *
     * @param userCenterEmployee
     * @return
     * @author zoe
     */
    public int updateUser(UserCenterEmployee userCenterEmployee) {
        return employeeDao.updateUser(userCenterEmployee);
    }

    /**
     * 修改头像
     *
     * @return
     * @author zoe
     */
    public int updateImage(UserCenterEmployee userCenterEmployee) {
        return employeeDao.updateImage(userCenterEmployee);
    }

    /**
     * 根据内部人员编号查询部门
     *
     * @param userCenterEmployees
     * @return
     * @author zoe
     */
    public List<Integer> selectDepartmentById(UserCenterEmployee userCenterEmployees) {
        return employeeDao.selectDepartmentById(userCenterEmployees);
    }

    /**
     * 根据部门编号查询所有下属人员
     *
     * @return
     * @author zoe
     */
    public List<UserCenterEmployee> selectUserCenterEmployeeByDepartment(Integer ucc_id) {
        return employeeDao.selectUserCenterEmployeeByDepartment(ucc_id);
    }

    /**
     * 查询所有部门
     *
     * @return
     * @author 刘强
     */
    public List<Company> selectAllCompany() {
        return employeeDao.selectAllCompany();
    }

    /**
     * 查询人员信息
     *
     * @return
     * @Description:
     * @author JiangQt
     */
    public ViewEmployeePositionCompanyVo selectEmployeePositionCompanyWhere(ViewEmployeePositionCompanyVo vo) {
        return employeeDao.selectEmployeePositionCompanyWhere(vo);
    }

    /**
     * 查询人员信息列表
     *
     * @param positionCompanyVo
     * @return
     * @作者 JiangQT
     * @日期 2016年6月20日
     */
    public List<ViewEmployeePositionCompanyVo> selectEmployeePositionCompanyList(ViewEmployeePositionCompanyVo positionCompanyVo) {
        return employeeDao.selectEmployeePositionCompanyList(positionCompanyVo);
    }

    /**
     * 查询用户负责人
     *
     * @param em_id
     * @return
     * @作者 JiangQT
     * @日期 2016年10月27日
     */
    public UserCenterEmployee queryEmployeeHead(Integer em_id) {
        UserCenterEmployee employee = new UserCenterEmployee();
        employee.setEm_id(em_id);
        return employeeDao.queryEmployeeHead(employee);
    }

    /**
     * 查询用户负责人
     *
     * @param employee
     * @return
     * @作者 JiangQT
     * @日期 2016年10月27日
     */
    public UserCenterEmployee queryEmployeeHead(UserCenterEmployee employee) {
        return employeeDao.queryEmployeeHead(employee);
    }

    /**
     * 设置人员权限
     *
     * @param powerIds
     * @param id
     * @return
     * @author 王孝元
     */
    public int setPowersForPerson(Integer[] powerIds, Integer id) {
        // 1.先删除已有权限
        employeeDao.delFromPersonPowers(id);
        // 2.再设置权限
        Map<String, Object> map = new HashMap<>();
        map.put("powerIds", powerIds);
        map.put("personId", id);
        return employeeDao.savePowersForPerson(map);
    }

    /**
     * 查询人员拥有的权限
     *
     * @param id
     * @return
     * @author 王孝元
     */
    public List<Powers> selectPowersByPersonId(Integer id) {
        return employeeDao.selectPowersByPersonId(id);
    }

    /**
     * 查询人员所在职位
     *
     * @param id
     * @return
     * @author 王孝元
     */
    public List<Position> selectPositionByPersonId(Integer id) {
        return employeeDao.selectPositionByPersonId(id);
    }

    /**
     * 查询人员所在部门
     *
     * @param id
     * @return
     * @author 王孝元
     */
    public List<Company> selectCompanyByPersonId(Integer id) {
        return employeeDao.selectCompanyByPersonId(id);
    }

    public int updateState(UserCenterEmployee userCenterEmployee) {
        return employeeDao.updateState(userCenterEmployee);
    }

    /**
     * 根据员工姓名和电话查询员工列表
     *
     * @param whereList
     * @return
     * @author 王孝元
     */
    public List<UserCenterEmployee> getPersonsByNameOrPhone(String whereList) {
        UserCenterEmployee employee = new UserCenterEmployee();
        employee.setWhereList(whereList);
        employee.setStart(0);
        employee.setEnd(13);
        return employeeDao.selectPersonsByNameOrPhone(employee);
    }

    /**
     * 查询人员列表
     *
     * @param employee
     * @return
     * @author 王孝元
     */
    public List<UserCenterEmployee> selectEmployeeList(UserCenterEmployee employee) {
        return employeeDao.selectEmployeeList(employee);
    }

    /**
     * 查询人员列表总数(分页)
     *
     * @param employee
     * @return
     * @author 王孝元
     */
    public int selectEmployeeListCount(UserCenterEmployee employee) {
        return employeeDao.selectEmployeeListCount(employee);
    }

    /**
     * 插入人员合同分配表
     *
     * @param userContract
     * @return
     * @author 陈智颖
     */
    public int insertUserContract(UserContract userContract) {
        return employeeDao.insertUserContract(userContract);
    }

    /**
     * 根据用户ID删除人员合同
     *
     * @param userContract
     * @return
     * @author 陈智颖
     */
    public int deleteUserContract(UserContract userContract) {
        return employeeDao.deleteUserContract(userContract);
    }

    /**
     * 根据用户合同编码修改状态
     *
     * @param userContract
     * @return
     * @author 陈智颖
     */
    public int updatetUserContract(UserContract userContract) {
        return employeeDao.updatetUserContract(userContract);
    }

    /**
     * 人员离职申请
     *
     * @return
     * @author 陈智颖
     */
   /* public int updatetCloseCompany(UserCenterEmployee userCenterEmployee, Integer state) {

        int bools = 0;
        bools = employeeDao.updatetCloseCompany(userCenterEmployee);
        if (state == 1) {
            List<UserCenterEmployee> selectHouseEmContract = employeeDao.selectHouseEmContract(userCenterEmployee);
            for (UserCenterEmployee userCenterEmployee2 : selectHouseEmContract) {
                UserContract userContract = new UserContract();
                userContract.setEm_id(userCenterEmployee2.getEm_id());
                userContract.setContractObject_Id(userCenterEmployee2.getContractObject_Id());
                userContract.setUc_state(0);
                userContract.setUc_emType(userCenterEmployee2.getCre_role());
                userContract.setNew_em(userCenterEmployee2.getEm_id());
                userContract.setContract_perforSplit(userCenterEmployee2.getContract_perforSplit());
                employeeDao.insertUserContract(userContract);
            }
        }
        return bools;
    }*/

    /**
     * 人员离职申请
     *
     * @return
     * @author 陈智颖
     */
    public int updatetCloseCompany(UserCenterEmployee userCenterEmployee, Integer state) {

        int bools = 0;
        bools = employeeDao.updatetCloseCompany(userCenterEmployee);
        return bools;
    }

    /**
     * 根据用户编码和合同类型查询信息
     *
     * @param userCenterEmployee
     * @return
     * @author 陈智颖
     */
    public List<UserCenterEmployee> selectHouseEmContractEm(UserCenterEmployee userCenterEmployee) {
        return employeeDao.selectHouseEmContractEm(userCenterEmployee);
    }


    public List<UserCenterEmployee> selectHouseEmContract(UserCenterEmployee userCenterEmployee) {
        return employeeDao.selectHouseEmContract(userCenterEmployee);
    }

    /**
     * 提交对房屋分配
     *
     * @param contractNo 合同数组
     * @param em_id      现用户编码
     * @param type       类型：租赁合同or托管合同
     * @return
     * @author 陈智颖
     */
    /*public Map<String, Object> addSubmitArrange(List<Object> contractNo, Integer em_id, String type) {
        Map<String, Object> map = new HashMap<>();

        int bools = 0;

        for (int i = 0; i < contractNo.size(); i++) {
            UserContract userContract = new UserContract();
            userContract.setContractObject_Id(Integer.parseInt(contractNo.get(i).toString()));
            userContract.setUc_state(1);
            userContract.setNew_em(em_id);
            bools = employeeDao.updatetUserContract(userContract);

            if (bools > 0) {
                ContractObjectVo userCenterContractObject = new ContractObjectVo();
                userCenterContractObject.setContractObject_Id(Integer.parseInt(contractNo.get(i).toString()));
                List<ContractObjectVo> selectContractEm = contractDao.selectContractEm(userCenterContractObject);

                UserContract userContract1 = new UserContract();
                userContract1.setContractObject_Id(Integer.parseInt(contractNo.get(i).toString()));
                List<UserContract> selectUserContract = employeeDao.selectUserContract(userContract1);
                UserCenterEmployee selectEmployeeByIdOld = employeeDao.selectEmployeeById(selectUserContract.get(0).getEm_id());

                UserCenterEmployee selectEmployeeById = employeeDao.selectEmployeeById(em_id);
                UserCustomer userCustomer = new UserCustomer();
                userCustomer.setCc_code(selectContractEm.get(0).getContractObject_1st());
                UserCustomer queryCustomerID = customerDAO.queryCustomerInfo(userCustomer);
                String message = "【管家婆】尊敬的" + queryCustomerID.getCc_name() + "：您的管家" + selectEmployeeByIdOld.getEm_name() + "由于个人原因已经离职，您现在的专属管家为" + selectEmployeeById.getEm_name() + "，电话" + selectEmployeeById.getEm_phone() + "。感谢您选择管家婆，如有疑问请您与管家婆财务88067511分机2联系。祝您工作顺利，万事如意！";
                boolean booSend = SendMsg.htSendMessage(queryCustomerID.getCcp_phone(), message, "");

                // 保存发送到客户的短信记录
                UserCenterInformation userCenterInformation = new UserCenterInformation();
                userCenterInformation.setHi_code(selectContractEm.get(0).getHi_code());
                userCenterInformation.setContractObject_code(selectContractEm.get(0).getContractObject_Code());
                userCenterInformation.setMsg_content(message);
                userCenterInformation.setSend_result(booSend ? 1 : 0);
                userCenterInformation.setEm_id(1);// 系统
                userCenterInformation.setReceive_type(1);
                userCenterInformation.setReceive_cc_code(selectContractEm.get(0).getContractObject_1st());
                userCenterInformation.setSend_time(new Date());
                smsService.addUserCenterInformation(userCenterInformation);
            }
        }

        if (bools > 0) {
            map.put("message", "success");
        } else {
            map.put("message", "error");
        }

        return map;
    }*/


    /**
     * 提交对房屋分配
     *
     * @param contractID  合同id
     * @param em_id       现用户编码
     * @param type        类型：租赁合同or托管合同
     * @param newEm_id    (将要分配的管家)
     * @param change_type 变更类型(如1离职,2调换)
     * @return
     * @author 陈智颖
     */
    public Map<String, Object> addSubmitArrange(Integer contractID, Integer em_id, String type, Integer newEm_id, Integer change_type, Integer cir_author) throws Exception {
        Map<String, Object> map = new HashMap<>();

        //根据合同编号/合同类型/查询将要分配的房源(结果包含主管家和副管家)
        UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
        userCenterEmployee.setContractObject_Type(type);
        userCenterEmployee.setContractObject_Id(Integer.valueOf(contractID));
        List<UserCenterEmployee> selectHouseEmContract = userCenterEmployeeService.selectHouseEmContract(userCenterEmployee);

        //将合同 主副管家信息保存在UserContract
        UserContract userContract = new UserContract();
        for (UserCenterEmployee userCenterEmployee2 : selectHouseEmContract) {
            userContract.setContractObject_Id(userCenterEmployee2.getContractObject_Id());
            if (userCenterEmployee2.getCre_role() == 1) {
                userContract.setMain_em(userCenterEmployee2.getEm_id());
                userContract.setMain_contract_perforSplit(userCenterEmployee2.getContract_perforSplit());
            }
            if (userCenterEmployee2.getCre_role() == 2) {
                userContract.setDeputy_em(userCenterEmployee2.getEm_id());
                userContract.setDeputy_contract_perforSplit(userCenterEmployee2.getContract_perforSplit());
            }
        }
        userContract.setEm_id(em_id);
        userContract.setNew_em(newEm_id);
        //userContract.setUc_state(0);

        UserCenterEmployee userCenterEmployee1 = new UserCenterEmployee();
        userCenterEmployee1.setEm_id(em_id);
        userCenterEmployee1.setContractObject_Type(type);
        userCenterEmployee1.setContractObject_Id(Integer.valueOf(contractID));
        List<UserCenterEmployee> selectHouseEmContract1 = userCenterEmployeeService.selectHouseEmContract(userCenterEmployee1); //根据合同编号/合同类型/em_id查询将要分配的房源(当前离职管家)
        for (UserCenterEmployee userCenterEmployee2 : selectHouseEmContract1) {
            userContract.setUc_emType(userCenterEmployee2.getCre_role());
            userContract.setContract_perforSplit(userCenterEmployee2.getContract_perforSplit());
        }

        ContractObjectVo contractObjectVo = new ContractObjectVo();
        contractObjectVo.setContractObject_Id(contractID);
        ContractObjectVo contractObjectVo1 = contractDao.queryContractObject(contractObjectVo);//查询合同
        userContract.setContractObject_code(contractObjectVo1.getContractObject_Code());

        employeeDao.insertUserContract(userContract);//将合同管家信息寫入UserContract

        /**
         *分配管家/变更管家
         */
        changeHousekeeper(contractID, userContract.getUc_emType(), newEm_id, userContract.getContract_perforSplit(), change_type, em_id, cir_author, type);
        return map;
    }


    /**
     * 变更管家
     * contractObject_Id(合同ID)
     * uc_emType(当前要更换的管家类型)
     * new_em(将要分配的管家)
     * contract_perforSplitOld(原管家分成比列)
     * change_type变更类型(如离职,调换)
     * em_id      当前登录用户编码
     * type       类型：租赁合同or托管合同
     */
    public void changeHousekeeper(Integer contractObject_Id, Integer uc_emType, Integer new_em, Double contract_perforSplitOld, Integer change_type, Integer em_id, Integer cir_author, String type) {
        ContractObjectVo userCenterContractObject = new ContractObjectVo();
        userCenterContractObject.setContractObject_Id(contractObject_Id);
        List<ContractObjectVo> selectContractEm = contractDao.selectContractEm(userCenterContractObject); //根据合同编号查询将要分配的房源合同(结果包含主管家和副管家)
        ContractObjectVo contractObjectVo = new ContractObjectVo();
        contractObjectVo.setContractObject_Id(contractObject_Id);
        ContractObjectVo contractObjectVo1 = contractDao.queryContractObject(contractObjectVo);//查询合同
        if (selectContractEm.size() == 1) {//合同下只有一个管家(主管家),直接把合同分配给选择的管家
            ContractObjectVo userCenterContractObject1 = new ContractObjectVo();
            Integer contractObject_id = selectContractEm.get(0).getContractObject_Id();
            userCenterContractObject1.setContractObject_Id(contractObject_id);
            userCenterContractObject1.setEm_id(new_em);
            userCenterContractObject1.setContract_perforSplit(contract_perforSplitOld);
            userCenterContractObject1.setCre_role(1);
            contractDao.updatetContractEm(userCenterContractObject1);
            //记录执行记录
            addContractRecord(selectContractEm.get(0).getHi_code(), selectContractEm.get(0).getContractObject_Code(), change_type, selectContractEm.get(0).getEm_id(), cir_author);
            //管家变更记录
            addHandoverRecord(em_id, new_em, contractObject_Id);
            //托管合同最新管家变更和变更支付宝管家信息
            upHousePositionRecords(contractObjectVo1, new_em, em_id);
            //发送短信
            addUserCenterInformations(selectContractEm, contractObjectVo1, em_id, new_em, change_type);
        } else {
           /* if (new_em == null) {//有两个管家,未选择管家的情况下把副管家提升为主管家,业绩为主管家业绩+副管家业绩
                new_em = selectContractEm.get(1).getEm_id();
                // 删除副管家
                ContractObjectVo userCenterContractObject2 = new ContractObjectVo();
                userCenterContractObject2.setEm_id(selectContractEm.get(1).getEm_id());
                userCenterContractObject2.setContractObject_Id(selectContractEm.get(1).getContractObject_Id());
                contractDao.deleteContractEm(userCenterContractObject2);

                ContractObjectVo userCenterContractObject1 = new ContractObjectVo();
                userCenterContractObject1.setContractObject_Id(selectContractEm.get(0).getContractObject_Id());
                userCenterContractObject1.setEm_id(selectContractEm.get(1).getEm_id());
                userCenterContractObject1.setContract_perforSplit(contract_perforSplitOld + selectContractEm.get(1).getContract_perforSplit());
                userCenterContractObject1.setCre_role(1);
                contractDao.updatetContractEm(userCenterContractObject1);
            } else {*/
            if (uc_emType == 1) {//主管家离职
                if (contractObjectVo1.getContractObject_Type().equals("托管合同")) {//托管合同主管家离职
                    CompanyPserson companyPserson = new CompanyPserson();
                    companyPserson.setEm_id(selectContractEm.get(0).getEm_id());
                    List<CompanyPserson> companyPsersons1 = authorizationDao.selectCompanyPserson(companyPserson);//查主管家
                    companyPserson.setEm_id(selectContractEm.get(1).getEm_id());
                    List<CompanyPserson> companyPsersons2 = authorizationDao.selectCompanyPserson(companyPserson);//查副管家
                    if (companyPsersons2.get(0).getUcc_id() == companyPsersons1.get(0).getUcc_id()) {//副管家在主管家门店,删除主管家,副管家提升为主管家
                        ContractObjectVo userCenterContractObject2 = new ContractObjectVo();
                        userCenterContractObject2.setEm_id(selectContractEm.get(1).getEm_id());
                        userCenterContractObject2.setContractObject_Id(selectContractEm.get(1).getContractObject_Id());
                        contractDao.deleteContractEm(userCenterContractObject2);//删除副管家

                        ContractObjectVo userCenterContractObject1 = new ContractObjectVo();
                        userCenterContractObject1.setContractObject_Id(selectContractEm.get(0).getContractObject_Id());
                        userCenterContractObject1.setEm_id(selectContractEm.get(1).getEm_id());
                        userCenterContractObject1.setContract_perforSplit(selectContractEm.get(0).getContract_perforSplit() + selectContractEm.get(1).getContract_perforSplit());
                        userCenterContractObject1.setCre_role(1);
                        contractDao.updatetContractEm(userCenterContractObject1);//副管家提升为主管家,业绩为主管家业绩+副管家业绩(100%)

                        String hi_code = selectContractEm.get(0).getHi_code();
                        //记录执行记录
                        addContractRecord(hi_code, selectContractEm.get(0).getContractObject_Code(), change_type, selectContractEm.get(0).getEm_id(), cir_author);
                        //管家变更记录
                        addHandoverRecord(em_id, selectContractEm.get(1).getEm_id(), contractObject_Id);
                        //托管合同最新管家变更和变更支付宝管家信息
                        upHousePositionRecords(contractObjectVo1, selectContractEm.get(1).getEm_id(), em_id);
                        //发送短信
                        addUserCenterInformations(selectContractEm, contractObjectVo1, em_id, selectContractEm.get(1).getEm_id(), change_type);

                    } else {//副管家不在主管家门店,主管家替换为分配人(选择的管家)
                        ContractObjectVo userCenterContractObject1 = new ContractObjectVo();
                        userCenterContractObject1.setContractObject_Id(selectContractEm.get(0).getContractObject_Id());
                        userCenterContractObject1.setEm_id(new_em);
                        userCenterContractObject1.setContract_perforSplit(contract_perforSplitOld);
                        userCenterContractObject1.setCre_role(1);
                        contractDao.updatetContractEm(userCenterContractObject1);

                        //记录执行记录
                        addContractRecord(selectContractEm.get(0).getHi_code(), selectContractEm.get(0).getContractObject_Code(), change_type, selectContractEm.get(0).getEm_id(), cir_author);
                        //管家变更记录
                        addHandoverRecord(em_id, new_em, contractObject_Id);
                        //托管合同最新管家变更和变更支付宝管家信息
                        upHousePositionRecords(contractObjectVo1, new_em, em_id);
                        //发送短信
                        addUserCenterInformations(selectContractEm, contractObjectVo1, em_id, new_em, change_type);
                    }
                } else {//租领合同主管家离职
                    ContractObjectVo userCenterContractObject2 = new ContractObjectVo();
                    userCenterContractObject2.setEm_id(selectContractEm.get(1).getEm_id());
                    userCenterContractObject2.setContractObject_Id(selectContractEm.get(1).getContractObject_Id());
                    contractDao.deleteContractEm(userCenterContractObject2);//删除副管家

                    ContractObjectVo userCenterContractObject1 = new ContractObjectVo();
                    userCenterContractObject1.setContractObject_Id(selectContractEm.get(0).getContractObject_Id());
                    userCenterContractObject1.setEm_id(selectContractEm.get(1).getEm_id());
                    userCenterContractObject1.setContract_perforSplit(selectContractEm.get(0).getContract_perforSplit() + selectContractEm.get(1).getContract_perforSplit());
                    userCenterContractObject1.setCre_role(1);
                    contractDao.updatetContractEm(userCenterContractObject1);//副管家提升为主管家(主管家信息改为副管家信息),业绩为主管家业绩+副管家业绩(100%)

                    //记录执行记录
                    addContractRecord(selectContractEm.get(0).getHi_code(), selectContractEm.get(0).getContractObject_Code(), change_type, selectContractEm.get(0).getEm_id(), cir_author);
                    //管家变更记录
                    addHandoverRecord(em_id, selectContractEm.get(1).getEm_id(), contractObject_Id);
                    //托管合同最新管家变更和变更支付宝管家信息
                    upHousePositionRecords(contractObjectVo1, selectContractEm.get(1).getEm_id(), em_id);
                    //发送短信
                    addUserCenterInformations(selectContractEm, contractObjectVo1, em_id, selectContractEm.get(1).getEm_id(), change_type);
                }
            } else {//副管家离职
                ContractObjectVo userCenterContractObject2 = new ContractObjectVo();
                userCenterContractObject2.setEm_id(selectContractEm.get(1).getEm_id());
                userCenterContractObject2.setContractObject_Id(selectContractEm.get(1).getContractObject_Id());
                contractDao.deleteContractEm(userCenterContractObject2);//删除副管家

                ContractObjectVo userCenterContractObject1 = new ContractObjectVo();
                userCenterContractObject1.setContractObject_Id(selectContractEm.get(0).getContractObject_Id());
                userCenterContractObject1.setEm_id(selectContractEm.get(0).getEm_id());
                userCenterContractObject1.setContract_perforSplit(selectContractEm.get(0).getContract_perforSplit() + selectContractEm.get(1).getContract_perforSplit());
                userCenterContractObject1.setCre_role(1);
                contractDao.updatetContractEm(userCenterContractObject1);//主管家业绩为主管家业绩+副管家业绩(100%)
                //记录执行记录
                addContractRecord(selectContractEm.get(1).getHi_code(), selectContractEm.get(1).getContractObject_Code(), change_type, selectContractEm.get(1).getEm_id(), cir_author);
            }
                /*boolean boolt = false;
                Integer emID = 0;
                Integer contractID = 0;
                Double contract_perforSplit = 0.0;
                for (ContractObjectVo userCenterContractObject2 : selectContractEm) {
                    if (new_em == userCenterContractObject2.getEm_id() || userCenterContractObject2.getEm_id().equals(new_em)) {//新管家在合同中已经存在
                        emID = userCenterContractObject2.getEm_id();
                        contractID = userCenterContractObject2.getContractObject_Id();
                        contract_perforSplit = userCenterContractObject2.getContract_perforSplit();
                        boolt = true;
                        break;
                    }
                }

                if (boolt) {//新管家在合同中已经存在,删除其中一个,另一个作为主管家并加上删除管家的业绩
                    // 删除副管家
                    if (uc_emType == 1) {
                        ContractObjectVo userCenterContractObject2 = new ContractObjectVo();
                        userCenterContractObject2.setEm_id(emID);
                        userCenterContractObject2.setContractObject_Id(contractID);
                        contractDao.deleteContractEm(userCenterContractObject2);
                    } else {
                        ContractObjectVo userCenterContractObject2 = new ContractObjectVo();
                        userCenterContractObject2.setEm_id(selectContractEm.get(1).getEm_id());
                        userCenterContractObject2.setContractObject_Id(selectContractEm.get(1).getContractObject_Id());
                        contractDao.deleteContractEm(userCenterContractObject2);
                    }

                    ContractObjectVo userCenterContractObject1 = new ContractObjectVo();
                    userCenterContractObject1.setContractObject_Id(selectContractEm.get(0).getContractObject_Id());
                    userCenterContractObject1.setEm_id(new_em);
                    userCenterContractObject1.setContract_perforSplit(contract_perforSplitOld + contract_perforSplit);
                    userCenterContractObject1.setCre_role(1);
                    contractDao.updatetContractEm(userCenterContractObject1);
                } else {
                    if (uc_emType == 1) {//不存在就直接更换新管家
                        ContractObjectVo userCenterContractObject1 = new ContractObjectVo();
                        userCenterContractObject1.setContractObject_Id(selectContractEm.get(0).getContractObject_Id());
                        userCenterContractObject1.setEm_id(new_em);
                        userCenterContractObject1.setContract_perforSplit(contract_perforSplitOld);
                        userCenterContractObject1.setCre_role(1);
                        contractDao.updatetContractEm(userCenterContractObject1);
                    } else {
                        ContractObjectVo userCenterContractObject1 = new ContractObjectVo();
                        userCenterContractObject1.setContractObject_Id(selectContractEm.get(1).getContractObject_Id());
                        userCenterContractObject1.setEm_id(new_em);
                        userCenterContractObject1.setContract_perforSplit(contract_perforSplitOld);
                        userCenterContractObject1.setCre_role(2);
                        contractDao.updatetContractEm(userCenterContractObject1);
                    }

                }*/
            // }
        }
        //if (new_em != null) {
        //如果是托管合同需要把最新管家变更
           /* if (selectContractEm.get(0).getContractObject_Type().equals("托管合同")) {
                PositionRecordVo positionRecordVo = new PositionRecordVo();
                positionRecordVo.setHpr_newEmp(new_em);
                positionRecordVo.setHi_code(selectContractEm.get(0).getHi_code());
                housingLibraryDao.updateHousePositionRecords(positionRecordVo);
            }*/

       /* ContractImplRecordVo implementRecordVo = new ContractImplRecordVo();
        implementRecordVo.setHi_code(selectContractEm.get(0).getHi_code());
        implementRecordVo.setContractObject_code(selectContractEm.get(0).getContractObject_Code());
        implementRecordVo.setCir_type(1014);
        UserCenterEmployee employeeById1 = employeeDao.selectEmployeeById(em_id);
        String msg1 = "";
        if (change_type == 1) {//change_type==1离职发送的内容
            msg1 = "管家：" + employeeById1.getEm_name() + "离职，合同进行重新调整";
        }
        implementRecordVo.setCir_content(msg1);
        implementRecordVo.setCir_source(0);
        implementRecordVo.setCir_author(cir_author);
        implementRecordVo.setCir_createTime(new Date());
        contractDao.addHouseRecord(implementRecordVo);//记录执行记录*/

       /* // 添加合同交接记录
        UserCenterHandoverContract userCenterHandoverContract = new UserCenterHandoverContract();
        userCenterHandoverContract.setEm_id_old(em_id);
        userCenterHandoverContract.setEm_id_new(new_em);
        userCenterHandoverContract.setContractObject_Id(contractObject_Id);
        userCenterHandoverContract.setHandover_status(1);// 已分配
        userCenterHandoverContract.setHandover_time(new Date());
        employeeDao.insertHandoverRecord(userCenterHandoverContract);//记录合同交接*/


       /* if (contractObjectVo1.getContractObject_Type().equals("托管合同")) {
            //如果是托管合同需要把最新管家变更
            PositionRecordVo positionRecordVo = new PositionRecordVo();
            positionRecordVo.setHi_code(contractObjectVo1.getHi_code());
            positionRecordVo.setHpr_newEmp(new_em);
            housingLibraryDao.updateHousePositionRecords(positionRecordVo);

            // 变更支付宝管家信息
            // 判断否改房源已发布到支付宝平台
            RentHouseVo rentHouseVo = rentHouseService.queryRentHouseVo(contractObjectVo1.getHi_code());
            if (null != rentHouseVo && (rentHouseVo.getSync_state() != null && rentHouseVo.getSync_state() == 1)
                    && (rentHouseVo.getRoom_status() != null && rentHouseVo.getRoom_status() == 1)) {
                ViewHouseLibraryInfoVo houseLibraryInfoVo = houseLibraryService.queryHouseLibraryInfo(contractObjectVo1.getHi_code());
                UserCenterEmployee selectEmployeeByIdOld = employeeDao.selectEmployeeById(em_id);
                UserCenterEmployee selectEmployeeById = employeeDao.selectEmployeeById(new_em);
                houseLibraryInfoVo.setNew_em_name(selectEmployeeById.getEm_name());
                houseLibraryInfoVo.setNew_em_phone(selectEmployeeById.getEm_phone());
                try {
                    rentHouseService.rentHouseDispersionSync(houseLibraryInfoVo);
                    rentHouseService.rentHouseStateSync(houseLibraryInfoVo.getHi_code(), houseLibraryInfoVo.getRoom_code(), 1, 1, 1);
                } catch (AlipayApiException e) {
                    e.printStackTrace();
                }
            }
        }*/

       /* //短信通知
        UserCenterEmployee selectEmployeeByIdOld = employeeDao.selectEmployeeById(em_id);

        UserCenterEmployee selectEmployeeById = employeeDao.selectEmployeeById(new_em);
        UserCustomer userCustomer = new UserCustomer();
        userCustomer.setCc_code(selectContractEm.get(0).getContractObject_1st());
        UserCustomer queryCustomerID = customerDAO.queryCustomerInfo(userCustomer);
        ViewHouseLibraryInfoVo viewHouseLibraryInfoVo = houseLibraryService.queryHouseLibraryInfo(contractObjectVo1.getHi_code());
        String message = "";
        if (change_type == 1) {//change_type==1离职发送的内容
            message = "【管家婆】尊敬的" + queryCustomerID.getCc_name() + "：您的房屋" + viewHouseLibraryInfoVo.getHouse_address() + "的专属管家为" + selectEmployeeById.getEm_name() + "，电话" + selectEmployeeById.getEm_phone() + "。感谢您选择管家婆，如有疑问请您与管家婆财务88067511分机2联系。祝您工作顺利，万事如意！";
        }
        boolean booSend = SendMsg.htSendMessage(queryCustomerID.getCcp_phone(), message, "");

        // 保存发送到客户的短信记录
        UserCenterInformation userCenterInformation = new UserCenterInformation();
        userCenterInformation.setHi_code(selectContractEm.get(0).getHi_code());
        userCenterInformation.setContractObject_code(selectContractEm.get(0).getContractObject_Code());
        userCenterInformation.setMsg_content(message);
        userCenterInformation.setSend_result(booSend ? 1 : 0);
        userCenterInformation.setEm_id(1);// 系统
        userCenterInformation.setReceive_type(1);
        userCenterInformation.setReceive_cc_code(selectContractEm.get(0).getContractObject_1st());
        userCenterInformation.setSend_time(new Date());
        smsService.addUserCenterInformation(userCenterInformation);*/
        //    }
    }

    /**
     * 记录执行记录
     *
     * @param change_type
     * @param em_id
     * @param cir_author
     */
    public void addContractRecord(String hi_code, String contractObject_code, Integer change_type, Integer em_id, Integer cir_author) {
        ContractImplRecordVo implementRecordVo = new ContractImplRecordVo();
        implementRecordVo.setHi_code(hi_code);
        implementRecordVo.setContractObject_code(contractObject_code);
        implementRecordVo.setCir_type(1014);
        UserCenterEmployee employeeById1 = employeeDao.selectEmployeeById(em_id);
        String msg1 = "";
        if (change_type == 1) {//change_type==1离职记录的内容
            msg1 = "管家：" + employeeById1.getEm_name() + "离职，合同进行重新调整";
        }
        if (change_type == 2) {//change_type==2撤销离职记录的内容
            msg1 = "管家：" + employeeById1.getEm_name() + "撤销离职，合同进行重新调整";
        }
        if (change_type == 3) {//change_type==2修改管家记录的内容
            msg1 = "管家：管家更改为" + employeeById1.getEm_name() + ",合同进行重新调整";
        }
        implementRecordVo.setCir_content(msg1);
        implementRecordVo.setCir_source(0);
        implementRecordVo.setCir_author(cir_author);
        implementRecordVo.setCir_createTime(new Date());
        contractDao.addHouseRecord(implementRecordVo);//记录执行记录
    }

    /**
     * 托管合同最新管家变更和变更支付宝管家信息
     *
     * @param contractObjectVo1
     * @param new_em
     * @param em_id
     */
    public void upHousePositionRecords(ContractObjectVo contractObjectVo1, Integer new_em, Integer em_id) {
        if (contractObjectVo1.getContractObject_Type().equals("托管合同")) {
            //如果是托管合同需要把最新管家变更
            PositionRecordVo positionRecordVo = new PositionRecordVo();
            positionRecordVo.setHi_code(contractObjectVo1.getHi_code());
            positionRecordVo.setHpr_newEmp(new_em);
            housingLibraryDao.updateHousePositionRecords(positionRecordVo);

            // 变更支付宝管家信息
            // 判断否改房源已发布到支付宝平台
            RentHouseVo rentHouseVo = rentHouseService.queryRentHouseVo(contractObjectVo1.getHi_code());
            if (null != rentHouseVo && (rentHouseVo.getSync_state() != null && rentHouseVo.getSync_state() == 1)
                    && (rentHouseVo.getRoom_status() != null && rentHouseVo.getRoom_status() == 1)) {
                ViewHouseLibraryInfoVo houseLibraryInfoVo = houseLibraryService.queryHouseLibraryInfo(contractObjectVo1.getHi_code());
                UserCenterEmployee selectEmployeeByIdOld = employeeDao.selectEmployeeById(em_id);
                UserCenterEmployee selectEmployeeById = employeeDao.selectEmployeeById(new_em);
                houseLibraryInfoVo.setNew_em_name(selectEmployeeById.getEm_name());
                houseLibraryInfoVo.setNew_em_phone(selectEmployeeById.getEm_phone());
                try {
                    rentHouseService.rentHouseDispersionSync(houseLibraryInfoVo);
                    rentHouseService.rentHouseStateSync(houseLibraryInfoVo.getHi_code(), houseLibraryInfoVo.getRoom_code(), 1, 1, 1);
                } catch (AlipayApiException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     * 短信通知
     *
     * @param selectContractEm
     * @param contractObjectVo1
     * @param em_id
     * @param new_em
     * @param change_type
     */
    public void addUserCenterInformations(List<ContractObjectVo> selectContractEm, ContractObjectVo contractObjectVo1, Integer em_id, Integer new_em, Integer change_type) {
        //短信通知
        //UserCenterEmployee selectEmployeeByIdOld = employeeDao.selectEmployeeById(em_id);

        UserCenterEmployee selectEmployeeById = employeeDao.selectEmployeeById(new_em);
        UserCustomer userCustomer = new UserCustomer();
        userCustomer.setCc_code(selectContractEm.get(0).getContractObject_1st());
        UserCustomer queryCustomerID = customerDAO.queryCustomerInfo(userCustomer);
        ViewHouseLibraryInfoVo viewHouseLibraryInfoVo = houseLibraryService.queryHouseLibraryInfo(contractObjectVo1.getHi_code());
        String message = "";
        if (change_type == 1) {//change_type==1离职发送的内容
            message = "【管家婆】尊敬的" + queryCustomerID.getCc_name() + "：您的房屋" + viewHouseLibraryInfoVo.getHouse_address() + "现专属管家为" + selectEmployeeById.getEm_name() + "，电话" + selectEmployeeById.getEm_phone() + "。感谢您选择管家婆，如有疑问请您与管家婆财务88067511分机2联系。祝您工作顺利，万事如意！";
        }
        boolean booSend = SendMsg.htSendMessage(queryCustomerID.getCcp_phone(), message);

        // 保存发送到客户的短信记录
        UserCenterInformation userCenterInformation = new UserCenterInformation();
        userCenterInformation.setHi_code(selectContractEm.get(0).getHi_code());
        userCenterInformation.setContractObject_code(selectContractEm.get(0).getContractObject_Code());
        userCenterInformation.setMsg_content(message);
        userCenterInformation.setSend_result(booSend ? 1 : 0);
        userCenterInformation.setEm_id(1);// 系统
        userCenterInformation.setReceive_type(1);
        userCenterInformation.setReceive_cc_code(selectContractEm.get(0).getContractObject_1st());
        userCenterInformation.setSend_time(new Date());
        smsService.addUserCenterInformation(userCenterInformation);
    }

    /**
     * 管家变更记录
     *
     * @param em_id
     * @param new_em
     * @param contractObject_Id
     */
    public void addHandoverRecord(Integer em_id, Integer new_em, Integer contractObject_Id) {
        // 添加合同交接记录
        UserCenterHandoverContract userCenterHandoverContract = new UserCenterHandoverContract();
        userCenterHandoverContract.setEm_id_old(em_id);
        userCenterHandoverContract.setEm_id_new(new_em);
        userCenterHandoverContract.setContractObject_Id(contractObject_Id);
        userCenterHandoverContract.setHandover_status(1);// 已分配
        userCenterHandoverContract.setHandover_time(new Date());
        employeeDao.insertHandoverRecord(userCenterHandoverContract);//记录合同交接
    }


    /**
     * 根据ID查询分配表
     *
     * @param userContract
     * @return
     */
    public List<UserContract> selectUserContract(UserContract userContract) {
        return employeeDao.selectUserContract(userContract);
    }


    /**
     * 人员离职/在职
     * @param em_id
     * @param state
     * @param employee
     * @return
     * @throws Exception
     */
    public Map<String, Object> updataUserState(Integer em_id, Integer state, UserCenterEmployee employee) throws Exception {
        Map<String, Object> map = new HashMap<>();
        if (state == 0) {
            //查询职工表
            UserCenterEmployee userCenterEmployee1 = serviceService.queryEmployeeById(em_id);
            if (userCenterEmployee1.getEm_state() != 3) {//部门主管同意通过才能离职
                map.put("code", 401);
                map.put("message", "先让人员申请离职,主管通过后才能离职");
                return map;
            }
            UserContract userContract = new UserContract();
            userContract.setEm_id(em_id);

            //根据em_id查询临时人员关系
            List<UserContract> userContracts = userCenterEmployeeService.selectUserContract(userContract);

            //处理所有临时人员关系数据
            for (UserContract userContract1 : userContracts) {
                ContractObjectVo contractObjectVo = new ContractObjectVo();
                Integer contractObject_id = userContract1.getContractObject_Id();
                contractObjectVo.setContractObject_Id(contractObject_id);

                ContractObjectVo contractObjectVo1 = contractDao.queryContractObject(contractObjectVo);//查询合同

                String contractObject_code = contractObjectVo1.getContractObject_Code();

                List<ContractObjectVo> contractObjectVos = contractDao.selectGJPContractRelaEmp(contractObjectVo);
                Integer main_em_id =null;
                Double main_ratio =null;
                Integer vice_em_id =null;
                Double vice_ratio =null;
                for (ContractObjectVo contractObjectVo2 : contractObjectVos) {
                    if (contractObjectVo2.getCre_role()==1) {
                        main_em_id=contractObjectVo2.getEm_id();
                        main_ratio=contractObjectVo2.getContract_perforSplit();
                    }
                    if (contractObjectVo2.getCre_role()==2) {
                        vice_em_id=contractObjectVo2.getEm_id();
                        vice_ratio=contractObjectVo2.getContract_perforSplit();
                    }
                }

                houseLibraryService.changeEmInfo(contractObject_code, main_em_id,main_ratio,vice_em_id,vice_ratio);

            }

            userCenterEmployeeService.updateUserQuit(employee, em_id);


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
        }

        return map;
    }

    /**
     * cancel取消離職
     */
    public void cancelResignation(Integer em_id, UserCenterEmployee userCenterEmployee, Integer state, Integer cir_author) throws Exception {
        int bools = userCenterEmployeeService.updatetCloseCompany(userCenterEmployee, state);

        UserContract userContract = new UserContract();
        userContract.setEm_id(em_id);
        List<UserContract> selectUserContract = userCenterEmployeeService.selectUserContract(userContract);
        if (selectUserContract.size() == 0) {
            return;
        }
        ContractObjectVo contractObjectVo = new ContractObjectVo();
        contractObjectVo.setContractObject_Id(selectUserContract.get(0).getContractObject_Id());
        ContractObjectVo contractObjectVo1 = contractDao.queryContractObject(contractObjectVo);//查询合同
        for (UserContract userContract1 : selectUserContract) {
            //先查出已经变过的管家
            ContractObjectVo userCenterContractObject = new ContractObjectVo();
            userCenterContractObject.setContractObject_Id(userContract1.getContractObject_Id());
            List<ContractObjectVo> selectContractEm = contractDao.selectContractEm(userCenterContractObject);

            //删除合同管家关系数据
            contractDao.deleteContractRaleEmp(userContract1.getContractObject_Id());

            //將保存的原來管家添加到關系表
            if (userContract1.getMain_em() != null) {
                UserCenterContractRelaEmpVo userCenterContractRelaEmpVo = new UserCenterContractRelaEmpVo();
                userCenterContractRelaEmpVo.setContractObject_Id(userContract1.getContractObject_Id());
                userCenterContractRelaEmpVo.setContract_perforSplit(userContract1.getMain_contract_perforSplit());
                userCenterContractRelaEmpVo.setEm_id(userContract1.getMain_em());
                userCenterContractRelaEmpVo.setCre_role(1);
                contractDao.addContractRelaEmp(userCenterContractRelaEmpVo);
            }
            if (userContract1.getDeputy_em() != null) {
                UserCenterContractRelaEmpVo userCenterContractRelaEmpVo = new UserCenterContractRelaEmpVo();
                userCenterContractRelaEmpVo.setContractObject_Id(userContract1.getContractObject_Id());
                userCenterContractRelaEmpVo.setContract_perforSplit(userContract1.getContract_perforSplit());
                userCenterContractRelaEmpVo.setEm_id(userContract1.getDeputy_em());
                userCenterContractRelaEmpVo.setCre_role(2);
                contractDao.addContractRelaEmp(userCenterContractRelaEmpVo);
            }

            //记录执行记录
            addContractRecord(selectContractEm.get(0).getHi_code(), selectContractEm.get(0).getContractObject_Code(), 2, em_id, cir_author);

            //if(selectContractEm.get(0).getEm_id() != userContract1.getMain_em()){
            if (!selectContractEm.get(0).getEm_id().equals(userContract1.getMain_em())) {
                //管家变更记录
                addHandoverRecord(selectContractEm.get(0).getEm_id(), userContract1.getMain_em(), userContract1.getContractObject_Id());
                //发送短信
                addUserCenterInformations(selectContractEm, contractObjectVo1, em_id, selectContractEm.get(0).getEm_id(), 1);
            }

            //托管合同最新管家变更和变更支付宝管家信息
            upHousePositionRecords(contractObjectVo1, userContract1.getMain_em(), em_id);

            /*ContractImplRecordVo implementRecordVo = new ContractImplRecordVo();
            implementRecordVo.setHi_code(selectContractEm.get(0).getHi_code());
            implementRecordVo.setContractObject_code(selectContractEm.get(0).getContractObject_Code());
            implementRecordVo.setCir_type(1014);
            UserCenterEmployee employeeById1 = employeeDao.selectEmployeeById(userContract1.getEm_id());
            String msg1 = "";
            msg1 = "管家：" + employeeById1.getEm_name() + "撤销离职，合同进行重新调整";
            implementRecordVo.setCir_content(msg1);
            implementRecordVo.setCir_source(0);
            implementRecordVo.setCir_author(cir_author);
            implementRecordVo.setCir_createTime(new Date());
            contractDao.addHouseRecord(implementRecordVo);

            //查询最新管家变更记录
            UserCenterHandoverContract userCenterHandoverContract1 = userCenterEmployeeDao.queryHandoverRecordLastByConID(userContract1.getContractObject_Id());

            // 取消离职添加合同交接记录
            UserCenterHandoverContract userCenterHandoverContract = new UserCenterHandoverContract();
            userCenterHandoverContract.setEm_id_old(userCenterHandoverContract1.getEm_id_new());
            userCenterHandoverContract.setEm_id_new(userCenterHandoverContract1.getEm_id_old());
            userCenterHandoverContract.setContractObject_Id(userContract1.getContractObject_Id());
            userCenterHandoverContract.setHandover_status(1);// 已分配
            userCenterHandoverContract.setHandover_time(new Date());
            employeeDao.insertHandoverRecord(userCenterHandoverContract);


            if (selectContractEm.get(0).getContractObject_Type().equals("托管合同")) {
                PositionRecordVo positionRecordVo = new PositionRecordVo();
                positionRecordVo.setHi_code(selectContractEm.get(0).getHi_code());
                positionRecordVo.setHpr_newEmp(userContract1.getEm_id());
                housingLibraryDao.updateHousePositionRecords(positionRecordVo);

                // 变更支付宝管家信息
                // 判断否改房源已发布到支付宝平台
                RentHouseVo rentHouseVo = rentHouseService.queryRentHouseVo(selectContractEm.get(0).getHi_code());
                if (null != rentHouseVo && (rentHouseVo.getSync_state() != null && rentHouseVo.getSync_state() == 1)
                        && (rentHouseVo.getRoom_status() != null && rentHouseVo.getRoom_status() == 1)) {
                    ViewHouseLibraryInfoVo houseLibraryInfoVo = houseLibraryService.queryHouseLibraryInfo(selectContractEm.get(0).getHi_code());
                    //UserCenterEmployee selectEmployeeByIdOld = employeeDao.selectEmployeeById(userContract1.getNew_em());
                    UserCenterEmployee selectEmployeeById = employeeDao.selectEmployeeById(userContract1.getEm_id());
                    houseLibraryInfoVo.setNew_em_name(selectEmployeeById.getEm_name());
                    houseLibraryInfoVo.setNew_em_phone(selectEmployeeById.getEm_phone());
                    try {
                        rentHouseService.rentHouseDispersionSync(houseLibraryInfoVo);
                        rentHouseService.rentHouseStateSync(houseLibraryInfoVo.getHi_code(), houseLibraryInfoVo.getRoom_code(), 1, 1, 1);
                    } catch (AlipayApiException e) {
                        e.printStackTrace();
                    }
                }
            }

            //短信通知
            //UserCenterEmployee selectEmployeeByIdOld = employeeDao.selectEmployeeById(userContract1.getNew_em());

            UserCenterEmployee selectEmployeeById = employeeDao.selectEmployeeById(userContract1.getEm_id());
            UserCustomer userCustomer = new UserCustomer();
            userCustomer.setCc_code(selectContractEm.get(0).getContractObject_1st());
            UserCustomer queryCustomerID = customerDAO.queryCustomerInfo(userCustomer);
            ViewHouseLibraryInfoVo viewHouseLibraryInfoVo = houseLibraryService.queryHouseLibraryInfo(contractObjectVo1.getHi_code());
            String message = "";
            message = "【管家婆】尊敬的" + queryCustomerID.getCc_name() + "：您的房屋" + viewHouseLibraryInfoVo.getHouse_address() + "的专属管家为" + selectEmployeeById.getEm_name() + "，电话" + selectEmployeeById.getEm_phone() + "。感谢您选择管家婆，如有疑问请您与管家婆财务88067511分机2联系。祝您工作顺利，万事如意！";
            boolean booSend = SendMsg.htSendMessage(queryCustomerID.getCcp_phone(), message, "");

            // 保存发送到客户的短信记录
            UserCenterInformation userCenterInformation = new UserCenterInformation();
            userCenterInformation.setHi_code(selectContractEm.get(0).getHi_code());
            userCenterInformation.setContractObject_code(selectContractEm.get(0).getContractObject_Code());
            userCenterInformation.setMsg_content(message);
            userCenterInformation.setSend_result(booSend ? 1 : 0);
            userCenterInformation.setEm_id(1);// 系统
            userCenterInformation.setReceive_type(1);
            userCenterInformation.setReceive_cc_code(selectContractEm.get(0).getContractObject_1st());
            userCenterInformation.setSend_time(new Date());
            smsService.addUserCenterInformation(userCenterInformation);*/
        }
        //刪除臨時人員關系
        userCenterEmployeeService.deleteUserContract(userContract);
    }

    /**
     * 管家分配(老版本的)
     *
     * @param em_id
     * @param employee
     * @return
     * @author 陈智颖
     */
    public int updateUserQuit(UserCenterEmployee employee, Integer em_id) {

        int bools = 0;

        // 根据用户编码查询管家信息
        UserContract userContract = new UserContract();
        userContract.setEm_id(em_id);
        List<UserContract> selectUserContract = employeeDao.selectUserContract(userContract);

        for (UserContract userContrac : selectUserContract) {
            if (userContrac.getUc_state() == null) {
                continue;
            }
            ContractObjectVo userCenterContractObject = new ContractObjectVo();
            userCenterContractObject.setContractObject_Id(userContrac.getContractObject_Id());
            List<ContractObjectVo> selectContractEm = contractDao.selectContractEm(userCenterContractObject);
            ContractObjectVo contractObjectVo = new ContractObjectVo();
            contractObjectVo.setContractObject_Id(userContrac.getContractObject_Id());
            ContractObjectVo contractObjectVo1 = contractDao.queryContractObject(contractObjectVo);
            switch (userContrac.getUc_emType()) {
                case 1:
                    if (selectContractEm.size() == 1) {
                        ContractObjectVo userCenterContractObject1 = new ContractObjectVo();
                        userCenterContractObject1.setContractObject_Id(selectContractEm.get(0).getContractObject_Id());
                        userCenterContractObject1.setEm_id(userContrac.getNew_em());
                        userCenterContractObject1.setContract_perforSplit(userContrac.getContract_perforSplit());
                        userCenterContractObject1.setCre_role(1);
                        bools = contractDao.updatetContractEm(userCenterContractObject1);
                    } else {
                        if (userContrac.getNew_em() == null) {
                            // 删除副管家
                            ContractObjectVo userCenterContractObject2 = new ContractObjectVo();
                            userCenterContractObject2.setEm_id(em_id);
                            userCenterContractObject2.setContractObject_Id(selectContractEm.get(1).getContractObject_Id());
                            contractDao.deleteContractEm(userCenterContractObject2);

                            ContractObjectVo userCenterContractObject1 = new ContractObjectVo();
                            userCenterContractObject1.setContractObject_Id(selectContractEm.get(0).getContractObject_Id());
                            userCenterContractObject1.setEm_id(selectContractEm.get(1).getEm_id());
                            userCenterContractObject1.setContract_perforSplit(userContrac.getContract_perforSplit() + selectContractEm.get(1).getContract_perforSplit());
                            userCenterContractObject1.setCre_role(1);
                            bools = contractDao.updatetContractEm(userCenterContractObject1);
                        } else {
                            boolean boolt = false;
                            Integer emID = 0;
                            Integer contractID = 0;
                            Double contract_perforSplit = 0.0;
                            for (ContractObjectVo userCenterContractObject2 : selectContractEm) {
                                if (userContrac.getNew_em() == userCenterContractObject2.getEm_id()) {
                                    emID = userCenterContractObject2.getEm_id();
                                    contractID = userCenterContractObject2.getContractObject_Id();
                                    contract_perforSplit = userCenterContractObject2.getContract_perforSplit();
                                    boolt = true;
                                    break;
                                }
                            }

                            if (boolt) {
                                // 删除副管家
                                ContractObjectVo userCenterContractObject2 = new ContractObjectVo();
                                userCenterContractObject2.setEm_id(emID);
                                userCenterContractObject2.setContractObject_Id(contractID);
                                contractDao.deleteContractEm(userCenterContractObject2);

                                ContractObjectVo userCenterContractObject1 = new ContractObjectVo();
                                userCenterContractObject1.setContractObject_Id(selectContractEm.get(0).getContractObject_Id());
                                userCenterContractObject1.setEm_id(userContrac.getNew_em());
                                userCenterContractObject1.setContract_perforSplit(userContrac.getContract_perforSplit() + contract_perforSplit);
                                userCenterContractObject1.setCre_role(1);
                                bools = contractDao.updatetContractEm(userCenterContractObject1);
                            } else {
                                ContractObjectVo userCenterContractObject1 = new ContractObjectVo();
                                userCenterContractObject1.setContractObject_Id(selectContractEm.get(0).getContractObject_Id());
                                userCenterContractObject1.setEm_id(userContrac.getNew_em());
                                userCenterContractObject1.setContract_perforSplit(userContrac.getContract_perforSplit());
                                userCenterContractObject1.setCre_role(1);
                                bools = contractDao.updatetContractEm(userCenterContractObject1);
                            }
                        }
                    }
                    break;
                case 2:
                    Integer emID = 0;
                    Integer contractID = 0;
                    Double contract_perforSplit = 0.0;
                    for (ContractObjectVo userCenterContractObject2 : selectContractEm) {
                        if (em_id == userCenterContractObject2.getEm_id()) {
                            emID = userCenterContractObject2.getEm_id();
                            contractID = userCenterContractObject2.getContractObject_Id();
                            contract_perforSplit = userCenterContractObject2.getContract_perforSplit();
                            break;
                        }
                    }
                    // 删除副管家
                    ContractObjectVo userCenterContractObject2 = new ContractObjectVo();
                    userCenterContractObject2.setEm_id(emID);
                    userCenterContractObject2.setContractObject_Id(contractID);
                    contractDao.deleteContractEm(userCenterContractObject2);

                    ContractObjectVo userCenterContractObject1 = new ContractObjectVo();
                    userCenterContractObject1.setContractObject_Id(selectContractEm.get(0).getContractObject_Id());
                    userCenterContractObject1.setContract_perforSplit(userContrac.getContract_perforSplit() + contract_perforSplit);
                    userCenterContractObject1.setCre_role(1);
                    bools = contractDao.updatetContractEm(userCenterContractObject1);
                    break;
                default:
                    break;
            }

            if (selectContractEm.get(0).getContractObject_Type().equals("托管合同")) {
                PositionRecordVo positionRecordVo = new PositionRecordVo();
                positionRecordVo.setHpr_newEmp(userContrac.getNew_em());
                positionRecordVo.setHi_code(selectContractEm.get(0).getHi_code());
                housingLibraryDao.updateHousePositionRecords(positionRecordVo);
            }

            ContractImplRecordVo implementRecordVo = new ContractImplRecordVo();
            implementRecordVo.setHi_code(selectContractEm.get(0).getHi_code());
            implementRecordVo.setContractObject_code(selectContractEm.get(0).getContractObject_Code());
            implementRecordVo.setCir_type(1014);
            UserCenterEmployee employeeById1 = employeeDao.selectEmployeeById(userContrac.getEm_id());
            // UserCenterEmployee employeeById2 =
            // employeeDao.selectEmployeeById(userContrac.getNew_em());
            implementRecordVo.setCir_content("管家：" + employeeById1.getEm_name() + "离职，合同进行重新调整");
            implementRecordVo.setCir_source(0);
            implementRecordVo.setCir_author(employee.getEm_id());
            implementRecordVo.setCir_createTime(new Date());
            contractDao.addHouseRecord(implementRecordVo);

            // 添加合同交接记录
            UserCenterHandoverContract userCenterHandoverContract = new UserCenterHandoverContract();
            userCenterHandoverContract.setEm_id_old(userContrac.getEm_id());
            userCenterHandoverContract.setEm_id_new(userContrac.getNew_em());
            userCenterHandoverContract.setContractObject_Id(userContrac.getContractObject_Id());
            userCenterHandoverContract.setHandover_status(1);// 已分配
            userCenterHandoverContract.setHandover_time(new Date());
            employeeDao.insertHandoverRecord(userCenterHandoverContract);

            UserContract userContract2 = new UserContract();
            userContract2.setEm_id(em_id);
            employeeDao.deleteUserContract(userContract);

            if (contractObjectVo1.getContractObject_Type().equals("托管合同")) {
                PositionRecordVo positionRecordVo = new PositionRecordVo();
                positionRecordVo.setHi_code(contractObjectVo1.getHi_code());
                positionRecordVo.setHpr_newEmp(userContrac.getNew_em());
                housingLibraryDao.updateHousePositionRecords(positionRecordVo);

                // 变更支付宝管家信息
                // 判断否改房源已发布到支付宝平台
                RentHouseVo rentHouseVo = rentHouseService.queryRentHouseVo(contractObjectVo1.getHi_code());
                if (null != rentHouseVo && (rentHouseVo.getSync_state() != null && rentHouseVo.getSync_state() == 1)
                        && (rentHouseVo.getRoom_status() != null && rentHouseVo.getRoom_status() == 1)) {

                    ViewHouseLibraryInfoVo houseLibraryInfoVo = houseLibraryService.queryHouseLibraryInfo(contractObjectVo1.getHi_code());
                    UserCenterEmployee selectEmployeeByIdOld = employeeDao.selectEmployeeById(userContrac.getEm_id());
                    UserCenterEmployee selectEmployeeById = employeeDao.selectEmployeeById(userContrac.getNew_em());
                    houseLibraryInfoVo.setNew_em_name(selectEmployeeById.getEm_name());
                    houseLibraryInfoVo.setNew_em_phone(selectEmployeeById.getEm_phone());
                    try {
                        rentHouseService.rentHouseDispersionSync(houseLibraryInfoVo);
                        rentHouseService.rentHouseStateSync(houseLibraryInfoVo.getHi_code(), houseLibraryInfoVo.getRoom_code(), 1, 1, 1);
                    } catch (AlipayApiException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        return bools;
    }

    /**
     * 一键分配房源(老版本的)
     *
     * @param em_id
     * @param new_em
     * @return
     * @author 陈智颖
     */
    public Integer updateOneDistribution(Integer em_id, Integer new_em) {
        int bools = 0;
        UserContract userContract = new UserContract();
        userContract.setEm_id(em_id);
        userContract.setUc_state(0);
        List<UserContract> selectUserContract = employeeDao.selectUserContract(userContract);
        if (selectUserContract.isEmpty()) {
            bools = 1;
            return bools;
        }

        for (UserContract userContrac : selectUserContract) {
            ContractObjectVo userCenterContractObject = new ContractObjectVo();
            userCenterContractObject.setContractObject_Id(userContrac.getContractObject_Id());
            List<ContractObjectVo> selectContractEm = contractDao.selectContractEm(userCenterContractObject);
            if (userContrac.getUc_emType() == 1) {
                if (selectContractEm.size() == 1) {
                    UserContract userContract2 = new UserContract();
                    userContract2.setUc_state(1);
                    userContract2.setNew_em(new_em);
                    userContract2.setContractObject_Id(userContrac.getContractObject_Id());
                    bools = employeeDao.updatetUserContract(userContract2);
                    if (bools > 0) {
                        UserCenterEmployee selectEmployeeByIdOld = employeeDao.selectEmployeeById(userContrac.getEm_id());
                        UserCenterEmployee selectEmployeeById = employeeDao.selectEmployeeById(new_em);
                        UserCustomer userCustomer = new UserCustomer();
                        userCustomer.setCc_code(selectContractEm.get(0).getContractObject_1st());
                        UserCustomer queryCustomerID = customerDAO.queryCustomerInfo(userCustomer);
                        String message = "【管家婆】尊敬的" + queryCustomerID.getCc_name() + "：您的管家" + selectEmployeeByIdOld.getEm_name() + "由于个人原因已经离职，您现在的专属管家为" + selectEmployeeById.getEm_name() + "，电话" + selectEmployeeById.getEm_phone() + "。感谢您选择管家婆，如有疑问请您与管家婆财务88067511分机2联系。祝您工作顺利，万事如意！";
                        boolean booSend = SendMsg.htSendMessage(queryCustomerID.getCcp_phone(), message);

                        // 保存发送到客户的短信记录
                        UserCenterInformation userCenterInformation = new UserCenterInformation();
                        userCenterInformation.setHi_code(selectContractEm.get(0).getHi_code());
                        userCenterInformation.setContractObject_code(selectContractEm.get(0).getContractObject_Code());
                        userCenterInformation.setMsg_content(message);
                        userCenterInformation.setSend_result(booSend ? 1 : 0);
                        userCenterInformation.setEm_id(1);// 系统
                        userCenterInformation.setReceive_type(1);
                        userCenterInformation.setReceive_cc_code(selectContractEm.get(0).getContractObject_1st());
                        userCenterInformation.setSend_time(new Date());
                        smsService.addUserCenterInformation(userCenterInformation);
                    }
                } else {
                    UserContract userContract2 = new UserContract();
                    userContract2.setUc_state(1);
                    userContract2.setNew_em(selectContractEm.get(1).getEm_id());
                    userContract2.setContractObject_Id(userContrac.getContractObject_Id());
                    bools = employeeDao.updatetUserContract(userContract2);
                    if (bools > 0) {
                        UserCenterEmployee selectEmployeeByIdOld = employeeDao.selectEmployeeById(userContrac.getEm_id());
                        UserCenterEmployee selectEmployeeById = employeeDao.selectEmployeeById(selectContractEm.get(1).getEm_id());
                        UserCustomer userCustomer = new UserCustomer();
                        userCustomer.setCc_code(selectContractEm.get(0).getContractObject_1st());
                        UserCustomer queryCustomerID = customerDAO.queryCustomerInfo(userCustomer);
                        String message = "【管家婆】尊敬的" + queryCustomerID.getCc_name() + "：您的管家" + selectEmployeeByIdOld.getEm_name() + "由于个人原因已经离职，您现在的专属管家为" + selectEmployeeById.getEm_name() + "，电话" + selectEmployeeById.getEm_phone() + "。感谢您选择管家婆，如有疑问请您与管家婆财务88067511分机2联系。祝您工作顺利，万事如意！";
                        boolean booSend = SendMsg.htSendMessage(queryCustomerID.getCcp_phone(), message);

                        // 保存发送到客户的短信记录
                        UserCenterInformation userCenterInformation = new UserCenterInformation();
                        userCenterInformation.setHi_code(selectContractEm.get(0).getHi_code());
                        userCenterInformation.setContractObject_code(selectContractEm.get(0).getContractObject_Code());
                        userCenterInformation.setMsg_content(message);
                        userCenterInformation.setSend_result(booSend ? 1 : 0);
                        userCenterInformation.setEm_id(1);// 系统
                        userCenterInformation.setReceive_type(1);
                        userCenterInformation.setReceive_cc_code(selectContractEm.get(0).getContractObject_1st());
                        userCenterInformation.setSend_time(new Date());
                        smsService.addUserCenterInformation(userCenterInformation);
                    }
                }
            }
        }

        return bools;
    }

    /**
     * 根据用户编码和合同类型查询信息是否存在
     *
     * @param userCenterEmployee
     * @return
     * @author 陈智颖
     */
    public int selectHouseEmContractEmBool(UserCenterEmployee userCenterEmployee) {
        return employeeDao.selectHouseEmContractEmBool(userCenterEmployee);
    }

    /**
     * 查询管家信息
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年11月25日
     */
    public UserCenterEmployee queryEmployeeInfo(UserCenterEmployee employee) {
        return employeeDao.queryEmployeeInfo(employee);
    }

    public UserCenterEmployee queryEmployeeInfo(Integer em_id) {
        UserCenterEmployee employee = new UserCenterEmployee();
        employee.setEm_id(em_id);
        return employeeDao.queryEmployeeInfo(employee);
    }

    public UserCenterEmployee queryEmployeeInfo(String account) {
        UserCenterEmployee employee = new UserCenterEmployee();
        employee.setEm_account(account);
        return employeeDao.queryEmployeeInfo(employee);
    }

    /**
     * 查询公司列表
     *
     * @param company
     * @return
     * @作者 JiangQT
     * @日期 2017年3月19日
     */
    public List<Company> queryCompanyList(Company company) {
        return employeeDao.queryCompanyList(company);
    }

    /**
     * 查询管家分页数据
     *
     * @param pagination
     * @return
     * @作者 JiangQT
     * @日期 2017年3月19日
     */
    public Pagination<UserCenterEmployee> queryEmployeePageList(Pagination<UserCenterEmployee> pagination) {
        return employeeDao.queryEmployeePageList(pagination);
    }

    /**
     * 查询所有在职人员分页
     *
     * @param centerEmployee
     * @return
     * @author 陈智颖
     * @date Mar 28, 2017 9:07:35 PM
     */
    public List<UserCenterEmployee> queryEmployeeApp(UserCenterEmployee centerEmployee) {
        return employeeDao.queryEmployeeApp(centerEmployee);
    }

    /**
     * 根据合同ID查询管家
     *
     * @param userContract
     * @return
     */
    public List<UserCenterHandoverContract> queryHandoverRecordByConID(UserContract userContract) {
        return employeeDao.queryHandoverRecordByConID(userContract);
    }

    /**
     * 插入合同管家变更记录
     *
     * @param userCenterHandoverContract
     * @return
     */
    public int insertHandoverRecord(UserCenterHandoverContract userCenterHandoverContract) {
        return employeeDao.insertHandoverRecord(userCenterHandoverContract);
    }

    /**
     * 检查登陆人员有无权限出房调价
     *
     * @param userCenterEmployee
     * @return
     */
    public List<Integer> checkRoleJdjustPrice(UserCenterEmployee userCenterEmployee) {
        return employeeDao.checkRoleJdjustPrice(userCenterEmployee);
    }

    /**
     * 查询内部人员部门
     *
     * @author tanglei
     */
    public UserCenterEmployee selectUserCenterEmployeeInfo(UserCenterEmployee userCenterEmployee) {
        return employeeDao.selectUserCenterEmployeeInfo(userCenterEmployee);
    }

    /**
     * 查询各部门主管
     *
     * @author tanglei
     */
    public List<Map<String, Object>> selectdepartment(Company company) {
        return employeeDao.selectdepartment(company);
    }

    /**
     * 查询所有部门
     *
     * @return
     */
    public List<Company> queryAllCompany() {
        return employeeDao.queryAllCompany();
    }

    /**
     * 查询所有部门
     *
     * @return
     */
    public List<Company> appQueryAllCompany() {
        return employeeDao.appQueryAllCompany();
    }

    /**
     * 根据房屋编号查询管家
     *
     * @author tanglei
     * @Date 2017年7月22日  上午11:03:55
     */
    public UserCenterEmployee selectUserCenterManage(UserCenterEmployee userCenterEmployee) {
        return employeeDao.selectUserCenterManage(userCenterEmployee);
    }

    public Company queryCompanyInfo(Company company) {
        return employeeDao.queryCompanyInfo(company);
    }

    /**
     * 插入登陆人
     *
     * @param employeeOneLogin
     * @return
     */
    public Integer InsertOneLogin(EmployeeOneLogin employeeOneLogin) {
        return employeeDao.InsertOneLogin(employeeOneLogin);
    }

    /**
     * 修改登陆人
     */
    public Integer updateEmployeeOneLogin(EmployeeOneLogin employeeOneLogin) {
        return employeeDao.updateEmployeeOneLogin(employeeOneLogin);
    }

    /**
     * 查询单点登陆
     */
    public EmployeeOneLogin queryEmployeeOneLogin(EmployeeOneLogin employeeOneLogin) {
        return employeeDao.queryEmployeeOneLogin(employeeOneLogin);
    }
}
