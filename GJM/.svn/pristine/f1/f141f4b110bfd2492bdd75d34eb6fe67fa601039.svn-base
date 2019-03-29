package com.gjp.dao;

import com.gjp.model.ZkdCustomerAppeal;
import com.gjp.util.Pagination;

/**
 * @author 王兴荣
 * @create 2018-03-22 17:52
 **/
public interface CustomerAppealDAO {

    /**
     * 经纪人申诉列表
     * @param pagination
     * @return
     */
    Pagination<ZkdCustomerAppeal> queryAppealExamineList(Pagination<ZkdCustomerAppeal> pagination);

    /**
     * 经纪人申诉详情
     */
    ZkdCustomerAppeal queryAppealExamineDetail(ZkdCustomerAppeal zkdCustomerAppeal);

    /**
     * 举报人(经纪人)
     * @param zkdCustomerAppeal
     * @return
     */
    ZkdCustomerAppeal queryAppealExamineDetailUser(ZkdCustomerAppeal zkdCustomerAppeal);

    /**
     * 举报人(公司)
     * @param zkdCustomerAppeal
     * @return
     */
    ZkdCustomerAppeal queryAppealExamineDetailCompany(ZkdCustomerAppeal zkdCustomerAppeal);

    /**
     * 处理经纪人申诉
     * @param zkdCustomerAppeal
     * @return
     */
    Integer submitAppealExamin(ZkdCustomerAppeal zkdCustomerAppeal);
}
