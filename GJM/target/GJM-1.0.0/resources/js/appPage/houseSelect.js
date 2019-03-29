var selectHouse = null
$(function () {
    // 加载数据
    data();
    $(".house_money_select li").click(function () {
        $(".house_money_select li").attr("class", "");
        $(this).attr("class", "click");
        $(".moneyType").text($(this).find(".type").text() + "租金");
        $("#money").text($(this).find(".money").text() + "元/月");
    });
});

// 读取数据
function data(mode) {
    $.ajax({
        type: "POST",
        url: "/appHouse/houseAPPCode",
        data: {
            code: getQueryString("hi_code")
        },
        dataType: "json",
        success: function (result) {

            var house_info = result.houseInformationKeepVo || "";

            $("#house-address").html(house_info.hi_address);
            $("#houseTSW").text(house_info.houseTSW);
            $("#renovationText").text(house_info.hi_state == null ? "" : house_info.hi_state);
            $("#money").html((house_info.hi_price == null ? "无定价" : house_info.hi_price + "元/月"));
            if (house_info.hi_price != null) {
                var money = parseFloat(house_info.hi_price);
                $(".house_money_select .money").eq(0).html(money);
                $(".house_money_select .money").eq(1).html(money + 50);
                $(".house_money_select .money").eq(2).html(moneys(money * (1 - (3.0 / 100))));
                $(".house_money_select .money").eq(3).html(moneys(money * (1 - (6.0 / 100))));
            }
            $("#tsw").html(house_info.houseTSW);
            $("#floor").html(house_info.hi_floor + "层");
            $("#photograph").html("朝" + (house_info.hi_orientation == null ? "" : house_info.hi_orientation));
            $("#renovation").html(house_info.hi_state);
            $("#mode").html(house_info.hb_name);
            $("#metro").html(house_info.hi_track);
            $("#area").html(house_info.hi_measure + "m²");
            $("#address").html(house_info.he_address);
            $("#state").html(house_info.hi_isForRent == 1 ? "未招租" : "已招租");
            $("#zstate").html(returnHouseForRentState(house_info.hi_forRentState));
            $("#contract_intoStatus").html(house_info.contract_intoStatus);
            $("#contract_outStatus").html(house_info.contract_outStatus);
            $("#fMessage").html('<label class="message_name">' + house_info.he_peopleName + '</label><label class="message_phone" onclick="userPhone(this)">******</label><label class="message_phone" style="display:none;" onclick="userPhone(this)">' + house_info.he_phone + '</label>');
            $("#gMessage").html('<label class="message_name">' + house_info.em_name + '</label><label class="message_phone">' + house_info.em_phone + '</label><label id="houseEmId" style="display:none;">' + house_info.em_id + '</label>');

            //
            $(result.facilitys).each(function (intex, item) {
                $(".supporting_content").append('<div class="supporting_content_l"><img src="' + item.conim_path + '"><span>' + item.conim_type + '</span></div>');
            });

            // 显示数据
            var imagePath = "";
            $(result.queryAllHouseImageTypeX).each(function (index, item) {
                imagePath = item.hm_path_real;
                if (index == 0) {
                    $("#image_div").append('<div class="mui-slider-item mui-slider-item-duplicate"><a href="#"><img src="' + imagePath + '"  onerror="this.src=\'/resources/image/appPage/timg.jpg\'"></a></div>');
                    $(".mui-slider-indicator").append('<div class="mui-indicator mui-active"></div>');
                } else {
                    $(".mui-slider-indicator").append('<div class="mui-indicator"></div>');
                }
                $("#image_div").append('<div class="mui-slider-item"><a href="#"><img src="' + imagePath + '" data-preview-src="" data-preview-group="1" onerror="this.src=\'/resources/image/appPage/timg.jpg\'"></a></div>');
                if (index == result.queryAllHouseImageTypeX.length - 1) {
                    $("#image_div").append('<div class="mui-slider-item mui-slider-item-duplicate"><a href="#"><img src="' + imagePath + '"  onerror="this.src=\'/resources/image/appPage/timg.jpg\'"></a></div>');
                }
            });

            //
            var seeHtml = "";
            $(result.houseSeeingList).each(function (index, item) {
                var content = "";
                if (item.hs_content.length > 11) {
                    content = item.hs_content.substring(0, 10) + "..."
                } else {
                    content = item.hs_content;
                }
                if (index == (result.houseSeeingList.length - 1)) {
                    seeHtml +=
                        '<dl class="bottom">' +
                        '	<dd style="width: 100%;" onclick="selectName(this)">' +
                        '		<label class="message_name">' + item.em_name + '</label><label class="message_content">带看:' + item.cc_name + '[' + item.hs_payType + ']' + content + '</label><label class="message_date">' + format(item.hs_createTime, "yyyy-MM-dd HH:mm") + '</label>' +
                        '	</dd>' +
                        '</dl>';
                } else {
                    seeHtml += '<dl>                                                                                                                                                  ' +
                        '	<dd style="width: 100%;" onclick="selectName(this)">                                                                                                                         ' +
                        '		<label class="message_name">' + item.em_name + '</label><label class="message_content">带看:' + item.cc_name + '[' + item.hs_payType + ']' + item.hs_content + '</label><label class="message_date">' + format(item.hs_createTime, "yyyy-MM-dd HH:mm") + '</label>' +
                        '	</dd>                                                                                                                                             ' +
                        '</dl>';
                }
            });
            if (seeHtml == "") {
                $(".message_div").hide()
            } else {
                $(".schedule").html(seeHtml);
            }

            // 带看
            switch (house_info.hi_isForRent) {
                case 0: // 未招租
                    $("[name=houseFollow]").attr("disabled", "disabled");
                    break;
                case 1: // 招租
                    $("[name=houseFollow]").removeAttr("disabled");
                    break;
            }

            // 签订合同
            switch (house_info.contract_intoStatus) {
                case "未签合同":
                    $("[name=houseContract]").html("签订托管合同");
                    break;
                default:
                    $("[name=houseContract]").attr("readonly", "readonly").html("托管合同签订中");
                    break;
                case "已签合同":
                    // 租赁合同
                    switch (house_info.contract_outStatus) {
                        case "未签合同":
                            $("[name=houseContract]").html("签订租赁合同");
                            break;
                        default:
                            $("[name=houseContract]").attr("disabled", "disabled").html("租赁合同签订中");
                            break;
                        case "已签合同":
                            $("[name=houseContract]").attr("disabled", "disabled").html("已签租赁合同");
                            break;
                    }
                    break;
            }

            // 【事件】带看
            $("[name=houseFollow]").off().on("click", function () {
                if ($(this).attr("disabled") === "disabled") return;
                window.location.href = "/appPage/houseSeeing?hi_code=" + house_info.hi_code;
            });

            // 【事件】签合同
            $("[name=houseContract]").off().on("click", function () {
                if ($(this).attr("disabled") === "disabled") return;
                if (house_info.contract_intoStatus == "未签合同") {
                    window.location.href = "/appPage/contractEdit?contract_type=tg&hi_code=" + getQueryString("hi_code") + "&mode=add&con_type=托管合同";
                    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                        window.webkit.messageHandlers.goBack.postMessage([]);
                    } else if (/(Android)/i.test(navigator.userAgent)) {
                        webview.goBack();
                    }
                } else if (house_info.contract_intoStatus == "已签合同" && house_info.contract_outStatus == "未签合同") {
                    window.location.href = "/appPage/contractEdit?contract_type=zl&hi_code=" + getQueryString("hi_code") + "&mode=add&con_type=租赁合同";
                    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                        window.webkit.messageHandlers.goBack.postMessage([]);
                    } else if (/(Android)/i.test(navigator.userAgent)) {
                        webview.goBack();
                    }
                } else if (house_info.contract_intoStatus != "已签合同") {
                    $.hint.tip("合同完善中，无法操作");
                } else if (house_info.contract_outStatus != "已签合同") {
                    $.hint.tip("租赁合同[" + house_info.contract_outStatus + "]状态");
                }
            });

            // 加载预览图片
            mui.previewImage();
            // 自动轮播周期，若为0则不自动播放，默认为0；
            mui("#slider").slider({interval: 5000});
            // 操作
            if (getQueryString("operation") == "true") {
                $(".button").show();
            } else {
                $(".button").hide();
                $("body").css({paddingBottom: "0"});
            }
            if(returnHouseForRentState(house_info.hi_forRentState) == "已解约"){
                $(".button").show();
            }
        }
    });
}

// 租金方式选择
function moneyType(ids) {
    var _parent = $(ids).find(".house_money_select");
    if ($(_parent).is(":hidden")) {
        $(_parent).show();
    } else {
        $(_parent).hide();
    }
}

// 客户号码点击显示
function userPhone(ids) {
    if ($(ids).text() == "******") {

        var he_phone = $(ids).next()[0].innerText;
        var house_em_id = $("#houseEmId").text();
        var em_id = getQueryString("em_id");
        data = {};
        data.hi_code = getQueryString("houseCode");
        data.he_phone = he_phone;
        data.uiPage = "houseSelect";
        data.em_id = em_id;
        data.is_owen = em_id == house_em_id ? 1 : 0;
        // 记录点击日志
        $.ajax({
            type: "POST",
            url: "/appHouse/saveClickLandlordLog",
            data: data,
            dataType: "json",
            success: function (result) {
                if (result.error != null && result.error != undefined && result.error != '') {
                    alert(result.error);
                    return false;
                }
                $(ids).hide();
                $(ids).next().show();
            }
        });
    } else {
        $(ids).prev().show();
        $(ids).hide();
    }
}

//查看信息
function selectName(ids) {
    alert($(ids).find(".message_name").text() + $(ids).find(".message_content").text());
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

/** 返回房屋招租状态*/
function returnHouseForRentState(param) {
    var data = "";
    switch (param) {
        case 1001 :
            data = "新存招租";
            break;
        case 1002 :
            data = "转租招租";
            break;
        case 1003 :
            data = "强退招租";
            break;
        case 1004 :
            data = "到期招租";
            break;
        case 1005 :
            data = "强收招租";
            break;
        case 1020 :
            data = "停止招租";
            break;
        case 1021 :
            data = "已解约";
            break;
        case 2000 :
            data = "暂停招租";
            break;
        default:
            data = "无";
            break;
    }
    return data;
}

/**定金算法:日租金 * 2 * 天数 去掉小数点 个位数抹掉 十位数小于5大于0整为5 大于五进一位十位数为0*/
function moneys(money) {
    /*=========================================*/
    var moneyA = money / 100;

    var moneystr = moneyA.toString().substring(moneyA.toString().indexOf("."), moneyA.toString().length);
    if (0 < parseFloat(moneystr) && parseFloat(moneystr) <= 0.25) {
        money = parseFloat(parseInt(moneyA) * 100);
    } else if (moneystr == ".0") {
        money = moneyA * 100;
    } else if (0.25 < parseFloat(moneystr) && parseFloat(moneystr) < 0.75) {
        money = parseFloat(parseInt(moneyA) * 100 + 50);
    } else if (0.75 <= parseFloat(moneystr)) {
        money = parseFloat(parseInt(moneyA) * 100 + 100);
    } else {
        money = Math.round(moneyA) * 100;
    }
    return money
    /*=========================================*/
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
} 