package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.CustomerAppealDAO;
import com.gjp.model.ZkdCustomerAppeal;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 王兴荣
 * @create 2018-03-22 17:56
 **/
@Repository
public class CustomerAppealDAOImpl extends BaseDAO implements CustomerAppealDAO {
    /**
     * 经纪人申诉列表
     * @param pagination
     * @return
     */
    @Override
    public Pagination<ZkdCustomerAppeal> queryAppealExamineList(Pagination<ZkdCustomerAppeal> pagination) {
        List<ZkdCustomerAppeal> list = sqlSessionTemplateZkd.selectList("com.gjp.dao.CustomerAppealDAO.queryAppealExamineList", pagination);
        int totalRecords = sqlSessionTemplateZkd.selectOne("com.gjp.dao.CustomerAppealDAO.queryAppealExamineListCount", pagination);
        pagination.setList(list, totalRecords);
        return pagination;
    }

    /**
     * 经纪人申诉详情
     * @param zkdCustomerAppeal
     * @return
     */
    @Override
    public ZkdCustomerAppeal queryAppealExamineDetail(ZkdCustomerAppeal zkdCustomerAppeal) {
        return sqlSessionTemplateZkd.selectOne("com.gjp.dao.CustomerAppealDAO.queryAppealExamineDetail",zkdCustomerAppeal);
    }

    /**
     * 举报人(经纪人)
     * @param zkdCustomerAppeal
     * @return
     */
    @Override
    public ZkdCustomerAppeal queryAppealExamineDetailUser(ZkdCustomerAppeal zkdCustomerAppeal) {
        return sqlSessionTemplateZkd.selectOne("com.gjp.dao.CustomerAppealDAO.queryAppealExamineDetailUser",zkdCustomerAppeal);
    }

    /**
     * 举报人(公司)
     * @param zkdCustomerAppeal
     * @return
     */
    @Override
    public ZkdCustomerAppeal queryAppealExamineDetailCompany(ZkdCustomerAppeal zkdCustomerAppeal) {
        return sqlSessionTemplateZkd.selectOne("com.gjp.dao.CustomerAppealDAO.queryAppealExamineDetailCompany",zkdCustomerAppeal);
    }

    /**
     * 处理经纪人申诉
     * @param zkdCustomerAppeal
     * @return
     */
    @Override
    public Integer submitAppealExamin(ZkdCustomerAppeal zkdCustomerAppeal) {
        return sqlSessionTemplateZkd.update("com.gjp.dao.CustomerAppealDAO.submitAppealExamin",zkdCustomerAppeal);
    }

}
