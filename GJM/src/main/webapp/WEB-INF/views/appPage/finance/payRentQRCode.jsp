<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
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
    <title>二维码支付</title>
    <link href="/resources/css/app/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/appPage/payRentQRCode.css" rel="stylesheet" type="text/css">

</head>
<body>
<div class="content">
    <div class="content-head">管家婆房地产经纪有限公司</div>
    <div class="content-main">
        <div class="code-title" id="house-address">万达广场2-05-15</div>
        <div class="code-money"></div>
        <div class="code-main" id="qrcode"></div>
        <div class="code-bottom">
            <div class="bottom-yuan"></div>
            <div class="bottom-font">扫一扫，向商家付款</div>
        </div>
    </div>
</div>
<div class="biils">查看账单</div>

<script src="/resources/js/jquery-2.0.0.min.js"></script>
<!-- 二维码 -->
<script src="/resources/js/jquery.qrcode.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/appPage/payRentQRCode.js"></script>
</body>
</html>