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
    <title>服务订单</title>
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/appPage/service/serviceOrderPay.css" rel="stylesheet" type="text/css">


    <script src="/resources/js/jquery-2.0.0.min.js"></script>
    <script src="/resources/js/encryption/base64.min.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.hint.js"></script>
    <script src="/resources/js/appPage/service/serviceOrderPay.js?v=<%=System.currentTimeMillis()%>"></script>
    <jsp:include page="../../scrf/scrf.jsp"/>
</head>
<body>
<div class="content">
    <div class="centerContent">
        <div class="lines"></div>
        <dl>
            <dt>房屋地址</dt>
            <dd id="so_targetAddress"></dd>
        </dl>
        <div class="line"></div>
        <dl>
            <dt>服务类型</dt>
            <dd id="sm_name"></dd>
        </dl>
        <div class="line"></div>
        <dl>
            <dt>服务项目</dt>
            <dd id="sm_name1"></dd>
        </dl>
        <div class="line"></div>

        <dl>
            <dt>下单时间</dt>
            <dd id="so_createTime"></dd>
        </dl>
        <div class="lines"></div>
    </div>
    <div class="centerContent">
        <div class="lines"></div>
        <dl>
            <dt>付费对象</dt>
            <dd id="so_payNameNew"></dd>
        </dl>
        <div class="line"></div>
        <dl>
            <dt>联系方式</dt>
            <dd id="so_payPhoneNew"></dd>
        </dl>
        <div class="line"></div>
        <dl>
            <dt>订单总额</dt>
            <dd id="detail_amount_total" style="color: #ff6666" ></dd>
        </dl>
        <div class="line"></div>
        <dl>
            <dt>应付金额</dt>
            <dd id="ssm_money" style="color: #ff6666"></dd>
        </dl>
        <div class="lines"></div>
    </div>
    <div class="centerContent">
        <div>
            <div class="lines"></div>
            <dl>
                <dt>订单减免</dt>
                <dd id="derate" style="color: #ff6666" ></dd>
            </dl>
        </div>
        <div>
            <div class="line"></div>
            <dl>
                <dt>余额抵扣</dt>
                    <dd id="deduction" style="color: #ff6666" ></dd>
            </dl>
        </div>
        <div class="line"></div>
        <div>
            <dl>
                <dt>支付金额</dt>
                <dd id="order_amount_pay" style="color: #ff6666"></dd>
            </dl>
            <div class="lines"></div>
        </div>
    </div>
    <div class="centerContent">
        <div class="lines"></div>
        <dl>
            <dt>支付进度</dt>
            <dd id="order_status" style="color: #FF6666"></dd>
        </dl>
        <div class="lines"></div>
        <button id="pay-status" onclick="clickPay()"><img src="/resources/image/appPage/qrcode.svg" style="width: 20px;"><label>扫码支付</label></button>
        <div id="pay-status-lines"  class="lines"></div>
    </div>
</div>
<div class="show-pay" style="display: none;">
    <div class="show-bg"></div>
    <div class="show-content">
        <div class="show-title"><i class="fa-times"></i><div class="text">选择支付方式</div></div>
        <div class="lines"></div>
        <div class="show-payType">
            <dl id="ali_pay">
                <dt><img src="/resources/image/appPage/ali_pay.svg" style="width: 26px;height: 26px; margin-top: 1px; margin-left: 20px;"></dt>
                <dd>支付宝支付<i class="fa-check-circle"></i></dd>
            </dl>
            <div class="lines"></div>
            <dl id="weixin_pay">
                <dt><img src="/resources/image/appPage/weixin_pay.svg" style="width: 26px;height: 26px; margin-top: 1px; margin-left: 20px;"></dt>
                <dd>微信支付<i class="fa-check-circle"></i></dd>
            </dl>
            <div class="lines"></div>
        </div>
        <button id="submitPay" onclick="submitPay()">生成二维码</button>
    </div>
</div>
</body>
</html>