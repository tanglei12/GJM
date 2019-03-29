package com.gjp.dao;

import com.gjp.model.ServiceMoney;

import java.util.List;

/**
 * @author 陈智颖
 * @version 创建时间：2015年12月8日 上午10:20:50
 */
public interface ServiceMoneyDAO {

    /**
     * 添加服务清单
     *
     * @param serviceMoney
     * @return
     * @author 陈智颖
     */
    Integer addServiceMoney(ServiceMoney serviceMoney);


    /**
     * 根据费用清单查询服务清单
     *
     * @param serviceMoney
     * @return
     * @author 陈智颖
     */
    List<ServiceMoney> selectServiceMoney(ServiceMoney serviceMoney);

    /**
     * 根据code删除
     *
     * @param mdg_moneyCode
     * @return
     */
    int delServiceMoneyByCode(String mdg_moneyCode);

    int deleteServiceMoney(ServiceMoney serviceMoney);
}
