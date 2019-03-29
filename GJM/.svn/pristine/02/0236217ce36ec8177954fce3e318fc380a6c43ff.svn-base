<%@ page pageEncoding="utf-8" %>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="Expires" CONTENT="0">
    <meta http-equiv="Cache-Control" CONTENT="no-cache">
    <meta http-equiv="Pragma" CONTENT="no-cache">
    <title>合约审核</title>
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/sweet-alert/css/sweetalert.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/zyupload/skins/zyupload-1.0.0.css" rel="stylesheet" type="text/css">
    <link href="/resources/common/datepicker/jquery-ui.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/jquery-nice-select/css/nice-select.css" rel="stylesheet" type="text/css">
    <link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/contractList/cancelContractAuditing.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/common/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>
    <script src="/resources/common/sweet-alert/js/sweetalert-dev.js"></script>
    <script src="/resources/common/zyupload/zyupload-1.0.0.js"></script>
    <script src="/resources/common/datepicker/js/jquery-ui-datepicker.js"></script>
    <script src="/resources/Plug-in/jquery-nice-select/js/jquery.nice-select.js"></script>
    <script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
    <script src="/resources/Plug-in/jquery.rotate/jquery.rotate.min.js"></script>
    <script src="/resources/common/uber-zoom/uber-zoom.js"></script>
    <script src="/resources/js/bank.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/optionModel.js"></script>
    <script src="/resources/js/contractList/cancelContractAuditing.js?v=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
<!-- 主体内容 -->
<div id="main-box" style="width: 1100px;">
    <!-- 标题 -->
    <div class="box-nav">
        <a class="nav-tab nav-tab-focus" id="auditing-nav" href="javascript:;">主管审核</a>
    </div>
    <!-- 内容 -->
    <div class="box-content" id="auditing-content"></div>
    <!-- 操作 -->
    <div class="box-content">
        <div class="sub-content" style="text-align: center;">
            <button class="form-control" name="auditing-next" onclick="nextPage(this)" style="display: inline-block;">下一步</button>
            <button class="form-control back" name="auditing-prev" onclick="prevPage(this)" style="display: inline-block; margin-left: 100px;">上一步</button>
        </div>
    </div>
</div>
</body>
</html>