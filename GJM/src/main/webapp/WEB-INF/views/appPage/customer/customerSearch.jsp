<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="format-detection" content="telephone=no">
<meta name="format-detection" content="email=no">
<title>选择客户</title>
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/css/app/common.css" rel="stylesheet" type="text/css">
<link href="/resources/css/app/searchCustomer.css" rel="stylesheet" type="text/css">

</head>
<body>
	<div class="content" style="display: flex;flex-direction: column;height: 100%;">
		<div class="content-item" style="box-shadow: 0 0 4px rgba(0, 0, 0, 0.16);z-index: 9;position: fixed; background-color: #FFF">
			<div class="item-content">
				<div class="search-angle">
					<input type="text" class="form-control" name="search-content" placeholder="客户姓名、电话、身份证">
					<button class="input-close"><i class="fa-remove"></i></button>
				</div>
			</div>
		</div>
		<div class="content" id="search-data" style="margin-top: 62px;"></div>
	</div>
	
	<script src="/resources/js/jquery-2.0.0.min.js"></script>
	<script src="/resources/Plug-in/jquery_lazyload-1.9.7/jquery.lazyload.js"></script>
	<script src="/resources/js/common/common.js"></script>
	<script src="/resources/js/appPage/searchCustomer.js"></script>
</body>
</html>