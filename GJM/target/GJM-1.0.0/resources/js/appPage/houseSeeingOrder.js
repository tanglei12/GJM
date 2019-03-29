var pay = "支付宝";
var order_sn = "";
$(function () {
    // $(".show-pay").height($(window).height());
    $(".show-bg").click(function () {
        $(".show-pay").hide();
    });
    $(".fa-times").click(function () {
        $(".show-pay").hide();
    });
    // 支付方式
    $("#ali_pay").click(function () {
        $("#ali_pay .fa-check-circle").css("color", "#FF6666");
        $("#weixin_pay .fa-check-circle").css("color", "#E8E8E8");
        pay = "支付宝";
    });
    $("#weixin_pay").click(function () {
        $("#weixin_pay .fa-check-circle").css("color", "#FF6666");
        $("#ali_pay .fa-check-circle").css("color", "#E8E8E8");
        pay = "微信";
    });
    inintData();
});

function where(result) {
    alert(result);
}

function inintData() {
    var json = Base64.decode(getQueryString("json"), "UTF-8");
    var result = eval('(' + json + ')');
    $("#house_address").text(result.house_address);
    $("#money").text(result.money);
    $("#day").text(result.day);
    $("#moneyD").text(result.moneyD);
    $("#moneyPay").text(result.moneyD);
    $("#startDate").text(result.startDate);
    $("#date").text(result.date);
    $("#createTime").text(result.createTime);
    $("#user").text(result.user);
    $("#phone").text(result.phone);
    $("#card").text(result.card);
    order_sn = result.order_sn;
}

function submit() {
    if (isEmpty(pay)) return $.hint.tip("请选中支付方式");

    $.ajax({
        type: "POST",
        url: "/appPage/order/submitPay",
        data: {
            order_sn: order_sn,
            pay_channel: pay
        },
        dataType: "json",
        beforeSend: function () {
            $.hint.tip("二维码生成中..", "loading");
        }
    }).done(function (result) {
        if (result.code != 200) return $.hint.tip(result.msg, "error");
        var orderBill = result.data.orderBill;
        window.location.href = "/appPage/order/rqcodePay?bill_sn=" + orderBill.bill_sn;
        $.hint.close();
    });
}

function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}

function clickPay() {
    $(".show-pay").show();
}