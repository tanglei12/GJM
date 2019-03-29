package com.gjp.dao.impl;

import com.gjp.dao.AchievementCompanyDAO;
import com.gjp.dao.BaseDAO;
import com.gjp.model.*;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 * @version 创建时间：2016年5月13日 上午10:54:28
 */
@Repository
public class AchievementCompanyDAOImpl extends BaseDAO implements AchievementCompanyDAO {

    @Override
    public Integer addCompanyAchievement(AchievementCompanyAchievement companyAchievement) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.AchievementCompanyDAO.addCompanyAchievement", companyAchievement);
    }

    @Override
    public Integer deleteCompanyAchievement(AchievementCompanyAchievement companyAchievement) {
        return super.sqlSessionTemplateBusiness.delete("com.gjp.dao.AchievementCompanyDAO.deleteCompanyAchievement", companyAchievement);
    }

    @Override
    public Integer addTeamAchievement(AchievementTeamAchievement teamAchievement) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.AchievementCompanyDAO.addTeamAchievement", teamAchievement);
    }

    @Override
    public Integer addAchievementPersonAchievement(AchievementPersonAchievement personAchievement) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.AchievementCompanyDAO.addAchievementPersonAchievement", personAchievement);
    }

    @Override
    public Integer deleteTeamAchievement(AchievementTeamAchievement teamAchievement) {
        return super.sqlSessionTemplateBusiness.delete("com.gjp.dao.AchievementCompanyDAO.deleteTeamAchievement", teamAchievement);
    }

    @Override
    public Integer deletePersonAchievement(AchievementPersonAchievement personAchievement) {
        return super.sqlSessionTemplateBusiness.delete("com.gjp.dao.AchievementCompanyDAO.deletePersonAchievement", personAchievement);
    }

    @Override
    public List<AchievementCompanyAchievement> selectCompanyAchievement(AchievementCompanyAchievement companyAchievement) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectCompanyAchievement", companyAchievement);
    }

    @Override
    public Integer updateCompanyAchievement(AchievementCompanyAchievement companyAchievement) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.AchievementCompanyDAO.updateCompanyAchievement", companyAchievement);
    }

    @Override
    public Integer updateTeamAchievement(AchievementTeamAchievement teamAchievement) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.AchievementCompanyDAO.updateTeamAchievement", teamAchievement);
    }

    @Override
    public Integer addAchievementSetting(AchievementSetting achievementSetting) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.AchievementCompanyDAO.addAchievementSetting", achievementSetting);
    }

    @Override
    public Integer updateAchievementSetting(AchievementSetting achievementSetting) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.AchievementCompanyDAO.updateAchievementSetting", achievementSetting);
    }

    @Override
    public AchievementSetting selectAchievementSetting() {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.AchievementCompanyDAO.selectAchievementSetting");
    }

    @Override
    public List<ViewBusinessContractVo> selectContractNo(ViewBusinessContractVo viewBusinessContractVo) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectContractNo", viewBusinessContractVo);
    }

    @Override
    public List<ViewContractStatement> selectContractNoShutTime(ViewContractStatement viewContractStatement) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectContractNoShutTime", viewContractStatement);
    }

    @Override
    public Integer insertSumAchievement(AchievementSumAchievement achievementSumAchievement) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.AchievementCompanyDAO.insertSumAchievement", achievementSumAchievement);
    }

    @Override
    public Integer insertAchievementBill(AchievementBill achievementBill) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.AchievementCompanyDAO.insertAchievementBill", achievementBill);
    }

    @Override
    public Integer insertAchievementBillContent(AchievementBillContent achievementBillContent) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.AchievementCompanyDAO.insertAchievementBillContent", achievementBillContent);
    }

    @Override
    public List<AchievementSumAchievement> selectAchievementSumAchievement(AchievementSumAchievement companyAchievement) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectAchievementSumAchievement", companyAchievement);
    }

    @Override
    public List<AchievementSumAchievement> selectSumAchievementID(AchievementSumAchievement sumAchievement) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectSumAchievementID", sumAchievement);
    }

    @Override
    public List<AchievementBill> selectAchievementBilID(Integer sa_id) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectAchievementBilID", sa_id);
    }

    @Override
    public List<AchievementBillContent> selectAchievementBillContent(Integer ab_id) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectAchievementBillContent", ab_id);
    }

    @Override
    public Integer updateSumAchievement(AchievementSumAchievement achievementSumAchievement) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.AchievementCompanyDAO.updateSumAchievement", achievementSumAchievement);
    }

    @Override
    public Integer updateAchievementBill(AchievementBill achievementBill) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.AchievementCompanyDAO.updateAchievementBill", achievementBill);
    }

    @Override
    public Integer updateAchievementBillContentBT(AchievementBillContent achievementBillContent) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.AchievementCompanyDAO.updateAchievementBillContentBT", achievementBillContent);
    }

    @Override
    public List<ViewBusinessContractVo> selectContractDateToDate(ViewBusinessContractVo viewBusinessContractVo) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectContractDateToDate", viewBusinessContractVo);
    }

    @Override
    public List<ViewSumAchievement> selectAchievementSumMoney(ViewSumAchievement viewSumAchievement) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectAchievementSumMoney", viewSumAchievement);
    }

    @Override
    public List<AchievementBill> selectAchievementBilABID(AchievementBill achievementBill) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectAchievementBilABID", achievementBill);
    }

    @Override
    public List<AchievementBill> selectAchievementBilemID(AchievementBill achievementBill) {
        return super.sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectAchievementBilemID", achievementBill);
    }

    @Override
    public List<ViewTeamAchievementListVo> selectTeamAchievementList(ViewTeamAchievementListVo achievementListVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectTeamAchievementList", achievementListVo);
    }

    @Override
    public AchievementCompanyAchievement selectCompanyAchievementByWhere(AchievementCompanyAchievement companyAchievement) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.AchievementCompanyDAO.selectCompanyAchievementByWhere", companyAchievement);
    }

    @Override
    public AchievementSumAchievement selectAchievementSumByWhere(AchievementSumAchievement sumAchievement) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.AchievementCompanyDAO.selectAchievementSumByWhere", sumAchievement);
    }

    @Override
    public List<ViewHouseAchievementVo> selectAchievementSumListByWhere(ViewHouseAchievementVo sumAchievement) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectAchievementSumListByWhere", sumAchievement);
    }

    @Override
    public AchievementBill selectAchievementBillTotalByWhere(AchievementBill achievementBill) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.AchievementCompanyDAO.selectAchievementBillTotalByWhere", achievementBill);
    }

    @Override
    public List<AchievementBill> selectAchievementBillListByWhere(AchievementBill achievementBill) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectAchievementBillListByWhere", achievementBill);
    }

    @Override
    public List<AchievementBill> selectAchievementBillSimpleList(Pagination<AchievementBill> pagination) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectAchievementBillSimpleList", pagination);
    }

    @Override
    public List<ViewAchievementEmployeeVo> selectAchievementEmployeeList(ViewAchievementEmployeeVo achievementEmployeeVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectAchievementEmployeeList", achievementEmployeeVo);
    }

    @Override
    public int selectAchievementBillSimpleListTotalRecords(Pagination<AchievementBill> pagination) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.AchievementCompanyDAO.selectAchievementBillSimpleListTotalRecords", pagination);
    }

    @Override
    public List<AchievementCompanyAchievement> selectCompanyAchievementList(AchievementCompanyAchievement companyAchievement) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectCompanyAchievementList", companyAchievement);
    }

    @Override
    public AchievementBill selectAchievementBillLossByWhere(AchievementBill achievementBill) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.AchievementCompanyDAO.selectAchievementBillLossByWhere", achievementBill);
    }

    @Override
    public List<AchievementCompanyAchievement> selectCompanyAchievementDate() {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectCompanyAchievementDate");
    }

    @Override
    public ViewSumAchievement selectAchievementSumMoneys(ViewSumAchievement viewSumAchievement) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.AchievementCompanyDAO.selectAchievementSumMoneys", viewSumAchievement);
    }

    @Override
    public List<ViewSumAchievement> selectAchievementPerson(ViewSumAchievement achievement) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectAchievementPerson", achievement);
    }

    @Override
    public List<AchievementPersonAchievement> selectAchievementPersonTarget(AchievementPersonAchievement achievement) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectAchievementPersonTarget", achievement);
    }

    @Override
    public int selectMyHouse(ViewBusinessContractRelaEmpVo empVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.AchievementCompanyDAO.selectMyHouse", empVo);
    }

    @Override
    public Integer updateCompanyAchievementContID(AchievementSumAchievement sumAchievement) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.AchievementCompanyDAO.updateCompanyAchievementContID", sumAchievement);
    }

    @Override
    public Integer addAchievementSettingDetails(AchievementSettingDetails achievementSettingDetails) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.AchievementCompanyDAO.addAchievementSettingDetails", achievementSettingDetails);
    }

    @Override
    public Integer deleteAchievementSettingDetails(AchievementSettingDetails achievementSettingDetails) {
        return super.sqlSessionTemplateBusiness.delete("com.gjp.dao.AchievementCompanyDAO.deleteAchievementSettingDetails", achievementSettingDetails);
    }

    @Override
    public List<AchievementSettingDetails> selectAchievementSettingDetails(AchievementSettingDetails achievementSettingDetails) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectAchievementSettingDetails", achievementSettingDetails);
    }

    @Override
    public Integer updateContractObjectServiceBool(ViewBusinessContractVo viewBusinessContractVo) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.AchievementCompanyDAO.updateContractObjectServiceBool", viewBusinessContractVo);
    }

    @Override
    public List<ViewSumAchievement> queryAchievementBillList(ViewSumAchievement viewSumAchievement) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.queryAchievementBillList", viewSumAchievement);
    }

    @Override
    public int deleteAchievementBillContent(AchievementBillContent achievementBillContent) {
        return super.sqlSessionTemplateBusiness.delete("com.gjp.dao.AchievementCompanyDAO.deleteAchievementBillContent", achievementBillContent);
    }

    @Override
    public int deleteAchievementBill(AchievementBill achievementBill) {
        return super.sqlSessionTemplateBusiness.delete("com.gjp.dao.AchievementCompanyDAO.deleteAchievementBill", achievementBill);
    }

    @Override
    public int deleteAchievement(AchievementSumAchievement achievementSumAchievement) {
        return super.sqlSessionTemplateBusiness.delete("com.gjp.dao.AchievementCompanyDAO.deleteAchievement", achievementSumAchievement);
    }

    @Override
    public int addAchievementRecord(AchievementRecord achievementRecord) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.AchievementCompanyDAO.addAchievementRecord", achievementRecord);
    }

    @Override
    public List<AchievementRecord> queryAchiRecord(AchievementRecord achievementRecord) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.queryAchiRecord", achievementRecord);
    }

    @Override
    public AchievementRecord queryAchiRecordLastOne(AchievementRecord achievementRecord) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.AchievementCompanyDAO.queryAchiRecordLastOne", achievementRecord);
    }

    @Override
    public AchievementHouseMoney selectHouseMoney(AchievementHouseMoney achievementHouseMoney) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.AchievementCompanyDAO.selectHouseMoney", achievementHouseMoney);
    }

    @Override
    public int addHouseMoney(AchievementHouseMoney achievementHouseMoney) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.AchievementCompanyDAO.addHouseMoney", achievementHouseMoney);
    }

    @Override
    public int updateHouseMoney(AchievementHouseMoney achievementHouseMoney) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.AchievementCompanyDAO.updateHouseMoney", achievementHouseMoney);
    }

    @Override
    public List<PropertyMoney> selectPropertyMoney(PropertyMoney propertyMoney) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectPropertyMoney", propertyMoney);
    }

    @Override
    public PositionRecordVo selectPositionRecord(PositionRecordVo positionRecordVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.AchievementCompanyDAO.selectPositionRecord", positionRecordVo);
    }

    @Override
    public List<ServiceMoney> selectDeclaration(ServiceMoney serviceMoney) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectDeclaration", serviceMoney);
    }

    @Override
    public List<AchievementHouseMoneyVo> selectAchievementHouseMoneyNo(AchievementHouseMoneyVo achievementHouseMoneyVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectAchievementHouseMoneyNo", achievementHouseMoneyVo);
    }

    @Override
    public List<AchievementHouseMoneyVo> selectAchievementHouseMoneyUcc(AchievementHouseMoneyVo achievementHouseMoneyVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectAchievementHouseMoneyUcc", achievementHouseMoneyVo);
    }

    @Override
    public List<ViewBusinessContractVo> queryHouseInfomationKeepContract(ViewBusinessContractVo viewBusinessContractVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.queryHouseInfomationKeepContract", viewBusinessContractVo);
    }

    @Override
    public Integer updateContractHouseAchievementBool(ContractObjectVo contractObjectVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.AchievementCompanyDAO.updateContractHouseAchievementBool", contractObjectVo);
    }

    @Override
    public List<ContractObjectVo> selectContractObjectMD(ContractObjectVo contractObjectVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectContractObjectMD", contractObjectVo);
    }

    @Override
    public List<ManageFees> queryManageFees(ManageFees manageFees) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.queryManageFees", manageFees);
    }

    @Override
    public List<RentFree> queryRentFree(RentFree rentFree) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.queryRentFree", rentFree);
    }

    @Override
    public Integer insertCompanyFund(CompanyFund companyFund) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.AchievementCompanyDAO.insertCompanyFund", companyFund);
    }

    @Override
    public CompanyFund selectCompanyFundUcc(CompanyFund companyFund) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.AchievementCompanyDAO.selectCompanyFundUcc", companyFund);
    }

    @Override
    public Integer insertPlatformGsManage(PlatformGsManage platformGsManage) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.AchievementCompanyDAO.insertPlatformGsManage", platformGsManage);
    }

    @Override
    public List<PlatformGsManage> selectPlatformGsManage(PlatformGsManage platformGsManage) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.AchievementCompanyDAO.selectPlatformGsManage", platformGsManage);
    }

}
