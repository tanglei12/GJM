<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <title>合同管理</title>
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/contractList.css" rel="stylesheet" type="text/css">
    <link href="/resources/mui/mui-scroll.css" rel="stylesheet" type="text/css"><!-- 下拉刷新上拉更多样式 -->


    <script src="/resources/js/jquery-2.0.0.min.js"></script>
    <script src="/resources/Plug-in/jquery_lazyload-1.9.7/jquery.lazyload.js"></script>
    <script src="/resources/mui/mui.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.state.js"></script>
    <script src="/resources/js/appPage/contractList.js?<%=System.currentTimeMillis()%>"></script>
</head>
<body>
<div class="content" style="display: flex;flex-direction: column;height: 100%;">
    <!-- HEAD -->
    <div class="content-item" style="padding-bottom: 0;box-shadow: 0 0 4px rgba(0, 0, 0, 0.16);z-index: 9;">
        <!-- 数据搜索 -->
        <div class="item-content" id="search-box" style="padding-bottom: 0;">
            <label class="search-angle">
                <input class="form-control" name="search-content" placeholder="搜索">
                <button class="input-close"><i class="fa-remove"></i></button>
            </label>
        </div>
        <!-- 数据筛选 -->
        <div class="item-content" style="padding: 0;">
            <button class="filter-angle" name="type" value="-1" onclick="$.contractList.query_changeFilter(this, 'type')">
                <span class="text angle-down" data-text="类型">类型</span>
            </button>
            <button class="filter-angle" name="state" value="-1" onclick="$.contractList.query_changeFilter(this, 'state')">
                <span class="text angle-down" data-text="状态">状态</span>
            </button>
            <button class="filter-angle" name="ucc_id" value="${empty currentDepartment ? -1 : currentDepartment.ucc_id}" onclick="$.contractList.query_changeFilter(this, 'department')">
                <span class="text angle-down" data-text="所有部门">${empty currentDepartment ? '所有部门' : currentDepartment.ucc_name}</span>
            </button>
        </div>
        <!-- 数据筛选 -->
        <div class="item-mask" id="filter-box">
            <div class="item-mask-main" style="border-top: 1px solid #ddd;"></div>
        </div>
    </div>
    <!-- MAIN -->
    <div class="content-item" style="flex: 1;">
        <!-- 数据展示 -->
        <div id="refreshContainer" class="mui-content mui-scroll-wrapper">
            <div class="mui-scroll">
                <ul id="search-data" class="mui-table-view mui-table-view-chevron"></ul>
            </div>
        </div>
    </div>
</div>
</body>
</html>