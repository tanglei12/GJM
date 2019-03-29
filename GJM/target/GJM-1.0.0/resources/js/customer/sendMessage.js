var sendData = null;
var cc_codes = "";
$(function(){
	
	$("body").append('<div class="messageSend" style="display: none;">'+
			'<div class="messageSend-bg" onclick="hideShowMessage()"></div>'+
			'<div class="messageSend-content">'+
				'<div class="title-font">短信发送 <button style="float: right; margin-top: 5px;" onclick="sendMessage()">发送</button></div>'+
				'<div class="modelSelect">'+
					'<table>'+
						'<thead>'+
							'<tr>'+
								'<td style="width: 40px;"><div class="checkbox checkbox-success" id="ck_all"><input name="chickes" type="checkbox" id="1" data-code="CUS14700348716960757"><label for="chickes" id="ckLabel"></label></div></td>'+
								'<td>模板名</td>'+
								'<td>时间</td>'+
								'<td>创建人</td>'+
							'</tr>'+
						'</thead>'+
						'<tbody>'+
							
						'</tbody>'+
					'</table>'+
				'</div>'+
				'<div class="editText">'+
					'<div contenteditable="true" class="contentText">'+
						
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>');
	
	alertMessageMove();
	dataSendMessage();
	// 全选短信发送
	/*$("#ck_all").click(function(){
		if(!$(this).find("input").is(':checked')){
			$(".messageSend-content tr").each(function(index, element) {
				$(this).find("input").attr("checked","checked");
			});
		}else{
			$(".messageSend-content tr").each(function(index, element) {
				$(this).find("input").removeAttr("checked");
			});
		}
	});*/
});

$(window).resize(function(){
	//发送短信背景层
	var windowWidth = $(document.body).width();
	var windowHeight = $(document).height();
	var left = 0;
	var top = 0;
	left = (windowWidth - $(".messageSend-content").width())/2-20;
	top = (windowHeight - $(".messageSend-content").height())/2-20;
	$(".messageSend").width(windowWidth);
	$(".messageSend").height(windowHeight);
	$(".messageSend-content").css("left",left);
	$(".messageSend-content").css("top",top);
});

/**
 * tr点击选中
 * 
 * @param ids
 */
function mousedownTr(ids){
	$(ids).find("td").each(function(i){
		if(i == 0){
			if(!$(this).find("input").is(':checked')){
				$(this).find("input").attr("checked",true);
			}else{
				$(this).find("input").attr("checked",false);
			}
		}
	});
}

//短信发送
function sendMessages(){
	var bool = false;
	$("tbody tr").each(function(i){
		if($(this).find("input").is(":checked")){
			bool = true;
			return false;
		}
	});
	if(bool){
		alertMessageMove();
		dataSendMessage();
		$(".messageSend").show();
	}else{
		alert("请选择一个客户!");
	}
}

/**
 * 选择短信
 */
function selectMessage(ids){
	$(".messageSend-content tbody tr").each(function(i){
		$(this).find("td input[type=checkbox]").attr("checked",false);
	});
	
	$(ids).find("td").each(function(i){
		if(i == 0){
			if(!$(this).find("input").is(':checked')){
				$(this).find("input").attr("checked",true);
				var text = $(ids).find("td").eq(4).html();
				var repla,repla1;
				if(text.indexOf("#sendPerson") > -1){
					repla = new RegExp("#sendPerson", "g");
					repla1 = '<button contenteditable="false" class="mention" data-type="#sendPerson">#发送人</button>';
				}else if(text.indexOf("#code") > -1){
					repla = new RegExp("#code", "g");
					repla1 = '<button contenteditable="false" class="mention" data-type="#code">#验证码</button>';
				}
    			text = text.replace(repla,repla1);
				$(".contentText").html(text);
			}else{
				$(this).find("input").attr("checked",false);
				$(".contentText").html("");
			}
		}
	});
}

/**
 * 开关短信发送
 */
function hideShowMessage(cc_code){
	if(cc_code != null && cc_code != ""){
		cc_codes = cc_code;
	}
	if($(".messageSend").is(":hidden")){
		$(".messageSend").show();
	}else{
		$(".messageSend").hide();
	}
}

/**
 * 发送短信
 */
function sendMessage(){
	var meesageContent = $(".messageSend-content .contentText").text().trim();
	$(".contentText button").each(function(i){
		if($(this).text() != ""){
			var repla = new RegExp($(this).text(), "g");
			var repla1 = $(this).attr("data-type");
			meesageContent = meesageContent.replace(repla,repla1).trim();
		}
	});
	var code = "";
	if(getUrlParam("cc_code") != null){
		code = getUrlParam("cc_code");
	}else{
		$(".personTable").find("tbody").find("[name=check]:checked").each(function(){
			code += $(this).data("data").cc_code + ",";
		});
	}
	if(code == ""){
		code = cc_codes;
	}
	if(meesageContent != null && meesageContent != ""){
		$.ajax({
			type:"POST",
			url:"/customer/messageSubmit",
			data:{
				meesageContent : meesageContent,
				cc_code : code
			},
			datatype:"json",
			contentType:"application/x-www-form-urlencoded; charset=utf-8",
			success:function(result){
				if(result.message == "success"){
					hideShowMessage();
					alert("发送成功!");
				}
			}
		});
	}else{
		alert("请填写短信内容！");
	}
}

/**
 * 短信模板数据
 */
function dataSendMessage(){
	sendData = $.Deferred();
	$.ajax({
		type:"POST",
		url:"/customer/messageModelList",
		data:[],
		datatype:"json",
		contentType:"application/x-www-form-urlencoded; charset=utf-8",
		success:function(result){
			if(result.messageModel == null){
				return;
			}
			$(".messageSend-content tbody").html("");
			$.each(result.messageModel, function(index, data) {
				$(".messageSend-content tbody").append('<tr onclick="selectMessage(this)">'+
					'<td style="width: 40px;"><div class="checkbox checkbox-success"><input name="chickes" type="checkbox" data-id="'+ data.mm_id +'"><label for="chickes" id="ckLabel"></label></div></td>'+
					'<td>'+ data.mm_name +'</td>'+
					'<td>'+ returnDate(data.mm_date) +'</td>'+
					'<td>'+ data.em_name +'</td>'+
					'<td style="display:none;">'+ data.mm_text +'</td>'+
				'</tr>');
			});
			$(".messageSend-content tbody").append('<tr onclick="selectMessage(this)">'+
					'<td style="width: 40px;"><div class="checkbox checkbox-success"><input name="chickes" type="checkbox" data-id=""><label for="chickes" id="ckLabel"></label></div></td>'+
					'<td>自定义</td>'+
					'<td></td>'+
					'<td></td>'+
					'<td style="display:none;"></td>'+
				'</tr>');
			sendData.resolve();
		}
	});
	//间隔变色
	$('.tablelist tbody tr:odd').addClass('odd');
	

	$.when(sendData).done(function(){
		//发送短信背景层
		var windowWidth = $(document.body).width();
		var windowHeight = $(document).height();
		$(".messageSend").width(windowWidth);
		$(".messageSend").height(windowHeight);
		$(".messageSend-content").css("left",200);
		$(".messageSend-content").css("top",120);
	});
}

//移动弹出层
function alertMessageMove(){
	var move = false;//移动标记 
	var _x,_y;//鼠标离控件左上角的相对位置 
	$(".title-font").mousedown(function(e) {
		move = true;
		_x = e.pageX - parseInt($(".messageSend-content").css("left"));
		_y = e.pageY - parseInt($(".messageSend-content").css("top"));
	});
	$(document).mousemove(function(e) {
		if (move) {
			var x = e.pageX - _x;// 控件左上角到屏幕左上角的相对位置
			var y = e.pageY - _y;
			if(x < 0){
				x = 0;
			}
			if(x > ($(".messageSend").width() - $(".messageSend-content").width())){
				x = $(".messageSend").width() - $(".messageSend-content").width();
			}
			if(y < 0){
				y = 0;
			}
			if(y > ($(".messageSend").height() - $(".messageSend-content").height())){
				y = $(".messageSend").height() - $(".messageSend-content").height();
			}
			$(".messageSend-content").css({
				"top" : y,
				"left" : x
			});
		}
	}).mouseup(function() {
		move = false;
	});
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


/**
 * 判断银行卡号
 * 
 * @returns {Boolean}
 */
function isBank(val){
	var reg=/^[0-9]{16,19}$/; // 以19位数字开头，以19位数字结尾 
	if(!reg.test(val)) 
	{ 
		return false;
	}else{
		return true;
	}
}

//去掉空格
String.prototype.NoSpace = function() 
{ 
	return this.replace(/\s+/g, ""); 
}

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

/**
 * 文本框只能输入数字
 */
function keyPress() {    
    var keyCode = event.keyCode;    
    if ((keyCode >= 48 && keyCode <= 57))    
   {    
        event.returnValue = true;    
    } else {    
          event.returnValue = false;    
   }    
}