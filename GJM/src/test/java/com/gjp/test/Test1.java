package com.gjp.test;

import com.gjp.util.AppException;
import com.gjp.util.Msg;
import com.gjp.util.pay.AliPay;

public class Test1 {

    private static String out_trade_no = "GJP0000000001";

    public static void main(String[] args) {
        try {
            Msg<Object> msg = precreate();
            System.out.println("precreate:" + msg.toString());
            msg = query();
            System.out.println("precreate:" + msg.toString());
        } catch (AppException e) {
            System.out.println(new Msg<>().toError(e));
        }
    }

    public static Msg<Object> precreate() throws AppException {
        return AliPay.alipayTradePrecreate(out_trade_no, "0.01", "测试", "", "");
    }

    public static Msg<Object> query() throws AppException {
        return AliPay.alipayTradeQuery(out_trade_no);
    }

    public static Msg<Object> close() throws AppException {
        return AliPay.alipayTradeClose(out_trade_no);
    }
}
