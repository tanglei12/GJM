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
<title>选择管家</title>
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/css/app/common.css" rel="stylesheet" type="text/css">
<link href="/resources/css/app/searchCustomer.css" rel="stylesheet" type="text/css">

</head>
<body>
	<div class="content" style="display: flex;flex-direction: column;height: 100%;">
		<div class="content-item" style="padding-bottom: 0;box-shadow: 0 0 4px rgba(0, 0, 0, 0.16);z-index: 9; background-color: #FFFFFF; position: fixed;">
			<div class="item-content" style="padding-bottom: 0;">
				<label class="search-angle">
					<input class="form-control" name="search-content" placeholder="管家姓名、电话">
					<button class="input-close"><i class="fa-remove"></i></button>
				</label>
			</div>
			<div class="item-content" style="padding: 0;">
				<button class="filter-angle" name="ucc_name" value="${empty currentDepartment ? -1 : currentDepartment.ucc_id}" onclick="$.housekeeper.query_changeFilter(this, 'department')">
					<span class="text" data-text="所有部门">${empty currentDepartment ? '所有部门' : currentDepartment.ucc_name}</span>
					<span class="icon fa-angle-down"></span>
				</button>
				<button class="filter-angle" name="em_sex" value="-1" onclick="$.housekeeper.query_changeFilter(this, 'sex')">
					<span class="text" data-text="性别">性别</span>
					<span class="icon fa-angle-down"></span>
				</button>
				<button class="filter-angle" name="em_state" value="1" onclick="$.housekeeper.query_changeFilter(this, 'state')">
					<span class="text" data-text="就职状态">在职</span>
					<span class="icon fa-angle-down"></span>
				</button>
			</div>
		</div>
		<div class="item-mask" id="filter-box">
			<div class="item-mask-main"></div>
		</div>
		<div class="content" id="search-data" style="margin-top: 100px;"></div>
	</div>
	
	<script src="/resources/js/jquery-2.0.0.min.js"></script>
	<script src="/resources/Plug-in/jquery_lazyload-1.9.7/jquery.lazyload.js"></script>
	<script src="/resources/js/common/common.js"></script>
	<script src="/resources/js/appPage/housekeeperSearch.js"></script>
</body>
</html>