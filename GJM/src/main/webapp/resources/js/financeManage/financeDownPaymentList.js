var downpayment_url = {
    list: "/financeManage/queryDownPaymentPageList",
    info: "/financeManage/queryDownPaymentInfo",
};
$(function () { load_data();});

/* 加载数据 */
function load_data() {
    // 加载
    $.table({
        filterDateParams: [
            {name: "创建时间", value: "fdp_create_time", sort: 'DESC'},
            {name: "到期时间", value: "fdp_invaild_time", sort: 'DESC'}
        ],
        filterBars: [
            {name: "fdp_status", type: "select", selected: "0", data: "returnDownPaymentStatus"}
        ],
        listParams: [
            {text: "小区房号", name: "house_address", param: "", func: {type: "onclick", name: "load_popup(this)"}},
            {text: "客户信息", name: "user_name{/}user_phone", param: ""},
            {text: "定金金额", name: "fdp_amount", param: "float"},
            {text: "支付状态", name: "fdp_status", param: "returnDownPaymentStatus"},
            {text: "备注", name: "fdp_remarks", param: ""},
            {text: "预留天数", name: "fdp_invaild_day", param: ""},
            {text: "创建时间", name: "fdp_create_time", param: "time"},
            {text: "到期时间", name: "fdp_invaild_time", param: "time"}
        ],
        ajaxParams: {url: downpayment_url.list}
    });
}

/* 加载弹出层 */
function load_popup(_obj) {
    $.popupBox({
        target: $.table.getTableContent(),
        data: $.table.getCurrentItemData(_obj),
        theme: "info",
        done: function (box, _data, _select) {
            downpayment_info(box, _data, _select);
        }
    });
}

/* 定金详情 */
function downpayment_info(box, _data, _select) {
    $.ajax({
        type: "POST",
        url: downpayment_url.info,
        data: {fdp_id: _data.fdp_id},
        dataType: "json",
    }).done(function (result) {
        if (result.code != 200) return $.hint.tip(result.msg);

        // 支付流水
        var financeDownPaymentInfo = result.data.financeDownPaymentInfo;
        // 支付流水
        var orderInfo = result.data.orderInfo;
        // 支付流水
        var orderBillInfo = result.data.orderBillInfo;
        // 订单退款
        var orderReturnsInfo = result.data.orderReturnsInfo || "";
        // 房源信息
        var houseInfo = result.data.houseInfo;

        // ----------

        var title_style0 = 'style="min-width: 60px;"';
        var title_style1 = 'style="min-width: 160px;"';

        // 客户信息
        var cc_info = orderInfo.user_name + "-" + orderInfo.user_phone;
        // 定金状态{0: "定金状态", 1: "审核中", 2: "未使用", 3: "已使用", 4: "已过期", 5: "已关闭"}
        var fdp_status = returnDownPaymentStatus(financeDownPaymentInfo.fdp_status);
        // 支付状态
        var bill_status = returnPayStatementState(orderBillInfo.bill_status);
        // 过期天数
        var day = '';
        if (financeDownPaymentInfo.fdp_status == 2) {
            day = returnDay(new Date(), financeDownPaymentInfo.fdp_invaild_time);
            if (day < 0) {
                day = '<span class="error">已过期' + Math.abs(day) + '天</span>';
            } else if (day == 0) {
                day = '<span class="error">今日过期</span>';
            } else {
                day = '<span class="ok">还剩' + day + '天</span>';
            }
            day = '&nbsp;[&nbsp;' + day + '&nbsp;]';
        }

        var html =
            '<div class="popup-list">' +
            '   <dl>' +
            '       <dt style="font-size: 16px;font-weight: bold;">' +
            '           <a href="javascript:open_tab.house_info(\'' + houseInfo.hi_code + '\');">' + houseInfo.house_address + '</a>&nbsp;/&nbsp;' +
            '           <a href="javascript:open_tab.customer_info(\'' + orderInfo.trade_cc_code + '\');">' + cc_info + '</a>' +
            '       </dt>' +
            '   </dl>' +
            '   <div>定金号：' + financeDownPaymentInfo.fdp_sn + '</div>' +
            '   <div class="popup-box">' +
            '       <button class="popup-box-btn next-bg-w" name="downpayment-change">转移定金</button>' +
            '       <button class="popup-box-btn next-bg-w" name="downpayment-close">违约处理</button>' +
            '   </div>' +
            '</div>' +
            '<div class="popup-list">' +
            '   <dl class="form-view"><dt>定金状态</dt><dd class="' + fdp_status.style + '">' + fdp_status.text + '</dd></dl>' +
            '   <dl class="form-view"><dt>定金金额</dt><dd>￥' + returnMoney(financeDownPaymentInfo.fdp_amount, 2) + '</dd></dl>' +
            '   <dl class="form-view"><dt>预留天数</dt><dd>' + returnNumber(financeDownPaymentInfo.fdp_invaild_day) + '天' + day + '</dd></dl>' +
            '   <dl class="form-view"><dt>过期时间</dt><dd>' + returnDate(financeDownPaymentInfo.fdp_invaild_time) + ' 23:59:59</dd></dl>' +
            '   <dl class="form-view"><dt>创建时间</dt><dd>' + returnTime(financeDownPaymentInfo.fdp_create_time) + '</dd></dl>' +
            '</div>' +
            '<div class="popup-list">' +
            '   <dl class="form-view"><dt>备注</dt><dd>' + returnNullReplace(financeDownPaymentInfo.fdp_remarks, "-") + '<label name="deposit-remarks-edit" class="fa-edit info-edit-btn next"></label></dd></dl>' +
            '</div>' +
            '<div class="popup-list">' +
            '   <dl class="form-view"><dt>支付状态</dt><dd class="' + bill_status.style + '">' + bill_status.text + '</dd></dl>' +
            '   <dl class="form-view"><dt>支付方式</dt><dd>' + returnValue(orderBillInfo.bill_pay_channel) + '</dd></dl>' +
            '   <dl class="form-view"><dt>支付时间</dt><dd>' + returnTime(orderBillInfo.bill_create_time) + '</dd></dl>' +
            '</div>' +
            '<div class="popup-list" id="handle" style="display: none;">' +
            '   <dl class="form-view"><dt>违约处理</dt><dd>' + returnValue(orderReturnsInfo.returns_desc) + '</dd></dl>' +
            '   <dl class="form-view"><dt></dt><dd>--退款金额' + returnMoney(orderReturnsInfo.returns_amount) + '元</dd></dl>' +
            '   <dl class="form-view"><dt></dt><dd>--操作人：' + returnValue(orderReturnsInfo.returns_handler_name) + '</dd></dl>' +
            '   <dl class="form-view"><dt></dt><dd>--操作时间：' + returnTime(orderReturnsInfo.returns_create_time) + '</dd></dl>' +
            '</div>' +
            '';
        box.head.html(html);

        if (!returnEmpty(orderReturnsInfo)) $("#handle").show();

        // [事件]编辑备注
        box.head.find("[name=deposit-remarks-edit]").off().on("click", function () {
            popup_edit_remarks(this, financeDownPaymentInfo);
        });

        // [事件]变更定金
        box.head.find("[name=downpayment-change]").off().on("click", function () {
            popup_downpayment_change(financeDownPaymentInfo);
        });

        // [事件]违约处理
        box.head.find("[name=downpayment-close]").off().on("click", function () {
            popup_downpayment_manage(financeDownPaymentInfo);
        });

    }).always(function () {
        $.popupRefreshClose();
    });
}

/* 编辑备注 */
function popup_edit_remarks(obj, financeDownPaymentInfo) {
    $(obj).parents(".popup-list").find(".popup-list-result").remove();

    var _box = $(
        '<div class="popup-list-result">' +
        '   <div class="popup-list-result-title" style="display: flex;">' +
        '       <div style="flex: 1">编辑备注</div>' +
        '       <button class="popup-list-result-confirm ok" name="addRemarkConfirm"><i class="fa-check"></i></button>' +
        '       <button class="popup-list-result-close error"><i class="fa-remove"></i></button>' +
        '   </div>' +
        '   <div class="popup-list-result-form" style="padding: 0;">' +
        '       <dl style="">' +
        '           <dt style="width: 100%;"><textarea class="popup-textarea" placeholder="填写备注" name="popupTaRemark">' + returnValue(financeDownPaymentInfo.fdp_remarks) + '</textarea></dt>' +
        '       </dl>' +
        '   </div>' +
        '</div>');

    $(obj).parents("dl").after(_box);

    var popupTaRemark = _box.find("[name=popupTaRemark]");

    var remark_cache = popupTaRemark.val();
    popupTaRemark.val("").focus().val(remark_cache);

    // 【事件】关闭结果
    _box.find(".popup-list-result-close").off().on("click", function () {
        _box.hide("fast", function () { this.remove(); });
    });

    // 【事件】提交备注
    _box.find("[name=addRemarkConfirm]").off().on("click", function () {
        $.ajax({
            type: "POST",
            url: "/financeManage/updateDownPaymentForRemark",
            data: {
                fdp_id: financeDownPaymentInfo.fdp_id,
                fdp_remarks: popupTaRemark.val().trim()
            },
            dataType: "json"
        }).done(function (result) {
            if (result.code != 200) return;
            $.popupRefresh();
        });
    });
}

/* 变更定金 */
function popup_downpayment_change(financeDownPaymentInfo) {
    $.popupSideView({
        mode: "right",
        wh: "68%",
        title: "变更定金",
        done: function (box) {
            var html =
                '<div class="popup-list-result-form" style="padding: 30px 0;">' +
                '    <dl>' +
                '        <dt>是否退款</dt>' +
                '        <dd>' +
                '           <input class="custom-switch-check" id="isRefund" type="checkbox">' +
                '           <label class="custom-switch-label" data-on="有退款" data-off="无退款" for="isRefund" style="top:0"></label>' +
                '        </dd>' +
                '    </dl>' +
                '    <dl class="refund-money-box" style="display: none">' +
                '        <dt>退款金额</dt>' +
                '        <dd>' +
                '           <input class="popup-input money" name="refund-money" maxlength="11" placeholder="退款金额">' +
                '           <span class="error" style="padding-left: 10px;">退款金额不能超过' + returnMoney(financeDownPaymentInfo.fdp_amount, 2) + '元</span>' +
                '        </dd>' +
                '    </dl>' +
                '    <dl>' +
                '        <dt>违约描述</dt>' +
                '        <dd>' +
                '           <div id="breakDiv">' +
                '               <label class="common-borderbox" style="line-height: 32px;"><input type="radio" name="breakType" value="主动违约">主动违约</label>' +
                '               <label class="common-borderbox" style="line-height: 32px;"><input type="radio" name="breakType" value="被动违约">被动违约</label>' +
                '               <label class="common-borderbox" style="line-height: 32px;"><input type="radio" name="breakType" value="超期违约">超期违约</label>' +
                '           </div>' +
                '        </dd>' +
                '    </dl>' +
                '    <dl>' +
                '        <dt></dt>' +
                '        <dd>' +
                '           <textarea class="popup-textarea" name="refund-desc" maxlength="120" placeholder="填写描述" style="width: 300px;border: 1px solid #ddd;"></textarea>' +
                '        </dd>' +
                '    </dl>' +
                '    <dl>' +
                '        <dt></dt>' +
                '        <dd>' +
                '           <button class="popup-list-result-confirm next-bg" name="refundConfirm">提交</button>' +
                '        </dd>' +
                '    </dl>' +
                '</div>';
            box.html(html);

            // 【事件】是否退款
            box.find("#isRefund").off().on("change", function () {
                if ($(this).is(":checked")) {
                    box.find(".refund-money-box").show();
                    box.find("[name=refund-money]").focus();
                } else {
                    box.find(".refund-money-box").hide();
                    box.find("[name=refund-money]").val("");
                }
            });

            // 【事件】提交违约
            box.find("[name=refundConfirm]").off().on("click", function () {
                var breakType = $("[name=breakType]:checked").val();
                if (isEmpty(breakType)) return box.find("#breakDiv").msg("请选择违约类型");
                var is_refund_checked = $("#isRefund").is(":checked");

                var data = {};
                data.fr_bsId = financePayFlowStatement.bs_id;
                data.fr_state = is_refund_checked ? 1 : 2;
                data.fr_content = "【" + breakType + "】" + box.find("[name=refund-desc]").val().trim();
                if (is_refund_checked) {
                    // 退款金额
                    data.fr_money = box.find("[name=refund-money]").val();
                    if (isEmpty(data.fr_money)) {
                        return box.find("[name=refund-money]").msg("请填写退款金额");
                    }
                    if (returnFloat(data.fr_money) <= 0) {
                        return box.find("[name=refund-money]").msg("退款金额不能小于等于0");
                    }
                    if (returnFloat(data.fr_money) > returnFloat(financePayFlowStatement.bs_money)) {
                        return box.find("[name=refund-money]").msg("退款金额不能超出支付金额");
                    }
                }
                if (isEmpty(box.find("[name=refund-desc]").val())) return box.find("[name=refund-desc]").msg("请填写违约描述");

                $.hint.confirm("确定提交违约处理吗？", function () {
                    $.ajax({
                        type: "POST",
                        url: "/financeManage/submitFinanceResult",
                        data: {result: JSON.stringify(data)},
                        dataType: "json",
                    }).done(function (result) {
                        if (result.code != 200) return;
                        $.popupRefresh();
                    });
                });
            });
        },
    });
}

/* 违约处理 */
function popup_downpayment_manage(financeDownPaymentInfo) {
    $.popupSideView({
        mode: "right",
        wh: "68%",
        title: "违约处理",
        done: function (box) {
            var html =
                '<div class="popup-list-result-form" style="padding: 30px 0;">' +
                '    <dl class="form-edit">' +
                '        <dt><em>*</em>违约类型</dt>' +
                '        <dd>' +
                '            <select name="break_way">' +
                '                <option value="">请选择</option>' +
                '                <option value="1">定金到期</option>' +
                '                <option value="2">客户违约</option>' +
                '                <option value="3">公司违约</option>' +
                '            </select>' +
                '        </dd>' +
                '    </dl>' +
                '    <dl class="form-edit">' +
                '        <dt><em>*</em>退款方式</dt>' +
                '        <dd>' +
                '            <select name="returns_way">' +
                '                <option value="">请选择</option>' +
                '                <option value="1">原路退款</option>' +
                '                <option value="2">现金转账</option>' +
                '                <option value="3">不退款</option>' +
                '            </select>' +
                '        </dd>' +
                '    </dl>' +
                '    <dl class="form-edit refund-money-box" style="display: none;">' +
                '        <dt><em>*</em>退款金额</dt>' +
                '        <dd>' +
                '           <input class="popup-input money" name="returns_amount" maxlength="11" placeholder="退款金额">' +
                '           <span class="error">（最多' + returnMoney(financeDownPaymentInfo.fdp_amount, 2) + '元）</span>' +
                '        </dd>' +
                '    </dl>' +
                '    <dl class="form-edit">' +
                '        <dt><em>*</em>退款日期</dt>' +
                '        <dd>' +
                '           <input name="returns_handling_date" value="' + returnDate(new Date()) + '" onclick="WdatePicker()" readonly>' +
                '        </dd>' +
                '    </dl>' +
                '    <dl class="form-edit">' +
                '        <dt>违约描述</dt>' +
                '        <dd>' +
                '           <div style="border: 1px solid #ddd;border-radius: 3px;width: 340px;">' +
                '               <textarea class="popup-textarea" name="returns_desc" maxlength="120" placeholder="填写描述"></textarea>' +
                '           </div>' +
                '        </dd>' +
                '    </dl>' +
                '    <dl class="form-edit">' +
                '        <dt></dt>' +
                '        <dd>' +
                '           <button class="popup-list-result-confirm next-bg" name="refundConfirm">提交</button>' +
                '        </dd>' +
                '    </dl>' +
                '</div>';
            box.html(html);

            // 【事件】退款方式
            box.find("[name=returns_way]").off().on("change", function () {
                switch (returnNumber(this.value)) {
                    case 1:
                    case 2:
                        box.find(".refund-money-box").show();
                        break;
                    case 3:
                        box.find(".refund-money-box").hide();
                        break;
                }
            });

            // 【事件】违约描述
            box.find(".popup-desc-label").off().on("click", function () {
                box.find("[name=returns_desc]").text(this.innerText);
            });

            // 【事件】提交违约
            box.find("[name=refundConfirm]").off().on("click", function () {
                var _submit = $(this);
                var break_way = box.find("[name=break_way]");
                var returns_way = box.find("[name=returns_way]");
                var returns_amount = box.find("[name=returns_amount]");
                var returns_handling_date = box.find("[name=returns_handling_date]");
                var returns_desc = box.find("[name=returns_desc]");

                if (returnEmpty(break_way.val())) return break_way.msg("请选择违约类型");
                if (returnEmpty(returns_way.val())) return returns_way.msg("请选择退款方式");
                if (returnNumber(returns_way.val()) != 3 && returnEmpty(returns_amount.val())) return returns_amount.msg("请填写退款金额");
                if (returnFloat(returns_amount.val()) < 0) return returns_amount.msg("退款金额不能小于等于0");
                if (returnFloat(returns_amount.val()) > returnFloat(financeDownPaymentInfo.fdp_amount)) return returns_amount.msg("退款金额不能超出支付金额");
                if (returnEmpty(returns_handling_date.val())) return returns_handling_date.msg("请填写退款日期");

                var data = {};
                data.fdp_id = financeDownPaymentInfo.fdp_id;
                data.break_way = break_way.val();
                data.returns_way = returns_way.val();
                data.returns_amount = returnFloat(returns_amount.val());
                data.returns_handling_date = returns_handling_date.val();
                data.returns_desc = "【" + break_way.find("option:selected").text() + "】" + returns_desc.val().trim();

                $.hint.confirm("确定提交违约处理吗？", function () {
                    $.ajax({
                        type: "POST",
                        url: "/financeManage/submitDownPaymentResult",
                        data: JSON.stringify(data),
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        beforeSend: function () {
                            $.hint.tip("数据提交中...");
                        }
                    }).done(function (result) {
                        if (result.code != 200) return $.hint.tip(result.msg);
                        $.hint.tip("提交成功", "success");
                        $.popupSideViewClose();
                        $.popupRefresh();
                    });
                });
            });
        },
    });
}

/* 添加定金 */
function addDownpayment() {
    $.popupBox({
        target: $.table.getTableContent(),
        theme: "info",
        done: function (_box, _data, _select) {
            const html =
                '<div class="popup-list"><h2 style="line-height: 36px;">添加定金</h2></div>' +
                '<div class="popup-list popup-edit">' +
                '   <dl class="form-edit">' +
                '       <dt><em>*</em>小区房号</dt>' +
                '       <dd><input name="hi_code" placeholder="选择房源" readonly></dd>' +
                '   </dl>' +
                '   <dl class="form-edit">' +
                '       <dt><em>*</em>客户信息</dt>' +
                '       <dd><input name="cc_code" placeholder="选择客户" readonly></dd>' +
                '   </dl>' +
                '   <dl class="form-edit">' +
                '       <dt><em>*</em>定金金额</dt>' +
                '       <dd><input class="money" placeholder="定金金额" maxlength="11"><span>元</span></dd>' +
                '   </dl>' +
                '   <dl class="form-edit">' +
                '       <dt><em>*</em>交定日期</dt>' +
                '       <dd><input placeholder="预留日期" onclick="WdatePicker();" readonly></dd>' +
                '   </dl>' +
                '   <dl class="form-edit">' +
                '       <dt><em>*</em>预留天数</dt>' +
                '       <dd>' +
                '           <label class="common-checkbox common-checkbox-checked" style="margin-right: 10px;"><input type="radio" name="fdp_invaild_day" value="1" checked>1天</label>' +
                '           <label class="common-checkbox" style="margin-right: 10px;"><input type="radio" name="fdp_invaild_day" value="3">3天</label>' +
                '           <label class="common-checkbox" style="margin-right: 10px;"><input type="radio" name="fdp_invaild_day" value="5">5天</label>' +
                '           <label class="common-checkbox" style="margin-right: 10px;"><input type="radio" name="fdp_invaild_day" value="7">7天</label>' +
                '           <label class="common-checkbox">' +
                '               <input type="radio" name="fdp_invaild_day" value="other">其他' +
                '               <span class="other-day" style="display: none;"><input class="number" name="fdp_invaild_day_other" placeholder="预留天数">天</span>' +
                '           </label>' +
                '       </dd>' +
                '   </dl>' +
                '   <dl class="form-edit">' +
                '       <dt><em>*</em>房管员</dt>' +
                '       <dd><input name="em_id" placeholder="选择房管员" readonly></dd>' +
                '   </dl>' +
                '</div>' +
                '<div class="popup-list popup-edit">' +
                '   <dl class="form-edit">' +
                '       <dt><em>*</em>支付方式</dt>' +
                '       <dd>' +
                '       <select name="pay_way">' +
                '           <option value="">选择支付方式</option>' +
                '           <option value="支付宝转账">支付宝转账</option>' +
                '           <option value="微信转账">微信转账</option>' +
                '           <option value="银行卡转账">银行卡转账</option>' +
                '           <option value="现金付款">现金付款</option>' +
                '       </select>' +
                '       </dd>' +
                '   </dl>' +
                '   <dl class="form-edit">' +
                '       <dt>备注</dt>' +
                '       <dd><textarea name="fdp_remarks" placeholder="备注"></textarea></dd>' +
                '   </dl>' +
                '   <dl class="form-edit">' +
                '       <dt></dt>' +
                '       <dd><button class="next-bg" name="submit">提交</button></dd>' +
                '   </dl>' +
                '</div>' +
                '';
            _box.head.html(html);

            //【事件】预留天数
            _box.head.find("[name=fdp_invaild_day]").off().on("change", function () {
                var _this = $(this);
                var _other_box = _box.head.find(".other-day");
                if (_this.val() == "other") {
                    _other_box.show().find("[name=fdp_invaild_day_other]").focus();
                } else {
                    _other_box.hide();
                }
            });

            //【事件】选择房源
            _box.head.find("[name=hi_code]").off().on("click", function () {
                var _this = $(this);
                _this.changeHouse({
                    mode: "house",
                    data: {
                        filter: {
                            open: true,
                            lock: true,
                            selected: "forrent"
                        }
                    },
                    done: function (_data) {
                        _this.val(_data.house_address).attr("data-value", _data.hi_code);
                    }
                });
            });

            //【事件】选择客户
            _box.head.find("[name=cc_code]").off().on("click", function () {
                var _this = $(this);
                _this.changeHouse({
                    mode: "customer",
                    done: function (_data) {
                        _this.val(_data.cc_name + "/" + _data.ccp_phone).attr("data-value", _data.cc_code);
                    }
                });
            });

            //【事件】选择房管员
            _box.head.find("[name=em_id]").off().on("click", function () {
                var _this = $(this);
                _this.changeHouse({
                    mode: "employee",
                    done: function (_data) {
                        _this.val(_data.em_name + "/" + _data.em_phone).attr("data-value", _data.em_id);
                    }
                });
            });

            //【事件】提交
            _box.head.find("[name=submit]").off().on("click", function () {
                var _submit = $(this);
                
            });
        }
    });
}
