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
    <title>服务反馈</title>

    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/appPage/service/sceneFeedback.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-2.0.0.min.js"></script><!-- jQuery插件 -->
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.hint.js"></script>
    <script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script><!-- 图片上传 -->
    <script src="/resources/js/appPage/service/sceneFeedback.js?v=<%=System.currentTimeMillis()%>"></script>
    <jsp:include page="../../scrf/scrf.jsp"/>
</head>
<body>
<div class="content">

    <span class="ti-info">跟进记录</span>
    <div class="center" id="serviceProcessProblem">
        <dl>
            <dt><label><img class="problem-img" src="/resources/image/appPage/pro_img.png"> 反馈信息</label></dt>
            <dt class="textareaBox">
                <span style="text-align: left"></span>
            </dt>
            <dt class="nameAndDate">
                <label>秦晓君</label><label style="float: right;">2015-12-26</label>
            </dt>
        </dl>
    </div>
    <div class="center">
        <dl style="margin-top: 0">
            <div id="addFeedback" style="width: 100%;height:40px;text-align: center;line-height: 40px;color: #ff6666">+添加反馈</div>
        </dl>
    </div>

    <span class="ti-info">完成确认</span>
    <div class="center" id="serviceOrderItem">
        <%--<dl style="line-height: 40px;margin-top: 0">
            <dt class="textareaBox" style="height:40px;line-height: 40px"><label>空调</label><label style="float: right;"><img
                    class="select-img" src="/resources/image/appPage/select_in.png"></label></dt>
        </dl>
        <dl style="line-height: 40px;margin-top: 0">
            <dt class="textareaBox" style="height:40px;line-height: 40px"><label>冰箱</label><label style="float: right;"><img
                    class="select-img" src="/resources/image/appPage/select_out.png"></label></dt>
        </dl>--%>
    </div>

    <div class="contentService" style="margin-bottom: 68px;"></div>
    <div class="bottom_service">
        <button onclick="submit()">提交</button>
    </div>
</div>
</body>
</html>