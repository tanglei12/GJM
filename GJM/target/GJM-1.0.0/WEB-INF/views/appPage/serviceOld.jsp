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
    <title>服务订单</title>
    <link href="/resources/mui/mui.css" rel="stylesheet" type="text/css"><!-- 下拉刷新上拉更多样式 -->
    <link href="/resources/css/appPage/service.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-2.0.0.min.js"></script>
    <script src="/resources/mui/mui.min.js"></script><!-- 下拉刷新上拉更多 -->
    <script src="/resources/js/appPage/serviceOld.js?v=<%=System.currentTimeMillis()%>"></script>
    <script type="text/javascript" src="/resources/js/sockjs-1.0.3.min.js"></script>
    <style>
        .mui-table-view:before {
            background-color: #fff;
        }

        .mui-table-view:after {
            background-color: #fff;
        }
    </style>
</head>
<body>
<!--下拉刷新容器-->


<div id="pullrefresh" class="mui-content mui-scroll-wrapper">
    <div class="mui-scroll">
        <div class="top-nav">
            <div class="nav nav1 on" id="nav1"><span class="nav_name">未接单</span></div>
            <div class="nav nav2 " id="nav2" ><span class="nav_name">服务中</span></div>
            <div class="nav nav3 " id="nav3" ><span class="nav_name">已完成</span></div>
            <div class="nav nav4 " id="nav4" ><span class="nav_name">全部</span></div>
        </div>
        <!--数据列表-->
        <ul id="data-list" class="mui-table-view mui-table-view-chevron">

        </ul>
    </div>
</div>

</body>
</html>