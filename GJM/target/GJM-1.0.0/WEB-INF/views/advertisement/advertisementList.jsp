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
<title>广告管理</title>
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
<script src="/resources/js/advertisement/advertisementlist.js"></script>
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
	<div class="expense">
		<div class="expense-container3" id="expense-container3">
			<div id="cd-buttons">
				<div style="margin: auto; width: 90%; text-align: center;border-bottom: 1px solid #06B;" id="titleInsert">
					<input type="text" value="广告" id="inputtext" name="inputtext" style="width:210px;border: none; text-align: center; font-size: 20px; color: #3E97C9; font-family: 微软雅黑; -moz-user-select: none; -webkit-user-select: none; cursor: default;" readonly="readonly">
				</div>
				<div>
					<input type="text" id="ad_name" value="" placeholder="标题" value="123" style="margin-top: 10px;width:70%;border-radius:6px;height:30px;text-align: center;" >
				</div>
				<div style="width:101%;">
					<div id="div_img" style="text-align: center;margin: 0 auto;margin-top: 20px;width: 288px;cursor: pointer;margin-right: 10px;margin-bottom: 10px;overflow: hidden;">
						<img style="width: 100%;">
					</div>
				</div>
				<div>
					<textarea id="div_text" style="margin-top: 10px;width: 96%;height: 110px;resize:none"></textarea>
				</div>
			</div>
			<a href="#0" class="expense-popup-close" style="color: red;">X</a>
		</div>
	</div>
</body>
<script type="text/javascript">
//关闭窗口
$('.expense-popup-close').on('click', function(){
  $(".expense").removeClass('is-visible3');
  $('#expense tbody').find('tr').remove();
});
</script>
</html>