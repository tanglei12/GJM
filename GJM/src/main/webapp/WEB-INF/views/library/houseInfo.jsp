<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE>
<html>
<head>
    <meta charset="UTF-8">
    <title>房源详情</title>
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="/resources/common/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet">
    <link href="/resources/js/zyUpload/control/css/zyUpload.css" rel="stylesheet">
    <link href="/resources/css/viewer.min.css" rel="stylesheet">
    <link href="/resources/css/common/common.css" rel="stylesheet">
    <link href="/resources/css/library/contractVoid.css" rel="stylesheet">
    <link href="/resources/css/library/house-info.css" rel="stylesheet">
    <link href="/resources/css/housePublish.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
    <script src="/resources/common/uber-zoom/uber-zoom.js"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
    <script src="/resources/Plug-in/echart/echarts.common.min.js"></script>
    <script src="/resources/js/zyUpload/core/zyFile.js"></script>
    <script src="/resources/js/zyUpload/control/js/zyUpload.js"></script>
    <script src="/resources/js/zyUpload/core/lanrenzhijia.js"></script>
    <script src="/resources/js/product/jquery-cookie.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.hint.js"></script>
    <script src="/resources/js/common/common.state.js"></script>
    <script src="/resources/js/common/common.box.js"></script>
    <script src="/resources/js/common/common.power.js"></script>
    <script src="/resources/js/customer/sendMessage.js?v=1.0"></script><!-- 短信发送 -->
    <%--<script src="/resources/Plug-in/html5_imageUpload/imageUpload.js"></script><!--图片压缩-->--%>
    <script src="/resources/Plug-in/houseImageUpload/houseImageUpload.js"></script><!--图片压缩-->
    <script src="http://api.map.baidu.com/api?v=2.0&ak=9HqNP0u7U4ZU5ZTKHT8BCbUa"></script><!-- 百度地图 -->
    <script src="/resources/umeditor/ueditor.config.js"></script><!-- UE编辑器 -->
    <script src="/resources/umeditor/ueditor.all.min.js"></script>
    <script src="/resources/umeditor/lang/zh-cn/zh-cn.js"></script>
    <script src="/resources/js/viewer.min.js"></script>
    <script src="/resources/js/housePublishNew.js?v=<%=System.currentTimeMillis()%>"></script><!--发布房源-->
    <script src="/resources/js/library/house-info.js?v=<%=System.currentTimeMillis()%>"></script>
</head>
<body style="overflow-y: hidden;">
<input type="hidden" id="hi_data">
<input type="hidden" id="inPrice">
<input type="hidden" id="systemPrice">
<input type="hidden" id="currentPrice">
<div id="main-head"></div>
<div id="main-table">
    <div class="main-table-content">
        <div class="table-content-item" id="contentShow"></div>
    </div>
</div>
</body>
</html>
