package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.PentReminderDao;
import com.gjp.model.UserCenterPentReminder;
import com.gjp.model.ViewBusinessContractVo;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author tanglei
 * @description
 * @date Created in 2017/11/22
 */
@Repository
public class PentReminderDaoImpl extends BaseDAO implements PentReminderDao {

    @Override
    public int insertPentReminder (UserCenterPentReminder userCenterRentReminder){
        return sqlSessionTemplateUser.insert("com.gjp.dao.PentReminderDao.insertPentReminder", userCenterRentReminder);
    }

    @Override
    public List<UserCenterPentReminder> queryPentReminder (UserCenterPentReminder userCenterRentReminder) {
        return sqlSessionTemplateUser.selectList("com.gjp.dao.PentReminderDao.queryPentReminder",userCenterRentReminder);
    }

    @Override
    public Pagination<ViewBusinessContractVo> collectionDayList(Pagination<?> pagination) {
        List<ViewBusinessContractVo> list = sqlSessionTemplateUser.selectList("com.gjp.dao.PentReminderDao.collectionDayList", pagination);
        Pagination<ViewBusinessContractVo> paginationTo = new Pagination<>(pagination.getPageNo(), pagination.getPageSize());
        paginationTo.setList(list);
        if (pagination.isPage()) {
            int totalRecords = sqlSessionTemplateUser.selectOne("com.gjp.dao.PentReminderDao.collectionDayListRows", pagination);
            paginationTo.setTotalRecords(totalRecords);
        }
        return paginationTo;
    }
}
