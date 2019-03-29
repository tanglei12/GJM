package com.gjp.dao;

import com.gjp.model.FinanceDownPaymentVo;
import com.gjp.model.OrderBillVo;
import com.gjp.model.OrderDetailVo;
import com.gjp.model.OrderVo;

import java.util.List;

public interface OrderDao {

    int addOrder(OrderVo orderVo);

    int addOrderBill(OrderBillVo orderBillVo);

    int addOrderDetail(OrderDetailVo orderDetailVo);

    int updateOrderBill(OrderBillVo orderBillVo);

    int updateOrder(OrderVo orderVo);

    OrderVo queryOrder(OrderVo orderVo);

    List<OrderVo> queryOrderList(OrderVo orderVo);

    OrderBillVo queryOrderBill(OrderBillVo orderBillVo);

    List<OrderDetailVo> queryOrderDetailList(OrderDetailVo orderDetailVo);

    int updateOrderForAmount(OrderVo orderVo);

    OrderDetailVo queryOrderDetail(OrderDetailVo orderDetailVo);

    int updateOrderDetail(OrderDetailVo orderDetailVo);

    List<FinanceDownPaymentVo> queryFinanceDownPaymentList(FinanceDownPaymentVo financeDownPaymentVo);

    int addFinanceDownPayment(FinanceDownPaymentVo financeDownPaymentVo);

    FinanceDownPaymentVo queryFinanceDownPayment(FinanceDownPaymentVo financeDownPaymentVo);

    int deleteOrderDetail(OrderDetailVo orderDetailVo);

    int deleteOrder(Integer order_id);

    int deleteOrderBill(Integer bill_id);
}
