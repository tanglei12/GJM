																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																					var houseSuccess = "";
$(function(){
	data();
	recordMessage();
	$(".leftTile-menu a").attr("class", "nav-menu");
	if(getUrlParam("typeState") == 1 || getUrlParam("typeState") == null){
		$(".leftTile-menu a").each(function(i){
			if(i == 0){
				$(this).attr("class", "nav-menu nav-menu-focus");
				$("#contents1").show();
				$("#contents2").hide();
				$("#contents3").hide();
			}
		});
	}else if(getUrlParam("typeState") == 2){
		$(".leftTile-menu a").each(function(i){
			if(i == 1){
				$(this).attr("class", "nav-menu nav-menu-focus");
				$("#contents1").hide();
				$("#contents2").hide();
				$("#contents3").show();
			}
		});
	}else{
		$(".leftTile-menu a").each(function(i){
			if(i == 2){
				$(this).attr("class", "nav-menu nav-menu-focus");
				$("#contents1").hide();
				$("#contents2").show();
				$("#contents3").hide();
			}
		});
	}
	
});

/**
 * 读取数据
 */
function data(){
	$.ajax({
	    type: "POST",
	    url: "/intention/jumpAddIntentionAjax",
	    data: "phi_id="+getUrlParam("phi_id"),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$("#contents1 .conten-text tbody").html("");
	    	var html = "";
	    	$.each(result.ht, function(index, data) {
	    		var tTime = "--";
	    		if(data.ht_remind_time != null && data.ht_remind_time != ''){
	    			tTime = '<i class="alarmIcon alarmClock"></i>'+returnTimeHourMin(data.ht_remind_time)+":";
	    		}
	    		var tContent = "--";
	    		if(data.ht_remind_count != null && data.ht_remind_count != ''){
	    			tContent = data.ht_remind_count;
	    		}
	    		if(tTime == "--" && tContent == "--"){
	    			tTime = "";
	    		}
	    		var dateTime = returnDate(data.ht_time)+'<div class="corner corner-myself" title="手动录入">手</div>';
	    		if(data.ht_houseType == 1){
	    			dateTime = returnDate(data.ht_time)+'<div class="corner" title="系统生成">系</div>';	
	    		}
	    		if(index % 2 != 0){
	    			html += '<tr class="odd" onmouseover="showContent(this)" onmouseout="hideContent(this)">'+
					'<td style="width: 130px;">'+ dateTime +'</td>'+
					'<td style="width: 130px; ">'+ data.ht_type +'</td>'+
					'<td class="content-font-text"><div class="text-font" onmouseover="showContent(this)" onmouseout="hideContent(this)" style="z-index:'+ (999-index) +'">'+ data.ht_count +'</div></td>'+
					'<td style="width: 130px; ">'+ data.em_name +'</td>'+
					'<td class="content-font-text" style="width: 300px; "><div class="text-font" onmouseover="showContent(this)" onmouseout="hideContent(this)" style="z-index:'+ (999-index) +'">'+ tTime+tContent +'</div></td>'+
					'</tr>';
	    		}else{
	    			html += '<tr onmouseover="showContent(this)" onmouseout="hideContent(this)">'+
					'<td style="width: 130px;">'+ dateTime +'</td>'+
					'<td style="width: 130px; ">'+ data.ht_type +'</td>'+
					'<td class="content-font-text"><div class="text-font" onmouseover="showContent(this)" onmouseout="hideContent(this)" style="z-index:'+ (999-index) +'">'+ data.ht_count +'</div></td>'+
					'<td style="width: 130px; ">'+ data.em_name +'</td>'+
					'<td class="content-font-text" style="width: 300px; "><div class="text-font" onmouseover="showContent(this)" onmouseout="hideContent(this)" style="z-index:'+ (999-index) +'">'+ tTime+tContent +'</div></td>'+
					'</tr>';
	    		}
	    	});
	    	$("#contents1 .conten-text tbody").html(html);
	    	
	    	$(".address").text((result.hi.propertyInfo_Name.indexOf(" ")==-1 ? result.hi.propertyInfo_Name+" ":result.hi.propertyInfo_Name+"-") +result.hi.phi_address);
	    	var state = result.hi.phi_type;
	    	if(result.hi.phi_type == "完成"){
	    		state = "存房成功";
	    	}
	    	$(".propertyType").text(result.hi.buildType+"("+state+")");
	    	var newName = "";
	    	if(result.hi.new_emName != null){
	    		newName = result.hi.new_emName;
	    	}
	    	
	    	var newPhone = "";
	    	if(result.hi.phi_new_addTime != null){
	    		newPhone = returnDate(result.hi.phi_new_addTime);
	    	}
	    	
	    	$("#name").text(newName+"/"+newPhone);
	    	
	    	$("#gTime").text(newPhone);
	    	$(".houseMoneys").text((result.hi.phi_money == null ? "" : "报价:"+result.hi.phi_money+"元")+(result.hi.phi_price == null ? "" : "，定价:"+result.hi.phi_price+"元"));
	    	$(".insertHousePeople").text((result.hi.em_name == null ? "" : result.hi.em_name)+(result.hi.phi_date == null ? "" : "/"+returnDate(result.hi.phi_date)));
	    	
	    	$("#propertyName").text(result.hi.propertyInfo_Name == null ? "" : result.hi.propertyInfo_Name);
	    	$(".houseNum").text(result.hi.phi_floor == null ? "" : result.hi.phi_floor);
	    	$(".houseCode").text(result.hi.phi_address == null ? "" : result.hi.phi_address);
	    	$(".houseType").text((result.hi.hi_houseS == null ? "" : result.hi.hi_houseS+"室")+(result.hi.hi_houseT == null ? "" : result.hi.hi_houseT+"厅")+(result.hi.hi_houseW == null ? "" : result.hi.hi_houseW+"卫")+"("+(result.hi.hi_measure == null ? "" : result.hi.hi_measure+"m²")+")");
	    	$(".peoplePhone").text((result.hi.phi_user == null ? "" : result.hi.phi_user)+"·"+(result.hi.phi_user_sex == null ? "" : result.hi.phi_user_sex)+(result.hi.phi_phone == null ? "" : "("+result.hi.phi_phone+")"));
	    	$("#houseMoney").text(result.hi.phi_money == null ? "" : result.hi.phi_money+"元");
	    	$(".houseSource").text(result.hi.phi_source == null ? "" : result.hi.phi_source);
	    	$(".advantage").text(result.hi.hi_function == null ? "" : result.hi.hi_function);
	    	$(".survey").text(result.hi.phi_status == null ? "" : result.hi.phi_status);
	    	$("#hi_code").val(result.hi.hi_code == null ? "" : result.hi.hi_code);
	    	$("#em_id").val(result.cookieEmployee.em_id == null ? "" : result.cookieEmployee.em_id);
	    	houseSuccess = result.hi.phi_type;
	    	if(result.hi.phi_type == "完成"){
	    		$("#updateContent").attr("onclick","hrefClick(this)");
	    		$("#updateContent").attr("data-type","/houseLibrary/jumpHouseInfo?hi_code="+result.hi.hi_code+"#contractTG");
	    		$("#updateHouse").attr("data-type","hrefClick(this)");
	    		$("#updateHouse").attr("data-type","/houseLibrary/jumpHouseInfoEdit?hi_code="+result.hi.hi_code);
	    	}else{
	    		$("#updateContent").attr("style","background: #ddd !important; cursor:no-drop !important;");
	    		$("#updateHouse").attr("style","background: #ddd !important; cursor:no-drop !important;");
	    	}
	    	
	    	var situation = "";
	    	if(result.hi.hi_situation == 0){
	    		situation = "清水";
	    	}else if(result.hi.hi_situation == 1){
	    		situation = "简装";
	    	}else if(result.hi.hi_situation == 2){
	    		situation = "精装";
	    	}else if(result.hi.hi_situation == 3){
	    		situation = "豪装";
	    	}else if(result.hi.hi_situation == 4){
	    		situation = "中装";
	    	}
	    	$(".renovation").text(situation);
	    	
//	    	var brand = "分散式";
//	    	if(result.hi.hb_id == 2){
//	    		brand = "集中式";
//	    	}
	    	$(".brand").text((result.hi.his_name == null || result.hi.his_name == "") ? "" : result.hi.his_name );
	    	
	    	$(".houseConfigure").text(result.hi.hi_project == null ? "" : result.hi.hi_project);
	    	$(".group").text(result.hi.recommend_name == null ? "" : result.hi.recommend_name);
	    	$(".comment").text(result.hi.hi_content == null ? "" : result.hi.hi_content);
	    	
	    	$(".houseImage").html("");
	    	$.ajax({
	    		type: "POST",
	    		url: "/houseLibrary/queryHouseImageList",
	    		data: {
	    			house_type: "intent",
	    			hi_code: result.hi.hi_code
	    		},
	    		contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    		dataType: "json",
	    		success: function(result) {
	    			$.each(result.data, function(index, data){
						$(".houseImage").append('<div class="image"><img src="'+ data.him_path +'" /></div>');
	    			});
	    		}
	    	});
	    	
	    	$("#housePrice").text(result.hi.phi_price == null ? "" : result.hi.phi_price+"元");
	    	$("#protectionTime").text((result.hi.phi_beginTime == null ? "" : result.hi.phi_beginTime)+(result.hi.phi_endTime == null ? "" : "-"+returnDate(result.hi.phi_endTime)));
	    	$(".houseResult").text(result.hi.phi_type == null ? "" : result.hi.phi_type);
	    }
	});
}

/**
 * 选择按钮
 * 
 * @param ids
 */
function clickTitle(ids){
	$(".leftTile-menu a").attr("class", "nav-menu")
	$(ids).attr("class", "nav-menu nav-menu-focus");
	if($(ids).text() == "房源概述"){
		$("#contents1").show();
		$("#contents2").hide();
		$("#contents3").hide();
		$(".title_top li",window.parent.document).each(function(i){
			if($(this).css("background-color") == "rgb(48, 54, 65)"){
				var href = $(this).find(".meunTitle").attr("data-href").replace("&typeState=1","");
				href = href.replace("&typeState=2","");
				href = href.replace("&typeState=3","");
				$(this).find(".meunTitle").attr("data-href",href+"&typeState=1");
			}
		});
	}else if($(ids).text() == "执行记录"){
		$("#contents1").hide();
		$("#contents3").hide();
		$("#contents2").show();
		$(".title_top li",window.parent.document).each(function(i){
			if($(this).css("background-color") == "rgb(48, 54, 65)"){
				var href = $(this).find(".meunTitle").attr("data-href").replace("&typeState=1","");
				href = href.replace("&typeState=2","");
				href = href.replace("&typeState=3","");
				$(this).find(".meunTitle").attr("data-href",href+"&typeState=3");
			}
		});
	}else if($(ids).text() == "意向跟进"){
		$("#contents1").hide();
		$("#contents2").hide();
		$("#contents3").show();
		$(".title_top li",window.parent.document).each(function(i){
			if($(this).css("background-color") == "rgb(48, 54, 65)"){
				var href = $(this).find(".meunTitle").attr("data-href").replace("&typeState=1","");
				href = href.replace("&typeState=2","");
				href = href.replace("&typeState=3","");
				$(this).find(".meunTitle").attr("data-href",href+"&typeState=2");
			}
		});
	}
	
	window.parent.titleCookie();
}
/**
 * 完善流程点击
 */
function processOver(){
	$(".leftTile-menu a").attr("class", "nav-menu")
	$($("#houseIntention2")).attr("class", "nav-menu nav-menu-focus");
	
	$("#contents1").hide();
	$("#contents2").hide();
	$("#contents3").show();
}

/**
 * 修改库存房源
 */
function updateHouseInform(){
	if(houseSuccess == "完成"){
//		window.parent.href_mo('/houseLibrary/jumpHouseInfoEdit?id='+getUrlParam("phi_id"),"修改房屋","库存房源");
		window.parent.href_mo('/houseLibrary/jumpHouseInfoEdit?hi_code='+$("#hicode").val(),"修改房屋","库存房源");
	}else{
		$.jBox.tip("请先完善该房源信息");
	}
}
/**
 * 添加跟进记录
 */
function houseIntenType(){
	var code = "";
	if($("#hi_code").val() == null || $("#hi_code").val() == ""){
		code = $("#hi_code").val();
	}else{
		code = $("#hi_code").val();
	}
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
	if($("[name=chickes]").attr("checked") && $("#ht_remind_time").val() != null && $("#ht_remind_time").val() != "" ){
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
	+"&ht_remind_count="+$.trim($("#htRemindCount").val())+"&hi_code="+code+"&phi_id="+getUrlParam("phi_id");
	$.ajax({
		type:"POST",
		url:"/intention/addHouseInTypes",
		data:count,
		datatype:"json",
		contentType:"application/x-www-form-urlencoded; charset=utf-8",
		success:function(result){
			if(result.massage=="error"){
				$.jBox.tip("数据添加失败");
			}else{
				var tTime = "--";
				if($("#ht_remind_time").val() != ""){
					tTime = '<i class="alarmIcon alarmClock"></i>'+$("#ht_remind_time").val()+" "+hour+":"+min+":";
				}
				
				var tContent = "--";
				if($("#htRemindCount").val() != ""){
					tContent = $("#htRemindCount").val();
				}
				
				if(tTime == "--" && tContent == "--"){
	    			tTime = "";
	    		}
				
				var dateTime = returnDate(new Date())+'<div class="corner corner-myself" title="手动录入">手</div>';
				
				var html = '<tr onmouseover="showContent(this)" onmouseout="hideContent(this)">'+
				'<td style="width: 130px;">'+ dateTime +'</td>'+
				'<td style="width: 130px; ">'+ $("#htType").val() +'</td>'+
				'<td class="content-font-text"><div class="text-font" style="z-index:'+ (999-$(".conten-text tbody tr").length) +'">'+ $.trim($("#htCount").val()) +'</div></td>'+
				'<td style="width: 130px; ">'+ $.cookie('em_name') +'</td>'+
				'<td class="content-font-text"  style="width: 300px; "><div class="text-font" style="z-index:'+ (999-$(".conten-text tbody tr").length) +'">'+ tTime+tContent +'</div></td>'+
				'</tr>';
				$(".conten-text tbody").append(html);
				
				$("#name").text(result.newName);
				
				$.jBox.tip("数据添加成功");
				
				$("#htType").val("-1");
				$("#htCount").val("");
				$("#ht_remind_time").val("");
				$("#htRemindCount").val("");
				$("#hour").val("9");
				$("#min").val("40");
			}	
			
		}
	});
	
}

/**
 * 意向房源跟踪记录
 */
function recordMessage(){
	$.ajax({
	    type: "POST",
	    url: "/intention/selectFollow",
	    data: "MDID="+getUrlParam("phi_id")+"&em_id="+$("#em_id").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$("#contents2 .conten-text tbody").html("");
	    	var html = "";
	    	$.each(result.houseFollows, function(index, data) {
	    		if(index % 2 != 0){
	    			html += '<tr  class="odd" onmouseover="showContent(this)" onmouseout="hideContent(this)">'+
					'<td style="width: 150px;">'+ returnDateTime(data.ghf_time) +'</td>'+
					'<td>'+ data.ghf_state +'</td>'+
					'<td class="content-font-text"><div class="text-font" style="z-index:'+ (999-index) +'">'+ data.ghf_item +'</div></td>'+
					'<td>'+ data.em_name +'</td>'+
					'</tr>';
	    		}else{
	    			html += '<tr onmouseover="showContent(this)" onmouseout="hideContent(this)">'+
					'<td style="width: 150px;">'+ returnDateTime(data.ghf_time) +'</td>'+
					'<td>'+ data.ghf_state +'</td>'+
					'<td class="content-font-text"><div class="text-font" style="z-index:'+ (999-index) +'">'+ data.ghf_item +'</div></td>'+
					'<td>'+ data.em_name +'</td>'+
					'</tr>';
	    		}
	    		
	    	});
	    	$("#contents2 .conten-text tbody").html(html);
	    }
	});
}

/**
 * 隐藏和显示信息跟进
 */
function messageFollowUp(){
	if($(".messageList").is(":hidden")){
		$(".messageList").slideDown(function(){
			$(".addButton-icon-add").hide();
			$(".addButton-icon-up").show();
			var h = $(document).height();
			  $(document).scrollTop(h);
		});
	}else{
		$(".messageList").slideUp(function(){
			$(".addButton-icon-add").show();
			$(".addButton-icon-up").hide();
		});
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
	
//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

/**
 * 显示更多数据
 * 
 * @param ids
 */
function showContent(ids){
	var textLength = parseInt($(ids).text().length / 28);
	if($(ids).text() > 28){
		var textLengthM = $(ids).text().length % 28
	}
	if(textLength > 1){
		$(ids).find(".text-font").css("line-height","26px");
		$(ids).height(39+24*(textLength-1));
		$(ids).find(".text-font").height(39+24*(textLength-1));
	}
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
 * 隐藏更多数据
 * 
 * @param ids
 */
function hideContent(ids){
	$(ids).height(39);
	$(ids).find(".text-font").height(39);
	$(ids).find(".text-font").css("line-height","39px");
}

/**
 * 显示更多房屋信息
 */
function moreHouseMessage(){
	if($("#textContent").is(":hidden")){
		$("#textContent").slideDown();
	}else{
		$("#textContent").slideUp();
	}
}

/**
 * 跳转标签页
 * 
 * @param ids
 */
function hrefClick(ids){
	window.parent.href_mo($(ids).attr("data-type"),"房屋信息","库存房源");
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
