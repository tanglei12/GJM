// JavaScript Document

$(function(){
	$("#settingMoney").click(function(){
		if($(".setting").is(":hidden")){
			$(".setting").show();
		}else{
			$(".setting").hide();
		}
	});
	
	// 时间控件
	$("#startTime,#endTime").datepicker();
	
	databing();
	
	$("#dataTime").click(function(){
		if($(".timeTable").is(":hidden")){
			$(".timeTable").show();
		}else{
			$(".timeTable").hide();
		}
	});
	
});

//光标离开后调整业绩
function inputBlur(ids){
	//总业绩
	var sumMoney = 0;
	//新业绩
	var newMoney = 0;
	var type = $(ids).attr("data-type");
	if(type == "sumNewMoney"){
		if(parseInt($(ids).parent().prev().find("input").val()) < parseInt($(ids).val())){
			$(ids).val($(ids).parent().prev().find("input").val());
		}
	}
	if(type == "sumSumMoney" || type == "sumMoney"){
		$(ids).parent().next().next().text(parseInt($(ids).val())-parseInt($(ids).parent().next().find("input").val())+"元");
	}else if(type == "sumNewMoney" || type == "newMoney"){
		$(ids).parent().next().text(parseInt($(ids).parent().prev().find("input").val())-parseInt($(ids).val())+"元");
	}
	
	$(".MoneyData table tbody tr").each(function(index){
		if(index == 0){
			$(this).find("td").each(function(inde){
				if(inde == 2){
					newMoney = $(this).find("input").val();
				}else if(inde == 1){
					sumMoney = $(this).find("input").val();
				}
			});
		}
	});
	
	// 部门总金额
	var departmentMoney = 0;
	var departmentNewMoney = 0;
	$(".MoneyData table tbody tr").each(function(index){
		if(index != 0){
			$(this).find("td").each(function(inde){
				if(inde == 1){
					departmentMoney += parseInt($(this).find("input").val());
				}else if(inde == 2){
					departmentNewMoney += parseInt($(this).find("input").val());
				}
			});
		}
	});
	
	var money = sumMoney-departmentMoney;
	if(money > 0){
		money = "+"+money
	}
	$(".errorFont").text(money+"元");
	var money1 = newMoney-departmentNewMoney;
	if(money1 > 0){
		money1 = "+"+money1
	}
	$(".errorNewFont").text(money1+"元");
	
}

/**
 * 文本框只能输入0-100的正整数
 * 
 * @param ids
 */
function scaleNum(ids){
	ids.value=ids.value.replace(/\D/g,'');
	if(parseInt($(ids).val()) > 100){
		$(ids).val("100");
	}else if(parseInt($(ids).val()) < 0){
		$(ids).val("0");
	}
}

/**
 * 选择时间查询
 * 
 * @param ids
 */
function timeClick(ids){
	$(".timeTable span").css("background-color","#FFF");
	$(".timeTable span").css("color","#000")
	$(ids).css("background-color","#1ABC9C");
	$(ids).css("color","#FFF");
	$("#dataTime").val($(ids).text());
	$(".timeTable").hide();
	databing();
}

/**
 * 增加出房补贴
 * 
 * @param ids
 */
function addSubsidy(ids){
	$(ids).next().append('<dl style="width: 100%;">'+
		'<dt><select><option value="新出房">新出房</option><option value="转租房">转租房</option><option value="到期房">到期房</option><option value="退租房">退租房</option><option value="强收房">强收房</option></select></dt>'+
		'<dd>不满半月租金,按前份合同租金的  <input type="text" value="50"  onkeyup="scaleNum(this)" /> % <i class="fa fa-minus-square" onclick="removeHouseB(this)"></i></dd>'+
	'</dl>');
}

/**
 * 删除出房补贴
 * 
 * @param ids
 */
function removeHouseB(ids){
	$(ids).parent().parent().remove();
}

//开始加载数据
function databing(){
	var dateStr = returnDate(new Date()).split("-")[0]+"-"+returnDate(new Date()).split("-")[1]+"-"+"01"+"~"+returnDate(new Date()).split("-")[0]+"-"+returnDate(new Date()).split("-")[1]+"-"+getLastDay(returnDate(new Date()).split("-")[0],returnDate(new Date()).split("-")[1]);
	var dates = "";
	if($("#dataTime").val() == ""){
		dates = dateStr;
	}else{
		dates = $("#dataTime").val();
	}
	$.ajax({
		type: "POST",
	    url: "/achievement/selectAchievementSetting",
	    data: "ca_startEndDate="+dates,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$(".MoneyData table tbody").html("");
	    	$("#as_id").text(result.achievementSetting.as_id);
	    	if(result.companyAchievements.length == 0){
	    		$(".MoneyData table tbody").html("");
	    		$(".timeTable").html("");
	    		if(dates != ""){
	    			$("#dataTime").val(dates);
	    		}
	    		$.each(result.selectCompanyAchievementDate, function(index, item) {
    				$(".timeTable").append("<span onclick='timeClick(this)'>"+ item.ca_startEndDate +"</span>");
	    		});
	    	}else{
	    		$(".timeTable").html("");
	    		if(dates != ""){
	    			$("#dataTime").val(dates);
	    		}
	    		$.each(result.selectCompanyAchievementDate, function(index, item) {
    				$(".timeTable").append("<span onclick='timeClick(this)'>"+ item.ca_startEndDate +"</span>");
	    		});
	    		
	    		$(".MoneyData table tbody").html("");
	    		$.each(result.companyAchievements, function(index, item) {
		    		$("#ca_id").text(item.ca_id);
		    		if(index == 0){
		    			var sumMoney = item.ca_sum;
		    			var sumCompany = item.ca_sumCompany;
		    			var newMoney = item.ca_new;
		    			var newCompany = item.ca_newCompany;
		    			var xMoney =  parseInt(sumMoney)-parseInt(newMoney);
		    			var strDate = item.ca_startEndDate.split("~");
		    		    var html = "<tr><td>公司目标</td>"+
		    		    "<td><input class='tableInput' style='width:"+ Textadapt(''+sumMoney+'') +"' type='text' value='"+ sumMoney +"' data-type='sumSumMoney' onblur='inputBlur(this)' /><span style='margin-left:3px;'>"+ sumCompany +"</span></td>"+
			    	    "<td><input class='tableInput' style='width:"+ Textadapt(''+newMoney+'') +"' type='text' value='"+ newMoney +"' data-type='sumNewMoney' onblur='inputBlur(this)' /><span style='margin-left:3px;'>"+ newCompany +"</span></td>"+
			    	    "<td>"+ xMoney +"<span style='margin-left:3px;'>"+ sumCompany +"</span></td>"+
			    	    "<td><input class='tableInputD' style='width:"+ Textadapt(''+ strDate[0]+'') +"' type='text' value='"+  strDate[0] +"' readonly='true' /></td>"+
			    	    "<td><input class='tableInputD' style='width:"+ Textadapt(''+ strDate[1]+'') +"' type='text' value='"+  strDate[1] +"' readonly='true' /></td>"+
			    	    "<td><i class='icon-remove-sign' style='font-size: 19px; color:#E74C3C' onclick='closeTR(this)'></i></td>"+
			    	    "</tr>";
			    	    
		    		    var sumMoney = item.ta_sum;
		    			var sumCompany = item.ta_sumCompany;
		    			var newMoney = item.ta_new;
		    			var newCompany = item.ta_newCompany;
		    			var xMoney =  parseInt(sumMoney)-parseInt(newMoney);
		    		    html += "<tr style='border-top:1px solid #1ABC9C; border-right:1px solid #1ABC9C; border-left:1px solid #1ABC9C;'><td>"+ item.ucc_name +"</td>"+
		    		    "<td><input class='tableInput' style='width:"+ Textadapt(''+sumMoney+'') +"' type='text' value='"+ sumMoney +"' data-type='sumMoney' onblur='inputBlur(this)' /><span style='margin-left:3px;'>"+ sumCompany +"</span></td>"+
			    	    "<td><input class='tableInput' style='width:"+ Textadapt(''+newMoney+'') +"' type='text' value='"+ newMoney +"' data-type='newMoney' onblur='inputBlur(this)' /><span style='margin-left:3px;'>"+ newCompany +"</span></td>"+
			    	    "<td>"+ xMoney +"<span style='margin-left:3px;'>"+ sumCompany +"</span></td>"+
			    	    "<td></td>"+
			    	    "<td></td>"+
			    	    "<td></td>"+
			    	    "<td style='display:none;'>"+ item.ta_id +"</td>"+
			    	    "<td style='display:none;'>"+ item.ucc_id +"</td>"+
			    	    "</tr>";
		    		}else if((index+1) == result.companyAchievements.length){
		    			var sumMoney = item.ta_sum;
		    			var sumCompany = item.ta_sumCompany;
		    			var newMoney = item.ta_new;
		    			var newCompany = item.ta_newCompany;
		    			var xMoney =  parseInt(sumMoney)-parseInt(newMoney);
		    		    var html = "<tr style='border-right:1px solid #1ABC9C; border-left:1px solid #1ABC9C;  border-bottom:1px solid #1ABC9C;'><td>"+ item.ucc_name +"</td>"+
		    		    "<td><input class='tableInput' style='width:"+ Textadapt(''+sumMoney+'') +"' type='text' value='"+ sumMoney +"' data-type='sumMoney' onblur='inputBlur(this)' /><span style='margin-left:3px;'>"+ sumCompany +"</span></td>"+
			    	    "<td><input class='tableInput' style='width:"+ Textadapt(''+newMoney+'') +"' type='text' value='"+ newMoney +"' data-type='newMoney' onblur='inputBlur(this)' /><span style='margin-left:3px;'>"+ newCompany +"</span></td>"+
			    	    "<td>"+ xMoney +"<span style='margin-left:3px;'>"+ sumCompany +"</span></td>"+
			    	    "<td></td>"+
			    	    "<td></td>"+
			    	    "<td></td>"+
			    	    "<td style='display:none;'>"+ item.ta_id +"</td>"+
			    	    "<td style='display:none;'>"+ item.ucc_id +"</td>"+
			    	    "</tr>"
		    		}else{
		    			var sumMoney = item.ta_sum;
		    			var sumCompany = item.ta_sumCompany;
		    			var newMoney = item.ta_new;
		    			var newCompany = item.ta_newCompany;
		    			var xMoney =  parseInt(sumMoney)-parseInt(newMoney);
		    		    var html = "<tr style='border-right:1px solid #1ABC9C; border-left:1px solid #1ABC9C;'><td>"+ item.ucc_name +"</td>"+
		    		    "<td><input class='tableInput' style='width:"+ Textadapt(''+sumMoney+'') +"' type='text' value='"+ sumMoney +"' data-type='sumMoney' onblur='inputBlur(this)' /><span style='margin-left:3px;'>"+ sumCompany +"</span></td>"+
			    	    "<td><input class='tableInput' style='width:"+ Textadapt(''+newMoney+'') +"' type='text' value='"+ newMoney +"' data-type='newMoney' onblur='inputBlur(this)' /><span style='margin-left:3px;'>"+ newCompany +"</span></td>"+
			    	    "<td>"+ xMoney +"<span style='margin-left:3px;'>"+ sumCompany +"</span></td>"+
			    	    "<td></td>"+
			    	    "<td></td>"+
			    	    "<td></td>"+
			    	    "<td style='display:none;'>"+ item.ta_id +"</td>"+
			    	    "<td style='display:none;'>"+ item.ucc_id +"</td>"+
			    	    "</tr>"
		    		}
	    			$(".MoneyData table tbody").append(html);
	    			
	    		});
	    	}
	    	$(".content .settingDl").each(function(index){
				if(index == 0){
					$(this).find("dd .checkDiv").each(function(i){
						if(result.achievementSetting.as_freeRentDate == 1){
							if(i == 0){
								$(this).find("input").attr('checked',true);
							}
							if(i == 1){
								$(this).find("input").attr('checked',false);
							}
						}else{
							if(i == 0){
								$(this).find("input").attr('checked',false);
							}
							if(i == 1){
								$(this).find("input").attr('checked',true);
							}
						}
					});
				}else if(index == 1){
					$(this).find("dd .checkDiv").each(function(i){
						if(result.achievementSetting.as_premium == 1){
							if(i == 0){
								$(this).find("input").attr('checked',true);
							}
							if(i == 1){
								$(this).find("input").attr('checked',false);
							}
						}else{
							if(i == 0){
								$(this).find("input").attr('checked',false);
							}
							if(i == 1){
								$(this).find("input").attr('checked',true);
							}
						}
					});
				}else if(index == 2){
					$(this).find("dd .checkDiv").each(function(i){
						if(result.achievementSetting.as_turnRentMoney == 1){
							if(i == 0){
								$(this).find("input").attr('checked',true);
							}
							if(i == 1){
								$(this).find("input").attr('checked',false);
							}
						}else{
							if(i == 0){
								$(this).find("input").attr('checked',false);
							}
							if(i == 1){
								$(this).find("input").attr('checked',true);
							}
						}
					});
				}else if(index == 3){
					$(this).find("dd .checkDiv").each(function(i){
						if(result.achievementSetting.as_goodsMoney == 1){
							if(i == 0){
								$(this).find("input").attr('checked',true);
							}
							if(i == 1){
								$(this).find("input").attr('checked',false);
							}
						}else{
							if(i == 0){
								$(this).find("input").attr('checked',false);
							}
							if(i == 1){
								$(this).find("input").attr('checked',true);
							}
						}
					});
				}else if(index == 4){
					$(this).find("dd .checkDiv").each(function(i){
						if(result.achievementSetting.as_money == 1){
							if(i == 0){
								$(this).find("input").attr('checked',true);
							}
							if(i == 1){
								$(this).find("input").attr('checked',false);
							}
							$(this).parent().parent().find(".settingDiv input").val(result.achievementSetting.as_moneyNum);
						}else{
							if(i == 0){
								$(this).find("input").attr('checked',false);
							}
							if(i == 1){
								$(this).find("input").attr('checked',true);
							}
						}
					});
				}else if(index == 5){
					$(this).find("dd .checkDiv").each(function(i){
						if(result.achievementSetting.as_guarantee == 1){
							if(i == 0){
								$(this).find("input").attr('checked',true);
							}
							if(i == 1){
								$(this).find("input").attr('checked',false);
							}
							$(this).parent().parent().find(".settingDiv .houseOut").val(result.achievementSetting.as_guaranteeOut);
							$(this).parent().parent().find(".settingDiv .houseSave").val(result.achievementSetting.as_guaranteeSave);
						}else{
							if(i == 0){
								$(this).find("input").attr('checked',false);
							}
							if(i == 1){
								$(this).find("input").attr('checked',true);
							}
						}
					});
				}else if(index == 6){
					$(this).find("dd .checkDiv").each(function(i){
						if(result.achievementSetting.as_deposit == 1){
							if(i == 0){
								$(this).find("input").attr('checked',true);
							}
							if(i == 1){
								$(this).find("input").attr('checked',false);
							}
							$(this).parent().parent().find(".settingDiv input").val(result.achievementSetting.as_depositNum);
						}else{
							if(i == 0){
								$(this).find("input").attr('checked',false);
							}
							if(i == 1){
								$(this).find("input").attr('checked',true);
							}
						}
					});
				}else if(index == 7){
					$(this).find("dd .checkDiv").each(function(i){
						if(result.achievementSetting.as_subsidy == 1){
							if(i == 0){
								$(this).find("input").attr('checked',true);
							}
							if(i == 1){
								$(this).find("input").attr('checked',false);
							}
							var html = '';
							$.each(result.achievementSettingDetailsList, function(index, item) {
								html += '<dl style="width: 100%;">';
								if(item.asd_type == "新出房"){
									html+='<dt><select><option value="新出房" selected="selected">新出房</option><option value="转租房">转租房</option><option value="到期房">到期房</option><option value="退租房">退租房</option><option value="强收房">强收房</option></select></dt>';
								}else if(item.asd_type == "转租房"){
									html+='<dt><select><option value="新出房">新出房</option><option value="转租房" selected="selected">转租房</option><option value="到期房">到期房</option><option value="退租房">退租房</option><option value="强收房">强收房</option></select></dt>';
								}else if(item.asd_type == "到期房"){
									html+='<dt><select><option value="新出房">新出房</option><option value="转租房">转租房</option><option value="到期房" selected="selected">到期房</option><option value="退租房">退租房</option><option value="强收房">强收房</option></select></dt>';
								}else if(item.asd_type == "退租房"){
									html+='<dt><select><option value="新出房">新出房</option><option value="转租房">转租房</option><option value="到期房">到期房</option><option value="退租房" selected="selected">退租房</option><option value="强收房">强收房</option></select></dt>';
								}else if(item.asd_type == "强收房"){
									html+='<dt><select><option value="新出房">新出房</option><option value="转租房">转租房</option><option value="到期房">到期房</option><option value="退租房">退租房</option><option value="强收房" selected="selected">强收房</option></select></dt>';
								}
								html+='<dd>不满半月租金,按前份合同租金的  <input type="text" value="'+ item.asd_Proportion +'"  onkeyup="scaleNum(this)" /> % <i class="fa fa-minus-square" onclick="removeHouseB(this)"></i></dd>'+
								'</dl>';
							});
							$(this).parent().parent().find(".houseAdd").html(html);
						}else{
							if(i == 0){
								$(this).find("input").attr('checked',false);
							}
							if(i == 1){
								$(this).find("input").attr('checked',true);
							}
						}
					});
				}
			});
	    	$(".tableInputD").datepicker();
	    }
	});
}

//按钮选择
function checked(ids){
	$(ids).find("input").attr("checked","checked");
	$(ids).prev().find("input").removeAttr("checked");
	$(ids).next().find("input").removeAttr("checked");
	
	if($(ids).text() == "否"){
		$(ids).parent().next().hide();
	}else{
		$(ids).parent().next().show();
	}
}


//删除业绩设置表格
function closeTR(ids){
	deleteMoney();
}

//业绩文本框自适应
function Textadapt(text){
	$("#dataContent").text(text);
	return $("#dataContent").width();
}

//修改业绩设置
function updateMoneySetting(){
	if($(".errorFont").text() != "0元"){
		alert("公司目标总业绩和部门总业绩不平衡！，请把公司总业绩-部门总业绩调整为0元");
		return;
	}else if($(".errorNewFont").text() != "0元"){
		alert("公司目标新业绩和部门新业绩不平衡！，请把公司新业绩-部门新业绩调整为0元");
		return;
	}
	var str = '{';
	$(".MoneyData table tbody tr").each(function(index){
		if(index == 0){
			str+='"data1":[';
			var strDate = "";
			$(this).find("td").each(function(i){
				if(i == 1){
					str+="{";
					str+='"ca_id":'+ $("#ca_id").text() +',';
					str+='"ca_sum":'+ $(this).find("input").val() +',';
					str+='"ca_sumCompany":"'+ $(this).find("span").text() +'",';
				}else if(i == 2){
					str+='"ca_new":'+ $(this).find("input").val() +',';
					str+='"ca_newCompany":"'+ $(this).find("span").text() +'",';
				}else if(i == 4){
					strDate+=$(this).find("input").val();
				}else if(i == 5){
					strDate+="~"+$(this).find("input").val();
					str+='"ca_startEndDate":"'+ strDate +'"';
					str+="}";
				}
			});
			str+=']';
			str+=',"data2":[';
		}else{
			$(this).find("td").each(function(i){
				if(i == 1){
					str+="{";
					str+='"ta_sum":'+ $(this).find("input").val() +',';
					str+='"ta_sumCompany":"'+ $(this).find("span").text() +'",';
				}else if(i == 2){
					str+='"ta_new":'+ $(this).find("input").val() +',';
					str+='"ta_newCompany":"'+ $(this).find("span").text() +'",';
					str+='"ucc_id":"'+ $("#ucc_id").text() +'",';
				}else if(i == 7){
					str+='"ta_id":'+ $(this).text() +',';
				}else if(i == 8){
					str+='"ucc_id":'+ $(this).text() +'';
					str+="},";
				}
			});
		}
	});
	str = str.substring(0,str.length-1);
	str+=']';
	str += "}";
	$.ajax({
		type: "POST",
	    url: "/achievement/achievementSettingUpdate",
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

//设置业绩
function moneySetting(){
	if($("#sumMoney").val() == ""){
		$("#sumMoney").focus();
		return;
	}else if($("#sumCompany").val() == ""){
		$("#sumCompany").focus();
		return;
	}else if($("#newMoney").val() == ""){
		$("#newMoney").focus();
		return;
	}else if($("#newCompany").val() == ""){
		$("#newCompany").focus();
		return;
	}else if($("#startTime").val() == ""){
		$("#startTime").focus();
		return;
	}else if($("#endTime").val() == ""){
		$("#endTime").focus();
		return;
	}
	var sumMoney = $("#sumMoney").val();
	var sumCompany = $("#sumCompany").val();
	var newMoney = $("#newMoney").val();
	var newCompany = $("#newCompany").val();
	var xMoney =  parseInt($("#sumMoney").val())-parseInt($("#newMoney").val());
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	$.ajax({
		type: "POST",
	    url: "/achievement/achievementSetting",
	    data: "ca_sum="+sumMoney+"&ca_sumCompany="+sumCompany+"&ca_new="+newMoney+"&ca_newCompany="+newCompany+"&ca_startEndDate="+(startTime+"~"+endTime),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.bool == 1){
	    		alert("已经设置过业绩了");
	    		return;
	    	}
	    	if(result.message = "success"){
	    		$(".MoneyData table tbody").html("");
	    		var html = "<tr><td>公司目标</td>"+
	    		"<td><input class='tableInput' style='width:"+ Textadapt(''+sumMoney+'') +"' type='text' value='"+ sumMoney +"' data-type='sumSumMoney' onblur='inputBlur(this)' /><span style='margin-left:3px;'>"+ sumCompany +"</span></td>"+
	    	    "<td><input class='tableInput' style='width:"+ Textadapt(''+newMoney+'') +"' type='text' value='"+ newMoney +"' data-type='sumNewMoney' onblur='inputBlur(this)' /><span style='margin-left:3px;'>"+ newCompany +"</span></td>"+
	    	    "<td><input class='tableInput' style='width:"+ Textadapt(''+xMoney+'') +"' type='text' value='"+ xMoney +"' data-type='sumXMoney' /><span style='margin-left:3px;'>"+ sumCompany +"</span></td>"+
	    	    "<td><input class='tableInputD' style='width:"+ Textadapt(''+startTime+'') +"' type='text' value='"+ startTime +"' /></td>"+
	    	    "<td><input class='tableInputD' style='width:"+ Textadapt(''+endTime+'') +"' type='text' value='"+ endTime +"' /></td>"+
	    	    "<td><i class='icon-remove-sign' style='font-size: 19px; color:#E74C3C' onclick='closeTR(this)'></i></td>"+
	    	    "</tr>"
	    		$(".MoneyData table tbody").append(html);
	    		$.each(result.tachievements, function(index, item) {
	    			$("#ca_id").text(item.ca_id);
	    			var sumMoney = item.ta_sum;
	    			var sumCompany = item.ta_sumCompany;
	    			var newMoney = item.ta_new;
	    			var newCompany = item.ta_newCompany;
	    			var xMoney =  parseInt(sumMoney)-parseInt(newMoney);
	    			if(index == 0){
	    				var html = "<tr style='border-top:1px solid #1ABC9C; border-right:1px solid #1ABC9C; border-left:1px solid #1ABC9C;'><td>"+ item.ucc_name +"</td>"+
		    		    "<td><input class='tableInput' style='width:"+ Textadapt(''+sumMoney+'') +"' type='text' value='"+ sumMoney +"' data-type='sumMoney' onblur='inputBlur(this)' /><span style='margin-left:3px;'>"+ sumCompany +"</span></td>"+
			    	    "<td><input class='tableInput' style='width:"+ Textadapt(''+newMoney+'') +"' type='text' value='"+ newMoney +"' data-type='newMoney' onblur='inputBlur(this)' /><span style='margin-left:3px;'>"+ newCompany +"</span></td>"+
			    	    "<td>"+ xMoney +"<span style='margin-left:3px;'>"+ sumCompany +"</span></td>"+
			    	    "<td></td>"+
			    	    "<td></td>"+
			    	    "<td></td>"+
			    	    "<td style='display:none;'>"+ item.ta_id +"</td>"+
			    	    "<td style='display:none;'>"+ item.ucc_id +"</td>"+
			    	    "</tr>";
	    			}else if((index+1) == result.tachievements.length){
	    				var html = "<tr style='border-bottom:1px solid #1ABC9C; border-right:1px solid #1ABC9C; border-left:1px solid #1ABC9C;'><td>"+ item.ucc_name +"</td>"+
		    		    "<td><input class='tableInput' style='width:"+ Textadapt(''+sumMoney+'') +"' type='text' value='"+ sumMoney +"' data-type='sumMoney' onblur='inputBlur(this)' /><span style='margin-left:3px;'>"+ sumCompany +"</span></td>"+
			    	    "<td><input class='tableInput' style='width:"+ Textadapt(''+newMoney+'') +"' type='text' value='"+ newMoney +"' data-type='newMoney' onblur='inputBlur(this)' /><span style='margin-left:3px;'>"+ newCompany +"</span></td>"+
			    	    "<td>"+ xMoney +"<span style='margin-left:3px;'>"+ sumCompany +"</span></td>"+
			    	    "<td></td>"+
			    	    "<td></td>"+
			    	    "<td></td>"+
			    	    "<td style='display:none;'>"+ item.ta_id +"</td>"+
			    	    "<td style='display:none;'>"+ item.ucc_id +"</td>"+
			    	    "</tr>";
	    			}else{
	    				var html = "<tr style='border-right:1px solid #1ABC9C; border-left:1px solid #1ABC9C;'><td>"+ item.ucc_name +"</td>"+
		    		    "<td><input class='tableInput' style='width:"+ Textadapt(''+sumMoney+'') +"' type='text' value='"+ sumMoney +"' data-type='sumMoney' onblur='inputBlur(this)' /><span style='margin-left:3px;'>"+ sumCompany +"</span></td>"+
			    	    "<td><input class='tableInput' style='width:"+ Textadapt(''+newMoney+'') +"' type='text' value='"+ newMoney +"' data-type='newMoney' onblur='inputBlur(this)' /><span style='margin-left:3px;'>"+ newCompany +"</span></td>"+
			    	    "<td>"+ xMoney +"<span style='margin-left:3px;'>"+ sumCompany +"</span></td>"+
			    	    "<td></td>"+
			    	    "<td></td>"+
			    	    "<td></td>"+
			    	    "<td style='display:none;'>"+ item.ta_id +"</td>"+
			    	    "<td style='display:none;'>"+ item.ucc_id +"</td>"+
			    	    "</tr>";
	    			}
	    			$(".MoneyData table tbody").append(html);
	    		});
	    		
	    		$(".tableInputD").datepicker();
	    		
	    		//清空文本框
	    		$("#sumMoney").val("");
	    		$("#newMoney").val("");
	    		$("#startTime").val("");
	    		$("#endTime").val("");
	    	}else{
	    		alert("设置失败，请重新设置");
	    	}
	    }
	});
}

// 总体设置
function submit(){
	var as_freeRentDate = 1;
	var as_premium = 1;
	var as_turnRentMoney = 1;
	var as_money = 1;
	var as_moneyNum = 100;
	var as_guarantee = 1;
	var as_guaranteeOut = 0;
	var as_guaranteeSave = 0;
	var as_deposit = 1;
	var as_depositNum = 100;
	var as_subsidy = 1;
	var as_subsidyStr = "";
	var as_goodsMoney = 0;
	$(".content .settingDl").each(function(index){
		if(index == 0){
			$(this).find("dd .checkDiv").each(function(i){
				if(i == 0){
					if($(this).find("input").is(':checked')){
						as_freeRentDate = 1;
					}
				}else{
					if($(this).find("input").is(':checked')){
						as_freeRentDate = 0;
					}
				}
			});
		}else if(index == 1){
			$(this).find("dd .checkDiv").each(function(i){
				if(i == 0){
					if($(this).find("input").is(':checked')){
						as_premium = 1;
					}
				}else{
					if($(this).find("input").is(':checked')){
						as_premium = 0;
					}
				}
			});
		}else if(index == 2){
			$(this).find("dd .checkDiv").each(function(i){
				if(i == 0){
					if($(this).find("input").is(':checked')){
						as_turnRentMoney = 1;
					}
				}else{
					if($(this).find("input").is(':checked')){
						as_turnRentMoney = 0;
					}
				}
			});
		}else if(index == 3){
			$(this).find("dd .checkDiv").each(function(i){
				if(i == 0){
					if($(this).find("input").is(':checked')){
						as_goodsMoney = 1;
					}
				}else{
					if($(this).find("input").is(':checked')){
						as_goodsMoney = 0;
					}
				}
			});
		}else if(index == 4){
			$(this).find("dd .checkDiv").each(function(i){
				if(i == 0){
					if($(this).find("input").is(':checked')){
						as_money = 1;
						as_moneyNum = $(this).parent().parent().find(".settingDiv input").val();
					}
				}else{
					if($(this).find("input").is(':checked')){
						as_money = 0;
					}
				}
			});
		}else if(index == 5){
			$(this).find("dd .checkDiv").each(function(i){
				if(i == 0){
					if($(this).find("input").is(':checked')){
						as_guarantee = 1;
						as_guaranteeOut = $(this).parent().parent().find(".settingDiv .houseOut").val();
						as_guaranteeSave = $(this).parent().parent().find(".settingDiv .houseSave").val();
					}
				}else{
					if($(this).find("input").is(':checked')){
						as_guarantee = 0;
					}
				}
			});
		}else if(index == 6){
			$(this).find("dd .checkDiv").each(function(i){
				if(i == 0){
					if($(this).find("input").is(':checked')){
						as_deposit = 1;
						as_depositNum = $(this).parent().parent().find(".settingDiv input").val();
					}
				}else{
					if($(this).find("input").is(':checked')){
						as_deposit = 0;
					}
				}
			});
		}else if(index == 7){
			$(this).find("dd .checkDiv").each(function(i){
				if(i == 0){
					if($(this).find("input").is(':checked')){
						as_subsidy = 1;
						$(this).parent().parent().find(".houseAdd dl").each(function(i){
							as_subsidyStr += $(this).find("select").val()+"-"+$(this).find("input").val()+",";
						});
						as_subsidyStr = as_subsidyStr.substring(0,as_subsidyStr.length-1);
					}
				}else{
					if($(this).find("input").is(':checked')){
						as_subsidy = 0;
					}
				}
			});
		}else if(index == 8){
			
		}
	});
	
	var where = "";
	if($("#as_id").text() != ""){
		where = "as_id="+$("#as_id").text()+"&"
	}
	var wheres = "as_freeRentDate="+as_freeRentDate+
    "&as_premium="+as_premium+
    "&as_turnRentMoney="+as_turnRentMoney+
    "&as_money="+as_money+
    "&as_moneyNum="+as_moneyNum+
    "&as_guarantee="+as_guarantee+
    "&as_guaranteeOut="+as_guaranteeOut+
    "&as_guaranteeSave="+as_guaranteeSave+
    "&as_deposit="+as_deposit+
    "&as_depositNum="+as_depositNum+
    "&as_subsidy="+as_subsidy+
    "&as_subsidyStr="+as_subsidyStr+
	"&as_goodsMoney="+as_goodsMoney;
	$.ajax({
		type: "POST",
	    url: "/achievement/submitAchievementSetting",
	    data: where+wheres,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message = "success"){
	    		$("#as_id").text(result.achievementSetting.as_id);
	    		alert("设置成功！");
	    	}
	    }
	});
	
}

//删除业绩目标
function deleteMoney(){
	$.ajax({
		type: "POST",
	    url: "/achievement/removeDeleteAchievementSetting",
	    data: "ca_id="+$("#ca_id").text(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message = "success"){
	    		alert("删除成功！");
	    		databing();
	    	}else{
	    		alert("删除失败！");
	    	}
	    }
	});
}