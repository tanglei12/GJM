<%@ page language="java" pageEncoding="utf-8"%>
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
<title>借款审核</title>
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 字体样式 -->
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 字体样式 -->
<link href="/resources/css/table-min.css" rel="stylesheet" type="text/css" /><!-- 表格样式 -->
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<link href="/resources/common/swipeslider-develop/dist/swipeslider.css" rel="stylesheet" type="text/css">
<link href="/resources/css/library/house-list.css" rel="stylesheet" type="text/css">
<link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css">
<link href="/resources/css/housePublish.css" rel="stylesheet" type="text/css">
<link href="/resources/css/contractList/contractAnimate.css" rel="stylesheet" type="text/css">
<link href="/resources/css/addAdvertisement/lookAdvertisement.css" rel="stylesheet" type="text/css">
<link href="/resources/css/addAdvertisement/advertisement.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/table-min.js"></script>
<script src="/resources/js/product/jquery-cookie.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script src="/resources/common/swipeslider-develop/dist/swipeslider.min.js"></script>
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
<script src="/resources/js/loanRecord/loanRecordList.js"></script>

<script src="/resources/js/viewer.min.js"></script>  <!-- 查看图片 -->
<!-- 上传插件 -->
<script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script>
<!-- 百度地图 -->
<script src="http://api.map.baidu.com/api?v=2.0&ak=9HqNP0u7U4ZU5ZTKHT8BCbUa"></script>
<!-- UE编辑器 -->
<script type="text/javascript" charset="utf-8" src="/resources/umeditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="/resources/umeditor/ueditor.all.min.js"> </script>
<script type="text/javascript" charset="utf-8" src="/resources/umeditor/lang/zh-cn/zh-cn.js"></script>
<script src="/resources/umeditor/lang/zh-cn/zh-cn.js"></script>
<script src="/resources/js/housePublish.js"></script>
<script src="/resources/js/common/optionModel.js"></script>
</head>
<body>
	<div id="content"></div>
	<div id="contractInfo" class="contractInfo" style="display:none;">
		<div class="title" style="height: 40px; margin: 10px; margin-right: 30px; border: 1px solid #ddd;">
			<span class="contractInfo-refresh" onclick="refreshDiv()" style="margin-right: 55px;"><i class="icon-refresh"></i></span>
			<span class="contractInfo-close" onclick="closeDiv()" style="margin-right: 15px;"><i class="fa fa-close"></i></span>
		</div>
		<div id="iframeDiv" style="width: 100%; height: 100%;">
			<iframe id="contractInfoIframe" scrolling="auto" name="contractInfoIframe" frameborder="0" style="width: 100%; height:88%;"></iframe>
		</div>
	</div>
</body>
</html>