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
<title>定金侧滑框</title>
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
<link href="/resources/css/bookkeepBook/expense.css" rel="stylesheet" type="text/css"> <!-- 弹出框样式 -->

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
<script src="/resources/js/financeManage/financeManageExamine.js"></script>
<style type="text/css">
	.finish-butten{
	    float: left;
	    font-size: 15px;
	    border: 1px solid;
	    width: 81px;
   	    margin: 15px 10px;
	    background-color: #18bc9c;
	    border-radius: 6px;
	    line-height: initial;
	    text-align: center;
	    height: 30px;
	}
	.label{
    margin-left: 10px;
    font-size: 15px;
    border: 1px solid;
    line-height: initial;
    text-align: center;
    width: 120px;
    height: 38px;
    border-radius: 4px;
    padding: 3px 10px;
    }
</style>
</head>
<body>
	<div id="main-box">
		<div class="box-nav"></div>
		<!-- 【基本信息】 -->
		<div class="box-content" >
			<div class="sub-title" id="contract-title"></div>
			<div class="sub-content" id="contract-content" style="border: 1px;"></div>
		</div>
	</div>
	
	<div class="expense">
		<div class="expense-container3" id="expense-container3" style="width:350px;min-height: 150px;">
			<div id="cd-buttons">
				<div style="margin: auto; width: 90%; text-align: center;border-bottom: 1px solid #06B;" id="titleInsert">
					<input type="text" value="定金违约处理" id="inputtext" name="inputtext" style="width:210px;border: none; text-align: center; font-size: 20px; color: #3E97C9; font-family: 微软雅黑; -moz-user-select: none; -webkit-user-select: none; cursor: default;" readonly="readonly">
				</div>
				<div class="sub-title" id="contract-title" style="margin: auto; width: 95%;border-bottom: 1px solid whitesmoke;">
					<ul class="title-nav">
						<li class="visited">是否同意退定金：</li>
					</ul>
				</div>
				<div class="radio-div" style="float:left;margin: 15px 60px;">
				</div>
				<div class="sub-title  title-div" id="contract-title" style="margin: auto;width: 95%;border-bottom: 1px solid whitesmoke;float: left;">
					<ul class="title-nav" style="margin-left: 16px;">
						<li class="visited">退款原因：</li>
					</ul>
				</div>
				<div class="div-textarea" style="float:left;margin: 15px 40px;">
					<textarea id="text" style="width: 230px;height: 100px;resize:none;disabled:disabled;"></textarea>
				</div>
				<div style="float: right;">
					<button type="butten" class="finish-butten close-button">关闭</button>
					<button type="butten" class="finish-butten sumbit-button">提交审核</button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>