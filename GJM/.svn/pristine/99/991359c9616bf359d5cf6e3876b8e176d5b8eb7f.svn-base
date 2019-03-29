package com.gjp.service;

import com.gjp.dao.PentReminderDao;
import com.gjp.model.UserCenterPentReminder;
import com.gjp.model.ViewBusinessContractVo;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 催收记录表
 * @author tanglei
 * @description
 * @date Created in 2017/11/22
 */
@Service
public class PentReminderService {
    @Resource
    private PentReminderDao pentReminderDao;

    /**
     * 添加催租记录
     * @author tanglei
     */
    public int insertPentReminder (UserCenterPentReminder userCenterRentReminder) {
        return  pentReminderDao.insertPentReminder(userCenterRentReminder);
    }

    /**
     * 查询催租记录
     * @author tanglei
     */
    public List<UserCenterPentReminder> queryPentReminder (UserCenterPentReminder userCenterRentReminder) {
        return pentReminderDao.queryPentReminder(userCenterRentReminder);
    }

    /**
     *催租天数
     * @Author tanglei
     */
    public Pagination<ViewBusinessContractVo> collectionDayList(Pagination<?> pagination) {
        return pentReminderDao.collectionDayList(pagination);
    }
}
