var selectHouseIntention = null;
var roomNum1 = "";
var roomNum2 = "";
var ccCode = 0;
$(function(){
	data();
	var move = false;//移动标记 
	var _x,_y;//鼠标离控件左上角的相对位置 
	$("#titleInsert").mousedown(function(e) {
		move = true;
		_x = e.pageX - parseInt($("#cd-popup-container3").css("left"));
		_y = e.pageY - parseInt($("#cd-popup-container3").css("top"));
	});
	$(document).mousemove(function(e) {
		if (move) {
			var x = e.pageX - _x;// 控件左上角到屏幕左上角的相对位置
			var y = e.pageY - _y;
			if(x < 0){
				x = 0;
			}
			if(x > ($(".is-visible3").width() - $("#cd-popup-container3").width())){
				x = $(".is-visible3").width() - $("#cd-popup-container3").width();
			}
			if(y < 0){
				y = 0;
			}
			if(y > ($(".is-visible3").height() - $("#cd-popup-container3").height())){
				y = $(".is-visible3").height() - $("#cd-popup-container3").height();
			}
			$("#cd-popup-container3").css({
				"top" : y,
				"left" : x
			});
		}
	}).mouseup(function() {
		move = false;
	});
});

//筛选获取数据
function data(dataBool){
	$("#content").table({
		titleBg:"#34495E",
		titleColor:"#FFF",
		search: true,
		dataBool: dataBool,
		dataTime: [
		           {
		        	   name: "收录时间",
		        	   string: "phi_date"
		           },
		           {
		        	   name: "跟进时间",
		        	   string: "phi_new_addTime"
		           }
		],
		title: [
			    {
					name: "编号",
					string: "phi_id",
					parameter: ""
				},
				{
					name: "房源房号",
					string: "house_address",
					parameter: "",
					href: "/intention/houseIntentionContent&phi_id&typeState=1"
				},
				{
					name: "跟进状态",
					string: "phi_type",
					parameter: "",
				},
				{
					name: "房东姓名",
					string: "phi_user",
					parameter: ""
				},
				{
					name: "联系电话",
					string: "phi_phone",
					parameter: ""
				},
				{
					name: "房东报价(元/月)",
					string: "phi_money",
					parameter: ""
				},
				{
					name: "房源配置",
					string: "hi_function",
					parameter: ""
				},
				{
					name: "房源来源",
					string: "phi_source",
					parameter: ""
				},
				{
					name: "收录时间",
					string: "phi_date",
					parameter: "",
					format:"yyyy-MM-dd"
				},
				{
					name: "收录人",
					string: "em_name",
					parameter: ""
				},
				{
					name: "跟进时间",
					string: "phi_new_addTime",
					parameter: "",
					format:"yyyy-MM-dd"
				},
				{
					name: "最新跟进人",
					string: "new_emName",
					parameter: ""
				}
			],
		url: "/intention/selectHouseIntentionByEm",
		data: {
			types : $("#houseType").val()
		},
		success: function(result){
			$(result).find("tbody tr").each(function(i){
				var type = $(this).find("td").eq(3).text();
				var imageType = "";
				if(type == "完成"){
					imageType = "<img alt='' src='/resources/image/houseIntention/image_lu.png' style='margin-bottom: -4px;margin-right:2px;'  title='录入完成' >"
						+"<img alt='' src='/resources/image/houseIntention/image_kan.png' style='margin-bottom: -4px;margin-right:2px;' title='实勘完成' >"
						+"<img alt='' src='/resources/image/houseIntention/image_jia.png' style='margin-bottom: -4px;margin-right:2px;' title='定价完成'>"
						+"<img alt='' src='/resources/image/houseIntention/image_porfert.png' style='margin-bottom: -4px;margin-right:2px;' title='存房成功'>";
				}else if(type == "房源实勘"){
						imageType = "<img alt='' src='/resources/image/houseIntention/image_lu.png' style='margin-bottom: -4px;margin-right:2px;' title='录入完成' >"
						+"<img alt='' src='/resources/image/houseIntention/image_kan_lose.png' style='margin-bottom: -4px;margin-right:2px;' title='实勘中' >"
						+"<img alt='' src='/resources/image/houseIntention/image_jia_lose.png' style='margin-bottom: -4px;margin-right:2px;' title='未定价'>"
						+"<img alt='' src='/resources/image/houseIntention/image_cun_lose.png' style='margin-bottom: -4px;margin-right:2px;' title='未存房'>";
				}else if(type == "房源定价"){
						imageType = "<img alt='' src='/resources/image/houseIntention/image_lu.png' style='margin-bottom: -4px;margin-right:2px;' title='录入完成' >"
						+"<img alt='' src='/resources/image/houseIntention/image_kan.png' style='margin-bottom: -4px;margin-right:2px;' title='实勘完成'>"
						+"<img alt='' src='/resources/image/houseIntention/image_jia_lose.png' style='margin-bottom: -4px;margin-right:2px;' title='定价中'>"
						+"<img alt='' src='/resources/image/houseIntention/image_cun_lose.png' style='margin-bottom: -4px;margin-right:2px;' title='未存房'>";
				}else if(type == "存房"){
						imageType = "<img alt='' src='/resources/image/houseIntention/image_lu.png' style='margin-bottom: -4px;margin-right:2px;' title='录入完成'>"
						+"<img alt='' src='/resources/image/houseIntention/image_kan.png' style='margin-bottom: -4px;margin-right:2px;' title='实勘完成'>"
						+"<img alt='' src='/resources/image/houseIntention/image_jia.png' style='margin-bottom: -4px;margin-right:2px;' title='定价完成'>"
						+"<img alt='' src='/resources/image/houseIntention/image_cun_lose.png' style='margin-bottom: -4px;margin-right:2px;' title='存房中'>";
				}else if(type == "存房失败"){
						imageType = "<img alt='' src='/resources/image/houseIntention/image_lu.png' style='margin-bottom: -4px;margin-right:2px;' title='录入完成'>"
						+"<img alt='' src='/resources/image/houseIntention/image_kan.png' style='margin-bottom: -4px;margin-right:2px;' title='实勘完成'>"
						+"<img alt='' src='/resources/image/houseIntention/image_jia.png' style='margin-bottom: -4px;margin-right:2px;' title='定价完成'>"
						+"<img alt='' src='/resources/image/houseIntention/image_lose.png' style='margin-bottom: -4px;margin-right:2px;' title='存房失败'>";
				}else{
						imageType = "<img alt='' src='/resources/image/houseIntention/image_lu.png' style='margin-bottom: -4px;margin-right:2px;' title='录入完成'>"
						+"<img alt='' src='/resources/image/houseIntention/image_kan_lose.png' style='margin-bottom: -4px;margin-right:2px;' title='实勘中' >"
						+"<img alt='' src='/resources/image/houseIntention/image_jia_lose.png' style='margin-bottom: -4px;margin-right:2px;' title='未定价'>"
						+"<img alt='' src='/resources/image/houseIntention/image_cun_lose.png' style='margin-bottom: -4px;margin-right:2px;' title='未存房'>";
				}
				
				$(this).find("td").eq(3).html(imageType);
			});
			
			if($(result).find(".searchBar .click").length == 0){
				$(result).find(".searchBar").prepend('<li class="click" style="height: 40px; line-height: 40px;">'+
	        		'<select class="form-control" id="houseType" onchange="data(false);" style="height: 40px;">'+
	        			'<option value="myHouse">我的房源</option>'+
	        			'<option value="departmentHouse">部门房源</option>'+
	        			'<option value="allHouse">全部房源</option>'+
	        		'</select>'+
	        	'</li>');
			}
			
		}
	});
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

/**
 * 打开添加意向房源
 */
function showADD(){
	//打开窗口
    $('.cd-popup3').addClass('is-visible3');

}

//跳转修改界面
//多选按钮判断
function ck_eds(phi_id){
   window.location.href = '/intention/jumpUpdataInfo?phi_id='+phi_id;
}

//跳转修改界面
//多选按钮判断
function ck_follow_up(){
      var cbl_s = document.getElementsByName("chickes");  
      var checkCount = 0;
      var id = 0;
      for (var i = 0; i < cbl_s.length; i++) {  
              if (cbl_s[i].checked) {  
                  checkCount++;
                  id = cbl_s[i].id;
              }  
      }  
      
	 if (checkCount == 0) {  
		 $.jBox.info('请选择一个！', '管家婆管理系统');
   } else if (checkCount > 1) {  
  	 $.jBox.info('只能选择一个！', '管家婆管理系统');
   } else {  
	   window.parent.href_mo('/intention/jumpAddIntention?phi_id='+id,"跟进房源","意向房源");
  	 //window.location.href = '/intention/followUp?phi_id='+id;
   } 
}

//跳转修改界面
//多选按钮判断
function ck_follow_ups(id){
	//window.parent.href_mo('/intention/followUp?phi_id='+id,"跟进房源","意向房源");
	window.location.href = '/intention/followUp?phi_id='+id;
}

function selectByCondition(){
	$("#Num").text("1");
	data();
}

function setPage(){
	var nums = $("#nums").text();
	var page = $("input[name='spage']").val();
	$.cookie('the_cookie', page , { expires: 7 ,path: '/'});
	data();
}

function hrefClick(ids){
	window.parent.href_mo($(ids).attr("data-type"),"修改房源","意向房源");
}

function hrefClicks(ids){
	window.parent.href_mo($(ids).attr("data-type"),"房源跟进","意向房源");
}


/** 条件查询*/
function queryWhere(){
	$("#Num").text("1");
	data();
}


function statistics(){
	$.ajax({
	    type: "POST",
	    url: "/intention/statistics",
	    data: "",
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    		
	    	}
	});
}


jQuery(document).ready(function($){

//关闭窗口
//$('.cd-popup3').on('click', function(event){
//    if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup3') ) {
//        event.preventDefault();
//        removeInput();
//        $(this).removeClass('is-visible3');
//       
//    }
//});


//关闭窗口
$('.cd-popup-close').on('click', function(event){
      event.preventDefault();
      removeInput();//清除数据
      $(".cd-popup3").removeClass('is-visible3');
     
});
////ESC关闭
//$(document).keyup(function(event){
//    if(event.which=='27'){
//        $('.cd-popup3').removeClass('is-visible3');
//    }
//});
});




var pid = 0;

/**
 * 意向房源物业（物业 + 电话）判断是否重复
 */
function onMouseLeave(){
	
//	//获取物业号
//	 var _propertyInfo_id
//		prop_code ="";
//	if($("select[name=porp_name]").length > 0){
//		var last_porp_name = $("select[name=porp_name]:last>option:selected");
//		if(last_porp_name.attr("data-prop-id") == 0){
//			_propertyInfo_id = $("input[name=propertyInfo_id]").attr("data-id");
//		}else{
//			_propertyInfo_id = last_porp_name.attr("data-prop-id");
//			prop_code = last_porp_name.attr("data-code") + "-";
//		}
//	} else {
	var	_propertyInfo_id = $("input[name=propertyInfo_id]").attr("data-id");
//	}
	if(_propertyInfo_id != null && _propertyInfo_id != "" && _propertyInfo_id != pid){
		inptBulr("properid");
		var uphone = $("#useriphone").val();
		if(uphone != null && uphone != ""){//如果电话不为空就判断该房源是否重复
			if(!isPhone($("#useriphone").val())){
				$("#useriphone").msg("请正确填写电话号码!",false);
				$("#useriphone").css("border-color","red");
				return;
			}
			
//			$.ajax({
//			type:"POST",
//			url:"/intention/selectHouseIntentionPhoneCount",
//			data:"phi_phone="+uphone+"&propertyInfo_Id="+_propertyInfo_id,
//			datatype:"json",
//			contentType:"application/x-www-form-urlencoded; charset=utf-8",
//			success:function(result){
//				if(result.count == 1){
//					$("#useriphone").msg("该小区已有类似房源！",false);
//					$("#houseReadoDiv").html("");
//					var puser = ""
//						if(result.houseIn.phi_user != null && result.houseIn.phi_user != ""){
//							puser = puser + result.houseIn.phi_user + '(' + result.houseIn.phi_phone + ')</span>';
//						}else{
//							puser = puser + result.houseIn.phi_phone+'</span>';
//						}
//					var html =  '<a href="#"><table><tr style="color:#123;"><td>已有房源</td><td>所在小区</td><td>房东信息</td><td>收录信息</td></tr>'
//							+'<tr><td>已有房源:</td><td>'+result.houseIn.propertyInfo_Name+'</td>'
//							+'<td>'+puser+'</td><td>'+result.houseIn.em_name+'('+returnDate(result.houseIn.phi_date)+')</td></tr></table></a>'
//					$("#houseReadoDiv").html(html);
//					$("#houseReadoDiv").show();
//					$("#houseReadoDiv").onclick=function(){
//						window.parent.href_mo("/intention/houseIntentionContent?types=1&phi_id="+result.houseIn.phi_id,"房源跟进","意向房源");
//					}
//					$('#addHouseIn').attr('disabled',"disabled");//禁用提交
//					$('#addHouseIn').addClass("buttonDisabled");
//					return;
//				}else{
//					$("#houseReadoDiv").hide();
//					$('#addHouseIn').removeAttr("disabled"); //开启其他
//					$('#addHouseIn').removeClass("buttonDisabled");
//				}	
//			}
//			})
		}
		pid = _propertyInfo_id;
	}
	
}

/**
 * 意向房源添加
 */
function submitText(obj){
	$(obj).attr("disabled",true);
	 //获取物业号
	 var _propertyInfo_id
		prop_code ="";
	if($("select[name=porp_name]").length > 0){
		var last_porp_name = $("select[name=porp_name]:last>option:selected");
		if(last_porp_name.attr("data-prop-id") == 0){
			_propertyInfo_id = $("input[name=propertyInfo_id]").attr("data-id");
		}else{
			_propertyInfo_id = last_porp_name.attr("data-prop-id");
			prop_code = last_porp_name.attr("data-code") + "-";
		}
	} else {
		_propertyInfo_id = $("input[name=propertyInfo_id]").attr("data-id");
	}
	if($("#hi_houseS").val() == null || $("#hi_houseS").val() == ""
			|| $("#phi_money").val() == null || $("#phi_money").val() == ""){
		inptBulr("hi_houseS");
		inptBulr("phi_money");
		return;
	}
	//房号处理
	var addr1 = $("#phi_addres1").val();
	var addr2 = $("#phi_addres2").val();
	if(addr1 == null || addr1 == ""){
		addr1 = 0
	}
	if(addr2 == null || addr2 == ""){
		addr2 = 0
	}
	var addr = addr1 + "-" + addr2;
	// 楼层处理
	var phi_floor = $("#phi_addres1").val();
	$.ajax({
		type : "POST",
		url : "/intention/addInitqs",
		data : {
			propertyInfo_Id : _propertyInfo_id,
			phi_phone : $("#useriphone").val(),
			phi_type : "房源录入",
			phi_name : $("#phi_name").val(),
			hi_houseS : $("#hi_houseS").val(),
			phi_money : $("#phi_money").val(),
			buildType : $("input[name='buildType']:checked").val(),
			phi_address : addr,
			phi_user_sex : $("input[name='phi_user_sex']:checked").val(),
			phi_user : $("#phi_user").val(),
			hi_houseT : $("#hi_houseT").val(),
			hi_houseW : $("#hi_houseW").val()
		},
		dataType : "json",
		success : function(result){
			if(result.message == "repeat"){
				$.jBox.tip("该房源正在跟进中");
			}else if(result.message=="success"){
				window.parent.href_mo("/intention/houseIntentionContent?types=1&phi_id="+result.phi_id,"房源跟进","意向房源");
				//关闭窗口
				removeInput();//情况数据
			 	$(".cd-popup3").removeClass('is-visible3');
			}
		}
	});
	
}

//
////添加客户
//function addCusUser(userName,userPhone){
//	if(userName != null && userName != "" && userPhone != null && userPhone != ""){
//		$.ajax({
//			type : "POST",
//			url : "/customer/addCustomerOne",
//			data : "cc_name=" + userName + "&cc_phone=" + userPhone,
//			contentType: "application/x-www-form-urlencoded; charset=utf-8",
//			dataType : "json",
//			success : function(result){
//				alert(result.message + " code = " + result.cc_code);
//				if(result.message == "success"){//表示添加成功
//					ccCode = cc_code;
////					//设置该意向客户的客户编码
////					ccCode = result.cus.cc_code;
//				}
//			}
//			
//		});
//	}
//}


/**
 * 判断重复房源
 */
function chenkphone(obj){
	if(obj.length == 11){
		inptBulr("useriphone");//修改文本框的颜色
		var phone = $("#useriphone").val();//联系电话
		if(!isPhone(phone)){
			$("#useriphone").css("border-color","red").msg("请正确填写电话号码!",false);
			inptBulr("properid");
			return;
		}
		//获取物业号
		var _propertyInfo_id = $("input[name=propertyInfo_id]").attr("data-id");
		inptBulr("properid");
		if(isEmpty(_propertyInfo_id)){
			return;
		}
		$('#addHouseIn').removeClass("buttonDisabled").removeAttr("disabled"); //开启其他
		// 验证用户信息
		$.ajax({
				type:"POST",
				url:"/intention/queryCustomerByPhone",
				data:{
					phone : phone
				},
				datatype:"json",
				contentType:"application/x-www-form-urlencoded; charset=utf-8",
				success:function(result){
					return;
				}
			});
		$(".msg-box").remove();//删除提示
	}else if(obj.length > 11){
		$(".msg-box").remove();//删除提示
		$("#useriphone").css("border-color","red");
		$("#useriphone").msg("请输入正确的电话号码",false);
		$("#houseReadoDiv").hide();
		$('#addHouseIn').addClass("buttonDisabled").attr('disabled',"disabled");//禁用提交
	}else{
		$("#useriphone").css("border-color","red");
		$('#addHouseIn').addClass("buttonDisabled").attr('disabled',"disabled");//禁用提交
	}
}

//判断文本框是否有值,当文本框输入值后改变文本框的颜色
function inputMsg(obj){
	if($("#"+obj).val() == null || $("#"+obj).val() == ""){
		$("#"+obj).css("border-color","red");
	}else{
		$("#"+obj).css("border-color","#bbb");
	}
	
}

//当文本框失去焦点时判断文本框是否有值
function inptBulr(obj){
	if(isEmpty($("#"+obj).val())){
		$("#"+obj).css("border-color","red");
	}else{
		$("#"+obj).css("border-color","#bbb");
	}
}

//将添加页面文本框的值清零
function removeInput(){
	$("#properid").val("");
	$("select[name=porp_name]").css("display","none");
	$("#search-text").val("");
	$("#useriphone").val("");//房东电话
	$("#phi_name").val("");//房源标题
	$("#phi_user").val("");//房东姓名
	$("#phi_user_sex").val("");//房东性别
	$("#hi_houseS").val("");//户型室
	$("#hi_houseT").val("");//户型厅
	$("#hi_houseW").val("");//户型卫
	$("#phi_money").val("");//房东报价
	$("#phi_addres1").val("");//房号楼层
	$("#phi_addres2").val("");//房号数
	$("#buildType").val("私盘");//房源类型
	$("#houseReadoDiv").html("");//重复房源
	$("#houseReadoDiv").hide();//重复房源边框隐藏
	
}



/** 房号选择未知 qs */
function fanghaoweizhi(obj) {
//	var houseNum = $("#fangyuanfanghaos").val();
	var houseNum = roomNum1 + "-" + roomNum2;
	
	if ($(obj).find("input").is(":checked")) {
		$(obj).removeClass("span-checked");
		$(obj).find("input").attr("checked", false);
		if(houseNum != null && houseNum != "" && houseNum.length > 1){
			$("#phi_addres2").val(fanghaochuli(houseNum,1));
			$("#phi_addres1").val(fanghaochuli(houseNum,2));
		}else{
			$("#phi_addres1").val(null);
			$("#phi_addres2").val(null);
		}
		document.getElementById("phi_addres1").readOnly=false;
		document.getElementById("phi_addres2").readOnly=false;
		
	} else {
		$(obj).addClass("span-checked");
		$(obj).find("input").attr("checked", true);
		$("#phi_addres1").val("0");
		$("#phi_addres2").val("0");
		document.getElementById("phi_addres1").readOnly=true;
		document.getElementById("phi_addres2").readOnly=true;
	}

}

//楼层号值写入
function updateAddress1(obj){
	roomNum1 = obj;
}
//房号值写入
function updateAddress2(obj){
	roomNum2 = obj;
}

//房屋号处理
function fanghaochuli(obj,n){
	var arr = obj.split("-");
	if(arr.length >= 2){
		return arr[arr.length-n];
	}
}