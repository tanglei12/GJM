package com.gjp.dao;

import com.gjp.model.*;
import com.gjp.service.ZkdCompanyAccount;
import com.gjp.util.Pagination;

import java.util.List;

/**
 * @author 王兴荣
 * @create 2018-03-22 17:52
 **/
public interface EnterpriseDAO {

    /**
     * 企业列表
     *
     * @param pagination
     * @return
     */
    Pagination<ZkdEnterprise> queryEnterpriseList(Pagination<ZkdEnterprise> pagination);


    /**
     * 企业注册信息详情
     *
     * @param zkdEnterprise
     * @return
     */
    ZkdEnterprise queryEnterprise(ZkdEnterprise zkdEnterprise);



    /**
     * 修改企业信息
     *
     * @param zkdEnterprise
     * @return
     */
    Integer updataEnterprise(ZkdEnterprise zkdEnterprise);
    /**
     * 修改企业账户状态
     *
     * @param zkdCompanyAccount
     * @return
     */
    Integer updatazkdCompanyAccount(ZkdCompanyAccount zkdCompanyAccount);

    /**
     * 插入企业费用等级
     *
     * @param companyGrade
     * @return
     */
    Integer insertCompanyGrade(CompanyGrade companyGrade);

    /**
     * 查询关联的公司信息
     *
     * @param zkdCompany
     * @return
     */
    ZkdCompany queryCompanyInfo(ZkdCompany zkdCompany);

    /**
     * 查询企业费用等级
     *
     * @param companyGrade
     * @return
     */
    CompanyGrade querycompanyGrade(CompanyGrade companyGrade);



    /**********************************************房管员审核************************************************/
    /**
     * 房管员列表
     *
     * @param pagination
     * @return
     */
    Pagination<ZkdCompanyAgent> queryAgentExamineList(Pagination<ZkdCompanyAgent> pagination);


    /**
     * 房管员注册信息详情
     *
     * @param zkdCompanyAgent
     * @return
     */
    ZkdCompanyAgent queryAgentInfo(ZkdCompanyAgent zkdCompanyAgent);

    /**
     * 修改房管员信息
     *
     * @param zkdCompanyAgent
     * @return
     */
    Integer updataZkdCompanyAgent(ZkdCompanyAgent zkdCompanyAgent);


    /**
     * 添加圈子
     * @param topicVo
     * @return
     */
    Integer insertCreateTopic(TopicVo topicVo);

    /**
     * 发布圈子
     * @param topicReleaseVo
     * @return
     */
    Integer releaseTopic(TopicReleaseVo topicReleaseVo);

    /**
     * 修改圈子
     * @param topicVo
     * @return
     */
    Integer updateTopic(TopicVo topicVo);

    /**
     * 圈子列表
     *
     * @param pagination
     * @return
     */
    Pagination<TopicVo> queryTopicList(Pagination<TopicVo> pagination);

    List<TopicVo> queryTopicVoList(Pagination<TopicVo> pagination);

    int queryTopicVoListCount(Pagination<TopicVo> pagination);

    TopicVo queryTopicdetail(TopicVo topicVo);
}
