$(function(){
	dataBing();
});

/**
 * 开始读取数据
 */
function dataBing(){
	$.ajax({
		type: "POST",
	    url: "/achievement/selectUcAchivmentMoneyMore",
	    data: "sa_id="+getUrlParam("sa_id"),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$.each(result.achievementSumAchievements, function(index, item) {
	    		$("#sa_id").html(item.sa_id);
	    		$("#houseCode").html(item.hi_code);
	    		$("#address").html(item.propertyInfo_name+" "+ item.hi_address);
	    		$("#newMoney").html(item.sa_newMoney+"元");
	    		$("#oldMoney").html(item.sa_oldMoney+"元");
	    		var state = "";
	    		if(item.sa_auditType == 0){
	    			state="<font color='#E74C3C'>未审核</font>";
	    		}else{
	    			state="<font color='#1ABC9C'>已审核</font>";
	    		}
	    		$("#state").html(state);
	    		var lossDay = 0;
				if(item.sa_lossDay < 0){
					lossDay = "<font style='color:#E74C3C'>"+item.sa_lossDay+"天</font>";
				}
				var lossMoney = 0;
				if(item.sa_lossDay < 0){
					lossMoney = "<font style='color:#E74C3C'>"+item.sa_lossMoney+"元</font>";
				}
				$("#lossDay").html(lossDay);
				$("#lossMoney").html(lossMoney);
				$("#contractDate").html(item.sa_startEndTime);
	    	});
	    	
	    	var outHtml1 = "";
	    	var outEM1 = 0;
	    	var outOldMoney1 = 0;
	    	var outNewMoney1 = 0;
	    	var outRentDay1 = 0;
	    	var outPercentage1 = 0.0;
	    	var outMoneyType1 = "";
	    	var outName1 = "";
	    	var outEmID1 = "";
	    	var outID1 = 0;
	    	var outContract1 = 0;
	    	var outBuMoney1 = 0;
	    	
	    	var outHtml2 = "";
	    	var outEM2 = 0;
	    	var outOldMoney2 = 0;
	    	var outNewMoney2 = 0;
	    	var outRentDay2 = 0;
	    	var outPercentage2 = 0.0;
	    	var outMoneyType2 = "";
	    	var outName2 = "";
	    	var outEmID2 = "";
	    	var outID2 = 0;
	    	var outContract2 = 0;
	    	var outBuMoney2 = 0;
	    	
	    	var saveHtml1 = "";
	    	var saveEM1 = 0;
	    	var saveOldMoney1 = 0;
	    	var saveNewMoney1 = 0;
	    	var saveRentDay1 = 0;
	    	var savePercentage1 = 0.0;
	    	var saveMoneyType1 = "";
	    	var saveName1 = "";
	    	var saveEmID1 = "";
	    	var saveID1 = 0;
	    	var saveContract1 = 0;
	    	var saveBuMoney1 = 0;
	    	
	    	var saveHtml2 = "";
	    	var saveEM2 = 0;
	    	var saveOldMoney2 = 0;
	    	var saveNewMoney2 = 0;
	    	var saveRentDay2 = 0;
	    	var savePercentage2 = 0.0;
	    	var saveMoneyType2 = "";
	    	var saveName2 = "";
	    	var saveEmID2 = "";
	    	var saveID2 = 0;
	    	var saveContract2 = 0;
	    	var saveBuMoney2 = 0;
	    	
	    	$.each(result.achievementBills, function(index, item) {
	    		$("#payType").html(item.ab_moneyType);
	    		
	    		if(item.ab_ctype == 2){
	    			if(outEM1 == ""){
	    				outEM1 = item.em_id;
	    				outRentDay1 = item.ab_lossDay;
	    				outPercentage1 = item.ab_moneyPercentage;
	    				outMoneyType1 = item.ab_type;
	    				outEmID1 = item.em_id;
	    				outName1 = item.em_name;
	    				outContract1 = item.contractObject_Id;
	    				outID1 = item.ab_id+",";
	    				$.each(result.selectAchievementBillContents, function(index, items) {
	    					if(item.ab_id == items.ab_id){
	    						if(items.abc_type == "业绩补贴"){
		    						outBuMoney1 = items.abc_money;
		    					}
	    					}
	    				});
	    			}else if(outEmID1 == item.em_id){
	    				outID1 += item.ab_id+",";
	    			}
	    			if(outEM2 == "" && item.em_id != outEM1){
	    				outEM2 = item.em_id;
	    				outRentDay2 = item.ab_lossDay;
	    				outPercentage2 = item.ab_moneyPercentage;
	    				outMoneyType2 = item.ab_type;
	    				outEmID2 = item.em_id;
	    				outName2 = item.em_name;
	    				outContract2 = item.contractObject_Id;
	    				outID2 = item.ab_id+",";
	    				$.each(result.selectAchievementBillContents, function(index, items) {
	    					if(item.ab_id == items.ab_id){
		    					if(items.abc_type == "业绩补贴"){
		    						outBuMoney2 = items.abc_money;
		    					}
	    					}
	    				});
	    			}else if(outEmID2 == item.em_id){
	    				outID2 += item.ab_id+",";
	    			}
	    			if(item.em_id == outEM1){
	    				outOldMoney1 += item.ab_oldMoney;
	    				outNewMoney1 += item.ab_newMoney;
	    			}
	    			if(item.em_id == outEM1){
	    				outOldMoney2 += item.ab_oldMoney;
	    				outNewMoney2 += item.ab_newMoney;
	    			}
	    		}
	    		
	    		if(item.ab_ctype == 1){
	    			if(saveEM1 == ""){
	    				saveEM1 = item.em_id;
	    				saveRentDay1 = item.ab_lossDay;
	    				savePercentage1 = item.ab_moneyPercentage;
	    				saveMoneyType1 = item.ab_type;
	    				saveEmID1 = item.em_id;
	    				saveName1 = item.em_name;
	    				saveContract1 = item.contractObject_Id;
	    				saveID1 = item.ab_id+",";
	    				$.each(result.selectAchievementBillContents, function(index, items) {
	    					if(item.ab_id == items.ab_id){
		    					if(items.abc_type == "业绩补贴"){
		    						saveBuMoney1 = items.abc_money;
		    					}
	    					}
	    				});
	    			}else if(saveEM1 == item.em_id){
	    				saveID1 += item.ab_id+",";
	    			}
	    			if(saveEM2 == "" && item.em_id != saveEM1){
	    				saveEM2 = item.em_id;
	    				saveRentDay2 = item.ab_lossDay;
	    				savePercentage2 = item.ab_moneyPercentage;
	    				saveMoneyType2 = item.ab_type;
	    				saveMoneyType2 = saveMoneyType2.substring(0,saveMoneyType2.length-1)+"提";
	    				saveEmID2 = item.em_id;
	    				saveName2 = item.em_name;
	    				saveContract2 = item.contractObject_Id;
	    				saveID2 = item.ab_id+",";
	    				$.each(result.selectAchievementBillContents, function(index, items) {
	    					if(item.ab_id == items.ab_id){
		    					if(items.abc_type == "业绩补贴"){
		    						saveBuMoney2 = items.abc_money;
		    					}
	    					}
	    				});
	    			}else if(saveEM2 == item.em_id){
	    				saveID2 += item.ab_id+",";
	    			}
	    			if(item.em_id == saveEM1){
	    				saveOldMoney1 += item.ab_oldMoney;
	    				saveNewMoney1 += item.ab_newMoney;
	    			}
	    			if(item.em_id == saveEM2){
	    				saveOldMoney2 += item.ab_oldMoney;
	    				saveNewMoney2 += item.ab_newMoney;
	    			}
	    		}
	    		
	    	});
	    	
	    	if(outID1 != ""){
	    		outID1 = outID1.substring(0,outID1.length-1);
	    	}
	    	if(outID2 != ""){
	    		outID2 = outID2.substring(0,outID2.length-1);
	    	}
	    	if(saveID1 != ""){
	    		saveID1 = saveID1.substring(0,saveID1.length-1);
	    	}
	    	if(saveID2 != ""){
	    		saveID2 = saveID2.substring(0,saveID2.length-1);
	    	}
	    	
	    	if(outEM1 != 0){
	    		outHtml1 += '<div class="outHouseContent">'+
	        	'<div class="title" data-id="'+ outID1 +'" data-emid="'+ outEmID1 +'" data-contract="'+ outContract1 +'" onclick="openModel(this,\'sginInfo\',2,\'left\');">'+ outName1 +'</div>'+
	            '<dl>'+
	            	'<dt>新业绩：</dt>'+
	                '<dd><input type="text" onblur="moneyReckon()" value="'+ outNewMoney1 +'" />元</dd>'+
	            '</dl>'+
	            '<dl>'+
	            	'<dt>旧业绩：</dt>'+
	                '<dd><input type="text" onblur="moneyReckon()" value="'+ outOldMoney1 +'" />元</dd>'+
	            '</dl>'+
	            '<dl>'+
	            	'<dt>补贴业绩：</dt>'+
	                '<dd><input type="text" onblur="moneyReckon()" value="'+ outBuMoney1 +'" />元</dd>'+
	            '</dl>'+
	            '<dl>'+
	            	'<dt>提取方式：</dt>'+
	                '<dd>'+ outMoneyType1 +'</dd>'+
	            '</dl>'+
	            '<dl>'+
	            	'<dt>套数：</dt>'+
	                '<dd>'+ outPercentage1 +' 套</dd>'+
	            '</dl>'+
	    	'</div>';
	    	}
	    	
	    	if(outEM2 != 0){
	    		outHtml2 += '<div class="outHouseContent">'+
	    		'<div class="title" data-id="'+ outID2 +'" data-emid="'+ outEmID2 +'" data-contract="'+ outContract2 +'" onclick="openModel(this,\'sginInfo\',2,\'left\');">'+ outName2 +'</div>'+
	            '<dl>'+
	            	'<dt>新业绩：</dt>'+
	                '<dd><input type="text" onblur="moneyReckon()" value="'+ outNewMoney2 +'" />元</dd>'+
	            '</dl>'+
	            '<dl>'+
	            	'<dt>旧业绩：</dt>'+
	                '<dd><input type="text" onblur="moneyReckon()" value="'+ outOldMoney2 +'" />元</dd>'+
	            '</dl>'+
	            '<dl>'+
	            	'<dt>补贴业绩：</dt>'+
	                '<dd><input type="text" onblur="moneyReckon()" value="'+ outBuMoney2 +'" />元</dd>'+
	            '</dl>'+
	            '<dl>'+
	            	'<dt>提取方式：</dt>'+
	                '<dd>'+ outMoneyType2 +'</dd>'+
	            '</dl>'+
	            '<dl>'+
	            	'<dt>套数：</dt>'+
	                '<dd>'+ outPercentage2 +' 套</dd>'+
	            '</dl>'+
	    	'</div>';
	    	}
	    	
	    	if(saveEM1 != 0){
	    		saveHtml1 += '<div class="outHouseContent">'+
	        	'<div class="title" data-id="'+ saveID1 +'" data-emid="'+ saveEmID1 +'" data-contract="'+ saveContract1 +'" onclick="openModel(this,\'sginInfo\',2,\'right\');">'+ saveName1 +'</div>'+
	            '<dl>'+
	            	'<dt>新业绩：</dt>'+
	                '<dd><input type="text" onblur="moneyReckon()" value="'+ saveNewMoney1 +'" />元</dd>'+
	            '</dl>'+
	            '<dl>'+
	            	'<dt>旧业绩：</dt>'+
	                '<dd><input type="text" onblur="moneyReckon()" value="'+ saveOldMoney1 +'" />元</dd>'+
	            '</dl>'+
	            '<dl>'+
	            	'<dt>补贴业绩：</dt>'+
	                '<dd><input type="text" onblur="moneyReckon()" value="'+ saveBuMoney1 +'" />元</dd>'+
	            '</dl>'+
	            '<dl>'+
	            	'<dt>提取方式：</dt>'+
	                '<dd>'+ saveMoneyType1 +'</dd>'+
	            '</dl>'+
	            '<dl>'+
	            	'<dt>套数：</dt>'+
	                '<dd>'+ savePercentage1 +' 套</dd>'+
	            '</dl>'+
	    	'</div>';
	    	}
	    	
	    	if(saveEM2 != 0){
	    		saveHtml2 += '<div class="outHouseContent">'+
	    		'<div class="title" data-id="'+ saveID2 +'" data-emid="'+ saveEmID2 +'" data-contract="'+ saveContract2 +'" onclick="openModel(this,\'sginInfo\',2,\'right\');">'+ saveName2 +'</div>'+
	            '<dl>'+
	            	'<dt>新业绩：</dt>'+
	                '<dd><input type="text" onblur="moneyReckon()" value="'+ saveNewMoney2 +'" />元</dd>'+
	            '</dl>'+
	            '<dl>'+
	            	'<dt>旧业绩：</dt>'+
	                '<dd><input type="text" onblur="moneyReckon()" value="'+ saveOldMoney2 +'" />元</dd>'+
	            '</dl>'+
	            '<dl>'+
	            	'<dt>补贴业绩：</dt>'+
	                '<dd><input type="text" onblur="moneyReckon()" value="'+ saveBuMoney2 +'" />元</dd>'+
	            '</dl>'+
	            '<dl>'+
	            	'<dt>提取方式：</dt>'+
	                '<dd>'+ saveMoneyType2 +'</dd>'+
	            '</dl>'+
	            '<dl>'+
	            	'<dt>套数：</dt>'+
	                '<dd>'+ savePercentage2 +' 套</dd>'+
	            '</dl>'+
	    	'</div>';
	    	}
	    	
	    	$("#contentDivLeft").html(outHtml1);
	    	$("#contentDivLeft").append(outHtml2);
	    	$("#contentDivRight").html(saveHtml1);
	    	$("#contentDivRight").append(saveHtml2);
	    	
	    }
	});
}

/**
 * 提交修改房屋业绩
 */
function submitAchievement(){
	var str = "{";
	str+='"data1":[';
	var strDate = "";
			str+="{";
			str+='"sa_id":'+ $("#sa_id").text() +',';
			str+='"hi_code":"'+ $("#houseCode").text() +'",';
			str+='"sa_oldMoney":'+ $("#newMoney").text().replace("元","") +',';
			str+='"sa_newMoney":'+ $("#oldMoney").text().replace("元","") +'';
			str+="}";
	str+=']';
	str+=',"data2":[';
	$("#contentDivLeft .outHouseContent").each(function(index){
		var split = $(this).find(".title").attr("data-id").split(",");
		for (var i = 0; i < split.length; i++) {
			str+="{";
			str+='"ab_id":'+ split[i] +',';
			str+='"em_id":"'+ $(this).find(".title").attr("data-emid") +'",';
			str+='"contractObject_Id":"'+ $(this).find(".title").attr("data-contract") +'",';
			$(this).find("dl").each(function(i){
				if(i == 0){
					str+='"ab_newMoney":"'+ parseFloat($(this).find("dd input").val())/(split.length) +'",';
					str+='"ab_moneyType":"'+ $("#payType").text() +'",';
				}
				if(i == 1){
					str+='"ab_oldMoney":"'+ parseFloat($(this).find("dd input").val())/(split.length) +'",';
				}
				if(i == 2){
					str+='"subsidy":"'+  parseFloat($(this).find("dd input").val())/(split.length) +'",';
					str+='"subsidySum":"'+ $(this).find("dd input").val() +'"';
				}
			});
			str+="},";
		}
	});
	$("#contentDivRight .outHouseContent").each(function(index){
		var split = $(this).find(".title").attr("data-id").split(",");
		for (var i = 0; i < split.length; i++) {
			str+="{";
			str+='"ab_id":'+ split[i] +',';
			str+='"em_id":"'+ $(this).find(".title").attr("data-emid") +'",';
			str+='"contractObject_Id":"'+ $(this).find(".title").attr("data-contract") +'",';
			$(this).find("dl").each(function(i){
				if(i == 0){
					str+='"ab_newMoney":"'+ parseFloat($(this).find("dd input").val())/(split.length) +'",';
					str+='"ab_moneyType":"'+ $("#payType").text() +'",';
				}
				if(i == 1){
					str+='"ab_oldMoney":"'+ parseFloat($(this).find("dd input").val())/(split.length) +'",';
				}
				if(i == 2){
					str+='"subsidy":"'+  parseFloat($(this).find("dd input").val())/(split.length) +'",';
					str+='"subsidySum":"'+ $(this).find("dd input").val() +'"';
				}
			});
			str+="},";
		}
	});
	str = str.substring(0,str.length-1);
	str+=']';
	str += "}";
	$.ajax({
		type: "POST",
	    url: "/achievement/achivmentMoneyUpdate",
	    data: "json="+str,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message = "success"){
	    		alert("修改成功");
	    	}else{
	    		alert("修改失败");
	    	}
	    }
	});
}

/** 计算业绩 **/
function moneyReckon(){
	var outNewMoney = 0.0;
	var outOldMoney = 0.0;
	var outSubsidyMoney = 0.0;
	$("#contentDivLeft .outHouseContent").each(function(index){
		$(this).find("dl").each(function(i){
			if(i == 0){
				outNewMoney += parseFloat($(this).find("dd input").val());
			}else if(i == 1){
				outOldMoney += parseFloat($(this).find("dd input").val());
			}else if(i == 2){
				outSubsidyMoney += parseFloat($(this).find("dd input").val());
			}
		});
	});
	
	var saveNewMoney = 0.0;
	var saveOldMoney = 0.0;
	var saveSubsidyMoney = 0.0;
	$("#contentDivRight .outHouseContent").each(function(index){
		$(this).find("dl").each(function(i){
			if(i == 0){
				saveNewMoney += parseFloat($(this).find("dd input").val());
			}else if(i == 1){
				saveOldMoney += parseFloat($(this).find("dd input").val());
			}else if(i == 2){
				saveSubsidyMoney += parseFloat($(this).find("dd input").val());
			}
		});
	});
	
	$("#newMoney").text(outNewMoney+saveNewMoney+"元");
	$("#oldMoney").text(outOldMoney+saveOldMoney+"元");
}



/** =========================内部人员查询============================= **/
/** 查询客户信息*/
function openModel(obj, param, state, type) {
	var _windowHeight =window.innerHeight;
	if (!isEmpty(_windowHeight) && parseInt(_windowHeight) < 700) {
		$(".model-main").css({
			height: "412px",
    		overflow: "auto"
		});
	} else {
		$(".model-main").css({
			height: "auto",
    		overflow: "inherit"
		});
	}
	// 初始化
	var $commonId = $(obj).attr("data-emid");
	showSginList($commonId,state,type);
	
	$(".model-content").hide();
	$(".model-mark,#sginInfo").show();
	// 搜索框绑定
	$("#sginInfo-search").bind("input propertychange",function(){
		$("#pageNo").val(1);
		showSginList($commonId,state,type);
	}).focus();
	// 显示搜索结果
	var choose = function(index){
		$('#sginInfo-Body>tr').removeClass('item-hover').eq(index).addClass('item-hover');
	}
}

/** 显示客户列表信息*/
function showSginList(param,statet,type){
	$("#sginInfo-search").attr("placeholder","客户姓名、手机号码");
	$("#sginBtn").hide();
	$(".model-list thead").html('<tr><th width="20%">客户姓名</th><th width="10%">性别</th><th width="30%">手机号</th></tr>');
	if(statet == 1){
		$("#model-drag-title").text("内部人员");
	}
	var _body = $("#sginInfo-Body").html("");
	$.ajax({
	    type: "POST",
	    url: "/customerSee/userEmList",
	    data: "param="+$("#sginInfo-search").val()+"&pageNo="+$("#pageNo").val()+"&state="+statet,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
			if(result.code != "0"){
				_body.empty();
				$.each(result.data, function(index, data) {
					var sex = "女";
					if(data.em_sex == "man")
						sex = "男";
					_body.append(
							'<tr onclick="trClick(\''+ data.em_name +'\',\''+ data.em_id +'\',\''+ type +'\')">' +
								'<td class="data0"><input type="hidden" class="dataId" value="'+ data.em_id +'">'+ data.em_name +'</td>' +
								
								'<td class="data1">'+ sex +'</td>' +
								'<td class="data2">'+ data.em_phone +'</td>' +
							'</tr>');
				});
				$("#totalPage").text(result.count.countSize);
				$("#totalRecords").text(result.count.size);
			}
	    }
	});
}

/**
 * 选择内部人员查询
 * 
 * @param name
 * @param id
 */
function trClick(name,id,type){
	if(type == "left"){
		$("#contentDivLeft .title").text(name);
		$("#contentDivLeft .title").attr("data-emid",id);
	}else{
		$("#contentDivRight .title").text(name);
		$("#contentDivRight .title").attr("data-emid",id);
	}
	closeModel();
}

/** 设置客户信息*/
function setSginInfo(obj, param) {
	var $this =$(obj);
	var $did =$this.find(".data-emid").val();
	var signid =$("#sign-id").val();
	if($did == signid){
		alert("该客户已选择");
		return;
	}
	var boo =false;
	$.each($("input[type='hidden'].form-input"), function(index){
		if ($(this).val() == $did) {
			alert("该客户已选择");
			boo = true;
			return false;
		}
	});
	if (boo) return;
	$("#userName").val($this.find(".data0").text());
	if($this.find(".data1").text() == "男"){
		$("#selectSex").html("<option>男</option><option>女</option><option>其他</option>");
	}else if($this.find(".data1").text() == "女"){
		$("#selectSex").html("<option>女</option><option>男</option><option>其他</option>");
	}else{
		$("#selectSex").html("<option>其他</option><option>男</option><option>女</option>");
	}
	$("#userPhone").val($this.find(".data2").text());
	closeModel();
}


/** 清除内部人员 */
function cleanEM(){
	$("#emName").val("");
	$("#emID").val("");
	$(".centers").html("");
	data();
}

/** 关闭Model*/
function closeModel(){
	$(".model-mark,.model-content").hide();
	$(".model-content #sginInfo-search").val("");
}

/** 跳页*/
function bindUpDown(){
	var pageNo = returnNumber($("#pageNo").val());
	var totalPage =returnNumber($("#totalPage").text());
	if (pageNo > totalPage || pageNo < 1) return;
	$("#pageNo").val(pageNo);
	if($("#model-drag-title").text() == "内部人员"){
		showSginList('sginInfo',1);
	}
}

/** 分页--[上一页]*/
function pageUp(){
	var pageNo = returnNumber($("#pageNo").val());
	if (pageNo <= 1) {
		return;
	}
	var totalPage =returnNumber($("#totalPage").text());
	if(pageNo > totalPage){
		$("#pageNo").val(totalPage);
	} else {
		$("#pageNo").val(pageNo - 1);
	}
	if($("#model-drag-title").text() == "内部人员"){
		showSginList('sginInfo',1);
	}
}

/** 分页--[下一页]*/
function pageDown(){
	var pageNo = returnNumber($("#pageNo").val());
	var totalPage = returnNumber($("#totalPage").text());
	if (pageNo >= totalPage) {
		return;
	}
	$("#pageNo").val(pageNo + 1);
	if($("#model-drag-title").text() == "内部人员"){
		showSginList('sginInfo',1);
	}
}
/** 切换窗口1*/
function moveModelMainLeft(){
	$("#addCustomerBtn").show();
	$('#main1').animate({marginLeft:'-700px', opacity:0}, 300, '', function(){
		$(this).hide();
		$(this).css("marginLeft",0);
		$("#main2").show().animate({opacity:1}, 200);
		$("#model-drag-title").text('添加内部人员');
		$("#main2 input[type='text']:first").focus();
	});
}

/** 切换窗口2*/
function moveModelMainRight(){
	$('#main2').animate({marginRight:'-700px', opacity:0}, 300, '', function(){
		$(this).hide();
		$(this).css("marginRight",0);
		$("#main1").show().animate({opacity:1}, 200);
		$("#model-drag-title").text('客户资料');
		$("#main1 input[type='text']:first").focus();
	});
	$('#main2').find(".tisp").removeClass("error").empty();
	$('#main2').find("#listMore-box").hide();
	$('#main2').find(".imgTisp").html('<span><span id="card1-tisp">0</span>/1</span>');
	$('#main2').find(".uploadify").show();
	$('#main2').find(".form-control").val("").removeClass("input-error");
	$("#main2").find(".images-box-img").remove();
	showSginList('sginInfo',0);
}

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}