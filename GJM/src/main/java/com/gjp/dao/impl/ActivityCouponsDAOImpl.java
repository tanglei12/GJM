package com.gjp.dao.impl;

import com.gjp.dao.ActivityCouponsDAO;
import com.gjp.dao.BaseDAO;
import com.gjp.model.UserCouponsConfigVo;
import com.gjp.model.UserCouponsUse;
import com.gjp.model.UserCouponsVo;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author JiangQt
 * @description
 * @date Created in 2017/12/23
 */
@Repository
public class ActivityCouponsDAOImpl extends BaseDAO implements ActivityCouponsDAO {
    @Override
    public Pagination<UserCouponsConfigVo> queryCouponsConfigList(Pagination<UserCouponsConfigVo> pagination){
        List<UserCouponsConfigVo> list = sqlSessionTemplateUser.selectList("com.gjp.dao.ActivityCouponsDAO.queryCouponsConfigList", pagination);
        Pagination<UserCouponsConfigVo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list);
        if (pagination.isPage()) {
            int totalRecords = sqlSessionTemplateUser.selectOne("com.gjp.dao.ActivityCouponsDAO.queryCouponsConfigListPageRecord", pagination);
            paginationTo.setTotalRecords(totalRecords);
        }
        return paginationTo;
    }

    @Override
    public Pagination<UserCouponsConfigVo> queryCouponsConfigPageList(Pagination<UserCouponsConfigVo> pagination){
        List<UserCouponsConfigVo> list = sqlSessionTemplateUser.selectList("com.gjp.dao.ActivityCouponsDAO.queryCouponsConfigPageList", pagination);
        Pagination<UserCouponsConfigVo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list);
        if (pagination.isPage()) {
            int totalRecords = sqlSessionTemplateUser.selectOne("com.gjp.dao.ActivityCouponsDAO.queryCouponsConfigCount", pagination);
            paginationTo.setTotalRecords(totalRecords);
        }
        return paginationTo;
    }

    @Override
    public Pagination<UserCouponsVo> queryCouponsList(Pagination<UserCouponsVo> pagination){
        List<UserCouponsVo> list = sqlSessionTemplateUser.selectList("com.gjp.dao.ActivityCouponsDAO.queryCouponsList", pagination);
        Pagination<UserCouponsVo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list);
        if (pagination.isPage()) {
            int totalRecords = sqlSessionTemplateUser.selectOne("com.gjp.dao.ActivityCouponsDAO.queryCouponsListPageRecord", pagination);
            paginationTo.setTotalRecords(totalRecords);
        }
        return paginationTo;
    }

    @Override
    public int addCouponsConfig(UserCouponsConfigVo userCouponsConfigVo) {
        return sqlSessionTemplateUser.insert("com.gjp.dao.ActivityCouponsDAO.addCouponsConfig", userCouponsConfigVo);
    }
    @Override
    public int updateCouponsConfig(UserCouponsConfigVo userCouponsConfigVo){
        return sqlSessionTemplateUser.update("com.gjp.dao.ActivityCouponsDAO.updateCouponsConfig", userCouponsConfigVo);
    }

    @Override
    public UserCouponsConfigVo selectCouponsConfig (UserCouponsConfigVo couponsConfigVo) {
       return sqlSessionTemplateUser.selectOne("com.gjp.dao.ActivityCouponsDAO.selectCouponsConfig", couponsConfigVo);
    }

    @Override
    public List<UserCouponsConfigVo> selectuccfgName () {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.ActivityCouponsDAO.selectuccfgName");
    }

    @Override
    public List<UserCouponsUse> queryCouponsUse (UserCouponsUse userCouponsUse) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.ActivityCouponsDAO.queryCouponsUse", userCouponsUse);
    }

}
