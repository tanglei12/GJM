package com.gjp.dao;

import com.gjp.model.UserCenterPentReminder;
import com.gjp.model.ViewBusinessContractVo;
import com.gjp.util.Pagination;

import java.util.List;

/**
 * 催租记录
 * @author tanglei
 * @description
 * @date Created in 2017/11/22
 */
public interface PentReminderDao {

    /**
     * 添加催租记录
     * @author tanglei
     */
    int insertPentReminder (UserCenterPentReminder userCenterRentReminder);

    /**
     * 查询催租记录
     * @author tanglei
     */
    List<UserCenterPentReminder> queryPentReminder (UserCenterPentReminder userCenterRentReminder);

    /**
     *催租天数
     * @author tanglei
     */
    Pagination<ViewBusinessContractVo> collectionDayList(Pagination<?> pagination);
}
