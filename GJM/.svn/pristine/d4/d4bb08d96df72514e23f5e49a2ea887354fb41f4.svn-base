var pageNo = 0;
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
	var param = $(".search input").val();
	
	$.ajax({
  	    type: "POST",
  	    url: "/contractObject/staySettlement",
  	    data : {
  	    	pageNo : pageNo,
			pageSize : 10,
			queryWhere : [
				{key : "house_address", 			value : param},
				{key : "contractObject_No", 		value : param},
				{key : "cco_applicantName",			value : param},
				{key : "ccp_phone", 				value : param},
				{key : "cco_state", 				value : "待结算"},
				{key : "cco_state", 				value : "待交接"},
				{key : "cco_state", 				value : "审核未通过"},
				{key : "cco_state", 				value : "复核未通过"},
				{key : "em_id", 					value : getUrlParam("em_id"),		operator : "filter"},
			],
  	    },
  	    dataType: "json",
  	    success: function(result) {
  	    	if(pageNo == 0){
  	    		$("#data-list").html("");
  	    	}
  	    	if(result.data.list.length == 0 && $("#data-list").html() == "") $("#data-list").html("<button style='width:100%;height:"+ ($("#pullrefresh").height()) +"px;border: none;background: none;'>没有数据</button>");
  	    	
  	    	var html = "";
  	    	$(result.data.list).each(function(index, item){
  	    		html += '<div class="content">';
  	    		html += '	<div class="address_house">'+ returnValue(item.house_address) +'</label></div>';
  	    		html += '	<div class="center" style="margin-bottom: 5px;">['+ returnValue(item.cco_applicationType) +'] <label style="color: #3498db">NO.'+ returnValue(item.contractObject_No) +'</label></div>';
  	    		html += '	<div class="center">';
  	    		html += '	<div class="address_name">'+ returnValue(item.cco_applicantName) +' - '+ returnValue(item.ccp_phone) +'</div>';
  	    		html += '	<div class="address_time">'+ returnValue(item.cco_peopleName) +'</div>';
  	    		html += '	</div>';
  	    		html += '	<label class="state">'+ returnValue(item.cco_state) +'</label>';
  	    		html += ' 	<button class="click" onClick="OCStayThing.contractInfo(\''+ item.contractObject_Code +'\')"></button>';
  	    		html += '</div>';
  	    	});
  	    	
  	    	$("#data-list").append(html);
  	    	mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
  	    	if(result.data.list.length < 10){
  	    		mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
  	    	}else{
  	    		mui('#pullrefresh').pullRefresh().refresh(true);
  	    		mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
  	    	}
  	    }
	});
}
