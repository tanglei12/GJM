<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport"
	content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style"
	content="black-translucent">
<meta name="format-detection" content="telephone=no">
<meta name="format-detection" content="email=no">
<title>服务申请</title>
<script src="/resources/js/jquery-1.7.2.min.js"></script>
<style type="text/css">
* {
	padding: 0;
	margin: 0;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

:after, :before {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

body {
	font: 12px/150% '微软雅黑', Arial, Verdana, "\5b8b\4f53";
	color: #666;
	background: #F7F7F7
}

input, textarea, select, button {
	font-family: '微软雅黑';
}

input, button, fieldset {
	border: none;
}

table {
	position: relative;
	width: 100%;
	font-size: 14px;
	border-collapse: collapse;
	border-spacing: 0;
}

hr {
	clear: both;
	padding: 0;
	margin: 0
}

ul, li {
	list-style: none;
}

hr {
	border: none;
}

a {
	text-decoration: none;
	color: #666;
}

a:hover {
	color: #00a4ac;
	text-decoration: none;
}

.button {
	float: left;
	width: 100%;
	height: 50px;
	line-height: 50px;
	border-radius: 5px;
	margin-top: 13px;
	font-size: 15px;
	cursor: pointer;
	outline: none;
}

.bg-red {
	background: #FF6666;
	color: white;
}
/*公共flex类型布局---可扩展*/
.layout-dl {
	display: flex;
	border-bottom: 1px solid #eee;
}

.layout-dl .layout-dt {
	line-height: 50px;
	padding-right: 10px;
	font-size: 14px;
}

.layout-dl .layout-dd {
	flex: 1;
	line-height: 50px;
	font-size: 14px;
}

.layout-dl .layout-dd input, select {
	height: 32px;
	outline: none;
	margin-right: 10px;
	width: 100%;
	line-height: 32px;
	padding: 0 12px;
	font-size: 14px;
	letter-spacing: 2px;
	color: #555;
}

.layout-dl .layout-dt .required {
	font-style: normal;
	color: #FF6666;
	margin-right: 2px;
}

.layout-dl .layout-dd input.dateTime {
	background: #EDEFF1;
	cursor: pointer;
	letter-spacing: 0 !important;
}

.serviceOrder li {
	padding: 0 20px;
	background: #fff;
	overflow: hidden;
}

.serviceOrder li.title {
	line-height: 45px;
	font-size: 18px;
	text-align: center;
	margin-bottom: 16px;
}
</style>
<script>
function isEmpty(str) {
	return str == null || typeof (str) == "undefined" || str == ""
			|| str == "undefined" || str.length == 0 || str == {};
};
// 提交预约
function submitOrder() {
	var is_ok = true;
	$("input[name]").each(function() {
		var name = $(this).attr("name");
		switch (name) {
		case "so_name":
			if (isEmpty($(this).val())) {
				$(this).focus();
				alert("请填写姓名");
				is_ok = false;
				return false;
			}
			break;
		case "so_phone":
			if (isEmpty($(this).val())) {
				$(this).focus();
				alert("请填写手机号");
				is_ok = false;
				return false;
			}
			break;
		case "so_remarks":
			if (isEmpty($(this).val())) {
				$(this).focus();
				alert("请填服务描述");
				is_ok = false;
				return false;
			}
			break;
		case "so_propertyName":
			if (isEmpty($(this).val())) {
				$(this).focus();
				alert("请填写物业名称");
				is_ok = false;
				return false;
			}
			break;
		case "so_houseAddress":
			if (isEmpty($(this).val())) {
				$(this).focus();
				alert("请填写房屋地址");
				is_ok = false;
				return false;
			}
			break;
		}
		;
	});
	if (is_ok) {
		$.post("/service/addServiceOrder", {
			"so_name" : $("input[name='so_name']").val(),
			"so_phone" : $("input[name='so_phone']").val(),
			"so_remarks" : $("input[name='so_remarks']").val(),
			"so_propertyName" : $("input[name='so_propertyName']").val(),
			"so_houseAddress" : $("input[name='so_houseAddress']").val()
		}, function(result) {
			if (result.msg == "success") {
				alert("申请成功！");
				window.location.href=window.location.href; 
				window.location.reload;
			}
		}, "json");
	}
}
</script>
</head>
<body>
	<ul class="serviceOrder">	
		<li class='title'>服务申请</li>
		<li>
			<dl class="layout-dl">
				<dt class="layout-dt">
					<em class="required">*</em>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：
				</dt>
				<dd class="layout-dd">
					<input type="text" name="so_name" id="" value="" />
				</dd>
			</dl>
			<dl class="layout-dl">
				<dt class="layout-dt">
					<em class="required">*</em>手&nbsp;&nbsp;机&nbsp;&nbsp;号：
				</dt>
				<dd class="layout-dd">
					<input type="number" name="so_phone" id="" value="" />
				</dd>
			</dl>
			<dl class="layout-dl">
				<dt class="layout-dt">
					<em class="required">*</em>服务描述：
				</dt>
				<dd class="layout-dd">
					<input type="text" name="so_remarks" id="" value="" />
				</dd>
			</dl>
			<dl class="layout-dl">
				<dt class="layout-dt">
					<em class="required">*</em>物业名称：
				</dt>
				<dd class="layout-dd">
					<input type="text" name="so_propertyName" id="" value="" />
				</dd>
			</dl>
			<dl class="layout-dl" style="border: none;">
				<dt class="layout-dt">
					<em class="required">*</em>房屋地址：
				</dt>
				<dd class="layout-dd">
					<input type="text" name="so_houseAddress" id="" value="" />
				</dd>
			</dl>
		</li>
		<li style="padding: 0 10px; background: none;">
			<button type="button" class="button bg-red" onclick="submitOrder()">确认申请</button>
		</li>
	</ul>
</body>
</html>