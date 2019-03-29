var selectList = null;
$(function(){
	data();
});

// 开始读取数据
function data(){
	selectList = $.Deferred();
	$.ajax({
	    type: "POST",
	    url: "/housePrice/selectHouseActive",
	    data:[],
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	var html1 = "";
	    	$(result.priceSettingType).each(function(index,item){
	    		var boolStr = "";
	    		var boolstrButton = "";
	    		if(item.pst_bool == 0){
	    			boolStr = "<font style='color:#E74C3C'>停用</font>";
	    			boolstrButton = '<button class="activeButton success" onclick="activeBool(this)">启用</button>'
	    		}else if(item.pst_bool == 1){
	    			boolStr = "<font style='color:#1ABC9C'>启用</font>";
	    			boolstrButton = '<button class="activeButton error" onclick="activeBool(this)">停用</button>'
	    		}
	    		html1 += '<tr data-id="'+ item.pst_id +'">'+
					'<td style="text-align: center; text-indent: 0;"><i class="fa fa-pencil" style="display: none;" onclick="updateActive(this)"></i></td>'+
					'<td>'+ item.pst_name +'</td>'+
					'<td>'+ boolStr +'</td>'+
					'<td>'+ item.pst_money +'</td>'+
					'<td>'+ (item.pst_houseMinYear == null ? "":item.pst_houseMinYear) +'</td>'+
					'<td>'+ (item.pst_contractMinYear == null ? "":item.pst_contractMinYear) +'</td>'+
					'<td title="'+ (item.pst_clause == null ? "":item.pst_clause) +'">'+ Maxfont((item.pst_clause == null ? "":item.pst_clause)) +'</td>'+
					'<td>'+ item.pst_remark +'</td>'+
					'<td style="text-align: center; text-indent: 0;"><i class="fa-reorder" onclick="activeUpDown(this)"></i></td>'+
				'</tr>'+
				'<tr style="display:none;">'+
					'<td colspan="9">'+
						'<div class="activeContent">'+
							'<div class="activeTitle">'+
								'<i class="fa fa-pencil" onclick="activeContent(this)"></i>'+
								'<div class="addActive"><input type="text" style="width: 60px; margin-right: 3px" placeholder="几月" onpaste="return false;"  onkeypress="keyPress()" />-<input type="text" placeholder="金额" style="margin-left: 3px; width: 60px;" onkeyup="clearNoNum(this)" /><select class="companyValue"><option>元</option><option>%</option></select><button onclick="addActiveContent(this)">确定</button></div>'+
								boolstrButton+
							'</div>'+
							'<div class="activeBody">'+
							'</div>'+
						'</div>'+
					'</td>'+
				'</tr>';
	    	});
	    	$("#active-content tbody").html(html1);
	    	selectList.resolve();
	    }
	});
	
	$.when(selectList).done(function(){
		$("#active-content tbody tr").hover(function(){
			if($(this).find("td").find("div").length == 0){
				$(this).find("td .fa-pencil").show();
			}
		},function(){
			if($(this).find("td").find("div").length == 0){
				$(this).find("td .fa-pencil").hide();
			}
		});
	});
}

//添加房屋活动
function addActive(data){
	var data = data;
	var title = "";
	var money = "";
	var remark = "";
	var addHouseMinYear = "";
	var addContractYear = "";
	var addclause = "";
	if(data != null){
		$.ajax({
		    type: "POST",
		    url: "/housePrice/selectSetting",
		    data:[],
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(result) {
		    	
		    }
		});
	}
	var html = "";
	var submit = function (v, h, f) {
		title = $("#addActiveTitle").val();
		money = $("#addActiveMoney").val();
		remark = $("#addActiveRemark").val();
		addHouseMinYear = $("#addHouseMinYear").val();
		addContractYear = $("#addContractYear").val();
		addclause = $("#addclause").val();
		if(title == ""){
			$.jBox.tip("标题不能为空！", "error");
			return;
		}
		if(money == ""){
			$.jBox.tip("金额不能为空！", "error");
			return;
		}
		if(addHouseMinYear == ""){
			$.jBox.tip("房屋剩余最小期限不能为空！", "error");
			return;
		}
		if(addContractYear == ""){
			$.jBox.tip("租赁最小期限！", "error");
			return;
		}
		$.ajax({
		    type: "POST",
		    url: "/housePrice/addSettingType",
		    data:{
		    	pst_name : title,
		    	pst_money : money,
		    	pst_remark : remark,
		    	pst_houseMinYear : addHouseMinYear,
		    	pst_contractMinYear : addContractYear,
		    	pst_clause : addclause
		    },
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(result) {
		    	if(result.message == "success"){
		    		var content = '<tr data-id="'+ result.pst_id +'">'+
							'<td style="text-align: center; text-indent: 0;"><i class="fa fa-pencil" style="display: none;" onclick="updateActive(this)"></i></td>'+
							'<td>'+ title +'</td>'+
							'<td><font style="color:#1ABC9C">启用</font></td>'+
							'<td>'+ money +'</td>'+
							'<td>'+ addHouseMinYear +'</td>'+
							'<td>'+ addContractYear +'</td>'+
							'<td title="'+ addclause +'">'+ Maxfont(addclause) +'</td>'+
							'<td>'+ remark +'</td>'+
							'<td style="text-align: center; text-indent: 0;"><i class="fa-reorder" onclick="activeUpDown(this)"></i></td>'+
						'</tr>'+
						'<tr>'+
							'<td colspan="9">'+
								'<div class="activeContent">'+
									'<div class="activeTitle">'+
										'<i class="fa fa-pencil" onclick="activeContent(this)"></i>'+
										'<div class="addActive"><input type="text" style="width: 60px; margin-right: 3px" placeholder="几月" onpaste="return false;"  onkeypress="keyPress()" />-<input type="text" placeholder="金额" style="margin-left: 3px; width: 60px;" onkeyup="clearNoNum(this)" /><select class="companyValue"><option>元</option><option>%</option></select><button onclick="addActiveContent(this)">确定</button></div>'+
										'<button class="activeButton error" onclick="activeBool(this)">停用</button>'+
									'</div>'+
									'<div class="activeBody">'+
									'</div>'+
								'</div>'+
							'</td>'+
						'</tr>';
		    		$("#active-content tbody").append(content);
		    	}else{
		    		$.jBox.tip("定价策略设置失败！","error");
		    	}
		    	$("#active-content tbody tr").hover(function(){
					if($(this).find("td").find("div").length == 0){
						$(this).find("td .fa-pencil").show();
					}
				},function(){
					if($(this).find("td").find("div").length == 0){
						$(this).find("td .fa-pencil").hide();
					}
				});
		    }
		});
	}
	html += '<div class="strategyAdd">'+
	'<dl>'+
	'<dt>标题:</dt>'+
	'<dd><input class="important" type="text" id="addActiveTitle" /></dd>'+
	'</dl>'+
	'<dl>'+
	'<dt>涨价金额:</dt>'+
	'<dd><input class="important" style="width: 150px;" type="text" id="addActiveMoney" onkeyup="clearNoNum(this)" /></dd>'+
	'</dl>'+
	'<dl>'+
	'<dt>房屋剩余最小期限:</dt>'+
	'<dd><input class="important" style="width: 50px;" type="text" id="addHouseMinYear" onkeyup="clearNoNum(this)" maxLength="3" />&nbsp;月</dd>'+
	'</dl>'+
	'<dl>'+
	'<dt>租赁最小期限:</dt>'+
	'<dd><input class="important" style="width: 50px;" type="text" id="addContractYear" onkeyup="clearNoNum(this)" maxLength="3" />&nbsp;月</dd>'+
	'</dl>'+
	'<dl style="height:auto; overflow: hidden;">'+
	'<dt>补充条款:</dt>'+
	'<dd><textarea rows="" cols="" style=" width:276px; height:87px; text-indent: 5px; margin-left: 10px; border:1px solid #ddd; resize:none;" id="addclause"></textarea></dd>'+
	'</dl>'+
	'<dl style="height:auto; overflow: hidden;">'+
	'<dt>备注:</dt>'+
	'<dd><textarea rows="" cols="" style=" width:276px; height:87px; text-indent: 5px; margin-left: 10px; border:1px solid #ddd; resize:none;" id="addActiveRemark"></textarea></dd>'+
	'</dl>'+
	'</div>';
	$.jBox(html, { title: "定价策略设置", width: 500, submit: submit });
}

// 修改房屋活动
function updateActive(ids){
	var pst_id = $(ids).parent().parent().attr("data-id");
	var title = "";
	var money = "";
	var remark = "";
	var addHouseMinYear = "";
	var addContractYear = "";
	var addclause = "";
	if(data != null){
		$.ajax({
		    type: "POST",
		    url: "/housePrice/selectHouseId",
		    data:{
		    	pst_id:pst_id
		    },
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    async: false,
		    success: function(result) {
		    	$(result.priceSettingType).each(function(index,item){
		    		title = (item.pst_name == null ? "":item.pst_name);
		    		money = (item.pst_money == null ? "":item.pst_money);
		    		addclause = (item.pst_clause == null ? "":item.pst_clause);
		    		addHouseMinYear = (item.pst_houseMinYear == null ? "":item.pst_houseMinYear);
		    		addContractYear = (item.pst_contractMinYear == null ? "":item.pst_contractMinYear);
		    		remark = (item.pst_remark == null ? "":item.pst_remark);
		    	});
		    }
		});
	}
	
	var html = "";
	var submit = function (v, h, f) {
		title = $("#addActiveTitle").val();
		money = $("#addActiveMoney").val();
		remark = $("#addActiveRemark").val();
		addHouseMinYear = $("#addHouseMinYear").val();
		addContractYear = $("#addContractYear").val();
		addclause = $("#addclause").val();
		pst_id = $("#pst_id").val();
		if(title == ""){
			$.jBox.tip("标题不能为空！", "error");
			return;
		}
		if(money == ""){
			$.jBox.tip("金额不能为空！", "error");
			return;
		}
		if(addHouseMinYear == ""){
			$.jBox.tip("房屋剩余最小期限不能为空！", "error");
			return;
		}
		if(addContractYear == ""){
			$.jBox.tip("租赁最小期限！", "error");
			return;
		}
		$.ajax({
		    type: "POST",
		    url: "/housePrice/addSettingType",
		    data:{
		    	pst_name : title,
		    	pst_money : money,
		    	pst_remark : remark,
		    	pst_houseMinYear : addHouseMinYear,
		    	pst_contractMinYear : addContractYear,
		    	pst_clause : addclause,
		    	pst_id : pst_id
		    },
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(result) {
		    	if(result.message == "success"){
		    		$("#active-content tbody tr[data-id='"+ pst_id +"']").find("td").eq(1).text(title);
		    		$("#active-content tbody tr[data-id='"+ pst_id +"']").find("td").eq(3).text(money);
		    		$("#active-content tbody tr[data-id='"+ pst_id +"']").find("td").eq(4).text(addHouseMinYear);
		    		$("#active-content tbody tr[data-id='"+ pst_id +"']").find("td").eq(5).text(addContractYear);
		    		$("#active-content tbody tr[data-id='"+ pst_id +"']").find("td").eq(6).text(Maxfont(addclause));
		    		$("#active-content tbody tr[data-id='"+ pst_id +"']").find("td").eq(6).attr("title",Maxfont(addclause));
		    		$("#active-content tbody tr[data-id='"+ pst_id +"']").find("td").eq(7).text(remark);
		    	}else{
		    		$.jBox.tip("定价策略设置失败！","error");
		    	}
		    	$("#active-content tbody tr").hover(function(){
					if($(this).find("td").find("div").length == 0){
						$(this).find("td .fa-pencil").show();
					}
				},function(){
					if($(this).find("td").find("div").length == 0){
						$(this).find("td .fa-pencil").hide();
					}
				});
		    }
		});
	}
	html += '<div class="strategyAdd">'+
	'<dl>'+
	'<dt>标题:</dt>'+
	'<dd><input class="important" type="text" id="addActiveTitle" value="'+ title +'" /></dd>'+
	'</dl>'+
	'<dl>'+
	'<dt>涨价金额:</dt>'+
	'<dd><input class="important" style="width: 150px;" type="text" id="addActiveMoney" onkeyup="clearNoNum(this)" value="'+ money +'" /></dd>'+
	'</dl>'+
	'<dl>'+
	'<dt>房屋剩余最小期限:</dt>'+
	'<dd><input class="important" style="width: 50px;" type="text" id="addHouseMinYear" onkeyup="clearNoNum(this)" maxLength="3" value="'+ addHouseMinYear +'" />&nbsp;月</dd>'+
	'</dl>'+
	'<dl>'+
	'<dt>租赁最小期限:</dt>'+
	'<dd><input class="important" style="width: 50px;" type="text" id="addContractYear" onkeyup="clearNoNum(this)" maxLength="3" value="'+ addContractYear +'" />&nbsp;月</dd>'+
	'</dl>'+
	'<dl style="height:auto; overflow: hidden;">'+
	'<dt>补充条款:</dt>'+
	'<dd><textarea rows="" cols="" style=" width:276px; height:87px; text-indent: 5px; margin-left: 10px; border:1px solid #ddd; resize:none;" id="addclause">'+ addclause +'</textarea></dd>'+
	'</dl>'+
	'<dl style="height:auto; overflow: hidden;">'+
	'<dt>备注:</dt>'+
	'<dd><textarea rows="" cols="" style=" width:276px; height:87px; text-indent: 5px; margin-left: 10px; border:1px solid #ddd; resize:none;" id="addActiveRemark">'+ remark +'</textarea></dd>'+
	'</dl>'+
	'<input type="hidden" id="pst_id" value="'+pst_id+'" />'+
	'</div>';
	$.jBox(html, { title: "定价策略设置", width: 500, submit: submit });
}

//删除房源活动
function deleteHouseActive(ids){
	var submit = function (v, h, f) {
	    if (v == 'ok') {
	    	$.ajax({
	    	    type: "POST",
	    	    url: "/housePrice/delSettingType",
	    	    data:{
	    	    	pst_id : $(ids).parent().parent().attr("data-id")
	    	    },
	    	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    	    dataType: "json",
	    	    success: function(result) {
	    	    	if(result.message == "success"){
	    	    		$(ids).parent().parent().remove();
	    	    		$(ids).parent().parent().next().remove();
	    	    	}else{
	    	    		$.jBox.tip("删除错误!", "error");
	    	    	}
	    	    }
	    	});
	    } 
	    return true; //close

	};
	$.jBox.confirm("确定删除当前定房源活动吗？", "提示", submit);
}

// 房屋活动下拉显示隐藏
function activeUpDown(ids){
	var _this = $(ids).parent().parent();
	if($(_this).next().is(":hidden")){
		$.ajax({
		    type: "POST",
		    url: "/housePrice/selectSettingTypeContent",
		    data:{
		    	pst_id : $(_this).attr("data-id")
		    },
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(result) {
		    	var html = "";
	    		$(result.priceSettingContentList).each(function(index,item){
	    			html += '<label data-id="'+ item.psc_id +'">'+ (index+1) +'.<input value="'+ item.psc_upCycle.split("-")[0] +'" class="monthValue" style="width: 60px; margin-left: 3px; margin-right: 3px" readonly="readonly">-<input value="'+ item.psc_upCycle.split("-")[1]+item.psc_unit +'" class="moneyValue" style="width: 80px; margin-left: 3px" readonly="readonly"><i class="fa fa-minus-square" style="display:none;" onclick="deleteActiveData(this)"></i></label>';
	    		});
	    		$(_this).next().find(".activeBody").html(html);
		    }
		});
		$(_this).next().show();
	}else{
		$(_this).next().hide();
	}
}

//添加房屋活动计划
function activeContent(ids){
	if($(ids).next().is(":hidden")){
		$(ids).next().show();
		$(ids).parent().next().find("label i").show();
	}else{
		$(ids).next().hide();
		$(ids).parent().next().find("label i").hide();
	}
}

// 添加活动详情
function addActiveContent(ids){
	var month = $(ids).prev().prev().prev().val();
	var money = $(ids).prev().prev().val();
	var unit = $(ids).prev().val();
	var _parent = $(ids).parent().parent().next();
	var pid = $(ids).parent().parent().parent().parent().parent().prev().attr("data-id");
	var bools = false;
	if(month == ""){
		$.jBox.tip("请填写月数","error");
		return;
	}
	if(money == ""){
		$.jBox.tip("请填写金额","error");
		return;
	}
	if($(".activeBody label").length > 0){
		$(".activeBody label").each(function(index){
			if(month == $(this).find(".monthValue").val()){
				bools = true;
			}
		});
		if(bools){
			$.jBox.tip("已经存在月份","error");
			return;
		}
	}
	var id = 0;
	$.ajax({
	    type: "POST",
	    url: "/housePrice/addSettingTypeContent",
	    data:{
	    	psc_upCycle : month+"-"+money,
	    	psc_unit : unit,
	    	pst_id : pid
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		id = result.psc_id;
	    		var arr = new Array();
				var arrText = new Array();
				var bools = false;
				if($(".activeBody label").length > 0){
					$(".activeBody label").each(function(index){
						arr.push($(this).find(".monthValue").val());
						arrText.push($(this).find(".monthValue").val()+"-"+$(this).find(".moneyValue").val()+"-"+$(this).attr("data-id"));
					});
					arr.push(month);
					arrText.push(month+"-"+money+unit+"-"+id);
					sortArray(arr,arr.length-1,1);
					var html = "";
					for(var i = 0; i < arr.length; i++){
						for(var k = 0; k < arrText.length; k++){
							if(arr[i] == arrText[k].split("-")[0]){
								html+= '<label data-id="'+ arrText[k].split("-")[2] +'">'+ (i+1) +'.<input value="'+ arrText[k].split("-")[0] +'" class="monthValue" style="width: 60px; margin-left: 3px; margin-right: 3px" readonly="readonly">-<input value="'+ arrText[k].split("-")[1] +'" class="moneyValue" style="width: 80px; margin-left: 3px" readonly="readonly"><i class="fa fa-minus-square" onclick="deleteActiveData(this)"></i></label>';
							}
						}
					}
					$(_parent).html(html);
				}else{
					html = '<label data-id="'+ id +'">1.<input value="'+ month +'" class="monthValue" style="width: 60px; margin-left: 3px; margin-right: 3px" readonly="readonly">-<input value="'+ money + unit +'" class="moneyValue" style="width: 80px; margin-left: 3px" readonly="readonly"><i class="fa fa-minus-square" onclick="deleteActiveData(this)"></i></label>';
					$(_parent).html(html);
				}
	    	}else{
	    		$.jBox.tip("添加错误，请重新尝试","error");
	    	}
	    }
	});
}

//删除
function deleteActiveData(ids){
	$.ajax({
	    type: "POST",
	    url: "/housePrice/delSettingTypeContent",
	    data:{
	    	psc_id : $(ids).parent().attr("data-id")
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		$(ids).parent().remove();
	    	}else{
	    		$.jBox.tip("删除失败，请重新尝试","error");
	    	}
	    }
	});
}

// 停用还是启用
function activeBool(ids){
	var bools = 1;
	if($(ids).text() == "停用"){
		bools = 0;
	}
	var _parent = $(ids).parent().parent().parent().parent().prev();
	$.ajax({
	    type: "POST",
	    url: "/housePrice/updatePriceSettingTypeBools",
	    data:{
	    	pst_id : $(_parent).attr("data-id"),
	    	pst_bool : bools,
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		if(bools == 0){
	    			$(ids).text("启用");
	    			$(_parent).find("td").eq(2).html("<font style='color:#E74C3C'>停用</font>");
	    			$(ids).attr("class","activeButton success");
	    		}else{
	    			$(ids).text("停用");
	    			$(_parent).find("td").eq(2).html("<font style='color:#1ABC9C'>启用</font>");
	    			$(ids).attr("class","activeButton error");
	    		}
	    	}else{
	    		$.jBox.tip("删除失败，请重新尝试","error");
	    	}
	    }
	});
}

/**
 * 毫秒转换为日期格式
 * @param time 时间/时间字符串
 * @param format 时间格式 "yyyy-MM-dd" || "yyyy-MM-dd HH:mm:ss" 
 * @returns
 */
function Format(time, format){
	if (time == null || time == "") {
		return "";
	}
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
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

// 只能输入数字
function keyPress() {    
    var keyCode = event.keyCode;    
    if ((keyCode >= 48 && keyCode <= 57))    
   {    
        event.returnValue = true;    
    } else {    
          event.returnValue = false;    
   }    
}

// 金钱
function clearNoNum(obj)  
{  
   obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
   obj.value = obj.value.replace(/^\./g,"");  //验证第一个字符是数字而不是.  
  obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
  obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");  
  obj.value=obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
}

// 最大字体显示
function Maxfont(val){
	if(val.length > 13){
		return val.substring(0,13)+"...";
	}else{
		return val;
	}
}

//===========递归算法排序===============
function sortArray(arr,m,n){
	if(m > 0){
		if(arr[n] < arr[n-1]){
			swap(arr,n);
		}
		if(n > m){
			sortArray(arr,m-1,1);
		}else{
			sortArray(arr,m,n+1);
		}
	}
}

function swap(arr,n){
	var item = arr[n-1];
	arr[n-1] = arr[n];
	arr[n] = item;
}
//=============END====================