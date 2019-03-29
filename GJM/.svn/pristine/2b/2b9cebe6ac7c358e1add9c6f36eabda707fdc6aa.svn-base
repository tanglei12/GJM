<%@ page language="java" pageEncoding="utf-8"%>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="Expires" CONTENT="0">
	<meta http-equiv="Cache-Control" CONTENT="no-cache">
	<meta http-equiv="Pragma" CONTENT="no-cache">
	<title></title>
	<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
	<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 字体图标 -->
	<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
	<link href="/resources/css/table-min.css" rel="stylesheet" type="text/css">
	<link href="/resources/css/contractList/contractAnimate.css" rel="stylesheet" type="text/css">
	<link href="/resources/common/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">

	<script src="/resources/js/jquery-1.7.2.min.js"></script>
	<script src="/resources/Plug-in/My97DatePicker/WdatePicker.js"></script>
	<script src="/resources/Plug-in/jquery.cookie/jquery-cookie.js"></script>
	<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
	<script src="/resources/common/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>
	<script src="/resources/js/common/common.js"></script>
	<script src="/resources/js/table-min.js"></script>
	<script src="/resources/js/service/serviceChargeRecord.js"></script>
</head>
<body>
<div id="content" style="padding:12px;"></div>
<div id="contractInfo" class="contractInfo" style="display:none;">
	<div style="height: 40px; margin: 10px; margin-right: 30px; border: 1px solid #ddd;">
		<span class="contractInfo-refresh" onclick="refreshDiv()" style="margin-right: 55px;"><i class="icon-refresh"></i></span>
		<span class="contractInfo-close" onclick="closeDiv()" style="margin-right: 15px;"><i class="fa fa-close"></i></span>
	</div>
	<div id="iframeDiv" style="width: 100%; height: 100%;">
		<iframe id="contractInfoIframe" scrolling="auto" name="contractInfoIframe" frameborder="0" style="width: 100%; height: 100%;"></iframe>
	</div>
</div>
</body>
</html>