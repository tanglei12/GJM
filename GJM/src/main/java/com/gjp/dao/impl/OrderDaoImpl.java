package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.OrderDao;
import com.gjp.model.FinanceDownPaymentVo;
import com.gjp.model.OrderBillVo;
import com.gjp.model.OrderDetailVo;
import com.gjp.model.OrderVo;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderDaoImpl extends BaseDAO implements OrderDao {

    @Override
    public int addOrder(OrderVo orderVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.OrderDao.addOrder", orderVo);
    }

    @Override
    public int addOrderBill(OrderBillVo orderBillVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.OrderDao.addOrderBill", orderBillVo);
    }

    @Override
    public int addOrderDetail(OrderDetailVo orderDetailVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.OrderDao.addOrderDetail", orderDetailVo);
    }

    @Override
    public OrderBillVo queryOrderBill(OrderBillVo orderBillVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.OrderDao.queryOrderBill", orderBillVo);
    }

    @Override
    public int updateOrderBill(OrderBillVo orderBillVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.OrderDao.updateOrderBill", orderBillVo);
    }

    @Override
    public int updateOrder(OrderVo orderVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.OrderDao.updateOrder", orderVo);
    }

    @Override
    public List<OrderVo> queryOrderList(OrderVo orderVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.OrderDao.queryOrderList", orderVo);
    }

    @Override
    public OrderVo queryOrder(OrderVo orderVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.OrderDao.queryOrder", orderVo);
    }

    @Override
    public List<OrderDetailVo> queryOrderDetailList(OrderDetailVo orderDetailVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.OrderDao.queryOrderDetailList", orderDetailVo);
    }

    @Override
    public int updateOrderForAmount(OrderVo orderVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.OrderDao.updateOrderForAmount", orderVo);
    }

    @Override
    public OrderDetailVo queryOrderDetail(OrderDetailVo orderDetailVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.OrderDao.queryOrderDetail", orderDetailVo);
    }

    @Override
    public int updateOrderDetail(OrderDetailVo orderDetailVo) {
        return sqlSessionTemplateBusiness.update("com.gjp.dao.OrderDao.updateOrderDetail", orderDetailVo);
    }

    @Override
    public List<FinanceDownPaymentVo> queryFinanceDownPaymentList(FinanceDownPaymentVo financeDownPaymentVo) {
        return sqlSessionTemplateBusiness.selectList("com.gjp.dao.OrderDao.queryFinanceDownPaymentList", financeDownPaymentVo);
    }

    @Override
    public int addFinanceDownPayment(FinanceDownPaymentVo financeDownPaymentVo) {
        return sqlSessionTemplateBusiness.insert("com.gjp.dao.OrderDao.addFinanceDownPayment", financeDownPaymentVo);
    }

    @Override
    public FinanceDownPaymentVo queryFinanceDownPayment(FinanceDownPaymentVo financeDownPaymentVo) {
        return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.OrderDao.queryFinanceDownPayment", financeDownPaymentVo);
    }

    @Override
    public int deleteOrderDetail(OrderDetailVo orderDetailVo) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.OrderDao.deleteOrderDetail", orderDetailVo);
    }

    @Override
    public int deleteOrder(Integer order_id) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.OrderDao.deleteOrder", order_id);
    }

    @Override
    public int deleteOrderBill(Integer bill_id) {
        return sqlSessionTemplateBusiness.delete("com.gjp.dao.OrderDao.deleteOrderBill", bill_id);
    }
}
