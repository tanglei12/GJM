<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%> 
<%
	response.setHeader("Pragma","No-cache");
	response.setHeader("Cache-Control","no-cache");
	response.setDateHeader("Expires", -10);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>添加客户</title>
</head>
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/common/sweet-alert/css/sweetalert.css" rel="stylesheet" type="text/css">
<link href="/resources/css/customerCss.css" rel="stylesheet" type="text/css">
<link href="/resources/common/uber-zoom/uber-zoom.css" rel="stylesheet" type="text/css"><!-- 图片缩放 -->
<link href="/resources/common/zyupload/skins/zyupload-1.0.0.css" rel="stylesheet" type="text/css"><!-- 文件上传插件 -->

<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="/resources/js/customerSeeAdd.js"></script>
<script type="text/javascript" src="/resources/js/jquery.cookie.js"></script>
<script src="/resources/common/sweet-alert/js/sweetalert-dev.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/Plug-in/jquery.rotate/jquery.rotate.min.js"></script>
<script src="/resources/common/uber-zoom/uber-zoom.js"></script><!-- 图片缩放 -->
<script src="/resources/common/zyupload/zyupload-1.0.0.js"></script><!-- 文件上传插件 -->
<body style="background-color: #f5f5f5">
<div id="main-box">
	<div class="box-nav"><ul><li class="nav-tab-focus">房屋带看</li></ul></div>
	<div class="box-content" style="padding-top: 20px;">
		<div id="sgin-infoT">
			<dl class="content-dl">
				<dt><em>*</em>客户姓名</dt>
				<dd>
					<input type="text" class="from-data validate[required]" name="contactPeople" id="userName" data-id="sgin" placeholder="客户姓名">
					<div class="addButton-icon addButton-icon-add" onclick="openModel(this,'sginInfo');" id="userButton"></div>
				</dd>
				<dd class="msg"></dd>
			</dl>
			<dl class="content-dl">
				<dt><em>*</em>客户电话</dt>
				<dd>
					<input type="text" class="from-data validate[required]" name="contactPhone" id="userPhone" placeholder="客户电话">
				</dd>
				<dd class="msg"></dd>
			</dl>
			<dl class="content-dl">
				<dt><em>*</em>性别</dt>
				<dd>
					<select class="from-data" id="selectSex"><option>男</option><option>女</option><option>其他</option></select>
				</dd>
				<dd class="msg"></dd>
			</dl>
			<dl class="content-dl">
				<dt><em>*</em>房屋地址</dt>
				<dd>
					<input type="text" class="from-data validate[required]" id="houseInfo" placeholder="房屋地址" autocomplete="off" style="width: 334px;" readonly>
					<input type="hidden" name="serviceObjHouseId" id="houseId" >
					<input type="hidden" name="InputMeasure" id="InputMeasure" >
					<input type="hidden" name="InputHouseF" id="InputHouseF" >
					<div id="queryList">
						<div id="search-box"><input type="text" placeholder="输入房屋地址、房号、甲方姓名、联系电话"></div>
						<div id="search-show">
							<div class="search-tisp">没有数据</div>
						</div>
					</div>
				</dd>
				<dd><div class="from-data-state"></div></dd>
				<dd class="msg"></dd>
			</dl>
			<dl class="content-dl">
				<dt class="item"><!-- <em>*</em> --><span class="item-titile">看房照片</span></dt>
				<dd class="item">
					<div class="images-box" id="CUM-box">
						<c:if test="${empty htzImgs or fn:length(htzImgs)<3}">
							<a href="javascript:;" class="images-btn" data-box="htzupload" data-type="CUM">选择图片</a>
						</c:if>
						<div id="htzupload" class="upload-box"></div>
						<c:forEach items="${htzImgs}" var="item" varStatus="status">
							<div class="images-box-img">
								<img class="showboxImg" src="${item}">
								<span class="images-box-img-delete" data-type="CUM">删除</span>
							</div>
						</c:forEach>
					</div>
				</dd>
				<dd class="tisp" style="clear: both; margin-left: 120px;"><span id="CUM-count">${fn:length(htzImgs)}</span>/<span id="CUM-limit" >3</span></dd>
			</dl>
			<dl class="content-dl">
				<dt><em>*</em>客户需求</dt>
				<dd>
					<textarea class="from-control" rows="" cols="" id="customerText"></textarea>
				</dd>
				<dd class="msg"></dd>
			</dl>
			<dl class="content-dl">
				<dt>客户意见</dt>
				<dd>
					<textarea class="from-control" rows="" cols="" id="customerContent"></textarea>
				</dd>
				<dd class="msg"></dd>
			</dl>
			<dl class="content-dl" style="display: none;" id="failText">
				<dt><em>*</em>失败原因</dt>
				<dd>
					<textarea class="from-control" rows="" cols=""></textarea>
				</dd>
				<dd class="msg"></dd>
			</dl>
			<dl class="content-dl" id="failText" style="display: none;">
				<dt><em>*</em>定金</dt>
				<dd>
					<input type="text" class="from-data validate[required]"  onkeyup="checkNum(this)" name="contactMoney" id="contactMoney" placeholder="定金">
					<div style="margin-left: 194px; color:#FFF; background-color: #3498DB; border-radius: 5px; width: 100px; text-align: center; cursor:pointer;" onclick="yudOrder()">预定订单</div>
				</dd>
				<dd class="msg"></dd>
			</dl>
			<dl class="content-dl" style="margin-top: 20px;" id="Ubutton">
				<dt></dt>
				<dd style="width: 130px;">
					<button class="from-data" onclick="successSubmit('0')">跟进</button>
				</dd>
				<dd style="width: 130px;">
					<button class="from-data" onclick="successSubmit('1')">成功</button>
				</dd>
				<dd style="width: 130px;">
					<button class="from-data" onclick="failSubmit('2')">失败</button>
				</dd>
				<dd class="msg"></dd>
			</dl>
			<input type="hidden" id="userChoice" value="0" />
		</div>
	</div>
</div>
<!-- 提示信息 -->
<div>
	<div class="model-mark"></div>
	<!-- 客户信息 -->
	<div class="model-content window" id="sginInfo">
		<div class="model-drag">
			<span id="model-drag-title">客户资料</span>
			<i onclick="closeModel();" title="按ESC键可以关闭"></i>
		</div>
		<div class="model-main" id="main1">
			<div class="model-search">
				<i class="fa-search"></i>
				<input type="text" id="sginInfo-search" placeholder="客户姓名、手机号码">
			</div>
			<div class="model-list">
				<table>
					<thead>
						<tr>
							<th width="10%">客户姓名</th>
							<th width="7%">性别</th>
							<th width="13%">手机号</th>
							<th width="50%">需求</th>
						</tr>
					</thead>
					<tbody id="sginInfo-Body"></tbody>
				</table>
			</div>
			<div class="model-footer">
				<span class="foot-left state-ok fa-angle-left" onclick="pageUp()" ></span>
				<input type="text" class="foot-left" id="pageNo" onkeyup="bindUpDown()" value="1" title="按“Enter”跳页，上下翻页">
				<span class="foot-left state-ok icon-angle-right" onclick="pageDown()"></span>
				<div class="foot-right">共<span id="totalPage"></span>页，<span id="totalRecords"></span>条记录</div>
			</div>
		</div>
	</div>
</div>
<!-- end -->
</body>
</html>