package com.gjp.dao;

import com.gjp.model.AppCode;
import com.gjp.model.AppVersionVo;

import java.util.List;

/**
 * @author 陈智颖
 * @create 2017-07-28 8:02 PM
 **/
public interface AppCodeDAO {

    /**
     * 版本控制
     *
     * @param
     * @return
     * @author 陈智颖
     * @create 7/28/17 8:03 PM
     **/
    List<AppCode> appcode(AppCode appCode);

    /**
     * 查询版本控制记录
     *
     * @param appVersionVo
     * @return
     */
    List<AppVersionVo> queryAppVersionList(AppVersionVo appVersionVo);

    /**
     * 查询最新版本
     *
     * @param appVersionVo
     * @return
     */
    AppVersionVo queryAppVersionLast(AppVersionVo appVersionVo);
}
