<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="Expires" CONTENT="0">
<meta http-equiv="Cache-Control" CONTENT="no-cache">
<meta http-equiv="Pragma" CONTENT="no-cache">
<title>定价策略设置</title>
<link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/resources/css/housePrice/setting.css" rel="stylesheet" type="text/css">
<link href="/resources/Plug-in/jbox-v2.3/jBox/Skins/Blue/jbox.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/housePrice/setting.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
</head>
<body>
<div class="content">
	<div class="setting">
		<label class="title">
			<span>定价策略设置</span>
			<div class="addContent">
				<i class="fa fa-plus" onclick="strategySetting()"></i>
			</div>
		</label>
		<div class="setting-content" id="setting-content">
			<table>
				<thead>
					<tr>
						<td style="width: 42px;"></td>
						<td>标题</td>
						<td>空置天数阀值（天）</td>
						<td>权限</td>
						<td>创建时间</td>
						<td style="width: 42px;"></td>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</table>
		</div>
	</div>
</div>
</body>
</html>