$(function(){
	data();
	bindClickToContractNo();
});
/** 遍历数据*/
function data(bools,ucc_id){
	var mode = getQueryString("mode");
	$("#content").table({
		search: true,
		dataBool : bools,
		dataTime: [
		           {
		        	   name: "创建日期",
		        	   string: "coRe_time"
		           }
		],
		title: [
			    {
					name: "编号",
					string: "",
					parameter: ""
				},
				{
					name: "姓名",
					string: "coRe_name",
					parameter: ""
				},
				{
					name: "联系方式",
					string: "coRe_phone",
					parameter: ""
				},
				{
					name: "反馈时间",
					string: "coRe_time",
					parameter: "",
					format:"yyyy-MM-dd"
				},
				{
					name: "处理状态",
					string: "coRe_state",
					parameter: {
						0 : "处理完毕",
						1 : "处理中",
					}
				},
				{
					name: "内容",
					string: "coRe_content",
					parameter: ""
				}
			],
		url: "/userRecord/complainteRecordList",
		data: {},
		success: function(result){
			$(result).find("tbody tr").each(function(){
				var td6 = $(this).find("td").eq(6);
				var td=td6.text();
				td6.html('');
				var div=$('<div style="width:150px;overflow:hidden;text-overflow:ellipsis;table-layout:fixed;cursor:pointer;" title='+td+'>'+td +'</div>');
				td6.append(div);
				
				var td7 = $(this).find("td").eq(7);
				var t=td7.text();
				td7.html('');
				var div=$('<div style="width:150px;overflow:hidden;text-overflow:ellipsis;table-layout:fixed;cursor:pointer;" title='+t+'>'+t +'</div>');
				td7.append(div);
			});
		}
	});
}

//绑定事件
function bindClickToContractNo(){
	$("td[data-text='coRe_name']").live(
		{"hover": function(obj){
				var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
				var contractObj = $(obj.target.childNodes);
				var noText = contractObj[0].data;
				var innerHtml = $(obj.target)[0].innerHTML;
				var a_html = contractObj[0].outerHTML;
				if(reg.test(noText) && a_html == undefined && $(obj.target)[0].outerHTML.indexOf("<a") < 0){
					if(contractObj.length == 1){
						$(obj.target)[0].innerHTML = "<a href='#' style='cursor:pointer'>" + noText + "</a>";
					} else if(contractObj.length == 2){
						$(obj.target)[0].innerHTML = "<a href='#' style='cursor:pointer'>" + noText + "</a>" + contractObj[1].outerHTML;
					}
				}
			}, function(obj){
				
			}
		}
	);
	$(document).on("click", "td[data-text=coRe_name]", function(){
		var data = $(this).parent("tr").find("[name=check]").data("data");
		var coRe_id = data.coRe_id;
		if(!isNaN(coRe_id) || coRe_id.indexOf("-") >= 0){
			$("#contractInfoIframe").attr("src", "/userRecord/treatmentResult?coRe_id="+coRe_id);
			$("#contractInfo").show();
			$("#contractInfo").animate({right: '0'}, 500);
		}
	});
}

//刷新Iframe界面
function refreshDiv(){
	$('#contractInfoIframe').attr('src', $('#contractInfoIframe').attr('src'));
}

//关闭添加来源窗口
function closeDiv(){
	$("#contractInfo").animate({right: '-1500px'}, 300, function(){
		$("#contractInfo").hide();
		// location.reload() ;
	});
}


