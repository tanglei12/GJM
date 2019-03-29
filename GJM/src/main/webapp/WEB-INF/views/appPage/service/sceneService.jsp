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
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>现场确认</title>
    <link href="/resources/css/appPage/service/sceneService.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css"><!-- 图片上传 -->

    <script src="/resources/js/jquery-2.0.0.min.js"></script><!-- jQuery插件 -->
    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script><!-- 图片上传 -->
    <script src="/resources/mui/mui.min.js"></script>
    <script src="/resources/mui/mui.previewimage.js"></script><!-- 图片浏览 -->
    <script src="/resources/mui/mui.zoom.js"></script><!-- 图片浏览 -->
    <script src="/resources/js/appPage/service/sceneService.js?v=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
<div class="center" style="padding-bottom: 58px;">
    <dl style="overflow: hidden; height: auto;">
        <dt><label>现场图片：</label><i></i></dt>
        <dd style="overflow: hidden; height: auto; position: relative;" id="service_image">
            <div id="imageLoad"></div>
        </dd>
    </dl>
    <div style="line-height: 40px; padding: 0 10px; color:#999;">现场问题</div>
    <div class="content"></div>
    <dl>
        <dd><input style="width: 90%;" placeholder="问题描述"/><i class="fa-plus-square-o" style="font-size: 20px; color: #1ABC9C;" onclick="addServiceProject(this)"></i></dd>
    </dl>
</div>
<button class="button" onclick="problemSubmit()">确认</button>
</body>
</html>