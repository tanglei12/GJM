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

<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>

<script src="/resources/common/sweet-alert/js/sweetalert-dev.js">
	/* 提示弹窗 */
</script>
<script type="text/javascript"
	src="/resources/js/tree/js/jquery.ztree.all-3.5.min.js"></script>
<script type="text/javascript"
	src="/resources/js/book/houseBookConfigManage.js"></script>
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

#tab .tab_menu {
	width: 100%;
	float: left;
	position: absolute;
	z-index: 1;
}

#tab .tab_menu li a {
	text-decoration: none;
	color: gray;
}

#tab .tab_menu li {
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

#tab .tab_box {
	width: 420px;
	height: 511px;
	position: relative;
	top: 30px;
	border: 1px solid #ccc;
	background-color: #fff;
}

#tab .tab_menu .selected {
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
		var $tab_li = $('#tab ul li');
		$tab_li.click(function() {
			$(this).addClass('selected').siblings().removeClass('selected');
			var index = $tab_li.index(this);
			$('div.tab_box > div').eq(index).show().siblings().hide();
		});
	});

	var setting = {
		treeId : "zitTree",
		check: {
		      enable: true
		},
		onClick: zTreeOnClick,
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
	
// 	var dragId;
	function beforeDrag(event, treeId, treeNodes) {
		return true;
	}
	function zTreeOnClick(event, treeId, treeNode) {
// 	    alert(treeNode.tId + ", " + treeNode.name);
		$("#checkAddType").show();
	};
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
		addBookConfigTreeInit(treeNode);
		var addType = $("#addtype option:selected").val();
		var bc_id = $("#bc_id").val();
		var bc_pid = $("#bc_pid").val();
		if(addType == "3"){
			if(null == bc_id || "" == bc_id || bc_id == undefined ||
					null == bc_pid || "" == bc_pid || bc_pid == undefined){
				swal("请选择节点!");
				return false;
			}
			$.ajax({
			    type: "POST",
			    url: "/book/queryHouseBookConfigById",
			    data:"bc_id="+bc_id,
			    contentType: "application/x-www-form-urlencoded; charset=utf-8",
			    success: function(result) {
			    	var data = result.houseBookConfig;
			    	if(data!=null&&data!=""){
			    		$("#bc_id").val(data.bc_id);
			    		$("#bc_pid").val(data.bc_pid);
			    		$("#fieldNameCn").val(data.fieldNameCn);
			    		$("#fieldNameEn").val(data.fieldNameEn);
			    		$("#elementType_h").val(data.elementType);
// 			    		$("#elementType").find("option:selected").text(data.elementType);
			    		$("#defaultValue").val(data.defaultValue);
			    		$("#fieldValue").val(data.fieldValue);
			    		$("#placeholder").val(data.placeholder);
			    		$("#isNull_h").val(data.isNull);
// 			    		$("#isNull").find("option:selected").text(data.isNull);
			    		$("#isUtf8_h").val(data.isUtf8);
// 			    		$("#isUtf8").find("option:selected").text(data.isUtf8);
			    		$("#regRule").val(data.regRule);
			    	}
			    }
			});
		}
	};

	var zNodes = ${configJson};
	$(function() {
		$.fn.zTree.init($("#treeDemo"), setting, zNodes);
      	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
      	//全部展开
      	zTree.expandAll(true);
      	//Y代表勾选时,N代表取消勾选 p代表父节点,s代表字节点
      	setting.check.chkboxType = { "Y" : "ps", "N" : "ps" };
	});

	function beforeDrop(treeId, treeNodes, targetNode, moveType) {
		return targetNode ? targetNode.drop !== false : true;
	}

</script>
</head>

<body>
	<table border="1"
		style="font-size: 12px; background-color: #fff; width: 96%; min-width: 1115px; margin: 0px auto; margin-top: 20px;">
		<tr>
			<td colspan="4">
				<div class="box-title" id="contract-object" style="">预约模板配置管理</div>
			</td>
		</tr>
	</table>

	<div style="width: 80%; min-width:1115px; margin: 0px 0px 0px -60px; border: 0px red solid; margin-top: 60px; height: 86%;">
		<div class="content_wrap"
			style="float: left; position: absolute; top: 140px; left: 50px; height: 655px; width: 370px;">
			<div class="zTreeDemoBackground left">
				<ul id="treeDemo" class="ztree" style="width: 370px; border: 1px solid #eeeeee;"></ul>
			</div>
		</div>
		<!-- 选项卡代码 开始 -->
		<div id="tab" style="margin-left: 558px;">
<!-- 			<ul class="tab_menu" style="margin-left: 255px;"> -->
<!-- 				<li class="selected"><a href="javascript:;">添加物业</a></li> -->
<!-- 				<li onclick="updatecompany();"><a href="javascript:;">修改</a></li> -->
<!-- 			</ul> -->
				<dl style="width: 100%; margin-bottom: 10px;" id="checkAddType">
					<dt>操作类型:</dt>
					<dd>
						<select id="addtype" onchange="checkAddType()" style="height: 30px; width: 100px;">
						<option value="1">添加同级</option>
						<option value="2">添加子级</option>
						<option value="3">更新</option>
						</select><em>*</em>
					</dd>
				</dl>
				<form action="/book/saveBookConfigParam" method="POST" id="saveForm">
					<div class="tab_box">
						<div id="tianjiawuye" style="border: 0px red solid; float: left 400px; width: 500px;">
							<input type="hidden" id="bc_id" name="bc_id" value="" />
							<input type="hidden" id="bc_pid" name="bc_pid" value="" />
							<input type="hidden" id="isFather" name = "isFather" value="" />
							<dl style="width: 100%; margin-bottom: 10px;">
								<dt>中文名</dt>
								<dd style="width: 205px;"><input type="text" value=""
								id="fieldNameCn" class="form-control jianju"
								name="fieldNameCn"
								placeholder="请输入中文名" onclick="checknull1();">
								<em>*</em>
								<span id="checkFieldNameCn" hidden="hidden" style="color: red;">中文名不能为空!</span>
								</dd>
							</dl>
							<dl style="width: 100%; margin-bottom: 10px;">
								<dt>英文名</dt>
								<dd style="width: 205px;">
									<input type="text" value="" id="fieldNameEn" class="form-control jianju"
									name="fieldNameEn" placeholder="请输入英文名" onclick="checknull1();">
									<em>*</em>
									<span id="checkFieldNameEn" hidden="hidden" style="color: red;">英文名不能为空!</span>
								</dd>
							</dl>
							<dl style="width: 100%; margin-bottom: 10px;">
								<dt>类型</dt><input type="hidden" id="elementType_h" name="elementType" value="">
								<dd style="width: 205px;"><select id="elementType" class="form-control"
								style="width: 180px; height: 30px;">
								<option value="name">名称</option>
								<option value="radio">单选框</option>
								<option value="checkbox">多选框</option>
								<option value="select">下拉框</option>
								<option value="text">文本框</option>
								<option value="textarea">文本域</option>
								<option value="file">附件</option>
								<option value="option">选项</option>
							</select><em>*</em></dd>
							</dl>
							<dl style="width: 100%; margin-bottom: 10px;">
								<dt>默认值</dt>
								<dd style="width: 205px;">
									<input type="text" value="" id="defaultValue" class="form-control jianju"
									name="defaultValue" placeholder="" onclick="">
								</dd>
							</dl>
							<dl style="width: 100%; margin-bottom: 10px;">
								<dt>字段值</dt>
								<dd style="width: 205px;">
									<input type="text" value="" id="fieldValue" class="form-control jianju"
									name="fieldValue" placeholder="" onclick="">
								</dd>
							</dl>
							<dl style="width: 100%; margin-bottom: 10px;">
								<dt>placeholder</dt>
								<dd style="width: 205px;">
									<input type="text" value="" id="placeholder" class="form-control jianju"
									name="placeholder" placeholder="" onclick="">
								</dd>
							</dl>
							<dl style="width: 100%; margin-bottom: 10px;">
								<dt>非空</dt><input type="hidden" id="isNull_h" name="isNull" value="">
								<dd style="width: 205px;"><select id="isNull" class="form-control"
								style="width: 180px; height: 30px;">
								<option value="0" checked="checked">否</option>
								<option value="1">是</option>
							</select><em>*</em></dd>
							</dl>
							<dl style="width: 100%; margin-bottom: 10px;">
								<dt>支持UFT-8</dt><input type="hidden" id="isUtf8_h" name="isUtf8" value="">
								<dd style="width: 205px;"><select id="isUtf8" class="form-control"
								style="width: 180px; height: 30px;">
								<option value="0" checked="checked">否</option>
								<option value="1">是</option>
							</select><em>*</em></dd>
							</dl>
							<dl style="width: 100%; margin-bottom: 10px;">
								<dt>校验规则</dt>
								<dd style="width: 205px;">
									<input type="text" value="" id="regRule" class="form-control jianju"
									name="regRule" placeholder="只支持正则表达式校验" onclick="">
								</dd>
							</dl>
							<button class='btn btn-info'
								style="width: 100px; margin: 20px 0px 30px 100px;" type="button"
								onclick='saveConfigParam();'>保存</button>
						</div>
				</form>
			</div>
		</div>
</body>
</html>
