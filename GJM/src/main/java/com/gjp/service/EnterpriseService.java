package com.gjp.service;

import com.gjp.dao.EnterpriseDAO;
import com.gjp.model.*;
import com.gjp.util.DataUtil;
import com.gjp.util.Msg;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * 租客多企业管理-企业申请
 *
 * @author 王兴荣
 * @create 2018-03-22 17:46
 **/

@Service
public class EnterpriseService {

    @Resource
    private EnterpriseDAO enterpriseDAO;

    /**
     * 企业列表
     *
     * @param pagination
     * @return
     */
    public Pagination<ZkdEnterprise> queryEnterpriseList(Pagination<ZkdEnterprise> pagination) {
        return enterpriseDAO.queryEnterpriseList(pagination);
    }


    /**
     * 企业注册信息详情
     *
     * @param zkdEnterprise
     * @return
     */
    public ZkdEnterprise queryEnterprise(ZkdEnterprise zkdEnterprise) {
        return enterpriseDAO.queryEnterprise(zkdEnterprise);
    }


    /**
     * 提交企业注册审核
     *
     * @param cg_endDate
     * @param er_state
     * @param er_id
     * @return
     * @throws Exception
     */
    public Msg<Object> submitCompanyExamine(String cg_endDate, Integer er_state, Integer er_id, Integer cg_type, String er_checkFeedback) throws Exception {
        Msg<Object> msg = new Msg<>();
        //修改企业信息
        ZkdEnterprise zkdEnterprise = new ZkdEnterprise();
        zkdEnterprise.setEr_state(er_state);
        zkdEnterprise.setEr_id(er_id);
        zkdEnterprise.setEr_checkFeedback(er_checkFeedback);
        enterpriseDAO.updataEnterprise(zkdEnterprise);
        msg.put("Enterprise", zkdEnterprise);

        if (er_state == 3) {
            //查询最高一级
            ZkdCompany zkdCompany = new ZkdCompany();
            zkdCompany.setEr_id(er_id);
            zkdCompany.setCy_sid(0);
            ZkdCompany zkdCompany1 = enterpriseDAO.queryCompanyInfo(zkdCompany);

            /*修改企业账户状态*/
            ZkdCompanyAccount zkdCompanyAccount = new ZkdCompanyAccount();
            zkdCompanyAccount.setCy_id(zkdCompany1.getCy_id());
            zkdCompanyAccount.setBca_state(1);
            enterpriseDAO.updatazkdCompanyAccount(zkdCompanyAccount);

            //插入企业费用等级
            CompanyGrade companyGrade = new CompanyGrade();
            companyGrade.setEr_id(er_id);
            CompanyGrade companyGrade1 = enterpriseDAO.querycompanyGrade(companyGrade);

            //试用,开始时间为当前,结束时间为选择的时间
            if (companyGrade1 == null) {
                Date currentTime = new Date();
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                String dateString = formatter.format(currentTime);
                companyGrade.setCg_startDate(DataUtil.StrToDates(dateString));
                companyGrade.setCg_endDate(DataUtil.StrToDates(cg_endDate));

                companyGrade.setCg_type(cg_type);//费用等级类型（1:试用、2:免费、3:收费）
                companyGrade.setCg_state(1);//1:月卡 2:季度卡 3:年卡
                enterpriseDAO.insertCompanyGrade(companyGrade);
                msg.put("CompanyGrade", companyGrade);
            }
        }
        return msg;
    }

    /**********************************************房管员审核************************************************/

    /**
     * 房管员列表
     *
     * @param pagination
     * @return
     */
    public Pagination<ZkdCompanyAgent> queryAgentExamineList(Pagination<ZkdCompanyAgent> pagination) {
        return enterpriseDAO.queryAgentExamineList(pagination);
    }

    /**
     * 房管员注册信息详情
     *
     * @param zkdCompanyAgent
     * @return
     */
    public ZkdCompanyAgent queryAgentInfo(ZkdCompanyAgent zkdCompanyAgent) {
        return enterpriseDAO.queryAgentInfo(zkdCompanyAgent);
    }


    /**
     * 房管员审核
     *
     * @param ca_id
     * @param ca_state
     * @return
     * @throws Exception
     */
    public Msg<Object> submitAgentExamine(Integer ca_id, Integer ca_state) throws Exception {
        Msg<Object> msg = new Msg<>();
        //修改企业信息
        ZkdCompanyAgent zkdCompanyAgent = new ZkdCompanyAgent();
        zkdCompanyAgent.setCa_id(ca_id);
        zkdCompanyAgent.setCa_state(ca_state);
        enterpriseDAO.updataZkdCompanyAgent(zkdCompanyAgent);
        msg.put("zkdCompanyAgent", zkdCompanyAgent);
        return msg;
    }

    /**
     * 添加圈子
     * @param topicVo
     * @return
     */
    public Integer insertCreateTopic(TopicVo topicVo){
        return enterpriseDAO.insertCreateTopic(topicVo);
    }

    /**
     * 发布圈子
     * @param topicReleaseVo
     * @return
     */
    public Integer releaseTopic(TopicReleaseVo topicReleaseVo){
        return enterpriseDAO.releaseTopic(topicReleaseVo);
    }
   /**
     * 修改圈子
     * @param topicVo
     * @return
     */
    public Integer updateTopic(TopicVo topicVo){
        return enterpriseDAO.updateTopic(topicVo);
    }

    /**
     *查询圈子列表
     *
     * @param pagination
     * @return
     */
    public Pagination<TopicVo> queryTopicList(Pagination<TopicVo> pagination) {
        return enterpriseDAO.queryTopicList(pagination);
    }

    public List<TopicVo> queryTopicVoList(Pagination<TopicVo> pagination) {
        return enterpriseDAO.queryTopicVoList(pagination);
    }

    public int queryTopicVoListCount(Pagination<TopicVo> pagination) {
        return enterpriseDAO.queryTopicVoListCount(pagination);
    }

    public TopicVo queryTopicdetail(TopicVo topicVo) {
        return enterpriseDAO.queryTopicdetail(topicVo);
    }
}
