// 任务ID
var interva = 0;
// 任务执行周期
var interval_cycle = 0;
// 任务定时时长
var task_time = 3000;
// 任务完成时回调时间
var task_done_time = 2000;
$(function () {
    // 请求二维码支付
    requestRqcodePay();

    window.onbeforeunload = function () {
        clearInterval(interva);
    }

    window.onblur = function (e) {
        e = e || window.event;
        if (window.ActiveXObject && /MSIE/.test(navigator.userAgent)) {  //IE
            //如果 blur 事件是窗口内部的点击所产生，返回 false, 也就是说这是一个假的 blur
            var x = e.clientX;
            var y = e.clientY;
            var w = document.body.clientWidth;
            var h = document.body.clientHeight;
            if (x >= 0 && x <= w && y >= 0 && y <= h) {
                window.focus();
                return false;
            }
        }
    }
});

// 请求二维码支付
function requestRqcodePay() {
    $.ajax({
        type: "post",
        url: "/appPage/order/requestRqcodePay",
        data: {
            bill_sn: getUrlParam("bill_sn")
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code != 200) {
            // $(".code-main").html('<i class="fa-times-circle error"></i>');
            $(".code-main").html('<img class="code" src="/resources/image/svg/fail.svg"/>');
            $(".code-bottom").addClass("error-bg").html(result.msg);
            return;
        }

        var data = result.data;
        var orderBill = result.data.orderBill || "";
        // 标题
        $(".code-title").html(returnValue(orderBill.bill_title));
        // 支付金额
        $(".code-money").html("￥" + returnMoney(returnFloat(orderBill.bill_pay_amount), 2));
        // 区分状态
        switch (orderBill.bill_status) {
            case 1:
                // 判断支付方式
                switch (data.result_pay_channel) {
                    case "支付宝":
                        $("#pay_logo").attr("src", "/resources/image/appPage/pay/pay_logo_zfb.png").show();
                        $(".code-bottom").addClass("code-bottom-zfb").html("打开支付宝扫一扫，向商家付款");
                        break;
                    case "微信":
                        $("#pay_logo").attr("src", "/resources/image/appPage/pay/pay_logo_wx.png").show();
                        $(".code-bottom").addClass("code-bottom-wx").html("打开微信扫一扫，向商家付款");
                        break;
                }
                // 支付二维码
                $('#qrcode').qrcode({
                    render: "canvas",
                    ecLevel: 'H',//识别度
                    fill: '#000',//二维码颜色
                    background: '#ffffff',//背景颜色
                    quiet: 2,//边距
                    width: 170,//宽度
                    height: 170,
                    text: data.qr_code,// 二维码内容
                    // //中间logo start
                    // mode: 4,
                    // mSize: 11 * 0.01,
                    // mPosX: 50 * 0.01,
                    // mPosY: 50 * 0.01,
                    // src: "/resources/image/10.png",//logo图片
                    //中间logo end
                    label: 'jQuery.qrcode',
                    fontname: 'Ubuntu',
                    fontcolor: '#ff9818'
                });

                // 执行任务：查询支付结果
                queryPayResult();
                break;
            case 2:
                $(".code-main").html('<img class="code" src="/resources/image/svg/success.svg"/>');
                $(".code-bottom").addClass("ok-bg").html('支付成功');

                break;
            case 3:
                $(".code-main").html('<img class="code" src="/resources/image/svg/fail.svg"/>');
                $(".code-bottom").addClass("error-bg").html("交易已关闭");
                break;
        }

        // 订单支付成功
        if (result.code == 201) {
            // $(".code-main").html('<i class="fa-check-circle ok"></i>');
            $(".code-main").html('<img class="code" src="/resources/image/svg/success.svg"/>');
            $(".code-bottom").html('支付成功');
            return;
        }
    });
}

// 查询支付结果
function queryPayResult() {
    // 任务定时器
    interva = setInterval(function () {
        if (interval_cycle > 40) {
            clearInterval(interva);
            return;
        }
        interval_cycle++;
        // 查询支付结果
        $.ajax({
            type: "POST",
            url: "/appPage/order/queryPayResult",
            data: {
                bill_sn: getUrlParam("bill_sn")
            },
            dataType: "json"
        }).done(function (result) {
            // 支付成功
            if (result.code == 200) {
                // 提示图标
                $(".code-main").html('<img class="code" src="/resources/image/svg/success.svg"/>');
                $(".code-bottom").addClass("ok-bg").html('支付成功');
                // 关闭任务
                clearInterval(interva);
                // 延时回调
                setTimeout(function () {
                    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                        window.webkit.messageHandlers.goBackRefresh.postMessage([]);
                    } else if (/(Android)/i.test(navigator.userAgent)) {
                        webview.goBackRefresh();
                    }
                }, task_done_time)
            }
            // 支付关闭
            else if (result.code == 300) {
                $(".code-main").html('<img class="code" src="/resources/image/svg/fail.svg"/>');
                $(".code-bottom").addClass("error-bg").html("交易已关闭");
                clearInterval(interva);
            }
        });
    }, task_time);
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
