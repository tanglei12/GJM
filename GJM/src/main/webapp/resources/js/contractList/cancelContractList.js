var _title = "";
var _mode = "";

$(function () {
    _mode = getUrlParam("mode");
    //
    init_view();
    //
    init_data();
});

/** 初始化视图*/
function init_view() {
    switch (_mode) {
        case "accept":
            $("title").text("合约审核");
            break;
        case "review":
            $("title").text("合约复核");
            break;
        default :
            $("title").text("合约订单");
            break;
    }
    _title = $("title").text();
}

/** 初始化数据*/
function init_data() {

    // 时间
    var dates = [];
    dates.push({name: "申请时间", string: "cco_applicationTime"});

    // 标题
    var titles = [];
    titles.push({name: "编号", string: "", parameter: ""});
    titles.push({name: "小区房号", string: "house_address", parameter: ""});
    titles.push({name: "合同号", string: "contractObject_No", parameter: ""});
    titles.push({name: "状态", string: "cco_state", parameter: ""});
    titles.push({name: "申请类型", string: "cco_applicationType", parameter: ""});
    titles.push({name: "费用", string: "cco_subletCost", parameter: ""});
    titles.push({name: "内容描述", string: "cco_applicationContent", parameter: ""});
    titles.push({name: "申请人", string: "cco_applicantName", parameter: ""});
    titles.push({name: "申请时间", string: "cco_applicationTime", parameter: "", format: "yyyy-MM-dd"});
    titles.push({name: "管家姓名", string: "cco_peopleName", parameter: ""});
    titles.push({name: "完成时间", string: "cco_FinishTime", parameter: "", format: "yyyy-MM-dd"});

    // 初始化
    $("#content").table({
        search: true,
        dataTime: dates,
        title: titles,
        search_bars: [{
            name: "cco_applicationType",
            type: "select",
            selected: 0,
            data: {
                0: "全部类型",
                "转租": "转租",
                "退租": "强退",
                "强收": "强收",
                "解约": "解约",
                "到期": "到期",
                "换房": "换房",
            }
        }, {
            name: "cco_state",
            type: "select",
            selected: 0,
            data: {
                0: "全部状态",
                "待审核": "待审核",
                "审核未通过": "审核未通过",
                "待复审": "待复审",
                "复审未通过": "复审未通过",
                "待交接": "待交接",
                "待结算": "待结算",
                "待复核": "待复核",
                "复核未通过": "复核未通过",
                "完成": "完成",
                "取消": "取消",
            }
        }],
        url: "/contractObject/queryCancelContractList",
        data: {},
        success: function (result) {
            $(result).find("table.personTable tbody tr").each(function () {

                // 【状态】
                var state = $(this).find("td:eq(4)");
                var state_data = returnCancelContractState(returnValue(state.html()));
                state.html(state_data.title).addClass(state_data.color);

                // 【类型】
                var option_state = $(this).find("td:eq(5)");
                var type = returnValue(option_state.html());
                var color = "next";
                if (type == "解约" || type == "到期") {
                    color = 'error';
                }
                option_state.html(type).addClass(color);
            });
        }
    });
}

function changeWhere() {
    $("#Num").text(1);
    init_data();
}

function changeType(obj) {
    var _name = $(obj).attr("name");
    $("input[name='" + _name + "']").parent().removeClass("span-checked");
    $(obj).parent().addClass("span-checked");
}

function setInitValue(obj) {
    var $param = $(obj);
    var _contractObject_No = $param.find("#contractObject_No").val();
    var _hi_code = $param.find("#hi_code").val();
    $("#contractObject_No").val(_contractObject_No);
    $("#hi_code").val(_hi_code);
    // 更多信息
    $("#moreInfo-box").html(
        '<div class="moreInfo-box">' +
        '<div class="hc-more" style="border-bottom: 1px solid #ddd;">' +
        '<label class="lable-more" style="font-weight:bold;width: 110px;border-right:1px solid #ddd;"></label>' +
        '<label class="lable-more" style="font-weight:bold;width: 120px;">合同编号</label>' +
        '<label class="lable-more" style="font-weight:bold;width: 120px;">甲方</label>' +
        '<label class="lable-more" style="font-weight:bold;width: 90px;">租金</label>' +
        '<label class="lable-more" style="font-weight:bold;width: 90px;">押金</label>' +
        '<label class="lable-more" style="font-weight:bold;width: 150px;">合同起止时间</label>' +
        '</div>' +
        '<div class="hc-more">' +
        '<label class="lable-more" style="width: 110px;font-weight:bold;border-right:1px solid #ddd;">' + $param.find("#contractObject_Type").val() + '</label>' +
        '<label class="lable-more" style="width: 120px;"><a href="javascript:window.parent.href_mo(\'/contractObject/jumpDisplayContract?contractObject_No=' + _contractObject_No + '\',\'查看合同\',\'解约申请\');">' + _contractObject_No + '</a></label>' +
        '<label class="lable-more" style="width: 120px;">' + $param.find("#contractObject_A").val() + '</label>' +
        '<label class="lable-more" style="width: 90px;">' + $param.find("#contractBody_Rent").val() + '元</label>' +
        '<label class="lable-more" style="width: 90px;">' + $param.find("#contractBody_Rent").val() + '元</label>' +
        '<label class="lable-more" style="width: 150px;">' + $param.find("#contractBody_StartTOEnd").val() + '</label>' +
        '</div>' +
        '</div>').show();
    // 申请人、联系电话
    $("#cco_applicant").val($param.find("#contractObject_A").val());
    $("#cco_phone").val($param.find("#contractSign_Phone").val());
    // 开户行，银行卡号
    $.ajax({
        type: "POST",
        url: "/queryCustomerInfo",
        data: {
            contractSign_CarNo: $param.find("#contractSign_CarNo").val()
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            $("#cco_bank").val(result.data.contractSign_Bank);
            $("#cco_bankCard").val(result.data.contractSign_BCNo);
        }
    });
    // 解约类型
    $("#cco_applicationType option").eq(0).attr("selected", true);
    if ($param.find("#contractObject_Type").val() == "托管合同") {
        $(".option-tg").show();
        $(".option-zl").hide();
    } else {
        $(".option-zl").show();
        $(".option-tg").hide();
    }
    // 转租费用
    var rent = $param.find("#contractBody_Rent").val();
    var _cco_moneyProportion = $("#cco_moneyProportion").val();
    $("#cco_subletCost").val((_cco_moneyProportion / 100) * rent);
}

function calServiceCoat1(obj) {
    var _thisVal = $(obj).val();
    if (isEmpty(_thisVal)) {
        return;
    }
    var rent = returnNumber($("#more-contractBody_Rent").text());
    if (rent == 0) {
        return;
    }
    $("#cco_subletCost").val(Math.round(((_thisVal / 100) * returnNumber($("#more-contractBody_Rent").text()))));
}

function calServiceCoat2(obj) {
    var _thisVal = $(obj).val();
    if (isEmpty(_thisVal)) {
        return;
    }
    var rent = returnNumber($("#more-contractBody_Rent").text());
    if (rent == 0) {
        return;
    }
    $("#cco_moneyProportion").val(Math.round((_thisVal / rent) * 100));
}

/** 提交解约申请*/
function applySubmit() {
    $(".form-control:required").each(function () {
        $(this).change();
        if (!CONTRACT_STATE) {
            $(this).focus();
            return false;
        }
    });
    if (!CONTRACT_STATE) {
        return;
    }
    $.ajax({
        type: "POST",
        url: "/applySubmit",
        data: {
            cco_code: $("#cco_code").val(),
            contractObject_No: $("#contractObject_No").val(),
            hi_code: $("#hi_code").val(),
            cco_applicationType: $("input[name='cancelType']:checked").val(),
            cco_applicant: $("#cco_applicant").val(),
            cco_phone: $("#cco_phone").val(),
            cco_bank: $("#cco_bank").val(),
            cco_bankCard: $("#cco_bankCard").val(),
            cco_key: $("#cco_key").val(),
            cco_subletCost: $("#cco_subletCost").val(),
            cco_moneyProportion: $("#cco_moneyProportion").val() + "%",
            cco_applicationContent: $("#cco_applicationContent").val(),
            cco_peopleName: $("#cco_peopleName").val()
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == 200) {
            swal({
                title: result.msg,
                type: "success"
            }, function () {
                window.location.href = "/contractObject/jumpCancelContractList";
            });
        } else {
            swal(result.msg, "", "warning");
        }
    });
}

/** 合约申请*/
function hysq() {
    window.parent.href_mo('/contractObject/contractObjectList', '合同信息', '合同信息');
}

/** 修改*/
function edit() {
    var checkCount = $("input[name='check']:checked").length;
    switch (checkCount) {
        case 0 :
            $.jBox.tip("请选择一个");
            break
        case 1 :
            var id = $("input[name='check']:checked").attr("id");
            var state = $("input[name='check']:checked").attr("data-state");
            if (state.indexOf("未通过") > -1) {
                var cno = $("input[name='check']:checked").attr("data-cno");
                window.parent.href_mo('/contractObject/jumpCancelContractApply?contractObject_No=' + cno + '&cco_code=' + id, '合约申请', _title);
            } else {
                $.jBox.tip("该合同不能进行修改");
            }
            break
        default :
            $.jBox.tip("只能选择一个");
            break
    }
}

/** 查看信息*/
function displayInfo(param) {
    window.parent.href_mo('/contractObject/jumpCancelContractEdit?mode=display&cco_code=' + param, '查看订单', _title);
}

/** 费用结算*/
function fyjs() {
    var checkCount = $("input[name='check']:checked").length;
    switch (checkCount) {
        case 0 :
            $.jBox.tip("请选择一个");
            break
        case 1 :
            var id = $("input[name='check']:checked").attr("id");
            var state = $("input[name='check']:checked").attr("data-state");
            if (state.indexOf("结算") > -1) {
                window.parent.href_mo('/contractObject/jumpContractClosingCost?cco_code=' + id, '费用结算', _title);
            } else {
                $.jBox.tip("该订单不能费用结算");
            }
            break
        default :
            $.jBox.tip("只能选择一个");
            break
    }
}

/** 提交复核*/
function tjfh() {
    var checkCount = $("input[name='check']:checked").length;
    switch (checkCount) {
        case 0 :
            $.jBox.tip("请选择一个");
            break
        case 1 :
            var id = $("input[name='check']:checked").attr("id");
            var state = $("input[name='check']:checked").attr("data-state");
            if ("结算完成" == state) {
                // 提交复核
                $.ajax({
                    type: "POST",
                    url: "/submitOrderReview",
                    data: {
                        cco_code: id
                    },
                    dataType: "json"
                }).done(function (result) {
                    if (result.code == 200) {
                        swal({
                            title: result.msg,
                            text: "",
                            type: "success"
                        }, function () {
                            changeWhere();
                        });
                    } else {
                        swal(result.msg, "", "warning");
                    }
                });
            } else {
                $.jBox.tip("该订单不需要审核");
            }
            break
        default :
            $.jBox.tip("只能选择一个");
            break
    }
}

/** 合约审核*/
function accept() {
    var checked = $("input[name='check']:checked");
    switch (checked.length) {
        case 0 :
            $.jBox.tip("请选择一个", "warning");
            break
        case 1 :
            var data = checked.data("data");
            if ("待审核" == data.cco_state) {
                window.parent.href_mo('/contractObject/jumpCancelContractAuditing?mode=auditing&con_code=' + data.contractObject_Code + '#step1', '审核合约', _title);
            } else if ("待复审" == data.cco_state) {
                window.parent.href_mo('/contractObject/jumpCancelContractAuditing?mode=reAuditing&con_code=' + data.contractObject_Code + '#step1', '审核合约', _title);
            } else {
                $.jBox.tip("该订单不需要审核");
            }
            break
        default :
            $.jBox.tip("只能选择一个", "warning");
            break
    }
}

/** 合约复核*/
function review() {
    var checked = $("input[name='check']:checked");
    switch (checked.length) {
        case 0 :
            $.jBox.tip("请选择一个");
            break
        case 1 :
            var data = checked.data("data");
            if ("待复核" == data.cco_state) {
                window.parent.href_mo('/contractObject/jumpCancelContractAuditing?mode=review&con_code=' + data.contractObject_Code + '#step1', '复核合约', _title);//jumpCancelContractEdit
            } else {
                $.jBox.tip("该订单不需要复核，只有待复核状态才能复核");
            }
            break
        default :
            $.jBox.tip("只能选择一个");
            break
    }
}
