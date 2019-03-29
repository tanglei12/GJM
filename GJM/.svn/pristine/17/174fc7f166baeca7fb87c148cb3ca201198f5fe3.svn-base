var pageNo = 0;
var em_id = 0;
$(function(){
	em_id = getQueryString("em_id");
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
	
	// 缓存时间
	var cache_time = null;
	// 定时时间
	var setOutTime = 600;
	// 定时器
	var outTime = null;
	// 缓存文本
	var cache_text = "";
	// 事件-搜索框
	$("[name=search-content]").on({
		"input propertychange" : function(){
			var _this = $(this);
			var _close = $(this).next(".input-close");

			var currentTime = new Date().getTime();
			if(cache_time == null){
				cache_time = currentTime;
			}
			
			if($(this).val().length > 0){
				var boo = true;
				if(currentTime - cache_time < setOutTime){
					boo = false;
					// 还在输入时，移除定时器
					clearTimeout(outTime);
				}
				cache_time = currentTime;
				// 执行定时器
				outTime = setTimeout(function(){
					data(0);
				}, setOutTime);
				if(boo){
					// 可查询时，移除定时器
					clearTimeout(outTime);
					// 加载数据
					data(0);
				}
				// 显示文本清空图标时，并绑定事件
				if(_close.is(":hidden")) {
					_close.fadeIn().on("click", function(){
						_this.val("");
						$(this).hide().off("click");
						// 加载数据
						data(0);
					});
				}
			} else {
				// 搜索框为空时，移除定时器
				clearTimeout(outTime);
				_close.fadeOut().off("click");
				$("#search-data").empty();
				// 加载数据
				data(0);
			}
		},
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
  	    url: "/contractObject/queryWarnContractListToApp",
  	    data : {
  	    	start: (pageNo = pageNo == null ? 1 : pageNo),
  	    	end: 10,
  	    	em_id: em_id,
  	    	where: $(".search input").val()
  	    },
  	    dataType: "json",
  	    success: function(result) {
  	    	if(pageNo == 0){
  	    		$("#data-list").html("");
  	    	}
  	    	var html = "";
  	    	if(result.businessContractVos.length == 0 && $("#data-list").html() == ""){
  	    		$("#data-list").html("<button style='width:100%;height:"+ ($("#pullrefresh").height()) +"px;border: none;background: none;'>没有数据</button>");
  	    	}
  	    	$(result.businessContractVos).each(function(index,item){
				html += '<div class="content">';
				html += '	<div class="address_house">'+ item.house_address +'';
				// 到期
				var ymd = item.contractObject_dateDiff;
				if(item.contractObject_State == 2 && ymd < 0){
					html += '	<span class="error-bg" style="border-radius:5px; padding: 0 5px; float:right;margin-right: 10px; font-size:3.8vw;" title="超期'+ Math.abs(ymd) +'天">超&nbsp;'+ Math.abs(ymd) +'</span>';
				}
				if(item.contractObject_State == 2 && ymd <= 31 && ymd > 0){
					html += '	<span class="ok-bg" style="border-radius:5px; padding: 0 5px; float:right;margin-right: 10px; font-size:3.8vw;" title="还有'+ Math.abs(ymd) +'天到期">到&nbsp;'+ Math.abs(ymd) +'</span>';
				}
				if(item.contractObject_State == 2 && ymd == 0){
					html += '	<span class="next-bg" style="border-radius:5px; padding: 0 5px; float:right;margin-right: 10px; font-size:3.8vw;" title="该合同今日到期，请及时处理">今日到期</span>';
				}
				html += '	</div>';
				html += '	<div class=""><hr style="height:1px;border:none;border-top:1px solid #e6e6e6; " /></div>';
				html += '	<div class="">['+item.contractObject_Type+']<font style="color:#3498db;">No.'+ item.contractObject_No +'</font></div>';
				html += '	<div class=""><label class="address_name" style="color:#E74C3C;">'+item.contractBody_Rent+'</label>元/月</label><label class="address_time" style="font-size:3vw;">'+item.contractBody_StartTOEnd+'</label></div>';
				html += ' 	<button class="click" onClick="OCHouseModel.contractInfo(\''+ item.contractObject_Code +'\')"></button>';
				html += '</div>';
  	    	});
  	    	$("#data-list").append(html);
  	    	mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
  	    	if(result.businessContractVos.length < 10){
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

