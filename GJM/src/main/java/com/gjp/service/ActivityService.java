package com.gjp.service;

import com.gjp.dao.ActivityCouponsDAO;
import com.gjp.dao.ActivityDao;
import com.gjp.model.*;
import com.gjp.util.AppUtil;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @author JiangQt
 * @description
 * @date Created in 2017-12-19
 */
@Service
public class ActivityService {

    @Resource
    private ActivityDao activityDao;
    @Resource
    private ActivityCouponsDAO activityCouponsDAO;

    public int addActivityMange(ActivityManageVo activityManageVo) {
        return activityDao.addActivityMange(activityManageVo);
    }

    public int updateActivityManage(ActivityManageVo activityManageVo) {
        return activityDao.updateActivityManage(activityManageVo);
    }

    public Pagination<ActivityManageVo> queryActivityPageList(Pagination<ActivityManageVo> pagination) {
        return activityDao.queryActivityManage(pagination);
    }

    public ActivityManageVo queryActivityInfo(Integer am_id) {
        ActivityManageVo activityManageVo = new ActivityManageVo();
        activityManageVo.setAm_id(am_id);
        return activityDao.queryActivityInfo(activityManageVo);
    }

    public ActivityManageVo queryActivityInfo(ActivityManageVo activityManageVo) {
        return activityDao.queryActivityInfo(activityManageVo);
    }

    public Pagination<ActivityPrizeVo> queryActivityPrize(Pagination<ActivityPrizeVo> pagination) {
        return activityDao.queryActivityPrize(pagination);
    }

    public int addActivityPrize(ActivityPrizeVo activityPrizeVo) {
        return activityDao.addActivityPrize(activityPrizeVo);
    }

    public int updateActivityPrize(ActivityPrizeVo activityPrizeVo) {
        return activityDao.updateActivityPrize(activityPrizeVo);
    }

    public ActivityPrizeVo queryActivityPrizeInfo(Integer ap_id) {
        return activityDao.queryActivityPrizeInfo(ap_id);
    }

    public int addActivityPrizeImage(ActivityPrizeImageVo activityPrizeImageVo) {
        return activityDao.addActivityPrizeImage(activityPrizeImageVo);
    }

    public int deleteActiviPrizeImage(ActivityPrizeImageVo activityPrizeImageVo) {
        return activityDao.deleteActiviPrizeImage(activityPrizeImageVo);
    }

    public List<ActivityManageVo> queryActivityList(Pagination<ActivityManageVo> pagination) {
        return activityDao.queryActivityList(pagination);
    }

    public int addActivityImage(ActivityImageVo activityImageVo) {
        return activityDao.addActivityImage(activityImageVo);
    }

    public int deleteActivityImage(ActivityImageVo activityImageVo) {
        return activityDao.deleteActivityImage(activityImageVo);
    }

    public List<ActivityPrizeVo> queryPrizeListByCode(ActivityPrizeVo activityPrizeVo) {
        return activityDao.queryPrizeListByCode(activityPrizeVo);
    }

    public List<ActivityImageVo> queryActivityImageByCode(ActivityImageVo activityImageVo) {
        return activityDao.queryActivityImageByCode(activityImageVo);
    }

    /**
     * 奖品记录管理
     *
     * @author tanglei
     */
    public Pagination<ActivityPrizeRecordVo> queryPrizeRecordList(Pagination<ActivityPrizeRecordVo> pagination) {
        Pagination<ActivityPrizeRecordVo> paginationlist = activityDao.queryPrizeRecordList(pagination);
        return paginationlist;
    }

    /**
     * 分享列表
     *
     * @author tanglei
     */
    public Pagination<ActivityShareRecordVo> queryShareList(Pagination<ActivityShareRecordVo> pagination) {
        Pagination<ActivityShareRecordVo> paginationlist = activityDao.queryShareList(pagination);
        return paginationlist;
    }

    /**
     * 活动标题
     *
     * @author tanglei
     */
    public List<ActivityManageVo> selectActivityManageTitle() {
        return activityDao.selectActivityManageTitle();
    }

    /**
     * 奖品名称
     *
     * @author tanglei
     */
    public List<ActivityPrizeVo> selectPrizeName(ActivityPrizeVo prize) {
        return activityDao.selectPrizeName(prize);
    }

    /**
     * 优惠券配置列表
     *
     * @author tanglei
     */
    public Pagination<UserCouponsConfigVo> queryCouponsConfigList(Pagination<UserCouponsConfigVo> pagination) {
        Pagination<UserCouponsConfigVo> paginationlist = activityCouponsDAO.queryCouponsConfigList(pagination);
        return paginationlist;
    }

    /**
     * 优惠券配置列表
     *
     * @author tanglei
     */
    public Pagination<UserCouponsConfigVo> queryCouponsConfigPageList(Pagination<UserCouponsConfigVo> pagination) {
        Pagination<UserCouponsConfigVo> paginationlist = activityCouponsDAO.queryCouponsConfigPageList(pagination);
        return paginationlist;
    }

    /**
     * 添加优惠券配置
     *
     * @author tanglei
     */
    public int addCouponsConfig(UserCouponsConfigVo userCouponsConfigVo) {
        userCouponsConfigVo.setUccfg_code(new SimpleDateFormat("yyyyMMdd").format(new Date()) + AppUtil.getRandNum(3));
        userCouponsConfigVo.setUccfg_create_time(new Date());
        return activityCouponsDAO.addCouponsConfig(userCouponsConfigVo);
    }

    /**
     * 修改优惠券配置
     *
     * @author tanglei
     */
    public int updateCouponsConfig(UserCouponsConfigVo userCouponsConfigVo) {
        userCouponsConfigVo.setUccfg_create_time(new Date());
        return activityCouponsDAO.updateCouponsConfig(userCouponsConfigVo);
    }

    /**
     * 优惠券列表
     *
     * @author tanglei
     */
    public Pagination<UserCouponsVo> queryCouponsList(Pagination<UserCouponsVo> pagination) {
        return activityCouponsDAO.queryCouponsList(pagination);
    }

    /**
     * 查询优惠券配置
     *
     * @author tanglei
     */
    public UserCouponsConfigVo selectCouponsConfig(UserCouponsConfigVo couponsConfigVo) {
        return activityCouponsDAO.selectCouponsConfig(couponsConfigVo);
    }

    /**
     * 查询优惠券配置
     *
     * @author tanglei
     */
    public UserCouponsConfigVo selectCouponsConfig(Integer uccfg_id) {
        UserCouponsConfigVo couponsConfigVo = new UserCouponsConfigVo();
        couponsConfigVo.setUccfg_id(uccfg_id);
        return activityCouponsDAO.selectCouponsConfig(couponsConfigVo);
    }

    /**
     * 优惠券名称
     *
     * @author tanglei
     */
    public List<UserCouponsConfigVo> selectuccfgName() {
        return activityCouponsDAO.selectuccfgName();
    }

    /**
     * 会员管理
     *
     * @author tanglei
     */
    public Pagination<UserMemberVo> queryUserMember(Pagination<UserMemberVo> pagination) {
        return activityDao.queryUserMember(pagination);
    }

    public Integer queryUccfgByCode(ActivityPrizeVo activityPrizeVo) {
        return activityDao.queryUccfgByCode(activityPrizeVo);
    }

    public List<ActivityPrizeImageVo> queryPrizeImage(ActivityPrizeImageVo activityPrizeImageVo) {
        return activityDao.queryPrizeImage(activityPrizeImageVo);
    }

    public List<ActivityPrizeVo> queryActivityPrizeList(ActivityPrizeVo activityPrizeVo) {
        return activityDao.queryActivityPrizeList(activityPrizeVo);
    }

    /**
     * 优惠券用途
     *
     * @author tanglei
     */
    public List<UserCouponsUse> queryCouponsUse(UserCouponsUse userCouponsUse) {
        return activityCouponsDAO.queryCouponsUse(userCouponsUse);
    }
}
