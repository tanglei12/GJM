package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.ServiceChargeDAO;
import com.gjp.model.ServiceCharge;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author wxr
 * @create 2017-07-30 16:27
 **/

@Repository
public class ServiceChargeDAOImpl extends BaseDAO implements ServiceChargeDAO {

    @Override
    public PageModel<ServiceCharge> queryServiceChargeLists(int pageNo, int pageSize, HouseModel houseModel) {

        PageModel<ServiceCharge> pageModel = new PageModel<>();
        // 分页设置开始点
        pageModel.setPageNo((pageNo - 1) * pageSize);
        // 分页设置查询条数
        pageModel.setPageSize(pageSize);
        // 分页设置查询条件
        pageModel.setHouseModel(houseModel);
        List<ServiceCharge> serviceChargeList = sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceChargeDAO.queryServiceChargeLists", pageModel);
        pageModel.setList(serviceChargeList);
        int serviceChargeTotal = sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceChargeDAO.queryServiceChargeListsRows", pageModel);/**/
        pageModel.setTotalRecords(serviceChargeTotal);
        return pageModel;
    }


    @Override
    public int appAddServiceCharge(ServiceCharge serviceCharge) {
        return super.sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceChargeDAO.appAddServiceCharge",serviceCharge);
    }

    @Override
    public int delServiceCharge(String con_code) {
        return super.sqlSessionTemplateBusiness.delete("com.gjp.dao.ServiceChargeDAO.delServiceCharge", con_code);
    }

    @Override
    public ServiceCharge queryServiceChargeConByTime(ServiceCharge serviceCharge) {
        return super.sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ServiceChargeDAO.queryServiceChargeConByTime", serviceCharge);
    }

    @Override
    public int modifyServiceMoney(ServiceCharge serviceCharge) {
        return super.sqlSessionTemplateBusiness.update("com.gjp.dao.ServiceChargeDAO.modifyServiceMoney", serviceCharge);
    }
}
