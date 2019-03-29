<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page import="com.gjp.util.AppUtil" %>
<html>
<head>
    <title>小区管理</title>
    <link href="/resources/css/common/common.css?v=<%=System.currentTimeMillis()%>" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="/resources/js/tree/css/demo.css" type="text/css"></link>
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 字体样式 -->
    <link rel="stylesheet" href="/resources/common/font-awesome/css/font-awesome.min.css" type="text/css"></link>
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <link href="/resources/less/common/common.hint.less" rel="stylesheet/less">
    <link href="/resources/common/sweet-alert/css/sweetalert.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/propertyInfo/propertyInfohouse.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js"></script>
    <script src="/resources/Plug-in/map/Js/public.js"></script>
    <script src="/resources/common/sweet-alert/js/sweetalert-dev.js"></script>
    <script src="/resources/Plug-in/My97DatePicker4.7.2/WdatePicker.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.hint.js"></script>
    <script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script><!-- 提示弹窗 -->
    <script src="http://api.map.baidu.com/api?v=2.0&ak=9HqNP0u7U4ZU5ZTKHT8BCbUa"></script>
    <script src="/resources/js/propertyInfo/propertyInfohouseNew.js"></script>
</head>
<body>
<jsp:include page="../scrf/scrf.jsp"/><!-- csrf防御 -->
<input type="hidden" value="" id="sid">
<input type="hidden" value="" id="upn_id">
<input type="hidden" value="" id="lq_id">
<input type="hidden" value="" id="propertyInfoid">
<input type="hidden" value="" id="upn_pid"/>
<input type="hidden" id="gj-id" value="<%=AppUtil.getCookieEmployee().getEm_account()%>"/>
<div class="propertyInfo-div">
    <div class="properInfo-div prop-menu">
        <div class="prop-menu-nav"></div>
        <div class="prop-menu-main custom-scroll"></div>
    </div>
    <div class="information-div prop-main">
        <div class="prop-main-head">
            <ul class="tab_menu">
                <li id="Additional"><a href="javascript:;">附加信息</a></li>
            </ul>
        </div>
        <!--添加小区,单元-->
        <div class="information-add"></div>
        <!--附加消息-->
        <div class="information-additional custom-scroll"></div>
    </div>
</div>
</body>
</html>
