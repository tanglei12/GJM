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
function data(pageNo,address){
	$.ajax({
  	    type: "POST",
  	    url: "/intention/appIntentionListData",
  	    data : {
  	    	start: (pageNo = pageNo == null ? 1 : pageNo),
  	    	end: 10,
  	    	house_address: address,
  	    	em_id : em_id
  	    },
  	    dataType: "json",
  	    success: function(result) {
  	    	if(pageNo == 0){
  	    		$("#data-list").html("");
  	    	}
  	    	var html = "";
  	    	$(result.houseIntentionAPP).each(function(index,item){
  	  	    	var money = item.phi_money;
  	  	    	if(money == null){
  	  	    		money = "无定价";
  	  	    	}else{
  	  	    		money = item.phi_money+"元/月";
  	  	    	}
  	  	    	var image = item.him_path;
  	  	    	if(image == null || image == ""){
  	  	    		image = "/resources/image/nullImage.png";
  	  	    	}
  	  	    	
  	    		html += '<div class="intention_house">';
				html += '	<div class="images"><img src="'+ image +'" /></div>';
				html += '	<div class="house_content">';
				html += '		<div class="house_title">'+ item.house_address +'</div>';
				html += '		<div class="house_configure"><label>'+ (item.phi_source == null ? "":item.phi_source) +'</label><label style="margin-left: 15px;">'+ (item.phi_floor == null?"":item.phi_floor +'m²') +'</label><div class="house_money">'+ money +'</div></div>';
				html += '		<div class="house_configure"><label>'+ item.new_emName +'</label><label style="margin-left: 15px;">'+ item.buildType +'</label></div>';
				html += '		<div class="house_state"><label class="state '+ phi_states(item.phi_type) +'">'+ item.phi_type +'</label></div>';
				html += '	</div>';
				html += '	<div class="house_date">';
				html += '		<dl>';
				html += '			<dt>上次跟进时间：</dt>';
				html += '			<dd>'+ format(item.phi_new_addTime,"yyyy-MM-dd HH:mm") +'</dd>';
				html += '		</dl>';
				html += '	</div>';
				html += '	<button onclick="OCIntentionList.intentionSelect('+ item.phi_id +')"></button>';
				html += '</div>';
  	    	});
  	    	$("#data-list").append(html);
  	    	mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
  	    	if(result.houseIntentionAPP.length < 10){
  	    		mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
  	    	}else{
  	    		mui('#pullrefresh').pullRefresh().refresh(true);
  	    		mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
  	    	}
  	    }
	});
}

//地址搜索
function intentionWhere(address){
	pageNo = 0;
	data(pageNo,address);
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

// 意向状态
function phi_states(statet){
	if(statet == "" || statet == "房源录入" || statet == "房源跟进" || statet == "房源实勘" || statet == "房源定价" || statet == "存房"){
		return "pause";
	}else if(statet == "完成"){
		return "success";
	}else{
		return "error";
	}
}

// 获取url参数
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
	} 

// 地址搜索
function houseAddress(address){
	pageNo = 0;
	data(pageNo,address);
}