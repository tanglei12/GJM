<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!doctype html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>预算管理</title>
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/app/common.hint.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/common/page.list.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/budget/budget.css?v=<%=System.currentTimeMillis()%>" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/js/product/jquery-cookie.js"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
    <script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.state.js"></script>
    <script src="/resources/js/common/common.power.js"></script>
    <script src="/resources/js/common/budget-tablePage.js"></script> <!--预算管理分页插件-->
    <script src="/resources/js/budget/budget.js?v=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
<jsp:include page="../scrf/scrf.jsp"/><!-- csrf防御 -->
    <input type="hidden" id="bcb_type" value="">
    <input type="hidden" id="contractObject_Type" value="">
    <input type="hidden" id="startDate" value="">
</body>
</html>
