<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="format-detection" content="telephone=no">
<meta name="format-detection" content="email=no">
<title>待办代办</title>
<link href="/resources/mui/mui-scroll.css" rel="stylesheet" type="text/css">
<link href="/resources/css/appPage/stayThingSettlement.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-2.0.0.min.js"></script>
<script src="/resources/mui/mui.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/appPage/stayThingSettlement.js"></script>
</head>
<body>
	<div class="search">
		<div class="search-text">
			<input type="text" class="search-input" placeholder="房号/客户/管家" onkeyup="data(0)" />
		</div>
		<button class="button-label" onclick="data(0)">搜索</button>
	</div>
	<div id="pullrefresh" class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<ul id="data-list" class="mui-table-view mui-table-view-chevron"></ul>
		</div>
	</div>
</body>
</html>