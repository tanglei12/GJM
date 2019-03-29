package com.gjp.dao;

import com.gjp.model.ServiceCharge;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;

public interface ServiceChargeDAO {

    /**
     *
     * @param pageNo
     * @param pageSize
     * @param houseModel
     * @return
     */
    PageModel<ServiceCharge> queryServiceChargeLists(int pageNo, int pageSize, HouseModel houseModel);


    /**
     *
     * @param serviceCharge
     * @return
     */
    int appAddServiceCharge(ServiceCharge serviceCharge);

    /**
     * 根据合同编码删除
     * @param con_code
     * @return
     */
    int delServiceCharge(String con_code);

    /**
     * 查询合同生效期内的服务费
     * @param serviceCharge
     * @return
     */
    ServiceCharge queryServiceChargeConByTime(ServiceCharge serviceCharge);

    /**
     * 更新服务费已使用金额、余额
     * @param serviceCharge
     * @return
     */
    int modifyServiceMoney(ServiceCharge serviceCharge);
}
