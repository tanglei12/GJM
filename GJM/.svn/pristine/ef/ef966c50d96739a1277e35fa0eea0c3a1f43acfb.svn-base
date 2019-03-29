package com.gjp.dao.impl;

import com.gjp.dao.AppCodeDAO;
import com.gjp.dao.BaseDAO;
import com.gjp.model.AppCode;
import com.gjp.model.AppVersionVo;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 * @create 2017-07-28 8:04 PM
 **/
@Repository
public class AppCodeDAOImpl extends BaseDAO implements AppCodeDAO {

    @Override
    public List<AppCode> appcode(AppCode appCode) {
        return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.AppCodeDAO.appcode", appCode);
    }

    @Override
    public List<AppVersionVo> queryAppVersionList(AppVersionVo appVersionVo) {
        return sqlSessionTemplateProduct.selectList("com.gjp.dao.AppCodeDAO.queryAppVersionList", appVersionVo);
    }

    @Override
    public AppVersionVo queryAppVersionLast(AppVersionVo appVersionVo) {
        return sqlSessionTemplateProduct.selectOne("com.gjp.dao.AppCodeDAO.queryAppVersionLast", appVersionVo);
    }

}
