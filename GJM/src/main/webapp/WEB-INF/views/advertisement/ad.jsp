<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=2.0"/>
<title>预览广告</title>
</head>
<body style="background-color: #DDDDDD;min-height: 100%;">
	<div class="expense-container3" id="expense-container3" style="width: 100%;height: 100%;">
		<div id="cd-buttons" style="width: 100%;height: 100%;">
			<div style="margin:5px auto;width:99%;text-align:center;">
				<input type="text" id="ad_name" value="${advertisement.ad_name }" placeholder="标题" value="123" readonly="readonly" style="width:100%;border-radius:6px;height:50px;text-align:center;border:none;font-size:23px;background-color:#DDDDDD;">
			</div>
			<div style="margin:auto;width:96%;margin-top:25px;background-color:white;">
				<img style="width:100%;" src="${advertisement.ad_image }" title="${advertisement.ad_title }" alt="${advertisement.ad_alert }">
			</div>
			<div style="margin: auto;width: 100%;text-indent: 33px;margin-top: 15px;margin-bottom: 10px;">
					${advertisement.ad_content }
<!-- 					<textarea id="div_text" style="margin-top:10px;width:100%;height:98%;border:0;outline:none;resize:none;font-size:16px;margin-top: 5px;" readonly="readonly"></textarea> -->
			</div>
		</div>
	</div>
</body>
</html>