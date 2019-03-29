var isApp = false;
$(function() {
	loadHtml();
	// 移动端隐藏【开始打印】
//	var appBoo = !isEmpty(navigator.userAgent.match(/iphone/i)) || !isEmpty(navigator.userAgent.match(/Android/i));
//	isApp = appBoo;
//	if(isApp){
//		$(".contract-print-box").hide();
//		$("#printBtn").hide();
//	}
	// 按钮事件加载
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		$(".next-btn").on("click", function(){
			window.webkit.messageHandlers.enterSign.postMessage(getUrlParam("con_code"));
		});
//		window.webkit.messageHandlers.OCContract.customerSign([getUrlParam("con_code"), type]);
	} else if (/(Android)/i.test(navigator.userAgent)) {
		$(".next-btn").on("click", function(){
			OCContract.enterSign();
		});
	}
});

function loadHtml(){
	
	// 计算总租金
	var ymd = returnYearMonthDayData(returnDate($("#data_4").val()), returnDate($("#data_5").val()));
	var rent = returnFloat($("#data_1").text().trim());
	var year = returnNumber($("#ymd_year").val());
    var month = returnNumber($("#ymd_month").val());
    var day = returnNumber($("#ymd_day").val());
	var moneyTotal = returnFloat((year * 12 + month) * rent + (rent / 30 * day));
	
	var data2_m = returnToUpperMoney($("#data_1").text().trim());
	var data3_m = returnToUpperMoney(moneyTotal);
	$("#data_10").text(' ' + returnFloat(moneyTotal) + ' ');
	$("#data_2").text(' ' + data2_m.substring(0, (data2_m.length)) + ' ');
	$("#data_3").text(' ' + data3_m.substring(0, (data3_m.length - 1)) + ' ');
	
	var data7_m = returnToUpperMoney($("#data_6").text().trim());
	$("#data_7").text(' ' + data7_m.substring(0, (data7_m.length)) + ' ');
	
	var data9_m = returnToUpperMoney($("#data_8").text().trim());
	$("#data_9").text(' ' + data9_m.substring(0, (data9_m.length)) + ' ');
	
	if($("#serviceM").val() == '' || returnFloat($("#serviceM").val()) <= 0 || $("#serviceM").val() == null){
		$("#fuwu1").attr("class", "fa fa-square-o");
		$("#fuwu2").attr("class", "fa fa-check-square-o");
	} else {
        $("#fuwu1").attr("class", "fa fa-check-square-o");
        $("#fuwu2").attr("class", "fa fa-square-o");
	}
	var yearmonthdayH = "";
	if(year > 0){
        yearmonthdayH += year + "年";
    }
    if(month > 0){
        yearmonthdayH += month + "月";
    }
    if(day > 0){
        yearmonthdayH += day + "天";
    }
    $("#ymdLabel").html("共" + yearmonthdayH);

    var generate = getUrlParam("generate");
    var template = getUrlParam("template");
    if(generate){
        $("[name=custmoerSign_ZL]").hide();
        $("[name=custmoerZKSign]").hide();
        $("[name=custmoerSign_TG]").hide();
        $("[name=custmoerFDSign]").hide();
        $("#tgPrintTime").html(returnTime(new Date()));
        $("#zhangdan p span").each(function(index){
            var year = $(this).children("label").eq(0).text().trim();
            if('' == year){
                $(this).hide();
            }
        });
        var billContractList = $("#billContractList").attr("data");
        var html = '';
        $.ajax({
            type: "POST",
            url: "/contractObject/queryConCustomerSign",
            data: {
                con_code: getUrlParam("con_code")
            },
            dataType: "json",
//		async: !isApp, // 是APP开启同步
            success: function (result) {
                var billContractList = result.billContractList;

                var html = '';
                var length = billContractList.length;
                $.each(billContractList, function (index, item) {
                    if(((index + 1) % 3) == 1){
                        html += '<p class="conInfo">';
                    }
                    html += '<span>第' + ((index + 1) < 10 ? ('0' + (index +1)) : (index + 1)) + '次：<label class="textUnderLine">&nbsp;' + item.repaymentDateArr[0] + '&nbsp;</label>年<label class="textUnderLine">&nbsp;' + item.repaymentDateArr[1] + '&nbsp;</label>月<label class="textUnderLine">&nbsp;' + item.repaymentDateArr[2] + '&nbsp;</label>日&nbsp;&nbsp;</span>';
                    if(((index + 1) % 3) == 0){
                        html += '</p>';
                    }
                });
                $("#zhangdan").html(html);
            }
        });

        // $("#contractTGPrint").attr("style", "width: 950px;margin: 2px auto;");
    } else if(template) {
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
        $("#template13").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#data_1").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
        $("#data_2").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#data_10").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
        $("#data_3").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#data_6").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
        $("#data_7").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#data_8").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
        $("#data_9").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#fuwu1").attr("class", "fa fa-square-o");
        $("#fuwu2").attr("class", "fa fa-square-o");
        var html = '';
        html += '<p class="conInfo">';
        html += '   <span>第01次：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>日&nbsp;&nbsp;</span>';
        html += '   <span>第02次：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>日&nbsp;&nbsp;</span>';
        html += '   <span>第03次：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>日&nbsp;&nbsp;</span>';
        html += '</p>';
        html += '<p class="conInfo">';
        html += '   <span>第04次：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>日&nbsp;&nbsp;</span>';
        html += '   <span>第05次：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>日&nbsp;&nbsp;</span>';
        html += '   <span>第06次：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>日&nbsp;&nbsp;</span>';
        html += '</p>';
        html += '<p class="conInfo">';
        html += '   <span>第07次：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>日&nbsp;&nbsp;</span>';
        html += '   <span>第08次：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>日&nbsp;&nbsp;</span>';
        html += '   <span>第09次：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>日&nbsp;&nbsp;</span>';
        html += '</p>';
        html += '<p class="conInfo">';
        html += '   <span>第10次：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>日&nbsp;&nbsp;</span>';
        html += '   <span>第11次：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>日&nbsp;&nbsp;</span>';
        html += '   <span>第12次：<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>年<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>月<label class="textUnderLine">&nbsp;&nbsp;&nbsp;&nbsp;</label>日&nbsp;&nbsp;</span>';
        html += '</p>';
        $("#zhangdan").html(html);
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
                var customerSign_tg = result.contractObject_TG.contractObject_CustomerSign;
                var customerSign_zl = result.contractObject.contractObject_CustomerSign;
                var billContractList = result.billContractList;

                if (null == customerSign_zl || undefined == customerSign_zl || "" == customerSign_zl) {
                    $("[name=custmoerSign_ZL]").show();
                    $("[name=custmoerZKSign]").hide();
//				$("#custmoerSignZK").removeAttr("style");
                } else {
                    $("[name=custmoerSign_ZL]").hide();
                    $("[name=custmoerZKSign]").show();
                    $("[name=custmoerZKSign]").attr("src", "data:image\/(png|jpg);base64," + customerSign_zl);
                }

                if (null == customerSign_tg || undefined == customerSign_tg || "" == customerSign_tg) {
                    $("[name=custmoerSign_TG]").show();
                    $("[name=custmoerFDSign]").hide();
//				$("#custmoerSignFD").removeAttr("style");
                } else {
                    $("[name=custmoerSign_TG]").hide();
                    $("[name=custmoerFDSign]").show();
                    $("[name=custmoerFDSign]").attr("src", "data:image\/(png|jpg);base64," + customerSign_tg);
                }
                if ((null == customerSign_zl || undefined == customerSign_zl || "" == customerSign_zl)
                    && (null == customerSign_tg || undefined == customerSign_tg || "" == customerSign_tg)) {
                    $("#custmoerSignZK").removeAttr("style");
                    $("#custmoerSignFD").removeAttr("style");
                }

                var html = '';
                $.each(billContractList, function (index, item) {
                    if(((index + 1) % 3) == 1){
                        html += '<p class="conInfo">';
                    }
                    html += '<span>第' + ((index + 1) < 10 ? ('0' + (index +1)) : (index + 1)) + '次：<label class="textUnderLine">&nbsp;' + item.repaymentDateArr[0] + '&nbsp;</label>年<label class="textUnderLine">&nbsp;' + item.repaymentDateArr[1] + '&nbsp;</label>月<label class="textUnderLine">&nbsp;' + item.repaymentDateArr[2] + '&nbsp;</label>日&nbsp;&nbsp;</span>';
                    if(((index + 1) % 3) == 0){
                        html += '</p>';
                    }
                });
                $("#zhangdan").html(html);
            }
        });
        // $("#zhangdan p span").each(function(index){
        //     var year = $(this).children("label").eq(0).text().trim();
        //     if('' == year){
        //         $(this).hide();
        //     }
        // });
    }

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