var selectList = null;
var selectList1 = null;

$(function(){
	
	$("#dateTimeEdit").on("focus", function(){
		WdatePicker({
//			maxDate : _startDate,
			dateFmt : 'yyyy-MM-dd',
			onpicked: function(dp){
			}
		});
	});
	
	$(".dateTime").on("focus", function(){
		WdatePicker({
//			maxDate : _startDate,
			dateFmt : 'yyyy-MM-dd',
			onpicked: function(dp){
			}
		});
	});
	
	$(".remarks").autoTextarea({
		  maxHeight:400,
		  minHeight:30
	});
	data();
	
	userDataList();
	
});

/**
 * 查询部门用户
 */
function userDataList(){
	$(".table-public").table({
		titleBg:"#34495E",
		titleColor:"#FFF",
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
						2 : "申请离职",
					    3 : "离职通过",
					    4 : "暂停使用"
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
				},
			],
		url: "/company/selectDepartmentUser",
		data: {
			ucc_id:GetQueryString("id")
		},
		success: function(result){
			$(result).find("tbody tr").each(function(){
				if($(this).find("td").eq(3).text() == "在职"){
					$(this).find("td").eq(3).css("color","#1ABC9C");
				}else if($(this).find("td").eq(3).text() == "离职"){
					$(this).find("td").eq(3).css("color","#E74C3C");
				}else if($(this).find("td").eq(3).text() == "申请离职"){
					$(this).find("td").eq(3).css("color","#E74C3C");
				}else if($(this).find("td").eq(3).text() == "离职通过"){
					$(this).find("td").eq(3).css("color","#F39C12");
				}else if($(this).find("td").eq(3).text() == "暂停使用"){
					$(this).find("td").eq(3).css("color","#F39C12");
				}
			});
		}
	});
	
}

/**
 * 编辑框选择管家信息
 */
function editName(){
	$("#organizationNameEdit").openModel({
		title : "管家信息",
		target : {
			id : "em_idEdit",
			name : "organizationNameEdit",
			phone : "organizationPhoneEdit",
		},
		select_all : true
	});
}

/**
 * 编辑框选择部门信息
 */
function editDepartment(){
	$("#topOrganizationEdit").openModel({
		title : "部门信息",
		target : {
			id : "ucc_pidEdit",
			name : "topOrganizationEdit",
		}
	});
}

/**
 * 标题选择
 */
function titleClick(ids){
	$(".menu li").attr("class","");
	$(".menu li i").hide();
	$(ids).attr("class","clicks");
	$(ids).find("i").show();
	$(".content").hide();
	$("#"+$(ids).attr("data-list")).show();
}

/**
 * 根据部门ID获取信息
 */
function data(){
	selectList = $.Deferred();
	var ids,list;
	$.ajax({
	    type: "POST",
	    url: "/company/departmentData",
	    data: "id="+GetQueryString("id"),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$(".title-font").text(result.company.ucc_name);
	    	if(result.company.ucc_state == 0){
	    		$(".title-icon").text("停用");
	    		$(".title-icon").attr("class","title-icon error");
	    	}else{
	    		$(".title-icon").text("启用");
	    		$(".title-icon").attr("class","title-icon success");
	    	}
	    	$(".fullName").val(result.company.ucc_name);
	    	$(".abbreviation").val(result.company.ucc_short);
	    	$(".topOrganization").val(result.company.pi_name);
	    	$(".organizationName").val(result.company.ucc_person);
	    	$(".organizationPhone").val(result.company.ucc_phone);
	    	$(".dateTime").val(returnDate(result.company.ucc_time));
	    	$(".remarks").val(result.company.ucc_remarks == null ? "":result.company.ucc_remarks);
	    	$(".em_id").val(result.company.em_id);
	    	$(".ucc_pid").val(result.company.ucc_pid);
	    	ids = $("#content2");
	    	list = result.bottomCompany;
	    	
	    	selectList.resolve();
	    }
	});
	
	$.when(selectList).done(function () {
		treeData(list,ids,"clickData(ids)","clickDataHide(ids)");
		dataPosition();
	});
}

/**
 * 添加部门人员
 */
function addDepartmentUser(){
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
	    url: "/company/addDepartmentUser",
	    data: {
	    	account : account,
	    	userName : userName,
	    	userPhone : userPhone,
	    	IDCard : IDCard,
	    	userAddress : userAddress,
	    	sex : sex,
	    	data : data,
	    	ucc_id : GetQueryString("id")
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		$.jBox.tip("添加成功", "success");
	    		// 关闭窗口
	    		closeAddperson();
	    		userDataList();
	    	}else if(result.message == "account"){
	    		$.jBox.tip("用户存在", "error");
	    		$("#account").focus();
	    	}else{
	    		$.jBox.tip("添加失败", "error");
	    	}
	    }
	});

}

/**
 * 添加部门人员
 */
function updateDepartmentUser(){
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
	    url: "/company/addDepartmentUser",
	    data: {
	    	em_id : em_id,
	    	account : account,
	    	userName : userName,
	    	userPhone : userPhone,
	    	IDCard : IDCard,
	    	userAddress : userAddress,
	    	sex : sex,
	    	data : data,
	    	ucc_id : GetQueryString("id")
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		$.jBox.tip("修改成功", "success");
	    		// 关闭窗口
	    		closeAddperson();
	    		userDataList();
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
 * 读取职位信息
 */
function dataPosition(){
	selectList1 = $.Deferred();
	var ids,list;
	$.ajax({
	    type: "POST",
	    url: "/company/positionData",
	    data: "id="+GetQueryString("id"),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	list = result.bottomPosition;
	    	ids = $("#content3");
	    	
	    	selectList1.resolve();
	    }
	});
	
	$.when(selectList1).done(function () {
		treeData(list,ids,"clickPosition(ids)","clickPositionHide(ids)");
	});
}

/**
 * 加载树形数据
 * 
 * @param list List数据必须有id:编码,pid:父级编码,name:名称,state:类型是否使用
 * @param ids 记载标签的this
 */
function treeData(list, ids, click, closeClick){
	$(ids).find(".tree-center ul").html("");
	var array = new Array();
	$(list).each(function(index, item){
		var stateColor = "";
		var state = 1;
		if(item.state != null){
			if(item.state == 0){
				stateColor = "color: #CCC";
			}
			state = item.state;
		}
		var bools = true;
		if(index == 0){
			$(ids).find(".tree-center .tree-center-ul").append('<li id="'+ item.id +'" class="'+ item.pid +'">'+
				'<span class=""></span>'+
				'<span class="tree-icon" onclick="iconDown(this)"><i class="fa fa-minus" style="display: none;"></i></span>'+
				'<label class="checkbox-a" ondblclick="downChecked(this)" onclick="treeclick(this,\''+ $(ids).find(".tree-center").selector +'\',\''+ click +'\',\''+ closeClick +'\')" data-name="'+ item.name +'" data-state="'+ state +'"><input type="checkbox" class="input_check" name="treec"/><span></span><i style="'+ stateColor +'">'+ item.name +'</i></label><ul id="ul_'+ item.id +'"></ul></li>');
		}else{
			if($("#"+item.pid).length > 0){
				$("#"+item.pid+" #ul_"+item.pid+"").prev().prev().show();
				$("#"+item.pid+" #ul_"+item.pid+"").prev().prev().find("i").show();
				$("#"+item.pid+" #ul_"+item.pid+"").append('<li id="'+ item.id +'" class="'+ item.pid +'">'+
						'<span class="left-solid"><span class="vertical-solid"></span><span class="line-solid"></span></span>'+
						'<span class="tree-icon" onclick="iconDown(this)" style="display: none;"><i class="fa fa-minus"></i></span>'+
						'<label class="checkbox-a" ondblclick="downChecked(this)" onclick="treeclick(this,\''+ $(ids).find(".tree-center").selector +'\',\''+ click +'\',\''+ closeClick +'\')" data-name="'+ item.name +'" data-state="'+ state +'"><input type="checkbox" class="input_check" name="treec"/><span></span><i style="'+ stateColor +'">'+ item.name +'</i></label>'+
						'<ul id="ul_'+ item.id +'"></ul>'+
						'</li>');
			}else{
				$(ids).find(".tree-center .tree-center-ul").append('<li id="'+ item.id +'" class="'+ item.pid +'">'+
						'<span class=""></span>'+
						'<span class="tree-icon" onclick="iconDown(this)"><i class="fa fa-minus" style="display: none;"></i></span>'+
						'<label class="checkbox-a" ondblclick="downChecked(this)" onclick="treeclick(this,\''+ $(ids).find(".tree-center").selector +'\',\''+ click +'\',\''+ closeClick +'\')" data-name="'+ item.name +'" data-state="'+ state +'"><input type="checkbox" class="input_check" name="treec"/><span></span><i style="'+ stateColor +'">'+ item.name +'</i></label><ul id="ul_'+ item.id +'"></ul></li>');
			}
		}
		for (var i = 0; i < array.length; i++) {
			if(array[i] == item.pid){
				bools = false;
				break;
			}
		}
		if(bools){
			array.push(item.pid);
		}
	});
	
	for (var i = 0; i < array.length; i++) {
		$(ids).find(".tree-center .tree-center-ul ."+array[i]).eq($(ids).find(".tree-center .tree-center-ul ."+array[i]).length-1).find("span").eq(0).attr("class","bottom-solid");
	}
}

/**
 *  部门选择
 * 
 * @param ids
 */
function clickData(){
	var id,name;
	$("#content2 .tree-center input").each(function(){
		if($(this).is(":checked")){
			id = $(this).parent().parent().attr("id");
			name = $(this).parent().attr("data-name");
			return false;
		}
	});
	if($("#ucc_idEdit").val() == "" && $("#ucc_pidEdit").val() != ""){
		$("#fullNameEdit").val("");
		$("#abbreviationEdit").val("");
		$("#topOrganizationEdit").val(name);
		$("#organizationNameEdit").val("");
		$("#organizationPhoneEdit").val("");
		$("#dateTimeEdit").val("");
		$("#remarksEdit").val("");
		$("#em_idEdit").val("");
		$("#ucc_idEdit").val("");
		$("#ucc_pidEdit").val(id);
		$(".addDepartment").show();
		$(".updateDepartment").hide();
	}else{
		$.ajax({
			type: "POST",
			url: "/company/departmentDataOne",
			data: "id="+id,
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			dataType: "json",
			success: function(result) {
				$("#fullNameEdit").val(result.company.ucc_name);
				$("#abbreviationEdit").val(result.company.ucc_short);
				$("#topOrganizationEdit").val(result.company.pi_name);
				$("#organizationNameEdit").val(result.company.ucc_person);
				$("#organizationPhoneEdit").val(result.company.ucc_phone);
				$("#dateTimeEdit").val(returnDate(result.company.ucc_time));
				$("#remarksEdit").val(result.company.ucc_remarks == null ? "":result.company.ucc_remarks);
				$("#em_idEdit").val(result.company.em_id);
				$("#ucc_idEdit").val(result.company.ucc_id);
				$("#ucc_pidEdit").val(result.company.ucc_pid);
				$(".addDepartment").hide();
				$(".updateDepartment").show();
			}
		});
	}
}

/**
 * 修改部门页面显示
 * @param ids
 */
function updateDepartmentPage(){
	var id;
	$("#content2 .tree-center input").each(function(){
		if($(this).is(":checked")){
			id = $(this).parent().parent().attr("id");
			return false;
		}
	});
	if(id == null || id == ""){
		return;
	}
	$("#departmentEdit").show();
	if($("#fullNameEdit").val() == ""){
		$.ajax({
		    type: "POST",
		    url: "/company/departmentDataOne",
		    data: "id="+id,
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(result) {
		    	$("#fullNameEdit").val(result.company.ucc_name);
		    	$("#abbreviationEdit").val(result.company.ucc_short);
		    	$("#topOrganizationEdit").val(result.company.pi_name);
		    	$("#organizationNameEdit").val(result.company.ucc_person);
		    	$("#organizationPhoneEdit").val(result.company.ucc_phone);
		    	$("#dateTimeEdit").val(returnDate(result.company.ucc_time));
		    	$("#remarksEdit").val(result.company.ucc_remarks == null ? "":result.company.ucc_remarks);
		    	$("#em_idEdit").val(result.company.em_id);
		    	$("#ucc_idEdit").val(result.company.ucc_id);
		    	$("#ucc_pidEdit").val(result.company.ucc_pid);
		    	$(".addDepartment").hide();
		    	$(".updateDepartment").show();
		    }
		});
	}
}

/**
 *  部门取消选择
 * 
 * @param ids
 */
function clickDataHide(ids){
	$("#fullNameEdit").val("");
	$("#abbreviationEdit").val("");
	$("#topOrganizationEdit").val("");
	$("#organizationNameEdit").val("");
	$("#organizationPhoneEdit").val("");
	$("#dateTimeEdit").val("");
	$("#remarksEdit").val("");
	$("#em_idEdit").val("");
	$("#ucc_idEdit").val("");
	$("#ucc_pidEdit").val("");
}

/**
 * 点击编辑职位
 * 
 * @param ids
 */
function clickPosition(ids){
	var id = $(ids).parent().attr("id");
	var pid = $(ids).parent().attr("class");
	var pName = $(ids).attr("data-name");
	if(!$(".personImport").is(":hidden")){
		$(".personImport-left-top").text($(ids).text()+"人员");
		leftUser();
	}
	if($("#positionEdit").attr("data-show") != "true"){
		$("#positionEdit").hide();
		$("#positionNameEdit").val("");
		$("#ucp_idEdit").val(id);
		$("#ucp_pidEdit").val(pid);
	}else{
		$("#topPositionEdit").val(pName);
		$("#ucp_pidEdit").val(id);
	}
	
}

/**
 * 取消点击编辑职位
 * 
 * @param ids
 */
function clickPositionHide(ids){
	if($("#positionEdit").attr("data-show") != "true"){
		$("#positionEdit").hide();
		$("#positionNameEdit").val("");
		$("#topPositionEdit").val("")
		$("#ucp_idEdit").val("");
		$("#ucp_pidEdit").val("");
	}else{
		var bools = true;
		$("#content3 .tree-center input").each(function(){
			if($(this).is(":checked")){
				bools = false;
				return false;
			}
		})
		if(bools){
			$("#positionEdit").hide();
			$("#positionNameEdit").val("");
			$("#topPositionEdit").val("")
			$("#ucp_idEdit").val("");
			$("#ucp_pidEdit").val("");
		}
	}
}

/**
 * 查询职位信息
 */
function selectPosition(){
	if($(".title-icon").text() == "停用"){
		alert("该部门已经停用");
		return;
	}
	$(".personImport").hide();
	var ucp_idEdit = "";
	var bools = false;
	$("#content3 input").each(function(){
		if($(this).is(":checked")){
			ucp_idEdit = $(this).parent().parent().attr("id");
			ucp_pid = $(this).parent().parent().attr("class");
			bools = true;
			return false;
		}
	});
	$(".personImport").hide();
	if(bools){
		$("#ucp_idEdit").val(ucp_idEdit);
		$("#ucp_pidEdit").val(ucp_pid);
		$.ajax({
		    type: "POST",
		    url: "/company/selectPosition",
		    data: "id="+ucp_idEdit,
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(result) {
		    	$("#positionEdit").show();
		    	$(".addPosition").hide();
		    	$(".updatePosition").show();
		    	$("#positionEdit").attr("data-show","true");
		    	$("#positionNameEdit").val(result.positions.ucp_name);
		    	$("#topPositionEdit").val(result.positions.pname);
		    	$("#positionRemarksEdit").val(result.positions.ucp_remarks);
		    }
		});
	}
}

/**
 * 查询添加职位
 */
function addSelectPosition(){
	if($(".title-icon").text() == "停用"){
		alert("该部门已经停用");
		return;
	}
	var bools = false;
	$("#content3 input").each(function(){
		if($(this).is(":checked")){
			bools = true;
			ucp_id = $(this).parent().parent().attr("id");
			ucp_pid = $(this).parent().parent().attr("class");
			return false;
		}
	});
	$(".personImport").hide();
	if(bools){
		$("#ucp_idEdit").val(ucp_id);
		$("#ucp_pidEdit").val(ucp_pid);
	}else{
		$("#ucp_idEdit").val("");
		$("#ucp_pidEdit").val("");
	}
	if($("#ucp_idEdit").val() == ""){
		$("#positionEdit").show();
		$(".addPosition").show();
		$("#positionNameEdit").val("");
		$("#positionRemarksEdit").val("");
		$("#topPositionEdit").val("");
	}else{
		$.ajax({
			type: "POST",
			url: "/company/selectPosition",
			data: "id="+$("#ucp_idEdit").val(),
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			dataType: "json",
			success: function(result) {
				$("#positionEdit").show();
				$(".addPosition").show();
				$(".updatePosition").hide();
				$("#positionNameEdit").val("");
				$("#ucp_pidEdit").val(result.positions.ucp_id);
				$("#ucp_idEdit").val("");
				$("#topPositionEdit").val(result.positions.ucp_name);
			}
		});
	}
}

/**
 * 编辑部门
 */
function departmentEdit(){
	$(".content-message dl input").attr("readonly",false).addClass("edit");
	$(".content-message dl textarea").attr("readonly",false).addClass("edit");
	$(".content-message button").show();
}

/**
 * 取消部门
 */
function departmentClose(){
	$(".content-message dl input").removeClass("edit").attr("readonly",true);
	$(".content-message dl textarea").removeClass("edit").attr("readonly",true);
	$(".content-message button").hide();
}

/**
 * 修改部门
 */
function updateDepartment(){
	var fullName,abbreviation,topOrganizationID,organizationName,organizationPhone,em_id,dateTime,remarks,id;
	if(!$("#content1").is(":hidden")){
		fullName = $(".fullName").val();
		abbreviation = $(".abbreviation").val();
		topOrganizationID = $(".ucc_pid").val();
		organizationName = $(".organizationName").val();
		organizationPhone = $(".organizationPhone").val();
		em_id = $(".em_id").val();
		dateTime = $(".dateTime").val();
		remarks = $(".remarks").val();
		id = GetQueryString("id");
	}else{
		fullName = $("#fullNameEdit").val();
		abbreviation = $("#abbreviationEdit").val();
		topOrganizationID = $("#ucc_pidEdit").val();
		organizationName = $("#organizationNameEdit").val();
		organizationPhone = $("#organizationPhoneEdit").val();
		em_id = $("#em_idEdit").val();
		dateTime = $("#dateTimeEdit").val();
		remarks = $("#remarksEdit").val();
		id = $("#ucc_idEdit").val();
	}
	if(fullName == ""){
		alert("部门全称不能为空！");
		return;
	}
	if(abbreviation == ""){
		alert("部门简称不能为空！");
		return;
	}
	if(topOrganizationID == ""){
		alert("上级组织不能为空！");
		return;
	}
	if(organizationName == ""){
		alert("部门负责人不能为空！");
		return;
	}
	if(organizationPhone == ""){
		alert("部门负责人电话不能为空！");
		return;
	}
	if(dateTime == ""){
		alert("部门成立时间不能为空！");
		return;
	}
	$.ajax({
	    type: "POST",
	    url: "/company/departmentEdit",
	    data: "id="+id+
	    "&fullName="+fullName+
	    "&abbreviation="+abbreviation+
	    "&topOrganizationID="+topOrganizationID+
	    "&organizationName="+organizationName+
	    "&organizationPhone="+organizationPhone+
	    "&dateTime="+dateTime+
	    "&remarks="+remarks+
	    "&em_id="+em_id,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		$(".content-message dl input").removeClass("edit").attr("readonly",true);
	    		$(".content-message dl textarea").removeClass("edit").attr("readonly",true);
	    		$(".content-message button").hide();
	    		data();
	    		alert("修改成功！");
	    	}else if(result.message == "error"){
	    		alert("失败");
	    	}
	    }
	});
}

/**
 * 添加部门
 */
function addDepartmentPage(ids){
	if($(".title-icon").text() == "停用"){
		alert("该部门已经停用");
		return;
	}
	if($("#ucc_idEdit").val() == ""){
		$("#topOrganizationEdit").val($(".title-font").text());
		$("#fullNameEdit").val("");
		$("#abbreviationEdit").val("");
		$("#organizationNameEdit").val("");
		$("#organizationPhoneEdit").val("");
		$("#dateTimeEdit").val("");
		$("#remarksEdit").val("");
		$("#ucc_pidEdit").val(GetQueryString("id"));
		$("#em_idEdit").val("");
		$("#ucc_idEdit").val("");
	}else{
		$("#topOrganizationEdit").val($("#fullNameEdit").val());
		$("#fullNameEdit").val("");
		$("#abbreviationEdit").val("");
		$("#organizationNameEdit").val("");
		$("#organizationPhoneEdit").val("");
		$("#dateTimeEdit").val("");
		$("#remarksEdit").val("");
		$("#ucc_pidEdit").val($("#ucc_idEdit").val());
		$("#em_idEdit").val("");
		$("#ucc_idEdit").val("");
	}
	$(ids).parent().next().show();
	$(ids).parent().next().find(".addDepartment").show();
	$(ids).parent().next().find(".updateDepartment").hide();
}

/**
 * 插入职位
 */
function addPosition(){
	var positionNameEdit,topPositionEdit,positionRemarksEdit,ucp_idEdit,ucp_pidEdit;
	positionNameEdit = $("#positionNameEdit").val();
	positionRemarksEdit = $("#positionRemarksEdit").val();
	ucp_pidEdit = $("#ucp_pidEdit").val();
	if(positionNameEdit == ""){
		alert("职位名称不能为空");
		return;
	}
	if(ucp_pidEdit == "" && $("#topPositionEdit").val() == ""){
		// 上级职位不填默认为顶级职位
		ucp_pidEdit = 0;
	}
	$.ajax({
	    type: "POST",
	    url: "/company/addPosition",
	    data: "positionNameEdit="+positionNameEdit+
	    "&positionRemarksEdit="+positionRemarksEdit+
	    "&ucc_id="+GetQueryString("id")+
	    "&ucp_pidEdit="+ucp_pidEdit,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		dataPosition();
	    		$("#positionEdit").hide();
	    		$("#positionRemarksEdit").val("");
	    		$("#positionNameEdit").val("");
		    	$("#ucp_pidEdit").val("");
		    	$("#ucp_idEdit").val("");
		    	$("#topPositionEdit").val("");
	    	}else{
	    		alert("添加错误，请重新添加");
	    	}
	    }
	});
}

/**
 * 修改职位
 */
function updatePosition(){
	var positionNameEdit,topPositionEdit,positionRemarksEdit,ucp_idEdit,ucp_pidEdit;
	ucp_idEdit = $("#ucp_idEdit").val();
	positionNameEdit = $("#positionNameEdit").val();
	positionRemarksEdit = $("#positionRemarksEdit").val();
	ucp_pidEdit = $("#ucp_pidEdit").val();
	if(positionNameEdit == ""){
		alert("职位名称不能为空");
		return;
	}
	if(ucp_pidEdit == "" && $("#topPositionEdit").val() == ""){
		alert("上级组织不能为空");
		return;
	}
	$.ajax({
	    type: "POST",
	    url: "/company/updatePosition",
	    data: "positionNameEdit="+positionNameEdit+
	    "&positionRemarksEdit="+positionRemarksEdit+
	    "&ucc_id="+GetQueryString("id")+
	    "&ucp_idEdit="+ucp_idEdit+
	    "&ucp_pidEdit="+ucp_pidEdit,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		dataPosition();
	    		$("#positionEdit").hide();
	    		$("#positionRemarksEdit").val("");
	    		$("#positionNameEdit").val("");
		    	$("#ucp_pidEdit").val("");
		    	$("#ucp_idEdit").val("");
		    	$("#topPositionEdit").val("");
	    	}else{
	    		alert("添加错误，请重新添加");
	    	}
	    }
	});
}

/**
 * 添加部门
 * 
 * @param ids
 */
function addDepartment(ids){
	var fullName,abbreviation,topOrganizationID,organizationName,organizationPhone,em_id,dateTime,remarks,id;
	fullName = $("#fullNameEdit").val();
	abbreviation = $("#abbreviationEdit").val();
	topOrganizationID = $("#ucc_pidEdit").val();
	organizationName = $("#organizationNameEdit").val();
	organizationPhone = $("#organizationPhoneEdit").val();
	em_id = $("#em_idEdit").val();
	dateTime = $("#dateTimeEdit").val();
	remarks = $("#remarksEdit").val();
	id = $("#ucc_idEdit").val();
	if(fullName == ""){
		alert("部门全称不能为空！");
		return;
	}
	if(abbreviation == ""){
		alert("部门简称不能为空！");
		return;
	}
	if(topOrganizationID == ""){
		alert("上级组织不能为空！");
		return;
	}
	if(organizationName == ""){
		alert("部门负责人不能为空！");
		return;
	}
	if(organizationPhone == ""){
		alert("部门负责人电话不能为空！");
		return;
	}
	if(dateTime == ""){
		alert("部门成立时间不能为空！");
		return;
	}
	$.ajax({
	    type: "POST",
	    url: "/company/addDepartment",
	    data: "fullName="+fullName+
	    "&abbreviation="+abbreviation+
	    "&topOrganizationID="+topOrganizationID+
	    "&organizationName="+organizationName+
	    "&organizationPhone="+organizationPhone+
	    "&dateTime="+dateTime+
	    "&remarks="+remarks+
	    "&em_id="+em_id,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		$(".content-message-edit").hide();
	    		data();
	    	}else if(result.message == "error"){
	    		alert("失败");
	    	}
	    }
	});	
}

/**
 * 人员
 * @param name
 * @returns
 */
function outPerson(){
	if($(".title-icon").text() == "停用"){
		alert("该部门已经停用");
		return;
	}
	var ucp_id = $("#content3 input[name='treec']:checked").parent().parent().attr("id");
	if(typeof(ucp_id)=="undefined"){
		alert("请选择职位!");
		return;
	}
	$("#positionEdit").hide();
	$("#positionNameEdit").val("");
	$("#topPositionEdit").val("")
	$("#ucp_idEdit").val("");
	$("#ucp_pidEdit").val("0");
	$(".personImport").show();
	leftUser();
	userData();
}

/**
 * 查询未分配人员，进行导入
 */
function userData(){
	$.ajax({
	    type: "POST",
	    url: "/company/insidePerson",
	    data: "personSearch="+$(".personSearch").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$(".personImport-user-content ul").html("");
	    	$(result.employeeNullPosition).each(function(index, item){
	    		$(".personImport-user-content ul").append("<li data-id='"+ item.em_id +"' ondblclick='checkedPerson(this)'>"+ item.em_name +"("+ item.em_phone +")</li>");
	    	});
	    }
	});
}

/**
 * 查询职位人员
 * 
 */
function leftUser(){
	var ucp_id=0;
	var ucp_name = "";
	$("#content3 input").each(function(){
		if($(this).is(":checked")){
			ucp_id = $(this).parent().parent().attr("id");
			ucp_name = $(this).parent().attr("data-name");
			return false;
		}
	});
	$(".personImport-left-top").text(ucp_name+"(人员)");
	$.ajax({
	    type: "POST",
	    url: "/company/positionPerson",
	    data: "ucp_id="+ucp_id,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$(".personImport-left ul").html("");
	    	$(result.employeePosition).each(function(index, item){
	    		$(".personImport-left ul").append("<li data-id='"+ item.em_id +"' >"+ item.em_name +"("+ item.em_phone +")<i class='fa-times-circle' onclick='removePerson(this)'></i></li>");
	    	});
	    }
	});	
}

/**
 * 选择人员导入
 * 
 * @param ids
 */
function checkedPerson(ids){
	var bools = true;
	$(".personImport-left ul li").each(function(i){
		if($(this).text() == $(ids).text()){
			bools = false;
			alert("人员已存在！");
			return false;
		}
	});
	var ucp_id=0;
	$("#content3 input").each(function(){
		if($(this).is(":checked")){
			ucp_id = $(this).parent().parent().attr("id");
			return false;
		}
	});
	if(bools){
		$.ajax({
		    type: "POST",
		    url: "/company/personTOposition",
		    data: "ucp_id="+ucp_id+"&em_id="+$(ids).attr("data-id")+"&ucc_id="+GetQueryString("id"),
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(result) {
		    	if(result.message == "success"){
		    		$(".personImport .personImport-left ul").append("<li data-id='"+ $(ids).attr("data-id") +"' >"+ $(ids).text() +"<i class='fa-check'></i><i class='fa-times-circle' onclick='removePerson(this)'></i></li>");
		    		userDataList();
		    	}else{
		    		alert("导入失败，请重新导入");
		    	}
		    }
		});
	}
}

/**
 * 删除导入人员
 * 
 * @param ids
 */
function removePerson(ids){
	var ucp_id=0;
	$("#content3 input").each(function(){
		if($(this).is(":checked")){
			ucp_id = $(this).parent().parent().attr("id");
			return false;
		}
	});
	$.ajax({
	    type: "POST",
	    url: "/company/removePersonTOposition",
	    data: "ucp_id="+ucp_id+"&em_id="+$(ids).parent().attr("data-id"),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message=="success"){
	    		$(ids).parent().remove();
	    	}
	    }
	});
	
}

/********部门人员************/
/**
 * 关闭添加人员
 */
function closeAddperson(){
	$(".addPerson").animate({right: '-391px'},500,function(){
		$(this).hide();
		$("#account").val("");
		$("#userName").val("");
		$("#userPhone").val("");
		$("#IDCard").val("");
		$("#userAddress").val("");
		$("#account").val("").attr("readonly",false);
		$(".image-item").remove();
		$(".image-item-add").show();
	});
}

/**
 * 添加人员界面
 */
function addPersonDiv(){
	if($(".title-icon").text() == "停用"){
		alert("该部门已经停用");
		return;
	}
	$(".addPerson").show();
	$(".addPerson").animate({right: '0'},500);
	$(".addPerson-title").text("添加人员");
	$(".addPerson button").eq(0).show();
	$(".addPerson button").eq(1).hide();
}

/**
 * 修改人员界面
 */
function updatePersonDiv(){
	if($(".title-icon").text() == "停用"){
		alert("该部门已经停用");
		return;
	}
	var em_id = $("#content4 input[name='check']:checked").parent().attr("data-id");
	if(typeof(em_id)=="undefined"){
		alert("请选择人员!");
		return;
	}
	$(".addPerson").show();
	$(".addPerson").animate({right: '0'},500);
	$(".addPerson-title").text("修改人员");
	$(".addPerson button").eq(0).hide();
	$(".addPerson button").eq(1).show();
	$("#account").attr("readonly",true);
	
	$.ajax({
	    type: "POST",
	    url: "/company/setuserMessage",
	    data: "em_id="+em_id+"&ucc_id="+GetQueryString("id"),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	// 账号
	    	$("#em_idU").val(result.departmentUser.em_id);
	    	// 账号
	    	$("#account").val(result.departmentUser.em_account);
	    	// 姓名
	    	$("#userName").val(result.departmentUser.em_name);
	    	// 联系电话
	    	$("#userPhone").val(result.departmentUser.em_phone);
	    	// 身份证号码
	    	$("#IDCard").val(result.departmentUser.em_documentID);
	    	// 住址
	    	$("#userAddress").val(result.departmentUser.em_address == null ? "":result.departmentUser.em_address);
	    	// 性别
	    	if(result.departmentUser.em_sex == "man"){
	    		$("#userSex .checkbox-a input").eq(0).attr("checked",true);
	    		$("#userSex .checkbox-a input").eq(1).attr("checked",false);
	    	}else{
	    		$("#userSex .checkbox-a input").eq(0).attr("checked",false);
	    		$("#userSex .checkbox-a input").eq(1).attr("checked",true);
	    	}
	    	if(result.departmentUser.em_cardImage != null){
	    		$(".image-show").fadeOut().remove();
	    		var html = "";
	    		html += '<div class="image-item">';
	    		html += '	<img class="image-item-img" src="http://www.cqgjp.com' + result.departmentUser.em_cardImage + '">';
	    		html += '	<span class="image-item-close icon-remove" title="删除" data-src="http://www.cqgjp.com' + result.departmentUser.em_cardImage + '"></span>';
	    		html += '</div>';
	    		$(".image-item-add").before(html);
	    		$(".image-item-add").hide();
	    	}
	    }
	});
}

/**
 * 人员离职
 * 
 * @returns
 */
function quitUser(){
	if($(".title-icon").text() == "停用"){
		//alert("该部门已经停用");
        $.jBox.tip("该部门已经停用", 'error');
		return;
	}
	var em_id = 0;
	$(".table-public table tbody input").each(function(){
		if($(this).is(":checked")){
			em_id = $(this).parent().attr("data-id");
		}
	});
	/*var checkName = $(".table-public table tbody input[name='check']:checked").parent().parent().parent().find("td").eq(3).text();
	if(checkName != "离职通过"){
		alert("请先让人员申请离职，主管通过后才能离职");
		return;
	}*/
	$.ajax({
	    type: "POST",
	    url: "/company/updateUserState",
	    data: "em_id="+em_id+"&state=0",
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.code == 200){
                $.jBox.tip(result.message, 'success');
	    		userDataList();
	    	}else{
                $.jBox.tip(result.message, 'error');
	    	}
	    }
	});
}

/**
 * 人员在职
 * 
 * @returns
 */
function workForce(){
	if($(".title-icon").text() == "停用"){
		alert("该部门已经停用");
		return;
	}
	var em_id = 0;
	$(".table-public table tbody input").each(function(){
		if($(this).is(":checked")){
			em_id = $(this).parent().attr("data-id");
		}
	});
	$.ajax({
	    type: "POST",
	    url: "/company/updateUserState",
	    data: "em_id="+em_id+"&state=1",
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
            if(result.code == 200){
                $.jBox.tip(result.message, 'success');
                userDataList();
            }else{
                $.jBox.tip(result.message, 'error');
            }
	    }
	});
}

/**
 * 部门停用/启用
 */
function qiutDepartment(type){
	var ucc_id=0;
	var bool = false;
	$("#content2 input").each(function(){
		if($(this).is(":checked")){
			ucc_id = $(this).parent().parent().attr("id");
			bool = true;
			return false;
		}
	});
	if(!bool){
		return;
	}
	$.ajax({
	    type: "POST",
	    url: "/company/updateDeparmentState",
	    data: "ucc_id="+ucc_id+"&state="+type,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		data();
	    	}else{
	    		alert("状态修改有误！");
	    	}
	    }
	});
}

/**
 * 总部门停用/启用
 */
function qiutDepartments(type){
	$.ajax({
	    type: "POST",
	    url: "/company/updateDeparmentState",
	    data: "ucc_id="+GetQueryString("id")+"&state="+type,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		data();
	    	}else{
	    		alert("状态修改有误！");
	    	}
	    }
	});
}

/**
 * 获取url参数
 * 
 * @param name 获取的参数名
 * @returns
 */
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
// 设置部门权限
function setCompanyPowers(){
	if($(".title-icon").text() == "停用"){
		alert("该部门已经停用");
		return;
	}
	window.parent.href_mo("/company/settingPowers?type=company&typeId="+GetQueryString("id"),"设置权限","组织架构");
}
// 设置职位权限
function setPositionPowers(){
	var positionId = $("#content3 input[name='treec']:checked").parent().parent().attr("id");
	if(typeof(positionId)=="undefined"){
		alert("请选择职位!");
		return;
	}
	window.parent.href_mo("/company/settingPowers?type=position&typeId="+positionId,"设置权限","组织架构");
}
// 设置人员权限
function setPersonPowers(){
	var personId = $("#content4 input[name='check']:checked").parent().attr("data-id");
	if(typeof(personId)=="undefined"){
		alert("请选择人员!");
		return;
	}
	window.parent.href_mo("/company/settingPowers?type=person&typeId="+personId,"设置权限","组织架构");
}
// 设置下级部门权限
function setChildCompanyPowers(){
	var companyId = $("#content2 input[name='treec']:checked").parent().parent().attr("id");
	if(typeof(companyId)=="undefined"){
		alert("请选择组织!");
		return;
	}
	window.parent.href_mo("/company/settingPowers?type=company&typeId="+companyId,"设置权限","组织架构");
}

/**
 * 申请离职
 */
function userQuit(){
	var em_id = 0;
	$(".table-public table tbody input").each(function(){
		if($(this).is(":checked")){
			em_id = $(this).parent().attr("data-id");
		}
	});
	$.jBox.tip("申请中...", 'loading');
	
	$.ajax({
	    type: "POST",
	    url: "/user/closeCompany",
	    data: {
	    	text : "",
	    	em_id : em_id
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		$.jBox.tip("申请成功，等待主管分配工作！", 'success');
	    		userDataList();
	    	}else if(result.message == "repeat"){
	    		$.jBox.tip("已经提交过申请", 'error');
	    	}else{
	    		$.jBox.tip("申请失败，请重新申请！", 'error');
	    	}
	    }
	});
}

/**
 * 暂停使用
 */
function userNO(){
	var em_id = 0;
	$(".table-public table tbody input").each(function(){
		if($(this).is(":checked")){
			em_id = $(this).parent().attr("data-id");
		}
	});
	$.ajax({
	    type: "POST",
	    url: "/company/updateUserState",
	    data: "em_id="+em_id+"&state=4",
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		userDataList();
	    	}else{
	    		alert("状态修改有误！");
	    	}
	    }
	});
}
