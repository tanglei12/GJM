var selectServe = null;
$(function(){
	data();
	bindClickToMdId();
});

// 筛选获取数据
function data(){
	$("#content").table({
		titleBg:"#34495E",
		titleColor:"#FFF",
		search: true,
		dataTime: [
	           {
	        	   name: "申报时间",
	        	   string: "apply_time"
	           },
	           {
	        	   name: "派工时间",
	        	   string: "mdg_time"
	           },
	           {
	        	   name: "开始时间",
	        	   string: "mtk_start_time"
	           },
	           {
	        	   name: "结束时间",
	        	   string: "mtk_end_time"
	           }
	    ],
		title: [
			    {
					name: "编号",
					string: "md_id",
					parameter: ""
				},
				{
					name: "小区房号",
					string: "house_address",
					parameter: ""
				},
				{
					name: "服务类型",
					string: "sm_name",
					parameter: "",
					leftDiv: "",
					rightDiv: ""/*,
					href: "/service/showListInfo&md_id"*/
				},
				{
					name: "服务状态",
					string: "mdg_state",
					parameter:""
				},
				{
					name: "联系人",
					string: "md_contactpeople",
					parameter: "",
					string1: "md_contactPhone",
					parameter1: ""
				},
				{
					name: "受理状态",
					string: "md_state",
					parameter: ""
				},
				{
					name: "接单人",
					string: "accepter",
					parameter: ""
				},
				{
					name: "申请来源",
					string: "md_source",
					parameter: ""
				},
				{
					name: "申报时间",
					string: "apply_time",
					parameter: "",
					format: "yyyy-MM-dd HH:mm:ss"
				},
				{
					name: "所属部门",
					string: "ucc_name",
					parameter: ""
				}
			],
		url: "queryAllServiceOrderList",
		data: {},
		success: function(result){
			closeDiv();
			$(result).find("tbody tr").each(function(){
				// 服务状态
				var mdg_state = $(this).find("td[data-text='mdg_state']");
				if(mdg_state.text() == "未接订单"){
					mdg_state.css("color","#E74C3C");
				}else if(mdg_state.text() == "已接订单"){
					mdg_state.css("color","#2ECC71");
				}else if(mdg_state.text() == "等待回访"){
					mdg_state.css("color","#E67E22");
				}
				// 受理状态
				var md_state = $(this).find("td[data-text='md_state']");
				if(md_state.text() == "已受理"){
					md_state.css("color","#2ECC71");
				}else if(md_state.text() == "未受理"){
					md_state.css("color","#E74C3C");
				}
			});
		}
	});
}

//刷新Iframe界面
function refreshDiv(){
	$('#serviceInfoIframe').attr('src', $('#serviceInfoIframe').attr('src'));
}

//关闭添加来源窗口
function closeDiv(){
	$("#serviceInfo").animate({right: '-1500px'}, 300, function(){
		$("#serviceInfo").hide();
	});
}

//绑定事件
function bindClickToMdId(){
	$("td[data-text='house_address']").live(
		{"hover": 
			function(obj){
				var innerHtml = $(obj.target)[0].innerHTML;
				$(obj.target)[0].innerHTML = "<a href='#' style='cursor:pointer'>" + innerHtml + "</a>";
			}
		}
	);
	$("td[data-text='house_address']").live(
		{"click": function(obj){
				var innerHTML = $(obj.target)[0].parentNode.parentNode.children[0].innerHTML;
				var md_id = innerHTML.substring((innerHTML.indexOf('data-id="')+9), innerHTML.indexOf('"><'));
				if(!isNaN(md_id)){
					
					$("#serviceInfoIframe").attr("src", "/service/showListInfo?md_id=" + md_id);
					$("#serviceInfo").show();
					$("#serviceInfo").animate({right: '0'}, 1000);
				}
			}
		}
	);
}

// 毫秒转换为日期格式
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

// 跳转修改推荐群体界面
// 多选按钮判断
function ck(obj){
	if (isEmpty(obj)) {
		$.jBox.info('请选择一个！', '管家婆管理系统');
		return;
	}
	javascript:functionIfram('/serve/showListInfo?id='+ obj,'申请服务','服务申请');
	//window.location.href = '/myServe/manage?id='+obj;
}

function updateState(type){
	var checkBox =$("tbody .checkbox-min input[name='check']:checked");
	var md_id=checkBox.parent().attr("data-id");
	$.ajax({
	    type: "POST",
	    url: "/service/updateStates",
	    data:{
	    	md_id : md_id,
	    	type : type
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		alert("修改成功");
	    		data();
	    	}else{
	    		alert("修改失败");
	    	}
	    }
	});
}

/** 退回订单 */
function updateFollowUp(type){
	var checkBox =$("tbody .checkbox-min input[name='check']:checked");
	var md_id=checkBox.parent().attr("data-id");
	$.ajax({
	    type: "POST",
	    url: "/service/updateFollowUp",
	    data:{
	    	md_id : md_id,
	    	type : type
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		alert("修改成功");
	    		data();
	    	}else{
	    		alert("修改失败");
	    	}
	    }
	});
}

function isEmpty(obj){
	return (typeof(obj) == "undefined") || obj == "";
}

function hrefClick(ids){
	window.parent.href_mo($(ids).attr("data-type"),"服务进度","服务订单");
}