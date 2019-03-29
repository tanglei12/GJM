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
<title>合同引导</title>
<link href="/resources/mui/mui.css" rel="stylesheet" type="text/css">
<link href="/resources/css/appPage/housePage.css" rel="stylesheet" type="text/css">
</head>
<body>
	<div class="house">
		<div class="house-list">
			<div class="houseImage">
				<img src="/resources/image/myself.png" />
			</div>
			<div class="houseTitle">我的合同</div>
			<button onclick="OCContract.contractJump('self')"></button>
		</div>
		<div class="house-list">
			<div class="houseImage">
				<img src="/resources/image/department.png" />
			</div>
			<div class="houseTitle">部门合同</div>
			<button onclick="OCContract.contractJump('department')"></button>
		</div>
		<div class="house-list">
			<div class="houseImage">
				<img src="/resources/image/expire.png" />
			</div>
			<div class="houseTitle">到期合同</div>
			<button onclick="OCContract.contractJump('expire')"></button>
		</div>
		<div class="house-list">
			<div class="houseImage">
				<img src="/resources/image/allHouse.png" />
			</div>
			<div class="houseTitle">所有合同</div>
			<button onclick="OCContract.contractJump('all')"></button>
		</div>
	</div>
	<script src="/resources/js/jquery-2.0.0.min.js"></script>
	<script src="/resources/mui/mui.min.js"></script>
</body>
</html>