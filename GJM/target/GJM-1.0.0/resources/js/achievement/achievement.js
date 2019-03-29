var mode = '0'; // 0：公共 1:私人 
var isDisplayPeopleMore = false; // 是否显示下级
var loading = '<div class="box-content" style="text-align: center;line-height: 100px;font-size: 18px;">加载中...</div>';

$(function(){
	initAchievementData();
	
	// 查看更多
	$(".page-next").live("click",function(){
		var page=returnNumber($("#main-summary").attr("data-page"));
		$("#main-summary").attr("data-page", page+1);
		queryHouseAchievement(1);
		$(this).fadeOut(600).remove();
	});

	// 设置业绩日期
	$(".date-box,.icon-calendar").on("click",function(e){
		var _select = $(".date-box-select");
		var isShow = _select.is(":visible");
		if(isShow){
			_select.hide();
		} else {
			queryAllAchieveDate();
			_select.show();
		}
		e.stopPropagation();
	});
	$(".date-box-select").on("click",function(e){
		e.stopPropagation();
	});
	
	// 点击document隐藏对应的div
	$(document).bind('click',function(){ 
		$(".date-box-select").hide();
	});
	
	// 滚动事件
	$(window).scroll(function () {
		if ($(window).scrollTop() >= 200) {
			$("#scroll-top").css({
				left : $("#main-box").outerWidth() + 10
			}).fadeIn(400);
		} else if ($(window).scrollTop() == 0) {
			$("#scroll-top").fadeOut(200);
		}
	});
	
	$("#scroll-top").on("click", function(){
		$("html,body").animate({scrollTop:0});
	});
});

/** 初始化*/
function initAchievementData(){
	var queryString =window.location.hash;
	switch (queryString) {
	case "#summary":
		changeTab(0);
		break;
	case "#achieve":
		changeTab(1);
		break;
	case "#people":
		changeTab(2);
		break;
	default:
		changeTab(0);
		break;
	}
}

/** 改变Tab*/
function changeTab(index){
	index = returnNumber(index);
	$(".nav-tab").removeClass("nav-tab-focus").eq(index).addClass("nav-tab-focus");
	var id=$(".nav-tab").eq(index).attr("data-id");
	$("#main-summary").attr("data-page", 1);
	switch (index) {
	case 0:
		queryTeamAchievementList(id);
		break;
	case 1:
		isDisplayPeopleMore = false;
		queryHouseAchievement();
		break;
	case 2:
		if(mode == '0'){
			isDisplayPeopleMore = false;
		}
		queryAchievementEmployeeList(id);
		break;
	}
}

/** 概述--查询团队业绩--列表*/
function queryTeamAchievementList(id) {
	// 数据请求
	$.ajax({
		type: "POST",
	    url: "/achievement/selectTeamAchievementList",
	    data: {
	    	ca_id : id,
	    	sa_startDate : $("#startDate").text().trim(),
	    	sa_endDate : $("#endDate").text().trim()
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async: true,
	    beforeSend: function(){
	    },
	    success: function(result) {
	    	switch (result.code) {
			case 200:
	    		if(result.data == null || result.data.length <=0){
	    			$("#main-summary").html('<div class="box-content"><div class="box-msg"></div></div>');
	    			return;
	    		}
	    		var html ="";
	    		$.each(result.data, function(index, data){
	    			var ab_sumMoney = 0, ab_newMoney = 0;
	    			var sumMoney =0, newMoney = 0;
	    			var achievementBill = data.achievementBill;
	    			if(achievementBill != null){
						ab_sumMoney = returnFloat(achievementBill.ab_sumMoney);
	    				ab_newMoney = returnFloat(achievementBill.ab_newMoney);
	    				sumMoney = returnFloat(achievementBill.sumMoney);
	    				newMoney = returnFloat(achievementBill.newMoney);
	    			}
		    		html +='<div class="box-content box-hover">';
		    		html +='	<div class="sub-title" style="color: #3498DB;">';
		    		html +='		<ul class="title-nav">';
		    		html +='			<li class="visited">'+ returnValue(data.ucc_short) +'</li>';
		    		html +='		</ul>';
		    		html +='		<div class="title-option">';
		    		html +='			<button class="option-setting" onclick="achieveSetting(\''+ data.ucc_id +'\')"><i class="icon-cog"></i>业绩调整</button>';
		    		html +='		</div>';
		    		html +='	</div>';
		    		html +='	<div class="sub-content">';
		    		html +='		<div class="content-item">';
		    		html +='			<div class="item-main" style="padding: 0 12px;">';
		    		html +='				<table class="item-main-table" style="width: 60%;">';
		    		html +='   					<thead>';
		    		html +='   						<tr>';
		    		html +='   							<td>实际<span>总业绩</span></td>';
		    		html +='   							<td>目标<span>总业绩</span></td>';
		    		html +='   							<td style="border-right: 1px solid #ddd">完成率</td>';
		    		html +='   							<td>实际<span>新业绩</span></td>';
		    		html +='   							<td>目标<span>新业绩</span></td>';
		    		html +='   							<td>完成率</td>';
		    		html +='   						</tr>';
		    		html +='   					</thead>';
		    		html +='   					<tbody>';
		    		html +='   						<tr>';
		    		html +='   							<td><span class="money-font">'+ sumMoney.formatMoney(2,'') +'</span></td>';
		    		html +='   							<td><span class="money-font next">'+ data.ta_sum.formatMoney(0,'') +'</span></td>';
		    		html +='   							<td style="border-right: 1px solid #ddd"><span class="money-font">'+ ((sumMoney/data.ta_sum)*100).formatMoney(2,'') +'%</span></td>';
		    		html +='   							<td><span class="money-font">'+ newMoney.formatMoney(2,'') +'</span></td>';
		    		html +='   							<td><span class="money-font ok">'+ data.ta_new.formatMoney(0,'') +'</span></td>';
		    		html +='   							<td><span class="money-font">'+ ((newMoney/data.ta_new)*100).formatMoney(2,'') +'%</span></td>';
		    		html +='   						</tr>';
		    		html +='   					</tbody>';
		    		html +='   				</table>';
		    		html +='			</div>';
		    		html +='			<div class="item-submain">';
		    		html +='				';
		    		html +='			</div>';
		    		html +='		</div>';
		    		html +='	</div>';
		    		html +='</div>';
	    		});
	    		$("#main-summary").html(html);
				break;
			case 201:
	    		if(result.data == null || result.data.length <=0){
	    			$("#main-summary").html('<div class="box-content"><div class="box-msg"></div></div>');
	    			return;
	    		}
	    		var html ="";
	    		$.each(result.data, function(index, data){
	    			var ab_sumMoney = 0;
	    			var ab_newMoney = 0;
	    			var achievementBill = data.achievementBill;
	    			if(achievementBill != null){
						ab_sumMoney = returnFloat(achievementBill.ab_sumMoney);
	    				ab_newMoney = returnFloat(achievementBill.ab_newMoney);
	    			}
		    		html +='<div class="box-content box-hover">';
		    		html +='	<div class="sub-title" style="color: #3498DB;">';
		    		html +='		<ul class="title-nav">';
		    		html +='			<li class="visited">'+ returnValue(data.em_name) +'</li>';
		    		html +='		</ul>';
		    		html +='		<div class="title-option">';
		    		html +='			<button class="option-setting" onclick="achieveSetting(\''+ data.ucc_id +'\')"><i class="icon-cog"></i>业绩调整</button>';
		    		html +='		</div>';
		    		html +='	</div>';
		    		html +='	<div class="sub-content">';
		    		html +='		<div class="content-item">';
		    		html +='			<div class="item-main">';
		    		html +='				<table class="item-main-table" style="width: 60%;">';
		    		html +='   					<thead>';
		    		html +='   						<tr>';
		    		html +='   							<td>实际<span>总业绩</span></td>';
		    		html +='   							<td>目标<span>总业绩</span></td>';
		    		html +='   							<td style="border-right: 1px solid #ddd">完成率</td>';
		    		html +='   							<td>实际<span>新业绩</span></td>';
		    		html +='   							<td>目标<span>新业绩</span></td>';
		    		html +='   							<td>完成率</td>';
		    		html +='   						</tr>';
		    		html +='   					</thead>';
		    		html +='   					<tbody>';
		    		html +='   						<tr>';
		    		html +='   							<td><span class="money-font">'+ ab_sumMoney.formatMoney(2,'') +'</span></td>';
		    		html +='   							<td><span class="money-font next">'+ data.pa_sum.formatMoney(0,'') +'</span></td>';
		    		html +='   							<td style="border-right: 1px solid #ddd"><span class="money-font">'+ ((ab_sumMoney/data.pa_sum)*100).formatMoney(2,'') +'%</span></td>';
		    		html +='   							<td><span class="money-font">'+ ab_newMoney.formatMoney(2,'') +'</span></td>';
		    		html +='   							<td><span class="money-font ok">'+ data.pa_new.formatMoney(0,'') +'</span></td>';
		    		html +='   							<td><span class="money-font">'+ ((ab_newMoney/data.pa_new)*100).formatMoney(2,'') +'%</span></td>';
		    		html +='   						</tr>';
		    		html +='   					</tbody>';
		    		html +='   				</table>';
		    		html +='			</div>';
		    		html +='			<div class="item-submain">';
		    		html +='				';
		    		html +='			</div>';
		    		html +='		</div>';
		    		html +='	</div>';
		    		html +='</div>';
	    		});
	    		$("#main-summary").html(html);
				break;
			case 202:
				if(result.data == null || result.data.length <=0){
	    			$("#main-summary").html('<div class="box-content"><div class="box-msg"></div></div>');
	    			return;
	    		}
	    		var html ="";
	    		$.each(result.data, function(index, data){
	    			var ab_sumMoney = 0;
	    			var ab_newMoney = 0;
	    			var achievementBill = data.achievementBill;
	    			if(achievementBill != null){
						ab_sumMoney = achievementBill.ab_sumMoney;
	    				ab_newMoney = achievementBill.ab_newMoney;
	    			}
		    		html +='<div class="box-content box-hover">';
		    		html +='	<div class="sub-title" style="color: #3498DB;">';
		    		html +='		<ul class="title-nav">';
		    		html +='			<li class="visited">'+ returnValue(data.ucc_short) +'</li>';
		    		html +='		</ul>';
		    		html +='		<div class="title-option">';
		    		html +='			<button></button>';
		    		html +='		</div>';
		    		html +='	</div>';
		    		html +='	<div class="sub-content">';
		    		html +='		<div class="content-item">';
		    		html +='			<div class="item-main">';
		    		html +='				<table class="item-main-table" style="width: 60%;">';
		    		html +='   					<thead>';
		    		html +='   						<tr>';
		    		html +='   							<td>实际<span>总业绩</span></td>';
		    		html +='   							<td>目标<span>总业绩</span></td>';
		    		html +='   							<td style="border-right: 1px solid #ddd">完成率</td>';
		    		html +='   							<td>实际<span>新业绩</span></td>';
		    		html +='   							<td>目标<span>新业绩</span></td>';
		    		html +='   							<td>完成率</td>';
		    		html +='   						</tr>';
		    		html +='   					</thead>';
		    		html +='   					<tbody>';
		    		html +='   						<tr>';
		    		html +='   							<td><span class="money-font">'+ ab_sumMoney.formatMoney(2,'') +'</span></td>';
		    		html +='   							<td><span class="money-font next">'+ data.ta_sum.formatMoney(0,'') +'</span></td>';
		    		html +='   							<td style="border-right: 1px solid #ddd"><span class="money-font">'+ ((ab_sumMoney/data.ta_sum)*100).formatMoney(2,'') +'%</span></td>';
		    		html +='   							<td><span class="money-font">'+ ab_newMoney.formatMoney(2,'') +'</span></td>';
		    		html +='   							<td><span class="money-font ok">'+ data.ta_new.formatMoney(0,'') +'</span></td>';
		    		html +='   							<td><span class="money-font">'+ ((ab_newMoney/data.ta_new)*100).formatMoney(2,'') +'%</span></td>';
		    		html +='   						</tr>';
		    		html +='   					</tbody>';
		    		html +='   				</table>';
		    		html +='			</div>';
		    		html +='			<div class="item-submain">';
		    		html +='				';
		    		html +='			</div>';
		    		html +='		</div>';
		    		html +='	</div>';
		    		html +='</div>';
	    		});
	    		$("#main-summary").html(html);
				break;
				break;
			default:
				console.log(result.msg);
				break;
			}
	    }
	});
}

/** 房屋业绩--查询房屋总业绩--列表*/
function queryHouseAchievement(param){
	var pageNo =$("#main-summary").attr("data-page");
	$.ajax({
		type: "POST",
	    url: "/achievement/selectAchievementSimpleList",
	    data: {
	    	em_id : $("#em_id").val(),
	    	ucc_id : $("#ucc_id").val(),
	    	pageNo : pageNo,
	    	sa_startDate : $("#startDate").text().trim(),
	    	sa_endDate : $("#endDate").text().trim()
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async: true,
	    beforeSend: function(){
	    },
	    success: function(result) {
	    	switch (result.code) {
			case 200:
				// 判断数据加载类型
				if(param != 1){
					$("#main-summary").empty();
				}
				var html ="";
	    		if(result.data.list == null || result.data.list.length <=0){
	    			html +='<div class="box-content">';
	    			html +='	<div class="box-msg"></div>';
	    			html +='</div>';
	    			$("#main-summary").append(html);
	    			return;
	    		}
	    		var cacheIndex = $("#main-summary>.box-content").length;
	    		var listLen = result.data.list.length;
	    		// 循环获取数据
	    		$.each(result.data.list ,function(index, data){
	    			var oldMoneyClass,newMoneyClass,sumMoneyClass;
	    			
	    			var ab_oldMoney=returnFloat(data.ab_oldMoney);
	    			if(ab_oldMoney >=0){
	    				oldMoneyClass = "ok";
	    			} else {
	    				oldMoneyClass = "error";
	    			}
	    			
	    			var ab_newMoney=returnFloat(data.ab_newMoney);
	    			if(ab_newMoney >=0){
	    				newMoneyClass = "ok";
	    			} else {
	    				newMoneyClass = "error";
	    			}
	    			
	    			var ab_sumMoney=returnFloat(data.ab_sumMoney);
	    			if(ab_sumMoney >=0){
	    				sumMoneyClass = "ok";
	    			} else {
	    				sumMoneyClass = "error";
	    			}
	    			
	    			if(isEmpty(cacheIndex)){
	    				cacheIndex = (index + 1);
	    			} else {
	    				cacheIndex++;
	    			}
	    			html +='<div class="box-content">';
	    			html +='	<div class="sub-title">';
	    			html +='		<div class="sub-title-content" style="min-width: 30%;">';
	    			html +='			<span class="title-content-num">'+ cacheIndex +'</span>';
	    			html +='			<span class="title-content-title"><a href="javascript:queryContract(\''+ returnValue(data.hi_code) +'\');">'+ returnValue(data.propertyInfo_Name) + returnValue(data.hi_address) +'</a></span>';
	    			html +='		</div>';
	    			html +='		<div class="sub-title-content">';
	    			html +='			<div class="content-item-headitem"><span class="headitem-label">招租</span><span class="subitem-value error">'+ returnFloat(data.ab_freeDay) +'</span><span class="subitem-suffix">天</span></div>';
	    			html +='			<div class="content-item-headitem"><span class="headitem-label" title="应提免租期">应免</span><span class="subitem-value error">'+ returnFloat(data.ab_forRentDay) +'</span><span class="subitem-suffix">天</span></div>';
	    			html +='		</div>';
	    			html +='		<div class="sub-title-content sub-content-right">';
	    			html +='			<div class="content-item-headitem"><span class="headitem-icon" style="background: #1ABC9C;">新</span><span class="subitem-value '+ newMoneyClass +'">'+ ab_newMoney.formatMoney(2) +'</span><span class="subitem-suffix">元</span></div>';
	    			html +='			<div class="content-item-headitem"><span class="headitem-icon" style="background: #F39C12;">旧</span><span class="subitem-value '+ oldMoneyClass +'">'+ ab_oldMoney.formatMoney(2) +'</span><span class="subitem-suffix">元</span></div>';
	    			html +='			<div class="content-item-headitem" style="padding:0;"><span class="headitem-icon">总</span><span class="subitem-value '+ sumMoneyClass +'">'+ ab_sumMoney.formatMoney(2) +'</span><span class="subitem-suffix">元</span></div>';
	    			html +='			<div class="content-item-headitem" style="padding:0;"><a href="javascript:;" onclick="moreInfo(this)" style="width: 38px;padding: 0;" class="option-more '+ (isTrue(isDisplayPeopleMore)?'icon-angle-down':'fa-angle-right') +'"></a></div>';
	    			html +='		</div>';
	    			html +='	</div>';
	    			html +='	<div class="sub-content" style="display:'+ (isTrue(isDisplayPeopleMore)?'':'none') +'">';
	    			html += getAchievementData(data.achievementBillList);
	    			html +='</div></div>';
	    		});
	    		if(result.data.totalRecords > 0){
	    			if((listLen + $("#main-summary>.box-content").length) < result.data.totalRecords){
	    				html +='<div class="page-next">查看更多 <span style="position: absolute;right: 12px;">'+ pageNo +' / '+ result.data.totalPage +'  共'+ result.data.totalRecords +'条记录</span></div>';
	    			}
	    		}
	    		$("#main-summary").append(html);
	    		if(param == 1){
	    			settingScroll();
	    		}
				break;
			case 201:
				console.log(result.msg);
				break;
			default:
				console.log(result.msg);
				break;
			}
	    }
	});
}

/** 查询人员业绩--列表*/
function queryAchievementEmployeeList(id){
	$.ajax({
		type: "POST",
	    url: "/achievement/selectAchievementEmployeeList",
	    data: {
	    	ca_id : id,
	    	em_id : $("#em_id").val(),
	    	ucc_id : $("#ucc_id").val(),
	    	sa_startDate : $("#startDate").text().trim(),
	    	sa_endDate : $("#endDate").text().trim()
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async: true,
	    beforeSend: function(){
	    },
	    success: function(result) {
	    	switch (result.code) {
			case 200:
				$("#main-summary").empty();
				var html ="";
	    		if(result.data == null || result.data.length <=0){
	    			html +='<div class="box-content">';
	    			html +='	<div class="box-msg"></div>';
	    			html +='</div>';
	    			$("#main-summary").append(html);
	    			return;
	    		}
	    		// 循环获取数据
	    		$.each(result.data,function(index, data){
	    			var ab_oldMoney=returnFloat(data.ab_oldMoney);
	    			var oldMoneyClass;
	    			if(ab_oldMoney >= 0){
	    				oldMoneyClass = "ok";
	    			} else {
	    				oldMoneyClass = "error";
	    			}
	    			var ab_newMoney=returnFloat(data.ab_newMoney);
	    			var newMoneyClass;
	    			if(ab_newMoney >= 0){
	    				newMoneyClass = "ok";
	    			} else {
	    				newMoneyClass = "error";
	    			}
	    			var ab_sumMoney=returnFloat(data.ab_sumMoney);
	    			var sumMoneyClass;
	    			if(ab_sumMoney >= 0){
	    				sumMoneyClass = "ok";
	    			} else {
	    				sumMoneyClass = "error";
	    			}
	    			html +='<div class="box-content">';
	    			html +='	<div class="sub-title">';
	    			html +='		<div class="sub-title-content" style="float: left;">';
	    			html +='			<span class="title-content-num">'+ (index + 1) +'</span>';
	    			html +='			<span class="title-content-title">'+ returnValue(data.em_name) +'</span>';
	    			html +='		</div>';
	    			html +='		<div class="sub-title-content" style="float: right;">';
	    			html +='			<div class="content-item-headitem"><span class="subitem-icon" style="background: #1ABC9C;">新</span><span class="subitem-value '+ newMoneyClass +'">'+ ab_newMoney.formatMoney(2) +'</span><span class="subitem-suffix">元</span></div>';
	    			html +='			<div class="content-item-headitem"><span class="subitem-icon" style="background: #F39C12;">旧</span><span class="subitem-value '+ oldMoneyClass +'">'+ ab_oldMoney.formatMoney(2) +'</span><span class="subitem-suffix">元</span></div>';
	    			html +='			<div class="content-item-headitem"><span class="subitem-icon">总</span><span class="subitem-value '+ sumMoneyClass +'">'+ ab_sumMoney.formatMoney(2) +'</span><span class="subitem-suffix">元</span></div>';
	    			html +='			<div class="content-item-headitem" style="padding:0;"><a href="javascript:;" onclick="moreInfo(this)" style="width: 38px;padding: 0;" class="option-more '+ (isTrue(isDisplayPeopleMore)?'fa-angle-down':'faangle-right') +'"></a></div>';
	    			html +='		</div>';
	    			html +='	</div>';
	    			html +='	<div class="sub-content" style="display:'+ (isTrue(isDisplayPeopleMore)?'':'none') +'">' + getAchievementEmpData(data.achievementBillList) +'</div></div>';
	    		});
	    		$("#main-summary").append(html);
				break;
			case 201:
				console.log(result.msg);
				break;
			case 110:
				console.log(result.msg);
				break;
			default:
				break;
			}
	    }
	});
}

/** 遍历人员业绩数据*/
function getAchievementEmpData(resultData){
	var html ="";
	if(isEmpty(resultData)){
		html +='<div class="content-item">';
		html +='	<div class="subitem-name" style="width: auto;">暂无业绩</div>';
		html +='</div>';
		return html;
	}
	html +='<div class="content-item-title">';
	html +='	<div class="content-item-subitem" style="min-width: 140px;text-align: right;">地址</div>';
	html +='	<div class="content-item-subitem" style="min-width: 84px;max-width: 120px;text-align: left;">类型</div>';
	html +='	<div class="content-item-subitem" style="min-width: 82px;max-width: 90px;text-align: left;">新业绩</div>';
	html +='	<div class="content-item-subitem" style="min-width: 82px;max-width: 90px;text-align: left;">旧业绩</div>';
	html +='	<div class="content-item-subitem" style="min-width: 82px;max-width: 90px;text-align: left;">小计</div>';
	html +='	<div class="content-item-subitem" style="min-width: 60px;text-align: center;">套数</div>';
	html +='	<div class="content-item-subitem subitem-right" style="float:right;padding:0">';
	html +='		<div class="content-item-subitem" style="min-width: 70px;">状态</div>';
	html +='		<div class="content-item-subitem" style="min-width: 90px;">应提时间</div>';
	html +='		<div class="content-item-subitem" style="min-width: 90px;">产生时间</div>';
	html +='	</div>';
	html +='</div>';
	$.each(resultData,function(index, data){
		// 业绩类型
		var ctype ="";
		switch (data.ab_ctype) {
		case 1:
			ctype =returnValue(data.ab_acType);
			break;
		case 2:
			ctype =returnValue(data.ab_acType);
			break;
		case 3:
			ctype ="亏损";
			break;
		case 4:
			ctype ="亏损";
			break;
		}
		// 提取状态
		var state,stateClass;
		switch (data.ab_payState) {
		case 0:
			state = "未提取";
			stateClass = "hint";
			break;
		case 1:
			state ="已提取";
			stateClass = "ok";
			break;
		case 2:
			state ="放弃";
			stateClass = "error";
			break;
		}
		var ab_oldMoney=returnFloat(data.ab_oldMoney);
		var oldMoneyClass;
		if(ab_oldMoney >= 0){
			oldMoneyClass = "ok";
		} else {
			oldMoneyClass = "error";
		}
		var ab_newMoney=returnFloat(data.ab_newMoney);
		var newMoneyClass;
		if(ab_newMoney >= 0){
			newMoneyClass = "ok";
		} else {
			newMoneyClass = "error";
		}
		var ab_sumMoney=returnFloat(data.ab_sumMoney);
		var sumMoneyClass;
		if(ab_sumMoney >= 0){
			sumMoneyClass = "ok";
		} else {
			sumMoneyClass = "error";
		}
		html +='<div class="content-item" style="background:'+ (index%2==0?'#ffffff':'#f3f3f3') +';">';
		html +='	<div class="content-item-subitem" style="min-width: 140px;text-align: right;">'+ returnValue(data.propertyInfo_Name) + returnValue(data.hi_address) +'</div>';
		html +='	<div class="content-item-subitem" style="min-width: 84px;max-width: 120px;text-align: left;">'+ ctype + '</div>';
		html +='	<div class="content-item-subitem" style="min-width: 82px;max-width: 90px;text-align: left;"><span class="'+ newMoneyClass +'">'+ ab_newMoney.formatMoney(2) +'</span></div>';
		html +='	<div class="content-item-subitem" style="min-width: 82px;max-width: 90px;text-align: left;"><span class="'+ oldMoneyClass +'">'+ ab_oldMoney.formatMoney(2) +'</span></div>';
		html +='	<div class="content-item-subitem" style="min-width: 82px;max-width: 90px;text-align: left;"><span class="'+ sumMoneyClass +'">'+ ab_sumMoney.formatMoney(2) +'</span></div>';
		html +='	<div class="content-item-subitem" style="min-width: 60px;text-align: center;">'+ returnFloat(data.ab_moneyPercentage) +'</div>';
		html +='	<div class="content-item-subitem subitem-right" style="float:right;padding:0">';
		html +='		<div class="content-item-subitem" style="min-width: 70px;"><span class="'+ stateClass +'">'+ state +'</span></div>';
		html +='		<div class="content-item-subitem" style="min-width: 90px;"><span style="color:#000">'+ returnDate(data.ab_payTime) +'</span></div>';
		html +='		<div class="content-item-subitem" style="min-width: 90px;"><span style="color:#000">'+ returnDate(data.sa_startDate) +'</span></div>';
		html +='	</div>';
		html +='</div>';
	});
	return html;
}

/** 遍历房屋业绩数据*/
function getAchievementData(resultData){
	if(isEmpty(resultData)){
		return "";
	}
	var html ="";
	html +='<div class="content-item-title">';
	html +='	<div class="content-item-subitem" style="min-width: 84px;max-width: 90px;text-align: right;">名称</div>';
	html +='	<div class="content-item-subitem" style="min-width: 84px;max-width: 120px;">类型</div>';
	html +='	<div class="content-item-subitem" style="min-width: 160px;text-align: center;">合同日期</div>';
	html +='	<div class="content-item-subitem" style="min-width: 72px;text-align: center;">合同金额</div>';
	html +='	<div class="content-item-subitem" style="min-width: 82px;max-width: 90px;text-align: left;">新业绩</div>';
	html +='	<div class="content-item-subitem" style="min-width: 82px;max-width: 90px;text-align: left;">旧业绩</div>';
	html +='	<div class="content-item-subitem" style="min-width: 82px;max-width: 90px;text-align: left;">小计</div>';
	html +='	<div class="content-item-subitem" style="min-width: 60px;text-align: center;">套数</div>';
	html +='	<div class="content-item-subitem subitem-right" style="float:right;padding:0">';
	html +='		<div class="content-item-subitem" style="min-width: 70px;">状态</div>';
	html +='		<div class="content-item-subitem" style="min-width: 90px;">应提时间</div>';
	html +='		<div class="content-item-subitem" style="min-width: 90px;">产生时间</div>';
	html +='	</div>';
	html +='</div>';
	$.each(resultData,function(index, data){
		// 业绩类型
		var ctype ="";
		switch (data.ab_ctype) {
		case 1:
			ctype =returnValue(data.ab_acType);// "存房" + 
			break;
		case 2:
			ctype =returnValue(data.ab_acType);// "出房" + 
			break;
		case 3:
			ctype ="亏损";
			break;
		case 4:
			ctype ="亏损";
			break;
		}
		// 提取状态
		var state,stateClass;
		switch (data.ab_payState) {
		case 0:
			state = "未提取";
			stateClass = "hint";
			break;
		case 1:
			state ="已提取";
			stateClass = "ok";
			break;
		case 2:
			state ="放弃";
			stateClass = "error";
			break;
		}
		var ab_oldMoney=returnFloat(data.ab_oldMoney);
		var oldMoneyClass;
		if(ab_oldMoney >=0){
			oldMoneyClass = "ok";
		} else {
			oldMoneyClass = "error";
		}
		var ab_newMoney=returnFloat(data.ab_newMoney);
		var newMoneyClass;
		if(ab_newMoney >=0){
			newMoneyClass = "ok";
		} else {
			newMoneyClass = "error";
		}
		var ab_sumMoney=returnFloat(data.ab_sumMoney);
		var sumMoneyClass;
		if(ab_sumMoney >=0){
			sumMoneyClass = "ok";
		} else {
			sumMoneyClass = "error";
		}
		html +='<div class="content-item" style="background:'+ (index%2==0?'#ffffff':'#f3f3f3') +';">';
		html +='	<div class="content-item-subitem" style="min-width: 84px;max-width: 90px;text-align: right;">'+ returnValue(data.em_name) +'</div>';
		html +='	<div class="content-item-subitem" style="min-width: 84px;max-width: 120px;">'+ ctype +'</div>';
		html +='	<div class="content-item-subitem" style="min-width: 160px;text-align: center;"><span>'+ returnValue(data.contractBody_StartToEnd) +'</span></div>';
		html +='	<div class="content-item-subitem" style="min-width: 72px;text-align: center;"><span>'+ returnFloat(data.contractBody_Rent) +'</span></div>';
		html +='	<div class="content-item-subitem" style="min-width: 82px;max-width: 90px;text-align: left;"><span class="'+ newMoneyClass +'">'+ ab_newMoney.formatMoney(2) +'</span></div>';
		html +='	<div class="content-item-subitem" style="min-width: 82px;max-width: 90px;text-align: left;"><span class="'+ oldMoneyClass +'">'+ ab_oldMoney.formatMoney(2) +'</span></div>';
		html +='	<div class="content-item-subitem" style="min-width: 82px;max-width: 90px;text-align: left;"><span class="'+ sumMoneyClass +'">'+ ab_sumMoney.formatMoney(2) +'</span></div>';
		html +='	<div class="content-item-subitem" style="min-width: 60px;text-align: center;"><span>'+ returnFloat(data.ab_moneyPercentage) +'</span></div>';
		html +='	<div class="content-item-subitem subitem-right" style="float:right;padding:0">';
		html +='		<div class="content-item-subitem" style="min-width: 70px;"><span class="'+ stateClass +'">'+ state +'</span></div>';
		html +='		<div class="content-item-subitem" style="min-width: 90px;"><span style="color:#000">'+ returnDate(data.ab_payTime) +'</span></div>';
		html +='		<div class="content-item-subitem" style="min-width: 90px;"><span style="color:#000">'+ returnDate(data.sa_startDate) +'</span></div>';
		html +='	</div>';
		html +='</div>';
	});
	return html;
}

/** 查询所有业绩日期*/
function queryAllAchieveDate(){
	$.ajax({
		type: "POST",
	    url: "/achievement/queryAllAchieveDate",
	    data: {},
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async: true,
	    beforeSend: function(){
	    },
	    success: function(result) {
	    	switch (result.code) {
			case 200:
				$(".date-box-select").empty();
				var html ="";
				$.each(result.data, function(index, data){
					if($("#startDate").text().trim() == returnDate(data.ca_startDate) && $("#endDate").text().trim() == returnDate(data.ca_endDate)){
						html += '<a href="javascript:;" class="select-bg-green"><span>'+ returnDate(data.ca_startDate) +'</span><span style="color: #ddd">  |  </span>'+ returnDate(data.ca_endDate) +'<span></span></a>';
					} else {
						html += '<a href="javascript:selectDate(\''+ returnDate(data.ca_startDate) +'\',\''+ returnDate(data.ca_endDate) +'\');"><span>'+ returnDate(data.ca_startDate) +'</span><span style="color: #ddd">  |  </span>'+ returnDate(data.ca_endDate) +'<span></span></a>';
					}
				});
				$(".date-box-select").append(html);
				break;
			default:
				console.log(result.msg);
				break;
	    	}
	    }
	});
}

/** 设置滚动条*/
function settingScroll(){
	var scrollTop=$(window).scrollTop();
	var height=$(window).height();
	$("html,body").animate({scrollTop:scrollTop + height - 14},600);
}

// -------------------
/** 时间筛选*/
function selectDate(startDate, endDate) {
	window.location.href ='/achievement/achievementSum?startDate='+ startDate +'&endDate='+ endDate + window.location.hash;
}

/** 业绩调整*/
function achieveSetting(id){
	functionIfram('/achievementHouse?ucc_id='+ id +'&startDate='+ $("#startDate").text().trim() +'&endDate=' + $("#endDate").text().trim(), "房屋业绩");
}

/** 显示更多*/
function moreInfo(obj){
	var _this =$(obj);
	var _parent = _this.parents(".box-content");
	var _content = _parent.find(".sub-content");
	if(_content.is(":hidden")){
		_content.show();
		_this.removeClass("fa-angle-right").addClass("fa-angle-down");
	} else {
		_content.hide();
		_this.removeClass("fa-angle-down").addClass("fa-angle-right");
	}
}

/** 查询合同*/
function queryContract(code){
	if(isEmpty(code)){
		swal({
			title: "参数错误",
			text: '请刷新页面重试',
			type: 'warning'
		});
		return;
	}
	window.parent.href_mo('/houseLibrary/jumpHouseInfo?hi_code=' + code, "房屋信息", "业绩统计");
}

/** 跳转业绩设置界面*/
function settingAchievement(){
	window.parent.href_mo('/achievementSetting', "业绩设置", "业绩统计");
}

/** 查询Url参数*/
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}