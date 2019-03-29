var isApp = false;
$(function() {
	loadHtml();

});

function loadHtml(){
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
	if(null != rentPlusStr && "" != rentPlusStr && undefined != rentPlusStr){
		if(rentPlusStr.indexOf(",") < 0){
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
			$("#rent p").each(function(index){
				if(index >= rentArray.length){
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
	$("#rentDay span").each(function(index){
		if(index >= years){
			$(this).hide();
			return;
		}
		$(this).children("label").eq(0).html("&nbsp;" + startPayTimeArr[1] + "&nbsp;");
		$(this).children("label").eq(1).html("&nbsp;" + startPayTimeArr[2] + "&nbsp;");
	});

	var generate = getUrlParam("generate");
	if(generate){
        $("#custmoerSign_TG1").hide();
        $("#custmoerSign_TG2").hide();
        $("[name=custmoerFDSign]").hide();
        $("#tgPrintTime").html(returnTime(new Date()));
        // $("#contractTGPrint").attr("style", "width: 950px;margin: 2px auto;");
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
            success: function(result) {
                var customerSign = result.contractObject.contractObject_CustomerSign;
                if(null == customerSign || undefined == customerSign || "" == customerSign){
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