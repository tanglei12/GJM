var isApp = false;
$(function() {
	loadHtml();

});

function loadHtml(){
	var data2_m = returnToUpperMoney($("#data_1").text().trim());
	$("#data_2").text(' ' + data2_m.substring(0, (data2_m.length)) + ' ');
	
	var data4_m = returnToUpperMoney($("#data_3").text().trim().substring(1));
	$("#data_4").text(' ' + data4_m.substring(0, (data4_m.length)) + ' ');
	
	var data6_m = returnToUpperMoney($("#data_5").text().trim());
	$("#data_6").text(' ' + data6_m.substring(0, (data6_m.length)) + ' ');
	
	var data8_m = returnToUpperMoney($("#data_7").text().trim().substring(1));
	$("#data_8").text(' ' + data8_m.substring(0, (data8_m.length)) + ' ');

    var startEndDateArr = $("#startEndDate").val().split("~");
    var ymd = returnYearMonthDayData(startEndDateArr[0], startEndDateArr[1]);
    var yearmonthdayH = "";
    var year = returnNumber($("#ymd_year").val());
    if(year > 0){
        yearmonthdayH += year + "年";
    }
    var month = returnNumber($("#ymd_month").val());
    if(month > 0){
        yearmonthdayH += month + "月";
    }
    var day = returnNumber($("#ymd_day").val());
    if(day > 0){
        yearmonthdayH += day + "天";
    }
    $("#ymdLabel").html("共" + yearmonthdayH);

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

	// 租金
	var years = 0;
    var rentPlusStr = $("#rentPlusStr").val();
    if(null != rentPlusStr && "" != rentPlusStr && undefined != rentPlusStr){
        var rentArray = rentPlusStr.split(",");
        var html = '';
        for (var i = 0; i < rentArray.length; i++){
            if(i < year){
                // var upperMoney = returnToUpperMoney(rentArray[i]*12);
                html += '<p class="conInfo">第 ' + (i + 1) + ' 年租金：<label class="textUnderLine">&nbsp;' + rentArray[i] + '&nbsp;</label>元/月。</p>';//（总租金：<label class="textUnderLine">&nbsp;' + upperMoney.substring(0, (upperMoney.length - 1)) + '&nbsp;</label>整）
            } else {
                // var upperMoney = returnToUpperMoney(rentArray[i]*month + ((rentArray[i] / 30) * day));
                html += '<p class="conInfo">第 ' + (i + 1) + ' 年租金：<label class="textUnderLine">&nbsp;' + rentArray[i] + '&nbsp;</label>元/月。</p>';// （总租金：<label class="textUnderLine">&nbsp;' + upperMoney.substring(0, (upperMoney.length - 1)) + '&nbsp;</label>整）
            }
        }
        html += '<p class="conInfo">合同总金额：<label class="textUnderLine">&nbsp;' + returnToUpperMoney($("#totalRent").val()) + '&nbsp;</label>整（未包含押金）。</p>';
        years = rentArray.length;
        $("#rent").html(html);
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

    var generate = getUrlParam("generate");
    var template = getUrlParam("template");
    if(generate){
        $("#custmoerSign_TG1").hide();
        $("#custmoerSign_TG2").hide();
        $("[name=custmoerFDSign]").hide();
        $("#tgPrintTime").html(returnTime(new Date()));
        // $("#contractTGPrint").attr("style", "width: 950px;margin: 2px auto;");
    } else if(template){
        $("#template1").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#template2").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#template3").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#template4").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#template5").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#template6").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#template7").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#template8").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#template9").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#template10").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#template11").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#template12").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#data_5").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
        $("#data_6").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
        $("#data_1").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
        $("#data_2").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
        $("#ymdLabel").hide();
        var html1 = '';
        html1 += '<p class="conInfo">第 1 年租金：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>元/月（总租金：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>整）。</p>';
        html1 += '<p class="conInfo">第 2 年租金：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>元/月（总租金：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>整）。</p>';
        html1 += '<p class="conInfo">第 3 年租金：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>元/月（总租金：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>整）。</p>';
        html1 += '<p class="conInfo">第 4 年租金：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>元/月（总租金：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>整）。</p>';
        html1 += '<p class="conInfo">第 5 年租金：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>元/月（总租金：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>整）。</p>';
        $("#rent").html(html1);
        var html2 = '';
        html2 += '4、&nbsp;免租期：第一年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>天，第二年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>天，第三年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>天，第四年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>天，第五年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>天。';
        $("#freeDiv").html(html2);
        var html3 = '';
        html3 += '5、&nbsp;管理费：第一年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>元；第二年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>元；第三年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>元；第四年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>元；第五年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>元。';
        $("#serviceDiv").html(html3);
        var html4 = '';
        html4 += '6、&nbsp;包修费：第一年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>元；第二年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>元；第三年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>元；第四年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>元；第五年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>元。';
        $("#costDiv").html(html4);
        var html5 = '';
        html5 += '<span>第 1 年：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>日；</span>';
        html5 += '<span>第 2 年：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>日；</span>';
        html5 += '<span>第 3 年：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>日；</span>';
        html5 += '<span>第 4 年：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>日；</span>';
        html5 += '<span>第 5 年：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>日；</span>';
        $("#rentDay").html(html5);
    } else {
        init_power();
        $("#backgroudImg1").show();
        $.ajax({
            type: "POST",
            url: "/contractObject/queryConCustomerSign",
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
                    $("[name=custmoerFDSign]").attr("style", "font-size:12px;");
                }
            }
        });
    }

}

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

function init_power() {

    $.ajax({
        type: "POST",
        url: "/user/userJurisdiction",
        data: {
            url: window.location.pathname,
            ucps_type: 3
        },
        dataType: "json"
    }).done(function (result) {
        if (result == null || result.menuLists == null || result.menuLists.length == 0) {
            $("#contractTGPrint").before("");
            $(".date-content-list").find("button").attr("disabled", "disabled");
            return;
        }

        $.each(result.menuLists, function (index, data) {
            // $("#power1").append('<button onclick="'+ data.ucps_url +'">'+ data.ucps_name +'</button>');
            $("#contractTGPrint").before('<a href="#" onclick="print();" style="margin-left: 10px; margin-top: 10px;">打印</a>');
        });

    });
}