package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.ServiceChargeRecordDAO;
import com.gjp.model.ServiceChargeRecord;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author wxr
 * @create 2017-07-30 16:58
 **/

@Repository
public class ServiceChargeRecordDAOImpl extends BaseDAO implements ServiceChargeRecordDAO {
    @Override
    public PageModel<ServiceChargeRecord> queryServiceChargeRecordList(int pageNo, int pageSize, HouseModel houseModel) {
        PageModel<ServiceChargeRecord> pageModel = new PageModel<>();
        // 分页设置开始点
        pageModel.setPageNo((pageNo - 1) * pageSize);
        // 分页设置查询条数
        pageModel.setPageSize(pageSize);
        // 分页设置查询条件
        pageModel.setHouseModel(houseModel);
        List<ServiceChargeRecord> serviceChargeList = sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceChargeRecordDAO.queryServiceChargeRecordList", pageModel);
        pageModel.setList(serviceChargeList);
        int serviceChargeTotal = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceChargeRecordDAO.queryServiceChargeRecordListRows", pageModel);
        pageModel.setTotalRecords(serviceChargeTotal);

        return pageModel;
    }

    @Override
    public int appAddServiceChargeRecord(ServiceChargeRecord serviceChargeRecord) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceChargeRecordDAO.appAddServiceChargeRecord", serviceChargeRecord);
    }


}
