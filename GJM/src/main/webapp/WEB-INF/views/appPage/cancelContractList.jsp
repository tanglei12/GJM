 <%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
<title>招租申请管理</title>
<link href="/resources/mui/mui.css" rel="stylesheet" type="text/css"><!-- 下拉刷新上拉更多样式 -->
<link href="/resources/css/appPage/houseStatusList.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-2.0.0.min.js"></script><!-- jQuery插件 -->
<script src="/resources/mui/mui.min.js"></script><!-- 下拉刷新上拉更多 -->
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/appPage/cancelContractList.js"></script>
</head>
<body>
<div class="search">
	<div class="search-text"><input type="text" name="search-content" class="search-input" placeholder="申请类型/小区地址/状态/客户名称/客户电话" onkeyup="data(0)" /></div>
	<button class="button-label" style="padding: 0;" onclick="data(0)">搜索</button>
</div>
<!--下拉刷新容器-->
<div id="pullrefresh" class="mui-content mui-scroll-wrapper">
	<div class="mui-scroll">
		<!--数据列表-->
		<ul id="data-list" class="mui-table-view mui-table-view-chevron">
			
		</ul>
	</div>
</div>
</body>
</html>