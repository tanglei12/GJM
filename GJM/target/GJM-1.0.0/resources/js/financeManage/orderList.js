$(function () {
    load_data();
});

/**
 * 加载数据
 */
function load_data() {
    $.table({
        filterDateParams: [
            {name: "创建时间", value: "order_create_time", sort: 'DESC'}
        ],
        filterBars: [
            {name: "order_type", type: "select", selected: "0", data: "returnOrderType"},
            {name: "order_status", type: "select", selected: "0", data: "returnOrderStatus"},
            {name: "order_balpay", type: "select", selected: "0", data: "returnOrderBalPay"},
        ],
        listParams: [
            {text: "订单号", name: "order_sn", param: "", func: {type: "onclick", name: "load_bill_info(this)"}},
            {text: "订单标题", name: "order_title", param: ""},
            {text: "订单类型", name: "order_type", param: "returnOrderType"},
            {text: "交易对象", name: "trade_object", param: returnOrderTradeObject().list},
            {text: "客户信息", name: "user_name{/}user_phone", param: ""},
            {text: "收支类型", name: "order_balpay", param: "returnOrderBalPay"},
            {text: "商品总金额", name: "detail_amount_total", param: "money"},
            {text: "优惠金额", name: "detail_amount_coupon", param: "money"},
            {text: "支付金额", name: "order_amount_pay", param: "money"},
            {text: "订单状态", name: "order_status", param: "returnOrderStatus"},
            {text: "创建时间", name: "order_create_time", param: "time"}
        ],
        ajaxParams: {
            url: "/financeManage/queryOrderPageList",
        }
    });
}

// 加载流水信息
function load_bill_info(_this) {
    var data = $(_this).parents(".list-content-item").find("[name=table-checkbox]").data("data");
    $.popupBox({
        target: $.table.getTableContent(),
        data: data,
        done: function (_box, _data) {
            load_popup(_box.main, _data);
        },
        close: function () {
            $.table.loadData();
        }
    });
}

/**
 * 加载弹出层
 *
 * @param box
 * @param _data
 */
function load_popup(box, _data) {
    $.ajax({
        type: "POST",
        url: "/financeManage/queryOrderInfo",
        data: {
            order_sn: _data.order_sn
        },
        dataType: "json",
    }).done(function (result) {
        $.popupRefreshClose();
        if (result.code != 200) return $.hint.tip(result.msg);

        console.log(result.data);

        // 订单信息
        const orderInfo = result.data.orderInfo || "";
        // 订单明细
        const orderDetailList = result.data.orderDetailList || "";
        // 流水
        const orderBill = result.data.orderBill || "";

        // ->流水状态
        const order_status = returnOrderStatus(orderInfo.order_status);

        var html = '';
        html += '<div class="popup-list">';
        html += '   <dl>';
        html += '       <dt style="font-size: 16px;font-weight: bold;">' + returnValue(orderInfo.order_title) + ' / ' + returnValue(orderInfo.user_name) + '-' + returnValue(orderInfo.user_phone) + '</dt>';
        html += '   </dl>';
        html += '</div>';
        html += '<!--基本信息-->';
        html += '<div class="popup-list">';
        html += '   <!--<i class="popup-icon-info fa-info-circle next"></i>-->';
        html += '   <dl><dt>订单类型</dt>';
        html += '       <dd>' + returnOrderType(orderInfo.order_type).text + '</dd>';
        html += '   </dl>';
        html += '   <dl><dt>订单状态</dt>';
        html += '       <dd class="' + order_status.style + '">' + order_status.text + '</dd>';
        html += '   </dl>';
        html += '   <dl class="order_agreed_pay_date">';
        html += '       <dt>应付日期</dt>';
        html += '       <dd>' + returnNullReplace(returnDate(orderInfo.order_agreed_pay_date), "-") + '</dd>';
        html += '   </dl>';
        html += '</div>';
        html += '<div class="popup-list pay_info">';
        html += '   <dl class="pay_sn">';
        html += '       <dt>支付流水号</dt>';
        html += '       <dd>' + returnNullReplace(orderInfo.pay_sn, "-") + '</dd>';
        html += '   </dl>';
        html += '   <dl class="pay_channel">';
        html += '       <dt>支付方式</dt>';
        html += '       <dd>' + returnNullReplace(orderInfo.pay_channel, "-") + '</dd>';
        html += '   </dl>';
        html += '   <dl class="order_amount_pay"><dt>支付金额</dt>';
        html += '       <dd>';
        html += '           <div style="font-weight: bold;">￥' + returnMoney(orderInfo.order_amount_pay, 2) + '</div>';
        html += '           <div id="info-money-more"></div>';
        html += '       </dd>';
        html += '   </dl>';
        html += '   <dl class="pay_time">';
        html += '       <dt>支付时间</dt>';
        html += '       <dd>' + returnNullReplace(returnTime(orderInfo.pay_time), "-") + '</dd>';
        html += '   </dl>';
        html += '</div>';
        html += '<div class="popup-list">';
        html += '   <dl>';
        html += '       <dt>订单明细</dt>';
        html += '       <dd id="order_main" class="order-list" style="margin: 0"></dd>';
        html += '   </dl>';
        html += '</div>';
        html += '';
        box.html(html);

        //
        if (orderInfo.order_type != 1) {
            box.find(".order_agreed_pay_date").hide();
        }
        if (orderInfo.order_status != 3) {
            box.find(".pay_info").hide();
        }

        // 遍历订单明细列表数据
        var item_style_1 = 'style=""';
        var item_style_2 = 'style="flex: 1;text-align: right"';
        var item_style_3 = 'style="width: 100px;text-align: right;"';

        var html = '';
        html += '<div class="order-list-head">';
        html += '    <div ' + item_style_1 + '>标题</div>';
        html += '    <div ' + item_style_2 + '>数量</div>';
        html += '    <div ' + item_style_3 + '>价格</div>';
        html += '</div>';
        $("#order_main").append(html);

        $.each(orderDetailList, function (index, data) {
            var detail_subtotal = {style: "", text: ""};
            switch (data.detail_type) {
                case 1:
                    detail_subtotal.text = "￥" + returnMoney(data.detail_subtotal, 2);
                    break;
                default:
                    detail_subtotal.style = "error";
                    detail_subtotal.text = "-￥" + returnMoney(data.detail_subtotal, 2);
                    break;
            }
            var html = '';
            html += '<div class="order-list-item">';
            html += '    <div ' + item_style_1 + ' class="' + detail_subtotal.style + '">' + returnValue(data.product_name) + '</div>';
            html += '    <div ' + item_style_2 + ' class="' + detail_subtotal.style + '">x' + returnNumber(data.product_number) + '</div>';
            html += '    <div ' + item_style_3 + ' class="' + detail_subtotal.style + '">' + detail_subtotal.text + '</div>';
            html += '</div>';
            $("#order_main").append(html);
        });
        var html = '';
        html += '<div class="order-list-item" style="line-height: 24px;padding-top: 10px;">';
        html += '    <div ' + item_style_2 + '>订单总金额：</div>';
        html += '    <div ' + item_style_3 + '>￥' + returnMoney(orderInfo.detail_amount_total, 2) + '</div>';
        html += '</div>';
        html += '<div class="order-list-item" style="line-height: 24px;border: none;">';
        html += '    <div ' + item_style_2 + '>优惠金额：</div>';
        html += '    <div ' + item_style_3 + ' class="error">-￥' + returnMoney(orderInfo.detail_amount_coupon, 2) + '</div>';
        html += '</div>';
        html += '<div class="order-list-item" style="line-height: 24px;border: none;">';
        html += '    <div ' + item_style_2 + '>支付金额：</div>';
        html += '    <div ' + item_style_3 + ' class="next">￥' + returnMoney(orderInfo.order_amount_pay, 2) + '</div>';
        html += '</div>';
        $("#order_main").append(html);

        //
        var html = '';
        switch (orderBill.bill_pay_channel) {
            case "支付宝":
                html += '<dl><dt>支付宝支付</dt><dd>￥' + returnMoney(orderBill.bill_pay_amount, 2) + '</dd></dl>';
                break;
            case "微信":
                html += '<dl><dt>微信支付</dt><dd>￥' + returnMoney(orderBill.bill_pay_amount, 2) + '</dd></dl>';
                break;
            case "现金":
                html += '<dl><dt>现金支付</dt><dd>￥' + returnMoney(orderBill.bill_pay_amount, 2) + '</dd></dl>';
                break;
            default:
                html += '<dl><dt>其他支付</dt><dd>￥' + returnMoney(orderBill.bill_pay_amount, 2) + '</dd></dl>';
                break;
        }
        html += '<dl><dt>余额支付</dt><dd>￥' + returnMoney(orderBill.bill_pay_deduction, 2) + '</dd></dl>';
        $("#info-money-more").html(html);

        // 【事件】查账
        box.find("[name=queryPayState]").off().on("click", function () {
            popup_query_bill_state(this, orderInfo);
            $(this).attr("disabled", "disabled");
        });

        // 【事件】核销
        box.find("[name=validState]").off().on("click", function () {
            popup_valid_state(this, orderInfo);
            $(this).attr("disabled", "disabled");
        });

        // 【事件】添加备注
        box.find("[name=addRemark]").off().on("click", function () {
            popup_add_remarks(this, orderInfo);
            $(this).attr("disabled", "disabled");
        });

        // 【事件】查询核销记录
        box.find("[name=queryValidRecord]").off().on("click", function () {
            var valid_box = box.find(".validRecordBox");
            if (valid_box.is(":hidden")) {
                valid_box.show("fast");
            } else {
                valid_box.hide("fast");
            }
        });
    });
}

/**
 * 弹出层-获取查账信息
 *
 * @param p_box
 * @param orderBill
 */
function popup_query_bill(p_box, orderBill) {
    var bill_pay_channel = {style: "", text: returnValue(orderBill.bill_pay_channel)};

    $.ajax({
        type: "POST",
        url: "/financeManage/checkOrderBillForPayPlatform",
        data: {
            bill_sn: orderBill.bill_sn
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code != 200) {
            p_box.find(".popup-list-result-content").html('<div class="error" style="font-size: 14px;">' + result.msg + '</div>');
            return;
        }

        const data = result.data || "";

        var html = '';
        html += '<dl>';
        html += '    <dt>交易流水号</dt>';
        html += '    <dd title="' + returnValue(data.trade_no) + '">' + returnValue(data.trade_no) + '</dd>';
        html += '</dl>';
        html += '<dl>';
        html += '    <dt>支付方式</dt>';
        html += '    <dd class="' + bill_pay_channel.style + '">' + bill_pay_channel.text + '</dd>';
        html += '</dl>';
        html += '<dl>';
        html += '    <dt>交易状态</dt>';
        html += '    <dd>' + returnValue(data.trade_state) + '</dd>';
        html += '</dl>';
        html += '<dl>';
        html += '    <dt>支付金额</dt>';
        html += '    <dd>' + returnMoney(data.trade_money, 2) + '</dd>';
        html += '</dl>';
        html += '<dl class="trade_refund_money">';
        html += '    <dt>退款金额</dt>';
        html += '    <dd>' + returnMoney(data.trade_refund_money, 2) + '</dd>';
        html += '</dl>';
        html += '<dl class="trade_refund_time">';
        html += '    <dt>退款时间</dt>';
        html += '    <dd>' + returnTime(data.trade_refund_time) + '</dd>';
        html += '</dl>';
        html += '<dl class="trade_time">';
        html += '    <dt>支付时间</dt>';
        html += '    <dd>' + returnTime(data.trade_time) + '</dd>';
        html += '</dl>';
        p_box.find(".popup-list-result-content").html(html);

        if (!isEmpty(data.trade_refund_money)) {
            p_box.find(".trade_refund_money").show();
        }
        if (!isEmpty(data.trade_refund_time)) {
            p_box.find(".trade_refund_time").show();
        } else {
            p_box.find(".trade_time").show();
        }
    });
}

/**
 * 同步支付订单
 */
function syncPayOrder(_this) {
    $.ajax({
        type: "POST",
        url: "/financeManage/syncPayOrder",
        data: {},
        dataType: "json",
        beforeSend: function () {
            $(_this).attr("disabled", "disabled").find("i").addClass("animation-spin");
        }
    }).done(function (result) {
        if (result.code != 200) return $.hint.tip(result.msg);
        $.hint.tip("同步支付订单成功", "success");
        $.table.loadData();
    }).always(function () {
        $(_this).removeAttr("disabled").find("i").removeClass("animation-spin");
    });
}