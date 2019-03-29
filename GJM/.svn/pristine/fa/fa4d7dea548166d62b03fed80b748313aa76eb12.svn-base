var submitBillList = null;
var bco_type = 202;
var billTypeList = {};
var payStating = "";
$(function () {
    loadData();
    getBillTypeList();
});

/**
 * 获取账单类型列表
 */
function getBillTypeList() {
    $.get("/financeManage/getBillTypeList", function (result) {
        billTypeList = result.list;
    }, "json");
}

/**
 * 加载订单
 */
function loadData(param, bools) {
    $("#content").table({
        search: true,
        selectBool: true,
        dataBool: bools,
        selectClick: viewBill,
        dataTime: [
            {
                name: "还款日期",
                string: "bco_currentDate"
            },
            {
                name: "订单日期",
                string: "bco_createTime"
            }
        ],
        title: [
            {
                name: "序号",
                string: "bco_id",
                parameter: ""
            },
            {
                name: "小区房号",
                string: "house_address",
                rightDiv: "<label class='table-item-icon error-bg' title='逾期'>逾<span style='padding:0 2px'>?bco_currentOverDay&</span>天<label>",
                parameter: "",
                href: "/houseLibrary/jumpHouseInfo&hi_code"
            },
            {
                name: "合同编号",
                string: "contractObject_No",
                rightDiv: "<input type='hidden' name='contractObject_dateDiff' value='?contractObject_dateDiff&'/>",
                parameter: "",
                href: "/contractObject/jumpDisplayContract&contractObject_No"
            },
            {
                name: "合同状态",
                string: "contractObject_State",
                parameter: {
                    1: "审核",
                    2: "生效",
                    3: "失效",
                    4: "作废",
                }
            },
            {
                name: "客户信息",
                string: "bco_customerName",
                string1_prefix: "/",
                string1: "bco_customerPhone",
                parameter: ""
            },
            {
                name: "支付方式",
                string: "contractBody_PayStyle",
                parameter: "",
            },
            {
                name: "收款机构",
                string: "bco_cooperater",
                parameter: ""
            },
            {
                name: "已还期数",
                string: "bco_currentCycle",
                parameter: ""
            },
            {
                name: "当期金额",
                string: "bco_currentPayment",
                parameter: ""
            },
            {
                name: "总金额",
                string: "bco_totalPayment",
                parameter: ""
            },
            {
                name: "应还款日期",
                string: "bco_currentDate",
                parameter: "",
                format: "yyyy-MM-dd"
            },
            {
                name: "订单状态",
                string: "bco_optionState",
                parameter: {
                    1: "待审核",
                    2: "待还款",
                    3: "完结",
                    4: "取消",
                    9: "金融还款",
                    10: "转租",
                    11: "退租",
                    12: "解约",
                    13: "清退",
                    14: "代偿"
                }
            },
            {
                name: "管家信息",
                string: "bco_empName",
                string1_prefix: "/",
                string1: "bco_empPhone",
                parameter: ""
            },
            {
                name: "归属部门",
                string: "ucc_name",
                parameter: ""
            }
        ],
        url: "/financeManage/selectOrderList",
        data: param || {"bco_type": bco_type, "bco_optionState": 2},
        success: function (result) {
            // 数据渲染
            $(result).find('table.personTable tbody tr').each(function () {
                // 合同超期渲染
                var contractObject_No = $(this).find("td[data-text='contractObject_No']");
                var ymd = parseInt($(contractObject_No).find("input[name='contractObject_dateDiff']").val());
                if (ymd < 0) {
                    $(contractObject_No).append('<span class="table-item-icon error-bg" title="超期' + Math.abs(ymd) + '天">超&nbsp;' + Math.abs(ymd) + '</span>');
                }
                if (ymd <= 31 && ymd > 0) {
                    $(contractObject_No).append('<span class="table-item-icon ok-bg" title="还有' + Math.abs(ymd) + '天到期">到&nbsp;' + Math.abs(ymd) + '</span>');
                }
                if (ymd == 0) {
                    $(contractObject_No).append('<span class="table-item-icon next-bg" title="该合同今日到期，请及时处理">今日到期</span>');
                }
                // 合同状态渲染
                var contractObject_State = $(this).find("td[data-text='contractObject_State']");
                $(contractObject_State).addClass(returnContractStateClass($(contractObject_State).html()));
                // 订单状态渲染
                var bco_optionState = $(this).find("td[data-text='bco_optionState']");
                $(bco_optionState).addClass(returnStateClassByName($(bco_optionState).html()));
                // 完结订单处理
                if ($(bco_optionState).html() == '完结') {
                    $(this).find("td[data-text='bco_currentPayment']").html("--");
                    $(this).find("td[data-text='bco_currentDate']").html("--");
                }
            });
            // 搜索栏
            if (bools == null) {
                $(result).find("#searchOrderType,#searchContractState,#searchPayStyle,#searchPartner,#searchOptionState,#searchDepartment").remove();
                var li = "<li>" +
                    "<select class='form-control' id='searchOrderType' onchange='searchOrderType(this)'>" +
                    "<option value='202'>租赁订单</option>" +
                    "<option value='201'>托管订单</option>" +
                    "</select>" +
                    "</li>" +
                    "<li>" +
                    "<select class='form-control' id='searchContractState' onchange='searchContractState(this)'>" +
                    "<option value=''>合同状态</option>" +
                    "<option value='1'>审核</option>" +
                    "<option value='2'>生效</option>" +
                    "<option value='3'>失效</option>" +
                    "<option value='4'>作废</option>" +
                    "</select>" +
                    "</li>" +
                    "<li>" +
                    "<select class='form-control' id='searchPayStyle' onchange='searchPayStyle(this)' style='width:98px'>" +
                    "<option value=''>支付方式</option>" +
                    "<option value='月付'>月付</option>" +
                    "<option value='季付'>季付</option>" +
                    "<option value='半年付'>半年付</option>" +
                    "<option value='年付'>年付</option>" +
                    "</select>" +
                    "</li>" +
                    "<li>" +
                    "<select class='form-control' id='searchPartner' onchange='searchPartner(this)' style='width:98px'>" +
                    "<option value=''>收款机构</option>" +
                    "<option value='管家婆'>管家婆</option>" +
                    "<option value='乐首付'>乐首付</option>" +
                    "<option value='58分期'>58分期</option>" +
                    "<option value='会分期'>会分期</option>" +
                    "<option value='租了么'>租了么</option>" +
                    "</select>" +
                    "</li>" +
                    "<li>" +
                    "<select class='form-control' id='searchOptionState' onchange='searchOptionState(this)'>" +
                    "<option value=''>订单状态</option>" +
                    "<option value='1'>待审核</option>" +
                    "<option value='2' selected='selected'>待还款</option>" +
                    "<option value='3'>已完结</option>" +
                    "<option value='4'>已取消</option>" +
                    "<option value='-1'>已退房</option>" +
                    "</select>" +
                    "</li>" +
                    "<li>" +
                    "<select class='form-control' id='searchDepartment' onchange='searchDepartment(this)'>" +
                    "<option value=''>归属部门</option>" +
                    "</select>" +
                    "</li>";
                $(result).find(".tools .searchBar").append(li);
                // 加载部门列表
                $.ajax({
                    type: "POST",
                    url: "/user/saleDepartment",
                    data: {},
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        var html = "";
                        $(result.company).each(function (index, item) {
                            html += "<option value='" + item.ucc_id + "'>" + item.ucc_name + "</option>";
                        });
                        $("#searchDepartment").append(html);
                    }
                });
            }
        }
    });
}

/**
 * 查看租赁账单
 * @param id 订单id
 */
function viewBill(ids) {
    // 若没有数据，则先加载数据
    var _this = $(ids).next();
    if ($(_this).html() == '') {
        dataList(ids);
    }
    // 控制账单信息DIV显示跟隐藏
    if ($(_this).is(":hidden")) {
        // 显示前隐藏其他兄弟节点，保证弹出层只有一个
        $(_this).siblings('.viewBill').hide();
        $(_this).show();
    }
    else {
        $(_this).hide();
    }
}

/**
 * 读取数据
 *
 * */
function dataList(ids) {
    var zName = $(ids).find("td[data-text='bco_customerName']").text();
    var house = $(ids).find("td[data-text='house_address']").text();
    var partner = $(ids).find("td[data-text='bco_cooperater']").text();
    var bco_id = $(ids).find("label[data-id]").attr('data-id');
    var _this = $(ids).next();
    var _colspan = $(ids).children().size();
    $.post(
        "/financeManage/selectBillList",
        {"bco_id": bco_id},
        function (result) {
            var tbody = "";
            var newIndex = -1;
            var dates = "";
            var money = 0;
            for (var i = 0; i < result.list.length; i++) {
                var bcb = result.list[i];
                if (newIndex == -1) {
                    if ((bcb.bcb_type == -1 || bcb.bcb_type == 11) && bcb.bcb_state == 2) {
                        newIndex = bcb.bcb_cycle;
                        dates = format(bcb.bcb_repaymentDate, 'yyyy-MM-dd');
                        money = (bcb.bcb_repayment - bcb.bcb_realPayment).toFixed(2);
                    }
                }
                tbody += "<tr onclick='billTrClick(this)'>" +
                    "<td data-text='bcb_id'><label class='checkbox-bill' data-cycle='" + bcb.bcb_cycle + "' data-date='[" + format(bcb.bcb_repaymentDate, 'yyyy-MM-dd') + "~" + format(bcb.repaymentEndDate, 'yyyy-MM-dd') + "]'><input type='checkbox' class='input_check' name='billId' /><span></span></label></td>" +
                    "<td data-text='bcb_cycle'><span class='item-index'>" + returnValue(bcb.bcb_cycle) + "</span></td>" +
                    "<td data-text='bcb_type' style='color:#f16d60'>" + parseBillType(bcb.bcb_type) + "</td>" +
                    "<td data-text='bcb_state' class='" + returnStateClass(bcb.bcb_state) + "'>" + returnState(bcb.bcb_state, bcb.bco_cooperater) + "</td>" +
                    "<td data-text='bcb_repayment' data-money='" + returnFloat(bcb.bcb_repayment) + "'>" + returnFloat(bcb.bcb_repayment) + "</td>" +
                    "<td data-text='bcb_realPayment'>" + returnFloat(bcb.bcb_realPayment) + "</td>" +
                    "<td data-text='bcb_balance'>" + returnFloat(bcb.bcb_balance) + "</td>" +
                    "<td data-text='bcb_repaymentDate'>" + format(bcb.bcb_repaymentDate, 'yyyy-MM-dd') + "</td>" +
                    "<td data-text='bcb_realPaymentDate'>" + format(bcb.bcb_realPaymentDate, 'yyyy-MM-dd') + "</td>" +
                    "<td data-text='bcb_remarks'>" + returnValue(bcb.bcb_remarks) + "</td>" +
                    "<td data-text='bcb_operation'><button class='fa-reorder' onclick='flodChildBill(this," + bcb.bcb_cycle + ")'></button></td>"
                "</tr>";
                // 加载子table
                for (var j = 0; j < bcb.childs.length; j++) {
                    var child = bcb.childs[j];
                    var upBill = "";
                    if (returnState(child.bcb_state, child.bco_cooperater) == "待还款") {
                        upBill = "<i class='fa-pencil' onclick='editBill(this)'></i>";
                    }
                    if (parseBillType(child.bcb_type) == "综合" || parseBillType(child.bcb_type) == "租金" || parseBillType(child.bcb_type) == "往期结余" || parseBillType(child.bcb_type) == "往期欠费" || returnValue(child.bcb_state) == "已还款") {
                        tbody += "<tr class='childBill' data-id='" + child.bcb_id + "' data-cycle='" + bcb.bcb_cycle + "'>" +
                            "<td>" + upBill + "</td>" +
                            "<td></td>" +
                            "<td data-text='bcb_type' data-repay='" + returnValue(child.bcb_isRepay) + "'>" + parseBillType(child.bcb_type) + "</td>" +
                            "<td data-text='bcb_state' class='" + returnStateClass(child.bcb_state) + "'>" + returnState(child.bcb_state, child.bco_cooperater) + "</td>" +
                            "<td data-text='bcb_repayment'><input type='text' style='background: transparent;' value='" + returnFloat(child.bcb_repayment) + "' readonly='readonly' /></td>" +
                            "<td data-text='bcb_realPayment'>" + returnFloat(child.bcb_realPayment) + "</td>" +
                            "<td data-text='bcb_balance'>" + returnFloat(child.bcb_balance) + "</td>" +
                            "<td data-text='bcb_repaymentDate'><input type='text' onfocus='WdatePicker()' style='background: transparent;' value='" + format(child.bcb_repaymentDate, 'yyyy-MM-dd') + "' readonly='readonly' /></td>" +
                            "<td data-text='bcb_realPaymentDate'>" + format(child.bcb_realPaymentDate, 'yyyy-MM-dd') + "</td>" +
                            "<td data-text='bcb_remarks'><input type='text' style='background: transparent;' value='" + returnValue(child.bcb_remarks) + "' readonly='readonly' /></td>" +
                            "<td data-text='bcb_operation'><button class='button1' style='display:none;' onclick='submitBill(this)'>确定</button></td>"
                        "</tr>";
                    }
                    else {
                        tbody += "<tr class='childBill' data-id='" + child.bcb_id + "' data-cycle='" + bcb.bcb_cycle + "'>" +
                            "<td>" + upBill + "</td>" +
                            "<td></td>" +
                            "<td data-text='bcb_type' data-repay='" + returnValue(child.bcb_isRepay) + "'>" + parseBillType(child.bcb_type) + "</td>" +
                            "<td data-text='bcb_state' class='" + returnStateClass(child.bcb_state) + "'>" + returnState(child.bcb_state, child.bco_cooperater) + "</td>" +
                            "<td data-text='bcb_repayment'><input type='text' style='background: transparent;' value='" + returnFloat(child.bcb_repayment) + "' readonly='readonly' /></td>" +
                            "<td data-text='bcb_realPayment'>" + returnFloat(child.bcb_realPayment) + "</td>" +
                            "<td data-text='bcb_balance'>" + returnFloat(child.bcb_balance) + "</td>" +
                            "<td data-text='bcb_repaymentDate'><input type='text' onfocus='WdatePicker()' style='background: transparent;' value='" + format(child.bcb_repaymentDate, 'yyyy-MM-dd') + "' readonly='readonly' /></td>" +
                            "<td data-text='bcb_realPaymentDate'>" + format(child.bcb_realPaymentDate, 'yyyy-MM-dd') + "</td>" +
                            "<td data-text='bcb_remarks'><input type='text' style='background: transparent;' value='" + returnValue(child.bcb_remarks) + "' readonly='readonly' /></td>" +
                            "<td data-text='bcb_operation'><button class='button1' style='display:none;' onclick='submitBill(this)'>确定</button></td>"
                        "</tr>";
                    }
                }
            }
            var paystate = bco_type == 202 ? "收" : "付";
            var payStatese = "<option>请选择</option><option value='线上'>线上</option><option value='线下'>线下</option>";
            if (paystate == "付") {
                payStatese = "<option>请选择</option><option value='线下'>线下</option>";
            }
            payStating = paystate;
            var titles = "";
            if (newIndex != -1) {
                titles += "<div class='bill-actions'>" +
                    "<label style='float:left; margin-right: 10px; font-size: 14px;'>应还款时间:" + dates + "，第<font style='color:#E74C3C; ' id='newIndex'>" + newIndex + "</font>期，应" + paystate + ":<font style='color:#E74C3C; ' id='sumMoney'>￥" + money + "</font></label>" +
                    "<label class='payType'>" + payStating + "款方式</label>" +
                    "<select class='paybank' onchange='bankTypes(this,\"" + newIndex + "\")'>" + payStatese + "</select>" +
                    "<select class='paybank' style='display:none; border-left:none;' onchange='bankType(this,\"" + newIndex + "\")'><option>请选择</option><option value='银行卡'>银行卡</option><option value='支付宝'>支付宝</option><option value='微信'>微信</option><option value='现金'>现金</option></select>" +
                    "<select class='paybankCode'><option value='工行9976'>工行 [ 6222****9976 ]</option><option value='工行5665'>工行 [ 3100****5665 ]</option><option value='建行1787'>建行 [ 6227****1787 ]</option><option value='建行3217'>建行 [ 6236****3217 ]</option><option value='农行7879'>农行 [ 6228****7879 ]</option><option value='农行4832'>农行 [ 3106****4832 ]</option></select>" +
                    "<select class='payTypeItem' onchange='selectVal(this)'></select>" +
                    "<input type='text' class='payMoney' placeholder='金额' onkeyup='clearNoNums(this)' />" +
                    "<button class='paySubmit' onclick='submitPay(this)'>" + payStating + "款</button>" +
                    "</div>";
            }
            // 账单显示页面
            var order = result.order;
            var viewBill = "<td colspan='" + _colspan + "'>";
            viewBill += "<div class='billList'>" +
                "<div class='title'>" +
                "<div class='bill-info'>" +
                "<label>订单号：<i id='code'>" + returnValue(order.bco_code) + "</i></label> " +
                "<label>|</label> " +
                "<label>合同期限：<i>" + returnDate(order.contractObject_Date) + "</i>&nbsp;至&nbsp;<i>" + returnDate(order.contractObject_DeadlineTime) + "</i><i class='ok'>" + "&nbsp;[" + returnYearMonthDay(returnDate(order.contractObject_Date), returnDate(order.contractObject_DeadlineTime)) + "]</i></label>" +
                "<input type='hidden' id='zName' value='" + zName + "' />" +
                "<input type='hidden' id='house' value='" + house + "' />" +
                "<input type='hidden' id='partner' value='" + partner + "' />" +
                "</div>" +
                titles +
                "</div>" +
                "<div class='content'>" +
                // 合同账单
                "<table class='billTableList'>" +
                "<thead>" +
                "<tr>" +
                "<td data-text='brb_id' style='width:50px;'><label class='checkbox-bill' onclick='checkAllBill(this)'><input type='checkbox' class='input_check' name='billId'><span></span></label></td>" +
                "<td data-text='brb_cycle' style='width:70px;'>期数</td>" +
                "<td data-text='bcb_type' style='width:100px;'>" + paystate + "款类型</td>" +
                "<td data-text='bcb_state' style='width:100px;'>" + paystate + "款状态</td>" +
                "<td data-text='bcb_repayment' style='width:100px;'>应" + paystate + "金额</td>" +
                "<td data-text='bcb_realPayment' style='width:120px;'>实" + paystate + "金额</td>" +
                "<td data-text='bcb_balance' style='width:120px;'>未" + paystate + "款</td>" +
                "<td data-text='bcb_repaymentDate' style='width:154px;'>应" + paystate + "款日期</td>" +
                "<td data-text='bcb_realPaymentDate' style='width:154px;'>实" + paystate + "款日期</td>" +
                "<td data-text='bcb_remarks'>备注</td>" +
                "<td data-text='bcb_operation' style='width:140px;'>操作</td>" +
                "</tr>" +
                "</thead>" +
                "<tbody>" +
                tbody +
                "</tbody>" +
                "</table>";
            // 金融账单
            if (!isEmpty(result.partnerBills)) {
                viewBill += "<div id='pbills' style='flex:1'><table class='partnerBillTableList' style='width:100%'>" +
                    "<thead>" +
                    "<tr>" +
                    "<td data-text='bpb_title' style='width:100px;'>#</td>" +
                    "<td data-text='bpb_balPay' style='width:70px;'>收支类型</td>" +
                    "<td data-text='bpb_type' style='width:100px;'>账单类型</td>" +
                    "<td data-text='bpb_state' style='width:100px;'>收款状态</td>" +
                    "<td data-text='bpb_repayment' style='width:100px;'>应收金额</td>" +
                    "<td data-text='bpb_realPayment' style='width:100px;'>实收金额</td>" +
                    "<td data-text='bpb_repaymentDate' style='width:154px;'>应收款日期</td>" +
                    "<td data-text='bpb_realPaymentDate' style='width:154px;'>实收款日期</td>" +
                    "<td data-text='bpb_remarks'>备注</td>" +
                    "</tr>" +
                    "</thead>" +
                    "<tbody>";
                for (var j = 0; j < result.partnerBills.length; j++) {
                    var bpb = result.partnerBills[j];
                    viewBill += "<tr>" +
                        "<td data-text='bpb_title' data-cycle='" + bpb.bpb_cycle + "'>" + returnValue(bpb.bpb_title) + "</td>" +
                        "<td data-text='bpb_balPay' class='" + returnBalpayClass(bpb.bpb_balPay) + "'>" + returnBalpay(bpb.bpb_balPay) + "</td>" +
                        "<td data-text='bpb_type'>" + returnBillType1(bpb.bpb_type) + "</td>" +
                        "<td data-text='bpb_state' class='" + returnStateClass1(bpb.bpb_state) + "'>" + returnState1(bpb.bpb_balPay, bpb.bpb_state) + "</td>" +
                        "<td data-text='bpb_repayment'>" + returnFloat(bpb.bpb_repayment) + "</td>" +
                        "<td data-text='bpb_realPayment'>" + returnFloat(bpb.bpb_realPayment) + "</td>" +
                        "<td data-text='bpb_repaymentDate'>" + format(bpb.bpb_repaymentDate, 'yyyy-MM-dd') + "</td>" +
                        "<td data-text='bpb_realPaymentDate'>" + format(bpb.bpb_realPaymentDate, 'yyyy-MM-dd') + "</td>" +
                        "<td data-text='bpb_remarks'>" + returnValue(bpb.bpb_remarks) + "</td>" +
                        "</tr>";
                }
                viewBill += "</tbody>" +
                    "</table></div>";
            }
            viewBill += "</div>";
            viewBill += "<div class='paybutton'>" +
                "<button class='insert' onclick='insertMoney(this)'>增加费用 </button>" +
                "<div style='display:none;' id='insert-options'>" +
                "<select onclick='setBillNum(this)'></select>" +
                "<select name='dept' style='width:350px;' multiple tabindex='1' id='dept' class='dept_select'>" +
                "<option value='免租期'>免租期</option>" +
                "<option value='押金'>押金</option>" +
                "<option value='包修费'>包修费</option>" +
                "<option value='材料费'>材料费</option>" +
                "<option value='管理费'>管理费</option>" +
                "<option value='服务费'>服务费</option>" +
                "<option value='物管费'>物管费</option>" +
                "<option value='宽带费'>宽带费</option>" +
                "<option value='燃气费'>燃气费</option>" +
                "<option value='电费'>电费</option>" +
                "<option value='水费'>水费</option>" +
                "<option value='燃气费'>燃气费</option>" +
                "<option value='保洁费'>保洁费</option>" +
                "<option value='维修费'>维修费</option>" +
                "<option value='滞纳金'>滞纳金</option>" +
                "<option value='其他'>其他</option>" +
                "</select>" +
                "<button onclick='submitMoney(this)'>确定</button>" +
                "</div>";
            if (!isEmpty(result.partnerBills)) {
                viewBill += "<button style='float:right; margin-right:15px;' onclick='viewRepayBills(this)'>金融账单</button>";
            }
            viewBill += "<button style='float:right; margin-right:15px;' onclick='printSubmit(this)'>打印</button>";
            viewBill += "<button style='float:right; margin-right:15px;' onclick='quitBills(this)'>清退</button>";
            // 代偿按钮
            if (order.bco_cooperater == "会分期" || order.bco_cooperater == "租了么" || order.bco_cooperater == "应花分期") { // order.bco_cooperater == "58分期"||
                viewBill += "<button style='float:right; margin-right:15px;' onclick='repayBills(this)'>代偿</button>";
            }
            viewBill += "</div>";
            viewBill += "</div>" +
                "</td>";
            $(_this).html("");
            $(_this).append(viewBill).addClass('viewBill');
            // 代偿账单样式
            $(_this).find("td[data-repay='1']").append("<span class='repay-tag'></span>");
            // 金融账单样式渲染
            $(_this).find(".partnerBillTableList tbody td[data-text='bpb_title']").each(function () {
                if (!$(this).is(":hidden")) {
                    var title = $(this).html();
                    if (title != "") {
                        var cycle = title.substring(title.indexOf("第") + 1, title.indexOf("期"));
                        if (cycle.indexOf("-") == -1) {
                            title = title.replace(cycle, "<span class='item-cycle'>" + cycle + "</span>");
                            $(this).html(title);
                        }
                        else {
                            var nums = cycle.split("-");
                            var begin = nums[0];
                            var end = nums[1];
                            title = title.replace(begin, "<span class='item-cycle'>" + begin + "</span>").replace(end, "<span class='green cycle'>" + end + "</span>");
                            $(this).html(title);
                        }
                    }
                    // 期数合并
                    var cycle = $(this).attr("data-cycle");
                    var siblings = $(_this).find(".partnerBillTableList tbody td[data-cycle='" + cycle + "']").not(this);
                    var rowspan = $(siblings).size() + 1;
                    $(this).attr("rowspan", rowspan);
                    $(siblings).hide();
                    // 实收金额合并
                    var bpb_realPayment = $(this).parent().find("td[data-text='bpb_realPayment']");
                    var bpb_realPayment_siblings = $(siblings).parent().find("td[data-text='bpb_realPayment']");
                    var realPayment = returnFloat($(bpb_realPayment).html());
                    $(bpb_realPayment_siblings).each(function () {
                        realPayment += returnFloat($(this).html());
                        $(this).hide();
                    });
                    $(bpb_realPayment).html(realPayment).attr("rowspan", rowspan);
                    // 应收款日期合并
                    $(this).parent().find("td[data-text='bpb_repaymentDate']").attr("rowspan", rowspan);
                    $(siblings).parent().find("td[data-text='bpb_repaymentDate']").hide();
                    // 实收款日期合并
                    $(this).parent().find("td[data-text='bpb_realPaymentDate']").attr("rowspan", rowspan);
                    $(siblings).parent().find("td[data-text='bpb_realPaymentDate']").hide();
                }
            });
        }, "json");
}

/**
 * 线上线下
 *
 * @param ids
 */
function bankTypes(ids, index) {
    if ($(ids).val() == "线上") {
        $(ids).next().show();
        $(ids).next().next().hide();
        $(ids).next().next().next().show();
        $(ids).next().next().next().next().show();
        $(ids).next().next().next().next().next().show();
        $(ids).next().html("<option value='支付宝'>支付宝</option><option value='微信'>微信</option>");
        $(ids).next().removeAttr("onchange");

        if ($(ids).val() != "请选择") {
            var _this = $(ids).parent().parent().next().find("tbody");
            $(".payTypeItem").html("<option>全部</option>");
            $(_this).find("tr.childBill[data-cycle='" + index + "']").each(function (i) {
                $(".payTypeItem").append("<option>" + $(this).find("td").eq(2).text() + "</option>")
            });
        }
    }
    else {
        $(ids).next().show();
        $(ids).next().html("<option value=''>请选择</option><option value='银行卡'>银行卡</option><option value='支付宝'>支付宝</option><option value='微信'>微信</option><option value='现金'>现金</option>");
        $(ids).next().attr("onchange", 'bankType(this,"' + index + '")');
        $(ids).next().next().hide();
        $(ids).next().next().next().hide();
        $(ids).next().next().next().next().hide();
        $(ids).next().next().next().next().next().hide();
    }
}

/**
 * 选择支付类型
 *
 * @param ids
 */
function bankType(ids, index) {
    if ($(ids).val() == "请选择") {
        $(ids).next().hide();
        $(ids).next().next().hide();
        $(ids).next().next().next().hide();
        $(ids).next().next().next().next().hide();
        $(".payTypeItem").html("");
    }
    else if ($(ids).val() == "银行卡") {
        $(ids).next().show();
        $(ids).next().next().show();
        $(ids).next().next().next().show();
        $(ids).next().next().next().next().show();
    }
    else {
        $(ids).next().hide();
        $(ids).next().next().show();
        $(ids).next().next().next().show();
        $(ids).next().next().next().next().show();
    }
    if ($(ids).val() != "请选择") {
        var _this = $(ids).parent().parent().next().find("tbody");
        $(".payTypeItem").html("<option>全部</option>");
        $(_this).find("tr.childBill[data-cycle='" + index + "']").each(function (i) {
            $(".payTypeItem").append("<option>" + $(this).find("td").eq(2).text() + "</option>")
        });
    }

}

// 打印选择
function printSubmit(ids) {
    var html = "";
    html += "<div class='biilstyle' id='addBill'>";
    html += "<dl>";
    html += "<dt style='width: 100px; float:left; text-align: right; margin-right:10px;'>类型</dt>";
    html += "<dd style='width: 220px; float:left;'><div class='printType'>";
    $(ids).parent().prev().find("table tbody tr").each(function (index) {
        if ($(this).find("input").is(":checked")) {
            var cycle = $(this).find("td").eq(1).text();
            $(this).siblings("tr.childBill[data-cycle='" + $(this).find("td").eq(1).text() + "']").each(function (i) {
                html += "<label style='margin-top:5px; margin-left:5px;' class='common-checkbox common-checkbox-checked'>" + $(this).find("td").eq(2).text() + "<input type='checkbox' name='hava-cooper' checked='checked'></label>";
            });
        }
    });
    html += "</div></dd></dl>";
    html += "</div>";
    var submit = function (v, h, f) {
        if (v == 'ok') {
            var arr = Array();
            $(".printType").find(".common-checkbox").each(function () {
                if ($(this).find("input").is(":checked")) {
                    arr.push($(this).text());
                }
            });
            printHtml(ids, arr);
            return true;
        }
        return true;
    }
    $.jBox(html, {title: "打印票据", width: 600, submit: submit});
}

/**
 * 打印
 *
 * */
function printHtml(ids, arr) {
    $("#orderPrint").html("");
    var boolls = true;
    var html = "";
    $(ids).parent().prev().find("table tbody tr").each(function (index) {
        var indexType = 1;
        var billRemak = "";
        if ($(this).find("input").is(":checked")) {
            var types = $("#searchOrderType").val();
            var titleType = "";
            if (types == 202) {
                types = "收款凭证";
                titleType = "(租客)";
            }
            else {
                types = "付款凭证";
                titleType = "(房东)";
            }
            var name = $(ids).parent().prev().prev().find("#zName").val().split("/")[0];
            var code = $(ids).parent().prev().prev().find("#code").text();
            var house = $(ids).parent().prev().prev().find("#house").val().split("逾")[0];
            var dateList = $(this).find("td").eq(8).text().split("-");
            var date = dateList[0] + "年" + dateList[1] + "月" + dateList[2] + "日";
            if (dateList[1] == null) {
                boolls = false;
                return false;
            }
            var sumMoney = 0;
            var sumCapital = "";
            var cycle = $(this).find("td").eq(1).text();
            var len = $(this).siblings("tr.childBill[data-cycle='" + $(this).find("td").eq(1).text() + "']").length - 1;
            var sum = Math.ceil((len + 1) / 5);
            var dateStr = $(this).find("input").parent().attr("data-date");
            var sums = 0;
            $(this).siblings("tr.childBill[data-cycle='" + $(this).find("td").eq(1).text() + "']").each(function (i) {
                var zMoney = 0;
                var zRmark = "";
                var type = $(this).find("td").eq(2).text();
                var smoney = $(this).find("td").eq(5).text();
                var remark = $(this).find("td").eq(9).find("input").val();
                ;
                if (type == "租金") {
                    zMoney = parseFloat(smoney);
                    zRmark = "第" + cycle + "期租金 " + dateStr + remark;
                }
                else {
                    zMoney = parseFloat(smoney);
                    zRmark = remark + " ";
                }
                if (i % 5 == 0) {
                    html += '<div class="tablePrint"><table style="border-collapse: collapse; width: 730px; height:400px;  position: relative;" data-index="' + indexType + '" data-sum="' + sum + '">' +
                        '<thead>' +
                        '<tr>' +
                        '<td colspan="2"></td>' +
                        '<td colspan="4" style=" height: 25px; font-size: 20px; line-height: 25px;text-align: center; color: #E74C3C;">重庆管家婆房屋托管中心专用收据</td>' +
                        '<td><input style="width: 50px; border:none;"  value="" readonly="readonly" /></td>' +
                        '<td><input style="width: 50px; border:none;" value=""  readonly="readonly"/></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td colspan="2"></td>' +
                        '<td colspan="4" style="height:4px; text-align: center; color: #E74C3C; border-bottom: 1px solid #666; border-top: 1px solid #666;"></td>' +
                        '<td></td>' +
                        '<td></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td colspan="2"></td>' +
                        '<td colspan="4" style=" height: 25px; font-size: 20px; line-height: 25px; text-align: center; color: #E74C3C;">' + types + '</td>' +
                        '<td colspan="2" style="text-align: left; height: 25px; line-height: 25px;">NO.<font style="color: #E74C3C; font-size: 15px;">' + code + '</font></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td colspan="2" style=" width:180px; height: 28px; line-height: 28px; font-size: 15px;">客户名称：' + name + '</td>' +
                        '<td colspan="4" style=" width:470px; height: 28px; line-height: 28px; font-size: 15px; text-indent: 50px">房号：' + house + '</td>' +
                        '<td colspan="2" style=" width:160px; height: 28px; line-height: 28px; font-size: 15px; text-align: left;">日期：' + date + '</td>' +
                        '</tr>' +
                        '</thead>';
                    html += '<tbody>' +
                        '<tr>' +
                        '<td colspan="2" style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px;">款项类型</td>' +
                        '<td colspan="5" style=" border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px;">款项说明</td>' +
                        '<td style=" border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px;">金额</td>' +
                        '</tr>';
                }
                if (i == 0) {
                    billRemak = '<td rowspan="5"><label style="width: 20px; display: block;">白存根</label><label style="width: 20px; display: block; margin-top: 5px;">红客户</label><label style="width: 20px; display: block; margin-top: 5px;">黄财务</label></td>';
                }
                else {
                    billRemak = "";
                }
                var boolt = false;
                for (var k = 0; k < arr.length; k++) {
                    if ($(this).find("td").eq(2).text() == arr[k]) {
                        boolt = true;
                        break;
                    }
                }
                if (boolt) {
                    sums = sums + 1;
                    sumMoney += zMoney;
                    html += '<tr>' +
                        '<td colspan="2" style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px;">' + type + '</td>' +
                        '<td colspan="5" style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px; text-align: left; text-indent: 10px;">' + zRmark + '</td>' +
                        '<td style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px;">' + zMoney.toFixed(2) + '</td>' +
                        billRemak +
                        '</tr>';
                }
                if (i == len) {
                    var onther = "";
                    var lent = (5 - sums);
                    for (var i = 0; i < lent; i++) {
                        onther += '<tr>' +
                            '<td colspan="2" style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px;"></td>' +
                            '<td colspan="5" style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px; text-align: left; text-indent: 10px;"></td>' +
                            '<td style="border: 1px solid #000; height: 22px; line-height: 22px; text-align: center; font-size: 15px;"></td>' +
                            '</tr>';
                    }
                    html += onther;
                    sumCapital = DX(sumMoney);
                    html += '<tr>' +
                        '<td colspan="7" style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px; text-align: left; text-indent: 10px;">人民币(大写)：' + sumCapital + '</td>' +
                        '<td style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px;">￥' + sumMoney.toFixed(2) + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td colspan="8" style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px; text-align: left; text-indent: 10px;">注:机打收据，手写无效，盖章后生效</td>' +
                        '</tr>' +
                        '</tbody>' +
                        '<tfoot style="font-size: 14px;">' +
                        '<tr style=" height: 35px;">' +
                        '<td colspan="8">' +
                        '经办人：<input type="text" style="width: 114px; border: none;" readonly="readonly"  value="' + $.cookie("em_name") + '" />' +
                        '审核人：<input type="text" style="width: 114px; border: none;" readonly="readonly"  />' +
                        '财务复核：<input type="text" style="width: 114px; border: none;" readonly="readonly"  />' +
                        '客户' + titleType + '：<input type="text" style="width: 90px; border: none;" readonly="readonly"  />' +
                        '</td>' +
                        '</tr>' +
                        '<tr><td colspan="8" style=" text-align: right;">打印时间：' + format(new Date(), 'yyyy-MM-dd HH:mm:ss') + '</td></tr>' +
                        '</tfoot>' +
                        '</table></div>';
                }
                else if (i != 0 && i % 4 == 0) {
                    html += '<tr>' +
                        '<td colspan="7" style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px; text-align: left; text-indent: 10px;">人民币(大写)：</td>' +
                        '<td style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px;"></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td colspan="8" style="border: 1px solid #000; height: 28px; line-height: 28px; text-align: center; font-size: 15px; text-align: left; text-indent: 10px;">注:机打收据，手写无效，盖章后生效</td>' +
                        '</tr>' +
                        '</tbody>' +
                        '<tfoot style="font-size: 14px;">' +
                        '<tr style=" height: 35px;">' +
                        '<td colspan="8">' +
                        '经办人：<input type="text" style="width: 114px; border: none;" readonly="readonly"  value="' + $.cookie("em_name") + '" />' +
                        '审核人：<input type="text" style="width: 114px; border: none;" readonly="readonly"  />' +
                        '财务复核：<input type="text" style="width: 114px; border: none;" readonly="readonly"  />' +
                        '客户' + titleType + '：<input type="text" style="width: 90px; border: none;" readonly="readonly"  />' +
                        '</td>' +
                        '</tr>' +
                        '<tr><td colspan="8" style=" text-align: right;">打印时间：' + format(new Date(), 'yyyy-MM-dd HH:mm:ss') + '</td></tr>' +
                        '</tfoot>' +
                        '</table></div>';
                }
            });
        }
        if (index == 0) {
            html += "<input type='hidden' class='prinltCode' value='" + code + "'>";
            html += "<input type='hidden' class='prinltNum' value='" + cycle + "'>";
        }
    });
    $("#orderPrint").html(html);
    if (boolls) {
        if ($("#orderPrint table").length > 0) {
            printMytable();
        }
        else {
            $.jBox.tip("请选择打印的内容!", "error");
        }
    }
    else {
        $.jBox.tip("还未支付!", "error");
    }
}

var DX = function (num) {
    var strOutput = "";
    var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
    num += "00";
    var intPos = num.indexOf('.');
    if (intPos >= 0)
        num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
    strUnit = strUnit.substr(strUnit.length - num.length);
    for (var i = 0; i < num.length; i++)
        strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
    return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
};

/**
 * 账单tr选中
 *
 * @param ids
 */
function billTrClick(ids) {
    if ($(ids).find("input[name='billId']").is(":checked")) {
        $(ids).find("input[name='billId']").attr("checked", false);
    }
    else {
        $(ids).find("input[name='billId']").attr("checked", true);
    }
}

/**
 * 确定添加账单
 *
 * @param ids
 */
function submitMoney(ids) {
    var item = $(ids).prev().prev().prev().val();
    var html = "";
    $(ids).prev().find(".chosen-choices .search-choice").each(function (i) {
        var type = $(this).text();
        $(ids).parent().parent().prev().find("table tbody tr").each(function () {
            if ($(this).find(".item-index").text() == item.replace("期", "")) {
                html = "<tr class='childBill' style='display:table-row;' data-cycle=" + $(this).find("td").eq(1).text() + ">" +
                    "<td style='border-left:none;'><i class='fa fa-pencil' style='display:none;' onclick='editBill(this)'></i></td>" +
                    "<td><i class='fa fa-minus-circle' onclick='closeTr(this)'></i></td>" +
                    "<td>" + type + "</td>" +
                    "<td style='color:#F39C12;'>待还款</td>" +
                    "<td><input type='text' class='text-input' value='' /></td>" +
                    "<td>0</td>" +
                    "<td>0</td>" +
                    "<td><input type='text' class='text-input' id='payDate' value='' onfocus='WdatePicker()' /></td>" +
                    "<td></td>" +
                    "<td><input type='text' class='text-input' style='text-align: left; text-indent: 5px;' value='' /></td>" +
                    "<td style='border-right:none;'><button class='button1' onclick='submitBill(this)'>确定</button></td>" +
                    "</tr>";
                $(this).parent().find(".childBill[data-cycle='" + $(this).find("td").eq(1).text() + "']").last().after(html);

                $(this).next().show();
                //选择过的选项不能选中
                $(this).next().find("tbody tr").each(function () {
                    var text = $(this).find("td").eq(2).text();
                    $(ids).prev().prev().find("option").each(function () {
                        if ($(this).text() == text) {
                            $(this).attr("disabled", true);
                        }
                    });
                });
                $(ids).prev().find(".search-choice").remove();
            }
        });
    });

}

/**
 * 选择类型计算应收金额
 *
 * 编辑账单
 *
 * @param ids
 */
function selectVal(ids) {
    var _parents = $(ids).parent();
    var newIndex = $(_parents).find("#newIndex").text();
    var type = $(ids).val();
    if (type != "全部") {
        var money = 0;
        $(_parents).parent().next().find("tbody tr").each(function (i) {
            if ($(this).find("td").eq(1).text() == newIndex) {
                $(this).siblings("tr.childBill[data-cycle='" + newIndex + "']").each(function (i) {
                    if ($(this).find("td").eq(2).text() == type) {
                        money += (parseFloat($(this).find("td").eq(4).find("input").val()) - parseFloat($(this).find("td").eq(5).text()));
                    }
                });
            }
        });
        $(_parents).find("#sumMoney").text("￥" + money);
    }
    else {
        var money = 0;
        $(_parents).parent().next().find("tbody tr").each(function (i) {
            if ($(this).find("td").eq(1).text() == newIndex) {
                $(this).siblings("tr.childBill[data-cycle='" + newIndex + "']").each(function (i) {
                    money += (parseFloat($(this).find("td").eq(4).find("input").val()) - parseFloat($(this).find("td").eq(5).text()));
                });
            }
        });
        $(_parents).find("#sumMoney").text("￥" + money);
    }
}

/**
 * 编辑账单
 *
 * @param ids
 */
function editBill(ids) {
    var _this = $(ids).parent().parent();
    $(_this).find("td").eq(0).find("i").hide();
    $(_this).find("td").eq(1).find("i").show();
    $(_this).find("td").eq(4).find("input").css("background", "#fdf7f7");
    $(_this).find("td").eq(4).find("input").attr("readonly", false);
    $(_this).find("td").eq(7).find("input").css("background", "#fdf7f7");
    $(_this).find("td").eq(7).find("input").attr("readonly", false);
    $(_this).find("td").eq(9).find("input").css("background", "#fdf7f7");
    $(_this).find("td").eq(9).find("input").attr("readonly", false);
    $(_this).find("td").eq($(_this).find("td").length - 1).find("button").show();
}

/**
 * 确定账单
 *
 * @param ids
 */
function submitBill(ids) {
    var _this = $(ids).parent().parent();
    if ($(_this).find("td").eq(4).find("input").val() == "") {
        $.jBox.tip("应收金额不能为空", "error");
        return;
    }
    if ($(_this).find("td").eq(7).find("input").val() == "") {
        $.jBox.tip("日期不能为空", "error");
        return;
    }

    var money = $(_this).find("td").eq(4).find("input").val();
    var id = $(_this).attr("data-id");
    var type = $(_this).find("td").eq(2).text();
    var remarks = $(_this).find("td").eq(9).find("input").val();
    var types = $("#searchOrderType").val();
    if (types == 202) {
        types = "租赁订单";
    }
    else {
        types = "托管订单";
    }
    var date = $(_this).find("td").eq(7).find("input").val();

    var payCycleNum = $(_this).attr("data-cycle");
    var code = $(_this).parent().parent().parent().prev().find("#code").text();
    submitBillList = $.Deferred();

    var bools = true;

    $.ajax({
        type: "POST",
        url: "/financeManage/submitBill",
        data: {
            id: id,
            code: code,
            money: money,
            payCycleNum: payCycleNum,
            type: type,
            date: date,
            types: types,
            remarks: remarks
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.message == "success") {
                $.jBox.tip("添加成功！", "success");
                id = result.id;
            }
            else {
                $.jBox.tip("输入有误，请重新填写", "error");
                bools = false;
            }
            submitBillList.resolve();
        }
    });

    $.when(submitBillList).done(function () {
        if (bools) {
            $(_this).attr("data-id", id);
            $(".payTypeItem").append("<option>" + $(_this).find("td").eq(2).text() + "</option>");
            $(_this).find("td").eq(0).find("i").show();
            $(_this).find("td").eq(1).find("i").hide();
            $(_this).find("td").eq(4).find("input").css("background", "transparent");
            $(_this).find("td").eq(4).find("input").attr("readonly", true);
            $(_this).find("td").eq(5).text($(_this).find("td").eq(5).find("input").val());
            $(_this).find("td").eq(6).text($(_this).find("td").eq(6).find("input").val());
            $(_this).find("td").eq(7).find("input").css("background", "transparent");
            $(_this).find("td").eq(7).find("input").attr("readonly", true);
            $(_this).find("td").eq(9).find("input").css("background", "transparent");
            $(_this).find("td").eq(9).find("input").attr("readonly", true);
            $(_this).find("td").eq($(_this).find("td").length - 1).find("button").hide();
            if (parseFloat($(_this).find("td").eq(4).find("input").val()) == parseFloat($(_this).find("td").eq(5).text())) {
                $(_this).find("td").eq(3).text("已还款");
                $(_this).find("td").eq(3).attr("class", "next");
                $(_this).find("td").eq(6).text(0);
                $(_this).parent().find("label[data-cycle='" + payCycleNum + "']").parent().parent().find("td").eq(3).text("已还款");
                $(_this).parent().find("label[data-cycle='" + payCycleNum + "']").parent().parent().find("td").eq(3).attr("class", "next");
                $(_this).parent().find("label[data-cycle='" + payCycleNum + "']").parent().parent().find("td").eq(6).text(0);
            }
            var sumMoney = 0;
            $(_this).parent().find(".childBill[data-cycle='" + payCycleNum + "']").each(function (i) {
                sumMoney += parseFloat($(this).find("td").eq(4).find("input").val());
            })
            $(_this).parent().find(".childBill[data-cycle='" + payCycleNum + "']").first().prev().find("td").eq(4).text(sumMoney);
            if (parseInt($("#newIndex").text()) == payCycleNum) {
                $("#sumMoney").text("￥" + sumMoney);
            }
        }
    });
}

/**
 * 删除添加账单
 *
 * @param ids
 */
function closeTr(ids) {
    if ($(ids).parent().parent().attr("data-id") == "" || $(ids).parent().parent().attr("data-id") == null) {
        $(ids).parent().parent().remove();
        return;
    }
    $.ajax({
        type: "POST",
        url: "/financeManage/removeBill",
        data: {
            id: $(ids).parent().parent().attr("data-id")
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.message == "success") {
                $(ids).parent().parent().remove();
            }
            else {
                $.jBox.tip("删除失败，请重新删除！", "error");
            }
        }
    });
}

/**
 * 增加账单
 *
 * @param ids
 */
function insertMoney(ids) {
    var bool = true;
    if ($(ids).next().is(":hidden")) {
        $(ids).next().find("select").eq(0).html("");
        $(ids).parent().prev().find("tbody tr").each(function (i) {
            if ($(this).find("td").eq(1).text() != "") {
                if ($(this).find("td").eq(3).text() == "待还款" && bool) {
                    $(ids).next().find("select").eq(0).append("<option selected='selected'>" + $(this).find("td").eq(1).text() + "期</option>");
                    bool = false;
                }
                else {
                    $(ids).next().find("select").eq(0).append("<option>" + $(this).find("td").eq(1).text() + "期</option>");
                }
            }
        });
        $(ids).next().show();
        setBillNum($(ids).next().find(".dept_select").prev());
        $(".dept_select").chosen({
            no_results_text: "没有找到",
            allow_single_de: true
        });
    }
    else {
        $(ids).next().hide();
    }
}

/**
 * 对选项进行重复不能选择
 *
 * @param ids
 */
function setBillNum(ids) {
    var _this = $(ids).parent().parent().prev();
    $(_this).find("tbody tr").each(function () {
        if ($(this).find("td").eq(1).text() == $(ids).val().replace("期", "")) {
            if ($(_this).find(".childBill[data-cycle='" + $(ids).val().replace("期", "") + "']").length > 0) {
                $(_this).find(".childBill[data-cycle='" + $(ids).val().replace("期", "") + "']").each(function () {
                    var text = $(this).find("td").eq(2).text();
                    $(ids).next().find("option").each(function () {
                        if ($(this).text() == text) {
                            $(this).attr("disabled", true);
                        }
                    });
                });
            }
        }
    });
    $(".dept_select").trigger("chosen:updated");
}

function hrefClick(ids) {
    window.parent.href_mo($(ids).attr("data-type"), "房屋信息", "库存房源");
}

/**
 * 账单全选按钮
 * @param obj
 */
function checkAllBill(obj) {
    var _this = $(obj).find('input');
    var table = $(_this).parent().parent().parent().parent().parent();
    $(table).find("input[name='billId']").attr("checked", $(_this).is(':checked'));
}

/**
 * 代偿全选按钮
 * @param obj
 */
function checkAllRepayBill(obj) {
    var _this = $(obj).find('input');
    var table = $(_this).parent().parent().parent().parent().parent();
    $(table).find("input[name='repayBillId']").attr("checked", $(_this).is(':checked'));
}

/** 返回合同类型*/
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
 * 子账单显示与隐藏
 * @param obj
 */
function flodChildBill(obj, cycle) {
    var tbody = $(obj).parent().parent().parent();
    $(tbody).find("tr.childBill[data-cycle='" + cycle + "']").each(function () {
        if ($(this).is(":hidden")) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });
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
 * 合同状态样式
 * @param obj
 */
function returnContractStateClass(obj) {

    switch (obj) {
        case "审核":
            return 'hint';
            break;
        case "生效":
            return 'ok';
            break;
        case "失效":
            return 'error';
            break;
        case "作废":
            return 'error';
            break;
        default:
            return '';
            break;
    }
}

/**
 * 收款状态样式
 * @param obj
 */
function returnStateClassByName(obj) {
    // 账单状态（1：待审核、2：待还款、3：已还款、4：取消、5：未缴清、10：转租、11：退租、12：解约、13：清退、14：代偿）
    switch (obj) {
        case "待还款":
            return 'hint';
            break;
        case "完结":
            return 'next';
            break;
        case "未缴清":
            return 'error';
            break;
        default:
            return '';
            break;
    }
}

/**
 * 收款
 *
 * @param obj
 */
function submitPay(ids) {
    var paytypese = $(ids).prev().prev().prev().prev().prev().val();
    var bank = $(ids).prev().prev().prev().val();
    var payTypes = $(ids).prev().prev().prev().prev().val();
    var moneys = $(ids).prev().val();
    var content = "";
    var sumMoney = 0;
    var yMoneys = $(ids).parent().find("#sumMoney").text().replace("￥", "");
    var newIndex = $(ids).parent().find("#newIndex").text();
    var type = "";
    if (paytypese == "线下") {
        type = $(ids).prev().prev().val();
    }
    else {
        type = "全部";
    }
    if (parseFloat(moneys) > parseFloat(yMoneys)) {
        $.jBox.tip("输入金额不能超过此次支付账单的金额(" + yMoneys + ")", "error");
        return;
    }
    var cha = 0;
    $(ids).parent().parent().next().find("table.billTableList tbody tr").each(function () {
        if ($(this).find("td").eq(1).text() == newIndex) {
            if (type != "全部") {
                $(this).parent().find(".childBill[data-cycle='" + $(this).find("td").eq(1).text() + "']").each(function () {
                    if (type == $(this).find("td").eq(2).text()) {
                        var ys = (parseFloat($(this).find("td").eq(4).find("input").val()) - parseFloat($(this).find("td").eq(5).text()));
                        if (ys != 0) {
                            content += "<tr>" +
                                "<td>" + $(this).find("td").eq(2).text() + "</td>" +
                                "<td>" + ys + "</td>" +
                                "</tr>";
                            sumMoney += ys;

                            yMoneys = $(this).find("td").eq(4).find("input").val();
                        }
                    }
                });
            }
            else {
                $(this).parent().find("tr.childBill[data-cycle='" + $(this).find("td").eq(1).text() + "']").each(function () {
                    var ys = (parseFloat($(this).find("td").eq(4).find("input").val()) - parseFloat($(this).find("td").eq(5).text()));
                    if (ys != 0) {
                        content += "<tr>" +
                            "<td>" + $(this).find("td").eq(2).text() + "</td>" +
                            "<td>" + ys + "</td>" +
                            "</tr>";
                        sumMoney += ys;
                    }
                });
            }
        }
    });
    //第几期
    newIndex = $(ids).parent().find("#newIndex").text();
    // 差额
    cha = (parseFloat(yMoneys) - parseFloat(moneys)).toFixed(2);
    content += "<tr>" +
        "<td>总计</td>" +
        "<td>" + sumMoney + "</td>" +
        "</tr>";
    var moreHtml = "";
    if (cha != 0) {
        moreHtml = "<div style='height: 35px; margin-top:10px;'>" +
            "<lable style='float:left;'>添加未收款项：</lable>" +
            "<select name='dept' style='width:170px;' multiple tabindex='1' id='dept' class='moneyType'>" +
            "<option value='租金'>租金</option>" +
            "<option value='免租期'>免租期</option>" +
            "<option value='押金'>押金</option>" +
            "<option value='包修费'>包修费</option>" +
            "<option value='材料费'>材料费</option>" +
            "<option value='管理费'>管理费</option>" +
            "<option value='服务费'>服务费</option>" +
            "<option value='物管费'>物管费</option>" +
            "<option value='宽带费'>宽带费</option>" +
            "<option value='燃气费'>燃气费</option>" +
            "<option value='电费'>电费</option>" +
            "<option value='水费'>水费</option>" +
            "<option value='燃气费'>燃气费</option>" +
            "<option value='保洁费'>保洁费</option>" +
            "<option value='维修费'>维修费</option>" +
            "<option value='滞纳金'>滞纳金</option>" +
            "</select>" +
            "<input type='text' class='insertMoney' placeholder='金额' />" +
            "<button class='insertButton' onclick='uncollList(this)'>添加</button>" +
            "</div>" +
            "<table class='uncollectedTable'>" +
            "<thead>" +
            "<tr>" +
            "<td>未收类型</td>" +
            "<td>未收金额</td>" +
            "<td>操作</td>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "<tr>" +
            "<td>总计</td>" +
            "<td>0</td>" +
            "<td></td>" +
            "</tr>" +
            "</tbody>" +
            "</table>";
    }
    var typet = "";
    if (type != "全部") {
        typet = " " + type;
    }
    var house_address = $(ids).parent().prev().find("#house").val();
    if (house_address.indexOf("逾") > 0) {
        house_address = house_address.substring(0, house_address.indexOf("逾"));
    }
    var html = "<div style='padding:10px;'>" +
        "<div>房号：" + house_address + "（租客" + typet + "）第" + newIndex + "期，应" + payStating + "：<font style='color:#F39C12'>" + yMoneys + "</font> 元，实" + payStating + "：<font style='color:#E74C3C'>" + moneys + "</font> 元，结余：<font style='color:#E74C3C' id='surplus' name='surplus'>" + cha + "</font> 元</div>" +
        "<table class='payTable'>" +
        "<thead>" +
        "<tr>" +
        "<td>费用类型</td>" +
        "<td>应" + payStating + "金额</td>" +
        "</tr>" +
        "</thead>" +
        "<tbody>" +
        content +
        "</tbody>" +
        "</table>" +
        moreHtml +
        "</div>";
    var submit = function (v, h, f) {
        var sumMoney = parseFloat($(".uncollectedTable tbody tr").eq($(".uncollectedTable tbody tr").length - 1).find("td").eq(1).text());
        if (parseFloat($("#surplus").text()) != 0 && parseFloat($("#surplus").text()) != sumMoney) {
            $.jBox.tip("未" + payStating + "款项目和结余不一致！", 'error', {focusId: "surplus"}); // 关闭设置 yourname 为焦点
            return false;
        }
        if ($(h).parent().next().find("input").val() == "") {
            $.jBox.tip("请选择" + payStating + "款日期", 'error');
            return false;
        }

        var billtype = $("#searchOrderType").val();
        if (billtype == 202) {
            billtype = "租赁订单";
        }
        else {
            billtype = "托管订单";
        }
        var code = $(ids).parent().prev().find("#code").text();
        var yPay = "[";
        var len1 = $(".payTable tbody tr").length - 1;
        $(".payTable tbody tr").each(function (i) {
            if (i < len1) {
                yPay += "{";
                yPay += "\"type\":\"" + $(this).find("td").eq(0).text() + "\",";
                yPay += "\"money\":\"" + $(this).find("td").eq(1).text() + "\"";
                yPay += "},";
            }
        });
        yPay = yPay.substring(0, yPay.length - 1);
        yPay += "]";

        var wPay = "";
        if ($(".uncollectedTable").length > 0) {
            var len2 = $(".uncollectedTable tbody tr").length - 1;
            wPay = "[";
            $(".uncollectedTable tbody tr").each(function (i) {
                if (i < len2) {
                    wPay += "{";
                    wPay += "\"type\":\"" + $(this).find("td").eq(0).text() + "\",";
                    wPay += "\"money\":\"" + $(this).find("td").eq(1).text() + "\"";
                    wPay += "},";
                }
            });
            wPay = wPay.substring(0, yPay.length - 1);
            wPay += "]";
        }
        var yMoney = yMoneys;
        var sMoney = moneys;
        var payName = $("#zName").val().split("/")[0];
        var payPhone = $("#zName").val().split("/")[1];
        var payType = payTypes;
        var payAccount = bank;
        var indexs = newIndex;
        var date = $(h).parent().next().find("input").val() + " 00:00:00";

        var urls = "";
        if (paytypese == "线上") {
            urls = "/financeManage/onlinePay";
        }
        else {
            urls = "/financeManage/payBill";
        }
        //         console.log({
        //             billtype: billtype,
        //             code: code,
        //             yPay: yPay,
        //             wPay: wPay,
        //             yMoney: yMoney,
        //             sMoney: sMoney,
        //             payName: payName,
        //             payPhone: payPhone,
        //             payType: payType,
        //             payAccount: payAccount,
        //             cycle: indexs,
        //             date: date,
        //             house_address: house_address,
        //             type: payTypes
        //         });
        // return;
        $.ajax({
            type: "POST",
            url: urls,
            data: {
                billtype: billtype,
                code: code,
                yPay: yPay,
                wPay: wPay,
                yMoney: yMoney,
                sMoney: sMoney,
                payName: payName,
                payPhone: payPhone,
                payType: payType,
                payAccount: payAccount,
                cycle: indexs,
                date: date,
                house_address: house_address,
                type: payTypes
            },
            dataType: "json",
            success: function (result) {
                if (result.message == "success") {
                    if (paytypese == "线上") {
                        var paySubmit = function (v, h, f) {
                            var _this = $(ids).parent().parent().parent().parent().parent().prev();
                            dataList(_this);
                            return true;
                        }
                        var logoImage = "";
                        var payColor = "";
                        if (payTypes == "支付宝") {
                            logoImage = "/resources/image/aliPayLogo.png";
                            payColor = "#0AE";
                        }
                        else {
                            logoImage = "/resources/image/wxPayLogo.png";
                            payColor = "#00c800";
                        }
                        var wxpayHtml = "<div class='titleCode' style='float:left; border-right: 1px solid #CCC; margin-right: 10px; height: 270px;'>" +
                            "<div class='wxLogo'><img src='" + logoImage + "' style='width:138px; height:41px; margin-left: 29px; margin-top: 10px;' /></div>" +
                            "<div class='wxPayImage'>" +
                            "<span style='display:block; width:200px; color:#21ba14; font-size: 14px; text-align: center; height: 5px;'>欢迎使用" + payTypes + "支付</span>" +
                            "<div id='qrcode' style='text-align: center;'></div>" +
                            "<span style='display:block; width:200px; color:" + payColor + "; font-size: 14px; text-align: center; height: 5px; position: absolute; bottom: 23px;'>" + payTypes + "扫码，向我付款</span>" +
                            "</div>" +
                            "</div>" +
                            "<div class='wxSuccess' style='width: 200px; height: 268px; float:left; border-right: 1px solid #CCC; margin-right: 10px; display:none;'><img style='margin-left: 50px; margin-top: 66px;' src='/resources/image/wxSuccess.png' /><span style='display:block; width:200px; color:#21ba14; font-size: 16px; text-align: center;'>订单支付成功！</span></div>" +
                            "<div class='wxMessage'><dl><dt>订单号:</dt><dd>" + code + "<dd></dl><dl><dt>房号:</dt><dd>" + house_address + "<dd></dl><dl><dt>期数:</dt><dd>第" + indexs + "期[" + payStating + "]<dd></dl><dl><dt>金额:</dt><dd><font style='color:#E74C3C'>" + sMoney + "</font>元<dd></dl><dl><dt>缴费方式:</dt><dd>" + payTypes + "支付<dd></dl></div>";
                        $.jBox(wxpayHtml, {title: payTypes, showIcon: 'wxIcon', width: 620, submit: paySubmit});

                        var options = {
                            render: "canvas",
                            ecLevel: 'H',//识别度
                            fill: '#000',//二维码颜色
                            background: '#ffffff',//背景颜色
                            quiet: 2,//边距
                            width: 170,//宽度
                            height: 170,
                            text: result.image,//二维码内容
                            //中间logo start
                            mode: 4,
                            mSize: 11 * 0.01,
                            mPosX: 50 * 0.01,
                            mPosY: 50 * 0.01,
                            src: "/resources/image/10.png",//logo图片
                            //中间logo end
                            label: 'jQuery.qrcode',
                            fontname: 'Ubuntu',
                            fontcolor: '#ff9818',
                        };
                        $('#qrcode').empty().qrcode(options);

                        var interva = setInterval(function () {
                            if ($(".titleCode").length > 0) {
                                $.ajax({
                                    type: "POST",
                                    url: "/financeManage/selectBillSuccess",
                                    data: {
                                        bco_code: code,
                                        bcb_cycle: indexs
                                    },
                                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                                    dataType: "json",
                                    success: function (result) {
                                        if (result.message == "success") {
                                            $(".titleCode").hide();
                                            $(".wxSuccess").show();
                                            window.clearInterval(interva);
                                        }
                                    }
                                });
                            }
                            else {
                                window.clearInterval(interva);
                            }
                        }, 1000);
                    }
                    else {
                        $.jBox.tip("支付成功", "success");
                        var _this = $(ids).parent().parent().parent().parent().parent().prev();
                        dataList(_this);
                    }
                    return true;
                }
                else {
                    $.jBox.tip("支付失败，请刷新后重新尝试！", "error");
                    return false;
                }
            }
        });
    };
    var dateStr = "<div style='height: 30px; line-height: 30px; margin-left: 10px; float: left;'><lable style='float:left; height: 30px; line-height: 30px;'>" + payStating + "款日期：</lable><lable style='float:left;'><input type='text' id='payDate' style='text-align: left; text-indent: 10px; border: 1px solid #ddd;' onfocus='WdatePicker()' /></lable></div>";
    $.jBox(html, {title: "确认" + payStating + "款", width: 620, submit: submit});
    $(".jbox-button-panel").prepend(dateStr);
    $(".jbox-state").find(".jbox-content").attr("style", "");
    $(".moneyType").chosen({
        no_results_text: "没有找到",
        allow_single_de: true
    });
}

/**
 * 未收款选项
 *
 * @param obj
 */
function uncollList(ids) {
    if ($(ids).prev().val() == "") {
        $.jBox.tip("请填写金额未" + payStating + "款项金额!");
        return;
    }
    $(".moneyType option").attr("disabled", false);
    $(ids).prev().prev().find(".chosen-choices .search-choice").each(function () {
        var type = $(this).text();
        var money = $(ids).prev().val();
        $(".uncollectedTable tbody").prepend("<tr><td>" + type + "</td><td>" + money + "</td><td><i class='fa fa-minus-circle' onclick='dataclose(this)'></i></td></tr>");
        $(".moneyType option").each(function () {
            if ($(this).val() == type) {
                $(this).attr("disabled", true);
            }
        });
    });
    var sumMoney = 0;
    $(".uncollectedTable tbody tr").each(function (i) {
        if (i < ($(".uncollectedTable tbody tr").length - 1)) {
            sumMoney += parseFloat($(this).find("td").eq(1).text());
        }
    });
    $(".uncollectedTable tbody tr").eq($(".uncollectedTable tbody tr").length - 1).find("td").eq(1).text(sumMoney);
    $(ids).prev().prev().find(".search-choice").remove();
    $(ids).prev().val("");
    $(".uncollectedTable").show();
}

/**
 * 删除未收款数据
 *
 * @param obj
 */
function dataclose(ids) {
    var money = $(ids).parent().prev().text();
    var sumMoney = $(".uncollectedTable tbody tr").eq($(".uncollectedTable tbody tr").length - 1).find("td").eq(1).text();
    var cha = parseFloat(sumMoney) - parseFloat(money);
    $(".uncollectedTable tbody tr").eq($(".uncollectedTable tbody tr").length - 1).find("td").eq(1).text(cha);
    $(ids).parent().parent().remove();
    if ($(".uncollectedTable tbody tr").length < 1) {
        $(".uncollectedTable").hide();
    }
    var type = $(ids).parent().parent().find("td").eq(0).text();
    $(".moneyType option").each(function () {
        if ($(this).val() == type) {
            $(this).attr("disabled", false);
        }
    });
    $(".moneyType").trigger("chosen:updated");
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
 * 代偿
 * @param obj
 */
function repayBills(obj) {
    var checked = $(obj).parent().parent().find(".billTableList tbody input[name='billId']:checked");
    var partner = $(obj).parent().parent().find("#partner").val();
    if (partner == "58分期") {
        $.jBox.tip("不支持代偿！", "error");
        return;
    }
    if (checked.length == 0) {
        $.jBox.tip("请选择一期账单!", "error");
        return;
    }
    if (checked.length > 1) {
        $.jBox.tip("只可代偿一期!", "error");
        return;
    }
    var bcb_cycle = $(checked).parent().attr('data-cycle');
    var bco_code = $(obj).parent().parent().find("#code").text();
    var submit = function (v, h, f) {
        if (v == 'ok') {
            $.post(
                "/financeManage/addRepayBill",
                {"bcb_cycle": bcb_cycle, "bco_code": bco_code},
                function (result) {
                    if (result.msg == "success") {
                        $.jBox.tip("操作成功!", "success");
                        dataList($(".viewBill:visible").prev());
                    }
                    else {
                        $.jBox.tip("数据错误!", "error");
                    }
                }, "json");
        }
        return true;
    };
    $.jBox.confirm("确认代偿该期账单吗？", "提示", submit);
}

/**
 * 清退
 * @param obj
 */
function quitBills(obj) {
    var checked = $(obj).parent().parent().find(".billTableList tbody input[name='billId']:checked");
    if (checked.length == 0) {
        $.jBox.tip("请选择账单清退!", "error");
        return;
    }
    var html = "<div class='quitBill' >" +
        "<p>请选择公司与金融公司：</p>" +
        "<div class='main' >" +
        "<p><label class='check-option' onclick='changeType(1)'><input type='radio' name='quitType' value='1' checked='checked' /><i class='text'>清退</i></label></p>" +
        "<p><label class='check-option' onclick='changeType(2)'><input type='radio' name='quitType' value='2' /><i class='text'>代偿</i></label></p>" +
        "</div>" +
        "<p class='other' id='show1'>约定还款日：<input type='text' class='text-input' name='repaymentDate' value='' onfocus='WdatePicker()'/></p>" +
        "<p class='other' id='show2'><label class='checkbox-a'><input type='checkbox' class='input_check' name='hand_fee' value='true' /><span></span><i>是否增收租客手续费(月租金6%)</i></label></p>" +
        "</div>";
    var submit = function (v, h, f) {
        if (v == 0) {
            return true;
        }
        if (v == 1) {
            if (typeof(f.quitType) == "undefined") {
                $.jBox.tip("请选择清退类型", "error");
                return false;
            }
            if (f.quitType == 1) {
                $("#show1").show();
                $(".jbox-button-panel").html("").append("<button class='jbox-button' style='padding:0px 10px 0px 10px;' onclick='comfirmQuitBill()'>确认</button>");
                return false;
            }
            if (f.quitType == 2) {
                $("#show2").show();
                $(".jbox-button-panel").html("").append("<button class='jbox-button' style='padding:0px 10px 0px 10px;' onclick='comfirmQuitBill()'>确认</button>");
                return false;
            }
        }
        return false;
    };
    $.jBox(html, {title: "租客清退", width: 420, submit: submit, buttons: {'下一步': 1, '取消': 0}});
}

/**
 * 金融账单按钮
 * @param obj
 */
function viewRepayBills(obj) {
    var billTableList = $(obj).parent().parent().find(".billTableList");
    if ($(obj).text() == "金融账单") {

        $(billTableList).find("td[data-text='bcb_realPayment']").hide();
        $(billTableList).find("td[data-text='bcb_balance']").hide();
        $(billTableList).find("td[data-text='bcb_realPaymentDate']").hide();
        $(billTableList).find("td[data-text='bcb_remarks']").hide();
        $(billTableList).find("td[data-text='bcb_operation']").hide();

        $(billTableList).animate({width: "30%"}, 400);
        $(obj).text("关闭").siblings().hide();
    }
    else {

        $(billTableList).find("td[data-text='bcb_realPayment']").show();
        $(billTableList).find("td[data-text='bcb_balance']").show();
        $(billTableList).find("td[data-text='bcb_realPaymentDate']").show();
        $(billTableList).find("td[data-text='bcb_remarks']").show();
        $(billTableList).find("td[data-text='bcb_operation']").show();

        $(billTableList).animate({width: "100%"}, 200);
        $(obj).text("金融账单").siblings(":not(#insert-options)").show();
    }
}

/**
 * 付款状态
 * @param param
 */
function returnPayState(param) {
    switch (param) {
        case 0:
            return "未付款";
            break;
        case 1:
            return "已付款";
            break;
        default:
            return "";
            break;
    }
}

/**
 * 付款状态
 * @param param
 */
function returnPayStateClass(param) {
    switch (param) {
        case 0:
            return "hint";
            break;
        case 1:
            return "next";
            break;
        default:
            return "";
            break;
    }
}

/**
 * 切换类型
 * @param obj
 */
function changeType(obj) {
    var bool1 = $("#show1").is(":hidden");
    var bool2 = $("#show2").is(":hidden");
    if (bool1 && bool2) {
        return;
    }
    if (obj == 1) {
        $("#show1").show();
        $("#show2").hide();
    }
    if (obj == 2) {
        $("#show2").show();
        $("#show1").hide();
    }
}

//金钱
function clearNoNums(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
}

/**
 * 提交清退
 */
function comfirmQuitBill() {
    var viewBill = $(".viewBill:visible");
    var quitBill = $(".quitBill");

    var bco_code = $(viewBill).find("#code").text();
    var multiCycles = "";
    $(viewBill).find("input[name='billId']:checked").each(function () {
        multiCycles = multiCycles + "," + $(this).parent().attr('data-cycle');
    });
    var quitType = $(quitBill).find("input[name='quitType']:checked").val();
    var hand_fee = $(quitBill).find("input[name='hand_fee']:checked").val();
    var repaymentDate = $(quitBill).find("input[name='repaymentDate']").val();

    if (quitType == 1 && repaymentDate == "") {
        $.jBox.tip("请选择还款日期！", "error");
        return;
    }
    $.post(
        "/financeManage/quitWithPartner",
        {"bco_code": bco_code, "multiCycles": multiCycles, "quitType": quitType, "hand_fee": hand_fee, "repaymentDate": repaymentDate},
        function (result) {
            if (result.msg == "success") {
                $.jBox.tip("操作成功！", "success");
                dataList($(".viewBill:visible").prev());
            }
            else {
                $.jBox.tip(result.msg, "error");
            }
        }, "json");
    $(".jbox-body").remove();
}

/**
 * 收支类型
 *
 * @param param
 */
function returnBalpayClass(param) {
    switch (param) {
        case 1:
            return "red";
            break;
        case 0:
            return "green";
            break;
        default :
            return "";
            break;
    }
}

/**
 * 收支类型
 *
 * @param param
 */
function returnBalpay(param) {
    switch (param) {
        case 0:
            return "收";
            break;
        case 1:
            return "支";
            break;
        default :
            return "";
            break;
    }
}

/**
 * 金融账单类型
 *
 * @param param
 */
function returnBillType1(param) {
    switch (param) {
        case 1:
            return "租金";
            break;
        case 2:
            return "服务费";
            break;
        case 3:
            return "违约金";
            break;
        case 4:
            return "手续费";
            break;
        default :
            return "";
            break;
    }
}

/**
 * 账单类型
 *
 * @param param
 */
function returnStateClass1(param) {
    switch (param) {
        case 0:
            return "hint";
            break;
        case 1:
            return "next";
            break;
        default :
            return "";
            break;
    }
}

/**
 * 账单类型
 *
 * @param param
 */
function returnState1(param1, param2) {

    if (param1 == 0) {
        return param2 == 0 ? "待收款" : "已收款";
    }
    else {
        return param2 == 0 ? "待还款" : "已还款";
    }
}

/**
 * 订单类型筛选
 *
 * @param obj
 */
function searchOrderType(obj) {
    // 暂时处理，考虑扩展性
    bco_type = parseInt($(obj).val());
    var param = {
        "bco_type": bco_type,
        "contractObject_State": $("#searchContractState").val(),
        "contractBody_PayStyle": $("#searchPayStyle").val(),
        "bco_cooperater": $("#searchPartner").val(),
        "bco_optionState": $("#searchOptionState").val(),
        "ucc_id": $("#searchDepartment").val()
    };
    loadData(param, false);
}

/**
 * 合同状态筛选
 *
 * @param obj
 */
function searchContractState(obj) {
    var param = {
        "bco_type": bco_type,
        "contractObject_State": $(obj).val(),
        "contractBody_PayStyle": $("#searchPayStyle").val(),
        "bco_cooperater": $("#searchPartner").val(),
        "bco_optionState": $("#searchOptionState").val(),
        "ucc_id": $("#searchDepartment").val()
    };
    loadData(param, false);
}

/**
 * 支付方式筛选
 *
 * @param obj
 */
function searchPayStyle(obj) {
    if ($(obj).val() == "季付" || $(obj).val() == "半年付" || $(obj).val() == "年付") {
        $("#searchPartner").empty().append("<option value='管家婆'>管家婆</option>");
    }
    else {
        $("#searchPartner").empty().append("<option value=''>收款机构</option><option value='管家婆'>管家婆</option><option value='乐首付'>乐首付</option><option value='58分期'>58分期</option><option value='会分期'>会分期</option><option value='租了么'>租了么</option>");
    }
    var param = {
        "bco_type": bco_type,
        "contractObject_State": $("#searchContractState").val(),
        "contractBody_PayStyle": $(obj).val(),
        "bco_cooperater": $("#searchPartner").val(),
        "bco_optionState": $("#searchOptionState").val(),
        "ucc_id": $("#searchDepartment").val()
    };
    loadData(param, false);
}

/**
 * 收款机构筛选
 *
 * @param obj
 */
function searchPartner(obj) {
    var param = {
        "bco_type": bco_type,
        "contractObject_State": $("#searchContractState").val(),
        "contractBody_PayStyle": $("#searchPayStyle").val(),
        "bco_cooperater": $(obj).val(),
        "bco_optionState": $("#searchOptionState").val(),
        "ucc_id": $("#searchDepartment").val()
    };
    loadData(param, false);
}

/**
 * 订单状态筛选
 *
 * @param obj
 */
function searchOptionState(obj) {
    var param = {
        "bco_type": bco_type,
        "contractObject_State": $("#searchContractState").val(),
        "contractBody_PayStyle": $("#searchPayStyle").val(),
        "bco_cooperater": $("#searchPartner").val(),
        "bco_optionState": $(obj).val(),
        "ucc_id": $("#searchDepartment").val()
    };
    loadData(param, false);
}

/**
 * 归属部门筛选
 *
 * @param obj
 */
function searchDepartment(obj) {
    var param = {
        "bco_type": bco_type,
        "contractObject_State": $("#searchContractState").val(),
        "contractBody_PayStyle": $("#searchPayStyle").val(),
        "bco_cooperater": $("#searchPartner").val(),
        "bco_optionState": $("#searchOptionState").val(),
        "ucc_id": $(obj).val()
    };
    loadData(param, false);
}
