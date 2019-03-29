$(function(){
	// 加载来源列表
	loadData();
	// 加载权限控制
	loadOperation();
});
// 查询来源列表
function loadData(searchStr){
	$(".table-public").table({
		titleBg:"#34495E",
		titleColor:"#FFF",
		search:false,
		title: [
			    {
					name: "编号",
					string: "bs_id",
					parameter: ""
				},
				{
					name: "来源编码",
					string: "sourceId",
					parameter: "",
					divSpan: ""
				},
				{
					name: "来源名称",
					string: "sourceName",
					parameter: ""
				}
			],
		url: "/book/queryHouseBookSourceForList",
		data: {"searchStr":searchStr},
		success: function(result){
		}
	});
	
}
// 添加来源DIV
function addSourceDiv(){
	$(".addSource").show();
	$(".addSource").animate({right: '0'},500);
	$(".addSource-title").text("添加来源");
	$(".addSource button").eq(0).show();
	$(".addSource button").eq(1).hide();
}
// 修改来源DIV
function updateSourceDiv(){
	var bs_id = $(".table-public table tbody input:checked").parent().attr("data-id");
	if(typeof(bs_id)=="undefined"){
		swal("请选择来源！");
		return;
	}
	$(".addSource").show();
	$(".addSource").animate({right: '0'},500);
	$(".addSource-title").text("修改来源");
	$(".addSource button").eq(0).hide();
	$(".addSource button").eq(1).show();
	$("#account").attr("readonly",true);
	
	$.ajax({
	    type: "POST",
	    url: "/book/queryBookSourceById",
	    data: "bs_id="+bs_id,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	// 账号
	    	$("#bs_idU").val(result.houseBookSourceInfo.bs_id);
	    	$("#sourceId").val(result.houseBookSourceInfo.sourceId);
	    	$("#sourceName").val(result.houseBookSourceInfo.sourceName);
	    }
	});
}
// 关闭添加来源窗口
function closeAddSource(){
	$(".addSource").animate({right: '-391px'},500,function(){
		$("#sourceId").val("");
		$("#sourceName").val("");
		$(".image-item").remove();
		$(".image-item-add").show();
	});
}
// 新增来源
function addEmployee(){
	// 来源编码
	var sourceId = $("#sourceId").val();
	if(sourceId == ""){
		$.jBox.tip("来源编码不能为空", "error");
		$("#sourceId").focus();
		return;
	}
	// 来源名称
	var sourceName = $("#sourceName").val();
	if(sourceName == ""){
		$.jBox.tip("来源名称不能为空", "error");
		$("#sourceName").focus();
		return;
	}
	
	$.ajax({
	    type: "POST",
	    url: "/book/saveBookSource",
	    data: {
	    	sourceId : sourceId,
	    	sourceName : sourceName
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		$.jBox.tip("添加成功", "success");
	    		loadData();
	    		closeAddSource();
	    	}else if(result.message == "account"){
	    		$.jBox.tip("来源存在", "error");
	    		$("#account").focus();
	    	}else{
	    		$.jBox.tip("添加失败", "error");
	    	}
	    }
	});

}
// 修改来源
function updateEmployee(){
	// 来源编码
	var bs_id = $("#bs_idU").val();
	// 来源编码
	var sourceId = $("#sourceId").val();
	if(sourceId == ""){
		$.jBox.tip("来源编码不能为空", "error");
		$("#sourceId").focus();
		return;
	}
	// 来源名称
	var sourceName = $("#sourceName").val();
	if(sourceName == ""){
		$.jBox.tip("来源名称不能为空", "error");
		$("#sourceName").focus();
		return;
	}
	
	$.ajax({
	    type: "POST",
	    url: "/book/saveBookSource",
	    data: {
	    	bs_id : bs_id,
	    	sourceId : sourceId,
	    	sourceName : sourceName
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	if(result.message == "success"){
	    		$.jBox.tip("修改成功", "success");
	    		loadData();
	    		closeAddSource();
	    	}else if(result.message == "account"){
	    		$.jBox.tip("来源存在", "error");
	    		$("#account").focus();
	    	}else{
	    		$.jBox.tip("修改失败", "error");
	    	}
	    }
	});
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