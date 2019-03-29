<%@ page pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>查看合同</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/uber-zoom/uber-zoom.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/contractList/displayContract.css?v=<%=System.currentTimeMillis()%>" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.type.js"></script>
    <script src="/resources/common/uber-zoom/uber-zoom.js"></script>
    <script src="/resources/common/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>
    <script src="/resources/common/My97DatePicker/WdatePicker.js"></script><!-- 时间插件 -->
    <script src="/resources/Plug-in/jquery.rotate/jquery.rotate.min.js"></script>
    <script src="/resources/Plug-in/jquery_lazyload-1.9.7/jquery.lazyload.js"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
    <script src="/resources/Plug-in/layer/layer.js"></script>
    <script src="/resources/print/LodopFuncs.js"></script><!-- 打印插件 -->
    <script src="/resources/js/product/jquery-cookie.js"></script>
    <script src="/resources/js/jquery.qrcode.min.js"></script><!-- 二维码 -->
    <script src="/resources/js/contractList/contractInfo.js?v=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
<div id="main-box">
    <div class="box-nav"></div>
    <!-- 【基本信息】 -->
    <div class="box-content">
        <!-- 合同信息 -->
        <div class="sub-title" id="contract-title"></div>
        <div class="sub-content" id="contract-content"></div>
        <!-- 其他信息 -->
        <div class="sub-title" id="other-title"></div>
        <div class="sub-content">
            <div id="other-content" class="content-item" style="height: 420px;font-size: 14px;">
                <div class="loading"></div>
            </div>
        </div>
    </div>
    <!-- 【账单】 -->
    <div class="box-content" id="main-bill" style="display: none;">
        <div class="sub-title"></div>
        <div class="sub-content"></div>
    </div>
    <!-- 【审核】 -->
    <div class="box-content" id="main-accept" style="display: none;">
        <div class="sub-title"></div>
        <div class="sub-content"></div>
    </div>
</div>
<div id="orderPrint" style="display: none;"></div>
<div id="olinePay"></div>
</body>
</html>