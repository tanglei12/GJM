$(function() {
	$.ajax({
  	    type: "POST",
  	    url: "/contractObject/queryContractAndHouse",
  	    data : {
  	    	contractObject_Code: getUrlParam("con_code")
  	    },
  	    dataType: "json",
  	    async: false,
  	    success: function(data) {
  	    	contractObject = data.contractObject;
  	    	houseInfo = data.houseInfo;
  	    	userCustomer = data.userCustomer;
  	    	$("#houseInfo-hi_code").val(houseInfo.hi_code);
  	    	$("#userCustomer-cc_name").val(userCustomer.cc_name);
  	    	$("#userCustomer-ccp_phone").val(userCustomer.ccp_phone);
  	    	$("#contractObject-ContractObject_No").val(contractObject.contractObject_No);
  	    }
	});
});

function checkIn(obj){
	var checkCount = parseInt($("#checkCount").text());
	var eleI = $(obj).find("div i");
	if(!$(eleI).hasClass("i_color")){
		$(eleI).addClass("i_color");
		$("#checkCount").text(checkCount + 1);
		$(eleI).next().attr("checked", true);
	} else {
		$(eleI).removeClass("i_color");
		$("#checkCount").text(checkCount - 1);
		$(eleI).next().attr("checked", false);
	}
	if(parseInt($("#checkCount").text()) <= 0){
		$("#checkCount").text(0);
		$(".fa-check-square").removeClass("i_color");
	} else {
		$("#allI").addClass("i_color");
	}
}

function changeColor(obj){
	var checkCount = parseInt($("#checkCount").text());
	if(!$(obj).hasClass("i_color")){
		$(obj).addClass("i_color");
		$("#checkCount").text(checkCount + 1);
		$(obj).next().attr("checked", true);
	} else {
		$(obj).removeClass("i_color");
		$("#checkCount").text(checkCount - 1);
		$(obj).next().attr("checked", false);
	}
	if(parseInt($("#checkCount").text()) <= 0){
		$("#checkCount").text(0);
		$(".fa-check-square").removeClass("i_color");
	} else {
		$("#allI").addClass("i_color");
	}
	// 阻止冒泡事件
	window.event.stopPropagation();
}

// 选中所有
function checkAll(obj){
	if(!$(obj).hasClass("i_color")){
		$(".fa-check-square").addClass("i_color");
		$("#checkCount").text($(".fa-check-square").length - 1);
		$("input[name=serviceType]").attr("checked", true);
	} else {
		$(obj).removeClass("i_color");
		$(".fa-check-square").removeClass("i_color");
		$("#checkCount").text(0);
	}
}

// 
function showInfo(obj){
	if(obj.style.display=="none"){
		$("#" + obj.id).show();
		$("#" + obj.id).removeClass("showInfo");
		$(".showInfo").hide();
		$("#" + obj.id).addClass("showInfo");
	} else {
		$("#" + obj.id).hide();
	}
	// 阻止冒泡事件
	window.event.stopPropagation();
}

// 提交增值服务
function submitAppreService(){
	var contractObject_code = getUrlParam("con_code");
	if(null == contractObject_code || "" == contractObject_code || undefined == contractObject_code){
		alert("请求参数异常，请联系管理员");
		return false;
	}
	var checkService = $("input[name=serviceType]:checked").length;
	if(undefined == checkService || 0 == checkService){
		alert("请选择增值服务内容");
		return false;
	}
	
    // 房屋编码
  	var serviceObjHouseCode = $("#houseInfo-hi_code").val();
  	// 申请类型
  	var serviceApplyType = "代申请服务(租客)";
  	// 付费人
  	var serviceObjName = $("#userCustomer-cc_name").val();
  	// 付费人电话
  	var serviceObjPhone = $("#userCustomer-ccp_phone").val();
  	// 联系人
  	var contactPeople = $("#userCustomer-cc_name").val();
  	// 联系电话
  	var contactPhone = $("#userCustomer-ccp_phone").val();
  	// 生效时间
  	var serviceObjStartTime = format(new Date(),"yyyy-MM-dd");
  	// 合同编码
  	var serviceObjStartObjctNo = $("#contractObject-ContractObject_No").val();
  	// 账号
	var em_id = getUrlParam("em_id");
	var serviceType = "";
	
	$("input[name=serviceType]:checked").each(function(){
		// 服务描述
		var problem = "";
		serviceType = $(this).val();
		if("保洁服务" == serviceType || "清洗服务" == serviceType){
			
			problem = "[家庭保洁]" + serviceType;
		} else {
			
			problem = "["+serviceType+"]" + serviceType;
		}
		// 服务类型
		var serviceContent = ("保洁服务" == serviceType || "清洗服务" == serviceType) ? "家庭保洁" : serviceType;
		// 保洁费用
		var serviceObjMoney = 0;
		$.ajax({
	  	    type: "POST",
	  	    url: "/service/addServiceApplyInfoAPP",
	  	    data : {
	  	    	serviceObjHouseCode: serviceObjHouseCode,
	  	    	serviceApplyType: serviceApplyType,
	  	    	serviceObjName: serviceObjName,
	  	    	serviceObjPhone: serviceObjPhone,
	  	    	contactPeople: contactPeople,
	  	    	contactPhone: contactPhone,
	  	    	serviceObjStartObjctNo: serviceObjStartObjctNo,
	  	    	em_id: em_id,
	  	    	problem: problem,
	  	    	serviceContent: serviceContent,
	  	    	serviceObjMoney: serviceObjMoney
	  	    },
	  	    dataType: "json",
	  	    async: false,
	  	    success: function(result) {
	  	    	OCContract.goBack();
	  	    }
		});
	});
	
}

/** 查询Url参数*/
function getUrlParam(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return decodeURI(r[2]); return null; 
}

//毫秒转换为日期格式
var format = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
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