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
<title>房源跟进</title>
<link href="/resources/mui/mui.css" rel="stylesheet" type="text/css">
<link href="/resources/css/appPage/housePage.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-2.0.0.min.js"></script>
<script src="/resources/js/appPage/houseFollowUpPage.js"></script>
<script src="/resources/mui/mui.min.js"></script>
</head>
<body>
	<div class="house">
		<div class="house-list">
			<div class="houseImage">
				<img src="/resources/image/intention.png" />
			</div>
			<div class="houseTitle">房源跟进</div>
			<button id="houseF" onclick="OCHouseFollow.follow()"></button>
		</div>
		<div class="house-list">
			<div class="houseImage">
				<img src="/resources/image/myself.png" />
			</div>
			<div class="houseTitle">缴定金</div>
			<button id="houseM" onclick="OCHouseFollow.money()"></button>
		</div>
	</div>
</body>
</html>