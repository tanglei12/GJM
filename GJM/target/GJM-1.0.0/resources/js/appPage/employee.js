var start = 0;
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
})

/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	// 刷新
	start = 0;
	data(start);
}

/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	// 加载
	start = start+10;
	data(start);
}

function data(start,where){
	$.ajax({
  	    type: "POST",
  	    url: "/user/appUserList",
  	    data : {
  	    	whereList : where,
  	    	start : start
  	    },
  	    dataType: "json",
  	    success: function(result) {
  	    	if(start == 0){
  	    		$("#data-list").html("");
  	    	}
  	    	var html = "";
  	    	$(result.queryEmployeeApp).each(function(index,item){
  	    		html += '<div class="content">';
  	  	    	html += '	<div class="imageFoot">'+ item.em_name.substring(0,1) +'</div>';
  	  	    	html += '	<div class="phoneType">';
  	  	    	html += '		<label>'+ item.em_name +'-'+ item.ucc_name +'('+ item.ucp_name +')</label>';
  	  	    	html += '		<label class="font">'+ item.em_phone +'</label>';
  	  	    	html += '	</div>';
  	  	    	html += '	<button onclick="OCEmployee.telphone(\''+ item.em_phone +'\')"></button>';
  	  	    	html += '</div>';
  	    	});
  	    	$("#data-list").append(html);
  	    	
  	    	mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
  	    	if(result.queryEmployeeApp.length < 10){
  	    		mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
  	    	}else{
  	    		mui('#pullrefresh').pullRefresh().refresh(true);
  	    		mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
  	    	}
  	    }
	});
}

function dataWhere(){
	// 刷新
	start = 0;
	data(start,$(".search input").val());
}