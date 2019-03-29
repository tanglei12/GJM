$(function(){
	data();
});

//读取数据
function data(){
	$.ajax({
  	    type: "POST",
  	    url: "/intention/jumpAddIntentionAjax",
  	    data : {
  	    	phi_id: getQueryString("phi_id"),
  	    },
  	    dataType: "json",
  	    success: function(result) {
  	    	$("#hi_code").val(result.hi.hi_code == null? "": result.hi.hi_code);
  	    	$("#money").val(result.hi.phi_price);
  	    	$("#bidMoney").val(result.hi.phi_money);
  	    	$("#builTypes").val(orderByPhiType(result.hi.phi_type));
  	    	if(result.hi.phi_rentDay != null){
  	    		$("#day").val(result.hi.phi_rentDay);
  	    		moneyPrice();
  	    	}
  	    }
	});
}

// 出房价
function moneyPrice(){
	var money = $("#money").val();
	var day = $("#day").val();
	if(money == ""){
		return;
	}
	if(day == ""){
		day = 0;
	}
	$.ajax({
  	    type: "POST",
  	    url: "/intention/moneyPrice",
  	    data : {
  	    	money: money,
  	    	day: day,
  	    },
  	    dataType: "json",
  	    success: function(result) {
  	    	$(".moneyprice").show();
  	    	$(".moneyPrice").eq(0).text(result.monthMoney);
  	    	$(".moneyPrice").eq(1).text(result.threedMonthMoney);
  	    	$(".moneyPrice").eq(2).text(result.yeartMonthMoney);
  	    	$(".moneyPrice").eq(3).text(result.yearMonthMoney);
  	    	$(".moneys").eq(0).text(result.monthMoneys);
  	    	$(".moneys").eq(1).text(result.threedMonthMoneys);
  	    	$(".moneys").eq(2).text(result.yeartMonthMoneys);
  	    	$(".moneys").eq(3).text(result.yearMonthMoneys);
  	    }
	});
}

// 检查评估价是否合理-须不能大于房东报价
function checkMoney(){
	var phi_money = parseFloat($("#bidMoney").val());
	var money = parseFloat($("#money").val());
	if(money > phi_money){
		alert("房源评估价不能大于房东报价");
		return false;
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
	var tf = function(i) {
		return (i < 10 ? '0' : '') + i
	};
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
		switch(a) {
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

// 提交意向实勘
function submit(){
	
	if($("#money").val() == null || $("#money").val() == ""){
		alert("房源评估价不能为空");
		return;
	}
	var phi_money = parseFloat($("#bidMoney").val());
	var money = parseFloat($("#money").val());
	if(null != money && money > phi_money){
		alert("房源评估价不能大于房东报价");
		$(this).focus();
		return;
	}
	if($("#day").val() == null || $("#day").val() == ""){
		alert("首年免租期不能为空!");
		return;
	}
	var count = "";
	count += "&phi_type=房源定价";
	count += "&phi_price="+$("#money").val();
	count += "&em_id="+getQueryString("em_id");
	count += "&phi_id="+getQueryString("phi_id");
	count += "&phi_rentDay="+$("#day").val();
	count += "&tipnum="+$("#builTypes").val();
	$.ajax({
		type : "POST",
		url : "/intention/addInitqs",
		data : count,
		dataType : "json",
		success : function(result){
			if(result.stage == 0){
				alert("该房屋保存成功！,请填写所有*后跟进下一步");
			}else if(result.message=="success"){
				alert("房源评估价成功");
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    window.webkit.messageHandlers.goBackRefresh.postMessage([]);
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    webview.goBackRefresh();
                }
			}
		}
	});
}

function orderByPhiType(str) {
	var it = 0;
	if (str == "房源录入") {
		it = 1;
	} else if (str == "房源实勘") {
		it = 2;
	} else if (str == "房源定价") {
		it = 3;
	} else if (str == "存房") {
		it = 4;
	} else if (str == "完成") {
		it = 5;
	} else if (str == "存房失败") {
		it = 6;
	}
	return it;
}

function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}