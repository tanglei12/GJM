package com.gjp.dao;

import com.gjp.model.*;
import com.gjp.util.Pagination;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年5月13日 上午10:52:34
 */
public interface AchievementCompanyDAO {

	/**
	 * 根据业绩编码查询当月业绩
	 * 
	 * @param companyAchievement
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<AchievementCompanyAchievement> selectCompanyAchievement(AchievementCompanyAchievement companyAchievement);

	/**
	 * 查询业绩设置时间段
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<AchievementCompanyAchievement> selectCompanyAchievementDate();

	/**
	 * 根据部门ID查询房屋总业绩
	 * 
	 * @param companyAchievement
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<AchievementSumAchievement> selectAchievementSumAchievement(AchievementSumAchievement companyAchievement);

	/**
	 * 根据视图查询业绩账单
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<ViewSumAchievement> selectAchievementSumMoney(ViewSumAchievement viewSumAchievement);

	/**
	 * 总业绩
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	ViewSumAchievement selectAchievementSumMoneys(ViewSumAchievement viewSumAchievement);

	/**
	 * 查询业绩设置
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	AchievementSetting selectAchievementSetting();

	/**
	 * 插入总业绩设置
	 * 
	 * @param companyAchievement
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer addCompanyAchievement(AchievementCompanyAchievement companyAchievement);

	/**
	 * 修改是否计算业绩
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updateContractObjectServiceBool(ViewBusinessContractVo viewBusinessContractVo);

	/**
	 * 根据合同编码查询合同
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<ViewBusinessContractVo> selectContractNo(ViewBusinessContractVo viewBusinessContractVo);

	/**
	 * 根据业绩账单ID查询业绩详情
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<ViewBusinessContractVo> selectContractDateToDate(ViewBusinessContractVo viewBusinessContractVo);

	/**
	 * 根据合同编码查询退租时间
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<ViewContractStatement> selectContractNoShutTime(ViewContractStatement viewContractStatement);

	/**
	 * 根据总业绩ID查询总业绩
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<AchievementSumAchievement> selectSumAchievementID(AchievementSumAchievement sumAchievement);

	/**
	 * 根据业绩账单ID查询业绩账单
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<AchievementBill> selectAchievementBilABID(AchievementBill achievementBill);

	/**
	 * 根据总业绩ID查询业绩账单
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<AchievementBill> selectAchievementBilID(Integer sa_id);

	/**
	 * 根据业绩账单ID和内部人员ID查询业绩账单
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<AchievementBill> selectAchievementBilemID(AchievementBill achievementBill);

	/**
	 * 根据业绩账单ID查询业绩详情
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<AchievementBillContent> selectAchievementBillContent(Integer abc_id);

	/**
	 * 修改总业绩设置
	 * 
	 * @param companyAchievement
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updateCompanyAchievement(AchievementCompanyAchievement companyAchievement);

	/**
	 * 设置团队业绩
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer addTeamAchievement(AchievementTeamAchievement teamAchievement);

	/**
	 * 修改团队业绩
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updateTeamAchievement(AchievementTeamAchievement teamAchievement);

	/**
	 * 设置个人业绩
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer addAchievementPersonAchievement(AchievementPersonAchievement personAchievement);

	/**
	 * 设置团队业绩
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer addAchievementSetting(AchievementSetting achievementSetting);

	/**
	 * 设置团队业绩详情
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer addAchievementSettingDetails(AchievementSettingDetails achievementSettingDetails);

	/**
	 * 删除团队业绩详情
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer deleteAchievementSettingDetails(AchievementSettingDetails achievementSettingDetails);

	/**
	 * 根据业绩ID查询业绩设置详情
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<AchievementSettingDetails> selectAchievementSettingDetails(AchievementSettingDetails achievementSettingDetails);

	/**
	 * 修改总业绩设置
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updateAchievementSetting(AchievementSetting achievementSetting);

	/**
	 * 删除总业绩设置
	 * 
	 * @param companyAchievement
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer deleteCompanyAchievement(AchievementCompanyAchievement companyAchievement);

	/**
	 * 删除团队业绩
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer deleteTeamAchievement(AchievementTeamAchievement teamAchievement);

	/**
	 * 删除个人业绩
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer deletePersonAchievement(AchievementPersonAchievement personAchievement);

	/**
	 * 插入总业绩
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer insertSumAchievement(AchievementSumAchievement achievementSumAchievement);

	/**
	 * 修改总业绩表
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updateSumAchievement(AchievementSumAchievement achievementSumAchievement);

	/**
	 * 插入业绩账单
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer insertAchievementBill(AchievementBill achievementBill);

	/**
	 * 修改业绩账单
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updateAchievementBill(AchievementBill achievementBill);

	/**
	 * 根据业绩编码修改合同编码
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updateCompanyAchievementContID(AchievementSumAchievement sumAchievement);

	/**
	 * 插入业绩账单详情
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer insertAchievementBillContent(AchievementBillContent achievementBillContent);

	/**
	 * 修改业绩账单详情
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updateAchievementBillContentBT(AchievementBillContent achievementBillContent);

	/**
	 * 查询团队业绩
	 * 
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	List<ViewTeamAchievementListVo> selectTeamAchievementList(ViewTeamAchievementListVo achievementListVo);

	/**
	 * 查询总业绩
	 * 
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	AchievementCompanyAchievement selectCompanyAchievementByWhere(AchievementCompanyAchievement companyAchievement);

	/**
	 * 查询总业绩数据
	 * 
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	AchievementSumAchievement selectAchievementSumByWhere(AchievementSumAchievement sumAchievement);

	/**
	 * 条件查询实际业绩数据
	 * 
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	List<ViewHouseAchievementVo> selectAchievementSumListByWhere(ViewHouseAchievementVo sumAchievement);

	/**
	 * 查询业绩账单总数据
	 * 
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	AchievementBill selectAchievementBillTotalByWhere(AchievementBill achievementBill);

	/**
	 * 查询业绩账单列表
	 * 
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	List<AchievementBill> selectAchievementBillListByWhere(AchievementBill achievementBill);

	/**
	 * 查询业绩精简数据列表
	 * 
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	List<AchievementBill> selectAchievementBillSimpleList(Pagination<AchievementBill> pagination);

	/**
	 * 查询业绩人员列表数据
	 * 
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	List<ViewAchievementEmployeeVo> selectAchievementEmployeeList(ViewAchievementEmployeeVo achievementEmployeeVo);

	/**
	 * 查询业绩精简业绩数据总数
	 * 
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	int selectAchievementBillSimpleListTotalRecords(Pagination<AchievementBill> pagination);

	/**
	 * 查询所有总目标业绩
	 * 
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	List<AchievementCompanyAchievement> selectCompanyAchievementList(AchievementCompanyAchievement companyAchievement);

	/**
	 * 查询业绩亏损
	 * 
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	AchievementBill selectAchievementBillLossByWhere(AchievementBill achievementBill);

	/**
	 * 
	 * 根据账号查询个人业绩
	 * 
	 * @param achievement
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<ViewSumAchievement> selectAchievementPerson(ViewSumAchievement achievement);

	/**
	 * 
	 * 根据账号查询个人业绩目标
	 * 
	 * @param achievement
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<AchievementPersonAchievement> selectAchievementPersonTarget(AchievementPersonAchievement achievement);

	/**
	 * 
	 * 根据账号查询个人业绩目标
	 * 
	 * @param empVo
	 * @return
	 *
	 * @author 陈智颖
	 */
	int selectMyHouse(ViewBusinessContractRelaEmpVo empVo);

	/**
	 * 查询业绩账单list
	 * 
	 * @作者 JiangQT
	 * @日期 2016年9月17日
	 *
	 * @param viewSumAchievement
	 * @return
	 */
	List<ViewSumAchievement> queryAchievementBillList(ViewSumAchievement viewSumAchievement);

	/**
	 * 删除业绩账单详情
	 * 
	 * @param achievementBillContent
	 * @return
	 *
	 * @author 陈智颖
	 */
	int deleteAchievementBillContent(AchievementBillContent achievementBillContent);

	/**
	 * 删除业绩账单
	 * 
	 * @param achievementBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	int deleteAchievementBill(AchievementBill achievementBill);

	/**
	 * 删除总业绩
	 * 
	 * @param achievementSumAchievement
	 * @return
	 *
	 * @author 陈智颖
	 */
	int deleteAchievement(AchievementSumAchievement achievementSumAchievement);

	/**
	 * 插入业绩记录
	 * 
	 * @param achievementRecord
	 * @return
	 *
	 * @author 陈智颖
	 */
	int addAchievementRecord(AchievementRecord achievementRecord);

	/**
	 * 查询业绩记录
	 * 
	 * @作者 JiangQT
	 * @日期 2016年9月25日
	 *
	 * @param achievementRecord
	 * @return
	 */
	List<AchievementRecord> queryAchiRecord(AchievementRecord achievementRecord);

	/**
	 * 查询最后一条业绩调整记录
	 * 
	 * @作者 JiangQT
	 * @日期 2016年9月26日
	 *
	 * @param achievementRecord
	 * @return
	 */
	AchievementRecord queryAchiRecordLastOne(AchievementRecord achievementRecord);

	/**
	 * 房屋利润
	 *
	 * @param achievementHouseMoney
	 * @author 陈智颖
	 * @create 8/10/17 4:46 PM
	 * @return int
	 **/
	AchievementHouseMoney selectHouseMoney(AchievementHouseMoney achievementHouseMoney);

	/**
	 * 房屋利润
	 *
	 * @param achievementHouseMoney
	 * @author 陈智颖
	 * @create 8/10/17 4:46 PM
	 * @return int
	 **/
	int addHouseMoney(AchievementHouseMoney achievementHouseMoney);

	/**
	 * 修改房屋利润
	 *
	 * @param
	 * @author 陈智颖
	 * @create 8/11/17 5:03 PM
	 * @return
	 **/
	int updateHouseMoney(AchievementHouseMoney achievementHouseMoney);

	/**
	 * 业绩结算费用
	 *
	 * @param 
	 * @author 陈智颖
	 * @create 8/11/17 12:03 PM
	 * @return
	 **/
	List<PropertyMoney> selectPropertyMoney(PropertyMoney propertyMoney);

	/**
	 * 根据hi_code查询部门
	 *
	 * @param
	 * @author 陈智颖
	 * @create 8/11/17 3:28 PM
	 * @return
	 **/
	PositionRecordVo selectPositionRecord(PositionRecordVo positionRecordVo);

	/**
	 * 根据hi_code查询部门
	 *
	 * @param
	 * @author 陈智颖
	 * @create 8/11/17 3:28 PM
	 * @return
	 **/
	List<ServiceMoney> selectDeclaration(ServiceMoney serviceMoney);

	/**
	 * 查询房屋利润按合同来展现
     *
	 * @param
	 * @author 陈智颖
	 * @create 8/12/17 2:54 PM
	 * @return
	 **/
    List<AchievementHouseMoneyVo> selectAchievementHouseMoneyNo(AchievementHouseMoneyVo achievementHouseMoneyVo);

	/**
	 * 查询部门利润
     *
	 * @param
	 * @author 陈智颖
	 * @create 8/12/17 2:54 PM
	 * @return
	 **/
    List<AchievementHouseMoneyVo> selectAchievementHouseMoneyUcc(AchievementHouseMoneyVo achievementHouseMoneyVo);

	/**
	 * 查询招租房屋租赁合同
     *
	 * @param
	 * @author 陈智颖
	 * @create 8/12/17 2:54 PM
	 * @return
	 **/
    List<ViewBusinessContractVo> queryHouseInfomationKeepContract(ViewBusinessContractVo viewBusinessContractVo);

	/**
	 * 修改合同是否计算管理费
     *
	 * @param
	 * @author 陈智颖
	 * @create 8/12/17 2:54 PM
	 * @return
	 **/
    Integer updateContractHouseAchievementBool(ContractObjectVo contractObjectVo);

	/**
	 * 修改合同是否计算管理费
     *
	 * @param
	 * @author 陈智颖
	 * @create 8/12/17 2:54 PM
	 * @return
	 **/
    List<ContractObjectVo> selectContractObjectMD(ContractObjectVo contractObjectVo);

	/**
	 * 是否扣除管理费
     *
	 * @param
	 * @author 陈智颖
	 * @create 8/12/17 2:54 PM
	 * @return
	 **/
    List<ManageFees> queryManageFees(ManageFees manageFees);

	/**
	 * 是否扣除管理费
     *
	 * @param
	 * @author 陈智颖
	 * @create 8/12/17 2:54 PM
	 * @return
	 **/
    List<RentFree> queryRentFree(RentFree rentFree);

	/**
	 * 插入门店基金
     *
	 * @param
	 * @author 陈智颖
	 * @create 8/12/17 2:54 PM
	 * @return
	 **/
    Integer insertCompanyFund(CompanyFund companyFund);

	/**
	 * 根据门店id查询门店基金
     *
	 * @param
	 * @author 陈智颖
	 * @create 8/12/17 2:54 PM
	 * @return
	 **/
	CompanyFund selectCompanyFundUcc(CompanyFund companyFund);

	/**
	 * 插入公司管理费账单
	 *
	 * @param
	 * @author 陈智颖
	 * @create 11/10/17 15:14
	 * @return
	 **/
	Integer insertPlatformGsManage(PlatformGsManage platformGsManage);

	/**
	 * 根据合同code查询公司管理费
	 *
	 * @param
	 * @author 陈智颖
	 * @create 11/10/17 16:57
	 * @return
	 **/
	List<PlatformGsManage> selectPlatformGsManage(PlatformGsManage platformGsManage);
}
