//意向房源跟踪记录
function selectOrade(ids,em_id){
	if((ids!=null && ids!="") && (em_id!="" && em_id!=null )){
	$.ajax({
	    type: "POST",
	    url: "/intention/selectFollow",
	    data: "MDID="+ids+"&em_id="+em_id,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message=="success"){
	    		$("#Pro_content ul").html("");
		    	var str = "";
		    	//流程导航全部为默认状态
		    	$(".Pro_Ftitle ul li").each(function(){
		    		$(this).attr("class","");
		    	});
		    	var dates = new Array();
		    	$.each(result.houseFollows, function(index, items) {
		    		//判断数组是否存在状态
		    		var state = 0;
		    		//循环维修数据
		    		if(dates == ""){
		    			dates.push(new Date(items.ghf_date).format("yyyy-MM-dd"));
		    			str+="<li><span class='date'>"+ new Date(items.ghf_date).format("yyyy-MM-dd") +"</span><span class='week'>"+ week(new Date(items.ghf_date).format("yyyy-MM-dd")) +"</span><span class='time'>"+ new Date(items.ghf_date).format("hh:mm:ss") +"</span><span class='state'>"+ items.ghf_state +"</span><span class='it'>"+ items.ghf_item +"</span><span class='text'>"+ items.em_name +"</span></li>";
		    		}else{
		    			for (var i = 0; i < dates.length; i++) {
			    			if(dates[i] == new Date(items.ghf_date).format("yyyy-MM-dd")){
				    			str+="<li><span class='date' style='visibility: hidden;'>"+ new Date(items.ghf_date).format("yyyy-MM-dd") +"</span><span class='week' style='visibility: hidden;'>"+ week(new Date(items.ghf_date).format("yyyy-MM-dd")) +"</span><span class='time'>"+ new Date(items.ghf_date).format("hh:mm:ss") +"</span><span class='state'>"+ items.ghf_state +"</span><span class='it'>"+ items.ghf_item +"</span><span class='text'>"+ items.em_name +"</span></li>";
				    			state = 1;
			    			}
						}
		    			if(state == 0){
			    			dates.push(new Date(items.ghf_date).format("yyyy-MM-dd"));
			    			str+="<li><span class='date'>"+ new Date(items.ghf_date).format("yyyy-MM-dd") +"</span><span class='week'>"+ week(new Date(items.ghf_date).format("yyyy-MM-dd")) +"</span><span class='time'>"+ new Date(items.ghf_date).format("hh:mm:ss") +"</span><span class='state'>"+ items.ghf_state +"</span><span class='it'>"+ items.ghf_item +"</span><span class='text'>"+ items.em_name +"</span></li>";
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
	    }
	});
	}
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