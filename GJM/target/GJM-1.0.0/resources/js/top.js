//$(function(){
//	
//	//获取用户名
//	$.ajax({
//	    type: "POST",
//	    url: "userSession",
//	    data: {},
//	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
//	    dataType: "json",
//	    success: function(result) {
//	    	if(result == null){
//	    		window.parent.location.href="/login";
//	    	}else{
//	    		$(".user span").text(result.user);
//	    		//存储用户名
//	    		$("#topData").data("userName", result.user);
//	    	}	
//	    }
//	    });
//	
//	/*导航条*/
//	$(".dh ul li").mouseenter(function(){
//			$(this).find("ul").show();
//		});
//	
//	$(".dh ul li").mouseleave(function(){
//			$(this).find("ul").hide();
//		});
//	
//	
//	$(".dh .titles ul li").mouseenter(function(){
//		$(this).find("a").css("background-color","#ECF0F1");
//	});
//	$(".dh .titles ul li").mouseleave(function(){
//		$(this).find("a").css("background-color","#FFF");
//	});
//	
//	
//});
$(function(){
	$('.user').hover(function(){
		if($(".tishi").is(":hidden")){
			$(".dropdown-menu").hide();
			$(".tishi").show();
		}else{
			$(".tishi").hide();
		}
	  });
	
	$('#ewm_title').hover(function(){
		$("#ewm_img").show();
	},function(){
		$("#ewm_img").hide();
	});
	
	
	sendMessage();
	
});
$(window).resize(function(){
	$("#loading").height($(window).height());
});

/**
 * 申请离职
 */
function
leftTheCompany(){
	var html = "<div style='padding:10px;'>离职原因：<textarea type='text' id='reason' name='reason' ></textarea></div>";
	var submit = function (v, h, f) {
		if (f.yourname == '') {
	        $.jBox.tip("请输入您的姓名。", 'error', { focusId: "reason" }); // 关闭设置 yourname 为焦点
	        return false;
	
		}
		$.jBox.tip("申请中...", 'loading');
		
		$.ajax({
		    type: "POST",
		    url: "/user/closeCompany",
		    data: {
		    	text : f.reason
		    },
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(result) {
		    	if(result.message == "success"){
		    		$.jBox.tip("申请成功，等待主管分配工作！", 'success');
		    	}else if(result.message == "repeat"){
		    		$.jBox.tip("已经提交过申请", 'error');
		    	}else{
		    		$.jBox.tip("申请失败，请重新申请！", 'error');
		    	}
		    }
		});
		
		return true;
    };
	$.jBox(html,{title:"申请离职", submit: submit});
}

/**
 * 关闭消息
 */
function downClick(){
	//  TODO 暂时关闭 - 蒋庆涛 - 2017.09.25
	// if($(".updateMessage").is(":hidden")){
	// 	$(".updateMessage").show();
	// }else{
	// 	$(".updateMessage").hide();
	// }
}

/**
 * 执行消息提醒
 */
function sendMessage(){
	$.ajax({
	    type: "POST",
	    url: "/service/sendMessageContent",
	    data: {},
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async: false,
	    success: function(result) {
	    	if(result.data == 0){
	    		return;
	    	}
	    	var indexs = 0;
	    	var msg = [];
	    	$.each(result.userMessageContents, function(index, item) {
	    		//消息提醒
	    		if($.cookie("em_id") == item.em_id){
	    			msg.push('<div class="dropdown-line">');
	    		  	msg.push('<a href="javascript:;" onclick="href_mo(\''+item.umc_href+'\',\''+item.umc_name+'\',\'sendmessage\',\''+item.umc_id+'\',this);">');
	    		  	msg.push('<div class="content-font">'+ item.umc_content +'</div>');
	    		  	msg.push('</a></div>');
	    		  	indexs +=1;
	    		}
	    	});
	    	$(".badge").text(indexs);
	    	$('#msg_content').html(msg.join(''));
	    }
	});
}

function updatePassword(){
	$("#loading").height($(window).height());
	$("#loadings").show();
	$("input[name='oldPassword']").next("i").html("");
	$("input[name='oldPassword']").next("i").removeClass();
	$("input[name='ensurePassword']").next("i").html("");
	$("input[name='ensurePassword']").next("i").removeClass();
}

function closeDiv(){
	$("#loadings").css("display","none");
	$("input[name='ensurePassword']").val("");
	$("input[name='oldPassword']").val("");
	$("input[name='newPassword']").val("");
}

function selectPass(){
	$("input[name='oldPassword']").next("i").html("");
	$("input[name='oldPassword']").next("i").removeClass();
	var pass = $("input[name='oldPassword']").val();
	$.ajax({
	    type: "POST",
	    url: "/user/selectPass",
	    data: "oldPassword="+pass+"&em_id="+$("#em_id").html(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.result == "1"){
	    		$("input[name='oldPassword']").next("i").css("color",'#95D051');
	    		$("input[name='oldPassword']").next("i").css("font-size",'20px');
	    		$("input[name='oldPassword']").next("i").addClass("glyphicon glyphicon-ok");
	    		$("#updatePs").removeAttr("disabled");
	    	}else{
	    		$("input[name='oldPassword']").next("i").css("color",'red');
	    		$("input[name='oldPassword']").next("i").css("font-size",'12px');
	    		$("input[name='oldPassword']").next("i").html("原密码输入错误!");
	    		$("#updatePs").attr({"disabled":"disabled"});
	    	}
	    }
	});
}

function ensurePassword(){
	$("input[name='ensurePassword']").next("i").html("");
	$("input[name='ensurePassword']").next("i").removeClass();
	var newPassword = $("input[name='newPassword']").val();
	var ensurePassword = $("input[name='ensurePassword']").val();
	if(newPassword == ensurePassword && newPassword != ""){
		$("input[name='ensurePassword']").next("i").css("color",'#95D051');
		$("input[name='ensurePassword']").next("i").css("font-size",'20px');
		$("input[name='ensurePassword']").next("i").addClass("glyphicon glyphicon-ok");
		$("#updatePs").removeAttr("disabled");
	}else{
		$("input[name='ensurePassword']").next("i").css("color",'red');
		$("input[name='ensurePassword']").next("i").css("font-size",'12px');
		$("input[name='ensurePassword']").next("i").html("两次密码输入不一致!");
		$("#updatePs").attr({"disabled":"disabled"});
	}
}

function updatePs(){
	var newPassword = $("input[name='newPassword']").val();
	var ensurePassword = $("input[name='ensurePassword']").val();
	var pass = $("input[name='oldPassword']").val();
	if(newPassword == ensurePassword && newPassword != "" && pass != ""){
		$.ajax({
			type: "POST",
			url: "/user/updatePs",
			data: "newPassword="+newPassword+"&em_id="+$("#em_id").html(),
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			dataType: "json",
			success: function(result) {
				if(result.result == "1"){
					window.location.href = '/user/removeSession';
				}else{
					alert("修改失败");
				}
			}
		});
	}
}
