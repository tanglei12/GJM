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

    var startEndDateArr = $("#startEndDate").val().split("~");
    var ymd = returnYearMonthDayData(startEndDateArr[0], startEndDateArr[1]);
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

    // 租金
    var years = 0;
    var rentPlusStr = $("#rentPlusStr").val();
    if(null != rentPlusStr && "" != rentPlusStr && undefined != rentPlusStr){
        var rentArray = rentPlusStr.split(",");
        var html = '';
        for (var i = 0; i < rentArray.length; i++){
            if(i < ymd.year){
                var upperMoney = returnToUpperMoney(rentArray[i]*12);
                html += '<p class="conInfo">第 ' + (i + 1) + ' 年租金：<label class="textUnderLine">&nbsp;' + rentArray[i] + '&nbsp;</label>元/月。</p>';// （总租金：<label class="textUnderLine">&nbsp;' + upperMoney.substring(0, (upperMoney.length - 1)) + '&nbsp;</label>整）
            } else {
                var upperMoney = returnToUpperMoney(rentArray[i]*ymd.month + ((rentArray[i] / 30) * ymd.day));
                html += '<p class="conInfo">第 ' + (i + 1) + ' 年租金：<label class="textUnderLine">&nbsp;' + rentArray[i] + '&nbsp;</label>元/月。</p>';// （总租金：<label class="textUnderLine">&nbsp;' + upperMoney.substring(0, (upperMoney.length - 1)) + '&nbsp;</label>整）
            }
        }
        html += '<p class="conInfo">合同总金额：<label class="textUnderLine">&nbsp;' + returnToUpperMoney($("#totalRent").val()) + '&nbsp;</label>整（未包含押金）。</p>';
        years = rentArray.length;
        $("#rent").html(html);
    }

    // 免租期
    var bodyFreeTime = $("#bodyFreeTime").val();
    if(null != bodyFreeTime && "" != bodyFreeTime && undefined != bodyFreeTime){
        var bodyFreeTimeArr = bodyFreeTime.split("|");
        var html = '4、&nbsp;免租期：';
        for (var i = 0; i < bodyFreeTimeArr.length; i++){
            html += '第' + toUpperCase(i+1) + '年<label class="textUnderLine">&nbsp;' + ((bodyFreeTimeArr[i] == null || bodyFreeTimeArr[i] == undefined) ? "" : bodyFreeTimeArr[i]) + '&nbsp;</label>天，';
        }
        html = html.substring(0, (html.length - 1)) + "。";
        $("#freeDiv").html(html);
    }

    // 管理费
    var bodyService = $("#bodyService").val();
    if(null != bodyService && "" != bodyService && undefined != bodyService){
        var bodyServiceArr = bodyService.split("|");
        var html = '5、&nbsp;管理费：';
        if (bodyServiceArr.length == 1){
            for (var i = 0; i < years; i++){
                html += '第' + toUpperCase(i+1) + '年<label class="textUnderLine">&nbsp;' + returnMoney(((bodyServiceArr[0] == null || bodyServiceArr[0] == undefined) ? "" : bodyServiceArr[0])) + '&nbsp;</label>元，';
            }
        } else {
            for (var i = 0; i < bodyServiceArr.length; i++){
                html += '第' + toUpperCase(i+1) + '年<label class="textUnderLine">&nbsp;' + returnMoney(((bodyServiceArr[i] == null || bodyServiceArr[i] == undefined) ? "" : bodyServiceArr[i])) + '&nbsp;</label>元，';
            }
        }
        html = html.substring(0, (html.length - 1)) + "。";
        $("#serviceDiv").html(html);
    }

    // 包修费
    var guaranteeCost = $("#guaranteeCost").val();
    if(null != guaranteeCost && "" != guaranteeCost && undefined != guaranteeCost){
        var guaranteeCostArr = guaranteeCost.split("|");
        var html = '6、&nbsp;包修费：';
        for (var i = 0; i < guaranteeCostArr.length; i++){
            html += '第' + toUpperCase(i+1) + '年<label class="textUnderLine">&nbsp;' + returnMoney(((guaranteeCostArr[i] == null || guaranteeCostArr[i] == undefined) ? "" : guaranteeCostArr[i])) + '&nbsp;</label>元，';
        }
        html = html.substring(0, (html.length - 1)) + "。";
        $("#costDiv").html(html);
    }

    var startPayTime = returnDate($("#startPayTime").val());
    var startPayTimeArr = startPayTime.split("-");
    // $("#rentDay span").each(function(index){
    // 	if(index >= years){
    // 		$(this).hide();
    // 		return;
    // 	}
    // 	$(this).children("label").eq(0).html("&nbsp;" + startPayTimeArr[1] + "&nbsp;");
    // 	$(this).children("label").eq(1).html("&nbsp;" + startPayTimeArr[2] + "&nbsp;");
    // });
    if(null != guaranteeCost && "" != guaranteeCost && undefined != guaranteeCost){
        var html = '';
        for(var i = 0; i < years; i++){
            html += '<span>第 ' + (i+1) + ' 年：<label class="textUnderLine">&nbsp;'+startPayTimeArr[1]+'&nbsp;</label>月<label class="textUnderLine">&nbsp;'+startPayTimeArr[2]+'&nbsp;</label>日</span>；';
        }
        html = html.substring(0, (html.length - 1)) + "。";
        $("#rentDay").html(html);
    }

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

    var payStyle = $("#payStyle").val();
    if (payStyle == "月"){
        $("#fu1").attr("class", "fa fa-check-square-o");
        $("#fu2").attr("class", "fa fa-square-o");
        $("#fu3").attr("class", "fa fa-square-o");
        $("#fu4").attr("class", "fa fa-square-o");
    } else if (payStyle == "季"){
        $("#fu2").attr("class", "fa fa-check-square-o");
        $("#fu1").attr("class", "fa fa-square-o");
        $("#fu3").attr("class", "fa fa-square-o");
        $("#fu4").attr("class", "fa fa-square-o");
    } else if (payStyle == "年"){
        $("#fu3").attr("class", "fa fa-check-square-o");
        $("#fu2").attr("class", "fa fa-square-o");
        $("#fu1").attr("class", "fa fa-square-o");
        $("#fu4").attr("class", "fa fa-square-o");
    } else if (payStyle == "半年"){
        $("#fu4").attr("class", "fa fa-check-square-o");
        $("#fu2").attr("class", "fa fa-square-o");
        $("#fu1").attr("class", "fa fa-square-o");
        $("#fu3").attr("class", "fa fa-square-o");
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

function toUpperCase(num) {
    var numCase = "";
    switch (num){
        case 1 :
            numCase = "一";
            break;
        case 2 :
            numCase = "二";
            break;
        case 3 :
            numCase = "三";
            break;
        case 4 :
            numCase = "四";
            break;
        case 5 :
            numCase = "五";
            break;
        case 6 :
            numCase = "六";
            break;
        case 7 :
            numCase = "七";
            break;
        case 8 :
            numCase = "八";
            break;
        case 9 :
            numCase = "九";
            break;
        case 10 :
            numCase = "十";
            break;
    }
    return numCase;
}

