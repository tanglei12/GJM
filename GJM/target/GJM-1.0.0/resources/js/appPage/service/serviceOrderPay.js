var so_id = GetQueryString("so_id");
var em_id = GetQueryString("em_id");
var ucc_order_sn = GetQueryString("ucc_order_sn");
var order_sn = GetQueryString("order_sn");
$(function () {
    payWay();
    serviceOrderInfo();
    closePayWay();
})

//加载订单信息
function serviceOrderInfo() {
    $.ajax({
        type: "post",
        url: "/appService/serviceOrderPayInfo",
        data: {
            so_id: so_id,
            order_sn : order_sn
        },
        dataType: "json",
    }).done(function (result) {
        if (result.code != 200) {
            $.hint.tip(result.msg);
            return
        }

        //申请类型
        var problemStnamep = "";
        var problemStnamep1 = "";
        var service_st_name = "";
        $.each(result.data.serviceOrderItem, function (index, item) {
            if (item.st_namep != null) {
                problemStnamep = "-" + item.st_namep + "";
                problemStnamep1 = "" + item.st_namep + "";
            }
            if (item.st_name != null) {
                service_st_name += "[" + item.st_name + "]";
            }
        })

        //房屋地址
        $("#so_targetAddress").text(returnValue(result.data.serviceOrder.so_targetAddress));
        //服务类型
        $("#sm_name").text(returnValue(result.data.serviceOrder.sm_name));
        //服务项目
        $("#sm_name1").text(problemStnamep1 + (service_st_name == "" ? "" : "-" + service_st_name));
        //下单时间
        $("#so_createTime").text(format(result.data.serviceOrder.so_createTime,"yyyy-MM-dd HH:mm:ss"));
        //付费对象
        $("#so_payNameNew").text(returnValue(result.data.serviceOrder.so_payNameNew));
        //联系方式
        $("#so_payPhoneNew").text(returnValue(result.data.serviceOrder.so_payPhoneNew));
        //订单总额
        $("#detail_amount_total").text(returnValue(result.data.serviceOrder.so_totalMoney+"元"));
        //应付金额
        $("#ssm_money").text(returnValue(result.data.serviceMoney.ssm_money+"元"));

        //支付进度
        $("#order_status").text(returnServicePayState(result.data.order.order_status).text);
        $("#order_status").addClass(returnServiceState(result.data.order.order_status).style);

        $("#derate").text("0元");
        $("#deduction").text("0元");
        $.each(result.data.orderDetail,function (index,item) {
            if (item.detail_type==3){//减免
                $("#derate").text(returnValue(item.product_price+"元"));
            }
            if (item.detail_type==2){//抵扣
                $("#deduction").text(returnValue(item.product_price+"元"));
            }
        });

        //支付金额
        $("#order_amount_pay").text(returnValue(result.data.order.order_amount_pay+"元"));

        //根据支付进度显示或者隐藏扫码支付
        if (result.data.order.order_status == 2){
            $("#pay-status").show();
            $("#pay-status-lines").show();
        }else {
            $("#pay-status").hide();
            $("#pay-status-lines").hide();
        }
    })
}

//扫码支付
function submitPay() {
    var payWay = $(".on").attr("id");
    if (payWay=="ali_pay"){
        payWay="支付宝";
    }else if (payWay=="weixin_pay"){
        payWay="微信";
    }
    if (payWay==null){
        $.hint.tip("请选择一种支付方式");
        return;
    }
    $.ajax({
        type: "post",
        url: "/appPage/order/submitPay",
        data: {
            pay_channel: payWay,
            order_sn : order_sn
        },
        dataType: "json",
    }).done(function (result) {
        if (result.code != 200) {
            $.hint.tip(result.msg);
            return
        }
        $.hint.tip("等待扫码支付..", "loading");
        // 跳转二维码支付页面
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || /(Android)/i.test(navigator.userAgent)) {
            window.location.href="/appPage/order/rqcodePay?bill_sn=" +result.data.orderBill.bill_sn ;
        } else {
            window.open('/appPage/order/rqcodePay?bill_sn='+ result.data.orderBill.bill_sn);
        }
        $.hint.close();
    })
}

//支付进度
function returnServicePayState(param) {
    var data = {};
    data.list = {
        1: "订单审核中",
        2: "等待客户支付",
        3: "订单已支付",
        4: "订单已取消",
    };
    data.text = data.list[param];
    switch (param) {
        case 1 :
            data.style = "error";
            break;
        case 2 :
            data.style = "error";
            break;
        case 3 :
            data.style = "ok";
            break;
        case 4 :
            data.style = "error";
            break;
        default:
            data.text = "未知状态";
            data.style = "error";
            break;
    }
    return data;
}

//显示扫码支付
function clickPay(){
    $(".show-pay").show();
}

//支付方式选择
function payWay() {
    $(".show-pay").height($(window).height());
    $(".show-bg").click(function(){
        $(".show-pay").hide();
    });

    // 支付方式
    $("#ali_pay").click(function(){
        $("#ali_pay .fa-check-circle").css("color","#FF6666");
        $("#weixin_pay .fa-check-circle").css("color","#E8E8E8");
        $("#ali_pay").addClass("on");
        $("#weixin_pay").removeClass("on");

    });
    $("#weixin_pay").click(function(){
        $("#weixin_pay .fa-check-circle").css("color","#FF6666");
        $("#ali_pay .fa-check-circle").css("color","#E8E8E8");
        $("#weixin_pay").addClass("on");
        $("#ali_pay").removeClass("on");
    });
}
//关闭支付方式选择
function closePayWay() {
    $(".show-title").click(function () {
        $(".show-pay").hide();
    })
}

// 取消订单
function closeOrder() {
    if (!confirm("是否取消订单")) {
        return;
    }
    $.ajax({
        type: "post",
        url: "/appService/updateServiceMoney",
        data: {
            so_id: getUrlParam("so_id"),
            payObject: getUrlParam("payObject"),
            trade_code: getUrlParam("trade_code"),
            ucc_order_sn: getUrlParam("ucc_order_sn")
        },
        dataType: "json"
    }).done(function (result) {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            window.webkit.messageHandlers.goBackRefresh.postMessage([]);
        }
        else if (/(Android)/i.test(navigator.userAgent)) {
            webview.goBackRefresh();
        }
    })
}

//获取url参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}