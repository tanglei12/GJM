package com.gjp.dao;

import com.gjp.model.*;
import com.gjp.util.PageModel;
import com.gjp.util.Pagination;

import java.util.List;

/**
 * 用户DAO
 *
 * @author JiangQt
 * @createTime 2015年11月19日下午5:57:37
 */
public interface UserDao {

    /**
     * 查询用户认证分页列表
     *
     * @return
     * @author JiangQT
     */
    PageModel<ViewUserAuthListVo> queryUserAuthViewList(PageModel<ViewUserAuthListVo> pageModel);

    /**
     * 查询用户认证分页列表条数
     *
     * @param pagination
     * @return
     * @author JiangQT
     */
    int queryUserAuthViewListTotalRecords(Pagination<ViewUserAuthListVo> pagination);

    /**
     * 查询用户认证信息
     *
     * @param userAuthListVo
     * @return
     * @author JiangQT
     */
    ViewUserAuthListVo queryUserAuthView(ViewUserAuthListVo userAuthListVo);

    int updateUserInfo(UserCenterUserVo userCenterUserVo);

    int updateUserAuthInfo(UserCenterUserExtendVerifyAuth userExtendVerifyAuth);

    /**
     * 根据身份证查询用户
     *
     * @param user
     * @return
     */
    User queryUserCardNum(User user);

    /**
     * 添加用户合同关系
     *
     * @param relationContract
     * @return
     */
    Integer addRelationContract(RelationContract relationContract);

    /**
     * 删除用户合同关系
     *
     * @param relationContract
     * @return
     */
    Integer deleteRelationContract(RelationContract relationContract);

    /**
     * 查询合同认证是否存在
     *
     * @param relationContract
     * @return
     */
    Integer queryRelationContractCount(RelationContract relationContract);

    /**
     * 查询合同关系列表
     *
     * @param relationContract
     * @return
     */
    List<RelationContract> queryRelationContractList(RelationContract relationContract);

    /**
     * 根据条件查询用户合同关系
     *
     * @param relationContract
     * @return
     */
    List<RelationContract> queryRelationContractWhere(RelationContract relationContract);

    /**
     * 根据合同No查询合同编号
     *
     * @param relationContract
     * @return
     */
    RelationContract queryContractRelationship(RelationContract relationContract);

    /**
     * 查询合同室友
     *
     * @param relationContract
     * @return
     */
    Integer queryContractUser(RelationContract relationContract);

    /**
     * 根据用户身份证查询合同合同签约或者室友
     *
     * @param relationContract
     * @return
     */
    List<RelationContract> queryCardContractUser(RelationContract relationContract);

    /**
     * 添加室友
     *
     * @param customerRelationship
     * @return
     */
    Integer addCustomerRelationship(CustomerRelationship customerRelationship);

    UserAssetsVo queryUserAssets(UserAssetsVo userAssetsVo);

    int addUserAssets(UserAssetsVo userAssetsVo);

    int updateUserAssets(UserAssetsVo userAssetsVo);

    UserMemberVo queryUserMember(UserMemberVo userMemberVo);

    int addUserMember(UserMemberVo userMemberVo);

    int addUserAssetsRecord(UserAssetsRecordVo assetsRecordVo);

    User queryUser(User user);
}
