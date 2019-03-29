var interval = 0;
var interval_count = 0;
$(function () {
    // 加载数据
    load_data();
    // 加载事件
    load_event();
});

/* 加载数据 */
function load_data() {
    $.table({
        filterDateParams: [
            {name: "创建时间", value: "bco_createTime", sort: 'DESC'},
            {name: "当期日期", value: "bco_currentDate", sort: 'DESC'}
        ],
        filterBars: [
            // 合同类型
            {name: "bco_type", type: "select", selected: "0", data: "returnOrderContractType"},
            // 合同状态
            {name: "contractObject_State", type: "select", selected: "0", data: "returnContractState"},
            // 金融机构
            {name: "contractBody_PayType", type: "select", selected: "0", data: "returnOrderPartner"},
            // 支付方式
            {name: "contractBody_PayStyle", type: "select", selected: "0", data: "returnOrderCyclePayWay"},
            // 订单状态
            {name: "bco_optionState", type: "select", selected: "2", data: "returnOrderOptionState"}
        ],
        listParams: [
            {text: "小区房号", name: "house_address", param: "", func: {type: "onclick", name: "popup_contract_order_info(this)"}},
            {text: "合同号", name: "contractObject_No", param: ""},
            {text: "合同类型", name: "bco_type", param: "returnOrderContractType"},
            {text: "客户信息", name: "bco_customerName{/}bco_customerPhone", param: ""},
            {text: "合同状态", name: "contractObject_OptionState", param: "returnContractOptionState"},
            {text: "支付方式", name: "contractBody_PayStyle", param: "returnOrderCyclePayWay"},
            {text: "金融机构", name: "contractBody_PayType", param: "returnOrderPartner"},
            {text: "当期期数", name: "bco_currentCycle", param: ""},
            {text: "当期金额", name: "bco_currentPayment", param: ""},
            {text: "当期日期", name: "bco_currentDate", param: "date"},
            {text: "订单状态", name: "bco_optionState", param: "returnOrderOptionState"},
            {text: "归属管家", name: "bco_empName{/}bco_empPhone", param: ""},
            {text: "归属部门", name: "ucc_name", param: ""}
        ],
        ajaxParams: {url: "/financeManage/queryContractOrderPageList"},
    });
}

/* 加载事件*/
function load_event() {
    // 【事件】关闭页面签关闭任务
    $(window).on("beforeunload", function () {
        clearInterval(interval);
    });
}

/* 弹出层-合同订单详情 */
function popup_contract_order_info(_obj) {
    $.popupBox({
        target: $.table.getTableContent(),
        data: $.table.getCurrentItemData(_obj),
        theme: "info",
        done: function (box, _data, _select) {
            $.popupSideViewClose();
            // 加载数据
            $.ajax({
                type: "POST",
                url: "/financeManage/queryFinanceOrderInfo",
                data: {bco_code: _data.bco_code},
                dataType: "json"
            }).done(function (result) {
                if (result.code != 200) return;

                // 订单信息
                var financeOrder = result.data.financeOrder || "";
                // 房源信息
                var houseInfo = result.data.houseInfo || "";
                // 合同信息
                var contractInfo = result.data.contractInfo || "";

                var bco_balPay = financeOrder.bco_currentBalPay == 0 ? "收" : "付";
                var bco_balPay_color = financeOrder.bco_currentBalPay == 0 ? "ok" : "next";
                // 客户信息
                var cc_info = financeOrder.bco_customerName + "-" + financeOrder.bco_customerPhone;
                // 当期数据
                var bco_currentCycle = returnNumber(financeOrder.bco_currentCycle) == 0 ? "首期" : "第" + ((returnNumber(financeOrder.bco_currentCycle) < 10 ? "0" : "") + returnNumber(financeOrder.bco_currentCycle)) + "期";
                // 订单状态
                var bco_optionState = returnOrderOptionState(financeOrder.bco_optionState);
                var bco_current_state = financeOrder.bco_optionState == 1 || financeOrder.bco_optionState == 2 ? returnValue(bco_currentCycle) + '，' + bco_balPay + '款日期：<span class="error">' + returnDate(financeOrder.bco_currentDate) + '</span>，应' + bco_balPay + '金额：<span class="error">￥' + returnMoney(financeOrder.bco_currentPayment) + '</span>' : "--";
                // 开始日期
                var start_date = returnDate(contractInfo.contractObject_Date);
                // 结束日期
                var end_date = returnDate(contractInfo.contractObject_DeadlineTime);
                // 合同状态
                var contractObject_OptionState = returnContractOptionState(contractInfo.contractObject_OptionState);
                // 合同日期信息
                var contract_date_info = start_date + "~" + end_date + "&nbsp;[" + returnBusinessYMD(start_date, end_date) + "]";
                var title_style0 = 'style="min-width: 60px;"';
                var title_style1 = 'style="min-width: 160px;"';

                // 【布局】头部
                var html = '';
                html += '<div class="popup-list">';
                html += '   <dl>';
                html += '       <dt style="font-size: 16px;font-weight: bold;"><a href="javascript:open_tab.house_info(\'' + houseInfo.hi_code + '\');">' + houseInfo.house_address + '</a>&nbsp;/&nbsp;<a href="javascript:open_tab.customer_info(\'' + financeOrder.bco_customer + '\');">' + cc_info + '</a></dt>';
                html += '   </dl>';
                html += '   <div>订单号：' + financeOrder.bco_code + '</div>';
                html += '</div>';
                html += '';
                html += '<div class="popup-list">';
                html += '   <dl><dt ' + title_style0 + '>订单状态</dt><dd class="' + bco_optionState.style + '" ' + title_style1 + '>' + bco_optionState.text + '</dd>';
                html += '       <dt ' + title_style0 + '>当期状态</dt><dd>' + bco_current_state + '</dd></dl>';
                html += '   <dl><dt ' + title_style0 + '>合同类型</dt><dd class="' + bco_balPay_color + '" ' + title_style1 + '>' + contractInfo.contractObject_Type + '</dd>';
                html += '       <dt ' + title_style0 + '>合同状态</dt><dd ' + title_style1 + ' class="' + contractObject_OptionState.style + '">' + contractObject_OptionState.text + '</dd>';
                html += '       <dt ' + title_style0 + '>合同期限</dt><dd>' + contract_date_info + '</dd></dl>';
                html += '   <dl><dt ' + title_style0 + '>合同租金</dt><dd class="error" ' + title_style1 + '>￥' + returnMoney(contractInfo.contractBody_Rent, 2) + '/月</dd>';
                html += '       <dt ' + title_style0 + '>付租方式</dt><dd ' + title_style1 + '>' + returnValue(contractInfo.contractBody_PayStyle) + "&nbsp;-&nbsp;" + returnValue(contractInfo.contractBody_PayType) + '</dd>';
                html += '       <dt ' + title_style0 + '>合同管家</dt><dd>' + returnValue(contractInfo.em_name) + "&nbsp;-&nbsp;" + returnValue(contractInfo.em_phone) + '</dd></dl>';
                html += '</div>';
                box.head.html(html);

                // 【布局】选项卡
                html = '';
                html += '<div class="popup-tab-draw next-bg"></div>';
                html += '<button class="popup-nav-tab" name="tab-pay-order" data-tab-select="false">支付订单</button>';
                html += '<button class="popup-nav-tab" name="tab-contract-bill" data-tab-select="false">合同账单</button>';
                box.nav.html(html);

                // 【布局】选项卡选中项数据
                popup_tab_info(box, result.data, "tab-pay-order");

                // 【事件】选项卡点击
                box.nav.find(".popup-nav-tab").off().on({
                    "mouseover": function () {
                        var _this = $(this);
                        _this.attr("data-tab-select");
                        $(this).addClass("next");
                    },
                    "mouseleave": function () {
                        $(this).removeClass("next");
                    },
                    "click": function () {
                        // ->特效
                        var _this = $(this);
                        var _name = _this.attr("name");
                        var _main_tab_name = box.main.attr("data-tab-name");
                        if (_name == _main_tab_name) return;

                        var _draw = _this.parent().find(".popup-tab-draw");
                        var _left = _this.position().left;
                        var _width = _this.outerWidth();
                        _draw.animate({left: _left, width: _width}, 100, function () {
                            box.nav.find(".popup-nav-tab").removeClass("next");
                            _this.addClass("next");
                        });

                        // ->加载数据
                        popup_tab_info(box, result.data, _name);
                    }
                });

            }).always(function () {
                $.popupRefreshClose();
            });
        },
        close: function () {
            $.table.loadData();
        }
    });
}

/* 选项卡 */
function popup_tab_info(box, _data, _selected) {
    // 订单信息
    var financeOrder = _data.financeOrder || "";
    // 合同信息
    var contractInfo = _data.contractInfo || "";
    // 收付
    var bco_balPay = financeOrder.bco_currentBalPay == 0 ? "收" : "付";

    box.main.empty();

    // 【支付订单】
    if (_selected == "tab-pay-order") {
        box.main.html(
            '<div class="pm-head">' +
            '   <div style="display: flex;">' +
            '       <button class="pm-head-btn next-bg" name="pay_order_add"><i class="fa-plus"></i>添加</button>' +
            '   </div>' +
            '   <div style="flex: 1;"></div>' +
            '   <div style="display: flex;">' +
            // <option value="1,2,3">全部</option><option value="1,2">待还款</option><option value="3">已还款</option>
            '       <select class="pm-head-selected" name="pay_order_filter"></select>' +
            '   </div>' +
            '</div>' +
            '<div class="popup-table" style="padding: 0;">' +
            '   <div class="popup-table-thead">' +
            '       <div class="popup-table-item">' +
            '          <dl>' +
            '              <dd class="list-item-type">月份</dd>' +
            '              <dd class="list-item-type">订单类型</dd>' +
            '              <dd class="list-item-title" style="flex: 1;">订单标题</dd>' +
            '              <dd class="list-item-remarks">备注</dd>' +
            '              <dd class="list-item-money">支付金额</dd>' +
            '              <dd class="list-item-status">订单状态</dd>' +
            '              <dd class="list-item-date">约定支付日</dd>' +
            '              <dd class="list-item-people">经办人</dd>' +
            '              <dd class="list-item-time">创建时间</dd>' +
            '          </dl>' +
            '       </div>' +
            '   </div>' +
            '   <div class="popup-table-tbody custom-scroll"></div>' +
            '</div>'
        );

        // 【方法】获取支付订单列表
        var get_pay_order_list = function () {
            $.ajax({
                type: "POST",
                url: "/financeManage/queryPayOrderList",
                data: {
                    bco_code: financeOrder.bco_code,
                    order_status: box.main.find("[name=pay_order_filter]>option:selected").val(),
                },
                dataType: "json",
            }).done(function (result) {
                if (result.code != 200) return $.hint.tip(result.msg);

                var orderList = result.data.orderList || "";
                var list_month = {};
                var pm_main = box.main.find(".popup-table-tbody");
                pm_main.empty();

                // ->暂无数据
                if (orderList.length == 0) pm_main.append('<div class="error" style="text-align: center;line-height: 80px;font-size: 14px;">暂无数据</div>');
                // 排序
                orderList.sort(function (a, b) { return b.order_agreed_pay_date - a.order_agreed_pay_date; });
                // ->列表
                $.each(orderList, function (index, data) {
                    list_month[order_agreed_pay_date] = order_agreed_pay_date;

                    var order_agreed_pay_date = returnDate(data.order_agreed_pay_date || data.order_create_time, "yyyy-MM");
                    var order_status = returnOrderStatus(data.order_status);
                    var order_type = returnOrderType(data.order_type);

                    var main_item = box.main.find('.popup-table-item[data-month=' + order_agreed_pay_date + ']');
                    if (main_item.length == 0) {
                        main_item = $('<div class="popup-table-item" data-month="' + order_agreed_pay_date + '"><div class="item-month-target"></div></div>').appendTo(pm_main);
                    }

                    var html =
                        '<dl class="pmm-item-unit" style="cursor: pointer;">' +
                        '   <dd class="list-item-type pay-bill-month" style="font-weight: bold">' + order_agreed_pay_date + '</dd>' +
                        '   <dd class="list-item-type ' + order_type.style + '">' + order_type.text + '</dd>' +
                        '   <dd class="list-item-title" style="flex: 1;">' + returnValue(data.order_title) + '</dd>' +
                        '   <dd class="list-item-remarks">' + returnValue(data.order_remarks) + '</dd>' +
                        '   <dd class="list-item-money">￥' + returnMoney(data.order_amount_pay, 2) + '</dd>' +
                        '   <dd class="list-item-status ' + order_status.style + '">' + order_status.text + '</dd>' +
                        '   <dd class="list-item-date">' + returnDate(data.order_agreed_pay_date) + '</dd>' +
                        '   <dd class="list-item-people">' + returnValue(data.order_operator_name) + '</dd>' +
                        '   <dd class="list-item-time">' + returnTime(data.order_create_time) + '</dd>' +
                        '</dl>';
                    var unit_box = $(html).data("data", data);
                    main_item.find(".item-month-target").after(unit_box);
                });

                box.main.find('.popup-table-item[data-month]').each(function () {
                    var pay_bill_month = $(this).find(".pay-bill-month");
                    pay_bill_month.not(pay_bill_month.first()).empty();
                });

                // 【事件】查看订单明细
                pm_main.find(".pmm-item-unit").off().on("click", function () {
                    var order_data = $(this).data("data");
                    if (isEmpty(order_data)) return;

                    $.popupSideView({
                        wh: "60%",
                        done: function (content) {
                            view_order_detail_list(content, order_data, "view");
                        },
                        close: function () {
                            if (order_data.order_status == 1 || order_data.order_status == 2) {
                                popup_tab_info(box, _data, _selected);
                            }
                        }
                    });
                });
            });
        };

        //【方法】获取支付订单权限
        var get_pay_order_power = function () {
            var head_btn = box.main.find(".pm-head-btn");
            // 添加支付订单
            var pay_order_add = box.main.find("[name=pay_order_add]")

            // 初始化
            head_btn.attr("disabled", "disabled");

            // 订单状态
            if (financeOrder.bco_optionState == 1
                || financeOrder.bco_optionState == 2
                || financeOrder.bco_optionState == 9) {
                head_btn.removeAttr("disabled");
            }
        };

        // 执行方法
        get_pay_order_list();
        get_pay_order_power();

        // 初始化数据
        box.main.find("[name=pay_order_filter]").addOptions(returnOrderStatus().list);

        // 【事件】添加支付订单
        box.main.find("[name=pay_order_add]").off().on("click", function () {
            popup_add_pay_order(box, _data, _selected);
        });

        // 【事件】筛选支付订单
        box.main.find("[name=pay_order_filter]").off().on("change", function () {
            get_pay_order_list();
        });

    }

    // 【合同账单】
    if (_selected == "tab-contract-bill") {
        // 【布局】列表
        box.main[0].innerHTML =
            '<div class="pm-head" style="border-bottom:none;">' +
            '   <div style="display: flex;">' +
            '       <dl class="pm-head-dl">' +
            '           <dt><button class="pm-head-btn next-bg" name="contract-bill-cz"><i class="fa-dedent"></i>出账</button></dt>' +
            '           <dd></dd>' +
            '       </dl>' +
            '       <dl class="pm-head-dl">' +
            '           <dt><button class="pm-head-btn next-bg" name="contract-bill-dc"><i class="fa-handshake-o"></i>代偿</button></dt>' +
            '           <dd><button class="pm-head-btn error-bg" name="contract-bill-cxdc">撤销代偿</button></dd>' +
            '       </dl>' +
            '       <dl class="pm-head-dl">' +
            '           <dt><button class="pm-head-btn next-bg" name="contract-bill-fq"><i class="fa-chain-broken"></i>分期</button></dt>' +
            '           <dd><button class="pm-head-btn error-bg" name="contract-bill-cxfq">撤销分期</button></dd>' +
            '       </dl>' +
            '       <dl class="pm-head-dl">' +
            '           <dt><button class="pm-head-btn next-bg" name="contract-bill-change"><i class="fa-exchange"></i>变更</button></dt>' +
            '           <dd></dd>' +
            '       </dl>' +
            '       ' +
            // '       <button class="pm-head-btn next-bg" name="contract-bill-edit"><i class="fa-edit"></i>编辑</button>' +
            '   </div>' +
            '   <div style="flex: 1"></div>' +
            '</div>' +
            '<div class="popup-table" style="padding: 0;">' +
            '   <div class="popup-table-thead">' +
            '       <div class="popup-table-item">' +
            '           <dl>' +
            '               <dd style="width: 40px;min-width: 40px;text-align: center;">' +
            '                   <label class="table-checkbox-box" data-type="parent" style="top: 10px;">' +
            '                       <input type="checkbox" name="popup-table-checkbox" data-type="all">' +
            '                   </label>' +
            '               </dd>' +
            '               <dd style="width: 60px;min-width: 60px;text-align: left">期数</dd>' +
            '               <dd class="list-item-type">账单类型</dd>' +
            '               <dd class="list-item-money">应' + bco_balPay + '金额</dd>' +
            '               <dd class="list-item-money">已' + bco_balPay + '金额</dd>' +
            '               <dd class="list-item-money">待' + bco_balPay + '金额</dd>' +
            '               <dd class="list-item-date">逾期天数</dd>' +
            '               <dd class="list-item-date">应' + bco_balPay + '款日期</dd>' +
            '               <dd class="list-item-date">实' + bco_balPay + '款日期</dd>' +
            '               <dd class="list-item-remarks">备注</dd>' +
            '               <dd class="list-item-status">账单状态</dd>' +
            '               <dd class="list-item-status">出账状态</dd>' +
            // '               <dd class="list-item-status">分期状态</dd>' +
            '           </dl>' +
            '       </div>' +
            '   </div>' +
            '   <div class="popup-table-tbody custom-scroll"></div>' +
            '</div>';

        //【方法】获取合同账单列表
        function get_contract_bill_list() {
            $.ajax({
                type: "POST",
                url: "/financeManage/queryContractBillList",
                data: {bco_code: financeOrder.bco_code},
                dataType: "json"
            }).done(function (result) {
                if (result.code != 200) return;

                // 账单列表
                var financeBillList = result.data.financeBillList || "";
                // 账单分期列表
                var contractBillStageList = result.data.contractBillStageList || "";

                var popup_table = box.main.find(".popup-table");

                // 【数据】获取合同账单
                var bill_cycle_list = {};
                $.each(financeBillList, function (index, data) {
                    var table_item = popup_table.find(".popup-table-item[data-cycle=" + data.bcb_cycle + "]");
                    // 账单期数
                    var bcb_cycle = returnNumber(data.bcb_cycle) == 0 ? "首" : ((returnNumber(data.bcb_cycle) < 10 ? "0" : "") + returnNumber(data.bcb_cycle));
                    // 账单状态
                    var bcb_state = returnBillState(data.bcb_state);
                    // 分期状态
                    var bcb_instalment_state = returnContractBillInstalmentState(data.bcb_instalment_state);
                    if (data.bcb_instalment_state == 2 && data.bcb_state != 3) {
                        bcb_state.text = bcb_instalment_state.text;
                    }
                    // 是否出账
                    var bcb_account_out = returnContractBillOut(data.bcb_account_out);
                    // 收支状态
                    var bcb_balPay = data.bcb_balPay == 1 ? "error" : "ok";
                    // 是否包含该期数
                    var is_having_cycle = isEmpty(bill_cycle_list[data.bcb_cycle]);
                    // 赋值期数
                    bill_cycle_list[data.bcb_cycle] = data.bcb_cycle;
                    // 已支付金额
                    var bcb_realPayment = isEmpty(data.bcb_realPayment) || data.bcb_realPayment == 0 ? "-" : returnFloat(data.bcb_realPayment, 2, true);
                    // 未支付金额
                    var bcb_balance = isEmpty(data.bcb_balance) || data.bcb_balance == 0 ? "-" : returnFloat(data.bcb_balance, 2, true);
                    // 滞纳金
                    var late_fee_title = returnNumber(data.bcb_overdueDay) > 0 ? '逾期' + returnNumber(data.bcb_overdueDay) + '天' : '';
                    late_fee_title += returnFloat(data.bcb_late_fee) > 0 ? (isEmpty(late_fee_title) ? '' : '；') + '滞纳金' + returnFloat(data.bcb_late_fee) + '元' : '';
                    // 头部期数
                    var table_item_frist = {style: 'style="margin-left: 100px;"', html: ''};
                    if (is_having_cycle) {
                        table_item = $('<div class="popup-table-item" data-cycle="' + data.bcb_cycle + '"></div>').appendTo(popup_table.find(".popup-table-tbody"));

                        table_item_frist.html =
                            '<dd class="list-item-index">' +
                            '    <label class="table-checkbox-box" style="top: 10px;">' +
                            '        <input type="checkbox" name="popup-table-checkbox" data-type="sub">' +
                            '    </label>' +
                            '</dd>' +
                            '<dd class="list-item-cycle"><span class="item-cycle ok-bg">' + bcb_cycle + '</span></dd>';
                        table_item_frist.style = "";
                    }

                    var html =
                        '<dl data-bill-type="' + data.bcb_type + '" ' + table_item_frist.style + '>' +
                        '   ' + table_item_frist.html +
                        '    <dd class="list-item-type">' + returnBillType(data.bcb_type) + '</dd>' +
                        '    <dd class="list-item-money ' + bcb_balPay + '">' + returnFloat(data.bcb_repayment, 2, true) + '</dd>' +
                        '    <dd class="list-item-money">' + bcb_realPayment + '</dd>' +
                        '    <dd class="list-item-money">' + bcb_balance + '</dd>' +
                        '    <dd class="list-item-date" title="' + late_fee_title + '">' + returnNullReplace(data.bcb_overdueDay, "-") + '<span></span></dd>' +
                        '    <dd class="list-item-date">' + returnDate(data.bcb_repaymentDate) + '</dd>' +
                        '    <dd class="list-item-date">' + returnDate(data.bcb_realPaymentDate) + '</dd>' +
                        '    <dd class="list-item-remarks" title="' + returnValue(data.bcb_remarks) + '">' + returnValue(data.bcb_remarks) + '</dd>' +
                        '    <dd class="list-item-status ' + bcb_state.style + '" >' + bcb_state.text + '</dd>' +
                        '    <dd class="list-item-status ' + bcb_account_out.style + '" >' + bcb_account_out.text + '</dd>' +
                        '</dl>';
                    $(html).appendTo(table_item).data("data", data);
                });

                // 【数据】获取合同账单分期账单
                $.each(contractBillStageList, function (index, data) {
                    var table_item = popup_table.find(".popup-table-item[data-cycle=" + data.bcb_cycle + "]");
                    // 账单状态
                    var cbs_state = returnBillState(data.cbs_status);
                    // 是否出账
                    var cbs_account_out = returnContractBillOut(data.cbs_account_out);
                    // 已支付金额
                    var cbs_realPayment = isEmpty(data.cbs_realPayment) || data.cbs_realPayment == 0 ? "-" : returnFloat(data.cbs_realPayment, 2, true);
                    // 未支付金额
                    var cbs_balance = isEmpty(data.cbs_balance) || data.cbs_balance == 0 ? "-" : returnFloat(data.cbs_balance, 2, true);
                    // 滞纳金
                    var late_fee_title = returnNumber(data.cbs_overdueDay) > 0 ? '逾期' + returnNumber(data.cbs_overdueDay) + '天' : '';
                    late_fee_title += returnFloat(data.cbs_late_fee) > 0 ? (isEmpty(late_fee_title) ? '' : '；') + '滞纳金' + returnFloat(data.cbs_late_fee) + '元' : '';

                    var html =
                        '<dl style="margin-left: 60px;">' +
                        '    <dd class="list-item-index"><label class="table-checkbox-box" style="top: 10px;"><input type="checkbox" name="popup-table-checkbox" data-type="sub"></label></dd>' +
                        '    <dd class="list-item-type next">' + data.cbs_cycle + '/' + data.cbs_cycle_total + '期</dd>' +
                        '    <dd class="list-item-money">' + returnFloat(data.cbs_repayment, 2, true) + '</dd>' +
                        '    <dd class="list-item-money">' + cbs_realPayment + '</dd>' +
                        '    <dd class="list-item-money">' + cbs_balance + '</dd>' +
                        '    <dd class="list-item-date" title="' + late_fee_title + '">' + returnNullReplace(data.cbs_overdue_day, "-") + '<span></span></dd>' +
                        '    <dd class="list-item-date">' + returnDate(data.cbs_repaymentDate) + '</dd>' +
                        '    <dd class="list-item-date">' + returnDate(data.cbs_realPaymentDate) + '</dd>' +
                        '    <dd class="list-item-remarks" title="' + returnValue(data.cbs_remarks) + '">' + returnValue(data.cbs_remarks) + '</dd>' +
                        '    <dd class="list-item-status ' + cbs_state.style + '" >' + cbs_state.text + '</dd>' +
                        '    <dd class="list-item-status ' + cbs_account_out.style + '" >' + cbs_account_out.text + '</dd>' +
                        // '    <dd class="list-item-status">--</dd>' +
                        '</dl>';
                    $(html).appendTo(table_item).data("data", data);
                });

                // 【事件】显示期数周期
                popup_table.find(".item-cycle").off().hover(function () {
                    var dl_data = $(this).parents("dl").data("data");
                    if (dl_data == null) return;
                    $(this).append('<div class="order-date-tip">' + returnValue(dl_data.bcb_dateCycle) + '</div>');
                }, function () {
                    $(this).find('.order-date-tip').remove();
                });
            });
        };

        //【方法】获取合同账单权限
        function get_contract_bill_power() {
            var head_btn = box.main.find(".pm-head-btn");
            // 出账
            var contract_bill_cz = box.main.find("[name=contract-bill-cz]")
            // 代偿
            var contract_bill_dc = box.main.find("[name=contract-bill-dc]")
            // 分期
            var contract_bill_fq = box.main.find("[name=contract-bill-fq]")
            // 撤销分期
            var contract_bill_cxfq = box.main.find("[name=contract-bill-cxfq]")
            // 变更
            var contract_bill_change = box.main.find("[name=contract-bill-change]");
            // 编辑
            var contract_bill_edit = box.main.find("[name=contract-bill-edit]");

            // 初始化
            head_btn.attr("disabled", "disabled");

            // 订单状态
            if (financeOrder.bco_optionState == 1
                || financeOrder.bco_optionState == 2
                || financeOrder.bco_optionState == 9) {
                head_btn.removeAttr("disabled");

                // 合同类型
                if (contractInfo.contractObject_Type == "托管合同") {
                    // contract_bill_change.attr("disabled", "disabled");
                }
                if (contractInfo.contractObject_Type == "租赁合同") {
                    switch (contractInfo.contractBody_PayStyle) {
                        case "月付":
                        case "季付":
                        case "半年付":
                        case "年付":
                            contract_bill_change.removeAttr("disabled");
                            break;
                        default:
                            contract_bill_change.attr("disabled", "disabled");
                            break
                    }
                }
            }
        };

        //【方法】改变账单-托管合同
        function change_bill_tg() {
            $.popupSideView({
                mode: "right",
                title: '<h3>账单变更</h3>',
                wh: "70%",
                done: function (content) {

                    // 开始日期
                    var start_date = returnDate(contractInfo.contractObject_Date);
                    // 结束日期
                    var end_date = returnDate(contractInfo.contractObject_DeadlineTime);
                    // 合同日期信息
                    var contract_date_info = start_date + "~" + end_date + "&nbsp;[" + returnBusinessYMD(start_date, end_date) + "]";
                    // 当期支付周期
                    var current_pay_cycle = 0;
                    switch (contractInfo.contractBody_PayStyle) {
                        case "月付":
                            current_pay_cycle = 1;
                            break;
                        case "季付":
                            current_pay_cycle = 3;
                            break;
                        case "半年付":
                            current_pay_cycle = 6;
                            break;
                        case "年付":
                            current_pay_cycle = 12;
                            break;
                    }

                    // 加载元素
                    content[0].innerHTML =
                        '<div class="form-box" style="display: flex;flex-direction: column;">' +
                        '   <dl class="form-view"><dt>合同类型</dt><dd>' + returnValue(contractInfo.contractObject_Type) + '</dd></dl>' +
                        '   <dl class="form-view"><dt>付款方式</dt><dd>' + returnValue(contractInfo.contractBody_PayStyle) + ' - ' + returnValue(contractInfo.contractBody_PayType) + '</dd></dl>' +
                        '   <dl class="form-view"><dt>合同期限</dt><dd>' + contract_date_info + '</dd></dl>' +
                        '   <hr>' +
                        '   <dl class="form-edit">' +
                        '       <dt>付款周期</dt>' +
                        '       <dd>' +
                        '           <select name="pay-cycle"></select>' +
                        '       </dd>' +
                        '   </dl>' +
                        '   <dl class="form-edit">' +
                        '       <dt>付款方式</dt>' +
                        '       <dd>' +
                        '           <select name="pay-way"></select>' +
                        '       </dd>' +
                        '   </dl>' +
                        '   <dl class="form-edit">' +
                        '       <dt></dt>' +
                        '       <dd>' +
                        '           <button class="next-bg" name="submit-change-bill">提交</button>' +
                        '       </dd>' +
                        '   </dl>' +
                        '   <div class="bill-list custom-scroll" style="flex: 1;">' +
                        '       <div class="bill-list-main"></div>' +
                        '   </div>' +
                        '</div>';

                    // 加载账单列表
                    function load_bill_list() {
                        var bill_list_main = content.find(".bill-list-main");
                        bill_list_main.html(
                            // '<div class="bill-list-cycle"></div>' +
                            '<ul class="first">' +
                            '    <li class="step-cycle"></li>' +
                            '    <li class="list-item-index">期数</li>' +
                            '    <li class="list-item-date">应支付日期</li>' +
                            '    <li class="list-item-money">应支付金额</li>' +
                            '    <li class="list-item-status">支付状态</li>' +
                            '    <li class="list-item-flex">分期状态</li>' +
                            '</ul>');

                        $.ajax({
                            type: "POST",
                            url: "/financeManage/queryContractBillMergeList",
                            data: {bco_code: financeOrder.bco_code},
                            dataType: "json"
                        }).done(function (result) {
                            if (result.code != 200) return;
                            // 账单列表
                            var contractBillList = result.data.contractBillList || "";

                            $.each(contractBillList, function (index, data) {
                                // 账单期数
                                var bcb_cycle = returnNumber(data.bcb_cycle) == 0 ? "首" : ((returnNumber(data.bcb_cycle) < 10 ? "0" : "") + returnNumber(data.bcb_cycle));
                                // 账单状态
                                var bcb_state = returnBillState(data.bcb_state);
                                // 分期状态
                                var bcb_instalment_state = returnContractBillInstalmentState(data.bcb_instalment_state);

                                var html =
                                    '<ul class="bill-cycle-item" data-cycle="' + data.bcb_cycle + '" data-state="' + data.bcb_state + '">' +
                                    '    <li class="step-cycle"></li>' +
                                    '    <li class="list-item-index">' + bcb_cycle + '</li>' +
                                    '    <li class="list-item-date">' + returnDate(data.bcb_repaymentDate) + '</li>' +
                                    '    <li class="list-item-money">' + returnFloat(data.bcb_repayment) + '</li>' +
                                    '    <li class="list-item-status ' + bcb_state.style + '">' + bcb_state.text + '</li>' +
                                    '    <li class="list-item-flex ' + bcb_instalment_state.style + '">' + bcb_instalment_state.text + '</li>' +
                                    '</ul>';
                                $(html).appendTo(bill_list_main).data("data", data);
                            });
                        });
                    };

                    // 计算时间月份
                    function calc_date_month(date, count) {
                        var new_date = new Date(date);
                        var cal_date = new Date(new_date.getFullYear() + "-" + (new_date.getMonth() + 1) + "-" + "01");
                        cal_date.setMonth(cal_date.getMonth() + count);
                        var cal_day = new_date.getDate();
                        if (cal_date.getMonth() + 1 == 2) {
                            var two_month_max_day = 28;
                            if (cal_date.getFullYear() % 400 == 0 || cal_date.getFullYear() % 4 == 0) {
                                two_month_max_day = 29;
                            }
                            if (new_date.getDate() > two_month_max_day) {
                                cal_day = two_month_max_day;
                            }
                        }
                        return new Date(cal_date.getFullYear() + "-" + (cal_date.getMonth() + 1) + "-" + cal_day);
                    }

                    // 获取时间月付
                    function get_date_month(start, end) {
                        var d1 = new Date(start);
                        var d2 = new Date(end);
                        return Math.abs((d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth());
                        // console.log("%s和当前日期相差%d年%d月", returnDate(start), m / 12 >> 0, m % 12);
                    }

                    // 变更付款方式
                    function change_pay_way() {
                        var pay_way = content.find("[name=pay-way]");
                        var pay_way_options = pay_way.find("option");
                        var pay_cycle_value = returnNumber(content.find("[name=pay-cycle]").val());
                        pay_way_options.not("[value=管家婆]").attr("disabled", "disabled");
                        switch (pay_cycle_value) {
                            case 1:
                                pay_way_options.removeAttr("disabled");
                                break;
                            case 3:
                                pay_way.val("管家婆");
                                break;
                            case 6:
                                pay_way.val("管家婆");
                                break;
                            case 12:
                                pay_way.val("管家婆");
                                break;
                        }
                    };

                    // 变更付款周期
                    function change_pay_cycle() {
                        content.find(".step-cycle").hide();
                        content.find(".step-cycle-item").remove();
                        content.find(".cycle-sub-box").remove();
                        content.find(".disabled-line").removeClass("disabled-line");
                        var pay_cycle = returnNumber(content.find("[name=pay-cycle]").val());
                        if (pay_cycle == 0) return;
                        change_pay_cycle_merge();
                    };

                    // 变更付款周期-合并
                    function change_pay_cycle_merge() {
                        // 所有账单
                        var bill_all_list = content.find(".bill-list-main").find(".bill-cycle-item");
                        // 已支付账单
                        var bill_paid_list = content.find(".bill-list-main").find(".bill-cycle-item[data-state=3]");
                        // 未支付账单
                        var bill_pay_list = content.find(".bill-list-main").find(".bill-cycle-item").not("[data-state=3]");
                        if (bill_paid_list.length > 0) {
                            $.hint.tip("该合同已有支付的账单，无法变更账单");
                            return;
                        }

                        $.ajax({
                            type: "POST",
                            url: "/financeManage/queryContractBillListForChange",
                            data: {
                                bco_code: financeOrder.bco_code,
                                pay_cycle: content.find("[name=pay-cycle]>option:selected").text()
                            },
                            dataType: "json",
                        }).done(function (result) {
                            if (result.code != 200) return $.hint.tip(result.msg);

                            var contractBillList = result.data.contractBillList || "";
                            var bill_json = {};
                            $.each(contractBillList, function (index, data) {
                                if (bill_json[data.bcb_cycle]) {
                                    var j2 = bill_json[data.bcb_cycle];
                                    bill_json[data.bcb_cycle] = {
                                        bcb_cycle: data.bcb_cycle,
                                        bcb_repayment: j2.bcb_repayment + data.bcb_repayment,
                                        bcb_repaymentDate: data.bcb_repaymentDate,
                                        bcb_state: data.bcb_state,
                                    };
                                } else {
                                    bill_json[data.bcb_cycle] = {
                                        bcb_cycle: data.bcb_cycle,
                                        bcb_repayment: data.bcb_repayment,
                                        bcb_repaymentDate: data.bcb_repaymentDate,
                                        bcb_state: data.bcb_state,
                                    };
                                }
                            });
                            //
                            var cycle_sub_box = $('<div class="cycle-sub-box"></div>');
                            $.each(bill_json, function (index, data) {
                                // 状态
                                var bcb_state = returnBillState(data.bcb_state);
                                var html =
                                    '<div data-sub-cycle="' + data.bcb_cycle + '">' +
                                    '    <div class="step-cycle">' +
                                    '       <div class="step-cycle-item">' +
                                    '           <span class="cycle-item-main">' + data.bcb_cycle + '</span>' +
                                    '       </div>' +
                                    '    </div>' +
                                    '    <div class="list-item-date">' + returnDate(data.bcb_repaymentDate) + '</div>' +
                                    '    <div class="list-item-money">' + returnFloat(data.bcb_repayment) + '</div>' +
                                    '    <div class="list-item-status ' + bcb_state.style + '">' + bcb_state.text + '</div>' +
                                    '    <div class="list-item-flex">--</div>' +
                                    '</div>';
                                $(html).appendTo(cycle_sub_box).data("data", data);
                            });
                            bill_pay_list.find("li").addClass("disabled-line");
                            bill_pay_list.first().before(cycle_sub_box);

                            content.find("[name=submit-change-bill]").data("bill", contractBillList);
                        });
                    };

                    // 赋值-付款周期
                    content.find("[name=pay-cycle]").addOptions({0: "请选择付款周期", 1: "月付", 3: "季付", 6: "半年付", 12: "年付"}).val(current_pay_cycle);
                    content.find("[name=pay-cycle]>option:selected").addClass("next");
                    // 赋值-付款方式
                    common.pay_way_zl(function (result) {
                        var options = {};
                        $.each(result.data, function (index, data) {
                            options[data.contractType_Name] = data.contractType_Name;
                        });
                        content.find("[name=pay-way]").addOptions(options).val(contractInfo.contractBody_PayType);
                        change_pay_way();
                    });

                    // 执行方法
                    load_bill_list();

                    // 【事件】付款周期
                    content.find("[name=pay-cycle]").off().on("change", function () {
                        change_pay_way();
                        change_pay_cycle();
                    });

                    // 【事件】付款方式
                    content.find("[name=pay-way]").off().on("change", function () {
                        change_pay_way();
                        change_pay_cycle();
                    });

                    // 【事件】提交数据
                    content.find("[name=submit-change-bill]").off().on("click", function () {
                        var _submit = $(this);
                        var pay_cycle = content.find("[name=pay-cycle]");
                        var pay_way = content.find("[name=pay-way]");

                        //
                        var pay_cycle_val = pay_cycle.find("option:selected").val();
                        var pay_cycle_text = pay_cycle.find("option:selected").text();
                        var pay_way_val = pay_way.find("option:selected").val();
                        var pay_way_text = pay_way.find("option:selected").text();
                        if (pay_cycle_text == contractInfo.contractBody_PayStyle
                            && pay_way_text == contractInfo.contractBody_PayType) return $(this).msg("该账单没有改变，无法提交");

                        var data = {};
                        data.mode = 'other';
                        data.bco_code = financeOrder.bco_code;
                        data.pay_cycle = pay_cycle_text;
                        data.pay_way = pay_way_text;
                        data.tg_bill_data = _submit.data("bill");

                        //
                        var cycle = {text: pay_cycle_text, style: contractInfo.contractBody_PayStyle == pay_cycle_text ? "" : "next"};
                        var way = {text: pay_way_text, style: contractInfo.contractBody_PayType == pay_way_text ? "" : "next"};
                        var html =
                            '<div style="line-height: 38px;">确认需要变更该合同账单吗？</div>' +
                            '<div>付款周期：<span>' + contractInfo.contractBody_PayStyle + '</span>-><span class="' + cycle.style + '">' + cycle.text + '</span></div>' +
                            '<div>付款方式：<span>' + contractInfo.contractBody_PayType + '</span>-><span class="' + way.style + '">' + way.text + '</span></div>' +
                            '<div class="error" style="margin-top: 10px;">注意：变更合同账单会删除未支付的【合同账单】、【分期账单】和相关的未支付的【支付订单】</div>';

                        $.hint.confirm(html, function () {
                            $.ajax({
                                type: "POST",
                                url: "/financeManage/updateContractBill",
                                data: JSON.stringify(data),
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                beforeSend: function () {
                                    $.hint.tip("数据提交中...", "loading");
                                }
                            }).done(function (result) {
                                if (result.code != 200) return $.hint.tip(result.msg);

                                $.hint.tip("账单变更成功", "success");

                                $.popupSideViewClose();

                                $.popupRefresh();
                            });
                        });
                    });

                }
            });
        }

        //【方法】改变账单-租赁合同
        function change_bill_zl() {
            $.popupSideView({
                mode: "right",
                title: '<h3>账单变更</h3>',
                wh: "70%",
                done: function (content) {

                    // 开始日期
                    var start_date = returnDate(contractInfo.contractObject_Date);
                    // 结束日期
                    var end_date = returnDate(contractInfo.contractObject_DeadlineTime);
                    // 合同日期信息
                    var contract_date_info = start_date + "~" + end_date + "&nbsp;[" + returnBusinessYMD(start_date, end_date) + "]";
                    // 当期支付周期
                    var current_pay_cycle = 0;
                    switch (contractInfo.contractBody_PayStyle) {
                        case "月付":
                            current_pay_cycle = 1;
                            break;
                        case "季付":
                            current_pay_cycle = 3;
                            break;
                        case "半年付":
                            current_pay_cycle = 6;
                            break;
                        case "年付":
                            current_pay_cycle = 12;
                            break;
                    }
                    // 是否为托管合同
                    var is_tg = contractInfo.contractObject_Type == "托管合同";
                    // 是否为托管合同新存房
                    var is_tg_new = is_tg && contractInfo.contractObject_ExtState == 10;

                    // 加载元素
                    content[0].innerHTML =
                        '<div class="form-box" style="display: flex;flex-direction: column;">' +
                        '   <dl class="form-view"><dt>合同类型</dt><dd>' + returnValue(contractInfo.contractObject_Type) + '</dd></dl>' +
                        '   <dl class="form-view"><dt>付款方式</dt><dd>' + returnValue(contractInfo.contractBody_PayStyle) + ' - ' + returnValue(contractInfo.contractBody_PayType) + '</dd></dl>' +
                        '   <dl class="form-view"><dt>合同期限</dt><dd>' + contract_date_info + '</dd></dl>' +
                        '   <hr>' +
                        '   <dl class="form-edit">' +
                        '       <dt>付款周期</dt>' +
                        '       <dd>' +
                        '           <select name="pay-cycle"></select>' +
                        '       </dd>' +
                        '   </dl>' +
                        '   <dl class="form-edit">' +
                        '       <dt>付款方式</dt>' +
                        '       <dd>' +
                        '           <select name="pay-way"></select>' +
                        '       </dd>' +
                        '   </dl>' +
                        '   <dl class="form-edit">' +
                        '       <dt>已付账单</dt>' +
                        '       <dd>' +
                        '           <label class="common-checkbox common-checkbox-checked" style="margin-right: 10px;"><input type="radio" name="contain-pay-bill" value="1" checked>包含</label>' +
                        '           <label class="common-checkbox"><input type="radio" name="contain-pay-bill" value="2">不包含</label>' +
                        '       </dd>' +
                        '   </dl>' +
                        '   <dl class="form-edit">' +
                        '       <dt></dt>' +
                        '       <dd>' +
                        '           <button class="next-bg" name="submit-change-bill">提交</button>' +
                        '       </dd>' +
                        '   </dl>' +
                        '   <div class="bill-list custom-scroll" style="flex: 1;">' +
                        '       <div class="bill-list-main"></div>' +
                        '   </div>' +
                        '</div>';

                    // 加载账单列表
                    var load_bill_list = function () {
                        var bill_list_main = content.find(".bill-list-main");
                        bill_list_main.html(
                            // '<div class="bill-list-cycle"></div>' +
                            '<ul class="first">' +
                            '    <li class="step-cycle"></li>' +
                            '    <li class="list-item-index">期数</li>' +
                            '    <li class="list-item-date">应支付日期</li>' +
                            '    <li class="list-item-money">应支付金额</li>' +
                            '    <li class="list-item-status">支付状态</li>' +
                            '    <li class="list-item-flex">分期状态</li>' +
                            '</ul>');

                        $.ajax({
                            type: "POST",
                            url: "/financeManage/queryContractBillMergeList",
                            data: {bco_code: financeOrder.bco_code},
                            dataType: "json"
                        }).done(function (result) {
                            if (result.code != 200) return;
                            // 账单列表
                            var contractBillList = result.data.contractBillList || "";

                            $.each(contractBillList, function (index, data) {
                                // 账单期数
                                var bcb_cycle = returnNumber(data.bcb_cycle) == 0 ? "首" : ((returnNumber(data.bcb_cycle) < 10 ? "0" : "") + returnNumber(data.bcb_cycle));
                                // 账单状态
                                var bcb_state = returnBillState(data.bcb_state);
                                // 分期状态
                                var bcb_instalment_state = returnContractBillInstalmentState(data.bcb_instalment_state);

                                var html =
                                    '<ul class="bill-cycle-item" data-cycle="' + data.bcb_cycle + '" data-state="' + data.bcb_state + '">' +
                                    '    <li class="step-cycle"></li>' +
                                    '    <li class="list-item-index">' + bcb_cycle + '</li>' +
                                    '    <li class="list-item-date">' + returnDate(data.bcb_repaymentDate) + '</li>' +
                                    '    <li class="list-item-money">' + returnFloat(data.bcb_repayment) + '</li>' +
                                    '    <li class="list-item-status ' + bcb_state.style + '">' + bcb_state.text + '</li>' +
                                    '    <li class="list-item-flex ' + bcb_instalment_state.style + '">' + bcb_instalment_state.text + '</li>' +
                                    '</ul>';
                                $(html).appendTo(bill_list_main).data("data", data);
                            });
                        });
                    };

                    // 计算时间月份
                    var calc_date_month = function (date, count) {
                        var new_date = new Date(date);
                        var cal_date = new Date(new_date.getFullYear() + "-" + (new_date.getMonth() + 1) + "-" + "01");
                        cal_date.setMonth(cal_date.getMonth() + count);
                        var cal_day = new_date.getDate();
                        if (cal_date.getMonth() + 1 == 2) {
                            var two_month_max_day = 28;
                            if (cal_date.getFullYear() % 400 == 0 || cal_date.getFullYear() % 4 == 0) {
                                two_month_max_day = 29;
                            }
                            if (new_date.getDate() > two_month_max_day) {
                                cal_day = two_month_max_day;
                            }
                        }
                        return new Date(cal_date.getFullYear() + "-" + (cal_date.getMonth() + 1) + "-" + cal_day);
                    }

                    // 获取时间月付
                    var get_date_month = function (start, end) {
                        var d1 = new Date(start);
                        var d2 = new Date(end);
                        return Math.abs((d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth());
                        // console.log("%s和当前日期相差%d年%d月", returnDate(start), m / 12 >> 0, m % 12);
                    }

                    // 变更付款周期
                    var change_pay_cycle = function () {
                        content.find(".step-cycle").hide();
                        content.find(".step-cycle-item").remove();
                        content.find(".cycle-sub-box").remove();
                        content.find(".disabled-line").removeClass("disabled-line");
                        var pay_cycle = returnNumber(content.find("[name=pay-cycle]").val());
                        if (pay_cycle == 0) return;
                        if (pay_cycle > current_pay_cycle) {
                            change_pay_cycle_merge();
                        }
                        if (pay_cycle < current_pay_cycle) {
                            change_pay_cycle_split();
                        }
                    };

                    // 变更付款周期-合并
                    var change_pay_cycle_merge = function () {
                        // 所有账单
                        var bill_all_list = content.find(".bill-list-main").find(".bill-cycle-item");
                        // 已支付账单
                        var bill_paid_list = content.find(".bill-list-main").find(".bill-cycle-item[data-state=3]");
                        // 未支付账单
                        var bill_pay_list = content.find(".bill-list-main").find(".bill-cycle-item").not("[data-state=3]");

                        // 最后支付账单数据
                        var last_paid_bill_data = bill_paid_list.last().data("data");
                        // if (last_paid_bill_data == null) {
                        //     change_pay_cycle_merge1();
                        //     return;
                        // }
                        // 第一份未支付账单
                        var first_paid_bill_data = bill_pay_list.first().data("data");
                        // 合同开始日期
                        var con_start_date = contractInfo.contractObject_Date;
                        // 合同结束日期
                        var con_end_date = contractInfo.contractObject_DeadlineTime;
                        // 月租金
                        var con_rent = contractInfo.contractBody_Rent || "";
                        // 押金
                        var money_deposit = contractInfo.contractBody_Pay || 0;
                        // 服务费
                        var money_service = contractInfo.contractBody_Service || 0;
                        // 合同月份数
                        // var con_month = get_date_month(con_start_date, con_end_date);

                        var ymd_data = returnYearMonthDayData(con_start_date, con_end_date);
                        var con_month = ymd_data.year * 12 + ymd_data.month;
                        var remainDay = ymd_data.day;
                        // 计算已支付多少月
                        var paid_month = get_date_month(con_start_date, first_paid_bill_data.bcb_repaymentDate);
                        // 支付周期
                        var pay_cycle = returnNumber(content.find("[name=pay-cycle]").val());
                        // 支付方式
                        var pay_way = content.find("[name=pay-way]").val();
                        // 是否包含已付账单
                        var is_contain = returnNumber(content.find("[name=contain-pay-bill]:checked").val()) == 1;
                        // 剩余月份
                        var balance_month = con_month - paid_month;
                        // 循环周期
                        var count = Math.ceil(balance_month / pay_cycle);
                        // 当前期数
                        var current_cycle = first_paid_bill_data.bcb_cycle;
                        // 当前日期
                        var start_date = first_paid_bill_data.bcb_repaymentDate;
                        // 状态
                        var bcb_state = first_paid_bill_data.bcb_state;
                        // 当前期数
                        var used_month = 0;
                        //
                        var bill_list = [];
                        for (var i = 0; i < count; i++) {
                            var current_month = 0;
                            var current_other_money = 0;
                            if (pay_cycle <= balance_month) {
                                current_month = pay_cycle;
                                if (i == 0 && is_contain && current_month > paid_month) {
                                    current_month -= paid_month;
                                }
                            } else {
                                current_month = balance_month;
                            }
                            if (i == 0 && last_paid_bill_data == null) {
                                current_other_money = returnFloat(money_deposit + money_service);
                            }
                            balance_month -= current_month;
                            bill_list.push({
                                bcb_cycle: current_cycle,
                                bcb_repayment: returnFloat(current_month * con_rent),
                                bcb_repaymentDate: calc_date_month(start_date, used_month),
                                bcb_other_money: current_other_money,
                                bcb_state: bcb_state,
                            });
                            used_month += current_month;
                            current_cycle++;
                        }
                        //如果有余日，最后一期计算
                        if (remainDay >0) {
                            bill_list.push({
                                bcb_cycle: current_cycle,
                                bcb_repayment: returnFloat(con_rent/30 * remainDay),
                                bcb_repaymentDate: calc_date_month(start_date, used_month),
                                bcb_other_money: current_other_money,
                                bcb_state: bcb_state,
                            });
                        }
                        //
                        var cycle_sub_box = $('<div class="cycle-sub-box"></div>');
                        $.each(bill_list, function (index, data) {
                            // 状态
                            var bcb_state = returnBillState(data.bcb_state);
                            var html =
                                '<div data-sub-cycle="' + data.bcb_cycle + '">' +
                                '    <div class="step-cycle">' +
                                '       <div class="step-cycle-item">' +
                                '           <span class="cycle-item-main">' + data.bcb_cycle + '</span>' +
                                '       </div>' +
                                '    </div>' +
                                '    <div class="list-item-date">' + returnDate(data.bcb_repaymentDate) + '</div>' +
                                '    <div class="list-item-money">' + returnFloat(data.bcb_repayment + data.bcb_other_money) + '</div>' +
                                '    <div class="list-item-status ' + bcb_state.style + '">' + bcb_state.text + '</div>' +
                                '    <div class="list-item-flex">--</div>' +
                                '</div>';
                            $(html).appendTo(cycle_sub_box).data("data", data);
                        });
                        bill_pay_list.find("li").addClass("disabled-line");
                        bill_pay_list.first().before(cycle_sub_box);
                    };

                    // 变更付款周期-合并
                    var change_pay_cycle_merge1 = function () {
                        var step_cycle = content.find(".step-cycle");
                        var pay_cycle = returnNumber(content.find("[name=pay-cycle]").val());
                        if (pay_cycle == 0) {
                            step_cycle.hide();
                            return;
                        }
                        // 初始化
                        step_cycle.show();
                        var bill_cycle_list = content.find(".bill-list-main").find(".bill-cycle-item");
                        var bill_paid_list = content.find(".bill-list-main").find(".bill-cycle-item[data-state=3]");

                        // 未支付的账单数量
                        var bill_cycle_size = bill_cycle_list.size();
                        // 已支付的账单数量
                        var bill_paid_size = bill_paid_list.size();

                        // 索引基数
                        var index_base = 1;
                        // 初始期数
                        var cycle = -1;
                        var cycle_first = true;
                        // 账单总期数
                        var count = returnNumber(bill_cycle_size * current_pay_cycle / pay_cycle);
                        if (is_tg_new) {
                            cycle++;
                            index_base++;
                            bill_cycle_size--;
                            count++;
                        }
                        // 已合并总期数
                        var merge_cycle_total = 0;
                        // 是否包含已付账单
                        var is_contain = returnNumber(content.find("[name=contain-pay-bill]:checked").val()) == 1;
                        // 遍历
                        for (var i = 0; i < count; i++) {
                            // 合并周期
                            var merge_cycle = pay_cycle / current_pay_cycle;
                            var height = merge_cycle * 35;
                            var index = merge_cycle * i + index_base;
                            if (is_contain) {
                                var j_start = i * merge_cycle;
                                var j_end = j_start + merge_cycle;
                                j_end = j_end > bill_cycle_size ? bill_cycle_size : j_end;
                                var paid_count = 0;
                                var pay_count = 0;
                                for (var j = j_start; j < j_end; j++) {
                                    var current_data = bill_cycle_list.eq(j).data("data");
                                    if (current_data.bcb_state == 3) {
                                        height -= 35;
                                        merge_cycle--;
                                        index++;
                                        cycle++;
                                        paid_count++;
                                    } else {
                                        pay_count++;
                                    }
                                }
                                if (paid_count == pay_cycle) {
                                    continue;
                                } else {
                                    cycle++;
                                }
                            } else {
                                cycle++;
                                index += bill_paid_size;
                                if (cycle_first) {
                                    cycle += bill_paid_size;
                                    cycle_first = false;
                                }
                            }
                            var balance_cycle = bill_cycle_size - bill_paid_size - merge_cycle_total;
                            if (balance_cycle < 1) {
                                continue;
                            }
                            if (balance_cycle < merge_cycle) {
                                merge_cycle = balance_cycle;
                                height = merge_cycle * 35;
                            }

                            var merge_data = {
                                bcb_cycle: cycle,
                                bcb_repaymentDate: null,
                                bcb_state: null,
                                list: []
                            };
                            for (var j = index - index_base; j < (index - index_base + merge_cycle); j++) {
                                var j_data = $(".bill-cycle-item").eq(j).data("data");
                                if (merge_data.bcb_repaymentDate == null) {
                                    merge_data.bcb_repaymentDate = j_data.bcb_repaymentDate;
                                }
                                if (merge_data.bcb_state == null) {
                                    merge_data.bcb_state = j_data.bcb_state;
                                }
                                merge_data.list.push(j);
                            }

                            if (merge_cycle == 1) {
                                var html =
                                    '<div class="step-cycle-item" style="height: ' + height + 'px">' +
                                    '    <span class="cycle-item-main">' + cycle + '</span>' +
                                    '</div>';
                                $(html).appendTo(step_cycle.eq(index)).data("data", merge_data);
                            } else {
                                var html =
                                    '<div class="step-cycle-item" style="height: ' + height + 'px">' +
                                    '    <span class="cycle-item-top"></span>' +
                                    '    <span class="cycle-item-main">' + cycle + '</span>' +
                                    '    <span class="cycle-item-bottom"></span>' +
                                    '</div>';
                                $(html).appendTo(step_cycle.eq(index)).data("data", merge_data);
                            }
                            merge_cycle_total += merge_cycle;
                        }
                    };

                    // 变更付款周期-拆分
                    var change_pay_cycle_split = function () {
                        change_pay_cycle_merge();
                        return;
                        var pay_cycle = returnNumber(content.find("[name=pay-cycle]").val());
                        if (pay_cycle == 0) {
                            content.find(".disabled-line").removeClass("disabled-line");
                            return;
                        }
                        var bill_cycle_list = content.find(".bill-list-main").find(".bill-cycle-item");

                        // 未支付的账单数量
                        var bill_cycle_size = bill_cycle_list.size();
                        // 已支付的账单数量
                        var bill_paid_size = content.find(".bill-list-main").find(".bill-cycle-item[data-state=3]").size();

                        // 剔除基数
                        var base = is_tg_new ? 1 : 0;
                        // 账单期数
                        var current_cycle = (is_tg_new ? 1 : 0) + bill_paid_size;
                        // 开始
                        var i_index = bill_paid_size + base;
                        // 账单总期数
                        var i_count = bill_cycle_size;
                        // 开始
                        var j_index = 0;
                        // 账单子总期数
                        var j_count = current_pay_cycle / pay_cycle;
                        // 押金
                        var money_deposit = contractInfo.contractBody_Pay || 0;
                        // 服务费
                        var money_service = contractInfo.contractBody_Service || 0;
                        // 租金
                        var money_rent = contractInfo.contractBody_Rent || 0;
                        // 合同开始日期
                        var con_start_date = contractInfo.contractObject_Date;
                        // 合同结束日期
                        var con_end_date = contractInfo.contractObject_DeadlineTime;
                        // 【遍历i】
                        for (var i = i_index; i < i_count; i++) {
                            var ibox = $('<div class="cycle-sub-box"></div>');
                            var icycle = bill_cycle_list.eq(i);
                            var idata = icycle.data("data");
                            // 应支付日期
                            var repaymentDate = idata.bcb_repaymentDate;
                            // 应支付金额
                            var repayment = idata.bcb_repayment;
                            // 状态
                            var bcb_state = returnBillState(idata.bcb_state);
                            // 已计算
                            var money_already = 0;
                            // 剩余金额
                            var money_balance = idata.bcb_repayment;
                            // 计算首期非租金金额
                            if (i == 0) repayment = repayment - money_deposit - money_service;
                            // 平均金额
                            var money_average = returnNumber(money_rent * pay_cycle);
                            // 首期
                            var money_first = returnFloat(repayment - money_average * (j_count - 1));
                            money_first = money_first || money_average;
                            money_first = money_first < 0 ? repayment : money_first;
                            if (i == 0) money_first += money_deposit + money_service;
                            // 【遍历j】
                            for (var j = j_index; j < j_count; j++) {
                                // 剩余金额为0，则退出循环
                                if (money_balance == 0) break;
                                // 退出
                                var out = false;
                                // 计算日期
                                var bcb_repaymentDate = new Date(con_start_date);
                                if (i == i_index && j == 0) {
                                    bcb_repaymentDate = repaymentDate;
                                } else {
                                    if (is_tg) {
                                        bcb_repaymentDate = calc_date_month(bcb_repaymentDate, (current_cycle - 1) * pay_cycle);
                                    } else {
                                        bcb_repaymentDate = calc_date_month(bcb_repaymentDate, current_cycle * pay_cycle);
                                    }
                                }

                                // 下一期日期
                                var next_date = new Date(con_start_date);
                                if (is_tg) {
                                    next_date = calc_date_month(next_date, current_cycle * pay_cycle);
                                } else {
                                    next_date = calc_date_month(next_date, (current_cycle + 1) * pay_cycle);
                                }
                                // 计算金额
                                var money = j == 0 ? money_first : money_average;
                                if (money > money_balance || money_balance < money + money_rent) {
                                    money = money_balance;
                                }
                                money_already += money;
                                money_balance -= money;

                                if (next_date.getTime() >= con_end_date) out = true;

                                var split_data = {
                                    bcb_cycle: current_cycle,
                                    bcb_repaymentDate: bcb_repaymentDate,
                                    bcb_repayment: returnFloat(money),
                                    bcb_state: idata.bcb_state,
                                };
                                var html =
                                    '<div data-sub-cycle="' + current_cycle + '">' +
                                    '    <div class="step-cycle">' +
                                    '       <div class="step-cycle-item">' +
                                    '           <span class="cycle-item-main">' + current_cycle + '</span>' +
                                    '       </div>' +
                                    '    </div>' +
                                    '    <div class="list-item-date">' + returnDate(bcb_repaymentDate) + '</div>' +
                                    '    <div class="list-item-money">' + returnFloat(money) + '</div>' +
                                    '    <div class="list-item-status ' + bcb_state.style + '">' + bcb_state.text + '</div>' +
                                    '    <div class="list-item-flex">--</div>' +
                                    '</div>';
                                $(html).appendTo(ibox).data("data", split_data);

                                // 计算周期
                                current_cycle++;

                                if (out) break;
                            }
                            icycle.after(ibox);
                            icycle.find("li").addClass("disabled-line");
                        }
                    };

                    // 变更付款方式
                    var change_pay_way = function () {
                        var pay_way = content.find("[name=pay-way]");
                        var pay_way_options = pay_way.find("option");
                        var pay_cycle_value = returnNumber(content.find("[name=pay-cycle]").val());
                        pay_way_options.not("[value=管家婆]").attr("disabled", "disabled");
                        switch (pay_cycle_value) {
                            case 1:
                                pay_way_options.removeAttr("disabled");
                                break;
                            case 3:
                                pay_way.val("管家婆");
                                break;
                            case 6:
                                pay_way.val("管家婆");
                                break;
                            case 12:
                                pay_way.val("管家婆");
                                break;
                        }
                    };

                    // 赋值-付款周期
                    content.find("[name=pay-cycle]").addOptions({0: "请选择付款周期", 1: "月付", 3: "季付", 6: "半年付", 12: "年付"}).val(current_pay_cycle);
                    content.find("[name=pay-cycle]>option:selected").addClass("next");
                    // 赋值-付款方式
                    common.pay_way_zl(function (result) {
                        var options = {};
                        $.each(result.data, function (index, data) {
                            options[data.contractType_Name] = data.contractType_Name;
                        });
                        content.find("[name=pay-way]").addOptions(options).val(contractInfo.contractBody_PayType);
                        change_pay_way();
                    });

                    // 执行方法
                    load_bill_list();

                    // 【事件】付款周期
                    content.find("[name=pay-cycle]").off().on("change", function () {
                        change_pay_way();
                        change_pay_cycle();
                    });

                    // 【事件】付款周期
                    content.find("[name=pay-way]").off().on("change", function () {
                        change_pay_way();
                        change_pay_cycle();
                    });

                    // 【事件】是否包含已付账单
                    content.find("[name=contain-pay-bill]").off().on("change", function () {
                        change_pay_cycle();
                    });

                    // 【事件】提交数据
                    content.find("[name=submit-change-bill]").off().on("click", function () {
                        var pay_cycle = content.find("[name=pay-cycle]");
                        var pay_way = content.find("[name=pay-way]");

                        //
                        var pay_cycle_val = pay_cycle.find("option:selected").val();
                        var pay_cycle_text = pay_cycle.find("option:selected").text();
                        var pay_way_val = pay_way.find("option:selected").val();
                        var pay_way_text = pay_way.find("option:selected").text();

                        var data = {};
                        data.mode = 'other';
                        if (pay_cycle_val > current_pay_cycle) {
                            data.mode = 'merge';
                        }
                        if (pay_cycle_val < current_pay_cycle) {
                            data.mode = 'split';
                        }
                        if (pay_cycle_text == contractInfo.contractBody_PayStyle && pay_way_text == contractInfo.contractBody_PayType) {
                            return $(this).msg("该账单没有改变，无法提交");
                        }

                        data.bco_code = financeOrder.bco_code;
                        data.pay_cycle = pay_cycle_text;
                        data.pay_way = pay_way_text;
                        data.split_data = [];
                        $("[data-sub-cycle]").each(function (index, self) {
                            data.split_data.push($(self).data("data"));
                        });
                        data.merge_data = [];
                        $(".step-cycle-item").each(function (index, self) {
                            if (!isEmpty($(self).data("data"))) {
                                data.merge_data.push($(self).data("data"));
                            }
                        });

                        console.log(data);

                        //
                        var cycle = {text: pay_cycle_text, style: contractInfo.contractBody_PayStyle == pay_cycle_text ? "" : "next"};
                        var way = {text: pay_way_text, style: contractInfo.contractBody_PayType == pay_way_text ? "" : "next"};
                        var html =
                            '<div style="line-height: 38px;">确认需要变更该合同账单吗？</div>' +
                            '<div>付款周期：<span>' + contractInfo.contractBody_PayStyle + '</span>-><span class="' + cycle.style + '">' + cycle.text + '</span></div>' +
                            '<div>付款方式：<span>' + contractInfo.contractBody_PayType + '</span>-><span class="' + way.style + '">' + way.text + '</span></div>' +
                            '<div class="error" style="margin-top: 10px;">注意：变更合同账单会删除未支付的【合同账单】、【分期账单】和相关的未支付的【支付订单】</div>' +
                            '';
                        $.hint.confirm(html, function () {
                            $.ajax({
                                type: "POST",
                                url: "/financeManage/updateContractBill",
                                data: JSON.stringify(data),
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                beforeSend: function () {
                                    $.hint.tip("数据提交中...", "loading");
                                }
                            }).done(function (result) {
                                if (result.code != 200) return $.hint.tip(result.msg);
                                $.hint.tip("账单变更成功", "success");
                                $.popupSideViewClose();
                                $.popupRefresh();
                            });
                        });
                    });

                }
            });
        }

        // 执行方法
        get_contract_bill_list();
        get_contract_bill_power();

        // 初始化多选框
        checkboxList("popup-table-checkbox");

        //【事件】出账
        box.main.find("[name=contract-bill-cz]").off().on("click", function () {
            var checkbox_checked = $("[name=popup-table-checkbox][data-type=sub]:checked");
            if (checkbox_checked.length != 1) return $.hint.tip("请选择一项需要出账账单");
            var check_item = checkbox_checked.parents("dl").data("data");
            if (check_item.bcb_instalment_state == 2) return $.hint.tip("已分期账单不能出账");
            if (isEmpty(check_item.cbs_code)) {
                var _money = 0;
                var _bill_count = 0;
                checkbox_checked.parents(".popup-table-item").find("dl[data-bill-type]").each(function () {
                    var dl_data = $(this).data("data");
                    if ((dl_data.bcb_state == 1 || dl_data.bcb_state == 2)) {
                        switch (dl_data.bcb_balPay) {
                            case 0:
                                _money += returnFloat(dl_data.bcb_repayment) - returnFloat(dl_data.bcb_realPayment);
                                break;
                            case 1:
                                _money -= returnFloat(dl_data.bcb_repayment) - returnFloat(dl_data.bcb_realPayment);
                                break;
                        }
                        _bill_count++;
                    }
                });
                _money = Math.abs(_money);
                if (_bill_count == 0) return $.hint.tip("仅限审核中、未支付的账单出账");

                var _cycle = check_item.bcb_cycle == 0 ? "首期" : '第' + (check_item.bcb_cycle < 10 ? '0' + check_item.bcb_cycle : check_item.bcb_cycle) + '期';

                var title = '确定需要出账该笔账单吗？<div>' + _cycle + '，金额：￥' + returnMoney(_money, 2) + '，最后还款日：' + returnDate(check_item.bcb_repaymentDate) + '</div>';
                $.hint.confirm(title, function () {
                    $.ajax({
                        type: "POST",
                        url: "/financeManage/syncPayOrder",
                        data: {
                            bco_code: check_item.bco_code,
                            bcb_cycle: check_item.bcb_cycle
                        },
                        dataType: "json",
                        beforeSend: function () {
                            $.hint.tip("账单出账中...", "loading");
                        }
                    }).done(function (result) {
                        if (result.code != 200) return $.hint.tip(result.msg);
                        $.hint.tip("账单出账成功", "success");
                        popup_tab_info(box, _data, _selected);
                    }).fail(function () {
                        $.hint.closeTip();
                    });
                });
            } else {
                var _cycle = check_item.bcb_cycle == 0 ? "首期" : '第' + (check_item.bcb_cycle < 10 ? '0' + check_item.bcb_cycle : check_item.bcb_cycle) + '期';
                var title = '确定需要出账该笔账单吗？<div>' + _cycle + '-分期' + check_item.cbs_cycle + '，金额：￥' + returnMoney(check_item.cbs_repayment, 2) + '，最后还款日：' + returnDate(check_item.cbs_repaymentDate) + '</div>';
                $.hint.confirm(title, function () {
                    $.ajax({
                        type: "POST",
                        url: "/financeManage/addPayOrderForContractStageBill",
                        data: {cbs_code: check_item.cbs_code},
                        dataType: "json",
                        beforeSend: function () {
                            $.hint.tip("账单出账中...", "loading");
                        }
                    }).done(function (result) {
                        if (result.code != 200) return $.hint.tip(result.msg);
                        $.hint.tip("账单出账成功", "success");
                        popup_tab_info(box, _data, _selected);
                    }).fail(function () {
                        $.hint.closeTip();
                    });
                });
            }
        });

        //【事件】代偿
        box.main.find("[name=contract-bill-dc]").off().on("click", function () {
            var checkbox_checked = $("[name=popup-table-checkbox][data-type=sub]:checked");
            if (checkbox_checked.length != 1) return $.hint.tip("请选择一项需要代偿的账单");

            // 代偿账单数量
            var dc_count = 0;
            // 提示列表
            var title_list = "";
            var compensatory_list = [];
            var current_data = "";

            checkbox_checked.each(function () {
                var _this_data = $(this).parents("dl").data("data");
                var _cycle = null;
                var _date = null;
                var _money = 0;
                if (_this_data.bcb_state != 9) return;
                dc_count = dc_count + 1;
                compensatory_list.push({bcb_code: _this_data.bcb_code});

                $(this).parents(".popup-table-item").find("dl").each(function () {
                    var check_item = $(this).data("data");
                    if (check_item.bcb_type == 0) current_data = check_item;

                    _money += check_item.bcb_repayment;
                    if (_cycle == null) _cycle = check_item.bcb_cycle == 0 ? "首期" : '第' + (check_item.bcb_cycle < 10 ? '0' + check_item.bcb_cycle : check_item.bcb_cycle) + '期';
                    if (_date == null) _date = returnDate(check_item.bcb_repaymentDate);
                });
                title_list += '<div>' + _cycle + '，租金：￥' + returnMoney(_money, 2) + '，最后还款日：' + _date + '</div>';
            });

            if (dc_count == 0) return $.hint.tip("没有可以代偿的账单");

            var title_main =
                '<div class="contract-confirm-content">' + title_list + '</div>';

            // 逾期天数
            var fee_day = returnDay(current_data.bcb_repaymentDate, new Date());
            fee_day = fee_day < 0 ? 0 : fee_day;

            // 滞纳金
            var fee_money = 0;
            fee_money = returnFloat(returnFloat(current_data.bcb_repayment) * 0.01 * fee_day);

            // 是否选中滞纳金
            var is_check_fee = fee_day > 0;
            var check_fee = {};
            check_fee.style = is_check_fee ? "common-checkbox-checked" : "";
            check_fee.property = is_check_fee ? "checked" : "";

            var title_foot =
                '<div class="contract-confirm-content">' +
                '   <label class="common-checkbox ' + check_fee.style + '" style="float: none;">' +
                '       <input type="checkbox" name="contract-fee" ' + check_fee.property + '>增收滞纳金，逾期天数：<span class="error">' + fee_day + '</span></span>' +
                '   </label>' +
                '   <div class="late-fee-content" style="' + (is_check_fee ? "" : "display:none") + '">' +
                '       <div style="margin-bottom: 10px">' + financeOrder.bco_cooperater + '（租金 * 1% * 天）：<label class="error">￥' + returnMoney(fee_money, 2) + '</label></div>' +
                '       <div>滞纳金：<input class="money" name="late-fee" value="' + fee_money + '" maxlength="14">&nbsp;元</div>' +
                '   </div>' +
                '</div>';

            $.hint.confirm('确定需要代偿以下账单吗？' + title_main + title_foot, function (confirm_box) {
                var is_contract_fee = confirm_box.find("[name=contract-fee]").is(":checked");
                var late_fee = is_contract_fee ? returnFloat(confirm_box.find("[name=late-fee]").val()) : 0;
                if (late_fee > current_data.bcb_repayment) {
                    confirm_box.find("[name=late-fee]").msg("滞纳金不能大于当期租金");
                    return true;
                }
                $.ajax({
                    type: "POST",
                    url: "/financeManage/updateContractBillForCompensatory",
                    data: JSON.stringify({
                        mode: "update",
                        bco_code: financeOrder.bco_code,
                        late_fee: late_fee,
                        compensatory_list: compensatory_list,
                    }),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function () {
                        $.hint.tip("数据提交中...", "loading");
                    }
                }).done(function (result) {
                    if (result.code != 200) return $.hint.tip(result.msg);
                    $.hint.tip("代偿成功", "success");
                    popup_tab_info(box, _data, _selected);
                });
            });

            $("[name=contract-fee]").off().on("click", function () {
                if (this.checked) {
                    $(".late-fee-content").show();
                    $("[name=late-fee]").select();
                } else {
                    $(".late-fee-content").hide();
                }
            });
        });

        //【事件】撤销代偿
        box.main.find("[name=contract-bill-cxdc]").off().on("click", function () {
            var checkbox_checked = $("[name=popup-table-checkbox][data-type=sub]:checked");
            if (checkbox_checked.length != 1) return $.hint.tip("请选择一项需要撤销代偿的账单");
            var check_item = checkbox_checked.parents("dl").data("data");
            if (financeOrder.bco_cooperater == "管家婆") return $.hint.tip("该账单不是代偿账单，不需要撤销代偿");
            if (check_item.bcb_state != 2) return $.hint.tip("该账单状态不需要撤销代偿");

            $.hint.confirm("确定撤销代偿吗？", function () {
                $.ajax({
                    type: "POST",
                    url: "/financeManage/updateContractBillForCompensatory",
                    data: JSON.stringify({
                        bcb_code: check_item.bcb_code,
                        mode: "revoke"
                    }),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function () {
                        $.hint.tip("数据提交中...", "loading");
                    }
                }).done(function (result) {
                    if (result.code != 200) return $.hint.tip("撤销代偿失败：" + result.msg, "error");
                    $.hint.tip("撤销代偿成功", "success");
                    popup_tab_info(box, _data, _selected);
                });
            });
        });

        //【事件】分期
        box.main.find("[name=contract-bill-fq]").off().on("click", function () {
            var checkbox_checked = $("[name=popup-table-checkbox][data-type=sub]:checked");
            if (checkbox_checked.length != 1) return $.hint.tip("请选择一项需要分期的账单");
            var checked_data = {cycle: "", total_money: 0, date: ""};
            var payment_count = 0;
            checkbox_checked.parents(".popup-table-item").find("dl[data-bill-type]").each(function () {
                var _this_data = $(this).data("data");
                if (_this_data.bcb_state == 2) payment_count += 1;
                if (_this_data.bcb_state == 5) payment_count += 1;

                // code
                checked_data.bco_code = _this_data.bco_code;
                // 期数
                checked_data.bcb_cycle = _this_data.bcb_cycle < 10 ? "0" + _this_data.bcb_cycle : _this_data.bcb_cycle;
                // 总金额：0：收，1：支
                if (_this_data.bcb_balPay == 0) {
                    checked_data.total_money += _this_data.bcb_repayment;
                }
                if (_this_data.bcb_balPay == 1) {
                    checked_data.total_money -= _this_data.bcb_repayment;
                }
                // 日期
                checked_data.start_date = returnDate(_this_data.bcb_repaymentDate);
                // 结束日期
                if (!isEmpty(_this_data.bcb_dateCycle)) {
                    var end_date = new Date(_this_data.bcb_dateCycle.split("~")[1]);
                    checked_data.end_date_old = returnDate(end_date);
                    checked_data.end_date = returnDate(end_date.setDate(end_date.getDate() + 1));
                }
            });
            checked_data.total_money = Math.abs(checked_data.total_money);
            if (payment_count == 0) return $.hint.tip("该账单状态无法分期");

            $.popupSideView({
                mode: "right",
                title: '账单分期',
                wh: "70%",
                done: function (content) {
                    var html =
                        '<div class="box-cycle">' +
                        '   <div class="box-cycle-step">' +
                        '       <div class="cycle-step-first"></div>' +
                        '       <div class="cycle-step-item"></div>' +
                        '       <div class="cycle-step-item"></div>' +
                        '   </div>' +
                        '   <div class="">' +
                        '       <dl class="material-design-dl">' +
                        '           <dt>第' + checked_data.bcb_cycle + '期账单</dt>' +
                        '           <dd>总金额：<label class="error">￥' + returnMoney(checked_data.total_money) + '</label></dd>' +
                        '           <dd>支付周期：<label class="next">' + checked_data.start_date + '~' + checked_data.end_date_old + '</label></dd>' +
                        '       </dl>' +
                        '       <div class="box-cycle-change">' +
                        '           <label class="common-checkbox common-checkbox-checked"><input type="radio" name="stages-cycle" value="2" checked>2期</label>' +
                        '           <label class="common-checkbox"><input type="radio" name="stages-cycle" value="3">3期</label>' +
                        '           <label class="common-checkbox"><input type="radio" name="stages-cycle" value="6">6期</label>' +
                        '           <label class="common-checkbox"><input type="radio" name="stages-cycle" value="12">12期</label>' +
                        '       </div>' +
                        '   </div>' +
                        '   <div class="box-cycle-list"></div>' +
                        '</div>' +
                        '<div class="box-cycle" style="margin-bottom: 20px;">' +
                        '   <dl class="material-design-dl">' +
                        '       <dt></dt>' +
                        '       <dd><button class="input-btn next-bg" name="bill-stages-save">提交</button></dd>' +
                        '   </dl>' +
                        '</div>';
                    content.html(html).addClass("custom-scroll");

                    // 最小值
                    var min_value = 50;

                    // 初始化输入框
                    var material_design_init = function () {
                        content.find(".material-design-input>input").each(function () {
                            var mdi = $(this).parent(".material-design-input");
                            if (isEmpty(this.value)) {
                                this.placeholder = mdi.attr("data-placeholder") || this.placeholder;
                                mdi.removeAttr("data-placeholder");
                            } else {
                                mdi.attr("data-placeholder", this.placeholder);
                                $(this).removeAttr("placeholder");
                            }
                        });
                    };

                    // 账单分期
                    var bill_stages = function () {
                        var box_cycle_list = content.find(".box-cycle-list");
                        var box_cycle_step = content.find(".box-cycle-step");
                        box_cycle_list.empty();
                        box_cycle_step.find(".cycle-step-item").remove();
                        var total_cycle = content.find("[name=stages-cycle]:checked").val();
                        for (var i = 1; i <= total_cycle; i++) {
                            var html =
                                '<dl class="material-design-dl">' +
                                '   <dt><span>' + i + '/' + total_cycle + '期</span></dt>' +
                                '   <dd class="material-design-input list-item-money">' +
                                '      <input class="input-money" name="cbs_repayment" data-cycle="' + i + '" placeholder="金额">' +
                                '   </dd>' +
                                '   <dd class="material-design-input list-item-date">' +
                                '      <input class="input-date" name="cbs_repaymentDate" data-cycle="' + i + '" data-min="' + checked_data.start_date + '" data-max="' + checked_data.end_date + '" readonly placeholder="支付日期">' +
                                '   </dd>' +
                                '   <dd class="material-design-input" style="flex: 1"><input name="cbs_remarks" data-cycle="' + i + '" placeholder="备注"></dd>' +
                                '</dl>';
                            box_cycle_list.append(html);
                            box_cycle_step.append('<div class="cycle-step-item"></div>');
                        }

                        // 设置金额文本框最后一个为不可输入
                        box_cycle_list.find("[name=cbs_repayment]:last").attr("disabled", "disabled");

                        // 【事件】文本框获取焦点
                        content.find(".material-design-input>input").focus(function () {
                            var mdi = $(this).parent();
                            mdi.addClass("checked");
                            if (!isEmpty($(this).val())) return;
                            mdi.attr("data-placeholder", $(this).attr("placeholder"));
                            $(this).removeAttr("placeholder");
                        });

                        // 【事件】文本框失去焦点
                        content.find(".material-design-input>input").blur(function () {
                            var mdi = $(this).parent();
                            mdi.removeClass("checked");
                            if (!isEmpty($(this).val())) return;
                            $(this).attr("placeholder", mdi.attr("data-placeholder"));
                            mdi.removeAttr("data-placeholder");
                        });

                        // 【事件】输入金额
                        content.find("[name=cbs_repayment]").off().on("input propertychange", function () {
                            // 总金额
                            var total_money = checked_data.total_money;
                            // 总期数
                            var total_cycle = returnNumber(content.find("[name=stages-cycle]:checked").val());
                            // 当前期数
                            var current_cycle = returnNumber(this.dataset.cycle);
                            // 剩余期数
                            var balance_cycle = total_cycle - current_cycle;
                            // 最小值
                            var min_money = balance_cycle * min_value;
                            // 已存在金额
                            var existed_money = 0;
                            for (var i = 1; i <= total_cycle; i++) {
                                if (i < current_cycle) {
                                    existed_money += returnFloat(content.find("[name=cbs_repayment][data-cycle=" + i + "]").val());
                                }
                            }
                            // 最大值
                            var max_money = total_money - existed_money - min_money;
                            // 当前金额
                            var current_money = returnFloat(this.value);
                            // 赋值最大值
                            if (current_money > max_money) this.value = current_money = max_money;
                            // 剩余金额=总金额-已存在金额-当前金额
                            var balance_money = total_money - existed_money - current_money;
                            for (var i = 1; i <= total_cycle; i++) {
                                if (i > current_cycle) {
                                    // 期数金额
                                    var cycle_money = 0;
                                    // 剩余平均金额
                                    var balance_average_money = returnFloat(balance_money / balance_cycle);
                                    // 除不尽
                                    if (balance_money % balance_cycle) {
                                        if (i == 1) {
                                            cycle_money = returnFloat(balance_money - balance_average_money * (balance_cycle - 1));
                                        } else {
                                            cycle_money = balance_average_money;
                                        }
                                    }
                                    // 除尽
                                    else {
                                        cycle_money = balance_average_money;
                                    }
                                    content.find("[name=cbs_repayment][data-cycle=" + i + "]").val(cycle_money);
                                }
                            }
                        });
                    };

                    // 计算分期金额
                    var cal_stages_money = function () {
                        // 开始日期
                        var start_date = checked_data.start_date;
                        // 结束日期
                        var end_date = checked_data.end_date;
                        // 总金额
                        var money_total = checked_data.total_money;
                        // 总期数
                        var total_cycle = content.find("[name=stages-cycle]:checked").val();
                        // 平均值
                        var money_average = returnFloat(money_total / total_cycle);
                        for (var i = 1; i <= total_cycle; i++) {
                            // 计算分期金额
                            var cycle_money = 0;
                            // 除不尽
                            if (money_total % total_cycle) {
                                if (i == 1) {
                                    cycle_money = returnFloat(money_total - money_average * (total_cycle - 1));
                                } else {
                                    cycle_money = money_average;
                                }
                            }
                            // 除尽
                            else {
                                cycle_money = money_average;
                            }
                            // 当前日期
                            var current_date = new Date(start_date);
                            current_date.setMonth(current_date.getMonth() + (i - 1));
                            var max_date = new Date(checked_data.end_date);
                            // 当前日期不能大于最大日期
                            if (current_date.getTime() > max_date.getTime()) current_date = max_date;

                            content.find("[name=cbs_repayment][data-cycle=" + i + "]").val(cycle_money);
                            content.find("[name=cbs_repaymentDate][data-cycle=" + i + "]").val(returnDate(current_date));
                        }

                        material_design_init();
                    };

                    // 执行方法
                    bill_stages();
                    cal_stages_money();

                    // 【事件】改变期数
                    content.find("[name=stages-cycle]").off().on("change", function () {
                        bill_stages();
                        cal_stages_money();
                    });

                    // 【事件】提交数据
                    content.find("[name=bill-stages-save]").off().on("click", function () {
                        var staging_list = [];
                        var total_cycle = content.find("[name=cbs_repayment]").length;
                        var prov_date = null;
                        var boo = true;
                        content.find("[name=cbs_repayment]").each(function () {
                            var current_cycle = $(this).attr("data-cycle");
                            var cbs_repayment = $(this);
                            var cbs_repaymentDate = content.find("[name=cbs_repaymentDate][data-cycle=" + current_cycle + "]");
                            var cbs_remarks = content.find("[name=cbs_remarks][data-cycle=" + current_cycle + "]");
                            var current_money = returnFloat(cbs_repayment.val().trim());
                            var current_date = new Date(cbs_repaymentDate.val());
                            var current_remarks = cbs_remarks.val().trim();

                            if (current_money < min_value) {
                                cbs_repayment.msg("分期金额不能小于" + min_value);
                                return boo = false;
                            }
                            if (prov_date != null && prov_date.getTime() > current_date.getTime()) {
                                cbs_repayment.msg("当期支付日期不能小于上一期支付日期");
                                return boo = false;
                            }

                            prov_date = current_date;

                            staging_list.push({
                                cbs_cycle: current_cycle,
                                cbs_cycle_total: total_cycle,
                                cbs_repayment: current_money,
                                cbs_repaymentDate: current_date,
                                cbs_remarks: current_remarks
                            });
                        });
                        if (!boo) return;

                        $.hint.confirm('确定需要分期该账单吗？', function (confirm_box) {
                            $.ajax({
                                type: "POST",
                                url: "/financeManage/addContractBillInstalment",
                                data: JSON.stringify({
                                    bco_code: checked_data.bco_code,
                                    bcb_cycle: checked_data.bcb_cycle,
                                    staging_list: staging_list,
                                }),
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                            }).done(function (result) {
                                if (result.code != 200) return $.hint.tip(result.msg);

                                $.hint.tip("分期成功", "success");

                                $.popupSideViewClose();

                                popup_tab_info(box, _data, _selected);
                            });
                        });

                    });
                }
            });
        });

        //【事件】撤销分期
        box.main.find("[name=contract-bill-cxfq]").off().on("click", function () {
            var checkbox_checked = $("[name=popup-table-checkbox][data-type=sub]:checked");
            if (checkbox_checked.length != 1) return $.hint.tip("请选择一项需要撤销分期的账单");
            var check_item = checkbox_checked.parents("dl").data("data");
            if (check_item.bcb_instalment_state != 2) return $.hint.tip("该账单没有需要撤销的分期账单");

            $.hint.confirm("确定撤销账单分期吗？", function () {
                $.ajax({
                    type: "POST",
                    url: "/financeManage/updateContractBillForInstalment",
                    data: JSON.stringify({
                        bcb_code: check_item.bcb_code
                    }),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function () {
                        $.hint.tip("数据提交中...", "loading");
                    }
                }).done(function (result) {
                    if (result.code != 200) return $.hint.tip("撤销分期失败：" + result.msg, "error");
                    $.hint.tip("撤销分期成功", "success");
                    popup_tab_info(box, _data, _selected);
                });
            });
        });

        //【事件】变更
        box.main.find("[name=contract-bill-change]").off().on("click", function () {
            if (contractInfo.contractObject_Type == "托管合同") {
                change_bill_tg();
            }
            if (contractInfo.contractObject_Type == "租赁合同") {
                change_bill_zl();
            }
        });

        //【事件】编辑
        box.main.find("[name=contract-bill-edit]").off().on("click", function () {
            var checkbox_checked = $("[name=popup-table-checkbox][data-type=sub]:checked");
            if (checkbox_checked.length != 1) return $.hint.tip("请选择一项需要出账账单");
            var check_item = checkbox_checked.parents("dl").data("data");
            if (check_item.bcb_state != 1 && check_item.bcb_state != 2) return $.hint.tip("已分期账单不能出账");
            if (check_item.bcb_instalment_state == 2) return $.hint.tip("已分期账单不能出账");

            $.popupSideView({
                mode: "right",
                title: '<h3>编辑账单</h3>',
                wh: "70%",
                done: function (content) {
                    // 开始日期
                    var start_date = returnDate(contractInfo.contractObject_Date);
                    // 结束日期
                    var end_date = returnDate(contractInfo.contractObject_DeadlineTime);
                    // 合同日期信息
                    var contract_date_info = start_date + "~" + end_date + "&nbsp;[" + returnBusinessYMD(start_date, end_date) + "]";
                    // 当期支付周期
                    var current_pay_cycle = 0;
                    switch (contractInfo.contractBody_PayStyle) {
                        case "月付":
                            current_pay_cycle = 1;
                            break;
                        case "季付":
                            current_pay_cycle = 3;
                            break;
                        case "半年付":
                            current_pay_cycle = 6;
                            break;
                        case "年付":
                            current_pay_cycle = 12;
                            break;
                    }
                    // 是否为托管合同
                    var is_tg = contractInfo.contractObject_Type == "托管合同";
                    // 是否为托管合同新存房
                    var is_tg_new = is_tg && contractInfo.contractObject_ExtState == 10;

                    // 加载元素
                    content[0].innerHTML =
                        '<div class="form-box" style="display: flex;flex-direction: column;">' +
                        '   <dl class="form-view"><dt>合同类型</dt><dd>' + returnValue(contractInfo.contractObject_Type) + '</dd></dl>' +
                        '   <dl class="form-view"><dt>付款方式</dt><dd>' + returnValue(contractInfo.contractBody_PayStyle) + ' - ' + returnValue(contractInfo.contractBody_PayType) + '</dd></dl>' +
                        '   <dl class="form-view"><dt>合同期限</dt><dd>' + contract_date_info + '</dd></dl>' +
                        '   <hr>' +
                        '   <dl class="form-edit">' +
                        '       <dt>付款周期</dt>' +
                        '       <dd>' +
                        '           <select name="pay-cycle"></select>' +
                        '       </dd>' +
                        '   </dl>' +
                        '   <dl class="form-edit">' +
                        '       <dt>付款方式</dt>' +
                        '       <dd>' +
                        '           <select name="pay-way"></select>' +
                        '       </dd>' +
                        '   </dl>' +
                        '   <dl class="form-edit">' +
                        '       <dt>已付账单</dt>' +
                        '       <dd>' +
                        '           <label class="common-checkbox common-checkbox-checked" style="margin-right: 10px;"><input type="radio" name="contain-pay-bill" value="1" checked>包含</label>' +
                        '           <label class="common-checkbox"><input type="radio" name="contain-pay-bill" value="2">不包含</label>' +
                        '       </dd>' +
                        '   </dl>' +
                        '   <dl class="form-edit">' +
                        '       <dt></dt>' +
                        '       <dd>' +
                        '           <button class="next-bg" name="submit-change-bill">提交</button>' +
                        '       </dd>' +
                        '   </dl>' +
                        '   <div class="bill-list custom-scroll" style="flex: 1;">' +
                        '       <div class="bill-list-main"></div>' +
                        '   </div>' +
                        '</div>';

                    // 【事件】是否包含已付账单
                    content.find("[name=contain-pay-bill]").off().on("change", function () {
                        change_pay_cycle();
                    });
                }
            });
        });
    }
}

/* 显示订单明细列表 */
function view_order_detail_list(content, order_data, mode) {

    // 【方法】编辑订单明细
    var edit_order_detail_info = function (content, edit_mode, item_data, mode, orderDetailList) {
        item_data = item_data || "";
        var title = isEmpty(item_data) ? "添加" : "编辑";
        var si_main_info = content.find(".si-main-info");
        var is_lock = $.cookie("orderPayLock") != "unlock";

        // 【元素】
        var html =
            '<h2 style="padding-bottom: 10px;">' + title + '</h2>' +
            '<dl><dt>明细类型</dt><dd><select name="detail_type"></select></dd></dl>' +
            '<dl><dt>明细标题</dt><dd><input name="product_name" maxlength="10" placeholder="明细标题"></dd></dl>' +
            '<dl><dt>消费金额</dt>' +
            '   <dd><input class="money" name="product_price" placeholder="消费金额" maxlength="14"></dd>' +
            '   <dd style="width: 34px;">' +
            '       <div class="input-lock">' +
            '           <label class="lock fa-lock next"><input type="checkbox" name="order-price-lock" checked></label>' +
            '       </div>' +
            '   </dd>' +
            '</dl>' +
            '<dl><dt>支付金额</dt><dd><input class="money" name="detail_subtotal" placeholder="支付金额" maxlength="14"></dd><dd style="width: 34px;"></dd></dl>' +
            '<dl><dt>备注</dt><dd><textarea name="detail_remarks" placeholder="备注"></textarea></dd></dl>' +
            '<dl><dt></dt>' +
            '   <dd>' +
            '       <button class="next-bg" name="detail-submit">保存</button>' +
            '       <button class="error-bg" name="detail-cancel">取消</button>' +
            '   </dd>' +
            '</dl>' +
            '';
        si_main_info.html(html);

        var detail_type = si_main_info.find("[name=detail_type]");
        var product_name = si_main_info.find("[name=product_name]");
        var product_price = si_main_info.find("[name=product_price]");
        var order_price_lock = si_main_info.find("[name=order-price-lock]");
        var detail_subtotal = si_main_info.find("[name=detail_subtotal]");
        var detail_remarks = si_main_info.find("[name=detail_remarks]");

        // 锁定|解锁
        if (is_lock) {
            order_price_lock.attr("checked", "checked").parent().addClass("fa-lock").removeClass("fa-unlock");
            detail_subtotal.attr("disabled", "disabled");
        } else {
            order_price_lock.removeAttr("checked").parent().addClass("fa-unlock").removeClass("fa-lock");
        }

        // 【赋值】
        $.each(returnDetailType3().list, function (key, value) {
            var option_style = "";
            if (key != 1) {
                $.each(orderDetailList, function (index, data) {
                    if (key == data.detail_type) {
                        option_style = "disabled";
                    }
                });
            }
            detail_type.append('<option value="' + key + '" ' + option_style + '>' + value + '</option>')
        });

        // 添加|编辑
        if (isEmpty(item_data)) {
            detail_type.val(2);
            product_name.val(returnValue(detail_type.find("option:selected").text()));
            product_price.focus();
        } else {
            detail_type.val(returnNumber(item_data.detail_type));
            product_name.val(returnValue(item_data.product_name));
            product_price.val(returnFloat(item_data.product_price)).focus();
            detail_subtotal.val(returnFloat(item_data.detail_subtotal));
            detail_remarks.val(returnValue(item_data.detail_remarks));
        }

        switch (edit_mode) {
            case "add":
                detail_type.find("option[value=1]").attr("disabled", "disabled");
                break;
            case "edit":
            case "edit_limit":
                // 明细类型
                detail_type.attr("disabled", "disabled");
                if (edit_mode == "edit_limit") {
                    // 明细标题
                    product_name.attr("disabled", "disabled");
                    // 消费金额
                    product_price.attr("disabled", "disabled");
                    // 支付金额
                    detail_subtotal.attr("disabled", "disabled");
                    // 锁定
                    order_price_lock.attr("disabled", "disabled")
                }
                break;
        }

        // 【事件】选择明细类型
        detail_type.off().on("change", function () {
            switch (returnNumber(this.value)) {
                case 1:
                    product_name.val("");
                    break;
                default:
                    product_name.val($(this).find("option:selected").text());
                    break;
            }
        });

        // 【事件】锁定消费金额与支付金额
        order_price_lock.off().on("change", function () {
            // 锁定
            if (this.checked) {
                order_price_lock.parent().addClass("fa-lock").removeClass("fa-unlock");
                detail_subtotal.val(product_price.val());
                detail_subtotal.attr("disabled", "disabled");
                $.cookie("orderPayLock", "lock", {expires: 7});
            }
            // 解锁
            else {
                order_price_lock.parent().addClass("fa-unlock").removeClass("fa-lock");
                detail_subtotal.removeAttr("disabled");
                $.cookie("orderPayLock", "unlock", {expires: 7});
            }
        });

        // 【事件】输入消费金额同步支付金额
        product_price.off().on("keyup", function () {
            if (order_price_lock[0].checked) detail_subtotal.val(this.value);
        });

        // 【事件】提交数据
        si_main_info.find("[name=detail-submit]").off().on("click", function () {
            if (isEmpty(order_data.order_sn)) return $.hint.tip("参数错误，请刷新重试或联系管理员");
            if (isEmpty(product_name.val())) return product_name.msg("请输入明细标题");
            if (isEmpty(product_price.val())) return product_price.msg("请输入消费金额");

            $.ajax({
                type: "POST",
                url: "/financeManage/submitDetailInfo",
                data: {
                    jsonStr: JSON.stringify({
                        detail_id: item_data.detail_id,
                        order_sn: order_data.order_sn,
                        detail_type: detail_type.val(),
                        product_name: product_name.val(),
                        product_price: product_price.val(),
                        detail_subtotal: detail_subtotal.val(),
                        detail_remarks: detail_remarks.val()
                    })
                },
                dataType: "json",
            }).done(function (result) {
                if (result.code != 200) return $.hint.tip(result.msg, "error");
                $.hint.tip("保存成功", "success");
                view_order_detail_list(content, order_data, mode);
            });
        });

        // 【事件】取消编辑
        si_main_info.find("[name=detail-cancel]").off().on("click", function () {
            si_main_info.empty();
        });
    };

    $.ajax({
        type: "POST",
        url: "/financeManage/queryOrderInfo",
        data: {order_sn: order_data.order_sn},
        dataType: "json",
    }).done(function (result) {
        if (result.code != 200) return $.hint.tip(result.msg);

        // 订单信息
        const orderInfo = result.data.orderInfo || "";
        // 流水信息
        const orderBill = result.data.orderBill || "";
        // 订单明细
        const orderDetailList = result.data.orderDetailList || "";
        // ->流水状态
        const order_status = returnOrderStatus(orderInfo.order_status);

        var html =
            '<div class="side-item-head">' +
            '   <div class="si-head-title">' +
            '       ' + orderInfo.order_title +
            '       <span id="si-subtitle"></span>' +
            '       <div class="title-tip">No.' + orderInfo.order_sn + '</div>' +
            '   </div>' +
            '   <div class="si-head-subtitle">' +
            '       <button class="next-bg-w fa-refresh" name="order-refresh"></button>' +
            '   </div>' +
            '   <div class="si-head-option sih-option-view">' +
            // '       <button class="next-bg-w" name="order-edit"><i class="fa-edit"></i>编辑</button>' +
            '       <button class="next-bg" name="order-pay"><i class="fa-paypal"></i>支付</button>' +
            '       <button class="next-bg" name="order-print"><i class="fa-print"></i>打印</button>' +
            '   </div>' +
            '   <div class="si-head-option sih-option-edit" style="display: none;">' +
            '       <button class="ok-bg" name="order-done"><i class="fa-gavel"></i>完成</button>' +
            '   </div>' +
            '   <div class="si-head-option sih-option-pay" style="display: none;">' +
            '       <button class="error-bg" name="order-cancel"><i class="fa-remove"></i>取消</button>' +
            '   </div>' +
            '</div>' +
            '<div class="side-item-tip">' +
            '   <label>订单状态：<span class="' + order_status.style + '">' + order_status.text + '</span></label>' +
            '   <label>应支付日期：<span>' + returnDate(orderInfo.order_agreed_pay_date) + '</span></label>' +
            '   <label>订单备注：<span>' + returnNullReplace(orderInfo.order_remarks, "无") + '</span></label>' +
            '   <br>' +
            '   <label>订单金额：<span>￥' + returnMoney(orderInfo.detail_amount_total, 2) + '</span></label>' +
            '   <label>优惠金额：<span class="error">-￥' + returnMoney(orderInfo.detail_amount_coupon, 2) + '</span></label>' +
            '   <label>支付金额：<span class="next">￥' + returnMoney(orderInfo.order_amount_pay, 2) + '</span></label>' +
            '   <br>' +
            '   <label class="tip_pay_time" style="display: none;">支付日期：<span>' + returnDate(orderBill.bill_pay_time) + '</span></label>' +
            '   <label class="tip_pay_type" style="display: none;">支付方式：<span>' + returnValue(orderBill.bill_pay_channel) + '</span></label>' +
            '   <label class="tip_pay_remarks" style="display: none;">支付备注：<span>' + returnValue(orderBill.bill_remarks) + '</span></label>' +
            '</div>' +
            '<div class="side-item-main">' +
            '   <div class="si-main-list">' +
            '       <table>' +
            '           <thead>' +
            '               <tr>' +
            '                   <td name="mode-view" style="width: 36px;text-align: center;">#</td>' +
            '                   <td name="mode-edit" style="width: 36px;text-align: center;">#</td>' +
            '                   <td class="list-item-title">明细标题</td>' +
            '                   <td class="list-item-type">明细类型</td>' +
            '                   <td class="list-item-money">消费金额</td>' +
            '                   <td class="list-item-money">支付金额</td>' +
            '                   <td>明细备注</td>' +
            '                   <td class="list-item-people">经办人</td>' +
            '                   <td class="list-item-time">创建时间</td>' +
            '                   <td name="mode-edit" style="width: 50px;text-align: center;">操作</td>' +
            '               </tr>' +
            '           </thead>' +
            '           <tbody id="side-order-list"></tbody>' +
            '       </table>' +
            '       <button class="option-add ok-bg" name="order-add"><i class="fa-plus"></i></button>' +
            '   </div>' +
            '   <div class="si-main-info"></div>' +
            '</div>' +
            '<div class="side-item-pay"></div>' +
            '';
        content.html(html);

        $.each(orderDetailList, function (index, data) {
            var detail_subtotal = {style: "", text: ""};
            var product_price = {style: "", text: ""};
            switch (data.detail_type) {
                case 1:
                case 17:
                    detail_subtotal.text = "￥" + returnMoney(data.detail_subtotal, 2);
                    product_price.text = "￥" + returnMoney(data.product_price, 2);
                    break;
                default:
                    detail_subtotal.style = "error";
                    detail_subtotal.text = "-￥" + returnMoney(data.product_price, 2);
                    product_price.style = "error";
                    product_price.text = "-￥" + returnMoney(data.product_price, 2);
                    break;
            }
            var detail_type = returnDetailType(data.detail_type);
            var is_edit = data.detail_operator > 0 || data.detail_type != 1;
            var option_auth = is_edit ? "" : "disabled";

            var html =
                '<tr class="order-list-item" style="border-bottom: 1px solid #ddd;">' +
                '   <td name="mode-view" style="width: 36px;text-align: center;">' + (index + 1) + '</td>' +
                '   <td name="mode-edit" style="width: 36px;text-align: center;">' +
                '       <button class="fa-minus-circle error" name="order-item-remove" ' + option_auth + ' style="font-size: 18px;cursor: pointer;background: none;"></button>' +
                '   </td>' +
                '   <td class="list-item-title">' + returnValue(data.product_name) + '</td>' +
                '   <td class="list-item-type ' + detail_type.style + '">' + detail_type.text + '</td>' +
                '   <td class="list-item-money ' + product_price.style + '" style="text-decoration: line-through;">' + product_price.text + '</td>' +
                '   <td class="list-item-money ' + detail_subtotal.style + '">' + detail_subtotal.text + '</td>' +
                '   <td title="' + returnValue(data.detail_remarks) + '"><div class="list-item-remarks">' + returnValue(data.detail_remarks) + '</div></td>' +
                '   <td class="list-item-people">' + returnValue(data.detail_operator_name) + '</td>' +
                '   <td class="list-item-time">' + returnTime(data.detail_create_time) + '</td>' +
                '   <td name="mode-edit" style="width: 50px;text-align: center;">' +
                '       <button class="fa-edit next" name="order-item-edit" data-mode="' + (is_edit ? "edit" : "edit_limit") + '" style="font-size: 16px;cursor: pointer;background: none;"></button>' +
                '   </td>' +
                '</tr>';
            $(html).appendTo("#side-order-list").data("data", data);

            var json_detail = JSON.parse(data.product_detail || "{}") || "";
            $("#si-subtitle").html(isEmpty(json_detail.bcb_cycle_date) ? "" : '[&nbsp;' + returnValue(json_detail.bcb_cycle_date) + '&nbsp;]').css({fontWeight: "normal", fontSize: "14px"});
        });

        content.find("[name=order-edit]").hide();
        content.find("[name=order-pay]").hide();
        content.find("[name=order-print]").hide();

        // ->判断模式
        switch (mode) {
            case "view":
            // content.find(".sih-option-edit").hide();
            // content.find(".sih-option-view").hide().slideDown("fast");
            // content.find("[name=mode-view]").show();
            // content.find("[name=mode-edit]").hide();
            // content.find("[name=order-add]").hide();
            // break;
            case "edit":
                // content.find("[name=mode-view]").hide();
                // content.find("[name=mode-edit]").show();
                // content.find("[name=order-add]").show();
                // content.find(".sih-option-view").hide();
                // content.find(".sih-option-edit").hide().slideDown("fast");

                content.find(".sih-option-view").show();
                content.find(".sih-option-edit").hide();
                content.find("[name=mode-view]").hide();
                content.find("[name=mode-edit]").show();
                content.find("[name=order-add]").show();
                break;
            case "pay":
                content.find(".sih-option-view").hide();
                content.find(".sih-option-pay").hide().slideDown("fast");
                $(".side-item-main").hide();
                var side_item_pay = $(".side-item-pay");

                var html =
                    '<dl><dt>支付金额</dt>' +
                    '    <dd class="error" style="font-weight: bold">￥' + returnMoney(orderInfo.order_amount_pay, 2) + '</dd>' +
                    '</dl>' +
                    '<dl class="order-pay-type"><dt>支付方式</dt>' +
                    '    <dd style="display: flex;padding-top: 3px;">' +
                    '       <label class="switch" style="margin-right: 10px;">' +
                    '           <input type="checkbox" name="switch" checked>' +
                    '           <span class="switch-on">线上付款</span>' +
                    '           <span class="switch-off">线下付款</span>' +
                    '       </label>' +
                    '       <select id="pay-channel1" name="order-pay-online">' +
                    '           <option value="">请选择</option>' +
                    '           <option value="支付宝">支付宝</option>' +
                    '           <option value="微信">微信</option>' +
                    '       </select>' +
                    '       <select id="pay-channel2" name="order-pay-offline" style="display: none;margin-right: 10px;">' +
                    '           <option value="">选择支付方式</option>' +
                    '           <option value="支付宝转账">支付宝转账</option>' +
                    '           <option value="微信转账">微信转账</option>' +
                    '           <option value="银行卡转账">银行卡转账</option>' +
                    '           <option value="现金付款">现金付款</option>' +
                    '       </select>' +
                    '       <select id="pay-channel3" name="order-pay-bank" style="display: none;">' +
                    '           <option value="">选择银行卡</option>' +
                    '           <option value="工行 [ 6222****9976 ]">工行 [ 6222****9976 ]</option>' +
                    '           <option value="工行 [ 3100****5665 ]">工行 [ 3100****5665 ]</option>' +
                    '           <option value="建行 [ 6227****1787 ]">建行 [ 6227****1787 ]</option>' +
                    '           <option value="建行 [ 6236****3217 ]">建行 [ 6236****3217 ]</option>' +
                    '           <option value="农行 [ 6228****7879 ]">农行 [ 6228****7879 ]</option>' +
                    '           <option value="农行 [ 3106****4832 ]">农行 [ 3106****4832 ]</option>' +
                    '       </select>' +
                    '    </dd>' +
                    '</dl>' +
                    '<dl class="order-pay-date" style="display: none;"><dt>支付日期</dt>' +
                    '    <dd><input name="order-pay-date" placeholder="支付日期" value="' + returnDate(new Date()) + '" onfocus="WdatePicker()"></dd>' +
                    '</dl>' +
                    '<dl class="order-pay-remarks" style="display: none;"><dt>支付备注</dt>' +
                    '    <dd><textarea name="order-pay-remarks" placeholder="备注" ></textarea></dd>' +
                    '</dl>' +
                    '<dl class="order-pay-status" style="display: none;"><dt>支付状态</dt>' +
                    '    <dd class="' + order_status.style + '">' + order_status.text + '</dd>' +
                    '</dl>' +
                    '<!--确认支付-->' +
                    '<dl class="order-pay-btn"><dt></dt>' +
                    '    <dd><button class="next-bg" name="order-confirm-pay">确认支付</button></dd>' +
                    '</dl>' +
                    '<!--二维码支付-->' +
                    '<dl class="order-pay-code" style="display: none;">' +
                    '   <dt></dt>' +
                    '   <dd style="margin-top: 8px;">' +
                    '      <div class="qrcode-content"></div>' +
                    '      <div class="qrcode-tip"></div>' +
                    '      <div class="qrcode-subtip"></div>' +
                    '   </dd>' +
                    '</dl>' +
                    '';
                side_item_pay.html(html).show();

                switch (orderInfo.order_status) {
                    // 审核中|待支付
                    case 1:
                    case 2:
                        side_item_pay.find(".order-pay-type").show();
                        side_item_pay.find(".order-pay-status").hide();
                        break;
                    // 已支付
                    case 3:
                        side_item_pay.find(".order-pay-status").show();
                        side_item_pay.find(".order-pay-type").hide();
                        side_item_pay.find(".order-pay-btn").hide();
                        side_item_pay.find(".order-pay-code").hide();
                        break;
                    // 已关闭
                    case 4:
                        side_item_pay.find(".order-pay-status").show();
                        side_item_pay.find(".order-pay-type").hide();
                        side_item_pay.find(".order-pay-btn").hide();
                        side_item_pay.find(".order-pay-code").hide();
                        break;
                }

                // 【方法】二维码清除
                var qrcode_clean = function () {
                    var order_pay_code = side_item_pay.find(".order-pay-code");
                    var qrcode_content = order_pay_code.find(".qrcode-content");
                    var qrcode_tip = order_pay_code.find(".qrcode-tip");
                    var qrcode_subtip = order_pay_code.find(".qrcode-subtip");
                    qrcode_content.empty();
                    qrcode_tip.empty();
                    qrcode_subtip.empty();
                };

                // 【方法】提交支付
                var submit_pay = function (param, callback) {
                    $.ajax({
                        type: "POST",
                        url: "/financeManage/submitPay",
                        data: {
                            order_sn: orderInfo.order_sn,
                            pay_channel: param.pay_channel
                        },
                        dataType: "json",
                    }).done(function (result) {
                        if (result.code != 200) return $.hint.tip(result.msg, "error");
                        // 请求二维码支付
                        callback(result.data.orderBill.bill_sn);
                    }).error(function () {
                        $.hint.tip("请求服务器失败", "error");
                    });
                };

                // 【事件】线上\线下开关
                side_item_pay.find("[name=switch]").off().on("click", function () {
                    var parent_switch = $(this).parents(".switch");
                    var switch_on = parent_switch.find(".switch-on");
                    var switch_off = parent_switch.find(".switch-off");

                    qrcode_clean();
                    // 线上支付|线下支付
                    if (this.checked) {
                        switch_on.animate({left: "0"});
                        switch_off.animate({left: "100%"});
                        $("#pay-channel3").hide().val("");
                        $("#pay-channel2").hide().val("");
                        $("#pay-channel1").show().val("");
                        side_item_pay.find(".order-pay-date").hide();
                        side_item_pay.find(".order-pay-remarks").hide();
                    } else {
                        switch_on.animate({left: "-100%"});
                        switch_off.animate({left: "0"});
                        $("#pay-channel3").hide();
                        $("#pay-channel1").hide();
                        $("#pay-channel2").show().val("");
                        side_item_pay.find(".order-pay-date").show();
                        side_item_pay.find(".order-pay-btn").show();
                        side_item_pay.find(".order-pay-remarks").show();
                        side_item_pay.find(".order-pay-code").hide();
                    }
                });

                // 【事件】支付方式选择
                side_item_pay.find("[name=order-pay-online],[name=order-pay-offline]").off().on("change", function () {
                    var task_time = 2 * 1000;
                    var task_done_time = 2 * 1000;

                    // 【方法】请求二维码支付
                    var request_rqcode_pay = function (bill_sn) {
                        var order_pay_code = side_item_pay.find(".order-pay-code");
                        var qrcode_content = order_pay_code.find(".qrcode-content");
                        var qrcode_tip = order_pay_code.find(".qrcode-tip");
                        var qrcode_subtip = order_pay_code.find(".qrcode-subtip");
                        $.ajax({
                            type: "post",
                            url: "/appPage/order/requestRqcodePay",
                            data: {bill_sn: bill_sn},
                            dataType: "json",
                            beforeSend: function () {
                                qrcode_content.html('<div class="loading" style="border: 1px solid #ddd;"></div>');
                            }
                        }).done(function (result) {
                            if (result.code != 200) return $.hint.tip(result.msg);
                            var data = result.data;

                            qrcode_clean();

                            qrcode_content.qrcode({
                                render: "canvas",
                                ecLevel: 'H',
                                fill: '#000',
                                background: '#ffffff',
                                quiet: 2,
                                width: 160,
                                height: 160,
                                text: data.qr_code,
                            });

                            // 判断支付方式
                            switch (data.result_pay_channel) {
                                case "支付宝":
                                    qrcode_content.append('<img class="logo" src="/resources/image/appPage/pay/pay_logo_zfb.png">');
                                    qrcode_tip.html('请打开支付宝扫码付款');
                                    // qrcode_subtip.html('120s后自动刷新二维码');
                                    interval_count = 0;
                                    response_rqcode_pay_result(bill_sn);
                                    break;
                                case "微信":
                                    qrcode_content.append('<img class="logo" src="/resources/image/appPage/pay/pay_logo_wx.png">');
                                    qrcode_tip.html('请打开微信扫码付款');
                                    // qrcode_subtip.html('120s后自动刷新二维码');
                                    interval_count = 0;
                                    response_rqcode_pay_result(bill_sn);
                                    break;
                                default:
                                    view_order_detail_list(content, order_data, mode);
                                    break;
                            }
                        }).error(function () {
                            $.hint.tip("请求服务器失败", "error");
                        });
                    };

                    // 【方法】响应二维码支付结果
                    var response_rqcode_pay_result = function (bill_sn) {
                        clearInterval(interval);
                        interval = setInterval(function () {
                            interval_count++;
                            if (interval_count > 40) return clearInterval(interval);
                            // 查询支付结果
                            $.ajax({
                                type: "POST",
                                url: "/appPage/order/queryPayResult",
                                data: {bill_sn: bill_sn},
                                dataType: "json"
                            }).done(function (result) {
                                // 支付成功
                                if (result.code == 200) {
                                    // 关闭任务
                                    clearInterval(interval);
                                    $.hint.tip("支付成功", "success");
                                    view_order_detail_list(content, order_data, "view");
                                }
                                // 支付关闭
                                else if (result.code == 300) {
                                    clearInterval(interval);
                                    view_order_detail_list(content, order_data, mode);
                                }
                            });
                        }, task_time);
                    };

                    var pay_channel = $(this).find("option:selected").val();

                    switch (pay_channel) {
                        case "支付宝":
                        case "微信":
                            side_item_pay.find(".order-pay-bank").hide();
                            side_item_pay.find(".order-pay-btn").hide();
                            qrcode_clean();
                            side_item_pay.find(".order-pay-code").show().find(".qrcode-content").html('<div class="loading" style="border: 1px solid #ddd;"></div>');
                            submit_pay({
                                pay_channel: pay_channel
                            }, function (bill_sn) {
                                request_rqcode_pay(bill_sn);
                            });
                            break;
                        default:
                            side_item_pay.find(".order-pay-code").hide();
                            side_item_pay.find(".order-pay-btn").show();
                            side_item_pay.find("[name=order-pay-bank]").hide();
                            if (pay_channel == "银行卡转账") side_item_pay.find("[name=order-pay-bank]").show().val("");
                            break;
                    }
                });

                // 【事件】确认支付
                side_item_pay.find("[name=order-confirm-pay]").off().on("click", function () {
                    var order_pay_online = side_item_pay.find("[name=order-pay-online]");
                    var order_pay_offline = side_item_pay.find("[name=order-pay-offline]");
                    var order_pay_bank = side_item_pay.find("[name=order-pay-bank]");

                    var pay_channel_online = order_pay_online.find("option:selected");
                    var pay_channel_offline = order_pay_offline.find("option:selected");
                    var pay_bank = order_pay_bank.find("option:selected");
                    var pay_date = side_item_pay.find("[name=order-pay-date]");
                    var pay_remarks = side_item_pay.find("[name=order-pay-remarks]");

                    if (order_pay_online.is(":visible") && isEmpty(pay_channel_online.val())) return order_pay_online.msg("请选择支付方式");
                    if (order_pay_offline.is(":visible") && isEmpty(pay_channel_offline.val())) return order_pay_offline.msg("请选择支付方式");
                    if (order_pay_bank.is(":visible") && isEmpty(pay_bank.val())) return order_pay_bank.msg("请选择银行卡");
                    if (pay_date.is(":visible") && isEmpty(pay_date.val())) return pay_date.msg("请选择支付日期");

                    // 提交支付
                    submit_pay({
                        pay_channel: order_pay_offline.val()
                    }, function (bill_sn) {
                        $.ajax({
                            type: "POST",
                            url: "/financeManage/requestPay",
                            data: {
                                bill_sn: bill_sn,
                                pay_date: pay_date.val(),
                                pay_remarks: pay_remarks.val()
                            },
                            dataType: "json",
                            beforeSend: function () {
                                side_item_pay.find("[name=order-confirm-pay]").attr("disabled", "disabled");
                            }
                        }).done(function (result) {
                            if (result.code != 200) return $.hint.tip(result.msg);
                            $.hint.tip("支付成功", "success");
                            view_order_detail_list(content, order_data, "view");
                        }).always(function () {
                            side_item_pay.find("[name=order-confirm-pay]").removeAttr("disabled");
                        });
                    });
                });

                break;
        }

        // ->判断状态
        switch (orderInfo.order_status) {
            // 审核|待还款
            case 1:
            case 2:
                // 编辑按钮
                content.find("[name=order-edit]").show();
                // 支付按钮
                content.find("[name=order-pay]").show();
                break;
            // 已还款
            case 3:
                // 打印按钮
                content.find("[name=order-print]").show();
                // 支付方式
                content.find(".tip_pay_type").show();
                // 支付时间
                content.find(".tip_pay_time").show();
                // 备注
                content.find(".tip_pay_remarks").show();

                content.find("[name=mode-view]").show();
                content.find("[name=mode-edit]").hide();
                content.find("[name=order-add]").hide();
                break;
            // 已关闭
            case 4:
                content.find("[name=mode-view]").show();
                content.find("[name=mode-edit]").hide();
                content.find("[name=order-add]").hide();
                break;
        }

        // 【事件】刷新订单
        content.find("[name=order-refresh]").off().on("click", function () {
            view_order_detail_list(content, order_data, mode);
        });

        // 【事件】编辑订单
        content.find("[name=order-edit]").off().on("click", function () {
            view_order_detail_list(content, order_data, "edit");
        });

        // 【事件】打印订单
        content.find("[name=order-print]").off().on("click", function () {
            publicMethods.printPayOrder(orderInfo.order_sn);
        });

        // 【事件】支付订单
        content.find("[name=order-pay]").off().on("click", function () {
            view_order_detail_list(content, order_data, "pay");
        });

        // 【事件】取消支付
        content.find("[name=order-cancel]").off().on("click", function () {
            view_order_detail_list(content, order_data, "view");
        });

        // 【事件】添加订单
        content.find("[name=order-add]").off().on("click", function () {
            edit_order_detail_info(content, "add", null, mode, orderDetailList);
        });

        // 【事件】完成编辑
        content.find("[name=order-done]").off().on("click", function () {
            view_order_detail_list(content, order_data, "view");
        });

        // 【事件】删除订单明细
        content.find("[name=order-item-remove]").off().on("click", function () {
            var item_data = $(this).parents(".order-list-item").data("data");
            $.hint.confirm("确定删除该订单明细吗？", function () {
                $.ajax({
                    type: "POST",
                    url: "/financeManage/deleteDetailInfo",
                    data: {
                        detail_id: item_data.detail_id
                    },
                    dataType: "json",
                }).done(function (result) {
                    if (result.code != 200) return $.hint.tip(result.msg, "error");
                    $.hint.tip("删除成功", "success");
                    view_order_detail_list(content, order_data, mode);
                });
            });
        });

        // 【事件】订单明细编辑
        content.find("[name=order-item-edit]").off().on("click", function () {
            var edit_mode = $(this).attr("data-mode");
            edit_order_detail_info(content, edit_mode, $(this).parents(".order-list-item").data("data"), mode, orderDetailList);
        });
    });
};

/* 弹出层-添加支付订单 */
function popup_add_pay_order(box, _data, _selected) {
    // 订单信息
    var financeOrder = _data.financeOrder || "";
    $.popupSideView({
        mode: "right",
        title: '<div>添加支付订单</div><button name=""></button>',
        wh: "70%",
        done: function (content) {
            content.css({display: "block", overflowX: "hidden"}).addClass("custom-scroll");

            // 【方法】初始化表单
            var init_form = function () {
                content.find("[name=detail_type]").empty();
                $.each(returnDetailType2().list, function (key, value) {
                    var option_style = "";
                    if (key != 1) {
                        $("#detail-list-body").find("tr").each(function () {
                            var tr_data = $(this).data("data");
                            if (key == tr_data.detail_type) {
                                option_style = "disabled";
                            }
                        });
                    }
                    content.find("[name=detail_type]").append('<option value="' + key + '" ' + option_style + '>' + value + '</option>')
                });
                content.find("[name=product_price]").val("").focus();
                content.find("[name=product_name]").val("");
                content.find("[name=detail_subtotal]").val("");
                content.find("[name=detail_remarks]").val("");
            };

            // 【方法】计算订单金额
            var cal_order_amount = function () {
                var detail_amount_total = 0;
                var order_total_amount = 0;
                $("#detail-list-body").find("tr").each(function () {
                    var item_data = $(this).data("data");
                    switch (item_data.detail_balpay) {
                        case 1:
                            detail_amount_total += returnFloat(item_data.product_price);
                            order_total_amount += returnFloat(item_data.detail_subtotal);
                            break;
                        case 2:
                            detail_amount_total -= returnFloat(item_data.product_price);
                            order_total_amount -= returnFloat(item_data.detail_subtotal);
                            break;
                    }
                });
                content.find(".order-info").html('消费金额：<strong>￥' + returnMoney(detail_amount_total, 2) + '</strong>，支付金额：<strong>￥' + returnMoney(order_total_amount, 2)) + '</strong>';
            };

            var html =
                '<div class="popup-list popup-form" style="padding: 10px;">' +
                '   <dl><dt>订单类型</dt><dd><select name="order_type"></select></dd></dl>' +
                '   <dl><dt>订单标题</dt><dd><input name="order_title" placeholder="订单标题" maxlength="16"></dd></dl>' +
                '   <dl><dt>约定支付日期</dt><dd><input name="order_agreed_pay_date" placeholder="约定支付日期" onfocus="new WdatePicker()"></dd></dl>' +
                '   <dl><dt>备注</dt><dd><textarea name="order_remarks" placeholder="备注"></textarea></dd></dl>' +
                '   <fieldset class="order-add-detail">' +
                '       <legend>订单明细</legend>' +
                '       <!--订单明细列表-->' +
                '       <div class="oa-detail-list">' +
                '           <table>' +
                '               <thead>' +
                '                   <tr>' +
                '                       <td name="mode-view" style="width: 36px;text-align: center;">#</td>' +
                '                       <td class="list-item-type">类型</td>' +
                '                       <td class="list-item-title">标题</td>' +
                '                       <td class="list-item-money">消费金额</td>' +
                '                       <td class="list-item-money">支付金额</td>' +
                '                       <td>备注</td>' +
                '                   </tr>' +
                '               </thead>' +
                '               <tbody id="detail-list-body"></tbody>' +
                '               <tfoot><tr><td colspan="6"><div class="order-info" style="line-height: 30px;color: #000;"></div></td></tr></tfoot>' +
                '           </table>' +
                '       </div>' +
                '       <!--添加订单明细-->' +
                '       <div class="oa-detail-option">' +
                '           <button class="oad-option-add ok-bg" name="order-add" data-mode="hide"><i class="fa-plus"></i></button>' +
                '           <div class="oad-option-content" style="display: none;">' +
                '               <dl><dt>明细类型</dt><dd><select name="detail_type"></select></dd>' +
                '                   <dt style="margin-left: 24px">消费金额</dt>' +
                '                   <dd><input class="money" name="product_price" placeholder="消费金额" maxlength="14"></dd>' +
                '                   <dd style="width: 24px;">' +
                '                      <div class="input-lock">' +
                '                          <label class="lock fa-lock"><input type="checkbox" name="order-price-lock" checked></label>' +
                '                      </div>' +
                '                   </dd>' +
                '               </dl>' +
                '               <dl><dt>明细标题</dt><dd><input name="product_name" placeholder="明细标题" maxlength="10"></dd>' +
                '                   <dt style="margin-left: 24px">支付金额</dt><dd><input class="money" name="detail_subtotal" placeholder="支付金额" maxlength="14"></dd></dl>' +
                '               <dl><dt>备注</dt><dd style="margin-bottom: 0;"><textarea name="detail_remarks" placeholder="备注"></textarea></dd></dl>' +
                '               <button class="oad-option-done ok-bg" name="order-done">保存订单明细</button>' +
                '           </div>' +
                '       </div>' +
                '   </fieldset>' +
                '   <dl style="margin-top: 10px;"><dt></dt><dd><button class="next-bg" name="order_submit">提交</button></dd></dl>' +
                '</div>' +
                '';
            content.html(html);

            // 【赋值】
            content.find("[name=order_type]").addOptions(returnOrderType().list).val(3).attr("disabled", "disabled");
            content.find("[name=order_agreed_pay_date]").val(returnDate(new Date()));

            // 【事件】添加明细
            content.find("[name=order-add]").off().on("click", function () {
                var parent = $(this).parent();
                // var btn_done = content.find("[name=order-done]");
                switch (this.dataset.mode) {
                    case "hide":
                        parent.find(".oad-option-content").show();
                        this.dataset.mode = "show";
                        // btn_done.animate({opacity: 1, right: "50px"}, 300);
                        $(this).css({transform: "rotate(45deg)"}).removeClass("ok-bg").addClass("error-bg");
                        content.find("[name=order_submit]").hide();
                        break;
                    case "show":
                        parent.find(".oad-option-content").hide();
                        this.dataset.mode = "hide";
                        // btn_done.animate({opacity: 0, right: "0"}, 300);
                        $(this).css({transform: "rotate(0deg)"}).removeClass("error-bg").addClass("ok-bg");
                        content.find("[name=order_submit]").show();
                        break;
                }
                if (this.dataset.mode == "show") {
                    // 初始化数据
                    init_form();

                    var order_price_lock = content.find("[name=order-price-lock]");
                    var detail_subtotal = content.find("[name=detail_subtotal]");
                    var product_price = content.find("[name=product_price]");

                    // 是否锁定
                    var is_lock = $.cookie("orderPayLock") != "unlock";
                    // 锁定
                    if (is_lock) {
                        order_price_lock.attr("checked", "checked").parent().addClass("fa-lock").removeClass("fa-unlock");
                        detail_subtotal.attr("disabled", "disabled");
                    }
                    // 解锁
                    else {
                        order_price_lock.removeAttr("checked").parent().addClass("fa-unlock").removeClass("fa-lock");
                    }

                    // 【事件】锁定消费金额与支付金额
                    order_price_lock.off().on("change", function () {
                        // 锁定
                        if (this.checked) {
                            order_price_lock.parent().addClass("fa-lock").removeClass("fa-unlock");
                            detail_subtotal.val(product_price.val());
                            detail_subtotal.attr("disabled", "disabled");
                            $.cookie("orderPayLock", "lock", {expires: 7});
                        }
                        // 解锁
                        else {
                            order_price_lock.parent().addClass("fa-unlock").removeClass("fa-lock");
                            detail_subtotal.removeAttr("disabled");
                            $.cookie("orderPayLock", "unlock", {expires: 7});
                        }
                    });

                    // 【事件】输入消费金额同步支付金额
                    product_price.off().on("keyup", function () {
                        if (order_price_lock[0].checked) detail_subtotal.val(this.value);
                    });
                }
            });
            // 【事件】保存明细
            content.find("[name=order-done]").off().on("click", function () {
                var data = {};
                data.detail_type = returnNumber(content.find("[name=detail_type]").val());
                data.product_price = content.find("[name=product_price]").val();
                data.product_name = content.find("[name=product_name]").val();
                data.detail_subtotal = content.find("[name=detail_subtotal]").val();
                data.detail_remarks = content.find("[name=detail_remarks]").val();
                var balpay = "";
                switch (data.detail_type) {
                    case 1:
                        data.detail_balpay = 1;
                        break;
                    default:
                        data.detail_balpay = 2;
                        balpay = "-";
                        break;
                }

                if (isEmpty(data.product_price)) return content.find("[name=product_price]").msg("请输入消费金额");
                if (isEmpty(data.product_name)) return content.find("[name=product_name]").msg("请输入明细标题");
                if (isEmpty(data.detail_subtotal)) return content.find("[name=detail_subtotal]").msg("请输入支付金额");

                var detail_type = returnDetailType(data.detail_type);
                var html =
                    '<tr>' +
                    '   <td name="mode-view" style="width: 36px;text-align: center;">' +
                    '       <button class="fa-minus-circle error" name="order-item-remove" style="font-size: 18px;cursor: pointer;background: none;"></button>' +
                    '   </td>' +
                    '    <td class="list-item-type ' + detail_type.style + '">' + detail_type.text + '</td>' +
                    '    <td class="list-item-title">' + data.product_name + '</td>' +
                    '    <td class="list-item-money" style="text-decoration: line-through;">' + balpay + '￥' + returnMoney(data.product_price, 2) + '</td>' +
                    '    <td class="list-item-money">' + balpay + '￥' + returnMoney(data.detail_subtotal, 2) + '</td>' +
                    '    <td>' + data.detail_remarks + '</td>' +
                    '</tr>' +
                    '';
                var detail_tr = $(html).appendTo("#detail-list-body");
                detail_tr.data("data", data);

                // 【事件】删除订单明细
                detail_tr.find("[name=order-item-remove]").off().on("click", function () {
                    $(this).parents("tr").remove();
                    // 计算订单金额
                    cal_order_amount();
                });

                // 计算订单金额
                cal_order_amount();

                // 初始化数据
                init_form();
            });
            // 【事件】提交数据
            content.find("[name=order_submit]").off().on("click", function () {
                var request_data = {};
                request_data.bco_code = financeOrder.bco_code;
                request_data.order_type = content.find("[name=order_type]").val();
                request_data.order_title = content.find("[name=order_title]").val();
                request_data.order_agreed_pay_date = content.find("[name=order_agreed_pay_date]").val();
                request_data.order_remarks = content.find("[name=order_remarks]").val();
                request_data.detail_list = [];

                var order_total_amount = 0;
                $("#detail-list-body").find("tr").each(function () {
                    var item_data = $(this).data("data");
                    switch (item_data.detail_balpay) {
                        case 1:
                            order_total_amount += item_data.detail_subtotal;
                            break;
                        case 2:
                            order_total_amount -= item_data.detail_subtotal;
                            break;
                    }
                    request_data.detail_list.push(item_data);
                });

                if (isEmpty(request_data.order_title)) return content.find("[name=order_title]").msg("请输入订单标题");
                if (isEmpty(request_data.order_agreed_pay_date)) return content.find("[name=order_agreed_pay_date]").msg("请选择约定支付日期");
                if (request_data.detail_list.length == 0) return content.find("[name=order-add]").msg("请添加至少一项订单明细");
                if (order_total_amount < 0) return content.find("[name=order-add]").msg("订单总金额不能小于0");

                $.ajax({
                    type: "POST",
                    url: "/financeManage/addOrder",
                    data: JSON.stringify(request_data),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                }).done(function (result) {
                    if (result.code != 200) return $.hint.tip(result.msg);
                    $.hint.tip("添加支付订单成功", "success");
                    $.popupSideViewClose();
                    $.popupRefresh();
                });
            });

        }
    });
}

//---------------------------------------------------

/* 同步支付订单 */
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

function exportData() {
    window.open('/financeManage/exportContractOrderData?' + $.param($.table.getRequestParam()));
}
