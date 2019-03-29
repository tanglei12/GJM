package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.EnterpriseDAO;
import com.gjp.model.*;
import com.gjp.service.ZkdCompanyAccount;
import com.gjp.util.OSSparameter;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 王兴荣
 * @create 2018-03-22 17:56
 **/
@Repository
public class EnterpriseDAOImpl extends BaseDAO implements EnterpriseDAO {
    /**
     * 企业列表
     *
     * @param pagination
     * @return
     */
    @Override
    public Pagination<ZkdEnterprise> queryEnterpriseList(Pagination<ZkdEnterprise> pagination) {
        List<ZkdEnterprise> list = sqlSessionTemplateZkd.selectList("com.gjp.dao.EnterpriseDAO.queryEnterpriseList", pagination);
        int totalRecords = sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseDAO.queryEnterpriseListCount", pagination);
        pagination.setList(list, totalRecords);
        return pagination;
    }

    /**
     * 企业注册信息详情
     *
     * @param zkdEnterprise
     * @return
     */
    @Override
    public ZkdEnterprise queryEnterprise(ZkdEnterprise zkdEnterprise) {
        return sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseDAO.queryEnterprise", zkdEnterprise);
    }


    /**
     * 修改企业信息
     *
     * @param zkdEnterprise
     * @return
     */
    @Override
    public Integer updataEnterprise(ZkdEnterprise zkdEnterprise) {
        return sqlSessionTemplateZkd.update("com.gjp.dao.EnterpriseDAO.updataEnterprise", zkdEnterprise);
    }


    /**
     * 修改企业账户状态
     *
     * @param zkdCompanyAccount
     * @return
     */
    @Override
    public Integer updatazkdCompanyAccount(ZkdCompanyAccount zkdCompanyAccount) {
        return sqlSessionTemplateZkd.update("com.gjp.dao.EnterpriseDAO.updatazkdCompanyAccount", zkdCompanyAccount);
    }

    /**
     * 插入企业费用等级
     *
     * @param companyGrade
     * @return
     */
    @Override
    public Integer insertCompanyGrade(CompanyGrade companyGrade) {
        return sqlSessionTemplateZkd.insert("com.gjp.dao.EnterpriseDAO.insertCompanyGrade", companyGrade);
    }


    /**
     * 查询关联的公司信息
     *
     * @param zkdCompany
     * @return
     */
    @Override
    public ZkdCompany queryCompanyInfo(ZkdCompany zkdCompany) {
        return sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseDAO.queryCompanyInfo", zkdCompany);
    }


    /**
     * 查询企业费用等级
     *
     * @param companyGrade
     * @return
     */
    @Override
    public CompanyGrade querycompanyGrade(CompanyGrade companyGrade) {
        return sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseDAO.querycompanyGrade", companyGrade);
    }


    /**********************************************房管员审核************************************************/
    /**
     * 房管员列表
     *
     * @param pagination
     * @return
     */
    @Override
    public Pagination<ZkdCompanyAgent> queryAgentExamineList(Pagination<ZkdCompanyAgent> pagination) {
        List<ZkdCompanyAgent> list = sqlSessionTemplateZkd.selectList("com.gjp.dao.EnterpriseDAO.queryAgentExamineList", pagination);
        int totalRecords = sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseDAO.queryAgentExamineListCount", pagination);
        pagination.setList(list, totalRecords);
        return pagination;
    }


    /**
     * 房管员注册信息详情
     *
     * @param zkdCompanyAgent
     * @return
     */
    @Override
    public ZkdCompanyAgent queryAgentInfo(ZkdCompanyAgent zkdCompanyAgent) {
        return sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseDAO.queryAgentInfo", zkdCompanyAgent);
    }


    /**
     * 修改房管员信息
     *
     * @param zkdCompanyAgent
     * @return
     */
    @Override
    public Integer updataZkdCompanyAgent(ZkdCompanyAgent zkdCompanyAgent) {
        return sqlSessionTemplateZkd.update("com.gjp.dao.EnterpriseDAO.updataZkdCompanyAgent", zkdCompanyAgent);
    }

    /**
     * 添加圈子
     *
     * @param topicVo
     * @return
     */
    @Override
    public Integer insertCreateTopic(TopicVo topicVo) {
        return sqlSessionTemplateZkd.insert("com.gjp.dao.EnterpriseDAO.insertCreateTopic", topicVo);
    }

    /**
     * 发布圈子
     * @param topicReleaseVo
     * @return
     */
    @Override
    public Integer releaseTopic(TopicReleaseVo topicReleaseVo) {
        return sqlSessionTemplateZkd.insert("com.gjp.dao.EnterpriseDAO.releaseTopic", topicReleaseVo);
    }

    /**
     * 修改圈子
     *
     * @param topicVo
     * @return
     */
    @Override
    public Integer updateTopic(TopicVo topicVo) {
        return sqlSessionTemplateZkd.update("com.gjp.dao.EnterpriseDAO.updateTopic", topicVo);
    }


    /**
     * 查询圈子列表
     *
     * @param pagination
     * @return
     */
    @Override
    public Pagination<TopicVo> queryTopicList(Pagination<TopicVo> pagination) {
        List<TopicVo> list = sqlSessionTemplateZkd.selectList("com.gjp.dao.EnterpriseDAO.queryTopicList", pagination);
        for (TopicVo topicVo : list) {
            if (topicVo.getT_cover() != null) {
                topicVo.setT_cover(OSSparameter.imagePath(topicVo.getT_cover(), null, null));
            }
            if (topicVo.getT_coverSmall() != null) {
                topicVo.setT_coverSmall(OSSparameter.imagePath(topicVo.getT_coverSmall(), null, null));
            }
        }
        int totalRecords = sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseDAO.queryTopicListCount", pagination);
        pagination.setList(list, totalRecords);
        return pagination;
    }

    @Override
    public List<TopicVo> queryTopicVoList(Pagination<TopicVo> pagination) {
        return sqlSessionTemplateZkd.selectList("com.gjp.dao.EnterpriseDAO.queryTopicVoList", pagination);
    }

    @Override
    public int queryTopicVoListCount(Pagination<TopicVo> pagination) {
        return sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseDAO.queryTopicVoListCount", pagination);
    }

    @Override
    public TopicVo queryTopicdetail(TopicVo topicVo) {
        return sqlSessionTemplateZkd.selectOne("com.gjp.dao.EnterpriseDAO.queryTopicdetail", topicVo);
    }
}
