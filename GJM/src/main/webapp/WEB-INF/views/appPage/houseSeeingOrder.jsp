<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <title>定金订单</title>
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/appPage/houseSeeingOrder.css?v=<%=System.currentTimeMillis()%>" rel="stylesheet" type="text/css">


    <script src="/resources/js/jquery-2.0.0.min.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.hint.js"></script>
    <script src="/resources/js/encryption/base64.min.js"></script>
    <script src="/resources/js/appPage/houseSeeingOrder.js?v=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
<div class="content">
    <div class="centerContent">
        <div class="lines"></div>
        <dl>
            <dt>房源房号</dt>
            <dd id="house_address"></dd>
        </dl>
        <div class="line"></div>
        <dl>
            <dt>租赁价格</dt>
            <dd id="money"></dd>
        </dl>
        <div class="line"></div>
        <dl>
            <dt>预留天数</dt>
            <dd id="day" style="color: #FF6666"></dd>
        </dl>
        <div class="line"></div>
        <dl>
            <dt>客户定金</dt>
            <dd id="moneyD" style="color: #FF6666"></dd>
        </dl>
        <div class="line"></div>
        <dl>
            <dt>起租日期</dt>
            <dd id="startDate" style="color: #FF6666"></dd>
        </dl>
        <div class="line"></div>
        <dl>
            <dt>约定租期</dt>
            <dd id="date" style="color: #FF6666"></dd>
        </dl>
        <div class="line"></div>
        <dl>
            <dt>创建时间</dt>
            <dd id="createTime"></dd>
        </dl>
        <div class="lines"></div>
    </div>
    <div class="centerContent">
        <div class="lines"></div>
        <dl>
            <dt>客户姓名</dt>
            <dd id="user"></dd>
        </dl>
        <div class="line"></div>
        <dl>
            <dt>客户电话</dt>
            <dd id="phone"></dd>
        </dl>
        <div class="line"></div>
        <dl>
            <dt>证件号</dt>
            <dd id="card"></dd>
        </dl>
        <div class="lines"></div>
    </div>
    <div class="centerContent">
        <div class="lines"></div>
        <dl>
            <dt>支付进度</dt>
            <dd style="color: #FF6666">等待客户支付</dd>
        </dl>
        <div class="lines"></div>
        <button onclick="clickPay()"><img src="/resources/image/appPage/qrcode.svg"><label>扫码收款</label></button>
    </div>
</div>
<div class="show-pay" style="display: none;">
    <div class="show-bg"></div>
    <div class="show-content">
        <div class="show-title">
            <%--<i class="fa-times"></i>--%>
            <div class="text">选择支付方式</div>
        </div>
        <div class="lines"></div>
        <div class="pay-money">
            <label>定金金额</label>
            <label style="font-size: 7vw; color: #FF6666; margin-top: 0;" id="moneyPay"><i>元</i></label>
        </div>
        <div class="lines"></div>
        <div class="show-payType">
            <dl id="ali_pay">
                <dt><img src="/resources/image/appPage/ali_pay.svg" style="width: 26px; height: 26px; margin-top: 5px; margin-left: 20px;"></dt>
                <dd>支付宝支付<i class="fa-check-circle" style="color: #FF6666;"></i></dd>
            </dl>
            <div class="lines"></div>
            <dl id="weixin_pay">
                <dt><img src="/resources/image/appPage/weixin_pay.svg" style="width: 26px;height: 26px; margin-top: 5px; margin-left: 20px;"></dt>
                <dd>微信支付<i class="fa-check-circle"></i></dd>
            </dl>
            <div class="lines"></div>
        </div>
        <button onclick="submit()">生成二维码</button>
    </div>
</div>
</body>
</html>