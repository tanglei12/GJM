<%@ page language="java" import="java.util.Date" pageEncoding="utf-8"%>
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
<title>报账单</title>
<link href="/resources/css/common/common.css?v=<%=new Date().getTime()%>" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"><!-- 字体图标 -->
<link href="/resources/common/uber-zoom/uber-zoom.css" rel="stylesheet" type="text/css">
<link href="/resources/common/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/common/datepicker/jquery-ui.css" rel="stylesheet" type="text/css">
<link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
<link href="/resources/common/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/chosen/chosen.css" rel="stylesheet" type="text/css"><!-- 模糊下拉框 -->
<link href="/resources/css/contractList/displayContract.css?v=<%=new Date().getTime()%>" rel="stylesheet" type="text/css">
<link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css">
<link href="/resources/css/viewer.min.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/common/uber-zoom/uber-zoom.js"></script>
<script src="/resources/common/datepicker/js/jquery-ui-datepicker.js"></script>
<!-- <script src="/resources/common/zyupload/zyupload-1.0.0.js"></script> -->
<script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script>
<script src="/resources/common/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>
<script src="/resources/Plug-in/jquery.rotate/jquery.rotate.min.js"></script>
<script src="/resources/Plug-in/jquery_lazyload-1.9.7/jquery.lazyload.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script src="/resources/Plug-in/layer/layer.js"></script>
<script src="/resources/js/product/jquery-cookie.js"></script>
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script><!-- 时间插件 -->
<script src="/resources/Plug-in/chosen/chosen.jquery.js"></script><!-- 模糊下拉框 -->
<script src="/resources/js/jquery.qrcode.min.js"></script><!-- 二维码 -->
<script src="/resources/js/viewer.min.js"></script>  <!-- 查看图片 -->
<script src="/resources/print/LodopFuncs.js"></script><!-- 打印插件 -->
<!-- 上传插件 -->
<script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script>
<!-- UE编辑器 -->
<script type="text/javascript" charset="utf-8" src="/resources/umeditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="/resources/umeditor/ueditor.all.min.js"> </script>
<script type="text/javascript" charset="utf-8" src="/resources/umeditor/lang/zh-cn/zh-cn.js"></script>
<script src="/resources/js/loanRecord/loanRecordLending.js"></script>
<style type="text/css">
	.finish-butten{
	    float: left;
	    font-size: 15px;
	    width: 81px;
	    margin: 15px 10px;
	    background-color: #18bc9c;
	    border-radius: 6px;
	    line-height: initial;
	    text-align: center;
	    height: 30px;
	}
	.div-list {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 10px 28px;
		border-top: 1px solid #efefef;
	}
	.div-list>dl {
		display: flex;
		line-height: 30px;
		font-size: 14px;
		padding-bottom: 4px;
	}
	.div-list>dl>dt {
		min-width: 100px;
		color: #666;
	}
	.div-list>dl>dd {
		padding: 0 0 0 10px;
		color: #000000;
	}
</style>
</head>
<body>
	<div id="main-box">
		<div class="box-nav"></div>
		<!-- 【基本信息】 -->
		<div class="box-content" >
			<div class="sub-title" id="contract-title"></div>
			<div class="sub-content" id="contract-content"></div>
		</div>
	</div>
</body>
</html>