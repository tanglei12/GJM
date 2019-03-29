package com.gjp.service;

import com.gjp.dao.CustomerAppealDAO;
import com.gjp.model.ZkdCustomerAppeal;
import com.gjp.util.Msg;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 *
 * 租客多企业管理-经纪人申诉
 * @author 王兴荣
 * @create 2018-03-22 17:46
 **/

@Service
public class CustomerAppealService {

    @Resource
    private CustomerAppealDAO customerAppealDAO;

    /**
     * 经纪人申诉列表
     * @param pagination
     * @return
     */
    public Pagination<ZkdCustomerAppeal> queryAppealExamineList(Pagination<ZkdCustomerAppeal> pagination){
        return customerAppealDAO.queryAppealExamineList(pagination);
    }

    /**
     * 经纪人申诉详情
     * @param zkdCustomerAppeal
     * @return
     */
    public ZkdCustomerAppeal queryAppealExamineDetail(ZkdCustomerAppeal zkdCustomerAppeal){
        return customerAppealDAO.queryAppealExamineDetail(zkdCustomerAppeal);

    }

    /**
     * 举报人(经纪人)
     * @param zkdCustomerAppeal
     * @return
     */
    public ZkdCustomerAppeal queryAppealExamineDetailUser(ZkdCustomerAppeal zkdCustomerAppeal){
        return customerAppealDAO.queryAppealExamineDetailUser(zkdCustomerAppeal);
    }

    /**
     * 举报人(公司)
     * @param zkdCustomerAppeal
     * @return
     */
    public ZkdCustomerAppeal queryAppealExamineDetailCompany(ZkdCustomerAppeal zkdCustomerAppeal){
        return customerAppealDAO.queryAppealExamineDetailCompany(zkdCustomerAppeal);
    }


    /**
     *处理经纪人申诉
     * @param ap_id
     * @param ap_state
     */
    public Msg<Object>  submitAppealExamin(Integer ap_id,Integer ap_state)throws Exception{
        Msg<Object> msg = new Msg<>();
        ZkdCustomerAppeal zkdCustomerAppeal = new ZkdCustomerAppeal();
        zkdCustomerAppeal.setAp_id(ap_id);
        zkdCustomerAppeal.setAp_state(ap_state);
        customerAppealDAO.submitAppealExamin(zkdCustomerAppeal);
        return msg;
    }

}
