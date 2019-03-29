;(function($,window){
	
	$.pay = function(){
		$.pay.init_view();
	};
	
	$.pay.param = {
		type : getUrlParam("type"),
		money : getUrlParam("money"),
		code : getUrlParam("code"),
		rqcode : getUrlParam("qrCode") || 'http://www.baidu.com',
	};

	$.pay.init_view = function() {
		if ($.pay.param.type == "支付宝") {
//			$(".payImage").attr("src", "/resources/image/appPage/alipay.png");
//			$(".payImage").next().text("支付宝扫码支付");
			$(".code-bottom").css("background-color", "#0AE");
			$(".code-bottom").css("color", "#FFF");
		}
		if ($.pay.param.type == "微信") {
			// $(".payImage").attr("src","/resources/image/appPage/wxpay.png");
			// $(".payImage").next().text("微信扫码支付");
			$(".code-bottom").css("background-color", "#00c800");
			$(".code-bottom").css("color", "#FFF");
		}
		
		$("#qrcode").empty().qrcode({
            render: "canvas",
            ecLevel: 'H',//识别度
            fill: '#000',//二维码颜色
            background: '#ffffff',//背景颜色
            quiet: 2,//边距
            width: 170,//宽度
            height: 170,
            text: $.pay.param.rqcode,//二维码内容
            //中间logo start
            mode: 4,
            mSize: 11 * 0.01,
            mPosX: 50 * 0.01,
            mPosY: 50 * 0.01,
            label: 'jQuery.qrcode',
            fontname: 'Ubuntu',
            fontcolor: '#ff9818',
        }).append('<img src="/resources/image/appPage/LOGO00.png" style="width: 36px; height: 36px;position: absolute;left: 50%; top: 50%;margin-top:-18px;margin-left:-18px;" />');
		
		$.pay.load_data();
		
		$.pay.done();
	};
	
	$.pay.load_data = function() {
		// 金额
		$(".code-money").text("￥"+ returnFloat($.pay.param.money, 2, true));
		
		// 加载房源数据
		$.ajax({
		    type: "POST",
			url : "/appPage/initContractBill",
			data : {
				con_code : getUrlParam("con_code")
			},
			dataType : "json",
		}).done(function(result){
			if(result.code != 200){
				return;
			}
			houseLibraryInfo = result.data.houseLibraryInfo;
			
			$("#house-address").html(returnValue(houseLibraryInfo.house_address));
		});
	};
	
	$.pay.done = function() {
	    var interva = setInterval(function(){
	    	$.ajax({
			    type: "POST",
			    url: "/financeManage/selectBillSuccessRQcode",
			    data: {
			    	ro_code : getQueryString("code")
			    },
			    dataType: "json",
			}).done(function(result){
				if(result.message == "success"){
		    		$(".bottom-font").html("支付成功");
		    		$("#qrcode").html("<img src='/resources/image/appPage/dui.png' style='width: 80px; height:80px;position: relative;top: 10%;'>");
		    		window.clearInterval(interva);
		    		setTimeout(function(){
		    			OCPay.goBack();
		    		},3000)
		    	}
			});
		}, 2000);
	};
	
	$(function(){
		$.pay();
	});
	
})($,window);