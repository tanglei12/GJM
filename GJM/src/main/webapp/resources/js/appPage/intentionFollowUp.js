$(function(){
	data();
})

function data(){
	$.ajax({
  	    type: "POST",
  	    url: "/intention/intentionState",
  	    data : {
  	    	phi_id: getQueryString("phi_id"),
  	    },
  	    dataType: "json",
  	    success: function(result) {
  	    	var obj = result.houseIntentionSate;
			$(".content ul li").eq(4).find("button").attr("onclick","addMessage(\""+obj.hi_code+"\")");
  	    	if(obj.phi_type == "房源录入"){
  	    		$(".content ul li").eq(0).find(".state").text("未跟进");
  	    		$(".content ul li").eq(0).find("button").attr("onclick","FollowUp(1)");
  	    		$(".content ul li").eq(1).find(".state").text("未实勘");
  	    		$(".content ul li").eq(2).find(".state").text("未定价");
  	    		$(".content ul li").eq(3).find(".state").text("未存房");
  	    	}else if(obj.phi_type == "房源跟进"){
  	    		$(".content ul li").eq(0).find(".state").text("未跟进");
  	    		$(".content ul li").eq(0).find("button").attr("onclick","FollowUp(1)");
  	    		$(".content ul li").eq(1).find(".state").text("未实勘");
  	    		$(".content ul li").eq(2).find(".state").text("未定价");
  	    		$(".content ul li").eq(3).find(".state").text("未存房");
  	    	}else if(obj.phi_type == "房源实勘"){
  	    		$(".content ul li").eq(0).find(".state").text("已跟进");
  	    		$(".content ul li").eq(0).find(".state").attr("class","state success");
  	    		$(".content ul li").eq(0).find("button").attr("onclick","FollowUp(1)");
  	    		$(".content ul li").eq(1).find(".state").text("未实勘");
  	    		$(".content ul li").eq(1).find("button").attr("onclick","FollowUp(2)");
  	    		$(".content ul li").eq(2).find(".state").text("未定价");
  	    		$(".content ul li").eq(3).find(".state").text("未存房");
  	    	}else if(obj.phi_type == "房源定价"){
  	    		$(".content ul li").eq(0).find(".state").text("已跟进");
  	    		$(".content ul li").eq(0).find(".state").attr("class","state success");
  	    		$(".content ul li").eq(0).find("button").attr("onclick","FollowUp(1)");
  	    		$(".content ul li").eq(1).find(".state").text("已实勘");
  	    		$(".content ul li").eq(1).find(".state").attr("class","state success");
  	    		$(".content ul li").eq(1).find("button").attr("onclick","FollowUp(2)");
  	    		$(".content ul li").eq(2).find(".state").text("未定价");
  	    		$(".content ul li").eq(2).find("button").attr("onclick","FollowUp(3)");
  	    		$(".content ul li").eq(3).find(".state").text("未存房");
  	    	}else if(obj.phi_type == "存房"){
  	    		$(".content ul li").eq(0).find(".state").text("已跟进");
  	    		$(".content ul li").eq(0).find(".state").attr("class","state success");
  	    		$(".content ul li").eq(0).find("button").attr("onclick","FollowUp(1)");
  	    		$(".content ul li").eq(1).find(".state").text("已实勘");
  	    		$(".content ul li").eq(1).find(".state").attr("class","state success");
  	    		$(".content ul li").eq(1).find("button").attr("onclick","FollowUp(2)");
  	    		$(".content ul li").eq(2).find(".state").text("已定价");
  	    		$(".content ul li").eq(2).find(".state").attr("class","state success");
  	    		$(".content ul li").eq(2).find("button").attr("onclick","FollowUp(3)");
  	    		$(".content ul li").eq(3).find(".state").text("未存房");
  	    		$(".content ul li").eq(3).find("button").attr("onclick","FollowUp(4)");
  	    	}else if(obj.phi_type == "完成"){
  	    		$(".content ul li").eq(0).find(".state").text("已跟进");
  	    		$(".content ul li").eq(0).find(".state").attr("class","state success");
  	    		$(".content ul li").eq(1).find(".state").text("已实勘");
  	    		$(".content ul li").eq(1).find(".state").attr("class","state success");
  	    		$(".content ul li").eq(2).find(".state").text("已定价");
  	    		$(".content ul li").eq(2).find(".state").attr("class","state success");
  	    		$(".content ul li").eq(3).find(".state").text("已存房");
  	    		$(".content ul li").eq(3).find(".state").attr("class","state success");
  	    		$(".content ul li").eq(5).show();
  	    		$(".content ul li").eq(5).find("button").attr("onclick","addMessage(\""+ obj.hi_code +"\")");
  	    		$(".content ul li").eq(4).hide();
  	    	}else if(obj.phi_type == "存房失败"){
  	    		$(".content ul li").eq(0).find(".state").text("已跟进");
  	    		$(".content ul li").eq(0).find(".state").attr("class","state success");
  	    		$(".content ul li").eq(0).find("button").attr("onclick","FollowUp(1)");
  	    		$(".content ul li").eq(1).find(".state").text("已实勘");
  	    		$(".content ul li").eq(1).find(".state").attr("class","state success");
  	    		$(".content ul li").eq(1).find("button").attr("onclick","FollowUp(2)");
  	    		$(".content ul li").eq(2).find(".state").text("已定价");
  	    		$(".content ul li").eq(2).find(".state").attr("class","state success");
  	    		$(".content ul li").eq(2).find("button").attr("onclick","FollowUp(3)");
  	    		$(".content ul li").eq(3).find(".state").text("存房失败");
  	    		$(".content ul li").eq(3).find(".state").attr("class","state error");
  	    		$(".content ul li").eq(3).find("button").attr("onclick","FollowUp(4)");
  	    	}
  	    }
	});
}

function where(result){
	var arry = eval(result);
    location.reload();
	addMessage(arry.hi_code);
}

// 意向跟进
function FollowUp(obj){
	window.location.href="/appIntent/intentionFollowUp"+ obj +"?phi_id="+getQueryString("phi_id");
}

function addMessage(hi_code){
    window.location.href="/appPage/houseSelect?hi_code="+ hi_code+"&operation=true&buttonBool=true&buttonName=修改&buttonUrl="+ http +"/appPage/houseEdit?hi_code="+hi_code;
}

function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 