var selectServe = null;
$(function(){
	data();
});

//筛选获取数据
function data(){
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
				}
			],
		url: "queryAllServiceOrderList",
		data: {
			mode : 2
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

//跳转修改推荐群体界面
//多选按钮判断
function query(value) {
	var bool = true;
	$("tbody tr").each(function(){
		if($(this).find("input[name='check']").is(':checked')){
			$(this).find("td").each(function(i){
				if(i == 4){
					if($(this).text().replace("中","") != value){
						if($(this).text() == "已接订单" || $(this).text() == "审核通过" || $(this).text() == "审核未通过"){
							if(value == "已接订单"){
								return;
							}else{
								swal($(this).text());
							}
						}else{
							if($(this).text() == ""){
								swal($(this).prev().text());
							}else{
								swal($(this).text());
							}
						}
						bool = false;
						return;
					}
				}
			});
		}
	});
	
	if(bool == false){
		return;
	}
	
	var len = $("tbody input[name='check']:checked").length;
	if (len == 0) {
		swal('请选择一个！');
	} else if (len > 1) {
		swal('只能选择一个！');
	} else {
		var id =$("tbody input[name='check']:checked").parent().attr("data-id");
		$.ajax({
		    type: "POST",
		    url: "TrackState",
		    data : "md_id="+ id+"&bool=true",
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(result) {
				if(result.msg == "1"){
					functionIfram('/service/acceptBill?id='+ id,'接取订单','服务订单');
				}else{
					swal(result.msg);
				}
		    }
		});	
	}
}
function isEmpty(obj){
	return (typeof(obj) == "undefined") || obj == "";
}

function hrefClick(ids){
	window.parent.href_mo($(ids).attr("data-type"),"服务进度","服务订单");
}