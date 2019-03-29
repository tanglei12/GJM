$(function () {
    requestStr();
    if ($(window).width() <= 320) {
        $("#type").attr("style", "padding-left:61%");
        $("#typep").attr("style", "padding-left:73%");
    }
});

/** 获取传递参数*/
function requestStr(json) {
    var content = eval(json);
    $(".contentService").html("");
    $(content).each(function (index, item) {
        var bools = true;
        var html = '';
        $(".contentService .center").each(function (i) {
            if (item.sid == $(this).attr("data-id")) {
                bools = false;
                return false;
            }
        });
        if (bools) {
            var image = "";
            if (item.sid == 1) {
                image = "/resources/image/appPage/service_de1.png";
            } else if (item.sid == 2) {
                image = "/resources/image/appPage/service_de.png";
            } else {
                image = "/resources/image/appPage/tuo_icon.png";
            }
            html += '<div class="center" style="padding: 0;" data-id="' + item.sid + '">';
            html += '	<div class="service_title"><img src="' + image + '"><label>' + item.titles + '</label><label class="service_edit" onclick="addProject(this)">编辑</label></div>';
            html += '	<div class="serviceContents">';
            html += '	</div>';
            html += '	<div style="display: none" class="service_money">';
            html += '		<label class="service_money_title">合计</label>';
            html += '		<label class="service_moneys">00.00元</label>';
            html += '	</div>';
            html += '</div>';
            $(".contentService").append(html);
        }
        var htmlCenter = '';
        var titles = item.title.split("-");
        var height = "height: 70px; line-height: 70px;";
        if (titles.length > 1) {
            height = "";
        }
        htmlCenter += '<div class="serviceContent" data-sid="' + item.sid + '" data-id="' + item.id + '" style="' + height + '" data-money="' + item.money + '">';
        htmlCenter += '	<dl style="' + height + '">';
        htmlCenter += '		<dt>服务类型</dt>';
        htmlCenter += '		<dd>' + titles[0] + '<input id="md_typeId" type="hidden" value="'+item.sid+'" /></dd>';
        htmlCenter += '	</dl><input id="md_applyTypeId"  type="hidden" value="'+item.id+'" />';

        if (titles.length > 1) {
            htmlCenter += '	<dl>';
            htmlCenter += '		<dt>子类型</dt>';
            htmlCenter += '		<dd>' + titles[1] + ' </dd>';
            htmlCenter += '	</dl>';
        }

       /* if (titles.length > 1) {
            htmlCenter += '	<dl>';
            htmlCenter += '		<dt>子类型</dt>';
            htmlCenter += '		<dd>' + titles[1] + '</dd>';
            htmlCenter += '	</dl>';
        }*/

        htmlCenter += '	<div class="delete" onclick="removeProject(this,' + item.sid + ')">删除</div>';
        htmlCenter += '</div>';
        $(".contentService .center[data-id=" + item.sid + "] .serviceContents").append(htmlCenter);
        var money = parseFloat($(".contentService .center[data-id=" + item.sid + "] .service_moneys").text().replace("元", ""));
        money = money + parseFloat(item.money);
        $(".contentService .center[data-id=" + item.sid + "] .service_moneys").text(money.toFixed(2) + "元")
    });
    // 最后一个加上底部距离
    $(".contentService .center").last().attr("class", "center bottomMargin");
    sumMoney();
}

/** 计算价格 */
function sumMoney() {
    var money = 0.0;
    $(".contentService .center .service_money .service_moneys").each(function (i) {
        money += parseFloat($(this).text().replace("元", ""));
    });
    $(".bottom_service .money").text(money.toFixed(2) + "元");
}

/** 删除服务项目 */
function removeProject(ids, id) {
    $(ids).parent().remove();
    var money = 0;
    if ($(".contentService .center[data-id=" + id + "] .serviceContents .serviceContent").length > 0) {
        $(".contentService .center[data-id=" + id + "] .serviceContents .serviceContent").each(function () {
            money += parseFloat($(this).attr("data-money"));
        });
        $(".contentService .center[data-id=" + id + "] .service_moneys").text(money.toFixed(2) + "元");
    } else {
        $(".contentService .center[data-id=" + id + "]").remove();
    }
    sumMoney();
}

/** 申请类型 */
function types(ids) {
    if ($(ids).val() == "代申请服务") {
        $("#typep").html('<option value="房东">&nbsp;&nbsp;&nbsp;房东</option><option value="管家婆">管家婆</option><option value="现租客">现租客</option>');
    } else {
        $("#typep").html('<option value="房东">&nbsp;&nbsp;&nbsp;房东</option><option value="管家婆">管家婆</option>');
    }
    $(".moneyName").show();
    $(".moneyPhone").show();
}

/** 申请类别 */
function typep(ids) {
    /*if ($(ids).val() == "房东" || $(ids).val() == "现租客") {
        $(".moneyName").show();
        $(".moneyPhone").show();
    } else {
        $(".moneyName").hide();
        $(".moneyPhone").hide();
    }*/
    $(".house_address").val("");
    $("#cc_name").val("");
    $("#ccp_phone").val("");
    $("#cc_code").val("");
}

/** 选择房屋返回 */
function houseSelected(hi_code, house_address, cc_name, ccp_phone, xcc_name, xccp_phone, hi_houseS, con_no, cc_code) {
    $(".house_address").attr("data-code", hi_code);
    $(".house_address").val(house_address);
    if (xcc_name == null || xcc_name == "undefined") {
        xcc_name = "";
    }
    $("#cc_code").val(cc_code);
    //$("#cc_name").val(xcc_name);
    $("#cc_name").val(cc_name);
    $("#ccp_phone").val(ccp_phone);
    if (xccp_phone == null || xccp_phone == "undefined") {
        xccp_phone = "";
    }
   // $("#ccp_phone").val(xccp_phone);
    if ($("#typep").val() == "管家婆") {
        $("#xcc_name").val("");
        $("#xccp_phone").val("");
    } else {
        $("#xcc_name").val(cc_name);
        $("#xccp_phone").val(ccp_phone);
    }
    $("#houseS").val(hi_houseS);
    $("#con_no").val(con_no);
}

/** 服务项目赛选 */
function addProject() {
    if ($("#houseS").val() == "") {
        alert("请选择房源，再添加项目")
    } else {
        var json = "";
        if ($(".contentService .serviceContents .serviceContent").length > 0) {
            json += "[";
            $(".contentService .serviceContents .serviceContent").each(function (i) {
                var title = "";
                $(this).find("dd").each(function () {
                    title += $(this).text() + "-";
                });
                title = title.substring(0, title.length - 1);
                json += "{"
                json += "\"sid\":\"" + $(this).attr("data-sid") + "\",";
                json += "\"id\":\"" + $(this).attr("data-id") + "\",";
                json += "\"titles\":\"" + $(".center[data-id=" + $(this).attr("data-sid") + "]").find(".service_title .service_edit").prev().text() + "\",";
                json += "\"title\":\"" + title + "\",";
                json += "\"money\":\"" + $(this).attr("data-money") + "\"";
                json += "},"
            });
            json = json.substring(0, json.length - 1);
            json += "]";
        }
        OCAddService.addProject($("#houseS").val(), json);
    }
}

// 提交服务
function serviceSubmit() {
    // 房屋编码
    var serviceObjHouseCode = $(".house_address").attr("data-code");
    // 申请类型
    //var serviceApplyType = $("#type").val() + "(" + $("#typep").val() + ")";
    // 付费人
    var cc_code = $("#cc_code").val();
    /*// 付费人
    var serviceObjName = $("#xcc_name").val();
    // 付费人电话
    var serviceObjPhone = $("#xccp_phone").val();*/
    // 联系人
    var contactPeople = $("#cc_name").val();
    // 联系电话
    var contactPhone = $("#ccp_phone").val();
    // 生效时间
    var serviceObjStartTime = format(new Date(), "yyyy-MM-dd");
    // 合同编码
    var serviceObjStartObjctNo = $("#con_no").val();
    // 账号
    var em_id = getQueryString("em_id");

    if ($(".contentService .center").length > 0) {
        $(".contentService .center").each(function (i) {
            var text = "";
            $(this).find(".serviceContents .serviceContent").each(function () {
                $(this).find("dt").each(function () {
                    if ($(this).text() == "服务类型") {
                        if (text.indexOf($(this).next().text()) == -1) {
                            text += $(this).next().text() + "-";
                        }
                    } else {
                        text += $(this).next().text() + "、";
                    }
                });
            });
            text = text.substring(0, text.length - 1);
            /*alert(text);*/
            // 服务描述
            var problem = "[" + $(this).find(".service_edit").prev().text() + "]" + text + $("#remark").val();
            // 服务类型
            //var serviceContent = $(this).find(".service_edit").prev().text();
            var serviceContent = $(this).find("#md_typeId").val();
           // 申请类型
            var serviceApplyType = $(this).find("#md_applyTypeId").val();
            // 保洁费用
            var serviceObjMoney = $(this).find(".service_moneys").text().replace("元", "");
            var bools = false;
            $.ajax({
                type: "POST",
                url: "/service/addServiceApplyInfoAPP",
                data: {
                    serviceObjHouseCode: serviceObjHouseCode,
                    serviceApplyType: serviceApplyType,
                    /*serviceObjName: serviceObjName,
                    serviceObjPhone: serviceObjPhone,*/
                    cc_code: cc_code,
                    contactPeople: contactPeople,
                    contactPhone: contactPhone,
                    serviceObjStartObjctNo: serviceObjStartObjctNo,
                    em_id: em_id,
                    problem: problem,
                    serviceContent: serviceContent,
                    serviceObjMoney: serviceObjMoney,
                    house_address: $(".house_address").val()
                },
                dataType: "json",
                async: false,
                success: function (result) {
                    alert("申请成功");
                    location.reload();
                },
                error : function () {
                    alert("申请失败")
                }
            });
        });
        /*OCAddService.goBack();*/
    } else {
        alert("请添加服务项目再提交");
    }
}

/**
 * 毫秒转换为日期格式
 * @param time 时间/时间字符串
 * @param format 时间格式 "yyyy-MM-dd" || "yyyy-MM-dd HH:mm:ss"
 * @returns
 */
function format(time, format) {
    if (time == null) {
        return "";
    }
    var t = new Date(time);
    var tf = function (i) {
        return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    });
}

/** 查询房屋 */
function houseSearch() {
    OCAddService.search($("#typep").val());
}

/** 获取url值*/
function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}