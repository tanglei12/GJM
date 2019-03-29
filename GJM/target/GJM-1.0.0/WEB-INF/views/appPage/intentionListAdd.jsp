<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="format-detection" content="telephone=no">
<meta name="format-detection" content="email=no">
<title>房源录入</title>
<link href="/resources/css/appPage/intentionListAdd.css" rel="stylesheet" type="text/css">
<script src="/resources/js/jquery-2.0.0.min.js"></script><!-- jQuery插件 -->
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/appPage/intentionListAdd.js?v=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
<div class="content">

	<div class="messageContent">
		<dl>
			<dt><label>房东电话:</label><span>*</span></dt>
			<dd><input id="phone" type="number" onkeyup="checkphone(this)" /></dd>
		</dl>
		<dl>
			<dt><label>房东姓名:</label><span>*</span></dt>
			<dd><input id="name" type="text" onkeyup="moreContent(this)" /></dd>
		</dl>
		<dl>
			<dt><label>房东性别:</label><span></span></dt>
			<dd><select id="sex" style="padding-left:76%;"><option value="先生">先生</option><option value="女士">女士</option></select><label class="font-icon"></label></dd>
		</dl>
	</div>

	<div class="messageContent" id="intent_content" style="margin-top: 15px; display: none;">
		<dl>
			<dt><label>所属小区:</label><span>*</span></dt>
			<dd><input class="select" id="propertyInfo" type="text" placeholder="请选择" readonly="readonly" /><label class="font-icon"></label></dd>
		</dl>
		<dl style="height: auto; overflow: hidden; display: none;" id="houseBool">
			<dd style="height: auto; overflow: hidden; color:#FF6666;">
				
			</dd>
		</dl>
		<dl>
			<dt><label>房东报价:</label><span>*</span></dt>
			<dd><input id="money" type="number" /></dd>
		</dl>
		<dl>
			<dt><label>房源户型:</label><span>*</span></dt>
			<dd><select id="houseS" style="padding-left: 77%;"><option value="1">一房</option><option value="2">两房</option><option value="3">三房</option><option value="4">四房</option></select><label class="font-icon"></label></dd>
		</dl>
		<dl>
			<dt><label>房源类别:</label><span>*</span></dt>
			<dd><select id="type" style="padding-left: 77%;"><option value="私盘">私盘</option><option value="公盘">公盘</option></select><label class="font-icon"></label></dd>
		</dl>
		<dl>
			<dt><label>房源来源:</label><span>*</span></dt>
			<dd>
			<select id="source" style="padding-left: 67%;">
				<option value="线下开发">线下开发</option>
				<option value="广告">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;广告</option>
				<option value="网络来源">网络来源</option>
				<option value="上门">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上门</option>
				<option value="官网">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;官网</option>
				<option value="其他">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;其他</option>
			</select><label class="font-icon"></label></dd>
		</dl>
		<dl>
			<dt><label>保护截止:</label><span>*</span></dt>
			<dd><input type="date" style="border: none; width: 100%;-webkit-appearance: none; background: #FFFFFF;" id="phi_endTime" value="" /></dd>
		</dl>
		<dl class="bottom">
			<dt><label>房源房号:</label><span></span></dt>
			<dd id="houseCode"><label class="houseTSW"><input maxlength="2" type="text" />楼</label><label class="houseTSW"><input type="text" maxlength="2" />号</label></dd>
		</dl>
	</div>
</div>
<button class="submit" onclick="submit()">提交</button>
</body>
</html>