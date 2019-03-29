var selectServe = null;
$(function(){
	data();
});


/**
 * 导出excel
 */
function toExcel(){
	$.ajax({
	    type: "POST",
	    url: "/customerSee/toExcel",
	    data : "type="+ $("#type").find("option:selected").val() +"&strDate="+ $(".dateTime1").val() +"&strDateEnd="+ $(".dateTime2").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.code == 0){
	    		alert("导出excel出错，请重新导出");
	    	}else if(result.code == 2){
	    		alert("请选择时间段");
	    	}else{
	    		window.location.href = "/resources/excel/"+result.msg;
	    	}
	    }
	});
}

//筛选获取数据
function data(dataBool){
	$("#content").table({
		titleBg:"#34495E",
		titleColor:"#FFF",
		search: true,
		dataBool : dataBool,
		title: [
			    {
					name: "编号",
					string: "pcs_id",
					parameter: ""
				},
				{
					name: "托管顾问名称",
					string: "em_name",
					parameter: ""
				},
				{
					name: "托管顾问电话",
					string: "em_phone",
					parameter: ""
				},
				{
					name: "部门",
					string: "ucc_name",
					parameter: ""
				},
				{
					name: "统计类型",
					string: "ht_type",
					parameter: ""
				},
				{
					name: "条数",
					string: "nums",
					parameter: ""
				}
			],
		url: "/customerSee/customerStatisticsList",
		data: {
			type : $("#type").val()
		},
		success: function(result){
			if($(result).find(".searchBar #type").length == 0){
				var html = '<li><select class="form-control" id="type" style="height: 40px; width: 150px;" onchange="data(false)">'+
	       				'<option value="1">录入</option>'+
	       				'<option value="2">实勘</option>'+
	       				'<option value="3">带看</option>'+
	       		'</select></li>';
				$(".searchBar").prepend(html);
			}
		}
	});
}

function departmentImage(){
	functionIfram("/customerDepartment"+"?type="+ $("#type").find("option:selected").val() +"&strDate="+ $("#dateTime").val() +"&strDateEnd="+ $("#dateTimeEnd").val(),'部门统计','客户统计')
}

// 对Date的扩展，将 Date 转化为指定格式的String   
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
//例子：   
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt)   
{ //author: meizz   
var o = {   
 "M+" : this.getMonth()+1,                 //月份   
 "d+" : this.getDate(),                    //日   
 "h+" : this.getHours(),                   //小时   
 "m+" : this.getMinutes(),                 //分   
 "s+" : this.getSeconds(),                 //秒   
 "q+" : Math.floor((this.getMonth()+3)/3), //季度   
 "S"  : this.getMilliseconds()             //毫秒   
};   
if(/(y+)/.test(fmt))   
 fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
for(var k in o)   
 if(new RegExp("("+ k +")").test(fmt))   
fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
return fmt;   
}

/**
 *时间戳转化为时间 
 * */
function FormatDate (strTime) {
    var date = new Date(strTime);
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
}