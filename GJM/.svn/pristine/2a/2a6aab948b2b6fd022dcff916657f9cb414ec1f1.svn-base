$(function(){
	data();
	bindClickToContractNo();
	title ();
});
/** 返回字符串 */
function returnValue(str) {
	return (str == null || typeof (str) == "undefined" || str == "undefined") ? "" : str + "";
}
function data(bools,ucc_id){
	var mode = getQueryString("mode");
	$("#content").table({
		search: true,
		dataBool : bools,
		dataTime: [
		           {
		        	   name: "申请日期",
		        	   string: "bm_apply_time"
		           }
		],
		title: [
			    {
					name: "编号",
					string: "",
					parameter: ""
				},
				{
					name: "申请人",
					string: "bm_name",
					parameter: ""
				},
				{
					name: "状态",
					string: "bm_loan_state",
					parameter: {
						1 : "待审核",
						2 : "已拒绝",
						3 : "待放款",
						4 : "已放款"
					}
				},
				{
					name: "申请人类型",
					string: "bm_userState",
					parameter: {
						1 : "租客",
						2 : "房东"
					}
				},
				{
					name: "联系方式",
					string: "bm_phone",
					parameter: "",
				},
				{
					name: "借款金额",
					string: "bm_monery",
					parameter: ""
				},
				{
					name: "用途",
					string: "bm_purpose",
					parameter: "",
				},
				{
					name: "借款期限",
					string: "bm_days",
					parameter: "",
				},
				{
					name: "租约状态",
					string: "bm_lease_state",
					parameter: {
						1 : "正常",
						2 : "失效"
					}
				},
				{
					name: "审核方",
					string: "bm_lender",
					parameter: {
						1 : "第三方",
						2 : "公司"
					}
				},
				{
					name: "申请时间",
					string: "bm_apply_time",
					parameter: "",
					format:"yyyy-MM-dd"
				},
				{
					name: "处理时间",
					string: "bm_handleTime",
					parameter: "",
					format:"yyyy-MM-dd"
				},
				{
					name: "处理结果",
					string: "bm_note",
					parameter: ""
				}
			],
		url: "/loanRecord/loanRecordList",
		data: {},
		success: function(result){
			$(result).find("tbody tr").each(function(){
				var td=$(this).find("td").eq(3).text();
				$(this).find("td").eq(3).text('');
				var td3=$(this).find("td").eq(3);
				var a='';
				if (td == '待审核') {
					a="<i href='#' style='cursor:pointer;font-style:normal;color:red;'>"+td+"</i>";
				} else if (td == '待放款') {
					a="<i href='#' style='cursor:pointer;font-style:normal;color:brown;'>"+td+"</i>";
				} else if (td == '已放款') {
					a="<i href='#' style='cursor:pointer;font-style:normal;color:#878787;'>"+td+"</i>";
				} else if (td == '已拒绝') {
					a="<i href='#' style='cursor:pointer;font-style:normal;color:#a19f9f'>"+td+"</i>";
				}
				td3.append(a);
				
				var t=$(this).find("td").eq(7).text();
				$(this).find("td").eq(7).text('');
				var td7=$(this).find("td").eq(7);
				var div='<div>'+t+'天</div>';
				td7.append(div);
			});
		}
	});
}
//待审核事件
function bindClickToContractNo(){
	$(document).on("click", "td[data-text=bm_loan_state]", function(){
		var data = $(this).parent("tr").find("[name=check]").data("data");
			var bm_id = data.bm_id;
			var bm_loan_state=data.bm_loan_state;
			if (bm_loan_state ==1 && !isNaN(bm_id)) {   //待审核
				$("#contractInfoIframe").attr("src", "/loanRecord/loanRecordExamine?bm_id="+bm_id);
				$("#contractInfo").show();
				$("#contractInfo").animate({right: '0'}, 500);
			}
			if (bm_loan_state == 3 && !isNaN(bm_id)) {   //待放款
				$("#contractInfoIframe").attr("src", "/loanRecord/loanRecordLending?bm_id="+bm_id);
				$("#contractInfo").show();
				$("#contractInfo").animate({right: '0'}, 500);
			}
			if (bm_loan_state == 2 && !isNaN(bm_id)) {   //已拒绝
				$("#contractInfoIframe").attr("src", "/loanRecord/loanRecordExamine?bm_id="+bm_id);
				$("#contractInfo").show();
				$("#contractInfo").animate({right: '0'}, 500);
			}
			if (bm_loan_state == 4 && !isNaN(bm_id)) {   //已放款
				$("#contractInfoIframe").attr("src", "/loanRecord/loanRecordLending?bm_id="+bm_id);
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
function title () {
	html ='';
	html+='<div id="title-div" style="margin-top:7px;margin-left:20px;">';
	html+='  <p style="font-size:16px;color:white">'+"￥借款审核"+'</P>';
	html+='</div>';
	$('.title').css('background-color','#289cde');
	$(".title").append(html);
}

