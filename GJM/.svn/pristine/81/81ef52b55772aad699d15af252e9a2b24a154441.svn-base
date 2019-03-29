package com.gjp.service;

import com.gjp.dao.ServiceChargeRecordDAO;
import com.gjp.model.ServiceChargeRecord;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 服务费记录
 *
 * @author wxr
 * @create 2017-07-31 15:28
 **/
@Service
public class ServiceChargeRecordService {
    @Resource
    private ServiceChargeRecordDAO serviceChargeRecordDAO;

    /**
     * 服务费记录列表
     * @param pageNo
     * @param pageSize
     * @param houseModel
     * @return
     */
    public PageModel<ServiceChargeRecord> queryServiceChargeRecordList(int pageNo, int pageSize, HouseModel houseModel){
        return serviceChargeRecordDAO.queryServiceChargeRecordList(pageNo,pageSize,houseModel);
    }


    /**
     * app接口增加服务费记录
     * @param serviceChargeRecord
     * @return
     */
    public int appAddServiceChargeRecord(ServiceChargeRecord serviceChargeRecord){
        return serviceChargeRecordDAO.appAddServiceChargeRecord(serviceChargeRecord);
    }
}
