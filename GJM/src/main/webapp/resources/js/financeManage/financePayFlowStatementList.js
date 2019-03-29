$(function () {
    load_data();
});

/**
 * 加载数据
 */
function load_data() {
    // 时间
    var filterDateParams = [];
    filterDateParams.push({name: "创建时间", value: "bs_createTime", sort: 'DESC'});
    filterDateParams.push({name: "支付时间", value: "bs_payTime", sort: 'DESC'});

    // 标题
    var listParams = [];
    listParams.push({text: "商户订单号", name: "bs_orderNumber", param: "", func: {type: "onclick", name: "$.table.popupOpen(this)"}});
    listParams.push({text: "小区房号", name: "house_address", param: ""});
    listParams.push({text: "描述", name: "bs_subtitle", param: ""});
    listParams.push({text: "客户信息", name: "bs_payerName{/}payer_phone", param: ""});
    listParams.push({text: "流水类型", name: "bs_type", param: "returnOrderType"});
    listParams.push({text: "支付金额", name: "bs_money", param: "money"});
    listParams.push({text: "支付方式", name: "bs_payType", param: ""});
    listParams.push({text: "支付状态", name: "bs_state", param: "returnPayStatementState"});
    listParams.push({text: "交易状态", name: "bs_flowState", param: "returnPayFlowStatementTransState"});
    listParams.push({text: "账务核销", name: "bs_verifyState", param: "returnPayFlowStatementValidState"});
    // listParams.push({text: "是否关联", name: "contractObject_code", param: "returnContractObjectState"});
    listParams.push({text: "备注", name: "bs_remark", param: ""});
    listParams.push({text: "创建时间", name: "bs_createTime", param: "time"});

    var filterBars = [];
    filterBars.push({name: "bs_state", type: "select", selected: "2", data: "returnPayStatementState"});

    $.table({
        filterDateParams: filterDateParams,
        filterBars: filterBars,
        listParams: listParams,
        ajaxParams: {
            url: "/financeManage/queryPayFlowStatementPageList",
        },
        popup: {
            result: function (box, _data) {
                load_popup(box, _data);
            },
            close: function () {
                $.table.loadData();
            }
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
        url: "/financeManage/queryPayFlowStatementInfo",
        data: {
            bs_serialNumber: _data.bs_serialNumber
        },
        dataType: "json",
        beforeSend: function () {
            box.parent().find("[name=popup-refresh]>i").addClass("animation-spin");
        }
    }).done(function (result) {
        if (result.code != 200) return;
        box.parent().find("[name=popup-refresh]>i").removeClass("animation-spin");

        // 支付流水
        var financePayFlowStatement = result.data.financePayFlowStatement;
        // 退款流水
        var financeRefundFlowStatement = result.data.financeRefundFlowStatement;
        // 账单列表
        var financeBillList = result.data.financeBillList;
        // 核销记录
        var flowStatementValidRecordList = result.data.flowStatementValidRecordList;

        // 流水状态
        var bs_state = returnPayStatementState(financePayFlowStatement.bs_state);
        var bs_payType = {style: "", text: returnValue(financePayFlowStatement.bs_payType)};
        var bs_type = returnOrderType(financePayFlowStatement.bs_type);
        var bs_verifyState = returnPayFlowStatementValidState(financePayFlowStatement.bs_verifyState);
        var bs_flowState = returnPayFlowStatementTransState(financePayFlowStatement.bs_flowState);
        var bs_source = returnPayFlowStatementSource(financePayFlowStatement.bs_source);
        // 是否关联合同
        var is_relation = returnContractObjectState(financePayFlowStatement.contractObject_code);
        // 是否查账
        var is_queryBill = financePayFlowStatement.bs_payType !== '现金';
        // 是否交易支付
        var is_transPay = financePayFlowStatement.bs_state == 2;

        var html = '';
        html += '<div class="popup-list">';
        html += '   <dl>';
        html += '       <dt style="font-size: 16px;font-weight: bold;">[' + bs_type.text + ']' + returnValue(financePayFlowStatement.house_address) + ' / ' + returnValue(financePayFlowStatement.bs_payerName) + '-' + returnValue(financePayFlowStatement.payer_phone) + '</dt>';
        html += '   </dl>';
        html += '</div>';
        html += '<!--基本信息-->';
        html += '<div class="popup-list">';
        html += '   <dl><dt>描述</dt><dd>' + returnNullReplace(financePayFlowStatement.bs_subtitle, '-') + '</dd></dl>';
        html += '   <dl>';
        html += '       <dt>支付方式<i class="popup-icon-info fa-info-circle next"></i></dt>';
        html += '       <dd class="' + bs_payType.style + '">' + bs_payType.text + '</dd>';
        html += '       <dd class="' + bs_payType.style + '" style="padding-left: 0;">&nbsp;-&nbsp;' + bs_source.text + '</dd>';
        html += '   </dl>';
        html += '   <dl>';
        html += '       <dt>支付金额</dt>';
        html += '       <dd class="' + (financePayFlowStatement.bs_balPay == 1 ? "ok" : "error") + '">' + (financePayFlowStatement.bs_balPay == 1 ? "+" : "-") + returnMoney(financePayFlowStatement.bs_money, 2) + '</dd>';
        if (!isEmpty(financePayFlowStatement.bs_discount)) {
            html += '   <dd class="error" style="padding-left: 0;">[抵扣' + returnMoney(financePayFlowStatement.bs_discount, 2) + ']</dd>';
        }
        html += '   </dl>';
        if (!isEmpty(financePayFlowStatement.bs_refund)) {
            html += '   <dl><dt>退款金额</dt><dd>' + returnMoney(financePayFlowStatement.bs_refund, 2) + '</dd></dl>';
        }
        html += '   <dl><dt>交易状态</dt><dd class="' + bs_flowState.style + '">' + bs_flowState.text + '</dd></dl>';
        html += '   <dl>';
        html += '      <dt>备注</dt>';
        html += '      <dd>' + returnNullReplace(financePayFlowStatement.bs_remark, "-") + '</dd>';
        html += '      <dd><button name="addRemark" class="popup-result-option hint-border-color"><i class="fa-edit" style="margin-right: 4px;"></i>编辑</button></dd>';
        html += '   </dl>';
        html += '   <dl><dt>经办人</dt><dd>' + returnValue(financePayFlowStatement.bs_handler_name) + "-" + returnValue(financePayFlowStatement.bs_handler_phone) + '</dd></dl>';
        html += '   <dl><dt>创建时间</dt><dd>' + returnTime(financePayFlowStatement.bs_createTime) + '</dd></dl>';
        html += '</div>';
        html += '<!--支付信息-->';
        html += '<div class="popup-list">';
        html += '   <dl>';
        html += '      <dt>商户订单号</dt>';
        html += '      <dd>' + financePayFlowStatement.bs_orderNumber + '</dd>';
        if (is_queryBill) {
            html += '  <dd><button name="queryPayState" class="popup-result-option next-border-color"><i class="fa-search" style="margin-right: 4px;"></i>查账</button></dd>';
        }
        html += '   </dl>';
        html += '   <dl><dt>支付状态</dt><dd class="' + bs_state.style + '">' + bs_state.text + '</dd></dl>';
        html += '   <dl><dt>支付时间</dt><dd>' + returnTime(financePayFlowStatement.bs_payTime) + '</dd></dl>';
        if (financePayFlowStatement.bs_type == 4) {
            html += '   <dl><dt>合同关联</dt><dd class="' + is_relation.style + '">' + is_relation.text + '</dd></dl>';
        }
        html += '   <dl style="margin-top: 6px;">';
        html += '       <dt>关联账单</dt>';
        html += '       <dd>';
        html += '           <table style="width: 600px;">';
        html += '               <tr style="background: #f5f8fa;line-height: 36px;">';
        html += '                   <th>账单期数</th>';
        html += '                   <th>账单类型</th>';
        html += '                   <th>应支付金额</th>';
        html += '                   <th>账单状态</th>';
        html += '                   <th>应支付日期</th>';
        html += '               </tr>';
        $.each(financeBillList, function (index, data) {
            var bcb_state = returnBillState(data.bcb_state);
            html += '<tr style="line-height: 36px;">';
            html += '    <td>' + returnNullReplace(data.bcb_cycle, '--') + '</td>';
            html += '    <td>' + returnBillType(data.bcb_type) + '</td>';
            if (financePayFlowStatement.bs_type == 1 && data.bcb_type == 18) {
                html += '<td class="error">抵扣' + returnMoney(data.bcb_repayment, 2) + '</td>';
            } else {
                html += '<td class="' + (data.bcb_balPay == 0 ? "ok" : "error") + '">' + (data.bcb_balPay == 0 ? "+" : "-") + returnMoney(data.bcb_repayment, 2) + '</td>';
            }
            html += '    <td class="' + bcb_state.style + '">' + bcb_state.text + '</td>';
            html += '    <td>' + returnDate(data.bcb_repaymentDate) + '</td>';
            html += '</tr>';
        });
        html += '           </table>';
        html += '       </dd>';
        html += '   </dl>';
        html += '</div>';
        html += '';
        html += '<!--账务核销-->';
        html += '<div class="popup-list">';
        html += '   <dl>';
        html += '       <dt>账务核销</dt>';
        html += '       <dd class="' + bs_verifyState.style + '">' + bs_verifyState.text + '</dd>';
        if (is_transPay) {
            if (financePayFlowStatement.bs_verifyState == 1) {
                html += '   <dd><button name="validState" class="popup-result-option next-border-color" ><i class="fa-cny" style="margin-right: 4px;"></i>核销</button></dd>';
            }
            if (financePayFlowStatement.bs_verifyState == 2) {
                html += '   <dd>';
                html += '       <button name="validState" class="popup-result-option error-border-color" ><i class="fa-cny" style="margin-right: 4px;"></i>反核销</button>';
                html += '       <button name="queryValidRecord" class="popup-result-option next-border-color" style="margin-left: 10px;"><i class="fa-search" style="margin-right: 4px;"></i>查看</button>';
                html += '   </dd>';
            }
        } else {
            if (financePayFlowStatement.bs_verifyState == 2) {
                html += '   <dd>';
                html += '       <button name="queryValidRecord" class="popup-result-option next-border-color" style="margin-left: 10px;"><i class="fa-search" style="margin-right: 4px;"></i>查看</button>';
                html += '   </dd>';
            }
        }
        html += '   </dl>';
        html += '   <dl class="validRecordBox" style="display: none;margin-top: 10px;">';
        html += '       <dt>核销记录</dt>';
        html += '       <dd>';
        html += '           <table style="width: 600px;line-height: 36px;">';
        html += '               <tr style="background: #f5f8fa;">';
        html += '                   <th style="width: 120px;">核销时间</th>';
        html += '                   <th>核销人员</th>';
        html += '                   <th>核销描述</th>';
        html += '               </tr>';
        $.each(flowStatementValidRecordList, function (index, data) {
            html += '<tr>';
            html += '    <td>' + returnTime(data.pvf_validTime) + '</td>';
            html += '    <td>' + returnValue(data.pvf_em_name) + '</td>';
            html += '    <td>' + returnValue(data.pvf_content) + '</td>';
            html += '</tr>';
        });
        html += '           </table>';
        html += '       </dd>';
        html += '   </dl>';
        // html += '   <dl><dt>核销人</dt><dd>' + returnValue(financePayFlowStatement.bs_verifier_name) + "-" + returnValue(financePayFlowStatement.bs_verifier_phone) + '</dd></dl>';
        // html += '   <dl><dt>核销时间</dt><dd>' + returnTime(financePayFlowStatement.bs_verifyTime) + '</dd></dl>';
        html += '</div>';
        html += '';
        box.html(html);

        // 【事件】查账
        box.find("[name=queryPayState]").off().on("click", function () {
            popup_query_bill_state(this, financePayFlowStatement);
            $(this).attr("disabled", "disabled");
        });

        // 【事件】核销
        box.find("[name=validState]").off().on("click", function () {
            popup_valid_state(this, financePayFlowStatement);
            $(this).attr("disabled", "disabled");
        });

        // 【事件】添加备注
        box.find("[name=addRemark]").off().on("click", function () {
            popup_add_remarks(this, financePayFlowStatement);
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
 * @param financePayFlowStatement
 */
function popup_add_remarks(obj, financePayFlowStatement) {
    var p_box = $(obj).parents(".popup-list");
    p_box.find(".popup-list-result").remove();
    p_box.append(
        '<div class="popup-list-result">' +
        '   <div class="popup-list-result-title">添加备注<button class="popup-list-result-close error"><i class="fa-remove"></i></button></div>' +
        '   <div class="popup-list-result-form">' +
        '       <dl>' +
        '           <dt style="width: 100%;"><textarea class="popup-textarea" name="popupTaRemark">' + returnValue(financePayFlowStatement.bs_remark) + '</textarea></dt>' +
        '       </dl>' +
        '       <dl>' +
        '           <dt>' +
        '               <button class="popup-list-result-confirm next-bg" name="addRemarkConfirm">提交</button>' +
        '               <button class="popup-list-result-close error-bg">取消</button>' +
        '           </dt>' +
        '       </dl>' +
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
            url: "/financeManage/updatePayFlowStatementInfo",
            data: {
                bs_serialNumber: financePayFlowStatement.bs_serialNumber,
                bs_remark: p_box.find("[name=popupTaRemark]").val().trim()
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
 * @param financePayFlowStatement
 */
function popup_query_bill_state(obj, financePayFlowStatement) {
    var p_box = $(obj).parents(".popup-list");
    p_box.find(".popup-list-result").remove();
    p_box.append(
        '<div class="popup-list-result">' +
        '   <div class="popup-list-result-title">查账结果<button class="popup-list-result-close error"><i class="fa-remove"></i></button></div>' +
        '   <div class="popup-list-result-content"><div class="error">数据加载中</div></div>' +
        '</div>');

    // 加载数据
    popup_query_bill(p_box, financePayFlowStatement);

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
 * @param financePayFlowStatement
 */
function popup_query_bill(p_box, financePayFlowStatement) {
    var bs_payType = {style: "", text: returnValue(financePayFlowStatement.bs_payType)};

    $.ajax({
        type: "POST",
        url: "/financeManage/queryPayFlowStatementPayState",
        data: {
            bs_orderNumber: financePayFlowStatement.bs_orderNumber
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code != 200) {
            p_box.find(".popup-list-result-content").html('<div class="error" style="font-size: 14px;">' + result.msg + '</div>');
            return;
        }
        // if (isEmpty(result.data.trade_no)) {
        //     p_box.find(".popup-list-result-content").html('<div class="error" style="font-size: 14px;">' + returnValue(result.data.trade_state) + '</div>');
        //     return;
        // }

        var html = '';
        html += '<dl>';
        html += '    <dt>交易流水号</dt>';
        html += '    <dd title="'+ returnValue(result.data.trade_no) +'">' + returnValue(result.data.trade_no) + '</dd>';
        html += '</dl>';
        html += '<dl>';
        html += '    <dt>支付方式</dt>';
        html += '    <dd class="' + bs_payType.style + '">' + bs_payType.text + '</dd>';
        html += '</dl>';
        html += '<dl>';
        html += '    <dt>交易状态</dt>';
        html += '    <dd>' + returnValue(result.data.trade_state) + '</dd>';
        html += '</dl>';
        html += '<dl>';
        html += '    <dt>支付金额</dt>';
        html += '    <dd>' + returnMoney(result.data.trade_money, 2) + '</dd>';
        html += '</dl>';
        if (!isEmpty(result.data.trade_refund_money)) {
            html += '<dl>';
            html += '    <dt>退款金额</dt>';
            html += '    <dd>' + returnMoney(result.data.trade_refund_money, 2) + '</dd>';
            html += '</dl>';
        }
        if (!isEmpty(result.data.trade_refund_time)) {
            html += '<dl>';
            html += '    <dt>退款时间</dt>';
            html += '    <dd>' + returnTime(result.data.trade_refund_time) + '</dd>';
            html += '</dl>';
        } else {
            html += '<dl>';
            html += '    <dt>支付时间</dt>';
            html += '    <dd>' + returnTime(result.data.trade_time) + '</dd>';
            html += '</dl>';
        }
        p_box.find(".popup-list-result-content").html(html);
    });
}

/**
 * 弹出层-核销
 *
 * @param obj
 * @param financePayFlowStatement
 */
function popup_valid_state(obj, financePayFlowStatement) {
    var p_box = $(obj).parents(".popup-list");
    p_box.find(".popup-list-result").remove();
    p_box.append(
        '<div class="popup-list-result">' +
        '   <div class="popup-list-result-title">账务核销<button class="popup-list-result-close error"><i class="fa-remove"></i></button></div>' +
        '   <div class="popup-list-result-form">' +
        '       <input type="hidden" name="pvf_validTime" value="' + returnTime(new Date()) + '">' +
        '       <dl style="border-bottom: 1px solid #dddddd">' +
        '           <dt>查账结果</dt>' +
        '           <dd>' +
        '               <div class="popup-list-result-content" style="padding: 0"><div class="error">数据加载中</div></div>' +
        '           </dd>' +
        '       </dl>' +
        '       <dl>' +
        '           <dt>核销金额</dt>' +
        '           <dd>' + returnMoney(financePayFlowStatement.bs_money, 2) + '</dd>' +
        '       </dl>' +
        '       <dl>' +
        '           <dt>核销人员</dt>' +
        '           <dd>' + $.cookie("em_name") + '</dd>' +
        '       </dl>' +
        '       <dl>' +
        '           <dt>核销时间</dt>' +
        '           <dd>' + returnTime(new Date()) + '</dd>' +
        '       </dl>' +
        '       <dl style="padding-top: 10px;">' +
        '           <dt></dt>' +
        '           <dd>' +
        '               <button class="popup-list-result-confirm next-bg" name="validStateConfirm">核销</button>' +
        '               <button class="popup-list-result-close error-bg">取消</button>' +
        '           </dd>' +
        '       </dl>' +
        '   </div>' +
        '</div>');

    // 加载数据
    popup_query_bill(p_box, financePayFlowStatement);

    // 【事件】关闭结果
    p_box.find(".popup-list-result-close").off().on("click", function () {
        $(this).parents(".popup-list-result").hide("fast", function () {
            this.remove();
            $(obj).removeAttr("disabled");
        })
    });

    // 【事件】核销
    p_box.find("[name=validStateConfirm]").off().on("click", function () {
        if (confirm("确定核销该笔流水吗?")) {
            $.ajax({
                type: "POST",
                url: "/financeManage/updatePayFlowStatementForPayState",
                data: {
                    payFlowStatementValidRecordStr: JSON.stringify({
                        bs_serialNumber: financePayFlowStatement.bs_serialNumber,
                        pvf_content: "核销金额" + returnMoney(financePayFlowStatement.bs_money, 2) + "元",
                        pvf_em_id: $.cookie("em_id"),
                        pvf_validTime: p_box.find("[name=pvf_validTime]").val()
                    })
                },
                dataType: "json"
            }).done(function (result) {
                if (result.code != 200) {
                    $.hint.tip("123");
                    alert(result.msg);
                    return;
                }
                $.popupRefresh();
            });
        }
    });
}