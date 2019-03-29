package com.gjp.service;

import com.gjp.dao.ServiceMoneyDAO;
import com.gjp.model.ServiceMoney;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 陈智颖
 * @version 创建时间：2015年12月8日 上午10:24:30
 */
@Service
public class ServiceMoneyService {

    @Resource
    private ServiceMoneyDAO serviceMoneyDAO;

    /**
     * 添加服务清单
     *
     * @param serviceMoney
     * @return
     * @author 陈智颖
     */
    public Integer addServiceMoney(ServiceMoney serviceMoney) {
        return serviceMoneyDAO.addServiceMoney(serviceMoney);
    }

    /**
     * 根据费用清单查询服务清单
     *
     * @param serviceMoney
     * @return
     * @author 陈智颖
     */
    public List<ServiceMoney> selectServiceMoney(ServiceMoney serviceMoney) {
        return serviceMoneyDAO.selectServiceMoney(serviceMoney);
    }

    /**
     * 根据code删除
     *
     * @param mdg_moneyCode
     * @return
     */
    public int delServiceMoneyByCode(String mdg_moneyCode) {
        return serviceMoneyDAO.delServiceMoneyByCode(mdg_moneyCode);
    }

    /**
     * 删除服务费用
     *
     * @param so_id
     * @return
     */
    public boolean deleteServiceMoney(Integer so_id) {
        ServiceMoney serviceMoney = new ServiceMoney();
        serviceMoney.setSo_id(so_id);
        return serviceMoneyDAO.deleteServiceMoney(serviceMoney) > 0;
    }
}
