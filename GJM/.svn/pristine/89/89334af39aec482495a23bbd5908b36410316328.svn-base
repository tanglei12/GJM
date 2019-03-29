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
    <title>现场确认</title>

    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/appPage/service/serviceScene.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-2.0.0.min.js"></script><!-- jQuery插件 -->
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.hint.js"></script>
    <script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script><!-- 图片上传 -->
    <script src="/resources/js/appPage/service/serviceScene.js?v=<%=System.currentTimeMillis()%>"></script>

</head>
<body>
<div class="content">
    <div class="center" style="margin-top: 15px">
        <dl class="bottom">
            <dt><label>服务类型</label></dt>
            <dd>
                <select id="spp_isConform"  style="width: 100%;padding-right: 10% ;">
                    <option value="2">不相符</option>
                    <option value="1">相符</option>
                </select>
                <label class="font-icon"></label></dd>
        </dl>

    </div>


    <div class="center" id="add-problem">
        <dl class="bottom" style="width: auto;height: auto;display: block;line-height: 40px">
            <dt><label>添加/变更报事项</label></dt>
            <dt class="textareaBox"><textarea id="spp_content" rows="5"  placeholder="请描述现场问题"></textarea></dt>
        </dl>

        <dl class="bottom" style="width: auto;height: auto;display: block">
            <%--<dt><label>图片描述</label></dt>--%>
            <dt class="textareaBox">
                <div id="imageLoad" style=" padding: 0px 0 16px 0;margin-left: 0px"></div>
            </dt>
        </dl>
    </div>

    <div class="contentService" style="margin-bottom: 60px;"></div>
    <div class="bottom_service">
        <button onclick="problemSubmit()">提交</button>
    </div>
</div>
</body>
</html>