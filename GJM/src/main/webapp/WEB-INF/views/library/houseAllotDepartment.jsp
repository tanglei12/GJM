<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<title>部门房源</title>
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 字体图标 -->
<link href="/resources/css/table-min.css" rel="stylesheet" type="text/css" /><!-- 表格样式 -->
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<link href="/resources/common/swipeslider-develop/dist/swipeslider.css" rel="stylesheet" type="text/css">
<link href="/resources/css/carousel.css" rel="stylesheet" type="text/css">
<link href="/resources/css/library/house-list.css" rel="stylesheet" type="text/css">
<link href="/resources/css/housePublish.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/table-min.js"></script><!-- 表格公共js -->
<script src="/resources/js/manage_index_right.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js"></script>
<!-- 上传插件 -->
<script src="/resources/js/common/image-upload3.js"></script>
<!-- 百度地图 -->
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=9HqNP0u7U4ZU5ZTKHT8BCbUa"></script>
<!-- UE编辑器 -->
<script type="text/javascript" charset="utf-8" src="/resources/umeditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="/resources/umeditor/ueditor.all.min.js"> </script>
<script type="text/javascript" charset="utf-8" src="/resources/umeditor/lang/zh-cn/zh-cn.js"></script>
<script type="text/javascript" charset="utf-8" src="/resources/js/housePublish.js"></script>
<!-- cookie -->
<script src="/resources/js/product/jquery-cookie.js"></script>
<script src="/resources/common/swipeslider-develop/dist/swipeslider.min.js"></script>
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
<script src="/resources/js/library/carousel.js"></script>
<script src="/resources/js/library/houseAllotDepartment.js"></script>
</head>
<style>
.activeType .input_check+span{
	display: inline-block;
    border: 1px solid #a9a9a9;
    width: 16px;
    height: 16px;
    position: absolute;
    top: 10px;
    left: 10px;
    margin-top: 0;
    margin-left: 0;
    margin-right:10px;
    border-radius: 2px;
    background-color: #FFF;
}
.activeType i {
    font-style: normal;
    margin-left: 32px;
}
.activeType label{
	width: 100%;
	height: 100%;
	display: block;
}
</style>
<body>
	<div id="content">
		<!-- 数据读取 -->
	</div>
</body>
</html>