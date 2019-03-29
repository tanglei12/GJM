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
<title>客户待办</title>
<link href="/resources/mui/mui.css" rel="stylesheet" type="text/css"><!-- 下拉刷新上拉更多样式 -->
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/css/appPage/stayThingCustomer.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-2.0.0.min.js"></script><!-- jQuery插件 -->
<script src="/resources/mui/mui.min.js"></script><!-- 下拉刷新上拉更多 -->
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/appPage/stayThingCustomer.js?v=1.2"></script>
</head>
<body>
<div class="top">
	<div class="search">
		<div class="search-text">
			<input type="text" class="search-input" id="searchWhere" placeholder="房号/客户姓名/客户电话">
		</div>
		<button class="button-label" onclick="data(0)">搜索</button>
	</div>
	<div class="item-filter">
		<div class="filter-angle" id="searchType" data-value="2" onclick="changeFilter(this)">
			<span class="text angle-down ok">签出房</span>
		</div>
		<div class="filter-angle" id="searchTime" data-value="0" onclick="changeFilter(this)">
			<span class="text angle-down">日期</span>
		</div>
		<div class="filter-angle" id="department" data-value="" onclick="changeFilter(this)">
			<span class="text angle-down disabled">选择部门</span>
		</div>
	</div>
</div>
<div class="item-mask" id="filter-box">
	<div class="item-mask-main" data-head="searchType" style="display: none">
		<div class="mask-main-item" data-value="1" onclick="checkItem(this)">签存房</div>
		<div class="mask-main-item ok" data-value="2" onclick="checkItem(this)">签出房</div>
	</div>
	<div class="item-mask-main" data-head="searchTime" style="display: none">
		<div class="mask-main-item ok" data-value="0" onclick="checkItem(this)">全部</div>
		<div class="mask-main-item" data-value="1" onclick="checkItem(this)">今天</div>
		<div class="mask-main-item" data-value="2" onclick="checkItem(this)">昨天</div>
		<div class="mask-main-item" data-value="3" onclick="checkItem(this)">两天前</div>
	</div>
</div>
<!--下拉刷新容器-->
<div id="pullrefresh" class="mui-content mui-scroll-wrapper">
	<div class="mui-scroll">
		<!--数据列表-->
		<div id="data-list" class="mui-table-view mui-table-view-chevron">
		
		</div>
	</div>
</div>
</body>
</html>