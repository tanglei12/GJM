$(function(){
	data("今天");
});

/**
 * 更多
 */
function moreSelect(){
	 data($(".centers").find(".content").length)
}

/**
 * 数据读取
 * 
 * @param str
 */
function data(str){
	var ids = "";
	if($("#emID").val() != null && $("#emID").val() != ''){
		ids = "&em_id="+$("#emID").val();
	}
	var dates = "";
	if(str == "自定义时间"){
		dates = "dateStarte="+$(".dateTime1").val()+"&dateEnde="+$(".dateTime2").val();
	}else{
		dates = "dateTile="+str;
	}
	var week = 0;
	$.ajax({
		type: "POST",
	    url: "/customerSee/cutomerList",
	    data: dates+ids,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	var htmlDATA = "";
	    	$(".centers").html("");
	    	if(result.queryCustomerList == ""){
	    		if($(".centers").find(".content").length == 0){
	    			var d = new Date();
	    			//计算周
		    		if(result.queryCustomerSettingsWhere != null){
		    			htmlDATA = divContent(week,d.getFullYear(),"<font style='font-size:16px;'>"+(d.getMonth()+1)+"-"+d.getDate()+"</font>",0,"0%")+"</tbody></table></div></div></div>";
		    		}else{
		    			htmlDATA = divContent(week,d.getFullYear(),"<font style='font-size:16px;'>"+(d.getMonth()+1)+"-"+d.getDate()+"</font>",0,"0%")+"</tbody></table></div></div></div>";
		    		}
		    		$(".centers").append(htmlDATA);
	    		}
	    	}else{
	    		var userPhone = "";
	    		$.each(result.queryCustomerList, function(index, item) {
	    			var bool = true;
	    			if(index == 0){
	    				$(".centers").find(".content").each(function(i){
		    				if($(this).find(".year").text() == item.cs_year){
		    					bool = false;
		    				}
		    			});
	    				var year = 0
	    				if(bool){
	    					year = item.cs_year;
	    				}
	    				week = item.cs_week;
	    				htmlDATA = divContent(week,year,result.startEnd,result.size,item.cs_per);
	    			}
	    			var csm_opinion = "";
	    			var csm_reason = "";
	    			if(item.csm_opinion != null)
	    				csm_opinion = item.csm_opinion;
	    			if(item.csm_reason != null)
	    				csm_reason = item.csm_reason;
	    			//跟进状态 0: 正在跟踪 1:成功 2:失败
	    			var state = "";
	    			if(item.csm_state == 0){
	    				state = "<font style='color:#F39C12'>正在跟进</font>";
	    			}else if(item.csm_state == 1){
	    				state = "<font style='color:#1ABC9C'>带看成功</font>";
	    			}else{
	    				state = "<font style='color:#E74C3C'>带看失败</font>";
	    			}
	    			
	    			if(userPhone == item.ctm_phone){
	    				htmlDATA+="<tr id='"+ item.csm_id +"' onclick='updateCumtomer(\""+ item.csm_id +"\",\""+ item.csm_state +"\",\""+ item.em_id +"\")'><td></td><td></td><td>"+ item.ctm_sex +"</td><td>"+ state +"</td><td>"+ item.propertyInfo_Name +" "+ item.hi_address +"</td><td>"+ item.ctm_demand +"</td><td>"+ csm_opinion +"</td><td>"+ csm_reason +"</td></tr>";		
	    			}else{
	    				htmlDATA+="<tr id='"+ item.csm_id +"' onclick='updateCumtomer(\""+ item.csm_id +"\",\""+ item.csm_state +"\",\""+ item.em_id +"\")'><td>"+ item.ctm_name +"</td><td>"+ item.ctm_phone +"</td><td>"+ item.ctm_sex +"</td><td>"+ state +"</td><td>"+ item.propertyInfo_Name +" "+ item.hi_address +"</td><td>"+ item.ctm_demand +"</td><td>"+ csm_opinion +"</td><td>"+ csm_reason +"</td></tr>";		
	    			}
	    			userPhone = item.ctm_phone;
	    						
		    	});
	    		htmlDATA +="</tbody></table></div></div></div>";
	    		
	    		$(".centers").append(htmlDATA);
	    	}
	    }
	});
	
	var contentHeight = $("#content"+ week +" .content_conts").height();
	$("#content"+ week +" .zou_height").height(contentHeight);
	
	$("#userPhone").blur(function(){
		if(checkPhone($("#userPhone").val()) == false){
			$("#userPhone").parent().next().text("电话填写有误！");
		}else{
			$("#userPhone").parent().next().text("");
			$.ajax({
			    type: "POST",
			    url: "/customerSee/customerPhoneBool",
			    data: "phone="+$("#userPhone").val(),
			    contentType: "application/x-www-form-urlencoded; charset=utf-8",
			    dataType: "json",
			    success: function(result) {
			    	if(result.msg == "0"){
			    		$("#userPhone").parent().next().text("该用户已经存在！");
			    	}else{
			    		$("#userPhone").parent().next().text("");
			    	}
			    }
			});
		}
	});
	
}

/**
 * 选择开始结束时间
 */
function dates(){
	WdatePicker({
		onpicked: function(dp){
			if($(".dateTime1").val() != "" && $(".dateTime2").val() != ""){
				data("自定义时间");
			}
		}
	});
}

/**
 * 显示公共内容
 * 
 * @returns {String}
 */
function divContent(cs_week,cs_year,cs_date,cs_surplusNum,cs_per){
	var htmlDATA = "<div class='content' id='content"+ cs_week +"'>";
	if(cs_year != 0){
	htmlDATA +="<div class='year'>"+ 
	cs_year+
	"</div>"
	}
	htmlDATA +="<div class='content_table'>"+
		"<div class='month'>"+
			cs_date+
		"</div>"+
		"<div class='time_zou'>"+
			"<span class='zou_circular'><span class='min_yuan'></span></span>"+
			"<span class='zou_height'></span>"+
		"</div>"+
		"<div class='content_conts'>"+
			"<div class='title'>"+
				"<div class='title_left'>总条数："+ cs_surplusNum +"</div>"+
				"<div class='title_right'>成功率："+ cs_per +"</div>"+
			"</div>"+
				"<table>"+
					"<thead class='content_title'>"+
						"<tr>"+
							"<td style='width: 8%;'>客户名称</td>"+
							"<td style='width: 8%;'>客户电话</td>"+
							"<td style='width: 5%;'>性别</td>"+
							"<td style='width: 9%;'>跟进状态</td>"+
							"<td style='width: 15%;'>产权地址</td>"+
							"<td style='width: 19%;'>客户需求</td>"+
							"<td style='width: 16%;'>客户意见</td>"+
							"<td style='width: 20%;'>失败原因</td>"+
						"</tr>"+
					"</thead><tbody>";
	return htmlDATA;
}

/** 查询客户信息*/
function openModel(obj, param, state) {
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
	showSginList($commonId,state);
	
	$(".model-content").hide();
	$(".model-mark,#sginInfo").show();
	// 搜索框绑定
	$("#sginInfo-search").bind("input propertychange",function(){
		$("#pageNo").val(1);
		showSginList($commonId,state);
	}).focus();
	// 显示搜索结果
	var choose = function(index){
		$('#sginInfo-Body>tr').removeClass('item-hover').eq(index).addClass('item-hover');
	}
}
/** 显示客户列表信息*/
function showSginList(param,statet){
	$("#sginInfo-search").attr("placeholder","客户姓名、手机号码");
	$("#sginBtn").show();
	$(".model-list thead").html('<tr><th width="20%">客户姓名</th><th width="10%">性别</th><th width="30%">手机号</th><th width="30%">是否公开</th></tr>');
	if(statet == 0){
		$("#model-drag-title").text("我的客户");
	}else if(statet == 1){
		$("#model-drag-title").text("公开客户");
	}else if(statet == 2){
		$("#model-drag-title").text("内部人员");
		$("#sginInfo-search").attr("placeholder","内部人员姓名、手机号码");
		$("#sginBtn").hide();
		$(".model-list thead").html('<tr><th width="40%">内部人员姓名</th><th width="10%">性别</th><th width="50%">手机号</th></tr>');
	}
	var _body = $("#sginInfo-Body").html("");
	if(statet != 2){
		$.ajax({
		    type: "POST",
		    url: "/customerSee/userList",
		    data: "param="+$("#sginInfo-search").val()+"&pageNo="+$("#pageNo").val()+"&state="+statet,
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(result) {
				if(result.code != "0"){
					_body.empty();
					$.each(result.data, function(index, data) {
						var state = "公开";
							if(data.ctm_state == 0)
								state = "不公开";
								_body.append(
										'<tr>' +
											'<td class="data0"><input type="hidden" class="dataId" value="'+ data.ctm_id +'">'+ data.ctm_name +'</td>' +
											'<td class="data1">'+ data.ctm_sex +'</td>' +
											'<td class="data2">'+ data.ctm_phone +'</td>' +
											'<td class="data3"><a href="javascript:openUser(\''+ data.ctm_id +'\',\''+ data.ctm_state +'\');">'+ state +'</a></td>' +
										'</tr>');
					});
					$("#totalPage").text(result.count.countSize);
					$("#totalRecords").text(result.count.size);
				}
		    }
		});
	}else{
		$.ajax({
		    type: "POST",
		    url: "/customerSee/userEmList",
		    data: "param="+$("#sginInfo-search").val()+"&pageNo="+$("#pageNo").val()+"&state="+statet,
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(result) {
				if(result.code != "0"){
					_body.empty();
					$.each(result.data, function(index, data) {
						var sex = "女";
						if(data.em_sex == "man")
							sex = "男";
						_body.append(
								'<tr onclick="trClick(\''+ data.em_name +'\',\''+ data.em_id +'\')">' +
									'<td class="data0"><input type="hidden" class="dataId" value="'+ data.em_id +'">'+ data.em_name +'</td>' +
									
									'<td class="data1">'+ sex +'</td>' +
									'<td class="data2">'+ data.em_phone +'</td>' +
								'</tr>');
					});
					$("#totalPage").text(result.count.countSize);
					$("#totalRecords").text(result.count.size);
				}
		    }
		});
	}
	
}

/**
 * 选择内部人员查询
 * 
 * @param name
 * @param id
 */
function trClick(name,id){
	$("#emName").val(name);
	$("#emID").val(id);
	closeModel();
	$(".centers").html("");
	$(".dateTime .timeClick").attr("class","timeClick");
	if(!$(".inputTime").is(":hidden")){
		$(".inputTime").hide();
	}
	$(".dateTime .timeClick").each(function(i){
		if(i == 0){
			$(this).attr("class","timeClick mouseDown");
		}
	});
	
	data(null,id);
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
	closeModel();
}

/**
 * 公开客户
 * 
 * @param id
 * @param state
 */
function openUser(id,state){
	if(state == 0){
		swal({
			title: "是否公开用户",
			text: "公开用户所有人都能看见该客户",
			type: "warning",   
			showCancelButton: true,   
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: "确定",   
			closeOnConfirm: false
		}, function(){
			$.ajax({
			    type: "POST",
			    url: "/customerSee/openUser",
			    data: "id="+id+"&state="+state,
			    contentType: "application/x-www-form-urlencoded; charset=utf-8",
			    dataType: "json",
			    success: function(result) {
			    	if(result.msg == "success"){
			    		swal("成功", "该用户已经是公开用户", "success");
			    		showSginList('sginInfo',state);
			    	}else{
			    		showSginList('sginInfo',state);
			    		swal("失败", "该用户公开失败，请重新尝试", "error"); 
			    	}
			    }
			});
		});
	}
}

/** 清除内部人员 */
function cleanEM(){
	$("#emName").val("");
	$("#emID").val("");
	$(".centers").html("");
	data();
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
	if($("#model-drag-title").text() == "我的客户"){
		showSginList('sginInfo',0);
	}else if($("#model-drag-title").text() == "公开客户"){
		showSginList('sginInfo',1);
	}else{
		showSginList('sginInfo',2);
	}
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
	if($("#model-drag-title").text() == "我的客户"){
		showSginList('sginInfo',0);
	}else if($("#model-drag-title").text() == "公开客户"){
		showSginList('sginInfo',1);
	}else{
		showSginList('sginInfo',2);
	}
}

/** 分页--[下一页]*/
function pageDown(){
	var pageNo = returnNumber($("#pageNo").val());
	var totalPage = returnNumber($("#totalPage").text());
	if (pageNo >= totalPage) {
		return;
	}
	$("#pageNo").val(pageNo + 1);
	if($("#model-drag-title").text() == "我的客户"){
		showSginList('sginInfo',0);
	}else if($("#model-drag-title").text() == "公开客户"){
		showSginList('sginInfo',1);
	}else{
		showSginList('sginInfo',2);
	}
}
/** 切换窗口1*/
function moveModelMainLeft(){
	$("#addCustomerBtn").show();
	$('#main1').animate({marginLeft:'-700px', opacity:0}, 300, '', function(){
		$(this).hide();
		$(this).css("marginLeft",0);
		$("#main2").show().animate({opacity:1}, 200);
		$("#model-drag-title").text('添加客户');
		$("#main2 input[type='text']:first").focus();
	});
}

/** 切换窗口2*/
function moveModelMainRight(){
	$('#main2').animate({marginRight:'-700px', opacity:0}, 300, '', function(){
		$(this).hide();
		$(this).css("marginRight",0);
		$("#main1").show().animate({opacity:1}, 200);
		$("#model-drag-title").text('客户资料');
		$("#main1 input[type='text']:first").focus();
	});
	$('#main2').find(".tisp").removeClass("error").empty();
	$('#main2').find("#listMore-box").hide();
	$('#main2').find(".imgTisp").html('<span><span id="card1-tisp">0</span>/1</span>');
	$('#main2').find(".uploadify").show();
	$('#main2').find(".form-control").val("").removeClass("input-error");
	$("#main2").find(".images-box-img").remove();
	showSginList('sginInfo',0);
}

/**
 * 插入客户
 * 
 * @param state
 */
function successSubmit(state){
	//客户姓名
	var userName = "";
	//客户电话
	var userPhone = "";
	//客户需求
	var customerText = "";
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
		userPhone = $("#userPhone").val();
	}
	if($("#customerText").val() == ""){
		$("#customerText").parent().next().text("客户需求不能为空！");
		return;
	}else{
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
		if(bool == false){
			return;
		}
		customerText = $("#customerText").val();
	}
	
	$.ajax({
	    type: "POST",
	    url: "/customerSee/addCustomer",
	    data: "userName="+userName+"&userPhone="+userPhone+"&sex="+ $('#selectSex option:selected').val()+"&customerText="+customerText+"&state="+state,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.msg = "success"){
	    		moveModelMainRight();
	    	}else{
	    		alert("插入有误，请刷新网页重试！")
	    	}
	    }
	});
	
}

/**
 * 金钱判断
 * 
 * @param obj
 */
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

/**
 * 获取自然周
 * 
 * @returns
 */
function weeks(){
	var date = new Date();
	var yearStart = new Date(date.getFullYear(),0,1);
	var weekNo = Math.ceil(( ( (date - yearStart) / 86400000) + 1)/7)
	
	return weekNo;
}

/**
 * 跟进客户
 * 
 * @param id
 */
function updateCumtomer(id,state){
	if(state != 2){
		functionIfram('/customerSeeAdd?id='+ id +'','房屋带看','客户跟进');
	}else{
		alert("带看失败无法修改")
	}
}

/**
 * 显示客户跟踪
 */
function customerSubmit(){
	
}

/**
 * 时间选择
 * 
 * @param ids
 */
function timeClick(ids){
	$(ids).parent().find(".timeClick").attr("class","");
	$(ids).attr("class","timeClick mouseDown");
	if(!$(".inputTime").is(":hidden")){
		$(".inputTime").hide();
	}
	data($(ids).text());
}

/**
 * 自定义时间
 */
function showTime(ids){
	$(".dateTime1").val("");
	$(".dateTime2").val(returnDate(new Date()));
	$(".dateTime .timeClick").attr("class","timeClick");
	$(ids).attr("class","timeClick mouseDown");
	
	$(".inputTime").show();
	
}