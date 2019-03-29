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
<title>物业选择</title>
<link href="/resources/css/appPage/intentionPropertyInfoSelect.css" rel="stylesheet" type="text/css">
<script src="/resources/js/jquery-2.0.0.min.js"></script>
<script src="/resources/js/appPage/intentionPropertyInfoSelect.js?v=2.0"></script>
</head>
<body>
	<div class="content">
		<div class="search">
			<div class="search-text">
				<input type="text" class="search-input" placeholder="物业名称" onkeyup="search()" />
			</div>
			<button class="button-label" onclick="search()">搜索</button>
		</div>
		<div class="center-data">
			<ul>

			</ul>
		</div>
		<input type="hidden" id="data-id" />
	</div>
</body>
</html>