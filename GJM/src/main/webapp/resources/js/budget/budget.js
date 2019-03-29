var contractObject_Type = ''; //合同类型
var bcb_balPay = '' //收支类型
var bcb_type = '' //账单类型
var day = '' //应还款时间
var startDate = '';
var endDate = '';

$(function () {
    load_data();
});

function load_data() {
    var filterDateParams = [
        {name: "时间周期", value: "bcb_repaymentDate", sort: 'DESC'},
    ];
    var filterBars = [];
    var listParams = [
        {text: "小区房号", name: "house_address", param: ""},
        {text: "合同类型", name: "contractObject_Type", param: ""},
        {text: "客户信息", name: "cc_name{-}ccp_phone", param: "", string1: "ccp_phone", parameter1: "", string1_prefix: " / "},
        {text: "合同状态", name: "contractObject_State", param: "returnContractState"},
        {text: "起止日期", name: "contractBody_StartTOEnd", param: ""},
        {text: "账单类型", name: "bcb_type", param: "returnBillBcbType"},
        {text: "收支类型", name: "bcb_balPay", param: "returnBillBalPay"},
        {text: "应支/收", name: "totalRepayment", param: ""},
        {text: "实支/收", name: "totalRealPayment", param: ""},
        {text: "未支/收", name: "bcb_balance", param: ""},
        {text: "金融机构", name: "contractBody_PayType", param: ""},
        {text: "管家信息", name: "em_name", param: "", string1: "em_phone", parameter1: "", string1_prefix: " / "},
        {text: "合同归属部门", name: "ucc_name", param: ""},
        {text: "应还款时间", name: "bcb_repaymentDate", param: "date"},
    ];
    var tableThead = [
        {text: "房东"},
        {text: "租客"},
        // {text: "第三方"},
    ]
    var tableTheadtr = [
        {text: "租金"},
        {text: "押金"},
        {text: "其它"},
        {text: "租金"},
        {text: "押金"},
        {text: "其它"},
        // {text: "租金"},
        // {text: "其它"},
    ];

    var dtd = $.Deferred();
    // 获取权限
    $.power.getButton(function (list) {
        $.each(list, function (index, item) {
            if (item.ucps_url.indexOf("ucc_name") > -1) {
                filterBars.push({name: "ucc_id", type: "select", selected: "", data: "returnUccNameState"});
            }
        });
        dtd.resolve();
    });

    // 获取列表数据
    $.when(dtd).done(function () {
        $.table({
            tableThead: tableThead,
            tableTheadtr: tableTheadtr,
            filterDateParams: filterDateParams,
            listParams: listParams,
            filterBars: filterBars,
            filterWhere: true,
            ajaxParams: {
                url: "/budget/queryBudget",
                beforeSend: function () {
                    $(".table-budget").html('<tr><td colspan="9"><div class="loading"></div></td></tr>');
                }
            },
            ajaxDone: function (h) {
                $('.custom-table-head').hide();
                $('.custom-table-body').hide();
                $('.list-table-foot').hide();
                var data = '';
                h.find(".list-content-item").each(function () {
                    data = $(this).find("[name=table-checkbox]").data("data");
                    //【合同类型】
                    var contract_type = data.contractObject_Type;
                    $(this).find("[name=contractObject_Type]").addClass(contract_type == "托管合同" ? "hint" : "next");
                });
                $(".table-budget").empty();
                var html = '';
                if (data != '') {
                    //日期
                    var d = $("[name=screen-date-change]").val();
                    if (d != 'all') {
                        if (d == 'custom') {
                            startDate = $("[name=custom-start-date]:visible").val();
                            endDate = $("[name=custom-end-date]:visible").val();
                        } else {
                            var date = new Date();//当前时间
                            var month = zeroFill(date.getMonth() + 1);//月
                            var day = zeroFill(date.getDate());//日
                            //开始日期
                            startDate=date.getFullYear() + "-" + month + "-" + day;
                            //结束日期
                            var curDate=new Date(date.getTime()+d*24*3600*1000);
                            endDate=curDate.getFullYear() + "-" + zeroFill(curDate.getMonth() + 1) + "-" + zeroFill(curDate.getDate());
                        }
                    }
                    $(data).each(function (index, item) {
                        if (index == 0) {
                            html += '       <tr>';
                            html += '           <td class="td-title">本期<i style="display: block;font: normal normal normal 14px/1 FontAwesome;">'+startDate+''+"~"+''+endDate+'</i></td>';
                            html += '           <td class="td-main"><i class="td-main-i">' + returnMoney(item.landlordRentNow) + '</i><button class="result-option" onclick="loadDataList(this,0,0,0);"><i class="fa-search" style="margin-right: 4px;">' + "查看" + '</i></button></td>';
                            html += '           <td class="td-main"><i class="td-main-i">' + returnMoney(item.landlordDepositNow) + '</i><button class="result-option" onclick="loadDataList(this,1,0,0);"><i class="fa-search" style="margin-right: 4px;">' + "查看" + '</i></button></td>';
                            html += '           <td class="td-main"><i class="td-main-i">' + returnMoney(item.landlordOtherNow) + '</i><button class="result-option" onclick="loadDataList(this,4,0,0);"><i class="fa-search" style="margin-right: 4px;">' + "查看" + '</i></button></td>';
                            html += '           <td class="td-main"><i class="td-main-i">' + returnMoney(item.tenantRentNow) + '</i><button class="result-option" onclick="loadDataList(this,0,1,0);"><i class="fa-search" style="margin-right: 4px;">' + "查看" + '</i></button></td>';
                            html += '           <td class="td-main"><i class="td-main-i">' + returnMoney(item.tenantDepositNow) + '</i><button class="result-option" onclick="loadDataList(this,1,1,0);"><i class="fa-search" style="margin-right: 4px;">' + "查看" + '</i></button></td>';
                            html += '           <td class="td-main"><i class="td-main-i">' + returnMoney(item.tenantOtherNow) + '</i><button class="result-option" onclick="loadDataList(this,4,1,0);"><i class="fa-search" style="margin-right: 4px;">' + "查看" + '</i></button></td>';
                            html += '           <td class="td-main">' + (parseFloat(item.landlordRentNow) + parseFloat(item.landlordOtherNow) + parseFloat(item.tenantRentNow) + parseFloat(item.tenantDepositNow) + parseFloat(item.tenantOtherNow)).toFixed(2) + '</td>';
                            // html += '           <td class="td-main"></td>';
                            // html += '           <td class="td-main"></td>';
                            html += '       </tr>';
                            html += '       <tr class="cont-table-tbody-tr">';
                            html += '           <td class="td-title">往期<i style="display: block;font: normal normal normal 14px/1 FontAwesome;">~'+startDate+'</i></td>';
                            html += '           <td class="td-main"><i class="td-main-i">' + returnMoney(item.landlordRentOld) + '</i><button class="result-option" onclick="loadDataList(this,0,0,1);"><i class="fa-search" style="margin-right: 4px;">' + "查看" + '</i></button></td>';
                            html += '           <td class="td-main"><i class="td-main-i">' + returnMoney(item.landlordDepositOld) + '</i><button class="result-option" onclick="loadDataList(this,1,0,1);"><i class="fa-search" style="margin-right: 4px;">' + "查看" + '</i></button></td>';
                            html += '           <td class="td-main"><i class="td-main-i">' + returnMoney(item.landlordOtherOld) + '</i><button class="result-option" onclick="loadDataList(this,4,0,1);"><i class="fa-search" style="margin-right: 4px;">' + "查看" + '</i></button></td>';
                            html += '           <td class="td-main"><i class="td-main-i">' + returnMoney(item.tenantRentOld) + '</i><button class="result-option" onclick="loadDataList(this,0,1,1);"><i class="fa-search" style="margin-right: 4px;">' + "查看" + '</i></button></td>';
                            html += '           <td class="td-main"><i class="td-main-i">' + returnMoney(item.tenantDepositOld) + '</i><button class="result-option" onclick="loadDataList(this,1,1,1);"><i class="fa-search" style="margin-right: 4px;">' + "查看" + '</i></button></td>';
                            html += '           <td class="td-main"><i class="td-main-i">' + returnMoney(item.tenantOtherOld) + '</i><button class="result-option" onclick="loadDataList(this,4,1,1);"><i class="fa-search" style="margin-right: 4px;">' + "查看" + '</i></button></td>';
                            html += '           <td class="td-main">' + (parseFloat(item.landlordRentOld) + parseFloat(item.landlordOtherOld) + parseFloat(item.tenantRentOld) + parseFloat(item.tenantDepositOld) + parseFloat(item.tenantOtherOld)).toFixed(2) + '</td>';
                            // html += '           <td class="td-main"></td>';
                            // html += '           <td class="td-main"></td>';
                            html += '       </tr>';
                            html += '       <tr class="cont-table-tbody-tr">';
                            html += '           <td class="td-title">合计</td>';
                            html += '           <td class="td-main"><i class="td-main-sum">' + (parseFloat(item.landlordRentNow) + parseFloat(item.landlordRentOld)).toFixed(2) + '</i></td>';
                            html += '           <td class="td-main"><i class="td-main-sum">' + (parseFloat(item.landlordDepositNow) + parseFloat(item.landlordDepositOld)).toFixed(2) + '</i></td>';
                            html += '           <td class="td-main"><i class="td-main-sum">' + (parseFloat(item.landlordOtherNow) + parseFloat(item.landlordOtherOld)).toFixed(2) + '</i></td>';
                            html += '           <td class="td-main"><i class="td-main-sum">' + (parseFloat(item.tenantRentNow) + parseFloat(item.tenantRentOld)).toFixed(2) + '</i></td>';
                            html += '           <td class="td-main"><i class="td-main-sum">' + (parseFloat(item.tenantDepositNow) + parseFloat(item.tenantDepositOld)).toFixed(2) + '</i></td>';
                            html += '           <td class="td-main"><i class="td-main-sum">' + (parseFloat(item.tenantOtherNow) + parseFloat(item.tenantOtherOld)).toFixed(2) + '</i></td>';
                            html += '           <td class="td-main">' + (parseFloat(item.landlordRentNow) + parseFloat(item.landlordOtherNow) + parseFloat(item.tenantRentNow) + parseFloat(item.tenantDepositNow) + parseFloat(item.tenantOtherNow) + parseFloat(item.landlordRentOld) + parseFloat(item.landlordOtherOld) + parseFloat(item.tenantRentOld) + parseFloat(item.tenantDepositOld) + parseFloat(item.tenantOtherOld)).toFixed(2) + '</td>';
                            // html += '           <td class="td-main"></td>';
                            // html += '           <td class="td-main"></td>';
                            html += '       </tr>';
                        }
                    })
                }
                // html += '   </tbody>';
                // html += '</table>';
                $('.list-table-main .table-money .table-budget').append(html);
            },
            popup: {
                width: "73%",
                result: function (box, _data) {
                },
                close: function () {
                }
            }
        });
    });
}

function loadDataList (obj,bcbType,contractObjectType,start_Date) {
    $("#pageNo").text(1);
    bcb_type=bcbType;
    contractObject_Type=contractObjectType;
    startDate=start_Date;
    load_dataList(obj,bcb_type,contractObject_Type,startDate);
}
//列表请求
function load_dataList(obj,bcb_type,contractObject_Type,startDate) {
    $('#bcb_type').val(bcb_type);
    $('#contractObject_Type').val(contractObject_Type);
    $('#startDate').val(startDate);
    //点击
    $(obj).parents('.table-budget').each(function () {
        if ($(this).find('tr td button').hasClass('next-bg')) {
            $(this).find('td button').removeClass('next-bg');
        }
        $(obj).addClass('next-bg');
    })

    var listParams = [
        {text: "小区房号", name: "house_address", param: ""},
        {text: "合同类型", name: "contractObject_Type", param: ""},
        {text: "客户信息", name: "cc_name{-}ccp_phone", param: "", string1: "ccp_phone", parameter1: "", string1_prefix: " / "},
        {text: "合同状态", name: "contractObject_State", param: "returnContractState"},
        {text: "起止日期", name: "contractBody_StartTOEnd", param: ""},
        {text: "账单类型", name: "bcb_type", param: "returnBillBcbType"},
        {text: "收支类型", name: "bcb_balPay", param: "returnBillBalPay"},
        {text: "应支/收", name: "totalRepayment", param: ""},
        {text: "实支/收", name: "totalRealPayment", param: ""},
        {text: "未支/收", name: "bcb_balance", param: ""},
        {text: "金融机构", name: "contractBody_PayType", param: ""},
        {text: "管家信息", name: "em_name", param: "", string1: "em_phone", parameter1: "", string1_prefix: " / "},
        {text: "合同归属部门", name: "ucc_name", param: ""},
        {text: "应还款时间", name: "bcb_repaymentDate", param: "date"},
    ];
    console.log(contractObject_Type);
    if (contractObject_Type ==0) {
        contractObject_Type='托管合同';
    } else {
        contractObject_Type='租赁合同';
    }
    var pageNo = returnNumber($("#pageNo").text());
    var pageSize = $.cookie("pageSize");
    if (isEmpty(pageSize)) {
        $.cookie("pageSize", 16, {expires: 7, path: "/"});
        pageSize = $.cookie("pageSize");
    }
    var data = {
        pageNo: pageNo,
        pageSize: pageSize,
        queryWhere: [],
        querySort: []
    };
    // 归属部门
    var bar_val = $('[name=ucc_id]').val();
    if (isEmpty(bar_val)) return;
    if (bar_val != "0") {
        data.queryWhere.push({
            key: 'ucc_id',
            value: bar_val.trim(),
            operator: "filter"
        });
    }
    //日期
    var dateObj = $("[name=screen-date-data]");
    var dateMode = $("[name=screen-date-change]");
    if (startDate == 0) {
        data.queryWhere.push({
            key: dateObj.val(),
            mode: dateMode.val(),
            startDate: $("[name=custom-start-date]:visible").val(),
            endDate: $("[name=custom-end-date]:visible").val()
        });
    }
    //账单类型
    data.queryWhere.push({
        key: 'bcb_type',
        value: bcb_type,
        operator: "filter"
    });
    //合同类型
    data.queryWhere.push({
        key: 'contractObject_Type',
        value: contractObject_Type,
        operator: "filter"
    });
    //是否本期
    data.queryWhere.push({
        key: 'startDate',
        value: startDate,
        operator: "filter"
    });

    $('.custom-table-body').show();
    $('#table_tbody_list').empty();  //列表
    $("#table_tbody_list").prepend('<tr><td colspan="16"><div class="loading"></div></td></tr>');
    $.ajax({
        url: "/budget/queryBudgetList",
        type: "POST",
        data: data,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            // $('#table_tbody_list').empty();  //列表
            $('.list-table-foot').empty();   // 分页
            $(".list-table-content .loading").remove();
            var list=result.data.list;
            if (list == null || list.length === 0) {
                var empty_html =
                    '<tr style="background: #ffffff !important;">' +
                    '   <td class="table-data-empty" colspan="99"></td>' +
                    '</tr>';
                $("#table_tbody_list").html(empty_html);
            }
            $.each(list, function (index, data) {
                var body_html = '';
                body_html += '<tr class="list-content-item ' + (index % 2 === 0 ? 'odd' : 'even') + '" data-index="' + index + '">';
                body_html += '	<td style="width: 40px;min-width: 40px;text-align: center;"><label class="table-checkbox-box"><input type="checkbox" name="table-checkbox"></label></td>';
                body_html += '	<td style="width: 40px;min-width: 44px;text-align: center;">' + (index + 1) + '</td>';
                // 遍历参数
                $.each(listParams, function (index1, item) {
                    var state = {};
                    // 处理拼接参数
                    if (typeof item.name === "string" && item.name.indexOf("{") > -1 && item.name.indexOf("}") > -1) {
                        var to_boo = true;
                        var text = item.name;
                        var name1 = text.substring(0, text.indexOf("{"));
                        var name2 = text.substring(text.indexOf("}") + 1, text.length);

                        state.text = data[text.substring(0, text.indexOf("{"))];
                        state = $.table.init_param(item, state);
                        to_boo = !isEmpty(state.text);
                        var html1 = '<label class="' + returnValue(state.style) + '">' + returnValue(state.text) + '</label>';

                        state.text = data[text.substring(text.indexOf("}") + 1, text.length)];
                        state = $.table.init_param(item, state);
                        to_boo = !isEmpty(state.text);
                        var html2 = '<label class="' + returnValue(state.style) + '">' + returnValue(state.text) + '</label>';

                        var to = to_boo ? text.substring(text.indexOf("{") + 1, text.indexOf("}")) : "";

                        body_html += '<td name="' + name1 + "_" + name2 + '">' + html1 + to + html2 + '</td>';
                    } else {
                        state.text = data[item.name];
                        state = $.table.init_param(item, state);
                        /**
                         * 方法识别
                         * func : {
                         *      type : 'onclick',
                         *      name : 'functionName(param1, param2)'
                         * }
                         */
                        if (!isEmpty(item.func) && typeof item.func === "object") {
                            var state_function;
                            switch (item.func.type) {
                                case 'onclick':
                                    var _name = item.func.name;
                                    var _frist_name = _name.substring(0, _name.indexOf("("));
                                    var _param_name = _name.substring(_name.indexOf("(") + 1, _name.indexOf(")"));
                                    var _new_param = "";
                                    $.each(_param_name.split(","), function (index, subData) {
                                        _new_param += isEmpty(data[subData]) ? subData : "'" + data[subData] + "'";
                                    });
                                    item.func.name = _frist_name + '(' + _new_param + ')';
                                    state_function = ' onclick="' + item.func.name + '" style="cursor: pointer;"';
                                    break;
                            }
                            state.func = state_function;
                        }
                        body_html += '<td name="' + returnValue(item.name) + '" class="' + returnValue(state.style) + '" ' + (isEmpty(state.style2) ? "" : 'style="' + state.style2 + '"') + ' ' + (isEmpty(state.title) ? "" : 'title="' + state.title + '"') + ' ' + returnValue(state.func) + '>' + returnValue(state.text) + '</td>';
                    }
                });
                body_html += '</tr>';
                $("#table_tbody_list").append(body_html).find('.list-content-item[data-index=' + index + ']').find("[name=table-checkbox]").data("data", data);
            });
            var html='';
            html += '   <div class="foot-page">第&nbsp;<span id="pageNo">'+(pageNo == 0 ? 1 : pageNo)+'</span>/<span id="totalPage"></span>&nbsp;页，共<span id="totalRecords"></span>条记录</div>';
            html += '   <div class="foot-option"></div>';
            $('.list-table-foot').append(html);
            $("#totalPage").text(result.data.totalPage);
            $("#totalRecords").text(result.data.totalRecords);
            tablePage(result.data);

            $('.list-table-foot').show();
        },
        error: function () {

        }
    })
}
//分页
function tablePage(data) {
    var _box = $(".foot-option");
    var _pageNo = returnNumber($("#pageNo").text());
    var _totalPage = returnNumber($("#totalPage").text());
    var _limit = 10;
    _limit = _totalPage < _limit ? _totalPage : _limit;
    var _offset = returnNumber((_pageNo - 1) / _limit) * _limit + 1;
    _limit = _offset + _limit - 1;
    // 基础样式
    var html = '';
    html += '<button class="page-option page-prev fa-angle-left"></button>';
    for (var i = _offset; i <= _limit; i++) {
        html += '<button class="page-option page-num" value="' + i + '">' + i + '</button>';
    }
    html += '<button class="page-option page-next fa-angle-right"></button>';
    html += '<input type="type" class="page-input number" value="' + returnNumber(data.pageSize) + '">';
    html += '<button class="page-option page-set">设置</button>';
    _box.html(html);

    // 翻页样式
    if (_pageNo === _totalPage && _totalPage !== 1) {
        _box.find(".page-prev").removeAttr("disabled");
        _box.find(".page-next").attr("disabled", "disabled");
    } else if (_pageNo === 1 && _totalPage > 1) {
        _box.find(".page-prev").attr("disabled", "disabled");
        _box.find(".page-next").removeAttr("disabled");
    } else if (_pageNo === 1 && _totalPage <= 1) {
        _box.find(".page-prev").attr("disabled", "disabled");
        _box.find(".page-next").attr("disabled", "disabled");
    } else if (_pageNo !== 1 && _pageNo !== _totalPage) {
        _box.find(".page-prev").removeAttr("disabled");
        _box.find(".page-next").removeAttr("disabled");
    }

    // 页码样式
    _box.find(".page-num[value=" + _pageNo + "]").attr("disabled", "disabled");

    // 上一页
    _box.find(".page-prev").on("click", function () {
        $("#pageNo").text(_pageNo - 1);
        load_dataList(this,bcb_type,contractObject_Type,startDate);
    });
    // 下一页
    _box.find(".page-next").on("click", function () {
        $("#pageNo").text(_pageNo + 1);
        load_dataList(this,bcb_type,contractObject_Type,startDate);
    });
    // 点击页码
    _box.find(".page-num").on("click", function () {
        $("#pageNo").text($(this).val());
        load_dataList(this,bcb_type,contractObject_Type,startDate);
    });

    // 设置数值1
    _box.find(".page-set").on("click", function () {
        var _page_num = returnNumber(_box.find(".page-input").val());
        if (_page_num < 1 || _page_num > 100) {
            $.hint.tip("设值范围1~100");
            return;
        }
        $("#pageNo").text(1);
        $.cookie("pageSize", _page_num, {expires: 7});
        load_dataList(this,bcb_type,contractObject_Type,startDate);
    });
    // 设置数值2
    _box.find(".page-input").on("change", function () {
        var _page_num = returnNumber($(this).val());
        if (_page_num < 1 || _page_num > 100) {
            $.hint.tip("设值范围1~100");
            return;
        }
        $("#pageNo").text("1");
        $.cookie("pageSize", _page_num, {expires: 7});
        // bcb_type=$('#bcb_type').val();
        // contractObject_Type=$('#contractObject_Type').val();
        // startDate=$('#startDate').val();
        load_dataList(this,bcb_type,contractObject_Type,startDate);
    });
};

//导出数据
function ExportExcel() {
    if (contractObject_Type ==0) {
        contractObject_Type='托管合同';
    } else {
        contractObject_Type='租赁合同';
    }
    var data = {
        queryWhere: [],
        querySort: []
    };
    // 归属部门
    var bar_val = $('[name=ucc_id]').val();
    if (isEmpty(bar_val)) return;
    if (bar_val != "0") {
        data.queryWhere.push({
            key: 'ucc_id',
            value: bar_val.trim(),
            operator: "filter"
        });
    }
    //日期
    var dateObj = $("[name=screen-date-data]");
    var dateMode = $("[name=screen-date-change]");
    if (startDate == 0) {
        data.queryWhere.push({
            key: dateObj.val(),
            mode: dateMode.val(),
            startDate: $("[name=custom-start-date]:visible").val(),
            endDate: $("[name=custom-end-date]:visible").val()
        });
    }
    //账单类型
    data.queryWhere.push({
        key: 'bcb_type',
        value: bcb_type,
        operator: "filter"
    });
    //合同类型
    data.queryWhere.push({
        key: 'contractObject_Type',
        value: contractObject_Type,
        operator: "filter"
    });
    //是否本期
    data.queryWhere.push({
        key: 'startDate',
        value: startDate,
        operator: "filter"
    });
    $.ajax({
        url: "/budget/queryExportExcel",
        type: "POST",
        data: data,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (data) {
            window.top.location.href = data.path;
        },
        error: function () {

        }
    })
}

