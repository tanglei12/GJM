package com.gjp.dao.impl;

import com.gjp.dao.ActivityDao;
import com.gjp.dao.BaseDAO;
import com.gjp.model.*;
import com.gjp.util.OSSparameter;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author JiangQt
 * @description
 * @date Created in 2017-12-20
 */
@Repository
public class ActivityDaoImpl extends BaseDAO implements ActivityDao {
    @Override
    public Pagination<ActivityPrizeRecordVo> queryPrizeRecordList(Pagination<ActivityPrizeRecordVo> pagination) {
        List<ActivityPrizeRecordVo> list = sqlSessionTemplateProduct.selectList("com.gjp.dao.ActivityDao.queryPrizeRecordList", pagination);
        for (ActivityPrizeRecordVo prizeRecord : list) {
            prizeRecord.setAi_path(OSSparameter.imagePath(prizeRecord.getAi_path(), null, null));
            prizeRecord.setAip_path(OSSparameter.imagePath(prizeRecord.getAip_path(), null, null));
        }
        Pagination<ActivityPrizeRecordVo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list);
        if (pagination.isPage()) {
            int totalRecords = sqlSessionTemplateProduct.selectOne("com.gjp.dao.ActivityDao.queryPrizeRecordListPageRecord", pagination);
            paginationTo.setTotalRecords(totalRecords);
        }
        return paginationTo;
    }

    @Override
    public Pagination<ActivityShareRecordVo> queryShareList(Pagination<ActivityShareRecordVo> pagination) {
        List<ActivityShareRecordVo> list = sqlSessionTemplateProduct.selectList("com.gjp.dao.ActivityDao.queryShareList", pagination);
        for (ActivityShareRecordVo shareRecord : list) {
            shareRecord.setAi_path(OSSparameter.imagePath(shareRecord.getAi_path()));
        }
        Pagination<ActivityShareRecordVo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list);
        if (pagination.isPage()) {
            int totalRecords = sqlSessionTemplateProduct.selectOne("com.gjp.dao.ActivityDao.queryShareListPageRecord", pagination);
            paginationTo.setTotalRecords(totalRecords);
        }
        return paginationTo;
    }

    @Override
    public List<ActivityManageVo> selectActivityManageTitle() {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.ActivityDao.selectActivityManageTitle");
    }

    @Override
    public List<ActivityPrizeVo> selectPrizeName(ActivityPrizeVo prize) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.ActivityDao.selectPrizeName", prize);
    }

    @Override
    public int addActivityMange(ActivityManageVo activityManageVo) {
        return sqlSessionTemplateProduct.insert("com.gjp.dao.ActivityDao.addActivityMange", activityManageVo);
    }

    @Override
    public int updateActivityManage(ActivityManageVo activityManageVo) {
        return sqlSessionTemplateProduct.update("com.gjp.dao.ActivityDao.updateActivityManage", activityManageVo);
    }

    @Override
    public Pagination<ActivityManageVo> queryActivityManage(Pagination<ActivityManageVo> pagination) {
        List<ActivityManageVo> activityManageVos = sqlSessionTemplateProduct.selectList("com.gjp.dao.ActivityDao.queryActivityManage", pagination);
        int count = sqlSessionTemplateProduct.selectOne("com.gjp.dao.ActivityDao.queryActivityManageCount", pagination);
        pagination.setList(activityManageVos);
        pagination.setTotalRecords(count);
        return pagination;
    }

    @Override
    public ActivityManageVo queryActivityInfo(ActivityManageVo activityManageVo) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.ActivityDao.queryActivityInfo", activityManageVo);
    }

    @Override
    public Pagination<ActivityPrizeVo> queryActivityPrize(Pagination<ActivityPrizeVo> pagination) {
        List<ActivityPrizeVo> activityPrizeVos = sqlSessionTemplateProduct.selectList("com.gjp.dao.ActivityDao.queryActivityPrize", pagination);
        int count = sqlSessionTemplateProduct.selectOne("com.gjp.dao.ActivityDao.queryActivityPrizeCount", pagination);
        pagination.setList(activityPrizeVos);
        pagination.setTotalRecords(count);
        return pagination;
    }

    @Override
    public int addActivityPrize(ActivityPrizeVo activityPrizeVo) {
        return sqlSessionTemplateProduct.insert("com.gjp.dao.ActivityDao.addActivityPrize", activityPrizeVo);
    }

    @Override
    public int updateActivityPrize(ActivityPrizeVo activityPrizeVo) {
        return sqlSessionTemplateProduct.update("com.gjp.dao.ActivityDao.updateActivityPrize", activityPrizeVo);
    }

    @Override
    public ActivityPrizeVo queryActivityPrizeInfo(Integer ap_id) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.ActivityDao.queryActivityPrizeInfo", ap_id);
    }

    @Override
    public int addActivityPrizeImage(ActivityPrizeImageVo activityPrizeImageVo) {
        return sqlSessionTemplateProduct.insert("com.gjp.dao.ActivityDao.addActivityPrizeImage", activityPrizeImageVo);
    }

    @Override
    public int deleteActiviPrizeImage(ActivityPrizeImageVo activityPrizeImageVo) {
        return sqlSessionTemplateProduct.delete("com.gjp.dao.ActivityDao.deleteActiviPrizeImage", activityPrizeImageVo);
    }

    @Override
    public List<ActivityManageVo> queryActivityList(Pagination<ActivityManageVo> pagination) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.ActivityDao.queryActivityList", pagination);
    }

    @Override
    public int addActivityImage(ActivityImageVo activityImageVo) {
        return sqlSessionTemplateProduct.insert("com.gjp.dao.ActivityDao.addActivityImage", activityImageVo);
    }

    @Override
    public int deleteActivityImage(ActivityImageVo activityImageVo) {
        return sqlSessionTemplateProduct.delete("com.gjp.dao.ActivityDao.deleteActivityImage", activityImageVo);
    }

    @Override
    public List<ActivityPrizeVo> queryPrizeListByCode(ActivityPrizeVo activityPrizeVo) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.ActivityDao.queryPrizeListByCode", activityPrizeVo);
    }

    @Override
    public List<ActivityImageVo> queryActivityImageByCode(ActivityImageVo activityImageVo) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.ActivityDao.queryActivityImageByCode", activityImageVo);
    }

    @Override
    public Pagination<UserMemberVo> queryUserMember(Pagination<UserMemberVo> pagination) {
        List<UserMemberVo> list = sqlSessionTemplateProduct.selectList("com.gjp.dao.ActivityDao.queryUserMember", pagination);
        Pagination<UserMemberVo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list);
        if (pagination.isPage()) {
            int totalRecords = sqlSessionTemplateProduct.selectOne("com.gjp.dao.ActivityDao.queryUserMemberPageRecord", pagination);
            paginationTo.setTotalRecords(totalRecords);
        }
        return paginationTo;
    }

    @Override
    public Integer queryUccfgByCode(ActivityPrizeVo activityPrizeVo) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.ActivityDao.queryUccfgByCode", activityPrizeVo);
    }

    @Override
    public List<ActivityPrizeImageVo> queryPrizeImage(ActivityPrizeImageVo activityPrizeImageVo) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.ActivityDao.queryPrizeImage", activityPrizeImageVo);
    }

    @Override
    public List<ActivityPrizeVo> queryActivityPrizeList(ActivityPrizeVo activityPrizeVo) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.ActivityDao.queryActivityPrizeList", activityPrizeVo);
    }

}
