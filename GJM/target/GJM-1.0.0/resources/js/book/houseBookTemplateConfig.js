$(function(){ 
	$(":checkbox").click(function(){ 
		if($(this).attr("checked")!='true') 
		{ 
			var name = $(this).attr("name");
			$(this).siblings(":checkbox[name='"+name+"']").attr("checked",false); 
			$(this).attr("checked",true); 
		} 
	}); 
	loadData();
}); 

function disabledNodes(){
	var elements = $("input[name='flag']");
	// 解禁节点
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	elements.each(function(){
		var removeId = $(this).val();
		var node = treeObj.getNodeByParam("id", removeId, null);
		node.checked = true;
		treeObj.setChkDisabled(node, true);
		if (node.isParent){
			var childNodes = node.children;
			for(var i=0;i<childNodes.length;i++){
				childNodes[i].checked = true;
				treeObj.setChkDisabled(childNodes[i], true);
			}
		}
	});
}

function loadData(){
	var bt_id = $("#jump_bt_id").val();
	var imgSrc = "";
	$.ajax({
		type: "POST",
		url: "/book/queryBookConfigsForBcIds",
		data:{
			bt_id : bt_id
		},
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		success: function(result) {
			var data = result.houseBookConfigsForBcIds;
			var type = $("#jump_type").val();
			setHtml(data, type);
			if(type=="query" || type=="jump"){
				
				imgSrc = result.bookTemplateInfo.templateImg;
				appendToImg(imgSrc);
				
				$("#configTree").hide();
				$("#configButtons").hide();
				$("#saveConfigButton").hide();
				$("#updawnButtons").hide();
				
				var html = ""
					html += "<dl style='width: 100%; margin-bottom: 10px;'>";
				html += "<button onclick='saveBookUserInfo()'>提交</button>";
				html += "</dl>";
				$("#setTemplate").after(html);
			}
			if(type=="jump"){
				$("#backConfigButton").hide();
				$("#bookTable").hide();
			}
			disabledNodes();
		},
		error: function() {  
			swal('系统异常，请联系管理员！');
		} 
	});
}

function saveBookUserInfo(){
	document.getElementById("saveForm").submit();
}

function appendToImg(imgSrc){
	var imgHtml = "";
	imgHtml += "<dl style='width: 100%; margin-bottom: 10px;'>";
	imgHtml += "<div class='advertisementImage' " + 
			   	"<a href='javascript:;'><img alt='logo图片' class='logos' src='" + imgSrc + "' style='height: 68px;width: 420.063;'></a>" + 
				"</div>";
	imgHtml += "</dl>";
	$("#setTemplate").before(imgHtml);
}

function setHtml(data, type){
	var html = "";
	var bc_ids = "";
	var bt_id = $("#jump_bt_id").val();
	var bs_id = $("#jump_bs_id").val();
	if(data!=null&&data!=""){
		html += "<form action='/book/saveBookUserInfo' method='POST' id='saveForm' style='margin-top: 0px;'>";
		html += "<input type='hidden' id='bt_id' name = 'bt_id' value = '" + bt_id + "' />";
		html += "<input type='hidden' id='bs_id' name = 'bs_id' value = '" + bs_id + "' />"
		$.each(data, function(index, item){
						if(item.isFather == "1" && item.elementType == "name"){
							bc_ids += item.bc_id + "&";
					html +=	"<dl style='width: 100%; margin-bottom: 10px;'>";
							//用户标记添加和移除整个元素用
					html +=	"<dd class='dd-checkbox'><input type='checkbox' style='width:18px; height:18px; " + ((type=="query" || type=="jump") ? "display:none;" : "") + "' name='flag' value='" + item.bc_id + "'/></dd>&nbsp;";
					html +=	"<dt>" + item.fieldNameCn + "</dt>";
					html +=	"<dd style='width: 350px;'>";
							$.each(data, function(index, item2){
								if(item2.bc_pid == item.bc_id && (item2.elementType == "radio" || item2.elementType == "checkbox")){
									bc_ids += item2.bc_id + "&";
									html +=	"<input type='" + item2.elementType + "' name='" + item2.fieldNameEn + "' value='" + item2.fieldValue + "' >" + item2.fieldNameCn;
								}
							});
							if(item.isNull == "1"){
								html += "<em>*</em>";
							}
					html += "</dd>";
					html += "</dl>";
						}
						
						if(item.isFather == "1" && item.elementType == "select"){
							bc_ids += item.bc_id + "&";
					html +=	"<dl style='width: 100%; margin-bottom: 10px;'>";
							//用户标记添加和移除整个元素用
					html +=	"<dd class='dd-checkbox'><input type='checkbox' style='width:18px; height:18px; " + ((type=="query" || type=="jump") ? "display:none;" : "") + "' name='flag' value='" + item.bc_id + "'/></dd>&nbsp;";
					html +=	"<dt>" + item.fieldNameCn + "</dt>";
					html +=	"<dd style='width: 350px;'>";
					html +=	"<select name='" + item.fieldNameEn + "' id = '" + item.fieldNameEn + "' value='' style='height:30px; width:120px;'>";
							$.each(data, function(index, item2){
								if(item2.bc_pid == item.bc_id && item2.elementType == "option"){
									bc_ids += item2.bc_id + "&";
							html += "<option value='" + item2.fieldValue + "'>" + item2.fieldNameCn + "</option>";	
								}
							});
							html += "</select>";
							if(item.isNull == "1"){
								html += "<em>*</em>";
							}
					html += "</dd>";
					html += "</dl>";
						}
						
						if(item.elementType == "text"){
							bc_ids += item.bc_id + "&";
					html += "<dl style='width: 100%; margin-bottom: 10px;'>";
								//用户标记添加和移除整个元素用
					html +=	"<dd class='dd-checkbox'><input type='checkbox' style='width:18px; height:18px; " + ((type=="query" || type=="jump") ? "display:none;" : "") + "' name='flag' value='" + item.bc_id + "'/></dd>&nbsp;";
					html +=		"<dt>" + item.fieldNameCn + "</dt>";
					html +=		"<dd style='width: 350px;'>";
					html +=				"<input type='" + item.elementType + "' value='' id='" + item.fieldNameEn + "' class='form-control jianju'";
					html +=			"name='" + item.fieldNameEn + "' placeholder='" + item.placeholder + "' onclick='' style='width:260px;'>";
									if(item.isNull == "1"){
										html += "<em>*</em>";
									}
						html += "</dd>";
					html += "</dl>";
						}
		});
		html += "</form>";
		$("#setTemplate").append(html);
		$("#saveBCIds").val(bc_ids);
	}
}

//刷新树
function ck_refresh(){
	// 刷新
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	treeObj.refresh();
}

//添加所有
function addAll(){
	var html = "";
	var count = 0;
	$.ajax({
	    type: "POST",
	    url: "/book/queryBookConfigs",
	    data:"",
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    success: function(result) {
	    	var data = result.bookConfigs;
	    	setHtml(data, "");
	    }
	});
	// 禁用所有节点
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = treeObj.getNodes();
	for (var i=0, l=nodes.length; i < l; i++) {
		nodes[i].checked = true;
		treeObj.setChkDisabled(nodes[i], true);
		if (nodes[i].isParent){
			var childNodes = nodes[i].children;
			for(var j=0; j<childNodes.length; j++){
				childNodes[j].checked = true;
				treeObj.setChkDisabled(childNodes[j], true);
            }
		}
	}
}

//添加一个或多个
function addMore(){
	var ids = $("#setNodeInfo").val();
	$("input[name='flag']").each(function(){
		var flagValue = $(this).val();
		if(ids.indexOf(flagValue) >= 0){
			ids = ids.replace(flagValue + "&", "");
		}
	});
	$.ajax({
	    type: "POST",
	    url: "/book/queryHouseBookConfigsById",
	    data:{
	    	bc_ids : ids
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    success: function(result) {
	    	$("#saveBCIds").val(ids);
	    	var data = result.houseBookConfigs;
	    	setHtml(data, "");
	    }
	});
	
	// 禁用选中节点
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = treeObj.getCheckedNodes();
	for (var i=0, l=nodes.length; i < l; i++) {
		treeObj.setChkDisabled(nodes[i], true);
	}
}

//移除一个或多个
function removeMore(){
//	var removeIds = "";
	var ids = $("#saveBCIds").val();
	var nodeIds = $("#nodeIds").val();
	var removeElements = $("input[name='flag']:checked");
	// 解禁节点
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	removeElements.each(function(){
		var removeId = $(this).val();
		
		treeObj.setChkDisabled(treeObj.getNodeByParam("id", removeId, null), false);
		var childNodes = treeObj.getNodesByParam("pid", removeId, null);
		for(var i=0;i<childNodes.length;i++){
			treeObj.setChkDisabled(childNodes[i], false);
		}
		
		if(ids.indexOf(removeId) > -1){
			$("#saveBCIds").val(ids.replace(removeId, ""));
			removeElements.parent().parent().remove();
		} else {
			swal('元素移除异常！');
		}
	});
}

//移除所有
function removeAll(){
	$("#setTemplate").html("");
	$("#saveBCIds").val("");
	// 解禁所有节点
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = treeObj.getNodes();
	for (var i=0, l=nodes.length; i < l; i++) {
		nodes[i].checked = false;
		treeObj.setChkDisabled(nodes[i], false);
		if (nodes[i].isParent){
			var childNodes = nodes[i].children;
			for(var j=0; j<childNodes.length; j++){
				childNodes[j].checked = false;
				treeObj.setChkDisabled(childNodes[j], false);
            }
		}
	}
}

//向上移动一次
function upOne(){
	var ids = $("#saveBCIds").val();
	var checkElement = $("input[name='flag']:checked");
	if(checkElement.length <= 0){
		return false;
	}
	if(checkElement.length > 1){
		swal('只能移动一个元素, 请重新选择！');
		return false;
	}
	// 选中元素ID
	var checkId = checkElement.val();
	var dl = checkElement.parent().parent();
	var dl_prev = dl.prev();
	if(dl_prev.length == 0 || null == dl_prev || undefined == dl_prev){
		swal('当前元素已在初始位置，无需移动！');
		return false;
	}
	//选中元素的前一级元素ID
	var prevId = dl_prev.find("input[name='flag']").val();
	ids = ids.replace((checkId + "&"), ("%%")).replace((prevId + "&"), ("**"));
	ids = ids.replace(("**"), (checkId + "&")).replace(("%%"), (prevId + "&"));
	$("#saveBCIds").val(ids);
	dl.insertBefore(dl_prev);
}

//向下移动一次
function downOne(){
	var ids = $("#saveBCIds").val();
	var checkElement = $("input[name='flag']:checked");
	if(checkElement.length <= 0){
		return false;
	}
	if(checkElement.length > 1){
		swal('只能移动一个元素, 请重新选择！');
		return false;
	}
	// 选中元素ID
	var checkId = checkElement.val();
	var dl = checkElement.parent().parent();
	var dl_next = dl.next();
	if(dl_next.length == 0 || null == dl_next || undefined == dl_next){
		swal('当前元素已在最后位置，无需移动！');
		return false;
	}
	//选中元素的前一级元素ID
	var nextId = dl_next.find("input[name='flag']").val();
	ids = ids.replace((checkId + "&"), ("%%")).replace((nextId + "&"), ("**"));
	ids = ids.replace(("**"), (checkId + "&")).replace(("%%"), (nextId + "&"));
	$("#saveBCIds").val(ids);
	dl.insertAfter(dl_next);
}

//保存配置
function ck_saveConfig(){
	var bt_id = $("#jump_bt_id").val();
	var bc_ids = $("#saveBCIds").val();
	if(bc_ids.length >= 1000){
		swal("配置数量超出上限，请谨慎选择所需配置！");
	}
	var bc_ids_ = "";
	$("input[name='flag']").each(function(){
		var flagValue = $(this).val();
		bc_ids_ += (flagValue + "&");
	});
	$.ajax({
	    type: "POST",
	    url: "/book/saveBcIds",
	    data:{
	    	bt_id : bt_id,
	    	bc_ids : bc_ids
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    success: function(result) {
	    	ck_back();
	    }
	});
}

//返回
function ck_back(){
	window.location.href = '/book/bookTemplateManage';
}

/** 查询Url参数*/
function getUrlParam(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return decodeURI(r[2]); return null; 
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