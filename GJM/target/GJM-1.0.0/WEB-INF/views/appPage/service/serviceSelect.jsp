<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <title>服务项目</title>
    <link href="/resources/css/appPage/service/serviceSelect.css" rel="stylesheet" type="text/css"><!-- 下拉刷新上拉更多样式 -->
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-2.0.0.min.js"></script><!-- jQuery插件 -->
    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/js/appPage/service/serviceSelect.js?v=1.1"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
</head>
<body>
<div class="content">
    <div class="content-left">
        <div class="content-left_button click">
            家庭保洁
        </div>
        <div class="content-left_button">
            维修服务
        </div>
    </div>
    <div class="content-right">
        <div class="content-center">
            <!-- 			<div class="conetent-titles">按次保洁<i class="fa-caret-down"></i></div> -->
            <!-- 			<div class="content-title"> -->
            <!-- 				<ul> -->
            <!-- 					<li>清洗<i class="fa-check-square"></i></li> -->
            <!-- 					<li>房子保洁</li> -->
            <!-- 				</ul> -->
            <!-- 			</div> -->
        </div>
    </div>
    <div class="content-botttom">
        <div class="shopCar">
            <img src="/resources/image/appPage/service-icon.png">
            <label>0</label>
        </div>
        <button onclick="submit()">提交</button>
        <%--<div class="money">费用合计：<span>￥00.00</span></div>--%>
    </div>
    <div class="content-selected" style="display: none;">
        <div class="content-bg"></div>
        <div class="content-select">
            <div class="content-select-title">已选服务</div>
            <div class="content-select-centers" style="height: 160px; overflow-y: auto;">
                <div class="content-select-center">
                    <!-- 			 		<div class="content-select-center-ul"><label>按次保洁</label><label class="fa-minus-circle"></label><label class="money">￥50.00</label></div> -->
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>