var _title = "";
var _mode = "";

$(function(){
	init_data();
});


/** 初始化数据*/
function init_data(){
	
	// 时间
	var dates = [];
	dates.push({name : "申请时间",	string : "apply_time"});
	
	// 标题
	var titles = [];
	titles.push({name : "编号", 		string : "hi_code",	parameter: ""});
	titles.push({name : "小区房号",	string : "house_address",href: "/houseLibrary/jumpHouseInfo&hi_code",			parameter: ""});
	titles.push({name : "状态", 		string : "apply_status", 				parameter: {0 : "待复核", 1 : "已复核"}});
	titles.push({name : "申请价格", 	string : "apply_price", 	parameter: ""});
	titles.push({name : "申请内容", 		string : "apply_content", 			parameter: ""});
	titles.push({name : "申请人", 	string : "apply_em_name", 	parameter: ""});
	titles.push({name : "申请时间", 	string : "apply_time", 	parameter: "",	format:"yyyy-MM-dd"});
	titles.push({name : "复核人", 	string : "review_em_name", 	parameter: ""});
	titles.push({name : "复核时间", 	string : "review_time", 	parameter: "",	format:"yyyy-MM-dd"});
	titles.push({name : "复核结果", 	string : "review_result", 	parameter: {0 : "驳回", 1 : "通过"}});
	titles.push({name : "复核备注", 	string : "refused_reason", 	parameter: ""});

	$("#content").table({
		search: true,
		dataBool : bools,
		dataTime: dates,
		title: titles,
		url: "/contractObject/queryPriceApplyList",
		data: {},
		success: function(result){
			$(result).find("table.personTable tbody tr").each(function(){
				var _data = $(this).find("[name=check]").data("data");
				
				if(!isEmpty(_data)){
					
					// 【申请状态】
					var apply_status = $(this).find("td[data-text=apply_status]");
					apply_status.addClass(apply_status.text() == "待复核" ? "hint" : "next");
					
					// 【申请状态】
					var review_result = $(this).find("td[data-text=review_result]");
					review_result.addClass(review_result.text() == "驳回" ? "hint" : "next");
				}
			});
		}
	});
}

function changeWhere(){
	$("#Num").text(1);
	init_data();
}

function changeType(obj){
	var _name = $(obj).attr("name");
	$("input[name='"+ _name +"']").parent().removeClass("span-checked");
	$(obj).parent().addClass("span-checked");
}

/** 调价申请复核*/
function review(){
	var checked = $("input[name='check']:checked");
	switch (checked.length) {
		case 0 :
			$.jBox.tip("请选择一个");
			break
		case 1 :
			var data = checked.data("data");
			if(0 == data.apply_status){
				window.parent.href_mo('/contractObject/jumpPriceApplyRecordAuditing?pa_id='+data.pa_id, '复核申请', _title);//jumpCancelContractEdit
			} else {
				$.jBox.tip("该订单不需要复核，只有待复核状态才能复核", "error");
			}
			break
		default :
			$.jBox.tip("只能选择一个");
			break
	}
}

function hrefClick(ids) {
    window.parent.href_mo($(ids).attr("data-type"), "房源管理", "房屋信息");
}

function hrefClick1(ids) {
    window.parent.href_mo($(ids).attr("data-type"), "房源管理", "房屋信息");
}