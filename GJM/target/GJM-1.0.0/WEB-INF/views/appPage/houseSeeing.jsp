<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
    <title>客户带看</title>
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/appPage/houseSeeing.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/houseSeeing.css" rel="stylesheet" type="text/css">


    <script src="/resources/js/jquery-2.0.0.min.js"></script>
    <script src="/resources/js/encryption/base64.min.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.hint.js"></script>
    <script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script>
    <script src="/resources/js/appPage/houseSeeing.js?v=2.0"></script>
</head>
<body>
<jsp:include page="../scrf/scrf.jsp"/><!-- csrf防御 -->
<div class="housePay">
    <div class="title_class">房屋信息</div>
    <div class="houseCenter">
        <dl>
            <dt>房源房号</dt>
            <dd id="house_address"></dd>
        </dl>
        <dl class="button">
            <dt>支付方式</dt>
            <dd style="margin-right: 0;">
                <select id="hs_payType" onchange="housePayType(this)" style="padding-left: 74%;">
                    <option value="月付">月付</option>
                    <option value="季付">季付</option>
                    <option value="半年付">半年付</option>
                    <option value="年付">年付</option>
                </select>
                <label class="font-icon"></label>
            </dd>
        </dl>
        <dl>
            <dt>出房价</dt>
            <dd>
                <input class="money" style="width: 84%">
                <label class="fontTitle" style="display:inline-block;">元/月</label>
            </dd>
        </dl>
    </div>
</div>
<div class="die-block">
    <dl class="layout-dl">
        <dt class="layout-dt">带看结果</dt>
        <dd class="layout-dd">
            <select name="hs_state" id="hs_state" onchange="genSeeing(this)">
                <option value="1">成功</option>
                <option value="2">失败</option>
            </select>
            <label class="font-icon"></label>
        </dd>
    </dl>
    <dl class="layout-dl">
        <dt class="layout-dt">处理方式</dt>
        <dd class="layout-dd">
            <select name="hs_type" id="hs_type" onchange="payType(this)">
                <option value="定金">定金</option>
                <option value="合同">合同</option>
            </select>
            <label class="font-icon"></label>
        </dd>
    </dl>
    <dl class="layout-dl">
        <dt class="layout-dt">带看描述</dt>
        <dd class="layout-dd"><input placeholder="填写客户带看反馈" type="text" name="hs_content" id="hs_content" value=""/></dd>
    </dl>
</div>
<div class="die-block" style="margin-top: 5px;">
    <dl class="layout-dl" id="card-box">
        <dt class="layout-dt">证件号</dt>
        <dd class="layout-dd">
            <input id="numberCard" type="text" placeholder="请填写证件号" style="width: 88%; height: inherit;line-height: inherit;" required/>
            <input type="hidden" value="" id="cc_code">
            <i class="fa-address-card" onclick="alert('还在开发中')"></i>
        </dd>
        <!-- 		<dd><input id="numberCard" type="text" placeholder="请填写证件号" style="width: 88%; height: inherit;line-height: inherit;" /><i class="fa-address-card" onclick=""></i></dd> -->
    </dl>
    <dl class="layout-dl">
        <dt class="layout-dt">客户电话</dt>
        <dd class="layout-dd">
            <input type="number" name="ccp_phone" id="ccp_phone" placeholder="客户电话" required/>
        </dd>
    </dl>
    <dl class="layout-dl">
        <dt class="layout-dt">客户姓名</dt>
        <dd class="layout-dd"><input name="cc_name" id="cc_name" placeholder="客户姓名" required/></dd>
    </dl>
    <div id="cardPlace" style="text-align: right;padding: 3px 1px;color: #ff6666;">

    </div>
</div>
<div class="payMoney">
    <dl>
        <dt>预留天数</dt>
        <dd id="houseDay">
            <div class="houseDay"><input type="number" placeholder="预留天数选择" value="3" readonly/></div>
            <div class="dayDiv" style="display: none;">
                <label class="checkboxDay" data-type="1"><i>1天</i></label>
                <label class="checkboxDay" data-type="2"><i>2天</i></label>
                <label class="checkboxDay click" data-type="3"><i>3天</i></label>
                <label class="checkboxDay" data-type="4"><i>4天</i></label>
                <label class="checkboxDay" data-type="5"><i>5天</i></label>
                <label class="checkboxDay" data-type="6"><i>6天</i></label>
                <label class="checkboxDay" data-type="7"><i>7天</i></label>
            </div>
        </dd>
    </dl>
    <dl>
        <dt>客户定金</dt>
        <dd><input name="payMoney" type="number" placeholder="请填写定金" style="width: 100%; height: inherit;line-height: inherit;" onkeyup="moneyUp(this)" required/></dd>
    </dl>
    <dl>
        <dt>起租日期</dt>
        <dd><input id="contractStartDate" type="date" placeholder="起租日期" style="width: 86%; height: inherit;line-height: inherit;" required/></dd>
    </dl>
    <dl>
        <dt>约定租期</dt>
        <dd><input id="contractDay" type="number" placeholder="约定租期" style="width: 86%; height: inherit;line-height: inherit;" required/>个月</dd>
    </dl>
    <%--<dl class="button">
        <dt>支付方式</dt>
        <dd>
            <select id="payType" style="padding-left: 72%; margin-bottom: 0; margin-top: 10px;">
                <option value="支付宝">支付宝</option>
                <option value="微信">&nbsp;&nbsp;&nbsp;微信</option>
            </select>
            <label class="font-icon"></label>
        </dd>
    </dl>--%>
</div>
<input type="hidden" id="hi_code">
<div class="actions" style="margin-bottom: 10px;">
    <button class="app-submit" onclick="submitHouseSeeing(this)">提交</button>
</div>
</body>
</html>