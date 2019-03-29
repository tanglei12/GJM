$(function(){
	data();
});

//筛选获取数据
function data(){
	var mode = $("#content").attr("data-id");
	if(mode == null){
		mode = 1;
	}
	$("#content").table({
		titleBg:"#34495E",
		titleColor:"#FFF",
		search: true,
		title: [
			    {
					name: "编号",
					string: "md_id",
					parameter: ""
				},
				{
					name: "问题描述",
					string: "md_problem",
					parameter: "",
					leftDiv: "",
					rightDiv: "",
					href: "/service/showListInfo&md_id"
				},
				{
					name: "受理状态",
					string: "md_state",
					parameter: ""
				},
				{
					name: "服务类型",
					string: "mdg_state",
					parameter:""
				},
				{
					name: "申请人",
					string: "md_people",
					parameter: "",
					string1: "md_phone",
					parameter1: ""
				},
				{
					name: "小区房号",
					string: "house_address",
					parameter: ""
				},
				{
					name: "指派人",
					string: "accepter",
					parameter: ""
				},
				{
					name: "申请来源",
					string: "md_applyType",
					parameter: ""
				},
				{
					name: "申报时间",
					string: "md_time",
					parameter: "",
					format: "yyyy-MM-dd"
					
				}
			],
		url: "queryAllServiceOrderList",
		data: {
			mode : mode
		},
		success: function(result){
			$(result).find("tbody tr").each(function(){
				if($(this).find("td").eq(3).text() == "未受理"){
					$(this).find("td").eq(3).attr("style","color:#E74C3C");
				}else if($(this).find("td").eq(3).text() == "已受理"){
					$(this).find("td").eq(3).attr("style","color:#1ABC9C");
				}
				if($(this).find("td").eq(4).text() == "未接订单"){
					$(this).find("td").eq(4).attr("style","color:#E74C3C");
				}else if($(this).find("td").eq(4).text() == "已接订单"){
					$(this).find("td").eq(4).attr("style","color:#2ECC71");
				}else if($(this).find("td").eq(4).text() == "等待回访"){
					$(this).find("td").eq(4).attr("style","color:#E67E22");
				}
			});
		}
	});
}

//毫秒转换为日期格式
var format = function(time, format){
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

/**
 * 受理
 */
function accept() {
	var len = $("tbody input[name='check']:checked").length;
	if (len == 0) {
		swal('请选择一个！');
	} else if (len > 1) {
		swal('只能选择一个！');
	} else {
		var id = $("tbody input[name='check']:checked").parent().attr("data-id");
		if($("tbody input[name='check']:checked").parent().parent().parent().find("td").eq(3).text() != "已受理"){
			functionIfram('/service/jumpAcceptService?id=' + id,'受理服务','服务处理');
		}else{
			swal('已经受理');
		}
		
	}
}

/**
 * 审核
 */
function examine(){
	var len = $("tbody input[name='check']:checked").length;
	if (len == 0) {
		swal('请选择一个！');
	} else if (len > 1) {
		swal('只能选择一个！');
	} else {
		var id = $("tbody input[name='check']:checked").parent().attr("data-id");
		if($("tbody input[name='check']:checked").parent().parent().parent().find("td").eq(4).text() == "审核中"){
			functionIfram('/service/ServiceAccept?id=' + id,'服务审核','服务处理');
		}else{
			swal('不需要审核');
		}
	}
}

/**
 * 客户回访
 */
function visit() {
	var len = $("tbody input[name='check']:checked").length;
	if (len == 0) {
		swal('请选择一个！');
	} else if (len > 1) {
		swal('只能选择一个！');
	} else {
		var id =$("tbody input[name='check']:checked").parent().attr("data-id");
		if($("tbody input[name='check']:checked").parent().parent().parent().find("td").eq(4).text() == "等待回访"){
			functionIfram('/service/visitService?id=' + id,'服务评价','客户回访');
		}else{
			swal('不需要回访');
		}
	}
}

function hrefClick(ids){
	window.parent.href_mo($(ids).attr("data-type"),"服务进度","服务处理");
}
