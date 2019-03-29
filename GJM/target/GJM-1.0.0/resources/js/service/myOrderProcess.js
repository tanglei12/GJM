function selectOrade(ids){
	//读取维修订单流程
	$.ajax({
	    type: "POST",
	    url: "/serve/orderProcessContent",
	    data: "MDID="+ids,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$("#Pro_content ul").html("");
	    	var str = "";
	    	//流程导航全部为默认状态
	    	$(".Pro_Ftitle ul li").each(function(){
	    		$(this).attr("class","");
	    	});
	    	var dates = new Array();
	    	$.each(result.orderTable, function(index, items) {
	    		//判断数组是否存在状态
	    		var state = 0;
	    		//流程导航状态更改
	    		$(".Pro_Ftitle ul li").each(function(){
	    			if($(this).text() == items.mo_state){
	    				$(this).attr("class","click");
	    			}
    	    	});
	    		//循环维修数据
	    		if(dates == ""){
	    			dates.push(new Date(items.mo_date).format("yyyy-MM-dd"));
	    			str+="<li><span class='date'>"+ new Date(items.mo_date).format("yyyy-MM-dd") +"</span><span class='week'>"+ week(new Date(items.mo_date).format("yyyy-MM-dd")) +"</span><span class='time'>"+ new Date(items.mo_date).format("hh:mm:ss") +"</span><span class='text'>"+ items.mo_content +"</span></li>";
	    		}else{
	    			for (var i = 0; i < dates.length; i++) {
		    			if(dates[i] == new Date(items.mo_date).format("yyyy-MM-dd")){
			    			str+="<li><span class='date' style='visibility: hidden;'>"+ new Date(items.mo_date).format("yyyy-MM-dd") +"</span><span class='week' style='visibility: hidden;'>"+ week(new Date(items.mo_date).format("yyyy-MM-dd")) +"</span><span class='time'>"+ new Date(items.mo_date).format("hh:mm:ss") +"</span><span class='text'>"+ items.mo_content +"</span></li>";
			    			state = 1;
		    			}
					}
	    			if(state == 0){
		    			dates.push(items.mo_date);
		    			str+="<li><span class='date'>"+ new Date(items.mo_date).format("yyyy-MM-dd") +"</span><span class='week'>"+ week(new Date(items.mo_date).format("yyyy-MM-dd")) +"</span><span class='time'>"+ new Date(items.mo_date).format("hh:mm:ss") +"</span><span class='text'>"+ items.mo_content +"</span></li>";
		    		}
	    		}
	    		
	    	});
	    	$("#Pro_content ul").html(str);
	    	
	    		//最后一个改变颜色
		    	$("#Pro_content ul li").each(function(i){
		    		if(($("#Pro_content ul li").length-1) == i){
		    			$(this).attr("class","latest");
		    		}else{
		    			$(this).attr("class","latests");
		    		}
		    	});
	    	
	    }
	});
	
};

function selectOrades(ids){
	//读取维修订单流程
	$.ajax({
	    type: "POST",
	    url: "/myServe/selectTracks",
	    data: "MDID="+ids,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$("#Pro_contenter ul").html("");
	    	var str = "";
	    	//流程导航全部为默认状态
	    	$(".Pro_Ftitle ul li").each(function(){
	    		$(this).attr("class","");
	    	});
	    	var dates = new Array();
	    	$.each(result.maintenanceTracksList, function(index, items) {
	    		//判断数组是否存在状态
	    		var state = 0;
	    		//流程导航状态更改
	    		
	    		//循环维修数据
	    		if(dates == ""){
	    			dates.push(new Date(items.mtk_end_time).format("yyyy-MM-dd"));
	    			str+="<li><span class='date'>"+ new Date(items.mtk_end_time).format("yyyy-MM-dd") +"</span><span class='week'>"+ week(new Date(items.mtk_end_time).format("yyyy-MM-dd")) +"</span><span class='time'>"+ new Date(items.mtk_end_time).format("hh:mm:ss") +"</span><span class='text'>"+ items.mtk_spe_cir +"</span></li>";
	    		}else{
	    			for (var i = 0; i < dates.length; i++) {
		    			if(dates[i] == new Date(items.mtk_end_time).format("yyyy-MM-dd")){
			    			str+="<li><span class='date' style='visibility: hidden;'>"+ new Date(items.mtk_end_time).format("yyyy-MM-dd") +"</span><span class='week' style='visibility: hidden;'>"+ week(new Date(items.mtk_end_time).format("yyyy-MM-dd")) +"</span><span class='time'>"+ new Date(items.mtk_end_time).format("hh:mm:ss") +"</span><span class='text'>"+ items.mtk_spe_cir +"</span></li>";
			    			state = 1;
		    			}
					}
	    			if(state == 0){
		    			dates.push(items.mtk_end_time);
		    			str+="<li><span class='date'>"+ new Date(items.mtk_end_time).format("yyyy-MM-dd") +"</span><span class='week'>"+ week(new Date(items.mtk_end_time).format("yyyy-MM-dd")) +"</span><span class='time'>"+ new Date(items.mtk_end_time).format("hh:mm:ss") +"</span><span class='text'>"+ items.mtk_spe_cir +"</span></li>";
		    		}
	    		}
	    		
	    	});
	    	$("#Pro_contenter ul").html(str);
	    		//最后一个改变颜色
		    	$("#Pro_contenter ul li").each(function(i){
		    		if(($("#Pro_contenter ul li").length-1) == i){
		    			$(this).attr("class","latest");
		    		}else{
		    			$(this).attr("class","latests");
		    		}
		    	});
	    	
	    }
	});
	
};

/**
 * 判断时间属于周几
 * @param dateStr 时间
 */
function week(dateStr){
	var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
	var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/"))); 
	return weekDay[myDate.getDay()];
}

/**
 * 获取url中的参数
 * */
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return unescape(r[2]); return null; //返回参数值
}

/**
* 时间对象的格式化;
*/
Date.prototype.format = function(format){
 /*
  * eg:format="YYYY-MM-dd hh:mm:ss";
  */
 var o = {
  "M+" :  this.getMonth()+1,  //month
  "d+" :  this.getDate(),     //day
  "h+" :  this.getHours(),    //hour
      "m+" :  this.getMinutes(),  //minute
      "s+" :  this.getSeconds(), //second
      "q+" :  Math.floor((this.getMonth()+3)/3),  //quarter
      "S"  :  this.getMilliseconds() //millisecond
   }
   
   if(/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
   }
  
   for(var k in o) {
    if(new RegExp("("+ k +")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    }
   }
 return format;
}
