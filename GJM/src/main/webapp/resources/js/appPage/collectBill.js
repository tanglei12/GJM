var pageNo = 0;
var bco_type = 0;
$(function(){
	bco_type = getQueryString("bco_type");
	$("title").html(bco_type == 201 ? "待付款" : "待收款");
	
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
// 读取房屋列表数据
function data(pageNo){
	$.ajax({
  	    type: "POST",
  	    url: "/financeManage/billContractOrderListApp",
  	    data : {
  	    	pageNo: (pageNo = pageNo == null ? 1 : pageNo),
  	    	pageSize: 10,
  	    	bco_type: bco_type,
  	    	where: $(".search input").val(),
  	    	em_id: getQueryString("em_id")
  	    },
  	    dataType: "json",
  	    success: function(result) {
  	    	if(pageNo == 0){
  	    		$("#data-list").html("");
  	    	}
  	    	var html = "";
  	    	if(result.billContractOrder.length == 0 && $("#data-list").html() == ""){
  	    		$("#data-list").html("<button class='null' style='width:"+ ($(window).width()-10) +"px;height:"+ ($(window).height()-10) +"px'></button>");
  	    	}
  	    	$(result.billContractOrder).each(function(index,item){
  	    		var random = Math.round(Math.random()*12+1);
  	    		var dateDiff = returnNumber(item.contractObject_dateDiff);
  	    		var day = "";
  	    		if(dateDiff < 0){
  	    			day = '<label class="state">逾期'+ Math.abs(dateDiff) +'天</label>';
  	    		} else if(dateDiff == 0){
  	    			day = '<label class="state next-bg">今天</label>';
  	    		} else {
  	    			day = '<label class="state ok-bg">还有'+ dateDiff +'天</label>';
  	    		}
  	    		var type = item.bco_type == 201 ? "[房东]" : "[租客]";
  	    		
  	    		html += '<div class="contents">';
  	    		html += '	<div class="imagePhoto"><img alt="" src="/resources/image/appPage/stay/'+ random +'.png"></div>';
  	    		html += '	<div class="text_center">';
  	    		html += '		<div class="name nameLabel">'+ type + " " + item.bco_customerName + day +'</div>';
  	    		html += '		<div class="address">'+ returnValue(item.house_address) +'</div>';
  	    		html += '	</div>';
  	    		html += '	<div class="moneys">';
  	    		html += '		<label class="money">'+ returnFloat(item.bco_currentPayment) +'元</label>';
  	    		html += '		<label class="month">第'+ returnNumber(item.bco_currentCycle) +'/'+ item.bco_totalCycle +'期 - '+ returnDate(item.bco_currentDate) +'</label>';
  	    		html += '	</div>';
    			html += '	<button class="click" onclick="OCHouseModel.billPay(\''+ item.bco_id +'\',\''+ item.bco_currentCycle +'\',\''+ item.house_address +'\',\''+ item.bco_customerName +'\')"></button>';
  	    		html += '</div>';
  	    	});
  	    	$("#data-list").append(html);
  	    	mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
  	    	if(result.billContractOrder.length < 10){
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

// 获取url参数
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 

