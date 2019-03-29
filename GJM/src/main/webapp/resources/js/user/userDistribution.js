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
					string: "em_id",
					parameter: ""
				},
				{
					name: "姓名",
					string: "em_name",
					parameter: "",
					leftDiv: "",
					rightDiv: "",
					href: ""
				},
				{
					name: "电话",
					string: "em_phone",
					parameter:""
				},
				{
					name: "性别",
					string: "em_sex",
					parameter: {
						"man": "男",
						"woman": "女"
					}
				},
				{
					name: "离职原因",
					string: "em_quitRemark",
					parameter: ""
				}
			],
		url: "/user/quitUserList",
		data: {},
		success: function(result){
		}
	});
}

/**
 * 选择离职人员（托管）
 */
function houseArrange(){
	var len = $("table tbody").find("input[name='check']:checked").length;
	if(len == 0){
	}else{
		var em_id = $("table tbody").find("input[name='check']:checked").parent().attr("data-id");
		functionIfram('/user/houseArrange?em_id='+em_id+'&type=1','托管分配','工作分配');
	}
}

/**
 * 选择离职人员 租赁
 */
function houseArrangeZ(){
	var len = $("table tbody").find("input[name='check']:checked").length;
	if(len == 0){
	}else{
		var em_id = $("table tbody").find("input[name='check']:checked").parent().attr("data-id");
		functionIfram('/user/houseArrange?em_id='+em_id+'&type=2','租赁分配','工作分配');
	}
}

/**
 * 离职申请通过
 */
function passCompany(){
	var len = $("table tbody").find("input[name='check']:checked").length;
	if(len == 0){
	}else{
		var em_id = $("table tbody").find("input[name='check']:checked").parent().attr("data-id");
		$.ajax({
			type: "POST",
			url: "/user/selectHouseEmContractEmBool",
			data: {
				em_id : em_id
			},
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			dataType: "json",
			success: function(result) {
				if(result.message == "success"){
					data();
				}else{
					$.jBox.tip("请先把房源和客源分配完毕，再离职通过！", 'error');
				}
			}
		});
	}
}

/**
 * 取消离职
 */
function closeUser(){
	var len = $("table tbody").find("input[name='check']:checked").length;
	if(len == 0){
	}else{
		var em_id = $("table tbody").find("input[name='check']:checked").parent().attr("data-id");
		$.ajax({
			type: "POST",
			url: "/user/closeUser",
			data: {
				em_id : em_id,
                cir_author : $.cookie("em_id")
			},
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			dataType: "json",
			success: function(result) {
				if(result.message == "success"){
					data();
				}else{
					$.jBox.tip("参数有误！", 'error');
				}
			}
		});
	}
}

/**
 * 一键分配房源
 */
function oneDistribution(){
	var len = $("table tbody").find("input[name='check']:checked").length;
	if(len == 0){
	}else{
		var html = "<div style='padding:10px;'>分配人：<input type='text' id='userName' name='userName' onclick='editName()' ></input><input type='hidden' id='em_idEdit' name='em_idEdit'></input></div>";
		var submit = function (v, h, f) {
			if (f.userName == '') {
		        $.jBox.tip("请选择分配人", 'error', { focusId: "userName" }); // 关闭设置 yourname 为焦点
		        return false;
		
			}
			$.jBox.tip("分配中...", 'loading');
			
				var em_id = $("table tbody").find("input[name='check']:checked").parent().attr("data-id");
				$.ajax({
					type: "POST",
					url: "/user/oneDistribution",
					data: {
						em_id : em_id,
						new_em : f.em_idEdit,
                        cir_author : $.cookie("em_id")
					},
					contentType: "application/x-www-form-urlencoded; charset=utf-8",
					dataType: "json",
					success: function(result) {
						if(result.message == "success"){
							$.jBox.tip("分配成功", 'success');
							data();
						}else{
							$.jBox.tip("参数有误！", 'error');
						}
					}
				});
			return true;
	    };
	    $.jBox(html,{title:"一键分配", submit: submit});
	}
}

/**
 * 编辑框选择管家信息
 */
function editName(){
	$("#userName").editModel({
		title : "管家信息",
		target : {
			id : "em_idEdit",
			name : "userName",
			phone : "",
		},
		select_all : true
	});
}

/**
 * 跳转页面新增标签页
 */
function functionIfram(href,title,parentTile){
	window.parent.href_mo(href,title,parentTile);
}