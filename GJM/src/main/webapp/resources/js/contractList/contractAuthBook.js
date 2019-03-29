$(function() {
	loadHtml();
});

function loadHtml(){
    var generate = getUrlParam("generate");
    var template = getUrlParam("template");
    if(generate){
        $("#custmoerSign_TG1").hide();
        $("#custmoerSign_TG2").hide();
        $("[name=custmoerFDSign]").hide();
        // $("#contractTGPrint").attr("style", "width: 950px;margin: 2px auto;");
    } else if(template){
        $("#template1").html("");
        $("#template2").html("");
        $("#template3").html("");
        $("#template4").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#template5").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#template6").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#template7").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#template8").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#template9").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#template10").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#template11").html("");
    } else {
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
                    $("[name=custmoerFDSign]").attr("style", "bottom: 0px;position: relative;");
                }
            }
        });
    }
}
