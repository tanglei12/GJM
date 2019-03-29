$(function(){
	// 加载用户列表
	loadData();
	// 加载权限控制
	loadOperation();
});
// 查询用户列表
function loadData(searchStr){
	$(".table-public").table({
		titleBg:"#34495E",
		titleColor:"#FFF",
		search:false,
		title: [
			    {
					name: "编号",
					string: "em_id",
					parameter: ""
				},
				{
					name: "员工",
					string: "em_name",
					parameter: "",
					divSpan: ""
				},
				{
					name: "状态",
					string: "em_state",
					parameter: {
						0 : "离职",
						1 : "在职",
						2 : "申请离职"
					}
				},
				{
					name: "账号",
					string: "em_account",
					parameter: ""
				},
				{
					name: "部门",
					string: "ucc_name",
					parameter: ""
				},
				{
					name: "职位",
					string: "ucp_name",
					parameter: ""
				},
				{
					name: "性别",
					string: "em_sex",
					parameter: {
						"man" : "男",
						"woman" : "女"
					}
				},
				{
					name: "住址",
					string: "em_address",
					parameter: ""
				}
			],
		url: "/company/selectEmployeeList",
		data: {"searchStr":searchStr},
		success: function(result){
			$(result).find("tbody tr").each(function(){
				if($(this).find("td").eq(3).text() == "在职"){
					$(this).find("td").eq(3).css("color","#1ABC9C");
				}else if($(this).find("td").eq(3).text() == "离职"){
					$(this).find("td").eq(3).css("color","#E74C3C");
				}
			});
		}
	});
	
}
// 添加用户DIV
function addPersonDiv(){
	$(".addPerson").show();
	$(".addPerson").animate({right: '0'},500);
	$(".addPerson-title").text("添加用户");
	$(".addPerson button").eq(0).show();
	$(".addPerson button").eq(1).hide();
}
// 修改用户DIV
function updatePersonDiv(){
	var em_id = $(".table-public table tbody input:checked").parent().attr("data-id");
	if(typeof(em_id)=="undefined"){
		swal("请选择用户！");
		return;
	}
	$(".addPerson").show();
	$(".addPerson").animate({right: '0'},500);
	$(".addPerson-title").text("修改用户");
	$(".addPerson button").eq(0).hide();
	$(".addPerson button").eq(1).show();
	$("#account").attr("readonly",true);
	
	$.ajax({
	    type: "POST",
	    url: "/company/editEmployee",
	    data: "em_id="+em_id,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	// 账号
	    	$("#em_idU").val(result.employee.em_id);
	    	// 账号
	    	$("#account").val(result.employee.em_account);
	    	// 姓名
	    	$("#userName").val(result.employee.em_name);
	    	// 联系电话
	    	$("#userPhone").val(result.employee.em_phone);
	    	// 身份证号码
	    	$("#IDCard").val(result.employee.em_documentID);
	    	// 住址
	    	$("#userAddress").val(result.employee.em_address == null ? "":result.employee.em_address);
	    	// 性别
	    	if(result.employee.em_sex == "man"){
	    		$("#userSex .checkbox-a input").eq(0).attr("checked",true);
	    		$("#userSex .checkbox-a input").eq(1).attr("checked",false);
	    	}else{
	    		$("#userSex .checkbox-a input").eq(0).attr("checked",false);
	    		$("#userSex .checkbox-a input").eq(1).attr("checked",true);
	    	}
	    	if(result.employee.em_cardImage != null){
	    		$(".image-show").fadeOut().remove();
	    		var html = "";
	    		html += '<div class="image-item">';
	    		html += '	<img class="image-item-img" src="http://www.cqgjp.com' + result.employee.em_cardImage + '">';
	    		html += '	<span class="image-item-close icon-remove" title="删除" data-src="http://www.cqgjp.com' + result.employee.em_cardImage + '"></span>';
	    		html += '</div>';
	    		$(".image-item-add").before(html);
	    		$(".image-item-add").hide();
	    	}
	    }
	});
}
// 关闭添加用户窗口
function closeAddperson(){
	$(".addPerson").animate({right: '-391px'},500,function(){
		$("#account").val("").removeAttr("readonly");
		$("#userName").val("");
		$("#userPhone").val("");
		$("#IDCard").val("");
		$("#userAddress").val("");
		$("#account").val("");
		$(".image-item").remove();
		$(".image-item-add").show();
	});
}
// 新增用户
function addEmployee(){
	// 账号
	var account = $("#account").val();
	// 姓名
	var userName = $("#userName").val();
	// 联系电话
	var userPhone = $("#userPhone").val();
	// 身份证号码
	var IDCard = $("#IDCard").val();
	// 住址
	var userAddress = $("#userAddress").val();
	// 性别
	var sex = "man";
	if($("#userSex .checkbox-a input").eq(1).is(":checked")){
		sex = "woman";
	}
	var data = "";
	if($(".image-upload-box .image-item").length > 0){
		data = $(".image-upload-box .image-item img").attr("src");
	}
	
	if(account == ""){
		$.jBox.tip("账号不能为空", "error");
		$("#account").focus();
		return;
	}
	
	if(userName == ""){
		$.jBox.tip("姓名不能为空", "error");
		$("#userName").focus();
		return;
	}
	
	if(userPhone == ""){
		$.jBox.tip("联系电话不能为空", "error");
		$("#userPhone").focus();
		return;
	}
	
	if(IDCard == ""){
		$.jBox.tip("身份证号码不能为空", "error");
		$("#IDCard").focus();
		return;
	}else if(!isIDCard($("#IDCard").val())){
		$.jBox.tip("身份证号码错误", "error");
		$("#IDCard").focus();
		return;
	}
	
	$.ajax({
	    type: "POST",
	    url: "/company/saveEmployee",
	    data: {
	    	account : account,
	    	userName : userName,
	    	userPhone : userPhone,
	    	IDCard : IDCard,
	    	userAddress : userAddress,
	    	sex : sex,
	    	data : data
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		$.jBox.tip("添加成功", "success");
	    		loadData();
	    		closeAddperson();
	    	}else if(result.message == "account"){
	    		$.jBox.tip("用户存在", "error");
	    		$("#account").focus();
	    	}else{
	    		$.jBox.tip("添加失败", "error");
	    	}
	    }
	});

}
// 修改用户
function updateEmployee(){
	// 用户编码
	var em_id = $("#em_idU").val();
	// 账号
	var account = $("#account").val();
	// 姓名
	var userName = $("#userName").val();
	// 联系电话
	var userPhone = $("#userPhone").val();
	// 身份证号码
	var IDCard = $("#IDCard").val();
	// 住址
	var userAddress = $("#userAddress").val();
	// 性别
	var sex = "man";
	if($("#userSex .checkbox-a input").eq(1).is(":checked")){
		sex = "woman";
	}
	var data = "";
	if($(".image-upload-box .image-item").length > 0){
		data = $(".image-upload-box .image-item img").attr("src");
	}
	
	if(account == ""){
		$.jBox.tip("账号不能为空", "error");
		$("#account").focus();
		return;
	}
	
	if(userName == ""){
		$.jBox.tip("姓名不能为空", "error");
		$("#userName").focus();
		return;
	}
	
	if(userPhone == ""){
		$.jBox.tip("联系电话不能为空", "error");
		$("#userPhone").focus();
		return;
	}
	
	if(IDCard == ""){
		$.jBox.tip("身份证号码不能为空", "error");
		$("#IDCard").focus();
		return;
	}else if(!isIDCard($("#IDCard").val())){
		$.jBox.tip("身份证号码错误", "error");
		$("#IDCard").focus();
		return;
	}
	
	$.ajax({
	    type: "POST",
	    url: "/company/saveEmployee",
	    data: {
	    	em_id : em_id,
	    	account : account,
	    	userName : userName,
	    	userPhone : userPhone,
	    	IDCard : IDCard,
	    	userAddress : userAddress,
	    	sex : sex,
	    	data : data
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		$.jBox.tip("修改成功", "success");
	    		loadData();
	    		closeAddperson();
	    	}else if(result.message == "account"){
	    		$.jBox.tip("用户存在", "error");
	    		$("#account").focus();
	    	}else{
	    		$.jBox.tip("修改失败", "error");
	    	}
	    }
	});

}

/**
 * 判断身份证并且判断性别
 * 
 * @param ids
 */
function isCards(ids){
	if(isIDCard($(ids).val())){
		$(ids).css("border","1px solid #CCC");
		var sexType = $(ids).val().substring($(ids).val().length-1,1);
		if(sexType % 2 == 1){
			$("#userSex .checkbox-a input").eq(0).attr("checked",true);
			$("#userSex .checkbox-a input").eq(1).attr("checked",false);
		}else{
			$("#userSex .checkbox-a input").eq(0).attr("checked",true);
			$("#userSex .checkbox-a input").eq(1).attr("checked",false);
		}
	}else{
		$(ids).css("border","1px solid #E74C3C");
	}
}

/**
 * 条件搜索
 * @param obj
 */
function searchEmp(obj){
	var searchStr = $(obj).val().trim();
	loadData(searchStr);
}

/**
 * 重置密码
 */
function resetPassword(){
	var em_id = $(".table-public table tbody input:checked").parent().attr("data-id");
	if(typeof(em_id)=="undefined"){
		swal("请选择用户！");
		return;
	}
	$.post(
			"/company/resetPassword",
			{"em_id":em_id},
			function(result){
				if(result.msg=="success"){
					swal({title:"重置成功!",type:"success",timer:1500});
				}
			},"json");
}
/**
 * 按钮权限控制
 */
function loadOperation(){
	$(".content-operation").html("");
	var url  = window.location.pathname+window.location.search;
	$.ajax({
	    type: "POST",
	    url: "/user/userJurisdiction",
	    data: {
	    	url : url,
	    	ucps_type : 2
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	var button = "";
	    	if(result.menuLists.length < 1){
	    		return;
	    	}
	    	for(var i = result.menuLists.length;i>0;i--){
	    		var item = result.menuLists[i-1];
	    		button += "<button onclick='"+item.ucps_url+"' ><i class='"+item.ucps_icon+"'></i>"+item.ucps_name+"</button>"
	    	}
	    	$(".content-operation").html(button);
	    }
	});
}