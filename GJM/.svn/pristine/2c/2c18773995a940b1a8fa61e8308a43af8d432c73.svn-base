<%@ page language="java" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>服务订单</title>
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 字体图标 -->
    <link href="/resources/css/table-min.css" rel="stylesheet" type="text/css"/><!-- 表格样式 -->
    <link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/serve/serve.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/body.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/table-min.js"></script><!-- 表格公共js -->
    <script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script><!-- 提示弹窗 -->
    <script src="/resources/js/manage_index_right.js"></script>
    <script src="/resources/js/service/myService.js?v=<%=System.currentTimeMillis()%>"></script>
    <script src="/resources/js/product/jquery-cookie.js"></script><!-- COOKIE -->
    <script src="/resources/common/My97DatePicker/WdatePicker.js"></script><!-- 时间插件 -->
    <style>
        .serviceInfo {
            position: absolute;
            right: -18px;
            top: 62px;
            width: 80%;
            height: 90%;
            bottom: initial;
            border-top: 1px dashed #9fcac5;
            background-color: #FFF;
            box-shadow: 0 18px 15px 0 rgba(21, 20, 20, 2);
        }
        .serviceInfo .serviceInfo-refresh {
            position: absolute;
            top: 22px;
            right: 0px;
            width: 38px;
            height: 34px;
            cursor: pointer;
        }
        .serviceInfo .serviceInfo-close {
            position: absolute;
            top: 11px;
            right: 35px;
            width: 38px;
            height: 34px;
            cursor: pointer;
        }
        .serviceInfo .serviceInfo-close .fa-close {
            font-size: 18px;
            margin: 10px 13px;
        }
        .serviceInfo dl {
            width: 100%;
            height: 45px;
            line-height: 45px;
        }
        .serviceInfo dt {
            width: 80px;
            float: left;
            font-size: 13px;
            height: 45px;
            line-height: 45px;
            text-align: right;
        }
        .serviceInfo dd {
            float: left;
            margin-left: 10px;
            font-size: 14px;
        }
        .serviceInfo .serviceInfo-title {
            border-bottom: 1px solid #3498db;
            height: 34px;
            line-height: 34px;
            font-size: 14px;
            text-indent: 5px;
            margin-bottom: 15px;
        }
        .serviceInfo input {
            width: 180px;
            height: 32px;
            line-height: 32px;
            border: 0;
            border: 1px solid #CCC;
            text-indent: 7px;
            color: #666;
            font-size: 15px;
            background-color: #fdf7f7;
            border-radius: 3px;
        }
    </style>
</head>
<body>
<div id="content">
    <!-- 数据读取 -->
</div>
<div id="serviceInfo" class="serviceInfo" style="display:none;">
    <div style="height: 40px; margin: 10px; margin-right: 30px; border: 1px solid #ddd;">
        <span class="serviceInfo-refresh" onclick="refreshDiv()" style="margin-right: 55px;"><i class="icon-refresh"></i></span>
        <span class="serviceInfo-close" onclick="closeDiv()" style=""><i class="fa fa-close"></i></span>
    </div>
    <div id="iframeDiv" style="width: 100%; height: 100%;">
        <iframe id="serviceInfoIframe" scrolling="auto" name="serviceInfoIframe" frameborder="0" style="width: 100%; height: 100%;"></iframe>
    </div>
</div>
</body>
</html>