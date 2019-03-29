<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="format-detection" content="telephone=no">
<meta name="format-detection" content="email=no">
<title>意向实勘</title>
<link href="/resources/mui/mui.css" rel="stylesheet" type="text/css"><!-- 下拉刷新上拉更多样式 -->
<link href="/resources/common/imageUpload/css/jquery.image-upload.css" rel="stylesheet" type="text/css"><!-- 图片上传 -->
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">
<link href="/resources/css/appPage/intentionListAdd.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-2.0.0.min.js"></script><!-- jQuery插件 -->
<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/appPage/intentionFollowUp2.js"></script>
<script src="/resources/common/imageUpload/js/jquery.image-upload.js"></script><!-- 图片上传 -->
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script src="/resources/mui/mui.min.js"></script>
<script src="/resources/mui/mui.previewimage.js"></script> <!-- 图片浏览 -->
<script src="/resources/mui/mui.zoom.js"></script><!-- 图片浏览 -->
</head>
<style>
.checkbox{
    min-width: 43px;
    padding: 9px;
    border-radius: 5px;
    background-color: #F2F2F2;
    float: left;
    height: 27px;
    line-height: 12px;
    margin-right: 10%;
    margin-bottom: 10%;
    text-align: center;
}

.appImageBox .image-item .image-item-img {
    width: 110px;
    height: 70px;
    border: none;
    border-radius: 4px;
}

.appImageBox .image-item {
    display: block;
    float: left;
    position: relative;
    width: 110px;
    height: 70px;
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 10px;
}
</style>
<body>
<div class="content">
	<div class="messageContent" style="margin-bottom: 10px; padding: 0 2%">
		<div id="uploadImage"></div>
	</div>
	<div class="messageContent">
		<dl>
			<dt><label>面积:</label><span>*</span></dt>
			<dd><input id="area" style="width: 80%;" type="number" /><label>平米</label></dd>
		</dl>
		<dl>
			<dt><label>装修情况:</label><span>*</span></dt>
			<dd><select id="renovation" style="padding-left: 73%;"><option value="3">豪装</option><option value="4">中装</option><option value="2">精装修</option><option value="1">简装修</option><option value="0">清水房</option></select><label class="font-icon"></label></dd>
		</dl>
		<dl>
			<dt><label>装修风格:</label><span>*</span></dt>
			<dd><select id="style" style="padding-left: 73%;"><option value="中式">中式</option><option value="欧式">欧式</option><option value="现代" selected="selected">现代</option><option value="其他">其他</option></select><label class="font-icon"></label></dd>
		</dl>
		<dl>
			<dt><label>房源类型:</label><span>*</span></dt>
			<dd><select id="brand" style="padding-left: 73%;"><option value="1">分散式</option><option value="2">集中式</option></select><label class="font-icon"></label></dd>
		</dl>
	</div>
	
	<div class="messageContent" style="margin-top: 15px;">
		<dl class="bottom" style="height: auto; overflow: hidden;">
			<dt><label>房屋配置:</label><span>*</span></dt>
			<dd style="height: auto; overflow: hidden; padding: 10px 0 0 0; height: 220px;" id="configure">
				<label class="checkbox"><i>床</i></label>
				<label class="checkbox"><i>衣柜</i></label>
				<label class="checkbox"><i>沙发</i></label>
				<label class="checkbox"><i>电视</i></label>
				<label class="checkbox"><i>冰箱</i></label>
				<label class="checkbox"><i>洗衣机</i></label>
				<label class="checkbox"><i>空调</i></label>
				<label class="checkbox"><i>热水器</i></label>
				<label class="checkbox"><i>宽带</i></label>
			</dd>
		</dl>
	</div>
	
	<div class="messageContent" style="margin-top: 15px;">
		<dl class="bottom" style="height: auto; overflow: hidden;">
			<dt><label>推荐人群:</label><span>*</span></dt>
			<dd style="height: auto; overflow: hidden; padding: 10px 0 0 0; height: 110px;" id="people">
				<label class="checkbox" data-value="1"><i>家庭</i></label>
				<label class="checkbox" data-value="2"><i>学区</i></label>
				<label class="checkbox" data-value="3"><i>朋友</i></label>
				<label class="checkbox" data-value="4"><i>创业</i></label>
			</dd>
		</dl>
	</div>
	
	<div class="messageContent" style="margin-top: 15px;">
		<dl class="bottom" style="height: auto; overflow: hidden;">
			<dt><label>房源点评:</label><span>*</span></dt>
			<dd style="height: auto; overflow: hidden; padding: 10px 0 0 0; height: 157px;">
				<textarea id="text" rows="" cols="" onkeyup="textFont(this)" style="width: 85%; height: 111px; resize: none; border: 1px solid #e8e8e8; outline: none; padding: 5px; box-shadow:0px 0px 0px rgba(0,0,0,0); -webkit-appearance:none;"></textarea>
				<label class="textFont">字数:<span class="fontSize">0</span><span>，字数不能少于20</span></label>
			</dd>
		</dl>
	</div>
	<input type="hidden" id="builTypes">
	<input type="hidden" id="hi_code">
</div>
<button class="submit" onclick="submit()" style="line-height: 35px; border-radius: 0px;">提交</button>
</body>
</html>