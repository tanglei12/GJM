$(function () {
    loadData();
})

//加载数据
function loadData() {
    $.ajax({
        url: "/manageExamine/appealExamineDetail",
        type: "post",
        data: {
            ap_id: GetQueryString("ap_id"),
        },
        dataType: "json"
    }).done(function (result) {
        var zkdCustomerAppeal = result.data.zkdCustomerAppeal;
        var CustomerAppealUser = result.data.CustomerAppealUser;
        var CustomerAppealCompay = result.data.CustomerAppealCompay;
        //求租地段
        $("#pat").text(returnValue(zkdCustomerAppeal.cc_province) + returnValue(zkdCustomerAppeal.cc_area) + returnValue(zkdCustomerAppeal.cc_town));
        //户型
        $("#cc_room").text(returnCcRoom(zkdCustomerAppeal.cc_room).text);
        //租期
        $("#cc_lease").text(returnCcLease(zkdCustomerAppeal.cc_room).text);
        //期望小区
        $("#cc_propertyInfo").text(returnValue(zkdCustomerAppeal.cc_propertyInfo));
        //租客求租类型
        $("#cc_mode").text(returnCcMode(zkdCustomerAppeal.cc_mode).text);
        //租客求租金额
        $("#cc_money").text(isEmpty(zkdCustomerAppeal.cc_minMoney) ?returnValue(zkdCustomerAppeal.cc_maxMoney) : returnValue(zkdCustomerAppeal.cc_minMoney)+"-"+returnValue(zkdCustomerAppeal.cc_maxMoney));
        //求租说明
        $("#cc_require").text(returnValue(zkdCustomerAppeal.cc_require));
        //求租人
        $("#cc_name").text(returnValue(zkdCustomerAppeal.cc_name));
        //求租标题
        $("#cc_title").text(returnValue(zkdCustomerAppeal.cc_title));
        //租客电话
        $("#cc_phone").text(returnValue(zkdCustomerAppeal.cc_phone));
        //租客性别
        //$("#cc_sex").text(returnValue(zkdCustomerAppeal.cc_sex == 0 ? "女士" : "男士"));
        //申诉人
        $("#ca_name").text(returnValue(zkdCustomerAppeal.ca_name));
        //被投诉理由
        $("#ce_types").text(returnCeTypes(zkdCustomerAppeal.ce_types).text);
        //发布时间
        $("#cc_createTime").text(format(zkdCustomerAppeal.cc_createTime, "yyyy-MM-dd HH:mm:ss"));
        //联系方式
        $("#ca_phone").text(returnValue(zkdCustomerAppeal.ca_phone));
        //申诉时间
        $("#ap_creatime").text(format(zkdCustomerAppeal.ap_creatime, "yyyy-MM-dd HH:mm:ss"));
        //申诉说明
        $("#ap_explain").text(returnValue(zkdCustomerAppeal.ap_explain));
        //被投诉次数
        $("#er_count").text(returnValue(zkdCustomerAppeal.er_count));
        //举报信息
        if (isEmpty(CustomerAppealCompay)) {
            $("#informant").text(returnValue(CustomerAppealUser.ca_name));//举报人
            $("#informant_phone").text(returnValue(CustomerAppealUser.ca_phone));//举报人联系方式
            $("#ce_createTime").text(format(CustomerAppealUser.ce_createTime, "yyyy-MM-dd HH:mm:ss"));//举报时间
            $("#ce_explain").text(returnValue(CustomerAppealUser.ce_explain));//举报说明
        } else {
            $("#informant").text(returnValue(CustomerAppealCompay.cy_name));//举报人
            $("#informant_phone").text(returnValue(CustomerAppealCompay.bca_account));//举报人联系方式
            $("#ce_createTime").text(format(CustomerAppealCompay.ce_createTime, "yyyy-MM-dd HH:mm:ss"));//举报时间
            $("#ce_explain").text(returnValue(CustomerAppealCompay.ce_explain));//举报说明
        }
        //申诉结果
        returnSelect('ap_state', zkdCustomerAppeal.ap_state);
        if (zkdCustomerAppeal.ap_state != '1') {
            $("select[name=ap_state]").attr("disabled", "disabled");
            $("#submit").attr("onclick", "");
            $("#submit").css("background-color", "#c6c6c6");
            $("#submit").text("已处理")
        }
    })
}

/**
 * 提价
 */
function submit() {
    var ap_state = $("select[name=ap_state] option:selected").val();
    if (isEmpty(ap_state)) {
        $("#ap_state").msg("必选");
        return;
    }
    $.ajax({
        url: "/manageExamine/submitAppealExamin",
        type: "post",
        data: {
            ap_state: ap_state,
            er_id: GetQueryString("ap_id")
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code == '501') {
            $.hint.tip(result.msg, "error");
        } else {
            if (ap_state != 1) {
                $("select[name=ap_state]").attr("disabled", "disabled");
                $("#submit").attr("onclick", "");
                $("#submit").css("background-color", "#c6c6c6");
                $("#submit").text("已处理")
                //$.hint.tip(result.msg, "success");
                $.jBox.prompt(result.msg, "提示", "success", {
                    closed: function () {
                        parent.window.self.location.reload()
                    }
                });
            }
        }
    })
}


//返回预警(投诉)类型
function returnCeTypes(param) {
    var data = {};
    data.list = {1: "虚假信息", 2: "求租人已租", 3: "电话打不通", 4: "其它"};
    data.text = returnValue(data.list[param]);
    return data;
}

//返回户型
function returnCcRoom(param) {
    var data = {};
    data.list = {0: "单配", 1: "1房", 2: "2房", 3: "3房", 4: "4房及以上"};
    data.text = returnValue(data.list[param]);
    return data;
}

//租客求租类型（1:整租,2:合租,3:不限）',
function returnCcMode(param) {
    var data = {};
    data.list = {1: "整租", 2: "合租", 3: "不限"};
    data.text = returnValue(data.list[param]);
    return data;
}

//租客租期(1:长租,2:短租,3:不限)'
function returnCcLease(param) {
    var data = {};
    data.list = {1: "长租", 2: "短租", 3: "不限"};
    data.text = returnValue(data.list[param]);
    return data;
}


//url参数获取
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


//下拉选择匹配
function returnSelect(name, val) {
    $("select[name=" + name + "]>option").each(function () {
        if ($(this).val() == val) {
            $(this).attr("selected", "selected");
        }
    });
}