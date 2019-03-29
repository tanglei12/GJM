$(function(){
})

/**
 * 添加跟进记录
 */
function houseIntenType(){
	if($("#htType").val() != "提醒"){
		if($("#htType").val()== null || $("#htType").val() == "-1" || $("#htCount").val() == null || $("#htCount").val() == ""){
			$.jBox.tip("请将带*的内容完善");
			return ;
		}
	}else{
		if($("#htType").val() == "-1"){
			$.jBox.tip("请将带*的内容完善");
			return ;
		}
	}
	if($("#ht_remind_time").val() != null && $("#ht_remind_time").val() != "" ){
		if($("#htRemindCount").val() == null || $("#htRemindCount").val() == ""){
			$.jBox.tip("请填入提醒内容");
			return;
		}
	}
	var hour = "";
	var min = "";
	if($("#hour").val() == ""){
		hour = "00";
	}else{
		if(parseInt($("#hour").val()) < 10){
			hour = "0"+$("#hour").val();
		}else{
			hour = $("#hour").val();
		}
	}
	
	if($("#min").val() == ""){
		min = "00";
	}else{
		if(parseInt($("#min").val()) < 10){
			min = "0"+$("#min").val();
		}else{
			min = $("#min").val();
		}
	}
	var dateStr = "";
	if($("#ht_remind_time").val() != ""){
		dateStr = $.trim($("#ht_remind_time").val())+" "+hour+":"+min+":"+"00";
	}
	
	var count = "ht_type="+$.trim($("#htType").val())+"&ht_count="+$.trim($("#htCount").val())+"&dateStr="+dateStr
	+"&ht_remind_count="+$.trim($("#htRemindCount").val())+"&hi_code="+getUrlParam("hi_code")+"&phi_id="+getUrlParam("phi_id")
	+"&new_id="+getUrlParam("em_id");
	
	$.ajax({
		type:"POST",
		url:"/intention/addHouseInTypesAPP",
		data:count,
		datatype:"json",
		contentType:"application/x-www-form-urlencoded; charset=utf-8",
		success:function(result){
			if(result.massage=="error"){
				$.jBox.tip("数据添加失败");
			}else{
				alert("录入成功！");
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    window.webkit.messageHandlers.goBack.postMessage([]);
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    OCIntentionFollowUp.goBack();
                }
			}
		}
	});
}

/**
 * 提醒控制填写内容
 * 
 * @param ids
 */
function changeRemindShow(ids){
	if($(ids).val() == "提醒"){
		$(".checkbox-success input").attr("checked",true);
		$("#remindShow").show();
		$("#followUp").hide();
		var h = $(document).height();
  		$(document).scrollTop(h);
	}else{
		$("#followUp").show();
		$("#remindShow").hide();
		$(".checkbox-success input").attr("checked",false);
	}
	
	$("#ht_remind_time").val("");
	$("#htRemindCount").val("");
	$("#hour").val("9");
	$("#min").val("40");
}

/**
 * 添加提醒
 */
function remindShow(){
	if($("#remindShow").is(":hidden")){
		$(".checkbox-success input").attr("checked",true);
		$("#remindShow").slideDown(function(){
			var h = $(document).height();
			  		$(document).scrollTop(h);
		});
	}else{
		$("#remindShow").slideUp();
		$(".checkbox-success input").attr("checked",false);
	}
}

/**
 * 时间控件
 */
function dates(){
	var date = new Date(returnDate(new Date()))
	data = date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate() + 5);
	WdatePicker({
		minDate : returnDate(new Date()),
		maxDate : returnDate(data),
		onpicked: function(dp){
			if($(".dateTime1").val() != "" && $(".dateTime2").val() != ""){
				//data();
			}
		}
	});
}

/** 返回日期 2016-01-01*/
function returnDate(time, format) {
	if (isEmpty(time)) {
		return "";
	}
	var t = new Date(time);
	var tf = function(i) {
		return (i < 10 ? '0' : '') + i;
	};
	return (format || "yyyy-MM-dd").replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
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

/** 判断字符串是否为空 */
function isEmpty(param){
	return (param == null || param == "" || typeof(param) == "undefined");
}

/**
 * 小时判断
 * 
 * @param ids
 */
function hourJudge(ids){
	if(parseInt($(ids).val()) > 23){
		$(ids).val(23);
	}
}

/**
 * 小时判断
 * 
 * @param ids
 */
function minJudge(ids){
	if(parseInt($(ids).val()) > 59){
		$(ids).val(59);
	}
}

/** 返回时间 2016-01-01 00:00*/
function returnTimeHourMin(time){
	if (isEmpty(time)) {
		return "";
	}
	var t = new Date(time);
	var tf = function(i){return (i < 10 ? '0' : '') + i};
	return "yyyy-MM-dd HH:mm".replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
		switch(a){
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
		}
	});
}

/** 返回时间 2016-01-01 00:00:01*/
function returnDateTime(time){
	if (isEmpty(time)) {
		return "";
	}
	var t = new Date(time);
	var tf = function(i){return (i < 10 ? '0' : '') + i};
	return "yyyy-MM-dd HH:mm:ss".replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
		switch(a){
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

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}