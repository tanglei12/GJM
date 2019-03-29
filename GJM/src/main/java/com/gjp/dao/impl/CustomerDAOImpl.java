package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.CustomerDAO;
import com.gjp.model.*;
import com.gjp.util.OSSparameter;
import com.gjp.util.Pagination;
import com.gjp.util.TableList;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * @author 陈智颖
 * @version 创建时间：2016年8月1日 下午3:26:19
 */
@Repository
public class CustomerDAOImpl extends BaseDAO implements CustomerDAO {

    @Override
    public List<UserCustomer> selectAllCustomer() {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.selectAllCustomer");
    }

    @Override
    public List<UserCustomer> selectCustomerWhere(UserCustomer userCustomer) {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.selectCustomerWhere", userCustomer);
    }

    @Override
    public List<HouseInfoKeep> selectCustomerHouseWhere(HouseInfoKeep houseInfoKeep) {
        return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.selectCustomerHouseWhere", houseInfoKeep);
    }

    @Override
    public UserCustomer selectCustomerOne(UserCustomer userCustomer) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.selectCustomerOne", userCustomer);

    }

    @Override
    public int insertCustomerOne(UserCustomer userCustomer) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.CustomerDAO.insertCustomerOne", userCustomer);
    }

    @Override
    public UserCustomer selectCustomerCodeOne(UserCustomer userCustomer) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.selectCustomerCodeOne", userCustomer);
    }

    @Override
    public UserCustomer selectCustomerPhoneOne(UserCustomer userCustomer) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.selectCustomerPhoneOne", userCustomer);
    }

    @Override
    public int addCustomerImage(UserCustomerImage customerImage) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.CustomerDAO.addCustomerImage", customerImage);
    }

    @Override
    public Pagination<UserCustomer> queryCustomerInfoPageList(Pagination<UserCustomer> pagination) {
        List<UserCustomer> list = sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.queryCustomerInfoPageList", pagination);
        int totalRecords = sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.queryCustomerInfoPageListRecord", pagination);
        for (UserCustomer userCustomer : list) {
            UserCustomerImage customerImage = new UserCustomerImage();
            customerImage.setCc_id(userCustomer.getCc_id());
            customerImage.setCci_state(0);
            List<UserCustomerImage> customerImages = sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.queryCustomerImage", customerImage);
            for (UserCustomerImage userCustomerImage : customerImages) {
                userCustomerImage.setCci_path(OSSparameter.imagePath(userCustomerImage.getCci_path()));
            }
            userCustomer.setCustomerImages(customerImages);
        }
        pagination.setList(list);
        pagination.setTotalRecords(totalRecords);
        return pagination;
    }

    @Override
    public UserCustomer queryCustomerInfo(UserCustomer customer) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.queryCustomerInfo", customer);
    }

    @Override
    public List<UserCustomer> queryCustomerRelaContractList(UserCustomer customer) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.queryCustomerRelaContractList", customer);
    }

    @Override
    public List<UserCustomerImage> queryCustomerImage(UserCustomerImage customerImage) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.queryCustomerImage", customerImage);
    }

    @Override
    public int deleteCustomerRelaContractInfo(UserCustomerRelationship customerRelationship) {
        return sqlSessionTemplateUser.delete("com.gjp.dao.CustomerDAO.deleteCustomerRelaContractInfo", customerRelationship);
    }

    @Override
    public int addCustomerRelaContractInfo(UserCustomerRelationship customerRelationship) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.CustomerDAO.addCustomerRelaContractInfo", customerRelationship);
    }

    @Override
    public int updateCustomer(UserCustomer userCustomer) {
        return sqlSessionTemplateUser.update("com.gjp.dao.CustomerDAO.updateCustomer", userCustomer);
    }

    @Override
    public UserCustomer selectCustomerCode(UserCustomer userCustomer) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.selectCustomerCode", userCustomer);
    }

    public UserCustomerBank queryCustomerBank(UserCustomerBank customerBank) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.queryCustomerBank", customerBank);
    }

    @Override
    public UserCustomer selectCustomerCard(UserCustomer userCustomer) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.selectCustomerCard", userCustomer);
    }

    @Override
    public List<UserCustomer> selectCustomerRelationshipPerson(UserCustomer userCustomer) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.selectCustomerRelationshipPerson", userCustomer);
    }

    @Override
    public int updateCustomerImage(UserCustomerImage customerImage) {
        return sqlSessionTemplateUser.update("com.gjp.dao.CustomerDAO.updateCustomerImage", customerImage);
    }

    @Override
    public List<UserCustomerPhone> queryCustomerPhone(UserCustomerPhone customerPhone) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.queryCustomerPhone", customerPhone);
    }

    @Override
    public List<UserCustomerBank> queryCustomerBankList(UserCustomerBank customerBank) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.queryCustomerBankList", customerBank);
    }

    @Override
    public int addCustomerBank(UserCustomerBank userCustomerBank) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.CustomerDAO.addCustomerBank", userCustomerBank);
    }

    @Override
    public int updateCustomerBank(UserCustomerBank userCustomerBank) {
        return sqlSessionTemplateUser.update("com.gjp.dao.CustomerDAO.updateCustomerBank", userCustomerBank);
    }

    @Override
    public int deleteCustomerPhone(UserCustomerPhone customerPhone) {
        return sqlSessionTemplateUser.delete("com.gjp.dao.CustomerDAO.deleteCustomerPhone", customerPhone);
    }

    @Override
    public int deleteCustomerImage(UserCustomerImage customerImage) {
        return sqlSessionTemplateUser.delete("com.gjp.dao.CustomerDAO.deleteCustomerImage", customerImage);
    }

    @Override
    public int deleteCustomerBank(UserCustomerBank customerBank) {
        return sqlSessionTemplateUser.delete("com.gjp.dao.CustomerDAO.deleteCustomerBank", customerBank);
    }

    @Override
    public int addCustomerPhone(UserCustomerPhone customerPhone) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.CustomerDAO.addCustomerPhone", customerPhone);
    }

    @Override
    public int updateCustomerRelaContractForState(UserCustomerRelationship customerRelationship) {
        return sqlSessionTemplateUser.update("com.gjp.dao.CustomerDAO.updateCustomerRelaContractForState", customerRelationship);
    }

    @Override
    public List<UserCustomer> queryCustomerPerson(UserCustomer userCustomer) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.queryCustomerPerson", userCustomer);
    }

    @Override
    public UserCustomer queryCustomerPersonCount(UserCustomer customer) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.queryCustomerPersonCount", customer);
    }

    @Override
    public UserCustomer queryCustomerByPhone(String ccp_phone) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.queryCustomerByPhone", ccp_phone);
    }

    @Override
    public List<CustomerStayThingVo> queryContractTenantCustomer(Pagination<CustomerStayThingVo> page) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.queryContractTenantCustomer", page);
    }

    @Override
    public List<CustomerStayThingVo> queryContractLandlordCustomer(Pagination<CustomerStayThingVo> page) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.queryContractLandlordCustomer", page);
    }

    @Override
    public UserCustomer selectCustomerOneNum(UserCustomer userCustomer) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.selectCustomerOneNum", userCustomer);
    }

    @Override
    public UserCustomer queryCustomerID(UserCustomer userCustomer) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.queryCustomerID", userCustomer);
    }

    @Override
    public Integer addCustomerExtendInfo(UserCustomer userCustomer) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.CustomerDAO.addCustomerExtendInfo", userCustomer);
    }

    @Override
    public Integer addCustomerIDInfo(UserCustomerID userCustomerID) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.CustomerDAO.addCustomerIDInfo", userCustomerID);
    }

    @Override
    public Integer addCustomerLinkMan(UserCustomerLinkMan userCustomerLinkMan) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.CustomerDAO.addCustomerLinkMan", userCustomerLinkMan);
    }

    @Override
    public UserCustomer queryCustomerExtendInfoById(UserCustomer userCustomer) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.queryCustomerExtendInfoById", userCustomer);
    }

    @Override
    public List<UserCustomerID> queryCustomerIDInfoById(UserCustomerID userCustomerID) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.queryCustomerIDInfoById", userCustomerID);
    }

    @Override
    public List<UserCustomerLinkMan> queryCustomerLinkManInfoById(UserCustomerLinkMan userCustomerLinkMan) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.queryCustomerLinkManInfoById", userCustomerLinkMan);
    }

    @Override
    public Integer updCustomerExtendInfo(UserCustomer userCustomer) {
        return sqlSessionTemplateUser.update("com.gjp.dao.CustomerDAO.updCustomerExtendInfo", userCustomer);
    }

    @Override
    public Integer delCustomerIDInfo(UserCustomerID userCustomerID) {
        return sqlSessionTemplateUser.update("com.gjp.dao.CustomerDAO.delCustomerIDInfo", userCustomerID);
    }

    @Override
    public Integer delCustomerLinkMan(UserCustomerLinkMan userCustomerLinkMan) {
        return sqlSessionTemplateUser.update("com.gjp.dao.CustomerDAO.delCustomerLinkMan", userCustomerLinkMan);
    }

    @Override
    public Integer addCustomerIntention(UserCustomerIntention userCustomerIntention) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.CustomerDAO.addCustomerIntention", userCustomerIntention);
    }

    @Override
    public Pagination<UserCustomerIntention> queryCustomerIntention(Pagination<TableList> pagination) {
        List<UserCustomerIntention> userCustomerIntentionList = sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.queryCustomerIntention", pagination);

        if (null != userCustomerIntentionList) {
            for (UserCustomerIntention userCustomerIntention : userCustomerIntentionList) {
                List<UserCustomerImage> customerImages = new ArrayList<>();
                UserCustomerImage customerImage1 = new UserCustomerImage();
                customerImage1.setCci_type("CD1");
                customerImage1.setCci_path(userCustomerIntention.getImg_card1());
                ;
                customerImages.add(customerImage1);
                UserCustomerImage customerImage2 = new UserCustomerImage();
                customerImage2.setCci_type("CD2");
                customerImage2.setCci_path(userCustomerIntention.getImg_card2());
                ;
                customerImages.add(customerImage2);
                userCustomerIntention.setCustomerImages(customerImages);
            }
        }

        int totalRecords = sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.queryCustomerIntentionCount", pagination);
        Pagination<UserCustomerIntention> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(userCustomerIntentionList, totalRecords);
        return paginationTo;
    }

    @Override
    public List<UserCenterType> queryUserCenterTypeList(Integer type_id) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.queryUserCenterTypeList", type_id);
    }

    @Override
    public int addUserCustomerLog(UserCustomerLog userCustomerLog) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.CustomerDAO.addUserCustomerLog", userCustomerLog);
    }

    @Override
    public int addUserCustomerLogAttachment(UserCustomerLogAttachment userCustomerLogAttachment) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.CustomerDAO.addUserCustomerLogAttachment", userCustomerLogAttachment);
    }

    @Override
    public List<UserCustomerLog> queryUserCustomerLogList(Pagination<UserCustomerLog> pagination) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.queryUserCustomerLogList", pagination);
    }

    @Override
    public int queryUserCustomerLogListCount(Pagination<UserCustomerLog> pagination) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.queryUserCustomerLogListCount", pagination);
    }

    @Override
    public List<UserCustomerLogAttachment> queryLogAttachmentListByClId(UserCustomerLogAttachment userCustomerLogAttachment) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.queryLogAttachmentListByClId", userCustomerLogAttachment);
    }

    @Override
    public int delLogAttachmentListByClId(Integer cl_id) {
        return sqlSessionTemplateUser.delete("com.gjp.dao.CustomerDAO.delLogAttachmentListByClId", cl_id);
    }

    @Override
    public UserCustomerIntention queryCustomerIntentionById(Integer cc_id) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.queryCustomerIntentionById", cc_id);
    }

    @Override
    public UserCustomerIntention queryCustomerIntentionByCode(String cc_code) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.queryCustomerIntentionByCode", cc_code);
    }

    @Override
    public List<CustomerStayThingVo> queryHouseSeeingListByCode(Pagination<CustomerStayThingVo> pagination) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.queryHouseSeeingListByCode", pagination);
    }

    @Override
    public int queryHouseSeeingListByCodeCount(Pagination<CustomerStayThingVo> pagination) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.queryHouseSeeingListByCodeCount", pagination);
    }

    @Override
    public int addCustomerBlackList(UserCustomerBlackList userCustomerBlackList) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.CustomerDAO.addCustomerBlackList", userCustomerBlackList);
    }

    @Override
    public Pagination<UserCustomerBlackList> queryCustomerBlackList(Pagination<TableList> pagination) {
        List<UserCustomerBlackList> userCustomerBlackLists = sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.queryCustomerBlackList", pagination);
        int totalRecords = sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.queryCustomerBlackListCount", pagination);

        Pagination<UserCustomerBlackList> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(userCustomerBlackLists, totalRecords);
        return paginationTo;
    }

    @Override
    public UserCustomerBlackList queryCustomerBlackListById(Integer bl_id) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.queryCustomerBlackListById", bl_id);
    }

    @Override
    public int updCustomerBlackList(UserCustomerBlackList userCustomerBlackList) {
        return sqlSessionTemplateUser.update("com.gjp.dao.CustomerDAO.updCustomerBlackList", userCustomerBlackList);
    }

    @Override
    public UserCustomer queryCustomerInfoById(Integer ce_id) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.queryCustomerInfoById", ce_id);
    }

    @Override
    public int updCustomerIntentionByCode(UserCustomerIntention userCustomerIntention) {
        return sqlSessionTemplateUser.update("com.gjp.dao.CustomerDAO.updCustomerIntention", userCustomerIntention);
    }

    @Override
    public List<UserCustomerBlackList> checkBlackList(UserCustomerBlackList userCustomerBlackList) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.checkBlackList", userCustomerBlackList);
    }

    @Override
    public int updCustomerIntention(UserCustomerIntention userCustomerIntention) {
        return sqlSessionTemplateUser.update("com.gjp.dao.CustomerDAO.updCustomerIntention", userCustomerIntention);
    }

    @Override
    public List<UserCustomerIntention> queryCustomerIntentionByCardNum(String cc_cardNum) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.queryCustomerIntentionByCardNum", cc_cardNum);
    }

    @Override
    public int updHouseSeeingRecordByCode(String cc_code) {
        return sqlSessionTemplateUser.update("com.gjp.dao.CustomerDAO.updHouseSeeingRecordByCode", cc_code);
    }

    @Override
    public UserCustomer queryCustomerExtendInfoByCode(UserCustomer userCustomer) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.queryCustomerExtendInfoByCode", userCustomer);
    }

    @Override
    public List<UserCustomer> selectHiCode(UserCustomer customer) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.selectHiCode", customer);
    }

    @Override
    public User queryUserByCode(String cc_code) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerDAO.queryUserByCode", cc_code);
    }

    @Override
    public List<UserCustomer> queryCustomerByHiCode(String hi_code) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerDAO.queryCustomerByHiCode", hi_code);
    }


}
