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
<script type="text/javascript" src="/resources/js/propertyInfo/propertyInfoaddandupdate.js?v=1.0"></script>
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
	width: 500px;
	height: 624px;
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
	function addpropertyInfo() {
		$.ajax({
			type : "POST",
			url : "/propertyInfo/addInitpropertyInfo",
			data : "",
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			success : function(result) {
			}
		});
	}
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
		$.ajax({
			type : "post",
			url : "/propertyInfo/updatepropertyInfojiegou",
			data : "id=" + id + "&Pid=" + Pid + "&type=" + moveType+sqlWhere,
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			success : function(result) {
				if (result.result != 0) {
					swal("修改成功！");
				} else {
					swal("修改失败！")
				}
			}
		});
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

	/****************添加物业*********************/
	function addpropertyInfo() {
		if ($.trim($("#upn_id").val()) == "") {
			swal("请先选择一个物业哦 亲!");
			return false;
		}
		if ($.trim($("#addtype").val()) == "-1") {
			swal("请选择添加类型哦 亲!");
			return false;
		}
		if ($("#allcompanyziji").val() == "-1") {
			swal("请选择所属部门哦 亲!");
			return false;
		}
		if ($("#insertQuyu").val() == "-1"){
			swal("请选择所属区域哦 亲!");
			return false;
		}
		if ($("#addPropertyInfo_address").val() == ""
				|| $("#addPropertyInfo_address").val() == null){
			swal("请填写物业地址哦 亲!");
			return false;
		}
		if ($("#addPropertyInfo_coordinate").val() == "" 
				|| $("#addPropertyInfo_coordinate").val() == null){
			swal("请定位物业坐标哦 亲!");
			return false;
		}
		
		if ($("#addpropertyInfozijiname").val() == ""
				|| $("#addpropertyInfozijiname").val() == null
				|| ($("#addpropertyInfo_hao").val() == "" && $("#addtype").val() != "添加同级")
				|| ($("#addpropertyInfo_hao").val() == null  && $("#addtype").val() != "添加同级")) {
			swal("请把带星号的信息填写完整哦  亲!");
			if ($("#addpropertyInfozijiname").val() == ""
					|| $("#addpropertyInfozijiname").val() == null) {
				$("#addpropertyInfozijiname").focus();
			} else {
				$("#addpropertyInfo_hao").focus();
			}
			return false;
		}
		var upn_id = $("#upn_id").val();
		$.ajax({
			type : "POST",
			url : "/propertyInfo/addpropertyInfo",
			data : "upn_id=" + upn_id + "&addtype=" + $("#addtype").val()
					+ "&upn_name=" + $("#addpropertyInfozijiname").val()
					+ "&upn_code=" + $("#addpropertyInfo_hao").val()
					+ "&ucc_short=" + $("#allcompanyziji").val()
					+ "&propertyInfo_quyu=" + $("#insertQuyu").val()
					+ "&propertyInfo_address=" + $("#addPropertyInfo_address").val()
					+ "&propertyInfo_coordinate=" + $("#addPropertyInfo_coordinate").val(),
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			success : function(result) {
				console.log(result);
				if (result.addresult) {
					if (result.addresult != 0) {
						swal("添加成功!", "添加物业号!", "success");
						selProperName();
					} else {
						swal("添加失败,请重试!");
					}
				} else {
					swal("不能再添加子级!");
				}
			}
		});

	}
	
	/****************修改物业*********************/
	function updatepropertyInfo() {
		if ($("#updatepropertyInfo_id").val() == ""
				|| $("#updatepropertyInfo_id").val() == null) {
			swal("请选择一个物业哦  亲!");
			return false;
		}
		if ($("#updatepropertyInfo_Name").val() == ""
				|| $("#updatepropertyInfo_Name").val() == null) {
			swal("请填写物业名称  亲!");
			$("#updatepropertyInfo_Name").onfocus();
			return false;
		}
		if (!$("#updatewuyehao").is(":hidden")) {
			if ($("#updatepropertyInfo_hao").val() == ""
					|| $("#updatepropertyInfo_hao").val() == null) {
				swal("请填写物业号哦  亲!");
				$("#updatepropertyInfo_hao").onfocus();
				return false;
			}
		}
		if ($("#suoshucompany").val() == "-1"
				|| $("#suoshucompany").val() == null) {
			swal("请选择物业所属部门哦  亲!");
			return false;
		}
		if ($("#updateQuyu").val() == "-1"){
			swal("请选择所属区域哦 亲!");
			return false;
		}
		if ($("#updPropertyInfo_coordinate").val() == ""
			|| $("#updPropertyInfo_coordinate").val() == null){
			swal("请定位物业坐标哦 亲!");
			return false;
		}
		if ($("#updPropertyInfo_address").val() == "" 
				|| $("#updPropertyInfo_address").val() == null){
			swal("请填写物业地址哦 亲!");
			return false;
		}
		
		var upn_code = "";
		if(!$("#parentCode").is(":hidden")){
			upn_code = $("#parentCode").find("input").val()+"-"+$("#updatepropertyInfo_hao").val();
		}else{
			upn_code = $("#updatepropertyInfo_hao").val();
		}
		$.ajax({
			type : "POST",
			url : "/propertyInfo/updatepropertyInfoName",
			data : "upn_id=" + $("#updatepropertyInfo_id").val() + "&upn_name="
					+ $("#updatepropertyInfo_Name").val() + "&upn_code="
					+ upn_code + "&ucc_short="
					+ $("#allcompanyxiugai").val()
					+ "&propertyInfo_quyu=" + $("#updateQuyu").val()
					+ "&propertyInfo_address=" + $("#updPropertyInfo_address").val()
					+ "&propertyInfo_coordinate=" + $("#updPropertyInfo_coordinate").val(),
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			success : function(result) {
				if (result.updatepropertyInfo != 0) {
					swal("修改成功!");
				} else {
					swal("修改失败!");
				}
			}
		});

	}
	
	/**********地图坐标*********/
	function mapsszuobiao(){
		var isHidden = $("#addtype").is(":hidden");
		var hi_address = isHidden ? $("#updPropertyInfo_address").val() : $("#addPropertyInfo_address").val();//  "九龙坡杨家坪石杨路万科西九";
		var xyz = isHidden ?$("#updPropertyInfo_coordinate").val() : $("#addPropertyInfo_coordinate").val(); //"106.514286,29.5209";
		$.jBox("iframe:/propertyInfo/map?hi_address="+hi_address+"&xyz="+xyz , {
		    title: "管家婆管理系统",
		    width: 1200,
		    height: 550,
		    buttons: { '关闭': true }
		});
	}
</script>
</head>

<body>
	<table border="1"
		style="font-size: 12px; background-color: #fff; width: 96%; min-width: 1115px; margin: 0px auto; margin-top: 20px;">
		<tr>
			<td colspan="4">
				<div class="box-title" id="contract-object" style="">物业名称管理</div>
			</td>
		</tr>
	</table>

	<div style="width: 80%; min-width:1115px; margin: 0px 0px 0px -60px; border: 0px red solid; margin-top: 60px; height: 86%;">
		<div style="position: absolute;top:70px;left:50px;padding-top: 20px;">
			<div style="float: left;">
				<input type="text" value="" placeholder="请输入物业名称" id="sousuowuyename" style="width: 150px;" name="wuyename" onchange="selProperName()" />
			</div>
			<div style="position: absolute;margin-left: 120px;margin-top: 10px;">
				<i class="fa-search" style="color: #069;content: \f002;" onclick="selProperName()"></i>
			</div>
		</div>
		<div class="content_wrap"
			style="float: left; position: absolute; top: 140px; left: 50px; height: 655px; width: 370px;">
			<div class="zTreeDemoBackground left">
				<ul id="treeDemo" class="ztree" style="width: 370px; border: 1px solid #eeeeee;"></ul>
			</div>
		</div>
		<!-- 选项卡代码 开始 -->
		<div id="tab" style="margin-left: 558px;">
			<ul class="tab_menu" style="margin-left: 255px;">
				<li class="selected"><a href="javascript:;">添加物业</a></li>
				<li onclick="updatecompany();"><a href="javascript:;">修改</a></li>
			</ul>
			<div class="tab_box">
				<div id="tianjiawuye" style="border: 0px red solid; float: left 400px; width: 500px;">
					<input type="hidden" id="upn_id" value="" />
					<input type="hidden" id="upn_pid" value="" />
					<dl style="width: 100%; margin-bottom: 10px;">
						<dt>添加类型:</dt>
						<dd>
							<select id="addtype" onchange="checkaddtype();" style="height: 30px; width: 100px;">
							<option value="-1">添加类型</option>
							<option value="添加同级">添加同级</option>
							<option value="添加子级">添加子级</option>
							</select><em>*</em>
						</dd>
					</dl>
					<dl style="width: 100%; margin-bottom: 10px;">
						<dt>物业名称:</dt>
						<dd style="width: 205px;"><input type="text" value=""
						id="addpropertyInfozijiname" class="form-control jianju"
						name="PropertyInfo_Name"
						placeholder="请输入物业名称" onclick="checknull1();">
						<em>*</em>
						<span id="addpropertyInfoname" hidden="hidden" style="color: red;">名称不能为空!</span>
						</dd>
					</dl>
					<dl id="addwuyehao" style="width: 100%; margin-bottom: 10px;">
						<dt>物业号:</dt>
						<dd style="width: 205px;">
							<input type="text" value="" id="addpropertyInfo_hao" class="form-control jianju"
							name="PropertyInfo_Name" placeholder="物业号" onclick="checknull1();" maxlength="3">
							<em>*</em>
							<span id="zijihao" hidden="hidden" style="color: red;">物业号不能为空!</span>
						</dd>
					</dl>
					<dl style="width: 100%; margin-bottom: 10px;">
						<dt>所属部门:</dt>
						<dd style="width: 205px;"><select id="allcompanyziji" class="form-control"
						style="width: 180px; height: 30px;">
						<option value="-1">所属部门</option>
						<c:forEach items="${companies }" var="com">
							<option value="${com.ucc_short }">${com.ucc_short }</option>
						</c:forEach>
					</select><em>*</em></dd>
					</dl>
					<dl style="width: 100%; margin-bottom: 10px;">
							<dt>区域:</dt>
							<dd style="width: 205px;">
								<select id="insertQuyu" class="form-control" style="width: 180px; height: 30px;">
								<option value="-1">请选择</option>
								<option value="南岸区">南岸区</option>
								<option value="九龙坡区">九龙坡区</option>
								<option value="渝北区">渝北区</option>
								<option value="巴南区">巴南区</option>
								<option value="渝中区">渝中区</option>
								<option value="沙坪坝区">沙坪坝区</option>
								<option value="江北区">江北区</option>
								<option value="大渡口区">大渡口区</option>
								<option value="北碚区">北碚区</option>
								</select>
								<em>*</em>
							</dd>
					</dl>
					<dl id="addwuyeAddress" style="width: 100%; margin-bottom: 10px;">
						<dt>物业地址:</dt>
						<dd style="width: 205px;">
							<input type="text" value="" id="addPropertyInfo_address" class="form-control jianju"
							name="propertyInfo_address" placeholder="物业地址" onclick="checknull1();" >
							<em>*</em>
							<span id="checkPropertyInfo_address" hidden="hidden" style="color: red;">物业地址不能为空!</span>
						</dd>
					</dl>
					<dl id="addwuyeCoordinate" style="width: 100%; margin-bottom: 10px;">
						<dt>物业坐标:</dt>
						<dd style="width: 205px;">
							<input type="text" value="" id="addPropertyInfo_coordinate" class="form-control jianju"
							name="propertyInfo_coordinate" placeholder="物业坐标" onclick="mapsszuobiao();" readonly>
							<em>*</em>
							<span id="checkPropertyInfo_address" hidden="hidden" style="color: red;">物业坐标不能为空!</span>
						</dd>
					</dl>
					<button class='btn btn-info'
						style="width: 100px; margin: 20px 0px 30px 100px;" type="submit"
						onclick='addpropertyInfo();'>添加</button>
				</div>

				<div class="hide">
					<div id="tianjiatongjiwuyediv">
						<dl style="width: 100%; margin-bottom: 10px;">
							<dt>物业名称:</dt>
							<dd style="width: 205px;">
							<input type="text" value=""
							id="updatepropertyInfo_id" class="form-control jianju"
							style="margin-top: -10px;" name="PropertyInfo_id"
							placeholder="请输入物业编码" readonly="readonly"><em>*</em>
							<span id="updateid"></span>
							</dd>
						</dl>
						<dl style="width: 100%; margin-bottom: 10px;">
							<dt>物业编码:</dt>
							<dd style="width: 205px;">
							<input type="text"
							value="" id="updatepropertyInfo_Name" class="form-control jianju"
							name="PropertyInfo_Name"
							placeholder="请输入物业名称" onclick="checknull3();"><em>*</em>
							<span id="updatename" hidden="hidden" style="color: red;">名称不能为空!</span>
							</dd>
						</dl>
						<dl id="updatewuyehao" style="width: 100%; margin-bottom: 10px;">
							<dt>物业号:</dt>
							<dd style="width: 205px;">
								<div id="parentCode" style="width: 85px; float: left; display: none;">
									<input type="text" value="" id="parentNum" class="form-control jianju"
									name="PropertyInfo_Name" style="width: 70px;" readOnly="true" >
									-
								</div>
								<input type="text"
								value="" id="updatepropertyInfo_hao" class="form-control jianju"
								name="PropertyInfo_Name" placeholder="物业号" onclick="checknull3();" style="width: 50px;"><em>*</em>
								<span id="updatehao" hidden="hidden" style="color: red;">物业号不能为空!</span>
							</dd>
						</dl>
						<dl style="width: 100%; margin-bottom: 10px;">
							<dt>所属部门:</dt>
							<dd style="width: 205px;">
								<select id="allcompanyxiugai" class="form-control"
								style="width: 180px; height: 30px;">
								<option value="-1" id="suoshucompany" name="company">所属部门</option>
								<c:forEach items="${companies }" var="com">
									<option value="${com.ucc_short }">${com.ucc_short }</option>
								</c:forEach>
								</select>
							</dd>
						</dl>
						<dl style="width: 100%; margin-bottom: 10px;">
							<dt>区域:</dt>
							<dd style="width: 205px;">
								<select id="updateQuyu" class="form-control" style="width: 180px; height: 30px;">
								<option value="-1">请选择</option>
								<option value="南岸区">南岸区</option>
								<option value="九龙坡区">九龙坡区</option>
								<option value="渝北区">渝北区</option>
								<option value="巴南区">巴南区</option>
								<option value="渝中区">渝中区</option>
								<option value="沙坪坝区">沙坪坝区</option>
								<option value="江北区">江北区</option>
								<option value="大渡口区">大渡口区</option>
								<option value="北碚区">北碚区</option>
								</select>
								<em>*</em>
							</dd>
						</dl>
						<dl id="updwuyeAddress" style="width: 100%; margin-bottom: 10px;">
						<dt>物业地址:</dt>
						<dd style="width: 205px;">
							<input type="text" value="" id="updPropertyInfo_address" class="form-control jianju"
							name="propertyInfo_address" placeholder="物业地址" onclick="checknull1();" >
							<em>*</em>
							<span id="checkUpdPropertyInfo_address" hidden="hidden" style="color: red;">物业地址不能为空!</span>
						</dd>
					</dl>
					<dl id="updwuyeCoordinate" style="width: 100%; margin-bottom: 10px;">
						<dt>物业坐标:</dt>
						<dd style="width: 205px;">
							<input type="text" value="" id="updPropertyInfo_coordinate" class="form-control jianju"
							name="propertyInfo_coordinate" placeholder="物业坐标" onclick="mapsszuobiao();" readonly>
							<em>*</em>
							<span id="checkUpdPropertyInfo_address" hidden="hidden" style="color: red;">物业坐标不能为空!</span>
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
