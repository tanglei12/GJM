package com.gjp.service;

import com.gjp.dao.LSFOrderDAO;
import com.gjp.model.LSFOrder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 乐首付订单
 *
 * @author 陈智颖
 * @version 创建时间：2015年8月12日 下午5:42:04
 */
@Service
public class LSFOrderService {

    @Resource
    private LSFOrderDAO lsfOrderDAO;

    /**
     * 添加乐首付订单
     *
     * @param lsfOrder
     * @return
     */
    public Integer addLSFOrder(LSFOrder lsfOrder) {
        return lsfOrderDAO.addLSFOrder(lsfOrder);
    }

    /**
     * 修改乐首付订单状态
     *
     * @param lsfOrder
     * @return
     */
    public Integer updateSFBillType(LSFOrder lsfOrder) {
        return lsfOrderDAO.updateSFBillType(lsfOrder);
    }

    /**
     * 更新乐首付订单状态
     *
     * @param lsfOrder
     * @return
     */
    public Integer updateOrder(LSFOrder lsfOrder) {
        return lsfOrderDAO.updateOrder(lsfOrder);
    }

    /**
     * 查询最新一条数据的时间
     *
     * @param lsfOrder
     * @return
     */
    public List<LSFOrder> selectLSFOrderNow() {
        return lsfOrderDAO.selectLSFOrderNow();
    }

    /**
     * 查询所有订单数据
     *
     * @param lsfOrder
     * @return
     */
    public List<LSFOrder> selectLSFOrderAll() {
        return lsfOrderDAO.selectLSFOrderAll();
    }

    /**
     * 查询订单数据总条数
     *
     * @return
     */
    public List<LSFOrder> selectLSFOrderSize(LSFOrder lsfOrder) {
        return lsfOrderDAO.selectLSFOrderSize(lsfOrder);
    }

    /**
     * 分页查询订单数据
     *
     * @param lsfOrder
     * @return
     */
    public List<LSFOrder> selectLSFOrder(LSFOrder lsfOrder) {
        return lsfOrderDAO.selectLSFOrder(lsfOrder);
    }

    /**
     * 根据订单编号查询是否存在该订单
     *
     * @param lsfOrder
     * @return
     */
    public List<LSFOrder> selectLSFOrderBool(LSFOrder lsfOrder) {
        return lsfOrderDAO.selectLSFOrderBool(lsfOrder);
    }

}
