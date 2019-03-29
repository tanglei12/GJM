<%@ page language="java" pageEncoding="utf-8"%>
<%
	response.setHeader("Pragma","No-cache");
	response.setHeader("Cache-Control","no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<title>合约订单查看</title>
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/css/contractList/displayCancel.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/contractList/displayCancel.js"></script>
</head>
<body>
<div id="main-box" style="width: 1124px;">
	<div class="box-nav">
		<ul>
			<li class="nav-tab-focus">订单查看</li>
		</ul>
	</div>
	<div class="box-content">
		<div class="content-main" style="padding: 0;">
			<div class="content-item" id="cancel-order-box"></div>
		</div>
	</div>
</div>
</body>
</html>