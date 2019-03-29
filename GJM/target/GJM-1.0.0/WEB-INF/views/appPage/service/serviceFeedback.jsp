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
    <title>添加反馈</title>

    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/appPage/service/serviceFeedback.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-2.0.0.min.js"></script><!-- jQuery插件 -->
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.hint.js"></script>
    <script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script><!-- 图片上传 -->
    <script src="/resources/js/appPage/service/serviceFeedback.js?v=<%=System.currentTimeMillis()%>"></script>
    <jsp:include page="../../scrf/scrf.jsp"/>
</head>
<body>
<div class="content">
    <div class="center">
        <dl class="bottom" style="width: auto;height: auto;display: block;line-height: 40px">
            <dt><label>反馈选项</label></dt>
            <dd class="">
                <input class="selectButton" onclick="buttonStyle(this)" style="" type="button" value="正常处理" >
                <input class="selectButton" onclick="buttonStyle(this)" style="" type="button" value="需外协处理" >
                <input class="selectButton" onclick="buttonStyle(this)" style="" type="button" value="等待配件采购" >
                <input class="selectButton" onclick="buttonStyle(this)" style="" type="button" value="需整体更换" >
                <input class="selectButton" onclick="buttonStyle(this)" style="" type="button" value="报事不相符" >
            </dd>
            <dd class=""></dd>
        </dl>
        <dl class="bottom" style="width: auto;height: auto;display: block;line-height: 40px">
            <dt><label>问题补充</label></dt>
            <dt class="textareaBox"><textarea id="spp_content" rows="8"  placeholder="请填写问题补充"></textarea></dt>
        </dl>
    </div>

    <div class="bottom_service">
        <button onclick="problemSubmit()">保存</button>
    </div>
</div>
</body>
</html>