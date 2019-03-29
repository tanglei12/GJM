<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE>
<html>
<head>
<title>线上房源</title>
<!-- 右边框架 css样式 -->
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<link href="/resources/css/body.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 字体图标 -->
<link href="/resources/css/table-min.css" rel="stylesheet" type="text/css" /><!-- 表格样式 -->
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<link href="/resources/common/swipeslider-develop/dist/swipeslider.css" rel="stylesheet" type="text/css">
<link href="/resources/css/carousel.css" rel="stylesheet" type="text/css">
<link href="/resources/css/library/house-list.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/table-min.js"></script><!-- 表格公共js -->
<script src="/resources/js/manage_index_right.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js"></script>
<script src="/resources/js/encryption/base64.min.js"></script>
<script src="/resources/js/encryption/jQuery.md5.js"></script>
<script src="/resources/js/product/jquery-cookie.js"></script>
<script src="/resources/common/swipeslider-develop/dist/swipeslider.min.js"></script>

<script src="/resources/js/library/carousel.js"></script>
<script src="/resources/js/product/houseBasicInformation.js"></script>

<!-- 日期控件 -->
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
</head>
<body>
<div id="content">
	<!-- 数据读取 -->
</div>
<!-- 房屋图片弹出 -->
<div id="divObj" style="display: none; z-index: 999; background-color: #fff; width: 850px; position: absolute; top: 10%; left: 25%;">
	<div id="cs110" style="color: #4799E6; font-size: 18px; padding-top: 20px; margin-left: 30px;">
		房屋图片
		<ul>
			<li class="closeDiv" style="cursor: pointer; float: right; line-height: 50px; text-align: center; margin-top: -20px; width: 100px; height: 34px;">
				<b>
					<span onclick="closeDiv();" style="font-size: 26px; color: #000;" class="table-icon table-icon-close"></span>
				</b>
			</li>
		</ul>
	</div>
	<hr>
	<div class="ck-slide" style="display: none;">
		<ul class="ck-slide-wrapper">

		</ul>
		<div class="ck-slidebox">
			<div class="slideWrap">
				<ul class="dot-wrap">

				</ul>
			</div>
		</div>
	</div>
	<input type="hidden" id="idx">
</div>
</body>
</html>