<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
<link href="/resources/css/authorization/settingPowers.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script><!-- 提示弹窗 -->
<script src="/resources/js/authorization/settingPowers.js"></script>
</head>
<body>
	<div class="center">
		<div class="title">
			<i class="fa fa-group"></i>
			<label class="title-font" id="titleName"></label>
			<input type="hidden" name="type" id="type"/>
			<input type="hidden" name="typeId" id="typeId"/>
		</div>
		<div class="menu">
			<ul>
				<li class="clicks">设置权限<i class="bottom-triangle"></i></li>
			</ul>
		</div>
		<div class="content">
			<div class="content-operation">
				<button onclick="saveSetting()">确认设置</button>
			</div>
			<div class="content-center" id="content-center" >
				<div class="powersList" id="powersList">
		
				</div>
			</div>
		</div>
	</div>
</body>
</html>