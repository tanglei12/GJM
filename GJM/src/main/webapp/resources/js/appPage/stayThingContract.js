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
  	    url: "/contractObject/stayContract",
  	    data : {
  	    	em_id: getQueryString("em_id"),
  	    	start: pageNo,
  	    	end: 10,
  	    	where: $(".search input").val()
  	    },
  	    dataType: "json",
  	    success: function(result) {
  	    	if(pageNo == 0){
  	    		$("#data-list").html("");
  	    	}
  	    	var html = "";
  	    	if(result.stayContract.length == 0 && $("#data-list").html() == ""){
//  	    		$("#data-list").html("<button class='null' style='width:"+ ($(window).width()-10) +"px;height:"+ ($(window).height()-10) +"px'></button>");
  	    		$("#data-list").html("<button style='width:100%;height:"+ ($("#pullrefresh").height()) +"px;border: none;background: none;'>没有数据</button>");
  	    	}
  	    	$(result.stayContract).each(function(index, item){
  	    		var type="租客";
  	    		if(item.contractObject_Type == "托管合同"){
  	    			type = "房东"
  	    		}
  	    		html += '<div class="content">';
  	    		html += '	<div class="address_house">'+ item.house_address +'</label></div>';
  	    		html += '	<div class="center" style="margin-bottom: 5px;">['+ item.contractObject_Type +']<label style="color: #3498db">NO.'+ item.contractObject_No +'</label></div>';
  	    		html += '	<div class="center">';
  	    		html += '	<div class="address_name">'+ type +':'+ item.cc_name +'('+ item.ccp_phone +')</div>';
  	    		html += '	<div class="address_time">管家:'+ item.em_name +'</div>';
  	    		html += '	</div>';
  	    		html += '	<label class="state">'+ returnContractOptionState(item.contractObject_OptionState).title +'</label>';
  	    		html += ' <button class="click" onclick="OCHouseModel.contractInfo(\''+ item.contractObject_Code +'\',\''+ item.cc_code +'\')"></button>';
  	    		html += '</div>';
  	    	});
  	    	$("#data-list").append(html);
  	    	mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
  	    	if(result.stayContract.length < 10){
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