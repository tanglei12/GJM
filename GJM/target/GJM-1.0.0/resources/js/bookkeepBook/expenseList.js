$(function(){
	data();
	bindClickToContractNo();
});
function data(bools,ucc_id){
	var mode = getQueryString("mode");
	$("#content").table({
		search: true,
		dataBool : bools,
		dataTime: [
		           {
		        	   name: "记录日期",
		        	   string: "ex_time"
		           }
		],
		title: [
			    {
					name: "编号",
					string: "",
					parameter: ""
				},
				{
					name: "时间",
					string: "ex_time",
					parameter: "",
					format:"yyyy-MM-dd"
				},
				{
					name: "报销人",
					string: "em_name",
					parameter: "",
				},
				{
					name: "部门",
					string: "ex_partment",
					parameter: "",
				},
				{
					name: "当前审核人",
					string: "ex_person",
					parameter: "",
				},
				{
					name: "报销金额",
					string: "ex_expense_money",
					parameter: ""
				},
				{
					name: "报销流水号",
					string: "ex_number",
					parameter: ""
				},
				{
					name: "状态",
					string: "ex_state",
					parameter: {
						1 : "申请中",
						2 : "申请通过",
						3 : "驳回",
						4 : "不通过"
					}
				}
			],
		url: "/bookkeep/expenseList",
		data: {},
		success: function(result){
			$(result).find("tbody tr").each(function(){
				var td=$(this).find("td").eq(3).text();
				$(this).find("td").eq(3).text('');
				var td3=$(this).find("td").eq(3);
				var a="<i href='#' style='cursor:pointer;font-style:normal;'>"+td+"</i>";
				td3.append(a);
			});
		}
	});
}

//绑定事件
function bindClickToContractNo(){
	$(document).on("click", "td[data-text=em_name]", function(){
		var data = $(this).parent("tr").find("[name=check]").data("data");
			var ex_number = data.ex_number;
			if(!isNaN(ex_number) || ex_number.indexOf("-") >= 0){
				$("#contractInfoIframe").attr("src", "/bookkeep/expenseResult?ex_number="+ex_number);
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
		location.reload() ;
	});
}