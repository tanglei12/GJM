var _mode = "";
var _title = "";
$(function () {
    _mode = getUrlParam("mode");

    // 初始化视图
    init_view();
    // 初始化数据
    init_data();

    bindClickToContractNo();
});

/**
 * 加载视图
 */
function init_view() {
    switch (_mode) {
        case "auditing" :
            $("title").text("合同审核");
            break;
        case "review" :
            $("title").text("合同复核");
            break;
        case "myself" :
            $("title").text("我的合同");
            break;
        case "team" :
            $("title").text("部门合同");
            break;
        default :
            $("title").text("合同信息");
            break;
    }
    _title = $("title").text();
}

/**
 * 加载数据
 */
function init_data() {

    // 时间
    var dates = [
        {name: "录入日期", string: "contractObject_CreateTime", order_by: 'DESC'},
        {name: "起始日期", string: "contractObject_Date", order_by: 'ASC'},
        {name: "截止日期", string: "contractObject_DeadlineTime", order_by: 'ASC'},
        {name: "签订日期", string: "contractObject_FillTime", order_by: 'ASC'},
        {name: "首付租金日期", string: "contractBody_StartPayTime", order_by: 'DESC'},
    ];

    // 标题
    var titles = [
        {name: "编号", string: "", parameter: ""},
        {name: "合同编号", string: "contractObject_No", parameter: ""},
        {name: "小区房号", string: "house_address", parameter: "", href: '/houseLibrary/jumpHouseInfo&hi_code',},
        {name: "特价", string: "contractBody_Discount", parameter: {1: "", 2: "特价",}},
        {name: "合同类型", string: "contractObject_Type", parameter: ""},
        //	{ name : "招租状态", string : "hi_forRentState", parameter: ""},
        {name: "房屋状态", string: "contractObject_ExtState", parameter: returnContractExtendState().list},
        {name: "合同状态", string: "contractObject_State", parameter: returnContractState().list},
        {name: "操作状态", string: "contractObject_OptionState", parameter: returnContractOptionState().list},
        {name: "起止日期", string: "contractBody_StartTOEnd", parameter: ""},
        {name: "租金", string: "contractBody_Rent", parameter: ""},
        {name: "付款方式", string: "contractBody_PayStyle", parameter: ""},
        {name: "金融机构", string: "contractBody_PayType", parameter: ""},
        {name: "甲方信息", string: "cc_name", parameter: "", string1: "ccp_phone", parameter1: "", string1_prefix: " / "},
        {name: "管家信息", string: "em_name", parameter: "", string1: "em_phone", parameter1: "", string1_prefix: " / "},
        {name: "原始管家", string: "contractBody_GjName", parameter: ""},
        {name: "合同归属部门", string: "ucc_name", parameter: ""},
        {name: "首付租金日期", string: "contractBody_StartPayTime", parameter: "", format: "yyyy-MM-dd"},
        {name: "签订日期", string: "contractObject_FillTime", parameter: "", format: "yyyy-MM-dd"},
        {name: "录入日期", string: "contractObject_CreateTime", parameter: "", format: "yyyy-MM-dd"},
    ];
    // 额外元素
    var search_bars = [];
    switch (_mode) {
        case "auditing":
            search_bars.push({
                name: "contractObject_OptionState",
                type: "select",
                selected: 102,
                data: {
                    0: "全部状态",
                    102: "待审核",
                    103: "审核未通过",
                    104: "待复核",
                    105: "复核未通过",
                }
            });
            break;
        case "review":
            search_bars.push({
                name: "contractObject_OptionState",
                type: "select",
                selected: 104,
                data: {
                    0: "全部状态",
                    104: "待复核",
                    105: "复核未通过",
                    106: "已复核",
                    107: "作废"
                }
            });
            break;
        default :
            search_bars.push({
                name: "contractObject_Type",
                type: "select",
                selected: 0,
                data: {
                    0: "合同类型",
                    "托管合同": "托管合同",
                    "租赁合同": "租赁合同",
                }
            }, {
                name: "contractObject_OptionState",
                type: "select",
                selected: 106,
                data: {
                    0: "全部状态",
                    101: "编辑",
                    102: "待审核",
                    103: "审核未通过",
                    104: "待复核",
                    105: "复核未通过",
                    106: "已复核(已生效)",
                    107: "作废"
                }
            });
            break;
    }

    // 初始化
    $("#content").table({
        search: true,
        dataTime: dates,
        title: titles,
        search_bars: search_bars,
        url: "/contractObject/selectContractList",
        data: {
            mode: getQueryString("mode")
        },
        success: function (result) {
            //关闭滑层
            closeDiv();

            $(result).find("table.personTable tbody tr").each(function () {
                var _data = $(this).find("[name=check]").data("data");
                if (!isEmpty(_data)) {
                    // 【合同状态】
                    var state = $(this).find("td[data-text=contractObject_State]");
                    var state_data = returnContractStateStr(returnValue(state.html()));
                    state.html(state_data.title).addClass(state_data.color);

                    // 【操作状态】
                    var option_state = $(this).find("td[data-text=contractObject_OptionState]");
                    var option_state_data = returnContractOptionStateStr(returnValue(option_state.html()));
                    option_state.html(option_state_data.title).addClass(option_state_data.color);

                    // 【房屋状态】
                    var contract_type = $(this).find("td[data-text=contractObject_Type]");
                    contract_type.addClass(contract_type.text() == "托管合同" ? "hint" : "next");

                    // 【合同扩展状态】
                    var house_state = $(this).find("td[data-text=contractObject_ExtState]");
                    house_state.addClass(returnContractExtendStateStr(returnValue(house_state.text())).style);

                    // 租金样式
                    $(this).find("td[data-text=contractBody_Rent]").addClass("ok");

                    // 到期
                    var ymd = _data.contractObject_dateDiff;
                    if (_data.contractObject_State == 2 && ymd < 0) {
                        $(this).find("td[data-text=contractObject_No]").append('<span class="table-item-icon error-bg" title="超期' + Math.abs(ymd) + '天">超&nbsp;' + Math.abs(ymd) + '</span>');
                    }
                    if (_data.contractObject_State == 2 && ymd <= 31 && ymd > 0) {
                        $(this).find("td[data-text=contractObject_No]").append('<span class="table-item-icon ok-bg" title="还有' + Math.abs(ymd) + '天到期">到&nbsp;' + Math.abs(ymd) + '</span>');
                    }
                    if (_data.contractObject_State == 2 && ymd == 0) {
                        $(this).find("td[data-text=contractObject_No]").append('<span class="table-item-icon next-bg" title="该合同今日到期，请及时处理">今日到期</span>');
                    }

                    //招租状态
                    var hi = _data.hi_isForRent;
                    var td = $(this).find("td").eq(3).html();
                    $(this).find("td").eq(3).text('');
                    var td3 = $(this).find("td").eq(3);
                    var div = '';
                    if (hi == 1) {  //不等于停止 解约  暂停招租
                        div = '<div>' + td + '<span style="color:white;font-style:normal;border:1px solid;margin-left:2px;padding:4px 6px;background-color:#E74C3C;">' + "招租" + '</span></div>';
                    } else {
                        div = '<div>' + td + '</div>';
                    }
                    td3.append(div);
                }
            });
        }
    });

}

// 刷新Iframe界面
function refreshDiv() {
    $('#contractInfoIframe').attr('src', $('#contractInfoIframe').attr('src'));
}

//关闭添加来源窗口
function closeDiv() {
    $("#contractInfo").animate({right: '-1500px'}, 300, function () {
        $("#contractInfo").hide();
    });
}

//绑定事件
function bindClickToContractNo() {
    $("td[data-text='contractObject_No']").live({
        "hover": function (obj) {
            var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
            var contractObj = $(obj.target.childNodes);
            var noText = contractObj[0].data;
            var innerHtml = $(obj.target)[0].innerHTML;
            var a_html = contractObj[0].outerHTML;
            if (!reg.test(noText) && a_html == undefined && $(obj.target)[0].outerHTML.indexOf("<a") < 0) {
                if (contractObj.length == 1) {
                    $(obj.target)[0].innerHTML = "<a href='#' style='cursor:pointer'>" + noText + "</a>";
                } else if (contractObj.length == 2) {
                    $(obj.target)[0].innerHTML = "<a href='#' style='cursor:pointer'>" + noText + "</a>" + contractObj[1].outerHTML;
                }
            }
        },
        "click": function (obj) {
            var item_data = $(this).parents("tr").find("[name=check]").data("data");
            $("#contractInfoIframe").attr("src", "/contractObject/jumpDisplayContract?con_code=" + item_data.contractObject_Code);
            $("#contractInfo").show().animate({right: '0'}, 500);
        }
    });
}

/** 特殊修改*/
function adminEdit() {
    var _checked = $("input[name='check']:checked");
    switch (_checked.length) {
        case 0:
            $.hint.tip("请选择一个");
            break;
        case 1:
            var _data = _checked.data("data");
            var cno = _data.contractObject_No;
            var con_code = _data.contractObject_Code;
            var type = _data.contractObject_Type;

            if ("租赁合同" == type) {
                window.parent.href_mo('/contractObject/jumpAddContract?mode=edit&option=admin&contractObject_Code=' + con_code, '修改合同', '合同信息');
            } else {
                window.parent.href_mo('/contractObject/jumpAddContract?mode=edit&option=admin&contractObject_Code=' + con_code, '修改合同', '合同信息');
            }
            break;
        default:
            $.hint.tip("只能选择一个");
            break;
    }
}

/** 合同审核*/
function accept() {
    var _checked = $("input[name='check']:checked");
    switch (_checked.length) {
        case 0:
            $.hint.tip("请选择一个");
            break;
        case 1:
            var _data = _checked.data("data");
            var state = _data.contractObject_OptionState;
            var cno = _data.contractObject_No;
            var con_code = _data.contractObject_Code;
            var type = _data.contractObject_Type;

            if (state != 102) {
                $.hint.tip("该订单还不能审核");
                return;
            }
            window.parent.href_mo('/contractObject/jumpDisplayContract?mode=auditing&con_code=' + con_code + "", '审核合同', _title);//&role=charge
            break;
        default:
            $.hint.tip("只能选择一个");
            break;
    }
}

/** 合同复核*/
function reAccept() {
    var _checked = $("input[name='check']:checked");
    var len = _checked.length;
    switch (len) {
        case 0:
            $.hint.tip("请选择一个");
            break;
        case 1:
            var _data = _checked.data("data");
            var state = _data.contractObject_OptionState;
            var cno = _data.contractObject_No;
            var con_code = _data.contractObject_Code;
            var type = _data.contractObject_Type;

            if (state != 104) {
                $.hint.tip("该订单还不能复核");
                return;
            }
            window.parent.href_mo('/contractObject/jumpDisplayContract?mode=review&con_code=' + con_code + "#contractBill", '复核合同', _title);//&role=finance
            break;
        default:
            $.hint.tip("只能选择一个");
            break;
    }
}

/** 变更支付方式*/
function changePayWay() {
    var _checked = $("[name=check]:checked");
    var check_data = _checked.data("data");
    var con_code = check_data.contractObject_Code;
    var con_state = check_data.contractObject_State;
    var hi_code = check_data.hi_code;

    if (con_state != 2 && con_state != 1) return $.hint.tip("该合同已" + returnContractState(con_state).text + "，不能再申请合约", "error");

    $.ajax({
        type: "POST",
        url: "/contractObject/isHavingVaildCancelContract",
        data: {
            con_code: con_code,
            hi_code: hi_code
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) return $.hint.tip("该合同已签订解约申请", "error");
        window.top.href_mo('/contractObject/jumpCancelContractApply?mode=payway&con_code=' + con_code, '支付变更', _title);
    });
}

/** 合约申请*/
function adminChangePayWay() {
    var _checked = $("input[name='check']:checked");
    var state = _checked.attr("data-state");
    var cno = _checked.attr("data-cno");
    var hCode = _checked.attr("data-code");
    var type = _checked.attr("data-type");
    var bascState = _checked.attr("data-bascState");
    var len = _checked.length;
    if (len == 0) {
        $.hint.tip("请选择一个");
        return;
    }
    if (len > 1) {
        $.hint.tip("只能选择一个");
        return;
    }
    if (state != 106) {
        $.hint.tip("该合同还不能合约申请");
        return;
    }
    window.parent.href_mo('/contractObject/jumpCancelContractApply?mode=payway&contractObject_No=' + cno, '支付变更', _title);
}

/** 跳转合同详情*/
function hrefClick(obj) {
    window.parent.href_mo($(obj).attr("data-type"), "房源详情", "合同信息");
}

///** 跳转合同详情*/
//function jumpContractInfo(obj){
//	window.parent.href_mo('/contractObject/jumpAddContract?mode=edit&option=admin&contractObject_No=' + $(obj).attr("data-type"),'修改合同','合同信息');
//}
