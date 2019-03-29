
$(function(){
	search();
	//验证手机号码
	$("#userPhone").blur(function(){
		if(checkPhone($("#userPhone").val()) == false){
			$("#userPhone").parent().next().text("电话填写有误！");
		}else{
			$("#userPhone").parent().next().text("");
			if(GetQueryString("id") == null && $("#userChoice").val() == "0"){
				$.ajax({
				    type: "POST",
				    url: "/customerSee/customerPhoneBool",
				    data: "phone="+$("#userPhone").val(),
				    contentType: "application/x-www-form-urlencoded; charset=utf-8",
				    dataType: "json",
				    success: function(result) {
				    	if(result.msg == "0"){
				    		$("#userPhone").parent().next().text("该用户已经存在！");
							$("#userPhone").focus();
				    	}else{
				    		$("#userPhone").parent().next().text("");
				    	}
				    }
				});
			}
		}
	});
	
	//判断id是否为空
	if(GetQueryString("id") != null){
		$("#userButton").remove();
		$.ajax({
		    type: "POST",
		    url: "/customerSee/updateSelect",
		    data: "id="+GetQueryString("id"),
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(result) {
		    	$("#userName").val(result.queryCustomerListID.ctm_name);
		    	$("#userName").attr("disabled",true);
		    	
		    	if($.cookie("em_id") == result.queryCustomerListID.em_id){
		    		$("#userPhone").val(result.queryCustomerListID.ctm_phone);
		    	}
		    	$("#userPhone").attr("disabled",true);
		    	
		    	if(result.queryCustomerListID.ctm_sex == "男"){
		    		$("#selectSex").html("<option>男</option><option>女</option><option>其他</option>");
		    	}else if(result.queryCustomerListID.ctm_sex == "女"){
		    		$("#selectSex").html("<option>女</option><option>男</option><option>其他</option>");
		    	}else{
		    		$("#selectSex").html("<option>其他</option><option>男</option><option>女</option>");
		    	}
		    	$("#houseInfo").val(returnValue(result.businessContractVo.propertyInfo_address + result.businessContractVo.hi_address));
		    	$("#houseId").val(result.businessContractVo.hi_code);
		    	$("#InputMeasure").val(result.businessContractVo.hi_measure);
		    	$("#InputHouseF").val(result.businessContractVo.hi_houseS);
		    	$("#customerText").val(result.queryCustomerListID.ctm_demand);
		    	$("#customerContent").val(result.queryCustomerListID.csm_opinion);
		    	
		    	if(result.queryCustomerListID.csm_image != ""){
		    		var imagePath = result.queryCustomerListID.csm_image.split('~')
			    	var image = "";
			    	for(var i=0; i<imagePath.length; i++){
			    		image+='<div class="images-box-img"><img class="showboxImg" src="'+ imagePath[i] +'"><span class="images-box-img-delete" data-type="CUM">删除</span></div>';
			    	}
			    	$("#CUM-count").text(imagePath.length);
			    	$("#CUM-box").append(image);
		    	}
		    	
		    	if(result.queryCustomerListID.csm_state == 1 || $.cookie("em_id") != result.queryCustomerListID.em_id){
		    		$("#Ubutton").remove();
		    		$(".images-box-img-delete").remove();
		    		$(".images-btn").remove();
		    	}
		    }
		});
	}
});

/** 搜索列表*/
function search(){
	// 外部常量
	var $source =$('#houseInfo');
	var $sourceVal =$('#houseId');
	
//	var $dataValue =$("#conid").attr("data-value");
	// 内部常量
	var eindex = -1;
	var $queryList = $("#queryList");
	var $show = $("#search-show");
	var $box = $("#search-box");
	var $input = $("#search-box input");
	var $item =$('#search-show .search-item');
	var $tips = '<div class="search-tisp">没有数据</div>';
	
	$input.bind("input propertychange", function() {
		$.ajax({
		    type: "POST",
		    url: "/customerSee/queryHouseInfo",
		    data: "param="+$input.val(),
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(result) {
				if(result.code == 200){
					var content ='';
					if(result.data.list.length <=0){
						$show.html($tips);
						return;
					}
					$.each(result.data.list, function(index, data) {
						content += 
						'<tr class="search-item" onclick="new search().setToInput(this)">' +
							'<td title="小区房号">' +
								'<input type="hidden" value="'+ data.hi_code +'">'+ 
								'<input type="hidden" id="measure" value="'+ data.hi_measure +'">'+ 
								'<input type="hidden" id="houseF" value="'+ data.hi_houseS +'">'+ 
								'<input type="hidden" id="contractObject_No" value="'+ data.contractObject_No +'">'+ 
								returnValue(data.house_address) +'</td>' +
							'<td title="甲方姓名">'+ data.cc_name +'</td>' +
							'<td title="联系电话">'+ data.ccp_phone +'</td>' +
						'</tr>';
					});
					$show.html(
						'<table>' +
							'<thead>' +
								'<th style="text-a">小区房号</th>' +
								'<th>甲方姓名</th>' +
								'<th>联系电话</th>' +
							'</thead>' +
							'<tbody>'+ content +'</tbody>' +
						'</table>');
				} else {
					$show.html('<div class="search-tisp">'+ result.msg +'</div>');
				}
		    }
		});
	});
	// 上、下、回车选择
	$input.keyup(function(event){
		var $item = $('#search-show tbody>tr.search-item');
		if (event.keyCode == 40) {// 上键
			eindex++;
			if (eindex >= $item.length) {
				eindex = 0;
			}
			showSearchResult(eindex);
		} else if (event.keyCode == 38) {// 下键
			eindex--;
			if (eindex < 0) {
				eindex = $item.length - 1;
			}
			showSearchResult(eindex);
		}else if(event.keyCode == 13){ // 回车
			if(eindex >= 0){
				setToInput($item.eq(eindex));
				close();
				eindex = -1;
				return false;
			}
		}else{
			eindex = -1;
		}
	});
	 //如果在表单中，防止回车提交
	$input.keydown(function(event){
		if(event.keyCode == 13){
			return false;
		}
	});
	
	/** 显示搜索结果 */
	var showSearchResult = function(index){
		var $item =$('#search-show tbody>tr.search-item');
		$item.removeClass('item-hover').eq(index).addClass('item-hover');
	}
	/** 设置input值 */
	this.setToInput = function(param) {
		var $objChildren = $(param).children("td");
		$('#houseInfo').val($objChildren.eq(0).text());
		$('#houseId').val($objChildren.eq(0).find("input[type='hidden']").val());
		if($("#sgin-info").is(":hidden")){
			$("#people").val("");
			$("#phone").val("");
		}else{
			$("#people").val($objChildren.eq(1).text());
			$("#phone").val($objChildren.eq(2).text());
		}
		
		/*$.ajax({
		    type: "POST",
		    url: "/customerSee/customerSeeCount",
		    data : "houseId=" + $("#houseId").val(),
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(result) {
		    	if(result.msg == 0){
		    		$("#houseInfo").parent().next().text("房屋已经被带看，请重新选择房屋！");
		    	}else{
		    		$("#houseInfo").parent().next().text("");
		    	}
		    }
		});*/
		
		$source.change();
		eindex = -1;
		close();
	}
	/** 关闭搜索框 */
	var close =function(){
		$input.val("");
		$show.empty().html($tips);
		$queryList.hide();
	}
	$queryList.bind("click",function(e){stopPropagation(e); });
	$source.bind("click", function(e){ stopPropagation(e); });
	$(document).bind("click", function() { close(); })
	$source.on("focus", function() {
		$queryList.show();
		$input.focus();
		$input.trigger("propertychange");
		$queryList.hover(function(){
			$(document).unbind("click");
		},function(){
			$(document).bind("click", function() {
				close();
			});
		});
	});
	
	var stopPropagation = function(e) {//把事件对象传入
	    if (e.stopPropagation){ //支持W3C标准
	        e.stopPropagation();
	    }else{ //IE8及以下浏览器
	        e.cancelBubble = true;
	    }
	}
}


/** 查询客户信息*/
function openModel(obj, param) {
	var _windowHeight =window.innerHeight;
	if (!isEmpty(_windowHeight) && parseInt(_windowHeight) < 700) {
		$(".model-main").css({
			height: "412px",
    		overflow: "auto"
		});
	} else {
		$(".model-main").css({
			height: "auto",
    		overflow: "inherit"
		});
	}
	// 初始化
	var $commonId = $(obj).attr("data-id");
	showSginList($commonId);
	
	$(".model-content").hide();
	$(".model-mark,#sginInfo").show();
	// 搜索框绑定
	$("#sginInfo-search").bind("input propertychange",function(){
		$("#pageNo").val(1);
		showSginList($commonId);
	}).focus();
	// 显示搜索结果
	var choose = function(index){
		$('#sginInfo-Body>tr').removeClass('item-hover').eq(index).addClass('item-hover');
	}
}
/** 显示客户列表信息*/
function showSginList(param){
	var _body = $("#sginInfo-Body");
	$.ajax({
	    type: "POST",
	    url: "/customerSee/userList",
	    data: "param="+$("#sginInfo-search").val()+"&pageNo="+$("#pageNo").val()+"&state=0",
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
			if(result.code != "0"){
				_body.empty();
				$.each(result.data, function(index, data) {
					var text = "";
					if(data.ctm_demand.length > 38){
						text = data.ctm_demand.substring(0,36)+".....";
					}else{
						text = data.ctm_demand;
					}
					_body.append(
						'<tr onclick="setSginInfo(this,\'' + param + '\');">' +
							'<td class="data0"><input type="hidden" class="dataId" value="'+ data.ctm_id +'">'+ data.ctm_name +'</td>' +
							'<td class="data1">'+ data.ctm_sex +'</td>' +
							'<td class="data2">'+ data.ctm_phone +'</td>' +
							'<td class="data3" style="text-align: left;" title="'+ data.ctm_demand +'" >'+ text +'</td>' +
						'</tr>');
				});
				$("#totalPage").text(result.count.countSize);
				$("#totalRecords").text(result.count.size);
			}
	    }
	});
}

/** 设置客户信息*/
function setSginInfo(obj, param) {
	var $this =$(obj);
	var $did =$this.find(".dataId").val();
	var signid =$("#sign-id").val();
	if($did == signid){
		alert("该客户已选择");
		return;
	}
	var boo =false;
	$.each($("input[type='hidden'].form-input"), function(index){
		if ($(this).val() == $did) {
			alert("该客户已选择");
			boo = true;
			return false;
		}
	});
	if (boo) return;
	$("#userName").val($this.find(".data0").text());
	if($this.find(".data1").text() == "男"){
		$("#selectSex").html("<option>男</option><option>女</option><option>其他</option>");
	}else if($this.find(".data1").text() == "女"){
		$("#selectSex").html("<option>女</option><option>男</option><option>其他</option>");
	}else{
		$("#selectSex").html("<option>其他</option><option>男</option><option>女</option>");
	}
	$("#userPhone").val($this.find(".data2").text());
	$("#userChoice").val(1);
	$("#customerText").val($this.find(".data3").text());
	closeModel();
}

/** 关闭Model*/
function closeModel(){
	$(".model-mark,.model-content").hide();
	$(".model-content #sginInfo-search").val("");
}

/** 跳页*/
function bindUpDown(){
	var pageNo = returnNumber($("#pageNo").val());
	var totalPage =returnNumber($("#totalPage").text());
	if (pageNo > totalPage || pageNo < 1) return;
	$("#pageNo").val(pageNo);
	showSginList('sginInfo');
}

/** 分页--[上一页]*/
function pageUp(){
	var pageNo = returnNumber($("#pageNo").val());
	if (pageNo <= 1) {
		return;
	}
	var totalPage =returnNumber($("#totalPage").text());
	if(pageNo > totalPage){
		$("#pageNo").val(totalPage);
	} else {
		$("#pageNo").val(pageNo - 1);
	}
	showSginList('sginInfo');
}

/** 分页--[下一页]*/
function pageDown(){
	var pageNo = returnNumber($("#pageNo").val());
	var totalPage = returnNumber($("#totalPage").text());
	if (pageNo >= totalPage) {
		return;
	}
	$("#pageNo").val(pageNo + 1);
	showSginList('sginInfo');
}

/**
 * 成功提交 
 */
function successSubmit(state){
	//客户姓名
	var userName = "";
	//客户电话
	var userPhone = "";
	//房屋编码
	var houseId = "";
	//客户需求
	var customerText = "";
	//客户意见
	var customerContent = $("#customerContent").val();
	//失败原因
	var failText = $("#failText textarea").val();
	var image = "";
	if($(".images-box .images-box-img").html() != null){
		$(".images-box .images-box-img").each(function(i){
			image+=$(this).find("img").attr("src")+"~";
		});
		image = image.substring(0,(image.length-1));
		image = "&image="+image;
	}
	if($("#userName").val() == ""){
		$("#userName").parent().next().text("客户姓名不能为空！");
		$("#userName").focus();
		return;
	}else{
		$("#userName").parent().next().text("");
		userName = $("#userName").val();
	}
	if($("#userPhone").val() == ""){
		$("#userPhone").parent().next().text("客户电话不能为空！");
		$("#userPhone").focus();
		return;
	}else{
		var bool = false;
		$("#userPhone").parent().next().text("");
		if(checkPhone($("#userPhone").val()) == false){
			$("#userPhone").focus();
		}else{
			if(GetQueryString("id") == null && $("#userChoice").val() == "0"){
				$("#userPhone").parent().next().text("");
				$.ajax({
				    type: "POST",
				    url: "/customerSee/customerPhoneBool",
				    data: "phone="+$("#userPhone").val(),
				    contentType: "application/x-www-form-urlencoded; charset=utf-8",
				    dataType: "json",
				    async:false,
				    success: function(result) {
				    	if(result.msg == "0"){
				    		$("#userPhone").parent().next().text("该用户已经存在！");
							$("#userPhone").focus();
				    	}else{
				    		$("#userPhone").parent().next().text("");
				    		bool = true;
				    	}
				    }
				});
			}else{
				bool = true;
			}
			
		}
		if(bool == false){
			return;
		}
		userPhone = $("#userPhone").val();
	}
	if($("#houseInfo").val() == ""){
		$("#houseInfo").parent().next().next().text("房屋产权地址不能为空！");
		$("#houseInfo").focus();
		return;
	}else{
		$("#houseInfo").parent().next().next().text("");
		houseId = $("#houseId").val();
	}
	if($("#customerText").val() == ""){
		$("#customerText").parent().next().text("客户需求不能为空！");
		return;
	}else{
		$("#customerText").parent().next().text("");
		customerText = $("#customerText").val();
	}
	
	if($("#houseInfo").parent().next().next().text() != "" || $("#userPhone").parent().next().text() != ""){
		return;
	}
	
	var csm = "";
	if(GetQueryString("id") != null){
		csm = "&csm_id="+GetQueryString("id");
	}
	
	if(state == "1"){
		if(image == ""){
			alert("请填写看房照片！");
			return;
		}
	}
	
	$.ajax({
	    type: "POST",
	    url: "/customerSee/customerSeeAddData",
	    data: "userName="+userName+"&userPhone="+userPhone+"&sex="+ $('#selectSex option:selected').val()+"&houseId="+houseId+"&customerText="+customerText+"&customerContent="+customerContent+"&state="+state+csm+image,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.msg = "1"){
	    		window.location.href = "/customerSee";
	    	}else{
	    		alert("插入有误，请刷新网页重试！")
	    	}
	    }
	});
}

/**
 * 失败提交 
 */
function failSubmit(state){
	//客户姓名
	var userName = "";
	//客户电话
	var userPhone = "";
	//房屋编码
	var houseId = "";
	//客户需求
	var customerText = "";
	//客户意见
	var customerContent = $("#customerContent").val();
	//失败原因
	var failText = $("#failText textarea").val();
	if($("#userName").val() == ""){
		$("#userName").parent().next().text("客户姓名不能为空！");
		$("#userName").focus();
		return;
	}else{
		$("#userName").parent().next().text("");
		userName = $("#userName").val();
	}
	if($("#userPhone").val() == ""){
		$("#userPhone").parent().next().text("客户电话不能为空！");
		$("#userPhone").focus();
		return;
	}else{
		$("#userPhone").parent().next().text("");
		if(checkPhone($("#userPhone").val()) == false){
			$("#userPhone").parent().next().text("电话填写有误！");
		}else{
			if(GetQueryString("id") == null && $("#userChoice").val() == "0"){
				$("#userPhone").parent().next().text("");
				$.ajax({
				    type: "POST",
				    url: "/customerSee/customerPhoneBool",
				    data: "phone="+$("#userPhone").val(),
				    contentType: "application/x-www-form-urlencoded; charset=utf-8",
				    dataType: "json",
				    async:false,
				    success: function(result) {
				    	if(result.msg == "0"){
				    		$("#userPhone").parent().next().text("该用户已经存在！");
							$("#userPhone").focus();
				    	}else{
				    		$("#userPhone").parent().next().text("");
				    		bool = true;
				    	}
				    }
				});
			}else{
				bool = true;
			}
		}
		if(bool == false){
			return;
		}
		userPhone = $("#userPhone").val();
	}
	if($("#houseInfo").val() == ""){
		$("#houseInfo").parent().next().next().text("房屋产权地址不能为空！");
		$("#houseInfo").focus();
		return;
	}else{
		$("#houseInfo").parent().next().next().text("");
		houseId = $("#houseId").val();
	}
	if($("#customerText").val() == ""){
		$("#customerText").parent().next().text("客户需求不能为空！");
		return;
	}else{
		$("#customerText").parent().next().text("");
		customerText = $("#customerText").val();
	}
	
	if($("#houseInfo").parent().next().next().text() != "" || $("#userPhone").parent().next().text() != ""){
		return;
	}
	
	var boolF = false;
	if($("#failText").is(":hidden")){
		$("#failText").show();
	}else{
		if($("#failText textarea").val() == ""){
			$("#failText .msg").text("失败原因不能为空");
			$("#failText textarea").focus();
			boolF = false;
		}else{
			$("#failText").parent().next().text("");
			boolF = true;
		}
	}
	
	if(boolF == false){
		return;
	}
	
	$.ajax({
	    type: "POST",
	    url: "/customerSee/customerSeeAddData",
	    data: "userName="+userName+"&userPhone="+userPhone+"&sex="+ $('#selectSex option:selected').val()+"&houseId="+houseId+"&customerText="+customerText+"&customerContent="+customerContent+"&failText="+failText+"&state="+state,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.msg = "1"){
	    		window.location.href = "/customerSee";
	    	}else{
	    		alert("插入有误，请刷新网页重试！")
	    	}
	    }
	});
}

/*** 
 * 校验手机号的格式是否正确 
 * @param mobile 
 * @returns {*} 
 */  
function checkPhone(phone){ 
    if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){ 
        return false; 
    }else{
    	return true;
    }
}

function checkNum(obj) {  
    //检查是否是非数字值  
    if (isNaN(obj.value)) {  
        obj.value = "";  
    }  
    if (obj != null) {  
        //检查小数点后是否对于两位
        if (obj.value.toString().split(".").length > 1 && obj.value.toString().split(".")[1].length > 2) {  
            alert("小数点后多于两位！");  
            obj.value = "";  
        }  
    }  
}

/**
 * 获取url参数
 * 
 * @param name
 * @returns
 */
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function returnNumber(str){
	return (str == null || str == "" || typeof(str) == "undefined") ? 0 : parseInt(str);
}
function returnValue(str){
	return (str == null || str == "" || typeof(str) == "undefined" || str == "undefined") ? "" : str;
}
function isEmpty(str){
	return (typeof(str) == "undefined" || str == "" || str == null);
}