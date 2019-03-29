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
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/appPage/intention-util.js"></script>
<script src="/resources/js/appPage/intentionFollowUp4.js?v=1.3"></script>
<style type="text/css">
/**#### 消息提示框 -START-------**/
.msg-box{position: realtive;top: 20px;left: 0px;border: 2px solid #E74C3C;padding: 0 10px;line-height: 30px;border-radius: 4px;background: #E74C3C;font-size: 14px;color: #fff;cursor: default;white-space: nowrap;/* 不换行*/z-index: 9;}
</style>
</head>
<body>
<div class="content">
	<div class="messageContent">
		<dl>
			<dt><label>类型:</label><span>*</span></dt>
			<dd><select id="types" style="padding-left: 68%;" onchange="typeChange(this)"><option value="完成">存房成功</option><option value="存房失败">存房失败</option></select><label class="font-icon"></label></dd>
		</dl>
		<dl>
			<dt><label>首年免租期:</label><span>*</span></dt>
			<dd><input id="rentDay" style="width: 80%;" type="number" readonly="readonly" /><label>天/年</label></dd>
		</dl>
	</div>
	
	<div class="messageContent" style="margin-top: 15px;">
		<dl class="bottom" style="height: auto; overflow: hidden;">
			<dt><label>操作类型:</label><span>*</span></dt>
			<dd style="height: auto; overflow: hidden; padding: 10px 0 0 0; height: 43px;" id="typeT">
				<label class="checkbox" onclick="chanageradio(1)"><i>定金</i><input type="radio" name="types" value="定金" /></label>
				<label class="checkbox" onclick="chanageradio(3)"><i>合同</i><input type="radio" name="types" value="合同"/></label>
			</dd>
		</dl>
		<dl class="bottom" style="height: auto; overflow: hidden; display:none;" id="payMoney">
			<dt><label>支付金额:</label></dt>
			<dd>
				<input id="pay_money" type="number" name="phi_price" placeholder="不能大于1000" onblur="checkMoney()" /><label class="">元</label>
			</dd>
		</dl>
		<dl class="bottom" style="height: auto; overflow: hidden; display:none;"  id="payStyle">
			<dt><label>支付方式:</label></dt>
			<dd>
				<select id="fukuanfangshi" name="phi_source" style="padding-left: 66%;">
					<option value="" id="">--请选择--</option>
					<option value="现金" id="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;现金</option>
					<option value="支付宝" id="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;支付宝</option>
					<option value="微信" id="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;微信</option>
					<option value="银行卡" id="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;银行卡</option>
				</select><label class="font-icon"></label>
			</dd>
		</dl>
	</div>
	<input type="hidden" id="builTypes">
	<input type="hidden" id="hi_code">
	<input type="hidden" id="em_name">
	<input type="hidden" id="em_phone">
	<input type="hidden" id="operateTypes">
	<input type="hidden" id="hi_price">
</div>
<button class="submit" onclick="submit()">提交</button>
</body>
</html>