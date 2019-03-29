$(function(){
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			down: {
				height:50,//可选,默认50.触发下拉刷新拖动距离,
		        auto: true,//可选,默认false.自动下拉刷新一次
				callback: pulldownRefresh
			},
			up: {
				contentrefresh: '正在加载...',
				contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
				callback: pullupRefresh
			}
		}
	});
});

/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	// 刷新
	pageNo = 0;
	data(pageNo);
}

/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	// 加载
	pageNo = pageNo+10;
	data(pageNo);
}

// 读取数据
function data(pageNo){
	$.ajax({
  	    type: "POST",
  	    url: "/appPage/queryCustomerStayList",
  	    data : {
  	    	em_id: getQueryString("em_id"),
  	    	pageNo: pageNo,
  	    	pageSize: 10,
  	    	where: $("#searchWhere").val(),
  	    	searchType : $("#searchType").attr("data-value"),
  	    	searchTime : $("#searchTime").attr("data-value")
  	    },
  	    dataType: "json",
  	    success: function(result) {
  	    	if(pageNo == 0){
  	    		$("#data-list").html("");
  	    	}
  	    	var html = "";
  	    	if(result.list.length == 0){
  	    		// 待处理
  	    		$("#data-list").html("<button style='width:100%;height:"+ ($("#pullrefresh").height()) +"px;border: none;background: none;'>没有数据</button>");
  	    	}
  	    	$(result.list).each(function(index, item){
  	    		if(result.searchType == "1"){
  	    			html += '<div class="content">';
  	  	    		html += '	<div class="cont-title">';
  	  	    		html += '		<span class="house_address">'+returnValue(item.house_address)+'</span>';
  	  	    		html += '		<span class="label" style="background:rgba(78, 138, 24, 0.95);">托管合同</span>';
  	  	    		html += '	</div>';
  	  	    		html += '	<div class="cont-text">';
  	  	    		html += '		<div class="userInfo">';
  	  	    		html += '			<div class="user-label blue">';
  	  	    		html += '				<i class="fa fa-user"></i>房东';
  	  	    		html += '			</div>';
  	  	    		html += '			<span>'+returnValue(item.ccp_phone)+'</span>';
  	  	    		html += '			<span>'+returnValue(item.cc_name)+'</span>';
  	  	    		html += '		</div>';
  	  	    		html += '		<div class="createTime">'+ returnDate(item.hi_date) +'</div>';
  	  	    		html += '	</div>';
  	  	    		html += '	<button class="cont-submit" data-code="'+returnValue(item.hi_code)+'" onclick="addLandlordContract(this,\''+ returnValue(item.cc_code) +'\')"></button>';
  	  	    		html += '</div>';
  	    		}else{
  	    			html += '<div class="content">';
  	  	    		html += '	<div class="cont-title">';
  	  	    		html += '		<span class="house_address">'+returnValue(item.house_address)+'</span>';
  	  	    		html += '		<span class="label" style="background:rgba(185, 113, 49, 0.87);">租赁合同</span>';
  	  	    		html += '	</div>';
  	  	    		html += '	<div class="cont-text">';
  	  	    		html += '		<div class="userInfo">';
  	  	    		html += '			<div class="user-label red">';
  	  	    		html += '				<i class="fa fa-user"></i>租客';
  	  	    		html += '			</div>';
  	  	    		html += '			<span>'+returnValue(item.ccp_phone)+'</span>';
  	  	    		html += '			<span>'+returnValue(item.cc_name)+'</span>';
  	  	    		html += '		</div>';
  	  	    		html += '		<div class="createTime">'+ item.hs_createTime.split(" ")[0] +'</div>';
  	  	    		html += '	</div>';
  	  	    		html += '	<button class="cont-submit" data-code="'+returnValue(item.hi_code)+'" onclick="addTenantContract(this,\''+ returnValue(item.cc_code) +'\')"></button>';
  	  	    		html += '</div>';
  	    		}
  	    	});
  	    	$("#data-list").append(html);
  	    	mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
  	    	if(typeof result.list != "undefined" && result.list.length < 10){
  	    		mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
  	    	}else{
  	    		mui('#pullrefresh').pullRefresh().refresh(true);
  	    		mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
  	    	}
  	    }
	});
}
/**
 *  条件筛选(赶得急，写的乱，不建议延用)
 *  
 * @param obj
 * @param type
 */
function changeFilter(obj){
	// 判断按钮是否禁用
	var disabled = $(obj).find(".text").hasClass("disabled");
	if(disabled){
		return;
	}
	var id = $(obj).attr("id");
	// 判断按钮状态
	var isUp = $(obj).find(".text").hasClass("angle-up");
	if(!isUp){
		$(obj).find(".text").removeClass("angle-down").addClass("angle-up");
		$(obj).siblings().find(".text").removeClass("angle-up").addClass("angle-down");
		$("#filter-box").show();
		$("div[data-head='"+id+"']").show().siblings().hide();
	}else{
		$(obj).find(".text").removeClass("angle-up").addClass("angle-down");
		$("#filter-box").hide();
		$("div[data-head='"+id+"']").hide().siblings().hide();
	}
}
/**
 * 选择
 * @param obj
 */
function checkItem(obj){
	var value = $(obj).attr("data-value");
	var showText = $(obj).text();
	var id = $(obj).parent().attr("data-head");
	// 改变按钮值
	$("#"+id).attr("data-value",value).find(".text").text(showText).removeClass("angle-up").addClass("angle-down").addClass("ok");
	// 下拉选项颜色渲染
	$(obj).addClass("ok");
	$(obj).siblings().removeClass("ok");
	$(obj).parent().hide().parent().hide();
	// 查询数据
	data(pageNo);
}

/**
 * 签订租赁合同
 * 
 * @param obj
 */
function addTenantContract(obj,cc_code){
	var hi_code = $(obj).attr("data-code");
	OCHouseModel.contract(hi_code, "zl", cc_code);
}

/**
 * 签订托管合同
 * 
 * @param obj
 */
function addLandlordContract(obj,cc_code){
	var hi_code = $(obj).attr("data-code");
	OCHouseModel.contract(hi_code, "tg", cc_code);
	// 暂时不跳转至合同页 shenhx 20170423
}