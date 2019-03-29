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
    var data2_m = returnToUpperMoney($("#data_1").text().trim().substring(1));
    $("#data_2").text(' ' + data2_m.substring(0, (data2_m.length)) + ' ');

    var data4_m = returnToUpperMoney($("#data_3").text().trim().substring(1));
    $("#data_4").text(' ' + data4_m.substring(0, (data4_m.length)) + ' ');

    var data6_m = returnToUpperMoney($("#data_5").text().trim().substring(1));
    $("#data_6").text(' ' + data6_m.substring(0, (data6_m.length)) + ' ');

    var data8_m = returnToUpperMoney($("#data_7").text().trim().substring(1));
    $("#data_8").text(' ' + data8_m.substring(0, (data8_m.length)) + ' ');

    var years = 0;
    var rentPlusStr = $("#rentPlusStr").val();
    if (null != rentPlusStr && "" != rentPlusStr && undefined != rentPlusStr) {
        if (rentPlusStr.indexOf(",") < 0) {
            var labels = $("#rent p").eq(0).children("label");
            labels.eq(0).html("&nbsp;" + rentPlusStr + "&nbsp;");
            var upperMoney = returnToUpperMoney(rentPlusStr);
            labels.eq(1).html("&nbsp;" + upperMoney + "&nbsp;");
            $("#rent p").eq(1).hide();
            $("#rent p").eq(2).hide();
            $("#rent p").eq(3).hide();
            $("#rent p").eq(4).hide();
            years = 1;
        } else {
            var rentArray = rentPlusStr.split(",");
            $("#rent p").each(function (index) {
                if (index >= rentArray.length) {
                    $(this).hide();
                    return;
                }
                var money = rentArray[index];
                var upperMoeny = returnToUpperMoney(rentArray[index]);
                $(this).children("label").eq(0).html("&nbsp;" + money + "&nbsp;");
                $(this).children("label").eq(1).html("&nbsp;" + upperMoeny + "&nbsp;");
            });
            years = rentArray.length;
        }
    }

    var startPayTime = returnDate($("#startPayTime").val());
    var startPayTimeArr = startPayTime.split("-");
    $("#rentDay p").each(function (index) {
        if (index >= years) {
            $(this).hide();
            return;
        }
        $(this).children("label").eq(0).html("&nbsp;" + startPayTimeArr[1] + "&nbsp;");
        $(this).children("label").eq(1).html("&nbsp;" + startPayTimeArr[2] + "&nbsp;");
    });

    $.ajax({
        type: "POST",
        url: "/appPage/queryContractPrint",
        data: {
            con_code: getUrlParam("con_code")
        },
        dataType: "json",
//		async: !isApp, // 是APP开启同步
        success: function (result) {
            var customerSign = result.contractObject.contractObject_CustomerSign;
            if (null == customerSign || undefined == customerSign || "" == customerSign) {
                $("#custmoerSign_TG1").show();
                $("#custmoerSign_TG2").show();
                $("[name=custmoerFDSign]").hide();
            } else {
                $("#custmoerSign_TG1").hide();
                $("#custmoerSign_TG2").hide();
                $("[name=custmoerFDSign]").show();
                $("[name=custmoerFDSign]").attr("src", "data:image\/(png|jpg);base64," + customerSign);
            }
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
