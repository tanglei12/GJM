$(function(){
	$("#phi_endTime").val(returnDate(new Date((new Date()/1000+86400*3)*1000)));

	// 筛选物业
	$("#propertyInfo").click(function(){
        window.location.href="/appIntent/propertyInfoAPPPage";
	});
});

// 物业选择
function propertyInfoSelected(address,upn_id){
	$("#propertyInfo").val(address);
	$("#propertyInfo").attr("data-id",upn_id);
}

function submit(){
	var addr = "";
	$("#houseCode input").each(function(i){
		if(i == 0){
			addr += $(this).val()+"-";
		}else{
			addr += $(this).val();
		}
	});
	if($("#phone").val() == null || $("#phone").val() == ""){
		alert("请填写房东电话");
		return;
	}else if(!isPhone($("#phone").val())){
		alert("请填写正确电话号码");
		return;
	}
    if($("#name").val() == ""){
        alert("请填写房东姓名");
        return;
    }
    if($("#propertyInfo").attr("data-id") == null || $("#propertyInfo").attr("data-id") == ""){
        alert("请选择物业");
        return;
    }
	if($("#houseS").val() == null || $("#houseS").val() == ""){
		alert("请填写室");
		return;
	}
	if($("#money").val() == null || $("#money").val() == ""){
		alert("请填写房源定价");
		return;
	}
	if(!$("#houseBool").is(":hidden")){
		return;
	}
	var count = "";
	count = count + "propertyInfo_Id="+$("#propertyInfo").attr("data-id")+"&phi_phone="+$("#phone").val()
			+"&phi_type=房源录入"
			+"&phi_money="+$("#money").val()+"&buildType="+$("#type").val()+"&phi_address="+addr;
	count += "&phi_user_sex="+$("#sex").val()+"&phi_source="+$("#source").val();
	if($("#name").val() != null && $("#name").val() != ""){
		count += "&phi_user="+$("#name").val()
	}
	if($("#houseS").val() != null && $("#houseS").val() != ""){
		count += "&hi_houseS="+$("#houseS").val()
	}
	if(!isEmpty(getQueryString("em_id"))){
		count += "&em_id="+getQueryString("em_id");
	}
	count += "&beginTime="+returnDate(new Date())
	count += "&endTime="+$("#phi_endTime").val()
	$.ajax({
		type : "POST",
		url : "/intention/addInitqs",
		data : count,
		dataType : "json",
		success : function(result){
			if(result.message == "repeat"){
				alert("该房源正在跟进中");
			}else if(result.message=="success"){
				alert("录入房源成功");
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    window.webkit.messageHandlers.goBackRefresh.postMessage([]);
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    webview.goBackRefresh();
                }
			}
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

//验证电话号码
function checkphone(obj){
	$("#houseBool").hide();
	var phone = $("#phone").val();//联系电话
	if(phone.length != 11){
        moreContent();
		return
	}
	if(!isPhone(phone)){
        moreContent();
        alert("请填写正确电话号码");
		return;
	}
	 $.ajax({
			type:"POST",
			url:"/customer/customerControllerBool",
			data:"ccp_phone="+phone,
			datatype:"json",
			contentType:"application/x-www-form-urlencoded; charset=utf-8",
			success:function(result){
				if(result.customer != null){
					$("#intent_content").show();
					$("#name").val(result.customer.cc_name);
					if(result.customer.cc_sex == 1 || result.customer.cc_sex == 2){
                        $("#sex").val("先生");
                    }else{
                        $("#sex").val("女士");
					}
				}
                moreContent();
			}
		});
}

function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}

function moreContent(){
    if($("#phone").val() == null || $("#phone").val() == ""){
        $("#intent_content").hide();
        return;
    }else if(!isPhone($("#phone").val())){
        $("#intent_content").hide();
        return;
    }
    if($("#name").val() == ""){
        $("#intent_content").hide();
        return;
    }
    $("#intent_content").show();
}