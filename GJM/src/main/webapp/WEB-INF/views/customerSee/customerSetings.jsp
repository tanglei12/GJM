<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%> 
<%
	response.setHeader("Pragma","No-cache");
	response.setHeader("Cache-Control","no-cache");
	response.setDateHeader("Expires", -10);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>添加客户</title>
</head>
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/css/customerCss.css" rel="stylesheet" type="text/css">
<link href="/resources/common/uber-zoom/uber-zoom.css" rel="stylesheet" type="text/css"><!-- 图片缩放 -->
<link href="/resources/common/zyupload/skins/zyupload-1.0.0.css" rel="stylesheet" type="text/css"><!-- 文件上传插件 -->

<script type="text/javascript" src="/resources/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="/resources/js/customerSetings.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/Plug-in/jquery.rotate/jquery.rotate.min.js"></script>
<script src="/resources/common/uber-zoom/uber-zoom.js"></script><!-- 图片缩放 -->
<script src="/resources/common/zyupload/zyupload-1.0.0.js"></script><!-- 文件上传插件 -->
<body style="background-color: #f5f5f5">
<div id="main-box">
	<div class="box-nav"><ul><li class="nav-tab-focus">统计设置</li></ul></div>
	<div class="box-content" style="padding-top: 20px;">
		<div id="sgin-infoT">
			<dl class="content-dl">
				<dt><em>*</em>新增房屋</dt>
				<dd>
					<input type="text" class="from-data validate[required]" name="houseNum" id="houseNum" placeholder="个数">/天
				</dd>
				<dd class="msg"></dd>
			</dl>
			<dl class="content-dl">
				<dt><em>*</em>房屋实勘</dt>
				<dd>
					<input type="text" class="from-data validate[required]" name="seeNum" id="seeNum" placeholder="个数">/周
				</dd>
				<dd class="msg"></dd>
			</dl>
			<dl class="content-dl">
				<dt><em>*</em>带看房屋</dt>
				<dd>
					<input type="text" class="from-data validate[required]" name="daiNum" id="daiNum" placeholder="个数">/周
				</dd>
				<dd class="msg"></dd>
			</dl>
			<dl class="content-dl" style="margin-top: 20px;" id="Ubutton">
				<dt></dt>
				<dd style="width: 130px;">
					<button class="from-data" onclick="submit()">设置</button>
				</dd>
				<dd class="msg"></dd>
			</dl>
			<input type="hidden" id="userChoice" value="0" />
		</div>
	</div>
</div>
</body>
</html>