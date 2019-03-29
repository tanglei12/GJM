var cno;
$(function () {
    // 初始化数据
    initData();
    // 加载数据
    loading();
});

//金额
function fmoney(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}

/** 初始化数据*/
function initData() {
    cno = getQueryString("bs_id");
}

/** 弹出层-查账*/
function popup_query_bill_state(obj, financePayFlowStatement, bs_payType) {
    var p_box = $(obj).parents(".popup-list");
    p_box.find(".popup-list-result").remove();
    p_box.append(
        '<div class="popup-list-result">' +
        '   <div class="popup-list-result-title">查账结果<button class="popup-list-result-close error"><i class="fa-remove"></i></button></div>' +
        '   <div class="popup-list-result-content"><div class="error">数据加载中</div></div>' +
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
        // if (isEmpty(result.data.trade_no)) {
        //     p_box.find(".popup-list-result-content").html('<div class="error" style="font-size: 14px;">' + returnValue(result.data.trade_state) + '</div>');
        //     return;
        // }
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
        p_box.find(".popup-list-result-content").html(html);
    });

    // 【事件】关闭结果
    p_box.find(".popup-list-result-close").off().on("click", function () {
        $(this).parents(".popup-list-result").hide("fast", function () {
            this.remove();
            $(obj).removeAttr("disabled");
        })
    });
}

/** 处理结果*/
function loading() {
    // 查询处理结果
    $.ajax({
        type: "POST",
        url: "/financeManage/selectDepositManage",
        data: {
            cno: cno
        },
        dataType: "json",
        beforeSend: function () {
        }
    }).done(function (result) {
        switch (result.code) {
            case 200:
                data = result.data;
                //定金信息
                financePayFlowStatement = data.billPayFlowStatementBo;
                //定金处理信息
                billPayResult = data.list;
                //管家信息
                userCenter = data.userCenter;
                // 显示数据
                $("#contract-content").displayContract({
                    data: {cno: cno}
                });

                // 【事件】查账
                $(document).on("click", "[name=queryPayState]", function () {
                    popup_query_bill_state(this, financePayFlowStatement, financePayFlowStatement.bs_payType);
                    $(this).attr("disabled", "disabled");
                });
                break;
            default :
                break;
        }
    });
}

;(function ($, document) {
    $.fn.displayContract = function (options) {
        return this.each(function () {
            var _this = this;

            var defaults = {
                data: {},
                show_house: true,
                show_customer: true,
                show_contract: true,
            };
            var opts = $.extend(defaults, options);
            /** 初始化数据 */
            _this.init = function () {
                $.ajax({
                    type: "POST",
                    url: "/financeManage/selectDepositManage",
                    data: opts.data,
                    dataType: "json"
                }).done(function (result) {
                    if (result.code != 200) {
                        return;
                    }
                    data = result.data;
                    //定金信息
                    var financePayFlowStatement = data.billPayFlowStatementBo;
                    var contractObjectCode = financePayFlowStatement.contractObject_code;  //是否关联
                    //定金处理信息
                    billPayResult = data.list;
                    //管家信息
                    userCenter = data.userCenter;
                    //登录人信息
                    user = data.user;

                    var bs_state = returnPayStatementState(financePayFlowStatement.bs_state);
                    var bs_payType = {style: "", text: returnValue(financePayFlowStatement.bs_payType)};
                    var bs_type = returnOrderType(financePayFlowStatement.bs_type);
                    var bs_verifyState = returnPayFlowStatementValidState(financePayFlowStatement.bs_verifyState);
                    var bs_flowState = returnPayFlowStatementTransState(financePayFlowStatement.bs_flowState);
                    var is_relation = returnContractObjectState(financePayFlowStatement.contractObject_code);

                    var html = '';
                    html += '<div class="popup-list">';
                    html += '   <dl>';
                    html += '       <dt style="font-size: 16px;font-weight: bold;">[' + bs_type.text + ']' + returnValue(financePayFlowStatement.house_address) + ' / ' + returnValue(financePayFlowStatement.bs_payerName) + '-' + returnValue(financePayFlowStatement.payer_phone) + '</dt>';
                    html += '   </dl>';
                    html += '</div>';
                    html += '<div class="popup-list">';
                    html += '   <dl><dt>描述</dt><dd>' + returnValue(financePayFlowStatement.bs_subtitle) + '</dd></dl>';
                    html += '   <dl><dt>支付金额</dt><dd class="' + (financePayFlowStatement.bs_balPay == 1 ? "ok" : "error") + '">' + (financePayFlowStatement.bs_balPay == 1 ? "+" : "-") + returnMoney(financePayFlowStatement.bs_money, 2) + '</dd></dl>';
                    html += '   <dl><dt>支付方式</dt><dd class="' + bs_payType.style + '">' + bs_payType.text + '</dd></dl>';
                    html += '   <dl><dt>经办人</dt><dd>' + returnValue(financePayFlowStatement.bs_handler_name) + "-" + returnValue(financePayFlowStatement.bs_handler_phone) + '</dd></dl>';
                    html += '   <dl><dt>创建时间</dt><dd>' + returnTime(financePayFlowStatement.bs_createTime) + '</dd></dl>';
                    html += '</div>';
                    html += '<div class="popup-list">';
                    html += '   <dl>';
                    html += '      <dt>商户订单号</dt>';
                    html += '      <dd>' + financePayFlowStatement.bs_orderNumber + '</dd>';
                    html += '      <dd><button name="queryPayState" class="popup-result-option next-bg" style="display: '+ (financePayFlowStatement.bs_payType != '支付宝' || financePayFlowStatement.bs_payType != '微信' ? 'none' : '') +'"><i class="fa-search" style="margin-right: 4px;"></i>查账</button></dd>';
                    html += '   </dl>';
                    html += '   <dl><dt>支付状态</dt><dd class="' + bs_state.style + '">' + bs_state.text + '</dd></dl>';
                    if (financePayFlowStatement.bs_type == 4) {
                        html += '   <dl><dt>合同关联</dt><dd class="' + is_relation.style + '">' + is_relation.text + '</dd></dl>';
                    }
                    html += '   <dl><dt>交易状态</dt><dd class="' + bs_flowState.style + '">' + bs_flowState.text + '</dd></dl>';
                    html += '   <dl><dt>支付时间</dt><dd>' + returnTime(financePayFlowStatement.bs_payTime) + '</dd></dl>';
                    html += '</div>';

                    // html += '<ul class="title-nav" style="border-bottom: 1px solid #878787;width: 88%;">';
                    // html += '	<li class="visited" style="font-size: 17px;">' + "基本信息";
                    // html += '	</li>';
                    // html += '</ul>';
                    // html += '<input type="hidden" class="bs_id" value=' + financePayFlowStatement.bs_id + '>';  //流水表记录id
                    // html += '<div>';
                    // html += '  <div style="display:flex;">';
                    // html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width: 100px;">' + "客户名称" + '</p></div></div>';
                    // html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">' + financePayFlowStatement.bs_payerName + '</p></div></div>';
                    // html += '  </div>';
                    // html += '  <div style="display:flex;">';
                    // html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width: 100px;">' + "联系信息" + '</p></div></div>';
                    // html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">' + financePayFlowStatement.payer_phone + '</p></div></div>';
                    // html += '  </div>';
                    // html += '  <div style="display:flex;">';
                    // html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width: 100px;">' + "小区房号" + '</p></div></div>';
                    // html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">' + financePayFlowStatement.house_address + '</p></div></div>';
                    // html += '  </div>';
                    // html += '  <div style="display:flex;">';
                    // html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width: 100px;">' + "房屋管家" + '</p></div></div>';
                    // html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">' + userCenter.em_name + '&nbsp;/&nbsp;' + userCenter.em_phone + '</p></div></div>';
                    // html += '  </div>';
                    // html += '</div>';

                    // html += '<ul class="title-nav" style="border-bottom: 1px solid #878787;width: 88%;">';
                    // html += '	<li class="visited" style="font-size: 17px;">' + "定单信息";
                    // html += '	</li>';
                    // html += '</ul>';
                    // html += '<div>';
                    // if (financePayFlowStatement.bco_orderType == 4) {
                    //     html += '  <div style="display:flex;">';
                    //     html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;">' + "订单类型" + '</p></div></div>';
                    //     html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">' + "定金订单" + '</p></div></div>';
                    //     html += '  </div>';
                    // }
                    // html += '  <div style="display:flex;">';
                    // html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width: 100px;">' + "商户订单号" + '</p></div></div>';
                    // html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">' + financePayFlowStatement.bs_orderNumber + '</p></div></div>';
                    // html += '  </div>';
                    // html += '  <div style="display:flex;">';
                    // html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width: 100px;">' + "定金金额" + '</p></div></div>';
                    // html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p id="bs_money" style="font-size:14px;width:200px;">' + fmoney(financePayFlowStatement.bs_money, 2) + '&nbsp;&nbsp;元</p></div></div>';
                    // html += '  </div>';
                    // html += '  <div style="display:flex;">';
                    // html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width: 100px;">' + "支付方式" + '</p></div></div>';
                    // html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">' + financePayFlowStatement.bs_payType + '</p></div></div>';
                    // html += '  </div>';
                    // html += '  <div style="display:flex;">';
                    // html += '    <div style="color: #878787;border-width: 0px;border-style: solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width: 100px;">' + "支付状态" + '</p></div></div>';
                    // if (financePayFlowStatement.bs_state == 1) {
                    //     html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">' + "代付款" + '</p></div></div>';
                    // } else if (financePayFlowStatement.bs_state == 2) {
                    //     html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">' + "已付款" + '</p></div></div>';
                    // } else {
                    //     html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">' + "已取消 " + '</p></div></div>';
                    // }
                    // html += '  </div>';
                    // html += '  <div style="display:flex;">';
                    // html += '    <div style="color: #878787;border: 0px solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width: 100px;">' + "支付日期" + '</p></div></div>';
                    // html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">' + format(financePayFlowStatement.bs_createTime, 'yyyy-MM-dd HH:mm:ss') + '</p></div></div>';
                    // html += '  </div>';
                    // html += '  <div style="display:flex;">';
                    // html += '    <div style="color: #878787;border: 0px solid;text-align: left;line-height: 20px;float: left;width: 100px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width: 100px;">' + "逾期日期" + '</p></div></div>';
                    // html += '    <div style="left: 103px;top: 102px;background-color: transparent;font-size: 14.0px;padding: 0px;border-radius: 0px;border-width: 0px;float: left;width: 300px;height: 37px;"><div style="width:55px;margin:10px 26px;"><p style="font-size:14px;width:200px;">' + format(financePayFlowStatement.bco_invalidTime, 'yyyy-MM-dd') + '</p></div></div>';
                    // html += '  </div>';
                    // html += '</div>';

                    html += '<div class="popup-list">';
                    html += '   <dl>';
                    html += '      <dt>处理信息</dt>';
                    html += '   </dl>';

                    // html += '<ul class="title-nav" style="border-bottom: 1px solid #878787;width: 88%;">';
                    // html += '	<li class="visited">' + "处理信息";
                    // html += '	</li>';
                    // html += '</ul>';

                    // html += '<div>';
                    html += '   <dl>';
                    html += '      <dt>';
                    var state = '';
                    if (!isEmpty(billPayResult)) {
                        for (var i = 0; i < billPayResult.length; i++) {
                            if (billPayResult[i].fr_state == 1) {
                                state = '不退定金';
                                html += '<p>' + format(billPayResult[i].fr_time, 'yyyy-MM-dd HH:mm:ss') + '&nbsp;&nbsp;&nbsp;&nbsp;' + returnValue(billPayResult[i].em_name) + '&nbsp;&nbsp;&nbsp;&nbsp;' + state + '&nbsp;&nbsp;&nbsp;&nbsp;' + returnValue(billPayResult[i].fr_content) + '</p>';
                            } else if (billPayResult[i].fr_state == 2) {
                                state = '退定金';
                                html += '<p>' + format(billPayResult[i].fr_time, 'yyyy-MM-dd HH:mm:ss') + '&nbsp;&nbsp;&nbsp;&nbsp;' + returnValue(billPayResult[i].em_name) + '&nbsp;&nbsp;&nbsp;&nbsp;' + state + '&nbsp;&nbsp;&nbsp;&nbsp;' + fmoney(billPayResult[i].fr_money, 2) + '元&nbsp;&nbsp;&nbsp;&nbsp;' + returnValue(billPayResult[i].fr_content) + '</p>';
                            } else if (billPayResult[i].fr_state == 3) {
                                state = '通过退定金';
                                html += '<p>' + format(billPayResult[i].fr_time, 'yyyy-MM-dd HH:mm:ss') + '&nbsp;&nbsp;&nbsp;&nbsp;' + returnValue(billPayResult[i].em_name) + '&nbsp;&nbsp;&nbsp;&nbsp;' + state + '&nbsp;&nbsp;&nbsp;&nbsp;' + fmoney(billPayResult[i].fr_money, 2) + '元&nbsp;&nbsp;&nbsp;&nbsp;' + returnValue(billPayResult[i].fr_content) + '</p>';
                            }
                        }
                    }
                    // html += '</div>';
                    html += '      </dt>';
                    html += '   </dl>';
                    html += '</div>';

                    if (isEmpty(billPayResult) && user.ucc_id != 23 && financePayFlowStatement.bs_state == 2 && contractObjectCode == 1) {
                        html += '<div style="display: grid;float: left;">';
                        html += '  <div class="suer-button" style="float:left;">';
                        html += '     <button type="butten" class="finish-butten" id="reject" style="background-color:#f2893d">违约处理</button>';
                        html += '  </div>';
                        html += '  <div class="radio_div" style="float: left;margin-left: 25px;display:none;">';
                        html += '     <p style="font-size:15px;">' + "是否退定金？" + '</p>';
                        html += '     <div class="peopleImg" style="margin: 10px auto;">';
                        html += '       <label class="label-noMoney"><input type="radio" name="state" value="1">&nbsp;&nbsp;不退款</label>';
                        html += '       <label class="label-money" style="margin-left:35px;"><input type="radio" name="state" value="2">&nbsp;&nbsp;退款</label>';
                        html += '     </div>';
                        html += '	  <div class="money" style="display: none;">';
                        html += '	  		<input type="text" id="money"  style="float:left;width: 115px;height: 27px;margin-left: 1px;border: 1px solid;" placeholder="请输入退款金额"><p style="margin-left: 15px;margin-top: 5px;float: left;">' + "最多输入" + fmoney(financePayFlowStatement.bs_money, 2) + '&nbsp;元</p>';
                        html += '     </div>';
                        html += '  </div>';
                        html += '  <div class="button-div" style="font-size: 14px;margin-left:25px;float:left;display:none;">';
                        html += '     <p style="width:150px;margin-bottom: 6px;float: left;">退款原因：</P>';
                        html += '     <div>';
                        html += '        <textarea class="textarea" style="width:220px;height:80px;resize:none"></textarea>';
                        html += '     </div>';
                        html += '     <button type="butten" class="finish-butten" id="close" style="background-color:red">关闭</button>';
                        html += '     <button type="butten" class="finish-butten" id="suer" style="background-color:#18bc9c">提交</button>';
                        html += '  </div>';
                        html += '</div>';
                    }
                    /*var stat='';
                     if (!isEmpty(billPayResult)) {
                     for (var i=0;i<billPayResult.length;i++) {
                     stat=billPayResult[i].fr_state;
                     }
                     if (user.ucc_id == 23 && stat == 2 && stat != 3  && financePayFlowStatement.bs_state == 2) {
                     html += '<div style="display: grid;float: left;">';
                     html += '  <div class="suer-button" style="float:left;margin: 12px 15px;">';
                     html += '     <button type="butten" class="finish-butten" id="noAgree" style="background-color:#f2893d">不同意</button>';
                     html += '     <button type="butten" class="finish-butten" id="agree" style="background-color:#18bc9c">同意</button>';
                     html += '  </div>';
                     html += '  <div class="radio_div" style="float: left;margin-left: 25px;display:none;">';
                     html += '	  <input type="text" id="money" style="float:left;width: 115px;height: 27px;margin-left: 1px;display:none;border: 1px solid;" placeholder="请输入退款金额"><p style="margin-left: 15px;margin-top: 5px;float: left;">'+"最多输入"+fmoney(financePayFlowStatement.bs_money,2)+'&nbsp;元</p>';
                     html += '  </div>';
                     html += '  <div class="button-div" style="font-size: 14px;margin-left:15px;float:left;display:none;">';
                     html += '     <p style="width:150px;margin-bottom: 6px;float: left;">原因：</P>';
                     html += '     <div>';
                     html += '        <textarea class="textarea" style="width:220px;height:80px;"></textarea>';
                     html += '     </div>';
                     html += '     <button type="butten" class="finish-butten" id="close" style="background-color:red">关闭</button>';
                     html += '     <button type="butten" class="finish-butten" id="financeOk" style="background-color:#18bc9c">提交</button>';
                     html += '  </div>';
                     html += '  <div class="button" style="font-size: 14px;margin-left:15px;float:left;display:none;">';
                     html += '     <button type="butten" class="finish-butten" id="close" style="background-color:red">关闭</button>';
                     html += '     <button type="butten" class="finish-butten" id="financeOk" style="background-color:#18bc9c">提交</button>';
                     html += '  </div>';
                     html += '</div>';
                     }
                     }*/

                    $("#contract-title").html(html);
                });
            };

            _this.init();
        });
    };
})($, document);

function confirm() {
    var html = '';
    html += '<div class="expense is-visible3">';
    html += '	<div class="expense-container3" id="expense-container3">';
    html += '		<div id="cd-buttons">';
    html += '			<div style="margin: auto; width: 90%; text-align: center;border-bottom: 1px solid #06B;" id="titleInsert">';
    html += '				<input value="重庆管家婆费用报销单" id="inputtext" name="inputtext" style="width:210px;border: none; text-align: center; font-size: 20px; color: #3E97C9; font-family: 微软雅黑; -moz-user-select: none; -webkit-user-select: none; cursor: default;" readonly="readonly">';
    html += '			</div>';
    html += '			<button type="butten" class="finish-butten">关闭</button>';
    html += '			<button type="butten" class="finish-butten">提交审核</button>';
    html += '		</div>';
    html += '		<a href="#0" class="expense-popup-close" style="color: red;">X</a>';
    html += '	</div>';
    html += '</div>';
}

//违约处理
$(document).on('click', '#reject', function () {
    $('.button-div').show();
    $('.radio_div').show();
});
//退款输入框
$(document).on('click', '.label-money', function () {
    $('.money').show();
})
$(document).on('click', '.label-noMoney', function () {
    $('.money').hide();
})
//违约处理关闭
$(document).on('click', '.close-button', function () {
    $('.expense').removeClass('is-visible3');
    $('.radio-div').empty();
})
//确认
var arr = {};
$(document).on('click', '#suer', function () {
    arr.fr_content = $('.textarea').val();
    arr.fr_bsId = $('.bs_id').val();  //流水记录id
    var state = $('input:radio[name="state"]:checked').val();
    arr.fr_state = state;
    arr.fr_money = $('#money').val();  //退款金额
    var money = $('#bs_money').text().substring(0, $('#bs_money').text().length - 6);
    if (eval($('#money').val()) > eval(money)) {
        $.jBox.tip("应退定金与实际定金不符", "error");
        return false;
    }
    if ($('.textarea').val() == '') {
        $.jBox.tip("填写原因不能为空", "error");
        return false;
    }
    $('.expense').addClass('is-visible3');
    var html = '';
    if (state == 1) {
        html += '<label id="typee" class="label active">不退款</label>';
    } else {
        html += '<label id="typee" class="label active">退款</label>';
        html += '<i style="font-style: normal;margin-left: 19px;font-size: 15px;">金额 ：' + $('#money').val() + '</i>';
    }
    $('.radio-div').append(html);
    $('#text').text($('.textarea').val());
})
//确认提交
$(document).on('click', '.sumbit-button', function () {
    $.ajax({
        url: "/financeManage/submitFinanceResult?result=" + encodeURI(JSON.stringify(arr)),
        type: "POST",
        data: {},
        dataType: "json",
        success: function (data) {
            location.reload();
        },
        error: function () {
            $.jBox.tip(data.msg, "error");
        }
    })
})
// 关闭处理原因
$(document).on('click', '#close', function () {
    $('.button-div').hide();
    $('.radio_div').hide();
    $('.money').hide();
    $('.button').hide();
    $('.textarea').val('');
    $("input[type='radio']").removeAttr('checked');
    $('#money').val('');
})
