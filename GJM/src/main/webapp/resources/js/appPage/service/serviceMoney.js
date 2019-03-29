function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

var soPayNameNew = null;
var soPayObject = null;
var ssmId = null;
var count = 0;
var md_id = GetQueryString("md_id");
$(function () {
    selectServiceMoney();
    queryPayObject();//加载时查询付款对象;
    /*updateServiceMoney(soPayObject, md_id)*/

    $("#payObject").change(function () {//改变下拉时查询付款对象
        soPayObject = $("#payObject").val();
        queryPayObject();
    })

    $("#payPerson").change(function () {//改变下拉时查询费用
        selectServiceMoney();
    })

    // 图片上传
    imageLoad = $("#imageLoad").imageUpload({
        skin: "appImageBox",
        uploadType: 'maintenance',
        limitUpload: false,
        isTailor: false,
        multiple: false,
        width: 70,
        height: 70,
        success: function (box) {
            box.find('.image-item-add').append('<span class="imagefont">上传照片</span>');
        },
        builds: {
            onUpload: function (img) {

                // 保存图片到数据库
                addServicePicture(img.attr("data-url"));
            },
            onDelete: function (path) {
                // 删除图片
                deleteServicePicture(path);
            }
        }
    });

    //费用确认后将发送给用户,按钮选择定义
    $("#sendCheck").click(function () {
        var theClass = $(this).find(".send").attr("class");
        if (theClass == "send") {
            $(this).find(".send").attr("checked", true).addClass("sendes");
        }
        if (theClass == "send sendes") {
            $(this).find(".send").attr("checked", false).removeClass("sendes");
        }
    });

});

/**
 * 费用确认提交
 */
function mainServiceBill() {
    if (!confirm("是否生成服务订单")) {
        return
    }
    var payObject = $("#payObject").val()
    var ssm_money = $("#ssm_money").val();
    var mdg_money = $("#mdg_money").val();
    $("#payPerson").removeAttr("disabled");
    var payPerson = $("#payPerson").val();
    if (payPerson == "-1") {
        $("#payPerson").msg("请选择付款人");
        return;
    }

    if ($("#ssm_source").val() == null || $("#ssm_source").val() == "") {
        $("#ssm_source").msg("请填写费用名目");
        return;
    }

    if (mdg_money == null || mdg_money == "") {
        $("#mdg_money").msg("请填写总金额");
        return;
    } else {
        var isNum = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if (isNum.test(mdg_money) == false) {
            $("#mdg_money").msg("总金额不正确");
            return;
        }
    }

    if (ssm_money == null || ssm_money == "") {
        $("#ssm_money").msg("请填写应付金额");
        return;
    } else {
        var isNum = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if (isNum.test(ssm_money) == false) {
            $("#ssm_money").msg("应付金额不正确");
            return;
        }
        //alert(ssm_money);
        /* if(parseFloat(ssm_money) == 0){
         $("#ssm_money").msg("应付金额不正确,必须大于0");
         return;
         }*/
    }

    if (parseFloat(mdg_money) < parseFloat(ssm_money)) {
        $.hint.tip("总金额必须大于等于应付金额", "error");
        return;
    }
    var payWay = $("#payWay").val();
    var payNameNewText = $("#payPerson").find("option:selected").attr("id");
    var replace = "";
    if (payNameNewText.indexOf("-归属部门") > 0) {
        replace = payNameNewText.replace("-归属部门", "");
    } else if (payNameNewText.indexOf("-主管家") > 0) {
        replace = payNameNewText.replace("-主管家", "");
    } else {
        replace = payNameNewText;
    }

    var payPhoneNewText = $("#payPerson").find("option:selected").attr("phone");
    if (payPhoneNewText == undefined) {
        payPhoneNewText = null;
    }

    $("#isClick").attr("disable", "true")
    $("#isClick").removeAttr("onclick")

    $.ajax({
        type: "POST",
        url: "/appService/addServiceMoneyApp",
        data: {
            so_id: md_id,
            ssm_money: ssm_money,
            payObject: payObject,
            ssm_source: $("#ssm_source").val(),
            payId: payPerson,
            so_payNameNew: replace,
            so_payPhoneNew: payPhoneNewText,
            so_totalMoney: mdg_money,
            //payWay: payWay,
            ssm_id: ssmId,
            emId: GetQueryString("em_id")
        },
        dataType: "json"
    }).done(function (result) {
        if (result.code != 200){
            theConfirm(result.msg);
            return;
        }
        theConfirm(result.msg);
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            window.webkit.messageHandlers.goBackRefresh.postMessage([]);
        } else if (/(Android)/i.test(navigator.userAgent)) {
            webview.goBackRefresh();
        }
        window.location.href="/appService/serviceOrderPay?so_id="+md_id+"&em_id="+GetQueryString("em_id")+"&ucc_order_sn="+result.data.order.ucc_order_sn+"&order_sn="+result.data.order.order_sn;
        /*if (result.code == 2001) {//现金
            //alert(result.msg);
            theConfirm(result.msg);
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                window.webkit.messageHandlers.goBackRefresh.postMessage([]);
            } else if (/(Android)/i.test(navigator.userAgent)) {
                webview.goBackRefresh();
            }

            return;
        } else if (result.code == 200) {//支付宝/微信
            if (isEmpty(result.data)) {
                // alert(result.msg);
                theConfirm(result.msg);
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    window.webkit.messageHandlers.goBackRefresh.postMessage([]);
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    webview.goBackRefresh();
                }

                return;
            }
            var payPrice = result.data.pay_price;
            if (payPrice == 0) {
                //alert("您实际支付为0元");
                theConfirm("您实际支付为0元");
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    window.webkit.messageHandlers.goBackRefresh.postMessage([]);
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    webview.goBackRefresh();
                }

                return;
            }
            if (result.data.result_pay_channel == '现金') {
                //alert("您实际支付为"+result.data.pay_price+"元");
                theConfirm("您实际支付为" + result.data.pay_price + "元");
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    window.webkit.messageHandlers.goBackRefresh.postMessage([]);
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    webview.goBackRefresh();
                }
                return;
            }
            $.hint.tip("等待扫码支付..", "loading");
            window.location.href = "/appPage/order/rqcodePay?bill_sn=" + result.data.orderBill.bill_sn;
            $.hint.close();
        } else {
            alert("支付错误,请联系管理员");
        }*/
    });
}

/**
 * 保存图片
 *
 * @param path 图片路径
 */
function addServicePicture(path) {

    $.ajax({
        type: "POST",
        url: "/appService/insertServiceImage",
        data: {
            so_id: md_id,
            image_url: path,
            type: 'charge'
        },
        dataType: "json",
        error: function (e) {
            alert("系统异常，请联系管理员");
        },
        success: function (result) {
            if (result.msg == "success") {
                console.log("成功");
            }
        }
    });
}

/**
 * 删除图片
 *
 * @param path 图片路径
 */
function deleteServicePicture(path) {
    $.ajax({
        type: "POST",
        url: "/appService/deleteServiceImageFile",
        data: {
            image_url: path,
            uploadType: 'maintenance'
        },
        dataType: "json",
        error: function (e) {
            alert("系统异常，请联系管理员");
        },
        success: function (result) {
            if (result.msg == "success") {
                deleteServicePictureData(path);
            }
        }
    });
}

/**
 * 查询付款对象
 */
function queryPayObject() {
    var payObject = $("#payObject").val()
    $.ajax({
        type: "POST",
        url: "/service/queryPayInfo",
        data: {
            so_id: md_id,
            type: payObject
        },
        dataType: "json",
        async: false,
        success: function (result) {
            var htm = "<option value='-1'>请选择</option>";

            if (result.code == "200") {
                if (payObject == '4') {
                    for (var i = 0; i < result.data.length; i++) {
                        var ccType = result.data[i].cc_type;
                        if (ccType == null || ccType == "") {
                            htm += "<option id='" + result.data[i].cc_name + "' phone='" + result.data[i].ccp_phone + "' value='" + result.data[i].cc_code + "'>" + result.data[i].cc_name + "</option>";
                        } else {
                            htm += "<option id='" + result.data[i].cc_name + "'  phone='" + result.data[i].ccp_phone + "' value='" + result.data[i].cc_code + "'>" + result.data[i].cc_name + "</option>";
                        }
                    }
                }

                if (payObject == '5') {
                    for (var i = 0; i < result.data.length; i++) {
                        var ccType = result.data[i].cc_type;
                        if (ccType == null || ccType == "") {
                            htm += "<option id='" + result.data[i].cc_name + "'  phone='" + result.data[i].ccp_phone + "' value='" + result.data[i].cc_code + "'>" + result.data[i].cc_name + "</option>";
                        } else {
                            htm += "<option id='" + result.data[i].cc_name + "'  phone='" + result.data[i].ccp_phone + "' value='" + result.data[i].cc_code + "'>" + result.data[i].cc_name + "</option>";
                        }
                    }
                }

                if (payObject == '2') {
                    for (var i = 0; i < result.data.length; i++) {
                        htm += "<option id='" + result.data[i].em_name + "'  phone='" + result.data[i].em_phone + "' value='EM" + result.data[i].em_id + "'>" + result.data[i].em_name + "</option>";
                    }
                }

                if (payObject == '3') {
                    for (var i = 0; i < result.data.list.length; i++) {
                        htm += "<option id='" + result.data.list[i].ucc_name + "' phone='" + result.data.list[i].ucc_phone + "' value='UCC" + result.data.list[i].ucc_id + "'>" + result.data.list[i].ucc_name + "</option>";
                    }
                }

                if (payObject == '6') {
                    for (var i = 0; i < result.data.length; i++) {
                        htm += "<option id='" + (isEmpty(result.data[i].user_realName) ? result.data[i].user_nickName : result.data[i].user_realName) + "'  phone='" + result.data[i].user_phone + "'  value='USER" + result.data[i].user_id + "'>" + (isEmpty(result.data[i].user_realName) ? result.data[i].user_nickName : result.data[i].user_realName) + "</option>";
                    }
                }

                $("#payPerson").html(htm);
            }
            else {
                $("#payPerson").html(htm);
            }

            if (soPayNameNew != null && soPayObject != null) {
                selectObject(soPayObject, soPayNameNew);
            }
        }
    });
}

//服务费用清单
function selectServiceMoney() {
    var payPersonVal = $("#payPerson").val();

    $.ajax({
        type: "post",
        url: "/appService/queryServiceMoney",
        data: {
            so_id: md_id,
            payId: payPersonVal
        },
        dataType: "json",
        async: false,
        success: function (msg) {
            soPayNameNew = msg.declaration.so_payNameNew;
            if (count == 0) {
                soPayObject = msg.declaration.so_payObject;
            } else {
                soPayObject = $("#payObject").val();
            }
            count++;
            var payObjectSelect = $("#payObject").find("option"); //获取select下拉框的所有值
            for (var j = 1; j < payObjectSelect.length; j++) {
                if ($(payObjectSelect[j]).val() == soPayObject) {
                    $(payObjectSelect[j]).attr("selected", "selected");
                }
            }

            if (msg.serviceMoneyList.length > 0) {
                if (msg.serviceMoneyList.length > 1) {
                    $.each(msg.serviceMoneyList, function (index, item) {
                        if (soPayObject == item.payObject) {
                            ssmId = item.ssm_id;
                            var ssm_money = item.ssm_money;
                            $("#ssm_money").val(ssm_money);
                            if (item.ssm_source != null || item.ssm_source != "") {
                                $("#ssm_source").val(item.ssm_source);
                            }
                            if (item.ssm_source == null || item.ssm_source == "") {
                                $("#ssm_source").val(msg.declaration.sm_name + '费用')/*.attr("readonly", "readonly")*/;
                            } else {
                                $("#ssm_source").val(item.ssm_source)/*.attr("readonly", "readonly")*/;
                            }
                        }
                    })
                } else {
                    $.each(msg.serviceMoneyList, function (index, item) {
                        ssmId = item.ssm_id;
                        var ssm_money = item.ssm_money;
                        $("#ssm_money").val(ssm_money);
                        if (item.ssm_source != null || item.ssm_source != "") {
                            $("#ssm_source").val(item.ssm_source);
                        }
                        if (item.ssm_source == null || item.ssm_source == "") {
                            $("#ssm_source").val(msg.declaration.sm_name + '费用')/*.attr("readonly", "readonly")*/;
                        } else {
                            $("#ssm_source").val(item.ssm_source)/*.attr("readonly", "readonly")*/;
                        }
                    })
                }

                /* $("#ssm_money").attr("readonly", "readonly");
                 $("#ssm_source").attr("readonly", "readonly");*/
            } else {
                $("#ssm_source").val(msg.declaration.sm_name + '费用')/*.attr("readonly", "readonly")*/;
                $("#ssm_money").val("");

            }
            var mdg_money = msg.declaration.so_totalMoney;

            if (mdg_money != null && mdg_money > 0) {
                $("#mdg_money").val(mdg_money);
                $("#mdg_money").attr("readonly", "readonly");
            }
        }
    });
}

/**
 * 下拉选择付费对象匹配
 * @param payObject
 * @param payPerson
 */
function selectObject(payObject, payPerson) {
    var payPersonSelect = $("#payPerson").find("option") //获取select下拉框的所有值
    for (var j = 1; j < payPersonSelect.length; j++) {
        var attr = $(payPersonSelect[j]).attr("id");
        var replace = "";
        if (attr.indexOf("-归属部门") > 0) {
            replace = attr.replace("-归属部门", "");
        } else if (attr.indexOf("-主管家") > 0) {
            replace = attr.replace("-主管家", "");
        } else {
            replace = attr;
        }

        if (replace == payPerson) {
            $(payPersonSelect[j]).attr("selected", "selected");
            selectServiceMoney();
        }
    }
    var payObjectSelect = $("#payObject").find("option"); //获取select下拉框的所有值
    for (var j = 1; j < payObjectSelect.length; j++) {
        if ($(payObjectSelect[j]).val() == payObject) {
            $(payObjectSelect[j]).attr("selected", "selected");
        }
    }
}

function theConfirm(msg) {
    if (confirm(msg)) {
        return true;
    } else {
        return true;
    }
}

//更改服务清单is_order状态
/*
 function updateServiceMoney(soPayObject, md_id) {
 $.ajax({
 type: "post",
 url: "/appPage/updateServiceMoney",
 data: {
 so_id: md_id,
 payObject: soPayObject
 },
 dataType: "json"
 }).done(function (result) {

 })
 }*/
