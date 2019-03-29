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
  	    	$("#builTypes").val(orderByPhiType(result.hi.phi_type));
  	    	$("#em_name").val(result.hi.em_name == null? "": result.hi.em_name);
  	    	$("#em_phone").val(result.hi.em_phone == null? "": result.hi.em_phone);
  	    	$("#hi_price").val(result.hi.phi_price == null ? "" : result.hi.phi_price);
  	    	$("#rentDay").val(result.hi.phi_rentDay == null ? "" : result.hi.phi_rentDay);
  	    }
	});
}

function checkMoney(){
	if(!$("#pay_money").is(":hidden")){
		var pay_money = parseFloat($("#pay_money").val());
		if(pay_money != null && pay_money > 1000){
			$("#pay_money").val("1000");
			$("#pay_money").appMsg("支付金额不能大于1000元");
			return false;
		}
	}
}

// 类型选择
function typeChange(ids){
	if($(ids).val() == "完成"){
		$(ids).parent().parent().next().show();
		$("#typeT").parent().parent().show();
	}else if($(ids).val() == "存房失败"){
		$(ids).parent().parent().next().hide();
		$(ids).parent().next().find("input").val();
		$("#typeT").parent().parent().hide();
		$(".checkbox").css("background-color","#F2F2F2");
		$(".checkbox").css("color","#666");
		$(".checkbox input").attr("checked", false);
	}
}

//提交意向实勘
function submit(){
	
	if($("#types").val() == null || $("#types").val() == ""){
		alert("请选择类型");
		return;
	}else{
		if($("#rentDay").val() == null || $("#rentDay").val() == ""){
			$("#rentDay").val(0);
		}
	}
	
	if($("#typeT input:checked").prev().text() == null || $("#typeT input:checked").prev().text() == ""){
		alert("请选择操作类型");
		return;
	}
	
	if(!$("#pay_money").is(":hidden")){
		var pay_money = parseFloat($("#pay_money").val());
		if(null != pay_money && pay_money > 1000){
			alert("支付金额不能大于1000元");
			return;
		}
	}
	
	var count = "";
	count += "&phi_type="+$("#types").val();
	count += "&phi_rentDay="+$("#rentDay").val();
	count += "&em_id="+getQueryString("em_id");
	count += "&phi_id="+getQueryString("phi_id");
	count += "&tipnum="+$("#builTypes").val();
	$.ajax({
		type : "POST",
		url : "/intention/addInitqs",
		data : count,
		dataType : "json",
		success : function(result){
			if(result.message=="success"){
				if($("#types").val() == "完成"){
					var v = $("#operateTypes").val();//操作类型
					if(v != null && (v == "1" || v == "2")){
						genjinjieguosubmit();
					}
					alert("存房成功");
				}else{
					alert($("#types").val());
				}
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    window.webkit.messageHandlers.goBackRefresh.postMessage([]);
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    webview.goBackRefresh();
                }
			}
		}
	});
}

/**  房源存房提交qs */
function genjinjieguosubmit(){
	var code = $("#hi_code").val();
	var rb_lx = $("#operateTypes").val();
	var rb_playType = "";
	if("1"==rb_lx){
		rb_playType="定金";
	} else if("2"==rb_lx){
		rb_playType="意向金";
	}
	var count = "rb_playType="+rb_playType+"&rb_houseNum="+code+"&rb_name="+$("#em_name").val()
			+"&rb_phone="+$("#em_phone").val()+"&bs_state=2";
	if($("#types").val()==null || $("#types").val() ==""){
		$.jBox.tip("请选择跟进结果");
		return;
	}
	if($("#operateTypes").val!= "" && $("#operateTypes").val!="3"){
		if($("#pay_money").val() == null || $("#pay_money").val()=="" || $("#fukuanfangshi").val() == null || $("#fukuanfangshi").val() == ""){
			$.jBox.tip("请将带*的内容完善");
			return;
		}
		count = count + "&rb_money="+$("#pay_money").val()+"&playType="+$("#fukuanfangshi").val();
	}
	
	$.ajax({
		type:"POST",
		url:"/intention/insertReserveBill",
		data:count,
		datatype:"json",
		contentType:"application/x-www-form-urlencoded; charset=utf-8",
		success:function(result){
			if(result.message=="error"){
				$.jBox.tip("添加失败");
				return;
			}else if(result.message=="success"){
				//$.jBox.tip("提交成功");
			}	
		}
	})
	
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

function chanageradio(obj){
	$("#operateTypes").val(obj);
	if(obj == 1 || obj == 2){
		$("#payMoney").show();
		$("#payStyle").show();
	} else {
		$("#payMoney").hide();
		$("#payStyle").hide();
	}
}

function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 

