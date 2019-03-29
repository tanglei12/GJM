<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<title></title>
<link rel="stylesheet" href="/resources/js/tree/css/demo.css" type="text/css"></link>
<link rel="stylesheet" href="/resources/js/tree/css/zTreeStyle/zTreeStyle.css" type="text/css"></link>
<link rel="stylesheet" href="/resources/common/font-awesome/css/font-awesome.min.css" type="text/css"></link>
<link href="/resources/common/sweet-alert/css/sweetalert.css" rel="stylesheet" type="text/css">
<link href="/resources/css/propertyInfo/propertyInfomain.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">

<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>

<script type="text/javascript" src="/resources/Plug-in/map/Js/public.js"></script>
<script charset="utf-8" src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script charset="utf-8" src="/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js"></script>
<script src="/resources/common/sweet-alert/js/sweetalert-dev.js"></script>
<script type="text/javascript" src="/resources/js/tree/js/jquery.ztree.all-3.5.min.js"></script>
<script type="text/javascript" src="/resources/js/system/dictionaryConfig.js"></script>
<style>
.ztree li span.button.add {
	margin-left: 2px;
	margin-right: -1px;
	background-position: -144px 0;
	vertical-align: top;
	*vertical-align: middle
}

.box-title {
	position: relative;
	height: 36px;
	line-height: 37px;
	font-size: 15px;
	border-bottom: 1px solid #3E97C9;
	padding: 0 20px;
	/* margin-bottom: 30px; */
	color: #100F0F;
}

input[type="text"] {
	width: 179px;
	height: 34px;
	border-radius: 4px;
	border: 1px solid #ccc;
	text-indent: 5px;
}

.box-title:BEFORE {
	content: "";
	position: absolute;
	height: 20px;
	width: 4px;
	top: 8px;
	left: 8px;
	background: #3E97C9;
	border-radius: 3px;
}

em {
	color: red;
	text-align: center;
	margin-right: 6px;
	position: relative;
	font-size: 14px;
	font-weight: 600;
	top: 3px;
	margin-left: 5px;
}

.btn-info {
	color: #fff;
	background-color: #5bc0de;
	border-color: #46b8da;
}

.btn {
	display: inline-block;
	padding: 6px 12px;
	margin-bottom: 0;
	font-size: 14px;
	font-weight: 400;
	line-height: 1.42857143;
	text-align: center;
	white-space: nowrap;
	vertical-align: middle;
	-ms-touch-action: manipulation;
	touch-action: manipulation;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	background-image: none;
	border: 1px solid transparent;
	border-radius: 4px;
}
</style>
<style type="text/css">
* {
	margin: 0 auto;
	padding: 0;
	list-style-type: none;
}
/* tab */
#tab {
	width: 400px;
	position: relative;
	margin: 50px auto;
}

.tab_menu {
	width: 100%;
	float: left;
	position: absolute;
	z-index: 1;
}

.tab_menu li a {
	text-decoration: none;
	color: gray;
}

.tab_menu li {
	float: left;
	width: 92px;
	height: 30px;
	line-height: 30px;
	border: 1px solid #ccc;
	border-bottom: 0px;
	cursor: pointer;
	text-align: center;
	margin: 0 2px 0 0;
	list-style-type: none;
}

.tab_box {
	width: 500px;
	height: 624px;
	position: relative;
	top: 50px;
	border: 1px solid #ccc;
	background-color: #fff;
}

.tab_menu .selected {
	background-color: #CBE9EC;
	cursor: pointer;
}

.hide {
	display: none;
}

.tab_box {
	padding: 60px;
}
</style>
<script type="text/javascript">
	$(document).ready(function() {
		var $tab_li = $('ul li');
		$tab_li.click(function() {
			$(this).addClass('selected').siblings().removeClass('selected');
			var index = $tab_li.index(this);
			$('div.tab_box > div').eq(index).show().siblings().hide();
		});
	});
	$(function() {
		$("#updatewuye").hide();
	});

	var setting = {
		treeId : "zitTree",
		edit : {
			drag : {
				isCopy : false,
				isMove : true,
				prev : false, //前面
			//inner: dropInner, 
			//next: dropNext //T 平级
			},
			enable : true,
			showRemoveBtn : false,
			showRenameBtn : false
		},
		data : {
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey : "pid",
				rootPId : 0
			}
		},
		callback : {
			beforeClick : zTreeOnCheck,
			beforeDrop : beforeDrop,
			beforeDrag : beforeDrag,//节点被拖拽之前的回调，根据返回值确定是否允许开启拖拽操作
			onDrop : onDrop
		}
	};
	//是否开启拖拽功能 返回:[T/F]
	function beforeDrag(treeId, treeNodes) {
		return false;
	};
	
	var dragId;
	function beforeDrag(event, treeId, treeNodes) {
		//最高级不能拖动
		/* if (treeId[0].pid == 0) {
			swal("最高级物业不能拖拽哦 亲!");
			return false;
		} */
		
		return true;
	}
	//拖拽
	function onDrop(event, treeId, treeNodes, targetNode, moveType) {
		var id,Pid,sqlWhere="";
		if (targetNode == null) {
			Pid = 0
			id = treeNodes[0].id;
			sqlWhere = "&name="+treeNodes[0].name;
		}else{
			id = treeNodes[0].id;//获得被拖拽的节点id 
			Pid = targetNode.id;//获得目标id
		}
// 		$.ajax({
// 			type : "post",
// 			url : "/propertyInfo/updatepropertyInfojiegou",
// 			data : "id=" + id + "&Pid=" + Pid + "&type=" + moveType+sqlWhere,
// 			contentType : "application/x-www-form-urlencoded; charset=utf-8",
// 			success : function(result) {
// 				if (result.result != 0) {
// 					swal("修改成功！");
// 				} else {
// 					swal("修改失败！")
// 				}
// 			}
// 		});
	}

	function zTreeOnCheck(treeId, treeNode, clickFlag) {
		addpropertyInfoInit(treeNode);
		updatepropertyInfoInit(treeNode);
	};

	var zNodes = ${pInfoNames};
	var tree = null;
	$(function() {
		tree = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
	});

	function beforeDrop(treeId, treeNodes, targetNode, moveType) {
		/* if ((treeNodes[0].sid != targetNode.sid)
				&& (treeNodes[0].sid != targetNode.id)) {
			swal("只能拖拽到当前根物业哦 亲!");
			return false;
		} */
		return targetNode ? targetNode.drop !== false : true;
	}

	/****************添加参数*********************/
	function addDictionaryInfo() {
		var data = {};
		var UserDictionary = {};
		var addType = $("#addtype").val();
		if("0" == addType){
			UserDictionary.dr_pid = 0;
		} else if("1" == addType){
			UserDictionary.dr_pid = $("#addDrPid").val();
		} else if("2" == addType){
			UserDictionary.dr_pid = $("#addDrId").val();
		}
		
// 		UserDictionary.dr_pid = $("#addDrPid").val();
		UserDictionary.is_parent = $("[name=isParent_add]").val();
		UserDictionary.propertyId = $("#addPropertyId").val();
		UserDictionary.dictionary_name = $("#addDictionary_name").val();
		UserDictionary.dictionary_value = $("#addDictionary_value").val();
		UserDictionary.dictionary_status = $("[name=dictionary_status]").val();
		UserDictionary.remark = $("#addRemark").val();
		data.UserDictionary = JSON.stringify(UserDictionary);
		$.ajax({
			type : "POST",
			url : "/dictionary/saveDictionaryInfo",
			data : JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success : function(result) {
				if(result.error != null && result.error != undefined){
					swal(result.error, "更新数据字典参数!", "error");
					return;
				}
				if (result.addresult != 0) {
					swal("添加成功!", "添加数据字典参数!", "success");
					var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
					treeObj.refresh();
				} else {
					swal("添加失败,请重试!");
				}
			}
		});
	}
	
	/****************修改参数*********************/
	function updatepropertyInfo() {
		var data = {};
		var UserDictionary = {};
		UserDictionary.dr_id = $("#updDrId").val();
		UserDictionary.dr_pid = $("#updDrPid").val();
		UserDictionary.is_parent = $("[name=isParent_upd]").val();
		UserDictionary.propertyId = $("#updPropertyId").val();
		UserDictionary.dictionary_name = $("#updDictionary_name").val();
		UserDictionary.dictionary_value = $("#updDictionary_value").val();
		UserDictionary.dictionary_status = $("[name=dictionaryStatus]").val();
		UserDictionary.remark = $("#updRemark").val();
		data.UserDictionary = JSON.stringify(UserDictionary);
		$.ajax({
			type : "POST",
			url : "/dictionary/saveDictionaryInfo",
			data : JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success : function(result) {
				if(result.error != null && result.error != undefined){
					swal(result.error, "更新数据字典参数!", "error");
					return;
				}
				if (result.addresult != 0) {
					swal("更新成功!", "更新数据字典参数!", "success");
					var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
					treeObj.refresh();
				} else {
					swal("更新失败,请重试!");
				}
			}
		});
	}
	
</script>
</head>

<body>
	<table border="1"
		style="font-size: 12px; background-color: #fff; width: 96%; min-width: 1115px; margin: 0px auto; margin-top: 20px;">
		<tr>
			<td colspan="4">
				<div class="box-title" id="contract-object" style="">数据字典</div>
			</td>
		</tr>
	</table>

	<div style="width: 80%; min-width:1115px; margin: 0px 0px 0px -60px; border: 0px red solid; margin-top: 60px; height: 86%;">
		<div style="position: absolute;top:70px;left:50px;padding-top: 20px;">
			<div style="float: left;">
				<input type="text" value="" placeholder="请输入参数名称" id="searchDicName" style="width: 150px;" name="wuyename" onchange="selProperName()" />
			</div>
			<div style="position: absolute;margin-left: 120px;margin-top: 10px;">
				<i class="fa-search" style="color: #069;content: \f002;" onclick="selProperName()"></i>
			</div>
		</div>
		<div class="content_wrap"
			style="float: left; position: absolute; top: 140px; left: 50px; height: 655px; width: 370px;">
			<div class="zTreeDemoBackground left">
				<ul class="tab_menu" style="">
					<li class="selected"><a href="javascript:;">添加</a></li>
					<li onclick=""><a href="javascript:;">修改</a></li>
				</ul>
				<ul id="treeDemo" class="ztree" style="margin-top: 30px; width: 370px; border: 1px solid #eeeeee;"></ul>
			</div>
		</div>
		<!-- 选项卡代码 开始 -->
		<div id="tab" style="margin-left: 558px;">
			<div class="tab_box">
				<div id="tianjiawuye" style="border: 0px red solid; float: left 400px; width: 500px;">
					<input type="hidden" id="upn_id" value="" />
					<input type="hidden" id="upn_pid" value="" />
					<dl style="width: 100%; margin-bottom: 10px;" id="addTypeDl">
						<dt>添加类型:</dt>
						<dd>
							<input type="hidden" id="addDrId" value="">
							<input type="hidden" id="addDrPid" value="">
							<select id="addtype" onchange="checkaddtype(this);" style="height: 30px; width: 100px;">
								<option value="0">添加类型</option>
								<option value="1">添加同级</option>
								<option value="2">添加子级</option>
							</select><em>*</em>
						</dd>
					</dl>
					<dl style="width: 100%; margin-bottom: 10px;">
						<dt>父级:</dt>
						<dd style="width: 205px;">
							<input type="radio" value="1" name="isParent_add" onclick="checkIsParent();" id="yes_add">是<input type="radio" value="0" name="isParent_add" onclick="checkIsParent();"  id="no_add">否
						</dd>
					</dl>
					<dl style="width: 100%; margin-bottom: 10px;" id="propertyIdDl">
						<dt>编号:</dt>
						<dd style="width: 205px;"><input type="text" value=""
						id="addPropertyId" class="form-control jianju" onfocus = "isSelect();"
						name="propertyId" placeholder="请输入编号">
						<em>*</em>
						</dd>
					</dl>
					<dl style="width: 100%; margin-bottom: 10px;">
						<dt>参数名称:</dt>
						<dd style="width: 205px;">
							<input type="text" value="" id="addDictionary_name" class="form-control jianju"
							name="dictionary_name" placeholder="参数名称" maxlength="">
							<em>*</em>
						</dd>
					</dl>
					<dl style="width: 100%; margin-bottom: 10px;">
						<dt>参数值:</dt>
						<dd style="width: 205px;">
							<input type="text" value="" id="addDictionary_value" class="form-control jianju"
							name="dictionary_value" placeholder="参数值" maxlength="">
							<em>*</em>
						</dd>
					</dl>
					<dl style="width: 100%; margin-bottom: 10px;">
						<dt>状态:</dt>
						<dd style="width: 205px;">
							<input type="radio" value="1" name="dictionary_status" checked>生效<input type="radio" name="dictionary_status" value="0">无效
						</dd>
					</dl>
					<dl style="width: 100%; margin-bottom: 10px;">
						<dt>备注:</dt>
						<dd style="width: 205px;">
							<textarea type="text" value="" style="width:176px;height:50px;" id="addRemark" class="form-control jianju"
							name="remark" placeholder="备注"></textarea>
						</dd>
					</dl>
					<button class='btn btn-info'
						style="width: 100px; margin: 20px 0px 30px 100px;" type="button"
						onclick='addDictionaryInfo()'>添加</button>
				</div>

				<div class="hide">
					<div id="tianjiatongjiwuyediv">
						<input type="hidden" id="updDrId" value="">
						<input type="hidden" id="updDrPid" value="">
						<dl style="width: 100%; margin-bottom: 10px;">
							<dt>父级:</dt>
							<dd style="width: 205px;">
								<input type="radio" value="1" name="isParent_upd" onclick="checkIsParent();"  id="yes_upd">是<input type="radio" value="0" name="isParent_upd" onclick="checkIsParent();"  id="no_upd">否
							</dd>
						</dl>
						<dl style="width: 100%; margin-bottom: 10px;" id="updProperIdDl">
							<dt>编号:</dt>
							<dd style="width: 205px;"><input type="text" value=""
								id="updPropertyId" class="form-control jianju" onfocus = "isSelect();"
								name="propertyId" placeholder="请输入编号">
							<em>*</em>
						</dd>
					</dl>
					<dl style="width: 100%; margin-bottom: 10px;">
						<dt>参数名称:</dt>
						<dd style="width: 205px;">
							<input type="text" value="" id="updDictionary_name" class="form-control jianju"
							name="dictionary_name" placeholder="参数名称" maxlength="">
							<em>*</em>
						</dd>
					</dl>
					<dl style="width: 100%; margin-bottom: 10px;">
						<dt>参数值:</dt>
						<dd style="width: 205px;">
							<input type="text" value="" id="updDictionary_value" class="form-control jianju"
							name="dictionary_value" placeholder="参数值" maxlength="">
							<em>*</em>
						</dd>
					</dl>
					<dl style="width: 100%; margin-bottom: 10px;">
						<dt>状态:</dt>
						<dd style="width: 205px;">
							<input type="radio" value="1" name="dictionaryStatus" id="eftStatus">生效<input type="radio" value="0" name="dictionaryStatus" id="expStatus">无效
						</dd>
					</dl>
					<dl style="width: 100%; margin-bottom: 10px;">
						<dt>备注:</dt>
						<dd style="width: 205px;">
							<textarea type="text" value="" style="width:176px;height:50px;" id="updRemark" class="form-control jianju"
							name="remark" placeholder="备注"></textarea>
						</dd>
					</dl>
					<input type="hidden" value="" id="parenthao" class="form-control jianju" name="" />
					<button class='btn btn-info'
							style='width: 100px; margin: 20px 0px 30px 100px;' type='submit'
							onclick='updatepropertyInfo();'>修改</button>
					</div>
				</div>
			</div>
		</div>
		<!--选项卡结束  -->
	</div>
</body>
</html>
