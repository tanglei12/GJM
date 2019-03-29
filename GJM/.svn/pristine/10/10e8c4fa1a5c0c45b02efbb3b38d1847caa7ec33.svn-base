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
<script src="/resources/js/appPage/intentionFollowUp3.js?v=1.3"></script>
</head>
<body>
<div class="content">
	<div class="messageContent">
		<dl>
			<dt><label>房东报价:</label><span>*</span></dt>
			<dd><input id="bidMoney" type="text" style="width: 78%; color : #e74c3c;" readonly="readonly"/><label>元/月</label></dd>
		</dl>
		<dl>
			<dt><label>房源评估价:</label><span>*</span></dt>
			<dd><input id="money" type="text" placeholder="请输入房源评估价" style="width: 78%;" onblur="checkMoney();" onkeyup="moneyPrice()" /><label>元/月</label></dd>
		</dl>
		<dl>
			<dt><label>首年免租期:</label><span>*</span></dt>
			<dd><input id="day" type="text" placeholder="请输入预估首年免租期" style="width: 78%;" onkeyup="moneyPrice()" /><label>天</label></dd>
		</dl>
		<dl style="height: auto; overflow: hidden;" class="moneyprice">
			<dd style="margin-left: 0; height: auto; overflow: hidden;">
				<div class="title_class">建议出房价</div>
				<div style="width: 100%; height: 35px; line-height: 35px; letter-spacing:1px;">1.月付:<label class="moneyPrice">0</label>&nbsp;&nbsp;月/元,预计业绩:<label class="moneys">0</label>元</div>
				<div style="width: 100%; height: 35px; line-height: 35px; letter-spacing:1px;">2.季付:<label class="moneyPrice">0</label>月/元,预计业绩:<label class="moneys">0</label>元</div>
				<div style="width: 100%; height: 35px; line-height: 35px; letter-spacing:1px;">3.半年付:<label class="moneyPrice">0</label>月/元,预计业绩:<label class="moneys">0</label>元</div>
				<div style="width: 100%; height: 35px; line-height: 35px; letter-spacing:1px;">4.年付:<label class="moneyPrice">0</label>月/元,预计业绩:<label class="moneys">0</label>元</div>
			</dd>
		</dl>
	</div>
	<input type="hidden" id="builTypes">
	<input type="hidden" id="hi_code">
</div>
<button class="submit" onclick="submit()">提交</button>
</body>
</html>