package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.ServiceMoneyDAO;
import com.gjp.model.ServiceMoney;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 * @version 创建时间：2015年12月8日 上午10:22:17
 */
@Repository
public class ServiceMoneyDAOImpl extends BaseDAO implements ServiceMoneyDAO {

    @Override
    public Integer addServiceMoney(ServiceMoney serviceMoney) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.ServiceMoneyDAO.addServiceMoney", serviceMoney);
    }

    @Override
    public List<ServiceMoney> selectServiceMoney(ServiceMoney serviceMoney) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ServiceMoneyDAO.selectServiceMoney", serviceMoney);
    }

    @Override
    public int delServiceMoneyByCode(String mdg_moneyCode) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.ServiceMoneyDAO.delServiceMoneyByCode", mdg_moneyCode);
    }

    @Override
    public int deleteServiceMoney(ServiceMoney serviceMoney) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.ServiceMoneyDAO.deleteServiceMoney", serviceMoney);
    }

}
