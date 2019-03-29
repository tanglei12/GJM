var start = 0;
var type = "房东";
var where = "";
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

function data(start){
	$.ajax({
  	    type: "POST",
  	    url: "/customer/userPersonList",
  	    data : {
  	    	sqlWhere : where,
  	    	cc_type : type,
  	    	start : start
  	    },
  	    dataType: "json",
  	    success: function(result) {
  	    	if(type == ""){
  	    		$("#person_title").text("潜客");
  	    	}else{
  	    		$("#person_title").text(type);
  	    	}
  	    	if(start == 0){
  	    		$("#data-list").html("");
  	    	}
  	    	$(".person").text(result.size);
  	    	var html = "";
  	    	$(result.customerPerson).each(function(index,item){
  	    		var house_address = item.house_address;
  	    		if(house_address == null || house_address == ""){
  	    			house_address = "失效客户"
  	    		}
  	    		html += '<div class="content">';
  	  	    	html += '	<div class="imageFoot">'+ item.cc_name.substring(0,1) +'</div>';
  	  	    	html += '	<div class="phoneType">';
  	  	    	html += '		<label>'+ item.cc_name +'('+ house_address +')</label>';
  	  	    	html += '		<label class="font">'+ item.ccp_phone +'</label>';
  	  	    	html += '	</div>';
  	  	    	html += '	<button onclick="OCHouseModel.telphone(\''+ item.ccp_phone +'\')"></button>';
  	  	    	html += '</div>';
  	    	});
  	    	$("#data-list").append(html);
  	    	
  	    	mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
  	    	if(result.customerPerson.length < 10){
  	    		mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
  	    	}else{
  	    		mui('#pullrefresh').pullRefresh().refresh(true);
  	    		mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
  	    	}
  	    }
	});
}

// 选择类型
function typeHouse(ids,str){
	type = str;
	data(0);
	$(".title_house label").css("color","#666");
	$(ids).find("label").css("color","#FF6666");
}

function dataWhere(ids){
	// 刷新
	where = $(ids).val();
	start = 0;
	data(start);
}