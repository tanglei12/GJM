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
<title>房源跟进记录</title>
<link href="/resources/css/appPage/intentionListAdd.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/common/My97DatePicker/WdatePicker.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js" charset="utf-8"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js" charset="utf-8"></script>
<script src="/resources/js/appPage/intentionFollowRecord.js"></script>
<style type="text/css">
.checkbox input[type="checkbox"]:checked+label::after {
	font-family: 'FontAwesome';
	content: "\f00c";
	color: #fff;
	position: absolute;
	top: 0px;
	left: 2px;
	z-index: 100;
	width: 17px;
	height: 17px;
	text-indent: 0;
	font-size: 13px;
}

button{
	outline: none;
}
.content .messageContent .content-submmit {
	background: #ddd;
	line-height: 45px;
	font-size: 14px;
	text-align: center;
	margin: 0 10px;
	border-radius: 3px;
	position: relative;
	display: block;
	flex: 1;
}
.next-bg {
	background: #3498DB !important;
	color: #fff !important;
}
.alarmIcon{
	display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color:#3498DB;
    margin-right: 5px;
    padding-top: 2px;
}
.alarmClock:before {
    content: "\f0f3";
    font-size: 14px;
}
</style>
</head>
<body>
<div class="content">
	<div class="messageContent">
		<dl>
			<dt><label>跟进方式：</label><span>*</span></dt>
			<dd>
			<select id="htType" style="padding-left: 67%;" onchange="changeRemindShow(this)">
				<option value="-1">&nbsp;&nbsp;&nbsp;&nbsp;请选择</option>
				<option value="电话">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;电话</option>
				<option value="预约看房">&nbsp;预约看房</option>
				<option value="实勘">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;实勘</option>
				<option value="跟进">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;跟进</option>
				<option value="合同">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合同</option>
				<option value="提醒">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;提醒</option>
			</select><label class="font-icon"></label></dd>
		</dl>
		<dl id="followUp" style="height: 52px;">
			<dt><label>跟进内容：</label><span>*</span></dt>
			<dd>
				<input class="form-control" maxlength="100" id="htCount" name="htCount" placeholder="跟进内容"
					style="width: 258px;" rows="3"/>
			</dd>
		</dl>
		<dl>
			<dt><label>添加提醒：</label></dt>
			<dd>
				<span class="addRemind" onclick="remindShow()">
<!-- 					<div class="checkbox checkbox-success" style="float: left; margin-top: 15px; margin-right: 5px; width:20px;"> -->
<!-- 						<input name="chickes" type="checkbox" style="width: 25px;height: 25px;margin-top: 15px;margin-left: 0px;"/> -->
<!-- 							<img src="/resources/image/appPage/naozhong.png" width="20px" height="20px" style="margin-top: 15px;"/> -->
							<input type="button" style="background: url(/resources/image/appPage/naozhong.png) no-repeat 1% 1%; background-size:100% 100%; width:20px;height:20px;margin-top:15px; border:0px">
<!-- 						<label for="chickes" id="ckLabel"></label> -->
<!-- 					</div> -->
					<span style="float: left;"></span>
				</span>
			</dd>
		</dl>
		<div id="remindShow" style="display: none; width: 100%; height: 120px;">
			<dl>
				<dt><label>提醒时间：</label></dt>
				<dd style="width: 75%;">
<!-- 					<div class="dateTimeTitle" style="width: 195px; float: left;"> -->
						<i class="icon-calendar"></i>
						<div class="dateTimeContent">
							<label>
								<input type="text" id="ht_remind_time" class="dateTime2" value="" placeholder="提醒跟进时间" onfocus="dates()"
									style="width: 87px; height:35px; background: none; left: 0px; border: 1px solid #1ABC9C;">日
							</label>
							<label>
								<input type="text" placeholder="时" id="hour"
									style="margin-top: 8px; width: 35px; height: 35px; line-height: 35px; text-align: center; border: 1px solid #1ABC9C;"
									maxlength="2" onkeyup="value=value.replace(/[^\d]/g,'')" onBlur="hourJudge(this)" value="9" />时
							</label>
							<label>
								<input type="text" placeholder="分" id="min"
									style="margin-top: 8px; width: 35px; height: 35px; line-height: 35px; text-align: center; border: 1px solid #1ABC9C;"
									maxlength="2" onkeyup="value=value.replace(/[^\d]/g,'')" onBlur="minJudge(this)" value="40" />分
							</label>
						</div>
<!-- 					</div> -->
				</dd>
			</dl>
			<dl style="height: 52px;">
				<dt><label>提醒内容：</label></dt>
				<dd>
					<input class="form-control" maxlength="100" id="htRemindCount" name="htRemindCount" placeholder="提醒内容"
						style="width: 258px;" rows="3">
				</dd>
			</dl>
		</div>
		<div style="display: flex; background: none; margin-top: 0px;">
			<button style="border:0px;" class="content-submmit next-bg" onclick="houseIntenType()">添加跟进</button>
		</div>
	</div>
</div>
</body>
</html>