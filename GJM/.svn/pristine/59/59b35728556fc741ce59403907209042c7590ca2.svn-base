package com.gjp.dao;

import com.gjp.model.*;
import com.gjp.util.Pagination;

import java.util.List;

/**
 * @author JiangQt
 * @description
 * @date Created in 2017-12-20
 */
public interface ActivityDao {

    /**
     * 新增活动
     *
     * @param activityManageVo
     * @return
     */
    int addActivityMange(ActivityManageVo activityManageVo);

    /**
     * 奖品记录管理
     *
     * @author tanglei
     */
    Pagination<ActivityPrizeRecordVo> queryPrizeRecordList(Pagination<ActivityPrizeRecordVo> pagination);

    /**
     * 分享列表
     *
     * @author tanglei
     */
    Pagination<ActivityShareRecordVo> queryShareList(Pagination<ActivityShareRecordVo> pagination);

    /**
     * 活动标题
     *
     * @author tanglei
     */
    List<ActivityManageVo> selectActivityManageTitle();

    /**
     * 奖品名称
     *
     * @author tanglei
     */
    List<ActivityPrizeVo> selectPrizeName(ActivityPrizeVo prize);


    /**
     * 更新活动
     *
     * @param activityManageVo
     * @return
     */
    int updateActivityManage(ActivityManageVo activityManageVo);

    Pagination<ActivityManageVo> queryActivityManage(Pagination<ActivityManageVo> pagination);

    ActivityManageVo queryActivityInfo(ActivityManageVo activityManageVo);

    Pagination<ActivityPrizeVo> queryActivityPrize(Pagination<ActivityPrizeVo> pagination);

    int addActivityPrize(ActivityPrizeVo activityPrizeVo);

    int updateActivityPrize(ActivityPrizeVo activityPrizeVo);

    ActivityPrizeVo queryActivityPrizeInfo(Integer ap_id);

    int addActivityPrizeImage(ActivityPrizeImageVo activityPrizeImageVo);

    int deleteActiviPrizeImage(ActivityPrizeImageVo activityPrizeImageVo);

    List<ActivityManageVo> queryActivityList(Pagination<ActivityManageVo> pagination);

    int addActivityImage(ActivityImageVo activityImageVo);

    int deleteActivityImage(ActivityImageVo activityImageVo);

    List<ActivityPrizeVo> queryPrizeListByCode(ActivityPrizeVo activityPrizeVo);

    List<ActivityImageVo> queryActivityImageByCode(ActivityImageVo activityImageVo);

    Pagination<UserMemberVo> queryUserMember(Pagination<UserMemberVo> pagination);

    Integer queryUccfgByCode(ActivityPrizeVo activityPrizeVo);

    List<ActivityPrizeImageVo> queryPrizeImage(ActivityPrizeImageVo activityPrizeImageVo);

    List<ActivityPrizeVo> queryActivityPrizeList(ActivityPrizeVo activityPrizeVo);


}
