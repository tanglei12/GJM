<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<title></title>
<link rel="stylesheet" href="/resources/js/tree/css/demo.css" type="text/css"></link>
<link rel="stylesheet" href="/resources/js/tree/css/zTreeStyle/zTreeStyle.css" type="text/css"></link>
<link rel="stylesheet" href="/resources/common/font-awesome/css/font-awesome.min.css" type="text/css"></link>
<link href="/resources/common/sweet-alert/css/sweetalert.css" rel="stylesheet" type="text/css">
<link href="/resources/css/book/houseBookTemplateConfig.css" rel="stylesheet" type="text/css">

<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>

<script src="/resources/common/sweet-alert/js/sweetalert-dev.js"></script>
<script type="text/javascript"
	src="/resources/js/tree/js/jquery.ztree.all-3.5.min.js"></script>
<script type="text/javascript"
	src="/resources/js/book/houseBookTemplateConfig.js"></script>
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

.dd-checkbox{
	position:relative;
	top: 10px;
	float: left;
	width: 20px!important;
	height: 20px;
	margin-left: 20px;
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
	bottom: 45px;
	position: relative;
	z-index: 1;
}

.tab_menu {
	width: 100%;
	float: left;
	bottom: 7px;
	position: relative;
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

#tab .tab_box {
	width: 608px;
	height: 573px;
	position: relative;
	bottom: -28px;
	border: 1px solid #ccc;
	background-color: #fff;
}

.tab_box {
	width: 608px;
	height: 573px;
	position: relative;
	bottom: 44px;
	border: 1px solid #ccc;
	background-color: #fff;
}

#tab .tab_menu .selected {
	position: relative;
    float: left;
    height: 35px;
    width: 60px;
    line-height: 40px;
    padding: 0 12px;
    font-size: 14px;
    color: #fff;
    background: rgb(77, 193, 154);
    border: 1px solid #BDC6CF;
    border-radius: 2px;
    margin: 0px;
    cursor: pointer;
}

.tab_menu .selected {
	position: relative;
    float: left;
    height: 35px;
    width: 60px;
    line-height: 40px;
    padding: 0 12px;
    font-size: 14px;
    color: #fff;
    background: rgb(77, 193, 154);
    border: 1px solid #BDC6CF;
    border-radius: 2px;
    margin: 0px;
    cursor: pointer;
}

.hide {
	display: none;
}

.tab_box {
	padding: 0px 60px 60px 60px;
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
			onCheck: zTreeOnCheck,
			onClick: zTreeOnClick,
			onRemove: zTreeOnRemove,
// 			beforeClick : zTreeOnCheck,
			beforeDrop : beforeDrop,
			beforeDrag : beforeDrag,//节点被拖拽之前的回调，根据返回值确定是否允许开启拖拽操作
			onDrop : onDrop
		}
	};
	//是否开启拖拽功能 返回:[T/F]
	function beforeDrag(treeId, treeNodes) {
		return false;
	};
	
	function zTreeOnRemove(event, treeId, treeNode) {
		var checkIds = $("#setNodeInfo").val();
		var id = clickFlag.id;
		if(checkIds.indexOf(id) > 0){
			$("#setNodeInfo").replace(id + "&", "");
		}
	};
	
// 	var dragId;
	function beforeDrag(event, treeId, treeNodes) {
		return true;
	};
	function zTreeOnClick(event, treeId, treeNode) {
		var checkIds = $("#setNodeInfo").val();
		var id = clickFlag.id;
		if(checkIds.indexOf(id + "&") < 0){
			$("#setNodeInfo").val(checkIds + id + "&");
		}
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
	}

	function zTreeOnCheck(treeId, treeNode, clickFlag) {
		var checkIds = $("#setNodeInfo").val();
		var id = clickFlag.id;
		if(checkIds.indexOf(id + "&") < 0){
			$("#setNodeInfo").val(checkIds + id + "&");
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
	<table border="1" id="bookTable"
		style="font-size: 12px; background-color: #fff; width: 96%; min-width: 1115px; margin: 0px auto; margin-top: 20px;">
		<tr>
			<td colspan="4">
				<div class="box-title" id="contract-object" style="">预约模板配置管理</div>
			</td>
		</tr>
	</table>
	<input type="hidden" id="jump_bt_id" value="${bt_id}">
	<input type="hidden" id="jump_bs_id" value="${bs_id}">
	<input type="hidden" id="jump_type" value="${type}">
	<input type="hidden" id="nodeIds" value="">
	<div style="width: 80%; min-width:1115px; margin: 0px 0px 0px -60px; border: 0px red solid; margin-top: 60px; height: 86%;">
			<ul class="tab_menu" style="margin-left: 110px;" >
				<li class="selected" id="refreshButton">
					<input type="button" class="selected" style="border: none" onclick="ck_refresh();" value="刷 新">
				</li>
	 		</ul>
		<div class="content_wrap" id="configTree"
			style="float: left; position: absolute; top: 140px; left: 50px; height: 655px; width: 370px;">
			<div class="zTreeDemoBackground left">
				<ul id="treeDemo" class="ztree" style="width: 370px; border: 1px solid #eeeeee;"></ul>
			</div>
		</div>
		<div class="content_wrap" id="configButtons"
			style="float: left; position: absolute; top: 400px; left: 442px; height: 150px; width: 45px;">
			<div class="zTreeDemoBackground left">
				<input type="button" value=" >> " style="width:45px;" onclick="addAll();">
				<br><br>
				<input type="button" value=" > "  style="width:45px;" onclick="addMore();">
				<br><br>
				<input type="button" value=" < "  style="width:45px;" onclick="removeMore();">
				<br><br>
				<input type="button" value=" << "  style="width:45px;" onclick="removeAll();">
			</div>
		</div>
		<!-- 选项卡代码 开始 -->
		<div id="tab" style="margin-left: 558px;">
			<ul class="tab_menu" style="margin-left: 0px;" >
				<li class="selected" id="backConfigButton">
					<input type="button" class="selected" style="border: none" onclick="ck_back();" value="返 回">
				</li>
				<li class="selected" id="saveConfigButton">
					<input type="button" class="selected" style="border: none" onclick="ck_saveConfig();" value="保 存">
				</li>
				<li class="selected" id="exportConfigButton">
					<input type="button" class="selected" style="border: none" onclick="ck_export();" value="导 出">
				</li>
	 		</ul>
			<div class="tab_box">
				<input type="hidden" id="setNodeInfo" value="">
				<input type="hidden" id="saveBCIds" value="">
				<div id="setTemplate" style="border: 0px red solid; float: left; left: 400px; width: 500px;">
				</div>
			</div>
		</div>
		<div class="content_wrap" id="updawnButtons"
			style="float: left; position: absolute; top: 410px; left: 1240px; height: 655px; width: 370px;">
			<div class="zTreeDemoBackground left">
				<input type="button" value=" ∧ " style="height:45px;" onclick="upOne();">
				<br><br>
				<input type="button" value=" ∨ "  style="height:45px;" onclick="downOne();">
				<br><br>
			</div>
		</div>
	</div>
</body>
</html>
