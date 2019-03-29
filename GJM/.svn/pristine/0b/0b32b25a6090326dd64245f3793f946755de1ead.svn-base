$(function(){
	data();
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
		        	   string: "user_createTime"
		           }
		],
		title: [
                {
					name: "编号",
					string: "",
					parameter: ""
				},
				{
					name: "登录状态",
					string: "user_loginState",
					parameter: {
						0 : "未登录",
						1 : "登录"
					}
				},
				{
					name: "用户类型",
					string: "contractObject_Type",
					parameter: {
						"托管合同" : "房东",
						"租赁合同" : "租客",
						null : "注册用户"
					}
				},
				{
					name: "用户姓名",
					string: "user_realName",
					parameter: "",
				    string1_prefix: "/",
	                string1: "user_phone",
	                parameter1: ""
				},
				{
					name: "性别",
					string: "user_sex",
					parameter: ""
				},
				{
					name: "实名认证",
					string: "type_name",
					parameter: "",
                    string1_prefix: "-",
                    string1: "user_cardNumber",
                    parameter1: ""
				},
				{
					name: "合同认证",
					string: "contractObject_No",
					parameter: ""
				},
				{
                    name: "小区房号",
                    string: "house_address",
                    parameter: ""
				},
				{
					name: "充值金额",
					string: "ua_total_amount",
					parameter: "Double"
				},
				{
					name: "赠送金额",
					string: "ua_balance_amount",
					parameter: "Double"
				},
				{
					name: "创建时间",
					string: "user_createTime",
					parameter: "",
					format:"yyyy-MM-dd"
				},
			],
		url: "/UserCenterUser/userCenterUserList",
		data: {},
		success: function(result){
			/*$(result).find("tbody tr").each(function(){
				var td6 = $(this).find("td").eq(6);
				var td=td6.text();
				td6.html('');
				var div=$('<div style="width:150px;overflow:hidden;text-overflow:ellipsis;table-layout:fixed;cursor:pointer;" title='+td+'>'+td +'</div>');
				td6.append(div);
			});*/
		}
	});
}