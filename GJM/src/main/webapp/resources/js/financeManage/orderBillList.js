$(function () {
    load_data();
});

/**
 * 加载数据
 */
function load_data() {
    $.table({
        filterDateParams: [
            {name: "支付时间", value: "bill_pay_time", sort: 'DESC'}
        ],
        filterBars: [],
        listParams: [
            {text: "商户订单号", name: "bill_trade_code", param: "", func: {type: "onclick", name: "load_bill_info(this)"}},
            {text: "流水标题", name: "bill_title", param: ""},
            {text: "客户信息", name: "user_name{/}user_phone", param: ""},
            {text: "支付方式", name: "bill_pay_channel", param: ""},
            {text: "收支类型", name: "bill_type", param: "returnOrderBalPay"},
            {text: "流水金额", name: 'bill_pay_total{<div class="bill-money-more fa-caret-down next"><div class="content"></div></div>}', param: "money"},
            {text: "支付状态", name: "bill_status", param: "returnPayStatementState"},
            {text: "核销状态", name: "bill_check_status", param: "returnBillCheckState"},
            {text: "支付时间", name: "bill_pay_time", param: "time"}
        ],
        ajaxParams: {
            url: "/financeManage/queryOrderBillPageList",
        },
        ajaxDone: function () {
            // 【事件】查看更多金额
            $(".bill-money-more").off().on("click", function () {
                var parent_item = $(this).parents(".list-content-item");
                var parent_data = parent_item.find("[name=table-checkbox]").data("data");

                $(".bill-money-more").find(".content").empty();

                var html = '';
                html += '<div></div>';
                switch (parent_data.bill_pay_channel) {
                    case "支付宝":
                        html += '<dl><dt>支付宝支付</dt><dd>￥' + returnMoney(parent_data.bill_pay_amount, 2) + '</dd></dl>';
                        break;
                    case "微信":
                        html += '<dl><dt>微信支付</dt><dd>￥' + returnMoney(parent_data.bill_pay_amount, 2) + '</dd></dl>';
                        break;
                    case "现金":
                        html += '<dl><dt>现金支付</dt><dd>￥' + returnMoney(parent_data.bill_pay_amount, 2) + '</dd></dl>';
                        break;
                    default:
                        html += '<dl><dt>其他支付</dt><dd>￥' + returnMoney(parent_data.bill_pay_amount, 2) + '</dd></dl>';
                        break;
                }
                html += '<dl><dt>余额支付</dt><dd>￥' + returnMoney(parent_data.bill_pay_deduction, 2) + '</dd></dl>';
                $(this).find(".content").html(html);

                $(this).click(function (e) {
                    e.stopPropagation();
                });
                $(this).find(".content").click(function (e) {
                    e.stopPropagation();
                });

                $(document).click(function () {
                    $(".bill-money-more").find(".content").empty();
                });

                return false;
            });
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
        url: "/financeManage/queryOrderBill",
        data: {
            bill_sn: _data.bill_sn
        },
        dataType: "json",
    }).done(function (result) {
        $.popupRefreshClose();
        if (result.code != 200) return;

        // console.log(result.data);

        // 流水信息
        const orderBill = result.data.orderBill || "";
        // 订单列表
        const orderList = result.data.orderList || "";
        // 流水核销列表
        const orderBillCheckList = result.data.orderBillCheckList || "";

        // ->流水状态
        const bill_status = returnPayStatementState(orderBill.bill_status);
        // ->支付渠道
        const bill_channel = returnPayFlowStatementSource(orderBill.bill_channel);
        // ->核销状态
        const bill_check_status = returnBillCheckStatus(orderBill.bill_check_status);
        // ->账单类型
        const bill_type = returnOrderBalPay(orderBill.bill_type);

        var html = '';
        html += '<div class="popup-list">';
        html += '   <dl>';
        html += '       <dt style="font-size: 16px;font-weight: bold;">' + returnValue(orderBill.bill_title) + ' / ' + returnValue(orderBill.user_name) + '-' + returnValue(orderBill.user_phone) + '</dt>';
        html += '   </dl>';
        html += '</div>';
        html += '<!--基本信息-->';
        html += '<div class="popup-list">';
        html += '   <!--<i class="popup-icon-info fa-info-circle next"></i>-->';
        html += '   <dl><dt>支付渠道</dt><dd class="' + bill_channel.style + '">' + bill_channel.text + '</dd></dl>';
        html += '   <dl><dt>支付方式</dt><dd>' + returnValue(orderBill.bill_pay_channel) + '</dd></dl>';
        html += '   <dl><dt>支付方式</dt><dd class="' + bill_type.style + '">' + bill_type.text + '</dd></dl>';
        html += '   <dl><dt>支付金额</dt>';
        html += '       <dd>';
        html += '           <div style="font-weight: bold;">￥' + returnMoney(orderBill.bill_pay_total, 2) + '</div>';
        html += '           <div id="info-money-more"></div>';
        html += '       </dd>';
        html += '   </dl>';
        html += '   <dl><dt>支付状态</dt><dd class="' + bill_status.style + '">' + bill_status.text + '</dd></dl>';
        html += '   <dl><dt>支付时间</dt><dd>' + returnTime(orderBill.bill_pay_time) + '</dd></dl>';
        html += '   <dl><dt>备注</dt>';
        html += '       <dd>' + returnNullReplace(orderBill.bill_remarks, "-") + '</dd>';
        html += '       <dd><button name="addRemark" class="popup-result-option hint-border-color"><i class="fa-edit" style="margin-right: 4px;"></i>编辑</button></dd>';
        html += '   </dl>';
        html += '   <dl><dt>创建时间</dt><dd>' + returnTime(orderBill.bill_create_time) + '</dd></dl>';
        html += '</div>';
        html += '<!--支付信息-->';
        html += '<div class="popup-list">';
        html += '   <dl><dt>关联订单</dt><dd id="order_main"></dd></dl>';
        html += '</div>';
        html += '';
        html += '<!--支付信息-->';
        html += '<div class="popup-list" id="trade_record">';
        html += '   <dl><dt>支付平台</dt>';
        html += '       <dd><button name="queryPayState" class="popup-result-option next-border-color"><i class="fa-search" style="margin-right: 4px;"></i>核账</button></dd>';
        html += '   </dl>';
        html += '</div>';
        html += '';
        html += '<!--账务核销-->';
        html += '<div class="popup-list">';
        html += '   <dl>';
        html += '       <dt>账务核销</dt>';
        html += '       <dd class="' + bill_check_status.style + '">' + bill_check_status.text + '</dd>';
        html += '       <dd id="check_status"></dd>';
        html += '   </dl>';
        html += '   <dl class="validRecordBox" style="display: none;margin-top: 10px;">';
        html += '       <dt>核销记录</dt>';
        html += '       <dd>';
        html += '           <table style="width: 600px;line-height: 36px;">';
        html += '               <thead>';
        html += '                   <tr style="background: #f5f8fa;">';
        html += '                       <th style="width: 90px;">核销时间</th>';
        html += '                       <th>核销人员</th>';
        html += '                       <th>核销描述</th>';
        html += '                   </tr>';
        html += '               </thead>';
        html += '               <tbody id="check_list"></tbody>';
        html += '           </table>';
        html += '       </dd>';
        html += '   </dl>';
        html += '</div>';
        html += '';
        box.html(html);

        // 赋值 -----------------------------------------

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

        // 遍历订单列表数据
        $.each(orderList, function (o_index, o_data) {
            var indexs = ["①", "②", "③", "④", "⑤", "⑥"];
            var item_style_1 = 'style=""';
            var item_style_2 = 'style="flex: 1;text-align: right"';
            var item_style_3 = 'style="width: 100px;text-align: right;"';

            var html = '';
            html += '<div class="order-list">';
            html += '    <div class="order-list-head">';
            html += '        <div ' + item_style_1 + '>订单' + indexs[o_index] + '<div style="font-size: 12px;line-height: 20px;font-weight: normal;">No.' + o_data.order_sn + '</div></div>';
            html += '        <div ' + item_style_2 + '></div>';
            html += '        <div ' + item_style_3 + '>￥' + returnMoney(o_data.order_amount_pay, 2) + '</div>';
            html += '    </div>';
            // 遍历订单明细列表数据
            $.each(o_data.detailList, function (d_index, d_data) {
                var detail_subtotal = {style: "", text: ""};
                switch (d_data.detail_type) {
                    case 1:
                    case 17:
                        detail_subtotal.text = "￥" + returnMoney(d_data.detail_subtotal, 2);
                        break;
                    default:
                        detail_subtotal.style = "error";
                        detail_subtotal.text = "-￥" + returnMoney(d_data.detail_subtotal, 2);
                        break;
                }
                html += '<div class="order-list-item">';
                html += '    <div ' + item_style_1 + ' class="' + detail_subtotal.style + '">' + returnValue(d_data.product_name) + '</div>';
                html += '    <div ' + item_style_2 + ' class="' + detail_subtotal.style + '">x' + returnNumber(d_data.product_number) + '</div>';
                html += '    <div ' + item_style_3 + ' class="' + detail_subtotal.style + '">' + detail_subtotal.text + '</div>';
                html += '</div>';
            });
            html += '</div>';
            $("#order_main").append(html);
        });

        // 遍历核销记录
        $.each(orderBillCheckList, function (index, data) {
            var html = '';
            html += '<tr>';
            html += '    <td style="width: 90px;">' + returnTime(data.pvf_validTime) + '</td>';
            html += '    <td>' + returnValue(data.pvf_em_name) + '</td>';
            html += '    <td>' + returnValue(data.pvf_content) + '</td>';
            html += '</tr>';
            $("#check_list").append(html);
        });

        // 核销状态
        switch (orderBill.bill_check_status) {
            case 1:
                $("#check_status").html(
                    '<dd><button name="validState" class="popup-result-option next-border-color"><i class="fa-cny" style="margin-right: 4px;"></i>核销</button></dd>'
                );
                break;
            case 2:
                $("#check_status").html(
                    // '<button name="validState" class="popup-result-option error-bg" style="margin-top: 2px;"><i class="fa-cny" style="margin-right: 4px;"></i>反核销</button>' +
                    '<button name="queryValidRecord" class="popup-result-option next-border-color" style="margin-left: 10px;"><i class="fa-search" style="margin-right: 4px;"></i>查看</button>'
                );
                break;
        }

        // 核账
        switch (orderBill.bill_pay_channel) {
            case "支付宝":
            case "微信":
                $("#trade_record").show();
                break;
            default:
                $("#trade_record").hide();
                break;
        }

        // 事件 -----------------------------------------

        // 【事件】查账
        box.find("[name=queryPayState]").off().on("click", function () {
            popup_query_bill_state(this, orderBill);
            $(this).attr("disabled", "disabled");
        });

        // 【事件】核销
        box.find("[name=validState]").off().on("click", function () {
            popup_valid_state(this, orderBill);
            $(this).attr("disabled", "disabled");
        });

        // 【事件】添加备注
        box.find("[name=addRemark]").off().on("click", function () {
            popup_add_remarks(this, orderBill);
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
 * 弹出层-添加备注
 *
 * @param obj
 * @param orderBill
 */
function popup_add_remarks(obj, orderBill) {
    var p_box = $(obj).parents(".popup-list");
    var p_dl = $(obj).parents("dl");
    p_box.find(".popup-list-result").remove();
    p_dl.after(
        '<div class="popup-list-result">' +
        '   <div class="popup-list-result-title" style="display: flex;">' +
        '       <div style="flex: 1">添加备注</div>' +
        '       <button class="popup-list-result-confirm ok" name="addRemarkConfirm"><i class="fa-check"></i></button>' +
        '       <button class="popup-list-result-close error"><i class="fa-remove"></i></button>' +
        '   </div>' +
        '   <div class="popup-list-result-form" style="padding: 0;">' +
        '       <dl style="">' +
        '           <dt style="width: 100%;"><textarea class="popup-textarea" placeholder="填写备注" name="popupTaRemark">' + returnValue(orderBill.bill_remarks) + '</textarea></dt>' +
        '       </dl>' +
        // '       <dl style="padding: 8px;">' +
        // '           <dt>' +
        // '               <button class="popup-list-result-confirm next-bg" name="addRemarkConfirm">提交</button>' +
        // '               <button class="popup-list-result-close error-bg">取消</button>' +
        // '           </dt>' +
        // '       </dl>' +
        '   </div>' +
        '</div>');

    var remark_cache = p_box.find("[name=popupTaRemark]").val();
    p_box.find("[name=popupTaRemark]").val("").focus().val(remark_cache);

    // 【事件】关闭结果
    p_box.find(".popup-list-result-close").off().on("click", function () {
        $(this).parents(".popup-list-result").hide("fast", function () {
            this.remove();
            $(obj).removeAttr("disabled");
        })
    });

    // 【事件】提交备注
    p_box.find("[name=addRemarkConfirm]").off().on("click", function () {
        $.ajax({
            type: "POST",
            url: "/financeManage/updateOrderBillForRemark",
            data: {
                bill_sn: orderBill.bill_sn,
                bill_remarks: p_box.find("[name=popupTaRemark]").val().trim()
            },
            dataType: "json"
        }).done(function (result) {
            if (result.code != 200) return;
            $.popupRefresh();
        });
    });
}

/**
 * 弹出层-查账
 *
 * @param obj
 * @param orderBill
 */
function popup_query_bill_state(obj, orderBill) {
    var p_box = $(obj).parents(".popup-list");
    p_box.find(".popup-list-result").remove();
    p_box.append(
        '<div class="popup-list-result">' +
        '   <div class="popup-list-result-title" style="display: flex;"><div style="flex: 1;">查账结果</div><button class="popup-list-result-close error"><i class="fa-remove"></i></button></div>' +
        '   <div class="popup-list-result-content"><div class="error">数据加载中</div></div>' +
        '</div>');

    // 加载数据
    popup_query_bill(p_box, orderBill);

    // 【事件】关闭结果
    p_box.find(".popup-list-result-close").off().on("click", function () {
        $(this).parents(".popup-list-result").hide("fast", function () {
            this.remove();
            $(obj).removeAttr("disabled");
        })
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
        if (!isEmpty(data.trade_refund_money)) {
            html += '<dl>';
            html += '    <dt>退款金额</dt>';
            html += '    <dd>' + returnMoney(data.trade_refund_money, 2) + '</dd>';
            html += '</dl>';
        }
        if (!isEmpty(data.trade_refund_time)) {
            html += '<dl>';
            html += '    <dt>退款时间</dt>';
            html += '    <dd>' + returnTime(data.trade_refund_time) + '</dd>';
            html += '</dl>';
        } else {
            html += '<dl>';
            html += '    <dt>支付时间</dt>';
            html += '    <dd>' + returnTime(data.trade_time) + '</dd>';
            html += '</dl>';
        }
        p_box.find(".popup-list-result-content").html(html);
        p_box.find(".popup-list-result").css({width: "660px"});
    });
}

/**
 * 弹出层-核销
 *
 * @param obj
 * @param orderBill
 */
function popup_valid_state(obj, orderBill) {
    var p_box = $(obj).parents(".popup-list");
    p_box.find(".popup-list-result").remove();
    p_box.append(
        '<div class="popup-list-result">' +
        '   <div class="popup-list-result-title" style="display: flex;"><div style="flex: 1">账务核销</div><button class="popup-list-result-close error"><i class="fa-remove"></i></button></div>' +
        '   <div class="popup-list-result-form">' +
        '       <input type="hidden" name="pvf_validTime" value="' + returnTime(new Date()) + '">' +
        // '       <dl style="border-bottom: 1px solid #dddddd">' +
        // '           <dd>' +
        // '               <div class="popup-list-result-content" style="padding: 0"><div class="error">数据加载中</div></div>' +
        // '           </dd>' +
        // '       </dl>' +
        '       <dl>' +
        '           <dt>核销金额</dt>' +
        '           <dd>' + returnMoney(orderBill.bill_pay_total, 2) + '</dd>' +
        '       </dl>' +
        '       <dl>' +
        '           <dt>核销人员</dt>' +
        '           <dd>' + returnValue($.cookie("em_name")) + '</dd>' +
        '       </dl>' +
        '       <dl>' +
        '           <dt>核销时间</dt>' +
        '           <dd>' + returnTime(new Date()) + '</dd>' +
        '       </dl>' +
        '       <dl>' +
        '           <dt></dt>' +
        '           <dd>' +
        '               <button class="popup-list-result-confirm next-bg" name="validStateConfirm">确定核销</button>' +
        '               <button class="popup-list-result-close error-bg">取消</button>' +
        '           </dd>' +
        '       </dl>' +
        '   </div>' +
        '</div>');

    // 加载数据
    popup_query_bill(p_box, orderBill);

    // 【事件】关闭结果
    p_box.find(".popup-list-result-close").off().on("click", function () {
        $(this).parents(".popup-list-result").hide("fast", function () {
            this.remove();
            $(obj).removeAttr("disabled");
        })
    });

    // 【事件】核销
    p_box.find("[name=validStateConfirm]").off().on("click", function () {
        var _this = $(this);
        if (confirm("确定核销该笔流水吗?")) {
            $.ajax({
                type: "POST",
                url: "/financeManage/updateOrderBillForCheck",
                data: {
                    payFlowStatementValidRecordStr: JSON.stringify({
                        bs_serialNumber: orderBill.bill_sn,
                        pvf_content: "核销金额" + returnMoney(orderBill.bill_pay_total, 2) + "元",
                        pvf_em_id: $.cookie("em_id"),
                        pvf_validTime: p_box.find("[name=pvf_validTime]").val()
                    })
                },
                dataType: "json",
                beforeSend: function () {
                    _this.attr("disabled", "disabled");
                }
            }).done(function (result) {
                if (result.code != 200) return $.hint.tip(result.msg);
                $.popupRefresh();
            }).always(function () {
                _this.removeAttr("disabled");
            });
        }
    });
}