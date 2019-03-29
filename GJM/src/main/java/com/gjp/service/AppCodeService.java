package com.gjp.service;

import com.gjp.dao.AppCodeDAO;
import com.gjp.model.AppCode;
import com.gjp.model.AppVersionVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author 陈智颖
 * @create 2017-07-28 7:59 PM
 **/
@Service
public class AppCodeService {

    @Autowired
    private AppCodeDAO appCodeDAO;

    /**
     * 版本控制
     *
     * @param
     * @return
     * @author 陈智颖
     * @create 7/28/17 8:03 PM
     **/
    public List<AppCode> appcode(AppCode appCode) {
        return appCodeDAO.appcode(appCode);
    }

    /**
     * 查询版本控制记录
     *
     * @param appVersionVo
     * @return
     */
    public List<AppVersionVo> queryAppVersionList(AppVersionVo appVersionVo) {
        return appCodeDAO.queryAppVersionList(appVersionVo);
    }

    /**
     * 查询最新版本
     *
     * @param appVersionVo
     * @return
     */
    public AppVersionVo queryAppVersionLast(AppVersionVo appVersionVo) {
        return appCodeDAO.queryAppVersionLast(appVersionVo);
    }
}
