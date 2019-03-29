<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>房源信息</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/mui/mui.css" rel="stylesheet" type="text/css"><!-- 下拉刷新上拉更多样式 -->
    <link href="/resources/css/appPage/houseList.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-2.0.0.min.js"></script><!-- jQuery插件 -->
    <script src="/resources/js/appPage/houseList.js?v=<%=System.currentTimeMillis()%>"></script>
    <script src="/resources/mui/mui.min.js"></script><!-- 下拉刷新上拉更多 -->
</head>
<body>
<div id="android-sreach" style="position: relative;z-index: 999;background: #fff;padding: 10px 10px 0;display: none;">
    <div class="search-angle">
        <input type="text" name="search-content" placeholder="搜索">
        <button class="input-close" style="display: none;"><i class="fa-remove"></i></button>
    </div>
</div>
<div class="titleScreen">
    <!-- 	<div class="title_menu"><select id="houseUcc" onchange="houseUcc(this)"><option value="库存房源">库存房源</option><option value="部门房源">部门房源</option><option value="个人房源">个人房源</option></select><i></i></div> -->
    <div class="title_menu" onclick="titleClick(this)"><label class="search_title" data-value="库存房源">库存房源<i></i></label>
        <div class="search_div" style="display: none;">
            <ul>
                <li data-value="库存房源">库存房源</li>
                <li data-value="部门房源">部门房源</li>
                <li data-value="个人房源">个人房源</li>
            </ul>
        </div>
    </div>
    <div class="title_menu" onclick="titleClick(this)"><label class="search_title" data-value="">房源区域<i></i></label>
        <div class="search_div" style="display: none;">
            <ul>
                <li data-value="">房源区域</li>
                <li data-value="南岸区">南岸区</li>
                <li data-value="九龙坡区">九龙坡区</li>
                <li data-value="巴南区">巴南区</li>
                <li data-value="渝北区">渝北区</li>
                <li data-value="江北区">江北区</li>
                <li data-value="沙坪坝区">沙坪坝区</li>
                <li data-value="渝中区">渝中区</li>
                <li data-value="大渡口区">大渡口区</li>
                <li data-value="北碚区">北碚区</li>
            </ul>
        </div>
    </div>
    <div class="title_menu" onclick="titleClick(this)"><label class="search_title" data-value="">房源户型<i></i></label>
        <div class="search_div" style="display: none;">
            <ul>
                <li data-value="">房源户型</li>
                <li data-value="1">一房</li>
                <li data-value="2">二房</li>
                <li data-value="3">三房</li>
                <li data-value="4">四房</li>
            </ul>
        </div>
    </div>
    <div class="title_menu" onclick="titleClick(this)"><label class="search_title" data-value="">房源价格<i></i></label>
        <div class="search_div" style="display: none;">
            <ul>
                <li data-value="">房源价格</li>
                <li data-value="1000以下">1000元以下</li>
                <li data-value="1000~1500">1000元~1500元</li>
                <li data-value="1500~2000">1500元~2000元</li>
                <li data-value="2000以上">2000元以上</li>
            </ul>
        </div>
    </div>
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