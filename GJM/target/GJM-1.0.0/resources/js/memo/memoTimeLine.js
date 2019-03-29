$(function(){
	
	var date = new Date();
	var dates = returnTime(date);
	var year = dates.split("-")[0];
	var month = dates.split("-")[1];
	var day = dates.split("-")[2].split(" ")[0];
	var hh = dates.split(" ")[1].split(":")[0]+":"+dates.split(" ")[1].split(":")[1];
	var weekday=new Array(7);
	weekday[0]="星期天"
	weekday[1]="星期一"
	weekday[2]="星期二"
	weekday[3]="星期三"
	weekday[4]="星期四"
	weekday[5]="星期五"
	weekday[6]="星期六"
	var week = weekday[date.getDay()];
	$(".shadow .date").text(year+"年"+month+"月"+day+"日 "+week+" "+hh);
	
	//点击事件
	$(".work .content").each(function(){
		$(this).click(function(){
			$(this).parent().next().show();
		});
	});
	$(".ckjd").each(function(){
		$(this).click(function(){
			$(this).parent().next().show();
		});
	});
	$(".bw").each(function(){
		$(this).click(function(){
			$(this).parent().find("div[class='beiwang']").show();
		});
	});
	$(".rightDiv a").each(function(){
		$(this).click(function(){
			var type = $(this).text();
			$(".rightDiv a").attr("class","aButton");
			if(type=='日'){
				$(this).attr("class","aButton click");
				$(".timeCenter").show();
				$("#monthMemo").hide();
			}else{
				$(this).attr("class","aButton click");
				$("#monthMemo").show();
				$(".timeCenter").hide();
			};
		});
	});
	$(".header-right .text .addBotton").click(function(){
		$(".makeDiv .addPeople").show();
	});
	$(".header-right .text .delBotton").click(function(){
		$(".makeDiv .delPeople").show();
	});
	$(".makeDiv .search .close").each(function(){
		$(this).click(function(){
			$(this).parent().parent().hide();
		});
	});
	$(".header-right .handle .cancel ").click(function(){
		$(".header-right .text").hide();
		//恢复初始化
		$(".header-right .newThings").css("color","#a9a9a9");
		$(".header-right .newThings").text("请输入...");
		$(".handle .cancel").hide();
	});
	//鼠标移走，光标消失
	$(".progress").each(function(){
		$(this).mouseenter(function(){
			$(this).show();
		}).mouseleave(function(){
			$(this).hide();
		});
	});
	$(".beiwang").each(function(){
		$(this).mouseenter(function(){
			$(this).show();
		}).mouseleave(function(){
			$(this).hide();
		});
	});
	//点击空白，备忘详情框消失
	$(document).bind("click",function(e){
		var target  = $(e.target);
		if(target.closest(".work-view,.work .content").length == 0){/*.closest()沿 DOM 树向上遍历，直到找到已应用选择器的一个匹配为止，返回包含零个或一个元素的 jQuery 对象。*/
		$(".work-view").hide();
		};
		e.stopPropagation();
		});
	//获取光标
	$(".newThings").focus(function(){
		//初始化textarea
		$(this).text("");
		$(this).css("color","#666666");
		
		$(".header-right .text").show();
		$(".handle .cancel").show();
	});
	
	timeData();
	
	var indext = 0;
//	$("#contentTxt").scroll(function(){
//		if(indext < $("#contentTxt").scrollTop()){
//			indext = $("#contentTxt").scrollTop();
//			if($("#contentTxt ul").height()-$("#contentTxt").height()-$("#contentTxt").scrollTop() < 50){
//				console.log("最底部了");
//			}
//		}
//	});
});

/**
 * 根据时间读取数据进行分页
 */
function timeData(){
	var dates = returnDate(new Date());
	var year = dates.split("-")[0];
	var month = dates.split("-")[1];
	var day = dates.split("-")[2];
	pageNo = 1;
	$.ajax({
	    type: "POST",
	    url: "/memo/dateListPage1",
	    data: "year="+year+"&month="+month+"&day="+day+"&pageNo="+pageNo,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$.each(result.taskMessageEM, function(index, data) {
	    		var startDate = returnTime(data.tm_startTime);
    			startDate = startDate.substring(0,startDate.length-3);
    			startDate = startDate.split(" ")[0]+" "+data.tm_startWeek+" "+startDate.split(" ")[1];
    			var endDate = returnTime(data.tm_endTime);
    			endDate = endDate.substring(0,endDate.length-3);
    			endDate = endDate.split(" ")[0]+" "+data.tm_endWeek+" "+endDate.split(" ")[1];
    			var title = data.tm_text;
    			var title1 = data.tm_text;
    			
    			/*$(".font-text").text(title);
    			var maxWidth = $(".font-text").width();
    	    	var textLength = $(".font-text").text().length;
    	    	var tdWidth = $("#timeLine").width()*60/100*45/100-60;
    			
    			if(maxWidth > tdWidth){
    				var fontLen = Math.ceil((maxWidth - tdWidth) / (maxWidth / textLength));
    				title1 = title.substring(0,title.length-(fontLen+4))+"...";
    			}*/
    			var messageState = data.tm_state;
    			// 时间
    			var hhss = startDate.split(" ")[2];
    			// 右上角角标
    			var images = "";
    			var success = "content-right";
    			if(data.tm_result == 1){
    				images = "<img src='/resources/image/icon-success.png' />";
    				success = "content-left";
    			}
    			if(messageState == 0){
    				messageState = "不重要";
//    				images = "<img src='/resources/image/icon-jj.png' />";
    			}else if(messageState == 1){
    				messageState = "重要";
    			}
    			var types = data.tm_type;
    			if(types == 0){
    				types = "不紧急";
    			}else if(types == 1){
    				types = "紧急";
    			}
    			var tm_id;
    			tm_id = data.tm_pid;
    			if(tm_id == 0){
    				tm_id = data.tm_id;
    			}
    			var text = data.tm_beizhu;
    			if(text == null){
    				text = "";
    			}
    			var userPerson = "";
    			if(data.userTask != null){
    				userPerson = data.userTask;
    			}
    			var userPerson = "";
    			if(data.userTask != null){
    				userPerson = data.userTask;
    			}
    			var htmlUser = "";
    			var userLeft = "";
    			if(userPerson != ""){
    				var spilt = userPerson.split(",");
    				for(var i = 0; i < spilt.length; i++){
    					var spilt1 = spilt[i].split("-");
    					htmlUser +='<li data-id="'+ spilt1[0] +'">'+ spilt1[1] +'<i class="fa fa-minus-square" onclick="removeUser(this)"></i></li>';
    					if(spilt1[2] == "完成"){
    						userLeft +="<p><span data-id='"+ spilt1[0] +"'>"+ spilt1[1] +"<i class='bgc-red'>已完成</i></span></p>";
    					}else{
    						userLeft +="<p><span data-id='"+ spilt1[0] +"'>"+ spilt1[1] +"<i class='bgc-yellow'>未完成</i></span></p>";
    					}
    				}
    			}
    			var http = "";
    			if(data.tm_http != null && data.tm_http != ""){
    				http = 'onclick="hrefClick(this)"'+'data-type="'+ data.tm_http +'"';
    			}
    			var boolTmType = "";
    			if(data.tm_tmType == 0){
    				boolTmType = 'onclick="editMemorand(this)"';
    			}
    			var messageState = data.tm_state;
    			// 右上角角标
    			var images = "";
    			if(messageState == 0){
    				messageState = "不重要";
//    				images = "<img src='/resources/image/icon-jj.png' />";
    			}else if(messageState == 1){
    				messageState = "重要";
    			}
    			var messageType = data.tm_type;
    			if(messageType == 0){
    				messageType = "不紧急";
    			}else if(messageType == 1){
    				messageType = "紧急";
    			}
    			var stateHtml = "";
    			if(messageState == "重要"){
    				boolImage2 = true;
    				fontColor = " dataTimeRed";
    				stateHtml = '<div class="checkbox checkbox-success" onclick="selectClick(this)"><input name="state" type="checkbox" data-value="" checked="checked"><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label><span class="font-text-ckeck">重要</span></div>'+
    						'<div class="checkbox checkbox-success" onclick="selectClick(this)"><input name="state" type="checkbox" data-value=""><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label><span class="font-text-ckeck">不重要</span></div>';
    			}else if(messageState == "不重要"){
    				boolImage2 = false;
    				stateHtml = '<div class="checkbox checkbox-success" onclick="selectClick(this)"><input name="state" type="checkbox" data-value=""><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label><span class="font-text-ckeck">重要</span></div>'+
    				'<div class="checkbox checkbox-success" onclick="selectClick(this)"><input name="state" type="checkbox" data-value="" checked="checked"><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label><span class="font-text-ckeck">不重要</span></div>';
    			}
    			var typeHtml = "";
    			if(messageType == "紧急"){
    				boolImage1 = true;
    				typeHtml = '<div class="checkbox checkbox-success" onclick="selectClick(this)"><input name="type" type="checkbox" data-value="" checked="checked"><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label><span class="font-text-ckeck">紧急</span></div>'+
    				'<div class="checkbox checkbox-success" onclick="selectClick(this)"><input name="type" type="checkbox" data-value=""><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label><span class="font-text-ckeck">不紧急</span></div>';
    			}else if(messageType == "不紧急"){
    				boolImage1 = false;
    				typeHtml = '<div class="checkbox checkbox-success" onclick="selectClick(this)"><input name="type" type="checkbox" data-value=""><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label><span class="font-text-ckeck">紧急</span></div>'+
    				'<div class="checkbox checkbox-success" onclick="selectClick(this)"><input name="type" type="checkbox" data-value="" checked="checked"><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label><span class="font-text-ckeck">不紧急</span></div>';
    			}
    			var iCircle = "";
    			var iWork = "";
    			if(boolImage1 == true && boolImage2 == true){
    				images = '<img src="/resources/image/icon-A.png">';
    				iCircle = ' circle-a';
    				iWork = 'work-a';
    				fontColor = " dataTimeRed";
    			}else if(boolImage1 == true && boolImage2 == false){
    				images = '<img src="/resources/image/icon-B.png">';
    				iCircle = ' circle-b';
    				iWork = 'work-b';
    			}else if(boolImage1 == false && boolImage2 == true){
    				images = '<img src="/resources/image/icon-C.png">';
    				iCircle = ' circle-c';
    				iWork = 'work-c';
    			}else if(boolImage1 == false && boolImage2 == false){
    				images = '<img src="/resources/image/icon-D.png">';
    				iCircle = ' circle-d';
    				iWork = 'work-d';
    			}
	    	var html='<li>'+
				'<div class="flag">'+
					'<i class="circle'+ iCircle +'"></i>'+
				'</div>'+
				'<div class="'+ success +'">'+
					'<p class="time">'+
						startDate+
					'</p>'+
					'<div class="work '+ iWork +' shadow">'+
						 '<span class="content">'+ title1 +'</span>'+
						 '<span class="tag">'+ images +'</span>'+
					'</div>'+
					'<div class="work-view">'+
						'<div class="do">'+
							'<p>'+
								'<span style="display: inline-block; width: 50px"></span>'+ title +''+
							'</p>'+
						'</div>'+
						'<div class="line">'+
							'<hr />'+
						'</div>'+
						'<div>'+
							'<p>'+ data.mainUser +'</p>'+
							'<p>'+ endDate +'</p>'+
						'</div>'+
						'<div class="handle">'+
							'<span class="ckjd">查看进度</span> <span class="bw">备忘</span> <span>编辑</span> <span>完成</span> <span>删除</span>'+
							'<div class="beiwang">'+
								'<div class="textEdit">'+
									'<textarea>10:00点前做好当天的工作安排下午15:00在会议室开会。</textarea>'+
								'</div>'+
								'<div>'+
									'<span class="aBotton">发布</span>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="progress">'+
							'<div class="line">'+
								'<hr />'+
							'</div>'+
								userLeft+
						'</div>'+
						'<div class="tag">'+
							images+
						'</div>'+
					'</div>'+
				'</div>'+
			'</li>';
	    	
	    	$("#contentTxt ul").append(html);
	    	});
	    }
	});
}