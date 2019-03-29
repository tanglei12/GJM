var billTypeList = {};
var billList = null;
$(function () {
    load_data();
});

/**
 * 加载数据
 */
function load_data() {

    // 时间
    var filterDateParams = [
        {name: "创建时间", value: "bs_createTime", sort: 'DESC'},
        {name: "到期时间", value: "bco_invalidTime", sort: 'DESC'},
        {name: "支付时间", value: "bs_payTime", sort: 'DESC'}
    ];

    // 标题
    var listParams = [
        {text: "商户订单号", name: "bs_orderNumber", param: "", func: {type: "onclick", name: "$.table.popupOpen(this)"}},
        {text: "小区房号", name: "house_address", param: ""},
        {text: "客户信息", name: "bs_payerName{/}payer_phone", param: ""},
        {text: "支付金额", name: "bs_money", param: "float"},
        {text: "支付方式", name: "bs_payType", param: ""},
        {text: "支付状态", name: "bs_state", param: "returnPayStatementState"},
        {text: "交易状态", name: "bs_flowState", param: "returnPayFlowStatementTransState"},
        {text: "是否关联", name: "contractObject_code", param: "returnContractObjectState"},
        {text: "经办人", name: "bs_handler_name", param: ""},
        // {text: "预留天数", name: "bco_day", param: ""},
        {text: "创建时间", name: "bs_createTime", param: "time"},
        {text: "到期时间", name: "bco_invalidTime", param: "time"}
    ];

    // 选项框
    var filterBars = [
        {name: "bs_state", type: "select", selected: "2", data: "returnPayStatementState"},
        {name: "bs_flowState", type: "select", selected: "0", data: "returnPayFlowStatementTransState"}
    ];

    // 加载
    $.table({
        filterDateParams: filterDateParams,
        filterBars: filterBars,
        listParams: listParams,
        filterWhere: true,
        ajaxParams: {
            url: "/financeManage/queryPayFlowStatementPageList",
            data: {
                bs_type: 4
            }
        },
        ajaxDone: function (h) {
            // h.find(".list-content-item").each(function () {
            //     var data = $(this).find("[name=table-checkbox]").data("data");
            //     var createTime = returnNullReplace(returnDate(data.bco_createTime), 'yyyy-MM-dd');
            //     var invalidTime = returnNullReplace(returnDate(data.bco_invalidTime), 'yyyy-MM-dd');
            //     $(this).find("[name=bco_day]").append("<span class='error'>" + returnDay(createTime, invalidTime) + "天</span>");
            //     $(this).find("[name=bs_exprieTime]").append(returnTime(data.bco_createTime + returnDay(createTime, invalidTime) * 24 * 60 * 60 * 1000));
            // });
        },
        popup: {
            result: function (box, _data) {
                load_popup(box, _data);
            }
        }
    });

    //订单类型
    getBillTypeList();
}

/**
 * 加载弹出层
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
        // 违约记录
        var financeResultList = result.data.financeResultList;
        // 合同信息
        var contractInfo = result.data.contractObject;
        // 合同主体
        var contractBody = result.data.contractBody;
        // 客户信息
        var customers = result.data.customers;
        // 房源信息
        var houseInfo = result.data.houseInfo;
        // 合约信息
        var cancelInfo = result.data.cancelObject;

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
        // 是否交易关闭
        var is_transClose = financePayFlowStatement.bs_state === 3;
        //当前时间
        var date = getCurrentTime();
        //相差天数
        var day = returnDay(returnDate(date), returnDate(_data.bco_invalidTime));

        var html = '';
        html += '<div class="popup-list">';
        html += '   <dl>';
        html += '       <dt style="font-size: 16px;font-weight: bold;">[' + bs_type.text + '] ' + returnValue(financePayFlowStatement.bs_payerName) + '-' + returnValue(financePayFlowStatement.payer_phone) + '</dt>';
        html += '   </dl>';
        html += '</div>';
        html += '<div class="popup-list">';
        html += '   <dl id="houseDl"><dt>小区房号</dt><dd><label class="next" style="cursor: pointer;" id="addressLabel">' + returnValue(financePayFlowStatement.house_address) + '</label></dd><dd><button name="queryHouseInfo" class="popup-result-option next-bg"><i class="fa-search" style="margin-right: 4px;"></i>房源</button></dd></dl>';
        html += '   <dl>';
        html += '       <dt>支付方式</dt>';
        html += '       <dd class="' + bs_payType.style + '" style="padding-right: 0;">' + bs_payType.text + '</dd>';
        html += '       <dd class="' + bs_payType.style + '" style="padding-left: 0;">&nbsp;-&nbsp;' + bs_source.text + '</dd>';
        html += '   </dl>';
        html += '   <dl><dt>支付金额</dt>';
        html += '       <dd class="' + (financePayFlowStatement.bs_balPay == 1 ? "ok" : "error") + '">' + (financePayFlowStatement.bs_balPay == 1 ? "+" : "-") + returnMoney(financePayFlowStatement.bs_money, 2) + '</dd>';
        if (!isEmpty(financePayFlowStatement.bs_discount)) {
            html += '   <dd class="error" style="padding-left: 0;">[抵扣' + returnMoney(financePayFlowStatement.bs_discount, 2) + ']</dd>';
        }

        html += '   </dl>';
        if (!isEmpty(financePayFlowStatement.bs_refund)) {
            html += '   <dl><dt>退款金额</dt><dd>' + returnMoney(financePayFlowStatement.bs_refund, 2) + '</dd></dl>';
        }
        html += '   <dl><dt>交易状态</dt><dd class="' + bs_flowState.style + '">' + bs_flowState.text + '</dd></dl>';
        html += '   <dl><dt>经办人</dt><dd>' + returnValue(financePayFlowStatement.bs_handler_name) + " - " + returnValue(financePayFlowStatement.bs_handler_phone) + '</dd></dl>';
        html += '   <dl><dt>创建时间</dt><dd>' + returnTime(financePayFlowStatement.bs_createTime) + '</dd></dl>';
        if (bs_flowState.text == '已支付') {
            html += '   <dl><dt>到期时间</dt><dd>' + returnTime(financePayFlowStatement.bs_createTime + 24 * 60 * 60 * 1000) + '</dd>';
            html += '<i style="font-style:normal;color: red;">' + "&nbsp;&nbsp;[还剩" + day + "天]" + '</i>';
        } else if (bs_flowState.text == '已关闭') {
            html += '   <dl><dt>到期时间</dt><dd style="text-decoration: line-through;">' + returnTime(financePayFlowStatement.bs_createTime + 24 * 60 * 60 * 1000) + '</dd>';
        }
        html += '    </dl>';
        html += '   <dl>';
        html += '       <dt>预留天数</dt>';
        html += '       <dd class="error">' + returnDay(financePayFlowStatement.bs_createTime, _data.bco_invalidTime) + '天</dd>';
        html += '   </dl>';
        html += '   <dl>';
        html += '      <dt>备注</dt>';
        html += '      <dd class="error">' + returnNullReplace(financePayFlowStatement.bs_remark, "-") + '</dd>';
        html += '   </dl>';
        html += '</div>';
        html += '<div class="popup-list">';
        html += '   <dl id="orderDl">';
        html += '      <dt>商户订单号</dt>';
        html += '      <dd>' + financePayFlowStatement.bs_orderNumber + '</dd>';
        if (is_queryBill) {
            html += '  <dd><button name="queryPayState" class="popup-result-option next-bg"><i class="fa-search" style="margin-right: 4px;"></i>查账</button></dd>';
        }
        html += '   </dl>';
        html += '   <dl><dt>支付状态</dt><dd class="' + bs_state.style + '">' + bs_state.text + '</dd></dl>';
        html += '   <dl><dt>支付时间</dt><dd>' + returnNullReplace(returnTime(financePayFlowStatement.bs_payTime), '-') + '</dd></dl>';
        if (financePayFlowStatement.bs_type == 4) {
            html += '   <dl id="contractDl"><dt>合同关联</dt><dd class="' + is_relation.style + '">' + is_relation.text + '</dd>';
            if (is_relation.text == '已关联') {
                html += '<dd><button name="queryContractInfo" class="popup-result-option next-border-color"><i class="fa-search" style="margin-right: 4px;"></i>合同</button></dd>';
                html += '<dd><button name="queryBillInfo" class="popup-result-option next-border-color"><i class="fa-search" style="margin-right: 4px;"></i>账单</button></dd>';
            }
            html += '</dl>';
        }
        // html += '</div>';
        // html += '<div class="popup-list" style="border-top: none;">';
        html += '   <dl>';
        html += '       <dt>流水账单</dt>';
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
            html += '    <td>' + returnNullReplace(data.bcb_cycle, '-') + '</td>';
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
        if (is_relation.text == '未关联') {
            html += '<div class="popup-list">';
            html += '   <dl>';
            html += '       <dt>违约处理</dt>';
            if (financeResultList == null || financeResultList.length === 0) {
                html += '   <dd><button name="payFlowStatementHandle" class="popup-result-option next-border-color">违约处理</button></dd>';
            } else {
                html += '       <dd>';
                html += '           <table style="width: 600px;line-height: 36px;">';
                html += '               <tr style="background: #f5f8fa;">';
                html += '                   <th>处理结果</th>';
                html += '                   <th>处理描述</th>';
                html += '                   <th>经办人</th>';
                html += '                   <th>处理时间</th>';
                html += '               </tr>';
                $.each(financeResultList, function (index, data) {
                    var fr_state = {};
                    fr_state.style = data.fr_state === 1 ? "error" : "next";
                    fr_state.text = data.fr_state === 1 ? "已退定金" : "违约申请";
                    fr_state.content = data.fr_state === 1 ? "；申请退款金额" + returnMoney(data.fr_money, 2) + "元" : "";

                    html += '<tr>';
                    html += '   <td class="' + fr_state.style + '">' + fr_state.text + '</td>';
                    html += '   <td>' + returnValue(data.fr_content) + fr_state.content + '</td>';
                    html += '   <td>' + returnValue(data.em_name) + '</td>';
                    html += '   <td>' + returnTime(data.fr_time) + '</td>';
                    html += '</tr>';
                });
                html += '           </table>';
                html += '       </dd>';
            }
            html += '   </dl>';
            html += '</div>';
        }
        box.html(html);

        // 【事件】查账
        box.find("[name=queryPayState]").off().on("click", function () {
            popup_query_bill_state(this, financePayFlowStatement, bs_payType);
            $(this).attr("disabled", "disabled");
        });

        // 【事件】合同
        box.find("[name=queryContractInfo]").off().on("click", function () {
            popup_query_contract_info(this, result.data, 'contract');
            $(this).attr("disabled", "disabled");
            box.find("[name=queryBillInfo]").removeAttr("disabled");
        });

        // 【事件】账单
        box.find("[name=queryBillInfo]").off().on("click", function () {
            popup_query_contract_info(this, result.data, 'bill');
            $(this).attr("disabled", "disabled");
            box.find("[name=queryContractInfo]").removeAttr("disabled");
        });

        // 【事件】房源
        box.find("[name=queryHouseInfo]").off().on("click", function () {
            popup_query_house_info(this, result.data);
            $(this).attr("disabled", "disabled");
        });

        // 【事件】违约处理
        box.find("[name=payFlowStatementHandle]").off().on("click", function () {
            popip_payFlowStatementHandle(this, financePayFlowStatement);
            $(this).attr("disabled", "disabled");
        });

        // 【事件】跳转房屋
        box.find("#addressLabel").off().on("click", function () {
            window.parent.href_mo("/houseLibrary/jumpHouseInfo?hi_code=" + financePayFlowStatement.hi_code, "房屋信息", "房屋信息");
        });

    });
}

/**
 * 弹出层-查账
 * @param obj
 * @param financePayFlowStatement
 * @param bs_payType
 */
function popup_query_bill_state(obj, financePayFlowStatement, bs_payType) {
    var p_box = $(obj).parents("dl#orderDl");
    p_box.find("#bill-result").remove();
    p_box.after(
        '<div class="popup-list-result" id="bill-result">' +
        '   <div class="popup-list-result-title">查账结果<button class="popup-list-result-close error" id="ordBtn"><i class="fa-remove"></i></button></div>' +
        '   <div class="popup-list-result-content" id="orderDiv"><div class="error">数据加载中</div></div>' +
        '</div>');

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
        var html = '';
        html += '<dl>';
        html += '    <dt>交易流水号</dt>';
        html += '    <dd>' + returnValue(result.data.trade_no) + '</dd>';
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
        p_box.parent().find("#orderDiv").html(html);
    });

    // 【事件】关闭结果
    p_box.parent().find("#ordBtn").off().on("click", function () {
        $(this).parents(".popup-list-result").hide("fast", function () {
            this.remove();
            $("[name=queryPayState]").removeAttr("disabled");
        });
    });
}

/**
 * 弹出层-违约处理
 * @param obj
 * @param financePayFlowStatement
 */
function popip_payFlowStatementHandle(obj, financePayFlowStatement) {
    var p_box = $(obj).parents(".popup-list");
    p_box.find(".popup-list-result").remove();
    p_box.append(
        '<div class="popup-list-result">' +
        '   <div class="popup-list-result-title">违约处理<button class="popup-list-result-close error"><i class="fa-remove"></i></button></div>' +
        '   <div class="popup-list-result-form"><div class="error">数据加载中</div></div>' +
        '</div>');

    var html = '';
    html += '<dl>';
    html += '    <dt>是否退款</dt>';
    html += '    <dd>';
    html += '       <input class="custom-switch-check" id="isRefund" type="checkbox">';
    html += '       <label class="custom-switch-label" data-on="退款" data-off="不退款" for="isRefund"></label>';
    html += '    </dd>';
    html += '</dl>';
    html += '<dl class="refund-money-box" style="display: none">';
    html += '    <dt>退款金额</dt>';
    html += '    <dd>';
    html += '       <input class="popup-input money" name="refund-money" maxlength="11" placeholder="退款金额">';
    html += '       <span class="error" style="padding-left: 10px;">退款金额不能超过' + returnMoney(financePayFlowStatement.bs_money, 2) + '元</span>';
    html += '    </dd>';
    html += '</dl>';
    html += '<dl>';
    html += '    <dt>违约描述</dt>';
    html += '    <dd style="display: table-cell;">';
    html += '       <div id="breakDiv" style="width: 50%;height: 40px;">';
    html += '           <label class="common-borderbox" style="margin-bottom: 5px;"><input type="radio" class="edit" name="breakType" value="主动违约">主动违约</label>';
    html += '           <label class="common-borderbox" style="margin-bottom: 5px;"><input type="radio" class="edit" name="breakType" value="被动违约">被动违约</label>';
    html += '           <label class="common-borderbox" style="margin-bottom: 5px;"><input type="radio" class="edit" name="breakType" value="超期违约">超期违约</label>';
    html += '       </div>';
    html += '       <textarea class="popup-textarea" name="refund-desc" maxlength="120"></textarea>';
    html += '    </dd>';
    html += '</dl>';
    html += '<dl>';
    html += '    <dt></dt>';
    html += '    <dd>';
    html += '       <button class="popup-list-result-confirm next-bg" name="refundConfirm">提交</button>';
    html += '       <button class="popup-list-result-close error-bg">取消</button>';
    html += '    </dd>';
    html += '</dl>';
    p_box.find(".popup-list-result-form").html(html);

    // 【事件】关闭结果
    p_box.find(".popup-list-result-close").off().on("click", function () {
        $(this).parents(".popup-list-result").hide("fast", function () {
            this.remove();
            $(obj).removeAttr("disabled");
        });
    });

    // 【事件】是否退款
    p_box.find("#isRefund").off().on("change", function () {
        if ($(this).is(":checked")) {
            p_box.find(".refund-money-box").show("fast");
            p_box.find("[name=refund-money]").focus();
        } else {
            p_box.find(".refund-money-box").hide("fast");
            p_box.find("[name=refund-money]").val("");
        }
    });

    // 【事件】提交违约
    p_box.find("[name=refundConfirm]").off().on("click", function () {
        var breakType = $("[name=breakType]:checked").val();
        if (isEmpty(breakType)) {
            p_box.find("#breakDiv").msg("请选择违约类型");
            return;
        }
        var data = {};
        data.fr_bsId = financePayFlowStatement.bs_id;  //流水记录id
        // 状态
        data.fr_state = $("#isRefund").is(":checked") ? 1 : 2;
        if ($("#isRefund").is(":checked")) {
            // 退款金额
            data.fr_money = p_box.find("[name=refund-money]").val();
            if (isEmpty(data.fr_money)) {
                p_box.find("[name=refund-money]").msg("请填写退款金额");
                return;
            }
            if (returnFloat(data.fr_money) <= 0) {
                p_box.find("[name=refund-money]").msg("退款金额不能小于等于0");
                return;
            }
            if (returnFloat(data.fr_money) > returnFloat(financePayFlowStatement.bs_money)) {
                p_box.find("[name=refund-money]").msg("退款金额不能超出支付金额");
                return;
            }
        }
        // 描述
        data.fr_content = "【" + breakType + "】" + p_box.find("[name=refund-desc]").val().trim();
        if (isEmpty(data.fr_content)) {
            p_box.find("[name=refund-desc]").msg("请填写违约描述");
            return;
        }

        $.hint.confirm("确定提交违约处理吗？", function () {
            $.ajax({
                type: "POST",
                url: "/financeManage/submitFinanceResult",
                data: {
                    result: JSON.stringify(data)
                },
                dataType: "json",
                beforeSend: function () {

                }
            }).done(function (result) {
                if (result.code != 200) return;
                $.popupRefresh();
            });
        });
    });
}

/**
 * 弹出层-合同
 * @param obj
 * @param financePayFlowStatement
 * @param bs_payType
 */
function popup_query_contract_info(obj, data, type) {
    // 合同信息
    var contractInfo = data.contractObject;
    // 合同主体
    var contractBody = data.contractBody;
    // 支付流水
    var financePayFlowStatement = data.financePayFlowStatement;
    // 客户信息
    var customers = data.customers;

    // var p_box = $(obj).parents(".popup-list");
    var p_box = $(obj).parents("dl#contractDl");
    var _hash = window.location.hash;
    var startToEnd = contractBody.contractBody_StartTOEnd.split("~");
    var _state = returnContractState(contractInfo.contractObject_State);
    var _optionState = returnContractOptionState(contractInfo.contractObject_OptionState);
    p_box.parent().find("#contract-result").remove();
    p_box.after(
        '<div class="popup-list-result" style="width: 1032px;" id="contract-result">' +
        '   <div class="popup-list-result-title" style="padding: 0px;">' +
        '<div class="sub-title" id="other-title">' +
        '<ul class="title-nav">' +
        '<li class="'+(type == "contract" ? "visited" : "link")+'" data-hash="#contract_info">合同信息</li>' +
        '<li class="'+(type == "bill" ? "visited" : "link")+'" data-hash="#bill_info">账单信息</li>' +
        '</ul>' +
        '</div>' +
        '<button class="popup-list-result-close error" id="conBtn"><i class="fa-remove"></i></button></div>' +
        '   <div class="popup-list-result-content" id="contractDiv"><div class="error">数据加载中</div></div>' +
        '</div>');

    var html = '';

    $.ajax({
        type: "POST",
        url: "/financeManage/selectBillList",
        data: {
            contractObject_code: contractInfo.contractObject_Code
        },
        dataType: "json"
    }).done(function (result) {

        html += '<div id="contract_inf" style="font-size: 14px; '+ (type != 'contract' ? 'display:none;' : '') + '">';
        html += '<table>';
        html += '<tr>';
        html += '<td><span>';
        html += '<label>合同编号</label>';
        html += '</span></td>';
        html += '<td colspan="3">' + '<label><strong class="error">No.' + contractInfo.contractObject_No + '</strong></label>' + '</td>';
        html += '</tr>';
        html += '<tr>';
        $.each(customers, function (index, data) {
            if (data.crc_role == 0) {
                html += '<td><span>';
                html += '<label>签约客户</label></span></td>';
                html += '<td><label>' + data.cc_name + ' - ' + data.ccp_phone + ' - ' + (data.cc_sex == 0 ? "女" : (data.cc_sex == 1 ? "男" : "未知")) + '</label></td>';
                html += '<td><span style="padding-left: 30px;">';
                html += '<label>身份证</label>';
                html += '</span></td>';
                html += '<td><label>' + data.cc_cardNum + '</label></td>';
            }
        });
        html += '</tr>';
        html += '<tr>';
        html += '<td><span>';
        html += '<label>合同期限</label>';
        html += '</span></td>';
        html += '<td><label>' + contractBody.contractBody_StartTOEnd + '(' + returnBusinessYMD(startToEnd[0], startToEnd[1]) + ')' + '</label></td>';
        html += '<td><span style="padding-left: 30px;">';
        html += '<label>租赁价格</label>';
        html += '</span></td>';
        html += '<td><label>' + '<strong class="error">' + contractBody.contractBody_Rent + '</strong>' + '元/月 (' + contractBody.contractBody_PayStyle + ': ' + contractBody.contractBody_PayType + ')' + '</label></td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td><span>';
        html += '<label>保证金</label>';
        html += '</span></td>';
        html += '<td><label>' + contractBody.contractBody_Pay + ' 元' + '</label></td>';
        html += '<td><span style="padding-left: 30px;">';
        html += '<label>服务费</label>';
        html += '</span></td>';
        html += '<td><label>' + contractBody.contractBody_Service + ' 元' + '</label></td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td><span>';
        html += '<label>主管家</label>';
        html += '</span></td>';
        html += '<td><label>' + contractBody.contractBody_GjName + ' - ' + contractBody.contractBody_GjPhone + '</label></td>';
        html += '<td><span style="padding-left: 30px;">';
        html += '<label>合同状态</label>';
        html += '</span></td>';
        html += '<td>' + '<label class="' + _state.style + '">' + _state.text + '</label>&nbsp;-&nbsp;<label class="' + _optionState.color + '">' + _optionState.title + '</label>' + '</td>';
        html += '</tr>';
        html += '</table>';
        html += '</div>';
        if (result.msg != "success") {
            $("#other-content").html("没有数据");
            return;
        }
        // $.each(result.financeBillVoList, function (index, data) {
        var contractOrder = result.order;
        var contractBillList = result.list;
        var payStating = "";
        if (contractInfo.contractObject_Type == "托管合同") {
            contract_type = "托管订单";
            payStating = "付";
        } else {
            contract_type = "租赁订单";
            payStating = "收";
        }

        // var html = "";
        html += '<div class="div-table" id="contractBillDiv" '+(type != 'bill' ? 'style="display: none;"' : '')+' >';

        if (!isEmpty(contractOrder)) {
            html += '<div class="div-thead" style="line-height: 38px;">';
            // html += '    <div class="head-item" data-type="' + (contractOrder.bco_type == 201 ? "托管订单" : "租客订单") + '">订单号：<label class="next" id="code" style="float:none;">' + returnValue(contractOrder.bco_code) + '</label><label style="margin-left:10px;">状态：<font class="' + returnStateClass(contractOrder.bco_optionState) + '">' + returnState(contractOrder.bco_optionState, contractOrder.bco_cooperater) + '</font></label></div>';
            // html += '    <div class="head-button"><button onclick="printBill()">打印凭证</button><button onclick="addBill()">添加账单</button><button onclick="payBill(this)">支付</button><div class="payBill" style="display:none;"></div></div>';
            html += '</div>';
        }

        if (!isEmpty(contractOrder) && !isEmpty(contractBillList)) {
            var _type = (contractOrder.bco_type == 201 ? "付" : "收");

            html += '<div class="div-thead">';
            html += '    <ul>';
            html += '    	<li style="width: 54px;">#</li>';
            html += '    	<li style="width: 210px;">期数</li>';
            html += '    	<li style="width: 84px;">账单类型</li>';
            html += '    	<li style="width: 84px;">账单状态</li>';
            html += '    	<li style="width: 81px">应' + _type + '金额</li>';
            html += '    	<li style="width: 81px">实' + _type + '金额</li>';
            html += '    	<li style="width: 84px">未' + _type + '金额</li>';
            html += '    	<li style="width: 104px">约定' + _type + '款时间</li>';
            html += '    	<li style="width: auto;">备注</li>';
            html += '    	<li style="width: 125px;">操作</li>';
            html += '    </ul>';
            html += '</div>';
            html += '<div class="div-tbody ps-container ps-active-y" style="overflow-y: auto;overflow: hidden;"><table style="font-size:12px;"><tbody>';
            var tbody = "";
            var newIndex = -1;
            var dates = "";
            var money = 0;
            var titles = "";
            $.each(contractBillList, function (index, bcb) {
                if (newIndex == -1) {
                    if ((bcb.bcb_type == -1 || bcb.bcb_type == 11) && bcb.bcb_state == 2) {
                        newIndex = bcb.bcb_cycle;
                        dates = format(bcb.bcb_repaymentDate, 'yyyy-MM-dd');
                        money = (bcb.bcb_repayment - bcb.bcb_realPayment).toFixed(2);
                    }
                }
                if (newIndex != -1 && titles == "") {
                    var payStatese = "<option>请选择</option><option value='线上'>线上</option><option value='线下'>线下</option>";
                    if (payStating == "付") {
                        payStatese = "<option>请选择</option><option value='线下'>线下</option>";
                    }
                    titles += "<div class='bill-actions'>" +
                        "<label style='float:left; margin-right: 10px; font-size: 14px;'>应还款时间:" + dates + "，第<font style='color:#E74C3C; ' id='newIndex'>" + newIndex + "</font>期，应" + payStating + ":<font style='color:#E74C3C; ' id='sumMoney'>￥" + money + "</font></label>" +
                        "<label class='payType'>" + payStating + "款方式</label>" +
                        "<select class='paybank' onchange='bankTypes(this,\"" + newIndex + "\")'>" + payStatese + "</select>" +
                        "<select class='paybank' style='display:none; border-left:none;' onchange='bankType(this,\"" + newIndex + "\")'><option>请选择</option><option value='银行卡'>银行卡</option><option value='支付宝'>支付宝</option><option value='微信'>微信</option><option value='现金'>现金</option></select>" +
                        "<select class='paybankCode' style='display:none; border-left:none;'><option value='工行9976'>工行 [ 6222****9976 ]</option><option value='工行5665'>工行 [ 3100****5665 ]</option><option value='建行1787'>建行 [ 6227****1787 ]</option><option value='建行3217'>建行 [ 6236****3217 ]</option><option value='农行7879'>农行 [ 6228****7879 ]</option><option value='农行4832'>农行 [ 3106****4832 ]</option></select>" +
                        "<select class='payTypeItem' style='display:none; border-left:none;' onchange='selectVal(this)'></select>" +
                        "<input type='text' style='display:none; border-left:none;' class='payMoney' placeholder='金额' onkeyup='clearNoNumst(this)' />" +
                        "<button class='paySubmit' onclick='submitPay(this)' style='display:none; padding: 0 15px; border-radius: 0; border-top-right-radius: 3px; border-bottom-right-radius: 3px;'>" + payStating + "款</button>" +
                        "<input type='hidden' value='" + +"' />" +
                        "</div>";
                }
                // var boo = returnNumber(data.totalNumber) > 1;
                html += "<tr " + (index > 0 ? "style='display:none;'" : "") + ">" +
                    "<td data-text='bcb_cycle' style='width: 54px;'><span class='item-index' style='text-align: center;'>" + returnValue(bcb.bcb_cycle) + "</span></td>" +
                    "<td data-text='dateStartEnd' style='width: 220px;'>第" + bcb.bcb_cycle + "期 [" + format(bcb.bcb_repaymentDate, 'yyyy-MM-dd') + "~" + format(bcb.repaymentEndDate, 'yyyy-MM-dd') + "]</td>" +
                    "<td data-text='bcb_type' style='width: 84px;'>" + parseBillType(bcb.bcb_type) + "</td>" +
                    "<td data-text='bcb_state' style='width: 84px;' class='" + returnStateClass(bcb.bcb_state) + "'>" + returnState(bcb.bcb_state, bcb.bco_cooperater) + "</td>" +
                    "<td data-text='bcb_repayment' style='width: 84px;' data-money='" + returnFloat(bcb.bcb_repayment) + "'>" + returnFloat(bcb.bcb_repayment) + "</td>" +
                    "<td data-text='bcb_realPayment' style='width: 84px;'>" + returnFloat(bcb.bcb_realPayment) + "</td>" +
                    "<td data-text='bcb_balance' style='width: 84px;'>" + returnFloat(bcb.bcb_balance) + "</td>" +
                    "<td data-text='bcb_repaymentDate' style='width: 104px;'>" + format(bcb.bcb_repaymentDate, 'yyyy-MM-dd') + "</td>" +
                    "<td data-text='bcb_remarks' style='width: 124px;'>" + returnValue(bcb.bcb_remarks) + "</td>" +
                    "<td style='width: 100px;'><button class='fa-reorder' onclick='flodChildBill(this," + bcb.bcb_cycle + ")'></button></td>" +
                    "<td style='display:none;'>" + format(bcb.bcb_realPaymentDate, 'yyyy-MM-dd') + "</td>" +
                    "</tr>";
                $.each(bcb.childs, function (indext, child) {
                    html += "<tr class='childBill' data-id='" + child.bcb_id + "' data-cycle='" + bcb.bcb_cycle + "'>" +
                        "<td></td>" +
                        "<td></td>" +
                        "<td data-text='bcb_type'>" + parseBillType(child.bcb_type) + "</td>" +
                        "<td data-text='bcb_state' class='" + returnStateClass(child.bcb_state) + "'>" + returnState(child.bcb_state, child.bco_cooperater) + "</td>" +
                        "<td data-text='bcb_repayment'><input type='text' style='background: transparent;font-size: 12px;' value='" + returnFloat(child.bcb_repayment) + "' readonly='readonly' /></td>" +
                        "<td data-text='bcb_realPayment'>" + returnFloat(child.bcb_realPayment) + "</td>" +
                        "<td data-text='bcb_balance'>" + returnFloat(child.bcb_balance) + "</td>" +
                        "<td data-text='bcb_repaymentDate'>" + format(child.bcb_repaymentDate, 'yyyy-MM-dd') + "</td>" +
                        "<td data-text='bcb_remarks'><input type='text' style='background: transparent;' value='" + returnValue(child.bcb_remarks) + "' readonly='readonly' /></td>";
                    if (returnState(child.bcb_state, child.bco_cooperater) == "待还款") {
                        // html += "<td><i class='fa fa-pencil' onclick='updateBill(this)'></i></td>";
                        html += "<td></td>";
                    } else {
                        html += "<td></td>";
                    }
                    html += "</tr>";
                });
            });
            html += "<tr><td colspan='10' ><label onclick='showMore(this);' style='margin: 0px 45%;'><a href='#'>查看更多</a></label></td></tr>";
            html += '</tbody></table></div>';
        }
        html += '</div>';
        $("#other-content").html(html);
        $(".payBill").append(titles);
        $(".div-tbody").perfectScrollbar();

        $("#other-content").find("[name=option-add-bill]").click(function () {
            window.parent.parent.href_mo('/financeManage/jumpBillManage#bco_code=' + contractOrder.bco_code + '&bco_type=' + contractOrder.bco_type, '账单管理', '账单管理');
        });

        // if(type == 'contract'){
        //     $("#contract_inf").show();
        //     $("#contractBillDiv").hide();
        // } else if(type == 'bill'){
        //     $("#contract_inf").hide();
        //     $("#contractBillDiv").show();
        // }
        // billList.resolve();
        // });

        p_box.parent().find("#contractDiv").html(html);
    });

    // 【事件】关闭结果
    p_box.parent().find("#conBtn").off().on("click", function () {
        $(this).parents(".popup-list-result").hide("fast", function () {
            this.remove();
            $("[name=queryContractInfo]").removeAttr("disabled");
            $("[name=queryBillInfo]").removeAttr("disabled");
        });
    });

    // 绑定点击事件
    $("#other-title .link,#other-title .visited").live("click", function () {
        window.location.href = window.location.href.split("#", 1) + $(this).attr("data-hash");
        if ($(this).text() == '合同信息') {
            $("#contract_inf").show();
            $("#contractBillDiv").hide();
            $(".title-nav li").eq(0).attr("class", "visited");
            $(".title-nav li").eq(1).attr("class", "link");
        } else if ($(this).text() == '账单信息') {
            $("#contract_inf").hide();
            $("#contractBillDiv").show();
            $(".title-nav li").eq(0).attr("class", "link");
            $(".title-nav li").eq(1).attr("class", "visited");
        }
    });
}

/**
 * 弹出层-房源
 * @param obj
 * @param financePayFlowStatement
 * @param houseInfo
 */
function popup_query_house_info(obj, data) {
    // 支付流水
    var financePayFlowStatement = data.financePayFlowStatement;
    // 合约信息
    var cancelInfo = data.cancelObject || "";
    // 房源信息
    var houseInfo = data.houseInfo;

    // 合同操作状态
    var _OptionState = returnContractOptionState(data.contractObject.contractObject_OptionState);
    if (!isEmpty(data.cco_code) && data.contractObject.cco_state != '取消') {
        _OptionState.color = 'next';
        _OptionState.title = returnValue(data.cco_applicationType == "退租" ? "强退" : data.cco_applicationType) + returnValue(data.cco_state);
    }

    // var p_box = $(obj).parents(".popup-list");
    var p_box = $(obj).parents("dl#houseDl");
    p_box.parent().find("#house-result").remove();
    p_box.after(
        '<div class="popup-list-result" id="house-result">' +
        '   <div class="popup-list-result-title">房源信息' + '<label style="position: absolute;right: 45px;font-weight: 500;">房源编号：<label class="next">' + houseInfo.hi_code + '</label>' + '招租状态：<label class="' + returnHouseForRentState(houseInfo.hi_forRentState).style + '">' + returnHouseForRentState(houseInfo.hi_forRentState)._title + '</label></label>' + '<button class="popup-list-result-close error" id="houBtn"><i class="fa-remove"></i></button></div>' +
        '   <div class="popup-list-result-content" id="houseDiv"><div class="error">数据加载中</div></div>' +
        '</div>');

    var html = '';
    html += '<div id="house_inf" style="font-size: 14px;">';
    html += '<table style="font-size: 14px;">';
    // html += '<tr>';
    // html += '<td><span>';
    // html += '<label>房源编号</label>';
    // html += '</span></td>';
    // html += '<td>' + '<label class="next">' + houseInfo.hi_code + '</label>' + '</td>';
    // html += '<td><span style="padding-left: 30px;">';
    // html += '<label>招租状态</label>';
    // html += '</span></td>';
    // html += '<td>' + '<label class="' + returnHouseForRentState(houseInfo.hi_forRentState)._class + '">' + returnHouseForRentState(houseInfo.hi_forRentState)._title + '</label>' + '</td>';
    // html += '</tr>';
    html += '<tr>';
    html += '<td><span>';
    html += '<label>产权地址</label>';
    html += '</span></td>';
    html += '<td colspan="3">' + '<label>' + houseInfo.he_address + '</label>' + '</td>';
    html += '</tr>';
    html += '<tr>';
    html += '<td><span>';
    html += '<label>房屋户型</label>';
    html += '</span></td>';
    html += '<td><label>' + houseInfo.hi_houseS + '室' + houseInfo.hi_houseT + '厅' + houseInfo.hi_houseW + '卫' + '</label></td>';
    html += '<td><span style="padding-left: 30px;">';
    html += '<label>房屋面积</label>';
    html += '</span></td>';
    html += '<td><label>' + houseInfo.hi_measure + '平方米' + '</label></td>';
    html += '</tr>';
    html += '<tr>';
    html += '<td><span>';
    html += '<label>托管状态</label>';
    html += '</span></td>';
    html += '<td><label class="' + returnHouseTGState(houseInfo.contract_intoStatus).color + '">' + houseInfo.contract_intoStatus + '</label></td>';
    html += '<td><span style="padding-left: 30px;">';
    html += '<label>操作状态</label>';
    html += '</span></td>';
    html += '<td><label class="next">' + _OptionState.title + '</label></td>';
    html += '</tr>';
    html += '</table>';
    html += '</div>';
    p_box.parent().find("#houseDiv").html(html);

    // 【事件】关闭结果
    p_box.parent().find("#houBtn").off().on("click", function () {
        $(this).parents(".popup-list-result").hide("fast", function () {
            this.remove();
            $(obj).removeAttr("disabled");
        })
    });
}

/**
 * 返回合同类型
 * @param param
 * @returns {*}
 */
function parseBillType(param) {
    if (param == -1) {
        return "综合";
    }
    var bt_name = "";
    for (var i = 0; i < billTypeList.length; i++) {
        var billType = billTypeList[i];
        if (billType.bt_code == param) {
            bt_name = billType.bt_name;
            break;
        }
    }
    return bt_name;
}

/**
 * 收款状态样式
 * @param obj
 */
function returnStateClass(obj) {
    // 账单状态（1：待审核、2：待还款、3：已还款、4：取消、5：未缴清、10：转租、11：退租、12：解约、13：清退、14：代偿）
    switch (obj) {
        case 2:
            return 'hint';
            break;
        case 3:
            return 'next';
            break;
        case 5:
            return 'error';
            break;
        case 9:
            return 'green';
            break;
        default:
            return '';
            break;
    }
}

/**
 * 收款状态
 * @param obj
 * @returns {String}
 */
function returnState(obj, extend) {
    // 账单状态（1：待审核、2：待还款、3：已还款、4：取消、5：未缴清、10：转租、11：退租、12：解约、13：清退、14：代偿）
    switch (obj) {
        case 1:
            return '待审核';
            break;
        case 2:
            return '待还款';
            break;
        case 3:
            return '已还款';
            break;
        case 4:
            return '取消';
            break;
        case 5:
            return '未缴清';
            break;
        case 9:
            return extend || '';
            break;
        case 10:
            return '转租';
            break;
        case 11:
            return '退租';
            break;
        case 12:
            return '解约';
            break;
        case 13:
            return '清退';
            break;
        case 14:
            return '代偿';
            break;
        default:
            return '';
            break;
    }
}

/**
 * 子账单显示与隐藏
 * @param obj
 */
function flodChildBill(obj, cycle) {
    var tbody = $(obj).parent().parent().parent();
    $(tbody).find("tr.childBill[data-cycle='" + cycle + "']").each(function () {
        if ($(this).is(":hidden")) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

/**
 * 获取账单类型列表
 */
function getBillTypeList() {
    $.get("/financeManage/getBillTypeList", function (result) {
        billTypeList = result.list;
    }, "json");
}

function showMore(obj) {
    var trList = $(obj).parent().parent().prevAll();
    if ($(obj).find("a").text() == "查看更多") {
        $.each(trList, function (index, data) {
            if (data.className == "childBill") {
                $(data).addClass("hideTr");
            } else if ($(data).hasClass("childBill")) {
                $(data).hide();
            } else {
                $(data).show();
            }
        });
        $(obj).find("a").text("收起")
    } else {
        $.each(trList, function (index, data) {
            if (trList.length > (index + 1)) {
                $(data).hide();
            }
            if ($(data).hasClass("childBill")) {
                $(data).hide();
            }
        });
        $(obj).find("a").text("查看更多")
    }
}
