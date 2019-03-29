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
<title>意向跟进</title>
<link href="/resources/css/appPage/intentionListAdd.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-2.0.0.min.js"></script><!-- jQuery插件 -->
<script src="/resources/js/appPage/intention-util.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/appPage/intentionFollowUp1.js"></script>
<script src="/resources/mui/mui.min.js"></script>
</head>
<body>
<div class="content">
	<div class="messageContent">
		<dl>
			<dt><label>所属小区:</label><span>*</span></dt>
			<dd><input class="select" id="propertyInfo" disabled="disabled" type="text" placeholder="请选择" readonly="readonly" /><label class="font-icon"></label></dd>
		</dl>
		<dl>
			<dt><label>房源房号:</label><span>*</span></dt>
			<dd id="houseCode"><label class="houseTSW"><input maxlength="2" type="text" />楼</label><label class="houseTSW"><input type="text" maxlength="2" />号</label></dd>
		</dl>
		<dl>
			<dt><label>房东电话:</label><span>*</span></dt>
			<dd><input id="phone" type="text" /></dd>
		</dl>
		<dl>
			<dt><label>房东报价:</label><span>*</span></dt>
			<dd><input id="money" type="text" /><label class="">元</label></dd>
		</dl>
		<dl>
			<dt><label>房源户型:</label><span>*</span></dt>
			<dd><label class="houseTSW"><input maxlength="1" id="houseS" type="number" />室</label><label class="houseTSW"><input type="number" id="houseT" maxlength="1" />厅</label><label class="houseTSW"><input type="number" id="houseW" maxlength="1" />卫</label></dd>
		</dl>
		<dl>
			<dt><label>房源类别:</label><span>*</span></dt>
			<dd><select id="type" style="padding-left: 71%;"><option value="">请选择</option><option value="私盘">&nbsp;&nbsp;&nbsp;私盘</option><option value="公盘">&nbsp;&nbsp;&nbsp;公盘</option></select><label class="font-icon"></label></dd>
		</dl>
		<dl>
			<dt><label>房源来源:</label><span>*</span></dt>
			<dd>
			<select id="source" style="padding-left: 67%;">
				<option value="线下开发">线下开发</option>
				<option value="广告">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;广告</option>
				<option value="网络来源">网络来源</option>
				<option value="上门">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上门</option>
			</select><label class="font-icon"></label></dd>
		</dl>
		<dl>
			<dt><label>房东姓名:</label><span>*</span></dt>
			<dd><input id="name" type="text" /></dd>
		</dl>
		<dl class="bottom">
			<dt><label>房东性别:</label><span>*</span></dt>
			<dd><select id="sex" style="padding-left:76%;"><option value="先生">先生</option><option value="女士">女士</option></select><label class="font-icon"></label></dd>
		</dl>
	</div>
	
	<div class="messageContent" style="margin-top: 15px;">
		<dl style="height: auto; overflow: hidden;">
			<dt><label>房屋优势:</label><span>*</span></dt>
			<dd style="height: auto; overflow: hidden; padding: 10px 0 0 0;" id="hi_funtion">
				<label class="checkbox"><i>拎包入住</i></label>
				<label class="checkbox"><i>小区坏境好</i></label>
				<label class="checkbox"><i>家电齐全</i></label>
				<label class="checkbox"><i>临近轻轨</i></label>
				<label class="checkbox"><i>交通方便</i></label>
				<label class="checkbox"><i>全新装修</i></label>
				<label class="checkbox"><i>欧式风格</i></label>
				<label class="checkbox"><i>通风采光好</i></label>
			</dd>
		</dl>
	</div>
	<input type="hidden" id="builTypes">
	<input type="hidden" id="hi_code">
</div>
<button class="submit" onclick="submit()">提交</button>
</body>
</html>