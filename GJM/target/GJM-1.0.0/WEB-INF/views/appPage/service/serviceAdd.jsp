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
    <title>服务申请</title>
    <link href="/resources/css/appPage/service/serviceAdd.css" rel="stylesheet" type="text/css"><!-- 下拉刷新上拉更多样式 -->
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-2.0.0.min.js"></script><!-- jQuery插件 -->
    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
    <script src="/resources/js/appPage/service/serviceAdd.js?v=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
<div class="content">
    <div class="center">
        <dl style="display: none">
            <dt><label>申请类型</label></dt>
            <dd>
                <select id="type" style="padding-left: 67%;" onchange="types(this)">
                    <option value="代申请服务">代申请服务</option>
                    <option value="租前服务">&nbsp;&nbsp;&nbsp;租前服务</option>
                </select>
                <label class="font-icon"></label></dd>
        </dl>
        <dl>
            <dt><label>付费对象</label></dt>
            <dd>
                <select id="typep" style="padding-left: 75%;" onchange="typep(this)">
                    <option value="租客">租客</option>
                    <option value="房东">房东</option>
                    <option value="管家">管家</option>
                    <option value="门店">门店</option>
                </select>
                <label class="font-icon"></label></dd>
        </dl>
        <dl class="bottom">
            <dt><label>小区房号</label><em>*</em></dt>
            <dd><input class="house_address" type="text" value="" placeholder="选择小区房号" readonly onclick="houseSearch(this)"><label class="font-icon"></label></dd>
        </dl>
    </div>
    <div class="center">
        <dl>
            <dt><label>联系人</label><em>*</em></dt>
            <dd><input id="cc_name" type="text" value=""></dd>
        </dl>
        <dl>
            <dt><label>联系方式</label><em>*</em></dt>
            <dd><input id="ccp_phone" type="text" value=""></dd>
        </dl>
        <input id="cc_code" type="hidden" value="">
        <%--<dl class="moneyName">
            <dt><label>付费人</label><em>*</em></dt>
            <dd>
                <input id="cc_code" type="hidden">
                <input id="xcc_name" type="text" value="">
            </dd>
        </dl>
        <dl class="moneyPhone">
            <dt><label>付费电话</label><em>*</em></dt>
            <dd><input id="xccp_phone" type="text" value=""></dd>
        </dl>--%>
        <dl>
            <dt><label>约定时间</label><em>*</em></dt>
            <dd style="position: relative;"><input type="date" value="" style="border: none; width: 87%;-webkit-appearance: none; position: absolute; top: 10px; left:0"></dd>
        </dl>
        <dl class="bottom">
            <dt><label>备注</label><em></em></dt>
            <dd style="position: relative;"><input id="remark" type="text" value=""></dd>
        </dl>
        <input type="hidden" id="houseS"/>
        <input type="hidden" id="con_no"/>
    </div>
    <div class="center">
        <dl class="bottom">
            <dt>服务申请</dt>
            <dd style="font-size: 27px;"><i class="fa-plus-square" onclick="addProject(this)"></i></dd>
        </dl>
    </div>
    <div class="contentService" style="margin-bottom: 60px;"></div>
    <div class="bottom_service">
        <%--<label class="title">费用合计:</label>--%>
       <%-- <label class="money">￥0.00</label>--%>
        <button onclick="serviceSubmit()">提交申请</button>
    </div>
</div>
</body>
</html>