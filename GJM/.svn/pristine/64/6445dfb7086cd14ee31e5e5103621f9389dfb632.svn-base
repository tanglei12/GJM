package com.gjp.service;

import com.gjp.dao.ServiceChargeDAO;
import com.gjp.model.ServiceCharge;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author wxr
 * @create 2017-07-30 16:41
 **/

@Service
public class ServiceChargeService {

    @Resource
   private ServiceChargeDAO serviceChargeDAO;

    /**
     * 查询服务费用
     * @param pageNo
     * @param pageSize
     * @param houseModel
     * @return
     */
    public PageModel<ServiceCharge> queryServiceChargeLists(int pageNo, int pageSize, HouseModel houseModel ){

        return serviceChargeDAO.queryServiceChargeLists(pageNo, pageSize, houseModel);
    }


    /**
     * app在签合同时插入服务费用初始值
     * @param serviceCharge
     * @return
     */
    public int appAddServiceCharge(ServiceCharge serviceCharge) {
        return serviceChargeDAO.appAddServiceCharge(serviceCharge);
    }

    /**
     * 根据合同编码删除
     * @param con_code
     * @return
     */
    public int delServiceCharge(String con_code){
        return serviceChargeDAO.delServiceCharge(con_code);
    }

    /**
     * 查询合同对应有效期内的服务费
     * @param serviceCharge
     * @return
     */
    public ServiceCharge queryServiceChargeConByTime(ServiceCharge serviceCharge){
        return serviceChargeDAO.queryServiceChargeConByTime(serviceCharge);
    }

    /**
     * 更新服务费已使用金额、余额
     * @param serviceCharge
     * @return
     */
    public int modifyServiceMoney(ServiceCharge serviceCharge) {
        return serviceChargeDAO.modifyServiceMoney(serviceCharge);
    }
}
