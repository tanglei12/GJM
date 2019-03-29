function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

var md_id = GetQueryString("so_id");
$(function () {
    queryPayObject();//加载时查询付款对象
    $("#payObject").change(function () {//改变下拉时查询付款对象
        queryPayObject();
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
 * 费用清单
 */
function mainServiceBill() {
    var payObject = $("#payObject").val()
    var moneyListt = $("#sumMoney").val();
    var mdg_money = $("#mdg_money").val();
    $("#payPerson").removeAttr("disabled");
    console.log($("#payPerson").val())
    var payPerson = $("#payPerson").val();
    /* var personMoney = $("#personMoney").val();*/
    if (payPerson == "-1") {
        alert("请选择付款人");
        return;
    }

    if ($("#ssm_source").val() == null || $("#ssm_source").val() =="") {
        alert("请填写费用名目");
        return;
    }

    if (moneyListt == null || moneyListt == "") {
        alert("请填写应付金额");
        return;
    } else {
        var isNum = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if (isNum.test(moneyListt) == false) {
            alert("应付金额不正确!");
            return;
        }
    }

    if (mdg_money == null || mdg_money == "") {
        alert("请填写总金额");
        return;
    } else {
        var isNum = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if (isNum.test(mdg_money) == false) {
            alert("总金额不正确!");
            return;
        }
    }

    /*if (personMoney == null || personMoney == "") {
        alert("请填写人工费");
        return;
    } else {
        var isNum = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if (isNum.test(personMoney) == false) {
            alert("人工费不正确!");
            return;
        }
    }*/
    if(parseInt(mdg_money)< (parseInt(moneyListt)/*+parseInt(personMoney)*/)){
        //alert("总金额应大于等于人工费与应付金额之和!");
        alert("总金额应大于等于应付金额!");
        return;
    }


    $.ajax({
        type: "POST",
        url: "/service/addserviceMoneyApp",
        data: {
            md_id: md_id,
            ssm_money: moneyListt,
            payObject: 1,
            ssm_source: $("#ssm_source").val(),
            payId: $("#payPerson").val(),
            mdg_money: mdg_money
            /*personMoney : personMoney*/
        },
        dataType: "json",
        error: function (e) {
            //alert("系统异常，请联系管理员");
            theConfirm("系统异常，请联系管理员");
        },
        success: function (result) {
            if (result.message == "success") {
                //alert("费用提交成功");
                theConfirm("费用提交成功");
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    window.webkit.messageHandlers.goBackRefresh.postMessage([]);
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    webview.goBackRefresh();
                }
            } else {
                alert("费用提交失败");
            }
        }
    });
}


function deleteServicePictureData(path) {
    $.ajax({
        type: "POST",
        url: "/service/deleteServiceImage",
        data: {
            image_url: path
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
 * 保存图片
 *
 * @param path 图片路径
 */
function addServicePicture(path) {

    $.ajax({
        type: "POST",
        url: "/service/addServiceImageMoney",
        data: {
            md_id: getQueryString("so_id"),
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
    console.log(path);
    $.ajax({
        type: "POST",
        url: "/service/deleteServiceImageFile",
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
                console.log("成功");
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
        url: "/service/queryPayObject",
        data: {
            md_id: md_id,
            type: payObject
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            var htm = "<option value='-1'>请选择</option>";
            if (payObject == '1') {
                if (result.code == "200") {

                    for (var i = 0; i < result.data.length; i++) {
                        var ccType = result.data[i].cc_type;
                        if (ccType == null || ccType == "") {
                            htm += "<option value='" + result.data[i].cc_code + "'>" + result.data[i].cc_name + "</option>";
                        } else {
                            htm += "<option value='" + result.data[i].cc_code + "'>" + result.data[i].cc_name + "(" + ccType + ")</option>";
                        }
                    }
                    $("#payPerson").html(htm);
                }

                if (result.code == "201") {
                    //for (var i = 0; i < result.data.length; i++) {
                    htm += "<option value='" + result.data.user_id + "'>" +(isEmpty(result.data.user_realName)?result.data.user_nickName : result.data.user_realName)+ "</option>";
                    //}
                    $("#payPerson").html(htm);
                }
            }

            //是否有服务费用清单费用,有则费用金额设置为不可更改,无则可以输入
            $.ajax({
                type: "post",
                url: "/service/selectServiceMoneyApp",
                data: {
                    md_id: md_id
                },
                dataType: "json",
                async: false,
                success: function (msg) {
                    if (msg.serviceMoneyList.length > 0) {
                        $.each(msg.serviceMoneyList, function (index, item) {
                            var ssm_money = item.ssm_money;
                            $("#sumMoney").val(ssm_money);
                            if (ssm_money > 0){
                                $("#sumMoney").attr("readonly", "readonly");
                            }
                            $("#ssm_source").val(item.ssm_source);

                            console.log(item.cc_code);
                            if (item.cc_code.indexOf("CUS") > -1) {
                                $("#payPerson").find("option[value='" + item.cc_code + "']").attr("selected", "selected");
                                $("#payPerson").attr("disabled", "disabled");
                            } else {
                                $("#payPerson").find("option[value='" + item.user_id + "']").attr("selected", "selected");
                                $("#payPerson").attr("disabled", "disabled");
                            }

                        })
                        $("#ssm_source").attr("readonly", "readonly");
                    }
                    var mdg_money = msg.declaration.mdg_money;
                    $("#mdg_money").val(mdg_money);
                    if (mdg_money != null && mdg_money > 0) {
                        $("#mdg_money").attr("readonly", "readonly");
                    }
                }
            });


        }
    });
}

function theConfirm(msg) {
    if(confirm(msg)){
        return true;
    }else{
        return true;
    }
}
