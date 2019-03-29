package com.gjp.service;

import com.gjp.dao.UserDao;
import com.gjp.model.*;
import com.gjp.util.PageModel;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 用户SERVICE
 *
 * @author JiangQt
 * @createTime 2015年11月19日下午5:58:03
 */
@Service
public class UserService {

    @Resource
    private UserDao userDao;

    /**
     * 查询用户认证分页列表
     *
     * @return
     * @author JiangQT
     */
    public PageModel<ViewUserAuthListVo> queryUserAuthViewList(PageModel<ViewUserAuthListVo> pageModel) {
        return userDao.queryUserAuthViewList(pageModel);
    }

    public int queryUserAuthViewListTotalRecords(Pagination<ViewUserAuthListVo> pagination) {
        return userDao.queryUserAuthViewListTotalRecords(pagination);
    }

    public ViewUserAuthListVo queryUserAuthView(ViewUserAuthListVo userAuthListVo) {
        return userDao.queryUserAuthView(userAuthListVo);
    }

    public boolean updateUserInfo(UserCenterUserVo userCenterUserVo) {
        return userDao.updateUserInfo(userCenterUserVo) > 0;
    }

    public boolean updateUserAuthInfo(UserCenterUserExtendVerifyAuth userExtendVerifyAuth) {
        return userDao.updateUserAuthInfo(userExtendVerifyAuth) > 0;
    }

    public void insertCardContracts(String cardNum, Integer con_id) {
        User user1 = new User();
        user1.setUser_cardNumber(cardNum);
        User user = userDao.queryUserCardNum(user1);
        RelationContract relationContract3 = new RelationContract();
        relationContract3.setContractObject_Id(con_id);
        userDao.deleteRelationContract(relationContract3);
        if (user != null) {
            RelationContract relationContract2 = new RelationContract();
            relationContract2.setCc_cardNum(user.getUser_cardNumber());
            // 查询是否存在室友
            List<RelationContract> relationContracts = userDao.queryCardContractUser(relationContract2);
            for (RelationContract relationContract : relationContracts) {
                relationContract.setUser_id(user.getUser_id());
                int count = userDao.queryRelationContractCount(relationContract);
                if (count == 0) {
                    // 添加合同用户关联
                    userDao.addRelationContract(relationContract);
                }
            }
        }
    }

    public UserAssetsVo queryUserAssets(UserAssetsVo userAssetsVo) {
        return userDao.queryUserAssets(userAssetsVo);
    }

    public boolean addUserAssets(UserAssetsVo userAssetsVo) {
        return userDao.addUserAssets(userAssetsVo) > 0;
    }

    public boolean updateUserAssets(UserAssetsVo userAssetsVo) {
        return userDao.updateUserAssets(userAssetsVo) > 0;
    }

    public UserMemberVo queryUserMember(Integer user_id) {
        UserMemberVo userMemberVo = new UserMemberVo();
        userMemberVo.setUser_id(user_id);
        return userDao.queryUserMember(userMemberVo);
    }

    public boolean addUserMember(UserMemberVo userMemberVo) {
        return userDao.addUserMember(userMemberVo) > 0;
    }

    public boolean addUserAssetsRecord(UserAssetsRecordVo assetsRecordVo) {
        return userDao.addUserAssetsRecord(assetsRecordVo) > 0;
    }

    public User queryUser(User user) {
        return userDao.queryUser(user);
    }
}
