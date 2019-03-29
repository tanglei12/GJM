$(function(){
	data();
	mui("#hi_funtion").on('tap','.checkbox', function(){
		if($(this).find("input").attr("type") == "radio"){
			$(".checkbox").attr("class","checkbox");
		}
		if($(this).attr("class") == "checkbox click"){
			$(this).attr("class","checkbox");
		}else{
			$(this).attr("class","checkbox click");
		}
	});

    // 筛选物业
    $("#propertyInfo").click(function(){
        window.location.href="/appIntent/propertyInfoAPPPage";
    });
})

// 读取数据
function data(){
	$.ajax({
  	    type: "POST",
  	    url: "/intention/jumpAddIntentionAjax",
  	    data : {
  	    	phi_id: getQueryString("phi_id"),
  	    },
  	    dataType: "json",
  	    success: function(result) {
  	    	
  	    	$("#propertyInfo").val(result.hi.upn_sname+result.hi.upn_code);
  	    	$("#propertyInfo").attr("data-id",result.hi.propertyInfo_Id);
  	    	$("#phone").val(result.hi.phi_phone == null ? "" : result.hi.phi_phone);
  	    	$("#title").val(result.hi.phi_name == null ? "" : result.hi.phi_name);
  	    	$("#money").val(result.hi.phi_money == null ? "" : result.hi.phi_money);
  	    	$("#houseS").val(result.hi.hi_houseS == null ? "" : result.hi.hi_houseS);
  	    	$("#houseT").val(result.hi.hi_houseT == null ? "" : result.hi.hi_houseT);
  	    	$("#houseW").val(result.hi.hi_houseW == null ? "" : result.hi.hi_houseW);
  	    	$("#type").val(result.hi.buildType == null ? "" : result.hi.buildType);
  	    	$("#source").val(result.hi.phi_source == null ? "" : result.hi.phi_source);
  	    	$("#name").val(result.hi.phi_user == null ? "" : result.hi.phi_user);
  	    	$("#sex").val(result.hi.phi_user_sex == null ? "" : result.hi.phi_user_sex);
  	    	$("#hi_code").val(result.hi.hi_code == null ? "" : result.hi.hi_code);
  	    	var address = result.hi.phi_address.split("-");
  	    	$("#houseCode input").eq(0).val(address.length > 0 ? address[0] : "");
  	    	$("#houseCode input").eq(1).val(address.length > 0 ? address[1] : "");
  	    	
  	    	if(result.hi.hi_function != null){
  	    		var functionList = result.hi.hi_function.split(",");
  	    		$("#hi_funtion label").each(function(){
  	    			for (var i = 0; i < functionList.length; i++) {
  	    				if($(this).text() == functionList[i]){
  	    					$(this).attr("class", "checkbox click");
  	    				}
  	    			}
  	    		});
  	    	}
  	    	
  	    	$("#builTypes").val(orderByPhiType(result.hi.phi_type));
  	    }
	});
}

// 参数返回
function where(result){
    var arry = eval(result);
    // 物业选择返回
    if(arry.type != null && arry.type == "propertyInfo") {
        propertyInfoSelected(arry.upn_name,arry.propertyInfo_Id);
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

// 提交意向跟进
function submit(){
	var addr = "";
	$("#houseCode input").each(function(i){
		if(i == 0){
			addr += $(this).val()+"-";
		}else{
			addr += $(this).val();
		}
	});
	if(!isPhone($("#phone").val())){
		alert("请填写正确电话号码");
		return;
	}
	var hi_function = "";
	$("#hi_funtion label").each(function(i){
//		if($(this).find("input").is(":checked")){
//			hi_function += $(this).text()+",";
//		}
		if($(this).attr("class") == "checkbox click"){
			hi_function += $(this).text()+",";
		}
	});
	if(hi_function != ""){
		hi_function = hi_function.substring(0,hi_function.length-1);
	}
	var count = "";
	count += "propertyInfo_Id="+$("#propertyInfo").attr("data-id")+"&phi_phone="+$("#phone").val()
			+"&phi_type=房源跟进"+"&hi_houseS="+$("#houseS").val()
			+"&phi_money="+$("#money").val()+"&new_buildType="+$("#type").val()+"&phi_address="+addr;
	count += "&phi_user_sex="+$("#sex").val()+"&em_id="+getQueryString("em_id")+"&phi_source="+$("#source").val();
	count += "&buildType="+$("#type").val();
	count += "&phi_user="+$("#name").val();
	count += "&hi_code="+$("#hi_code").val();
	count += "&hi_houseT="+$("#houseT").val();
	count += "&hi_houseS="+$("#houseS").val();
	count += "&hi_function="+hi_function;
	count += "&hi_houseW="+$("#houseW").val();
	count += "&phi_id="+getQueryString("phi_id");
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
				alert("房源跟进成功");
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

//物业选择
function propertyInfoSelected(address,upn_id){
	$("#propertyInfo").val(address);
	$("#propertyInfo").attr("data-id",upn_id);
}

function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 