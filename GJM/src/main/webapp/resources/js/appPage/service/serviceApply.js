var sm_id = GetQueryString("sm_id");
var em_id = GetQueryString("em_id");
var st_id = "";
var so_targetPoint = "";
var soin_moveStartPoint = "";
var soin_moveEndPoint = "";
$(function () {

    //预约日期-当前之前的日期设置为不可选
    var format2 = format(new Date(), "yyyy-MM-dd HH:mm");
    $("#selectDate").attr("min", format2);

    /**
     * 获取服务基础信息ajax
     */
    $.ajax({
        type: "post",
        url: "/appService/serviceMessageType",
        data: {
            sm_id: sm_id
        },
        dataType: "json",
        async: false,
        success: function (msg) {
            if (msg.message == 200) {
                var htm = "";
                $.each(msg.data, function (index, item) {
                    if (index == 0) {
                        htm += " <option value='" + item.st_id + "' selected='selected' data-money='" + item.st_money + "' >" + item.st_name + "</option>";
                        $("#so_totalMoney").text(item.st_money);
                    } else {
                        htm += " <option value='" + item.st_id + "' data-money='" + item.st_money + "'>" + item.st_name + "</option>";
                    }
                })

                $("#st_name").html(htm);

            } else {
                //alert("暂不提此供服务,敬请期待!");
                $.hint.tip("暂不提此供服务,敬请期待", "error");
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    window.webkit.messageHandlers.goBack.postMessage([]);
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    webview.goBack();
                }

            }
        },
        error: function () {
            //alert("请联系系统管理员!");
            $.hint.tip("请联系系统管理员", "error");
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                window.webkit.messageHandlers.goBack.postMessage([]);
            } else if (/(Android)/i.test(navigator.userAgent)) {
                webview.goBack();
            }

        }
    })

    //加载时加载子类型
    var stid = $("#st_name").val();
    serviceTypeChildren(stid);
    if (sm_id == 6) {
        addressHtml(sm_id)
    }
    /**
     * 改变服务类型
     */
    $("#st_name").change(function () {
        st_id="";
        var stid = $("#st_name").val();
        var data_money = $(this).find("option:selected").attr("data-money");
        $("#so_totalMoney").text(data_money);
        serviceTypeChildren(stid);
    })

    /**
     * 付费对象联系人获取
     */

    $("#so_payObject").change(function () {
        $("#so_payName").html("");
        $("#so_payPhone").html("");
        $("#cc_name").html("");
        $("#ccp_phone").html("");
        putPayObjectByHiCode();
    })


    /**
     * 仿placehoder
     */
    $("#selectDate").on("input", function () {
        if ($(this).val().length > 0) {
            $(this).addClass("full");
        }
        else {
            $(this).removeClass("full");
        }
    });

    // 付费人与付费电话绑定
    $("#so_payName").on("change", function () {
        var selectIndex = $(this).get(0).selectedIndex;
        $(this).val($(this).find("option").eq(selectIndex).val());
        $(this).find("option").eq(selectIndex).attr("selected", "selected").siblings().removeAttr("selected");
        $("#so_payPhone").get(0).selectedIndex = selectIndex;
        $("#so_payPhone").val($("#so_payPhone option").eq(selectIndex).val());
    });
    $("#so_payPhone").on("change", function () {
        var selectIndex = $(this).get(0).selectedIndex;
        $(this).val($(this).find("option").eq(selectIndex).val());
        $(this).find("option").eq(selectIndex).attr("selected", "selected").siblings().removeAttr("selected");
        $("#so_payName").get(0).selectedIndex = selectIndex;
        $("#so_payName").val($("#so_payName option").eq(selectIndex).val());
    });
    $("#so_payName").append("<option>付费人</option>");
    $("#so_payPhone").append("<option>付费电话</option>");
    // 联系人和联系电话
    /* $("#cc_name").on("change", function () {
         var selectIndex = $(this).get(0).selectedIndex;
         $(this).val($(this).find("option").eq(selectIndex).val());
         $(this).find("option").eq(selectIndex).attr("selected", "selected").siblings().removeAttr("selected");
         $("#ccp_phone").get(0).selectedIndex = selectIndex;
         $("#ccp_phone").val($("#ccp_phone option").eq(selectIndex).val());
     });
     $("#ccp_phone").on("change", function () {
         var selectIndex = $(this).get(0).selectedIndex;
         $(this).val($(this).find("option").eq(selectIndex).val());
         $(this).find("option").eq(selectIndex).attr("selected", "selected").siblings().removeAttr("selected");
         $("#cc_name").get(0).selectedIndex = selectIndex;
         $("#cc_name").val($("#cc_name option").eq(selectIndex).val());
     });


     $("#cc_name").append("<option>联系人</option>");
     $("#ccp_phone").append("<option>联系电话</option>");*/

})

/**
 * 提交预约
 */
function serviceSubmit() {
    var length = $(".serviceTBox .serviceT").length;
    console.log(length);
    if (length > 0) {
        if ($(".serviceTBox .checkedon").length == 0) {
            $.hint.tip("请选择服务项目")
            return;
        }
    }

    var so_targetAddress = $("#so_targetAddress").val();
    if (so_targetAddress != undefined) {
        if (so_targetAddress == null || so_targetAddress == "") {
            $("#so_targetAddress").msg("必填");
            return;
        }
    }

    var soin_moveStartAddress = $("#soin_moveStartAddress").val();
    if (soin_moveStartAddress != undefined) {
        if (soin_moveStartAddress == null || soin_moveStartAddress == "") {
            $("#soin_moveStartAddress").msg("必填");
            return;
        }
    }

    var so_payName = $("#so_payName").val();
    if (so_payName == null || so_payName == "") {
        $("#so_payName").msg("必填");
        return;
    }

    var so_payPhone = $("#so_payPhone").val();
    if (so_payPhone == null || so_payPhone == "") {
        $("#so_payPhone").msg("必填");
        return;
    }


    if (isPhone(so_payPhone) == false) {
        $("#so_payPhone").msg("请输入正确的手机号");
        return;
    }


    var cc_name = $("#cc_name").val();
    if (cc_name == null || cc_name == "") {
        $("#cc_name").msg("必填");
        return;
    }


    var ccp_phone = $("#ccp_phone").val();
    if (ccp_phone == null || ccp_phone == "") {
        $("#ccp_phone").msg("必填");
        return;
    }

    if (isPhone(ccp_phone) == false) {
        $("#ccp_phone").msg("请输入正确的手机号");
        return;
    }

    var so_targetTime = $("#selectDate").val();//预约日期
    if (so_targetTime == null || so_targetTime == "") {
        $("#selectDate").msg("必填");
        return;
    }
    so_targetTime = so_targetTime.replace("T", " ") + ":00";

    var serviceAddress = "";
    if (sm_id == 6) {
        serviceAddress = soin_moveStartAddress;
    } else {
        serviceAddress = so_targetAddress;
    }
    st_id = st_id.substring(0, st_id.length - 1);
    $.ajax({
        type: "POST",
        url: "/appService/saveServiceOrderInfo",
        data: {
            so_type: sm_id,
            hi_code: $("#hi_code").val(),
            so_payObject: $("#so_payObject").val(),
            so_problem: $("#so_problem").val(),
            soTargetTime: so_targetTime,
            so_contractor: cc_name,
            so_contractPhone: $("#ccp_phone").val(),
            so_targetAddress: serviceAddress,
            so_targetPoint: so_targetPoint,
            st_id_b: $("#st_name").val(),
            st_id_c: st_id,
            so_applicantEmp: em_id,
            so_source: 12,
            soin_moveStartAddress: $("#soin_moveStartAddress").val(),
            soin_moveStartPoint: soin_moveStartPoint,
            soin_moveEndAddress: $("#soin_moveEndAddress").val(),
            soin_moveEndPoint: soin_moveEndPoint,
            so_payName: $("#so_payName").val(),
            so_payPhone: $("#so_payPhone").val(),
            opeater: GetQueryString("em_id")
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.code == 200) {
                $(".submitButton").attr("onclick","");
                $(".submitButton").css("background-color","#c6c6c6");
                alert("成功!");
                var jsons = {};
                jsons.type = "refresh";
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    window.webkit.messageHandlers.goBackWhere.postMessage([JSON.stringify(jsons)]);
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    webview.goBackWhere(JSON.stringify(jsons));
                }

            } else if (msg.code == 402) {
                alert(msg.msg);
            } else {
                alert("失败!")
            }
        },
        error: function (msg) {
            alert("系统错误!")
        }
    })

}

/** 选择房屋返回 */
function houseSelected(json) {

    var hi_code = json.hi_code,
        house_address = json.house_address,
        propertyInfo_coordinate = json.propertyInfo_coordinate,
        cc_name = json.cc_name,
        ccp_phone = json.ccp_phone,
        xcc_name = json.xcc_name,
        xccp_phone = json.xccp_phone,
        hi_houseS = json.hi_houseS,
        con_no = json.con_no,
        cc_code = json.cc_code,
        em_id = json.em_id,
        ucc_name = json.ucc_name,
        ucc_phone = json.ucc_phone,
        em_name = json.em_name,
        em_phone = json.em_phone;
    $("#hi_code").val(hi_code);
    putPayObjectByHiCode();
    var selectpayObject = $("#so_payObject").val();
    //搬家地址
    if (sm_id != 6) { //6是指服务类型中的搬家
        $("#so_payName").html("");
        $("#so_payPhone").html("");
        $("#cc_name").html("");
        $("#ccp_phone").html("");
        $("#so_targetAddress").val(house_address);//服务地址就是房屋地址
        so_targetPoint = propertyInfo_coordinate;
    } else {//否则就是搬家类型

        if (addrType == 2) {//2是选择搬出地址传的参数
            $("#so_payName").html("");
            $("#so_payPhone").html("");
            $("#cc_name").html("");
            $("#ccp_phone").html("");
            $("#soin_moveStartAddress").val(house_address);
            soin_moveStartPoint = propertyInfo_coordinate;
            so_targetPoint = propertyInfo_coordinate;
        } else if (addrType == 3) {//3是是选择搬入地址传的参数
            $("#soin_moveEndAddress").val(house_address);
            soin_moveEndPoint = propertyInfo_coordinate;
        }
    }

}

/**
 * 服务子级
 */
function serviceTypeChildren(st_id) {
    $(".serviceTBox").empty()
    $.ajax({
        type: "post",
        url: "/appService/serviceTypeChildrenList",
        data: {
            st_id: st_id
        },
        dataType: "json",
        success: function (msg) {
            if (msg.code == 200) {
                var htm = "";
                $.each(msg.data, function (index, item) {
                    var defaultIcon = item.default_icon;
                    var clickIcon = item.click_icon;
                    htm += "<div class='serviceT'>\n" +
                        "    <img class='unchecked' style='display: block' data-id='" + item.st_id + "'  src='" + defaultIcon + "' onclick='checkedImg(this)'/>\n" +
                        "    <img class='checked' style='display: none' data-id='" + item.st_id + "' src='" + clickIcon + "' onclick='uncheckedImg(this)'/>\n" +
                        "    <span class='serviceTName'>" + item.st_name + "</span>\n" +
                        "</div>";
                })
                $(".serviceTBox").html(htm);
                $("#serviceTBox").show();
            } else {
                $("#serviceTBox").hide();
            }
        }
    })
}

//服务类型点击选择
function checkedImg(val) {
    var str = $(val).attr("data-id");//获取st_id
    st_id += str + ",";
    console.log(st_id);
    $(val).parent().find(".checked").css("display", "block").addClass("checkedon");
    $(val).parent().find(".serviceTName").css("color", "#5a5a5a");
    $(val).css("display", "none");
}

//服务类型点击选择
function uncheckedImg(val) {
    var str = $(val).attr("data-id");//获取st_id
    var strDuplicate2 = strDuplicate(st_id, str);
    st_id = strDuplicate2;
    console.log(st_id);
    $(val).css("display", "none").removeClass("checkedon");
    $(val).parent().find(".unchecked").css("display", "block")
    $(val).parent().find(".serviceTName").css("color", "#d5d5d5");
}

function strDuplicate(val, str) { //类型拼接去重
    var split = val.split(",");
    var a = "";
    for (var i = 0; i < split.length - 1; i++) {
        if (split[i] != str) {
            a += split[i] + ",";
        }
    }
    return a;
}

/** 查询房屋
 * 1.小区地址
 * 2.搬出地址
 * 3.搬入地址
 */
var addrType = null;

function houseSearch(val) {
    addrType = val;
    var val2 = $("#so_payObject").val();
    window.location.href = "/appService/houseSearch";
}

// 回调参数
function where(result) {
    var arry = eval(result);
    // 物业选择返回
    if (arry.type != null && arry.type == "serviceHouse") {
        houseSelected(arry);
    }

}

/** 查询Url参数*/
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * 搬家展示的搬入搬出html
 */
function addressHtml() {
    $("#address").html("<dl>\n" +
        "    <dt><label>搬出地址</label></dt>\n" +
        "    <dd><input id='soin_moveStartAddress'  type='text' value='' placeholder='搬出地址'\n" +
        "               onclick='houseSearch(2)'> <label class=\"font-icon\"></label></dd>\n" +
        "</dl>\n" +
        "<dl>\n" +
        "    <dt><label>搬入地址</label></dt>\n" +
        "    <dd><input id='soin_moveEndAddress'  type='text' value='' placeholder='搬入地址'\n" +
        "               onclick='houseSearch(3)'> <label class=\"font-icon\"></label></dd>\n" +
        "</dl>")
}

/**
 * 付费人联系人
 */
function putPayObjectByHiCode() {
    var so_payObject = $("#so_payObject").val();
    $.ajax({
        type: "POST",
        url: "/service/queryPayObjectByHiCode",
        data: {
            hi_code: $("#hi_code").val()/*"CQN15103866022616915"*/,
            so_payObject: so_payObject
        },
        dataType: "json",
        success: function (result) {
            if (result.code == 200) {
                $.each(result.data, function (index, item) {
                    switch (so_payObject) {
                        case "4":
                            existsValue($("#so_payName option"), returnValue(item.cc_name_z)) ? "" : $("#so_payName").append("<option value='" + returnValue(item.cc_name_z) + "'>" + returnValue(item.cc_name_z) + "</option>");
                            existsValue($("#so_payPhone option"), returnValue(item.ccp_phone_z)) ? "" : $("#so_payPhone").append("<option value='" + returnValue(item.ccp_phone_z) + "'>" + returnValue(item.ccp_phone_z) + "</option>");
                            $("#cc_name").val(returnValue(item.cc_name_z));
                            $("#ccp_phone").val(returnValue(item.ccp_phone_z));
                            break;
                        case "5":
                            existsValue($("#so_payName option"), returnValue(item.cc_name_f)) ? "" : $("#so_payName").append("<option value='" + returnValue(item.cc_name_f) + "'>" + returnValue(item.cc_name_f) + "</option>");
                            existsValue($("#so_payPhone option"), returnValue(item.ccp_phone_f)) ? "" : $("#so_payPhone").append("<option value='" + returnValue(item.ccp_phone_f) + "'>" + returnValue(item.ccp_phone_f) + "</option>");
                            $("#cc_name").val(returnValue(item.cc_name_f));
                            $("#ccp_phone").val(returnValue(item.ccp_phone_f));
                            break;
                        case "2":
                            existsValue($("#so_payName option"), returnValue(item.em_name)) ? "" : $("#so_payName").append("<option value='" + returnValue(item.em_name) + "'>" + returnValue(item.em_name) + "</option>");
                            existsValue($("#so_payPhone option"), returnValue(item.em_phone)) ? "" : $("#so_payPhone").append("<option value='" + returnValue(item.em_phone) + "'>" + returnValue(item.em_phone) + "</option>");
                            $("#cc_name").val(returnValue(item.em_name));
                            $("#ccp_phone").val(returnValue(item.em_phone));
                            break;
                        case "3":
                            existsValue($("#so_payName option"), returnValue(item.ucc_name)) ? "" : $("#so_payName").append("<option value='" + returnValue(item.ucc_name) + "'>" + returnValue(item.ucc_name) + "</option>");
                            existsValue($("#so_payPhone option"), returnValue(item.ucc_phone)) ? "" : $("#so_payPhone").append("<option value='" + returnValue(item.ucc_phone) + "'>" + returnValue(item.ucc_phone) + "</option>");
                            $("#cc_name").val(returnValue(item.ucc_name));
                            $("#ccp_phone").val(returnValue(item.ucc_phone));
                            break;
                        case "6":
                            $("#so_payName").val("");
                            $("#so_payPhone").val("");
                            $("#cc_name").val("");
                            $("#ccp_phone").val("");
                            break;
                    }
                })
            } else {
                $.hint.tip("无付费人信息", "error");
                return;
            }
        }
    });
}


/**
 * 去重
 * @param obj
 * @param val
 * @returns {boolean}
 */
function existsValue(obj, val) {
    var isExists = 0;
    $(obj).each(function (index, data) {
        if ($(this).val() == val) {
            isExists++;
        }
    });
    return isExists > 0 ? true : false;
}