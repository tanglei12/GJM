var isApp = false;
$(function () {
    loadHtml();

    // 按钮事件加载
    $(".next-btn").on("click", function () {
        $.ajax({
            type: "POST",
            url: "/app/contract/queryContractSignInfo",
            data: {
                con_code: getUrlParam("con_code")
            },
            dataType: "json",
            async: false
        }).done(function (result) {
            if (result.code !== 200) {
                $.hint.tip(result.msg, "hint");
                return;
            }

            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                window.webkit.messageHandlers.enterSign.postMessage(getUrlParam("con_code"));
            } else if (/(Android)/i.test(navigator.userAgent)) {
                OCContract.enterSign();
            }
        });
    });

    // showImg();
});

function loadHtml() {

    // 计算总租金
    var ymd = returnYearMonthDayData(returnDate($("#data_4").val()), returnDate($("#data_5").val()));
    var rent = returnFloat($("#data_1").text().trim().substring(1));
    var moneyTotal = returnFloat((ymd.year * 12 + ymd.month) * rent + (rent / 30 * ymd.day));

    var data2_m = returnToUpperMoney($("#data_1").text().trim().substring(1));
    var data3_m = returnToUpperMoney(moneyTotal);
    $("#data_10").text(' ' + returnMoney(moneyTotal) + ' ');
    $("#data_2").text(' ' + data2_m.substring(0, (data2_m.length)) + ' ');
    $("#data_3").text(' ' + data3_m.substring(0, (data3_m.length - 1)) + ' ');

    var data7_m = returnToUpperMoney($("#data_6").text().trim().substring(1));
    $("#data_7").text(' ' + data7_m.substring(0, (data7_m.length)) + ' ');

    var data9_m = returnToUpperMoney($("#data_8").text().trim().substring(1));
    $("#data_9").text(' ' + data9_m.substring(0, (data9_m.length)) + ' ');

    var billContractList = $("#billContractList").attr("data");

    if($("#serviceM").val() == '' || returnFloat($("#serviceM").val()) <= 0 || $("#serviceM").val() == null){
        $("#fuwu1").attr("class", "fa fa-square-o");
        $("#fuwu2").attr("class", "fa fa-check-square-o");
    } else {
        $("#fuwu1").attr("class", "fa fa-check-square-o");
        $("#fuwu2").attr("class", "fa fa-square-o");
    }

    var yearmonthdayH = "";
    if(ymd.year > 0){
        yearmonthdayH += ymd.year + "年";
    }
    if(ymd.month > 0){
        yearmonthdayH += ymd.month + "月";
    }
    if(ymd.day > 0){
        yearmonthdayH += ymd.day + "天";
    }
    $("#ymdLabel").html("共" + yearmonthdayH);

    $.ajax({
        type: "POST",
        url: "/appPage/queryContractPrint",
        data: {
            con_code: getUrlParam("con_code")
        },
        dataType: "json",
//		async: !isApp, // 是APP开启同步
        success: function (result) {
            var customerSign_tg = result.contractObject_TG.contractObject_CustomerSign;
            var customerSign_zl = result.contractObject.contractObject_CustomerSign;
            var billContractList = result.billContractList;

            if (null == customerSign_zl || undefined == customerSign_zl || "" == customerSign_zl) {
                $("#custmoerSign_ZL1").show();
                $("#custmoerSign_ZL2").show();
                $("[name=custmoerZKSign]").hide();
            } else {
                $("#custmoerSign_ZL1").hide();
                $("#custmoerSign_ZL2").hide();
                $("[name=custmoerZKSign]").show();
                $("[name=custmoerZKSign]").attr("src", "data:image\/(png|jpg);base64," + customerSign_zl);
            }

            if (null == customerSign_tg || undefined == customerSign_tg || "" == customerSign_tg) {
                $("#custmoerSign_TG1").show();
                $("#custmoerSign_TG2").show();
                $("#custmoerSign_show1").hide();
                $("#custmoerSign_show1").hide();
            } else {
                $("#custmoerSign_TG1").hide();
                $("#custmoerSign_TG2").hide();
                $("#custmoerSign_show1").show();
                $("#custmoerSign_show1").show();
                $("#custmoerSign_show1").attr("src", "data:image\/(png|jpg);base64," + customerSign_tg);
                $("#custmoerSign_show2").attr("src", "data:image\/(png|jpg);base64," + customerSign_tg);
            }

            var html = '';
            $.each(billContractList, function (index, item) {
                html += '<p class="conInfo"><span>第' + ((index + 1 ) < 10 ? ('0' + (index + 1)) : (index + 1)) + '次：<label class="textUnderLine">&nbsp;' + item.repaymentDateArr[0] + '&nbsp;</label>年<label class="textUnderLine">&nbsp;' + item.repaymentDateArr[1] + '&nbsp;</label>月<label class="textUnderLine">&nbsp;' +item.repaymentDateArr[2] + '&nbsp;</label>日&nbsp;&nbsp;</span></p>';
            });
            $("#zhangdan").html(html);
        }
    });

    $("[name=isShow]").each(function () {
        if ($(this).children().get(0).innerText.trim() == '') {
            $(this).hide();
        }
    });

    var isSign = $("#isSign").val();
    if ("1" == isSign) {
        $("#signBtn").show();
        $("#signTab1").hide();
        $("#signTab2").hide();
        $(".top-warning").show();
    } else if ("2" == isSign) {
        $("#signBtn").hide();
        $("#signTab1").show();
        $("#signTab2").show();
        $(".top-warning").hide();
    }

    // $("#zhangdan p span").each(function (index) {
    //     var year = $(this).children("label").eq(0).text().trim();
    //     if ('' == year) {
    //         $(this).hide();
    //     }
    // });
}

// function showImg() {
//     if (hintImg.style.visibility == "visible") {
//         //如果可见，则隐藏
//         hintImg.style.visibility = "hidden";
//     } else {
//         //设置图像可见
//         hintImg.style.visibility = "visible";
//     }
//     //间隔的毫秒
//     setTimeout('showImg()', 500);
// }
