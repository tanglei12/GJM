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
	<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
	<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 旧字体样式 -->
	<link href="/resources/css/table-min.css" rel="stylesheet" type="text/css">
	<link href="/resources/common/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">
	<link href="/resources/css/service/serviceCharge.css" rel="stylesheet" type="text/css">

	<script src="/resources/js/jquery-1.7.2.min.js"></script>
	<script src="/resources/Plug-in/jquery.cookie/jquery-cookie.js"></script>
	<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
	<script src="/resources/js/common/common.js"></script>
	<script src="/resources/js/table-min.js"></script>
	<script src="/resources/common/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>
	<script src="/resources/js/service/serviceCharge.js"></script>
</head>
<body>
<div id="content" style="padding:12px;"></div>
<div class="showRecord">
	<span class="showRecord-close" onclick="closeShowRecord()"><i class="fa fa-close"></i></span>
	<div class="showRecord-title">费用消费记录</div>
	<div class="sub-content record-table-box">
		<table>
			<thead>
			<tr>
				<th style="width: 30%;text-align: center;">服务订单</th>
				<th style="width: 20%;text-align: center;">使用金额</th>
				<th style="width: 20%;text-align: left;">优惠金额</th>
				<th style="width: 30%;text-align: right;">消费时间</th>
			</tr>
			</thead>
		</table>
	</div>
	<div class="sub-content record-table-box" id="record-table-box">
		<table>
			<tbody id="record-table-body"></tbody>
		</table>
	</div>
	<div class="sub-content" id="record-table-foot">
		<button class="record-option fa-angle-left" style="line-height: 10px; padding-left: 7px;"></button>
		<input type="text" class="record-option number" id="record-pageNo" value="1">
		<button class="record-option icon-angle-right" style="line-height: 10px; padding-left: 10px;"></button>
		<div class="record-option">共<span id="record-totalPage">0</span>页，<span id="record-totalRecords">0</span>条记录</div>
	</div>
</div>
</body>
</html>