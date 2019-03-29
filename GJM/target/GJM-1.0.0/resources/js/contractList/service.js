// JavaScript Document

/**
 * 贴身服务
 * */

$(function(){
	/**
	 * 服务
	 * */
	$.ajax({
	    type: "POST",
	    url: "repairMessage",
	    data: {},
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$("#content").html("");
	    	var html = "";
	    	$.each(result.serviceMessageTable, function(index, item) {
	    		//传值加密Base64
				var name = Base64.encode(item.sm_name);
				var code = $.md5(name+codeSuffix);
	    		html = "<div class='content'>"+
	        	"<ul>"+
	                "<li class='service_img'><img src='"+ item.sm_image +"' /></li>"+
	            "</ul>"+
	            "<ul>"+
	                "<li class='service_title'><a href='/serviceSub?name="+ name +"&code="+ code +"'>"+ item.sm_name +"</a></li>"+
	                "<li class='service_content'>"+ item.sm_content +"</li>"+
	            "</ul>"+
	        "</div>";
	    		$("#content").append(html);
	    	});
	    	
	    }
	});
	
	/**
	 * 热点问题类型
	 * */
	$.ajax({
	    type: "POST",
	    url: "hostProblemType",
	    data: {},
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$(".problem_title").html("");
	    	$.each(result.serviceTypeTable, function(index, items) {
	    		if(index == 0){
	    			$(".problem_title").append("<ul class='problem_title_click' onclick='hostproblem(this)'><li>"+ items.st_name +"</li><i></i></ul>");
	    			hostproblemContent(items.st_name);
	    		}else{
	    			$(".problem_title").append("<ul onclick='hostproblem(this)'><li>"+ items.st_name +"</li><i></i></ul>");
	    		}
	    	});
	    }
	});
});

/**
 * 热点问题切换
 */
function hostproblem(id){
	$(".problem_title ul").attr("class","");
	$(id).attr("class","problem_title_click");
	hostproblemContent($(id).find("li").text());
}

/**
 * 热点问题内容
 * @param name
 */
function hostproblemContent(name){
	$.ajax({
	    type: "POST",
	    url: "hostProblem",
	    data: "name="+name,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$("#problem_content dl").html("");
	    	if(result != null){
	    		$.each(result.hotspotIssuesProblemTable, function(index, items) {
	    			//传值加密Base64
    				var name = Base64.encode(items.sip_name);
    				//有效验证M5加密
    				var code = $.md5(name+codeSuffix);
    				
		    		$("#problem_content dl").append("<dt><i></i><a href='/serviceProblem?name="+ name +"&code="+ code +"'>"+ items.sip_name +"</a></dt>");
		    	});
	    	}
	    }
	});
}
