package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.UserDao;
import com.gjp.model.*;
import com.gjp.util.PageModel;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 用户DAO实现类
 *
 * @author JiangQt
 * @createTime 2015年11月19日下午5:57:23
 */
@Repository
public class UserDaoImpl extends BaseDAO implements UserDao {

    @Override
    public PageModel<ViewUserAuthListVo> queryUserAuthViewList(PageModel<ViewUserAuthListVo> pageModel) {

        List<ViewUserAuthListVo> viewUserAuthListVo = sqlSessionTemplateUser.selectList("com.gjp.dao.UserDao.queryUserAuthViewList", pageModel);
        int totalRecords = sqlSessionTemplateUser.selectOne("com.gjp.dao.UserDao.queryUserAuthViewListTotalRecords", pageModel);
        pageModel.setList(viewUserAuthListVo);
        pageModel.setTotalRecords(totalRecords);

        return pageModel;
    }

    @Override
    public int queryUserAuthViewListTotalRecords(Pagination<ViewUserAuthListVo> pagination) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserDao.queryUserAuthViewListTotalRecords", pagination);
    }

    @Override
    public ViewUserAuthListVo queryUserAuthView(ViewUserAuthListVo userAuthListVo) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserDao.queryUserAuthView", userAuthListVo);
    }

    @Override
    public int updateUserInfo(UserCenterUserVo userCenterUserVo) {
        return sqlSessionTemplateUser.update("com.gjp.dao.UserDao.updateUserInfo", userCenterUserVo);
    }

    @Override
    public int updateUserAuthInfo(UserCenterUserExtendVerifyAuth userExtendVerifyAuth) {
        return sqlSessionTemplateUser.update("com.gjp.dao.UserDao.updateUserAuthInfo", userExtendVerifyAuth);
    }

    @Override
    public User queryUserCardNum(User user) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserDao.queryUserCardNum", user);
    }

    @Override
    public Integer addRelationContract(RelationContract relationContract) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.UserDao.addRelationContract", relationContract);
    }

    @Override
    public Integer deleteRelationContract(RelationContract relationContract) {
        return sqlSessionTemplateUser.delete("com.gjp.dao.UserDao.deleteRelationContract", relationContract);
    }

    @Override
    public Integer queryRelationContractCount(RelationContract relationContract) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserDao.queryRelationContractCount", relationContract);
    }

    @Override
    public List<RelationContract> queryRelationContractList(RelationContract relationContract) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserDao.queryRelationContractList", relationContract);
    }

    @Override
    public List<RelationContract> queryRelationContractWhere(RelationContract relationContract) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserDao.queryRelationContractWhere", relationContract);
    }

    @Override
    public RelationContract queryContractRelationship(RelationContract relationContract) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserDao.queryContractRelationship", relationContract);
    }

    @Override
    public Integer queryContractUser(RelationContract relationContract) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserDao.queryContractUser", relationContract);
    }

    @Override
    public List<RelationContract> queryCardContractUser(RelationContract relationContract) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.UserDao.queryCardContractUser", relationContract);
    }

    @Override
    public Integer addCustomerRelationship(CustomerRelationship customerRelationship) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.UserDao.addCustomerRelationship", customerRelationship);
    }

    @Override
    public UserAssetsVo queryUserAssets(UserAssetsVo userAssetsVo) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserDao.queryUserAssets", userAssetsVo);
    }

    @Override
    public int addUserAssets(UserAssetsVo userAssetsVo) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.UserDao.addUserAssets", userAssetsVo);
    }

    @Override
    public int updateUserAssets(UserAssetsVo userAssetsVo) {
        return sqlSessionTemplateUser.update("com.gjp.dao.UserDao.updateUserAssets", userAssetsVo);
    }

    @Override
    public UserMemberVo queryUserMember(UserMemberVo userMemberVo) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserDao.queryUserMember", userMemberVo);
    }

    @Override
    public int addUserMember(UserMemberVo userMemberVo) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.UserDao.addUserMember", userMemberVo);
    }

    @Override
    public int addUserAssetsRecord(UserAssetsRecordVo assetsRecordVo) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.UserDao.addUserAssetsRecord", assetsRecordVo);
    }

    @Override
    public User queryUser(User user) {
        return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserDao.queryUser", user);
    }


}
