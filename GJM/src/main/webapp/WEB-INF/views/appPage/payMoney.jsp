<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <title>扫码付款</title>
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/appPage/payMoney.css?v=<%=System.currentTimeMillis()%>" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-2.0.0.min.js"></script>
    <script src="/resources/js/jquery.qrcode.min.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/appPage/payMoney.js?v=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
<div class="content">
    <div class="title">管家婆房地产经纪有限公司</div>
    <div class="code-div">
        <div class="code-title"></div>
        <div class="code-money"></div>
        <div class="code-main">
            <div id="qrcode"></div>
            <img class="logo" id="pay_logo" src="" style="display: none"/>
        </div>
        <%--<div class="code-tip"></div>--%>
        <div class="code-bottom">扫一扫，向商家付款</div>
    </div>
</div>
<%--<div class="biils" onclick="closeOrder()">取消订单</div>--%>
</body>
</html>