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
    <title>待收款</title>
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/appPage/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/appPage/contractBillPay.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-2.0.0.min.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/appPage/contractBillPay.js"></script>
</head>
<body>
<main>
    <div class="content">
        <div class="content_top">
            <div class="content_top_title">
                <div class="money"></div>
                <div class="pay_type">待<label class="balPay">收</label>款</div>
            </div>
            <div class="content_top_cneter">
                <div class="text_center">
                    <ul>
                        <li class="name"><label class="nameLabel" style="font-weight: bold;"></label></li>
                        <li class="address"></li>
                    </ul>
                </div>
                <div class="moneys">
                    <!-- <label class="state"></label> -->
                    <label class="month"></label>
                    <label class="bill_date"></label>
                </div>
                <div class="icon" style="display: none">
                    <i class="fa-angle-right"></i>
                </div>
            </div>
        </div>
        <div class="content_moneys">
            <div class="content_moneys_title">账单明细</div>
            <div id="content_moneys_content"></div>
        </div>
    </div>
    <div class="content_bottom" style="margin-bottom: 50px;display: none;">
        <div class="content_bottom_content">
            <div class="content_bottom_title">应<label class="balPay">收</label>金额</div>
            <div class="content_bottom_money" id="zyMoney">0.00</div>
        </div>
        <div class="content_bottom_content">
            <div class="content_bottom_title">已<label class="balPay">收</label>金额</div>
            <div class="content_bottom_money" id="zsMoney">0.00</div>
        </div>
        <div class="content_bottom_content bottom">
            <div class="content_bottom_title">应<label class="balPay">收</label>款日</div>
            <div class="content_bottom_date" id="date"></div>
        </div>
    </div>
</main>
<input type="hidden" id="bco_code"/>
<button style="background-color: #FF6666; font-size: 16px;" onclick="OCBillPay.pay()" id="submit">去收款</button>
</body>
</html>