var selectList = null;
var addActiveList = null;
$(function(){
	data();
});

// 开始读取数据
function data(){
	selectList = $.Deferred();
	$.ajax({
	    type: "POST",
	    url: "/housePrice/selectSetting",
	    data:[],
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	var html = "";
	    	$(result.setting).each(function(index,item){
	    		var strategyJuStr = "";
	    		if(item.ps_jurisdiction == 1){
	    			strategyJuStr = "店长";
	    		}else if(item.ps_jurisdiction == 2){
	    			strategyJuStr = "公司";
	    		}
	    		html += '<tr data-id="'+ item.ps_id +'">'+
					'<td><label class="checkbox-min"><input type="checkbox" class="input_check" name="whereCheck" checked="checked"><span></span><i></i></label></td>'+
					'<td>'+ item.ps_name +'</td>'+
					'<td>'+ item.ps_day +'</td>'+
					'<td>'+ strategyJuStr +'</td>'+
					'<td>'+ Format(item.ps_date,"yyyy-MM-dd HH:mm:ss") +'</td>'+
					'<td style="text-align: center; text-indent: 0;"><i class="fa fa-minus-square" onclick="deleteSetting(this)"></i></td>'+
				'</tr>';
	    	});
	    	$("#setting-content tbody").html(html);
	    	
	    	selectList.resolve();
	    }
	});
	
	$.when(selectList).done(function(){
		$("#active-content tbody tr").hover(function(){
			if($(this).find("td").find("div").length == 0){
				$(this).find("td .fa-minus-square").show();
			}
		},function(){
			if($(this).find("td").find("div").length == 0){
				$(this).find("td .fa-minus-square").hide();
			}
		});
	});
}

// 定价策略添加
function strategySetting(){
	var html = "";
	var submit = function (v, h, f) {
		if($("#strategyTitle").val() == ""){
			$.jBox.tip("标题不能为空！","error");
			return false;
		}
		if($("#strategyDay").val() == ""){
			$.jBox.tig("空置天数阀值不能为空！","error");
			return false;
		}
		if($("#strategyJu").val() == ""){
			$.jBox.tip("权限不能为空！","error");
			return false;
		}
		var strategyJuStr = "";
		if($("#strategyJu").val() == "1"){
			strategyJuStr = "店长";
		}else if($("#strategyJu").val() == "2"){
			strategyJuStr = "公司";
		}
		var ps_name = $("#strategyTitle").val();
		var ps_day = $("#strategyDay").val();
		var ps_jurisdiction = $("#strategyJu").val();
		$.ajax({
		    type: "POST",
		    url: "/housePrice/addSetting",
		    data:{
		    	ps_name : ps_name,
		    	ps_day : ps_day,
		    	ps_jurisdiction : ps_jurisdiction
		    },
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(result) {
		    	if(result.message == "success"){
		    		$("#setting-content tbody").append('<tr data-id="'+ result.ps_id +'">'+
		    				'<td><label class="checkbox-min"><input type="checkbox" class="input_check" name="whereCheck" checked="checked"><span></span><i></i></label></td>'+
		    				'<td>'+ ps_name +'</td>'+
		    				'<td>'+ ps_day +'</td>'+
		    				'<td>'+ strategyJuStr +'</td>'+
		    				'<td>2016-08-10 13:10:10</td>'+
		    				'<td style="text-align: center; text-indent: 0;"><i class="fa fa-minus-square" onclick="deleteSetting(this)"></i></td>'+
		    			'</tr>');
		    	}else{
		    		$.jBox.tip("定价策略设置失败！","error");
		    	}
		    }
		});
	}
	html += '<div class="strategyAdd">'+
	'<dl>'+
	'<dt>标题:</dt>'+
	'<dd><input class="important" id="strategyTitle" type="text" /></dd>'+
	'</dl>'+
	'<dl>'+
	'<dt>空置天数阀值:</dt>'+
	'<dd><input class="important" id="strategyDay" style="width: 150px;" type="text" maxlength="3" onpaste="return false;"  onkeypress="keyPress()" /></dd>'+
	'</dl>'+
	'<dl>'+
	'<dt>权限:</dt>'+
	'<dd><select id="strategyJu"><option value="1">店长</option><option value="2">公司</option></select></dd>'+
	'</dl>'+
	'</div>';
	$.jBox(html, { title: "定价策略设置", width: 500, submit: submit });
}

//删除定价策略设置
function deleteSetting(ids){
	var submit = function (v, h, f) {

	    if (v == 'ok') {
	    	$.ajax({
	    	    type: "POST",
	    	    url: "/housePrice/deleteSetting",
	    	    data:{
	    	    	ps_id : $(ids).parent().parent().attr("data-id")
	    	    },
	    	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    	    dataType: "json",
	    	    success: function(result) {
	    	    	if(result.message == "success"){
	    	    		$(ids).parent().parent().remove();
	    	    	}else{
	    	    		$.jBox.tip("删除错误!", "error");
	    	    	}
	    	    }
	    	});
	    } 
	    return true; //close

	};
	$.jBox.confirm("确定删除当前定价策略设置吗？", "提示", submit);
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