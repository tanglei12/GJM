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
    <title>租金付款</title>
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/payContractFirstBill.css" rel="stylesheet" type="text/css">


    <script src="/resources/js/jquery-2.0.0.min.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.hint.js"></script>
    <script src="/resources/js/appPage/payContractFirstBill.js?v=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
<header class="content content-top">
    <div class="content-item" id="contractBillView">
        <div class="item-title">
            <div class="content-top-icon next"><i class="fa-home"></i></div>
            <div class="content-top-text" id="house-address" style="flex: 1;"></div>
            <div class="content-top-option next"><i class="fa-list"></i>所有账单</div>
        </div>
    </div>
</header>
<main>
    <div class="content">
        <div class="content-head">
            <div class="content-item-title">租金<label class="balPay">付</label>款</div>
            <div class="content-item-option" id="repayment">首期<label class="balPay">付</label>款：<span class="error"></span></div>
        </div>
        <div class="content-main" id="contractBillList"></div>
    </div>
    <div class="content" id="deposit-parent-box">
        <div class="content-main">
            <div class="content-item">
                <dl>
                    <dt>定金</dt>
                    <dd id="deposit-box"><span id="deposit"><span style="color:#888;">选择定金</span></span><i class="fa-angle-right" style="font-size: 18px;margin-left: 6px;"></i></dd>
                </dl>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="content-main">
            <div class="content-item">
                <dl>
                    <dt><label class="balPay">付</label>款方式</dt>
                    <dd>
                        <select name="payType" style="width:100%;line-height: inherit;text-align: right;direction: rtl;">
                            <option>支付宝</option>
                            <option>微信</option>
                        </select>
                    </dd>
                    <dd style="flex: initial;"><i class="fa-angle-right" style="font-size: 18px;margin-left: 6px;position: relative;top: 1px;"></i></dd>
                </dl>
            </div>
        </div>
    </div>
</main>
<footer>
    <div class="content content-footer">
        <div class="content-desc">实际<label class="balPay">付</label>款：<span class="error" id="realpayment"></span></div>
        <button class="content-submmit error-bg" name="pay" onclick="$.pay()">立即<label class="balPay">付</label>款</button>
    </div>
</footer>
</body>
</html>