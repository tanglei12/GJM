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
	$.ajax({
  	    type: "POST",
  	    url: "/financeManage/queryRelatedBillPageListApp",
  	    data : {
            bs_handler: getQueryString("em_id"),
  	    	pageNo: pageNo,
  	    	pageSize: 10,
  	    	where: $(".search input").val()
  	    },
  	    dataType: "json",
  	    success: function(result) {
  	    	if(pageNo == 0){
  	    		$("#data-list").html("");
  	    	}
  	    	var myselfRelatedOrder = result.data || "";

  	    	var html = "";
  	    	$.each(myselfRelatedOrder, function(index, item){
  	    		var state = "";
  	  	    	var stateStr = "";
  	  	    	if(item.bs_state == 1){
  	  	    		stateStr = "未支付";
  	  	    		state = "#F39C12";
  	  	    	}else if(item.bs_state == 2){
  	  	    		stateStr = "已支付";
  	  	    		state = "#1ABC9C";
  	  	    	}else if(item.bs_state == 4){
  	  	    		stateStr = "待退款";
  	  	    		state = "#F39C12";
  	  	    	}else{
  	  	    		stateStr = "已取消";
  	  	    		state = "#FF666";
  	  	    	}
  	    		html += '<div class="content">';
  	    		html += '	<div class="address_house">'+ item.house_address +'</div>';
  	    		html += '	<div class="center">';
  	    		html += '	<div class="address_name">'+ item.bs_payerName +'['+ returnBillType(item.rb_type) +']:'+ item.bs_payType +'</div>';
  	    		html += '	<div class="address_time">'+ format(item.bs_createTime,"yyyy-MM-dd HH:mm") +'</div>';
  	    		html += '	</div>';
  	    		html += '	<label class="money">￥'+ item.bs_money +'</label>';
  	    		html += '	<label class="state" style="color:'+ state +'">'+ stateStr +'</label>';
  	    		html += '</div>';
  	    	});
  	    	$("#data-list").append(html);
  	    	mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
  	    	if(myselfRelatedOrder.length < 10){
  	    		mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
  	    	}else{
  	    		mui('#pullrefresh').pullRefresh().refresh(true);
  	    		mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
  	    	}
  	    }
	});
}

/**
 * 毫秒转换为日期格式
 * @param time 时间/时间字符串
 * @param format 时间格式 "yyyy-MM-dd" || "yyyy-MM-dd HH:mm:ss"
 * @returns
 */
function format(time, format) {
	if (time == null) {
		return "";
	}
	var t = new Date(time);
	var tf = function(i) {
		return (i < 10 ? '0' : '') + i
	};
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
		switch(a) {
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

function getQueryString(key){
    var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;
  }