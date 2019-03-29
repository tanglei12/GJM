package com.gjp.dao;

import com.gjp.model.ServiceChargeRecord;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;

public interface ServiceChargeRecordDAO {

    /**
     *
     * @param pageNo
     * @param pageSize
     * @param houseModel
     * @return
     */

    PageModel<ServiceChargeRecord> queryServiceChargeRecordList(int pageNo, int pageSize, HouseModel houseModel);


    int appAddServiceChargeRecord(ServiceChargeRecord serviceChargeRecord);
}
