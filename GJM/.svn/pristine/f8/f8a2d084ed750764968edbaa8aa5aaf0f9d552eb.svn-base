var datas = null;
var addData = null;

$(function(){
	
	$("body").append("<div class='font-text' style='display: none; font-size:13px;'></div>");
	
	if(getQueryString("yearMonth") != null){
		var str = getQueryString("yearMonth").split("-");
		$(".yearMonth input").val(str[0]+"年"+str[1]+"月");
		if($("#monthMemo tbody tr").length > 5){
			$(".center-div").height(834+(153*(parseInt($("#monthMemo tbody tr").length)-5)));
		}
	}else{
		var dates = returnDate(new Date());
		var newYear = dates.split("-")[0];
		var newMonth = dates.split("-")[1];
		$(".yearMonth input").val(newYear+"年"+newMonth+"月");
		if($("#monthMemo tbody tr").length > 5){
			$(".center-div").height(834+(153*(parseInt($("#monthMemo tbody tr").length)-5)));
		}
	}
	
	data();
	
	$(".yearMonth input").on("focus", function(){
		WdatePicker({
//			maxDate : _startDate,
			dateFmt : 'yyyy年MM月',
			onpicked: function(dp){
				data();
			}
		});
	});
	
});

$(window).resize(function () {
	$("table tbody td .dateThingMore").width($("table tbody td").width()-8);
	$("table tbody td").height(($(".center-div").height()-90-($("table tbody tr").length))/$("table tbody tr").length);
	$("table tbody tr").each(function(index){
		$(this).find("td").each(function(inde){
			$(this).find(".tdContent-data ul").each(function(i){
				var title = $(this).find(".momen_dis .new-event-content-title h3").text();
				$(".font-text").text(title);
				var maxWidth = $(".font-text").width();
				var textLength = $(".font-text").text().length;
				var tdWidth = $("table tbody td").width()-73;
				if(maxWidth >= tdWidth){
					var fontLen = Math.ceil((maxWidth - tdWidth) / (maxWidth / textLength))+2;
					title = title.substring(0,title.length-fontLen)+"...";
					$(this).find(".titleFont").text(title);
				}else{
					$(this).find(".titleFont").text(title.replace("...",""));
				}
			});
		});
		
	});
});

/**
 * 时间左右旋转
 * @param type
 */
function dateLeft(type){
	var year = parseInt($(".yearMonth input").val().substring(0,$(".yearMonth input").val().indexOf("年")));
	var month = parseInt($(".yearMonth input").val().substring($(".yearMonth input").val().indexOf("年")+1,$(".yearMonth input").val().indexOf("月")));
	if(type == "left"){
		if(month == 1){
			year = year-1;
			month = 12;
		}else{
			month = month-1;
		}
	}else if(type == "right"){
		if(month == 12){
			year = year+1;
			month = 1;
		}else{
			month = month+1;
		}
	}
	
	if(month < 10){
		month = "0"+month;
	}
	$(".yearMonth input").val(year+"年"+month+"月");
	data();
}

/**
 * 新建事件
 * 
 * @param ids
 * @param day 天数
 * @param week 星期几
 */
function addNew(ids,day,week){
	$(".new-event-div").hide();
	$(".new-event-div-right").hide();
	$(".add-event").hide();
	$(ids).parent().show();
	$(".momen_dis a").css("background-color","");
	$(ids).parent().find(".new-event-div").show();
	$(ids).parent().find(".new-event-div-right").show();
	
	var year = $(".yearMonth input").val().substring(0,$(".yearMonth input").val().indexOf("年"));
	var month = $(".yearMonth input").val().substring($(".yearMonth input").val().indexOf("年")+1,$(".yearMonth input").val().indexOf("月"));
	// 获取日期的类型
	var type = $(ids).parent().parent().parent().parent().prev().find("em").attr("data-type");
	if(type == "1"){
		month = parseInt(month);
		if(month == 1){
			year = parseInt(year)-1;
			month = 12;
		}else{
			month = month-1;
		}
		if(month < 10){
			month = "0"+month;
		}
	}else if(type == "3"){
		month = parseInt(month);
		if(month == 12){
			year = parseInt(year)+1;
			month = 1;
		}else{
			month = month+1;
		}
		if(month < 10){
			month = "0"+month;
		}
	}
	if(parseInt(day) < 10){
		day = "0"+day;
	}
	$(ids).parent().parent().find(".startDate").val(year+"-"+month+"-"+day+" "+week+" "+"09:40");
	$(ids).parent().parent().find(".endDate").val(year+"-"+month+"-"+day+" "+week+" "+"10:40");
}

/**
 * 关闭新建事件
 * 
 * @param ids
 */
function closeEvent(ids){
	$(ids).find("input[name='type']").each(function(i){
		if(i == 0){
			$(this).attr("checked", true);
		}
	});
	$(ids).find("input[name='state']").each(function(i){
		if(i == 0){
			$(this).attr("checked", true);
		}
	});
	var $addNew = $(ids).parent().parent();
	$addNew.parent().hide();
}

/**
 * 查看重要事件
 * 
 * @param ids
 */
function fontClick(ids){
	if($(ids).parent().find(".new-event-div").length > 0){
		if($(ids).parent().find(".new-event-div").is(":hidden")){
			$(".new-event-div").hide();
			$(".new-event-div-right").hide();
			$(".momen_dis a").css("background-color","");
			$(ids).css("background-color","#e0f2ff");
			$(ids).parent().find(".new-event-div").show();
		}else{
			$(ids).css("background-color","");
			$(ids).parent().find(".new-event-div").hide();
			$(ids).parent().find(".beizhuDiv").hide();
		}
	}
	if($(ids).parent().find(".new-event-div-right").length > 0){
		if($(ids).parent().find(".new-event-div-right").is(":hidden")){
			$(".new-event-div").hide();
			$(".new-event-div-right").hide();
			$(".momen_dis a").css("background-color","");
			$(ids).css("background-color","#e0f2ff");
			$(ids).parent().find(".new-event-div-right").show();
		}else{
			$(ids).css("background-color","");
			$(ids).parent().find(".new-event-div-right").hide();
			$(ids).parent().find(".beizhuDiv").hide();
		}
	}
}

/**
 * 获取数据
 */
function data(){
	$(".center-div").css("padding","1%");
	datas = $.Deferred();
	var date = $(".yearMonth input").val();
	var year = date.substring(0,date.indexOf("年"));
	var month = date.substring(date.indexOf("年")+1,date.indexOf("月"));
	var dates = returnDate(new Date());
	var newYear = dates.split("-")[0];
	var newMonth = dates.split("-")[1];
	var newDay = dates.split("-")[2];
	var arr = new Array();
	$.ajax({
	    type: "POST",
	    url: "/memo/dateList",
	    data: "year="+year+"&month="+month,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$("table tbody").html("");
	    	var html = "";
	    	var addClassDiv = "";
	    	var dataList = result.calendar;
	    	var int = 1;
	    	var weekDay = 0;
	    	for(var i = 0; i < dataList.length; i++){
	    	if(i % 7 == 0){
	    		html+='<tr>';
	    	}
	    	if(i == (5-1) || i == 5 || i == (5+1) || i == (12-1) || i == 12 || i == (12+1) || i == (19-1) || i == 19 || i == (19+1) || i == (26-1) || i == 26 || i == (26+1) || i == (33-1) || i == 33 || i == (33+1) || i == (40-1) || i == 40 || i == (40+1)){
	    		addClassDiv = "new-event-div-right";
	    	}else{
	    		addClassDiv = "new-event-div";
	    	}
	    	var split = dataList[i].split("-");
	    	var holiday = "";
	    	if(split[2] == 2){
	    		holiday = '<span class="vacation rest">放假</span>';
	    	}
	    	var typeClass= "";
	    	var dayHtml = split[0];
	    	if(year == newYear && month == newMonth){
	    		if(removeHTMLTag(split[0]) == parseInt(newDay) && split[3] == 2){
	    			typeClass = " add-event-div-new";
	    			dayHtml = "<font style='color:#FFF;'>"+removeHTMLTag(dayHtml)+"</font>"
	    		}
	    	}
	    	html+='<td>                                                                                                                                                                                                                                          '+
				'	<div class="add-event-div '+ typeClass +'">                                                                                                                                                                                                                  '+
				'		<div class="divContent">                                                                                                                                                                                                                 '+
				'			<div class="tdTitle"><em data-type="'+ split[3] +'">'+ dayHtml +'</em><span class="oldCalendar">'+ split[1] +'</span>'+ holiday +'</div>                                                                                                                   '+
				'			<div class="tdContent">                                                                                                                                                                                                              '+
				'             	<div class="tdContent-data">'+
				'             	</div>'+
				'				<ul class="contentTitle">                                                                                                                                                                                                                             '+
				'					<li>                                                                                                                                                                                                                         '+
				'						<div class="add-event">                                                                                                                                                                                                  '+
				'							<i class="fa fa-plus-square"></i>                                                                                                                                                                                  '+
				'							<span class="add-text" onclick="addNew(this,'+ removeHTMLTag(dayHtml) +',\''+ weeks(weekDay) +'\')">新建事件</span>                                                                                                                                                        '+
				'							<div class="'+ addClassDiv +'" style="display: none;">                                                                                                                                                                   '+
				'								<span class="arrow"><span class="inner-arrow"></span></span>                                                                                                                                                     '+
				'								<div class="new-event-content">                                                                                                                                                                                  '+
				'									<div class="new-event-content-title"><h3>新建事件</h3><span class="close" onclick="closeEvent(this)">×</span></div>                                                                                          '+
				'									<div class="new-event-content-model">                                                                                                                                                                        '+
				'										<dl style="height: auto; overflow: hidden;">                                                                                                                                                                                                     '+
				'											<dt>事件：</dt>                                                                                                                                                                                      '+
				'											<dd style="height: auto; overflow: hidden;"><textarea placeholder="创建一个事件内容" class="titleText" maxlength="150" onblur="onblurTitle(this)"></textarea></dd>                                                                                                                                        '+
				'										</dl>                                                                                                                                                                                                    '+
				'										<dl>                                                                                                                                                                                                     '+
				'											<dt>紧急：</dt>                                                                                                                                                                                      '+
				'											<dd>                                                                                                                                                                                                 '+
				'												<div class="checkbox checkbox-success" onclick="selectClick(this)"><input name="type" type="checkbox" data-value="" checked="checked"><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label><span class="font-text-ckeck">紧急</span></div>'+
				'												<div class="checkbox checkbox-success" onclick="selectClick(this)"><input name="type" type="checkbox" data-value=""><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label><span class="font-text-ckeck">不紧急</span></div>'+
				'											</dd>                                                                                                                                                                                                '+
				'										</dl>                                                                                                                                                                                                    '+
				'										<dl>                                                                                                                                                                                                     '+
				'											<dt>重要：</dt>                                                                                                                                                                                      '+
				'											<dd>                                                                                                                                                                                                 '+
				'												<div class="checkbox checkbox-success" onclick="selectClick(this)"><input name="state" type="checkbox" data-value=""><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label><span class="font-text-ckeck">重要</span></div>'+
				'												<div class="checkbox checkbox-success" onclick="selectClick(this)"><input name="state" type="checkbox" data-value="" checked="checked"><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label><span class="font-text-ckeck">不重要</span></div>'+
				'											</dd>                                                                                                                                                                                                '+
				'										</dl>                                                                                                                                                                                                    '+
				'										<dl>                                                                                                                                                                                                     '+
				'											<dt>开始：</dt>                                                                                                                                                                                      '+
				'											<dd><input type="text" class="startDate" value="" readonly="readonly" /></dd>                                                                                                                           '+
				'										</dl>                                                                                                                                                                                                    '+
				'										<dl>                                                                                                                                                                                                     '+
				'											<dt>结束：</dt>                                                                                                                                                                                      '+
				'											<dd><input type="text" class="endDate" value="" readonly="readonly" /></dd>                                                                                                                           '+
				'										</dl>                                                                                                                                                                                                    '+
				'										<dl style="height: auto; overflow: hidden; position: relative;">                                                                                                                                                                                                     '+
				'											<dt>安排人：</dt>                                                                                                                                                                                      '+
				'											<dd>                                                                                                                           '+
				'												<i class="fa fa-plus-square" onclick="selectPersonDiv(this)"></i>                                                                                                                           '+
				'												<div class="user-table">                                                                                                                           '+
				'												<ul>                                                                                                                           '+
				'												</ul>                                                                                                                           '+
				'												</div>                                                                                                                           '+
				'											</dd>                                                                                                                           '+
				'										</dl>                                                                                                                                                                                                    '+
				'									</div>                                                                                                                                                                                                       '+
				'									<div class="new-event-footer">                                                                                                                                                                               '+
				'										<div class="more-font">更多选项</div>                                                                                                                                                                    '+
				'										<div class="btn-cencel">取消</div>                                                                                                                                                                       '+
				'										<div class="btn-confirm" onclick="submit(this)">提交</div>                                                                                                                                                                      '+
				'									</div>                                                                                                                                                                                                       '+
				'								</div>                                                                                                                                                                                                           '+
				'								<div class="user-person">                                                                                                                                                                                                               '+
				'									<div style="text-align: center;"><input type="text" class="user-input" placeholder="内部人员/电话" onkeyup="inputUser(this)"  /></div>                                                                                                                                                                                                               '+
				'									<div class="user-list">                                                                                                                                                                                                               '+
				'									<ul>                                                                                                                                                                                                               '+
				'									</ul>                                                                                                                                                                                                               '+
				'									</div>                                                                                                                                                                                                               '+
				'								</div>                                                                                                                                                                                                               '+
				'							</div>                                                                                                                                                                                                               '+
				'						</div>                                                                                                                                                                                                                   '+
				'					</li>                                                                                                                                                                                                                        '+
				'				</ul>                                                                                                                                                                                                                            '+
				'			</div>                                                                                                                                                                                                                               '+
				'		</div>                                                                                                                                                                                                                                   '+
				'		<div class="">                                                                                                                                                                                                                           '+
				'			                                                                                                                                                                                                                                     '+
				'		</div>                                                                                                                                                                                                                                   '+
				'	</div>                                                                                                                                                                                                                                       '+
				'</td>';
	    	
		    	if(weekDay % 6 == 0 && weekDay != 0){
		    		weekDay = 0;
		    	}else{
		    		weekDay+=1;
		    	}
	    	}
    		
    		var str = "";
    		$.each(result.taskMessageEM, function(index, data) {
    			var startDate = returnTime(data.tm_startTime);
    			startDate = startDate.substring(0,startDate.length-3);
    			startDate = startDate.split(" ")[0]+" "+data.tm_startWeek+" "+startDate.split(" ")[1];
    			var endDate = returnTime(data.tm_endTime);
    			endDate = endDate.substring(0,endDate.length-3);
    			endDate = endDate.split(" ")[0]+" "+data.tm_endWeek+" "+endDate.split(" ")[1];
    			var title = data.tm_text;
    			var messageState = data.tm_state;
    			// 右上角角标
    			var images = "";
    			if(data.tm_result == 1){
    				images = "<img src='/resources/image/icon-success.png' />";
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
    			str = title + "·" + startDate + "·" + endDate + "·" + messageState + "·" + tm_id + "·" +data.tm_result+ "·" +types+ "·"+text+ "·"+images+ "·"+ userPerson +"·"+data.mainUser +"·"+data.tm_tmType+"·"+data.tm_http+"·"+data.size;
    			arr.push(str);
    		});
    		
    		$("table tbody").html(html);
    		datas.resolve();
	    }
	});
	
	$.when(datas).done(function () {
		for(var i = 0; i < arr.length; i++){
			var str = arr[i].split("·");
			messageData(str[0],str[1],str[2],str[3],str[4],str[5],str[6],str[7],str[8],str[9],str[10],str[11],str[12],str[13]);
		}
		
		$(".startDate").on("focus", function(){
			WdatePicker({
				dateFmt:'yyyy-MM-dd DD HH:mm',
//				maxDate : _startDate,
				onpicked: function(dp){
					$(this).parent().parent().next().find(".endDate").val($(this).val());
				}
			});
		});
		$(".endDate").on("focus", function(){
			WdatePicker({
				dateFmt:'yyyy-MM-dd DD HH:mm',
//				maxDate : _startDate,
				onpicked: function(dp){
				}
			});
		});
		
		$("table tbody td").height(($(".center-div").height()-90-($("table tbody tr").length))/$("table tbody tr").length);
		$(".add-event-div").hover(function(){
			$(this).find(".tdContent .tdContent-data").next().find(".add-event").show();
		},function(){
			if(!$(this).find(".tdContent .tdContent-data").next().find(".new-event-div").is(":hidden") && !$(this).find(".tdContent .tdContent-data").next().find(".new-event-div-right").is(":hidden")){
				
			}else{
				$(this).find(".tdContent .tdContent-data").next().find(".add-event").hide();
			}
		});
	});
}

/**
 * 删除安排人
 * 
 * @param ids
 */
function removeUser(ids){
	$(ids).parent().remove();
}

/**
 * 选择安排的人
 * 
 * @param ids
 */
function selectUsers(ids){
	var bools = true;
	$(ids).parent().parent().parent().prev().find(".user-table ul li").each(function(i){
		if($(ids).attr("data-id") == $(this).attr("data-id")){
			bools = false;
			return false;;
		}
	});
	if(bools){
		$(ids).parent().parent().parent().prev().find(".user-table ul").append('<li data-id="'+ $(ids).attr("data-id") +'">'+ $(ids).attr("data-name") +'<i class="fa fa-minus-square" onclick="removeUser(this)"></i></li> ');
	}
}

/**
 * 添加人员层显示
 * 
 * @param ids
 */
function selectPersonDiv(ids){
	var $this = $(ids).parent().parent().parent().parent().parent();
	var $thisPrev = $(ids).parent().parent().parent().parent().next();
	if($thisPrev.is(":hidden")){
		if($this.attr("class") == "new-event-div-right"){
			$thisPrev.find(".user-input").val("");
			$this.attr("style","left:-782px;");
			$this.find(".arrow").attr("style","left:760px;");
			$thisPrev.show();
			userData($thisPrev.find(".user-input").val().trim(),$thisPrev);
		}else{
			$thisPrev.find(".user-input").val("");
			$this.attr("style","right:-763px;");
			$thisPrev.show();
			userData($thisPrev.find(".user-input").val().trim(),$thisPrev);
		}
	}else{
		if($this.attr("class") == "new-event-div-right"){
			$this.attr("style","left:-412px;");
			$this.find(".arrow").attr("style","left:390px;");
		}else{
			$this.attr("style","right: -393px;");
		}
		$thisPrev.hide();
	}
}

/**
 * 文本框输入变化查询人员
 * 
 * @param ids
 */
function inputUser(ids){
	var $thisPrev = $(ids).parent().parent();
	userData($thisPrev.find(".user-input").val().trim(),$thisPrev);
}

/**
 * 查询用户
 * 
 * @param where
 */
function userData(where,ids){
	$.ajax({
	    type: "POST",
	    url: "/memo/userPerson",
	    data: "em_name="+where+"&em_phone="+where,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$(ids).find(".user-list ul").html("");
	    	$.each(result.employee, function(index, data) {
	    		$(ids).find(".user-list ul").append('<li data-id="'+ data.em_id +'" data-name="'+ data.em_name +'" onclick="selectUsers(this)">'+ data.em_name +'('+ data.ucc_name +')</li>');
	    	});
	    }
	});
}

/**
 * 读取事件数据
 * 
 * @param title
 * @param startDate 比如 2016-09-07 星期三 09:40
 * @param endDate 比如 2016-09-07 星期三 09:40
 * @param messageState 事件紧急程度
 * @param tm_id 事程编码
 * @param tm_result 状态
 * @param types 紧急
 * @param text 备注
 * @param images 状态图片
 * @param userPerson 完成任务的人
 * @param tm_tmType 0手动 1系统
 * @param tm_http 调用地址
 */
function messageData(title,startDate,endDate,messageState,tm_id,tm_result,types,text,images,userPerson,mainUser,tm_tmType,tm_http,size){
	//事件
	var title1 = title;
	var title = title;
	//开始时间
	var startDate = startDate;
	//结束时间
	var endDate = endDate;
	// 时间
	var hhss = startDate.split(" ")[2];
	// 年月日
	var yMdStart = startDate.split(" ")[0];
	// 年月日
	var yMdEnd = endDate.split(" ")[0];
	// 获取当前开始时间年月日
	var dateMonth1 = $(".yearMonth input").val().substring($(".yearMonth input").val().indexOf("年")+1,$(".yearMonth input").val().indexOf("月"));
	$(".font-text").text(title);
	var maxWidth = $(".font-text").width();
	var textLength = $(".font-text").text().length;
	var tdWidth = $("table tbody td").width()-55;
	var fontColor = "";
	var stateHtml = "";
	var boolImage1,boolImage2;
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
	if(types == "紧急"){
		boolImage1 = true;
		typeHtml = '<div class="checkbox checkbox-success" onclick="selectClick(this)"><input name="type" type="checkbox" data-value="" checked="checked"><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label><span class="font-text-ckeck">紧急</span></div>'+
		'<div class="checkbox checkbox-success" onclick="selectClick(this)"><input name="type" type="checkbox" data-value=""><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label><span class="font-text-ckeck">不紧急</span></div>';
	}else if(types == "不紧急"){
		boolImage1 = false;
		typeHtml = '<div class="checkbox checkbox-success" onclick="selectClick(this)"><input name="type" type="checkbox" data-value=""><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label><span class="font-text-ckeck">紧急</span></div>'+
		'<div class="checkbox checkbox-success" onclick="selectClick(this)"><input name="type" type="checkbox" data-value="" checked="checked"><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label><span class="font-text-ckeck">不紧急</span></div>';
	}
	
	if(boolImage1 == true && boolImage2 == true){
		images = '<img src="/resources/image/icon-A.png">';
		fontColor = " dataTimeRed";
	}else if(boolImage1 == true && boolImage2 == false){
		images = '<img src="/resources/image/icon-B.png">';
	}else if(boolImage1 == false && boolImage2 == true){
		images = '<img src="/resources/image/icon-C.png">';
	}else if(boolImage1 == false && boolImage2 == false){
		images = '<img src="/resources/image/icon-D.png">';
	}
	
	if(tm_result == 1){
		fontColor = " dataTimeCCC";
		images = '<img src="/resources/image/icon-success.png">';
	}
	if(maxWidth > tdWidth){
		var fontLen = Math.ceil((maxWidth - tdWidth) / (maxWidth / textLength));
		title1 = title.substring(0,title.length-(fontLen+4))+"...";
	}
	
	var date1 = new Date(yMdStart);
	var date2 = new Date(yMdEnd);
	
	var htmlUser = "";
	var userLeft = "";
	if(userPerson != ""){
		var spilt = userPerson.split(",");
		for(var i = 0; i < spilt.length; i++){
			var spilt1 = spilt[i].split("-");
			htmlUser +='<li data-id="'+ spilt1[0] +'">'+ spilt1[1] +'<i class="fa fa-minus-square" onclick="removeUser(this)"></i></li>';
			if(spilt1[2] == "完成"){
				userLeft +="<span data-id='"+ spilt1[0] +"'>"+ spilt1[1] +"<i style='background-color: #1ABC9C;'>已完成</i></span>";
			}else{
				userLeft +="<span data-id='"+ spilt1[0] +"'>"+ spilt1[1] +"<i style='background-color: #F39C12;'>未完成</i></span>";
			}
		}
	}
	
	var boolTmType = "";
	if(tm_tmType == 0){
		boolTmType = 'onclick="editMemorand(this)"';
	}
	
	var http = "";
	if(tm_http != null && tm_http != ""){
		http = 'onclick="hrefClick(this)"'+'data-type="'+ tm_http +'"';
	}
	
	$("table tbody tr").each(function(index){
		$(this).find("td").each(function(i){
			var html = "";
			var html1 = "";
			if($(this).find(".tdContent-data .contentTitle").length < 4){
				var html = '<ul class="contentTitle">                                                                                                                    '+
				'<li>                                                                                                                               '+
				'	<div class="momen_dis" data-id="'+ tm_id +'"><a href="javascript:;" onclick="fontClick(this)"><span class="titleFont'+ fontColor +'">'+ title1 +'</span><span class="dataTime'+ fontColor +'">'+ hhss +'</span></a>	'+
				'		<div class="'+ $(this).find(".add-text").next().attr("class") +'" style="display: none;">                                                                          '+
				'       <div class="icon-image-x">'+ images +'</div>'+
				'			<span class="arrow"><span class="inner-arrow"></span></span>                                                            '+
				'			<div class="new-event-content">                                                                                         '+
				'				<div class="new-event-content-title"><h3>'+ title +'</h3></div>                                              		'+
				'				<div class="new-event-content-model">                                                                               '+
				'					<dl style="height: 25px; line-height: 25px; color:#666;">                                                       '+
				'						<dt style="width: 48px;">安排人：</dt>                                                                          	'+
				'						<dd>'+ mainUser +'</dd>                                                                        			'+
				'					</dl>                                                                                                           '+
				'					<dl style="height: 25px; line-height: 25px; color:#666;">                                                       '+
				'						<dt style="width: 25px;">起：</dt>                                                                          	'+
				'						<dd>'+ startDate +'</dd>                                                                        			'+
				'					</dl>                                                                                                           '+
				'					<dl style="height: 25px; line-height: 25px; color:#666;">                                                      	'+
				'						<dt style="width: 25px;">止：</dt>                                                                          	'+
				'						<dd>'+ endDate +'</dd>                                                                        				'+
				'					</dl>                                                                                                           '+
				'					<dl style="height:auto; overflow: hidden; line-height: 25px; color:#666;">                                                      	'+
				'						<dt style="width: 36px;">进度：</dt>                                                                          	'+
				'						<dd class="mainUser">'+ userLeft +'</dd>                                                                        				'+
				'					</dl>                                                                                                           '+
				'				</div>                                                                                                              '+
				'				<div class="new-event-footer">                                                                                      '+
				'					<a href="javascript:;" '+ http +'>业务跟进</a>                                                                             	'+
				'					<a href="javascript:;" '+ boolTmType +'>编辑</a>                                                     '+
				'					<a href="javascript:;" onclick="successMessage(this)">完成</a>                                                   '+
				'					<a href="javascript:;" onclick="deleteData(this)">删除</a>                                                       '+
				'					</div>																											'+
				'				<div class="beizhuDiv">																								'+
				'					<textarea rows="" cols="" class="textBeizhu">'+ text +'</textarea>												'+
				'				</div>																												'+
				'			</div>                                                                                                                  '+
				'		</div>                                                                                                                      '+
				'	</div>                                                                                                                          '+
				'	<div class="'+ $(this).parent().find(".add-event .add-text").next().attr("class") +'" style="display: none;">                                                                                                                                 '+
				'								<span class="arrow"><span class="inner-arrow"></span></span>                                                                                                                                                     '+
				'								<div class="new-event-content">                                                                                                                                                                                  '+
				'									<div class="new-event-content-title"><h3>修改事件</h3><span class="close" onclick="closeEvent(this)">×</span></div>                                                                                          '+
				'									<div class="new-event-content-model">                                                                                                                                                                        '+
				'										<dl style="height: auto; overflow: hidden;">                                                                                                                                                                                                     '+
				'											<dt>事件：</dt>                                                                                                                                                                                      '+
				'											<dd style="height: auto; overflow: hidden;"><textarea placeholder="创建一个事件内容" class="titleText" maxlength="150" onblur="onblurTitle(this)">'+ title +'</textarea></dd>                                                                                                                                        '+
				'										</dl>                                                                                                                                                                                                    '+
				'										<dl>                                                                                                                                                                                                     '+
				'											<dt>类型：</dt>                                                                                                                                                                                      '+
				'											<dd>                                                                                                                                                                                                 '+
															typeHtml+
				'											</dd>                                                                                                                                                                                                '+
				'										</dl>                                                                                                                                                                                                    '+
				'										<dl>                                                                                                                                                                                                     '+
				'											<dt>事件程度：</dt>                                                                                                                                                                                      '+
				'											<dd>                                                                                                                                                                                                 '+
															stateHtml +
				'											</dd>                                                                                                                                                                                                '+
				'										</dl>                                                                                                                                                                                                    '+
				'										<dl>                                                                                                                                                                                                     '+
				'											<dt>开始：</dt>                                                                                                                                                                                      '+
				'											<dd><input type="text" class="startDate" value="'+ startDate +'" readonly="readonly" /></dd>                                                                                                                           '+
				'										</dl>                                                                                                                                                                                                    '+
				'										<dl>                                                                                                                                                                                                     '+
				'											<dt>结束：</dt>                                                                                                                                                                                      '+
				'											<dd><input type="text" class="endDate" value="'+ endDate +'" readonly="readonly" /></dd>                                                                                                                           '+
				'										</dl>                                                                                                                                                                                                    '+
				'										<dl style="height: auto; overflow: hidden; position: relative;">                                                                                                                                                                                                     '+
				'											<dt>安排人：</dt>                                                                                                                                                                                      '+
				'											<dd>                                                                                                                           '+
				'												<i class="fa fa-plus-square" onclick="selectPersonDiv(this)"></i>                                                                                                                           '+
				'												<div class="user-table">                                                                                                                           '+
				'												<ul>                                                                                                                           '+
																	htmlUser+
				'												</ul>                                                                                                                           '+
				'												</div>                                                                                                                           '+
				'											</dd>                                                                                                                           '+
				'										</dl>                                                                                                                                                                                                    '+
				'									</div>                                                                                                                                                                                                       '+
				'									<div class="new-event-footer">                                                                                                                                                                               '+
				'										<div class="more-font">更多选项</div>                                                                                                                                                                    '+
				'										<div class="btn-cencel">取消</div>                                                                                                                                                                       '+
				'										<div class="btn-confirm" onclick="updateSubmit(this)">提交</div>                                                                                                                                                                      '+
				'									</div>                                                                                                                                                                                                       '+
				'								</div>                                                                                                                                                                                                           '+
				'									<div class="user-person">                                                                                                                                                                                                               '+
				'										<div style="text-align: center;"><input type="text" class="user-input" placeholder="内部人员/电话" onkeyup="inputUser(this)"  /></div>                                                                                                                                                                                                               '+
				'										<div class="user-list">                                                                                                                                                                                                               '+
				'										<ul>                                                                                                                                                                                                               '+
				'										</ul>                                                                                                                                                                                                               '+
				'										</div>                                                                                                                                                                                                               '+
				'									</div>																							'+
				'							</div>																									'+
				'</li>                                                                                                                              '+
				'</ul>';
			}else{
				var html1 = '<ul class="contentTitle">                                                                                                                    '+
				'<li>                                                                                                                               '+
				'	<div class="momen_dis" data-id="'+ tm_id +'"><a href="javascript:;" onclick="fontClick(this)"><span class="titleFont'+ fontColor +'">'+ title1 +'</span><span class="dataTime'+ fontColor +'">'+ hhss +'</span></a>	'+
				'		<div class="'+ $(this).find(".add-text").next().attr("class") +'" style="display: none;">                                                                          '+
				'       <div class="icon-image-x">'+ images +'</div>'+
				'			<span class="arrow"><span class="inner-arrow"></span></span>                                                            '+
				'			<div class="new-event-content">                                                                                         '+
				'				<div class="new-event-content-title"><h3>'+ title +'</h3></div>                                              		'+
				'				<div class="new-event-content-model">                                                                               '+
				'					<dl style="height: 25px; line-height: 25px; color:#666;">                                                       '+
				'						<dt style="width: 48px;">安排人：</dt>                                                                          	'+
				'						<dd>'+ mainUser +'</dd>                                                                        			'+
				'					</dl>                                                                                                           '+
				'					<dl style="height: 25px; line-height: 25px; color:#666;">                                                       '+
				'						<dt style="width: 25px;">起：</dt>                                                                          	'+
				'						<dd>'+ startDate +'</dd>                                                                        			'+
				'					</dl>                                                                                                           '+
				'					<dl style="height: 25px; line-height: 25px; color:#666;">                                                      	'+
				'						<dt style="width: 25px;">止：</dt>                                                                          	'+
				'						<dd>'+ endDate +'</dd>                                                                        				'+
				'					</dl>                                                                                                           '+
				'					<dl style="height:auto; overflow: hidden; line-height: 25px; color:#666;">                                                      	'+
				'						<dt style="width: 36px;">进度：</dt>                                                                          	'+
				'						<dd class="mainUser">'+ userLeft +'</dd>                                                                        				'+
				'					</dl>                                                                                                           '+
				'				</div>                                                                                                              '+
				'				<div class="new-event-footer">                                                                                      '+
				'					<a href="javascript:;" '+ http +'>业务跟进</a>                                                                             	'+
				'					<a href="javascript:;" '+ boolTmType +'>编辑</a>                                                                                 	'+
				'					<a href="javascript:;" onclick="successMessage(this)">完成</a>                                                                                 	'+
				'					<a href="javascript:;" onclick="deleteData(this)">删除</a>                                                       '+
				'					</div>																											'+
				'				<div class="beizhuDiv">																												'+
				'					<textarea rows="" cols="" class="textBeizhu"></textarea>																			'+
				'				</div>																												'+
				'			</div>                                                                                                                  '+
				'		</div>                                                                                                                      '+
				'	</div>                                                                                                                          '+
				'	<div class="'+ $(this).parent().find(".add-event .add-text").next().attr("class") +'" style="display: none;">                                                                                                                                                                   '+
				'								<span class="arrow"><span class="inner-arrow"></span></span>                                                                                                                                                     '+
				'								<div class="new-event-content">                                                                                                                                                                                  '+
				'									<div class="new-event-content-title"><h3>修改事件</h3><span class="close" onclick="closeEvent(this)">×</span></div>                                                                                          '+
				'									<div class="new-event-content-model">                                                                                                                                                                        '+
				'										<dl style="height: auto; overflow: hidden;">                                                                                                                                                                                                     '+
				'											<dt>事件：</dt>                                                                                                                                                                                      '+
				'											<dd style="height: auto; overflow: hidden;"><textarea placeholder="创建一个事件内容" class="titleText" maxlength="150" onblur="onblurTitle(this)">'+ title +'</textarea></dd>                                                                                                                                        '+
				'										</dl>                                                                                                                                                                                                    '+
				'										<dl>                                                                                                                                                                                                     '+
				'											<dt>类型：</dt>                                                                                                                                                                                      '+
				'											<dd>                                                                                                                                                                                                 '+
															typeHtml+
				'											</dd>                                                                                                                                                                                                '+
				'										</dl>                                                                                                                                                                                                    '+
				'										<dl>                                                                                                                                                                                                     '+
				'											<dt>事件程度：</dt>                                                                                                                                                                                      '+
				'											<dd>                                                                                                                                                                                                 '+
															stateHtml +
				'											</dd>                                                                                                                                                                                                '+
				'										</dl>                                                                                                                                                                                                    '+
				'										<dl>                                                                                                                                                                                                     '+
				'											<dt>开始：</dt>                                                                                                                                                                                      '+
				'											<dd><input type="text" class="startDate" value="'+ startDate +'" readonly="readonly" /></dd>                                                                                                                           '+
				'										</dl>                                                                                                                                                                                                    '+
				'										<dl>                                                                                                                                                                                                     '+
				'											<dt>结束：</dt>                                                                                                                                                                                      '+
				'											<dd><input type="text" class="endDate" value="'+ endDate +'" readonly="readonly" /></dd>                                                                                                                           '+
				'										</dl>                                                                                                                                                                                                    '+
				'										<dl style="height: auto; overflow: hidden; position: relative;">                                                                                                                                                                                                     '+
				'											<dt>安排人：</dt>                                                                                                                                                                                      '+
				'											<dd>                                                                                                                           '+
				'												<i class="fa fa-plus-square" onclick="selectPersonDiv(this)"></i>                                                                                                                           '+
				'												<div class="user-table">                                                                                                                           '+
				'												<ul>                                                                                                                           '+
																	htmlUser+
				'												</ul>                                                                                                                           '+
				'												</div>                                                                                                                           '+
				'											</dd>                                                                                                                           '+
				'										</dl>                                                                                                                                                                                                    '+
				'									</div>                                                                                                                                                                                                       '+
				'									<div class="new-event-footer">                                                                                                                                                                               '+
				'										<div class="more-font">更多选项</div>                                                                                                                                                                    '+
				'										<div class="btn-cencel">取消</div>                                                                                                                                                                       '+
				'										<div class="btn-confirm" onclick="updateSubmit(this)">提交</div>                                                                                                                                                                      '+
				'									</div>                                                                                                                                                                                                       '+
				'								</div>                                                                                                                                                                                                           '+
				'									<div class="user-person">                                                                                                                                                                                                               '+
				'										<div style="text-align: center;"><input type="text" class="user-input" placeholder="内部人员/电话" onkeyup="inputUser(this)"  /></div>                                                                                                                                                                                                               '+
				'										<div class="user-list">                                                                                                                                                                                                               '+
				'										<ul>                                                                                                                                                                                                               '+
				'										</ul>                                                                                                                                                                                                               '+
				'										</div>                                                                                                                                                                                                               '+
				'									</div>																							'+
				'							</div>																									'+
				'</li>                                                                                                                              '+
				'</ul>';
			}
			var dates = $(".yearMonth input").val().substring(0,$(".yearMonth input").val().indexOf("年"));
			var datesDay,datesMonth;
			if($(this).find(".tdTitle em").attr("data-type") == "1"){
				datesMonth = parseInt($(".yearMonth input").val().substring($(".yearMonth input").val().indexOf("年")+1,$(".yearMonth input").val().indexOf("月")));
				if(datesMonth == 1){
					dates = (parseInt($(".yearMonth input").val().substring(0,$(".yearMonth input").val().indexOf("年")))-1)
					datesMonth = 12;
				}else{
					if((datesMonth-1) < 10){
						datesMonth = "0"+(datesMonth-1);
					}else{
						datesMonth = datesMonth-1;
					}
				}
				datesDay = $(this).find("em").text();
				if(parseInt(datesDay) < 10){
					datesDay = "0"+datesDay;
				}else{
					datesDay = datesDay;
				}
			}else if($(this).find(".tdTitle em").attr("data-type") == "2"){
				datesMonth = parseInt($(".yearMonth input").val().substring($(".yearMonth input").val().indexOf("年")+1,$(".yearMonth input").val().indexOf("月")));
				if(datesMonth < 10){
					datesMonth = "0"+datesMonth;
				}else{
					datesMonth = datesMonth;
				}
				datesDay = $(this).find("em").text();
				if(parseInt(datesDay) < 10){
					datesDay = "0"+datesDay;
				}else{
					datesDay = datesDay;
				}
			}else if($(this).find(".tdTitle em").attr("data-type") == "3"){
				datesMonth = parseInt($(".yearMonth input").val().substring($(".yearMonth input").val().indexOf("年")+1,$(".yearMonth input").val().indexOf("月")));
				if(datesMonth == 12){
					dates = (parseInt($(".yearMonth input").val().substring(0,$(".yearMonth input").val().indexOf("年")))+1);
					datesMonth = "0"+1;
				}else{
					if((datesMonth+1) < 10){
						datesMonth = "0"+(datesMonth+1);
					}else{
						datesMonth = datesMonth+1;
					}
				}
				datesDay = $(this).find("em").text();
				if(parseInt(datesDay) < 10){
					datesDay = "0"+datesDay;
				}else{
					datesDay = datesDay;
				}
			}
			dates = dates+"-"+datesMonth+"-"+datesDay;
			var datet1 = new Date(dates);
			
			
			if(date1.getTime() <= datet1.getTime() && datet1.getTime() <= date2.getTime()){
				if($(this).find(".tdContent-data .contentTitle").length == 4){
					$("table tbody td .dateThingMore").width($("table tbody td").width()-8);
					$(this).find(".tdContent-data").append("<ul><li style='position: relative;'><i class='fa fa-ellipsis-h' onclick='dateThingMoreShowHide(this)'></i><div class='dateThingMore'><div class='dateThingMore-content'></div><div class='dateThingMore-page'><div class='dateThingMore-page-num'><span class='pageNo'>1</span> / <span class='pageSize'>"+ (Math.ceil((parseFloat(size)-4)/12)) +"</span></div><i class='fa fa-angle-right' onclick='pageRight(this)'></i><i class='fa fa-angle-left' onclick='pageLeft(this)'></i></div></div></li></ul>");
				}
				if($(this).find(".tdContent-data .contentTitle").length > 3){
					$("table tbody td .dateThingMore").width($("table tbody td").width()-8);
					$(this).find(".dateThingMore .dateThingMore-content").append(html1);
				}else{
					$(this).find(".tdContent-data").append(html);
				}
			}
		});
	});
	
	var newMonth = $(".yearMonth input").val().split("年")[1].split("月")[0];
	if($("#monthMemo tbody tr").length > 5){
		$(".center-div").height(834+(153*(parseInt($("#monthMemo tbody tr").length)-5)));
	}
}

/**
 * 左翻页
 */
function pageLeft(ids){
	var pageNo = $(ids).parent().find(".pageNo").text();
	var pageSize = $(ids).parent().find(".pageSize").text();
	
	if(pageNo > 1){
		$(ids).parent().find(".pageNo").text(pageNo-1);
		var year = $(".yearMonth input").val().split("年")[0];
		var month = $(".yearMonth input").val().split("年")[1].split("月")[0];
		var day = $(ids).parent().parent().parent().parent().parent().parent().prev().find("em").text();
		var pageNo = parseInt(pageNo)-1;
		dataPage($(ids).parent().parent().parent().parent().parent().parent().parent().parent().parent(),year,month,day,pageNo);
	}
}

/**
 * 右翻页
 */
function pageRight(ids){
	var pageNo = $(ids).parent().find(".pageNo").text();
	var pageSize = $(ids).parent().find(".pageSize").text();
	
	if(pageNo < pageSize){
		$(ids).parent().find(".pageNo").text(parseInt(pageNo)+1);
		var year = $(".yearMonth input").val().split("年")[0];
		var month = $(".yearMonth input").val().split("年")[1].split("月")[0];
		var day = $(ids).parent().parent().parent().parent().parent().parent().prev().find("em").text();
		var pageNo = parseInt(pageNo)+1;
		dataPage($(ids).parent().parent().parent().parent().parent().parent().parent().parent().parent(),year,month,day,pageNo);
	}
}

/**
 * 事程分页
 * 
 * @param ids table td
 * @param year 年
 * @param month 月
 * @param day 日
 * @param pageNo 开始页
 */
function dataPage(ids,year,month,day,pageNo){
	$.ajax({
	    type: "POST",
	    url: "/memo/dateListPage",
	    data: "year="+year+"&month="+month+"&day="+day+"&pageNo="+pageNo,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$(ids).find(".dateThingMore .dateThingMore-content").html("");
	    	$.each(result.taskMessageEM, function(index, data) {
    			var startDate = returnTime(data.tm_startTime);
    			startDate = startDate.substring(0,startDate.length-3);
    			startDate = startDate.split(" ")[0]+" "+data.tm_startWeek+" "+startDate.split(" ")[1];
    			var endDate = returnTime(data.tm_endTime);
    			endDate = endDate.substring(0,endDate.length-3);
    			endDate = endDate.split(" ")[0]+" "+data.tm_endWeek+" "+endDate.split(" ")[1];
    			var title = data.tm_text;
    			var title1;
    			
    			$(".font-text").text(title);
    			var maxWidth = $(".font-text").width();
    	    	var textLength = $(".font-text").text().length;
    	    	var tdWidth = $("table tbody td").width()-55;
    			
    			if(maxWidth > tdWidth){
    				var fontLen = Math.ceil((maxWidth - tdWidth) / (maxWidth / textLength));
    				title1 = title.substring(0,title.length-(fontLen+4))+"...";
    			}
    			var messageState = data.tm_state;
    			// 时间
    			var hhss = startDate.split(" ")[2];
    			// 右上角角标
    			var images = "";
    			if(data.tm_result == 1){
    				images = "<img src='/resources/image/icon-success.png' />";
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
    						userLeft +="<span data-id='"+ spilt1[0] +"'>"+ spilt1[1] +"<i style='background-color: #1ABC9C;'>已完成</i></span>";
    					}else{
    						userLeft +="<span data-id='"+ spilt1[0] +"'>"+ spilt1[1] +"<i style='background-color: #F39C12;'>未完成</i></span>";
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
    			if(boolImage1 == true && boolImage2 == true){
    				images = '<img src="/resources/image/icon-A.png">';
    				fontColor = " dataTimeRed";
    			}else if(boolImage1 == true && boolImage2 == false){
    				images = '<img src="/resources/image/icon-B.png">';
    			}else if(boolImage1 == false && boolImage2 == true){
    				images = '<img src="/resources/image/icon-C.png">';
    			}else if(boolImage1 == false && boolImage2 == false){
    				images = '<img src="/resources/image/icon-D.png">';
    			}
    			var html1 = '<ul class="contentTitle">                                                                                                                    '+
    	    	'<li>                                                                                                                               '+
    	    	'	<div class="momen_dis" data-id="'+ tm_id +'"><a href="javascript:;" onclick="fontClick(this)"><span class="titleFont'+ fontColor +'">'+ title1 +'</span><span class="dataTime'+ fontColor +'">'+ hhss +'</span></a>	'+
    	    	'		<div class="'+ $(ids).find(".add-text").next().attr("class") +'" style="display: none;">                                                                          '+
    	    	'       <div class="icon-image-x">'+ images +'</div>'+
    	    	'			<span class="arrow"><span class="inner-arrow"></span></span>                                                            '+
    	    	'			<div class="new-event-content">                                                                                         '+
    	    	'				<div class="new-event-content-title"><h3>'+ title +'</h3></div>                                              		'+
    	    	'				<div class="new-event-content-model">                                                                               '+
    	    	'					<dl style="height: 25px; line-height: 25px; color:#666;">                                                       '+
    	    	'						<dt style="width: 48px;">安排人：</dt>                                                                          	'+
    	    	'						<dd>'+ data.mainUser +'</dd>                                                                        			'+
    	    	'					</dl>                                                                                                           '+
    	    	'					<dl style="height: 25px; line-height: 25px; color:#666;">                                                       '+
    	    	'						<dt style="width: 25px;">起：</dt>                                                                          	'+
    	    	'						<dd>'+ startDate +'</dd>                                                                        			'+
    	    	'					</dl>                                                                                                           '+
    	    	'					<dl style="height: 25px; line-height: 25px; color:#666;">                                                      	'+
    	    	'						<dt style="width: 25px;">止：</dt>                                                                          	'+
    	    	'						<dd>'+ endDate +'</dd>                                                                        				'+
    	    	'					</dl>                                                                                                           '+
    	    	'					<dl style="height:auto; overflow: hidden; line-height: 25px; color:#666;">                                                      	'+
    	    	'						<dt style="width: 36px;">进度：</dt>                                                                          	'+
    	    	'						<dd class="mainUser">'+ userLeft +'</dd>                                                                        				'+
    	    	'					</dl>                                                                                                           '+
    	    	'				</div>                                                                                                              '+
    	    	'				<div class="new-event-footer">                                                                                      '+
    	    	'					<a href="javascript:;" '+ http +'>业务跟进</a>                                                                             	'+
    	    	'					<a href="javascript:;" '+ boolTmType +'>编辑</a>                                                                                 	'+
    	    	'					<a href="javascript:;" onclick="successMessage(this)">完成</a>                                                                                 	'+
    	    	'					<a href="javascript:;" onclick="deleteData(this)">删除</a>                                                       '+
    	    	'					</div>																											'+
    	    	'				<div class="beizhuDiv">																												'+
    	    	'					<textarea rows="" cols="" class="textBeizhu"></textarea>																			'+
    	    	'				</div>																												'+
    	    	'			</div>                                                                                                                  '+
    	    	'		</div>                                                                                                                      '+
    	    	'	</div>                                                                                                                          '+
    	    	'	<div class="'+ $(ids).parent().find(".add-event .add-text").next().attr("class") +'" style="display: none;">                                                                                                                                                                   '+
    	    	'								<span class="arrow"><span class="inner-arrow"></span></span>                                                                                                                                                     '+
    	    	'								<div class="new-event-content">                                                                                                                                                                                  '+
    	    	'									<div class="new-event-content-title"><h3>修改事件</h3><span class="close" onclick="closeEvent(this)">×</span></div>                                                                                          '+
    	    	'									<div class="new-event-content-model">                                                                                                                                                                        '+
    	    	'										<dl style="height: auto; overflow: hidden;">                                                                                                                                                                                                     '+
    	    	'											<dt>事件：</dt>                                                                                                                                                                                      '+
    	    	'											<dd style="height: auto; overflow: hidden;"><textarea placeholder="创建一个事件内容" class="titleText" maxlength="150" onblur="onblurTitle(this)">'+ title +'</textarea></dd>                                                                                                                                        '+
    	    	'										</dl>                                                                                                                                                                                                    '+
    	    	'										<dl>                                                                                                                                                                                                     '+
    	    	'											<dt>类型：</dt>                                                                                                                                                                                      '+
    	    	'											<dd>                                                                                                                                                                                                 '+
    	    												typeHtml+
    	    	'											</dd>                                                                                                                                                                                                '+
    	    	'										</dl>                                                                                                                                                                                                    '+
    	    	'										<dl>                                                                                                                                                                                                     '+
    	    	'											<dt>事件程度：</dt>                                                                                                                                                                                      '+
    	    	'											<dd>                                                                                                                                                                                                 '+
    	    												stateHtml +
    	    	'											</dd>                                                                                                                                                                                                '+
    	    	'										</dl>                                                                                                                                                                                                    '+
    	    	'										<dl>                                                                                                                                                                                                     '+
    	    	'											<dt>开始：</dt>                                                                                                                                                                                      '+
    	    	'											<dd><input type="text" class="startDate" value="'+ startDate +'" readonly="readonly" /></dd>                                                                                                                           '+
    	    	'										</dl>                                                                                                                                                                                                    '+
    	    	'										<dl>                                                                                                                                                                                                     '+
    	    	'											<dt>结束：</dt>                                                                                                                                                                                      '+
    	    	'											<dd><input type="text" class="endDate" value="'+ endDate +'" readonly="readonly" /></dd>                                                                                                                           '+
    	    	'										</dl>                                                                                                                                                                                                    '+
    	    	'										<dl style="height: auto; overflow: hidden; position: relative;">                                                                                                                                                                                                     '+
    	    	'											<dt>安排人：</dt>                                                                                                                                                                                      '+
    	    	'											<dd>                                                                                                                           '+
    	    	'												<i class="fa fa-plus-square" onclick="selectPersonDiv(this)"></i>                                                                                                                           '+
    	    	'												<div class="user-table">                                                                                                                           '+
    	    	'												<ul>                                                                                                                           '+
    	    														htmlUser+
    	    	'												</ul>                                                                                                                           '+
    	    	'												</div>                                                                                                                           '+
    	    	'											</dd>                                                                                                                           '+
    	    	'										</dl>                                                                                                                                                                                                    '+
    	    	'									</div>                                                                                                                                                                                                       '+
    	    	'									<div class="new-event-footer">                                                                                                                                                                               '+
    	    	'										<div class="more-font">更多选项</div>                                                                                                                                                                    '+
    	    	'										<div class="btn-cencel">取消</div>                                                                                                                                                                       '+
    	    	'										<div class="btn-confirm" onclick="updateSubmit(this)">提交</div>                                                                                                                                                                      '+
    	    	'									</div>                                                                                                                                                                                                       '+
    	    	'								</div>                                                                                                                                                                                                           '+
    	    	'									<div class="user-person">                                                                                                                                                                                                               '+
    	    	'										<div style="text-align: center;"><input type="text" class="user-input" placeholder="内部人员/电话" onkeyup="inputUser(this)"  /></div>                                                                                                                                                                                                               '+
    	    	'										<div class="user-list">                                                                                                                                                                                                               '+
    	    	'										<ul>                                                                                                                                                                                                               '+
    	    	'										</ul>                                                                                                                                                                                                               '+
    	    	'										</div>                                                                                                                                                                                                               '+
    	    	'									</div>																							'+
    	    	'							</div>																									'+
    	    	'</li>                                                                                                                              '+
    	    	'</ul>';
    			$("table tbody td .dateThingMore").width($("table tbody td").width()-8);
    			$(ids).find(".dateThingMore .dateThingMore-content").append(html1);
	    	});
	    }
	});
}

/**
 * 事程安排查询更多
 * 
 * @param ids
 */
function dateThingMoreShowHide(ids){
	if($(ids).parent().find(".dateThingMore").is(":hidden")){
		$(ids).parent().find(".dateThingMore").show();
	}else{
		$(ids).parent().find(".dateThingMore").hide();
	}
}

/**
 * 筛选点击选中
 * 
 * @param ids
 */
function selectClick(ids){
	$(ids).parent().find("input").attr("checked",false);
	$(ids).find("input").attr("checked",true);
}

/**
 * 事物标题光标离开执行判断是否为空
 */
function onblurTitle(ids){
	if($(ids).val() == ""){
		$(ids).css("border","1px solid #E74C3C");
	}else{
		$(ids).css("border","1px solid #d9d9d9");
	}
}


/**
 * 提交新建事件
 * 
 * @param ids
 */
function submit(ids){
	//事件
	var title1 = $(ids).parent().parent().find(".titleText").val();
	var title = $(ids).parent().parent().find(".titleText").val();
	//开始时间
	var startDate = $(ids).parent().parent().find(".startDate").val();
	//结束时间
	var endDate = $(ids).parent().parent().find(".endDate").val();
	// 时间
	var hhss = startDate.split(" ")[2];
	// 年月日
	var yMdStart = startDate.split(" ")[0];
	// 年月日
	var yMdEnd = endDate.split(" ")[0];
	// 任务消息编码
	var tm_id;
	// 紧急 0：不紧急 1：紧急 
	var tm_type;
	// 重要 0：不重要 1：重要
	var tm_state;
	// 获取当前开始时间年月日
	var dateMonth1 = $(".yearMonth input").val().substring($(".yearMonth input").val().indexOf("年")+1,$(".yearMonth input").val().indexOf("月"));
	// 类型
	var messageType = "紧急";
	$(ids).parent().parent().find("input[name='type']").each(function(i){
		if($(this).is(":checked")){
			messageType = $(this).parent().text();
		}
	});
	// 事件程度
	var messageState = "不重要";
	$(ids).parent().parent().find("input[name='state']").each(function(i){
		if($(this).is(":checked")){
			messageState = $(this).parent().text();
		}
	});
	// 安排人
	var personID = "";
	$(ids).parent().parent().find(".user-table ul li").each(function(){
		personID += $(this).attr("data-id")+",";
	});
	if(personID != ""){
		personID = personID.substring(0,personID.length-1);
	}
	// 右上角角标
	var images = "";
	$(".font-text").text(title);
	var maxWidth = $(".font-text").width();
	var textLength = $(".font-text").text().length;
	var tdWidth = $("table tbody td").width()-73;
	var fontColor = "";
	if(messageState == "紧急"){
		fontColor = "dataTimeRed";
	}
	if(maxWidth >= tdWidth){
		var fontLen = Math.ceil((maxWidth - tdWidth) / (maxWidth / textLength));
		title1 = title.substring(0,title.length-(fontLen+4))+"...";
	}
	
	if(title == ""){
		$(ids).parent().parent().find(".titleText").css("border","1px solid #E74C3C");
		return;
	}else{
		$(ids).parent().parent().find(".titleText").css("border","1px solid #d9d9d9");
	}
	var bools = false;
	// 安排人
	var mainUser;
	addData = $.Deferred();
	$.ajax({
	    type: "POST",
	    url: "/userTaskMessage/addTaskMessage",
	    data: "tm_text="+title
	    +"&tm_type="+messageType
	    +"&tm_state="+messageState
	    +"&tm_startTime="+startDate.split(" ")[0]+" "+startDate.split(" ")[2]
		+"&tm_startWeek="+startDate.split(" ")[1]
		+"&tm_endTime="+endDate.split(" ")[0]+" "+endDate.split(" ")[2]
		+"&tm_endWeek="+endDate.split(" ")[1]
		+"&personID="+personID
		+"&tmType=0",
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		bools = true;
	    		tm_id = result.tm_id;
	    		mainUser = result.mainUser;
	    	}else{
	    		bools = false;
	    	}
	    	addData.resolve();
	    }
	});
	
	$.when(addData).done(function () {
		if(bools){
			var boolImage1,boolImage2;
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
			
			var htmlUser = $(ids).parent().parent().parent().find(".user-table ul").html();
			
			var personHtml = "";
			
			$(ids).parent().parent().parent().find(".user-table ul li").each(function(){
				personHtml+='<span data_id="'+ $(this).attr("data-id") +'">'+ $(this).text() +'<i style="background-color: #F39C12;">未完成</i></span>';
			});
			
			if(boolImage1 == true && boolImage2 == true){
				images = '<img src="/resources/image/icon-A.png">';
				fontColor = " dataTimeRed";
			}else if(boolImage1 == true && boolImage2 == false){
				images = '<img src="/resources/image/icon-B.png">';
			}else if(boolImage1 == false && boolImage2 == true){
				images = '<img src="/resources/image/icon-C.png">';
			}else if(boolImage1 == false && boolImage2 == false){
				images = '<img src="/resources/image/icon-D.png">';
			}
			
			var html = '<ul class="contentTitle">                                                                                                                    '+
			'<li>                                                                                                                               '+
			'	<div class="momen_dis" data-id="'+ tm_id +'"><a href="javascript:;" onclick="fontClick(this)"><span class="titleFont'+ fontColor +'">'+ title1 +'</span><span class="dataTime'+ fontColor +'">'+ hhss +'</span></a>	'+
			'		<div class="'+ $(ids).parent().parent().parent().attr("class") +'" style="display: none;">                                                                          '+
			'       <div class="icon-image-x">'+ images +'</div>'+
			'			<span class="arrow"><span class="inner-arrow"></span></span>                                                            '+
			'			<div class="new-event-content">                                                                                         '+
			'				<div class="new-event-content-title"><h3>'+ title +'</h3></div>                                              		'+
			'				<div class="new-event-content-model">                                                                               '+
			'					<dl style="height: 25px; line-height: 25px; color:#666;">                                                       '+
			'						<dt style="width: 48px;">安排人：</dt>                                                                          	'+
			'						<dd>'+ mainUser +'</dd>                                                                        			'+
			'					</dl>                                                                                                           '+
			'					<dl style="height: 25px; line-height: 25px; color:#666;">                                                       '+
			'						<dt style="width: 25px;">起：</dt>                                                                          	'+
			'						<dd>'+ startDate +'</dd>                                                                        			'+
			'					</dl>                                                                                                           '+
			'					<dl style="height: 25px; line-height: 25px; color:#666;">                                                      	'+
			'						<dt style="width: 25px;">止：</dt>                                                                          	'+
			'						<dd>'+ endDate +'</dd>                                                                        				'+
			'					</dl>                                                                                                           '+
			'					<dl style="height: 25px; line-height: 25px; color:#666;">                                                      	'+
			'						<dt style="width: 36px;">进度：</dt>                                                                          	'+
			'						<dd class="mainUser">'+ personHtml +'</dd>                                                                        				'+
			'					</dl>                                                                                                           '+
			'				</div>                                                                                                              '+
			'				<div class="new-event-footer">                                                                                      '+
			'					<a href="javascript:;">业务跟进</a>                                                                             	'+
			'					<a href="javascript:;" onclick="editMemorand(this)">编辑</a>                                                                                 	'+
			'					<a href="javascript:;" onclick="successMessage(this)">完成</a>                                                                                 	'+
			'					<a href="javascript:;" onclick="deleteData(this)">删除</a>                                                       '+
			'					</div>																											'+
			'				<div class="beizhuDiv">																												'+
			'					<textarea rows="" cols="" class="textBeizhu"></textarea>																			'+
			'				</div>																												'+
			'			</div>                                                                                                                  '+
			'		</div>                                                                                                                      '+
			'	</div>                                                                                                                          '+
			'	<div class="'+ $(ids).parent().parent().parent().attr("class") +'" style="display: none;">                                                                                                                                                                   '+
			'								<span class="arrow"><span class="inner-arrow"></span></span>                                                                                                                                                     '+
			'								<div class="new-event-content">                                                                                                                                                                                  '+
			'									<div class="new-event-content-title"><h3>修改事件</h3><span class="close" onclick="closeEvent(this)">×</span></div>                                                                                          '+
			'									<div class="new-event-content-model">                                                                                                                                                                        '+
			'										<dl style="height: auto; overflow: hidden;">                                                                                                                                                                                                     '+
			'											<dt>事件：</dt>                                                                                                                                                                                      '+
			'											<dd style="height: auto; overflow: hidden;"><textarea placeholder="创建一个事件内容" class="titleText" maxlength="150" onblur="onblurTitle(this)">'+ title +'</textarea></dd>                                                                                                                                        '+
			'										</dl>                                                                                                                                                                                                    '+
			'										<dl>                                                                                                                                                                                                     '+
			'											<dt>类型：</dt>                                                                                                                                                                                      '+
			'											<dd>                                                                                                                                                                                                 '+
														typeHtml+
			'											</dd>                                                                                                                                                                                                '+
			'										</dl>                                                                                                                                                                                                    '+
			'										<dl>                                                                                                                                                                                                     '+
			'											<dt>事件程度：</dt>                                                                                                                                                                                      '+
			'											<dd>                                                                                                                                                                                                 '+
														stateHtml +
			'											</dd>                                                                                                                                                                                                '+
			'										</dl>                                                                                                                                                                                                    '+
			'										<dl>                                                                                                                                                                                                     '+
			'											<dt>开始：</dt>                                                                                                                                                                                      '+
			'											<dd><input type="text" class="startDate" value="'+ startDate +'" readonly="readonly" /></dd>                                                                                                                           '+
			'										</dl>                                                                                                                                                                                                    '+
			'										<dl>                                                                                                                                                                                                     '+
			'											<dt>结束：</dt>                                                                                                                                                                                      '+
			'											<dd><input type="text" class="endDate" value="'+ endDate +'" readonly="readonly" /></dd>                                                                                                                           '+
			'										</dl>                                                                                                                                                                                                    '+
			'										<dl style="height: auto; overflow: hidden; position: relative;">                                                                                                                                                                                                     '+
			'											<dt>安排人：</dt>                                                                                                                                                                                      '+
			'											<dd>                                                                                                                           '+
			'												<i class="fa fa-plus-square" onclick="selectPersonDiv(this)"></i>                                                                                                                           '+
			'												<div class="user-table">                                                                                                                           '+
			'												<ul>                                                                                                                           '+
																htmlUser+
			'												</ul>                                                                                                                           '+
			'												</div>                                                                                                                           '+
			'											</dd>                                                                                                                           '+
			'										</dl>                                                                                                                                                                                                    '+
			'									</div>                                                                                                                                                                                                       '+
			'									<div class="new-event-footer">                                                                                                                                                                               '+
			'										<div class="more-font">更多选项</div>                                                                                                                                                                    '+
			'										<div class="btn-cencel">取消</div>                                                                                                                                                                       '+
			'										<div class="btn-confirm" onclick="updateSubmit(this)">提交</div>                                                                                                                                                                      '+
			'									</div>                                                                                                                                                                                                       '+
			'								</div>                                                                                                                                                                                                           '+
			'									<div class="user-person">                                                                                                                                                                                                               '+
			'										<div style="text-align: center;"><input type="text" class="user-input" placeholder="内部人员/电话" onkeyup="inputUser(this)"  /></div>                                                                                                                                                                                                               '+
			'										<div class="user-list">                                                                                                                                                                                                               '+
			'										<ul>                                                                                                                                                                                                               '+
			'										</ul>                                                                                                                                                                                                               '+
			'										</div>                                                                                                                                                                                                               '+
			'									</div>																							'+
			'							</div>																									'+
			'</li>                                                                                                                              '+
			'</ul>';
			
			var date1 = new Date(Date.parse(yMdStart));
			var date2 = new Date(Date.parse(yMdEnd));
			
			$("table tbody tr").each(function(index){
				$(this).find("td").each(function(i){
					var dates = $(".yearMonth input").val().substring(0,$(".yearMonth input").val().indexOf("年"));
					var datesDay,datesMonth;
					if($(this).find(".tdTitle em").attr("data-type") == "1"){
						datesMonth = parseInt($(".yearMonth input").val().substring($(".yearMonth input").val().indexOf("年")+1,$(".yearMonth input").val().indexOf("月")));
						if(datesMonth == 1){
							dates = (parseInt($(".yearMonth input").val().substring(0,$(".yearMonth input").val().indexOf("年")))-1)
							datesMonth = 12;
						}else{
							if((datesMonth-1) < 10){
								datesMonth = "0"+(datesMonth-1);
							}else{
								datesMonth = datesMonth-1;
							}
						}
						datesDay = $(this).find("em").text();
						if(parseInt(datesDay) < 10){
							datesDay = "0"+datesDay;
						}else{
							datesDay = datesDay;
						}
					}else if($(this).find(".tdTitle em").attr("data-type") == "2"){
						datesMonth = parseInt($(".yearMonth input").val().substring($(".yearMonth input").val().indexOf("年")+1,$(".yearMonth input").val().indexOf("月")));
						if(datesMonth < 10){
							datesMonth = "0"+datesMonth;
						}else{
							datesMonth = datesMonth;
						}
						datesDay = $(this).find("em").text();
						if(parseInt(datesDay) < 10){
							datesDay = "0"+datesDay;
						}else{
							datesDay = datesDay;
						}
					}else if($(this).find(".tdTitle em").attr("data-type") == "3"){
						datesMonth = parseInt($(".yearMonth input").val().substring($(".yearMonth input").val().indexOf("年")+1,$(".yearMonth input").val().indexOf("月")));
						if(datesMonth == 12){
							dates = (parseInt($(".yearMonth input").val().substring(0,$(".yearMonth input").val().indexOf("年")))+1)
							datesMonth = "0"+1;
						}else{
							if((datesMonth+1) < 10){
								datesMonth = "0"+(datesMonth+1);
							}else{
								datesMonth = datesMonth+1;
							}
						}
						datesDay = $(this).find("em").text();
						if(parseInt(datesDay) < 10){
							datesDay = "0"+datesDay;
						}else{
							datesDay = datesDay;
						}
					}
					dates = dates+"-"+datesMonth+"-"+datesDay;
					var datet1 = new Date(Date.parse(dates));
					if(date1.getTime() <= datet1.getTime() && datet1.getTime() <= date2.getTime()){
						if($(this).find(".tdContent-data .contentTitle").length == 4){
							$("table tbody td .dateThingMore").width($("table tbody td").width()-8);
							$(this).find(".tdContent-data").append("<ul><li style='position: relative;'><i class='fa fa-ellipsis-h' onclick='dateThingMoreShowHide(this)'></i><div class='dateThingMore'></div></li></ul>");
						}
						if($(this).find(".tdContent-data .contentTitle").length > 3){
							$(this).find(".dateThingMore").append(html);
						}else{
							$(this).find(".tdContent-data").append(html);
						}
					}
				});
			});
			
			// 关闭新建事件
			$(ids).parent().parent().find("input[name='type']").attr("checked", false);
			$(ids).parent().parent().find("input[name='type']").each(function(i){
				if(i == 0){
					$(this).attr("checked", true);
				}
			});
			$(ids).parent().parent().find("input[name='state']").attr("checked", false);
			$(ids).parent().parent().find("input[name='state']").each(function(i){
				if(i == 1){
					$(this).attr("checked", true);
				}
			});
			$(ids).parent().parent().parent().find(".titleText").val("");
			$(ids).parent().parent().parent().attr("style","right: none;");
			$(".arrow").attr("style","left: 390px;")
			$(ids).parent().parent().parent().hide();
			$(ids).parent().parent().parent().find(".user-table ul").html("");
			$(ids).parent().parent().next().hide();
			$(ids).parent().parent().next().find(".user-input").val("");
		}
	});
}

/**
 * 编辑事程安排
 * 
 * @param ids
 */
function editMemorand(ids){
	$(ids).parent().parent().parent().hide();
	$(ids).parent().parent().parent().parent().next().show();
}

/**
 * 修改新建事件
 * 
 * @param ids
 */
function updateSubmit(ids){
	//事件
	var title1 = $(ids).parent().parent().find(".titleText").val();
	var title = $(ids).parent().parent().find(".titleText").val();
	//开始时间
	var startDate = $(ids).parent().parent().find(".startDate").val();
	//结束时间
	var endDate = $(ids).parent().parent().find(".endDate").val();
	// 时间
	var hhss = startDate.split(" ")[2];
	// 年月日
	var yMdStart = startDate.split(" ")[0];
	// 年月日
	var yMdEnd = endDate.split(" ")[0];
	// 任务消息编码
	var tm_id = $(ids).parent().parent().parent().prev().attr("data-id");
	// 任务消息类型 0：个人 1：部门 2：公司
	var tm_type;
	// 事件紧急程度 0：紧急 1：重要 2：计划
	var tm_state;
	// 获取当前开始时间年月日
	var dateMonth1 = $(".yearMonth input").val().substring($(".yearMonth input").val().indexOf("年")+1,$(".yearMonth input").val().indexOf("月"));
	// 类型
	var messageType = "个人";
	$(ids).parent().parent().find("input[name='type']").each(function(i){
		if($(this).is(":checked")){
			messageType = $(this).parent().text();
		}
	});
	// 事件程度
	var messageState = "重要";
	$(ids).parent().parent().find("input[name='state']").each(function(i){
		if($(this).is(":checked")){
			messageState = $(this).parent().text();
		}
	});
	// 安排人
	var personID = "";
	$(ids).parent().parent().find(".user-table ul li").each(function(){
		personID += $(this).attr("data-id")+",";
	});
	if(personID != ""){
		personID = personID.substring(0,personID.length-1);
	}
	// 右上角角标
	var images = "";
	$(".font-text").text(title);
	var maxWidth = $(".font-text").width();
	var textLength = $(".font-text").text().length;
	var tdWidth = $("table tbody td").width()-73;
	var fontColor = "";
	if(maxWidth >= tdWidth){
		var fontLen = Math.ceil((maxWidth - tdWidth) / (maxWidth / textLength));
		title1 = title.substring(0,title.length-(fontLen+4))+"...";
	}
	
	if(title == ""){
		$(ids).parent().parent().find(".titleText").css("border","1px solid #E74C3C");
		return;
	}else{
		$(ids).parent().parent().find(".titleText").css("border","1px solid #d9d9d9");
	}
	
	// 安排人
	var mainUser;
	
	var bools = false;
	addData = $.Deferred();
	$.ajax({
	    type: "POST",
	    url: "/userTaskMessage/updateTaskMessage",
	    data: "tm_id="+tm_id 
	    +"&tm_text="+title
	    +"&tm_type="+messageType
	    +"&tm_state="+messageState
	    +"&tm_startTime="+startDate.split(" ")[0]+" "+startDate.split(" ")[2]
		+"&tm_startWeek="+startDate.split(" ")[1]
		+"&tm_endTime="+endDate.split(" ")[0]+" "+endDate.split(" ")[2]
		+"&tm_endWeek="+endDate.split(" ")[1]
		+"&personID="+personID
		+"&tmType=0",
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		bools = true;
	    		tm_id = result.tm_id;
	    		tm_type = result.tm_type;
	    		mainUser = result.mainUser;
	    	}else{
	    		bools = false;
	    	}
	    	addData.resolve();
	    }
	});
	
	$.when(addData).done(function () {
		$(ids).parent().parent().parent().parent().parent().remove();
		var boolImage1,boolImage2;
		if(bools){
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
			if(tm_type == "紧急"){
				boolImage1 = true;
				typeHtml = '<div class="checkbox checkbox-success" onclick="selectClick(this)"><input name="type" type="checkbox" data-value="" checked="checked"><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label><span class="font-text-ckeck">紧急</span></div>'+
				'<div class="checkbox checkbox-success" onclick="selectClick(this)"><input name="type" type="checkbox" data-value=""><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label><span class="font-text-ckeck">不紧急</span></div>';
			}else if(tm_type == "不紧急"){
				boolImage1 = false;
				typeHtml = '<div class="checkbox checkbox-success" onclick="selectClick(this)"><input name="type" type="checkbox" data-value=""><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label><span class="font-text-ckeck">紧急</span></div>'+
				'<div class="checkbox checkbox-success" onclick="selectClick(this)"><input name="type" type="checkbox" data-value="" checked="checked"><label for="chickes" id="ckLabel"><i class="fa fa-check"></i></label><span class="font-text-ckeck">不紧急</span></div>';
			}
			
			if(boolImage1 == true && boolImage2 == true){
				images = '<img src="/resources/image/icon-A.png">';
				fontColor = " dataTimeRed";
			}else if(boolImage1 == true && boolImage2 == false){
				images = '<img src="/resources/image/icon-B.png">';
			}else if(boolImage1 == false && boolImage2 == true){
				images = '<img src="/resources/image/icon-C.png">';
			}else if(boolImage1 == false && boolImage2 == false){
				images = '<img src="/resources/image/icon-D.png">';
			}
			
			var htmlUser = $(ids).parent().parent().parent().find(".user-table ul").html();
			
			var personHtml = "";
			
			$(ids).parent().parent().parent().find(".user-table ul li").each(function(){
				personHtml+='<span data_id="'+ $(this).attr("data-id") +'">'+ $(this).text() +'<i style="background-color: #F39C12;">未完成</i></span>';
			});
			
			var html = '<ul class="contentTitle">                                                                                                                    '+
			'<li>                                                                                                                               '+
			'	<div class="momen_dis" data-id="'+ tm_id +'"><a href="javascript:;" onclick="fontClick(this)"><span class="titleFont'+ fontColor +'">'+ title1 +'</span><span class="dataTime'+ fontColor +'">'+ hhss +'</span></a>	'+
			'		<div class="'+ $(ids).parent().parent().parent().attr("class") +'" style="display: none;">                                                                          '+
			'       <div class="icon-image-x">'+ images +'</div>'+
			'			<span class="arrow"><span class="inner-arrow"></span></span>                                                            '+
			'			<div class="new-event-content">                                                                                         '+
			'				<div class="new-event-content-title"><h3>'+ title +'</h3></div>                                              		'+
			'				<div class="new-event-content-model">                                                                               '+
			'					<dl style="height: 25px; line-height: 25px; color:#666;">                                                       '+
			'						<dt style="width: 48px;">安排人：</dt>                                                                          	'+
			'						<dd>'+ mainUser +'</dd>                                                                        			'+
			'					</dl>                                                                                                           '+
			'					<dl style="height: 25px; line-height: 25px; color:#666;">                                                       '+
			'						<dt style="width: 25px;">起：</dt>                                                                          	'+
			'						<dd>'+ startDate +'</dd>                                                                        			'+
			'					</dl>                                                                                                           '+
			'					<dl style="height: 25px; line-height: 25px; color:#666;">                                                      	'+
			'						<dt style="width: 25px;">止：</dt>                                                                          	'+
			'						<dd>'+ endDate +'</dd>                                                                        				'+
			'					</dl>                                                                                                           '+
			'					<dl style="height: 25px; line-height: 25px; color:#666;">                                                      	'+
			'						<dt style="width: 36px;">进度：</dt>                                                                          	'+
			'						<dd class="mainUser">'+ personHtml +'</dd>                                                                        				'+
			'					</dl>                                                                                                           '+
			'				</div>                                                                                                              '+
			'				<div class="new-event-footer">                                                                                      '+
			'					<a href="javascript:;">业务跟进</a>                                                                             	'+
			'					<a href="javascript:;" onclick="editMemorand(this)">编辑</a>                                                                                 	'+
			'					<a href="javascript:;" onclick="successMessage(this)">完成</a>                                                                                 	'+
			'					<a href="javascript:;" onclick="deleteData(this)">删除</a>                                                       '+
			'					</div>																											'+
			'				<div class="beizhuDiv">																												'+
			'					<textarea rows="" cols="" class="textBeizhu"></textarea>																			'+
			'				</div>																												'+
			'			</div>                                                                                                                  '+
			'		</div>                                                                                                                      '+
			'	</div>                                                                                                                          '+
			'	<div class="'+ $(ids).parent().parent().parent().attr("class") +'" style="display: none;">                                                                                                                                                                   '+
			'								<span class="arrow"><span class="inner-arrow"></span></span>                                                                                                                                                     '+
			'								<div class="new-event-content">                                                                                                                                                                                  '+
			'									<div class="new-event-content-title"><h3>修改事件</h3><span class="close" onclick="closeEvent(this)">×</span></div>                                                                                          '+
			'									<div class="new-event-content-model">                                                                                                                                                                        '+
			'										<dl style="height: auto; overflow: hidden;">                                                                                                                                                                                                     '+
			'											<dt>事件：</dt>                                                                                                                                                                                      '+
			'											<dd style="height: auto; overflow: hidden;"><textarea placeholder="创建一个事件内容" class="titleText" maxlength="150" onblur="onblurTitle(this)"></textarea></dd>                                                                                                                                        '+
			'										</dl>                                                                                                                                                                                                    '+
			'										<dl>                                                                                                                                                                                                     '+
			'											<dt>类型：</dt>                                                                                                                                                                                      '+
			'											<dd>                                                                                                                                                                                                 '+
														typeHtml+
			'											</dd>                                                                                                                                                                                                '+
			'										</dl>                                                                                                                                                                                                    '+
			'										<dl>                                                                                                                                                                                                     '+
			'											<dt>事件程度：</dt>                                                                                                                                                                                      '+
			'											<dd>                                                                                                                                                                                                 '+
														stateHtml +
			'											</dd>                                                                                                                                                                                                '+
			'										</dl>                                                                                                                                                                                                    '+
			'										<dl>                                                                                                                                                                                                     '+
			'											<dt>开始：</dt>                                                                                                                                                                                      '+
			'											<dd><input type="text" class="startDate" value="'+ startDate +'" readonly="readonly" /></dd>                                                                                                                           '+
			'										</dl>                                                                                                                                                                                                    '+
			'										<dl>                                                                                                                                                                                                     '+
			'											<dt>结束：</dt>                                                                                                                                                                                      '+
			'											<dd><input type="text" class="endDate" value="'+ endDate +'" readonly="readonly" /></dd>                                                                                                                           '+
			'										</dl>                                                                                                                                                                                                    '+
			'										<dl style="height: auto; overflow: hidden; position: relative;">                                                                                                                                                                                                     '+
			'											<dt>安排人：</dt>                                                                                                                                                                                      '+
			'											<dd>                                                                                                                           '+
			'												<i class="fa fa-plus-square" onclick="selectPersonDiv(this)"></i>                                                                                                                           '+
			'												<div class="user-table">                                                                                                                           '+
			'												<ul>                                                                                                                           '+
																htmlUser+
			'												</ul>                                                                                                                           '+
			'												</div>                                                                                                                           '+
			'											</dd>                                                                                                                           '+
			'										</dl>                                                                                                                                                                                                    '+
			'									</div>                                                                                                                                                                                                       '+
			'									<div class="new-event-footer">                                                                                                                                                                               '+
			'										<div class="more-font">更多选项</div>                                                                                                                                                                    '+
			'										<div class="btn-cencel">取消</div>                                                                                                                                                                       '+
			'										<div class="btn-confirm" onclick="updateSubmit(this)">提交</div>                                                                                                                                                                      '+
			'									</div>                                                                                                                                                                                                       '+
			'									<div class="user-person">                                                                                                                                                                                                               '+
			'										<div style="text-align: center;"><input type="text" class="user-input" placeholder="内部人员/电话" onkeyup="inputUser(this)"  /></div>                                                                                                                                                                                                               '+
			'										<div class="user-list">                                                                                                                                                                                                               '+
			'										<ul>                                                                                                                                                                                                               '+
			'										</ul>                                                                                                                                                                                                               '+
			'										</div>                                                                                                                                                                                                               '+
			'									</div>                                                                                                                                                                                                               '+
			'								</div>                                                                                                                                                                                                           '+
			'							</div>																									'+
			'</li>                                                                                                                              '+
			'</ul>';
			
			var date1 = new Date(Date.parse(yMdStart));
			var date2 = new Date(Date.parse(yMdEnd));
			
			$("table tbody tr").each(function(index){
				$(this).find("td").each(function(i){
					var dates = $(".yearMonth input").val().substring(0,$(".yearMonth input").val().indexOf("年"));
					var datesDay,datesMonth;
					if($(this).find(".tdTitle em").attr("data-type") == "1"){
						datesMonth = parseInt($(".yearMonth input").val().substring($(".yearMonth input").val().indexOf("年")+1,$(".yearMonth input").val().indexOf("月")));
						if(datesMonth == 1){
							dates = (parseInt($(".yearMonth input").val().substring(0,$(".yearMonth input").val().indexOf("年")))-1)
							datesMonth = 12;
						}else{
							if((datesMonth-1) < 10){
								datesMonth = "0"+(datesMonth-1);
							}else{
								datesMonth = datesMonth-1;
							}
						}
						datesDay = $(this).find("em").text();
						if(parseInt(datesDay) < 10){
							datesDay = "0"+datesDay;
						}else{
							datesDay = datesDay;
						}
					}else if($(this).find(".tdTitle em").attr("data-type") == "2"){
						datesMonth = parseInt($(".yearMonth input").val().substring($(".yearMonth input").val().indexOf("年")+1,$(".yearMonth input").val().indexOf("月")));
						if(datesMonth < 10){
							datesMonth = "0"+datesMonth;
						}else{
							datesMonth = datesMonth;
						}
						datesDay = $(this).find("em").text();
						if(parseInt(datesDay) < 10){
							datesDay = "0"+datesDay;
						}else{
							datesDay = datesDay;
						}
					}else if($(this).find(".tdTitle em").attr("data-type") == "3"){
						datesMonth = parseInt($(".yearMonth input").val().substring($(".yearMonth input").val().indexOf("年")+1,$(".yearMonth input").val().indexOf("月")));
						if(datesMonth == 12){
							dates = (parseInt($(".yearMonth input").val().substring(0,$(".yearMonth input").val().indexOf("年")))+1)
							datesMonth = "0"+1;
						}else{
							if((datesMonth+1) < 10){
								datesMonth = "0"+(datesMonth+1);
							}else{
								datesMonth = datesMonth+1;
							}
						}
						datesDay = $(this).find("em").text();
						if(parseInt(datesDay) < 10){
							datesDay = "0"+datesDay;
						}else{
							datesDay = datesDay;
						}
					}
					dates = dates+"-"+datesMonth+"-"+datesDay;
					var datet1 = new Date(Date.parse(dates));
					if(date1.getTime() <= datet1.getTime() && datet1.getTime() <= date2.getTime()){
						if($(this).find(".tdContent-data .contentTitle").length == 4){
							$("table tbody td .dateThingMore").width($("table tbody td").width()-8);
							$(this).find(".tdContent-data").append("<ul><li style='position: relative;'><i class='fa fa-ellipsis-h' onclick='dateThingMoreShowHide(this)'></i><div class='dateThingMore'></div></li></ul>");
						}
						if($(this).find(".tdContent-data .contentTitle").length > 3){
							$(this).find(".dateThingMore").append(html);
						}else{
							$(this).find(".tdContent-data").append(html);
						}
					}
				});
			});
			
			// 关闭新建事件
			$(ids).parent().parent().find("input[name='type']").attr("checked", false);
			$(ids).parent().parent().find("input[name='type']").each(function(i){
				if(i == 0){
					$(this).attr("checked", true);
				}
			});
			$(ids).parent().parent().find("input[name='state']").attr("checked", false);
			$(ids).parent().parent().find("input[name='state']").each(function(i){
				if(i == 1){
					$(this).attr("checked", true);
				}
			});
			$(ids).parent().parent().parent().find(".titleText").val("");
			$(ids).parent().parent().parent().attr("style","right: -393px;");
			$(ids).parent().parent().parent().hide();
			$(ids).parent().parent().next().hide();
			$(ids).parent().parent().next().find(".user-input").val("");
		}
	});
}

/**
 * 今天
 */
function toDay(){
	var toYear,toMonth;
	var date = new Date();
	toYear = returnDate(date).split("-")[0];
	toMonth = returnDate(date).split("-")[1];
	$(".yearMonth input").val(toYear+"年"+toMonth+"月");
	data();
}

/**
 * 计算周
 * 
 * @param val
 */
function weeks(val){
	switch (val)
	{
	case 0:
	  x="星期日";
	  break;
	case 1:
	  x="星期一";
	  break;
	case 2:
	  x="星期二";
	  break;
	case 3:
	  x="星期三";
	  break;
	case 4:
	  x="星期四";
	  break;
	case 5:
	  x="星期五";
	  break;
	case 6:
	  x="星期六";
	  break;
	}
	return x;
}

/**
 * 过滤HTML标签
 * 
 * @param str
 * @returns
 */
function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/ /ig,'');//去掉 
    return str;
}

// 删除数据
function deleteData(ids){
	var tm_id = $(ids).parent().parent().parent().parent().attr("data-id");
	$.ajax({
	    type: "POST",
	    url: "/userTaskMessage/updateTaskMessageState",
	    data: "tm_id="+tm_id+"&type=2",
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		$(ids).parent().parent().parent().parent().parent().parent().remove();
	    	}else{
	    		alert("删除失败！请刷新网页重新尝试")
	    	}
	    }
	});
	
	
}


/**
 * 任务完成填写内容
 * 
 * @param dis
 */
function successMessage(ids){
	
	var fontColor = " dataTimeCCC";
	
	if($(ids).parent().next().find("textarea").val() == ""){
		$(ids).parent().next().show();
	}else{
		var tm_id = $(ids).parent().parent().parent().parent().attr("data-id");
		$.ajax({
		    type: "POST",
		    url: "/userTaskMessage/updateTaskMessageState",
		    data: "tm_id="+tm_id+"&type=1"+"&text="+$(ids).parent().next().find("textarea").val(),
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(result) {
		    	if(result.message == "success"){
		    		$(ids).parent().parent().parent().parent().parent().parent().find(".dataTime").attr("class","dataTime dataTimeCCC");
		    		$(ids).parent().parent().parent().parent().parent().parent().find(".titleFont").attr("class","dataTimeCCC");
		    		$(ids).parent().parent().parent().parent().parent().parent().find(".icon-image-x").html('<img src="/resources/image/icon-success.png">');
		    		$(ids).parent().parent().parent().parent().parent().parent().find(".momen_dis a").css("background-color","");
		    		$(ids).parent().parent().parent().hide();
		    		$(ids).parent().parent().parent().parent().parent().parent().find(".mainUser span").each(function(i){
		    			if($(this).attr("data-id") == result.em_id){
		    				$(this).find("i").text("已完成");
		    				$(this).find("i").css("background-color","#1ABC9C");
		    			}
		    		});
		    		
		    		if(result.messages == "mainSuccess"){
		    			$(ids).parent().parent().parent().parent().parent().parent().find(".icon-image-x").html('<img src="/resources/image/icon-success.png">');
		    			$(ids).parent().parent().parent().parent().parent().parent().find(".mainUser i").css("background-color","#1ABC9C");
		    			$(ids).parent().parent().parent().parent().parent().parent().find(".mainUser i").text("已完成");
		    		}
		    	}else{
		    		alert("完成失败！请刷新网页重新尝试")
		    	}
		    }
		});
	}
}

/*========================接口调用规则=================================*/
/**
 * 事件插入接口调用
 * 
 * @param tm_text 插入事件内容
 * @param tm_type 任务消息类型 0：不紧急 1：紧急
 * @param tm_state 事件紧急程度 0：不重要 1：重要
 * @param tm_startTime 开始时间 2016-08-28
 * @param tm_startWeek 开始的日期是星期几
 * @param tm_endTime 结束时间 2016-08-28
 * @param tm_endWeek 结束的日期是星期几
 * @param personID 安排人编码(em_id) 3,8
 * @param tm_http 调用地址
 */
function addEvent(tm_text,tm_type,tm_state,tm_startTime,tm_startWeek,tm_endTime,tm_endWeek,personID,tm_http){
	$.ajax({
	    type: "POST",
	    url: "/userTaskMessage/addTaskMessage",
	    data: "tm_id="+tm_id 
	    +"&tm_text="+title
	    +"&tm_type="+messageType
	    +"&tm_state="+messageState
	    +"&tm_startTime="+tm_startTime
		+"&tm_startWeek="+tm_startWeek
		+"&tm_endTime="+tm_endTime
		+"&tm_endWeek="+tm_endWeek
		+"&personID="+personID
		+"&tm_http="+tm_http
		+"&tmType=1",
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    	}else{
	    	}
	    }
	});
}

/**
 * 获取url参数
 * 
 * @param name
 * @returns
 */
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
	}

function changeView(){
	$.ajax({url: '/memo/memoTimeLine', dataType: 'html'})
	.done(function(result){
		$('.memoListDiv').html("");
		$('.memoListDiv').html(result);
	});
}

// 业务操作
function hrefClick(ids){
	var _parent = $(ids).parent().parent().prev().prev();
	if($(_parent).find("img").attr("src") == "/resources/image/icon-success.png"){
		$.jBox.tip("已完成，不需要再次提交！");
		return;
	}
	if($(ids).attr("data-type") != null && $(ids).attr("data-type") != "null"){
		if($(ids).attr("data-type").indexOf("(\"") > 0){
			window.parent.href_mo($(ids).attr("data-type"),"房屋信息","存房库源");
		}else{
			eval($(ids).attr("data-type"));
		}
	}
}

// 房屋参加活动
function housePriceBool(hi_code){
	var submit = function (v, h, f) {
	    if (v == true) {
	    	$.ajax({
	    	    type: "POST",
	    	    url: "/housePrice/houseActiveTrue",
	    	    data:{
	    	    	hi_code : hi_code,
	    	    	hi_houseActive : 1
	    	    },
	    	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    	    dataType: "json",
	    	    success: function(result) {
	    	    	if(result.message == "success"){
	    	    		data();
	    	    		return true;
	    	    	}else{
	    	    		return false;
	    	    	}
	    	    }
	    	});
	    } else {
	    	$.ajax({
	    	    type: "POST",
	    	    url: "/housePrice/houseActiveTrue",
	    	    data:{
	    	    	hi_code : hi_code,
	    	    	hi_houseActive : 0
	    	    },
	    	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    	    dataType: "json",
	    	    success: function(result) {
	    	    	if(result.message == "success"){
	    	    		data();
	    	    		return true;
	    	    	}else{
	    	    		return false;
	    	    	}
	    	    }
	    	});
	    }
	};
	$.jBox.confirm("确定该房屋是否被公司回收么？", "提示", submit, { buttons: { '是': true, '否': false} });
}